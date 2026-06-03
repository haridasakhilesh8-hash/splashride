import type { TopicContent } from '../../types';

export const nextjsIntroduction: TopicContent = {
  slug: 'nextjs-introduction',
  title: 'Introduction to Next.js',
  description: 'Understand what Next.js is, why it exists, and how senior engineers position it in a real enterprise tech stack.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Next.js is a React framework that adds server-side rendering, file-based routing, API routes, and production optimisations on top of React. If React is the engine, Next.js is the fully assembled car — ready to drive into production.',
  whatIsIt: `Next.js is an open-source **full-stack React framework** built and maintained by Vercel. It extends React with:

- **File-based routing** — your folder structure becomes your URL structure
- **Server-side rendering (SSR)** — HTML generated on the server per request
- **Static site generation (SSG)** — HTML pre-built at deploy time
- **Incremental static regeneration (ISR)** — static pages that refresh in the background
- **API Routes / Route Handlers** — backend endpoints inside the same project
- **Built-in optimisations** — image compression, font loading, script management
- **App Router** — React Server Components, streaming, nested layouts (Next.js 13+)

Next.js is the most widely deployed React framework in enterprise. It solves the problems that plain React leaves unsolved: routing, server rendering, data fetching, and production build optimisation.`,
  whyWeNeedIt: `Plain React is a UI library — it renders components in the browser. That leaves you responsible for:

- Setting up a router (React Router, TanStack Router)
- Configuring Webpack / Vite from scratch
- Solving SEO (React apps ship empty HTML shells — search engines struggle)
- Building a backend separately (Express, Fastify)
- Optimising images, fonts, and third-party scripts manually
- Handling server rendering yourself

Next.js solves every one of these out of the box. It lets a small team ship a production-grade, SEO-friendly, performant full-stack application without a separate backend service.`,
  realWorldUsage: `Next.js powers some of the world's largest sites:

- **Vercel** (obviously), **TikTok**, **Twitch**, **GitHub Copilot dashboard**
- Enterprise SaaS dashboards, e-commerce storefronts, marketing sites, internal tools

**Typical enterprise use cases:**
- Marketing site with CMS integration (Contentful, Sanity) — SSG + ISR
- Customer portal with auth — SSR + Route Handlers
- E-commerce storefront — SSG for product pages, SSR for cart/checkout
- Internal analytics dashboard — CSR with Server Components for initial data

**In a real project, Next.js replaces:**
- React + React Router + Express + separate SSR setup
- Manual Webpack configuration
- Separate image CDN setup
- Manual meta tag management`,
  howItWorks: `**The Next.js request lifecycle (App Router):**

1. Request hits the server (or CDN edge)
2. Next.js matches the URL to a route segment in the \`app/\` directory
3. Server Components run on the server — fetch data, render HTML
4. The HTML stream is sent to the browser progressively (streaming)
5. Client Components hydrate in the browser — React takes over interactivity
6. Subsequent navigations use client-side routing — no full page reload

**Build pipeline:**
- \`next build\` compiles TypeScript, bundles JS, pre-renders static pages
- \`next start\` runs the Node.js production server
- On Vercel, static assets go to CDN, server functions become serverless functions`,
  example: {
    title: 'A Minimal Next.js 14 App',
    description: 'The smallest meaningful Next.js app — a page that fetches data on the server and renders it.',
    code: [
      {
        label: 'app/page.tsx — Server Component',
        language: 'tsx',
        code: `// This runs on the SERVER — no useEffect, no loading state needed
export default async function HomePage() {
  // Direct async/await in a component — only possible in Server Components
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }, // ISR: refresh every hour
  });
  const products = await res.json();

  return (
    <main>
      <h1>Products ({products.length})</h1>
      <ul>
        {products.map((p: { id: string; name: string }) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </main>
  );
}`,
      },
      {
        label: 'app/layout.tsx — Root Layout',
        language: 'tsx',
        code: `import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with Next.js 14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Next.js replacing React or competing with it?',
      answer: 'Neither. Next.js is built on top of React — it uses React internally. Every Next.js component is a React component. Next.js adds the framework layer (routing, SSR, build tooling) that React deliberately leaves out.',
    },
    {
      question: 'Do I need a Node.js server to run Next.js?',
      answer: 'Only for SSR and Route Handlers. Fully static Next.js apps (SSG only) can be exported as plain HTML/CSS/JS and hosted anywhere — S3, GitHub Pages, Netlify. But most real apps use at least some server features.',
    },
    {
      question: 'Is Next.js only for Vercel?',
      answer: 'No. Next.js is open source and runs on any Node.js host — AWS Lambda, Google Cloud Run, Railway, Render, self-hosted VMs. Vercel just provides the best zero-config deployment experience for it.',
    },
  ],
  productionIssues: [
    'Cold start latency on serverless deployments — SSR functions that haven\'t been called recently take 200–800ms to initialise. Mitigate with edge runtime or pre-warming.',
    'Bundle size bloat — importing large libraries (moment.js, lodash) in Server Components is fine (never sent to browser), but the same import in a Client Component inflates the JS bundle.',
    'Caching confusion — Next.js 14 has aggressive default caching. Forgetting to set cache: "no-store" on sensitive data endpoints causes stale data bugs that are hard to reproduce locally.',
  ],
  bestPractices: [
    'Start with Server Components by default — opt into Client Components only when you need interactivity, browser APIs, or event handlers',
    'Use the App Router (app/) for all new projects — Pages Router (pages/) is legacy',
    'Co-locate route-specific components inside the route folder — only shared components go in components/',
    'Use next/image for all images — it handles WebP conversion, lazy loading, and CLS prevention automatically',
    'Set explicit cache policies on every fetch call — never rely on defaults in production',
  ],
  architectNote: `Next.js is a **framework decision that ages well**. The App Router\'s Server Component model aligns perfectly with how enterprise backends think — data lives on the server, only the minimum needed for interactivity goes to the client. This reduces bundle size, improves SEO, and simplifies data fetching dramatically.

The one architectural risk: **vendor alignment with Vercel**. Some Next.js features (ISR, Edge Middleware, Image Optimisation) work best or exclusively on Vercel infrastructure. If your organisation has a mandate to use AWS or Azure, evaluate carefully and consider whether the Pages Router (more portable) or a different framework (Remix, Astro) is a better fit.`,
  faqs: [
    {
      question: 'Should I use the App Router or Pages Router for a new project?',
      answer: 'App Router for all new projects. Pages Router is stable and will be maintained, but all new Next.js features (Server Components, streaming, Server Actions) are App Router only. The learning curve is steeper but the architecture is significantly better.',
    },
    {
      question: 'What is the difference between Next.js 13 and Next.js 14?',
      answer: 'Next.js 13 introduced the App Router as beta. Next.js 14 stabilised it, deprecated the Turbopack beta label, and introduced stable Server Actions. Next.js 15 added React 19 support and changed fetch caching defaults to no-store. Always check the migration guide when upgrading.',
    },
    {
      question: 'Can I use Next.js for a REST API backend only?',
      answer: 'Technically yes via Route Handlers, but it is not the right tool. Next.js is optimised for full-stack apps where the frontend and backend are tightly coupled. For a standalone REST API, use Express, Fastify, or NestJS.',
    },
  ],
  keyTakeaways: [
    'Next.js is a full-stack React framework — it adds routing, SSR, API routes, and optimisations on top of React',
    'Use the App Router (app/ directory) for all new Next.js 13+ projects',
    'Server Components run on the server — no JS sent to browser, direct database/API access',
    'Next.js replaces the need for a separate Express backend in most full-stack React apps',
    'Aggressive caching is a feature — but must be explicitly configured to avoid stale data bugs',
    'Not Vercel-only — but Vercel gives the best zero-config deployment experience',
  ],
  relatedTopics: ['nextjs-project-structure', 'nextjs-app-router', 'nextjs-server-components', 'nextjs-route-handlers'],
};
