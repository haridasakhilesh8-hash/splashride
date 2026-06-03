import type { TopicContent } from '../../types';

export const springControllers: TopicContent = {
  slug: 'spring-controllers',
  title: 'Controllers',
  description: 'Master Spring MVC Controllers — the web layer that handles HTTP requests, maps URLs to methods, and returns responses in enterprise REST APIs.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring MVC 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: '@RestController is a @Controller + @ResponseBody combined. It handles HTTP requests, calls your service layer, and returns JSON automatically. Every public method in a @RestController is a potential HTTP endpoint. The controller\'s only job is to handle HTTP — no business logic, no database calls.',
  whatIsIt: `Spring MVC controllers are the entry point for HTTP requests in your application.

**Two controller types:**

**@RestController** (REST APIs)
- Combines @Controller + @ResponseBody
- Every method return value is serialized to JSON/XML automatically
- Used for REST APIs returning data

**@Controller** (MVC with view templates)
- Returns view names (Thymeleaf, JSP templates)
- Use @ResponseBody on specific methods to return data
- Less common in microservices

**Key annotations:**
- \`@RequestMapping\` — maps URL paths to a class or method
- \`@GetMapping\`, \`@PostMapping\`, \`@PutMapping\`, \`@DeleteMapping\`, \`@PatchMapping\` — HTTP method shortcuts
- \`@PathVariable\` — extract values from URL path
- \`@RequestParam\` — extract query parameters
- \`@RequestBody\` — deserialize request body to Java object
- \`@ResponseStatus\` — set the HTTP response status code`,
  whyWeNeedIt: `Controllers provide a clean separation between the HTTP layer and business logic:
- HTTP concerns (status codes, headers, URL mapping) stay in controllers
- Business logic stays in services
- Data access stays in repositories

This layered architecture makes each layer independently testable and maintainable.`,
  realWorldUsage: `In a production microservice, controllers are thin — they:
1. Validate the request (via @Valid)
2. Call the service layer
3. Map the result to a DTO
4. Return with the correct HTTP status

They never contain business logic, SQL queries, or complex conditionals.`,
  howItWorks: `**Request flow:**
1. HTTP request arrives at embedded Tomcat
2. DispatcherServlet receives all requests (Front Controller pattern)
3. HandlerMapping finds the @RequestMapping method
4. Argument resolvers populate method parameters (@PathVariable, @RequestBody, etc.)
5. Method executes
6. Return value processed by HttpMessageConverter (Jackson serializes to JSON)
7. Response sent

**Content negotiation:**
Spring automatically serializes return values to JSON using Jackson. Add \`produces = MediaType.APPLICATION_JSON_VALUE\` to be explicit.`,
  example: {
    title: 'Production-Ready REST Controller',
    description: 'A complete controller following enterprise best practices.',
    code: [
      {
        label: 'OrderController',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<OrderSummaryDto>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) OrderStatus status,
            @AuthenticationPrincipal UserDetails currentUser) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<OrderSummaryDto> orders = orderService.findOrders(currentUser.getUsername(), status, pageable);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailDto> getOrder(
            @PathVariable Long orderId,
            @AuthenticationPrincipal UserDetails currentUser) {

        OrderDetailDto order = orderService.findById(orderId, currentUser.getUsername());
        return ResponseEntity.ok(order);
    }

    @PostMapping
    public ResponseEntity<OrderDetailDto> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            @AuthenticationPrincipal UserDetails currentUser,
            UriComponentsBuilder uriBuilder) {

        OrderDetailDto created = orderService.createOrder(request, currentUser.getUsername());

        URI location = uriBuilder
            .path("/api/v1/orders/{id}")
            .buildAndExpand(created.getId())
            .toUri();

        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderDetailDto> cancelOrder(
            @PathVariable Long orderId,
            @Valid @RequestBody CancelOrderRequest request,
            @AuthenticationPrincipal UserDetails currentUser) {

        OrderDetailDto cancelled = orderService.cancelOrder(orderId, request, currentUser.getUsername());
        return ResponseEntity.ok(cancelled);
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(
            @PathVariable Long orderId,
            @AuthenticationPrincipal UserDetails currentUser) {

        orderService.deleteOrder(orderId, currentUser.getUsername());
    }
}`,
      },
      {
        label: 'Request/Response DTOs',
        language: 'java',
        code: `// Request DTO with validation
public record CreateOrderRequest(
    @NotNull Long customerId,
    @NotEmpty List<@Valid OrderItemRequest> items,
    @NotBlank String shippingAddress,
    String notes
) {}

public record OrderItemRequest(
    @NotNull Long productId,
    @Positive int quantity
) {}

// Response DTO — never expose entities directly
public record OrderDetailDto(
    Long id,
    String orderNumber,
    OrderStatus status,
    List<OrderItemDto> items,
    BigDecimal totalAmount,
    String shippingAddress,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    // Factory method from entity
    public static OrderDetailDto from(Order order) {
        return new OrderDetailDto(
            order.getId(),
            order.getOrderNumber(),
            order.getStatus(),
            order.getItems().stream().map(OrderItemDto::from).toList(),
            order.getTotalAmount(),
            order.getShippingAddress(),
            order.getCreatedAt(),
            order.getUpdatedAt()
        );
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should controllers contain business logic?',
      answer: 'Never. Controllers handle HTTP — they map URLs, parse requests, and format responses. Business logic belongs in @Service classes. If your controller has if/else logic beyond HTTP concerns, extract it to a service. This separation makes both layers independently testable.',
    },
    {
      question: '@Controller vs @RestController — which to use?',
      answer: 'For REST APIs returning JSON: always @RestController. For server-side rendered HTML (Thymeleaf): use @Controller and return view names. @RestController = @Controller + @ResponseBody on every method. In microservices, you almost always use @RestController.',
    },
    {
      question: 'Should I return ResponseEntity or just the object?',
      answer: 'Return ResponseEntity when you need to control the HTTP status code or headers (e.g., 201 Created with Location header for POST). Return the object directly when 200 OK is always correct. Mixing both in one controller is fine. ResponseEntity is more explicit but more verbose.',
    },
  ],
  productionIssues: [
    'Returning entities directly from controllers — exposes internal model, causes infinite recursion with bidirectional JPA relationships',
    'No @Valid on @RequestBody — invalid requests reach the service layer causing unexpected errors',
    'Controller doing database queries directly — bypasses service layer, transaction management, and caching',
    'Returning 200 OK for all responses including errors — clients can\'t distinguish success from failure',
    'No pagination on list endpoints — returns millions of records and crashes the service',
  ],
  bestPractices: [
    'Controllers should be thin — validate, delegate to service, map to DTO, return',
    'Always use DTOs — never return JPA entities directly from controllers',
    'Use @Valid on @RequestBody to trigger validation before the method runs',
    'Return ResponseEntity<Void> with 204 No Content for DELETE operations',
    'Use 201 Created with Location header for POST operations that create resources',
    'Version your APIs with /api/v1/ prefix from day one',
  ],
  architectNote: `The controller layer is the boundary between the HTTP world and your domain. Keep it thin. I\'ve seen controllers with 500 lines of business logic — they\'re impossible to test and maintain. The controller\'s responsibility is translation: HTTP request → domain command, domain result → HTTP response. Everything else belongs in the service layer.`,
  faqs: [
    {
      question: 'How do I handle file uploads in a controller?',
      answer: 'Use @RequestParam MultipartFile file for single file upload, or List<MultipartFile> for multiple. Set spring.servlet.multipart.max-file-size and max-request-size in properties. For large files, use streaming with HttpServletRequest to avoid loading everything into memory.',
    },
    {
      question: 'How do I return a file download from a controller?',
      answer: 'Return ResponseEntity<Resource> with Content-Disposition header: ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"file.pdf\"").contentType(MediaType.APPLICATION_PDF).body(resource). Use InputStreamResource or ByteArrayResource as the body.',
    },
  ],
  keyTakeaways: [
    '@RestController = @Controller + @ResponseBody — returns JSON automatically',
    'Controllers are thin — HTTP handling only, no business logic',
    'Always use DTOs, never return JPA entities from controllers',
    '@Valid on @RequestBody triggers Bean Validation before the method runs',
    'Use ResponseEntity for full control over status codes and headers',
    'Version your APIs from day one: /api/v1/',
  ],
  relatedTopics: ['spring-request-mapping', 'spring-request-params', 'spring-path-variables', 'spring-exception-handling'],
};
