import type { TopicContent } from '../../types';

export const nextjsEdgeRuntime: TopicContent = {
  slug: 'nextjs-edge-runtime',
  title: 'Edge Runtime',
  description: 'Understand the Next.js Edge Runtime — when to use it, its constraints, and how it enables globally distributed ultra-low-latency responses.',
  applicableVersions: ['Next.js 12+', 'Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The Edge Runtime runs your code at CDN edge nodes globally — closer to users, faster responses. It uses the Web API (not Node.js), so no filesystem, no most npm packages. Use it for middleware, auth checks, and simple API endpoints that need sub-10ms response times.',
  whatIsIt: `The Edge Runtime is a lightweight JavaScript runtime that:

- **Runs at CDN edge nodes** — 100+ locations globally, close to users
- **Uses Web APIs** — fetch, Request, Response, Headers, crypto (Web Crypto)
- **Does NOT support Node.js APIs** — no fs, no net, no most npm packages
- **Starts instantly** — no cold starts (unlike Node.js serverless functions)
- **Has memory limits** — 128MB max (vs 1GB+ for Node.js functions)

**Opt into Edge Runtime:**
\`\`\`ts
export const runtime = 'edge'; // In a Route Handler or page
\`\`\``,
  whyWeNeedIt: `Node.js serverless functions have two problems:

1. **Cold starts** — first request after idle period takes 200–800ms to initialise
2. **Single region** — a function in us-east-1 serves users in Tokyo with 150ms latency

Edge Runtime solves both:
- No cold starts — always warm
- Globally distributed — Tokyo users served from Tokyo edge node`,
  realWorldUsage: `**Edge Runtime use cases:**

- **Middleware** — auth redirects, A/B testing (always Edge)
- **Personalisation** — serve different content based on geolocation
- **Simple API endpoints** — no DB access, pure computation
- **Rate limiting** — count requests at the edge with Upstash Redis
- **JWT verification** — verify tokens without a DB lookup

**Do NOT use Edge Runtime for:**
- Database queries (most drivers require Node.js)
- File system operations
- Heavy computation (memory limits)`,
  howItWorks: `**Edge vs Node.js runtime comparison:**

| Feature | Edge | Node.js |
|---|---|---|
| Cold start | None | 200–800ms |
| Location | Global (100+ nodes) | Single region |
| Node.js APIs | No | Yes |
| npm packages | Limited | All |
| Memory | 128MB | 1GB+ |
| Execution time | 30s max | 300s max |
| Database | Edge-compatible only | All drivers |`,
  example: {
    title: 'Edge Runtime Patterns',
    description: 'Edge Route Handler and geolocation-based personalisation.',
    code: [
      {
        label: 'Edge Route Handler',
        language: 'ts',
        code: `// app/api/hello/route.ts
export const runtime = 'edge'; // Opt into Edge Runtime

export async function GET(request: Request) {
  // Geolocation from Vercel edge headers
  const country = request.headers.get('x-vercel-ip-country') ?? 'US';
  const city = request.headers.get('x-vercel-ip-city') ?? 'Unknown';

  // Web Crypto API (not Node.js crypto)
  const id = crypto.randomUUID();

  return Response.json({
    message: \`Hello from \${city}, \${country}!\`,
    id,
    runtime: 'edge',
  });
}`,
      },
      {
        label: 'Geolocation-based routing in middleware',
        language: 'ts',
        code: `// middleware.ts — always runs on Edge Runtime
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country ?? 'US';
  const { pathname } = request.nextUrl;

  // Redirect EU users to GDPR-compliant version
  const euCountries = ['DE', 'FR', 'IT', 'ES', 'NL', 'PL'];
  if (euCountries.includes(country) && !pathname.startsWith('/eu')) {
    return NextResponse.redirect(
      new URL(\`/eu\${pathname}\`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static).*)'],
};`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I use Prisma in the Edge Runtime?',
      answer: 'Standard Prisma requires Node.js. Prisma Accelerate provides an edge-compatible HTTP-based client. Alternatively, use Neon\'s serverless driver (edge-compatible), Turso (SQLite at the edge), or Upstash Redis for edge-compatible data storage.',
    },
    {
      question: 'Should I make all my Route Handlers Edge Runtime?',
      answer: 'No — only routes that genuinely benefit from global distribution and have no Node.js dependencies. Routes that query a database in a single region gain nothing from Edge Runtime (the DB round trip dominates latency). Use Edge for auth, personalisation, and computation-only endpoints.',
    },
    {
      question: 'Does Edge Runtime support WebSockets?',
      answer: 'No — Edge Functions are request/response based. For WebSockets, use a dedicated WebSocket service (Pusher, Ably, Supabase Realtime) or Cloudflare Durable Objects.',
    },
  ],
  productionIssues: [
    'npm package not compatible with Edge Runtime — many packages use Node.js APIs internally. Check the package\'s edge compatibility before using it. The build will fail with a clear error if an incompatible package is used.',
    'Memory limit exceeded — Edge Functions have a 128MB memory limit. Large in-memory operations (parsing huge JSON, image processing) will fail. Move heavy operations to Node.js functions.',
    'Geolocation not available in development — request.geo is only populated on Vercel\'s edge network. In development, it is undefined. Always handle the undefined case with a fallback.',
  ],
  bestPractices: [
    'Use Edge Runtime for middleware, auth verification, and geolocation-based routing',
    'Use Node.js runtime (default) for anything that touches a database',
    'Always handle undefined geolocation values — not available in development',
    'Test Edge Runtime compatibility with next build — incompatible packages cause build errors',
    'Use Upstash Redis for edge-compatible rate limiting and session storage',
  ],
  architectNote: `Edge Runtime is a powerful tool for the right use cases. The key architectural question: does this code need to run close to the user, or close to the data? Auth verification and personalisation benefit from edge proximity. Database queries benefit from proximity to the database. Do not force Edge Runtime on DB-dependent routes.`,
  faqs: [
    {
      question: 'What is the difference between Edge Runtime and Serverless Runtime?',
      answer: 'Serverless (Node.js) functions run in a single region, have cold starts, support all Node.js APIs. Edge functions run globally, have no cold starts, but only support Web APIs. Serverless is the default and right for most use cases. Edge is for latency-critical, globally-distributed endpoints.',
    },
    {
      question: 'Can I use the Edge Runtime with the Pages Router?',
      answer: 'Yes — add export const config = { runtime: "edge" } to a Pages Router API route or page. The Edge Runtime is not App Router-specific.',
    },
    {
      question: 'How do I access Vercel KV from Edge Runtime?',
      answer: 'Vercel KV (Redis) is edge-compatible via the @vercel/kv package. It uses HTTP under the hood, not the Redis TCP protocol, making it compatible with the Edge Runtime. This enables edge-based rate limiting, session storage, and feature flags.',
    },
  ],
  keyTakeaways: [
    'Edge Runtime runs globally at CDN nodes — no cold starts, low latency',
    'Uses Web APIs only — no Node.js APIs, no filesystem, limited npm packages',
    'Opt in with export const runtime = "edge" in Route Handlers or pages',
    'Middleware always runs on Edge Runtime — no configuration needed',
    'Do not use for database queries — use Node.js runtime for DB access',
    'Use Upstash Redis and Prisma Accelerate for edge-compatible data access',
  ],
  relatedTopics: ['nextjs-middleware', 'nextjs-route-handlers', 'nextjs-caching-strategies', 'nextjs-vercel-deployment'],
};
