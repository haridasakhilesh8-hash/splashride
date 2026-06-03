import type { TopicContent } from '../../types';

export const springServiceCommunication: TopicContent = {
  slug: 'spring-service-communication',
  title: 'Service Communication',
  description: 'Master inter-service communication in Spring Boot microservices — RestTemplate, WebClient, OpenFeign, and patterns for resilient service-to-service HTTP calls.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Microservices communicate via HTTP (synchronous) or messaging (asynchronous). For HTTP calls, use OpenFeign (declarative REST client) or WebClient (reactive). RestTemplate is deprecated. OpenFeign lets you define a REST client as an interface — Spring generates the implementation. Add Resilience4j for circuit breaking and retry.',
  whatIsIt: `Service communication in microservices happens via:

**Synchronous (HTTP):**
- \`OpenFeign\` — declarative REST client (interface-based, Spring Cloud)
- \`WebClient\` — reactive, non-blocking HTTP client (Spring WebFlux)
- \`RestClient\` — new in Spring Boot 3.2, synchronous replacement for RestTemplate
- \`RestTemplate\` — deprecated since Spring 5.0

**Asynchronous (Messaging):**
- Kafka (high throughput event streaming)
- RabbitMQ (traditional message queue)
- AWS SQS/SNS (cloud messaging)

**Resilience patterns:**
- Circuit Breaker (Resilience4j) — stop calling a failing service
- Retry — retry on transient failures
- Timeout — don\'t wait forever
- Bulkhead — limit concurrent calls`,
  whyWeNeedIt: `In a microservices architecture, services must call each other. Doing this reliably requires: connection pooling, timeouts, retries, circuit breaking, and service discovery. Without these, one slow service can cascade failures across the entire system.`,
  realWorldUsage: `Order service calling Payment service, Inventory service, and Notification service. API Gateway calling downstream services. Reporting service aggregating data from multiple services.`,
  howItWorks: `OpenFeign generates a proxy implementation of your interface at startup. Each method call translates to an HTTP request using the configured URL, method, headers, and body. Resilience4j wraps the calls with circuit breakers and retry logic.`,
  example: {
    title: 'Service Communication Patterns',
    description: 'OpenFeign client with circuit breaker and retry.',
    code: [
      {
        label: 'OpenFeign Client',
        language: 'java',
        code: `// Enable Feign in main class or config
@EnableFeignClients
@SpringBootApplication
public class OrderServiceApplication { ... }

// Feign client — interface only, Spring generates implementation
@FeignClient(
    name = "payment-service",
    url = "\${services.payment.url}",
    fallback = PaymentServiceFallback.class  // fallback on failure
)
public interface PaymentServiceClient {

    @PostMapping("/api/v1/payments")
    PaymentResponse processPayment(@RequestBody PaymentRequest request);

    @GetMapping("/api/v1/payments/{paymentId}")
    PaymentResponse getPayment(@PathVariable String paymentId);

    @DeleteMapping("/api/v1/payments/{paymentId}")
    void refundPayment(@PathVariable String paymentId);
}

// Fallback for circuit breaker
@Component
public class PaymentServiceFallback implements PaymentServiceClient {

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        throw new ServiceUnavailableException("Payment service is unavailable");
    }

    @Override
    public PaymentResponse getPayment(String paymentId) {
        return PaymentResponse.unknown(paymentId);
    }

    @Override
    public void refundPayment(String paymentId) {
        // Log for retry queue
        log.error("Refund failed for payment {}, queued for retry", paymentId);
    }
}

// Usage in service:
@Service
public class OrderService {
    private final PaymentServiceClient paymentClient;

    @CircuitBreaker(name = "payment-service", fallbackMethod = "paymentFallback")
    @Retry(name = "payment-service")
    @TimeLimiter(name = "payment-service")
    public PaymentResponse chargeOrder(Order order) {
        return paymentClient.processPayment(PaymentRequest.from(order));
    }
}`,
      },
      {
        label: 'WebClient (Reactive)',
        language: 'java',
        code: `@Configuration
public class WebClientConfig {

    @Bean
    public WebClient paymentWebClient(
            @Value("\${services.payment.url}") String baseUrl) {
        return WebClient.builder()
            .baseUrl(baseUrl)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .filter(ExchangeFilterFunctions.basicAuthentication("service", "secret"))
            .codecs(c -> c.defaultCodecs().maxInMemorySize(2 * 1024 * 1024))
            .build();
    }
}

@Service
public class PaymentService {
    private final WebClient paymentWebClient;

    public Mono<PaymentResponse> processPayment(PaymentRequest request) {
        return paymentWebClient.post()
            .uri("/api/v1/payments")
            .bodyValue(request)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, response ->
                response.bodyToMono(ErrorResponse.class)
                    .flatMap(error -> Mono.error(
                        new PaymentException(error.getMessage()))))
            .onStatus(HttpStatusCode::is5xxServerError, response ->
                Mono.error(new ServiceUnavailableException("Payment service error")))
            .bodyToMono(PaymentResponse.class)
            .timeout(Duration.ofSeconds(10))
            .retry(2);
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'OpenFeign vs WebClient vs RestClient — which to use?',
      answer: 'OpenFeign for most microservice HTTP calls — declarative, clean, integrates with Eureka for service discovery. WebClient for reactive/non-blocking calls or when using WebFlux. RestClient (Spring Boot 3.2+) for synchronous calls without Feign\'s complexity. Avoid RestTemplate — it\'s deprecated.',
    },
    {
      question: 'What is a circuit breaker and when does it open?',
      answer: 'A circuit breaker monitors calls to a service. When failures exceed a threshold (e.g., 50% failure rate in 10 calls), the circuit "opens" — subsequent calls immediately fail without trying the service. After a wait period, it enters "half-open" state and tries one request. If successful, the circuit closes. This prevents cascade failures.',
    },
  ],
  productionIssues: [
    'No timeout configured — one slow downstream service blocks all threads',
    'No circuit breaker — cascade failure takes down the entire system',
    'Retry without idempotency check — retrying a payment creates duplicate charges',
    'Service URL hardcoded instead of using service discovery',
  ],
  bestPractices: [
    'Always set timeouts on outbound HTTP calls',
    'Use circuit breakers (Resilience4j) for all service-to-service calls',
    'Only retry idempotent operations (GET, PUT) — never retry POST without idempotency key',
    'Use service discovery (Eureka) instead of hardcoded URLs',
    'Log all outbound calls with request ID for distributed tracing',
  ],
  architectNote: `The most dangerous microservices anti-pattern is synchronous call chains: Service A calls B calls C calls D. If D is slow, A is slow. Use async messaging (Kafka/RabbitMQ) for operations that don\'t need an immediate response. Reserve synchronous HTTP for queries that need real-time data. The Saga pattern handles distributed transactions across services without synchronous chains.`,
  faqs: [
    {
      question: 'How do I pass the JWT token between microservices?',
      answer: 'Forward the Authorization header using Feign RequestInterceptor: implement RequestInterceptor and add the token from the current SecurityContext to every outbound Feign request. Or use Spring Cloud\'s SecurityContextHolder propagation. The receiving service validates the JWT as normal.',
    },
  ],
  keyTakeaways: [
    'OpenFeign is the preferred synchronous HTTP client for microservices',
    'WebClient for reactive/non-blocking calls',
    'RestTemplate is deprecated — use RestClient (Boot 3.2+) or WebClient',
    'Always configure timeouts and circuit breakers on outbound calls',
    'Only retry idempotent operations',
    'Prefer async messaging over synchronous call chains for non-critical operations',
  ],
  relatedTopics: ['spring-api-gateway', 'spring-service-discovery', 'spring-config-server'],
};
