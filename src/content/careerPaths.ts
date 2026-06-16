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
      { title: 'State and hooks', description: 'Manage local state, side effects, forms, and reusable logic without creating fragile code.' },
      { title: 'Routing and data flow', description: 'Understand route design, nested layouts, URL state, and API-driven UI workflows.' },
      { title: 'Testing and maintainability', description: 'Write tests that protect business behavior instead of implementation detail.' },
    ],
  },
  {
    id: 'frontend-nextjs',
    title: 'Production Frontend',
    subtitle: 'Add rendering strategy, performance, and deployment thinking.',
    duration: '4-5 Weeks',
    color: '#0891b2',
    topics: [
      { title: 'Next.js App Router', description: 'Learn layouts, loading boundaries, route handlers, and server components.', links: [{ label: 'Next.js Learning Path', to: '/technologies/nextjs' }] },
      { title: 'Rendering choices', description: 'Decide between SSR, SSG, ISR, CSR, and streaming based on real constraints.' },
      { title: 'Performance engineering', description: 'Tune bundle size, caching, lazy loading, and Core Web Vitals behavior.' },
      { title: 'Deployment and monitoring', description: 'Handle environment setup, production failures, and post-release verification.' },
    ],
  },
  {
    id: 'frontend-interview',
    title: 'Architecture and Interview Prep',
    subtitle: 'Translate implementation skill into senior-level communication.',
    duration: '3-4 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Frontend architecture', description: 'Reason about state ownership, design systems, API contracts, and long-term maintainability.' },
      { title: 'Production scenarios', description: 'Debug hydration issues, re-render loops, slow experiences, and release regressions.' },
      { title: 'Interview preparation', description: 'Practice React, Next.js, performance, accessibility, and architecture questions.', links: [{ label: 'React Interview Prep', to: '/interview-prep/react' }, { label: 'Next.js Interview Prep', to: '/interview-prep/nextjs' }] },
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
    id: 'aem-foundation',
    title: 'Foundation',
    subtitle: 'Build the web and Java basics AEM depends on.',
    duration: '2-3 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'HTML and content structure', description: 'Understand semantic markup, authoring implications, and component-ready content structure.' },
      { title: 'CSS and client-side behavior', description: 'Handle responsive styling, client libraries, and browser-facing issues.' },
      { title: 'Java basics for AEM', description: 'Learn services, OOP, collections, exceptions, and clean backend thinking.' },
      { title: 'Environment awareness', description: 'Understand how local, dev, stage, and production environments differ.' },
    ],
  },
  {
    id: 'aem-core',
    title: 'AEM Fundamentals',
    subtitle: 'Understand how content and requests move through the platform.',
    duration: '3-4 Weeks',
    color: '#f97316',
    topics: [
      { title: 'JCR and repository modeling', description: 'Learn nodes, properties, versioning, and content structure thinking.', links: [{ label: 'AEM Learning Path', to: '/technologies/aem' }] },
      { title: 'Sling and request resolution', description: 'Trace how requests resolve to resources, models, scripts, and output.' },
      { title: 'HTL and secure rendering', description: 'Build templated rendering with context-aware safety and maintainability.' },
      { title: 'OSGi services and configuration', description: 'Create reusable services and understand runtime configuration behavior.' },
    ],
  },
  {
    id: 'aem-development',
    title: 'Development',
    subtitle: 'Build the authoring and rendering skills used on real AEM teams.',
    duration: '3-4 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Components and dialogs', description: 'Create author-friendly components with reliable rendering behavior.', links: [{ label: 'AEM Components Topic', to: '/technologies/aem/topic/components' }] },
      { title: 'Templates and policies', description: 'Model editable templates, governance, and reusable authoring rules.' },
      { title: 'Content and experience fragments', description: 'Support structured content, reuse, and headless delivery patterns.' },
      { title: 'Testing and debugging', description: 'Troubleshoot rendering issues, repository problems, and local environment drift.' },
    ],
  },
  {
    id: 'aem-advanced',
    title: 'Advanced AEM',
    subtitle: 'Prepare for production scale, delivery, and architecture decisions.',
    duration: '4-5 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Dispatcher and caching', description: 'Control cache behavior, invalidation, filters, and headers.', links: [{ label: 'Dispatcher Topic', to: '/technologies/aem/topic/dispatcher' }] },
      { title: 'Cloud Service and pipelines', description: 'Learn Cloud Manager, immutable deployments, environments, and release guardrails.' },
      { title: 'GraphQL and headless delivery', description: 'Use content APIs responsibly with caching and modeling discipline.' },
      { title: 'Performance and security', description: 'Think about query efficiency, permissions, client libraries, and production safety.' },
    ],
  },
  {
    id: 'aem-architecture',
    title: 'Architecture',
    subtitle: 'Think like a senior engineer, lead, or architect.',
    duration: '2-3 Weeks',
    color: '#ef476f',
    topics: [
      { title: 'Platform architecture', description: 'Understand author, publish, dispatcher, CDN, and Cloud Manager as one delivery system.' },
      { title: 'Production support', description: 'Handle cache misses, replication issues, deployment failures, and performance incidents.' },
      { title: 'CI/CD and governance', description: 'Use quality gates, deployment rules, and enterprise standards to reduce risk.' },
      { title: 'Interview and scenario prep', description: 'Practice AEM architecture, troubleshooting, and migration conversations.', links: [{ label: 'AEM Interview Prep', to: '/interview-prep/aem' }] },
    ],
  },
  {
    id: 'aem-interview',
    title: 'Interview Preparation',
    subtitle: 'Turn production understanding into clear, job-winning answers.',
    duration: '2-3 Weeks',
    color: '#16a34a',
    topics: [
      { title: 'Developer rounds', description: 'Cover components, Sling Models, HTL, JCR, OSGi, and debugging.' },
      { title: 'Senior and lead rounds', description: 'Explain caching, environments, pipelines, security, and governance.' },
      { title: 'System design and migration', description: 'Discuss multi-site, headless, Cloud Service, and enterprise implementation patterns.' },
    ],
  },
];

const contentfulPhases: CareerPathPhase[] = [
  {
    id: 'contentful-foundation',
    title: 'Foundation',
    subtitle: 'Understand headless CMS thinking before going deep into implementation.',
    duration: '2-3 Weeks',
    color: '#2563eb',
    topics: [
      { title: 'Headless CMS basics', description: 'Learn how Contentful separates content modeling from frontend presentation and why that changes delivery workflows.' },
      { title: 'Structured content thinking', description: 'Understand entries, assets, references, field types, and how editors work with reusable content.' },
      { title: 'Frontend awareness', description: 'Build enough React and Next.js awareness to understand how Contentful content is actually consumed in applications.', links: [{ label: 'React Learning Path', to: '/technologies/react' }, { label: 'Next.js Learning Path', to: '/technologies/nextjs' }] },
      { title: 'Environment discipline', description: 'Learn why preview, draft, and production boundaries matter in CMS-driven products.' },
    ],
  },
  {
    id: 'contentful-modeling',
    title: 'Content Modeling',
    subtitle: 'Turn CMS familiarity into strong schema and editorial design skill.',
    duration: '3-4 Weeks',
    color: '#7c3aed',
    topics: [
      { title: 'Content types and fields', description: 'Model reusable business entities instead of page-specific one-off structures.', links: [{ label: 'Contentful Learning Path', to: '/technologies/contentful' }] },
      { title: 'References and relationships', description: 'Design reusable links between entries and assets without creating frontend confusion.' },
      { title: 'Validations and governance', description: 'Protect content quality through field validations, naming discipline, and editor-safe constraints.' },
      { title: 'Rich text and modular content', description: 'Balance editorial flexibility with stable frontend rendering rules.' },
    ],
  },
  {
    id: 'contentful-api-integration',
    title: 'API Integration and Delivery',
    subtitle: 'Learn how Contentful content flows into real frontend and backend systems.',
    duration: '4-5 Weeks',
    color: '#0891b2',
    topics: [
      { title: 'Delivery and Preview APIs', description: 'Use published versus draft content correctly and understand why those paths must stay separate.' },
      { title: 'React and Next.js integration', description: 'Fetch content cleanly, map it to components, and keep rendering contracts stable.', links: [{ label: 'Contentful with React Topic', to: '/technologies/contentful/topic/contentful-react' }, { label: 'Contentful with Next.js Topic', to: '/technologies/contentful/topic/contentful-nextjs' }] },
      { title: 'Asset and media handling', description: 'Use asset metadata, responsive delivery, and frontend fallbacks to keep media reliable and fast.' },
      { title: 'Preview and publishing workflow', description: 'Build editor trust through realistic previews, safe publishing, and release-aware delivery flows.' },
    ],
  },
  {
    id: 'contentful-production',
    title: 'Production and Platform Operations',
    subtitle: 'Prepare for the issues senior CMS developers solve after launch.',
    duration: '4-5 Weeks',
    color: '#f97316',
    topics: [
      { title: 'Webhooks and automation', description: 'Trigger targeted cache refreshes, revalidation flows, and downstream updates safely.' },
      { title: 'Localization and global delivery', description: 'Handle locale strategy, slug behavior, fallback rules, and multilingual content operations.' },
      { title: 'Caching and content freshness', description: 'Explain why published content can go stale and how to design predictable revalidation.', links: [{ label: 'Caching Strategy Topic', to: '/technologies/contentful/topic/contentful-caching-strategy' }] },
      { title: 'Migration strategy and schema evolution', description: 'Treat content-model changes like production releases with tested migration discipline.' },
    ],
  },
  {
    id: 'contentful-career-growth',
    title: 'Career Growth and Interview Prep',
    subtitle: 'Move from CMS implementation into senior platform and architecture thinking.',
    duration: '2-3 Weeks',
    color: '#16a34a',
    topics: [
      { title: 'Projects to build', description: 'Create a multi-section marketing site, a blog with preview, a localized article platform, and a webhook-driven revalidation flow.' },
      { title: 'Interview preparation', description: 'Practice Contentful fundamentals, content modeling, API integration, localization, publishing, and architecture conversations.', links: [{ label: 'Contentful Interview Prep', to: '/interview-prep/contentful' }] },
      { title: 'Senior CMS developer path', description: 'Strengthen production support, schema governance, frontend collaboration, and release-discipline communication.' },
      { title: 'CMS architect path', description: 'Learn to govern shared content platforms across multiple teams, locales, channels, and frontend applications.' },
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
      tech('React', '/technologies/react', 'Component architecture, hooks, routing, forms, performance, and production patterns.'),
      tech('Next.js', '/technologies/nextjs', 'Rendering strategy, App Router, server components, deployment, and performance.'),
    ],
    hours: '120+',
    duration: '4-6 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'High',
    salaryRange: 'INR 6L - 25L+',
    topicCount: 58,
    interviewQuestionCount: 1800,
    productionScenarioCount: 140,
    seoTitle: 'Frontend Engineer Career Path | SplashRide',
    seoDescription: 'Follow a structured frontend engineer career path covering HTML, CSS, JavaScript, TypeScript, React, Next.js, performance, architecture, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How modern frontend applications are structured and shipped', 'How routing, state, rendering, and APIs work together', 'How to debug performance, accessibility, and production issues', 'How senior frontend engineers explain architecture trade-offs'],
      skillsYouWillGain: ['Component design', 'React and Next.js delivery', 'Performance tuning', 'Accessibility awareness', 'Deployment verification'],
      whoThisPathIsFor: ['Beginners targeting frontend roles', 'React developers who want stronger production instincts', 'Developers preparing for frontend and full-stack interviews'],
      expectedOutcomes: ['Build production interfaces', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start React Interview Preparation',
      primaryTrackTo: '/interview-prep/react',
      topicsCovered: ['React fundamentals', 'Hooks and state', 'Routing and data flow', 'Performance and debugging', 'Next.js architecture'],
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
      demand: 'Frontend roles remain one of the fastest entry points into product engineering, but companies increasingly expect stronger performance, accessibility, and architecture judgment.',
      careerGrowth: 'Developers typically grow from UI implementation into ownership of design systems, performance, product surfaces, and eventually frontend platform or staff-level responsibilities.',
      skillsNeeded: ['Strong JavaScript and TypeScript fundamentals', 'React component architecture', 'Rendering and routing knowledge', 'Performance debugging', 'Clear communication with design and backend teams'],
      experienceExpectations: ['Junior: component implementation and bug fixing', 'Mid-level: end-to-end feature ownership and API integration', 'Senior: architecture decisions, mentoring, performance, and production triage'],
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
          { label: 'React topic library', description: 'Use the full React learning path for deeper practice.', to: '/technologies/react' },
          { label: 'Next.js topic library', description: 'Use the Next.js learning path for rendering and deployment depth.', to: '/technologies/nextjs' },
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
      tech('Core Java', '/technologies/java', 'Language fundamentals, collections, concurrency, JVM behavior, and senior-level Java thinking.'),
      tech('Spring Boot', '/technologies/springboot', 'Dependency injection, APIs, security, data, observability, and microservices.'),
      tech('AWS', '/technologies/aws', 'Cloud deployment, networking, storage, and operational infrastructure.'),
      tech('Docker', '/technologies/docker', 'Container packaging and runtime behavior for backend delivery.'),
    ],
    hours: '145+',
    duration: '5-7 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'Very High',
    salaryRange: 'INR 8L - 28L+',
    topicCount: 64,
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
      topicsCovered: ['Core Java fundamentals', 'Spring Boot APIs', 'Security and microservices', 'Production support scenarios', 'Architecture and scaling questions'],
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
          { label: 'Core Java topic library', description: 'Use the Java learning path for language depth.', to: '/technologies/java' },
          { label: 'Spring Boot topic library', description: 'Use the Spring Boot path for API, security, and production depth.', to: '/technologies/springboot' },
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
      tech('Core Java', '/technologies/java', 'Language depth, concurrency, and debugging confidence.'),
      tech('Spring Boot', '/technologies/springboot', 'API design, security, data, and production backend delivery.'),
      tech('AWS', '/technologies/aws', 'Cloud deployment and operational foundations.'),
      tech('Docker', '/technologies/docker', 'Containerized local development and release packaging.'),
    ],
    hours: '170+',
    duration: '6-8 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'Very High',
    salaryRange: 'INR 8L - 30L+',
    topicCount: 76,
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
    ],
    hours: '135+',
    duration: '5-6 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'High',
    salaryRange: 'INR 7L - 20L+',
    topicCount: 72,
    interviewQuestionCount: 2400,
    productionScenarioCount: 230,
    seoTitle: 'AEM Developer Career Path | SplashRide',
    seoDescription: 'Learn AEM step by step with a career path covering Sling, HTL, components, dispatcher, Cloud Service, architecture, troubleshooting, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How AEM content, requests, and rendering work together', 'How to build reusable components, templates, and content models', 'How to handle dispatcher, Cloud Service, and production issues', 'How to explain AEM architecture and enterprise trade-offs in interviews'],
      skillsYouWillGain: ['AEM development', 'Repository modeling', 'Dispatcher troubleshooting', 'Cloud Service delivery', 'Enterprise architecture communication'],
      whoThisPathIsFor: ['Beginners entering AEM development', 'Java developers moving into Adobe Experience Manager work', 'AEM engineers preparing for senior and lead interviews'],
      expectedOutcomes: ['Build production applications', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start AEM Interview Preparation',
      primaryTrackTo: '/interview-prep/aem',
      topicsCovered: ['Components and Sling Models', 'JCR, HTL, and OSGi', 'Dispatcher and caching', 'Cloud Service and CI/CD', 'Architecture and troubleshooting'],
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
      skillsNeeded: ['AEM component and repository knowledge', 'Strong debugging across author, publish, and dispatcher layers', 'Cloud Service deployment awareness', 'Enterprise communication and governance thinking', 'Clear understanding of performance and security trade-offs'],
      experienceExpectations: ['Junior: build and support components under guidance', 'Mid-level: own authoring features, integrations, and release quality', 'Senior: lead architecture, environment strategy, and production troubleshooting'],
      typicalRoles: [
        { title: 'AEM Developer', salaryRange: 'INR 7L - 20L', expectation: 'Build components, templates, and integrations with reliable authoring behavior.' },
        { title: 'Senior AEM Developer', salaryRange: 'INR 15L - 30L', expectation: 'Lead implementation quality, mentoring, troubleshooting, and architecture reviews.' },
        { title: 'AEM Architect', salaryRange: 'INR 25L - 50L', expectation: 'Own platform strategy, scalability, governance, and enterprise design decisions.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Repository before components', description: 'AEM implementation gets easier once content structure and Sling behavior are clear.' },
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
    hours: '110+',
    duration: '4-5 Months',
    difficulty: 'Beginner to Advanced',
    demand: 'Growing',
    salaryRange: 'INR 7L - 24L+',
    topicCount: 48,
    interviewQuestionCount: 44,
    productionScenarioCount: 4,
    seoTitle: 'Contentful Developer Career Path | SplashRide',
    seoDescription: 'Follow the Contentful developer career path with content modeling, delivery APIs, preview, localization, frontend integration, production best practices, and interview preparation.',
    profile: {
      whatYouWillLearn: ['How to design clean Contentful content models that scale across teams and channels', 'How to integrate Contentful with React and Next.js safely', 'How preview, publishing, localization, webhooks, and caching work in production', 'How to grow toward senior CMS developer and CMS architect responsibilities'],
      skillsYouWillGain: ['Content modeling', 'API integration', 'Rich text and asset rendering', 'Publishing workflow design', 'Production CMS troubleshooting'],
      whoThisPathIsFor: ['Developers moving into headless CMS work', 'Frontend engineers adding structured content-platform depth', 'CMS developers preparing for senior, lead, or architect-style interviews'],
      expectedOutcomes: ['Build real CMS-driven applications', 'Understand architecture decisions', 'Handle production issues', 'Crack technical interviews', 'Become job ready'],
    },
    interviewPrep: {
      primaryTrackLabel: 'Start Contentful Interview Preparation',
      primaryTrackTo: '/interview-prep/contentful',
      topicsCovered: ['Content modeling', 'Delivery and Preview APIs', 'Publishing workflows', 'Localization and assets', 'Production and architecture questions'],
      questionCount: 44,
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
      skillsNeeded: ['Strong content modeling judgment', 'Frontend integration awareness', 'Preview and publishing discipline', 'Localization and asset handling', 'Ability to explain trade-offs across editors and engineers'],
      experienceExpectations: ['Junior: support content entries, rendering, and safe model updates', 'Mid-level: own feature-level schema design and frontend integration', 'Senior: lead migrations, governance, troubleshooting, and platform standards'],
      typicalRoles: [
        { title: 'Contentful Developer', salaryRange: 'INR 7L - 16L', expectation: 'Implement content models, API integrations, previews, and CMS-driven features.' },
        { title: 'Senior CMS Developer', salaryRange: 'INR 14L - 26L', expectation: 'Lead model quality, production support, localization, and multi-team content delivery.' },
        { title: 'CMS Architect', salaryRange: 'INR 24L - 40L', expectation: 'Define platform governance, schema evolution, and multi-channel CMS strategy.' },
      ],
    },
    resources: resources([
      {
        title: 'Recommended Learning Order',
        items: [
          { label: 'Model before code', description: 'Strong schemas make every later frontend and publishing decision easier.' },
          { label: 'Preview before publish', description: 'Editorial trust grows when draft, publish, and cache behavior are understood early.' },
          { label: 'Production support throughout', description: 'Content platforms become senior-level work when you can troubleshoot them calmly after launch.' },
        ],
      },
      {
        title: 'Reference Materials',
        items: [
          { label: 'Contentful learning path', description: 'Use for modeling, APIs, preview, localization, migrations, and production best practices.', to: '/technologies/contentful' },
          { label: 'Contentful interview prep', description: 'Practice realistic CMS, delivery, and architecture questions.', to: '/interview-prep/contentful' },
          { label: 'React and Next.js learning paths', description: 'Strengthen the frontend integration side of headless CMS delivery.', to: '/technologies/react' },
        ],
      },
    ]),
    phases: contentfulPhases,
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

