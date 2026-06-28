import type { TopicContent } from '../types';

type TopicSpec = {
  slug: string;
  title: string;
  description: string;
  quickUnderstanding: string;
  whatIsIt: string;
  whyWeNeedIt: string;
  realWorldUsage: string;
  howItWorks: string;
  exampleTitle: string;
  exampleDescription: string;
  exampleCode: string;
  commonConfusions: Array<{ question: string; answer: string }>;
  productionIssues: string[];
  bestPractices: string[];
  faqs: Array<{ question: string; answer: string }>;
  keyTakeaways: string[];
  relatedTopics: string[];
  architectNote: string;
  applicableVersions?: string[];
};

function makeTopic(spec: TopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: spec.applicableVersions ?? ['AEM 6.5', 'AEM as a Cloud Service'],
    lastReviewed: 'June 2026',
    quickUnderstanding: spec.quickUnderstanding,
    whatIsIt: spec.whatIsIt,
    whyWeNeedIt: spec.whyWeNeedIt,
    realWorldUsage: spec.realWorldUsage,
    howItWorks: spec.howItWorks,
    example: {
      title: spec.exampleTitle,
      description: spec.exampleDescription,
      code: [
        {
          label: spec.exampleTitle,
          language: 'text',
          code: spec.exampleCode,
        },
      ],
    },
    commonConfusions: spec.commonConfusions,
    productionIssues: spec.productionIssues,
    bestPractices: spec.bestPractices,
    architectNote: spec.architectNote,
    faqs: spec.faqs,
    keyTakeaways: spec.keyTakeaways,
    relatedTopics: spec.relatedTopics,
  };
}

export const aemSitesAssetsForms = makeTopic({
  slug: 'aem-sites-assets-forms',
  title: 'AEM Sites, Assets, and Forms',
  description: 'Understand the three major AEM product areas, when each one matters, and how enterprise teams combine them.',
  quickUnderstanding: 'AEM Sites handles page-based digital experiences, AEM Assets manages media and metadata, and AEM Forms supports document-heavy and workflow-heavy form journeys.',
  whatIsIt: `AEM is not a single feature. It is a platform with multiple product areas:

- **AEM Sites** for page authoring, templates, components, and publishing
- **AEM Assets** for DAM workflows, renditions, metadata, and media delivery
- **AEM Forms** for document generation, adaptive forms, and regulated workflows

Many enterprises use only Sites. Others combine Sites with Assets, Forms, or Adobe ecosystem integrations depending on the customer journey.`,
  whyWeNeedIt: `Teams need to understand these boundaries because implementation choices change quickly:

- A content team may need page authoring without DAM complexity
- A commerce or brand team may need centralized asset governance
- A banking or insurance team may need Forms workflows, signatures, and document output

If a team treats all three as the same thing, architecture and staffing decisions become confused.`,
  realWorldUsage: `A retail program might use Sites for campaign pages, Assets for product imagery and metadata, and Forms for partner onboarding. A healthcare organization may use Sites for public content, Assets for governed medical illustrations, and Forms for secure intake workflows.`,
  howItWorks: `The three areas share repository, security, and deployment foundations, but their runtime concerns differ:

1. Sites centers on templates, components, content hierarchy, and caching
2. Assets centers on binary processing, metadata, renditions, and search
3. Forms centers on submission handling, document services, workflow, and compliance

Architecturally, the question is not "Can AEM do this?" but "Which AEM capability owns this responsibility?"`,
  exampleTitle: 'Platform fit mapping',
  exampleDescription: 'A simple way to decide which AEM capability should own a business requirement.',
  exampleCode: `Requirement: marketing landing page
Owner: AEM Sites

Requirement: approved brand imagery with metadata and renditions
Owner: AEM Assets

Requirement: regulated onboarding form with document generation
Owner: AEM Forms

Requirement: omnichannel product description reused in web and app
Owner: Sites + Content Fragments, with Assets for media`,
  commonConfusions: [
    {
      question: 'Is AEM Forms required for every website form?',
      answer: 'No. Many simple contact or lead forms use normal Sites components plus backend integration. AEM Forms is valuable when you need adaptive forms, document workflows, compliance, or deep form lifecycle management.',
    },
    {
      question: 'Does using Assets automatically mean the site is headless?',
      answer: 'No. Assets supports traditional page delivery, hybrid delivery, and headless usage. DAM adoption does not force a headless architecture.',
    },
  ],
  productionIssues: [
    'Sites pages perform well but DAM delivery is slow because renditions, CDN behavior, or metadata-heavy search paths were never tuned.',
    'Form submission ownership is unclear between AEM, middleware, and CRM systems, causing retries and reconciliation gaps.',
    'Large enterprises overuse Sites components for asset workflows that belong in DAM governance and processing.',
  ],
  bestPractices: [
    'Decide early which product area owns page delivery, asset governance, and form processing.',
    'Keep Sites content models separate from DAM metadata models and Forms data contracts.',
    'Document cross-product dependencies so releases do not break hidden asset or form assumptions.',
  ],
  faqs: [
    {
      question: 'Can one project use Sites, Assets, and Forms together?',
      answer: 'Yes. Large programs often combine them, but each capability should have clear ownership, lifecycle rules, and support expectations.',
    },
    {
      question: 'Should every AEM developer know Forms deeply?',
      answer: 'Not always. Every AEM developer should understand the boundary. Deep Forms specialization depends on project needs.',
    },
  ],
  keyTakeaways: [
    'AEM Sites, Assets, and Forms solve different delivery problems',
    'Capability boundaries shape architecture and staffing decisions',
    'Enterprises often combine them, but ownership must stay explicit',
  ],
  relatedTopics: ['architecture', 'assets-and-dam', 'headless-aem', 'aem-integrations'],
  architectNote: `The strongest AEM teams treat Sites, Assets, and Forms as related but distinct platform capabilities. That prevents page teams from reinventing DAM workflows and keeps form-heavy compliance journeys from being modeled as simple content pages.`,
});

export const oakRepository = makeTopic({
  slug: 'oak-repository',
  title: 'Oak Repository Basics',
  description: 'Learn how Apache Jackrabbit Oak underpins AEM storage, indexing, queries, and operational trade-offs.',
  quickUnderstanding: 'Oak is the storage and query engine behind AEM. It matters because indexing, query performance, and repository behavior often decide how stable AEM stays in production.',
  whatIsIt: `Apache Jackrabbit Oak is AEM's JCR implementation. It is responsible for:

- node and property persistence
- indexing and query execution
- observation and repository events
- versioning and content consistency behavior

Developers talk about JCR daily, but production performance and support issues often come down to Oak behavior.`,
  whyWeNeedIt: `You need Oak awareness because repository issues are rarely "just content problems":

- traversal-heavy queries become slow because indexes are wrong
- repository growth affects maintenance and backup behavior
- observation-heavy workflows can create unexpected load
- Cloud Service still uses Oak concepts even though infrastructure is managed for you`,
  realWorldUsage: `AEM teams touch Oak indirectly through page storage, Content Fragments, asset metadata, queries, workflow payloads, versioning, and indexing. During production incidents, logs, explain plans, and index definitions often matter more than component code.`,
  howItWorks: `Oak exposes the JCR tree while internally deciding how data and indexes are stored. The practical model is:

1. Content is written as nodes and properties
2. Oak indexes selected fields and paths
3. Queries are evaluated against available indexes
4. Bad index design causes traversal, latency, and CPU spikes
5. Versioning, observation, and workflow load all add repository pressure`,
  exampleTitle: 'Repository thinking',
  exampleDescription: 'How a small modeling choice becomes an Oak performance issue.',
  exampleCode: `Model choice:
/content/site/articles/article-1
  category = "banking"
  publishDate = "2026-06-01"

Business asks:
"List the latest banking articles under /content/site"

Healthy path:
- create an index that supports path + category + publishDate
- limit result count
- sort with indexed properties

Risky path:
- query all articles
- filter in code
- sort in memory`,
  commonConfusions: [
    {
      question: 'If I know JCR, do I already know Oak?',
      answer: 'Not fully. JCR explains the content model. Oak explains the operational reality behind indexing, query cost, and repository behavior.',
    },
    {
      question: 'Does Cloud Service remove the need to understand indexes?',
      answer: 'No. Adobe manages infrastructure, but your content model and index definitions still determine query quality.',
    },
  ],
  productionIssues: [
    'Query latency spikes after content growth because the original index no longer supports the live predicate mix.',
    'Repository version history grows unexpectedly because teams enable version-heavy workflows without retention discipline.',
    'Operational teams blame AEM generally when the root issue is an index or repository-model problem.',
  ],
  bestPractices: [
    'Design content structure and index strategy together.',
    'Review explain plans before large content launches.',
    'Avoid broad repository scans hidden inside components or services.',
  ],
  faqs: [
    {
      question: 'When should a developer care about Oak directly?',
      answer: 'Whenever queries, versioning, content growth, indexing, or repository-heavy incidents are involved.',
    },
    {
      question: 'Is Oak only an architect concern?',
      answer: 'No. Mid-level and senior AEM developers need enough Oak understanding to debug performance and content-model issues responsibly.',
    },
  ],
  keyTakeaways: [
    'JCR is the content API model; Oak is the repository engine',
    'Indexes decide whether content growth stays safe or becomes painful',
    'Oak awareness is essential for performance and production support',
  ],
  relatedTopics: ['jcr', 'query-builder-and-indexing', 'aem-performance', 'workflows'],
  architectNote: `Repository design is one of the highest-leverage AEM architecture decisions. Weak component code can often be fixed locally. Weak repository and index design becomes a platform-wide tax that grows with every new site, market, and workflow.`,
});

export const queryBuilderAndIndexing = makeTopic({
  slug: 'query-builder-and-indexing',
  title: 'Query Builder and Oak Indexing',
  description: 'Understand how Query Builder, JCR SQL2, and Oak indexes work together to keep AEM queries safe in production.',
  quickUnderstanding: 'Query Builder and JCR SQL2 are ways to express repository searches. The real question is whether Oak has the right indexes to run those searches efficiently.',
  whatIsIt: `AEM teams use:

- **Query Builder** for predicate-based repository searches
- **JCR SQL2** for more explicit query logic
- **Oak indexes** to make those queries performant

Query syntax is the easy part. Index support, path scoping, ordering, and result limits are the real production concerns.`,
  whyWeNeedIt: `Search and listing features are everywhere in AEM:

- article pages list related content
- DAM views filter assets by metadata
- components fetch authored content by tag or model
- support tools inspect content state

Without disciplined query design, small features create large repository load.`,
  realWorldUsage: `A team may build a "Latest News" component using Query Builder, but if the predicate is unbounded or unsupported by indexes, Publish latency rises under load. A safer implementation aligns predicates, path restrictions, sort fields, and result limits with a tested Oak index.`,
  howItWorks: `Healthy query flow:

1. Start with a precise business need
2. Restrict path, type, and fields
3. Choose Query Builder or JCR SQL2 based on clarity
4. Validate the explain plan
5. Add or adjust Oak indexes when needed
6. Set limits and fallbacks so a slow query cannot fan out across the repository`,
  exampleTitle: 'Safe query checklist',
  exampleDescription: 'A practical pattern for repository-backed listing components.',
  exampleCode: `Need: articles tagged "loans" under /content/site/us

Checklist:
- path restricted to /content/site/us
- node type explicit
- tag field indexed
- publish date indexed for sorting
- result limit = 10
- no post-filtering in Java
- explain plan reviewed before release`,
  commonConfusions: [
    {
      question: 'Is Query Builder always better than SQL2 because it is more "AEM native"?',
      answer: 'No. Query Builder is convenient, but SQL2 can be clearer for some use cases. The decisive factor is correctness, readability, and index support.',
    },
    {
      question: 'If the query works locally, is it production-safe?',
      answer: 'Not necessarily. Small datasets can hide traversal and sort problems that appear only under real content volume.',
    },
  ],
  productionIssues: [
    'A component works in lower environments but times out in production after content volume crosses an index threshold.',
    'An authoring console becomes slow because DAM metadata filters were added without index review.',
    'Teams blame Dispatcher or CDN for latency that actually begins in Oak query cost.',
  ],
  bestPractices: [
    'Review query plans with realistic content volume.',
    'Prefer narrow repository scopes and explicit limits.',
    'Treat index changes as platform changes with validation, not as casual fixes.',
  ],
  faqs: [
    {
      question: 'When should I use Query Builder versus JCR SQL2?',
      answer: 'Use the one that expresses the requirement clearly and predictably. Then validate that Oak can execute it efficiently.',
    },
    {
      question: 'Can I sort in code if indexing is hard?',
      answer: 'Only for tiny, bounded result sets. Sorting large repository reads in application code is a common performance trap.',
    },
  ],
  keyTakeaways: [
    'Good query syntax is not enough without good indexes',
    'Explain plans matter more than local success',
    'Path limits, sort support, and result caps are non-negotiable in production',
  ],
  relatedTopics: ['jcr', 'oak-repository', 'aem-performance', 'graphql'],
  architectNote: `Query governance should be part of AEM platform standards. A site can survive one inefficient component, but repeated "small" query shortcuts across brands and regions become an expensive operational habit.`,
});

export const coreComponentsAndDialogs = makeTopic({
  slug: 'core-components-and-dialogs',
  title: 'Core Components, Dialogs, and Policies',
  description: 'Learn how modern AEM component delivery combines Core Components, cq:dialog, policies, style systems, and responsive layout.',
  quickUnderstanding: 'Modern AEM components are not just HTL files. They are authoring contracts built from Core Components, dialogs, policies, style rules, and layout behavior.',
  whatIsIt: `This topic connects the most important authoring concepts around components:

- **Core Components** as Adobe's maintained baseline
- **Custom Components** for project-specific behavior
- **cq:dialog** for author input
- **Policies** for template-level governance
- **Style System** for controlled visual variants
- **Responsive Grid / Layout Container** for page composition

Together they define how reusable and safe a component really is.`,
  whyWeNeedIt: `Projects fail when they focus only on rendering:

- authors need clear dialogs
- template authors need reusable policies
- designers need constrained styling options
- upgrade paths improve when teams extend Core Components instead of rebuilding everything

This is where developer productivity and author trust meet.`,
  realWorldUsage: `A campaign team may use the Core Teaser Component with a project-specific Sling Model extension, a policy that limits allowed styles, and a style system offering only approved variants like "highlight" or "compact". Authors see a clean dialog, while frontend teams keep governance intact.`,
  howItWorks: `Modern flow:

1. Pick Core Component reuse when possible
2. Add custom logic only where business needs differ
3. Expose author inputs through cq:dialog fields
4. Apply policies at template level for allowed components and defaults
5. Use Style System for safe variants instead of one-off CSS hacks
6. Render inside responsive containers so authoring behavior stays predictable`,
  exampleTitle: 'Modern component contract',
  exampleDescription: 'How authoring, governance, and rendering fit together.',
  exampleCode: `Template policy
  -> allows Teaser + Carousel + Promo Banner
  -> default style = "brand-default"

Author opens dialog
  -> enters heading, image, CTA

Component rendering
  -> Sling Model prepares data
  -> HTL renders markup
  -> Style System adds approved variant class

Result
  -> reusable component with governed authoring choices`,
  commonConfusions: [
    {
      question: 'Are dialogs and policies the same thing?',
      answer: 'No. Dialogs define per-instance author input. Policies define template-level rules and defaults shared by many component instances.',
    },
    {
      question: 'Should new projects still build everything from scratch?',
      answer: 'Usually no. Start from Core Components and extend thoughtfully. Full custom builds increase maintenance cost without guaranteed value.',
    },
  ],
  productionIssues: [
    'A shared policy change breaks multiple templates because governance updates were treated like harmless authoring edits.',
    'A dialog saves values but rendering fails because Sling Model expectations and dialog field names drifted apart.',
    'Responsive layout behaves inconsistently across templates because teams mixed legacy container patterns with modern policy-driven authoring.',
  ],
  bestPractices: [
    'Use Core Components first, custom components second.',
    'Keep dialogs simple and aligned with actual business language.',
    'Treat policy changes as cross-template release-impacting changes.',
  ],
  faqs: [
    {
      question: 'What is the difference between Design Dialog and policies?',
      answer: 'Design Dialog is an older pattern. In modern AEM, editable-template policies are the preferred governance mechanism.',
    },
    {
      question: 'Where should style variants live?',
      answer: 'Use Style System and approved frontend contracts instead of creating ad hoc author-controlled CSS classes.',
    },
  ],
  keyTakeaways: [
    'Core Components, dialogs, policies, and style rules form one component contract',
    'Policies govern reuse across templates; dialogs capture instance data',
    'Modern AEM authoring favors Core Components plus constrained extension',
  ],
  relatedTopics: ['components', 'editable-templates', 'client-libraries', 'htl'],
  architectNote: `The most maintainable AEM programs optimize for authoring safety and upgradeability, not just initial rendering speed. Core Components plus disciplined dialogs and policies give teams a better long-term platform than a library of fragile custom widgets.`,
});

export const pageAuthoringAndUniversalEditor = makeTopic({
  slug: 'page-authoring-and-universal-editor',
  title: 'Page Authoring and Universal Editor Basics',
  description: 'Understand page properties, authoring structure, editable templates, and how the Universal Editor fits modern AEM workflows.',
  quickUnderstanding: 'Page authoring in AEM is the combination of template structure, page properties, allowed components, and editor tooling. Universal Editor extends this thinking into more decoupled and modern delivery patterns.',
  whatIsIt: `Page authoring includes:

- page creation from templates
- page properties such as title, SEO metadata, and rollout settings
- editable template structure and initial content
- component authoring inside the page editor
- modern editor experiences such as Universal Editor for compatible setups

It is the day-to-day surface authors trust the most.`,
  whyWeNeedIt: `Strong page authoring matters because content teams judge the platform through it:

- if template structure is confusing, authors create broken pages
- if properties are inconsistent, SEO and governance drift
- if editor capabilities do not match the delivery model, teams invent unsafe workarounds

Universal Editor matters because headless and edge-oriented experiences still need responsible authoring.`,
  realWorldUsage: `A multi-brand site may use editable templates for marketing pages, page properties for canonical and navigation behavior, and Universal Editor for some modern composable experiences where authors still need in-context editing without relying on classic page rendering everywhere.`,
  howItWorks: `Authoring flow:

1. A template author defines structure, policies, and initial content
2. A content author creates a page from that template
3. Page properties capture metadata and operational settings
4. The page editor manages component placement and content edits
5. Universal Editor can provide in-context editing for supported modern experiences that integrate with AEM content`,
  exampleTitle: 'Authoring responsibilities',
  exampleDescription: 'Who controls what in a healthy AEM page model.',
  exampleCode: `Template author
  -> structure, allowed components, default policies

Content author
  -> page title, SEO fields, page content, scheduling

Developer
  -> page component contract, metadata handling, integrations

Architect
  -> authoring boundaries, governance, editor strategy, headless compatibility`,
  commonConfusions: [
    {
      question: 'Is Universal Editor a full replacement for every classic AEM authoring flow?',
      answer: 'No. It is a modern editing option for certain experience patterns, not a universal drop-in replacement for every Sites implementation detail.',
    },
    {
      question: 'Are page properties just SEO fields?',
      answer: 'No. They also affect rollout behavior, scheduling, navigation, templates, and operational metadata depending on the implementation.',
    },
  ],
  productionIssues: [
    'Authors can create pages but required metadata is inconsistent because page properties were never governed clearly.',
    'Universal Editor expectations are raised before the content model and frontend contract are ready for it.',
    'Template structure and page-editor freedom conflict, causing layout drift across brands.',
  ],
  bestPractices: [
    'Define which metadata belongs in page properties versus component content.',
    'Keep authoring structure opinionated enough to protect quality.',
    'Adopt Universal Editor only where the delivery contract and editorial workflow are clearly understood.',
  ],
  faqs: [
    {
      question: 'When should I use Universal Editor?',
      answer: 'Use it when the project benefits from modern composable or decoupled editing and the frontend integration is designed for it. Do not adopt it only because it sounds newer.',
    },
    {
      question: 'Can page properties drive operational behavior?',
      answer: 'Yes. They often influence SEO, inheritance, rollout, scheduling, navigation, and publishing decisions.',
    },
  ],
  keyTakeaways: [
    'Page authoring is a governed contract, not just an editing screen',
    'Template structure and page properties shape content quality',
    'Universal Editor is important, but only when the delivery model supports it well',
  ],
  relatedTopics: ['templates', 'editable-templates', 'headless-aem', 'edge-delivery-services'],
  architectNote: `Authoring strategy is an architecture decision. Teams that separate template-author responsibilities, content-author responsibilities, and frontend delivery constraints early avoid years of ad hoc exceptions later.`,
});

export const launchesAndLocalization = makeTopic({
  slug: 'launches-and-localization',
  title: 'Launches, Language Copies, and Localization',
  description: 'Learn how launches, language copies, translation flows, and MSM-style rollout planning support enterprise content operations.',
  quickUnderstanding: 'Launches help teams stage and review planned changes, while language copies and translation workflows support multi-language rollout without rebuilding site structures manually.',
  whatIsIt: `This topic covers the operational side of enterprise content reuse:

- **Launches** for staged changes and time-bound content preparation
- **Language copies** for regional or translated variants
- **Translation workflows** for external language-service coordination
- **MSM alignment** where structure reuse and localization work together

These features matter most once a platform supports many markets and release windows.`,
  whyWeNeedIt: `Multi-site programs break down without clear localization mechanics:

- launch teams need safe staging before go-live
- translators need predictable source and target structures
- regional teams need autonomy without losing governance
- support teams need to trace why one locale differs from another`,
  realWorldUsage: `A global launch might start with a master English campaign in a Launch, create regional language copies for France and Germany, send selected content for translation, and then promote the approved launch across markets on the release date.`,
  howItWorks: `Operational pattern:

1. Content begins in a source branch or market
2. A launch can stage future changes without immediately changing the live page
3. Language copies mirror structure for localization
4. Translation workflows fill localized content
5. Rollout governance decides what remains inherited and what becomes region-specific`,
  exampleTitle: 'Regional launch flow',
  exampleDescription: 'A simplified release sequence for a multilingual campaign.',
  exampleCode: `Master campaign page
  -> create Launch for Q3 release
  -> approve content changes
  -> create language copies
  -> send selected content for translation
  -> validate regional differences
  -> promote launch on release date`,
  commonConfusions: [
    {
      question: 'Are language copies the same as live copies?',
      answer: 'Not exactly. They are related concepts but solve different operational needs. Language copies focus on localization. Live copies focus on inheritance and rollout relationships.',
    },
    {
      question: 'Should every region inherit everything from the master?',
      answer: 'No. Mature programs define which content must stay global and which content can diverge locally.',
    },
  ],
  productionIssues: [
    'A launch is promoted, but regional pages remain inconsistent because translation dependencies were not validated.',
    'Teams lose track of what is inherited versus localized, causing accidental overwrite during rollout.',
    'Repository growth and workflow clutter rise because old launches are never cleaned up or governed.',
  ],
  bestPractices: [
    'Define localization ownership before building rollout automation.',
    'Use launches for controlled release windows, not as permanent working branches.',
    'Document inheritance and regional override rules clearly.',
  ],
  faqs: [
    {
      question: 'When should I use Launches instead of normal page editing?',
      answer: 'Use Launches when a coordinated future release needs staged review, safe comparison, and planned promotion.',
    },
    {
      question: 'Do translation workflows remove the need for regional QA?',
      answer: 'No. Translation automation helps delivery, but market teams still need QA for layout, legal, and business correctness.',
    },
  ],
  keyTakeaways: [
    'Launches support staged release management',
    'Language copies and translation workflows support multilingual delivery',
    'Localization succeeds when inheritance and regional ownership are explicit',
  ],
  relatedTopics: ['msm', 'workflows', 'content-fragments', 'page-authoring-and-universal-editor'],
  architectNote: `Localization is both a content and operating-model decision. The hardest problems are not the buttons in AEM. They are ownership, approval timing, override rules, and support visibility across markets.`,
});

export const headlessAem = makeTopic({
  slug: 'headless-aem',
  title: 'Headless AEM',
  description: 'Understand how AEM supports headless delivery through Content Fragments, GraphQL, persisted queries, assets APIs, and frontend integration patterns.',
  quickUnderstanding: 'Headless AEM means AEM owns structured content and media while a separate frontend, app, or channel owns rendering.',
  whatIsIt: `Headless AEM typically includes:

- Content Fragment Models for structured schemas
- Content Fragments as reusable entries
- GraphQL APIs and persisted queries for delivery
- Assets APIs for media access
- React, Next.js, or app clients that render the content
- sometimes SPA Editor or hybrid models when teams want more AEM-driven composition`,
  whyWeNeedIt: `Teams adopt headless AEM when they need:

- multiple channels consuming the same content
- frontend independence with modern frameworks
- content reuse across websites, apps, kiosks, or partner experiences
- a cleaner separation between editorial operations and rendering technology`,
  realWorldUsage: `A bank might manage product descriptions, rate details, and FAQs as Content Fragments in AEM, expose approved persisted queries, deliver images through DAM/CDN, and let a Next.js application render the customer-facing experience.`,
  howItWorks: `Headless flow:

1. Model content with Content Fragment Models
2. Authors create and govern fragment instances
3. Persist GraphQL queries for safe cached access
4. Frontend applications call those queries and map results to components
5. DAM or Assets APIs deliver media while CDN and cache rules protect performance`,
  exampleTitle: 'Headless delivery path',
  exampleDescription: 'A practical sequence for structured content delivery.',
  exampleCode: `Author updates a Product Content Fragment
  -> content is published
  -> persisted query exposes approved fields
  -> Next.js app fetches /graphql/execute.json/product-by-slug
  -> frontend renders the page
  -> CDN caches the response`,
  commonConfusions: [
    {
      question: 'Is GraphQL the only way to do headless AEM?',
      answer: 'No. It is the preferred path for Content Fragments, but teams may also use model JSON, custom APIs, or Assets APIs depending on the use case.',
    },
    {
      question: 'Does headless mean authors no longer need AEM page concepts?',
      answer: 'Not always. Hybrid programs often keep some page-based experiences, fragments, and DAM governance together.',
    },
  ],
  productionIssues: [
    'Frontend teams bypass persisted queries and create hard-to-cache ad hoc requests.',
    'Headless schemas drift because fragment models changed without coordinated consumer updates.',
    'Teams promise SPA Editor or Universal Editor benefits before content modeling and ownership are stable.',
  ],
  bestPractices: [
    'Model content for reuse, not for one page implementation.',
    'Use persisted queries for security, performance, and CDN friendliness.',
    'Version frontend contracts and coordinate model changes with consumers.',
  ],
  faqs: [
    {
      question: 'When should I choose headless over traditional AEM page rendering?',
      answer: 'Choose headless when multi-channel reuse, frontend independence, or product-style delivery outweigh the benefits of classic page composition.',
    },
    {
      question: 'Can I mix headless and traditional AEM?',
      answer: 'Yes. Many enterprise programs use hybrid delivery: page-rendered experiences in some areas and fragment-driven APIs in others.',
    },
  ],
  keyTakeaways: [
    'Headless AEM centers on structured content, APIs, and frontend contract discipline',
    'Persisted queries are a core production practice',
    'Hybrid delivery is common and often more realistic than pure headless',
  ],
  relatedTopics: ['content-fragments', 'graphql', 'aem-sites-assets-forms', 'edge-delivery-services'],
  architectNote: `Headless AEM succeeds when content modeling, frontend ownership, cache policy, and editorial workflow are designed together. If any one of those is vague, "headless" becomes a slogan instead of a stable delivery model.`,
});

export const cloudManagerAndDevops = makeTopic({
  slug: 'cloud-manager-and-devops',
  title: 'Cloud Manager and AEM DevOps',
  description: 'Learn the build, deployment, environment, and repository practices behind modern AEM Cloud Service delivery.',
  quickUnderstanding: 'Modern AEM delivery is pipeline-first. Cloud Manager, the AEM SDK, archetype structure, content packages, and environment-specific configs define how code reaches production safely.',
  whatIsIt: `This topic covers the AEM DevOps backbone:

- AEM SDK for local development
- AEM Project Archetype and Maven module structure
- Cloud Manager pipelines and quality gates
- environment-specific OSGi configuration
- repository packaging and content promotion
- logs, troubleshooting, and deployment verification`,
  whyWeNeedIt: `AEM Cloud Service changed how teams work:

- direct production fixes are no longer the norm
- code quality, package validation, and Dispatcher validation happen in pipelines
- secrets and environment config need disciplined ownership
- local development must mirror the cloud-friendly model closely enough to prevent drift`,
  realWorldUsage: `A delivery team typically works from a Maven multi-module project generated from the AEM Archetype, runs local SDK validation, commits code and config, lets Cloud Manager execute build and deployment gates, and then verifies logs, environment variables, and post-deploy behavior in the target environment.`,
  howItWorks: `Healthy DevOps flow:

1. Start from the AEM Archetype or a maintained enterprise baseline
2. Develop locally with the AEM SDK
3. Keep code, dispatcher config, and OSGi config in version control
4. Use Cloud Manager to run tests, package validation, and deployment
5. Verify environment-specific behavior, logs, and publication state after release`,
  exampleTitle: 'Cloud Service delivery chain',
  exampleDescription: 'The main checkpoints in a modern AEM release flow.',
  exampleCode: `Developer
  -> local SDK validation
  -> commit code + config

Cloud Manager pipeline
  -> build
  -> unit tests
  -> code quality
  -> package validation
  -> Dispatcher validation
  -> deployment

Release verification
  -> logs
  -> OSGi env vars
  -> templates/policies/content checks
  -> cache and publish validation`,
  commonConfusions: [
    {
      question: 'Is Cloud Manager only a deployment button?',
      answer: 'No. It is also a governance and quality-gate system for how AEM code and configuration move through environments.',
    },
    {
      question: 'If the SDK works locally, will Cloud Manager always pass?',
      answer: 'No. Pipeline validation, environment variables, dispatcher rules, and cloud-specific constraints can still fail later stages.',
    },
  ],
  productionIssues: [
    'A deployment passes build but templates or policies are missing because content and code ownership were split poorly.',
    'Environment-specific OSGi config fails because variable names or run-mode assumptions are wrong.',
    'Teams debug the last error in the pipeline instead of the first actionable failure signal.',
  ],
  bestPractices: [
    'Treat Cloud Manager pipelines as part of the application contract.',
    'Keep content package boundaries and environment ownership explicit.',
    'Verify release outcomes beyond pipeline success: authoring, publish, cache, and content dependencies.',
  ],
  faqs: [
    {
      question: 'What should every AEM developer know about the Archetype?',
      answer: 'They should understand the high-level module structure, where code and configs live, and how that structure maps to deployment and packaging behavior.',
    },
    {
      question: 'How important are logs in Cloud Service troubleshooting?',
      answer: 'Critical. You often cannot rely on direct server access, so log quality and pipeline evidence become essential.',
    },
  ],
  keyTakeaways: [
    'Modern AEM delivery is pipeline-first, not server-first',
    'SDK, Archetype, Cloud Manager, and config ownership must line up',
    'Release verification includes content, cache, and environment behavior after deployment',
  ],
  relatedTopics: ['aem-cloud-service', 'osgi', 'dispatcher', 'production-troubleshooting'],
  architectNote: `In Cloud Service programs, DevOps is not a separate concern from development. Component choices, config design, package boundaries, and pipeline readiness are part of one engineering system. Teams that separate them too late create avoidable release risk.`,
});

export const aemPerformance = makeTopic({
  slug: 'aem-performance',
  title: 'AEM Performance and Caching',
  description: 'Understand how Dispatcher, CDN, client libraries, image delivery, lazy loading, and query behavior shape AEM performance.',
  quickUnderstanding: 'Good AEM performance comes from layered caching, lean rendering, safe queries, optimized client assets, and realistic troubleshooting across edge, Dispatcher, Publish, and browser layers.',
  whatIsIt: `AEM performance is never one setting. It spans:

- CDN and Dispatcher cache strategy
- page render cost on Publish
- client library payload size
- asset rendition and image strategy
- lazy loading and browser behavior
- query efficiency and external integration latency`,
  whyWeNeedIt: `Enterprise AEM sites can look fine in low traffic and still fail under launches because:

- cache hit rates are poor
- components perform live repository or API work on every request
- client libraries grow without budgets
- image delivery and responsive behavior are inconsistent`,
  realWorldUsage: `A high-traffic campaign site may succeed because most anonymous traffic hits CDN and Dispatcher, pages use lightweight models, client libraries are split intentionally, and images are delivered through proper renditions with lazy loading and cache-aware URLs.`,
  howItWorks: `Troubleshooting usually follows this order:

1. Prove whether the response came from CDN, Dispatcher, or Publish
2. Measure cache hit ratio and cache-control behavior
3. Isolate slow components, queries, or integrations
4. Review client libraries, image payload, and browser waterfalls
5. Fix the highest-cost layer instead of guessing`,
  exampleTitle: 'Performance triage',
  exampleDescription: 'A quick model for isolating the true bottleneck.',
  exampleCode: `Slow page report
  -> check CDN/Dispatcher headers
  -> if cache hit: inspect frontend assets and browser work
  -> if cache miss: inspect Publish logs, component timing, queries, API calls
  -> validate image payload and lazy loading
  -> confirm post-fix cache behavior`,
  commonConfusions: [
    {
      question: 'Is AEM performance mostly a Dispatcher topic?',
      answer: 'No. Dispatcher is crucial, but poor component logic, assets, queries, or frontend payload can still dominate latency.',
    },
    {
      question: 'Does lazy loading fix all media problems?',
      answer: 'No. It helps perceived performance, but image dimensions, rendition strategy, and cache policy still matter.',
    },
  ],
  productionIssues: [
    'A page is cached but still feels slow because client libraries and images overwhelm the browser.',
    'Performance degrades only on cache misses because component queries and integrations are too expensive.',
    'AEM Cloud Service scaling hides spikes temporarily while poor cache behavior keeps baseline costs high.',
  ],
  bestPractices: [
    'Optimize for high cache hit ratios on anonymous traffic.',
    'Set performance budgets for client libraries, images, and render-time work.',
    'Measure performance by layer before deciding on a fix.',
  ],
  faqs: [
    {
      question: 'What should I inspect first for a slow anonymous page?',
      answer: 'Confirm whether the request hit CDN, Dispatcher, or Publish. That determines the next diagnostic path.',
    },
    {
      question: 'Are clientlibs still important in headless or hybrid setups?',
      answer: 'Yes. Wherever AEM or adjacent frontends deliver browser assets, payload discipline still matters.',
    },
  ],
  keyTakeaways: [
    'Performance is a multi-layer system, not a single AEM setting',
    'Cache hits, render cost, client assets, and images all matter',
    'Strong troubleshooting starts by proving which layer is slow',
  ],
  relatedTopics: ['dispatcher', 'query-builder-and-indexing', 'assets-and-dam', 'production-troubleshooting'],
  architectNote: `AEM performance strategy should be decided before launch, not after the first incident. Cache policy, content-model choices, frontend budgets, and observability need to be treated as architectural guardrails, not optional optimizations.`,
});

export const eventsAndJobs = makeTopic({
  slug: 'events-and-jobs',
  title: 'AEM Workflows, Events, and Jobs',
  description: 'Learn how workflows, launchers, schedulers, jobs, and event handlers coordinate background work in AEM.',
  quickUnderstanding: 'AEM supports several asynchronous patterns. Workflows handle governed content processes, while jobs, schedulers, and event handlers support technical background tasks.',
  whatIsIt: `Modern AEM teams need to distinguish between:

- **Workflows** for content or business process steps
- **Workflow launchers** for event-triggered workflow starts
- **Event handlers** for repository or platform events
- **Schedulers** for timed recurring work
- **Jobs** for reliable asynchronous processing

Choosing the wrong pattern creates fragile background behavior.`,
  whyWeNeedIt: `AEM projects often need asynchronous behavior:

- content approval flows
- asset processing and metadata updates
- publish-related support tasks
- integration retries and reconciliation
- scheduled cleanup or reporting work

Not all of these belong in one workflow model.`,
  realWorldUsage: `A DAM project might use asset workflows for processing, a job queue for external metadata reconciliation, and a scheduler for nightly cleanup. A publishing program may use launchers to trigger review flows on content changes, but keep technical retry logic out of author-facing workflow diagrams.`,
  howItWorks: `Pattern choice:

1. Use workflows when humans or governed business steps are involved
2. Use jobs for resilient asynchronous technical work
3. Use event handlers for reaction to platform events
4. Use schedulers for time-based operations
5. Keep processing idempotent and observable so retries do not corrupt state`,
  exampleTitle: 'Async decision guide',
  exampleDescription: 'Choosing the right background pattern in AEM.',
  exampleCode: `Need: legal approval before publication
Use: Workflow

Need: nightly cleanup of stale launch data
Use: Scheduler + service

Need: retry external enrichment after asset upload
Use: Job consumer

Need: react to repository event and trigger a controlled action
Use: Event handler or launcher, depending on the business flow`,
  commonConfusions: [
    {
      question: 'Should every background process be a workflow because AEM already has workflows?',
      answer: 'No. Workflows are not the best tool for every technical async task. Jobs or schedulers are often cleaner and more resilient.',
    },
    {
      question: 'Are event handlers safe for heavy processing?',
      answer: 'Only if designed carefully. Heavy event work should usually hand off to asynchronous services or jobs.',
    },
  ],
  productionIssues: [
    'Workflow queues back up because teams used workflow steps for high-volume technical processing.',
    'A scheduler runs fine in lower environments but causes noisy retries or duplicate work in shared production setups.',
    'Event-triggered processing loops because idempotency and guard conditions were never designed.',
  ],
  bestPractices: [
    'Choose async patterns based on ownership and retry behavior, not convenience.',
    'Make background processing idempotent and observable.',
    'Separate author-facing workflows from technical retry and batch processing.',
  ],
  faqs: [
    {
      question: 'When should I prefer jobs over workflows?',
      answer: 'Prefer jobs when the task is technical, retryable, high-volume, or not meant to be monitored as an author-facing business process.',
    },
    {
      question: 'Why do schedulers need extra care in Cloud Service?',
      answer: 'Because distributed environments and scaling assumptions make duplicate execution and coordination riskier if the design is naive.',
    },
  ],
  keyTakeaways: [
    'Workflows, jobs, event handlers, and schedulers solve different async problems',
    'Idempotency and observability are essential',
    'Background processing design affects stability more than most teams expect',
  ],
  relatedTopics: ['workflows', 'aem-cloud-service', 'production-troubleshooting', 'assets-and-dam'],
  architectNote: `Background processing patterns are quiet until they fail. At scale, they become one of the strongest signals of engineering maturity because they reveal whether teams thought about retries, ownership, backpressure, and support visibility.`,
});

export const aemSecurity = makeTopic({
  slug: 'aem-security',
  title: 'AEM Security Fundamentals',
  description: 'Understand AEM security across users, groups, ACLs, service users, servlet safety, CORS, CSRF, and XSS protection.',
  quickUnderstanding: 'AEM security is layered. It includes repository permissions, least-privilege service access, safe rendering, secure endpoints, and strong operational boundaries between Author, Publish, and edge layers.',
  whatIsIt: `AEM security combines several concerns:

- users, groups, and effective ACLs
- service users instead of admin sessions
- authentication and endpoint protection
- CORS, CSRF, and servlet safety
- HTL and output-context rules for XSS prevention
- Dispatcher and CDN as security boundaries for public traffic`,
  whyWeNeedIt: `AEM is a content platform, but security failures still cause serious damage:

- overly broad permissions expose confidential content
- insecure servlets create attack paths on Publish
- admin-level repository access becomes a long-term governance failure
- weak cache or endpoint rules leak data or expand blast radius`,
  realWorldUsage: `A secure implementation gives authors only required access, uses service users for backend repository work, protects write endpoints, validates input carefully, uses HTL context-aware escaping, and blocks unnecessary public URLs at Dispatcher.`,
  howItWorks: `Security review usually spans:

1. Who can access or modify repository content
2. Which service user or system user performs background work
3. Which endpoints exist on Publish and why
4. How output is escaped and sanitized
5. How Dispatcher/CDN rules reduce public exposure`,
  exampleTitle: 'Least-privilege thinking',
  exampleDescription: 'A safer default model for AEM runtime access.',
  exampleCode: `Bad pattern:
component service adapts to admin session

Safer pattern:
service user with read access only to /content/site/products
  -> service reads required data
  -> servlet validates input
  -> HTL renders escaped output
  -> Dispatcher blocks unnecessary selectors and tools URLs`,
  commonConfusions: [
    {
      question: 'If HTL escapes output, is XSS solved automatically?',
      answer: 'HTL helps a lot, but unsafe contexts, custom scripts, raw HTML handling, and poor input design can still create risk.',
    },
    {
      question: 'Are service users only for backend integrations?',
      answer: 'No. They are the standard pattern for system-level repository access in many internal services and jobs.',
    },
  ],
  productionIssues: [
    'A servlet works functionally but exposes an unsafe write path on Publish.',
    'Permission troubleshooting takes too long because teams do not understand effective ACL inheritance.',
    'A supposedly harmless admin shortcut becomes a hard blocker for Cloud Service governance and audit expectations.',
  ],
  bestPractices: [
    'Use least privilege for users, groups, and service accounts.',
    'Review every public endpoint as part of an attack-surface discussion.',
    'Treat Dispatcher rules and HTL escaping as complementary, not interchangeable, protections.',
  ],
  faqs: [
    {
      question: 'What security skill should every AEM developer master first?',
      answer: 'Least-privilege repository access combined with safe rendering and endpoint discipline.',
    },
    {
      question: 'Why are service users preferred over admin sessions?',
      answer: 'They reduce blast radius, improve auditability, and align with modern AEM governance.',
    },
  ],
  keyTakeaways: [
    'AEM security spans repository access, runtime code, and edge protection',
    'Least privilege and safe endpoint design are foundational',
    'HTL escaping helps, but it does not replace security review',
  ],
  relatedTopics: ['htl', 'dispatcher', 'osgi', 'production-troubleshooting'],
  architectNote: `Security is where AEM content modeling, application design, and operational discipline all meet. Mature teams review effective permissions, public endpoints, and cache behavior together instead of treating them as separate checklists.`,
});

export const assetsAndDam = makeTopic({
  slug: 'assets-and-dam',
  title: 'AEM Assets and DAM',
  description: 'Learn how AEM Assets manages binaries, metadata schemas, renditions, permissions, workflows, and DAM delivery best practices.',
  quickUnderstanding: 'AEM Assets is the DAM layer of AEM. It governs files, metadata, processing, permissions, renditions, and how media is reused across channels.',
  whatIsIt: `AEM Assets supports:

- binary storage and metadata
- metadata schemas and tagging
- rendition generation and asset processing
- permissions and review workflows
- Dynamic Media and media delivery patterns where applicable

It is not just a file folder. It is a governed media platform.`,
  whyWeNeedIt: `Enterprises need DAM discipline because media is expensive to manage badly:

- teams upload duplicate files without metadata standards
- inconsistent renditions hurt performance and branding
- permissions get too broad for licensed or sensitive media
- asset workflows and approval paths become invisible`,
  realWorldUsage: `A global brand may store campaign imagery, legal-approved logos, and product videos in AEM Assets, use metadata schemas for region and product tagging, generate renditions for responsive delivery, and connect publishing workflows so only approved assets appear on live pages.`,
  howItWorks: `Typical DAM flow:

1. Upload asset into governed folders
2. Apply metadata schema, tags, and permissions
3. Run processing for renditions or downstream enrichment
4. Reference assets from pages, fragments, or APIs
5. Deliver through cache-aware URLs and appropriate media optimization`,
  exampleTitle: 'Asset lifecycle',
  exampleDescription: 'From upload to live reuse in a governed DAM process.',
  exampleCode: `Upload asset
  -> metadata required
  -> rendition generation
  -> approval workflow
  -> publish or expose through approved channel
  -> page/component references asset safely`,
  commonConfusions: [
    {
      question: 'Are Assets and Content Fragments the same because both can be reused?',
      answer: 'No. Assets manage media binaries and related metadata. Content Fragments manage structured content. They often work together but solve different problems.',
    },
    {
      question: 'Does storing files in DAM guarantee good performance?',
      answer: 'No. Rendition strategy, image delivery, permissions, and cache policy still matter.',
    },
  ],
  productionIssues: [
    'Pages reference original heavy assets instead of optimized renditions, causing poor performance.',
    'Metadata search becomes noisy because schemas and tagging rules were never governed.',
    'Asset approvals exist informally, but DAM permissions and workflow state do not reflect them.',
  ],
  bestPractices: [
    'Define metadata requirements based on search and governance needs.',
    'Use rendition and delivery strategy intentionally.',
    'Review asset permissions and approval workflows like any other production content path.',
  ],
  faqs: [
    {
      question: 'When should a team consider Dynamic Media?',
      answer: 'When advanced image or video delivery, transformations, or large-scale media experiences justify the added capability.',
    },
    {
      question: 'Should DAM metadata be optional to keep upload simple?',
      answer: 'Only for low-governance use cases. In enterprise DAM, metadata quality is what makes reuse and search sustainable.',
    },
  ],
  keyTakeaways: [
    'AEM Assets is a governed media platform, not just file storage',
    'Metadata, renditions, and permissions shape DAM success',
    'Media delivery quality directly affects page performance and governance',
  ],
  relatedTopics: ['aem-sites-assets-forms', 'content-fragments', 'aem-performance', 'aem-integrations'],
  architectNote: `DAM programs fail more from weak operating discipline than from missing features. Metadata ownership, review flow, permissions, and rendition strategy matter as much as the storage platform itself.`,
});

export const aemIntegrations = makeTopic({
  slug: 'aem-integrations',
  title: 'AEM Integrations',
  description: 'Understand how AEM integrates with Adobe tools, external APIs, search platforms, commerce systems, and enterprise services.',
  quickUnderstanding: 'AEM rarely stands alone in production. It usually integrates with analytics, personalization, search, commerce, and external services that each add delivery and support trade-offs.',
  whatIsIt: `Common AEM integrations include:

- Adobe Analytics and Adobe Target
- Adobe Commerce or other commerce systems
- external APIs for product, profile, or campaign data
- search engines and indexing pipelines
- forms, CRM, and enterprise workflow systems

The technical challenge is not just making calls. It is owning contracts, latency, security, retries, and support boundaries.`,
  whyWeNeedIt: `Enterprise sites almost always depend on systems outside AEM:

- product data rarely lives only in AEM
- personalization needs shared identity or segment signals
- search may be external for scale or feature reasons
- forms often flow into CRM or case-management systems`,
  realWorldUsage: `An enterprise website may author marketing pages in AEM, fetch commerce availability from an external API, send analytics events to Adobe Analytics, render experience decisions with Adobe Target, and forward leads into CRM workflows.`,
  howItWorks: `A healthy integration design asks:

1. What data should AEM own versus consume
2. Which calls happen at author time, publish time, or asynchronously
3. How timeouts, retries, and cache behavior are handled
4. How operational ownership is split when incidents cross systems`,
  exampleTitle: 'Integration boundary mapping',
  exampleDescription: 'Clarifying ownership before coding the connection.',
  exampleCode: `AEM owns:
- content structure
- marketing copy
- approved media

External commerce API owns:
- price
- stock
- orderability

Search platform owns:
- indexing and ranking rules

AEM integration layer owns:
- mapping
- timeout handling
- fallback behavior
- observability`,
  commonConfusions: [
    {
      question: 'Should AEM always fetch external data during page rendering?',
      answer: 'No. Some data belongs in asynchronous sync pipelines, cache layers, or precomputed delivery paths rather than blocking live page requests.',
    },
    {
      question: 'Is an Adobe-to-Adobe integration automatically simple?',
      answer: 'No. Shared vendor branding does not remove data ownership, latency, security, or support complexity.',
    },
  ],
  productionIssues: [
    'Pages slow down because live publish rendering waits on external APIs with weak timeout and fallback behavior.',
    'A search or commerce incident is misdiagnosed as an AEM incident because observability does not show the cross-system chain clearly.',
    'Integration contracts drift and break after model changes because versioning and ownership were never defined.',
  ],
  bestPractices: [
    'Define ownership and failure behavior before building the API call.',
    'Avoid synchronous publish-time dependency unless the business case is strong.',
    'Instrument integrations so AEM incidents and upstream incidents can be separated quickly.',
  ],
  faqs: [
    {
      question: 'What is the biggest integration mistake in AEM projects?',
      answer: 'Treating integrations as simple field mapping instead of long-lived contracts with latency, security, and support implications.',
    },
    {
      question: 'Should AEM own search indexing?',
      answer: 'Sometimes, but not always. The right answer depends on scale, relevance needs, and platform ownership.',
    },
  ],
  keyTakeaways: [
    'AEM integrations are about contracts and support boundaries, not just API calls',
    'Publish-time dependency choices have direct reliability impact',
    'Observability and fallback behavior are first-class integration requirements',
  ],
  relatedTopics: ['osgi', 'aem-sites-assets-forms', 'aem-performance', 'headless-aem'],
  architectNote: `The most expensive AEM integrations are the ones whose ownership was never made explicit. Good architecture names the system of record, the time of data retrieval, the cache boundary, and the incident-response path before implementation starts.`,
});

export const edgeDeliveryServices = makeTopic({
  slug: 'edge-delivery-services',
  title: 'Edge Delivery Services',
  description: 'Learn what Edge Delivery Services is, how it relates to AEM Sites and Universal Editor, and when it fits modern content delivery.',
  quickUnderstanding: 'Edge Delivery Services is Adobe\'s modern high-performance delivery approach focused on fast edge rendering, flexible authoring patterns, and simplified experience delivery for suitable use cases.',
  whatIsIt: `Edge Delivery Services (EDS) is a modern Adobe delivery model that emphasizes:

- document-based or lightweight authoring flows
- fast edge-first delivery
- strong performance expectations
- modern frontend flexibility
- compatibility paths with Universal Editor and selected AEM authoring workflows

It is not the same thing as classic AEM Sites page rendering, though the two can coexist in broader programs.`,
  whyWeNeedIt: `Teams evaluate EDS when they want:

- faster delivery and simpler runtime paths
- a more document-centric or flexible authoring approach
- strong performance for marketing or content-heavy experiences
- a modern alternative to heavy page-rendered implementations in selected scenarios`,
  realWorldUsage: `A global marketing team might use traditional AEM Sites for complex governed areas and Edge Delivery Services for fast-moving campaign or content-led experiences where performance and editorial speed matter most.`,
  howItWorks: `Decision flow:

1. Evaluate authoring and governance needs
2. Compare classic AEM Sites page-rendering complexity against edge-first delivery value
3. Decide whether document-based authoring, Universal Editor, or classic authoring fits best
4. Build deployment, analytics, and support expectations around the chosen model`,
  exampleTitle: 'When EDS fits',
  exampleDescription: 'A quick comparison between classic and edge-oriented choices.',
  exampleCode: `Use classic AEM Sites when:
- deep page composition governance matters
- existing component ecosystems are central
- heavy platform integration is already aligned there

Use Edge Delivery Services when:
- page speed is a top concern
- authoring flow can be simplified
- content-led delivery benefits from edge-first architecture`,
  commonConfusions: [
    {
      question: 'Is Edge Delivery Services a mandatory replacement for AEM Sites?',
      answer: 'No. It is a modern option, not a universal replacement for every AEM implementation.',
    },
    {
      question: 'Does EDS remove the need for AEM governance?',
      answer: 'No. Governance, metadata, analytics, brand control, and release responsibility still matter.',
    },
  ],
  productionIssues: [
    'Teams adopt EDS for speed but underestimate content-model, analytics, or governance implications.',
    'Stakeholders expect classic AEM component behavior in an edge-oriented implementation without designing for the difference.',
    'Support teams lack clear runbooks because the operating model changed but the incident model did not.',
  ],
  bestPractices: [
    'Choose EDS for explicit business and delivery reasons, not trend pressure.',
    'Align authoring expectations before promising a modern editor story.',
    'Define support and analytics ownership for edge-delivered experiences early.',
  ],
  faqs: [
    {
      question: 'Can Edge Delivery Services work with Universal Editor?',
      answer: 'Yes, in supported patterns, but the editing and delivery contract should be designed intentionally rather than assumed.',
    },
    {
      question: 'Is EDS only for simple brochure sites?',
      answer: 'No. It can support serious experiences, but the fit depends on governance, integration, and delivery requirements.',
    },
  ],
  keyTakeaways: [
    'EDS is a modern edge-first delivery option, not a universal replacement',
    'Authoring and governance fit matter as much as raw speed',
    'Choosing EDS changes delivery and support assumptions',
  ],
  relatedTopics: ['headless-aem', 'page-authoring-and-universal-editor', 'aem-cloud-service', 'aem-performance'],
  architectNote: `The right question is not "Is EDS newer?" The right question is whether its authoring model, delivery profile, and support posture fit the business capability being built. The strongest platforms often use more than one pattern on purpose.`,
});

export const aemTesting = makeTopic({
  slug: 'aem-testing',
  title: 'AEM Testing and Best Practices',
  description: 'Learn practical AEM testing across Sling Models, AEM Mocks, integration validation, authoring quality, and deployment discipline.',
  quickUnderstanding: 'AEM testing is a mix of repository-aware unit tests, component and integration checks, authoring validation, and release discipline around templates, configs, and publishing behavior.',
  whatIsIt: `A strong AEM quality strategy usually includes:

- unit testing Sling Models and services
- AEM Mocks for repository-aware local tests
- integration testing for APIs, configs, and delivery paths
- component verification for authoring behavior and rendering
- code quality, naming, and content-structure standards
- release checks around deployment, cache, and publishing`,
  whyWeNeedIt: `AEM issues often appear only when content, config, and runtime behavior meet:

- a Sling Model works until a dialog field is missing
- a component renders until a policy changes
- a deployment succeeds until content dependencies are checked

Testing protects those seams, not just isolated Java methods.`,
  realWorldUsage: `Teams commonly use AEM Mocks for service and model tests, maintain UI or authoring smoke checks for critical flows, validate templates and policies in integration environments, and verify publishing, cache, and content dependencies after release.`,
  howItWorks: `Practical quality model:

1. Unit-test models and services with realistic content shapes
2. Validate authoring contracts like dialogs, policies, and component assumptions
3. Add integration checks for APIs, configs, and dispatcher-sensitive behavior
4. Use deployment verification to confirm content, cache, and publish state after release`,
  exampleTitle: 'Quality layers',
  exampleDescription: 'Testing what typically breaks first in AEM programs.',
  exampleCode: `Unit test:
- Sling Model field mapping
- service logic

Repository-aware test:
- AEM Mocks with sample content tree

Integration check:
- config present
- endpoint works
- template/policy aligned

Release verification:
- publish content visible
- cache headers correct
- critical authoring path intact`,
  commonConfusions: [
    {
      question: 'If I unit-test my Sling Model, am I done?',
      answer: 'No. AEM quality also depends on content shape, policies, configs, authoring behavior, and environment-specific delivery.',
    },
    {
      question: 'Are manual authoring checks enough?',
      answer: 'They help, but without automated coverage for key contracts, regressions keep returning.',
    },
  ],
  productionIssues: [
    'A refactor passes unit tests but breaks authoring because dialog and model contracts were never exercised together.',
    'A pipeline passes while a release still fails because templates, policies, or referenced content were not part of verification.',
    'Teams have tests, but none of them cover publish-only behavior and cache-sensitive failures.',
  ],
  bestPractices: [
    'Test the contracts between content, model, rendering, and config.',
    'Use AEM Mocks for realistic repository-aware unit tests.',
    'Add release verification for publish, cache, and authoring-critical flows.',
  ],
  faqs: [
    {
      question: 'What should a junior AEM developer learn first in testing?',
      answer: 'How to unit-test Sling Models and services with realistic sample content and how to verify authoring assumptions.',
    },
    {
      question: 'Why do AEM teams still need release validation if tests pass?',
      answer: 'Because deployed content, environment config, Dispatcher behavior, and publication state can still diverge from local assumptions.',
    },
  ],
  keyTakeaways: [
    'AEM testing must cover repository, authoring, config, and release behavior',
    'AEM Mocks is a core tool for realistic local testing',
    'Release verification remains essential even with strong automation',
  ],
  relatedTopics: ['components', 'sling-models', 'cloud-manager-and-devops', 'production-troubleshooting'],
  architectNote: `AEM quality improves fastest when teams stop treating bugs as only code defects. Most regressions happen at boundaries: content shape, config, policies, publish state, and cache behavior. Testing should mirror that reality.`,
});

export const productionTroubleshooting = makeTopic({
  slug: 'production-troubleshooting',
  title: 'AEM Production Troubleshooting',
  description: 'Learn a practical way to diagnose publishing failures, blank components, dialog issues, cache problems, GraphQL issues, and deployment drift in AEM.',
  quickUnderstanding: 'Strong AEM troubleshooting means identifying the failing layer first: authoring, publish state, repository, config, cache, integration, or deployment.',
  whatIsIt: `This topic focuses on common production issue families:

- page not publishing
- component not rendering
- dialog not saving
- client libraries not loading
- dispatcher cache serving stale output
- permission failures
- workflow backlog
- query performance issues
- GraphQL and fragment delivery issues
- OSGi config and deployment drift`,
  whyWeNeedIt: `AEM incidents are multi-layered. Guessing wastes release windows. Teams need a repeatable mental model so they can narrow root causes quickly and communicate clearly with content, platform, and business stakeholders.`,
  realWorldUsage: `During a live incident, a senior AEM developer may check whether content actually published, inspect referenced fragment state, compare headers to prove cache source, verify bundle and config state on Publish, and review whether the failing path is code, content, or environment drift.`,
  howItWorks: `Troubleshooting sequence:

1. Reproduce and classify the symptom
2. Identify whether the issue is authoring, publish, cache, config, integration, or frontend
3. Gather direct evidence from logs, headers, content state, and environment comparison
4. Fix the narrowest proven cause
5. Capture the operational lesson so the incident is easier next time`,
  exampleTitle: 'Incident flow',
  exampleDescription: 'A quick model for high-signal diagnosis under pressure.',
  exampleCode: `Symptom: page published but still old on live site

Check:
1. author publication status
2. referenced assets/fragments/templates
3. publish direct response
4. Dispatcher/CDN headers
5. environment/vhost mismatch

Then act:
- publish dependency
- invalidate targeted cache
- fix config or deployment drift
- avoid blind full-platform clears`,
  commonConfusions: [
    {
      question: 'If content looks wrong, is it always a publishing problem?',
      answer: 'No. It could be cache staleness, missing dependencies, environment mismatch, config drift, or frontend/clientlib issues.',
    },
    {
      question: 'Should we clear all cache immediately during incidents?',
      answer: 'Usually no. Broad cache clears can add risk and hide the real failing layer.',
    },
  ],
  productionIssues: [
    'A component works on Author but fails on Publish because of missing service config or permission differences.',
    'GraphQL responses are correct in lower environments but stale or broken in production because persisted query deployment and cache behavior drifted.',
    'Dialog changes save but do not appear because clientlibs, models, or policy assumptions are out of sync.',
  ],
  bestPractices: [
    'Prove the failing layer before taking action.',
    'Use targeted fixes and targeted cache invalidation where possible.',
    'Turn repeated incident patterns into runbooks and release checks.',
  ],
  faqs: [
    {
      question: 'What is the most common AEM troubleshooting mistake?',
      answer: 'Jumping to one favorite root cause instead of classifying the failing layer first.',
    },
    {
      question: 'What should an architect expect from senior incident handling?',
      answer: 'Clear layer isolation, evidence-based decisions, targeted remediation, and better runbooks after the incident.',
    },
  ],
  keyTakeaways: [
    'AEM incidents are multi-layered and need structured diagnosis',
    'Headers, logs, content state, and config comparison are high-value signals',
    'Targeted remediation is safer than broad guess-driven action',
  ],
  relatedTopics: ['dispatcher', 'aem-performance', 'cloud-manager-and-devops', 'aem-security'],
  architectNote: `Production troubleshooting is where platform design quality becomes visible. If teams cannot quickly separate content, config, cache, and integration failures, the problem is rarely just training. It is usually missing observability and weak operating discipline.`,
});
