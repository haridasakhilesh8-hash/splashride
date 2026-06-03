import type { TopicContent } from '../../types';

export const reactCustomHooks: TopicContent = {
  slug: 'react-custom-hooks',
  title: 'Custom Hooks',
  description: 'Master custom hooks — the most powerful pattern in React for sharing stateful logic between components. Learn how to extract, compose, and test custom hooks the way senior engineers do in enterprise applications.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A custom hook is a JavaScript function that starts with "use" and calls other hooks inside it. It is the primary way to share stateful logic between components without changing the component tree. Custom hooks are how senior engineers eliminate duplicate useEffect/useState patterns across a codebase.',
  whatIsIt: `A custom hook is a function that:

1. **Starts with \`use\`** — this naming convention lets React and ESLint enforce the Rules of Hooks
2. **Calls other hooks** — useState, useEffect, useCallback, or other custom hooks
3. **Returns values** — state, derived data, handler functions, or any combination
4. **Has no JSX** — custom hooks are pure logic, no rendering

Every time you call a custom hook in a component, it gets its own isolated state. Hooks share logic, not state.`,
  whyWeNeedIt: `Before custom hooks, sharing stateful logic between components required awkward patterns: Higher Order Components (HOC) or Render Props — both added wrapper components and made the component tree harder to read.

Custom hooks solve this cleanly:
- **No wrapper components** — logic is extracted, not the component structure
- **Composable** — hooks can call other hooks
- **Testable** — test the hook in isolation with renderHook
- **Readable** — \`const { data, loading } = useUserProfile(userId)\` is self-documenting`,
  realWorldUsage: `In a large enterprise app, custom hooks are everywhere:

- \`useAuth()\` — returns current user, isLoggedIn, login(), logout()
- \`useApi<T>(url)\` — generic data fetching with loading/error/data states
- \`useDebounce(value, delay)\` — debounces a rapidly-changing value (search input)
- \`useLocalStorage(key, initial)\` — persisted state that survives page refresh
- \`usePermissions()\` — returns what the current user can and cannot do
- \`useForm(schema)\` — form state, validation, and submission handling
- \`usePagination(total, pageSize)\` — page number, navigation functions`,
  howItWorks: `Custom hooks are regular JavaScript functions — React gives them no special treatment beyond the naming convention. When you call \`useAuth()\` in a component, React runs the function and all the hooks inside it are associated with that component instance.

**Each call gets its own state:**
If ComponentA and ComponentB both call \`useCounter()\`, they each get completely independent counter state. The hook shares logic, not state.

**Composition:**
Custom hooks can call other custom hooks. \`useUserProfile(id)\` might call \`useApi(url)\` internally. This creates a clean abstraction hierarchy.`,
  example: {
    title: 'Custom Hooks from Real Enterprise Projects',
    description: 'A generic API hook, a debounce hook, and a permissions hook.',
    code: [
      {
        label: 'Generic API Hook',
        language: 'tsx',
        code: `interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json() as Promise<T>;
      })
      .then(data => { if (!cancelled) { setData(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [url, trigger]);

  const refetch = useCallback(() => setTrigger(t => t + 1), []);

  return { data, loading, error, refetch };
}

// Usage — no boilerplate in the component
function PolicyList({ userId }: { userId: string }) {
  const { data: policies, loading, error, refetch } = useApi<Policy[]>(\`/api/users/\${userId}/policies\`);
  if (loading) return <Spinner />;
  if (error)   return <ErrorBanner message={error} onRetry={refetch} />;
  return <ul>{policies!.map(p => <PolicyRow key={p.id} policy={p} />)}</ul>;
}`,
      },
      {
        label: 'useDebounce — Search Input',
        language: 'tsx',
        code: `function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cancel if value changes before delay
  }, [value, delay]);

  return debounced;
}

function PolicySearch() {
  const [input, setInput] = useState('');
  const debouncedQuery = useDebounce(input, 400); // only searches after 400ms pause

  const { data } = useApi<Policy[]>(
    debouncedQuery ? \`/api/policies?q=\${debouncedQuery}\` : '/api/policies'
  );

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search policies..."
      />
      <PolicyList policies={data ?? []} />
    </div>
  );
}`,
      },
      {
        label: 'usePermissions — Role-Based Access',
        language: 'tsx',
        code: `type Permission = 'view:claims' | 'edit:claims' | 'approve:claims' | 'manage:users';

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin:    ['view:claims', 'edit:claims', 'approve:claims', 'manage:users'],
  adjuster: ['view:claims', 'edit:claims'],
  viewer:   ['view:claims'],
};

function usePermissions() {
  const { user } = useAuth(); // calls another custom hook

  const can = useCallback((permission: Permission): boolean => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
  }, [user]);

  const canAny = useCallback((...permissions: Permission[]): boolean =>
    permissions.some(p => can(p)), [can]);

  return { can, canAny };
}

// Usage — clean, readable, no logic in JSX
function ClaimActions({ claim }: { claim: Claim }) {
  const { can } = usePermissions();
  return (
    <div>
      {can('edit:claims')    && <EditButton claim={claim} />}
      {can('approve:claims') && <ApproveButton claim={claim} />}
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do custom hooks share state between components?',
      answer: 'No. Each component that calls a custom hook gets its own isolated state. If ComponentA and ComponentB both call useCounter(), they have completely independent counters. To share state, the hook must read from a shared source: Context, Zustand store, or a module-level variable.',
    },
    {
      question: 'Does a custom hook have to start with "use"?',
      answer: 'Technically no, but you must name it starting with "use" for React\'s ESLint plugin to enforce the Rules of Hooks inside it. If you name it getUser() instead of useUser(), the linter won\'t warn you if you call it conditionally — which can cause subtle bugs. Always prefix with "use".',
    },
    {
      question: 'Can a custom hook return JSX?',
      answer: 'Technically yes, but it is a bad practice. Hooks should return data and functions, not UI. If you need to return UI, create a component. Mixing hooks and JSX blurs the line between logic and presentation, making code harder to test and maintain.',
    },
  ],
  productionIssues: [
    '**Over-abstraction** — Extracting every 3-line useEffect into a custom hook creates an indirection maze. Extract when the pattern repeats 2+ times or when the hook provides a meaningful abstraction.',
    '**Missing cleanup** — Custom hooks that set up subscriptions or timers must return cleanup via useEffect. Forgetting cleanup causes memory leaks in every component that uses the hook.',
    '**Returning unstable references** — A hook that returns a new object or array on every call will cause re-renders in every consumer. Memoize return values with useMemo/useCallback when needed.',
    '**Testing gaps** — Custom hooks that are not tested independently are hard to debug. Use @testing-library/react\'s renderHook to test hooks in isolation.',
  ],
  bestPractices: [
    'Name hooks clearly: useUserProfile, not useData or useHelper',
    'Return objects (not arrays) from hooks with multiple values — named properties are self-documenting',
    'Memoize returned functions with useCallback to prevent re-renders in consumers',
    'Test custom hooks with @testing-library/react renderHook',
    'Co-locate hooks with the feature they serve — not in a global hooks/ folder',
    'Document what the hook returns with TypeScript interfaces',
    'Extract when a pattern repeats 2+ times, not preemptively',
  ],
  architectNote: `Custom hooks are the most powerful tool in the React architecture toolkit. They are how you build a domain-specific API on top of React primitives. In a well-architected app, components should read almost like plain English: \`const { user } = useAuth()\`, \`const { policies } = usePolicies(userId)\`, \`const { can } = usePermissions()\`. The business logic lives in hooks; components are just the rendering layer. This separation makes components easy to read, hooks easy to test, and logic easy to reuse.`,
  faqs: [
    {
      question: 'What is the difference between a custom hook and a utility function?',
      answer: 'A utility function is a pure function — no hooks, no state, no side effects. A custom hook calls other hooks and can have state and effects. If your function does not call any hooks, it should be a utility function (no "use" prefix). If it calls hooks, it must be a custom hook.',
    },
    {
      question: 'Can custom hooks call other custom hooks?',
      answer: 'Yes — and this is one of their greatest strengths. useUserProfile might call useApi internally. usePermissions might call useAuth. This creates a clean composition hierarchy where each hook has a single responsibility.',
    },
    {
      question: 'Should I put all custom hooks in a hooks/ folder?',
      answer: 'For hooks shared across many features, yes. For hooks specific to one feature, co-locate them with the feature. A hooks/useDebounce.ts makes sense. A hooks/useClaimApproval.ts probably belongs in features/claims/useClaimApproval.ts.',
    },
  ],
  keyTakeaways: [
    'Custom hooks are functions starting with "use" that call other hooks',
    'They share logic, not state — each component gets its own isolated state',
    'The primary tool for eliminating duplicated useEffect/useState patterns',
    'Return objects with named properties for self-documenting APIs',
    'Memoize returned functions with useCallback to prevent consumer re-renders',
    'Test with renderHook from @testing-library/react',
    'Extract when a pattern repeats 2+ times, not preemptively',
  ],
  relatedTopics: ['react-hooks-usestate', 'react-hooks-useeffect', 'react-context', 'react-hoc'],
};
