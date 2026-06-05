import type { InterviewPrepQuestion, InterviewPrepSection } from './types';
import { aemCoverageGapQuestionSeeds } from './aemCoverageGapExpansion';
import { aemEnterpriseQuestionSeeds } from './aemEnterpriseExpansion';

type InterviewPrepQuestionDraft = Omit<
  InterviewPrepQuestion,
  'frequencyScore' | 'commonWrongAnswer' | 'architectPerspective' | 'keyTakeaway'
> & Partial<Pick<
  InterviewPrepQuestion,
  'frequencyScore' | 'commonWrongAnswer' | 'architectPerspective' | 'keyTakeaway'
>>;

export const aemInterviewCategories = [
  'AEM Architecture',
  'JCR',
  'CRXDE',
  'Components',
  'Templates',
  'Editable Templates',
  'Sling',
  'Sling Models',
  'HTL',
  'Client Libraries',
  'OSGi',
  'Resource Resolver',
  'AdaptTo Pattern',
  'Content Fragments',
  'Experience Fragments',
  'MSM',
  'Workflows',
  'Dispatcher',
  'Query Builder',
  'JCR SQL2',
  'Security',
  'Service Users',
  'Performance Tuning',
  'AEM Cloud Service',
  'Cloud Manager',
  'GraphQL',
  'Edge Delivery Services',
  'Migration Scenarios',
  'Troubleshooting',
  'Publishing Issues',
  'Replication Issues',
  'Cache Issues',
  'Deployment Issues',
  'Production Support',
  'Multi-site Design',
  'Content Architecture',
  'Cloud Migration',
  'Enterprise Governance',
  'Content Policies',
  'Replication',
  'Launches',
  'Translation',
  'DAM',
  'Assets',
  'Dispatcher Caching',
  'Apache Configuration',
  'CDN',
  'SEO in AEM',
  'Accessibility',
  'Testing',
  'Integration Patterns',
  'Headless AEM',
  'Multi Site Manager',
  'Multi Brand Architecture',
  'Multi Region Architecture',
  'Migration',
  'Upgrade Projects',
  'Monitoring',
  'Logging',
  'Governance',
];

export const aemInterviewQuestionTypes = [
  'Conceptual Questions',
  'Practical Questions',
  'Scenario-Based Questions',
  'Production Issues',
  'Production Support Questions',
  'Troubleshooting Questions',
  'Debugging Questions',
  'Real Incident Questions',
  'Performance Questions',
  'Security Questions',
  'Architecture Questions',
  'Cloud Service Questions',
  'Migration Questions',
];

const baseQuestions: InterviewPrepQuestionDraft[] = [
  {
    id: 'aem-architecture-author-publish-dispatcher',
    technologyId: 'aem',
    topicGroup: 'Fundamentals',
    category: 'AEM Architecture',
    questionType: 'Architecture Questions',
    question: 'Explain the Author, Publish, Dispatcher, and CDN architecture in AEM. Why is it designed this way?',
    shortAnswer: 'AEM separates content authoring from content delivery. Author is for internal content creation, Publish serves approved content, Dispatcher caches and filters requests, and CDN handles global edge delivery.',
    detailedAnswer: [
      'AEM is designed around separation of duties. Author is not a public website. It is where editors create, review, translate, and publish content.',
      'Publish is the delivery tier. It receives approved content and renders pages for end users. In traditional AEM there can be multiple publish instances behind load balancing. In AEM as a Cloud Service, Adobe manages this scaling.',
      'Dispatcher sits in front of Publish as an Apache module. It is both a cache and a security filter. A healthy AEM implementation makes most anonymous traffic hit CDN or Dispatcher, not Publish.',
      'CDN sits at the edge and should be treated as part of the architecture, especially in Cloud Service. Cache-Control, invalidation, and URL design determine how scalable the site really is.',
    ],
    realProjectExample: 'On a banking site, campaign pages were authored on Author, approved by compliance, published to Publish, cached by Dispatcher, and served through CDN. The team separated secure logged-in journeys from cacheable marketing pages.',
    productionScenario: 'A page is published but users still see old content. A senior answer checks publish status, referenced assets or fragments, Dispatcher invalidation, CDN TTL, and whether the request is hitting the expected vhost.',
    commonMistakes: [
      'Saying Dispatcher is only a cache and forgetting its security filter role.',
      'Exposing Author or author-only endpoints publicly.',
      'Ignoring CDN behavior when troubleshooting stale content.',
      'Assuming AEM Cloud Service behaves exactly like manually managed AEM 6.5 infrastructure.',
    ],
    followUpQuestions: [
      'What happens during activation?',
      'How would you debug stale content?',
      'What should never be allowed through Dispatcher?',
      'How does AEM as a Cloud Service change operations?',
    ],
    interviewerExpectation: 'The interviewer wants to see if you understand real delivery architecture, not just definitions. Strong candidates talk about cache layers, security, publishing flow, and support diagnostics.',
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['dispatcher', 'aem-cloud-service', 'workflows'],
    isMostAsked: true,
    mostAskedRank: 1,
    isRapidRevision: true,
    roleAnswers: {
      junior: 'AEM has Author for editing and Publish for live content. Dispatcher caches pages.',
      mid: 'Author is internal, Publish serves live pages, Dispatcher caches and blocks sensitive URLs, and CDN improves global delivery. Content is published from Author to Publish.',
      senior: 'I design the stack so anonymous traffic is handled by CDN and Dispatcher, Publish is protected, Author is never public, and invalidation is predictable. I also separate cacheable pages from personalized flows.',
      architect: 'I explain it as an operating model: authoring governance, delivery resilience, edge caching, security filtering, observability, and release discipline. The design should minimize origin load and make incidents diagnosable.',
    },
  },
  {
    id: 'aem-jcr-apps-content-conf-libs',
    technologyId: 'aem',
    topicGroup: 'Fundamentals',
    category: 'JCR',
    questionType: 'Conceptual Questions',
    question: 'What is the difference between /apps, /content, /conf, and /libs in AEM, especially in Cloud Service?',
    shortAnswer: '/libs contains Adobe product code, /apps contains project code, /content contains authored content and DAM assets, and /conf contains site configuration such as editable templates and policies.',
    detailedAnswer: [
      '/libs is Adobe-owned and should not be modified. Customizations should extend or overlay carefully, but direct changes are an upgrade risk.',
      '/apps contains project components, templates, clientlibs, servlets, and OSGi configuration deployed as code.',
      '/content stores pages, DAM assets, Experience Fragments, and Content Fragments. It is author-managed content.',
      '/conf stores editable templates, policies, context-aware configuration, and site-level settings. It is configuration, but it often moves with content governance rather than code-only governance.',
      'In AEM as a Cloud Service, immutable areas like /apps and /libs are deployed through Cloud Manager. Runtime edits are not the support strategy.',
    ],
    realProjectExample: 'A retail project kept component code in /apps, page templates and policies in /conf, campaign pages in /content, and reused Adobe Core Components from /libs through resourceSuperType.',
    productionScenario: 'After deployment, authors cannot add a component. The issue is often not the component code but the /conf policy not promoted or published correctly.',
    commonMistakes: [
      'Editing /libs directly.',
      'Treating /conf as unimportant content and forgetting to promote it.',
      'Putting authored content under /apps.',
      'Making manual production fixes in repository paths that should be pipeline-controlled.',
    ],
    followUpQuestions: [
      'Where are editable templates stored?',
      'Where should OSGi config live?',
      'Why is /libs read-only from a governance perspective?',
      'How do Cloud Service deployments affect /apps?',
    ],
    interviewerExpectation: 'They are checking whether you know how AEM is organized and whether you can avoid deployment, upgrade, and governance mistakes.',
    difficultyLevel: 'Beginner',
    experienceLevel: 'beginner',
    relatedTopics: ['jcr', 'editable-templates', 'aem-cloud-service'],
    isMostAsked: true,
    mostAskedRank: 8,
    isRapidRevision: true,
    roleAnswers: {
      junior: '/apps is code, /content is pages, /libs is Adobe code, and /conf is configuration.',
      mid: 'I would add that /conf has editable templates and policies, and missing /conf promotion can break authoring even when /apps is fine.',
      senior: 'I separate code, content, and configuration ownership. /apps changes go through CI/CD, /conf changes need governance, and /libs is extended, not modified.',
      architect: 'I map these paths to release management. /apps is immutable code, /conf is governed configuration, /content is business-owned content, and /libs is vendor-owned. That prevents hotfix drift and upgrade pain.',
    },
  },
  {
    id: 'aem-components-core-components',
    technologyId: 'aem',
    topicGroup: 'Development',
    category: 'Components',
    questionType: 'Scenario-Based Questions',
    question: 'How do you design a custom AEM component for an enterprise project?',
    shortAnswer: 'Start from Core Components where possible, define author needs, build a clean dialog, use HTL for rendering, Sling Models for logic, policies for governance, and test authoring, publish, cache, and accessibility behavior.',
    detailedAnswer: [
      'A component is not just HTL. It includes the component node, dialog, Sling Model, clientlibs, policies, authoring behavior, accessibility, analytics hooks, and cache behavior.',
      'Enterprise teams should extend Core Components through resourceSuperType or delegation instead of copying Adobe code. This keeps upgrades manageable.',
      'The dialog should expose only business-safe options. Too many style or layout fields create inconsistent pages.',
      'A senior implementation validates empty states, missing assets, invalid links, translation, publish behavior, and how the component behaves behind Dispatcher and CDN.',
    ],
    realProjectExample: 'For a product card component, the team extended Core Image, added SKU and CTA fields, delegated image behavior to Core Components, and used a Sling Model to normalize product URLs and analytics attributes.',
    productionScenario: 'A component works on Author but renders blank on Publish. Check bundle activation, missing OSGi configs, template policy, clientlib category, and whether the model depends on author-only services.',
    commonMistakes: [
      'Building from scratch instead of extending Core Components.',
      'Putting business logic directly in HTL.',
      'Creating author dialogs with too many design choices.',
      'Forgetting cache and personalization impact.',
    ],
    followUpQuestions: [
      'When do you use Sling Model delegation?',
      'How do you test components?',
      'How do policies affect component availability?',
      'How do you handle empty author states?',
    ],
    interviewerExpectation: 'They want to know whether you build maintainable author-friendly components, not just whether you can create dialog XML.',
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['components', 'sling-models', 'htl', 'editable-templates'],
    isMostAsked: true,
    mostAskedRank: 2,
    isRapidRevision: true,
    roleAnswers: {
      junior: 'I create dialog fields, write HTL, and read properties.',
      mid: 'I use a Sling Model, keep HTL clean, add clientlibs, and configure allowed components in the template policy.',
      senior: 'I extend Core Components, test model behavior, empty states, publish behavior, accessibility, analytics, and cache safety.',
      architect: 'I define component governance: reusable Core-based design, policy-driven variation, author guardrails, upgrade compatibility, and delivery patterns for both page-based and headless use.',
    },
  },
  {
    id: 'aem-editable-templates-policies',
    technologyId: 'aem',
    topicGroup: 'Development',
    category: 'Editable Templates',
    questionType: 'Conceptual Questions',
    question: 'Explain Editable Templates, Template Types, and policies. Why are they important in enterprise AEM?',
    shortAnswer: 'Editable Templates let template authors assemble page structures in /conf. Template Types provide the base structure, and policies govern allowed components and design options.',
    detailedAnswer: [
      'Editable Templates replaced static templates for most modern projects because they let trained template authors manage page structures without developer deployments for every template change.',
      'A Template Type is the base definition created by developers. A Template is created from that type by template authors.',
      'Policies are critical. They control allowed components, responsive behavior, styles, and default component settings.',
      'In enterprise projects, policies are governance tools. A shared policy change can affect many templates, so it should be reviewed like a production-impacting change.',
    ],
    realProjectExample: 'A healthcare site used one base page component, separate article/product/campaign templates, and policies that restricted medical disclaimer components to regulated page templates.',
    productionScenario: 'Authors report that a component disappeared from the picker. The root cause is often a policy change in /conf, not a component deployment issue.',
    commonMistakes: [
      'Confusing Template Type with Template.',
      'Changing shared policies without impact analysis.',
      'Giving too many users template-author permissions.',
      'Using static templates for new projects without a strong reason.',
    ],
    followUpQuestions: [
      'Where are editable templates stored?',
      'How do policies control authoring?',
      'How do you move templates between environments?',
      'What is Structure vs Initial Content?',
    ],
    interviewerExpectation: 'They evaluate whether you understand authoring governance and the separation between code, configuration, and content operations.',
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['templates', 'editable-templates', 'components'],
    isMostAsked: true,
    mostAskedRank: 10,
    roleAnswers: {
      junior: 'Editable templates are templates authors can edit in AEM.',
      mid: 'They are stored under /conf and use policies to control allowed components and styles.',
      senior: 'I design template types in code, manage templates and policies through governed /conf promotion, and avoid shared policy blast radius.',
      architect: 'I use templates as the governance layer between design system, author freedom, compliance, and operational stability. Template ownership and approval flow matter as much as the code.',
    },
  },
  {
    id: 'aem-sling-resource-resolution',
    technologyId: 'aem',
    topicGroup: 'Development',
    category: 'Sling',
    questionType: 'Conceptual Questions',
    question: 'How does Sling resolve a request in AEM?',
    shortAnswer: 'Sling maps a URL to a resource, decomposes selectors/extension/suffix, reads sling:resourceType, and finds the rendering script through script resolution and resourceSuperType inheritance.',
    detailedAnswer: [
      'Sling is resource-oriented. The URL usually points to a content resource rather than a controller route.',
      'A request such as /content/site/en/home.print.html has a resource path, selector, extension, and optional suffix.',
      'After resolving the resource, Sling reads sling:resourceType and looks for a matching script under /apps or inherited resource types.',
      'This model powers component rendering, alternate selectors, servlets by resource type, and Core Component inheritance.',
    ],
    realProjectExample: 'A print selector was added for article pages. The same page resource rendered normal HTML by default and print-friendly HTML when the print selector was present.',
    productionScenario: 'A page returns 404. Check whether the content path exists, resource mapping rules, permissions, extension filtering, and Dispatcher rewrite rules before blaming the component.',
    commonMistakes: [
      'Thinking AEM routes work like Spring MVC controllers.',
      'Registering servlets by path instead of resource type.',
      'Ignoring selectors and suffix validation.',
      'Copying parent component scripts instead of using resourceSuperType.',
    ],
    followUpQuestions: [
      'What are selectors?',
      'What is sling:resourceSuperType?',
      'How does a resource type servlet work?',
      'How can selectors become a security risk?',
    ],
    interviewerExpectation: 'They want confidence that you understand AEM request processing deeply enough to debug rendering and routing issues.',
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['sling', 'components', 'dispatcher'],
    isMostAsked: true,
    mostAskedRank: 7,
    roleAnswers: {
      junior: 'Sling resolves the URL to a resource and renders it using the component.',
      mid: 'Sling decomposes the URL, resolves the resource, reads resourceType, and finds an HTL script.',
      senior: 'I also consider selectors, suffixes, servlet registration, resourceSuperType inheritance, permissions, and Dispatcher rewrites when debugging request flow.',
      architect: 'I use Sling resolution to design stable URL contracts, secure servlet patterns, content-driven rendering, and upgrade-friendly component inheritance.',
    },
  },
  {
    id: 'aem-sling-model-blank-component',
    technologyId: 'aem',
    topicGroup: 'Development',
    category: 'Sling Models',
    questionType: 'Debugging Questions',
    question: 'A component is blank on Publish but works on Author. How do you debug it?',
    shortAnswer: 'Check error logs, bundle state, model registration, resourceType, missing OSGi configs, author-only dependencies, permissions, and cache behavior.',
    detailedAnswer: [
      'Start with error.log on Publish. Blank output often means the Sling Model failed to instantiate or HTL failed during rendering.',
      'Check whether the bundle is Active, required packages are resolved, and the model package is exported or scanned correctly.',
      'Compare Author and Publish OSGi configurations. A service may exist on Author but not Publish, or the model may call an author-only API.',
      'Verify the content node has the expected sling:resourceType and properties. Also check template policy and clientlibs if the component appears missing rather than failed.',
    ],
    realProjectExample: 'A news listing component called an internal author endpoint from its model. It worked on Author but failed on Publish. The fix was an OSGi service with publish-safe API config, timeout, fallback, and tests.',
    productionScenario: 'After a release, several pages have blank cards. A senior developer rolls back only if needed, but first checks logs, bundle state, OSGi config, model adaptation, and whether the issue is cached.',
    commonMistakes: [
      'Debugging only in CRXDE and ignoring Publish logs.',
      'Using REQUIRED injection for optional dialog fields.',
      'Calling external APIs in @PostConstruct without fallback.',
      'Assuming Author and Publish have identical service configs.',
    ],
    followUpQuestions: [
      'What does DefaultInjectionStrategy.OPTIONAL do?',
      'How do you unit test Sling Models?',
      'Why should models be thin?',
      'How do you handle external API failures?',
    ],
    interviewerExpectation: 'They want a production troubleshooting sequence, not just "check the model".',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['sling-models', 'osgi', 'production-support'],
    isMostAsked: true,
    mostAskedRank: 3,
    isRapidRevision: true,
    scenarioIds: ['blank-component-on-publish'],
    roleAnswers: {
      junior: 'I check the dialog values and the Sling Model.',
      mid: 'I check error.log, bundle state, resourceType, and OSGi service injection.',
      senior: 'I compare Author vs Publish configs, check model adaptation, service availability, permissions, external timeouts, and cache state before deciding rollback.',
      architect: 'I look for systemic risk: model design doing runtime integration, weak fallbacks, missing automated tests, and lack of release validation across Author and Publish.',
    },
  },
  {
    id: 'aem-htl-security-contexts',
    technologyId: 'aem',
    topicGroup: 'Development',
    category: 'HTL',
    questionType: 'Security Questions',
    question: 'Why is HTL considered secure by default, and when can it still become unsafe?',
    shortAnswer: 'HTL escapes output based on context, which reduces XSS risk. It becomes unsafe when developers bypass context handling, use unsafe/raw HTML carelessly, or render untrusted content.',
    detailedAnswer: [
      'HTL automatically applies context-aware escaping for text, attributes, URLs, and scripts. This is why it replaced JSP for most component rendering.',
      'Developers can still create vulnerabilities by using unsafe contexts, rendering rich text from untrusted sources, or placing values in JavaScript/CSS contexts incorrectly.',
      'The right pattern is to keep logic in Sling Models, sanitize or constrain rich text, use explicit URI context for URLs, and avoid exposing raw HTML unless the source is trusted.',
      'In production reviews, verify trust boundaries for authored content, request data, embeds, JSON blocks, and any explicit context override; HTL cannot protect data that developers deliberately mark unsafe.',
    ],
    realProjectExample: 'A campaign component allowed marketers to paste HTML snippets. The team restricted it to approved embed providers and sanitized the output instead of rendering arbitrary HTML.',
    productionScenario: 'Security scan flags reflected XSS. Check HTL context usage, query parameter rendering, RTE output, JSON-in-script blocks, and any legacy JSP or unsafe context code.',
    commonMistakes: [
      'Using context unsafe to make output work quickly.',
      'Rendering request parameters directly.',
      'Putting business conditions in HTL instead of the model.',
      'Assuming all author-entered rich text is automatically safe for every context.',
    ],
    followUpQuestions: [
      'What is context="uri"?',
      'When is context="html" acceptable?',
      'How do you handle RTE output?',
      'Why avoid scriptlets?',
    ],
    interviewerExpectation: 'They test whether you understand secure rendering, not only HTL syntax.',
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['htl', 'security', 'components'],
    isMostAsked: true,
    mostAskedRank: 12,
    roleAnswers: {
      junior: 'HTL escapes values and prevents XSS.',
      mid: 'HTL is secure by default, but using unsafe or raw HTML can still create XSS.',
      senior: 'I review output contexts, restrict rich text, avoid rendering request data, and add security checks for embeds, URLs, and JSON blocks.',
      architect: 'I define secure component standards: allowed contexts, RTE governance, security testing, content trust boundaries, and review gates for any raw HTML capability.',
    },
  },
  {
    id: 'aem-osgi-cloud-config',
    technologyId: 'aem',
    topicGroup: 'Development',
    category: 'OSGi',
    questionType: 'Cloud Service Questions',
    question: 'How do you manage OSGi configuration across environments in AEM as a Cloud Service?',
    shortAnswer: 'Deploy stable OSGi config as JSON through code, use run mode folders when appropriate, and use Cloud Manager environment variables or secrets for values that differ or are sensitive.',
    detailedAnswer: [
      'Modern AEM projects use OSGi configurations as code, usually .cfg.json files with exact PID naming.',
      'Non-sensitive stable values can be committed to the repository. Secrets and environment-specific values should be injected through Cloud Manager variables.',
      'Author and Publish can have different configs. A senior developer always validates service names, PID names, variable names, and target environment scope.',
      'Services should provide safe defaults, log useful activation information without leaking secrets, and fail gracefully when config is incomplete.',
    ],
    realProjectExample: 'A payment integration used committed timeout and endpoint defaults, while API keys were Cloud Manager secrets. Author used a sandbox endpoint; Publish used the production endpoint.',
    productionScenario: 'Integration works in Dev but fails in Stage. Check Cloud Manager variable scope, secret name, OSGi placeholder syntax, service activation logs, and whether the right config package reached Stage.',
    commonMistakes: [
      'Hardcoding secrets in Git.',
      'Using XML config patterns from old projects without Cloud Service review.',
      'Wrong PID filename.',
      'Logging secret values during activation.',
    ],
    followUpQuestions: [
      'What is a PID?',
      'How do you handle secrets?',
      'How do Author and Publish configs differ?',
      'What should be logged during activation?',
    ],
    interviewerExpectation: 'They want operational maturity around configuration, secrets, and environment parity.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['osgi', 'aem-cloud-service', 'cloud-manager'],
    isMostAsked: true,
    mostAskedRank: 9,
    isRapidRevision: true,
    roleAnswers: {
      junior: 'I create OSGi configs for different environments.',
      mid: 'I use .cfg.json files and separate author/publish config folders.',
      senior: 'I commit non-secret config, use Cloud Manager variables for secrets, validate PID and run modes, and add safe activation logging.',
      architect: 'I design config governance: no secrets in Git, environment parity checks, config promotion strategy, observability, and rollback behavior for failed integrations.',
    },
  },
  {
    id: 'aem-resource-resolver-service-users',
    technologyId: 'aem',
    topicGroup: 'Advanced',
    category: 'Resource Resolver',
    questionType: 'Security Questions',
    question: 'What is the right way to access the repository from an OSGi service?',
    shortAnswer: 'Use a service user mapped to a subservice, obtain a ResourceResolver through ResourceResolverFactory, grant least-privilege permissions, and always close the resolver.',
    detailedAnswer: [
      'Administrative sessions are not acceptable in modern AEM. Services should use service users with explicit permissions.',
      'A subservice mapping connects a bundle and subservice name to a system user. That user receives only the JCR permissions needed for the job.',
      'ResourceResolvers are not free resources. They must be closed, usually with try-with-resources, to avoid leaks.',
      'The request user should not be reused for privileged background operations. Use request permissions for user actions and service users for system actions.',
    ],
    realProjectExample: 'A scheduled cleanup job used a service user that could read /content/dam/project/archive and delete only under one archive folder, not the whole repository.',
    productionScenario: 'Publish becomes unstable after a few hours. Logs show many unclosed ResourceResolvers. The fix is code cleanup plus monitoring and unit tests around resolver lifecycle.',
    commonMistakes: [
      'Using admin sessions.',
      'Not closing ResourceResolver.',
      'Granting broad repository permissions.',
      'Using the request user for background writes.',
    ],
    followUpQuestions: [
      'What is a subservice?',
      'How do you map service users?',
      'Why close ResourceResolver?',
      'What permissions would you grant for a workflow step?',
    ],
    interviewerExpectation: 'This is a common senior filter. They want to know if you write secure, production-safe repository access code.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['resource-resolver', 'service-users', 'security'],
    isMostAsked: true,
    mostAskedRank: 6,
    isRapidRevision: true,
    roleAnswers: {
      junior: 'Use ResourceResolver to read content.',
      mid: 'Use ResourceResolverFactory and close the resolver.',
      senior: 'Use service user mappings, least privilege ACLs, try-with-resources, and avoid admin sessions or request-user privilege escalation.',
      architect: 'I define a permission model per integration or job, review service mappings, monitor resolver leaks, and make repository access auditable.',
    },
  },
  {
    id: 'aem-adaptto-pattern',
    technologyId: 'aem',
    topicGroup: 'Development',
    category: 'AdaptTo Pattern',
    questionType: 'Conceptual Questions',
    question: 'Explain the adaptTo pattern in AEM. Why does adaptTo sometimes return null?',
    shortAnswer: 'adaptTo converts one object type into another when an adapter is available. It returns null when the source object, target type, permissions, registered adapter, or required injections are missing.',
    detailedAnswer: [
      'AEM uses Sling adaptation heavily. A Resource can adapt to ValueMap, Node, Page, or a Sling Model. A request can adapt to a request-based Sling Model.',
      'adaptTo does not throw an exception for normal failures. It often returns null, so production-safe code checks null and logs useful context.',
      'For Sling Models, failed required injection, wrong adaptable, missing resourceType, or missing model registration can cause adaptation failure.',
      'A senior debugging approach records the source type, target type, resource path, model registration state, and failed required dependency before changing optional-injection settings.',
    ],
    realProjectExample: 'A model adapted from Resource in unit tests but from SlingHttpServletRequest in HTL. The mismatch caused @ScriptVariable injection to be null until the model adaptable was corrected.',
    productionScenario: 'A breadcrumb component intermittently returns empty output. Debugging shows currentPage adaptation fails for resources outside the expected page tree.',
    commonMistakes: [
      'Not null-checking adaptTo results.',
      'Using Resource adaptable when request context is required.',
      'Assuming adaptTo always creates a new object.',
      'Hiding model injection errors behind empty output.',
    ],
    followUpQuestions: [
      'Resource vs Request adaptable?',
      'How do Sling Models use adapters?',
      'Why can Page adaptation fail?',
      'How do you debug adaptation failures?',
    ],
    interviewerExpectation: "They want proof that you understand one of AEM/Sling's core programming patterns and its failure modes.",
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['adaptto-pattern', 'sling-models', 'jcr'],
    isMostAsked: true,
    mostAskedRank: 11,
    roleAnswers: {
      junior: 'adaptTo converts a resource to another object.',
      mid: 'It uses Sling adapters and can return null if the adapter or required data is missing.',
      senior: 'I choose the correct adaptable, avoid required injections for optional data, null-check results, and log resource path/model type when adaptation fails.',
      architect: 'I treat adaptation as a boundary. Models should have predictable contracts, tests for failure modes, and clear distinction between resource, request, and service responsibilities.',
    },
  },
  {
    id: 'aem-content-fragments-vs-xf',
    technologyId: 'aem',
    topicGroup: 'Content Management',
    category: 'Content Fragments',
    questionType: 'Conceptual Questions',
    question: 'When would you use Content Fragments instead of Experience Fragments?',
    shortAnswer: 'Use Content Fragments for structured, presentation-independent content and headless delivery. Use Experience Fragments for reusable authored page sections with layout and presentation.',
    detailedAnswer: [
      'Content Fragments are content models and content instances stored in DAM. They are ideal for product data, articles, authors, FAQs, and omnichannel content.',
      'Experience Fragments are composed experiences. They include components, layout, styling, and can be reused on pages or exported to Adobe Target.',
      'The key interview distinction is content vs experience. Content Fragments are API-friendly. Experience Fragments are page-authoring and campaign-friendly.',
      'The enterprise decision also considers canonical ownership, localization, publishing dependencies, API compatibility, cache invalidation, and whether presentation must remain channel-specific.',
    ],
    realProjectExample: 'A retailer used Content Fragments for product specifications consumed by web and mobile apps, and Experience Fragments for promotional banners reused across campaign pages.',
    productionScenario: 'A mobile app receives incomplete product data. Check Content Fragment Model publishing, referenced fragments/assets, persisted query fields, and permissions.',
    commonMistakes: [
      'Using Experience Fragments for structured API content.',
      'Putting presentation-specific fields into Content Fragment Models.',
      'Forgetting to publish referenced fragments.',
      'Creating too many near-duplicate models.',
    ],
    followUpQuestions: [
      'How does GraphQL use Content Fragments?',
      'Can Experience Fragments be localized?',
      'What are variations?',
      'How do you model fragment references?',
    ],
    interviewerExpectation: 'They are evaluating whether you can choose the right AEM content model for page, headless, and campaign use cases.',
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['content-fragments', 'experience-fragments', 'graphql'],
    isMostAsked: true,
    mostAskedRank: 13,
    roleAnswers: {
      junior: 'Content Fragments are content only and Experience Fragments are reusable page sections.',
      mid: 'I use Content Fragments for structured reusable content and GraphQL, and XFs for banners, headers, and campaign sections.',
      senior: 'I decide based on channel strategy, authoring workflow, localization, publishing dependencies, cache behavior, and API stability.',
      architect: 'I model content as a product capability: CFs for canonical structured content, XFs for reusable experiences, with governance for ownership, localization, and release dependencies.',
    },
  },
  {
    id: 'aem-dispatcher-stale-content',
    technologyId: 'aem',
    topicGroup: 'Production Support',
    category: 'Dispatcher',
    questionType: 'Production Issues',
    question: 'A business user says published content is not visible on the live site. What is your troubleshooting approach?',
    shortAnswer: 'Verify publication, dependencies, Dispatcher cache, CDN cache, vhost invalidation support, headers, and whether the request is hitting the expected environment and URL.',
    detailedAnswer: [
      'First confirm the page is actually published and available on Publish, not only Author.',
      'Then check dependencies: assets, Content Fragments, Experience Fragments, templates, and policies.',
      'If Publish is correct but live URL is stale, inspect Dispatcher cache, CDN response headers, Age header, Cache-Control, and invalidation behavior.',
      'In Cloud Service, Dispatcher invalidation depends on vhost matching localhost, 127.0.0.1, *.local, *.adobeaemcloud.com, and *.adobeaemcloud.net style aliases.',
    ],
    realProjectExample: 'A campaign page was published but still showed the old banner because the referenced Experience Fragment was not published and the CDN cached the old page response.',
    productionScenario: 'The incident is time-sensitive. A senior developer tests Author, Publish, Dispatcher, and CDN separately, republish affected dependencies, and avoids clearing the entire site cache unless necessary.',
    commonMistakes: [
      'Immediately clearing all cache without finding the layer.',
      'Publishing only the page, not referenced content.',
      'Ignoring CDN response headers.',
      'Missing vhost aliases required for Dispatcher invalidation.',
    ],
    followUpQuestions: [
      'What is statfileslevel?',
      'How do you inspect CDN headers?',
      'When should you use explicit invalidation?',
      'What paths should Dispatcher block?',
    ],
    interviewerExpectation: 'They want a calm production-support sequence and awareness of cache layers.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['dispatcher', 'production-support', 'aem-cloud-service'],
    isMostAsked: true,
    mostAskedRank: 4,
    isRapidRevision: true,
    scenarioIds: ['content-published-not-visible', 'dispatcher-cache-not-clearing'],
    roleAnswers: {
      junior: 'I would clear Dispatcher cache.',
      mid: 'I would check if the page is published and then clear Dispatcher cache.',
      senior: 'I isolate the layer: Author state, Publish state, references, Dispatcher cache, CDN headers, vhost invalidation, and URL/environment mismatch.',
      architect: 'I expect a runbook, cache policy, dependency publishing checklist, observability headers, and escalation rules so business teams know what is stale and why.',
    },
  },
  {
    id: 'aem-querybuilder-sql2-indexing',
    technologyId: 'aem',
    topicGroup: 'Advanced',
    category: 'Query Builder',
    questionType: 'Performance Questions',
    question: 'How do you choose between Query Builder and JCR SQL2, and how do you make queries production-safe?',
    shortAnswer: 'Use Query Builder for common AEM content searches and SQL2 for precise JCR queries, but production safety depends on indexes, scoped paths, limits, pagination, and avoiding traversal.',
    detailedAnswer: [
      'Query Builder is convenient for AEM-style predicates such as path, type, property, date ranges, and tags.',
      'JCR SQL2 is useful when you need precise JCR query syntax, joins are limited, or you want explicit query control.',
      'The tool is less important than query safety. Scope by path, filter by node type, use pagination, limit result size, and ensure Oak indexes support the query.',
      'In Cloud Service, index changes must be planned and validated through deployment. A bad query can become a production incident.',
    ],
    realProjectExample: 'A search component originally queried all cq:PageContent nodes under /content. It caused traversal warnings. The team added a path scope, template filter, pagination, and an Oak index for the queried properties.',
    productionScenario: 'Publish CPU spikes after a release. Logs show traversal warnings from a component. Disable the component if necessary, then fix query scope and index support.',
    commonMistakes: [
      'Querying from /content without a site-specific path.',
      'Using p.limit=-1 on large repositories.',
      'Ignoring traversal warnings.',
      'Creating indexes without understanding read/write cost.',
    ],
    followUpQuestions: [
      'What is an Oak index?',
      'What are traversal warnings?',
      'How do you paginate Query Builder results?',
      'When would you use an external search engine?',
    ],
    interviewerExpectation: 'They are checking production performance maturity and repository awareness.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['query-builder', 'jcr-sql2', 'performance-tuning'],
    isMostAsked: true,
    mostAskedRank: 16,
    scenarioIds: ['slow-page-rendering'],
    roleAnswers: {
      junior: 'Query Builder is for searching content and SQL2 is like SQL.',
      mid: 'I use Query Builder for AEM predicates and SQL2 for direct JCR queries, with path and type filters.',
      senior: 'I design queries around indexes, pagination, path scope, result limits, and log monitoring. I treat traversal warnings as release blockers.',
      architect: 'I decide whether content search belongs in JCR, GraphQL, Search/Elastic, or a precomputed index. Repository queries should not become runtime reporting engines.',
    },
  },
  {
    id: 'aem-msm-rollout-localization',
    technologyId: 'aem',
    topicGroup: 'Content Management',
    category: 'MSM',
    questionType: 'Scenario-Based Questions',
    question: 'How do you prevent MSM rollouts from overwriting local market changes?',
    shortAnswer: 'Design Blueprint/local ownership carefully, configure rollout exclusions, train authors on inheritance, test rollout configs, and validate localized references before broad rollout.',
    detailedAnswer: [
      'MSM is about controlled inheritance. The first design question is what should remain global and what should be local.',
      'Rollout configs define what properties and child nodes are synchronized. Incorrect configs can overwrite translations, local campaigns, or localized fragment references.',
      'Authors must understand cancel vs suspend inheritance. Accidental cancellation creates long-term maintenance problems.',
      'Large rollouts should be piloted on a small market or branch before all countries are touched.',
    ],
    realProjectExample: 'A global brand had a US Blueprint and 18 country Live Copies. Legal pages rolled out globally, but promotion banners and local disclaimers were excluded from rollout.',
    productionScenario: 'After rollout, German pages show English CTAs. The team checks inherited components, rollout exclusions, localized XF/CF references, translation workflow status, and page publication.',
    commonMistakes: [
      'Using MSM for simple translation when Language Copy would be enough.',
      'Rolling out an entire tree without checking local ownership.',
      'Not documenting inherited vs local content areas.',
      'Forgetting referenced assets and fragments during localization.',
    ],
    followUpQuestions: [
      'Blueprint vs Live Copy?',
      'Cancel vs suspend inheritance?',
      'MSM vs translation workflow?',
      'How do you troubleshoot broken inheritance?',
    ],
    interviewerExpectation: 'They want to know if you have seen global-site complexity and can protect local markets from rollout damage.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['msm', 'workflows', 'experience-fragments'],
    isMostAsked: true,
    mostAskedRank: 17,
    roleAnswers: {
      junior: 'MSM rolls out changes from master to live copies.',
      mid: 'Use rollout configs and exclude translated properties.',
      senior: 'Define global vs local ownership, test rollout configs, train authors, monitor rollout jobs, and validate localized references before publishing.',
      architect: 'I design the operating model: market ownership, rollout governance, localization strategy, rollback plan, and whether MSM is even the right tool for the business model.',
    },
  },
  {
    id: 'aem-workflow-backlog',
    technologyId: 'aem',
    topicGroup: 'Production Support',
    category: 'Workflows',
    questionType: 'Production Issues',
    question: 'AEM workflows are piling up and the instance is slow. How would you handle it?',
    shortAnswer: 'Identify the workflow model and failing step, inspect queues and logs, check custom process steps, purge completed instances, move heavy DAM work to transient/async patterns, and add timeouts to integrations.',
    detailedAnswer: [
      'Workflow backlog is usually a symptom: too many launches, slow custom steps, external API timeouts, asset processing overload, or missing purge configuration.',
      'Check workflow instances, launcher rules, error.log, custom process step logs, and payload patterns.',
      'For DAM processing, transient workflows reduce repository persistence overhead. Heavy processing should not block request threads.',
      'Every custom workflow step that calls external systems needs timeout, retry limits, idempotency, and useful error logging.',
    ],
    realProjectExample: 'An asset metadata enrichment workflow called a vendor API without timeout. When the vendor slowed down, thousands of DAM Update Asset workflows accumulated. The fix added timeouts, retries, queue limits, and transient processing.',
    productionScenario: 'Author performance degrades after a bulk asset upload. Pause the launcher if needed, identify the stuck step, clear or retry failed instances safely, and deploy a workflow fix.',
    commonMistakes: [
      'Keeping every completed workflow forever.',
      'Calling slow APIs synchronously.',
      'Creating launchers that trigger on too broad a path.',
      'Ignoring idempotency in retryable process steps.',
    ],
    followUpQuestions: [
      'What is a transient workflow?',
      'How do launchers work?',
      'How do you write a custom WorkflowProcess?',
      'How do you purge workflow history?',
    ],
    interviewerExpectation: 'They are evaluating production support, operational caution, and ability to debug beyond the workflow model UI.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['workflows', 'osgi', 'production-support'],
    isMostAsked: true,
    mostAskedRank: 18,
    scenarioIds: ['replication-queue-blocked'],
    roleAnswers: {
      junior: 'I check the workflow console and retry failed workflows.',
      mid: 'I check launchers, queue, logs, and purge old workflows.',
      senior: 'I identify the exact model and step, isolate external timeouts or broad launchers, use transient workflows for DAM, and make custom steps idempotent.',
      architect: 'I define workflow SLAs, queue monitoring, purge policy, async design, and integration failure handling before bulk operations become incidents.',
    },
  },
  {
    id: 'aem-cloud-manager-pipeline-failure',
    technologyId: 'aem',
    topicGroup: 'Cloud Service',
    category: 'Cloud Manager',
    questionType: 'Cloud Service Questions',
    question: 'A Cloud Manager production pipeline fails. How do you analyze it?',
    shortAnswer: 'Identify the failed phase, review build and quality reports, check unit tests, code quality gates, package validation, Dispatcher validation, environment variables, and deployment logs.',
    detailedAnswer: [
      'Cloud Manager pipelines are more than Maven builds. They include code quality, security checks, test execution, artifact generation, deployment, and sometimes performance or experience checks.',
      'A good answer separates build failure, quality gate failure, Dispatcher validation failure, content package validation failure, and deployment failure.',
      'Production pipeline failure needs triage discipline: do not guess. Download logs, identify first failure, compare with previous successful run, and check recent commits.',
      'If the failure is environment-specific, inspect Cloud Manager variables, secrets, run mode configs, and dependencies on environment state.',
    ],
    realProjectExample: 'A pipeline passed locally but failed Cloud Manager because a Dispatcher filter allowed a sensitive /bin endpoint. The team fixed filters and added Dispatcher SDK validation to the PR workflow.',
    productionScenario: 'Release window is blocked. The lead communicates the failing phase, owner, expected fix time, rollback option, and whether content release can proceed separately.',
    commonMistakes: [
      'Only checking Maven output.',
      'Treating quality gate failures as optional.',
      'Deploying Dispatcher changes without local SDK validation.',
      'Not comparing with the previous successful pipeline.',
    ],
    followUpQuestions: [
      'What are quality gates?',
      'How do you validate Dispatcher config locally?',
      'How do environment variables work?',
      'What is a rolling deployment?',
    ],
    interviewerExpectation: 'They want Cloud Service release maturity and ability to operate inside Adobe-managed CI/CD.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['cloud-manager', 'aem-cloud-service', 'dispatcher'],
    isMostAsked: true,
    mostAskedRank: 14,
    isRapidRevision: true,
    scenarioIds: ['deployment-fails-after-release'],
    roleAnswers: {
      junior: 'I check the pipeline logs.',
      mid: 'I identify if it is build, test, quality, or deployment failure.',
      senior: 'I isolate the failed phase, compare previous runs, inspect quality reports, package and Dispatcher validation, environment variables, and deployment logs.',
      architect: 'I make pipeline quality part of engineering governance: PR checks, local validation, ownership by phase, release communication, and rollback strategy.',
    },
  },
  {
    id: 'aem-cloud-migration-65-to-cloud',
    technologyId: 'aem',
    topicGroup: 'Architecture',
    category: 'Migration Scenarios',
    questionType: 'Migration Questions',
    question: 'What are the main challenges when migrating from AEM 6.5 to AEM as a Cloud Service?',
    shortAnswer: 'Key challenges include immutable repository rules, deprecated APIs, custom code compatibility, Dispatcher/CDN changes, OSGi config modernization, asset/content migration, workflow changes, and operational model changes.',
    detailedAnswer: [
      'AEM as a Cloud Service is not just hosted AEM 6.5. Code deployment, scaling, updates, repository behavior, and operations change.',
      'Custom code must be analyzed for deprecated APIs, filesystem assumptions, runtime writes to /apps, custom indexes, and unsupported patterns.',
      'Dispatcher and CDN become central. Cache behavior, headers, vhosts, filters, and invalidation need review.',
      'Migration is not only technical. Teams must change release process, support model, monitoring, and environment management through Cloud Manager.',
    ],
    realProjectExample: 'A 6.5 implementation used package manager hotfixes, CRXDE edits, custom workflow steps, and filesystem writes. The migration replaced runtime writes with pipeline code, moved secrets to Cloud Manager, and redesigned asset processing.',
    productionScenario: 'After migration, a scheduler writes files to the local filesystem and fails. The correct fix is cloud-native storage or repository-managed content, not server-local assumptions.',
    commonMistakes: [
      'Treating Cloud Service as lift-and-shift hosting.',
      'Ignoring custom code analysis.',
      'Moving secrets as plain OSGi files.',
      'Underestimating Dispatcher/CDN behavior changes.',
    ],
    followUpQuestions: [
      'What does immutable mean?',
      'How do you handle package manager habits?',
      'What tools help analyze code?',
      'How do you migrate assets?',
    ],
    interviewerExpectation: 'They want migration realism: technical blockers, operating model changes, and risk management.',
    difficultyLevel: 'Architect',
    experienceLevel: 'architect',
    relatedTopics: ['migration-scenarios', 'aem-cloud-service', 'cloud-manager'],
    isMostAsked: true,
    mostAskedRank: 15,
    isRapidRevision: true,
    roleAnswers: {
      junior: 'We move code and content to Cloud Service.',
      mid: 'We check compatibility, update configs, and deploy through Cloud Manager.',
      senior: 'I analyze deprecated APIs, mutable paths, custom indexes, workflows, Dispatcher/CDN, secrets, and integration behavior before migration.',
      architect: 'I run migration as a program: assessment, remediation backlog, content/assets strategy, release model change, stakeholder training, risk burn-down, and production cutover plan.',
    },
  },
  {
    id: 'aem-graphql-persisted-queries',
    technologyId: 'aem',
    topicGroup: 'Cloud Service',
    category: 'GraphQL',
    questionType: 'Cloud Service Questions',
    question: 'How do persisted GraphQL queries work in AEM, and why are they recommended?',
    shortAnswer: 'Persisted queries are stored server-side and exposed through cacheable GET URLs. They are faster, safer, and CDN/Dispatcher-friendly compared to arbitrary ad-hoc GraphQL requests.',
    detailedAnswer: [
      'AEM GraphQL exposes Content Fragments. Content Fragment Models define the schema.',
      'Ad-hoc POST queries are flexible but harder to cache and can allow arbitrary expensive queries if exposed carelessly.',
      'Persisted queries make the query contract explicit. Front ends call a named GET endpoint, which can be cached by Dispatcher and CDN.',
      'Production readiness includes publishing the endpoint, query, models, fragments, referenced assets, CORS config, and cache headers.',
    ],
    realProjectExample: 'A React product listing consumed a persisted query for product cards. The query returned only card fields, used CDN caching, and had a separate query for detail pages.',
    productionScenario: 'The React page works on Author but fails on Publish. Check endpoint publication, persisted query publication, model publication, referenced fragments/assets, Dispatcher filters, and CORS.',
    commonMistakes: [
      'Using ad-hoc GraphQL in production.',
      'Fetching too many nested fragment fields.',
      'Forgetting to publish Content Fragment Models.',
      'Treating GraphQL response shape as unversioned internal detail.',
    ],
    followUpQuestions: [
      'How do Content Fragment Models become schema?',
      'How do you cache GraphQL responses?',
      'Can AEM GraphQL mutate content?',
      'How do you handle CORS?',
    ],
    interviewerExpectation: 'They are looking for headless delivery experience, cache awareness, and API contract discipline.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['graphql', 'content-fragments', 'aem-cloud-service'],
    isMostAsked: true,
    mostAskedRank: 19,
    roleAnswers: {
      junior: 'GraphQL fetches Content Fragment data.',
      mid: 'Persisted queries are saved queries that front ends call by URL.',
      senior: 'I use persisted GET queries for cacheability, limit fields, publish all dependencies, configure CORS, and version response contracts carefully.',
      architect: 'I design GraphQL as a delivery API: schema governance, persisted query lifecycle, cache policy per channel, dependency publishing, and backward compatibility for consuming apps.',
    },
  },
  {
    id: 'aem-security-hardening',
    technologyId: 'aem',
    topicGroup: 'Advanced',
    category: 'Security',
    questionType: 'Security Questions',
    question: 'What are the most important AEM security practices before go-live?',
    shortAnswer: 'Protect Author, harden Dispatcher filters, block sensitive paths, use service users, avoid secrets in code, validate servlets/selectors, secure CORS, and review permissions.',
    detailedAnswer: [
      'Author should be private and access-controlled. Publish should expose only public delivery paths through Dispatcher/CDN.',
      'Dispatcher filters should deny by default and explicitly allow required paths such as public pages, DAM renditions, clientlibs, and approved APIs.',
      'Sensitive paths like /crx/de, /system/console, /bin/querybuilder, and excessive JSON selectors must be blocked.',
      'Repository access should use least-privilege service users, not admin sessions. Secrets belong in secure environment variables, not source code.',
      'Custom servlets and GraphQL/CORS settings need review because they often become accidental public APIs.',
    ],
    realProjectExample: 'Before launch, an insurance client ran a security review that found an overly broad /bin servlet and open .infinity.json access. Dispatcher filters and servlet validation were tightened before go-live.',
    productionScenario: 'A penetration test finds data exposure through a selector. The fix includes Dispatcher filters, servlet validation, permission review, and tests that prevent the path from reopening.',
    commonMistakes: [
      'Allowing /bin/* broadly.',
      'Leaving querybuilder accessible.',
      'Using admin sessions in custom code.',
      'Setting CORS to allow all origins.',
    ],
    followUpQuestions: [
      'What paths do you block in Dispatcher?',
      'How do service users improve security?',
      'How do you secure custom servlets?',
      'How should CORS be configured?',
    ],
    interviewerExpectation: 'They want practical security awareness grounded in common AEM exposure points.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['security', 'dispatcher', 'service-users'],
    isMostAsked: true,
    mostAskedRank: 5,
    isRapidRevision: true,
    roleAnswers: {
      junior: 'Block CRXDE and system console on production.',
      mid: 'Use Dispatcher filters, protect Author, and avoid exposing sensitive paths.',
      senior: 'Deny by default, review servlets/selectors, block sensitive JSON and admin paths, use service users, secure CORS, and keep secrets out of code.',
      architect: 'I define a security baseline: network boundaries, Dispatcher policy, code review checklist, permission model, secrets management, penetration testing, and continuous verification.',
    },
  },
  {
    id: 'aem-performance-tuning-slow-page',
    technologyId: 'aem',
    topicGroup: 'Advanced',
    category: 'Performance Tuning',
    questionType: 'Performance Questions',
    question: 'A page is slow in production. How do you troubleshoot AEM performance?',
    shortAnswer: 'Separate cache miss from cache hit, inspect CDN/Dispatcher headers, profile Publish rendering, check slow queries, Sling Models, external calls, clientlibs, image renditions, and component count.',
    detailedAnswer: [
      'First determine whether the user is getting a CDN/Dispatcher cache hit or a Publish-rendered response.',
      'If cache is missed often, fix cache headers, URL parameters, personalization, or invalidation strategy.',
      'If Publish rendering is slow, inspect logs, request timing, slow queries, model @PostConstruct work, external API calls, and expensive component trees.',
      'Front-end performance also matters: clientlib size, render-blocking scripts, image renditions, and third-party scripts can make an AEM page feel slow even if server response is fast.',
    ],
    realProjectExample: 'A homepage loaded slowly because every card component queried latest articles separately. The fix moved the query to a cached service and rendered the list from one precomputed model.',
    productionScenario: 'A campaign goes live and Publish CPU spikes. Check cache hit ratio, query traversal warnings, API latency, and whether tracking parameters are creating unique cache entries.',
    commonMistakes: [
      'Only looking at browser performance and ignoring Publish render time.',
      'Calling APIs inside every component instance.',
      'Using unbounded queries.',
      'Letting marketing query parameters fragment the cache.',
    ],
    followUpQuestions: [
      'How do you measure cache hit ratio?',
      'What causes traversal warnings?',
      'How do clientlibs affect performance?',
      'How do you handle personalization without killing cache?',
    ],
    interviewerExpectation: 'They want structured diagnosis across edge, Dispatcher, Publish, repository, integration, and browser.',
    difficultyLevel: 'Advanced',
    experienceLevel: 'senior',
    relatedTopics: ['performance-tuning', 'dispatcher', 'sling-models'],
    isMostAsked: true,
    mostAskedRank: 20,
    isRapidRevision: true,
    scenarioIds: ['slow-page-rendering'],
    roleAnswers: {
      junior: 'I check if the page has heavy images or scripts.',
      mid: 'I check Dispatcher cache, logs, and slow components.',
      senior: 'I isolate CDN/Dispatcher cache behavior, Publish render time, query/index issues, model logic, API latency, image renditions, and clientlib size.',
      architect: 'I design performance budgets, cache strategy, observability, query governance, component standards, and load-test gates so performance is not debugged only after launch.',
    },
  },
  {
    id: 'aem-clientlibs-cache-debugging',
    technologyId: 'aem',
    topicGroup: 'Development',
    category: 'Client Libraries',
    questionType: 'Debugging Questions',
    question: 'ClientLib changes work on Author but not on Publish. What do you check?',
    shortAnswer: 'Check category names, allowProxy, /etc.clientlibs Dispatcher filters, clientlib rebuild/cache, minification, dependency order, and whether the page template includes the right categories.',
    detailedAnswer: [
      'ClientLib issues often look like front-end bugs but are usually delivery or configuration problems.',
      'The public URL should normally be served through /etc.clientlibs, not direct /apps paths.',
      'Dispatcher must allow /etc.clientlibs. Browser cache and AEM clientlib cache can hide changes.',
      'Minification can expose JavaScript issues that do not appear in local unminified development.',
    ],
    realProjectExample: 'A header menu failed only on Publish because the author clientlib category was included in edit mode but the publish template missed the site base category.',
    productionScenario: 'After release, CSS is old for some users. Check generated clientlib URL/hash, CDN cache, browser cache, and whether the correct clientlib category was embedded.',
    commonMistakes: [
      'Referencing /apps clientlibs directly.',
      'Forgetting allowProxy.',
      'Mixing author-only and publish clientlibs.',
      'Not testing minified production mode.',
    ],
    followUpQuestions: [
      'What is allowProxy?',
      'dependencies vs embed?',
      'How do you debug clientlibs?',
      'How does cache busting work?',
    ],
    interviewerExpectation: 'They want practical AEM front-end delivery knowledge, not just CSS/JS debugging.',
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['client-libraries', 'dispatcher', 'htl'],
    roleAnswers: {
      junior: 'I clear browser cache and check CSS paths.',
      mid: 'I check categories, allowProxy, /etc.clientlibs, and Dispatcher filters.',
      senior: 'I validate category inclusion, dependencies/embed, minification, CDN/browser cache, author-vs-publish category split, and hash-based cache busting.',
      architect: 'I define front-end delivery standards: build pipeline, category governance, author-only separation, cache policy, and release validation for critical templates.',
    },
  },
  {
    id: 'aem-crxde-cloud-service',
    technologyId: 'aem',
    topicGroup: 'Fundamentals',
    category: 'CRXDE',
    questionType: 'Cloud Service Questions',
    question: 'What is the role of CRXDE Lite in modern AEM and AEM as a Cloud Service?',
    shortAnswer: 'CRXDE is useful for local and development debugging, but it should not be used for production fixes. Cloud Service enforces pipeline-driven code changes and immutable runtime areas.',
    detailedAnswer: [
      'CRXDE helps developers inspect JCR nodes, properties, and queries. It is useful for learning and debugging.',
      'In enterprise work, CRXDE findings should become code, content packages, or documented configuration changes. Manual repository edits are not a release strategy.',
      'In AEM as a Cloud Service, mutable and immutable boundaries are stricter. Stage/Production support should rely on logs, Cloud Manager, Developer Console-style diagnostics, packages, and pipelines.',
      'A production-ready team records the evidence found in CRXDE, reproduces the issue safely, delivers a version-controlled fix, and validates that the next deployment cannot reintroduce environment drift.',
    ],
    realProjectExample: 'A developer used CRXDE locally to discover a missing dialog property, then fixed the dialog XML in source control and deployed through the pipeline.',
    productionScenario: 'A production issue tempts the team to edit a node manually. The lead refuses a hidden hotfix and instead creates a repeatable package or code change with approval.',
    commonMistakes: [
      'Making production changes in CRXDE.',
      'Editing /libs.',
      'Not committing discovered fixes to source control.',
      'Assuming local CRXDE behavior equals Cloud Service runtime behavior.',
    ],
    followUpQuestions: [
      'When is CRXDE useful?',
      'Why avoid production edits?',
      'How do you inspect Cloud Service issues?',
      'What is immutable in Cloud Service?',
    ],
    interviewerExpectation: 'They are checking governance discipline and Cloud Service awareness.',
    difficultyLevel: 'Intermediate',
    experienceLevel: 'mid',
    relatedTopics: ['crxde', 'aem-cloud-service', 'jcr'],
    roleAnswers: {
      junior: 'CRXDE lets me see and edit repository nodes.',
      mid: 'I use it for debugging in local/dev, but permanent fixes go into source control.',
      senior: 'I avoid CRXDE hotfixes, capture findings as code or packages, and use cloud diagnostics for managed environments.',
      architect: 'I frame CRXDE as a diagnostic aid, not an operating model. Production governance requires repeatable, reviewed, auditable changes.',
    },
  },
];

type TopicCoverage = {
  topic: string;
  category: string;
  topicGroup: string;
  profileTopic?: string;
  relatedTopics: string[];
  questions: string[];
};

type QuestionIntent = 'concept' | 'implementation' | 'comparison' | 'troubleshooting' | 'architecture' | 'security' | 'performance' | 'migration';

type TopicQualityProfile = {
  core: string;
  whyAndWhen: string;
  implementation: string;
  enterpriseExample: string;
  productionFailure: string;
  evidence: string[];
  tradeOff: string;
  cloudService: string;
  governance: string;
};

const topicQualityProfiles: Record<string, TopicQualityProfile> = {
  Architecture: {
    core: 'AEM architecture separates authoring, content delivery, cache, and edge delivery so each tier can be secured, scaled, and operated independently.',
    whyAndWhen: 'The separation matters when an enterprise has editorial workflows, traffic spikes, regional delivery, personalized journeys, and strict production access controls.',
    implementation: 'Define tier ownership, cache boundaries, public endpoints, content publication flows, observability, and failure behavior before selecting custom services or integrations.',
    enterpriseExample: 'A global bank separated public marketing pages, authenticated journeys, and campaign microsites into explicit cache and security patterns while sharing governed components and content services.',
    productionFailure: 'A campaign launch overwhelms Publish because personalized responses and poorly designed URLs bypass both CDN and Dispatcher.',
    evidence: ['CDN and Dispatcher cache-hit headers', 'Publish request rate and response time', 'vhost and filter rules', 'recent architecture or deployment changes'],
    tradeOff: 'More shared infrastructure reduces cost, but stronger isolation can reduce blast radius and simplify ownership for high-risk journeys.',
    cloudService: 'In AEM as a Cloud Service, Adobe manages scaling and infrastructure, but the implementation team still owns cacheability, endpoint safety, content design, and deployment quality.',
    governance: 'Architecture decisions need documented ownership, non-functional requirements, threat modelling, operational runbooks, and review gates.',
  },
  JCR: {
    core: 'JCR is AEM’s hierarchical content repository; the important design decision is how nodes, properties, node types, and paths support authoring, querying, permissions, and delivery.',
    whyAndWhen: 'A good repository model keeps components reusable and queries indexable while avoiding deep, unbounded, or code-shaped content structures.',
    implementation: 'Model content around authoring and retrieval use cases, use stable resource types, keep configuration in the correct repository area, and design indexes before production-scale queries appear.',
    enterpriseExample: 'A retail platform moved repeated product storytelling fields from deeply nested page nodes into governed Content Fragment models, reducing query complexity and channel-specific duplication.',
    productionFailure: 'A component query traverses a large subtree after content volume grows, causing slow responses and repository traversal warnings.',
    evidence: ['query plans and traversal warnings', 'node structure and property cardinality', 'effective ACLs', 'Oak index definitions and repository statistics'],
    tradeOff: 'Flexible unstructured content accelerates early delivery, but excessive flexibility makes governance, migration, indexing, and reporting expensive.',
    cloudService: 'Cloud Service requires repository changes and indexes to follow supported deployment patterns rather than ad hoc production edits.',
    governance: 'Repository conventions should define ownership for /apps, /content, /conf, and /oak:index plus review rules for queries and migrations.',
  },
  CRXDE: {
    core: 'CRXDE Lite is a repository inspection and development aid, not a production change-management strategy.',
    whyAndWhen: 'It is useful for understanding node structure, resolving local or development issues, and confirming deployed resources, but permanent fixes must remain repeatable and auditable.',
    implementation: 'Use CRXDE to gather evidence, reproduce the issue locally, then commit the code, configuration, ACL, or content migration through the approved delivery path.',
    enterpriseExample: 'A team used CRXDE in a development environment to find a missing policy node, then fixed the template package and added regression validation to the deployment pipeline.',
    productionFailure: 'A manual repository edit fixes one environment temporarily but is overwritten by the next deployment and cannot be traced during incident review.',
    evidence: ['deployed package contents', 'repository node origin and last modification', 'effective permissions', 'source-control and pipeline history'],
    tradeOff: 'Direct editing is fast for diagnosis but creates drift, weak auditability, and unsafe recovery when used as an operating model.',
    cloudService: 'AEM as a Cloud Service reinforces immutable, pipeline-driven changes and provides less tolerance for manual repository hotfixes.',
    governance: 'Teams should define where CRXDE is allowed, who may access it, and how every diagnostic finding becomes a reviewed source-controlled fix.',
  },
  Components: {
    core: 'An enterprise AEM component is a governed authoring contract spanning dialog design, Sling Models, HTL output, policies, accessibility, analytics, caching, and backward compatibility.',
    whyAndWhen: 'Components should be built or extended when a reusable business capability cannot be met safely through Core Component configuration and delegation.',
    implementation: 'Start from the author use case, define content and policy contracts, delegate to Core Components where possible, keep logic out of HTL, and test Author, Publish, cache, accessibility, and upgrade behavior.',
    enterpriseExample: 'A multi-brand organization extended the Core Teaser through delegation, using policies for brand variants while preserving analytics and accessibility behavior across dozens of sites.',
    productionFailure: 'A component works on Author but renders empty on Publish because it depends on author-only resources, missing policies, unpublished references, or unavailable services.',
    evidence: ['component resource type and supertype', 'published content and policy nodes', 'Sling Model adaptation logs', 'Dispatcher response and rendered markup'],
    tradeOff: 'Highly configurable components improve reuse but can create confusing authoring and unstable rendering contracts if policies and variants are not governed.',
    cloudService: 'Cloud-ready components avoid filesystem assumptions, unsupported APIs, and mutable runtime configuration while remaining cache-friendly.',
    governance: 'A component definition of done should include author UX, security, performance, accessibility, analytics, tests, documentation, and deprecation strategy.',
  },
  HTL: {
    core: 'HTL is the presentation layer; it should render trusted model data with explicit display contexts while keeping business and repository logic outside the template.',
    whyAndWhen: 'It is used to produce maintainable, secure component markup and reduce the risk created by scriptlets or uncontrolled output encoding.',
    implementation: 'Prepare data in Sling Models or services, select the correct HTL context, render semantic markup, handle empty states, and keep loops and includes bounded.',
    enterpriseExample: 'A financial-services design system used shared Sling Models and HTL templates to enforce accessible markup and safe output contexts across multiple brands.',
    productionFailure: 'A release introduces an XSS risk because a developer overrides the default display context for authored HTML without validating the source or required sanitization.',
    evidence: ['rendered markup and browser console', 'HTL compilation or rendering logs', 'display-context usage', 'model values and content-policy configuration'],
    tradeOff: 'HTL’s safety defaults are strong, but bypassing contexts or pushing complex logic into templates quickly removes those advantages.',
    cloudService: 'HTL behavior remains portable in Cloud Service when templates rely on supported APIs and versioned component contracts.',
    governance: 'Code review should reject repository access, business logic, unsafe contexts, and duplicated presentation logic inside HTL.',
  },
  Sling: {
    core: 'Sling resolves HTTP requests to resources and scripts using resource paths, selectors, extensions, resource types, and search paths.',
    whyAndWhen: 'Understanding resolution is essential when designing resource-type servlets, component inheritance, clean URLs, and secure request handling.',
    implementation: 'Trace the request URL to the resolved resource, resource type, supertype chain, servlet or script, and response before changing mappings or code.',
    enterpriseExample: 'A media platform exposed a versioned JSON endpoint through a resource-type servlet so permissions, content context, and Dispatcher rules remained predictable.',
    productionFailure: 'A URL returns the wrong component or a 404 on Publish because a mapping, selector, resource type, or deployment differs from Author.',
    evidence: ['Sling request progress output', 'resource resolver mappings', 'resolved resource type and supertype', 'Dispatcher filters and Publish logs'],
    tradeOff: 'Sling’s flexible resolution enables clean composition but can become difficult to debug when teams rely on path-based endpoints or implicit mappings.',
    cloudService: 'Cloud Service rewards deterministic, resource-type-based request handling and version-controlled mappings over environment-specific runtime edits.',
    governance: 'Endpoint conventions should cover naming, allowed methods, authentication, selectors, caching, filters, and backwards compatibility.',
  },
  'Sling Models': {
    core: 'A Sling Model adapts a Resource or SlingHttpServletRequest into a typed presentation model using registered injectors and explicit adaptation contracts.',
    whyAndWhen: 'It is appropriate for preparing component or API data, while integration orchestration and broad business logic belong in OSGi services.',
    implementation: 'Choose the narrowest adaptable, make required dependencies explicit, prefer constructor or clear field injection, keep @PostConstruct lightweight, and test adaptation failure paths.',
    enterpriseExample: 'An e-commerce component used a resource-adaptable Sling Model for authored product references and delegated inventory lookup to a resilient OSGi service.',
    productionFailure: 'A model renders locally but adapts to null on Publish because the bundle is inactive, required content is missing, an injector cannot resolve, or the adaptable is wrong.',
    evidence: ['Sling Model registration status', 'bundle and service state', 'adaptation and injector logs', 'resource properties and request context'],
    tradeOff: 'Convenient injection reduces boilerplate, but excessive optional injection can hide broken content contracts and make failures surface as empty markup.',
    cloudService: 'Models should be stateless, fast, observable, and free from assumptions about local files or mutable runtime configuration.',
    governance: 'Model contracts should define adaptables, required fields, exporter shape, service dependencies, test coverage, and expected failure behavior.',
  },
  OSGi: {
    core: 'OSGi provides modular services, dependency management, lifecycle control, and environment-specific configuration for AEM application code.',
    whyAndWhen: 'Use OSGi services for reusable business capabilities, integrations, scheduled work, and logic that should not live in components or templates.',
    implementation: 'Define narrow service contracts, declare references and activation requirements, use typed configurations, handle unavailable dependencies, and expose health and failure signals.',
    enterpriseExample: 'A customer-profile integration isolated vendor calls behind an OSGi service with timeouts, circuit breaking, metrics, and environment-specific endpoints.',
    productionFailure: 'A deployment leaves a component unsatisfied because a required service, configuration, or package import is missing in the target environment.',
    evidence: ['component and bundle state', 'unsatisfied reference details', 'package import/export resolution', 'effective OSGi configuration and logs'],
    tradeOff: 'Modularity improves testability and ownership, but excessive service fragmentation increases lifecycle and dependency complexity.',
    cloudService: 'Configuration must use supported Cloud Service patterns, and secrets must not be stored as plain OSGi values in source control.',
    governance: 'Services need owners, stable interfaces, configuration schemas, resilience standards, observability, and retirement plans.',
  },
  Templates: {
    core: 'Editable templates define governed page structure, initial content, allowed components, and policies while allowing authorized template authors to evolve page types.',
    whyAndWhen: 'They support enterprise reuse and author freedom without requiring a code deployment for every approved layout or policy change.',
    implementation: 'Design template types, locked structure, initial content, policies, and allowed components around page governance and multi-brand needs, then package and publish dependencies correctly.',
    enterpriseExample: 'A global manufacturer used shared template types with brand-specific policies to support local market pages without duplicating page components.',
    productionFailure: 'Authors cannot add a component or Publish renders differently because policies, template structures, or referenced clientlibs were not deployed or published consistently.',
    evidence: ['template and policy paths under /conf', 'allowed-component configuration', 'published dependencies', 'resource types and clientlib categories'],
    tradeOff: 'More template flexibility empowers authors but increases governance and regression risk across brands and page types.',
    cloudService: 'Templates and policies must move through supported packages and deployment workflows rather than manual environment edits.',
    governance: 'Template ownership should define who may change structure and policy, how changes are tested, and how existing pages are protected.',
  },
  'Content Fragments': {
    core: 'Content Fragments store structured, channel-neutral content defined by governed models and delivered through AEM pages, APIs, or GraphQL.',
    whyAndWhen: 'Use them when content must be reused across channels or experiences without carrying page layout and presentation.',
    implementation: 'Model around durable business entities, define references and validation deliberately, plan localization and permissions, and design API queries with caching and evolution in mind.',
    enterpriseExample: 'A travel company modelled destinations, offers, and editorial stories as Content Fragments consumed by web, mobile, kiosks, and partner feeds.',
    productionFailure: 'A GraphQL consumer loses fields after a model change or receives stale content because references, publication, persisted queries, or CDN behavior were not coordinated.',
    evidence: ['fragment model and API schema', 'fragment references and publication state', 'persisted-query response and cache headers', 'folder permissions'],
    tradeOff: 'Highly normalized models improve reuse but can create deep references, authoring friction, and expensive queries.',
    cloudService: 'Cloud Service provides the preferred headless delivery model, but teams still own schema evolution, caching, publication, and consumer compatibility.',
    governance: 'Content models require named owners, versioning rules, localization strategy, API compatibility standards, and lifecycle management.',
  },
  'Experience Fragments': {
    core: 'Experience Fragments package reusable, presentation-aware experience sections with variations for reuse across pages, sites, or channels.',
    whyAndWhen: 'Use them when both content and authored presentation should be reused, unlike Content Fragments which are primarily structured content.',
    implementation: 'Define approved templates and variations, control localization and MSM behavior, publish all dependencies, and verify cache invalidation where fragments are embedded.',
    enterpriseExample: 'A consumer brand reused governed promotion banners and legal footers across regional sites while allowing approved localized variations.',
    productionFailure: 'A page shows an old or empty Experience Fragment because the variation, referenced assets, policy, or fragment page was not published or invalidated.',
    evidence: ['fragment variation and references', 'publication state of dependencies', 'MSM inheritance status', 'Dispatcher and CDN cache headers'],
    tradeOff: 'Experience Fragments accelerate reuse, but uncontrolled proliferation creates duplicate variants and unclear ownership.',
    cloudService: 'Cloud deployments do not remove the need to coordinate fragment publication, dependency delivery, and cache behavior.',
    governance: 'Teams need rules for fragment ownership, naming, localization, allowed templates, variation lifecycle, and retirement.',
  },
  Dispatcher: {
    core: 'Dispatcher is both a cache and a request filter in front of Publish; its value comes from explicit allowlists, cache rules, invalidation, and vhost alignment.',
    whyAndWhen: 'It protects Publish and absorbs anonymous traffic, making it central to availability, security, and production performance.',
    implementation: 'Start with deny-by-default filters, allow only required endpoints, design cacheable URLs and headers, configure invalidation deliberately, and test every vhost through the real CDN path.',
    enterpriseExample: 'A high-traffic insurance site cached public journeys aggressively while denying authoring endpoints and routing authenticated APIs through separate, non-cacheable controls.',
    productionFailure: 'Published content remains stale because the flush request targets the wrong vhost, statfile invalidation is misaligned, or CDN still holds the response.',
    evidence: ['CDN and Dispatcher cache headers', 'Dispatcher logs and cached files', 'flush request and vhost matching', 'filter, ignoreUrlParams, and statfileslevel rules'],
    tradeOff: 'Aggressive caching improves scale and cost, but incorrect rules can expose private responses or serve stale business-critical content.',
    cloudService: 'Dispatcher and CDN configuration are version-controlled and deployed through Cloud Manager, with Cloud Service-specific validation and vhost requirements.',
    governance: 'Every public endpoint needs an owner, filter rule, cache decision, invalidation strategy, security review, and production test.',
  },
  Security: {
    core: 'AEM security is layered across identity, least-privilege repository access, service users, secure endpoints, HTL contexts, Dispatcher filters, secrets, and operational controls.',
    whyAndWhen: 'Security must be designed before release because a public AEM endpoint can expose repository data, authoring APIs, or privileged operations.',
    implementation: 'Use deny-by-default access, service-user mappings, minimal ACLs, authenticated resource-type endpoints, input validation, output encoding, and reviewed secret management.',
    enterpriseExample: 'A healthcare implementation separated public content delivery from protected member APIs and required threat modelling for every custom servlet and integration.',
    productionFailure: 'A path-based servlet or permissive Dispatcher rule exposes internal content or allows an unauthenticated write operation.',
    evidence: ['effective ACLs and service-user mapping', 'Dispatcher filter match', 'endpoint authentication and method handling', 'security scans and request logs'],
    tradeOff: 'Broad permissions and endpoints accelerate development but create unacceptable blast radius and audit risk.',
    cloudService: 'Cloud Service manages infrastructure security, while application teams remain responsible for code, ACLs, filters, secrets, dependencies, and content exposure.',
    governance: 'Security requires threat models, least-privilege reviews, dependency scanning, penetration testing, incident ownership, and evidence for audits.',
  },
  Performance: {
    core: 'AEM performance is an end-to-end property spanning browser assets, CDN, Dispatcher, Publish rendering, Sling Models, services, queries, repository indexes, and DAM delivery.',
    whyAndWhen: 'Optimization starts by identifying the slow layer with evidence rather than tuning code or infrastructure blindly.',
    implementation: 'Establish budgets and observability, measure cache hit ratio and response timings, profile uncached Publish requests, inspect queries, and optimize the highest-impact bottleneck.',
    enterpriseExample: 'A campaign site increased edge cacheability, removed a traversal query from a component, and moved image delivery to optimized renditions before a national launch.',
    productionFailure: 'Publish CPU and latency spike because a frequently rendered component performs an unindexed query and external call on every request.',
    evidence: ['CDN and Dispatcher cache-hit ratio', 'request timing and Publish metrics', 'thread dumps and logs', 'query plans, model timings, and browser waterfall'],
    tradeOff: 'Caching and precomputation improve scale, but must be balanced against freshness, personalization, invalidation complexity, and author expectations.',
    cloudService: 'Autoscaling helps absorb load but does not fix uncacheable URLs, inefficient queries, slow integrations, or oversized client-side payloads.',
    governance: 'Teams need measurable budgets, load tests, release comparisons, alert thresholds, capacity assumptions, and incident runbooks.',
  },
  'Cloud Manager': {
    core: 'Cloud Manager is the controlled delivery and governance path for AEM as a Cloud Service code, Dispatcher configuration, quality checks, and environment promotion.',
    whyAndWhen: 'It makes releases repeatable and auditable while enforcing code quality, security, performance, and deployment safeguards.',
    implementation: 'Use small reviewable releases, automated tests, environment variables and secrets, quality-gate remediation, deployment validation, and explicit rollback or forward-fix decisions.',
    enterpriseExample: 'A regulated enterprise used gated production pipelines, automated smoke tests, release evidence, and change approvals for every AEM Cloud Service deployment.',
    productionFailure: 'A production pipeline fails or a deployment degrades the site because a quality issue, environment dependency, Dispatcher rule, or incompatible content assumption was missed.',
    evidence: ['pipeline step and quality-gate output', 'deployment and application logs', 'environment variables and dependencies', 'post-deployment smoke and health checks'],
    tradeOff: 'Strict gates can slow urgent releases, but weakening them transfers risk into production where recovery is more expensive.',
    cloudService: 'Cloud Manager is part of the operating model, not only a deployment tool; it governs supported delivery into managed environments.',
    governance: 'Release policy should define branch strategy, approvals, test evidence, emergency handling, production validation, and incident rollback criteria.',
  },
  'AEM Cloud Service': {
    core: 'AEM as a Cloud Service is a continuously updated, managed AEM platform with immutable application deployments, managed scaling, cloud-native operations, and pipeline-driven configuration.',
    whyAndWhen: 'Teams adopt it to reduce infrastructure ownership and improve delivery, but must redesign unsupported customizations and operating practices.',
    implementation: 'Assess compatibility, externalize state, redesign deployment and configuration, validate Dispatcher and CDN behavior, automate testing, and create cloud-specific support runbooks.',
    enterpriseExample: 'A global organization migrated from AEM 6.5 by removing filesystem dependencies, redesigning integrations, rebuilding indexes, and rehearsing content transfer and cutover.',
    productionFailure: 'A legacy customization fails after migration because it assumes persistent local storage, manual server access, static topology, or mutable runtime configuration.',
    evidence: ['Cloud Manager and application logs', 'environment and deployment history', 'CDN and Dispatcher behavior', 'repository and content-transfer status'],
    tradeOff: 'The managed platform reduces infrastructure burden but requires stronger engineering discipline around supported patterns, observability, automation, and release readiness.',
    cloudService: 'Cloud Service implications are the core of the topic: continuous updates, autoscaling, immutable deployments, managed CDN, and restricted operational access.',
    governance: 'Cloud adoption needs compatibility ownership, release governance, update readiness, security review, support processes, and cost visibility.',
  },
  GraphQL: {
    core: 'AEM GraphQL exposes structured Content Fragment data through schemas generated from Content Fragment Models, typically delivered with persisted queries and edge caching.',
    whyAndWhen: 'Use it for governed headless delivery when consumers need structured content and flexible selection without page rendering.',
    implementation: 'Design stable models, publish fragments and references, use persisted queries, restrict endpoint exposure, monitor query cost, and coordinate schema evolution with consumers.',
    enterpriseExample: 'A sports platform delivered shared editorial content to web, mobile, and connected-TV clients through persisted queries cached at the edge.',
    productionFailure: 'A consumer receives missing fields or slow responses after a model change, unpublished reference, expensive query, or cache mismatch.',
    evidence: ['Content Fragment Model and generated schema', 'persisted-query definition and response', 'publication state and references', 'endpoint permissions, logs, and cache headers'],
    tradeOff: 'GraphQL gives consumers flexibility, but unrestricted queries and uncontrolled schema changes create performance, security, and compatibility risk.',
    cloudService: 'Persisted queries and CDN caching are central to performant AEM headless delivery in Cloud Service.',
    governance: 'Headless APIs require schema owners, compatibility policy, query review, access controls, observability, and consumer communication.',
  },
};

const topicCoverage: TopicCoverage[] = [
  {
    topic: 'Architecture',
    category: 'AEM Architecture',
    topicGroup: 'Fundamentals',
    relatedTopics: ['dispatcher', 'aem-cloud-service', 'content-architecture'],
    questions: [
      'How do you define failure boundaries and operational ownership across Author, Publish, Dispatcher, CDN, and Cloud Manager?',
      'How would you design AEM for a multi-brand enterprise website?',
      'What changes architecturally when moving from AEM 6.5 to AEM as a Cloud Service?',
      'How do you separate cacheable pages from personalized experiences?',
      'How do you design an AEM site for high traffic campaign launches?',
      'What are the responsibilities of Author, Publish, Dispatcher, CDN, and Cloud Manager?',
      'How would you design observability for an enterprise AEM implementation?',
      'What risks do you check before exposing a new servlet or endpoint?',
      'How do you design content ownership between code, content, and configuration?',
      'How do you explain AEM architecture to non-technical stakeholders?',
    ],
  },
  {
    topic: 'JCR',
    category: 'JCR',
    topicGroup: 'Fundamentals',
    relatedTopics: ['jcr', 'query-builder', 'permissions'],
    questions: [
      'What is JCR and how does AEM use it?',
      'Explain nodes, properties, mixins, and node types in JCR.',
      'How do you model content in JCR for reusable enterprise components?',
      'What is the difference between /apps, /content, /conf, and /libs?',
      'How do permissions affect JCR reads from Sling Models and services?',
      'What causes repository traversal warnings and how do you avoid them?',
      'How do you decide whether content belongs in pages, assets, Content Fragments, or /conf?',
      'How do you safely migrate JCR content between environments?',
      'What are common JCR anti-patterns in enterprise AEM projects?',
      'How do you debug missing or incorrect JCR properties in production?',
    ],
  },
  {
    topic: 'CRXDE',
    category: 'CRXDE',
    topicGroup: 'Fundamentals',
    relatedTopics: ['crxde', 'cloud-service', 'governance'],
    questions: [
      'What is CRXDE Lite used for in modern AEM projects?',
      'Why should CRXDE not be used for production hotfixes?',
      'How do you use CRXDE to inspect component dialogs and content nodes?',
      'How does CRXDE usage change in AEM as a Cloud Service?',
      'What should you do after discovering a repository issue in CRXDE?',
      'How do you inspect templates and policies using CRXDE?',
      'How do you debug missing clientlibs or component resources in CRXDE?',
      'What are the risks of editing /libs or /apps manually?',
      'How do you verify service user permissions from repository nodes?',
      'How do you explain CRXDE governance in a senior interview?',
    ],
  },
  {
    topic: 'Components',
    category: 'Components',
    topicGroup: 'Development',
    relatedTopics: ['components', 'sling-models', 'editable-templates'],
    questions: [
      'How do you design an enterprise AEM component?',
      'When should you extend Core Components instead of building from scratch?',
      'What belongs in HTL versus Sling Models versus OSGi services?',
      'How do policies control component behavior?',
      'How do you handle empty states and authoring experience?',
      'How do you make components cache-safe behind Dispatcher?',
      'How do you validate accessibility and analytics requirements in components?',
      'How do you debug a component that works on Author but not Publish?',
      'What are common component design anti-patterns?',
      'How do you design components for reuse across brands and locales?',
    ],
  },
  {
    topic: 'HTL',
    category: 'HTL',
    topicGroup: 'Development',
    relatedTopics: ['htl', 'security', 'sling-models'],
    questions: [
      'Why is HTL considered secure by default?',
      'When can HTL still become unsafe?',
      'How do you keep business logic out of HTL?',
      'How do data-sly-use, data-sly-list, and data-sly-test work?',
      'How do HTL display contexts prevent XSS?',
      'How do you debug HTL rendering failures on Publish?',
      'What are common HTL performance mistakes?',
      'How do you include clientlibs from HTL safely?',
      'How do you handle optional fields and empty markup in HTL?',
      'How do you explain HTL best practices in a senior interview?',
    ],
  },
  {
    topic: 'Sling',
    category: 'Sling',
    topicGroup: 'Development',
    relatedTopics: ['sling', 'resource-resolver', 'dispatcher'],
    questions: [
      'How does Sling resolve a request in AEM?',
      'What are selectors, extensions, and suffixes?',
      'What is sling:resourceType and why is it important?',
      'How does resourceSuperType support component inheritance?',
      'When should you register a servlet by resource type?',
      'Why are path-based servlets risky in enterprise AEM?',
      'How do Sling mappings and redirects affect request resolution?',
      'How do you debug 404 or wrong-component rendering issues?',
      'What is the difference between Resource and Page in Sling-based code?',
      'How do you explain Sling to a developer coming from MVC frameworks?',
    ],
  },
  {
    topic: 'Sling Models',
    category: 'Sling Models',
    topicGroup: 'Development',
    relatedTopics: ['sling-models', 'osgi', 'htl'],
    questions: [
      'What is a Sling Model?',
      'What are Adaptables in Sling Models?',
      'What is the difference between Resource and Request adaptable?',
      'Explain the @Model annotation.',
      'Explain injector types in Sling Models.',
      'What is the @Via annotation used for?',
      'What should you do in @PostConstruct?',
      'How does Sling Model Exporter work?',
      'How does optional injection strategy prevent production issues?',
      'Explain the Sling Model lifecycle.',
    ],
  },
  {
    topic: 'OSGi',
    category: 'OSGi',
    topicGroup: 'Development',
    relatedTopics: ['osgi', 'cloud-manager', 'sling-models'],
    questions: [
      'What is OSGi and why does AEM use it?',
      'How do services, components, and configurations work in OSGi?',
      'What is the difference between @Component and @Reference?',
      'How do you manage OSGi configuration per environment?',
      'How do run modes work in AEM as a Cloud Service?',
      'How do you debug an inactive bundle?',
      'How do you design an OSGi service for external API integration?',
      'What happens when a referenced service is unavailable?',
      'How do you secure secrets and credentials in OSGi configs?',
      'How do you explain OSGi dependency resolution in interviews?',
    ],
  },
  {
    topic: 'Templates',
    category: 'Templates',
    topicGroup: 'Content Management',
    relatedTopics: ['templates', 'editable-templates', 'policies'],
    questions: [
      'What is the difference between static and editable templates?',
      'What are template types in AEM?',
      'How do structure and initial content differ?',
      'How do policies control allowed components?',
      'How do you promote templates and policies across environments?',
      'How do you debug missing components in the authoring side panel?',
      'How do templates support enterprise governance?',
      'What are common template policy mistakes?',
      'How do you design templates for multi-brand sites?',
      'How do templates change in AEM as a Cloud Service projects?',
    ],
  },
  {
    topic: 'Content Fragments',
    category: 'Content Fragments',
    topicGroup: 'Content Management',
    relatedTopics: ['content-fragments', 'graphql', 'headless'],
    questions: [
      'What is a Content Fragment and when do you use it?',
      'How are Content Fragment Models designed?',
      'How do Content Fragments support headless delivery?',
      'How do you expose Content Fragments through GraphQL?',
      'How do you model reusable content for multiple channels?',
      'What are common Content Fragment governance mistakes?',
      'How do you migrate legacy page content into Content Fragments?',
      'How do permissions and folders affect Content Fragment authoring?',
      'How do you troubleshoot missing Content Fragment data on Publish?',
      'How do Content Fragments differ from Experience Fragments?',
    ],
  },
  {
    topic: 'Experience Fragments',
    category: 'Experience Fragments',
    topicGroup: 'Content Management',
    relatedTopics: ['experience-fragments', 'msm', 'templates'],
    questions: [
      'What is an Experience Fragment and when do you use it?',
      'How do Experience Fragments differ from Content Fragments?',
      'How do you use Experience Fragments for reusable page sections?',
      'How do variations work in Experience Fragments?',
      'How do Experience Fragments behave with localization and MSM?',
      'How do you publish Experience Fragments and dependencies?',
      'How do you debug stale or missing Experience Fragment content?',
      'What are common Experience Fragment anti-patterns?',
      'How do Experience Fragments impact caching?',
      'How do you govern Experience Fragments in enterprise authoring?',
    ],
  },
  {
    topic: 'Dispatcher',
    category: 'Dispatcher',
    topicGroup: 'Advanced',
    relatedTopics: ['dispatcher', 'cache', 'security'],
    questions: [
      'What is Dispatcher and why is it critical in AEM?',
      'How does Dispatcher caching work?',
      'How do cache invalidation and statfileslevel work?',
      'How do you debug content published but not visible?',
      'How do Dispatcher filters protect Publish?',
      'How do you handle query parameters with ignoreUrlParams?',
      'How do vhost rules affect cache flushing?',
      'How do CDN and Dispatcher caching interact?',
      'How do you design cache rules for personalized pages?',
      'What are common Dispatcher production issues?',
    ],
  },
  {
    topic: 'Security',
    category: 'Security',
    topicGroup: 'Advanced',
    relatedTopics: ['security', 'service-users', 'dispatcher'],
    questions: [
      'How do you secure an AEM Publish instance?',
      'Why should you use service users instead of admin sessions?',
      'How do Dispatcher filters reduce attack surface?',
      'How do you prevent XSS in AEM components?',
      'How do CORS and CSRF protections apply in AEM?',
      'How do permissions and ACLs affect content access?',
      'How do you secure custom servlets and endpoints?',
      'How do you handle secrets in AEM as a Cloud Service?',
      'How do you review AEM code for security risks?',
      'What are common AEM security mistakes in enterprise projects?',
    ],
  },
  {
    topic: 'Performance',
    category: 'Performance Tuning',
    topicGroup: 'Advanced',
    relatedTopics: ['performance-tuning', 'dispatcher', 'query-builder'],
    questions: [
      'How do you troubleshoot a slow AEM page?',
      'How do you separate CDN, Dispatcher, Publish, and browser performance issues?',
      'How do queries affect AEM performance?',
      'How do you identify a slow Sling Model?',
      'How do clientlibs impact page performance?',
      'How do image renditions and DAM assets affect performance?',
      'How do you measure cache hit ratio?',
      'How do you tune AEM for campaign traffic spikes?',
      'What are common performance anti-patterns in AEM components?',
      'How do you set performance budgets for an AEM project?',
    ],
  },
  {
    topic: 'Cloud Manager',
    category: 'Cloud Manager',
    topicGroup: 'Cloud Service',
    relatedTopics: ['cloud-manager', 'deployment', 'quality-gates'],
    questions: [
      'What is Cloud Manager in AEM as a Cloud Service?',
      'How does a Cloud Manager pipeline work?',
      'What are quality gates and why do they matter?',
      'How do you debug a failed Cloud Manager deployment?',
      'How do environment variables and secrets work in Cloud Manager?',
      'How do you promote code across Dev, Stage, and Production?',
      'How do Dispatcher and CDN configs deploy through Cloud Manager?',
      'What is the role of automated tests in Cloud Manager?',
      'How do you plan release governance with Cloud Manager?',
      'How do you explain Cloud Manager to operations stakeholders?',
    ],
  },
  {
    topic: 'AEM Cloud Service',
    category: 'AEM Cloud Service',
    topicGroup: 'Cloud Service',
    relatedTopics: ['aem-cloud-service', 'cloud-manager', 'dispatcher'],
    questions: [
      'What is different in AEM as a Cloud Service compared with AEM 6.5?',
      'What does immutable infrastructure mean in AEM Cloud Service?',
      'How do deployments work in AEM Cloud Service?',
      'How does autoscaling affect architecture decisions?',
      'How do you handle repository changes in Cloud Service?',
      'What observability and support model do teams need when direct server access is unavailable?',
      'How do CDN, Dispatcher, and Publish work in Cloud Service?',
      'How do you migrate existing AEM projects to Cloud Service?',
      'What are Cloud Service development anti-patterns?',
      'How do you design a Cloud-ready AEM implementation?',
    ],
  },
  {
    topic: 'GraphQL',
    category: 'GraphQL',
    topicGroup: 'Cloud Service',
    relatedTopics: ['graphql', 'content-fragments', 'headless'],
    questions: [
      'How does GraphQL work in AEM?',
      'How do Content Fragment Models affect GraphQL schemas?',
      'How do you expose Content Fragments through GraphQL endpoints?',
      'How do you secure GraphQL endpoints in AEM?',
      'How do persisted queries improve GraphQL delivery?',
      'How do you debug missing fields in GraphQL responses?',
      'How do you design GraphQL for multi-channel content?',
      'How do GraphQL caching and CDN strategy work together?',
      'What are common GraphQL anti-patterns in AEM?',
      'How do you compare AEM GraphQL with traditional page rendering?',
    ],
  },
];

function toQuestionId(topic: string, index: number) {
  return `aem-${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}`;
}

function detectQuestionIntent(question: string): QuestionIntent {
  const value = question.toLowerCase();

  if (/(migrat|moving from|move from|legacy)/.test(value)) return 'migration';
  if (/(debug|troubleshoot|missing|stale|not visible|fail|inactive|unavailable|production issue|wrong-component|404)/.test(value)) return 'troubleshooting';
  if (/(secure|security|permission|acl|secret|credential|xss|csrf|cors|attack|risk|exposing)/.test(value)) return 'security';
  if (/(performance|slow|traffic|cache|scal|latency|query|rendition)/.test(value)) return 'performance';
  if (/(design|architecture|multi-brand|multi-channel|govern|ownership|stakeholder|high traffic|release governance)/.test(value)) return 'architecture';
  if (/(difference|differ|instead|compare|versus| vs |author and publish)/.test(value)) return 'comparison';
  if (/(how do|how does|work|use|handle|manage|expose|include|promote|publish|register)/.test(value)) return 'implementation';
  return 'concept';
}

function elevateCoverageQuestion(question: string, intent: QuestionIntent): string {
  const trimmed = question.trim();
  const wordCount = trimmed.split(/\s+/).length;

  if (/^What is /i.test(trimmed) && wordCount <= 9) {
    return `${trimmed.replace(/\?$/, '')}, and what implementation or production risk would you discuss before using it in an enterprise AEM project?`;
  }

  if (intent === 'concept' && /^Explain /i.test(trimmed) && wordCount <= 9) {
    return `${trimmed.replace(/\.$/, '')}. Include the practical use case, failure mode, and enterprise trade-off.`;
  }

  return trimmed;
}

function getIntentQuestionType(intent: QuestionIntent): string {
  const questionTypes: Record<QuestionIntent, string> = {
    concept: 'Conceptual Questions',
    implementation: 'Scenario-Based Questions',
    comparison: 'Architecture Questions',
    troubleshooting: 'Debugging Questions',
    architecture: 'Architecture Questions',
    security: 'Security Questions',
    performance: 'Performance Questions',
    migration: 'Migration Questions',
  };

  return questionTypes[intent];
}

function formatEvidence(items: string[]): string {
  if (items.length <= 1) return items[0] ?? 'runtime evidence';
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

function getQuestionSpecificGuidance(question: string, profile: TopicQualityProfile): string {
  const value = question.toLowerCase();
  const designConcern = question.match(/for (.+?)\? Explain the enterprise trade-offs/i)?.[1];
  const incidentConcern = question.match(/weakness in (.+?)\. How would you diagnose/i)?.[1];
  const coverageGapConcern = question.match(/^How would you approach (.+?) in .+?\? Include operational constraints/i)?.[1];

  if (designConcern) {
    return `For ${designConcern}, start from the business and operational constraints, then apply this implementation pattern: ${profile.implementation} Make the trade-off explicit: ${profile.tradeOff}`;
  }

  if (incidentConcern) {
    return `For an incident involving ${incidentConcern}, preserve evidence, isolate the owning layer using ${formatEvidence(profile.evidence)}, apply the smallest durable fix, and convert the root cause into monitoring, testing, or governance that prevents recurrence.`;
  }

  if (coverageGapConcern) {
    return `For ${coverageGapConcern}, begin with the supported implementation pattern and its operating constraints: ${profile.implementation} Validate the decision against ${formatEvidence(profile.evidence)}, define the likely failure modes, and make this trade-off explicit: ${profile.tradeOff}`;
  }

  const rules: Array<[RegExp, string]> = [
    [/author.*publish.*dispatcher.*cdn/, 'Author is the protected editorial tier, Publish renders approved content, Dispatcher filters and caches Publish responses, and CDN serves cacheable responses at the edge. The architecture succeeds only when most anonymous traffic avoids Publish.'],
    [/multi-brand/, 'Use a shared platform and governed component foundation, then isolate brand-specific policies, design tokens, content roots, permissions, domains, and release ownership. Avoid cloning entire codebases because every duplicate becomes an upgrade and support liability.'],
    [/high traffic campaign/, 'Design the campaign so CDN and Dispatcher serve the dominant anonymous traffic, remove request-time queries and external calls, load-test realistic URLs, define degradation behavior, and rehearse cache warming and incident response before launch.'],
    [/observability/, 'Instrument the delivery path from CDN through Dispatcher and Publish, correlate requests with deployments and content changes, define service-level indicators, and alert on user-impact signals such as error rate, latency, cache hit ratio, and publication delay.'],
    [/new servlet|new endpoint|exposing a.*endpoint/, 'Before exposing an endpoint, review authentication, authorization, allowed methods, input validation, output data, CSRF or CORS needs, Dispatcher filters, cacheability, rate limits, observability, and an accountable owner.'],
    [/content ownership/, 'Code owns stable application behavior, authored content owns business-managed information, and configuration owns governed environment or contextual behavior. Ambiguous ownership creates unsafe production edits and inconsistent promotion between environments.'],
    [/\/apps.*\/content.*\/conf.*\/libs/, '/apps contains application code, /content holds authored content, /conf contains editable-template and contextual configuration, and /libs is Adobe-owned product code that must not be modified.'],
    [/safely migrate jcr|migrate jcr/, 'Treat repository migration as a versioned data change: inventory paths and dependencies, transform idempotently, validate permissions and references, rehearse at production scale, and define restart, rollback, and reconciliation behavior.'],
    [/jcr anti-pattern/, 'Common repository anti-patterns include deep unbounded trees, application state stored as ad hoc content, duplicated structures, broad queries, excessive same-name siblings, and paths or properties with no ownership or lifecycle policy.'],
    [/missing or incorrect jcr propert/, 'Compare the resource path and effective properties on Author and Publish, check inheritance and defaults, confirm publication, and verify that the model reads the intended resource rather than masking the issue with optional injection.'],
    [/resource and request adaptable/, 'Use a Resource adaptable when the model depends only on repository content and should be reusable outside an HTTP request. Use SlingHttpServletRequest only when request attributes, bindings, selectors, or request-specific injectors are genuinely required.'],
    [/@model annotation/, '@Model registers the class as a Sling Model and declares its adaptables, adapters, resource type, injection strategy, and optional exporter behavior. A wrong adaptable or unregistered bundle commonly causes adaptation to return null.'],
    [/injector/, 'Sling Model injectors resolve values from sources such as ValueMap properties, child resources, OSGi services, script variables, requests, and resource paths. Prefer explicit injectors so reviewers can see the dependency and failure behavior.'],
    [/@via/, '@Via changes the object or property path used during injection, such as adapting through the current resource, a child resource, or a resource-supertype path. Use it deliberately because hidden indirection can make models difficult to debug.'],
    [/@postconstruct/, '@PostConstruct runs after injection and should perform lightweight validation or derived-value preparation. It should not execute slow queries, remote calls, or broad repository work on every render.'],
    [/model exporter/, 'Sling Model Exporter serializes an approved model adapter, commonly through Jackson, into JSON for component or headless consumption. The exported contract must be stable, secured, tested, and free from accidental internal data exposure.'],
    [/optional injection/, 'Optional injection prevents adaptation failure for legitimately optional content, but making every field optional hides broken authoring contracts. Required business fields should fail visibly or produce an explicit controlled state.'],
    [/sling model lifecycle/, 'A model is created for an adaptation request, injectors resolve dependencies, @PostConstruct runs, and the adapted object is returned or adaptation fails. Models should be treated as short-lived and stateless.'],
    [/statfileslevel/, 'Dispatcher invalidation removes or marks cached content stale after publication. statfileslevel controls the directory depth where .stat timestamps invalidate descendants, so the value directly affects invalidation breadth and cache efficiency.'],
    [/ignoreurlparams/, 'ignoreUrlParams determines which query parameters may still use the same cached response. Allowing unknown parameters can create cache fragmentation, while ignoring a parameter that changes content can serve the wrong response.'],
    [/vhost/, 'Dispatcher vhosts determine which farm and cache rules handle a hostname. Flush requests and live requests must resolve to the intended vhost or invalidation and filtering can target the wrong cache.'],
    [/dispatcher filters/, 'Dispatcher filters should deny by default and allow only required paths, selectors, extensions, methods, and query patterns. They protect Publish from direct access to internal or dangerous endpoints.'],
    [/cdn and dispatcher/, 'CDN is the edge cache and Dispatcher is the origin-side cache and request filter. Troubleshooting must identify which layer served the response by inspecting cache headers, age, vhost behavior, and direct Publish output.'],
    [/published but not visible/, 'Check the page and referenced dependencies on Publish first, then prove whether Dispatcher or CDN serves stale content. Do not start with a full cache clear because it destroys evidence and can create avoidable load.'],
    [/traversal/, 'Traversal occurs when Oak cannot use an appropriate index and scans repository nodes. Confirm the query plan, query shape, path restriction, property cardinality, and index before changing code or adding an index.'],
    [/content fragment model/, 'A Content Fragment Model defines the structured content contract and therefore drives authoring fields, references, validation, GraphQL schema, and consumer compatibility. Model changes should be governed like API changes.'],
    [/persisted quer/, 'Persisted queries store approved GraphQL queries server-side and expose cache-friendly GET endpoints. They improve security, performance, CDN caching, and operational predictability compared with unrestricted client-supplied queries.'],
    [/quality gate/, 'Cloud Manager quality gates stop risky code from progressing by evaluating code quality, security, performance, test, and deployment criteria. Teams should fix the underlying issue rather than normalizing overrides.'],
    [/immutable infrastructure/, 'Immutable infrastructure means application code and supported configuration change through versioned deployments, not direct server edits. Production fixes must be reproducible through the pipeline.'],
    [/autoscaling/, 'Autoscaling adds or removes managed capacity, but it does not correct uncacheable pages, traversal queries, slow integrations, session coupling, or mutable local state. Architecture must remain stateless and cache-efficient.'],
    [/without direct server access/, 'Use centralized logs, environment and deployment history, repository or content diagnostics, response headers, health checks, and reproducible lower-environment tests. The support model must not depend on logging into a server.'],
    [/service user/, 'A service user gives a specific backend capability the minimum repository permissions it needs through a service-user mapping. It replaces administrative sessions and makes access reviewable and testable.'],
    [/path-based servlet/, 'Path-based servlets bypass resource context and are easier to expose accidentally. Resource-type servlets align request handling with content, permissions, selectors, and Dispatcher rules.'],
    [/author but not publish|works on author|author.*not publish/, 'Compare the exact content, policies, permissions, bundles, services, and configuration on Author and Publish. Then inspect whether the implementation relies on author-only APIs, unpublished dependencies, or cache behavior.'],
    [/display context/, 'HTL display contexts encode output for its destination such as text, attribute, URI, JavaScript, CSS, or HTML. Overriding the context without validating the content source can reintroduce XSS risk.'],
    [/inactive bundle/, 'An inactive bundle usually indicates unresolved package imports, missing dependencies, activation errors, or incompatible versions. Start with bundle and component diagnostics, then fix the dependency rather than repeatedly restarting it.'],
    [/environment variables and secrets/, 'Use supported Cloud Manager environment variables and secret mechanisms, keep credentials out of source control and logs, scope them per environment, and plan rotation without code changes.'],
    [/failed cloud manager deployment|failed.*cloud manager|debug a failed.*deployment/, 'Start with the failing pipeline phase and its first actionable error, then determine whether the cause is code quality, tests, dependency resolution, Dispatcher validation, environment configuration, deployment health, or post-deployment verification. Fix the source issue and rerun with evidence; do not bypass the gate blindly.'],
    [/cloud manager pipeline/, 'A Cloud Manager pipeline builds and validates the code, runs quality and security checks, deploys immutable artifacts and configuration, then performs environment-specific validation. Production pipelines should include approvals, smoke tests, and a clear recovery decision.'],
    [/promote code across dev.*stage.*production/, 'Promote the same reviewed artifact through environments, vary only approved environment configuration, capture test evidence at each stage, and avoid rebuilding or manually changing the artifact between Stage and Production.'],
    [/repository changes in cloud service/, 'Separate authored content changes from application, configuration, ACL, and index changes. Authors publish content through supported workflows; code-owned repository structures, indexes, and immutable configuration move through versioned packages and Cloud Manager.'],
    [/static and editable templates/, 'Static templates are code-defined and rigid. Editable templates separate template type, structure, initial content, and policies so authorized template authors can govern page types without rebuilding the entire template in code.'],
    [/structure and initial content/, 'Template structure defines controlled content that appears on every page and can be locked. Initial content is copied when a page is created and can then diverge per page.'],
    [/polic/, 'Policies configure component behavior and allowed options at the template level without duplicating component code. Missing or inconsistent policies are a common reason Author and Publish render differently.'],
    [/content fragments differ from experience fragments|experience fragments differ from content fragments/, 'Content Fragments are structured, presentation-neutral content for reuse across channels. Experience Fragments are reusable, presentation-aware sections with layouts and variations.'],
    [/graphql caching|caching and cdn/, 'Use persisted-query GET endpoints, stable URLs, explicit cache headers, publication-aware invalidation, and query-cost controls so CDN can cache safe GraphQL responses without serving stale or private data.'],
    [/secure graphql/, 'Expose only approved GraphQL and persisted-query endpoints, enforce content permissions, deny unnecessary methods and paths at Dispatcher, constrain query complexity, avoid leaking sensitive model fields, and monitor abuse and cache behavior.'],
    [/missing fields in graphql/, 'Check whether the field exists in the published Content Fragment Model and generated schema, whether fragments and references contain and publish the value, and whether the persisted query and CDN cache still use an older contract.'],
    [/graphql.*multi-channel|multi-channel.*graphql/, 'Design Content Fragment Models around durable business entities and expose stable persisted queries for consumer use cases. Keep channel presentation outside the canonical content model and govern schema evolution across consumers.'],
    [/slow sling model/, 'Measure model execution, then inspect injectors, @PostConstruct work, queries, child-resource iteration, and external service calls. A model invoked on every render must not hide expensive operations.'],
    [/cache hit ratio/, 'Measure cache hit ratio separately at CDN and Dispatcher using response headers and request metrics. A low ratio usually points to URL variation, headers, personalization, invalidation, or cache-rule design.'],
  ];

  return rules.find(([pattern]) => pattern.test(value))?.[1] ?? `${profile.core} ${profile.implementation}`;
}

function getIntentShortAnswer(question: string, intent: QuestionIntent, profile: TopicQualityProfile): string {
  const directAnswer = getQuestionSpecificGuidance(question, profile);

  if (intent === 'troubleshooting') {
    return `${directAnswer} Start by proving which layer owns the failure using ${formatEvidence(profile.evidence.slice(0, 2))}; then implement the smallest durable fix and a regression check.`;
  }

  if (intent === 'architecture') {
    return `${directAnswer} The design should be justified against enterprise scale, ownership, operability, and failure isolation. ${profile.tradeOff}`;
  }

  if (intent === 'security') {
    return `${directAnswer} Apply least privilege and deny-by-default controls, then verify effective behavior through ${formatEvidence(profile.evidence.slice(0, 2))}.`;
  }

  if (intent === 'performance') {
    return `${directAnswer} Measure before changing the design, isolate the slow or uncacheable layer, and validate the result with production-like traffic and ${formatEvidence(profile.evidence.slice(0, 2))}.`;
  }

  if (intent === 'migration') {
    return `${directAnswer} A safe migration inventories unsupported behavior, redesigns the operating model, rehearses data and code movement, and validates rollback or forward-fix criteria.`;
  }

  if (intent === 'comparison') {
    return `${directAnswer} Compare the options by authoring experience, runtime behavior, security, cacheability, delivery ownership, and long-term governance.`;
  }

  if (intent === 'implementation') {
    return `${directAnswer} The implementation is complete only when production behavior, failure handling, and ownership are validated.`;
  }

  return `${directAnswer} ${profile.whyAndWhen}`;
}

function getIntentDetailedAnswer(question: string, intent: QuestionIntent, profile: TopicQualityProfile): string[] {
  const intentSpecific: Record<QuestionIntent, string> = {
    concept: `When: ${profile.whyAndWhen}`,
    implementation: `How: ${profile.implementation}`,
    comparison: `Decision criteria: ${profile.tradeOff}`,
    troubleshooting: `Troubleshooting path: inspect ${profile.evidence.join(', ')}, isolate the owning layer, reproduce safely, and validate the smallest durable fix.`,
    architecture: `Architecture decision: ${profile.tradeOff}`,
    security: `Security review: verify least privilege and inspect ${profile.evidence.join(', ')} before approving the design.`,
    performance: `Performance method: establish a baseline, inspect ${profile.evidence.join(', ')}, change one bottleneck, then compare results.`,
    migration: `Migration method: ${profile.cloudService}`,
  };

  return [
    `Direct answer: ${getQuestionSpecificGuidance(question, profile)}`,
    `What: ${profile.core}`,
    `Why: ${profile.whyAndWhen}`,
    intentSpecific[intent],
    `Production and Cloud Service: ${profile.cloudService}`,
    `Governance and ownership: ${profile.governance}`,
  ];
}

function buildCoverageQuestion(coverage: TopicCoverage, question: string, index: number, rankSeed: number): InterviewPrepQuestion {
  const difficultyIndex = index % 10;
  const difficultyLevel: InterviewPrepQuestion['difficultyLevel'] = difficultyIndex < 3 ? 'Beginner' : difficultyIndex < 7 ? 'Intermediate' : difficultyIndex < 9 ? 'Advanced' : 'Architect';
  const experienceLevel: InterviewPrepQuestion['experienceLevel'] = difficultyIndex < 3 ? 'beginner' : difficultyIndex < 6 ? 'mid' : difficultyIndex < 9 ? 'senior' : 'architect';
  const profile = topicQualityProfiles[coverage.profileTopic ?? coverage.topic] ?? topicQualityProfiles.Architecture;
  const intent = detectQuestionIntent(question);
  const elevatedQuestion = elevateCoverageQuestion(question, intent);

  return {
    id: toQuestionId(coverage.topic, index),
    technologyId: 'aem',
    topicGroup: coverage.topicGroup,
    category: coverage.category,
    questionType: question.startsWith('A production incident')
      ? 'Real Incident Questions'
      : getIntentQuestionType(intent),
    question: elevatedQuestion,
    shortAnswer: getIntentShortAnswer(question, intent, profile),
    detailedAnswer: getIntentDetailedAnswer(question, intent, profile),
    realProjectExample: profile.enterpriseExample,
    productionScenario: `${profile.productionFailure} A senior response starts with ${profile.evidence[0]}, correlates it with ${profile.evidence[1]}, and validates a targeted fix plus rollback or forward-fix criteria.`,
    commonMistakes: [
      `Answering the ${coverage.topic} question as a definition without stating the decision, evidence, or failure mode.`,
      `Ignoring the central trade-off: ${profile.tradeOff}`,
      'Proposing a broad production action before proving which layer owns the issue.',
      `Skipping Cloud Service implications: ${profile.cloudService}`,
    ],
    followUpQuestions: [
      `Which production evidence would prove your ${coverage.topic} diagnosis before you change anything?`,
      `What would you implement differently for ${coverage.topic} in AEM as a Cloud Service?`,
      `What trade-off would make you reject the proposed ${coverage.topic} design?`,
      `How would you govern and support this ${coverage.topic} decision after go-live?`,
    ],
    interviewerExpectation: `The interviewer is testing whether you can turn ${coverage.topic} knowledge into a defensible enterprise decision. A strong answer explains what, why, when, and how, then names evidence, failure modes, trade-offs, Cloud Service impact, and operational ownership.`,
    frequencyScore: 0,
    commonWrongAnswer: `A weak answer describes ${coverage.topic} in isolation, recommends a broad fix, and does not name the evidence, trade-off, Cloud Service constraint, or production owner.`,
    architectPerspective: `Treat ${coverage.topic} as an enterprise capability across scalability, security, performance, governance, cost, Cloud Service readiness, and blast radius. ${profile.governance}`,
    keyTakeaway: `Connect ${coverage.topic} decisions to evidence, trade-offs, Cloud Service behavior, and accountable production ownership.`,
    difficultyLevel,
    experienceLevel,
    relatedTopics: coverage.relatedTopics,
    isMostAsked: index < 4,
    mostAskedRank: rankSeed + index,
    isRapidRevision: index < 2,
    roleAnswers: {
      junior: `I explain the purpose of ${coverage.topic}, where it is used, and the supported implementation pattern: ${profile.implementation}`,
      mid: `I describe the implementation, test Author and Publish behavior, and validate the result using ${formatEvidence(profile.evidence.slice(0, 2))}.`,
      senior: `I start from the failure mode or business requirement, isolate risk with production evidence, explain ${profile.tradeOff}, and define a durable fix with operational ownership.`,
      architect: `I treat ${coverage.topic} as an enterprise decision across scalability, security, performance, governance, cost, Cloud Service readiness, and blast radius. ${profile.governance}`,
    },
  };
}

function withTopicCoverage(existingQuestions: InterviewPrepQuestionDraft[]): InterviewPrepQuestionDraft[] {
  const result = [...existingQuestions];
  let rankSeed = 100;

  for (const coverage of topicCoverage) {
    const existingCount = result.filter((item) => item.category === coverage.category).length;
    const needed = Math.max(0, 10 - existingCount);
    if (needed === 0) continue;

    const existingTitles = new Set(result.filter((item) => item.category === coverage.category).map((item) => item.question));
    const additions = coverage.questions
      .filter((question) => !existingTitles.has(question))
      .slice(0, needed)
      .map((question, index) => buildCoverageQuestion(coverage, question, existingCount + index, rankSeed));

    result.push(...additions);
    rankSeed += 20;
  }

  for (const seed of [...aemEnterpriseQuestionSeeds, ...aemCoverageGapQuestionSeeds]) {
    const existingTitles = new Set(result.filter((item) => item.category === seed.category).map((item) => item.question));
    if (existingTitles.has(seed.question)) continue;

    const existingCount = result.filter((item) => item.category === seed.category).length;
    result.push(buildCoverageQuestion(
      {
        topic: seed.topic,
        category: seed.category,
        topicGroup: seed.topicGroup,
        profileTopic: seed.profileTopic,
        relatedTopics: seed.relatedTopics,
        questions: [seed.question],
      },
      seed.question,
      existingCount,
      rankSeed,
    ));
    rankSeed += 1;
  }

  return result;
}

const difficultyOrder: Record<InterviewPrepQuestion['difficultyLevel'], number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Architect: 4,
};

const mostAskedFrequencyScores = [96, 94, 92, 90, 88, 86, 84, 82, 80, 78];

function getQuestionSignalScore(question: InterviewPrepQuestionDraft): number {
  const typeScores: Record<string, number> = {
    'Real Incident Questions': 900,
    'Production Support Questions': 850,
    'Production Issues': 825,
    'Troubleshooting Questions': 800,
    'Debugging Questions': 775,
    'Architecture Questions': 750,
    'Cloud Service Questions': 725,
    'Migration Questions': 700,
    'Security Questions': 675,
    'Performance Questions': 650,
    'Scenario-Based Questions': 625,
    'Practical Questions': 575,
    'Conceptual Questions': 250,
  };
  const difficultyScores: Record<InterviewPrepQuestion['difficultyLevel'], number> = {
    Beginner: 150,
    Intermediate: 400,
    Advanced: 500,
    Architect: 450,
  };
  const practicalPromptScore = /\b(debug|diagnos|design|incident|production|migrat|secure|scale|performance|trade-off|govern|failure|stale|slow)\b/i.test(question.question)
    ? 250
    : 0;

  return (question.isMostAsked ? 10000 : 0)
    + (question.isRapidRevision ? 1200 : 0)
    + Math.max(0, 1000 - (question.mostAskedRank ?? 1000))
    + (typeScores[question.questionType] ?? 400)
    + difficultyScores[question.difficultyLevel]
    + practicalPromptScore;
}

function getStandardFrequencyScore(question: InterviewPrepQuestionDraft): number {
  const difficultyBase: Record<InterviewPrepQuestion['difficultyLevel'], number> = {
    Beginner: 62,
    Intermediate: 70,
    Advanced: 73,
    Architect: 68,
  };
  const practicalBoost = /Incident|Production|Troubleshooting|Debugging|Architecture|Cloud Service/.test(question.questionType) ? 4 : 0;
  return Math.min(77, difficultyBase[question.difficultyLevel] + practicalBoost);
}

function normalizeQuestionBank(drafts: InterviewPrepQuestionDraft[]): InterviewPrepQuestion[] {
  return Array.from(new Set(drafts.map((question) => question.category))).flatMap((category) => {
    const topicQuestions = drafts.filter((question) => question.category === category);
    const rankedQuestions = [...topicQuestions].sort((a, b) => (
      getQuestionSignalScore(b) - getQuestionSignalScore(a)
      || (a.mostAskedRank ?? 9999) - (b.mostAskedRank ?? 9999)
      || a.question.localeCompare(b.question)
    ));
    const mostAskedRanks = new Map(
      rankedQuestions.slice(0, Math.min(10, rankedQuestions.length))
        .map((question, index) => [question.id, index + 1]),
    );

    return topicQuestions.map((question): InterviewPrepQuestion => {
      const mostAskedRank = mostAskedRanks.get(question.id);
      return {
        ...question,
        frequencyScore: mostAskedRank
          ? mostAskedFrequencyScores[mostAskedRank - 1]
          : question.frequencyScore || getStandardFrequencyScore(question),
        commonWrongAnswer: question.commonWrongAnswer
          ?? question.commonMistakes[0]
          ?? `Describing ${question.category} without explaining the production decision, evidence, or trade-off.`,
        architectPerspective: question.architectPerspective ?? question.roleAnswers.architect,
        keyTakeaway: question.keyTakeaway
          ?? `Answer ${question.category} questions with a direct explanation, production evidence, trade-offs, and Cloud Service implications.`,
        isMostAsked: Boolean(mostAskedRank),
        mostAskedRank,
        isRapidRevision: Boolean(mostAskedRank && mostAskedRank <= 5),
      };
    });
  });
}

const questions: InterviewPrepQuestion[] = normalizeQuestionBank(withTopicCoverage(baseQuestions))
  .sort((a, b) => (
    a.category.localeCompare(b.category)
    || (a.mostAskedRank ?? 9999) - (b.mostAskedRank ?? 9999)
    || difficultyOrder[a.difficultyLevel] - difficultyOrder[b.difficultyLevel]
    || a.question.localeCompare(b.question)
  ));

const topicGroups = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    description: 'Core AEM vocabulary and request/content model foundations.',
    topics: ['AEM Architecture', 'JCR', 'CRXDE'],
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Daily implementation topics that developer and senior developer rounds test heavily.',
    topics: ['Components', 'Templates', 'Editable Templates', 'HTL', 'Sling', 'Sling Models', 'OSGi', 'Client Libraries', 'SEO in AEM', 'Accessibility', 'Testing'],
  },
  {
    id: 'content-management',
    title: 'Content Management',
    description: 'Reusable content, localization, rollout, and authoring operations.',
    topics: ['Content Fragments', 'Experience Fragments', 'Content Policies', 'MSM', 'Workflows', 'Launches', 'Translation', 'DAM', 'Assets'],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Performance, security, access, search, and operational hardening topics.',
    topics: ['Dispatcher', 'Dispatcher Caching', 'Apache Configuration', 'CDN', 'Query Builder', 'Security', 'Performance Tuning', 'Service Users', 'Resource Resolver', 'JCR SQL2'],
  },
  {
    id: 'cloud-service',
    title: 'Cloud Service',
    description: 'AEM as a Cloud Service delivery, Cloud Manager, GraphQL, and Edge-era architecture.',
    topics: ['AEM Cloud Service', 'Cloud Manager', 'GraphQL', 'Edge Delivery Services'],
  },
  {
    id: 'production-support',
    title: 'Production Support',
    description: 'Incident-style readiness for live-site support and escalation rounds.',
    topics: ['Production Support', 'Troubleshooting', 'Replication', 'Publishing Issues', 'Replication Issues', 'Cache Issues', 'Deployment Issues', 'Monitoring', 'Logging'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'Lead and architect-level thinking for enterprise programs.',
    topics: ['Integration Patterns', 'Headless AEM', 'Multi Site Manager', 'Multi Brand Architecture', 'Multi Region Architecture', 'Migration', 'Upgrade Projects', 'Multi-site Design', 'Content Architecture', 'Cloud Migration', 'Enterprise Governance', 'Governance'],
  },
];

const productionScenarios = [
  {
    id: 'content-published-not-visible',
    title: 'Content published but not visible',
    topic: 'Publishing Issues',
    problem: 'Business confirms a page was published, but the live URL still shows old content.',
    rootCauseAnalysis: [
      'The page may not be published to the correct environment.',
      'Referenced assets, Content Fragments, Experience Fragments, templates, or policies may still be unpublished.',
      'Dispatcher or CDN may still be serving stale content.',
      'The request may be hitting a different domain, vhost, or environment than expected.',
    ],
    troubleshootingSteps: [
      'Verify content state on Author and Publish separately.',
      'Check referenced content dependencies and publish them if needed.',
      'Inspect response headers for CDN/Dispatcher cache age and cache-control values.',
      'Republish the affected page and dependencies before considering broad cache invalidation.',
    ],
    expectedInterviewAnswer: 'I would isolate the layer first: Author state, Publish state, dependencies, Dispatcher cache, CDN cache, and URL/environment mismatch.',
    seniorApproach: 'A senior developer avoids blind full-cache clears and uses headers, direct Publish checks, and dependency publishing to find the exact stale layer.',
    architectApproach: 'An architect defines publishing checklists, cache policy, dependency tracking, and support runbooks so this is diagnosable during launch windows.',
    relatedQuestions: ['aem-dispatcher-stale-content', 'aem-architecture-author-publish-dispatcher'],
  },
  {
    id: 'dispatcher-cache-not-clearing',
    title: 'Dispatcher cache not clearing',
    topic: 'Cache Issues',
    problem: 'Publishing succeeds but Dispatcher keeps serving cached HTML.',
    rootCauseAnalysis: [
      'Flush/invalidation request may not match the correct vhost.',
      'statfileslevel may be too broad or too narrow for the content tree.',
      'CDN may serve an older response even after Dispatcher invalidation.',
      'Personalized or query-parameter-heavy URLs may create unexpected cache variants.',
    ],
    troubleshootingSteps: [
      'Confirm the request reaches the expected Dispatcher vhost.',
      'Check vhost aliases for localhost, 127.0.0.1, *.local, *.adobeaemcloud.com, and *.adobeaemcloud.net in Cloud Service.',
      'Inspect cache files and response headers.',
      'Review ignoreUrlParams and Cache-Control policy.',
    ],
    expectedInterviewAnswer: 'I would prove whether the stale response is coming from CDN, Dispatcher, or Publish, then inspect invalidation and vhost matching.',
    seniorApproach: 'A senior answer includes statfileslevel, vhost aliases, query parameters, response headers, and safe invalidation scope.',
    architectApproach: 'An architect discusses cache design as architecture: URL strategy, content dependencies, cache headers, edge behavior, and launch/runbook readiness.',
    relatedQuestions: ['aem-dispatcher-stale-content', 'aem-performance-tuning-slow-page'],
  },
  {
    id: 'replication-queue-blocked',
    title: 'Replication or publication queue blocked',
    topic: 'Replication Issues',
    problem: 'Authors publish content, but publication jobs queue up and live content is delayed.',
    rootCauseAnalysis: [
      'A target endpoint may be unavailable or rejecting jobs.',
      'A workflow or launcher may be flooding publication-related processing.',
      'A large asset/content rollout may be overwhelming processing queues.',
      'Custom workflow or event-handler code may be failing repeatedly.',
    ],
    troubleshootingSteps: [
      'Inspect queue status and failing payload paths.',
      'Check logs for first failing job, not only the latest retry.',
      'Pause broad launchers if they are flooding the system.',
      'Retry or clear jobs only after understanding payload impact.',
    ],
    expectedInterviewAnswer: 'I would inspect queues, identify the first failing payload, check logs and launchers, and avoid blindly clearing jobs.',
    seniorApproach: 'A senior developer distinguishes queue symptom from root cause and communicates business impact by affected content path and environment.',
    architectApproach: 'An architect plans queue monitoring, bulk-operation windows, rollout strategy, and escalation paths for publishing incidents.',
    relatedQuestions: ['aem-workflow-backlog', 'aem-msm-rollout-localization'],
  },
  {
    id: 'slow-page-rendering',
    title: 'Slow page rendering',
    topic: 'Performance Tuning',
    problem: 'A page becomes slow or Publish CPU spikes after a release.',
    rootCauseAnalysis: [
      'Dispatcher/CDN cache hit ratio may be low.',
      'Components may run expensive queries or API calls during rendering.',
      'Queries may be unindexed or unbounded.',
      'Clientlibs, images, or third-party scripts may create browser-side slowness.',
    ],
    troubleshootingSteps: [
      'Separate cache-hit performance from Publish-rendered performance.',
      'Check response headers, request logs, traversal warnings, and API latency.',
      'Identify the slow component or model.',
      'Fix caching, query scope, indexes, service timeouts, and heavy client assets.',
    ],
    expectedInterviewAnswer: 'I would isolate edge, Dispatcher, Publish, repository, integration, and browser layers instead of guessing.',
    seniorApproach: 'A senior answer includes cache hit ratio, Sling Model work, Query Builder/JCR SQL2 indexing, API timeouts, clientlibs, and image renditions.',
    architectApproach: 'An architect defines performance budgets, cache policy, component standards, query governance, and load-test gates.',
    relatedQuestions: ['aem-performance-tuning-slow-page', 'aem-querybuilder-sql2-indexing'],
  },
  {
    id: 'deployment-fails-after-release',
    title: 'Missing content after deployment',
    topic: 'Deployment Issues',
    problem: 'A Cloud Manager pipeline deploys, but expected authoring behavior or content configuration is missing.',
    rootCauseAnalysis: [
      '/conf policies or templates may not have been promoted or published.',
      'OSGi variables or secrets may be missing in the target environment.',
      'Dispatcher validation may differ from local assumptions.',
      'Content package filters may exclude required nodes.',
    ],
    troubleshootingSteps: [
      'Identify whether the missing item is code, /conf configuration, content, or environment config.',
      'Compare Dev, Stage, and Production package state.',
      'Check Cloud Manager logs and environment variables.',
      'Verify templates, policies, and referenced components are present and published.',
    ],
    expectedInterviewAnswer: 'I would classify the missing piece first: code, content, /conf config, OSGi config, or Dispatcher config.',
    seniorApproach: 'A senior developer checks package filters, Cloud Manager logs, OSGi config, /conf promotion, and authoring policies.',
    architectApproach: 'An architect defines release ownership for code, content, /conf, secrets, and Dispatcher so deployments are repeatable.',
    relatedQuestions: ['aem-cloud-manager-pipeline-failure', 'aem-editable-templates-policies'],
  },
  {
    id: 'blank-component-on-publish',
    title: 'Component blank on Publish',
    topic: 'Troubleshooting',
    problem: 'A component renders correctly on Author but appears blank or incomplete on Publish.',
    rootCauseAnalysis: [
      'Sling Model may fail on Publish due to missing OSGi service or configuration.',
      'The bundle may not be active or model registration may fail.',
      'The component may call author-only APIs.',
      'Publish permissions or cache state may hide the real issue.',
    ],
    troubleshootingSteps: [
      'Check Publish error.log and bundle state.',
      'Verify resourceType and Sling Model adaptable.',
      'Compare OSGi configs between Author and Publish.',
      'Check external API timeouts and fallbacks.',
    ],
    expectedInterviewAnswer: 'I would debug Publish specifically: logs, bundle state, model adaptation, OSGi services, permissions, and cache.',
    seniorApproach: 'A senior developer avoids Author-only assumptions and checks service availability, model failures, and graceful fallback design.',
    architectApproach: 'An architect pushes teams toward thin models, service-layer resilience, tests, and release validation on Publish-like environments.',
    relatedQuestions: ['aem-sling-model-blank-component', 'aem-osgi-cloud-config'],
  },
];

const mockInterviewProfiles = [
  {
    id: 'beginner' as const,
    label: 'Developer',
    description: 'Focuses on fundamentals, component anatomy, Sling basics, templates, and safe debugging habits.',
    questionCount: 6,
    recommendedMinutes: 20,
  },
  {
    id: 'senior' as const,
    label: 'Senior Developer',
    description: 'Focuses on production incidents, performance, Dispatcher, service users, workflows, and Cloud Manager.',
    questionCount: 8,
    recommendedMinutes: 35,
  },
  {
    id: 'architect' as const,
    label: 'Architect',
    description: 'Focuses on migration, governance, multi-site architecture, Cloud Service operating model, and risk trade-offs.',
    questionCount: 7,
    recommendedMinutes: 45,
  },
];

const rapidRevisionPlans = [
  {
    id: '15-min' as const,
    label: '15 Minute Revision',
    minutes: 15,
    description: 'Core answers you should be ready to say clearly without overexplaining.',
    questionIds: [
      'aem-architecture-author-publish-dispatcher',
      'aem-components-core-components',
      'aem-dispatcher-stale-content',
      'aem-resource-resolver-service-users',
      'aem-security-hardening',
    ],
  },
  {
    id: '30-min' as const,
    label: '30 Minute Revision',
    minutes: 30,
    description: 'Adds production support and Cloud Service readiness for experienced developer rounds.',
    questionIds: [
      'aem-architecture-author-publish-dispatcher',
      'aem-components-core-components',
      'aem-sling-model-blank-component',
      'aem-dispatcher-stale-content',
      'aem-osgi-cloud-config',
      'aem-resource-resolver-service-users',
      'aem-cloud-manager-pipeline-failure',
      'aem-performance-tuning-slow-page',
    ],
  },
  {
    id: '60-min' as const,
    label: '1 Hour Revision',
    minutes: 60,
    description: 'Covers lead and architect-level patterns, including migration, governance, security, and performance.',
    questionIds: questions.filter((item) => item.isRapidRevision || item.isMostAsked).map((item) => item.id),
  },
];

const questionsPerPage = 10;

const topicPreparationSets = Array.from(new Set(questions.map((question) => question.category)))
  .map((category) => {
    const rankedQuestions = questions
      .filter((question) => question.category === category)
      .sort((a, b) => (
        (a.mostAskedRank ?? 9999) - (b.mostAskedRank ?? 9999)
        || difficultyOrder[a.difficultyLevel] - difficultyOrder[b.difficultyLevel]
      ));
    const mostAskedQuestionIds = rankedQuestions
      .filter((question) => question.isMostAsked)
      .slice(0, 10)
      .map((question) => question.id);

    return {
      category,
      mostAskedQuestionIds,
      top5QuestionIds: mostAskedQuestionIds.slice(0, 5),
      top10QuestionIds: mostAskedQuestionIds,
      thirtyMinuteQuestionIds: rankedQuestions.slice(0, Math.min(8, rankedQuestions.length)).map((question) => question.id),
      sixtyMinuteQuestionIds: rankedQuestions.slice(0, Math.min(15, rankedQuestions.length)).map((question) => question.id),
      lastMinuteQuestionIds: mostAskedQuestionIds.slice(0, 5),
    };
  })
  .sort((a, b) => a.category.localeCompare(b.category));

const topicMetadata = Array.from(new Set(questions.map((question) => question.category)))
  .map((category) => {
    const topicQuestions = questions.filter((question) => question.category === category);
    const topicGroup = topicGroups.find((group) => group.topics.includes(category))?.title
      ?? topicQuestions[0]?.topicGroup
      ?? 'Advanced';

    return {
      category,
      topicGroup,
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
  })
  .sort((a, b) => a.topicGroup.localeCompare(b.topicGroup) || a.category.localeCompare(b.category));

export const aemInterviewPrep: InterviewPrepSection = {
  technologyId: 'aem',
  technologyLabel: 'AEM',
  title: 'AEM Interview Prep',
  description: 'A real-world AEM interview preparation path focused on how experienced developers, senior developers, leads, and architects answer in enterprise projects.',
  lastReviewed: 'June 2026',
  categories: aemInterviewCategories,
  questionTypes: aemInterviewQuestionTypes,
  experienceLevels: [
    {
      id: 'beginner',
      label: 'Beginner',
      years: '0-2 Years',
      summary: 'Focus on terminology, basic AEM flow, component anatomy, and safe debugging habits.',
    },
    {
      id: 'mid',
      label: 'Mid-Level',
      years: '2-5 Years',
      summary: 'Explain implementation choices, authoring behavior, Sling Models, templates, and common production issues.',
    },
    {
      id: 'senior',
      label: 'Senior',
      years: '5-8 Years',
      summary: 'Lead troubleshooting, performance, security, Cloud Service delivery, and cross-team implementation quality.',
    },
    {
      id: 'architect',
      label: 'Architect / Lead',
      years: '8+ Years',
      summary: 'Frame answers around governance, migration strategy, operating model, scalability, security, and long-term maintainability.',
    },
  ],
  topicGroups,
  topicMetadata,
  pagination: {
    questionsPerPage,
    ordering: 'most-asked-first',
  },
  productionScenarios,
  mockInterviewProfiles,
  rapidRevisionPlans,
  topicPreparationSets,
  questions,
};
