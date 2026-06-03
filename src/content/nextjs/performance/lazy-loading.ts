import type { TopicContent } from '../../types';

export const nextjsLazyLoading: TopicContent = {
  slug: 'nextjs-lazy-loading',
  title: 'Lazy Loading',
  description: 'Master lazy loading in Next.js — dynamic imports, component lazy loading, third-party script deferral, and reducing initial bundle size for faster page loads.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Lazy loading defers loading code until it is needed. In Next.js, use dynamic() from next/dynamic to lazy load heavy Client Components. The component\'s JavaScript is only downloaded when the component is about to render, reducing initial bundle size.',
  whatIsIt: `Lazy loading in Next.js has two mechanisms:

1. **\`next/dynamic\`** — lazy loads React components (equivalent to React.lazy + Suspense)
2. **\`next/script\`** — lazy loads third-party scripts with strategy control

**\`next/dynamic\` options:**
- \`loading\` — component shown while the lazy component loads
- \`ssr: false\` — only load in the browser (for browser-only libraries)
- \`suspense: true\` — use Suspense instead of the loading prop`,
  whyWeNeedIt: `JavaScript is the most expensive resource on the web — it must be downloaded, parsed, and executed before it is useful. Large components (rich text editors, chart libraries, maps, video players) can add hundreds of KB to your initial bundle.

Lazy loading ensures users only download the code for components they actually see, dramatically improving:
- **Initial page load time**
- **Time to Interactive (TTI)**
- **Core Web Vitals scores**`,
  realWorldUsage: `**Lazy loading candidates in a real app:**

- Rich text editor (TipTap, Quill) — only on edit pages
- Chart library (Recharts, Chart.js) — only on analytics pages
- Map component (Mapbox, Google Maps) — only on location pages
- Video player — only when a video is in the viewport
- PDF viewer — only when user opens a document
- Emoji picker — only when user focuses a text input`,
  howItWorks: `**Dynamic import flow:**

1. User navigates to a page with a dynamically imported component
2. The page HTML loads immediately (the component is not in the initial bundle)
3. When the component is about to render, the browser fetches its JS chunk
4. The loading component is shown while the chunk downloads
5. The component renders once the chunk is loaded and executed`,
  example: {
    title: 'Dynamic Import Patterns',
    description: 'Lazy loading heavy components and third-party scripts.',
    code: [
      {
        label: 'Dynamic import patterns',
        language: 'tsx',
        code: `import dynamic from 'next/dynamic';

// 1. Basic lazy load with loading state
const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor'),
  {
    loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded" />,
  }
);

// 2. Browser-only component (no SSR)
// Use for: libraries that use window, document, or browser APIs
const MapComponent = dynamic(
  () => import('@/components/Map'),
  {
    ssr: false, // Only render in browser
    loading: () => <MapSkeleton />,
  }
);

// 3. Named export
const { AreaChart } = dynamic(
  () => import('recharts').then((mod) => ({ default: mod.AreaChart })),
  { ssr: false }
);

// 4. Conditional loading — only load when needed
export function DocumentViewer({ url }: { url: string }) {
  const [showPDF, setShowPDF] = useState(false);

  // PDFViewer only downloaded when user clicks "View PDF"
  const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
    loading: () => <p>Loading PDF viewer...</p>,
    ssr: false,
  });

  return (
    <div>
      <button onClick={() => setShowPDF(true)}>View PDF</button>
      {showPDF && <PDFViewer url={url} />}
    </div>
  );
}`,
      },
      {
        label: 'next/script for third-party scripts',
        language: 'tsx',
        code: `import Script from 'next/script';

// Strategy options:
// beforeInteractive — load before page is interactive (use sparingly)
// afterInteractive — load after page hydration (default, good for analytics)
// lazyOnload — load during idle time (good for chat widgets, non-critical)
// worker — load in a Web Worker (experimental)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      {/* Analytics: load after page is interactive */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_ID');
        \`}
      </Script>

      {/* Chat widget: load during idle time */}
      <Script
        src="https://cdn.intercom.io/widget.js"
        strategy="lazyOnload"
        onLoad={() => console.log('Intercom loaded')}
      />
    </>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do Server Components need lazy loading?',
      answer: 'No — Server Components never ship JavaScript to the browser. Lazy loading is only relevant for Client Components. A Server Component that imports a 500KB markdown parser does not affect the client bundle at all.',
    },
    {
      question: 'When should I use ssr: false?',
      answer: 'When the component uses browser-only APIs (window, document, navigator, WebGL) or when the library explicitly does not support SSR. Examples: map libraries, canvas-based components, libraries that read localStorage on import. Without ssr: false, Next.js will try to render it on the server and throw an error.',
    },
    {
      question: 'Is next/dynamic different from React.lazy?',
      answer: 'next/dynamic is built on React.lazy but adds SSR support and the ssr: false option. In the App Router, you can use React.lazy directly for Client Components. next/dynamic is still useful for the ssr: false option and the loading prop (though Suspense with a fallback is now preferred).',
    },
  ],
  productionIssues: [
    'Lazy loading components that are always visible — lazy loading the hero section or main navigation causes a flash of loading state on every page load. Only lazy load components that are below the fold or conditionally shown.',
    'Not using ssr: false for browser-only libraries — causes hydration errors or server-side crashes. If a library uses window on import, it must be loaded with ssr: false.',
    'Over-splitting — creating too many small chunks increases the number of network requests. Group related components in the same chunk. Next.js automatically code-splits by route — manual dynamic imports are for within-route optimisation.',
  ],
  bestPractices: [
    'Lazy load heavy components that are conditionally shown (modals, drawers, tabs)',
    'Use ssr: false for any library that uses browser APIs on import',
    'Always provide a loading state — never leave users with a blank space',
    'Use next/script for all third-party scripts — never add <script> tags manually',
    'Analyse your bundle with @next/bundle-analyzer before and after lazy loading',
  ],
  architectNote: `Lazy loading is a **progressive enhancement strategy**. The baseline experience (initial HTML from Server Components) should be complete and useful. Lazy-loaded components enhance the experience as they load. This mental model prevents the mistake of lazy loading critical content.`,
  faqs: [
    {
      question: 'How do I measure the impact of lazy loading?',
      answer: 'Use @next/bundle-analyzer to see chunk sizes before and after. Use Chrome DevTools Network tab to see which chunks load on which pages. Use Lighthouse to measure TTI and Total Blocking Time improvements.',
    },
    {
      question: 'Can I prefetch lazy-loaded components before the user needs them?',
      answer: 'Yes — use router.prefetch() for route-level prefetching. For component-level prefetching, dynamically import the component on hover/focus: const module = await import("@/components/HeavyComponent"). This preloads the chunk before the user clicks.',
    },
    {
      question: 'Does lazy loading work with Server Actions?',
      answer: 'Server Actions are not JavaScript sent to the browser — they are RPC calls. They do not need lazy loading. Only Client Component JavaScript needs lazy loading.',
    },
  ],
  keyTakeaways: [
    'Use next/dynamic to lazy load heavy Client Components',
    'ssr: false for browser-only libraries (maps, canvas, localStorage)',
    'Always provide a loading state for lazy-loaded components',
    'Use next/script for all third-party scripts with appropriate strategy',
    'Server Components never need lazy loading — they ship no JS to the browser',
    'Analyse bundle size with @next/bundle-analyzer to find lazy loading opportunities',
  ],
  relatedTopics: ['nextjs-streaming', 'nextjs-client-components', 'nextjs-image-optimization', 'nextjs-metadata-api'],
};
