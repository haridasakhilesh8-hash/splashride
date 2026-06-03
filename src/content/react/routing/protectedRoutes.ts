import type { TopicContent } from '../../types';

export const reactProtectedRoutes: TopicContent = {
  slug: 'react-protected-routes',
  title: 'Protected Routes',
  description: 'Implement protected routes in React — the pattern for restricting access to authenticated users and specific roles. Learn the correct implementation pattern used in production applications.',
  applicableVersions: ['React 16+', 'React Router v6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A protected route checks if the user is authenticated (or has the required role) before rendering the route. If not, it redirects to the login page. In React Router v6, this is implemented as a layout route component that wraps protected routes and performs the auth check.',
  whatIsIt: `A protected route is a route guard — a component that checks a condition before rendering its children. In React Router v6, the pattern uses a layout route:

\`\`\`tsx
function RequireAuth() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />; // render the protected route
}
\`\`\`

This component either renders \`<Outlet />\` (the protected content) or redirects to login.`,
  whyWeNeedIt: `Without route protection:
- Unauthenticated users can access any URL directly
- Users with wrong roles can access admin pages
- Sensitive data is exposed to anyone who knows the URL

Protected routes enforce access control at the routing layer, before any data is fetched or rendered.`,
  realWorldUsage: `Every authenticated app needs protected routes:

- Redirect unauthenticated users to /login
- After login, redirect back to the page they tried to access
- Admin-only routes that redirect non-admins to a 403 page
- Feature-flag routes that redirect users without the feature enabled`,
  howItWorks: `1. Create a \`RequireAuth\` layout route component
2. It reads auth state from your auth context/store
3. If loading: show a spinner (prevents flash of redirect)
4. If not authenticated: redirect to /login, preserving the intended destination in state
5. If authenticated: render \`<Outlet />\` (the protected content)
6. After login, read the \`from\` location from state and redirect back`,
  example: {
    title: 'Protected Routes Implementation',
    description: 'Auth guard, role guard, and post-login redirect pattern.',
    code: [
      {
        label: 'RequireAuth and RequireRole Guards',
        language: 'tsx',
        code: `import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Auth guard — requires any authenticated user
export function RequireAuth() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <FullPageSpinner />;

  if (!user) {
    // Preserve the intended destination for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

// Role guard — requires a specific role
interface RequireRoleProps { role: 'admin' | 'adjuster' | 'viewer'; }

export function RequireRole({ role }: RequireRoleProps) {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

// Login page — redirects back after successful login
export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard';

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    navigate(from, { replace: true }); // go back to where they came from
  };

  return <LoginForm onSubmit={handleLogin} />;
}`,
      },
      {
        label: 'Route Configuration with Guards',
        language: 'tsx',
        code: `<Routes>
  {/* Public routes */}
  <Route path="/login"  element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/403"    element={<ForbiddenPage />} />

  {/* Protected: any authenticated user */}
  <Route element={<RequireAuth />}>
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<OverviewPage />} />
      <Route path="claims" element={<ClaimsPage />} />
      <Route path="claims/:id" element={<ClaimDetailPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
  </Route>

  {/* Protected: admin role only */}
  <Route element={<RequireAuth />}>
    <Route element={<RequireRole role="admin" />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="audit-log" element={<AuditLog />} />
      </Route>
    </Route>
  </Route>

  <Route path="/" element={<Navigate to="/dashboard" replace />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why do I see a flash of the protected content before the redirect?',
      answer: 'This happens when auth state initialises as null (unauthenticated) before the session is restored. Fix: add an isLoading state to your auth context. While isLoading is true, show a spinner. Only redirect when isLoading is false AND user is null.',
    },
    {
      question: 'Should I protect routes on the frontend or backend?',
      answer: 'Both. Frontend route protection is a UX concern — it prevents rendering the wrong UI and redirects users cleanly. Backend API protection is a security concern — it prevents unauthorised data access. Never rely solely on frontend route protection for security. Always validate auth on every API call.',
    },
  ],
  productionIssues: [
    '**Flash of redirect** — Auth loads asynchronously. If you redirect immediately when user is null, you redirect before the session is restored. Always check isLoading before redirecting.',
    '**Lost navigation state** — The from location state is lost if the user refreshes the login page. Handle the fallback: const from = location.state?.from?.pathname ?? "/dashboard".',
    '**Security: Client-side only** — Route guards are a UX improvement, not a security boundary. Always validate tokens on every API request.',
  ],
  bestPractices: [
    'Always handle the isLoading state to prevent flash of redirect',
    'Preserve the intended destination in navigation state for post-login redirect',
    'Create separate guards for auth (RequireAuth) and roles (RequireRole)',
    'Never rely on frontend guards alone — always validate on the server',
    'Provide a clear 403 Forbidden page for role violations',
  ],
  architectNote: `Protected routes are a UX layer, not a security layer. The real security is your API — every endpoint must validate the JWT and check permissions server-side. Frontend guards prevent the wrong UI from rendering and provide a good user experience. They are not a substitute for backend security. This distinction is important to communicate clearly to product and business stakeholders.`,
  faqs: [
    {
      question: 'How do I test protected routes?',
      answer: 'In tests, wrap the component with a mock AuthProvider that returns a specific user. Test both authenticated and unauthenticated states. For the redirect behaviour, check that the Navigate component renders with the correct to prop when user is null.',
    },
  ],
  keyTakeaways: [
    'Protected routes use a layout route component that checks auth before rendering Outlet',
    'Always handle isLoading to prevent flash of redirect on session restore',
    'Preserve the intended destination in state for post-login redirect',
    'Create separate guards for authentication and role checks',
    'Frontend route guards are UX — backend API validation is security',
  ],
  relatedTopics: ['react-router', 'react-nested-routes', 'react-context'],
};
