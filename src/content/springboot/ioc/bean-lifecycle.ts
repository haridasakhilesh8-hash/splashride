import type { TopicContent } from '../../types';

export const springBeanLifecycle: TopicContent = {
  slug: 'spring-bean-lifecycle',
  title: 'Bean Lifecycle',
  description: 'Understand the complete Spring bean lifecycle — from instantiation through initialization to destruction — and how to hook into each phase for initialization and cleanup.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Every Spring bean goes through a lifecycle: created (constructor called), dependencies injected, initialized (@PostConstruct), ready for use, then destroyed (@PreDestroy on shutdown). You can hook into any phase. The most important hooks are @PostConstruct (run code after injection) and @PreDestroy (cleanup before shutdown).',
  whatIsIt: `The Spring bean lifecycle is the sequence of events from when a bean is created to when it\'s destroyed.

**Full lifecycle sequence:**
1. **Instantiation** — constructor called
2. **Dependency Injection** — properties set, constructor/setter injection
3. **BeanNameAware.setBeanName()** — bean learns its name
4. **BeanFactoryAware.setBeanFactory()** — bean gets container reference
5. **ApplicationContextAware.setApplicationContext()** — bean gets context
6. **BeanPostProcessor.postProcessBeforeInitialization()** — pre-init processing
7. **@PostConstruct** method called
8. **InitializingBean.afterPropertiesSet()** — programmatic init
9. **@Bean(initMethod="...")** — custom init method
10. **BeanPostProcessor.postProcessAfterInitialization()** — post-init (AOP proxies created here)
11. **Bean is ready — in use**
12. **@PreDestroy** method called
13. **DisposableBean.destroy()** — programmatic cleanup
14. **@Bean(destroyMethod="...")** — custom destroy method

**In practice, you only need:**
- \`@PostConstruct\` for initialization
- \`@PreDestroy\` for cleanup`,
  whyWeNeedIt: `Lifecycle hooks let you:
- **Initialize resources** after all dependencies are injected (cache warmup, connection validation)
- **Register listeners** once the bean is fully set up
- **Clean up resources** gracefully on shutdown (close connections, flush buffers)
- **Validate configuration** at startup rather than at first use

Without lifecycle hooks, you\'d have initialization logic in constructors (where dependencies might not be available) or scattered across the codebase.`,
  realWorldUsage: `Common lifecycle patterns in enterprise apps:
- \`@PostConstruct\`: warm up caches, validate external service connectivity, start background threads
- \`@PreDestroy\`: close database connections, flush message queues, stop schedulers
- \`BeanPostProcessor\`: AOP proxies are created here (every \`@Transactional\` bean goes through this)
- \`ApplicationListener<ContextRefreshedEvent>\`: run code when ALL beans are initialized`,
  howItWorks: `**@PostConstruct:**
- Runs after constructor AND after all \`@Autowired\` injections are complete
- Safe to use dependencies here (unlike constructor, where DI may not be done)
- Runs once per bean instance
- If it throws, the application fails to start

**@PreDestroy:**
- Runs when the ApplicationContext is closing
- For web apps: triggered by JVM shutdown hook or explicit close()
- Prototype-scoped beans: @PreDestroy is NOT called (Spring doesn\'t track them)
- Runs in reverse order of initialization

**BeanPostProcessor:**
- Runs for EVERY bean in the context
- Used by Spring internally for AOP proxying, @Async, @Transactional
- Implement BeanPostProcessor to add cross-cutting behavior to all beans`,
  example: {
    title: 'Bean Lifecycle in Practice',
    description: 'Real-world lifecycle hooks for initialization and cleanup.',
    code: [
      {
        label: '@PostConstruct and @PreDestroy',
        language: 'java',
        code: `@Service
@Slf4j
public class DatabaseHealthService {

    private final DataSource dataSource;
    private final AppProperties appProperties;
    private ScheduledExecutorService healthChecker;

    public DatabaseHealthService(DataSource dataSource, AppProperties appProperties) {
        this.dataSource = dataSource;
        this.appProperties = appProperties;
        // DON'T do initialization here — appProperties might not be fully bound yet
    }

    @PostConstruct  // All dependencies injected, safe to use them
    public void initialize() {
        log.info("Validating database connectivity...");
        try (Connection conn = dataSource.getConnection()) {
            boolean valid = conn.isValid(5); // 5 second timeout
            if (!valid) throw new IllegalStateException("Database connection invalid");
            log.info("Database connection validated successfully");
        } catch (SQLException e) {
            throw new IllegalStateException("Cannot connect to database at startup", e);
        }

        // Start background health checker
        healthChecker = Executors.newSingleThreadScheduledExecutor();
        healthChecker.scheduleAtFixedRate(
            this::checkHealth, 30, 30, TimeUnit.SECONDS
        );
        log.info("Database health checker started");
    }

    @PreDestroy  // Called when application shuts down
    public void cleanup() {
        log.info("Shutting down database health checker");
        if (healthChecker != null) {
            healthChecker.shutdown();
            try {
                healthChecker.awaitTermination(10, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    private void checkHealth() {
        try (Connection conn = dataSource.getConnection()) {
            conn.isValid(2);
        } catch (SQLException e) {
            log.error("Database health check failed", e);
        }
    }
}`,
      },
      {
        label: 'ApplicationListener for Post-Startup Logic',
        language: 'java',
        code: `// Runs after ALL beans are initialized and context is fully refreshed
@Component
@Slf4j
public class ApplicationStartupListener
        implements ApplicationListener<ApplicationReadyEvent> {

    private final CacheService cacheService;
    private final FeatureFlagService featureFlagService;

    public ApplicationStartupListener(CacheService cacheService,
                                       FeatureFlagService featureFlagService) {
        this.cacheService = cacheService;
        this.featureFlagService = featureFlagService;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        log.info("Application ready. Running post-startup initialization...");
        cacheService.warmUp();
        featureFlagService.loadFromDatabase();
        log.info("Post-startup initialization complete");
    }
}

// Or use @EventListener annotation:
@Component
public class StartupTasks {
    @EventListener(ApplicationReadyEvent.class)
    public void onReady() {
        // Runs after full context initialization
    }
}`,
      },
      {
        label: '@Bean with initMethod and destroyMethod',
        language: 'java',
        code: `@Configuration
public class ExternalServiceConfig {

    // For third-party classes you can't annotate with @PostConstruct
    @Bean(initMethod = "connect", destroyMethod = "disconnect")
    public ExternalApiClient apiClient(
            @Value("\${external.api.url}") String apiUrl,
            @Value("\${external.api.key}") String apiKey) {
        ExternalApiClient client = new ExternalApiClient();
        client.setBaseUrl(apiUrl);
        client.setApiKey(apiKey);
        client.setTimeout(Duration.ofSeconds(30));
        // connect() will be called by Spring after this method returns
        return client;
    }
    // disconnect() will be called by Spring on shutdown
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why can\'t I use dependencies in the constructor like I can in @PostConstruct?',
      answer: 'In the constructor, Spring hasn\'t injected dependencies yet (for setter/field injection). By @PostConstruct time, all injection is complete. With constructor injection, dependencies ARE available in the constructor — but @PostConstruct is still better for initialization because it runs after the full bean setup, including any BeanPostProcessor processing.',
    },
    {
      question: 'Is @PreDestroy called for prototype beans?',
      answer: 'No. Spring creates prototype beans on demand but doesn\'t track them after creation. @PreDestroy is never called for prototype-scoped beans. If you need cleanup for prototypes, implement DisposableBean and call destroy() manually, or use a singleton factory that manages the lifecycle.',
    },
    {
      question: 'What is the difference between ApplicationReadyEvent and ContextRefreshedEvent?',
      answer: 'ContextRefreshedEvent fires when the ApplicationContext is refreshed (all beans initialized). ApplicationReadyEvent fires after the context is refreshed AND the application is ready to serve requests (after CommandLineRunner and ApplicationRunner have run). Use ApplicationReadyEvent for post-startup tasks in web applications.',
    },
  ],
  productionIssues: [
    '@PostConstruct making blocking network calls that delay startup — run heavy initialization asynchronously or use ApplicationReadyEvent',
    '@PreDestroy not called because JVM killed with SIGKILL instead of SIGTERM — configure Kubernetes terminationGracePeriodSeconds',
    'Circular dependency in BeanPostProcessor — BPPs are special and must not depend on beans they process',
    'Long @PreDestroy blocking graceful shutdown — set spring.lifecycle.timeout-per-shutdown-phase',
    'ApplicationContext refreshed multiple times in tests — use @DirtiesContext carefully',
  ],
  bestPractices: [
    'Use @PostConstruct for initialization logic, never in constructors',
    'Keep @PostConstruct fast — slow init delays application startup',
    'Use @PreDestroy to close resources (connections, threads, file handles)',
    'For heavy startup work, use ApplicationReadyEvent so the app starts fast and initializes async',
    'Configure graceful shutdown: server.shutdown=graceful in application.properties',
  ],
  architectNote: `In cloud-native deployments, startup time matters. Kubernetes readiness probes wait for your app to be healthy before routing traffic. If your @PostConstruct methods take 30 seconds loading caches, your pod won\'t become ready for 30 seconds. Pattern: start fast, serve traffic, warm up asynchronously. Use ApplicationReadyEvent for non-critical initialization and async cache warming. Critical validation (DB connectivity) belongs in @PostConstruct.`,
  faqs: [
    {
      question: 'How do I run code once after the entire application starts?',
      answer: 'Implement CommandLineRunner or ApplicationRunner — their run() method is called after the ApplicationContext is fully initialized. Or use @EventListener(ApplicationReadyEvent.class). For one-time database migrations, Flyway/Liquibase run automatically via auto-configuration.',
    },
    {
      question: 'What happens if @PostConstruct throws an exception?',
      answer: 'The ApplicationContext fails to start and the application exits. This is intentional — if a bean can\'t initialize, the app shouldn\'t run. This is why validating external service connectivity in @PostConstruct is a valid pattern — fail fast at startup rather than failing at first request.',
    },
  ],
  keyTakeaways: [
    '@PostConstruct runs after all dependencies are injected — safe for initialization',
    '@PreDestroy runs on application shutdown — use for resource cleanup',
    'BeanPostProcessor processes every bean — used by Spring for AOP proxying',
    'ApplicationReadyEvent fires after full startup — use for post-startup tasks',
    '@PreDestroy is NOT called for prototype-scoped beans',
    'Configure graceful shutdown with server.shutdown=graceful',
  ],
  relatedTopics: ['spring-ioc', 'spring-di', 'spring-bean-scopes', 'spring-profiles'],
};
