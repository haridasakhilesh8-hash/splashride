import type { FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const defaultVersions = [
  'Sitecore XP',
  'Sitecore XM',
  'Sitecore XM Cloud',
  'Sitecore Headless Services',
];

interface SitecoreTopicSpec {
  slug: string;
  title: string;
  description: string;
  focus: string;
  why: string;
  usage: string;
  workflow: string;
  exampleTitle: string;
  exampleCode: string;
  relatedTopics: string[];
  faqs?: FAQ[];
}

function topic(spec: SitecoreTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: defaultVersions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the Sitecore concepts senior engineers use to keep enterprise content platforms governable, headless delivery predictable, and production releases supportable across teams and environments.`,
    whatIsIt: spec.focus,
    whyWeNeedIt: `${spec.why}

**Why teams ask about this in interviews:**
- Sitecore topics are usually discussed through architecture, authoring, publishing, personalization, and production support trade-offs
- Interviewers want to know how Sitecore decisions affect editors, rendering hosts, environments, caching, and operational ownership
- Strong senior answers connect developer implementation with authoring trust, enterprise governance, and release safety`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Sitecore-oriented example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} only a Sitecore admin feature?`,
        answer: `No. ${spec.title} affects how engineers model content, shape rendering output, support authors, configure publishing, and keep delivery environments reliable in production.`,
      },
      {
        question: `What makes a weak answer for ${spec.title}?`,
        answer: `A weak answer describes the feature but ignores enterprise governance, authoring workflows, environment strategy, delivery contracts, and what actually breaks after launch.`,
      },
      {
        question: `How should senior engineers discuss ${spec.title}?`,
        answer: `Senior engineers should connect ${spec.title} to content architecture, headless delivery, authoring safety, operational support, and long-term platform maintainability.`,
      },
    ],
    productionIssues: [
      `${spec.title} is implemented without clear ownership, so editors, developers, and support teams make different assumptions about how it should behave.`,
      `A release changes ${spec.title.toLowerCase()} behavior in one environment but the rendering host, cache path, or publishing flow is not updated consistently.`,
      `Teams answer ${spec.title} at feature level only and miss the enterprise concerns around governance, scale, security, and supportability.`,
    ],
    bestPractices: [
      `Treat ${spec.title} as part of Sitecore platform architecture, not only as a CMS screen or isolated developer task.`,
      'Document the contract between content architecture, authoring behavior, rendering output, and release operations.',
      'Test changes across authoring, preview, publishing, and production delivery paths before treating the solution as complete.',
      'Use examples from real support and release workflows when explaining the topic in interviews.',
    ],
    architectNote: `In Sitecore, ${spec.title} should be evaluated through content governance, author confidence, headless delivery behavior, environment safety, and long-term upgrade or XM Cloud compatibility. The important question is not only "how do we configure it?" but "how does this decision stay reliable as more teams, sites, and channels depend on it?"`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Sitecore project?`,
        answer: `Explain ${spec.title} through the content tree, templates, renderings, authoring behavior, delivery pipeline, and the operational evidence that proves the implementation is working safely in production.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The common production concern is misalignment between Sitecore authoring or publishing behavior and rendering-host expectations, which leads to stale content, broken experiences, inconsistent personalization, or hard-to-debug release regressions.`,
      },
      ...(spec.faqs ?? []),
    ],
    keyTakeaways: [
      `${spec.title} is a platform decision, not just a CMS definition.`,
      'Strong Sitecore answers connect content architecture, authoring, rendering, and production operations together.',
      'Production readiness means thinking about publishing, caching, governance, and troubleshooting before incidents happen.',
      'Senior Sitecore engineers explain the trade-offs behind enterprise CMS and DXP decisions clearly.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const sitecoreTopicSpecs: SitecoreTopicSpec[] = [
  { slug: 'what-is-sitecore', title: 'What is Sitecore', description: 'Understand Sitecore as an enterprise CMS and digital experience platform used for large-scale content-driven delivery.', focus: 'Sitecore is an enterprise content platform that combines structured content management, experience delivery, personalization, and operational governance for large organizations. Depending on the product line, teams use Sitecore for traditional MVC delivery, headless implementations, and modern XM Cloud workflows.', why: 'Teams choose Sitecore when they need strong content governance, multi-site management, authoring control, personalization, enterprise integration, and a platform that can support both content and digital-experience use cases.', usage: 'In real programs, Sitecore powers marketing sites, global brand platforms, regional content hubs, customer portals, and headless frontends where content authors, developers, and platform teams all share ownership boundaries.', workflow: 'A team defines templates, structures items in the content tree, builds renderings or headless components, supports authoring through Experience Editor or Pages, and then controls publishing, delivery, and environment promotion for production releases.', exampleTitle: 'Enterprise Sitecore delivery model', exampleCode: `Authors manage content in Sitecore
  -> Templates and items define structure
  -> Renderings or headless components map content to UI
  -> Publishing pushes approved content to delivery
  -> Websites and apps consume the experience through MVC, Layout Service, GraphQL, or Experience Edge`, relatedTopics: ['sitecore-cms-vs-dxp', 'sitecore-content-tree', 'sitecore-xm-vs-xp-vs-xm-cloud'] },
  { slug: 'sitecore-cms-vs-dxp', title: 'Sitecore CMS vs DXP', description: 'Learn how Sitecore moves from CMS responsibilities into broader digital experience platform thinking.', focus: 'A CMS focuses on content creation, structure, governance, and publishing. A DXP expands the conversation to personalization, campaigns, analytics, customer context, and connected digital journeys. Sitecore often sits in both conversations depending on the product and implementation.', why: 'Developers and architects need this distinction because implementation scope, integration complexity, author expectations, and platform cost all change when the organization wants a DXP instead of only a CMS.', usage: 'A team may start with content delivery only, then later add personalization, analytics, experimentation, and external-martech integrations when the Sitecore platform grows into broader experience ownership.', workflow: 'Teams clarify whether the program needs content management only, full marketing-experience tooling, or a headless CMS strategy with selected DXP capabilities. That decision affects architecture, licensing, integrations, and operational support.', exampleTitle: 'CMS versus DXP decision lens', exampleCode: `CMS focus
- content structure
- authoring workflow
- publishing and delivery

DXP expansion
- personalization
- campaigns
- analytics and goals
- customer experience orchestration`, relatedTopics: ['what-is-sitecore', 'sitecore-xm-vs-xp-vs-xm-cloud', 'sitecore-personalization-basics'] },
  { slug: 'sitecore-xm-vs-xp-vs-xm-cloud', title: 'XM vs XP vs XM Cloud', description: 'Understand the major Sitecore product directions and what they mean for architecture and delivery.', focus: 'Sitecore XM focuses on content management and delivery. Sitecore XP adds broader marketing and experience capabilities. Sitecore XM Cloud emphasizes modern SaaS-oriented, headless-first content delivery with current Sitecore platform direction.', why: 'Teams need clarity here because product choice changes hosting assumptions, personalization options, upgrade paths, integration patterns, and what kind of developer and operational skills the project needs.', usage: 'In real architecture discussions, teams compare whether they need traditional XP capabilities, leaner content management, or XM Cloud direction aligned with headless and modern rendering hosts like Next.js.', workflow: 'Architects evaluate content scope, personalization needs, hosting model, release control, integration demands, and long-term roadmap before deciding which Sitecore product direction fits the business.', exampleTitle: 'Choosing the Sitecore product line', exampleCode: `XM
- content-focused delivery

XP
- content + marketing capabilities

XM Cloud
- SaaS-oriented authoring
- headless-first delivery
- modern rendering host alignment`, relatedTopics: ['sitecore-headless-services', 'sitecore-nextjs-rendering-host', 'sitecore-experience-edge'] },
  { slug: 'sitecore-content-tree', title: 'Content Tree', description: 'Learn how Sitecore organizes content, settings, templates, media, and platform items through the content tree.', focus: 'The content tree is the hierarchical structure where Sitecore stores content items, configuration-related content structures, and site organization data. Developers and authors both rely on this hierarchy to reason about ownership, inheritance, and site boundaries.', why: 'Without strong content-tree discipline, multi-site setups become hard to navigate, content ownership gets blurred, and developers struggle to support routing, data-source strategy, and governance cleanly.', usage: 'In enterprise solutions, the tree often reflects brand, locale, site, or business-area boundaries and influences author training, publishing scope, serialization, and deployment strategy.', workflow: 'Templates define the fields available to items. Authors create items in the appropriate branch of the content tree. Renderings and routes then resolve those items into final website or app output.', exampleTitle: 'Content tree structure', exampleCode: `sitecore
  /content
    /BrandA
      /Home
      /Products
    /BrandB
  /media library
  /layout
  /templates`, relatedTopics: ['sitecore-items-fields', 'sitecore-templates-standard-values', 'sitecore-environment-strategy'] },
  { slug: 'sitecore-items-fields', title: 'Items and Fields', description: 'Understand Sitecore items as content records and fields as the structured data behind rendering and authoring.', focus: 'In Sitecore, an item is a content object stored in the tree, and fields hold the data authors and developers care about, such as text, links, images, references, and metadata. Items and fields are the practical foundation of Sitecore development and authoring.', why: 'Developers need this clearly because rendering logic, serialization, publishing, search indexing, and authoring experience all depend on how items and fields are modeled and retrieved.', usage: 'A page item may reference data-source items, image fields, link fields, multilist relationships, and shared or versioned fields depending on the authoring and delivery requirements of the site.', workflow: 'Templates define which fields exist, authors populate the item, renderings read those fields through MVC models or headless APIs, and the publishing system controls when the item becomes available to delivery.', exampleTitle: 'Item and field model', exampleCode: `Item: /content/BrandA/Home/Hero Banner
Template: Hero Banner
Fields:
- Heading
- Summary
- CTA Link
- Background Image
- Variant`, relatedTopics: ['sitecore-template-design', 'sitecore-datasources', 'sitecore-versioning'] },
  { slug: 'sitecore-templates-standard-values', title: 'Templates and Standard Values', description: 'Learn how Sitecore templates and standard values shape consistent content architecture and author defaults.', focus: 'Templates define the schema and field structure for Sitecore items. Standard values provide shared defaults and inherited settings so authors start from reliable baseline behavior instead of empty or inconsistent records.', why: 'Good template design reduces author confusion, keeps data predictable for renderings, and lowers the support burden created by inconsistent field population and one-off modeling decisions.', usage: 'Teams use templates and standard values for pages, data-source items, metadata blocks, navigation structures, and reusable components so delivery remains stable across many authors and sites.', workflow: 'Developers create templates, structure base templates where reuse makes sense, define standard values for defaults or presentation settings, and then train authors to create items from those controlled contracts.', exampleTitle: 'Template with standard values', exampleCode: `Template: Article Page
Base templates: SEO Base, Hero Base
Fields: Title, Summary, Body, Hero Image

Standard values
- Default hero variant
- Metadata fallback values
- Initial workflow state`, relatedTopics: ['sitecore-template-design', 'sitecore-versioning', 'sitecore-components'] },
  { slug: 'sitecore-template-design', title: 'Template Design', description: 'Understand how to design Sitecore templates that stay reusable, governed, and safe for delivery teams.', focus: 'Template design is the discipline of deciding which Sitecore item schemas, base templates, fields, and inheritance rules should exist. Strong template design supports maintainable content architecture and predictable rendering behavior across multiple sites and teams.', why: 'Weak template design creates fragile renderings, field duplication, confusing author experiences, and difficult upgrade or serialization paths later in the program.', usage: 'Architects usually model reusable business entities and component-supporting data structures instead of building page-specific templates for every single request from a content team.', workflow: 'Teams gather real authoring scenarios, define reusable entities, introduce base templates where useful, validate the structure with authors and rendering developers, and then review changes like architecture decisions.', exampleTitle: 'Reusable template strategy', exampleCode: `Base templates
- SEO Base
- Tracking Base

Feature templates
- Hero Banner
- Promo Card
- Location Teaser

Page templates
- Article Page
- Landing Page`, relatedTopics: ['sitecore-templates-standard-values', 'sitecore-datasources', 'sitecore-helix-principles'] },
  { slug: 'sitecore-datasources', title: 'Datasources', description: 'Learn how Sitecore datasources help components stay reusable and author-friendly.', focus: 'A datasource is the content item a rendering uses for its data instead of reading only from the page item itself. Datasources let teams reuse components, keep page templates lighter, and allow authors to manage content in modular ways.', why: 'Datasources matter because they directly affect authoring flexibility, rendering predictability, and how reusable your component architecture becomes across pages and sites.', usage: 'A hero, promo grid, FAQ block, or CTA component often points to a datasource item that can live under the page or in a shared data folder depending on reuse needs.', workflow: 'Developers configure which datasource templates are valid for a rendering, authors create or select the datasource item, and the component then reads the item fields during rendering or through headless delivery.', exampleTitle: 'Datasource-driven component', exampleCode: `Page item
  -> Rendering: Promo Grid
  -> Datasource: /content/BrandA/Data/Promos/Summer Launch

Rendering host
  -> reads datasource fields
  -> maps items to UI cards`, relatedTopics: ['sitecore-renderings', 'sitecore-components', 'sitecore-experience-editor'] },
  { slug: 'sitecore-renderings', title: 'Renderings', description: 'Understand Sitecore renderings as the link between content items and UI output.', focus: 'Renderings define how Sitecore content is turned into presentation. In traditional implementations they may map to MVC views or controller renderings; in headless implementations they influence what the rendering host receives and how components are resolved.', why: 'Renderings are central because they connect content architecture, author placement, layout rules, datasource behavior, and actual user-facing output across the platform.', usage: 'A Sitecore page may contain renderings for hero banners, product highlights, breadcrumbs, promo slots, navigation, and data-driven feature blocks, each with datasource and placeholder rules.', workflow: 'A rendering is configured in Sitecore, associated with placeholders and datasource rules, added to a page layout by authors or templates, and then resolved by the delivery engine or headless renderer.', exampleTitle: 'Rendering resolution flow', exampleCode: `Layout definition
  -> Placeholder: main
  -> Rendering: Hero Banner
  -> Datasource: /Data/Heroes/Spring Launch

Delivery layer
  -> resolves rendering
  -> fetches item fields
  -> outputs final component`, relatedTopics: ['sitecore-layouts', 'sitecore-placeholders', 'sitecore-layout-service'] },
  { slug: 'sitecore-layouts', title: 'Layouts', description: 'Learn how Sitecore layouts organize page structure and rendering composition.', focus: 'Layouts define the structural shell of a Sitecore page and the placeholder model within which renderings can be placed. They are one of the core concepts behind reusable page composition in Sitecore.', why: 'Teams need layout discipline so authors can compose pages safely without every template becoming a one-off implementation and without developers hardcoding page structure everywhere.', usage: 'A site may use shared layout shells for marketing pages, article pages, landing pages, or product experiences while still allowing component variation inside placeholders.', workflow: 'Developers define layout files or headless shell equivalents, Sitecore stores the presentation details, placeholders control where components can go, and authors or template rules decide the final composition.', exampleTitle: 'Layout composition pattern', exampleCode: `Layout: Marketing Shell
- Placeholder: header
- Placeholder: hero
- Placeholder: main
- Placeholder: sidebar
- Placeholder: footer`, relatedTopics: ['sitecore-renderings', 'sitecore-placeholders', 'sitecore-experience-editor'] },
  { slug: 'sitecore-placeholders', title: 'Placeholders', description: 'Understand placeholders as the regions that control where Sitecore components can be added.', focus: 'Placeholders are named slots within Sitecore layouts or components where renderings can be inserted. They are essential to flexible page composition and author control.', why: 'Without good placeholder strategy, authoring becomes confusing, component placement becomes unsafe, and developers lose control over which renderings belong in which part of the experience.', usage: 'Global shells often expose main placeholders like header, main, sidebar, and footer, while components may contain nested placeholders for more complex experiences.', workflow: 'Developers define placeholder keys, associate allowed renderings and presentation rules, and then authors place components into those regions through Experience Editor or Pages.', exampleTitle: 'Placeholder governance', exampleCode: `Allowed renderings
main -> Hero, Rich Text, Promo Grid, FAQ
sidebar -> Related Links, CTA Card
footer -> Footer Navigation, Legal Links`, relatedTopics: ['sitecore-renderings', 'sitecore-layouts', 'sitecore-pages'] },
  { slug: 'sitecore-components', title: 'Components', description: 'Learn how Sitecore components are built, authored, and governed across enterprise platforms.', focus: 'A Sitecore component is the practical unit of reusable experience delivery. It usually combines a rendering, datasource expectations, placeholder behavior, and frontend output rules so the same business capability can be reused across pages and sites.', why: 'Component quality influences author trust, frontend maintainability, platform reuse, and how easily the team can move into headless delivery or XM Cloud patterns later.', usage: 'Teams build components such as hero banners, teaser cards, accordions, carousels, promos, FAQ blocks, and navigation units that authors can place and configure repeatedly.', workflow: 'Developers define the rendering contract, template expectations, datasource rules, and frontend behavior. Authors then compose those components into pages while support teams monitor how the pattern behaves in production.', exampleTitle: 'Reusable Sitecore component contract', exampleCode: `Component: FAQ Accordion
Rendering: FAQ Accordion
Datasource template: FAQ Group
Allowed placeholder: main
Author inputs: title, intro, items
Rendering host: maps FAQ items to accordion UI`, relatedTopics: ['sitecore-datasources', 'sitecore-renderings', 'sitecore-helix-principles'] },
  { slug: 'sitecore-mvc-basics', title: 'Sitecore MVC Basics', description: 'Understand how traditional Sitecore MVC implementations resolve content and rendering output.', focus: 'Sitecore MVC uses Sitecore routing, renderings, controllers or views, and content items to produce the final web page. Even in headless-first eras, understanding the MVC model helps developers reason about Sitecore inheritance, presentation details, and platform history.', why: 'Many enterprise teams still support MVC codebases or hybrid implementations, and even headless teams benefit from understanding how Sitecore traditionally resolved items, layouts, and component rendering.', usage: 'A Sitecore MVC site may use controller renderings, models, view renderings, and layout files tied directly to the Sitecore page request lifecycle.', workflow: 'A request resolves to a Sitecore item, Sitecore determines the layout and renderings, MVC components read the relevant item or datasource fields, and the final HTML is assembled on the server.', exampleTitle: 'Sitecore MVC request flow', exampleCode: `Incoming request
  -> Sitecore item resolved
  -> Layout selected
  -> Renderings executed
  -> Datasources loaded
  -> HTML response assembled`, relatedTopics: ['sitecore-renderings', 'sitecore-layouts', 'sitecore-headless-services'] },
  { slug: 'sitecore-helix-principles', title: 'Helix Principles', description: 'Learn how Helix organizes Sitecore solutions around modules, dependencies, and maintainability.', focus: 'Helix is a set of architectural principles for structuring Sitecore solutions into modular layers and features. It promotes clear dependency rules, separation of concerns, and better long-term maintainability across complex enterprise programs.', why: 'Helix matters because large Sitecore solutions become unmanageable quickly when every feature depends on everything else and platform, project, and feature concerns are mixed together.', usage: 'Teams structure solutions into foundation, feature, and project layers so content architecture, renderings, integrations, and site-specific behavior stay easier to reason about and support.', workflow: 'Architects define module boundaries, developers place code and templates into the right layer, reviews enforce dependency rules, and features are composed into site-level implementations with better ownership clarity.', exampleTitle: 'Helix layering model', exampleCode: `Foundation
- shared infrastructure

Feature
- components and business capabilities

Project
- site-specific implementation

Rule
- project depends on feature
- feature depends on foundation`, relatedTopics: ['sitecore-components', 'sitecore-template-design', 'sitecore-content-serialization'] },
  { slug: 'sitecore-jss', title: 'Sitecore JSS', description: 'Understand Sitecore JSS as the bridge between Sitecore content and modern JavaScript rendering hosts.', focus: 'Sitecore JSS enables developers to build Sitecore-powered experiences using JavaScript frameworks such as React and Next.js while still letting Sitecore control content structure, layout composition, and authoring workflows.', why: 'JSS matters because many modern teams want the authoring and governance strength of Sitecore with the frontend flexibility and deployment style of current JavaScript ecosystems.', usage: 'Teams use JSS to power headless marketing sites, multi-brand platforms, or composable frontends where Sitecore controls content and layout data while React or Next.js handles rendering.', workflow: 'Sitecore stores the page structure and content contracts. JSS-aware rendering hosts receive layout data, resolve Sitecore component names to frontend components, and render the experience accordingly.', exampleTitle: 'JSS component mapping', exampleCode: `Sitecore layout data
  -> componentName: HeroBanner
  -> fields: heading, cta, image

Next.js rendering host
  -> resolve HeroBanner component
  -> map fields to React props
  -> render final UI`, relatedTopics: ['sitecore-headless-services', 'sitecore-layout-service', 'sitecore-nextjs-rendering-host'] },
  { slug: 'sitecore-headless-services', title: 'Headless Services', description: 'Learn how Sitecore headless services expose content and layout data to external rendering hosts.', focus: 'Sitecore Headless Services provide APIs and layout-oriented delivery capabilities so frontend applications can render Sitecore-managed experiences outside the classic MVC model.', why: 'Teams need headless services when they want decoupled rendering, modern frontend tooling, multi-channel delivery, or XM Cloud-aligned platform patterns without losing Sitecore authoring and page-composition strengths.', usage: 'Real projects use headless services for Next.js sites, React-based rendering hosts, composable experience architectures, and external channels that still rely on Sitecore content and layout metadata.', workflow: 'Sitecore manages templates, items, layout, and authoring. Headless services expose the relevant data contract. The rendering host then maps that data to frontend components and handles runtime delivery concerns.', exampleTitle: 'Headless delivery contract', exampleCode: `Sitecore authoring
  -> items, templates, renderings

Headless services
  -> layout and content API

Rendering host
  -> React / Next.js app
  -> component resolution and page output`, relatedTopics: ['sitecore-jss', 'sitecore-layout-service', 'sitecore-experience-edge'] },
  { slug: 'sitecore-layout-service', title: 'Layout Service', description: 'Understand the Sitecore Layout Service contract and why it is central to headless rendering.', focus: 'The Layout Service returns the route structure, renderings, placeholders, and content fields that a Sitecore headless frontend needs in order to build the page. It is one of the most important runtime contracts in Sitecore headless development.', why: 'When Layout Service assumptions break, the rendering host shows missing components, wrong data, broken placeholders, or author distrust in preview and production output.', usage: 'Teams use Layout Service responses in server-side rendering, static generation, preview flows, and route-driven page composition in Sitecore JSS or Next.js implementations.', workflow: 'A request identifies the Sitecore route and context, Sitecore assembles the layout data, the rendering host consumes the JSON response, and component resolvers map the Sitecore structure into actual UI components.', exampleTitle: 'Layout Service response idea', exampleCode: `route
  -> placeholders
  -> renderings
  -> component data
  -> route fields

frontend
  -> resolve placeholders
  -> map components
  -> render page`, relatedTopics: ['sitecore-jss', 'sitecore-nextjs-rendering-host', 'sitecore-content-delivery'] },
  { slug: 'sitecore-nextjs-rendering-host', title: 'Next.js Rendering Host', description: 'Learn how Next.js acts as the rendering host for modern Sitecore headless and XM Cloud implementations.', focus: 'In modern Sitecore headless solutions, Next.js often receives Sitecore layout and content data, resolves Sitecore components to React components, and handles SSR, SSG, ISR, caching, and frontend deployment behavior.', why: 'The rendering host is where many production issues appear: stale content, broken previews, route mismatches, environment confusion, and cache behavior that authors perceive as Sitecore problems.', usage: 'Teams use a Next.js rendering host for XM Cloud sites, composable frontends, and enterprise marketing platforms that want modern frontend developer experience with Sitecore-managed content and layouts.', workflow: 'The rendering host receives route and layout data, maps Sitecore component names to Next.js components, applies server or static rendering strategy, and then controls frontend deployment and revalidation behavior.', exampleTitle: 'Next.js rendering-host flow', exampleCode: `Sitecore route
  -> Layout Service / Edge data
  -> Next.js page request
  -> component factory resolves renderings
  -> SSR / SSG / ISR output
  -> CDN and browser delivery`, relatedTopics: ['sitecore-jss', 'sitecore-layout-service', 'sitecore-experience-edge'] },
  { slug: 'sitecore-experience-editor', title: 'Experience Editor', description: 'Understand how authors use Experience Editor and why developer choices directly affect author trust.', focus: 'Experience Editor is the visual authoring experience where content editors interact with pages in context, place components, edit fields, and review page composition. Developer decisions around renderings, placeholders, datasource strategy, and editability strongly influence whether Experience Editor feels reliable.', why: 'A technically correct implementation can still fail the business if Experience Editor becomes slow, confusing, or fragile for content teams.', usage: 'Authors use Experience Editor to update homepage hero banners, add new promo blocks, adjust page composition, manage CTAs, and review how structured content appears in context before publishing.', workflow: 'Renderings expose editable fields, datasource rules and placeholders determine what authors can add, and Sitecore injects the authoring capabilities into the editing experience while still respecting page structure and permissions.', exampleTitle: 'Authoring in Experience Editor', exampleCode: `Author opens page
  -> sees existing components in context
  -> edits fields inline or through dialogs
  -> adds allowed renderings to placeholders
  -> previews the final page before publishing`, relatedTopics: ['sitecore-pages', 'sitecore-workflows', 'sitecore-components'] },
  { slug: 'sitecore-pages', title: 'Pages', description: 'Learn how Sitecore Pages fits into modern authoring experiences, especially XM Cloud-oriented workflows.', focus: 'Sitecore Pages is part of the modern authoring direction for Sitecore, especially in XM Cloud and headless-friendly experiences. It focuses on page editing, composition, and authoring flow in a more current delivery model than traditional MVC-only experiences.', why: 'Teams need to understand Pages because it changes how content authors expect preview, component placement, and modern headless authoring to behave.', usage: 'In XM Cloud-style implementations, authors use Pages to manage route-level composition, preview content, and work with components that are ultimately rendered by a headless frontend.', workflow: 'Pages reads the underlying Sitecore content and layout structure, provides authoring controls for route composition, and relies on the rendering-host contract remaining stable and preview-aware.', exampleTitle: 'Pages authoring flow', exampleCode: `Author opens Pages
  -> selects route
  -> edits content and placement
  -> preview reflects rendering-host output
  -> publishing sends approved changes forward`, relatedTopics: ['sitecore-nextjs-rendering-host', 'sitecore-publishing', 'sitecore-experience-editor'] },
  { slug: 'sitecore-workflows', title: 'Workflows', description: 'Understand how Sitecore workflows control review, approval, and publishing readiness.', focus: 'Sitecore workflows define the stages content moves through before it becomes eligible for publishing. They help organizations enforce review, governance, and release discipline for high-impact content changes.', why: 'Workflows matter because large enterprise teams cannot rely on informal trust alone when multiple authors, reviewers, and regions are updating critical customer-facing experiences.', usage: 'Programs use workflows for homepage content, legal updates, product launches, campaign pages, and regulated content where approval state must be explicit and auditable.', workflow: 'A content item moves through defined states such as draft, review, approved, and publish-ready. Permissions and actions control who can transition the item and when it can move forward.', exampleTitle: 'Workflow state model', exampleCode: `Draft
  -> Review
  -> Approved
  -> Publish Ready

Role-based transitions
- author
- reviewer
- publisher`, relatedTopics: ['sitecore-publishing', 'sitecore-versioning', 'sitecore-security-roles'] },
  { slug: 'sitecore-versioning', title: 'Versioning', description: 'Learn how Sitecore versioning affects content history, locales, and publishing behavior.', focus: 'Versioning in Sitecore allows items to have multiple language versions and multiple numbered versions over time. This is powerful, but it also introduces complexity around which version authors are editing and which version delivery environments receive.', why: 'Versioning affects authoring clarity, localization, publishing risk, and troubleshooting when the content visible in authoring does not match what users see in production.', usage: 'Authors may create new versions for product launches, localized updates, seasonal changes, or staged editorial reviews without changing the currently live version until publish time.', workflow: 'Sitecore stores versions per item and language. Authors edit the correct version, workflows may apply to that version, and publishing then determines which version becomes available to the delivery role or headless channel.', exampleTitle: 'Versioning example', exampleCode: `Item: Homepage Hero
Language: en
Version 1 -> live
Version 2 -> under review

Language: fr
Version 1 -> translated
Version 2 -> pending approval`, relatedTopics: ['sitecore-workflows', 'sitecore-publishing', 'sitecore-content-delivery'] },
  { slug: 'sitecore-publishing', title: 'Publishing', description: 'Understand Sitecore publishing as the controlled path from authoring to delivery.', focus: 'Publishing is the mechanism that moves approved content from authoring-oriented Sitecore environments into delivery-ready environments or delivery channels. In Sitecore, this is one of the most business-critical workflows because it determines when users actually see content changes.', why: 'Publishing is where many enterprise incidents happen: content appears in authoring but not on the live site, dependencies are unpublished, the wrong target receives content, or release timing becomes unclear.', usage: 'Teams use Sitecore publishing for scheduled releases, urgent homepage fixes, multi-language content launches, and structured delivery windows tied to campaign or compliance deadlines.', workflow: 'Authors complete and approve content, publishing targets and restrictions are evaluated, dependent items may be included, and then the content becomes available to delivery roles or headless channels based on platform setup.', exampleTitle: 'Publishing flow', exampleCode: `Author edits item
  -> workflow approval completed
  -> publish action triggered
  -> target environment updated
  -> delivery cache or frontend path refreshed`, relatedTopics: ['sitecore-workflows', 'sitecore-content-delivery', 'sitecore-troubleshooting'] },
  { slug: 'sitecore-media-library', title: 'Media Library', description: 'Learn how Sitecore manages media assets and why that matters for performance, governance, and rendering.', focus: 'The media library stores and organizes images, documents, and other reusable assets inside Sitecore. It supports authoring workflows, references from content items, and delivery of the assets to users or rendering hosts.', why: 'Media handling matters because large asset libraries become governance, performance, and publishing problems quickly when naming, foldering, metadata, or usage rules are inconsistent.', usage: 'Authors upload campaign images, PDFs, icons, downloads, and product media that are then referenced by page items or component datasource items across multiple sites and locales.', workflow: 'Assets are uploaded into the media library, metadata and organization rules are applied, content items reference the assets, and publishing makes the assets available to the relevant delivery channel.', exampleTitle: 'Media-library usage', exampleCode: `Media Library
  /BrandA/Campaigns/Summer
    hero-banner.jpg
    promo-card.jpg

Content item
  -> references media fields
  -> rendering host outputs optimized asset usage`, relatedTopics: ['sitecore-items-fields', 'sitecore-publishing', 'sitecore-performance'] },
  { slug: 'sitecore-personalization-basics', title: 'Personalization Basics', description: 'Understand how Sitecore personalization changes content or components for different visitor contexts.', focus: 'Personalization in Sitecore means changing content or presentation based on rules, visitor context, goals, profiles, or other experience signals. It is one of the reasons organizations adopt Sitecore as a broader experience platform.', why: 'Developers need to understand personalization because it affects rendering behavior, author trust, testing, analytics, and what "correct output" means in production for different users.', usage: 'Marketing teams personalize hero banners, promotions, CTAs, content order, or landing-page experiences based on audience segments, campaign conditions, goals, or behavior signals.', workflow: 'Rules determine when a personalization branch should apply, Sitecore evaluates the visitor context, and the selected content or rendering variation is delivered to that user experience.', exampleTitle: 'Personalized CTA example', exampleCode: `If visitor segment = returning customer
  -> show loyalty CTA
Else
  -> show first-time visitor CTA`, relatedTopics: ['sitecore-rules-engine', 'sitecore-profiles-goals', 'sitecore-analytics-concepts'] },
  { slug: 'sitecore-rules-engine', title: 'Rules Engine', description: 'Learn how Sitecore rules power personalization and conditional behavior.', focus: 'The Sitecore rules engine evaluates conditions and actions that drive personalization and other conditional platform behaviors. It gives marketers and platform teams a structured way to change experiences based on context.', why: 'Rules matter because they can become powerful or dangerous quickly: they influence content output, author expectations, testing complexity, and operational troubleshooting.', usage: 'Teams use rules for personalization, audience-specific banners, campaign experiences, route variations, and certain conditional authoring or platform behaviors.', workflow: 'A rule definition checks context such as profile data, goals, or campaign parameters. If the condition matches, Sitecore applies the associated rendering or content decision.', exampleTitle: 'Rules evaluation pattern', exampleCode: `Condition
- campaign source = email

Action
- show campaign hero variant

Else
- show default hero`, relatedTopics: ['sitecore-personalization-basics', 'sitecore-campaigns', 'sitecore-troubleshooting'] },
  { slug: 'sitecore-profiles-goals', title: 'Profiles and Goals', description: 'Understand how Sitecore profiles and goals support marketing and experience measurement concepts.', focus: 'Profiles and goals are part of Sitecore’s marketing and experience measurement model. They help teams categorize visitor behavior, define signals of engagement, and support more targeted experiences or reporting.', why: 'Even when developers are not creating marketing strategies themselves, they need to understand how profiles and goals affect personalization, tracking, and business expectations around the platform.', usage: 'A program may define goals such as brochure download or form completion and then use profile or engagement data to tailor messaging or analyze campaign quality.', workflow: 'Profiles and goals are configured, user actions or attributes map into those concepts, and Sitecore then uses the data for personalization or measurement decisions depending on the product setup.', exampleTitle: 'Goal tracking example', exampleCode: `Goal: Whitepaper Download
Trigger: user completes download action

Profile influence
- enterprise buyer
- partner segment

Result
- analytics and personalization signals updated`, relatedTopics: ['sitecore-personalization-basics', 'sitecore-analytics-concepts', 'sitecore-campaigns'] },
  { slug: 'sitecore-campaigns', title: 'Campaigns', description: 'Learn how Sitecore supports campaign-oriented content and experience delivery.', focus: 'Campaigns in Sitecore connect marketing activity, content delivery, personalization, and tracking around specific business objectives such as launches, promotions, or acquisition programs.', why: 'Campaign-driven programs create timing pressure, cross-team coordination needs, and publishing risks that often surface during architecture and support discussions.', usage: 'A launch campaign may require coordinated landing pages, segment-based banners, analytics signals, approval workflow, scheduled publishing, and rollback planning across multiple locales or brands.', workflow: 'Marketing defines the campaign, content and experience variations are prepared, personalization or rules may apply, publishing and environment readiness are checked, and the campaign is launched with monitoring in place.', exampleTitle: 'Campaign release workflow', exampleCode: `Campaign content prepared
  -> workflow approvals complete
  -> personalization rules checked
  -> scheduled publishing window confirmed
  -> monitoring enabled for launch`, relatedTopics: ['sitecore-publishing', 'sitecore-rules-engine', 'sitecore-analytics-concepts'] },
  { slug: 'sitecore-analytics-concepts', title: 'Analytics Concepts', description: 'Understand the basic analytics thinking that influences Sitecore experience decisions.', focus: 'Analytics concepts in Sitecore relate to understanding visitor interactions, campaign performance, goals, and signals that shape personalization or experience reporting. The exact implementation details vary by product setup and platform direction, but the architectural impact remains important.', why: 'Developers and architects need enough analytics awareness to understand how tracking decisions affect performance, personalization trust, compliance, and debugging conversations.', usage: 'Programs use analytics-related concepts to review which journeys, campaigns, content blocks, or segments are performing and to explain why certain experiences should be personalized or simplified.', workflow: 'Tracking signals are captured from relevant actions or contexts, associated with experience logic or reporting, and then used by business and platform teams to evaluate delivery quality or personalization value.', exampleTitle: 'Analytics signal path', exampleCode: `Visitor action
  -> tracking signal recorded
  -> goal / profile context updated
  -> reporting and optimization teams review impact`, relatedTopics: ['sitecore-personalization-basics', 'sitecore-profiles-goals', 'sitecore-performance'] },
  { slug: 'sitecore-graphql', title: 'GraphQL', description: 'Learn how GraphQL is used in Sitecore headless and XM Cloud-friendly implementations.', focus: 'GraphQL in Sitecore gives frontend or external consumers a more precise way to request content and sometimes layout-related data depending on the implementation path. It is especially relevant in headless and composable architectures.', why: 'GraphQL matters because it affects query contracts, performance, frontend maintainability, schema governance, and how teams think about Sitecore content consumption outside classic MVC.', usage: 'Teams may use GraphQL for content-driven React or Next.js pages, search-related experiences, composable content queries, or supporting frontend features that do not want broad overfetching.', workflow: 'Sitecore exposes a schema, the client requests specific fields and references, and the consuming app maps the response into components or features while respecting caching and environment behavior.', exampleTitle: 'GraphQL content query', exampleCode: `query ArticlePage($path: String!) {
  item(path: $path) {
    title
    body
    heroImage {
      url
    }
  }
}`, relatedTopics: ['sitecore-headless-services', 'sitecore-experience-edge', 'sitecore-search-integration'] },
  { slug: 'sitecore-experience-edge', title: 'Experience Edge', description: 'Understand Experience Edge as a delivery option for headless Sitecore content at scale.', focus: 'Experience Edge is part of Sitecore’s headless delivery direction, providing scalable content distribution for modern frontends and edge-oriented delivery patterns. It changes how teams think about publishing, content freshness, and frontend integration.', why: 'Teams must understand Experience Edge because it affects caching assumptions, publish visibility, preview expectations, and how modern rendering hosts receive Sitecore-managed content.', usage: 'XM Cloud and modern headless teams use Experience Edge to deliver content to Next.js frontends, static builds, and edge-friendly runtime setups where performance and scalability are important.', workflow: 'Approved content is published into the relevant delivery channel, Experience Edge exposes the content for frontend use, and the rendering host controls how and when the data is incorporated into the final user experience.', exampleTitle: 'Experience Edge delivery flow', exampleCode: `Author publishes content
  -> delivery channel updated
  -> Experience Edge exposes the content
  -> Next.js app fetches and renders updated experience`, relatedTopics: ['sitecore-nextjs-rendering-host', 'sitecore-publishing', 'sitecore-content-delivery'] },
  { slug: 'sitecore-content-delivery', title: 'Content Delivery', description: 'Learn how Sitecore content actually reaches the live website or application experience.', focus: 'Content delivery in Sitecore is the combination of publishing, delivery roles or channels, APIs, rendering hosts, and caching behavior that determines what end users see. It is a broader operational concept than just one endpoint or one environment.', why: 'Many production problems that users perceive as “Sitecore is broken” are really content-delivery-path issues involving publishing state, route resolution, rendering hosts, or stale caches.', usage: 'Teams reason about content delivery when debugging missing updates, wrong locale output, broken personalization, failed launches, or headless route mismatches in production.', workflow: 'Content is authored and approved, published into the relevant delivery target, fetched by the rendering system or site, cached through one or more layers, and then served to the user experience.', exampleTitle: 'Content-delivery chain', exampleCode: `Authoring
  -> Publishing
  -> Delivery role / Edge / API
  -> Rendering host or Sitecore MVC
  -> CDN / browser
  -> End user`, relatedTopics: ['sitecore-publishing', 'sitecore-caching', 'sitecore-troubleshooting'] },
  { slug: 'sitecore-search-integration', title: 'Search Integration', description: 'Understand how Sitecore content integrates with enterprise search experiences and indexing strategies.', focus: 'Search integration means deciding how Sitecore content is indexed, queried, refreshed, filtered, and exposed through onsite search or external search platforms. It sits at the boundary between content architecture and user discovery experiences.', why: 'Search becomes a platform concern quickly when content models are inconsistent, publishing is delayed, or indexing rules do not align with business expectations.', usage: 'Programs integrate Sitecore content with search systems for site search, content hubs, federated results, product discovery, and campaign landing-page findability.', workflow: 'Relevant content is modeled cleanly, published or synchronized into the indexing path, search mappings and facets are defined, and then the frontend consumes the search results with clear refresh expectations.', exampleTitle: 'Search indexing path', exampleCode: `Sitecore content
  -> publish / sync event
  -> search index update
  -> frontend search query
  -> faceted result experience`, relatedTopics: ['sitecore-graphql', 'sitecore-external-system-integration', 'sitecore-content-delivery'] },
  { slug: 'sitecore-external-system-integration', title: 'External System Integration', description: 'Learn how Sitecore commonly integrates with CRMs, commerce, martech, search, and enterprise services.', focus: 'Sitecore rarely exists alone in enterprise programs. External integration covers the patterns used to connect Sitecore with CRMs, product systems, search services, identity platforms, analytics tools, or campaign systems.', why: 'Integration decisions affect reliability, content ownership, publishing timing, support boundaries, and how much logic should live in Sitecore versus surrounding systems.', usage: 'A platform may pull product data from an external system, send leads to a CRM, surface search results from another service, and still rely on Sitecore for experience composition and governance.', workflow: 'Architects decide system ownership, synchronization direction, API contracts, failure handling, and operational visibility so the integrated experience remains supportable after launch.', exampleTitle: 'Integration-boundary example', exampleCode: `CRM
  <-> lead capture integration

Commerce / product system
  <-> product data or references

Search platform
  <-> indexed Sitecore content

Sitecore
  -> governs authored experience output`, relatedTopics: ['sitecore-content-delivery', 'sitecore-search-integration', 'sitecore-environment-strategy'] },
  { slug: 'sitecore-cli', title: 'Sitecore CLI', description: 'Understand how Sitecore CLI supports modern developer workflows, automation, and operational consistency.', focus: 'Sitecore CLI helps developers interact with Sitecore environments, serialization, and automation tasks through a command-line workflow rather than manual platform-only steps. It is a practical part of modern Sitecore engineering workflows.', why: 'CLI usage matters because teams need repeatable environment setup, serialization, automation, and deployment steps that are less error-prone than manual admin actions.', usage: 'Developers use the CLI for authentication, content serialization workflows, environment operations, and supporting local or CI/CD automation around modern Sitecore projects.', workflow: 'The developer authenticates to the environment, runs the relevant CLI command for serialization or environment interaction, and uses the result as part of local development or pipeline automation.', exampleTitle: 'CLI workflow idea', exampleCode: `Developer authenticates
  -> runs Sitecore CLI command
  -> synchronizes or validates relevant Sitecore artifacts
  -> CI/CD pipeline uses the same repeatable workflow`, relatedTopics: ['sitecore-content-serialization', 'sitecore-deployment-flow', 'sitecore-environment-strategy'] },
  { slug: 'sitecore-content-serialization', title: 'Content Serialization', description: 'Learn how Sitecore content serialization supports version control, deployment discipline, and team collaboration.', focus: 'Content serialization is the process of representing Sitecore items in a source-controlled format so teams can review, version, and deploy relevant Sitecore artifacts through engineering workflows instead of relying only on manual environment changes.', why: 'Serialization matters because template and configuration-related items are part of the delivery system. Without source control and repeatable promotion, environments drift and release safety falls apart.', usage: 'Teams serialize templates, renderings, settings, and other Sitecore artifacts so they can be reviewed in pull requests and promoted across environments consistently.', workflow: 'Developers serialize the relevant items, store them in version control, review the changes like code, and deploy them through the same CI/CD discipline used for application changes.', exampleTitle: 'Serialization release pattern', exampleCode: `Sitecore artifact changed
  -> serialize to source control
  -> code review
  -> CI/CD deploys serialized changes
  -> target environment validates result`, relatedTopics: ['sitecore-cli', 'sitecore-helix-principles', 'sitecore-deployment-flow'] },
  { slug: 'sitecore-environment-strategy', title: 'Environment Strategy', description: 'Understand how Sitecore environments should be structured for safe authoring, testing, and release promotion.', focus: 'Environment strategy defines how local, integration, QA, staging, authoring, production, and sometimes preview or regional environments should interact in a Sitecore program. It is one of the biggest determinants of delivery safety.', why: 'Poor environment strategy leads to publishing confusion, broken previews, uncontrolled configuration drift, and incident-prone releases.', usage: 'Teams use distinct environments to validate templates, serialization changes, rendering-host deployments, personalization rules, and publishing behavior before production impact occurs.', workflow: 'Architects define the environment roles, developers and content teams understand which actions happen where, and CI/CD plus publishing workflows reinforce those boundaries consistently.', exampleTitle: 'Sitecore environment model', exampleCode: `Local
  -> Integration
  -> QA
  -> Staging
  -> Production

Each environment
- clear owner
- defined publishing and deployment rules
- known preview behavior`, relatedTopics: ['sitecore-deployment-flow', 'sitecore-publishing', 'sitecore-troubleshooting'] },
  { slug: 'sitecore-deployment-flow', title: 'Deployment Flow', description: 'Learn how code, serialized Sitecore artifacts, and content releases should move safely through environments.', focus: 'Deployment flow in Sitecore is not only about frontend or backend code. It also includes serialized artifacts, environment configuration, rendering-host releases, and the timing relationship between engineering deployment and content publishing.', why: 'If deployment flow is unclear, teams ship mismatched schemas, break authoring, release the rendering host before the content contract is ready, or create publishing incidents during launch windows.', usage: 'Mature teams define release checklists for Sitecore item changes, rendering-host changes, environment variables, cache behaviors, and rollback paths for both code and content.', workflow: 'Changes are developed and reviewed, moved through lower environments, validated with authoring and preview where needed, deployed with explicit sequence control, and followed by route-level verification in the target environment.', exampleTitle: 'Deployment-sequencing example', exampleCode: `1. Deploy serialized artifacts or platform settings
2. Deploy rendering host changes
3. Validate preview and route behavior
4. Publish coordinated content
5. Verify production output and cache freshness`, relatedTopics: ['sitecore-content-serialization', 'sitecore-environment-strategy', 'sitecore-caching'] },
  { slug: 'sitecore-caching', title: 'Caching', description: 'Understand how Sitecore caching affects performance, publish visibility, and production troubleshooting.', focus: 'Caching in Sitecore can exist across platform, rendering, CDN, and browser layers. It improves performance, but it also introduces the most common source of “content is published but users still see the old page” incidents.', why: 'Engineers need a clear cache model so they can explain freshness, isolate stale content, and design revalidation or invalidation behavior that authors can trust.', usage: 'Teams discuss Sitecore caching when launches show stale pages, when personalization seems inconsistent, or when headless rendering hosts and CDNs do not reflect publishing changes quickly enough.', workflow: 'Content is published, delivery layers update, caches either retain or invalidate previous output, and the support team verifies which layer still serves old data before attempting fixes.', exampleTitle: 'Cache-boundary checklist', exampleCode: `Check publishing state
  -> check Sitecore delivery path
  -> check rendering-host cache
  -> check CDN
  -> check browser cache
  -> identify the stale layer before changing content`, relatedTopics: ['sitecore-content-delivery', 'sitecore-performance', 'sitecore-troubleshooting'] },
  { slug: 'sitecore-performance', title: 'Performance', description: 'Learn how Sitecore performance work spans authoring, delivery, rendering, integrations, and cache behavior.', focus: 'Performance in Sitecore is a cross-layer concern that includes content architecture, queries, renderings, caching, personalization, rendering-host efficiency, and asset delivery. It is not only one code-level optimization conversation.', why: 'Teams often misdiagnose performance by looking only at frontend rendering or only at Sitecore itself, while the true issue sits at the boundary between content architecture, integrations, and delivery behavior.', usage: 'Performance work includes optimizing heavy renderings, improving page composition, reducing overfetching, validating rendering-host strategies, tuning media usage, and clarifying publish-to-live freshness expectations.', workflow: 'Engineers gather evidence across authoring, Sitecore delivery, layout or GraphQL responses, rendering-host behavior, and CDN metrics before deciding whether the bottleneck is model shape, query design, cache strategy, or frontend implementation.', exampleTitle: 'Performance investigation lens', exampleCode: `Measure
- Sitecore response time
- layout or GraphQL payload size
- rendering-host latency
- cache hit ratio
- asset weight
- user-facing page metrics`, relatedTopics: ['sitecore-caching', 'sitecore-experience-edge', 'sitecore-security-roles'] },
  { slug: 'sitecore-security-roles', title: 'Security and Roles', description: 'Understand how Sitecore security and roles affect authoring, publishing, and platform governance.', focus: 'Sitecore security and role design determine who can see, edit, review, publish, and configure different parts of the platform. In enterprise CMS programs, this is part of governance and operational safety, not only access administration.', why: 'Role design matters because weak boundaries create accidental publishing, untrusted workflows, author frustration, or security risk around sensitive content and platform settings.', usage: 'Teams define role boundaries for content authors, reviewers, publishers, developers, support users, and administrators with different capabilities per site or business area.', workflow: 'Permissions are assigned to the right roles, workflows and publishing rights reflect the governance model, and support teams validate whether the current user has the intended capability before troubleshooting “broken” authoring behavior.', exampleTitle: 'Role-boundary example', exampleCode: `Author
- edit content
- cannot publish

Reviewer
- approve workflow state

Publisher
- publish approved items

Developer / admin
- platform and configuration access`, relatedTopics: ['sitecore-workflows', 'sitecore-publishing', 'sitecore-troubleshooting'] },
  { slug: 'sitecore-troubleshooting', title: 'Troubleshooting', description: 'Learn how senior Sitecore engineers diagnose publishing, rendering, personalization, and delivery problems calmly.', focus: 'Troubleshooting in Sitecore means reasoning across content state, workflow, publishing, layout contracts, rendering hosts, caches, integrations, and permissions. Strong support work depends on isolating the exact broken boundary instead of guessing from one layer only.', why: 'Sitecore incidents often involve several teams at once, and the wrong early assumption causes longer outages, confused authors, and noisy release processes.', usage: 'Typical scenarios include stale content after publish, missing components, wrong personalization output, broken preview, serialization drift, permission issues, and mismatched rendering-host routes.', workflow: 'A strong support path starts from the visible symptom, verifies the content state, checks publishing and workflow, confirms route or layout data, inspects the rendering host and caches, and only then chooses rollback or corrective action.', exampleTitle: 'Troubleshooting sequence', exampleCode: `1. Confirm the symptom
2. Verify item, version, and workflow state
3. Check publishing target and delivery availability
4. Inspect layout / API / rendering-host response
5. Identify cache or permission drift
6. Apply the safest fix with evidence`, relatedTopics: ['sitecore-publishing', 'sitecore-caching', 'sitecore-content-delivery'] },
  { slug: 'sitecore-interview-questions', title: 'Sitecore Interview Questions', description: 'Review the kinds of Sitecore fundamentals, authoring, delivery, and platform questions that appear in interviews.', focus: 'Sitecore interview questions usually test whether the candidate can connect content architecture, authoring workflows, rendering design, publishing, headless delivery, and production support instead of only repeating product definitions.', why: 'Teams hiring for Sitecore roles want people who can support enterprise content platforms calmly, not just list features from tutorials.', usage: 'Candidates are often asked about items, templates, renderings, Helix, JSS, publishing, personalization, XM Cloud, and troubleshooting incidents from live projects.', workflow: 'The best answers explain the concept, show the real project constraint, mention what breaks in production, and then describe the supporting evidence or safe design choice.', exampleTitle: 'Interview answer pattern', exampleCode: `Definition
  -> implementation choice
  -> production risk
  -> validation evidence
  -> architecture trade-off`, relatedTopics: ['sitecore-scenario-questions', 'sitecore-production-issues', 'sitecore-architect-level-questions'] },
  { slug: 'sitecore-scenario-questions', title: 'Scenario Questions', description: 'Practice scenario-driven Sitecore questions focused on real support, publishing, and headless delivery incidents.', focus: 'Scenario questions push the conversation beyond definitions into how the engineer would investigate a broken preview, stale publish, wrong personalization, missing rendering, or environment mismatch.', why: 'Scenario rounds are where senior candidates separate themselves because they must reason across multiple Sitecore boundaries without panicking or guessing.', usage: 'Examples include content not appearing after publish, Experience Editor failing for one rendering, wrong locale content going live, or an XM Cloud rendering host showing outdated route data.', workflow: 'A strong answer scopes impact, identifies the likely boundary, collects evidence in the right order, proposes the safest mitigation, and then describes the long-term prevention action.', exampleTitle: 'Scenario-answer flow', exampleCode: `Scope impact
  -> identify likely boundary
  -> collect evidence
  -> stabilize safely
  -> fix root cause
  -> prevent recurrence`, relatedTopics: ['sitecore-troubleshooting', 'sitecore-publishing', 'sitecore-nextjs-rendering-host'] },
  { slug: 'sitecore-production-issues', title: 'Production Issues', description: 'Understand the common Sitecore production issues that appear after launches and content releases.', focus: 'Production issues in Sitecore usually involve publishing mismatches, rendering or layout-contract drift, stale caches, permission gaps, integration failures, or environment confusion rather than one isolated code bug.', why: 'Interviewers and leads care about production issues because this is where Sitecore becomes a real enterprise platform skill instead of a lab exercise.', usage: 'Support teams investigate stale hero banners, missing datasource content, wrong campaign output, serialization drift, slow pages, or broken headless routes after deployment.', workflow: 'The support path checks what changed recently, verifies content state and publishing, compares authoring versus delivery, inspects rendering or API output, and then confirms whether the fault is content, config, code, or cache.', exampleTitle: 'Production support checklist', exampleCode: `Recent changes?
  -> content
  -> serialized artifact
  -> rendering-host deployment
  -> environment config
  -> cache state`, relatedTopics: ['sitecore-troubleshooting', 'sitecore-caching', 'sitecore-content-delivery'] },
  { slug: 'sitecore-architect-level-questions', title: 'Architect-Level Questions', description: 'Explore the architecture decisions senior Sitecore developers and architects are expected to explain clearly.', focus: 'Architect-level Sitecore questions are about product choice, content architecture, headless direction, environment strategy, governance, integration boundaries, XM Cloud adoption, and long-term supportability across multiple teams or brands.', why: 'These questions matter because strong Sitecore architects are expected to make platform decisions that age well under enterprise complexity and not only solve one immediate feature request.', usage: 'Architect conversations often compare XM Cloud with legacy models, evaluate Helix and modularity, discuss delivery and cache strategy, and explain how content, code, and publishing releases should stay coordinated.', workflow: 'A strong answer states the decision, the competing options, the business and technical trade-offs, the operating model implications, and the evidence or governance needed to keep the decision safe over time.', exampleTitle: 'Architecture-decision frame', exampleCode: `Decision
  -> options compared
  -> trade-offs
  -> operational impact
  -> release and governance effect
  -> proof that the decision works`, relatedTopics: ['sitecore-xm-vs-xp-vs-xm-cloud', 'sitecore-helix-principles', 'sitecore-environment-strategy'] },
];

export const sitecoreTopics = sitecoreTopicSpecs.map(topic);
