import type { TopicContent } from '../types';

interface SpringExpandedTopicSpec {
  slug: string;
  title: string;
  description: string;
  concept: string;
  why: string;
  usage: string;
  workflow: string;
  exampleTitle: string;
  exampleCode: string;
  relatedTopics: string[];
}

const reviewed = 'June 2026';
const versions = ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring Framework 6'];

function topic(spec: SpringExpandedTopicSpec): TopicContent {
  const baseTopic: TopicContent = {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the Spring Boot topics senior backend engineers use to connect framework behavior with runtime ownership, delivery safety, and production support.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers care about this topic:**
- Strong Spring Boot answers explain framework behavior through service ownership, failure modes, and delivery trade-offs
- Spring topics matter most when they influence startup, security, data correctness, latency, or operational recovery
- Senior engineers connect annotation or library choices to observable production behavior`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Spring Boot example for ${spec.title.toLowerCase()}.`,
      code: [
        {
          label: spec.exampleTitle,
          language: 'text',
          code: spec.exampleCode,
        },
      ],
    },
    commonConfusions: [
      {
        question: `Is ${spec.title} only a framework detail?`,
        answer: `No. ${spec.title} affects startup behavior, contracts, latency, security, or operational support in real Spring Boot services.`,
      },
      {
        question: `What makes a weak answer for ${spec.title}?`,
        answer: `A weak answer gives the API or annotation name but skips ownership, trade-offs, debugging evidence, and what changes under production load.`,
      },
      {
        question: `How should senior engineers explain ${spec.title}?`,
        answer: `Senior answers connect ${spec.title} to service boundaries, runtime defaults, failure behavior, and the evidence needed to validate the design in production.`,
      },
    ],
    productionIssues: [
      `${spec.title} is adopted without clear ownership, so teams make inconsistent assumptions about runtime behavior or failure handling.`,
      `A release changes ${spec.title.toLowerCase()} behavior, but startup checks, tests, or observability do not catch the impact early enough.`,
      `Teams discuss ${spec.title} as a framework feature only and miss the cost around security, latency, configuration, or long-term maintainability.`,
    ],
    bestPractices: [
      `Treat ${spec.title} as part of Spring Boot delivery architecture, not only as a framework definition.`,
      'Make the contract, failure mode, and validation signal explicit before scaling the pattern across multiple services.',
      'Use examples from startup diagnostics, production incidents, migration, or reliability reviews when preparing interview answers.',
      'Prefer explanations that connect framework behavior, service design, and operational evidence together.',
    ],
    architectNote: `In Spring Boot systems, ${spec.title} should be evaluated through startup predictability, security boundaries, runtime cost, observability, and how many services or teams must safely operate the choice over time.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Spring Boot project?`,
        answer: `Explain the framework mechanism first, then connect ${spec.title} to service boundaries, configuration, runtime behavior, production failure modes, and the observable evidence that proves the implementation is safe.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The usual concern is that a convenient framework default is treated as harmless until it affects startup stability, security, data correctness, scaling, or incident recovery.`,
      },
    ],
    keyTakeaways: [
      `${spec.title} is a production decision, not just a Spring Boot definition.`,
      'Strong Spring Boot answers connect framework internals, application architecture, and operational evidence.',
      'Interview depth comes from showing ownership, trade-offs, and support strategy clearly.',
      'Senior Spring Boot engineers explain how the framework behaves when systems scale or fail.',
    ],
    relatedTopics: spec.relatedTopics,
  };

  if (spec.slug === 'spring-framework-basics') {
    return {
      ...baseTopic,
      quickUnderstanding:
        'Spring Framework is the foundation behind Spring Boot. It manages beans, dependencies, configuration, transactions, and application behavior through the Spring container.',
      whatIsIt: `Spring Framework is the core programming model behind most modern Java backend applications built with Spring Boot. It is not the same thing as Spring Boot. Spring Framework provides the container, bean model, dependency injection, AOP, transaction support, web stack, and integration features. Spring Boot sits on top of that foundation and removes much of the manual setup.

The most important idea is the **Spring container**. The container, usually represented by \`ApplicationContext\`, creates and manages application objects called **beans**. Instead of every controller, service, and repository creating dependencies manually with \`new\`, Spring resolves the dependency graph and wires the objects together for you.

**Quick Facts**
- Spring Framework is the core foundation behind Spring Boot.
- It provides IoC and Dependency Injection through the Spring container.
- Spring Boot reduces configuration, but it still runs on Spring Framework internally.
- Important modules include Core, Beans, Context, AOP, MVC, JDBC, ORM, and Transaction.
- Many production issues around beans, startup, profiles, and wiring require Spring Framework knowledge.
- This is one of the most frequently asked backend and Spring Boot interview topics.`,
      whyWeNeedIt: `Without Spring, developers manually create and wire objects, pass dependencies around, choose lifecycle rules themselves, and keep configuration logic scattered across the codebase. That may feel manageable in a tiny project, but it becomes painful in real systems with controllers, services, repositories, validators, security filters, event handlers, schedulers, and multiple environments.

Spring gives teams a consistent way to manage object creation, configuration, transactions, web flow, and infrastructure integration. Spring Boot makes the setup much faster, but knowing the underlying framework is still important when the application context fails, the wrong bean gets injected, a profile changes behavior, or a transaction does not behave as expected.

**Why this matters in real work**
- It helps you understand how controllers, services, repositories, and configuration classes are connected.
- It helps you debug missing beans, circular dependencies, bean conflicts, and configuration mistakes.
- It helps you explain Spring Boot behavior clearly in interviews, design discussions, and production troubleshooting.`,
      realWorldUsage: `In real backend projects, teams usually experience Spring Framework through Spring Boot rather than through raw XML configuration. The framework still does the heavy lifting behind the scenes.

You see it in:
- **Backend APIs** where controllers receive requests and delegate to services
- **Microservices** where configuration, health, dependency wiring, and startup order matter
- **Enterprise applications** with many modules, reusable components, and shared libraries
- **Transaction-heavy systems** where service methods coordinate database work safely
- **Security-enabled applications** where filters, authentication, and authorization depend on bean configuration
- **Data-driven applications** where repositories, entity managers, and transaction boundaries must align correctly

A typical production flow looks like this: controllers handle HTTP requests, services hold business logic, repositories access the database, configuration classes define important beans, and the Spring container wires everything together so the application starts as one managed system.`,
      howItWorks: `1. Developers write classes such as \`@Controller\`, \`@RestController\`, \`@Service\`, \`@Repository\`, or \`@Configuration\`.
2. Spring scans those packages or registers classes explicitly and turns them into beans.
3. The \`ApplicationContext\` creates those beans and manages their lifecycle.
4. Dependencies are injected automatically, usually through constructor injection.
5. Spring Boot adds auto-configuration, starter dependencies, and sensible defaults on top of the same container.
6. The application starts with controllers, services, repositories, and infrastructure components already connected and ready to use.

That is why a Spring Boot application feels simple on the surface: Boot reduces setup, but Spring Framework still owns the bean graph, dependency resolution, and runtime behavior.`,
      example: {
        title: 'Manual wiring versus Spring-managed wiring',
        description: 'A beginner-friendly comparison that shows why dependency injection matters in real Spring Boot controllers and services.',
        code: [
          {
            label: 'Without Spring',
            language: 'java',
            code: `public class UserService {
    public String getUserName(Long id) {
        return "User-" + id;
    }
}

public class UserController {
    private final UserService userService = new UserService();

    public String getUser(Long id) {
        return userService.getUserName(id);
    }
}`,
          },
          {
            label: 'With Spring Constructor Injection',
            language: 'java',
            code: `@Service
public class UserService {
    public String getUserName(Long id) {
        return "User-" + id;
    }
}

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id) {
        return userService.getUserName(id);
    }
}`,
          },
        ],
      },
      commonConfusions: [
        {
          question: 'Is Spring Framework the same as Spring Boot?',
          answer:
            'No. Spring Framework is the core framework that provides the container, dependency injection, AOP, MVC, transactions, and integration support. Spring Boot builds on top of it by adding starters, auto-configuration, and opinionated defaults.',
        },
        {
          question: 'Do we still need Spring Framework knowledge if we already use Spring Boot?',
          answer:
            'Yes. Spring Boot makes startup easier, but production debugging still depends on Spring knowledge. Missing beans, proxy behavior, configuration conflicts, profiles, and transaction issues are usually Spring Framework questions underneath.',
        },
        {
          question: 'Is dependency injection just about using @Autowired?',
          answer:
            'No. Dependency injection is the design idea of receiving dependencies from the container instead of creating them manually. @Autowired is only one way to express injection, and constructor injection is usually the preferred production style.',
        },
        {
          question: 'What is the difference between BeanFactory and ApplicationContext?',
          answer:
            'BeanFactory is the more basic container abstraction. ApplicationContext is the richer, commonly used container that adds features such as event publishing, message resolution, and easier integration with the rest of Spring.',
        },
        {
          question: 'Is Spring only for web applications?',
          answer:
            'No. Spring can power web APIs, batch jobs, messaging consumers, scheduled tasks, integration services, and non-web backend processes. The core container and dependency model are useful well beyond HTTP applications.',
        },
      ],
      productionIssues: [
        'The application fails to start because a required bean is missing. Knowing how component scanning, bean registration, and conditional configuration work helps you find why the dependency was never created.',
        'Multiple beans of the same type create injection conflicts. Spring Framework knowledge helps you solve this with qualifiers, primary beans, or clearer architectural boundaries instead of random trial and error.',
        'A circular dependency prevents bean creation. Understanding the dependency graph helps you redesign responsibilities rather than hiding the problem with fragile workarounds.',
        'The wrong profile loads the wrong beans or properties in a target environment. Framework knowledge helps you trace how profile-based configuration changes startup behavior.',
        'A @Transactional method does not work because it is called internally inside the same class. Knowing that Spring commonly uses proxies explains why self-invocation bypasses the transactional proxy.',
        'Component scanning misses classes because package structure is incorrect. Understanding scan roots and configuration boundaries helps you fix the issue quickly, especially in multi-module services.',
      ],
      bestPractices: [
        'Prefer constructor injection over field injection so dependencies are explicit, testable, and easier to reason about.',
        'Keep controller, service, and repository responsibilities separate so the bean graph stays understandable.',
        'Use a clear package structure so component scanning and configuration boundaries remain predictable.',
        'Avoid circular dependencies because they usually signal confused ownership between classes.',
        'Keep important configuration explicit when production behavior, security, or data consistency depends on it.',
        'Understand what Spring Boot auto-configuration is doing instead of relying on it blindly.',
        'Use profiles carefully and verify which beans and properties are active in each environment.',
      ],
      architectNote:
        'A senior backend engineer should understand Spring Framework beyond annotations and starter dependencies. In production systems, the important skill is knowing how beans are created, how dependencies are wired, how configuration changes runtime behavior, how proxy-based features such as transactions actually work, and where Spring Boot auto-configuration is helping or hiding complexity. That understanding is what turns startup failures, bean conflicts, profile mistakes, and debugging sessions into solvable engineering problems instead of guesswork.',
      faqs: [
        {
          question: 'What is Spring Framework?',
          answer:
            'Spring Framework is a Java framework for building backend applications in a modular and loosely coupled way. Its most important features include the IoC container, dependency injection, AOP, transaction management, MVC, and integration support. In most modern projects, Spring Boot uses these features underneath.',
        },
        {
          question: 'How is Spring Framework different from Spring Boot?',
          answer:
            'Spring Framework is the foundation. Spring Boot is a layer on top that simplifies setup with starters, auto-configuration, and production-friendly defaults. A Spring Boot application is still a Spring Framework application underneath.',
        },
        {
          question: 'Why is Dependency Injection important in Spring?',
          answer:
            'Dependency Injection removes the need for classes to create their own collaborators manually. That reduces tight coupling, makes unit testing easier, and keeps architecture cleaner as the application grows. In Spring, the container handles the object graph so developers can focus on business logic.',
        },
        {
          question: 'What is ApplicationContext in Spring?',
          answer:
            'ApplicationContext is the main Spring container used in real applications. It creates beans, injects dependencies, manages lifecycle, and provides higher-level framework features such as events and resource loading. When people say "Spring manages the beans," they usually mean the ApplicationContext is doing that work.',
        },
        {
          question: 'Do I need to learn Spring Framework before Spring Boot?',
          answer:
            'You can start building with Spring Boot first, but you should learn Spring Framework fundamentals early. Without that foundation, it becomes hard to explain bean wiring, auto-configuration, profiles, proxies, and transaction behavior. For interviews and production debugging, Spring Framework knowledge is a real advantage.',
        },
        {
          question: 'What production issues happen when Spring configuration is wrong?',
          answer:
            'Common issues include missing beans, duplicate bean conflicts, wrong profile activation, failed startup, incorrect transaction behavior, and classes not being discovered by component scanning. These problems look confusing if you only know annotations, but they become much easier to diagnose when you understand how the Spring container builds the application context.',
        },
      ],
      keyTakeaways: [
        'Spring Framework is the foundation behind Spring Boot.',
        'IoC and Dependency Injection are the most important Spring core concepts.',
        'Spring Boot simplifies setup but does not replace Spring Framework knowledge.',
        'Production issues often involve beans, configuration, profiles, transactions, or auto-configuration.',
        'Interviewers expect developers to explain how Spring works internally, not only how to use annotations.',
      ],
      relatedTopics: ['spring-introduction', 'spring-boot-architecture', 'spring-auto-configuration', 'spring-ioc', 'spring-di'],
    };
  }

  return baseTopic;
}

const specs: SpringExpandedTopicSpec[] = [
  {
    slug: 'spring-framework-basics',
    title: 'Spring Framework Basics',
    description: 'Understand the Spring Framework foundation under Spring Boot, including the container, beans, dependency injection, and real production relevance.',
    concept: 'Spring Framework provides the core container, dependency injection, AOP, MVC, data integration points, and extension model that Spring Boot builds on top of.',
    why: 'Without Spring fundamentals, teams memorize Boot conveniences but struggle to explain what the framework is actually doing when startup, proxying, or bean resolution behaves unexpectedly.',
    usage: 'This matters in service initialization, configuration debugging, modular design, upgrade planning, and interviews where framework ownership depth is expected.',
    workflow: 'Start with the container and module responsibilities, then separate what comes from plain Spring versus what Boot adds through defaults and auto-configuration.',
    exampleTitle: 'Spring versus Boot mental model',
    exampleCode: `Spring Framework
-> container, DI, MVC, Data, AOP

Spring Boot
-> dependency management
-> auto-configuration
-> embedded runtime
-> production conventions`,
    relatedTopics: ['spring-introduction', 'spring-boot-architecture', 'spring-auto-configuration', 'spring-ioc', 'spring-di'],
  },
  {
    slug: 'spring-boot-architecture',
    title: 'Spring Boot Architecture',
    description: 'Learn how Spring Boot applications are structured across configuration, web, service, data, and operational boundaries.',
    concept: 'Spring Boot architecture is the way application context, configuration, web entry points, services, repositories, integrations, and runtime concerns are assembled into one deployable service.',
    why: 'Architecture questions separate framework familiarity from service-design maturity. Strong candidates explain not only layers, but ownership, startup, and operability.',
    usage: 'Teams rely on this when designing modular monoliths, microservices, internal platforms, and upgrade-safe application structures.',
    workflow: 'Define the service boundary, keep configuration and bean graph ownership explicit, separate transport from domain logic, and design operations as part of the application shape.',
    exampleTitle: 'Boot service boundary map',
    exampleCode: `Incoming request
-> controller contract
-> service orchestration
-> repository or integration boundary
-> observability and security hooks
-> runtime configuration and deployment policy`,
    relatedTopics: ['spring-framework-basics', 'spring-introduction', 'spring-enterprise-architecture'],
  },
  {
    slug: 'spring-component-scanning',
    title: 'Component Scanning',
    description: 'Understand scan boundaries, bean discovery, and how broad scanning creates startup surprises in multi-module Spring Boot applications.',
    concept: 'Component scanning discovers annotated classes and registers them as beans in the application context. It is convenient, but its boundaries strongly affect startup behavior and ownership clarity.',
    why: 'Candidates often know scanning exists but cannot explain ambiguous beans, accidental discovery, or why explicit imports are sometimes safer.',
    usage: 'This matters in shared libraries, modular codebases, multi-module services, auto-configuration debugging, and environment-specific startup failures.',
    workflow: 'Keep scan roots narrow, know what enters the context implicitly, and use explicit imports or configuration where ownership should not depend on package layout accidents.',
    exampleTitle: 'Scanning safety check',
    exampleCode: `Ask before broad scanning
-> which packages are discovered?
-> could multiple implementations appear?
-> should this dependency be imported explicitly instead?`,
    relatedTopics: ['spring-ioc', 'spring-di', 'spring-framework-basics'],
  },
  {
    slug: 'spring-component',
    title: '@Component',
    description: 'Learn when generic component registration is appropriate and when a more specific Spring stereotype communicates better ownership.',
    concept: '@Component is the generic stereotype for Spring-managed classes. It registers the class as a bean but communicates less architectural intent than @Service, @Repository, or @Controller.',
    why: 'Interviewers use this to test whether candidates understand semantic intent, not just annotation syntax.',
    usage: 'This appears in utility collaborators, adapters, mappers, scheduling helpers, and framework-integrated classes without a more specific stereotype role.',
    workflow: 'Use @Component when the class is a Spring-managed collaborator but not clearly a controller, service, or repository, and keep state or lifecycle assumptions explicit.',
    exampleTitle: 'Stereotype choice rule',
    exampleCode: `Choose the narrowest stereotype that explains ownership.
Use @Component when
-> the bean is managed by Spring
-> no domain-specific stereotype communicates more clearly`,
    relatedTopics: ['spring-service', 'spring-repository-annotation', 'spring-configuration'],
  },
  {
    slug: 'spring-service',
    title: '@Service',
    description: 'Understand service-layer ownership, orchestration boundaries, and why @Service is about design intent as much as registration.',
    concept: '@Service marks a Spring bean as part of the business or orchestration layer. It usually owns use-case coordination, transaction boundaries, and dependency collaboration.',
    why: 'Strong answers explain what belongs in a service versus what should stay in controllers, repositories, or domain types.',
    usage: 'This matters in API orchestration, transactional workflows, cross-system coordination, and service decomposition discussions.',
    workflow: 'Keep the service focused on use-case coordination, avoid transport and persistence leakage, and make transaction, retry, and validation boundaries deliberate.',
    exampleTitle: 'Service responsibility lens',
    exampleCode: `Healthy service layer
-> coordinates a use case
-> owns orchestration and boundaries
-> avoids HTTP or SQL details leaking upward`,
    relatedTopics: ['spring-controllers', 'spring-repositories', 'spring-transactions'],
  },
  {
    slug: 'spring-repository-annotation',
    title: '@Repository',
    description: 'Learn how @Repository communicates data-access ownership and when exception translation becomes important.',
    concept: '@Repository marks persistence-layer components and participates in Spring exception translation so low-level data-access failures can be surfaced more consistently.',
    why: 'This topic reveals whether candidates understand data-access boundaries instead of treating repository code as only a persistence convenience.',
    usage: 'It matters in JPA repositories, custom DAO implementations, query-layer abstractions, and service contracts that must not leak storage details.',
    workflow: 'Use repository boundaries to isolate persistence concerns, keep query ownership explicit, and decide whether Spring Data abstractions or custom implementations better fit the workload.',
    exampleTitle: 'Repository boundary rule',
    exampleCode: `Repository layer should answer
-> who owns persistence logic?
-> what storage details stay hidden from services?
-> how are low-level failures translated?`,
    relatedTopics: ['spring-data-jpa', 'spring-entity-mapping', 'spring-transactions'],
  },
  {
    slug: 'spring-configuration',
    title: '@Configuration',
    description: 'Understand configuration-class behavior, bean method semantics, and how explicit configuration helps control service assembly.',
    concept: '@Configuration classes define beans and imports that assemble part of the application context. They are an explicit alternative to relying only on scanning and auto-discovery.',
    why: 'Configuration topics matter because teams often need explicit assembly, conditional beans, and safe integration of third-party components.',
    usage: 'This appears in infrastructure wiring, external client setup, modular configuration, conditional features, and test-time bean overrides.',
    workflow: 'Use configuration classes where object graph ownership should be explicit, and understand how proxy behavior or bean method calls affect creation semantics.',
    exampleTitle: 'Explicit assembly pattern',
    exampleCode: `Use @Configuration when
-> third-party clients need setup
-> modules should import explicit wiring
-> startup behavior must stay reviewable`,
    relatedTopics: ['spring-component-scanning', 'spring-auto-configuration', 'spring-properties'],
  },
  {
    slug: 'spring-bean-annotation',
    title: '@Bean',
    description: 'Learn when explicit bean methods are safer than annotation scanning and how bean registration decisions shape application wiring.',
    concept: '@Bean registers an object returned from a configuration method as a Spring-managed bean. It is especially useful for third-party types or explicit creation rules.',
    why: 'Interviewers use @Bean to test whether candidates can reason about explicit object-graph construction, not just annotation discovery.',
    usage: 'This matters in HTTP clients, serializers, caches, security collaborators, data-source customization, and integration adapters.',
    workflow: 'Use @Bean when registration must be explicit, control initialization and dependency order deliberately, and keep bean naming and condition rules easy to audit.',
    exampleTitle: 'Explicit bean registration',
    exampleCode: `Reach for @Bean when
-> you do not own the class
-> initialization policy matters
-> registration should stay explicit and reviewable`,
    relatedTopics: ['spring-configuration', 'spring-di', 'spring-component-scanning'],
  },
  {
    slug: 'spring-request-lifecycle',
    title: 'Request Lifecycle',
    description: 'Understand how Spring MVC processes a request from filters to controller to serialization and why that path matters in debugging.',
    concept: 'The request lifecycle includes servlet filters, DispatcherServlet routing, argument resolution, validation, controller handling, service calls, exception translation, and response serialization.',
    why: 'Many production issues live in the seams between layers. Senior candidates explain the request path clearly instead of treating controllers as isolated methods.',
    usage: 'This helps when debugging auth behavior, serialization failures, request latency, validation issues, and observability gaps.',
    workflow: 'Trace the request through each Spring MVC stage, identify where ownership changes, and preserve correlation across filters, controllers, services, and outbound calls.',
    exampleTitle: 'MVC flow map',
    exampleCode: `Request
-> filter chain
-> DispatcherServlet
-> handler mapping
-> argument resolution and validation
-> controller and service
-> exception or response serialization`,
    relatedTopics: ['spring-controllers', 'spring-request-mapping', 'spring-exception-handling'],
  },
  {
    slug: 'spring-validation',
    title: 'Validation',
    description: 'Learn how request and domain validation differ and how Spring Boot services keep invalid input from leaking deeper into business logic.',
    concept: 'Validation in Spring Boot usually combines Bean Validation, request binding, custom validators, and domain-level invariant checks to reject bad input safely and clearly.',
    why: 'Validation is a high-signal interview topic because it touches security, API design, user error handling, and maintainability.',
    usage: 'This appears in REST DTOs, command models, cross-field rules, workflow state changes, and any external boundary that accepts untrusted input.',
    workflow: 'Validate early at transport boundaries, keep domain invariants explicit, separate user-correctable input errors from internal failures, and expose safe error messages.',
    exampleTitle: 'Validation boundary rule',
    exampleCode: `Validation layers
-> request DTO validation for shape and syntax
-> domain validation for business invariants
-> safe error contract for clients`,
    relatedTopics: ['spring-request-lifecycle', 'spring-exception-handling', 'spring-controllers'],
  },
  {
    slug: 'spring-hibernate',
    title: 'Hibernate',
    description: 'Understand Hibernate persistence context behavior, dirty checking, and how ORM convenience turns into performance or correctness issues.',
    concept: 'Hibernate is the JPA implementation most Spring Boot teams use. It manages entity state, persistence context, flushing, change tracking, and fetch behavior.',
    why: 'Interviewers expect more than “Spring Data uses Hibernate.” Strong answers explain entity state, flush timing, and ORM trade-offs.',
    usage: 'This matters in write-heavy services, read models, batch updates, transaction debugging, and query-performance work.',
    workflow: 'Understand entity state transitions, inspect generated SQL, keep transaction boundaries explicit, and measure fetch behavior instead of assuming the ORM is free.',
    exampleTitle: 'ORM reality check',
    exampleCode: `Hibernate gives
-> entity lifecycle management
-> dirty checking
-> persistence context

It also introduces
-> flush timing questions
-> fetch strategy cost
-> query surprise if left unexamined`,
    relatedTopics: ['spring-data-jpa', 'spring-entity-mapping', 'spring-transactions'],
  },
  {
    slug: 'spring-jpql',
    title: 'JPQL',
    description: 'Learn how JPQL expresses entity-oriented queries and where joins, projections, and bulk operations need extra care.',
    concept: 'JPQL queries over entities and associations instead of raw tables. It is useful for portable ORM queries but behaves differently from handwritten SQL in important ways.',
    why: 'Candidates often know syntax samples but not pagination, fetch-join, or bulk-update trade-offs.',
    usage: 'This appears in custom repository methods, projection queries, reporting paths, and association-heavy read flows.',
    workflow: 'Choose JPQL when entity-oriented queries are useful, verify the generated SQL, and watch how joins, pagination, and update semantics affect correctness or performance.',
    exampleTitle: 'JPQL review points',
    exampleCode: `Check JPQL for
-> generated SQL shape
-> fetch join side effects
-> pagination limitations
-> projection clarity`,
    relatedTopics: ['spring-data-jpa', 'spring-hibernate', 'spring-native-queries'],
  },
  {
    slug: 'spring-native-queries',
    title: 'Native Queries',
    description: 'Understand when native SQL is the right choice and how to keep portability, mapping, and ownership manageable.',
    concept: 'Native queries execute raw SQL through Spring Data or lower-level persistence APIs. They give more control, but move portability, mapping, and SQL-plan ownership onto the team.',
    why: 'This topic reveals whether candidates can balance abstraction convenience against the need for exact query control.',
    usage: 'Native queries show up in reporting, vendor-specific SQL features, bulk operations, tuned read paths, and complex joins where ORM abstractions become awkward.',
    workflow: 'Use native SQL when it materially improves clarity or performance, make mapping explicit, and treat execution-plan ownership as part of the design decision.',
    exampleTitle: 'Native SQL decision lens',
    exampleCode: `Choose native SQL when
-> ORM abstraction hides too much
-> vendor-specific capability matters
-> exact query plan control is needed`,
    relatedTopics: ['spring-jpql', 'spring-hibernate', 'spring-transactions'],
  },
  {
    slug: 'spring-oauth2',
    title: 'OAuth2',
    description: 'Learn how OAuth2 flows fit into Spring Boot security, token validation, and identity-provider integration.',
    concept: 'OAuth2 in Spring Boot typically involves resource server behavior, authorization code or client credentials flows, token validation, scope boundaries, and external identity-provider integration.',
    why: 'Security interviews often move beyond JWT basics into identity delegation and trust boundaries.',
    usage: 'This matters in enterprise SSO, machine-to-machine APIs, user-facing web apps, and distributed services that trust external identity providers.',
    workflow: 'Separate authentication from authorization, validate token trust boundaries carefully, and plan for key rotation, provider outages, and scope or claim evolution.',
    exampleTitle: 'OAuth2 trust boundary',
    exampleCode: `Identity provider
-> issues token
-> Spring Boot resource server validates token
-> service enforces scopes and resource authorization
-> outage and key rotation plans remain explicit`,
    relatedTopics: ['spring-jwt', 'spring-security', 'spring-role-based-access'],
  },
  {
    slug: 'spring-role-based-access',
    title: 'Role Based Access',
    description: 'Understand role and permission design, authorization boundaries, and how tenant-aware access rules stay maintainable.',
    concept: 'Role-based access in Spring Boot maps authenticated identities to permissions or roles that control access at request, method, or resource boundaries.',
    why: 'Authorization questions test whether candidates can reason about policy design, not just annotations.',
    usage: 'This appears in admin platforms, multi-tenant services, internal tools, and APIs with differentiated user or service permissions.',
    workflow: 'Keep policies explicit, deny by default, separate coarse roles from fine-grained resource checks, and test negative access paths as seriously as happy paths.',
    exampleTitle: 'Authorization ownership',
    exampleCode: `Role-based access must answer
-> who is the actor?
-> what resource is being accessed?
-> which policy is enforced at request versus method level?`,
    relatedTopics: ['spring-authorization', 'spring-oauth2', 'spring-security'],
  },
  {
    slug: 'spring-circuit-breaker',
    title: 'Circuit Breaker',
    description: 'Learn how Spring Boot services use circuit breakers to stop cascading failures and protect downstream systems.',
    concept: 'A circuit breaker tracks dependency failures and temporarily stops calls when the failure threshold is exceeded, allowing time for recovery and limiting wasted work.',
    why: 'This is a key microservices reliability topic because it connects framework libraries to real outage containment.',
    usage: 'Teams use circuit breakers around partner APIs, internal service calls, databases with intermittent instability, and degraded infrastructure edges.',
    workflow: 'Define timeout budgets first, choose failure thresholds carefully, expose breaker state through observability, and make fallback behavior safe instead of decorative.',
    exampleTitle: 'Resilience flow',
    exampleCode: `Dependency slows or fails
-> timeout budget exceeded
-> breaker opens after threshold
-> service applies safe fallback or fast failure
-> telemetry shows state and recovery`,
    relatedTopics: ['spring-service-communication', 'spring-feign-client', 'spring-resiliency-patterns'],
  },
  {
    slug: 'spring-feign-client',
    title: 'Feign Client',
    description: 'Understand declarative HTTP clients, error decoding, and how Feign contracts behave in evolving Spring Boot services.',
    concept: 'Feign Client lets Spring Boot services declare outbound HTTP contracts as interfaces, but still requires careful ownership of timeouts, retries, errors, and compatibility.',
    why: 'It is easy to make Feign look simple while hiding downstream risk. Senior answers explain those operational edges.',
    usage: 'This appears in internal service-to-service calls, partner integrations, and modular internal platform APIs.',
    workflow: 'Treat Feign interfaces as real contracts, define timeout and retry policy intentionally, and keep error handling and observability aligned with dependency criticality.',
    exampleTitle: 'Outbound contract review',
    exampleCode: `Feign client review
-> timeout and retry policy
-> error decoding
-> contract versioning
-> request correlation and metrics`,
    relatedTopics: ['spring-service-communication', 'spring-circuit-breaker', 'spring-distributed-systems'],
  },
  {
    slug: 'spring-distributed-systems',
    title: 'Distributed Systems',
    description: 'Learn how Spring Boot services behave across network boundaries where retries, ordering, and partial failure become architectural concerns.',
    concept: 'Distributed systems design in Spring Boot is about handling unreliable networks, independent deployments, partial failure, idempotency, eventual consistency, and bounded ownership.',
    why: 'Framework knowledge is not enough at scale. Interviewers use this topic to test whether candidates can reason beyond one service boundary.',
    usage: 'This matters in microservices, event-driven platforms, partner integrations, and any architecture where multiple services coordinate one user journey.',
    workflow: 'Start from failure assumptions, define retry and timeout budgets, preserve idempotency, and make consistency and recovery trade-offs explicit rather than accidental.',
    exampleTitle: 'Distributed-system checklist',
    exampleCode: `Ask first
-> what fails independently?
-> what can be retried?
-> what must be idempotent?
-> where is eventual consistency acceptable?`,
    relatedTopics: ['spring-circuit-breaker', 'spring-feign-client', 'spring-event-driven-architecture'],
  },
  {
    slug: 'spring-cache',
    title: 'Spring Cache',
    description: 'Understand the Spring caching abstraction, cache key design, and where proxy behavior creates surprises.',
    concept: 'Spring Cache wraps method invocation with cache lookup and update behavior. It simplifies cache integration, but freshness, keys, and invalidation still belong to the team.',
    why: 'Caching questions often reveal whether a candidate can reason about correctness and staleness, not just performance.',
    usage: 'Teams use Spring Cache for lookup-heavy endpoints, reference data, repeated partner responses, and expensive derived calculations.',
    workflow: 'Choose cache keys intentionally, define freshness rules up front, and remember that proxy-based annotations do not solve invalidation or self-invocation concerns automatically.',
    exampleTitle: 'Cache contract rule',
    exampleCode: `Caching design must answer
-> what is cached?
-> for how long?
-> who invalidates it?
-> what happens when the cache is wrong or unavailable?`,
    relatedTopics: ['spring-redis', 'spring-cache-strategies', 'spring-performance-optimization'],
  },
  {
    slug: 'spring-redis',
    title: 'Redis',
    description: 'Learn how Redis supports Spring Boot caching and fast data access, along with the operational risks around serialization and hot keys.',
    concept: 'Redis is often used in Spring Boot systems as a distributed cache, session store, or fast data structure service with TTL-based freshness and networked operational trade-offs.',
    why: 'Interviewers care because Redis is often introduced as a performance fix before teams fully own its failure modes.',
    usage: 'This appears in cache layers, session storage, rate limiting, token stores, distributed coordination, and real-time counters.',
    workflow: 'Model data shape and expiration deliberately, choose serialization consciously, and monitor latency, memory pressure, and hot-key behavior as first-class concerns.',
    exampleTitle: 'Redis production lens',
    exampleCode: `Redis is not just faster storage.
It also adds
-> serialization choices
-> eviction risk
-> network dependency
-> operational cost around hot keys and memory`,
    relatedTopics: ['spring-cache', 'spring-cache-strategies', 'spring-monitoring'],
  },
  {
    slug: 'spring-cache-strategies',
    title: 'Cache Strategies',
    description: 'Understand cache-aside, write-through, invalidation, and how cache design balances correctness with latency.',
    concept: 'Cache strategies are the policy choices that decide when data is read, written, refreshed, expired, or invalidated across source systems and cache layers.',
    why: 'The hard part of caching is usually policy, not the library annotation.',
    usage: 'Teams use explicit cache strategy design in product search, catalog APIs, profile lookups, reference data, and expensive report generation.',
    workflow: 'Pick the strategy from freshness needs and write patterns, define ownership for invalidation, and design for degraded behavior when cache and source disagree.',
    exampleTitle: 'Freshness versus speed',
    exampleCode: `Cache strategy trade-off
-> lower latency
vs
-> stale data risk

Key question
-> who owns freshness and invalidation?`,
    relatedTopics: ['spring-cache', 'spring-redis', 'spring-scalability'],
  },
  {
    slug: 'spring-kafka',
    title: 'Kafka',
    description: 'Learn how Spring Boot services use Kafka for event streaming, consumer groups, retries, and lag-aware operations.',
    concept: 'Kafka integrates with Spring Boot for durable event streams, partitioned consumption, asynchronous processing, and event-driven workflows with ordering and offset trade-offs.',
    why: 'Messaging depth is increasingly expected in senior backend interviews because it changes consistency and recovery design.',
    usage: 'This matters in event-driven systems, audit pipelines, notification platforms, activity processing, and cross-service coordination.',
    workflow: 'Design idempotent consumers, choose partition and key strategy deliberately, expose lag and dead-letter signals, and separate business retry policy from broker mechanics.',
    exampleTitle: 'Kafka operating rule',
    exampleCode: `Kafka design asks
-> what is the key?
-> what ordering is required?
-> how is lag observed?
-> how are poison messages isolated?`,
    relatedTopics: ['spring-rabbitmq', 'spring-event-driven-architecture', 'spring-production-incidents'],
  },
  {
    slug: 'spring-rabbitmq',
    title: 'RabbitMQ',
    description: 'Understand RabbitMQ queue, exchange, acknowledgement, and redelivery behavior in Spring Boot messaging workloads.',
    concept: 'RabbitMQ provides brokered messaging with exchanges, queues, routing, acknowledgements, and dead-letter handling for workflows that value flexible routing and message orchestration.',
    why: 'Messaging interviews often test whether candidates can explain delivery behavior, backpressure, and failure isolation instead of only naming the broker.',
    usage: 'Teams use RabbitMQ in job dispatch, notification processing, workflow coordination, and integration patterns with command-style messaging.',
    workflow: 'Define routing and acknowledgement policy clearly, bound consumer throughput, and make retry and dead-letter strategy visible to operators.',
    exampleTitle: 'Queue design questions',
    exampleCode: `RabbitMQ questions
-> what exchange routes the message?
-> when is it acknowledged?
-> what happens on repeated failure?
-> where does backpressure surface?`,
    relatedTopics: ['spring-kafka', 'spring-event-driven-architecture', 'spring-monitoring'],
  },
  {
    slug: 'spring-event-driven-architecture',
    title: 'Event Driven Architecture',
    description: 'Learn how Spring Boot services publish and consume events while managing schema evolution and eventual consistency.',
    concept: 'Event-driven architecture coordinates systems through published events rather than direct request-response coupling. It improves decoupling but shifts complexity into contracts, retries, and consistency.',
    why: 'This topic reveals whether candidates understand architecture trade-offs beyond message-broker setup.',
    usage: 'This appears in commerce events, audit pipelines, notifications, integrations, workflow orchestration, and asynchronous service decomposition.',
    workflow: 'Model events as durable contracts, keep consumers idempotent, define replay and dead-letter policy, and accept eventual consistency only where the business can tolerate it.',
    exampleTitle: 'EDA contract lens',
    exampleCode: `Event design must answer
-> event or command?
-> who owns schema evolution?
-> how is replay handled?
-> what consistency is acceptable?`,
    relatedTopics: ['spring-kafka', 'spring-rabbitmq', 'spring-distributed-systems'],
  },
  {
    slug: 'spring-testcontainers',
    title: 'Testcontainers',
    description: 'Understand how Testcontainers improves Spring Boot integration testing with production-like dependencies.',
    concept: 'Testcontainers runs real infrastructure such as databases, brokers, or Redis in disposable containers during tests so integration behavior is closer to production reality.',
    why: 'This topic matters because many Spring Boot failures hide behind mock-heavy tests and environment differences.',
    usage: 'Teams use Testcontainers for JPA integration, messaging flows, migration testing, contract validation, and CI pipelines with realistic dependencies.',
    workflow: 'Use real dependencies where behavior matters, keep startup reuse efficient enough for CI, and wire container properties into tests without making the suite brittle.',
    exampleTitle: 'Production-parity testing',
    exampleCode: `Use Testcontainers when
-> DB dialect matters
-> broker behavior matters
-> local mocks hide real integration risk`,
    relatedTopics: ['spring-integration-testing', 'spring-mockmvc', 'spring-ci-cd'],
  },
  {
    slug: 'spring-performance-optimization',
    title: 'Performance Optimization',
    description: 'Learn how to optimize Spring Boot services by tracing real bottlenecks instead of guessing from average latency.',
    concept: 'Performance optimization in Spring Boot is about improving user-facing latency or throughput through measured changes across HTTP, serialization, queries, pools, JVM, and downstream calls.',
    why: 'Senior interviews expect disciplined optimization, not random tuning tips.',
    usage: 'This matters in high-traffic APIs, partner integrations, search flows, reporting services, and latency-sensitive internal platforms.',
    workflow: 'Define the service metric first, isolate the dominant cost with real evidence, prefer structural fixes over clever micro-tuning, and keep regression guards after the change.',
    exampleTitle: 'Optimization order',
    exampleCode: `1. Define the user-facing metric
2. Profile the actual bottleneck
3. Fix the structural issue first
4. Verify p95 or p99 under representative load`,
    relatedTopics: ['spring-performance-tuning', 'spring-connection-pooling', 'spring-jvm-performance'],
  },
  {
    slug: 'spring-connection-pooling',
    title: 'Connection Pooling',
    description: 'Understand HikariCP sizing, connection timeouts, and how pool health reveals deeper application or database pressure.',
    concept: 'Connection pooling lets Spring Boot reuse database connections rather than opening one per request. Pool configuration must align with workload shape and database capacity.',
    why: 'This is a strong production-support topic because connection exhaustion often exposes hidden transaction, query, or concurrency problems.',
    usage: 'It matters in transactional APIs, batch processing, microservices under burst traffic, and services with uneven database demand.',
    workflow: 'Size the pool from real concurrency and database limits, watch acquisition times, and diagnose long-held transactions before simply raising max connections.',
    exampleTitle: 'Pool exhaustion lens',
    exampleCode: `Connection pool issue?
Check
-> acquisition time
-> query duration
-> transaction length
-> app concurrency versus DB capacity`,
    relatedTopics: ['spring-transactions', 'spring-database-bottlenecks', 'spring-performance-optimization'],
  },
  {
    slug: 'spring-lazy-loading',
    title: 'Lazy Loading',
    description: 'Learn how JPA lazy loading works in Spring Boot and why fetch boundaries matter at API and transaction edges.',
    concept: 'Lazy loading defers loading of related entities until access time. It can reduce unnecessary work, but often creates serialization issues, hidden queries, or transaction-boundary surprises.',
    why: 'ORM performance and correctness discussions frequently depend on whether a candidate truly understands lazy loading.',
    usage: 'This appears in REST serialization, reporting endpoints, service-layer mapping, and entity graphs with many relationships.',
    workflow: 'Define fetch boundaries intentionally, do not rely on accidental session scope, and map entities to response models before serialization crosses service boundaries.',
    exampleTitle: 'Fetch-boundary rule',
    exampleCode: `Lazy loading is safe only when
-> fetch boundaries are deliberate
-> serialization does not trigger hidden queries
-> transaction scope is understood`,
    relatedTopics: ['spring-hibernate', 'spring-n-plus-one-problems', 'spring-entity-mapping'],
  },
  {
    slug: 'spring-n-plus-one-problems',
    title: 'N+1 Problems',
    description: 'Understand how Spring Boot data-access code creates N+1 queries and how to detect and prevent that pattern.',
    concept: 'N+1 happens when one main query is followed by many relationship-fetch queries, often because lazy associations are traversed repeatedly without an explicit fetch strategy.',
    why: 'This is a classic senior backend topic because it mixes ORM understanding, SQL awareness, and production debugging.',
    usage: 'It matters in list endpoints, dashboards, reporting, back-office screens, and any API returning relationship-rich data.',
    workflow: 'Inspect generated SQL, count queries under realistic requests, and use fetch joins, projections, entity graphs, or query redesign only where they truly fit.',
    exampleTitle: 'Query explosion check',
    exampleCode: `Symptom
-> endpoint returns quickly in dev
-> slows badly with real row counts

Ask
-> how many SQL queries ran for one request?`,
    relatedTopics: ['spring-lazy-loading', 'spring-hibernate', 'spring-jpql'],
  },
  {
    slug: 'spring-jvm-performance',
    title: 'JVM Performance',
    description: 'Learn how Spring Boot performance depends on heap, threads, warm-up, and runtime diagnostics beyond only controller code.',
    concept: 'JVM performance in Spring Boot includes memory behavior, garbage collection, thread usage, class loading, warm-up, and runtime profiling under realistic service workloads.',
    why: 'Framework and database tuning are incomplete if the JVM itself is under pressure or misconfigured.',
    usage: 'This matters in memory-sensitive APIs, high-throughput services, startup-critical workloads, and incident diagnosis during CPU or latency spikes.',
    workflow: 'Correlate JVM evidence with request behavior, separate application inefficiency from runtime cost, and validate tuning changes with representative traffic.',
    exampleTitle: 'JVM evidence checklist',
    exampleCode: `Look at JVM when
-> latency spikes without code-path clarity
-> CPU or GC rises sharply
-> startup or warm-up matters
-> thread pools saturate unexpectedly`,
    relatedTopics: ['spring-performance-optimization', 'spring-high-cpu', 'spring-memory-issues'],
  },
  {
    slug: 'spring-metrics',
    title: 'Metrics',
    description: 'Understand how Micrometer metrics make Spring Boot services observable without creating noisy or expensive telemetry.',
    concept: 'Metrics capture service health, traffic, latency, failures, and business signals through counters, timers, gauges, histograms, and controlled tags.',
    why: 'Observability questions are increasingly expected because good systems are not only built, they are operated.',
    usage: 'Teams use metrics in dashboards, alerts, capacity planning, feature rollout checks, and incident response.',
    workflow: 'Measure user-impacting signals, keep tag cardinality controlled, align alerts with service objectives, and make ownership of each key metric explicit.',
    exampleTitle: 'Metric design rule',
    exampleCode: `Good metrics answer
-> is the user impacted?
-> which dependency is failing?
-> is capacity trending toward a limit?
-> can the owning team act on this signal?`,
    relatedTopics: ['spring-monitoring', 'spring-distributed-tracing', 'spring-actuator'],
  },
  {
    slug: 'spring-distributed-tracing',
    title: 'Distributed Tracing',
    description: 'Learn how tracing connects Spring Boot requests across services and why context propagation matters in incident triage.',
    concept: 'Distributed tracing follows a request or event through multiple services by propagating trace context and recording spans for important operations.',
    why: 'Tracing is often the difference between guessing and proving where latency or failure really comes from in distributed systems.',
    usage: 'This matters in microservices, async workflows, user journeys spanning multiple services, and dependency-ownership debugging.',
    workflow: 'Propagate context consistently, trace meaningful spans instead of everything, and correlate traces with logs and metrics so one signal reinforces the others.',
    exampleTitle: 'Trace correlation goal',
    exampleCode: `Tracing should let teams answer
-> where did the request slow down?
-> which dependency failed?
-> does the trace line up with logs and metrics?`,
    relatedTopics: ['spring-monitoring', 'spring-metrics', 'spring-service-communication'],
  },
  {
    slug: 'spring-docker',
    title: 'Docker',
    description: 'Understand how Spring Boot services are packaged into containers and what changes when runtime limits move into Docker.',
    concept: 'Docker packages a Spring Boot service with its runtime into an image. This changes startup, memory visibility, deployment consistency, and operational ownership.',
    why: 'Containerization is a routine delivery skill now, and interviews often test whether candidates understand more than “it runs in Docker.”',
    usage: 'Teams use Docker for local parity, CI builds, deployment packaging, and cloud-native release workflows.',
    workflow: 'Build minimal repeatable images, run non-root where possible, align memory settings with container limits, and make startup and shutdown behavior visible.',
    exampleTitle: 'Container runtime checks',
    exampleCode: `Container review
-> image size and layering
-> non-root runtime
-> memory awareness
-> graceful shutdown
-> health and startup behavior`,
    relatedTopics: ['spring-kubernetes', 'spring-ci-cd', 'spring-environment-configuration'],
  },
  {
    slug: 'spring-kubernetes',
    title: 'Kubernetes',
    description: 'Learn how Spring Boot services behave under probes, scaling, resource limits, and rollout controls in Kubernetes.',
    concept: 'Kubernetes orchestrates Spring Boot service deployment, restart, health probing, scaling, and configuration delivery across clusters.',
    why: 'Production support discussions increasingly assume container orchestration literacy for backend roles.',
    usage: 'This matters in health checks, startup tuning, graceful shutdown, autoscaling, config delivery, and rollout debugging.',
    workflow: 'Align readiness and liveness with real service behavior, set resource requests honestly, protect startup time, and design rollback-friendly deployment patterns.',
    exampleTitle: 'Probe ownership',
    exampleCode: `Kubernetes questions
-> what should readiness prove?
-> what should liveness avoid killing too early?
-> what resource limit shapes JVM behavior?`,
    relatedTopics: ['spring-actuator', 'spring-docker', 'spring-high-availability'],
  },
  {
    slug: 'spring-ci-cd',
    title: 'CI/CD',
    description: 'Understand how Spring Boot services move from build to deploy with quality gates, migration safety, and rollback discipline.',
    concept: 'CI/CD for Spring Boot is the pipeline that builds artifacts, runs tests and security checks, promotes images, applies migrations, and controls rollout risk.',
    why: 'Delivery discipline is a major part of production engineering maturity and often comes up in senior interviews.',
    usage: 'This appears in backend platform pipelines, release automation, canary rollouts, artifact promotion, and incident-prevention workflows.',
    workflow: 'Keep builds reproducible, gate releases with meaningful tests and scans, separate artifact creation from environment promotion, and make rollback criteria explicit.',
    exampleTitle: 'Pipeline safety model',
    exampleCode: `Healthy pipeline
-> reproducible build
-> tests and security checks
-> artifact promotion
-> rollout verification
-> rollback path`,
    relatedTopics: ['spring-testcontainers', 'spring-kubernetes', 'spring-production-incidents'],
  },
  {
    slug: 'spring-environment-configuration',
    title: 'Environment Configuration',
    description: 'Learn how externalized config, profiles, secrets, and environment drift shape Spring Boot runtime behavior.',
    concept: 'Environment configuration controls how one Spring Boot artifact behaves across dev, staging, and production through externalized properties, profiles, and secret injection.',
    why: 'Many production incidents come from config ownership mistakes rather than code defects.',
    usage: 'This matters in secret management, multi-environment deployment, profile design, property validation, and rollout debugging.',
    workflow: 'Keep configuration external, validate required values at startup, separate secrets from general config, and reduce environment-specific drift as much as possible.',
    exampleTitle: 'Config ownership checklist',
    exampleCode: `Configuration review
-> what is code?
-> what is environment-specific?
-> how are secrets injected?
-> how is drift detected before release?`,
    relatedTopics: ['spring-properties', 'spring-profiles', 'spring-ci-cd'],
  },
  {
    slug: 'spring-memory-issues',
    title: 'Memory Issues',
    description: 'Understand how to investigate Spring Boot memory pressure through heap, leaks, container limits, and workload shape.',
    concept: 'Memory issues in Spring Boot can come from heap retention, large payloads, caches, ORM behavior, thread-local leaks, native memory pressure, or bad container sizing.',
    why: 'This is a strong production topic because good answers rely on evidence, not generic JVM flag guesses.',
    usage: 'Teams see this in heavy APIs, scheduled jobs, event consumers, cache-heavy services, and containerized deployments with strict limits.',
    workflow: 'Correlate memory growth with traffic and releases, separate allocation spikes from retention, inspect heap evidence safely, and fix the retaining owner rather than masking the issue.',
    exampleTitle: 'Memory triage flow',
    exampleCode: `Start with
-> did load change?
-> does memory return to baseline?
-> is the cache or ORM retaining too much?
-> what do heap signals prove?`,
    relatedTopics: ['spring-jvm-performance', 'spring-cache', 'spring-production-incidents'],
  },
  {
    slug: 'spring-high-cpu',
    title: 'High CPU',
    description: 'Learn how to diagnose CPU saturation in Spring Boot services across application code, retries, GC, and lock contention.',
    concept: 'High CPU in Spring Boot can be caused by hot code paths, excessive allocation, runaway retries, lock contention, expensive serialization, or garbage-collection pressure.',
    why: 'Senior interviews use this to test whether candidates can profile first and avoid blind tuning.',
    usage: 'This matters in burst traffic, bad release behavior, expensive data transformations, retry storms, and degraded dependency conditions.',
    workflow: 'Correlate CPU spikes with release and traffic, separate JVM and application cost, profile safely, and verify the fix under load with latency and throughput metrics.',
    exampleTitle: 'CPU incident checklist',
    exampleCode: `High CPU review
-> release correlation
-> request profile
-> GC versus app CPU
-> retries or loops
-> lock contention`,
    relatedTopics: ['spring-jvm-performance', 'spring-performance-optimization', 'spring-slow-apis'],
  },
  {
    slug: 'spring-slow-apis',
    title: 'Slow APIs',
    description: 'Understand how to troubleshoot slow Spring Boot APIs across controllers, serialization, DB access, and downstream dependencies.',
    concept: 'Slow APIs are usually a system-level symptom rather than one bad method. The latency can come from mapping, validation, queries, serialization, thread pools, or dependency calls.',
    why: 'This topic shows whether a candidate can decompose latency instead of only staring at average response time.',
    usage: 'Teams use this reasoning in incident triage, performance tuning, rollout verification, and product-SLA discussions.',
    workflow: 'Break latency down by stage, preserve request context, inspect dependency timing, and isolate the dominant cost before deciding on code or infrastructure changes.',
    exampleTitle: 'Latency decomposition',
    exampleCode: `Slow API?
Split the time into
-> request handling
-> business logic
-> DB
-> downstream calls
-> serialization and response`,
    relatedTopics: ['spring-request-lifecycle', 'spring-performance-optimization', 'spring-database-bottlenecks'],
  },
  {
    slug: 'spring-database-bottlenecks',
    title: 'Database Bottlenecks',
    description: 'Learn how Spring Boot services reveal DB bottlenecks through slow queries, pool pressure, locking, and transaction scope.',
    concept: 'Database bottlenecks happen when query cost, locking, pool exhaustion, schema design, or transaction shape limits the service more than the application layer does.',
    why: 'Strong backend candidates should connect ORM behavior, connection pools, and SQL diagnostics rather than treating the database as a black box.',
    usage: 'This matters in CRUD APIs, reporting, high-concurrency services, migration-related regressions, and data-heavy product features.',
    workflow: 'Inspect query latency, plan quality, pool wait times, and lock behavior together, then fix the real bottleneck instead of only increasing capacity.',
    exampleTitle: 'DB pressure lens',
    exampleCode: `Database bottleneck signs
-> rising query time
-> pool wait growth
-> lock contention
-> transaction duration creep`,
    relatedTopics: ['spring-connection-pooling', 'spring-jpql', 'spring-transactions'],
  },
  {
    slug: 'spring-production-incidents',
    title: 'Production Incidents',
    description: 'Understand how Spring Boot teams triage incidents, preserve evidence, and decide between rollback, mitigation, and forward fixes.',
    concept: 'Production incident handling in Spring Boot is the operational process around scoping impact, preserving evidence, mitigating safely, and turning the root cause into a durable guardrail.',
    why: 'Incident maturity is a high-signal senior skill because it combines technical depth with judgment under pressure.',
    usage: 'This matters in deployment regressions, dependency outages, configuration mistakes, data incidents, and reliability escalations.',
    workflow: 'Scope user impact first, gather the narrowest high-value evidence, choose the safest reversible mitigation, and only then decide whether rollback or forward fix is the right path.',
    exampleTitle: 'Incident response order',
    exampleCode: `1. Scope impact
2. Preserve evidence
3. Mitigate safely
4. Restore service
5. Prove root cause
6. Add prevention`,
    relatedTopics: ['spring-slow-apis', 'spring-high-cpu', 'spring-ci-cd'],
  },
  {
    slug: 'spring-enterprise-architecture',
    title: 'Enterprise Spring Boot',
    description: 'Learn how Spring Boot choices scale across many services, teams, and platform standards in enterprise environments.',
    concept: 'Enterprise Spring Boot design is the operating model for service templates, security posture, upgrade strategy, observability standards, and framework boundaries across many teams.',
    why: 'Architecture interviews expect candidates to move beyond one service and explain governance, consistency, and platform trade-offs.',
    usage: 'This matters in internal platforms, golden paths, service templates, framework upgrades, and large multi-team backend organizations.',
    workflow: 'Define which concerns the platform standardizes, which remain service-owned, and how upgrades, exceptions, and production support stay governable at scale.',
    exampleTitle: 'Platform governance questions',
    exampleCode: `Enterprise questions
-> what is standardized?
-> what can teams customize?
-> how are upgrades rolled out?
-> who owns exceptions and runtime support?`,
    relatedTopics: ['spring-boot-architecture', 'spring-security-design', 'spring-high-availability'],
  },
  {
    slug: 'spring-scalability',
    title: 'Scalability',
    description: 'Understand how Spring Boot services scale through stateless design, bounded dependencies, and realistic capacity assumptions.',
    concept: 'Scalability in Spring Boot depends on stateless service design, controlled concurrency, cache and database strategy, and clear understanding of which dependency saturates first.',
    why: 'This topic shows whether a candidate can translate framework knowledge into service-level growth strategy.',
    usage: 'It matters in APIs under traffic growth, event consumers, cache-heavy backends, and cost-aware platform planning.',
    workflow: 'Find the real limiting resource, reduce shared state, control concurrency, and verify capacity with realistic traffic instead of only local benchmarks.',
    exampleTitle: 'Scale limit map',
    exampleCode: `Scaling questions
-> what state is shared?
-> which dependency saturates first?
-> what happens when traffic doubles?
-> how is overload signaled?`,
    relatedTopics: ['spring-cache-strategies', 'spring-kubernetes', 'spring-performance-optimization'],
  },
  {
    slug: 'spring-security-design',
    title: 'Security Design',
    description: 'Learn how Spring Boot services design identity, authorization, secrets, and service trust boundaries at architecture level.',
    concept: 'Security design in Spring Boot covers identity boundaries, token and secret management, resource authorization, tenant isolation, and observability for security-relevant events.',
    why: 'Security interviews push beyond configuration into trust models and ownership boundaries.',
    usage: 'This matters in multi-tenant APIs, regulated systems, customer platforms, internal admin services, and zero-trust architectures.',
    workflow: 'Design with deny-by-default rules, clear trust boundaries, explicit secret lifecycle, and resource-level authorization rather than only top-level authentication.',
    exampleTitle: 'Security boundary map',
    exampleCode: `Security design must answer
-> who is trusted?
-> how is identity proven?
-> where is resource authorization enforced?
-> how are secrets rotated and audited?`,
    relatedTopics: ['spring-security', 'spring-oauth2', 'spring-role-based-access'],
  },
  {
    slug: 'spring-high-availability',
    title: 'High Availability',
    description: 'Understand how Spring Boot services stay available through graceful degradation, redundancy, and rollout-safe runtime behavior.',
    concept: 'High availability means the service can keep serving acceptable behavior despite instance loss, dependency instability, rollout mistakes, or infrastructure disruption.',
    why: 'Architecture interviews use this topic to test reliability thinking beyond basic uptime slogans.',
    usage: 'This matters in payment APIs, account services, partner integrations, internal platforms, and any business-critical backend.',
    workflow: 'Design failure boundaries, use safe retries and timeouts, preserve observability, and make rollback and degradation strategies part of normal operations.',
    exampleTitle: 'Availability design lens',
    exampleCode: `Availability depends on
-> bounded failures
-> graceful degradation
-> redundancy
-> rollout safety
-> fast observability`,
    relatedTopics: ['spring-kubernetes', 'spring-resiliency-patterns', 'spring-production-incidents'],
  },
  {
    slug: 'spring-resiliency-patterns',
    title: 'Resiliency Patterns',
    description: 'Learn how timeouts, retries, circuit breakers, bulkheads, and load shedding protect Spring Boot services under dependency stress.',
    concept: 'Resiliency patterns are the set of controls that keep failure isolated and prevent one slow or broken dependency from cascading across the system.',
    why: 'This is a core senior-backend topic because reliability is shaped by policy and architecture, not only by framework libraries.',
    usage: 'Teams apply resiliency patterns around partner APIs, databases, internal service calls, messaging consumers, and peak-traffic workflows.',
    workflow: 'Start from timeout budgets, add retries only when safe, isolate resource pools, expose pattern state in telemetry, and test failure behavior before production learns it for you.',
    exampleTitle: 'Failure-containment rule',
    exampleCode: `Resilience stack
-> timeout budget
-> retry with limits
-> circuit breaker
-> bulkhead
-> load shedding when necessary`,
    relatedTopics: ['spring-circuit-breaker', 'spring-feign-client', 'spring-high-availability'],
  },
];

export const springExpandedTopics: Record<string, TopicContent> = Object.fromEntries(
  specs.map((spec) => [spec.slug, topic(spec)])
);
