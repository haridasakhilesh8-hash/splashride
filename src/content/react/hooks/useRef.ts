import type { TopicContent } from '../../types';

export const reactUseRef: TopicContent = {
  slug: 'react-hooks-useref',
  title: 'useRef',
  description: 'Master useRef — React\'s hook for values that persist between renders without causing re-renders. Learn DOM access, mutable values, and the patterns that senior engineers use in real applications.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'useRef returns a mutable object { current: value } that persists across renders. Unlike state, changing a ref does NOT trigger a re-render. Use it for two things: accessing DOM elements directly, and storing values that need to persist between renders without causing re-renders (timers, previous values, flags).',
  whatIsIt: `\`useRef(initialValue)\` returns a plain object \`{ current: initialValue }\`. The object persists for the lifetime of the component. You can read and write \`ref.current\` freely — it will not trigger a re-render.

**Two main uses:**

**1. DOM access:**
\`\`\`tsx
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} />
inputRef.current?.focus();
\`\`\`

**2. Mutable values without re-render:**
\`\`\`ts
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
timerRef.current = setInterval(tick, 1000);
clearInterval(timerRef.current);
\`\`\``,
  whyWeNeedIt: `Some values need to persist between renders but should not cause re-renders:

- A timer ID (setInterval/setTimeout) — you need to clear it later, but storing it in state would cause a re-render
- A previous value (to compare with current)
- A flag to prevent double-submission or track if a component is still mounted
- A third-party library instance (Chart.js, Stripe, maps)

And sometimes you need to interact with the actual DOM node — something React\'s virtual DOM intentionally abstracts away but occasionally you need to bypass: focus management, scroll position, canvas drawing, integrating non-React libraries.`,
  realWorldUsage: `In a real banking application:

- Focus the first invalid form field after submission attempt
- Store a WebSocket instance and close it on unmount
- Track whether a payment form has been submitted (prevent double-submit)
- Store the previous account balance to animate the difference
- Hold a Chart.js instance for a spending trend chart
- Scroll a message list to the bottom when new messages arrive`,
  howItWorks: `React creates the \`{ current }\` object once and returns the same object on every render. When you write \`ref.current = newValue\`, you are mutating the object directly — React does not know about this change and does not re-render.

**DOM refs:**
When you pass a ref to a JSX element\'s \`ref\` prop, React sets \`ref.current\` to the DOM node after mounting, and sets it back to \`null\` after unmounting. The DOM node is available in useEffect (after render) but not during render.

**Forwarding refs:**
To pass a ref through a custom component to its inner DOM element, use \`React.forwardRef\`. This is essential for design system components.`,
  example: {
    title: 'useRef Patterns in Production',
    description: 'DOM access, mutable values, and the previous-value pattern.',
    code: [
      {
        label: 'Focus Management and DOM Access',
        language: 'tsx',
        code: `function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus after clearing
  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="search"
        placeholder="Search policies..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <button onClick={handleClear} aria-label="Clear search">✕</button>
    </div>
  );
}`,
      },
      {
        label: 'Prevent Double Submission',
        language: 'tsx',
        code: `function PaymentForm() {
  const isSubmittingRef = useRef(false); // ref, not state — no re-render needed
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard against double-click or rapid re-submission
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      await processPayment(formData);
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}`,
      },
      {
        label: 'Previous Value Pattern',
        language: 'tsx',
        code: `function usePrevious<T>(value: T): T | undefined {
  const prevRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    prevRef.current = value; // update after render
  });

  return prevRef.current; // returns value from previous render
}

// Usage: animate the difference between old and new balance
function AccountBalance({ balance }: { balance: number }) {
  const previousBalance = usePrevious(balance);
  const diff = previousBalance !== undefined ? balance - previousBalance : 0;

  return (
    <div className="balance">
      <span>{formatCurrency(balance)}</span>
      {diff !== 0 && (
        <span className={diff > 0 ? 'positive' : 'negative'}>
          {diff > 0 ? '+' : ''}{formatCurrency(diff)}
        </span>
      )}
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use useRef vs useState?',
      answer: 'Use useState when the value change should trigger a UI update (re-render). Use useRef when the value change should NOT trigger a re-render: timer IDs, previous values, DOM nodes, flags, third-party library instances. If you are not sure, start with useState. If you find yourself thinking "I need this value but I do not want a re-render", that is useRef.',
    },
    {
      question: 'Can I read ref.current during render?',
      answer: 'For DOM refs, no — the DOM does not exist during render, so ref.current is null. For mutable value refs, technically yes, but it is a code smell. Refs are for values accessed in event handlers and effects, not during render. If you need a value during render, use state.',
    },
    {
      question: 'Why does my ref.current show null on first render?',
      answer: 'DOM refs are null during render because the DOM does not exist yet. React sets ref.current to the DOM node after the component mounts. Access DOM refs inside useEffect (runs after mount) or event handlers (triggered after mount), never during render.',
    },
  ],
  productionIssues: [
    '**Bug: Reading DOM ref during render** — ref.current is null during render. Access DOM refs in useEffect or event handlers only.',
    '**Bug: Forgetting to clean up** — Storing a timer or subscription in a ref and forgetting to clear it in useEffect cleanup causes memory leaks.',
    '**Misuse: Using ref instead of state for UI values** — If a value should update the UI when it changes, it must be state. Refs do not trigger re-renders.',
    '**Misuse: Forwarding refs manually** — Passing a ref as a regular prop (not using React.forwardRef) does not work. React has special handling for the ref prop.',
  ],
  bestPractices: [
    'Use TypeScript generics for typed refs: useRef<HTMLInputElement>(null)',
    'Always initialise DOM refs with null: useRef<HTMLElement>(null)',
    'Use optional chaining when accessing DOM refs: ref.current?.focus()',
    'Clean up timers and subscriptions stored in refs inside useEffect cleanup',
    'Use React.forwardRef to expose refs from custom components in design systems',
    'Prefer useRef over a module-level variable for instance-specific mutable values',
  ],
  architectNote: `useRef is the correct tool when you need to "step outside" React\'s rendering model. The key insight: React owns the virtual DOM and state. Sometimes you need to interact with the real DOM (accessibility, animations, third-party libs) or store values that are truly implementation details of a component (timers, flags). useRef is the bridge. Use it deliberately and document why — a ref in the codebase is a signal that something non-standard is happening.`,
  faqs: [
    {
      question: 'What is React.forwardRef and when do I need it?',
      answer: 'React.forwardRef lets a parent component pass a ref to a DOM element inside a child component. You need it when building reusable input, button, or other interactive components in a design system that consumers need to focus or measure. Without forwardRef, passing ref to a custom component does nothing.',
    },
    {
      question: 'Can I store objects in a ref?',
      answer: 'Yes. ref.current can hold any value — primitives, objects, arrays, class instances. Common use: storing a Chart.js or Stripe instance that should persist for the component lifetime without triggering re-renders.',
    },
  ],
  keyTakeaways: [
    'useRef returns { current: value } — changing current does NOT trigger a re-render',
    'Use for DOM access, timers, flags, and third-party library instances',
    'DOM refs are null during render — access them in useEffect or event handlers',
    'useState when change should update UI; useRef when change should not',
    'Always clean up timers/subscriptions stored in refs',
    'Use React.forwardRef to expose refs from custom components',
  ],
  relatedTopics: ['react-hooks-usestate', 'react-hooks-useeffect', 'react-hooks-usecallback'],
};
