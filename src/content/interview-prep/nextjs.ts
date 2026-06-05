import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { nextjsInterviewPrepTopicGroups } from './topicNavigation';

type Intent = 'concept' | 'practical' | 'troubleshooting' | 'incident' | 'architecture';

interface TopicSpec {
  category: string;
  topicGroup: string;
  concerns: string[];
  relatedTopics: string[];
}

interface TopicProfile {
  mechanism: string;
  implementation: string;
  failure: string;
  decision: string;
  incident: string;
  evidence: [string, string, string];
}

const topicSpecs: TopicSpec[] = [
  { category: 'Introduction to Next.js', topicGroup: 'Fundamentals', concerns: ['Next.js responsibilities beyond React', 'framework conventions versus custom infrastructure', 'server and client execution environments', 'choosing Next.js for an enterprise product', 'upgrading across major Next.js versions'], relatedTopics: ['app-router', 'rendering-strategy', 'enterprise-nextjs'] },
  { category: 'Pages Router', topicGroup: 'Fundamentals', concerns: ['Pages Router request lifecycle', 'Pages Router data-fetching boundaries', '_app and _document responsibilities', 'API Routes in Pages Router', 'migrating Pages Router features to App Router'], relatedTopics: ['app-router', 'get-server-side-props', 'api-routes'] },
  { category: 'App Router', topicGroup: 'Fundamentals', concerns: ['App Router mental model', 'route segment configuration', 'server-first rendering boundaries', 'App Router data and cache behavior', 'migrating incrementally from Pages Router', 'App Router production trade-offs', 'dynamic rendering triggers'], relatedTopics: ['server-components', 'layouts', 'caching'] },
  { category: 'Routing', topicGroup: 'Fundamentals', concerns: ['nested route ownership', 'dynamic route parameters', 'search parameters as durable state', 'redirects and not-found handling', 'route groups and URL structure', 'navigation prefetching', 'internationalized routing strategy'], relatedTopics: ['file-based-routing', 'layouts', 'middleware'] },
  { category: 'File-based Routing', topicGroup: 'Fundamentals', concerns: ['route files and segment conventions', 'dynamic catch-all routes', 'private folders and route groups', 'colocation without accidental routes', 'route conflict diagnosis'], relatedTopics: ['routing', 'app-router', 'folder-structure'] },

  { category: 'SSR', topicGroup: 'Rendering', concerns: ['request-time rendering decisions', 'SSR caching and personalization', 'SSR capacity and origin protection', 'SSR failure and timeout handling', 'SSR versus static rendering', 'SSR observability', 'preventing hydration mismatch after SSR'], relatedTopics: ['ssg', 'csr', 'caching'] },
  { category: 'SSG', topicGroup: 'Rendering', concerns: ['build-time rendering decisions', 'static generation at enterprise scale', 'build-time data failures', 'static content freshness', 'SSG versus ISR', 'static generation for localized routes'], relatedTopics: ['isr', 'get-static-props', 'get-static-paths'] },
  { category: 'ISR', topicGroup: 'Rendering', concerns: ['ISR regeneration lifecycle', 'time-based revalidation', 'on-demand revalidation', 'ISR failure behavior', 'stale content during regeneration', 'ISR at high route cardinality', 'coordinating dependent page regeneration'], relatedTopics: ['revalidation', 'ssg', 'caching'] },
  { category: 'CSR', topicGroup: 'Rendering', concerns: ['choosing client-side rendering', 'CSR loading and error states', 'client-side server-state caching', 'CSR SEO and crawlability trade-offs', 'CSR bundle and device cost'], relatedTopics: ['server-components', 'fetch-api', 'performance-bottlenecks'] },
  { category: 'Streaming', topicGroup: 'Rendering', concerns: ['streaming and progressive reveal', 'Suspense boundary placement', 'avoiding streaming waterfalls', 'streaming failure recovery', 'measuring streaming user experience', 'streaming with personalized content'], relatedTopics: ['loading-ui', 'server-components', 'error-handling'] },
  { category: 'Server Components', topicGroup: 'Rendering', concerns: ['Server Component execution model', 'server and client component boundaries', 'serializable prop contracts', 'server-only data access', 'reducing client JavaScript with RSC', 'RSC caching and freshness', 'RSC security boundaries', 'migrating client-heavy components'], relatedTopics: ['client-components', 'app-router', 'hydration'] },

  { category: 'getServerSideProps', topicGroup: 'Data Fetching', concerns: ['getServerSideProps request lifecycle', 'authentication in getServerSideProps', 'caching getServerSideProps responses', 'handling failures and redirects', 'migrating getServerSideProps to App Router'], relatedTopics: ['ssr', 'pages-router', 'server-components'] },
  { category: 'getStaticProps', topicGroup: 'Data Fetching', concerns: ['getStaticProps build lifecycle', 'revalidate behavior in getStaticProps', 'build-time secret access', 'handling source failures during builds', 'migrating getStaticProps to App Router'], relatedTopics: ['ssg', 'isr', 'pages-router'] },
  { category: 'getStaticPaths', topicGroup: 'Data Fetching', concerns: ['getStaticPaths route generation', 'fallback modes and user behavior', 'controlling high-cardinality path generation', 'localized static paths', 'migrating getStaticPaths to generateStaticParams'], relatedTopics: ['ssg', 'isr', 'file-based-routing'] },
  { category: 'Fetch API', topicGroup: 'Data Fetching', concerns: ['server-side fetch behavior', 'request memoization and deduplication', 'fetch caching and freshness', 'parallel versus sequential data fetching', 'request cancellation and timeouts', 'handling third-party API failures', 'avoiding data waterfalls'], relatedTopics: ['caching', 'revalidation', 'server-components'] },
  { category: 'Server Actions', topicGroup: 'Data Fetching', concerns: ['Server Action execution and invocation', 'authorization inside Server Actions', 'input validation and safe mutation', 'optimistic UI with Server Actions', 'revalidation after mutations', 'idempotency and duplicate submissions', 'error handling and progressive enhancement', 'Server Actions versus Route Handlers'], relatedTopics: ['route-handlers', 'revalidation', 'protected-routes'] },

  { category: 'Layouts', topicGroup: 'App Router', concerns: ['persistent layout behavior', 'nested layout ownership', 'data access in layouts', 'layout state preservation', 'root layout responsibilities', 'avoiding oversized shared layouts'], relatedTopics: ['templates', 'routing', 'app-router'] },
  { category: 'Templates', topicGroup: 'App Router', concerns: ['templates versus layouts', 'intentional remounting with templates', 'template lifecycle and state reset', 'template use cases and misuse'], relatedTopics: ['layouts', 'routing', 'app-router'] },
  { category: 'Loading UI', topicGroup: 'App Router', concerns: ['loading.tsx behavior', 'meaningful loading boundary placement', 'avoiding fallback flashes', 'accessible loading states', 'loading UI for slow dependencies'], relatedTopics: ['streaming', 'error-handling', 'app-router'] },
  { category: 'Error Handling', topicGroup: 'App Router', concerns: ['error.tsx boundary behavior', 'global error recovery', 'expected errors versus exceptions', 'not-found handling', 'error observability and correlation', 'recoverable versus fatal route failures'], relatedTopics: ['loading-ui', 'debugging', 'incident-handling'] },
  { category: 'Parallel Routes', topicGroup: 'App Router', concerns: ['parallel route slot behavior', 'independent loading and error states', 'default.tsx fallback behavior', 'parallel route navigation state', 'parallel route complexity trade-offs'], relatedTopics: ['intercepting-routes', 'layouts', 'routing'] },
  { category: 'Intercepting Routes', topicGroup: 'App Router', concerns: ['intercepting route behavior', 'modal routes with shareable URLs', 'refresh behavior for intercepted content', 'interception conventions', 'accessible modal route recovery'], relatedTopics: ['parallel-routes', 'routing', 'layouts'] },

  { category: 'Client Components', topicGroup: 'Server Components', concerns: ['use client boundary behavior', 'client component bundle ownership', 'passing data from server to client', 'browser API and interaction ownership', 'preventing oversized client boundaries', 'client component state and hydration'], relatedTopics: ['server-components', 'hydration', 'bundle-optimization'] },
  { category: 'Rendering Strategy', topicGroup: 'Server Components', concerns: ['choosing rendering per route', 'static versus dynamic rendering signals', 'personalization and cacheability', 'hybrid rendering for enterprise journeys', 'rendering strategy governance', 'measuring rendering cost'], relatedTopics: ['ssr', 'ssg', 'server-components'] },
  { category: 'Hydration', topicGroup: 'Server Components', concerns: ['hydration consistency', 'hydration mismatch diagnosis', 'browser-only values during hydration', 'third-party scripts and hydration', 'reducing hydration work', 'partial interactivity boundaries'], relatedTopics: ['client-components', 'server-components', 'debugging'] },

  { category: 'API Routes', topicGroup: 'API Development', concerns: ['API Route request lifecycle', 'API Route authentication and validation', 'API Route runtime limits', 'API Route error contracts', 'migrating API Routes to Route Handlers'], relatedTopics: ['route-handlers', 'pages-router', 'middleware'] },
  { category: 'Route Handlers', topicGroup: 'API Development', concerns: ['Route Handler request and response model', 'Route Handler caching behavior', 'authorization and validation', 'streaming responses from Route Handlers', 'webhooks and signature verification', 'Route Handlers versus Server Actions', 'runtime selection for handlers'], relatedTopics: ['server-actions', 'middleware', 'edge-runtime'] },
  { category: 'Middleware', topicGroup: 'API Development', concerns: ['Middleware and modern Proxy responsibility', 'request matching and exclusions', 'authentication checks at the request boundary', 'rewrites redirects and headers', 'middleware latency and runtime limits', 'avoiding business logic in middleware'], relatedTopics: ['protected-routes', 'edge-runtime', 'routing'] },
  { category: 'Edge Runtime', topicGroup: 'API Development', concerns: ['Edge Runtime constraints', 'choosing Node versus Edge runtime', 'edge latency and data locality', 'Edge Runtime dependency compatibility', 'edge observability and failure handling'], relatedTopics: ['middleware', 'route-handlers', 'scalability'] },

  { category: 'NextAuth', topicGroup: 'Authentication', concerns: ['NextAuth provider and callback design', 'session strategy selection', 'authorization beyond authentication', 'NextAuth secret and cookie security', 'provider failure handling', 'NextAuth in App Router'], relatedTopics: ['session-management', 'jwt', 'protected-routes'] },
  { category: 'JWT', topicGroup: 'Authentication', concerns: ['JWT validation and trust boundaries', 'JWT storage and cookie security', 'token expiry and rotation', 'revocation limitations', 'JWT claims and authorization misuse'], relatedTopics: ['session-management', 'protected-routes', 'middleware'] },
  { category: 'Session Management', topicGroup: 'Authentication', concerns: ['database versus token sessions', 'secure session cookies', 'session refresh and expiry', 'session consistency across regions', 'logout and revocation', 'session observability'], relatedTopics: ['nextauth', 'jwt', 'multi-tenant-applications'] },
  { category: 'Protected Routes', topicGroup: 'Authentication', concerns: ['authentication versus authorization', 'protecting server data and mutations', 'route-level access checks', 'middleware-only protection risks', 'preventing unauthorized cached responses', 'tenant-aware authorization'], relatedTopics: ['middleware', 'server-actions', 'multi-tenant-applications'] },

  { category: 'Image Optimization', topicGroup: 'Performance', concerns: ['next/image delivery behavior', 'responsive image sizing', 'remote image security configuration', 'image layout stability', 'image optimization cost and caching', 'priority and loading decisions'], relatedTopics: ['caching', 'performance-bottlenecks', 'vercel'] },
  { category: 'Caching', topicGroup: 'Performance', concerns: ['Next.js cache layers', 'Cache Components and cache boundaries', 'request memoization versus persistent cache', 'private and personalized data caching', 'cache tags and ownership', 'debugging stale cached output', 'cache stampede prevention', 'multi-region cache consistency'], relatedTopics: ['revalidation', 'fetch-api', 'isr'] },
  { category: 'Revalidation', topicGroup: 'Performance', concerns: ['time-based revalidation', 'tag-based revalidation', 'path-based revalidation', 'revalidateTag versus updateTag semantics', 'revalidation after Server Actions', 'dependent content invalidation', 'revalidation failure observability'], relatedTopics: ['caching', 'isr', 'server-actions'] },
  { category: 'Code Splitting', topicGroup: 'Performance', concerns: ['route-level code splitting', 'dynamic imports for client features', 'loading waterfalls from excessive splitting', 'preloading intentional journeys', 'code splitting third-party libraries'], relatedTopics: ['bundle-optimization', 'client-components', 'performance-bottlenecks'] },
  { category: 'Bundle Optimization', topicGroup: 'Performance', concerns: ['analyzing server and client bundles', 'preventing server code in client bundles', 'dependency import cost', 'third-party script governance', 'bundle budgets and regression gates', 'optimizing shared chunks'], relatedTopics: ['code-splitting', 'client-components', 'monitoring'] },

  { category: 'Vercel', topicGroup: 'Deployment', concerns: ['Vercel deployment lifecycle', 'preview deployment governance', 'runtime and region configuration', 'Vercel cache and revalidation behavior', 'rollback and promotion strategy'], relatedTopics: ['ci-cd', 'environment-variables', 'monitoring'] },
  { category: 'CI/CD', topicGroup: 'Deployment', concerns: ['Next.js pipeline quality gates', 'build and runtime validation', 'preview environment testing', 'safe database and API contract changes', 'canary rollout and rollback', 'dependency and framework update governance'], relatedTopics: ['vercel', 'monitoring', 'incident-handling'] },
  { category: 'Environment Variables', topicGroup: 'Deployment', concerns: ['server-only versus public environment variables', 'NEXT_PUBLIC build-time exposure', 'environment variable validation', 'secret rotation', 'environment drift diagnosis', 'runtime configuration trade-offs'], relatedTopics: ['ci-cd', 'debugging', 'protected-routes'] },

  { category: 'Debugging', topicGroup: 'Production Support', concerns: ['debugging server versus client failures', 'source maps and production stacks', 'debugging stale cache behavior', 'debugging hydration mismatch', 'debugging route resolution', 'debugging failed Server Actions', 'debugging environment differences'], relatedTopics: ['monitoring', 'incident-handling', 'error-handling'] },
  { category: 'Monitoring', topicGroup: 'Production Support', concerns: ['Next.js service-level indicators', 'correlating browser server and edge telemetry', 'monitoring cache effectiveness', 'monitoring Server Actions and Route Handlers', 'Core Web Vitals and business journeys', 'alert quality and ownership'], relatedTopics: ['debugging', 'performance-bottlenecks', 'incident-handling'] },
  { category: 'Incident Handling', topicGroup: 'Production Support', concerns: ['Next.js incident triage', 'rollback versus forward fix', 'cache purge risk during incidents', 'third-party dependency outage', 'framework upgrade regression', 'post-incident prevention and ownership'], relatedTopics: ['monitoring', 'debugging', 'ci-cd'] },
  { category: 'Performance Bottlenecks', topicGroup: 'Production Support', concerns: ['separating edge server browser and API latency', 'slow Server Component diagnosis', 'uncacheable route diagnosis', 'bundle and hydration regression', 'data-fetching waterfall diagnosis', 'high-cardinality rendering cost', 'production performance regression gates'], relatedTopics: ['monitoring', 'caching', 'bundle-optimization'] },

  { category: 'Enterprise Next.js', topicGroup: 'Architecture', concerns: ['enterprise platform boundaries', 'frontend governance and golden paths', 'shared authentication and observability', 'framework upgrade operating model', 'product-team autonomy versus standards', 'enterprise rendering and cache policy'], relatedTopics: ['scalability', 'folder-structure', 'ci-cd'] },
  { category: 'Scalability', topicGroup: 'Architecture', concerns: ['scaling traffic and origin protection', 'scaling builds and route cardinality', 'scaling teams and ownership', 'multi-region architecture', 'cost-aware rendering strategy', 'dependency and platform scaling'], relatedTopics: ['enterprise-nextjs', 'caching', 'multi-tenant-applications'] },
  { category: 'Folder Structure', topicGroup: 'Architecture', concerns: ['feature and domain organization', 'App Router colocation boundaries', 'public module APIs', 'shared code ownership', 'monorepo package boundaries', 'enforcing dependency direction'], relatedTopics: ['enterprise-nextjs', 'scalability', 'app-router'] },
  { category: 'Multi-Tenant Applications', topicGroup: 'Architecture', concerns: ['tenant resolution and request routing', 'tenant-aware authorization', 'tenant data isolation', 'tenant branding and configuration', 'tenant cache isolation', 'tenant onboarding and operations', 'multi-tenant failure blast radius'], relatedTopics: ['protected-routes', 'middleware', 'scalability'] },
];

const groupProfiles: Record<string, TopicProfile> = {
  Fundamentals: {
    mechanism: 'Next.js composes routing, rendering, data access, build output, runtime behavior, and deployment conventions around React.',
    implementation: 'Use framework conventions deliberately, keep route and ownership boundaries explicit, and test direct navigation plus server and client behavior.',
    failure: 'a framework convention is misunderstood and the route works locally but fails under production navigation, rendering, or deployment conditions',
    decision: 'which capability Next.js should own and which belongs to application or platform infrastructure',
    incident: 'a route works during client navigation but fails on refresh or after deployment',
    evidence: ['route build output', 'server and browser logs', 'direct-navigation and deployment checks'],
  },
  Rendering: {
    mechanism: 'Next.js rendering strategy determines where and when HTML, React Server Component payloads, and client JavaScript are produced and cached.',
    implementation: 'Choose rendering from freshness, personalization, capacity, crawlability, and failure requirements; then validate cache and hydration behavior.',
    failure: 'the selected rendering mode creates stale output, origin pressure, hydration defects, or unacceptable user latency',
    decision: 'which rendering mode meets the journey SLA with the lowest operational complexity and cost',
    incident: 'p95 response time and origin load spike after a route unexpectedly becomes dynamic',
    evidence: ['route rendering and cache diagnostics', 'server timing and origin metrics', 'RUM and hydration telemetry'],
  },
  'Data Fetching': {
    mechanism: 'Next.js data fetching coordinates server execution, request identity, caching, revalidation, errors, and mutation consistency.',
    implementation: 'Fetch at the owning boundary, parallelize independent work, validate and authorize mutations, and make freshness and failure behavior explicit.',
    failure: 'a waterfall, stale cache, unauthorized mutation, or duplicate request degrades a critical journey',
    decision: 'which boundary owns data consistency, cache identity, authorization, and recovery',
    incident: 'a release doubles API traffic and users receive inconsistent data after a mutation',
    evidence: ['network and server fetch trace', 'cache and revalidation diagnostics', 'mutation and authorization logs'],
  },
  'App Router': {
    mechanism: 'App Router route files define persistent layouts, remounting templates, loading and error boundaries, and advanced route composition.',
    implementation: 'Align route boundaries with user journeys and ownership, then test navigation, refresh, recovery, and accessibility.',
    failure: 'route composition creates lost state, fallback waterfalls, inaccessible overlays, or recovery gaps',
    decision: 'which route boundary owns layout persistence, loading, error isolation, and navigation state',
    incident: 'a route migration introduces blank loading states and unrecoverable navigation errors',
    evidence: ['route tree and navigation trace', 'loading and error boundary behavior', 'direct-link and accessibility tests'],
  },
  'Server Components': {
    mechanism: 'Server and Client Components divide server data access and rendering from browser interactivity and hydration.',
    implementation: 'Keep client boundaries narrow, pass serializable data, protect server-only capabilities, and inspect bundle and hydration impact.',
    failure: 'a broad client boundary increases bundle size, duplicates data fetching, or exposes a server-only assumption',
    decision: 'where interactivity justifies client JavaScript and where server ownership improves security, performance, and simplicity',
    incident: 'a shared client boundary adds hundreds of kilobytes and causes hydration errors across key routes',
    evidence: ['server and client bundle analysis', 'RSC and hydration trace', 'component-boundary inventory'],
  },
  'API Development': {
    mechanism: 'Next.js request boundaries include Route Handlers, legacy API Routes, Proxy or middleware-style request processing, and runtime selection.',
    implementation: 'Authenticate and validate at the owning handler, keep request-boundary logic narrow, define runtime constraints, and expose observable error contracts.',
    failure: 'an endpoint is exposed, slow, incompatible with its runtime, or difficult to recover during production incidents',
    decision: 'which request boundary and runtime provide the clearest security, latency, compatibility, and ownership model',
    incident: 'an endpoint returns unauthorized data or fails only in the deployed runtime',
    evidence: ['request and authorization logs', 'runtime and dependency diagnostics', 'negative security and latency tests'],
  },
  Authentication: {
    mechanism: 'Authentication establishes identity while authorization, session lifecycle, and tenant-aware checks determine permitted server data and mutations.',
    implementation: 'Use secure cookies or validated tokens, authorize at every server capability, prevent sensitive caching, and make revocation observable.',
    failure: 'a valid identity reaches data or actions it is not authorized to use, or cached private output crosses a user boundary',
    decision: 'which session strategy and authorization boundary meet security, revocation, scale, and operational requirements',
    incident: 'a penetration test retrieves another tenant’s data through an authenticated route',
    evidence: ['session and authorization trace', 'negative access tests', 'cookie token and cache configuration'],
  },
  Performance: {
    mechanism: 'Next.js performance combines delivery, cache effectiveness, server work, RSC and client payloads, hydration, images, and browser execution.',
    implementation: 'Start with user metrics, isolate the dominant layer, correct architecture before micro-optimization, and enforce regression budgets.',
    failure: 'optimization adds complexity while the actual user bottleneck or cache miss remains unchanged',
    decision: 'which performance budget and optimization cost are justified for each business journey',
    incident: 'mobile interaction latency doubles and cache hit ratio drops sharply after a release',
    evidence: ['Core Web Vitals and RUM', 'bundle route and cache analysis', 'server and browser performance traces'],
  },
  Deployment: {
    mechanism: 'Next.js deployment promotes build artifacts, runtime configuration, functions, cache behavior, and platform settings through controlled environments.',
    implementation: 'Promote reviewed artifacts, validate environment and runtime assumptions, use preview evidence, and define rollback or forward-fix criteria.',
    failure: 'a deployment succeeds technically but fails because configuration, cache, runtime, or dependent contracts differ in production',
    decision: 'which release evidence and controls are required before production promotion',
    incident: 'the production deployment completes but critical routes fail because an environment or runtime assumption changed',
    evidence: ['pipeline and build output', 'environment and deployment history', 'post-deployment journey and runtime checks'],
  },
  'Production Support': {
    mechanism: 'Next.js production support correlates user impact across browser, edge, server, cache, deployment, and dependency layers.',
    implementation: 'Preserve evidence, scope the affected cohort, isolate the owner, apply the smallest reversible mitigation, and verify recovery with user metrics.',
    failure: 'teams remove symptoms without proving the failing layer or preventing recurrence',
    decision: 'which telemetry, ownership, and recovery controls make the service supportable',
    incident: 'customer error rate rises after a release while the first alerts do not identify the failing layer',
    evidence: ['user-impact and session telemetry', 'deployment and dependency timeline', 'edge server and browser diagnostics'],
  },
  Architecture: {
    mechanism: 'Enterprise Next.js architecture coordinates domain ownership, rendering, security, caching, team autonomy, deployment, observability, and cost.',
    implementation: 'Define platform contracts, owned boundaries, measurable guardrails, exception paths, and a sustainable upgrade and support model.',
    failure: 'shared capability creates organization-wide coupling, inconsistent security, or an upgrade bottleneck',
    decision: 'where standardization creates leverage and where teams require deliberate autonomy',
    incident: 'a platform-wide change blocks independent releases and expands the blast radius across products or tenants',
    evidence: ['dependency and ownership graph', 'release performance and incident metrics', 'architecture fitness and cost dashboards'],
  },
};

const categoryProfiles: Record<string, TopicProfile> = {
  'App Router': {
    mechanism: 'The App Router builds a route tree from segments and special files, with Server Components by default plus nested layouts, loading, error, and data-cache boundaries.',
    implementation: 'Design segments around durable experience ownership, keep client boundaries narrow, and validate static or dynamic behavior, navigation, refresh, loading, and recovery.',
    failure: 'a segment unexpectedly becomes dynamic, remounts state, or creates a loading and error boundary that does not match the user journey',
    decision: 'how route segments align rendering, data ownership, layout persistence, recovery, and team ownership',
    incident: 'an App Router migration increases origin load and introduces blank navigation states on critical routes',
    evidence: ['route tree and build diagnostics', 'server component and navigation trace', 'cache loading and error-boundary behavior'],
  },
  'Server Components': {
    mechanism: 'A React Server Component executes on the server and contributes to the RSC payload without shipping its module to the browser; a client boundary brings its transitive client dependencies into the interactive bundle.',
    implementation: 'Fetch and render server-owned data in Server Components, keep use-client boundaries at the smallest interactive subtree, pass serializable props, and protect server-only modules.',
    failure: 'a broad client boundary ships unnecessary JavaScript, duplicates data fetching, or exposes a server-only assumption',
    decision: 'where browser interactivity is genuinely required and where server ownership improves security, payload size, and data access',
    incident: 'a shared use-client boundary adds hundreds of kilobytes to every route and causes duplicate client requests after hydration',
    evidence: ['server and client bundle analysis', 'RSC payload and network trace', 'component boundary and server-only import audit'],
  },
  'Client Components': {
    mechanism: 'A Client Component is rendered into the initial response but also participates in hydration and browser interaction; the use-client boundary includes all transitively imported client modules.',
    implementation: 'Use Client Components for state, effects, event handlers, and browser APIs while keeping data access and non-interactive composition on the server when practical.',
    failure: 'a high-level client boundary expands bundle and hydration work across an otherwise server-rendered tree',
    decision: 'which smallest subtree owns interactivity without making server data and static composition client responsibilities',
    incident: 'interaction readiness and mobile performance regress after a layout is marked as a Client Component',
    evidence: ['client bundle module graph', 'hydration and interaction timing', 'server-to-client prop contract'],
  },
  'Server Actions': {
    mechanism: 'A Server Action is a server-side mutation capability invoked through a framework-managed request; it remains an externally invocable server boundary and must enforce its own security and consistency.',
    implementation: 'Authenticate and authorize inside the action, validate untrusted inputs, make duplicate submission safe, handle expected errors, and revalidate only the affected cache identities.',
    failure: 'a hidden or replayed action performs an unauthorized or duplicate mutation and leaves cached views inconsistent',
    decision: 'whether the mutation belongs in a Server Action, Route Handler, or external API based on consumers, contracts, security, and observability',
    incident: 'a user invokes a mutation not offered by the UI and repeated submission creates duplicate business records',
    evidence: ['action authorization and audit log', 'mutation idempotency and validation tests', 'cache revalidation and affected-view trace'],
  },
  Caching: {
    mechanism: 'Modern Next.js caching coordinates request memoization, framework-managed data and route output, Cache Components with use-cache boundaries, and platform or CDN behavior; each layer has a distinct identity and freshness contract.',
    implementation: 'Classify public versus private data, define cache keys and lifetimes, use explicit cache boundaries and tags, and prove invalidation, failure, and multi-region behavior.',
    failure: 'private or stale data is served from the wrong cache identity, or a cache miss surge overloads the origin',
    decision: 'which work may be reused, for how long, by whom, and which event or owner makes it stale',
    incident: 'cache-hit ratio falls from 93% to 38% and one tenant briefly receives output derived from another tenant context',
    evidence: ['cache status tags and route diagnostics', 'origin request and hit-ratio metrics', 'cache identity and invalidation trace'],
  },
  Revalidation: {
    mechanism: 'Revalidation changes cached-data freshness: time-based policies expire by age, path and tag APIs target related output, revalidateTag with a cache-life profile supports stale-while-revalidate, and updateTag provides immediate read-your-writes expiry from Server Actions.',
    implementation: 'Assign tags and paths from content ownership, select stale-while-revalidate or immediate expiry deliberately, trigger revalidation after accepted mutations, and observe failures.',
    failure: 'users see stale related content or a broad invalidation causes a regeneration and origin-request surge',
    decision: 'which freshness guarantee each mutation or content event requires and who owns the dependency graph',
    incident: 'a product update appears in the editor but remains stale across dependent pages, while emergency broad revalidation triples origin load',
    evidence: ['tag path and cache-life configuration', 'mutation and revalidation logs', 'source-versus-rendered freshness checks'],
  },
  Streaming: {
    mechanism: 'Streaming sends available route output progressively while Suspense boundaries coordinate which subtrees reveal later, allowing slow work to stop blocking the entire response.',
    implementation: 'Place Suspense boundaries around meaningful user tasks, parallelize independent data, preserve accessible loading and error recovery, and measure reveal order.',
    failure: 'nested boundaries serialize data or flash fallbacks, so the main experience remains blank despite fast independent work',
    decision: 'where progressive reveal improves perceived latency without causing confusing replacement, layout movement, or recovery gaps',
    incident: 'a route streams quickly at the protocol level but users wait several seconds for useful content because of a fallback waterfall',
    evidence: ['server timing and streamed response trace', 'Suspense reveal and data waterfall', 'RUM and abandonment metrics'],
  },
  Hydration: {
    mechanism: 'Hydration attaches client behavior to server-rendered HTML and requires the initial browser render to match the server output before later updates.',
    implementation: 'Make initial output deterministic, isolate browser-only values and third-party DOM changes, keep client boundaries narrow, and treat warnings as release defects.',
    failure: 'React replaces markup or attaches behavior to an inconsistent tree, producing subtle interaction failures',
    decision: 'which subtree needs hydration and how deterministic server-to-client state is guaranteed',
    incident: 'production reports hydration warnings and intermittent broken controls only for particular locales and browser extensions',
    evidence: ['server HTML and initial client output comparison', 'hydration warning and component stack', 'client-boundary and third-party mutation trace'],
  },
  Middleware: {
    mechanism: 'Modern Next.js calls the former Middleware request-boundary convention Proxy; it runs before route rendering for matching, redirects, rewrites, and lightweight request decisions.',
    implementation: 'Match only required requests, exclude static and internal assets, keep work low-latency, and repeat authorization at the data or mutation boundary.',
    failure: 'broad matching adds latency or request-boundary checks are mistaken for complete authorization',
    decision: 'which request-wide concern belongs before routing and which must remain inside the server capability that owns protected data',
    incident: 'a broad request matcher increases latency on static assets and an authenticated request bypasses missing resource-level authorization',
    evidence: ['request match and rewrite trace', 'latency by matched path', 'negative authorization tests at server capabilities'],
  },
  'Edge Runtime': {
    mechanism: 'The Edge Runtime executes near distributed request entry points with a restricted Web API-oriented environment and different dependency, connection, and observability constraints from Node.js.',
    implementation: 'Choose Edge only when latency and locality justify it, verify dependency compatibility and data proximity, and design timeouts, fallbacks, and telemetry for the runtime.',
    failure: 'a Node-dependent library or distant database makes the edge path fail or slower than the regional Node runtime',
    decision: 'whether edge locality outweighs dependency compatibility, data distance, cost, and operational complexity',
    incident: 'an edge-deployed handler fails only in production because a dependency requires Node APIs and database latency dominates the request',
    evidence: ['runtime and dependency compatibility report', 'regional latency and data-location trace', 'edge logs and fallback behavior'],
  },
  'Protected Routes': {
    mechanism: 'A protected route may hide navigation, but real authorization must be enforced where server data is read and mutations execute; request-boundary checks alone are insufficient.',
    implementation: 'Authenticate identity, authorize the resource and action at every server boundary, isolate private caching, and test denied access across direct requests.',
    failure: 'an authenticated user directly invokes a server capability or receives cached data they are not authorized to access',
    decision: 'where authorization policy is centralized without creating a single brittle enforcement point',
    incident: 'a penetration test bypasses UI and route checks to read another tenant’s server-rendered data',
    evidence: ['negative direct-request tests', 'server authorization and audit logs', 'private cache and tenant-boundary review'],
  },
  'Environment Variables': {
    mechanism: 'Server environment variables are read by server code, while NEXT_PUBLIC values are intentionally inlined into client bundles at build time and cannot be treated as secrets or mutable runtime configuration.',
    implementation: 'Validate required variables at startup or build, expose only intentionally public values, rotate secrets through the platform, and document build-time versus runtime ownership.',
    failure: 'a secret is exposed in a client bundle or production behavior differs because a value was baked during an earlier build',
    decision: 'which configuration is public build-time data, server runtime configuration, a secret, or business-managed content',
    incident: 'a client bundle exposes an internal value and a promoted artifact still contains the staging public endpoint',
    evidence: ['build and runtime environment manifest', 'client bundle search and secret scan', 'deployment configuration history'],
  },
  'Multi-Tenant Applications': {
    mechanism: 'A multi-tenant Next.js platform resolves tenant identity into routing, authorization, data, branding, cache keys, observability, and operational ownership.',
    implementation: 'Resolve tenant identity from a trusted boundary, enforce tenant-aware server authorization, isolate caches and data, and automate onboarding and offboarding.',
    failure: 'content, cache output, or privileged mutation crosses a tenant boundary and expands the platform-wide blast radius',
    decision: 'which capabilities are shared safely and where tenant isolation requires separate data, cache, runtime, or release boundaries',
    incident: 'one tenant receives another tenant’s branded cached page after a routing and revalidation change',
    evidence: ['tenant resolution and authorization trace', 'tenant-aware cache keys and isolation tests', 'cross-tenant incident and ownership telemetry'],
  },
};

const intents: Intent[] = ['concept', 'practical', 'troubleshooting', 'incident', 'architecture'];
const intentTypes: Record<Intent, string> = {
  concept: 'Conceptual Questions',
  practical: 'Practical Questions',
  troubleshooting: 'Troubleshooting Questions',
  incident: 'Production Support Questions',
  architecture: 'Architecture Questions',
};
const difficulties: Record<Intent, InterviewPrepQuestion['difficultyLevel']> = {
  concept: 'Beginner', practical: 'Intermediate', troubleshooting: 'Advanced', incident: 'Advanced', architecture: 'Architect',
};
const experiences: Record<Intent, InterviewPrepQuestion['experienceLevel']> = {
  concept: 'beginner', practical: 'mid', troubleshooting: 'senior', incident: 'senior', architecture: 'architect',
};

const industries = ['retail', 'banking', 'healthcare', 'media', 'telecom', 'SaaS'];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hash(value: string) {
  return Array.from(value).reduce((result, character) => ((result * 31) + character.charCodeAt(0)) >>> 0, 2166136261);
}

function list(items: string[]) {
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

function concernGuidance(concern: string, profile: TopicProfile) {
  const rules: Array<[RegExp, string]> = [
    [/cache|revalidat|isr|static content freshness/i, 'Define the cache identity, freshness SLA, invalidation owner, private-data boundary, and behavior when regeneration fails.'],
    [/server action|mutation|webhook/i, 'Authenticate and authorize inside the server capability, validate untrusted input, make duplicate submission safe, and revalidate only affected data.'],
    [/server and client|client boundar|use client|serializable/i, 'Keep the client boundary at the smallest interactive subtree, pass serializable values, and inspect the transitive client bundle before release.'],
    [/hydration/i, 'Make the first server and client render deterministic, isolate browser-only values, and treat every hydration warning as a release defect.'],
    [/middleware|proxy responsibility|request matching/i, 'Keep the request boundary narrow and fast, exclude static and internal paths deliberately, and repeat authorization at the server data or mutation boundary.'],
    [/auth|session|jwt|protected|tenant-aware authorization/i, 'Separate identity from authorization, validate every server-side capability, secure cookies or tokens, and prove denied access through negative tests.'],
    [/stream|suspense|loading/i, 'Place progressive-reveal boundaries around meaningful user tasks, avoid sequential waterfalls, and preserve accessible recovery behavior.'],
    [/route|routing|layout|template|parallel|intercept/i, 'Design the route tree around durable URL and ownership boundaries, then test navigation, refresh, fallback, error, and accessibility behavior.'],
    [/image|bundle|code splitting|performance|bottleneck/i, 'Start from a user-impact metric, identify the dominant delivery or execution cost, change one boundary, and prove the improvement under production-like conditions.'],
    [/environment|secret|ci\/cd|deployment|vercel/i, 'Promote a reviewed artifact with validated environment contracts, keep secrets server-only, and define post-deployment checks plus rollback criteria.'],
    [/debug|monitor|incident/i, 'Preserve the cross-layer timeline, scope affected users, isolate browser, edge, server, cache, and dependency evidence, then add a durable guardrail.'],
    [/multi-tenant|tenant/i, 'Resolve tenant identity early, enforce tenant-aware authorization and cache isolation, and design onboarding and failure containment as platform capabilities.'],
    [/scal|enterprise|govern|platform|folder|ownership/i, 'Define owned boundaries, supported patterns, measurable guardrails, exception handling, and a sustainable framework-upgrade operating model.'],
    [/edge runtime|node versus edge|data locality/i, 'Choose the runtime from dependency compatibility, data locality, latency, observability, and failure requirements instead of assuming edge is always faster.'],
  ];
  return rules.find(([pattern]) => pattern.test(concern))?.[1] ?? `${profile.implementation} For ${concern}, document the owner, runtime contract, failure mode, and validation evidence separately.`;
}

function questionText(intent: Intent, concern: string, category: string) {
  const values: Record<Intent, string> = {
    concept: `Explain ${concern} in modern Next.js ${category}. What misconception causes production defects?`,
    practical: `How would you implement and validate ${concern} for Next.js ${category} in production?`,
    troubleshooting: `How would you troubleshoot a failure involving ${concern} in ${category}?`,
    incident: `A Next.js ${category} production incident exposes a weakness in ${concern}. How would you respond and prevent recurrence?`,
    architecture: `How would you make and govern an architecture decision about ${concern} in Next.js ${category}?`,
  };
  return values[intent];
}

function buildQuestion(spec: TopicSpec, concern: string, intent: Intent, index: number): InterviewPrepQuestion {
  const profile = categoryProfiles[spec.category] ?? groupProfiles[spec.topicGroup];
  const question = questionText(intent, concern, spec.category);
  const valueHash = hash(question);
  const industry = industries[valueHash % industries.length];
  const guidance = concernGuidance(concern, profile);
  const direct = intent === 'concept'
    ? `${profile.mechanism} For ${concern}, the important contract is: ${guidance}`
    : intent === 'practical'
      ? `Implement ${concern} through this production approach: ${guidance}`
      : intent === 'architecture'
        ? `Treat ${concern} as an explicit architecture and operating-model decision: ${profile.decision}.`
        : `Preserve evidence and isolate the owning layer before changing ${concern}; then correct the narrow cause and add recurrence protection.`;
  const detailed: Record<Intent, string[]> = {
    concept: [
      `Direct answer: ${direct}`, `Mechanics: ${profile.mechanism}`, `What: The ${concern} concern defines a distinct runtime and delivery contract in ${spec.category}.`,
      `Why: A wrong assumption about ${concern} can produce this failure: ${profile.failure}.`, `How: ${guidance}`, `Validation: Prove the behavior with ${list(profile.evidence)}.`,
    ],
    practical: [
      `Direct answer: ${direct}`, `Implementation choices: ${guidance}`, `Testing approach: Cover success, failure, security, direct navigation, and production-runtime behavior for ${concern}.`,
      `Diagnostic evidence: Require ${list(profile.evidence)} before release.`, `Failure mode: ${profile.failure}.`, `Architecture decision: ${profile.decision}.`,
    ],
    troubleshooting: [
      `Direct answer: ${direct}`, `Observed symptom: ${profile.incident}.`, `Likely root cause: A runtime, cache, route, authorization, or deployment assumption around ${concern} changed.`,
      `Troubleshooting approach: Preserve ${profile.evidence[0]}, compare ${profile.evidence[1]} with a healthy route or release, and use ${profile.evidence[2]} to isolate the layer.`,
      `Durable fix: Correct ${concern}, add a focused regression test, and monitor the original user-impact signal.`, `Common risk: Clearing caches or rolling back before preserving evidence.`,
    ],
    incident: [
      `Direct answer: ${direct}`, `Impact: ${profile.incident}.`, `Triage: Scope the affected routes, users, regions, and release window before selecting mitigation.`,
      `Mitigation: Use the smallest reversible action while preserving ${profile.evidence[0]}.`, `Root cause and prevention: Prove the cause with ${list(profile.evidence)} and convert it into a release control.`, `Ownership: Assign the prevention action to the team that owns ${concern}.`,
    ],
    architecture: [
      `Direct answer: ${direct}`, `Architecture decision: ${profile.decision}.`, `Decision criteria: Evaluate ${concern} against freshness, security, scale, team ownership, runtime support, failure isolation, and cost.`,
      `Operating model: Define an owner, supported pattern, measurable guardrail, exception path, and recovery plan.`, `Validation: Use ${list(profile.evidence)} plus a production-scale failure rehearsal.`, `Trade-off: ${guidance}`,
    ],
  };
  const focus: Record<Intent, string> = {
    concept: 'mechanism', practical: 'implementation', troubleshooting: 'diagnostic path', incident: 'incident response', architecture: 'architecture decision',
  };
  const scenario: Record<Intent, string> = {
    concept: `During a design review for ${spec.category}, a ${industry} team discovers that ${profile.incident}. The candidate must connect the misconception around ${concern} to the Next.js runtime contract and prove the correction with ${profile.evidence[0]}.`,
    practical: `A canary implementation of ${concern} fails when ${profile.incident}. The team captures ${profile.evidence[0]}, validates the exact route and runtime, and requires ${profile.evidence[2]} plus a regression test before rollout resumes.`,
    troubleshooting: `Support reports that ${profile.incident}. The engineer treats ${concern} as a hypothesis, preserves ${profile.evidence[0]}, compares a healthy request through ${profile.evidence[1]}, and isolates the owner with ${profile.evidence[2]}.`,
    incident: `Ten minutes after a release involving ${concern}, ${profile.incident}. The incident lead scopes impact, applies a reversible mitigation, preserves ${list(profile.evidence)}, and accepts recovery only after the user metric returns to target.`,
    architecture: `A quarterly architecture review finds that inconsistent decisions about ${concern} contributed to this signal: ${profile.incident}. The platform lead defines the approved pattern, owner, exception path, and measurable guardrail.`,
  };
  const project: Record<Intent, string> = {
    concept: `A ${industry} platform made ${concern} part of senior-engineer onboarding after a misunderstanding caused ${profile.failure}. The team documented the mechanism and validated it through ${profile.evidence[0]}.`,
    practical: `For a ${industry} customer journey, the team implemented ${concern} using this rule: ${guidance} Release approval required ${profile.evidence[0]} and ${profile.evidence[1]}.`,
    troubleshooting: `A ${industry} support team traced a recurring defect to ${concern}, correlated ${list(profile.evidence.slice(0, 2))}, corrected the narrow cause, and added an operational runbook.`,
    incident: `During a high-traffic ${industry} release, ${concern} contributed to ${profile.incident}. The team restored service, reconciled affected users, and added a canary and alert tied to the root cause.`,
    architecture: `A ${industry} enterprise standardized ${concern} only after deciding ${profile.decision}. The architecture record assigned ownership and required ${profile.evidence[0]} as ongoing proof.`,
  };

  return {
    id: `nextjs-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'nextjs',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question,
    shortAnswer: `${direct} Validate this ${focus[intent]} answer for ${concern} with ${profile.evidence[0]}.`,
    detailedAnswer: detailed[intent],
    productionScenario: scenario[intent],
    realProjectExample: project[intent],
    interviewerExpectation: `The interviewer expects a precise ${focus[intent]} for ${concern}, modern App Router awareness where relevant, evidence from ${profile.evidence[0]} and ${profile.evidence[1]}, and a credible response to ${profile.incident}.`,
    commonMistakes: [
      `Giving a generic Next.js definition without explaining the ${concern} runtime and ownership contract.`,
      `Applying ${concern} without validating ${profile.evidence[0]} and production deployment behavior.`,
      `Ignoring this trade-off: ${profile.decision}.`,
      `Closing the ${focus[intent]} work without a regression test, operational signal, and accountable owner.`,
    ],
    followUpQuestions: [
      `For this ${focus[intent]} question, what changes for ${concern} between Pages Router and App Router?`,
      `How would ${profile.evidence[0]} and ${profile.evidence[1]} prove your ${focus[intent]} explanation of ${concern}?`,
      `Which security, caching, and runtime constraint most changes the ${focus[intent]} answer for ${concern}?`,
      `From the ${focus[intent]} perspective, which scale or ownership constraint would make you revisit ${profile.decision}?`,
    ],
    frequencyScore: Math.max(64, (intent === 'concept' ? 93 : intent === 'practical' ? 89 : intent === 'troubleshooting' ? 86 : intent === 'incident' ? 82 : 78) - (index % 10)),
    commonWrongAnswer: `A weak answer describes ${concern} without explaining the modern Next.js runtime, cache, security, production evidence, or trade-off.`,
    architectPerspective: `From the ${focus[intent]} perspective, ${concern} in ${spec.category} is governed through this decision: ${profile.decision}. Evaluate it against security, cacheability, runtime compatibility, regional behavior, team ownership, cost, and the production signal "${profile.incident}".`,
    keyTakeaway: `Answer ${concern} through the Next.js runtime contract, implementation evidence, production failure, and explicit ownership.`,
    difficultyLevel: difficulties[intent],
    experienceLevel: experiences[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I explain the supported behavior of ${concern} and demonstrate the happy path.`,
      mid: `I implement and test ${concern}, including failures, security, and deployment behavior.`,
      senior: `I diagnose ${concern} with ${list(profile.evidence)} and add durable prevention.`,
      architect: `I govern ${concern} through ${profile.decision}, measurable guardrails, and ownership.`,
    },
    isMostAsked: index < 10,
    mostAskedRank: index < 10 ? index + 1 : undefined,
    isRapidRevision: index < 5,
  };
}

const questions = topicSpecs.flatMap((spec) => spec.concerns.flatMap((concern, concernIndex) => (
  intents.map((intent, intentIndex) => buildQuestion(spec, concern, intent, (concernIndex * intents.length) + intentIndex))
)));

const topicGroups: InterviewPrepTopicGroup[] = nextjsInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in modern Next.js.`,
  topics: group.topics.map((topic) => topic.category),
}));
const questionsPerPage = 10;
const topicMetadata = topicSpecs.map((spec) => {
  const topicQuestions = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    topicGroup: spec.topicGroup,
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
});
const topicPreparationSets = topicSpecs.map((spec) => {
  const ranked = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    mostAskedQuestionIds: ranked.slice(0, 10).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 15).map((question) => question.id),
    lastMinuteQuestionIds: ranked.slice(0, 5).map((question) => question.id),
  };
});
const productionScenarios = [
  {
    id: 'nextjs-dynamic-route-regression', title: 'Route unexpectedly becomes dynamic', topic: 'Rendering Strategy',
    problem: 'A release increases origin load and response latency because a formerly static route becomes dynamic.',
    rootCauseAnalysis: ['Dynamic API usage changed route behavior', 'Personalization moved into a cacheable boundary', 'Cache policy was not reviewed'],
    troubleshootingSteps: ['Compare route build output', 'Inspect dynamic triggers and cache behavior', 'Restore the intended rendering boundary', 'Add a route-regression gate'],
    expectedInterviewAnswer: 'I would prove why the route became dynamic, restore the intended boundary, and validate origin protection.',
    seniorApproach: 'A senior answer correlates route diagnostics, cache hits, origin load, and the triggering change.',
    architectApproach: 'An architect governs rendering strategy and cache policy by journey.',
    relatedQuestions: questions.filter((question) => question.category === 'Rendering Strategy').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'nextjs-private-cache-leak', title: 'Private response cached incorrectly', topic: 'Caching',
    problem: 'One authenticated user receives content associated with another session.',
    rootCauseAnalysis: ['Authorization happened after a shared cache boundary', 'Private response used a public cache key', 'Tenant identity was absent from cache design'],
    troubleshootingSteps: ['Contain exposure', 'Inspect authorization and cache boundaries', 'Invalidate affected entries safely', 'Add negative isolation tests'],
    expectedInterviewAnswer: 'I would treat this as a security incident, contain it, prove the cache identity failure, and redesign private-data boundaries.',
    seniorApproach: 'A senior answer includes impact reconciliation, negative access tests, and targeted invalidation.',
    architectApproach: 'An architect defines approved cache patterns for private and tenant-aware data.',
    relatedQuestions: questions.filter((question) => question.category === 'Caching').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'nextjs-hydration-release', title: 'Hydration errors after release', topic: 'Hydration',
    problem: 'Production logs and users report inconsistent interactive behavior after an SSR change.',
    rootCauseAnalysis: ['Server and client initial output differ', 'Browser-only values run during initial render', 'Third-party script mutates markup'],
    troubleshootingSteps: ['Capture exact warning and route', 'Compare server HTML and initial client render', 'Isolate non-deterministic values', 'Add hydration regression coverage'],
    expectedInterviewAnswer: 'I would make the first render deterministic and verify the owning boundary before suppressing any warning.',
    seniorApproach: 'A senior answer separates harmless-looking warnings from user-visible event attachment risk.',
    architectApproach: 'An architect treats hydration warnings as a release quality signal.',
    relatedQuestions: questions.filter((question) => question.category === 'Hydration').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'nextjs-server-action-authorization', title: 'Unauthorized Server Action invocation', topic: 'Server Actions',
    problem: 'A user invokes a mutation that the visible UI did not offer.',
    rootCauseAnalysis: ['UI visibility was mistaken for authorization', 'Action omitted server-side ownership validation', 'Tenant context was trusted from input'],
    troubleshootingSteps: ['Disable or constrain the action', 'Review audit logs and affected records', 'Authorize inside the action', 'Add negative mutation tests'],
    expectedInterviewAnswer: 'A Server Action is a server capability and must authenticate, authorize, validate, and handle duplicates itself.',
    seniorApproach: 'A senior answer includes impact reconciliation and safe revalidation after the correction.',
    architectApproach: 'An architect standardizes authorization and audit patterns for all server mutations.',
    relatedQuestions: questions.filter((question) => question.category === 'Server Actions').slice(0, 4).map((question) => question.id),
  },
];

export const nextjsInterviewPrep: InterviewPrepSection = {
  technologyId: 'nextjs',
  technologyLabel: 'Next.js',
  title: 'Next.js Interview Prep',
  description: 'Modern Next.js interview preparation focused on App Router, Server Components, caching, production operations, and architecture decisions.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Frontend Developer', years: '0-2 Years', summary: 'Explain routing, rendering, data fetching, and core Next.js conventions.' },
    { id: 'mid', label: 'Next.js / Full Stack Developer', years: '2-5 Years', summary: 'Implement App Router features, server boundaries, authentication, and deployment behavior.' },
    { id: 'senior', label: 'Senior Developer / Tech Lead', years: '5-8 Years', summary: 'Lead troubleshooting, performance, security, caching, and production readiness.' },
    { id: 'architect', label: 'Frontend Architect', years: '8+ Years', summary: 'Design scalable rendering, platform governance, multi-tenant boundaries, and operating models.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Frontend Developer', description: 'Routing, rendering, and core Next.js behavior.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'senior', label: 'Senior Next.js Developer', description: 'App Router, RSC, caching, security, and production support.', questionCount: 10, recommendedMinutes: 40 },
    { id: 'architect', label: 'Frontend Architect', description: 'Rendering strategy, platform governance, scale, and multi-tenancy.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-frequency modern Next.js decisions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'App Router, rendering, caching, authentication, and production readiness.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 25).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Next.js preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 50).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
