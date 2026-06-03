import type { TopicContent } from '../types';

export const reactComponents: TopicContent = {
  slug: 'react-components',
  title: 'React Components',
  description: 'Understand React components from the ground up — what they are, how they work, and how senior engineers think about component design in real applications.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'A React component is a JavaScript function that returns JSX (HTML-like syntax). It\'s the fundamental building block of every React app. Think of components like custom HTML elements — you define them once and reuse them anywhere.',
  whatIsIt: `A React component is a **reusable, self-contained piece of UI**. Every React application is a tree of components.

There are two types:
- **Function Components** (modern, recommended) — plain JavaScript functions that return JSX
- **Class Components** (legacy) — ES6 classes extending React.Component

In 2024, you write function components. Always. Class components are only relevant when maintaining old codebases.

A component:
- Accepts **props** (inputs from parent)
- Manages **state** (internal data)
- Returns **JSX** (the rendered output)
- Can trigger **side effects** via hooks`,
  whyWeNeedIt: `Without components, you'd write one giant HTML file with thousands of lines. Components solve this by:

- **Reusability** — write a Button once, use it 500 times
- **Separation of concerns** — each component owns its piece of UI
- **Maintainability** — change one component without touching others
- **Testability** — test each component in isolation
- **Team scalability** — different engineers own different components

Every major UI framework (Vue, Angular, Svelte) is built on the same component idea. React popularized it.`,
  realWorldUsage: `In a real production app (say, a dashboard), your component tree looks like:

\`\`\`
App
├── Header
│   ├── Logo
│   ├── Nav
│   └── UserMenu
├── Sidebar
│   └── NavItem (×10)
└── MainContent
    ├── PageTitle
    ├── DataTable
    │   ├── TableHeader
    │   └── TableRow (×N)
    └── Pagination
\`\`\`

**Real-world patterns you'll see:**
- **Container vs Presentational** — one component fetches data, another renders it
- **Compound components** — \`<Select>\`, \`<Select.Option>\` work together
- **Render props / composition** — pass JSX as children for flexibility
- A typical mid-size app has 50–200 components`,
  howItWorks: `**Component Lifecycle (simplified):**

1. React calls your function component
2. JSX is returned and converted to a virtual DOM tree
3. React diffs the virtual DOM against the previous render
4. Only changed DOM nodes are updated (reconciliation)
5. When state/props change → component re-renders → repeat

**JSX is syntactic sugar:**
\`\`\`jsx
// What you write:
const el = <h1 className="title">Hello</h1>;

// What it compiles to:
const el = React.createElement('h1', { className: 'title' }, 'Hello');
\`\`\`

**Component Rules:**
- Component names must start with a capital letter (\`MyButton\`, not \`myButton\`)
- Must return a single root element (or a Fragment \`<>\`)
- Must be pure — same props/state → same output
- Never mutate props directly`,
  example: {
    title: 'Building a Real-World Card Component',
    description: 'A production-quality Card component with variants, composition, and proper TypeScript types.',
    code: [
      {
        label: 'Basic Function Component',
        language: 'tsx',
        code: `// Simple, typed function component
interface GreetingProps {
  name: string;
  role?: string;
}

export function Greeting({ name, role = 'Developer' }: GreetingProps) {
  return (
    <div className="greeting">
      <h2>Hello, {name}!</h2>
      <p>Role: {role}</p>
    </div>
  );
}

// Usage
<Greeting name="Sarah" role="Senior Engineer" />
<Greeting name="Alex" /> // role defaults to "Developer"`,
      },
      {
        label: 'Composable Card Component',
        language: 'tsx',
        code: `// Production-quality composable Card
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

// Main card container
export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-300',
    elevated: 'bg-white shadow-lg',
  };

  return (
    <div className={\`rounded-lg p-4 \${variantStyles[variant]} \${className}\`}>
      {children}
    </div>
  );
}

// Sub-components — compound component pattern
Card.Header = function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-700">{children}</div>;
};

Card.Footer = function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 pt-3 border-t border-gray-100">{children}</div>;
};

// Usage — clean, readable, composable
function UserCard({ user }: { user: User }) {
  return (
    <Card variant="elevated">
      <Card.Header
        title={user.name}
        subtitle={user.email}
        action={<StatusBadge status={user.status} />}
      />
      <Card.Body>
        <p>{user.bio}</p>
      </Card.Body>
      <Card.Footer>
        <Button onClick={() => viewProfile(user.id)}>View Profile</Button>
      </Card.Footer>
    </Card>
  );
}`,
      },
      {
        label: 'Component with State & Events',
        language: 'tsx',
        code: `import { useState } from 'react';

interface CounterProps {
  initialCount?: number;
  min?: number;
  max?: number;
  onChange?: (count: number) => void;
}

export function Counter({
  initialCount = 0,
  min = 0,
  max = 100,
  onChange,
}: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    const next = Math.min(count + 1, max);
    setCount(next);
    onChange?.(next);       // optional callback — "?." prevents crash if not provided
  };

  const decrement = () => {
    const next = Math.max(count - 1, min);
    setCount(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={decrement}
        disabled={count <= min}
        className="px-3 py-1 rounded bg-gray-100 disabled:opacity-40"
      >
        −
      </button>
      <span className="w-8 text-center font-mono font-bold">{count}</span>
      <button
        onClick={increment}
        disabled={count >= max}
        className="px-3 py-1 rounded bg-gray-100 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my component re-render so many times?',
      answer: 'React re-renders a component whenever its state or props change. If a parent re-renders, all children re-render too (unless memoized). This is usually fine — React is fast. Premature optimization with React.memo() often creates more bugs than it solves. Profile first, optimize second.',
    },
    {
      question: 'What is the difference between a component and an element?',
      answer: 'A component is the function/class definition (the blueprint). An element is what you get when you call/render that component — it\'s a plain JavaScript object describing what to render. <Button /> is an element created from the Button component.',
    },
    {
      question: 'When should I split a component into smaller components?',
      answer: 'The "when to split" rule: split when (1) the component does more than one thing, (2) it\'s over ~150 lines, (3) a piece of it needs to be reused elsewhere, or (4) a piece has its own independent state. Don\'t split just for splitting\'s sake — unnecessary components add cognitive overhead.',
    },
    {
      question: 'Why can\'t I use if statements directly in JSX?',
      answer: 'JSX compiles to function calls, and you can\'t put statements inside expressions. Use ternary operators (condition ? a : b) for inline conditionals, or && for render-or-nothing. For complex conditions, compute the value before the return statement.',
    },
  ],
  productionIssues: [
    '"Each child in a list should have a unique key" warning — always add a stable, unique key prop to list items. Never use array index as key when the list can reorder.',
    'Component renders but shows stale data — you\'re reading a state value inside a closure that captured an old value. Use functional state updates: setState(prev => prev + 1).',
    'Infinite re-render loop — setState called unconditionally inside the component body (not in an event handler or useEffect). Move it inside a handler.',
    'Component unmounts and remounts unexpectedly — the component\'s position in the tree changed, causing React to treat it as a new component. Use stable keys.',
    'Memory leak warning — async operation completes after component unmounts. Use cleanup functions in useEffect or AbortController for fetch calls.',
  ],
  bestPractices: [
    'Keep components small and focused — one component, one responsibility.',
    'Co-locate related files: MyComponent.tsx, MyComponent.test.tsx, MyComponent.module.css in the same folder.',
    'Use TypeScript interfaces for all props — it\'s documentation that the compiler enforces.',
    'Default export for the main component, named exports for sub-components.',
    'Avoid prop drilling beyond 2 levels — use Context or a state manager instead.',
    'Prefer composition over configuration — accept children/render props rather than adding more boolean props.',
    'Name event handler props onX (onClick, onChange) and handler functions handleX (handleClick, handleChange).',
  ],
  architectNote: `The biggest architectural mistake in React apps is **wrong component boundaries**. Components that are too large become impossible to test and maintain. Components that are too small create an indirection maze.

**The rule senior engineers use:** A component should be fully understandable in under 30 seconds. If you need to scroll to understand it, it's too big.

**Folder structure for scale:**
\`\`\`
src/
  components/
    ui/          ← Generic reusable (Button, Input, Modal)
    features/    ← Feature-specific (UserCard, OrderTable)
    layouts/     ← Page layouts (DashboardLayout, AuthLayout)
  pages/         ← Route-level components
\`\`\`

**For large teams:** Establish a component library early (Storybook). It forces you to build components in isolation, which naturally produces better-designed, more reusable components.`,
  faqs: [
    {
      question: 'Should I use default exports or named exports for components?',
      answer: 'Named exports are generally better — they\'re explicit, easier to refactor (your IDE can rename them), and prevent import aliasing confusion. Many teams use: named export for the component, default export only for pages (Next.js convention). Pick one convention and stick to it.',
    },
    {
      question: 'What is the difference between controlled and uncontrolled components?',
      answer: 'A controlled component\'s value is driven by React state (you control it). An uncontrolled component stores its own value in the DOM (you access it via ref). Use controlled components for forms — they\'re predictable and easy to validate. Use uncontrolled only for file inputs or when integrating with non-React code.',
    },
    {
      question: 'Can I return multiple elements from a component?',
      answer: 'Yes, using Fragments: return <><Child1 /><Child2 /></>. Fragments render no extra DOM node. Use <Fragment key={id}> when you need a key in a list. This is common when a component renders multiple sibling elements without a natural wrapper.',
    },
    {
      question: 'How do I pass a component as a prop?',
      answer: 'Use React.ComponentType<Props> or React.FC<Props> as the type. Example: interface Props { icon: React.ComponentType<{ size: number }> }. Then render it: <props.icon size={20} />. This is the slot pattern — very common in design systems.',
    },
  ],
  keyTakeaways: [
    'Components are functions that accept props and return JSX',
    'Always use function components — class components are legacy',
    'Component names must start with a capital letter',
    'Keep components small, focused, and doing one thing',
    'Props flow down, events flow up — the core React data model',
    'Re-renders are cheap — don\'t optimize prematurely',
  ],
  relatedTopics: ['react-props', 'react-state', 'react-hooks', 'react-context'],
};
