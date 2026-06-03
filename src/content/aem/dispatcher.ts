import type { TopicContent } from '../types';

export const dispatcher: TopicContent = {
  slug: 'dispatcher',
  title: 'AEM Dispatcher',
  description: 'Understand the AEM Dispatcher — the caching and security layer that sits in front of your publish instance. Learn how it works, how to configure it, and why it breaks in production.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'The Dispatcher is a caching reverse proxy that sits between your users and the AEM Publish server. It caches rendered HTML pages so AEM doesn\'t have to render the same page thousands of times. It also acts as a security filter, blocking direct access to AEM.',
  whatIsIt: `The Dispatcher is an **Apache HTTP Server module** (mod_dispatcher) that Adobe provides. It does two main jobs:

**1. Caching**
When a user requests a page, the Dispatcher checks if it has a cached version. If yes, it serves the cached HTML directly — AEM never gets involved. This makes your website extremely fast.

**2. Load Balancing & Security**
The Dispatcher acts as a reverse proxy in front of one or more AEM Publish instances. It:
- Blocks access to sensitive AEM URLs (like /system/console, /crx/de)
- Distributes load across multiple publish instances
- Provides a security layer between the internet and AEM

Without the Dispatcher, every page request would hit AEM directly — which would be slow and expose your AEM instance to the internet.`,
  whyWeNeedIt: `**Performance:** AEM rendering is expensive. A complex page might take 200–500ms to render. With Dispatcher caching, the same page is served in under 10ms from the filesystem.

**Scalability:** Without caching, a traffic spike would bring AEM down. With Dispatcher, most requests never reach AEM.

**Security:** AEM's author and publish instances should never be directly accessible from the internet. Dispatcher acts as the gatekeeper.

**High Availability:** Dispatcher can route around a failed publish instance, keeping the site up.`,
  realWorldUsage: `In a real project, the Dispatcher setup looks like this:

**Author Flow:**
Author → Author Instance (no Dispatcher)

**Publish Flow:**
User → CDN → Dispatcher → AEM Publish

**Typical Dispatcher configuration tasks:**
- Configure which pages to cache (usually everything except /bin, /libs, /apps paths)
- Configure cache invalidation (flush rules)
- Set up vanity URL rewrites
- Block sensitive URLs (/system/console, /crx/de, /bin/querybuilder)
- Configure sticky sessions for personalized content
- Set up HTTP headers (Cache-Control, X-Frame-Options)

**Cache Invalidation:**
When an author publishes a page, AEM sends a flush request to the Dispatcher, which deletes the cached version. Next request regenerates the cache.`,
  howItWorks: `**Request Flow:**

1. User requests \`/en/home.html\`
2. Dispatcher checks its cache folder (usually \`/var/cache/dispatcher\`)
3. If cache exists → serve cached file directly (fast!)
4. If no cache → forward request to AEM Publish
5. AEM renders the page, returns HTML
6. Dispatcher caches the HTML to disk
7. Dispatcher returns HTML to user

**Cache Invalidation Flow:**

1. Author publishes a page in AEM Author
2. AEM Author replicates content to AEM Publish
3. AEM Publish sends a flush request to Dispatcher
4. Dispatcher deletes the cached file for that page
5. Next request regenerates the cache

**Key Configuration Files:**

- \`dispatcher.any\` — Main configuration file
- \`filters.any\` — URL allow/block rules
- \`cache.any\` — What to cache and for how long
- \`virtualhosts.any\` — Domain mapping
- \`renders.any\` — AEM Publish instance addresses

**Cache Storage:**
Dispatcher stores cache as actual files on disk, mirroring the URL structure. \`/en/home.html\` is stored as a file at \`/var/cache/dispatcher/en/home.html\`.`,
  example: {
    title: 'Dispatcher Configuration Examples',
    description: 'Key sections of dispatcher.any configuration with explanations.',
    code: [
      {
        label: 'filters.any — Security Rules',
        language: 'apache',
        code: `/filter {
    # Block everything by default
    /0001 { /type "deny" /url "*" }

    # Allow public pages
    /0010 { /type "allow" /url "/content/mysite/*" }
    /0011 { /type "allow" /url "/libs/granite/csrf/token.json" }

    # Allow static assets
    /0020 { /type "allow" /url "/etc.clientlibs/*" }
    /0021 { /type "allow" /url "/content/dam/*" }

    # Block sensitive paths (always include these!)
    /0100 { /type "deny" /url "/admin*" }
    /0101 { /type "deny" /url "/system/console*" }
    /0102 { /type "deny" /url "/crx/*" }
    /0103 { /type "deny" /url "/bin/querybuilder*" }
    /0104 { /type "deny" /url "*.infinity.json" }
    /0105 { /type "deny" /url "*.tidy.json" }

    # Allow specific API endpoints
    /0200 { /type "allow" /url "/bin/myproject/api*" }
}`,
      },
      {
        label: 'cache.any — Caching Rules',
        language: 'apache',
        code: `/cache {
    # Where to store cached files
    /docroot "/var/cache/dispatcher"

    # What to cache
    /rules {
        # Cache everything by default
        /0000 { /glob "*" /type "allow" }

        # Don't cache these paths
        /0001 { /glob "/bin/*" /type "deny" }
        /0002 { /glob "/libs/*" /type "deny" }
        /0003 { /glob "*.nocache.html" /type "deny" }
        /0004 { /glob "/content/mysite/*/userdata*" /type "deny" }
    }

    # Cache invalidation
    /invalidate {
        /0000 { /glob "*" /type "deny" }
        /0001 { /glob "*.html" /type "allow" }
        /0002 { /glob "/etc/segmentation.segment.js" /type "allow" }
        /0003 { /glob "*/analytics.sitecatalyst.js" /type "allow" }
    }

    # Allow/deny cached content to be served stale
    /allowedClients {
        /0000 { /glob "*.*.*.*" /type "deny" }
        # Only AEM Publish can flush the cache
        /0001 { /glob "10.0.0.*" /type "allow" }
    }

    # HTTP headers to cache
    /headers {
        "Cache-Control"
        "Content-Disposition"
        "Content-Type"
        "Expires"
        "Last-Modified"
        "X-Content-Type-Options"
    }
}`,
      },
      {
        label: 'Rewrite Rules (mod_rewrite)',
        language: 'apache',
        code: `# Apache VirtualHost with Dispatcher
<VirtualHost *:80>
    ServerName www.mysite.com
    DocumentRoot /var/cache/dispatcher

    # Redirect HTTP to HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # Vanity URL rewrites
    RewriteRule ^/home$ /content/mysite/en/home.html [L,PT]
    RewriteRule ^/about$ /content/mysite/en/about-us.html [L,PT]

    # Security headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"

    # Enable Dispatcher module
    <Directory />
        ModMimeUsePathInfo On
    </Directory>
</VirtualHost>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my published content not show up immediately?',
      answer: 'The Dispatcher served the old cached version. After publishing, AEM sends a flush request to invalidate the cache. If the flush didn\'t work, check: 1) Dispatcher flush agent configuration in Author replication agents, 2) Network connectivity between Publish and Dispatcher, 3) The flush agent\'s log in AEM.',
    },
    {
      question: 'What is the difference between Dispatcher flush and cache invalidation?',
      answer: 'They\'re the same thing. "Flush" is the AEM term for sending the invalidation request. "Cache invalidation" is what the Dispatcher does when it receives that request — it deletes the cached file so the next request regenerates it.',
    },
    {
      question: 'Can the Dispatcher cache personalized content?',
      answer: 'No. Personalized content (content that varies per user) should not be cached by Dispatcher. Use client-side personalization (JavaScript + APIs) or configure the Dispatcher to not cache URLs that contain personalized content.',
    },
    {
      question: 'What is a "statfile" and why does it matter?',
      answer: 'A statfile is a file the Dispatcher uses to track when the cache was last invalidated. When AEM flushes a page, the Dispatcher updates the statfile. All cached files older than the statfile are considered stale. The statfile level determines how broadly the cache is invalidated.',
    },
  ],
  productionIssues: [
    'Published content not appearing — flush agent not configured, or Dispatcher can\'t reach the flush endpoint. Check replication agent logs.',
    'Entire site cache wiped on every publish — statfile level set too high, invalidating too many pages. Tune /statfileslevel in cache config.',
    'Personalized content showing wrong data — personalized pages are being cached. Add /nocache selectors or configure rules to not cache those URLs.',
    '403 errors on valid URLs — Dispatcher filter rules are too strict. Check filters.any and ensure the URL pattern is allowed.',
    'Dispatcher serving stale content after deployment — old cached files remain. Run a full cache flush after every deployment.',
    'Session-based content cached — requests with Set-Cookie headers should not be cached. Configure /ignoreUrlParams and cookie handling.',
  ],
  bestPractices: [
    'Always deny everything by default in filters.any and explicitly allow only what\'s needed.',
    'Never allow /crx/de, /system/console, or /bin/querybuilder through the Dispatcher.',
    'Set appropriate Cache-Control headers in AEM to control browser caching in addition to Dispatcher caching.',
    'Use /statfileslevel to control cache invalidation granularity — level 2 or 3 is usually appropriate.',
    'Test Dispatcher configuration locally using the Dispatcher SDK before deploying.',
    'Monitor cache hit ratio — a healthy Dispatcher should have 90%+ cache hit rate.',
    'Use URL fingerprinting for client libraries so they can be cached indefinitely.',
  ],
  architectNote: `The Dispatcher is often the **most misunderstood** part of AEM architecture. Here are the things architects need to get right:

**Cache Strategy:** Design your URL structure with caching in mind. Personalized URLs, session-based content, and dynamic data should never be cached at the Dispatcher level. Use client-side rendering for personalization.

**Security Hardening:** The Dispatcher's filter rules are your first line of defense. Work with your security team to review filters.any before go-live. Adobe publishes a security checklist — use it.

**AEM as a Cloud Service:** In AEMaaCS, the Dispatcher configuration is managed through the Cloud Manager pipeline. The Dispatcher SDK allows local testing. The CDN layer (Fastly) sits in front of the Dispatcher, adding another caching layer.

**Performance Tip:** For high-traffic sites, consider a two-tier cache: CDN (Fastly/Akamai) → Dispatcher → AEM Publish. Most traffic should never reach AEM.`,
  hasDiagram: true,
  diagramType: 'dispatcher',
  faqs: [
    {
      question: 'How do I test Dispatcher configuration locally?',
      answer: 'Adobe provides the Dispatcher SDK (for AEMaaCS) and Docker-based Dispatcher tools. For AEM 6.5, you can use the Dispatcher Converter tool. Always test filter rules with curl commands before deploying to production.',
    },
    {
      question: 'What is the difference between Dispatcher caching and CDN caching?',
      answer: 'Dispatcher cache is stored on the Dispatcher server\'s filesystem — it\'s close to AEM and handles cache invalidation from AEM. CDN cache is distributed globally — it\'s closer to users but harder to invalidate quickly. Use both: CDN for global performance, Dispatcher for origin protection.',
    },
    {
      question: 'Can I have multiple Dispatcher instances?',
      answer: 'Yes. Large sites often have multiple Dispatcher instances behind a load balancer, each with its own cache. Cache invalidation must be sent to all Dispatcher instances when content is published.',
    },
    {
      question: 'How does the Dispatcher handle HTTPS?',
      answer: 'The Dispatcher itself handles HTTP. SSL termination is done at the Apache/load balancer level before the Dispatcher module. Configure your SSL certificates in the Apache VirtualHost, not in the Dispatcher configuration.',
    },
    {
      question: 'What happens to the Dispatcher cache during an AEM upgrade?',
      answer: 'The Dispatcher cache remains intact during AEM upgrades. However, if your component output changes after an upgrade, you should flush the entire cache after the upgrade is complete to ensure users see the new rendered output.',
    },
  ],
  keyTakeaways: [
    'Dispatcher = caching reverse proxy + security filter in front of AEM Publish',
    'Cache is stored as files on disk — fast to serve, easy to flush',
    'Flush = delete cached file → next request regenerates it',
    'Filter rules are your security layer — deny everything, allow explicitly',
    'Never cache personalized, session-based, or user-specific content',
    'Monitor cache hit ratio — 90%+ is healthy for a well-configured Dispatcher',
  ],
  relatedTopics: ['architecture', 'aem-cloud-service', 'workflows'],
};
