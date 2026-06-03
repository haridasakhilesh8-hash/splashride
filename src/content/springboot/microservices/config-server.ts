import type { TopicContent } from '../../types';

export const springConfigServer: TopicContent = {
  slug: 'spring-config-server',
  title: 'Config Server',
  description: 'Centralize configuration for all microservices with Spring Cloud Config Server — manage environment-specific properties from a Git repository without redeployment.',
  applicableVersions: ['Spring Boot 3.x', 'Spring Cloud 2023.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Cloud Config Server is a centralized configuration service. All microservices pull their configuration from it at startup instead of having local application.properties. Config is stored in a Git repository — change a property, commit, and services pick it up on next restart (or immediately with @RefreshScope + Spring Cloud Bus).',
  whatIsIt: `Spring Cloud Config Server provides server-side and client-side support for externalized configuration.

**Architecture:**
- **Config Server** — a Spring Boot app that serves config from a Git repo
- **Config Client** — each microservice fetches its config from the server at startup
- **Git backend** — stores config files (application.yml, order-service.yml, etc.)

**Config file resolution:**
For \`order-service\` with profile \`prod\`, the server serves (in priority order):
1. \`order-service-prod.yml\`
2. \`order-service.yml\`
3. \`application-prod.yml\`
4. \`application.yml\`

**Dynamic refresh:**
- \`@RefreshScope\` on beans that should reload when config changes
- \`POST /actuator/refresh\` triggers refresh on one instance
- Spring Cloud Bus (Kafka/RabbitMQ) broadcasts refresh to all instances`,
  whyWeNeedIt: `In a microservices architecture with 20 services across dev/staging/prod, managing configuration is complex:
- 20 services × 3 environments = 60 config files to maintain
- Changing a shared property requires updating all services
- No audit trail for config changes

Config Server centralizes this: one Git repo, all services pull from it, Git history tracks all changes.`,
  realWorldUsage: `Enterprise config management:
- Database URLs per environment in Git
- Feature flags managed centrally
- Secrets via Spring Cloud Vault (not in Git)
- Config changes without redeployment via @RefreshScope`,
  howItWorks: `Config Server clones the Git repo and serves config files via REST API. Clients call the server at startup (before the ApplicationContext is fully initialized) via bootstrap.yml or spring.config.import. The fetched properties are merged with local properties (local takes priority).`,
  example: {
    title: 'Config Server Setup',
    description: 'Server setup, client configuration, and dynamic refresh.',
    code: [
      {
        label: 'Config Server',
        language: 'java',
        code: `@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}

// application.yml for Config Server:
// server:
//   port: 8888
// spring:
//   cloud:
//     config:
//       server:
//         git:
//           uri: https://github.com/company/microservices-config
//           default-label: main
//           search-paths: '{application}'  # per-service subdirectory
//           username: \${GIT_USERNAME}
//           password: \${GIT_TOKEN}`,
      },
      {
        label: 'Config Client (Each Microservice)',
        language: 'yaml',
        code: `# application.yml in each microservice
spring:
  application:
    name: order-service
  config:
    import: optional:configserver:http://config-server:8888
  cloud:
    config:
      fail-fast: true  # Fail at startup if config server unreachable
      retry:
        max-attempts: 6
        initial-interval: 1000

# In Git repo (config-server-git-repo/order-service.yml):
# spring:
#   datasource:
#     url: jdbc:postgresql://prod-db:5432/orders
# app:
#   feature-flags:
#     new-checkout: true`,
      },
      {
        label: '@RefreshScope for Dynamic Config',
        language: 'java',
        code: `// Bean reloaded when /actuator/refresh is called
@Service
@RefreshScope  // Recreates bean when config refreshes
public class FeatureFlagService {

    @Value("\${app.features.new-checkout:false}")
    private boolean newCheckoutEnabled;

    @Value("\${app.features.beta-dashboard:false}")
    private boolean betaDashboardEnabled;

    public boolean isNewCheckoutEnabled() {
        return newCheckoutEnabled;
    }
}

// Trigger refresh on all instances via Spring Cloud Bus:
// 1. Add spring-cloud-starter-bus-kafka dependency
// 2. POST /actuator/busrefresh on any instance
// 3. Bus broadcasts refresh event to all instances
// 4. All @RefreshScope beans are recreated with new config`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I put secrets in the Config Server Git repo?',
      answer: 'No. Secrets (passwords, API keys) should not be in Git, even in a private repo. Use Spring Cloud Vault (HashiCorp Vault) for secrets, or environment variables from Kubernetes Secrets. Config Server can be configured to use Vault as a backend alongside Git — non-sensitive config from Git, secrets from Vault.',
    },
    {
      question: 'What happens if the Config Server is down when a service starts?',
      answer: 'With fail-fast: true, the service fails to start — which is correct. A service without its config might behave incorrectly. Configure retry to attempt multiple times before failing. In production, run multiple Config Server instances behind a load balancer for high availability.',
    },
  ],
  productionIssues: [
    'Config Server single point of failure — run multiple instances',
    'Git repo credentials in Config Server properties — use environment variables',
    '@RefreshScope not applied to @Configuration beans — those require restart',
  ],
  bestPractices: [
    'Run multiple Config Server instances for high availability',
    'Use Vault for secrets, Git for non-sensitive config',
    'Tag Git commits for config changes — enables rollback',
    'Use Spring Cloud Bus for broadcasting refresh to all instances',
    'Test config changes in dev/staging before applying to production',
  ],
  architectNote: `Config Server is powerful but adds operational complexity. For Kubernetes-native deployments, ConfigMaps and Secrets provide similar functionality without the extra service. Use Config Server when you need: centralized config across non-Kubernetes environments, config history/audit via Git, or dynamic config refresh without restart. For simple Kubernetes deployments, ConfigMaps may be sufficient.`,
  faqs: [
    {
      question: 'How do I handle config encryption?',
      answer: 'Spring Cloud Config Server supports symmetric (AES) and asymmetric (RSA) encryption. Encrypt sensitive values with the /encrypt endpoint, store the cipher text in Git ({cipher}...), and the server decrypts on delivery. Better approach: use Vault for secrets and skip encryption in Git entirely.',
    },
  ],
  keyTakeaways: [
    'Config Server serves centralized config from a Git repository',
    'Clients use spring.config.import=configserver: to fetch config at startup',
    '@RefreshScope enables dynamic bean recreation when config changes',
    'Never put secrets in Git — use Vault or Kubernetes Secrets',
    'Run multiple Config Server instances for high availability',
    'Spring Cloud Bus broadcasts config refresh to all instances simultaneously',
  ],
  relatedTopics: ['spring-api-gateway', 'spring-service-discovery', 'spring-properties'],
};
