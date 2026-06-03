import type { TopicContent } from '../../types';

export const nextjsServerComponents: TopicContent = {
  slug: 'nextjs-server-components',
  title: 'Server Components',
  description: 'Master React Server Components in Next.js — the paradigm that lets components run exclusively on the server, fetch data directly, and ship zero JavaScript to the browser.',
  applicableVersions: ['Next.js 13.4+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Server Components run on the server and never execute in the browser. They can be async, fetch data directly, access databases, read environment secrets — and send only HTML to the client. No JavaScript bundle, no hydration, no useEffect.',
  whatIsIt: `React Server Components (RSC) are components that:

- **Run exclusively on the server** — during the request (SSR) or at build time (SSG)
- **Can be async** — \`async function Page()\` is valid
- **Access server-only resources** — databases, file system, environment secrets
- **Ship zero JavaScript** — only the rendered HTML/RSC payload reaches the browser
- **Cannot use browser APIs** — no useState, no useEffect, no window, no document

In Next.js App Router, **every component is a Server Component by default**. You opt into client-side behaviour with \`'use client'\` at the top of a file.`,
  whyWeNeedIt: `Before Server Components, React had a fundamental problem: all component logic shipped to the browser as JavaScript, even logic that only ever ran once during render.

- A component that formats a date shipped moment.js to the browser
- A component that rendered markdown shipped a markdown parser to the browser
- A component that fetched from a database needed an API route as a proxy

Server Components eliminate this entirely:
- Heavy libraries stay on the server — zero bundle impact
- Direct database queries without API routes
- Secrets never leave the server
- Faster page loads — less JS to parse and execute`,
  realWorldUsage: `**Server Components handle the data-heavy, non-interactive parts of your UI:**

- Product listing pages — fetch from DB, render HTML, no client JS needed
- Blog posts — fetch from CMS, render markdown, static HTML output
- Dashboard metrics — query analytics DB directly, render charts as SVG
- Navigation menus — fetch from CMS, render links, no interactivity needed

**What stays as Client Components:**
- Search bars (user typing = state)
- Shopping cart (add/remove = state)
- Modals, dropdowns, tooltips (open/close = state)
- Real-time data (WebSocket, polling)`,
  howItWorks: `**Server Component rendering pipeline:**

1. Next.js receives a request for \`/products\`
2. It renders the \`ProductsPage\` Server Component on the server
3. The component runs \`await db.query(...)\` — direct DB access
4. React renders the component tree to an RSC payload (not plain HTML)
5. Next.js converts the RSC payload to HTML and streams it to the browser
6. The browser displays the HTML immediately — no JS needed for static parts
7. Client Components in the tree hydrate separately

**The RSC payload** is a JSON-like format that describes the component tree. On client-side navigation, Next.js fetches the RSC payload (not a full HTML page) and merges it into the existing React tree.`,
  example: {
    title: 'Server Component Patterns',
    description: 'Real patterns for Server Components in production — direct DB access, parallel fetching, and composition with Client Components.',
    code: [
      {
        label: 'Direct database access',
        language: 'tsx',
        code: `// app/products/page.tsx — Server Component
import { db } from '@/lib/db'; // Prisma, Drizzle, etc.
import { ProductCard } from './_components/ProductCard';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // Direct DB query — no API route needed
  // This code NEVER runs in the browser
  const products = await db.product.findMany({
    where: { category: searchParams.category },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}`,
      },
      {
        label: 'Parallel data fetching',
        language: 'tsx',
        code: `// app/dashboard/page.tsx
import { getUserMetrics, getRecentOrders, getAlerts } from '@/lib/data';

export default async function DashboardPage() {
  // All three run in PARALLEL — not sequential
  // Total time = slowest request, not sum of all requests
  const [metrics, orders, alerts] = await Promise.all([
    getUserMetrics(),
    getRecentOrders(),
    getAlerts(),
  ]);

  return (
    <>
      <MetricsGrid metrics={metrics} />
      <OrdersTable orders={orders} />
      <AlertsBanner alerts={alerts} />
    </>
  );
}`,
      },
      {
        label: 'Composing Server + Client Components',
        language: 'tsx',
        code: `// app/products/[id]/page.tsx — Server Component
import { db } from '@/lib/db';
import { AddToCartButton } from './_components/AddToCartButton'; // Client Component

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Server: fetch product data
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product) notFound();

  return (
    <div>
      {/* Static content — Server Component, zero JS */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="text-2xl">£{product.price}</p>

      {/* Interactive button — Client Component, minimal JS */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I import a Client Component into a Server Component?',
      answer: 'Yes — and this is the normal composition pattern. A Server Component can render Client Components as children. The Server Component fetches data and passes it as props to the Client Component. The boundary goes one way: Server can import Client, but Client cannot import Server (it would break the server-only guarantee).',
    },
    {
      question: 'Are Server Components the same as SSR?',
      answer: 'Related but different. SSR (Server-Side Rendering) renders the entire React tree on the server for every request, including Client Components. Server Components are a subset that ONLY runs on the server — they never hydrate. A page can have both: Server Components that never hydrate, and Client Components that do.',
    },
    {
      question: 'Can I pass a function as a prop from a Server Component to a Client Component?',
      answer: 'No. Props crossing the Server/Client boundary must be serialisable — plain objects, arrays, strings, numbers, booleans. Functions are not serialisable. To pass behaviour, use Server Actions (functions marked with "use server") or handle the logic in the Client Component itself.',
    },
  ],
  productionIssues: [
    'N+1 query problem — rendering a list of Server Components where each fetches its own data causes N sequential DB queries. Use DataLoader, batch queries, or fetch all data at the parent level and pass it as props.',
    'Secrets in shared modules — if a module imported by a Server Component is also imported by a Client Component, it may end up in the client bundle. Use the server-only package to throw a build-time error if a server module is accidentally imported client-side.',
    'Missing Suspense boundaries — a Server Component that throws during data fetching will crash the entire page unless wrapped in an error.tsx boundary. Always add error boundaries around data-fetching components.',
  ],
  bestPractices: [
    'Use the server-only package for modules that must never reach the client bundle',
    'Fetch data as close to where it is used as possible — avoid prop drilling data through many layers',
    'Use Promise.all for parallel fetching — never await multiple independent fetches sequentially',
    'Wrap each independently-loading Server Component in Suspense for streaming',
    'Keep Server Components pure — same input always produces same output (no random IDs, no Date.now() without care)',
  ],
  architectNote: `Server Components represent a **fundamental shift in how we think about the client-server boundary**. In the Pages Router era, the boundary was at the page level. In the App Router, the boundary is at the component level — you can have Server and Client Components interleaved in the same tree.

The architectural implication: **API routes become optional for most use cases**. If a Server Component can directly query the database, you don\'t need an API route to proxy that data. Reserve API routes for external consumers, webhooks, and truly public APIs. Internal data fetching belongs in Server Components.`,
  faqs: [
    {
      question: 'How do I know if my component is a Server or Client Component?',
      answer: 'If the file has "use client" at the top, it\'s a Client Component. If not, it\'s a Server Component by default. You can also check: if you\'re using useState, useEffect, or any event handler, it must be a Client Component.',
    },
    {
      question: 'Can Server Components access cookies and session data?',
      answer: 'Yes — use cookies() and headers() from next/headers. These are async functions in Next.js 15. Accessing them makes the component dynamic (cannot be statically generated). Use them in layouts or pages that genuinely need per-request data.',
    },
    {
      question: 'Do Server Components support CSS-in-JS libraries?',
      answer: 'Most CSS-in-JS libraries (styled-components, Emotion) require runtime JS and do not work in Server Components. Use Tailwind CSS, CSS Modules, or vanilla CSS for Server Components. Some libraries (Panda CSS, StyleX) support RSC with a compile-time approach.',
    },
  ],
  keyTakeaways: [
    'Server Components run only on the server — they ship zero JavaScript to the browser',
    'Every component in the App Router is a Server Component by default',
    'They can be async — fetch data directly with await, no useEffect needed',
    'Direct database and file system access without API routes',
    'Cannot use hooks, event handlers, or browser APIs — use Client Components for those',
    'Use Promise.all for parallel fetching — never await multiple fetches sequentially',
  ],
  relatedTopics: ['nextjs-client-components', 'nextjs-app-router', 'nextjs-server-data-fetching', 'nextjs-streaming'],
};
