import type { TopicContent } from '../../types';

export const nextjsAppRouter: TopicContent = {
  slug: 'nextjs-app-router',
  title: 'App Router',
  description: 'Deep-dive into the Next.js App Router — the paradigm shift from Pages Router to React Server Components, nested layouts, and streaming.',
  applicableVersions: ['Next.js 13.4+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The App Router is Next.js\'s new routing system built on React Server Components. It replaces getServerSideProps and getStaticProps with async components that fetch data directly. Everything is a Server Component by default — you opt into client-side behaviour with "use client".',
  whatIsIt: `The App Router (introduced in Next.js 13, stable in 13.4) is a complete rethinking of how Next.js handles routing and data fetching. It is built on three React primitives:

- **React Server Components (RSC)** — components that run only on the server, never sent to the browser as JS
- **Streaming** — send HTML to the browser progressively as it becomes ready, instead of waiting for all data
- **Suspense** — declaratively mark which parts of the UI can load asynchronously

**Key differences from Pages Router:**
| Pages Router | App Router |
|---|---|
| getServerSideProps | async Server Component |
| getStaticProps | async Server Component + generateStaticParams |
| _app.tsx | app/layout.tsx |
| _document.tsx | app/layout.tsx |
| API routes in pages/api/ | Route Handlers in app/api/ |
| No nested layouts | Nested layouts built-in |`,
  whyWeNeedIt: `The Pages Router had fundamental limitations:

- **No nested layouts** — implementing a dashboard with a persistent sidebar required complex workarounds
- **Waterfall data fetching** — getServerSideProps ran sequentially, blocking the entire page
- **All JS sent to browser** — even components that only render static HTML shipped JavaScript
- **No streaming** — the browser waited for ALL data before receiving ANY HTML

The App Router solves all of these:
- Nested layouts are first-class
- Multiple async Server Components fetch data in parallel
- Server Components ship zero JS to the browser
- Streaming sends HTML progressively — users see content faster`,
  realWorldUsage: `**App Router in an e-commerce platform:**

\`\`\`
app/
├── layout.tsx              # Root: html, body, analytics, fonts
├── (shop)/
│   ├── layout.tsx          # Shop layout: header, cart icon
│   ├── page.tsx            # Homepage: featured products (SSG)
│   ├── products/
│   │   ├── page.tsx        # Product listing (SSG + ISR)
│   │   └── [slug]/
│   │       ├── page.tsx    # Product detail (SSG per product)
│   │       └── loading.tsx # Skeleton while loading
│   └── cart/page.tsx       # Cart (CSR — user-specific)
├── (checkout)/
│   ├── layout.tsx          # Checkout layout: progress bar
│   └── checkout/page.tsx   # Checkout form (SSR — real-time stock)
└── api/
    ├── cart/route.ts       # Cart CRUD API
    └── orders/route.ts     # Order creation API
\`\`\``,
  howItWorks: `**The App Router rendering pipeline:**

1. **Request arrives** at Next.js server
2. **Route matching** — Next.js finds the matching app/ segment tree
3. **Server Component tree renders** — async components fetch data in parallel
4. **HTML streams** to browser — Suspense boundaries send partial HTML immediately
5. **Client Components hydrate** — React takes over interactive parts
6. **Subsequent navigations** — React Router-style client navigation, only fetching new Server Component payloads

**The RSC payload:** When you navigate client-side, Next.js doesn\'t fetch a full HTML page. It fetches a special RSC payload — a serialised representation of the new Server Component tree — and merges it into the existing React tree. This is why layouts persist without re-mounting.`,
  example: {
    title: 'App Router vs Pages Router — Side by Side',
    description: 'The same data-fetching page implemented in both routers.',
    code: [
      {
        label: 'Pages Router (legacy)',
        language: 'tsx',
        code: `// pages/products.tsx
import type { GetServerSideProps } from 'next';

interface Props {
  products: Product[];
}

export default function ProductsPage({ products }: Props) {
  // Component receives data as props
  return <ProductList products={products} />;
}

// Data fetching is separate from the component
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  return { props: { products } };
};`,
      },
      {
        label: 'App Router (modern)',
        language: 'tsx',
        code: `// app/products/page.tsx
// No getServerSideProps — the component IS the data fetching
export default async function ProductsPage() {
  // async/await directly in the component
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  const products: Product[] = await res.json();

  return <ProductList products={products} />;
}

// Metadata is also co-located
export const metadata = {
  title: 'Products | My Shop',
};`,
      },
      {
        label: 'Parallel data fetching with Suspense',
        language: 'tsx',
        code: `// app/dashboard/page.tsx
import { Suspense } from 'react';
import { RevenueChart } from './_components/RevenueChart';
import { RecentOrders } from './_components/RecentOrders';
import { ChartSkeleton, OrdersSkeleton } from './_components/Skeletons';

export default function DashboardPage() {
  // Both components fetch their own data in parallel
  // Neither blocks the other — they stream independently
  return (
    <div className="grid grid-cols-2 gap-6">
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />    {/* Fetches revenue data */}
      </Suspense>
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />    {/* Fetches orders data */}
      </Suspense>
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why can\'t I use useState in a Server Component?',
      answer: 'Server Components run on the server and never re-render. useState, useEffect, and all hooks require the React lifecycle that only exists in the browser. If you need state, either move that component to a Client Component with "use client", or lift the interactive part into a small Client Component child.',
    },
    {
      question: 'What happens when I add "use client" — does the whole subtree become client-side?',
      answer: 'Yes — "use client" marks a boundary. The component itself and all its imports become Client Components. However, you can pass Server Components as children (props) to a Client Component — they still render on the server. This is the composition pattern.',
    },
    {
      question: 'Is the App Router slower than the Pages Router?',
      answer: 'No — it is faster for users. Server Components reduce JS bundle size (components never ship to the browser). Streaming means users see content faster. The development experience is slightly slower due to RSC compilation overhead, but production performance is better.',
    },
  ],
  productionIssues: [
    'Context providers must be Client Components — wrapping your entire app in a Context provider forces everything into the client bundle. Create thin Client Component wrappers that only contain the provider, keeping Server Components inside as children.',
    'Serialisation errors — Server Components can only pass serialisable props to Client Components (no functions, no class instances, no Date objects). Use plain objects and primitives.',
    'Stale router cache — Next.js 14 caches client-side navigation for 30 seconds. After a mutation, call router.refresh() to invalidate the cache, or use revalidatePath() in a Server Action.',
  ],
  bestPractices: [
    'Default to Server Components — add "use client" only when you need hooks, event handlers, or browser APIs',
    'Push "use client" as far down the tree as possible — keep the boundary small',
    'Use Suspense boundaries around each independently-loading section — enables parallel streaming',
    'Co-locate loading.tsx and error.tsx with every route that fetches data',
    'Use generateStaticParams for dynamic routes with known values — pre-renders at build time',
  ],
  architectNote: `The App Router represents the most significant architectural shift in React\'s history. Server Components fundamentally change the mental model: instead of thinking about when to fetch data (useEffect, getServerSideProps), you think about **where** components run — server or client.

For enterprise teams, the key insight is that Server Components are essentially **server-rendered microservices at the component level**. Each Server Component can directly query databases, call internal APIs, and access secrets — without exposing any of that to the client. This eliminates an entire class of API routes that previously existed only to proxy server-side data to the client.`,
  faqs: [
    {
      question: 'Should I migrate my Pages Router app to App Router?',
      answer: 'Not immediately. Both routers coexist in the same project. Migrate incrementally — move new features to App Router, leave existing Pages Router routes alone. Only do a full migration if you have a clear benefit (nested layouts, streaming) and sufficient test coverage.',
    },
    {
      question: 'Can Server Components access cookies and headers?',
      answer: 'Yes — import cookies() and headers() from next/headers. These functions are async in Next.js 15. They make the route dynamic (opt out of static rendering), so use them only when you actually need request-specific data.',
    },
    {
      question: 'How do I handle authentication in the App Router?',
      answer: 'Three layers: (1) middleware.ts for fast edge-level redirects, (2) layout.tsx for session validation and redirecting unauthenticated users, (3) Server Components for checking permissions before rendering sensitive data. Libraries like NextAuth v5 and Clerk are designed for the App Router.',
    },
  ],
  keyTakeaways: [
    'App Router is built on React Server Components — components run on the server by default',
    'Replace getServerSideProps with async Server Components that fetch data directly',
    'Streaming and Suspense let users see content progressively — no more waiting for all data',
    '"use client" marks the boundary between server and client — push it as deep as possible',
    'Nested layouts are built-in — no more layout workarounds from the Pages Router era',
    'Server Components ship zero JavaScript to the browser — massive bundle size savings',
  ],
  relatedTopics: ['nextjs-server-components', 'nextjs-client-components', 'nextjs-streaming', 'nextjs-project-structure'],
};
