import type { TopicContent } from '../../types';

export const reactNestedRoutes: TopicContent = {
  slug: 'react-nested-routes',
  title: 'Nested Routes',
  description: 'Master nested routes in React Router v6 — the pattern for building layouts that persist across multiple pages. Learn Outlet, layout components, and how to structure complex navigation.',
  applicableVersions: ['React 16+', 'React Router v6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Nested routes let you define parent-child route relationships where the parent renders a layout (header, sidebar, nav) and the child renders the page content inside it via <Outlet />. This means the layout renders once and only the content area changes when navigating between child routes.',
  whatIsIt: `Nested routes are routes defined as children of a parent route. The parent renders a layout component that includes an \`<Outlet />\` placeholder. When a child route matches, React Router renders the child\'s component inside the \`<Outlet />\`.

\`\`\`tsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="overview" element={<OverviewPage />} />
  <Route path="claims" element={<ClaimsPage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>
\`\`\`

Navigating between /dashboard/overview and /dashboard/claims:
- \`DashboardLayout\` stays mounted (sidebar, header persist)
- Only the content inside \`<Outlet />\` changes`,
  whyWeNeedIt: `Without nested routes, every page component would need to include its own header, sidebar, and navigation. This means:
- Duplicated layout code across every page
- Layout components remounting on navigation (losing scroll position, state)
- Inconsistent UI if any page forgets a layout element

Nested routes solve this by separating layout from content. The layout renders once and persists; only the content changes.`,
  realWorldUsage: `Every enterprise app uses nested routes:

- **Dashboard apps** — sidebar + header layout wraps all dashboard pages
- **Settings pages** — settings nav on the left, specific settings on the right
- **Admin panels** — admin layout with breadcrumbs wraps all admin pages
- **Multi-step wizards** — progress indicator persists across all steps`,
  howItWorks: `1. Define parent route with a layout component that includes \`<Outlet />\`
2. Define child routes nested inside the parent in the route config
3. When a child route matches, React Router renders the child\'s element in place of \`<Outlet />\`
4. The parent layout component stays mounted and does not re-render on child navigation

**Index routes:**
\`<Route index element={<DefaultPage />} />\` — renders when the parent path matches exactly (no child path). Used to show a default view at the parent URL.`,
  example: {
    title: 'Nested Routes in a Dashboard Application',
    description: 'Layout component with Outlet and nested route configuration.',
    code: [
      {
        label: 'Dashboard Layout with Outlet',
        language: 'tsx',
        code: `import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = [
  { to: 'overview',  label: 'Overview',  icon: '📊' },
  { to: 'claims',    label: 'Claims',    icon: '📋' },
  { to: 'policies',  label: 'Policies',  icon: '📄' },
  { to: 'reports',   label: 'Reports',   icon: '📈' },
  { to: 'settings',  label: 'Settings',  icon: '⚙️' },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
        <div className="sidebar__logo">InsureCo</div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                \`nav-item \${isActive ? 'nav-item--active' : ''}\`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__user">
          <span>{user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="dashboard__content">
        {/* Child route renders here */}
        <Outlet />
      </main>
    </div>
  );
}`,
      },
      {
        label: 'Route Configuration',
        language: 'tsx',
        code: `<Routes>
  <Route path="/login" element={<LoginPage />} />

  {/* Auth guard wrapper */}
  <Route element={<RequireAuth />}>

    {/* Dashboard layout — sidebar + header persists */}
    <Route path="/dashboard" element={<DashboardLayout />}>
      {/* index: renders at /dashboard exactly */}
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview"  element={<OverviewPage />} />
      <Route path="claims"    element={<ClaimsPage />} />
      <Route path="claims/:id" element={<ClaimDetailPage />} />
      <Route path="policies"  element={<PoliciesPage />} />
      <Route path="reports"   element={<ReportsPage />} />
      <Route path="settings"  element={<SettingsPage />} />
    </Route>

    {/* Admin section — different layout */}
    <Route element={<RequireRole role="admin" />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
      </Route>
    </Route>

  </Route>

  <Route path="*" element={<NotFoundPage />} />
</Routes>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between index routes and default routes?',
      answer: 'An index route (<Route index />) renders at the parent path exactly (/dashboard). A redirect (<Navigate to="overview" />) sends the user to a different path. Use index routes when you have meaningful content for the parent URL. Use redirects when the parent URL should always show a specific child.',
    },
    {
      question: 'Why does my layout re-render on every navigation?',
      answer: 'If the layout component is not properly set up as a parent route, React Router may unmount and remount it on navigation. Ensure the layout is the element of a parent <Route> and child routes are nested inside it. Also check that the layout is not wrapped in unnecessary React.memo with unstable props.',
    },
  ],
  productionIssues: [
    '**Relative vs absolute paths in nested routes** — Child route paths are relative to the parent by default in v6. <Route path="claims"> inside a /dashboard parent matches /dashboard/claims. Do not add a leading slash to child paths.',
    '**Outlet not rendering** — If the layout renders but content is blank, check that <Outlet /> is in the layout and child routes are nested inside the parent <Route> (not siblings).',
  ],
  bestPractices: [
    'Use layout routes for any UI that persists across multiple pages',
    'Use index routes for the default view at a parent URL',
    'Keep child route paths relative (no leading slash)',
    'Use NavLink in layout navigation for automatic active state',
    'Use Outlet context for passing layout-level data to children',
  ],
  architectNote: `Nested routes are the correct model for any multi-page app with shared layouts. The key insight: route nesting should mirror UI nesting. If the sidebar persists across pages, those pages should be nested inside a layout route that contains the sidebar. This keeps layouts DRY, prevents remounting, and makes the route structure a readable map of the application\'s UI.`,
  faqs: [
    {
      question: 'Can I pass data from a layout to child routes via Outlet?',
      answer: 'Yes. Use the context prop on Outlet: <Outlet context={{ user }} />. Then in the child, use the useOutletContext hook: const { user } = useOutletContext<{ user: User }>(). This is useful for passing layout-level data (like the current section\'s data) to all child pages.',
    },
  ],
  keyTakeaways: [
    'Nested routes keep layout components mounted while only content changes',
    '<Outlet /> in the parent layout is where child routes render',
    'Index routes render at the parent URL exactly',
    'Child route paths are relative to the parent — no leading slash',
    'Use NavLink for navigation menus to get automatic active state',
    'Route nesting should mirror UI nesting',
  ],
  relatedTopics: ['react-router', 'react-protected-routes', 'react-lazy-loading'],
};
