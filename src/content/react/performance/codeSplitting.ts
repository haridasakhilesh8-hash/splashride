import type { TopicContent } from '../../types';

export const reactCodeSplitting: TopicContent = {
  slug: 'react-performance',
  title: 'Code Splitting & Performance',
  description: 'Master React performance optimisation — from bundle splitting to render optimisation. Learn the strategies senior engineers use to keep large React applications fast.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'React performance has two dimensions: bundle size (how fast the app loads) and render performance (how fast the UI updates). Code splitting reduces bundle size. React.memo, useMemo, and useCallback reduce unnecessary renders. Measure before optimising — most performance problems are not where you expect them.',
  whatIsIt: `React performance optimisation covers two areas:

**1. Bundle performance (load time):**
- Code splitting — split the bundle into chunks that load on demand
- Tree shaking — remove unused code
- Lazy loading — defer non-critical code

**2. Render performance (runtime):**
- React.memo — prevent unnecessary component re-renders
- useMemo — prevent expensive recalculations
- useCallback — stable function references for memoised children
- Virtualisation — render only visible list items (react-window, TanStack Virtual)
- Concurrent features — React 18 useTransition, useDeferredValue`,
  whyWeNeedIt: `Performance directly impacts business metrics:

- 1 second delay in page load = 7% reduction in conversions (Amazon study)
- Core Web Vitals (LCP, FID, CLS) affect Google search ranking
- Slow UIs increase user frustration and support tickets
- Large bundles are painful on mobile data connections

In enterprise apps, performance problems compound: a slow dashboard that re-renders 50 components on every keystroke becomes unusable at scale.`,
  realWorldUsage: `In a real insurance claims dashboard:

- **Virtualise** the claims list (potentially thousands of rows) with react-window
- **Lazy load** the PDF viewer, rich text editor, and chart library
- **Debounce** search input to reduce API calls
- **useTransition** to keep the UI responsive while filtering a large list
- **Memoize** the claims table rows to prevent re-renders when selecting a row`,
  howItWorks: `**React 18 Concurrent Features:**

\`useTransition\` — marks a state update as non-urgent. React can interrupt it to handle urgent updates (user input stays responsive):
\`\`\`ts
const [isPending, startTransition] = useTransition();
startTransition(() => setFilter(newFilter)); // non-urgent
\`\`\`

\`useDeferredValue\` — defers updating a value until the browser is idle:
\`\`\`ts
const deferredQuery = useDeferredValue(searchQuery);
// deferredQuery lags behind searchQuery — used for expensive rendering
\`\`\`

**Virtualisation:**
Instead of rendering 10,000 list items (most off-screen), render only the ~20 visible ones. As the user scrolls, swap items in and out. Libraries: react-window, TanStack Virtual.`,
  example: {
    title: 'Performance Patterns in Production',
    description: 'useTransition for responsive filtering and virtualised lists.',
    code: [
      {
        label: 'useTransition for Responsive UI',
        language: 'tsx',
        code: `import { useState, useTransition, useDeferredValue } from 'react';

function ClaimsSearch({ claims }: { claims: Claim[] }) {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); // urgent: update input immediately

    startTransition(() => {
      setFilter(e.target.value); // non-urgent: filter can lag
    });
  };

  const filtered = useMemo(
    () => claims.filter(c => c.policyNumber.includes(filter)),
    [claims, filter]
  );

  return (
    <div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search claims..."
      />
      {isPending && <span className="loading-indicator">Filtering...</span>}
      <ClaimsList claims={filtered} />
    </div>
  );
}`,
      },
      {
        label: 'Virtualised List with react-window',
        language: 'tsx',
        code: `import { FixedSizeList as List } from 'react-window';

interface ClaimRowProps {
  index: number;
  style: React.CSSProperties; // required by react-window for positioning
  data: Claim[];
}

const ClaimRow = React.memo(({ index, style, data }: ClaimRowProps) => {
  const claim = data[index];
  return (
    <div style={style} className="claim-row">
      <span>{claim.policyNumber}</span>
      <span>{claim.holderName}</span>
      <StatusBadge status={claim.status} />
    </div>
  );
});

function VirtualisedClaimsList({ claims }: { claims: Claim[] }) {
  return (
    <List
      height={600}       // visible height in px
      itemCount={claims.length}
      itemSize={56}      // each row height in px
      itemData={claims}  // passed to each row as data prop
      width="100%"
    >
      {ClaimRow}
    </List>
  );
  // Renders only ~11 rows at a time regardless of list size
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'How do I know if my app has a performance problem?',
      answer: 'Use the React DevTools Profiler. Record an interaction, then look for components with long render times (shown in red/orange). Also use Chrome DevTools Performance tab to identify long tasks. Never optimise based on guessing — always measure first.',
    },
    {
      question: 'When should I use useTransition vs useDeferredValue?',
      answer: 'useTransition: you control the state update (you call setState). useDeferredValue: you receive a value as a prop and want to defer its use in expensive rendering. useTransition is more common. useDeferredValue is useful when you cannot control when the value changes.',
    },
  ],
  productionIssues: [
    '**Rendering 10,000+ items** — Always virtualise large lists. Rendering 10,000 DOM nodes is the single most common React performance problem in enterprise apps.',
    '**Expensive computation on every render** — Sorting/filtering large datasets without useMemo runs on every render including unrelated state changes.',
    '**Large initial bundle** — Not code-splitting at the route level results in a multi-MB initial download. Always lazy load page-level components.',
    '**Waterfall API calls** — Fetching data sequentially (each fetch starts after the previous completes) when they could be parallel. Use Promise.all or React Query\'s parallel queries.',
  ],
  bestPractices: [
    'Measure first with React DevTools Profiler and Chrome Performance tab',
    'Virtualise any list with more than 100 items',
    'Lazy load all page-level route components',
    'Use useTransition for expensive state updates triggered by user input',
    'Avoid rendering large trees on every keystroke — debounce or defer',
    'Use React Query for server state — it handles caching and deduplication automatically',
    'Analyse bundle size with vite-bundle-visualizer or webpack-bundle-analyzer',
  ],
  architectNote: `Performance is a feature. In enterprise React apps, the most impactful optimisations in order: (1) code splitting at route level, (2) virtualising large lists, (3) React Query for server state caching, (4) debouncing expensive inputs. React.memo/useMemo/useCallback come much later and only where profiling shows they are needed. The React 19 Compiler will automate most render optimisation — focus on architectural decisions (code splitting, virtualisation, caching) which the compiler cannot do for you.`,
  faqs: [
    {
      question: 'What are Core Web Vitals and how does React affect them?',
      answer: 'Core Web Vitals are Google\'s performance metrics: LCP (Largest Contentful Paint — how fast the main content loads), FID/INP (First Input Delay / Interaction to Next Paint — how responsive the UI is), CLS (Cumulative Layout Shift — how stable the layout is). React affects all three: large bundles hurt LCP, expensive renders hurt INP, and dynamic content without dimensions causes CLS.',
    },
    {
      question: 'Should I use Server Components for performance?',
      answer: 'If you are using Next.js 13+, yes. React Server Components render on the server and send HTML to the client, eliminating the JS bundle for those components. They are excellent for content-heavy pages. For interactive dashboards and SPAs, Client Components are still needed.',
    },
  ],
  keyTakeaways: [
    'Measure before optimising — use React DevTools Profiler',
    'Code splitting at route level is the highest-impact bundle optimisation',
    'Virtualise lists with 100+ items — react-window or TanStack Virtual',
    'useTransition keeps the UI responsive during expensive state updates',
    'React Query handles server state caching — eliminates manual loading/error state',
    'React 19 Compiler automates render memoisation — focus on architectural optimisations',
  ],
  relatedTopics: ['react-memo', 'react-lazy-loading', 'react-hooks-usememo', 'react-hooks-usecallback'],
};
