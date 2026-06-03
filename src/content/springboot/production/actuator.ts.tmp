import type { TopicContent } from '../../types';

export const springActuator: TopicContent = {
  slug: 'spring-actuator',
  title: 'Actuator',
  description: 'Master Spring Boot Actuator — the production-ready features for health checks, metrics, info, and management endpoints that every enterprise Spring Boot application needs.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Boot Actuator adds production-ready endpoints to your application. Add spring-boot-starter-actuator and you get /actuator/health (Kubernetes readiness/liveness probes), /actuator/metrics (performance data), /actuator/info (app version), and more. Secure them — never expose all Actuator endpoints publicly.',
  whatIsIt: `Spring Boot Actuator provides HTTP endpoints for monitoring and managing your application.

**Key endpoints:**
- \`/actuator/health\` — application health (UP/DOWN) + component details
- \`/actuator/metrics\` — metrics (JVM, HTTP, DB connection pool, custom)
- \`/actuator/info\` — application info (version, build time)
- \`/actuator/env\` — all environment properties (sensitive!)
- \`/actuator/loggers\` — view and change log levels at runtime
- \`/actuator/threaddump\` — thread dump for debugging
- \`/actuator/heapdump\` — heap dump for memory analysis
- \`/actuator/prometheus\` — Prometheus-format metrics scraping
- \`/actuator/shutdown\` — graceful shutdown (disabled by default)
- \`/actuator/refresh\` — refresh @RefreshScope beans (Spring Cloud)

**Kubernetes integration:**
- \`/actuator/health/liveness\` — is the app alive? (restart if DOWN)
- \`/actuator/health/readiness\` — is the app ready for traffic? (remove from load balancer if DOWN)`,
  whyWeNeedIt: `Production applications need observability:
- Kubernetes needs /health for liveness and readiness probes
- Prometheus scrapes /actuator/prometheus for metrics
- Operations team needs /actuator/loggers to debug without restart
- Security team needs /actuator/env to verify config (access-controlled)
- On-call engineers need /actuator/threaddump for deadlock debugging`,
  realWorldUsage: `Every production Spring Boot service exposes:
- /actuator/health for Kubernetes probes
- /actuator/prometheus for Prometheus/Grafana metrics
- /actuator/info for deployment tracking
- /actuator/loggers for runtime log level changes`,
  howItWorks: `Actuator endpoints are auto-configured when spring-boot-starter-actuator is on the classpath. Each endpoint is a Spring MVC (or WebFlux) controller. You control which are enabled and which are exposed via HTTP through properties.`,
  example: {
    title: 'Actuator Configuration',
    description: 'Secure Actuator setup for production with Kubernetes probes.',
    code: [
      {
        label: 'application.yml',
        language: 'yaml',
        code: `management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus,loggers
        # Never expose: env, heapdump, threaddump publicly
        # Expose all in dev: include: "*"
  endpoint:
    health:
      show-details: when-authorized  # Only show details to authenticated users
      probes:
        enabled: true  # Enable /health/liveness and /health/readiness
    info:
      enabled: true
  health:
    livenessState:
      enabled: true
    readinessState:
      enabled: true
    db:
      enabled: true
    diskSpace:
      enabled: true
    redis:
      enabled: true

info:
  app:
    name: \${spring.application.name}
    version: @project.version@
    build-time: @maven.build.timestamp@
  java:
    version: \${java.version}`,
      },
      {
        label: 'Custom Health Indicator',
        language: 'java',
        code: `// Custom health check for external dependency
@Component
public class ExternalApiHealthIndicator implements HealthIndicator {

    private final ExternalApiClient apiClient;

    @Override
    public Health health() {
        try {
            boolean available = apiClient.ping();
            if (available) {
                return Health.up()
                    .withDetail("url", apiClient.getBaseUrl())
                    .withDetail("status", "reachable")
                    .build();
            } else {
                return Health.down()
                    .withDetail("url", apiClient.getBaseUrl())
                    .withDetail("status", "unreachable")
                    .build();
            }
        } catch (Exception e) {
            return Health.down(e)
                .withDetail("url", apiClient.getBaseUrl())
                .build();
        }
    }
}

// Kubernetes probe configuration:
// livenessProbe:
//   httpGet:
//     path: /actuator/health/liveness
//     port: 8080
//   initialDelaySeconds: 30
//   periodSeconds: 10
// readinessProbe:
//   httpGet:
//     path: /actuator/health/readiness
//     port: 8080
//   initialDelaySeconds: 10
//   periodSeconds: 5`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between liveness and readiness probes?',
      answer: 'Liveness: is the app alive? If DOWN, Kubernetes restarts the pod. Use for deadlocks or unrecoverable states. Readiness: is the app ready to serve traffic? If DOWN, Kubernetes removes the pod from the load balancer but doesn\'t restart it. Use for temporary unavailability (DB connection lost, cache warming). Spring Boot maps these to /actuator/health/liveness and /actuator/health/readiness.',
    },
    {
      question: 'Are Actuator endpoints secure by default?',
      answer: 'Only /actuator/health and /actuator/info are exposed by default. Others must be explicitly enabled. But even /actuator/health can expose sensitive info (DB credentials in error messages) with show-details=always. Always secure Actuator endpoints with authentication or IP restriction in production.',
    },
  ],
  productionIssues: [
    '/actuator/env exposed publicly showing database passwords and API keys',
    'Health endpoint returning DOWN due to a non-critical component (cache) causing unnecessary Kubernetes restarts',
    'Liveness probe too aggressive — restarting pods during high load instead of waiting',
    'No readiness probe — traffic routed to pods that aren\'t ready yet',
  ],
  bestPractices: [
    'Only expose health, info, metrics, prometheus in production',
    'Secure Actuator endpoints with IP restriction or authentication',
    'Use separate liveness and readiness probes in Kubernetes',
    'Configure health groups — separate critical from non-critical health checks',
    'Add custom health indicators for external dependencies',
    'Use /actuator/loggers to change log levels in production without restart',
  ],
  architectNote: `Actuator + Micrometer + Prometheus + Grafana is the standard observability stack for Spring Boot in production. Actuator exposes metrics, Micrometer translates them to Prometheus format, Prometheus scrapes and stores them, Grafana visualizes them. Spring Boot auto-configures all of this — add spring-boot-starter-actuator and micrometer-registry-prometheus and you have metrics in Grafana in minutes.`,
  faqs: [
    {
      question: 'How do I add custom metrics?',
      answer: 'Inject MeterRegistry and use it: meterRegistry.counter("orders.created").increment() or meterRegistry.gauge("queue.size", queue, Queue::size). Micrometer supports counters, gauges, timers, and distribution summaries. These appear in /actuator/metrics and /actuator/prometheus automatically.',
    },
  ],
  keyTakeaways: [
    '/actuator/health is essential for Kubernetes liveness and readiness probes',
    '/actuator/prometheus enables Prometheus metrics scraping',
    'Only expose necessary endpoints — never /actuator/env or /actuator/heapdump publicly',
    'Secure Actuator endpoints with authentication or IP restriction',
    'Custom HealthIndicator for external dependency checks',
    'Liveness = restart if down; Readiness = remove from load balancer if down',
  ],
  relatedTopics: ['spring-monitoring', 'spring-profiles', 'spring-logging'],
};
