import type { TopicContent } from '../../types';

export const nextjsServerActions: TopicContent = {
  slug: 'nextjs-server-actions',
  title: 'Server Actions',
  description: 'Master Server Actions in Next.js — the paradigm shift for form handling and mutations that eliminates API routes for internal data changes.',
  applicableVersions: ['Next.js 13.4+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Server Actions are async functions marked with "use server" that run on the server but can be called from Client Components. They replace API routes for form submissions and mutations. Call a Server Action from a form action or button click — no fetch(), no API route needed.',
  whatIsIt: `Server Actions are async functions that:

- **Run on the server** — have access to DB, file system, environment secrets
- **Can be called from Client Components** — as form actions or event handlers
- **Are marked with \`'use server'\`** — either at the function level or file level
- **Automatically handle** CSRF protection, serialisation, and network transport
- **Integrate with React transitions** — pending states, optimistic updates

**Two ways to define Server Actions:**
1. \`'use server'\` at the top of a file — entire file is Server Actions
2. \`'use server'\` inside an async function in a Server Component`,
  whyWeNeedIt: `Before Server Actions, every mutation required:
1. A Route Handler (\`/api/update-product\`)
2. A Client Component fetch call
3. Manual error handling
4. Manual loading state management
5. Manual cache invalidation after success

Server Actions collapse this to a single function call with automatic cache invalidation.`,
  realWorldUsage: `**Server Actions in production:**

- Form submissions (create, update, delete)
- File uploads with processing
- Shopping cart mutations
- User preference updates
- Admin bulk operations
- Any mutation that should invalidate cached pages`,
  howItWorks: `**Server Action call flow:**

1. User clicks "Save" on a form
2. Client Component calls the Server Action
3. Next.js serialises the arguments and sends them to the server
4. The Server Action runs on the server (DB access, etc.)
5. Next.js serialises the return value and sends it back
6. Client Component receives the result
7. If \`revalidatePath\` was called, Next.js invalidates the cache
8. React re-renders affected Server Components with fresh data`,
  example: {
    title: 'Server Action Patterns',
    description: 'Form handling, optimistic updates, and error handling with Server Actions.',
    code: [
      {
        label: 'Server Action with form',
        language: 'tsx',
        code: `// actions/product.ts
'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const UpdateProductSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().positive(),
});

export async function updateProduct(formData: FormData) {
  const session = await requireAuth();

  const result = UpdateProductSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  await db.product.update({
    where: { id: formData.get('id') as string },
    data: result.data,
  });

  revalidatePath('/products'); // Invalidate the products page cache
  redirect('/products'); // Redirect after success
}

// app/products/[id]/edit/page.tsx
import { updateProduct } from '@/actions/product';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({ where: { id: params.id } });

  return (
    <form action={updateProduct}> {/* Server Action as form action */}
      <input type="hidden" name="id" value={product.id} />
      <input name="name" defaultValue={product.name} />
      <input name="price" type="number" defaultValue={product.price} />
      <button type="submit">Save</button>
    </form>
  );
}`,
      },
      {
        label: 'Server Action with useActionState (React 19)',
        language: 'tsx',
        code: `'use client';
import { useActionState } from 'react'; // React 19
import { updateProduct } from '@/actions/product';

type State = { error?: string; success?: boolean };

export function EditProductForm({ product }: { product: Product }) {
  const [state, formAction, isPending] = useActionState(
    updateProduct,
    { error: undefined, success: false }
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={product.id} />

      <div>
        <label>Name</label>
        <input name="name" defaultValue={product.name} />
      </div>

      {state.error && (
        <p className="text-red-500">{state.error}</p>
      )}

      {state.success && (
        <p className="text-green-500">Saved!</p>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I call a Server Action from a Server Component?',
      answer: 'Yes — but only as a form action (not as a direct function call). In a Server Component, pass the Server Action to a form\'s action prop. For direct calls in Server Components, just call the function directly — it is already on the server, no action needed.',
    },
    {
      question: 'Are Server Actions secure? Can users call them with arbitrary data?',
      answer: 'Server Actions are POST endpoints under the hood. Always validate input with Zod and check authentication inside the action. Never trust that the caller is who they claim to be. Next.js adds CSRF protection automatically, but auth and validation are your responsibility.',
    },
    {
      question: 'Should I use Server Actions or Route Handlers for mutations?',
      answer: 'Server Actions for mutations from your own frontend (forms, buttons). Route Handlers for mutations from external clients (mobile apps, third-party services, webhooks). Server Actions have better DX (no fetch, auto CSRF, cache invalidation), but they are not a public API.',
    },
  ],
  productionIssues: [
    'Missing auth check in Server Action — any user can call a Server Action if they know the endpoint. Always call requireAuth() at the top of every Server Action that modifies data.',
    'Server Action returning too much data — Server Actions return serialisable data. Returning full Prisma objects with nested relations can be large. Return only what the Client Component needs.',
    'Not calling revalidatePath after mutations — the UI shows stale data after a successful mutation. Always call revalidatePath or revalidateTag for any cached pages affected by the mutation.',
  ],
  bestPractices: [
    'Always validate input with Zod at the top of every Server Action',
    'Always check authentication before any data modification',
    'Call revalidatePath or revalidateTag after successful mutations',
    'Return structured results: { error?: string; data?: T } for Client Components to handle',
    'Keep Server Actions in dedicated files (actions/product.ts) not co-located with components',
  ],
  architectNote: `Server Actions represent a **return to the server-centric model** — mutations happen on the server, clients just trigger them. This is actually closer to how traditional MVC frameworks work (Rails, Django), but with the DX of React. The elimination of API routes for internal mutations significantly reduces the surface area for security vulnerabilities.`,
  faqs: [
    {
      question: 'Can I use Server Actions with file uploads?',
      answer: 'Yes — access files from FormData: const file = formData.get("file") as File; const buffer = await file.arrayBuffer(). Then upload to S3 or process server-side. File size is limited by the server\'s body size limit (4MB default on Vercel, configurable).',
    },
    {
      question: 'How do I implement optimistic updates with Server Actions?',
      answer: 'Use React\'s useOptimistic hook: const [optimisticItems, addOptimistic] = useOptimistic(items). Call addOptimistic(newItem) immediately, then call the Server Action. If the action fails, React automatically reverts to the original state.',
    },
    {
      question: 'Can Server Actions be called in parallel?',
      answer: 'Yes — await Promise.all([action1(data1), action2(data2)]). However, be careful with actions that modify the same resource — concurrent mutations can cause race conditions. Use database transactions for operations that must be atomic.',
    },
  ],
  keyTakeaways: [
    'Server Actions run on the server, called from Client Components — no API route needed',
    'Always validate input with Zod and check auth inside every Server Action',
    'Call revalidatePath/revalidateTag after mutations to keep the UI fresh',
    'Use useActionState for pending states and error handling in forms',
    'Server Actions are not a public API — use Route Handlers for external consumers',
    'Next.js adds CSRF protection automatically for Server Actions',
  ],
  relatedTopics: ['nextjs-route-handlers', 'nextjs-server-components', 'nextjs-revalidation', 'nextjs-authentication'],
};
