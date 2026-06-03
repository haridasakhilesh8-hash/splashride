import type { TopicContent } from '../../types';

export const nextjsDynamicRoutes: TopicContent = {
  slug: 'nextjs-dynamic-routes',
  title: 'Dynamic Routes',
  description: 'Master dynamic routes in Next.js — [slug], [...slug], [[...slug]] patterns, generateStaticParams, and how to handle every routing scenario in production.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Dynamic routes use square bracket notation in folder names: [slug] matches one segment, [...slug] matches multiple segments, [[...slug]] matches zero or more. The matched values are available in the params prop of your page component.',
  whatIsIt: `Dynamic routes in Next.js use folder names with square brackets to match URL segments:

- **\`[slug]\`** — matches exactly one segment: \`/products/widget\` → \`params.slug = 'widget'\`
- **\`[...slug]\`** — catch-all: \`/docs/a/b/c\` → \`params.slug = ['a', 'b', 'c']\`
- **\`[[...slug]]\`** — optional catch-all: also matches \`/docs\` (no segments)
- **Multiple params**: \`/blog/[category]/[slug]\` → \`{ category, slug }\`

**generateStaticParams** tells Next.js which dynamic values to pre-build at build time (SSG). Without it, dynamic routes are rendered on-demand (SSR or ISR).`,
  whyWeNeedIt: `Without dynamic routes, you would need a separate \`page.tsx\` for every product, blog post, or user profile. Dynamic routes let one file handle thousands of URLs.

Combined with \`generateStaticParams\`, you get the best of both worlds: one file handles all URLs, and all known URLs are pre-built as static HTML at build time.`,
  realWorldUsage: `**Dynamic route patterns in production:**

\`\`\`
app/
├── products/[slug]/page.tsx        # /products/blue-widget
├── blog/[category]/[slug]/page.tsx # /blog/tech/my-post
├── docs/[...path]/page.tsx         # /docs/api/auth/jwt
├── [[...slug]]/page.tsx            # / AND /anything/nested
└── users/[id]/
    ├── page.tsx                    # /users/123
    ├── orders/page.tsx             # /users/123/orders
    └── settings/page.tsx           # /users/123/settings
\`\`\``,
  howItWorks: `**How Next.js resolves dynamic params:**

1. URL \`/products/blue-widget\` arrives
2. Next.js matches \`app/products/[slug]/page.tsx\`
3. \`params\` is set to \`{ slug: 'blue-widget' }\`
4. The page component receives \`{ params }\` as a prop
5. If \`generateStaticParams\` includes \`'blue-widget'\`, serve pre-built HTML
6. If not, and \`dynamicParams = true\` (default): SSR on first request, cache after`,
  example: {
    title: 'Dynamic Route Patterns',
    description: 'Single param, multiple params, catch-all, and generateStaticParams.',
    code: [
      {
        label: 'Single dynamic segment',
        language: 'tsx',
        code: `// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

// Pre-build all known product pages at build time
export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: { slug: true },
    where: { active: true },
  });
  return products.map((p) => ({ slug: p.slug }));
}

// Per-page SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await db.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: 'Not Found' };
  return {
    title: \`\${product.name} | Shop\`,
    description: product.description,
    openGraph: { images: [product.imageUrl] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await db.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) notFound();

  return (
    <article>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </article>
  );
}`,
      },
      {
        label: 'Catch-all for documentation',
        language: 'tsx',
        code: `// app/docs/[...path]/page.tsx
// Matches: /docs/api, /docs/api/auth, /docs/api/auth/jwt

interface Props {
  params: { path: string[] };
}

export default async function DocsPage({ params }: Props) {
  // path is an array of segments
  // /docs/api/auth/jwt → ['api', 'auth', 'jwt']
  const filePath = params.path.join('/');
  const doc = await getDocContent(filePath);

  if (!doc) notFound();

  return (
    <article>
      <h1>{doc.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: doc.html }} />
    </article>
  );
}

// Generate all doc paths at build time
export async function generateStaticParams() {
  const docs = await getAllDocPaths(); // Returns ['api', 'api/auth', ...]
  return docs.map((path) => ({ path: path.split('/') }));
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between [...slug] and [[...slug]]?',
      answer: '[...slug] (catch-all) requires at least one segment — it does not match the base path. [[...slug]] (optional catch-all) also matches the base path with no segments. Use [[...slug]] when you want one page to handle both /docs and /docs/getting-started.',
    },
    {
      question: 'Do I need generateStaticParams for dynamic routes?',
      answer: 'No — it is optional. Without it, dynamic routes are rendered on-demand (SSR on first request, then cached if ISR). With it, known paths are pre-built at build time as static HTML. Use it for content you know at build time (products, blog posts). Skip it for user-generated content.',
    },
    {
      question: 'Can I have multiple dynamic segments in one route?',
      answer: 'Yes — app/blog/[category]/[slug]/page.tsx gives you params.category and params.slug. generateStaticParams returns objects with both: [{ category: "tech", slug: "my-post" }]. There is no practical limit on the number of dynamic segments.',
    },
  ],
  productionIssues: [
    'params is now async in Next.js 15 — you must await params: const { slug } = await params. This is a breaking change from Next.js 14. Update all dynamic route pages when upgrading.',
    'generateStaticParams fetching all data instead of just params — fetching full product objects when you only need slugs wastes build time and memory. Always use select: { slug: true }.',
    'Missing notFound() for invalid params — if a slug does not exist in the DB, the page will throw a 500 error. Always check if the data exists and call notFound() if not.',
  ],
  bestPractices: [
    'Always call notFound() when the dynamic param does not match a real resource',
    'Use generateStaticParams with minimal field selection — only fetch the param fields',
    'Set dynamicParams = false for closed catalogs where all paths are known at build time',
    'Use generateMetadata alongside generateStaticParams for per-page SEO',
    'Await params in Next.js 15 — it is now a Promise',
  ],
  architectNote: `Dynamic routes with generateStaticParams are the foundation of scalable content architectures in Next.js. The pattern of pre-building known paths + on-demand rendering for unknown paths (dynamicParams = true) is the right default for most content sites — it balances build time, performance, and content freshness.`,
  faqs: [
    {
      question: 'How do I redirect from a dynamic route?',
      answer: 'Import redirect from next/navigation and call it in the Server Component: if (!product) redirect("/products"). For permanent redirects (301), use redirect(url, RedirectType.replace). For temporary (307), use redirect(url) (default).',
    },
    {
      question: 'Can I use dynamic routes with Route Handlers?',
      answer: 'Yes — app/api/products/[id]/route.ts creates a dynamic API endpoint. The id is available in the second argument: export async function GET(req, { params }) { const { id } = await params; }.',
    },
    {
      question: 'What happens when generateStaticParams returns an empty array?',
      answer: 'No pages are pre-built. All requests are handled on-demand (SSR or ISR depending on your revalidate setting). This is valid for content-heavy sites where pre-building all pages would take too long.',
    },
  ],
  keyTakeaways: [
    '[slug] matches one segment, [...slug] matches multiple, [[...slug]] matches zero or more',
    'generateStaticParams pre-builds known paths at build time for static performance',
    'dynamicParams = true (default) SSRs unknown paths; false returns 404',
    'Always call notFound() for invalid params — never let it throw a 500',
    'params is async in Next.js 15 — always await it',
    'Use generateMetadata alongside generateStaticParams for complete SEO coverage',
  ],
  relatedTopics: ['nextjs-nested-routes', 'nextjs-route-groups', 'nextjs-ssg', 'nextjs-project-structure'],
};
