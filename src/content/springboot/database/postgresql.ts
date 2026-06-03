import type { TopicContent } from '../../types';

export const springPostgresql: TopicContent = {
  slug: 'spring-postgresql',
  title: 'PostgreSQL Integration',
  description: 'Integrate PostgreSQL with Spring Boot — the preferred database for enterprise Spring Boot applications with advanced features, JSON support, and superior performance.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'PostgreSQL 14+'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'PostgreSQL is the preferred database for Spring Boot enterprise applications. Add the PostgreSQL driver, configure spring.datasource.url with jdbc:postgresql://, and Spring Boot auto-configures everything. PostgreSQL offers JSONB columns, full-text search, window functions, and better concurrency than MySQL — making it the default choice for new projects.',
  whatIsIt: `PostgreSQL integration in Spring Boot uses:
- **PostgreSQL JDBC Driver** (org.postgresql:postgresql)
- **HikariCP** connection pool (auto-configured)
- **Hibernate** with PostgreSQL dialect
- **Flyway** for schema migrations

**PostgreSQL advantages over MySQL:**
- JSONB columns with indexing (store and query JSON)
- Full-text search built-in
- Window functions (ROW_NUMBER, RANK, LAG)
- CTEs (WITH clauses) for complex queries
- Better MVCC concurrency model
- UUID generation (gen_random_uuid())
- Array types
- LISTEN/NOTIFY for real-time events`,
  whyWeNeedIt: `PostgreSQL is the enterprise standard for Spring Boot applications. It\'s free, open-source, ACID-compliant, and has features that MySQL lacks. Most cloud providers (AWS RDS, Google Cloud SQL, Azure) offer managed PostgreSQL. Spring Boot\'s JPA integration with PostgreSQL is seamless.`,
  realWorldUsage: `PostgreSQL-specific features used in Spring Boot apps:
- JSONB for flexible attributes (product metadata, user preferences)
- UUID primary keys for distributed systems
- Full-text search for product/content search
- Sequences with high allocationSize for batch inserts
- LISTEN/NOTIFY with Spring\'s @Scheduled for lightweight event processing`,
  howItWorks: `Same as MySQL: Spring Boot auto-configures DataSource, EntityManagerFactory, and TransactionManager from spring.datasource.* properties. Hibernate uses PostgreSQLDialect to generate PostgreSQL-specific SQL (e.g., RETURNING clause, sequence queries).`,
  example: {
    title: 'PostgreSQL Integration',
    description: 'Configuration, JSONB mapping, and PostgreSQL-specific features.',
    code: [
      {
        label: 'application.yml',
        language: 'yaml',
        code: `spring:
  datasource:
    url: jdbc:postgresql://\${DB_HOST:localhost}:5432/\${DB_NAME:myapp}
    username: \${DB_USERNAME:postgres}
    password: \${DB_PASSWORD}
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      keepalive-time: 300000

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        jdbc:
          batch_size: 50
          order_inserts: true
          order_updates: true
        default_schema: public

  flyway:
    enabled: true
    locations: classpath:db/migration`,
      },
      {
        label: 'JSONB Column Mapping',
        language: 'java',
        code: `// Store flexible JSON attributes in PostgreSQL JSONB column
@Entity
@Table(name = "products")
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class) // hypersistence-utils
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String name;

    // JSONB column — queryable JSON stored as binary
    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> attributes; // flexible product attributes

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private List<String> tags;
}

// Flyway migration:
// ALTER TABLE products ADD COLUMN attributes jsonb;
// CREATE INDEX idx_products_attributes ON products USING GIN(attributes);

// Query JSONB with native SQL:
@Query(value = "SELECT * FROM products WHERE attributes->>'color' = :color",
       nativeQuery = true)
List<Product> findByColor(@Param("color") String color);`,
      },
      {
        label: 'UUID Primary Keys',
        language: 'java',
        code: `@Entity
@Table(name = "sessions")
public class UserSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)  // Spring Boot 3.x / Hibernate 6
    @Column(columnDefinition = "uuid", updatable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;
}

// Flyway:
// CREATE TABLE sessions (
//     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//     user_id BIGINT NOT NULL,
//     expires_at TIMESTAMPTZ NOT NULL
// );`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'PostgreSQL vs MySQL — which should I choose for a new project?',
      answer: 'PostgreSQL for new projects. It has better standards compliance, superior JSON support, better concurrency, window functions, CTEs, and is free without licensing concerns. MySQL is more widely deployed in legacy systems. Cloud providers offer both at similar costs. Most Spring Boot tutorials use PostgreSQL.',
    },
    {
      question: 'Why use SEQUENCE instead of IDENTITY for primary keys in PostgreSQL?',
      answer: 'SEQUENCE with allocationSize=50 allows Hibernate to pre-allocate 50 IDs without a database round-trip per insert. IDENTITY (SERIAL in PostgreSQL) requires a database call after each INSERT to get the generated ID. For bulk inserts, SEQUENCE is dramatically faster.',
    },
  ],
  productionIssues: [
    'pg_stat_activity showing idle connections — HikariCP keepalive-time prevents idle connection drops',
    'Slow queries due to missing indexes — use EXPLAIN ANALYZE to identify missing indexes',
    'Connection limit reached — PostgreSQL default max_connections=100; use PgBouncer for connection pooling at scale',
    'Long-running transactions holding locks — monitor pg_locks and set statement_timeout',
  ],
  bestPractices: [
    'Use SEQUENCE generation strategy for better batch performance',
    'Use UUID primary keys for distributed systems and external-facing IDs',
    'Add GIN indexes on JSONB columns you query',
    'Set statement_timeout to prevent runaway queries',
    'Use PgBouncer for connection pooling in high-concurrency environments',
    'Enable pg_stat_statements extension for query performance monitoring',
  ],
  architectNote: `For microservices at scale, consider using PgBouncer between your services and PostgreSQL. Each microservice instance maintains a HikariCP pool, but with 10 instances × 20 connections = 200 connections to PostgreSQL. PgBouncer in transaction pooling mode multiplexes these to 20-30 actual connections, dramatically reducing PostgreSQL memory usage and connection overhead.`,
  faqs: [
    {
      question: 'How do I use PostgreSQL-specific types (JSONB, arrays) with Spring Data JPA?',
      answer: 'Use the hypersistence-utils library (io.hypersistence:hypersistence-utils-hibernate-63 for Hibernate 6). It provides @Type annotations for JSONB, arrays, and other PostgreSQL-specific types. Alternatively, use @Column(columnDefinition="jsonb") with a custom AttributeConverter for simple cases.',
    },
  ],
  keyTakeaways: [
    'PostgreSQL is the preferred database for new Spring Boot enterprise projects',
    'Configure with jdbc:postgresql://host:5432/dbname and org.postgresql.Driver',
    'Use SEQUENCE generation for better batch insert performance',
    'JSONB columns enable flexible schema with queryable JSON',
    'UUID primary keys prevent enumeration and work well in distributed systems',
    'Use PgBouncer for connection pooling at scale (>100 concurrent connections)',
  ],
  relatedTopics: ['spring-mysql', 'spring-transactions', 'spring-data-jpa', 'spring-entity-mapping'],
};
