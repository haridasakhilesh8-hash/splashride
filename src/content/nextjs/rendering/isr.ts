import type { TopicContent } from '../../types';

export const nextjsISR: TopicContent = {
  slug: 'nextjs-isr',
  title: 'Incremental Static Regeneration (ISR)',
  description: 'Master ISR — the Next.js feature that gives you static performance with dynamic freshness. Learn time-based and on-demand revalidation for real production systems.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'ISR lets you pre-build static pages that automatically refresh in the background after a set time. Users always get fast static HTML. After the revalidation window expires, the next request triggers a background rebuild. The stale page is served while the fresh one is being built.',
  whatIsIt: `Incremental Static Regeneration (ISR) is a hybrid between SSG and SSR:

- Pages are **pre-built as static HTML** (like SSG) — fast CDN delivery
- After a **revalidation period**, the next request triggers a **background rebuild**
- The **stale page is served** while the fresh page is being built (stale-while-revalidate)
- Once rebuilt, the **fresh page replaces the stale one** for subsequent requests

**Two types of ISR:**
1. **Time-based** — revalidate every N seconds (\`next: { revalidate: 3600 }\`)
2. **On-demand** — trigger revalidation via \`revalidatePath()\` or \`revalidateTag()\` from a webhook`,
  whyWeNeedIt: `SSG is fast but stale. SSR is fresh but slow. ISR gives you both:

- **Static performance** — CDN-served HTML, no server per request
- **Dynamic freshness** — pages update automatically, no full rebuild needed
- **Scalable** — only the changed pages rebuild, not the entire site
- **On-demand** — CMS publish triggers immediate page update, not a full deploy

Without ISR, a 10,000-page product catalog would need either:
- A full rebuild on every product change (slow CI/CD), or
- SSR for every request (expensive at scale)`,
  realWorldUsage: `**ISR patterns in production:**

- **Product pages** — \`revalidate: 3600\` (hourly) for prices and stock
- **Blog posts** — on-demand revalidation from CMS publish webhook
- **News articles** — \`revalidate: 300\` (5 min) for breaking news sections
- **Homepage** — on-demand revalidation when featured content changes
- **Documentation** — on-demand revalidation on Git push

**Real example:** An e-commerce site with 200,000 products uses ISR with \`revalidate: 3600\`. When a product price changes, a webhook calls \`revalidatePath('/products/[slug]')\` for just that product — no full rebuild needed.`,
  howItWorks: `**Time-based ISR flow:**

1. Build time: page is pre-rendered as static HTML
2. Request 1 (within revalidation window): CDN serves cached HTML instantly
3. Revalidation window expires (e.g., 60 seconds)
4. Request 2 (after window): CDN serves stale HTML AND triggers background rebuild
5. Background rebuild: Next.js re-runs the Server Component, fetches fresh data
6. Request 3+: CDN serves the newly built HTML

**On-demand ISR flow:**
1. CMS editor publishes a new blog post
2. CMS sends a webhook to \`/api/revalidate?tag=blog\`
3. Route Handler calls \`revalidateTag('blog')\`
4. Next.js invalidates all pages tagged with \'blog\'
5. Next request to any blog page triggers a fresh rebuild`,
  example: {
    title: 'Time-based and On-demand ISR',
    description: 'Both ISR patterns used together in a content-heavy application.',
    code: [
      {
        label: 'Time-based ISR',
        language: 'tsx',
        code: `// app/products/[slug]/page.tsx
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetch(
    \`https://api.example.com/products/\${params.slug}\`,
    {
      next: {
        revalidate: 3600, // Revalidate every hour
        tags: ['products', \`product-\${params.slug}\`], // Tag for on-demand revalidation
      },
    }
  ).then((r) => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p className="price">£{product.price}</p>
    </div>
  );
}

// Route is static at build time, revalidated every hour`,
      },
      {
        label: 'On-demand revalidation webhook',
        language: 'ts',
        code: `// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify the webhook secret
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { type, slug } = await request.json();

  if (type === 'product') {
    // Revalidate a specific product page
    revalidatePath(\`/products/\${slug}\`);
    // OR revalidate by tag (all pages with this tag)
    revalidateTag(\`product-\${slug}\`);
  }

  if (type === 'blog') {
    revalidateTag('blog'); // Revalidates ALL blog pages
  }

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does ISR guarantee fresh data within the revalidation window?',
      answer: 'No — ISR uses stale-while-revalidate. A user might see data that is up to (revalidation period + rebuild time) old. For most content (product descriptions, blog posts), this is acceptable. For truly real-time data (stock prices, live inventory), use SSR.',
    },
    {
      question: 'What is the difference between revalidatePath and revalidateTag?',
      answer: 'revalidatePath invalidates a specific URL path (e.g., /products/my-product). revalidateTag invalidates all pages that used fetch() with that tag. Tags are more flexible — one CMS publish can revalidate multiple pages (the product page, the category page, the homepage) with a single revalidateTag call.',
    },
    {
      question: 'Does ISR work outside of Vercel?',
      answer: 'Time-based ISR works on any Node.js host — Next.js handles it internally. On-demand ISR (revalidatePath/revalidateTag) also works on any host. However, the caching infrastructure on Vercel is more sophisticated (global CDN invalidation). On self-hosted setups, caching is per-server-instance.',
    },
  ],
  productionIssues: [
    'Cache stampede — when a popular page\'s revalidation window expires, multiple simultaneous requests can all trigger a rebuild. Next.js deduplicates this, but under extreme load, configure a distributed cache (Redis) as the ISR cache store.',
    'On-demand revalidation not working — revalidatePath and revalidateTag must be called from a Server Action or Route Handler, not from a Client Component. Also ensure the path matches exactly — revalidatePath(\'products/slug\') without leading slash will not work.',
    'ISR and personalised content — never use ISR for user-specific pages. ISR serves the same cached HTML to all users. A logged-in user would see another user\'s data. Use SSR for personalised content.',
  ],
  bestPractices: [
    'Tag all fetch calls with meaningful tags — enables precise on-demand revalidation',
    'Use on-demand ISR for CMS-driven content — pages update the moment editors publish',
    'Set revalidate based on how stale the content can be, not how often it changes',
    'Combine time-based (safety net) with on-demand (immediate) revalidation',
    'Never use ISR for user-specific or personalised content — use SSR',
  ],
  architectNote: `ISR is one of Next.js\'s most powerful and underused features. The combination of time-based + on-demand revalidation gives you a **content delivery architecture that rivals dedicated CDN + CMS setups at a fraction of the complexity**.

For enterprise content platforms: design your revalidation strategy upfront. Map every content type to a revalidation strategy: static (never changes), ISR-time (changes occasionally), ISR-on-demand (changes on publish), SSR (changes per user). This mapping becomes your caching architecture.`,
  faqs: [
    {
      question: 'What is the minimum revalidation time?',
      answer: 'Next.js enforces a minimum of 1 second. In practice, use at least 60 seconds for most content. Very short revalidation times (< 60s) approach SSR performance characteristics — you might as well use SSR at that point.',
    },
    {
      question: 'How do I revalidate a layout that is shared across many pages?',
      answer: 'Layouts are not independently revalidated — they revalidate with their child pages. To revalidate navigation that appears in a layout, use revalidateTag on the tag used by the layout\'s fetch call. All pages sharing that layout will get fresh navigation data.',
    },
    {
      question: 'Can I use ISR with database queries (not just fetch)?',
      answer: 'Yes — use unstable_cache from next/cache to wrap database queries. It provides the same revalidation semantics as fetch. Example: const getCachedUser = unstable_cache(async (id) => db.user.findUnique({ where: { id } }), ["user"], { revalidate: 3600, tags: ["users"] })',
    },
  ],
  keyTakeaways: [
    'ISR = static performance + dynamic freshness — the best of SSG and SSR',
    'Stale-while-revalidate: users get fast cached HTML, rebuild happens in the background',
    'Time-based ISR: set revalidate in seconds on fetch calls',
    'On-demand ISR: call revalidatePath() or revalidateTag() from webhooks',
    'Tag fetch calls for precise on-demand invalidation of specific content',
    'Never use ISR for personalised/user-specific content — use SSR',
  ],
  relatedTopics: ['nextjs-ssg', 'nextjs-ssr', 'nextjs-caching', 'nextjs-revalidation'],
};
