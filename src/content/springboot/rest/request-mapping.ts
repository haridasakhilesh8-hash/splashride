import type { TopicContent } from '../../types';

export const springRequestMapping: TopicContent = {
  slug: 'spring-request-mapping',
  title: 'Request Mapping',
  description: 'Master Spring MVC request mapping — how to map HTTP requests to controller methods using @RequestMapping, @GetMapping, @PostMapping, and the full range of mapping options.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: '@RequestMapping maps a URL pattern to a controller class or method. @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping are shorthand annotations for specific HTTP methods. You put @RequestMapping on the class for the base path, and method-level annotations for specific endpoints.',
  whatIsIt: `Request mapping is how Spring routes HTTP requests to the correct controller method.

**Mapping annotations:**
- \`@RequestMapping(path, method, consumes, produces, headers, params)\` — most flexible
- \`@GetMapping\` — shorthand for @RequestMapping(method=GET)
- \`@PostMapping\` — shorthand for @RequestMapping(method=POST)
- \`@PutMapping\` — shorthand for @RequestMapping(method=PUT)
- \`@DeleteMapping\` — shorthand for @RequestMapping(method=DELETE)
- \`@PatchMapping\` — shorthand for @RequestMapping(method=PATCH)

**Mapping options:**
- **Path**: \`/users\`, \`/users/{id}\`, \`/users/**\`
- **Method**: GET, POST, PUT, DELETE, PATCH
- **Consumes**: \`application/json\`, \`multipart/form-data\`
- **Produces**: \`application/json\`, \`application/xml\`
- **Headers**: require specific request headers
- **Params**: require specific query parameters`,
  whyWeNeedIt: `Request mapping provides the URL routing layer of your application. Without it, there\'s no way to connect an HTTP request to your Java code. The annotation-based approach is far cleaner than XML-based routing configurations used in older frameworks.`,
  realWorldUsage: `Every REST API endpoint is defined by a combination of HTTP method + URL path:
- \`GET /api/v1/users\` — list users
- \`GET /api/v1/users/{id}\` — get user by ID
- \`POST /api/v1/users\` — create user
- \`PUT /api/v1/users/{id}\` — replace user
- \`PATCH /api/v1/users/{id}\` — partial update
- \`DELETE /api/v1/users/{id}\` — delete user`,
  howItWorks: `Spring\'s DispatcherServlet receives every HTTP request. It consults the HandlerMapping (built from your @RequestMapping annotations) to find the matching controller method. If multiple methods match, Spring uses specificity rules to pick the best match. If no match is found, 404 is returned.`,
  example: {
    title: 'Request Mapping Patterns',
    description: 'Common mapping patterns used in enterprise REST APIs.',
    code: [
      {
        label: 'Standard CRUD Mapping',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/products")  // Base path for all methods
public class ProductController {

    @GetMapping                          // GET /api/v1/products
    public Page<ProductDto> list(@RequestParam(defaultValue="0") int page) { ... }

    @GetMapping("/{id}")                 // GET /api/v1/products/42
    public ProductDto getById(@PathVariable Long id) { ... }

    @PostMapping                         // POST /api/v1/products
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto create(@Valid @RequestBody CreateProductRequest req) { ... }

    @PutMapping("/{id}")                 // PUT /api/v1/products/42
    public ProductDto replace(@PathVariable Long id,
                               @Valid @RequestBody UpdateProductRequest req) { ... }

    @PatchMapping("/{id}")
    public ProductDto partialUpdate(@PathVariable Long id,
                                     @RequestBody Map<String, Object> updates) { ... }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { ... }

    // Nested resource: GET /api/v1/products/42/reviews
    @GetMapping("/{id}/reviews")
    public List<ReviewDto> getReviews(@PathVariable Long id) { ... }
}`,
      },
      {
        label: 'Content Negotiation',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    // Only accepts JSON, only produces JSON
    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ReportDto generateJson(@RequestBody ReportRequest request) { ... }

    // Returns PDF
    @GetMapping(value = "/{id}/pdf",
                produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Resource> downloadPdf(@PathVariable Long id) { ... }

    // Returns CSV
    @GetMapping(value = "/{id}/csv",
                produces = "text/csv")
    public ResponseEntity<Resource> downloadCsv(@PathVariable Long id) { ... }

    // Accepts multipart file upload
    @PostMapping(value = "/upload",
                 consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ImportResultDto uploadData(@RequestParam MultipartFile file) { ... }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between @RequestMapping on class vs method?',
      answer: '@RequestMapping on the class defines the base path for all methods in that controller. Method-level annotations add to that base path. @RequestMapping("/api/v1/users") on the class + @GetMapping("/{id}") on a method = GET /api/v1/users/{id}.',
    },
    {
      question: 'When should I use PUT vs PATCH?',
      answer: 'PUT replaces the entire resource — the client sends the complete new state. PATCH partially updates — the client sends only the fields to change. In practice, many APIs use PUT for both. PATCH is more RESTful for partial updates but requires more careful implementation (especially with null vs missing fields).',
    },
  ],
  productionIssues: [
    'Ambiguous mapping exception when two methods match the same URL/method combination',
    'Trailing slash mismatch — /users and /users/ treated differently (configure via PathMatchConfigurer)',
    'Case-sensitive URL matching causing 404s from clients using different casing',
  ],
  bestPractices: [
    'Use specific method annotations (@GetMapping) over generic @RequestMapping',
    'Put the base path on the class, specific paths on methods',
    'Use lowercase, hyphenated URLs: /user-profiles not /userProfiles',
    'Version your APIs: /api/v1/ from the start',
    'Be explicit with produces/consumes for non-JSON endpoints',
  ],
  architectNote: `Consistent URL naming is an API contract. Once published, you can\'t change URLs without breaking clients. Establish naming conventions early: plural nouns for resources (/orders, /products), lowercase with hyphens, versioned from day one (/api/v1/). Use nested paths sparingly — /orders/{id}/items is fine, /orders/{id}/items/{itemId}/reviews is getting deep.`,
  faqs: [
    {
      question: 'How do I map multiple paths to one method?',
      answer: 'Use an array: @GetMapping({"/users", "/members"}) or @RequestMapping(path={"/v1/users", "/v2/users"}). Useful for supporting multiple API versions or aliases.',
    },
    {
      question: 'How does Spring handle trailing slashes?',
      answer: 'In Spring Boot 3.x, trailing slash matching is disabled by default (breaking change from 2.x). /users and /users/ are different. Configure with WebMvcConfigurer.configurePathMatch() if you need trailing slash support, or update your clients.',
    },
  ],
  keyTakeaways: [
    '@GetMapping, @PostMapping, etc. are shorthand for @RequestMapping with a method',
    'Class-level @RequestMapping sets the base path; method annotations add to it',
    'Use consumes/produces for content type constraints',
    'URL naming: lowercase, plural nouns, hyphenated, versioned',
    'Spring Boot 3.x disabled trailing slash matching by default',
  ],
  relatedTopics: ['spring-controllers', 'spring-request-params', 'spring-path-variables', 'spring-exception-handling'],
};
