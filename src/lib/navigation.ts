// ─────────────────────────────────────────────────────────────────────────────
// SplashRide — Multi-technology navigation registry
// Adding a new technology: add a TechSection entry + NavCategory[] entries.
// Adding a new topic: add a NavItem to the right category + a content file.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  slug: string;
  title: string;
  badge?: string;
}

export interface NavCategory {
  id: string;
  title: string;
  icon: string;
  items: NavItem[];
}

export interface TechSection {
  id: string;           // unique key, used in URLs: /tech/:id/topic/:slug
  label: string;        // display name
  icon: string;         // emoji
  color: string;        // brand color for cards/badges
  description: string;  // short description shown on homepage card
  topicCount: number;   // number of live topics
  active: boolean;      // false = Coming Soon
  categories: NavCategory[];
}

// ─────────────────────────────────────────────────────────────────────────────
// AEM — ACTIVE
// ─────────────────────────────────────────────────────────────────────────────
const aemCategories: NavCategory[] = [
  {
    id: 'aem-fundamentals',
    title: 'Fundamentals',
    icon: '🏗️',
    items: [
      { slug: 'architecture', title: 'Architecture' },
      { slug: 'aem-sites-assets-forms', title: 'Sites, Assets, and Forms' },
      { slug: 'jcr', title: 'JCR' },
      { slug: 'oak-repository', title: 'Oak Repository' },
      { slug: 'crxde', title: 'CRXDE' },
    ],
  },
  {
    id: 'aem-development',
    title: 'Development',
    icon: '⚙️',
    items: [
      { slug: 'components', title: 'Components' },
      { slug: 'templates', title: 'Templates' },
      { slug: 'editable-templates', title: 'Editable Templates' },
      { slug: 'core-components-and-dialogs', title: 'Core Components and Dialogs' },
      { slug: 'page-authoring-and-universal-editor', title: 'Page Authoring and Universal Editor' },
      { slug: 'sling', title: 'Sling' },
      { slug: 'sling-models', title: 'Sling Models' },
      { slug: 'htl', title: 'HTL' },
      { slug: 'client-libraries', title: 'Client Libraries' },
      { slug: 'osgi', title: 'OSGi' },
    ],
  },
  {
    id: 'aem-content',
    title: 'Content Management',
    icon: '📄',
    items: [
      { slug: 'content-fragments', title: 'Content Fragments' },
      { slug: 'experience-fragments', title: 'Experience Fragments' },
      { slug: 'assets-and-dam', title: 'Assets and DAM' },
      { slug: 'launches-and-localization', title: 'Launches and Localization' },
    ],
  },
  {
    id: 'aem-advanced',
    title: 'Advanced',
    icon: '🚀',
    items: [
      { slug: 'dispatcher', title: 'Dispatcher' },
      { slug: 'msm', title: 'MSM' },
      { slug: 'workflows', title: 'Workflows' },
      { slug: 'events-and-jobs', title: 'Events and Jobs' },
      { slug: 'query-builder-and-indexing', title: 'Query Builder and Indexing' },
      { slug: 'graphql', title: 'GraphQL' },
      { slug: 'headless-aem', title: 'Headless AEM' },
      { slug: 'aem-performance', title: 'Performance' },
      { slug: 'aem-security', title: 'Security' },
      { slug: 'aem-integrations', title: 'Integrations' },
      { slug: 'aem-testing', title: 'Testing and Best Practices' },
      { slug: 'production-troubleshooting', title: 'Production Troubleshooting' },
    ],
  },
  {
    id: 'aem-cloud',
    title: 'Cloud Service',
    icon: '☁️',
    items: [
      { slug: 'aem-cloud-service', title: 'AEM Cloud Service' },
      { slug: 'cloud-manager-and-devops', title: 'Cloud Manager and DevOps' },
      { slug: 'edge-delivery-services', title: 'Edge Delivery Services' },
    ],
  },
];

const contentfulCategories: NavCategory[] = [
  {
    id: 'contentful-fundamentals',
    title: 'Fundamentals',
    icon: 'CTF',
    items: [
      { slug: 'what-is-contentful', title: 'What is Contentful' },
      { slug: 'contentful-platform-overview', title: 'Platform Overview' },
      { slug: 'contentful-spaces-environments', title: 'Spaces and Environments' },
      { slug: 'contentful-content-types', title: 'Content Types' },
      { slug: 'contentful-entries-assets', title: 'Entries and Assets' },
      { slug: 'contentful-vs-aem', title: 'Contentful vs AEM' },
      { slug: 'contentful-vs-sitecore', title: 'Contentful vs Sitecore' },
    ],
  },
  {
    id: 'contentful-modeling',
    title: 'Content Modeling',
    icon: 'MOD',
    items: [
      { slug: 'contentful-content-model-design', title: 'Content Model Design' },
      { slug: 'contentful-references-relationships', title: 'References and Relationships' },
      { slug: 'contentful-rich-text-fields', title: 'Rich Text Fields' },
      { slug: 'contentful-field-validations', title: 'Field Validations' },
    ],
  },
  {
    id: 'contentful-delivery-apis',
    title: 'Delivery APIs',
    icon: 'API',
    items: [
      { slug: 'contentful-content-delivery-api', title: 'Content Delivery API' },
      { slug: 'contentful-content-preview-api', title: 'Content Preview API' },
      { slug: 'contentful-graphql-api', title: 'GraphQL API' },
      { slug: 'contentful-sync-api', title: 'Sync API' },
      { slug: 'contentful-rest-vs-graphql', title: 'REST vs GraphQL' },
      { slug: 'contentful-api-tokens-rate-limits', title: 'API Tokens and Rate Limits' },
    ],
  },
  {
    id: 'contentful-management',
    title: 'Content Management',
    icon: 'CMS',
    items: [
      { slug: 'contentful-content-management-api', title: 'Content Management API' },
      { slug: 'contentful-roles-permissions', title: 'Roles and Permissions' },
      { slug: 'contentful-webhooks', title: 'Webhooks' },
      { slug: 'contentful-content-publishing-flow', title: 'Content Publishing Flow' },
      { slug: 'contentful-environment-aliases', title: 'Environment Aliases' },
      { slug: 'contentful-release-workflow', title: 'Release Workflow' },
    ],
  },
  {
    id: 'contentful-integration',
    title: 'Integration',
    icon: 'INT',
    items: [
      { slug: 'contentful-react', title: 'Contentful with React' },
      { slug: 'contentful-nextjs', title: 'Contentful with Next.js' },
      { slug: 'contentful-rendering-rich-text', title: 'Rendering Rich Text' },
      { slug: 'contentful-asset-optimization', title: 'Images and Asset Optimization' },
      { slug: 'contentful-composable-architecture', title: 'Composable Architecture' },
    ],
  },
  {
    id: 'contentful-production',
    title: 'Production',
    icon: 'PRD',
    items: [
      { slug: 'contentful-preview-setup', title: 'Preview Setup' },
      { slug: 'contentful-localization', title: 'Localization' },
      { slug: 'contentful-locales-fallbacks', title: 'Locales and Fallbacks' },
      { slug: 'contentful-caching-strategy', title: 'Caching Strategy' },
      { slug: 'contentful-migration-strategy', title: 'Migration Strategy' },
      { slug: 'contentful-production-troubleshooting', title: 'Production Troubleshooting' },
      { slug: 'contentful-testing-best-practices', title: 'Testing and Best Practices' },
      { slug: 'contentful-best-practices', title: 'Best Practices' },
    ],
  },
  {
    id: 'contentful-interview-prep',
    title: 'Interview Prep',
    icon: 'Q&A',
    items: [
      { slug: 'contentful-interview-questions', title: 'Contentful Interview Questions' },
      { slug: 'contentful-scenario-questions', title: 'Scenario Questions' },
      { slug: 'contentful-production-issues', title: 'Production Issues' },
      { slug: 'contentful-architect-level-questions', title: 'Architect-Level Questions' },
    ],
  },
];

const sitecoreCategories: NavCategory[] = [
  {
    id: 'sitecore-fundamentals',
    title: 'Fundamentals',
    icon: 'CMS',
    items: [
      { slug: 'what-is-sitecore', title: 'What is Sitecore' },
      { slug: 'sitecore-cms-vs-dxp', title: 'Sitecore CMS vs DXP' },
      { slug: 'sitecore-xm-vs-xp-vs-xm-cloud', title: 'XM vs XP vs XM Cloud' },
      { slug: 'sitecore-headless-vs-mvc', title: 'Headless vs MVC' },
      { slug: 'sitecore-content-tree', title: 'Content Tree' },
      { slug: 'sitecore-items-fields', title: 'Items and Fields' },
      { slug: 'sitecore-templates-standard-values', title: 'Templates and Standard Values' },
    ],
  },
  {
    id: 'sitecore-content-architecture',
    title: 'Content Architecture',
    icon: 'MOD',
    items: [
      { slug: 'sitecore-template-design', title: 'Template Design' },
      { slug: 'sitecore-multisite-architecture', title: 'Multisite Architecture' },
      { slug: 'sitecore-sxa', title: 'Sitecore SXA' },
      { slug: 'sitecore-datasources', title: 'Datasources' },
      { slug: 'sitecore-renderings', title: 'Renderings' },
      { slug: 'sitecore-layouts', title: 'Layouts' },
      { slug: 'sitecore-placeholders', title: 'Placeholders' },
      { slug: 'sitecore-components', title: 'Components' },
    ],
  },
  {
    id: 'sitecore-development',
    title: 'Sitecore Development',
    icon: 'APP',
    items: [
      { slug: 'sitecore-mvc-basics', title: 'Sitecore MVC Basics' },
      { slug: 'sitecore-helix-principles', title: 'Helix Principles' },
      { slug: 'sitecore-jss', title: 'Sitecore JSS' },
      { slug: 'sitecore-headless-services', title: 'Headless Services' },
      { slug: 'sitecore-layout-service', title: 'Layout Service' },
      { slug: 'sitecore-nextjs-rendering-host', title: 'Next.js Rendering Host' },
    ],
  },
  {
    id: 'sitecore-authoring',
    title: 'Authoring Experience',
    icon: 'WRK',
    items: [
      { slug: 'sitecore-experience-editor', title: 'Experience Editor' },
      { slug: 'sitecore-pages', title: 'Pages' },
      { slug: 'sitecore-experience-editor-vs-pages', title: 'Experience Editor vs Pages' },
      { slug: 'sitecore-forms', title: 'Sitecore Forms' },
      { slug: 'sitecore-workflows', title: 'Workflows' },
      { slug: 'sitecore-versioning', title: 'Versioning' },
      { slug: 'sitecore-publishing', title: 'Publishing' },
      { slug: 'sitecore-media-library', title: 'Media Library' },
    ],
  },
  {
    id: 'sitecore-personalization',
    title: 'Personalization and Marketing',
    icon: 'PM',
    items: [
      { slug: 'sitecore-personalization-basics', title: 'Personalization Basics' },
      { slug: 'sitecore-rules-engine', title: 'Rules Engine' },
      { slug: 'sitecore-profiles-goals', title: 'Profiles and Goals' },
      { slug: 'sitecore-campaigns', title: 'Campaigns' },
      { slug: 'sitecore-analytics-concepts', title: 'Analytics Concepts' },
    ],
  },
  {
    id: 'sitecore-apis',
    title: 'APIs and Integration',
    icon: 'API',
    items: [
      { slug: 'sitecore-graphql', title: 'GraphQL' },
      { slug: 'sitecore-experience-edge', title: 'Experience Edge' },
      { slug: 'sitecore-content-delivery', title: 'Content Delivery' },
      { slug: 'sitecore-search-solr', title: 'Search and Solr' },
      { slug: 'sitecore-search-integration', title: 'Search Integration' },
      { slug: 'sitecore-external-system-integration', title: 'External System Integration' },
    ],
  },
  {
    id: 'sitecore-production',
    title: 'DevOps and Production',
    icon: 'OPS',
    items: [
      { slug: 'sitecore-cli', title: 'Sitecore CLI' },
      { slug: 'sitecore-content-serialization', title: 'Content Serialization' },
      { slug: 'sitecore-serialization-strategy', title: 'Serialization Strategy' },
      { slug: 'sitecore-environment-strategy', title: 'Environment Strategy' },
      { slug: 'sitecore-xm-cloud-deployment-model', title: 'XM Cloud Deployment Model' },
      { slug: 'sitecore-deployment-flow', title: 'Deployment Flow' },
      { slug: 'sitecore-caching', title: 'Caching' },
      { slug: 'sitecore-performance', title: 'Performance' },
      { slug: 'sitecore-security-roles', title: 'Security and Roles' },
      { slug: 'sitecore-language-fallback', title: 'Language Fallback and Localization' },
      { slug: 'sitecore-troubleshooting', title: 'Troubleshooting' },
    ],
  },
  {
    id: 'sitecore-interview-prep',
    title: 'Interview Prep',
    icon: 'Q&A',
    items: [
      { slug: 'sitecore-interview-questions', title: 'Sitecore Interview Questions' },
      { slug: 'sitecore-scenario-questions', title: 'Scenario Questions' },
      { slug: 'sitecore-production-issues', title: 'Production Issues' },
      { slug: 'sitecore-architect-level-questions', title: 'Architect-Level Questions' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Future technologies — placeholder categories only, no content yet
// ─────────────────────────────────────────────────────────────────────────────
const reactCategories: NavCategory[] = [
  {
    id: 'react-fundamentals',
    title: 'Fundamentals',
    icon: '⚛️',
    items: [
      { slug: 'react-components', title: 'Components' },
      { slug: 'react-jsx',        title: 'JSX' },
      { slug: 'react-props',      title: 'Props' },
      { slug: 'react-state',      title: 'State' },
    ],
  },
  {
    id: 'react-hooks',
    title: 'Hooks',
    icon: '🪝',
    items: [
      { slug: 'react-hooks-usestate',    title: 'useState' },
      { slug: 'react-hooks-useeffect',   title: 'useEffect' },
      { slug: 'react-hooks-usememo',     title: 'useMemo' },
      { slug: 'react-hooks-usecallback', title: 'useCallback' },
      { slug: 'react-hooks-useref',      title: 'useRef' },
      { slug: 'react-hooks-usereducer',  title: 'useReducer' },
      { slug: 'react-custom-hooks',      title: 'Custom Hooks' },
    ],
  },
  {
    id: 'react-state-management',
    title: 'State Management',
    icon: '🗄️',
    items: [
      { slug: 'react-redux',         title: 'Redux' },
      { slug: 'react-context',       title: 'Context API' },
      { slug: 'react-redux-toolkit', title: 'Redux Toolkit' },
      { slug: 'react-react-query',   title: 'React Query' },
      { slug: 'react-zustand',       title: 'Zustand' },
    ],
  },
  {
    id: 'react-routing',
    title: 'Routing',
    icon: '🗺️',
    items: [
      { slug: 'react-router',           title: 'React Router' },
      { slug: 'react-nested-routes',    title: 'Nested Routes' },
      { slug: 'react-protected-routes', title: 'Protected Routes' },
    ],
  },
  {
    id: 'react-performance',
    title: 'Performance',
    icon: '⚡',
    items: [
      { slug: 'react-memo',         title: 'React.memo' },
      { slug: 'react-lazy-loading', title: 'Lazy Loading' },
      { slug: 'react-performance',  title: 'Code Splitting' },
    ],
  },
  {
    id: 'react-forms',
    title: 'Forms',
    icon: '📝',
    items: [
      { slug: 'react-controlled-components', title: 'Controlled Components' },
      { slug: 'react-hook-form',             title: 'React Hook Form' },
    ],
  },
  {
    id: 'react-api',
    title: 'API Integration',
    icon: '📡',
    items: [
      { slug: 'react-fetch-api',      title: 'Fetch API' },
      { slug: 'react-axios',          title: 'Axios' },
      { slug: 'react-error-handling', title: 'Error Handling' },
    ],
  },
  {
    id: 'react-advanced',
    title: 'Advanced',
    icon: '🚀',
    items: [
      { slug: 'react-error-boundaries',    title: 'Error Boundaries' },
      { slug: 'react-portals',             title: 'Portals' },
      { slug: 'react-suspense',            title: 'Suspense' },
      { slug: 'react-concurrent-features', title: 'Concurrent Features' },
      { slug: 'react-hoc',                 title: 'Higher Order Components' },
      { slug: 'react-render-props',        title: 'Render Props' },
      { slug: 'react-compound-components', title: 'Compound Components' },
    ],
  },
  {
    id: 'react-testing',
    title: 'Testing',
    icon: 'TST',
    items: [
      { slug: 'react-jest',            title: 'Jest' },
      { slug: 'react-testing-library', title: 'React Testing Library' },
    ],
  },
  {
    id: 'react-architecture',
    title: 'Architecture',
    icon: 'ARC',
    items: [
      { slug: 'react-folder-structure',       title: 'Folder Structure' },
      { slug: 'react-design-patterns',        title: 'Design Patterns' },
      { slug: 'react-scalability',            title: 'Scalability' },
      { slug: 'react-component-architecture', title: 'Component Architecture' },
    ],
  },
];

const nextjsCategories: NavCategory[] = [
  {
    id: 'nextjs-fundamentals',
    title: 'Fundamentals',
    icon: '▲',
    items: [
      { slug: 'nextjs-introduction',      title: 'Introduction' },
      { slug: 'nextjs-project-structure', title: 'Project Structure' },
      { slug: 'nextjs-app-router',        title: 'App Router' },
    ],
  },
  {
    id: 'nextjs-rendering',
    title: 'Rendering',
    icon: '🖥️',
    items: [
      { slug: 'nextjs-server-components', title: 'Server Components' },
      { slug: 'nextjs-client-components', title: 'Client Components' },
      { slug: 'nextjs-ssr',               title: 'SSR' },
      { slug: 'nextjs-ssg',               title: 'SSG' },
      { slug: 'nextjs-isr',               title: 'ISR' },
    ],
  },
  {
    id: 'nextjs-data-fetching',
    title: 'Data Fetching',
    icon: '📡',
    items: [
      { slug: 'nextjs-fetch-api',            title: 'Fetch API & Caching' },
      { slug: 'nextjs-server-data-fetching', title: 'Server Data Fetching' },
      { slug: 'nextjs-client-data-fetching', title: 'Client Data Fetching' },
      { slug: 'nextjs-revalidation',         title: 'Revalidation' },
      { slug: 'nextjs-caching',              title: 'Caching Layers' },
    ],
  },
  {
    id: 'nextjs-routing',
    title: 'Routing',
    icon: '🗺️',
    items: [
      { slug: 'nextjs-dynamic-routes', title: 'Dynamic Routes' },
      { slug: 'nextjs-nested-routes',  title: 'Nested Routes & Layouts' },
      { slug: 'nextjs-route-groups',   title: 'Route Groups' },
    ],
  },
  {
    id: 'nextjs-api-layer',
    title: 'API Layer',
    icon: '⚙️',
    items: [
      { slug: 'nextjs-route-handlers', title: 'Route Handlers' },
      { slug: 'nextjs-rest-apis',      title: 'REST APIs' },
      { slug: 'nextjs-middleware',     title: 'Middleware' },
      { slug: 'nextjs-authentication', title: 'Authentication' },
    ],
  },
  {
    id: 'nextjs-performance',
    title: 'Performance',
    icon: '⚡',
    items: [
      { slug: 'nextjs-image-optimization', title: 'Image Optimization' },
      { slug: 'nextjs-lazy-loading',       title: 'Lazy Loading' },
      { slug: 'nextjs-streaming',          title: 'Streaming & Suspense' },
      { slug: 'nextjs-metadata-api',       title: 'Metadata API' },
    ],
  },
  {
    id: 'nextjs-deployment',
    title: 'Deployment',
    icon: '🚀',
    items: [
      { slug: 'nextjs-vercel-deployment',     title: 'Vercel' },
      { slug: 'nextjs-environment-variables', title: 'Environment Variables' },
      { slug: 'nextjs-cicd',                  title: 'CI/CD' },
      { slug: 'nextjs-monitoring',            title: 'Monitoring' },
    ],
  },
  {
    id: 'nextjs-advanced',
    title: 'Advanced',
    icon: '🏗️',
    items: [
      { slug: 'nextjs-server-actions',          title: 'Server Actions' },
      { slug: 'nextjs-edge-runtime',            title: 'Edge Runtime' },
      { slug: 'nextjs-caching-strategies',      title: 'Caching Strategies' },
      { slug: 'nextjs-enterprise-architecture', title: 'Enterprise Architecture' },
    ],
  },
];

const javaCategories: NavCategory[] = [
  {
    id: 'java-fundamentals',
    title: 'Fundamentals',
    icon: '☕',
    items: [
      { slug: 'java-architecture', title: 'Java Architecture' },
      { slug: 'java-jvm',          title: 'JVM' },
      { slug: 'java-jdk-jre',      title: 'JDK vs JRE' },
      { slug: 'java-data-types',   title: 'Data Types' },
      { slug: 'java-operators',    title: 'Operators' },
    ],
  },
  {
    id: 'java-oop',
    title: 'OOP',
    icon: '🏛️',
    items: [
      { slug: 'java-classes-objects', title: 'Classes & Objects' },
      { slug: 'java-encapsulation',   title: 'Encapsulation' },
      { slug: 'java-inheritance',     title: 'Inheritance' },
      { slug: 'java-polymorphism',    title: 'Polymorphism' },
      { slug: 'java-abstraction',     title: 'Abstraction' },
    ],
  },
  {
    id: 'java-collections',
    title: 'Collections',
    icon: '📦',
    items: [
      { slug: 'java-collections-list', title: 'List' },
      { slug: 'java-collections-set',  title: 'Set' },
      { slug: 'java-collections-map',  title: 'Map' },
      { slug: 'java-arraylist',        title: 'ArrayList' },
      { slug: 'java-linkedlist',       title: 'LinkedList' },
      { slug: 'java-hashmap',          title: 'HashMap' },
      { slug: 'java-hashset',          title: 'HashSet' },
    ],
  },
  {
    id: 'java-exceptions',
    title: 'Exception Handling',
    icon: '🚨',
    items: [
      { slug: 'java-exception-trycatch', title: 'Try Catch' },
      { slug: 'java-exception-throws',   title: 'Throws' },
      { slug: 'java-exception-custom',   title: 'Custom Exceptions' },
    ],
  },
  {
    id: 'java-java8',
    title: 'Java 8+',
    icon: '⚡',
    items: [
      { slug: 'java-lambda',                title: 'Lambda Expressions' },
      { slug: 'java-functional-interfaces', title: 'Functional Interfaces' },
      { slug: 'java-streams',               title: 'Streams API' },
      { slug: 'java-optional',              title: 'Optional' },
    ],
  },
  {
    id: 'java-multithreading',
    title: 'Multithreading',
    icon: '🔄',
    items: [
      { slug: 'java-threads',            title: 'Threads' },
      { slug: 'java-runnable',           title: 'Runnable' },
      { slug: 'java-executor-framework', title: 'Executor Framework' },
      { slug: 'java-synchronization',    title: 'Synchronization' },
      { slug: 'java-completable-future', title: 'CompletableFuture' },
    ],
  },
  {
    id: 'java-memory',
    title: 'Memory Management',
    icon: '🧠',
    items: [
      { slug: 'java-heap-stack',         title: 'Heap & Stack' },
      { slug: 'java-garbage-collection', title: 'Garbage Collection' },
    ],
  },
  {
    id: 'java-fileio',
    title: 'File Handling',
    icon: '📁',
    items: [
      { slug: 'java-file-api', title: 'File API' },
      { slug: 'java-nio',      title: 'NIO' },
    ],
  },
  {
    id: 'java-advanced',
    title: 'Advanced',
    icon: '🚀',
    items: [
      { slug: 'java-generics',              title: 'Generics' },
      { slug: 'java-comparable-comparator', title: 'Comparable vs Comparator' },
      { slug: 'java-serialization',         title: 'Serialization' },
      { slug: 'java-reflection',            title: 'Reflection' },
    ],
  },
];

const springCategories: NavCategory[] = [
  {
    id: 'spring-core',
    title: 'Core',
    icon: '🌱',
    items: [
      { slug: 'spring-introduction',      title: 'Spring Boot Introduction' },
      { slug: 'spring-auto-configuration', title: 'Auto Configuration' },
      { slug: 'spring-starters',          title: 'Starter Dependencies' },
      { slug: 'spring-properties',        title: 'Application Properties' },
    ],
  },
  {
    id: 'spring-ioc',
    title: 'IoC & DI',
    icon: '🔗',
    items: [
      { slug: 'spring-ioc',            title: 'IoC Container' },
      { slug: 'spring-di',             title: 'Dependency Injection' },
      { slug: 'spring-bean-lifecycle', title: 'Bean Lifecycle' },
      { slug: 'spring-bean-scopes',    title: 'Bean Scopes' },
    ],
  },
  {
    id: 'spring-rest',
    title: 'REST APIs',
    icon: '🌐',
    items: [
      { slug: 'spring-controllers',        title: 'Controllers' },
      { slug: 'spring-request-mapping',    title: 'Request Mapping' },
      { slug: 'spring-request-params',     title: 'Request Params' },
      { slug: 'spring-path-variables',     title: 'Path Variables' },
      { slug: 'spring-exception-handling', title: 'Exception Handling' },
    ],
  },
  {
    id: 'spring-data',
    title: 'Data Layer',
    icon: '🗄️',
    items: [
      { slug: 'spring-data-jpa',       title: 'Spring Data JPA' },
      { slug: 'spring-entity-mapping', title: 'Entity Mapping' },
      { slug: 'spring-repositories',   title: 'Repositories' },
      { slug: 'spring-pagination',     title: 'Pagination' },
      { slug: 'spring-auditing',       title: 'Auditing' },
    ],
  },
  {
    id: 'spring-database',
    title: 'Database',
    icon: '🐘',
    items: [
      { slug: 'spring-mysql',        title: 'MySQL Integration' },
      { slug: 'spring-postgresql',   title: 'PostgreSQL Integration' },
      { slug: 'spring-transactions', title: 'Transactions' },
    ],
  },
  {
    id: 'spring-security',
    title: 'Security',
    icon: '🔐',
    items: [
      { slug: 'spring-security',       title: 'Spring Security' },
      { slug: 'spring-authentication', title: 'Authentication' },
      { slug: 'spring-authorization',  title: 'Authorization' },
      { slug: 'spring-jwt',            title: 'JWT' },
    ],
  },
  {
    id: 'spring-testing',
    title: 'Testing',
    icon: '🧪',
    items: [
      { slug: 'spring-unit-testing',        title: 'Unit Testing' },
      { slug: 'spring-integration-testing', title: 'Integration Testing' },
      { slug: 'spring-mockmvc',             title: 'MockMvc' },
    ],
  },
  {
    id: 'spring-microservices',
    title: 'Microservices',
    icon: '🔀',
    items: [
      { slug: 'spring-service-communication', title: 'Service Communication' },
      { slug: 'spring-api-gateway',           title: 'API Gateway' },
      { slug: 'spring-service-discovery',     title: 'Service Discovery' },
      { slug: 'spring-config-server',         title: 'Config Server' },
    ],
  },
  {
    id: 'spring-production',
    title: 'Production',
    icon: '🚀',
    items: [
      { slug: 'spring-logging',            title: 'Logging' },
      { slug: 'spring-profiles',           title: 'Profiles' },
      { slug: 'spring-actuator',           title: 'Actuator' },
      { slug: 'spring-monitoring',         title: 'Monitoring' },
      { slug: 'spring-performance-tuning', title: 'Performance Tuning' },
    ],
  },
];

const awsCategories: NavCategory[] = [
  {
    id: 'aws-fundamentals',
    title: 'AWS Fundamentals',
    icon: 'AWS',
    items: [
      { slug: 'aws-overview', title: 'AWS Overview' },
      { slug: 'aws-global-infrastructure', title: 'Global Infrastructure' },
      { slug: 'aws-regions-availability-zones', title: 'Regions & Availability Zones' },
      { slug: 'aws-shared-responsibility-model', title: 'Shared Responsibility Model' },
    ],
  },
  {
    id: 'aws-compute',
    title: 'Compute',
    icon: 'CPU',
    items: [
      { slug: 'aws-ec2', title: 'EC2' },
      { slug: 'aws-auto-scaling', title: 'Auto Scaling' },
      { slug: 'aws-load-balancer', title: 'Load Balancer' },
    ],
  },
  {
    id: 'aws-storage',
    title: 'Storage',
    icon: 'S3',
    items: [
      { slug: 'aws-s3', title: 'S3' },
      { slug: 'aws-ebs', title: 'EBS' },
      { slug: 'aws-efs', title: 'EFS' },
    ],
  },
  {
    id: 'aws-security',
    title: 'Security',
    icon: 'SEC',
    items: [
      { slug: 'aws-iam', title: 'IAM' },
      { slug: 'aws-roles', title: 'Roles' },
      { slug: 'aws-policies', title: 'Policies' },
      { slug: 'aws-mfa', title: 'MFA' },
    ],
  },
  {
    id: 'aws-networking',
    title: 'Networking',
    icon: 'NET',
    items: [
      { slug: 'aws-vpc', title: 'VPC' },
      { slug: 'aws-subnets', title: 'Subnets' },
      { slug: 'aws-security-groups', title: 'Security Groups' },
      { slug: 'aws-route-tables', title: 'Route Tables' },
      { slug: 'aws-nat-gateway', title: 'NAT Gateway' },
    ],
  },
  {
    id: 'aws-serverless',
    title: 'Serverless',
    icon: 'Fn',
    items: [
      { slug: 'aws-lambda', title: 'Lambda' },
      { slug: 'aws-api-gateway', title: 'API Gateway' },
      { slug: 'aws-eventbridge', title: 'EventBridge' },
    ],
  },
  {
    id: 'aws-database',
    title: 'Database',
    icon: 'DB',
    items: [
      { slug: 'aws-rds', title: 'RDS' },
      { slug: 'aws-dynamodb', title: 'DynamoDB' },
    ],
  },
  {
    id: 'aws-monitoring',
    title: 'Monitoring',
    icon: 'MON',
    items: [
      { slug: 'aws-cloudwatch', title: 'CloudWatch' },
      { slug: 'aws-cloudtrail', title: 'CloudTrail' },
    ],
  },
  {
    id: 'aws-devops-iac',
    title: 'DevOps & IaC',
    icon: 'IaC',
    items: [
      { slug: 'aws-codepipeline', title: 'CodePipeline' },
      { slug: 'aws-codebuild', title: 'CodeBuild' },
      { slug: 'aws-codedeploy', title: 'CodeDeploy' },
      { slug: 'aws-cloudformation', title: 'CloudFormation' },
    ],
  },
  {
    id: 'aws-architecture',
    title: 'Architecture',
    icon: 'ARC',
    items: [
      { slug: 'aws-high-availability', title: 'High Availability' },
      { slug: 'aws-scalability', title: 'Scalability' },
      { slug: 'aws-disaster-recovery', title: 'Disaster Recovery' },
      { slug: 'aws-cost-optimization', title: 'Cost Optimization' },
    ],
  },
];

const dockerCategories: NavCategory[] = [
  {
    id: 'docker-fundamentals',
    title: 'Fundamentals',
    icon: '🐳',
    items: [
      { slug: 'docker-overview', title: 'Docker Overview' },
      { slug: 'docker-containers-vs-virtual-machines', title: 'Containers vs Virtual Machines' },
      { slug: 'docker-architecture', title: 'Docker Architecture' },
    ],
  },
  {
    id: 'docker-images-builds',
    title: 'Images & Builds',
    icon: '📦',
    items: [
      { slug: 'docker-images', title: 'Docker Images' },
      { slug: 'docker-hub', title: 'Docker Hub' },
      { slug: 'docker-dockerfile', title: 'Dockerfile' },
      { slug: 'docker-multi-stage-builds', title: 'Multi-Stage Builds' },
    ],
  },
  {
    id: 'docker-runtime',
    title: 'Runtime',
    icon: '⚙️',
    items: [
      { slug: 'docker-container-lifecycle', title: 'Container Lifecycle' },
      { slug: 'docker-volumes', title: 'Volumes' },
      { slug: 'docker-networking', title: 'Networking' },
    ],
  },
  {
    id: 'docker-delivery',
    title: 'Delivery & Operations',
    icon: '🚀',
    items: [
      { slug: 'docker-compose', title: 'Docker Compose' },
      { slug: 'docker-security', title: 'Security' },
      { slug: 'docker-cicd-integration', title: 'CI/CD Integration' },
      { slug: 'docker-enterprise-deployment-patterns', title: 'Enterprise Deployment Patterns' },
    ],
  },
];

const k8sCategories: NavCategory[] = [
  {
    id: 'k8s-fundamentals',
    title: 'Kubernetes Fundamentals',
    icon: 'K8s',
    items: [
      { slug: 'kubernetes-overview', title: 'Kubernetes Overview' },
      { slug: 'kubernetes-cluster-architecture', title: 'Cluster Architecture' },
      { slug: 'kubernetes-control-plane', title: 'Control Plane' },
      { slug: 'kubernetes-worker-nodes', title: 'Worker Nodes' },
    ],
  },
  {
    id: 'k8s-core-objects',
    title: 'Core Objects',
    icon: 'OBJ',
    items: [
      { slug: 'kubernetes-pods', title: 'Pods' },
      { slug: 'kubernetes-replicasets', title: 'ReplicaSets' },
      { slug: 'kubernetes-deployments', title: 'Deployments' },
      { slug: 'kubernetes-namespaces', title: 'Namespaces' },
    ],
  },
  {
    id: 'k8s-networking',
    title: 'Networking',
    icon: 'NET',
    items: [
      { slug: 'kubernetes-services', title: 'Services' },
      { slug: 'kubernetes-ingress', title: 'Ingress' },
      { slug: 'kubernetes-dns', title: 'DNS' },
      { slug: 'kubernetes-network-policies', title: 'Network Policies' },
    ],
  },
  {
    id: 'k8s-configuration',
    title: 'Configuration',
    icon: 'CFG',
    items: [
      { slug: 'kubernetes-configmaps', title: 'ConfigMaps' },
      { slug: 'kubernetes-secrets', title: 'Secrets' },
    ],
  },
  {
    id: 'k8s-storage',
    title: 'Storage',
    icon: 'PV',
    items: [
      { slug: 'kubernetes-persistent-volumes', title: 'Persistent Volumes' },
      { slug: 'kubernetes-persistent-volume-claims', title: 'Persistent Volume Claims' },
      { slug: 'kubernetes-storage-classes', title: 'Storage Classes' },
    ],
  },
  {
    id: 'k8s-scaling',
    title: 'Scaling',
    icon: 'SCL',
    items: [
      { slug: 'kubernetes-horizontal-pod-autoscaler', title: 'Horizontal Pod Autoscaler' },
      { slug: 'kubernetes-cluster-autoscaler', title: 'Cluster Autoscaler' },
    ],
  },
  {
    id: 'k8s-workloads',
    title: 'Workloads',
    icon: 'WRK',
    items: [
      { slug: 'kubernetes-jobs', title: 'Jobs' },
      { slug: 'kubernetes-cronjobs', title: 'CronJobs' },
      { slug: 'kubernetes-statefulsets', title: 'StatefulSets' },
      { slug: 'kubernetes-daemonsets', title: 'DaemonSets' },
    ],
  },
  {
    id: 'k8s-security',
    title: 'Security',
    icon: 'SEC',
    items: [
      { slug: 'kubernetes-rbac', title: 'RBAC' },
      { slug: 'kubernetes-service-accounts', title: 'Service Accounts' },
      { slug: 'kubernetes-pod-security', title: 'Pod Security' },
    ],
  },
  {
    id: 'k8s-monitoring-logging',
    title: 'Monitoring & Logging',
    icon: 'MON',
    items: [
      { slug: 'kubernetes-metrics-server', title: 'Metrics Server' },
      { slug: 'kubernetes-monitoring-prometheus', title: 'Prometheus' },
      { slug: 'kubernetes-grafana', title: 'Grafana' },
    ],
  },
  {
    id: 'k8s-production',
    title: 'Production',
    icon: 'PRD',
    items: [
      { slug: 'kubernetes-rolling-updates', title: 'Rolling Updates' },
      { slug: 'kubernetes-rollbacks', title: 'Rollbacks' },
      { slug: 'kubernetes-high-availability', title: 'High Availability' },
      { slug: 'kubernetes-disaster-recovery', title: 'Disaster Recovery' },
      { slug: 'kubernetes-best-practices', title: 'Kubernetes Best Practices' },
    ],
  },
];

const azureCategories: NavCategory[] = [
  {
    id: 'azure-fundamentals',
    title: 'Fundamentals',
    icon: 'AZ',
    items: [
      { slug: 'azure-basics', title: 'Azure Basics' },
      { slug: 'azure-architecture', title: 'Azure Architecture' },
      { slug: 'azure-resource-groups', title: 'Resource Groups' },
      { slug: 'azure-subscription-management', title: 'Subscription Management' },
    ],
  },
  {
    id: 'azure-compute',
    title: 'Compute',
    icon: 'VM',
    items: [
      { slug: 'azure-virtual-machines', title: 'Virtual Machines' },
      { slug: 'azure-app-service', title: 'App Service' },
      { slug: 'azure-functions', title: 'Functions' },
      { slug: 'azure-container-apps', title: 'Container Apps' },
    ],
  },
  {
    id: 'azure-storage',
    title: 'Storage',
    icon: 'ST',
    items: [
      { slug: 'azure-blob-storage', title: 'Blob Storage' },
      { slug: 'azure-files', title: 'Files' },
      { slug: 'azure-queues', title: 'Queues' },
      { slug: 'azure-tables', title: 'Tables' },
    ],
  },
  {
    id: 'azure-networking',
    title: 'Networking',
    icon: 'NET',
    items: [
      { slug: 'azure-vnet', title: 'VNet' },
      { slug: 'azure-network-security-groups', title: 'NSG' },
      { slug: 'azure-load-balancer', title: 'Load Balancer' },
      { slug: 'azure-application-gateway', title: 'Application Gateway' },
    ],
  },
  {
    id: 'azure-identity',
    title: 'Identity',
    icon: 'ID',
    items: [
      { slug: 'azure-active-directory', title: 'Azure AD' },
      { slug: 'azure-rbac', title: 'RBAC' },
      { slug: 'azure-managed-identity', title: 'Managed Identity' },
    ],
  },
  {
    id: 'azure-containers',
    title: 'Containers',
    icon: 'AKS',
    items: [
      { slug: 'azure-kubernetes-service', title: 'AKS' },
      { slug: 'azure-container-registry', title: 'ACR' },
    ],
  },
  {
    id: 'azure-devops',
    title: 'DevOps',
    icon: 'CI',
    items: [
      { slug: 'azure-devops', title: 'Azure DevOps' },
      { slug: 'azure-cicd', title: 'CI/CD' },
      { slug: 'azure-infrastructure-as-code', title: 'Infrastructure as Code' },
    ],
  },
  {
    id: 'azure-security',
    title: 'Security',
    icon: 'SEC',
    items: [
      { slug: 'azure-key-vault', title: 'Key Vault' },
      { slug: 'azure-defender-for-cloud', title: 'Defender for Cloud' },
    ],
  },
  {
    id: 'azure-architecture',
    title: 'Architecture',
    icon: 'ARC',
    items: [
      { slug: 'azure-high-availability', title: 'High Availability' },
      { slug: 'azure-disaster-recovery', title: 'Disaster Recovery' },
      { slug: 'azure-cost-optimization', title: 'Cost Optimization' },
      { slug: 'azure-enterprise-architecture', title: 'Enterprise Architecture' },
    ],
  },
  {
    id: 'azure-interview-prep',
    title: 'Interview Prep',
    icon: 'Q&A',
    items: [
      { slug: 'azure-scenario-questions', title: 'Scenario Questions' },
      { slug: 'azure-production-issues', title: 'Production Issues' },
      { slug: 'azure-architecture-questions', title: 'Architecture Questions' },
      { slug: 'azure-troubleshooting', title: 'Troubleshooting' },
    ],
  },
];

const aiCategories: NavCategory[] = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    icon: 'AI',
    items: [
      { slug: 'ai-basics', title: 'AI Basics' },
      { slug: 'ml-vs-dl-vs-llm', title: 'ML vs DL vs LLM' },
      { slug: 'generative-ai', title: 'Generative AI' },
    ],
  },
  {
    id: 'ai-python-foundations',
    title: 'Python Foundations',
    icon: 'PY',
    items: [
      { slug: 'python-for-ai', title: 'Python for AI' },
      { slug: 'data-processing-for-ai', title: 'Data Processing' },
    ],
  },
  {
    id: 'ai-machine-learning',
    title: 'Machine Learning',
    icon: 'ML',
    items: [
      { slug: 'supervised-learning', title: 'Supervised Learning' },
      { slug: 'unsupervised-learning', title: 'Unsupervised Learning' },
    ],
  },
  {
    id: 'ai-deep-learning',
    title: 'Deep Learning',
    icon: 'DL',
    items: [
      { slug: 'neural-networks', title: 'Neural Networks' },
      { slug: 'transformers', title: 'Transformers' },
    ],
  },
  {
    id: 'ai-llm-foundations',
    title: 'LLM Foundations',
    icon: 'LLM',
    items: [
      { slug: 'gpt-models', title: 'GPT Models' },
      { slug: 'tokens', title: 'Tokens' },
      { slug: 'embeddings', title: 'Embeddings' },
      { slug: 'context-windows', title: 'Context Windows' },
    ],
  },
  {
    id: 'ai-prompt-engineering',
    title: 'Prompt Engineering',
    icon: 'PM',
    items: [
      { slug: 'zero-shot-prompting', title: 'Zero Shot' },
      { slug: 'few-shot-prompting', title: 'Few Shot' },
      { slug: 'chain-of-thought-prompting', title: 'Chain of Thought' },
    ],
  },
  {
    id: 'ai-rag',
    title: 'RAG',
    icon: 'RAG',
    items: [
      { slug: 'retrieval-augmented-generation', title: 'Retrieval Augmented Generation' },
      { slug: 'vector-databases-overview', title: 'Vector Databases' },
      { slug: 'chunking-strategies', title: 'Chunking' },
      { slug: 'embedding-pipelines', title: 'Embeddings Pipeline' },
    ],
  },
  {
    id: 'ai-vector-databases',
    title: 'Vector Databases',
    icon: 'VDB',
    items: [
      { slug: 'pinecone', title: 'Pinecone' },
      { slug: 'chroma', title: 'Chroma' },
      { slug: 'faiss', title: 'FAISS' },
    ],
  },
  {
    id: 'ai-applications',
    title: 'AI Applications',
    icon: 'APP',
    items: [
      { slug: 'ai-chatbots', title: 'Chatbots' },
      { slug: 'ai-agents', title: 'Agents' },
      { slug: 'knowledge-systems', title: 'Knowledge Systems' },
    ],
  },
  {
    id: 'ai-architecture',
    title: 'AI Architecture',
    icon: 'ARC',
    items: [
      { slug: 'ai-system-design', title: 'AI System Design' },
      { slug: 'multi-agent-systems', title: 'Multi-Agent Systems' },
      { slug: 'enterprise-ai', title: 'Enterprise AI' },
    ],
  },
  {
    id: 'ai-production',
    title: 'Production AI',
    icon: 'OPS',
    items: [
      { slug: 'ai-evaluation', title: 'Evaluation' },
      { slug: 'ai-monitoring', title: 'Monitoring' },
      { slug: 'hallucination-management', title: 'Hallucinations' },
      { slug: 'ai-cost-optimization', title: 'Cost Optimization' },
      { slug: 'ai-security', title: 'Security' },
    ],
  },
  {
    id: 'ai-interview-prep',
    title: 'Interview Prep',
    icon: 'Q&A',
    items: [
      { slug: 'llm-scenarios', title: 'LLM Scenarios' },
      { slug: 'ai-architecture-interviews', title: 'AI Architecture' },
      { slug: 'ai-production-issues', title: 'Production Issues' },
      { slug: 'ai-design-questions', title: 'Design Questions' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Master technology registry
// ─────────────────────────────────────────────────────────────────────────────
export const technologies: TechSection[] = [
  {
    id: 'aem',
    label: 'AEM',
    icon: '🏗️',
    color: '#e8520a',
    description: 'Adobe Experience Manager — components, Sling Models, HTL, Dispatcher, Cloud Service, and more.',
    topicCount: 34,
    active: true,
    categories: aemCategories,
  },
  {
    id: 'contentful',
    label: 'Contentful',
    icon: '🧱',
    color: '#2478cc',
    description: 'Learn Contentful the way senior developers explain it — content modeling, delivery APIs, rich text, assets, environments, webhooks, localization, integrations, and production-ready CMS patterns.',
    topicCount: 40,
    active: true,
    categories: contentfulCategories,
  },
  {
    id: 'sitecore',
    label: 'Sitecore',
    icon: '🧩',
    color: '#ea580c',
    description: 'Learn Sitecore the way senior developers explain it - enterprise CMS, DXP concepts, XM Cloud, content architecture, templates, items, renderings, headless development, publishing, workflows, personalization, integrations, and production-ready Sitecore patterns.',
    topicCount: 55,
    active: true,
    categories: sitecoreCategories,
  },
  {
    id: 'react',
    label: 'React',
    icon: '⚛️',
    color: '#61dafb',
    description: 'Modern React from hooks to advanced patterns — useState, useEffect, Context, performance, forms, and architecture.',
    topicCount: 40,
    active: true,
    categories: reactCategories,
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    icon: '▲',
    color: '#ffffff',
    description: 'Full-stack React with the App Router — Server Components, SSR, SSG, ISR, Route Handlers, middleware, and enterprise architecture.',
    topicCount: 31,
    active: true,
    categories: nextjsCategories,
  },
  {
    id: 'java',
    label: 'Core Java',
    icon: '☕',
    color: '#f89820',
    description: 'Java fundamentals, OOP, Collections, Streams, Concurrency, and JVM internals — taught like a senior backend engineer.',
    topicCount: 35,
    active: true,
    categories: javaCategories,
  },
  {
    id: 'springboot',
    label: 'Spring Boot',
    icon: '🌱',
    color: '#6db33f',
    description: 'Spring Boot from dependency injection to REST APIs, JPA, Security, microservices, and production — taught like a senior backend architect.',
    topicCount: 38,
    active: true,
    categories: springCategories,
  },
  {
    id: 'aws',
    label: 'AWS',
    icon: '☁️',
    color: '#ff9900',
    description: 'Amazon Web Services — EC2, S3, Lambda, RDS, IAM, VPC, and cloud architecture patterns.',
    topicCount: 34,
    active: true,
    categories: awsCategories,
  },
  {
    id: 'docker',
    label: 'Docker',
    icon: '🐳',
    color: '#2496ed',
    description: 'Containerisation from Dockerfiles to multi-container apps with Docker Compose.',
    topicCount: 14,
    active: true,
    categories: dockerCategories,
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes',
    icon: '☸️',
    color: '#326ce5',
    description: 'Container orchestration at scale — Pods, Services, Deployments, Ingress, and Helm.',
    topicCount: 34,
    active: true,
    categories: k8sCategories,
  },
  {
    id: 'azure',
    label: 'Azure',
    icon: '🔷',
    color: '#0078d4',
    description: 'Microsoft Azure — compute, storage, networking, identity, containers, DevOps, security, and architecture patterns.',
    topicCount: 34,
    active: true,
    categories: azureCategories,
  },
  {
    id: 'ai-llm',
    label: 'AI / LLM Engineering',
    icon: '🧠',
    color: '#a855f7',
    description: 'Applied AI, prompt engineering, RAG, vector databases, agents, evaluation, and production LLM system design.',
    topicCount: 38,
    active: true,
    categories: aiCategories,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper utilities
// ─────────────────────────────────────────────────────────────────────────────

/** Flat list of NavCategories for the currently active technology (AEM) */
export const navigation: NavCategory[] = technologies
  .filter((t) => t.active)
  .flatMap((t) => t.categories);

/** All categories across all technologies */
export const allCategories: NavCategory[] = technologies.flatMap((t) => t.categories);

export function getTechById(id: string): TechSection | undefined {
  const aliases: Record<string, string> = {
    ai: 'ai-llm',
    'core-java': 'java',
    'spring-boot': 'springboot',
  };
  const resolvedId = aliases[id] ?? id;
  return technologies.find((t) => t.id === resolvedId);
}

/** Find which technology owns a given topic slug */
export function getTechForSlug(slug: string): TechSection | undefined {
  return technologies.find((t) =>
    t.categories.some((cat) => cat.items.some((i) => i.slug === slug))
  );
}

/** Find which category owns a given topic slug */
export function getCategoryForSlug(slug: string): NavCategory | undefined {
  return allCategories.find((cat) => cat.items.some((i) => i.slug === slug));
}

export function getTopicTitle(slug: string): string {
  for (const cat of allCategories) {
    const item = cat.items.find((i) => i.slug === slug);
    if (item) return item.title;
  }
  return slug;
}

/** Sibling topics in the same category (for Related Topics) */
export function getRelatedSlugs(slug: string): NavItem[] {
  const cat = getCategoryForSlug(slug);
  if (!cat) return [];
  return cat.items.filter((i) => i.slug !== slug && !i.badge).slice(0, 5);
}

export function getAllSlugs(): string[] {
  return allCategories.flatMap((cat) => cat.items.map((item) => item.slug));
}

/** Total topic count for a technology */
export function getTechTopicCount(techId: string): number {
  const tech = getTechById(techId);
  if (!tech) return 0;
  return tech.categories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => !i.badge).length,
    0
  );
}


