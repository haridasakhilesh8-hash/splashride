import type { TopicContent } from '../../types';

export const reactFetchApi: TopicContent = {
  slug: 'react-fetch-api',
  title: 'Fetch API',
  description: 'Master data fetching in React with the Fetch API. Learn patterns for loading states, error handling, cancellation, and the production patterns senior engineers use.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The Fetch API is the browser\'s built-in HTTP client. In React, you call fetch() inside useEffect to load data when a component mounts or when dependencies change. For production apps, wrap fetch in a custom hook or use React Query instead of calling it directly in components.',
  whatIsIt: `The Fetch API is a browser-native HTTP client that returns Promises:

\`\`\`ts
const response = await fetch('/api/claims');
const data = await response.json();
\`\`\`

Key characteristics:
- **Does not throw on HTTP errors** — fetch only rejects on network failure. A 404 or 500 response resolves successfully. You must check \`response.ok\` manually.
- **Two-step process** — first await the response, then await the body (\`response.json()\`, \`response.text()\`, etc.)
- **AbortController** — cancel in-flight requests with an AbortSignal`,
  whyWeNeedIt: `React components need data from APIs. The Fetch API is the simplest way to get it without adding dependencies. Understanding fetch is foundational even if you later use Axios or React Query, because those libraries build on the same concepts.`,
  realWorldUsage: `Direct fetch usage in React:

- Simple data loading in a custom hook
- One-off POST requests (form submission, action buttons)
- Streaming responses (Server-Sent Events, ReadableStream)
- Uploading files with FormData`,
  howItWorks: `**In React, always use fetch inside useEffect:**

1. Component mounts
2. useEffect runs after render
3. fetch() starts the request
4. Response arrives, setState updates the component
5. Component re-renders with the data

**AbortController:**
Cancel the request in the useEffect cleanup function to prevent setState on unmounted components and to cancel stale requests when dependencies change.`,
  example: {
    title: 'Fetch Patterns in React',
    description: 'A production-ready fetch wrapper and custom hook.',
    code: [
      {
        label: 'Production Fetch Wrapper',
        language: 'tsx',
        code: `// Centralised fetch wrapper — handles auth headers, base URL, and error parsing
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken(); // from auth store

  const response = await fetch(\`\${import.meta.env.VITE_API_URL}\${path}\`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: \`Bearer \${token}\` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    // Parse error response from API
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message ?? \`HTTP \${response.status}\`);
  }

  if (response.status === 204) return undefined as T; // No Content
  return response.json() as Promise<T>;
}

// Usage
const claims = await apiFetch<Claim[]>('/claims');
const claim  = await apiFetch<Claim>(\`/claims/\${id}\`);
await apiFetch('/claims', { method: 'POST', body: JSON.stringify(newClaim) });`,
      },
      {
        label: 'useFetch Custom Hook with Cancellation',
        language: 'tsx',
        code: `function useFetch<T>(url: string) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: string | null;
  }>({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();

    setState({ data: null, loading: true, error: null });

    apiFetch<T>(url, { signal: controller.signal })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        if (err.name === 'AbortError') return; // ignore cancelled requests
        setState({ data: null, loading: false, error: err.message });
      });

    return () => controller.abort(); // cancel on unmount or url change
  }, [url]);

  return state;
}

// Usage
function ClaimsList({ userId }: { userId: string }) {
  const { data, loading, error } = useFetch<Claim[]>(\`/claims?userId=\${userId}\`);
  if (loading) return <Spinner />;
  if (error)   return <ErrorBanner message={error} />;
  return <ul>{data!.map(c => <ClaimRow key={c.id} claim={c} />)}</ul>;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does fetch not throw on 404 or 500?',
      answer: 'fetch only rejects (throws) on network failures — no internet, DNS failure, CORS error. HTTP error responses (4xx, 5xx) are considered successful responses from fetch\'s perspective. Always check response.ok (true for 200-299) and throw manually if it is false.',
    },
    {
      question: 'What is AbortController and when do I need it?',
      answer: 'AbortController lets you cancel a fetch request. In React, return controller.abort() from useEffect cleanup. Without it: (1) if the component unmounts before the request completes, setState is called on an unmounted component; (2) if the dependency changes rapidly (e.g., user types in a search), multiple requests are in flight and the last to resolve wins (race condition).',
    },
  ],
  productionIssues: [
    '**Bug: Forgetting response.ok check** — fetch resolves for 404/500. Without checking response.ok, error responses are treated as success.',
    '**Race condition** — User changes a filter quickly; multiple requests in flight; last to resolve overwrites the result. Fix: AbortController cancels the previous request when the dependency changes.',
    '**Memory leak** — setState called after component unmounts. Fix: AbortController in useEffect cleanup.',
    '**For production apps** — Do not use raw fetch in components. Use React Query which handles all of these issues automatically.',
  ],
  bestPractices: [
    'Create a centralised fetch wrapper for auth headers, base URL, and error parsing',
    'Always check response.ok and throw on HTTP errors',
    'Use AbortController in useEffect cleanup for cancellation',
    'For production data fetching, use React Query instead of raw fetch',
    'Never fetch in the component body — always in useEffect or event handlers',
    'Use TypeScript generics: fetch<T>() for type-safe responses',
  ],
  architectNote: `Raw fetch in useEffect is fine for learning and simple cases. In production, use React Query (TanStack Query). It handles caching, background refetching, deduplication, loading/error states, cancellation, and stale-while-revalidate automatically. The custom fetch hook pattern shown here is what React Query does internally — but with much more sophistication. If you find yourself building a fetch cache, you are reinventing React Query.`,
  faqs: [
    {
      question: 'Should I use fetch or Axios?',
      answer: 'Both work well. fetch is built into the browser (no dependency). Axios has a cleaner API (throws on HTTP errors by default, automatic JSON parsing, request interceptors). For most projects, a thin fetch wrapper (like the apiFetch example above) gives you what you need without adding Axios. Use Axios if you need interceptors or need to support older environments.',
    },
  ],
  keyTakeaways: [
    'fetch only rejects on network failure — always check response.ok',
    'Use AbortController for cancellation in useEffect cleanup',
    'Create a centralised fetch wrapper for auth, base URL, and error handling',
    'For production, use React Query instead of raw fetch',
    'Never fetch in the component body — always in useEffect or event handlers',
  ],
  relatedTopics: ['react-axios', 'react-hooks-useeffect', 'react-custom-hooks'],
};
