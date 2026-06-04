import type { TopicContent } from '../types';

export const contentFragments: TopicContent = {
  slug: 'content-fragments',
  title: 'Content Fragments',
  description: 'Learn what Content Fragments are, how they differ from regular page content, and why they\'re the foundation of headless AEM delivery.',
  applicableVersions: ['AEM 6.4+', 'AEM 6.5', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'A Content Fragment is structured content that is separated from its presentation. Think of it as a database record stored in AEM — it has fields (like a title, body, and image) but no built-in HTML styling. The same fragment can be displayed on a web page, a mobile app, and a kiosk — each with different styling.',
  whatIsIt: `A Content Fragment is:

- **Structured content** stored in AEM's DAM (Digital Asset Manager) under \`/content/dam\`
- Defined by a **Content Fragment Model** (like a database schema)
- **Presentation-independent** — the content exists separately from how it looks
- Deliverable via **GraphQL** (headless) or **page components** (traditional)
- Supports **variations** — one fragment can have a "Web" variation and a "Mobile" variation with different text

Content Fragments are different from regular page content because they're created by content editors in a dedicated editor (not the page editor), and they can be reused across multiple pages and channels.`,
  whyWeNeedIt: `**The Problem:** Modern businesses publish content on websites, mobile apps, smartwatches, digital signage, and voice assistants. Writing the same content separately for each channel is expensive and leads to inconsistency.

**The Solution:** Content Fragments let you write content once and deliver it everywhere:
- The **marketing team** writes an article once in AEM
- The **web team** displays it on the website using a component
- The **mobile team** fetches it via GraphQL API
- The **digital signage team** pulls the title and image for their display

This is the core of **headless** and **hybrid** AEM architectures.`,
  realWorldUsage: `**Real Project Scenarios:**

**Scenario 1: Product Catalog**
A retailer creates a "Product" Content Fragment Model with fields: name, SKU, description, price, images, specifications. The product team fills in fragments for 10,000 products. The website, mobile app, and in-store kiosks all consume the same data.

**Scenario 2: News Articles**
A media company creates an "Article" model with: headline, body, author, publishDate, category, featuredImage. Journalists write articles as fragments. The website renders them as pages; the mobile app fetches them via GraphQL.

**Scenario 3: Shared Component Content**
A global company has a "Disclaimer" fragment used on 500 pages. When the legal team updates the disclaimer fragment, all 500 pages reflect the change automatically.`,
  howItWorks: `**Step 1: Create a Content Fragment Model**
In AEM's Tools → Assets → Content Fragment Models, you define the schema:
- What fields does this type of content have?
- What type is each field? (text, number, date, content reference, etc.)
- Which fields are required?

**Step 2: Create Content Fragments**
Authors go to Assets → Files → (your DAM folder) and create fragments based on the model. They fill in the fields in a clean, focused editor.

**Step 3: Use the Fragment**

*Option A: In a page component*
Use the Content Fragment Core Component to drop a fragment onto a page. The component renders the fragment's fields using HTL.

*Option B: Via GraphQL (headless)*
Query the fragment using AEM's GraphQL API:
\`\`\`
{
  articleByPath(_path: "/content/dam/articles/my-article") {
    item {
      title
      body { html }
      author { name }
    }
  }
}
\`\`\`

**Variations:**
A fragment can have multiple variations. The "Master" variation is the default. You can create "Social Media" or "Short Summary" variations with different text lengths.`,
  example: {
    title: 'Content Fragment Model and GraphQL Query',
    description: 'Creating a "News Article" Content Fragment Model and querying it via GraphQL.',
    code: [
      {
        label: 'Content Fragment Model Fields',
        language: 'json',
        code: `// News Article Content Fragment Model
// Defined in AEM Tools → Assets → Content Fragment Models

{
  "modelTitle": "News Article",
  "fields": [
    {
      "fieldLabel": "Headline",
      "name": "headline",
      "type": "text-single",
      "required": true,
      "maxLength": 100
    },
    {
      "fieldLabel": "Body",
      "name": "body",
      "type": "text-multi",
      "renderAs": "richtext"
    },
    {
      "fieldLabel": "Author",
      "name": "author",
      "type": "fragment-reference",
      "modelPath": "/conf/mysite/settings/dam/cfm/models/author"
    },
    {
      "fieldLabel": "Publish Date",
      "name": "publishDate",
      "type": "date-time"
    },
    {
      "fieldLabel": "Featured Image",
      "name": "featuredImage",
      "type": "content-reference",
      "mimeTypes": ["image/*"]
    },
    {
      "fieldLabel": "Category",
      "name": "category",
      "type": "enumeration",
      "options": ["Technology", "Business", "Sports", "Health"]
    }
  ]
}`,
      },
      {
        label: 'GraphQL Query (Headless)',
        language: 'graphql',
        code: `# Fetch a single article by path
query GetArticle {
  newsArticleByPath(
    _path: "/content/dam/mysite/articles/2024/ai-trends"
  ) {
    item {
      headline
      body {
        html
        plaintext
      }
      author {
        ... on AuthorModel {
          name
          bio
          photo {
            _path
          }
        }
      }
      publishDate
      featuredImage {
        _path
        mimeType
        width
        height
      }
      category
    }
  }
}

# Fetch a list of articles with filtering
query GetArticlesByCategory {
  newsArticleList(
    filter: {
      category: { _expressions: [{ value: "Technology" }] }
    }
    sort: "publishDate DESC"
    limit: 10
  ) {
    items {
      _path
      headline
      publishDate
      featuredImage { _path }
    }
  }
}`,
      },
      {
        label: 'Using Fragment in a Page Component (HTL)',
        language: 'html',
        code: `<!-- Content Fragment Component HTL -->
<sly data-sly-use.model="com.myproject.core.models.ArticleModel"/>

<article class="article" itemscope itemtype="https://schema.org/Article">

    <h1 class="article__headline" itemprop="headline">
        \${model.headline}
    </h1>

    <div class="article__meta">
        <span class="article__author">\${model.authorName}</span>
        <time class="article__date" datetime="\${model.publishDateISO}">
            \${model.publishDateFormatted}
        </time>
    </div>

    <sly data-sly-test="\${model.featuredImagePath}">
        <img class="article__image"
             src="\${model.featuredImagePath @ context='uri'}"
             alt="\${model.headline}"/>
    </sly>

    <div class="article__body"
         data-sly-text="\${model.bodyHtml @ context='html'}">
    </div>

</article>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between Content Fragments and Experience Fragments?',
      answer: 'Content Fragments are pure content — no HTML, no styling. Experience Fragments are complete HTML experiences — they include the content AND the layout/styling. Use Content Fragments for headless delivery and structured data. Use Experience Fragments for reusable page sections that need consistent styling.',
    },
    {
      question: 'Where are Content Fragments stored?',
      answer: 'In the DAM (Digital Asset Manager) under /content/dam, not under /content/sites. This is intentional — fragments are assets, not pages. They\'re managed in the Assets console, not the Sites console.',
    },
    {
      question: 'Can I use Content Fragments without going headless?',
      answer: 'Yes. The Content Fragment Core Component lets you drop a fragment onto a regular AEM page. This is called "hybrid" delivery — you get the benefits of structured, reusable content while still using AEM\'s page editor.',
    },
    {
      question: 'What is a Content Fragment Model vs a Content Fragment?',
      answer: 'The Model is the schema (like a database table definition). The Fragment is the actual content (like a database row). You create one Model and then many Fragments based on that Model.',
    },
  ],
  productionIssues: [
    'GraphQL query returns null — the Content Fragment Model\'s GraphQL API might not be enabled. Enable it in Tools → Assets → Content Fragment Models → Model Properties.',
    'Fragment changes not reflecting on pages — the page component is caching the fragment data. Check if the Sling Model or component has caching that needs to be invalidated.',
    'Fragment editor shows wrong fields — the model was updated but existing fragments weren\'t migrated. Fragments store data based on the model at creation time.',
    'Performance issues with large fragment lists — GraphQL queries without proper pagination can return thousands of results. Always use limit and offset in queries.',
    'Fragment references broken after DAM reorganization — moving fragments in the DAM breaks references. Use Find & Replace References before moving.',
    'Published page shows incomplete fragment data — referenced fragments, referenced assets, or the Content Fragment Model itself were not published with the parent fragment.',
    'Model change breaks a headless app — field names or data types changed without coordinating API consumers and persisted queries.',
    'Authoring becomes confusing — models contain too many optional fields, unclear labels, or channel-specific fields that should have been variations or separate models.',
  ],
  bestPractices: [
    'Design your Content Fragment Models carefully upfront — changing models after content is created is painful.',
    'Use Fragment References to create relationships between fragments (e.g., Article references Author).',
    'Create separate DAM folder structures for fragments and media assets to keep things organized.',
    'Enable versioning for Content Fragments in production so you can roll back content changes.',
    'Use variations for channel-specific content (web, mobile, social) rather than creating separate fragments.',
    'For headless delivery, always use persisted queries instead of ad-hoc GraphQL queries — they\'re faster and cacheable.',
    'Govern Content Fragment Models like API schemas: review field names, required fields, references, and backward compatibility before changes.',
    'Use DAM folder permissions and clear naming conventions so authors do not mix fragments, media assets, and archived content.',
    'Include fragments, models, persisted queries, and referenced media in release and publishing checklists.',
  ],
  architectNote: `Content Fragments are the **foundation of modern AEM architecture**. If you're building a new AEM project in 2024, your content model should be designed around fragments.

**Architecture Decision:** Should you use Content Fragments or page-based content? Rule of thumb:
- Content that's reused across channels → Content Fragments
- Content that's specific to one page → Page content
- Content created by non-technical editors → Content Fragments (cleaner editor experience)

**For AEM as a Cloud Service:** Content Fragments + GraphQL is the recommended pattern for headless delivery. Adobe is investing heavily in this area — Content Fragment Models, the GraphQL API, and the Content Fragment Editor all have significant improvements in AEMaaCS.`,
  faqs: [
    {
      question: 'How many Content Fragment Models should a project have?',
      answer: 'Start with the minimum needed to represent your content types. A typical project might have 5–15 models. Avoid creating a model for every slight variation — use variations within a fragment instead.',
    },
    {
      question: 'Can Content Fragments be translated?',
      answer: 'Yes. AEM\'s translation workflow supports Content Fragments. You can send fragments to a translation service and receive translated versions as separate language copies in the DAM.',
    },
    {
      question: 'What is a "persisted query" in GraphQL?',
      answer: 'A persisted query is a GraphQL query that\'s saved on the AEM server and accessed via a simple GET URL. This is preferred over ad-hoc queries because: it\'s cacheable by the Dispatcher and CDN, it\'s faster, and it prevents clients from running arbitrary expensive queries.',
    },
    {
      question: 'Can I nest Content Fragments inside other Content Fragments?',
      answer: 'Yes, using Fragment References. An Article fragment can reference an Author fragment, which can reference a Company fragment. This creates a content graph. Be careful with deep nesting — it can cause performance issues in GraphQL queries.',
    },
  ],
  keyTakeaways: [
    'Content Fragments = structured content without presentation',
    'Defined by a Model (schema) → filled in as Fragments (data)',
    'Stored in DAM (/content/dam), not in Sites (/content/sites)',
    'Deliverable via GraphQL (headless) or page components (traditional)',
    'Variations allow channel-specific content from one fragment',
    'Foundation of headless and omnichannel AEM architectures',
  ],
  relatedTopics: ['experience-fragments', 'graphql', 'aem-cloud-service', 'components'],
};
