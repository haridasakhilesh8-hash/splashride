import type { TopicContent } from '../../types';

interface NextjsExpandedTopicSpec {
  slug: string;
  title: string;
  description: string;
  concept: string;
  why: string;
  usage: string;
  workflow: string;
  exampleTitle: string;
  exampleCode: string;
  relatedTopics: string[];
}

const reviewed = 'June 2026';
const versions = ['Next.js 13', 'Next.js 14', 'Next.js 15'];

function topic(spec: NextjsExpandedTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the Next.js topics senior engineers use to keep routing, rendering, caching, security, and production support predictable as applications scale.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why teams ask about this in interviews:**
- Next.js topics are usually discussed through rendering, cache, deployment, and ownership trade-offs
- Interviewers want to know how framework choices affect user experience, operational cost, and production safety
- Strong answers connect the local feature decision to route behavior, security, and long-term maintainability`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Next.js-oriented example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} only a framework detail?`,
        answer: `No. ${spec.title} affects route behavior, data ownership, caching, deployment, and the reliability of real user journeys.`,
      },
      {
        question: `What makes a weak answer for ${spec.title}?`,
        answer: `A weak answer explains the API surface but skips runtime behavior, ownership boundaries, failure modes, and what teams validate in production.`,
      },
      {
        question: `How should senior engineers explain ${spec.title}?`,
        answer: `Senior engineers should connect ${spec.title} to rendering strategy, cache behavior, deployment assumptions, and supportability under production pressure.`,
      },
    ],
    productionIssues: [
      `${spec.title} is implemented without clear ownership, so frontend, platform, and backend teams make different assumptions about who is responsible for correctness.`,
      `A release changes ${spec.title.toLowerCase()} behavior, but route checks, cache expectations, or deployment assumptions are not updated consistently.`,
      `Teams discuss ${spec.title} at feature level only and miss the production concerns around security, performance, or operational recovery.`,
    ],
    bestPractices: [
      `Treat ${spec.title} as part of Next.js delivery architecture, not only as a framework API.`,
      'Document the contract between route behavior, rendering, cache, and deployment expectations.',
      'Validate direct navigation, refresh behavior, cache freshness, and failure handling before calling the implementation production-ready.',
      'Use examples from real incident handling, migration, or release workflows when explaining the topic in interviews.',
    ],
    architectNote: `In Next.js, ${spec.title} should be evaluated through runtime ownership, route behavior, security boundaries, cache and deployment safety, and the cost of supporting the choice over time. The important question is not only "how do we implement it?" but "how does it stay reliable as more teams, routes, and user journeys depend on it?"`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Next.js project?`,
        answer: `Explain ${spec.title} through the route tree, rendering model, cache or data behavior, deployment assumptions, and the observable evidence that proves the implementation is working safely in production.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The common production concern is misalignment between framework behavior and operational expectations, which leads to stale content, broken routes, unauthorized access, degraded performance, or difficult incident triage.`,
      },
    ],
    keyTakeaways: [
      `${spec.title} is a production decision, not just a framework definition.`,
      'Strong Next.js answers connect routing, rendering, caching, deployment, and support operations together.',
      'Production readiness means thinking about cache, failures, direct navigation, and verification before incidents happen.',
      'Senior Next.js engineers explain the trade-offs behind framework and platform decisions clearly.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const specs: NextjsExpandedTopicSpec[] = [
  {
    slug: 'nextjs-pages-router',
    title: 'Pages Router',
    description: 'Understand the Pages Router model, its request lifecycle, and how teams reason about migration into the App Router.',
    concept: 'The Pages Router is the older Next.js routing model built around page files, data functions such as getServerSideProps, and API Routes. Many production systems still run on it, so teams need to understand both its strengths and where the App Router changes the mental model.',
    why: 'Next.js teams still migrate, support, or compare against Pages Router applications. Without that context, engineers struggle to explain mixed-router codebases, migration trade-offs, or why some routes behave differently.',
    usage: 'Teams use Pages Router knowledge when maintaining legacy enterprise applications, migrating route-by-route to the App Router, or comparing SSR and data-loading assumptions across generations of the same product.',
    workflow: 'Engineers identify which routes still depend on the Pages Router, map data and auth behavior to page-level functions, isolate shared platform concerns, and then plan incremental migration instead of rewriting blindly.',
    exampleTitle: 'Pages Router migration lens',
    exampleCode: `Pages Router route
-> page component + getServerSideProps or getStaticProps
-> _app and _document conventions
-> API Routes for request handling

Migration question
-> what moves cleanly to App Router
-> what needs rendering or auth behavior redesigned first?`,
    relatedTopics: ['nextjs-app-router', 'nextjs-ssr', 'nextjs-route-handlers'],
  },
  {
    slug: 'nextjs-csr',
    title: 'Client-Side Rendering',
    description: 'Learn when client-side rendering is still the right Next.js choice and how to manage its trade-offs safely.',
    concept: 'Client-side rendering in Next.js means the browser does more of the rendering and data-loading work after the initial page shell arrives. It gives flexibility for highly interactive experiences, but it shifts SEO, loading, and bundle concerns onto the client.',
    why: 'Teams need CSR judgment because not every route benefits from server-first rendering. Some journeys are better off with authenticated client views, rich dashboards, or server-state libraries that work primarily in the browser.',
    usage: 'CSR appears in authenticated dashboards, feature-heavy product consoles, filter-rich data experiences, and settings surfaces where SEO matters less than interactivity and client-driven state.',
    workflow: 'Engineers decide whether the route can tolerate client-driven loading, define loading and error states, keep bundle cost under control, and verify that SEO or crawlability requirements are not being violated accidentally.',
    exampleTitle: 'CSR decision heuristic',
    exampleCode: `Choose CSR when
- the journey is highly interactive
- SEO is not the primary concern
- client-side server-state caching adds value

Watch carefully
- bundle size
- device cost
- loading and error UX
- auth and cache boundaries`,
    relatedTopics: ['nextjs-client-components', 'nextjs-fetch-api', 'nextjs-performance-bottlenecks'],
  },
  {
    slug: 'nextjs-get-server-side-props',
    title: 'getServerSideProps',
    description: 'Understand getServerSideProps request-time rendering and how to reason about it in legacy or hybrid Next.js codebases.',
    concept: 'getServerSideProps is a Pages Router data-loading function that runs on every request and provides server-rendered data to the page. It belongs to the older routing model, but many production applications still rely on it.',
    why: 'Teams still support getServerSideProps in enterprise apps, and migration decisions are safer when engineers understand its request-time execution, auth placement, redirect behavior, and capacity cost.',
    usage: 'It is used in legacy Next.js routes that need per-request data, session-aware rendering, or redirects that happen before the page is delivered to the browser.',
    workflow: 'The request reaches the route, getServerSideProps fetches and validates server data, returns props or redirects, and the server renders the page output for that request.',
    exampleTitle: 'Request-time rendering path',
    exampleCode: `Request
-> getServerSideProps runs
-> auth or data check happens
-> props or redirect returned
-> page rendered on server
-> browser receives HTML + hydration payload`,
    relatedTopics: ['nextjs-pages-router', 'nextjs-ssr', 'nextjs-authentication'],
  },
  {
    slug: 'nextjs-get-static-props',
    title: 'getStaticProps',
    description: 'Learn how build-time data loading works in the Pages Router and where getStaticProps still matters during migration or legacy support.',
    concept: 'getStaticProps is a Pages Router build-time data-loading function used for static generation. It precomputes route data during build and optionally works with revalidation for freshness.',
    why: 'Teams migrating or supporting Pages Router applications need to understand when static generation assumptions are hidden inside older routes and how those assumptions compare to App Router static rendering.',
    usage: 'It appears in marketing pages, content-driven routes, and prebuilt experiences where predictable static output is more important than request-time personalization.',
    workflow: 'During build, Next.js runs getStaticProps, fetches the needed data, stores the rendered output, and then serves the static result until rebuild or revalidation changes it.',
    exampleTitle: 'Build-time route model',
    exampleCode: `Build
-> getStaticProps fetches content
-> HTML and payload generated
-> CDN serves static route
-> optional revalidation updates freshness later`,
    relatedTopics: ['nextjs-pages-router', 'nextjs-ssg', 'nextjs-isr'],
  },
  {
    slug: 'nextjs-get-static-paths',
    title: 'getStaticPaths',
    description: 'Understand how static path generation works in the Pages Router and how teams manage fallback behavior safely.',
    concept: 'getStaticPaths determines which dynamic routes are prebuilt in the Pages Router and what should happen when a user requests an unbuilt path. It is a route-generation and user-experience decision, not just a helper function.',
    why: 'High-cardinality static routes can create build pain, incomplete route coverage, or confusing fallback behavior if teams do not model them carefully.',
    usage: 'Teams use it in blogs, catalogs, localized content routes, and marketing estates where dynamic paths exist but not every route should be generated the same way.',
    workflow: 'The build computes which paths should exist, Next.js generates those paths, and fallback behavior controls how unknown dynamic paths are handled at runtime.',
    exampleTitle: 'Static path strategy',
    exampleCode: `Dynamic content set
-> decide which paths prebuild
-> choose fallback behavior
-> build output created
-> runtime handles missing paths according to chosen fallback mode`,
    relatedTopics: ['nextjs-pages-router', 'nextjs-ssg', 'nextjs-dynamic-routes'],
  },
  {
    slug: 'nextjs-layouts',
    title: 'Layouts',
    description: 'Learn how App Router layouts persist, share UI, and influence route ownership and state preservation.',
    concept: 'Layouts are persistent route wrappers in the App Router. They let teams share UI and data boundaries across related routes without remounting everything on each navigation.',
    why: 'Layout decisions affect data fetching, shared state, navigation experience, and how route ownership scales across teams. Poor layout boundaries create oversized shared shells and fragile coupling.',
    usage: 'Teams use layouts for dashboards, authenticated areas, product shells, navigation frameworks, and multi-step experiences where persistent context matters.',
    workflow: 'The root layout establishes global route structure, nested layouts own section-level shared UI and data, and child pages render inside those boundaries without forcing all parents to reset.',
    exampleTitle: 'Nested layout ownership',
    exampleCode: `Root layout
-> app-wide shell

Section layout
-> dashboard navigation + shared data

Page
-> route-specific content

Navigation between sibling pages
-> page changes
-> persistent layout stays mounted`,
    relatedTopics: ['nextjs-app-router', 'nextjs-nested-routes', 'nextjs-templates'],
  },
  {
    slug: 'nextjs-templates',
    title: 'Templates',
    description: 'Understand when templates are the right App Router tool for intentional remounting and state reset.',
    concept: 'Templates in the App Router look similar to layouts but remount on navigation. They are useful when teams want fresh lifecycle behavior or resettable state instead of persistence.',
    why: 'Engineers need to understand templates so they do not force persistence when the correct behavior is reset, or accidentally remount expensive state by choosing the wrong boundary.',
    usage: 'Templates help with route-specific animations, page-level form resets, and cases where each navigation should feel like a fresh screen instead of reusing persistent layout state.',
    workflow: 'The route segment renders inside a template boundary, and when navigation changes within that scope, the template remounts instead of preserving its internal state like a layout would.',
    exampleTitle: 'Layout versus template',
    exampleCode: `Layout
-> preserves state across sibling navigation

Template
-> remounts on navigation
-> useful when state should reset or enter animations should rerun`,
    relatedTopics: ['nextjs-layouts', 'nextjs-app-router', 'nextjs-loading-ui'],
  },
  {
    slug: 'nextjs-loading-ui',
    title: 'Loading UI',
    description: 'Learn how loading.tsx and loading boundaries should be designed so Next.js routes feel intentional under slow dependencies.',
    concept: 'Loading UI in the App Router is not only a spinner. It is the fallback experience users see while a route segment or streamed subtree is still becoming ready.',
    why: 'Good loading UI shapes perceived performance. Poor fallback placement creates flashing, blank states, and routes that feel broken even when the backend is only slow.',
    usage: 'Teams use loading UI for route transitions, streamed dashboards, detail pages with slow dependencies, and authenticated product surfaces where skeleton fidelity matters.',
    workflow: 'The route defines a loading boundary, Next.js shows the fallback while the segment or streamed section is unresolved, and then replaces it with the real content when ready.',
    exampleTitle: 'Loading boundary rule',
    exampleCode: `Ask first
-> what useful shell can the user see immediately?
-> what part is actually still loading?

Then design fallback
-> skeletons that match layout
-> accessible busy states
-> no unnecessary full-page masking`,
    relatedTopics: ['nextjs-streaming', 'nextjs-layouts', 'nextjs-error-handling'],
  },
  {
    slug: 'nextjs-error-handling',
    title: 'Error Handling',
    description: 'Understand Next.js route-level error boundaries, recovery flows, and how teams separate expected failures from real incidents.',
    concept: 'Error handling in the App Router uses route-level boundaries such as error.tsx and global error recovery patterns so one failure does not necessarily take down the whole route tree.',
    why: 'Teams need explicit recovery strategy for route failures, fetch errors, and degraded dependencies. Without it, users get blank pages or unclear retry behavior during production incidents.',
    usage: 'This matters in dashboards, checkout flows, content routes, and admin surfaces where partial failure should be recoverable and observable.',
    workflow: 'A route or nested boundary throws or returns a failure state, the nearest Next.js error boundary handles it, and the user is given retry or navigation options while telemetry captures the context.',
    exampleTitle: 'Recovery boundary model',
    exampleCode: `Failure happens
-> nearest route error boundary handles it
-> user sees meaningful fallback or retry
-> logs capture route, dependency, and request context
-> support team can triage with evidence`,
    relatedTopics: ['nextjs-loading-ui', 'nextjs-debugging', 'nextjs-monitoring'],
  },
  {
    slug: 'nextjs-parallel-routes',
    title: 'Parallel Routes',
    description: 'Learn how parallel routes let independent route slots load and recover separately inside the App Router.',
    concept: 'Parallel routes allow multiple route slots to exist alongside each other so independent areas of the UI can own separate loading, error, and navigation state.',
    why: 'This feature is powerful but easy to overcomplicate. Teams need to understand where independent slot ownership improves UX versus where it only adds mental overhead.',
    usage: 'Parallel routes are used in dashboards, modal-plus-main-content patterns, and multi-pane product experiences where independent sections should load or fail separately.',
    workflow: 'The route tree defines slots, each slot resolves its own content and fallbacks, and navigation can change one slot without tearing down unrelated siblings.',
    exampleTitle: 'Slot-based route composition',
    exampleCode: `Main route shell
-> @summary slot
-> @activity slot
-> @details slot

Each slot
-> independent loading
-> independent error recovery
-> independent ownership trade-offs`,
    relatedTopics: ['nextjs-intercepting-routes', 'nextjs-layouts', 'nextjs-streaming'],
  },
  {
    slug: 'nextjs-intercepting-routes',
    title: 'Intercepting Routes',
    description: 'Understand intercepting routes for modal-style navigation with shareable URLs and route-aware recovery behavior.',
    concept: 'Intercepting routes let the app render a route in the current context, often as a modal or overlay, while still preserving the underlying route and shareable URL behavior.',
    why: 'Teams need this when they want richer navigation without losing direct links, refresh behavior, or route ownership clarity.',
    usage: 'Common examples are product quick views, detail modals over a grid, and drill-down flows where the user can share or refresh the URL without breaking the experience.',
    workflow: 'A route is intercepted into the current tree, displayed in a contextual shell like a modal, and still retains a meaningful standalone route when directly visited.',
    exampleTitle: 'Shareable modal route',
    exampleCode: `User opens detail from list
-> route intercepts into modal view
-> URL still updates
-> refresh or direct open can render standalone route safely`,
    relatedTopics: ['nextjs-parallel-routes', 'nextjs-routing', 'nextjs-layouts'],
  },
  {
    slug: 'nextjs-rendering-strategy',
    title: 'Rendering Strategy',
    description: 'Learn how senior teams choose route-by-route rendering strategy in Next.js instead of treating one mode as a universal default.',
    concept: 'Rendering strategy is the discipline of choosing which routes should be static, dynamic, streamed, client-heavy, or hybrid based on freshness, SEO, personalization, latency, and cost.',
    why: 'Weak rendering decisions create stale pages, origin overload, hydration problems, or expensive dynamic behavior where static output would have been safer.',
    usage: 'Teams use rendering strategy when designing product surfaces, content platforms, logged-in dashboards, and enterprise route portfolios with mixed requirements.',
    workflow: 'Engineers classify each route by freshness, SEO, personalization, and capacity needs, then choose rendering and cache behavior that matches those constraints instead of copying one pattern everywhere.',
    exampleTitle: 'Route strategy matrix',
    exampleCode: `Marketing page
-> static or ISR

Personalized dashboard
-> dynamic server rendering or hybrid client/server approach

High-cost analytics page
-> streamed route + scoped dynamic work

Key rule
-> choose per journey, not per framework trend`,
    relatedTopics: ['nextjs-ssr', 'nextjs-ssg', 'nextjs-server-components'],
  },
  {
    slug: 'nextjs-hydration',
    title: 'Hydration',
    description: 'Understand hydration consistency, mismatch diagnosis, and how to keep browser interactivity aligned with server-rendered output.',
    concept: 'Hydration attaches client behavior to server-rendered HTML. It depends on the initial browser render matching the server output before later updates occur.',
    why: 'Hydration warnings often signal real product defects, not just noisy console output. They can hide broken controls, inconsistent content, and fragile client boundaries.',
    usage: 'Hydration matters in mixed server and client component trees, locale-specific routes, browser-only integrations, and any route where third-party scripts or time-sensitive values can diverge.',
    workflow: 'The server sends HTML, the browser renders the same tree, React hydrates event handlers and client state, and engineers investigate any mismatch as a release-quality issue.',
    exampleTitle: 'Hydration-safe rule set',
    exampleCode: `Server render and first client render must agree on
- text output
- conditionals
- keys and structure

Browser-only values
-> move into effects or isolated client boundaries

Treat warnings
-> as route correctness issues, not cosmetic noise`,
    relatedTopics: ['nextjs-client-components', 'nextjs-server-components', 'nextjs-debugging'],
  },
  {
    slug: 'nextjs-api-routes',
    title: 'API Routes',
    description: 'Learn how legacy API Routes work in the Pages Router and how to compare them with Route Handlers during migration.',
    concept: 'API Routes are the Pages Router request-boundary mechanism for server-side HTTP endpoints. Many production apps still rely on them even as Route Handlers become the App Router-native model.',
    why: 'Engineers need to support, compare, and migrate API Routes safely, especially in mixed-router applications where different endpoints use different lifecycle assumptions.',
    usage: 'They appear in older Next.js apps for auth callbacks, webhooks, CRUD endpoints, and platform integrations that predate Route Handlers.',
    workflow: 'The request hits the Pages Router endpoint, the handler validates method and input, performs server work, and returns the response while remaining inside the legacy routing model.',
    exampleTitle: 'Legacy endpoint comparison',
    exampleCode: `Pages Router API Route
-> pages/api/*
-> classic request and response objects

App Router Route Handler
-> app/api/*/route.ts
-> newer request and runtime model

Migration question
-> what behavior changes with auth, caching, and runtime?`,
    relatedTopics: ['nextjs-route-handlers', 'nextjs-pages-router', 'nextjs-middleware'],
  },
  {
    slug: 'nextjs-nextauth',
    title: 'NextAuth',
    description: 'Understand NextAuth and how teams use it to implement Next.js authentication flows safely in both legacy and App Router setups.',
    concept: 'NextAuth, now Auth.js in modern usage, is a widely used authentication solution for Next.js that handles providers, sessions, callbacks, and secure cookie-based auth flows.',
    why: 'Teams need a first-class understanding of NextAuth because authentication failures are high-risk and many enterprise Next.js apps standardize on this library for auth behavior.',
    usage: 'It is used for OAuth login, credentials flows, session cookies, protected dashboards, multi-provider identity, and route-level auth enforcement in modern Next.js products.',
    workflow: 'The user signs in through a configured provider, the auth layer creates a session or token, request-boundary checks and server routes validate identity, and the app uses server-side authorization to protect data and actions.',
    exampleTitle: 'Auth.js operating model',
    exampleCode: `Identity flow
-> sign in with provider or credentials
-> session or JWT established
-> middleware or request boundary checks route access
-> server components and handlers enforce resource permissions`,
    relatedTopics: ['nextjs-authentication', 'nextjs-session-management', 'nextjs-protected-routes'],
  },
  {
    slug: 'nextjs-jwt',
    title: 'JWT',
    description: 'Learn how JWT-based auth works in Next.js and where token validation and authorization can go wrong.',
    concept: 'A JWT-based session model uses signed tokens to represent identity claims between requests. It can be efficient and edge-friendly, but it needs strong validation, storage, and authorization discipline.',
    why: 'Many auth implementations fail because teams confuse identity with authorization or treat token storage and expiry as afterthoughts.',
    usage: 'JWTs are used in NextAuth configurations, edge checks, API authentication, BFF integration, and distributed apps where stateless session validation is useful.',
    workflow: 'The server issues a signed token, stores or transmits it through safe session mechanisms, validates it on later requests, and still performs resource-level authorization before sensitive work.',
    exampleTitle: 'Token trust boundary',
    exampleCode: `JWT can prove
-> who the caller claims to be

JWT cannot replace
-> resource-level authorization
-> cache isolation
-> safe revocation strategy

Key rule
-> valid token does not mean allowed action`,
    relatedTopics: ['nextjs-nextauth', 'nextjs-session-management', 'nextjs-protected-routes'],
  },
  {
    slug: 'nextjs-session-management',
    title: 'Session Management',
    description: 'Understand how session lifecycle, expiry, and revocation decisions affect Next.js security and user experience.',
    concept: 'Session management is the policy around how identity persists across requests, how sessions expire, how they are refreshed, and how logout or revocation actually work in production.',
    why: 'Teams need session discipline because auth bugs are often really session bugs: stale claims, inconsistent logout, weak revocation, or multi-region session drift.',
    usage: 'It matters in dashboards, admin apps, multi-device login flows, enterprise SSO, and regionally distributed products where secure continuity is required.',
    workflow: 'The app creates a session model, stores it through safe cookies or approved token flows, validates it on requests, refreshes or expires it deliberately, and captures enough telemetry for support and audit.',
    exampleTitle: 'Session strategy choice',
    exampleCode: `Database-backed session
-> stronger revocation control

Token-backed session
-> edge-friendly and lower lookup cost

Both still require
-> safe cookie settings
-> explicit expiry
-> logout and rotation behavior`,
    relatedTopics: ['nextjs-nextauth', 'nextjs-jwt', 'nextjs-authentication'],
  },
  {
    slug: 'nextjs-protected-routes',
    title: 'Protected Routes',
    description: 'Learn how to protect Next.js routes safely by separating authentication checks from real authorization enforcement.',
    concept: 'Protected routes control who may reach a route experience, but real safety also requires authorizing the data and mutations behind that route. Middleware alone is not enough.',
    why: 'Weak route protection creates false confidence. Users may be redirected correctly at the route level but still access sensitive data or actions if resource-level authorization is missing.',
    usage: 'Teams use this in dashboards, billing, admin panels, tenant-specific content, and mutation-heavy product areas where route access and resource access must both be correct.',
    workflow: 'The request boundary handles fast access checks, the server route or component validates the session, and the protected data or mutation performs resource-level authorization before doing work.',
    exampleTitle: 'Route protection layers',
    exampleCode: `Layer 1
-> route entry check

Layer 2
-> session validation on server

Layer 3
-> resource permission check where data or mutation is owned

Never stop at layer 1`,
    relatedTopics: ['nextjs-authentication', 'nextjs-middleware', 'nextjs-route-handlers'],
  },
  {
    slug: 'nextjs-code-splitting',
    title: 'Code Splitting',
    description: 'Understand route-level and component-level code splitting so Next.js bundles stay focused on the user journey.',
    concept: 'Code splitting controls how JavaScript is separated into chunks so users do not download every feature up front. In Next.js, it is shaped by routes, dynamic imports, and client boundary choices.',
    why: 'Without code splitting discipline, Next.js apps accumulate large client bundles, slow interaction readiness, and route-level performance regressions.',
    usage: 'Teams use it for heavy dashboards, rarely used tools, large editors, chart libraries, role-specific features, and long-tail product areas that should not burden every route.',
    workflow: 'Engineers identify which code is route-specific or optional, move it behind route or dynamic boundaries, and then verify that loading waterfalls and chunk duplication do not erase the intended win.',
    exampleTitle: 'Chunk ownership heuristic',
    exampleCode: `Always ask
-> does every user and route need this code?

If no
-> split by route or dynamic import

Then verify
-> chunk count
-> loading waterfall
-> repeated dependency cost`,
    relatedTopics: ['nextjs-lazy-loading', 'nextjs-bundle-optimization', 'nextjs-client-components'],
  },
  {
    slug: 'nextjs-bundle-optimization',
    title: 'Bundle Optimization',
    description: 'Learn how senior teams analyze and reduce Next.js client and server bundle cost with evidence instead of guesswork.',
    concept: 'Bundle optimization is the discipline of understanding what code ships to the browser, what stays on the server, and how shared or optional dependencies affect route performance.',
    why: 'Many slow Next.js experiences are really bundle problems: accidental client boundaries, oversized shared dependencies, or libraries shipping where the route did not need them.',
    usage: 'Teams use bundle optimization when a route is slow to hydrate, mobile interactivity suffers, or bundle growth is silently increasing after feature expansion.',
    workflow: 'The team analyzes route bundles, identifies unexpectedly large client chunks, isolates the code paths that pulled those modules in, and changes boundaries, imports, or route design accordingly.',
    exampleTitle: 'Bundle triage path',
    exampleCode: `Measure
-> which route is heavy?
-> which chunk owns the cost?
-> why is that dependency in the client?

Fix
-> narrower client boundaries
-> dynamic import
-> smaller library choice
-> server-side ownership when possible`,
    relatedTopics: ['nextjs-code-splitting', 'nextjs-client-components', 'nextjs-monitoring'],
  },
  {
    slug: 'nextjs-debugging',
    title: 'Debugging',
    description: 'Understand how to debug Next.js issues across browser, server, edge, cache, and deployment layers without guessing.',
    concept: 'Debugging in Next.js means proving which layer is failing: route resolution, rendering, cache, auth, browser hydration, deployment config, or an external dependency.',
    why: 'Many Next.js bugs look similar from the browser but come from very different owners. Good debugging shortens incidents and prevents random fixes that make things worse.',
    usage: 'This matters for hydration mismatches, stale pages, auth failures, dynamic-route 404s, bad revalidation, runtime incompatibilities, and deployment-only regressions.',
    workflow: 'Engineers start from the visible symptom, compare direct navigation with client navigation, inspect server and browser signals, trace cache and deployment assumptions, and isolate the first broken boundary before changing code.',
    exampleTitle: 'Debugging order',
    exampleCode: `Symptom
-> direct URL and refresh check
-> server versus browser difference
-> cache and revalidation check
-> route and runtime diagnostics
-> deployment/environment comparison
-> smallest reversible fix`,
    relatedTopics: ['nextjs-monitoring', 'nextjs-incident-handling', 'nextjs-hydration'],
  },
  {
    slug: 'nextjs-incident-handling',
    title: 'Incident Handling',
    description: 'Learn how senior engineers handle Next.js production incidents with evidence, rollback judgment, and low-blast-radius mitigation.',
    concept: 'Incident handling in Next.js combines user-impact triage, route or cache diagnosis, deployment awareness, and clear ownership across frontend, platform, and backend teams.',
    why: 'Next.js incidents often involve multiple layers at once. Teams need an operational model for deciding whether to purge cache, roll back, feature-flag off, or forward-fix safely.',
    usage: 'This appears during auth outages, route 404s after deploy, stale content incidents, broken revalidation, third-party outages, and large performance regressions.',
    workflow: 'The team scopes affected journeys, checks recent changes, isolates the failing layer, chooses the smallest safe mitigation, verifies recovery with user impact metrics, and documents prevention actions.',
    exampleTitle: 'Recovery decision frame',
    exampleCode: `Ask first
-> who is affected?
-> what changed?
-> which layer is failing?

Then choose
-> rollback
-> cache mitigation
-> feature flag
-> forward fix

Always verify
-> route behavior
-> user metrics
-> dependent journeys`,
    relatedTopics: ['nextjs-debugging', 'nextjs-monitoring', 'nextjs-cicd'],
  },
  {
    slug: 'nextjs-performance-bottlenecks',
    title: 'Performance Bottlenecks',
    description: 'Learn how to isolate the real bottleneck in a slow Next.js route instead of optimizing the wrong layer.',
    concept: 'Performance bottlenecks in Next.js can sit in the browser, route rendering, cache misses, data waterfalls, edge logic, external APIs, or oversized bundles. The main skill is attribution.',
    why: 'Teams waste time when they assume every slow route is a frontend problem or every bad metric is a server problem. Attribution comes before optimization.',
    usage: 'This matters in dashboards, content-heavy routes, streaming pages, multi-tenant surfaces, and API-rich product flows where several layers can contribute to latency.',
    workflow: 'Engineers capture route metrics, compare server and browser timing, inspect cache hit behavior, validate data parallelism, and then optimize the dominant layer instead of scattering small tweaks everywhere.',
    exampleTitle: 'Bottleneck attribution model',
    exampleCode: `Possible slow layer
-> edge or request boundary
-> server render and data fetch
-> cache miss and origin pressure
-> bundle and hydration cost
-> browser layout or scripting

Winning move
-> find dominant layer first
-> optimize there with evidence`,
    relatedTopics: ['nextjs-monitoring', 'nextjs-caching', 'nextjs-bundle-optimization'],
  },
  {
    slug: 'nextjs-scalability',
    title: 'Scalability',
    description: 'Understand how Next.js systems scale across routes, teams, regions, cache behavior, and product complexity.',
    concept: 'Scalability in Next.js is not only about traffic. It includes build scale, route-cardinality scale, team ownership, multi-region behavior, and how much dynamic rendering the platform can safely support.',
    why: 'Teams need scalability thinking because route growth, tenant growth, or team growth can break an application long before raw traffic does.',
    usage: 'This matters in enterprise route estates, multilingual content platforms, multi-tenant SaaS applications, and growing product organizations that share one Next.js codebase.',
    workflow: 'Architects classify which concerns scale with traffic, build size, route count, and team autonomy, then choose rendering, cache, ownership, and deployment patterns that constrain blast radius.',
    exampleTitle: 'Scale axes in Next.js',
    exampleCode: `Scale questions
-> more traffic?
-> more dynamic routes?
-> more tenants?
-> more teams?
-> more regions?

Each axis changes
-> cache policy
-> build strategy
-> ownership boundaries
-> deployment and observability needs`,
    relatedTopics: ['nextjs-enterprise-architecture', 'nextjs-caching-strategies', 'nextjs-multi-tenant-applications'],
  },
  {
    slug: 'nextjs-folder-structure',
    title: 'Folder Structure',
    description: 'Learn how Next.js folder structure should reflect route ownership, shared module boundaries, and App Router colocation discipline.',
    concept: 'Folder structure in Next.js is more than aesthetics. It affects how routes are discovered, how code is colocated, and whether teams can keep public module APIs and ownership boundaries clear.',
    why: 'Weak structure leads to accidental routes, unclear imports, and feature code that leaks everywhere. Strong structure improves onboarding and makes scaling the codebase much safer.',
    usage: 'Teams use folder-structure discipline in large App Router codebases, monorepos, design-system integrations, and multi-team product applications.',
    workflow: 'The app organizes route segments, colocated feature code, shared modules, and internal-only folders so route discovery stays predictable and dependency direction is easy to enforce.',
    exampleTitle: 'App Router structure lens',
    exampleCode: `app/
-> route segments and special files

features/
-> domain behavior that supports routes

shared/
-> stable reusable modules

Rule
-> colocate intentionally
-> avoid turning app/ into a global utilities dump`,
    relatedTopics: ['nextjs-app-router', 'nextjs-enterprise-architecture', 'nextjs-project-structure'],
  },
  {
    slug: 'nextjs-multi-tenant-applications',
    title: 'Multi-Tenant Applications',
    description: 'Understand how Next.js multi-tenant systems resolve tenants, protect data boundaries, and avoid cross-tenant cache or routing mistakes.',
    concept: 'A multi-tenant Next.js application serves multiple customers or brands from one codebase while isolating identity, configuration, route behavior, and cache boundaries safely.',
    why: 'Multi-tenant bugs are high risk because the failure mode is often cross-tenant leakage, wrong branding, or route behavior that is correct for one tenant and broken for another.',
    usage: 'Teams use multi-tenant patterns in B2B SaaS, white-label platforms, regionalized product shells, and branded content systems where tenant identity changes runtime behavior.',
    workflow: 'The request resolves tenant identity, tenant-aware auth and config are loaded, routing and rendering stay inside that boundary, and cache keys or tags reflect tenant separation explicitly.',
    exampleTitle: 'Tenant boundary model',
    exampleCode: `Request arrives
-> resolve tenant from host, path, or config
-> load tenant-aware auth and settings
-> render route under tenant boundary
-> use tenant-safe cache identity

Never assume
-> one cache key fits every tenant`,
    relatedTopics: ['nextjs-middleware', 'nextjs-protected-routes', 'nextjs-scalability'],
  },
];

export const nextjsExpandedTopics: Record<string, TopicContent> = Object.fromEntries(
  specs.map((spec) => [spec.slug, topic(spec)])
);
