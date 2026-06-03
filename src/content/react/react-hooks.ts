import type { TopicContent } from '../types';

export const reactHooks: TopicContent = {
  slug: 'react-hooks',
  title: 'React Hooks',
  description: 'Master React Hooks — the feature that transformed how we write React. Learn useState, useEffect, useCallback, useMemo, useRef, and when to use each one.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Hooks are functions that let you "hook into" React features from function components. Before hooks, you needed class components for state and lifecycle. Now, a simple function can do everything. The two most important hooks are useState (for data that changes) and useEffect (for side effects like API calls).',
  whatIsIt: `Hooks are special functions provided by React (and the community) that:

- **useState** — adds local state to a function component
- **useEffect** — runs side effects (API calls, subscriptions, DOM manipulation)
- **useCallback** — memoizes a function reference
- **useMemo** — memoizes a computed value
- **useRef** — holds a mutable value that doesn't trigger re-renders
- **useContext** — reads from a Context
- **useReducer** — manages complex state with a reducer function
- **useId** — generates stable unique IDs

**Rules of Hooks (non-negotiable):**
1. Only call hooks at the top level — never inside loops, conditions, or nested functions
2. Only call hooks from React function components or custom hooks`,
  whyWeNeedIt: `Before hooks (pre-2019), the React world was split:

- **Function components** — simple, but couldn't have state or lifecycle
- **Class components** — powerful, but verbose, confusing \`this\`, and hard to share logic

Hooks unified everything:
- Functions can now have state, lifecycle, context, refs
- Logic can be extracted into **custom hooks** and shared across components
- Code is significantly more readable and testable
- No more confusion about \`this\`, binding, and class inheritance`,
  realWorldUsage: `**In a real project, you use hooks constantly:**

- Every form input uses \`useState\`
- Every API call uses \`useEffect\` (or a library built on it like React Query)
- Every memoized callback in a large list uses \`useCallback\`
- Every DOM reference (focus, scroll, canvas) uses \`useRef\`
- Every shared piece of stateful logic becomes a custom hook

**Custom hooks are the real power:**
Instead of copy-pasting logic across 10 components, you write \`useWindowSize()\`, \`useFetch()\`, \`useDebounce()\`, \`useLocalStorage()\` — and reuse them everywhere.`,
  howItWorks: `**useState:**
Returns a value and a setter. When the setter is called, React schedules a re-render with the new value.

**useEffect:**
Runs after every render by default. With a dependency array, runs only when those values change. With an empty array \`[]\`, runs once after mount. Returns a cleanup function for subscriptions/timers.

**useCallback / useMemo:**
React normally creates new function/object references on every render. These hooks return the same reference as long as dependencies haven't changed — important when passing callbacks to memoized children.

**useRef:**
Returns a mutable object \`{ current: value }\`. Changing \`ref.current\` does NOT trigger a re-render. Two uses: (1) hold a DOM reference, (2) hold any mutable value that shouldn't cause re-renders (like a timer ID).`,
  example: {
    title: 'Hooks in Real-World Scenarios',
    description: 'Production patterns for the most commonly used React hooks.',
    code: [
      {
        label: 'useState — Form Handling',
        language: 'tsx',
        code: `import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

export function LoginForm({ onSubmit }: { onSubmit: (data: LoginForm) => void }) {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Single handler for all fields — scales to any number of inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof LoginForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<LoginForm> = {};
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';
    if (form.password.length < 8) newErrors.password = 'Min 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={form.email} onChange={handleChange} />
      {errors.email && <span className="error">{errors.email}</span>}
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      {errors.password && <span className="error">{errors.password}</span>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}`,
      },
      {
        label: 'useEffect — Data Fetching',
        language: 'tsx',
        code: `import { useState, useEffect } from 'react';

interface User { id: number; name: string; email: string; }

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController prevents state updates after unmount
    const controller = new AbortController();

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Cleanup: abort the fetch if userId changes or component unmounts
    return () => controller.abort();
  }, [userId]); // Re-run whenever userId changes

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return <div>{user.name}</div>;
}`,
      },
      {
        label: 'Custom Hook — useDebounce',
        language: 'tsx',
        code: `import { useState, useEffect } from 'react';

// Custom hook — reusable debounce logic
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // cleanup on each change
  }, [value, delay]);

  return debouncedValue;
}

// Custom hook — search with debounce
function useSearch(endpoint: string) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    fetch(\`\${endpoint}?q=\${encodeURIComponent(debouncedQuery)}\`)
      .then(r => r.json())
      .then(setResults);
  }, [debouncedQuery, endpoint]);

  return { query, setQuery, results };
}

// Usage — all the logic is in the hook, component stays clean
function SearchBox() {
  const { query, setQuery, results } = useSearch('/api/search');

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((r: any) => <li key={r.id}>{r.title}</li>)}
      </ul>
    </div>
  );
}`,
      },
      {
        label: 'useCallback & useMemo',
        language: 'tsx',
        code: `import { useState, useCallback, useMemo } from 'react';

interface Product { id: number; name: string; price: number; category: string; }

function ProductList({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  // useMemo: expensive computation only re-runs when products/filter/sortBy change
  // Without this, it re-runs on EVERY render (even unrelated state changes)
  const filteredAndSorted = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => sortBy === 'price' ? a.price - b.price : a.name.localeCompare(b.name));
  }, [products, filter, sortBy]);

  // useCallback: stable function reference — important when passed to memo'd children
  // Without this, child components re-render every time ProductList renders
  const handleAddToCart = useCallback((productId: number) => {
    console.log('Adding to cart:', productId);
    // cart logic here
  }, []); // empty deps = stable reference forever

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Filter..." />
      <select value={sortBy} onChange={e => setSortBy(e.target.value as 'name' | 'price')}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
      <p>{filteredAndSorted.length} products</p>
      {filteredAndSorted.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my useEffect run twice in development?',
      answer: 'In React 18 Strict Mode (development only), effects intentionally run twice to help you find bugs in cleanup functions. This doesn\'t happen in production. If your effect breaks when run twice, you\'re missing a cleanup function. Fix the cleanup, don\'t disable Strict Mode.',
    },
    {
      question: 'When should I use useCallback vs useMemo?',
      answer: 'useCallback memoizes a function. useMemo memoizes a value. Use useCallback when passing a function to a memoized child component (React.memo). Use useMemo when you have an expensive calculation. Don\'t use either by default — they add complexity. Profile first.',
    },
    {
      question: 'What is the stale closure problem?',
      answer: 'A closure captures variables at the time it\'s created. If a useEffect callback captures state/props, it might use outdated values. Fix: add the value to the dependency array, or use the functional updater form: setState(prev => prev + 1).',
    },
    {
      question: 'Can I call hooks conditionally?',
      answer: 'No — this is a hard rule. React relies on hooks being called in the same order on every render. If you call them conditionally, the order can change, breaking React\'s internal state tracking. Instead, put the condition inside the hook.',
    },
  ],
  productionIssues: [
    'useEffect with missing dependencies — ESLint\'s exhaustive-deps rule catches this. Always include all variables used inside the effect in the dependency array.',
    'Infinite loop — useEffect depends on an object/array that gets recreated on every render. Move the object outside the component or memoize it with useMemo.',
    'setState on unmounted component — async operation completes after unmount. Use AbortController for fetch, or a mounted ref flag as cleanup.',
    'useRef not triggering re-renders — intentional. If you need the UI to update when a ref changes, use useState instead.',
    'Expensive useMemo not helping — the dependency array changes on every render (usually an object/function reference). Stabilize the dependencies first.',
  ],
  bestPractices: [
    'Extract complex hook logic into custom hooks — if useEffect is more than 10 lines, it probably belongs in a custom hook.',
    'Always handle loading, error, and empty states in data-fetching effects.',
    'Use React Query or SWR for server state — they handle caching, refetching, and loading states better than raw useEffect.',
    'The dependency array is a contract — if you find yourself wanting to lie to it (omit deps), your design is wrong.',
    'Name custom hooks with the "use" prefix — it\'s a convention that enables lint rules and signals intent.',
  ],
  architectNote: `Hooks changed React architecture fundamentally. The key insight: **hooks are the new mixins, but done right**.

In large applications, you'll build a library of custom hooks:
- \`useAuth()\` — current user, login, logout
- \`usePermissions(action)\` — can this user do this?
- \`useApi(endpoint)\` — data fetching with caching
- \`useLocalStorage(key, default)\` — persistent state
- \`useEventListener(event, handler)\` — DOM events

**The architectural principle:** Business logic in hooks, rendering in components. A component that uses \`useOrderManagement()\` is much more maintainable than one with 200 lines of inline logic.

**React 19 note:** React Compiler (auto-memoization) is landing in React 19, which will make \`useCallback\` and \`useMemo\` largely unnecessary. Write clean code now; the compiler will optimize it.`,
  faqs: [
    {
      question: 'Should I use useReducer or useState for complex state?',
      answer: 'Use useReducer when: (1) next state depends on previous state in complex ways, (2) you have multiple sub-values that change together, (3) you want to test state transitions in isolation. For simple values, useState is fine. For form state with many fields, consider a form library (React Hook Form).',
    },
    {
      question: 'What is useLayoutEffect and when do I need it?',
      answer: 'useLayoutEffect runs synchronously after DOM mutations but before the browser paints. Use it only when you need to read DOM layout (element size/position) and synchronously update state to avoid a visual flicker. For everything else, useEffect is correct.',
    },
    {
      question: 'Can I share state between components using hooks?',
      answer: 'Not directly — hooks are instance-level (each component gets its own state). To share state, lift it to a common parent, use Context, or use an external store (Zustand, Redux). Custom hooks sharing logic is different from sharing state.',
    },
  ],
  keyTakeaways: [
    'useState for data that changes; useEffect for side effects',
    'Rules: only call hooks at top level, only from React functions',
    'Custom hooks are the primary code-sharing mechanism in React',
    'useCallback/useMemo are optimizations — don\'t use them by default',
    'useRef for DOM access or mutable values that don\'t need re-renders',
    'React Query / SWR > raw useEffect for server data fetching',
  ],
  relatedTopics: ['react-components', 'react-state', 'react-context', 'react-props'],
};
