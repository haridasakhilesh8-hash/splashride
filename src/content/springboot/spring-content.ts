import type { TopicContent } from '../types';

export const springIoC: TopicContent = {
  slug: 'spring-ioc',
  title: 'Spring IoC Container',
  description: 'Understand the Spring IoC Container — the heart of the Spring Framework that manages object creation, wiring, and lifecycle.',
  applicableVersions: ['Spring Boot 2.x', 'Spring Boot 3.x', 'Spring 6'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'IoC (Inversion of Control) means Spring creates and manages your objects (beans) instead of you doing it with "new". The IoC Container reads your configuration, creates all the objects your app needs, wires them together, and manages their lifecycle. You just declare what you need; Spring figures out how to provide it.',
  whatIsIt: `The Spring IoC Container is the core of the Spring Framework. It:

- **Creates** objects (beans) based on your configuration
- **Wires** dependencies between beans (Dependency Injection)
- **Manages lifecycle** — initializes, uses, and destroys beans
- **Provides** beans to whoever needs them

**Two types of IoC Container:**
- \`BeanFactory\` — basic container (rarely used directly)
- \`ApplicationContext\` — enhanced container with events, AOP, i18n (always use this)

**Bean definition sources:**
- \`@Component\`, \`@Service\`, \`@Repository\`, \`@Controller\` — classpath scanning
- \`@Bean\` methods in \`@Configuration\` classes
- XML configuration (legacy, avoid in new projects)`,
  whyWeNeedIt: `Without IoC, you'd manually create and wire objects everywhere:
\`\`\`java
// Without Spring — manual wiring is painful
UserRepository repo = new JpaUserRepository(dataSource);
EmailService email = new SmtpEmailService(smtpConfig);
UserService service = new UserServiceImpl(repo, email, passwordEncoder);
UserController controller = new UserController(service);
\`\`\`

With Spring IoC, you just declare dependencies — Spring handles the rest. This enables:
- **Loose coupling** — components don\'t create their dependencies
- **Easy testing** — inject mock dependencies in tests
- **Centralized configuration** — change implementations without changing consumers
- **Lifecycle management** — Spring handles initialization and cleanup`,
  realWorldUsage: `In a Spring Boot application, IoC is invisible but everywhere:
- Your \`@Service\` classes don\'t create their \`@Repository\` dependencies — Spring injects them
- Your \`@Controller\` doesn\'t create its \`@Service\` — Spring injects it
- Your \`DataSource\`, \`EntityManagerFactory\`, \`TransactionManager\` — Spring creates them from your config
- Your custom beans (\`EmailService\`, \`PaymentGateway\`) — Spring creates and wires them`,
  howItWorks: `**Bean Scopes:**
- \`singleton\` (default) — one instance per ApplicationContext
- \`prototype\` — new instance per injection/request
- \`request\` — one per HTTP request (web apps)
- \`session\` — one per HTTP session (web apps)

**Bean Lifecycle:**
1. Instantiate (constructor)
2. Populate properties (DI)
3. BeanNameAware, BeanFactoryAware callbacks
4. BeanPostProcessor pre-init
5. \`@PostConstruct\` / InitializingBean.afterPropertiesSet()
6. Bean is ready for use
7. \`@PreDestroy\` / DisposableBean.destroy() on shutdown`,
  example: {
    title: 'Spring IoC in Practice',
    description: 'How Spring creates and wires beans in a real application.',
    code: [
      {
        label: 'Bean Configuration',
        language: 'java',
        code: `// @Configuration class — defines beans explicitly
@Configuration
public class AppConfig {

    // @Bean method — Spring calls this and manages the returned object
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }

    // Conditional bean — only created if property is set
    @Bean
    @ConditionalOnProperty(name = "feature.email.enabled", havingValue = "true")
    public EmailService emailService(EmailProperties props) {
        return new SmtpEmailService(props);
    }
}

// @Component — Spring auto-detects via classpath scanning
@Service  // @Service is @Component with semantic meaning
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    // Constructor injection — preferred (immutable, testable)
    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        EmailService emailService  // Spring injects the bean created above
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostConstruct
    public void init() {
        // Runs after all dependencies are injected
        log.info("UserService initialized");
    }

    @PreDestroy
    public void cleanup() {
        // Runs before the bean is destroyed (app shutdown)
        log.info("UserService shutting down");
    }
}`,
      },
    ],
  },
  commonConfusions: [
    { question: 'What is the difference between @Component, @Service, @Repository, and @Controller?', answer: '@Component is the generic stereotype. @Service, @Repository, @Controller are specializations — they\'re all @Component but add semantic meaning. @Repository also enables exception translation (JPA exceptions → Spring DataAccessException). Use the most specific annotation that applies.' },
    { question: 'What is the difference between singleton scope and the Singleton design pattern?', answer: 'Spring singleton scope means one bean per ApplicationContext — not one per JVM. If you have multiple ApplicationContexts (rare but possible), each has its own singleton instance. The Singleton pattern enforces one per JVM via private constructor. They\'re different.' },
  ],
  productionIssues: [
    'Circular dependency — Bean A needs Bean B, Bean B needs Bean A. Refactor to break the cycle, or use @Lazy injection.',
    'Bean not found — @Component not in the component scan path. Check @SpringBootApplication\'s basePackages.',
    'Wrong bean injected — multiple implementations of an interface. Use @Primary or @Qualifier to specify which one.',
    'Singleton bean holding request-scoped state — stateful fields in singleton beans cause concurrency bugs. Keep singletons stateless.',
  ],
  bestPractices: [
    'Always use constructor injection — it makes dependencies explicit and enables immutability.',
    'Keep beans stateless — singleton beans are shared across all requests.',
    'Use @ConfigurationProperties for configuration — type-safe, validated, and IDE-friendly.',
    'Avoid ApplicationContext.getBean() — it\'s service locator pattern, not DI.',
    'Use @Profile for environment-specific beans.',
  ],
  architectNote: `The IoC Container is what makes Spring powerful. Understanding it deeply helps you debug Spring issues that seem magical.

**The key insight:** Spring is just a very sophisticated object factory. When you understand that, the "magic" becomes mechanical — Spring reads annotations, creates objects, and calls setters/constructors. Nothing more.

**For large applications:** Use @Configuration classes to organize bean definitions by domain. Keep your @SpringBootApplication class lean — it\'s just the entry point.`,
  faqs: [
    { question: 'Does Spring IoC add significant overhead?', answer: 'At startup, yes — Spring scans classpath, creates beans, and wires dependencies. For a large app, this might take 30-60 seconds. At runtime, the overhead is negligible — bean lookups are O(1) HashMap operations. The startup cost is a one-time investment for the lifetime of the application.' },
  ],
  keyTakeaways: [
    'IoC = Spring creates and manages your objects, not you',
    'ApplicationContext is the IoC container you interact with',
    '@Component/@Service/@Repository/@Controller mark classes for Spring management',
    'Constructor injection is preferred — explicit, immutable, testable',
    'Singleton scope (default) — one instance per ApplicationContext',
    'Keep singleton beans stateless to avoid concurrency issues',
  ],
  relatedTopics: ['spring-di', 'spring-rest', 'spring-jpa'],
};

export const springDI: TopicContent = {
  slug: 'spring-di',
  title: 'Dependency Injection',
  description: 'Master Dependency Injection in Spring — the pattern that makes your code loosely coupled, testable, and maintainable.',
  applicableVersions: ['Spring Boot 2.x', 'Spring Boot 3.x'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Dependency Injection means a class receives its dependencies from outside (injected) rather than creating them itself. Instead of "new EmailService()" inside your class, Spring provides the EmailService to you. This makes your class easier to test (inject a mock), easier to change (swap implementations), and easier to understand (dependencies are explicit).',
  whatIsIt: `DI is a design pattern where an object\'s dependencies are provided externally rather than created internally.

**Three types of DI in Spring:**

1. **Constructor injection** (recommended):
\`\`\`java
public UserService(UserRepository repo) { this.repo = repo; }
\`\`\`

2. **Setter injection** (for optional dependencies):
\`\`\`java
@Autowired public void setEmailService(EmailService es) { this.es = es; }
\`\`\`

3. **Field injection** (avoid):
\`\`\`java
@Autowired private UserRepository repo; // don't do this
\`\`\``,
  whyWeNeedIt: `DI enables:
- **Testability** — inject mocks in unit tests without a real database
- **Loose coupling** — depend on interfaces, not concrete classes
- **Open/Closed principle** — add new implementations without changing consumers
- **Single Responsibility** — classes focus on their logic, not object creation`,
  realWorldUsage: `DI is the backbone of every Spring application. Every @Service, @Controller, and @Repository participates in DI. In tests, you inject @MockBean to replace real implementations with mocks.`,
  howItWorks: `Spring\'s IoC container reads your bean definitions, determines the dependency graph, and resolves all dependencies before providing the bean. For constructor injection, Spring calls the constructor with the resolved dependencies.

**@Autowired** is optional on constructors in Spring 5+ if there\'s only one constructor. Spring auto-detects it. For multiple constructors, use @Autowired to specify which one Spring should use.`,
  example: {
    title: 'DI Patterns and Testing',
    description: 'Constructor injection and testing with mocks.',
    code: [
      {
        label: 'Constructor Injection + Testing',
        language: 'java',
        code: `// Production code — constructor injection
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final NotificationService notificationService;

    // Spring auto-detects single constructor — no @Autowired needed
    public OrderService(
        OrderRepository orderRepository,
        PaymentService paymentService,
        NotificationService notificationService
    ) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.notificationService = notificationService;
    }

    public Order placeOrder(PlaceOrderRequest request) {
        Order order = Order.from(request);
        paymentService.charge(order.getTotal(), request.getPaymentMethod());
        Order saved = orderRepository.save(order);
        notificationService.sendConfirmation(saved);
        return saved;
    }
}

// Test — inject mocks without Spring context (fast!)
class OrderServiceTest {

    @Mock private OrderRepository orderRepository;
    @Mock private PaymentService paymentService;
    @Mock private NotificationService notificationService;
    @InjectMocks private OrderService orderService;

    @Test
    void shouldSaveOrderAfterSuccessfulPayment() {
        // Arrange
        PlaceOrderRequest request = TestData.validOrderRequest();
        Order expectedOrder = Order.from(request);
        when(orderRepository.save(any())).thenReturn(expectedOrder);

        // Act
        Order result = orderService.placeOrder(request);

        // Assert
        verify(paymentService).charge(any(), any());
        verify(orderRepository).save(any());
        verify(notificationService).sendConfirmation(expectedOrder);
        assertThat(result).isEqualTo(expectedOrder);
    }
}`,
      },
    ],
  },
  commonConfusions: [
    { question: 'Why is field injection bad?', answer: 'Field injection (@Autowired on fields) hides dependencies (you can\'t see them in the constructor), makes testing harder (you need reflection or Spring context to inject), and allows creating instances without injecting dependencies (null fields). Constructor injection makes dependencies explicit and mandatory.' },
    { question: 'What is @Qualifier and when do I need it?', answer: 'When you have multiple beans of the same type, Spring doesn\'t know which to inject. @Qualifier("beanName") specifies which one. Alternatively, use @Primary to mark one bean as the default. In practice, having multiple implementations is common — PaymentService might have StripePaymentService and PayPalPaymentService.' },
  ],
  productionIssues: [
    'UnsatisfiedDependencyException — Spring can\'t find a bean to inject. Check that the dependency class is a Spring bean (@Component/@Service/@Bean).',
    'NoUniqueBeanDefinitionException — multiple beans of the same type. Use @Primary or @Qualifier.',
    'NullPointerException on injected field — using field injection and creating the object with new instead of letting Spring manage it.',
  ],
  bestPractices: [
    'Always use constructor injection — it\'s explicit, immutable, and testable.',
    'Inject interfaces, not concrete classes — enables swapping implementations.',
    'Keep the number of constructor parameters reasonable — if you have 7+ dependencies, the class is doing too much.',
    'Use @MockBean in Spring integration tests, @Mock + @InjectMocks for pure unit tests.',
  ],
  architectNote: `DI is the most important design pattern in enterprise Java. It\'s the foundation of testable, maintainable code.

**The test-driven perspective:** If you can\'t easily write a unit test for a class, DI is the fix. Constructor injection makes testing trivial — just instantiate with mocks.`,
  faqs: [
    { question: 'Should I use Lombok @RequiredArgsConstructor?', answer: 'Yes, it\'s a common and accepted pattern. Lombok generates the constructor for all final fields, which pairs perfectly with constructor injection. Just add final to your dependency fields and @RequiredArgsConstructor to the class.' },
  ],
  keyTakeaways: [
    'DI = receive dependencies from outside, don\'t create them',
    'Constructor injection is the recommended approach',
    'Inject interfaces, not concrete classes',
    'Field injection (@Autowired on fields) is an anti-pattern',
    'DI makes unit testing trivial — inject mocks via constructor',
  ],
  relatedTopics: ['spring-ioc', 'spring-rest', 'java-oop'],
};

export const springREST: TopicContent = {
  slug: 'spring-rest',
  title: 'Spring Boot REST APIs',
  description: 'Build production-quality REST APIs with Spring Boot — controllers, request mapping, validation, error handling, and best practices.',
  applicableVersions: ['Spring Boot 2.x', 'Spring Boot 3.x'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Spring Boot makes building REST APIs incredibly simple. Annotate a class with @RestController, map methods to HTTP endpoints with @GetMapping/@PostMapping, and Spring handles serialization, deserialization, and HTTP plumbing automatically. A working REST endpoint is 5 lines of code.',
  whatIsIt: `Spring MVC (included in Spring Boot Web) provides the REST API framework:

- \`@RestController\` — marks a class as a REST controller (combines @Controller + @ResponseBody)
- \`@GetMapping\`, \`@PostMapping\`, \`@PutMapping\`, \`@DeleteMapping\` — map HTTP methods to methods
- \`@PathVariable\` — extracts values from URL path
- \`@RequestParam\` — extracts query parameters
- \`@RequestBody\` — deserializes JSON request body
- \`@Valid\` — triggers Bean Validation on request body
- \`ResponseEntity<T>\` — full control over HTTP response (status, headers, body)`,
  whyWeNeedIt: `Spring Boot eliminates the boilerplate of raw servlet programming. Without Spring, you\'d manually parse HTTP requests, serialize responses, handle errors, and manage threads. Spring handles all of this, letting you focus on business logic.`,
  realWorldUsage: `Every Spring Boot backend service exposes REST APIs. In a microservices architecture, services communicate via REST (or gRPC). In a monolith, the frontend calls REST APIs.`,
  howItWorks: `When a request arrives, Spring\'s DispatcherServlet routes it to the matching @RequestMapping method. Spring deserializes the request body (Jackson), validates it (@Valid), executes your method, and serializes the return value to JSON. Exception handlers (@ControllerAdvice) catch exceptions and return appropriate error responses.`,
  example: {
    title: 'Complete REST Controller',
    description: 'A production-quality REST controller with validation, error handling, and pagination.',
    code: [
      {
        label: 'REST Controller',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/v1/users?page=0&size=20&search=john
    @GetMapping
    public ResponseEntity<PageResponse<UserDTO>> getUsers(
        @RequestParam(defaultValue = "0") @Min(0) int page,
        @RequestParam(defaultValue = "20") @Max(100) int size,
        @RequestParam(required = false) String search
    ) {
        Page<UserDTO> users = userService.findAll(PageRequest.of(page, size), search);
        return ResponseEntity.ok(PageResponse.from(users));
    }

    // GET /api/v1/users/{id}
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable @UUID String id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/v1/users
    @PostMapping
    public ResponseEntity<UserDTO> createUser(
        @Valid @RequestBody CreateUserRequest request
    ) {
        UserDTO created = userService.create(request);
        URI location = URI.create("/api/v1/users/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }

    // PUT /api/v1/users/{id}
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
        @PathVariable String id,
        @Valid @RequestBody UpdateUserRequest request
    ) {
        return ResponseEntity.ok(userService.update(id, request));
    }

    // DELETE /api/v1/users/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

// Request DTO with validation
public record CreateUserRequest(
    @NotBlank @Size(min = 2, max = 100) String name,
    @NotBlank @Email String email,
    @NotBlank @Size(min = 8) String password,
    @NotNull Role role
) {}

// Global exception handler
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
        MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = ex.getBindingResult().getFieldErrors()
            .stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                f -> f.getDefaultMessage() != null ? f.getDefaultMessage() : "Invalid"
            ));
        return ResponseEntity.badRequest()
            .body(new ErrorResponse("VALIDATION_FAILED", errors));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        log.error("Unhandled exception", ex);
        return ResponseEntity.internalServerError()
            .body(new ErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"));
    }
}`,
      },
    ],
  },
  commonConfusions: [
    { question: 'What is the difference between @Controller and @RestController?', answer: '@Controller returns view names (for server-side rendering with Thymeleaf/JSP). @RestController = @Controller + @ResponseBody — every method returns data serialized to JSON/XML, not a view name. For REST APIs, always use @RestController.' },
    { question: 'Should I return the entity directly or use a DTO?', answer: 'Always use DTOs. Returning entities directly: exposes your database schema, includes sensitive fields (passwords, internal IDs), causes LazyInitializationException with JPA lazy-loaded associations, and couples your API to your database model. DTOs give you control over what you expose.' },
  ],
  productionIssues: [
    'LazyInitializationException — accessing lazy-loaded JPA associations outside a transaction. Use DTOs and fetch what you need in the service layer.',
    'StackOverflowError — bidirectional JPA relationships causing infinite JSON serialization. Use @JsonIgnore or @JsonManagedReference/@JsonBackReference.',
    'No error body on validation failure — @Valid not working because @Validated is missing on the controller, or the exception handler isn\'t catching the right exception type.',
    '405 Method Not Allowed — wrong HTTP method in the request, or the method mapping is wrong.',
  ],
  bestPractices: [
    'Always use DTOs — never expose JPA entities directly.',
    'Use @RestControllerAdvice for centralized exception handling.',
    'Return proper HTTP status codes: 201 for create, 204 for delete, 400 for validation errors, 404 for not found.',
    'Version your API: /api/v1/users — enables breaking changes without breaking existing clients.',
    'Use @Valid on request bodies and @Validated on controllers for method-level validation.',
    'Add OpenAPI/Swagger documentation with springdoc-openapi.',
  ],
  architectNote: `REST API design is as important as the implementation. Follow REST conventions: use nouns for resources (/users, not /getUsers), use HTTP methods semantically (GET for reads, POST for creates, PUT/PATCH for updates, DELETE for deletes), and return consistent response shapes.

**Versioning strategy:** URI versioning (/api/v1/) is the most visible and easiest to route. Header versioning is cleaner but harder to test. Pick one and stick to it.`,
  faqs: [
    { question: 'Should I use PUT or PATCH for updates?', answer: 'PUT replaces the entire resource (all fields required). PATCH partially updates (only specified fields). In practice, many teams use PUT for simplicity. Use PATCH when partial updates are a real use case and you want to avoid sending unchanged data.' },
  ],
  keyTakeaways: [
    '@RestController + @GetMapping/@PostMapping = REST endpoint',
    'Always use DTOs — never expose JPA entities',
    '@Valid triggers Bean Validation on request bodies',
    '@RestControllerAdvice for centralized error handling',
    'Return proper HTTP status codes: 200/201/204/400/401/404/500',
    'Version your API from day one: /api/v1/',
  ],
  relatedTopics: ['spring-ioc', 'spring-di', 'spring-jpa'],
};

export const springJPA: TopicContent = {
  slug: 'spring-jpa',
  title: 'Spring Data JPA & Hibernate',
  description: 'Learn Spring Data JPA — the framework that makes database operations in Spring Boot simple, type-safe, and powerful.',
  applicableVersions: ['Spring Boot 2.x', 'Spring Boot 3.x', 'Hibernate 6'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'Spring Data JPA lets you interact with relational databases without writing SQL for most operations. Define a Java class (entity) that maps to a database table, create a repository interface that extends JpaRepository, and you get 50+ database operations for free — findById, save, delete, findAll with pagination, and custom queries.',
  whatIsIt: `Spring Data JPA sits on top of JPA (Java Persistence API) and Hibernate (the JPA implementation):

- **JPA** — the specification for ORM in Java
- **Hibernate** — the most popular JPA implementation (Spring Boot uses it by default)
- **Spring Data JPA** — simplifies JPA with repository abstraction and query derivation

**Key components:**
- \`@Entity\` — marks a class as a database table
- \`@Id\` — marks the primary key field
- \`JpaRepository<Entity, ID>\` — provides CRUD operations
- \`@Query\` — custom JPQL or native SQL queries
- \`@Transactional\` — manages database transactions`,
  whyWeNeedIt: `Without Spring Data JPA, you\'d write boilerplate JDBC code: connection management, PreparedStatement creation, result set mapping, exception handling. JPA eliminates this and adds:
- Object-Relational Mapping — Java objects ↔ database tables
- Automatic query generation from method names
- Transaction management
- Lazy/eager loading
- Caching`,
  realWorldUsage: `Spring Data JPA is the standard for database access in Spring Boot. Every entity (User, Order, Product) has a corresponding repository. Service classes inject repositories and call methods like userRepository.findByEmailAndActive(email, true).`,
  howItWorks: `Spring Data JPA generates repository implementations at startup. For method names like \`findByEmailAndActive\`, it parses the method name and generates the JPQL query. For complex queries, use \`@Query\` with JPQL or native SQL.

**Transaction management:** @Transactional wraps the method in a transaction. If an exception is thrown, the transaction rolls back. Spring Boot auto-configures transactions with the DataSource.`,
  example: {
    title: 'JPA Entity and Repository',
    description: 'A complete JPA entity with relationships and a feature-rich repository.',
    code: [
      {
        label: 'Entity + Repository',
        language: 'java',
        code: `// Entity — maps to "users" table
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // One-to-many relationship
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();

    // Many-to-one relationship
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    // Getters, setters, equals, hashCode
}

// Repository — Spring generates implementation automatically
@Repository
public interface UserRepository extends JpaRepository<User, String> {

    // Query derivation — Spring generates: SELECT * FROM users WHERE email = ?
    Optional<User> findByEmail(String email);

    // Multiple conditions
    List<User> findByStatusAndDepartmentId(UserStatus status, String deptId);

    // Pagination + sorting
    Page<User> findByStatus(UserStatus status, Pageable pageable);

    // Custom JPQL query
    @Query("SELECT u FROM User u WHERE u.createdAt > :since AND u.status = :status")
    List<User> findRecentActiveUsers(
        @Param("since") LocalDateTime since,
        @Param("status") UserStatus status
    );

    // Native SQL for complex queries
    @Query(value = """
        SELECT u.*, COUNT(o.id) as order_count
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id
        WHERE u.status = 'ACTIVE'
        GROUP BY u.id
        HAVING COUNT(o.id) > :minOrders
        """, nativeQuery = true)
    List<Object[]> findActiveUsersWithMinOrders(@Param("minOrders") int minOrders);

    // Exists check — more efficient than findBy + isPresent
    boolean existsByEmail(String email);

    // Count
    long countByStatus(UserStatus status);

    // Modifying query — must be @Transactional
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.status = :status WHERE u.id IN :ids")
    int bulkUpdateStatus(@Param("ids") List<String> ids, @Param("status") UserStatus status);
}

// Service with transaction management
@Service
@Transactional(readOnly = true) // default read-only for all methods
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Page<UserDTO> findAll(Pageable pageable, String search) {
        if (search != null && !search.isBlank()) {
            return userRepository.findByNameContainingIgnoreCase(search, pageable)
                .map(UserDTO::from);
        }
        return userRepository.findAll(pageable).map(UserDTO::from);
    }

    @Transactional // override to read-write for mutations
    public UserDTO create(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException(request.email());
        }
        User user = new User(request.name(), request.email());
        return UserDTO.from(userRepository.save(user));
    }
}`,
      },
    ],
  },
  commonConfusions: [
    { question: 'What is the N+1 query problem?', answer: 'When you load a list of entities with lazy-loaded associations, JPA executes 1 query for the list + N queries for each entity\'s association = N+1 queries. Fix with JOIN FETCH in JPQL, @EntityGraph, or @BatchSize. Always check your SQL logs in development.' },
    { question: 'When should I use FetchType.EAGER vs LAZY?', answer: 'Default to LAZY for all associations — load data only when needed. Use EAGER only for associations you always need (rare). EAGER loading can cause performance disasters on queries that load many entities. Fetch eagerly in specific queries using JOIN FETCH.' },
  ],
  productionIssues: [
    'LazyInitializationException — accessing a lazy association outside a transaction. Use DTOs that fetch everything needed within the transaction.',
    'N+1 query problem — 1 query for list + N queries for each item\'s lazy association. Use JOIN FETCH or @EntityGraph.',
    'Transaction not rolling back — exception is caught and swallowed before Spring sees it. Let exceptions propagate from @Transactional methods.',
    'Connection pool exhaustion — too many concurrent requests holding connections. Tune HikariCP pool size and query timeouts.',
  ],
  bestPractices: [
    'Always convert entities to DTOs before returning from the service layer.',
    'Use @Transactional(readOnly = true) for read operations — enables optimizations.',
    'Monitor SQL queries in development: spring.jpa.show-sql=true.',
    'Use database indexes for columns used in WHERE clauses.',
    'Use pagination for all list endpoints — never load unbounded collections.',
    'Use @BatchSize or JOIN FETCH to solve N+1 problems.',
  ],
  architectNote: `JPA/Hibernate is powerful but has sharp edges. The most important rule: **always convert entities to DTOs in the service layer**. Entities should never leave the service layer — they\'re database objects, not API objects.

**The OSIV (Open Session in View) anti-pattern:** Spring Boot enables OSIV by default, which keeps the JPA session open during the entire HTTP request. This allows lazy loading in controllers/views but hides N+1 problems. Disable it in production: spring.jpa.open-in-view=false.`,
  faqs: [
    { question: 'Should I use Spring Data JPA or JOOQ or JDBC?', answer: 'Spring Data JPA for most CRUD operations — it\'s productive and handles 80% of use cases. JOOQ for complex queries where you want type-safe SQL. Plain JDBC/JdbcTemplate for performance-critical bulk operations. Many projects use all three — JPA for entities, JOOQ for reporting queries.' },
  ],
  keyTakeaways: [
    '@Entity + @Repository + JpaRepository = database operations without SQL',
    'Method name derivation generates queries automatically',
    '@Transactional manages database transactions',
    'Always use DTOs — never expose entities directly',
    'N+1 problem: use JOIN FETCH or @EntityGraph',
    'Default to FetchType.LAZY for all associations',
  ],
  relatedTopics: ['spring-ioc', 'spring-di', 'spring-rest'],
};
