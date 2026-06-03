import type { TopicContent } from '../../types';

export const reactMemo: TopicContent = {
  slug: 'react-memo',
  title: 'React.memo',
  description: 'Master React.memo — the higher-order component for preventing unnecessary re-renders. Learn when it helps, when it hurts, and how to use it correctly with useCallback and useMemo.',
  applicableVersions: ['React 16.6+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'React.memo wraps a component and prevents it from re-rendering if its props have not changed. By default, React re-renders all children when a parent re-renders. React.memo adds a shallow prop comparison — if all props are the same reference, the re-render is skipped. Use it for expensive components that receive stable props.',
  whatIsIt: `\`React.memo(Component)\` is a higher-order component that memoises the rendered output. On re-render, React compares the new props to the previous props using shallow equality. If all props are the same, the previous render output is reused.

\`\`\`tsx
const ExpensiveChart = React.memo(function Chart({ data, config }: ChartProps) {
  // expensive rendering logic
  return <canvas ref={canvasRef} />;
});
\`\`\`

**Custom comparison:**
\`React.memo(Component, (prevProps, nextProps) => prevProps.id === nextProps.id)\`
Return \`true\` to skip re-render, \`false\` to re-render.`,
  whyWeNeedIt: `In React, a parent re-render always causes all children to re-render by default. For most components, this is fine — rendering is fast. But for:

- Components that render large lists
- Components with expensive calculations in the render
- Components that integrate with third-party libraries (charts, maps, editors)
- Components deep in the tree that receive stable props

...the default behaviour wastes CPU. React.memo prevents these re-renders when props haven\'t changed.`,
  realWorldUsage: `In a financial dashboard:

- A \`<LineChart />\` component that renders 1,000 data points — memoised so it only re-renders when the chart data changes, not when the sidebar toggles
- \`<PolicyRow />\` in a list of 500 policies — memoised so selecting one row does not re-render all others
- A \`<RichTextEditor />\` — memoised to prevent re-initialising the editor on every parent render`,
  howItWorks: `React.memo adds a shallow equality check before rendering. Shallow equality means:
- Primitives (string, number, boolean): compared by value — \`'Alice' === 'Alice'\` ✓
- Objects and arrays: compared by reference — \`{} === {}\` is false even if they look the same
- Functions: compared by reference — \`() => {} === () => {}\` is false

This is why React.memo only works correctly when paired with:
- \`useMemo\` for object/array props
- \`useCallback\` for function props`,
  example: {
    title: 'React.memo with useCallback and useMemo',
    description: 'Memoised list rows with stable callback and object props.',
    code: [
      {
        label: 'Memoised List Row',
        language: 'tsx',
        code: `interface PolicyRowProps {
  policy: Policy;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

// Memoised: only re-renders when its own props change
const PolicyRow = React.memo(function PolicyRow({
  policy,
  isSelected,
  onSelect,
  onDelete,
}: PolicyRowProps) {
  console.log('PolicyRow render:', policy.id); // use to verify memoisation

  return (
    <tr className={isSelected ? 'row--selected' : ''}>
      <td>{policy.policyNumber}</td>
      <td>{policy.holderName}</td>
      <td><StatusBadge status={policy.status} /></td>
      <td>
        <button onClick={() => onSelect(policy.id)}>Select</button>
        <button onClick={() => onDelete(policy.id)}>Delete</button>
      </td>
    </tr>
  );
});

// Parent — stable callbacks prevent PolicyRow re-renders
function PolicyTable({ policies }: { policies: Policy[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Without useCallback: new function every render — all rows re-render
  const handleSelect = useCallback((id: string) => setSelectedId(id), []);
  const handleDelete = useCallback(async (id: string) => {
    await deletePolicy(id);
  }, []);

  return (
    <table>
      <tbody>
        {policies.map(p => (
          <PolicyRow
            key={p.id}
            policy={p}
            isSelected={selectedId === p.id}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I wrap every component in React.memo?',
      answer: 'No. React.memo adds overhead — the prop comparison itself costs time. For simple components that render quickly, the comparison may cost more than the re-render. Only use it when you can measure a performance problem with the React DevTools Profiler.',
    },
    {
      question: 'Why is my React.memo component still re-rendering?',
      answer: 'Almost always because a prop is a new reference every render. Object props ({} !== {}), array props ([] !== []), and function props (() => {} !== () => {}) fail the shallow comparison. Fix: memoize object/array props with useMemo and function props with useCallback in the parent.',
    },
    {
      question: 'Does React.memo work with children prop?',
      answer: 'Poorly. JSX passed as children creates a new React element on every render, so the children prop always fails the shallow comparison. React.memo is most effective for components that receive primitive props (strings, numbers, booleans) and stable object/function references.',
    },
  ],
  productionIssues: [
    '**React.memo without stable callbacks** — Memoising a component but passing inline arrow functions as props defeats the purpose. Always pair React.memo with useCallback for function props.',
    '**Over-memoisation** — Wrapping every component in React.memo adds comparison overhead and makes the codebase harder to read. Profile first.',
    '**React 19 Compiler** — The React Compiler will automate memoisation. In React 19+ projects, manual React.memo may become unnecessary.',
  ],
  bestPractices: [
    'Profile with React DevTools Profiler before adding React.memo',
    'Always pair with useCallback for function props and useMemo for object/array props',
    'Use the display name for easier debugging: const Comp = React.memo(function Comp() {})',
    'Use custom comparison only when you know exactly what needs to be compared',
    'Check for unnecessary re-renders with the Profiler, not by guessing',
  ],
  architectNote: `React.memo, useCallback, and useMemo form a triad. None of them work in isolation. A memoised component with unstable function props re-renders anyway. Stable callbacks without a memoised child are wasted effort. Apply all three together, only where profiling shows it is needed. In React 19 with the compiler, this entire pattern may be automated — write clean code first, optimise only when measured.`,
  faqs: [
    {
      question: 'What is the difference between React.memo and useMemo?',
      answer: 'React.memo memoises a component — it prevents the component from re-rendering when props have not changed. useMemo memoises a computed value inside a component — it prevents an expensive calculation from re-running on every render. They solve different problems but are often used together.',
    },
  ],
  keyTakeaways: [
    'React.memo prevents re-renders when props have not changed (shallow comparison)',
    'Objects, arrays, and functions fail shallow comparison — pair with useMemo/useCallback',
    'Profile first with React DevTools Profiler — do not optimise by guessing',
    'Use display names for memoised components for easier debugging',
    'React 19 Compiler will automate most memoisation',
  ],
  relatedTopics: ['react-hooks-usememo', 'react-hooks-usecallback', 'react-performance', 'react-lazy-loading'],
};
