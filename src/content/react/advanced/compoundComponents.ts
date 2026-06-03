import type { TopicContent } from '../../types';

export const reactCompoundComponents: TopicContent = {
  slug: 'react-compound-components',
  title: 'Compound Components',
  description: 'Master the Compound Components pattern — a powerful React pattern for building flexible, expressive component APIs. Learn how to build components like Select, Tabs, and Accordion that feel native.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Compound Components is a pattern where multiple components work together to form a single UI, sharing state implicitly via Context. Like HTML\'s <select> and <option> work together, you build components like <Tabs>, <Tabs.List>, <Tabs.Tab>, <Tabs.Panel> that share state without prop drilling.',
  whatIsIt: `Compound Components are a set of components that share state implicitly:

\`\`\`tsx
// The compound component API
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="claims">Claims</Tabs.Tab>
    <Tabs.Tab value="documents">Documents</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview"><OverviewContent /></Tabs.Panel>
  <Tabs.Panel value="claims"><ClaimsContent /></Tabs.Panel>
  <Tabs.Panel value="documents"><DocumentsContent /></Tabs.Panel>
</Tabs>
\`\`\`

The parent (\`Tabs\`) owns the state (which tab is active). The children (\`Tabs.Tab\`, \`Tabs.Panel\`) read and update that state via Context — without any props being passed explicitly.`,
  whyWeNeedIt: `Without compound components, you would build a Tabs component like this:

\`\`\`tsx
// Prop-based API — rigid and hard to customise
<Tabs
  tabs={[
    { label: 'Overview', content: <OverviewContent /> },
    { label: 'Claims',   content: <ClaimsContent /> },
  ]}
  defaultTab={0}
/>
\`\`\`

Problems: you cannot customise tab rendering, add icons, or change the layout without modifying the Tabs component itself.

Compound components give consumers full control over rendering while the parent manages shared state.`,
  realWorldUsage: `Compound components are the foundation of every design system:

- \`<Select>\` / \`<Select.Option>\` — like native HTML but styled
- \`<Tabs>\` / \`<Tabs.Tab>\` / \`<Tabs.Panel>\`
- \`<Accordion>\` / \`<Accordion.Item>\` / \`<Accordion.Header>\` / \`<Accordion.Body>\`
- \`<Menu>\` / \`<Menu.Item>\` / \`<Menu.Separator>\`
- \`<Form>\` / \`<Form.Field>\` / \`<Form.Label>\` / \`<Form.Error>\`

Libraries like Radix UI, Headless UI, and Reach UI are built entirely on this pattern.`,
  howItWorks: `1. Parent component creates a Context and provides it to children
2. Parent manages shared state (active tab, open accordion item)
3. Child components consume the Context to read state and dispatch updates
4. Child components are attached to the parent as static properties (\`Tabs.Tab\`)

**Static properties pattern:**
\`\`\`ts
Tabs.List  = TabList;
Tabs.Tab   = Tab;
Tabs.Panel = TabPanel;
\`\`\`
This groups related components under one namespace and makes the API discoverable.`,
  example: {
    title: 'Building a Tabs Component',
    description: 'Complete compound component with Context and static properties.',
    code: [
      {
        label: 'Tabs Compound Component',
        language: 'tsx',
        code: `import { createContext, useContext, useState } from 'react';

// Shared state via Context
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-components must be used within <Tabs>');
  return ctx;
};

// Parent component — owns the state
interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  onChange?: (value: string) => void;
}

function Tabs({ children, defaultValue, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Child components — consume context
function TabList({ children }: { children: React.ReactNode }) {
  return <div className="tabs__list" role="tablist">{children}</div>;
}

function Tab({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={\`tabs__tab \${isActive ? 'tabs__tab--active' : ''}\`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  return <div role="tabpanel" className="tabs__panel">{children}</div>;
}

// Attach sub-components as static properties
Tabs.List  = TabList;
Tabs.Tab   = Tab;
Tabs.Panel = TabPanel;

export { Tabs };

// Usage
<Tabs defaultValue="claims" onChange={(tab) => trackTabView(tab)}>
  <Tabs.List>
    <Tabs.Tab value="claims">📋 Claims</Tabs.Tab>
    <Tabs.Tab value="documents">📄 Documents</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="claims"><ClaimsTable /></Tabs.Panel>
  <Tabs.Panel value="documents"><DocumentList /></Tabs.Panel>
</Tabs>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use compound components vs a single component with many props?',
      answer: 'Use compound components when: the component has multiple distinct sections (list, item, panel), consumers need to customise each section independently, or the layout itself needs to be flexible. Use a single component with props for simpler cases where the structure is always the same.',
    },
    {
      question: 'What is the difference between compound components and render props?',
      answer: 'Render props give the consumer control over rendering by passing a function. Compound components give the consumer control by providing sub-components that can be arranged freely. Compound components result in more readable, HTML-like JSX. Render props are better when the rendering logic is complex or data-dependent.',
    },
  ],
  productionIssues: [
    '**Missing context error** — Using a sub-component outside the parent throws the context error. Always throw a descriptive error in the context hook: "Tabs.Tab must be used within <Tabs>".',
    '**Accessibility** — Compound components need proper ARIA attributes: role="tablist", role="tab", aria-selected, role="tabpanel". Test with a screen reader.',
  ],
  bestPractices: [
    'Throw a descriptive error in the context hook if sub-components are used outside the parent',
    'Add ARIA attributes for accessibility — compound components often map to ARIA patterns',
    'Use TypeScript to type the Context value and each sub-component\'s props',
    'Attach sub-components as static properties for a discoverable API',
    'Allow controlled mode (value + onChange props) alongside uncontrolled (defaultValue)',
  ],
  architectNote: `Compound components are the gold standard for design system component APIs. They provide maximum flexibility to consumers while keeping shared state encapsulated. If you are building a component library, every complex interactive component (Tabs, Accordion, Select, Menu, Dialog) should use this pattern. Libraries like Radix UI have proven that compound components with headless (unstyled) implementations are the most reusable foundation for design systems.`,
  faqs: [
    {
      question: 'Can compound components be controlled (value + onChange)?',
      answer: 'Yes. Support both controlled and uncontrolled modes. Controlled: accept value and onChange props, use them directly. Uncontrolled: accept defaultValue, manage state internally with useState. This mirrors how native HTML inputs work and gives consumers maximum flexibility.',
    },
  ],
  keyTakeaways: [
    'Compound components share state implicitly via Context — no prop drilling',
    'Parent owns state; children consume it via a custom context hook',
    'Attach sub-components as static properties for a discoverable API (Tabs.Tab)',
    'Throw descriptive errors when sub-components are used outside the parent',
    'Add ARIA attributes for accessibility',
    'The foundation of every great design system component library',
  ],
  relatedTopics: ['react-context', 'react-render-props', 'react-hoc', 'react-custom-hooks'],
};
