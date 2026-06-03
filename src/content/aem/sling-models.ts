import type { TopicContent } from '../types';

export const slingModels: TopicContent = {
  slug: 'sling-models',
  title: 'Sling Models',
  description: 'Understand Sling Models — the backbone of AEM component logic. Learn how they work, how to write them, and the gotchas that trip up every developer.',
  applicableVersions: ['AEM 6.2+', 'AEM 6.5', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'A Sling Model is a Java class that reads data from a JCR node (or HTTP request) and makes it available to your HTL template. Think of it as the "ViewModel" in MVC — it bridges the raw JCR data and your HTML rendering.',
  whatIsIt: `A Sling Model is a Java POJO (Plain Old Java Object) annotated with \`@Model\`. It:

- Adapts a \`Resource\` or \`SlingHttpServletRequest\` to a typed Java object
- Automatically injects JCR property values using \`@ValueMapValue\`
- Can inject OSGi services using \`@OSGiService\`
- Can inject child resources, parent pages, and request parameters
- Is used by HTL templates via \`data-sly-use\`

Sling Models replaced the older \`WCMUsePojo\` and are now the standard way to write AEM component logic.`,
  whyWeNeedIt: `HTL is intentionally limited — it can't do complex logic, call services, or format data. That's by design. Sling Models fill that gap:

- **Separation of concerns** — HTL handles rendering, Sling Models handle logic
- **Testability** — Java classes are easy to unit test
- **Type safety** — You get compile-time checking instead of runtime errors
- **Clean HTL** — Your templates stay readable and maintainable
- **Service access** — You can call OSGi services, APIs, and databases from a model

Without Sling Models, you'd either put logic in HTL (bad) or use scriptlets (very bad).`,
  realWorldUsage: `Here's how Sling Models are used in a real project:

**Scenario 1: Reading component properties**
An author fills in a dialog with a heading, description, and link. Your Sling Model reads those JCR properties and exposes them as typed Java getters to HTL.

**Scenario 2: Calling an external API**
A "Latest News" component needs to fetch articles from a CMS API. The Sling Model injects a \`NewsService\` (OSGi service) and returns a list of \`NewsItem\` objects to HTL.

**Scenario 3: Page-level data**
A breadcrumb component needs the current page's ancestors. The Sling Model uses \`@ScriptVariable\` to get the \`currentPage\` and traverses the page tree.

**Scenario 4: Exporter for headless**
A Sling Model with \`@Exporter\` annotation exposes component data as JSON for headless delivery via Content Services.`,
  howItWorks: `**Injection Strategy**

When AEM instantiates your Sling Model, it goes through each field annotated with \`@Inject\`, \`@ValueMapValue\`, \`@ChildResource\`, etc., and tries to resolve the value from the adaptable (Resource or Request).

**Adaptables**

- \`Resource.class\` — Use when you only need JCR properties. Faster, simpler.
- \`SlingHttpServletRequest.class\` — Use when you need request parameters, selectors, or suffixes. Can also access the resource through the request.

**Key Annotations**

| Annotation | What it does |
|---|---|
| \`@Model\` | Marks the class as a Sling Model |
| \`@ValueMapValue\` | Injects a JCR property by field name |
| \`@Inject\` | Generic injection (tries multiple strategies) |
| \`@OSGiService\` | Injects an OSGi service |
| \`@ScriptVariable\` | Injects HTL script variables (currentPage, etc.) |
| \`@ChildResource\` | Injects a child node as a Resource |
| \`@RequestAttribute\` | Injects a request attribute |
| \`@PostConstruct\` | Runs after all injections complete |
| \`@Self\` | Injects the adaptable itself |

**DefaultInjectionStrategy**

Always use \`DefaultInjectionStrategy.OPTIONAL\` unless a field is truly required. With \`REQUIRED\` (the default), if any injection fails, the entire model fails to instantiate — causing a blank component.`,
  example: {
    title: 'A Complete Sling Model Example',
    description: 'A News Card component that reads JCR properties, calls an OSGi service, and exposes data to HTL.',
    code: [
      {
        label: 'Basic Sling Model',
        language: 'java',
        code: `package com.myproject.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import com.day.cq.wcm.api.Page;
import javax.annotation.PostConstruct;
import java.util.List;

@Model(
    adaptables = SlingHttpServletRequest.class,
    adapters = NewsCardModel.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
    resourceType = "myproject/components/newscard"
)
public class NewsCardModel {

    // Injects the JCR property "heading" from the component's node
    @ValueMapValue
    private String heading;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String linkPath;

    // Injects an OSGi service
    @OSGiService
    private NewsService newsService;

    // Injects the current page from HTL context
    @ScriptVariable
    private Page currentPage;

    private List<NewsItem> latestNews;

    // Runs after all injections are complete
    @PostConstruct
    protected void init() {
        if (newsService != null) {
            latestNews = newsService.getLatestNews(3);
        }
    }

    public String getHeading() {
        return heading != null ? heading : "Latest News";
    }

    public String getDescription() { return description; }

    public String getLinkPath() { return linkPath; }

    public List<NewsItem> getLatestNews() { return latestNews; }

    public String getCurrentPageTitle() {
        return currentPage != null ? currentPage.getTitle() : "";
    }
}`,
      },
      {
        label: 'Using the Model in HTL',
        language: 'html',
        code: `<sly data-sly-use.model="com.myproject.core.models.NewsCardModel"/>

<div class="news-card">
    <h2 class="news-card__heading">\${model.heading}</h2>

    <sly data-sly-test="\${model.description}">
        <p class="news-card__desc">\${model.description}</p>
    </sly>

    <ul class="news-card__list"
        data-sly-list.item="\${model.latestNews}">
        <li class="news-card__item">
            <a href="\${item.url}">\${item.title}</a>
            <span>\${item.date}</span>
        </li>
    </ul>

    <sly data-sly-test="\${model.linkPath}">
        <a href="\${model.linkPath}" class="news-card__cta">
            View All News
        </a>
    </sly>
</div>`,
      },
      {
        label: 'Unit Test with AemContext',
        language: 'java',
        code: `@ExtendWith(AemContextExtension.class)
public class NewsCardModelTest {

    private final AemContext ctx = new AemContext();

    @Test
    void testGetHeading() {
        // Load test content from JSON fixture
        ctx.load().json("/content/newscard.json", "/content/page");

        // Set the current resource
        ctx.currentResource("/content/page/jcr:content/newscard");

        // Adapt to the model
        NewsCardModel model = ctx.request()
            .adaptTo(NewsCardModel.class);

        assertNotNull(model);
        assertEquals("Top Stories", model.getHeading());
    }

    @Test
    void testDefaultHeading() {
        ctx.currentResource("/content/page/jcr:content/empty");
        NewsCardModel model = ctx.request().adaptTo(NewsCardModel.class);
        assertEquals("Latest News", model.getHeading()); // fallback
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use Resource vs SlingHttpServletRequest as adaptable?',
      answer: 'Use Resource when you only need JCR properties — it\'s simpler and faster. Use SlingHttpServletRequest when you need request context: selectors, suffixes, query parameters, or request attributes. If you\'re using @ScriptVariable or @RequestAttribute, you need the Request.',
    },
    {
      question: 'Why does my Sling Model return null even though the property exists in CRXDE?',
      answer: 'Most common causes: 1) The field name doesn\'t match the JCR property name — use @ValueMapValue(name="propertyName") to specify it explicitly. 2) You used DefaultInjectionStrategy.REQUIRED and something else failed, causing the whole model to fail silently. 3) The property is on a different node than you\'re adapting.',
    },
    {
      question: 'What is the difference between @Inject and @ValueMapValue?',
      answer: '@Inject is generic — it tries multiple injection strategies in order. @ValueMapValue specifically reads from the ValueMap (JCR properties). Always prefer @ValueMapValue for JCR properties — it\'s explicit and faster.',
    },
    {
      question: 'Can I use Sling Models for page-level logic, not just component logic?',
      answer: 'Yes. You can adapt any Resource, including page nodes. Many projects create a "PageModel" that provides common page-level data (navigation, metadata, breadcrumbs) that all page templates use.',
    },
  ],
  productionIssues: [
    'Model returns null — OSGi bundle not deployed, or bundle is in "Installed" state instead of "Active". Check Felix Console (/system/console/bundles).',
    'PostConstruct throws NullPointerException — an injected OSGi service is null because the service isn\'t registered. Always null-check injected services.',
    'Model works in Author but fails in Publish — an OSGi service that exists on Author isn\'t configured on Publish (e.g., a service that calls an internal Author API).',
    'Sling Model not found — the resourceType in @Model doesn\'t match the component\'s sling:resourceType, or the package isn\'t in the bundle\'s scan path.',
    'Circular injection — Model A injects Model B which injects Model A. AEM will throw a StackOverflowError.',
  ],
  bestPractices: [
    'Always use DefaultInjectionStrategy.OPTIONAL — it prevents the entire model from failing when one optional field is missing.',
    'Use @ValueMapValue(name="propertyName") when the Java field name doesn\'t match the JCR property name.',
    'Keep @PostConstruct lightweight — avoid heavy computations or API calls that could slow down every page render.',
    'Write unit tests for every model using wcm.io AemContext — it saves hours of debugging.',
    'Use the resourceType attribute in @Model to bind the model to a specific component, enabling automatic adaptation.',
    'Prefer @OSGiService over manual service lookup — it\'s cleaner and testable.',
    'Return empty collections (Collections.emptyList()) instead of null from list getters.',
  ],
  architectNote: `Sling Models are the **single most important Java pattern** in AEM development. Get this right and everything else becomes easier.

**Architecture principle:** Sling Models should be **thin adapters**, not service layers. If you find yourself writing complex business logic in a Sling Model, extract it into an OSGi service and inject it.

**For AEM as a Cloud Service:** Sling Models with \`@Exporter(name="jackson", extensions="json")\` automatically expose your component data as JSON endpoints — critical for headless and hybrid delivery patterns.

**Versioning:** When you change a Sling Model's interface significantly, consider creating a new version (e.g., \`HeroModelV2\`) rather than modifying the existing one — especially if other teams depend on it.`,
  faqs: [
    {
      question: 'Can a Sling Model extend another Sling Model?',
      answer: 'Yes, but be careful. Java inheritance works normally. The child model inherits all injections from the parent. However, @PostConstruct in the parent runs before the child\'s. A cleaner pattern is composition — inject the parent model rather than extending it.',
    },
    {
      question: 'How do I inject the current page in a Sling Model?',
      answer: 'Use @ScriptVariable private Page currentPage; (requires SlingHttpServletRequest adaptable). Or use @Self SlingHttpServletRequest request and then request.getResource().adaptTo(Page.class). The @ScriptVariable approach is cleaner.',
    },
    {
      question: 'What is Sling Models Delegation Pattern?',
      answer: 'It\'s a way to extend Core Components without copying their code. Your model implements the Core Component\'s interface and delegates unimplemented methods to the Core Component\'s model using @Self and @Via(type = ResourceSuperType.class).',
    },
    {
      question: 'Can I use Sling Models without HTL?',
      answer: 'Yes. Sling Models can be used in Servlets, Filters, Workflows, and any Java code that has access to a Resource or Request. They\'re not tied to HTL.',
    },
    {
      question: 'How do I access multi-value properties?',
      answer: 'Use @ValueMapValue private String[] tags; or List<String> tags. AEM\'s ValueMap handles the conversion automatically from JCR String[] to Java arrays and lists.',
    },
  ],
  keyTakeaways: [
    'Sling Models are the ViewModel — they bridge JCR data and HTL templates',
    'Always use DefaultInjectionStrategy.OPTIONAL to prevent silent failures',
    'Use @ValueMapValue for JCR properties, @OSGiService for services',
    '@PostConstruct runs after all injections — use it for initialization logic',
    'Test every model with AemContext — it\'s fast and catches real bugs',
    'Keep models thin — complex logic belongs in OSGi services',
  ],
  relatedTopics: ['components', 'htl', 'osgi', 'sling'],
};
