import type { TopicContent } from '../../types';

export const nextjsVercel: TopicContent = {
  slug: 'nextjs-vercel-deployment',
  title: 'Vercel Deployment',
  description: 'Deploy Next.js to Vercel — zero-config deployments, preview environments, edge functions, analytics, and the production configuration patterns used in enterprise.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Vercel is the company behind Next.js and provides the best deployment experience for it. Connect your GitHub repo, and every push automatically deploys. Production pushes go to your production URL; PRs get unique preview URLs for testing.',
  whatIsIt: `Vercel is a cloud platform optimised for Next.js deployments:

- **Zero-config deployments** — connect GitHub, push to deploy
- **Preview deployments** — every PR gets a unique URL for testing
- **Edge Network** — static assets and middleware served from 100+ edge locations
- **Serverless Functions** — Route Handlers and SSR pages become serverless functions
- **ISR support** — first-class support for Incremental Static Regeneration
- **Analytics** — Core Web Vitals, real user monitoring
- **Vercel KV, Postgres, Blob** — managed databases and storage`,
  whyWeNeedIt: `Deploying Next.js manually requires:

- Configuring a Node.js server
- Setting up a CDN for static assets
- Configuring serverless functions for SSR
- Managing ISR cache infrastructure
- Setting up preview environments for PRs

Vercel handles all of this automatically. For most teams, the productivity gain outweighs the cost.`,
  realWorldUsage: `**Vercel in a production workflow:**

1. Developer pushes to a feature branch
2. Vercel builds and deploys to a preview URL (e.g., my-app-git-feature-branch.vercel.app)
3. Designer and PM review on the preview URL
4. PR merged to main
5. Vercel deploys to production (my-app.vercel.app or custom domain)
6. Vercel Analytics shows Core Web Vitals impact of the change`,
  howItWorks: `**Vercel build and deployment pipeline:**

1. \`git push\` triggers a webhook to Vercel
2. Vercel pulls the code and runs \`next build\`
3. Static assets uploaded to Vercel\'s global CDN
4. Static pages (SSG) served directly from CDN
5. Dynamic pages (SSR) deployed as serverless functions
6. Route Handlers deployed as serverless functions
7. Middleware deployed as Edge Functions
8. ISR cache stored in Vercel\'s distributed cache`,
  example: {
    title: 'Vercel Configuration',
    description: 'vercel.json configuration and next.config.ts for production deployments.',
    code: [
      {
        label: 'vercel.json — advanced configuration',
        language: 'json',
        code: `{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["lhr1", "iad1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/old-path/:slug",
      "destination": "/new-path/:slug"
    }
  ]
}`,
      },
      {
        label: 'next.config.ts for Vercel',
        language: 'ts',
        code: `// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true, // 301
      },
    ];
  },
};

export default config;`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Vercel the only way to deploy Next.js?',
      answer: 'No — Next.js runs on any Node.js host. AWS (Lambda, ECS), Google Cloud Run, Railway, Render, Fly.io, and self-hosted VMs all work. However, some features (ISR cache persistence, image optimisation CDN, Edge Middleware global distribution) work best on Vercel. For self-hosted, the open-source OpenNext adapter improves compatibility.',
    },
    {
      question: 'What is the difference between preview and production deployments?',
      answer: 'Preview deployments are created for every branch push and PR. They have unique URLs and can have different environment variables (preview secrets, staging APIs). Production deployments are triggered by pushes to the main branch and serve your production domain.',
    },
    {
      question: 'How does Vercel handle database connections for serverless functions?',
      answer: 'Serverless functions are stateless and may have many concurrent instances. Use connection pooling (PgBouncer, Prisma Accelerate, Neon serverless driver) to avoid exhausting database connections. Never use a direct database connection without pooling in a serverless environment.',
    },
  ],
  productionIssues: [
    'Database connection exhaustion — each serverless function instance creates its own DB connection. Without connection pooling, 100 concurrent requests = 100 DB connections. Use Prisma Accelerate, PgBouncer, or Neon\'s serverless driver.',
    'Function timeout — Vercel serverless functions have a default 10-second timeout (30s on Pro). Long-running operations (PDF generation, large data exports) need to be moved to background jobs (Vercel Cron, QStash).',
    'Environment variables not available in Edge Runtime — Edge Functions (middleware) can only access a subset of environment variables. Ensure your secrets are not accidentally referenced in middleware.',
  ],
  bestPractices: [
    'Use Vercel environment variables for secrets — never commit .env files',
    'Set up preview environment variables separately from production',
    'Use connection pooling for all database connections in serverless functions',
    'Monitor Core Web Vitals in Vercel Analytics after each deployment',
    'Use Vercel\'s automatic HTTPS and custom domain configuration',
  ],
  architectNote: `Vercel\'s serverless architecture has important implications for your application design. **Stateless by default** — no in-memory caches, no WebSocket servers, no background processes. Design around this: use Redis for shared state, use Vercel Cron for scheduled tasks, use WebSocket services (Pusher, Ably) for real-time features.`,
  faqs: [
    {
      question: 'How much does Vercel cost for a production app?',
      answer: 'Hobby plan is free with limitations (no custom domains for teams, 100GB bandwidth). Pro plan is $20/user/month with generous limits. Enterprise has custom pricing. For most startups, Hobby or Pro is sufficient. Compare against the cost of self-hosting (EC2 + CDN + ops time).',
    },
    {
      question: 'How do I run database migrations on Vercel?',
      answer: 'Add a build command that runs migrations before the Next.js build: "build": "prisma migrate deploy && next build". This runs migrations on every deployment. For zero-downtime migrations, use expand-contract pattern: add new columns first, deploy, then remove old columns.',
    },
    {
      question: 'Can I run a cron job on Vercel?',
      answer: 'Yes — Vercel Cron Jobs (Pro feature) trigger a Route Handler on a schedule. Define in vercel.json: { "crons": [{ "path": "/api/cron/cleanup", "schedule": "0 2 * * *" }] }. The Route Handler runs at the scheduled time as a serverless function.',
    },
  ],
  keyTakeaways: [
    'Zero-config deployment: connect GitHub, push to deploy',
    'Every PR gets a preview deployment with a unique URL',
    'Use connection pooling for all DB connections — serverless functions are stateless',
    'Serverless functions have timeout limits — use background jobs for long operations',
    'Not Vercel-only: Next.js runs on any Node.js host, but Vercel has the best DX',
    'Monitor Core Web Vitals in Vercel Analytics after every production deployment',
  ],
  relatedTopics: ['nextjs-environment-variables', 'nextjs-cicd', 'nextjs-monitoring', 'nextjs-caching-strategies'],
};
