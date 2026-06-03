import type { TopicContent } from '../../types';

export const nextjsRevalidation: TopicContent = {
  slug: 'nextjs-revalidation',
  title: 'Revalidation',
  description: 'Master Next.js revalidation — time-based, on-demand, and tag-based strategies for keeping cached content fresh without sacrificing performance.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Revalidation tells Next.js when to regenerate a cached page or data. Time-based revalidation rebuilds after N seconds. On-demand revalidation rebuilds immediately when you call revalidatePath() or revalidateTag() — typically from a CMS webhook.',
  whatIsIt: `Revalidation is the mechanism for **invalidating and refreshing cached content** in Next.js. Three strategies:

1. **Time-based** — \`next: { revalidate: 3600 }\` — refresh after N seconds (ISR)
2. **On-demand path** — \`revalidatePath('/products/slug')\` — invalidate a specific URL
3. **On-demand tag** — \`revalidateTag('products')\` — invalidate all content with a tag

Revalidation uses **stale-while-revalidate**: serve the cached version immediately, rebuild in the background, serve fresh version to subsequent requests.`,
  whyWeNeedIt: `Without revalidation, you face a binary choice:
- **SSG** — fast but stale until next full deploy
- **SSR** — always fresh but slow and expensive

Revalidation gives you a third option: **static performance + controlled freshness**. You decide exactly when content updates, either by time or by event (CMS publish, price change, stock update).`,
  realWorldUsage: `**Revalidation strategy by content type:**

| Content Type | Strategy | Revalidate |
|---|---|---|
| Homepage hero | On-demand | CMS publish webhook |
| Product pages | Time + On-demand | 1hr + price change webhook |
| Blog posts | On-demand | CMS publish webhook |
| Navigation | On-demand | CMS publish webhook |
| Exchange rates | Time-based | 5 minutes |
| Static pages | Never | Deploy only |`,
  howItWorks: `**On-demand revalidation flow:**

1. Editor publishes a blog post in CMS
2. CMS sends POST to \`/api/revalidate\` with \`{ type: 'post', slug: 'my-post' }\`
3. Route Handler verifies webhook secret
4. Calls \`revalidateTag('posts')\` and \`revalidatePath('/blog/my-post')\`
5. Next.js marks those cache entries as stale
6. Next request to \`/blog/my-post\` triggers a background rebuild
7. Fresh HTML served to subsequent requests`,
  example: {
    title: 'Complete Revalidation Setup',
    description: 'A production-ready revalidation webhook with tag-based invalidation.',
    code: [
      {
        label: 'Tagging fetch calls',
        language: 'ts',
        code: `// lib/data/posts.ts
export async function getPost(slug: string) {
  const res = await fetch(
    \`https://cms.example.com/posts/\${slug}\`,
    {
      next: {
        revalidate: 86400, // 24hr safety net
        tags: [
          'posts',           // All posts
          \`post-\${slug}\`,  // This specific post
        ],
      },
    }
  );
  return res.json();
}

export async function getNavigation() {
  const res = await fetch('https://cms.example.com/navigation', {
    next: { revalidate: 3600, tags: ['navigation'] },
  });
  return res.json();
}`,
      },
      {
        label: 'Revalidation webhook',
        language: 'ts',
        code: `// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_SECRET = process.env.CMS_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  // 1. Verify secret
  const secret = req.headers.get('x-webhook-secret');
  if (secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const body = await req.json();
  const { type, slug } = body;

  // 2. Revalidate based on content type
  switch (type) {
    case 'post':
      revalidateTag('posts');           // All post listings
      revalidateTag(\`post-\${slug}\`);  // This specific post
      revalidatePath(\`/blog/\${slug}\`); // Specific URL
      break;

    case 'navigation':
      revalidateTag('navigation');       // All pages with navigation
      break;

    case 'product':
      revalidateTag('products');
      revalidateTag(\`product-\${slug}\`);
      break;

    default:
      return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  }

  return NextResponse.json({
    revalidated: true,
    type,
    slug,
    timestamp: new Date().toISOString(),
  });
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between revalidatePath and revalidateTag?',
      answer: 'revalidatePath invalidates a specific URL. revalidateTag invalidates all cache entries that used fetch() with that tag. Tags are more powerful — a single CMS publish can revalidate the post page, the blog listing, and the homepage (all tagged with "posts") with one revalidateTag("posts") call.',
    },
    {
      question: 'Does revalidation happen immediately?',
      answer: 'revalidatePath and revalidateTag mark cache entries as stale immediately. The actual rebuild happens on the NEXT request to that path. So the current request sees stale data, and the next user gets fresh data. This is stale-while-revalidate behaviour.',
    },
    {
      question: 'Can I call revalidatePath from a Client Component?',
      answer: 'No — revalidatePath and revalidateTag are server-only functions. Call them from Server Actions or Route Handlers. A Client Component can trigger a Server Action that calls revalidatePath, or POST to a Route Handler that calls it.',
    },
  ],
  productionIssues: [
    'Revalidation not working on self-hosted setups — revalidatePath/revalidateTag work per-server-instance. If you have multiple server instances, only the instance that received the webhook revalidates. Use a shared cache store (Redis) with the Next.js cache handler for multi-instance setups.',
    'Missing the leading slash in revalidatePath — revalidatePath("products/slug") without a leading slash does not work. Always use revalidatePath("/products/slug").',
    'Over-invalidating with broad tags — revalidateTag("all") on a large site triggers rebuilds of thousands of pages simultaneously, causing a server spike. Use specific tags and invalidate only what changed.',
  ],
  bestPractices: [
    'Tag every fetch call with at least one meaningful tag — enables precise on-demand invalidation',
    'Use hierarchical tags: ["posts", "post-slug"] — revalidate all or specific',
    'Always verify webhook secrets — an unprotected revalidation endpoint is a DoS vector',
    'Combine time-based (safety net) with on-demand (immediate) revalidation',
    'Log all revalidation events with timestamps for debugging stale content reports',
  ],
  architectNote: `Design your tag taxonomy before writing any fetch calls. A consistent tagging strategy — e.g., ["entity-type", "entity-type-id"] — makes on-demand revalidation predictable and maintainable. Document it in your team\'s architecture decision records (ADRs).`,
  faqs: [
    {
      question: 'How do I revalidate a page from a Server Action?',
      answer: 'Call revalidatePath() or revalidateTag() directly inside the Server Action before returning. Example: async function updateProduct(data) { "use server"; await db.product.update({...}); revalidatePath("/products/" + data.slug); }',
    },
    {
      question: 'What happens if revalidation fails (the data source is down)?',
      answer: 'The stale cached content continues to be served. Next.js does not replace the cache with an error state. This is actually desirable — users see stale but valid content rather than an error page. The cache acts as a resilience layer.',
    },
    {
      question: 'Can I revalidate from outside the Next.js app?',
      answer: 'Yes — create a Route Handler endpoint and call it from anywhere (CI/CD pipeline, CMS, external service). This is the standard pattern for CMS-driven sites: CMS publishes → webhook fires → Route Handler calls revalidateTag.',
    },
  ],
  keyTakeaways: [
    'Three revalidation strategies: time-based (revalidate: N), path-based, and tag-based',
    'revalidateTag is more powerful than revalidatePath — one call can refresh many pages',
    'Tag every fetch call with meaningful tags for precise on-demand invalidation',
    'Revalidation marks cache as stale — the rebuild happens on the next request',
    'Always verify webhook secrets — unprotected endpoints are a DoS risk',
    'Stale-while-revalidate: users always get fast cached content, never wait for rebuilds',
  ],
  relatedTopics: ['nextjs-isr', 'nextjs-caching-strategies', 'nextjs-fetch-api', 'nextjs-route-handlers'],
};
