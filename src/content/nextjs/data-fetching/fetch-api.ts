import type { TopicContent } from '../../types';

export const nextjsFetchApi: TopicContent = {
  slug: 'nextjs-fetch-api',
  title: 'Fetch API & Caching',
  description: 'Master the extended fetch API in Next.js — how Next.js augments the native fetch with caching, revalidation, and deduplication built in.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Next.js extends the native fetch API with automatic caching, deduplication, and revalidation. In Next.js 14, fetch is cached by default. In Next.js 15, fetch is NOT cached by default (breaking change). Always set explicit cache options to avoid surprises.',
  whatIsIt: `Next.js extends the native \`fetch\` API with additional options in the \`next\` namespace:

\`\`\`ts
fetch(url, {
  cache: 'force-cache' | 'no-store',
  next: {
    revalidate: number,  // ISR: seconds until revalidation
    tags: string[],      // Tags for on-demand revalidation
  }
})
\`\`\`

**Caching behaviour by version:**
- **Next.js 14**: \`fetch\` is cached by default (\`force-cache\`). Use \`cache: 'no-store'\` to opt out.
- **Next.js 15**: \`fetch\` is NOT cached by default. Use \`cache: 'force-cache'\` or \`next: { revalidate }\` to opt in.

**Deduplication:** Multiple \`fetch\` calls to the same URL within the same render pass are automatically deduplicated — the network request is made only once.`,
  whyWeNeedIt: `Without Next.js\'s fetch extensions, you would need to:

- Manually implement caching with Redis or in-memory stores
- Manually deduplicate requests (prevent the same API being called 3 times in one render)
- Manually implement ISR-style revalidation logic
- Manually tag cache entries for on-demand invalidation

Next.js bakes all of this into the fetch API you already know, making caching a declarative concern rather than an imperative one.`,
  realWorldUsage: `**Fetch patterns in a real CMS-driven site:**

\`\`\`ts
// Cached indefinitely (static)
const config = await fetch('/api/config', { cache: 'force-cache' });

// ISR: revalidate every hour
const products = await fetch('/api/products', { next: { revalidate: 3600 } });

// Always fresh (SSR)
const cart = await fetch('/api/cart', { cache: 'no-store' });

// Tagged for on-demand revalidation
const post = await fetch('/api/posts/slug', {
  next: { revalidate: 3600, tags: ['posts', 'post-slug'] }
});
\`\`\``,
  howItWorks: `**Next.js fetch caching layers:**

1. **Request deduplication** — same URL + options in one render = one network request
2. **Data cache** — persists across requests (ISR/SSG behaviour)
3. **Full route cache** — caches the rendered HTML/RSC payload
4. **Router cache** — client-side cache for navigation

These four caches work together. Understanding which cache you\'re controlling with each option is the key to avoiding stale data bugs.`,
  example: {
    title: 'Fetch Patterns for Every Scenario',
    description: 'The four fetch patterns you will use in every Next.js project.',
    code: [
      {
        label: 'All four caching patterns',
        language: 'ts',
        code: `// lib/api.ts — centralise your fetch patterns

// 1. STATIC — cached forever, only updates on rebuild
export async function getConfig() {
  const res = await fetch('https://api.example.com/config', {
    cache: 'force-cache',
  });
  return res.json();
}

// 2. ISR — cached, revalidated every hour
export async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600, tags: ['products'] },
  });
  return res.json();
}

// 3. DYNAMIC — never cached, always fresh
export async function getCartItems(sessionId: string) {
  const res = await fetch(
    \`https://api.example.com/cart/\${sessionId}\`,
    { cache: 'no-store' }
  );
  return res.json();
}

// 4. ON-DEMAND — ISR + tagged for webhook revalidation
export async function getPost(slug: string) {
  const res = await fetch(
    \`https://api.example.com/posts/\${slug}\`,
    { next: { revalidate: 86400, tags: ['posts', \`post-\${slug}\`] } }
  );
  return res.json();
}`,
      },
      {
        label: 'Request deduplication in practice',
        language: 'tsx',
        code: `// Both components call the same URL
// Next.js makes only ONE network request per render

async function Header() {
  const user = await fetch('/api/me', { cache: 'no-store' }).then(r => r.json());
  return <nav>Hello, {user.name}</nav>;
}

async function Sidebar() {
  // SAME fetch — deduplicated automatically
  const user = await fetch('/api/me', { cache: 'no-store' }).then(r => r.json());
  return <aside>Profile: {user.email}</aside>;
}

// In the same render pass, /api/me is called ONCE
// Both components receive the same data`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does Next.js 15 cache fetch by default?',
      answer: 'No — this is a breaking change from Next.js 14. In Next.js 15, fetch defaults to cache: "no-store" (dynamic). In Next.js 14, fetch defaults to force-cache (static). Always set explicit cache options to make your code version-agnostic and predictable.',
    },
    {
      question: 'Does the extended fetch work in Client Components?',
      answer: 'No — the Next.js fetch extensions (caching, tags, revalidate) only work in Server Components and Route Handlers. In Client Components, fetch is the standard browser fetch with no caching extensions. Use SWR or TanStack Query for client-side data fetching with caching.',
    },
    {
      question: 'Can I use axios instead of fetch in Server Components?',
      answer: 'Yes, but you lose the Next.js caching and deduplication features. Axios is a third-party library — Next.js cannot extend it. For Server Components, use the native fetch to get all the Next.js caching benefits. For Client Components, axios is fine.',
    },
  ],
  productionIssues: [
    'Upgrading from Next.js 14 to 15 — all your cached fetch calls become dynamic (no-store) by default, causing unexpected SSR behaviour and database load spikes. Audit all fetch calls and add explicit cache options before upgrading.',
    'Forgetting cache: "no-store" on auth endpoints — if a fetch to /api/me is cached, all users see the same user data. Always use cache: "no-store" for any user-specific endpoint.',
    'Deduplication only works within a single render pass — it does not persist across requests. If you need cross-request caching for DB queries, use unstable_cache or React cache().',
  ],
  bestPractices: [
    'Always set explicit cache options — never rely on defaults (they changed between versions)',
    'Centralise fetch functions in lib/api.ts with consistent cache options',
    'Use tags on all ISR fetch calls to enable on-demand revalidation',
    'Use cache: "no-store" for any endpoint that returns user-specific data',
    'Use React cache() to deduplicate DB queries across Server Components in the same request',
  ],
  architectNote: `The Next.js fetch cache is a **declarative caching system** — you declare the caching intent alongside the data fetch, not in a separate caching layer. This is a significant DX improvement over manually managing Redis TTLs.

However, the changing defaults between Next.js versions are a real operational risk. Establish a team convention: **always explicit, never default**. Every fetch call in your codebase should have an explicit cache option, documented with a comment explaining why.`,
  faqs: [
    {
      question: 'How do I cache database queries the same way as fetch?',
      answer: 'Use unstable_cache from next/cache. It wraps any async function with the same caching semantics as fetch: const getCachedUser = unstable_cache(async (id) => db.user.findUnique({ where: { id } }), ["user-", id], { revalidate: 3600, tags: ["users"] })',
    },
    {
      question: 'What is React cache() and when should I use it?',
      answer: 'React cache() deduplicates function calls within a single render pass (like fetch deduplication, but for any function). Use it to wrap DB queries that might be called from multiple Server Components in the same request. Unlike unstable_cache, it does NOT persist across requests.',
    },
    {
      question: 'How do I debug what is cached and what is not?',
      answer: 'Run next build and look at the route summary — it shows which routes are static (circle), dynamic (lambda), or ISR (clock). In development, caching is disabled by default so you see fresh data. Always test caching behaviour in production builds.',
    },
  ],
  keyTakeaways: [
    'Next.js extends native fetch with cache, revalidate, and tags options',
    'Next.js 15 changed the default: fetch is now no-store (dynamic) by default',
    'Always set explicit cache options — never rely on framework defaults',
    'Deduplication is automatic for same-URL fetches within one render pass',
    'Use unstable_cache for DB queries, React cache() for per-request deduplication',
    'Tags enable precise on-demand revalidation from webhooks',
  ],
  relatedTopics: ['nextjs-server-data-fetching', 'nextjs-revalidation', 'nextjs-caching-strategies', 'nextjs-isr'],
};
