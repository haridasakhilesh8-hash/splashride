import type { TopicContent } from '../../types';

export const nextjsClientDataFetching: TopicContent = {
  slug: 'nextjs-client-data-fetching',
  title: 'Client Data Fetching',
  description: 'Master client-side data fetching in Next.js with SWR and TanStack Query — when to use it, how to combine it with Server Components, and production patterns.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Client data fetching is for data that must be fetched in the browser — user-specific real-time data, data that updates without navigation, or data loaded after interaction. Use SWR or TanStack Query, not raw useEffect + fetch.',
  whatIsIt: `Client data fetching runs in the browser after the page loads. Use it for:

- **Real-time data** — live notifications, stock prices, chat messages
- **User-triggered fetches** — search results as user types, load more on scroll
- **Optimistic updates** — update UI immediately, sync with server in background
- **Polling** — refresh data every N seconds without navigation

**The right tools:**
- **SWR** (by Vercel) — lightweight, excellent for simple cases
- **TanStack Query** (React Query) — more powerful, better for complex mutation flows
- **Never** raw \`useEffect + fetch\` — no caching, no deduplication, no revalidation`,
  whyWeNeedIt: `Server Components handle most data fetching in Next.js, but some data genuinely belongs on the client:

- Data that changes in real-time without user navigation
- Data that depends on browser state (geolocation, device info)
- Infinite scroll / load more patterns
- Optimistic UI (update before server confirms)
- Data that should refresh on window focus (SWR\'s killer feature)`,
  realWorldUsage: `**Client fetching in a SaaS dashboard:**

- **Notifications bell** — SWR with \`refreshInterval: 30000\` (poll every 30s)
- **Search** — TanStack Query with debounced query key
- **User profile** — SWR with \`revalidateOnFocus: true\`
- **Live order status** — SWR with short polling or WebSocket
- **Infinite feed** — TanStack Query \`useInfiniteQuery\``,
  howItWorks: `**SWR flow:**
1. Component mounts — SWR checks cache for the key
2. If cached: returns cached data immediately (stale)
3. Triggers background revalidation (fetches fresh data)
4. Updates component with fresh data if changed (stale-while-revalidate)

**TanStack Query flow:**
Same stale-while-revalidate model with additional features: mutations with rollback, query invalidation, background refetching, and a DevTools panel.`,
  example: {
    title: 'SWR and TanStack Query Patterns',
    description: 'Real client-side data fetching patterns used in production Next.js apps.',
    code: [
      {
        label: 'SWR for real-time notifications',
        language: 'tsx',
        code: `'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function NotificationBell() {
  const { data, error, isLoading } = useSWR(
    '/api/notifications',
    fetcher,
    {
      refreshInterval: 30_000,      // Poll every 30 seconds
      revalidateOnFocus: true,      // Refresh when user returns to tab
      revalidateOnReconnect: true,  // Refresh after offline
    }
  );

  if (isLoading) return <BellSkeleton />;
  if (error) return <BellError />;

  return (
    <button className="relative">
      <BellIcon />
      {data.unread > 0 && (
        <span className="badge">{data.unread}</span>
      )}
    </button>
  );
}`,
      },
      {
        label: 'TanStack Query with mutations',
        language: 'tsx',
        code: `'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function OrderActions({ orderId }: { orderId: string }) {
  const queryClient = useQueryClient();

  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetch(\`/api/orders/\${orderId}\`).then(r => r.json()),
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(\`/api/orders/\${id}/cancel\`, { method: 'POST' }).then(r => r.json()),

    // Optimistic update — update UI immediately
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['order', id] });
      const previous = queryClient.getQueryData(['order', id]);
      queryClient.setQueryData(['order', id], (old: Order) => ({
        ...old,
        status: 'cancelled',
      }));
      return { previous };
    },

    // Rollback on error
    onError: (err, id, context) => {
      queryClient.setQueryData(['order', id], context?.previous);
    },

    // Refetch after success
    onSettled: (id) => {
      queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
  });

  return (
    <button
      onClick={() => cancelMutation.mutate(orderId)}
      disabled={cancelMutation.isPending}
    >
      {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
    </button>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use SWR or TanStack Query?',
      answer: 'SWR for simple read-heavy cases (notifications, user profile, dashboard stats). TanStack Query for complex mutation flows, optimistic updates, infinite scroll, or when you need the DevTools for debugging. Both are excellent — pick one and be consistent.',
    },
    {
      question: 'Can I use client data fetching alongside Server Components?',
      answer: 'Yes — this is the standard pattern. Server Components handle the initial data load (fast, SSR). Client Components use SWR/TanStack Query for real-time updates and mutations. You can even pre-populate the SWR cache with server-fetched data using fallbackData.',
    },
    {
      question: 'Why not just use useEffect + fetch?',
      answer: 'useEffect + fetch has no caching, no deduplication, no revalidation, no error retry, and creates race conditions on fast re-renders. SWR and TanStack Query solve all of these. The only reason to use raw fetch in a Client Component is for one-off mutations (form submits) where you do not need the response cached.',
    },
  ],
  productionIssues: [
    'SWR cache not invalidated after mutations — after a POST/PUT/DELETE, call mutate(key) to tell SWR to revalidate. Otherwise users see stale data after their action.',
    'Waterfall from client fetching — if your page shell is a Server Component but critical data is client-fetched, users see a loading spinner on first load. Pre-fetch on the server and pass as initialData/fallbackData to SWR.',
    'Too many polling intervals — 10 components each polling every 30 seconds = 10 requests every 30 seconds. Lift polling to a shared context or use a single SWR call and share the data via context.',
  ],
  bestPractices: [
    'Pre-populate SWR/TanStack Query cache with server-fetched data to avoid client-side loading flash',
    'Use a shared fetcher function with error handling instead of inline fetch calls',
    'Set up a global QueryClient with sensible defaults (staleTime, retry) rather than configuring per query',
    'Use optimistic updates for mutations that users expect to be instant (like/unlike, add to cart)',
    'Deduplicate polling by lifting shared data to a context provider',
  ],
  architectNote: `The Server/Client data fetching split maps cleanly to a **read/write architecture**. Server Components handle reads (fetch and render data). Client Components handle writes (mutations) and real-time updates. This separation keeps Server Components pure and testable while giving Client Components the reactivity they need.`,
  faqs: [
    {
      question: 'How do I pre-populate SWR with data fetched on the server?',
      answer: 'Pass the server-fetched data as fallbackData to useSWR: const { data } = useSWR("/api/user", fetcher, { fallbackData: serverUser }). Or use SWRConfig with a fallback map at the layout level. This gives instant display of server data while SWR revalidates in the background.',
    },
    {
      question: 'Can I use TanStack Query in Server Components?',
      answer: 'TanStack Query v5 supports server-side prefetching with dehydrate/HydrationBoundary. You can prefetch queries in a Server Component and hydrate them in a Client Component wrapper. This gives the best of both worlds: SSR data + client-side cache management.',
    },
    {
      question: 'What is the staleTime setting in TanStack Query?',
      answer: 'staleTime controls how long fetched data is considered fresh. During staleTime, no background refetch happens. After staleTime, the next access triggers a background refetch. Default is 0 (always stale). Set to 60000 (1 min) for data that does not change frequently to reduce unnecessary requests.',
    },
  ],
  keyTakeaways: [
    'Use SWR or TanStack Query for client data fetching — never raw useEffect + fetch',
    'Client fetching is for real-time updates, mutations, and user-triggered data loads',
    'Pre-populate client cache with server-fetched data to avoid loading flashes',
    'Use optimistic updates for instant UI feedback on mutations',
    'Deduplicate polling — lift shared polling to context, not per-component',
    'Server Components for initial load, Client Components for real-time and mutations',
  ],
  relatedTopics: ['nextjs-server-data-fetching', 'nextjs-route-handlers', 'nextjs-server-actions', 'nextjs-client-components'],
};
