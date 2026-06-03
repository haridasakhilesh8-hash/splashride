import type { TopicContent } from '../../types';

export const springApiGateway: TopicContent = {
  slug: 'spring-api-gateway',
  title: 'API Gateway',
  description: 'Implement an API Gateway with Spring Cloud Gateway — the single entry point for all microservices that handles routing, authentication, rate limiting, and cross-cutting concerns.',
  applicableVersions: ['Spring Boot 3.x', 'Spring Cloud 2023.x', 'Spring Cloud Gateway'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'An API Gateway is the single entry point for all client requests. It routes requests to the right microservice, validates JWTs, applies rate limiting, handles CORS, and aggregates responses. Spring Cloud Gateway is the reactive, non-blocking replacement for Netflix Zuul. Define routes in application.yml or Java DSL.',
  whatIsIt: `Spring Cloud Gateway is a reactive API Gateway built on Spring WebFlux.

**What an API Gateway does:**
- **Routing** — forward /api/orders/** to order-service
- **Authentication** — validate JWT before forwarding
- **Rate limiting** — limit requests per client
- **Load balancing** — distribute across service instances
- **SSL termination** — HTTPS at the gateway, HTTP internally
- **Request/Response transformation** — add/remove headers
- **Circuit breaking** — fallback if service is down
- **Logging & tracing** — add correlation IDs

**Key concepts:**
- **Route** — a rule: if predicate matches, apply filters and forward
- **Predicate** — matches conditions (path, method, header, host)
- **Filter** — modifies request/response (add header, rate limit, auth)`,
  whyWeNeedIt: `Without a gateway, clients must know about every microservice and call them directly. Cross-cutting concerns (auth, rate limiting, logging) must be duplicated in every service. The gateway centralizes these concerns and provides a unified API surface.`,
  realWorldUsage: `Enterprise gateway setup:
- Single public URL: api.company.com
- Routes to: order-service, product-service, user-service, payment-service
- JWT validation at gateway — downstream services trust the gateway
- Rate limiting per API key
- Circuit breaker to fallback page if service is down`,
  howItWorks: `Spring Cloud Gateway is built on Netty and WebFlux — fully reactive, non-blocking. Each request is matched against routes in order. The first matching route\'s filters are applied, then the request is forwarded. Filters can be global (apply to all routes) or per-route.`,
  example: {
    title: 'API Gateway Configuration',
    description: 'Route configuration, JWT filter, and rate limiting.',
    code: [
      {
        label: 'application.yml Routes',
        language: 'yaml',
        code: `spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://order-service  # lb:// = load balanced via Eureka
          predicates:
            - Path=/api/v1/orders/**
          filters:
            - StripPrefix=0
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 100
                redis-rate-limiter.burstCapacity: 200
                key-resolver: "#{@userKeyResolver}"

        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/v1/products/**
          filters:
            - name: CircuitBreaker
              args:
                name: product-service
                fallbackUri: forward:/fallback/products

        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/api/v1/users/**

      # Global filters applied to all routes
      default-filters:
        - AddRequestHeader=X-Gateway-Source, api-gateway
        - name: Retry
          args:
            retries: 3
            statuses: BAD_GATEWAY,SERVICE_UNAVAILABLE`,
      },
      {
        label: 'JWT Global Filter',
        language: 'java',
        code: `@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class JwtGlobalFilter implements GlobalFilter {

    private final JwtService jwtService;

    private static final List<String> PUBLIC_PATHS = List.of(
        "/api/v1/auth/login",
        "/api/v1/auth/register",
        "/actuator/health"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().value();

        // Skip auth for public paths
        if (PUBLIC_PATHS.stream().anyMatch(path::startsWith)) {
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest()
            .getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        try {
            String username = jwtService.extractUsername(token);
            List<String> roles = jwtService.extractRoles(token);

            // Add user info as headers for downstream services
            ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                .header("X-User-Id", jwtService.extractUserId(token).toString())
                .header("X-Username", username)
                .header("X-User-Roles", String.join(",", roles))
                .build();

            return chain.filter(exchange.mutate().request(mutatedRequest).build());

        } catch (JwtException e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Spring Cloud Gateway vs Netflix Zuul — which to use?',
      answer: 'Spring Cloud Gateway for new projects. Zuul 1.x is blocking (servlet-based) and Netflix stopped active development. Spring Cloud Gateway is reactive (Netty-based), non-blocking, and actively maintained. Zuul 2.x is also non-blocking but has much less Spring integration. Spring Cloud Gateway is the standard choice.',
    },
    {
      question: 'Should I validate JWT in the gateway or in each service?',
      answer: 'Validate in the gateway, trust in the services. The gateway validates the JWT signature and expiry, then adds user info as headers (X-User-Id, X-Username, X-Roles). Downstream services trust these headers (they come from the internal network, not the client). This avoids each service needing the JWT secret and reduces latency.',
    },
  ],
  productionIssues: [
    'Gateway becoming a single point of failure — deploy multiple gateway instances behind a load balancer',
    'Rate limiting state not shared — use Redis-backed rate limiter for distributed rate limiting',
    'Large request bodies causing memory issues in gateway — configure max body size',
  ],
  bestPractices: [
    'Deploy multiple gateway instances — never a single point of failure',
    'Use Redis for distributed rate limiting state',
    'Log all requests at the gateway with correlation IDs',
    'Validate JWT at the gateway, pass user info as trusted headers to services',
    'Use circuit breakers with fallback responses for all routes',
  ],
  architectNote: `The API Gateway is the boundary between the public internet and your internal services. Everything that crosses this boundary should be authenticated, rate limited, and logged. Keep the gateway thin — it should route and apply cross-cutting concerns, not contain business logic. Business logic in the gateway becomes a bottleneck and couples all services to it.`,
  faqs: [
    {
      question: 'How do I handle CORS in a microservices architecture?',
      answer: 'Configure CORS at the API Gateway only. Downstream services don\'t need CORS config because requests come from the gateway (same origin). Add a CORS GlobalFilter in the gateway that sets Access-Control-Allow-Origin headers. Never configure CORS in both the gateway and individual services — it causes conflicts.',
    },
  ],
  keyTakeaways: [
    'API Gateway is the single entry point for all client requests',
    'Spring Cloud Gateway is reactive (Netty-based), not blocking like Zuul',
    'Routes defined by predicates (path, method) and processed by filters',
    'Validate JWT at the gateway; pass user info as trusted headers to services',
    'Use Redis-backed rate limiting for distributed rate limiting',
    'Deploy multiple gateway instances — never a single point of failure',
  ],
  relatedTopics: ['spring-service-discovery', 'spring-config-server', 'spring-service-communication'],
};
