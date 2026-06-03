import type { TopicContent } from '../../types';

export const springDI: TopicContent = {
  slug: 'spring-di',
  title: 'Dependency Injection',
  description: 'Master Spring\'s three DI styles — constructor, setter, and field injection — and understand why constructor injection is the only correct choice for production code.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Dependency Injection (DI) is how the IoC container provides dependencies to your beans. Instead of a class creating its own dependencies with "new", Spring injects them. There are three ways: constructor injection (best), setter injection (optional deps), and field injection (@Autowired on a field — avoid this in production code).',
  whatIsIt: `Dependency Injection is the mechanism by which the Spring IoC Container provides a bean\'s dependencies.

**Three injection types:**

**1. Constructor Injection (recommended)**
\`\`\`java
@Service
public class OrderService {
    private final OrderRepository repository; // final — immutable
    
    public OrderService(OrderRepository repository) { // Spring calls this
        this.repository = repository;
    }
}
\`\`\`

**2. Setter Injection (optional dependencies)**
\`\`\`java
@Service
public class NotificationService {
    private EmailService emailService; // optional
    
    @Autowired(required = false)
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }
}
\`\`\`

**3. Field Injection (avoid)**
\`\`\`java
@Service
public class UserService {
    @Autowired // Don't do this — untestable, hides dependencies
    private UserRepository repository;
}
\`\`\``,
  whyWeNeedIt: `DI is what makes Spring applications testable and maintainable:

**Without DI (tight coupling):**
\`\`\`java
public class OrderService {
    private OrderRepository repository = new JpaOrderRepository(); // hardcoded!
    // Can\'t test without a real database
    // Can\'t swap implementations
}
\`\`\`

**With DI (loose coupling):**
\`\`\`java
public class OrderService {
    private final OrderRepository repository; // interface, not implementation
    
    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
    // In tests: inject MockOrderRepository
    // In production: inject JpaOrderRepository
    // Change implementations without touching OrderService
}
\`\`\``,
  realWorldUsage: `In a real enterprise Spring Boot application:
- Every \`@Service\` uses constructor injection to receive its \`@Repository\` dependencies
- Every \`@Controller\` uses constructor injection to receive its \`@Service\` dependencies
- \`@Configuration\` beans inject other beans via constructor or method parameters
- Tests inject mock implementations via constructor — no Spring context needed

The pattern is so consistent that Lombok\'s \`@RequiredArgsConstructor\` is commonly used to auto-generate constructors for all \`final\` fields.`,
  howItWorks: `**Constructor injection resolution:**
1. Spring needs to create \`OrderService\`
2. Reads its constructor: requires \`OrderRepository\`
3. Looks up \`OrderRepository\` bean in the container
4. Creates \`OrderRepository\` first (if not yet created)
5. Calls \`new OrderService(orderRepository)\`
6. \`OrderService\` is ready

**@Autowired is optional for single-constructor classes:**
Since Spring 4.3, if a class has exactly one constructor, Spring automatically uses it for injection — no \`@Autowired\` needed. This is the modern style.

**@Qualifier for disambiguation:**
When multiple beans of the same type exist, use \`@Qualifier("beanName")\` to specify which one.`,
  example: {
    title: 'Dependency Injection Patterns',
    description: 'Constructor injection, qualifiers, and testing with DI.',
    code: [
      {
        label: 'Constructor Injection (Modern Style)',
        language: 'java',
        code: `@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    private final NotificationService notificationService;
    private final AppProperties appProperties;

    // No @Autowired needed — Spring detects single constructor
    public OrderService(
            OrderRepository orderRepository,
            PaymentService paymentService,
            InventoryService inventoryService,
            NotificationService notificationService,
            AppProperties appProperties) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
        this.notificationService = notificationService;
        this.appProperties = appProperties;
    }

    @Transactional
    public Order placeOrder(CreateOrderRequest request) {
        inventoryService.reserve(request.getItems());
        Order order = orderRepository.save(Order.from(request));
        paymentService.charge(order);
        notificationService.sendConfirmation(order);
        return order;
    }
}`,
      },
      {
        label: 'Lombok @RequiredArgsConstructor',
        language: 'java',
        code: `// Lombok generates the constructor for all final fields
@Service
@RequiredArgsConstructor  // Generates constructor for all final fields
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final PriceCalculator priceCalculator;
    private final CacheManager cacheManager;

    // Equivalent to writing the constructor manually
    // Lombok generates:
    // public ProductService(ProductRepository productRepository,
    //         CategoryRepository categoryRepository, ...) { ... }

    public ProductDto getProduct(Long id) {
        return productRepository.findById(id)
            .map(priceCalculator::applyPricing)
            .map(ProductDto::from)
            .orElseThrow(() -> new ProductNotFoundException(id));
    }
}`,
      },
      {
        label: '@Qualifier and @Primary',
        language: 'java',
        code: `// Multiple implementations of the same interface
public interface NotificationService {
    void send(String userId, String message);
}

@Service("emailNotification")
public class EmailNotificationService implements NotificationService { ... }

@Service("smsNotification")
public class SmsNotificationService implements NotificationService { ... }

@Service("pushNotification")
@Primary  // Default when no @Qualifier specified
public class PushNotificationService implements NotificationService { ... }

// Injection:
@Service
public class AlertService {

    private final NotificationService defaultNotification;  // gets @Primary (push)
    private final NotificationService emailNotification;
    private final NotificationService smsNotification;

    public AlertService(
            NotificationService defaultNotification,  // @Primary injected
            @Qualifier("emailNotification") NotificationService emailNotification,
            @Qualifier("smsNotification") NotificationService smsNotification) {
        this.defaultNotification = defaultNotification;
        this.emailNotification = emailNotification;
        this.smsNotification = smsNotification;
    }
}`,
      },
      {
        label: 'Unit Testing with DI',
        language: 'java',
        code: `// No Spring context needed — just pass mocks to the constructor
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private PaymentService paymentService;

    @Mock
    private InventoryService inventoryService;

    @Mock
    private NotificationService notificationService;

    @InjectMocks  // Calls constructor with mocks
    private OrderService orderService;

    @Test
    void placeOrder_success() {
        // Given
        CreateOrderRequest request = new CreateOrderRequest(...);
        Order savedOrder = Order.from(request);
        when(orderRepository.save(any())).thenReturn(savedOrder);

        // When
        Order result = orderService.placeOrder(request);

        // Then
        assertThat(result).isNotNull();
        verify(paymentService).charge(savedOrder);
        verify(notificationService).sendConfirmation(savedOrder);
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why is field injection (@Autowired on fields) bad?',
      answer: 'Three reasons: (1) You can\'t write unit tests without starting a Spring context — there\'s no way to inject mocks via constructor. (2) Dependencies are hidden — you can\'t see what a class needs without reading its internals. (3) You can\'t make fields final, so dependencies could theoretically change. Constructor injection solves all three.',
    },
    {
      question: 'Do I need @Autowired on my constructor?',
      answer: 'Not since Spring 4.3. If your class has exactly one constructor, Spring uses it automatically. @Autowired is only needed if you have multiple constructors and want Spring to use a specific one. Modern code omits @Autowired entirely.',
    },
    {
      question: 'What is the difference between @Autowired, @Inject, and @Resource?',
      answer: '@Autowired is Spring-specific (type-based matching). @Inject is JSR-330 standard (same as @Autowired). @Resource is JSR-250 (name-based matching by default). In Spring Boot projects, use @Autowired or (better) no annotation with constructor injection. @Inject and @Resource are for portability that\'s rarely needed.',
    },
  ],
  productionIssues: [
    'Field injection making unit tests require full Spring context — migrate to constructor injection',
    'Circular dependency via constructor injection — refactor the design; circular deps indicate poor separation of concerns',
    'Too many constructor parameters (>5) — sign the class has too many responsibilities, split it',
    '@Autowired not working because the class is created with "new" instead of by Spring',
    'Optional dependency not handled — use Optional<T> or @Autowired(required=false) with null check',
  ],
  bestPractices: [
    'Always use constructor injection — never field injection',
    'Make injected fields final — prevents accidental reassignment',
    'Use Lombok @RequiredArgsConstructor to reduce boilerplate',
    'Program to interfaces, not implementations — inject UserRepository, not JpaUserRepository',
    'If a class has more than 4-5 injected dependencies, it\'s doing too much — split it',
    'Use @Primary for the default implementation, @Qualifier for specific ones',
  ],
  architectNote: `Constructor injection is not just a style preference — it\'s an architectural constraint that forces good design. When a class has 8 constructor parameters, it\'s immediately obvious it violates the Single Responsibility Principle. Field injection hides this problem. Teams that enforce constructor injection naturally write smaller, more focused classes. This is why senior engineers insist on it.`,
  faqs: [
    {
      question: 'Can I inject a List of all beans implementing an interface?',
      answer: 'Yes — inject List<NotificationService> and Spring injects all beans implementing that interface. Similarly, inject Map<String, NotificationService> to get a map of bean name to bean. This is the Strategy pattern with Spring — very powerful for plugin-style architectures.',
    },
    {
      question: 'What is ObjectProvider<T>?',
      answer: 'ObjectProvider<T> is Spring\'s lazy and optional injection mechanism. It\'s injected like any bean but doesn\'t throw an exception if the bean doesn\'t exist. Use getIfAvailable() for optional deps, getObject() to get the bean (throws if absent), or stream() to iterate all matching beans. Better than @Autowired(required=false) for optional dependencies.',
    },
  ],
  keyTakeaways: [
    'Constructor injection is the correct approach — makes dependencies explicit and testable',
    'Field injection (@Autowired on fields) should never be used in production code',
    '@Autowired is optional since Spring 4.3 for single-constructor classes',
    'Use @Primary for default beans, @Qualifier for specific ones when multiple exist',
    'Inject List<T> to get all beans of a type — enables Strategy pattern',
    'Too many constructor parameters is a code smell — split the class',
  ],
  relatedTopics: ['spring-ioc', 'spring-bean-lifecycle', 'spring-bean-scopes', 'spring-unit-testing'],
};
