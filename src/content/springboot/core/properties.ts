import type { TopicContent } from '../../types';

export const springProperties: TopicContent = {
  slug: 'spring-properties',
  title: 'Application Properties',
  description: 'Master Spring Boot configuration — application.properties, application.yml, profiles, @ConfigurationProperties, and externalized configuration for production deployments.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Boot reads configuration from application.properties (or application.yml) in src/main/resources. Properties control everything — server port, database URL, logging levels, and your own custom settings. For production, you externalize sensitive values via environment variables or a config server — never hardcode secrets.',
  whatIsIt: `Spring Boot's externalized configuration system lets you configure your application without changing code.

**Configuration sources (in priority order, highest first):**
1. Command-line arguments (\`--server.port=9090\`)
2. \`SPRING_APPLICATION_JSON\` environment variable
3. OS environment variables (\`SERVER_PORT=9090\`)
4. \`application-{profile}.properties\` (profile-specific)
5. \`application.properties\` / \`application.yml\`
6. \`@PropertySource\` annotations
7. Default values in code

**Configuration formats:**
- \`application.properties\` — key=value pairs (simpler)
- \`application.yml\` — YAML (hierarchical, less repetition)

**Binding approaches:**
- \`@Value("\${property.name}")\` — inject single value
- \`@ConfigurationProperties(prefix="app")\` — bind a group of properties to a class (preferred)`,
  whyWeNeedIt: `Without externalized configuration:
- Database URLs would be hardcoded in source code
- The same JAR couldn't run in dev, staging, and production
- Changing a port would require recompilation
- Secrets would be committed to Git

With Spring Boot's config system:
- One JAR runs in all environments — only config changes
- Secrets come from environment variables or Vault at runtime
- Profiles activate environment-specific config automatically
- Teams can change behavior without touching code`,
  realWorldUsage: `In production microservices:
- \`application.properties\` contains non-sensitive defaults
- \`application-prod.properties\` overrides for production
- Database passwords come from environment variables (Kubernetes Secrets)
- Feature flags come from a Config Server (Spring Cloud Config)
- Logging levels changed at runtime via Actuator without restart`,
  howItWorks: `**Property relaxed binding:**
Spring Boot normalizes property names — these are all equivalent:
- \`spring.datasource.url\` (properties)
- \`SPRING_DATASOURCE_URL\` (env var)
- \`--spring.datasource.url\` (command line)

**@ConfigurationProperties binding:**
Spring reads all properties with the given prefix and binds them to the class fields using relaxed binding. Supports nested objects, lists, and maps. Much safer than @Value — validates at startup, not at runtime.`,
  example: {
    title: 'Configuration in Practice',
    description: 'From simple properties to type-safe configuration classes.',
    code: [
      {
        label: 'application.yml',
        language: 'yaml',
        code: `spring:
  application:
    name: order-service
  datasource:
    url: jdbc:postgresql://localhost:5432/orders
    username: postgres
    password: \${DB_PASSWORD}
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

server:
  port: 8080
  shutdown: graceful

app:
  jwt:
    secret: \${JWT_SECRET}
    expiration-ms: 86400000
  cors:
    allowed-origins:
      - https://app.company.com
  features:
    new-checkout: false`,
      },
      {
        label: '@ConfigurationProperties',
        language: 'java',
        code: `@ConfigurationProperties(prefix = "app")
@Validated
public class AppProperties {

    private final Jwt jwt = new Jwt();
    private final Cors cors = new Cors();
    private final Features features = new Features();

    public Jwt getJwt() { return jwt; }
    public Cors getCors() { return cors; }
    public Features getFeatures() { return features; }

    public static class Jwt {
        @NotBlank
        private String secret;
        @Positive
        private long expirationMs = 86400000L;
        public String getSecret() { return secret; }
        public void setSecret(String secret) { this.secret = secret; }
        public long getExpirationMs() { return expirationMs; }
        public void setExpirationMs(long v) { this.expirationMs = v; }
    }

    public static class Cors {
        private List<String> allowedOrigins = List.of();
        public List<String> getAllowedOrigins() { return allowedOrigins; }
        public void setAllowedOrigins(List<String> v) { this.allowedOrigins = v; }
    }

    public static class Features {
        private boolean newCheckout = false;
        public boolean isNewCheckout() { return newCheckout; }
        public void setNewCheckout(boolean v) { this.newCheckout = v; }
    }
}

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class Application { ... }`,
      },
      {
        label: 'Profile-specific YAML',
        language: 'yaml',
        code: `# application-dev.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
logging:
  level:
    com.company: DEBUG

---
# application-prod.yml
spring:
  datasource:
    url: jdbc:postgresql://\${DB_HOST}:5432/\${DB_NAME}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
logging:
  level:
    root: WARN
    com.company: INFO`,
      },
    ],
  },
  commonConfusions: [
    {
      question: '@Value vs @ConfigurationProperties — which should I use?',
      answer: '@ConfigurationProperties is strongly preferred for groups of related properties. It provides type safety, validation at startup, and IDE autocompletion. Use @Value only for simple one-off injections or SpEL expressions.',
    },
    {
      question: 'How do environment variables override properties?',
      answer: 'Spring Boot uses relaxed binding — SPRING_DATASOURCE_URL (env var) maps to spring.datasource.url (property). Environment variables take higher priority than application.properties. In Kubernetes, inject secrets as env vars.',
    },
    {
      question: 'application.properties vs application.yml — which is better?',
      answer: 'YAML is preferred for complex configurations — it\'s hierarchical and eliminates repetition. Properties files are simpler for flat configs. Pick one and be consistent. YAML requires careful indentation — use 2 spaces, never tabs.',
    },
  ],
  productionIssues: [
    'Secrets in application.properties committed to Git — use environment variables or Spring Cloud Vault',
    'Wrong profile active in production — verify with /actuator/env endpoint',
    '@ConfigurationProperties fields not binding — ensure setters exist',
    'YAML indentation errors cause silent misconfiguration — validate in CI',
  ],
  bestPractices: [
    'Use @ConfigurationProperties over @Value for groups of related properties',
    'Add @Validated to @ConfigurationProperties classes to catch missing config at startup',
    'Never put secrets in application.properties — use environment variables',
    'Use spring-boot-configuration-processor for IDE autocompletion of custom properties',
    'Use spring.config.import to pull config from external sources (Config Server, Vault)',
  ],
  architectNote: `For microservices at scale, use Spring Cloud Config Server — a centralized configuration service where all microservices pull their config at startup. This enables config changes without redeployment. In Kubernetes environments, use ConfigMaps for non-sensitive config and Secrets (mounted as env vars) for sensitive values.`,
  faqs: [
    {
      question: 'How do I activate a profile?',
      answer: 'Several ways: (1) SPRING_PROFILES_ACTIVE=prod environment variable (preferred for production), (2) --spring.profiles.active=prod command-line arg, (3) @ActiveProfiles in tests. Never hardcode the active profile in application.properties.',
    },
    {
      question: 'Can I have multiple active profiles at once?',
      answer: 'Yes. SPRING_PROFILES_ACTIVE=prod,feature-x activates both profiles. Properties from both are merged, with later profiles taking precedence for conflicts.',
    },
  ],
  keyTakeaways: [
    'Configuration sources have a priority order — environment variables override application.properties',
    '@ConfigurationProperties is preferred over @Value for type-safe, validated configuration',
    'Profiles enable environment-specific config — activate with SPRING_PROFILES_ACTIVE env var',
    'Never commit secrets to properties files — use environment variables',
    'YAML is hierarchical and reduces repetition compared to .properties format',
  ],
  relatedTopics: ['spring-introduction', 'spring-auto-configuration', 'spring-profiles', 'spring-ioc'],
};
