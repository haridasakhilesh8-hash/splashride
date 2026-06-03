import type { TopicContent } from '../../types';

export const nextjsClientComponents: TopicContent = {
  slug: 'nextjs-client-components',
  title: 'Client Components',
  description: 'Understand Client Components in Next.js — when to use them, how they interact with Server Components, and how to keep your client bundle lean.',
  applicableVersions: ['Next.js 13.4+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Client Components are React components that run in the browser. They are identical to components in traditional React apps — they can use hooks, handle events, and access browser APIs. Add "use client" at the top of the file to mark a component as a Client Component.',
  whatIsIt: `Client Components in Next.js are components that:

- **Run in the browser** (and also on the server during SSR for the initial HTML)
- **Can use React hooks** — useState, useEffect, useContext, custom hooks
- **Can handle events** — onClick, onChange, onSubmit
- **Can access browser APIs** — window, document, localStorage, navigator
- **Are marked with \`'use client'\`** — a directive at the top of the file

\`'use client'\` marks a **boundary** in the component tree. The component and everything it imports becomes part of the client bundle.`,
  whyWeNeedIt: `Server Components cannot handle interactivity. Anything that requires:

- User input (typing, clicking, selecting)
- State that changes over time (open/closed, count, form values)
- Browser-specific APIs (geolocation, clipboard, localStorage)
- Real-time updates (WebSocket, polling)
- Third-party client libraries (charts, maps, rich text editors)

...must be a Client Component. The goal is to use Client Components for the **minimum interactive surface area** of your UI, keeping everything else as Server Components.`,
  realWorldUsage: `**Typical Client Components in a production app:**

- \`SearchBar\` — controlled input with state
- \`AddToCartButton\` — onClick handler + optimistic UI
- \`MobileNav\` — open/close toggle state
- \`ThemeToggle\` — localStorage + state
- \`DataTable\` — sorting, filtering, pagination state
- \`RealtimeFeed\` — WebSocket subscription
- \`DatePicker\` — complex UI state

**The pattern:** Server Components fetch data and pass it as props to Client Components. Client Components handle the interactive layer on top of that data.`,
  howItWorks: `**Client Component rendering:**

1. **SSR phase** — Client Components also render on the server for the initial page load, producing HTML. This is why you see content immediately even for interactive components.
2. **Hydration** — the browser downloads the JS bundle, React \'hydrates\' the server-rendered HTML (attaches event listeners, initialises state)
3. **Client-side rendering** — subsequent re-renders happen entirely in the browser

**The \`'use client'\` directive:**
- Must be at the very top of the file, before any imports
- Marks the file and all its imports as client-side
- Creates a serialisation boundary — props must be serialisable`,
  example: {
    title: 'Client Component Patterns',
    description: 'Real patterns for keeping Client Components lean and composing them with Server Components.',
    code: [
      {
        label: 'Basic Client Component',
        language: 'tsx',
        code: `'use client'; // Must be first line

import { useState } from 'react';

export function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    setLoading(false);
    setAdded(true);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {added ? '✓ Added' : loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}`,
      },
      {
        label: 'Keeping the boundary small — Server wraps Client',
        language: 'tsx',
        code: `// app/products/[id]/page.tsx — Server Component
// The page is a Server Component — fetches data, renders static content
// Only the interactive button is a Client Component

import { db } from '@/lib/db';
import { AddToCartButton } from './AddToCartButton'; // 'use client'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({ where: { id: params.id } });

  return (
    <article>
      {/* Static content — Server Component, zero JS */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p className="price">£{product.price}</p>

      {/* Only this tiny component ships JS to the browser */}
      <AddToCartButton productId={product.id} />
    </article>
  );
}`,
      },
      {
        label: 'Passing Server Component as children to Client Component',
        language: 'tsx',
        code: `// The composition pattern — Server Components as children of Client Components

// ClientLayout.tsx — 'use client'
'use client';
import { useState } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex">
      <aside className={sidebarOpen ? 'w-64' : 'w-0'}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>Toggle</button>
      </aside>
      <main>{children}</main> {/* children can be Server Components! */}
    </div>
  );
}

// app/layout.tsx — Server Component
import { ClientLayout } from './ClientLayout';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser(); // Server-only: DB access
  return (
    <ClientLayout> {/* Client Component */}
      <Header user={user} /> {/* Server Component passed as children */}
      {children}
    </ClientLayout>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do Client Components only run in the browser?',
      answer: 'No — Client Components also run on the server during SSR to generate the initial HTML. "Client Component" means it CAN run in the browser (and ships JS to do so). The distinction is: Server Components ONLY run on the server and never ship JS. Client Components run on both.',
    },
    {
      question: 'Can a Client Component import a Server Component?',
      answer: 'No — this would break the server-only guarantee. If a Client Component imports a Server Component, Next.js automatically converts it to a Client Component. The only way to use a Server Component inside a Client Component is to pass it as children or props from a Server Component parent.',
    },
    {
      question: 'Does "use client" mean the component is not server-rendered?',
      answer: 'No. "use client" means the component ships JavaScript to the browser and can be interactive. It still server-renders on the first request for fast initial HTML. The difference from Server Components: it also hydrates and re-renders in the browser.',
    },
  ],
  productionIssues: [
    'Bundle bloat from large Client Component imports — importing a heavy library (e.g., a chart library) in a Client Component ships it to all users. Use dynamic import with { ssr: false } to lazy-load heavy Client Components.',
    'Hydration mismatches — if a Client Component renders differently on server vs client (e.g., using Math.random() or Date.now() without care), React throws a hydration error. Always ensure server and client render the same initial HTML.',
    'Context providers inflating the client boundary — wrapping the entire app in a Client Component context provider unnecessarily pulls everything into the client bundle. Create thin provider wrapper components.',
  ],
  bestPractices: [
    'Push "use client" as far down the component tree as possible — keep the interactive surface minimal',
    'Use dynamic import for heavy Client Components that are not needed on initial load',
    'Pass Server Components as children to Client Components — they still render on the server',
    'Keep Client Components focused on interactivity — extract static parts into Server Component children',
    'Avoid putting data fetching logic in Client Components when a Server Component parent can fetch and pass the data',
  ],
  architectNote: `The Server/Client split is the most important architectural decision in every Next.js App Router project. A useful mental model: **Server Components are your read layer, Client Components are your interaction layer**.

The goal is to minimise the client bundle. Every kilobyte of JavaScript has a cost: download time, parse time, execution time. On mobile networks, a 500KB JS bundle can delay interactivity by 3–5 seconds. By keeping most of your UI in Server Components, you ship only the JS that is genuinely needed for interactivity.`,
  faqs: [
    {
      question: 'How do I use a third-party library that requires "use client"?',
      answer: 'Create a wrapper component with "use client" at the top, import the library there, and export a clean interface. This contains the client boundary to just the wrapper. Example: wrap a date picker library in a DatePicker.tsx with "use client", then use DatePicker in Server Components.',
    },
    {
      question: 'Can I use useEffect in a Client Component for data fetching?',
      answer: 'You can, but it is not recommended in Next.js. useEffect data fetching causes a waterfall (render → mount → fetch → re-render) and misses SSR. Use Server Components for data fetching instead. If you need client-side fetching, use SWR or TanStack Query which handle caching and revalidation properly.',
    },
    {
      question: 'What is the maximum size a client bundle should be?',
      answer: 'Aim for under 200KB (gzipped) for the initial bundle. Next.js automatically code-splits per route, so this is per-page, not the entire app. Use next build --analyze (with @next/bundle-analyzer) to visualise what is in your bundle.',
    },
  ],
  keyTakeaways: [
    '"use client" marks the boundary — the file and all its imports become part of the client bundle',
    'Client Components run on both server (SSR) and browser — they are not browser-only',
    'Use Client Components only for interactivity — state, events, browser APIs',
    'Pass Server Components as children to Client Components to keep server rendering benefits',
    'Push the "use client" boundary as deep as possible to minimise bundle size',
    'Hydration mismatches happen when server and client render different HTML — avoid non-deterministic values',
  ],
  relatedTopics: ['nextjs-server-components', 'nextjs-app-router', 'nextjs-lazy-loading', 'nextjs-streaming'],
};
