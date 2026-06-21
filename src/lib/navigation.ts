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
      { slug: 'nextjs-pages-router',      title: 'Pages Router' },
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
      { slug: 'nextjs-csr',               title: 'CSR' },
      { slug: 'nextjs-rendering-strategy', title: 'Rendering Strategy' },
      { slug: 'nextjs-hydration',         title: 'Hydration' },
    ],
  },
  {
    id: 'nextjs-data-fetching',
    title: 'Data Fetching',
    icon: '📡',
    items: [
      { slug: 'nextjs-get-server-side-props', title: 'getServerSideProps' },
      { slug: 'nextjs-get-static-props',      title: 'getStaticProps' },
      { slug: 'nextjs-get-static-paths',      title: 'getStaticPaths' },
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
      { slug: 'nextjs-layouts',        title: 'Layouts' },
      { slug: 'nextjs-templates',      title: 'Templates' },
      { slug: 'nextjs-loading-ui',     title: 'Loading UI' },
      { slug: 'nextjs-error-handling', title: 'Error Handling' },
      { slug: 'nextjs-parallel-routes', title: 'Parallel Routes' },
      { slug: 'nextjs-intercepting-routes', title: 'Intercepting Routes' },
    ],
  },
  {
    id: 'nextjs-api-layer',
    title: 'API Layer',
    icon: '⚙️',
    items: [
      { slug: 'nextjs-api-routes',      title: 'API Routes' },
      { slug: 'nextjs-route-handlers', title: 'Route Handlers' },
      { slug: 'nextjs-rest-apis',      title: 'REST APIs' },
      { slug: 'nextjs-middleware',     title: 'Middleware' },
      { slug: 'nextjs-authentication', title: 'Authentication' },
    ],
  },
  {
    id: 'nextjs-authentication',
    title: 'Authentication',
    icon: 'AUTH',
    items: [
      { slug: 'nextjs-nextauth',           title: 'NextAuth' },
      { slug: 'nextjs-jwt',                title: 'JWT' },
      { slug: 'nextjs-session-management', title: 'Session Management' },
      { slug: 'nextjs-protected-routes',   title: 'Protected Routes' },
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
      { slug: 'nextjs-code-splitting',     title: 'Code Splitting' },
      { slug: 'nextjs-bundle-optimization', title: 'Bundle Optimization' },
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
  {
    id: 'nextjs-production-support',
    title: 'Production Support',
    icon: 'OPS',
    items: [
      { slug: 'nextjs-debugging',               title: 'Debugging' },
      { slug: 'nextjs-monitoring',              title: 'Monitoring' },
      { slug: 'nextjs-incident-handling',       title: 'Incident Handling' },
      { slug: 'nextjs-performance-bottlenecks', title: 'Performance Bottlenecks' },
    ],
  },
  {
    id: 'nextjs-architecture',
    title: 'Architecture',
    icon: 'ARC',
    items: [
      { slug: 'nextjs-enterprise-architecture',    title: 'Enterprise Architecture' },
      { slug: 'nextjs-scalability',                title: 'Scalability' },
      { slug: 'nextjs-folder-structure',           title: 'Folder Structure' },
      { slug: 'nextjs-multi-tenant-applications',  title: 'Multi-Tenant Applications' },
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
      { slug: 'java-control-statements', title: 'Control Statements' },
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
      { slug: 'java-composition',     title: 'Composition' },
    ],
  },
  {
    id: 'java-language-features',
    title: 'Language Features',
    icon: 'LANG',
    items: [
      { slug: 'java-string',          title: 'String' },
      { slug: 'java-stringbuilder',   title: 'StringBuilder' },
      { slug: 'java-stringbuffer',    title: 'StringBuffer' },
      { slug: 'java-wrapper-classes', title: 'Wrapper Classes' },
      { slug: 'java-autoboxing',      title: 'Autoboxing' },
      { slug: 'java-enums',           title: 'Enums' },
      { slug: 'java-records',         title: 'Records' },
      { slug: 'java-sealed-classes',  title: 'Sealed Classes' },
    ],
  },
  {
    id: 'java-collections',
    title: 'Collections',
    icon: '📦',
    items: [
      { slug: 'java-collection-framework', title: 'Collection Framework' },
      { slug: 'java-collections-list', title: 'List' },
      { slug: 'java-collections-set',  title: 'Set' },
      { slug: 'java-collections-map',  title: 'Map' },
      { slug: 'java-arraylist',        title: 'ArrayList' },
      { slug: 'java-linkedlist',       title: 'LinkedList' },
      { slug: 'java-hashmap',          title: 'HashMap' },
      { slug: 'java-hashset',          title: 'HashSet' },
      { slug: 'java-concurrent-collections', title: 'Concurrent Collections' },
    ],
  },
  {
    id: 'java-exceptions',
    title: 'Exception Handling',
    icon: '🚨',
    items: [
      { slug: 'java-checked-exceptions', title: 'Checked Exceptions' },
      { slug: 'java-unchecked-exceptions', title: 'Unchecked Exceptions' },
      { slug: 'java-exception-trycatch', title: 'Try Catch' },
      { slug: 'java-exception-throws',   title: 'Throws' },
      { slug: 'java-exception-custom',   title: 'Custom Exceptions' },
      { slug: 'java-try-with-resources', title: 'Try-With-Resources' },
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
      { slug: 'java-method-references',     title: 'Method References' },
    ],
  },
  {
    id: 'java-multithreading',
    title: 'Multithreading',
    icon: '🔄',
    items: [
      { slug: 'java-threads',            title: 'Threads' },
      { slug: 'java-runnable',           title: 'Runnable' },
      { slug: 'java-callable',           title: 'Callable' },
      { slug: 'java-executor-framework', title: 'Executor Framework' },
      { slug: 'java-synchronization',    title: 'Synchronization' },
      { slug: 'java-locks',              title: 'Locks' },
      { slug: 'java-deadlocks',          title: 'Deadlocks' },
      { slug: 'java-thread-safety',      title: 'Thread Safety' },
      { slug: 'java-completable-future', title: 'CompletableFuture' },
      { slug: 'java-virtual-threads',    title: 'Virtual Threads' },
    ],
  },
  {
    id: 'java-memory',
    title: 'Memory Management',
    icon: '🧠',
    items: [
      { slug: 'java-jvm-memory-model',   title: 'JVM Memory Model' },
      { slug: 'java-heap',               title: 'Heap' },
      { slug: 'java-stack',              title: 'Stack' },
      { slug: 'java-heap-stack',         title: 'Heap & Stack' },
      { slug: 'java-metaspace',          title: 'Metaspace' },
      { slug: 'java-garbage-collection', title: 'Garbage Collection' },
      { slug: 'java-memory-leaks',       title: 'Memory Leaks' },
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
  {
    id: 'java-jvm-internals',
    title: 'JVM Internals',
    icon: 'JVM',
    items: [
      { slug: 'java-class-loading', title: 'Class Loading' },
      { slug: 'java-class-loaders', title: 'Class Loaders' },
      { slug: 'java-bytecode',      title: 'Bytecode' },
      { slug: 'java-jit-compiler',  title: 'JIT Compiler' },
    ],
  },
  {
    id: 'java-performance',
    title: 'Performance',
    icon: 'PERF',
    items: [
      { slug: 'java-profiling',               title: 'Profiling' },
      { slug: 'java-optimization',            title: 'Optimization' },
      { slug: 'java-gc-tuning',               title: 'GC Tuning' },
      { slug: 'java-high-throughput-systems', title: 'High Throughput Systems' },
    ],
  },
  {
    id: 'java-design-patterns',
    title: 'Design Patterns',
    icon: 'PAT',
    items: [
      { slug: 'java-singleton',            title: 'Singleton' },
      { slug: 'java-factory',              title: 'Factory' },
      { slug: 'java-builder',              title: 'Builder' },
      { slug: 'java-strategy',             title: 'Strategy' },
      { slug: 'java-observer',             title: 'Observer' },
      { slug: 'java-dependency-injection', title: 'Dependency Injection' },
    ],
  },
  {
    id: 'java-production-support',
    title: 'Production Support',
    icon: 'OPS',
    items: [
      { slug: 'java-memory-issues',               title: 'Memory Issues' },
      { slug: 'java-high-cpu-usage',              title: 'High CPU Usage' },
      { slug: 'java-thread-dumps',                title: 'Thread Dumps' },
      { slug: 'java-heap-dumps',                  title: 'Heap Dumps' },
      { slug: 'java-out-of-memory-error',         title: 'OutOfMemoryError' },
      { slug: 'java-performance-troubleshooting', title: 'Performance Troubleshooting' },
    ],
  },
  {
    id: 'java-architecture',
    title: 'Architecture',
    icon: 'ARCH',
    items: [
      { slug: 'java-enterprise-architecture', title: 'Enterprise Java Design' },
      { slug: 'java-scalability',             title: 'Scalability' },
      { slug: 'java-concurrency-design',      title: 'Concurrency Design' },
      { slug: 'java-high-availability',       title: 'High Availability' },
    ],
  },
];

const springCategories: NavCategory[] = [
  {
    id: 'spring-core',
    title: 'Core',
    icon: '🌱',
    items: [
      { slug: 'spring-framework-basics',  title: 'Spring Framework Basics' },
      { slug: 'spring-introduction',      title: 'Spring Boot Introduction' },
      { slug: 'spring-boot-architecture', title: 'Spring Boot Architecture' },
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
      { slug: 'spring-component-scanning', title: 'Component Scanning' },
    ],
  },
  {
    id: 'spring-stereotypes',
    title: 'Spring Core',
    icon: 'CORE',
    items: [
      { slug: 'spring-component',             title: '@Component' },
      { slug: 'spring-service',               title: '@Service' },
      { slug: 'spring-repository-annotation', title: '@Repository' },
      { slug: 'spring-controllers',           title: '@Controller' },
      { slug: 'spring-configuration',         title: '@Configuration' },
      { slug: 'spring-bean-annotation',       title: '@Bean' },
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
      { slug: 'spring-request-lifecycle',  title: 'Request Lifecycle' },
      { slug: 'spring-validation',         title: 'Validation' },
      { slug: 'spring-exception-handling', title: 'Exception Handling' },
    ],
  },
  {
    id: 'spring-data',
    title: 'Data Layer',
    icon: '🗄️',
    items: [
      { slug: 'spring-data-jpa',       title: 'Spring Data JPA' },
      { slug: 'spring-hibernate',      title: 'Hibernate' },
      { slug: 'spring-entity-mapping', title: 'Entity Mapping' },
      { slug: 'spring-repositories',   title: 'Repositories' },
      { slug: 'spring-jpql',           title: 'JPQL' },
      { slug: 'spring-native-queries', title: 'Native Queries' },
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
      { slug: 'spring-oauth2',         title: 'OAuth2' },
      { slug: 'spring-role-based-access', title: 'Role Based Access' },
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
      { slug: 'spring-testcontainers',      title: 'Testcontainers' },
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
      { slug: 'spring-circuit-breaker',       title: 'Circuit Breaker' },
      { slug: 'spring-feign-client',          title: 'Feign Client' },
      { slug: 'spring-distributed-systems',   title: 'Distributed Systems' },
    ],
  },
  {
    id: 'spring-caching',
    title: 'Caching',
    icon: 'CACHE',
    items: [
      { slug: 'spring-cache',            title: 'Spring Cache' },
      { slug: 'spring-redis',            title: 'Redis' },
      { slug: 'spring-cache-strategies', title: 'Cache Strategies' },
    ],
  },
  {
    id: 'spring-messaging',
    title: 'Messaging',
    icon: 'MSG',
    items: [
      { slug: 'spring-kafka',                     title: 'Kafka' },
      { slug: 'spring-rabbitmq',                  title: 'RabbitMQ' },
      { slug: 'spring-event-driven-architecture', title: 'Event Driven Architecture' },
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
  {
    id: 'spring-performance',
    title: 'Performance',
    icon: 'PERF',
    items: [
      { slug: 'spring-performance-optimization', title: 'Performance Optimization' },
      { slug: 'spring-connection-pooling',       title: 'Connection Pooling' },
      { slug: 'spring-lazy-loading',             title: 'Lazy Loading' },
      { slug: 'spring-n-plus-one-problems',      title: 'N+1 Problems' },
      { slug: 'spring-jvm-performance',          title: 'JVM Performance' },
    ],
  },
  {
    id: 'spring-observability',
    title: 'Observability',
    icon: 'OBS',
    items: [
      { slug: 'spring-actuator',            title: 'Spring Actuator' },
      { slug: 'spring-logging',             title: 'Logging' },
      { slug: 'spring-metrics',             title: 'Metrics' },
      { slug: 'spring-monitoring',          title: 'Monitoring' },
      { slug: 'spring-distributed-tracing', title: 'Distributed Tracing' },
    ],
  },
  {
    id: 'spring-deployment',
    title: 'Deployment',
    icon: 'DEPLOY',
    items: [
      { slug: 'spring-docker',                    title: 'Docker' },
      { slug: 'spring-kubernetes',                title: 'Kubernetes' },
      { slug: 'spring-ci-cd',                     title: 'CI/CD' },
      { slug: 'spring-environment-configuration', title: 'Environment Configuration' },
    ],
  },
  {
    id: 'spring-production-support',
    title: 'Production Support',
    icon: 'OPS',
    items: [
      { slug: 'spring-memory-issues',         title: 'Memory Issues' },
      { slug: 'spring-high-cpu',              title: 'High CPU' },
      { slug: 'spring-slow-apis',             title: 'Slow APIs' },
      { slug: 'spring-database-bottlenecks',  title: 'Database Bottlenecks' },
      { slug: 'spring-production-incidents',  title: 'Production Incidents' },
    ],
  },
  {
    id: 'spring-architecture',
    title: 'Architecture',
    icon: 'ARCH',
    items: [
      { slug: 'spring-enterprise-architecture', title: 'Enterprise Spring Boot' },
      { slug: 'spring-scalability',             title: 'Scalability' },
      { slug: 'spring-security-design',         title: 'Security Design' },
      { slug: 'spring-high-availability',       title: 'High Availability' },
      { slug: 'spring-resiliency-patterns',     title: 'Resiliency Patterns' },
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
      { slug: 'aws-regions', title: 'Regions' },
      { slug: 'aws-availability-zones', title: 'Availability Zones' },
      { slug: 'aws-edge-locations', title: 'Edge Locations' },
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
      { slug: 'aws-elastic-beanstalk', title: 'Elastic Beanstalk' },
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
      { slug: 'aws-storage-classes', title: 'Storage Classes' },
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
      { slug: 'aws-kms', title: 'KMS' },
      { slug: 'aws-secrets-manager', title: 'Secrets Manager' },
      { slug: 'aws-cognito', title: 'Cognito' },
      { slug: 'aws-security-best-practices', title: 'Security Best Practices' },
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
      { slug: 'aws-route-53', title: 'Route 53' },
      { slug: 'aws-nacls', title: 'NACLs' },
      { slug: 'aws-transit-gateway', title: 'Transit Gateway' },
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
      { slug: 'aws-step-functions', title: 'Step Functions' },
      { slug: 'aws-sqs', title: 'SQS' },
      { slug: 'aws-sns', title: 'SNS' },
    ],
  },
  {
    id: 'aws-database',
    title: 'Database',
    icon: 'DB',
    items: [
      { slug: 'aws-rds', title: 'RDS' },
      { slug: 'aws-aurora', title: 'Aurora' },
      { slug: 'aws-dynamodb', title: 'DynamoDB' },
      { slug: 'aws-elasticache', title: 'ElastiCache' },
    ],
  },
  {
    id: 'aws-containers',
    title: 'Containers',
    icon: 'WRK',
    items: [
      { slug: 'aws-ecs', title: 'ECS' },
      { slug: 'aws-eks', title: 'EKS' },
      { slug: 'aws-fargate', title: 'Fargate' },
      { slug: 'aws-docker-on-aws', title: 'Docker on AWS' },
    ],
  },
  {
    id: 'aws-monitoring',
    title: 'Monitoring',
    icon: 'MON',
    items: [
      { slug: 'aws-cloudwatch', title: 'CloudWatch' },
      { slug: 'aws-cloudtrail', title: 'CloudTrail' },
      { slug: 'aws-x-ray', title: 'X-Ray' },
      { slug: 'aws-config', title: 'Config' },
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
      { slug: 'aws-cdk', title: 'CDK' },
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
      { slug: 'aws-multi-region-design', title: 'Multi-Region Design' },
      { slug: 'aws-cost-optimization', title: 'Cost Optimization' },
    ],
  },
  {
    id: 'aws-production-support',
    title: 'Production Support',
    icon: 'OPS',
    items: [
      { slug: 'aws-incident-response', title: 'Incident Response' },
      { slug: 'aws-performance-troubleshooting', title: 'Performance Troubleshooting' },
      { slug: 'aws-security-incidents', title: 'Security Incidents' },
      { slug: 'aws-cost-issues', title: 'AWS Cost Issues' },
      { slug: 'aws-operational-excellence', title: 'Operational Excellence' },
    ],
  },
];

const dockerCategories: NavCategory[] = [
  {
    id: 'docker-fundamentals',
    title: 'Fundamentals',
    icon: 'CORE',
    items: [
      { slug: 'docker-overview', title: 'Docker Overview' },
      { slug: 'docker-containers-vs-virtual-machines', title: 'Containers vs Virtual Machines' },
      { slug: 'docker-architecture', title: 'Docker Architecture' },
      { slug: 'docker-containerization', title: 'Containerization' },
      { slug: 'docker-engine', title: 'Docker Engine' },
    ],
  },
  {
    id: 'docker-images-builds',
    title: 'Images & Builds',
    icon: 'DEPLOY',
    items: [
      { slug: 'docker-images', title: 'Docker Images' },
      { slug: 'docker-hub', title: 'Docker Hub' },
      { slug: 'docker-layers', title: 'Layers' },
      { slug: 'docker-image-optimization', title: 'Image Optimization' },
      { slug: 'docker-dockerfile', title: 'Dockerfile' },
      { slug: 'docker-multi-stage-builds', title: 'Multi-Stage Builds' },
      { slug: 'docker-image-security', title: 'Image Security' },
    ],
  },
  {
    id: 'docker-dockerfile',
    title: 'Dockerfile',
    icon: 'LANG',
    items: [
      { slug: 'docker-entrypoint', title: 'ENTRYPOINT' },
      { slug: 'docker-cmd', title: 'CMD' },
      { slug: 'docker-env', title: 'ENV' },
      { slug: 'docker-arg', title: 'ARG' },
      { slug: 'docker-copy', title: 'COPY' },
      { slug: 'docker-add', title: 'ADD' },
    ],
  },
  {
    id: 'docker-runtime',
    title: 'Runtime',
    icon: 'WRK',
    items: [
      { slug: 'docker-container-lifecycle', title: 'Container Lifecycle' },
      { slug: 'docker-container-storage', title: 'Container Storage' },
      { slug: 'docker-bind-mounts', title: 'Bind Mounts' },
    ],
  },
  {
    id: 'docker-networking',
    title: 'Networking',
    icon: 'NET',
    items: [
      { slug: 'docker-networking', title: 'Networking' },
      { slug: 'docker-bridge-network', title: 'Bridge Network' },
      { slug: 'docker-host-network', title: 'Host Network' },
      { slug: 'docker-overlay-network', title: 'Overlay Network' },
      { slug: 'docker-dns-resolution', title: 'DNS Resolution' },
    ],
  },
  {
    id: 'docker-storage',
    title: 'Storage',
    icon: 'CACHE',
    items: [
      { slug: 'docker-volumes', title: 'Docker Volumes' },
      { slug: 'docker-persistent-data', title: 'Persistent Data' },
      { slug: 'docker-storage-drivers', title: 'Storage Drivers' },
    ],
  },
  {
    id: 'docker-compose',
    title: 'Compose',
    icon: 'MSG',
    items: [
      { slug: 'docker-compose', title: 'Docker Compose' },
      { slug: 'docker-multi-container-applications', title: 'Multi-Container Applications' },
      { slug: 'docker-service-dependencies', title: 'Service Dependencies' },
    ],
  },
  {
    id: 'docker-security',
    title: 'Security',
    icon: 'SEC',
    items: [
      { slug: 'docker-security', title: 'Security' },
      { slug: 'docker-secrets-management', title: 'Secrets Management' },
      { slug: 'docker-image-scanning', title: 'Image Scanning' },
      { slug: 'docker-least-privilege', title: 'Least Privilege' },
    ],
  },
  {
    id: 'docker-delivery',
    title: 'CI/CD & Registry',
    icon: 'CI',
    items: [
      { slug: 'docker-cicd-integration', title: 'CI/CD Integration' },
      { slug: 'docker-image-versioning', title: 'Image Versioning' },
      { slug: 'docker-registry-management', title: 'Registry Management' },
    ],
  },
  {
    id: 'docker-production-support',
    title: 'Production Support',
    icon: 'OPS',
    items: [
      { slug: 'docker-container-crashes', title: 'Container Crashes' },
      { slug: 'docker-memory-issues', title: 'Memory Issues' },
      { slug: 'docker-cpu-issues', title: 'CPU Issues' },
      { slug: 'docker-debugging-containers', title: 'Debugging Containers' },
      { slug: 'docker-log-analysis', title: 'Log Analysis' },
    ],
  },
  {
    id: 'docker-architecture',
    title: 'Architecture',
    icon: 'ARCH',
    items: [
      { slug: 'docker-container-platform-design', title: 'Container Platform Design' },
      { slug: 'docker-scalability', title: 'Scalability' },
      { slug: 'docker-high-availability', title: 'High Availability' },
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
      { slug: 'kubernetes-statefulsets', title: 'StatefulSets' },
      { slug: 'kubernetes-daemonsets', title: 'DaemonSets' },
      { slug: 'kubernetes-jobs', title: 'Jobs' },
      { slug: 'kubernetes-cronjobs', title: 'CronJobs' },
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
      { slug: 'kubernetes-service-discovery', title: 'Service Discovery' },
    ],
  },
  {
    id: 'k8s-configuration',
    title: 'Configuration',
    icon: 'CFG',
    items: [
      { slug: 'kubernetes-configmaps', title: 'ConfigMaps' },
      { slug: 'kubernetes-secrets', title: 'Secrets' },
      { slug: 'kubernetes-environment-variables', title: 'Environment Variables' },
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
      { slug: 'kubernetes-csi-drivers', title: 'CSI Drivers' },
    ],
  },
  {
    id: 'k8s-scaling',
    title: 'Scaling',
    icon: 'SCL',
    items: [
      { slug: 'kubernetes-horizontal-pod-autoscaler', title: 'Horizontal Pod Autoscaler' },
      { slug: 'kubernetes-cluster-autoscaler', title: 'Cluster Autoscaler' },
      { slug: 'kubernetes-vertical-pod-autoscaler', title: 'Vertical Pod Autoscaler' },
    ],
  },
  {
    id: 'k8s-workloads',
    title: 'Workloads',
    icon: 'WRK',
    items: [
      { slug: 'kubernetes-rolling-updates', title: 'Rolling Updates' },
      { slug: 'kubernetes-rollbacks', title: 'Rollbacks' },
      { slug: 'kubernetes-deployment-strategies', title: 'Deployment Strategies' },
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
      { slug: 'kubernetes-network-security', title: 'Network Security' },
      { slug: 'kubernetes-secrets-management', title: 'Secrets Management' },
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
      { slug: 'kubernetes-logging', title: 'Logging' },
      { slug: 'kubernetes-monitoring', title: 'Monitoring Strategy' },
    ],
  },
  {
    id: 'k8s-helm',
    title: 'Helm',
    icon: 'DEPLOY',
    items: [
      { slug: 'kubernetes-helm-basics', title: 'Helm Basics' },
      { slug: 'kubernetes-charts', title: 'Charts' },
      { slug: 'kubernetes-releases', title: 'Releases' },
    ],
  },
  {
    id: 'k8s-gitops',
    title: 'CI/CD & GitOps',
    icon: 'CI',
    items: [
      { slug: 'kubernetes-gitops', title: 'GitOps' },
      { slug: 'kubernetes-argocd', title: 'Argo CD' },
      { slug: 'kubernetes-flux', title: 'Flux' },
    ],
  },
  {
    id: 'k8s-troubleshooting',
    title: 'Troubleshooting',
    icon: 'PERF',
    items: [
      { slug: 'kubernetes-crashloopbackoff', title: 'CrashLoopBackOff' },
      { slug: 'kubernetes-pending-pods', title: 'Pending Pods' },
      { slug: 'kubernetes-imagepullbackoff', title: 'ImagePullBackOff' },
      { slug: 'kubernetes-node-failures', title: 'Node Failures' },
      { slug: 'kubernetes-networking-issues', title: 'Networking Issues' },
    ],
  },
  {
    id: 'k8s-production',
    title: 'Production',
    icon: 'OPS',
    items: [
      { slug: 'kubernetes-incident-response', title: 'Incident Response' },
      { slug: 'kubernetes-performance-analysis', title: 'Performance Analysis' },
      { slug: 'kubernetes-resource-optimization', title: 'Resource Optimization' },
      { slug: 'kubernetes-capacity-planning', title: 'Capacity Planning' },
      { slug: 'kubernetes-high-availability', title: 'High Availability' },
      { slug: 'kubernetes-disaster-recovery', title: 'Disaster Recovery' },
      { slug: 'kubernetes-best-practices', title: 'Kubernetes Best Practices' },
      { slug: 'kubernetes-multi-cluster-design', title: 'Multi-Cluster Design' },
      { slug: 'kubernetes-platform-engineering', title: 'Platform Engineering' },
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
      { slug: 'azure-regions', title: 'Azure Regions' },
      { slug: 'azure-availability-zones', title: 'Availability Zones' },
    ],
  },
  {
    id: 'azure-governance',
    title: 'Governance',
    icon: 'ARCH',
    items: [
      { slug: 'azure-resource-groups', title: 'Resource Groups' },
      { slug: 'azure-subscription-management', title: 'Subscription Management' },
      { slug: 'azure-management-groups', title: 'Management Groups' },
      { slug: 'azure-policy', title: 'Azure Policy' },
      { slug: 'azure-landing-zones', title: 'Landing Zones' },
    ],
  },
  {
    id: 'azure-compute',
    title: 'Compute',
    icon: 'VM',
    items: [
      { slug: 'azure-virtual-machines', title: 'Virtual Machines' },
      { slug: 'azure-app-service', title: 'App Service' },
      { slug: 'azure-app-service-plans', title: 'App Service Plans' },
      { slug: 'azure-deployment-slots', title: 'Deployment Slots' },
      { slug: 'azure-functions', title: 'Functions' },
      { slug: 'azure-function-triggers-bindings', title: 'Triggers and Bindings' },
      { slug: 'azure-durable-functions', title: 'Durable Functions' },
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
      { slug: 'azure-storage-accounts', title: 'Storage Accounts' },
      { slug: 'azure-storage-replication', title: 'Storage Replication' },
    ],
  },
  {
    id: 'azure-data',
    title: 'Data',
    icon: 'DB',
    items: [
      { slug: 'azure-sql-database', title: 'Azure SQL Database' },
      { slug: 'azure-cosmos-db', title: 'Azure Cosmos DB' },
      { slug: 'azure-cache-for-redis', title: 'Azure Cache for Redis' },
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
      { slug: 'azure-vnet-peering', title: 'VNet Peering' },
      { slug: 'azure-private-endpoints', title: 'Private Endpoints' },
      { slug: 'azure-private-dns', title: 'Private DNS' },
      { slug: 'azure-azure-firewall', title: 'Azure Firewall' },
      { slug: 'azure-front-door', title: 'Azure Front Door' },
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
      { slug: 'azure-bicep', title: 'Bicep' },
    ],
  },
  {
    id: 'azure-messaging',
    title: 'Messaging',
    icon: 'MSG',
    items: [
      { slug: 'azure-service-bus', title: 'Service Bus' },
      { slug: 'azure-event-grid', title: 'Event Grid' },
    ],
  },
  {
    id: 'azure-security',
    title: 'Security',
    icon: 'SEC',
    items: [
      { slug: 'azure-key-vault', title: 'Key Vault' },
      { slug: 'azure-defender-for-cloud', title: 'Defender for Cloud' },
      { slug: 'azure-security-operations', title: 'Security Operations' },
    ],
  },
  {
    id: 'azure-observability',
    title: 'Observability',
    icon: 'OBS',
    items: [
      { slug: 'azure-monitor', title: 'Azure Monitor' },
      { slug: 'azure-log-analytics', title: 'Log Analytics' },
      { slug: 'azure-application-insights', title: 'Application Insights' },
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
      { slug: 'azure-cost-governance', title: 'Cost Governance' },
      { slug: 'azure-enterprise-architecture', title: 'Enterprise Architecture' },
    ],
  },
  {
    id: 'azure-production-support',
    title: 'Production Support',
    icon: 'OPS',
    items: [
      { slug: 'azure-incident-response', title: 'Incident Response' },
      { slug: 'azure-performance-troubleshooting', title: 'Performance Troubleshooting' },
      { slug: 'azure-operational-excellence', title: 'Operational Excellence' },
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
      { slug: 'ai-use-cases', title: 'AI Use Cases' },
      { slug: 'ml-lifecycle', title: 'ML Lifecycle' },
    ],
  },
  {
    id: 'ai-python-foundations',
    title: 'Python Foundations',
    icon: 'PY',
    items: [
      { slug: 'python-for-ai', title: 'Python for AI' },
      { slug: 'data-processing-for-ai', title: 'Data Processing' },
      { slug: 'data-cleaning-for-ai', title: 'Data Cleaning' },
    ],
  },
  {
    id: 'ai-machine-learning',
    title: 'Machine Learning',
    icon: 'ML',
    items: [
      { slug: 'supervised-learning', title: 'Supervised Learning' },
      { slug: 'unsupervised-learning', title: 'Unsupervised Learning' },
      { slug: 'feature-engineering', title: 'Feature Engineering' },
      { slug: 'model-training', title: 'Model Training' },
      { slug: 'model-evaluation', title: 'Model Evaluation' },
    ],
  },
  {
    id: 'ai-deep-learning',
    title: 'Deep Learning',
    icon: 'DL',
    items: [
      { slug: 'neural-networks', title: 'Neural Networks' },
      { slug: 'transformers', title: 'Transformers' },
      { slug: 'attention-mechanisms', title: 'Attention Mechanisms' },
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
      { slug: 'llm-inference', title: 'LLM Inference' },
      { slug: 'tool-calling', title: 'Tool Calling' },
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
      { slug: 'system-prompts', title: 'System Prompts' },
      { slug: 'prompt-templates', title: 'Prompt Templates' },
      { slug: 'structured-output', title: 'Structured Output' },
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
      { slug: 'reranking', title: 'Reranking' },
      { slug: 'retrieval-evaluation', title: 'Retrieval Evaluation' },
      { slug: 'hybrid-search', title: 'Hybrid Search' },
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
      { slug: 'metadata-filtering', title: 'Metadata Filtering' },
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
      { slug: 'ai-copilots', title: 'AI Copilots' },
      { slug: 'workflow-automation', title: 'Workflow Automation' },
    ],
  },
  {
    id: 'ai-agents',
    title: 'Agents',
    icon: 'AGT',
    items: [
      { slug: 'agent-memory', title: 'Agent Memory' },
      { slug: 'agent-planning', title: 'Agent Planning' },
      { slug: 'agent-evaluation', title: 'Agent Evaluation' },
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
      { slug: 'llm-observability', title: 'LLM Observability' },
      { slug: 'ai-guardrails', title: 'Guardrails' },
      { slug: 'ai-deployment-patterns', title: 'Deployment Patterns' },
      { slug: 'ai-caching', title: 'AI Caching' },
      { slug: 'ai-rate-limits', title: 'Rate Limits' },
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
    topicCount: 58,
    active: true,
    categories: nextjsCategories,
  },
  {
    id: 'java',
    label: 'Core Java',
    icon: '☕',
    color: '#f89820',
    description: 'Java fundamentals, OOP, Collections, Streams, Concurrency, and JVM internals — taught like a senior backend engineer.',
    topicCount: 87,
    active: true,
    categories: javaCategories,
  },
  {
    id: 'springboot',
    label: 'Spring Boot',
    icon: '🌱',
    color: '#6db33f',
    description: 'Spring Boot from dependency injection to REST APIs, JPA, Security, microservices, and production — taught like a senior backend architect.',
    topicCount: 83,
    active: true,
    categories: springCategories,
  },
  {
    id: 'aws',
    label: 'AWS',
    icon: '☁️',
    color: '#ff9900',
    description: 'Learn AWS the way senior cloud engineers explain it - regions, networking, IAM, storage, serverless, containers, observability, production support, and architecture trade-offs.',
    topicCount: 64,
    active: true,
    categories: awsCategories,
  },
  {
    id: 'docker',
    label: 'Docker',
    icon: '🐳',
    color: '#2496ed',
    description: 'Learn Docker the way senior platform engineers explain it - images, Dockerfiles, networking, storage, security, CI/CD, production troubleshooting, and container platform design.',
    topicCount: 48,
    active: true,
    categories: dockerCategories,
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes',
    icon: '☸️',
    color: '#326ce5',
    description: 'Learn Kubernetes the way senior platform engineers explain it - workloads, networking, storage, security, GitOps, troubleshooting, production support, and platform engineering.',
    topicCount: 60,
    active: true,
    categories: k8sCategories,
  },
  {
    id: 'azure',
    label: 'Azure',
    icon: '🔷',
    color: '#0078d4',
    description: 'Learn Azure the way senior cloud engineers explain it - governance, identity, networking, compute, observability, messaging, production support, and enterprise architecture patterns.',
    topicCount: 64,
    active: true,
    categories: azureCategories,
  },
  {
    id: 'ai-llm',
    label: 'AI / LLM Engineering',
    icon: '🧠',
    color: '#a855f7',
    description: 'Learn AI / ML engineering the way senior applied AI teams explain it - machine learning, prompting, RAG, vector search, agents, evaluation, guardrails, observability, and production system design.',
    topicCount: 64,
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


