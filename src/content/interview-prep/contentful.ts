import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { contentfulInterviewPrepTopicGroups } from './topicNavigation';

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

const industries = ['media', 'retail', 'SaaS', 'fintech', 'education', 'travel'];

const sharedConcernsByGroup: Record<string, string[]> = {
  Fundamentals: [
    'real-world comparison of Contentful with competing CMS approaches',
    'common interview misconceptions around headless CMS responsibilities',
    'how teams explain Contentful decisions to frontend and editorial stakeholders',
  ],
  'Content Modeling': [
    'how model decisions affect editor experience and long-term maintainability',
    'production impact of schema changes on frontend consumers',
    'trade-offs between flexible schemas and strict governance',
  ],
  APIs: [
    'security and token-handling expectations in production environments',
    'performance and cache implications of the chosen API access pattern',
    'how to debug API behavior across environments and locales',
  ],
  'Rich Text and Assets': [
    'accessibility and responsive rendering concerns in real frontend implementations',
    'production-safe fallbacks when editorial content breaks rendering assumptions',
    'how media-heavy content affects performance and delivery strategy',
  ],
  'Publishing and Workflows': [
    'governance expectations between editors, reviewers, and developers',
    'release safety when content changes and code changes depend on each other',
    'operational signals that prove the publishing workflow is working correctly',
  ],
  'Production and Architecture': [
    'trade-offs between content freshness, performance, and reliability',
    'how to diagnose cross-boundary issues between CMS, cache, and frontend layers',
    'architecture decisions that reduce long-term support burden',
  ],
  'Scenario Questions': [
    'incident triage order and evidence collection during production issues',
    'safe rollback or mitigation strategy before applying a permanent fix',
    'how to separate CMS issues from frontend or deployment issues',
  ],
  'Architecture Questions': [
    'multi-team governance and ownership boundaries for a shared content platform',
    'standardization decisions that keep schemas and integrations reusable',
    'how platform choices affect future migrations, scaling, and risk',
  ],
};

const topicSpecificConcernExpansions: Record<string, string[]> = {
  'What is Contentful': [
    'why teams choose Contentful for multi-channel publishing',
    'where Contentful stops and the frontend or BFF starts',
    'how to explain Contentful to non-CMS stakeholders in project discussions',
  ],
  'Spaces and Environments': [
    'separating development, QA, and production content safely',
    'environment branching for migration rehearsal',
    'environment cleanup and long-lived sandbox risks',
  ],
  'Traditional CMS vs Contentful': [
    'page-builder flexibility versus structured model discipline',
    'migration complexity from coupled CMS platforms',
    'editor expectations when moving from page editing to structured content editing',
  ],
  'Contentful vs AEM': [
    'enterprise workflow depth versus lighter API-first delivery',
    'when personalization or DXP needs make AEM a stronger fit',
    'how operations and governance differ between the two platforms',
  ],
  'Contentful vs Sitecore': [
    'headless SaaS simplicity versus heavier enterprise experience-platform depth',
    'when personalization and enterprise marketing workflows make Sitecore a stronger fit',
    'how authoring expectations and operating models differ between the two platforms',
  ],
  'Contentful vs Sanity and Strapi': [
    'hosted governance versus self-hosted flexibility',
    'plugin and extension strategy trade-offs',
    'platform maintenance ownership after launch',
  ],
  'Reusable Content Models': [
    'shared component modeling across web, app, and campaign surfaces',
    'splitting large models into reusable domain entities',
    'governing reuse without making editors navigate too many tiny content types',
  ],
  'References and Relationships': [
    'circular reference risk and query complexity',
    'deciding when denormalization is safer than deep nesting',
    'reference validation and editor guardrails',
  ],
  'Localization Modeling': [
    'field-level localization versus content-type duplication',
    'locale fallback impact on SEO and user trust',
    'editor workload for partial locale launches',
  ],
  'Content Delivery API': [
    'include depth and payload size trade-offs',
    'published-content caching at edge and app layers',
    'when a BFF should reshape Contentful responses',
  ],
  'Content Preview API': [
    'secure preview token exchange and route protection',
    'preview parity gaps between staging and production',
    'handling draft references and unpublished dependencies',
  ],
  'Content Management API': [
    'safe bulk updates and idempotent automation',
    'migration scripts versus manual editorial fixes',
    'rate-limit-aware administrative tooling',
  ],
  'GraphQL API': [
    'query complexity versus frontend convenience',
    'schema stability for multiple consumer applications',
    'debugging nested references and null fields in GraphQL responses',
  ],
  'Rendering Rich Text': [
    'component mapping for embedded entries and assets',
    'sanitization and safe rendering boundaries',
    'maintaining design consistency with editorial flexibility',
  ],
  Webhooks: [
    'deduplication and idempotency in downstream consumers',
    'choosing rebuild versus targeted revalidation',
    'security verification for webhook signatures and endpoints',
  ],
  'Caching Strategy': [
    'choosing TTL versus event-driven revalidation',
    'coordinating app cache, CDN cache, and CMS freshness',
    'measuring acceptable staleness for editorial teams',
  ],
  'Multi-language Sites': [
    'region-specific SEO and hreflang governance',
    'translation workflow dependency on content model design',
    'locale rollout sequencing when some content is incomplete',
  ],
  'Migration Strategy': [
    'backward-compatible rollout planning across consumers',
    'dry-run validation for large content migrations',
    'ownership and communication for platform-wide schema changes',
  ],
  'Entries and Assets': [
    'draft and published state differences between structured entries and media assets',
    'frontend assumptions about linked assets and entry completeness',
    'asset governance and missing-reference risk in real projects',
  ],
  'Rich Text': [
    'mapping rich text nodes into safe frontend rendering contracts',
    'embedded entry and asset behavior in real delivery paths',
    'editor flexibility versus rendering consistency',
  ],
  'Frontend Integration': [
    'how frontend apps shape, cache, and fail safely around Contentful responses',
    'when a BFF should reshape Contentful content for consumers',
    'rendering linked entries, assets, and partial content safely',
  ],
  'Next.js Integration': [
    'static generation, SSR, ISR, and preview trade-offs for Contentful-driven routes',
    'environment-variable and revalidation discipline in Next.js deployments',
    'how Contentful route generation, fallback behavior, and SEO interact in Next.js',
  ],
  Localization: [
    'locale-specific entries, slug behavior, and fallback risk',
    'translation workflow and release sequencing for multilingual launches',
    'SEO implications of partial localization',
  ],
  'Roles and Permissions': [
    'space-level and environment-level access control',
    'editor safety versus platform flexibility in multi-team setups',
    'token governance and operational risk when permissions are too broad',
  ],
  'Production Scenarios': [
    'stale content, wrong locale, broken references, or preview drift under launch pressure',
    'how to isolate CMS state, cache behavior, and frontend rendering boundaries',
    'safe mitigation before model or publishing changes make incidents worse',
  ],
  'Architect-Level Questions': [
    'multi-app governance for shared content platforms',
    'platform boundaries between CMS, search, personalization, and commerce',
    'how schema evolution stays safe across teams and channels',
  ],
  'Multi-app Content Platform': [
    'shared schema governance for multiple brands or apps',
    'consumer-specific field needs without model fragmentation',
    'platform ownership when different teams release independently',
  ],
  'Integration Strategy': [
    'search, personalization, and downstream indexing design',
    'BFF versus direct frontend CMS access',
    'event-driven versus request-time integration trade-offs',
  ],
};

const intentsByTopicGroup: Record<string, Intent[]> = {
  Fundamentals: ['concept', 'comparison', 'implementation', 'troubleshooting', 'architecture'],
  'Content Modeling': ['concept', 'implementation', 'senior', 'troubleshooting', 'architecture'],
  APIs: ['concept', 'implementation', 'scenario', 'senior', 'troubleshooting', 'architecture'],
  'Rich Text and Assets': ['concept', 'implementation', 'scenario', 'senior', 'troubleshooting'],
  'Publishing and Workflows': ['concept', 'implementation', 'scenario', 'senior', 'troubleshooting', 'architecture'],
  'Production and Architecture': ['concept', 'implementation', 'scenario', 'senior', 'troubleshooting', 'architecture'],
  'Scenario Questions': ['scenario', 'implementation', 'senior', 'troubleshooting', 'architecture'],
  'Architecture Questions': ['concept', 'comparison', 'implementation', 'senior', 'troubleshooting', 'architecture'],
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
    category: 'What is Contentful',
    topicGroup: 'Fundamentals',
    concern: 'explaining Contentful as a headless content platform instead of only a CMS UI',
    concerns: ['headless CMS definition and API-first delivery', 'separation of content from presentation', 'editor workflow versus frontend ownership', 'where Contentful fits in modern web architecture'],
    relatedTopics: ['Why Headless CMS', 'Content Types vs Entries'],
  },
  {
    category: 'Why Headless CMS',
    topicGroup: 'Fundamentals',
    concern: 'why teams choose API-first content delivery over template-coupled CMS rendering',
    concerns: ['multi-channel content delivery', 'frontend freedom versus coupled templates', 'scalability for multiple apps and brands', 'trade-offs compared with page-builder CMS platforms'],
    relatedTopics: ['What is Contentful', 'Traditional CMS vs Contentful'],
  },
  {
    category: 'Spaces and Environments',
    topicGroup: 'Fundamentals',
    concern: 'how spaces and environments separate platform ownership, testing, and release safety',
    concerns: ['space-level isolation', 'environment promotion workflows', 'testing schema and content safely', 'environment strategy for teams and releases'],
    relatedTopics: ['Preview Workflow', 'Environment Aliases'],
  },
  {
    category: 'Content Types vs Entries',
    topicGroup: 'Fundamentals',
    concern: 'distinguishing schema definition from actual content instances used by applications',
    concerns: ['schema versus content instance', 'how entries follow content-type contracts', 'editor understanding of models', 'frontend assumptions around schema evolution'],
    relatedTopics: ['Entries vs Assets', 'Reusable Content Models'],
  },
  {
    category: 'Entries vs Assets',
    topicGroup: 'Fundamentals',
    concern: 'how structured content and media should be modeled and consumed differently',
    concerns: ['structured data versus media metadata', 'asset lifecycle and publishing differences', 'frontend rendering responsibilities', 'content reuse patterns for entries and assets'],
    relatedTopics: ['Content Types vs Entries', 'Asset Optimization'],
  },
  {
    category: 'Traditional CMS vs Contentful',
    topicGroup: 'Fundamentals',
    concern: 'comparing page-builder ownership with structured multi-channel content delivery',
    concerns: ['template-driven CMS versus headless CMS', 'editor flexibility versus frontend control', 'multisite and omnichannel delivery', 'operational trade-offs for product teams'],
    relatedTopics: ['Why Headless CMS', 'Contentful vs AEM'],
  },
  {
    category: 'Contentful vs AEM',
    topicGroup: 'Fundamentals',
    concern: 'choosing between enterprise DXP workflow depth and lighter headless content delivery',
    concerns: ['headless-first versus DXP platform needs', 'workflow and governance depth', 'frontend integration and delivery models', 'when enterprise teams choose one over the other'],
    relatedTopics: ['Traditional CMS vs Contentful', 'Governance and Ownership'],
  },
  {
    category: 'Contentful vs Sitecore',
    topicGroup: 'Fundamentals',
    concern: 'comparing headless SaaS composability with enterprise experience-platform depth',
    concerns: ['headless content delivery versus fuller DXP expectations', 'authoring and marketing workflow differences', 'operating-model and governance trade-offs', 'when enterprise teams choose one over the other'],
    relatedTopics: ['Contentful vs AEM', 'Platform Standardization'],
  },
  {
    category: 'Contentful vs Sanity and Strapi',
    topicGroup: 'Fundamentals',
    concern: 'evaluating hosted governance, customization flexibility, and editorial operating models',
    concerns: ['hosted SaaS versus self-managed CMS trade-offs', 'schema flexibility and developer control', 'editorial experience and governance differences', 'platform ownership and maintenance burden'],
    relatedTopics: ['Why Headless CMS', 'Platform Standardization'],
  },
  {
    category: 'Reusable Content Models',
    topicGroup: 'Content Modeling',
    concern: 'designing content types that survive multiple pages, channels, and teams without duplication',
    concerns: ['modeling business entities instead of pages', 'reuse across channels and brands', 'balancing flexibility with simplicity', 'avoiding duplicate field structures'],
    relatedTopics: ['Content Types vs Entries', 'Avoiding Over-Modeling'],
  },
  {
    category: 'References and Relationships',
    topicGroup: 'Content Modeling',
    concern: 'connecting entries safely so frontend consumers can resolve nested content without confusion',
    concerns: ['linked entries and relational modeling', 'nested reference traversal', 'editor understanding of relationships', 'query and rendering impact of deep references'],
    relatedTopics: ['One-to-One vs One-to-Many References', 'GraphQL API'],
  },
  {
    category: 'One-to-One vs One-to-Many References',
    topicGroup: 'Content Modeling',
    concern: 'choosing the right relationship shape for reuse, query cost, and editor clarity',
    concerns: ['single reference versus collection reference', 'cardinality decisions in content modeling', 'frontend query shape implications', 'editor experience with linked content'],
    relatedTopics: ['References and Relationships', 'Avoiding Over-Modeling'],
  },
  {
    category: 'Rich Text Modeling',
    topicGroup: 'Content Modeling',
    concern: 'allowing editorial flexibility without losing rendering rules or design consistency',
    concerns: ['when to use rich text versus structured fields', 'allowed embedded content types', 'governing formatting freedom', 'future-proofing rich content models'],
    relatedTopics: ['Rendering Rich Text', 'Embedded Entries'],
  },
  {
    category: 'Field Validations',
    topicGroup: 'Content Modeling',
    concern: 'enforcing editorial rules before weak or invalid content reaches production consumers',
    concerns: ['required fields and value constraints', 'regex and option validations', 'editor guidance through validations', 'keeping validations aligned with frontend contracts'],
    relatedTopics: ['SEO Fields', 'Approval Process'],
  },
  {
    category: 'Localization Modeling',
    topicGroup: 'Content Modeling',
    concern: 'deciding which fields localize and how locale-specific routing and fallback stay consistent',
    concerns: ['localized fields versus global fields', 'locale-aware slug modeling', 'fallback and default locale behavior', 'editor workflow for multilingual content'],
    relatedTopics: ['Multi-language Sites', 'Preview vs Published Content'],
  },
  {
    category: 'SEO Fields',
    topicGroup: 'Content Modeling',
    concern: 'capturing metadata, canonical signals, and page-level search intent without bloating the model',
    concerns: ['title description and canonical fields', 'SEO ownership between editors and developers', 'structured metadata modeling', 'preventing inconsistent SEO fields across content types'],
    relatedTopics: ['Field Validations', 'SEO Implementation'],
  },
  {
    category: 'Avoiding Over-Modeling',
    topicGroup: 'Content Modeling',
    concern: 'preventing giant schemas and one-off fields that make editors and developers slower over time',
    concerns: ['page-specific model anti-patterns', 'schema sprawl from one-off campaigns', 'maintainability of large content types', 'knowing when to split or simplify models'],
    relatedTopics: ['Reusable Content Models', 'Content Model Migrations'],
  },
  {
    category: 'Content Model Migrations',
    topicGroup: 'Content Modeling',
    concern: 'changing schemas safely when frontend applications and existing entries already depend on them',
    concerns: ['schema versioning and compatibility', 'backfilling existing entries', 'rolling out model changes with frontend code', 'testing migration scripts safely'],
    relatedTopics: ['Content Management API', 'Deployment with Content Migration'],
  },
  {
    category: 'Entries and Assets',
    topicGroup: 'Rich Text and Assets',
    concern: 'handling structured entries and media assets with clear publishing, metadata, and rendering boundaries',
    concerns: ['entry lifecycle versus asset lifecycle', 'linked asset and linked entry rendering assumptions', 'draft versus published mismatches', 'missing entry or asset handling in production'],
    relatedTopics: ['Entries vs Assets', 'Asset Optimization'],
  },
  {
    category: 'Rich Text',
    topicGroup: 'Rich Text and Assets',
    concern: 'rendering rich editorial content without losing structure, safety, or design consistency',
    concerns: ['rich text node rendering', 'embedded entries and embedded assets', 'React and Next.js rendering boundaries', 'production failures caused by unexpected rich text shapes'],
    relatedTopics: ['Rich Text Modeling', 'Rendering Rich Text'],
  },
  {
    category: 'Content Delivery API',
    topicGroup: 'APIs',
    concern: 'fetching published content with stable contracts, predictable caching, and efficient payloads',
    concerns: ['published content retrieval patterns', 'query parameters and includes', 'frontend data mapping', 'delivery performance and cache design'],
    relatedTopics: ['Preview vs Published Content', 'Caching Strategy'],
  },
  {
    category: 'Content Preview API',
    topicGroup: 'APIs',
    concern: 'rendering draft content safely so editors can trust preview before publishing',
    concerns: ['draft content access', 'preview token security', 'matching preview rendering to production', 'editor trust in preview workflows'],
    relatedTopics: ['Preview Workflow', 'Preview Not Working'],
  },
  {
    category: 'Content Management API',
    topicGroup: 'APIs',
    concern: 'using privileged write access for migrations, automation, and platform administration safely',
    concerns: ['administrative write operations', 'content automation and bulk updates', 'management token scope', 'schema evolution through API workflows'],
    relatedTopics: ['Content Model Migrations', 'Approval Process'],
  },
  {
    category: 'GraphQL API',
    topicGroup: 'APIs',
    concern: 'selecting precise fields and references while keeping queries maintainable across frontend apps',
    concerns: ['typed content queries', 'query shape and overfetching control', 'reference traversal in GraphQL', 'frontend maintainability of GraphQL contracts'],
    relatedTopics: ['Content Delivery API', 'Pagination'],
  },
  {
    category: 'Frontend Integration',
    topicGroup: 'Rich Text and Assets',
    concern: 'integrating Contentful into frontend applications with safe rendering, caching, and fallback contracts',
    concerns: ['frontend data-access layer design', 'rendering linked entries and assets safely', 'error handling and fallback UI', 'SEO and content freshness implications'],
    relatedTopics: ['Content Delivery API', 'Caching Strategy'],
  },
  {
    category: 'Next.js Integration',
    topicGroup: 'Production and Architecture',
    concern: 'using Contentful safely across SSG, SSR, ISR, preview mode, and route generation in Next.js',
    concerns: ['preview mode and draft content delivery', 'ISR and revalidation timing', 'environment variables and deployment discipline', 'route fallback and SEO behavior'],
    relatedTopics: ['Content Preview API', 'Multi-environment Deployment'],
  },
  {
    category: 'Sync API',
    topicGroup: 'APIs',
    concern: 'tracking content changes incrementally for downstream systems, caches, and data sync jobs',
    concerns: ['incremental change synchronization', 'delta-based downstream updates', 'sync token lifecycle', 'when Sync API fits better than full refetching'],
    relatedTopics: ['Webhooks', 'Caching Strategy'],
  },
  {
    category: 'API Tokens',
    topicGroup: 'APIs',
    concern: 'separating preview, delivery, and management access without leaking broad platform permissions',
    concerns: ['delivery versus preview versus management tokens', 'token rotation and storage', 'environment-specific token use', 'protecting privileged API access'],
    relatedTopics: ['Content Preview API', 'Content Management API'],
  },
  {
    category: 'Rate Limits',
    topicGroup: 'APIs',
    concern: 'handling API quotas, retry behavior, and burst traffic without content outages',
    concerns: ['rate limiting behavior', 'retry and backoff strategies', 'protecting the app from traffic bursts', 'diagnosing quota-related failures'],
    relatedTopics: ['Pagination', 'API Limit Issue'],
  },
  {
    category: 'Pagination',
    topicGroup: 'APIs',
    concern: 'retrieving large entry sets predictably without overfetching or timing out integrations',
    concerns: ['offset and limit handling', 'large dataset traversal', 'frontend and backend batching', 'pagination impact on performance and completeness'],
    relatedTopics: ['GraphQL API', 'Sync API'],
  },
  {
    category: 'Preview vs Published Content',
    topicGroup: 'APIs',
    concern: 'keeping draft and live content paths understandable for editors, QA, and production support',
    concerns: ['draft versus live content state', 'token and endpoint differences', 'cache and environment differences', 'debugging content-state mismatches'],
    relatedTopics: ['Content Delivery API', 'Content Preview API'],
  },
  {
    category: 'Rendering Rich Text',
    topicGroup: 'Rich Text and Assets',
    concern: 'mapping structured rich text JSON to frontend components without layout or SEO regressions',
    concerns: ['rich text JSON rendering', 'frontend component mapping', 'safe handling of formatting and links', 'SEO and accessibility implications of rendered rich text'],
    relatedTopics: ['Rich Text Modeling', 'Rich Text Rendering Mistakes'],
  },
  {
    category: 'Embedded Entries',
    topicGroup: 'Rich Text and Assets',
    concern: 'rendering referenced components inside rich text without creating unsafe frontend assumptions',
    concerns: ['embedded component rendering', 'linked entry resolution', 'editor flexibility versus frontend control', 'fallbacks for unsupported embedded content'],
    relatedTopics: ['Rendering Rich Text', 'References and Relationships'],
  },
  {
    category: 'Embedded Assets',
    topicGroup: 'Rich Text and Assets',
    concern: 'displaying media inside rich text with accessible fallbacks and consistent layout behavior',
    concerns: ['rendering embedded images and media', 'asset metadata usage', 'responsive media behavior', 'accessibility fallbacks for media content'],
    relatedTopics: ['Rendering Rich Text', 'Image Transformations'],
  },
  {
    category: 'Asset Optimization',
    topicGroup: 'Rich Text and Assets',
    concern: 'delivering images and media efficiently across responsive layouts and different devices',
    concerns: ['responsive image delivery', 'format and dimension choices', 'performance impact of media-heavy pages', 'balancing quality with speed'],
    relatedTopics: ['Image Transformations', 'Missing Assets Handling'],
  },
  {
    category: 'Image Transformations',
    topicGroup: 'Rich Text and Assets',
    concern: 'using Contentful image APIs to control size, format, and crop without harming quality',
    concerns: ['image API parameters', 'cropping and resizing strategies', 'modern format delivery', 'preventing poor visual quality from transformations'],
    relatedTopics: ['Asset Optimization', 'CDN Behavior'],
  },
  {
    category: 'Missing Assets Handling',
    topicGroup: 'Rich Text and Assets',
    concern: 'protecting the frontend when referenced media is unpublished, deleted, or incomplete',
    concerns: ['fallbacks for missing media', 'unpublished asset behavior', 'defensive rendering for broken asset references', 'production diagnostics for missing media'],
    relatedTopics: ['Embedded Assets', 'Asset Missing in Production'],
  },
  {
    category: 'Rich Text Rendering Mistakes',
    topicGroup: 'Rich Text and Assets',
    concern: 'avoiding brittle node handling, XSS risks, and component mismatches in frontend renderers',
    concerns: ['unsafe HTML assumptions', 'unsupported node handling', 'renderer drift from content model rules', 'frontend bugs caused by embedded content edge cases'],
    relatedTopics: ['Rendering Rich Text', 'Rich Text Rendering Issue'],
  },
  {
    category: 'Draft vs Published',
    topicGroup: 'Publishing and Workflows',
    concern: 'understanding content lifecycle state before debugging delivery, preview, or editor complaints',
    concerns: ['content lifecycle states', 'publish and unpublish behavior', 'editor understanding of draft versus live content', 'incident diagnosis from content state'],
    relatedTopics: ['Preview vs Published Content', 'Content Not Updating'],
  },
  {
    category: 'Preview Workflow',
    topicGroup: 'Publishing and Workflows',
    concern: 'building editor preview that is secure, trustworthy, and operationally close to production',
    concerns: ['secure preview route design', 'preview parity with production rendering', 'editor approval confidence', 'preview debugging across locales and environments'],
    relatedTopics: ['Content Preview API', 'Preview Not Working'],
  },
  {
    category: 'Webhooks',
    topicGroup: 'Publishing and Workflows',
    concern: 'triggering downstream actions from content events without duplicate builds or stale pages',
    concerns: ['publish event triggers', 'idempotent webhook consumers', 'revalidation and cache invalidation', 'observability for webhook pipelines'],
    relatedTopics: ['Sync API', 'Webhook Not Firing'],
  },
  {
    category: 'Localization',
    topicGroup: 'Publishing and Workflows',
    concern: 'delivering the correct locale, fallback behavior, and translation workflow across multilingual launches',
    concerns: ['localized fields and locale-specific entries', 'locale fallback and route behavior', 'translation workflow and release sequencing', 'SEO implications of partial localization'],
    relatedTopics: ['Localization Modeling', 'Multi-language Sites'],
  },
  {
    category: 'Roles and Permissions',
    topicGroup: 'Publishing and Workflows',
    concern: 'governing who can edit, publish, migrate, and administer content across spaces and environments',
    concerns: ['editor roles and publish rights', 'environment-level access control', 'API token governance', 'approval workflows and production safety'],
    relatedTopics: ['Approval Process', 'Content Management API'],
  },
  {
    category: 'Scheduled Publishing',
    topicGroup: 'Publishing and Workflows',
    concern: 'releasing content on time while coordinating caches, approvals, and release dependencies',
    concerns: ['time-based content releases', 'coordination with application deployments', 'cache freshness around schedules', 'editorial release governance'],
    relatedTopics: ['Draft vs Published', 'Content Release Process'],
  },
  {
    category: 'Environment Aliases',
    topicGroup: 'Publishing and Workflows',
    concern: 'cutting over environments safely without breaking preview, delivery, or deployment assumptions',
    concerns: ['alias-based environment switching', 'safe cutover strategies', 'reducing downtime during content environment changes', 'frontend dependency on environment selection'],
    relatedTopics: ['Spaces and Environments', 'Multi-environment Deployment'],
  },
  {
    category: 'Content Release Process',
    topicGroup: 'Publishing and Workflows',
    concern: 'linking editorial release timing with engineering validation, rollout safety, and rollback plans',
    concerns: ['release checklists for content changes', 'coordination between editors and developers', 'rollback planning for content releases', 'high-risk content change governance'],
    relatedTopics: ['Scheduled Publishing', 'Approval Process'],
  },
  {
    category: 'Editor Workflow',
    topicGroup: 'Publishing and Workflows',
    concern: 'keeping editors productive while still protecting schema quality, preview confidence, and release discipline',
    concerns: ['editor usability and governance balance', 'content-entry process design', 'handoff between editor and developer teams', 'reducing human error in content operations'],
    relatedTopics: ['Approval Process', 'Field Validations'],
  },
  {
    category: 'Approval Process',
    topicGroup: 'Publishing and Workflows',
    concern: 'defining who can change, review, and publish content before high-impact updates go live',
    concerns: ['review and publish permissions', 'workflow gates for critical content', 'auditability of approvals', 'ownership during high-risk content changes'],
    relatedTopics: ['Editor Workflow', 'Governance and Ownership'],
  },
  {
    category: 'Caching Strategy',
    topicGroup: 'Production and Architecture',
    concern: 'keeping content fresh without excessive origin traffic, stale pages, or slow publish visibility',
    concerns: ['cache layers between CMS and user', 'revalidation strategy', 'staleness versus performance trade-offs', 'publish visibility timing'],
    relatedTopics: ['CDN Behavior', 'Content Not Updating'],
  },
  {
    category: 'CDN Behavior',
    topicGroup: 'Production and Architecture',
    concern: 'understanding where Contentful delivery, image, and application caches can drift from content state',
    concerns: ['CDN cache path understanding', 'different cache layers in the stack', 'debugging stale CDN content', 'cache invalidation responsibilities'],
    relatedTopics: ['Caching Strategy', 'Image Transformations'],
  },
  {
    category: 'ISR SSG SSR Usage',
    topicGroup: 'Production and Architecture',
    concern: 'choosing rendering strategy based on freshness, SEO, traffic, and editorial publishing expectations',
    concerns: ['rendering mode trade-offs', 'freshness versus performance', 'SEO and crawlability impact', 'editor expectations around publish timing'],
    relatedTopics: ['Fallback Handling', 'Content Delivery API'],
  },
  {
    category: 'Fallback Handling',
    topicGroup: 'Production and Architecture',
    concern: 'handling missing entries, unpublished routes, or partial data without broken pages',
    concerns: ['safe handling of missing content', 'route fallback behavior', 'editor and user experience on incomplete content', 'preventing hard frontend crashes'],
    relatedTopics: ['Missing Assets Handling', 'Error Handling'],
  },
  {
    category: 'Error Handling',
    topicGroup: 'Production and Architecture',
    concern: 'failing safely when APIs, content shape, or rendering assumptions do not match production reality',
    concerns: ['API failure handling', 'schema mismatch recovery', 'frontend fallback contracts', 'observability and alerting for content failures'],
    relatedTopics: ['Fallback Handling', 'Wrong Content Appearing'],
  },
  {
    category: 'Performance Issues',
    topicGroup: 'Production and Architecture',
    concern: 'investigating slow pages caused by query shape, rich content, assets, or rendering strategy',
    concerns: ['slow query diagnosis', 'rich content rendering cost', 'asset-heavy page performance', 'frontend and CMS boundary bottlenecks'],
    relatedTopics: ['Asset Optimization', 'Rate Limits'],
  },
  {
    category: 'SEO Implementation',
    topicGroup: 'Production and Architecture',
    concern: 'turning CMS-managed metadata into consistent search-friendly page output across routes and locales',
    concerns: ['mapping SEO fields to page output', 'canonical and hreflang handling', 'preventing missing metadata', 'CMS and frontend SEO ownership'],
    relatedTopics: ['SEO Fields', 'Multi-language Sites'],
  },
  {
    category: 'Multi-language Sites',
    topicGroup: 'Production and Architecture',
    concern: 'delivering consistent localized routes, metadata, and fallback behavior across regions',
    concerns: ['localized routing strategy', 'locale fallback rules', 'SEO for multilingual sites', 'operational complexity of multi-region content'],
    relatedTopics: ['Localization Modeling', 'Localization Issue'],
  },
  {
    category: 'Multi-environment Deployment',
    topicGroup: 'Production and Architecture',
    concern: 'coordinating code deploys, schema evolution, and content environments without breaking consumers',
    concerns: ['code and schema rollout sequencing', 'environment-specific content validation', 'cross-team release coordination', 'reducing deployment risk with content changes'],
    relatedTopics: ['Environment Aliases', 'Deployment with Content Migration'],
  },
  {
    category: 'Migration Strategy',
    topicGroup: 'Production and Architecture',
    concern: 'planning safe schema and content change rollout across multiple apps and editorial teams',
    concerns: ['backward-compatible content migrations', 'migration testing and rehearsal', 'communication across consuming teams', 'recovery planning for failed migrations'],
    relatedTopics: ['Content Model Migrations', 'Multi-environment Deployment'],
  },
  {
    category: 'Production Scenarios',
    topicGroup: 'Scenario Questions',
    concern: 'responding calmly when preview, publishing, locale, references, or cache behavior create user-facing incidents',
    concerns: ['content not appearing after publish', 'preview not updating', 'wrong locale or stale content', 'broken references and asset failures'],
    relatedTopics: ['Content Not Updating', 'Preview Not Working'],
  },
  {
    category: 'Content Not Updating',
    topicGroup: 'Scenario Questions',
    concern: 'diagnosing why editors published content but the live website still shows older data',
    concerns: ['published state verification', 'cache invalidation diagnosis', 'frontend data-source validation', 'safest mitigation during live incidents'],
    relatedTopics: ['Caching Strategy', 'Draft vs Published'],
  },
  {
    category: 'Preview Not Working',
    topicGroup: 'Scenario Questions',
    concern: 'tracing preview failures across tokens, environments, draft state, and frontend rendering',
    concerns: ['preview token and environment checks', 'draft content access validation', 'frontend preview route debugging', 'editor trust restoration after preview defects'],
    relatedTopics: ['Preview Workflow', 'Content Preview API'],
  },
  {
    category: 'Wrong Content Appearing',
    topicGroup: 'Scenario Questions',
    concern: 'isolating mismatched locale, entry, environment, or cache selection when pages show unexpected data',
    concerns: ['wrong locale or route mapping', 'cache path mismatch', 'environment mix-up', 'entry resolution debugging'],
    relatedTopics: ['Preview vs Published Content', 'Error Handling'],
  },
  {
    category: 'Rich Text Rendering Issue',
    topicGroup: 'Scenario Questions',
    concern: 'debugging structured rich text output when embedded content or formatting breaks the UI',
    concerns: ['node-level rendering mismatch', 'embedded content edge cases', 'frontend component mapping regressions', 'safe incident triage for broken rich content'],
    relatedTopics: ['Rendering Rich Text', 'Rich Text Rendering Mistakes'],
  },
  {
    category: 'Asset Missing in Production',
    topicGroup: 'Scenario Questions',
    concern: 'recovering when image or media references resolve differently between preview and production',
    concerns: ['published versus preview asset state', 'broken asset references', 'CDN and URL validity checks', 'fallback behavior during live asset failures'],
    relatedTopics: ['Missing Assets Handling', 'Embedded Assets'],
  },
  {
    category: 'Webhook Not Firing',
    topicGroup: 'Scenario Questions',
    concern: 'finding why downstream cache or build automation never receives the expected publish event',
    concerns: ['webhook delivery logs', 'endpoint validation and retries', 'signature or auth issues', 'downstream consumer observability'],
    relatedTopics: ['Webhooks', 'Sync API'],
  },
  {
    category: 'Localization Issue',
    topicGroup: 'Scenario Questions',
    concern: 'resolving mixed-language pages, wrong locale fallbacks, or localized slug mismatches',
    concerns: ['locale fallback debugging', 'localized slug mismatches', 'entry completeness checks', 'frontend locale resolution issues'],
    relatedTopics: ['Localization Modeling', 'Multi-language Sites'],
  },
  {
    category: 'API Limit Issue',
    topicGroup: 'Scenario Questions',
    concern: 'stabilizing the site or integration when Contentful API quotas start rejecting or throttling requests',
    concerns: ['quota breach diagnosis', 'retry and backoff handling', 'traffic shaping and caching mitigation', 'design changes to reduce API dependence'],
    relatedTopics: ['Rate Limits', 'Pagination'],
  },
  {
    category: 'Content Model Change Breaking Frontend',
    topicGroup: 'Scenario Questions',
    concern: 'responding when schema changes ship faster than frontend queries and renderers can adapt',
    concerns: ['schema drift detection', 'affected consumer identification', 'rollback versus forward-fix strategy', 'prevention through compatibility checks'],
    relatedTopics: ['Content Model Migrations', 'Content Management API'],
  },
  {
    category: 'Deployment with Content Migration',
    topicGroup: 'Scenario Questions',
    concern: 'sequencing code rollout, data backfill, and environment promotion without breaking live pages',
    concerns: ['deployment sequencing with schema change', 'migration backfill timing', 'consumer readiness checks', 'recovery strategy during rollout issues'],
    relatedTopics: ['Migration Strategy', 'Multi-environment Deployment'],
  },
  {
    category: 'Multi-app Content Platform',
    topicGroup: 'Architecture Questions',
    concern: 'serving multiple web and app consumers from one Contentful platform without contract drift',
    concerns: ['shared models across multiple consumers', 'contract governance across apps', 'platform reuse without consumer breakage', 'ownership boundaries for shared content'],
    relatedTopics: ['Governance and Ownership', 'Platform Standardization'],
  },
  {
    category: 'Governance and Ownership',
    topicGroup: 'Architecture Questions',
    concern: 'deciding who owns schemas, migrations, publishing rules, and cross-team quality gates',
    concerns: ['schema ownership model', 'editor versus engineering responsibilities', 'review and change-control standards', 'long-term platform accountability'],
    relatedTopics: ['Approval Process', 'Multi-app Content Platform'],
  },
  {
    category: 'Platform Standardization',
    topicGroup: 'Architecture Questions',
    concern: 'creating repeatable modeling, preview, and integration patterns instead of one-off team decisions',
    concerns: ['standard modeling conventions', 'shared preview and delivery patterns', 'reducing one-off integrations', 'architectural consistency across teams'],
    relatedTopics: ['Reusable Content Models', 'Governance and Ownership'],
  },
  {
    category: 'Integration Strategy',
    topicGroup: 'Architecture Questions',
    concern: 'choosing how frontend apps, search, personalization, and downstream services consume Contentful safely',
    concerns: ['frontend integration boundaries', 'search and indexing pipelines', 'personalization and downstream data consumers', 'platform-wide API consumption patterns'],
    relatedTopics: ['GraphQL API', 'Webhooks'],
  },
  {
    category: 'Architect-Level Questions',
    topicGroup: 'Architecture Questions',
    concern: 'governing Contentful as a shared platform across teams, locales, channels, and release workflows',
    concerns: ['platform standardization and ownership', 'schema evolution for multiple consumers', 'composable architecture boundaries', 'long-term maintainability of a shared CMS platform'],
    relatedTopics: ['Multi-app Content Platform', 'Platform Standardization'],
  },
];

function buildProfile(seed: TopicSeed): TopicProfile {
  if (seed.topicGroup === 'Fundamentals') {
    return {
      mechanism: `${seed.category} explains how Contentful separates structured content management from frontend rendering and release behavior.`,
      implementation: `Frame ${seed.category} through editor workflow, API delivery, and frontend ownership so the team shares one content contract.`,
      failure: `teams answer ${seed.category} as a feature list and then make poor platform choices around modeling, ownership, or integration`,
      decision: `when ${seed.category} is enough for the current product and when broader platform governance is required`,
      incident: `a team adopts Contentful quickly but later realizes different apps and editors interpret ${seed.category} differently`,
      evidence: ['architecture comparison notes', 'content model overview', 'consumer integration expectations'],
    };
  }

  if (seed.topicGroup === 'Content Modeling') {
    return {
      mechanism: `${seed.category} shapes the schema, relationships, and validation rules that every editor and consumer depends on.`,
      implementation: `Design ${seed.category} with reusable business entities, clear field purpose, and validation rules that match frontend needs.`,
      failure: `weak ${seed.category} decisions create duplicated fields, confusing editor UX, and brittle frontend rendering`,
      decision: `how much modeling flexibility to allow before the schema becomes difficult to govern and evolve`,
      incident: `a content change request exposes that ${seed.category} was modeled too narrowly for reuse and too loosely for safe delivery`,
      evidence: ['content type definitions', 'field validation rules', 'sample entries from affected pages'],
    };
  }

  if (seed.topicGroup === 'APIs') {
    return {
      mechanism: `${seed.category} controls how applications access Contentful data, permissions, and delivery guarantees.`,
      implementation: `Implement ${seed.category} with explicit token scope, stable query design, and operational rules for cache, retry, and validation.`,
      failure: `teams misuse ${seed.category} and end up with stale pages, weak security boundaries, or expensive integrations`,
      decision: `which API path fits the content lifecycle, security model, and frontend rendering strategy`,
      incident: `an integration depending on ${seed.category} starts behaving differently across environments, caches, or draft states`,
      evidence: ['API request traces', 'token and environment settings', 'response shape comparisons'],
    };
  }

  if (seed.topicGroup === 'Rich Text and Assets') {
    return {
      mechanism: `${seed.category} sits at the boundary between flexible editorial content and strict frontend rendering expectations.`,
      implementation: `Handle ${seed.category} with explicit component mappings, asset fallbacks, and performance-aware rendering rules.`,
      failure: `pages become inconsistent or fragile because ${seed.category} was treated like unstructured content`,
      decision: `how much editorial freedom to allow before accessibility, performance, or design consistency suffer`,
      incident: `a release containing ${seed.category} looks correct in editorial review but breaks layout or media behavior in production`,
      evidence: ['renderer output snapshots', 'asset metadata and dimensions', 'frontend fallback behavior'],
    };
  }

  if (seed.topicGroup === 'Publishing and Workflows') {
    return {
      mechanism: `${seed.category} governs how draft content becomes trusted live content across editors, reviewers, and downstream systems.`,
      implementation: `Define ${seed.category} with clear ownership, publish expectations, and safe automation around preview and rollout steps.`,
      failure: `unclear ${seed.category} rules create release confusion, stale pages, or risky publishing shortcuts`,
      decision: `how much control, automation, and review the team needs before content changes can safely reach users`,
      incident: `an editor workflow involving ${seed.category} works informally until a high-impact release exposes gaps in ownership or rollout safety`,
      evidence: ['publish audit history', 'workflow ownership notes', 'preview and release configuration'],
    };
  }

  if (seed.topicGroup === 'Production and Architecture') {
    return {
      mechanism: `${seed.category} influences how Contentful behaves under real production traffic, release cadence, and multi-system integration.`,
      implementation: `Treat ${seed.category} as an operational design choice with explicit cache, rendering, deployment, and recovery rules.`,
      failure: `the platform appears fine in development but ${seed.category} becomes a reliability or performance risk under live publishing conditions`,
      decision: `which production trade-off around ${seed.category} best balances freshness, speed, safety, and platform simplicity`,
      incident: `a user-facing issue reveals that ${seed.category} assumptions were never aligned across the CMS, frontend, and delivery pipeline`,
      evidence: ['cache and revalidation traces', 'deployment timeline', 'production monitoring signals'],
    };
  }

  if (seed.topicGroup === 'Scenario Questions') {
    return {
      mechanism: `${seed.category} is a real production incident pattern that sits across content state, API behavior, cache flow, and rendering logic.`,
      implementation: `Respond to ${seed.category} by tracing the exact boundary that is wrong before changing content, code, or environment settings.`,
      failure: `teams guess at ${seed.category} from one layer only and miss the actual mismatch causing the user-facing issue`,
      decision: `which signal to trust first and which rollback or mitigation keeps the incident small while evidence is gathered`,
      incident: `${seed.category} reaches production and multiple teams disagree on whether the CMS, cache, or frontend is responsible`,
      evidence: ['published versus preview comparison', 'request and response traces', 'recent content and release changes'],
    };
  }

  return {
    mechanism: `${seed.category} is an architecture concern that determines whether Contentful stays governable as a shared platform.`,
    implementation: `Standardize ${seed.category} with documented ownership, contract rules, and migration expectations across consumers.`,
    failure: `the platform works short term, but ${seed.category} stays implicit and cross-team changes become risky over time`,
    decision: `how to scale ${seed.category} without creating duplicate patterns or uncontrolled schema drift`,
    incident: `multiple teams depending on Contentful discover that ${seed.category} was never clearly governed across apps and release paths`,
    evidence: ['architecture decision records', 'consumer contract documentation', 'schema governance standards'],
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

function buildQuestion(spec: TopicSpec, intent: Intent, index: number): InterviewPrepQuestion {
  const concern = spec.concerns[index % spec.concerns.length];
  const industry = industries[hash(`${spec.category}-${intent}`) % industries.length];
  const directAnswer = intent === 'concept'
    ? `${spec.profile.mechanism} For ${spec.category}, the production-relevant concern is ${concern}.`
    : intent === 'implementation'
      ? `In Contentful, implement ${spec.category} so ${concern} is controlled through model rules, API discipline, frontend contracts, and safe publishing workflows.`
      : intent === 'comparison'
        ? `Compare ${spec.category} in Contentful through delivery model, governance depth, editor workflow, and long-term integration cost, especially around ${concern}.`
        : intent === 'scenario'
          ? `Treat ${spec.category} as a live delivery scenario where ${concern} must be handled with clear triage order, evidence, and low-risk mitigation.`
          : intent === 'senior'
            ? `A senior Contentful answer for ${spec.category} should connect ${concern} to ownership, consumer contracts, release discipline, and operational evidence.`
      : intent === 'troubleshooting'
        ? `Treat ${spec.category} as a boundary across content state, API behavior, cache, and rendering, then test the safest hypotheses before broad changes.`
        : `For Contentful ${spec.category}, the design decision is ${spec.profile.decision}. The answer must balance ${concern}, editor experience, frontend safety, platform governance, and release speed.`;

  return {
    id: `contentful-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'contentful',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question: intent === 'concept'
      ? `Explain ${spec.category} in Contentful with focus on ${concern}. Why does it matter in real CMS and frontend delivery work?`
      : intent === 'implementation'
        ? `How would you implement ${spec.category} in Contentful so ${concern} is handled safely in production?`
        : intent === 'comparison'
          ? `How would you compare Contentful decisions around ${spec.category} when ${concern} is the main evaluation point?`
          : intent === 'scenario'
            ? `What would you do in a real Contentful scenario where ${spec.category} is involved and ${concern} starts creating delivery risk?`
            : intent === 'senior'
              ? `As a senior developer, how would you discuss ${spec.category} in Contentful when ${concern} affects multiple teams or consumers?`
        : intent === 'troubleshooting'
          ? `How would you troubleshoot a Contentful production issue involving ${spec.category} when ${concern} becomes the likely failure area?`
          : `How would you make an architecture decision about ${spec.category} in Contentful when ${concern} becomes critical across teams and channels?`,
    shortAnswer: `${directAnswer} Validate it with ${spec.profile.evidence[0]}.`,
    detailedAnswer: [
      `Direct answer: ${directAnswer}`,
      `What: ${spec.profile.mechanism}`,
      `Why: Contentful teams care because ${spec.profile.failure}, especially around ${concern}.`,
      `How: ${spec.profile.implementation}`,
      `Production validation: Prove the answer with ${list(spec.profile.evidence)}.`,
      `Architecture decision: ${spec.profile.decision}.`,
    ],
    productionScenario: `A ${industry} team using Contentful is facing this signal: ${spec.profile.incident}. The engineer must explain how ${spec.category} and ${concern} influence the issue, isolate the boundary, and restore confidence without creating new content or release risk.`,
    realProjectExample: `On a ${industry} platform, the team used Contentful ${spec.category} to address ${concern}. The solution only became reliable after they validated the workflow with ${list(spec.profile.evidence)} and aligned both editors and frontend developers on the same contract.`,
    interviewerExpectation: `The interviewer expects a concrete Contentful answer that connects ${spec.category} to ${concern}, explains the trade-offs, and shows how the team would verify the behavior in a live content platform.`,
    commonMistakes: [
      `Giving a feature definition of ${spec.category} without explaining how it behaves across editors, APIs, caches, and frontend consumers.`,
      `Ignoring this Contentful design choice: ${spec.profile.decision}.`,
      `Troubleshooting ${spec.category} by changing content or settings before collecting ${spec.profile.evidence[0]}.`,
      `Skipping governance, publishing, or rendering implications for ${spec.category}.`,
    ],
    followUpQuestions: [
      `Which Contentful dependency most changes your answer for ${spec.category} and ${concern}: content model, API path, preview flow, or frontend rendering?`,
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
    commonWrongAnswer: `A weak answer names Contentful features but does not explain ${concern}, model design, publishing flow, rendering safety, evidence, or operational ownership for ${spec.category}.`,
    architectPerspective: `Architects govern Contentful ${spec.category} through this explicit decision: ${spec.profile.decision}. They evaluate editor workflow, consumer impact, schema evolution, cache behavior, and the user-facing signal "${spec.profile.incident}".`,
    keyTakeaway: `Explain Contentful ${spec.category} through ${concern}, content-platform boundaries, operating evidence, and decision trade-offs rather than only through CMS terminology.`,
    difficultyLevel: difficultyByIntent[intent],
    experienceLevel: experienceByIntent[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I can explain the purpose of Contentful ${spec.category} and the safe baseline workflow around it.`,
      mid: `I can implement Contentful ${spec.category} with repeatable model, API, and frontend integration discipline.`,
      senior: `I can troubleshoot Contentful ${spec.category} in production using ${list(spec.profile.evidence)} and recent-change analysis.`,
      architect: `I can choose and govern a Contentful ${spec.category} pattern using ${spec.profile.decision}.`,
    },
    isMostAsked: index < 48,
    mostAskedRank: index < 48 ? index + 1 : undefined,
    isRapidRevision: index < 20,
  };
}

const questions = topicSpecs.flatMap((spec, specIndex) => {
  const specIntents = getIntentsForSpec(spec);
  return spec.concerns.flatMap((_, concernIndex) => specIntents.map((intent, intentIndex) => (
    buildQuestion(spec, intent, (((specIndex * spec.concerns.length) + concernIndex) * specIntents.length) + intentIndex)
  )));
});

const topicGroups: InterviewPrepTopicGroup[] = contentfulInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in Contentful implementations.`,
  topics: group.topics.map((topic) => topic.category),
}));

const questionsPerPage = 10;

const topicMetadata = topicSpecs.map((spec) => {
  const topicQuestions = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    topicGroup: spec.topicGroup,
    totalQuestions: topicQuestions.length,
    estimatedPreparationMinutes: Math.max(18, Math.round(topicQuestions.length * 4.5)),
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
    mostAskedQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 12).map((question) => question.id),
    lastMinuteQuestionIds: ranked.slice(0, 5).map((question) => question.id),
  };
});

const productionScenarios = [
  {
    id: 'contentful-preview-production-mismatch',
    title: 'Preview looked right but production content is still wrong',
    topic: 'Preview Workflow',
    problem: 'Editors approved a content update in preview, but the live route still shows an older or structurally different version after publish.',
    rootCauseAnalysis: ['Preview used a different environment or token path than production', 'Published content was cached or revalidated incorrectly', 'The frontend rendering contract differs between preview and published data paths'],
    troubleshootingSteps: ['Compare draft and published responses for the same entry', 'Verify environment, token, and locale settings', 'Inspect cache invalidation or revalidation flow', 'Confirm the frontend renderer handles both paths consistently'],
    expectedInterviewAnswer: 'The candidate should isolate content state, environment selection, and cache or rendering drift before blaming editors or redeploying blindly.',
    seniorApproach: 'A senior answer includes response comparison, publish audit review, cache-path verification, and a safe rollback or refresh plan.',
    architectApproach: 'An architect standardizes preview contracts, publish expectations, and revalidation behavior so editorial trust stays high.',
    relatedQuestions: questions.filter((question) => question.category === 'Preview Workflow').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'contentful-model-migration-regression',
    title: 'Content model change breaks multiple pages after release',
    topic: 'Content Model Migrations',
    problem: 'A schema or migration update goes live and several frontend pages fail because entries no longer match the expected structure.',
    rootCauseAnalysis: ['The content model change was applied without validating consumer impact', 'Migration backfill was incomplete', 'Frontend queries and renderers still assume the previous field or reference structure'],
    troubleshootingSteps: ['Review the changed content type and migration logs', 'Identify which entries and consumers are affected', 'Restore or patch the broken contract safely', 'Add compatibility checks before future model releases'],
    expectedInterviewAnswer: 'The answer should treat content-model evolution like a production release problem with schema, data, and consumer coordination.',
    seniorApproach: 'A senior answer covers migration audit, partial rollback strategy, data backfill, and consumer validation.',
    architectApproach: 'An architect introduces stronger schema governance, migration review, and multi-consumer contract discipline.',
    relatedQuestions: questions.filter((question) => question.category === 'Content Model Migrations').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'contentful-webhook-cache-storm',
    title: 'Publishing triggers repeated rebuilds and stale content windows',
    topic: 'Webhooks',
    problem: 'A content publish triggers multiple downstream rebuilds, cache churn, and inconsistent freshness across the website.',
    rootCauseAnalysis: ['Webhook consumers were not idempotent', 'Every event triggered broad refreshes instead of targeted revalidation', 'The publish pipeline lacked observability and deduplication'],
    troubleshootingSteps: ['Review webhook delivery and retry logs', 'Trace which downstream actions were triggered', 'Disable or narrow the broadest invalidation path', 'Add idempotency and targeted refresh rules'],
    expectedInterviewAnswer: 'The best answer treats it as an event-design problem rather than only a frontend problem.',
    seniorApproach: 'A senior answer includes delivery-log analysis, targeted mitigation, and observability improvements for the content event pipeline.',
    architectApproach: 'An architect redesigns publish automation so event handling stays focused, secure, and scalable.',
    relatedQuestions: questions.filter((question) => question.category === 'Webhooks').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'contentful-localization-launch-gap',
    title: 'New locale launches with mixed-language content',
    topic: 'Localization Modeling',
    problem: 'A newly launched locale shows fallback text, inconsistent slugs, and incomplete content on several high-traffic pages.',
    rootCauseAnalysis: ['Localized fields and fallback behavior were not modeled consistently', 'Locale completeness was not validated before publish', 'Frontend routing assumed all locales had the same slug and content readiness'],
    troubleshootingSteps: ['Audit localized field completeness for affected entries', 'Verify locale fallback and slug behavior', 'Patch the highest-visibility gaps first', 'Add pre-launch locale validation and publishing checks'],
    expectedInterviewAnswer: 'The candidate should connect model design, locale operations, and frontend routing instead of treating it as translation-only work.',
    seniorApproach: 'A senior answer combines locale-content audit, route verification, and safe rollout sequencing for unfinished regions.',
    architectApproach: 'An architect defines locale strategy, ownership, slug policy, and validation gates before scaling to more markets.',
    relatedQuestions: questions.filter((question) => question.category === 'Localization Modeling').slice(0, 4).map((question) => question.id),
  },
];

export const contentfulInterviewPrep: InterviewPrepSection = {
  technologyId: 'contentful',
  technologyLabel: 'Contentful',
  title: 'Contentful Interview Prep',
  description: 'Contentful interview preparation focused on content modeling, APIs, rich text rendering, assets, publishing workflows, localization, production troubleshooting, and CMS architecture decisions.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Junior CMS / Frontend Developer', years: '0-2 Years', summary: 'Explain Contentful basics, content modeling fundamentals, APIs, and simple frontend integration patterns.' },
    { id: 'mid', label: 'Contentful Developer', years: '2-5 Years', summary: 'Implement content models, previews, webhooks, localization, and reliable frontend delivery workflows.' },
    { id: 'senior', label: 'Senior CMS / Content Platform Engineer', years: '5-8 Years', summary: 'Lead production troubleshooting, governance, migrations, and cross-team content platform decisions.' },
    { id: 'architect', label: 'CMS Architect', years: '8+ Years', summary: 'Design multi-team Contentful platforms with safe schema evolution, localization strategy, and multi-channel delivery governance.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Junior CMS Developer', description: 'Fundamentals, content modeling basics, APIs, and rendering awareness.', questionCount: 10, recommendedMinutes: 30 },
    { id: 'mid', label: 'Contentful Developer', description: 'Preview, delivery, schema discipline, frontend integration, and publishing workflows.', questionCount: 12, recommendedMinutes: 40 },
    { id: 'senior', label: 'Senior CMS Engineer', description: 'Production support, migrations, localization, and multi-team content-platform trade-offs.', questionCount: 12, recommendedMinutes: 50 },
    { id: 'architect', label: 'CMS Architect', description: 'Platform governance, multi-app delivery, locale strategy, and long-term maintainability.', questionCount: 10, recommendedMinutes: 55 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-signal Contentful fundamentals, modeling, delivery, and workflow questions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 14).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Contentful content modeling, APIs, preview, localization, and production support.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 28).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Contentful preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 60).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
