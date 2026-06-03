import type { TopicContent } from '../types';

export const nextjsAppRouter: TopicContent = {
  slug: 'nextjs-app-router',
  title: 'Next.js App Router',
  description: 'Understand the Next.js App Router — the modern file-based routing system that changed how we build React applications.',
  applicableVersions: ['Next.js 13.4+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'The App Router is Next.js\'s modern routing system where your folder structure IS your routes. Create a folder called /app/dashboard/page.tsx and you automatically get the /dashboard route. It brings React Server Components, nested layouts, streaming, and built-in data fetching patterns.',
  whatIsIt: `The App Router (introduced in Next.js 13) is a complete reimagining of how Next.js handles routing and rendering. It\'s built on React Server Components.

**Key files in the App Router:**
- \`page.tsx\` — the UI for a route (makes the route publicly accessible)
- \`layout.tsx\` — shared UI wrapping child routes (persists across navigation)
- \`loading.tsx\` — automatic loading UI (Suspense boundary)
- \`error.tsx\` — error boundary for the route segment
- \`not-found.tsx\` — 404 UI
- \`route.ts\` — API endpoint (replaces pages/api)
- \`template.tsx\` — like layout but re-mounts on navigation

**Routing conventions:**
- \`app/page.tsx\` → \`/\`
- \`app/about/page.tsx\` → \`/about\`
- \`app/blog/[slug]/page.tsx\` → \`/blog/:slug\`
- \`app/(marketing)/page.tsx\` → \`/\` (route group, no URL impact)
- \`app/@modal/page.tsx\` → parallel route`,
  whyWeNeedIt: `The Pages Router (old system) had limitations:
- All components were client components (JavaScript sent to browser)
- Data fetching was complex (getServerSideProps, getStaticProps)
- Layouts required custom solutions
- No streaming support

The App Router solves all of this:
- **Server Components by default** — zero JavaScript sent for data-fetching components
- **Nested layouts** — layouts persist and don\'t re-render on navigation
- **Streaming** — page shells load instantly, content streams in
- **Simpler data fetching** — just use async/await in components`,
  realWorldUsage: `In a real Next.js 14 project, your app directory looks like:

\`\`\`
app/
  layout.tsx           ← Root layout (html, body, providers)
  page.tsx             ← Home page
  (auth)/
    login/page.tsx     ← /login
    signup/page.tsx    ← /signup
  (dashboard)/
    layout.tsx         ← Dashboard layout (sidebar, nav)
    dashboard/page.tsx ← /dashboard
    users/
      page.tsx         ← /users (list)
      [id]/page.tsx    ← /users/123 (detail)
  api/
    users/route.ts     ← GET/POST /api/users
\`\`\``,
  howItWorks: `**Server vs Client Components:**

By default, all components in the App Router are **Server Components** — they run on the server, have access to databases/APIs directly, and send zero JavaScript to the client.

Add \`'use client'\` at the top to make a component a **Client Component** — it runs in the browser and can use hooks, event handlers, and browser APIs.

**The rule:** Push \`'use client'\` as far down the tree as possible. Keep data fetching in Server Components, interactivity in Client Components.

**Data fetching:**
\`\`\`tsx
// Server Component — runs on server, no useEffect needed
async function UserList() {
  const users = await db.users.findMany(); // direct DB access!
  return <ul>{users.map(u => <li>{u.name}</li>)}</ul>;
}
\`\`\``,
  example: {
    title: 'App Router Patterns',
    description: 'Essential App Router patterns for production Next.js apps.',
    code: [
      {
        label: 'Root Layout',
        language: 'tsx',
        code: `// app/layout.tsx — runs on every page
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider } from '@/contexts/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { template: '%s | MyApp', default: 'MyApp' },
  description: 'The best app ever built',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}`,
      },
      {
        label: 'Server Component with Data',
        language: 'tsx',
        code: `// app/users/page.tsx — Server Component (no 'use client')
import { Suspense } from 'react';
import { UserTable } from '@/components/UserTable';
import { UserTableSkeleton } from '@/components/skeletons';

// Metadata can be dynamic
export async function generateMetadata() {
  return { title: 'Users' };
}

// This runs on the SERVER — direct DB/API access
async function getUsers(searchParams: { page?: string; search?: string }) {
  const page = Number(searchParams.page ?? 1);
  const search = searchParams.search ?? '';

  // Direct database call — no API route needed!
  const users = await db.users.findMany({
    where: { name: { contains: search } },
    skip: (page - 1) * 20,
    take: 20,
  });

  return users;
}

// searchParams are automatically available in page components
export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const users = await getUsers(searchParams);

  return (
    <main>
      <h1>Users</h1>
      {/* Suspense for streaming — table loads independently */}
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable users={users} />
      </Suspense>
    </main>
  );
}`,
      },
      {
        label: 'Dynamic Route with generateStaticParams',
        language: 'tsx',
        code: `// app/blog/[slug]/page.tsx

interface Props {
  params: { slug: string };
}

// Called at build time for SSG — generates static pages
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Dynamic metadata
export async function generateMetadata({ params }: Props) {
  const post = await fetchPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.coverImage],
    },
  };
}

// The page component
export default async function BlogPost({ params }: Props) {
  const post = await fetchPost(params.slug);

  if (!post) notFound(); // triggers not-found.tsx

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.publishedAt}</time>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}`,
      },
      {
        label: 'API Route Handler',
        language: 'tsx',
        code: `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';

// GET /api/users
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? 1);

  const users = await db.users.findMany({
    skip: (page - 1) * 20,
    take: 20,
  });

  return NextResponse.json({ users, page });
}

// POST /api/users
const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const parsed = CreateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await db.users.create({ data: parsed.data });
  return NextResponse.json(user, { status: 201 });
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between Server Components and Client Components?',
      answer: 'Server Components run only on the server — they can access databases, file system, and APIs directly, but can\'t use hooks or event handlers. Client Components run in the browser — they can use hooks and handle events, but can\'t access server resources directly. Default is Server; add "use client" to opt into Client.',
    },
    {
      question: 'Why can\'t I use useState in a Server Component?',
      answer: 'useState is a React hook that manages browser-side state. Server Components run on the server (at request time or build time) — there\'s no browser, no interactivity, no state. Add "use client" to the component to use hooks.',
    },
    {
      question: 'What is the difference between layout.tsx and template.tsx?',
      answer: 'layout.tsx persists across navigations within its segment — it doesn\'t remount. template.tsx creates a new instance on every navigation — it remounts. Use layouts for persistent UI (sidebars, nav). Use templates when you need something to animate in on every navigation.',
    },
    {
      question: 'Can I use the App Router and Pages Router in the same project?',
      answer: 'Yes. Next.js supports both simultaneously during migration. Files in /app use the App Router; files in /pages use the Pages Router. This lets you migrate incrementally.',
    },
  ],
  productionIssues: [
    '"use client" creep — too many components marked as client components, losing the server rendering benefits. Audit and push client boundaries down.',
    'Hydration mismatch — server renders different HTML than client. Usually caused by accessing browser APIs (window, localStorage) in a component that also renders on the server.',
    'Layout not updating — you expected the layout to re-render on navigation, but layouts persist. Use template.tsx if you need re-mounting.',
    'Slow page loads despite SSR — data fetching waterfalls. Fetch data in parallel: const [a, b] = await Promise.all([fetchA(), fetchB()]).',
    'Large bundle size — not using dynamic imports. Use next/dynamic for heavy components that aren\'t needed on initial load.',
  ],
  bestPractices: [
    'Keep components as Server Components by default — add "use client" only when needed.',
    'Fetch data as close to where it\'s used as possible — Server Components can fetch directly.',
    'Use loading.tsx for automatic loading states — it creates a Suspense boundary automatically.',
    'Use generateStaticParams for known dynamic routes — enables static generation for performance.',
    'Use next/image for all images — automatic optimization, lazy loading, and WebP conversion.',
    'Parallel fetch with Promise.all to avoid request waterfalls.',
  ],
  architectNote: `The App Router represents a fundamental shift in how we think about React rendering. The key mental model: **components are server-first by default**.

**Architecture principle:** The boundary between server and client should be at the leaf level. Data fetching, access control, and database queries belong in Server Components. Interactivity (clicks, inputs, animations) belongs in Client Components.

**For large teams:** Establish conventions early — where does auth live? How do you handle loading states? What\'s the pattern for mutations? The App Router gives you the tools; your team needs to agree on how to use them.`,
  faqs: [
    {
      question: 'Should I migrate from Pages Router to App Router?',
      answer: 'For new projects: always use App Router. For existing projects: migrate when you have a clear benefit (performance, developer experience) and the time to do it properly. The incremental migration path works well — migrate route by route.',
    },
    {
      question: 'How do Server Actions work?',
      answer: 'Server Actions are functions marked with "use server" that run on the server but can be called from Client Components. They\'re the modern replacement for API routes for form submissions and mutations. They integrate with React\'s transition system for optimistic updates.',
    },
    {
      question: 'What is the difference between fetch caching in App Router vs useEffect?',
      answer: 'In App Router, fetch() is extended with caching options: { cache: "force-cache" } for SSG, { cache: "no-store" } for SSR, { next: { revalidate: 60 } } for ISR. This is declarative and built into the framework. useEffect-based fetching is client-side only and has no built-in caching.',
    },
  ],
  keyTakeaways: [
    'Folder structure = routes; page.tsx makes a route accessible',
    'Server Components by default — add "use client" only for interactivity',
    'layout.tsx persists; loading.tsx auto-creates Suspense; error.tsx catches errors',
    'Fetch data directly in Server Components — no API routes needed for reads',
    'Use generateStaticParams for SSG, revalidate for ISR',
    'Push "use client" as far down the tree as possible',
  ],
  relatedTopics: ['nextjs-ssr', 'nextjs-ssg', 'nextjs-isr', 'nextjs-api-routes'],
};

export const nextjsSSR: TopicContent = {
  slug: 'nextjs-ssr',
  title: 'Server-Side Rendering (SSR)',
  description: 'Understand SSR in Next.js — when to use it, how it works, and the trade-offs compared to SSG and ISR.',
  applicableVersions: ['Next.js 13+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'SSR means the HTML for a page is generated on the server on every request. When a user visits /dashboard, Next.js runs your component on the server, fetches fresh data, generates HTML, and sends it to the browser. The user sees content immediately (good for SEO and performance), and the data is always fresh.',
  whatIsIt: `Server-Side Rendering generates HTML at **request time** — every time someone visits the page.

**In App Router:** Any async Server Component that uses \`{ cache: 'no-store' }\` or \`cookies()\`/\`headers()\` is automatically SSR.

**In Pages Router (legacy):** Use \`getServerSideProps\` to opt into SSR.

SSR is the right choice when:
- Data changes frequently (real-time stock prices, live scores)
- Content is user-specific (dashboard, profile)
- You need to access request headers or cookies
- SEO is critical AND data changes per request`,
  whyWeNeedIt: `Without SSR, you have two options:
- **CSR (Client-Side Rendering)** — browser downloads JS, fetches data, renders. Slow first load, bad SEO.
- **SSG** — HTML generated at build time. Fast, but stale data.

SSR gives you the best of both: fresh data AND fast initial load. The trade-off is server cost and latency on every request.`,
  realWorldUsage: `**Use SSR for:**
- User dashboards (personalized, can't be cached globally)
- Product pages with real-time inventory/pricing
- Search results pages
- Authenticated content

**Don't use SSR for:**
- Marketing pages (use SSG — they don't change per request)
- Blog posts (use ISR — they change infrequently)
- Static documentation (SSG is perfect)`,
  howItWorks: `**App Router SSR:**
\`\`\`tsx
// This component is SSR because it uses cookies() — request-specific
import { cookies } from 'next/headers';

async function Dashboard() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;
  const data = await fetchUserDashboard(userId);
  return <DashboardUI data={data} />;
}
\`\`\`

**Pages Router SSR (legacy):**
\`\`\`tsx
export async function getServerSideProps(context) {
  const { req, params, query } = context;
  const data = await fetchData(params.id);
  return { props: { data } };
}
\`\`\``,
  example: {
    title: 'SSR Patterns in Next.js App Router',
    description: 'How to implement SSR correctly in the App Router.',
    code: [
      {
        label: 'SSR with Dynamic Data',
        language: 'tsx',
        code: `// app/dashboard/page.tsx
// This is SSR because:
// 1. It uses cookies() — request-specific
// 2. The fetch has cache: 'no-store'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getUserData(userId: string) {
  const res = await fetch(\`\${process.env.API_URL}/users/\${userId}\`, {
    cache: 'no-store', // Always fetch fresh data
    headers: { Authorization: \`Bearer \${process.env.API_SECRET}\` },
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) {
    redirect('/login'); // Server-side redirect
  }

  // Parallel data fetching — don't await sequentially!
  const [user, stats, notifications] = await Promise.all([
    getUserData(sessionToken),
    getStats(sessionToken),
    getNotifications(sessionToken),
  ]);

  return (
    <main>
      <h1>Welcome back, {user.name}</h1>
      <StatsGrid stats={stats} />
      <NotificationList items={notifications} />
    </main>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between SSR and SSG?',
      answer: 'SSR runs on every request — always fresh data, higher server load. SSG runs at build time — instant delivery from CDN, but data can be stale. ISR is in between — static pages that revalidate on a schedule.',
    },
    {
      question: 'Does SSR hurt performance?',
      answer: 'SSR adds server processing time to every request (TTFB increases). But it reduces Time to First Contentful Paint because HTML is pre-rendered. The net effect depends on your server speed vs client JavaScript parsing time. For content-heavy pages, SSR usually wins.',
    },
  ],
  productionIssues: [
    'Slow TTFB — SSR page is doing too much work per request. Cache expensive computations, use edge runtime, or consider ISR.',
    'Memory leaks on the server — stateful modules that accumulate data across requests. Keep server components stateless.',
    'Environment variables not available — server-only env vars (without NEXT_PUBLIC_) are not sent to the client. Access them only in Server Components.',
  ],
  bestPractices: [
    'Use parallel data fetching with Promise.all — never await sequentially.',
    'Cache database queries and API calls where appropriate — not everything needs to be fresh per request.',
    'Use streaming (Suspense) to send the page shell immediately and stream in slow content.',
    'Consider Edge Runtime for SSR pages that need low latency globally.',
  ],
  architectNote: `SSR is powerful but has a cost: every request hits your server. Design your SSR pages to be fast — keep data fetching parallel, use caching where appropriate, and consider streaming for slow data sources.

**The modern pattern:** Use SSR for the page shell and personalized data, but stream in slower secondary content with Suspense boundaries.`,
  faqs: [
    {
      question: 'Can I mix SSR and SSG in the same Next.js app?',
      answer: 'Yes. In the App Router, each page independently decides its rendering strategy based on how it fetches data. One page can be SSG, another SSR, another ISR — all in the same app.',
    },
  ],
  keyTakeaways: [
    'SSR generates HTML on every request — always fresh data',
    'Use for user-specific content, real-time data, and auth-gated pages',
    'In App Router: use cookies()/headers() or cache:"no-store" to trigger SSR',
    'Fetch data in parallel with Promise.all — never sequentially',
    'Higher server cost than SSG — cache aggressively where possible',
  ],
  relatedTopics: ['nextjs-app-router', 'nextjs-ssg', 'nextjs-isr'],
};

export const nextjsSSG: TopicContent = {
  slug: 'nextjs-ssg',
  title: 'Static Site Generation (SSG)',
  description: 'Learn SSG in Next.js — generating HTML at build time for maximum performance and CDN-friendly delivery.',
  applicableVersions: ['Next.js 13+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'SSG generates your pages\' HTML at build time (when you run npm run build). The resulting HTML files are served from a CDN — no server processing on each request. This makes SSG pages the fastest possible: they\'re just static files served from the edge.',
  whatIsIt: `Static Site Generation pre-renders pages to HTML during the build process. The HTML is then served from a CDN, making it extremely fast.

**In App Router:** Components that don\'t use request-specific APIs (cookies, headers) and use \`{ cache: 'force-cache' }\` are statically generated by default.

**In Pages Router (legacy):** Use \`getStaticProps\` for SSG and \`getStaticPaths\` for dynamic SSG routes.

**Best for:**
- Marketing/landing pages
- Blog posts and documentation
- Product catalogs (with ISR for updates)
- Any content that doesn\'t change per user`,
  whyWeNeedIt: `SSG is the fastest possible rendering strategy because:
- HTML is pre-built — no server processing per request
- Files are served from CDN edge nodes worldwide
- No database queries at request time
- Scales infinitely — CDN handles any traffic spike`,
  realWorldUsage: `**Classic SSG use cases:**
- Company website / marketing pages
- Blog (posts generated from Markdown/CMS at build time)
- Documentation sites (like this one!)
- E-commerce product pages (with ISR for inventory)
- Portfolio sites`,
  howItWorks: `**App Router SSG (default behavior):**
\`\`\`tsx
// This is SSG by default — no request-specific APIs used
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetch(\`/api/posts/\${params.slug}\`, {
    cache: 'force-cache' // default — cache at build time
  }).then(r => r.json());
  return <article>{post.content}</article>;
}

// Tell Next.js which slugs to generate at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}
\`\`\``,
  example: {
    title: 'SSG Blog with Dynamic Routes',
    description: 'Building a statically generated blog with dynamic routes.',
    code: [
      {
        label: 'Static Blog Page',
        language: 'tsx',
        code: `// app/blog/[slug]/page.tsx — fully static

export async function generateStaticParams() {
  // Called at BUILD TIME — generates the list of static pages
  const posts = await cms.getPosts({ limit: 1000 });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [{ url: post.coverImage }] },
  };
}

async function getPost(slug: string) {
  // cache: 'force-cache' is the default for fetch in Next.js
  const res = await fetch(\`\${CMS_URL}/posts/\${slug}\`, {
    next: { tags: [\`post-\${slug}\`] }, // for on-demand revalidation
  });
  return res.json();
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto">
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <img src={post.coverImage} alt={post.title} />
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What happens when I update content on my CMS — does SSG update automatically?',
      answer: 'No — SSG pages are built once. To update them, you either rebuild the whole site, use ISR (revalidate on a schedule), or use on-demand revalidation (trigger a rebuild for specific pages via a webhook from your CMS).',
    },
    {
      question: 'What is the build time impact of SSG with thousands of pages?',
      answer: 'Each page requires a fetch and render at build time. 10,000 pages might take 10-20 minutes to build. Solutions: use ISR for pages that don\'t need to be pre-built, use generateStaticParams with a limit for the most important pages, or use on-demand ISR.',
    },
  ],
  productionIssues: [
    'Stale content — SSG pages show old data after CMS updates. Use ISR or on-demand revalidation.',
    'Build time too long — generating too many static pages. Limit generateStaticParams to top pages; use ISR for the rest.',
    'Missing pages — generateStaticParams didn\'t include all slugs. Set dynamicParams = true (default) to SSR missing pages.',
  ],
  bestPractices: [
    'Use SSG for content that doesn\'t change per user and changes infrequently.',
    'Combine with ISR for content that changes — get static speed with freshness.',
    'Set up CMS webhooks to trigger on-demand revalidation when content is published.',
    'Use generateStaticParams for the most-visited pages; let others be SSR.',
  ],
  architectNote: `SSG is the gold standard for performance. When you can use it, you should. The pattern in 2024: use SSG + ISR for most content pages, SSR only for truly dynamic/personalized content.

**On-demand revalidation** (revalidatePath / revalidateTag) is the modern answer to the "stale content" problem — your CMS calls a webhook, Next.js invalidates only the affected pages.`,
  faqs: [
    {
      question: 'Can I use SSG with a database instead of a CMS?',
      answer: 'Yes. Any async data source works — database, CMS, file system, API. The key is that the data is fetched at build time, not request time. Just make sure your database is accessible from your build environment.',
    },
  ],
  keyTakeaways: [
    'SSG generates HTML at build time — fastest possible delivery via CDN',
    'Use generateStaticParams to pre-build dynamic routes',
    'Perfect for marketing pages, blogs, documentation',
    'Combine with ISR for content that updates periodically',
    'On-demand revalidation for instant cache purging on content updates',
  ],
  relatedTopics: ['nextjs-app-router', 'nextjs-ssr', 'nextjs-isr'],
};

export const nextjsISR: TopicContent = {
  slug: 'nextjs-isr',
  title: 'Incremental Static Regeneration (ISR)',
  description: 'Learn ISR — Next.js\'s hybrid rendering strategy that gives you static performance with dynamic freshness.',
  applicableVersions: ['Next.js 9.5+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'ISR is the best of both worlds: pages are statically generated (fast CDN delivery) but automatically regenerated in the background after a specified time interval. A product page might regenerate every 60 seconds — users always get a fast static page, and the data is never more than 60 seconds old.',
  whatIsIt: `ISR allows you to create or update static pages after the site has been built, without rebuilding the entire site.

**How it works:**
1. Page is generated statically at build time (or on first request)
2. After the revalidation period expires, the next request serves the stale page AND triggers a background regeneration
3. Once regenerated, subsequent requests get the fresh page

**Two types of ISR:**
- **Time-based ISR** — revalidate every N seconds
- **On-demand ISR** — revalidate when you explicitly call revalidatePath() or revalidateTag()`,
  whyWeNeedIt: `ISR solves the core SSG problem: stale data. With pure SSG, your content is only as fresh as your last build. With ISR, content can be automatically refreshed without a full rebuild.

**ISR vs SSR:** ISR is faster (serves cached static page) and cheaper (no server processing per request). SSR is always fresh. ISR is the right choice when "fresh enough" is acceptable.`,
  realWorldUsage: `**ISR sweet spots:**
- E-commerce product pages (inventory/price updates every 5 minutes)
- News articles (regenerate when updated)
- Blog posts
- Any content that changes but doesn\'t need real-time freshness`,
  howItWorks: `**App Router ISR:**
\`\`\`tsx
// Revalidate every 60 seconds
const data = await fetch(url, { next: { revalidate: 60 } });

// Or set it at the route segment level
export const revalidate = 60; // seconds
\`\`\`

**On-demand ISR:**
\`\`\`tsx
// In a Server Action or Route Handler
import { revalidatePath, revalidateTag } from 'next/cache';

// When CMS webhook fires:
await revalidatePath('/blog/my-post');
// or by tag:
await revalidateTag('blog-posts');
\`\`\``,
  example: {
    title: 'ISR Product Page',
    description: 'An e-commerce product page with ISR and on-demand revalidation.',
    code: [
      {
        label: 'ISR Product Page',
        language: 'tsx',
        code: `// app/products/[id]/page.tsx

// Route-level revalidation — all fetches in this route revalidate every 5 min
export const revalidate = 300;

export async function generateStaticParams() {
  // Pre-build top 500 products; rest are generated on-demand
  const products = await getTopProducts(500);
  return products.map((p) => ({ id: p.id.toString() }));
}

// dynamicParams = true (default): generates on first request if not pre-built
// dynamicParams = false: returns 404 for non-pre-built pages
export const dynamicParams = true;

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(\`\${API}/products/\${params.id}\`, {
    next: {
      revalidate: 300,                    // time-based ISR
      tags: [\`product-\${params.id}\`],  // for on-demand revalidation
    },
  }).then(r => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p className="price">\${product.price}</p>
      <p className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
        {product.stock > 0 ? \`\${product.stock} in stock\` : 'Out of stock'}
      </p>
    </div>
  );
}

// app/api/revalidate/route.ts — webhook endpoint for CMS
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await request.json();
  revalidateTag(\`product-\${productId}\`);

  return NextResponse.json({ revalidated: true });
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is ISR the same as "stale-while-revalidate"?',
      answer: 'Yes, that\'s exactly the pattern. The first request after the revalidation period gets the stale (cached) page immediately, while Next.js regenerates in the background. The next request gets the fresh page. This is the HTTP stale-while-revalidate cache directive applied to server rendering.',
    },
    {
      question: 'What happens if the background regeneration fails?',
      answer: 'Next.js keeps serving the last successful static page. The failed regeneration is logged, and the next request will try again. This means ISR is resilient to temporary API/database failures.',
    },
  ],
  productionIssues: [
    'Pages not revalidating — check that revalidate is set correctly and that the deployment supports ISR (serverless functions needed).',
    'On-demand revalidation not working — webhook secret mismatch, or revalidateTag/revalidatePath not matching the tags/paths used in fetch.',
    'ISR not working on static hosting — ISR requires a server or serverless function runtime. Pure static hosts (GitHub Pages) don\'t support ISR.',
  ],
  bestPractices: [
    'Use on-demand revalidation for content-managed pages — instant freshness when editors publish.',
    'Tag fetches with meaningful tags (product-123, category-electronics) for granular cache invalidation.',
    'Set revalidate based on how often content actually changes — don\'t default to 60 seconds for everything.',
    'Use ISR as the default strategy for most content pages; reserve SSR for truly per-request data.',
  ],
  architectNote: `ISR is the most practical rendering strategy for most production Next.js apps. It combines CDN performance with acceptable data freshness. The on-demand revalidation pattern (CMS webhook → revalidateTag) is the modern best practice for content-driven sites.`,
  faqs: [
    {
      question: 'Does ISR work with Vercel\'s Edge Network?',
      answer: 'Yes. Vercel\'s infrastructure is optimized for Next.js ISR — regenerated pages are automatically distributed to edge nodes globally. This is one of the reasons Vercel is the recommended deployment platform for Next.js.',
    },
  ],
  keyTakeaways: [
    'ISR = static pages that auto-regenerate after a time interval',
    'Stale-while-revalidate: serve cached page, regenerate in background',
    'Two modes: time-based (revalidate: 60) and on-demand (revalidateTag)',
    'On-demand ISR via CMS webhooks is the modern best practice',
    'Requires server runtime — doesn\'t work on purely static hosts',
  ],
  relatedTopics: ['nextjs-app-router', 'nextjs-ssg', 'nextjs-ssr'],
};

export const nextjsApiRoutes: TopicContent = {
  slug: 'nextjs-api-routes',
  title: 'Next.js API Routes',
  description: 'Build backend API endpoints inside your Next.js app — no separate server needed.',
  applicableVersions: ['Next.js 13+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'API Routes let you build backend endpoints directly inside your Next.js app. Create app/api/users/route.ts and you have a /api/users endpoint. No separate Express server needed. This is perfect for form submissions, webhooks, data mutations, and backend logic that your frontend needs.',
  whatIsIt: `In the App Router, API routes are called **Route Handlers**. They live in \`app/api/*/route.ts\` files and export named functions for each HTTP method: GET, POST, PUT, PATCH, DELETE.

They receive a \`NextRequest\` and return a \`NextResponse\`. They can access databases, call external APIs, read environment variables, and do anything a regular Node.js server can do.`,
  whyWeNeedIt: `API routes eliminate the need for a separate backend server for many use cases:
- Form submissions
- Webhook receivers (Stripe, GitHub, CMS)
- Data mutations (create, update, delete)
- Authentication endpoints
- Proxying external APIs (to hide API keys)`,
  realWorldUsage: `**Common API route use cases:**
- \`POST /api/auth/login\` — authenticate user
- \`GET /api/users\` — list users
- \`POST /api/webhooks/stripe\` — receive Stripe payment events
- \`POST /api/contact\` — send contact form email
- \`GET /api/search\` — proxy to search service`,
  howItWorks: `Route handlers are edge-compatible by default (can run on Edge Runtime for lower latency). They support streaming responses, CORS, and all HTTP features.

For mutations from React components, consider Server Actions as an alternative — they integrate more tightly with React's state model.`,
  example: {
    title: 'Complete CRUD API',
    description: 'A complete REST API with validation, auth, and error handling.',
    code: [
      {
        label: 'REST API Route Handler',
        language: 'tsx',
        code: `// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';

// GET /api/posts — list posts with pagination
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page') ?? 1));
  const limit = Math.min(50, Number(searchParams.get('limit') ?? 10));
  const search = searchParams.get('search') ?? '';

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where: { title: { contains: search, mode: 'insensitive' } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: { id: true, title: true, slug: true, createdAt: true },
    }),
    db.post.count({
      where: { title: { contains: search, mode: 'insensitive' } },
    }),
  ]);

  return NextResponse.json({
    posts,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

// POST /api/posts — create post (authenticated)
const CreatePostSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10),
  published: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = CreatePostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const post = await db.post.create({
    data: {
      ...parsed.data,
      slug: slugify(parsed.data.title),
      authorId: session.user.id,
    },
  });

  return NextResponse.json(post, { status: 201 });
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use API Routes or Server Actions for mutations?',
      answer: 'Server Actions are better for form submissions and mutations triggered from React components — they integrate with React\'s transition system, work without JavaScript, and have better TypeScript integration. API Routes are better for webhooks, external API consumers, and when you need a proper REST endpoint.',
    },
    {
      question: 'Can I use API Routes as a full backend?',
      answer: 'For simple apps, yes. For complex backends with many endpoints, business logic, and team separation — consider a dedicated backend (Express, NestJS, FastAPI). Next.js API routes are best for BFF (Backend for Frontend) patterns, not full microservices.',
    },
  ],
  productionIssues: [
    'CORS errors — API routes don\'t have CORS headers by default. Add them explicitly in the response.',
    'Request body too large — Next.js has a default body size limit. Increase it in next.config.js for file uploads.',
    'Cold start latency — serverless functions have cold start delays. Use Edge Runtime for latency-sensitive endpoints.',
  ],
  bestPractices: [
    'Always validate input with Zod or similar — never trust client data.',
    'Return consistent error response shapes: { error: string, details?: any }.',
    'Use HTTP status codes correctly: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 422 Unprocessable.',
    'For file uploads, use a dedicated storage service (S3, Cloudflare R2) — don\'t store files in the serverless function.',
  ],
  architectNote: `API Routes in Next.js are a powerful tool for the BFF (Backend for Frontend) pattern — a thin API layer that aggregates and transforms data specifically for your frontend. Keep them thin: validation, auth, and orchestration. Heavy business logic belongs in a service layer.`,
  faqs: [
    {
      question: 'How do I handle file uploads in API Routes?',
      answer: 'Parse the multipart form data (using formidable or the built-in FormData API), then upload to a storage service like AWS S3 or Cloudflare R2. Never store uploaded files in the serverless function\'s filesystem — it\'s ephemeral.',
    },
  ],
  keyTakeaways: [
    'Route Handlers in app/api/*/route.ts — export GET, POST, PUT, DELETE functions',
    'Use for webhooks, external API consumers, and REST endpoints',
    'Prefer Server Actions for mutations from React components',
    'Always validate input — never trust client data',
    'Return consistent error shapes with proper HTTP status codes',
  ],
  relatedTopics: ['nextjs-app-router', 'nextjs-ssr', 'react-hooks'],
};
