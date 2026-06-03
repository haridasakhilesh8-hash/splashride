import type { TopicContent } from '../../types';

export const reactUseMemo: TopicContent = {
  slug: 'react-hooks-usememo',
  title: 'useMemo',
  description: 'Understand useMemo — React\'s hook for memoising expensive computed values. Learn when it actually helps performance, when it hurts, and the patterns senior engineers use in real applications.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'useMemo caches the result of an expensive calculation between renders. It only recomputes when its dependencies change. Use it when a computation is genuinely expensive (filtering/sorting large lists, complex maths) and you can measure the performance benefit. Do not use it by default on every computed value.',
  whatIsIt: `\`useMemo(fn, deps)\` memoises the return value of \`fn\`. React calls \`fn\` on the first render, stores the result, and returns the stored result on subsequent renders — unless a dependency in \`deps\` has changed.

\`\`\`ts
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items] // recomputes only when items changes
);
\`\`\`

useMemo is a **performance optimisation**. It adds overhead (the comparison + cache). If the computation is cheap (a few array operations on small data), useMemo makes things slower, not faster.`,
  whyWeNeedIt: `Every time a component re-renders, all the code in the function body runs again. For most code, this is fine — it is fast. But for genuinely expensive operations:

- Filtering 10,000 records by multiple criteria
- Sorting a large dataset
- Transforming complex nested data structures
- Calculating derived analytics from raw data

...running these on every render wastes CPU. useMemo ensures they only run when their inputs change.`,
  realWorldUsage: `In a financial reporting dashboard:

- Memoising a filtered + sorted list of 5,000 transactions based on date range and status filters
- Computing running totals and aggregates from raw transaction data
- Transforming API response data into chart-ready format
- Deriving permission sets from a user\'s role object

In a code editor:
- Parsing and syntax-highlighting large code blocks
- Computing diff between two large strings`,
  howItWorks: `**Comparison:**
React uses Object.is() to compare each dependency. If all dependencies are the same as the previous render, the cached value is returned. If any dependency changed, the function runs again and the new result is cached.

**Memory:**
useMemo stores the last computed value. It does not cache multiple values — only the most recent.

**React 19 Compiler:**
The React Compiler (React 19+) automatically applies memoisation where it is safe. In the future, manual useMemo may become less necessary. But for React 18 and below, manual memoisation is still required.`,
  example: {
    title: 'useMemo in Real Applications',
    description: 'Expensive filtering, data transformation, and reference stability.',
    code: [
      {
        label: 'Filtering and Sorting Large Lists',
        language: 'tsx',
        code: `interface Transaction {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  merchant: string;
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  // Without useMemo: runs on every render, including unrelated state changes
  // With useMemo: only runs when transactions, search, statusFilter, or sortBy changes
  const filtered = useMemo(() => {
    let result = transactions;

    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.merchant.toLowerCase().includes(q) ||
        t.id.includes(q)
      );
    }

    return [...result].sort((a, b) =>
      sortBy === 'date'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : b.amount - a.amount
    );
  }, [transactions, search, statusFilter, sortBy]);

  return <>{filtered.map(t => <TransactionRow key={t.id} transaction={t} />)}</>;
}`,
      },
      {
        label: 'Stable Reference for Child Props',
        language: 'tsx',
        code: `// useMemo to prevent unnecessary re-renders of memoised children
function Dashboard({ userId }: { userId: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Without useMemo: new object created every render — ChartConfig re-renders on theme change
  // With useMemo: same object reference when userId hasn't changed
  const chartConfig = useMemo(() => ({
    userId,
    endpoint: \`/api/charts/\${userId}\`,
    refreshInterval: 30_000,
  }), [userId]);

  return (
    <div className={\`dashboard dashboard--\${theme}\`}>
      <ThemeToggle onToggle={setTheme} />
      <MemoizedChart config={chartConfig} /> {/* only re-renders when userId changes */}
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I wrap every computed value in useMemo?',
      answer: 'No. useMemo has overhead — the dependency comparison and cache management. For simple calculations (a few operations on small arrays, string concatenation, basic maths), useMemo makes things slower. Use it only when you can measure a real performance problem with the React DevTools Profiler.',
    },
    {
      question: 'What is the difference between useMemo and useCallback?',
      answer: 'useMemo memoises a computed value (the return value of a function). useCallback memoises a function reference itself. useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Use useMemo for values, useCallback for functions.',
    },
    {
      question: 'Does useMemo prevent re-renders?',
      answer: 'Not by itself. useMemo prevents expensive recalculations. To prevent child component re-renders, you need React.memo on the child component AND stable props (which useMemo can help provide). useMemo alone does not stop re-renders.',
    },
  ],
  productionIssues: [
    '**Performance: Premature memoisation** — Wrapping every value in useMemo adds comparison overhead and makes code harder to read without any performance benefit. Profile first, optimise second.',
    '**Bug: Incorrect dependencies** — Missing a dependency causes the memoised value to be stale. Always follow the exhaustive-deps ESLint rule.',
    '**Bug: Memoising side effects** — useMemo should be a pure computation. If your useMemo function has side effects (API calls, DOM manipulation), move it to useEffect.',
    '**Misuse: Memoising cheap operations** — Memoising a .filter() on a 10-item array is slower than just running the filter. useMemo is for genuinely expensive operations on large data sets.',
  ],
  bestPractices: [
    'Profile first with React DevTools Profiler before adding useMemo',
    'Use useMemo for genuinely expensive computations: large list filtering/sorting, complex data transformations',
    'Keep the computation function pure — no side effects',
    'Follow exhaustive-deps — include all values used inside the computation',
    'Combine with React.memo on child components for maximum effect',
    'In React 19+ with the compiler, manual useMemo is often unnecessary',
  ],
  architectNote: `The most common useMemo mistake in enterprise codebases is cargo-culting — developers see senior engineers using it and add it everywhere without measuring. This creates code that is harder to read and maintain with no performance benefit. The rule: measure first, then optimise. Use the React DevTools Profiler to identify components that are slow to render, then apply useMemo where the data shows it helps. In most apps, 90% of components need zero memoisation.`,
  faqs: [
    {
      question: 'Can useMemo be used for data fetching?',
      answer: 'No. useMemo is for synchronous pure computations. Data fetching is a side effect and belongs in useEffect or a data fetching library like React Query. If you put an API call in useMemo, it will behave unpredictably.',
    },
    {
      question: 'Does React guarantee useMemo will not recompute?',
      answer: 'No. React may discard memoised values in the future (e.g., for off-screen rendering). useMemo is a performance hint, not a semantic guarantee. Do not rely on it for correctness — only for performance.',
    },
  ],
  keyTakeaways: [
    'useMemo caches computed values between renders — recomputes only when dependencies change',
    'Use it for genuinely expensive computations on large data, not simple operations',
    'Measure with React DevTools Profiler before adding useMemo',
    'useMemo alone does not prevent re-renders — pair with React.memo for that',
    'Keep the computation pure — no side effects inside useMemo',
    'React 19 Compiler will automate most memoisation — manual useMemo will be less needed',
  ],
  relatedTopics: ['react-hooks-usecallback', 'react-hooks-usestate', 'react-memo', 'react-performance'],
};
