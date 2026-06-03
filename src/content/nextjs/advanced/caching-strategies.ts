import type { TopicContent } from '../../types';

export const nextjsCachingStrategies: TopicContent = {
  slug: 'nextjs-caching-strategies',
  title: 'Caching Strategies',
  description: 'Master advanced caching strategies in Next.js — combining SSG, ISR, SSR, and client caching for optimal performance across different content types.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The right caching strategy depends on the content type. Static content → SSG. Frequently updated content → ISR. User-specific content → SSR. Real-time content → SSR with short TTL or client-side. Mixing strategies in one app is normal and expected.',
  whatIsIt: `Caching strategy selection in Next.js means choosing the right combination of:

- **SSG** — build-time static, served from CDN forever
- **ISR** — static with time-based or on-demand revalidation
- **SSR** — server-rendered per request, optionally cached at CDN
- **Client-side** — fetched in the browser, cached by SWR/TanStack Query
- **unstable_cache** — server-side function cache with TTL and tags
- **Redis** — shared cache for multi-instance deployments`,
  whyWeNeedIt: `No single caching strategy fits all content:

- A blog post (changes monthly) → SSG is perfect
- A product price (changes daily) → ISR with 1hr revalidation
- A user\'s order history (changes per user) → SSR
- Live stock prices (changes per second) → SSR + client polling

Mixing strategies in one app is the norm, not the exception.`,
  realWorldUsage: `**Caching strategy map for an e-commerce platform:**

| Route | Strategy | Reason |
|---|---|---|
| / (homepage) | ISR 1hr + on-demand | Featured products change |
| /products | ISR 1hr | Catalog changes infrequently |
| /products/[slug] | SSG + ISR on-demand | Individual products |
| /blog/[slug] | SSG + on-demand | Published once |
| /search | SSR | Dynamic query |
| /cart | SSR | User-specific |
| /dashboard | SSR | Auth + user-specific |
| /live-prices | SSR + client poll | Real-time |`,
  howItWorks: `**Cache decision tree:**

1. Is the content the same for all users? → Yes: SSG/ISR. No: SSR
2. How often does it change? → Never: SSG. Occasionally: ISR. Always: SSR
3. Can you tolerate stale content? → Yes: ISR. No: SSR
4. Is it triggered by user action? → On-demand ISR or SSR
5. Is it real-time? → SSR + client polling or WebSocket`,
  example: {
    title: 'Mixed Caching Strategy Implementation',
    description: 'Different caching strategies in the same Next.js application.',
    code: [
      {
        label: 'unstable_cache for DB queries',
        language: 'ts',
        code: `// lib/data/products.ts
import { unstable_cache } from 'next/cache';
import { db } from '@/lib/db';

// Cache DB query with ISR semantics
export const getProducts = unstable_cache(
  async (category?: string) => {
    return db.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  },
  ['products'], // Cache key prefix
  {
    revalidate: 3600,       // 1 hour TTL
    tags: ['products'],     // Tag for on-demand invalidation
  }
);

// Specific product with its own tag
export const getProduct = unstable_cache(
  async (slug: string) => {
    return db.product.findUnique({ where: { slug } });
  },
  ['product'],
  {
    revalidate: 3600,
    tags: ['products', \`product-\${slug}\`], // Note: slug not available here
    // Use a factory function pattern for per-item tags:
  }
);

// Factory pattern for per-item caching
export function getCachedProduct(slug: string) {
  return unstable_cache(
    async () => db.product.findUnique({ where: { slug } }),
    [\`product-\${slug}\`],
    { revalidate: 3600, tags: ['products', \`product-\${slug}\`] }
  )();
}`,
      },
      {
        label: 'Combining strategies in one app',
        language: 'tsx',
        code: `// Static page (SSG) — app/about/page.tsx
// No data fetching = static by default
export default function AboutPage() {
  return <div>About us content</div>;
}

// ISR page — app/blog/[slug]/page.tsx
export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = await fetch(\`/api/posts/\${params.slug}\`, {
    next: { revalidate: 86400, tags: [\`post-\${params.slug}\`] }
  }).then(r => r.json());
  return <BlogPost post={post} />;
}

// SSR page — app/dashboard/page.tsx
import { cookies } from 'next/headers'; // Makes it dynamic
export default async function DashboardPage() {
  const session = await getSession(); // Reads cookies
  const data = await getUserData(session.userId); // User-specific
  return <Dashboard data={data} />;
}

// Client-side real-time — components/LivePrices.tsx
'use client';
import useSWR from 'swr';
export function LivePrices() {
  const { data } = useSWR('/api/prices', fetcher, { refreshInterval: 5000 });
  return <PriceTable prices={data} />;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I use ISR for user-specific pages?',
      answer: 'No — ISR caches the same HTML for all users. A user-specific page cached with ISR would show one user\'s data to all users. Use SSR for any content that differs between users. The rule: ISR for public content, SSR for private content.',
    },
    {
      question: 'Is unstable_cache production-ready?',
      answer: 'Yes — despite the "unstable" prefix (a legacy naming issue), unstable_cache is widely used in production. It is the recommended way to add ISR-style caching to database queries. The API may change in future Next.js versions, but it is stable enough for production use.',
    },
    {
      question: 'How do I choose between ISR revalidate time and on-demand revalidation?',
      answer: 'Use both together. Time-based revalidation is the safety net — ensures content is eventually fresh even if the webhook fails. On-demand revalidation is the primary mechanism for immediate updates. Example: revalidate: 3600 (1hr safety net) + on-demand webhook on CMS publish.',
    },
  ],
  productionIssues: [
    'Cache stampede on popular ISR pages — when a cached page expires and receives thousands of simultaneous requests, all trigger a rebuild simultaneously. Use a distributed lock (Redis) or configure Vercel\'s ISR cache to handle this automatically.',
    'unstable_cache not shared between serverless instances — each serverless function instance has its own in-memory cache. For shared caching across instances, use Redis with a custom cache handler.',
    'Mixing SSR and ISR on the same route — a route cannot be both SSR and ISR. If any part of the route is dynamic (reads cookies), the entire route is SSR. Design your routes to be either fully static or fully dynamic.',
  ],
  bestPractices: [
    'Create a caching strategy document before building — map each route to its strategy',
    'Use both time-based and on-demand revalidation for important content',
    'Tag all cached content for precise on-demand invalidation',
    'Use unstable_cache for DB queries that should have ISR semantics',
    'Test your caching strategy with next build and production traffic patterns',
  ],
  architectNote: `Caching is the most impactful performance lever in a Next.js application. A well-designed caching architecture can reduce server costs by 90% and improve response times by 10x. Invest time upfront in designing the caching strategy for each content type — it is much harder to retrofit caching into an existing app.`,
  faqs: [
    {
      question: 'How do I implement a Redis cache in Next.js?',
      answer: 'Use Upstash Redis (edge-compatible, serverless-friendly) or ioredis (Node.js only). Wrap your data access functions with Redis get/set: const cached = await redis.get(key); if (cached) return JSON.parse(cached); const data = await db.query(); await redis.setex(key, 3600, JSON.stringify(data)); return data.',
    },
    {
      question: 'Should I cache at the Next.js level or the database level?',
      answer: 'Both — they serve different purposes. Database-level caching (connection pooling, query caching) reduces DB load. Next.js caching (Data Cache, unstable_cache) reduces the number of DB calls from your app. Database-level caching is transparent; Next.js caching is explicit and gives you control over TTL and invalidation.',
    },
    {
      question: 'How do I test that my caching is working correctly?',
      answer: 'Run next build and check the route summary — each route shows its rendering mode. Add cache headers to your responses and inspect them in the browser Network tab. Use console.log in data fetching functions to verify they are not called on every request.',
    },
  ],
  keyTakeaways: [
    'Match caching strategy to content type: static → SSG, changing → ISR, user-specific → SSR',
    'Use both time-based and on-demand revalidation for important content',
    'unstable_cache adds ISR semantics to database queries',
    'ISR is for public content only — never for user-specific data',
    'Design caching strategy upfront — it is hard to retrofit',
    'Tag all cached content for precise on-demand invalidation',
  ],
  relatedTopics: ['nextjs-isr', 'nextjs-caching', 'nextjs-revalidation', 'nextjs-server-data-fetching'],
};
