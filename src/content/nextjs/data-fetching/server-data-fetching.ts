import type { TopicContent } from '../../types';

export const nextjsServerDataFetching: TopicContent = {
  slug: 'nextjs-server-data-fetching',
  title: 'Server Data Fetching',
  description: 'Master data fetching patterns in Server Components — sequential vs parallel, database access, error handling, and the patterns senior engineers use in production.',
  applicableVersions: ['Next.js 13.4+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'In the App Router, Server Components are async functions. You fetch data directly with await — no useEffect, no useState, no loading state. The component waits for data, then renders. Parallel fetching with Promise.all is the most important pattern to master.',
  whatIsIt: `Server data fetching in Next.js means fetching data inside async Server Components:

- **Direct database access** — query Prisma, Drizzle, or raw SQL without an API route
- **External API calls** — fetch from third-party APIs with Next.js caching
- **File system reads** — read markdown files, JSON configs
- **Parallel fetching** — fetch multiple data sources simultaneously
- **Sequential fetching** — when one fetch depends on another\'s result

The key difference from client-side fetching: **no loading states, no error states in JSX** — those are handled by \`loading.tsx\` and \`error.tsx\` automatically.`,
  whyWeNeedIt: `Client-side data fetching (useEffect + fetch) has serious problems:

- **Waterfall** — component renders, mounts, then fetches — users see a blank/loading state
- **SEO** — crawlers see empty HTML before JS loads and fetches data
- **Security** — API keys and DB credentials must be hidden behind API routes
- **Performance** — extra network round trip (browser → server → DB vs server → DB)

Server data fetching eliminates all of these: data is fetched before HTML is sent, credentials never leave the server, and there is no client-side waterfall.`,
  realWorldUsage: `**Server data fetching patterns in an enterprise dashboard:**

\`\`\`ts
// Direct DB query — no API route needed
const orders = await db.order.findMany({ where: { userId } });

// External API with caching
const rates = await fetch('/api/exchange-rates', { next: { revalidate: 300 } });

// Parallel: independent data sources
const [user, permissions, notifications] = await Promise.all([
  getUser(userId),
  getPermissions(userId),
  getNotifications(userId),
]);

// Sequential: second depends on first
const user = await getUser(userId);
const recommendations = await getRecommendations(user.preferences);
\`\`\``,
  howItWorks: `**The async Server Component model:**

1. Next.js calls your page/component function
2. JavaScript awaits each async operation in order (or in parallel with Promise.all)
3. Once all awaited data is resolved, the component renders JSX
4. The JSX is streamed to the browser as HTML

**Error handling:** If an await throws, the error propagates up to the nearest \`error.tsx\` boundary. You don\'t need try/catch in every component — let errors bubble to the boundary.

**Suspense + streaming:** Wrap slow data fetches in Suspense to stream the fast parts first and stream in the slow parts when ready.`,
  example: {
    title: 'Production Data Fetching Patterns',
    description: 'Parallel fetching, sequential fetching, and Suspense streaming in a real dashboard.',
    code: [
      {
        label: 'Parallel vs sequential fetching',
        language: 'tsx',
        code: `// app/dashboard/page.tsx
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export default async function DashboardPage() {
  // STEP 1: Sequential — we need session before we can fetch user data
  const session = await getSession();
  if (!session) redirect('/login');

  // STEP 2: Parallel — all three are independent, fetch simultaneously
  const [metrics, recentOrders, notifications] = await Promise.all([
    db.metric.findMany({ where: { userId: session.userId } }),
    db.order.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    db.notification.findMany({
      where: { userId: session.userId, read: false },
    }),
  ]);

  return (
    <div>
      <MetricsGrid metrics={metrics} />
      <RecentOrders orders={recentOrders} />
      <NotificationBell count={notifications.length} />
    </div>
  );
}`,
      },
      {
        label: 'Streaming with Suspense boundaries',
        language: 'tsx',
        code: `// app/dashboard/page.tsx — Streaming approach
import { Suspense } from 'react';

// Each component fetches its own data independently
async function RevenueChart() {
  const data = await fetchRevenueData(); // Slow: 800ms
  return <Chart data={data} />;
}

async function RecentActivity() {
  const data = await fetchRecentActivity(); // Fast: 50ms
  return <ActivityFeed data={data} />;
}

export default function DashboardPage() {
  // Page renders immediately — no awaits at page level
  // Each section streams in when its data is ready
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Fast section streams in first */}
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>

      {/* Slow section streams in when ready (800ms later) */}
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>
    </div>
  );
}`,
      },
      {
        label: 'Data access layer pattern',
        language: 'ts',
        code: `// lib/data/orders.ts — Centralise all data access
import { cache } from 'react';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

// cache() deduplicates within one render pass
// Multiple components calling getUserOrders get the same result
export const getUserOrders = cache(async (userId: string) => {
  return db.order.findMany({
    where: { userId },
    include: { items: true, shipping: true },
    orderBy: { createdAt: 'desc' },
  });
});

// Centralised auth check — reusable across pages
export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do I need try/catch around every fetch in a Server Component?',
      answer: 'No — let errors propagate to the nearest error.tsx boundary. Use try/catch only for expected errors you want to handle gracefully (e.g., a 404 — return notFound() instead of throwing). For unexpected errors (DB down, API timeout), let error.tsx handle it.',
    },
    {
      question: 'Is it okay to fetch data in a layout.tsx?',
      answer: 'Yes — layouts are Server Components and can fetch data. But be careful: layout data fetches run on every navigation to any child route. Fetch only data genuinely needed by the layout (user session, navigation items). Avoid heavy data fetches in layouts.',
    },
    {
      question: 'Can I pass fetched data from a parent Server Component to a child Server Component?',
      answer: 'Yes — pass it as props. But also consider fetching in the child directly — Next.js deduplicates identical fetch calls. The "fetch in the child" pattern keeps components self-contained and easier to test.',
    },
  ],
  productionIssues: [
    'Sequential fetching where parallel is possible — the most common performance mistake. Audit every page for awaits that could be wrapped in Promise.all. Sequential fetches add latencies together; parallel fetches take the max.',
    'Fetching too much data — selecting all columns from a 50-column table when you need 3. Always use select: { id, name, price } in Prisma or specify columns in SQL. Reduces DB load and serialisation time.',
    'Missing error boundaries — a Server Component that throws crashes the entire page with a 500 error. Add error.tsx at every route level that fetches data.',
  ],
  bestPractices: [
    'Use Promise.all for all independent data fetches — never await them sequentially',
    'Create a data access layer (lib/data/) — centralise all DB queries with React cache()',
    'Select only the fields you need — never fetch full objects when you need 2-3 fields',
    'Add error.tsx at every route level that fetches data',
    'Use Suspense boundaries to stream slow data without blocking fast data',
  ],
  architectNote: `The data access layer (DAL) pattern is the most important architectural pattern for large Next.js applications. Create a \`lib/data/\` directory with one file per domain (orders.ts, users.ts, products.ts). Each file exports cached, typed functions for accessing that domain\'s data.

Benefits: (1) Single place to add auth checks, (2) React cache() deduplication across the component tree, (3) Easy to test in isolation, (4) Easy to swap the data source (DB → API) without touching components.`,
  faqs: [
    {
      question: 'Should I use an ORM or raw SQL for Server Component data fetching?',
      answer: 'ORMs (Prisma, Drizzle) are recommended for most teams — they provide type safety, migrations, and a clean API. Raw SQL (with postgres.js or node-postgres) is better for complex queries or when performance is critical. Drizzle is increasingly popular for its SQL-first approach with full TypeScript types.',
    },
    {
      question: 'How do I handle pagination in Server Components?',
      answer: 'Read the page number from searchParams: const page = Number(searchParams.page ?? 1). Fetch with skip/take: db.order.findMany({ skip: (page - 1) * 20, take: 20 }). Note: reading searchParams makes the route dynamic (SSR). Consider client-side pagination for static pages.',
    },
    {
      question: 'Can Server Components access environment variables?',
      answer: 'Yes — and this is one of their key benefits. process.env.DATABASE_URL, process.env.API_SECRET are accessible in Server Components and never exposed to the client. Only variables prefixed with NEXT_PUBLIC_ are sent to the browser.',
    },
  ],
  keyTakeaways: [
    'Server Components are async — fetch data directly with await, no useEffect needed',
    'Use Promise.all for parallel fetching — the most impactful performance pattern',
    'Create a data access layer in lib/data/ with React cache() for deduplication',
    'Let errors propagate to error.tsx — no try/catch in every component',
    'Use Suspense boundaries to stream slow sections independently',
    'Select only needed fields — never over-fetch from the database',
  ],
  relatedTopics: ['nextjs-server-components', 'nextjs-fetch-api', 'nextjs-streaming', 'nextjs-caching-strategies'],
};
