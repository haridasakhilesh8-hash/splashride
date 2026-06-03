import type { TopicContent } from '../../types';

export const nextjsRestApis: TopicContent = {
  slug: 'nextjs-rest-apis',
  title: 'Building REST APIs',
  description: 'Build production-grade REST APIs in Next.js — versioning, error handling, authentication, rate limiting, and the patterns used in enterprise applications.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Next.js Route Handlers can build full REST APIs. The key patterns: consistent error responses, input validation with Zod, JWT or session authentication, rate limiting, and API versioning. For external consumers, treat your Route Handlers as a proper API with versioning and documentation.',
  whatIsIt: `Building REST APIs in Next.js means creating Route Handlers that follow REST conventions:

- **Resource-based URLs**: \`/api/v1/products\`, \`/api/v1/products/[id]\`
- **HTTP method semantics**: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- **Consistent response format**: \`{ data, error, meta }\` structure
- **Proper status codes**: 200, 201, 400, 401, 403, 404, 422, 500
- **Input validation**: Zod schemas for request bodies and query params
- **Authentication**: JWT bearer tokens or session cookies`,
  whyWeNeedIt: `When your Next.js app serves mobile apps, third-party integrations, or public API consumers, you need a proper REST API — not just internal Server Component data fetching.

Next.js Route Handlers provide a clean way to build this API in the same project as your frontend, sharing types, validation schemas, and business logic.`,
  realWorldUsage: `**REST API structure in a SaaS product:**

\`\`\`
app/api/v1/
├── auth/
│   ├── login/route.ts
│   └── refresh/route.ts
├── users/
│   ├── route.ts          # GET /api/v1/users, POST /api/v1/users
│   └── [id]/route.ts     # GET/PUT/DELETE /api/v1/users/:id
└── products/
    ├── route.ts
    └── [id]/
        ├── route.ts
        └── reviews/route.ts  # /api/v1/products/:id/reviews
\`\`\``,
  howItWorks: `**REST API request flow:**

1. Client sends \`GET /api/v1/products?category=tech\`
2. Middleware checks rate limit and authentication
3. Route Handler validates query params
4. Data access layer fetches from DB
5. Response formatted with consistent structure
6. Returned with appropriate cache headers`,
  example: {
    title: 'Production REST API Patterns',
    description: 'Consistent error handling, validation, and auth patterns for a production API.',
    code: [
      {
        label: 'Consistent API response format',
        language: 'ts',
        code: `// lib/api-response.ts — Shared response utilities
import { NextResponse } from 'next/server';

type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ data }, { status });
}

export function created<T>(data: T) {
  return NextResponse.json<ApiResponse<T>>({ data }, { status: 201 });
}

export function badRequest(error: string) {
  return NextResponse.json<ApiResponse<never>>({ error }, { status: 400 });
}

export function unauthorised() {
  return NextResponse.json<ApiResponse<never>>(
    { error: 'Unauthorised' }, { status: 401 }
  );
}

export function notFound(resource = 'Resource') {
  return NextResponse.json<ApiResponse<never>>(
    { error: \`\${resource} not found\` }, { status: 404 }
  );
}

export function serverError(error: unknown) {
  console.error('[API Error]', error);
  return NextResponse.json<ApiResponse<never>>(
    { error: 'Internal server error' }, { status: 500 }
  );
}`,
      },
      {
        label: 'Full REST endpoint with validation and auth',
        language: 'ts',
        code: `// app/api/v1/products/route.ts
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { verifyApiToken } from '@/lib/auth';
import { ok, created, badRequest, unauthorised, serverError } from '@/lib/api-response';

const ProductQuerySchema = z.object({
  category: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

const CreateProductSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  category: z.string(),
  description: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // Parse and validate query params
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const query = ProductQuerySchema.safeParse(params);
    if (!query.success) return badRequest('Invalid query parameters');

    const { category, page, limit } = query.data;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      db.product.findMany({
        where: category ? { category } : undefined,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.product.count({ where: category ? { category } : undefined }),
    ]);

    return ok({ products, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Auth: require API token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const session = token ? await verifyApiToken(token) : null;
    if (!session) return unauthorised();

    // Validate body
    const body = await request.json();
    const result = CreateProductSchema.safeParse(body);
    if (!result.success) return badRequest(result.error.issues[0].message);

    const product = await db.product.create({ data: result.data });
    return created(product);
  } catch (error) {
    return serverError(error);
  }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I build a REST API in Next.js or use a separate backend?',
      answer: 'Next.js for APIs that are tightly coupled to your frontend (same types, same auth, same deployment). Separate backend (NestJS, Express) when the API is consumed by many different clients, needs to scale independently, or has complex business logic that benefits from a dedicated service.',
    },
    {
      question: 'How do I version my API?',
      answer: 'Use URL versioning: /api/v1/products, /api/v2/products. In Next.js, create route group folders: app/api/(v1)/products/route.ts and app/api/(v2)/products/route.ts. Alternatively, use a header-based versioning approach with middleware.',
    },
    {
      question: 'Can I generate OpenAPI documentation from Next.js Route Handlers?',
      answer: 'Not automatically — Next.js does not generate OpenAPI specs. Use libraries like next-swagger-doc or manually maintain an openapi.yaml. For type-safe APIs, consider tRPC instead of REST — it generates types automatically.',
    },
  ],
  productionIssues: [
    'Missing error handling — an unhandled exception in a Route Handler returns a 500 with a stack trace in development, or a generic error in production. Always wrap handlers in try/catch and return structured error responses.',
    'No rate limiting — public API endpoints without rate limiting are vulnerable to abuse. Add rate limiting at the middleware level using Upstash Redis or similar.',
    'Returning sensitive data — accidentally including password hashes, API keys, or internal IDs in API responses. Always use explicit select statements and DTO transformation.',
  ],
  bestPractices: [
    'Use a consistent response format across all endpoints — { data, error, meta }',
    'Validate all inputs with Zod — both body and query params',
    'Use URL versioning from day one — /api/v1/ is much easier than retrofitting',
    'Never return raw DB objects — always transform to DTOs to control what is exposed',
    'Add rate limiting to all public endpoints',
  ],
  architectNote: `For enterprise APIs, consider whether Next.js Route Handlers are the right tool. They are excellent for BFF (Backend for Frontend) patterns — APIs designed specifically for your frontend. For general-purpose APIs consumed by multiple clients, a dedicated NestJS or Express service with OpenAPI documentation is more appropriate.`,
  faqs: [
    {
      question: 'How do I implement pagination in a REST API?',
      answer: 'Use cursor-based pagination for large datasets (more efficient) or offset-based for simpler cases. Return: { data: [...], pagination: { page, limit, total, nextCursor } }. Cursor-based: WHERE id > lastId ORDER BY id LIMIT n, which avoids the performance issues of OFFSET on large tables.',
    },
    {
      question: 'Should I use tRPC instead of REST for my Next.js API?',
      answer: 'tRPC is excellent for full-stack TypeScript apps where the API is only consumed by your own frontend. It provides end-to-end type safety without code generation. Use REST when you need to support non-TypeScript clients, need OpenAPI documentation, or need a public API.',
    },
    {
      question: 'How do I handle CORS for my Next.js API?',
      answer: 'Add CORS headers in the Route Handler response, or use middleware.ts to add headers to all /api/* routes. For development, configure the allowed origins list. Never use * in production for authenticated endpoints.',
    },
  ],
  keyTakeaways: [
    'Use consistent response format: { data, error } across all endpoints',
    'Validate all inputs with Zod — both request body and query params',
    'Version your API from day one: /api/v1/',
    'Never return raw DB objects — use DTOs to control exposed data',
    'Add rate limiting to all public endpoints',
    'Consider tRPC for type-safe internal APIs, REST for public/external APIs',
  ],
  relatedTopics: ['nextjs-route-handlers', 'nextjs-middleware', 'nextjs-authentication', 'nextjs-server-actions'],
};
