import type { TopicContent } from '../../types';

export const nextjsCaching: TopicContent = {
  slug: 'nextjs-caching',
  title: 'Caching in Next.js',
  description: 'Understand all four caching layers in Next.js — Request Memoisation, Data Cache, Full Route Cache, and Router Cache — and how they interact.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Next.js has four caching layers. Most bugs come from not knowing which layer is serving stale data. The key insight: each layer can be independently controlled and invalidated. Master the four layers and caching bugs become obvious.',
  whatIsIt: `Next.js has **four distinct caching mechanisms** that work at different levels:

1. **Request Memoisation** — deduplicates fetch calls within a single render pass. Scope: one request. Automatic.

2. **Data Cache** — persists fetch results across requests and deployments. Scope: server-side, persistent. Controlled by \`cache\` and \`next.revalidate\` options.

3. **Full Route Cache** — caches the rendered HTML and RSC payload for static routes. Scope: server-side, persistent. Invalidated by revalidation.

4. **Router Cache** — client-side cache of RSC payloads for visited routes. Scope: browser session. Duration: 30s for dynamic, 5min for static (Next.js 14).`,
  whyWeNeedIt: `Each cache layer solves a specific performance problem:

- **Request Memoisation** — prevents duplicate DB queries when multiple components need the same data
- **Data Cache** — prevents hitting external APIs/DBs on every request
- **Full Route Cache** — serves pre-built HTML from CDN without server processing
- **Router Cache** — makes client-side navigation instant (no server round trip)`,
  realWorldUsage: `**Cache layers in a product page request:**

1. User navigates to \`/products/widget\` (client-side navigation)
2. **Router Cache** checked — if visited recently, RSC payload returned instantly
3. If not in Router Cache: server request made
4. **Full Route Cache** checked — if static, pre-built HTML returned from CDN
5. If dynamic: Server Component renders, calls \`fetchProduct(slug)\`
6. **Data Cache** checked — if fetch was cached, return cached data
7. If not cached: network request made
8. **Request Memoisation** — if same fetch called twice in render, second call returns memoised result`,
  howItWorks: `**Controlling each cache layer:**

\`\`\`ts
// Data Cache: controlled by fetch options
fetch(url, { cache: 'force-cache' })     // Cache indefinitely
fetch(url, { next: { revalidate: 60 } }) // Cache for 60s
fetch(url, { cache: 'no-store' })        // Never cache

// Full Route Cache: controlled by route segment config
export const dynamic = 'force-static';   // Always static
export const dynamic = 'force-dynamic';  // Always SSR
export const revalidate = 3600;          // ISR: 1 hour

// Router Cache: invalidated by
router.refresh(); // Invalidate current route
revalidatePath('/path'); // Server-side invalidation
\`\`\``,
  example: {
    title: 'Understanding and Controlling the Cache Layers',
    description: 'Practical examples of controlling each cache layer.',
    code: [
      {
        label: 'Route segment config for Full Route Cache',
        language: 'ts',
        code: `// app/products/[slug]/page.tsx

// Option 1: Static with ISR (default for most product pages)
export const revalidate = 3600; // Revalidate every hour

// Option 2: Force dynamic (SSR) — for personalised content
export const dynamic = 'force-dynamic';

// Option 3: Force static — never dynamic, even if cookies() is called
export const dynamic = 'force-static';

// Option 4: Opt out of caching for dynamic params not in generateStaticParams
export const dynamicParams = true; // SSR unknown slugs (default)
export const dynamicParams = false; // 404 unknown slugs`,
      },
      {
        label: 'Router Cache invalidation after mutation',
        language: 'tsx',
        code: `'use client';
import { useRouter } from 'next/navigation';

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(\`/api/products/\${productId}\`, { method: 'DELETE' });

    // Without router.refresh(), the Router Cache would still show
    // the deleted product on client-side navigation
    router.refresh(); // Invalidates Router Cache for current route

    // Or redirect after deletion
    router.push('/products');
  };

  return <button onClick={handleDelete}>Delete</button>;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why is my data stale in development?',
      answer: 'In development (next dev), the Data Cache and Full Route Cache are disabled. You always see fresh data. Caching only activates in production (next build + next start). Always test caching behaviour with a production build.',
    },
    {
      question: 'I called revalidatePath but the page still shows stale data. Why?',
      answer: 'revalidatePath invalidates the Data Cache and Full Route Cache (server-side). But the Router Cache (client-side) may still serve the old RSC payload. Call router.refresh() on the client after revalidation, or the Router Cache will expire on its own (30s for dynamic, 5min for static).',
    },
    {
      question: 'Does the Router Cache persist across page refreshes?',
      answer: 'No — the Router Cache is in-memory in the browser. A full page refresh (F5) clears it entirely. It only persists during a single browsing session without a hard refresh.',
    },
  ],
  productionIssues: [
    'Stale data after mutations — the most common caching bug. After a write operation, invalidate both the server cache (revalidatePath/revalidateTag) and the client Router Cache (router.refresh()).',
    'Data Cache not persisting on serverless — each serverless function invocation may have an empty Data Cache. Use a persistent external cache (Redis, Vercel KV) for cross-invocation caching.',
    'Full Route Cache serving wrong user data — a dynamic route that reads cookies() should never be statically cached. Ensure dynamic routes are correctly identified as dynamic (check next build output).',
  ],
  bestPractices: [
    'Understand which cache layer is responsible for each piece of data in your app',
    'Test caching with next build + next start — development mode disables caching',
    'After mutations: revalidatePath/revalidateTag (server) + router.refresh() (client)',
    'Use the next build output to verify which routes are static vs dynamic',
    'For multi-instance deployments, use an external cache store for the Data Cache',
  ],
  architectNote: `The four-layer cache is Next.js\'s most powerful feature and its most common source of bugs. The key is to **make caching explicit and visible**. Add comments to every fetch call explaining its cache strategy. Use the next build output as your caching audit — every route should be exactly the caching mode you intended.`,
  faqs: [
    {
      question: 'How do I completely disable caching for debugging?',
      answer: 'Set export const dynamic = "force-dynamic" on the page, and use cache: "no-store" on all fetch calls. In development, caching is already disabled. For production debugging, add a cache-busting query param or use the Vercel dashboard to purge specific paths.',
    },
    {
      question: 'What is the Router Cache duration in Next.js 14 vs 15?',
      answer: 'Next.js 14: dynamic routes cached for 30s, static routes for 5 minutes. Next.js 15: the Router Cache opt-in behaviour changed — staleTimes can be configured in next.config.ts. Check the release notes when upgrading as this affects perceived data freshness after navigation.',
    },
    {
      question: 'Can I use Redis as the Data Cache store?',
      answer: 'Yes — Next.js supports custom cache handlers via the cacheHandler option in next.config.ts. Libraries like @neshca/cache-handler provide Redis integration. This is essential for multi-instance deployments where each server needs to share the same cache.',
    },
  ],
  keyTakeaways: [
    'Four cache layers: Request Memoisation, Data Cache, Full Route Cache, Router Cache',
    'Each layer is independently controlled and invalidated',
    'Caching is disabled in development — always test with production builds',
    'After mutations: invalidate both server cache and client Router Cache',
    'The next build output shows which routes are static, dynamic, or ISR',
    'For multi-instance deployments, use Redis as a shared Data Cache store',
  ],
  relatedTopics: ['nextjs-isr', 'nextjs-revalidation', 'nextjs-fetch-api', 'nextjs-caching-strategies'],
};
