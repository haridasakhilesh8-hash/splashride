import type { TopicContent } from '../../types';

export const reactRouter: TopicContent = {
  slug: 'react-router',
  title: 'React Router',
  description: 'Master React Router v6 — the standard routing library for React SPAs. Learn route definitions, navigation, URL params, and the patterns senior engineers use in production applications.',
  applicableVersions: ['React 16+', 'React 18', 'React Router v6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'React Router lets you build multi-page experiences in a single-page application. It maps URL paths to React components, so navigating to /dashboard renders the Dashboard component without a full page reload. React Router v6 introduced a cleaner API with nested routes and the data router pattern.',
  whatIsIt: `React Router is a client-side routing library. It intercepts browser navigation, matches the current URL to a route definition, and renders the corresponding component.

**Core components (v6):**
- \`<BrowserRouter>\` — wraps the app, uses the browser History API
- \`<Routes>\` — container for route definitions (replaces Switch from v5)
- \`<Route path="/" element={<Home />} />\` — maps a path to a component
- \`<Link to="/about">\` — navigation without page reload
- \`<Outlet />\` — renders the matched child route (for nested routes)

**Hooks:**
- \`useNavigate()\` — programmatic navigation
- \`useParams()\` — reads URL parameters (/users/:id)
- \`useSearchParams()\` — reads and sets query string parameters
- \`useLocation()\` — reads the current location object`,
  whyWeNeedIt: `Without a router, a React app is a single view. Users cannot bookmark specific pages, share URLs, or use browser back/forward. React Router provides:

- **Bookmarkable URLs** — /claims/123 always shows claim 123
- **Browser history** — back button works as expected
- **Code splitting** — lazy load routes to reduce initial bundle size
- **Nested layouts** — a dashboard layout shared across all dashboard pages
- **Protected routes** — redirect unauthenticated users to login`,
  realWorldUsage: `In a healthcare portal:
\`\`\`
/                    → LandingPage
/login               → LoginPage
/dashboard           → DashboardLayout
  /dashboard/claims  → ClaimsListPage
  /dashboard/claims/:id → ClaimDetailPage
  /dashboard/profile → ProfilePage
/admin               → AdminLayout (admin role only)
  /admin/users       → UserManagementPage
\`\`\``,
  howItWorks: `React Router uses the browser\'s History API (pushState, popState) to update the URL without reloading the page. When the URL changes:

1. React Router\'s \`<Routes>\` component re-evaluates all \`<Route>\` definitions
2. It finds the best matching route (most specific wins)
3. It renders the matched component
4. Nested routes render via \`<Outlet />\` in the parent layout

**Route matching (v6):**
Routes are matched by specificity, not order. \`/users/new\` matches before \`/users/:id\` because it is more specific.`,
  example: {
    title: 'React Router in a Real Application',
    description: 'Full route setup with nested routes, lazy loading, and programmatic navigation.',
    code: [
      {
        label: 'Route Setup with Lazy Loading',
        language: 'tsx',
        code: `import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load routes — each route is a separate chunk
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const ClaimsPage      = lazy(() => import('./pages/ClaimsPage'));
const ClaimDetail     = lazy(() => import('./pages/ClaimDetailPage'));
const ProfilePage     = lazy(() => import('./pages/ProfilePage'));
const LoginPage       = lazy(() => import('./pages/LoginPage'));
const NotFoundPage    = lazy(() => import('./pages/NotFoundPage'));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected layout — wraps all dashboard routes */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Navigate to="claims" replace />} />
              <Route path="claims" element={<ClaimsPage />} />
              <Route path="claims/:claimId" element={<ClaimDetail />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`,
      },
      {
        label: 'URL Params and Navigation',
        language: 'tsx',
        code: `import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

function ClaimDetailPage() {
  const { claimId } = useParams<{ claimId: string }>();
  const navigate = useNavigate();
  const { data: claim, loading } = useApi<Claim>(\`/api/claims/\${claimId}\`);

  const handleApprove = async () => {
    await approveClaim(claimId!);
    navigate('/dashboard/claims', { state: { message: 'Claim approved' } });
  };

  const handleBack = () => navigate(-1); // browser back

  return (
    <div>
      <button onClick={handleBack}>← Back</button>
      {loading ? <Spinner /> : <ClaimView claim={claim!} />}
      <button onClick={handleApprove}>Approve</button>
    </div>
  );
}

// Search params — filter state in the URL
function ClaimsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') ?? 'all';
  const page   = Number(searchParams.get('page') ?? '1');

  const setStatus = (s: string) =>
    setSearchParams({ status: s, page: '1' }); // reset page on filter change

  return (
    <div>
      <StatusFilter value={status} onChange={setStatus} />
      <ClaimsList status={status} page={page} />
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between BrowserRouter and HashRouter?',
      answer: 'BrowserRouter uses the History API — URLs look like /dashboard/claims. Requires server-side configuration to return index.html for all routes. HashRouter uses the URL hash — URLs look like /#/dashboard/claims. Works without server config but looks ugly and is not recommended for new apps. Use BrowserRouter.',
    },
    {
      question: 'What is the difference between Link and NavLink?',
      answer: 'Link renders an anchor tag for navigation. NavLink does the same but adds an active class (or calls a className function) when its href matches the current URL. Use NavLink for navigation menus where you want to highlight the active item. Use Link everywhere else.',
    },
    {
      question: 'How do I pass data between routes?',
      answer: 'Three options: (1) URL params (/claims/:id) for IDs and identifiers, (2) Query params (?status=open) for filter/sort state, (3) navigation state (navigate(path, { state: data })) for temporary data that does not need to be in the URL. Do not use localStorage or global state for route data — prefer URLs.',
    },
  ],
  productionIssues: [
    '**404 on refresh** — BrowserRouter requires the server to return index.html for all routes. On plain static hosts, refreshing /dashboard/claims returns a 404. Fix: configure your server/CDN to serve index.html for all paths.',
    '**Scroll position not resetting** — React Router does not scroll to the top on navigation by default. Add a ScrollRestoration component or a useEffect that scrolls on route change.',
    '**Large initial bundle** — Importing all page components at the top level loads them all upfront. Use lazy() and Suspense to code-split routes.',
    '**Stale params** — useParams() inside a memoised component may show stale values. Ensure the component re-renders when params change by including params in the key prop or dependency arrays.',
  ],
  bestPractices: [
    'Lazy load all page-level route components with React.lazy and Suspense',
    'Use URL search params for filter/sort state — makes it shareable and bookmarkable',
    'Create a centralised routes constants file to avoid string URL typos',
    'Use the index route for default child rendering instead of a redirect',
    'Wrap protected routes in a layout component that handles auth checks',
    'Provide a meaningful 404 page — it will be hit in production',
  ],
  architectNote: `For pure React SPAs, React Router v6 is the standard. But before reaching for React Router, ask: should this be a Next.js app instead? Next.js gives you file-based routing, SSR/SSG, and API routes out of the box. For content-heavy apps, marketing sites, or anything that needs SEO, Next.js is the better choice. React Router is for apps where client-side SPA behaviour is intentional — dashboards, tools, admin panels.`,
  faqs: [
    {
      question: 'How do I handle 404 pages?',
      answer: 'Add a catch-all route at the end: <Route path="*" element={<NotFoundPage />} />. The * matches any path not matched by earlier routes. Place it last in your Routes block.',
    },
    {
      question: 'Can I use React Router with TypeScript?',
      answer: 'Yes. Type your useParams with a generic: useParams<{ claimId: string }>(). For useLoaderData and other data router hooks, type the return value. React Router has good TypeScript support — always type your params to avoid runtime errors from undefined values.',
    },
  ],
  keyTakeaways: [
    'React Router maps URL paths to components without full page reloads',
    'Use <Outlet /> in layout components to render matched child routes',
    'useNavigate() for programmatic navigation, useParams() for URL params',
    'useSearchParams() for filter/sort state in the URL — makes it bookmarkable',
    'Lazy load route components with React.lazy for code splitting',
    'BrowserRouter requires server-side fallback to index.html for all routes',
  ],
  relatedTopics: ['react-nested-routes', 'react-protected-routes', 'react-lazy-loading'],
};
