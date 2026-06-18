import type { TopicContent } from '../../types';

export const reactReactQuery: TopicContent = {
  slug: 'react-react-query',
  title: 'React Query',
  description: 'Learn how React Query manages server state through caching, invalidation, retries, background refresh, and mutation workflows.',
  applicableVersions: ['React 16+', 'React 18', 'TanStack Query 5.x'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'React Query is for server state, not general UI state. It solves fetching, caching, refetching, and mutation coordination so components stop reimplementing loading and cache logic manually.',
  whatIsIt: `React Query manages asynchronous server state.

- Query keys identify cached resources
- Queries fetch and cache remote data
- Mutations change remote data and trigger invalidation or optimistic updates
- Freshness and retry behavior are configurable from business needs`,
  whyWeNeedIt: `Manual fetching inside useEffect creates repeated boilerplate, duplicated network calls, race conditions, and inconsistent cache behavior. React Query gives teams one place to reason about freshness and mutation flow.`,
  realWorldUsage: `Teams use React Query in dashboards, admin apps, and SaaS products where many screens reuse the same remote entities and need reliable background refresh, retry, pagination, and mutation handling.`,
  howItWorks: `A query hook runs with a query key and fetch function. React Query caches the result, deduplicates requests, and decides when to reuse, refetch, or invalidate that data. Mutations can optimistically update UI and then reconcile with the server response.`,
  example: {
    title: 'Query and Mutation Discipline',
    description: 'Stable query keys and clear invalidation keep server state trustworthy.',
    code: [
      {
        label: 'React Query Basics',
        language: 'tsx',
        code: `import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function useInvoices(accountId: string) {
  return useQuery({
    queryKey: ['invoices', accountId],
    queryFn: () => fetch(\`/api/accounts/\${accountId}/invoices\`).then((r) => r.json()),
    staleTime: 60_000,
  });
}

function InvoiceList({ accountId }: { accountId: string }) {
  const queryClient = useQueryClient();
  const invoices = useInvoices(accountId);

  const markPaid = useMutation({
    mutationFn: (invoiceId: string) =>
      fetch(\`/api/invoices/\${invoiceId}/pay\`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices', accountId] });
    },
  });

  if (invoices.isLoading) return <p>Loading...</p>;
  if (invoices.isError) return <p>Failed to load invoices.</p>;

  return (
    <ul>
      {invoices.data.map((invoice: Invoice) => (
        <li key={invoice.id}>
          {invoice.number}
          <button onClick={() => markPaid.mutate(invoice.id)}>Mark paid</button>
        </li>
      ))}
    </ul>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should React Query replace Redux or Zustand?',
      answer: 'No. React Query is primarily for server state. Redux and Zustand are general client-state tools. Many apps use React Query plus a small local state tool together.',
    },
    {
      question: 'What makes a good query key?',
      answer: 'A stable key that uniquely identifies the remote resource and all relevant parameters. Weak query keys are a common source of stale or mixed data.',
    },
  ],
  productionIssues: [
    'Weak query keys cause cache collisions and confusing stale data.',
    'Over-invalidation creates unnecessary refetch storms after mutations.',
    'Teams keep staleTime at the default everywhere instead of matching business freshness needs.',
  ],
  bestPractices: [
    'Treat query keys as part of the app contract.',
    'Choose staleTime from user expectations and API cost, not habit.',
    'Handle mutations with deliberate invalidation or optimistic updates.',
    'Keep client UI state outside React Query unless it directly represents remote data lifecycle.',
  ],
  architectNote: `React Query changes architecture because it makes server state first-class instead of pretending remote data is just another local state value. Teams that adopt it well usually reduce effect boilerplate and clarify cache ownership significantly.`,
  faqs: [
    {
      question: 'When would I choose RTK Query instead?',
      answer: 'Usually when the app is already committed to Redux and the team wants one integrated event, cache, and tooling story instead of separate state layers.',
    },
  ],
  keyTakeaways: [
    'React Query is for server state, not general UI state.',
    'Stable query keys are critical for correct caching.',
    'Invalidation and freshness should reflect product needs.',
    'It removes a lot of manual fetching boilerplate from components.',
  ],
  relatedTopics: ['react-fetch-api', 'react-axios', 'react-redux-toolkit', 'react-error-handling'],
};
