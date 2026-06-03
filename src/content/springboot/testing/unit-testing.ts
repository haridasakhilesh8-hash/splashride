import type { TopicContent } from '../../types';

export const springUnitTesting: TopicContent = {
  slug: 'spring-unit-testing',
  title: 'Unit Testing',
  description: 'Write effective unit tests for Spring Boot services using JUnit 5, Mockito, and AssertJ — fast, isolated tests that don\'t start a Spring context.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'JUnit 5', 'Mockito 5'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Unit tests test one class in isolation. For Spring Boot services, use Mockito to mock dependencies and inject them via constructor. No @SpringBootTest — that starts the full context and is slow. A unit test should run in milliseconds. Use @ExtendWith(MockitoExtension.class), @Mock for dependencies, @InjectMocks for the class under test.',
  whatIsIt: `Unit testing in Spring Boot means testing individual classes in isolation — no Spring context, no database, no HTTP.

**Key libraries (all in spring-boot-starter-test):**
- **JUnit 5** — test framework (@Test, @BeforeEach, @ParameterizedTest)
- **Mockito** — mock framework (@Mock, @InjectMocks, when/verify)
- **AssertJ** — fluent assertions (assertThat(result).isEqualTo(expected))

**Unit test characteristics:**
- Tests one class (the "unit")
- All dependencies are mocked
- No Spring context, no database
- Runs in < 100ms
- Tests behavior, not implementation`,
  whyWeNeedIt: `Unit tests are the foundation of a test suite:
- **Fast** — run in milliseconds, not seconds
- **Isolated** — failures point directly to the broken class
- **Cheap** — no infrastructure needed
- **Design feedback** — hard-to-test code indicates design problems

Constructor injection makes Spring services naturally unit-testable — just pass mocks to the constructor.`,
  realWorldUsage: `Service layer unit tests are the most valuable:
- Test business logic with various inputs
- Test error conditions and exception throwing
- Test interactions with repositories (verify correct methods called)
- Test edge cases that are hard to reproduce with real data`,
  howItWorks: `Mockito creates proxy objects that implement interfaces or extend classes. When you call a method on a mock, it returns null/0/false by default. Use when(mock.method()).thenReturn(value) to configure behavior. Use verify(mock).method() to assert the method was called.`,
  example: {
    title: 'Unit Testing Spring Services',
    description: 'Testing service logic with Mockito mocks.',
    code: [
      {
        label: 'Service Unit Test',
        language: 'java',
        code: `@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private PaymentService paymentService;

    @Mock
    private InventoryService inventoryService;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private OrderService orderService;

    @Test
    void placeOrder_success_returnsCreatedOrder() {
        // Given
        CreateOrderRequest request = new CreateOrderRequest(
            1L, List.of(new OrderItemRequest(10L, 2)), "123 Main St");
        Order savedOrder = Order.builder()
            .id(42L)
            .orderNumber("ORD-001")
            .status(OrderStatus.PENDING)
            .build();

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        // When
        OrderDetailDto result = orderService.placeOrder(request);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(42L);
        assertThat(result.getOrderNumber()).isEqualTo("ORD-001");

        verify(inventoryService).reserve(request.getItems());
        verify(paymentService).charge(savedOrder);
        verify(notificationService).sendConfirmation(savedOrder);
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void placeOrder_paymentFails_rollsBack() {
        // Given
        CreateOrderRequest request = new CreateOrderRequest(1L, List.of(), "123 Main St");
        Order savedOrder = Order.builder().id(1L).build();

        when(orderRepository.save(any())).thenReturn(savedOrder);
        doThrow(new PaymentException("Card declined"))
            .when(paymentService).charge(savedOrder);

        // When + Then
        assertThatThrownBy(() -> orderService.placeOrder(request))
            .isInstanceOf(PaymentException.class)
            .hasMessage("Card declined");

        // Notification should NOT be sent if payment failed
        verify(notificationService, never()).sendConfirmation(any());
    }

    @Test
    void getOrder_notFound_throwsException() {
        // Given
        when(orderRepository.findById(99L)).thenReturn(Optional.empty());

        // When + Then
        assertThatThrownBy(() -> orderService.findById(99L, "user@example.com"))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("99");
    }

    // Parameterized test for multiple inputs
    @ParameterizedTest
    @ValueSource(strings = {"CANCELLED", "DELIVERED", "REFUNDED"})
    void cancelOrder_invalidStatus_throwsException(String status) {
        Order order = Order.builder()
            .id(1L)
            .status(OrderStatus.valueOf(status))
            .build();
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        assertThatThrownBy(() -> orderService.cancelOrder(1L, new CancelOrderRequest(), "user"))
            .isInstanceOf(BusinessException.class);
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: '@InjectMocks vs @Autowired — which to use in tests?',
      answer: '@InjectMocks is Mockito\'s annotation — it creates the class under test and injects @Mock fields into it. Use it for unit tests (no Spring context). @Autowired is Spring\'s annotation — use it in integration tests where Spring creates and wires beans. Never use @Autowired in pure unit tests.',
    },
    {
      question: 'When should I use @Mock vs @MockBean?',
      answer: '@Mock is Mockito — creates a mock without Spring. Use in unit tests with @ExtendWith(MockitoExtension.class). @MockBean is Spring Boot — creates a mock AND registers it in the Spring ApplicationContext. Use in integration tests with @SpringBootTest or @WebMvcTest. @MockBean is much slower because it requires a Spring context.',
    },
  ],
  productionIssues: [
    'Tests using @SpringBootTest when they should be unit tests — 10x slower startup for no benefit',
    'Tests not isolated — shared state between tests causing flaky failures',
    'Mocking too much — if you mock everything, you\'re not testing anything',
    'Not testing error cases — happy path only leads to production surprises',
  ],
  bestPractices: [
    'Use @ExtendWith(MockitoExtension.class) for unit tests — no Spring context',
    'Follow Given-When-Then structure for readable tests',
    'Test one behavior per test method',
    'Test error cases as thoroughly as happy paths',
    'Use @ParameterizedTest for testing multiple inputs',
    'Aim for 80%+ coverage on the service layer',
  ],
  architectNote: `The testing pyramid: many unit tests (fast, cheap), fewer integration tests (slower, more realistic), few E2E tests (slowest, most realistic). Unit tests give you fast feedback during development. If your unit tests are slow, you\'re probably starting a Spring context — that\'s an integration test, not a unit test. Keep unit tests pure: no Spring, no database, no network.`,
  faqs: [
    {
      question: 'How do I test a method that calls LocalDateTime.now()?',
      answer: 'Inject a Clock bean and use Clock.fixed() in tests. Or use @MockBean to mock the service that uses time. Avoid static calls to LocalDateTime.now() in business logic — they\'re untestable. Pass a Clock to the class via constructor injection.',
    },
    {
      question: 'How do I test void methods?',
      answer: 'Use verify() to assert interactions: verify(mockRepository).save(expectedEntity). Use doThrow() to test exception handling: doThrow(new RuntimeException()).when(mock).method(). Use ArgumentCaptor to capture and assert what was passed to the mock.',
    },
  ],
  keyTakeaways: [
    '@ExtendWith(MockitoExtension.class) + @Mock + @InjectMocks for unit tests',
    'No Spring context in unit tests — they should run in milliseconds',
    'Given-When-Then structure makes tests readable',
    'Test both success and failure cases',
    '@Mock is Mockito (no Spring); @MockBean is Spring Boot (requires context)',
    'Constructor injection makes services naturally unit-testable',
  ],
  relatedTopics: ['spring-integration-testing', 'spring-mockmvc', 'spring-di'],
};
