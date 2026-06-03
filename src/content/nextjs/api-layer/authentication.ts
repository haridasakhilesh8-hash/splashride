import type { TopicContent } from '../../types';

export const nextjsAuthentication: TopicContent = {
  slug: 'nextjs-authentication',
  title: 'Authentication',
  description: 'Implement production-grade authentication in Next.js — NextAuth v5, JWT strategies, session management, protected routes, and the multi-layer auth architecture used in enterprise apps.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Authentication in Next.js App Router has three layers: middleware (fast edge redirect), layout (session validation + user data), and Server Components (permission checks). Use NextAuth v5 (Auth.js) or Clerk for the heavy lifting. Never roll your own auth from scratch.',
  whatIsIt: `Authentication in Next.js involves three layers working together:

1. **Middleware** — runs at the edge, verifies JWT/session cookie, redirects unauthenticated users before the page loads
2. **Layout** — fetches the full session, validates it, redirects if invalid, makes user data available to child pages
3. **Server Components / Route Handlers** — check permissions for specific resources

**Auth libraries for Next.js:**
- **NextAuth v5 (Auth.js)** — open source, supports OAuth, email, credentials, database sessions
- **Clerk** — managed auth service, best DX, handles UI, MFA, organisations
- **Lucia** — lightweight, full control, good for custom auth requirements`,
  whyWeNeedIt: `Auth is one of the most complex parts of any web app. Getting it wrong has serious consequences:

- Unauthorised data access
- Session fixation attacks
- CSRF vulnerabilities
- Token leakage

Using a battle-tested library (NextAuth, Clerk) handles these edge cases. The App Router\'s multi-layer approach gives you both performance (edge redirects) and correctness (server-side session validation).`,
  realWorldUsage: `**Auth architecture in a SaaS product:**

- **Public routes**: /, /pricing, /blog — no auth required
- **Auth routes**: /login, /register — redirect authenticated users to dashboard
- **Protected routes**: /dashboard, /settings — redirect unauthenticated users to login
- **Admin routes**: /admin — require role = 'admin'
- **API routes**: /api/v1/* — require Bearer token`,
  howItWorks: `**Auth.js (NextAuth v5) flow:**

1. User submits credentials or clicks OAuth provider
2. Auth.js validates credentials / exchanges OAuth code
3. Creates a session (JWT or database session)
4. Sets a session cookie (httpOnly, secure, sameSite)
5. Middleware reads the cookie, verifies JWT on every request
6. Session data available in Server Components via \`auth()\``,
  example: {
    title: 'NextAuth v5 Setup and Multi-layer Auth',
    description: 'Complete auth setup with middleware, layout protection, and Server Component session access.',
    code: [
      {
        label: 'auth.ts — Auth.js configuration',
        language: 'ts',
        code: `// auth.ts (project root)
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { verifyPassword } from '@/lib/crypto';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({ email, password }) => {
        const user = await db.user.findUnique({ where: { email: email as string } });
        if (!user || !user.passwordHash) return null;
        const valid = await verifyPassword(password as string, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as string;
      return session;
    },
  },
});`,
      },
      {
        label: 'middleware.ts — Edge auth',
        language: 'ts',
        code: `// middleware.ts
export { auth as middleware } from '@/auth';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};

// Auth.js v5 handles the redirect logic automatically
// Configure protected routes in auth.ts callbacks:
// authorized({ auth, request }) {
//   const isLoggedIn = !!auth?.user;
//   const isProtected = request.nextUrl.pathname.startsWith('/dashboard');
//   if (isProtected && !isLoggedIn) return false; // Redirect to /login
//   return true;
// }`,
      },
      {
        label: 'Server Component — accessing session',
        language: 'tsx',
        code: `// app/(dashboard)/dashboard/page.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export default async function DashboardPage() {
  const session = await auth();

  // Double-check auth (middleware handles redirect, but layout validates)
  if (!session?.user) redirect('/login');

  // Role-based access
  if (session.user.role !== 'admin' && session.user.role !== 'user') {
    redirect('/unauthorised');
  }

  // Fetch user-specific data
  const data = await db.dashboard.findFirst({
    where: { userId: session.user.id },
  });

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <DashboardContent data={data} />
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use JWT sessions or database sessions?',
      answer: 'JWT sessions are stateless — no DB lookup per request, works on edge. Database sessions allow instant revocation — delete the session row and the user is logged out immediately. Use JWT for most apps. Use database sessions when you need instant revocation (security-critical apps, enterprise SSO).',
    },
    {
      question: 'Is middleware auth check enough, or do I need layout checks too?',
      answer: 'Both. Middleware is the fast first line of defence — it redirects unauthenticated users before any page code runs. But middleware uses a lightweight JWT check. Layouts do the full session validation (DB lookup if needed) and make the user object available. Never skip the layout check.',
    },
    {
      question: 'How do I implement role-based access control (RBAC)?',
      answer: 'Add role to the JWT token in the jwt callback. Check session.user.role in Server Components. For complex RBAC, use a permissions library like Casbin or implement a simple permissions check function: can(user, "edit", "product"). Never check roles in Client Components — it is bypassable.',
    },
  ],
  productionIssues: [
    'Session not updating after role change — JWT sessions are cached in the token. If you update a user\'s role in the DB, the JWT still has the old role until it expires. Force a re-login or use database sessions for role-sensitive apps.',
    'CSRF on Route Handlers — POST endpoints that use cookie-based auth are vulnerable to CSRF. NextAuth handles this for its own endpoints. For custom Route Handlers, verify the Origin header or use CSRF tokens.',
    'Exposing session data to Client Components — never pass the full session object to Client Components. Only pass the minimum needed (user name, avatar URL). Sensitive data (role, permissions, tokens) should only be used in Server Components.',
  ],
  bestPractices: [
    'Use NextAuth v5 or Clerk — never roll your own auth',
    'Three-layer auth: middleware (edge redirect) + layout (session validation) + component (permission check)',
    'Add role to JWT token — available in middleware without a DB lookup',
    'Use httpOnly, secure, sameSite=strict cookies — never store tokens in localStorage',
    'Implement logout that clears both the cookie and invalidates the server-side session',
  ],
  architectNote: `Authentication is the most security-critical part of your application. The three-layer model (middleware + layout + component) provides defence in depth. Even if one layer has a bug, the others catch it. Invest in getting auth right from day one — retrofitting auth into an existing app is significantly harder than building it in from the start.`,
  faqs: [
    {
      question: 'What is the difference between NextAuth v4 and v5?',
      answer: 'NextAuth v5 (Auth.js) is a complete rewrite for the App Router. Key changes: the auth() function works in Server Components and middleware, the Route Handler is at app/api/auth/[...nextauth]/route.ts, and the configuration is in auth.ts at the root. v4 is for Pages Router; v5 is for App Router.',
    },
    {
      question: 'Should I use Clerk or NextAuth?',
      answer: 'Clerk for the best developer experience and when you want managed auth (no infrastructure to maintain). NextAuth for open-source, self-hosted, or when you need deep customisation. Clerk is significantly faster to implement but has a monthly cost per user.',
    },
    {
      question: 'How do I implement magic link (passwordless) auth?',
      answer: 'NextAuth has a built-in Email provider that sends magic links. Configure it with a Resend or SendGrid adapter. The flow: user enters email → magic link sent → user clicks link → session created. No password required.',
    },
  ],
  keyTakeaways: [
    'Three-layer auth: middleware (fast redirect) + layout (session validation) + component (permissions)',
    'Use NextAuth v5 or Clerk — never implement auth from scratch',
    'JWT sessions for performance, database sessions for instant revocation',
    'Add role to JWT — available in middleware without a DB lookup',
    'Never store auth tokens in localStorage — use httpOnly cookies',
    'Check permissions in Server Components, never in Client Components',
  ],
  relatedTopics: ['nextjs-middleware', 'nextjs-route-handlers', 'nextjs-server-components', 'nextjs-environment-variables'],
};
