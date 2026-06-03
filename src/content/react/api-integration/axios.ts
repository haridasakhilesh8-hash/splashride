import type { TopicContent } from '../../types';

export const reactAxios: TopicContent = {
  slug: 'react-axios',
  title: 'Axios',
  description: 'Master Axios in React — the most popular HTTP client library. Learn instance configuration, interceptors, error handling, and the patterns senior engineers use in enterprise applications.',
  applicableVersions: ['React 16+', 'React 18', 'Axios 1.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Axios is an HTTP client library that improves on the Fetch API: it throws on HTTP errors automatically, parses JSON automatically, supports request/response interceptors, and has better TypeScript support. In enterprise apps, you create a configured Axios instance with base URL, auth headers, and interceptors, then use that instance everywhere.',
  whatIsIt: `Axios is a Promise-based HTTP client with a cleaner API than fetch:

\`\`\`ts
const { data } = await axios.get<User[]>('/users');
// data is already parsed JSON, typed as User[]
// throws automatically on 4xx/5xx responses
\`\`\`

**Key advantages over fetch:**
- **Throws on HTTP errors** — no manual \`response.ok\` check needed
- **Auto JSON parsing** — no \`response.json()\` call needed
- **Interceptors** — middleware for requests and responses (auth, error handling, logging)
- **Request cancellation** — CancelToken (or AbortController in Axios 1.x+)
- **Request/response transformation** — transform data before sending or after receiving
- **Better TypeScript** — generic types on all methods`,
  whyWeNeedIt: `In enterprise apps, every API call needs: auth headers, error parsing, request logging, token refresh on 401, and consistent error formatting. Implementing this with raw fetch requires wrapping every call. Axios interceptors let you implement this once for all calls.`,
  realWorldUsage: `In every enterprise React app:

- A configured Axios instance with base URL and default headers
- A request interceptor that adds the auth token
- A response interceptor that handles 401 (token refresh), 403 (redirect to forbidden page), and 500 (show error toast)
- TypeScript-typed API functions that use the instance`,
  howItWorks: `**Axios instance:**
Create a configured instance with \`axios.create()\`. All calls through the instance use the shared configuration.

**Interceptors:**
- Request interceptors run before every request (add auth header)
- Response interceptors run after every response (handle errors, refresh tokens)

**Error handling:**
Axios throws an AxiosError on HTTP errors. Check \`error.response.status\` for the HTTP status code and \`error.response.data\` for the error body.`,
  example: {
    title: 'Enterprise Axios Setup',
    description: 'Configured instance with auth interceptors and typed API functions.',
    code: [
      {
        label: 'Axios Instance with Interceptors',
        language: 'tsx',
        code: `import axios, { AxiosError } from 'axios';

// Create a configured instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — add auth token to every request
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token; // Zustand store
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Response interceptor — handle common errors globally
apiClient.interceptors.response.use(
  (response) => response, // pass through successful responses
  async (error: AxiosError<ApiError>) => {
    const status = error.response?.status;

    if (status === 401) {
      // Try to refresh the token
      try {
        await refreshToken();
        // Retry the original request
        return apiClient.request(error.config!);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    if (status === 403) {
      window.location.href = '/403';
    }

    if (status === 500) {
      useToastStore.getState().showToast('Server error. Please try again.', 'error');
    }

    return Promise.reject(error);
  }
);`,
      },
      {
        label: 'Typed API Functions',
        language: 'tsx',
        code: `// api/claims.ts — all API calls in one place
import { apiClient } from './apiClient';

export const claimsApi = {
  getAll: (userId: string) =>
    apiClient.get<Claim[]>(\`/users/\${userId}/claims\`).then(r => r.data),

  getById: (id: string) =>
    apiClient.get<Claim>(\`/claims/\${id}\`).then(r => r.data),

  create: (data: CreateClaimDto) =>
    apiClient.post<Claim>('/claims', data).then(r => r.data),

  updateStatus: (id: string, status: ClaimStatus) =>
    apiClient.patch<Claim>(\`/claims/\${id}/status\`, { status }).then(r => r.data),

  delete: (id: string) =>
    apiClient.delete(\`/claims/\${id}\`).then(r => r.data),

  uploadDocument: (id: string, file: File) => {
    const form = new FormData();
    form.append('document', file);
    return apiClient.post<Document>(\`/claims/\${id}/documents\`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data);
  },
};

// Usage in a component
const { data, loading, error } = useApi(() => claimsApi.getAll(userId), [userId]);`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does Axios throw on 404?',
      answer: 'Yes — unlike fetch. Axios throws an AxiosError for any response with a status outside 2xx. This means you do not need to manually check response.ok. Catch the error and check error.response?.status for the HTTP status code.',
    },
    {
      question: 'Should I use Axios or fetch in 2024?',
      answer: 'Both are valid. fetch is built-in (no dependency). Axios is better for enterprise apps that need interceptors, consistent error handling, and request transformation. If you are using React Query, the HTTP client matters less — React Query handles the state management layer. Use whichever your team prefers.',
    },
  ],
  productionIssues: [
    '**CORS errors** — Axios surfaces CORS errors as network errors (no response). Configure your API server to allow your frontend origin, or use a proxy in development.',
    '**Token refresh race condition** — Multiple requests fail with 401 simultaneously, each tries to refresh the token. Fix: queue failed requests while refreshing and retry them all after one successful refresh.',
    '**Large file uploads** — Uploading large files without progress tracking frustrates users. Use onUploadProgress in the Axios config for progress indicators.',
  ],
  bestPractices: [
    'Create one Axios instance per API (not per component)',
    'Handle auth, logging, and common errors in interceptors — not in each API call',
    'Co-locate API functions in feature-specific api/ files',
    'Use TypeScript generics for typed responses: axios.get<User[]>()',
    'Use React Query on top of Axios for caching and state management',
    'Test API functions by mocking the Axios instance with axios-mock-adapter',
  ],
  architectNote: `The Axios instance is the foundation of your API layer. Define it once, configure interceptors for cross-cutting concerns (auth, error handling, logging), and export typed API functions that use it. Components should never call apiClient directly — they call typed functions from the API layer. This separation makes it easy to mock in tests, swap the HTTP client, and add new cross-cutting concerns without touching component code.`,
  faqs: [
    {
      question: 'How do I cancel an Axios request?',
      answer: 'Axios 1.x supports AbortController (same as fetch): const controller = new AbortController(); axios.get(url, { signal: controller.signal }); controller.abort(). Use this in useEffect cleanup to cancel requests when the component unmounts or dependencies change.',
    },
  ],
  keyTakeaways: [
    'Axios throws on HTTP errors automatically — no manual response.ok check',
    'Create a configured instance with axios.create() — one per API',
    'Interceptors handle cross-cutting concerns: auth, error handling, logging',
    'Use typed API functions in feature-specific files — not raw axios calls in components',
    'Combine with React Query for caching and state management',
  ],
  relatedTopics: ['react-fetch-api', 'react-hooks-useeffect', 'react-custom-hooks'],
};
