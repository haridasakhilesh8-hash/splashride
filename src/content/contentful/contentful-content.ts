import type { FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const defaultVersions = [
  'Contentful Web App',
  'Content Delivery API',
  'Content Preview API',
  'Content Management API',
];

interface ContentfulTopicSpec {
  slug: string;
  title: string;
  description: string;
  concept: string;
  why: string;
  usage: string;
  workflow: string;
  exampleTitle: string;
  exampleCode: string;
  productionIssues: string[];
  bestPractices: string[];
  relatedTopics: string[];
  faqs?: FAQ[];
}

function topic(spec: ContentfulTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: defaultVersions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the Contentful concepts senior developers use to keep content models clean, delivery predictable, and production CMS workflows supportable across teams and environments.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why teams ask about this in interviews:**
- Contentful topics are usually discussed through real delivery and governance problems, not only definitions
- Interviewers want to know how content modeling choices affect frontend teams, editors, environments, and publishing risk
- Senior candidates should explain the production trade-offs behind headless CMS design, API usage, preview workflows, and operational support`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Contentful-oriented example for ${spec.title.toLowerCase()}.`,
      code: [
        {
          label: spec.exampleTitle,
          language: 'text',
          code: spec.exampleCode,
        },
      ],
    },
    commonConfusions: [
      {
        question: `Is ${spec.title} only a CMS UI concept?`,
        answer: `No. ${spec.title} affects how engineers structure content, connect delivery APIs, manage preview and publishing, and support production integrations across environments.`,
      },
      {
        question: `What makes a weak answer for ${spec.title}?`,
        answer: `A weak answer explains the feature but ignores editor workflow, model consistency, API behavior, caching, permissions, and the way frontend teams actually consume Contentful content.`,
      },
      {
        question: `How should senior engineers discuss ${spec.title}?`,
        answer: `Senior engineers should connect ${spec.title} to content governance, release safety, performance, localization, integration patterns, and the support burden that appears after launch.`,
      },
    ],
    productionIssues: spec.productionIssues,
    bestPractices: spec.bestPractices,
    architectNote: `In Contentful, ${spec.title} should be treated as part of the content platform architecture, not as an isolated CMS feature. The important conversation is about model clarity, editor safety, frontend delivery contracts, and how the decision stays maintainable as channels and teams grow.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Contentful project?`,
        answer: `Explain ${spec.title} through the content model, the consuming application, the publishing workflow, and the operational concerns that show up when multiple teams and environments depend on the same CMS.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The common production concern is misalignment between editor workflow and engineering assumptions, which leads to broken previews, invalid content shapes, cache surprises, or release regressions across consuming applications.`,
      },
      ...(spec.faqs ?? []),
    ],
    keyTakeaways: [
      `${spec.title} is a content-platform decision, not just a CMS definition.`,
      'Strong Contentful answers connect editor experience, API usage, and frontend delivery together.',
      'Production readiness means thinking about governance, preview, caching, and publishing behavior early.',
      'Senior engineers use Contentful concepts to reduce content ambiguity and release risk at scale.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const contentfulTopicSpecs: ContentfulTopicSpec[] = [
  {
    slug: 'what-is-contentful',
    title: 'What is Contentful',
    description: 'Understand Contentful as a headless CMS platform for structured content, multi-channel delivery, and modern frontend integrations.',
    concept: `Contentful is a headless CMS that stores content as structured data instead of tightly coupling it to one website page template. Teams model content once, manage it through the Contentful web app, and deliver it to websites, mobile apps, kiosks, or internal tools through APIs.

The important idea is separation of content from presentation. Content editors work in Contentful, while frontend and backend teams decide how to render that content in their applications.`,
    why: `Teams choose Contentful when they need reusable content models, faster multi-channel delivery, and cleaner separation between editor workflows and application code. It is especially useful when one organization serves content to multiple apps or countries.`,
    usage: `In a real project, marketing teams manage article, landing-page, product, and campaign content inside Contentful while React or Next.js apps fetch published entries through APIs and render them with project-specific components.`,
    workflow: `A team defines content types, creates entries and assets, organizes environments, and then connects frontend applications to the Delivery or Preview APIs. Publishing updates the available content for downstream consumers without redeploying the app in many cases.`,
    exampleTitle: 'Headless CMS flow',
    exampleCode: `Editors create content in Contentful
  -> Content model validates structure
  -> Content is published
  -> Frontend fetches through CDA or GraphQL
  -> Components render the content for web or app users`,
    productionIssues: [
      'Teams treat Contentful like a page builder and skip proper content modeling, which leads to messy schemas and fragile frontend code.',
      'Applications assume one fixed content shape while editors keep evolving fields without release coordination.',
      'Preview, localization, and publishing rules are not defined early, causing confusion between editorial and engineering teams.',
    ],
    bestPractices: [
      'Treat Contentful as a structured content platform, not only an admin tool.',
      'Define content contracts clearly between editors and frontend teams.',
      'Document model ownership, publishing expectations, and environment strategy early.',
      'Use stable content types that reflect reusable business concepts rather than one-off page needs.',
    ],
    relatedTopics: ['contentful-content-types', 'contentful-content-model-design', 'contentful-content-delivery-api'],
  },
  {
    slug: 'contentful-spaces-environments',
    title: 'Spaces and Environments',
    description: 'Learn how Contentful spaces and environments separate content programs, teams, release stages, and schema changes.',
    concept: `A Contentful space is the top-level container for a content platform. Inside a space, environments provide isolated copies of content and schema for development, testing, or staged changes.

Spaces usually map to a product, brand, or business area. Environments support safer iteration by letting teams test model changes and content updates without immediately affecting production.`,
    why: `Without clear space and environment strategy, teams make schema changes directly in production, mix unrelated content programs together, or lose confidence in preview and release workflows.`,
    usage: `A common setup uses one production space with environments such as master, development, QA, and feature-specific branches. Teams test migrations and entry changes in non-production environments before promoting them safely.`,
    workflow: `Teams create or clone environments, apply model changes or content migrations, test their consuming applications against that environment, and then promote or recreate the changes in the target environment based on the release workflow.`,
    exampleTitle: 'Environment release model',
    exampleCode: `Space: marketing-platform
  -> master
  -> development
  -> qa
  -> feature-navigation-refresh

Frontend app
  -> points to environment-specific API configuration`,
    productionIssues: [
      'Schema changes are made directly in master and break consumers that were not ready for the new content shape.',
      'Teams forget which environment the frontend preview app is using and debug the wrong content set.',
      'Environment sprawl builds up without ownership or cleanup, increasing release confusion.',
    ],
    bestPractices: [
      'Define a small, intentional environment strategy before scaling the team.',
      'Keep production and experimentation clearly separated.',
      'Make frontend environment configuration explicit in local, QA, and preview deployments.',
      'Clean up short-lived environments so the content platform stays understandable.',
    ],
    relatedTopics: ['what-is-contentful', 'contentful-preview-setup', 'contentful-migration-strategy'],
  },
  {
    slug: 'contentful-content-types',
    title: 'Content Types',
    description: 'Understand Contentful content types as the schema definitions that control structured content across pages, apps, and channels.',
    concept: `A content type defines the structure of a piece of content in Contentful. It specifies the fields, field types, validations, and relationships that entries must follow.

Examples include Article, Author, Landing Page, Product Feature, or FAQ Item. Content types are the schema layer that keeps content structured and predictable for consuming applications.`,
    why: `Good content types reduce ambiguity for editors and make frontend rendering more reliable. Poorly designed content types create repetitive fields, inconsistent data, and harder long-term maintenance.`,
    usage: `In production, teams design content types around reusable business entities. For example, a Blog Article content type may include title, slug, hero image, body, author reference, category, SEO fields, and publishing metadata.`,
    workflow: `A developer or content architect defines the content type, editors create entries against it, validations enforce required structure, and frontend code fetches and maps the typed fields into UI components.`,
    exampleTitle: 'Article content type structure',
    exampleCode: `Content Type: Article
- title (Short text)
- slug (Short text, unique)
- summary (Long text)
- heroImage (Media)
- body (Rich text)
- author (Reference -> Author)
- category (Reference -> Category)
- seoTitle (Short text)
- seoDescription (Long text)`,
    productionIssues: [
      'Content types become catch-all buckets with too many unrelated fields, making both editing and rendering confusing.',
      'Teams rename or repurpose fields without migration planning, breaking existing integrations.',
      'The same concept is modeled differently across multiple content types, which increases frontend branching logic.',
    ],
    bestPractices: [
      'Model stable business concepts, not temporary page layouts.',
      'Keep field names clear and semantically meaningful for both editors and engineers.',
      'Review content types with both content owners and frontend developers before rollout.',
      'Prefer reusable schemas over duplicating similar structures in multiple types.',
    ],
    relatedTopics: ['contentful-content-model-design', 'contentful-field-validations', 'contentful-entries-assets'],
  },
  {
    slug: 'contentful-entries-assets',
    title: 'Entries and Assets',
    description: 'Learn how Contentful stores structured entries and media assets, and how both are connected in real content workflows.',
    concept: `Entries are the individual content records created from content types, such as one article, one FAQ item, or one author profile. Assets are managed files such as images, PDFs, videos, or icons.

Entries and assets are separate but often connected through references. This separation helps teams reuse content and media across multiple pages and channels.`,
    why: `Engineers need to understand entries and assets because frontend rendering, publishing, localization, and caching all depend on how these records are structured and referenced.`,
    usage: `Editors create article entries, select reusable author entries, and attach hero images from the asset library. Frontend apps fetch the entry, resolve linked assets, and generate the final UI presentation from the structured data.`,
    workflow: `Entries move through draft and published states. Assets are uploaded, processed, and then linked into entries. Delivery APIs return entry fields plus linked references and asset metadata for rendering logic.`,
    exampleTitle: 'Entry and asset relationship',
    exampleCode: `Entry: Article
- title: "Spring Boot API Patterns"
- heroImage -> Asset: spring-api-cover.png
- author -> Entry: Priya Nair
- body -> Rich text nodes

Asset
- file URL
- width / height
- content type
- title / description`,
    productionIssues: [
      'Editors upload duplicate assets repeatedly because governance and naming are missing.',
      'Frontend teams assume asset metadata is always present, then image rendering breaks on incomplete uploads.',
      'Large asset libraries become hard to manage when content owners do not follow naming or folder conventions.',
    ],
    bestPractices: [
      'Define asset naming, ownership, and reuse guidelines early.',
      'Treat entries and assets as separate managed resources with clear validation rules.',
      'Handle missing or incomplete media defensively in consuming applications.',
      'Use references instead of copying content or asset data into multiple entries.',
    ],
    relatedTopics: ['contentful-content-types', 'contentful-references-relationships', 'contentful-asset-optimization'],
  },
  {
    slug: 'contentful-content-model-design',
    title: 'Content Model Design',
    description: 'Understand how to design Contentful content models that stay scalable, reusable, and editor-friendly over time.',
    concept: `Content model design is the discipline of deciding which content types, fields, relationships, and validations should exist in a Contentful space. A good model is readable for editors, predictable for developers, and flexible enough for future channels.

This is one of the most important architecture areas in any headless CMS implementation.`,
    why: `Weak content models create hidden costs everywhere else: frontend branching, migration pain, duplicated content, editorial confusion, and harder localization or search implementation.`,
    usage: `Senior teams usually model reusable entities such as authors, categories, product cards, SEO blocks, and modular sections instead of putting every need into one giant page content type.`,
    workflow: `Teams start from real content scenarios, identify reusable business entities, model relationships, add validations, test the editing experience, and then connect those structures to consuming applications and search flows.`,
    exampleTitle: 'Reusable content model approach',
    exampleCode: `Landing Page
- title
- slug
- heroSection -> Reference
- contentBlocks -> Array of references
- seo -> Reference

Reusable block types
- Hero Banner
- Feature Grid
- FAQ Section
- CTA Banner`,
    productionIssues: [
      'Page-specific models are created too quickly and become impossible to reuse in other experiences.',
      'Editors need to understand engineering-only structure because the model was not reviewed for usability.',
      'Model evolution becomes painful because relationships and field ownership were never designed intentionally.',
    ],
    bestPractices: [
      'Start with business concepts and editorial workflows before thinking about JSON shape.',
      'Model for reuse and clarity, not short-term convenience.',
      'Prototype both the editor experience and the frontend rendering path before locking the model.',
      'Review model changes as architecture decisions, not casual admin edits.',
    ],
    relatedTopics: ['contentful-content-types', 'contentful-references-relationships', 'contentful-best-practices'],
  },
  {
    slug: 'contentful-references-relationships',
    title: 'References and Relationships',
    description: 'Learn how Contentful references connect entries and why relationship design matters for reusable content and frontend rendering.',
    concept: `References in Contentful link one entry to another entry or asset. They are used to model relationships such as article to author, page to section blocks, product to category, or FAQ item to topic grouping.

Good relationship design keeps content normalized and reusable. Bad relationship design creates duplicates and harder rendering logic.`,
    why: `References are central to headless CMS architecture because most real content structures are relational. Teams need them for modular pages, reusable metadata, localization strategies, and content reuse across multiple channels.`,
    usage: `A landing page may reference a hero block, a feature grid, multiple testimonials, and a CTA banner. Frontend code resolves these linked entries and renders the appropriate components in order.`,
    workflow: `Content types define allowed reference targets. Editors select linked entries. Delivery APIs return links that applications resolve through included resources or follow-up queries depending on the API pattern.`,
    exampleTitle: 'Composable page relationships',
    exampleCode: `Landing Page
  -> heroSection: Hero Banner
  -> blocks:
     - Feature Grid
     - Testimonial Carousel
     - CTA Banner
  -> seo: SEO Metadata

Each referenced entry can be reused elsewhere`,
    productionIssues: [
      'Reference graphs become too deep, which makes preview and rendering logic harder to reason about.',
      'Teams allow broad reference targets and editors accidentally choose incompatible entry types.',
      'Circular or loosely controlled relationships make content troubleshooting painful.',
    ],
    bestPractices: [
      'Limit reference targets to intentional, valid content shapes.',
      'Keep relationship depth understandable for both editors and frontend developers.',
      'Document how linked entries map to rendering components.',
      'Prefer reusable relationships over duplicated copy, but avoid overengineering the graph.',
    ],
    relatedTopics: ['contentful-content-model-design', 'contentful-rendering-rich-text', 'contentful-content-delivery-api'],
  },
  {
    slug: 'contentful-rich-text-fields',
    title: 'Rich Text Fields',
    description: 'Understand Contentful rich text fields for editor-friendly long-form content and component-based rendering.',
    concept: `Rich text fields let editors write formatted content such as paragraphs, headings, lists, embedded entries, and links while still storing the result as structured JSON rather than raw HTML.

This allows frontend teams to render the content in a controlled way instead of injecting arbitrary markup directly.`,
    why: `Rich text matters because long-form content usually needs both editorial freedom and frontend consistency. Teams must balance flexibility with design-system control, accessibility, and safe rendering.`,
    usage: `Rich text is commonly used for article bodies, legal pages, release notes, and modular content sections where editors need formatting but the app still wants structured rendering and embedded components.`,
    workflow: `Editors create rich text content in the Contentful editor. The API returns a document tree. The frontend maps nodes such as paragraphs, headings, links, and embedded entries to presentation components.`,
    exampleTitle: 'Rich text rendering flow',
    exampleCode: `Rich text JSON
  -> nodeType: document
  -> content:
     - heading-2
     - paragraph
     - embedded-entry-block
     - unordered-list

Frontend renderer
  -> maps nodes to React components`,
    productionIssues: [
      'Teams render rich text without custom mapping and lose design-system consistency.',
      'Embedded entries are allowed but not handled in frontend code, causing runtime gaps.',
      'Content authors expect HTML-like freedom while the model only supports structured nodes.',
    ],
    bestPractices: [
      'Define a clear rendering strategy for rich text node types and embedded entries.',
      'Keep rich text usage intentional instead of making it the answer for every content need.',
      'Validate which formatting patterns editors are allowed to use.',
      'Test rich text content with realistic editorial examples before release.',
    ],
    relatedTopics: ['contentful-rendering-rich-text', 'contentful-content-model-design', 'contentful-references-relationships'],
  },
  {
    slug: 'contentful-field-validations',
    title: 'Field Validations',
    description: 'Learn how Contentful field validations protect content quality, frontend assumptions, and editorial consistency.',
    concept: `Field validations in Contentful enforce rules such as required fields, character limits, allowed values, asset types, slug patterns, and reference restrictions.

They act as schema guardrails so editors cannot accidentally create content that breaks downstream consumers or violates content standards.`,
    why: `Validations reduce production surprises. Without them, frontend teams must defend against every possible content mistake and editorial quality becomes inconsistent across large teams.`,
    usage: `Teams use validations for required SEO fields, enum-style layout options, image size expectations, slug formats, allowed reference types, and localized content rules.`,
    workflow: `Developers or content architects configure validations at the field level. Editors get immediate guidance when entering content, and applications can rely more confidently on the content shape they receive.`,
    exampleTitle: 'Common validation rules',
    exampleCode: `Field: slug
- required
- unique pattern

Field: heroImage
- only image asset types

Field: layoutVariant
- allowed values: default, compact, feature`,
    productionIssues: [
      'Required business fields are left optional and applications later fail on missing content.',
      'Validation rules are inconsistent across similar content types, creating editorial confusion.',
      'Teams overuse free-text fields where controlled values would prevent downstream bugs.',
    ],
    bestPractices: [
      'Use validations to protect content contracts, not only to satisfy admin completeness.',
      'Apply similar rules consistently across related content types.',
      'Prefer constrained options for fields that drive presentation or logic.',
      'Review validation changes with both editors and consuming teams.',
    ],
    relatedTopics: ['contentful-content-types', 'contentful-content-model-design', 'contentful-content-publishing-flow'],
  },
  {
    slug: 'contentful-content-delivery-api',
    title: 'Content Delivery API',
    description: 'Understand the Content Delivery API for fetching published Contentful content in production applications.',
    concept: `The Content Delivery API, often called CDA, is Contentful's read API for published content. It is optimized for production delivery and is the most common integration path for websites and apps that need live published content.

It returns entries, assets, and links in JSON form and supports filtering, includes, and locale selection.`,
    why: `The CDA is the main production content path for most Contentful projects. Engineers need to understand it because rendering, caching, preview separation, and performance all depend on how published content is fetched.`,
    usage: `A React or Next.js app often calls the CDA during build time, server rendering, or API route processing to fetch published article pages, menus, home-page sections, or structured product content.`,
    workflow: `The application uses a space ID, environment, and delivery token to call the API. The CDA returns only published content. Teams often wrap the fetch in SDK helpers, custom repository functions, or server-side data loaders.`,
    exampleTitle: 'CDA request model',
    exampleCode: `GET /spaces/{space}/environments/{env}/entries
  ?content_type=article
  &fields.slug=spring-boot-api-patterns
  &include=2

Returns published entry data plus linked references`,
    productionIssues: [
      'Applications accidentally use the Preview API token in production delivery paths.',
      'Teams request too much linked content in one call and create unnecessary payload size or rendering complexity.',
      'Cache invalidation strategy is unclear, so published content does not appear when editors expect it.',
    ],
    bestPractices: [
      'Use the CDA only for published content delivery.',
      'Keep fetch shapes intentional and avoid overfetching large reference graphs.',
      'Centralize Contentful data-access code so tokens, locales, and includes stay consistent.',
      'Pair CDA usage with a clear cache and revalidation strategy.',
    ],
    relatedTopics: ['contentful-content-preview-api', 'contentful-graphql-api', 'contentful-caching-strategy'],
  },
  {
    slug: 'contentful-content-preview-api',
    title: 'Content Preview API',
    description: 'Learn how the Content Preview API exposes draft content for preview environments and editor review workflows.',
    concept: `The Content Preview API, or CPA, returns draft and unpublished content from Contentful. It is used when editors need to see changes before publishing, usually through a preview deployment or preview route in the consuming application.

The CPA should be treated as a controlled preview-only path, not a production content source.`,
    why: `Preview workflows are one of the most important quality-of-life features in a headless CMS. Teams need them so editors can validate content changes safely before they affect live users.`,
    usage: `A Next.js preview route may switch tokens and fetch from the CPA so editors can inspect draft page changes in a protected preview environment before pressing publish.`,
    workflow: `The frontend or backend detects preview mode, uses preview credentials, fetches draft content from the right environment, and renders the unpublished state for authorized users only.`,
    exampleTitle: 'Preview mode switch',
    exampleCode: `If preview mode is enabled
  -> use Preview API token
  -> fetch draft content
Else
  -> use Delivery API token
  -> fetch published content`,
    productionIssues: [
      'Preview credentials are exposed too broadly, creating unnecessary security risk.',
      'Frontend teams cannot tell whether the page is rendering draft or published content and debugging becomes confusing.',
      'Editors expect preview to match production exactly, but the preview environment is wired to different configuration or stale assets.',
    ],
    bestPractices: [
      'Keep preview authentication and routing clearly separated from public production traffic.',
      'Make preview state explicit in the consuming application UI or logs.',
      'Test preview against the same rendering logic and environment assumptions as production where possible.',
      'Document who can access preview and how draft visibility should work.',
    ],
    relatedTopics: ['contentful-preview-setup', 'contentful-content-delivery-api', 'contentful-spaces-environments'],
  },
  {
    slug: 'contentful-graphql-api',
    title: 'GraphQL API',
    description: 'Understand Contentful GraphQL API usage for selective querying, typed frontend data access, and modern app integrations.',
    concept: `Contentful provides a GraphQL API that lets applications query exactly the fields they need instead of consuming larger REST payloads. This is especially useful for component-driven frontends and typed data-access layers.

GraphQL is a delivery interface choice, not a different content source. It still reflects the same underlying content model.`,
    why: `Teams choose GraphQL when they want selective field queries, stronger typing patterns, and cleaner frontend integration, especially in React or Next.js apps with complex pages and reusable query fragments.`,
    usage: `Frontend teams use GraphQL to fetch just the fields needed for a page route, section component, or SEO block, rather than loading larger REST payloads and manually mapping unnecessary fields.`,
    workflow: `Applications send GraphQL queries against the space and environment. The response shape matches the query, which makes typed frontend models and reusable fragments easier to maintain.`,
    exampleTitle: 'GraphQL delivery pattern',
    exampleCode: `query ArticlePage($slug: String!) {
  articleCollection(where: { slug: $slug }, limit: 1) {
    items {
      title
      summary
      heroImage { url title }
      author { name }
    }
  }
}`,
    productionIssues: [
      'Teams assume GraphQL automatically solves model-design problems that still exist underneath.',
      'Queries grow inconsistently across pages and create maintenance sprawl without shared fragments or conventions.',
      'Frontend code becomes tightly coupled to one query shape without fallback handling for missing references.',
    ],
    bestPractices: [
      'Use GraphQL when selective querying improves maintainability or performance.',
      'Define shared query conventions and typed models for consistency.',
      'Handle nullable references and editorial change safely in the UI layer.',
      'Keep GraphQL decisions aligned with the broader content model and rendering architecture.',
    ],
    relatedTopics: ['contentful-content-delivery-api', 'contentful-react', 'contentful-nextjs'],
  },
  {
    slug: 'contentful-sync-api',
    title: 'Sync API',
    description: 'Learn how the Contentful Sync API helps clients track incremental content changes instead of refetching everything repeatedly.',
    concept: `The Sync API lets applications or services fetch an initial content snapshot and then request only the incremental changes that happened afterward. This is useful when a consumer needs to keep a local cache or mirror up to date efficiently.

Instead of pulling the whole dataset every time, the client stores a sync token and resumes from that point.`,
    why: `The Sync API matters in larger integrations where polling the full content set would be wasteful or slow. It is especially relevant for search indexing, downstream cache refresh jobs, and offline content mirrors.`,
    usage: `A backend service may sync all product or article entries into an internal search index, then keep that mirror updated by processing incremental changes from Contentful on a schedule.`,
    workflow: `The client performs an initial sync, stores the returned sync token, and later requests delta updates using that token. Added, changed, and deleted records are returned so the local mirror can stay current.`,
    exampleTitle: 'Incremental sync process',
    exampleCode: `Initial sync
  -> fetch all entries and assets
  -> store nextSyncToken

Next run
  -> call sync with token
  -> process changed and deleted items
  -> store new token`,
    productionIssues: [
      'Teams use the Sync API without strong local-state handling and end up with stale or inconsistent mirrors.',
      'Deleted items are ignored in downstream systems, causing ghost content to remain in search or cache layers.',
      'Sync jobs fail silently and nobody notices that the local mirror stopped updating.',
    ],
    bestPractices: [
      'Use the Sync API when you truly need incremental mirroring, not by default for simple page fetches.',
      'Handle deletions, retries, and token storage carefully.',
      'Monitor sync jobs and downstream index freshness explicitly.',
      'Keep sync responsibilities in backend or integration layers, not ad hoc frontend code.',
    ],
    relatedTopics: ['contentful-webhooks', 'contentful-caching-strategy', 'contentful-content-management-api'],
  },
  {
    slug: 'contentful-content-management-api',
    title: 'Content Management API',
    description: 'Understand the Content Management API for programmatic content operations, migrations, automation, and admin workflows.',
    concept: `The Content Management API, or CMA, is Contentful's write-capable API. It is used to create or update content types, entries, assets, roles, and environment-level configuration programmatically.

Unlike the Delivery or Preview APIs, the CMA is part of administrative and automation workflows, not public content rendering.`,
    why: `The CMA matters because enterprise teams often automate migrations, imports, environment setup, and integration tasks instead of managing everything manually in the UI.`,
    usage: `Teams use the CMA in content import scripts, content model migrations, publishing automation, or internal tools that need controlled write access to Contentful content or configuration.`,
    workflow: `A trusted backend or script authenticates with management credentials, reads or mutates resources, respects versioning or publishing rules, and then exits. These flows are usually part of CI, content tooling, or platform operations.`,
    exampleTitle: 'Programmatic content operation',
    exampleCode: `Migration script
  -> read content type definition
  -> add new field
  -> update validations
  -> publish content type
  -> backfill affected entries if needed`,
    productionIssues: [
      'Management tokens are handled too casually and gain broader access than necessary.',
      'Automation scripts update schemas or content without migration planning, breaking consumers unexpectedly.',
      'Teams mix public read usage and admin write usage in the same application boundary.',
    ],
    bestPractices: [
      'Treat CMA credentials as privileged operational access.',
      'Run schema or bulk-content changes through reviewed migration workflows.',
      'Separate admin automation from public runtime delivery paths.',
      'Use version-aware updates and logging for write operations.',
    ],
    relatedTopics: ['contentful-migration-strategy', 'contentful-roles-permissions', 'contentful-webhooks'],
  },
  {
    slug: 'contentful-roles-permissions',
    title: 'Roles and Permissions',
    description: 'Learn how Contentful roles and permissions control editorial access, environment safety, and team responsibilities.',
    concept: `Roles and permissions in Contentful decide who can read, edit, publish, delete, or manage different types of content and environments. They are essential for keeping editorial work safe in multi-team setups.

Permissions should reflect actual workflow boundaries, not only convenience.`,
    why: `A headless CMS becomes risky when everyone can change everything. Proper permissions reduce accidental publishing, schema edits, and unauthorized access to sensitive previews or content programs.`,
    usage: `A typical team gives editors access to selected content types, reviewers publishing permissions, and developers or platform owners access to model changes and management tasks in non-production environments.`,
    workflow: `Administrators define roles, assign them to users or groups, and restrict access by environment, content type, or action. These permissions shape the editorial release process and platform safety model.`,
    exampleTitle: 'Editorial access model',
    exampleCode: `Content Editor
- create and edit entries
- no schema changes
- no production environment admin access

Content Publisher
- review and publish entries

Platform Admin
- manage content model, environments, and integrations`,
    productionIssues: [
      'Too many users get broad publish or admin access because permissions were never modeled carefully.',
      'Editors can modify schemas or production-only settings that should be controlled by platform owners.',
      'Access reviews are skipped and old permissions remain long after team roles changed.',
    ],
    bestPractices: [
      'Apply least privilege to both content and configuration access.',
      'Separate editorial publishing from platform administration where possible.',
      'Review access regularly as teams and environments evolve.',
      'Align permissions with the real content workflow, not just org charts.',
    ],
    relatedTopics: ['contentful-content-publishing-flow', 'contentful-spaces-environments', 'contentful-content-management-api'],
  },
  {
    slug: 'contentful-webhooks',
    title: 'Webhooks',
    description: 'Understand Contentful webhooks for publishing automation, search indexing, cache purges, and downstream system updates.',
    concept: `Webhooks let Contentful notify other systems when events happen, such as entry publish, unpublish, archive, or content-type updates. They are the bridge between editorial actions and downstream automation.

This makes them important for modern headless CMS operations.`,
    why: `Without event-driven updates, teams rely on manual steps or slow polling for actions like cache invalidation, rebuild triggers, or search reindexing. Webhooks help keep content delivery systems current.`,
    usage: `A project may trigger a Next.js revalidation endpoint, a search-index refresh job, a Slack notification, or an integration workflow whenever important content is published.`,
    workflow: `Contentful emits an event to a configured endpoint. The receiving service verifies the request, processes the event, and updates caches, search, deployments, or internal workflows accordingly.`,
    exampleTitle: 'Publish event automation',
    exampleCode: `Entry published in Contentful
  -> webhook fires
  -> backend verifies signature
  -> revalidate page or clear cache
  -> update search index if needed`,
    productionIssues: [
      'Webhook endpoints are not idempotent and repeat deliveries create inconsistent downstream updates.',
      'Teams trigger full-site rebuilds for every small content event, which scales poorly.',
      'Webhook security and retry handling are ignored until failures appear in production.',
    ],
    bestPractices: [
      'Design webhook consumers to be idempotent and observable.',
      'Trigger targeted downstream updates whenever possible instead of broad rebuilds.',
      'Verify webhook authenticity and protect endpoints.',
      'Monitor failures so publishing problems do not go unnoticed.',
    ],
    relatedTopics: ['contentful-sync-api', 'contentful-caching-strategy', 'contentful-preview-setup'],
  },
  {
    slug: 'contentful-content-publishing-flow',
    title: 'Content Publishing Flow',
    description: 'Learn how Contentful publishing flow moves content from draft to reviewed and published states in a controlled release process.',
    concept: `The publishing flow in Contentful is the operational path that takes content from draft editing to approved release. It includes entry updates, validation, preview, review, publishing, and downstream delivery behavior.

The exact workflow may vary by team, but the principle is always controlled content release.`,
    why: `Publishing flow matters because content release is a production event. Poorly managed publishing leads to incomplete pages, stale caches, incorrect localization, or unreviewed copy reaching users.`,
    usage: `Editorial teams often create drafts, review them in preview links, coordinate launch timing with marketing or engineering, and then publish entries that trigger cache refreshes or search updates.`,
    workflow: `An editor updates content, validations enforce structure, preview is reviewed, an authorized person publishes, and downstream systems receive published content through the delivery APIs or update events.`,
    exampleTitle: 'Editorial release sequence',
    exampleCode: `Draft content
  -> validation passes
  -> preview review
  -> approval
  -> publish
  -> delivery API serves new version
  -> caches and indexes refresh`,
    productionIssues: [
      'Publishing is treated like a small UI action even though multiple channels depend on it.',
      'Teams publish partial content before related references or assets are ready.',
      'No one defines whether preview approval is required before publish for important content types.',
    ],
    bestPractices: [
      'Define a publishing workflow that matches business risk and content importance.',
      'Make sure linked entries and assets are ready before publishing parent content.',
      'Pair publishing with cache, search, and preview expectations.',
      'Restrict publish rights appropriately for high-visibility content areas.',
    ],
    relatedTopics: ['contentful-roles-permissions', 'contentful-content-preview-api', 'contentful-webhooks'],
  },
  {
    slug: 'contentful-react',
    title: 'Contentful with React',
    description: 'Understand common patterns for integrating Contentful content into React applications.',
    concept: `Using Contentful with React usually means fetching structured content from an API layer and mapping that content into presentational components. React benefits from Contentful when the content model is stable and component boundaries are clear.

The main concern is not only data fetching. It is translating structured CMS data into maintainable UI composition.`,
    why: `Teams need good React integration patterns because headless CMS adoption often fails when content data is fetched ad hoc and every component interprets the schema differently.`,
    usage: `A React app may fetch navigation, page sections, articles, and reusable banners from Contentful, then render the result through component registries, section mappers, and route-specific templates.`,
    workflow: `Applications fetch content through a server layer or client layer depending on architecture, normalize the response, map content types to components, and handle missing fields or unpublished references safely.`,
    exampleTitle: 'React content mapping',
    exampleCode: `Contentful section type
  -> heroBanner => <HeroBanner />
  -> featureGrid => <FeatureGrid />
  -> faqSection => <FaqSection />

Renderer selects component based on content type`,
    productionIssues: [
      'Each React component fetches Contentful independently and creates inconsistent query or mapping behavior.',
      'Frontend code becomes tightly coupled to raw CMS field names instead of stable view models.',
      'Editors can create layouts the React app does not support because rendering rules are not well defined.',
    ],
    bestPractices: [
      'Centralize Contentful data access and mapping logic.',
      'Translate CMS data into stable frontend view models where helpful.',
      'Document which content types map to which React components.',
      'Handle empty references and incomplete editorial states defensively.',
    ],
    relatedTopics: ['contentful-rendering-rich-text', 'contentful-content-delivery-api', 'contentful-content-model-design'],
  },
  {
    slug: 'contentful-nextjs',
    title: 'Contentful with Next.js',
    description: 'Learn how Contentful fits into Next.js through server rendering, static generation, preview mode, and revalidation workflows.',
    concept: `Next.js is one of the most common frameworks used with Contentful because it supports static generation, server rendering, route handling, and preview mode in one platform.

Contentful supplies the structured content, while Next.js decides when and how that content is fetched, cached, and rendered.`,
    why: `This integration matters because many production Contentful builds depend on ISR, server components, preview routes, and webhook-driven revalidation patterns in Next.js.`,
    usage: `Teams commonly use Contentful for marketing pages, blogs, docs, or composable page experiences in Next.js apps where content updates should appear quickly without redeploying the whole site every time.`,
    workflow: `Next.js fetches content during static generation, request-time rendering, or on-demand revalidation. Preview mode switches to draft tokens and environments so editors can inspect unpublished content safely.`,
    exampleTitle: 'Next.js content flow',
    exampleCode: `Published route
  -> fetch from CDA
  -> render page
  -> cache or revalidate as configured

Preview route
  -> enable preview mode
  -> fetch from CPA
  -> render draft content`,
    productionIssues: [
      'Preview and published rendering paths drift apart, making editor review unreliable.',
      'Revalidation is too broad and causes unnecessary rebuild load or stale pages.',
      'Data-fetching strategy is chosen without considering content freshness and launch expectations.',
    ],
    bestPractices: [
      'Choose static, server, or revalidated fetching based on content freshness needs.',
      'Keep preview behavior close to production rendering logic.',
      'Use targeted webhook revalidation for high-scale content sites.',
      'Centralize token and environment handling in server-safe code.',
    ],
    relatedTopics: ['contentful-content-preview-api', 'contentful-caching-strategy', 'contentful-webhooks'],
  },
  {
    slug: 'contentful-rendering-rich-text',
    title: 'Rendering Rich Text',
    description: 'Understand how to render Contentful rich text safely and consistently in modern frontend applications.',
    concept: `Rendering Contentful rich text means transforming the structured rich text JSON document into UI components such as paragraphs, headings, lists, links, code blocks, or embedded entry components.

The main goal is controlled rendering that respects the design system and editorial flexibility at the same time.`,
    why: `Teams need a deliberate rich-text renderer because raw output is rarely enough. Real projects need custom styling, embedded component handling, safe link behavior, and accessibility-aware markup.`,
    usage: `A docs page may render headings, paragraphs, callout blocks, code embeds, and inline references from one rich-text field, all mapped into React components that match the product UI.`,
    workflow: `The app reads the rich-text document tree, maps each node type to a component, resolves embedded entries or assets, and falls back safely when unsupported nodes appear.`,
    exampleTitle: 'Renderer responsibilities',
    exampleCode: `Rich text node
  -> heading-2 => Heading component
  -> paragraph => Paragraph component
  -> embedded-entry-block => custom section component
  -> hyperlink => app link component`,
    productionIssues: [
      'Unsupported node types appear in content and the renderer fails silently or produces broken layout.',
      'Rendering logic is duplicated in multiple apps, which creates inconsistent content presentation.',
      'Embedded entries are modeled without a stable component contract for the frontend.',
    ],
    bestPractices: [
      'Keep a shared rich-text rendering strategy for the application.',
      'Support only intentional node types and communicate those limits to editors.',
      'Test embedded-entry rendering with real content combinations.',
      'Use accessibility-friendly markup for headings, lists, links, and media.',
    ],
    relatedTopics: ['contentful-rich-text-fields', 'contentful-react', 'contentful-nextjs'],
  },
  {
    slug: 'contentful-asset-optimization',
    title: 'Images and Asset Optimization',
    description: 'Learn how to use Contentful assets efficiently with responsive delivery, metadata awareness, and frontend performance patterns.',
    concept: `Asset optimization in Contentful is about delivering the right media format, size, and quality to the consuming application while preserving editorial flexibility.

Because assets are often the heaviest part of a page, this topic strongly affects performance and user experience.`,
    why: `Teams need asset optimization so CMS-managed images do not become the reason pages are slow, layout shifts happen, or mobile experiences degrade.`,
    usage: `A frontend app may request transformed image URLs, pass image dimensions into responsive components, lazy-load below-the-fold assets, and keep meaningful alt-text or descriptive metadata from Contentful.`,
    workflow: `Editors upload assets, applications read the asset metadata, generate optimized delivery URLs or transformations, and render them through framework-aware image components or custom media components.`,
    exampleTitle: 'Optimized asset flow',
    exampleCode: `Asset in Contentful
  -> read URL, width, height, description
  -> request suitable transformed size
  -> render responsive image component
  -> lazy-load where appropriate`,
    productionIssues: [
      'Large original assets are rendered directly on small screens without transformation.',
      'Missing alt text or metadata hurts accessibility and SEO quality.',
      'Frontend teams ignore width and height metadata, leading to layout shifts.',
    ],
    bestPractices: [
      'Use responsive delivery and right-sized media for each viewport or component.',
      'Preserve and validate useful asset metadata such as alt text and dimensions.',
      'Treat asset performance as part of content-platform design, not only frontend polish.',
      'Standardize how content teams upload and name production media assets.',
    ],
    relatedTopics: ['contentful-entries-assets', 'contentful-nextjs', 'contentful-caching-strategy'],
  },
  {
    slug: 'contentful-preview-setup',
    title: 'Preview Setup',
    description: 'Understand how to set up a reliable Contentful preview experience for editors, reviewers, and pre-publish validation.',
    concept: `Preview setup is the end-to-end wiring that lets editors see draft Contentful content in the real consuming application before publishing. It usually combines preview API credentials, environment selection, preview routing, and access control.

Good preview setup builds trust between content and engineering teams.`,
    why: `If preview is unreliable, editors either publish too early or stop trusting the system. That increases release mistakes and makes headless CMS workflows frustrating.`,
    usage: `A common setup uses a protected preview route in Next.js or a preview deployment where editors can open a draft article, landing page, or modular block with the same rendering components used in production.`,
    workflow: `The application receives a preview request, verifies access, switches to preview credentials, fetches draft content from the correct environment, and renders the page with draft-aware behavior until preview mode is exited.`,
    exampleTitle: 'Reliable preview requirements',
    exampleCode: `Preview request
  -> verify user or signed token
  -> enable preview mode
  -> fetch from Preview API
  -> render draft content
  -> show clear preview state`,
    productionIssues: [
      'Preview links point to the wrong environment or old deployment configuration.',
      'Editors cannot tell whether they are seeing draft or published content.',
      'Preview rendering bypasses the normal page logic and hides layout or data issues until publish time.',
    ],
    bestPractices: [
      'Make preview routing, auth, and environment selection explicit.',
      'Render preview with the same core components and layout logic as production.',
      'Show clear preview status to avoid editorial confusion.',
      'Test preview after model changes, locale additions, and major frontend releases.',
    ],
    relatedTopics: ['contentful-content-preview-api', 'contentful-spaces-environments', 'contentful-webhooks'],
  },
  {
    slug: 'contentful-localization',
    title: 'Localization',
    description: 'Learn how Contentful localization supports multi-language content models, editorial workflows, and region-specific delivery.',
    concept: `Localization in Contentful lets teams manage content in multiple locales while reusing the same content model structure. Depending on the project, some fields are localized and others stay shared.

Localization is not just translation. It affects content operations, routing, SEO, preview, and fallback behavior across channels.`,
    why: `Teams that ignore localization early often end up rebuilding content models later. Locale strategy affects slugs, metadata, publishing cadence, and how frontend routes resolve content.`,
    usage: `A global site may localize article titles, body content, SEO metadata, and hero copy while keeping some operational references or configuration fields shared across locales.`,
    workflow: `Content types enable localized fields, editors manage locale-specific values, delivery requests specify locale or fallback behavior, and the frontend resolves the correct language and route strategy for users.`,
    exampleTitle: 'Localized content path',
    exampleCode: `Entry: Product Launch Article
- title [en-US, fr-FR, de-DE]
- slug [en-US, fr-FR, de-DE]
- body [localized]
- category [shared reference]

Frontend route
  -> /en/article/launch
  -> /fr/article/lancement`,
    productionIssues: [
      'Slug strategy is unclear across locales, leading to broken routing or duplicate SEO paths.',
      'Teams localize fields inconsistently and create incomplete page experiences in some regions.',
      'Fallback behavior is not defined, so users see the wrong language unexpectedly.',
    ],
    bestPractices: [
      'Plan locale, slug, fallback, and SEO behavior before scaling multilingual content.',
      'Localize only the fields that truly need locale-specific values.',
      'Test preview, delivery, and routing for each supported locale path.',
      'Document which teams own translation, review, and publish responsibilities.',
    ],
    relatedTopics: ['contentful-content-model-design', 'contentful-preview-setup', 'contentful-caching-strategy'],
  },
  {
    slug: 'contentful-caching-strategy',
    title: 'Caching Strategy',
    description: 'Understand caching strategy for Contentful-driven apps across CDN, framework cache, API fetches, and publish-triggered invalidation.',
    concept: `Caching strategy for a Contentful implementation covers how published content is stored and refreshed across the consuming application, CDN, framework-level caches, and downstream systems.

The goal is fast delivery without confusing editors or users with stale content.`,
    why: `Caching is where headless CMS projects often feel broken after launch. Teams need clear rules for freshness, preview bypass, webhook revalidation, and what happens immediately after publish.`,
    usage: `A site may cache published Contentful responses at the application layer, use ISR or route revalidation in Next.js, and trigger targeted invalidation from webhooks when specific content changes.`,
    workflow: `Applications fetch content, cache the result according to route or data needs, and refresh the cache by time-based or event-based strategies. Preview requests usually bypass or isolate the normal published cache path.`,
    exampleTitle: 'Event-driven cache model',
    exampleCode: `Published content request
  -> fetch from Delivery API
  -> cache by route or query

Publish event
  -> webhook fires
  -> targeted revalidation runs
  -> next user gets fresh content`,
    productionIssues: [
      'Editors publish content but the site stays stale because no one defined cache invalidation clearly.',
      'One broad cache rule is applied to all content even though some pages need near-real-time freshness.',
      'Preview requests accidentally share the same cache path as published content.',
    ],
    bestPractices: [
      'Define freshness expectations per content type or page class.',
      'Use targeted revalidation where possible instead of clearing everything.',
      'Keep preview outside the normal published cache path.',
      'Document post-publish timing expectations so editors and support teams know what to expect.',
    ],
    relatedTopics: ['contentful-webhooks', 'contentful-content-delivery-api', 'contentful-nextjs'],
  },
  {
    slug: 'contentful-migration-strategy',
    title: 'Migration Strategy',
    description: 'Learn how to approach Contentful migration safely when evolving content models, importing data, or moving from another CMS.',
    concept: `Migration strategy in Contentful covers how teams introduce schema changes, backfill content, import existing data, and move safely between model versions or even from a different CMS platform.

Because content is production data, migrations must be treated like application change management.`,
    why: `Poor migration planning breaks content relationships, loses editor confidence, and causes frontend regressions. Content migrations are often harder than code releases because historical data quality is uneven.`,
    usage: `A real migration may involve importing thousands of entries from an old CMS, splitting one content type into several reusable types, backfilling slugs, and updating frontend queries in a coordinated rollout.`,
    workflow: `Teams assess the current content shape, design the target model, write migration scripts or import jobs, test in non-production environments, validate content integrity, and then cut over with rollback awareness.`,
    exampleTitle: 'Migration workstream',
    exampleCode: `Audit current content
  -> design target model
  -> write migration script
  -> run in non-production environment
  -> validate entries and references
  -> update frontend consumers
  -> promote safely`,
    productionIssues: [
      'Schema migrations are applied without validating how old content maps to the new model.',
      'Teams migrate structure but forget to update frontend queries, preview, or search indexing.',
      'Large imports run without idempotency or rollback planning and leave partial data behind.',
    ],
    bestPractices: [
      'Treat migrations as coordinated platform releases, not one-click admin changes.',
      'Validate both schema and content-data quality before production rollout.',
      'Use scripts and repeatable workflows instead of manual bulk editing.',
      'Test migration impact on preview, localization, references, and frontend rendering.',
    ],
    relatedTopics: ['contentful-content-management-api', 'contentful-spaces-environments', 'contentful-best-practices'],
  },
  {
    slug: 'contentful-best-practices',
    title: 'Best Practices',
    description: 'Understand the senior-level best practices that keep Contentful implementations maintainable, scalable, and production-ready.',
    concept: `Contentful best practices are the shared engineering and content-operations patterns that keep a headless CMS implementation healthy over time. They cover content model quality, permissions, preview, caching, integrations, and editor experience.

This topic is really about preventing platform entropy.`,
    why: `Teams need best practices because Contentful can become either a strong content platform or a messy collection of ad hoc schemas and editor workarounds depending on how it is governed.`,
    usage: `Mature teams document naming conventions, reusable model patterns, preview rules, publishing guidelines, reference strategy, migration workflows, and integration ownership so onboarding and change management stay smooth.`,
    workflow: `Best practices are established through architecture reviews, model reviews, coding standards, editorial guidance, and periodic cleanup or improvement work rather than being left to informal habits.`,
    exampleTitle: 'Healthy platform checklist',
    exampleCode: `Content model review
Permissions review
Preview and publishing workflow
Cache and revalidation strategy
Migration process
Frontend rendering contracts
Editorial documentation`,
    productionIssues: [
      'The platform technically works, but every team uses different patterns and support gets harder every quarter.',
      'No one owns model consistency, so duplicate content types and field names accumulate.',
      'Editor friction rises because conventions exist only in senior engineers’ heads.',
    ],
    bestPractices: [
      'Review Contentful structure as a platform, not only as page content.',
      'Keep engineering and editorial standards visible and documented.',
      'Regularly clean up duplicate models, stale environments, and weak conventions.',
      'Balance flexibility for editors with strong contracts for consuming applications.',
    ],
    relatedTopics: ['contentful-content-model-design', 'contentful-migration-strategy', 'contentful-roles-permissions'],
  },
  {
    slug: 'contentful-interview-questions',
    title: 'Contentful Interview Questions',
    description: 'Prepare for common Contentful interview questions around headless CMS basics, modeling, APIs, and workflow decisions.',
    concept: `Contentful interview questions usually start with headless CMS fundamentals and quickly move into content-model design, API usage, preview flow, and frontend integration. Strong answers are practical, not documentation-like.`,
    why: `Interviewers want to know whether you can work on real CMS implementations, not just whether you have opened the Contentful UI before. They test how you think about content structure and delivery trade-offs.`,
    usage: `Typical questions include when to choose Contentful, how to model reusable page sections, how preview works, when to use CDA versus GraphQL, and how to keep editors safe while moving fast.`,
    workflow: `A good interview answer frames the business need, explains the Contentful feature involved, highlights trade-offs, and then mentions what happens in production when the model or workflow is weak.`,
    exampleTitle: 'Answer pattern for Contentful interviews',
    exampleCode: `1. Define the Contentful concept
2. Explain where it fits in a real project
3. Mention the trade-off or common mistake
4. Connect it to frontend delivery or editorial workflow
5. Add one production lesson`,
    productionIssues: [
      'Candidates answer only with UI terminology and skip architecture or delivery implications.',
      'Interview answers treat Contentful like a generic CMS and ignore headless workflow realities.',
      'People know the API names but cannot explain how editors, environments, and rendering fit together.',
    ],
    bestPractices: [
      'Practice answering Contentful topics with real project examples.',
      'Explain trade-offs between flexibility, governance, and frontend simplicity.',
      'Connect content model decisions to preview, publishing, and caching behavior.',
      'Use precise language around draft, published, delivery, and management APIs.',
    ],
    relatedTopics: ['contentful-scenario-questions', 'contentful-architect-level-questions', 'contentful-production-issues'],
  },
  {
    slug: 'contentful-scenario-questions',
    title: 'Scenario Questions',
    description: 'Prepare for Contentful scenario questions that test modeling decisions, preview workflows, integrations, and production judgment.',
    concept: `Scenario questions ask how you would handle a real CMS problem such as redesigning a messy content model, adding localization, enabling preview, or supporting multiple consuming apps from one content platform.`,
    why: `These questions separate memorized Contentful knowledge from practical engineering judgment. Employers want to know how you would reason through content-platform trade-offs.`,
    usage: `A common scenario is: "We have one giant page content type and frontend releases keep breaking when editors add new sections. How would you redesign it?" Another asks how to support preview, localization, or webhooks safely.`,
    workflow: `Strong answers clarify constraints, identify the content-platform boundary, propose a maintainable model or workflow, explain risk and rollout steps, and mention how the consuming applications will be protected during change.`,
    exampleTitle: 'Scenario response structure',
    exampleCode: `Clarify the content problem
  -> identify affected editors and apps
  -> propose model / workflow changes
  -> explain rollout and migration path
  -> cover preview, caching, and support impact`,
    productionIssues: [
      'Candidates jump to one feature without addressing migration, editor impact, or release safety.',
      'Answers focus only on the frontend and ignore CMS governance or content operations.',
      'The proposal sounds clean in theory but has no safe rollout path.',
    ],
    bestPractices: [
      'Answer scenario questions through modeling, workflow, and rollout together.',
      'Show how you reduce risk for both editors and consuming apps.',
      'Mention migration, preview, permissions, and caching when relevant.',
      'Use real trade-offs instead of pretending every solution is universally best.',
    ],
    relatedTopics: ['contentful-interview-questions', 'contentful-migration-strategy', 'contentful-content-model-design'],
  },
  {
    slug: 'contentful-production-issues',
    title: 'Production Issues',
    description: 'Understand the production issues teams commonly hit with Contentful across publishing, preview, schema evolution, and frontend delivery.',
    concept: `Contentful production issues usually happen at the boundary between content operations and application behavior. Problems appear when schemas change, draft and published states are confused, caches stay stale, or references and locales are handled inconsistently.`,
    why: `Production support knowledge is important because many headless CMS failures are not infrastructure outages. They are coordination or contract failures between content, frontend, and platform workflows.`,
    usage: `Real incidents include pages showing stale content after publish, missing localized fields, preview links using the wrong environment, frontend components crashing on unexpected entry shapes, and webhook-triggered rebuild loops.`,
    workflow: `Teams troubleshoot by checking content state, environment, API path, cache behavior, recent model changes, and the frontend mapping layer before making broad fixes. The goal is to isolate whether the issue is editorial, platform, or application-side.`,
    exampleTitle: 'CMS incident triage',
    exampleCode: `Symptom
  -> verify draft vs published state
  -> verify environment and locale
  -> inspect cache / revalidation path
  -> inspect recent model or content changes
  -> inspect frontend mapping and fallbacks`,
    productionIssues: [
      'Published content does not appear because cache invalidation or revalidation is incomplete.',
      'Model changes go live without consumer coordination and frontend rendering breaks.',
      'Preview uses different tokens, environments, or rendering assumptions than production.',
    ],
    bestPractices: [
      'Troubleshoot Contentful issues from content state to delivery path to rendering path.',
      'Track model changes with the same seriousness as application changes.',
      'Keep preview, locale, and cache behavior observable.',
      'Turn repeated editorial-platform issues into documented standards or automation.',
    ],
    relatedTopics: ['contentful-caching-strategy', 'contentful-preview-setup', 'contentful-content-publishing-flow'],
  },
  {
    slug: 'contentful-architect-level-questions',
    title: 'Architect-Level Questions',
    description: 'Prepare for architect-level Contentful questions around platform governance, multi-channel content design, scaling teams, and long-term maintainability.',
    concept: `Architect-level Contentful questions focus on the platform decisions behind a headless CMS program: how spaces are separated, how models are governed, how multiple apps consume content, how preview and publishing scale, and how teams evolve the system safely over time.`,
    why: `Senior and lead interviews care less about where a button lives in the UI and more about whether you can keep a content platform clean, supportable, and scalable across multiple teams and channels.`,
    usage: `Typical architect conversations ask how to design a reusable model for multiple brands, how to govern schema changes, how to support localization and regional rollout, or how to coordinate Contentful with search, frontend caching, and deployment systems.`,
    workflow: `Strong answers connect organizational structure, content strategy, frontend integration, governance, and operational controls. They show how the platform stays understandable even as teams and channels multiply.`,
    exampleTitle: 'Architect answer lens',
    exampleCode: `Business domains
  -> content ownership
  -> model governance
  -> environments and release flow
  -> consuming applications
  -> cache, preview, search, localization
  -> operational support model`,
    productionIssues: [
      'The platform scales in content volume but not in governance, so each team starts inventing its own rules.',
      'Multiple consuming apps depend on the same content model, but versioning and change management are weak.',
      'There is no clear ownership boundary between editorial platform decisions and application architecture decisions.',
    ],
    bestPractices: [
      'Answer architect questions through governance, scale, and operating model, not only CMS features.',
      'Show how you would protect multiple consumers from schema drift.',
      'Make editorial workflow and engineering workflow part of one platform design.',
      'Treat Contentful as a product capability with long-term ownership, not a one-time setup task.',
    ],
    relatedTopics: ['contentful-best-practices', 'contentful-migration-strategy', 'contentful-scenario-questions'],
  },
];

export const contentfulTopics: TopicContent[] = contentfulTopicSpecs.map(topic);
