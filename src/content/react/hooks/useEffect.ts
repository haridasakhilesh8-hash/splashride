import type { TopicContent } from '../../types';

export const reactUseEffect: TopicContent = {
  slug: 'react-hooks-useeffect',
  title: 'useEffect',
  description: 'Master useEffect — the hook for synchronising React components with the outside world. Learn the dependency array, cleanup functions, and how to avoid the most common production bugs.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'useEffect lets you run code after a component renders — for things that cannot happen during rendering: API calls, subscriptions, timers, DOM manipulation. The dependency array controls when it runs. The cleanup function prevents memory leaks when the component unmounts.',
  whatIsIt: `\`useEffect(fn, deps)\` runs \`fn\` after the component renders. It is React\'s escape hatch for synchronising with external systems.

**Three forms:**
- \`useEffect(fn)\` — runs after every render
- \`useEffect(fn, [])\` — runs once after the first render (mount)
- \`useEffect(fn, [dep1, dep2])\` — runs after renders where dep1 or dep2 changed

**Cleanup function:**
Return a function from the effect to clean up before the next run or on unmount:
\`\`\`ts
useEffect(() => {
  const sub = subscribe(channel);
  return () => sub.unsubscribe(); // cleanup
}, [channel]);
\`\`\``,
  whyWeNeedIt: `React rendering must be a pure function — no side effects during render. useEffect is the designated place for side effects:

- **Data fetching** — calling an API when a component mounts or a filter changes
- **Subscriptions** — WebSocket connections, event listeners, Observables
- **Timers** — setInterval, setTimeout
- **DOM manipulation** — measuring elements, integrating third-party libraries
- **Synchronising external state** — syncing React state to localStorage

Without useEffect, you would have no way to trigger these after rendering.`,
  realWorldUsage: `In a real SaaS dashboard:

- Fetch dashboard metrics when the selected date range changes
- Subscribe to a WebSocket for real-time notifications
- Sync filter state to URL query params
- Set document.title to the current page name
- Initialise a charting library (Chart.js, D3) on a canvas element
- Clean up event listeners when a modal closes`,
  howItWorks: `**Execution order:**

1. Component renders (JSX evaluated, DOM updated)
2. Browser paints the screen
3. useEffect runs
4. On next render: cleanup of previous effect runs, then new effect runs
5. On unmount: cleanup of last effect runs

**Dependency array rules:**
- React uses Object.is() to compare dependencies
- Objects and arrays are compared by reference, not value
- The ESLint rule \`react-hooks/exhaustive-deps\` catches missing dependencies — always follow it
- If a dependency changes every render (e.g., an inline object), the effect runs every render too`,
  example: {
    title: 'useEffect Patterns in Production',
    description: 'Data fetching, subscriptions, and cleanup patterns from real projects.',
    code: [
      {
        label: 'Data Fetching with Cleanup',
        language: 'tsx',
        code: `function useUserProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cancellation flag prevents setState on unmounted component
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchUserProfile(userId)
      .then((data) => {
        if (!cancelled) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [userId]); // re-fetches when userId changes

  return { profile, loading, error };
}`,
      },
      {
        label: 'WebSocket Subscription',
        language: 'tsx',
        code: `function useRealTimeNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const ws = new WebSocket(\`wss://api.example.com/notifications/\${userId}\`);

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data) as Notification;
      setNotifications(prev => [notification, ...prev].slice(0, 50)); // keep last 50
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup: close connection when component unmounts or userId changes
    return () => {
      ws.close();
    };
  }, [userId]);

  return notifications;
}`,
      },
      {
        label: 'Sync State to localStorage',
        language: 'tsx',
        code: `function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // localStorage may be unavailable (private mode, storage full)
    }
  }, [key, state]); // syncs whenever state changes

  return [state, setState] as const;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my useEffect run twice in development?',
      answer: 'React 18 Strict Mode intentionally mounts, unmounts, and remounts every component in development to help you find missing cleanup functions. This only happens in development — never in production. If your effect breaks on double-mount, your cleanup function is missing or incorrect.',
    },
    {
      question: 'What happens if I omit a dependency from the array?',
      answer: 'The effect captures a stale closure — it sees the value of the dependency from the render it was created in, not the current value. This causes subtle bugs where the effect uses outdated data. Always follow the exhaustive-deps ESLint rule. If adding a dependency causes an infinite loop, the real fix is restructuring the effect, not removing the dependency.',
    },
    {
      question: 'Should I use useEffect for data fetching?',
      answer: 'For simple cases, yes. For production apps, use React Query (TanStack Query) instead. It handles caching, background refetching, deduplication, loading/error states, and stale-while-revalidate automatically. Manual useEffect data fetching is error-prone and lacks these features.',
    },
  ],
  productionIssues: [
    '**Memory leak: setState on unmounted component** — An async operation completes after the component unmounts and calls setState. Fix: use a cancellation flag in the cleanup function.',
    '**Infinite loop: Object in dependency array** — useEffect(fn, [{ id: 1 }]) creates a new object every render, causing the effect to run every render. Fix: depend on primitives (id) not objects.',
    '**Bug: Missing cleanup for subscriptions** — Event listeners, WebSockets, and intervals that are not cleaned up on unmount cause memory leaks and ghost callbacks. Always return a cleanup function.',
    '**Bug: Race condition** — User changes a filter rapidly; multiple API calls are in flight; the last one to resolve wins, which may not be the most recent request. Fix: cancellation flag or AbortController.',
  ],
  bestPractices: [
    'Always return a cleanup function for subscriptions, timers, and event listeners',
    'Use a cancellation flag or AbortController for async operations',
    'Follow the exhaustive-deps ESLint rule — never suppress it without understanding why',
    'Depend on primitive values (id, string) not objects or arrays',
    'Extract complex effects into custom hooks for reusability and testability',
    'For data fetching in production, prefer React Query over manual useEffect',
    'Never fetch data in useEffect with an empty dependency array in components that receive dynamic IDs via props',
  ],
  architectNote: `useEffect is the most misused hook in React. The most common mistake is treating it like componentDidMount — a place to run code once. React 18 and Strict Mode make it clear: every effect must be resilient to running twice and must clean up after itself. If you find yourself fighting useEffect, the answer is usually a custom hook or React Query, not a more clever effect. In large codebases, raw useEffect for data fetching is a code smell — it should be encapsulated in a custom hook or replaced with a data fetching library.`,
  faqs: [
    {
      question: 'What is the difference between useEffect and useLayoutEffect?',
      answer: 'useEffect runs after the browser paints (non-blocking). useLayoutEffect runs synchronously after DOM updates but before the browser paints (blocking). Use useLayoutEffect only when you need to measure DOM elements or prevent visual flicker from a DOM mutation. For everything else, useEffect is correct and has better performance.',
    },
    {
      question: 'Can I use async/await directly in useEffect?',
      answer: 'No. useEffect\'s callback cannot be async because async functions return a Promise, but useEffect expects either undefined or a cleanup function. Fix: define an async function inside the effect and call it immediately. Or use .then() chains.',
    },
    {
      question: 'How do I run an effect only once?',
      answer: 'Pass an empty dependency array: useEffect(fn, []). This runs after the first render only. In React 18 Strict Mode (development only), it will run twice to verify cleanup. If your once-only effect breaks on double-run, add a cleanup function.',
    },
  ],
  keyTakeaways: [
    'useEffect runs after render — never during render',
    'The dependency array controls when the effect runs',
    'Always return a cleanup function for subscriptions, timers, and listeners',
    'React 18 Strict Mode runs effects twice in development — this is intentional',
    'Missing dependencies cause stale closure bugs — always follow exhaustive-deps',
    'Object/array dependencies cause infinite loops — depend on primitives',
    'For production data fetching, use React Query instead of raw useEffect',
  ],
  relatedTopics: ['react-hooks-usestate', 'react-hooks-usecallback', 'react-hooks-useref', 'react-custom-hooks'],
};
