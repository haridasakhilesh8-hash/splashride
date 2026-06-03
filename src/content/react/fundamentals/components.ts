import type { TopicContent } from '../../types';

export const reactComponents: TopicContent = {
  slug: 'react-components',
  title: 'Components',
  description: 'Master React components — the fundamental building blocks of every React application. Learn component design, composition patterns, and how senior engineers structure components in enterprise projects.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A React component is a JavaScript function that accepts props and returns JSX. It is the fundamental building block of every React app — every button, form, page, and layout is a component. Think of them as custom HTML elements you define once and reuse everywhere.',
  whatIsIt: `A React component is a **reusable, self-contained piece of UI**. Every React application is a tree of components nested inside each other.

There are two types:
- **Function Components** (modern, always use these) — plain JavaScript functions returning JSX
- **Class Components** (legacy) — only relevant when maintaining pre-2019 codebases

A component:
- Accepts **props** (inputs from its parent)
- Manages **state** (internal data that changes over time)
- Returns **JSX** (the rendered output)
- Can run **side effects** via hooks (API calls, subscriptions, timers)`,
  whyWeNeedIt: `Without components, you would write one massive HTML file with thousands of lines and no way to reuse anything. Components solve this by:

- **Reusability** — build a Button once, use it 500 times across the app
- **Separation of concerns** — each component owns its piece of UI and logic
- **Maintainability** — change one component without touching others
- **Testability** — test each component in complete isolation
- **Team scalability** — different engineers own different components without conflicts

Every major UI framework (Vue, Angular, Svelte) is built on the same component idea. React popularised it.`,
  realWorldUsage: `In a real production app (say, an insurance claims dashboard), your component tree looks like:

\`\`\`
App
├── AuthProvider
├── Router
│   ├── DashboardPage
│   │   ├── PageHeader
│   │   ├── ClaimsSummaryCards
│   │   │   └── SummaryCard (×4)
│   │   └── ClaimsTable
│   │       ├── TableHeader
│   │       ├── ClaimRow (×N)
│   │       └── Pagination
│   └── ClaimDetailPage
│       ├── ClaimHeader
│       ├── DocumentList
│       └── ActionPanel
\`\`\`

A typical mid-size enterprise app has 80–200 components. They are split into:
- **UI components** — generic, reusable (Button, Input, Modal, Badge)
- **Feature components** — domain-specific (ClaimCard, PolicySummary)
- **Page components** — route-level, orchestrate layout and data`,
  howItWorks: `**Component rendering lifecycle:**

1. React calls your function component with props as the argument
2. The function runs and returns a JSX tree
3. React converts JSX to a virtual DOM (plain JS objects)
4. React diffs the new virtual DOM against the previous render
5. Only the changed DOM nodes are updated (reconciliation)
6. Re-renders happen when: props change, state changes, or parent re-renders

**Component identity:**
React identifies components by their position in the tree. If you conditionally render the same component in different positions, React treats them as different instances and resets state.`,
  example: {
    title: 'Component Patterns in Enterprise React',
    description: 'From a simple component to real-world composition patterns.',
    code: [
      {
        label: 'Function Component Anatomy',
        language: 'tsx',
        code: `interface StatusBadgeProps {
  status: 'active' | 'pending' | 'rejected' | 'expired';
  size?: 'sm' | 'md' | 'lg';
}

const STATUS_CONFIG = {
  active:   { label: 'Active',   color: '#16a34a', bg: '#dcfce7' },
  pending:  { label: 'Pending',  color: '#d97706', bg: '#fef3c7' },
  rejected: { label: 'Rejected', color: '#dc2626', bg: '#fee2e2' },
  expired:  { label: 'Expired',  color: '#6b7280', bg: '#f3f4f6' },
} as const;

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const fontSize = size === 'sm' ? 11 : size === 'lg' ? 15 : 13;

  return (
    <span
      style={{
        color: config.color,
        background: config.bg,
        fontSize,
        fontWeight: 600,
        padding: '2px 10px',
        borderRadius: 20,
        display: 'inline-block',
      }}
    >
      {config.label}
    </span>
  );
}`,
      },
      {
        label: 'Composition Pattern',
        language: 'tsx',
        code: `// Card is a layout component — it knows nothing about content
interface CardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Card({ children, footer, className }: CardProps) {
  return (
    <div className={\`card \${className ?? ''}\`}>
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
}

// Usage — Card does not know about claims, but works perfectly
<Card footer={<Button onClick={approve}>Approve Claim</Button>}>
  <ClaimDetails claim={selectedClaim} />
</Card>`,
      },
      {
        label: 'Container / Presenter Split',
        language: 'tsx',
        code: `// Container: handles data fetching, state, business logic
export function ClaimsContainer() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClaims()
      .then(setClaims)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error)   return <ErrorMessage message={error} />;
  return <ClaimsList claims={claims} />;
}

// Presenter: pure UI, no side effects, easy to test
interface ClaimsListProps { claims: Claim[]; }

export function ClaimsList({ claims }: ClaimsListProps) {
  if (claims.length === 0) return <EmptyState message="No claims found" />;
  return (
    <ul>
      {claims.map((c) => (
        <ClaimRow key={c.id} claim={c} />
      ))}
    </ul>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why must component names start with a capital letter?',
      answer: 'React uses the capitalisation to distinguish between HTML elements and React components. <div> is an HTML element. <Div> would be a React component called Div. If you name a component with lowercase, React treats it as an unknown HTML element and ignores it silently.',
    },
    {
      question: 'When does a component re-render?',
      answer: 'A component re-renders when: (1) its own state changes via useState/useReducer, (2) its props change, (3) its parent re-renders. Note: a parent re-rendering ALWAYS causes children to re-render unless they are wrapped in React.memo. Re-renders are not expensive by default — only optimise when you measure a real problem.',
    },
    {
      question: 'What is the difference between a component and an element?',
      answer: 'A component is the function or class definition (the blueprint). An element is the result of calling that component — the plain JS object { type, props } returned by React.createElement(). When you write <Button />, you are creating an element. React uses elements to build the virtual DOM.',
    },
  ],
  productionIssues: [
    '**Performance: Massive components** — Components with 500+ lines of JSX are slow to render and impossible to maintain. Split at natural boundaries: each section of a page, each repeated item, each independent piece of state.',
    '**Bug: Component defined inside another component** — Defining ComponentB inside ComponentA causes React to create a new component type on every render, destroying and recreating ComponentB\'s DOM and state on every parent render. Always define components at the module level.',
    '**Bug: Forgetting key prop** — When rendering lists without stable keys, React cannot efficiently reconcile updates. List items appear to flash, lose focus, or show wrong data after reorders.',
    '**Memory leak: Missing cleanup** — Components that start subscriptions, timers, or event listeners in useEffect without returning a cleanup function cause memory leaks when the component unmounts.',
  ],
  bestPractices: [
    'One component per file — makes imports explicit and files easy to find',
    'Name components after what they render, not how they work (UserCard not CardWithAvatar)',
    'Keep components under 150 lines — if longer, split into sub-components',
    'Separate data fetching (containers) from rendering (presenters) for testability',
    'Use TypeScript interfaces for all props — they are the component\'s public API documentation',
    'Avoid defining components inside other components — always define at module level',
    'Prefer composition (children prop) over configuration props for flexible layouts',
  ],
  architectNote: `The most important architectural decision in a React project is not which state management library to use — it is how you split and organise components. Components that are too large become impossible to test and maintain. Components that are too small create an indirection maze where you need to jump through 10 files to understand one feature.

The rule senior engineers use: a component should be fully understandable in under 30 seconds. If you need to scroll to understand it, it is too big.

For large teams, establish a component library (Storybook) early. It forces you to build components in isolation, which naturally produces better-designed, more reusable components. And it becomes the single source of truth for what the UI can do.`,
  faqs: [
    {
      question: 'Should I use default exports or named exports for components?',
      answer: 'Named exports are generally better — they are explicit, easier to refactor (your IDE can rename them globally), and prevent aliasing confusion. Many teams use named exports for all components and default exports only for page-level components (Next.js convention). Pick one and stick to it.',
    },
    {
      question: 'How many components is too many?',
      answer: 'There is no upper limit. A large enterprise app might have 300+ components. The question is organisation, not count. Group by feature (not by type), keep related components co-located, and use barrel exports (index.ts) per feature folder.',
    },
    {
      question: 'Should every component have its own file?',
      answer: 'For components used in multiple places, yes — always separate files. For small sub-components used only within one parent, it is fine to co-locate them in the same file. Use judgment: if a sub-component grows beyond 50 lines or gets reused, extract it.',
    },
  ],
  keyTakeaways: [
    'Components are functions that accept props and return JSX',
    'Always use function components — class components are legacy',
    'Component names must start with a capital letter',
    'Never define a component inside another component',
    'Re-renders happen on state change, prop change, or parent re-render',
    'Split large components — aim for under 150 lines',
    'Separate data fetching (container) from rendering (presenter)',
    'TypeScript interfaces for props are the component\'s documentation',
  ],
  relatedTopics: ['react-jsx', 'react-props', 'react-state', 'react-hooks-usestate'],
};
