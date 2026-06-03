import type { TopicContent } from '../../types';

export const nextjsProjectStructure: TopicContent = {
  slug: 'nextjs-project-structure',
  title: 'Project Structure',
  description: 'Master the Next.js App Router project structure — folders, conventions, and how senior engineers organise large-scale Next.js applications.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Next.js uses a file-system based router. The app/ directory is your routing tree — every folder is a route segment, every page.tsx is a page. Special files like layout.tsx, loading.tsx, and error.tsx give each route superpowers without any configuration.',
  whatIsIt: `The Next.js App Router project structure is a **convention-over-configuration routing system** where your file system defines your application architecture:

**Root-level files:**
- \`next.config.ts\` — framework configuration (redirects, rewrites, env, headers)
- \`middleware.ts\` — runs before every request (auth checks, redirects)
- \`tsconfig.json\` — TypeScript configuration

**Special app/ files:**
- \`layout.tsx\` — persistent UI wrapper (navbar, sidebar) — survives navigation
- \`page.tsx\` — the actual page content — makes a route publicly accessible
- \`loading.tsx\` — automatic Suspense boundary — shown while page data loads
- \`error.tsx\` — error boundary — shown when the route throws
- \`not-found.tsx\` — shown when notFound() is called
- \`template.tsx\` — like layout but re-mounts on every navigation
- \`route.ts\` — API endpoint (GET, POST, PUT, DELETE handlers)`,
  whyWeNeedIt: `File-based routing eliminates an entire category of configuration:

- No router configuration files to maintain
- No manual route registration
- Co-location of route-specific components, tests, and utilities
- Automatic code splitting per route — users only download JS for the routes they visit
- Nested layouts without prop drilling — layouts wrap child routes automatically

The structure also enforces a consistent architecture across teams — a new developer can understand the app\'s routing just by reading the folder tree.`,
  realWorldUsage: `A real enterprise Next.js project structure:

\`\`\`
my-app/
├── app/
│   ├── layout.tsx              # Root layout (html, body, providers)
│   ├── page.tsx                # Homepage /
│   ├── (marketing)/            # Route group — no URL segment
│   │   ├── about/page.tsx      # /about
│   │   └── pricing/page.tsx    # /pricing
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Dashboard layout (sidebar, topnav)
│   │   ├── dashboard/page.tsx  # /dashboard
│   │   └── settings/page.tsx   # /settings
│   └── api/
│       └── webhooks/route.ts   # /api/webhooks
├── components/
│   ├── ui/                     # Generic (Button, Input, Modal)
│   └── features/               # Domain-specific (UserCard, OrderTable)
├── lib/
│   ├── db.ts                   # Database client
│   ├── auth.ts                 # Auth utilities
│   └── utils.ts                # Shared helpers
├── hooks/                      # Custom React hooks
├── types/                      # TypeScript interfaces
└── middleware.ts               # Auth/redirect middleware
\`\`\``,
  howItWorks: `**How Next.js resolves a URL to a component:**

1. URL \`/dashboard/settings\` arrives
2. Next.js walks \`app/dashboard/settings/\`
3. Finds \`page.tsx\` — this is the leaf component
4. Collects all \`layout.tsx\` files from root down to this route
5. Wraps: \`RootLayout > DashboardLayout > SettingsPage\`
6. Checks for \`loading.tsx\` at each level — wraps in Suspense
7. Renders the component tree, streaming HTML to the browser

**Route groups \`(folder)\`** let you organise routes without affecting URLs. Use them to apply different layouts to different sections of your app.`,
  example: {
    title: 'Nested Layouts and Special Files',
    description: 'How layouts, loading, and error files work together in a dashboard route.',
    code: [
      {
        label: 'app/(dashboard)/layout.tsx',
        language: 'tsx',
        code: `// This layout wraps ALL routes under (dashboard)/
// It persists across navigation — does not re-mount
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />          {/* Always visible */}
      <main className="flex-1 overflow-auto">
        {children}        {/* Page content swaps here */}
      </main>
    </div>
  );
}`,
      },
      {
        label: 'app/(dashboard)/analytics/loading.tsx',
        language: 'tsx',
        code: `// Automatically shown while analytics/page.tsx fetches data
// Next.js wraps the page in a Suspense boundary automatically
export default function AnalyticsLoading() {
  return (
    <div className="p-8 space-y-4">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      <div className="h-64 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}`,
      },
      {
        label: 'app/(dashboard)/analytics/error.tsx',
        language: 'tsx',
        code: `'use client'; // Error boundaries must be Client Components

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center">
      <h2>Failed to load analytics</h2>
      <p className="text-gray-500">{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between layout.tsx and template.tsx?',
      answer: 'layout.tsx persists across navigations — it does not re-mount when you navigate between child routes. template.tsx creates a fresh instance on every navigation. Use layout.tsx for persistent UI (sidebar, nav). Use template.tsx when you need animations that play on every route change.',
    },
    {
      question: 'What does a route group (folder) in parentheses do?',
      answer: 'Route groups like (marketing) or (dashboard) let you organise files and apply different layouts without adding a URL segment. /about and /pricing can share a marketing layout without the URL becoming /marketing/about.',
    },
    {
      question: 'Where should I put shared components — inside app/ or outside?',
      answer: 'Shared components go in src/components/ (outside app/). Route-specific components that are only used by one route can be co-located inside that route\'s folder — Next.js only makes files publicly accessible if they are named page.tsx or route.ts.',
    },
  ],
  productionIssues: [
    'Deeply nested layouts causing waterfall data fetches — each layout fetching its own data sequentially. Solution: use parallel data fetching with Promise.all or fetch at the highest layout that needs the data.',
    'Accidentally making internal components publicly accessible — any file named page.tsx becomes a route. Name internal files differently (e.g., _components/ or keep them outside app/).',
    'middleware.ts matching too broadly — running heavy auth logic on static asset requests. Always add a matcher config to exclude _next/static, _next/image, and favicon.',
  ],
  bestPractices: [
    'Use route groups (folder) to apply different layouts to different sections — (marketing) vs (dashboard) vs (auth)',
    'Co-locate route-specific components inside the route folder using a _components/ subfolder',
    'Keep lib/, hooks/, and types/ outside app/ — they are utilities, not routes',
    'Use loading.tsx at every route that fetches data — it gives instant visual feedback',
    'Always add a matcher to middleware.ts to avoid running auth logic on static files',
  ],
  architectNote: `The App Router\'s file-system conventions encode architectural decisions into the project structure itself. A new engineer joining the team can understand the entire routing tree, layout hierarchy, and data flow just by reading the folder structure — no separate documentation needed.

For large teams: establish a **feature-based folder structure** inside app/ using route groups. Each feature team owns their route group. Shared UI goes in components/ui/, shared business logic in lib/. This scales to 50+ engineers without merge conflicts on routing configuration files.`,
  faqs: [
    {
      question: 'Can I mix App Router and Pages Router in the same project?',
      answer: 'Yes. Next.js supports both simultaneously during migration. Routes in app/ use the App Router, routes in pages/ use the Pages Router. They can coexist but cannot share layouts. Migrate incrementally — move one route at a time.',
    },
    {
      question: 'What is the src/ directory and should I use it?',
      answer: 'Placing your code in src/ (e.g., src/app/, src/components/) is optional but recommended for large projects. It cleanly separates your source code from config files (next.config.ts, tsconfig.json, package.json) at the root level.',
    },
    {
      question: 'How do I share data between a layout and its child pages?',
      answer: 'You cannot pass props from layout to page directly (they are separate components in the tree). Options: (1) fetch the same data in both — Next.js deduplicates identical fetch calls, (2) use React Context in a Client Component provider, (3) use a shared server-side cache like unstable_cache.',
    },
  ],
  keyTakeaways: [
    'The app/ directory IS your routing tree — every folder is a URL segment',
    'page.tsx makes a route public — other files in the folder are private by default',
    'layout.tsx persists across navigations — perfect for sidebars and navigation',
    'loading.tsx and error.tsx give every route automatic Suspense and error boundary behaviour',
    'Route groups (folder) organise code without affecting URLs',
    'Keep shared utilities outside app/ — only routing concerns live inside it',
  ],
  relatedTopics: ['nextjs-introduction', 'nextjs-app-router', 'nextjs-dynamic-routes', 'nextjs-route-groups'],
};
