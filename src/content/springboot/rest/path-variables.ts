import type { TopicContent } from '../../types';

export const springPathVariables: TopicContent = {
  slug: 'spring-path-variables',
  title: 'Path Variables',
  description: 'Master @PathVariable in Spring MVC — how to extract values from URL path segments to identify resources in RESTful APIs.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: '@PathVariable extracts values from the URL path. If your mapping is /users/{id}, then @PathVariable Long id extracts the ID from the URL. GET /users/42 gives you id=42. Path variables identify specific resources — they\'re part of the URL structure, not query parameters.',
  whatIsIt: `@PathVariable binds a URI template variable to a method parameter.

**Syntax:**
- Define a template variable: \`@GetMapping("/users/{id}")\`
- Bind it: \`@PathVariable Long id\`
- Or with explicit name: \`@PathVariable("id") Long userId\`

**Supported types:**
- \`String\`, \`int\`, \`long\`, \`Integer\`, \`Long\`
- \`UUID\`, \`LocalDate\`
- Any type with a String constructor or registered converter

**Multiple path variables:**
\`\`\`java
@GetMapping("/users/{userId}/orders/{orderId}")
public OrderDto getOrder(
    @PathVariable Long userId,
    @PathVariable Long orderId) { ... }
\`\`\``,
  whyWeNeedIt: `RESTful API design uses URL paths to identify resources. /users/42 is cleaner and more semantic than /users?id=42. Path variables make resource identification explicit in the URL structure, which is the REST convention.`,
  realWorldUsage: `Every CRUD API uses path variables for resource identification:
- \`GET /api/v1/orders/{orderId}\` — get specific order
- \`PUT /api/v1/users/{userId}/roles/{roleId}\` — assign role to user
- \`DELETE /api/v1/products/{productId}\` — delete product
- \`GET /api/v1/categories/{categorySlug}/products\` — products in category`,
  howItWorks: `Spring\'s URI template matching extracts the value between the curly braces from the actual request URL and makes it available as a method parameter. The conversion from String to the target type (Long, UUID, etc.) is handled by Spring\'s ConversionService.`,
  example: {
    title: 'Path Variables in Practice',
    description: 'Single, multiple, and optional path variables.',
    code: [
      {
        label: 'Standard Usage',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1")
public class UserController {

    // GET /api/v1/users/42
    @GetMapping("/users/{id}")
    public UserDto getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    // GET /api/v1/users/42/orders/7
    @GetMapping("/users/{userId}/orders/{orderId}")
    public OrderDto getUserOrder(
            @PathVariable Long userId,
            @PathVariable Long orderId) {
        return orderService.findByUserAndId(userId, orderId);
    }

    // GET /api/v1/products/laptop-pro-2024 (slug-based)
    @GetMapping("/products/{slug}")
    public ProductDto getProductBySlug(@PathVariable String slug) {
        return productService.findBySlug(slug);
    }

    // GET /api/v1/files/reports/2024/annual-report.pdf
    @GetMapping("/files/**")
    public ResponseEntity<Resource> getFile(HttpServletRequest request) {
        String path = request.getRequestURI().split("/files/")[1];
        return fileService.getFile(path);
    }
}`,
      },
      {
        label: 'UUID Path Variables',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/sessions")
public class SessionController {

    // GET /api/v1/sessions/550e8400-e29b-41d4-a716-446655440000
    @GetMapping("/{sessionId}")
    public SessionDto getSession(@PathVariable UUID sessionId) {
        // Spring auto-converts the UUID string to UUID type
        return sessionService.findById(sessionId);
    }

    @DeleteMapping("/{sessionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void invalidateSession(
            @PathVariable UUID sessionId,
            @AuthenticationPrincipal UserDetails user) {
        sessionService.invalidate(sessionId, user.getUsername());
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What if the path variable doesn\'t match the method parameter name?',
      answer: 'Use @PathVariable("urlVariableName") Type methodParamName. Example: @GetMapping("/users/{user_id}") with @PathVariable("user_id") Long userId. The names must match when you omit the annotation value — Spring uses the parameter name by default.',
    },
    {
      question: 'Can path variables be optional?',
      answer: 'Yes, with required=false: @PathVariable(required=false) Long id. But this requires two mappings: one with the variable and one without. Better approach: use two separate methods with different @GetMapping paths, or use @RequestParam for optional identifiers.',
    },
  ],
  productionIssues: [
    'Path variable not validated — a negative or zero ID reaching the database; add @Positive validation',
    'String path variable containing SQL injection attempts — never use path variables directly in SQL strings',
    'UUID path variable causing 400 errors for invalid UUID format — handle MethodArgumentTypeMismatchException',
  ],
  bestPractices: [
    'Use Long or UUID for IDs — not String (prevents type mismatch errors reaching your service)',
    'Validate path variable values: @PathVariable @Positive Long id',
    'Handle MethodArgumentTypeMismatchException in your global exception handler',
    'Use semantic slugs for public-facing APIs (/products/iphone-15-pro) instead of numeric IDs',
  ],
  architectNote: `For public-facing APIs, consider using UUIDs or slugs instead of sequential integer IDs. Sequential IDs expose your data volume (order #1 vs order #1,000,000) and can be enumerated by attackers. UUIDs prevent enumeration attacks. Slugs (/products/iphone-15-pro) are SEO-friendly and human-readable.`,
  faqs: [
    {
      question: 'How do I handle a path variable that contains slashes?',
      answer: 'Use a wildcard mapping: @GetMapping("/files/{*path}") — the {*path} captures everything including slashes. Or use @GetMapping("/files/**") and extract the path from HttpServletRequest. Spring Boot 3.x uses PathPatternParser which handles this more reliably.',
    },
  ],
  keyTakeaways: [
    '@PathVariable extracts values from URL path segments: /users/{id}',
    'Spring auto-converts path variables to Long, UUID, enum, etc.',
    'Path variables identify resources; query params filter/modify retrieval',
    'Use @PathVariable("name") when parameter name differs from URL template',
    'Validate path variables with @Positive, @NotNull, etc.',
  ],
  relatedTopics: ['spring-controllers', 'spring-request-mapping', 'spring-request-params', 'spring-exception-handling'],
};
