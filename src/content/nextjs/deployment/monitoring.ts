import type { TopicContent } from '../../types';

export const nextjsMonitoring: TopicContent = {
  slug: 'nextjs-monitoring',
  title: 'Monitoring & Observability',
  description: 'Set up production monitoring for Next.js — Core Web Vitals, error tracking, logging, performance monitoring, and the observability stack used in enterprise applications.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Production monitoring for Next.js covers three areas: Core Web Vitals (user experience metrics), error tracking (Sentry for exceptions), and server-side observability (logs, traces, metrics). Set up all three before going live.',
  whatIsIt: `Production monitoring for Next.js has three layers:

1. **Core Web Vitals** — LCP, CLS, INP, FID measured on real user devices
   - Vercel Analytics (built-in), Google Search Console, Lighthouse CI

2. **Error tracking** — catch and alert on exceptions in real-time
   - Sentry (most popular), Datadog, Bugsnag

3. **Server observability** — logs, traces, metrics for Route Handlers and SSR
   - Vercel Logs, Datadog APM, OpenTelemetry`,
  whyWeNeedIt: `Without monitoring:
- You learn about errors from users, not dashboards
- Performance regressions go unnoticed until users complain
- Debugging production issues is guesswork

With monitoring:
- Errors are caught and alerted within seconds
- Performance regressions are detected before users notice
- Production debugging uses real data, not assumptions`,
  realWorldUsage: `**Monitoring stack for a production SaaS:**

- **Vercel Analytics** — Core Web Vitals, page views, geography
- **Sentry** — JavaScript errors, server errors, performance traces
- **Datadog** — infrastructure metrics, custom business metrics
- **Axiom** — structured log search and dashboards
- **Checkly** — synthetic monitoring (run Playwright tests every 5 minutes)`,
  howItWorks: `**Core Web Vitals measurement:**

Next.js exposes a \`reportWebVitals\` function in the root layout or via the \`useReportWebVitals\` hook. It receives real user measurements and you send them to your analytics platform.

**Error tracking with Sentry:**
- Sentry SDK wraps Server Components, Route Handlers, and Client Components
- Unhandled errors are captured with full stack trace and context
- Errors are grouped by similarity and assigned to team members`,
  example: {
    title: 'Sentry and Web Vitals Setup',
    description: 'Production monitoring setup for a Next.js application.',
    code: [
      {
        label: 'Sentry setup',
        language: 'ts',
        code: `// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  // Only capture errors in production
  enabled: process.env.NODE_ENV === 'production',
  // Sample rate: capture 10% of transactions for performance
  tracesSampleRate: 0.1,
  // Capture 100% of errors
  sampleRate: 1.0,
  // Ignore common noise
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Network request failed',
  ],
});

// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
  tracesSampleRate: 0.1,
});`,
      },
      {
        label: 'Core Web Vitals reporting',
        language: 'tsx',
        code: `// app/_components/WebVitals.tsx
'use client';
import { useReportWebVitals } from 'next/vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to your analytics platform
    switch (metric.name) {
      case 'LCP': // Largest Contentful Paint
      case 'CLS': // Cumulative Layout Shift
      case 'INP': // Interaction to Next Paint
      case 'FCP': // First Contentful Paint
      case 'TTFB': // Time to First Byte
        // Send to Google Analytics
        window.gtag?.('event', metric.name, {
          value: Math.round(metric.value),
          event_label: metric.id,
          non_interaction: true,
        });
        break;
    }
  });

  return null;
}

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Vercel Analytics enough or do I need Sentry too?',
      answer: 'They serve different purposes. Vercel Analytics measures user experience (Core Web Vitals, page views). Sentry catches and alerts on errors. You need both. Vercel Analytics tells you your LCP is slow; Sentry tells you your checkout is throwing a 500 error for 5% of users.',
    },
    {
      question: 'How do I monitor Server Component errors?',
      answer: 'Sentry\'s Next.js SDK automatically captures Server Component errors. Add error.tsx boundaries at each route level — Sentry captures the error before the boundary handles it. Also configure Sentry in sentry.server.config.ts for server-side error capture.',
    },
    {
      question: 'What is the difference between LCP and FCP?',
      answer: 'FCP (First Contentful Paint) is when any content first appears. LCP (Largest Contentful Paint) is when the main content (usually the hero image or heading) appears. LCP is the more important metric — it measures when users can see the primary content. Google\'s threshold: LCP < 2.5s is good.',
    },
  ],
  productionIssues: [
    'Sentry capturing too many errors — noisy alerts cause alert fatigue. Configure ignoreErrors for known browser quirks and network errors. Set sampleRate: 0.1 for performance transactions to reduce costs.',
    'Web Vitals not improving despite optimisations — Lab metrics (Lighthouse) and field metrics (real user data) can differ significantly. Always measure field metrics (Vercel Analytics, CrUX) — they reflect real user experience on real devices.',
    'Missing source maps in Sentry — without source maps, Sentry shows minified stack traces that are impossible to debug. Configure Sentry\'s Webpack plugin to upload source maps during builds.',
  ],
  bestPractices: [
    'Set up Sentry before going to production — not after the first incident',
    'Upload source maps to Sentry — minified stack traces are useless',
    'Set up alerts for error rate spikes, not just individual errors',
    'Monitor Core Web Vitals after every production deployment',
    'Use structured logging (JSON) for server logs — enables log search and dashboards',
  ],
  architectNote: `Observability is not optional for production systems. The minimum viable monitoring stack for a Next.js app: Sentry (errors) + Vercel Analytics (Web Vitals) + structured logging. Add APM (Datadog, Datadog) when you need to trace slow requests across multiple services.`,
  faqs: [
    {
      question: 'How do I set up OpenTelemetry with Next.js?',
      answer: 'Next.js has built-in OpenTelemetry support. Create instrumentation.ts at the project root and export a register() function. Install @vercel/otel or @opentelemetry/sdk-node. This gives you distributed tracing across Server Components, Route Handlers, and external services.',
    },
    {
      question: 'How do I add custom metrics to Vercel Analytics?',
      answer: 'Use the @vercel/analytics package\'s track() function: import { track } from "@vercel/analytics"; track("checkout_completed", { value: cart.total }). Custom events appear in the Vercel Analytics dashboard alongside Web Vitals.',
    },
    {
      question: 'How do I debug a production performance issue?',
      answer: 'Start with Vercel Analytics to identify which pages have poor LCP/CLS. Use Sentry performance traces to find slow server operations. Use Chrome DevTools with a production build to profile client-side rendering. Check server logs for slow DB queries.',
    },
  ],
  keyTakeaways: [
    'Three monitoring layers: Core Web Vitals + error tracking + server observability',
    'Set up Sentry before going to production — not after the first incident',
    'Upload source maps to Sentry for readable stack traces',
    'Vercel Analytics for Web Vitals; Sentry for errors — you need both',
    'Monitor Web Vitals after every production deployment to catch regressions',
    'Use structured JSON logging for server logs — enables search and dashboards',
  ],
  relatedTopics: ['nextjs-vercel-deployment', 'nextjs-cicd', 'nextjs-environment-variables', 'nextjs-streaming'],
};
