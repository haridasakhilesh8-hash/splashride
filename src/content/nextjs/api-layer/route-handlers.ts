import type { TopicContent } from '../../types';

export const nextjsRouteHandlers: TopicContent = {
  slug: 'nextjs-route-handlers',
  title: 'Route Handlers',
  description: 'Master Route Handlers in Next.js — the App Router replacement for API routes, supporting all HTTP methods, streaming responses, and edge runtime.',
  applicableVersions: ['Next.js 13.4+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Route Handlers are files named route.ts inside the app/ directory. They handle HTTP requests (GET, POST, PUT, DELETE, PATCH) and replace the pages/api/ API routes from the Pages Router. They have access to the full Web Request/Response API.',
  whatIsIt: `Route Handlers are server-side request handlers defined in \`route.ts\` files inside \`app/\`:

- **File**: \`app/api/products/route.ts\`
- **URL**: \`/api/products\`
- **Exports**: Named functions matching HTTP methods: \`GET\`, \`POST\`, \`PUT\`, \`DELETE\`, \`PATCH\`, \`HEAD\`, \`OPTIONS\`
- **API**: Web standard \`Request\` and \`Response\` objects (not Node.js \`req/res\`)

**Key differences from Pages Router API routes:**
- Use \`NextRequest\` / \`NextResponse\` (extended Web API)
- Support streaming responses
- Can run on Edge Runtime
- Support all HTTP methods with named exports
- Can be co-located with the route they serve`,
  whyWeNeedIt: `Route Handlers are needed for:

- **External API consumers** — mobile apps, third-party integrations
- **Webhooks** — receiving events from Stripe, GitHub, CMS
- **Form submissions** — when not using Server Actions
- **File uploads** — handling multipart form data
- **OAuth callbacks** — handling redirect-based auth flows
- **Streaming responses** — Server-Sent Events, streaming AI responses

For internal data fetching from Server Components, you do NOT need Route Handlers — fetch directly from the DB.`,
  realWorldUsage: `**Route Handler use cases in production:**

\`\`\`
app/api/
├── webhooks/
│   ├── stripe/route.ts      # Stripe payment webhooks
│   └── github/route.ts      # GitHub CI/CD webhooks
├── revalidate/route.ts      # CMS revalidation webhook
├── upload/route.ts          # File upload endpoint
├── auth/
│   └── [...nextauth]/route.ts # NextAuth handler
└── products/
    ├── route.ts             # GET /api/products, POST /api/products
    └── [id]/route.ts        # GET/PUT/DELETE /api/products/:id
\`\`\``,
  howItWorks: `**Route Handler request lifecycle:**

1. HTTP request arrives at \`/api/products\`
2. Next.js matches \`app/api/products/route.ts\`
3. Calls the exported function matching the HTTP method (\`GET\`, \`POST\`, etc.)
4. Function receives \`NextRequest\` and a context object with \`params\`
5. Function returns a \`NextResponse\` or plain \`Response\`
6. Response is sent to the client

**Caching:** GET Route Handlers are cached by default in Next.js 14. In Next.js 15, they are not cached by default. Use \`export const dynamic = 'force-dynamic'\` to opt out of caching.`,
  example: {
    title: 'Route Handler Patterns',
    description: 'CRUD Route Handler with auth, validation, and error handling.',
    code: [
      {
        label: 'CRUD Route Handlers',
        language: 'ts',
        code: `// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const CreateProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.string(),
});

// GET /api/products
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category');

  const products = await db.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(products);
}

// POST /api/products
export async function POST(request: NextRequest) {
  // Auth check
  const session = await requireAuth(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  // Parse and validate body
  const body = await request.json();
  const result = CreateProductSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.issues },
      { status: 400 }
    );
  }

  const product = await db.product.create({ data: result.data });
  return NextResponse.json(product, { status: 201 });
}`,
      },
      {
        label: 'Dynamic Route Handler',
        language: 'ts',
        code: `// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface Context {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params; // Async in Next.js 15
  const product = await db.product.findUnique({ where: { id } });

  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const body = await request.json();
  const product = await db.product.update({ where: { id }, data: body });
  return NextResponse.json(product);
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const { id } = await params;
  await db.product.delete({ where: { id } });
  return new Response(null, { status: 204 });
}`,
      },
      {
        label: 'Webhook with signature verification',
        language: 'ts',
        code: `// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object);
      break;
  }

  return NextResponse.json({ received: true });
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use Route Handlers or Server Actions for form submissions?',
      answer: 'Server Actions for forms in your own app — they are simpler, type-safe, and integrate with React\'s transition API. Route Handlers for forms submitted from external sources (mobile apps, third-party services) or when you need a traditional REST endpoint.',
    },
    {
      question: 'Can I use Route Handlers to fetch data for Server Components?',
      answer: 'Technically yes, but it is an anti-pattern. Calling your own API from a Server Component adds an unnecessary network hop (server → your API → server). Instead, call the data function directly: import { getProducts } from "@/lib/data" and call it in the Server Component.',
    },
    {
      question: 'What is the difference between route.ts and page.tsx in the same folder?',
      answer: 'They cannot coexist in the same folder. page.tsx creates a UI route (returns JSX). route.ts creates an API endpoint (returns Response). If you need both, put the API in a subfolder: app/products/route.ts for the API and app/products/page.tsx for the UI.',
    },
  ],
  productionIssues: [
    'CORS errors on Route Handlers — Route Handlers do not add CORS headers by default. Add them manually in the response headers or use a middleware that adds CORS headers for /api/* routes.',
    'Forgetting to verify webhook signatures — an unverified webhook endpoint accepts requests from anyone. Always verify the signature using the provider\'s SDK (Stripe, GitHub, etc.).',
    'Returning Node.js res.json() instead of NextResponse.json() — Route Handlers use the Web API, not Node.js. Using the wrong API causes runtime errors.',
  ],
  bestPractices: [
    'Use NextRequest and NextResponse — they extend the Web API with Next.js-specific features',
    'Always validate request bodies with Zod or similar — never trust client input',
    'Verify webhook signatures before processing — never process unverified webhooks',
    'Return appropriate HTTP status codes — 201 for created, 204 for deleted, 400 for validation errors',
    'Add CORS headers for endpoints consumed by external clients',
  ],
  architectNote: `Route Handlers should be the **thin API layer** in a Next.js app — they validate input, check auth, call business logic functions, and return responses. Business logic belongs in \`lib/\`, not in route handlers. A route handler should be 20–30 lines maximum. If it is longer, extract the logic.`,
  faqs: [
    {
      question: 'How do I add middleware to Route Handlers (e.g., rate limiting)?',
      answer: 'Create a higher-order function that wraps your handler: const withRateLimit = (handler) => async (req, ctx) => { await checkRateLimit(req); return handler(req, ctx); }. Then export const GET = withRateLimit(myHandler). Or use middleware.ts for app-wide rate limiting.',
    },
    {
      question: 'Can Route Handlers stream responses?',
      answer: 'Yes — return a Response with a ReadableStream for streaming. This is used for Server-Sent Events and streaming AI responses: return new Response(stream, { headers: { "Content-Type": "text/event-stream" } }). The Vercel AI SDK uses this pattern.',
    },
    {
      question: 'How do I handle file uploads in Route Handlers?',
      answer: 'Use request.formData() to parse multipart form data: const formData = await request.formData(); const file = formData.get("file") as File; const buffer = await file.arrayBuffer(). Then upload to S3 or another storage service.',
    },
  ],
  keyTakeaways: [
    'Route Handlers replace pages/api/ — defined in route.ts files inside app/',
    'Export named functions matching HTTP methods: GET, POST, PUT, DELETE',
    'Use NextRequest/NextResponse — they extend the Web API',
    'Do NOT use Route Handlers for internal Server Component data fetching — call functions directly',
    'Always validate input with Zod and verify webhook signatures',
    'Route Handlers are the API layer for external consumers, webhooks, and file uploads',
  ],
  relatedTopics: ['nextjs-rest-apis', 'nextjs-middleware', 'nextjs-server-actions', 'nextjs-authentication'],
};
