import type { TopicContent } from '../../types';

export const nextjsNestedRoutes: TopicContent = {
  slug: 'nextjs-nested-routes',
  title: 'Nested Routes & Layouts',
  description: 'Master nested routing and layouts in Next.js — how layouts compose, persist across navigation, and enable complex UI architectures without prop drilling.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Nested routes in Next.js are created by nesting folders inside app/. Each level can have its own layout.tsx that wraps all child routes. Layouts persist across navigation — a sidebar in a layout does not re-mount when you navigate between child pages.',
  whatIsIt: `Nested routes are created by nesting folders in the \`app/\` directory. Each folder can have:

- **\`layout.tsx\`** — wraps all child routes, persists across navigation
- **\`page.tsx\`** — the content for that exact route
- **\`loading.tsx\`** — Suspense fallback for that route level
- **\`error.tsx\`** — error boundary for that route level

**Layout nesting:** When you navigate to \`/dashboard/settings\`, Next.js renders:
\`RootLayout > DashboardLayout > SettingsPage\`

All layouts in the hierarchy wrap the page. Layouts higher in the tree persist — they do not re-mount on child navigation.`,
  whyWeNeedIt: `In the Pages Router era, implementing a persistent sidebar required complex workarounds: \`_app.tsx\` hacks, HOCs, or context. Every page had to manually include the sidebar.

Nested layouts solve this elegantly:
- Define the sidebar once in a layout
- All child routes automatically get the sidebar
- Sidebar state (open/closed, scroll position) persists across navigation
- Different sections of the app can have completely different layouts`,
  realWorldUsage: `**Nested layout architecture for a SaaS app:**

\`\`\`
app/
├── layout.tsx              # Root: html, body, fonts, analytics
├── (marketing)/
│   ├── layout.tsx          # Marketing: header, footer
│   ├── page.tsx            # Homepage
│   └── pricing/page.tsx    # Pricing page
├── (auth)/
│   ├── layout.tsx          # Auth: centered card layout
│   ├── login/page.tsx
│   └── register/page.tsx
└── (app)/
    ├── layout.tsx          # App: sidebar, topnav, auth guard
    ├── dashboard/page.tsx
    ├── orders/
    │   ├── layout.tsx      # Orders: breadcrumbs, filters
    │   ├── page.tsx        # /orders
    │   └── [id]/page.tsx   # /orders/123
    └── settings/
        ├── layout.tsx      # Settings: sub-navigation tabs
        ├── page.tsx        # /settings
        └── billing/page.tsx # /settings/billing
\`\`\``,
  howItWorks: `**Layout rendering and persistence:**

1. User navigates to \`/dashboard\`
2. Next.js renders: \`RootLayout > AppLayout > DashboardPage\`
3. User navigates to \`/orders\`
4. Next.js renders: \`RootLayout > AppLayout > OrdersLayout > OrdersPage\`
5. \`RootLayout\` and \`AppLayout\` do NOT re-mount — they persist
6. Only \`DashboardPage\` is replaced with \`OrdersLayout + OrdersPage\`

**This is the key difference from the Pages Router:** layouts are part of the React tree and maintain their state (scroll position, open modals, focus) across child navigations.`,
  example: {
    title: 'Nested Layout Architecture',
    description: 'A complete nested layout setup for a SaaS dashboard with auth, sidebar, and sub-navigation.',
    code: [
      {
        label: 'app/(app)/layout.tsx — App shell with auth',
        language: 'tsx',
        code: `import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth check in layout — protects all child routes
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={session.user} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav user={session.user} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}`,
      },
      {
        label: 'app/(app)/settings/layout.tsx — Sub-navigation',
        language: 'tsx',
        code: `import Link from 'next/link';

const settingsNav = [
  { href: '/settings', label: 'General' },
  { href: '/settings/billing', label: 'Billing' },
  { href: '/settings/team', label: 'Team' },
  { href: '/settings/api', label: 'API Keys' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8">
      {/* Settings sub-navigation — persists across settings pages */}
      <nav className="w-48 shrink-0">
        <h2 className="text-sm font-semibold text-gray-500 mb-3">Settings</h2>
        <ul className="space-y-1">
          {settingsNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1">{children}</div>
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can a layout fetch data?',
      answer: 'Yes — layouts are Server Components and can be async. They commonly fetch user session, navigation items, or feature flags. Be mindful: layout data fetches run on every navigation to any child route, so keep them fast and cache the results.',
    },
    {
      question: 'How do I share state between a layout and its child pages?',
      answer: 'You cannot pass props from layout to page (they are separate React subtrees). Options: (1) React Context in a Client Component provider inside the layout, (2) fetch the same data in both (Next.js deduplicates identical fetches), (3) URL state (searchParams).',
    },
    {
      question: 'What is the difference between layout.tsx and template.tsx?',
      answer: 'layout.tsx persists — it does not re-mount on child navigation. template.tsx creates a fresh instance on every navigation. Use layout.tsx for persistent UI (sidebar, nav). Use template.tsx when you need enter/exit animations on every route change.',
    },
  ],
  productionIssues: [
    'Auth checks in the wrong layout level — putting auth in a specific route\'s layout instead of the section\'s layout means sibling routes are not protected. Put auth in the highest-level layout that covers all protected routes.',
    'Heavy data fetching in root layout — the root layout runs on every request. Fetching slow data here blocks the entire app. Use Suspense or move non-critical data fetching to child layouts.',
    'Layout re-mounting unexpectedly — if you move a page outside its layout\'s route group, the layout changes and React re-mounts the entire subtree. Plan your route group structure carefully.',
  ],
  bestPractices: [
    'Use route groups (folder) to apply different layouts to different app sections',
    'Put auth guards in the section layout, not individual page files',
    'Keep root layout minimal — only fonts, metadata, providers, and analytics',
    'Use loading.tsx at every layout level that fetches data',
    'Avoid heavy computations in layouts — they run on every child navigation',
  ],
  architectNote: `Nested layouts are the most powerful architectural feature of the App Router. The key insight: **layouts define the UI contract for a section of your app**. The (app) layout says "you must be authenticated and you get a sidebar". The settings layout says "you get sub-navigation". Each layout encapsulates a set of concerns without any child page needing to know about them.`,
  faqs: [
    {
      question: 'Can I have multiple root layouts?',
      answer: 'No — there is exactly one root layout (app/layout.tsx) that wraps everything. However, route groups can have their own layouts that are nested inside the root. This gives you the flexibility of multiple layouts without multiple roots.',
    },
    {
      question: 'How do I implement a full-screen page that bypasses the app layout?',
      answer: 'Use a route group: put the full-screen page in a separate route group with its own layout (or no layout). Example: (fullscreen)/preview/page.tsx gets its own layout, while (app)/dashboard/page.tsx gets the sidebar layout. The URL /preview and /dashboard are both valid.',
    },
    {
      question: 'Can I conditionally render a layout based on screen size?',
      answer: 'Layouts are Server Components — they cannot read screen size (browser API). Use CSS (media queries, Tailwind responsive classes) to show/hide layout elements. For complex responsive layouts, use a Client Component wrapper inside the layout that reads window size.',
    },
  ],
  keyTakeaways: [
    'Layouts persist across child navigation — they do not re-mount',
    'Nest layouts to apply different UI shells to different app sections',
    'Use route groups (folder) to organise layouts without affecting URLs',
    'Put auth guards in the section layout — not in individual pages',
    'Layouts are Server Components — they can fetch data directly',
    'template.tsx re-mounts on every navigation — use for animations',
  ],
  relatedTopics: ['nextjs-dynamic-routes', 'nextjs-route-groups', 'nextjs-app-router', 'nextjs-project-structure'],
};
