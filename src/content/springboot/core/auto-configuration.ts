import type { TopicContent } from '../../types';

export const springAutoConfiguration: TopicContent = {
  slug: 'spring-auto-configuration',
  title: 'Auto Configuration',
  description: 'Understand how Spring Boot\'s auto-configuration works under the hood — how it detects your classpath, applies conditional configuration, and how to customize or disable it.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Auto-configuration is Spring Boot\'s superpower. When you add spring-boot-starter-data-jpa to your classpath, Spring Boot automatically configures a DataSource, EntityManagerFactory, and TransactionManager — without you writing a single @Bean. It does this by scanning for specific classes on the classpath and conditionally activating pre-written configuration classes.',
  whatIsIt: `Auto-configuration is a set of \`@Configuration\` classes that Spring Boot activates **conditionally** based on what's on your classpath, what beans you've already defined, and what properties you've set.

**How Spring Boot discovers auto-configurations:**
- Spring Boot 2.x: \`META-INF/spring.factories\` file
- Spring Boot 3.x: \`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\`

**Key conditional annotations:**
- \`@ConditionalOnClass\` — activate only if a class is on the classpath
- \`@ConditionalOnMissingBean\` — activate only if you haven't defined your own bean
- \`@ConditionalOnProperty\` — activate only if a property is set
- \`@ConditionalOnWebApplication\` — activate only in web apps
- \`@ConditionalOnExpression\` — activate based on SpEL expression

This means auto-configuration is **never forced on you** — define your own bean and Spring backs off.`,
  whyWeNeedIt: `Without auto-configuration, every Spring Boot project would require:
\`\`\`java
@Bean
public DataSource dataSource() {
    HikariDataSource ds = new HikariDataSource();
    ds.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
    // ... 10 more lines
    return ds;
}
// Plus EntityManagerFactory, TransactionManager, etc.
\`\`\`

Auto-configuration does all this from \`spring.datasource.*\` properties. You write 3 lines of config instead of 50 lines of code.`,
  realWorldUsage: `Every Spring Boot application uses auto-configuration constantly:
- Add \`spring-boot-starter-web\` → DispatcherServlet, Jackson, Tomcat auto-configured
- Add \`spring-boot-starter-data-jpa\` + DB driver → DataSource, JPA, Transactions auto-configured
- Add \`spring-boot-starter-security\` → Security filter chain auto-configured

In enterprise projects, teams write **custom auto-configurations** for shared libraries that auto-configure themselves when added as a dependency.`,
  howItWorks: `**Step-by-step auto-configuration process:**

1. \`@EnableAutoConfiguration\` triggers \`AutoConfigurationImportSelector\`
2. Selector reads \`AutoConfiguration.imports\` — a list of 150+ configuration classes
3. Each config class is evaluated against its \`@Conditional\` annotations
4. Passing configs are imported into the ApplicationContext
5. \`@ConditionalOnMissingBean\` ensures your beans take priority

**Debug auto-configuration:**
\`\`\`properties
debug=true
# Or: GET /actuator/conditions
\`\`\``,
  example: {
    title: 'Understanding and Customizing Auto-Configuration',
    description: 'How to inspect, override, and write your own auto-configuration.',
    code: [
      {
        label: 'Override Auto-Configuration',
        language: 'java',
        code: `@Configuration
public class DataSourceConfig {

    // Your custom DataSource takes priority over auto-configuration
    @Bean
    @Primary
    public DataSource primaryDataSource(
            @Value("\${db.primary.url}") String url,
            @Value("\${db.primary.username}") String username,
            @Value("\${db.primary.password}") String password) {

        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setUsername(username);
        config.setPassword(password);
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(30000);
        return new HikariDataSource(config);
    }
}`,
      },
      {
        label: 'Disable Specific Auto-Configurations',
        language: 'java',
        code: `// Option 1: Annotation
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class,
    SecurityAutoConfiguration.class
})
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// Option 2: Properties (preferred — no recompile needed)
// spring.autoconfigure.exclude=
//   org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration`,
      },
      {
        label: 'Write Your Own Auto-Configuration',
        language: 'java',
        code: `@AutoConfiguration
@ConditionalOnClass(AuditRepository.class)
@ConditionalOnProperty(
    prefix = "company.audit",
    name = "enabled",
    havingValue = "true",
    matchIfMissing = true
)
@EnableConfigurationProperties(AuditProperties.class)
public class AuditAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public AuditService auditService(
            AuditRepository repository,
            AuditProperties properties) {
        return new DefaultAuditService(repository, properties);
    }
}

// Register in:
// META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports
// com.company.audit.AuditAutoConfiguration`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does auto-configuration override my beans?',
      answer: 'Never. Auto-configuration uses @ConditionalOnMissingBean — it only activates if you haven\'t defined that bean yourself. Your beans always win.',
    },
    {
      question: 'How do I know which auto-configurations are active?',
      answer: 'Run with --debug flag or set debug=true in application.properties. Spring prints a "CONDITIONS EVALUATION REPORT" showing every auto-config class and whether it was applied or skipped.',
    },
    {
      question: 'spring.factories vs AutoConfiguration.imports — what changed?',
      answer: 'Spring Boot 3.x moved to META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports for better performance. Spring Boot 2.7 supports both. Use the new format for Boot 3.x custom starters.',
    },
  ],
  productionIssues: [
    'Security auto-configuration activating on a non-web service — add SecurityAutoConfiguration to exclude list',
    'Multiple DataSource auto-configurations conflicting — explicitly mark one @Primary',
    'Auto-configured connection pool too small — always override HikariCP settings for production',
    'Jackson auto-configuration serializing nulls — configure ObjectMapper via spring.jackson.* properties',
  ],
  bestPractices: [
    'Use debug=true during development to understand which auto-configs are active',
    'Prefer property-based customization over overriding beans when possible',
    'When writing shared libraries, use @ConditionalOnMissingBean so consumers can override',
    'Document which auto-configurations your custom starter provides',
  ],
  architectNote: `Auto-configuration is the foundation of Spring Boot's productivity. When building internal platform libraries, write them as Spring Boot starters with auto-configuration. Teams add your library as a dependency and it just works — zero configuration required. This is exactly how spring-boot-starter-* libraries work.`,
  faqs: [
    {
      question: 'Can I create my own Spring Boot starter?',
      answer: 'Yes. Create a library with an auto-configuration class annotated with @AutoConfiguration and @Conditional annotations. Register it in AutoConfiguration.imports. Teams add it as a dependency and it auto-configures itself. Naming: xxx-spring-boot-starter.',
    },
    {
      question: 'How does @ConditionalOnClass work without causing ClassNotFoundException?',
      answer: 'Spring uses ASM (bytecode manipulation) to read @ConditionalOnClass without loading the class. If the class is absent, the condition fails gracefully without any exception.',
    },
  ],
  keyTakeaways: [
    'Auto-configuration is conditional — only activates when specific classes/properties are present',
    '@ConditionalOnMissingBean means your beans always override auto-configured ones',
    'Use debug=true to see the full conditions evaluation report',
    'Exclude unwanted auto-configurations via @SpringBootApplication(exclude=...)',
    'Write custom auto-configurations for shared enterprise libraries',
  ],
  relatedTopics: ['spring-introduction', 'spring-starters', 'spring-ioc', 'spring-properties'],
};
