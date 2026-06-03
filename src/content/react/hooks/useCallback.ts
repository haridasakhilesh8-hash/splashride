import type { TopicContent } from '../../types';

export const reactUseCallback: TopicContent = {
  slug: 'react-hooks-usecallback',
  title: 'useCallback',
  description: 'Master useCallback — the hook for stabilising function references between renders. Learn when it genuinely helps performance and when it is unnecessary overhead.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'useCallback returns a memoised function reference that only changes when its dependencies change. Without it, every render creates a new function reference, which causes memoised child components (React.memo) to re-render unnecessarily. Use it when passing callbacks to optimised children or as useEffect dependencies.',
  whatIsIt: `\`useCallback(fn, deps)\` returns a memoised version of \`fn\`. The function is only recreated when a dependency in \`deps\` changes.

\`\`\`ts
const handleSubmit = useCallback(async (data: FormData) => {
  await submitForm(data);
  onSuccess();
}, [onSuccess]); // only recreated when onSuccess changes
\`\`\`

useCallback is equivalent to \`useMemo(() => fn, deps)\`. It is just a more readable shorthand for memoising functions specifically.

**When it matters:**
- Passing a callback to a \`React.memo\` wrapped child
- Passing a function as a \`useEffect\` dependency
- Passing a callback to a custom hook that uses it as a dependency`,
  whyWeNeedIt: `In JavaScript, every function definition creates a new reference:

\`\`\`ts
const fn1 = () => {};
const fn2 = () => {};
console.log(fn1 === fn2); // false — different references
\`\`\`

Every time a parent component re-renders, every inline function is recreated as a new reference. If you pass that function to a child wrapped in React.memo, the child re-renders anyway — because the prop reference changed, even though the function does the same thing.

useCallback stabilises the reference so memoised children can actually skip re-renders.`,
  realWorldUsage: `In a large data table component:

- Memoised row components receive onRowClick, onRowExpand, onRowDelete callbacks
- Without useCallback: all rows re-render whenever the parent re-renders (even for unrelated state changes)
- With useCallback: row re-renders only when the specific callback logic changes

In a search component:
- A debounced search function passed to a memoised input component
- The function should not change on every render or the debounce resets`,
  howItWorks: `React stores the function reference in its hook memory. On each render, it compares the dependencies using Object.is(). If all dependencies are unchanged, it returns the same function reference from the previous render. If any dependency changed, it stores the new function.

**Important:** The function body still has access to the latest values via closure. The memoised reference just prevents unnecessary re-renders downstream.`,
  example: {
    title: 'useCallback in Production',
    description: 'Stable callbacks for memoised children and effect dependencies.',
    code: [
      {
        label: 'Stable Callbacks for Memoised Children',
        language: 'tsx',
        code: `interface DataTableProps {
  data: Policy[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
}

// Memoised row — only re-renders when its own props change
const PolicyRow = React.memo(({ policy, onEdit, onDelete }: PolicyRowProps) => (
  <tr>
    <td>{policy.policyNumber}</td>
    <td>{policy.holderName}</td>
    <td>
      <button onClick={() => onEdit(policy.id)}>Edit</button>
      <button onClick={() => onDelete(policy.id)}>Delete</button>
    </td>
  </tr>
));

function PolicyTable({ policies, onRefresh }: { policies: Policy[]; onRefresh: () => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Without useCallback: new function on every render — all PolicyRows re-render
  // With useCallback: same reference when policies haven't changed
  const handleEdit = useCallback((id: string) => {
    setSelectedId(id);
  }, []); // no dependencies — setSelectedId is stable

  const handleDelete = useCallback(async (id: string) => {
    setLoading(true);
    await deletePolicy(id);
    onRefresh();
    setLoading(false);
  }, [onRefresh]); // depends on onRefresh

  return (
    <table>
      {policies.map(p => (
        <PolicyRow key={p.id} policy={p} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </table>
  );
}`,
      },
      {
        label: 'Stable Function as useEffect Dependency',
        language: 'tsx',
        code: `function usePolling(fetchFn: () => Promise<void>, intervalMs: number) {
  useEffect(() => {
    // fetchFn is a dependency — if it changes every render, this effect re-runs every render
    fetchFn(); // initial fetch
    const id = setInterval(fetchFn, intervalMs);
    return () => clearInterval(id);
  }, [fetchFn, intervalMs]);
}

function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  // Without useCallback: new function every render — polling resets every render
  // With useCallback: stable reference — polling only resets when metrics setter changes
  const fetchMetrics = useCallback(async () => {
    const data = await getMetrics();
    setMetrics(data);
  }, []); // setMetrics is stable — no dependencies needed

  usePolling(fetchMetrics, 30_000);

  return <MetricsDisplay metrics={metrics} />;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I wrap every function in useCallback?',
      answer: 'No. useCallback has overhead — the comparison and cache. If the child is not memoised with React.memo, useCallback provides zero benefit. Only use it when: (1) passing to a React.memo child, (2) using as a useEffect dependency, (3) passing to a custom hook that uses it as a dependency.',
    },
    {
      question: 'What is the difference between useCallback and useMemo?',
      answer: 'useCallback memoises a function reference. useMemo memoises a computed value. useCallback(fn, deps) is exactly equivalent to useMemo(() => fn, deps). They are the same mechanism — useCallback is just a more readable shorthand for the function case.',
    },
    {
      question: 'Does useCallback make the function faster?',
      answer: 'No. useCallback does not make the function run faster. It only stabilises the reference to prevent unnecessary re-renders of children. The function itself executes at the same speed.',
    },
  ],
  productionIssues: [
    '**Over-optimisation** — Wrapping every function in useCallback adds boilerplate and comparison overhead with no benefit if the children are not memoised. Profile first.',
    '**Stale closure** — If a dependency is missing from the array, the callback captures a stale value. Always follow exhaustive-deps.',
    '**Infinite loop with useEffect** — A function created inside a component (without useCallback) used as a useEffect dependency causes the effect to re-run every render. Fix: useCallback or move the function outside the component.',
  ],
  bestPractices: [
    'Only use useCallback when passing to React.memo children or as useEffect dependencies',
    'Follow exhaustive-deps — include all values from the component scope used inside the function',
    'Stable setter functions from useState (setX) do not need to be in dependencies — React guarantees they are stable',
    'If a callback has no dependencies, the empty array [] means it is created once',
    'Combine with React.memo for the complete performance optimisation pattern',
  ],
  architectNote: `useCallback is one of the most over-used hooks in React codebases. Developers see it as a best practice and wrap every function, creating a forest of useCallback calls that add complexity without measurable benefit. The real pattern: build the feature first without optimisation, profile with React DevTools Profiler, then apply React.memo + useCallback only to the components that are actually slow. In most apps, only a handful of components need this treatment.`,
  faqs: [
    {
      question: 'Do I need useCallback for event handlers in JSX?',
      answer: 'Only if the component receiving the handler is wrapped in React.memo. For regular (non-memoised) children, a new function reference every render is fine — the child re-renders anyway. Adding useCallback to every onClick handler is unnecessary overhead.',
    },
    {
      question: 'Are useState setter functions stable?',
      answer: 'Yes. React guarantees that setter functions from useState (setCount, setUser, etc.) have a stable identity across renders. You do not need to include them in useCallback or useEffect dependency arrays.',
    },
  ],
  keyTakeaways: [
    'useCallback memoises a function reference — not the function execution speed',
    'Use it when passing callbacks to React.memo children or as useEffect dependencies',
    'Do not use it by default on every function — it adds overhead without benefit',
    'useState setters are stable by default — no need to include in dependencies',
    'Always follow exhaustive-deps to avoid stale closures',
    'Pair with React.memo for the complete re-render prevention pattern',
  ],
  relatedTopics: ['react-hooks-usememo', 'react-memo', 'react-hooks-useeffect', 'react-performance'],
};
