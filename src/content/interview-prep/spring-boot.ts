import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { springBootInterviewPrepTopicGroups } from './topicNavigation';

type Intent = 'concept' | 'practical' | 'troubleshooting' | 'incident' | 'architecture';

interface TopicProfile {
  mechanism: string;
  implementation: string;
  failure: string;
  decision: string;
  incident: string;
  evidence: [string, string, string];
}

interface TopicSpec {
  category: string;
  topicGroup: string;
  concerns: string[];
  relatedTopics: string[];
}

const commonConcerns = [
  'runtime contract and ownership',
  'implementation choices and trade-offs',
  'security and failure behavior',
  'production diagnosis with measurable evidence',
  'enterprise governance and maintainability',
];

const categoryConcerns: Record<string, string[]> = {
  'Spring Framework Basics': ['Spring container responsibilities', 'inversion of control versus dependency injection', 'application context startup', 'proxy-based framework behavior', 'Spring modules and ownership boundaries', 'framework upgrade compatibility'],
  'Spring Boot Introduction': ['convention over configuration', 'embedded server lifecycle', 'production-ready defaults', 'Boot versus plain Spring Framework', 'Spring Boot 3 migration', 'Spring Boot 4 migration and compatibility', 'Java 17 baseline and Jakarta namespace'],
  'Spring Boot Architecture': ['layered service boundaries', 'configuration and bean graph ownership', 'web data and integration boundaries', 'modular monolith design', 'startup and runtime lifecycle', 'architecture fitness controls'],
  'Auto Configuration': ['conditional auto-configuration', 'back-off behavior', 'auto-configuration ordering', 'condition evaluation debugging', 'custom auto-configuration', 'Boot 3 auto-configuration imports'],
  'Starter Dependencies': ['starter dependency purpose', 'dependency management and BOMs', 'transitive dependency conflicts', 'custom enterprise starters', 'starter upgrade governance'],

  'IoC Container': ['bean definition registration', 'application context hierarchy', 'bean resolution and ambiguity', 'container startup failures', 'BeanFactory versus ApplicationContext', 'AOT container implications'],
  'Bean Lifecycle': ['instantiation initialization and destruction', 'BeanPostProcessor behavior', 'initialization callbacks', 'shutdown and graceful cleanup', 'proxy creation timing', 'lifecycle ordering defects'],
  'Bean Scopes': ['singleton and prototype semantics', 'request and session scopes', 'scoped proxies', 'scope mismatch defects', 'custom scopes', 'stateful bean concurrency risk'],
  'Dependency Injection': ['constructor injection', 'qualifiers and primary candidates', 'optional dependencies', 'circular dependency diagnosis', 'dependency inversion', 'injection testability'],
  'Component Scanning': ['scan boundaries', 'include and exclude filters', 'multi-module component discovery', 'duplicate bean registration', 'scan performance and startup', 'explicit imports versus scanning'],

  '@Component': ['generic stereotype semantics', 'component naming and discovery', 'component state and thread safety', 'component scope selection', 'component ownership'],
  '@Service': ['service-layer responsibility', 'transaction and orchestration boundaries', 'service proxy behavior', 'service decomposition', 'service testability'],
  '@Repository': ['repository stereotype and exception translation', 'data-access boundary ownership', 'repository proxy behavior', 'custom repository implementation', 'repository leakage into service contracts'],
  '@Controller': ['MVC controller responsibility', 'view versus API controller behavior', 'controller state safety', 'binding and validation boundaries', 'controller exception flow'],
  '@Configuration': ['configuration class proxy behavior', 'proxyBeanMethods trade-offs', 'configuration ordering', 'conditional configuration', 'configuration modularity'],
  '@Bean': ['explicit third-party bean creation', 'bean method dependencies', 'bean naming and overriding', 'conditional bean registration', 'bean lifecycle customization'],

  'Request Mapping': ['mapping resolution and specificity', 'HTTP method semantics', 'path variables and request parameters', 'content negotiation', 'API versioning', 'mapping conflict diagnosis'],
  'REST Controllers': ['request DTO and response contract design', 'status and error semantics', 'serialization boundaries', 'idempotent API behavior', 'controller-service separation', 'large payload handling'],
  'Request Lifecycle': ['DispatcherServlet processing', 'filters interceptors and controllers', 'argument resolution', 'message conversion', 'async request processing', 'request correlation'],
  Validation: ['Bean Validation boundaries', 'validation groups', 'cross-field validation', 'request versus domain validation', 'safe validation messages', 'validation performance'],
  'Exception Handling': ['ControllerAdvice error contracts', 'exception translation', 'Problem Details responses', 'retryable versus non-retryable failures', 'sensitive error disclosure', 'error observability'],

  'Spring Data JPA': ['repository proxy generation', 'derived query behavior', 'pagination and sorting', 'projections', 'repository transaction boundaries', 'repository customization', 'auditing'],
  Hibernate: ['persistence context and dirty checking', 'entity states', 'flush behavior', 'first and second-level cache', 'batching', 'Hibernate statistics and diagnostics'],
  'Entity Mapping': ['entity identity and equals', 'association ownership', 'cascade and orphan removal', 'fetch strategy', 'optimistic locking', 'inheritance mapping'],
  JPQL: ['entity-oriented query semantics', 'joins and fetch joins', 'projections and DTO queries', 'pagination limitations', 'bulk update behavior', 'query plan diagnosis'],
  'Native Queries': ['native query trade-offs', 'result mapping', 'database portability', 'pagination and count queries', 'SQL injection prevention', 'execution plan ownership'],
  Transactions: ['transaction boundaries', 'propagation behavior', 'isolation levels', 'rollback rules', 'proxy self-invocation trap', 'distributed transaction alternatives', 'long-running transaction risk'],

  'Spring Security': ['SecurityFilterChain architecture', 'default security posture', 'multiple filter chains', 'method security', 'CSRF and CORS', 'security debugging'],
  Authentication: ['authentication provider flow', 'credential storage', 'session versus stateless authentication', 'authentication failure handling', 'MFA integration', 'identity provider outage'],
  Authorization: ['request versus method authorization', 'resource-level authorization', 'deny-by-default policy', 'authorization manager design', 'tenant-aware authorization', 'negative access testing'],
  JWT: ['JWT validation and trust boundary', 'signature and key rotation', 'claims and authorization misuse', 'token expiry and revocation', 'JWT storage', 'resource server configuration'],
  OAuth2: ['authorization code flow', 'client credentials flow', 'resource server behavior', 'OAuth2 client integration', 'scope design', 'identity-provider failure handling'],
  'Role Based Access': ['role hierarchy design', 'roles versus permissions', 'method-level role enforcement', 'tenant-scoped roles', 'role explosion', 'audit and governance'],

  'Service Discovery': ['service registration and lookup', 'client-side discovery', 'discovery health and staleness', 'Kubernetes service discovery', 'discovery outage behavior', 'service identity'],
  'Config Server': ['centralized configuration ownership', 'secret separation', 'configuration refresh', 'configuration versioning', 'config server outage', 'environment drift'],
  'API Gateway': ['gateway routing ownership', 'authentication at gateway versus service', 'rate limiting', 'request transformation', 'gateway failure domain', 'gateway observability'],
  'Circuit Breaker': ['circuit breaker state machine', 'failure-rate thresholds', 'fallback design', 'bulkheads and timeouts', 'half-open recovery', 'circuit breaker telemetry'],
  'Feign Client': ['declarative client contracts', 'timeouts and retries', 'error decoding', 'client observability', 'interface evolution', 'Feign versus lower-level clients'],
  'Distributed Systems': ['distributed consistency', 'idempotency', 'timeouts retries and backoff', 'saga and compensation', 'partial failure handling', 'clock and ordering assumptions', 'distributed transaction trade-offs'],

  'Spring Cache': ['cache abstraction behavior', 'cache key design', 'cacheable condition and unless', 'cache eviction', 'self-invocation proxy trap', 'cache observability'],
  Redis: ['Redis data and expiration strategy', 'Redis serialization', 'distributed cache failure behavior', 'hot keys and memory pressure', 'Redis locking trade-offs', 'cluster topology'],
  'Cache Strategies': ['cache-aside strategy', 'write-through and write-behind', 'freshness and invalidation', 'stampede prevention', 'negative caching', 'multi-layer cache design'],

  Kafka: ['consumer groups and partitioning', 'offset commit strategy', 'at-least-once processing', 'idempotent consumers', 'dead-letter handling', 'consumer lag diagnosis', 'schema evolution'],
  RabbitMQ: ['exchange queue and binding design', 'acknowledgement and redelivery', 'prefetch and backpressure', 'dead-letter exchanges', 'publisher confirms', 'queue growth diagnosis'],
  'Event Driven Architecture': ['event versus command semantics', 'event contract evolution', 'outbox pattern', 'eventual consistency', 'consumer idempotency', 'event observability', 'replay governance'],

  'Unit Testing': ['unit boundary selection', 'mocking dependencies', 'testing service behavior', 'avoiding framework-heavy unit tests', 'test maintainability', 'mutation and edge-case coverage'],
  'Integration Testing': ['Spring context test scope', 'test slices versus full context', 'database and broker integration', 'test isolation', 'integration-test performance', 'production parity'],
  MockMvc: ['MVC contract testing', 'security filter testing', 'validation and error testing', 'content negotiation testing', 'MockMvc versus real server tests', 'async request testing'],
  Testcontainers: ['real dependency testing', 'container lifecycle reuse', 'dynamic property configuration', 'CI reliability', 'test data isolation', 'production-version parity'],

  'Performance Optimization': ['latency decomposition', 'allocation and CPU profiling', 'dependency latency', 'serialization cost', 'thread-pool saturation', 'performance regression gates'],
  'Connection Pooling': ['HikariCP sizing', 'connection acquisition timeout', 'leak detection', 'pool versus database capacity', 'transaction duration', 'pool exhaustion diagnosis'],
  'Lazy Loading': ['lazy proxy behavior', 'LazyInitializationException', 'open-session-in-view trade-offs', 'fetch boundary design', 'serialization of lazy relations', 'lazy loading performance'],
  'N+1 Problems': ['N+1 query mechanism', 'fetch join trade-offs', 'entity graphs', 'batch fetching', 'query-count testing', 'production N+1 diagnosis'],
  'JVM Performance': ['heap and GC behavior', 'virtual thread readiness', 'thread and executor sizing', 'JFR diagnostics', 'startup and warm-up', 'native image trade-offs'],

  'Spring Actuator': ['endpoint exposure', 'health groups and probes', 'custom health indicators', 'info and environment security', 'actuator in Kubernetes', 'actuator extension'],
  Logging: ['structured logging', 'correlation identifiers', 'safe logging and PII', 'log levels and sampling', 'exception logging ownership', 'logging cost'],
  Metrics: ['Micrometer meter design', 'counter timer and gauge selection', 'tag cardinality', 'business and technical metrics', 'histograms and percentiles', 'metric ownership'],
  Monitoring: ['SLI and SLO design', 'alert quality', 'dashboard ownership', 'dependency monitoring', 'synthetic and real traffic', 'capacity monitoring'],
  'Distributed Tracing': ['trace propagation', 'Micrometer Tracing and OpenTelemetry', 'sampling strategy', 'span design', 'trace-log-metric correlation', 'broken context propagation'],

  Docker: ['layered Spring Boot images', 'container memory awareness', 'non-root containers', 'buildpacks versus Dockerfiles', 'image vulnerability management', 'startup and shutdown'],
  Kubernetes: ['readiness liveness and startup probes', 'resource requests and limits', 'graceful shutdown', 'configuration and secrets', 'horizontal scaling', 'pod disruption behavior'],
  'CI/CD': ['pipeline quality gates', 'artifact promotion', 'database migration safety', 'canary and rollback', 'dependency and image scanning', 'native image pipeline'],
  'Environment Configuration': ['externalized configuration precedence', 'profiles and profile groups', 'secret management', 'configuration validation', 'environment drift', 'immutable deployment configuration'],

  'Memory Issues': ['heap retention', 'native and direct memory', 'ThreadLocal leaks', 'container OOM kills', 'heap dump diagnosis', 'memory regression containment'],
  'High CPU': ['hot method diagnosis', 'excessive garbage collection', 'runaway retries', 'lock contention', 'production-safe profiling', 'CPU incident mitigation'],
  'Slow APIs': ['request latency decomposition', 'downstream latency', 'thread-pool saturation', 'serialization and payload size', 'query latency', 'slow API incident response'],
  'Database Bottlenecks': ['slow query diagnosis', 'connection pool exhaustion', 'locking and deadlocks', 'transaction duration', 'database capacity', 'database incident containment'],
  'Production Incidents': ['incident triage', 'rollback versus forward fix', 'evidence preservation', 'dependency outage', 'configuration regression', 'post-incident prevention', 'operational ownership'],

  'Enterprise Spring Boot': ['platform standards and golden paths', 'service boundary governance', 'shared security and observability', 'Spring Boot upgrade operating model', 'team autonomy versus consistency', 'native image and AOT strategy'],
  Scalability: ['horizontal scaling', 'stateless service design', 'backpressure and capacity', 'database scaling', 'cache and messaging scale', 'cost-aware scaling'],
  'Security Design': ['zero-trust service security', 'identity and authorization boundaries', 'secret and key lifecycle', 'tenant isolation', 'security observability', 'threat modeling'],
  'High Availability': ['failure domains', 'redundancy and recovery', 'graceful degradation', 'safe deployments', 'dependency outage design', 'RTO and RPO'],
  'Resiliency Patterns': ['timeout budgets', 'retry with backoff and jitter', 'circuit breakers', 'bulkheads', 'rate limiting and load shedding', 'fallback correctness', 'resilience testing'],
};

const groupProfiles: Record<string, TopicProfile> = {
  Fundamentals: {
    mechanism: 'Spring Boot composes Spring Framework capabilities, dependency management, conditional configuration, embedded runtimes, and production conventions around an application context.',
    implementation: 'Keep application boundaries explicit, understand which behavior Boot contributes, and validate startup conditions plus runtime defaults across environments.',
    failure: 'a hidden default or upgrade assumption changes startup, security, serialization, or runtime behavior',
    decision: 'which convention Boot should own and which application or platform policy must remain explicit',
    incident: 'a Spring Boot 3 migration passes local tests but fails in production because an older namespace or default behavior remains',
    evidence: ['condition evaluation and startup report', 'dependency and configuration inventory', 'application logs and deployment checks'],
  },
  'Dependency Injection': {
    mechanism: 'The Spring container creates, wires, scopes, proxies, initializes, and destroys beans from explicit and discovered definitions.',
    implementation: 'Prefer constructor injection, narrow scan boundaries, make scope and lifecycle explicit, and fail startup on ambiguous or invalid wiring.',
    failure: 'a bean graph, scope mismatch, lifecycle callback, or proxy assumption creates startup failure or shared-state defects',
    decision: 'where dependency ownership and object lifecycle belong and which relationships remain explicit',
    incident: 'a release fails startup in one environment because component scanning registers two candidates for a critical dependency',
    evidence: ['bean definition and dependency graph', 'startup condition and failure report', 'focused context test'],
  },
  'Spring Core': {
    mechanism: 'Spring stereotypes and configuration annotations register beans and communicate architectural intent while proxy behavior may add framework capabilities.',
    implementation: 'Use the narrowest stereotype, keep beans stateless unless scope proves otherwise, and make proxy-dependent behavior testable.',
    failure: 'an annotation is treated as decoration while proxy, scope, exception translation, or discovery behavior is misunderstood',
    decision: 'which bean registration style communicates ownership and supports safe framework behavior',
    incident: 'a refactor moves a bean outside the scan boundary and production starts without a required implementation',
    evidence: ['application context bean inventory', 'proxy and annotation metadata', 'startup and focused integration test'],
  },
  'Spring MVC': {
    mechanism: 'Spring MVC routes HTTP requests through filters, DispatcherServlet, handler mapping, argument resolution, validation, controllers, message conversion, and exception handling.',
    implementation: 'Design stable HTTP contracts, validate untrusted input, keep controllers thin, and make error, timeout, and observability behavior explicit.',
    failure: 'a mapping, binding, serialization, or exception contract creates incorrect responses or hides the production cause',
    decision: 'which HTTP concern belongs at filter, interceptor, controller, service, or global error boundary',
    incident: 'a deployment increases 5xx responses because one DTO change breaks deserialization for a high-volume client',
    evidence: ['request trace and structured error', 'MockMvc or contract test', 'server timing and payload evidence'],
  },
  'Data Access': {
    mechanism: 'Spring Data JPA and Hibernate coordinate repository proxies, persistence contexts, entity mapping, queries, flushing, and transactions over database connections.',
    implementation: 'Define transaction and fetch boundaries deliberately, inspect generated SQL and plans, and align pool and database capacity with workload.',
    failure: 'an ORM or transaction assumption causes N+1 queries, lock contention, stale data, pool exhaustion, or incorrect writes',
    decision: 'which consistency, query, fetch, and transaction strategy meets correctness and latency goals',
    incident: 'API p99 latency rises from 250 ms to 4 s after a release multiplies queries per request',
    evidence: ['SQL and query-plan evidence', 'transaction and pool metrics', 'Hibernate statistics and request trace'],
  },
  Security: {
    mechanism: 'Spring Security applies authentication and authorization through ordered filter chains, security contexts, authorization managers, and method-level enforcement.',
    implementation: 'Deny by default, validate identity and resource authorization at server boundaries, rotate credentials safely, and test negative access paths.',
    failure: 'a broad matcher, trusted claim, missing method check, or leaked credential exposes protected data or actions',
    decision: 'where identity, authorization, token, session, and policy ownership belong',
    incident: 'an authenticated user invokes a resource operation belonging to another tenant',
    evidence: ['SecurityFilterChain and authorization trace', 'negative access and token validation tests', 'audit and identity-provider logs'],
  },
  Microservices: {
    mechanism: 'Spring microservices distribute data, configuration, routing, calls, and failure across independently deployed network boundaries.',
    implementation: 'Set timeout and retry budgets, preserve idempotency, isolate failures, design for partial availability, and observe every dependency call.',
    failure: 'an unbounded retry, stale discovery entry, shared dependency, or partial failure cascades across services',
    decision: 'where consistency, routing, resilience, ownership, and recovery belong across service boundaries',
    incident: 'one slow dependency causes retries and thread exhaustion across an entire customer journey',
    evidence: ['distributed trace and dependency metrics', 'timeout retry and circuit telemetry', 'service and deployment timeline'],
  },
  Caching: {
    mechanism: 'Spring caching separates method invocation from cache lookup while providers such as Redis own storage, expiration, topology, and failure behavior.',
    implementation: 'Define cache identity, freshness, invalidation, serialization, ownership, and fallback before adding a cache.',
    failure: 'a wrong key, stale entry, cache stampede, or provider outage returns incorrect data or overloads the source',
    decision: 'what may be cached, for whom, for how long, and who invalidates it',
    incident: 'cache hit ratio drops from 94 percent to 35 percent and database load triples after a release',
    evidence: ['cache key and hit-ratio metrics', 'source load and latency', 'eviction and provider telemetry'],
  },
  Messaging: {
    mechanism: 'Messaging decouples producers and consumers through durable broker contracts, acknowledgements, ordering, delivery semantics, and retry behavior.',
    implementation: 'Design idempotent consumers, versioned schemas, bounded retries, dead-letter handling, and observable lag or queue depth.',
    failure: 'duplicate, poison, reordered, or unbounded messages create incorrect state or growing backlog',
    decision: 'which delivery, ordering, consistency, retention, and recovery guarantees the workflow requires',
    incident: 'consumer lag grows for hours after a poison message repeatedly blocks one partition',
    evidence: ['consumer lag or queue-depth metrics', 'message key schema and offset evidence', 'retry and dead-letter telemetry'],
  },
  Testing: {
    mechanism: 'Spring tests range from isolated object tests to focused slices, full contexts, real HTTP servers, and containerized dependencies.',
    implementation: 'Match test scope to risk, keep context reuse efficient, use real infrastructure where behavior matters, and preserve deterministic isolation.',
    failure: 'mock-heavy or environment-different tests pass while production contracts, security, SQL, or broker behavior fails',
    decision: 'which behavior requires unit, slice, integration, contract, or end-to-end evidence',
    incident: 'a repository query passes mocked tests but fails against the production database dialect after deployment',
    evidence: ['test scope and dependency inventory', 'CI failure and timing data', 'production-parity contract evidence'],
  },
  Performance: {
    mechanism: 'Spring Boot performance is the interaction of HTTP processing, serialization, JVM, pools, database work, downstream calls, caching, and workload shape.',
    implementation: 'Start from user-facing latency and throughput, profile the dominant cost, tune bounded resources together, and guard regressions.',
    failure: 'a local optimization shifts pressure to threads, connections, GC, queries, or downstream dependencies',
    decision: 'which change improves the service-level objective without unacceptable capacity or complexity cost',
    incident: 'average latency improves while p99 doubles and connection acquisition time rises during peak traffic',
    evidence: ['JFR and request profile', 'pool query and dependency metrics', 'load-test percentile and throughput data'],
  },
  Observability: {
    mechanism: 'Spring Boot observability uses Actuator, Micrometer Observation, metrics, logs, and tracing to connect service behavior to user impact.',
    implementation: 'Define low-cardinality signals, propagate context, secure operational endpoints, and align alerts with service-level objectives.',
    failure: 'missing correlation, high-cardinality tags, unsafe endpoints, or noisy alerts hide a real incident or create operational cost',
    decision: 'which signals prove health, ownership, user impact, and recovery without excessive cardinality or exposure',
    incident: 'error rate rises but teams cannot identify the failing dependency because traces and logs lose context',
    evidence: ['metrics traces and structured logs', 'Actuator health and readiness state', 'alert and service-level objective history'],
  },
  Deployment: {
    mechanism: 'Cloud-native Spring Boot deployment packages a reviewed artifact into images and promotes it through environment configuration, orchestration, probes, and rollout controls.',
    implementation: 'Build immutable artifacts, run as non-root, validate resources and probes, separate secrets, and define canary plus rollback criteria.',
    failure: 'configuration drift, poor probes, unsafe migrations, or incorrect resource limits causes failed rollout or unstable pods',
    decision: 'how artifacts, configuration, secrets, database changes, health, and rollback are governed',
    incident: 'a Kubernetes rollout loops because readiness depends on a degraded optional service',
    evidence: ['deployment and probe events', 'container resource and startup metrics', 'artifact configuration and migration history'],
  },
  'Production Support': {
    mechanism: 'Spring Boot production support connects user impact to request, JVM, pool, database, dependency, configuration, and deployment evidence.',
    implementation: 'Stabilize with the smallest reversible mitigation, preserve evidence, isolate the constrained boundary, and add durable prevention.',
    failure: 'a symptom-only restart or scale-up destroys evidence and allows the incident to recur',
    decision: 'which mitigation restores service while preserving evidence and limiting blast radius',
    incident: 'latency and error rate climb rapidly while CPU, memory, pools, and dependencies point to different causes',
    evidence: ['JFR and thread or heap diagnostics', 'request database and dependency telemetry', 'release and configuration timeline'],
  },
  Architecture: {
    mechanism: 'Enterprise Spring Boot architecture defines service boundaries, platform standards, security, resilience, observability, deployment, and operating ownership.',
    implementation: 'Make quality attributes measurable, standardize proven capabilities, isolate failure domains, and rehearse recovery.',
    failure: 'shared infrastructure or inconsistent service patterns expand blast radius and slow safe change',
    decision: 'which boundaries and operating model meet scale, availability, security, cost, and team-autonomy goals',
    incident: 'a regional identity-provider failure cascades through services because retries and shared pools amplify load',
    evidence: ['service-level indicators and dependency map', 'capacity and failure-rehearsal results', 'architecture decision records'],
  },
};

const categoryOverrides: Record<string, Partial<TopicProfile>> = {
  'Auto Configuration': {
    mechanism: 'Spring Boot auto-configuration contributes beans conditionally from classpath, existing beans, properties, and environment state, and backs off when application configuration owns the decision.',
    failure: 'a classpath or property change activates or disables configuration unexpectedly',
    incident: 'a dependency upgrade changes a condition outcome and one environment starts with a different bean graph',
    evidence: ['condition evaluation report', 'bean and dependency inventory', 'startup logs across environments'],
  },
  Transactions: {
    mechanism: 'Spring transaction management usually applies through proxies that bind a transaction context around eligible method calls; propagation and isolation determine how work joins and observes data.',
    failure: 'self-invocation, wrong rollback rules, or long boundaries leave writes partially committed or connections occupied',
    incident: 'orders remain partially updated because an internal method call bypasses the expected transactional proxy',
    evidence: ['transaction and proxy trace', 'database lock and connection metrics', 'focused rollback integration test'],
  },
  'Spring Security': {
    mechanism: 'Spring Security 6 secures requests through explicit SecurityFilterChain beans and authorization rules, with method security protecting server capabilities beyond URL matching.',
    evidence: ['SecurityFilterChain debug trace', 'negative request and method-security tests', 'authentication and audit logs'],
  },
  'Connection Pooling': {
    mechanism: 'A connection pool such as HikariCP bounds reusable database connections; its size must reflect transaction duration, database capacity, and application concurrency.',
    failure: 'slow or leaked transactions consume every connection and requests time out waiting for the pool',
    incident: 'active connections reach the pool maximum and acquisition timeouts spike after one query plan regresses',
    evidence: ['HikariCP active pending and timeout metrics', 'database sessions and slow queries', 'transaction and request trace'],
  },
  'N+1 Problems': {
    mechanism: 'An N+1 defect executes one query for a parent result and additional queries per related row, often hidden by lazy association access.',
    incident: 'a list endpoint changes from 12 queries to 1,200 queries and p99 latency exceeds four seconds',
    evidence: ['SQL query count per request', 'Hibernate statistics and trace', 'query plan and response cardinality'],
  },
  'Distributed Tracing': {
    mechanism: 'Modern Spring Boot observation integrates Micrometer Observation and tracing bridges, including OpenTelemetry, to propagate context and correlate spans with metrics and logs.',
    implementation: 'Create spans around meaningful remote or business boundaries, control sampling, and preserve context across async and messaging work.',
    failure: 'broken propagation or excessive spans makes traces incomplete or operationally expensive',
    evidence: ['end-to-end trace waterfall', 'trace-log-metric correlation', 'sampling and propagation configuration'],
  },
  'JVM Performance': {
    implementation: 'Use Java 17+ diagnostics, evaluate virtual threads only for suitable blocking workloads, and assess AOT or native images against startup, memory, build, reflection, and peak-throughput needs.',
    decision: 'whether JVM tuning, virtual threads, AOT, or native images address the actual service-level objective',
    evidence: ['JFR recording and GC logs', 'load-test startup and steady-state data', 'native-image reachability and build report'],
  },
  Kubernetes: {
    mechanism: 'Kubernetes schedules and replaces Spring Boot containers using declared resources, probes, rollout policy, configuration, networking, and disruption controls.',
    incident: 'pods repeatedly restart because liveness checks a slow dependency and turns a partial outage into a full service outage',
    evidence: ['pod events and probe history', 'Actuator health-group state', 'resource and rollout metrics'],
  },
  'Circuit Breaker': {
    mechanism: 'A circuit breaker prevents repeated calls to a failing dependency by moving between closed, open, and half-open states based on measured outcomes.',
    failure: 'poor thresholds or unsafe fallbacks hide failure, reject healthy traffic, or amplify recovery load',
    evidence: ['circuit state and call-outcome metrics', 'dependency latency and error history', 'timeout retry and fallback configuration'],
  },
};

const topicSpecs: TopicSpec[] = springBootInterviewPrepTopicGroups.flatMap((group) => group.topics.map((topic, index, topics) => ({
  category: topic.category,
  topicGroup: group.title,
  concerns: categoryConcerns[topic.category] ?? commonConcerns,
  relatedTopics: [
    topics[(index + 1) % topics.length]?.slug,
    topics[(index + topics.length - 1) % topics.length]?.slug,
    group.id,
  ].filter(Boolean),
})));

const intents: Intent[] = ['concept', 'practical', 'troubleshooting', 'incident', 'architecture'];
const intentTypes: Record<Intent, string> = {
  concept: 'Conceptual Questions',
  practical: 'Practical Questions',
  troubleshooting: 'Troubleshooting Questions',
  incident: 'Production Support Questions',
  architecture: 'Architecture Questions',
};
const difficulties: Record<Intent, InterviewPrepQuestion['difficultyLevel']> = {
  concept: 'Beginner',
  practical: 'Intermediate',
  troubleshooting: 'Advanced',
  incident: 'Advanced',
  architecture: 'Architect',
};
const experiences: Record<Intent, InterviewPrepQuestion['experienceLevel']> = {
  concept: 'beginner',
  practical: 'mid',
  troubleshooting: 'senior',
  incident: 'senior',
  architecture: 'architect',
};
const industries = ['banking', 'retail', 'healthcare', 'telecom', 'payments', 'logistics', 'SaaS'];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hash(value: string) {
  return Array.from(value).reduce((result, character) => ((result * 31) + character.charCodeAt(0)) >>> 0, 2166136261);
}

function list(items: string[]) {
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

function profileFor(spec: TopicSpec): TopicProfile {
  return { ...groupProfiles[spec.topicGroup], ...categoryOverrides[spec.category] };
}

function concernGuidance(concern: string, profile: TopicProfile) {
  const rules: Array<[RegExp, string]> = [
    [/security|auth|jwt|oauth|role|csrf|cors|secret|tenant/i, 'Authenticate identity, authorize the exact resource and action at the server boundary, deny by default, protect credentials, and prove denied paths with negative tests.'],
    [/transaction|jpa|hibernate|entity|query|database|connection|lazy|n\+1/i, 'Define transaction and fetch ownership, inspect generated SQL and plans, protect pool capacity, and test correctness under concurrency and failure.'],
    [/cache|redis/i, 'Define cache identity, freshness, invalidation owner, serialization, outage behavior, and private-data isolation before rollout.'],
    [/kafka|rabbit|event|message/i, 'Version the event contract, make consumers idempotent, bound retries, preserve ordering requirements, and monitor lag plus dead letters.'],
    [/circuit|retry|timeout|resilien|availability|distributed|gateway|feign|discovery/i, 'Set explicit timeout and retry budgets, bound work, isolate failure, preserve idempotency, and rehearse dependency outage behavior.'],
    [/actuator|metric|monitor|logging|tracing|observab/i, 'Use low-cardinality signals, preserve correlation across boundaries, secure operational data, and tie alerts to user-facing service objectives.'],
    [/docker|kubernetes|ci\/cd|environment|deploy|native|graal/i, 'Promote an immutable reviewed artifact, validate configuration and resources, protect secrets, and define canary, health, and rollback criteria.'],
    [/memory|cpu|performance|pool|slow|jvm|virtual thread/i, 'Start from a service-level symptom, preserve JFR and resource evidence, isolate the constrained boundary, and prove the fix under representative load.'],
    [/bean|component|service|repository|controller|configuration|dependency|scope|lifecycle|scan|ioc/i, 'Keep dependency, scope, lifecycle, and proxy ownership explicit; verify the resulting bean graph with a focused context test.'],
    [/request|rest|validation|exception|mapping|mvc/i, 'Define the HTTP contract, validate untrusted input, preserve stable error semantics, and test filters, security, serialization, and failure behavior.'],
    [/scale|enterprise|architecture|governance/i, 'Define measurable quality attributes, owned boundaries, approved patterns, exception paths, cost, and recovery controls.'],
  ];
  return rules.find(([pattern]) => pattern.test(concern))?.[1]
    ?? `${profile.implementation} For ${concern}, document the owner, runtime behavior, failure mode, and validation evidence.`;
}

function questionText(intent: Intent, concern: string, category: string) {
  const values: Record<Intent, string> = {
    concept: `Explain ${concern} in Spring Boot ${category}. Which misconception causes production defects?`,
    practical: `How would you implement and validate ${concern} for Spring Boot ${category}?`,
    troubleshooting: `How would you troubleshoot a production failure involving ${concern} in Spring Boot ${category}?`,
    incident: `A Spring Boot ${category} production incident exposes a weakness in ${concern}. How would you respond and prevent recurrence?`,
    architecture: `How would you make and govern an architecture decision about ${concern} for enterprise Spring Boot ${category}?`,
  };
  return values[intent];
}

function buildQuestion(spec: TopicSpec, concern: string, intent: Intent, index: number): InterviewPrepQuestion {
  const profile = profileFor(spec);
  const question = questionText(intent, concern, spec.category);
  const industry = industries[hash(question) % industries.length];
  const guidance = concernGuidance(concern, profile);
  const focus: Record<Intent, string> = {
    concept: 'mechanism',
    practical: 'implementation',
    troubleshooting: 'diagnostic path',
    incident: 'incident response',
    architecture: 'architecture decision',
  };
  const direct = intent === 'concept'
    ? `${profile.mechanism} In Spring Boot ${spec.category}, the production-relevant rule for ${concern} is: ${guidance}`
    : intent === 'practical'
      ? `For Spring Boot ${spec.category}, implement ${concern} with this production approach: ${guidance}`
      : intent === 'architecture'
        ? `For enterprise Spring Boot ${spec.category}, treat ${concern} as an explicit architecture and operating decision: ${profile.decision}.`
        : `For Spring Boot ${spec.category}, preserve evidence, isolate the owning application or infrastructure boundary, and test ${concern} as a hypothesis before changing production.`;
  const detailed: Record<Intent, string[]> = {
    concept: [
      `Direct answer: ${direct}`,
      `What: ${concern} has a specific Spring Boot runtime and ownership contract within ${spec.category}.`,
      `Why: Misunderstanding it can cause ${profile.failure}.`,
      `How: ${guidance}`,
      `Production validation: Prove the explanation with ${list(profile.evidence)}.`,
    ],
    practical: [
      `Direct answer: ${direct}`,
      `Implementation choices: ${guidance}`,
      `Testing approach: Cover normal behavior, invalid inputs, security, dependency failure, and production configuration.`,
      `Operational evidence: Require ${list(profile.evidence)} before release.`,
      `Trade-off: Make this decision explicit: ${profile.decision}.`,
    ],
    troubleshooting: [
      `Direct answer: ${direct}`,
      `Observed symptom: ${profile.incident}.`,
      `Troubleshooting approach: Preserve ${profile.evidence[0]}, compare ${profile.evidence[1]} with a healthy instance, and use ${profile.evidence[2]} to isolate the owner.`,
      `Likely cause: A runtime, proxy, security, data, configuration, or dependency assumption around ${concern} changed.`,
      `Durable fix: Correct the narrow cause, add a focused regression test, and alert on the original user-impact signal.`,
    ],
    incident: [
      `Direct answer: ${direct}`,
      `Impact: ${profile.incident}.`,
      `Triage: Scope affected requests, instances, regions, dependencies, and the release window before mitigating.`,
      `Mitigation: Apply the smallest reversible action while preserving ${profile.evidence[0]}.`,
      `Prevention: Prove root cause with ${list(profile.evidence)} and convert it into a release or runtime guardrail.`,
    ],
    architecture: [
      `Direct answer: ${direct}`,
      `Architecture decision: ${profile.decision}.`,
      `Decision criteria: Evaluate ${concern} against security, consistency, latency, scale, failure isolation, observability, cost, and team ownership.`,
      `Operating model: Define the supported pattern, owner, measurable guardrail, exception path, and recovery plan.`,
      `Validation: Use ${list(profile.evidence)} and a production-scale failure rehearsal.`,
    ],
  };
  const scenarios: Record<Intent, string> = {
    concept: `During a ${industry} ${spec.category} design review, the team discovers that ${profile.incident}. The candidate must connect the misconception around ${concern} to Spring Boot runtime behavior and prove the correction with ${profile.evidence[0]}.`,
    practical: `A canary ${spec.category} implementation of ${concern} fails under peak traffic when ${profile.incident}. The team captures ${profile.evidence[0]}, validates the exact configuration and workload, and requires ${profile.evidence[2]} before rollout resumes.`,
    troubleshooting: `${spec.category} support reports that ${profile.incident}. The engineer treats ${concern} as a hypothesis, preserves ${profile.evidence[0]}, compares ${profile.evidence[1]} with a healthy instance, and isolates the cause with ${profile.evidence[2]}.`,
    incident: `Ten minutes after a ${spec.category} release involving ${concern}, ${profile.incident}. The incident lead scopes impact, applies a reversible mitigation, preserves ${list(profile.evidence)}, and accepts recovery only after the service-level metric returns to target.`,
    architecture: `A quarterly ${spec.category} architecture review finds inconsistent decisions about ${concern} contributed to this signal: ${profile.incident}. The lead defines the approved pattern, capacity assumption, owner, exception path, and measurable guardrail.`,
  };
  const projects: Record<Intent, string> = {
    concept: `A ${industry} platform made ${spec.category} concern ${concern} part of senior-engineer onboarding after a misunderstanding caused ${profile.failure}. The team documented the mechanism and validated it through ${profile.evidence[0]}.`,
    practical: `For a high-volume ${industry} service, the team implemented ${concern} in ${spec.category} using this rule: ${guidance} Release approval required ${profile.evidence[0]} and ${profile.evidence[1]}.`,
    troubleshooting: `A ${industry} production-support team traced a recurring ${spec.category} defect to ${concern}, correlated ${list(profile.evidence.slice(0, 2))}, corrected the narrow cause, and added a diagnostic runbook.`,
    incident: `During a peak ${industry} release, ${spec.category} concern ${concern} contributed to ${profile.incident}. The team restored service, reconciled affected work, and added a canary plus alert tied to the root cause.`,
    architecture: `A ${industry} enterprise standardized ${concern} for ${spec.category} only after deciding ${profile.decision}. The architecture record assigned ownership and required ${profile.evidence[0]} as ongoing proof.`,
  };

  return {
    id: `spring-boot-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'spring-boot',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question,
    shortAnswer: `${direct} Validate this ${focus[intent]} with ${profile.evidence[0]}.`,
    detailedAnswer: detailed[intent],
    productionScenario: scenarios[intent],
    realProjectExample: projects[intent],
    interviewerExpectation: `For this ${spec.category} question, the interviewer expects a precise ${focus[intent]} for ${concern}, Spring Boot 3+ and Java 17+ awareness where relevant, evidence from ${profile.evidence[0]} and ${profile.evidence[1]}, and a credible response to ${profile.incident}.`,
    commonMistakes: [
      `For ${spec.category}, giving a framework definition without explaining the runtime and ownership contract for ${concern}.`,
      `Changing ${concern} during a ${focus[intent]} exercise without collecting ${profile.evidence[0]} or reproducing the production workload.`,
      `Ignoring this ${spec.category} trade-off: ${profile.decision}.`,
      `Closing the ${focus[intent]} work for ${concern} without a regression test, operational signal, and accountable owner.`,
    ],
    followUpQuestions: [
      `For the ${focus[intent]} view of ${spec.category}, what changed for ${concern} in Spring Boot 3+, Spring Boot 4, or Spring Security 6 where applicable?`,
      `How would ${profile.evidence[0]} and ${profile.evidence[1]} prove your ${focus[intent]} explanation of ${concern} in ${spec.category}?`,
      `Which security, data, resilience, or cloud-native constraint most changes this ${spec.category} ${focus[intent]} answer for ${concern}?`,
      `From the ${focus[intent]} perspective, at what scale or failure condition would you revisit this decision: ${profile.decision}?`,
    ],
    frequencyScore: Math.max(65, (intent === 'concept' ? 94 : intent === 'practical' ? 91 : intent === 'troubleshooting' ? 88 : intent === 'incident' ? 85 : 81) - (index % 10)),
    commonWrongAnswer: `A weak answer describes ${concern} without explaining Spring Boot runtime behavior, production trade-offs, evidence, and failure ownership.`,
    architectPerspective: `From the ${focus[intent]} perspective, govern ${concern} in ${spec.category} through this decision: ${profile.decision}. Evaluate security, consistency, latency, scalability, availability, observability, cloud-native operations, cost, and the production signal "${profile.incident}".`,
    keyTakeaway: `Answer ${concern} through its Spring Boot runtime contract, production evidence, failure behavior, and explicit ownership.`,
    difficultyLevel: difficulties[intent],
    experienceLevel: experiences[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I explain the supported Spring Boot behavior of ${concern} and demonstrate the happy path.`,
      mid: `I implement and test ${concern}, including validation, security, dependency failure, and configuration.`,
      senior: `I diagnose ${concern} with ${list(profile.evidence)} and add durable prevention.`,
      architect: `I govern ${concern} through ${profile.decision}, measurable guardrails, and ownership.`,
    },
    isMostAsked: index < 10,
    mostAskedRank: index < 10 ? index + 1 : undefined,
    isRapidRevision: index < 5,
  };
}

const questions = topicSpecs.flatMap((spec) => spec.concerns.flatMap((concern, concernIndex) => (
  intents.map((intent, intentIndex) => buildQuestion(spec, concern, intent, (concernIndex * intents.length) + intentIndex))
)));

const topicGroups: InterviewPrepTopicGroup[] = springBootInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in modern enterprise Spring Boot.`,
  topics: group.topics.map((topic) => topic.category),
}));
const questionsPerPage = 10;
const topicMetadata = topicSpecs.map((spec) => {
  const topicQuestions = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    topicGroup: spec.topicGroup,
    totalQuestions: topicQuestions.length,
    estimatedPreparationMinutes: Math.max(20, Math.round(topicQuestions.length * 4.5)),
    questionsPerPage,
    totalPages: Math.ceil(topicQuestions.length / questionsPerPage),
    difficultyCounts: {
      Beginner: topicQuestions.filter((question) => question.difficultyLevel === 'Beginner').length,
      Intermediate: topicQuestions.filter((question) => question.difficultyLevel === 'Intermediate').length,
      Advanced: topicQuestions.filter((question) => question.difficultyLevel === 'Advanced').length,
      Architect: topicQuestions.filter((question) => question.difficultyLevel === 'Architect').length,
    },
  };
});
const topicPreparationSets = topicSpecs.map((spec) => {
  const ranked = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    mostAskedQuestionIds: ranked.slice(0, 10).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 15).map((question) => question.id),
    lastMinuteQuestionIds: ranked.slice(0, 5).map((question) => question.id),
  };
});
const productionScenarios = [
  {
    id: 'spring-boot-connection-exhaustion', title: 'Database connection pool exhaustion', topic: 'Connection Pooling',
    problem: 'Pending connection requests and API latency spike after a query regression.',
    rootCauseAnalysis: ['Slow transactions hold connections', 'Pool concurrency exceeds database capacity', 'Missing acquisition and query telemetry'],
    troubleshootingSteps: ['Inspect HikariCP and database session metrics', 'Correlate slow queries with request traces', 'Apply bounded mitigation', 'Fix the query and transaction boundary'],
    expectedInterviewAnswer: 'Prove whether acquisition, transaction duration, leak, or database capacity caused exhaustion before resizing the pool.',
    seniorApproach: 'A senior answer correlates pending connections, transaction duration, SQL plans, and deployment changes.',
    architectApproach: 'An architect defines pool-sizing policy, database capacity budgets, and query regression gates.',
    relatedQuestions: questions.filter((question) => question.category === 'Connection Pooling').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'spring-boot-cascading-failure', title: 'Dependency outage cascades across services', topic: 'Resiliency Patterns',
    problem: 'Retries amplify a slow dependency until request pools across services are exhausted.',
    rootCauseAnalysis: ['Timeout and retry budgets are uncoordinated', 'No bulkhead protects critical work', 'Fallback behavior is unsafe'],
    troubleshootingSteps: ['Trace the dependency waterfall', 'Inspect retry circuit and pool telemetry', 'Contain amplification', 'Implement bounded resilience and rehearse failure'],
    expectedInterviewAnswer: 'Contain retry amplification, protect capacity, preserve idempotency, and align resilience settings with the end-to-end latency budget.',
    seniorApproach: 'A senior answer separates dependency failure from local saturation and proves recovery.',
    architectApproach: 'An architect governs timeout budgets, resilience defaults, and failure-rehearsal standards.',
    relatedQuestions: questions.filter((question) => question.category === 'Resiliency Patterns').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'spring-boot-unauthorized-resource', title: 'Cross-tenant resource access', topic: 'Authorization',
    problem: 'An authenticated user directly invokes an operation for another tenant.',
    rootCauseAnalysis: ['URL matching was mistaken for resource authorization', 'Tenant identity was trusted from input', 'Negative tests were missing'],
    troubleshootingSteps: ['Contain access', 'Review audit evidence and affected resources', 'Enforce authorization at the server capability', 'Add negative tenant-isolation tests'],
    expectedInterviewAnswer: 'Treat authentication and resource authorization separately and enforce tenant ownership at every server-side capability.',
    seniorApproach: 'A senior answer includes impact reconciliation, audit evidence, and denied-path tests.',
    architectApproach: 'An architect standardizes tenant-aware policy enforcement and audit controls.',
    relatedQuestions: questions.filter((question) => question.category === 'Authorization').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'spring-boot-kubernetes-probe-loop', title: 'Kubernetes probe restart loop', topic: 'Kubernetes',
    problem: 'Liveness depends on a degraded optional service and continuously restarts healthy application instances.',
    rootCauseAnalysis: ['Liveness and readiness responsibilities are mixed', 'Health groups include the wrong dependency', 'Startup timing is not represented'],
    troubleshootingSteps: ['Inspect pod and Actuator health events', 'Separate startup liveness and readiness', 'Restore partial service safely', 'Add deployment probe validation'],
    expectedInterviewAnswer: 'Liveness should prove the process can recover by restart; readiness should control traffic based on service capability.',
    seniorApproach: 'A senior answer correlates probe history, dependency state, and rollout behavior.',
    architectApproach: 'An architect defines health-group standards and tests failure modes before production.',
    relatedQuestions: questions.filter((question) => question.category === 'Kubernetes').slice(0, 4).map((question) => question.id),
  },
];

export const springBootInterviewPrep: InterviewPrepSection = {
  technologyId: 'spring-boot',
  technologyLabel: 'Spring Boot',
  title: 'Spring Boot Interview Prep',
  description: 'Enterprise Spring Boot interview preparation focused on Boot 3+, Java 17+, Security 6, data, microservices, observability, cloud-native production support, and architecture.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Spring Boot Developer', years: '0-2 Years', summary: 'Explain Boot fundamentals, dependency injection, MVC, data, and security basics.' },
    { id: 'mid', label: 'Backend / Full Stack Developer', years: '2-5 Years', summary: 'Implement reliable APIs, data access, security, messaging, testing, and deployment.' },
    { id: 'senior', label: 'Senior Developer / Technical Lead', years: '5-8 Years', summary: 'Lead production support, performance, observability, resilience, and service design.' },
    { id: 'architect', label: 'Solution Architect', years: '8+ Years', summary: 'Design scalable, secure, highly available Spring Boot platforms and operating models.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Spring Boot Developer', description: 'Boot fundamentals, DI, MVC, data, and security.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'mid', label: 'Backend Engineer', description: 'APIs, JPA, security, messaging, testing, and deployment.', questionCount: 10, recommendedMinutes: 35 },
    { id: 'senior', label: 'Senior Developer / Lead', description: 'Production incidents, performance, observability, resilience, and microservices.', questionCount: 10, recommendedMinutes: 45 },
    { id: 'architect', label: 'Solution Architect', description: 'Enterprise platform, security, scale, availability, and governance.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-frequency Spring Boot decisions and production signals.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Boot 3+, DI, MVC, data, security, microservices, and production readiness.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 25).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Spring Boot preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 50).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
