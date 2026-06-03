import type { TopicContent } from '../../types';

export const reactState: TopicContent = {
  slug: 'react-state',
  title: 'State',
  description: 'Understand React state — the internal memory of a component that drives UI updates. Learn when to use local state, how to structure it, and the patterns senior engineers use to avoid the most common state bugs.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'State is a component\'s internal memory — data that can change over time and causes the UI to re-render when it does. When you call setState, React schedules a re-render and your component function runs again with the new value. State is the engine behind every interactive UI.',
  whatIsIt: `State is data that:

1. **Changes over time** — user interactions, API responses, timers
2. **Belongs to a specific component** — not shared globally by default
3. **Triggers a re-render** when updated — React re-runs your component function
4. **Persists between re-renders** — unlike regular variables which reset on every render

In function components, state is managed with the \`useState\` hook. For complex state logic, \`useReducer\` is used. State can be:
- **Local state** — owned by one component (form inputs, toggle open/closed, loading flags)
- **Lifted state** — moved to a parent so multiple children can share it
- **Global state** — managed outside React via Context, Zustand, or Redux`,
  whyWeNeedIt: `Without state, React components would be static HTML. State is what makes UIs interactive:

- A button that shows a loading spinner while an API call is in flight
- A form that tracks what the user is typing
- A modal that opens and closes
- A table that shows different data based on the selected filter
- A counter that increments on click

Every interactive element in your app is driven by state somewhere. The question is not whether to use state — it is where to put it and how to structure it.`,
  realWorldUsage: `In a real healthcare portal:

- **Form state** — patient registration form tracks name, DOB, insurance ID as the user types
- **UI state** — sidebar open/closed, modal visible, active tab
- **Server state** — patient records fetched from API (often managed by React Query)
- **Filter state** — selected date range, status filter, search term in a claims list
- **Optimistic state** — immediately show a status change while the API call is in flight

Most components only need 1–3 state variables. If a component has 10+ useState calls, it is doing too much and should be split.`,
  howItWorks: `**useState mechanics:**

1. \`const [count, setCount] = useState(0)\` — declares state with initial value 0
2. \`count\` is the current value — read it in JSX and logic
3. \`setCount(5)\` — schedules a re-render with count = 5
4. \`setCount(prev => prev + 1)\` — functional update, safe for async contexts
5. React batches multiple setState calls in event handlers (React 18: batches everywhere)

**State is a snapshot:**
Each render captures a snapshot of state. If you call setCount(count + 1) three times in a row, count is the same value in all three calls — you get count + 1, not count + 3. Use functional updates to avoid this.

**State initialisation:**
For expensive initial values, use lazy initialisation: \`useState(() => computeExpensiveValue())\` — the function runs only once.`,
  example: {
    title: 'State Patterns in Production',
    description: 'From simple toggles to async state with loading and error handling.',
    code: [
      {
        label: 'Async State Pattern',
        language: 'tsx',
        code: `interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useClaims(patientId: string) {
  const [state, setState] = useState<AsyncState<Claim[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    setState({ data: null, loading: true, error: null });

    fetchClaims(patientId)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message });
      });

    return () => { cancelled = true; }; // cleanup prevents setState on unmounted component
  }, [patientId]);

  return state;
}

export function ClaimsList({ patientId }: { patientId: string }) {
  const { data, loading, error } = useClaims(patientId);

  if (loading) return <Spinner />;
  if (error)   return <ErrorBanner message={error} />;
  if (!data?.length) return <EmptyState />;
  return <ul>{data.map(c => <ClaimRow key={c.id} claim={c} />)}</ul>;
}`,
      },
      {
        label: 'Form State with Validation',
        language: 'tsx',
        code: `interface LoginForm { email: string; password: string; }
interface FormErrors { email?: string; password?: string; }

export function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof LoginForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.email.includes('@')) errs.email = 'Valid email required';
    if (form.password.length < 8)  errs.password = 'Minimum 8 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Email" value={form.email} onChange={handleChange('email')} error={errors.email} />
      <Input label="Password" type="password" value={form.password} onChange={handleChange('password')} error={errors.password} />
      <Button label={submitting ? 'Signing in...' : 'Sign In'} loading={submitting} />
    </form>
  );
}`,
      },
      {
        label: 'Lifting State Up',
        language: 'tsx',
        code: `// When two siblings need to share state, lift it to their common parent
function FilterableTable() {
  // State lives here — shared by both children
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState<keyof Policy>('policyNumber');

  const filteredPolicies = useMemo(
    () => policies.filter(p =>
      p.policyNumber.includes(filter) ||
      p.holderName.toLowerCase().includes(filter.toLowerCase())
    ),
    [filter]
  );

  return (
    <div>
      {/* FilterBar receives state + setter */}
      <FilterBar value={filter} onChange={setFilter} />
      {/* SortableTable receives state + setter */}
      <SortableTable
        data={filteredPolicies}
        sortField={sortField}
        onSortChange={setSortField}
      />
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my state not update immediately after calling setState?',
      answer: 'setState is asynchronous — it schedules a re-render but does not immediately change the variable. If you log state right after setState, you see the old value. The new value is available in the next render. For logic that depends on the new value, use the functional update form: setState(prev => prev + 1).',
    },
    {
      question: 'Why do I lose state when a component unmounts?',
      answer: 'State is tied to a component\'s lifecycle. When a component unmounts, its state is destroyed. When it remounts, state starts fresh from the initial value. If you need to persist state across mounts (e.g., form data across navigation), store it in a parent component, URL params, or localStorage.',
    },
    {
      question: 'Should I put everything in state?',
      answer: 'No. Only put data in state if it needs to trigger a re-render when it changes. Derived values (computed from state) should be calculated inline or with useMemo — not stored as separate state. Refs (useRef) are for values that change but should not trigger re-renders.',
    },
  ],
  productionIssues: [
    '**Bug: Stale closure** — An event handler or useEffect captures the initial state value and never sees updates. Fix: use the functional update form setState(prev => prev + 1) or add the state variable to the useEffect dependency array.',
    '**Bug: Object state mutation** — setState({ ...form, name: value }) is correct. form.name = value is not — mutating state directly does not trigger a re-render and causes subtle bugs.',
    '**Bug: Race condition in async state** — Two API calls in flight; the slower one resolves last and overwrites the faster one\'s result. Fix: use a cancellation flag (let cancelled = false) in useEffect cleanup.',
    '**Performance: Too many useState calls** — 10+ individual state variables that always update together should be combined into a single object with useReducer for clarity and performance.',
  ],
  bestPractices: [
    'Group related state into objects — not 5 separate useState calls for one form',
    'Use functional updates setState(prev => ...) when new state depends on old state',
    'Initialise state with the correct type — never start with null if you can avoid it',
    'Lift state to the lowest common ancestor that needs it — not higher',
    'Derive values from state inline rather than creating redundant state variables',
    'Use useReducer for state with multiple sub-values or complex update logic',
    'Always handle loading, data, and error states for async operations',
  ],
  architectNote: `State management is where React architecture decisions get hard. The question is always: where does this state live?

The answer follows a hierarchy:
1. **Local state** — default choice, keep it in the component that owns it
2. **Lifted state** — when two siblings need to share it, move to their parent
3. **Context** — when many components across the tree need it (theme, auth user)
4. **Zustand/Redux** — when state is complex, shared widely, or needs devtools

The biggest mistake teams make is jumping straight to Redux for everything. Start local, lift when needed, reach for a library only when lifting becomes painful. Most apps need much less global state than developers assume.`,
  faqs: [
    {
      question: 'What is the difference between useState and useReducer?',
      answer: 'useState is for simple, independent state values. useReducer is for state with multiple sub-values that update together, complex update logic, or when the next state depends on the previous in non-trivial ways. useReducer also makes state transitions explicit and testable (pure reducer functions). For a form with 5 fields and validation, useReducer is often cleaner than 10 useState calls.',
    },
    {
      question: 'How do I share state between components?',
      answer: 'Three options: (1) Lift state to the common parent and pass down via props — simplest, works for nearby components. (2) React Context — for state needed across many components without prop drilling. (3) External store (Zustand, Redux) — for complex global state with many consumers. Start with option 1, escalate only when needed.',
    },
    {
      question: 'What is server state vs client state?',
      answer: 'Client state is UI state you own (modal open, selected tab, form input). Server state is data fetched from an API that lives on the server (user profile, product list). Server state has different concerns: caching, background refetching, stale data. React Query (TanStack Query) is purpose-built for server state and removes the need for manual loading/error/data state patterns.',
    },
  ],
  keyTakeaways: [
    'State is a component\'s internal memory — it persists between renders and triggers re-renders when changed',
    'setState is asynchronous — the new value is available on the next render, not immediately',
    'Use functional updates setState(prev => ...) when new state depends on old state',
    'Never mutate state directly — always create a new object/array',
    'Lift state to the lowest common ancestor that needs it',
    'Derive values from state rather than creating redundant state variables',
    'Group related state; use useReducer for complex update logic',
  ],
  relatedTopics: ['react-hooks-usestate', 'react-hooks-usereducer', 'react-context', 'react-props'],
};
