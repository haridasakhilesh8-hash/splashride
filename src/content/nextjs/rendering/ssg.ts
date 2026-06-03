import type { TopicContent } from '../../types';

export const nextjsSSG: TopicContent = {
  slug: 'nextjs-ssg',
  title: 'Static Site Generation (SSG)',
  description: 'Master Static Site Generation in Next.js — pre-building pages at deploy time for maximum performance, CDN delivery, and zero server costs.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'SSG pre-builds your pages as static HTML at deploy time. The result is served instantly from a CDN — no server processing, no database queries per request, just files. In the App Router, routes are static by default unless you opt into dynamic rendering.',
  whatIsIt: `Static Site Generation (SSG) pre-renders pages to HTML at **build time** (\`next build\`). The HTML files are:

- Stored and served from a CDN
- Identical for every user (no personalisation)
- Blazing fast — no server processing per request
- Infinitely scalable — CDN handles any traffic spike

**In the App Router, SSG is the default.** A route is static unless it:
- Reads \`cookies()\` or \`headers()\`
- Uses \`searchParams\`
- Calls \`fetch\` with \`cache: 'no-store'\`
- Exports \`dynamic = 'force-dynamic'\`

For dynamic routes (\`/blog/[slug]\`), use \`generateStaticParams\` to tell Next.js which slugs to pre-build.`,
  whyWeNeedIt: `SSG is the fastest possible way to serve web content:

- **No server cost per request** — CDN serves a file, no compute needed
- **Sub-50ms response times** — CDN edge nodes are geographically close to users
- **Infinite scalability** — CDN absorbs traffic spikes without autoscaling
- **No database at request time** — database is only queried at build time
- **Perfect SEO** — full HTML available for crawlers immediately

For content that doesn\'t change per user (marketing pages, blog posts, docs, product listings), SSG is almost always the right choice.`,
  realWorldUsage: `**SSG in a real e-commerce platform:**

- \`/\` — homepage with featured products (SSG, rebuilt on deploy)
- \`/products\` — product listing (SSG + ISR, revalidated hourly)
- \`/products/[slug]\` — each product page (SSG with generateStaticParams)
- \`/blog\` — blog listing (SSG, rebuilt on new post)
- \`/blog/[slug]\` — each blog post (SSG, rebuilt on edit)
- \`/about\`, \`/pricing\`, \`/contact\` — pure static HTML

A large e-commerce site might pre-build 500,000 product pages. Next.js handles this with parallel build workers.`,
  howItWorks: `**SSG build pipeline:**

1. \`next build\` starts
2. Next.js identifies static routes (no dynamic dependencies)
3. For dynamic routes, it calls \`generateStaticParams\` to get all slugs
4. It renders each route as an async Server Component, fetching data
5. Outputs HTML files + RSC payloads for each route
6. At runtime, CDN serves the pre-built files instantly

**generateStaticParams:**
\`\`\`ts
export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}
\`\`\`
Next.js calls this at build time to know which dynamic routes to pre-render.`,
  example: {
    title: 'SSG with Dynamic Routes',
    description: 'Pre-building a blog with dynamic slugs using generateStaticParams.',
    code: [
      {
        label: 'app/blog/[slug]/page.tsx',
        language: 'tsx',
        code: `import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

// Tell Next.js which slugs to pre-build at build time
export async function generateStaticParams() {
  const posts = await db.post.findMany({
    select: { slug: true },
    where: { published: true },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata per page (also at build time)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await db.post.findUnique({ where: { slug: params.slug } });
  return {
    title: post?.title ?? 'Post Not Found',
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await db.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.publishedAt.toLocaleDateString()}</time>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}`,
      },
      {
        label: 'Fallback behaviour for unknown slugs',
        language: 'tsx',
        code: `// Control what happens when a slug is not in generateStaticParams
// Option 1: 404 for unknown slugs (default)
export const dynamicParams = false;

// Option 2: SSR unknown slugs on first request, then cache (ISR behaviour)
export const dynamicParams = true; // default

// With dynamicParams = true:
// - Known slugs: served as static HTML from CDN
// - Unknown slugs: SSR on first request, cached as static after
// This is perfect for large catalogs where you can't pre-build everything`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does SSG mean I cannot have any dynamic content on the page?',
      answer: 'SSG pre-builds the server-rendered HTML. You can still have Client Components with dynamic content (fetched client-side after page load). The pattern: SSG for the static shell + Client Component for user-specific data. Example: a product page (SSG) with a personalised "Recently Viewed" section (client-side fetch).',
    },
    {
      question: 'What happens if a product is deleted after SSG builds the page?',
      answer: 'The stale page will still be served until the next build or ISR revalidation. Add a notFound() check in the component — if the product no longer exists in the DB, return notFound(). With ISR, the page will be updated within the revalidation window.',
    },
    {
      question: 'How long does SSG take for large sites?',
      answer: 'Next.js parallelises SSG across CPU cores. A site with 10,000 pages typically builds in 2–5 minutes. For 1M+ pages, use ISR instead — pre-build only the most popular pages and generate the rest on first request.',
    },
  ],
  productionIssues: [
    'Build time explosion — pre-building 100,000+ pages can take 30+ minutes. Solution: use ISR with dynamicParams = true, pre-build only the top 1,000 most-visited pages, and generate the rest on demand.',
    'Stale content after CMS updates — SSG pages do not update until the next build. Solution: use ISR with revalidate, or configure your CMS to trigger a rebuild webhook on publish.',
    'generateStaticParams fetching too much data — fetching full product objects when you only need slugs wastes build time and memory. Always select only the fields needed: { select: { slug: true } }.',
  ],
  bestPractices: [
    'Use SSG as the default for all non-personalised content',
    'Use generateStaticParams with { select: { slug: true } } — only fetch the fields needed for params',
    'Set dynamicParams = true for large catalogs — pre-build popular pages, generate the rest on demand',
    'Combine SSG with ISR for content that changes — pre-built but refreshed in the background',
    'Use generateMetadata alongside generateStaticParams for per-page SEO metadata',
  ],
  architectNote: `The default-static architecture of the App Router is one of its most important design decisions. By making static the default and dynamic the opt-in, Next.js nudges teams toward the most performant architecture automatically.

For enterprise: think of SSG as your **content CDN layer**. Marketing sites, documentation, product catalogs — these should be 100% static. Only the authenticated, personalised parts of your app need SSR. This separation dramatically reduces infrastructure costs and improves global performance.`,
  faqs: [
    {
      question: 'Can I use SSG with a database?',
      answer: 'Yes — the database is queried at build time (in generateStaticParams and the page component), not at request time. The built HTML contains the data baked in. This is how headless CMS integrations work — query at build, serve static HTML.',
    },
    {
      question: 'How do I trigger a rebuild when CMS content changes?',
      answer: 'Two approaches: (1) On-demand ISR — call revalidatePath() or revalidateTag() from a webhook endpoint when content changes. This updates specific pages without a full rebuild. (2) Deploy webhook — trigger a full next build on content publish. On-demand ISR is almost always better.',
    },
    {
      question: 'What is the difference between SSG and a plain HTML file?',
      answer: 'SSG pages are still React apps — Client Components hydrate and become interactive. The HTML shell is pre-built, but JavaScript loads and React takes over for interactivity. A plain HTML file has no React at all.',
    },
  ],
  keyTakeaways: [
    'SSG pre-builds HTML at deploy time — served from CDN, no server cost per request',
    'App Router routes are static by default — you opt into dynamic rendering',
    'Use generateStaticParams to pre-build dynamic routes at build time',
    'SSG + ISR is the most common production pattern for content-heavy sites',
    'dynamicParams = true lets Next.js SSR unknown slugs on first request and cache them',
    'For 100k+ pages, pre-build only popular pages and generate the rest on demand',
  ],
  relatedTopics: ['nextjs-isr', 'nextjs-ssr', 'nextjs-caching-strategies', 'nextjs-vercel-deployment'],
};
