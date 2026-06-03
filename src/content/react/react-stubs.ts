import type { TopicContent } from '../types';

export const reactProps: TopicContent = {
  slug: 'react-props',
  title: 'React Props',
  description: 'Learn how props work in React — the mechanism for passing data from parent to child components.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Props (short for properties) are how you pass data from a parent component to a child component. They\'re like function arguments — the parent decides what data to send, the child receives it as a read-only object. If state is the component\'s internal memory, props are the external inputs.',
  whatIsIt: `Props are **read-only inputs** passed to a component from its parent. Every React component receives a single \`props\` object. In modern React, we destructure it immediately:

- Props can be any JavaScript value: strings, numbers, booleans, objects, arrays, functions, or even other components (children)
- Props flow **one direction** — parent to child (unidirectional data flow)
- A component **must never modify its own props**
- The \`children\` prop is special — it represents the JSX between opening and closing tags`,
  whyWeNeedIt: `Props are what make components reusable. Without props, a \`Button\` component could only ever say "Click me" with a blue color. With props, the same Button can say anything, in any color, with any behavior.

Props enforce the **one-way data flow** principle — data flows down, events flow up. This makes React apps predictable and debuggable.`,
  realWorldUsage: `Props are used in every component you write. Common patterns:

- **Configuration props**: \`<Button variant="primary" size="lg" />\`
- **Data props**: \`<UserCard user={userData} />\`
- **Callback props**: \`<Input onChange={handleChange} />\`
- **Children**: \`<Modal><p>Content here</p></Modal>\`
- **Render props**: \`<DataTable renderRow={(row) => <CustomRow data={row} />} />\``,
  howItWorks: `When you write \`<Button label="Save" onClick={handleSave} />\`, React calls your Button function with \`{ label: "Save", onClick: handleSave }\` as the argument. The component reads from this object and renders accordingly.

**Default props** are set with default parameter values in the function signature.
**Prop types** are enforced with TypeScript interfaces — the best way to document what a component expects.`,
  example: {
    title: 'Props Patterns in Practice',
    description: 'Common prop patterns you\'ll use in every React project.',
    code: [
      {
        label: 'Typed Props with Defaults',
        language: 'tsx',
        code: `interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode; // alternative to label
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
}: ButtonProps) {
  const styles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={\`rounded font-medium \${styles[variant]} \${sizes[size]} \${
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''
      }\`}
    >
      {loading ? 'Loading...' : (children ?? label)}
    </button>
  );
}

// Usage
<Button label="Save Changes" variant="primary" onClick={handleSave} />
<Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
<Button label="Processing..." loading />`,
      },
      {
        label: 'Children & Render Props',
        language: 'tsx',
        code: `// Children prop — the most common composition pattern
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage — anything between the tags becomes children
<Card title="User Settings">
  <p>Update your profile information below.</p>
  <ProfileForm />
</Card>

// Render prop — pass a function that returns JSX
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={keyExtractor(item)}>{renderItem(item, i)}</li>
      ))}
    </ul>
  );
}

// Usage — caller controls how each item renders
<List
  items={users}
  keyExtractor={(u) => u.id}
  renderItem={(user) => <UserRow user={user} />}
/>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why can\'t I modify props directly?',
      answer: 'Props are read-only by design. If a child could change its props, the parent would have no way to know its data was mutated. This would make apps unpredictable. If you need to change something based on a prop, derive state from it or call a callback prop to ask the parent to change the value.',
    },
    {
      question: 'What is prop drilling and how do I avoid it?',
      answer: 'Prop drilling is passing props through multiple intermediate components that don\'t use them — just to get data to a deeply nested component. Avoid it with Context API (for global/shared state), component composition (pass JSX instead of data), or a state manager like Zustand.',
    },
    {
      question: 'What is the difference between props.children and a named slot prop?',
      answer: 'children is the default slot — content between opening and closing tags. Named slot props (like header={<Header />} or footer={<Footer />}) give you multiple named insertion points. Use children for the main content, named props for secondary slots.',
    },
  ],
  productionIssues: [
    'Passing new object/array references as props on every render — causes unnecessary re-renders of memoized children. Memoize the object with useMemo or define it outside the component.',
    'Boolean prop confusion — <Component disabled /> is the same as <Component disabled={true} />. Omitting the prop entirely means false.',
    'Spreading all props onto DOM elements — <div {...props}> can pass invalid HTML attributes and cause warnings. Only spread known HTML attributes.',
  ],
  bestPractices: [
    'Always type your props with TypeScript interfaces — it\'s documentation the compiler enforces.',
    'Use destructuring with defaults in the function signature, not inside the function body.',
    'Keep the number of props manageable — more than 7-8 props is a signal the component is doing too much.',
    'Prefer composition (children) over configuration (many boolean props).',
  ],
  architectNote: `The props API of a component is its public contract. Design it thoughtfully — changing props is a breaking change for all consumers.

**API design principle:** Start with the minimum props needed. Add more only when a real use case demands it. Every prop you add is a maintenance burden forever.`,
  faqs: [
    {
      question: 'Should I pass individual values or an object as props?',
      answer: 'Prefer individual props for primitive values and small sets. Pass an object when the values are naturally grouped (a user object, a config object). Avoid passing large objects just to avoid typing multiple props — it makes it harder to see what the component actually uses.',
    },
  ],
  keyTakeaways: [
    'Props are read-only inputs from parent to child',
    'Always type props with TypeScript interfaces',
    'children is a special prop — the content between tags',
    'Props flow down; callbacks flow up',
    'Avoid prop drilling — use Context or composition',
  ],
  relatedTopics: ['react-components', 'react-state', 'react-context'],
};

export const reactState: TopicContent = {
  slug: 'react-state',
  title: 'React State',
  description: 'Understand React state — the data that changes over time and drives UI updates. Learn useState, state patterns, and when to lift state.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'State is a component\'s internal memory — data that can change over time and causes the component to re-render when it does. If props are inputs from outside, state is data the component owns and manages itself. The golden rule: if a value needs to cause a UI update when it changes, it should be state.',
  whatIsIt: `State is **private, mutable data** that a component owns. Key characteristics:

- Initialized with a starting value
- Updated via a setter function (never mutated directly)
- When state changes, React re-renders the component
- State is local to the component — siblings and parents can't access it directly
- State persists between renders (unlike regular variables)

**When to use state vs other options:**
- Data that changes and affects the UI → \`useState\`
- Derived values (computed from state/props) → compute inline or \`useMemo\`
- Data that changes but doesn't affect UI → \`useRef\`
- Data shared across many components → Context or state manager`,
  whyWeNeedIt: `Without state, React components would be static — they'd render once and never update. State is what makes UIs interactive: toggle a menu, type in a form, load data from an API, increment a counter.`,
  realWorldUsage: `State is everywhere in real applications:
- Form field values
- Loading/error/success states for API calls
- UI state: isOpen, isExpanded, activeTab, selectedItem
- Pagination: currentPage, pageSize
- Filter/sort state`,
  howItWorks: `When you call \`setState(newValue)\`, React schedules a re-render. On the next render, \`useState\` returns the new value. React batches multiple setState calls in event handlers into a single re-render.

**Important:** State updates are asynchronous. Reading state immediately after setting it gives you the old value. If you need the new value, use the functional updater: \`setState(prev => prev + 1)\`.`,
  example: {
    title: 'State Patterns',
    description: 'Common state patterns from real React applications.',
    code: [
      {
        label: 'Async State Pattern',
        language: 'tsx',
        code: `import { useState } from 'react';

// Pattern: track loading/error/data as a group
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useAsyncState<T>(initial: T | null = null): [
  AsyncState<T>,
  {
    setLoading: () => void;
    setData: (data: T) => void;
    setError: (err: string) => void;
  }
] {
  const [state, setState] = useState<AsyncState<T>>({
    data: initial,
    loading: false,
    error: null,
  });

  return [
    state,
    {
      setLoading: () => setState({ data: null, loading: true, error: null }),
      setData: (data) => setState({ data, loading: false, error: null }),
      setError: (error) => setState({ data: null, loading: false, error }),
    },
  ];
}

// Usage
function UserList() {
  const [{ data: users, loading, error }, actions] = useAsyncState<User[]>();

  const loadUsers = async () => {
    actions.setLoading();
    try {
      const data = await fetchUsers();
      actions.setData(data);
    } catch (e) {
      actions.setError((e as Error).message);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;
  return <ul>{users?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
      },
      {
        label: 'Lifting State Up',
        language: 'tsx',
        code: `// When two siblings need to share state,
// lift it to their common parent.

// WRONG: state in both siblings — they can't sync
function TabA() {
  const [active, setActive] = useState(false); // isolated
}
function TabB() {
  const [active, setActive] = useState(false); // isolated
}

// CORRECT: state in parent, passed as props
function Tabs() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <TabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <TabContent activeTab={activeTab} />
    </div>
  );
}

function TabNav({ activeTab, onTabChange }: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const tabs = ['overview', 'details', 'history'];
  return (
    <nav>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={activeTab === tab ? 'active' : ''}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why doesn\'t my state update immediately after calling setState?',
      answer: 'setState is asynchronous — it schedules a re-render. The state variable still holds the old value for the rest of the current render. If you need to compute next state based on current state, use the functional form: setState(prev => prev + 1).',
    },
    {
      question: 'Should I store derived values in state?',
      answer: 'No — derived values should be computed from existing state/props, not stored separately. Storing derived state creates sync bugs (the derived state gets out of sync with the source). Compute it inline or with useMemo if expensive.',
    },
    {
      question: 'When should I use useReducer instead of useState?',
      answer: 'Use useReducer when state transitions are complex, when multiple values change together, or when the next state depends on the previous in non-trivial ways. For simple values, useState is cleaner.',
    },
  ],
  productionIssues: [
    'Mutating state directly — never do state.items.push(item). Always create a new reference: setItems([...state.items, item]).',
    'State initialization running on every render — if initial state is expensive to compute, use the lazy initializer: useState(() => expensiveComputation()).',
    'Race conditions in async state updates — two concurrent fetches can resolve out of order. Use AbortController or track a request ID.',
  ],
  bestPractices: [
    'Keep state as minimal as possible — derive everything you can.',
    'Group related state into objects: useState({ name: \'\', email: \'\' }) instead of two separate states.',
    'Lift state only as high as necessary — unnecessary lifting creates prop drilling.',
    'Use the functional updater form when new state depends on old state.',
  ],
  architectNote: `State management is where React architecture decisions get hard. The question is always: where does this state live?

**Decision tree:**
1. Is it local UI state (open/closed, active tab)? → useState in the component
2. Is it shared between a few nearby components? → Lift to common parent
3. Is it global app state (auth, theme, cart)? → Context or Zustand
4. Is it server state (API data)? → React Query / SWR`,
  faqs: [
    {
      question: 'What is the difference between state and a regular variable?',
      answer: 'A regular variable is reset to its initial value on every render. State persists between renders — React stores it outside the component function. Also, changing a regular variable doesn\'t cause a re-render; calling setState does.',
    },
  ],
  keyTakeaways: [
    'State is private, mutable data that persists between renders',
    'Never mutate state directly — always use the setter',
    'State updates are asynchronous — use functional updater for derived state',
    'Lift state to the common parent when siblings need to share it',
    'Derive values from state instead of storing redundant state',
  ],
  relatedTopics: ['react-hooks', 'react-components', 'react-context'],
};

export const reactContext: TopicContent = {
  slug: 'react-context',
  title: 'React Context API',
  description: 'Learn how Context solves prop drilling and enables global state sharing without external libraries.',
  applicableVersions: ['React 16.3+', 'React 18', 'React 19'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Context lets you share data across the component tree without passing props at every level. Think of it as a broadcast system — a Provider at the top broadcasts data, and any component below can tune in with useContext. Perfect for theme, auth, language, and other truly global data.',
  whatIsIt: `Context provides a way to pass data through the component tree without manually passing props at every level.

Three parts:
1. \`createContext(defaultValue)\` — creates the context object
2. \`<Context.Provider value={...}>\` — provides the value to all descendants
3. \`useContext(Context)\` — reads the current context value in any component`,
  whyWeNeedIt: `Without Context, sharing data with deeply nested components requires prop drilling — passing props through 5 intermediate components that don't use them. Context eliminates this by making the data available to any component in the subtree.`,
  realWorldUsage: `**Good uses of Context:**
- Authentication: current user, login/logout functions
- Theme: dark/light mode
- Locale/i18n: current language
- Feature flags
- Toast/notification system

**Bad uses of Context (use Zustand/Redux instead):**
- Frequently changing data (causes too many re-renders)
- Complex state with many actions`,
  howItWorks: `When a Provider's value changes, all components consuming that context re-render. This is why Context is better for slowly-changing data (theme, auth) than frequently-changing data (form state, list filters).`,
  example: {
    title: 'Auth Context Pattern',
    description: 'A production-quality auth context with TypeScript.',
    code: [
      {
        label: 'Auth Context',
        language: 'tsx',
        code: `import { createContext, useContext, useState, useCallback } from 'react';

interface User { id: string; name: string; email: string; role: string; }

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with undefined default (we'll guard against this)
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Provider component — wraps the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Invalid credentials');
    const userData = await response.json();
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    fetch('/api/auth/logout', { method: 'POST' });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — always use this instead of useContext directly
// It provides a better error message if used outside the provider
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Usage anywhere in the tree
function UserMenu() {
  const { user, logout } = useAuth();
  return (
    <div>
      <span>{user?.name}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does Context replace Redux or Zustand?',
      answer: 'For simple global state (theme, auth, locale) — yes. For complex state with many actions, frequent updates, or performance-critical scenarios — no. Context re-renders all consumers when the value changes. Zustand/Redux have selective subscription (only re-render when the specific slice you use changes).',
    },
    {
      question: 'How do I prevent unnecessary re-renders with Context?',
      answer: 'Split contexts by update frequency. Put rarely-changing data (user info) in one context and frequently-changing data in another. Memoize the context value with useMemo. Or use a state manager that supports selective subscriptions.',
    },
  ],
  productionIssues: [
    'All context consumers re-rendering on every value change — split the context or memoize the value.',
    'Context value not updating — you\'re mutating the value instead of replacing it. Always create a new object reference.',
  ],
  bestPractices: [
    'Always create a custom hook (useAuth, useTheme) instead of exposing useContext directly.',
    'Guard against using context outside its provider — throw a descriptive error.',
    'Keep context values stable with useCallback and useMemo.',
    'Don\'t put everything in one context — split by domain and update frequency.',
  ],
  architectNote: `Context is a tool, not a state management solution. Use it for data that is truly global and changes infrequently. For anything complex, use Zustand — it\'s tiny, simple, and has much better performance characteristics than Context for dynamic data.`,
  faqs: [
    {
      question: 'Can I have multiple contexts in an app?',
      answer: 'Yes, and you should. Split contexts by concern: AuthContext, ThemeContext, LocaleContext. Each component only subscribes to what it needs. This keeps re-renders minimal and code organized.',
    },
  ],
  keyTakeaways: [
    'Context solves prop drilling for global/shared data',
    'Three parts: createContext, Provider, useContext',
    'Best for: auth, theme, locale — slowly-changing global data',
    'Always wrap useContext in a custom hook',
    'For complex/frequent state, use Zustand or Redux',
  ],
  relatedTopics: ['react-state', 'react-hooks', 'react-props'],
};

export const reactRouting: TopicContent = {
  slug: 'react-routing',
  title: 'React Routing',
  description: 'Learn client-side routing in React with React Router — the standard library for building multi-page React applications.',
  applicableVersions: ['React Router 6+', 'React 18'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'React Router lets you build multi-page experiences in a single-page application. It maps URL paths to components — when the URL changes, React Router renders the matching component without a full page reload. The result feels like a traditional website but with the speed of a SPA.',
  whatIsIt: `React Router provides:
- \`<BrowserRouter>\` — wraps your app, enables routing
- \`<Routes>\` — the routing container
- \`<Route path="..." element={...}>\` — maps a URL to a component
- \`<Link to="...">\` — navigation without page reload
- \`useNavigate()\` — programmatic navigation
- \`useParams()\` — read URL parameters
- \`useSearchParams()\` — read query strings
- \`<Outlet>\` — nested route rendering`,
  whyWeNeedIt: `Without routing, your React app is a single page — you can't bookmark specific views, share URLs, or use the browser's back/forward buttons meaningfully. Routing makes SPAs feel like real websites.`,
  realWorldUsage: `Every multi-page React app uses routing. Typical routes:
- \`/\` → Home
- \`/dashboard\` → Dashboard
- \`/users/:id\` → User profile
- \`/settings/profile\` → Nested settings
- \`*\` → 404 page`,
  howItWorks: `React Router uses the History API to update the URL without a page reload. When the URL changes, it re-renders the matching Route's element. Route matching is done from top to bottom; the first match wins (in v6, exact matching is the default).`,
  example: {
    title: 'Complete Routing Setup',
    description: 'A real-world routing configuration with nested routes, protected routes, and lazy loading.',
    code: [
      {
        label: 'App Router Setup',
        language: 'tsx',
        code: `import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuth } from './contexts/AuthContext';

// Lazy load route components — reduces initial bundle size
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />

          {/* Dynamic route */}
          <Route path="/users/:userId" element={
            <ProtectedRoute><UserProfile /></ProtectedRoute>
          } />

          {/* Nested routes */}
          <Route path="/settings" element={
            <ProtectedRoute><SettingsLayout /></ProtectedRoute>
          }>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Settings.Profile />} />
            <Route path="security" element={<Settings.Security />} />
            <Route path="notifications" element={<Settings.Notifications />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Reading URL params in a component
function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'overview';

  return (
    <div>
      <h1>User {userId}</h1>
      <TabNav
        activeTab={tab}
        onTabChange={(t) => setSearchParams({ tab: t })}
      />
      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between BrowserRouter and HashRouter?',
      answer: 'BrowserRouter uses the HTML5 History API (/users/123). HashRouter uses URL hashes (/#/users/123). Use BrowserRouter for modern apps — it produces clean URLs. Use HashRouter only if you\'re deploying to a static host that can\'t handle URL rewrites.',
    },
    {
      question: 'Why does my page show 404 when I refresh a React Router page?',
      answer: 'The server doesn\'t know about client-side routes. When you refresh /dashboard, the server looks for a /dashboard file and finds nothing. Fix: configure your server to serve index.html for all routes. In Nginx: try_files $uri /index.html.',
    },
  ],
  productionIssues: [
    '404 on refresh — server not configured to serve index.html for all routes.',
    'Scroll position not resetting on navigation — add a ScrollToTop component that calls window.scrollTo(0,0) in useEffect on location change.',
    'Route component not re-rendering when params change — you\'re missing the param in the dependency array of useEffect.',
  ],
  bestPractices: [
    'Use lazy() and Suspense for route-level code splitting — reduces initial bundle size significantly.',
    'Create a ProtectedRoute wrapper component instead of repeating auth checks in every component.',
    'Use useNavigate for programmatic navigation, never window.location.href in React apps.',
    'Store UI state in URL params (activeTab, filters) so users can bookmark and share specific views.',
  ],
  architectNote: `For new projects in 2024, consider whether you need React Router at all. If you\'re using Next.js, you get file-based routing built in. React Router is for pure React SPAs. For complex routing needs, React Router\'s data router (createBrowserRouter) provides loaders and actions that bring server-like data fetching patterns to the client.`,
  faqs: [
    {
      question: 'Should I use React Router or TanStack Router?',
      answer: 'React Router v6+ is the standard choice with the largest ecosystem. TanStack Router is newer with full TypeScript type safety for routes (params, search params are typed). For greenfield projects that prioritize type safety, TanStack Router is excellent. For most projects, React Router is the safe choice.',
    },
  ],
  keyTakeaways: [
    'React Router maps URLs to components without page reloads',
    'useParams for URL params, useSearchParams for query strings, useNavigate for programmatic navigation',
    'Use lazy() + Suspense for route-level code splitting',
    'Create ProtectedRoute wrappers for auth-gated routes',
    'Configure your server to serve index.html for all routes',
  ],
  relatedTopics: ['react-components', 'react-hooks', 'react-context'],
};
