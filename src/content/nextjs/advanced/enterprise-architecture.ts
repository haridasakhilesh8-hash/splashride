import type { TopicContent } from '../../types';

export const nextjsEnterpriseArchitecture: TopicContent = {
  slug: 'nextjs-enterprise-architecture',
  title: 'Enterprise Architecture',
  description: 'Architect large-scale Next.js applications for enterprise — monorepos, module federation, BFF patterns, multi-tenancy, and the patterns that scale to 50+ engineers.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Enterprise Next.js architecture focuses on scalability for teams, not just traffic. Key patterns: monorepo with Turborepo, strict module boundaries, data access layer, feature flags, multi-tenancy, and a component library. These patterns let 50+ engineers work on the same codebase without stepping on each other.',
  whatIsIt: `Enterprise Next.js architecture addresses challenges that small apps never face:

- **Team scale** — 50+ engineers, multiple feature teams, shared components
- **Codebase scale** — thousands of components, hundreds of routes
- **Deployment scale** — multiple environments, blue/green deployments, feature flags
- **Multi-tenancy** — serving multiple customers from one codebase
- **Compliance** — GDPR, SOC2, HIPAA requirements affecting architecture

**Key architectural patterns:**
- Monorepo with Turborepo
- Backend for Frontend (BFF)
- Data Access Layer (DAL)
- Feature flags
- Multi-tenancy via subdomain routing`,
  whyWeNeedIt: `Without architectural guardrails, large Next.js codebases become:

- **Spaghetti imports** — components importing from anywhere, circular dependencies
- **Inconsistent patterns** — 10 different ways to fetch data
- **Slow builds** — rebuilding everything when one file changes
- **Merge conflicts** — multiple teams editing the same files
- **Security gaps** — no clear boundary between public and private data`,
  realWorldUsage: `**Enterprise Next.js monorepo structure:**

\`\`\`
my-enterprise/
├── apps/
│   ├── web/           # Main Next.js app
│   ├── admin/         # Admin Next.js app
│   └── docs/          # Documentation site
├── packages/
│   ├── ui/            # Shared component library
│   ├── db/            # Prisma schema + client
│   ├── auth/          # Auth utilities
│   ├── config/        # Shared ESLint, TypeScript config
│   └── types/         # Shared TypeScript types
└── turbo.json     # Turborepo pipeline config
\`\`\``,
  howItWorks: `**The BFF (Backend for Frontend) pattern:**

Instead of calling microservices directly from the frontend, the Next.js app acts as a BFF:

1. Client Component calls a Server Action or Route Handler
2. BFF layer aggregates data from multiple microservices
3. BFF transforms data into the shape the frontend needs
4. BFF handles auth, rate limiting, and error normalisation
5. Frontend receives clean, typed data

This decouples the frontend from backend service details and enables frontend-driven API design.`,
  example: {
    title: 'Enterprise Patterns',
    description: 'Data Access Layer, multi-tenancy, and feature flags.',
    code: [
      {
        label: 'Data Access Layer (DAL)',
        language: 'ts',
        code: `// lib/dal/products.ts — The only place that touches the products table
import { cache } from 'react';
import { db } from '@/lib/db';
import { requireAuth, requirePermission } from '@/lib/auth';

// All product access goes through this layer
// Benefits: single place for auth checks, caching, and query optimisation

export const getProduct = cache(async (id: string) => {
  // Auth check — always enforced at the DAL level
  const session = await requireAuth();
  await requirePermission(session, 'products:read');

  return db.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      // Never select: passwordHash, internalNotes, costPrice
    },
  });
});

export const getProductsForUser = cache(async (userId: string) => {
  const session = await requireAuth();
  // Users can only see their own products
  if (session.userId !== userId && session.role !== 'admin') {
    throw new Error('Forbidden');
  }
  return db.product.findMany({ where: { ownerId: userId } });
});`,
      },
      {
        label: 'Multi-tenancy via subdomain routing',
        language: 'ts',
        code: `// middleware.ts — Multi-tenant subdomain routing
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? '';
  const subdomain = hostname.split('.')[0];

  // app.myproduct.com → /app/* routes
  // acme.myproduct.com → tenant "acme" routes
  // myproduct.com → marketing routes

  const isMainDomain = hostname === 'myproduct.com' || hostname === 'www.myproduct.com';
  const isAppSubdomain = subdomain === 'app';

  if (!isMainDomain && !isAppSubdomain) {
    // Tenant subdomain: rewrite to /tenant/[subdomain]/* without changing URL
    const url = request.nextUrl.clone();
    url.pathname = \`/tenant/\${subdomain}\${url.pathname}\`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api/auth|static).*)'],
};`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should every enterprise Next.js project use a monorepo?',
      answer: 'No — monorepos add complexity. Use a monorepo when you have multiple apps sharing significant code (component library, auth, DB client). For a single app, a well-structured single repo is simpler. Start simple, migrate to monorepo when the shared code pain becomes real.',
    },
    {
      question: 'What is the difference between a BFF and a regular API?',
      answer: 'A BFF is designed for a specific frontend. It aggregates, transforms, and optimises data specifically for that client\'s needs. A general-purpose API is designed for multiple consumers. The BFF pattern is especially valuable when the frontend needs data from multiple microservices combined into one response.',
    },
    {
      question: 'How do I enforce module boundaries in a Next.js app?',
      answer: 'Use ESLint import rules to prevent cross-boundary imports. In a monorepo, use Turborepo\'s package boundaries. In a single app, use barrel files (index.ts) to define the public API of each module and lint rules to prevent direct internal imports.',
    },
  ],
  productionIssues: [
    'Turborepo cache invalidation issues — incorrect cache keys cause stale builds. Ensure all environment variables used in builds are listed in the globalDependencies config.',
    'Circular dependencies in monorepos — packages importing from each other creates build order issues. Use dependency-cruiser to detect and prevent circular dependencies.',
    'Feature flags not cleaned up — accumulating feature flags become technical debt. Establish a policy: flags are removed within 2 sprints of full rollout. Track flags in a registry.',
  ],
  bestPractices: [
    'Create a Data Access Layer — all DB queries go through typed, auth-checked functions',
    'Use Turborepo for monorepos — remote caching dramatically speeds up CI',
    'Implement feature flags from day one for gradual rollouts',
    'Enforce module boundaries with ESLint — prevent architectural drift',
    'Document architecture decisions in ADRs (Architecture Decision Records)',
  ],
  architectNote: `Enterprise architecture is about **managing complexity at scale**. The patterns here (DAL, BFF, monorepo, feature flags) are not premature optimisation — they are the foundation that prevents the codebase from becoming unmanageable as the team grows. The cost of retrofitting these patterns into an existing 200k-line codebase is orders of magnitude higher than building them in from the start.`,
  faqs: [
    {
      question: 'How do I implement feature flags in Next.js?',
      answer: 'Use a feature flag service (LaunchDarkly, Unleash, Statsig) or build a simple one with Vercel Edge Config. Check flags in middleware for routing, in Server Components for rendering, and in Client Components for UI. Never check flags in both places for the same feature — pick one layer.',
    },
    {
      question: 'How do I handle GDPR compliance in a Next.js app?',
      answer: 'Key requirements: consent management (cookie banner), data subject rights (export, delete), data minimisation (only collect what you need), and audit logs. Use a consent management platform (Cookiebot, OneTrust) integrated with your analytics. Implement data export and deletion endpoints.',
    },
    {
      question: 'How do I scale Next.js to handle millions of users?',
      answer: 'Static pages (SSG/ISR) scale infinitely via CDN — no server scaling needed. For SSR at scale: horizontal scaling with connection pooling, Redis for shared state, and CDN caching of semi-static responses. The architecture decisions (static vs dynamic) matter more than infrastructure scaling.',
    },
  ],
  keyTakeaways: [
    'Data Access Layer: all DB queries through typed, auth-checked functions',
    'Monorepo with Turborepo for multi-app organisations',
    'BFF pattern: Next.js aggregates microservice data for the frontend',
    'Feature flags enable gradual rollouts and instant rollbacks',
    'Multi-tenancy via subdomain routing in middleware',
    'Architecture decisions (static vs dynamic) scale better than infrastructure scaling',
  ],
  relatedTopics: ['nextjs-middleware', 'nextjs-server-actions', 'nextjs-caching-strategies', 'nextjs-authentication'],
};
