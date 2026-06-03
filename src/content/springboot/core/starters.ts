import type { TopicContent } from '../../types';

export const springStarters: TopicContent = {
  slug: 'spring-starters',
  title: 'Starter Dependencies',
  description: 'Master Spring Boot Starters — the curated dependency bundles that eliminate version conflicts and bring everything you need for a feature with a single dependency.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A Spring Boot Starter is a single Maven/Gradle dependency that pulls in everything you need for a specific feature. Add spring-boot-starter-web and you get Spring MVC, Jackson, Tomcat, and validation — all at compatible versions. No more hunting for which version of Jackson works with which version of Spring.',
  whatIsIt: `Spring Boot Starters are curated dependency descriptors — POMs that declare a set of related dependencies that work well together.

**Most important starters:**
- \`spring-boot-starter\` — core: logging, auto-config, Spring core
- \`spring-boot-starter-web\` — Spring MVC, Tomcat, Jackson, validation
- \`spring-boot-starter-data-jpa\` — Hibernate, Spring Data JPA, JDBC
- \`spring-boot-starter-security\` — Spring Security
- \`spring-boot-starter-test\` — JUnit 5, Mockito, AssertJ, MockMvc
- \`spring-boot-starter-actuator\` — health, metrics, management endpoints
- \`spring-boot-starter-validation\` — Hibernate Validator, Jakarta Validation
- \`spring-boot-starter-cache\` — Spring Cache abstraction
- \`spring-boot-starter-data-redis\` — Lettuce Redis client, Spring Data Redis
- \`spring-boot-starter-amqp\` — RabbitMQ, Spring AMQP
- \`spring-boot-starter-kafka\` — Apache Kafka, Spring Kafka
- \`spring-boot-starter-mail\` — JavaMail, Spring Mail
- \`spring-boot-starter-webflux\` — Spring WebFlux, Reactor (reactive)

**Parent POM:**
\`spring-boot-starter-parent\` manages all dependency versions — you never specify versions for Spring Boot managed dependencies.`,
  whyWeNeedIt: `Before starters, adding JPA to a Spring project meant:
1. Find the right Hibernate version
2. Find the Spring ORM version compatible with it
3. Find the Spring Data JPA version compatible with Spring ORM
4. Find the connection pool version that works
5. Resolve the 15 transitive dependency conflicts
6. Discover at runtime that two versions are incompatible

Starters eliminate all of this. The Spring Boot team tests all combinations and releases them as a BOM (Bill of Materials). You get one version number (the Boot version) and everything works together.`,
  realWorldUsage: `In a typical enterprise microservice, you\'ll use 6-10 starters:
\`\`\`xml
<!-- The essentials for a REST API with database -->
spring-boot-starter-web          → REST endpoints
spring-boot-starter-data-jpa     → database access
spring-boot-starter-security     → authentication
spring-boot-starter-validation   → request validation
spring-boot-starter-actuator     → health checks for Kubernetes
spring-boot-starter-test         → all testing dependencies
\`\`\`

For event-driven microservices, add:
\`\`\`xml
spring-boot-starter-kafka        → Kafka consumer/producer
spring-boot-starter-data-redis   → Redis for caching/session
\`\`\``,
  howItWorks: `**Dependency resolution:**
1. You add \`spring-boot-starter-web\` to your POM
2. Maven/Gradle resolves its dependencies: spring-webmvc, spring-web, tomcat-embed-core, jackson-databind, etc.
3. Versions come from \`spring-boot-dependencies\` BOM (imported by starter-parent)
4. No version conflicts because all versions are pre-tested together

**spring-boot-starter-parent:**
- Inherits from \`spring-boot-dependencies\` BOM
- Manages 300+ dependency versions
- Configures Maven plugins (compiler, surefire, failsafe)
- Sets Java source encoding to UTF-8
- Enables resource filtering for application.properties`,
  example: {
    title: 'Starter Dependencies in Practice',
    description: 'How to use starters and customize their transitive dependencies.',
    code: [
      {
        label: 'pom.xml — Complete Microservice Setup',
        language: 'xml',
        code: `<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.1</version>
</parent>

<dependencies>
    <!-- Web: Spring MVC + Tomcat + Jackson -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- JPA: Hibernate + Spring Data + JDBC -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- Validation: @Valid, @NotNull, etc. -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- Actuator: /health, /metrics, /info -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>

    <!-- Database driver (version managed by Boot) -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Testing -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>`,
      },
      {
        label: 'Swap Tomcat for Undertow',
        language: 'xml',
        code: `<!-- Exclude Tomcat from web starter, use Undertow instead -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>`,
      },
      {
        label: 'Gradle (build.gradle.kts)',
        language: 'kotlin',
        code: `plugins {
    id("org.springframework.boot") version "3.2.1"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.21"
    kotlin("plugin.spring") version "1.9.21"
    kotlin("plugin.jpa") version "1.9.21"
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do I need to specify versions for starter dependencies?',
      answer: 'No — if you use spring-boot-starter-parent as your parent POM, all Spring Boot managed dependencies have their versions controlled by the BOM. Only specify versions for dependencies NOT managed by Spring Boot (e.g., your company\'s internal libraries).',
    },
    {
      question: 'What is the difference between spring-boot-starter and spring-boot-starter-web?',
      answer: 'spring-boot-starter is the base starter (logging, auto-config, Spring core). spring-boot-starter-web extends it with Spring MVC, Tomcat, and Jackson. Most web apps use spring-boot-starter-web which transitively includes the base starter.',
    },
    {
      question: 'Should I use spring-boot-starter-web or spring-boot-starter-webflux?',
      answer: 'Use spring-boot-starter-web (servlet-based) for standard REST APIs — it\'s simpler, well-understood, and works with all JPA/JDBC libraries. Use spring-boot-starter-webflux (reactive) only if you need non-blocking I/O for very high concurrency or are building reactive pipelines. Don\'t mix them in the same app.',
    },
  ],
  productionIssues: [
    'Dependency version override conflicts — if you override a managed version, ensure it\'s compatible with all other managed deps',
    'spring-boot-starter-test pulling in outdated JUnit 4 — it includes JUnit 5 by default; JUnit 4 is vintage and optional',
    'Classpath scanning slowed by too many jars — use spring-context-indexer to pre-compute component index',
    'Fat JAR size bloat — audit with mvn dependency:tree and exclude unused transitive dependencies',
  ],
  bestPractices: [
    'Always use spring-boot-starter-parent to get managed dependency versions',
    'Never manually specify versions for Spring-managed dependencies',
    'Use mvn dependency:tree to understand what a starter brings in',
    'Exclude embedded Tomcat if deploying to an external container',
    'Add spring-boot-starter-actuator to every production service for health checks',
    'Use spring-boot-starter-test in test scope — it includes JUnit 5, Mockito, AssertJ',
  ],
  architectNote: `When building internal platform libraries for your organization, package them as custom Spring Boot starters. Name them \`{company}-{feature}-spring-boot-starter\`. This pattern means application teams add one dependency and get a fully configured, production-ready feature. This is how companies build internal SDKs for observability, security, audit logging, and feature flags — all as Spring Boot starters.`,
  faqs: [
    {
      question: 'How do I see what a starter actually pulls in?',
      answer: 'Run mvn dependency:tree -Dincludes=org.springframework.boot to see all Spring Boot dependencies. In IntelliJ, open the Maven panel → Dependencies to see the full tree. The spring-boot-starter-web pulls in ~15 direct dependencies.',
    },
    {
      question: 'Can I use Spring Boot without the starter-parent POM?',
      answer: 'Yes — import spring-boot-dependencies as a BOM in your dependencyManagement section. This is useful when your project already has a corporate parent POM. Add: <type>pom</type><scope>import</scope> in dependencyManagement.',
    },
  ],
  keyTakeaways: [
    'Starters are curated dependency bundles — one dependency brings everything needed for a feature',
    'spring-boot-starter-parent manages all dependency versions via a BOM',
    'Never specify versions for Spring Boot managed dependencies',
    'spring-boot-starter-test includes JUnit 5, Mockito, AssertJ, and MockMvc',
    'You can exclude and swap transitive dependencies (e.g., Tomcat → Undertow)',
    'Build internal platform features as custom Spring Boot starters',
  ],
  relatedTopics: ['spring-introduction', 'spring-auto-configuration', 'spring-properties'],
};
