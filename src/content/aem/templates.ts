import type { TopicContent } from '../types';

export const templates: TopicContent = {
  slug: 'templates',
  title: 'AEM Templates',
  description: 'Understand AEM templates — the foundation of every page. Learn the difference between static and editable templates and how they shape the author experience.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'An AEM template is the blueprint for a page. When an author creates a new page, they pick a template. That template determines the page\'s structure, which components are available, and what the initial content looks like. Think of it as a page mold — every page poured from the same mold has the same basic shape.',
  whatIsIt: `In AEM, every page is based on a template. A template defines:

- **Page structure** — the layout, zones, and containers on the page
- **Page component** — the Java/HTL code that renders the page
- **Allowed components** — which components authors can add
- **Initial content** — pre-populated content when a new page is created
- **Thumbnail** — what authors see when choosing a template

There are two types of templates in AEM:
1. **Static Templates** (legacy) — defined in code under \`/apps\`, require developer changes
2. **Editable Templates** (modern) — created in AEM's UI, managed by template authors

New projects should always use Editable Templates.`,
  whyWeNeedIt: `Templates solve the "blank page problem." Without templates:
- Every new page would start completely empty
- Authors would have to rebuild the header, footer, and navigation on every page
- There would be no consistency across pages
- Developers would need to be involved in every page creation

With templates:
- Authors pick a template and get a page that's already structured
- Header and footer are locked in — consistent across all pages
- Only appropriate components are available for each page type
- New pages are created in seconds, not hours`,
  realWorldUsage: `A typical enterprise AEM project has multiple templates:

- **Home Page Template** — one per site, very structured
- **Article Template** — for blog posts and news articles
- **Landing Page Template** — flexible layout for campaigns
- **Product Page Template** — structured for product information
- **Search Results Template** — specific to search functionality

Template authors (usually senior content people or UX leads) create and maintain these templates. Developers build the underlying page components and components that templates use.`,
  howItWorks: `**Static Templates (Legacy)**

Stored in \`/apps/mysite/templates/\`. Each template is a node with:
- \`jcr:primaryType\` = \`cq:Template\`
- \`sling:resourceType\` — points to the page component
- \`allowedPaths\` — where this template can be used
- \`ranking\` — order in the template picker

**Editable Templates (Modern)**

Stored in \`/conf/mysite/settings/wcm/templates/\`. Created through the Template Editor UI. Has three layers:
- **Structure** — locked components (header, footer)
- **Initial Content** — pre-populated editable content
- **Layout** — responsive grid configuration

**Template → Page Component → HTL**

When a page is rendered, AEM:
1. Reads the page's \`sling:resourceType\` (set by the template)
2. Finds the page component at that path in \`/apps\`
3. Runs the page component's HTL script
4. The HTL script renders the page structure and includes child components`,
  example: {
    title: 'Static Template vs Editable Template',
    description: 'Comparing the two template approaches with real code examples.',
    code: [
      {
        label: 'Static Template (Legacy)',
        language: 'xml',
        code: `<!-- /apps/mysite/templates/article-page/.content.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Template"
    jcr:title="Article Page"
    jcr:description="Template for news and blog articles"
    ranking="{Long}200"
    allowedPaths="[/content/mysite/en/articles(/.*)?,/content/mysite/en/blog(/.*)?]"
    sling:resourceType="mysite/components/page/article">
  <!-- Initial content node -->
  <jcr:content
      jcr:primaryType="cq:PageContent"
      sling:resourceType="mysite/components/page/article"
      jcr:title="New Article">
    <root jcr:primaryType="nt:unstructured"
          sling:resourceType="wcm/foundation/components/responsivegrid">
      <header jcr:primaryType="nt:unstructured"
              sling:resourceType="mysite/components/structure/header"/>
    </root>
  </jcr:content>
</jcr:root>`,
      },
      {
        label: 'Page Component HTL (page.html)',
        language: 'html',
        code: `<!DOCTYPE html>
<html data-sly-use.page="com.adobe.cq.wcm.core.components.models.Page"
      lang="\${page.language}">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>\${page.title}</title>

    <!-- Load CSS client libraries -->
    <sly data-sly-use.clientlib="/libs/granite/sightly/templates/clientlib.html"
         data-sly-call="\${clientlib.css @ categories='mysite.base'}"/>

    <!-- SEO Meta tags -->
    <meta name="description" content="\${page.description}"/>
    <link rel="canonical" href="\${page.canonicalUrl}"/>
</head>
<body class="page \${page.cssClassNames}">

    <!-- Header - from Experience Fragment or component -->
    <sly data-sly-resource="header"/>

    <!-- Main content area -->
    <main id="main-content">
        <sly data-sly-resource="root"/>
    </main>

    <!-- Footer -->
    <sly data-sly-resource="footer"/>

    <!-- Load JS client libraries -->
    <sly data-sly-call="\${clientlib.js @ categories='mysite.base'}"/>

</body>
</html>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the relationship between a template and a page component?',
      answer: 'A template specifies which page component to use (via sling:resourceType). The page component provides the HTML structure (header, main, footer) and the rendering logic. The template is the configuration; the page component is the code.',
    },
    {
      question: 'Can I change a page\'s template after it\'s created?',
      answer: 'It\'s possible but complex. AEM doesn\'t have a built-in "change template" feature. You\'d need to manually update the page\'s sling:resourceType and restructure the content. In practice, it\'s usually easier to create a new page with the correct template.',
    },
    {
      question: 'What is allowedPaths in a static template?',
      answer: 'It restricts where a template can be used. If allowedPaths is set to /content/mysite/en/articles(/.*)?  then this template only appears in the page creation wizard when you\'re creating pages under /content/mysite/en/articles.',
    },
  ],
  productionIssues: [
    'Template not appearing in page creation wizard — template is not enabled (for Editable Templates) or allowedPaths doesn\'t match the current location (for Static Templates).',
    'Page renders blank — page component has an error. Check error.log for HTL or Sling Model exceptions.',
    'Wrong template used for a page — check the page\'s sling:resourceType property in CRXDE.',
    'Authors can create pages in the wrong site section — allowed templates or parent-page restrictions are too broad.',
    'Template changes do not reach Publish — /conf template or policy content was changed but not published or packaged consistently across environments.',
    'Header/footer missing after deployment — page component or Experience Fragment reference used by the template was not deployed, configured, or published.',
  ],
  bestPractices: [
    'Always use Editable Templates for new projects — they\'re more flexible and don\'t require code changes.',
    'Create a clear naming convention for templates (e.g., "Article Page", "Landing Page", "Product Page").',
    'Limit the number of templates — too many templates confuse authors. Aim for flexibility through component configuration, not more templates.',
    'Lock header and footer in the Structure layer so authors can\'t accidentally break the page structure.',
    'Define allowed templates per site section so authors see only the templates that make sense for that content tree.',
    'Treat /conf changes as governed content: review, package or publish, and test them before production rollout.',
    'Document template ownership and approval flow because template changes can affect thousands of pages.',
  ],
  architectNote: `Templates are the **governance layer** of AEM. A well-designed template system gives authors freedom within boundaries — they can create diverse pages without breaking the design system.

**Template Design Principle:** Design templates to be as flexible as possible while maintaining brand consistency. The more templates you have, the more maintenance burden you create. Aim for 5–10 templates that cover all use cases through component flexibility.`,
  faqs: [
    {
      question: 'How do I make a template available only for specific authors?',
      answer: 'Use AEM\'s permission system. Templates in /conf can have ACLs applied. You can restrict which user groups can create pages with specific templates. This is useful for templates that require special training or approval.',
    },
    {
      question: 'Can a page template include another page template?',
      answer: 'No, templates don\'t nest. But a page component (used by a template) can include Experience Fragments that provide reusable sections. This is how header and footer are typically shared across templates.',
    },
  ],
  keyTakeaways: [
    'Templates are blueprints for pages — they define structure and available components',
    'Static Templates = code in /apps; Editable Templates = config in /conf',
    'Always use Editable Templates for new projects',
    'Templates specify which page component renders the page',
    'Template governance: locked structure + flexible content areas',
  ],
  relatedTopics: ['editable-templates', 'components', 'client-libraries'],
};
