import type { TopicContent } from '../../types';

export const nextjsStreaming: TopicContent = {
  slug: 'nextjs-streaming',
  title: 'Streaming & Suspense',
  description: 'Master streaming in Next.js — how Suspense enables progressive HTML delivery, skeleton UIs, and parallel data loading for dramatically faster perceived performance.',
  applicableVersions: ['Next.js 13.4+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Streaming sends HTML to the browser progressively — fast parts arrive immediately, slow parts stream in as they become ready. Wrap slow Server Components in <Suspense fallback={<Skeleton />}> and users see content instantly instead of waiting for all data to load.',
  whatIsIt: `Streaming in Next.js uses HTTP streaming + React Suspense to send HTML progressively:

- The **page shell** (layout, fast content) is sent immediately
- **Slow sections** (database queries, external APIs) stream in as they complete
- Each **Suspense boundary** is an independent streaming unit
- Users see and interact with fast content while slow content loads

**Without streaming:** User waits 2 seconds for ALL data before seeing ANY content.
**With streaming:** User sees the page shell in 100ms, fast sections in 200ms, slow sections in 2 seconds.`,
  whyWeNeedIt: `Traditional SSR blocks on the slowest data fetch. A page with 5 data fetches waits for all 5 before sending any HTML.

Streaming eliminates this:
- **Faster Time to First Byte (TTFB)** — page shell sent immediately
- **Better perceived performance** — users see content progressively
- **Parallel data loading** — independent sections load simultaneously
- **Better UX** — skeleton loaders instead of blank pages`,
  realWorldUsage: `**Streaming in a dashboard:**

- Page shell (header, sidebar, layout) — instant, 0ms
- User greeting — 50ms (fast session lookup)
- Recent activity — 150ms (simple DB query)
- Revenue chart — 800ms (complex aggregation)
- AI insights — 2000ms (LLM API call)

With Suspense, all five load in parallel and stream in as ready. Without Suspense, the user waits 2000ms for everything.`,
  howItWorks: `**Streaming rendering pipeline:**

1. Request arrives
2. Next.js renders the page tree synchronously until it hits a Suspense boundary
3. Sends the outer HTML (layout, fast content) to the browser immediately
4. Browser displays the page shell + skeleton fallbacks
5. Async Server Components inside Suspense boundaries continue rendering
6. As each completes, Next.js streams the HTML chunk to the browser
7. Browser replaces the skeleton with the real content (no JS re-render)`,
  example: {
    title: 'Streaming with Suspense Boundaries',
    description: 'A dashboard that streams each section independently for maximum perceived performance.',
    code: [
      {
        label: 'Dashboard with independent streaming sections',
        language: 'tsx',
        code: `// app/dashboard/page.tsx
import { Suspense } from 'react';

// Each component fetches its own data
async function RevenueChart() {
  const data = await getRevenueData(); // 800ms
  return <Chart data={data} />;
}

async function RecentOrders() {
  const orders = await getRecentOrders(); // 200ms
  return <OrdersList orders={orders} />;
}

async function UserGreeting() {
  const user = await getUser(); // 50ms
  return <h1>Welcome back, {user.name}</h1>;
}

// The page itself has NO awaits — it renders immediately
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Streams in at 50ms */}
      <Suspense fallback={<GreetingSkeleton />}>
        <UserGreeting />
      </Suspense>

      <div className="grid grid-cols-2 gap-6">
        {/* Streams in at 200ms */}
        <Suspense fallback={<OrdersSkeleton />}>
          <RecentOrders />
        </Suspense>

        {/* Streams in at 800ms */}
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart />
        </Suspense>
      </div>
    </div>
  );
}`,
      },
      {
        label: 'Skeleton components for streaming fallbacks',
        language: 'tsx',
        code: `// components/skeletons/ChartSkeleton.tsx
export function ChartSkeleton() {
  return (
    <div className="rounded-lg border p-6 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
      <div className="flex items-end gap-2 h-48">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-gray-200 rounded-t"
            style={{ height: \`\${Math.random() * 80 + 20}%\` }}
          />
        ))}
      </div>
    </div>
  );
}

// Match the skeleton shape to the real component
// Users should barely notice the transition from skeleton to content`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between loading.tsx and Suspense?',
      answer: 'loading.tsx is a file convention that automatically wraps the entire page in a Suspense boundary. It shows while the whole page loads. Manual Suspense boundaries give you granular control — you can stream individual sections while the rest of the page is already visible. Use loading.tsx for simple cases, manual Suspense for fine-grained streaming.',
    },
    {
      question: 'Can I use Suspense in Client Components?',
      answer: 'Yes — Suspense works in Client Components for lazy-loaded components (React.lazy / next/dynamic). But streaming (sending HTML progressively) only works with Server Components. Client Component Suspense shows the fallback while the lazy chunk loads, not while data fetches.',
    },
    {
      question: 'Does streaming affect SEO?',
      answer: 'No — search engine crawlers wait for the full page to load before indexing. Streamed content is fully indexed. Streaming is a browser performance optimisation, not an SEO concern.',
    },
  ],
  productionIssues: [
    'Suspense boundary too high in the tree — wrapping the entire page in one Suspense boundary gives no streaming benefit (same as no Suspense). Place boundaries around individual slow sections.',
    'Missing Suspense around slow components — a slow Server Component without a Suspense boundary blocks the entire page. Always wrap slow data fetches in Suspense.',
    'Skeleton shape mismatch — skeletons that look nothing like the real content cause jarring layout shifts when content loads. Match skeleton dimensions to real content dimensions.',
  ],
  bestPractices: [
    'Place Suspense boundaries around each independently-loading section',
    'Match skeleton shapes to real content to minimise layout shift on load',
    'Move data fetching into the component that needs it — enables independent streaming',
    'Use loading.tsx for simple cases, manual Suspense for fine-grained control',
    'Measure streaming impact with Chrome DevTools waterfall view',
  ],
  architectNote: `Streaming changes the mental model from "wait for all data, then render" to "render what you have, stream the rest". This aligns with how users experience web apps — they want to see SOMETHING immediately, not a blank page for 2 seconds. Design your component tree with streaming in mind: identify slow data fetches and isolate them behind Suspense boundaries.`,
  faqs: [
    {
      question: 'How do I stream data from a Server Action or Route Handler?',
      answer: 'Return a ReadableStream from the Route Handler. The Vercel AI SDK uses this pattern for streaming AI responses: return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" } }). On the client, use the useChat hook or manually read the stream.',
    },
    {
      question: 'Can I use useTransition with streaming?',
      answer: 'Yes — useTransition marks a state update as non-urgent, keeping the current UI interactive while the new content streams in. Combined with Suspense, it prevents showing the fallback skeleton during navigations, keeping the old content visible until the new content is ready.',
    },
    {
      question: 'Does streaming work with static pages (SSG)?',
      answer: 'No — static pages are pre-built HTML files. Streaming is a server-rendering feature. For static pages, the entire HTML is sent at once (it is already built). Streaming is only relevant for dynamic (SSR) routes.',
    },
  ],
  keyTakeaways: [
    'Streaming sends HTML progressively — fast parts arrive first, slow parts stream in later',
    'Wrap slow Server Components in <Suspense fallback={<Skeleton />}>',
    'Each Suspense boundary is an independent streaming unit',
    'loading.tsx is automatic Suspense for the whole page; manual Suspense is granular',
    'Move data fetching into the component that needs it to enable independent streaming',
    'Streaming does not affect SEO — crawlers see the full content',
  ],
  relatedTopics: ['nextjs-server-components', 'nextjs-app-router', 'nextjs-server-data-fetching', 'nextjs-lazy-loading'],
};
