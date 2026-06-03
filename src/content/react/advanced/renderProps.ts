import type { TopicContent } from '../../types';

export const reactRenderProps: TopicContent = {
  slug: 'react-render-props',
  title: 'Render Props',
  description: 'Understand the Render Props pattern — a technique for sharing logic by passing a render function as a prop. Learn when it is still useful and how it relates to hooks and compound components.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Render Props is a pattern where a component receives a function as a prop and calls it to determine what to render. The function receives data from the component and returns JSX. It was the primary pattern for sharing stateful logic before hooks. Today, custom hooks replace most render prop use cases, but the pattern still appears in library APIs.',
  whatIsIt: `A render prop is a prop that is a function returning JSX:

\`\`\`tsx
// Component with a render prop
<DataProvider
  url="/api/claims"
  render={(data, loading) => (
    loading ? <Spinner /> : <ClaimsList claims={data} />
  )}
/>
\`\`\`

The \`children\` prop as a function is the most common form:
\`\`\`tsx
<Toggle>
  {({ isOn, toggle }) => (
    <button onClick={toggle}>{isOn ? 'On' : 'Off'}</button>
  )}
</Toggle>
\`\`\`

The component owns the state/logic; the caller controls the rendering.`,
  whyWeNeedIt: `Before hooks, render props were the cleanest way to share stateful logic without HOC wrapper hell. The component encapsulates the logic (data fetching, toggle state, mouse position) and exposes it to the caller via a function prop.

In 2024, custom hooks replace render props for most use cases. But render props still appear in:
- Library APIs (react-table, Downshift, React Final Form)
- Cases where the consuming component needs to control rendering based on dynamic data
- Slot patterns in design systems`,
  realWorldUsage: `Render props you will encounter:

- React Router v5\'s \`<Route render={(props) => <Component {...props} />} />\`
- react-table\'s cell render functions
- Downshift\'s \`children\` function for accessible dropdowns
- Custom \`<DataTable renderRow={(row) => <CustomRow data={row} />} />\`
- \`<Formik render={(formProps) => <MyForm {...formProps} />} />\``,
  howItWorks: `The component with the render prop:
1. Manages its own state and logic
2. Calls the render prop function (or children function) with its state
3. Renders the JSX returned by the function

The caller:
1. Passes a function that receives the state
2. Returns JSX based on that state
3. Has full control over rendering without managing the logic`,
  example: {
    title: 'Render Props Patterns',
    description: 'Classic render prop and children-as-function patterns.',
    code: [
      {
        label: 'Data Table with Render Prop',
        language: 'tsx',
        code: `interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  renderRow: (item: T, index: number) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  loading?: boolean;
}

function DataTable<T extends { id: string }>({
  data,
  columns,
  renderRow,
  renderEmpty,
  loading,
}: DataTableProps<T>) {
  if (loading) return <TableSkeleton columns={columns.length} />;
  if (data.length === 0) return renderEmpty ? renderEmpty() : <EmptyState />;

  return (
    <table>
      <thead>
        <tr>{columns.map(col => <th key={col.key}>{col.label}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={item.id}>{renderRow(item, i)}</tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage — caller controls row rendering
<DataTable
  data={claims}
  columns={CLAIM_COLUMNS}
  renderRow={(claim) => (
    <>
      <td>{claim.policyNumber}</td>
      <td>{claim.holderName}</td>
      <td><StatusBadge status={claim.status} /></td>
      <td><ActionMenu claimId={claim.id} /></td>
    </>
  )}
  renderEmpty={() => <EmptyState message="No claims match your filters" />}
/>`,
      },
      {
        label: 'The Hook Equivalent',
        language: 'tsx',
        code: `// Render prop version
<MouseTracker render={({ x, y }) => <Cursor x={x} y={y} />} />

// Custom hook version — same logic, cleaner API
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return position;
}

// Usage — much cleaner
function CursorTracker() {
  const { x, y } = useMousePosition();
  return <Cursor x={x} y={y} />;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use render props or custom hooks in 2024?',
      answer: 'For logic sharing: custom hooks. They are simpler, do not add JSX nesting, and compose more cleanly. For rendering flexibility (like DataTable\'s renderRow): render props are still the right tool. The distinction: use hooks for logic, use render props for rendering control.',
    },
  ],
  productionIssues: [
    '**Performance: Inline render prop functions** — Passing an inline arrow function as a render prop creates a new function on every parent render, causing unnecessary re-renders of the child. Extract to a named function or use useCallback.',
  ],
  bestPractices: [
    'Prefer custom hooks for logic reuse — render props for rendering control',
    'Use children as a function for the most natural API',
    'Avoid deeply nested render props — extract to custom hooks instead',
    'Use useCallback for render prop functions passed to memoised components',
  ],
  architectNote: `Render props are a pattern from pre-hooks React that solved real problems elegantly. Today, custom hooks solve the same problems with less ceremony. The render prop pattern lives on in library APIs (react-table, Downshift) and in cases where the consumer genuinely needs to control rendering. When you see a render prop in a library API, understand it as "the library owns the logic, you own the rendering" — that mental model is still valid and useful.`,
  faqs: [
    {
      question: 'What is children as a function?',
      answer: 'Instead of a named render prop, the children prop itself is a function: <Toggle>{({ isOn }) => <button>{isOn ? "On" : "Off"}</button>}</Toggle>. This is the most common render prop form because it reads naturally. The component calls this.props.children(state) or props.children(state) to get the JSX.',
    },
  ],
  keyTakeaways: [
    'Render props share logic by passing a render function as a prop',
    'Custom hooks have replaced render props for logic sharing in modern React',
    'Render props are still useful for rendering control (DataTable renderRow)',
    'Children as a function is the most common render prop form',
    'Use useCallback for render prop functions to prevent unnecessary re-renders',
  ],
  relatedTopics: ['react-custom-hooks', 'react-hoc', 'react-compound-components'],
};
