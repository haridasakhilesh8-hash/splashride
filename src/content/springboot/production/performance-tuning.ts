import type { TopicContent } from '../../types';

export const springPerformanceTuning: TopicContent = {
  slug: 'spring-performance-tuning',
  title: 'Performance Tuning',
  description: 'Optimize Spring Boot application performance — JVM tuning, connection pool sizing, caching, async processing, virtual threads, and common performance anti-patterns.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Boot performance starts with measuring, not guessing. Profile first with Actuator metrics and APM tools. Common wins: add database indexes, enable caching (@Cacheable), use async processing (@Async), fix N+1 queries, tune HikariCP pool size, and use virtual threads (Java 21). Never optimize without measuring.',
  whatIsIt: `Performance tuning in Spring Boot covers multiple layers:

**Application layer:**
- Caching with @Cacheable
- Async processing with @Async
- Lazy loading vs eager loading
- Pagination for large datasets

**Database layer:**
- Index optimization
- N+1 query elimination
- Connection pool tuning
- Read replicas
- Query optimization

**JVM layer:**
- Heap size tuning (-Xmx, -Xms)
- GC algorithm selection
- Virtual threads (Java 21)
- GraalVM native compilation

**Infrastructure layer:**
- Horizontal scaling
- Load balancing
- CDN for static assets
- Async messaging for non-critical operations`,
  whyWeNeedIt: `Untuned Spring Boot applications can handle 100 requests/second. Well-tuned ones handle 10,000+. The difference is usually: missing indexes, N+1 queries, no caching, and synchronous operations that should be async. Performance tuning is the difference between a service that crashes under load and one that scales gracefully.`,
  realWorldUsage: `Common performance wins in enterprise Spring Boot:
1. Add index on queried column: 10s query → 10ms
2. Fix N+1 with JOIN FETCH: 100 queries → 1 query
3. Add @Cacheable on product catalog: 10ms DB call → 0.1ms cache hit
4. Make email sending @Async: 500ms response → 50ms response
5. Virtual threads (Java 21): 200 concurrent requests → 10,000+`,
  howItWorks: `Performance optimization is a cycle: measure → identify bottleneck → fix → measure. Use Actuator metrics to identify slow endpoints, APM tools (Dynatrace, New Relic) to trace slow requests, and EXPLAIN ANALYZE in the database to identify slow queries.`,
  example: {
    title: 'Performance Optimization Techniques',
    description: 'Caching, async processing, and virtual threads.',
    code: [
      {
        label: 'Caching with @Cacheable',
        language: 'java',
        code: `@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .disableCachingNullValues()
            .serializeValuesWith(
                RedisSerializationContext.SerializationPair
                    .fromSerializer(new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .withCacheConfiguration("products",
                config.entryTtl(Duration.ofHours(1)))  // products cached 1 hour
            .withCacheConfiguration("user-sessions",
                config.entryTtl(Duration.ofMinutes(30)))
            .build();
    }
}

@Service
public class ProductService {

    // Cache result — subsequent calls return cached value without DB
    @Cacheable(value = "products", key = "#id")
    public ProductDto getProduct(Long id) {
        return productRepository.findById(id)  // Only called on cache miss
            .map(ProductDto::from)
            .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }

    // Evict cache when product is updated
    @CacheEvict(value = "products", key = "#id")
    @Transactional
    public ProductDto updateProduct(Long id, UpdateProductRequest request) {
        // Cache cleared — next getProduct call hits DB
        return productRepository.findById(id)
            .map(p -> { p.update(request); return productRepository.save(p); })
            .map(ProductDto::from)
            .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }
}`,
      },
      {
        label: 'Async Processing',
        language: 'java',
        code: `@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean("taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }
}

@Service
public class NotificationService {

    // Runs in separate thread — caller doesn't wait
    @Async("taskExecutor")
    public CompletableFuture<Void> sendWelcomeEmail(User user) {
        try {
            emailClient.send(user.getEmail(), "Welcome!", buildWelcomeEmail(user));
            return CompletableFuture.completedFuture(null);
        } catch (Exception e) {
            log.error("Failed to send welcome email to {}", user.getEmail(), e);
            return CompletableFuture.failedFuture(e);
        }
    }
}

// Virtual Threads (Java 21 + Spring Boot 3.2)
// application.properties:
// spring.threads.virtual.enabled=true
// This enables virtual threads for Tomcat — handles 10,000+ concurrent requests
// without changing any application code!`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I add caching to everything?',
      answer: 'No. Cache only data that is: read frequently, expensive to compute, and acceptable to be slightly stale. Don\'t cache: user-specific data that changes frequently, financial data that must be real-time, or data with complex invalidation rules. Incorrect caching causes stale data bugs that are hard to debug.',
    },
    {
      question: 'What are virtual threads and should I use them?',
      answer: 'Virtual threads (Java 21, Project Loom) are lightweight threads managed by the JVM, not the OS. Tomcat can handle 10,000+ concurrent requests with virtual threads vs 200 with platform threads. Enable with spring.threads.virtual.enabled=true in Spring Boot 3.2+. Use them — it\'s a free performance upgrade for I/O-bound applications.',
    },
  ],
  productionIssues: [
    'Cache stampede: many requests hitting DB simultaneously when cache expires — use probabilistic early expiration',
    'Cache poisoning: caching error responses — use disableCachingNullValues() and don\'t cache exceptions',
    '@Async methods swallowing exceptions silently — always return CompletableFuture and handle failures',
    'Thread pool exhaustion from @Async — monitor pool queue size and tune accordingly',
  ],
  bestPractices: [
    'Measure before optimizing — use Actuator metrics and APM tools',
    'Fix database issues first (indexes, N+1) — biggest wins',
    'Add caching for expensive, frequently-read, stable data',
    'Use @Async for non-critical operations (email, notifications, logging)',
    'Enable virtual threads on Java 21 — free performance improvement',
    'Profile with realistic load, not just unit tests',
  ],
  architectNote: `The 80/20 rule of Spring Boot performance: 80% of performance issues come from database problems. Before tuning JVM or adding caching, check your queries. Enable slow query logging (log queries > 100ms), run EXPLAIN ANALYZE on slow queries, add missing indexes. A single missing index fix can improve performance 100x. Only then consider caching and async processing.`,
  faqs: [
    {
      question: 'How do I identify slow endpoints in production?',
      answer: 'Use Actuator HTTP metrics: GET /actuator/metrics/http.server.requests?tag=uri:/api/v1/orders to see count, total time, and max time for each endpoint. Or configure Micrometer to export to Prometheus and create Grafana dashboards showing p99 latency by endpoint. APM tools (Dynatrace, New Relic) provide even more detail.',
    },
    {
      question: 'What JVM flags should I use for a Spring Boot production service?',
      answer: 'Baseline: -Xms512m -Xmx2g -XX:+UseG1GC -XX:MaxGCPauseMillis=200. For Java 21: add -XX:+UseZGC for lower GC pauses. Enable GC logging: -Xlog:gc*:file=gc.log:time. Set -Dfile.encoding=UTF-8. In containers: -XX:+UseContainerSupport automatically uses container memory limits.',
    },
  ],
  keyTakeaways: [
    'Measure first — never optimize without data',
    'Database optimization (indexes, N+1 fixes) gives the biggest gains',
    '@Cacheable reduces DB load for frequently-read stable data',
    '@Async offloads non-critical work to background threads',
    'Virtual threads (Java 21) dramatically increase concurrency for I/O-bound apps',
    'Enable spring.threads.virtual.enabled=true in Spring Boot 3.2+ for free throughput gains',
  ],
  relatedTopics: ['spring-actuator', 'spring-monitoring', 'spring-data-jpa', 'spring-transactions'],
};
