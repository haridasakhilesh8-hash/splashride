import type { TopicContent } from '../../types';

export const springIocContainer: TopicContent = {
  slug: 'spring-ioc',
  title: 'IoC Container',
  description: 'Understand the Spring IoC Container — the heart of Spring that manages object creation, dependency wiring, and bean lifecycle in every enterprise application.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'IoC (Inversion of Control) means Spring creates and manages your objects instead of you doing it with "new". The IoC Container reads your configuration, creates all the objects your app needs, wires them together, and manages their lifecycle. You declare what you need; Spring figures out how to provide it.',
  whatIsIt: `The Spring IoC Container is the core runtime of the Spring Framework.

**What it does:**
- **Creates** objects (beans) based on your configuration
- **Wires** dependencies between beans (Dependency Injection)
- **Manages lifecycle** — initializes, uses, and destroys beans
- **Provides** beans to whoever requests them

**Two container implementations:**
- \`BeanFactory\` — basic container (lazy initialization, rarely used directly)
- \`ApplicationContext\` — enhanced container with events, AOP, i18n, eager init (always use this)

**ApplicationContext implementations:**
- \`AnnotationConfigApplicationContext\` — Java config, no XML
- \`ClassPathXmlApplicationContext\` — XML config (legacy)
- \`WebApplicationContext\` — for web applications
- \`SpringApplication.run()\` creates the right one automatically in Spring Boot

**Bean definition sources:**
- \`@Component\`, \`@Service\`, \`@Repository\`, \`@Controller\` — classpath scanning
- \`@Bean\` methods in \`@Configuration\` classes
- Auto-configuration classes`,
  whyWeNeedIt: `Without IoC, you manually create and wire every object:
\`\`\`java
// Without Spring — tight coupling, untestable
UserRepository repo = new JpaUserRepository(dataSource);
EmailService email = new SmtpEmailService(smtpConfig);
PasswordEncoder encoder = new BCryptPasswordEncoder(12);
UserService service = new UserServiceImpl(repo, email, encoder);
UserController controller = new UserController(service);
// If UserService changes constructor, every caller must change
\`\`\`

With IoC:
\`\`\`java
@Service
public class UserServiceImpl implements UserService {
    // Spring injects these — you don't create them
    public UserServiceImpl(UserRepository repo, EmailService email, PasswordEncoder encoder) { ... }
}
// Spring handles the wiring graph automatically
\`\`\`

Benefits:
- **Loose coupling** — components don\'t create their dependencies
- **Testability** — inject mock dependencies in unit tests
- **Centralized config** — change implementations without changing consumers
- **Lifecycle management** — Spring handles initialization and cleanup`,
  realWorldUsage: `IoC is invisible but everywhere in a Spring Boot app:
- Your \`@Service\` doesn\'t create its \`@Repository\` — Spring injects it
- Your \`@Controller\` doesn\'t create its \`@Service\` — Spring injects it
- \`DataSource\`, \`EntityManagerFactory\`, \`TransactionManager\` — Spring creates from your config
- \`KafkaTemplate\`, \`RestTemplate\`, \`RedisTemplate\` — Spring creates and injects

In a microservice with 50 classes, Spring manages all 50 objects and their dependencies automatically.`,
  howItWorks: `**Container startup:**
1. Scan classpath for \`@Component\`, \`@Service\`, \`@Repository\`, \`@Controller\`
2. Process \`@Configuration\` classes and \`@Bean\` methods
3. Build a dependency graph of all beans
4. Create beans in dependency order (dependencies first)
5. Inject dependencies (constructor, setter, or field)
6. Call \`@PostConstruct\` methods
7. Application is ready

**On shutdown:**
1. Call \`@PreDestroy\` methods
2. Close resources (DB connections, thread pools)
3. JVM exits

**Bean naming:**
- Default: camelCase class name (\`UserServiceImpl\` → \`userServiceImpl\`)
- Custom: \`@Service("userService")\` or \`@Bean("myBean")\``,
  example: {
    title: 'IoC Container in Practice',
    description: 'How Spring creates and wires beans in a real application.',
    code: [
      {
        label: 'Component Scanning',
        language: 'java',
        code: `// These annotations tell Spring to create and manage these objects

@Repository  // Data access layer — also enables exception translation
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate; // Spring injects JdbcTemplate
    }
}

@Service  // Business logic layer
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    // Constructor injection — Spring calls this
    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }
}

@Controller  // Web layer
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService; // Spring injects UserService
    }
}`,
      },
      {
        label: '@Configuration with @Bean',
        language: 'java',
        code: `@Configuration
public class AppConfig {

    // Spring calls this method and manages the returned object
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper;
    }

    // Spring injects restTemplateBuilder automatically
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
            .connectTimeout(Duration.ofSeconds(5))
            .readTimeout(Duration.ofSeconds(10))
            .build();
    }
}`,
      },
      {
        label: 'Lifecycle Callbacks',
        language: 'java',
        code: `@Service
public class CacheWarmupService {

    private final ProductRepository productRepository;
    private final CacheManager cacheManager;

    public CacheWarmupService(ProductRepository productRepository,
                               CacheManager cacheManager) {
        this.productRepository = productRepository;
        this.cacheManager = cacheManager;
    }

    // Called after all dependencies are injected
    @PostConstruct
    public void warmUpCache() {
        log.info("Warming up product cache...");
        List<Product> topProducts = productRepository.findTop100ByOrderBySalesDesc();
        Cache cache = cacheManager.getCache("products");
        topProducts.forEach(p -> cache.put(p.getId(), p));
        log.info("Cache warmed with {} products", topProducts.size());
    }

    // Called before the bean is destroyed (app shutdown)
    @PreDestroy
    public void cleanup() {
        log.info("Clearing product cache on shutdown");
        cacheManager.getCache("products").clear();
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between BeanFactory and ApplicationContext?',
      answer: 'BeanFactory is the basic container with lazy initialization. ApplicationContext extends it with eager initialization, event publishing, AOP support, i18n, and more. Always use ApplicationContext (which SpringApplication.run() creates automatically). BeanFactory is only relevant for extremely memory-constrained environments.',
    },
    {
      question: 'Can Spring manage objects I create with "new"?',
      answer: 'No. Objects created with "new" are not Spring beans — Spring doesn\'t know about them and won\'t inject dependencies into them. This is a common mistake: if you do "new UserService()" inside a @Controller, the UserService\'s dependencies won\'t be injected. Always let Spring create your beans.',
    },
    {
      question: 'What is the difference between @Component, @Service, @Repository, and @Controller?',
      answer: '@Service, @Repository, and @Controller are all specializations of @Component — they all register a bean in the container. The difference is semantic and functional: @Repository enables JPA exception translation, @Controller marks it as a web handler, @Service has no extra behavior but documents intent. Use the right one for each layer.',
    },
  ],
  productionIssues: [
    'Circular dependency: BeanA depends on BeanB which depends on BeanA — refactor to break the cycle, or use @Lazy on one injection point',
    'Bean not found (NoSuchBeanDefinitionException) — class not in component scan path or missing @Component annotation',
    'Multiple beans of same type (NoUniqueBeanDefinitionException) — use @Primary or @Qualifier to disambiguate',
    'ApplicationContext startup failure due to bean initialization error — check @PostConstruct methods for exceptions',
    'Prototype-scoped bean injected into singleton — use ObjectProvider<T> or @Lookup to get a new instance each time',
  ],
  bestPractices: [
    'Always use constructor injection — it makes dependencies explicit and enables final fields',
    'Keep @Configuration classes focused — one config class per concern (DataSourceConfig, SecurityConfig)',
    'Use @PostConstruct for initialization logic, not constructors (dependencies are available)',
    'Avoid circular dependencies by redesigning — they indicate architectural issues',
    'Use @Lazy sparingly — it hides startup problems until first use',
  ],
  architectNote: `The IoC container is the reason Spring applications are so testable. Because all dependencies are injected, you can substitute any bean with a mock in tests. This is why Spring applications typically have 80%+ test coverage — the architecture makes testing natural. When you see code that\'s hard to test in a Spring app, it\'s almost always because something is being created with \`new\` instead of being injected.`,
  faqs: [
    {
      question: 'How does Spring resolve which bean to inject when there are multiple implementations?',
      answer: 'Spring uses @Primary (prefer this bean), @Qualifier("name") (inject this specific bean), or the parameter name matching the bean name. If you have UserRepository and AdminUserRepository both implementing Repository, annotate one with @Primary or use @Qualifier("adminUserRepository") at the injection point.',
    },
    {
      question: 'What is a BeanDefinition?',
      answer: 'A BeanDefinition is Spring\'s internal metadata about a bean — its class, scope, constructor args, property values, lifecycle callbacks, and more. When Spring scans @Component or processes @Bean, it creates BeanDefinition objects. The container uses these to instantiate beans. You rarely interact with BeanDefinition directly unless writing framework code.',
    },
  ],
  keyTakeaways: [
    'IoC means Spring creates and manages your objects — you declare dependencies, Spring provides them',
    'ApplicationContext is the IoC container you always use — SpringApplication.run() creates it',
    '@Component, @Service, @Repository, @Controller register beans via classpath scanning',
    '@Bean methods in @Configuration classes register beans explicitly',
    '@PostConstruct runs after injection, @PreDestroy runs before shutdown',
    'Objects created with "new" are not Spring beans — always let Spring create them',
  ],
  relatedTopics: ['spring-di', 'spring-bean-lifecycle', 'spring-bean-scopes', 'spring-auto-configuration'],
};
