import type { TopicContent } from '../types';

export const editableTemplates: TopicContent = {
  slug: 'editable-templates',
  title: 'Editable Templates',
  description: 'Learn how Editable Templates replaced static templates in AEM and how they give template authors control over page structure without developer involvement.',
  applicableVersions: ['AEM 6.2+', 'AEM 6.5', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Editable Templates let non-developers (template authors) create and modify page templates using a visual editor. Unlike old static templates (which required code changes), Editable Templates are configured in AEM\'s UI. You define the structure, set which components are allowed, and configure initial content — all without touching code.',
  whatIsIt: `An Editable Template is a template created and managed in AEM's Template Editor UI (not in code). It consists of three layers:

**1. Structure Layer**
The fixed skeleton of the page — header, footer, main content area. Components here are locked and can't be moved or deleted by page authors. Only template authors can change them.

**2. Initial Content Layer**
Pre-populated content that appears when a new page is created. Authors can modify or delete this content. Think of it as the "starting point" for new pages.

**3. Layout Layer**
Defines the responsive grid breakpoints for the page. Controls how components behave at different screen sizes.

Templates are stored in \`/conf/your-site/settings/wcm/templates/\` and are managed through AEM's Tools → Sites → Templates UI.`,
  whyWeNeedIt: `**The problem with old Static Templates:**
- Stored in \`/apps\` as code
- Every change required a developer and a deployment
- No visual editor — just XML files
- Template authors had to rely on developers for every update

**Editable Templates solve this:**
- Template authors can create and modify templates in the UI
- No code deployment needed for template changes
- Visual editor shows exactly what the page will look like
- Policy system controls which components are allowed
- Locked vs. unlocked areas give clear governance

In enterprise projects, this is critical — marketing teams need to create new landing page templates without waiting for development sprints.`,
  realWorldUsage: `**Real Project Setup:**

1. **Developer** creates the template type (the base template structure in code — one-time setup)
2. **Template Author** (usually a senior content person or UX lead) creates templates using the Template Editor
3. **Content Author** creates pages using those templates
4. **Developer** creates components that template authors can add to templates

**Common Templates in a Project:**
- Home Page Template
- Article Page Template
- Landing Page Template
- Product Page Template
- Campaign Page Template

**Governance Model:**
- Template authors control structure and allowed components
- Content authors fill in content within that structure
- Developers build the components that both groups use`,
  howItWorks: `**Template Policies:**

Policies are the most important concept in Editable Templates. A policy defines:
- Which components are allowed in a container
- Default configuration for components (e.g., default image sizes)
- Design properties (color themes, font choices)

Policies are stored in \`/conf/your-site/settings/wcm/policies/\` and can be shared across multiple templates.

**Template Structure in JCR:**
\`\`\`
/conf/mysite/settings/wcm/templates/
  article-page/
    jcr:content/
      jcr:title = "Article Page"
      pageStructure = "mysite/components/page/article"
    structure/         ← Structure layer
      jcr:content/
        root/
          header/    ← Locked header component
          main/      ← Layout container (unlocked)
          footer/    ← Locked footer component
    initial/           ← Initial content layer
      jcr:content/
        root/
          main/
            text/    ← Pre-placed text component
    policies/          ← Policy assignments
\`\`\`

**Allowed Components Policy:**
In the Template Editor, you configure each container's allowed components. This is what controls what authors see in the component picker when editing a page.`,
  example: {
    title: 'Setting Up an Editable Template',
    description: 'The developer\'s role in setting up the template type and page component for Editable Templates.',
    code: [
      {
        label: 'Template Type Configuration',
        language: 'xml',
        code: `<!-- /conf/mysite/settings/wcm/template-types/page/.content.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Template"
    jcr:title="My Site - Page"
    jcr:description="Base template type for all My Site pages"
    ranking="{Long}100">
  <jcr:content
      jcr:primaryType="cq:PageContent"
      sling:resourceType="mysite/components/structure/page"/>
</jcr:root>`,
      },
      {
        label: 'Page Component for Template',
        language: 'xml',
        code: `<!-- /apps/mysite/components/structure/page/.content.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="My Site Page"
    sling:resourceSuperType="core/wcm/components/page/v3/page"
    componentGroup="hidden"/>

<!-- This page component inherits from Core Components page,
     giving you all the standard page features:
     - SEO metadata
     - Open Graph tags
     - Canonical URLs
     - Language settings
     And you only override what you need -->`,
      },
      {
        label: 'Editable Template Structure (created via UI)',
        language: 'xml',
        code: `<!-- This is what AEM creates in JCR when a template author
     builds a template in the Template Editor -->

<!-- /conf/mysite/settings/wcm/templates/article-page/structure/jcr:content -->
<jcr:root
    jcr:primaryType="cq:PageContent"
    sling:resourceType="mysite/components/structure/page">
  <root jcr:primaryType="nt:unstructured"
        sling:resourceType="wcm/foundation/components/responsivegrid">

    <!-- Locked header - authors can't move or delete this -->
    <header jcr:primaryType="nt:unstructured"
            sling:resourceType="mysite/components/structure/header"
            cq:editConfig="...locked..."/>

    <!-- Main content area - authors can add components here -->
    <main jcr:primaryType="nt:unstructured"
          sling:resourceType="wcm/foundation/components/responsivegrid">
      <!-- Allowed components policy applied here -->
    </main>

    <!-- Locked footer -->
    <footer jcr:primaryType="nt:unstructured"
            sling:resourceType="mysite/components/structure/footer"
            cq:editConfig="...locked..."/>
  </root>
</jcr:root>`,
      },
      {
        label: 'Allowed Components Policy',
        language: 'xml',
        code: `<!-- Policy that defines which components are allowed in the main container -->
<!-- /conf/mysite/settings/wcm/policies/wcm/foundation/components/responsivegrid/default -->

<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="nt:unstructured"
    jcr:title="Article Page - Main Content Policy">
  <components jcr:primaryType="nt:unstructured">
    <!-- Core Components -->
    <group_0
        jcr:primaryType="nt:unstructured"
        jcr:title="My Site - Content">
      <components jcr:primaryType="nt:unstructured"
          allowed="[mysite/components/hero,
                    mysite/components/text,
                    mysite/components/image,
                    mysite/components/video,
                    mysite/components/card-list,
                    core/wcm/components/text/v2/text,
                    core/wcm/components/image/v3/image]"/>
    </group_0>
  </components>
</jcr:root>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between a Static Template and an Editable Template?',
      answer: 'Static Templates are defined in code (/apps) and require developer changes to modify. Editable Templates are created and managed in AEM\'s UI by template authors. New projects should always use Editable Templates. Static templates are legacy.',
    },
    {
      question: 'What is the difference between Structure and Initial Content in a template?',
      answer: 'Structure defines locked components that every page based on this template will have (header, footer, navigation). Initial Content defines pre-populated editable content — authors can change or delete it. Structure is the skeleton; Initial Content is the starter content.',
    },
    {
      question: 'Can a content author accidentally break the page structure?',
      answer: 'No. Components in the Structure layer are locked — authors can\'t move, delete, or edit them. Only template authors (with specific permissions) can change the structure. This is the governance model that makes Editable Templates enterprise-ready.',
    },
    {
      question: 'Where are Editable Templates stored?',
      answer: 'In /conf/your-site/settings/wcm/templates/. Unlike Static Templates which are in /apps (code), Editable Templates are in /conf (configuration) and are managed through the UI. They\'re replicated to Publish just like regular content.',
    },
  ],
  productionIssues: [
    'Template not showing in page creation wizard — template is not enabled. Go to Template Editor and enable the template.',
    'Component not appearing in allowed components — the policy for the container doesn\'t include the component. Update the policy in the Template Editor.',
    'Template changes not reflecting on existing pages — existing pages inherit the template structure, but some changes may require the page to be "refreshed" or republished.',
    'Policy changes affecting too many templates — policies are shared across templates. Changing a shared policy affects all templates using it. Create template-specific policies to avoid this.',
    'Template locked components appearing editable — the lock configuration on the component in the Structure layer is not set correctly.',
  ],
  bestPractices: [
    'Create a separate "Template Authors" user group with permissions only to /conf — don\'t give template authors access to /apps.',
    'Use shared policies for common configurations (like image sizes) but template-specific policies for unique allowed component sets.',
    'Design templates to be flexible — don\'t over-lock components. Give authors room to create diverse pages.',
    'Create a "Base" template type that all your templates extend, reducing code duplication.',
    'Document which templates are available and when to use each one — authors need guidance.',
    'Test templates with real content before go-live — template issues often surface when actual content is added.',
  ],
  architectNote: `Editable Templates represent a **fundamental shift** in how AEM governance works. The key insight is the separation of roles:

- **Developers** build components and the template type
- **Template Authors** assemble templates from those components
- **Content Authors** create pages using those templates

This role separation is what makes AEM scalable in enterprise organizations. A well-designed template system means marketing teams can launch new page types without waiting for development.

**Configuration vs. Code:** Editable Templates are configuration (stored in /conf), not code (stored in /apps). This means they can be managed through the AEM UI and don't require code deployments. However, they do need to be replicated to Publish — treat them like content, not code.`,
  faqs: [
    {
      question: 'Can I convert a Static Template to an Editable Template?',
      answer: 'Yes, but it\'s complex. Adobe provides the AEM Modernize Tools (available on GitHub) that can help migrate static templates to editable templates. In practice, it\'s often easier to create new editable templates and migrate content gradually.',
    },
    {
      question: 'How do I restrict which templates are available for a specific section of the site?',
      answer: 'Use the "Allowed Templates" configuration on the parent page or in the page properties. You can specify which templates can be used under a particular section of the site tree.',
    },
    {
      question: 'What is a Template Type vs a Template?',
      answer: 'A Template Type is the base definition (created by developers in /conf/global or /conf/site). A Template is an instance created from a Template Type by template authors. Multiple templates can be created from the same Template Type.',
    },
    {
      question: 'Can Editable Templates be exported/imported between environments?',
      answer: 'Yes. Templates in /conf are replicated through the standard AEM replication mechanism. For moving between environments (dev → staging → prod), use AEM\'s package manager to export and import the /conf content.',
    },
  ],
  keyTakeaways: [
    'Editable Templates replace Static Templates — no code changes needed for template updates',
    'Three layers: Structure (locked), Initial Content (editable starter), Layout (responsive grid)',
    'Policies control which components are allowed in each container',
    'Stored in /conf, not /apps — managed through AEM UI',
    'Role separation: Developers → components, Template Authors → templates, Content Authors → pages',
    'Shared policies reduce duplication but require careful change management',
  ],
  relatedTopics: ['templates', 'components', 'client-libraries', 'sling-models'],
};
