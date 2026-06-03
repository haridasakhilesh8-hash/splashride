import type { TopicContent } from '../../types';

export const springLogging: TopicContent = {
  slug: 'spring-logging',
  title: 'Logging',
  description: 'Master structured logging in Spring Boot — Logback configuration, SLF4J, MDC for request tracing, log levels, and production logging best practices.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Boot uses Logback by default with SLF4J as the facade. Use @Slf4j (Lombok) or LoggerFactory.getLogger() to get a logger. Set log levels in application.properties: logging.level.com.company=DEBUG. In production, use structured JSON logging (Logstash encoder) so logs can be parsed by ELK/Splunk. Add MDC for request correlation IDs.',
  whatIsIt: `Spring Boot\'s logging stack:
- **SLF4J** — the logging facade (API you code against)
- **Logback** — the default implementation
- **Log4j2** — alternative implementation (better async performance)
- **Lombok @Slf4j** — generates the logger field automatically

**Log levels (in order of severity):**
- TRACE — extremely detailed (method entry/exit)
- DEBUG — developer debugging
- INFO — significant events (startup, key operations)
- WARN — unexpected but recoverable situations
- ERROR — errors that need attention

**MDC (Mapped Diagnostic Context):**
Thread-local key-value store that Logback includes in every log line from that thread. Use for: request ID, user ID, trace ID, tenant ID.`,
  whyWeNeedIt: `Good logging is essential for production operations:
- Debugging production issues without attaching a debugger
- Tracing a request across multiple services
- Auditing user actions
- Alerting on error patterns
- Performance analysis`,
  realWorldUsage: `Production logging setup:
- JSON structured logs sent to ELK (Elasticsearch/Logstash/Kibana) or Splunk
- MDC with requestId, userId, traceId on every log line
- ERROR logs trigger PagerDuty alerts
- Log levels changed at runtime via Actuator without restart`,
  howItWorks: `SLF4J is a facade — your code calls SLF4J API, which delegates to the actual implementation (Logback). This means you can switch from Logback to Log4j2 without changing any application code. Logback\'s PatternLayout or LogstashEncoder formats each log event into the output format.`,
  example: {
    title: 'Production Logging Setup',
    description: 'Structured JSON logging with MDC and request correlation.',
    code: [
      {
        label: 'Logging in Services',
        language: 'java',
        code: `@Service
@Slf4j  // Lombok generates: private static final Logger log = LoggerFactory.getLogger(OrderService.class);
public class OrderService {

    public OrderDetailDto placeOrder(CreateOrderRequest request, String userId) {
        log.info("Placing order for user {} with {} items",
            userId, request.getItems().size());

        try {
            Order order = orderRepository.save(Order.from(request));
            log.info("Order {} created successfully for user {}",
                order.getOrderNumber(), userId);

            paymentService.charge(order);
            log.debug("Payment processed for order {}", order.getOrderNumber());

            return OrderDetailDto.from(order);

        } catch (PaymentException e) {
            log.error("Payment failed for order request from user {}: {}",
                userId, e.getMessage(), e);  // include exception for stack trace
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error placing order for user {}", userId, e);
            throw new RuntimeException("Order placement failed", e);
        }
    }
}`,
      },
      {
        label: 'MDC Request Correlation Filter',
        language: 'java',
        code: `@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain chain)
            throws ServletException, IOException {

        // Set MDC values — included in every log line from this thread
        String requestId = Optional.ofNullable(
            request.getHeader("X-Request-Id"))
            .orElse(UUID.randomUUID().toString());

        MDC.put("requestId", requestId);
        MDC.put("method", request.getMethod());
        MDC.put("path", request.getRequestURI());

        // Set correlation ID in response header
        response.setHeader("X-Request-Id", requestId);

        long startTime = System.currentTimeMillis();
        try {
            chain.doFilter(request, response);
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            MDC.put("duration", String.valueOf(duration));
            MDC.put("status", String.valueOf(response.getStatus()));

            log.info("{} {} {} {}ms",
                request.getMethod(),
                request.getRequestURI(),
                response.getStatus(),
                duration);

            MDC.clear();  // MUST clear MDC to prevent thread pool leaks
        }
    }
}`,
      },
      {
        label: 'logback-spring.xml (JSON for Production)',
        language: 'xml',
        code: `<!-- src/main/resources/logback-spring.xml -->
<configuration>

    <!-- Development: human-readable -->
    <springProfile name="dev">
        <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
            <encoder>
                <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            </encoder>
        </appender>
        <root level="INFO">
            <appender-ref ref="CONSOLE" />
        </root>
        <logger name="com.company" level="DEBUG" />
    </springProfile>

    <!-- Production: structured JSON -->
    <springProfile name="prod">
        <appender name="JSON_CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
            <encoder class="net.logstash.logback.encoder.LogstashEncoder">
                <includeMdcKeyName>requestId</includeMdcKeyName>
                <includeMdcKeyName>userId</includeMdcKeyName>
                <includeMdcKeyName>traceId</includeMdcKeyName>
            </encoder>
        </appender>
        <root level="INFO">
            <appender-ref ref="JSON_CONSOLE" />
        </root>
    </springProfile>

</configuration>`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why use SLF4J instead of Log4j or Logback directly?',
      answer: 'SLF4J is a facade — your code is decoupled from the implementation. You can switch from Logback to Log4j2 without changing a single line of application code. Libraries should always use SLF4J so applications can choose their logging implementation. Always code against SLF4J, never against Logback or Log4j directly.',
    },
    {
      question: 'What is the performance impact of logging?',
      answer: 'String concatenation in log statements is evaluated even if the log level is disabled. Use parameterized logging: log.debug("User {}", userId) instead of log.debug("User " + userId). The {} placeholder is only resolved if DEBUG is enabled. Alternatively, wrap with if (log.isDebugEnabled()) for expensive computations.',
    },
  ],
  productionIssues: [
    'MDC not cleared after request — thread pool reuse causes MDC values from previous requests to leak',
    'Logging sensitive data (passwords, tokens, PII) — never log passwords, tokens, or personal data',
    'Log4Shell vulnerability (Log4j 2.x) — Spring Boot uses Logback by default, not affected; if using Log4j2, keep it updated',
    'Verbose DEBUG logging in production causing performance issues and disk fill',
  ],
  bestPractices: [
    'Use structured JSON logging in production for machine-parseable logs',
    'Add MDC with requestId, userId, traceId on every request',
    'Always clear MDC in a finally block',
    'Use parameterized logging: log.info("User {}", id) not string concatenation',
    'Never log passwords, tokens, or PII',
    'Change log levels at runtime via Actuator: POST /actuator/loggers/com.company {"configuredLevel": "DEBUG"}',
  ],
  architectNote: `In microservices, distributed tracing (Micrometer Tracing / Zipkin / Jaeger) is more valuable than individual service logs. Distributed tracing adds a traceId that follows a request across all services. Every log line includes the traceId — you can see the complete journey of a request across 10 services in one query. Spring Boot 3.x includes Micrometer Tracing auto-configuration.`,
  faqs: [
    {
      question: 'How do I change log levels at runtime without restarting?',
      answer: 'Use Spring Boot Actuator: POST /actuator/loggers/com.company.orderservice with body {"configuredLevel": "DEBUG"}. This changes the log level immediately for that logger. Changes are lost on restart. For permanent changes, update application.properties and redeploy.',
    },
  ],
  keyTakeaways: [
    'SLF4J is the facade; Logback is the default implementation in Spring Boot',
    'Use @Slf4j (Lombok) to avoid boilerplate logger declarations',
    'Use parameterized logging: log.info("User {}", id) for performance',
    'MDC enables per-request context in all log lines — always clear in finally',
    'Use JSON structured logging in production for ELK/Splunk ingestion',
    'Change log levels at runtime via Actuator without restart',
  ],
  relatedTopics: ['spring-profiles', 'spring-actuator', 'spring-monitoring'],
};
