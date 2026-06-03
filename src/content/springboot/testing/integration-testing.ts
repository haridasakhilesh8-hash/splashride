import type { TopicContent } from '../../types';

export const springIntegrationTesting: TopicContent = {
  slug: 'spring-integration-testing',
  title: 'Integration Testing',
  description: 'Write Spring Boot integration tests with @SpringBootTest, Testcontainers, and @DataJpaTest — testing real component interactions with actual databases.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Testcontainers 1.19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: '@SpringBootTest starts the full Spring ApplicationContext for realistic integration tests. Use @DataJpaTest for repository-only tests with an in-memory database. Use Testcontainers to run real PostgreSQL/MySQL in Docker during tests. Integration tests are slower than unit tests but test real interactions between layers.',
  whatIsIt: `Integration tests verify that multiple components work together correctly.

**Spring Boot test slices:**
- \`@SpringBootTest\` — full application context (all beans)
- \`@WebMvcTest\` — web layer only (controllers, filters)
- \`@DataJpaTest\` — JPA layer only (repositories, entities)
- \`@DataRedisTest\` — Redis layer only
- \`@RestClientTest\` — REST client testing

**Test support:**
- \`@MockBean\` — replace a bean with a Mockito mock in the context
- \`@SpyBean\` — wrap a real bean with a Mockito spy
- \`@Sql\` — execute SQL before/after tests
- \`@Transactional\` on test class — rolls back after each test
- \`Testcontainers\` — real databases in Docker`,
  whyWeNeedIt: `Unit tests can\'t catch integration bugs:
- Wrong SQL query in @Query annotation
- Transaction propagation issues
- Security configuration blocking valid requests
- Entity mapping problems
- Auto-configuration conflicts

Integration tests catch these by running real components together.`,
  realWorldUsage: `Integration test strategy:
- Repository tests with @DataJpaTest + H2 or Testcontainers
- Controller tests with @WebMvcTest + @MockBean for services
- Full flow tests with @SpringBootTest for critical paths
- Security tests verifying authentication and authorization`,
  howItWorks: `@SpringBootTest creates an ApplicationContext with all beans. @DataJpaTest creates a minimal context with only JPA-related beans and an embedded database. Test slices are much faster than full @SpringBootTest because they load fewer beans.`,
  example: {
    title: 'Integration Testing Patterns',
    description: '@DataJpaTest, @WebMvcTest, and Testcontainers.',
    code: [
      {
        label: '@DataJpaTest with Testcontainers',
        language: 'java',
        code: `@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Testcontainers
class OrderRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void findByCustomerIdAndStatus_returnsMatchingOrders() {
        // Given — persist test data
        Order order1 = entityManager.persist(Order.builder()
            .customerId(1L)
            .status(OrderStatus.PENDING)
            .orderNumber("ORD-001")
            .totalAmount(BigDecimal.TEN)
            .build());
        entityManager.persist(Order.builder()
            .customerId(1L)
            .status(OrderStatus.DELIVERED)
            .orderNumber("ORD-002")
            .totalAmount(BigDecimal.ONE)
            .build());
        entityManager.flush();

        // When
        List<Order> result = orderRepository
            .findByCustomerIdAndStatus(1L, OrderStatus.PENDING);

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getOrderNumber()).isEqualTo("ORD-001");
    }
}`,
      },
      {
        label: '@WebMvcTest for Controller Layer',
        language: 'java',
        code: `@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean  // Replaces OrderService bean in context
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "user@example.com", roles = "USER")
    void getOrder_exists_returns200() throws Exception {
        // Given
        OrderDetailDto dto = OrderDetailDto.builder()
            .id(1L)
            .orderNumber("ORD-001")
            .status(OrderStatus.PENDING)
            .build();
        when(orderService.findById(1L, "user@example.com")).thenReturn(dto);

        // When + Then
        mockMvc.perform(get("/api/v1/orders/1")
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.orderNumber").value("ORD-001"))
            .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    @WithMockUser
    void createOrder_invalidRequest_returns400() throws Exception {
        // Empty items list — should fail @Valid
        CreateOrderRequest request = new CreateOrderRequest(null, List.of(), "");

        mockMvc.perform(post("/api/v1/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errorCode").value("VALIDATION_FAILED"));
    }

    @Test
    void getOrder_unauthenticated_returns401() throws Exception {
        mockMvc.perform(get("/api/v1/orders/1"))
            .andExpect(status().isUnauthorized());
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use @SpringBootTest vs @WebMvcTest?',
      answer: '@WebMvcTest is faster — it only loads the web layer (controllers, filters, security). Use it for controller tests. @SpringBootTest loads everything — use it for full integration tests that need the complete application context (e.g., testing a full request flow through controller → service → repository).',
    },
    {
      question: 'Should I use H2 or Testcontainers for database tests?',
      answer: 'Testcontainers with the real database (PostgreSQL, MySQL). H2 is a different database — it doesn\'t support all PostgreSQL features (JSONB, window functions, specific constraints). Tests that pass with H2 can fail with real PostgreSQL. Testcontainers adds startup time but gives you confidence that tests reflect production behavior.',
    },
  ],
  productionIssues: [
    '@SpringBootTest used for all tests — makes the test suite take minutes instead of seconds',
    'Tests sharing state via @Autowired repositories without @Transactional rollback',
    'Testcontainers starting a new container per test class — use static containers for reuse',
  ],
  bestPractices: [
    'Use test slices (@WebMvcTest, @DataJpaTest) instead of @SpringBootTest when possible',
    'Use Testcontainers for repository tests — test against the real database',
    'Add @Transactional to test classes to auto-rollback after each test',
    'Use @Sql to set up test data declaratively',
    'Share Testcontainers instances across test classes with static containers',
  ],
  architectNote: `The test suite performance matters. A suite that takes 30 minutes to run means developers avoid running it. Target: unit tests < 30 seconds, integration tests < 5 minutes. Use test slices aggressively. Share Testcontainers instances with the Singleton pattern (static container + @DynamicPropertySource). Spring Boot 3.2+ supports Testcontainers auto-configuration — define containers in application.properties.`,
  faqs: [
    {
      question: 'How do I speed up @SpringBootTest?',
      answer: 'Use @SpringBootTest only when necessary. Use context caching — Spring caches the ApplicationContext between tests with the same configuration. Don\'t use @DirtiesContext unless necessary — it forces context recreation. Use @MockBean sparingly — each unique @MockBean combination creates a new context.',
    },
  ],
  keyTakeaways: [
    '@SpringBootTest loads full context; test slices load only what\'s needed',
    '@WebMvcTest for controller tests; @DataJpaTest for repository tests',
    'Testcontainers provides real database instances for integration tests',
    '@MockBean replaces a bean in the Spring context with a Mockito mock',
    '@Transactional on test class auto-rolls back after each test',
    'Prefer test slices over @SpringBootTest for faster test execution',
  ],
  relatedTopics: ['spring-unit-testing', 'spring-mockmvc', 'spring-data-jpa'],
};
