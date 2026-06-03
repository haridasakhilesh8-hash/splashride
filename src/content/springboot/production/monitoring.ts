import type { TopicContent } from '../../types';

export const springMonitoring: TopicContent = {
  slug: 'spring-monitoring',
  title: 'Monitoring',
  description: 'Implement production monitoring for Spring Boot applications — Micrometer metrics, Prometheus integration, Grafana dashboards, and distributed tracing with Micrometer Tracing.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Micrometer 1.12'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Micrometer is the metrics facade for Spring Boot (like SLF4J for logging). It collects JVM metrics, HTTP request metrics, database pool metrics, and your custom metrics. Add micrometer-registry-prometheus and /actuator/prometheus exposes all metrics in Prometheus format. Prometheus scrapes it, Grafana visualizes it.',
  whatIsIt: `Spring Boot monitoring stack:

**Micrometer** — metrics facade (vendor-neutral API)
**Micrometer Tracing** — distributed tracing (Spring Boot 3.x, replaces Sleuth)

**Metrics categories:**
- **JVM metrics** — heap, GC, threads, classes (auto-configured)
- **HTTP metrics** — request count, latency, error rate per endpoint
- **DataSource metrics** — HikariCP pool active/idle/waiting connections
- **Custom metrics** — business metrics (orders/minute, payment success rate)

**Observability pillars:**
- **Metrics** — aggregated numbers over time (Prometheus + Grafana)
- **Logs** — discrete events (ELK Stack, Splunk)
- **Traces** — request journey across services (Zipkin, Jaeger)`,
  whyWeNeedIt: `Without monitoring, you\'re flying blind in production:
- You don\'t know when response times degrade before users complain
- You can\'t identify which endpoint is slow
- You can\'t see database connection pool exhaustion before it causes errors
- You can\'t measure the impact of deployments on performance`,
  realWorldUsage: `Production monitoring stack:
- Prometheus scrapes /actuator/prometheus every 15 seconds
- Grafana dashboards show: request rate, error rate, p99 latency, JVM heap, DB pool
- Alerts: error rate > 1%, p99 latency > 2s, heap > 80%
- Distributed tracing: every request gets a traceId, visible in Zipkin`,
  howItWorks: `Micrometer auto-configures when spring-boot-starter-actuator is present. Adding micrometer-registry-prometheus registers a Prometheus MeterRegistry. All metrics (JVM, HTTP, DB, custom) are registered in this registry and exposed at /actuator/prometheus in Prometheus text format.`,
  example: {
    title: 'Monitoring Setup',
    description: 'Custom metrics, Prometheus configuration, and distributed tracing.',
    code: [
      {
        label: 'Custom Business Metrics',
        language: 'java',
        code: `@Service
@RequiredArgsConstructor
public class OrderMetricsService {

    private final MeterRegistry meterRegistry;

    // Counter: total orders created
    public void recordOrderCreated(String region, String paymentMethod) {
        meterRegistry.counter("orders.created",
            "region", region,
            "payment_method", paymentMethod
        ).increment();
    }

    // Timer: order processing duration
    public void recordOrderProcessingTime(Duration duration, OrderStatus finalStatus) {
        meterRegistry.timer("orders.processing.duration",
            "status", finalStatus.name()
        ).record(duration);
    }

    // Gauge: current pending orders count
    public void registerPendingOrdersGauge(OrderRepository orderRepository) {
        Gauge.builder("orders.pending.count",
                orderRepository,
                repo -> repo.countByStatus(OrderStatus.PENDING))
            .description("Number of orders in PENDING status")
            .register(meterRegistry);
    }

    // Distribution summary: order value distribution
    public void recordOrderValue(BigDecimal amount) {
        meterRegistry.summary("orders.value",
            "currency", "USD"
        ).record(amount.doubleValue());
    }
}

// Usage in service:
@Service
@Timed("order.service.place")  // Auto-times this method
public class OrderService {
    public Order placeOrder(CreateOrderRequest request) {
        long start = System.currentTimeMillis();
        try {
            Order order = processOrder(request);
            metricsService.recordOrderCreated(request.getRegion(), request.getPaymentMethod());
            return order;
        } finally {
            metricsService.recordOrderProcessingTime(
                Duration.ofMillis(System.currentTimeMillis() - start),
                OrderStatus.CONFIRMED);
        }
    }
}`,
      },
      {
        label: 'Prometheus + Tracing Config',
        language: 'yaml',
        code: `# pom.xml dependencies:
# micrometer-registry-prometheus
# micrometer-tracing-bridge-brave (or otel)
# zipkin-reporter-brave

management:
  metrics:
    tags:
      application: \${spring.application.name}  # tag all metrics
      environment: \${spring.profiles.active:default}
    distribution:
      percentiles-histogram:
        http.server.requests: true  # enable histogram for latency percentiles
      percentiles:
        http.server.requests: 0.5, 0.95, 0.99

  tracing:
    sampling:
      probability: 0.1  # Sample 10% of requests in production
    # probability: 1.0  # 100% in dev

spring:
  zipkin:
    base-url: http://zipkin:9411  # Zipkin server URL
    enabled: true`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Micrometer vs Micrometer Tracing — what is the difference?',
      answer: 'Micrometer is for metrics (counters, gauges, timers). Micrometer Tracing (formerly Spring Cloud Sleuth) is for distributed tracing (trace IDs, spans, request journeys). Both are part of the Micrometer project. Spring Boot 3.x includes both. Add micrometer-tracing-bridge-brave for Zipkin compatibility.',
    },
    {
      question: 'What is the difference between a counter, gauge, and timer?',
      answer: 'Counter: monotonically increasing number (total requests, total errors). Gauge: current value that can go up or down (active connections, queue size, heap usage). Timer: measures duration and count of events (HTTP request latency, DB query time). Distribution summary: like timer but for non-time values (order amounts, file sizes).',
    },
  ],
  productionIssues: [
    'Too many metric tags causing cardinality explosion — never use userId or orderId as a tag',
    'Tracing sampling too high (100%) causing performance overhead in high-traffic production',
    '/actuator/prometheus exposed publicly — restrict to monitoring network',
  ],
  bestPractices: [
    'Tag all metrics with application name and environment',
    'Use low-cardinality tags (status, region, method) — never userId or requestId',
    'Set tracing sampling to 10-20% in production — not 100%',
    'Create Grafana dashboards for RED metrics: Rate, Errors, Duration',
    'Alert on error rate and p99 latency thresholds',
  ],
  architectNote: `The RED method is the standard for microservice monitoring: Rate (requests per second), Errors (error rate), Duration (latency percentiles). Create a Grafana dashboard with these three metrics for every service. Add USE metrics for infrastructure: Utilization, Saturation, Errors for CPU, memory, and DB connections. These 6 metrics tell you 90% of what you need to know about service health.`,
  faqs: [
    {
      question: 'How do I create a Grafana dashboard for Spring Boot?',
      answer: 'Import Grafana dashboard ID 4701 (JVM Micrometer) and 12900 (Spring Boot Statistics) from Grafana.com. These pre-built dashboards show JVM metrics, HTTP metrics, and database metrics out of the box. Customize with your business metrics on top.',
    },
  ],
  keyTakeaways: [
    'Micrometer is the metrics facade — add micrometer-registry-prometheus for Prometheus',
    'Auto-configured metrics: JVM, HTTP requests, HikariCP pool, cache',
    'Custom metrics: counter (totals), gauge (current values), timer (durations)',
    'Never use high-cardinality values (userId) as metric tags',
    'Micrometer Tracing adds distributed tracing — set sampling to 10% in production',
    'RED metrics: Rate, Errors, Duration — the essential service health indicators',
  ],
  relatedTopics: ['spring-actuator', 'spring-logging', 'spring-profiles'],
};
