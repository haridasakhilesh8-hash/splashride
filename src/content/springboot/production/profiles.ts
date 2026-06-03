import type { TopicContent } from '../../types';

export const springProfiles: TopicContent = {
  slug: 'spring-profiles',
  title: 'Profiles',
  description: 'Master Spring Profiles for environment-specific configuration — separating dev, test, staging, and production settings without code changes.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Profiles let you have different configurations for different environments. application-dev.properties has H2 database and debug logging. application-prod.properties has PostgreSQL and INFO logging. Activate a profile with SPRING_PROFILES_ACTIVE=prod environment variable. Beans can also be profile-specific with @Profile("prod").',
  whatIsIt: `Spring Profiles provide a way to segregate parts of your application configuration and make it only available in certain environments.

**Profile-specific config files:**
- \`application.yml\` — defaults for all profiles
- \`application-dev.yml\` — dev overrides
- \`application-test.yml\` — test overrides
- \`application-staging.yml\` — staging overrides
- \`application-prod.yml\` — production overrides

**Profile-specific beans:**
- \`@Profile("dev")\` — only register this bean in dev
- \`@Profile("!prod")\` — register in all profiles except prod
- \`@Profile({"dev", "test"})\` — register in dev and test

**Activation:**
- \`SPRING_PROFILES_ACTIVE=prod\` (environment variable — production)
- \`--spring.profiles.active=dev\` (command line)
- \`spring.profiles.active=dev\` (application.properties — never for prod)
- \`@ActiveProfiles("test")\` (tests)`,
  whyWeNeedIt: `Without profiles, you\'d either:
- Have one config file with if/else logic (messy)
- Manually edit properties before each deployment (error-prone)
- Have different code branches per environment (unmaintainable)

Profiles provide a clean, declarative way to manage environment differences.`,
  realWorldUsage: `Standard enterprise profile setup:
- **dev**: H2 in-memory DB, DEBUG logging, all Actuator endpoints exposed, hot reload
- **test**: Testcontainers or H2, INFO logging, no external services
- **staging**: Real database (staging), INFO logging, same config as prod
- **prod**: Production database, WARN logging, minimal Actuator exposure, SSL`,
  howItWorks: `Spring loads \`application.yml\` first, then \`application-{profile}.yml\`. Profile-specific properties override defaults. Multiple active profiles are supported — properties from later profiles override earlier ones.`,
  example: {
    title: 'Profile Configuration',
    description: 'Environment-specific configuration and profile-specific beans.',
    code: [
      {
        label: 'Profile-specific YAML',
        language: 'yaml',
        code: `# application.yml (defaults)
spring:
  application:
    name: order-service
server:
  port: 8080
logging:
  level:
    root: INFO

---
# application-dev.yml
spring:
  datasource:
    url: jdbc:h2:mem:devdb
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
  h2:
    console:
      enabled: true
logging:
  level:
    com.company: DEBUG
    org.hibernate.SQL: DEBUG
management:
  endpoints:
    web:
      exposure:
        include: "*"

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
    com.company: INFO
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics`,
      },
      {
        label: '@Profile Beans',
        language: 'java',
        code: `// Mock email service for dev/test — doesn't send real emails
@Service
@Profile({"dev", "test"})
public class MockEmailService implements EmailService {
    @Override
    public void sendEmail(String to, String subject, String body) {
        log.info("[MOCK] Email to {}: {}", to, subject);
        // Don't actually send anything
    }
}

// Real email service for staging and production
@Service
@Profile({"staging", "prod"})
public class SmtpEmailService implements EmailService {
    // Real SMTP implementation
}

// Dev-only configuration
@Configuration
@Profile("dev")
public class DevDataInitializer {

    @Bean
    CommandLineRunner initDevData(UserRepository users, ProductRepository products) {
        return args -> {
            // Seed development data
            users.save(new User("admin@dev.com", "Admin", Role.ADMIN));
            users.save(new User("user@dev.com", "User", Role.USER));
            products.saveAll(DevDataFactory.createProducts(50));
            log.info("Dev data initialized");
        };
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I set spring.profiles.active in application.properties?',
      answer: 'Never for production. Setting it in application.properties means the profile is always active, defeating the purpose. Set it via: SPRING_PROFILES_ACTIVE environment variable (Kubernetes, Docker), --spring.profiles.active command-line arg, or @ActiveProfiles in tests. The production profile should be activated by the deployment environment, not the code.',
    },
    {
      question: 'Can I have multiple active profiles simultaneously?',
      answer: 'Yes. SPRING_PROFILES_ACTIVE=prod,feature-x activates both. Properties from both are merged, with later profiles taking precedence for conflicts. This is useful for feature flags (prod + feature-new-checkout) or environment + concern (prod + monitoring).',
    },
  ],
  productionIssues: [
    'Wrong profile active in production — verify with GET /actuator/env',
    'Dev profile accidentally active in production loading H2 instead of PostgreSQL',
    'Profile-specific @Bean missing in production causing NoSuchBeanDefinitionException',
    'spring.profiles.active hardcoded to dev in application.properties',
  ],
  bestPractices: [
    'Never hardcode spring.profiles.active in application.properties',
    'Activate profiles via SPRING_PROFILES_ACTIVE environment variable in production',
    'Use @Profile to swap implementations (mock vs real services)',
    'Verify active profile at startup in production logs',
    'Use @ActiveProfiles in tests to ensure correct profile',
  ],
  architectNote: `Profiles solve the environment problem, but they\'re not a secrets manager. Never put database passwords, API keys, or secrets in profile-specific properties files committed to Git. Use environment variables for secrets (injected by Kubernetes Secrets, AWS Secrets Manager, or HashiCorp Vault). Profiles manage structural differences (which database type, which service endpoints); secrets management handles sensitive values.`,
  faqs: [
    {
      question: 'How do I verify which profile is active in production?',
      answer: 'GET /actuator/env shows all properties including the active profile. Or check the startup logs — Spring Boot logs "The following profiles are active: prod" at INFO level. Add logging.level.org.springframework.boot=INFO to ensure this is logged.',
    },
  ],
  keyTakeaways: [
    'Profile-specific config files: application-{profile}.yml override application.yml',
    '@Profile annotation makes beans environment-specific',
    'Activate via SPRING_PROFILES_ACTIVE env var — never hardcode in properties',
    'Multiple profiles can be active simultaneously',
    'Use @Profile to swap mock vs real implementations',
    'Profiles manage structural differences; use secrets manager for sensitive values',
  ],
  relatedTopics: ['spring-properties', 'spring-actuator', 'spring-logging'],
};
