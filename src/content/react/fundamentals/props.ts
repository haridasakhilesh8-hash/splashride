import type { TopicContent } from '../../types';

export const reactProps: TopicContent = {
  slug: 'react-props',
  title: 'Props',
  description: 'Master React props — the mechanism for passing data and behaviour between components. Learn prop design, TypeScript typing, and the patterns senior engineers use in real enterprise applications.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Props (short for properties) are how you pass data from a parent component to a child. They are like function arguments — the parent decides what to send, the child receives it as a read-only object. If state is a component\'s internal memory, props are the external inputs from the outside world.',
  whatIsIt: `Props are **read-only inputs** passed to a component from its parent. Every React component receives a single \`props\` object. In modern React, we always destructure it in the function signature.

- Props can be any JavaScript value: strings, numbers, booleans, objects, arrays, functions, or even other React components
- Props flow **one direction only** — parent to child (unidirectional data flow)
- A component **must never modify its own props** — they are immutable from the component\'s perspective
- The \`children\` prop is special — it represents the JSX placed between opening and closing tags
- Callback props (functions passed as props) are how children communicate back to parents`,
  whyWeNeedIt: `Props are what make components reusable. Without props, a Button component could only ever say "Click me" with a fixed blue colour. With props, the same Button can say anything, in any colour, trigger any action.

Props enforce **unidirectional data flow** — data flows down, events flow up. This makes React apps predictable: to understand why a component looks a certain way, you only need to look at the props it received, not the entire application state.

In interviews, this is often asked as: "What is one-way data binding in React?" — props are the answer.`,
  realWorldUsage: `Props are used in every component in every React project. Real patterns:

- **Configuration props** — \`<Button variant="primary" size="lg" loading={isSubmitting} />\`
- **Data props** — \`<PolicyCard policy={policyData} />\`
- **Callback props** — \`<DataTable onRowClick={handleRowSelect} onSort={handleSort} />\`
- **Children** — \`<Modal title="Confirm"><ConfirmationForm /></Modal>\`
- **Render props** — \`<DataProvider render={(data) => <Chart data={data} />} />\`
- **Spreading props** — \`<input {...register('email')} />\` (React Hook Form)`,
  howItWorks: `When you write \`<UserCard name="Alice" role="admin" onEdit={handleEdit} />\`, React calls your UserCard function with \`{ name: "Alice", role: "admin", onEdit: handleEdit }\` as the argument.

**Default props** — set with default parameter values in the function signature:
\`function Button({ variant = 'primary', size = 'md' }: ButtonProps)\`

**Prop spreading** — \`<input {...inputProps} />\` passes all properties of an object as individual props. Useful for forwarding HTML attributes.

**children prop** — anything between opening and closing JSX tags becomes \`props.children\`. Type it as \`React.ReactNode\` for maximum flexibility.

**Prop drilling** — passing props through many intermediate layers to reach a deeply nested child. When drilling exceeds 2–3 levels, consider Context or a state manager.`,
  example: {
    title: 'Props Patterns in Production',
    description: 'Typed props, defaults, callbacks, and children patterns used in real projects.',
    code: [
      {
        label: 'Typed Props with Defaults',
        language: 'tsx',
        code: `interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={\`btn btn--\${variant} btn--\${size}\`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner size={14} /> : icon}
      {label}
    </button>
  );
}`,
      },
      {
        label: 'Children and Composition',
        language: 'tsx',
        code: `interface PanelProps {
  title: string;
  description?: string;
  actions?: React.ReactNode; // slot for action buttons
  children: React.ReactNode; // main content
  variant?: 'default' | 'warning' | 'danger';
}

export function Panel({ title, description, actions, children, variant = 'default' }: PanelProps) {
  return (
    <section className={\`panel panel--\${variant}\`}>
      <div className="panel__header">
        <div>
          <h2 className="panel__title">{title}</h2>
          {description && <p className="panel__desc">{description}</p>}
        </div>
        {actions && <div className="panel__actions">{actions}</div>}
      </div>
      <div className="panel__body">{children}</div>
    </section>
  );
}

// Usage
<Panel
  title="Active Policies"
  description="Policies expiring in the next 30 days"
  actions={<Button label="Export" variant="secondary" />}
>
  <PolicyTable policies={expiringPolicies} />
</Panel>`,
      },
      {
        label: 'Extending HTML Elements',
        language: 'tsx',
        code: `// Extend native HTML element props — common in design systems
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, id, ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\\s+/g, '-');
  return (
    <div className={\`input-group \${error ? 'input-group--error' : ''}\`}>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} aria-describedby={error ? \`\${inputId}-error\` : undefined} {...rest} />
      {hint && !error && <p className="hint">{hint}</p>}
      {error && <p id={\`\${inputId}-error\`} className="error" role="alert">{error}</p>}
    </div>
  );
}

// All standard <input> attributes work automatically
<Input label="Email" type="email" required autoComplete="email" error={errors.email} />`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between props and state?',
      answer: 'Props are external inputs — passed from parent, read-only inside the component. State is internal memory — owned and managed by the component itself, can be changed with setState. A component controls its own state but cannot control its own props. Think of props as function arguments and state as local variables.',
    },
    {
      question: 'Can I modify props inside a component?',
      answer: 'No. Props are read-only. If you need to derive a value from a prop, compute it inline or with useMemo. If you need to track changes to a prop over time, copy it into local state with useState(initialProp) — but be careful: local state does not automatically sync when the prop changes later.',
    },
    {
      question: 'What is prop drilling and when is it a problem?',
      answer: 'Prop drilling is passing props through intermediate components that do not use them — just to get data to a deeply nested child. It becomes a problem at 3+ levels deep: changes to the prop shape require updates in every intermediate component. Solutions: React Context for global data, component composition (render children directly), or Zustand/Redux for complex state.',
    },
  ],
  productionIssues: [
    '**Bug: Object/array props causing unnecessary re-renders** — <Component config={{ timeout: 3000 }} /> creates a new object on every parent render, causing the child to re-render even if nothing changed. Fix: define the object outside the component or memoize with useMemo.',
    '**Bug: Mutating props** — Never do props.items.push(newItem). This mutates the parent\'s data directly, causing unpredictable bugs that are very hard to trace. Always treat props as immutable.',
    '**Bug: Prop drilling through 5+ layers** — Makes refactoring painful and creates tight coupling. Restructure with Context or lift the consuming component higher in the tree.',
    '**Type error: Missing required prop** — TypeScript catches this at compile time but JavaScript will silently pass undefined. Always use TypeScript for prop definitions in production apps.',
  ],
  bestPractices: [
    'Always define prop types with TypeScript interfaces — they are the component\'s public API',
    'Use default parameter values for optional props, not defaultProps (deprecated)',
    'Extend HTML element interfaces when building design system components (InputHTMLAttributes, etc.)',
    'Keep prop lists small — if a component needs 10+ props, it is probably doing too much',
    'Use the children prop for flexible composition instead of a content prop accepting JSX',
    'Document non-obvious props with JSDoc comments — they appear as IDE tooltips',
    'Avoid passing entire objects when only one property is needed — destructure at the call site',
  ],
  architectNote: `The props API of a component is its public contract. Every prop you add is a commitment — removing or renaming it is a breaking change for every consumer. Design prop APIs with the same care you would design a REST endpoint.

In large codebases, the biggest props-related mistake is making components too configurable. A Button with 15 props for every conceivable variation becomes a maintenance nightmare. Instead, create focused variants (PrimaryButton, DangerButton) or use a compound component pattern. Fewer props, clearer intent, easier to maintain.`,
  faqs: [
    {
      question: 'How do I pass all props of an object to a component?',
      answer: 'Use the spread operator: <Component {...myObject} />. This passes every key of myObject as a separate prop. Common with React Hook Form\'s register() function. Be careful — spreading unknown objects can pass unintended props to DOM elements, causing React warnings.',
    },
    {
      question: 'What is the difference between children and a render prop?',
      answer: 'children is a prop that accepts static JSX or components. A render prop is a function prop that the component calls to get JSX — giving the parent control over what is rendered and when. Example: <DataTable renderRow={(row) => <CustomRow data={row} />} />. Render props are powerful but often replaced by hooks in modern React.',
    },
    {
      question: 'Should I pass individual props or a single data object?',
      answer: 'For simple components (2–4 props), individual props are clearer. For data-heavy components (UserCard, PolicyRow), passing a typed object (user: User, policy: Policy) is cleaner and avoids prop explosion. Never pass raw API response objects — define a typed interface for the shape your component needs.',
    },
  ],
  keyTakeaways: [
    'Props are read-only inputs — never mutate them inside the component',
    'Data flows one way: parent to child via props',
    'Children communicate back to parents via callback props (functions)',
    'TypeScript interfaces for props are the component\'s documentation and contract',
    'Prop drilling beyond 3 levels is a signal to use Context or restructure',
    'Extend HTML element interfaces for design system components',
    'Avoid object/array literals as props — they create new references every render',
  ],
  relatedTopics: ['react-components', 'react-jsx', 'react-state', 'react-context'],
};
