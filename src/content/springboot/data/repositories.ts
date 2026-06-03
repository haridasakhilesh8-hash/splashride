import type { TopicContent } from '../../types';

export const springRepositories: TopicContent = {
  slug: 'spring-repositories',
  title: 'Repositories',
  description: 'Master the Spring Data repository pattern — from basic JpaRepository to custom implementations, projections, and the repository design best practices for enterprise applications.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Repositories are the data access layer in Spring. Extend JpaRepository<Entity, ID> and you get full CRUD. Add method names like findByEmail() and Spring generates the query. For complex queries, use @Query. For very complex logic, add a custom implementation. The repository pattern keeps data access separate from business logic.',
  whatIsIt: `The repository pattern in Spring Data provides a clean abstraction over data access.

**Repository hierarchy:**
- \`Repository<T, ID>\` — marker interface
- \`CrudRepository<T, ID>\` — basic CRUD
- \`PagingAndSortingRepository<T, ID>\` — + pagination/sorting
- \`JpaRepository<T, ID>\` — + JPA-specific methods (flush, batch)
- \`JpaSpecificationExecutor<T>\` — + dynamic Specification queries

**Query methods:**
- Derived: \`findByFirstNameAndLastName(String first, String last)\`
- @Query JPQL: \`@Query("SELECT u FROM User u WHERE u.email = :email")\`
- @Query native: \`@Query(value="SELECT * FROM users WHERE email=:email", nativeQuery=true)\`
- Custom implementation: full control with EntityManager

**Projections:**
- Interface projections: define an interface with getters for needed fields
- DTO projections: @Query with \`new\` constructor expression
- Dynamic projections: repository method returns \`<T>\` with type parameter`,
  whyWeNeedIt: `Repositories provide a clean boundary between business logic and data access. Services work with domain objects and call repositories. Repositories handle SQL, transactions, and ORM mapping. This separation enables:
- Unit testing services with mock repositories
- Swapping databases without changing services
- Centralizing query logic in one place`,
  realWorldUsage: `In a production app, repositories are the only place that touches the database (via JPA). Services call repositories, not EntityManager directly. This keeps the architecture clean and testable.`,
  howItWorks: `Spring Data creates JDK proxies for repository interfaces at startup. Method calls are intercepted and routed to the appropriate query strategy: derived query parser, @Query executor, or custom implementation delegate.`,
  example: {
    title: 'Repository Patterns',
    description: 'Projections, custom implementations, and auditing repositories.',
    code: [
      {
        label: 'Interface Projections',
        language: 'java',
        code: `// Only fetch id, name, email — not the full User entity
public interface UserSummary {
    Long getId();
    String getFirstName();
    String getLastName();
    String getEmail();

    // Computed property via SpEL
    @Value("#{target.firstName + ' ' + target.lastName}")
    String getFullName();
}

public interface UserRepository extends JpaRepository<User, Long> {

    // Returns projection instead of full entity
    List<UserSummary> findByDepartmentId(Long departmentId);

    // Dynamic projection — caller decides what to fetch
    <T> List<T> findByRole(UserRole role, Class<T> type);
}

// Usage:
List<UserSummary> summaries = userRepository.findByDepartmentId(deptId);
// SELECT id, first_name, last_name, email FROM users WHERE department_id=?
// NOT SELECT * — much faster for large entities`,
      },
      {
        label: 'Custom Repository Implementation',
        language: 'java',
        code: `// Step 1: Define the custom interface
public interface UserRepositoryCustom {
    List<User> searchUsers(UserSearchCriteria criteria);
    void bulkUpdateStatus(List<Long> ids, UserStatus status);
}

// Step 2: Implement it
@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<User> searchUsers(UserSearchCriteria criteria) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> query = cb.createQuery(User.class);
        Root<User> root = query.from(User.class);

        List<Predicate> predicates = new ArrayList<>();

        if (criteria.getName() != null) {
            predicates.add(cb.like(
                cb.lower(root.get("firstName")),
                "%" + criteria.getName().toLowerCase() + "%"
            ));
        }
        if (criteria.getRole() != null) {
            predicates.add(cb.equal(root.get("role"), criteria.getRole()));
        }
        if (criteria.getStatus() != null) {
            predicates.add(cb.equal(root.get("status"), criteria.getStatus()));
        }

        query.where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.desc(root.get("createdAt")));

        return em.createQuery(query)
            .setMaxResults(criteria.getLimit())
            .getResultList();
    }

    @Override
    @Transactional
    public void bulkUpdateStatus(List<Long> ids, UserStatus status) {
        em.createQuery(
            "UPDATE User u SET u.status = :status WHERE u.id IN :ids")
            .setParameter("status", status)
            .setParameter("ids", ids)
            .executeUpdate();
    }
}

// Step 3: Extend both in the main repository
public interface UserRepository extends JpaRepository<User, Long>,
        JpaSpecificationExecutor<User>,
        UserRepositoryCustom {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I put @Transactional on repository methods?',
      answer: 'Spring Data JPA repositories are already @Transactional by default for write operations. Read operations are @Transactional(readOnly=true). You don\'t need to add @Transactional to repository methods. Add @Transactional to SERVICE methods when you need to combine multiple repository calls in one transaction.',
    },
    {
      question: 'When should I use a custom implementation vs @Query?',
      answer: 'Use @Query for static JPQL/SQL queries. Use custom implementation for: dynamic queries built at runtime, bulk operations with EntityManager, queries requiring complex logic, or when you need full control over the query execution.',
    },
  ],
  productionIssues: [
    'Returning entities from repositories to controllers — always map to DTOs in the service layer',
    'Large @Query annotations becoming maintenance nightmares — move complex queries to named queries or custom impl',
    'Repository methods not in transactions when called from non-transactional context',
  ],
  bestPractices: [
    'Use projections to fetch only needed fields — avoid loading full entities for list views',
    'Add @Transactional(readOnly=true) to service methods that only read data',
    'Keep repositories focused on data access — no business logic',
    'Use custom implementations for complex dynamic queries instead of string concatenation',
  ],
  architectNote: `Repositories are the anti-corruption layer between your domain model and the database. Services should work with domain objects; repositories translate between domain objects and database rows. Never leak database concerns (column names, SQL syntax) into the service layer. If you find yourself writing SQL in a service, that query belongs in a repository.`,
  faqs: [
    {
      question: 'Can I have multiple repositories for the same entity?',
      answer: 'Yes, but it\'s unusual. A common pattern is having a primary UserRepository and a read-only UserReadRepository (extending Repository instead of JpaRepository) for the read model. This enforces that read operations don\'t accidentally trigger writes.',
    },
  ],
  keyTakeaways: [
    'JpaRepository provides full CRUD + pagination + sorting for free',
    'Derived query methods generate SQL from method names',
    'Interface projections fetch only needed columns — much faster for large entities',
    'Custom implementations give full EntityManager control for complex queries',
    'Spring Data repositories are already @Transactional — add @Transactional to service methods',
    'Keep repositories focused on data access only',
  ],
  relatedTopics: ['spring-data-jpa', 'spring-entity-mapping', 'spring-pagination', 'spring-transactions'],
};
