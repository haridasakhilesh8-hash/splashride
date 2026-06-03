import type { TopicContent } from '../../types';

export const reactLazyLoading: TopicContent = {
  slug: 'react-lazy-loading',
  title: 'Lazy Loading',
  description: 'Master React lazy loading — the technique for reducing initial bundle size by splitting code into chunks that load on demand. Learn React.lazy, Suspense, and route-based code splitting.',
  applicableVersions: ['React 16.6+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'React.lazy lets you import a component only when it is first rendered. Combined with Suspense (which shows a fallback while loading), it splits your app into smaller chunks that load on demand. The result: a much smaller initial bundle and faster first load.',
  whatIsIt: `\`React.lazy(() => import('./Component'))\` creates a lazy component that is only loaded when React first tries to render it.

\`<Suspense fallback={<Spinner />}>\` wraps lazy components and shows the fallback UI while the chunk is loading.

\`\`\`tsx
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <AdminPanel />
    </Suspense>
  );
}
\`\`\`

The AdminPanel code is not included in the initial bundle. It downloads as a separate chunk only when a user navigates to a route that renders it.`,
  whyWeNeedIt: `A typical React app without code splitting ships one large JavaScript bundle. Every page\'s code is included even if the user never visits that page. For an app with 30 routes:

- Without lazy loading: user downloads code for all 30 pages on first load
- With lazy loading: user downloads only the code for the current page; other pages load on demand

This directly improves:
- **Time to Interactive (TTI)** — the app becomes usable faster
- **Core Web Vitals** — Google ranking signals
- **User experience** — especially on slow mobile connections`,
  realWorldUsage: `In a large enterprise app:

- Lazy load all page-level route components (most impactful)
- Lazy load heavy third-party components: rich text editors, chart libraries, PDF viewers
- Lazy load admin sections that most users never access
- Lazy load modal content that is rarely opened`,
  howItWorks: `Bundlers (Vite, Webpack) recognise dynamic \`import()\` calls as split points. When you write \`React.lazy(() => import('./AdminPanel'))\`, the bundler:

1. Creates a separate chunk file for AdminPanel and its dependencies
2. Generates a manifest mapping the chunk to the component
3. At runtime, when React tries to render the lazy component, it loads the chunk via a script tag
4. Suspense shows the fallback until the chunk is loaded and the component is ready`,
  example: {
    title: 'Route-Based Code Splitting',
    description: 'Lazy loading all page components with Suspense boundaries.',
    code: [
      {
        label: 'Lazy Routes Setup',
        language: 'tsx',
        code: `import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Each import() creates a separate bundle chunk
const DashboardPage  = lazy(() => import('./pages/DashboardPage'));
const ClaimsPage     = lazy(() => import('./pages/ClaimsPage'));
const ClaimDetail    = lazy(() => import('./pages/ClaimDetailPage'));
const ReportsPage    = lazy(() => import('./pages/ReportsPage'));
const AdminPanel     = lazy(() => import('./pages/AdminPanel'));   // large chunk
const RichTextEditor = lazy(() => import('./components/Editor'));  // heavy library

// Named chunks for better debugging
const AnalyticsDashboard = lazy(
  () => import(/* webpackChunkName: "analytics" */ './pages/AnalyticsDashboard')
);

export function AppRoutes() {
  return (
    // Single Suspense at route level
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/claims" element={<ClaimsPage />} />
        <Route path="/claims/:id" element={<ClaimDetail />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}`,
      },
      {
        label: 'Lazy Loading with Error Boundary',
        language: 'tsx',
        code: `import { Component, lazy, Suspense } from 'react';

// Error boundary for chunk loading failures (network errors)
class ChunkErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h2>Failed to load this page</h2>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Wrap lazy routes in both Suspense and ErrorBoundary
export function LazyRoute({ component: Component }: { component: React.LazyExoticComponent<any> }) {
  return (
    <ChunkErrorBoundary>
      <Suspense fallback={<PageSpinner />}>
        <Component />
      </Suspense>
    </ChunkErrorBoundary>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I use React.lazy for non-route components?',
      answer: 'Yes. Any component can be lazy loaded. The most impactful use is route-level splitting, but you can also lazy load heavy components like rich text editors, data grids, or chart libraries that are not always visible.',
    },
    {
      question: 'What happens if a chunk fails to load?',
      answer: 'React throws an error that propagates to the nearest Error Boundary. Without an Error Boundary, the app crashes. Always wrap lazy components in both Suspense and an Error Boundary in production. Chunk loading failures happen on network errors or after a deployment when old chunk hashes are cached.',
    },
  ],
  productionIssues: [
    '**Chunk loading failure after deployment** — When you deploy a new version, old chunk filenames change. Users with the old app cached try to load chunks that no longer exist. Fix: wrap lazy routes in an Error Boundary that shows a "Please refresh" message.',
    '**Waterfall loading** — Nested lazy components load sequentially (parent loads, then child loads). Fix: hoist Suspense boundaries and preload critical chunks.',
    '**Missing Error Boundary** — A network error during chunk loading crashes the app silently. Always wrap lazy components with an Error Boundary in production.',
  ],
  bestPractices: [
    'Lazy load all page-level route components — highest impact',
    'Always wrap lazy components in both Suspense and an Error Boundary',
    'Use meaningful chunk names for debugging: webpackChunkName comments',
    'Preload chunks on hover for instant navigation: import() in onMouseEnter',
    'Measure bundle size with your bundler\'s analyse tool before and after',
  ],
  architectNote: `Code splitting is one of the highest-impact performance optimisations you can apply to a React app. The rule: lazy load everything at the route level by default. Do not wait until the app is slow — build with lazy loading from the start. In a large enterprise app, route-level code splitting can reduce the initial bundle by 60–80%, directly improving Time to Interactive on slow connections.`,
  faqs: [
    {
      question: 'Does React.lazy work with named exports?',
      answer: 'React.lazy requires a default export. For named exports, re-export as default in the import: lazy(() => import("./Component").then(m => ({ default: m.NamedComponent }))). Alternatively, add a default export to the component file.',
    },
    {
      question: 'How do I preload a lazy component before the user navigates to it?',
      answer: 'Call the import() function directly (without React.lazy) to start loading the chunk: const preload = () => import("./HeavyPage"). Trigger this on hover or on a predictable user action. The chunk is cached by the browser, so when React.lazy tries to load it, it is already available.',
    },
  ],
  keyTakeaways: [
    'React.lazy + Suspense splits the bundle and loads code on demand',
    'Route-level lazy loading has the highest impact on initial load performance',
    'Always wrap lazy components with both Suspense and Error Boundary',
    'Chunk loading can fail — provide a retry mechanism in the Error Boundary',
    'Named chunk comments help identify chunks in bundle analysis',
  ],
  relatedTopics: ['react-memo', 'react-performance', 'react-router', 'react-nested-routes'],
};
