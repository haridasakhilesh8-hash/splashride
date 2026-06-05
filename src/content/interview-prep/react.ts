import type {
  InterviewPrepQuestion,
  InterviewPrepSection,
  InterviewPrepTopicGroup,
} from './types';
import { reactInterviewPrepTopicGroups } from './topicNavigation';

type QuestionIntent = 'concept' | 'practical' | 'incident' | 'architecture';

interface ReactTopicSeed {
  category: string;
  topicGroup: string;
  mechanism: string;
  implementation: string;
  failure: string;
  decision: string;
  incident: string;
  evidence: [string, string, string];
  concerns: string[];
  relatedTopics: string[];
}

const topicSeeds: ReactTopicSeed[] = [
  {
    category: 'JSX', topicGroup: 'Fundamentals',
    mechanism: 'JSX is syntax transformed into React element creation calls; expressions produce values while React controls how those values become UI.',
    implementation: 'Keep JSX declarative, derive values before markup becomes complex, use stable keys, and rely on React escaping instead of inserting raw HTML.',
    failure: 'a rendering or security defect appears because markup, identity, or untrusted content was modeled incorrectly',
    decision: 'which presentation rules belong in JSX and which belong in typed view models, reusable components, or server-side preparation',
    incident: 'a catalog release renders the wrong price in reordered rows and a security scan flags an unsafe HTML insertion',
    evidence: ['compiled JSX output', 'React DevTools component tree', 'rendered DOM and security test results'],
    concerns: ['JSX transformation and element creation', 'expressions versus statements in JSX', 'conditional rendering without unreadable markup', 'list rendering and stable keys', 'fragments and DOM structure', 'safe rendering of untrusted HTML'],
    relatedTopics: ['components', 'rendering', 'security'],
  },
  {
    category: 'Components', topicGroup: 'Fundamentals',
    mechanism: 'React components are reusable rendering units whose public contract is props, composition behavior, state ownership, accessibility, and observable side effects.',
    implementation: 'Design narrow component contracts, separate domain behavior from presentation, compose instead of adding option flags, and test the public behavior.',
    failure: 'shared component changes create regressions across multiple products because contracts and ownership are unclear',
    decision: 'how to balance reuse, configurability, product autonomy, accessibility, and long-term component ownership',
    incident: 'a shared checkout component release breaks three product journeys and rollback is difficult because every team wrapped it differently',
    evidence: ['component API and usage inventory', 'Storybook or visual-regression results', 'production error and adoption telemetry'],
    concerns: ['component responsibility and boundaries', 'composition versus configuration flags', 'controlled and uncontrolled component APIs', 'presentational versus container responsibilities', 'component reuse across products', 'backward-compatible component evolution', 'compound component APIs', 'accessible component contracts'],
    relatedTopics: ['props', 'component-architecture', 'design-patterns'],
  },
  {
    category: 'Props', topicGroup: 'Fundamentals',
    mechanism: 'Props are immutable inputs for a render and form the public contract between a component and its caller.',
    implementation: 'Keep prop contracts small and typed, prefer semantic inputs over styling switches, define defaults deliberately, and avoid copying props into state.',
    failure: 'a component displays stale or contradictory data because its prop contract permits multiple sources of truth',
    decision: 'which inputs are stable public API and which details should remain private to the component implementation',
    incident: 'an account banner shows a previous customer status after navigation because incoming props were copied into local state',
    evidence: ['component props in React DevTools', 'TypeScript contract and call sites', 'render timeline and state transitions'],
    concerns: ['one-way data flow through props', 'prop drilling and composition alternatives', 'default values and optional props', 'children as a composition contract', 'avoiding derived state from props'],
    relatedTopics: ['components', 'state', 'context-api'],
  },
  {
    category: 'State', topicGroup: 'Fundamentals',
    mechanism: 'React state is a snapshot associated with a component position in the render tree; updates schedule rendering rather than mutating the current snapshot.',
    implementation: 'Store the minimum source of truth, use functional updates when based on previous state, preserve immutability, and place state at the narrowest shared owner.',
    failure: 'users see stale, lost, or reset values because updates, identity, or ownership were modeled incorrectly',
    decision: 'whether data is local UI state, shared client state, server state, URL state, or derived data',
    incident: 'rapid cart updates lose quantities and switching tabs unexpectedly resets an in-progress form',
    evidence: ['React DevTools state snapshots', 'user-event reproduction timeline', 'state update and component identity trace'],
    concerns: ['state snapshots and asynchronous updates', 'functional state updates', 'immutable object and array updates', 'derived state versus stored state', 'lifting state to the correct owner', 'preserving and resetting state by identity', 'batching multiple state updates', 'modeling complex state transitions'],
    relatedTopics: ['hooks', 'rendering', 'state-management'],
  },
  {
    category: 'Event Handling', topicGroup: 'Fundamentals',
    mechanism: 'React event handlers run in response to user interaction and participate in browser propagation, default behavior, state updates, and accessibility semantics.',
    implementation: 'Use semantic controls, pass handlers instead of invoking during render, control propagation deliberately, and make async actions idempotent.',
    failure: 'one user action triggers duplicate work or inaccessible behavior because event flow and pending state were not controlled',
    decision: 'where interaction orchestration belongs and how component contracts expose behavior without leaking DOM details',
    incident: 'double-clicking a payment action submits two orders while keyboard users cannot trigger the replacement control',
    evidence: ['browser event listener and network trace', 'user-event automated tests', 'accessibility and pending-state behavior'],
    concerns: ['passing versus calling event handlers', 'event propagation and delegation', 'preventing browser default behavior', 'async event handlers and duplicate submissions', 'keyboard-accessible interaction handling'],
    relatedTopics: ['forms', 'components', 'testing'],
  },
  {
    category: 'Forms', topicGroup: 'Fundamentals',
    mechanism: 'React forms coordinate browser input state, validation, submission, async server results, and accessible error communication.',
    implementation: 'Choose controlled or uncontrolled inputs intentionally, model field and submission state separately, validate at the right boundaries, and preserve user input through failures.',
    failure: 'customers lose input or submit invalid or duplicate data during slow networks and server validation failures',
    decision: 'how much form state belongs in React, a form library, the URL, or the server action boundary',
    incident: 'a long onboarding form clears after a 422 response and conversion drops because field-level errors are not announced',
    evidence: ['submitted payload and server response', 'field-state and validation trace', 'keyboard and screen-reader test results'],
    concerns: ['controlled versus uncontrolled inputs', 'field-level and form-level validation', 'server validation and error mapping', 'dynamic and dependent fields', 'large-form performance', 'preserving form state across navigation', 'accessible validation messages'],
    relatedTopics: ['event-handling', 'state', 'react-testing-library'],
  },
  {
    category: 'Hooks', topicGroup: 'Core React',
    mechanism: 'Hooks let function components use stateful React capabilities; call order links hook state to the component and closure semantics determine which render values callbacks observe.',
    implementation: 'Follow hook call-order rules, declare complete effect dependencies, separate synchronization from events, and use memoization only for measured work or stable contracts.',
    failure: 'a component shows stale data, loops requests, or performs duplicate work because hook lifecycle and closure behavior were misunderstood',
    decision: 'which behavior should remain local, become a custom hook, move to a server-state tool, or be handled outside React',
    incident: 'a dashboard repeatedly fetches the same endpoint, shows an earlier account after navigation, and consumes twice the expected API quota',
    evidence: ['React DevTools Profiler', 'effect setup and cleanup trace', 'network requests and dependency values'],
    concerns: ['Rules of Hooks and stable call order', 'useState update semantics', 'useEffect synchronization', 'effect dependency correctness', 'stale closures in callbacks', 'useRef for mutable non-rendering values', 'useMemo for expensive calculations', 'useCallback and stable callback contracts', 'useReducer for state machines', 'useLayoutEffect timing', 'useId for accessible stable identifiers'],
    relatedTopics: ['lifecycle', 'custom-hooks', 'performance-optimization'],
  },
  {
    category: 'Lifecycle', topicGroup: 'Core React',
    mechanism: 'A component moves through render, commit, effect setup, update, and cleanup; development Strict Mode intentionally exposes unsafe assumptions.',
    implementation: 'Keep render pure, synchronize external systems in effects, make setup and cleanup symmetrical, and design work to tolerate remounting.',
    failure: 'subscriptions, requests, or DOM integrations leak or duplicate because lifecycle boundaries were treated as one-time events',
    decision: 'which work belongs in render, event handlers, effects, external stores, or framework data-loading boundaries',
    incident: 'opening and closing a live dashboard leaves duplicate websocket subscriptions and notifications arrive multiple times',
    evidence: ['Strict Mode reproduction', 'effect setup and cleanup logs', 'subscription and network activity'],
    concerns: ['render versus commit phases', 'mount update and unmount behavior', 'effect setup and cleanup symmetry', 'Strict Mode double invocation', 'class lifecycle migration', 'external-system synchronization'],
    relatedTopics: ['hooks', 'rendering', 'memory-leaks'],
  },
  {
    category: 'Context API', topicGroup: 'Core React',
    mechanism: 'Context distributes a value through a subtree without explicit prop passing; consumers re-render when the provider value identity changes.',
    implementation: 'Use context for stable cross-cutting dependencies, split unrelated values, stabilize provider contracts, and avoid turning context into an unbounded global store.',
    failure: 'a broad provider causes large subtrees to re-render or hides dependencies that become difficult to test and migrate',
    decision: 'whether the need is dependency injection, low-frequency shared state, server state, or high-frequency client state',
    incident: 'typing in one settings field re-renders an entire enterprise shell because a single provider recreates a large value object',
    evidence: ['Profiler render reasons', 'provider value identity', 'consumer and provider dependency map'],
    concerns: ['context value propagation', 'provider value identity', 'splitting contexts by responsibility', 'context versus prop composition', 'context versus external state stores', 'testing context consumers', 'context boundaries in large applications'],
    relatedTopics: ['props', 'state-management', 'performance-optimization'],
  },
  {
    category: 'Reconciliation', topicGroup: 'Core React',
    mechanism: 'Reconciliation compares element trees and uses type, position, and key identity to decide which component state and DOM can be preserved.',
    implementation: 'Use stable semantic keys, preserve component identity intentionally, avoid changing element type accidentally, and measure expensive tree updates.',
    failure: 'state moves to the wrong row, inputs reset, or large subtrees remount because identity was unstable',
    decision: 'where stable identity is required and when an intentional key change should reset state',
    incident: 'sorting an editable table moves unsaved values to different customers because rows use array indexes as keys',
    evidence: ['React DevTools component identity', 'Profiler mount versus update events', 'key values and rendered tree comparison'],
    concerns: ['element type and position identity', 'stable keys in dynamic lists', 'intentional state reset with keys', 'preserving state during conditional rendering', 'reconciliation cost in large trees', 'component remount diagnosis'],
    relatedTopics: ['virtual-dom', 'rendering', 'state'],
  },
  {
    category: 'Virtual DOM', topicGroup: 'Core React',
    mechanism: 'The React element tree is an in-memory description used during reconciliation; performance depends on work scheduled and committed, not on a claim that a virtual DOM is always faster.',
    implementation: 'Reason about render and commit cost, reduce unnecessary work through architecture first, and use profiling before memoization.',
    failure: 'teams optimize the wrong layer because they confuse element creation, reconciliation, DOM mutation, and browser rendering',
    decision: 'which performance problem belongs to React rendering, DOM complexity, browser layout, data processing, or network delivery',
    incident: 'a team adds memoization widely but interaction latency remains high because a large DOM and layout thrashing dominate the frame',
    evidence: ['React Profiler render and commit durations', 'browser Performance panel', 'DOM size and layout measurements'],
    concerns: ['React elements versus browser DOM', 'render and commit work', 'diffing assumptions', 'DOM mutation versus browser layout cost', 'profiling virtual-tree work'],
    relatedTopics: ['reconciliation', 'rendering', 'performance-optimization'],
  },
  {
    category: 'Rendering', topicGroup: 'Core React',
    mechanism: 'Rendering calls components to calculate the next UI snapshot; parent renders, state updates, context changes, and external-store notifications can schedule that work.',
    implementation: 'Keep rendering pure, derive values during render, control state ownership, inspect render reasons, and avoid effects that merely calculate UI.',
    failure: 'a screen renders excessively or inconsistently because render triggers and side effects are not understood',
    decision: 'which work must happen during render, after commit, on user action, on the server, or in a worker',
    incident: 'a search screen drops below 20 frames per second because every keystroke renders thousands of unchanged result components',
    evidence: ['React DevTools Profiler render reasons', 'component render counters', 'browser frame and long-task trace'],
    concerns: ['what triggers a component render', 'pure rendering and side effects', 'parent and child render behavior', 'rendering derived data', 'conditional rendering identity', 'automatic batching', 'render-phase performance', 'avoiding effect-driven rendering loops'],
    relatedTopics: ['reconciliation', 'hooks', 'performance-optimization'],
  },
  {
    category: 'Performance Optimization', topicGroup: 'Advanced React',
    mechanism: 'React performance is the combined cost of network delivery, JavaScript execution, rendering, committing, browser layout, and user-perceived responsiveness.',
    implementation: 'Set a baseline, profile the actual interaction, reduce architectural work first, then apply memoization, virtualization, splitting, or scheduling where evidence supports it.',
    failure: 'optimization effort increases complexity without improving the user metric because the dominant bottleneck was not identified',
    decision: 'which user journeys receive budgets and which optimization cost is justified by measured business impact',
    incident: 'interaction-to-next-paint rises above 600 ms after a feature release while bundle size and render counts both increase',
    evidence: ['Core Web Vitals and RUM', 'React Profiler flamegraph', 'bundle and browser Performance analysis'],
    concerns: ['profiling before optimization', 'React.memo and prop stability', 'useMemo cost and value', 'useCallback cost and value', 'list virtualization', 'code splitting and lazy loading', 'bundle-size governance', 'expensive derived calculations', 'high-frequency update isolation', 'performance budgets and regression gates'],
    relatedTopics: ['rendering', 'performance-issues', 'scalability'],
  },
  {
    category: 'Custom Hooks', topicGroup: 'Advanced React',
    mechanism: 'A custom hook packages reusable stateful behavior and lifecycle coordination while each caller receives independent state.',
    implementation: 'Design a narrow semantic API, keep dependencies explicit, expose status and recovery behavior, and test the hook contract rather than implementation details.',
    failure: 'a reusable hook hides requests, subscriptions, or unstable values and creates failures across many screens',
    decision: 'whether reusable behavior belongs in a hook, service, component, state store, or framework boundary',
    incident: 'a shared data hook creates duplicate polling and stale results across fifteen screens after its dependency contract changes',
    evidence: ['hook call-site inventory', 'network and subscription trace', 'contract-focused hook tests'],
    concerns: ['custom hook API design', 'sharing logic without sharing state', 'dependency and closure contracts', 'data-fetching hook responsibilities', 'subscription hook cleanup', 'testing custom hooks', 'versioning shared hooks'],
    relatedTopics: ['hooks', 'design-patterns', 'testing'],
  },
  {
    category: 'Error Boundaries', topicGroup: 'Advanced React',
    mechanism: 'Error boundaries catch rendering and lifecycle errors below them and replace the failed subtree with fallback UI; they do not catch every asynchronous or event-handler failure.',
    implementation: 'Place boundaries around meaningful recovery units, report enriched error context, provide retry or navigation paths, and test failure behavior.',
    failure: 'one component failure blanks a whole application or a fallback traps users without recovery',
    decision: 'which failures may be isolated locally and which require page, route, or application-level recovery',
    incident: 'a malformed analytics response crashes the account page for every customer because the only boundary wraps the entire application',
    evidence: ['captured component stack and error report', 'boundary fallback behavior', 'route and user-impact telemetry'],
    concerns: ['errors boundaries can and cannot catch', 'boundary placement strategy', 'fallback and recovery design', 'error reporting with component context', 'testing render failures'],
    relatedTopics: ['production-incidents', 'debugging', 'component-architecture'],
  },
  {
    category: 'Portals', topicGroup: 'Advanced React',
    mechanism: 'A portal renders DOM into another container while preserving its position in the React tree, including context and React event propagation.',
    implementation: 'Use portals for overlays that need DOM escape, manage focus and scroll deliberately, and understand React-tree event propagation.',
    failure: 'dialogs appear visually correct but break keyboard focus, event behavior, stacking, or server rendering',
    decision: 'whether an overlay needs a portal and which centralized layer owns accessibility and z-index governance',
    incident: 'a checkout dialog opens behind another overlay and keyboard focus escapes into the page underneath',
    evidence: ['React and DOM tree inspection', 'keyboard and focus trace', 'event propagation test'],
    concerns: ['React tree versus DOM tree behavior', 'portal event propagation', 'accessible modal focus management', 'portal containers and stacking context'],
    relatedTopics: ['components', 'event-handling', 'accessibility'],
  },
  {
    category: 'Suspense', topicGroup: 'Advanced React',
    mechanism: 'Suspense coordinates a fallback while a compatible child is not ready and lets applications define intentional loading and streaming boundaries.',
    implementation: 'Place boundaries around meaningful user experiences, avoid fallback waterfalls, pair them with error recovery, and integrate only compatible data or code-loading mechanisms.',
    failure: 'users see flashing fallbacks, hidden content, or long loading waterfalls because boundaries and data dependencies were poorly designed',
    decision: 'where progressive reveal improves experience and where preserving existing content is more important',
    incident: 'a route migration introduces nested fallback waterfalls and the main content remains blank despite fast individual APIs',
    evidence: ['loading timeline and waterfall', 'boundary reveal order', 'RUM and user-abandonment metrics'],
    concerns: ['Suspense boundary behavior', 'lazy-loaded component fallback', 'nested boundary reveal order', 'avoiding fallback waterfalls', 'Suspense with error boundaries', 'preserving revealed content during updates', 'streaming user experiences'],
    relatedTopics: ['concurrent-features', 'server-components', 'error-boundaries'],
  },
  {
    category: 'Concurrent Features', topicGroup: 'Advanced React',
    mechanism: 'Concurrent React can prepare and prioritize rendering work while keeping urgent interactions responsive; rendering may be interrupted and restarted.',
    implementation: 'Keep rendering pure, mark non-urgent updates deliberately, use transitions and deferred values for measured responsiveness problems, and test interruption-safe behavior.',
    failure: 'UI becomes inconsistent or slow because code assumes every render commits immediately or marks urgent work as non-urgent',
    decision: 'which updates are urgent, which can be deferred, and which work should leave the main thread entirely',
    incident: 'filtering a large analytics view blocks typing for more than a second until the update is moved into a measured transition strategy',
    evidence: ['interaction and transition timing', 'React Profiler scheduling trace', 'browser long tasks and input latency'],
    concerns: ['interruptible rendering assumptions', 'useTransition for non-urgent updates', 'useDeferredValue for expensive views', 'urgent versus non-urgent state', 'avoiding tearing with external stores', 'concurrent-safe side effects', 'testing concurrent interactions'],
    relatedTopics: ['rendering', 'suspense', 'performance-optimization'],
  },
  {
    category: 'Redux', topicGroup: 'State Management',
    mechanism: 'Redux centralizes state transitions through actions and reducers so changes are explicit, serializable, inspectable, and testable.',
    implementation: 'Use Redux for genuinely shared client state, normalize complex entities, keep reducers pure, derive data through selectors, and avoid storing server cache or local UI state indiscriminately.',
    failure: 'the store becomes a global dumping ground with tightly coupled actions, duplicated server data, and expensive broad subscriptions',
    decision: 'which state benefits from centralized event-driven transitions and which belongs locally, in URL state, or in a server-state cache',
    incident: 'a global store update re-renders the entire operations console and stale duplicated API entities show contradictory values',
    evidence: ['Redux DevTools action timeline', 'selector subscription and render trace', 'state ownership inventory'],
    concerns: ['Redux data flow and reducer purity', 'state normalization', 'selector design and memoization', 'action and event modeling', 'middleware responsibilities', 'Redux versus local state', 'Redux versus server-state tools', 'large-store modular ownership'],
    relatedTopics: ['redux-toolkit', 'state', 'scalability'],
  },
  {
    category: 'Redux Toolkit', topicGroup: 'State Management',
    mechanism: 'Redux Toolkit is the standard Redux approach for store setup, slice reducers, immutable update ergonomics, async workflows, entity adapters, and RTK Query.',
    implementation: 'Model domain events with slices, use createAsyncThunk only where appropriate, prefer RTK Query for server cache, and type the store and selectors centrally.',
    failure: 'teams retain legacy Redux ceremony or misuse thunks and slices until business workflows become difficult to observe',
    decision: 'how slices align to domain ownership and where RTK Query, listeners, thunks, or external orchestration should handle async work',
    incident: 'a migration to Redux Toolkit reduces boilerplate but duplicates API requests because legacy thunks and RTK Query both own the same data',
    evidence: ['Redux DevTools and RTK Query cache', 'slice and endpoint ownership map', 'network and invalidation trace'],
    concerns: ['configureStore defaults', 'createSlice reducer design', 'Immer update semantics', 'createAsyncThunk lifecycle', 'RTK Query cache ownership', 'entity adapters', 'listener middleware', 'migrating legacy Redux'],
    relatedTopics: ['redux', 'react-query', 'state-management'],
  },
  {
    category: 'Zustand', topicGroup: 'State Management',
    mechanism: 'Zustand exposes a small external store whose selectors subscribe components to selected state and actions.',
    implementation: 'Keep stores bounded by domain, select narrowly, separate actions from derived values, and define persistence and hydration behavior explicitly.',
    failure: 'a convenient global store grows without ownership and broad selectors trigger excessive renders or stale persisted state',
    decision: 'whether Zustand simplicity fits the required governance, debugging, async workflow, and team scale',
    incident: 'a persisted store hydrates an obsolete checkout schema and broad subscriptions make every cart update render the full page',
    evidence: ['store snapshot and selector subscriptions', 'hydration and persistence trace', 'React Profiler render reasons'],
    concerns: ['store and action design', 'selector subscription behavior', 'avoiding broad subscriptions', 'persisted state and hydration', 'async actions and error state', 'Zustand versus Redux or Context'],
    relatedTopics: ['state-management', 'redux', 'context-api'],
  },
  {
    category: 'React Query', topicGroup: 'State Management',
    mechanism: 'React Query manages asynchronous server state through query keys, cache freshness, retries, invalidation, background refetching, and mutation workflows.',
    implementation: 'Design stable query keys, choose stale and garbage-collection times from business needs, handle mutation invalidation or optimistic updates, and expose useful error states.',
    failure: 'users see stale, duplicated, or overwritten server data because cache identity and mutation behavior were modeled incorrectly',
    decision: 'how server-state consistency, freshness, offline behavior, and API cost should trade off',
    incident: 'an optimistic inventory update overwrites a concurrent server change and a broad invalidation causes a request storm',
    evidence: ['React Query Devtools cache state', 'query key and invalidation trace', 'network requests and server version data'],
    concerns: ['server state versus client state', 'query key design', 'staleTime and cache lifetime', 'background refetching', 'mutation invalidation', 'optimistic updates and rollback', 'dependent and parallel queries', 'pagination and infinite queries', 'request cancellation and race conditions'],
    relatedTopics: ['state-management', 'redux-toolkit', 'production-incidents'],
  },
  {
    category: 'React Router', topicGroup: 'Routing',
    mechanism: 'React Router maps URL state to nested route UI, loaders, actions, navigation, errors, and history behavior.',
    implementation: 'Make URLs durable and shareable, align nested routes to layout and data boundaries, handle authorization separately from visibility, and test direct navigation and refresh.',
    failure: 'deep links fail, navigation loses state, or protected content is exposed because routing was treated as only client-side view switching',
    decision: 'which application state belongs in the URL and where route data, authentication, and error boundaries should live',
    incident: 'shared links to an order detail page return a hosting 404 and users lose filters when navigating back',
    evidence: ['route match and loader trace', 'browser history and URL state', 'hosting fallback and authorization tests'],
    concerns: ['nested routes and layout boundaries', 'URL parameters and search state', 'route loaders and actions', 'protected-route misconceptions', 'navigation and history behavior', 'route-level error handling', 'deep-link deployment support'],
    relatedTopics: ['app-router', 'state', 'production-incidents'],
  },
  {
    category: 'Jest', topicGroup: 'Testing',
    mechanism: 'Jest provides test execution, assertions, isolation, module mocking, fake timers, and coverage for JavaScript and React code.',
    implementation: 'Test observable contracts, control time and external dependencies deliberately, keep tests deterministic, and use coverage to find risk rather than chase a percentage.',
    failure: 'a large suite becomes slow and flaky because tests share state, over-mock implementation details, or misuse asynchronous assertions',
    decision: 'which behavior belongs in unit tests and which requires component, integration, contract, or end-to-end coverage',
    incident: 'CI fails intermittently after parallelization because tests leak fake timers and shared mocks between cases',
    evidence: ['failed-test retry pattern', 'mock and timer lifecycle', 'coverage and defect escape analysis'],
    concerns: ['test isolation and cleanup', 'module mocking trade-offs', 'fake timers and asynchronous work', 'testing promise rejection and errors', 'coverage interpretation', 'slow-test diagnosis', 'flaky-test prevention'],
    relatedTopics: ['react-testing-library', 'testing', 'production-incidents'],
  },
  {
    category: 'React Testing Library', topicGroup: 'Testing',
    mechanism: 'React Testing Library tests rendered behavior through accessible user-facing queries and realistic interactions rather than component internals.',
    implementation: 'Query by role and accessible name, use user-event, await observable changes, minimize mocks, and test behavior at meaningful integration boundaries.',
    failure: 'tests pass while users fail because the suite targets DOM structure or implementation details instead of accessible behavior',
    decision: 'which dependencies to render realistically and where mocking creates a faster but less credible test',
    incident: 'a component refactor breaks hundreds of brittle class-name tests while a real keyboard regression remains undetected',
    evidence: ['query strategy and accessibility tree', 'user-event and async assertion trace', 'escaped production defects'],
    concerns: ['user-focused query priority', 'getBy queryBy and findBy behavior', 'user-event versus fireEvent', 'testing asynchronous UI', 'avoiding implementation-detail tests', 'testing context and providers', 'accessible form testing', 'component versus integration boundaries'],
    relatedTopics: ['jest', 'components', 'forms'],
  },
  {
    category: 'Folder Structure', topicGroup: 'Architecture',
    mechanism: 'Folder structure communicates ownership and dependency direction; it should help teams locate a feature and understand what it may depend on.',
    implementation: 'Organize by domain or feature where scale requires it, keep shared code genuinely shared, enforce boundaries with tooling, and avoid speculative abstraction folders.',
    failure: 'teams cannot safely change features because business behavior is scattered across type-based folders and shared utilities',
    decision: 'which boundaries reflect product ownership and how import rules prevent architectural erosion',
    incident: 'a simple pricing change touches twelve generic folders and introduces a circular dependency that breaks the production build',
    evidence: ['module dependency graph', 'change-history and ownership map', 'lint boundary and build output'],
    concerns: ['feature-based versus type-based structure', 'shared-code ownership', 'domain boundary enforcement', 'public module APIs', 'monorepo package boundaries'],
    relatedTopics: ['scalability', 'component-architecture', 'design-patterns'],
  },
  {
    category: 'Design Patterns', topicGroup: 'Architecture',
    mechanism: 'React patterns shape component contracts, state ownership, dependency direction, and reuse; patterns are valuable only when they clarify a recurring problem.',
    implementation: 'Choose composition first, document the problem and trade-off, keep contracts testable, and avoid preserving legacy patterns after simpler primitives exist.',
    failure: 'pattern-heavy abstractions hide behavior and make ordinary feature work difficult to trace',
    decision: 'which recurring problem justifies a platform pattern and when a local explicit implementation is safer',
    incident: 'a generic higher-order component stack makes authorization and analytics behavior impossible to diagnose during an outage',
    evidence: ['component and dependency graph', 'call-site complexity and defect history', 'contract tests and migration cost'],
    concerns: ['composition over inheritance', 'compound components', 'render props and modern alternatives', 'higher-order components and legacy code', 'headless component patterns', 'dependency injection in React', 'pattern governance and retirement'],
    relatedTopics: ['component-architecture', 'custom-hooks', 'scalability'],
  },
  {
    category: 'Scalability', topicGroup: 'Architecture',
    mechanism: 'Frontend scalability combines application performance, team autonomy, dependency governance, release safety, observability, and consistent user experience.',
    implementation: 'Define domain and package boundaries, platform contracts, performance budgets, ownership, release evidence, and a controlled exception process.',
    failure: 'delivery slows and production risk rises as teams duplicate capabilities or depend on unstable shared internals',
    decision: 'where standardization creates leverage and where product teams need deliberate autonomy',
    incident: 'twenty teams ship incompatible routing, state, and analytics conventions, making a critical platform upgrade take nine months',
    evidence: ['dependency and ownership graph', 'release and defect metrics', 'performance and adoption dashboards'],
    concerns: ['team and domain boundaries', 'shared platform governance', 'micro-frontend trade-offs', 'dependency and upgrade strategy', 'cross-product observability', 'release independence', 'architecture fitness functions'],
    relatedTopics: ['folder-structure', 'component-architecture', 'performance-optimization'],
  },
  {
    category: 'Component Architecture', topicGroup: 'Architecture',
    mechanism: 'Component architecture defines public APIs, composition, state ownership, accessibility, styling contracts, data dependencies, and lifecycle ownership.',
    implementation: 'Create layered component responsibilities, keep domain behavior independent of visual variants, expose semantic contracts, and govern shared primitives.',
    failure: 'component reuse creates coupling instead of leverage because APIs expose internal details or attempt to satisfy every product variation',
    decision: 'which components become governed platform capabilities and which remain product-owned compositions',
    incident: 'a shared design-system component requires thirty boolean props and a minor visual change breaks unrelated products',
    evidence: ['component API and variant inventory', 'usage and change-impact graph', 'visual, accessibility, and contract tests'],
    concerns: ['component responsibility layers', 'design-system primitive contracts', 'domain components versus UI components', 'state ownership in component trees', 'styling and theming boundaries', 'accessibility governance', 'versioning shared components', 'component observability and adoption'],
    relatedTopics: ['components', 'design-patterns', 'scalability'],
  },
  {
    category: 'SSR', topicGroup: 'Next.js',
    mechanism: 'Server-side rendering produces request-time HTML that can improve first response and crawlability while adding server cost, caching, and hydration constraints.',
    implementation: 'Use SSR only for request-specific content, define cache and failure behavior, prevent server/client output divergence, and measure total user experience.',
    failure: 'traffic spikes overload rendering infrastructure or hydration replaces mismatched server output',
    decision: 'which pages require request-time rendering versus static, incremental, or client-side delivery',
    incident: 'a personalized landing page causes origin latency to exceed four seconds during a campaign and hydration warnings hide interaction defects',
    evidence: ['server-render duration and cache headers', 'hydration warnings', 'Core Web Vitals and origin load'],
    concerns: ['SSR request lifecycle', 'SSR versus client rendering', 'SSR caching strategy', 'hydration consistency', 'SSR failure handling', 'SSR capacity planning'],
    relatedTopics: ['ssg', 'isr', 'server-components'],
  },
  {
    category: 'SSG', topicGroup: 'Next.js',
    mechanism: 'Static-site generation creates HTML at build time, shifting work away from requests while introducing build-time and freshness trade-offs.',
    implementation: 'Use SSG for stable public content, control path generation, define content refresh strategy, and validate build duration and artifact size.',
    failure: 'builds become too slow or users see stale content because the static generation scope exceeds operational limits',
    decision: 'which routes can accept build-time freshness and how content publication triggers regeneration',
    incident: 'adding every product locale to static generation increases the release build from twelve minutes to more than two hours',
    evidence: ['build route and duration report', 'generated artifact inventory', 'content freshness monitoring'],
    concerns: ['SSG build lifecycle', 'static path generation', 'SSG versus SSR', 'build-time data failures', 'large-site build scalability'],
    relatedTopics: ['ssr', 'isr', 'app-router'],
  },
  {
    category: 'ISR', topicGroup: 'Next.js',
    mechanism: 'Incremental Static Regeneration serves static output while allowing selected pages to be regenerated according to time or event-driven revalidation.',
    implementation: 'Choose revalidation rules from business freshness, make regeneration failures observable, and prevent cache stampedes or inconsistent dependencies.',
    failure: 'customers receive stale or inconsistent pages because revalidation ownership and dependency invalidation are unclear',
    decision: 'which freshness SLA justifies ISR and whether time-based or on-demand revalidation is safer',
    incident: 'a product price update appears in APIs immediately but remains stale on high-traffic pages for forty minutes',
    evidence: ['revalidation and cache logs', 'response cache headers', 'source-versus-rendered content comparison'],
    concerns: ['ISR regeneration lifecycle', 'time-based revalidation', 'on-demand revalidation', 'regeneration failure behavior', 'ISR cache consistency'],
    relatedTopics: ['ssg', 'ssr', 'production-incidents'],
  },
  {
    category: 'App Router', topicGroup: 'Next.js',
    mechanism: 'The Next.js App Router composes route segments, layouts, loading and error boundaries, Server Components, and data cache behavior.',
    implementation: 'Align segments to experience boundaries, keep layouts stable, place loading and errors deliberately, and understand caching and dynamic-rendering triggers.',
    failure: 'routes become unexpectedly dynamic, stale, or tightly coupled because segment and cache boundaries were not designed',
    decision: 'how routing, rendering, data ownership, and deployment constraints shape the application architecture',
    incident: 'one request-only API call makes an entire route tree dynamic and increases infrastructure cost after migration',
    evidence: ['route build output', 'segment and cache behavior', 'server and client bundle analysis'],
    concerns: ['route segments and layouts', 'loading and error boundaries', 'dynamic routes and params', 'route groups and organization', 'data cache behavior', 'dynamic rendering triggers', 'Pages Router migration'],
    relatedTopics: ['server-components', 'ssr', 'react-router'],
  },
  {
    category: 'Server Components', topicGroup: 'Next.js',
    mechanism: 'React Server Components execute on the server, can access server-side data directly, and send a serialized component payload without adding their code to the client bundle.',
    implementation: 'Keep client boundaries narrow, pass serializable props, protect server-only capabilities, and choose cache and mutation behavior explicitly.',
    failure: 'client bundles grow or secrets and server work leak across a poorly designed client boundary',
    decision: 'which component owns data and rendering on the server and where interactivity justifies a client boundary',
    incident: 'marking a shared layout as a client component adds hundreds of kilobytes to every route and duplicates data fetching',
    evidence: ['server/client bundle analysis', 'RSC payload and network trace', 'component-boundary inventory'],
    concerns: ['server and client component boundaries', 'serializable prop contracts', 'server-side data access', 'client bundle reduction', 'server actions and mutations', 'caching server component data', 'security at server boundaries', 'migrating client-heavy trees'],
    relatedTopics: ['app-router', 'ssr', 'performance-optimization'],
  },
  {
    category: 'Debugging', topicGroup: 'Production Support',
    mechanism: 'Effective React debugging moves from user-visible symptom to reproducible timeline, render and state evidence, network behavior, and the owning layer.',
    implementation: 'Preserve production evidence, create a minimal reproduction, inspect component and network state, compare a healthy path, and verify the fix against the original journey.',
    failure: 'teams patch symptoms or add logging without isolating the actual state, rendering, data, or browser cause',
    decision: 'which diagnostic signals and source-map access are required to support the application safely',
    incident: 'only users with a particular feature flag see a blank panel, but logs contain no route, release, or component context',
    evidence: ['session replay and error telemetry', 'source-mapped stack and React tree', 'network and state timeline'],
    concerns: ['reproducing intermittent UI defects', 'debugging stale state', 'diagnosing excessive renders', 'debugging failed API state', 'source maps and production stacks', 'feature-flag-specific failures', 'browser-specific defects', 'debugging third-party integrations'],
    relatedTopics: ['production-incidents', 'performance-issues', 'memory-leaks'],
  },
  {
    category: 'Performance Issues', topicGroup: 'Production Support',
    mechanism: 'Production frontend performance diagnosis separates delivery, JavaScript, React rendering, DOM and layout, API latency, and device constraints.',
    implementation: 'Start from a user-impact metric and affected cohort, correlate RUM with profiler evidence, isolate the dominant cost, and validate the change under production-like conditions.',
    failure: 'teams optimize local benchmarks while real users remain slow because the affected device, route, or interaction was not represented',
    decision: 'which performance regressions block release and how budgets differ by journey and device cohort',
    incident: 'mobile interaction latency doubles after release while desktop synthetic tests remain green',
    evidence: ['RUM by route and device', 'React and browser profiler traces', 'bundle, API, and long-task analysis'],
    concerns: ['isolating frontend performance layers', 'production render regression', 'bundle-size regression', 'slow interaction diagnosis', 'large-list performance', 'API latency impact on UI', 'third-party script impact', 'performance regression prevention'],
    relatedTopics: ['performance-optimization', 'debugging', 'production-incidents'],
  },
  {
    category: 'Memory Leaks', topicGroup: 'Production Support',
    mechanism: 'Browser memory leaks occur when references keep objects, DOM, subscriptions, timers, or cached data reachable after the user journey no longer needs them.',
    implementation: 'Reproduce repeated navigation, compare heap snapshots, inspect retainers, clean external resources, bound caches, and verify memory returns after garbage collection.',
    failure: 'long-lived sessions slow down or crash because components and data remain retained after navigation',
    decision: 'which caches and subscriptions are bounded, who owns cleanup, and what memory thresholds are monitored',
    incident: 'an operations dashboard grows from 180 MB to 1.4 GB during one shift and eventually crashes the browser tab',
    evidence: ['heap snapshots and retainer paths', 'subscription timer and listener inventory', 'memory timeline across repeated journeys'],
    concerns: ['effect cleanup leaks', 'event-listener retention', 'timer and interval leaks', 'websocket subscription leaks', 'unbounded client caches', 'detached DOM nodes', 'heap-snapshot diagnosis'],
    relatedTopics: ['lifecycle', 'debugging', 'production-incidents'],
  },
  {
    category: 'Production Incidents', topicGroup: 'Production Support',
    mechanism: 'Frontend incident response protects users first, preserves evidence, scopes impact, isolates the failing change or dependency, and converts recovery into prevention.',
    implementation: 'Use feature flags and reversible releases, correlate telemetry with deployments, communicate impact clearly, validate recovery, and complete a blameless prevention review.',
    failure: 'recovery is slow or recurrence is likely because teams lack ownership, observability, rollback controls, or reliable release evidence',
    decision: 'which frontend failures require rollback, feature disablement, graceful degradation, or coordinated backend response',
    incident: 'checkout errors jump from 0.3% to 9% immediately after a frontend release while API health remains nominal',
    evidence: ['error rate and affected journey', 'deployment feature-flag and dependency timeline', 'session replay and recovery validation'],
    concerns: ['incident triage and impact scoping', 'rollback versus forward fix', 'feature-flag mitigation', 'third-party outage degradation', 'frontend and API ownership handoff', 'release correlation and canaries', 'customer communication evidence', 'post-incident prevention actions'],
    relatedTopics: ['debugging', 'performance-issues', 'scalability'],
  },
];

const industries = [
  ['retail', 'a peak-season catalog and checkout journey'],
  ['banking', 'a regulated digital onboarding journey'],
  ['healthcare', 'an accessible patient-service portal'],
  ['media', 'a high-traffic live-event experience'],
  ['telecom', 'a device purchase and support platform'],
  ['software-as-a-service', 'a multi-tenant operations console'],
] as const;

const questionTypes: Record<QuestionIntent, string> = {
  concept: 'Conceptual Questions',
  practical: 'Practical Questions',
  incident: 'Production Support Questions',
  architecture: 'Architecture Questions',
};

const difficultyByIntent: Record<QuestionIntent, InterviewPrepQuestion['difficultyLevel']> = {
  concept: 'Beginner',
  practical: 'Intermediate',
  incident: 'Advanced',
  architecture: 'Architect',
};

const experienceByIntent: Record<QuestionIntent, InterviewPrepQuestion['experienceLevel']> = {
  concept: 'beginner',
  practical: 'mid',
  incident: 'senior',
  architecture: 'architect',
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hash(value: string) {
  return Array.from(value).reduce((result, character) => ((result * 31) + character.charCodeAt(0)) >>> 0, 2166136261);
}

function formatList(items: string[]) {
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

function questionFor(intent: QuestionIntent, concern: string, category: string) {
  const questions: Record<QuestionIntent, string> = {
    concept: `Explain ${concern} in ${category}. Which misconception causes real defects?`,
    practical: `How would you implement and test ${concern} in a production React application?`,
    incident: `A production release exposes a failure involving ${concern}. How would you diagnose it and prevent recurrence?`,
    architecture: `How would you make an architecture decision about ${concern} for a large React platform?`,
  };
  return questions[intent];
}

type ConcernKnowledge = Pick<ReactTopicSeed, 'mechanism' | 'implementation' | 'failure' | 'decision'>;

function getConcernKnowledge(seed: ReactTopicSeed, concern: string): ConcernKnowledge {
  const rules: Array<[RegExp, ConcernKnowledge]> = [
    [/stable keys|state reset with keys|position identity|component remount/i, {
      mechanism: 'React preserves state by element type, key, and tree position; a key is an identity contract, not a warning-suppression attribute.',
      implementation: 'Use stable domain identifiers for persistent items and change a key only when the product intentionally wants a fresh component state.',
      failure: 'state moves between records or resets unexpectedly after sorting, filtering, or conditional rendering',
      decision: 'which business entity owns UI identity and when product behavior explicitly requires state reset',
    }],
    [/effect dependency|stale closure|useeffect synchronization|setup and cleanup|effect cleanup/i, {
      mechanism: 'An effect synchronizes a committed render with an external system, and its closure observes values from the render that created it.',
      implementation: 'Declare every reactive dependency, move event-specific work to handlers, make setup and cleanup symmetrical, and remove effects used only to derive UI.',
      failure: 'subscriptions or requests observe stale values, repeat indefinitely, or survive after the component is gone',
      decision: 'whether work is synchronization, an event, derived rendering, or external-store responsibility',
    }],
    [/usememo|usecallback|react\.memo|prop stability|memoization/i, {
      mechanism: 'Memoization can reuse a calculation, callback, or component result only while its dependency and prop identities remain equal.',
      implementation: 'Profile first, stabilize the actual expensive boundary, measure comparison cost, and remove memoization that does not improve the user interaction.',
      failure: 'complexity grows while renders continue because dependencies or props change every time',
      decision: 'which measured rendering boundary justifies an identity and cache contract',
    }],
    [/provider value identity|splitting contexts|context boundaries|broad subscriptions/i, {
      mechanism: 'A context consumer re-renders when the nearest provider receives a different value identity, even if the consumer uses only one field.',
      implementation: 'Split providers by responsibility and update frequency, stabilize value contracts, and use selector-capable stores for high-frequency shared state.',
      failure: 'one small shared-state update schedules rendering across a large unrelated subtree',
      decision: 'whether the dependency is stable context, high-frequency client state, or server state',
    }],
    [/functional state updates|batching|state snapshot|asynchronous updates/i, {
      mechanism: 'Each render sees a state snapshot, and React queues updates before processing them; functional updaters calculate from the latest queued value.',
      implementation: 'Use functional updates for transitions based on previous state, keep updates immutable, and test rapid or batched user actions.',
      failure: 'rapid interactions lose updates because handlers calculate from an older render snapshot',
      decision: 'whether multiple fields form one atomic transition that should be modeled together',
    }],
    [/derived state|copying props|source of truth|lifting state|state ownership/i, {
      mechanism: 'Derived values should normally be calculated from their source during render; duplicating them creates synchronization obligations.',
      implementation: 'Store the minimum source of truth, calculate deterministic values, and lift state only to the nearest owner that coordinates all writers.',
      failure: 'two copies of the same business value diverge and different parts of the screen disagree',
      decision: 'which boundary owns the authoritative value and which consumers only derive a view',
    }],
    [/controlled versus uncontrolled|controlled and uncontrolled/i, {
      mechanism: 'A controlled input receives its current value from React state, while an uncontrolled input lets the DOM retain the current value behind a ref or form boundary.',
      implementation: 'Choose one ownership model per field, define reset and validation behavior, and avoid switching ownership after mount.',
      failure: 'input values reset, lag, or trigger React warnings because ownership changes during the form lifecycle',
      decision: 'whether React needs every keystroke or only a validated value at a form boundary',
    }],
    [/server validation|error mapping|accessible validation/i, {
      mechanism: 'Server validation is authoritative for business rules, while the client maps returned field and form errors into a recoverable accessible interaction.',
      implementation: 'Preserve entered values, associate messages with fields, move focus deliberately, announce summary errors, and keep retry behavior idempotent.',
      failure: 'users lose data or cannot discover why submission failed after a server response',
      decision: 'which rules can improve client feedback and which must remain server-authoritative',
    }],
    [/query key|cache lifetime|staletime|background refetch/i, {
      mechanism: 'A React Query key is the identity of server data; freshness and retention settings decide when cached data may be reused, refetched, or removed.',
      implementation: 'Encode every data-defining parameter in stable keys, set freshness from business tolerance, and observe refetch cost and user-visible staleness.',
      failure: 'different resources share a cache entry or the application refetches far more often than the business requirement justifies',
      decision: 'the acceptable consistency, freshness, and API-cost contract for each server resource',
    }],
    [/mutation invalidation|optimistic updates|rollback|concurrent server changes/i, {
      mechanism: 'A mutation changes server truth, so the client cache must reconcile success, failure, concurrent changes, and every affected query identity.',
      implementation: 'Snapshot before optimistic writes, use server version evidence, roll back safely, and invalidate only the query families whose truth changed.',
      failure: 'an optimistic value overwrites a concurrent server update or broad invalidation creates a request storm',
      decision: 'where immediate optimistic feedback is worth reconciliation complexity and conflict risk',
    }],
    [/reducer purity|action and event|state normalization|entity adapters/i, {
      mechanism: 'Reducers deterministically calculate next state from current state and an event; normalized entities prevent duplicated records from diverging.',
      implementation: 'Model domain events, keep reducers pure, store entities once, and expose stable selectors for consumer-specific views.',
      failure: 'duplicated entities disagree or debugging cannot explain which event caused the state transition',
      decision: 'which business transitions need centralized event history and normalized ownership',
    }],
    [/selector design|selector subscription|narrow subscriptions/i, {
      mechanism: 'A selector defines both the data a component reads and often the subscription boundary that decides when it re-renders.',
      implementation: 'Select the smallest stable result, memoize only expensive derived work, and verify subscription behavior with render evidence.',
      failure: 'components re-render for unrelated store updates because selectors return broad or unstable values',
      decision: 'which derived views are shared domain capability versus component-local calculation',
    }],
    [/nested routes|layout boundaries|route segments and layouts/i, {
      mechanism: 'Nested routes map URL segments to persistent layout and data boundaries, allowing child navigation without rebuilding unrelated shell UI.',
      implementation: 'Align route segments to durable experience boundaries, keep layout ownership explicit, and test direct navigation at every depth.',
      failure: 'navigation remounts expensive shells or deep links cannot reconstruct the intended experience',
      decision: 'which URL and layout boundaries represent stable product ownership',
    }],
    [/loader|actions|server actions and mutations/i, {
      mechanism: 'Route loaders and actions coordinate navigation with data reads and mutations so pending, error, and revalidation behavior follow the route lifecycle.',
      implementation: 'Keep route data ownership explicit, handle cancellation and errors, validate mutations on the server, and revalidate only affected data.',
      failure: 'navigation races show stale data or mutations complete without refreshing the route contract',
      decision: 'which data belongs to the route boundary instead of component effects or a global cache',
    }],
    [/deep-link|history behavior|url parameters|search state/i, {
      mechanism: 'The URL and browser history are durable application state that support sharing, refresh, navigation, and recovery.',
      implementation: 'Encode meaningful navigation state, preserve back-button semantics, configure hosting fallbacks, and test direct entry separately from client navigation.',
      failure: 'refresh or shared links fail and users lose filters or location when navigating backward',
      decision: 'which state must be durable and shareable versus transient to the current component session',
    }],
    [/error boundar|fallback and recovery|render failures/i, {
      mechanism: 'An error boundary replaces a failed descendant render tree with fallback UI while preserving the rest of the application.',
      implementation: 'Place boundaries around meaningful recovery units, capture component context, provide retry or escape paths, and test fallback behavior.',
      failure: 'one isolated render defect blanks the whole application or leaves users trapped in a fallback',
      decision: 'which failure units may recover independently and which require route or application reset',
    }],
    [/suspense|fallback waterfall|reveal order|streaming user/i, {
      mechanism: 'Suspense coordinates when a compatible subtree may reveal and lets parent boundaries control fallback and progressive delivery.',
      implementation: 'Place boundaries around meaningful user tasks, avoid sequential data waterfalls, preserve revealed content where possible, and pair loading with error recovery.',
      failure: 'nested fallbacks flash or serialize otherwise parallel work, leaving the main experience blank',
      decision: 'where progressive reveal improves perceived performance without causing confusing content replacement',
    }],
    [/transition|deferredvalue|urgent versus|interruptible|concurrent/i, {
      mechanism: 'Concurrent rendering may interrupt and restart non-urgent work while urgent updates such as typing remain responsive.',
      implementation: 'Keep render pure, mark only measured non-urgent updates as transitions, and move CPU-heavy work off the main thread when scheduling is insufficient.',
      failure: 'urgent feedback is delayed or interrupted rendering exposes unsafe side effects',
      decision: 'which updates may lag behind and which must remain immediately consistent to the user',
    }],
    [/hydration|server and client output|ssr request lifecycle/i, {
      mechanism: 'Hydration attaches React behavior to server-rendered HTML and requires the first client render to match the server output.',
      implementation: 'Make initial data and environment-dependent output deterministic, isolate browser-only behavior, and treat hydration warnings as release defects.',
      failure: 'React replaces server markup or attaches behavior to an inconsistent tree',
      decision: 'which content truly requires request-time HTML and how deterministic delivery is guaranteed',
    }],
    [/static path|build scalability|build-time data|ssg build/i, {
      mechanism: 'Static generation converts route and data inputs into build artifacts, moving rendering cost to release time.',
      implementation: 'Bound generated routes, handle source failures explicitly, measure build growth, and generate only content whose freshness contract permits it.',
      failure: 'release duration or artifact volume grows beyond operational limits',
      decision: 'which content receives build-time guarantees and which requires incremental or request-time rendering',
    }],
    [/revalidation|isr regeneration|cache consistency/i, {
      mechanism: 'ISR serves cached static output and regenerates according to time or explicit invalidation while existing responses may remain available.',
      implementation: 'Tie revalidation to business freshness, invalidate dependent pages deliberately, observe failures, and prevent concurrent regeneration pressure.',
      failure: 'related pages disagree or stale content persists beyond the business freshness objective',
      decision: 'the freshness SLA and invalidation ownership for each generated route',
    }],
    [/server and client component boundaries|serializable prop|client bundle|server-side data/i, {
      mechanism: 'A Server Component executes without shipping its module to the browser, while a client boundary brings its transitive client dependencies into the interactive bundle.',
      implementation: 'Keep client boundaries narrow, pass serializable data, perform secure server work behind server-only modules, and inspect bundle impact.',
      failure: 'one broad client boundary duplicates data work and ships unnecessary code or sensitive assumptions to the browser',
      decision: 'where interactivity is required and where server ownership reduces bundle and data exposure',
    }],
    [/query priority|user-focused query|accessible form testing|accessible component/i, {
      mechanism: 'Accessible roles, names, states, and keyboard behavior are the user-facing contract that tests and components should expose.',
      implementation: 'Use native semantics first, query by role and accessible name, exercise realistic keyboard interaction, and test announced error and state changes.',
      failure: 'implementation-focused tests pass while keyboard or assistive-technology users cannot complete the journey',
      decision: 'which accessible behavior is centrally governed and required as release evidence',
    }],
    [/module mocking|fake timers|test isolation|flaky-test|slow-test/i, {
      mechanism: 'A deterministic test owns its time, dependencies, and cleanup; leaked mocks or timers make results depend on execution order.',
      implementation: 'Mock only true boundaries, restore global state, await observable completion, and diagnose flakiness before adding retries.',
      failure: 'CI results become intermittent and no longer provide credible release evidence',
      decision: 'which dependency is realistic enough to include and which must be controlled for a focused test',
    }],
    [/list virtualization|large-list|dom size/i, {
      mechanism: 'List virtualization renders only the visible window, reducing React, DOM, layout, and memory work while introducing measurement and accessibility constraints.',
      implementation: 'Virtualize only measured large lists, preserve stable item identity, test variable sizes and keyboard behavior, and monitor scroll performance.',
      failure: 'large result sets block interactions or virtualized content loses focus and accessibility behavior',
      decision: 'when reduced DOM work justifies virtualization complexity',
    }],
    [/bundle-size|code splitting|lazy loading|client bundle reduction/i, {
      mechanism: 'Code splitting changes when JavaScript is downloaded and executed; it improves initial cost only when boundaries align to real user journeys.',
      implementation: 'Split at route or feature boundaries, analyze transitive dependencies, preload intentional next steps, and enforce bundle budgets.',
      failure: 'the initial bundle grows or users face sequential loading waterfalls after navigation',
      decision: 'which capability must be immediately available and which may load on demand',
    }],
    [/subscription|websocket|event-listener|timer|interval|detached dom|heap snapshot|unbounded client cache/i, {
      mechanism: 'A resource leaks when a reachable listener, timer, subscription, cache, or DOM reference retains data after its owning journey ends.',
      implementation: 'Define ownership and cleanup, bound caches, reproduce repeated navigation, inspect heap retainers, and verify memory returns after garbage collection.',
      failure: 'long-lived sessions retain work and memory until responsiveness degrades or the tab crashes',
      decision: 'which long-lived resources are allowed, bounded, monitored, and explicitly owned',
    }],
    [/feature flag|rollback versus|canaries|incident triage|post-incident/i, {
      mechanism: 'Release controls and incident evidence connect a user-impact regression to a change and provide reversible mitigation while diagnosis continues.',
      implementation: 'Scope the cohort, preserve telemetry, disable or roll back the narrow change, validate recovery, and turn root cause into a release control.',
      failure: 'teams cannot mitigate quickly or prove recovery because changes and user impact are not correlated',
      decision: 'which failures require automatic halt, feature disablement, rollback, or coordinated forward fix',
    }],
  ];

  return rules.find(([pattern]) => pattern.test(concern))?.[1] ?? {
    mechanism: `${seed.mechanism} Specifically, ${concern} defines a separate runtime and user-facing contract within ${seed.category}.`,
    implementation: `${seed.implementation} For ${concern}, document the inputs, observable behavior, failure path, and production signal independently.`,
    failure: `${seed.failure}; the ${concern} contract is usually where the hidden assumption becomes visible`,
    decision: `${seed.decision}, with an explicit decision record for ${concern}`,
  };
}

function buildQuestion(seed: ReactTopicSeed, concern: string, intent: QuestionIntent, index: number): InterviewPrepQuestion {
  const id = `react-${slugify(seed.category)}-${slugify(concern)}-${intent}`;
  const question = questionFor(intent, concern, seed.category);
  const questionHash = hash(question);
  const [industry, journey] = industries[questionHash % industries.length];
  const knowledge = getConcernKnowledge(seed, concern);
  const directAnswer = intent === 'incident'
    ? `Treat ${concern} as the leading hypothesis, but preserve evidence and isolate the rendering, state, data, browser, or delivery layer before changing the system.`
    : intent === 'architecture'
      ? `For ${concern}, make this decision explicitly: ${knowledge.decision}.`
      : intent === 'practical'
        ? `Implement ${concern} through this production pattern: ${knowledge.implementation}`
        : knowledge.mechanism;
  const intentFocus: Record<QuestionIntent, string> = {
    concept: 'mechanism and misconception',
    practical: 'implementation and test evidence',
    incident: 'diagnosis and recurrence prevention',
    architecture: 'trade-off, governance, and operating ownership',
  };
  const detailedByIntent: Record<QuestionIntent, string[]> = {
    concept: [
      `Direct answer: ${directAnswer}`,
      `Mechanics: ${knowledge.mechanism}`,
      `Why: Understanding ${concern} prevents ${knowledge.failure}.`,
      `How: ${knowledge.implementation}`,
      `Validation: Prove the explanation using ${formatList(seed.evidence)}.`,
      `Trade-off: ${knowledge.decision}.`,
    ],
    practical: [
      `Direct answer: ${directAnswer}`,
      `Implementation choices: For ${concern}, ${knowledge.implementation.charAt(0).toLowerCase()}${knowledge.implementation.slice(1)}`,
      `Testing approach: Cover the user-visible success path, failure path, accessibility behavior, and the contract observed through ${seed.evidence[0]}.`,
      `Diagnostic evidence: Use ${formatList(seed.evidence)} before accepting the implementation.`,
      `Failure mode: ${knowledge.failure}.`,
      `Architecture decision: ${knowledge.decision}.`,
    ],
    incident: [
      `Direct answer: ${directAnswer}`,
      `Observed symptom: ${seed.incident}.`,
      `Likely root cause: The release changed an assumption around ${concern}; confirm that hypothesis rather than treating correlation as proof.`,
      `Troubleshooting approach: Preserve ${seed.evidence[0]}, compare ${seed.evidence[1]} with a healthy cohort, and use ${seed.evidence[2]} to isolate the owning layer.`,
      `Durable fix: Correct the narrow cause, add a regression test and production guardrail for ${concern}, and verify the original user journey.`,
      `Common risk: Broad rollback or optimization before preserving the evidence needed to prevent recurrence.`,
    ],
    architecture: [
      `Direct answer: ${directAnswer}`,
      `Architecture decision: ${knowledge.decision}.`,
      `Operating model: Define ownership, supported patterns, measurable guardrails, exception handling, and recovery for ${concern}.`,
      `Implementation choices: ${knowledge.implementation}`,
      `Validation: Use ${formatList(seed.evidence)} plus a failure rehearsal at representative scale.`,
      `Governance and ownership: Record why the decision exists, when it should be revisited, and who owns its production outcome.`,
    ],
  };

  const scenarioByIntent: Record<QuestionIntent, string> = {
    concept: `During a pre-release review of ${seed.category}, the team discovers that ${seed.incident}. The candidate must connect the misconception around ${concern} to the runtime mechanism, then prove the correction through ${seed.evidence[0]} and ${seed.evidence[1]}.`,
    practical: `A canary implementation of ${concern} fails when ${seed.incident}. Engineers keep the canary isolated, capture ${seed.evidence[0]}, reproduce the user path, and require ${seed.evidence[2]} plus a regression test before resuming rollout.`,
    incident: `Ten minutes after a release involving ${concern}, ${seed.incident}. The incident lead preserves ${seed.evidence[0]}, compares ${seed.evidence[1]} with the previous release, and uses ${seed.evidence[2]} to prove the failing layer before approving a targeted fix.`,
    architecture: `A quarterly architecture review finds that inconsistent decisions about ${concern} contributed to this production signal: ${seed.incident}. The lead defines an approved pattern, owner, exception path, and measurable guardrail based on ${seed.evidence[0]}.`,
  };

  const projectByIntent: Record<QuestionIntent, string> = {
    concept: `In a ${industry} program delivering ${journey}, reviewers used ${concern} as a core ${seed.category} interview and onboarding topic because misunderstanding it had caused ${knowledge.failure}. The team documented the mechanism and validated learning through ${seed.evidence[0]}.`,
    practical: `A ${industry} delivery team implemented ${concern} for ${journey} using this approach: ${knowledge.implementation} The change was accepted only after ${seed.evidence[0]} and ${seed.evidence[1]} proved the user-visible contract and failure behavior.`,
    incident: `During support for ${journey}, a ${industry} team traced a recurring incident to ${concern}. Engineers preserved ${formatList(seed.evidence.slice(0, 2))}, corrected the narrow cause, and converted the finding into a release regression gate.`,
    architecture: `While scaling ${journey}, a ${industry} platform standardized ${concern} only after deciding ${knowledge.decision}. The architecture record assigned ownership and required ${seed.evidence[0]} as ongoing proof that the pattern remained healthy.`,
  };

  const expectationByIntent: Record<QuestionIntent, string> = {
    concept: `The interviewer expects a precise explanation of the ${concern} mechanism in ${seed.category}, the misconception that causes ${knowledge.failure}, and evidence from ${seed.evidence[0]} that proves the behavior.`,
    practical: `The interviewer expects an implementation sequence for ${concern}, credible tests and failure behavior, and a reasoned explanation of how ${seed.evidence[0]} and ${seed.evidence[1]} establish release confidence.`,
    incident: `The interviewer expects disciplined production diagnosis for ${concern}: preserve evidence, scope impact, compare a healthy path, isolate the owner, and prevent recurrence after ${seed.incident}.`,
    architecture: `The interviewer expects you to defend this decision about ${concern}: ${knowledge.decision}. A strong answer includes ownership, guardrails, exceptions, production evidence, and a trigger for revisiting the choice.`,
  };

  const mistakeByIntent: Record<QuestionIntent, string> = {
    concept: `Repeating a definition of ${concern} without explaining the React runtime behavior or the misconception behind ${knowledge.failure}.`,
    practical: `Implementing ${concern} for the happy path while omitting failure, accessibility, concurrency, and production-observability tests.`,
    incident: `Changing code or rolling back ${concern} before preserving ${seed.evidence[0]} and establishing the affected user cohort.`,
    architecture: `Standardizing ${concern} without a decision owner, measurable guardrail, exception process, or retirement trigger.`,
  };

  const followUpByIntent: Record<QuestionIntent, string> = {
    concept: `How would you teach the difference between the apparent behavior and the actual React mechanism behind ${concern}?`,
    practical: `Which test would fail first if your implementation of ${concern} violated its public contract?`,
    incident: `What is the first production artifact you preserve when ${concern} is the suspected cause?`,
    architecture: `Which team-scale or product constraint would make you reject your preferred design for ${concern}?`,
  };

  const frequencyBase = intent === 'concept' ? 90 : intent === 'practical' ? 86 : intent === 'incident' ? 81 : 76;
  return {
    id,
    technologyId: 'react',
    topicGroup: seed.topicGroup,
    category: seed.category,
    questionType: questionTypes[intent],
    question,
    shortAnswer: `${directAnswer} For ${concern}, this ${intentFocus[intent]} answer should be validated using ${seed.evidence[0]}.`,
    detailedAnswer: detailedByIntent[intent],
    productionScenario: scenarioByIntent[intent],
    realProjectExample: projectByIntent[intent],
    interviewerExpectation: expectationByIntent[intent],
    commonMistakes: [
      mistakeByIntent[intent],
      `Applying a familiar pattern before validating ${seed.evidence[0]} and the actual user-visible symptom.`,
      `Treating ${concern} as an isolated ${seed.category} detail while ignoring the decision: ${knowledge.decision}.`,
      `Closing the ${intentFocus[intent]} work without a durable test, production signal, and accountable owner.`,
    ],
    followUpQuestions: [
      followUpByIntent[intent],
      `How would ${seed.evidence[0]} and ${seed.evidence[1]} prove or disprove your explanation?`,
      `What changes for ${concern} under slow networks, low-end devices, or concurrent user actions?`,
      `How should the ${seed.category} owner know when to revisit this decision: ${knowledge.decision}?`,
    ],
    frequencyScore: Math.max(62, frequencyBase - (index % 10)),
    commonWrongAnswer: `A weak answer defines ${concern} but does not explain the runtime mechanism, production failure, evidence, or trade-off.`,
    architectPerspective: `From the ${intentFocus[intent]} perspective, ${concern} is governed through this architecture decision: ${knowledge.decision}. Evaluate it against team ownership, accessibility, performance, release independence, and the incident signal "${seed.incident}"; approve it only with measurable guardrails and a recovery path.`,
    keyTakeaway: `Explain ${concern} through mechanism, implementation evidence, production failure, and an explicit architecture decision.`,
    difficultyLevel: difficultyByIntent[intent],
    experienceLevel: experienceByIntent[intent],
    relatedTopics: seed.relatedTopics,
    roleAnswers: {
      junior: `I explain what ${concern} does and demonstrate the supported React usage.`,
      mid: `I implement and test ${concern}, including realistic failure and accessibility behavior.`,
      senior: `I diagnose ${concern} with ${formatList(seed.evidence)} and add durable regression protection.`,
      architect: `I decide ${knowledge.decision}, then govern ${concern} with ownership, budgets, and production guardrails.`,
    },
    isMostAsked: index < 10,
    mostAskedRank: index < 10 ? index + 1 : undefined,
    isRapidRevision: index < 5,
  };
}

const questions = topicSeeds.flatMap((seed) => seed.concerns.flatMap((concern, concernIndex) => (
  (['concept', 'practical', 'incident', 'architecture'] as const)
    .map((intent, intentIndex) => buildQuestion(seed, concern, intent, (concernIndex * 4) + intentIndex))
)));

const topicGroups: InterviewPrepTopicGroup[] = reactInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} topics.`,
  topics: group.topics.map((topic) => topic.category),
}));

const questionsPerPage = 10;
const topicMetadata = topicSeeds.map((seed) => {
  const topicQuestions = questions.filter((question) => question.category === seed.category);
  return {
    category: seed.category,
    topicGroup: seed.topicGroup,
    totalQuestions: topicQuestions.length,
    estimatedPreparationMinutes: Math.max(20, Math.round(topicQuestions.length * 4.5)),
    questionsPerPage,
    totalPages: Math.ceil(topicQuestions.length / questionsPerPage),
    difficultyCounts: {
      Beginner: topicQuestions.filter((question) => question.difficultyLevel === 'Beginner').length,
      Intermediate: topicQuestions.filter((question) => question.difficultyLevel === 'Intermediate').length,
      Advanced: topicQuestions.filter((question) => question.difficultyLevel === 'Advanced').length,
      Architect: topicQuestions.filter((question) => question.difficultyLevel === 'Architect').length,
    },
  };
});

const topicPreparationSets = topicSeeds.map((seed) => {
  const ranked = questions.filter((question) => question.category === seed.category);
  return {
    category: seed.category,
    mostAskedQuestionIds: ranked.slice(0, 10).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 15).map((question) => question.id),
    lastMinuteQuestionIds: ranked.slice(0, 5).map((question) => question.id),
  };
});

const productionScenarios = [
  {
    id: 'react-excessive-renders',
    title: 'React page re-renders excessively',
    topic: 'Performance Issues',
    problem: 'Typing in one field makes a large dashboard visibly lag.',
    rootCauseAnalysis: ['Broad context updates', 'Unstable props and callbacks', 'Incorrect state ownership', 'Expensive unvirtualized lists'],
    troubleshootingSteps: ['Capture a Profiler trace', 'Identify the update source and affected subtree', 'Fix ownership or subscription breadth', 'Validate the user metric after the change'],
    expectedInterviewAnswer: 'I would profile first, identify why each expensive subtree rendered, and fix the architectural source before adding memoization.',
    seniorApproach: 'A senior answer separates render count from render cost and validates the actual interaction metric.',
    architectApproach: 'An architect defines performance budgets, profiling standards, and shared-state boundaries.',
    relatedQuestions: questions.filter((question) => question.category === 'Performance Issues').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'react-memory-growth',
    title: 'Long-lived session memory growth',
    topic: 'Memory Leaks',
    problem: 'An operations dashboard slows and crashes after several hours.',
    rootCauseAnalysis: ['Uncleaned subscriptions', 'Unbounded caches', 'Retained DOM and listeners', 'Timers surviving navigation'],
    troubleshootingSteps: ['Reproduce repeated navigation', 'Compare heap snapshots', 'Inspect retainers', 'Verify memory returns after cleanup'],
    expectedInterviewAnswer: 'I would prove retention with heap evidence, find the owner, fix cleanup or cache bounds, and add monitoring.',
    seniorApproach: 'A senior answer distinguishes normal cache growth from unreachable objects retained accidentally.',
    architectApproach: 'An architect defines memory budgets and ownership for long-lived sessions and shared caches.',
    relatedQuestions: questions.filter((question) => question.category === 'Memory Leaks').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'react-stale-server-state',
    title: 'Stale server state after mutation',
    topic: 'React Query',
    problem: 'A successful update is not reflected consistently across screens.',
    rootCauseAnalysis: ['Incorrect query keys', 'Missing invalidation', 'Unsafe optimistic update', 'Concurrent server changes'],
    troubleshootingSteps: ['Inspect cache identities', 'Trace mutation and invalidation', 'Compare server version data', 'Test rollback and concurrent changes'],
    expectedInterviewAnswer: 'I would treat the cache as server-state coordination, prove the query identities, and repair invalidation or optimistic reconciliation.',
    seniorApproach: 'A senior answer includes concurrency, rollback, and request-storm prevention.',
    architectApproach: 'An architect defines consistency expectations and API ownership across consumers.',
    relatedQuestions: questions.filter((question) => question.category === 'React Query').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'react-deep-link-404',
    title: 'Production deep links return 404',
    topic: 'React Router',
    problem: 'Client navigation works but refreshing or sharing a nested route fails.',
    rootCauseAnalysis: ['Missing SPA fallback', 'Incorrect base path', 'Hosting rewrite conflict', 'Authorization redirect loop'],
    troubleshootingSteps: ['Test direct navigation', 'Inspect hosting rewrites', 'Verify asset and base URLs', 'Validate auth behavior separately'],
    expectedInterviewAnswer: 'I would distinguish client route matching from server request handling and verify the deployment fallback.',
    seniorApproach: 'A senior answer covers direct links, refresh, CDN or hosting rules, auth, and observability.',
    architectApproach: 'An architect makes deep-link and deployment behavior part of route acceptance criteria.',
    relatedQuestions: questions.filter((question) => question.category === 'React Router').slice(0, 4).map((question) => question.id),
  },
];

export const reactInterviewPrep: InterviewPrepSection = {
  technologyId: 'react',
  technologyLabel: 'React',
  title: 'React Interview Prep',
  description: 'Production-oriented React interview preparation for developers, senior engineers, frontend leads, and frontend architects.',
  lastReviewed: 'June 2026',
  categories: topicSeeds.map((seed) => seed.category),
  questionTypes: Object.values(questionTypes),
  experienceLevels: [
    { id: 'beginner', label: 'React Developer', years: '0-2 Years', summary: 'Explain React fundamentals and implement accessible, testable components.' },
    { id: 'mid', label: 'Mid-Level React Developer', years: '2-5 Years', summary: 'Own hooks, state, routing, testing, and common production behavior.' },
    { id: 'senior', label: 'Senior React Developer', years: '5-8 Years', summary: 'Lead debugging, performance, state architecture, and release quality.' },
    { id: 'architect', label: 'Frontend Lead / Architect', years: '8+ Years', summary: 'Design scalable frontend platforms, governance, operating models, and production guardrails.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'React Developer', description: 'Fundamentals, components, state, hooks, and testing.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'senior', label: 'Senior React Developer', description: 'Production debugging, performance, state management, and architecture.', questionCount: 10, recommendedMinutes: 40 },
    { id: 'architect', label: 'Frontend Architect', description: 'Platform scalability, governance, Next.js, and operating-model decisions.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-frequency React concepts and production decisions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Core React, state, performance, and testing revision.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 24).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level React preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 45).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
