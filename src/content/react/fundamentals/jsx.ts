import type { TopicContent } from '../../types';

export const jsx: TopicContent = {
  slug: 'react-jsx',
  title: 'JSX',
  description: 'Understand JSX — the syntax extension that makes React feel like writing HTML in JavaScript. Learn how it compiles, what rules it enforces, and how senior engineers use it in production.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'JSX is JavaScript with HTML-like syntax. When you write <Button label="Save" />, Babel compiles it to React.createElement(Button, { label: "Save" }). It is not HTML — it is syntactic sugar over plain JavaScript function calls. The browser never sees JSX; it always sees compiled JS.',
  whatIsIt: `JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write UI structure inline with your logic. It looks like HTML but behaves like JavaScript.

- JSX compiles to \`React.createElement()\` calls (React 17+ uses the new JSX transform — no import needed)
- Every JSX element is a function call that returns a React element object
- JSX is **not** a template language — it has the full power of JavaScript
- Self-closing tags are required: \`<img />\`, \`<br />\`, \`<Input />\`
- \`class\` becomes \`className\`, \`for\` becomes \`htmlFor\` (reserved JS words)
- Inline styles are objects: \`style={{ color: 'red', fontSize: 14 }}\``,
  whyWeNeedIt: `Before JSX, writing React looked like this:

\`\`\`js
React.createElement('div', { className: 'card' },
  React.createElement('h2', null, 'Title'),
  React.createElement('p', null, 'Content')
)
\`\`\`

With JSX:
\`\`\`jsx
<div className="card">
  <h2>Title</h2>
  <p>Content</p>
</div>
\`\`\`

JSX makes component trees readable, maintainable, and reviewable. Without it, deeply nested UIs become unreadable noise. It also enables tooling — linters, formatters, and IDEs understand JSX structure.`,
  realWorldUsage: `JSX is used in every React component in every React project. In enterprise apps:

- **Conditional rendering** — \`{isLoggedIn && <Dashboard />}\` or ternaries
- **List rendering** — \`{items.map(item => <Card key={item.id} data={item} />)}\`
- **Dynamic class names** — \`className={\`btn \${variant}\`}\` or libraries like \`clsx\`
- **Spreading props** — \`<Input {...register('email')} />\` (React Hook Form pattern)
- **Fragments** — \`<><Header /><Main /><Footer /></>\` when no wrapper div is needed`,
  howItWorks: `**Compilation pipeline:**

1. You write JSX in \`.tsx\` / \`.jsx\` files
2. Babel (or SWC/esbuild) transforms JSX to \`React.createElement()\` calls
3. React 17+ new JSX transform auto-imports from \`react/jsx-runtime\` — no manual \`import React\` needed
4. At runtime, \`createElement\` returns a plain JS object: \`{ type, props, key, ref }\`
5. React's reconciler compares these objects to the previous render (diffing)
6. Only changed DOM nodes are updated

**Key rules:**
- Every JSX expression must have a single root element (or Fragment)
- JavaScript expressions go inside \`{}\` — not statements (no \`if\`, \`for\` directly)
- \`null\`, \`undefined\`, \`false\` render nothing — useful for conditional rendering`,
  example: {
    title: 'JSX Patterns You Will Use Every Day',
    description: 'From basic syntax to real-world conditional and list rendering patterns.',
    code: [
      {
        label: 'JSX Fundamentals',
        language: 'tsx',
        code: `// JSX compiles to: React.createElement('div', { className: 'card' }, ...)
const Card = ({ title, count, active }: CardProps) => (
  <div
    className={\`card \${active ? 'card--active' : ''}\`}
    style={{ borderRadius: 8 }}
  >
    {/* Comments inside JSX use this syntax */}
    <h2 className="card__title">{title}</h2>

    {/* Conditional rendering — ternary */}
    {count > 0
      ? <span className="badge">{count}</span>
      : <span className="badge badge--empty">0</span>
    }

    {/* Short-circuit: only renders when active is true */}
    {active && <span className="status">Active</span>}
  </div>
);`,
      },
      {
        label: 'List Rendering — The key Prop',
        language: 'tsx',
        code: `interface User { id: string; name: string; role: string; }

const UserList = ({ users }: { users: User[] }) => (
  <ul className="user-list">
    {users.map((user) => (
      // key must be stable, unique, and NOT the array index (unless list is static)
      <li key={user.id} className="user-list__item">
        <strong>{user.name}</strong>
        <span className="role-badge">{user.role}</span>
      </li>
    ))}
  </ul>
);

// BAD — index as key causes bugs when list reorders
{users.map((user, index) => <li key={index}>...</li>)}

// GOOD — stable ID from data
{users.map((user) => <li key={user.id}>...</li>)}`,
      },
      {
        label: 'Real Project — Dynamic Form Field',
        language: 'tsx',
        code: `interface FieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormField = ({
  label,
  name,
  type = 'text',
  error,
  required = false,
  disabled = false,
}: FieldProps) => (
  <div className={\`field \${error ? 'field--error' : ''}\`}>
    <label htmlFor={name} className="field__label">
      {label}
      {required && <span className="field__required" aria-hidden>*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={error ? \`\${name}-error\` : undefined}
      className="field__input"
    />
    {error && (
      <p id={\`\${name}-error\`} className="field__error" role="alert">
        {error}
      </p>
    )}
  </div>
);`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is JSX HTML?',
      answer: 'No. JSX looks like HTML but it compiles to JavaScript. Key differences: className not class, htmlFor not for, camelCase event names (onClick not onclick), self-closing required, inline styles are objects not strings. Treat JSX as JavaScript with HTML-like syntax, not HTML.',
    },
    {
      question: 'Why can I not use if statements directly in JSX?',
      answer: 'JSX curly braces accept expressions, not statements. An if block is a statement. Use ternaries (condition ? a : b) for inline conditionals, or move complex logic to a variable above the return statement. For multi-branch logic, a helper function returning JSX is clearest.',
    },
    {
      question: 'Why does rendering 0 show the number on screen?',
      answer: 'Short-circuit {count && <Component />} evaluates to 0 (falsy number) when count is 0 — and React renders 0 as text. Fix: use {count > 0 && <Component />} or {!!count && <Component />}. This is one of the most common JSX bugs in production.',
    },
  ],
  productionIssues: [
    '**Bug: Rendering 0 unexpectedly** — {items.length && <List />} renders "0" when array is empty. Fix: {items.length > 0 && <List />}.',
    '**Bug: Missing key prop in lists** — Causes incorrect DOM updates during reorders/deletions. Always use stable unique IDs, never array index for dynamic lists.',
    '**Bug: Mutating objects in JSX** — Passing new object literals as props on every render ({style={{ color: \'red\' }}) creates new references each render, breaking memoization. Extract to constants outside the component.',
    '**Performance: Inline arrow functions in JSX** — <Button onClick={() => handleClick(id)} /> creates a new function every render. Fine for most cases, but breaks React.memo. Use useCallback if the child is memoized.',
  ],
  bestPractices: [
    'Keep JSX readable — if your return statement is longer than 40 lines, extract sub-components',
    'Use Fragments (<></>) instead of wrapper divs to avoid unnecessary DOM nodes',
    'Always provide meaningful key props for list items — use entity IDs, never array index',
    'Use clsx or classnames library for dynamic class names — avoids messy template literal strings',
    'Extract complex conditional logic to named variables above the return — improves readability',
    'Use htmlFor on labels and id on inputs — JSX accessibility matters from day one',
  ],
  architectNote: `JSX is the most read and reviewed code in your codebase — every PR reviewer reads it. Invest in JSX clarity. A component\'s JSX should tell a story: what is being rendered, under what conditions, with what data. If you need a comment to explain a JSX block, consider extracting it into a named sub-component instead. In large teams, consistent JSX patterns (how you handle conditionals, lists, and props) reduce cognitive load significantly. Establish a team style guide for JSX early.`,
  faqs: [
    {
      question: 'Do I need to import React in every file with JSX?',
      answer: 'Not since React 17. The new JSX transform auto-imports the necessary runtime. If you are on React 16 or older, yes — import React from \'react\' is required at the top of every JSX file.',
    },
    {
      question: 'Can I write JSX without Babel?',
      answer: 'Technically yes — you can write React.createElement() calls directly. But no one does this in practice. Every modern React setup (Vite, CRA, Next.js) includes Babel or SWC for JSX transformation. It is a non-issue in real projects.',
    },
    {
      question: 'What is the difference between JSX and TSX?',
      answer: '.jsx is JSX in JavaScript. .tsx is JSX in TypeScript. The only difference is TypeScript type-checking. In modern projects, use .tsx for all component files — even if you are not heavily using TypeScript yet, it is easier to migrate.',
    },
    {
      question: 'Why does JSX use className instead of class?',
      answer: 'Because class is a reserved keyword in JavaScript (used for ES6 classes). Since JSX compiles to JavaScript, using class would create a syntax conflict. React chose className as the equivalent. This is one of the first things new React developers learn.',
    },
  ],
  keyTakeaways: [
    'JSX is syntactic sugar — it compiles to React.createElement() calls',
    'JSX is not HTML — use className, htmlFor, camelCase events, and self-closing tags',
    'Curly braces {} embed JavaScript expressions — not statements',
    'Always use stable unique keys for list items — never array index for dynamic lists',
    'Short-circuit {count && <X />} renders "0" when count is 0 — use {count > 0 && <X />}',
    'Fragments avoid unnecessary wrapper DOM nodes — prefer <></> over <div>',
    'React 17+ new JSX transform means no manual import React needed',
  ],
  relatedTopics: ['react-components', 'react-props', 'react-state'],
};
