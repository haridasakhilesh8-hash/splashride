import type { TopicContent } from '../../types';

export const springDataJpa: TopicContent = {
  slug: 'spring-data-jpa',
  title: 'Spring Data JPA',
  description: 'Master Spring Data JPA — the abstraction layer over Hibernate that eliminates boilerplate data access code through repository interfaces and derived query methods.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Hibernate 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Data JPA lets you write zero-SQL data access code for standard operations. Define an interface extending JpaRepository<Entity, ID>, and Spring generates the implementation at startup. You get save(), findById(), findAll(), delete() and more for free. For custom queries, write method names like findByEmailAndStatus() and Spring generates the SQL.',
  whatIsIt: `Spring Data JPA is a layer on top of JPA (Hibernate) that eliminates boilerplate repository code.

**What you get for free by extending JpaRepository:**
- \`save(entity)\` — insert or update
- \`findById(id)\` — returns Optional<T>
- \`findAll()\` — all entities
- \`findAll(Pageable)\` — paginated results
- \`findAll(Sort)\` — sorted results
- \`count()\` — total count
- \`existsById(id)\` — existence check
- \`deleteById(id)\` — delete by ID
- \`saveAll(entities)\` — batch save

**Query generation strategies:**
1. **Derived queries** — method names: \`findByEmailAndStatus()\`
2. **@Query** — JPQL or native SQL annotation
3. **Specifications** — dynamic queries via Criteria API
4. **QueryDSL** — type-safe dynamic queries`,
  whyWeNeedIt: `Without Spring Data JPA, every repository requires:
\`\`\`java
@Repository
public class UserRepositoryImpl {
    @PersistenceContext
    private EntityManager em;

    public Optional<User> findById(Long id) {
        return Optional.ofNullable(em.find(User.class, id));
    }
    public User save(User user) {
        if (user.getId() == null) em.persist(user);
        else em.merge(user);
        return user;
    }
    // 20 more methods...
}
\`\`\`

With Spring Data JPA:
\`\`\`java
public interface UserRepository extends JpaRepository<User, Long> {
    // That\'s it. save, findById, findAll, delete all generated.
}
\`\`\``,
  realWorldUsage: `In enterprise Spring Boot apps, every entity has a repository interface. The team writes:
- Derived query methods for simple filters
- @Query for complex JPQL queries
- Specifications for dynamic search forms
- Custom repository implementations for very complex queries

The auto-generated CRUD handles 80% of data access; custom queries handle the rest.`,
  howItWorks: `At application startup, Spring Data scans for interfaces extending Repository. For each one, it:
1. Creates a JDK proxy implementing the interface
2. Parses method names into query ASTs (findByEmailAndStatus → WHERE email=? AND status=?)
3. Compiles @Query annotations to JPQL/SQL
4. Registers the proxy as a Spring bean

At runtime, method calls are intercepted by the proxy and delegated to Hibernate.`,
  example: {
    title: 'Spring Data JPA in Practice',
    description: 'From basic repository to complex queries.',
    code: [
      {
        label: 'Repository Interface',
        language: 'java',
        code: `public interface OrderRepository extends JpaRepository<Order, Long> {

    // Derived query: WHERE customer_id = ? AND status = ?
    List<Order> findByCustomerIdAndStatus(Long customerId, OrderStatus status);

    // Derived query with pagination
    Page<Order> findByCustomerId(Long customerId, Pageable pageable);

    // Derived query: WHERE created_at BETWEEN ? AND ?
    List<Order> findByCreatedAtBetween(LocalDateTime from, LocalDateTime to);

    // JPQL query
    @Query("SELECT o FROM Order o WHERE o.totalAmount > :minAmount " +
           "AND o.status = :status ORDER BY o.createdAt DESC")
    List<Order> findHighValueOrders(
        @Param("minAmount") BigDecimal minAmount,
        @Param("status") OrderStatus status
    );

    // Native SQL query
    @Query(value = "SELECT * FROM orders WHERE DATE(created_at) = CURRENT_DATE",
           nativeQuery = true)
    List<Order> findTodaysOrders();

    // Projection — only fetch needed fields
    @Query("SELECT new com.company.dto.OrderSummary(o.id, o.orderNumber, o.totalAmount) " +
           "FROM Order o WHERE o.customerId = :customerId")
    List<OrderSummary> findOrderSummariesByCustomer(@Param("customerId") Long customerId);

    // Modifying query — UPDATE or DELETE
    @Modifying
    @Transactional
    @Query("UPDATE Order o SET o.status = :status WHERE o.id = :id")
    int updateStatus(@Param("id") Long id, @Param("status") OrderStatus status);

    // Exists check
    boolean existsByOrderNumberAndCustomerId(String orderNumber, Long customerId);

    // Count
    long countByStatusAndCreatedAtAfter(OrderStatus status, LocalDateTime since);
}`,
      },
      {
        label: 'Dynamic Queries with Specifications',
        language: 'java',
        code: `// Repository must extend JpaSpecificationExecutor
public interface ProductRepository extends JpaRepository<Product, Long>,
        JpaSpecificationExecutor<Product> {}

// Specification builder
public class ProductSpecifications {

    public static Specification<Product> hasCategory(String category) {
        return (root, query, cb) ->
            category == null ? null : cb.equal(root.get("category"), category);
    }

    public static Specification<Product> priceBetween(BigDecimal min, BigDecimal max) {
        return (root, query, cb) -> {
            if (min == null && max == null) return null;
            if (min == null) return cb.lessThanOrEqualTo(root.get("price"), max);
            if (max == null) return cb.greaterThanOrEqualTo(root.get("price"), min);
            return cb.between(root.get("price"), min, max);
        };
    }

    public static Specification<Product> isActive() {
        return (root, query, cb) -> cb.isTrue(root.get("active"));
    }
}

// Usage in service:
public Page<Product> search(ProductSearchRequest req, Pageable pageable) {
    Specification<Product> spec = Specification
        .where(ProductSpecifications.hasCategory(req.getCategory()))
        .and(ProductSpecifications.priceBetween(req.getMinPrice(), req.getMaxPrice()))
        .and(ProductSpecifications.isActive());

    return productRepository.findAll(spec, pageable);
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between JpaRepository, CrudRepository, and PagingAndSortingRepository?',
      answer: 'CrudRepository provides basic CRUD. PagingAndSortingRepository adds findAll(Pageable) and findAll(Sort). JpaRepository extends both and adds JPA-specific methods (flush, saveAndFlush, deleteInBatch). Always extend JpaRepository — it gives you everything.',
    },
    {
      question: 'Why does findAll() cause performance issues?',
      answer: 'findAll() loads ALL entities into memory. For a table with 1 million rows, this is catastrophic. Always use findAll(Pageable) for list endpoints. Add @Query with LIMIT for bounded queries. Never call findAll() in production without a size constraint.',
    },
    {
      question: 'What is the N+1 query problem?',
      answer: 'If an Order has 10 Items and you load 100 orders, JPA may execute 1 query for orders + 100 queries for items = 101 queries. Fix with JOIN FETCH in @Query: @Query("SELECT o FROM Order o JOIN FETCH o.items") or use @EntityGraph to specify eager loading per query.',
    },
  ],
  productionIssues: [
    'N+1 query problem with lazy-loaded relationships — use JOIN FETCH or @EntityGraph',
    'findAll() without pagination loading millions of records into memory',
    '@Modifying without @Transactional — update queries require an active transaction',
    'Open Session in View anti-pattern — disable with spring.jpa.open-in-view=false',
    'Missing index on frequently queried columns causing full table scans',
  ],
  bestPractices: [
    'Always disable open-in-view: spring.jpa.open-in-view=false',
    'Use Pageable for all list queries — never unbounded findAll()',
    'Use projections (interface or DTO) to fetch only needed columns',
    'Use @EntityGraph for specific queries that need eager loading',
    'Add @Transactional(readOnly=true) on read-only service methods for performance',
    'Use @Modifying + @Transactional for bulk UPDATE/DELETE queries',
  ],
  architectNote: `Spring Data JPA is excellent for standard CRUD but can hide performance problems. Every derived query method generates SQL — verify it with spring.jpa.show-sql=true in development. For complex reports, aggregations, or bulk operations, consider native SQL queries or even a separate read model. The repository pattern should be thin — complex business logic belongs in the service layer, not in @Query annotations.`,
  faqs: [
    {
      question: 'How do I handle soft deletes (mark as deleted without removing)?',
      answer: 'Add a deletedAt field and annotate the entity with @SQLDelete (overrides DELETE SQL) and @Where (filters out soft-deleted records). Or use @Filter for per-query control. Spring Data JPA Soft Delete is also available as a library. Alternatively, manage it manually in the service layer for full control.',
    },
    {
      question: 'What is the difference between @Query JPQL and native SQL?',
      answer: 'JPQL operates on entities and is database-independent. Native SQL operates on tables and is database-specific. Use JPQL for portability; use nativeQuery=true for database-specific features (window functions, CTEs, full-text search). For complex analytics, native SQL is often clearer and more performant.',
    },
  ],
  keyTakeaways: [
    'JpaRepository provides save, findById, findAll, delete and more for free',
    'Derived query methods (findByEmailAndStatus) generate SQL from method names',
    '@Query supports JPQL and native SQL for custom queries',
    'JpaSpecificationExecutor enables dynamic queries without string concatenation',
    'Always paginate list queries — never call unbounded findAll()',
    'Disable open-in-view and fix N+1 problems with JOIN FETCH or @EntityGraph',
  ],
  relatedTopics: ['spring-entity-mapping', 'spring-repositories', 'spring-pagination', 'spring-transactions'],
};
