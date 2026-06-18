import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { sitecoreInterviewPrepTopicGroups } from './topicNavigation';

type Intent = 'concept' | 'implementation' | 'comparison' | 'scenario' | 'senior' | 'troubleshooting' | 'architecture';

interface TopicProfile {
  mechanism: string;
  implementation: string;
  failure: string;
  decision: string;
  incident: string;
  evidence: [string, string, string];
}

interface TopicSeed {
  category: string;
  topicGroup: string;
  concern: string;
  concerns: string[];
  relatedTopics: string[];
}

interface TopicSpec extends TopicSeed {
  profile: TopicProfile;
}

const intentTypes: Record<Intent, string> = {
  concept: 'Conceptual',
  implementation: 'Practical Implementation',
  comparison: 'Comparison',
  scenario: 'Scenario-Based',
  senior: 'Senior Discussion',
  troubleshooting: 'Troubleshooting',
  architecture: 'Architecture',
};

const difficultyByIntent: Record<Intent, 'Beginner' | 'Intermediate' | 'Advanced' | 'Architect'> = {
  concept: 'Beginner',
  implementation: 'Intermediate',
  comparison: 'Intermediate',
  scenario: 'Advanced',
  senior: 'Advanced',
  troubleshooting: 'Advanced',
  architecture: 'Architect',
};

const experienceByIntent: Record<Intent, 'beginner' | 'mid' | 'senior' | 'architect'> = {
  concept: 'beginner',
  implementation: 'mid',
  comparison: 'mid',
  scenario: 'senior',
  senior: 'senior',
  troubleshooting: 'senior',
  architecture: 'architect',
};

const industries = ['retail', 'finance', 'healthcare', 'travel', 'education', 'manufacturing'];

const sharedConcernsByGroup: Record<string, string[]> = {
  Fundamentals: [
    'how Sitecore compares with other enterprise CMS approaches',
    'how authors, developers, and architects should align on platform expectations',
  ],
  'Content Architecture': [
    'how modeling decisions affect upgradeability and headless readiness',
    'how authoring clarity and rendering reuse depend on architecture discipline',
  ],
  Development: [
    'how solution structure affects long-term maintainability and release safety',
    'how developer choices influence preview, authoring, and rendering-host trust',
  ],
  Authoring: [
    'how publishing and workflow rules affect editor confidence',
    'how release governance reduces risky last-minute authoring changes',
  ],
  Experience: [
    'how personalization complexity affects testing and support burden',
    'how variant delivery interacts with caching and headless rendering',
  ],
  'APIs and Integration': [
    'how data-delivery contracts stay stable across environments',
    'how edge delivery and headless rendering affect freshness expectations',
  ],
  'Production Support': [
    'how incident ownership is shared across Sitecore, frontend, and platform teams',
    'how to gather trustworthy evidence before content or config changes',
  ],
  Architecture: [
    'how governance should scale across brands, markets, and delivery channels',
    'how product direction affects migration strategy and platform standardization',
  ],
};

const topicSpecificConcernExpansions: Record<string, string[]> = {
  Fundamentals: [
    'what differentiates Sitecore from simpler headless CMS products',
    'how to explain Sitecore product direction to hiring panels',
  ],
  'Headless vs MVC': [
    'how delivery-model choice changes preview, deployment, and authoring expectations',
    'when a legacy MVC implementation is still the safer business choice',
  ],
  'Content Architecture': [
    'multi-site content architecture patterns',
    'reusable component and datasource governance',
  ],
  'Templates and Items': [
    'base templates and inheritance depth',
    'field sharing rules across versions and languages',
  ],
  'Renderings and Layouts': [
    'placeholder settings and allowed-controls governance',
    'datasource location and authoring guidance choices',
  ],
  'Multisite Architecture': [
    'shared versus site-specific ownership boundaries',
    'regional governance without content-tree sprawl',
  ],
  'Sitecore SXA': [
    'accelerator speed versus long-term customization discipline',
    'SXA upgrade and extension boundaries in enterprise programs',
  ],
  Helix: [
    'feature ownership boundaries between teams',
    'serialization and module dependency discipline',
  ],
  'Sitecore JSS': [
    'component factory governance between Sitecore and frontend',
    'preview and editing behavior in headless builds',
  ],
  'XM Cloud': [
    'migration strategy from XP or XM toward XM Cloud',
    'SaaS constraints versus self-managed flexibility',
  ],
  'Publishing and Workflows': [
    'publishing restrictions during campaign launches',
    'workflow design for multiple languages and markets',
  ],
  'Experience Editor vs Pages': [
    'authoring-mode differences in preview and component composition',
    'migration trade-offs between classic and modern authoring surfaces',
  ],
  'Sitecore Forms': [
    'secure form submission and downstream integration reliability',
    'author-friendly form changes without breaking lead-capture contracts',
  ],
  Personalization: [
    'testing personalized variants before high-traffic launches',
    'observability for rules, goals, and audience outcomes',
  ],
  'Experience Edge': [
    'publish latency and cache expectations across regions',
    'headless frontend revalidation contracts',
  ],
  'Search and Solr': [
    'index freshness, relevance, and support ownership',
    'content-model quality impact on search results and filters',
  ],
  'Production Issues': [
    'sequence for checking workflow, publish, layout, and cache evidence',
    'environment drift between lower and production tiers',
  ],
  'Scenario Questions': [
    'how to lead incident communication across authoring and frontend teams',
    'how to prioritize live mitigation versus root-cause analysis',
  ],
  'Language Fallback': [
    'wrong-locale risk during staggered regional launches',
    'fallback behavior versus SEO and author expectations',
  ],
  'Serialization Strategy': [
    'what belongs in source control versus editorial workflows',
    'release drift when serialization scope is too broad or too weak',
  ],
  'Architect-Level Questions': [
    'when to choose XM Cloud versus hybrid or traditional models',
    'governance model for multiple business units sharing one platform',
  ],
  'XM Cloud Deployment Model': [
    'SaaS authoring boundaries versus rendering-host ownership',
    'route verification and preview expectations in XM Cloud releases',
  ],
};

const intentsByTopicGroup: Record<string, Intent[]> = {
  Fundamentals: ['concept', 'comparison', 'implementation', 'troubleshooting', 'architecture'],
  'Content Architecture': ['concept', 'implementation', 'senior', 'troubleshooting', 'architecture'],
  Development: ['concept', 'implementation', 'scenario', 'troubleshooting', 'architecture'],
  Authoring: ['concept', 'implementation', 'scenario', 'troubleshooting', 'architecture'],
  Experience: ['concept', 'implementation', 'scenario', 'troubleshooting', 'architecture'],
  'APIs and Integration': ['concept', 'implementation', 'scenario', 'senior', 'troubleshooting', 'architecture'],
  'Production Support': ['scenario', 'implementation', 'senior', 'troubleshooting', 'architecture'],
  Architecture: ['concept', 'comparison', 'implementation', 'senior', 'troubleshooting', 'architecture'],
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hash(input: string) {
  let total = 0;
  for (let index = 0; index < input.length; index += 1) {
    total = ((total << 5) - total) + input.charCodeAt(index);
    total |= 0;
  }
  return Math.abs(total);
}

function list(values: string[]) {
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(', ')}, and ${values[values.length - 1]}`;
}

const topicSeeds: TopicSeed[] = [
  {
    category: 'Fundamentals',
    topicGroup: 'Fundamentals',
    concern: 'how to explain Sitecore as an enterprise CMS and DXP platform instead of only a product definition',
    concerns: [
      'what Sitecore is in enterprise programs',
      'CMS versus DXP positioning',
      'XM versus XP versus XM Cloud differences',
      'content tree basics',
      'items and fields behavior',
      'templates and standard values',
      'where Sitecore fits in modern headless architectures',
      'common misconceptions new Sitecore developers have',
    ],
    relatedTopics: ['Content Architecture', 'XM Cloud'],
  },
  {
    category: 'Headless vs MVC',
    topicGroup: 'Fundamentals',
    concern: 'when Sitecore MVC is still appropriate and when headless delivery creates a stronger long-term fit',
    concerns: [
      'classic MVC versus headless rendering ownership',
      'preview and authoring expectations in each delivery model',
      'deployment and rollback differences between the two approaches',
      'frontend team skill requirements and operating model fit',
      'migration pressure from legacy implementations toward XM Cloud patterns',
      'personalization, integrations, and performance implications of the delivery choice',
      'support and troubleshooting differences across MVC and headless stacks',
      'how to choose the safer model for the actual organization instead of the trendiest one',
    ],
    relatedTopics: ['Fundamentals', 'Sitecore JSS'],
  },
  {
    category: 'Content Architecture',
    topicGroup: 'Content Architecture',
    concern: 'how Sitecore content architecture decisions affect authoring, rendering, and long-term maintainability',
    concerns: [
      'template design strategy',
      'datasource modeling',
      'renderings and component contracts',
      'layout and placeholder discipline',
      'base templates and reuse',
      'content tree structure for multisite programs',
      'author-friendly modeling decisions',
      'avoiding over-engineered Sitecore item hierarchies',
    ],
    relatedTopics: ['Templates and Items', 'Renderings and Layouts'],
  },
  {
    category: 'Templates and Items',
    topicGroup: 'Content Architecture',
    concern: 'how templates, items, fields, and standard values shape the delivery contract in Sitecore',
    concerns: [
      'template inheritance decisions',
      'shared versus versioned fields',
      'standard values and defaults',
      'branching and item-creation discipline',
      'field-type selection trade-offs',
      'multilist and reference modeling',
      'content governance with template design',
      'template evolution without breaking consumers',
    ],
    relatedTopics: ['Content Architecture', 'Publishing and Workflows'],
  },
  {
    category: 'Renderings and Layouts',
    topicGroup: 'Content Architecture',
    concern: 'how Sitecore composes pages through renderings, layouts, placeholders, and datasources',
    concerns: [
      'rendering types and use cases',
      'layout composition strategy',
      'placeholder governance',
      'datasource-driven components',
      'controller or view rendering trade-offs',
      'component reuse across sites',
      'presentation details troubleshooting',
      'authoring safety for page composition',
    ],
    relatedTopics: ['Content Architecture', 'Sitecore JSS'],
  },
  {
    category: 'Multisite Architecture',
    topicGroup: 'Content Architecture',
    concern: 'how one Sitecore platform should support multiple brands, markets, and site teams without losing governance',
    concerns: [
      'site boundaries in the content tree',
      'shared versus site-specific template and component contracts',
      'locale and regional structure for global delivery',
      'governance for shared media, settings, and datasource ownership',
      'cross-site reuse without authoring confusion',
      'release coordination when multiple sites share one platform',
      'permission boundaries for different business units',
      'keeping multisite architecture maintainable as the platform grows',
    ],
    relatedTopics: ['Content Architecture', 'Templates and Items'],
  },
  {
    category: 'Sitecore SXA',
    topicGroup: 'Content Architecture',
    concern: 'how SXA should accelerate delivery without turning into unmanaged customization debt',
    concerns: [
      'when SXA is a good fit versus when custom architecture is safer',
      'tenant and site setup strategy',
      'SXA component reuse and extension points',
      'authoring acceleration versus frontend customization limits',
      'multisite delivery with shared accelerator patterns',
      'upgrade and maintenance discipline around SXA customizations',
      'performance and rendering complexity in heavily customized SXA programs',
      'governance so teams do not bypass accelerator conventions casually',
    ],
    relatedTopics: ['Content Architecture', 'Helix'],
  },
  {
    category: 'Helix',
    topicGroup: 'Development',
    concern: 'how Helix keeps large Sitecore solutions modular and maintainable',
    concerns: [
      'foundation feature project layering',
      'dependency rules',
      'module ownership',
      'code and template organization',
      'Helix benefits in enterprise teams',
      'anti-patterns in Helix adoption',
      'modular feature reuse',
      'Helix governance during long-running programs',
    ],
    relatedTopics: ['Content Architecture', 'Production Issues'],
  },
  {
    category: 'Sitecore JSS',
    topicGroup: 'Development',
    concern: 'how Sitecore JSS connects Sitecore-managed content with React or Next.js rendering hosts',
    concerns: [
      'JSS purpose and architecture',
      'component mapping in rendering hosts',
      'route and layout data consumption',
      'authoring expectations in headless builds',
      'JSS versus traditional MVC thinking',
      'integration with preview workflows',
      'headless component debugging',
      'upgrading or standardizing JSS implementations',
    ],
    relatedTopics: ['XM Cloud', 'Experience Edge'],
  },
  {
    category: 'XM Cloud',
    topicGroup: 'Development',
    concern: 'how XM Cloud changes Sitecore delivery, authoring, and operational assumptions',
    concerns: [
      'XM Cloud positioning',
      'headless-first delivery model',
      'Pages and modern authoring expectations',
      'SaaS-oriented environment thinking',
      'rendering host responsibilities',
      'publishing and Experience Edge relationship',
      'migration from older Sitecore setups',
      'trade-offs compared with XM or XP',
    ],
    relatedTopics: ['Sitecore JSS', 'Experience Edge'],
  },
  {
    category: 'Publishing and Workflows',
    topicGroup: 'Authoring',
    concern: 'how Sitecore content moves from authoring to live delivery safely',
    concerns: [
      'workflow design and approvals',
      'versioning and language behavior',
      'publishing targets and dependencies',
      'scheduled content releases',
      'authoring trust in preview',
      'publishing incidents and stale content',
      'media-library release considerations',
      'governance around who can publish what',
    ],
    relatedTopics: ['Production Issues', 'Scenario Questions'],
  },
  {
    category: 'Experience Editor vs Pages',
    topicGroup: 'Authoring',
    concern: 'how classic and modern Sitecore authoring modes create different preview, composition, and support expectations',
    concerns: [
      'differences between Experience Editor and Pages authoring behavior',
      'preview stability in classic and headless delivery paths',
      'component editability requirements for each authoring mode',
      'author training and support implications during migration',
      'how rendering-host contracts affect modern authoring trust',
      'when hybrid authoring support creates extra operational burden',
      'how to explain authoring-surface limitations clearly to stakeholders',
      'which authoring mode should be the primary long-term investment',
    ],
    relatedTopics: ['Publishing and Workflows', 'Sitecore JSS'],
  },
  {
    category: 'Sitecore Forms',
    topicGroup: 'Authoring',
    concern: 'how forms stay secure, author-friendly, and operationally reliable after launch',
    concerns: [
      'field configuration and validation safety',
      'spam protection and submission security',
      'CRM or marketing-automation integration reliability',
      'analytics and conversion tracking expectations',
      'authoring flexibility without breaking downstream consumers',
      'environment-specific endpoint and secret handling',
      'error handling for failed submissions and partial outages',
      'release verification for business-critical lead-capture forms',
    ],
    relatedTopics: ['Publishing and Workflows', 'Production Issues'],
  },
  {
    category: 'Personalization',
    topicGroup: 'Experience',
    concern: 'how Sitecore personalization changes delivery contracts and troubleshooting expectations',
    concerns: [
      'personalization basics',
      'rules engine behavior',
      'profiles and goals',
      'campaign-driven experience changes',
      'how personalized output is tested',
      'author expectations for variant behavior',
      'debugging wrong personalized content',
      'trade-offs between complexity and business value',
    ],
    relatedTopics: ['Production Issues', 'Architect-Level Questions'],
  },
  {
    category: 'Experience Edge',
    topicGroup: 'APIs and Integration',
    concern: 'how Experience Edge influences headless content delivery, caching, and publish visibility',
    concerns: [
      'Experience Edge purpose',
      'content-delivery path through Edge',
      'publishing versus frontend freshness',
      'cache and revalidation expectations',
      'frontends consuming Edge content safely',
      'preview versus published behavior',
      'delivery troubleshooting across Edge and rendering host',
      'scaling edge-friendly content delivery',
    ],
    relatedTopics: ['XM Cloud', 'Production Issues'],
  },
  {
    category: 'Search and Solr',
    topicGroup: 'APIs and Integration',
    concern: 'how Sitecore search and index strategy affect content freshness, relevance, and support load',
    concerns: [
      'index refresh timing after publish',
      'content-model quality and search result relevance',
      'query and filter contract stability for frontend consumers',
      'search ownership between Sitecore, search platform, and frontend teams',
      'how stale or partial indexes create business-visible defects',
      'facet and taxonomy modeling for enterprise discovery use cases',
      'recovery steps when search output diverges from Sitecore content state',
      'how to monitor search health before users report broken discovery',
    ],
    relatedTopics: ['Experience Edge', 'Production Issues'],
  },
  {
    category: 'Production Issues',
    topicGroup: 'Production Support',
    concern: 'how to diagnose Sitecore incidents across content state, rendering, publishing, integrations, and cache behavior',
    concerns: [
      'stale content after publish',
      'missing renderings or datasource issues',
      'broken preview or Pages behavior',
      'wrong personalization output',
      'serialization or environment drift',
      'performance regressions',
      'permission and workflow confusion',
      'headless route or layout mismatches',
    ],
    relatedTopics: ['Scenario Questions', 'Architect-Level Questions'],
  },
  {
    category: 'Scenario Questions',
    topicGroup: 'Production Support',
    concern: 'how senior Sitecore candidates reason through real incidents instead of giving feature-only answers',
    concerns: [
      'content published but not visible',
      'Experience Editor works for some components only',
      'wrong locale content in production',
      'rendering host route returns old layout data',
      'campaign launch fails under time pressure',
      'serialization deploy breaks content contract',
      'cache invalidation path is unclear',
      'multiple teams disagree on whether Sitecore or frontend is at fault',
    ],
    relatedTopics: ['Production Issues', 'Publishing and Workflows'],
  },
  {
    category: 'Language Fallback',
    topicGroup: 'Production Support',
    concern: 'how multilingual Sitecore launches stay safe when localized content is incomplete or fallback behavior is misunderstood',
    concerns: [
      'language version versus fallback behavior',
      'wrong-locale output during regional launches',
      'author expectations for untranslated content',
      'SEO and route implications of fallback logic',
      'multisite localization with shared components and settings',
      'publishing and QA checks for locale completeness',
      'cache behavior when localized content changes at different times',
      'safe mitigation when production serves the wrong language or version',
    ],
    relatedTopics: ['Production Issues', 'Content Architecture'],
  },
  {
    category: 'Serialization Strategy',
    topicGroup: 'Production Support',
    concern: 'how serialization scope and governance affect release safety across Sitecore environments',
    concerns: [
      'what should and should not be serialized',
      'module boundaries for serialized artifacts',
      'how source-controlled artifacts relate to editorial content changes',
      'release drift when serialized dependencies are incomplete',
      'review discipline for serialized item changes',
      'environment-specific settings and secrets boundaries',
      'rollback strategy for bad serialized deployments',
      'how serialization policy supports long-term maintainability',
    ],
    relatedTopics: ['Production Issues', 'Helix'],
  },
  {
    category: 'Architect-Level Questions',
    topicGroup: 'Architecture',
    concern: 'how to make Sitecore platform decisions that stay safe across multiple teams, brands, environments, and delivery channels',
    concerns: [
      'choosing XM XP or XM Cloud',
      'headless versus traditional delivery decisions',
      'content architecture governance',
      'Helix and modularity strategy',
      'environment and release model',
      'integration boundary ownership',
      'scaling personalization and marketing complexity',
      'long-term maintainability and migration strategy',
    ],
    relatedTopics: ['Helix', 'XM Cloud'],
  },
  {
    category: 'XM Cloud Deployment Model',
    topicGroup: 'Architecture',
    concern: 'how XM Cloud changes environment ownership, rendering-host release discipline, and enterprise Sitecore operating models',
    concerns: [
      'SaaS authoring boundaries versus customer-owned frontend responsibilities',
      'preview and route verification in XM Cloud release workflows',
      'rendering-host deployment coordination with publish-to-live behavior',
      'migration strategy from XP or XM into XM Cloud delivery',
      'environment design for QA, staging, and production confidence',
      'how support ownership shifts across Sitecore SaaS and customer teams',
      'what architects must standardize for multi-team XM Cloud programs',
      'how to keep frontend, authoring, and governance models aligned over time',
    ],
    relatedTopics: ['Architect-Level Questions', 'XM Cloud'],
  },
];

function buildProfile(seed: TopicSeed): TopicProfile {
  if (seed.topicGroup === 'Fundamentals') {
    return {
      mechanism: `${seed.category} explains how Sitecore combines enterprise content structure, authoring workflows, and experience delivery responsibilities.`,
      implementation: `Explain ${seed.category} through content architecture, authoring behavior, and delivery contracts instead of only product terminology.`,
      failure: `teams treat ${seed.category} as a terminology question and make poor architecture or governance decisions later`,
      decision: `which Sitecore platform capabilities are actually needed and how much operational complexity the organization should accept`,
      incident: `a new team adopts Sitecore but different stakeholders have conflicting assumptions about what the platform is supposed to own`,
      evidence: ['architecture decision notes', 'content tree and template overview', 'authoring and delivery expectations'],
    };
  }

  if (seed.topicGroup === 'Content Architecture') {
    return {
      mechanism: `${seed.category} shapes how Sitecore items, templates, renderings, and authoring flows stay maintainable over time.`,
      implementation: `Design ${seed.category} with reusable contracts, author clarity, and stable frontend or rendering assumptions.`,
      failure: `weak ${seed.category} decisions create confusing author experiences and brittle rendering logic across teams`,
      decision: `how much reuse, inheritance, modularity, and governance to enforce before the model becomes hard to evolve`,
      incident: `a new content requirement exposes that ${seed.category} was optimized for one page rather than a sustainable platform contract`,
      evidence: ['template and datasource definitions', 'presentation details and placeholder rules', 'sample authoring flows'],
    };
  }

  if (seed.topicGroup === 'Development') {
    return {
      mechanism: `${seed.category} governs how Sitecore engineering patterns connect platform content and modern application delivery.`,
      implementation: `Implement ${seed.category} with clear module boundaries, rendering contracts, and preview-aware frontend integration.`,
      failure: `the engineering model around ${seed.category} becomes inconsistent and teams cannot support upgrades or shared features cleanly`,
      decision: `how modern or modular the Sitecore solution should be and which delivery pattern is safest for the organization`,
      incident: `a release involving ${seed.category} works in one environment but breaks authoring, preview, or component resolution elsewhere`,
      evidence: ['module boundaries and dependency rules', 'rendering-host mapping evidence', 'environment-specific configuration and logs'],
    };
  }

  if (seed.topicGroup === 'Authoring') {
    return {
      mechanism: `${seed.category} controls how authors, reviewers, and publishers trust Sitecore before content reaches users.`,
      implementation: `Define ${seed.category} through clear workflow state, publish discipline, version awareness, and author-visible expectations.`,
      failure: `teams lose trust in Sitecore because ${seed.category} works differently for authors, reviewers, and delivery environments`,
      decision: `how much workflow control and release coordination is needed before content changes should go live`,
      incident: `an urgent content release reveals that ${seed.category} was never clearly aligned across authoring, preview, and production delivery`,
      evidence: ['workflow state and version history', 'publishing target evidence', 'preview and live route comparison'],
    };
  }

  if (seed.topicGroup === 'Experience') {
    return {
      mechanism: `${seed.category} changes the final experience based on rules and marketing-oriented context, not just static content.`,
      implementation: `Treat ${seed.category} as a controlled delivery contract with explicit testing, governance, and fallback behavior.`,
      failure: `marketing and engineering teams cannot explain why ${seed.category} showed the wrong experience in production`,
      decision: `how much personalization complexity is justified by business value and operational supportability`,
      incident: `a campaign depends on ${seed.category}, but users see the wrong experience and teams disagree on whether the rule, data, or rendering path is wrong`,
      evidence: ['rules and profile configuration', 'rendered-variant comparison', 'campaign and tracking evidence'],
    };
  }

  if (seed.topicGroup === 'APIs and Integration') {
    return {
      mechanism: `${seed.category} defines how Sitecore content leaves the platform and reaches external rendering or integration consumers.`,
      implementation: `Implement ${seed.category} with explicit delivery, caching, and consumer-contract rules across environments.`,
      failure: `the delivery model around ${seed.category} becomes fragile and frontends or downstream systems consume stale or mismatched data`,
      decision: `which API or edge-delivery path is correct for the platform, and how freshness, scale, and preview should work`,
      incident: `a headless frontend using ${seed.category} receives unexpected data after publish and support teams cannot agree where the stale layer lives`,
      evidence: ['API or edge response comparison', 'publishing and cache traces', 'frontend route and data-mapping logs'],
    };
  }

  if (seed.topicGroup === 'Production Support') {
    return {
      mechanism: `${seed.category} represents the kinds of multi-boundary incidents Sitecore engineers handle after release.`,
      implementation: `Approach ${seed.category} by isolating content state, publishing, rendering, integration, and cache boundaries before applying fixes.`,
      failure: `support teams guess from one Sitecore screen or one frontend symptom and miss the actual boundary causing the incident`,
      decision: `which evidence to trust first, and what mitigation is safest while the root cause is still being confirmed`,
      incident: `${seed.category} reaches production and multiple teams disagree on whether the problem belongs to Sitecore, the rendering host, or the release process`,
      evidence: ['content and workflow state', 'route or layout response comparison', 'cache, deployment, and environment timeline'],
    };
  }

  return {
    mechanism: `${seed.category} is an architecture concern that determines whether Sitecore stays reusable, governable, and supportable at enterprise scale.`,
    implementation: `Standardize ${seed.category} through ownership rules, delivery contracts, and platform-level governance rather than one-off project decisions.`,
    failure: `the platform works short term, but ${seed.category} stays implicit and change risk grows across teams, brands, and environments`,
    decision: `how to scale ${seed.category} without creating uncontrolled platform complexity or delivery drift`,
    incident: `multiple teams depending on Sitecore discover that ${seed.category} was never clearly governed across authoring, delivery, and release operations`,
    evidence: ['architecture decision records', 'module and environment standards', 'cross-team support and ownership patterns'],
  };
}

function getExpandedConcerns(seed: TopicSeed) {
  return Array.from(new Set([
    ...seed.concerns,
    seed.concern,
    ...(sharedConcernsByGroup[seed.topicGroup] ?? []),
    ...(topicSpecificConcernExpansions[seed.category] ?? []),
  ]));
}

const topicSpecs: TopicSpec[] = topicSeeds.map((seed) => ({
  ...seed,
  concerns: getExpandedConcerns(seed),
  profile: buildProfile(seed),
}));

function getIntentsForSpec(spec: TopicSpec) {
  return intentsByTopicGroup[spec.topicGroup] ?? ['concept', 'implementation', 'troubleshooting', 'architecture'];
}

function buildQuestion(spec: TopicSpec, concern: string, intent: Intent, index: number): InterviewPrepQuestion {
  const industry = industries[hash(`${spec.category}-${concern}-${intent}`) % industries.length];
  const directAnswer = intent === 'concept'
    ? `${spec.profile.mechanism} For ${spec.category}, the production-relevant concern is ${concern}.`
    : intent === 'implementation'
      ? `In Sitecore, implement ${spec.category} so ${concern} is controlled through clear authoring contracts, delivery discipline, and safe platform governance.`
      : intent === 'comparison'
        ? `Compare Sitecore decisions around ${spec.category} through authoring depth, delivery behavior, governance cost, and long-term platform trade-offs, especially around ${concern}.`
        : intent === 'scenario'
          ? `Treat ${spec.category} as a real delivery scenario where ${concern} must be handled with explicit evidence, triage order, and low-risk mitigation.`
          : intent === 'senior'
            ? `A senior Sitecore answer for ${spec.category} should connect ${concern} to author trust, release sequencing, consumer contracts, and enterprise supportability.`
      : intent === 'troubleshooting'
        ? `Treat ${spec.category} as a boundary across content state, publishing, rendering, environment configuration, and cache behavior, then test the safest hypotheses first.`
        : `For Sitecore ${spec.category}, the design decision is ${spec.profile.decision}. The answer must balance ${concern}, author trust, delivery safety, and enterprise maintainability.`;

  return {
    id: `sitecore-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'sitecore',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question: intent === 'concept'
      ? `Explain ${spec.category} in Sitecore with focus on ${concern}. Why does it matter in real enterprise CMS delivery?`
      : intent === 'implementation'
        ? `How would you implement ${spec.category} in Sitecore so ${concern} is handled safely in production?`
        : intent === 'comparison'
          ? `How would you compare Sitecore decisions around ${spec.category} when ${concern} is the main evaluation point?`
          : intent === 'scenario'
            ? `What would you do in a real Sitecore scenario where ${spec.category} is involved and ${concern} starts creating delivery risk?`
            : intent === 'senior'
              ? `As a senior developer, how would you discuss ${spec.category} in Sitecore when ${concern} affects multiple teams or environments?`
        : intent === 'troubleshooting'
          ? `How would you troubleshoot a Sitecore production issue involving ${spec.category} when ${concern} becomes the likely failure area?`
          : `How would you make an architecture decision about ${spec.category} in Sitecore when ${concern} becomes critical across teams and channels?`,
    shortAnswer: `${directAnswer} Validate it with ${spec.profile.evidence[0]}.`,
    detailedAnswer: [
      `Direct answer: ${directAnswer}`,
      `What: ${spec.profile.mechanism}`,
      `Why: Sitecore teams care because ${spec.profile.failure}, especially around ${concern}.`,
      `How: ${spec.profile.implementation}`,
      `Production validation: Prove the answer with ${list(spec.profile.evidence)}.`,
      `Architecture decision: ${spec.profile.decision}.`,
    ],
    productionScenario: `A ${industry} organization using Sitecore is facing this signal: ${spec.profile.incident}. The engineer must explain how ${spec.category} and ${concern} influence the issue, isolate the broken boundary, and restore confidence without creating new release risk.`,
    realProjectExample: `On a ${industry} platform, the team used Sitecore ${spec.category} to address ${concern}. The implementation only became trustworthy after they validated the workflow with ${list(spec.profile.evidence)} and aligned architects, authors, and frontend developers on the same contract.`,
    interviewerExpectation: `The interviewer expects a concrete Sitecore answer that connects ${spec.category} to ${concern}, explains the trade-offs, and shows how the team would verify the behavior in a live enterprise content platform.`,
    commonMistakes: [
      `Giving a feature explanation of ${spec.category} without describing how it behaves across authors, renderings, environments, or production support.`,
      `Ignoring this Sitecore design choice: ${spec.profile.decision}.`,
      `Troubleshooting ${spec.category} by changing content or settings before collecting ${spec.profile.evidence[0]}.`,
      `Skipping governance, publishing, or cache implications for ${spec.category}.`,
    ],
    followUpQuestions: [
      `Which Sitecore dependency most changes your answer for ${spec.category} and ${concern}: content architecture, publishing, rendering host, or cache path?`,
      `How would ${spec.profile.evidence[0]} and ${spec.profile.evidence[1]} prove your answer in production?`,
      `What is the safest rollback or mitigation if ${spec.profile.incident}?`,
      `At what scale or organizational complexity would you revisit the ${spec.category} decision?`,
    ],
    frequencyScore: Math.max(68, (
      intent === 'concept' ? 92
        : intent === 'implementation' ? 89
          : intent === 'comparison' ? 84
            : intent === 'scenario' ? 87
              : intent === 'senior' ? 86
                : intent === 'troubleshooting' ? 85 : 81
    ) - (index % 8)),
    commonWrongAnswer: `A weak answer names Sitecore features but does not explain ${concern}, authoring implications, delivery safety, evidence, or operational ownership for ${spec.category}.`,
    architectPerspective: `Architects govern Sitecore ${spec.category} through this explicit decision: ${spec.profile.decision}. They evaluate author workflow, consumer impact, publishing behavior, environment safety, and the user-facing signal "${spec.profile.incident}".`,
    keyTakeaway: `Explain Sitecore ${spec.category} through ${concern}, platform boundaries, operating evidence, and decision trade-offs rather than only through product terminology.`,
    difficultyLevel: difficultyByIntent[intent],
    experienceLevel: experienceByIntent[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I can explain the purpose of Sitecore ${spec.category} and the safe baseline workflow around it.`,
      mid: `I can implement Sitecore ${spec.category} with repeatable content, rendering, and environment discipline.`,
      senior: `I can troubleshoot Sitecore ${spec.category} in production using ${list(spec.profile.evidence)} and recent-change analysis.`,
      architect: `I can choose and govern a Sitecore ${spec.category} pattern using ${spec.profile.decision}.`,
    },
    isMostAsked: index < 56,
    mostAskedRank: index < 56 ? index + 1 : undefined,
    isRapidRevision: index < 24,
  };
}

const questions = topicSpecs.flatMap((spec, specIndex) => {
  const specIntents = getIntentsForSpec(spec);
  return spec.concerns.flatMap((concern, concernIndex) => specIntents.map((intent, intentIndex) => (
    buildQuestion(spec, concern, intent, (((specIndex * spec.concerns.length) + concernIndex) * specIntents.length) + intentIndex)
  )));
});

const topicGroups: InterviewPrepTopicGroup[] = sitecoreInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in Sitecore implementations.`,
  topics: group.topics.map((topic) => topic.category),
}));

const questionsPerPage = 10;

const topicMetadata = topicSpecs.map((spec) => {
  const topicQuestions = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    topicGroup: spec.topicGroup,
    totalQuestions: topicQuestions.length,
    estimatedPreparationMinutes: Math.max(24, Math.round(topicQuestions.length * 4.5)),
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

const topicPreparationSets = topicSpecs.map((spec) => {
  const ranked = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    mostAskedQuestionIds: ranked.slice(0, 10).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 16).map((question) => question.id),
    lastMinuteQuestionIds: ranked.slice(0, 5).map((question) => question.id),
  };
});

const productionScenarios = [
  {
    id: 'sitecore-publish-not-live',
    title: 'Content was published but the live site still shows old content',
    topic: 'Publishing and Workflows',
    problem: 'Authors see approved content in Sitecore, but users still see older output on the live experience after publish.',
    rootCauseAnalysis: ['Publishing target or workflow state was incorrect', 'A cache or headless delivery layer is still serving stale output', 'The rendering host route is not consuming the latest published contract'],
    troubleshootingSteps: ['Verify item version and workflow state', 'Confirm the publish target and publish timestamp', 'Compare delivery or layout response with authoring expectation', 'Trace cache invalidation and rendering-host freshness'],
    expectedInterviewAnswer: 'The candidate should isolate content state, publishing state, and cache or delivery drift before asking authors to republish or redeploy blindly.',
    seniorApproach: 'A senior answer includes publish verification, route-level response comparison, stale-layer identification, and the safest mitigation path.',
    architectApproach: 'An architect defines publish-to-live expectations, cache contracts, and verification steps so author trust stays high.',
    relatedQuestions: questions.filter((question) => question.category === 'Publishing and Workflows').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'sitecore-rendering-host-mismatch',
    title: 'The rendering host shows the wrong layout or missing components',
    topic: 'Sitecore JSS',
    problem: 'A Sitecore route loads, but the headless frontend renders the wrong layout structure or fails to show one or more components.',
    rootCauseAnalysis: ['Layout Service or Edge response changed', 'Frontend component mapping is missing or mismatched', 'Datasource or placeholder assumptions drifted between Sitecore and the rendering host'],
    troubleshootingSteps: ['Inspect the layout or route response', 'Compare Sitecore component names to frontend resolvers', 'Verify datasource and placeholder data', 'Check environment-specific configuration or deployment changes'],
    expectedInterviewAnswer: 'The answer should treat it as a contract mismatch between Sitecore presentation data and the rendering host, not only a frontend styling issue.',
    seniorApproach: 'A senior answer covers response inspection, component-factory verification, placeholder and datasource checks, and safe rollback options.',
    architectApproach: 'An architect standardizes component contracts and preview validation so layout drift is caught before release.',
    relatedQuestions: questions.filter((question) => question.category === 'Sitecore JSS').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'sitecore-personalization-wrong-experience',
    title: 'Users are seeing the wrong personalized experience',
    topic: 'Personalization',
    problem: 'A campaign or segment-specific experience is showing the wrong content variant in production.',
    rootCauseAnalysis: ['Rules or profile conditions do not match the intended context', 'Cached output or delivery assumptions make the personalized variant inconsistent', 'Editors and developers do not agree on how the rule should behave'],
    troubleshootingSteps: ['Review the relevant rule conditions and expected audience context', 'Capture the actual variant being delivered', 'Check whether caching or route reuse affects the response', 'Verify campaign timing and recently changed content or settings'],
    expectedInterviewAnswer: 'The candidate should connect rule logic, audience context, delivery behavior, and cache assumptions instead of treating it as a single content bug.',
    seniorApproach: 'A senior answer includes rule validation, user-context reproduction, cache-path awareness, and a safe fallback or disable plan.',
    architectApproach: 'An architect limits unnecessary personalization complexity and defines better test and observability standards around experience variants.',
    relatedQuestions: questions.filter((question) => question.category === 'Personalization').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'sitecore-serialization-release-regression',
    title: 'A deployment or serialization change breaks the content contract',
    topic: 'Production Issues',
    problem: 'A deployment involving serialized Sitecore artifacts or environment changes causes content or renderings to stop behaving correctly.',
    rootCauseAnalysis: ['Template or rendering artifacts changed without consumer validation', 'Environment-specific configuration drifted', 'Code and Sitecore artifact sequencing was wrong during release'],
    troubleshootingSteps: ['Review the serialized changes and release order', 'Identify affected routes, templates, or renderings', 'Compare lower-environment validation with production behavior', 'Restore or patch the broken contract safely'],
    expectedInterviewAnswer: 'The answer should treat Sitecore artifacts like production release dependencies, not just admin configuration changes.',
    seniorApproach: 'A senior answer covers release sequencing, artifact review, consumer validation, and the minimum-risk rollback path.',
    architectApproach: 'An architect introduces stronger governance for serialized changes, dependency checks, and deployment contracts across teams.',
    relatedQuestions: questions.filter((question) => question.category === 'Production Issues').slice(0, 4).map((question) => question.id),
  },
];

export const sitecoreInterviewPrep: InterviewPrepSection = {
  technologyId: 'sitecore',
  technologyLabel: 'Sitecore',
  title: 'Sitecore Interview Prep',
  description: 'Sitecore interview preparation focused on enterprise CMS architecture, templates, items, renderings, authoring, publishing, XM Cloud, headless delivery, personalization, production support, and architect-level decision making.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Junior Sitecore Developer', years: '0-2 Years', summary: 'Explain Sitecore fundamentals, authoring concepts, templates, items, and basic rendering workflows clearly.' },
    { id: 'mid', label: 'Sitecore Developer', years: '2-5 Years', summary: 'Implement Sitecore components, workflows, headless integrations, and safe publishing or deployment behavior.' },
    { id: 'senior', label: 'Senior Sitecore Developer', years: '5-8 Years', summary: 'Lead production troubleshooting, modular architecture, release sequencing, and cross-team CMS decisions.' },
    { id: 'architect', label: 'Sitecore Architect', years: '8+ Years', summary: 'Design enterprise Sitecore platforms with strong governance, XM Cloud direction, integration boundaries, and long-term maintainability.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Junior Sitecore Developer', description: 'Fundamentals, items, templates, authoring, and safe publishing basics.', questionCount: 10, recommendedMinutes: 30 },
    { id: 'mid', label: 'Sitecore Developer', description: 'Renderings, workflows, headless integration, XM Cloud basics, and delivery discipline.', questionCount: 12, recommendedMinutes: 40 },
    { id: 'senior', label: 'Senior Sitecore Developer', description: 'Production support, modular architecture, release coordination, and platform troubleshooting.', questionCount: 12, recommendedMinutes: 50 },
    { id: 'architect', label: 'Sitecore Architect', description: 'Platform direction, governance, environment strategy, and enterprise experience architecture.', questionCount: 10, recommendedMinutes: 55 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-signal Sitecore fundamentals, architecture, and publishing questions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 14).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Sitecore templates, renderings, XM Cloud, publishing, and troubleshooting revision.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 28).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Sitecore preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 60).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
