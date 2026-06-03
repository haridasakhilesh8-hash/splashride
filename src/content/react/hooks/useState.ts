import type { TopicContent } from '../../types';

export const reactUseState: TopicContent = {
  slug: 'react-hooks-usestate',
  title: 'useState',
  description: 'Master useState — the most fundamental React hook. Learn how it works under the hood, the patterns senior engineers use, and the bugs that trip up even experienced developers.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'useState is a hook that adds state to a function component. It returns a pair: the current value and a function to update it. Calling the updater function tells React to re-render the component with the new value. It is the most-used hook in every React codebase.',
  whatIsIt: `\`useState\` is a React hook that lets you add reactive state to a function component.

\`\`\`ts
const [value, setValue] = useState<Type>(initialValue);
\`\`\`

- \`value\` — the current state (read-only inside this render)
- \`setValue\` — the updater function that schedules a re-render
- \`initialValue\` — the value on the first render only (ignored on subsequent renders)

**Two update forms:**
- \`setValue(newValue)\` — direct update
- \`setValue(prev => prev + 1)\` — functional update, safe when new value depends on old value`,
  whyWeNeedIt: `Before hooks, only class components could have state. Function components were purely presentational. useState changed that — now any function can hold reactive data.

Without useState, you cannot build:
- A form that tracks user input
- A button that shows loading state
- A modal that opens and closes
- A counter, a toggle, a dropdown — any interactive UI element

useState is the foundation of all React interactivity.`,
  realWorldUsage: `In an e-commerce checkout flow:

- \`const [step, setStep] = useState<1|2|3>(1)\` — which checkout step is active
- \`const [cart, setCart] = useState<CartItem[]>([])\` — items in the cart
- \`const [coupon, setCoupon] = useState('')\` — coupon code input
- \`const [processing, setProcessing] = useState(false)\` — payment in flight
- \`const [error, setError] = useState<string | null>(null)\` — payment error message`,
  howItWorks: `**Under the hood:**

React maintains a list of state slots for each component instance. On the first render, useState initialises the slot. On subsequent renders, it returns the current value from that slot. This is why hooks must always be called in the same order — React uses call order to match hooks to their slots.

**Batching (React 18+):**
Multiple setState calls in the same event handler are batched — React runs only one re-render for all of them. In React 18, this batching also applies inside async functions, timeouts, and promises.

**Object state:**
useState does a shallow replace, not a deep merge. If your state is an object, you must spread the previous state: \`setUser(prev => ({ ...prev, name: 'Alice' }))\`. Forgetting the spread overwrites the entire object.`,
  example: {
    title: 'useState Patterns You Will Use Daily',
    description: 'Primitives, objects, arrays, and the async state pattern.',
    code: [
      {
        label: 'Primitives, Booleans, Enums',
        language: 'tsx',
        code: `// Boolean toggle
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(prev => !prev);

// String input
const [search, setSearch] = useState('');

// Enum-like state
type Tab = 'overview' | 'claims' | 'documents';
const [activeTab, setActiveTab] = useState<Tab>('overview');

// Nullable async result
const [user, setUser] = useState<User | null>(null);
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(true);`,
      },
      {
        label: 'Object State — Partial Updates',
        language: 'tsx',
        code: `interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const [form, setForm] = useState<ProfileForm>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
});

// Update a single field — spread is REQUIRED
const handleChange = (field: keyof ProfileForm) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

// WRONG — this replaces the entire object
// setForm({ firstName: 'Alice' }); // loses all other fields`,
      },
      {
        label: 'Array State — Immutable Updates',
        language: 'tsx',
        code: `const [items, setItems] = useState<TodoItem[]>([]);

// Add
const addItem = (text: string) =>
  setItems(prev => [...prev, { id: crypto.randomUUID(), text, done: false }]);

// Remove
const removeItem = (id: string) =>
  setItems(prev => prev.filter(item => item.id !== id));

// Update
const toggleItem = (id: string) =>
  setItems(prev =>
    prev.map(item => item.id === id ? { ...item, done: !item.done } : item)
  );

// WRONG — mutating state directly
// items.push(newItem);       // no re-render
// items[0].done = true;      // no re-render`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my state show the old value right after setState?',
      answer: 'setState is asynchronous — it schedules a re-render but the current render\'s variable is already captured. console.log(count) after setCount(5) still shows the old count. The new value is available in the next render. For logic that needs the new value immediately, compute it as a local variable first.',
    },
    {
      question: 'What is the stale closure problem?',
      answer: 'A function defined inside a component captures the state value at the time it was created. If state updates but the function is not recreated, it still sees the old value. Fix: use the functional update form setCount(prev => prev + 1) so the update always uses the latest value, regardless of closure.',
    },
    {
      question: 'When should I use multiple useState vs one object?',
      answer: 'Use multiple useState for independent values that change separately (isOpen, activeTab, searchTerm). Use one object for related values that often change together (form fields, async state: {data, loading, error}). The rule: if you always update them together, group them.',
    },
  ],
  productionIssues: [
    '**Bug: Stale state in async callbacks** — An API callback captures the state from when the effect ran. By the time it resolves, state has changed. Fix: use functional updates or useRef to track the latest value.',
    '**Bug: Object state overwrite** — setUser({ name: "Alice" }) throws away all other user fields. Always spread: setUser(prev => ({ ...prev, name: "Alice" })).',
    '**Performance: Initialising state with expensive computation** — useState(computeHeavyValue()) runs on every render. Fix: pass a function useState(() => computeHeavyValue()) — runs only once.',
    '**Bug: State not updating in loops** — Calling setCount(count + 1) three times in a loop gives count + 1, not count + 3, because count is the same snapshot in all three calls. Fix: setCount(prev => prev + 1).',
  ],
  bestPractices: [
    'Use functional updates when new state depends on previous state',
    'Use lazy initialisation for expensive initial values: useState(() => fn())',
    'Group related state into objects; keep independent state separate',
    'Always spread object state when doing partial updates',
    'Use immutable array patterns (map, filter, spread) — never push/splice',
    'Name state variables clearly: isLoading not loading, selectedUserId not user',
    'Co-locate state with the component that uses it — do not hoist unnecessarily',
  ],
  architectNote: `useState is the right tool for local, component-specific state. The mistake teams make is using useState for everything — including server data, global UI state, and complex multi-step workflows. Server data belongs in React Query. Global UI state (sidebar open, theme) belongs in Context or Zustand. Complex workflows belong in useReducer. useState is powerful but has a clear scope: simple, local, component-owned state.`,
  faqs: [
    {
      question: 'Can I call useState conditionally?',
      answer: 'No. Hooks must be called unconditionally at the top level of your component. Calling useState inside an if block or loop violates the Rules of Hooks and causes React to misalign its internal hook slots, leading to bugs. ESLint\'s react-hooks/rules-of-hooks plugin catches this.',
    },
    {
      question: 'Is setState synchronous or asynchronous?',
      answer: 'The state update is asynchronous — React batches updates and applies them before the next render. However, React 18 guarantees that all state updates within an event handler are applied in a single re-render. The re-render itself happens synchronously after all updates are batched.',
    },
    {
      question: 'What happens if I call setState with the same value?',
      answer: 'React uses Object.is() to compare the new value to the current value. If they are the same, React bails out and does not re-render. This is why mutating state directly (array.push()) does not trigger a re-render — the reference is the same.',
    },
  ],
  keyTakeaways: [
    'useState returns [currentValue, updaterFunction] — always destructure',
    'The initial value is only used on the first render',
    'State updates are asynchronous — the new value is in the next render',
    'Use functional updates setState(prev => ...) when new state depends on old',
    'Never mutate state directly — create new objects and arrays',
    'Use lazy initialisation for expensive computations: useState(() => fn())',
    'Multiple setState calls in one event handler are batched into one re-render',
  ],
  relatedTopics: ['react-state', 'react-hooks-useeffect', 'react-hooks-usereducer', 'react-hooks-usememo'],
};
