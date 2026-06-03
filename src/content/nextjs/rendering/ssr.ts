import type { TopicContent } from '../../types';

export const nextjsSSR: TopicContent = {
  slug: 'nextjs-ssr',
  title: 'Server-Side Rendering (SSR)',
  description: 'Understand Server-Side Rendering in Next.js — when to use it, how it works with the App Router, and how to avoid the performance traps that catch most developers.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'SSR means HTML is generated on the server for every request. In the App Router, any component that reads request-specific data (cookies, headers, searchParams) automatically becomes dynamic (SSR). There is no getServerSideProps anymore — just async Server Components.',
  whatIsIt: `Server-Side Rendering (SSR) generates a fresh HTML response for every incoming request. In Next.js App Router:

- A route is **dynamic (SSR)** when it accesses request-specific data: \`cookies()\`, \`headers()\`, \`searchParams\`, or uses \`fetch\` with \`cache: 'no-store'\`
- A route is **static (SSG)** when it has no request-specific dependencies
- Next.js **automatically detects** which mode to use — no explicit configuration needed

**SSR is the right choice when:**
- Content is user-specific (logged-in user\'s dashboard)
- Content changes frequently and must be fresh on every request
- You need access to request cookies/headers (auth sessions)
- Real-time data that cannot be stale even for 1 second`,
  whyWeNeedIt: `Static pages are faster but cannot serve personalised content. SSR bridges the gap:

- **Authentication** — serve different content based on the user\'s session
- **Personalisation** — show user-specific data, preferences, recommendations
- **Real-time accuracy** — stock prices, live inventory, breaking news
- **A/B testing** — serve different variants based on cookies

Without SSR, you\'d either serve the same page to everyone (wrong) or fetch personalised data client-side (slow, bad UX, bad SEO).`,
  realWorldUsage: `**SSR routes in a real enterprise app:**

- \`/dashboard\` — reads session cookie, fetches user-specific metrics
- \`/checkout\` — reads cart from session, checks real-time inventory
- \`/search?q=...\` — reads searchParams, returns personalised results
- \`/account/orders\` — reads auth cookie, fetches user\'s orders

**Static routes in the same app:**
- \`/products\` — same for all users, revalidated every hour (ISR)
- \`/blog/[slug]\` — pre-built at deploy time (SSG)
- \`/about\`, \`/pricing\` — pure static HTML`,
  howItWorks: `**SSR request lifecycle in App Router:**

1. Request hits the server with a cookie \`session=abc123\`
2. Next.js identifies the route as dynamic (it reads cookies)
3. The Server Component runs: \`const session = await getSession()\`
4. Data is fetched based on the session: \`await db.query(userId)\`
5. HTML is rendered and streamed to the browser
6. The browser displays the HTML — no loading spinner for the initial content
7. Client Components hydrate for interactivity

**Opting into dynamic rendering:**
\`\`\`ts
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies(); // This makes the route dynamic
  const token = cookieStore.get('token');
  // ...
}
\`\`\``,
  example: {
    title: 'SSR Patterns in Next.js 14',
    description: 'Dynamic routes that correctly handle authentication and personalisation.',
    code: [
      {
        label: 'Auth-protected SSR page',
        language: 'tsx',
        code: `// app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function DashboardPage() {
  // Reading cookies makes this route dynamic (SSR)
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) {
    redirect('/login');
  }

  const session = await verifySession(sessionToken);
  if (!session) redirect('/login');

  // Fetch user-specific data
  const metrics = await db.metrics.findMany({
    where: { userId: session.userId },
  });

  return (
    <div>
      <h1>Welcome back, {session.user.name}</h1>
      <MetricsGrid metrics={metrics} />
    </div>
  );
}`,
      },
      {
        label: 'Force dynamic with no-store',
        language: 'tsx',
        code: `// app/live-prices/page.tsx
// Force dynamic rendering with no-store cache
export default async function LivePricesPage() {
  const res = await fetch('https://api.exchange.com/prices', {
    cache: 'no-store', // Never cache — always fresh
  });
  const prices = await res.json();

  return <PriceTable prices={prices} />;
}

// Alternative: export a route segment config
export const dynamic = 'force-dynamic';`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'How do I opt into SSR in the App Router?',
      answer: 'You do not opt in explicitly — Next.js detects it automatically. Use cookies(), headers(), or searchParams, or set cache: "no-store" on a fetch call. The route becomes dynamic automatically. You can also set export const dynamic = "force-dynamic" at the top of a page file.',
    },
    {
      question: 'Is SSR in the App Router the same as getServerSideProps?',
      answer: 'Functionally yes — HTML is generated per request. But the implementation is completely different. Instead of a separate getServerSideProps function, you use async Server Components that read cookies/headers. The result is the same: fresh HTML per request.',
    },
    {
      question: 'Does SSR hurt performance?',
      answer: 'SSR adds server processing time per request, but it eliminates the client-side loading waterfall. For users, SSR often feels faster because they see content immediately instead of a loading spinner. The tradeoff: server CPU cost vs client loading time. For personalised content, SSR is almost always the right choice.',
    },
  ],
  productionIssues: [
    'Accidentally making static routes dynamic — importing cookies() or headers() anywhere in the component tree makes the entire route dynamic, even if you do not use the value. Only import them when you actually need them.',
    'SSR without caching under load — a high-traffic SSR route that queries the DB on every request will overwhelm your database. Add Redis caching or use unstable_cache to cache the DB results for a few seconds.',
    'Slow TTFB (Time To First Byte) — if your SSR data fetching is slow, users wait for the first byte of HTML. Use streaming (Suspense) to send the page shell immediately and stream in the data-dependent parts.',
  ],
  bestPractices: [
    'Use SSR only when content is genuinely request-specific — prefer ISR for content that changes infrequently',
    'Cache DB queries in SSR routes with unstable_cache or Redis — do not hit the DB on every request',
    'Use streaming to send the page shell immediately while data loads',
    'Set explicit cache headers on SSR responses — even dynamic pages can be cached at the CDN for a few seconds',
    'Profile your SSR routes with next build and server timing headers to find slow data fetches',
  ],
  architectNote: `A common architectural mistake is defaulting everything to SSR. SSR has a real cost: every request hits your server and often your database. The right architecture uses **SSR only where necessary** and pushes everything else to static (SSG/ISR).

The decision tree: Is the content the same for all users? → SSG/ISR. Does it change frequently? → ISR with short revalidation. Is it user-specific? → SSR. Can it be fetched client-side after initial load? → Static shell + client fetch.`,
  faqs: [
    {
      question: 'Can I cache SSR responses at the CDN level?',
      answer: 'Yes — even dynamic routes can be cached at the CDN if you set Cache-Control headers. For semi-personalised content, use stale-while-revalidate with a short TTL. For fully personalised content (user-specific), set private, no-cache to prevent CDN caching.',
    },
    {
      question: 'How do I handle errors in SSR routes?',
      answer: 'Add an error.tsx file in the same directory as your page.tsx. It automatically catches errors thrown during rendering. For expected errors (not found, unauthorised), use notFound() or redirect() which are handled gracefully without error boundaries.',
    },
    {
      question: 'What is the performance difference between SSR and SSG?',
      answer: 'SSG serves pre-built HTML from a CDN — response times of 10–50ms. SSR generates HTML per request — response times of 100–500ms+ depending on data fetching. For high-traffic pages, the difference in infrastructure cost and user experience is significant.',
    },
  ],
  keyTakeaways: [
    'SSR in App Router is automatic — reading cookies(), headers(), or using cache: "no-store" makes a route dynamic',
    'No more getServerSideProps — async Server Components replace it entirely',
    'SSR is for user-specific, real-time, or personalised content',
    'Cache DB queries in SSR routes — do not hit the database on every single request',
    'Use streaming to improve perceived performance of SSR routes',
    'Default to static (SSG/ISR) and only use SSR when you genuinely need per-request freshness',
  ],
  relatedTopics: ['nextjs-ssg', 'nextjs-isr', 'nextjs-server-components', 'nextjs-caching-strategies'],
};
