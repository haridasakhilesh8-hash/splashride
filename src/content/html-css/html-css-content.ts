import type { FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const defaultVersions = ['HTML5', 'CSS3', 'Responsive Web Standards', 'Modern Browsers'];

type HtmlCssGroupId =
  | 'html-core'
  | 'html-forms-accessibility'
  | 'html-metadata-media'
  | 'css-core'
  | 'css-layouts'
  | 'css-styling-motion'
  | 'production-skills';

interface HtmlCssTopicSpec {
  group: HtmlCssGroupId;
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

const groupQuickUnderstanding: Record<HtmlCssGroupId, string> = {
  'html-core': 'HTML core topics define document meaning, content hierarchy, and the structural decisions that every browser, search engine, and assistive tool depends on.',
  'html-forms-accessibility': 'Forms and accessibility topics show how raw markup becomes usable, understandable, and safe for real users instead of only looking correct in a screenshot.',
  'html-metadata-media': 'Metadata and media topics explain how pages communicate with browsers, social previews, SEO systems, and responsive devices beyond visible text alone.',
  'css-core': 'CSS core topics explain the cascade, selector targeting, spacing rules, and reusable styling choices that keep interfaces consistent as codebases grow.',
  'css-layouts': 'CSS layout topics control how content flows, wraps, aligns, and survives real screen sizes, localization, and dynamic data.',
  'css-styling-motion': 'Styling and motion topics turn raw structure into intentional interface systems with hierarchy, states, and maintainable visual behavior.',
  'production-skills': 'Production frontend skills focus on compatibility, performance, architecture, and the problems that appear only after real users hit the UI.',
};

const htmlCssTopicSpecs: HtmlCssTopicSpec[] = [
  {
    group: 'html-core',
    slug: 'what-is-html',
    title: 'What is HTML?',
    description: 'Understand HTML as the structural language of the web and the baseline every browser reads before styles and scripts are applied.',
    concept: 'HTML is the markup language that describes page structure, content meaning, and document relationships. It is not only about tags on the screen. It is the contract that browsers, SEO crawlers, accessibility tools, and frontend code all depend on.',
    why: 'Teams need a strong HTML foundation because poor structure causes weak accessibility, brittle styling, confusing content hierarchy, and SEO problems that are harder to fix later.',
    usage: 'Real projects use HTML to define landing pages, dashboards, CMS-rendered pages, forms, product cards, navigation regions, and every surface where content must remain understandable across devices and tools.',
    workflow: 'Developers usually start by mapping the content structure, choosing the right elements for meaning, validating document order, and only then layering CSS or JavaScript behavior on top.',
    exampleTitle: 'Simple HTML document',
    exampleCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>SplashRide Frontend Basics</title>
  </head>
  <body>
    <h1>Learn HTML and CSS</h1>
    <p>Structure first, polish second.</p>
  </body>
</html>`,
    productionIssues: [
      'Teams treat HTML as only a container for framework output and miss the document structure that accessibility and SEO depend on.',
      'Pages become hard to maintain because content hierarchy is not reflected in the markup itself.',
      'UI reviews focus on appearance while the underlying HTML remains weak for keyboard users and crawlers.',
    ],
    bestPractices: [
      'Think about meaning before styling or behavior.',
      'Use HTML to express hierarchy, regions, controls, and relationships clearly.',
      'Inspect the rendered DOM in real pages instead of assuming framework output is automatically correct.',
      'Treat HTML quality as part of frontend architecture, not as beginner-only syntax.',
    ],
    relatedTopics: ['html-document-structure', 'semantic-html-deep-dive', 'meta-tags-for-seo'],
  },
  {
    group: 'html-core',
    slug: 'html-document-structure',
    title: 'HTML Document Structure',
    description: 'Learn the standard document skeleton and why browsers rely on a predictable head/body split.',
    concept: 'A healthy HTML document has a doctype, html root, head for metadata, and body for visible content. That structure is small, but it affects parsing, encoding, viewport behavior, title rendering, and SEO metadata.',
    why: 'When document structure is messy, metadata lands in the wrong place, scripts and styles become harder to reason about, and crawlers or browsers can interpret the page differently than intended.',
    usage: 'Real teams use document structure decisions when building layouts, SSR pages, CMS templates, metadata systems, and any frontend stack that needs a clean document shell.',
    workflow: 'Start with the browser-level shell, define head metadata intentionally, keep visible content in body, and validate that framework abstractions still generate a sane final document.',
    exampleTitle: 'Document shell with metadata',
    exampleCode: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HTML Structure</title>
  </head>
  <body>
    <main>Visible content lives here</main>
  </body>
</html>`,
    productionIssues: [
      'Viewport and metadata bugs happen because teams do not understand which values belong in head versus body.',
      'Framework layout abstractions hide document mistakes until SEO or social previews are audited.',
      'Multiple systems inject conflicting metadata because ownership of the document shell is unclear.',
    ],
    bestPractices: [
      'Keep head focused on metadata, preload hints, and page-level configuration.',
      'Use one clear document shell and define metadata ownership early.',
      'Validate generated HTML in the browser, not only in source files.',
      'Treat document structure as a platform concern in multi-page or SSR apps.',
    ],
    relatedTopics: ['what-is-html', 'meta-tags-for-seo', 'open-graph-tags'],
  },
  {
    group: 'html-core',
    slug: 'semantic-html-deep-dive',
    title: 'Semantic HTML Deep Dive',
    description: 'Understand how semantic elements communicate intent, structure, and landmark meaning beyond generic containers.',
    concept: 'Semantic HTML uses elements like header, nav, main, article, section, aside, and footer to express page meaning. It gives more context than div-heavy markup and improves how tools navigate the page.',
    why: 'Semantic structure improves accessibility, content understanding, CSS clarity, and maintainability. It also reduces the number of frontend bugs caused by unclear ownership of regions and controls.',
    usage: 'Teams rely on semantic HTML in blogs, ecommerce flows, dashboards, CMS templates, search pages, and component libraries where page sections need stable meaning.',
    workflow: 'Start from the content outline, identify regions and repeated content patterns, choose semantic elements where they truly match intent, and avoid adding semantic tags only as decoration.',
    exampleTitle: 'Semantic page layout',
    exampleCode: `<header>Brand and primary navigation</header>
<main>
  <article>
    <h1>Semantic HTML</h1>
    <section>Key concepts</section>
  </article>
  <aside>Related resources</aside>
</main>
<footer>Site footer</footer>`,
    productionIssues: [
      'Pages look fine visually but screen-reader users cannot understand the region boundaries quickly.',
      'Teams overuse section or article without a real heading structure, which weakens the semantic value.',
      'Generic containers make CSS and JS selectors less expressive because nothing in the markup indicates purpose.',
    ],
    bestPractices: [
      'Choose semantic elements when they truly describe the content role.',
      'Pair landmarks with heading hierarchy so the structure is meaningful, not token-based.',
      'Audit rendered pages with accessibility tools and keyboard navigation.',
      'Do not replace every div automatically; use semantics intentionally.',
    ],
    relatedTopics: ['what-is-html', 'html-document-structure', 'labels-and-accessibility'],
  },
  {
    group: 'html-core',
    slug: 'headings-paragraphs-links-images',
    title: 'Headings, Paragraphs, Links, and Images',
    description: 'Use the most common content elements correctly so pages stay readable, navigable, and descriptive.',
    concept: 'These are the daily building blocks of the web. Headings create hierarchy, paragraphs carry readable content, links create navigation, and images need text alternatives and sizing awareness.',
    why: 'Frontend teams often break page clarity through weak headings, vague links, decorative images without proper handling, or content blocks that ignore meaning in favor of visual styling.',
    usage: 'Every marketing page, documentation screen, CMS article, landing page, and product card relies on these core content elements.',
    workflow: 'Define hierarchy with headings, write readable copy in paragraphs, use clear destination-oriented link text, and treat images as content that needs alt text, dimensions, and responsive rules.',
    exampleTitle: 'Content block markup',
    exampleCode: `<h2>Frontend Topics</h2>
<p>Learn structure, styling, and browser behavior step by step.</p>
<a href="/technologies/javascript">Explore JavaScript</a>
<img src="/hero.webp" alt="Frontend learning roadmap" width="640" height="360" />`,
    productionIssues: [
      'Links say "click here" and provide no context for scanners or assistive tools.',
      'Images cause layout shift because width and height are not considered.',
      'Heading structure is chosen by font size instead of document hierarchy.',
    ],
    bestPractices: [
      'Write headings for structure and links for destination clarity.',
      'Use alt text that reflects the image purpose, not the file name.',
      'Preserve readable paragraph spacing instead of cramming copy into decorative wrappers.',
      'Validate content blocks on mobile and with long translated text.',
    ],
    relatedTopics: ['semantic-html-deep-dive', 'images-and-responsive-images', 'meta-tags-for-seo'],
  },
  {
    group: 'html-core',
    slug: 'lists-and-tables',
    title: 'Lists and Tables',
    description: 'Understand when grouped items belong in lists and when real row-column relationships require tables.',
    concept: 'Lists represent ordered or unordered related items. Tables are for structured data with relationships across rows and columns. They should not be interchangeable based only on appearance.',
    why: 'Using tables for layout or using plain divs for tabular data confuses accessibility tools, makes CSS harder, and weakens how the UI communicates information.',
    usage: 'Lists show menus, steps, features, FAQs, and tags. Tables show pricing grids, comparison data, reports, and admin data where headers and cells have real relationships.',
    workflow: 'Choose the content pattern first, then use the correct HTML structure and add CSS for appearance without changing the semantic meaning.',
    exampleTitle: 'List and table basics',
    exampleCode: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<table>
  <thead>
    <tr><th>Topic</th><th>Level</th></tr>
  </thead>
  <tbody>
    <tr><td>Flexbox</td><td>Beginner</td></tr>
  </tbody>
</table>`,
    productionIssues: [
      'Tables are built with divs, so screen readers lose header-cell relationships.',
      'Teams use tables for layout and create rigid mobile behavior.',
      'Large data tables become unreadable because structure and responsive fallback were not planned together.',
    ],
    bestPractices: [
      'Use lists for grouped items and tables for actual data relationships.',
      'Add table headers and captions when the data needs context.',
      'Plan mobile handling for tables early instead of after overflow bugs appear.',
      'Do not choose markup based only on what is easiest to style.',
    ],
    relatedTopics: ['tables-best-practices', 'headings-paragraphs-links-images', 'common-layout-bugs'],
  },
  {
    group: 'html-forms-accessibility',
    slug: 'html-forms-validation',
    title: 'HTML Forms Validation',
    description: 'Use built-in form validation capabilities well before jumping to fully custom JavaScript validation.',
    concept: 'HTML validation uses attributes like required, minlength, pattern, and type-specific validation to let browsers enforce a baseline of correctness before submission.',
    why: 'Teams need form validation basics because weak form handling creates bad UX, poor accessibility, server-side noise, and preventable support issues.',
    usage: 'Real projects use HTML validation for login forms, sign-up flows, search inputs, settings forms, ecommerce checkout, and CMS authoring screens.',
    workflow: 'Define the correct input types first, add meaningful constraints, pair them with labels and error messaging, and then layer custom validation only when business rules require it.',
    exampleTitle: 'Native validation example',
    exampleCode: `<form>
  <label for="email">Email</label>
  <input id="email" type="email" required />

  <label for="zip">ZIP Code</label>
  <input id="zip" pattern="[0-9]{5}" required />
</form>`,
    productionIssues: [
      'Teams disable native validation without replacing it with accessible alternatives.',
      'Validation rules differ between client and server, creating confusing submission behavior.',
      'Forms block submission but provide weak or invisible guidance about what failed.',
    ],
    bestPractices: [
      'Start with the right HTML attributes before custom scripting.',
      'Keep validation messages clear and tied to the correct fields.',
      'Validate on the server too, even when HTML validation exists.',
      'Test forms with keyboard-only and screen-reader workflows.',
    ],
    relatedTopics: ['input-types', 'labels-and-accessibility', 'forms-styling'],
  },
  {
    group: 'html-forms-accessibility',
    slug: 'input-types',
    title: 'Input Types',
    description: 'Choose input types that match the real data so browsers can help with validation, keyboards, and autofill.',
    concept: 'HTML input types like email, number, tel, password, date, checkbox, radio, and file each carry built-in semantics and browser behavior.',
    why: 'Choosing the wrong input type creates poor mobile keyboards, weak validation, and extra JavaScript work to recreate browser features that should have been free.',
    usage: 'Real applications use input types in account flows, profile forms, search bars, settings screens, onboarding steps, and internal admin tools.',
    workflow: 'Map each field to the real data type, check how the browser behaves on mobile and desktop, and then decide whether additional constraints or custom UI are actually needed.',
    exampleTitle: 'Field types for a profile form',
    exampleCode: `<input type="email" />
<input type="tel" />
<input type="date" />
<input type="password" />
<input type="file" />`,
    productionIssues: [
      'A phone field uses type text, so mobile users get the wrong keyboard.',
      'Numeric fields are implemented poorly and cause frustrating validation edge cases.',
      'Teams replace native controls too early and lose useful built-in behavior.',
    ],
    bestPractices: [
      'Pick the input type from the data, not from the CSS appearance.',
      'Test on mobile keyboards and autofill scenarios.',
      'Use native controls unless there is a strong product reason to replace them.',
      'Combine field types with labels and clear helper text.',
    ],
    relatedTopics: ['html-forms-validation', 'labels-and-accessibility', 'input-types'],
    faqs: [
      {
        question: 'Why does input type choice matter on mobile?',
        answer: 'Because the browser can show a more helpful keyboard and stronger validation hints when the type matches the user input accurately.',
      },
    ],
  },
  {
    group: 'html-forms-accessibility',
    slug: 'labels-and-accessibility',
    title: 'Labels and Accessibility',
    description: 'Connect labels, controls, helper text, and error states so forms stay understandable for all users.',
    concept: 'Labels identify what a field is for, helper text adds guidance, and accessible relationships let assistive tools connect the right text to the right control.',
    why: 'Without good labels, forms become ambiguous, harder to complete on mobile, and significantly worse for screen-reader users or users with cognitive load.',
    usage: 'This matters in every real form: account creation, billing, CMS authoring, filters, search, admin panels, and checkout flows.',
    workflow: 'Create a stable label-control relationship, keep visible text persistent, wire helper or error text meaningfully, and test how the form behaves with keyboard focus and screen readers.',
    exampleTitle: 'Accessible field structure',
    exampleCode: `<label for="full-name">Full Name</label>
<input id="full-name" aria-describedby="name-help" />
<p id="name-help">Use the name shown on your official ID.</p>`,
    productionIssues: [
      'Placeholder-only forms become unclear as soon as users start typing.',
      'Custom form components lose label associations during refactors.',
      'Error messages appear visually but are not announced meaningfully to assistive technology.',
    ],
    bestPractices: [
      'Use visible labels, not placeholders as the only identifier.',
      'Keep helper and error text tied to the field relationship.',
      'Make tap targets and focus order work well on small screens.',
      'Bake accessible field patterns into shared form components.',
    ],
    relatedTopics: ['html-forms-validation', 'aria-basics', 'accessibility-basics'],
  },
  {
    group: 'html-forms-accessibility',
    slug: 'aria-basics',
    title: 'ARIA Basics',
    description: 'Understand when ARIA helps and when it should not replace good native HTML.',
    concept: 'ARIA adds accessibility semantics when native HTML alone cannot fully describe a custom interaction. It does not make bad HTML automatically accessible.',
    why: 'Teams often misuse ARIA to patch weak semantics instead of choosing better native elements. That creates more accessibility bugs, not fewer.',
    usage: 'ARIA appears in complex widgets like tabs, dialogs, comboboxes, custom menus, accordions, and live regions where native HTML needs extra semantic help.',
    workflow: 'Start with native HTML first, add ARIA only where the interaction genuinely requires it, and then validate with keyboard behavior and assistive technology expectations.',
    exampleTitle: 'Button controlling a panel',
    exampleCode: `<button aria-expanded="false" aria-controls="faq-panel">
  Toggle FAQ
</button>
<div id="faq-panel" hidden>Answer content</div>`,
    productionIssues: [
      'Teams add ARIA roles to elements that were already semantically correct and make behavior more confusing.',
      'Custom widgets declare ARIA states that never update during interaction.',
      'A UI passes visual QA but fails accessibility because ARIA was added without matching keyboard behavior.',
    ],
    bestPractices: [
      'Use native semantics first and ARIA second.',
      'Keep ARIA states in sync with real interaction state.',
      'Test custom controls with keyboard and assistive tools.',
      'Do not treat ARIA as decoration or SEO metadata.',
    ],
    relatedTopics: ['labels-and-accessibility', 'semantic-html-deep-dive', 'accessibility-basics'],
  },
  {
    group: 'html-metadata-media',
    slug: 'tables-best-practices',
    title: 'Tables Best Practices',
    description: 'Build tables that preserve meaning, headers, and responsive readability instead of only creating grid-looking boxes.',
    concept: 'Good table markup uses table, thead, tbody, th, td, and often captions or scope relationships to express structured data correctly.',
    why: 'Data tables are hard to use when headers are unclear, markup is generic, or responsive fallback is ignored. Teams need stronger table thinking than just "render rows".',
    usage: 'Tables appear in pricing comparisons, analytics dashboards, admin tools, inventory lists, scheduling systems, and CMS report screens.',
    workflow: 'Model the data relationships first, write table semantics clearly, then design a responsive strategy that keeps header context understandable on smaller screens.',
    exampleTitle: 'Table with structural regions',
    exampleCode: `<table>
  <caption>Learning Progress</caption>
  <thead>
    <tr><th scope="col">Topic</th><th scope="col">Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Flexbox</td><td>Complete</td></tr>
  </tbody>
</table>`,
    productionIssues: [
      'Wide tables overflow mobile screens with no fallback pattern.',
      'Header context is lost when rows are styled but semantics are weak.',
      'Teams flatten everything into divs and break accessibility relationships.',
    ],
    bestPractices: [
      'Use captions and proper headers when context matters.',
      'Plan responsive behavior before tables reach production scale.',
      'Keep visual styling separate from table semantics.',
      'Audit tables with real datasets, not only two short sample rows.',
    ],
    relatedTopics: ['lists-and-tables', 'responsive-breakpoints', 'common-layout-bugs'],
  },
  {
    group: 'html-metadata-media',
    slug: 'images-and-responsive-images',
    title: 'Images and Responsive Images',
    description: 'Handle images as content, layout, and performance concerns at the same time.',
    concept: 'Images need alt text, dimensions, responsive sizing, and the right delivery strategy. Responsive images use browser hints like srcset and sizes so different screens do not download the same asset blindly.',
    why: 'Images are one of the most common causes of layout shift, slow page loads, weak accessibility, and mismatched mobile behavior.',
    usage: 'Every product card, article hero, gallery, dashboard preview, marketing block, and CMS-driven page depends on image handling quality.',
    workflow: 'Define the content purpose first, provide alt text or mark decorative imagery correctly, choose dimensions, and then add responsive delivery and CSS behavior for the layout.',
    exampleTitle: 'Responsive image markup',
    exampleCode: `<img
  src="/hero-1200.webp"
  srcset="/hero-640.webp 640w, /hero-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, 640px"
  alt="Frontend roadmap illustration"
  width="1200"
  height="675"
/>`,
    productionIssues: [
      'Large desktop images are downloaded on small screens because responsive delivery is missing.',
      'Missing dimensions cause layout shift and hurt perceived performance.',
      'Alt text is vague or duplicated from nearby headings, reducing accessibility value.',
    ],
    bestPractices: [
      'Set dimensions and think about responsive asset delivery.',
      'Write alt text for purpose, not just object labeling.',
      'Use CSS object-fit and layout rules intentionally for different image roles.',
      'Measure image impact in Core Web Vitals and real-device testing.',
    ],
    relatedTopics: ['headings-paragraphs-links-images', 'performance-basics', 'browser-compatibility-issues'],
  },
  {
    group: 'html-metadata-media',
    slug: 'audio-and-video-tags',
    title: 'Audio and Video Tags',
    description: 'Use native media elements correctly before reaching for heavy custom players.',
    concept: 'The audio and video elements provide built-in playback semantics, controls, and media loading behavior. Teams can enhance them, but native support remains important.',
    why: 'Media is easy to make visually flashy but hard to make accessible, performant, and stable across browsers if native behavior is ignored.',
    usage: 'Real sites use media tags in learning platforms, product demos, marketing pages, documentation, onboarding flows, and support libraries.',
    workflow: 'Decide whether native controls are sufficient, define captions or transcripts when needed, set preload behavior intentionally, and validate the experience on different devices.',
    exampleTitle: 'Native video with fallback',
    exampleCode: `<video controls preload="metadata" width="640">
  <source src="/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>`,
    productionIssues: [
      'Custom players remove keyboard or caption support accidentally.',
      'Heavy autoplay media hurts performance and user trust.',
      'Fallback or unsupported-format handling is ignored until specific browsers fail.',
    ],
    bestPractices: [
      'Use native media behavior unless product requirements truly need more.',
      'Plan captions, transcripts, and fallback content early.',
      'Be careful with autoplay, preload, and large asset delivery.',
      'Test media controls with keyboard and on mobile devices.',
    ],
    relatedTopics: ['images-and-responsive-images', 'performance-basics', 'browser-compatibility-issues'],
  },
  {
    group: 'html-metadata-media',
    slug: 'iframe-usage',
    title: 'Iframe Usage',
    description: 'Understand when iframes are appropriate and what trade-offs they bring for security, performance, and UX.',
    concept: 'Iframes embed another browsing context inside the current page. They are useful for isolated third-party or cross-origin content, but they also create sizing, loading, focus, and security complexities.',
    why: 'Teams use iframes for videos, maps, docs, payment widgets, and embeds, but weak iframe handling can introduce scroll traps, layout bugs, or unsafe third-party behavior.',
    usage: 'Real applications embed dashboards, support widgets, payment providers, training content, and social/video content through iframes.',
    workflow: 'Decide whether an iframe is truly required, set dimensions and loading rules, control permissions and sandboxing where possible, and test focus and resize behavior.',
    exampleTitle: 'Embedded content with loading strategy',
    exampleCode: `<iframe
  src="https://example.com/embed"
  title="Embedded report"
  loading="lazy"
  width="100%"
  height="480"
></iframe>`,
    productionIssues: [
      'Embedded content breaks layout because responsive sizing was not planned.',
      'Security or privacy review fails because third-party iframe permissions were not understood.',
      'Keyboard focus and scroll behavior become confusing inside embedded experiences.',
    ],
    bestPractices: [
      'Use iframes intentionally, not as a shortcut for every integration.',
      'Control title, loading, and sizing explicitly.',
      'Review sandboxing, permissions, and third-party ownership risks.',
      'Test embeds on mobile and with keyboard navigation.',
    ],
    relatedTopics: ['audio-and-video-tags', 'browser-compatibility-issues', 'common-layout-bugs'],
  },
  {
    group: 'html-metadata-media',
    slug: 'meta-tags-for-seo',
    title: 'Meta Tags for SEO',
    description: 'Use page-level metadata that helps search engines and browsers understand the purpose of a page.',
    concept: 'Meta tags communicate information like title, description, viewport behavior, robots instructions, and canonical URLs. They shape how pages are indexed and previewed.',
    why: 'Strong content still underperforms when metadata is missing, duplicated, or conflicting across templates and routes.',
    usage: 'Teams use SEO metadata in landing pages, article pages, product detail pages, CMS-driven content, and any route that should be crawled and shared.',
    workflow: 'Define page intent, write unique title and description values, manage canonical ownership, and validate the rendered head output in the final page response.',
    exampleTitle: 'SEO metadata block',
    exampleCode: `<title>HTML & CSS Tutorial | SplashRide</title>
<meta name="description" content="Learn responsive layouts, semantics, and production frontend skills." />
<link rel="canonical" href="https://www.splashride.in/technologies/html-css" />`,
    productionIssues: [
      'Multiple systems inject conflicting metadata into the same page.',
      'Titles are generic across routes, weakening search relevance and CTR.',
      'Canonical tags point to the wrong route and cause duplicate indexing issues.',
    ],
    bestPractices: [
      'Write route-specific metadata with clear ownership.',
      'Validate the final rendered head, not only the source abstraction.',
      'Keep titles and descriptions focused on user intent and page differentiation.',
      'Treat SEO metadata as part of release QA for content-heavy pages.',
    ],
    relatedTopics: ['open-graph-tags', 'favicon-and-manifest-basics', 'seo-friendly-html'],
  },
  {
    group: 'html-metadata-media',
    slug: 'open-graph-tags',
    title: 'Open Graph Tags',
    description: 'Control how pages appear when shared on social platforms and messaging tools.',
    concept: 'Open Graph tags provide share-preview metadata like title, description, image, and URL for platforms that do not rely only on standard HTML title and meta description.',
    why: 'Without OG metadata, good pages can appear broken, generic, or misleading when shared externally.',
    usage: 'Teams use Open Graph metadata for marketing pages, articles, landing pages, case studies, and any content meant to be shared in chats, feeds, or community channels.',
    workflow: 'Define share intent, add og:title, og:description, og:image, and og:url values, and validate the output against real share-preview tools.',
    exampleTitle: 'Open Graph basics',
    exampleCode: `<meta property="og:title" content="HTML & CSS Tutorial | SplashRide" />
<meta property="og:description" content="Learn semantics, layouts, and frontend production skills." />
<meta property="og:image" content="https://www.splashride.in/og/html-css.png" />`,
    productionIssues: [
      'Shared links show the wrong image because OG metadata is missing or stale.',
      'Preview metadata is duplicated from generic site defaults and does not match the route.',
      'Teams forget that crawlers cache social previews and misdiagnose the issue as a code bug.',
    ],
    bestPractices: [
      'Treat social preview metadata as route-specific content.',
      'Use stable, crawlable preview images and absolute URLs.',
      'Verify previews with actual sharing tools and refresh behavior.',
      'Keep metadata ownership aligned with the SEO system, not duplicated in multiple layers.',
    ],
    relatedTopics: ['meta-tags-for-seo', 'favicon-and-manifest-basics', 'seo-friendly-html'],
  },
  {
    group: 'html-metadata-media',
    slug: 'favicon-and-manifest-basics',
    title: 'Favicon and Manifest Basics',
    description: 'Understand the small browser-level assets that affect branding, installability, and polished product feel.',
    concept: 'Favicons identify the site in tabs and bookmarks, while web app manifests define installable metadata like app name, icons, colors, and launch behavior.',
    why: 'These details look small, but they affect browser polish, app-install behavior, and whether a frontend experience feels complete and production-ready.',
    usage: 'Teams manage favicons and manifests in marketing sites, SPAs, internal tools, PWAs, and branded learning platforms where cross-browser polish matters.',
    workflow: 'Provide the right icon files, connect them through head links, define manifest metadata intentionally, and validate install/share behavior on target platforms.',
    exampleTitle: 'Head links and manifest',
    exampleCode: `<link rel="icon" href="/favicon.ico" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#0f172a" />`,
    productionIssues: [
      'The wrong icon appears in browser tabs because cache or file naming is inconsistent.',
      'Manifest metadata exists but is incomplete, so install prompts or branded app behavior are weak.',
      'Teams ignore browser differences and only test the happy path on one device.',
    ],
    bestPractices: [
      'Keep favicon and manifest assets versioned and validated.',
      'Use the manifest intentionally for installable experiences, not as a checkbox artifact.',
      'Check how icons render in tabs, bookmarks, and homescreen contexts.',
      'Treat browser polish details as part of release quality.',
    ],
    relatedTopics: ['meta-tags-for-seo', 'open-graph-tags', 'browser-compatibility-issues'],
  },
  {
    group: 'css-core',
    slug: 'what-is-css',
    title: 'What is CSS?',
    description: 'Understand CSS as the language that controls presentation, spacing, layout, and visual states across the web.',
    concept: 'CSS describes how HTML should look and behave visually. It controls spacing, color, typography, layout, interaction states, and responsive presentation.',
    why: 'Without a strong CSS mental model, teams ship brittle UI, weak component reuse, and styling that gets harder to reason about with every new feature.',
    usage: 'CSS powers design systems, application shells, marketing pages, dashboards, forms, cards, and every reusable frontend component.',
    workflow: 'Developers define visual tokens and layout rules, write selectors for the right ownership boundaries, then refine states and responsiveness while keeping the cascade predictable.',
    exampleTitle: 'Basic CSS rule',
    exampleCode: `body {
  font-family: system-ui, sans-serif;
  color: #0f172a;
  background: #ffffff;
}`,
    productionIssues: [
      'CSS grows without ownership boundaries and becomes override-driven instead of system-driven.',
      'Teams blame browsers when the real problem is weak cascade and selector architecture.',
      'Visual regressions appear across unrelated screens because styles are too global.',
    ],
    bestPractices: [
      'Write CSS with ownership boundaries and reusable patterns in mind.',
      'Understand the cascade before adding utility overrides or !important.',
      'Keep design tokens and component states consistent.',
      'Treat CSS as application architecture, not as decoration after markup is done.',
    ],
    relatedTopics: ['css-selectors', 'css-specificity-deep-dive', 'css-architecture-basics'],
  },
  {
    group: 'css-core',
    slug: 'css-selectors',
    title: 'CSS Selectors',
    description: 'Target elements deliberately so styles remain expressive without becoming brittle.',
    concept: 'Selectors decide which elements receive a style. Good selector strategy is less about memorizing syntax and more about choosing stable ownership boundaries for components and states.',
    why: 'Weak selectors create accidental global styling, hard-to-override components, and CSS that breaks when markup shifts slightly.',
    usage: 'Selectors are used in every component system, page template, utility layer, and application shell.',
    workflow: 'Start from the component or layout boundary, pick selectors that reflect ownership, add state selectors clearly, and avoid tying styles to fragile DOM nesting where possible.',
    exampleTitle: 'Component selectors',
    exampleCode: `.card { padding: 16px; }
.card__title { margin-bottom: 8px; }
.card.is-active { border-color: #2563eb; }`,
    productionIssues: [
      'Overly nested selectors break after small markup refactors.',
      'Global selectors unintentionally style content from CMS or third-party widgets.',
      'Teams use selectors for visual shortcuts instead of system ownership.',
    ],
    bestPractices: [
      'Prefer selectors that reflect component ownership and state.',
      'Keep nesting shallow unless the DOM relationship truly matters.',
      'Use naming conventions so selectors remain readable in large codebases.',
      'Audit selectors during refactors, not only CSS output.',
    ],
    relatedTopics: ['css-specificity-deep-dive', 'bem-naming', 'css-architecture-basics'],
  },
  {
    group: 'css-core',
    slug: 'css-specificity-deep-dive',
    title: 'CSS Specificity Deep Dive',
    description: 'Understand how competing rules are resolved and why specificity discipline matters in large codebases.',
    concept: 'Specificity is the weighting system browsers use when multiple selectors match the same element. It works together with source order and the cascade.',
    why: 'Specificity problems are one of the biggest reasons CSS becomes hard to scale. Once teams fight styles with stronger selectors, reuse gets slower and bugs get harder to isolate.',
    usage: 'This matters in component libraries, theming systems, CMS output styling, migration work, and any product where many teams touch the same CSS layers.',
    workflow: 'Inspect which selectors are matching, compare their weight and order, identify whether the issue is scope or ownership rather than "winning harder", and then simplify the architecture instead of stacking overrides.',
    exampleTitle: 'Specificity comparison',
    exampleCode: `.button { color: slateblue; }
.sidebar .button { color: royalblue; }
#cta.button { color: #2563eb; }`,
    productionIssues: [
      'A small hotfix adds !important and creates long-term override debt.',
      'Theme styles cannot override component defaults without unreadable selector chains.',
      'Design-system components become harder to adopt because consumers must fight internal specificity.',
    ],
    bestPractices: [
      'Keep specificity low and predictable by default.',
      'Fix style ownership problems instead of escalating selector weight.',
      'Reserve !important for truly exceptional cases with clear rules.',
      'Review specificity trends during design-system work, not only after bugs.',
    ],
    relatedTopics: ['css-selectors', 'inheritance-and-cascade', 'css-architecture-basics'],
  },
  {
    group: 'css-core',
    slug: 'inheritance-and-cascade',
    title: 'Inheritance and Cascade',
    description: 'Learn how styles flow through the tree and why rule order still matters even when selectors look correct.',
    concept: 'Inheritance lets some properties flow from parent to child. The cascade resolves which declarations finally apply. Together they explain why CSS behaves the way it does across a real UI.',
    why: 'Teams need this mental model to debug unexpected colors, fonts, spacing behaviors, and style collisions without guesswork.',
    usage: 'Inheritance and cascade behavior appears everywhere in theming, typography systems, utility classes, and shared layout components.',
    workflow: 'Trace the final computed style, identify which properties are inherited versus explicitly set, inspect source order and selector ownership, and then choose the smallest safe fix.',
    exampleTitle: 'Inherited text styles',
    exampleCode: `.article {
  color: #334155;
  font-size: 16px;
}

.article a {
  color: #2563eb;
}`,
    productionIssues: [
      'Typography and color drift because component authors do not understand which styles inherit automatically.',
      'A global theme change has unexpected side effects on nested content blocks.',
      'Teams assume a property inherits when it does not, then add brittle extra rules.',
    ],
    bestPractices: [
      'Know which properties inherit and which do not.',
      'Keep global text and theme layers intentional and documented.',
      'Use browser dev tools to inspect computed styles rather than guessing.',
      'Prefer stable CSS layers over last-minute override ordering tricks.',
    ],
    relatedTopics: ['css-specificity-deep-dive', 'colors-and-typography', 'css-variables'],
  },
  {
    group: 'css-core',
    slug: 'pseudo-classes',
    title: 'Pseudo-Classes',
    description: 'Use pseudo-classes to style stateful conditions like hover, focus, active, checked, and structural relationships.',
    concept: 'Pseudo-classes describe an element state or relationship rather than a new node. They are essential for interactive UI and stateful styling.',
    why: 'Interfaces feel broken when hover, focus, disabled, selected, or validation states are not styled intentionally.',
    usage: 'Teams use pseudo-classes in buttons, forms, navigation menus, cards, tabs, toggles, validation flows, and state-driven design-system components.',
    workflow: 'Map the real component states first, then style the meaningful pseudo-classes with accessibility and keyboard behavior in mind rather than only mouse interactions.',
    exampleTitle: 'Focus and hover states',
    exampleCode: `.button:hover { transform: translateY(-1px); }
.button:focus-visible { outline: 2px solid #2563eb; }
input:invalid { border-color: #dc2626; }`,
    productionIssues: [
      'Hover states look polished but focus states are invisible for keyboard users.',
      'Validation styles trigger too aggressively and create noisy UX.',
      'Pseudo-class behavior differs because the component semantics are wrong underneath.',
    ],
    bestPractices: [
      'Treat focus-visible as a first-class interaction state.',
      'Design pseudo-class behavior from accessibility and UX, not only animation polish.',
      'Pair state styling with correct underlying HTML semantics.',
      'Document component states so they are reused consistently.',
    ],
    relatedTopics: ['pseudo-elements', 'forms-styling', 'accessibility-basics'],
  },
  {
    group: 'css-core',
    slug: 'pseudo-elements',
    title: 'Pseudo-Elements',
    description: 'Use pseudo-elements for visual decoration and structural styling without extra markup.',
    concept: 'Pseudo-elements like ::before and ::after create styleable boxes attached to an element. They are useful for visual affordances but should not replace meaningful content.',
    why: 'Teams often reach for extra spans or divs when a pseudo-element would keep markup cleaner, but they also misuse pseudo-elements for important content that should be real HTML.',
    usage: 'They are used for badges, separators, overlays, quote marks, custom bullets, underline treatments, and small decorative layers in design systems.',
    workflow: 'Define whether the content is decorative or meaningful, use pseudo-elements only for decorative or structural visuals, and test stacking, sizing, and overflow behavior carefully.',
    exampleTitle: 'Decorative accent bar',
    exampleCode: `.card::before {
  content: "";
  display: block;
  height: 4px;
  background: #2563eb;
}`,
    productionIssues: [
      'Important text is injected through CSS and becomes inaccessible or hard to localize.',
      'Pseudo-elements break layout because positioning and stacking were not considered.',
      'Design system styles become harder to debug because pseudo-elements are overused for core structure.',
    ],
    bestPractices: [
      'Use pseudo-elements for decoration, not meaningful content.',
      'Keep layering and positioning intentional.',
      'Inspect generated boxes in dev tools during debugging.',
      'Prefer simpler markup only when the visual behavior truly stays clearer.',
    ],
    relatedTopics: ['pseudo-classes', 'z-index-and-stacking-context', 'css-transforms'],
  },
  {
    group: 'css-core',
    slug: 'css-variables',
    title: 'CSS Variables',
    description: 'Use custom properties to build reusable design tokens and more maintainable theme systems.',
    concept: 'CSS variables store values like color, spacing, radius, and typography tokens that can be reused and overridden through the cascade.',
    why: 'Without tokens, teams hardcode visual values everywhere and make theming, design updates, and cross-component consistency much harder.',
    usage: 'Teams use CSS variables in design systems, dark mode, theming, layout spacing, brand colors, and runtime styling layers.',
    workflow: 'Define shared tokens at the right scope, reference them inside components, and override them intentionally for themes or contextual variations.',
    exampleTitle: 'Tokenized spacing and color',
    exampleCode: `:root {
  --color-accent: #2563eb;
  --space-4: 16px;
}

.button {
  padding: var(--space-4);
  background: var(--color-accent);
}`,
    productionIssues: [
      'Token names drift because no shared naming system exists.',
      'Teams use variables inconsistently, mixing tokens and hardcoded values in the same component.',
      'Theme overrides become confusing because variables are scoped unpredictably.',
    ],
    bestPractices: [
      'Name variables by design meaning, not by one temporary usage.',
      'Keep token layers intentional: global, semantic, and component-level when needed.',
      'Audit hardcoded values during UI work so token coverage stays healthy.',
      'Use CSS variables as a system, not as isolated one-off shortcuts.',
    ],
    relatedTopics: ['colors-and-typography', 'css-architecture-basics', 'bem-naming'],
  },
  {
    group: 'css-core',
    slug: 'box-model',
    title: 'Box Model',
    description: 'Understand how content, padding, border, and margin determine the real space an element uses.',
    concept: 'The box model describes the space around and inside every element. It explains why an item overflows, why spacing feels off, and why width sometimes is not the final visual width.',
    why: 'Layout bugs often come from incorrect box-model assumptions, especially when teams mix fixed widths, padding, borders, and responsive containers.',
    usage: 'This matters in cards, inputs, buttons, sidebars, grids, modal layouts, and any responsive component with spacing rules.',
    workflow: 'Trace the content box, padding, border, and margin separately, check box-sizing behavior, and test components at real widths instead of ideal mockup sizes.',
    exampleTitle: 'Border-box sizing',
    exampleCode: `.panel {
  width: 320px;
  padding: 16px;
  border: 1px solid #cbd5e1;
  box-sizing: border-box;
}`,
    productionIssues: [
      'Components overflow because width is set without accounting for padding and borders.',
      'Reusable cards align differently across pages because box-sizing assumptions are inconsistent.',
      'Global box-model rules are missing, so every component reinvents sizing behavior.',
    ],
    bestPractices: [
      'Understand content, padding, border, and margin as separate layout forces.',
      'Use border-box intentionally in component systems.',
      'Test components with long content and narrow widths.',
      'Debug layout with dev tools box-model inspection instead of guesswork.',
    ],
    relatedTopics: ['display-property', 'position-property', 'common-layout-bugs'],
  },
  {
    group: 'css-core',
    slug: 'display-property',
    title: 'Display Property',
    description: 'Learn how display values change layout participation, flow behavior, and rendering of elements.',
    concept: 'Display controls whether elements behave like blocks, inline content, flex containers, grid containers, list items, or disappear entirely from layout.',
    why: 'Weak display choices create alignment issues, unexpected wrapping, invisible spacing, and component structures that fight the browser.',
    usage: 'This appears in nav bars, badges, cards, layout shells, icon rows, buttons, inline help text, and every reusable UI surface.',
    workflow: 'Choose the visual behavior you need first, then map it to block, inline, flex, grid, or hidden behavior rather than guessing from copied snippets.',
    exampleTitle: 'Display values in action',
    exampleCode: `.nav { display: flex; gap: 12px; }
.badge { display: inline-block; }
.hidden { display: none; }`,
    productionIssues: [
      'Inline elements are given width or height expectations that do not match their display behavior.',
      'Teams hide content with display none without considering animation or accessibility consequences.',
      'Layout bugs appear because the chosen display mode does not match the component role.',
    ],
    bestPractices: [
      'Choose display based on layout role, not habit.',
      'Know when an element participates inline versus as a layout container.',
      'Pair display decisions with accessibility and responsive behavior.',
      'Do not mix layout approaches accidentally inside reusable components.',
    ],
    relatedTopics: ['box-model', 'flexbox', 'css-grid'],
  },
  {
    group: 'css-core',
    slug: 'position-property',
    title: 'Position Property',
    description: 'Use static, relative, absolute, fixed, and sticky positioning with a clear mental model of containing blocks and flow.',
    concept: 'Position changes where an element sits relative to normal document flow and which containing block it uses for placement.',
    why: 'Positioning bugs are common because developers place items visually without understanding how the browser resolves offsets and stacking relationships.',
    usage: 'Teams use positioning in tooltips, badges, sticky headers, overlays, side panels, image labels, and floating UI controls.',
    workflow: 'Decide whether the element should remain in flow or leave it, identify the containing block, then test how the positioned item behaves during scroll, resize, and overflow changes.',
    exampleTitle: 'Absolute badge on a card',
    exampleCode: `.card {
  position: relative;
}

.card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
}`,
    productionIssues: [
      'Absolute elements jump unexpectedly because the wrong containing block is used.',
      'Fixed or sticky UI overlaps content on smaller screens.',
      'Positioning is used as a shortcut for layout instead of a deliberate design choice.',
    ],
    bestPractices: [
      'Know which positioned ancestor defines the containing block.',
      'Use positioning for the right problem, not as a replacement for layout systems.',
      'Test overlays and badges at different breakpoints and scroll states.',
      'Pair positioning with stacking-context awareness.',
    ],
    relatedTopics: ['position-sticky', 'z-index-and-stacking-context', 'common-layout-bugs'],
  },
  {
    group: 'css-core',
    slug: 'css-units',
    title: 'Units: px, %, rem, em, vh, vw',
    description: 'Choose sizing units that scale correctly for text, spacing, viewport sections, and responsive layouts.',
    concept: 'Different CSS units solve different problems. px is fixed, rem scales from the root, em scales from the current context, percentages respond to parent size, and viewport units respond to the screen.',
    why: 'Wrong unit choices create cramped text, layout bugs, inaccessible scaling behavior, and components that respond poorly across devices.',
    usage: 'Units appear in typography, spacing, widths, heights, cards, hero sections, modal sizing, and sticky layout offsets.',
    workflow: 'Pick units based on what should stay fixed, what should scale, and what depends on parent or viewport dimensions.',
    exampleTitle: 'Mixed-unit component sizing',
    exampleCode: `h1 { font-size: 2rem; }
.card { width: 100%; max-width: 28rem; }
.hero { min-height: 100vh; }`,
    productionIssues: [
      'Everything is hardcoded in px and becomes unfriendly to user scaling or accessibility settings.',
      'Viewport units create mobile-height bugs when browser chrome changes.',
      'Nested em usage becomes confusing because component context is not understood.',
    ],
    bestPractices: [
      'Use rem for scalable typography and many spacing tokens.',
      'Be deliberate with viewport units on mobile surfaces.',
      'Understand what the percentage is relative to before using it.',
      'Choose units based on behavior, not only familiarity.',
    ],
    relatedTopics: ['box-model', 'responsive-breakpoints', 'mobile-first-css'],
  },
  {
    group: 'css-layouts',
    slug: 'flexbox',
    title: 'Flexbox',
    description: 'Use flexbox for one-dimensional layout problems like rows, columns, toolbars, and grouped controls.',
    concept: 'Flexbox is designed for alignment and spacing in a single dimension. It helps items grow, shrink, wrap, and align relative to one another.',
    why: 'Teams use flexbox everywhere, but many bugs still happen because grow, shrink, basis, alignment, and wrapping are not understood clearly.',
    usage: 'Flexbox powers nav bars, action rows, media objects, button groups, stacked mobile sections, and many reusable UI clusters.',
    workflow: 'Choose the main axis, define item growth and shrink behavior, then tune wrapping and cross-axis alignment based on real content length and responsive constraints.',
    exampleTitle: 'Toolbar layout with flexbox',
    exampleCode: `.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}`,
    productionIssues: [
      'Long content crushes neighboring items because shrink behavior was never tested.',
      'Items overflow because min-width defaults and wrapping rules are not understood.',
      'Teams expect flexbox to solve two-dimensional grid problems and create awkward workarounds.',
    ],
    bestPractices: [
      'Understand main axis, cross axis, grow, shrink, and basis together.',
      'Test flex layouts with long text and narrow screens.',
      'Use min-width and wrapping intentionally in content-heavy UI.',
      'Pick grid when the problem is truly two-dimensional.',
    ],
    relatedTopics: ['flexbox-real-layouts', 'css-grid', 'common-layout-bugs'],
  },
  {
    group: 'css-layouts',
    slug: 'flexbox-real-layouts',
    title: 'Flexbox Real Layouts',
    description: 'Apply flexbox to realistic UI patterns instead of treating it as only align-items and justify-content syntax.',
    concept: 'Real flexbox work means handling uneven content, action alignment, responsive wrapping, sticky toolbars, empty states, and min-width issues under actual product data.',
    why: 'Developers often know the API but still struggle when real content lengths, badges, icons, and mobile constraints hit the layout.',
    usage: 'This is used in headers, filter bars, pricing rows, sidebar items, card footers, breadcrumb rows, and admin action strips.',
    workflow: 'Start from the user-facing layout pattern, identify which items should grow or stay fixed, validate wrapping and overflow behavior, then test across breakpoints and dynamic content.',
    exampleTitle: 'Action row with flexible content',
    exampleCode: `.card-footer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-footer__title {
  min-width: 0;
  flex: 1;
}`,
    productionIssues: [
      'A row looks perfect with short content but collapses when labels or badges grow.',
      'Developers forget min-width: 0 on flexible content and text overflow becomes hard to debug.',
      'Mobile wrapping creates awkward gaps because the layout was tuned only for desktop screenshots.',
    ],
    bestPractices: [
      'Treat flexbox as a content-behavior tool, not just a centering trick.',
      'Design for long content, mixed actions, and wrapping from the start.',
      'Use real sample data during layout review.',
      'Keep item responsibilities explicit when one element must flex and others must stay fixed.',
    ],
    relatedTopics: ['flexbox', 'common-layout-patterns', 'common-layout-bugs'],
  },
  {
    group: 'css-layouts',
    slug: 'css-grid',
    title: 'CSS Grid',
    description: 'Use grid for two-dimensional layouts where rows and columns need stronger structure than flexbox provides.',
    concept: 'Grid defines tracks across rows and columns, making it easier to build card systems, dashboards, galleries, and page sections with stable structure.',
    why: 'Teams need grid when flexbox becomes too awkward for two-dimensional placement, equal columns, or deliberate area-based layout design.',
    usage: 'Grid appears in dashboard cards, page shells, galleries, comparison layouts, article sections, and component internals with repeated tile structure.',
    workflow: 'Define the grid tracks, place items intentionally, then validate how the layout behaves when content and viewport width change.',
    exampleTitle: 'Responsive card grid',
    exampleCode: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}`,
    productionIssues: [
      'Grid tracks are defined without thinking about content minimums and collapse awkwardly on smaller screens.',
      'Teams overcomplicate grid when a simpler flex layout would be easier to maintain.',
      'Area placement becomes brittle because item relationships are not clear across breakpoints.',
    ],
    bestPractices: [
      'Use grid when the layout is truly two-dimensional.',
      'Choose track sizing based on content, not only design mockups.',
      'Test auto-fit and minmax behavior with real data.',
      'Keep breakpoint-specific area remapping readable and intentional.',
    ],
    relatedTopics: ['grid-real-layouts', 'flexbox', 'responsive-breakpoints'],
  },
  {
    group: 'css-layouts',
    slug: 'grid-real-layouts',
    title: 'Grid Real Layouts',
    description: 'Apply CSS Grid to realistic page and component layouts with uneven content, responsive tracks, and practical constraints.',
    concept: 'Real grid layouts go beyond equal cards. They handle dashboards, side-by-side article sections, content summaries, analytics panels, and region-based placement that changes at breakpoints.',
    why: 'Teams often understand grid syntax but still struggle when content height, column resizing, and responsive track changes create real product complexity.',
    usage: 'Grid real layouts are used in analytics dashboards, marketing page sections, pricing comparisons, CMS preview grids, and admin interfaces.',
    workflow: 'Start from the real layout responsibilities, define which tracks need stability, identify where the layout must collapse, and test the arrangement with realistic content variation.',
    exampleTitle: 'Two-column shell with resilient content',
    exampleCode: `.layout {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  gap: 24px;
}`,
    productionIssues: [
      'A grid looks balanced in mocks but breaks when one column contains much longer content than the other.',
      'Nested grids become hard to reason about because layout ownership is not documented.',
      'Breakpoints are added reactively until the grid behavior becomes difficult to maintain.',
    ],
    bestPractices: [
      'Define layout ownership and collapse behavior up front.',
      'Use minmax intentionally to protect content from collapse.',
      'Test with long headings, empty states, and dynamic card counts.',
      'Keep grid usage readable enough that future developers can refactor safely.',
    ],
    relatedTopics: ['css-grid', 'responsive-breakpoints', 'common-layout-bugs'],
  },
  {
    group: 'css-layouts',
    slug: 'position-sticky',
    title: 'Position Sticky',
    description: 'Use sticky positioning for headers, sidebars, and contextual UI without reaching for JavaScript prematurely.',
    concept: 'position: sticky keeps an element in normal flow until it reaches a threshold, then pins it relative to a scrolling container.',
    why: 'Sticky UI is common in learning platforms, dashboards, tables, and side navigation, but it fails often when overflow, heights, or containing blocks are misunderstood.',
    usage: 'Teams use sticky for table headers, filters, topic sidebars, section navigation, persistent action bars, and long-form content aids.',
    workflow: 'Identify the correct scrolling container, define the threshold, verify parent overflow behavior, and test how sticky interacts with nearby content and mobile height changes.',
    exampleTitle: 'Sticky sidebar',
    exampleCode: `.sidebar {
  position: sticky;
  top: 56px;
}`,
    productionIssues: [
      'Sticky never activates because an ancestor overflow rule creates the wrong scroll context.',
      'Sticky content overlaps other UI because offsets and heights are not coordinated.',
      'Designers expect sticky behavior everywhere, but the layout container prevents it.',
    ],
    bestPractices: [
      'Understand which scrolling container owns the sticky context.',
      'Coordinate sticky offsets with headers and safe spacing.',
      'Test sticky UI on small screens and long pages.',
      'Prefer CSS sticky before building scroll listeners in JavaScript.',
    ],
    relatedTopics: ['position-property', 'z-index-and-stacking-context', 'responsive-breakpoints'],
  },
  {
    group: 'css-layouts',
    slug: 'z-index-and-stacking-context',
    title: 'Z-Index and Stacking Context',
    description: 'Understand how layering really works so overlays, dropdowns, tooltips, and sticky UI do not fight each other.',
    concept: 'z-index only makes sense inside stacking contexts. New stacking contexts are created by positioned elements and certain properties like transform, opacity, and filter.',
    why: 'Teams waste time tweaking z-index numbers when the real issue is stacking context ownership, not the numeric value itself.',
    usage: 'This matters in modals, popovers, dropdowns, sticky headers, slideouts, image overlays, and animated surfaces.',
    workflow: 'Inspect which stacking context the element lives in, identify what created it, compare sibling contexts, and then fix layering through structure or context ownership rather than random larger numbers.',
    exampleTitle: 'Layered overlay system',
    exampleCode: `.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.tooltip {
  position: absolute;
  z-index: 20;
}`,
    productionIssues: [
      'A tooltip stays behind a transformed card even with a larger z-index value.',
      'Sticky headers cover dropdowns because the layer model is undocumented.',
      'Animations accidentally create new stacking contexts and break overlay assumptions.',
    ],
    bestPractices: [
      'Treat layering as a system with documented levels.',
      'Know which properties create stacking contexts.',
      'Fix structure and ownership before escalating z-index values.',
      'Test overlays with sticky UI and transformed components together.',
    ],
    relatedTopics: ['position-property', 'position-sticky', 'css-transforms'],
  },
  {
    group: 'css-layouts',
    slug: 'responsive-breakpoints',
    title: 'Responsive Breakpoints',
    description: 'Choose breakpoints based on content behavior, not only on popular device sizes.',
    concept: 'Breakpoints are moments where the layout needs to change because the content or component behavior starts breaking, not because a specific device brand exists.',
    why: 'Breakpoint choices become messy when teams anchor them to arbitrary devices instead of content needs, which creates CSS full of reactive patches.',
    usage: 'Breakpoints are used in sidebars, nav systems, card grids, data tables, forms, article layouts, and mobile adaptation across the app.',
    workflow: 'Start from the smallest layout, observe where content becomes uncomfortable, then add the smallest necessary breakpoint changes to restore usability.',
    exampleTitle: 'Content-driven breakpoint',
    exampleCode: `@media (min-width: 900px) {
  .layout {
    grid-template-columns: 280px minmax(0, 1fr);
  }
}`,
    productionIssues: [
      'Too many breakpoints make the system harder to maintain and reason about.',
      'A layout still breaks between breakpoints because the content was not tested thoroughly.',
      'Teams optimize for one flagship device instead of resilient ranges.',
    ],
    bestPractices: [
      'Choose breakpoints from content pressure, not device marketing.',
      'Keep breakpoint count intentional and documented.',
      'Test layouts between breakpoints, not only at exact edges.',
      'Align breakpoint logic with a shared design-system strategy.',
    ],
    relatedTopics: ['mobile-first-css', 'responsive-breakpoints', 'common-layout-bugs'],
  },
  {
    group: 'css-layouts',
    slug: 'mobile-first-css',
    title: 'Mobile-First CSS',
    description: 'Start from the smallest practical experience and progressively enhance for larger screens.',
    concept: 'Mobile-first CSS defines the simplest base layout for smaller screens first, then adds complexity with min-width breakpoints as space increases.',
    why: 'This keeps CSS cleaner, forces content prioritization, and avoids awkward desktop-first shrink-down behavior.',
    usage: 'Mobile-first strategy appears in article pages, forms, nav systems, dashboards, onboarding screens, and product cards that must remain usable on small devices.',
    workflow: 'Write the base layout for constrained space first, then expand columns, spacing, or persistent navigation only when the interface truly earns more room.',
    exampleTitle: 'Progressive enhancement layout',
    exampleCode: `.grid {
  display: grid;
  gap: 12px;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}`,
    productionIssues: [
      'Desktop-first assumptions hide which content is actually essential.',
      'Too much visual complexity is forced onto narrow screens and creates fragile overrides.',
      'Teams technically support mobile but never prioritize usability there.',
    ],
    bestPractices: [
      'Decide what the smallest useful experience must contain.',
      'Add complexity progressively instead of shrinking it reactively.',
      'Test with real touch targets, keyboards, and content density.',
      'Keep mobile-first logic visible in the CSS architecture.',
    ],
    relatedTopics: ['responsive-breakpoints', 'common-layout-patterns', 'mobile-first-css'],
  },
  {
    group: 'css-layouts',
    slug: 'common-layout-patterns',
    title: 'Common Layout Patterns',
    description: 'Recognize reusable layout structures so you do not reinvent brittle arrangements for every new page.',
    concept: 'Common layout patterns include sidebars, stacked mobile flows, split content areas, card grids, media objects, sticky action bars, and shell-plus-content structures.',
    why: 'Teams move faster and debug less when they can recognize the layout pattern first instead of improvising div nesting until it looks right.',
    usage: 'This appears in admin panels, docs pages, marketing pages, learning platforms, ecommerce flows, and content-heavy applications.',
    workflow: 'Match the user journey to an existing layout pattern, identify which pieces are fixed versus fluid, and then implement with the simplest fitting CSS system.',
    exampleTitle: 'Sidebar and content shell',
    exampleCode: `.app-shell {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  min-height: 100vh;
}`,
    productionIssues: [
      'Every page invents its own shell and spacing conventions, making the product feel inconsistent.',
      'A layout works for one content type but collapses when another feature reuses it.',
      'Teams choose the wrong pattern and then patch it with positioning hacks.',
    ],
    bestPractices: [
      'Reuse proven patterns before inventing new structures.',
      'Keep shell layout logic separate from inner component styling.',
      'Document the intended usage of shared patterns.',
      'Validate each pattern with mobile, long content, and empty states.',
    ],
    relatedTopics: ['flexbox-real-layouts', 'grid-real-layouts', 'mobile-first-css'],
  },
  {
    group: 'css-styling-motion',
    slug: 'colors-and-typography',
    title: 'Colors and Typography',
    description: 'Use color, font size, weight, spacing, and rhythm intentionally to create strong hierarchy and readability.',
    concept: 'Typography and color systems guide attention, define information hierarchy, and shape the emotional feel of the UI. They are not only cosmetic tokens.',
    why: 'Weak typography and color usage make interfaces harder to scan, reduce accessibility, and create inconsistency across the product.',
    usage: 'This affects landing pages, article pages, forms, dashboards, marketing screens, and every reusable component library.',
    workflow: 'Start from hierarchy and readability goals, define token values and scale relationships, then apply them consistently across components and states.',
    exampleTitle: 'Simple type and color tokens',
    exampleCode: `:root {
  --text-primary: #0f172a;
  --text-muted: #64748b;
  --brand-blue: #2563eb;
}

h1 { color: var(--text-primary); }
p { color: var(--text-muted); }`,
    productionIssues: [
      'Text hierarchy is unclear because font sizes and weights are chosen ad hoc per screen.',
      'Color contrast fails on secondary text or state badges.',
      'Teams hardcode one-off values and drift away from shared design tokens.',
    ],
    bestPractices: [
      'Design typography and color as systems, not isolated page choices.',
      'Check hierarchy with real content density, not only empty mocks.',
      'Verify contrast for all common states and themes.',
      'Keep token usage consistent across design and code.',
    ],
    relatedTopics: ['css-variables', 'buttons-and-cards', 'browser-compatibility-issues'],
  },
  {
    group: 'css-styling-motion',
    slug: 'buttons-and-cards',
    title: 'Buttons and Cards',
    description: 'Style common UI surfaces so they communicate hierarchy, state, and action clearly.',
    concept: 'Buttons and cards are simple on paper but central in real products. They need spacing, state styling, visual emphasis, and predictable reuse rules.',
    why: 'Shallow component styling causes inconsistent actions, weak clickable affordance, and design systems that feel almost right but not dependable.',
    usage: 'These patterns appear in navigation actions, dashboards, marketing CTAs, content previews, onboarding, and admin tooling.',
    workflow: 'Define the purpose and state model first, then style interaction, spacing, hierarchy, and disabled or active behavior with reuse in mind.',
    exampleTitle: 'Card and button treatment',
    exampleCode: `.button {
  padding: 10px 16px;
  border-radius: 8px;
}

.card {
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}`,
    productionIssues: [
      'Buttons look clickable in some places and passive in others because visual rules are inconsistent.',
      'Cards lack stable spacing and become visually noisy as content types multiply.',
      'Interaction states are designed only for hover and miss focus or disabled clarity.',
    ],
    bestPractices: [
      'Build button and card styles around purpose and state, not only visual trend.',
      'Keep spacing and border rules consistent across variants.',
      'Support hover, focus, active, and disabled behavior intentionally.',
      'Treat these patterns as foundational design-system primitives.',
    ],
    relatedTopics: ['navigation-bars', 'forms-styling', 'css-transitions'],
  },
  {
    group: 'css-styling-motion',
    slug: 'navigation-bars',
    title: 'Navigation Bars',
    description: 'Build navigation bars that stay readable, responsive, and stable across product growth.',
    concept: 'Navigation bars are layout and information-architecture surfaces. They need spacing, hierarchy, interaction states, and responsive collapse behavior that still feels intentional.',
    why: 'Navigation bars often fail when labels grow, active states are weak, or mobile adaptation was treated as a late CSS patch.',
    usage: 'Real products use nav bars in top headers, sub-nav systems, side navigation, dashboard shells, docs platforms, and learning sites.',
    workflow: 'Start from navigation purpose and density, define grouping and active state behavior, then apply layout rules that survive long labels and smaller screens.',
    exampleTitle: 'Simple nav row',
    exampleCode: `.nav {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
}`,
    productionIssues: [
      'Navigation collapses poorly because label length and content growth were ignored.',
      'Touch targets are too small on mobile screens.',
      'Active-state styling does not communicate location clearly enough.',
    ],
    bestPractices: [
      'Design navigation for real content length and active-state clarity.',
      'Keep touch targets and keyboard focus behavior comfortable.',
      'Separate shell layout from link styling concerns.',
      'Validate navigation behavior on small screens and in overflow states.',
    ],
    relatedTopics: ['common-layout-patterns', 'mobile-first-css', 'accessibility-basics'],
  },
  {
    group: 'css-styling-motion',
    slug: 'forms-styling',
    title: 'Forms Styling',
    description: 'Style forms so fields, helper text, validation, and actions feel usable instead of merely polished.',
    concept: 'Form styling must support clarity, focus, spacing, validation, and readable relationships between labels, inputs, and actions.',
    why: 'Forms are easy to over-style visually while making them harder to read, tap, validate, or complete successfully.',
    usage: 'This applies to onboarding, account settings, checkout, search filters, admin tools, and CMS authoring screens.',
    workflow: 'Define the field structure first, then style focus, error, success, spacing, and button relationships without hiding the underlying semantics.',
    exampleTitle: 'Input focus styling',
    exampleCode: `input {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
}

input:focus {
  border-color: #2563eb;
  outline: none;
}`,
    productionIssues: [
      'Inputs look attractive but focus state is weak or invisible.',
      'Validation colors are used without supportive text, making errors ambiguous.',
      'Field spacing becomes inconsistent across teams and forms feel harder to scan.',
    ],
    bestPractices: [
      'Style focus and error states as seriously as default states.',
      'Keep field spacing and label relationships consistent.',
      'Use color to reinforce meaning, not as the only signal.',
      'Test forms with touch, keyboard, and long helper text.',
    ],
    relatedTopics: ['html-forms-validation', 'labels-and-accessibility', 'pseudo-classes'],
  },
  {
    group: 'css-styling-motion',
    slug: 'shadows-and-borders',
    title: 'Shadows and Borders',
    description: 'Use depth and boundaries intentionally so components feel structured without becoming noisy.',
    concept: 'Borders and shadows define surfaces, hierarchy, grouping, and separation. Used well, they support information architecture; used poorly, they create clutter.',
    why: 'Teams often overuse shadow and border treatments to create emphasis that spacing or typography should have handled instead.',
    usage: 'This appears in cards, inputs, popovers, nav bars, modals, dashboards, and content containers.',
    workflow: 'Decide whether the element needs grouping, emphasis, or layering, then choose border or shadow treatment that matches the visual system and platform density.',
    exampleTitle: 'Surface treatment',
    exampleCode: `.surface {
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  border-radius: 12px;
}`,
    productionIssues: [
      'Every component uses a different shadow strength and the UI loses coherence.',
      'Borders are used on every nested container, making the layout feel boxed-in and noisy.',
      'Dark-mode or theme variations break because shadows were not tokenized or tested.',
    ],
    bestPractices: [
      'Use depth intentionally and sparingly.',
      'Align border and shadow values with shared design tokens.',
      'Let spacing and typography do part of the hierarchy work too.',
      'Test surface treatments in both dense and spacious layouts.',
    ],
    relatedTopics: ['buttons-and-cards', 'colors-and-typography', 'css-variables'],
  },
  {
    group: 'css-styling-motion',
    slug: 'css-transitions',
    title: 'CSS Transitions',
    description: 'Add subtle motion that improves feedback and clarity without turning the UI into animation noise.',
    concept: 'Transitions animate property changes between states. They are best used to reinforce interaction feedback and make state changes easier to follow.',
    why: 'Good transitions improve perceived polish and clarity. Bad transitions slow the UI, hide underlying UX problems, or animate too many properties.',
    usage: 'Transitions are used in hover states, focus treatment, accordion open/close polish, cards, nav links, modals, and button interactions.',
    workflow: 'Define the state change first, animate only the meaningful properties, and keep timing short enough that the interface still feels responsive.',
    exampleTitle: 'Hover transition',
    exampleCode: `.link-card {
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.link-card:hover {
  transform: translateY(-2px);
}`,
    productionIssues: [
      'Too many properties are animated and performance drops on lower-end devices.',
      'Transitions make click feedback feel delayed instead of clearer.',
      'Teams animate layout-affecting properties that cause jank and repaint issues.',
    ],
    bestPractices: [
      'Animate only what improves comprehension or feedback.',
      'Prefer transform and opacity when suitable for performance.',
      'Keep durations short and consistent across the product.',
      'Respect reduced-motion preferences when appropriate.',
    ],
    relatedTopics: ['css-transforms', 'css-animations', 'performance-basics'],
  },
  {
    group: 'css-styling-motion',
    slug: 'css-transforms',
    title: 'CSS Transforms',
    description: 'Use transforms for movement, scaling, and rotation without rearranging document flow.',
    concept: 'Transforms visually move or reshape an element without changing how surrounding elements take up layout space. They are often used in animation and interaction states.',
    why: 'Transforms are powerful but easy to misuse. They can create stacking contexts, distort layout expectations, and affect hit areas or visual alignment.',
    usage: 'Transforms appear in cards, carousels, hover states, modals, tooltips, image zoom effects, and micro-interaction patterns.',
    workflow: 'Choose the visual transformation needed, verify how it affects stacking and alignment, then pair it with transitions or animations only if the movement improves UX.',
    exampleTitle: 'Card hover lift',
    exampleCode: `.card:hover {
  transform: translateY(-3px) scale(1.01);
}`,
    productionIssues: [
      'Transforms create new stacking contexts and unexpectedly change overlay behavior.',
      'Scaled elements become blurry or misaligned in dense UIs.',
      'Teams rely on transforms to fake layout changes instead of fixing the underlying layout.',
    ],
    bestPractices: [
      'Use transforms for visual motion, not structural layout fixes.',
      'Remember that transforms affect stacking context and compositing.',
      'Keep motion subtle enough that content stays readable.',
      'Test transformed UI with overlays, focus rings, and touch interactions.',
    ],
    relatedTopics: ['css-transitions', 'z-index-and-stacking-context', 'css-animations'],
  },
  {
    group: 'css-styling-motion',
    slug: 'css-animations',
    title: 'CSS Animations',
    description: 'Use keyframe animations for deliberate motion patterns that add meaning instead of distraction.',
    concept: 'CSS animations define multi-step motion through keyframes. They are useful when a simple start-end transition is not expressive enough.',
    why: 'Animations can improve onboarding, reveal, and state communication, but they quickly become distracting or inaccessible if every element moves without purpose.',
    usage: 'Teams use animations for loading indicators, subtle reveals, hero polish, progress cues, and feedback around state changes.',
    workflow: 'Define what the animation should communicate, create the keyframes, validate performance and readability, and check reduced-motion behavior.',
    exampleTitle: 'Simple fade up',
    exampleCode: `@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`,
    productionIssues: [
      'Animations are added for style but slow down the interface and distract users.',
      'Important UI appears delayed because animation blocks perceived availability.',
      'Motion-sensitive users are ignored because no reduced-motion strategy exists.',
    ],
    bestPractices: [
      'Animate for communication, not decoration alone.',
      'Keep motion duration and distance intentional.',
      'Prefer subtle, reusable patterns over one-off dramatic effects.',
      'Support reduced-motion preferences where needed.',
    ],
    relatedTopics: ['css-transitions', 'css-transforms', 'performance-basics'],
  },
  {
    group: 'production-skills',
    slug: 'css-architecture-basics',
    title: 'CSS Architecture Basics',
    description: 'Understand how naming, layering, ownership, and reuse choices determine whether CSS scales cleanly.',
    concept: 'CSS architecture is the system behind styling: how files are organized, how components own styles, how utilities interact with component layers, and how naming stays readable.',
    why: 'Frontend teams need architecture because CSS rarely fails from one bad declaration. It fails when ownership and layering are unclear across the whole product.',
    usage: 'This matters in design systems, large SPAs, CMS-driven sites, multi-team codebases, and migrations from older styling approaches.',
    workflow: 'Choose an ownership model, define naming and token conventions, keep shared layers intentional, and review new CSS for architecture fit, not just visual success.',
    exampleTitle: 'Layered style ownership',
    exampleCode: `tokens.css
base.css
layout.css
components/button.css
components/card.css
utilities.css`,
    productionIssues: [
      'Styles work initially but become expensive to change because ownership boundaries were never defined.',
      'Teams mix utilities, global selectors, and component rules without a consistent mental model.',
      'Refactors are risky because CSS files do not indicate what they are allowed to affect.',
    ],
    bestPractices: [
      'Define CSS ownership and layering before the codebase gets large.',
      'Keep naming systems and tokens consistent across teams.',
      'Review architecture decisions as part of PR quality, not only visual output.',
      'Treat CSS architecture like application architecture, with explicit boundaries.',
    ],
    relatedTopics: ['bem-naming', 'css-selectors', 'css-variables'],
  },
  {
    group: 'production-skills',
    slug: 'bem-naming',
    title: 'BEM Naming',
    description: 'Use BEM-style naming to make component structure and state more predictable in larger CSS codebases.',
    concept: 'BEM stands for Block, Element, Modifier. It names component boundaries and states explicitly so selectors remain readable and relatively low-specificity.',
    why: 'Naming systems become important once teams share components, update styles across many screens, or need to debug ownership quickly.',
    usage: 'BEM appears in design systems, component libraries, marketing sites, and applications where CSS classes must remain understandable over time.',
    workflow: 'Identify the block, name the elements that belong to it, then add modifiers for meaningful variations or states instead of relying on deep nesting.',
    exampleTitle: 'BEM-style classes',
    exampleCode: `.card {}
.card__title {}
.card__meta {}
.card--featured {}`,
    productionIssues: [
      'BEM is copied mechanically without actual component ownership discipline.',
      'Teams mix BEM, utility classes, and ad hoc naming without a clear strategy.',
      'Modifier naming becomes vague and loses semantic meaning over time.',
    ],
    bestPractices: [
      'Use BEM only if it supports a clear ownership model in the project.',
      'Keep block and modifier names tied to real component meaning.',
      'Avoid deep class chains when a simpler naming strategy would work.',
      'Make sure naming conventions are documented and consistently reviewed.',
    ],
    relatedTopics: ['css-architecture-basics', 'css-selectors', 'buttons-and-cards'],
  },
  {
    group: 'production-skills',
    slug: 'accessibility-basics',
    title: 'Accessibility Basics',
    description: 'Understand the practical HTML and CSS choices that make interfaces usable for keyboard and assistive-technology users.',
    concept: 'Accessibility begins with semantics, focus visibility, readable contrast, touch targets, labels, motion awareness, and predictable interaction flow.',
    why: 'A frontend can look polished and still fail real users if accessibility is treated as a late audit instead of part of the build quality bar.',
    usage: 'This matters in every real UI: login forms, navigation, dashboards, content pages, modals, dropdowns, and mobile flows.',
    workflow: 'Start with semantic structure and correct controls, style focus and error states, test keyboard navigation, and verify contrast and content clarity in real user paths.',
    exampleTitle: 'Focus-visible treatment',
    exampleCode: `button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}`,
    productionIssues: [
      'UI libraries are assumed accessible without verifying actual keyboard and focus behavior.',
      'Color contrast or motion choices make the UI harder to use for real users.',
      'Custom controls replace native semantics and silently degrade accessibility.',
    ],
    bestPractices: [
      'Treat accessibility as a baseline quality check, not an optional audit.',
      'Test with keyboard-only and focus-visible states early.',
      'Prefer native semantics before building custom interaction layers.',
      'Review accessibility in component libraries and shared patterns.',
    ],
    relatedTopics: ['labels-and-accessibility', 'aria-basics', 'forms-styling'],
  },
  {
    group: 'production-skills',
    slug: 'seo-friendly-html',
    title: 'SEO-Friendly HTML',
    description: 'Use structural HTML choices that make pages easier for search engines to understand and easier for users to scan.',
    concept: 'SEO-friendly HTML relies on headings, semantic structure, metadata support, crawlable links, alt text, and content hierarchy that reflects page intent.',
    why: 'Teams often think SEO is only metadata, but weak HTML structure can make good content harder to interpret, rank, and preview correctly.',
    usage: 'This matters in articles, landing pages, documentation, product pages, CMS templates, and any route the business expects to discover through search.',
    workflow: 'Map search intent to content hierarchy, structure the HTML meaningfully, then confirm metadata and internal links support the same page purpose.',
    exampleTitle: 'Search-friendly content structure',
    exampleCode: `<main>
  <h1>HTML & CSS Tutorial</h1>
  <p>Build accessible, responsive interfaces.</p>
  <a href="/technologies/javascript">Continue with JavaScript</a>
</main>`,
    productionIssues: [
      'Pages have decent metadata but weak heading and content structure.',
      'Link text is generic and provides poor crawl or user context.',
      'Template reuse causes duplicate or conflicting content hierarchy across routes.',
    ],
    bestPractices: [
      'Align page structure with search intent and content hierarchy.',
      'Use meaningful internal links and headings.',
      'Treat SEO and readability as connected, not separate tracks.',
      'Validate the rendered page output instead of trusting abstractions blindly.',
    ],
    relatedTopics: ['meta-tags-for-seo', 'open-graph-tags', 'headings-paragraphs-links-images'],
  },
  {
    group: 'production-skills',
    slug: 'performance-basics',
    title: 'Performance Basics',
    description: 'Learn the frontend decisions that help pages load faster, render more smoothly, and feel more stable.',
    concept: 'HTML and CSS performance is about asset weight, layout stability, image handling, CSS cost, and how quickly meaningful content appears to the user.',
    why: 'Performance is not only a JavaScript topic. Heavy images, layout thrash, excessive CSS, and poor responsive design can all hurt UX significantly.',
    usage: 'This matters in marketing pages, dashboards, mobile flows, CMS pages, and any route where speed and stability influence trust or conversion.',
    workflow: 'Measure the page, identify the cost from images, layout, CSS, or loading patterns, then simplify or optimize the highest-impact areas first.',
    exampleTitle: 'Performance-aware image markup',
    exampleCode: `<img
  src="/feature.webp"
  alt="Dashboard preview"
  width="640"
  height="360"
  loading="lazy"
/>`,
    productionIssues: [
      'Large images and layout shifts hurt perceived quality before users even interact.',
      'CSS animations and effects are added without checking the real device cost.',
      'Teams optimize low-impact details while the biggest layout and asset problems remain.',
    ],
    bestPractices: [
      'Measure before optimizing and focus on user-visible wins first.',
      'Treat images, layout stability, and CSS cost as core frontend performance concerns.',
      'Prefer resilient layout patterns that avoid surprise reflow.',
      'Validate performance on real devices and network conditions.',
    ],
    relatedTopics: ['images-and-responsive-images', 'css-transitions', 'common-layout-bugs'],
  },
  {
    group: 'production-skills',
    slug: 'common-layout-bugs',
    title: 'Common Layout Bugs',
    description: 'Recognize the recurring overflow, clipping, wrapping, and alignment bugs that appear in real frontend work.',
    concept: 'Common layout bugs usually come from content pressure, min-width defaults, overflow assumptions, positioning shortcuts, and layout systems that were tested only with ideal data.',
    why: 'Teams debug the same frontend issues repeatedly because they treat each bug as unique instead of learning the common root patterns.',
    usage: 'These bugs appear in cards, sidebars, modals, tables, nav bars, sticky layouts, dashboards, and CMS content blocks.',
    workflow: 'Reproduce the bug with realistic content and screen widths, inspect flex/grid/overflow behavior, identify the incorrect layout assumption, and then make the smallest architecture-safe fix.',
    exampleTitle: 'Overflow-resistant text',
    exampleCode: `.card-title {
  min-width: 0;
  overflow-wrap: anywhere;
}`,
    productionIssues: [
      'Text overflows because flex or grid children were never allowed to shrink correctly.',
      'Sticky or absolute elements overlap content under smaller breakpoints.',
      'Teams patch each bug locally instead of addressing shared layout assumptions.',
    ],
    bestPractices: [
      'Test layouts with long text, empty states, and narrow screens.',
      'Inspect min-width, overflow, and containing-block behavior early.',
      'Look for repeated bug patterns across components, not only one screen.',
      'Prefer resilient layout systems over visual hacks.',
    ],
    relatedTopics: ['flexbox-real-layouts', 'grid-real-layouts', 'browser-compatibility-issues'],
  },
  {
    group: 'production-skills',
    slug: 'browser-compatibility-issues',
    title: 'Browser Compatibility Issues',
    description: 'Understand why valid-looking HTML and CSS can still behave differently across browsers, devices, and embedded contexts.',
    concept: 'Browser compatibility is about differences in defaults, feature support, viewport behavior, media handling, layout quirks, and rendering details across engines and devices.',
    why: 'Teams need compatibility awareness because "works on my browser" is not enough for production, especially for responsive UI, media, form behavior, and newer CSS features.',
    usage: 'This matters in public websites, enterprise apps, embedded experiences, CMS outputs, installable apps, and support-heavy platforms.',
    workflow: 'Know the target browser matrix, use progressive enhancement, verify fallbacks for riskier features, and test the rendered experience in the browsers users actually use.',
    exampleTitle: 'Simple fallback-friendly styling',
    exampleCode: `.button {
  border-radius: 999px;
  background: #2563eb;
  color: white;
}`,
    productionIssues: [
      'A layout looks stable in one browser but breaks under another engine or mobile viewport behavior.',
      'New CSS features are adopted without fallback planning or test coverage.',
      'Input, media, and sticky behaviors differ unexpectedly across browsers.',
    ],
    bestPractices: [
      'Use progressive enhancement instead of assuming perfect feature parity.',
      'Test the flows that matter most in real target browsers.',
      'Know which parts of the UI are most sensitive to engine differences.',
      'Capture compatibility lessons in team standards instead of re-learning them per bug.',
    ],
    relatedTopics: ['images-and-responsive-images', 'audio-and-video-tags', 'responsive-breakpoints'],
  },
  {
    group: 'production-skills',
    slug: 'html-css-best-practices',
    title: 'HTML & CSS Best Practices',
    description: 'Pull together practical frontend habits that keep markup and styling maintainable as the codebase grows.',
    concept: 'Best practices in HTML and CSS are about meaning, readability, resilience, accessibility, token use, low-friction maintenance, and shared frontend standards.',
    why: 'Without shared best practices, teams can keep shipping visually correct features while steadily increasing long-term frontend complexity and regression risk.',
    usage: 'This applies across design systems, SPAs, content sites, marketing pages, admin tooling, and cross-team frontend platforms.',
    workflow: 'Review structure, naming, responsiveness, accessibility, and shared tokens together so each new feature strengthens the frontend system instead of adding isolated hacks.',
    exampleTitle: 'Token-first styling foundation',
    exampleCode: `:root {
  --space-4: 16px;
  --radius-md: 10px;
  --color-border: #e2e8f0;
}`,
    productionIssues: [
      'Frontend debt grows because each screen solves spacing and structure differently.',
      'Refactors feel risky because best practices were never turned into shared defaults.',
      'Accessibility and responsiveness are treated as follow-up fixes instead of part of feature completion.',
    ],
    bestPractices: [
      'Prefer semantic markup, resilient layout, and reusable tokens by default.',
      'Keep CSS ownership boundaries readable and documented.',
      'Test components with real content and interaction states before calling them complete.',
      'Treat HTML and CSS quality as part of engineering standards, not only design polish.',
    ],
    relatedTopics: ['css-architecture-basics', 'accessibility-basics', 'performance-basics'],
  },
];

function topic(spec: HtmlCssTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: defaultVersions,
    lastReviewed: reviewed,
    quickUnderstanding: `${groupQuickUnderstanding[spec.group]} ${spec.title} matters because ${spec.description.toLowerCase()}`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers ask about this:**
- They want to know whether you understand browser behavior, not only syntax
- Strong answers connect markup or styling choices to accessibility, maintainability, and production quality
- Senior candidates explain the trade-offs, not only the definition`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical example of ${spec.title.toLowerCase()} in a real frontend workflow.`,
      code: [
        {
          label: spec.exampleTitle,
          language: spec.exampleCode.trim().startsWith('<') ? 'html' : 'css',
          code: spec.exampleCode,
        },
      ],
    },
    commonConfusions: [
      {
        question: `Is ${spec.title} only a beginner topic?`,
        answer: `No. ${spec.title} keeps affecting accessibility, layout resilience, and frontend maintainability long after a developer moves beyond the basics.`,
      },
      {
        question: `What makes ${spec.title} hard in real projects?`,
        answer: `The difficulty usually appears when real content, different browsers, mobile constraints, or reusable component rules expose assumptions that looked fine in a tiny demo.`,
      },
      {
        question: `How should I answer ${spec.title} in interviews?`,
        answer: `Explain the core behavior, then connect it to one real frontend scenario and one production failure mode. That shows deeper understanding than a raw definition alone.`,
      },
    ],
    productionIssues: spec.productionIssues,
    bestPractices: spec.bestPractices,
    architectNote: `${spec.title} should be treated as part of the frontend system, not as an isolated trick. The architecture conversation is about clarity, resilience, accessibility, and whether multiple teams can keep using the pattern safely.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} to a hiring panel?`,
        answer: `Start with the browser behavior, then explain where ${spec.title.toLowerCase()} appears in a real interface and what usually breaks when teams handle it carelessly.`,
      },
      {
        question: `Interview: what weak answer should I avoid for ${spec.title}?`,
        answer: `Avoid giving only a textbook definition. Strong answers include one practical example, one production concern, and one reason the topic matters for accessibility, layout, or maintainability.`,
      },
      ...(spec.faqs ?? []),
    ],
    keyTakeaways: [
      `${spec.title} is more useful when you connect it to real interface behavior instead of memorized syntax.`,
      'Strong HTML and CSS work balances structure, readability, accessibility, and maintainability.',
      'Frontend quality often depends on small markup and styling decisions compounding over time.',
      'The best explanations include what the browser does, why the team cares, and what goes wrong in production.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

export const htmlCssTopics: TopicContent[] = htmlCssTopicSpecs.map(topic);
