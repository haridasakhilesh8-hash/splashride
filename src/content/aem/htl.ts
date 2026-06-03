import type { TopicContent } from '../types';

export const htl: TopicContent = {
  slug: 'htl',
  title: 'HTL (HTML Template Language)',
  description: 'Master HTL — AEM\'s templating language. Learn the syntax, best practices, and how it keeps your templates clean and secure.',
  applicableVersions: ['AEM 6.1+', 'AEM 6.5', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'HTL (formerly Sightly) is AEM\'s server-side templating language. It\'s HTML with special data-sly-* attributes that let you output dynamic content. It\'s intentionally simple — if you need complex logic, you use a Sling Model.',
  whatIsIt: `HTL stands for **HTML Template Language**. It is:

- AEM's **recommended templating language** (replaced JSP)
- **HTML-valid** — HTL templates are valid HTML files, so designers can open them in a browser
- **Secure by default** — HTL auto-escapes output, preventing XSS attacks
- **Logic-free by design** — complex logic must go in Sling Models or Use-classes
- **Server-side rendered** — runs on the AEM server before sending HTML to the browser

HTL files have the \`.html\` extension and live in your component folder alongside the dialog.`,
  whyWeNeedIt: `Before HTL, AEM used JSP (JavaServer Pages). JSP had serious problems:

- **Security holes** — developers could write unescaped output, causing XSS
- **Mixed concerns** — Java logic mixed with HTML made templates unmaintainable
- **Designer unfriendly** — JSP tags broke HTML structure

HTL solved all of this:
- **Auto-escaping** prevents XSS by default
- **Separation of concerns** — logic stays in Java, templates stay in HTML
- **HTML-valid** — designers can open templates in browsers
- **Simpler syntax** — data-sly-* attributes are easier to read than JSP tags`,
  realWorldUsage: `In a real project, every component has an HTL file. Here's a typical day:

- You create a component folder with \`hero.html\`
- The HTL file reads data from a Sling Model using \`data-sly-use\`
- It conditionally renders sections using \`data-sly-test\`
- It loops over lists using \`data-sly-list\`
- It includes other components using \`data-sly-resource\`
- It includes sub-templates using \`data-sly-template\` and \`data-sly-call\`

HTL is the **glue** between your Java logic and the HTML that authors see in the browser.`,
  howItWorks: `**Core HTL Attributes**

| Attribute | Purpose |
|---|---|
| \`data-sly-use\` | Import a Sling Model or Use-class |
| \`data-sly-test\` | Conditional rendering (like if) |
| \`data-sly-list\` | Loop over a collection |
| \`data-sly-repeat\` | Loop and repeat the element itself |
| \`data-sly-text\` | Set text content |
| \`data-sly-attribute\` | Set HTML attributes |
| \`data-sly-include\` | Include another HTL script |
| \`data-sly-resource\` | Include a child resource/component |
| \`data-sly-template\` | Define a reusable template |
| \`data-sly-call\` | Call a defined template |
| \`data-sly-unwrap\` | Remove the wrapper element |

**Expression Syntax**

HTL uses \`\${...}\` for expressions. You can access properties, call getters, and apply options:

- \`\${model.title}\` — calls model.getTitle()
- \`\${properties.heading}\` — reads JCR property directly
- \`\${item.url @ context='uri'}\` — output with explicit context
- \`\${model.count > 0}\` — boolean expression

**Context Options**

HTL auto-escapes based on context. You can override:
- \`@ context='html'\` — output raw HTML (use carefully!)
- \`@ context='uri'\` — for URLs
- \`@ context='text'\` — for plain text (default)
- \`@ context='unsafe'\` — no escaping (avoid!)`,
  example: {
    title: 'HTL Patterns You\'ll Use Every Day',
    description: 'Real examples covering the most common HTL patterns in enterprise AEM projects.',
    code: [
      {
        label: 'Basic Template with Model',
        language: 'html',
        code: `<!-- Use a Sling Model -->
<sly data-sly-use.model="com.myproject.core.models.CardModel"/>

<!-- Conditional rendering -->
<div class="card" data-sly-test="\${model.heading}">

    <!-- Text output (auto-escaped) -->
    <h2 class="card__title">\${model.heading}</h2>

    <!-- Conditional block -->
    <sly data-sly-test="\${model.description}">
        <p class="card__desc">\${model.description}</p>
    </sly>

    <!-- URL output with context -->
    <a href="\${model.linkUrl @ context='uri'}"
       class="card__link">
        \${model.linkLabel}
    </a>

</div>`,
      },
      {
        label: 'Looping Over a List',
        language: 'html',
        code: `<sly data-sly-use.model="com.myproject.core.models.NewsModel"/>

<ul class="news-list"
    data-sly-test="\${model.articles}">

    <!-- data-sly-list creates item and itemList variables -->
    <li class="news-list__item \${itemList.first ? 'news-list__item--first' : ''}"
        data-sly-list.item="\${model.articles}">

        <span class="news-list__index">\${itemList.count}</span>
        <a href="\${item.url @ context='uri'}">\${item.title}</a>
        <time>\${item.publishDate}</time>

    </li>
</ul>

<!-- itemList properties:
     itemList.index  - 0-based index
     itemList.count  - 1-based count
     itemList.first  - true for first item
     itemList.last   - true for last item
     itemList.odd    - true for odd items
     itemList.even   - true for even items
-->`,
      },
      {
        label: 'Including Child Resources',
        language: 'html',
        code: `<!-- Include a child component by path -->
<div class="page-layout">

    <!-- Include a fixed child resource -->
    <sly data-sly-resource="\${'header' @ resourceType='myproject/components/header'}"/>

    <!-- Include a child node that exists in JCR -->
    <sly data-sly-resource="./navigation"/>

    <!-- Include with options -->
    <sly data-sly-resource="\${@
        path='./image',
        resourceType='myproject/components/image',
        addSelectors='thumbnail'
    }"/>

</div>`,
      },
      {
        label: 'Reusable Sub-Templates',
        language: 'html',
        code: `<!--
  Sub-templates let you define reusable HTML snippets
  within the same file — great for list items.
-->

<!-- Define the template -->
<template data-sly-template.articleItem="\${@ article}"
          class="article-item">
    <div class="article-item">
        <img src="\${article.imageUrl @ context='uri'}"
             alt="\${article.imageAlt}"/>
        <h3>\${article.title}</h3>
        <p>\${article.summary}</p>
    </div>
</template>

<!-- Use the template in a loop -->
<div class="article-grid">
    <sly data-sly-list.article="\${model.articles}">
        <sly data-sly-call="\${articleItem @ article=article}"/>
    </sly>
</div>`,
      },
      {
        label: 'Dynamic Attributes',
        language: 'html',
        code: `<sly data-sly-use.model="com.myproject.core.models.ButtonModel"/>

<!-- Set a single attribute conditionally -->
<button
    class="btn \${model.variant}"
    type="\${model.buttonType}"
    disabled="\${model.disabled}"
    data-tracking="\${model.trackingId}">
    \${model.label}
</button>

<!-- Set multiple attributes from a map -->
<div data-sly-attribute="\${model.dataAttributes}">
    Content here
</div>

<!-- Add a class conditionally -->
<div class="\${'card' @ append=model.extraClasses}">
    Content
</div>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between data-sly-text and ${...}?',
      answer: 'data-sly-text="value" replaces the entire content of the element. ${value} outputs inline within content. Use data-sly-text when you want to replace all child content; use ${} for inline output within text.',
    },
    {
      question: 'Why does my HTML output show escaped entities like &lt;?',
      answer: 'HTL auto-escapes HTML for security. If you need to output raw HTML (e.g., from a Rich Text Editor), use @ context=\'html\': ${model.richText @ context=\'html\'}. Only do this with trusted content — never with user input.',
    },
    {
      question: 'What is <sly> and when should I use it?',
      answer: '<sly> is a virtual element — it\'s processed by HTL but never rendered in the final HTML. Use it when you need a data-sly-* attribute but don\'t want to add a wrapper element to your markup.',
    },
    {
      question: 'Can I write if/else in HTL?',
      answer: 'Not directly. HTL doesn\'t have an else statement. The workaround is to use two data-sly-test attributes: one for the true case and one for the false case (negate with !). For complex conditionals, move the logic to your Sling Model.',
    },
  ],
  productionIssues: [
    'Blank output — Sling Model failed to instantiate. Check the error.log for model instantiation errors.',
    'XSS vulnerability — developer used @ context=\'unsafe\' or @ context=\'html\' with user-controlled content.',
    'data-sly-list not rendering — the list returned null instead of an empty collection. Always return empty lists, never null.',
    'Template not found — HTL file name doesn\'t match component node name, or there\'s a selector mismatch.',
    'Encoding issues — special characters in content appear garbled. Usually a UTF-8 encoding issue in the content or the HTL file itself.',
  ],
  bestPractices: [
    'Never use @ context=\'unsafe\' — it disables all XSS protection.',
    'Use <sly> for logic-only elements to keep your HTML clean.',
    'Keep HTL templates simple — if you need more than 3 conditions, move logic to a Sling Model.',
    'Use data-sly-template for repeating patterns within the same file.',
    'Always test your HTL with empty/null data — use DefaultInjectionStrategy.OPTIONAL in models.',
    'Use meaningful variable names in data-sly-use and data-sly-list for readable templates.',
  ],
  architectNote: `HTL's intentional simplicity is a **feature, not a limitation**. In large teams, it prevents junior developers from putting business logic in templates — which is one of the biggest sources of unmaintainable AEM code.

**Governance tip:** Establish a rule in your team: if a developer needs more than 2 conditions in HTL, they must move the logic to a Sling Model. This keeps templates clean and testable.

**For AEM as a Cloud Service:** HTL templates are compiled at build time in ACS, which means syntax errors are caught earlier. Use the HTL Maven Plugin in your build to validate HTL before deployment.`,
  faqs: [
    {
      question: 'Is HTL the same as Sightly?',
      answer: 'Yes. Sightly was the original name when Adobe introduced it in AEM 6.1. It was renamed to HTL (HTML Template Language) in AEM 6.3 when it became an Apache open-source project. You\'ll see both names in older projects and documentation.',
    },
    {
      question: 'Can I use JavaScript in HTL?',
      answer: 'HTL supports Use-API in JavaScript (Use.js files). You can write a .js file alongside your component and use it with data-sly-use. However, the Java Sling Model approach is preferred for complex logic because it\'s faster and more testable.',
    },
    {
      question: 'How do I debug HTL templates?',
      answer: 'Add ?debug=layout to the URL to see the page structure. For model issues, check error.log. You can also add temporary sly elements with data-sly-test="${true}" to test rendering. The HTL REPL tool in CRXDE is also useful for testing expressions.',
    },
    {
      question: 'Can HTL access the JCR directly without a Sling Model?',
      answer: 'Yes. HTL automatically provides: properties (current node\'s ValueMap), pageProperties (current page properties), inheritedPageProperties, currentNode, currentPage, resource, and request. For simple components, you can use ${properties.heading} directly without a model.',
    },
  ],
  keyTakeaways: [
    'HTL = HTML + data-sly-* attributes for dynamic content',
    'Auto-escaping prevents XSS by default — use @ context options carefully',
    '<sly> renders nothing in HTML — use it for logic-only elements',
    'data-sly-use loads Sling Models; data-sly-list loops; data-sly-test conditionals',
    'Keep logic out of HTL — complex logic belongs in Sling Models',
    'HTL is intentionally simple — that simplicity is a design feature',
  ],
  relatedTopics: ['components', 'sling-models', 'sling', 'client-libraries'],
};
