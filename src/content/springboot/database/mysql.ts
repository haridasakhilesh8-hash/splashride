import type { TopicContent } from '../../types';

export const springMysql: TopicContent = {
  slug: 'spring-mysql',
  title: 'MySQL Integration',
  description: 'Integrate MySQL with Spring Boot — DataSource configuration, HikariCP connection pooling, Flyway migrations, and production tuning for enterprise MySQL deployments.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'MySQL 8.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Add the MySQL driver and configure spring.datasource.url/username/password in application.properties. Spring Boot auto-configures HikariCP connection pool automatically. Use Flyway for database migrations. Never use spring.jpa.hibernate.ddl-auto=create or update in production — always use migrations.',
  whatIsIt: `Spring Boot integrates with MySQL through:
- **MySQL Connector/J** — the JDBC driver
- **HikariCP** — auto-configured connection pool (fastest Java connection pool)
- **Spring Data JPA / Hibernate** — ORM layer
- **Flyway / Liquibase** — database schema migrations

**Auto-configuration:**
When mysql-connector-j is on the classpath and spring.datasource.url is set, Spring Boot auto-configures DataSource, JdbcTemplate, EntityManagerFactory, and TransactionManager.`,
  whyWeNeedIt: `MySQL is the most widely used relational database in enterprise Java applications. Proper integration means: connection pooling (not creating a new connection per request), schema migration management (not manual SQL scripts), and production-ready configuration (timeouts, pool sizes, SSL).`,
  realWorldUsage: `Standard MySQL Spring Boot setup:
- HikariCP pool with 10-20 connections for typical microservices
- Flyway managing schema versions from V1 to V47
- Read replicas with separate DataSource for read-heavy workloads
- SSL connections in production`,
  howItWorks: `Spring Boot\'s DataSourceAutoConfiguration reads spring.datasource.* properties and creates a HikariDataSource. The pool maintains a set of open connections, lending them to threads on request and returning them to the pool when done. This is far more efficient than creating a new connection per request (which takes 20-50ms each).`,
  example: {
    title: 'MySQL Integration',
    description: 'Configuration, Flyway migrations, and production settings.',
    code: [
      {
        label: 'Dependencies (pom.xml)',
        language: 'xml',
        code: `<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>  <!-- version managed by Spring Boot -->
</dependency>

<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>

<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-mysql</artifactId>
</dependency>`,
      },
      {
        label: 'application.yml',
        language: 'yaml',
        code: `spring:
  datasource:
    url: jdbc:mysql://\${DB_HOST:localhost}:3306/\${DB_NAME:myapp}?useSSL=true&requireSSL=true&serverTimezone=UTC&characterEncoding=UTF-8
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000     # 30s to get connection from pool
      idle-timeout: 600000          # 10min idle before closing
      max-lifetime: 1800000         # 30min max connection lifetime
      keepalive-time: 300000        # 5min keepalive ping
      connection-test-query: SELECT 1
      pool-name: OrderServicePool

  jpa:
    hibernate:
      ddl-auto: validate  # NEVER create/update in production
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: false
        jdbc:
          batch_size: 50
          order_inserts: true
          order_updates: true

  flyway:
    enabled: true
    locations: classpath:db/migration
    baseline-on-migrate: true`,
      },
      {
        label: 'Flyway Migration',
        language: 'sql',
        code: `-- src/main/resources/db/migration/V1__create_orders_table.sql
CREATE TABLE orders (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    order_number VARCHAR(20)    NOT NULL,
    customer_id BIGINT          NOT NULL,
    status      VARCHAR(20)     NOT NULL,
    total_amount DECIMAL(19,4)  NOT NULL,
    created_at  DATETIME(6)     NOT NULL,
    updated_at  DATETIME(6),
    created_by  VARCHAR(100),
    updated_by  VARCHAR(100),
    version     BIGINT          DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_order_number (order_number),
    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- V2__add_orders_shipping_address.sql
ALTER TABLE orders
    ADD COLUMN street     VARCHAR(200),
    ADD COLUMN city       VARCHAR(100),
    ADD COLUMN state      VARCHAR(50),
    ADD COLUMN zip_code   VARCHAR(20),
    ADD COLUMN country    VARCHAR(3);`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is ddl-auto and which value should I use?',
      answer: 'ddl-auto controls whether Hibernate creates/modifies the schema. Values: create (drops and recreates on startup), create-drop (creates on start, drops on stop), update (adds missing columns, never drops), validate (validates schema matches entities, throws if not), none (does nothing). Use validate in production with Flyway/Liquibase for migrations. Never use create or update in production.',
    },
    {
      question: 'How many connections should the pool have?',
      answer: 'For a typical microservice, 10-20 connections is right. The HikariCP formula: connections = (core_count * 2) + effective_spindle_count. For a 4-core machine with SSD: ~10 connections. More connections don\'t mean more throughput — they add contention. Monitor pool wait time in production to tune.',
    },
  ],
  productionIssues: [
    'Connection pool exhaustion — all connections in use, new requests wait or timeout; increase pool size or optimize slow queries',
    'MySQL server gone away — connections idle too long; set max-lifetime below MySQL wait_timeout',
    'UTC timezone issues — always set serverTimezone=UTC in JDBC URL',
    'Character encoding issues with emoji/special chars — use utf8mb4, not utf8',
    'SSL not configured in production — always use useSSL=true for production databases',
  ],
  bestPractices: [
    'Always use Flyway or Liquibase for schema migrations',
    'Set ddl-auto=validate in production',
    'Configure HikariCP pool size based on your workload and DB server capacity',
    'Use UTC timezone in both application and database',
    'Enable SSL for production database connections',
    'Monitor pool metrics via Actuator and alert on pool wait time',
  ],
  architectNote: `For read-heavy microservices, configure two DataSources: a primary (read-write) and a replica (read-only). Route read operations to the replica using @Transactional(readOnly=true) with AbstractRoutingDataSource. This doubles your read throughput with minimal code changes. Spring Boot doesn\'t do this automatically — it requires custom DataSource configuration.`,
  faqs: [
    {
      question: 'Flyway vs Liquibase — which should I use?',
      answer: 'Flyway is simpler: SQL migration files named V1__description.sql. Liquibase is more powerful: XML/YAML/JSON changelogs with rollback support. For most teams, Flyway\'s simplicity wins. Use Liquibase when you need rollback scripts, database-independent migrations, or complex branching strategies.',
    },
  ],
  keyTakeaways: [
    'Spring Boot auto-configures HikariCP from spring.datasource.* properties',
    'Use Flyway for schema migrations — never ddl-auto=create/update in production',
    'ddl-auto=validate checks schema matches entities at startup',
    'Set max-lifetime below MySQL wait_timeout to prevent stale connections',
    'Always use utf8mb4 charset and UTC timezone',
    'Monitor connection pool metrics in production',
  ],
  relatedTopics: ['spring-postgresql', 'spring-transactions', 'spring-data-jpa', 'spring-entity-mapping'],
};
