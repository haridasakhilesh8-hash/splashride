import type { TopicContent } from '../../types';

export const springRequestParams: TopicContent = {
  slug: 'spring-request-params',
  title: 'Request Params',
  description: 'Master @RequestParam in Spring MVC — how to extract query parameters, form data, and optional parameters from HTTP requests.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: '@RequestParam extracts query parameters from the URL (?key=value). For example, GET /products?category=electronics&page=0 — @RequestParam String category and @RequestParam int page extract those values. You can make them optional with required=false or provide defaults with defaultValue.',
  whatIsIt: `@RequestParam binds HTTP request parameters to method arguments.

**Sources it reads from:**
- Query string: \`GET /products?category=electronics\`
- Form data: \`POST\` with \`application/x-www-form-urlencoded\`
- Multipart form: \`POST\` with \`multipart/form-data\`

**Key attributes:**
- \`name\` / \`value\` — parameter name (defaults to method param name)
- \`required\` — default true; false makes it optional
- \`defaultValue\` — used when param is absent

**Supported types:**
- Primitives: \`int\`, \`long\`, \`boolean\`
- Wrappers: \`Integer\`, \`Long\`, \`Boolean\`
- \`String\`, \`Date\`, \`LocalDate\`
- Enums (by name)
- \`List<String>\` for multi-value params
- \`MultiValueMap<String, String>\` for all params`,
  whyWeNeedIt: `Query parameters are the standard way to pass filtering, sorting, and pagination options in REST APIs. @RequestParam provides type-safe binding with automatic conversion, validation, and default values — far better than manually parsing HttpServletRequest.getParameter().`,
  realWorldUsage: `Used in every list/search endpoint:
- \`GET /products?category=electronics&minPrice=100&maxPrice=500&page=0&size=20&sort=price,asc\`
- \`GET /orders?status=PENDING&customerId=123&from=2024-01-01&to=2024-12-31\`
- \`GET /users?search=john&role=ADMIN&active=true\``,
  howItWorks: `Spring\'s argument resolvers read the request parameters and convert them to the declared type using ConversionService. Type conversion is automatic — \`"42"\` becomes \`int 42\`, \`"true"\` becomes \`boolean true\`, \`"ACTIVE"\` becomes the \`Status.ACTIVE\` enum value.`,
  example: {
    title: 'Request Parameters in Practice',
    description: 'Filtering, pagination, and optional parameters.',
    code: [
      {
        label: 'Search and Filter Endpoint',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @GetMapping
    public ResponseEntity<Page<ProductDto>> searchProducts(
            // Required param: GET /products?category=electronics
            @RequestParam String category,

            // Optional with default
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,

            // Optional, null if absent
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,

            // Enum binding: ?status=ACTIVE
            @RequestParam(required = false) ProductStatus status,

            // Date binding: ?from=2024-01-01
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,

            // Multi-value: ?tag=spring&tag=java
            @RequestParam(required = false) List<String> tags,

            // Sort: ?sort=price,asc
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        ProductSearchCriteria criteria = ProductSearchCriteria.builder()
            .category(category)
            .minPrice(minPrice)
            .maxPrice(maxPrice)
            .status(status)
            .from(from)
            .tags(tags)
            .build();

        return ResponseEntity.ok(productService.search(criteria, pageable));
    }
}`,
      },
      {
        label: 'Using @RequestParam with Map',
        language: 'java',
        code: `// Capture all query params dynamically
@GetMapping("/search")
public List<ProductDto> dynamicSearch(
        @RequestParam Map<String, String> allParams) {
    // allParams contains all query parameters
    // Useful for dynamic filtering where params aren't known in advance
    return productService.dynamicSearch(allParams);
}

// Multi-value map (param can appear multiple times)
@GetMapping("/filter")
public List<ProductDto> filter(
        @RequestParam MultiValueMap<String, String> params) {
    List<String> categories = params.get("category"); // ["electronics", "phones"]
    return productService.filter(params);
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: '@RequestParam vs @PathVariable — when to use which?',
      answer: '@PathVariable is for resource identifiers in the URL path: /users/{id}. @RequestParam is for optional filtering, sorting, pagination in the query string: /users?role=ADMIN&page=0. Rule of thumb: if it identifies a resource, use path variable. If it modifies how you retrieve/filter a resource, use request param.',
    },
    {
      question: 'What happens if a required @RequestParam is missing?',
      answer: 'Spring throws MissingServletRequestParameterException, which results in a 400 Bad Request. This is the correct behavior. Make params optional with required=false or provide defaultValue when absence is valid.',
    },
  ],
  productionIssues: [
    'No pagination on list endpoints — add @RequestParam page/size with defaults and enforce max page size',
    'Integer overflow from large page param values — validate page/size ranges',
    'SQL injection via @RequestParam passed directly to queries — always use parameterized queries',
  ],
  bestPractices: [
    'Always provide defaultValue for page/size parameters',
    'Enforce max page size to prevent OOM: if (size > 100) size = 100',
    'Use @Validated on the controller and @Max/@Min on params for automatic validation',
    'Document all query parameters in your API documentation (Swagger/OpenAPI)',
  ],
  architectNote: `For complex search/filter APIs, consider creating a dedicated search criteria object and using @ModelAttribute to bind all params at once. Or use Spring Data JPA Specifications or QueryDSL for dynamic queries. Avoid building query strings manually from @RequestParam values — it\'s fragile and SQL-injection-prone.`,
  faqs: [
    {
      question: 'How do I bind multiple request params to an object?',
      answer: 'Use @ModelAttribute: @GetMapping with @ModelAttribute ProductFilter filter. Spring binds all matching query params to the filter object\'s fields. The filter class needs setters or a matching constructor. This is cleaner than 10 individual @RequestParam annotations.',
    },
  ],
  keyTakeaways: [
    '@RequestParam extracts query string parameters (?key=value)',
    'required=false makes a param optional; defaultValue provides a fallback',
    'Spring auto-converts String params to int, boolean, enum, LocalDate, etc.',
    'Use List<String> for multi-value params (?tag=spring&tag=java)',
    '@ModelAttribute binds multiple params to an object at once',
    'Always paginate list endpoints — never return unbounded collections',
  ],
  relatedTopics: ['spring-controllers', 'spring-request-mapping', 'spring-path-variables', 'spring-exception-handling'],
};
