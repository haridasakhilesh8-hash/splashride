import type { TopicContent } from '../../types';

export const reactErrorHandling: TopicContent = {
  slug: 'react-error-handling',
  title: 'Error Handling',
  description: 'Master error handling in React — from API errors to render errors. Learn Error Boundaries, async error patterns, and how to build resilient applications that fail gracefully.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'React has two categories of errors: render errors (component throws during rendering — caught by Error Boundaries) and async errors (API calls fail — caught with try/catch or .catch()). Error Boundaries are class components that catch render errors and show a fallback UI instead of crashing the entire app.',
  whatIsIt: `React error handling covers two scenarios:

**1. Render errors:**
A component throws during rendering. Without an Error Boundary, the entire app unmounts with a white screen. An Error Boundary catches the error and renders a fallback UI instead.

**2. Async errors:**
An API call fails, a Promise rejects, or a setTimeout throws. These are not caught by Error Boundaries. You handle them with try/catch in async functions or .catch() on Promises.

**Error Boundary:**
A class component that implements \`componentDidCatch\` and \`getDerivedStateFromError\`. React 19 will add a \`use()\` hook that simplifies this.`,
  whyWeNeedIt: `Without error handling:

- One failing component crashes the entire app (white screen)
- API errors are silently swallowed or show raw error objects to users
- Users have no way to recover from errors

With proper error handling:
- Isolated failures — a broken widget does not crash the page
- User-friendly error messages — "Something went wrong, please retry"
- Recovery paths — retry buttons, fallback content
- Error reporting — log errors to Sentry/Datadog for monitoring`,
  realWorldUsage: `In an insurance portal:

- Error Boundary around each dashboard widget — a broken chart does not crash the claims table
- Error Boundary at the route level — a broken page shows a friendly error with a "go back" button
- API error handling in each data-fetching hook — loading/error/data states
- Global error toast for unexpected server errors
- Sentry integration to capture and report errors in production`,
  howItWorks: `**Error Boundary lifecycle:**
1. A child component throws during render (or in a lifecycle method)
2. React looks up the tree for the nearest Error Boundary
3. Error Boundary\'s \`getDerivedStateFromError\` sets \`hasError: true\`
4. Error Boundary re-renders with the fallback UI
5. \`componentDidCatch\` receives the error for logging

**What Error Boundaries do NOT catch:**
- Errors in event handlers (use try/catch inside the handler)
- Errors in async code (useEffect, setTimeout, Promises)
- Errors in the Error Boundary itself`,
  example: {
    title: 'Error Handling Patterns in Production',
    description: 'Error Boundary component and async error handling patterns.',
    code: [
      {
        label: 'Reusable Error Boundary',
        language: 'tsx',
        code: `import { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to error monitoring service
    console.error('ErrorBoundary caught:', error, info);
    this.props.onError?.(error, info);
    // In production: Sentry.captureException(error, { extra: info });
  }

  handleReset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage — wrap at different levels for different granularity
function Dashboard() {
  return (
    <ErrorBoundary fallback={<p>Dashboard failed to load</p>}>
      <ErrorBoundary fallback={<p>Chart unavailable</p>}>
        <ClaimsChart />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Table unavailable</p>}>
        <ClaimsTable />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}`,
      },
      {
        label: 'Async Error Handling Pattern',
        language: 'tsx',
        code: `// Centralised error handler
function parseApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}

// Hook with complete error handling
function useClaimActions(claimId: string) {
  const { showToast } = useToast();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const approve = async () => {
    setActionLoading('approve');
    try {
      await claimsApi.updateStatus(claimId, 'approved');
      showToast('Claim approved successfully', 'success');
    } catch (error) {
      showToast(parseApiError(error), 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const reject = async (reason: string) => {
    setActionLoading('reject');
    try {
      await claimsApi.reject(claimId, reason);
      showToast('Claim rejected', 'info');
    } catch (error) {
      showToast(parseApiError(error), 'error');
    } finally {
      setActionLoading(null);
    }
  };

  return { approve, reject, actionLoading };
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my Error Boundary not catch async errors?',
      answer: 'Error Boundaries only catch errors that occur during React rendering (component function body, lifecycle methods). Async errors (in useEffect, event handlers, setTimeout, Promises) are not caught. Handle async errors with try/catch in the async function and set an error state to display the error in the UI.',
    },
    {
      question: 'Can I use a functional component as an Error Boundary?',
      answer: 'Not yet — Error Boundaries must be class components because they use componentDidCatch and getDerivedStateFromError, which have no hook equivalents in React 18. React 19 introduces a new error handling API. For now, use the react-error-boundary library which provides a functional wrapper.',
    },
  ],
  productionIssues: [
    '**No Error Boundaries** — One failing component crashes the entire app. Always add Error Boundaries at the route level and around independently failing widgets.',
    '**Generic error messages** — Showing raw error.message to users exposes internal details. Parse and humanise error messages before displaying.',
    '**Silent errors** — Catching errors without logging them makes debugging impossible. Always log to an error monitoring service (Sentry, Datadog) in production.',
    '**No recovery path** — Error UIs without a retry button or navigation option leave users stranded. Always provide a recovery action.',
  ],
  bestPractices: [
    'Add Error Boundaries at the route level and around independently failing widgets',
    'Log errors to a monitoring service (Sentry) in componentDidCatch',
    'Provide meaningful error messages and recovery actions (retry, go back)',
    'Centralise error parsing — one function that converts any error to a user-friendly string',
    'Use react-error-boundary library for a functional-component-friendly API',
    'Test error states explicitly — throw errors in tests to verify boundary behaviour',
  ],
  architectNote: `Error handling is a first-class concern in production React apps. The strategy: Error Boundaries at multiple levels (app, route, widget) for render errors; try/catch in every async operation; a centralised error parsing function for consistent messages; error monitoring (Sentry) for visibility. The goal is that any failure results in a graceful degradation — the user sees a helpful message and a way forward, never a white screen or a raw error object.`,
  faqs: [
    {
      question: 'What is react-error-boundary?',
      answer: 'react-error-boundary is a library that wraps the Error Boundary class component pattern in a functional API: <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>. It also provides useErrorBoundary() hook to imperatively trigger the boundary from async code. Recommended over writing your own Error Boundary class.',
    },
    {
      question: 'How do I integrate Sentry with React?',
      answer: 'Install @sentry/react. Wrap your app with Sentry.ErrorBoundary. Call Sentry.captureException(error) in componentDidCatch. Sentry automatically captures unhandled promise rejections and provides stack traces, user context, and breadcrumbs for debugging.',
    },
  ],
  keyTakeaways: [
    'Error Boundaries catch render errors — not async errors',
    'Add Error Boundaries at route level and around independently failing widgets',
    'Async errors require try/catch in the async function',
    'Always log errors to a monitoring service in production',
    'Provide recovery actions — retry, go back, refresh',
    'Centralise error message parsing for consistent user-facing messages',
  ],
  relatedTopics: ['react-fetch-api', 'react-axios', 'react-hooks-useeffect'],
};
