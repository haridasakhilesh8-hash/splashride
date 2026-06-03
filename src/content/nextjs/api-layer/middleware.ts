import type { TopicContent } from '../../types';

export const nextjsMiddleware: TopicContent = {
  slug: 'nextjs-middleware',
  title: 'Middleware',
  description: 'Master Next.js Middleware — the edge function that runs before every request, enabling auth redirects, A/B testing, geolocation, and request modification at the CDN edge.',
  applicableVersions: ['Next.js 12+', 'Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Middleware is a single middleware.ts file at the project root that runs before every matched request. It runs on the Edge Runtime — globally distributed, extremely fast. Use it for auth redirects, header injection, A/B testing, and geolocation-based routing.',
  whatIsIt: `Next.js Middleware is a function exported from \`middleware.ts\` at the project root:

- **Runs on every request** before it reaches a page or Route Handler
- **Edge Runtime** — runs at CDN edge nodes globally (not Node.js)
- **Can read and modify** request headers, cookies, and URL
- **Can redirect or rewrite** requests
- **Cannot** access the filesystem, Node.js APIs, or most npm packages
- **Matcher config** controls which routes trigger middleware`,
  whyWeNeedIt: `Middleware solves problems that cannot be solved in layouts or pages:

- **Fast auth redirects** — redirect unauthenticated users before the page even loads
- **A/B testing** — rewrite requests to different pages based on a cookie
- **Geolocation** — redirect users to regional versions based on their country
- **Request enrichment** — add user ID to headers so all downstream components can read it
- **Bot protection** — block or challenge suspicious requests at the edge`,
  realWorldUsage: `**Middleware in production:**

- Auth: verify JWT, redirect to /login if invalid
- Internationalisation: detect locale, rewrite to /en/ or /fr/
- Feature flags: rewrite to /beta/ for users with the beta cookie
- Rate limiting: count requests per IP at the edge
- Security headers: add CSP, HSTS, X-Frame-Options to all responses`,
  howItWorks: `**Middleware execution flow:**

1. Request arrives at CDN edge
2. Middleware function runs (Edge Runtime, ~1ms)
3. Middleware can: redirect, rewrite, modify headers, or pass through
4. If passing through: request continues to Next.js server
5. Server Component / Route Handler runs

**The matcher config** tells Next.js which paths trigger middleware. Without a matcher, middleware runs on EVERY request — including static files and images, which is expensive.`,
  example: {
    title: 'Auth Middleware and Request Enrichment',
    description: 'Production middleware for auth protection and request header enrichment.',
    code: [
      {
        label: 'Auth middleware with matcher',
        language: 'ts',
        code: `// middleware.ts (project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth-edge'; // Must be edge-compatible

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session token from cookie
  const token = request.cookies.get('session')?.value;

  // Verify token
  const session = token ? await verifyJWT(token) : null;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Pass through with user ID in header (available in Server Components)
  const response = NextResponse.next();
  if (session) {
    response.headers.set('x-user-id', session.userId);
  }
  return response;
}

// IMPORTANT: Always add a matcher to avoid running on static files
export const config = {
  matcher: [
    // Match all paths EXCEPT:
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};`,
      },
      {
        label: 'A/B testing with middleware',
        language: 'ts',
        code: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    // Get or assign A/B test bucket
    let bucket = request.cookies.get('ab-test')?.value;

    if (!bucket) {
      bucket = Math.random() < 0.5 ? 'control' : 'variant';
    }

    // Rewrite to different page without changing URL
    const url = request.nextUrl.clone();
    url.pathname = bucket === 'variant' ? '/home-v2' : '/home';

    const response = NextResponse.rewrite(url);

    // Set cookie so user stays in the same bucket
    if (!request.cookies.has('ab-test')) {
      response.cookies.set('ab-test', bucket, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }

    return response;
  }

  return NextResponse.next();
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can middleware access the database?',
      answer: 'No — middleware runs on the Edge Runtime, which does not support Node.js APIs including most database drivers. For auth, use JWT verification (edge-compatible) rather than database session lookups. If you need DB access, use a lightweight edge-compatible client like Prisma\'s edge client or Upstash.',
    },
    {
      question: 'What is the difference between middleware and a layout auth check?',
      answer: 'Middleware redirects happen at the edge BEFORE the page loads — faster and more secure. Layout auth checks happen on the server after the route is matched. Use both: middleware for fast redirects, layout for fetching the full session and rendering user-specific UI.',
    },
    {
      question: 'Does middleware run on API routes?',
      answer: 'Yes — if your matcher includes /api/* paths. This is useful for adding auth headers or rate limiting to all API routes. If you do not want middleware on API routes, exclude them in the matcher config.',
    },
  ],
  productionIssues: [
    'Missing matcher config — middleware running on every static file request (images, fonts, CSS) adds latency and costs. Always add a matcher that excludes _next/static, _next/image, and static assets.',
    'Using Node.js APIs in middleware — the Edge Runtime does not support fs, crypto (Node.js version), or most npm packages. Use Web Crypto API, edge-compatible JWT libraries, and Upstash for Redis.',
    'Middleware latency on every request — even 10ms of middleware latency adds up on high-traffic sites. Keep middleware logic minimal — JWT verification only, no complex business logic.',
  ],
  bestPractices: [
    'Always add a matcher config — never run middleware on static assets',
    'Keep middleware fast — only JWT verification and simple redirects, no complex logic',
    'Use edge-compatible libraries — jose for JWT, Upstash for Redis',
    'Add user ID to request headers in middleware — makes it available in all Server Components',
    'Test middleware with next build — Edge Runtime restrictions are only enforced in production builds',
  ],
  architectNote: `Middleware is the **security perimeter** of your Next.js application. It is the first line of defence — fast, globally distributed, and impossible to bypass. Design your middleware to be a thin, fast gate: verify the token, set headers, redirect or pass through. All complex logic belongs in Server Components or Route Handlers.`,
  faqs: [
    {
      question: 'How do I read request headers set by middleware in a Server Component?',
      answer: 'Import headers() from next/headers: const headersList = await headers(); const userId = headersList.get("x-user-id"). This is the standard pattern for passing middleware-enriched data (user ID, locale, feature flags) to Server Components without re-verifying the token.',
    },
    {
      question: 'Can I have multiple middleware files?',
      answer: 'No — there is exactly one middleware.ts file per Next.js project. Use conditional logic inside the single middleware function to handle different paths differently. For complex cases, extract helper functions into lib/middleware/ and import them.',
    },
    {
      question: 'How do I debug middleware?',
      answer: 'Use console.log in middleware — it logs to the server terminal in development. For production debugging, use Vercel\'s Edge Function logs or add a custom logging header to responses. The Edge Runtime does not support Node.js debuggers.',
    },
  ],
  keyTakeaways: [
    'Middleware runs at the CDN edge before every matched request — extremely fast',
    'Edge Runtime: no Node.js APIs, no filesystem, no most npm packages',
    'Always add a matcher config to exclude static assets',
    'Use for auth redirects, A/B testing, geolocation, and header injection',
    'Keep middleware minimal — JWT verify + redirect only, no business logic',
    'Pass user data via request headers for Server Components to consume',
  ],
  relatedTopics: ['nextjs-authentication', 'nextjs-route-handlers', 'nextjs-edge-runtime', 'nextjs-app-router'],
};
