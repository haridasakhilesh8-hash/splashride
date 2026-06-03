import type { TopicContent } from '../../types';

export const reactZustand: TopicContent = {
  slug: 'react-zustand',
  title: 'Zustand',
  description: 'Master Zustand — the lightweight, modern state management library that most teams should use instead of Redux. Learn store design, selectors, persistence, and enterprise patterns.',
  applicableVersions: ['React 16+', 'React 18', 'React 19', 'Zustand 4.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Zustand is a tiny (1KB) state management library that gives you a global store without the boilerplate of Redux. You define state and actions in one place, and any component can subscribe to exactly the slice it needs. It is the recommended choice for most React apps in 2024.',
  whatIsIt: `Zustand provides a simple API to create a global state store:

\`\`\`ts
const useStore = create<State>((set, get) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}));
\`\`\`

- **\`create\`** — creates a hook that components use to subscribe to the store
- **\`set\`** — updates state (shallow merges by default, like setState)
- **\`get\`** — reads current state inside actions (useful for derived logic)
- **Selectors** — \`useStore(state => state.count)\` subscribes to only the count field; the component only re-renders when count changes`,
  whyWeNeedIt: `Context API causes all consumers to re-render when the value changes. Redux requires actions, action types, reducers, and selectors for every piece of state. Zustand sits in the sweet spot:

- **No boilerplate** — define state and actions in one function
- **Selector-based subscriptions** — components only re-render when their specific slice changes
- **No Provider needed** — the store is a module-level singleton
- **Works outside React** — actions can be called from anywhere (event handlers, utility functions, other stores)
- **1KB** — negligible bundle impact`,
  realWorldUsage: `Zustand is ideal for:

- **Shopping cart** — items, quantities, totals, add/remove actions
- **UI state** — sidebar open/closed, active modal, selected rows in a table
- **Filter state** — search query, selected filters, sort order shared across a page
- **User preferences** — theme, language, notification settings (with persist middleware)
- **Multi-step forms** — form data persisted across steps`,
  howItWorks: `Zustand uses a pub/sub model. The store is a JavaScript object. When you call \`set\`, Zustand:
1. Merges the new state shallowly
2. Notifies all subscribers
3. Each subscriber runs its selector function
4. If the selected value changed (by reference), the component re-renders

**No Provider:**
Unlike Context, Zustand stores are module-level singletons. You import the hook directly. This makes it simpler to use but also means all instances of the app share the same store (relevant for SSR/testing).`,
  example: {
    title: 'Zustand in a Real Application',
    description: 'Store definition, selectors, async actions, and persistence.',
    code: [
      {
        label: 'Cart Store',
        language: 'tsx',
        code: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  // Derived getters
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set(state => {
        const existing = state.items.find(i => i.id === item.id);
        if (existing) {
          return { items: state.items.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )};
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),

      removeItem: (id) => set(state => ({
        items: state.items.filter(i => i.id !== id),
      })),

      updateQuantity: (id, quantity) => set(state => ({
        items: quantity <= 0
          ? state.items.filter(i => i.id !== id)
          : state.items.map(i => i.id === id ? { ...i, quantity } : i),
      })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'cart-storage' } // persists to localStorage
  )
);

// Component — subscribes only to items.length, not the full items array
function CartIcon() {
  const count = useCartStore(state => state.totalItems());
  return <button>Cart ({count})</button>;
}`,
      },
      {
        label: 'Async Actions and Loading State',
        language: 'tsx',
        code: `interface PolicyStore {
  policies: Policy[];
  loading: boolean;
  error: string | null;
  fetchPolicies: (userId: string) => Promise<void>;
  updateStatus: (id: string, status: PolicyStatus) => Promise<void>;
}

export const usePolicyStore = create<PolicyStore>()((set, get) => ({
  policies: [],
  loading: false,
  error: null,

  fetchPolicies: async (userId) => {
    set({ loading: true, error: null });
    try {
      const policies = await policyApi.getAll(userId);
      set({ policies, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  updateStatus: async (id, status) => {
    // Optimistic update
    const previous = get().policies;
    set({ policies: previous.map(p => p.id === id ? { ...p, status } : p) });

    try {
      await policyApi.updateStatus(id, status);
    } catch (err) {
      set({ policies: previous, error: (err as Error).message }); // rollback
    }
  },
}));

// Fine-grained subscriptions — only re-renders when loading changes
function LoadingIndicator() {
  const loading = usePolicyStore(state => state.loading);
  return loading ? <Spinner /> : null;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does Zustand need a Provider?',
      answer: 'No. Zustand stores are module-level singletons. You just import the hook and use it anywhere. This is simpler than Context/Redux but means all app instances share the same store — relevant for SSR (use createStore instead of create for SSR-safe stores) and testing (reset the store between tests).',
    },
    {
      question: 'How do I prevent unnecessary re-renders with Zustand?',
      answer: 'Use selectors: useStore(state => state.count) instead of useStore(). With a selector, the component only re-renders when the selected value changes. Without a selector, the component re-renders on any store update. For objects, use the shallow equality helper: useStore(state => state.user, shallow).',
    },
    {
      question: 'Should I put everything in one Zustand store?',
      answer: 'No. Create separate stores per concern: useCartStore, usePolicyStore, useUIStore. This keeps stores focused, easier to test, and prevents unrelated updates from triggering re-renders across unrelated consumers.',
    },
  ],
  productionIssues: [
    '**Re-renders without selectors** — useStore() without a selector subscribes to the entire store. Any update re-renders the component. Always use selectors.',
    '**Object selector instability** — useStore(state => ({ a: state.a, b: state.b })) creates a new object every render. Fix: use the shallow import from zustand/shallow.',
    '**SSR issues** — Module-level stores cause hydration mismatches in Next.js. Use createStore with a React context wrapper for SSR-safe Zustand.',
    '**Testing** — Zustand stores persist between tests. Reset the store in beforeEach: useStore.setState(initialState).',
  ],
  bestPractices: [
    'Always use selectors to subscribe to specific slices of state',
    'Use shallow from zustand/shallow for object selectors',
    'Separate stores by domain concern — not one giant store',
    'Use the persist middleware for state that should survive page refreshes',
    'Reset stores in test beforeEach hooks',
    'For SSR (Next.js), use the context pattern for Zustand stores',
    'Keep actions close to the state they modify — define them inside the store',
  ],
  architectNote: `Zustand is the right default choice for state management in 2024. It is small, simple, and powerful enough for the vast majority of React applications. The pattern I use in every project: Context for dependency injection (auth, theme), Zustand for application state (cart, filters, UI), React Query for server state (API data). This three-layer approach covers every state management need without the overhead of Redux.`,
  faqs: [
    {
      question: 'Can I use Zustand with TypeScript?',
      answer: 'Yes, and it has excellent TypeScript support. Define your store interface and pass it as a generic: create<StoreType>()((set) => ({...})). Note the double parentheses — this is required for TypeScript inference to work correctly.',
    },
    {
      question: 'How does Zustand compare to Jotai and Recoil?',
      answer: 'Zustand uses a single store with actions (Redux-like but simpler). Jotai and Recoil use atomic state — small independent atoms that compose together (more like useState but global). Zustand is better for complex state with many actions. Jotai is better for independent pieces of global state. Both are excellent; Zustand has more adoption and a larger ecosystem.',
    },
  ],
  keyTakeaways: [
    'Zustand is a 1KB global state manager with no boilerplate and no Provider needed',
    'Always use selectors to subscribe to specific slices — prevents unnecessary re-renders',
    'Use shallow for object selectors to prevent reference-based re-renders',
    'Separate stores by domain — not one giant store',
    'persist middleware for localStorage persistence',
    'The recommended stack: Context (injection) + Zustand (app state) + React Query (server state)',
  ],
  relatedTopics: ['react-context', 'react-redux-toolkit', 'react-state', 'react-hooks-usestate'],
};
