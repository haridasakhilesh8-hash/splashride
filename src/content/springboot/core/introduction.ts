import type { TopicContent } from '../../types';

export const springIntroduction: TopicContent = {
  slug: 'spring-introduction',
  title: 'Spring Boot Introduction',
  description: 'Understand what Spring Boot is, why it exists, and how it transforms enterprise Java development by eliminating boilerplate configuration.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Boot is an opinionated framework built on top of the Spring Framework. It eliminates XML configuration and manual bean wiring by providing sensible defaults and auto-configuration. You get a production-ready application in minutes instead of days of setup.',
  whatIsIt: `Spring Boot is a convention-over-configuration framework that:

- **Auto-configures** Spring and third-party libraries based on what's on your classpath
- **Embeds** a servlet container (Tomcat, Jetty, Undertow) so you ship a runnable JAR
- **Provides Starters** — curated dependency bundles that work together
- **Eliminates XML** — everything is annotation-driven or property-based
- **Exposes Actuator** — production-ready health checks, metrics, and management endpoints

**Spring Boot vs Spring Framework:**
- Spring Framework = the core (IoC, AOP, MVC, Data)
- Spring Boot = Spring Framework + auto-configuration + embedded server + opinionated defaults

**Spring Boot vs Spring MVC:**
- Spring MVC = the web layer of Spring Framework
- Spring Boot can include Spring MVC but also handles much more`,
  whyWeNeedIt: `Before Spring Boot (pre-2014), setting up a Spring project meant:
- Writing hundreds of lines of XML configuration
- Manually configuring DataSource, TransactionManager, EntityManagerFactory
- Deploying WAR files to external Tomcat servers
- Resolving dependency version conflicts manually
- Days of setup before writing a single line of business logic

Spring Boot solves this with:
- **Zero XML** — annotations and properties replace XML
- **Embedded server** — run with \`java -jar app.jar\`, no Tomcat installation needed
- **Starter dependencies** — \`spring-boot-starter-web\` brings in everything for web apps
- **Auto-configuration** — detects libraries and configures them automatically
- **Production-ready** — Actuator, metrics, health checks out of the box`,
  realWorldUsage: `In enterprise projects, Spring Boot is the standard for:
- **Microservices** — each service is a standalone Spring Boot JAR
- **REST APIs** — most enterprise REST backends are Spring Boot
- **Batch processing** — Spring Batch on Spring Boot for ETL pipelines
- **Event-driven systems** — Spring Boot + Kafka/RabbitMQ
- **Cloud-native apps** — Spring Boot + Docker + Kubernetes

A typical microservice team creates a new Spring Boot app with Spring Initializr in 2 minutes, adds business logic, and ships to production — the framework handles the rest.`,
  howItWorks: `**Spring Boot Startup Sequence:**
1. \`SpringApplication.run()\` is called from \`main()\`
2. Creates ApplicationContext (IoC container)
3. Loads \`spring.factories\` / \`AutoConfiguration.imports\` — discovers auto-configurations
4. Evaluates \`@Conditional\` annotations — only activates relevant configs
5. Registers all beans (your code + auto-configured beans)
6. Starts embedded Tomcat on port 8080
7. Application is ready to serve requests

**Key Annotations:**
- \`@SpringBootApplication\` = \`@Configuration\` + \`@EnableAutoConfiguration\` + \`@ComponentScan\`
- \`@EnableAutoConfiguration\` — triggers the auto-config magic
- \`@ComponentScan\` — scans your package for \`@Component\`, \`@Service\`, etc.`,
  example: {
    title: 'Your First Spring Boot Application',
    description: 'A complete, runnable Spring Boot REST API from scratch.',
    code: [
      {
        label: 'Main Application Class',
        language: 'java',
        code: `@SpringBootApplication
public class OrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}`,
      },
      {
        label: 'REST Controller',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderDto> getAllOrders() {
        return orderService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDto createOrder(@Valid @RequestBody CreateOrderRequest request) {
        return orderService.create(request);
    }
}`,
      },
      {
        label: 'application.properties',
        language: 'properties',
        code: `spring.application.name=order-service
server.port=8080

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/orders
spring.datasource.username=postgres
spring.datasource.password=secret

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false`,
      },
      {
        label: 'pom.xml (key dependencies)',
        language: 'xml',
        code: `<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Spring Boot a replacement for Spring Framework?',
      answer: 'No. Spring Boot is built ON TOP of Spring Framework. It uses Spring\'s core features (IoC, AOP, MVC) but adds auto-configuration and embedded servers. Every Spring Boot app IS a Spring app.',
    },
    {
      question: 'Does Spring Boot run inside Tomcat?',
      answer: 'By default, Spring Boot EMBEDS Tomcat inside your JAR. You don\'t install Tomcat separately. The JAR is self-contained. You can still deploy as a WAR to an external Tomcat if needed (legacy environments), but the embedded approach is standard for microservices.',
    },
    {
      question: 'What does @SpringBootApplication actually do?',
      answer: 'It\'s a meta-annotation combining three annotations: @Configuration (this class defines beans), @EnableAutoConfiguration (activate auto-config), and @ComponentScan (scan this package and sub-packages for components). You could use all three separately — @SpringBootApplication is just a shortcut.',
    },
  ],
  productionIssues: [
    'Slow startup time in large applications — use Spring Boot 3.x with GraalVM native compilation for 10x faster startup',
    'Auto-configuration activating unwanted beans — use spring.autoconfigure.exclude to disable specific auto-configs',
    'Default embedded Tomcat thread pool too small for high traffic — tune server.tomcat.threads.max (default 200)',
    'Fat JAR too large for container images — use layered JARs or Jib for efficient Docker layer caching',
    'application.properties containing secrets committed to Git — use Spring Cloud Config Server or Vault for secret management',
  ],
  bestPractices: [
    'Always use spring-boot-starter-parent as your POM parent for managed dependency versions',
    'Keep @SpringBootApplication in the root package so @ComponentScan picks up all sub-packages',
    'Use constructor injection everywhere — never @Autowired on fields',
    'Separate configuration properties into dedicated @ConfigurationProperties classes',
    'Use profiles (dev, staging, prod) to manage environment-specific configuration',
    'Enable spring-boot-devtools only in development — never in production',
    'Use Spring Initializr (start.spring.io) to bootstrap new projects with the right dependencies',
  ],
  architectNote: `Spring Boot 3.x requires Java 17 minimum and Spring 6. It brings native compilation support via GraalVM, virtual thread support (Project Loom, Java 21), and improved observability with Micrometer. For new enterprise projects in 2024, start with Spring Boot 3.2+ and Java 21 — you get virtual threads for free, which dramatically improves throughput for I/O-bound microservices without changing your code.`,
  faqs: [
    {
      question: 'Spring Boot 2.x vs 3.x — which should I use?',
      answer: 'Spring Boot 2.7.x reached end-of-life in November 2023. Use Spring Boot 3.x for all new projects. It requires Java 17+, uses Jakarta EE 10 (javax.* → jakarta.*), and supports GraalVM native images. Migrating from 2.x to 3.x mainly involves renaming javax imports to jakarta.',
    },
    {
      question: 'How do I change the embedded server from Tomcat to something else?',
      answer: 'Exclude Tomcat from spring-boot-starter-web and add the alternative: exclude tomcat-embed-core and add spring-boot-starter-jetty or spring-boot-starter-undertow. Undertow is often preferred for reactive/high-concurrency workloads.',
    },
    {
      question: 'Can Spring Boot run without a web server?',
      answer: 'Yes. If you don\'t include spring-boot-starter-web, no embedded server starts. Useful for batch jobs, CLI tools, or message consumers. You can also set spring.main.web-application-type=none explicitly.',
    },
    {
      question: 'What is the Spring Initializr?',
      answer: 'start.spring.io is the official project generator. Choose your Spring Boot version, language (Java/Kotlin/Groovy), build tool (Maven/Gradle), and dependencies — it generates a ready-to-import ZIP. Your IDE (IntelliJ, VS Code) has this built in.',
    },
  ],
  keyTakeaways: [
    'Spring Boot = Spring Framework + auto-configuration + embedded server + opinionated defaults',
    '@SpringBootApplication combines @Configuration, @EnableAutoConfiguration, and @ComponentScan',
    'Auto-configuration is conditional — it only activates when relevant classes are on the classpath',
    'Embedded Tomcat means your app ships as a self-contained JAR — no external server needed',
    'Spring Boot 3.x requires Java 17+ and uses Jakarta EE 10 namespace',
    'Starters are curated dependency bundles — spring-boot-starter-web pulls in everything for REST APIs',
  ],
  relatedTopics: ['spring-auto-configuration', 'spring-starters', 'spring-properties', 'spring-ioc'],
};
