import type { TopicContent } from '../../types';

export const springMockMvc: TopicContent = {
  slug: 'spring-mockmvc',
  title: 'MockMvc',
  description: 'Test Spring MVC controllers with MockMvc — the fluent API for testing HTTP request handling, response status, JSON content, and security without starting a real server.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'MockMvc lets you test your controllers by simulating HTTP requests without starting a real server. You perform a GET/POST/etc., assert the response status, headers, and JSON body. It\'s faster than a real server and gives you precise control over the test environment. Use it with @WebMvcTest for controller-focused tests.',
  whatIsIt: `MockMvc is Spring MVC Test\'s fluent API for testing controllers.

**Key methods:**
- \`mockMvc.perform(get("/url"))\` — execute a request
- \`.andExpect(status().isOk())\` — assert response status
- \`.andExpect(jsonPath("$.field").value("expected"))\` — assert JSON
- \`.andExpect(content().contentType(MediaType.APPLICATION_JSON))\`
- \`.andReturn()\` — get the MvcResult for further assertions
- \`.andDo(print())\` — print request/response for debugging`,
  whyWeNeedIt: `MockMvc tests the full controller pipeline — argument resolvers, validation, exception handlers, security filters — without starting a real HTTP server. It\'s faster than RestTemplate/WebTestClient against a running server and gives you precise assertions on the response.`,
  realWorldUsage: `Used for:
- Testing all HTTP endpoints
- Verifying request validation (400 for invalid input)
- Testing security (401/403 for unauthorized requests)
- Testing error responses (404, 409, 500)
- Testing pagination and filtering`,
  howItWorks: `MockMvc dispatches requests directly to the DispatcherServlet without going through the network stack. The full filter chain, handler mapping, argument resolvers, and message converters all run — just without a real TCP connection.`,
  example: {
    title: 'MockMvc in Practice',
    description: 'Complete controller testing with MockMvc.',
    code: [
      {
        label: 'MockMvc Test Suite',
        language: 'java',
        code: `@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void getProducts_returnsPagedResults() throws Exception {
        Page<ProductDto> page = new PageImpl<>(
            List.of(new ProductDto(1L, "Laptop", BigDecimal.valueOf(999.99))),
            PageRequest.of(0, 20),
            1
        );
        when(productService.findAll(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/v1/products")
                .param("page", "0")
                .param("size", "20")
                .contentType(MediaType.APPLICATION_JSON))
            .andDo(print())  // helpful for debugging
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.content").isArray())
            .andExpect(jsonPath("$.content[0].id").value(1))
            .andExpect(jsonPath("$.content[0].name").value("Laptop"))
            .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    @WithMockUser
    void createProduct_validRequest_returns201WithLocation() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
            "Laptop Pro", BigDecimal.valueOf(1299.99), "ELECTRONICS");
        ProductDto created = new ProductDto(42L, "Laptop Pro", BigDecimal.valueOf(1299.99));
        when(productService.create(any())).thenReturn(created);

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", containsString("/api/v1/products/42")))
            .andExpect(jsonPath("$.id").value(42));
    }

    @Test
    @WithMockUser
    void createProduct_missingName_returns400WithValidationError() throws Exception {
        CreateProductRequest request = new CreateProductRequest(
            "", BigDecimal.valueOf(100), "ELECTRONICS"); // blank name

        mockMvc.perform(post("/api/v1/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errorCode").value("VALIDATION_FAILED"))
            .andExpect(jsonPath("$.fieldErrors[0].field").value("name"));
    }

    @Test
    void getProducts_unauthenticated_returns401() throws Exception {
        mockMvc.perform(get("/api/v1/products"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "USER")  // Not ADMIN
    void deleteProduct_notAdmin_returns403() throws Exception {
        mockMvc.perform(delete("/api/v1/products/1"))
            .andExpect(status().isForbidden());
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'MockMvc vs WebTestClient — which should I use?',
      answer: 'MockMvc is for servlet-based apps (spring-boot-starter-web). WebTestClient is for reactive apps (spring-boot-starter-webflux) but also works with MockMvc via MockMvcWebTestClient. MockMvc has a more mature API for servlet testing. WebTestClient has a cleaner fluent API. For new Spring Boot 3.x projects, either works.',
    },
    {
      question: 'Do I need to start a real server for MockMvc tests?',
      answer: 'No. MockMvc dispatches directly to the DispatcherServlet without a network connection. @WebMvcTest never starts a real server. If you use @SpringBootTest(webEnvironment=RANDOM_PORT), a real server starts and you need RestTemplate or WebTestClient to call it.',
    },
  ],
  productionIssues: [
    'jsonPath assertions failing due to unexpected JSON structure — use andDo(print()) to inspect the actual response',
    'Security filters not applied in @WebMvcTest — add @Import(SecurityConfig.class) to include security',
    'ObjectMapper in tests using different config than production — use @Autowired ObjectMapper from context',
  ],
  bestPractices: [
    'Test both success and error cases for every endpoint',
    'Test authentication and authorization explicitly',
    'Use andDo(print()) during development to inspect request/response',
    'Use jsonPath() for JSON assertions — more readable than string comparison',
    'Test validation by sending invalid requests and asserting 400 + field errors',
  ],
  architectNote: `MockMvc tests are the best ROI in your test suite. They test the full controller pipeline including validation, serialization, and error handling — without the overhead of a real server. Write MockMvc tests for every endpoint: happy path, validation failure, authentication failure, authorization failure, and not-found cases. These tests catch the most common API bugs.`,
  faqs: [
    {
      question: 'How do I test file upload with MockMvc?',
      answer: 'Use MockMultipartFile: mockMvc.perform(multipart("/api/upload").file(new MockMultipartFile("file", "test.csv", "text/csv", content))).andExpect(status().isOk())',
    },
  ],
  keyTakeaways: [
    'MockMvc tests the full controller pipeline without a real server',
    'Use with @WebMvcTest for focused controller tests',
    'andExpect(status()), jsonPath(), header() for assertions',
    '@WithMockUser simulates authenticated users in tests',
    'Test authentication (401) and authorization (403) explicitly',
    'andDo(print()) prints request/response for debugging',
  ],
  relatedTopics: ['spring-unit-testing', 'spring-integration-testing', 'spring-exception-handling'],
};
