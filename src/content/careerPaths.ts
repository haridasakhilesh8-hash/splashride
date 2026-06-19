export interface CareerPathLink {
  label: string;
  to: string;
}

export interface CareerPathTechnology {
  label: string;
  to: string;
  description: string;
  availableNow?: boolean;
}

export interface CareerPathResourceItem {
  label: string;
  description: string;
  to?: string;
}

export interface CareerPathResourceGroup {
  title: string;
  items: CareerPathResourceItem[];
}

export interface CareerPathRoleBand {
  title: string;
  salaryRange: string;
  expectation: string;
}

export interface CareerPathInterviewPrep {
  primaryTrackLabel: string;
  primaryTrackTo: string;
  topicsCovered: string[];
  questionCount: number;
  scenarioCount: number;
  architectureQuestionCount: number;
  systemDesignQuestionCount: number;
  linkedTracks: CareerPathLink[];
  note?: string;
}

export interface CareerPathProfile {
  whatYouWillLearn: string[];
  skillsYouWillGain: string[];
  whoThisPathIsFor: string[];
  expectedOutcomes: string[];
}

export interface CareerPathInsights {
  demand: string;
  careerGrowth: string;
  skillsNeeded: string[];
  experienceExpectations: string[];
  typicalRoles: CareerPathRoleBand[];
}

export interface CareerPathPhaseTopic {
  title: string;
  description: string;
  links?: CareerPathLink[];
}

export interface CareerPathPhase {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  color: string;
  topics: CareerPathPhaseTopic[];
}

export interface CareerRoadmap {
  slug: string;
  title: string;
  shortTitle: string;
  role: string;
  icon: string;
  description: string;
  summary: string;
  technologies: CareerPathTechnology[];
  hours: string;
  duration: string;
  difficulty: string;
  demand: string;
  salaryRange: string;
  topicCount: number;
  interviewQuestionCount: number;
  productionScenarioCount: number;
  seoTitle: string;
  seoDescription: string;
  profile: CareerPathProfile;
  interviewPrep: CareerPathInterviewPrep;
  careerInsights: CareerPathInsights;
  resources: CareerPathResourceGroup[];
  phases: CareerPathPhase[];
}

const frontendPhases: CareerPathPhase[] = [
  {
    id: 'frontend-foundation',
    title: 'Foundation',
    subtitle: 'Build browser confidence before the framework layer.',
    duration: '2-3 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'HTML and semantics', description: 'Structure pages correctly, build accessible forms, and create markup that search engines can understand.' },
      { title: 'CSS systems', description: 'Learn layout, responsive behavior, spacing, and component styling patterns that scale.' },
      { title: 'JavaScript fundamentals', description: 'Understand events, DOM updates, async behavior, modules, and debugging.' },
      { title: 'TypeScript basics', description: 'Use types to make UI code safer, clearer, and easier to refactor.' },
    ],
  },
  {
    id: 'frontend-react',
    title: 'React Fundamentals',
    subtitle: 'Move from isolated components to real interface architecture.',
    duration: '4-5 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Components and composition', description: 'Break interfaces into reusable units and reason about ownership boundaries.', links: [{ label: 'React Learning Path', to: '/technologies/react' }] },
      { title: 'State and hooks', description: 'Manage local state, reducer-driven flows, side effects, forms, and reusable logic without creating fragile code.' },
      { title: 'Routing and data flow', description: 'Understand route design, nested layouts, URL state, and API-driven UI workflows.' },
      { title: 'Testing and maintainability', description: 'Write Jest and React Testing Library tests that protect business behavior instead of implementation detail.' },
    ],
  },
  {
    id: 'frontend-nextjs',
    title: 'Production Frontend',
    subtitle: 'Add rendering strategy, performance, and deployment thinking.',
    duration: '4-5 Weeks',
    color: '#0891b2',
    topics: [
      { title: 'Next.js App Router', description: 'Learn layouts, loading boundaries, templates, parallel routes, and server components.', links: [{ label: 'Next.js Learning Path', to: '/technologies/nextjs' }] },
      { title: 'Rendering choices', description: 'Decide between SSR, SSG, ISR, CSR, streaming, and route-level rendering strategy based on real constraints.' },
      { title: 'Performance engineering', description: 'Tune bundle size, caching, revalidation, lazy loading, Suspense, concurrent rendering, and Core Web Vitals behavior.' },
      { title: 'Deployment, auth, and monitoring', description: 'Handle route protection, environment setup, production failures, observability, and post-release verification.' },
    ],
  },
  {
    id: 'frontend-interview',
    title: 'Architecture and Interview Prep',
    subtitle: 'Translate implementation skill into senior-level communication.',
    duration: '3-4 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Frontend architecture', description: 'Reason about state ownership, component architecture, folder structure, design systems, and long-term maintainability.' },
      { title: 'Production scenarios', description: 'Debug hydration issues, re-render loops, slow experiences, and release regressions.' },
      { title: 'State and scaling strategy', description: 'Choose between local state, reducers, React Query, Redux-style patterns, and shared platform boundaries as applications grow.' },
      { title: 'Interview preparation', description: 'Practice React, Next.js, performance, testing, accessibility, and architecture questions.', links: [{ label: 'React Interview Prep', to: '/interview-prep/react' }, { label: 'Next.js Interview Prep', to: '/interview-prep/nextjs' }] },
    ],
  },
];

const backendPhases: CareerPathPhase[] = [
  {
    id: 'backend-java',
    title: 'Core Java Foundation',
    subtitle: 'Build the language depth strong backend engineers rely on.',
    duration: '3-4 Weeks',
    color: '#16a34a',
    topics: [
      { title: 'OOP and core syntax', description: 'Master classes, objects, abstraction, exceptions, and clean Java code.', links: [{ label: 'Core Java Learning Path', to: '/technologies/java' }] },
      { title: 'Collections and generics', description: 'Understand common data structures, iteration patterns, and API design trade-offs.' },
      { title: 'Concurrency and JVM basics', description: 'Learn how threads, executors, memory, and garbage collection affect production systems.' },
      { title: 'Testing and code quality', description: 'Write maintainable backend code with strong debugging habits.' },
    ],
  },
  {
    id: 'backend-spring',
    title: 'Spring Boot Engineering',
    subtitle: 'Turn language knowledge into enterprise API development skill.',
    duration: '4-5 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Spring core concepts', description: 'Use dependency injection, configuration, and lifecycle management effectively.' },
      { title: 'REST APIs and validation', description: 'Design controllers, DTOs, error handling, and versioned contracts.' },
      { title: 'Persistence and transactions', description: 'Model data, use JPA responsibly, and protect consistency under load.' },
      { title: 'Security and observability', description: 'Apply authentication, authorization, metrics, logs, and health checks.', links: [{ label: 'Spring Boot Learning Path', to: '/technologies/springboot' }] },
    ],
  },
  {
    id: 'backend-production',
    title: 'Production Backend',
    subtitle: 'Prepare for scale, reliability, and real incidents.',
    duration: '4-5 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Microservices and integration', description: 'Model service boundaries, communication patterns, and distributed failure modes.' },
      { title: 'Cloud deployment', description: 'Containerize services, configure environments, and support releases safely.', links: [{ label: 'AWS Learning Path', to: '/technologies/aws' }, { label: 'Docker Learning Path', to: '/technologies/docker' }] },
      { title: 'Monitoring and troubleshooting', description: 'Read logs, metrics, traces, and failure signals like a production engineer.' },
      { title: 'Interview preparation', description: 'Practice API, concurrency, microservices, reliability, and system design questions.', links: [{ label: 'Spring Boot Interview Prep', to: '/interview-prep/springboot' }, { label: 'Core Java Interview Prep', to: '/interview-prep/core-java' }] },
    ],
  },
];

const fullStackJavaPhases: CareerPathPhase[] = [
  frontendPhases[0],
  frontendPhases[1],
  backendPhases[0],
  backendPhases[1],
  {
    id: 'fullstack-delivery',
    title: 'Full Stack Delivery',
    subtitle: 'Connect UI, APIs, data, deployment, and release operations.',
    duration: '4-5 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Frontend and backend integration', description: 'Coordinate DTOs, validation, loading states, auth flows, and error contracts.' },
      { title: 'SQL and data design', description: 'Model schema decisions, indexes, transactions, and reporting needs.' },
      { title: 'Docker and cloud delivery', description: 'Containerize applications, ship environments, and verify releases.' },
      { title: 'Interview preparation', description: 'Prepare for full-stack, Java, React, production support, and design rounds.', links: [{ label: 'Spring Boot Interview Prep', to: '/interview-prep/springboot' }, { label: 'React Interview Prep', to: '/interview-prep/react' }] },
    ],
  },
];

const aemPhases: CareerPathPhase[] = [
  {
    id: 'aem-beginner-foundation',
    title: 'Beginner Foundation',
    subtitle: 'Build the Java, web, and CMS basics that every AEM developer depends on.',
    duration: '2-3 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'HTML, CSS, and authoring-ready frontend basics', description: 'Understand semantic markup, responsive layout, browser behavior, and the frontend foundation behind HTL and client libraries.' },
      { title: 'Java basics for AEM', description: 'Learn services, OOP, collections, exceptions, and clean backend thinking that later powers Sling Models and OSGi services.' },
      { title: 'CMS and content hierarchy thinking', description: 'Understand pages, metadata, reusable content, DAM concepts, and why content structure shapes AEM quality.' },
      { title: 'Environment awareness', description: 'Learn how local, dev, stage, and production environments differ before touching publishing or deployment workflows.' },
    ],
  },
  {
    id: 'aem-junior-delivery',
    title: 'Junior AEM Developer',
    subtitle: 'Understand how content, repository state, and request resolution move through the platform.',
    duration: '4-5 Weeks',
    color: '#f97316',
    topics: [
      { title: 'JCR, Oak, and repository modeling', description: 'Learn nodes, properties, content hierarchy, versioning, and indexing-aware structure design.', links: [{ label: 'AEM Learning Path', to: '/technologies/aem' }] },
      { title: 'Sling and request resolution', description: 'Trace how requests resolve to resources, models, selectors, extensions, and output.' },
      { title: 'HTL and secure rendering', description: 'Build maintainable rendering with context-aware escaping and strong template hygiene.' },
      { title: 'Core Components, dialogs, and client libraries', description: 'Create author-friendly components with clean dialogs, safe frontend delivery, and modern reuse patterns.' },
    ],
  },
  {
    id: 'aem-mid-level-ownership',
    title: 'Mid-Level AEM Developer',
    subtitle: 'Own authoring features, content reuse, headless delivery, and reliable project implementation.',
    duration: '3-4 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Components, dialogs, and editable templates', description: 'Build author-ready component libraries, policies, template structures, and page properties with predictable governance.', links: [{ label: 'AEM Components Topic', to: '/technologies/aem/topic/components' }] },
      { title: 'Content Fragments, Experience Fragments, and localization', description: 'Support structured content, reuse, launches, language copies, and omnichannel content operations.' },
      { title: 'Headless AEM and frontend integration', description: 'Use GraphQL, persisted queries, DAM media, and React or Next.js integration patterns responsibly.' },
      { title: 'Testing and debugging', description: 'Use AEM Mocks, repository-aware testing, and support habits to catch authoring and rendering regressions early.' },
    ],
  },
  {
    id: 'aem-senior-production',
    title: 'Senior AEM Developer',
    subtitle: 'Lead production support, performance, security, and Cloud Service delivery decisions.',
    duration: '4-5 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Dispatcher, CDN, and performance', description: 'Control cache behavior, invalidation, filters, client libraries, image delivery, and query cost.', links: [{ label: 'Dispatcher Topic', to: '/technologies/aem/topic/dispatcher' }] },
      { title: 'Cloud Service, SDK, and Cloud Manager', description: 'Own pipeline quality, environment-specific config, release verification, and cloud-ready project structure.' },
      { title: 'Security and service-user discipline', description: 'Handle permissions, ACLs, secure servlets, HTL safety, and production-safe repository access.' },
      { title: 'Production troubleshooting', description: 'Diagnose publishing issues, blank components, workflow backlogs, GraphQL drift, and deployment problems with evidence-first thinking.' },
    ],
  },
  {
    id: 'aem-lead-roadmap',
    title: 'AEM Lead',
    subtitle: 'Coordinate teams, release quality, content governance, and platform standards across projects.',
    duration: '2-3 Weeks',
    color: '#ef476f',
    topics: [
      { title: 'Platform architecture and delivery governance', description: 'Coordinate author, publish, dispatcher, CDN, DAM, and integration ownership as one delivery system.' },
      { title: 'CI/CD and release leadership', description: 'Set release guardrails, ownership boundaries, and post-deploy validation habits across teams.' },
      { title: 'Projects to build', description: 'Build a custom component library, editable-template implementation, Content Fragment plus GraphQL project, dispatcher caching demo, workflow approval flow, and Cloud Service release simulation.' },
      { title: 'Interview and scenario prep', description: 'Practice senior and lead answers around architecture, troubleshooting, migration, governance, and delivery trade-offs.', links: [{ label: 'AEM Interview Prep', to: '/interview-prep/aem' }] },
    ],
  },
  {
    id: 'aem-architect-roadmap',
    title: 'AEM Architect',
    subtitle: 'Design multi-site, headless, edge-aware, and enterprise-governed AEM platforms with long-term clarity.',
    duration: '2-3 Weeks',
    color: '#16a34a',
    topics: [
      { title: 'Architecture and operating model', description: 'Design for multi-site governance, content ownership, localization, and platform supportability.' },
      { title: 'Headless, edge, and integration strategy', description: 'Choose between traditional AEM, headless delivery, and Edge Delivery Services based on business fit and operational trade-offs.' },
      { title: 'Growth path and mentoring', description: 'Move from feature delivery to technical leadership by standardizing patterns, mentoring teams, and shaping enterprise guardrails.' },
      { title: 'Architect-level interview preparation', description: 'Prepare for migration, governance, Cloud Service, performance, and modernization conversations with production evidence.' },
    ],
  },
];

const contentfulPhases: CareerPathPhase[] = [
  {
    id: 'contentful-beginner-foundation',
    title: 'Beginner Foundation',
    subtitle: 'Understand headless CMS thinking, structured content, and the frontend context before deeper implementation.',
    duration: '2-3 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Headless CMS basics', description: 'Learn how Contentful separates content modeling from frontend presentation and why that changes delivery workflows.' },
      { title: 'Structured content thinking', description: 'Understand entries, assets, references, field types, locales, and how editors work with reusable content.' },
      { title: 'Frontend awareness', description: 'Build enough React and Next.js awareness to understand how Contentful content is actually consumed in applications.', links: [{ label: 'React Learning Path', to: '/technologies/react' }, { label: 'Next.js Learning Path', to: '/technologies/nextjs' }] },
      { title: 'Environment discipline', description: 'Learn why draft, preview, QA, and production content boundaries matter in CMS-driven products.' },
    ],
  },
  {
    id: 'contentful-junior-developer',
    title: 'Junior Contentful Developer',
    subtitle: 'Turn CMS familiarity into safe schema design, editorial workflow awareness, and dependable delivery habits.',
    duration: '3-4 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Content types, fields, and validations', description: 'Model reusable business entities instead of page-specific one-off structures.', links: [{ label: 'Contentful Learning Path', to: '/technologies/contentful' }] },
      { title: 'References and relationships', description: 'Design reusable links between entries and assets without creating frontend confusion.' },
      { title: 'Entries, assets, and publishing states', description: 'Understand draft versus published behavior, missing assets, and safe editorial operations.' },
      { title: 'Rich text and modular content', description: 'Balance editorial flexibility with stable frontend rendering rules.' },
    ],
  },
  {
    id: 'contentful-mid-level-developer',
    title: 'Mid-Level Contentful Developer',
    subtitle: 'Own API integration, preview, frontend contracts, and localization with predictable delivery behavior.',
    duration: '4-5 Weeks',
    color: '#0891b2',
    topics: [
      { title: 'Delivery, Preview, Management, and GraphQL APIs', description: 'Use published versus draft content correctly and understand when REST or GraphQL is the better delivery path.' },
      { title: 'React and Next.js integration', description: 'Fetch content cleanly, map it to components, and keep rendering contracts stable.', links: [{ label: 'Contentful with React Topic', to: '/technologies/contentful/topic/contentful-react' }, { label: 'Contentful with Next.js Topic', to: '/technologies/contentful/topic/contentful-nextjs' }] },
      { title: 'Asset, Rich Text, and fallback handling', description: 'Use asset metadata, embedded content, and frontend fallbacks to keep media and content reliable.' },
      { title: 'Localization and preview workflow', description: 'Build editor trust through realistic previews, safe locale handling, and release-aware delivery flows.' },
    ],
  },
  {
    id: 'contentful-senior-developer',
    title: 'Senior Contentful Developer',
    subtitle: 'Lead production support, caching, webhooks, migration discipline, and cross-team troubleshooting after launch.',
    duration: '4-5 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Webhooks and automation', description: 'Trigger targeted cache refreshes, revalidation flows, build hooks, and downstream updates safely.' },
      { title: 'Caching and content freshness', description: 'Explain why published content can go stale and how to design predictable revalidation.', links: [{ label: 'Caching Strategy Topic', to: '/technologies/contentful/topic/contentful-caching-strategy' }] },
      { title: 'Migration strategy and schema evolution', description: 'Treat content-model changes like production releases with tested migration discipline.' },
      { title: 'Production troubleshooting', description: 'Diagnose wrong locale content, preview drift, broken references, missing assets, and environment mismatch with evidence-first thinking.' },
    ],
  },
  {
    id: 'contentful-lead-roadmap',
    title: 'Contentful Lead',
    subtitle: 'Coordinate platform standards, release workflow, mentoring, and shared content governance across teams.',
    duration: '2-3 Weeks',
    color: '#16a34a',
    topics: [
      { title: 'Projects to build', description: 'Create a blog with preview, Contentful plus React app, Contentful plus Next.js app, Rich Text rendering flow, localization project, webhook-driven revalidation flow, and production troubleshooting case studies.' },
      { title: 'Interview preparation', description: 'Practice Contentful fundamentals, content modeling, API integration, localization, publishing, and architecture conversations.', links: [{ label: 'Contentful Interview Prep', to: '/interview-prep/contentful' }] },
      { title: 'Platform governance and mentoring', description: 'Strengthen schema governance, naming standards, review flow, and cross-team release communication.' },
      { title: 'Composable platform leadership', description: 'Coordinate search, personalization, ecommerce, and frontend consumers without fragmenting the content platform.' },
    ],
  },
  {
    id: 'contentful-headless-cms-architect',
    title: 'Headless CMS Architect',
    subtitle: 'Design reusable content platforms for multi-site, multi-brand, and multi-app delivery with long-term clarity.',
    duration: '2-3 Weeks',
    color: '#0f766e',
    topics: [
      { title: 'Composable architecture', description: 'Define the boundary between Contentful, frontend apps, search, personalization, and ecommerce systems.' },
      { title: 'Multi-site and multi-brand strategy', description: 'Design shared schemas, ownership, and rollout models that scale across channels and teams.' },
      { title: 'Growth path and operating model', description: 'Move from feature delivery to platform stewardship through standards, observability, and long-term maintainability.' },
      { title: 'Architect-level conversations', description: 'Prepare for enterprise use-case, startup use-case, marketing-team use-case, and developer-team use-case trade-off discussions.' },
    ],
  },
];

const sitecorePhases: CareerPathPhase[] = [
  {
    id: 'sitecore-foundation',
    title: 'Foundation',
    subtitle: 'Understand enterprise CMS and Sitecore platform thinking before implementation depth.',
    duration: '2-3 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Sitecore platform basics', description: 'Learn how Sitecore works as an enterprise CMS and where DXP thinking changes the conversation.' },
      { title: 'Headless vs MVC', description: 'Understand when classic Sitecore delivery is still valid and when modern headless patterns are the stronger long-term fit.' },
      { title: 'Content tree, items, and fields', description: 'Understand how Sitecore stores structured content and why item architecture matters in real programs.' },
      { title: 'Templates and standard values', description: 'Build clean schema thinking that supports authoring consistency and rendering stability.' },
      { title: 'Frontend awareness', description: 'Develop enough React and Next.js understanding to reason about headless Sitecore delivery.', links: [{ label: 'React Learning Path', to: '/technologies/react' }, { label: 'Next.js Learning Path', to: '/technologies/nextjs' }] },
    ],
  },
  {
    id: 'sitecore-architecture',
    title: 'Content Architecture',
    subtitle: 'Turn platform familiarity into strong content and component architecture judgment.',
    duration: '3-4 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Template and item design', description: 'Model reusable business structures instead of page-specific one-off solutions.', links: [{ label: 'Sitecore Learning Path', to: '/technologies/sitecore' }] },
      { title: 'Multisite and localization architecture', description: 'Keep multiple brands, regions, and site teams governable without losing content clarity or release safety.' },
      { title: 'SXA and accelerator strategy', description: 'Use SXA thoughtfully when standardized site-building patterns are more valuable than bespoke customizations.' },
      { title: 'Datasources and renderings', description: 'Use modular content contracts that keep authors productive and renderings predictable.' },
      { title: 'Layouts, placeholders, and components', description: 'Control composition safely so authors can build pages without breaking the experience contract.' },
      { title: 'Helix principles', description: 'Keep the codebase modular and maintainable as more sites and features depend on the platform.' },
    ],
  },
  {
    id: 'sitecore-headless',
    title: 'Headless and XM Cloud',
    subtitle: 'Learn how Sitecore connects to modern rendering hosts and composable delivery.',
    duration: '4-5 Weeks',
    color: '#0891b2',
    topics: [
      { title: 'Sitecore JSS and headless services', description: 'Understand how Sitecore content and layout data flow into JavaScript rendering hosts.' },
      { title: 'Layout Service and Next.js rendering host', description: 'Map Sitecore components to frontend components and keep preview and production contracts stable.', links: [{ label: 'Sitecore Next.js Topic', to: '/technologies/sitecore/topic/sitecore-nextjs-rendering-host' }] },
      { title: 'XM Cloud and Experience Edge', description: 'Learn modern Sitecore platform direction, publish-to-live flow, and delivery expectations.' },
      { title: 'XM Cloud deployment model', description: 'Treat rendering-host release discipline, preview, and route verification as part of the Sitecore operating model.' },
      { title: 'Search and external integrations', description: 'Connect Sitecore cleanly with search, CRM, commerce, and enterprise systems.' },
    ],
  },
  {
    id: 'sitecore-authoring-ops',
    title: 'Authoring and Operations',
    subtitle: 'Build the release and support habits strong Sitecore teams rely on after launch.',
    duration: '4-5 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Experience Editor, Pages, and workflows', description: 'Support author trust through clean authoring behavior, approvals, and safe publishing.' },
      { title: 'Forms and authoring-safe lead capture', description: 'Build Sitecore Forms flows that stay secure, observable, and integration-ready under campaign pressure.' },
      { title: 'Versioning and publishing', description: 'Explain why content exists in authoring but not always in delivery and how to troubleshoot that calmly.' },
      { title: 'Serialization, CLI, and deployment flow', description: 'Treat Sitecore artifacts like release dependencies with clear environment sequencing.' },
      { title: 'Language fallback and multisite releases', description: 'Keep localized launches safe when some markets lag behind and fallback rules can hide real gaps.' },
      { title: 'Caching, performance, and security', description: 'Diagnose real production issues across cache layers, permissions, rendering hosts, and integrations.' },
    ],
  },
  {
    id: 'sitecore-career-growth',
    title: 'Career Growth and Interview Prep',
    subtitle: 'Move from implementation depth into senior enterprise CMS and architecture thinking.',
    duration: '2-3 Weeks',
    color: '#16a34a',
    topics: [
      { title: 'Projects to build', description: 'Create a headless marketing site, a multisite content platform, a workflow-driven campaign launch flow, and a personalized experience prototype.' },
      { title: 'Interview preparation', description: 'Practice Sitecore fundamentals, templates, renderings, Helix, XM Cloud, publishing, and production support conversations.', links: [{ label: 'Sitecore Interview Prep', to: '/interview-prep/sitecore' }] },
      { title: 'Senior Sitecore developer path', description: 'Strengthen release discipline, modular architecture, troubleshooting ownership, and cross-team communication.' },
      { title: 'Sitecore architect path', description: 'Learn to govern enterprise CMS platforms across authors, brands, integrations, and delivery channels.' },
    ],
  },
];

const cloudPhases: CareerPathPhase[] = [
  {
    id: 'cloud-foundation',
    title: 'Foundation',
    subtitle: 'Build the operating system and networking concepts cloud work depends on.',
    duration: '2-3 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Linux basics', description: 'Handle files, permissions, processes, logs, and shell workflows with confidence.' },
      { title: 'Networking fundamentals', description: 'Understand DNS, TLS, HTTP, routing, ports, and load balancing.' },
      { title: 'Cloud mindset', description: 'Learn shared responsibility, environments, cost awareness, and service trade-offs.' },
    ],
  },
  {
    id: 'cloud-platform',
    title: 'AWS Platform Engineering',
    subtitle: 'Learn how core cloud services fit together in production.',
    duration: '4-5 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Compute and networking', description: 'Work with EC2, load balancers, VPCs, subnets, route tables, and security groups.', links: [{ label: 'AWS Learning Path', to: '/technologies/aws' }] },
      { title: 'Storage and databases', description: 'Use S3, EBS, RDS, and DynamoDB with durability and performance in mind.' },
      { title: 'IAM and security', description: 'Apply least privilege, secrets management, and audit-focused access patterns.' },
      { title: 'Monitoring and incident response', description: 'Use metrics, logs, alarms, and dashboards to detect and fix problems quickly.' },
    ],
  },
  {
    id: 'cloud-delivery',
    title: 'Containers and Delivery',
    subtitle: 'Move from infrastructure knowledge to shipping and operating services.',
    duration: '4-5 Weeks',
    color: '#0891b2',
    topics: [
      { title: 'Docker delivery', description: 'Build images, configure runtimes, and debug container behavior.', links: [{ label: 'Docker Learning Path', to: '/technologies/docker' }] },
      { title: 'Kubernetes operations', description: 'Deploy workloads, expose traffic, store state, and troubleshoot failures.', links: [{ label: 'Kubernetes Learning Path', to: '/technologies/kubernetes' }] },
      { title: 'CI/CD and IaC', description: 'Automate environments, release safely, and reduce manual drift.' },
      { title: 'Observability', description: 'Correlate logs, metrics, alerts, and release context in live systems.' },
    ],
  },
  {
    id: 'cloud-architecture',
    title: 'Architecture and Interview Prep',
    subtitle: 'Prepare for cloud engineering and architecture conversations.',
    duration: '3-4 Weeks',
    color: '#f97316',
    topics: [
      { title: 'High availability', description: 'Design for failure, recovery targets, and multi-environment resilience.' },
      { title: 'Cost and performance', description: 'Balance scaling, storage, observability, and ownership trade-offs.' },
      { title: 'Production incidents', description: 'Walk through downtime, network failures, deployment regressions, and security events.' },
      { title: 'Interview preparation', description: 'Practice AWS, Docker, Kubernetes, incident response, and design questions.', links: [{ label: 'AWS Interview Prep', to: '/interview-prep/aws' }, { label: 'Docker Interview Prep', to: '/interview-prep/docker' }, { label: 'Kubernetes Interview Prep', to: '/interview-prep/kubernetes' }] },
    ],
  },
];

const devopsPhases: CareerPathPhase[] = [
  cloudPhases[0],
  {
    id: 'devops-automation',
    title: 'Automation',
    subtitle: 'Create reliable delivery pipelines instead of manual release rituals.',
    duration: '4-5 Weeks',
    color: '#16a34a',
    topics: [
      { title: 'Git workflows', description: 'Use branching, reviews, release management, and rollback discipline effectively.' },
      { title: 'CI/CD pipelines', description: 'Run build, test, security, and deployment stages with meaningful gates.' },
      { title: 'Infrastructure as code', description: 'Manage environments through reviewable definitions and controlled change.' },
      { title: 'Container delivery', description: 'Package, scan, tag, and publish workloads for repeatable releases.', links: [{ label: 'Docker Learning Path', to: '/technologies/docker' }] },
    ],
  },
  {
    id: 'devops-platform',
    title: 'Platform Operations',
    subtitle: 'Operate clusters, environments, and shared delivery tooling.',
    duration: '4-5 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Kubernetes operations', description: 'Handle rollout strategy, service exposure, storage, security, and debugging.', links: [{ label: 'Kubernetes Learning Path', to: '/technologies/kubernetes' }] },
      { title: 'Cloud integration', description: 'Understand IAM, networking, compute, and managed services in support of delivery.' },
      { title: 'Monitoring and SLOs', description: 'Measure service health, release quality, and incident impact clearly.' },
      { title: 'Release safety', description: 'Use canary, rollback, approvals, and change windows in a calm, repeatable way.' },
    ],
  },
  {
    id: 'devops-production',
    title: 'Production Support',
    subtitle: 'Build the operational judgment teams look for in DevOps engineers.',
    duration: '3-4 Weeks',
    color: '#ef476f',
    topics: [
      { title: 'Incident response', description: 'Lead triage, capture evidence, stabilize systems, and follow through after outages.' },
      { title: 'Performance and reliability', description: 'Diagnose bottlenecks, capacity issues, slow rollouts, and noisy alerting.' },
      { title: 'Security operations', description: 'Handle secrets, access review, auditability, and pipeline risk.' },
      { title: 'Interview preparation', description: 'Practice CI/CD, Kubernetes, production support, and operations scenarios.', links: [{ label: 'Docker Interview Prep', to: '/interview-prep/docker' }, { label: 'Kubernetes Interview Prep', to: '/interview-prep/kubernetes' }, { label: 'AWS Interview Prep', to: '/interview-prep/aws' }] },
    ],
  },
];

const aiPhases: CareerPathPhase[] = [
  {
    id: 'ai-foundation',
    title: 'Foundation',
    subtitle: 'Start with programming and product thinking before model orchestration.',
    duration: '4-5 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Programming foundations', description: 'Build API, data, and debugging discipline that supports reliable AI systems.' },
      { title: 'Machine learning concepts', description: 'Understand evaluation, embeddings, vectors, training basics, and inference trade-offs.' },
      { title: 'Data and prompt thinking', description: 'Learn how context quality, prompting, and feedback loops shape outputs.' },
    ],
  },
  {
    id: 'ai-application',
    title: 'Application Engineering',
    subtitle: 'Build products instead of isolated demos.',
    duration: '4-6 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'LLM product design', description: 'Reason about model selection, latency, cost, guardrails, and user experience.', links: [{ label: 'AI and LLMs Learning Path', to: '/technologies/ai-llm' }] },
      { title: 'RAG and retrieval systems', description: 'Design chunking, retrieval, ranking, and grounding workflows that hold up in production.' },
      { title: 'Frontend and backend integration', description: 'Connect streaming UI, API orchestration, and backend services around AI features.', links: [{ label: 'React Learning Path', to: '/technologies/react' }, { label: 'Spring Boot Learning Path', to: '/technologies/springboot' }] },
      { title: 'Evaluation and observability', description: 'Measure quality, failure modes, cost, and user trust.' },
    ],
  },
  {
    id: 'ai-production',
    title: 'Production AI',
    subtitle: 'Operate AI systems like real software platforms.',
    duration: '3-4 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Deployment and scaling', description: 'Handle queues, caching, rate limits, fallbacks, and release strategy.' },
      { title: 'Governance and privacy', description: 'Manage PII, security boundaries, auditability, and enterprise policy.' },
      { title: 'Prompt and system reliability', description: 'Reduce regressions through versioning, testing, and monitoring.' },
      { title: 'Interview preparation', description: 'Practice AI architecture, RAG debugging, cost optimization, and integration scenarios.', links: [{ label: 'AWS Interview Prep', to: '/interview-prep/aws' }, { label: 'React Interview Prep', to: '/interview-prep/react' }] },
    ],
  },
];

const awsEngineerPhases: CareerPathPhase[] = [
  cloudPhases[0],
  cloudPhases[1],
  {
    id: 'aws-services',
    title: 'AWS Services',
    subtitle: 'Go deeper on the services that appear most often in delivery work.',
    duration: '4-5 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Serverless and eventing', description: 'Use Lambda, EventBridge, and API Gateway for event-driven workloads.' },
      { title: 'Architecture patterns', description: 'Design for resilience, scaling, recovery, and cost control on AWS.' },
      { title: 'Security and governance', description: 'Apply IAM, CloudTrail, configuration control, and operational ownership.' },
      { title: 'Interview preparation', description: 'Practice AWS service selection, outages, networking, and architecture decisions.', links: [{ label: 'AWS Interview Prep', to: '/interview-prep/aws' }] },
    ],
  },
  {
    id: 'aws-delivery',
    title: 'Delivery and Operations',
    subtitle: 'Connect platform knowledge to release and support work.',
    duration: '3-4 Weeks',
    color: '#0891b2',
    topics: [
      { title: 'Docker on AWS', description: 'Package workloads and deploy through repeatable release pipelines.', links: [{ label: 'Docker Learning Path', to: '/technologies/docker' }] },
      { title: 'Kubernetes on cloud', description: 'Understand cluster operations, ingress, scaling, and platform reliability.', links: [{ label: 'Kubernetes Learning Path', to: '/technologies/kubernetes' }] },
      { title: 'Monitoring and incidents', description: 'Use metrics, logs, and failure evidence to support production systems.' },
    ],
  },
];

const azureEngineerPhases: CareerPathPhase[] = [
  {
    id: 'azure-foundation',
    title: 'Foundation',
    subtitle: 'Build the cloud and platform concepts behind Azure engineering work.',
    duration: '2-3 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Cloud fundamentals', description: 'Understand subscriptions, environments, networking, identity, and cost basics.' },
      { title: 'Linux and networking', description: 'Handle runtime debugging, DNS, TLS, ports, and routing with confidence.' },
      { title: 'Platform mindset', description: 'Think about governance, environments, and delivery ownership early.' },
    ],
  },
  {
    id: 'azure-platform',
    title: 'Azure Platform',
    subtitle: 'Build service understanding across compute, storage, and identity.',
    duration: '4-5 Weeks',
    color: '#0078d4',
    topics: [
      { title: 'Compute and storage', description: 'Learn VM, app service, storage, and deployment patterns through a platform lens.', links: [{ label: 'Azure Learning Path', to: '/technologies/azure' }] },
      { title: 'Identity and access', description: 'Understand roles, tenancy, secrets, and environment separation.' },
      { title: 'Networking and monitoring', description: 'Design reliable connectivity, visibility, and incident response paths.' },
      { title: 'Delivery workflows', description: 'Automate builds, releases, and environment promotion safely.' },
    ],
  },
  {
    id: 'azure-devops',
    title: 'Containers and Delivery',
    subtitle: 'Connect Azure platform work to operational delivery skills.',
    duration: '4-5 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Docker workflows', description: 'Package applications and control runtime behavior consistently.', links: [{ label: 'Docker Learning Path', to: '/technologies/docker' }] },
      { title: 'Kubernetes operations', description: 'Deploy and troubleshoot workloads in orchestrated environments.', links: [{ label: 'Kubernetes Learning Path', to: '/technologies/kubernetes' }] },
      { title: 'Production support', description: 'Handle performance issues, rollout regressions, and environment failures.' },
    ],
  },
  {
    id: 'azure-career',
    title: 'Career Growth and Interview Prep',
    subtitle: 'Translate Azure platform depth into interview-ready architecture and incident answers.',
    duration: '2-3 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Cloud architecture communication', description: 'Practice how to explain network, identity, environment, and scaling decisions.' },
      { title: 'Operations scenarios', description: 'Rehearse incident response, delivery, rollback, and troubleshooting stories.' },
      { title: 'Azure interview preparation', description: 'Practice Azure architecture, troubleshooting, production support, and service-selection questions.', links: [{ label: 'Azure Interview Prep', to: '/interview-prep/azure' }, { label: 'Docker Interview Prep', to: '/interview-prep/docker' }, { label: 'Kubernetes Interview Prep', to: '/interview-prep/kubernetes' }] },
    ],
  },
];

function tech(label: string, to: string, description: string, availableNow = true): CareerPathTechnology {
  return { label, to, description, availableNow };
}

function resources(groups: CareerPathResourceGroup[]): CareerPathResourceGroup[] {
  return groups;
}

export const careerRoadmaps: CareerRoadmap[] = [
  {
    slug: 'frontend-engineer',
    title: 'Frontend Engineer Career Path',
    shortTitle: 'Frontend Engineer',
    role: 'Frontend Engineer',
    icon: '💻',
    description: 'Become a frontend engineer who can build polished interfaces, reason about rendering and performance, and communicate architecture choices with confidence.',
    summary: 'A beginner-friendly journey through web foundations, React, production frontend engineering, and interview preparation.',
    technologies: [
      tech('React', '/technologies/react', 'Component architecture, hooks, state management, testing, advanced rendering, and production patterns.'),
      tech('Next.js', '/technologies/nextjs', 'Rendering strategy, App Router, routing workspace patterns, authentication, deployment, and performance.'),
    ],
    hours: '145+',
    duration: '5-7 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'High',
    salaryRange: 'INR 6L - 25L+',
    topicCount: 84,
    interviewQuestionCount: 1800,
    productionScenarioCount: 140,
    seoTitle: 'Frontend Engineer Career Path | SplashRide',
    seoDescription: 'Follow a structured frontend engineer career path covering HTML, CSS, JavaScript, TypeScript, React, Next.js, performance, architecture, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How modern frontend applications are structured and shipped', 'How routing, state, advanced rendering, testing, and APIs work together', 'How Next.js App Router, auth, caching, and deployment behavior shape production systems', 'How to debug performance, accessibility, and production issues', 'How senior frontend engineers explain architecture and scalability trade-offs'],
      skillsYouWillGain: ['Component design', 'React and Next.js delivery', 'Performance tuning', 'Testing strategy', 'Accessibility awareness', 'Deployment verification'],
      whoThisPathIsFor: ['Beginners targeting frontend roles', 'React developers who want stronger production instincts', 'Developers preparing for frontend and full-stack interviews'],
      expectedOutcomes: ['Build production interfaces', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start React Interview Preparation',
      primaryTrackTo: '/interview-prep/react',
      topicsCovered: ['React fundamentals, hooks, and reducer-driven state', 'Next.js routing, App Router patterns, and server-state behavior', 'Performance, Suspense, caching, and concurrent rendering', 'Testing, debugging, auth, and production incident handling', 'Next.js and frontend architecture'],
      questionCount: 1800,
      scenarioCount: 140,
      architectureQuestionCount: 260,
      systemDesignQuestionCount: 120,
      linkedTracks: [
        { label: 'React Interview Prep', to: '/interview-prep/react' },
        { label: 'Next.js Interview Prep', to: '/interview-prep/nextjs' },
      ],
    },
    careerInsights: {
      demand: 'Frontend roles remain one of the fastest entry points into product engineering, but companies increasingly expect stronger performance, testing, accessibility, auth, and architecture judgment.',
      careerGrowth: 'Developers typically grow from UI implementation into ownership of design systems, data-fetching patterns, Next.js delivery, performance, product surfaces, and eventually frontend platform or staff-level responsibilities.',
      skillsNeeded: ['Strong JavaScript and TypeScript fundamentals', 'React component architecture', 'Rendering, routing, auth, and server-state knowledge', 'Performance and testing discipline', 'Clear communication with design and backend teams'],
      experienceExpectations: ['Junior: component implementation and bug fixing', 'Mid-level: end-to-end feature ownership, API integration, auth-aware delivery, and testing discipline', 'Senior: architecture decisions, mentoring, performance, and production triage'],
      typicalRoles: [
        { title: 'Frontend Engineer', salaryRange: 'INR 6L - 18L', expectation: 'Ship features, own UI quality, and collaborate across product and backend teams.' },
        { title: 'Senior Frontend Engineer', salaryRange: 'INR 15L - 28L', expectation: 'Lead architecture, performance, and platform-level frontend decisions.' },
        { title: 'Frontend Architect', salaryRange: 'INR 25L - 45L', expectation: 'Define long-term UI strategy, quality standards, and multi-team frontend systems.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Foundation first', description: 'Start with browser basics before framework abstractions.' },
          { label: 'React before Next.js', description: 'Framework depth lands better when React fundamentals are already stable.' },
          { label: 'Production before interview drills', description: 'Your answers get much stronger once you have architectural context.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'React topic library', description: 'Use the full React learning path for hooks, advanced rendering, testing, state management, and architecture depth.', to: '/technologies/react' },
          { label: 'Next.js topic library', description: 'Use the Next.js learning path for routing workspace patterns, auth, production support, rendering, and deployment depth.', to: '/technologies/nextjs' },
          { label: 'Interview preparation', description: 'Practice scenario-driven answers across React and Next.js.', to: '/interview-prep/react' },
        ],
      },
    ]),
    phases: frontendPhases,
  },
  {
    slug: 'backend-engineer',
    title: 'Backend Engineer Career Path',
    shortTitle: 'Backend Engineer',
    role: 'Backend Engineer',
    icon: '🖥️',
    description: 'Become a backend engineer who can build APIs, model data carefully, support production systems, and reason about reliability and scale.',
    summary: 'A structured journey through Core Java, Spring Boot, production backend engineering, and interview preparation.',
    technologies: [
      tech('Core Java', '/technologies/java', 'Language fundamentals, modern Java features, concurrency, JVM internals, performance tuning, and production support reasoning.'),
      tech('Spring Boot', '/technologies/springboot', 'Dependency injection, APIs, security, data, observability, microservices, caching, deployment, and production support.'),
      tech('AWS', '/technologies/aws', 'Cloud deployment, networking, storage, and operational infrastructure.'),
      tech('Docker', '/technologies/docker', 'Container packaging and runtime behavior for backend delivery.'),
    ],
    hours: '175+',
    duration: '6-8 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'Very High',
    salaryRange: 'INR 8L - 28L+',
    topicCount: 127,
    interviewQuestionCount: 2200,
    productionScenarioCount: 180,
    seoTitle: 'Backend Engineer Career Path | SplashRide',
    seoDescription: 'Learn backend engineering step by step with Core Java, Spring Boot, REST APIs, data design, microservices, cloud deployment, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How backend systems process requests, model data, and enforce contracts', 'How to build reliable APIs and production-ready services', 'How to troubleshoot failures in databases, deployments, and integrations', 'How to explain backend and architecture decisions clearly in interviews'],
      skillsYouWillGain: ['API design', 'Spring Boot development', 'Database reasoning', 'Security awareness', 'Production debugging'],
      whoThisPathIsFor: ['Beginners targeting backend roles', 'Java developers moving into Spring Boot work', 'Engineers preparing for Java and backend interviews'],
      expectedOutcomes: ['Build production APIs', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start Spring Boot Interview Preparation',
      primaryTrackTo: '/interview-prep/springboot',
      topicsCovered: ['Core Java fundamentals and modern language features', 'JVM internals, concurrency, and performance diagnostics', 'Spring Boot APIs, data access, caching, and security patterns', 'Messaging, deployment, observability, and production support scenarios', 'Architecture, resiliency, and scaling questions'],
      questionCount: 2200,
      scenarioCount: 180,
      architectureQuestionCount: 320,
      systemDesignQuestionCount: 170,
      linkedTracks: [
        { label: 'Spring Boot Interview Prep', to: '/interview-prep/springboot' },
        { label: 'Core Java Interview Prep', to: '/interview-prep/core-java' },
      ],
    },
    careerInsights: {
      demand: 'Backend engineers stay in strong demand because every product and internal platform still depends on reliable APIs, persistence, integration, and operational stability.',
      careerGrowth: 'Growth usually moves from feature implementation to service ownership, platform reliability, architecture reviews, and eventually lead or principal-level system design work.',
      skillsNeeded: ['Core Java depth', 'Spring Boot fluency', 'Database and transactions knowledge', 'Security and reliability thinking', 'Comfort with cloud delivery and observability'],
      experienceExpectations: ['Junior: build endpoints and fix defects safely', 'Mid-level: own features end to end with data and deployment awareness', 'Senior: lead service design, triage incidents, and mentor peers'],
      typicalRoles: [
        { title: 'Backend Engineer', salaryRange: 'INR 8L - 20L', expectation: 'Build APIs, model data, and support service delivery.' },
        { title: 'Senior Backend Engineer', salaryRange: 'INR 16L - 30L', expectation: 'Own architecture, reliability, performance, and platform standards.' },
        { title: 'Backend Architect', salaryRange: 'INR 28L - 48L', expectation: 'Design system boundaries, governance, and long-term platform evolution.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Language before framework', description: 'Strong Java fundamentals make Spring decisions easier to reason about.' },
          { label: 'Data and security before microservices', description: 'Get correctness right before distributing complexity.' },
          { label: 'Production support before system design', description: 'Operational evidence makes architecture answers sharper.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'Core Java topic library', description: 'Use the Java learning path for language depth, JVM internals, performance, and production support.', to: '/technologies/java' },
          { label: 'Spring Boot topic library', description: 'Use the Spring Boot path for API, security, data, microservices, deployment, and production depth.', to: '/technologies/springboot' },
          { label: 'Interview preparation', description: 'Practice backend and Java interview answers.', to: '/interview-prep/springboot' },
        ],
      },
    ]),
    phases: backendPhases,
  },
  {
    slug: 'full-stack-java',
    title: 'Full Stack Java Developer Career Path',
    shortTitle: 'Full Stack Java',
    role: 'Full Stack Java Developer',
    icon: '🧩',
    description: 'Become a full stack Java developer who can build UI, APIs, databases, and deployments as one connected product system.',
    summary: 'A guided route through frontend foundations, Java backend engineering, delivery workflows, and interview readiness.',
    technologies: [
      tech('React', '/technologies/react', 'Frontend UI architecture and interactive application development.'),
      tech('Next.js', '/technologies/nextjs', 'Rendering strategy, routing, and deployment behavior for frontend delivery.'),
      tech('Core Java', '/technologies/java', 'Language depth, modern Java features, concurrency, and JVM debugging confidence.'),
      tech('Spring Boot', '/technologies/springboot', 'API design, security, data, observability, deployment, and production backend delivery.'),
      tech('AWS', '/technologies/aws', 'Cloud deployment and operational foundations.'),
      tech('Docker', '/technologies/docker', 'Containerized local development and release packaging.'),
    ],
    hours: '170+',
    duration: '6-8 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'Very High',
    salaryRange: 'INR 8L - 30L+',
    topicCount: 133,
    interviewQuestionCount: 2600,
    productionScenarioCount: 210,
    seoTitle: 'Full Stack Java Developer Career Path | SplashRide',
    seoDescription: 'Follow a full stack Java career path covering React, Next.js, Core Java, Spring Boot, SQL, cloud delivery, architecture, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How frontend and backend contracts fit together in real applications', 'How to ship features from UI to API to deployment', 'How to debug integration, auth, and release problems across the stack', 'How to communicate end-to-end ownership in interviews'],
      skillsYouWillGain: ['Cross-stack delivery', 'API and UI integration', 'Deployment awareness', 'Database reasoning', 'Production troubleshooting'],
      whoThisPathIsFor: ['Developers who want broad product engineering capability', 'Backend engineers adding frontend confidence', 'Frontend engineers moving toward full-stack ownership'],
      expectedOutcomes: ['Build production applications', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start Full Stack Interview Preparation',
      primaryTrackTo: '/interview-prep/springboot',
      topicsCovered: ['React and frontend flows', 'Core Java and Spring Boot', 'API design and security', 'Production support', 'System design and architecture'],
      questionCount: 2600,
      scenarioCount: 210,
      architectureQuestionCount: 390,
      systemDesignQuestionCount: 220,
      linkedTracks: [
        { label: 'React Interview Prep', to: '/interview-prep/react' },
        { label: 'Spring Boot Interview Prep', to: '/interview-prep/springboot' },
        { label: 'Core Java Interview Prep', to: '/interview-prep/core-java' },
      ],
    },
    careerInsights: {
      demand: 'Full-stack engineers are especially valuable in product teams that need one person to reason across UI, APIs, data, and delivery trade-offs.',
      careerGrowth: 'Many engineers use full-stack roles to accelerate into senior product ownership, technical leadership, or architecture positions because they see the whole system.',
      skillsNeeded: ['Comfort moving between UI and API code', 'Strong communication across disciplines', 'Ability to trace failures across layers', 'Good data and deployment awareness', 'Steady prioritization and delivery judgment'],
      experienceExpectations: ['Junior: contribute features across one or two layers with guidance', 'Mid-level: own end-to-end delivery for product slices', 'Senior: drive architecture, release quality, and cross-team technical decisions'],
      typicalRoles: [
        { title: 'Full Stack Java Developer', salaryRange: 'INR 8L - 22L', expectation: 'Build UI, APIs, and delivery flows for product features.' },
        { title: 'Senior Full Stack Engineer', salaryRange: 'INR 16L - 32L', expectation: 'Own architecture, cross-stack quality, and production readiness.' },
        { title: 'Technical Lead', salaryRange: 'INR 25L - 45L', expectation: 'Guide team decisions, delivery strategy, and long-term system evolution.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'One layer at a time', description: 'Stabilize frontend and backend fundamentals separately before blending them.' },
          { label: 'Integration practice early', description: 'Full-stack confidence comes from connecting layers, not mastering them in isolation.' },
          { label: 'Use interview prep late in the path', description: 'Your answers improve once you have shipped and debugged across the stack.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'React learning path', description: 'Use for UI architecture and routing depth.', to: '/technologies/react' },
          { label: 'Spring Boot learning path', description: 'Use for API, security, and data depth.', to: '/technologies/springboot' },
          { label: 'Interview preparation', description: 'Use multiple live interview tracks to cover full-stack breadth.', to: '/interview-prep' },
        ],
      },
    ]),
    phases: fullStackJavaPhases,
  },
  {
    slug: 'aem-developer',
    title: 'AEM Developer Career Path',
    shortTitle: 'AEM Developer',
    role: 'AEM Developer',
    icon: '🅰️',
    description: 'Become a production-ready Adobe Experience Manager developer through structured learning, architecture thinking, troubleshooting, and interview preparation.',
    summary: 'A guided route from AEM fundamentals to real project implementation, Cloud Service delivery, and senior-level production thinking.',
    technologies: [
      tech('AEM', '/technologies/aem', 'Components, HTL, Sling Models, dispatcher, Cloud Service, and enterprise delivery patterns.'),
      tech('Core Java', '/technologies/java', 'The Java base used for services, APIs, and AEM backend reasoning.'),
      tech('React', '/technologies/react', 'Helpful for SPA, headless, component thinking, and frontend collaboration in modern AEM programs.'),
      tech('Next.js', '/technologies/nextjs', 'Useful for headless AEM and edge-oriented frontend integration patterns.'),
    ],
    hours: '160+',
    duration: '6-7 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'High',
    salaryRange: 'INR 7L - 20L+',
    topicCount: 34,
    interviewQuestionCount: 2400,
    productionScenarioCount: 230,
    seoTitle: 'AEM Developer Career Path | SplashRide',
    seoDescription: 'Learn AEM step by step with a career path covering Sling, HTL, components, dispatcher, Cloud Service, architecture, troubleshooting, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How AEM content, requests, repository structure, and rendering work together', 'How to build reusable components, templates, content models, and DAM-aware delivery patterns', 'How to handle dispatcher, performance, security, Cloud Service, and production issues', 'How to grow from beginner through architect-level AEM delivery and explain trade-offs in interviews'],
      skillsYouWillGain: ['AEM development', 'Repository and Sling thinking', 'Dispatcher troubleshooting', 'Cloud Service delivery', 'Headless and integration planning', 'Enterprise architecture communication'],
      whoThisPathIsFor: ['Beginners entering AEM development', 'Java developers moving into Adobe Experience Manager work', 'AEM engineers preparing for senior and lead interviews'],
      expectedOutcomes: ['Build production-ready AEM features', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready', 'Grow toward lead and architect responsibilities'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start AEM Interview Preparation',
      primaryTrackTo: '/interview-prep/aem',
      topicsCovered: ['Components, dialogs, and Sling Models', 'JCR, Oak, HTL, and OSGi', 'Dispatcher, performance, and security', 'Cloud Service, Cloud Manager, and headless delivery', 'Architecture and troubleshooting'],
      questionCount: 2400,
      scenarioCount: 230,
      architectureQuestionCount: 420,
      systemDesignQuestionCount: 180,
      linkedTracks: [
        { label: 'AEM Interview Prep', to: '/interview-prep/aem' },
      ],
    },
    careerInsights: {
      demand: 'AEM roles stay valuable where large enterprises need content governance, multi-site delivery, personalization, and Adobe ecosystem expertise.',
      careerGrowth: 'AEM engineers often progress from component work into platform ownership, implementation leadership, headless delivery strategy, or solution architecture.',
      skillsNeeded: ['Strong Java and frontend fundamentals', 'AEM component, Sling, JCR, and OSGi knowledge', 'Dispatcher, performance, and security troubleshooting', 'Cloud Manager, environment config, and release awareness', 'Headless, DAM, and integration trade-off thinking', 'Enterprise communication and governance discipline'],
      experienceExpectations: ['Junior: build and support components, templates, and content structures under guidance', 'Mid-level: own authoring features, fragments, integrations, and release quality', 'Senior: lead architecture reviews, environment strategy, performance, and production troubleshooting', 'Lead/Architect: define standards, modernization direction, and operating model clarity'],
      typicalRoles: [
        { title: 'AEM Developer', salaryRange: 'INR 7L - 20L', expectation: 'Build components, templates, and integrations with reliable authoring behavior.' },
        { title: 'Senior AEM Developer', salaryRange: 'INR 15L - 30L', expectation: 'Lead implementation quality, mentoring, troubleshooting, and architecture reviews.' },
        { title: 'AEM Lead', salaryRange: 'INR 20L - 38L', expectation: 'Coordinate releases, standards, mentoring, and cross-team delivery quality.' },
        { title: 'AEM Architect', salaryRange: 'INR 25L - 50L', expectation: 'Own platform strategy, scalability, governance, and enterprise design decisions.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Repository before components', description: 'AEM implementation gets easier once content structure, Sling, and Oak behavior are clear.' },
          { label: 'Authoring before headless', description: 'Traditional authoring discipline helps you design better fragment and API models later.' },
          { label: 'Dispatcher before architecture interviews', description: 'Real cache and delivery experience sharpens senior-level answers.' },
          { label: 'Cloud Service before governance', description: 'Modern deployment constraints change how enterprise AEM work behaves.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'AEM learning path', description: 'Use the full AEM topic library for implementation depth.', to: '/technologies/aem' },
          { label: 'AEM interview prep', description: 'Practice enterprise interview questions and production scenarios.', to: '/interview-prep/aem' },
          { label: 'Core Java support path', description: 'Strengthen the Java base underneath AEM services and debugging.', to: '/technologies/java' },
          { label: 'React support path', description: 'Improve headless, SPA, and component collaboration skills.', to: '/technologies/react' },
          { label: 'Next.js support path', description: 'Strengthen headless and edge-oriented frontend delivery skills.', to: '/technologies/nextjs' },
        ],
      },
    ]),
    phases: aemPhases,
  },
  {
    slug: 'contentful-developer',
    title: 'Contentful Developer Career Path',
    shortTitle: 'Contentful Developer',
    role: 'Contentful / CMS Developer',
    icon: '🧱',
    description: 'Become a Contentful-focused CMS developer who can model content well, integrate it with frontend applications, support editorial workflows, and grow toward senior CMS architecture.',
    summary: 'A practical route through Contentful modeling, delivery APIs, preview, localization, frontend integration, production support, and interview preparation.',
    technologies: [
      tech('Contentful', '/technologies/contentful', 'Content modeling, delivery APIs, preview, localization, webhooks, migrations, and production CMS patterns.'),
      tech('React', '/technologies/react', 'Frontend integration, component rendering, and UI mapping for structured content.'),
      tech('Next.js', '/technologies/nextjs', 'Preview routes, rendering strategy, revalidation, and production delivery around CMS content.'),
    ],
    hours: '140+',
    duration: '5-6 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'Growing',
    salaryRange: 'INR 7L - 24L+',
    topicCount: 40,
    interviewQuestionCount: 44,
    productionScenarioCount: 4,
    seoTitle: 'Contentful Developer Career Path | SplashRide',
    seoDescription: 'Follow the Contentful developer career path with content modeling, delivery APIs, preview, localization, frontend integration, production best practices, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How to design clean Contentful content models that scale across teams and channels', 'How to integrate Contentful with React and Next.js safely across preview, publish, and SEO flows', 'How localization, webhooks, caching, migrations, and troubleshooting work in production', 'How to grow from beginner through lead and headless CMS architect responsibilities'],
      skillsYouWillGain: ['Content modeling', 'API integration', 'Rich text and asset rendering', 'Localization and preview handling', 'Publishing workflow design', 'Production CMS troubleshooting'],
      whoThisPathIsFor: ['Developers moving into headless CMS work', 'Frontend engineers adding structured content-platform depth', 'CMS developers preparing for senior, lead, or architect-style interviews'],
      expectedOutcomes: ['Build real CMS-driven applications', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready', 'Grow toward platform ownership'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start Contentful Interview Preparation',
      primaryTrackTo: '/interview-prep/contentful',
      topicsCovered: ['Content modeling and Entries/Assets', 'Delivery, Preview, Management, and GraphQL APIs', 'Frontend and Next.js integration', 'Localization, permissions, and webhooks', 'Production scenarios and architecture questions'],
      questionCount: 53,
      scenarioCount: 4,
      architectureQuestionCount: 11,
      systemDesignQuestionCount: 8,
      linkedTracks: [
        { label: 'Contentful Interview Prep', to: '/interview-prep/contentful' },
        { label: 'React Interview Prep', to: '/interview-prep/react' },
        { label: 'Next.js Interview Prep', to: '/interview-prep/nextjs' },
      ],
    },
    careerInsights: {
      demand: 'Contentful and headless CMS skills are increasingly valuable in product teams that need reusable content across websites, apps, regions, and marketing platforms.',
      careerGrowth: 'Contentful developers often grow into senior CMS engineers, frontend-platform specialists, solution architects, or content-platform leads responsible for schema governance and multi-channel delivery.',
      skillsNeeded: ['Strong content modeling judgment', 'React and Next.js integration awareness', 'Preview, publish, and API discipline', 'Localization, Rich Text, and asset handling', 'Webhook and revalidation understanding', 'Ability to explain trade-offs across editors and engineers'],
      experienceExpectations: ['Junior: support entries, assets, rendering, and safe model updates', 'Mid-level: own schema design, preview, and frontend integration', 'Senior: lead migrations, governance, troubleshooting, and platform standards', 'Lead/Architect: define operating model, multi-app contracts, and platform direction'],
      typicalRoles: [
        { title: 'Contentful Developer', salaryRange: 'INR 7L - 16L', expectation: 'Implement content models, API integrations, previews, and CMS-driven features.' },
        { title: 'Senior CMS Developer', salaryRange: 'INR 14L - 26L', expectation: 'Lead model quality, production support, localization, and multi-team content delivery.' },
        { title: 'Contentful Lead', salaryRange: 'INR 18L - 32L', expectation: 'Coordinate platform standards, release workflow, mentoring, and cross-team delivery quality.' },
        { title: 'CMS Architect', salaryRange: 'INR 24L - 40L', expectation: 'Define platform governance, schema evolution, and multi-channel CMS strategy.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Model before code', description: 'Strong schemas make every later frontend and publishing decision easier.' },
          { label: 'Preview before publish', description: 'Editorial trust grows when draft, publish, and cache behavior are understood early.' },
          { label: 'Localization before scale', description: 'Locale, fallback, and slug strategy should be stable before expanding to many markets.' },
          { label: 'Production support throughout', description: 'Content platforms become senior-level work when you can troubleshoot them calmly after launch.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'Contentful learning path', description: 'Use for modeling, APIs, preview, localization, migrations, and production best practices.', to: '/technologies/contentful' },
          { label: 'Contentful interview prep', description: 'Practice realistic CMS, delivery, and architecture questions.', to: '/interview-prep/contentful' },
          { label: 'React learning path', description: 'Strengthen the frontend integration side of headless CMS delivery.', to: '/technologies/react' },
          { label: 'Next.js learning path', description: 'Strengthen preview, ISR, and deployment-side delivery behavior.', to: '/technologies/nextjs' },
        ],
      },
    ]),
    phases: contentfulPhases,
  },
  {
    slug: 'sitecore-developer',
    title: 'Sitecore Developer Career Path',
    shortTitle: 'Sitecore Developer',
    role: 'Sitecore / Enterprise CMS Developer',
    icon: '🧩',
    description: 'Become a Sitecore-focused enterprise CMS developer who can design content architecture, support authoring, ship headless experiences, and grow toward senior Sitecore architecture.',
    summary: 'A practical route through Sitecore fundamentals, content architecture, headless delivery, XM Cloud basics, production support, and interview preparation.',
    technologies: [
      tech('Sitecore', '/technologies/sitecore', 'Enterprise CMS, templates, items, renderings, headless services, XM Cloud, publishing, personalization, and production support patterns.'),
      tech('React', '/technologies/react', 'Frontend component thinking and rendering-host awareness for headless Sitecore implementations.'),
      tech('Next.js', '/technologies/nextjs', 'Rendering hosts, route delivery, preview behavior, and modern headless frontend deployment patterns.'),
    ],
    hours: '130+',
    duration: '5-6 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'High',
    salaryRange: 'INR 8L - 26L+',
    topicCount: 55,
    interviewQuestionCount: 416,
    productionScenarioCount: 4,
    seoTitle: 'Sitecore Developer Career Path | SplashRide',
    seoDescription: 'Follow the Sitecore developer career path with templates, items, renderings, headless delivery, XM Cloud, publishing, personalization, production troubleshooting, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How Sitecore content architecture, authoring, multisite structure, and delivery work together in enterprise programs', 'How to build and govern templates, SXA usage, renderings, datasources, workflows, forms, and publishing safely', 'How headless Sitecore, JSS, Next.js, Experience Edge, search, localization, and XM Cloud change implementation and operations', 'How to grow toward senior Sitecore developer and Sitecore architect responsibilities'],
      skillsYouWillGain: ['Sitecore content architecture', 'Rendering and component design', 'Headless delivery integration', 'Publishing and release discipline', 'Enterprise CMS troubleshooting'],
      whoThisPathIsFor: ['Developers moving into enterprise CMS and Sitecore work', 'Frontend or platform engineers adding Sitecore and XM Cloud delivery depth', 'Sitecore developers preparing for senior, lead, or architect-style interviews'],
      expectedOutcomes: ['Build real Sitecore-driven applications', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start Sitecore Interview Preparation',
      primaryTrackTo: '/interview-prep/sitecore',
      topicsCovered: ['Fundamentals, headless vs MVC, and product direction', 'Templates, multisite architecture, SXA, items, renderings, and Helix', 'Headless delivery, Experience Edge, search, and XM Cloud operations', 'Publishing, forms, localization, serialization strategy, and production support', 'Architect-level enterprise CMS and operating-model decisions'],
      questionCount: 416,
      scenarioCount: 4,
      architectureQuestionCount: 104,
      systemDesignQuestionCount: 52,
      linkedTracks: [
        { label: 'Sitecore Interview Prep', to: '/interview-prep/sitecore' },
        { label: 'React Interview Prep', to: '/interview-prep/react' },
        { label: 'Next.js Interview Prep', to: '/interview-prep/nextjs' },
      ],
    },
    careerInsights: {
      demand: 'Sitecore roles remain valuable in enterprises that need strong content governance, authoring trust, personalization, multisite delivery, search integration, and modern headless platform direction.',
      careerGrowth: 'Sitecore developers often grow into senior CMS engineers, platform leads, SXA or XM Cloud specialists, or solution architects responsible for content architecture, release safety, and multi-team governance.',
      skillsNeeded: ['Strong content architecture judgment', 'Rendering and authoring workflow awareness', 'Headless and rendering-host integration depth', 'Publishing, localization, and environment discipline', 'Calm production troubleshooting across CMS and frontend boundaries'],
      experienceExpectations: ['Junior: support templates, items, components, and authoring workflows safely', 'Mid-level: own feature-level Sitecore implementation and headless integration quality', 'Senior: lead modular architecture, production support, and release coordination', 'Architect: govern product direction, integrations, environments, and long-term platform maintainability'],
      typicalRoles: [
        { title: 'Sitecore Developer', salaryRange: 'INR 8L - 18L', expectation: 'Implement templates, renderings, headless integrations, and authoring-safe Sitecore features.' },
        { title: 'Senior Sitecore Developer', salaryRange: 'INR 16L - 30L', expectation: 'Lead architecture quality, troubleshooting, modularity, publishing discipline, and team mentoring.' },
        { title: 'Sitecore Architect', salaryRange: 'INR 28L - 48L', expectation: 'Own platform direction, XM Cloud or headless strategy, governance, and enterprise CMS design decisions.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Content architecture before components', description: 'Sitecore implementation becomes much easier once templates, items, and datasources are clear.' },
          { label: 'Publishing before production support', description: 'Many Sitecore incidents only make sense when publish-to-live behavior is already understood.' },
          { label: 'Headless after authoring fundamentals', description: 'Modern rendering hosts are easier to reason about once the core Sitecore content model is stable in your head.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'Sitecore learning path', description: 'Use for templates, SXA, headless delivery, forms, localization, XM Cloud, integrations, and production best practices.', to: '/technologies/sitecore' },
          { label: 'Sitecore interview prep', description: 'Practice enterprise CMS, multisite, headless delivery, and architect-level Sitecore questions.', to: '/interview-prep/sitecore' },
          { label: 'React and Next.js learning paths', description: 'Strengthen the rendering-host side of modern Sitecore delivery.', to: '/technologies/react' },
        ],
      },
    ]),
    phases: sitecorePhases,
  },
  {
    slug: 'cloud-engineer',
    title: 'Cloud Engineer Career Path',
    shortTitle: 'Cloud Engineer',
    role: 'Cloud Engineer',
    icon: '☁️',
    description: 'Become a cloud engineer who can design, deploy, observe, and improve real platform infrastructure with confidence.',
    summary: 'A practical route through cloud fundamentals, AWS services, containers, delivery, and architecture-focused interview preparation.',
    technologies: [
      tech('AWS', '/technologies/aws', 'Cloud services, networking, IAM, storage, databases, and architecture patterns.'),
      tech('Docker', '/technologies/docker', 'Container build and runtime workflows used in cloud delivery.'),
      tech('Kubernetes', '/technologies/kubernetes', 'Orchestration, rollout, networking, storage, and platform operations.'),
    ],
    hours: '150+',
    duration: '5-7 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'Very High',
    salaryRange: 'INR 8L - 35L+',
    topicCount: 68,
    interviewQuestionCount: 2300,
    productionScenarioCount: 220,
    seoTitle: 'Cloud Engineer Career Path | SplashRide',
    seoDescription: 'Become a cloud engineer with a structured path covering AWS, Docker, Kubernetes, monitoring, security, delivery, architecture, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How cloud services fit together in production systems', 'How containers and orchestration support delivery and operations', 'How to reason about resilience, security, and cost trade-offs', 'How to explain outages, recovery, and platform design clearly'],
      skillsYouWillGain: ['Cloud infrastructure reasoning', 'Container operations', 'Monitoring and alerting', 'Incident triage', 'Architecture communication'],
      whoThisPathIsFor: ['Developers moving into cloud-focused roles', 'Platform and operations engineers strengthening fundamentals', 'Backend engineers expanding into infrastructure ownership'],
      expectedOutcomes: ['Deploy real systems', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start AWS Interview Preparation',
      primaryTrackTo: '/interview-prep/aws',
      topicsCovered: ['AWS fundamentals and architecture', 'Docker and Kubernetes', 'Production incidents', 'Reliability and observability', 'System design trade-offs'],
      questionCount: 2300,
      scenarioCount: 220,
      architectureQuestionCount: 340,
      systemDesignQuestionCount: 180,
      linkedTracks: [
        { label: 'AWS Interview Prep', to: '/interview-prep/aws' },
        { label: 'Docker Interview Prep', to: '/interview-prep/docker' },
        { label: 'Kubernetes Interview Prep', to: '/interview-prep/kubernetes' },
      ],
    },
    careerInsights: {
      demand: 'Cloud engineers are central to both product teams and platform teams because infrastructure, cost, security, and reliability decisions increasingly shape product outcomes.',
      careerGrowth: 'Engineers often grow from service deployment and operations into platform architecture, reliability engineering, cloud governance, and multi-team enablement.',
      skillsNeeded: ['Strong Linux and networking fundamentals', 'Cloud service selection judgment', 'Automation and observability habits', 'Incident response calm', 'Comfort with delivery tooling'],
      experienceExpectations: ['Junior: support environments and deployments safely', 'Mid-level: own service rollout and operational quality', 'Senior: design resilient platforms and guide incident prevention'],
      typicalRoles: [
        { title: 'Cloud Engineer', salaryRange: 'INR 8L - 22L', expectation: 'Deploy services, maintain environments, and improve platform reliability.' },
        { title: 'Senior Cloud Engineer', salaryRange: 'INR 16L - 32L', expectation: 'Lead architecture, security, and cost-aware platform evolution.' },
        { title: 'Cloud Architect', salaryRange: 'INR 28L - 50L', expectation: 'Define strategic cloud direction, standards, and multi-team design patterns.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Networking before managed services', description: 'Cloud service behavior makes more sense when traffic flow is already clear.' },
          { label: 'Containers before Kubernetes', description: 'Cluster orchestration lands better once container runtime behavior feels normal.' },
          { label: 'Observability throughout', description: 'Monitoring skill should grow alongside platform complexity, not after it.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'AWS learning path', description: 'Use for cloud service depth and architecture patterns.', to: '/technologies/aws' },
          { label: 'Docker learning path', description: 'Use for image, runtime, and delivery confidence.', to: '/technologies/docker' },
          { label: 'Kubernetes learning path', description: 'Use for orchestration and operations depth.', to: '/technologies/kubernetes' },
        ],
      },
    ]),
    phases: cloudPhases,
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer Career Path',
    shortTitle: 'DevOps Engineer',
    role: 'DevOps Engineer',
    icon: '∞',
    description: 'Become a DevOps engineer who can automate delivery, operate production systems, and improve release confidence across teams.',
    summary: 'A structured route through automation, container delivery, platform operations, production support, and interview preparation.',
    technologies: [
      tech('AWS', '/technologies/aws', 'Infrastructure, networking, identity, and cloud delivery foundations.'),
      tech('Docker', '/technologies/docker', 'Container packaging, runtime debugging, and delivery workflows.'),
      tech('Kubernetes', '/technologies/kubernetes', 'Operational orchestration, rollout strategy, and production troubleshooting.'),
      tech('Azure', '/technologies/azure', 'Azure compute, storage, networking, identity, DevOps, security, and enterprise architecture patterns.'),
    ],
    hours: '155+',
    duration: '5-7 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'High',
    salaryRange: 'INR 7L - 28L+',
    topicCount: 62,
    interviewQuestionCount: 2100,
    productionScenarioCount: 250,
    seoTitle: 'DevOps Engineer Career Path | SplashRide',
    seoDescription: 'Follow a DevOps engineer career path covering delivery automation, Docker, Kubernetes, cloud operations, production support, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How delivery pipelines, infrastructure, and runtime operations connect', 'How to release software safely and repeatedly', 'How to troubleshoot production incidents with evidence and calm', 'How to explain automation, operations, and reliability choices in interviews'],
      skillsYouWillGain: ['CI/CD ownership', 'Container delivery', 'Cluster operations', 'Monitoring and alerting', 'Incident response'],
      whoThisPathIsFor: ['Engineers moving from development into platform delivery', 'Operations engineers modernizing into DevOps practices', 'Cloud engineers wanting deeper automation and release expertise'],
      expectedOutcomes: ['Automate delivery', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start DevOps Interview Preparation',
      primaryTrackTo: '/interview-prep/docker',
      topicsCovered: ['CI/CD workflows', 'Docker and Kubernetes', 'Cloud operations', 'Incident response', 'Reliability and scale'],
      questionCount: 2100,
      scenarioCount: 250,
      architectureQuestionCount: 300,
      systemDesignQuestionCount: 160,
      linkedTracks: [
        { label: 'Docker Interview Prep', to: '/interview-prep/docker' },
        { label: 'Kubernetes Interview Prep', to: '/interview-prep/kubernetes' },
        { label: 'AWS Interview Prep', to: '/interview-prep/aws' },
      ],
      note: 'SplashRide covers the closest live DevOps interview tracks today through Docker, Kubernetes, and AWS.',
    },
    careerInsights: {
      demand: 'DevOps roles remain important wherever engineering organizations need faster release cycles without trading away reliability, security, or operational clarity.',
      careerGrowth: 'Many DevOps engineers grow into platform engineering, site reliability, cloud architecture, or engineering enablement leadership roles.',
      skillsNeeded: ['Automation mindset', 'Strong debugging under pressure', 'Comfort with Linux, networking, and containers', 'Release discipline', 'Clear communication during incidents'],
      experienceExpectations: ['Junior: support pipelines and deployment workflows', 'Mid-level: own delivery quality and platform operations', 'Senior: define release strategy, reliability standards, and operational governance'],
      typicalRoles: [
        { title: 'DevOps Engineer', salaryRange: 'INR 7L - 20L', expectation: 'Build and support pipelines, environments, and release workflows.' },
        { title: 'Senior DevOps Engineer', salaryRange: 'INR 15L - 30L', expectation: 'Lead operational quality, release safety, and platform improvement.' },
        { title: 'Platform or SRE Lead', salaryRange: 'INR 24L - 45L', expectation: 'Own reliability strategy, platform standards, and engineering enablement.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Automation before scale', description: 'Repeatability matters before complex cluster and platform work.' },
          { label: 'Observability before incident drills', description: 'You cannot troubleshoot calmly without good signals.' },
          { label: 'Multi-cloud later', description: 'Start with one strong cloud foundation before spreading across platforms.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'Docker learning path', description: 'Use for container fundamentals and runtime debugging.', to: '/technologies/docker' },
          { label: 'Kubernetes learning path', description: 'Use for orchestration and operational depth.', to: '/technologies/kubernetes' },
          { label: 'AWS learning path', description: 'Use for cloud infrastructure patterns and observability.', to: '/technologies/aws' },
        ],
      },
    ]),
    phases: devopsPhases,
  },
  {
    slug: 'ai-engineer',
    title: 'AI Engineer Career Path',
    shortTitle: 'AI Engineer',
    role: 'AI Engineer',
    icon: '🤖',
    description: 'Become an AI engineer who can design useful LLM features, connect them to product systems, and operate them responsibly in production.',
    summary: 'A practical journey through AI foundations, LLM application engineering, integration, governance, and interview preparation.',
    technologies: [
      tech('AI / LLM Engineering', '/technologies/ai-llm', 'Prompt engineering, RAG, vector databases, evaluation, agents, production AI, and enterprise AI system design.'),
      tech('React', '/technologies/react', 'UI delivery for AI experiences and streaming product behavior.'),
      tech('Spring Boot', '/technologies/springboot', 'Backend orchestration and service integration around AI products.'),
      tech('AWS', '/technologies/aws', 'Cloud deployment, observability, and supporting platform capabilities.'),
    ],
    hours: '165+',
    duration: '6-8 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'Rapidly Growing',
    salaryRange: 'INR 10L - 40L+',
    topicCount: 66,
    interviewQuestionCount: 1700,
    productionScenarioCount: 160,
    seoTitle: 'AI Engineer Career Path | SplashRide',
    seoDescription: 'Become an AI engineer with a career path covering LLMs, RAG, prompt engineering, backend integration, deployment, governance, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How to build AI features as products rather than isolated demos', 'How retrieval, prompting, APIs, and UI flows work together', 'How to reason about latency, cost, governance, and trust in production', 'How to communicate AI architecture and failure trade-offs in interviews'],
      skillsYouWillGain: ['LLM product thinking', 'RAG design', 'Backend integration', 'Monitoring and evaluation', 'Governance awareness'],
      whoThisPathIsFor: ['Developers moving into AI application engineering', 'Full-stack engineers adding LLM product skills', 'Teams building internal copilots or AI-assisted workflows'],
      expectedOutcomes: ['Build AI-enabled products', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start AI / LLM Interview Preparation',
      primaryTrackTo: '/interview-prep/ai-llm',
      topicsCovered: ['LLM and RAG system design', 'Prompt reliability and observability', 'Evaluation and hallucination control', 'Vector database and retrieval trade-offs', 'Production debugging'],
      questionCount: 1700,
      scenarioCount: 160,
      architectureQuestionCount: 290,
      systemDesignQuestionCount: 180,
      linkedTracks: [
        { label: 'AI / LLM Interview Prep', to: '/interview-prep/ai-llm' },
        { label: 'React Interview Prep', to: '/interview-prep/react' },
        { label: 'Spring Boot Interview Prep', to: '/interview-prep/springboot' },
      ],
    },
    careerInsights: {
      demand: 'AI engineer demand is rising quickly, especially for teams that need applied LLM products rather than research-only profiles.',
      careerGrowth: 'AI engineers often branch into applied ML platform work, product architecture, retrieval systems, model operations, or AI technical leadership.',
      skillsNeeded: ['Strong software engineering foundations', 'Good product judgment around latency and user trust', 'Ability to evaluate outputs critically', 'Integration skill across UI, APIs, and cloud services', 'Governance and privacy awareness'],
      experienceExpectations: ['Junior: integrate APIs and help ship AI-assisted features', 'Mid-level: own retrieval, prompting, evaluation, and operational quality', 'Senior: design end-to-end AI systems and lead governance decisions'],
      typicalRoles: [
        { title: 'AI Engineer', salaryRange: 'INR 10L - 24L', expectation: 'Build applied AI workflows and connect them to product systems.' },
        { title: 'Senior AI Engineer', salaryRange: 'INR 20L - 38L', expectation: 'Own architecture, reliability, and product trade-offs in AI systems.' },
        { title: 'AI Architect', salaryRange: 'INR 32L - 55L', expectation: 'Define platform standards, governance, and long-term AI capability strategy.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Software foundations still matter', description: 'Strong delivery habits beat prompt-only knowledge in real product teams.' },
          { label: 'Evaluation before scale', description: 'Measure quality before layering in more models or more tooling.' },
          { label: 'Governance throughout', description: 'Privacy, safety, and trust should be designed in from the start.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'AI and LLMs track', description: 'Use for LLM foundations, RAG, prompt engineering, agents, and production AI system design.', to: '/technologies/ai-llm' },
          { label: 'React learning path', description: 'Use for product interface and streaming UX depth.', to: '/technologies/react' },
          { label: 'Spring Boot learning path', description: 'Use for backend orchestration and API reliability.', to: '/technologies/springboot' },
        ],
      },
    ]),
    phases: aiPhases,
  },
  {
    slug: 'aws-engineer',
    title: 'AWS Engineer Career Path',
    shortTitle: 'AWS Engineer',
    role: 'AWS Engineer',
    icon: '🟧',
    description: 'Become an AWS engineer who can design practical cloud architectures, support production workloads, and explain service trade-offs clearly.',
    summary: 'A focused route through AWS services, operational delivery, architecture patterns, and interview preparation.',
    technologies: [
      tech('AWS', '/technologies/aws', 'Core cloud services, networking, storage, serverless, monitoring, and architecture.'),
      tech('Docker', '/technologies/docker', 'Container packaging and deployment patterns often used on AWS.'),
      tech('Kubernetes', '/technologies/kubernetes', 'Cluster operations relevant to containerized AWS workloads.'),
    ],
    hours: '140+',
    duration: '5-6 Months',
    difficulty: 'Intermediate',
    demand: 'Very High',
    salaryRange: 'INR 9L - 32L+',
    topicCount: 60,
    interviewQuestionCount: 1900,
    productionScenarioCount: 170,
    seoTitle: 'AWS Engineer Career Path | SplashRide',
    seoDescription: 'Build AWS engineering capability with a path covering compute, networking, storage, security, architecture, delivery, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How core AWS services fit together in real architectures', 'How to choose the right service for cost, scale, and reliability', 'How to support deployments and operational incidents on AWS', 'How to explain AWS architecture decisions in interviews'],
      skillsYouWillGain: ['AWS service fluency', 'Cloud networking', 'Security and IAM reasoning', 'Monitoring and incident debugging', 'Architecture communication'],
      whoThisPathIsFor: ['Developers moving toward AWS-focused platform work', 'Cloud engineers wanting deeper AWS specialization', 'DevOps and backend engineers expanding service-selection skill'],
      expectedOutcomes: ['Deploy real systems', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start AWS Interview Preparation',
      primaryTrackTo: '/interview-prep/aws',
      topicsCovered: ['Core AWS services', 'IAM and networking', 'High availability and recovery', 'Production incidents', 'Architecture decisions'],
      questionCount: 1900,
      scenarioCount: 170,
      architectureQuestionCount: 310,
      systemDesignQuestionCount: 150,
      linkedTracks: [
        { label: 'AWS Interview Prep', to: '/interview-prep/aws' },
      ],
    },
    careerInsights: {
      demand: 'AWS skills remain a hiring magnet because many organizations still standardize their cloud estate around AWS services and operational models.',
      careerGrowth: 'AWS-focused engineers often grow into platform, reliability, security, or cloud architecture roles because their service selection judgment compounds over time.',
      skillsNeeded: ['Service-selection judgment', 'IAM and network understanding', 'Architecture resilience thinking', 'Operational debugging', 'Delivery and automation awareness'],
      experienceExpectations: ['Junior: deploy and support workloads with guidance', 'Mid-level: own service choices for a project or environment', 'Senior: guide architecture, recovery, cost, and governance decisions'],
      typicalRoles: [
        { title: 'AWS Engineer', salaryRange: 'INR 9L - 22L', expectation: 'Deploy and support AWS-based systems with strong service fundamentals.' },
        { title: 'Senior AWS Engineer', salaryRange: 'INR 18L - 34L', expectation: 'Lead architecture choices, operations quality, and cloud reviews.' },
        { title: 'Cloud Architect', salaryRange: 'INR 28L - 48L', expectation: 'Define long-term platform strategy and multi-team cloud standards.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Core networking first', description: 'VPC and IAM decisions shape almost every later AWS choice.' },
          { label: 'Architecture after service basics', description: 'Trade-offs become meaningful once you understand service behavior.' },
          { label: 'Support scenarios throughout', description: 'Operational evidence turns knowledge into confidence.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'AWS learning path', description: 'Use the full AWS topic library for service depth.', to: '/technologies/aws' },
          { label: 'AWS interview prep', description: 'Practice cloud architecture and troubleshooting questions.', to: '/interview-prep/aws' },
          { label: 'Docker and Kubernetes tracks', description: 'Strengthen the delivery layer around AWS workloads.', to: '/technologies/docker' },
        ],
      },
    ]),
    phases: awsEngineerPhases,
  },
  {
    slug: 'azure-engineer',
    title: 'Azure Engineer Career Path',
    shortTitle: 'Azure Engineer',
    role: 'Azure Engineer',
    icon: '🔷',
    description: 'Become an Azure-focused engineer who can design reliable cloud workloads, support production systems, and explain platform trade-offs clearly.',
    summary: 'A practical route through Azure foundations, platform services, containers, architecture, and interview preparation.',
    technologies: [
      tech('Azure', '/technologies/azure', 'Azure fundamentals, compute, storage, networking, identity, AKS, DevOps, security, and architecture.'),
      tech('Docker', '/technologies/docker', 'Container skills that carry directly into Azure delivery workflows.'),
      tech('Kubernetes', '/technologies/kubernetes', 'Operational cluster skills relevant to Azure-based platform work.'),
    ],
    hours: '125+',
    duration: '4-6 Months',
    difficulty: 'Beginner to Intermediate',
    demand: 'Growing',
    salaryRange: 'INR 8L - 26L+',
    topicCount: 54,
    interviewQuestionCount: 1500,
    productionScenarioCount: 140,
    seoTitle: 'Azure Engineer Career Path | SplashRide',
    seoDescription: 'Explore the Azure engineer career path with cloud foundations, Azure platform direction, delivery skills, career insights, and interview preparation guidance.',
    profile: {
      whatYouWillLearn: ['How Azure-oriented cloud engineering work is structured', 'How Azure platform services, containers, delivery, and operations fit together', 'How to reason about reliability, governance, and supportability on Azure', 'How to position yourself for Azure-focused roles and interviews'],
      skillsYouWillGain: ['Cloud fundamentals', 'Azure platform awareness', 'Container delivery', 'Operational thinking', 'Career positioning'],
      whoThisPathIsFor: ['Developers targeting Azure-heavy organizations', 'Cloud engineers expanding into multi-cloud roles', 'DevOps engineers who want stronger Azure-aligned growth direction'],
      expectedOutcomes: ['Choose a target role', 'Understand learning order', 'Handle production issues', 'Prepare for interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start Azure Interview Preparation',
      primaryTrackTo: '/interview-prep/azure',
      topicsCovered: ['Cloud foundations', 'Networking and identity', 'Azure delivery and operations', 'Containers and orchestration', 'Architecture communication'],
      questionCount: 1500,
      scenarioCount: 140,
      architectureQuestionCount: 240,
      systemDesignQuestionCount: 110,
      linkedTracks: [
        { label: 'Azure Interview Prep', to: '/interview-prep/azure' },
        { label: 'Docker Interview Prep', to: '/interview-prep/docker' },
        { label: 'Kubernetes Interview Prep', to: '/interview-prep/kubernetes' },
      ],
    },
    careerInsights: {
      demand: 'Azure demand is strongest in enterprises, internal platforms, Microsoft-centered ecosystems, and teams with multi-cloud or identity-heavy environments.',
      careerGrowth: 'Azure-focused engineers often grow into cloud platform, DevOps, security, or enterprise architecture roles where identity and governance matter deeply.',
      skillsNeeded: ['Cloud networking and identity foundations', 'Release and operations discipline', 'Container and orchestration literacy', 'Governance awareness', 'Ability to learn vendor-specific services quickly'],
      experienceExpectations: ['Junior: support environments and cloud workflows', 'Mid-level: own delivery quality and service setup for teams', 'Senior: lead platform decisions, governance, and reliability conversations'],
      typicalRoles: [
        { title: 'Azure Engineer', salaryRange: 'INR 8L - 18L', expectation: 'Support platform setup, release workflows, and cloud operations.' },
        { title: 'Senior Azure Engineer', salaryRange: 'INR 15L - 28L', expectation: 'Lead service choices, deployment strategy, and reliability standards.' },
        { title: 'Cloud Platform Architect', salaryRange: 'INR 24L - 42L', expectation: 'Guide multi-team cloud direction, governance, and enterprise architecture.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Cloud first, vendor second', description: 'Strong platform fundamentals make Azure-specific concepts easier to absorb.' },
          { label: 'Build delivery skill in parallel', description: 'Container and release knowledge transfers directly into Azure platform work.' },
          { label: 'Pair platform and delivery skills', description: 'Azure, Docker, and Kubernetes together make the interview stories much stronger.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'Azure track', description: 'Use for Azure platform depth across architecture, identity, storage, networking, and operations.', to: '/technologies/azure' },
          { label: 'Docker learning path', description: 'Build container confidence for platform delivery.', to: '/technologies/docker' },
          { label: 'Kubernetes learning path', description: 'Strengthen orchestration and runtime operations skills.', to: '/technologies/kubernetes' },
        ],
      },
    ]),
    phases: azureEngineerPhases,
  },
];

export function getCareerRoadmap(slug: string | undefined) {
  return careerRoadmaps.find((roadmap) => roadmap.slug === slug) ?? null;
}

export function getCareerPathStats() {
  return {
    careerPaths: careerRoadmaps.length,
    learningTopics: careerRoadmaps.reduce((total, roadmap) => total + roadmap.topicCount, 0),
    interviewQuestions: careerRoadmaps.reduce((total, roadmap) => total + roadmap.interviewQuestionCount, 0),
    productionScenarios: careerRoadmaps.reduce((total, roadmap) => total + roadmap.productionScenarioCount, 0),
    technologiesCovered: new Set(
      careerRoadmaps.flatMap((roadmap) => roadmap.technologies.map((technology) => technology.label))
    ).size,
    learningHours: careerRoadmaps.reduce((total, roadmap) => total + Number.parseInt(roadmap.hours, 10), 0),
  };
}

export function getCareerPathRoutes() {
  return careerRoadmaps.map((roadmap) => `/career-paths/${roadmap.slug}`);
}

