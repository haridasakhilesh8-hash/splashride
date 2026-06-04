import type { TopicContent } from '../types';

export const architecture: TopicContent = {
  slug: 'architecture',
  title: 'AEM Architecture',
  description: 'Understand the full AEM architecture — Author, Publish, Dispatcher, and how they work together in enterprise deployments.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'AEM runs on a three-tier architecture: Author (where content is created), Publish (where content is delivered to users), and Dispatcher (the caching/security layer in front of Publish). Content flows from Author → Publish via Replication.',
  whatIsIt: `AEM's architecture separates content creation from content delivery:

- **Author Instance** — Where content editors, marketers, and developers work. Not accessible to the public.
- **Publish Instance** — Serves the live website to end users. Receives content from Author via replication.
- **Dispatcher** — Apache HTTP Server module that caches Publish output and acts as a security filter.
- **CDN** (optional but common) — Sits in front of Dispatcher for global edge caching.

This separation ensures that authoring activities (which can be resource-intensive) don't impact the performance of the live website.`,
  whyWeNeedIt: `**Separation of concerns:**
- Authors can work on content without affecting live site performance
- Publish instances can be scaled independently based on traffic
- Dispatcher caching means AEM rarely needs to render the same page twice
- Security: Author is never exposed to the internet

**High availability:**
- Multiple Publish instances can run behind a load balancer
- If one Publish instance fails, others continue serving
- Dispatcher serves cached content even if Publish is temporarily down`,
  realWorldUsage: `In a typical enterprise deployment:

1. Content editors work in the Author instance (usually internal network only)
2. When ready, they click "Publish" — AEM replicates the content to Publish
3. Publish receives the content and can now render it
4. Dispatcher caches the rendered HTML on first request
5. Subsequent requests are served from Dispatcher cache (fast!)
6. When content is updated and republished, Dispatcher flushes the cache

**Author URL:** https://author.mysite.com (internal only)
**Publish URL:** https://www.mysite.com (via Dispatcher/CDN)`,
  howItWorks: `**Replication:**
When an author publishes content, AEM's Replication Agent sends the content from Author to Publish. This is a push model — Author pushes to Publish.

**Reverse Replication:**
When users submit forms or generate content on Publish (like comments), Reverse Replication sends that data back to Author.

**Oak Repository:**
Both Author and Publish have their own Oak (JCR) repository. They're separate — content must be explicitly replicated between them.

**Sling Request Processing:**
1. Request arrives at Dispatcher
2. Dispatcher checks cache → cache hit: serve file
3. Cache miss: forward to Publish
4. Publish runs Sling URL decomposition
5. Sling finds the right script (HTL/component)
6. Script renders HTML
7. Dispatcher caches the response`,
  example: {
    title: 'AEM Request Processing Flow',
    description: 'How a page request flows through the AEM stack.',
    code: [
      {
        label: 'Request Flow',
        language: 'text',
        code: `User Request: GET /en/home.html

1. CDN (Fastly/Akamai)
   → Cache hit? Serve from CDN edge. Done.
   → Cache miss? Forward to Dispatcher.

2. Dispatcher (Apache + mod_dispatcher)
   → Check /var/cache/dispatcher/en/home.html
   → Cache hit? Serve file. Done.
   → Cache miss? Forward to AEM Publish.

3. AEM Publish (Sling + Oak)
   → URL decomposition: /en/home.html
   → Resource: /content/mysite/en/home
   → Selector: none, Extension: html
   → Find rendering script via sling:resourceType
   → Execute HTL template + Sling Models
   → Return rendered HTML

4. Dispatcher caches the response
5. CDN caches the response
6. User receives the page`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can users access the Author instance directly?',
      answer: 'No. The Author instance should never be publicly accessible. It\'s protected behind a corporate firewall or VPN. Only content editors, developers, and admins should have access to Author.',
    },
    {
      question: 'What happens if Publish is down but Dispatcher cache exists?',
      answer: 'Dispatcher can serve stale cached content while Publish recovers. This is called "grace mode" and is configurable. It\'s one of the key resilience benefits of the Dispatcher.',
    },
  ],
  productionIssues: [
    'Content published on Author not appearing on the live site — replication agent is failing. Check the replication agent queue in AEM Author.',
    'Author and Publish showing different content — replication backlog. Check /etc/replication/agents.author for queue status.',
    'High load on Publish — Dispatcher cache is not working. Check cache hit ratio and flush configuration.',
    'AEM Cloud Service page published successfully but users still see old content — check CDN TTL, Dispatcher invalidation, referenced Experience Fragments or Content Fragments, and whether all dependencies were published.',
    'Only one environment is failing — compare Cloud Manager deployment version, OSGi run mode config, content package state, and CDN/Dispatcher rules between Dev, Stage, and Production.',
  ],
  bestPractices: [
    'Never expose Author directly to the internet — always put it behind a VPN or firewall.',
    'Run multiple Publish instances behind a load balancer for high availability.',
    'Monitor replication queue length — a growing queue means content isn\'t reaching Publish.',
    'Use a CDN in front of Dispatcher for global sites.',
    'Define an operational runbook that separates content publication issues, Dispatcher/CDN cache issues, application errors, and Cloud Manager deployment failures.',
    'For AEM as a Cloud Service, use Cloud Manager logs and Developer Console-style diagnostics instead of relying on direct server access.',
  ],
  architectNote: `The Author-Publish-Dispatcher architecture is AEM's greatest strength for enterprise use. It provides a clear governance model, high performance through caching, and security through separation.

**For AEM as a Cloud Service:** The same architecture applies but Adobe manages all the infrastructure. You don't configure Publish instances or Dispatcher servers manually — Cloud Manager handles it. The CDN (Fastly) is built in.`,
  hasDiagram: true,
  diagramType: 'dispatcher',
  faqs: [
    {
      question: 'How many Publish instances does a typical enterprise AEM site have?',
      answer: 'It depends on traffic. Small sites might have 2 Publish instances (for redundancy). High-traffic sites might have 4–8. In AEM as a Cloud Service, scaling is automatic — Adobe manages the number of instances based on load.',
    },
    {
      question: 'What is the difference between AEM Author and AEM Publish in terms of features?',
      answer: 'Author has the full authoring UI (Sites console, Assets console, page editor, etc.). Publish only serves content — it has no authoring UI. Some OSGi services run only on Author (like workflow engines) and others only on Publish (like Dispatcher flush agents).',
    },
  ],
  keyTakeaways: [
    'Three tiers: Author (create) → Publish (deliver) → Dispatcher (cache + security)',
    'Content flows Author → Publish via Replication',
    'Dispatcher caches rendered HTML — most requests never hit AEM',
    'Author is never public-facing — always behind firewall/VPN',
    'Multiple Publish instances provide high availability',
  ],
  relatedTopics: ['dispatcher', 'aem-cloud-service', 'workflows'],
};

export const jcr: TopicContent = {
  slug: 'jcr',
  title: 'JCR (Java Content Repository)',
  description: 'Learn what the JCR is, how AEM uses it to store everything, and why understanding it is fundamental to AEM development.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'The JCR (Java Content Repository) is AEM\'s database. Everything in AEM — pages, components, templates, user data, assets, configurations — is stored as nodes and properties in the JCR. Think of it as a hierarchical file system where every "file" (node) can have properties (key-value pairs).',
  whatIsIt: `The JCR is a standardized API (JSR-170/283) for content repositories. AEM uses **Apache Jackrabbit Oak** as its JCR implementation.

**Key Concepts:**

- **Node** — Like a folder or file in a filesystem. Has a type (e.g., \`cq:Page\`, \`nt:unstructured\`)
- **Property** — Key-value pair on a node (e.g., \`jcr:title = "My Page"\`)
- **Node Type** — Defines what properties and child nodes a node can have
- **Path** — Every node has a unique path (e.g., \`/content/mysite/en/home\`)
- **UUID** — Every node has a unique identifier

**Common Node Types:**
- \`cq:Page\` — An AEM page
- \`cq:PageContent\` — A page's content node
- \`cq:Component\` — An AEM component
- \`nt:unstructured\` — Flexible node with no schema constraints
- \`dam:Asset\` — A DAM asset`,
  whyWeNeedIt: `The JCR provides a unified storage model for all AEM content:

- **Single storage** — pages, assets, configurations, user data all in one place
- **Hierarchical** — content is organized in a tree structure that mirrors URLs
- **Versioning** — JCR supports content versioning out of the box
- **Access control** — Fine-grained permissions on any node
- **Search** — JCR supports SQL-like queries (JCR-SQL2) and XPath

Without understanding the JCR, you can't understand how AEM stores and retrieves data.`,
  realWorldUsage: `The JCR is everywhere in AEM development:

- When you create a page at \`/content/mysite/en/home\`, a \`cq:Page\` node is created in the JCR
- When an author fills in a component dialog, the values are saved as properties on a \`nt:unstructured\` node
- When you deploy code to \`/apps\`, component definitions are stored as JCR nodes
- When you query for pages in a Sling Model, you're querying the JCR`,
  howItWorks: `**Node Structure Example:**

\`\`\`
/content/mysite/en/home          ← cq:Page node
  jcr:content/                   ← cq:PageContent node
    jcr:title = "Home"
    sling:resourceType = "mysite/components/page/home"
    root/                        ← nt:unstructured
      hero/                      ← nt:unstructured (hero component)
        sling:resourceType = "mysite/components/hero"
        heading = "Welcome"
        ctaLabel = "Learn More"
\`\`\`

**Accessing JCR in Code:**

\`\`\`java
// From a Sling Model
@Inject
private Resource resource;

// Get the ValueMap (properties)
ValueMap props = resource.getValueMap();
String title = props.get("jcr:title", "Default Title");

// Navigate to child
Resource hero = resource.getChild("root/hero");

// JCR Session (lower-level)
Session session = resourceResolver.adaptTo(Session.class);
Node node = session.getNode("/content/mysite/en/home");
\`\`\``,
  example: {
    title: 'JCR Node Structure',
    description: 'How a typical AEM page looks in the JCR.',
    code: [
      {
        label: 'JCR Structure (CRXDE View)',
        language: 'text',
        code: `/content/
  mysite/                        [sling:Folder]
    en/                          [sling:Folder]
      home/                      [cq:Page]
        jcr:content/             [cq:PageContent]
          jcr:title: "Home Page"
          jcr:description: "Welcome to My Site"
          sling:resourceType: "mysite/components/page/home"
          cq:template: "/conf/mysite/settings/wcm/templates/home"
          root/                  [nt:unstructured]
            sling:resourceType: "wcm/foundation/components/responsivegrid"
            hero/                [nt:unstructured]
              sling:resourceType: "mysite/components/hero"
              heading: "Welcome to My Site"
              subtext: "Discover our products"
              ctaLabel: "Shop Now"
              ctaLink: "/content/mysite/en/products"`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between a Node and a Resource in AEM?',
      answer: 'A Node is a JCR concept (lower-level Java API). A Resource is a Sling concept (higher-level). In practice, a Resource wraps a Node and adds Sling-specific behavior. In Sling Models, always use Resource — only drop to Node when you need JCR-specific operations like versioning or locking.',
    },
    {
      question: 'What is the difference between /content, /apps, /conf, and /libs?',
      answer: '/content = your site\'s pages and assets. /apps = your custom code (components, templates, OSGi configs). /conf = configuration (editable templates, policies, cloud configs). /libs = Adobe\'s code (never modify directly, overlay instead).',
    },
  ],
  productionIssues: [
    'Repository corruption — always use proper JCR transactions and never kill the AEM process mid-write.',
    'Large repository size — unmanaged binary assets or version history growing unbounded. Implement regular datastore garbage collection.',
    'Slow JCR queries — unindexed queries on large repositories. Always create Oak indexes for frequently-used query patterns.',
    'ResourceResolver leaks — custom services open service resolvers and do not close them, eventually causing performance degradation or login failures.',
    'Cloud Service deployment fails because of index or package validation — Oak indexes and repository structure changes must be packaged correctly and deployed through Cloud Manager.',
  ],
  bestPractices: [
    'Use ResourceResolver (Sling) instead of JCR Session directly — it\'s safer and more idiomatic.',
    'Always close ResourceResolver and Session in a finally block to prevent resource leaks.',
    'Create Oak indexes for any JCR query used in production — unindexed queries cause full repository traversal.',
    'Use nt:unstructured for component content nodes — it\'s flexible and doesn\'t require schema changes.',
    'Use service users and mapped subservices for background writes; never use admin sessions in modern AEM code.',
    'Keep application data with high write volume outside JCR unless it is truly content-managed data.',
  ],
  architectNote: `Understanding the JCR is non-negotiable for AEM architects. Every design decision — URL structure, content organization, template design — maps directly to JCR node structure.

**Key principle:** Your JCR structure IS your URL structure (for pages). Plan it carefully upfront. Restructuring the JCR in production is painful.

**Performance:** The JCR is not a relational database. Don't design data models that require complex joins or full-text searches on large datasets. Use external search engines (Solr, Elasticsearch) for complex search requirements.`,
  faqs: [
    {
      question: 'Can I use the JCR as a database for application data?',
      answer: 'Technically yes, but it\'s not recommended for high-volume transactional data. The JCR is optimized for content management, not transaction processing. For application data that changes frequently or requires complex queries, use a proper database and integrate via OSGi services.',
    },
  ],
  keyTakeaways: [
    'JCR = AEM\'s database — everything stored as nodes and properties',
    'Every node has a path, type, and properties',
    'sling:resourceType is the most important property — it connects content to rendering',
    '/content = pages, /apps = code, /conf = config, /libs = Adobe code',
    'Use ResourceResolver (Sling) over JCR Session in your code',
  ],
  relatedTopics: ['crxde', 'sling', 'architecture'],
};

export const crxde: TopicContent = {
  slug: 'crxde',
  title: 'CRXDE Lite',
  description: 'Learn how to use CRXDE Lite — AEM\'s built-in repository browser and editor — for debugging, exploring, and making quick changes.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service (limited)'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'CRXDE Lite is AEM\'s built-in web-based IDE for browsing and editing the JCR repository. It\'s like a file explorer for AEM\'s content and code. Developers use it for debugging, exploring content structure, and making quick fixes — but never for production changes.',
  whatIsIt: `CRXDE Lite (Content Repository Extreme Development Environment) is accessible at \`/crx/de\`. It provides:

- **Repository browser** — Navigate the entire JCR tree
- **Property editor** — View and edit node properties
- **Code editor** — Edit HTL, JS, CSS, and XML files
- **Query console** — Run JCR-SQL2 and XPath queries
- **Package manager link** — Quick access to package operations
- **Access control editor** — View and set permissions on nodes`,
  whyWeNeedIt: `CRXDE is invaluable for:

- **Debugging** — Check what properties are actually stored on a node
- **Exploration** — Understand how AEM stores data without reading documentation
- **Quick fixes** — Change a property value without a full deployment (dev only!)
- **Query testing** — Test JCR queries before putting them in code
- **Learning** — The best way to understand AEM's data model is to explore it`,
  realWorldUsage: `**Daily developer tasks in CRXDE:**

- Check why a component isn't rendering — look at the content node's sling:resourceType
- Verify dialog values were saved correctly after author edits
- Debug replication issues by checking node states
- Test JCR queries for Sling Model implementations
- Explore Core Components structure to understand how to extend them
- Check OSGi configuration nodes under /apps/.../config`,
  howItWorks: `**Access:** \`http://localhost:4502/crx/de\`

**Key Areas to Know:**
- \`/content\` — Your site's pages and DAM assets
- \`/apps\` — Your custom code (components, templates, OSGi configs)
- \`/libs\` — Adobe's built-in code (read-only, never modify)
- \`/conf\` — Configuration (editable templates, policies)
- \`/etc\` — Legacy configurations (mostly replaced by /conf)
- \`/var\` — Runtime data (replication queue, workflow instances)
- \`/home\` — Users and groups`,
  example: {
    title: 'Common CRXDE Tasks',
    description: 'Everyday tasks developers perform in CRXDE Lite.',
    code: [
      {
        label: 'JCR-SQL2 Query Examples',
        language: 'sql',
        code: `-- Find all pages using a specific template
SELECT * FROM [cq:PageContent] AS s
WHERE ISDESCENDANTNODE(s, '/content/mysite')
AND s.[cq:template] = '/conf/mysite/settings/wcm/templates/article'

-- Find all components of a specific type
SELECT * FROM [nt:unstructured] AS s
WHERE ISDESCENDANTNODE(s, '/content/mysite')
AND s.[sling:resourceType] = 'mysite/components/hero'

-- Find pages modified in the last 7 days
SELECT * FROM [cq:PageContent] AS s
WHERE ISDESCENDANTNODE(s, '/content/mysite')
AND s.[cq:lastModified] > CAST('2024-01-01T00:00:00.000Z' AS DATE)

-- Find all assets of a specific mime type
SELECT * FROM [dam:AssetContent] AS s
WHERE ISDESCENDANTNODE(s, '/content/dam/mysite')
AND s.[jcr:mimeType] = 'image/jpeg'`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I make changes in CRXDE on production?',
      answer: 'Technically yes, but you should never do this. Changes in CRXDE are not tracked in version control, can\'t be rolled back easily, and will be overwritten by the next deployment. CRXDE is for development and debugging only.',
    },
    {
      question: 'Why is CRXDE disabled on AEM as a Cloud Service?',
      answer: 'CRXDE Lite is primarily a local SDK and development-environment tool in AEM as a Cloud Service. It is not a Stage/Production troubleshooting or hotfix mechanism, and immutable areas like /apps and /libs cannot be changed at runtime. Code changes must go through Cloud Manager pipelines.',
    },
  ],
  productionIssues: [
    'CRXDE accessible on production — a security risk. Ensure /crx/de is blocked by Dispatcher filter rules on production environments.',
    'Changes made in CRXDE lost after deployment — CRXDE changes aren\'t in source control. Always make changes in your IDE and deploy through the pipeline.',
    'Developer cannot reproduce a cloud issue in CRXDE — remember that cloud runtime, CDN, Dispatcher, environment variables, and immutable repository behavior can differ from local SDK or development environments.',
  ],
  bestPractices: [
    'Block CRXDE access on production via Dispatcher filter rules.',
    'Use CRXDE for exploration and debugging, not for making permanent changes.',
    'Use the Query Console in CRXDE to test JCR queries before writing them in code.',
    'When exploring Core Components, use CRXDE to understand their node structure before extending them.',
    'Capture findings from CRXDE as code or content packages so fixes are reviewed, repeatable, and deployable.',
  ],
  architectNote: `CRXDE is a powerful debugging tool but a governance risk. In enterprise projects, establish clear rules: CRXDE is for development environments only. Production changes must go through the deployment pipeline.

For AEM as a Cloud Service, embrace the immutability — it forces better engineering practices and prevents the "quick fix in production" anti-pattern that causes so many issues in AEM 6.x projects.`,
  faqs: [
    {
      question: 'What is the difference between CRXDE Lite and CRXDE?',
      answer: 'CRXDE Lite is the web-based browser at /crx/de. The full CRXDE was an Eclipse plugin that\'s no longer actively maintained. Modern AEM development uses IDE plugins (IntelliJ, VSCode) with AEM Developer Tools instead.',
    },
  ],
  keyTakeaways: [
    'CRXDE Lite = web-based JCR browser and editor at /crx/de',
    'Use for debugging and exploration, not production changes',
    'Query Console lets you test JCR-SQL2 queries',
    'Block CRXDE on production via Dispatcher',
    'Use CRXDE for local SDK or permitted development debugging, not Stage/Production fixes in AEM as a Cloud Service',
  ],
  relatedTopics: ['jcr', 'architecture', 'sling'],
};

export const sling: TopicContent = {
  slug: 'sling',
  title: 'Apache Sling',
  description: 'Understand Apache Sling — the web framework that powers AEM\'s URL resolution, request processing, and resource-centric architecture.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Apache Sling is the web framework that AEM is built on. Its key idea is "resources, not routes" — instead of mapping URLs to controllers, Sling maps URLs to JCR nodes (resources) and then finds the right script to render them based on the resource type.',
  whatIsIt: `Apache Sling is an open-source web framework built on OSGi and JCR. It provides:

- **URL Decomposition** — Parses URLs into resource path, selectors, extension, and suffix
- **Resource Resolution** — Maps URL paths to JCR nodes
- **Script Resolution** — Finds the right rendering script based on \`sling:resourceType\`
- **Sling Models** — The annotation-based model framework
- **Sling Servlets** — URL-mapped request handlers
- **Sling Filters** — Request/response interceptors
- **Event Handling** — OSGi event-based processing`,
  whyWeNeedIt: `Sling's resource-centric approach is what makes AEM's content-driven architecture work:

- URLs map directly to content — \`/content/mysite/en/home.html\` → the home page node
- The same content can be rendered differently based on selectors (\`/en/home.mobile.html\`)
- No routing configuration needed — the URL IS the content address
- Developers focus on content and rendering, not URL routing`,
  realWorldUsage: `**Sling URL Decomposition in Practice:**

\`/content/mysite/en/home.mobile.html\`
- **Resource path:** \`/content/mysite/en/home\`
- **Selectors:** \`mobile\`
- **Extension:** \`html\`

AEM finds the \`home\` node, reads its \`sling:resourceType\`, and looks for a script named \`home.mobile.html\` or falls back to \`home.html\`.

This is how responsive images work — \`/content/dam/image.thumb.100.100.jpg\` uses selectors to generate a 100x100 thumbnail.`,
  howItWorks: `**Sling Request Processing:**

1. URL arrives: \`/content/mysite/en/home.html\`
2. Sling decomposes URL → resource path + selectors + extension
3. Sling resolves resource → JCR node at that path
4. Sling reads \`sling:resourceType\` from the node (e.g., \`mysite/components/page/home\`)
5. Sling searches for a rendering script:
   - \`/apps/mysite/components/page/home/home.html\` (exact match)
   - \`/apps/mysite/components/page/home.html\` (fallback)
   - Walks up \`sling:resourceSuperType\` chain
6. Script executes and returns HTML`,
  example: {
    title: 'Sling URL Decomposition',
    description: 'How Sling breaks down AEM URLs and finds rendering scripts.',
    code: [
      {
        label: 'URL Decomposition Examples',
        language: 'text',
        code: `URL: /content/mysite/en/home.html
├── Resource: /content/mysite/en/home
├── Selectors: (none)
├── Extension: html
└── Suffix: (none)

URL: /content/mysite/en/home.mobile.html
├── Resource: /content/mysite/en/home
├── Selectors: mobile
├── Extension: html
└── Suffix: (none)

URL: /content/dam/mysite/hero.thumb.800.600.jpg
├── Resource: /content/dam/mysite/hero
├── Selectors: thumb.800.600
├── Extension: jpg
└── Suffix: (none)

URL: /content/mysite/en/search.html/results
├── Resource: /content/mysite/en/search
├── Selectors: (none)
├── Extension: html
└── Suffix: /results

Script Resolution for sling:resourceType "mysite/components/hero":
1. /apps/mysite/components/hero/hero.html        ← Exact match
2. /apps/mysite/components/hero.html             ← Fallback
3. Check sling:resourceSuperType for inheritance`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between Sling and Servlet?',
      answer: 'Sling IS built on top of Servlets (OSGi HttpService). But Sling adds the resource-centric model on top. A Sling Servlet is a servlet that\'s registered to handle specific resource types or paths, rather than URL patterns. You can still write traditional servlets in AEM, but Sling Servlets are the preferred approach.',
    },
    {
      question: 'What is sling:resourceSuperType and how does script inheritance work?',
      answer: 'If a component\'s sling:resourceSuperType points to another component, Sling will look for scripts in the parent component if it can\'t find them in the child. This is how you extend Core Components — your component inherits all scripts from Core and only overrides the ones you change.',
    },
  ],
  productionIssues: [
    '404 errors — Sling can\'t resolve the resource. Check if the content node exists and if the sling:resourceType is correct.',
    'Wrong script rendering — Multiple scripts match the request. Check script resolution order and selector specificity.',
    'Infinite loops — A component includes itself via data-sly-resource without a stopping condition.',
    'Servlet exposes sensitive data — path-based servlets or broad selectors are allowed through Dispatcher without authentication checks.',
    'ResourceResolver leak in servlet or filter — resolver is opened per request and not closed, causing gradual production instability.',
  ],
  bestPractices: [
    'Use sling:resourceSuperType for component inheritance rather than copying scripts.',
    'Use selectors for alternate renderings of the same resource (mobile, print, JSON).',
    'Register Sling Servlets by resource type, not by path — path-based registration is fragile.',
    'Use Sling URL Builder APIs to generate URLs — don\'t concatenate strings.',
    'Validate selectors, extensions, and suffixes explicitly in servlets so unexpected URL shapes do not bypass business rules.',
    'Use service users for repository access from servlets and filters; do not reuse the request user for privileged background work.',
  ],
  architectNote: `Sling's resource-centric model is elegant but requires a mental shift for developers coming from MVC frameworks. The key insight: **the URL is the content address, not a route to a controller**.

This model scales beautifully for content-heavy sites — thousands of pages all use the same rendering scripts, but with different content. No routing configuration needed.`,
  faqs: [
    {
      question: 'What is Sling Resource Merger?',
      answer: 'Sling Resource Merger allows overlaying content from /libs with content in /apps. When you create a node at /apps/path/that/mirrors/libs, Sling merges the two, with /apps taking precedence. This is how AEM overlays work.',
    },
  ],
  keyTakeaways: [
    'Sling = resource-centric web framework — URLs map to JCR nodes, not controllers',
    'URL decomposition: path + selectors + extension + suffix',
    'sling:resourceType tells Sling which script to use for rendering',
    'Script resolution walks up sling:resourceSuperType for inheritance',
    'Selectors enable alternate renderings of the same resource',
  ],
  relatedTopics: ['jcr', 'sling-models', 'components', 'htl'],
};

export const clientLibraries: TopicContent = {
  slug: 'client-libraries',
  title: 'Client Libraries (ClientLibs)',
  description: 'Learn how AEM manages CSS and JavaScript through Client Libraries — the system that bundles, minifies, and delivers front-end assets.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Client Libraries (ClientLibs) are AEM\'s way of organizing and delivering CSS and JavaScript. You create a ClientLib folder with a category name, put your CSS/JS files in it, and include the category in your page template. AEM bundles, minifies, and serves the files automatically.',
  whatIsIt: `A Client Library is a JCR node of type \`cq:ClientLibraryFolder\` that contains:

- CSS files (listed in \`css.txt\`)
- JavaScript files (listed in \`js.txt\`)
- A \`categories\` property that names the library
- Optional \`dependencies\` and \`embed\` properties

AEM's ClientLib system:
- Bundles multiple CSS/JS files into single requests
- Minifies files in production mode
- Handles dependencies between libraries
- Generates versioned URLs for cache-busting`,
  whyWeNeedIt: `Without ClientLibs, you'd manually manage dozens of CSS/JS \`<link>\` and \`<script>\` tags in page templates, deal with load order issues, and manage cache-busting manually.

ClientLibs solve this by:
- **Automatic bundling** — multiple files → single HTTP request
- **Dependency management** — declare what your library depends on
- **Cache-busting** — AEM appends version hashes automatically
- **Environment-aware** — minified in production, readable in development`,
  realWorldUsage: `In a real project, you typically have:

- \`mysite.base\` — Core CSS/JS (reset, typography, grid)
- \`mysite.components\` — Component-specific styles
- \`mysite.author\` — Author-only styles (edit mode UI)
- \`mysite.vendor\` — Third-party libraries (jQuery, etc.)

Components can have their own ClientLibs that are included only when that component is on the page (component-scoped ClientLibs).`,
  howItWorks: `**ClientLib Structure:**
\`\`\`
/apps/mysite/clientlibs/
  base/                          [cq:ClientLibraryFolder]
    categories: [mysite.base]
    dependencies: [cq.jquery]
    css.txt                      ← Lists CSS files
    js.txt                       ← Lists JS files
    css/
      main.css
      typography.css
    js/
      app.js
      utils.js
\`\`\`

**Including in HTL:**
\`\`\`html
<sly data-sly-use.clientlib="/libs/granite/sightly/templates/clientlib.html">
<sly data-sly-call="\${clientlib.css @ categories='mysite.base'}"/>
<!-- page content -->
<sly data-sly-call="\${clientlib.js @ categories='mysite.base'}"/>
</sly>
\`\`\`

**Generated Output:**
\`\`\`html
<link rel="stylesheet" href="/etc.clientlibs/mysite/clientlibs/base.min.css?...hash...">
<script src="/etc.clientlibs/mysite/clientlibs/base.min.js?...hash..."></script>
\`\`\``,
  example: {
    title: 'Creating a Client Library',
    description: 'Complete ClientLib setup for a component.',
    code: [
      {
        label: 'ClientLib Node (.content.xml)',
        language: 'xml',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:ClientLibraryFolder"
    categories="[mysite.base]"
    dependencies="[cq.jquery,granite.utils]"
    embed="[mysite.icons]"/>`,
      },
      {
        label: 'css.txt',
        language: 'text',
        code: `#base=css
main.css
components/hero.css
components/navigation.css
components/footer.css`,
      },
      {
        label: 'js.txt',
        language: 'text',
        code: `#base=js
utils.js
components/navigation.js
components/hero.js
app.js`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between dependencies and embed?',
      answer: 'dependencies ensures another ClientLib loads before yours (separate HTTP request). embed includes another ClientLib\'s files directly inside yours (single combined request). Use embed for small libraries you always need; use dependencies for large shared libraries.',
    },
    {
      question: 'Why are my ClientLib changes not showing in the browser?',
      answer: 'Browser cache or AEM ClientLib cache. Try: 1) Hard refresh (Ctrl+Shift+R), 2) Rebuild ClientLibs via /libs/granite/ui/content/dumplibs.rebuild.html, 3) Clear browser cache. In development, use ?debugClientLibs=true to load unminified files.',
    },
  ],
  productionIssues: [
    'CSS/JS not loading on Publish — Dispatcher is blocking /etc.clientlibs/ path. Add allow rule for /etc.clientlibs/* in Dispatcher filters.',
    'ClientLib changes not reflecting — AEM ClientLib cache not invalidated. Rebuild via /libs/granite/ui/content/dumplibs.rebuild.html.',
    'JavaScript errors on production — minification broke the code. Use strict mode and avoid relying on minification behavior.',
    'ClientLib URL returns 404 — allowProxy is missing or the library is stored under /apps without being exposed through /etc.clientlibs.',
    'Styles differ between Author and Publish — author-only categories are leaking into page templates or publish-only categories are missing.',
  ],
  bestPractices: [
    'Use the /etc.clientlibs proxy path (not /apps) for ClientLib URLs — it works with Dispatcher caching.',
    'Organize ClientLibs by category: base (always loaded), component-specific (loaded on demand).',
    'Use Long Cache-Control headers for ClientLibs — the hash in the URL ensures cache-busting.',
    'Test with minification enabled (production mode) — some JS patterns break under minification.',
    'Use project-specific category names to avoid collisions with Adobe, Core Component, or other vendor ClientLib categories.',
    'Keep authoring ClientLibs separate from site delivery ClientLibs so author-only scripts never ship to public pages.',
  ],
  architectNote: `ClientLibs are AEM's front-end asset management system. In modern projects, you might integrate with npm-based build tools (webpack, vite) and use ClientLibs just as a delivery mechanism.

**For AEM as a Cloud Service:** ClientLibs work the same way, but the /etc.clientlibs proxy is even more important for Dispatcher caching. Consider using the Frontend Build Pipeline in Cloud Manager for modern JS/CSS toolchains.`,
  faqs: [
    {
      question: 'Can I use npm and webpack with AEM ClientLibs?',
      answer: 'Yes. A common pattern is to use webpack/vite to compile your JS/CSS, then output the compiled files into the ClientLib folder. The AEM archetype includes a ui.frontend module that does exactly this.',
    },
  ],
  keyTakeaways: [
    'ClientLibs = AEM\'s CSS/JS management system',
    'categories property is how you reference a ClientLib in HTL',
    'css.txt and js.txt list the files to include',
    'AEM bundles and minifies automatically in production mode',
    'Use /etc.clientlibs proxy path for Dispatcher-compatible URLs',
  ],
  relatedTopics: ['components', 'htl', 'templates'],
};

export const msm: TopicContent = {
  slug: 'msm',
  title: 'Multi-Site Manager (MSM)',
  description: 'Learn how MSM enables managing multiple related sites from a single source, with controlled content inheritance and localization.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'MSM (Multi-Site Manager) lets you create multiple sites that inherit content from a "master" (Blueprint) site. Think of it as a content franchise model — the Blueprint is the franchisor\'s standard content, and each Live Copy is a franchisee that gets the standard content but can customize it locally.',
  whatIsIt: `MSM provides a way to manage content across multiple related sites:

- **Blueprint** — The master site that defines the canonical content
- **Live Copy** — A site that inherits content from the Blueprint
- **Rollout** — The process of pushing Blueprint changes to Live Copies
- **Rollout Config** — Rules that define what gets rolled out and when
- **Synchronization** — Keeping Live Copy content in sync with Blueprint

Common use cases:
- Multi-country sites (US, UK, DE, FR) with shared base content
- Multi-brand sites with shared component library
- Franchise or dealer networks with local variations`,
  whyWeNeedIt: `Without MSM, managing 20 country sites means:
- Copy-pasting content 20 times for every update
- Inconsistent content across sites
- No way to enforce brand standards globally

With MSM:
- Update once in Blueprint → rollout to all Live Copies
- Local teams can customize their copy within allowed areas
- Brand consistency enforced through inheritance locks`,
  realWorldUsage: `**Real Project Example:**

A global retail brand has sites for 15 countries. The US site is the Blueprint. Each country gets a Live Copy. Product descriptions, brand content, and legal pages come from the Blueprint. Local teams add country-specific promotions and translate content.

When the global marketing team updates the homepage hero, they update the Blueprint and roll out to all 15 countries. Local variations (different promotional banners) are preserved because they're set as "local" content.`,
  howItWorks: `**MSM Relationship:**
\`\`\`
/content/mysite/
  us/         ← Blueprint (master)
    en/
      home/
      products/
  uk/         ← Live Copy of us/en
    en/
      home/   ← Inherits from us/en/home
      products/
  de/         ← Live Copy of us/en
    de/
      home/   ← Inherits + translated
\`\`\`

**Inheritance States:**
- **Inherited** — Content comes from Blueprint, can't be edited locally
- **Cancelled** — Inheritance broken, content is now local
- **Suspended** — Inheritance temporarily paused

**Rollout Configs:**
Define what happens during rollout — which properties are synced, which are excluded, what triggers rollout (manual, on publish, on modify).`,
  example: {
    title: 'MSM Setup Concepts',
    description: 'Key MSM concepts and configuration.',
    code: [
      {
        label: 'MSM Rollout Configuration',
        language: 'xml',
        code: `<!-- Standard Rollout Config - most common setup -->
<!-- Rolls out: page properties, content, structure -->
<!-- Excludes: local translations, local promotions -->

<rolloutConfig
    jcr:title="Standard Rollout"
    cq:trigger="rollout">
  <actions>
    <contentUpdate
        jcr:primaryType="nt:unstructured"
        class="com.day.cq.wcm.msm.impl.actions.ContentUpdateActionFactory"
        excludeProperties="[jcr:language,cq:lastRolledout]"/>
    <orderChildren
        jcr:primaryType="nt:unstructured"
        class="com.day.cq.wcm.msm.impl.actions.OrderChildrenActionFactory"/>
    <referencesUpdate
        jcr:primaryType="nt:unstructured"
        class="com.day.cq.wcm.msm.impl.actions.ReferencesUpdateActionFactory"/>
  </actions>
</rolloutConfig>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between MSM and Translation?',
      answer: 'MSM handles content inheritance and structure sync. Translation handles language conversion. They work together: MSM creates the country Live Copy structure, then Translation services translate the content within that structure. Many projects use both.',
    },
    {
      question: 'Can a Live Copy have local content that doesn\'t exist in the Blueprint?',
      answer: 'Yes. Local content (pages and components added only to the Live Copy) is not affected by Blueprint rollouts. Only inherited content is synchronized. This is how local teams add country-specific content.',
    },
  ],
  productionIssues: [
    'Rollout overwrites local changes — rollout config is too aggressive. Review which properties are excluded from rollout.',
    'Live Copy out of sync — rollout hasn\'t been triggered. Check rollout trigger configuration and run a manual rollout.',
    'MSM inheritance broken — someone cancelled inheritance on a node. Check MSM status in the page properties.',
    'Translations are overwritten after rollout — language-specific properties, translated components, or localized Experience Fragment references are not excluded correctly.',
    'Large rollout times out or creates a backlog — too many pages or Live Copies are being rolled out synchronously. Split rollout scope and monitor rollout jobs.',
    'Published country site shows mixed global and local content — referenced assets, Content Fragments, or Experience Fragments were not localized or published with the Live Copy.',
  ],
  bestPractices: [
    'Design your Blueprint structure carefully — it\'s hard to restructure after Live Copies are created.',
    'Document which content areas are inherited vs. local for content authors.',
    'Use rollout configs that exclude language-specific properties to avoid overwriting translations.',
    'Test rollout behavior thoroughly before creating many Live Copies.',
    'Pilot rollout configs on one market before applying them to every country or brand.',
    'Train authors on suspend vs cancel inheritance; accidental cancellation is one of the most common MSM support problems.',
    'Keep a rollout checklist that includes pages, assets, fragments, XFs, redirects, and post-rollout publishing.',
  ],
  architectNote: `MSM is powerful but complex. The biggest architectural decision is: what content is global (Blueprint) vs. local (Live Copy)?

**Rule of thumb:**
- Brand content, legal content, product descriptions → Blueprint (global)
- Promotions, local events, translated content → Live Copy (local)

**Alternative to consider:** For pure translation use cases, AEM's Language Copy feature (without full MSM) is simpler. MSM is for structural inheritance; Language Copy is for translation workflows.`,
  faqs: [
    {
      question: 'How many Live Copies can a Blueprint have?',
      answer: 'Technically unlimited, but performance degrades with very large numbers. Projects with 50+ Live Copies should carefully plan rollout strategies and consider asynchronous rollout to avoid timeouts.',
    },
    {
      question: 'What should I check when a rollout changed more content than expected?',
      answer: 'Check the rollout configuration, excluded properties, inheritance status on the affected components, custom rollout actions, and whether the author rolled out the whole tree instead of a selected page or branch.',
    },
  ],
  keyTakeaways: [
    'MSM = Blueprint (master) → Live Copies (inheritors)',
    'Rollout pushes Blueprint changes to Live Copies',
    'Live Copies can have local content that isn\'t affected by rollout',
    'Inheritance can be cancelled (permanent) or suspended (temporary)',
    'Used for multi-country, multi-brand, and franchise site architectures',
  ],
  relatedTopics: ['templates', 'experience-fragments', 'content-fragments'],
};

export const workflows: TopicContent = {
  slug: 'workflows',
  title: 'AEM Workflows',
  description: 'Learn how AEM Workflows automate content processes — from approval workflows to asset processing and custom business logic.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'An AEM Workflow is an automated process that moves content through a series of steps. The most common example: when an author submits a page for review, a workflow sends it to an approver, who approves or rejects it, and the page is then published or returned for revision.',
  whatIsIt: `AEM Workflows are built on the OSGi-based CQ Workflow engine. A workflow consists of:

- **Workflow Model** — The definition of the process (steps and transitions)
- **Workflow Instance** — A running execution of a workflow model
- **Workflow Steps** — Individual actions (participant step, process step, etc.)
- **Payload** — The content being processed (usually a page or asset path)
- **Workflow Inbox** — Where users see tasks assigned to them

**Built-in Workflow Models:**
- Request for Activation (page approval)
- DAM Asset Update (asset processing)
- Request for Deactivation
- Scheduled Activation`,
  whyWeNeedIt: `Workflows automate content governance processes:

- **Approval workflows** — Content must be approved before publishing
- **Asset processing** — Automatically generate thumbnails, extract metadata, transcode video
- **Notification workflows** — Notify teams when content changes
- **Custom business processes** — Any multi-step content operation

Without workflows, these processes would be manual, error-prone, and hard to audit.`,
  realWorldUsage: `**Common Real-World Workflows:**

1. **Content Approval** — Author writes → Editor reviews → Legal approves → Publish
2. **Asset Ingestion** — Upload image → Generate thumbnails → Extract EXIF → Index for search
3. **Campaign Launch** — Build pages → QA review → Stakeholder approval → Schedule publish
4. **Content Archival** — Identify old pages → Notify owner → Archive or delete

In enterprise projects, workflow design is a significant part of the requirements phase — mapping business processes to AEM workflow models.`,
  howItWorks: `**Workflow Step Types:**

- **Participant Step** — Assigns a task to a user/group. Workflow pauses until they complete it.
- **Dynamic Participant Step** — Determines the participant at runtime (e.g., based on content path)
- **Process Step** — Executes Java code (OSGi service). Used for automated processing.
- **OR Split / AND Split** — Branching and parallel execution
- **Container Step** — A sub-workflow
- **Goto Step** — Loop back to a previous step

**Workflow Launcher:**
Automatically triggers a workflow when content changes. Configure in Tools → Workflow → Launchers. Example: trigger "DAM Asset Update" whenever an asset is created or modified.`,
  example: {
    title: 'Custom Workflow Process Step',
    description: 'A Java OSGi service that implements a custom workflow step.',
    code: [
      {
        label: 'Custom Process Step',
        language: 'java',
        code: `@Component(
    service = WorkflowProcess.class,
    property = {
        "process.label=Send Approval Email"
    }
)
public class SendApprovalEmailProcess implements WorkflowProcess {

    @Reference
    private EmailService emailService;

    @Override
    public void execute(WorkItem workItem, WorkflowSession session,
                        MetaDataMap args) throws WorkflowException {
        // Get the payload (the page being processed)
        String payloadPath = workItem.getWorkflowData()
            .getPayload().toString();

        // Get process arguments from workflow model config
        String recipientEmail = args.get("recipientEmail",
            "approver@mysite.com");

        // Send notification email
        boolean sent = emailService.sendEmail(
            recipientEmail,
            "Content Awaiting Approval",
            "Please review: " + payloadPath
        );

        if (!sent) {
            throw new WorkflowException(
                "Failed to send approval email for: " + payloadPath
            );
        }
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between a Workflow and a Launcher?',
      answer: 'A Workflow Model defines the process. A Launcher automatically starts a workflow when specific events occur (node created, modified, deleted). Without a launcher, workflows must be started manually. DAM Asset Update workflow is triggered by a launcher on asset creation/modification.',
    },
    {
      question: 'Where do workflow tasks appear for users?',
      answer: 'In the AEM Inbox (/aem/inbox). Users see their assigned tasks there and can complete, delegate, or reject them. The Inbox is the main interface for workflow participants.',
    },
  ],
  productionIssues: [
    'Workflow queue growing — too many workflow instances running simultaneously. Check workflow purge configuration and consider async workflows.',
    'Workflow not triggering — launcher configuration is wrong or disabled. Check Tools → Workflow → Launchers.',
    'Participant step not assigning to the right user — user/group doesn\'t exist or dynamic participant step logic has a bug.',
    'Workflow fails silently — process step throws an exception that\'s caught and ignored. Always log errors in process steps.',
    'Asset processing slows the whole environment — DAM Update Asset workflows are persisting too much state or custom steps are doing heavy synchronous work.',
    'Custom process step hangs — external API call has no connection/read timeout, retry limit, or circuit-breaker behavior.',
    'Workflow works on Author but not in Cloud Service — required OSGi config, service user mapping, or secret variable is missing in the target environment.',
  ],
  bestPractices: [
    'Purge completed workflow instances regularly — they accumulate and slow down the repository.',
    'Use Transient Workflows for DAM asset processing — they don\'t persist to the JCR and are much faster.',
    'Design workflows to be idempotent — if a step runs twice, the result should be the same.',
    'Use async workflow processing for heavy operations to avoid blocking the request thread.',
    'Add timeouts, retries, and clear error logging around every external service call inside a workflow step.',
    'Run workflow code with service users and least-privilege permissions, not administrative sessions.',
    'Keep approval workflows short and auditable; complex branching should be justified by a real compliance requirement.',
  ],
  architectNote: `Workflows are powerful but often over-engineered. Keep workflow models simple — a 3-step approval workflow is better than a 10-step one with complex branching.

**For AEM as a Cloud Service:** Workflows work the same way, but Adobe recommends using Transient Workflows for DAM processing to improve performance. The Workflow Inbox is replaced by the AEM Inbox in the unified shell.`,
  faqs: [
    {
      question: 'Can workflows run on a schedule?',
      answer: 'Not directly, but you can combine workflows with Sling Schedulers. Create a scheduled OSGi job that queries for content meeting certain criteria and programmatically starts a workflow on each result.',
    },
    {
      question: 'What should I check first when workflows pile up in production?',
      answer: 'Check the workflow instances console, launcher rules, error.log entries from custom process steps, queue size, purge configuration, and whether one external integration is timing out for every payload.',
    },
  ],
  keyTakeaways: [
    'Workflows automate multi-step content processes',
    'Workflow Model = definition; Workflow Instance = running execution',
    'Participant Steps assign tasks to users; Process Steps run Java code',
    'Launchers auto-trigger workflows on content events',
    'Purge completed instances regularly to maintain performance',
  ],
  relatedTopics: ['osgi', 'architecture', 'aem-cloud-service'],
};

export const graphql: TopicContent = {
  slug: 'graphql',
  title: 'AEM GraphQL',
  description: 'Learn how AEM\'s GraphQL API enables headless content delivery from Content Fragments to any channel or application.',
  applicableVersions: ['AEM 6.5 SP7+', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'AEM\'s GraphQL API lets you query Content Fragments and deliver structured content to any application — React apps, mobile apps, digital signage, or any system that can make HTTP requests. It\'s how you use AEM as a "headless" CMS.',
  whatIsIt: `AEM provides a GraphQL endpoint that exposes Content Fragment data. Key concepts:

- **GraphQL Endpoint** — \`/content/cq:graphql/global/endpoint.json\` (or custom endpoints)
- **Persisted Queries** — Pre-saved GraphQL queries accessible via simple GET URLs
- **Content Fragment Models** — Define the GraphQL schema automatically
- **Delivery API** — Read-only API for fetching content (not for mutations)

Each Content Fragment Model automatically generates GraphQL types. An "Article" model generates \`ArticleModel\`, \`ArticleModelList\`, \`ArticleByPath\`, etc.`,
  whyWeNeedIt: `GraphQL enables the **headless** and **hybrid** AEM patterns:

- **Headless** — React/Vue/Angular apps fetch content via GraphQL, render their own UI
- **Hybrid** — Some pages use AEM page editor; some sections fetch via GraphQL
- **Omnichannel** — Same content delivered to web, mobile, kiosk, voice assistants
- **Performance** — Fetch exactly the fields you need, no over-fetching`,
  realWorldUsage: `**Real Project: React App consuming AEM Content**

1. Content team creates "Product" fragments in AEM
2. React developer writes a GraphQL query to fetch products
3. React app calls the persisted query endpoint
4. AEM returns JSON with exactly the requested fields
5. React renders the product listing

**Persisted Query URL:**
\`GET /graphql/execute.json/mysite/product-listing\`

This URL is cacheable by CDN and Dispatcher — much better than ad-hoc POST queries.`,
  howItWorks: `**Query Types:**
- \`{ModelName}ByPath\` — Fetch single fragment by path
- \`{ModelName}List\` — Fetch multiple fragments with filtering/sorting
- \`{ModelName}Paginated\` — Paginated results

**Filtering:**
\`\`\`graphql
{
  articleList(
    filter: { category: { _expressions: [{ value: "Technology" }] } }
    sort: "publishDate DESC"
    limit: 10
    offset: 0
  ) { items { title publishDate } }
}
\`\`\`

**Authentication:**
For public content: no auth needed (if content is published)
For preview/draft content: use AEM authentication tokens`,
  example: {
    title: 'GraphQL Queries in Practice',
    description: 'Common GraphQL patterns for AEM Content Fragments.',
    code: [
      {
        label: 'Fetch Articles with GraphQL',
        language: 'graphql',
        code: `# Fetch article list with filtering
query GetTechArticles {
  articleList(
    filter: {
      category: {
        _expressions: [{ value: "Technology", _operator: EQUALS }]
      }
      _path: { _expressions: [{ value: "/content/dam/mysite/articles", _operator: STARTS_WITH }] }
    }
    sort: "publishDate DESC"
    limit: 12
  ) {
    items {
      _path
      headline
      publishDate
      category
      author {
        ... on AuthorModel {
          name
          photo { _path }
        }
      }
      featuredImage {
        _path
        width
        height
      }
      body {
        plaintext
      }
    }
    _count
  }
}`,
      },
      {
        label: 'React Hook for AEM GraphQL',
        language: 'javascript',
        code: `// Custom hook for AEM persisted queries
import { useState, useEffect } from 'react';

const AEM_HOST = 'https://publish.mysite.com';

export function useAEMQuery(queryName, variables = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(variables);
    const url = \`\${AEM_HOST}/graphql/execute.json/mysite/\${queryName};\${params}\`;

    fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => {
        setData(json.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [queryName]);

  return { data, loading, error };
}

// Usage in a component
function ArticleList() {
  const { data, loading } = useAEMQuery('article-listing');

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.articleList?.items?.map(article => (
        <li key={article._path}>{article.headline}</li>
      ))}
    </ul>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between ad-hoc queries and persisted queries?',
      answer: 'Ad-hoc queries are POST requests with the query in the body — flexible but not cacheable. Persisted queries are pre-saved on the server and accessed via GET URLs — cacheable by Dispatcher and CDN. Always use persisted queries in production.',
    },
    {
      question: 'Can I use GraphQL to create or update content?',
      answer: 'No. AEM\'s GraphQL API is read-only. It\'s for content delivery, not content management. To create or update content programmatically, use AEM\'s REST APIs (Assets HTTP API, Sites API) or Sling POST Servlet.',
    },
  ],
  productionIssues: [
    'GraphQL endpoint returns 404 — GraphQL feature not enabled, or endpoint not configured. Enable in Tools → Assets → Content Fragment Models.',
    'Query returns null for fragment references — the referenced fragment is not published. Publish all fragments in the reference chain.',
    'CORS errors in browser — configure CORS settings in AEM\'s OSGi configuration for the GraphQL endpoint.',
    'Slow queries — no pagination, fetching too many fragments. Add limit/offset and use persisted queries.',
    'Persisted query works on Author but fails on Publish — the query, endpoint configuration, Content Fragment Models, or referenced fragments were not published.',
    'GraphQL blocked by Dispatcher — filters do not allow the persisted query execution path or the endpoint-specific URL pattern.',
    'CDN serves stale GraphQL data — persisted query cache headers or invalidation rules do not match the freshness requirement for that content type.',
    'Nested fragment queries become slow — the model allows deep references and the query fetches more fields than the channel actually needs.',
  ],
  bestPractices: [
    'Always use persisted queries in production — they\'re cacheable and prevent arbitrary query execution.',
    'Design Content Fragment Models with GraphQL in mind — the model IS the API schema.',
    'Use fragment references to create relationships, but avoid deep nesting that causes N+1 query issues.',
    'Enable CORS correctly for your front-end domains — too permissive is a security risk.',
    'Publish Content Fragment Models, endpoint configuration, persisted queries, fragments, and referenced assets as one release checklist.',
    'Set explicit cache-control expectations per persisted query so product listings, legal notices, and news feeds do not share the same freshness policy.',
    'Version or deprecate persisted queries carefully; front-end apps may depend on field names and response shape.',
  ],
  architectNote: `GraphQL is the future of AEM content delivery. If you're designing a new AEM project, plan for headless from the start — even if you're not going headless today.

**Key decision:** REST vs GraphQL? For AEM, GraphQL is preferred for Content Fragment delivery because it matches the fragment model naturally. Use REST APIs for DAM operations (asset upload, metadata update).

**For AEM as a Cloud Service:** The GraphQL endpoint is production-ready and Adobe is investing heavily in it. The Content Fragment Editor and Model editor in AEMaaCS are significantly improved over AEM 6.5.`,
  faqs: [
    {
      question: 'Can I use GraphQL subscriptions with AEM?',
      answer: 'No. AEM\'s GraphQL implementation supports queries only — no mutations or subscriptions. For real-time content updates, use webhooks or polling patterns on the client side.',
    },
    {
      question: 'What is the fastest way to troubleshoot a broken headless page?',
      answer: 'Call the persisted query URL directly, confirm the endpoint is published, verify every referenced fragment and asset is published, check Dispatcher filters, then inspect CORS and cache headers from the browser network tab.',
    },
  ],
  keyTakeaways: [
    'AEM GraphQL = read-only API for Content Fragment delivery',
    'Content Fragment Models automatically define the GraphQL schema',
    'Always use persisted queries in production — they\'re cacheable',
    'Enables headless delivery to React, mobile, and any HTTP client',
    'CORS configuration required for browser-based clients',
  ],
  relatedTopics: ['content-fragments', 'aem-cloud-service', 'sling-models'],
};
