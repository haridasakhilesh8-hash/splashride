import type { TopicContent } from '../../types';

export const reactHOC: TopicContent = {
  slug: 'react-hoc',
  title: 'Higher Order Components',
  description: 'Understand Higher Order Components (HOCs) — a React pattern for reusing component logic. Learn when they are still useful, when custom hooks are better, and how senior engineers use them in 2024.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A Higher Order Component (HOC) is a function that takes a component and returns a new component with enhanced behaviour. HOCs were the primary pattern for code reuse before hooks. Today, custom hooks are preferred for logic reuse, but HOCs are still useful for cross-cutting concerns like authentication, analytics, and error boundaries.',
  whatIsIt: `A Higher Order Component is a function with this signature:

\`\`\`ts
function withSomething<P>(Component: React.ComponentType<P>): React.ComponentType<P> {
  return function Enhanced(props: P) {
    // add behaviour
    return <Component {...props} />;
  };
}
\`\`\`

It wraps a component and returns a new component with added functionality:
- \`withAuth(Component)\` — redirects to login if not authenticated
- \`withLogger(Component)\` — logs renders and prop changes
- \`withErrorBoundary(Component)\` — wraps in an Error Boundary
- \`connect(mapState, mapDispatch)(Component)\` — Redux\'s HOC (classic)`,
  whyWeNeedIt: `HOCs solve cross-cutting concerns — behaviour that needs to be applied to many components:

- **Authentication** — redirect to login if the user is not authenticated
- **Analytics** — track when a component renders or receives certain props
- **Error boundaries** — wrap any component in an error boundary declaratively
- **Feature flags** — render a component only if a feature flag is enabled

For logic that involves state and effects, custom hooks are now the better choice. HOCs shine for concerns that wrap the component itself (not just its logic).`,
  realWorldUsage: `HOCs you will encounter in real codebases:

- \`React.memo(Component)\` — React\'s built-in HOC for memoisation
- \`connect()\` from react-redux (classic Redux)
- \`withRouter()\` from older React Router versions
- \`withErrorBoundary()\` from react-error-boundary
- \`withTranslation()\` from react-i18next
- Custom \`withAuth()\` for route-level authentication`,
  howItWorks: `A HOC is a pure function that:
1. Takes a component (\`WrappedComponent\`) as an argument
2. Creates a new component that renders \`WrappedComponent\`
3. Passes all original props through (\`{...props}\`)
4. Adds new props, wraps in providers, or adds conditional rendering
5. Returns the new component

**Display names:**
Set \`displayName\` on the HOC for better debugging in React DevTools: \`Enhanced.displayName = \`withAuth(\${Component.displayName})\`\`.`,
  example: {
    title: 'HOC Patterns in Production',
    description: 'Authentication HOC and feature flag HOC.',
    code: [
      {
        label: 'withAuth HOC',
        language: 'tsx',
        code: `import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// HOC: redirects to login if not authenticated
export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <FullPageSpinner />;
    if (!user) return <Navigate to="/login" replace />;

    return <WrappedComponent {...props} />;
  }

  AuthenticatedComponent.displayName = \`withAuth(\${WrappedComponent.displayName ?? WrappedComponent.name})\`;
  return AuthenticatedComponent;
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedAdminPanel = withAuth(AdminPanel);

// In routes
<Route path="/dashboard" element={<ProtectedDashboard />} />`,
      },
      {
        label: 'withFeatureFlag HOC',
        language: 'tsx',
        code: `type FeatureFlag = 'new-claims-ui' | 'bulk-export' | 'ai-suggestions';

export function withFeatureFlag<P extends object>(
  WrappedComponent: ComponentType<P>,
  flag: FeatureFlag,
  FallbackComponent?: ComponentType<P>
) {
  function FeatureFlaggedComponent(props: P) {
    const { flags } = useFeatureFlags();

    if (!flags[flag]) {
      return FallbackComponent ? <FallbackComponent {...props} /> : null;
    }

    return <WrappedComponent {...props} />;
  }

  FeatureFlaggedComponent.displayName =
    \`withFeatureFlag(\${WrappedComponent.name}, \${flag})\`;
  return FeatureFlaggedComponent;
}

// Usage
const NewClaimsUI = withFeatureFlag(NewClaimsInterface, 'new-claims-ui', OldClaimsInterface);
const BulkExportButton = withFeatureFlag(BulkExport, 'bulk-export');`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use HOCs or custom hooks in 2024?',
      answer: 'For logic reuse (data fetching, state management, event listeners): custom hooks. They are simpler, do not wrap the component tree, and are easier to compose. For concerns that wrap the component itself (error boundaries, auth guards, feature flags): HOCs are still appropriate. In practice, most HOC use cases from pre-hooks React have been replaced by hooks.',
    },
    {
      question: 'What is the HOC wrapper hell problem?',
      answer: 'Applying multiple HOCs creates deeply nested component trees: withAuth(withLogger(withErrorBoundary(MyComponent))). This makes debugging hard (React DevTools shows many wrapper components) and makes the code harder to read. Custom hooks compose more cleanly without adding wrapper components.',
    },
  ],
  productionIssues: [
    '**Forgetting to forward refs** — HOCs wrap components, breaking ref forwarding. Use React.forwardRef inside the HOC if the wrapped component needs to expose a ref.',
    '**Prop name collisions** — If the HOC injects a prop with the same name as an existing prop, one will be overwritten. Namespace HOC-injected props or document them clearly.',
    '**Static method loss** — HOCs do not automatically copy static methods from the wrapped component. Use hoist-non-react-statics library to copy them.',
  ],
  bestPractices: [
    'Prefer custom hooks for logic reuse — use HOCs for component-wrapping concerns',
    'Always pass through all original props: <WrappedComponent {...props} />',
    'Set displayName for better React DevTools debugging',
    'Use React.forwardRef if the wrapped component needs ref access',
    'Keep HOCs focused on one concern — do not combine multiple behaviours',
    'Document what props the HOC injects and what it requires',
  ],
  architectNote: `HOCs are a pattern, not a primitive. In 2024, most logic that was previously in HOCs lives in custom hooks. The remaining valid HOC use cases are component-level concerns: error boundaries, auth guards, feature flags, and analytics wrappers. These make sense as HOCs because they wrap the component\'s rendering, not just its logic. For everything else, reach for a custom hook first.`,
  faqs: [
    {
      question: 'Is React.memo a HOC?',
      answer: 'Yes. React.memo is a built-in HOC that adds shallow prop comparison memoisation. It takes a component and returns a new memoised component. It is the most commonly used HOC in modern React.',
    },
    {
      question: 'How do I type a HOC in TypeScript?',
      answer: 'Use generics: function withAuth<P extends object>(Component: ComponentType<P>): ComponentType<P>. If the HOC injects props, use Omit: function withUser<P extends { user: User }>(Component: ComponentType<P>): ComponentType<Omit<P, "user">>. TypeScript HOC typing can be complex — this is another reason custom hooks are often preferred.',
    },
  ],
  keyTakeaways: [
    'HOCs are functions that take a component and return an enhanced component',
    'Custom hooks are preferred for logic reuse in 2024',
    'HOCs are still useful for component-level concerns: auth, feature flags, error boundaries',
    'Always pass through original props with spread: {...props}',
    'Set displayName for better debugging in React DevTools',
    'React.memo is the most commonly used HOC in modern React',
  ],
  relatedTopics: ['react-custom-hooks', 'react-render-props', 'react-compound-components'],
};
