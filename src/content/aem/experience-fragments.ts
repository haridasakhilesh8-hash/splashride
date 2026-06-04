import type { TopicContent } from '../types';

export const experienceFragments: TopicContent = {
  slug: 'experience-fragments',
  title: 'Experience Fragments',
  description: 'Learn what Experience Fragments are, how they differ from Content Fragments, and when to use them in real AEM projects.',
  applicableVersions: ['AEM 6.3+', 'AEM 6.5', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'An Experience Fragment is a group of components — with content AND layout — that can be saved and reused across multiple pages. Think of it as a "saved section" of a page. A promotional banner that appears on 50 pages? Make it an Experience Fragment. Update it once, it updates everywhere.',
  whatIsIt: `An Experience Fragment (XF) is:

- A **reusable page section** that includes both content and presentation
- Stored under \`/content/experience-fragments\` in AEM Sites
- Built using the **page editor** (just like a regular page)
- Can be placed on multiple pages using the **Experience Fragment component**
- Supports **variations** — one XF can have a "Web" variation and a "Facebook" variation
- Can be **exported** to Adobe Target for A/B testing and personalization

Unlike Content Fragments (which are pure content), Experience Fragments are complete experiences — they contain the HTML structure, styles, and content together.`,
  whyWeNeedIt: `**The Problem:** Large websites have repeating sections — promotional banners, newsletter signups, cookie notices, footer CTAs. Without XFs, the same content is copy-pasted across hundreds of pages. When it needs to change, someone manually updates each page.

**The Solution:** Experience Fragments solve this by:
- **Single source of truth** — update the XF once, all pages using it update
- **Author empowerment** — authors can build and manage reusable sections without developer help
- **Adobe Target integration** — export XFs to Target for personalization and A/B testing
- **Multi-channel** — create different variations of the same experience for web, email, and social`,
  realWorldUsage: `**Real Project Scenarios:**

**Scenario 1: Promotional Banner**
Marketing wants a "Black Friday Sale" banner on 200 pages. Create one XF, add it to all 200 pages. When the sale ends, update the XF once — all pages update instantly.

**Scenario 2: Cookie Consent Banner**
Legal requires a GDPR cookie banner on every page. Create it as an XF in the page template's footer area. Update it centrally when legal requirements change.

**Scenario 3: Adobe Target Personalization**
Marketing wants to A/B test two versions of a hero banner. Create two XF variations, export them to Adobe Target, and let Target serve the right version based on audience segments.

**Scenario 4: Footer CTA**
A subscription CTA appears in the footer of all blog pages. Create it as an XF. When the offer changes, update once.`,
  howItWorks: `**Creating an Experience Fragment:**

1. Go to AEM Sites → Experience Fragments
2. Create a new XF (choose a template — usually "Experience Fragment - Web Variation")
3. Build the section using components in the page editor (just like a normal page)
4. Save and publish the XF

**Using an XF on a Page:**

1. Open a page in the editor
2. Drop the "Experience Fragment" Core Component into a container
3. In the component dialog, browse to and select your XF
4. The XF renders in place on the page

**Variations:**

An XF can have multiple variations:
- **Master** — the default variation
- **Web** — optimized for web display
- **Social Media** — cropped/formatted for social
- **Email** — formatted for email clients

**Building Blocks (XF Fragments):**

You can create "building block" XFs that are used inside other XFs. This is like nesting components — a header XF might contain a logo building block and a navigation building block.

**Export to Adobe Target:**

In the XF editor, use the "Export to Adobe Target" action. AEM converts the XF to an HTML offer in Target. Target then serves it based on activity rules.`,
  example: {
    title: 'Experience Fragment in Practice',
    description: 'Creating a promotional banner XF and using it across multiple pages.',
    code: [
      {
        label: 'XF Structure in JCR',
        language: 'xml',
        code: `<!-- Experience Fragment node structure -->
/content/experience-fragments/
  mysite/
    en/
      promotions/
        black-friday-banner/
          jcr:content/           ← XF page content
          master/                ← Master variation
            jcr:content/
              root/
                container/
                  banner/        ← Actual components
                    jcr:primaryType="nt:unstructured"
                    sling:resourceType="mysite/components/banner"
                    heading="50% Off Everything!"
                    subtext="Black Friday Sale - This Weekend Only"
                    ctaLabel="Shop Now"
                    ctaLink="/content/mysite/en/sale"
          web/                   ← Web variation
            jcr:content/ ...
          email/                 ← Email variation
            jcr:content/ ...`,
      },
      {
        label: 'Using XF in a Page Component',
        language: 'html',
        code: `<!-- Page template HTL - including an XF in the header area -->
<sly data-sly-use.page="com.myproject.core.models.PageModel"/>

<html>
<head>...</head>
<body>

    <!-- Navigation XF -->
    <sly data-sly-resource="\${@
        path='/content/experience-fragments/mysite/en/navigation/master',
        resourceType='core/wcm/components/experiencefragment/v2/experiencefragment'
    }"/>

    <!-- Main content area -->
    <main>
        <sly data-sly-resource="./root"/>
    </main>

    <!-- Footer with promotional XF -->
    <footer>
        <sly data-sly-resource="\${@
            path='/content/experience-fragments/mysite/en/footer/master',
            resourceType='core/wcm/components/experiencefragment/v2/experiencefragment'
        }"/>
    </footer>

</body>
</html>`,
      },
      {
        label: 'XF Component Dialog Configuration',
        language: 'xml',
        code: `<!-- When an author adds an XF component to a page,
     they configure it via this dialog -->

<!-- The Experience Fragment Core Component dialog
     lets authors select:
     1. The XF path (which fragment to use)
     2. The variation (master, web, mobile, etc.)
-->

<!-- Author dialog selection example:
     Fragment Path: /content/experience-fragments/mysite/en/promotions/black-friday-banner
     Variation:     web
-->

<!-- The component then renders the selected XF variation
     inline on the page, as if the components were
     directly placed on the page -->`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between Content Fragments and Experience Fragments?',
      answer: 'Content Fragments = content only (no HTML/styling). Experience Fragments = content + layout + styling. Use Content Fragments when you want to reuse raw content across channels (headless). Use Experience Fragments when you want to reuse a complete visual section (a banner, a footer, a promo block).',
    },
    {
      question: 'Can I edit an Experience Fragment directly on a page?',
      answer: 'No. When you see an XF on a page, it\'s read-only. To edit it, you must go to the Experience Fragments console and edit it there. This is intentional — it ensures the change applies everywhere the XF is used.',
    },
    {
      question: 'What is the difference between an XF and a Template?',
      answer: 'A template defines the structure of an entire page (header, footer, main area). An XF is a reusable section that can be placed inside a page. Templates are for page structure; XFs are for reusable content sections.',
    },
    {
      question: 'Do Experience Fragments affect SEO?',
      answer: 'Yes, but positively. The XF content is rendered inline on the page, so search engines see it as regular page content. However, if the same XF appears on many pages, the duplicate content could be a concern — use canonical tags appropriately.',
    },
  ],
  productionIssues: [
    'XF changes not reflecting on pages — the page is cached by Dispatcher. After updating an XF, the Dispatcher cache for all pages using that XF must be invalidated.',
    'XF shows blank on page — the XF path is wrong, or the XF isn\'t published. Always publish both the XF and the page.',
    'Adobe Target export fails — check that the XF template is marked as "Experience Fragment" type, and that the Target cloud configuration is correctly set up.',
    'XF appears differently across pages — the XF\'s Client Libraries aren\'t loading correctly on some pages. Check that the XF\'s clientlib categories are included in the page\'s template.',
    'Performance issues — too many XFs on a single page causes multiple JCR reads. Consider consolidating or caching XF data.',
    'Localized XF uses global content by accident — page references the Blueprint or master-language XF instead of the localized variation.',
    'XF update creates inconsistent campaign pages — pages using the XF were not all republished or cache-invalidated after the XF change.',
    'Target personalization differs from AEM preview — exported XF markup, clientlibs, or audience-specific data does not match the page where the offer is rendered.',
  ],
  bestPractices: [
    'Use XFs for content that appears on 3+ pages — the overhead of creating an XF isn\'t worth it for one-off sections.',
    'Name XFs clearly and organize them in a logical folder structure in the Experience Fragments console.',
    'Always create a "Web" variation as your primary variation — the master is the template for other variations.',
    'Keep XFs focused — one XF per distinct section (header, footer, promo banner). Don\'t create a single giant XF.',
    'Publish XFs before publishing pages that use them — otherwise the page will render with a broken XF.',
    'Use XF Building Blocks for sub-sections that are reused within multiple XFs.',
    'Track where critical XFs are used so support teams know which pages need cache checks after a fragment update.',
    'For global sites, create clear rules for when pages should reference global XFs, localized XFs, or MSM-managed XF copies.',
    'Keep Target-ready XFs lean and self-contained so exported offers do not depend on page-specific styles or scripts.',
  ],
  architectNote: `Experience Fragments are powerful but often **over-used**. Here's the architect's perspective:

**When to use XFs:**
- Repeating promotional content (banners, offers)
- Navigation and footer sections
- Content that needs Adobe Target personalization
- Sections managed by a different team than the page

**When NOT to use XFs:**
- One-off page sections — just put the component directly on the page
- Highly dynamic content — XFs are better for relatively stable content
- Content that varies significantly per page — use page-level components instead

**Performance consideration:** Each XF reference adds a JCR read. For pages with many XFs, this can add up. Consider using page templates to include common XFs (header/footer) rather than adding them to every page individually.`,
  faqs: [
    {
      question: 'Can Experience Fragments be translated?',
      answer: 'Yes. AEM\'s Multi-Site Manager (MSM) and translation workflows support Experience Fragments. You can create language copies of XFs just like pages. This is important for global sites where the same promotional content needs to be localized.',
    },
    {
      question: 'What is an XF Building Block?',
      answer: 'A Building Block is a component group within an XF that can be reused in other XFs. For example, a "Logo" building block used in both the header XF and the footer XF. When you update the logo building block, both XFs update.',
    },
    {
      question: 'How do I handle XF caching with Dispatcher?',
      answer: 'XFs themselves can be cached by the Dispatcher. When an XF is updated and published, AEM sends flush requests for both the XF path and all pages that include the XF. Configure your Dispatcher flush agent to handle XF path invalidation.',
    },
    {
      question: 'Can I use Experience Fragments in email campaigns?',
      answer: 'Yes. Create an "Email" variation of your XF with email-compatible HTML (inline styles, table layouts). You can export this variation and use it in email marketing tools. Some AEM integrations (like Adobe Campaign) can directly consume XF variations.',
    },
  ],
  keyTakeaways: [
    'Experience Fragments = content + layout + styling — a complete visual section',
    'Stored in /content/experience-fragments, built in the page editor',
    'Update once → updates everywhere the XF is used',
    'Supports variations for different channels (web, email, social)',
    'Exports to Adobe Target for A/B testing and personalization',
    'Different from Content Fragments: XFs have presentation; CFs don\'t',
  ],
  relatedTopics: ['content-fragments', 'components', 'templates', 'msm'],
};
