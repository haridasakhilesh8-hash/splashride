import type { TopicContent } from '../../types';

export const nextjsRouteGroups: TopicContent = {
  slug: 'nextjs-route-groups',
  title: 'Route Groups',
  description: 'Master route groups in Next.js — the parentheses folder pattern that organises your app without affecting URLs, enabling multiple layouts and clean code organisation.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Route groups are folders wrapped in parentheses: (marketing), (dashboard), (auth). They are invisible in the URL but let you apply different layouts to different sections of your app. /about and /pricing can share a marketing layout without the URL becoming /marketing/about.',
  whatIsIt: `Route groups are folders named with parentheses in the \`app/\` directory. They:

- **Do not appear in the URL** — \`(marketing)/about/page.tsx\` maps to \`/about\`
- **Apply layouts to sections** — each group can have its own \`layout.tsx\`
- **Organise code** — group related routes without URL pollution
- **Enable multiple root layouts** — different top-level layouts for different app sections

**Naming convention:** Use descriptive names that reflect the section\'s purpose: \`(marketing)\`, \`(dashboard)\`, \`(auth)\`, \`(admin)\`.`,
  whyWeNeedIt: `Without route groups, you face a choice:

- **One layout for everything** — marketing pages get the dashboard sidebar (wrong)
- **URL-based sections** — \`/app/dashboard\` and \`/app/settings\` (ugly URLs)
- **Manual layout switching** — every page manually includes the right layout (error-prone)

Route groups let you have \`/dashboard\` and \`/pricing\` with completely different layouts, clean URLs, and zero manual wiring.`,
  realWorldUsage: `**Route group architecture for a SaaS product:**

\`\`\`
app/
├── layout.tsx              # Root layout (html, body)
├── (marketing)/            # No URL segment
│   ├── layout.tsx          # Marketing layout: public header + footer
│   ├── page.tsx            # /  (homepage)
│   ├── pricing/page.tsx    # /pricing
│   └── blog/
│       └── [slug]/page.tsx # /blog/my-post
├── (auth)/                 # No URL segment
│   ├── layout.tsx          # Auth layout: centered card
│   ├── login/page.tsx      # /login
│   └── register/page.tsx   # /register
└── (dashboard)/            # No URL segment
    ├── layout.tsx          # Dashboard layout: sidebar + auth guard
    ├── dashboard/page.tsx  # /dashboard
    └── settings/page.tsx   # /settings
\`\`\``,
  howItWorks: `**Route group resolution:**

1. Next.js sees \`(marketing)/pricing/page.tsx\`
2. Strips the \`(marketing)\` segment from the URL
3. The route resolves to \`/pricing\`
4. The layout chain is: \`RootLayout > MarketingLayout > PricingPage\`
5. No \`/marketing\` appears in the URL

**Multiple root layouts:** You can have multiple \`layout.tsx\` files at the route group level that each include their own \`<html>\` and \`<body>\` tags. This is useful for completely different apps (e.g., a public site and an admin panel) that share the same Next.js project.`,
  example: {
    title: 'Route Groups in Practice',
    description: 'Three route groups with different layouts — marketing, auth, and dashboard.',
    code: [
      {
        label: 'Route group structure',
        language: 'tsx',
        code: `// app/(marketing)/layout.tsx
// Applied to: /, /pricing, /blog/*, /about
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />   {/* Logo, nav, CTA button */}
      <main>{children}</main>
      <Footer />
    </>
  );
}

// app/(auth)/layout.tsx
// Applied to: /login, /register, /forgot-password
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <Logo className="mx-auto mb-8" />
        {children}
      </div>
    </div>
  );
}

// app/(dashboard)/layout.tsx
// Applied to: /dashboard, /orders, /settings, /analytics
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth(); // Throws redirect if not authed
  return (
    <div className="flex h-screen">
      <Sidebar user={session.user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}`,
      },
      {
        label: 'Parallel route groups for different experiences',
        language: 'tsx',
        code: `// You can have multiple route groups at the same level
// for completely different URL structures

// app/(shop)/layout.tsx — e-commerce layout
// Handles: /products, /cart, /checkout

// app/(admin)/layout.tsx — admin layout
// Handles: /admin/products, /admin/orders, /admin/users

// Both use the same root app/layout.tsx
// but have completely different UI shells

// URL: /products → RootLayout > ShopLayout > ProductsPage
// URL: /admin/products → RootLayout > AdminLayout > AdminProductsPage`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do route groups affect URL structure?',
      answer: 'No — that is the entire point. (marketing)/pricing/page.tsx maps to /pricing, not /marketing/pricing. The parentheses tell Next.js to exclude this folder from the URL. Use regular folders (without parentheses) when you want the folder name to appear in the URL.',
    },
    {
      question: 'Can I have the same URL in two different route groups?',
      answer: 'No — that would create a conflict. Since route groups are URL-transparent, (marketing)/about/page.tsx and (other)/about/page.tsx would both map to /about, causing a build error. Each URL must map to exactly one page.',
    },
    {
      question: 'Do I need route groups for every project?',
      answer: 'No — small apps with one layout do not need route groups. Use them when you have genuinely different sections of your app that need different layouts (public vs authenticated, marketing vs product). Do not over-engineer a simple app.',
    },
  ],
  productionIssues: [
    'Accidentally creating duplicate routes — moving a page into a route group without checking if the URL already exists in another group. Always verify the URL mapping after restructuring.',
    'Auth guard in wrong group — adding a page to the (dashboard) group but forgetting that the group\'s layout has an auth guard. The page is now protected. Intentional, but easy to overlook.',
    'Route group naming confusion in teams — without a documented convention, teams create inconsistent group names. Establish a convention: (public), (protected), (admin) or (marketing), (app), (auth).',
  ],
  bestPractices: [
    'Use route groups for every distinct app section with a different layout',
    'Name groups after their purpose: (marketing), (dashboard), (auth), (admin)',
    'Document your route group structure in the project README for new team members',
    'Put auth guards in the group layout, not individual pages',
    'Use (private) or _ prefix for internal folders that should not be routes',
  ],
  architectNote: `Route groups are the primary tool for **layout architecture** in Next.js. Before writing a single page, design your route group structure. Ask: how many distinct UI shells does this app have? Each answer is a route group. This upfront architecture decision prevents painful refactoring later when you realise the marketing pages need a completely different header than the dashboard.`,
  faqs: [
    {
      question: 'Can route groups have their own loading.tsx and error.tsx?',
      answer: 'Yes — any folder in app/ (including route groups) can have loading.tsx, error.tsx, and not-found.tsx. These apply to all routes within that group. A loading.tsx in (dashboard) shows a loading state for all dashboard routes.',
    },
    {
      question: 'Can I nest route groups inside each other?',
      answer: 'Yes — you can nest route groups for fine-grained layout control. Example: (dashboard)/(analytics)/revenue/page.tsx gives you a dashboard layout AND an analytics sub-layout, while the URL is just /revenue. Use sparingly — deep nesting makes the structure hard to follow.',
    },
    {
      question: 'What is the difference between a route group and a regular folder?',
      answer: 'A regular folder (e.g., dashboard/) adds a URL segment: dashboard/settings/page.tsx maps to /dashboard/settings. A route group (e.g., (dashboard)/) does not add a URL segment: (dashboard)/settings/page.tsx maps to /settings. Use route groups when the folder is for organisation, not URL structure.',
    },
  ],
  keyTakeaways: [
    'Route groups (folder) are URL-transparent — they organise code without affecting URLs',
    'Each route group can have its own layout.tsx for different UI shells',
    'Use groups for: (marketing), (auth), (dashboard), (admin) sections',
    'Auth guards belong in the group layout, not individual pages',
    'No two route groups can produce the same URL — it causes a build error',
    'Design your route group structure before writing pages — it is hard to refactor later',
  ],
  relatedTopics: ['nextjs-nested-routes', 'nextjs-dynamic-routes', 'nextjs-app-router', 'nextjs-project-structure'],
};
