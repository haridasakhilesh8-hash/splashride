import type { TopicContent } from '../../types';

export const springBeanScopes: TopicContent = {
  slug: 'spring-bean-scopes',
  title: 'Bean Scopes',
  description: 'Master Spring bean scopes — singleton, prototype, request, session — and understand when each scope is appropriate and the common pitfalls of mixing scopes.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Bean scope defines how many instances Spring creates. Singleton (default) = one instance shared by everyone. Prototype = new instance every time. Request = one per HTTP request. Session = one per HTTP session. 99% of your beans should be singleton — they\'re stateless services. Prototype is for stateful objects that must not be shared.',
  whatIsIt: `Bean scope controls the lifecycle and number of bean instances created by the IoC container.

**Available scopes:**

**singleton** (default)
- One instance per ApplicationContext
- Shared across all threads and all injection points
- Created at startup (eager) or first use (lazy)
- Destroyed when context closes

**prototype**
- New instance created every time the bean is requested
- Spring does NOT manage its destruction (@PreDestroy not called)
- Use for stateful objects that must not be shared

**request** (web apps only)
- One instance per HTTP request
- Created when request starts, destroyed when it ends
- Thread-safe by design (one request = one thread = one bean)

**session** (web apps only)
- One instance per HTTP session
- Lives as long as the user\'s session
- Stored in HTTP session, serializable

**application** (web apps only)
- One instance per ServletContext (essentially singleton for web apps)

**Custom scopes**
- Spring allows defining custom scopes (e.g., Spring Batch defines job and step scopes)`,
  whyWeNeedIt: `Different objects have different lifecycle requirements:
- A \`UserService\` is stateless — one singleton instance handles all users safely
- A \`ShoppingCart\` is stateful per user — needs session scope
- A \`ReportGenerator\` accumulates state during generation — needs prototype scope
- A \`RequestContext\` holds per-request data — needs request scope

Using the wrong scope causes bugs: a singleton with mutable state is a concurrency disaster; a new prototype for every call is wasteful if the object is stateless.`,
  realWorldUsage: `In enterprise Spring Boot apps:
- **99% of beans are singleton** — services, repositories, controllers, config beans
- **Prototype** used for: batch job processors, report builders, objects with mutable state
- **Request scope** used for: request ID tracking, per-request audit context, security context holders
- **Session scope** used for: shopping carts, user preferences, wizard/multi-step form state`,
  howItWorks: `**Singleton bean:**
Spring creates one instance and returns the same reference every time it\'s injected or looked up. This is why all singleton beans MUST be thread-safe (stateless or using thread-safe data structures).

**Prototype bean injected into singleton:**
This is the classic scope mismatch problem. If a singleton bean has a prototype dependency, Spring injects the prototype ONCE at creation time. The singleton holds a reference to that one prototype instance forever — defeating the purpose of prototype scope.

**Solution: ObjectProvider<T>**
\`\`\`java
@Service
public class ReportService {
    private final ObjectProvider<ReportGenerator> generatorProvider;
    
    public void generateReport(ReportRequest request) {
        ReportGenerator generator = generatorProvider.getObject(); // new instance each call
        generator.generate(request);
    }
}
\`\`\``,
  example: {
    title: 'Bean Scopes in Practice',
    description: 'Singleton services, prototype processors, and request-scoped context.',
    code: [
      {
        label: 'Singleton (Default — No Annotation Needed)',
        language: 'java',
        code: `// Singleton by default — no @Scope annotation needed
@Service
public class UserService {
    // MUST be stateless — shared across all threads
    // Never store request-specific data in instance fields
    
    private final UserRepository userRepository; // also singleton
    private final PasswordEncoder passwordEncoder; // also singleton

    public UserService(UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Thread-safe: all state is local to the method
    public UserDto getUser(Long id) {
        return userRepository.findById(id)
            .map(UserDto::from)
            .orElseThrow(() -> new UserNotFoundException(id));
    }
}`,
      },
      {
        label: 'Prototype Scope',
        language: 'java',
        code: `// New instance for every request
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class CsvReportGenerator {

    // Mutable state — safe because each caller gets their own instance
    private final List<String> rows = new ArrayList<>();
    private String reportTitle;
    private LocalDate reportDate;

    public void setTitle(String title) { this.reportTitle = title; }
    public void addRow(String row) { rows.add(row); }

    public byte[] generate() {
        StringBuilder csv = new StringBuilder();
        csv.append(reportTitle).append("\n");
        rows.forEach(row -> csv.append(row).append("\n"));
        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }
}

// Correct way to use prototype in singleton:
@Service
public class ReportService {

    // ObjectProvider gives a new instance each time getObject() is called
    private final ObjectProvider<CsvReportGenerator> reportGeneratorProvider;

    public ReportService(ObjectProvider<CsvReportGenerator> reportGeneratorProvider) {
        this.reportGeneratorProvider = reportGeneratorProvider;
    }

    public byte[] generateSalesReport(LocalDate date) {
        CsvReportGenerator generator = reportGeneratorProvider.getObject();
        generator.setTitle("Sales Report " + date);
        salesData.forEach(row -> generator.addRow(row.toCsv()));
        return generator.generate();
    }
}`,
      },
      {
        label: 'Request Scope',
        language: 'java',
        code: `// One instance per HTTP request — holds request-specific context
@Component
@RequestScope  // shorthand for @Scope("request")
public class RequestContext {

    private String requestId;
    private String userId;
    private String traceId;
    private Instant startTime;

    @PostConstruct
    public void init() {
        this.requestId = UUID.randomUUID().toString();
        this.startTime = Instant.now();
    }

    // Getters and setters
    public String getRequestId() { return requestId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getUserId() { return userId; }
    public long getElapsedMs() {
        return Duration.between(startTime, Instant.now()).toMillis();
    }
}

// Usage in a filter:
@Component
public class RequestContextFilter extends OncePerRequestFilter {

    private final RequestContext requestContext;  // request-scoped proxy injected

    public RequestContextFilter(RequestContext requestContext) {
        this.requestContext = requestContext;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain chain) throws ServletException, IOException {
        requestContext.setUserId(extractUserId(request));
        MDC.put("requestId", requestContext.getRequestId());
        try {
            chain.doFilter(request, response);
        } finally {
            MDC.clear();
        }
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I inject a request-scoped bean into a singleton?',
      answer: 'Yes, but Spring injects a proxy, not the actual bean. The proxy delegates to the real request-scoped bean for the current request. This is why @RequestScope beans work when injected into singletons — Spring creates a scoped proxy automatically. Add @Scope(value="request", proxyMode=ScopedProxyMode.TARGET_CLASS) if needed.',
    },
    {
      question: 'Are singleton beans thread-safe?',
      answer: 'Singleton beans are shared across all threads, but Spring doesn\'t make them thread-safe for you. YOU must ensure thread safety. The key rule: don\'t store mutable instance state in singleton beans. Keep all state in local variables (method-scoped) or use thread-safe data structures (ConcurrentHashMap, AtomicLong). Stateless services are naturally thread-safe.',
    },
    {
      question: 'When should I use prototype scope?',
      answer: 'Rarely. Use prototype when: (1) the bean has mutable state that must not be shared, (2) each caller needs an independent instance, (3) the object is expensive to share due to state. Most enterprise beans are stateless singletons. If you find yourself reaching for prototype, first ask if the state should be in a method parameter instead.',
    },
  ],
  productionIssues: [
    'Singleton bean with mutable instance fields causing race conditions under concurrent requests',
    'Prototype bean injected directly into singleton — only one instance created, scope not working',
    'Session-scoped bean not serializable — causes issues with distributed sessions (Redis)',
    'Request-scoped bean accessed outside of request (e.g., in @Async method) — use RequestAttributes',
    'Memory leak from prototype beans holding resources — Spring doesn\'t call @PreDestroy on prototypes',
  ],
  bestPractices: [
    'Default to singleton — only use other scopes when you have a specific reason',
    'Never store mutable request-specific state in singleton beans',
    'Use ObjectProvider<T> to correctly inject prototype beans into singletons',
    'Ensure session-scoped beans implement Serializable for distributed session support',
    'Use request scope for per-request context (trace IDs, user context, audit info)',
  ],
  architectNote: `The most common production bug I see with bean scopes is storing user-specific data in singleton service fields. A developer stores the "current user" in a @Service field, and it works fine in testing (single user). In production with concurrent requests, users see each other\'s data. Rule: singleton beans must be stateless. All request-specific state goes in method parameters, ThreadLocal, or request-scoped beans.`,
  faqs: [
    {
      question: 'What is a scoped proxy?',
      answer: 'When a shorter-lived bean (request/session/prototype) is injected into a longer-lived bean (singleton), Spring creates a proxy. The proxy is singleton but delegates every method call to the real bean for the current scope (current request, current session). Enable with proxyMode=ScopedProxyMode.TARGET_CLASS on the @Scope annotation.',
    },
    {
      question: 'Does Spring Boot have any custom scopes?',
      answer: 'Yes. Spring Cloud adds @RefreshScope — beans are re-created when config is refreshed via Spring Cloud Config. Spring Batch adds @JobScope and @StepScope for batch-specific lifecycles. Spring Session integrates with @SessionScope for distributed sessions.',
    },
  ],
  keyTakeaways: [
    'Singleton (default) — one instance per context, must be thread-safe/stateless',
    'Prototype — new instance per request, Spring doesn\'t manage destruction',
    'Request scope — one per HTTP request, destroyed when request ends',
    'Session scope — one per HTTP session, must be Serializable',
    'Never inject prototype directly into singleton — use ObjectProvider<T>',
    'Singleton beans must not store mutable per-request state',
  ],
  relatedTopics: ['spring-ioc', 'spring-di', 'spring-bean-lifecycle', 'spring-controllers'],
};
