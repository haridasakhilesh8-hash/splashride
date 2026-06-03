import type { TopicContent } from '../types';

export const components: TopicContent = {
  slug: 'components',
  title: 'AEM Components',
  description: 'Learn how AEM components work in real projects — from structure to rendering, the way a senior developer explains it.',
  applicableVersions: ['AEM 6.3+', 'AEM 6.4', 'AEM 6.5', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'An AEM component is a reusable building block that authors drag onto a page to add content. Think of it like a LEGO brick — each brick has a specific shape (structure), a look (rendering), and a behavior (logic).',
  whatIsIt: `An AEM component is a combination of:

- A **JCR node** under \`/apps/your-project/components/\` that defines the component
- A **dialog** (XML) that gives authors a form to fill in content
- An **HTL/Sightly template** that renders the HTML
- An optional **Sling Model** (Java) that provides business logic
- Optional **CSS/JS** via Client Libraries

Every piece of content you see on an AEM page — a banner, a card, a text block, a navigation — is a component.`,
  whyWeNeedIt: `Without components, every page would need a developer to hard-code HTML. Components solve this by:

- Letting **authors add and configure content** without touching code
- Ensuring **consistent design** across thousands of pages
- Making content **reusable and maintainable**
- Allowing **developers to build once, authors to use many times**

In enterprise projects, a typical website has 30–80 custom components. The component model is what makes AEM different from a static website builder.`,
  realWorldUsage: `In a real project, here's how components come to life:

1. **Business Analyst** defines: "We need a Hero Banner with a heading, sub-text, background image, and a CTA button"
2. **UX Designer** creates the design mockup
3. **AEM Developer** creates the component — dialog, HTL, Sling Model
4. **Front-end Developer** writes the CSS/JS in Client Libraries
5. **Content Author** drags the component onto a page, fills in the dialog, and publishes

In practice, most AEM projects use a mix of **custom components** (built by your team) and **Core Components** (Adobe's open-source component library). You'll often extend Core Components rather than building from scratch.`,
  howItWorks: `Here's the anatomy of a component:

**1. Component Node (\`/apps/mysite/components/hero\`)**
This is the JCR node that registers the component. Key properties:
- \`jcr:primaryType\` = \`cq:Component\`
- \`jcr:title\` = \`Hero Banner\` (shown in component picker)
- \`componentGroup\` = \`My Site - Content\`
- \`sling:resourceSuperType\` = used for inheritance

**2. Dialog (\`cq:dialog\`)**
XML structure that defines the author-facing form. Uses Granite UI widgets (textfield, pathbrowser, checkbox, etc.).

**3. HTL Template (\`hero.html\`)**
The rendering script. AEM finds this file by matching the \`sling:resourceType\` of the content node to the component path.

**4. Sling Model (\`HeroModel.java\`)**
Java class annotated with \`@Model\` that adapts the resource and provides data to HTL via \`@Inject\` or \`@ValueMapValue\`.

**5. Content Node (stored in \`/content\`)**
When an author drops a component and fills the dialog, AEM saves the values as a JCR node under the page's \`jcr:content\`.`,
  example: {
    title: 'Building a Simple Hero Banner Component',
    description: 'A minimal but complete example of a Hero Banner component from node definition to rendering.',
    code: [
      {
        label: 'Component Node (.content.xml)',
        language: 'xml',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Hero Banner"
    componentGroup="MyProject - Content"
    sling:resourceSuperType="core/wcm/components/image/v3/image"/>`,
      },
      {
        label: 'Dialog (_cq_dialog/.content.xml)',
        language: 'xml',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="nt:unstructured"
    jcr:title="Hero Banner"
    sling:resourceType="cq/gui/components/authoring/dialog">
  <content jcr:primaryType="nt:unstructured"
      sling:resourceType="granite/ui/components/coral/foundation/container">
    <items jcr:primaryType="nt:unstructured">
      <heading
          jcr:primaryType="nt:unstructured"
          sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
          fieldLabel="Heading"
          name="./heading"
          required="{Boolean}true"/>
      <ctaLabel
          jcr:primaryType="nt:unstructured"
          sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
          fieldLabel="CTA Button Label"
          name="./ctaLabel"/>
      <ctaLink
          jcr:primaryType="nt:unstructured"
          sling:resourceType="granite/ui/components/coral/foundation/form/pathbrowser"
          fieldLabel="CTA Link"
          name="./ctaLink"/>
    </items>
  </content>
</jcr:root>`,
      },
      {
        label: 'Sling Model (HeroModel.java)',
        language: 'java',
        code: `@Model(
    adaptables = SlingHttpServletRequest.class,
    adapters = HeroModel.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class HeroModel {

    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String ctaLabel;

    @ValueMapValue
    private String ctaLink;

    public String getHeading() { return heading; }
    public String getCtaLabel() { return ctaLabel; }
    public String getCtaLink() { return ctaLink; }
}`,
      },
      {
        label: 'HTL Template (hero.html)',
        language: 'html',
        code: `<sly data-sly-use.model="com.myproject.core.models.HeroModel"/>

<div class="hero-banner">
    <h1 class="hero-banner__heading">
        \${model.heading}
    </h1>
    <sly data-sly-test="\${model.ctaLabel}">
        <a href="\${model.ctaLink}" class="hero-banner__cta">
            \${model.ctaLabel}
        </a>
    </sly>
</div>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between a component and a template?',
      answer: 'A template defines the overall page structure and which components are allowed. A component is the actual content block placed inside the page. Templates are the canvas; components are what you paint on it.',
    },
    {
      question: 'Do I always need a Sling Model?',
      answer: 'No. For very simple components (just a text field or a link), you can read properties directly with ${properties.heading} in HTL. Sling Models shine when you need logic, computed values, or external service calls.',
    },
    {
      question: 'What is sling:resourceSuperType?',
      answer: 'It\'s component inheritance. If your Hero inherits from Core Components Image, it gets all of Image\'s behavior and you only override what you need. Think of it like Java class extension for components.',
    },
    {
      question: 'Where does component content get stored?',
      answer: 'Under /content/your-site/page/jcr:content/root/container/hero. The content node\'s sling:resourceType points back to your component in /apps, which is how AEM knows which script to use for rendering.',
    },
  ],
  productionIssues: [
    'Dialog not showing up after deployment — usually a missing or malformed .content.xml in the _cq_dialog folder.',
    'Component renders blank on publish — the Sling Model class is not included in the bundle, or the OSGi bundle failed to activate.',
    'Authors cannot see the component in the Component Picker — componentGroup is wrong or the template\'s allowed components policy doesn\'t include your component.',
    'Edits in dialog don\'t save — the name attribute in dialog XML doesn\'t match what the Sling Model reads, or the property path is missing the "./" prefix.',
    'Component works in Author but breaks in Publish — often a missing ClientLib category or a Sling Model that calls an OSGi service not available on publish.',
  ],
  bestPractices: [
    'Always use Core Components as a base when possible — they handle accessibility, responsive images, and author experience out of the box.',
    'Use DefaultInjectionStrategy.OPTIONAL in Sling Models to prevent null pointer exceptions when a field is not filled.',
    'Keep dialog fields minimal — only expose what the author actually needs. Too many options confuse authors and create inconsistent pages.',
    'Name your component clearly and use a meaningful componentGroup so authors can find it easily.',
    'Never put business logic in HTL — use Sling Models for any computation, formatting, or conditional logic.',
    'Write unit tests for Sling Models using AemContext from wcm.io testing.',
  ],
  architectNote: `In large enterprise projects, components follow a strict hierarchy:

**Base Layer** → Core Components (Adobe)
**Brand Layer** → Your project's base components (extend Core)
**Site Layer** → Site-specific overrides

This means you rarely build from scratch. You extend, override, and configure. A good architect will also define a **Component Library** so developers and authors can see all components in isolation before they hit a real page.

For AEM as a Cloud Service, ensure your components are compatible with the **Headless** delivery model using Sling Models Exporter — even if you're not headless today, it's future-proofing.`,
  faqs: [
    {
      question: 'How many components should a typical AEM project have?',
      answer: 'A typical enterprise project has 30–60 custom components. The goal is to keep it minimal — more components mean more maintenance. Use Core Components for generic content and only build custom components for truly unique business requirements.',
    },
    {
      question: 'What is the difference between a parsys and a container?',
      answer: 'parsys (Paragraph System) is the old AEM 6.x way of creating droppable areas. Container is the modern equivalent used with Editable Templates. In new projects, always use the Layout Container from Core Components instead of parsys.',
    },
    {
      question: 'Can a component include another component?',
      answer: 'Yes, using data-sly-resource in HTL. This is called component composition. For example, a Card component might include a separate Image component inside it. Be careful with deep nesting — it makes debugging harder.',
    },
    {
      question: 'What is an overlay vs an override?',
      answer: 'An overlay copies a file from /libs to /apps at the same path, giving you full control. An override uses sling:resourceSuperType to inherit and selectively change behavior. Overlays are fragile (break on upgrades); overrides are preferred.',
    },
    {
      question: 'How do I make a component available only on specific templates?',
      answer: 'Use Template Editor\'s policy configuration. In the Editable Template editor, go to the structure mode and configure the Layout Container\'s allowed components policy to include only the components you want.',
    },
  ],
  keyTakeaways: [
    'A component = Node + Dialog + HTL + Sling Model + ClientLibs',
    'Content lives in /content; component code lives in /apps',
    'sling:resourceType is the bridge between content and rendering',
    'Always extend Core Components instead of building from zero',
    'Keep dialogs simple — authors are not developers',
    'Sling Models handle logic; HTL handles presentation',
  ],
  relatedTopics: ['templates', 'editable-templates', 'sling-models', 'htl', 'client-libraries'],
};
