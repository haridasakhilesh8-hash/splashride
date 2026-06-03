import type { TopicContent } from '../../types';

export const reactContextApi: TopicContent = {
  slug: 'react-context',
  title: 'Context API',
  description: 'Master React Context — the built-in solution for sharing state across the component tree without prop drilling. Learn when to use it, when not to, and how senior engineers implement it in production.',
  applicableVersions: ['React 16.3+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Context lets you pass data to any component in the tree without threading it through every intermediate component as props. It is perfect for truly global data: the logged-in user, the current theme, the selected language. It is NOT a replacement for all state management — for frequently-changing data, it causes performance problems.',
  whatIsIt: `React Context is a mechanism for making a value available to any component in a subtree, without passing it explicitly through every intermediate component.

**Three parts:**
1. \`createContext(defaultValue)\` — creates the context object
2. \`<Context.Provider value={...}>\` — wraps the tree and provides the value
3. \`useContext(Context)\` — reads the value in any descendant component

When the Provider\'s value changes, all components consuming that context re-render. This is both the power and the limitation of Context.`,
  whyWeNeedIt: `Prop drilling — passing data through many intermediate components that don\'t use it — becomes painful at scale:

\`\`\`
App (has user)
  └─ Layout (passes user)
      └─ Sidebar (passes user)
          └─ NavMenu (passes user)
              └─ UserAvatar (FINALLY uses user)
\`\`\`

Context eliminates the middle layers:
\`\`\`
App (provides user via Context)
  └─ Layout
      └─ Sidebar
          └─ NavMenu
              └─ UserAvatar (reads user from Context directly)
\`\`\``,
  realWorldUsage: `Context is ideal for data that is:
- **Truly global** — the authenticated user, feature flags, theme
- **Infrequently changing** — does not update on every keystroke or scroll
- **Needed deep in the tree** — would require 3+ levels of prop drilling

Real examples:
- \`AuthContext\` — current user, login(), logout()
- \`ThemeContext\` — 'light' | 'dark', toggleTheme()
- \`ToastContext\` — showToast(), dismissToast()
- \`PermissionsContext\` — user permissions derived from role
- \`LocaleContext\` — current language, t() translation function`,
  howItWorks: `1. \`createContext\` creates a context object with a default value (used when no Provider is above)
2. The \`Provider\` component accepts a \`value\` prop and makes it available to all descendants
3. \`useContext\` subscribes the component to the context — it re-renders whenever the value changes
4. If the value is an object, the entire object is compared by reference — a new object on every render causes all consumers to re-render

**Performance pattern:**
Split contexts by update frequency. An AuthContext (rarely changes) and a CartContext (changes on every item add) should be separate. If combined, every cart update re-renders auth consumers.`,
  example: {
    title: 'Auth Context — Production Pattern',
    description: 'A complete, type-safe auth context with the provider pattern.',
    code: [
      {
        label: 'Context Definition and Provider',
        language: 'tsx',
        code: `interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'adjuster' | 'viewer';
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Default value is used when no Provider is above — useful for testing
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    restoreSession()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  // Memoize value to prevent re-renders when parent re-renders
  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook — throws if used outside Provider
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}`,
      },
      {
        label: 'Toast Notification Context',
        language: 'tsx',
        code: `interface Toast { id: string; message: string; type: 'success' | 'error' | 'info'; }
interface ToastContextValue {
  showToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => dismissToast(id), 5000); // auto-dismiss
  }, []);

  const dismissToast = useCallback((id: string) =>
    setToasts(prev => prev.filter(t => t.id !== id)), []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

// Usage anywhere in the app
function SaveButton({ onSave }: { onSave: () => Promise<void> }) {
  const { showToast } = useToast();
  const handleSave = async () => {
    try { await onSave(); showToast('Saved successfully', 'success'); }
    catch { showToast('Failed to save', 'error'); }
  };
  return <button onClick={handleSave}>Save</button>;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Context a state management solution?',
      answer: 'Context is a dependency injection mechanism, not a state manager. It provides a way to pass values down the tree. The state itself lives in useState or useReducer inside the Provider. For complex state that changes frequently, Context alone causes performance problems — use Zustand or Redux instead.',
    },
    {
      question: 'Why does Context cause too many re-renders?',
      answer: 'When a Context value changes, ALL consumers re-render — even if they only use part of the value that did not change. Fix: (1) Split contexts by concern, (2) Memoize the context value with useMemo, (3) Use a library like Zustand that has built-in selector support.',
    },
    {
      question: 'What is the default value of createContext used for?',
      answer: 'The default value is used when a component calls useContext but there is no matching Provider above it in the tree. It is useful for testing components in isolation without wrapping them in a Provider. In production, components should always be within a Provider — throw an error if they are not.',
    },
  ],
  productionIssues: [
    '**Performance: Entire context value object is new on every render** — If the Provider renders a new object literal as value, all consumers re-render every time. Fix: memoize the value with useMemo.',
    '**Performance: One large context for everything** — Combining user, theme, cart, and notifications in one context means a cart update re-renders all theme consumers. Split contexts by update frequency.',
    '**Bug: Missing Provider** — useContext returns the default value (often null) when no Provider is above. Always add a null check or throw a descriptive error in the custom hook.',
    '**Scalability: Context for server state** — Using Context to share API data that needs caching, refetching, and invalidation is the wrong tool. Use React Query for server state.',
  ],
  bestPractices: [
    'Always create a custom hook (useAuth, useTheme) to consume context — never useContext directly in components',
    'Throw a descriptive error in the custom hook if the Provider is missing',
    'Memoize the context value with useMemo to prevent unnecessary re-renders',
    'Split contexts by concern and update frequency',
    'Use Context for truly global, infrequently-changing data only',
    'For frequently-changing or complex state, use Zustand or Redux',
    'Co-locate the context, provider, and custom hook in one file',
  ],
  architectNote: `Context is a tool, not a state management solution. Use it for data that is truly global and changes infrequently: auth user, theme, locale, feature flags. For anything that changes frequently (search input, filter state, cart contents) or needs complex update logic, use Zustand — it is tiny (1KB), simple, and has much better performance characteristics. The pattern I recommend: Context for injection (who is the user, what is the theme), Zustand for application state (what is in the cart, what filters are active).`,
  faqs: [
    {
      question: 'When should I use Context vs Zustand vs Redux?',
      answer: 'Context: global data that changes rarely (auth, theme, locale). Zustand: application state that changes frequently and needs to be shared (cart, filters, UI state). Redux: very complex state with time-travel debugging needs, or large teams that need strict conventions. Most apps need Context + Zustand. Redux is rarely necessary in 2024.',
    },
    {
      question: 'Can I have multiple contexts?',
      answer: 'Yes — and you should. One context per concern is the right pattern. AuthContext, ThemeContext, ToastContext, and PermissionsContext are all separate. This prevents unrelated updates from causing re-renders across all consumers.',
    },
    {
      question: 'How do I test components that use Context?',
      answer: 'Wrap the component in the Provider in your test: render(<AuthProvider><ComponentUnderTest /></AuthProvider>). For unit tests, you can also create a mock provider that accepts a value prop, giving you full control over the context value in each test.',
    },
  ],
  keyTakeaways: [
    'Context is a dependency injection mechanism — not a state manager',
    'Use for global, infrequently-changing data: auth, theme, locale',
    'Always wrap in a custom hook — never useContext directly in components',
    'Memoize the context value to prevent unnecessary re-renders',
    'Split contexts by concern and update frequency',
    'For frequently-changing state, use Zustand instead',
    'Always throw a descriptive error if the Provider is missing',
  ],
  relatedTopics: ['react-state', 'react-redux-toolkit', 'react-zustand', 'react-custom-hooks'],
};
