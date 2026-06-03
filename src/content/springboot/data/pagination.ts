import type { TopicContent } from '../../types';

export const springPagination: TopicContent = {
  slug: 'spring-pagination',
  title: 'Pagination',
  description: 'Implement production-ready pagination in Spring Boot with Pageable, Page, Slice, and best practices for efficient large dataset handling.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Pagination in Spring Boot uses Pageable (the request: page number, size, sort) and Page<T> (the response: data + total count + metadata). Add Pageable to your repository method and Spring Data generates LIMIT/OFFSET SQL automatically. Never return unbounded lists from production APIs.',
  whatIsIt: `Spring Data pagination uses two key abstractions:

**Pageable** (the request)
- Page number (0-indexed)
- Page size
- Sort criteria
- Created with \`PageRequest.of(page, size, sort)\`

**Page<T>** (the response)
- \`getContent()\` — list of items for this page
- \`getTotalElements()\` — total count (executes a COUNT query)
- \`getTotalPages()\` — total page count
- \`getNumber()\` — current page number
- \`getSize()\` — page size
- \`hasNext()\` / \`hasPrevious()\` — navigation flags

**Slice<T>** (lighter alternative)
- No COUNT query — just knows if there\'s a next page
- Use for infinite scroll where total count isn\'t needed`,
  whyWeNeedIt: `Without pagination, list endpoints load all data into memory and return it all to the client. A table with 10 million orders returned as a JSON array will crash your service and the client. Pagination is mandatory for any production list endpoint.`,
  realWorldUsage: `Every list endpoint in a production API is paginated:
- \`GET /api/v1/orders?page=0&size=20&sort=createdAt,desc\`
- \`GET /api/v1/products?category=electronics&page=0&size=50\`
- Admin dashboards showing paginated tables
- Mobile apps using infinite scroll (Slice)`,
  howItWorks: `Spring Data translates Pageable into LIMIT/OFFSET SQL (or database-specific equivalent). For Page<T>, it runs two queries: the data query with LIMIT/OFFSET and a COUNT query for total elements. Slice<T> skips the COUNT query — it just fetches size+1 items to check if there\'s a next page.`,
  example: {
    title: 'Pagination in Practice',
    description: 'Repository, service, and controller with full pagination support.',
    code: [
      {
        label: 'Repository + Service + Controller',
        language: 'java',
        code: `// Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByCustomerIdAndStatus(
        Long customerId, OrderStatus status, Pageable pageable);

    // Slice for infinite scroll (no COUNT query)
    Slice<Order> findByStatus(OrderStatus status, Pageable pageable);
}

// Service
@Service
@Transactional(readOnly = true)
public class OrderService {

    public Page<OrderSummaryDto> getCustomerOrders(
            Long customerId, OrderStatus status, int page, int size, String sortBy) {

        // Validate and cap page size
        int validSize = Math.min(size, 100); // max 100 per page
        Sort sort = Sort.by(Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(page, validSize, sort);

        return orderRepository
            .findByCustomerIdAndStatus(customerId, status, pageable)
            .map(OrderSummaryDto::from); // map entities to DTOs
    }
}

// Controller
@GetMapping
public ResponseEntity<Page<OrderSummaryDto>> getOrders(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") @Max(100) int size,
        @RequestParam(defaultValue = "createdAt") String sortBy,
        @RequestParam(required = false) OrderStatus status,
        @AuthenticationPrincipal UserDetails user) {

    Page<OrderSummaryDto> orders = orderService.getCustomerOrders(
        userService.getIdByUsername(user.getUsername()), status, page, size, sortBy);

    return ResponseEntity.ok(orders);
}`,
      },
      {
        label: 'Pageable from Request (Spring MVC)',
        language: 'java',
        code: `// Spring MVC can auto-resolve Pageable from request params
// Enable in config:
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addArgumentResolvers(
            List<HandlerMethodArgumentResolver> resolvers) {
        // PageableHandlerMethodArgumentResolver auto-added by Spring Boot
        // Reads: ?page=0&size=20&sort=createdAt,desc from query params
    }
}

// Controller with auto-resolved Pageable:
@GetMapping
public Page<ProductDto> getProducts(
        @PageableDefault(size = 20, sort = "createdAt",
                         direction = Sort.Direction.DESC) Pageable pageable) {
    return productService.findAll(pageable);
}
// GET /products?page=0&size=20&sort=name,asc`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Page vs Slice — when to use which?',
      answer: 'Page executes a COUNT query to get the total number of records — useful for showing "Page 3 of 47" or total result counts. Slice skips the COUNT query — just checks if there\'s a next page. Use Slice for infinite scroll (mobile apps) where total count isn\'t needed. Page for traditional paginated tables.',
    },
    {
      question: 'Is Spring Data pagination 0-indexed or 1-indexed?',
      answer: 'Spring Data pagination is 0-indexed by default. Page 0 is the first page. You can configure 1-indexed pages with PageableHandlerMethodArgumentResolver.setOneIndexedParameters(true), but this adds confusion. Stick with 0-indexed and document it in your API.',
    },
  ],
  productionIssues: [
    'COUNT query on large tables with complex WHERE clauses causing slow responses — use Slice or cache the count',
    'No max page size enforcement allowing clients to request size=1000000',
    'Deep pagination (page=10000) causing performance issues with OFFSET — use cursor-based pagination for very large datasets',
    'Sort field not indexed causing full table scans on sorted paginated queries',
  ],
  bestPractices: [
    'Always enforce a maximum page size (e.g., 100)',
    'Use Slice instead of Page when total count isn\'t needed',
    'Index the columns you sort by',
    'For very large datasets (millions), use cursor-based pagination instead of offset',
    'Map entities to DTOs in the .map() call on Page — never return entities',
  ],
  architectNote: `Offset-based pagination (LIMIT/OFFSET) degrades with deep pages — OFFSET 1000000 means the database scans and discards 1 million rows. For high-volume data (audit logs, events), use keyset/cursor-based pagination: WHERE id > :lastSeenId ORDER BY id LIMIT 20. This is O(1) regardless of depth. Spring Data doesn\'t support this natively — implement it with @Query.`,
  faqs: [
    {
      question: 'How do I sort by multiple fields?',
      answer: 'Sort.by(Sort.Order.desc("createdAt"), Sort.Order.asc("lastName")) or via query param: ?sort=createdAt,desc&sort=lastName,asc. Multiple sort params are supported by Spring MVC\'s Pageable resolver.',
    },
  ],
  keyTakeaways: [
    'Pageable = page number + size + sort; Page<T> = data + total count + metadata',
    'Always paginate list endpoints — never return unbounded collections',
    'Slice<T> skips the COUNT query — use for infinite scroll',
    'Page is 0-indexed by default',
    'Enforce max page size to prevent abuse',
    'Deep pagination with OFFSET is slow — use cursor-based for large datasets',
  ],
  relatedTopics: ['spring-data-jpa', 'spring-repositories', 'spring-entity-mapping', 'spring-controllers'],
};
