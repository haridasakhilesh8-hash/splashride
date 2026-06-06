export interface InterviewPrepNavTopic {
  slug: string;
  title: string;
  category: string;
}

export interface InterviewPrepNavGroup {
  id: string;
  title: string;
  topics: InterviewPrepNavTopic[];
}

export const aemInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'architecture', title: 'Architecture', category: 'AEM Architecture' },
      { slug: 'jcr', title: 'JCR', category: 'JCR' },
      { slug: 'crxde', title: 'CRXDE', category: 'CRXDE' },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    topics: [
      { slug: 'components', title: 'Components', category: 'Components' },
      { slug: 'htl', title: 'HTL', category: 'HTL' },
      { slug: 'sling', title: 'Sling', category: 'Sling' },
      { slug: 'sling-models', title: 'Sling Models', category: 'Sling Models' },
      { slug: 'osgi', title: 'OSGi', category: 'OSGi' },
    ],
  },
  {
    id: 'content-management',
    title: 'Content Management',
    topics: [
      { slug: 'templates', title: 'Templates', category: 'Templates' },
      { slug: 'content-fragments', title: 'Content Fragments', category: 'Content Fragments' },
      { slug: 'experience-fragments', title: 'Experience Fragments', category: 'Experience Fragments' },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    topics: [
      { slug: 'dispatcher', title: 'Dispatcher', category: 'Dispatcher' },
      { slug: 'security', title: 'Security', category: 'Security' },
      { slug: 'performance', title: 'Performance', category: 'Performance Tuning' },
    ],
  },
  {
    id: 'cloud-service',
    title: 'Cloud Service',
    topics: [
      { slug: 'cloud-manager', title: 'Cloud Manager', category: 'Cloud Manager' },
      { slug: 'aem-cloud-service', title: 'AEM Cloud Service', category: 'AEM Cloud Service' },
      { slug: 'graphql', title: 'GraphQL', category: 'GraphQL' },
    ],
  },
];

export const reactInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'jsx', title: 'JSX', category: 'JSX' },
      { slug: 'components', title: 'Components', category: 'Components' },
      { slug: 'props', title: 'Props', category: 'Props' },
      { slug: 'state', title: 'State', category: 'State' },
      { slug: 'event-handling', title: 'Event Handling', category: 'Event Handling' },
      { slug: 'forms', title: 'Forms', category: 'Forms' },
    ],
  },
  {
    id: 'core-react',
    title: 'Core React',
    topics: [
      { slug: 'hooks', title: 'Hooks', category: 'Hooks' },
      { slug: 'lifecycle', title: 'Lifecycle', category: 'Lifecycle' },
      { slug: 'context-api', title: 'Context API', category: 'Context API' },
      { slug: 'reconciliation', title: 'Reconciliation', category: 'Reconciliation' },
      { slug: 'virtual-dom', title: 'Virtual DOM', category: 'Virtual DOM' },
      { slug: 'rendering', title: 'Rendering', category: 'Rendering' },
    ],
  },
  {
    id: 'advanced-react',
    title: 'Advanced React',
    topics: [
      { slug: 'performance-optimization', title: 'Performance Optimization', category: 'Performance Optimization' },
      { slug: 'custom-hooks', title: 'Custom Hooks', category: 'Custom Hooks' },
      { slug: 'error-boundaries', title: 'Error Boundaries', category: 'Error Boundaries' },
      { slug: 'portals', title: 'Portals', category: 'Portals' },
      { slug: 'suspense', title: 'Suspense', category: 'Suspense' },
      { slug: 'concurrent-features', title: 'Concurrent Features', category: 'Concurrent Features' },
    ],
  },
  {
    id: 'state-management',
    title: 'State Management',
    topics: [
      { slug: 'redux', title: 'Redux', category: 'Redux' },
      { slug: 'redux-toolkit', title: 'Redux Toolkit', category: 'Redux Toolkit' },
      { slug: 'zustand', title: 'Zustand', category: 'Zustand' },
      { slug: 'react-query', title: 'React Query', category: 'React Query' },
    ],
  },
  {
    id: 'routing',
    title: 'Routing',
    topics: [
      { slug: 'react-router', title: 'React Router', category: 'React Router' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    topics: [
      { slug: 'jest', title: 'Jest', category: 'Jest' },
      { slug: 'react-testing-library', title: 'React Testing Library', category: 'React Testing Library' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    topics: [
      { slug: 'folder-structure', title: 'Folder Structure', category: 'Folder Structure' },
      { slug: 'design-patterns', title: 'Design Patterns', category: 'Design Patterns' },
      { slug: 'scalability', title: 'Scalability', category: 'Scalability' },
      { slug: 'component-architecture', title: 'Component Architecture', category: 'Component Architecture' },
    ],
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    topics: [
      { slug: 'ssr', title: 'SSR', category: 'SSR' },
      { slug: 'ssg', title: 'SSG', category: 'SSG' },
      { slug: 'isr', title: 'ISR', category: 'ISR' },
      { slug: 'app-router', title: 'App Router', category: 'App Router' },
      { slug: 'server-components', title: 'Server Components', category: 'Server Components' },
    ],
  },
  {
    id: 'production-support',
    title: 'Production Support',
    topics: [
      { slug: 'debugging', title: 'Debugging', category: 'Debugging' },
      { slug: 'performance-issues', title: 'Performance Issues', category: 'Performance Issues' },
      { slug: 'memory-leaks', title: 'Memory Leaks', category: 'Memory Leaks' },
      { slug: 'production-incidents', title: 'Production Incidents', category: 'Production Incidents' },
    ],
  },
];

export const nextjsInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'introduction', title: 'Introduction to Next.js', category: 'Introduction to Next.js' },
      { slug: 'pages-router', title: 'Pages Router', category: 'Pages Router' },
      { slug: 'app-router', title: 'App Router', category: 'App Router' },
      { slug: 'routing', title: 'Routing', category: 'Routing' },
      { slug: 'file-based-routing', title: 'File-based Routing', category: 'File-based Routing' },
    ],
  },
  {
    id: 'rendering',
    title: 'Rendering',
    topics: [
      { slug: 'ssr', title: 'SSR', category: 'SSR' },
      { slug: 'ssg', title: 'SSG', category: 'SSG' },
      { slug: 'isr', title: 'ISR', category: 'ISR' },
      { slug: 'csr', title: 'CSR', category: 'CSR' },
      { slug: 'streaming', title: 'Streaming', category: 'Streaming' },
      { slug: 'server-components', title: 'Server Components', category: 'Server Components' },
    ],
  },
  {
    id: 'data-fetching',
    title: 'Data Fetching',
    topics: [
      { slug: 'get-server-side-props', title: 'getServerSideProps', category: 'getServerSideProps' },
      { slug: 'get-static-props', title: 'getStaticProps', category: 'getStaticProps' },
      { slug: 'get-static-paths', title: 'getStaticPaths', category: 'getStaticPaths' },
      { slug: 'fetch-api', title: 'Fetch API', category: 'Fetch API' },
      { slug: 'server-actions', title: 'Server Actions', category: 'Server Actions' },
    ],
  },
  {
    id: 'app-router-workspace',
    title: 'App Router',
    topics: [
      { slug: 'layouts', title: 'Layouts', category: 'Layouts' },
      { slug: 'templates', title: 'Templates', category: 'Templates' },
      { slug: 'loading-ui', title: 'Loading UI', category: 'Loading UI' },
      { slug: 'error-handling', title: 'Error Handling', category: 'Error Handling' },
      { slug: 'parallel-routes', title: 'Parallel Routes', category: 'Parallel Routes' },
      { slug: 'intercepting-routes', title: 'Intercepting Routes', category: 'Intercepting Routes' },
    ],
  },
  {
    id: 'server-components-workspace',
    title: 'Server Components',
    topics: [
      { slug: 'client-components', title: 'Client Components', category: 'Client Components' },
      { slug: 'rendering-strategy', title: 'Rendering Strategy', category: 'Rendering Strategy' },
      { slug: 'hydration', title: 'Hydration', category: 'Hydration' },
    ],
  },
  {
    id: 'api-development',
    title: 'API Development',
    topics: [
      { slug: 'api-routes', title: 'API Routes', category: 'API Routes' },
      { slug: 'route-handlers', title: 'Route Handlers', category: 'Route Handlers' },
      { slug: 'middleware', title: 'Middleware', category: 'Middleware' },
      { slug: 'edge-runtime', title: 'Edge Runtime', category: 'Edge Runtime' },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    topics: [
      { slug: 'nextauth', title: 'NextAuth', category: 'NextAuth' },
      { slug: 'jwt', title: 'JWT', category: 'JWT' },
      { slug: 'session-management', title: 'Session Management', category: 'Session Management' },
      { slug: 'protected-routes', title: 'Protected Routes', category: 'Protected Routes' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    topics: [
      { slug: 'image-optimization', title: 'Image Optimization', category: 'Image Optimization' },
      { slug: 'caching', title: 'Caching', category: 'Caching' },
      { slug: 'revalidation', title: 'Revalidation', category: 'Revalidation' },
      { slug: 'code-splitting', title: 'Code Splitting', category: 'Code Splitting' },
      { slug: 'bundle-optimization', title: 'Bundle Optimization', category: 'Bundle Optimization' },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    topics: [
      { slug: 'vercel', title: 'Vercel', category: 'Vercel' },
      { slug: 'ci-cd', title: 'CI/CD', category: 'CI/CD' },
      { slug: 'environment-variables', title: 'Environment Variables', category: 'Environment Variables' },
    ],
  },
  {
    id: 'production-support',
    title: 'Production Support',
    topics: [
      { slug: 'debugging', title: 'Debugging', category: 'Debugging' },
      { slug: 'monitoring', title: 'Monitoring', category: 'Monitoring' },
      { slug: 'incident-handling', title: 'Incident Handling', category: 'Incident Handling' },
      { slug: 'performance-bottlenecks', title: 'Performance Bottlenecks', category: 'Performance Bottlenecks' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    topics: [
      { slug: 'enterprise-nextjs', title: 'Enterprise Next.js', category: 'Enterprise Next.js' },
      { slug: 'scalability', title: 'Scalability', category: 'Scalability' },
      { slug: 'folder-structure', title: 'Folder Structure', category: 'Folder Structure' },
      { slug: 'multi-tenant-applications', title: 'Multi-Tenant Applications', category: 'Multi-Tenant Applications' },
    ],
  },
];

export const coreJavaInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'java-basics', title: 'Java Basics', category: 'Java Basics' },
      { slug: 'jvm', title: 'JVM', category: 'JVM' },
      { slug: 'jdk-vs-jre', title: 'JDK vs JRE', category: 'JDK vs JRE' },
      { slug: 'data-types', title: 'Data Types', category: 'Data Types' },
      { slug: 'operators', title: 'Operators', category: 'Operators' },
      { slug: 'control-statements', title: 'Control Statements', category: 'Control Statements' },
    ],
  },
  {
    id: 'object-oriented-programming',
    title: 'Object Oriented Programming',
    topics: [
      { slug: 'classes-and-objects', title: 'Classes and Objects', category: 'Classes and Objects' },
      { slug: 'encapsulation', title: 'Encapsulation', category: 'Encapsulation' },
      { slug: 'inheritance', title: 'Inheritance', category: 'Inheritance' },
      { slug: 'polymorphism', title: 'Polymorphism', category: 'Polymorphism' },
      { slug: 'abstraction', title: 'Abstraction', category: 'Abstraction' },
      { slug: 'composition', title: 'Composition', category: 'Composition' },
    ],
  },
  {
    id: 'java-language-features',
    title: 'Java Language Features',
    topics: [
      { slug: 'string', title: 'String', category: 'String' },
      { slug: 'stringbuilder', title: 'StringBuilder', category: 'StringBuilder' },
      { slug: 'stringbuffer', title: 'StringBuffer', category: 'StringBuffer' },
      { slug: 'wrapper-classes', title: 'Wrapper Classes', category: 'Wrapper Classes' },
      { slug: 'autoboxing', title: 'Autoboxing', category: 'Autoboxing' },
      { slug: 'enums', title: 'Enums', category: 'Enums' },
      { slug: 'records', title: 'Records', category: 'Records' },
      { slug: 'sealed-classes', title: 'Sealed Classes', category: 'Sealed Classes' },
    ],
  },
  {
    id: 'collections',
    title: 'Collections',
    topics: [
      { slug: 'collection-framework', title: 'Collection Framework', category: 'Collection Framework' },
      { slug: 'list', title: 'List', category: 'List' },
      { slug: 'set', title: 'Set', category: 'Set' },
      { slug: 'map', title: 'Map', category: 'Map' },
      { slug: 'arraylist', title: 'ArrayList', category: 'ArrayList' },
      { slug: 'linkedlist', title: 'LinkedList', category: 'LinkedList' },
      { slug: 'hashmap', title: 'HashMap', category: 'HashMap' },
      { slug: 'concurrent-collections', title: 'Concurrent Collections', category: 'Concurrent Collections' },
    ],
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    topics: [
      { slug: 'checked-exceptions', title: 'Checked Exceptions', category: 'Checked Exceptions' },
      { slug: 'unchecked-exceptions', title: 'Unchecked Exceptions', category: 'Unchecked Exceptions' },
      { slug: 'custom-exceptions', title: 'Custom Exceptions', category: 'Custom Exceptions' },
      { slug: 'try-with-resources', title: 'Try-With-Resources', category: 'Try-With-Resources' },
    ],
  },
  {
    id: 'multithreading',
    title: 'Multithreading',
    topics: [
      { slug: 'threads', title: 'Threads', category: 'Threads' },
      { slug: 'runnable', title: 'Runnable', category: 'Runnable' },
      { slug: 'callable', title: 'Callable', category: 'Callable' },
      { slug: 'executor-framework', title: 'Executor Framework', category: 'Executor Framework' },
      { slug: 'synchronization', title: 'Synchronization', category: 'Synchronization' },
      { slug: 'locks', title: 'Locks', category: 'Locks' },
      { slug: 'deadlocks', title: 'Deadlocks', category: 'Deadlocks' },
      { slug: 'thread-safety', title: 'Thread Safety', category: 'Thread Safety' },
      { slug: 'virtual-threads', title: 'Virtual Threads', category: 'Virtual Threads' },
    ],
  },
  {
    id: 'java-8-plus',
    title: 'Java 8+',
    topics: [
      { slug: 'lambda-expressions', title: 'Lambda Expressions', category: 'Lambda Expressions' },
      { slug: 'functional-interfaces', title: 'Functional Interfaces', category: 'Functional Interfaces' },
      { slug: 'streams', title: 'Streams', category: 'Streams' },
      { slug: 'optional', title: 'Optional', category: 'Optional' },
      { slug: 'method-references', title: 'Method References', category: 'Method References' },
    ],
  },
  {
    id: 'memory-management',
    title: 'Memory Management',
    topics: [
      { slug: 'jvm-memory-model', title: 'JVM Memory Model', category: 'JVM Memory Model' },
      { slug: 'heap', title: 'Heap', category: 'Heap' },
      { slug: 'stack', title: 'Stack', category: 'Stack' },
      { slug: 'metaspace', title: 'Metaspace', category: 'Metaspace' },
      { slug: 'garbage-collection', title: 'Garbage Collection', category: 'Garbage Collection' },
      { slug: 'memory-leaks', title: 'Memory Leaks', category: 'Memory Leaks' },
    ],
  },
  {
    id: 'jvm-internals',
    title: 'JVM Internals',
    topics: [
      { slug: 'class-loading', title: 'Class Loading', category: 'Class Loading' },
      { slug: 'class-loaders', title: 'Class Loaders', category: 'Class Loaders' },
      { slug: 'bytecode', title: 'Bytecode', category: 'Bytecode' },
      { slug: 'jit-compiler', title: 'JIT Compiler', category: 'JIT Compiler' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    topics: [
      { slug: 'profiling', title: 'Profiling', category: 'Profiling' },
      { slug: 'optimization', title: 'Optimization', category: 'Optimization' },
      { slug: 'gc-tuning', title: 'GC Tuning', category: 'GC Tuning' },
      { slug: 'high-throughput-systems', title: 'High Throughput Systems', category: 'High Throughput Systems' },
    ],
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    topics: [
      { slug: 'singleton', title: 'Singleton', category: 'Singleton' },
      { slug: 'factory', title: 'Factory', category: 'Factory' },
      { slug: 'builder', title: 'Builder', category: 'Builder' },
      { slug: 'strategy', title: 'Strategy', category: 'Strategy' },
      { slug: 'observer', title: 'Observer', category: 'Observer' },
      { slug: 'dependency-injection', title: 'Dependency Injection', category: 'Dependency Injection' },
    ],
  },
  {
    id: 'production-support',
    title: 'Production Support',
    topics: [
      { slug: 'memory-issues', title: 'Memory Issues', category: 'Memory Issues' },
      { slug: 'high-cpu-usage', title: 'High CPU Usage', category: 'High CPU Usage' },
      { slug: 'thread-dumps', title: 'Thread Dumps', category: 'Thread Dumps' },
      { slug: 'heap-dumps', title: 'Heap Dumps', category: 'Heap Dumps' },
      { slug: 'out-of-memory-error', title: 'OutOfMemoryError', category: 'OutOfMemoryError' },
      { slug: 'performance-troubleshooting', title: 'Performance Troubleshooting', category: 'Performance Troubleshooting' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    topics: [
      { slug: 'enterprise-java-design', title: 'Enterprise Java Design', category: 'Enterprise Java Design' },
      { slug: 'scalability', title: 'Scalability', category: 'Scalability' },
      { slug: 'concurrency-design', title: 'Concurrency Design', category: 'Concurrency Design' },
      { slug: 'high-availability', title: 'High Availability', category: 'High Availability' },
    ],
  },
];

export const springBootInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'spring-framework-basics', title: 'Spring Framework Basics', category: 'Spring Framework Basics' },
      { slug: 'spring-boot-introduction', title: 'Spring Boot Introduction', category: 'Spring Boot Introduction' },
      { slug: 'spring-boot-architecture', title: 'Spring Boot Architecture', category: 'Spring Boot Architecture' },
      { slug: 'auto-configuration', title: 'Auto Configuration', category: 'Auto Configuration' },
      { slug: 'starter-dependencies', title: 'Starter Dependencies', category: 'Starter Dependencies' },
    ],
  },
  {
    id: 'dependency-injection',
    title: 'Dependency Injection',
    topics: [
      { slug: 'ioc-container', title: 'IoC Container', category: 'IoC Container' },
      { slug: 'bean-lifecycle', title: 'Bean Lifecycle', category: 'Bean Lifecycle' },
      { slug: 'bean-scopes', title: 'Bean Scopes', category: 'Bean Scopes' },
      { slug: 'dependency-injection', title: 'Dependency Injection', category: 'Dependency Injection' },
      { slug: 'component-scanning', title: 'Component Scanning', category: 'Component Scanning' },
    ],
  },
  {
    id: 'spring-core',
    title: 'Spring Core',
    topics: [
      { slug: 'component', title: '@Component', category: '@Component' },
      { slug: 'service', title: '@Service', category: '@Service' },
      { slug: 'repository', title: '@Repository', category: '@Repository' },
      { slug: 'controller', title: '@Controller', category: '@Controller' },
      { slug: 'configuration', title: '@Configuration', category: '@Configuration' },
      { slug: 'bean', title: '@Bean', category: '@Bean' },
    ],
  },
  {
    id: 'spring-mvc',
    title: 'Spring MVC',
    topics: [
      { slug: 'request-mapping', title: 'Request Mapping', category: 'Request Mapping' },
      { slug: 'rest-controllers', title: 'REST Controllers', category: 'REST Controllers' },
      { slug: 'request-lifecycle', title: 'Request Lifecycle', category: 'Request Lifecycle' },
      { slug: 'validation', title: 'Validation', category: 'Validation' },
      { slug: 'exception-handling', title: 'Exception Handling', category: 'Exception Handling' },
    ],
  },
  {
    id: 'data-access',
    title: 'Data Access',
    topics: [
      { slug: 'spring-data-jpa', title: 'Spring Data JPA', category: 'Spring Data JPA' },
      { slug: 'hibernate', title: 'Hibernate', category: 'Hibernate' },
      { slug: 'entity-mapping', title: 'Entity Mapping', category: 'Entity Mapping' },
      { slug: 'jpql', title: 'JPQL', category: 'JPQL' },
      { slug: 'native-queries', title: 'Native Queries', category: 'Native Queries' },
      { slug: 'transactions', title: 'Transactions', category: 'Transactions' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    topics: [
      { slug: 'spring-security', title: 'Spring Security', category: 'Spring Security' },
      { slug: 'authentication', title: 'Authentication', category: 'Authentication' },
      { slug: 'authorization', title: 'Authorization', category: 'Authorization' },
      { slug: 'jwt', title: 'JWT', category: 'JWT' },
      { slug: 'oauth2', title: 'OAuth2', category: 'OAuth2' },
      { slug: 'role-based-access', title: 'Role Based Access', category: 'Role Based Access' },
    ],
  },
  {
    id: 'microservices',
    title: 'Microservices',
    topics: [
      { slug: 'service-discovery', title: 'Service Discovery', category: 'Service Discovery' },
      { slug: 'config-server', title: 'Config Server', category: 'Config Server' },
      { slug: 'api-gateway', title: 'API Gateway', category: 'API Gateway' },
      { slug: 'circuit-breaker', title: 'Circuit Breaker', category: 'Circuit Breaker' },
      { slug: 'feign-client', title: 'Feign Client', category: 'Feign Client' },
      { slug: 'distributed-systems', title: 'Distributed Systems', category: 'Distributed Systems' },
    ],
  },
  {
    id: 'caching',
    title: 'Caching',
    topics: [
      { slug: 'spring-cache', title: 'Spring Cache', category: 'Spring Cache' },
      { slug: 'redis', title: 'Redis', category: 'Redis' },
      { slug: 'cache-strategies', title: 'Cache Strategies', category: 'Cache Strategies' },
    ],
  },
  {
    id: 'messaging',
    title: 'Messaging',
    topics: [
      { slug: 'kafka', title: 'Kafka', category: 'Kafka' },
      { slug: 'rabbitmq', title: 'RabbitMQ', category: 'RabbitMQ' },
      { slug: 'event-driven-architecture', title: 'Event Driven Architecture', category: 'Event Driven Architecture' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    topics: [
      { slug: 'unit-testing', title: 'Unit Testing', category: 'Unit Testing' },
      { slug: 'integration-testing', title: 'Integration Testing', category: 'Integration Testing' },
      { slug: 'mockmvc', title: 'MockMvc', category: 'MockMvc' },
      { slug: 'testcontainers', title: 'Testcontainers', category: 'Testcontainers' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    topics: [
      { slug: 'performance-optimization', title: 'Performance Optimization', category: 'Performance Optimization' },
      { slug: 'connection-pooling', title: 'Connection Pooling', category: 'Connection Pooling' },
      { slug: 'lazy-loading', title: 'Lazy Loading', category: 'Lazy Loading' },
      { slug: 'n-plus-one-problems', title: 'N+1 Problems', category: 'N+1 Problems' },
      { slug: 'jvm-performance', title: 'JVM Performance', category: 'JVM Performance' },
    ],
  },
  {
    id: 'observability',
    title: 'Observability',
    topics: [
      { slug: 'spring-actuator', title: 'Spring Actuator', category: 'Spring Actuator' },
      { slug: 'logging', title: 'Logging', category: 'Logging' },
      { slug: 'metrics', title: 'Metrics', category: 'Metrics' },
      { slug: 'monitoring', title: 'Monitoring', category: 'Monitoring' },
      { slug: 'distributed-tracing', title: 'Distributed Tracing', category: 'Distributed Tracing' },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    topics: [
      { slug: 'docker', title: 'Docker', category: 'Docker' },
      { slug: 'kubernetes', title: 'Kubernetes', category: 'Kubernetes' },
      { slug: 'ci-cd', title: 'CI/CD', category: 'CI/CD' },
      { slug: 'environment-configuration', title: 'Environment Configuration', category: 'Environment Configuration' },
    ],
  },
  {
    id: 'production-support',
    title: 'Production Support',
    topics: [
      { slug: 'memory-issues', title: 'Memory Issues', category: 'Memory Issues' },
      { slug: 'high-cpu', title: 'High CPU', category: 'High CPU' },
      { slug: 'slow-apis', title: 'Slow APIs', category: 'Slow APIs' },
      { slug: 'database-bottlenecks', title: 'Database Bottlenecks', category: 'Database Bottlenecks' },
      { slug: 'production-incidents', title: 'Production Incidents', category: 'Production Incidents' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    topics: [
      { slug: 'enterprise-spring-boot', title: 'Enterprise Spring Boot', category: 'Enterprise Spring Boot' },
      { slug: 'scalability', title: 'Scalability', category: 'Scalability' },
      { slug: 'security-design', title: 'Security Design', category: 'Security Design' },
      { slug: 'high-availability', title: 'High Availability', category: 'High Availability' },
      { slug: 'resiliency-patterns', title: 'Resiliency Patterns', category: 'Resiliency Patterns' },
    ],
  },
];

export const awsInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'cloud-fundamentals',
    title: 'Cloud Fundamentals',
    topics: [
      { slug: 'aws-fundamentals', title: 'AWS Fundamentals', category: 'AWS Fundamentals' },
      { slug: 'global-infrastructure', title: 'Global Infrastructure', category: 'Global Infrastructure' },
      { slug: 'regions', title: 'Regions', category: 'Regions' },
      { slug: 'availability-zones', title: 'Availability Zones', category: 'Availability Zones' },
      { slug: 'edge-locations', title: 'Edge Locations', category: 'Edge Locations' },
      { slug: 'shared-responsibility-model', title: 'Shared Responsibility Model', category: 'Shared Responsibility Model' },
    ],
  },
  {
    id: 'compute',
    title: 'Compute',
    topics: [
      { slug: 'ec2', title: 'EC2', category: 'EC2' },
      { slug: 'auto-scaling', title: 'Auto Scaling', category: 'Auto Scaling' },
      { slug: 'load-balancers', title: 'Load Balancers', category: 'Load Balancers' },
      { slug: 'elastic-beanstalk', title: 'Elastic Beanstalk', category: 'Elastic Beanstalk' },
      { slug: 'lambda-compute', title: 'Lambda', category: 'Lambda Compute' },
    ],
  },
  {
    id: 'storage',
    title: 'Storage',
    topics: [
      { slug: 's3', title: 'S3', category: 'S3' },
      { slug: 'ebs', title: 'EBS', category: 'EBS' },
      { slug: 'efs', title: 'EFS', category: 'EFS' },
      { slug: 'storage-classes', title: 'Storage Classes', category: 'Storage Classes' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    topics: [
      { slug: 'rds', title: 'RDS', category: 'RDS' },
      { slug: 'aurora', title: 'Aurora', category: 'Aurora' },
      { slug: 'dynamodb', title: 'DynamoDB', category: 'DynamoDB' },
      { slug: 'elasticache', title: 'ElastiCache', category: 'ElastiCache' },
    ],
  },
  {
    id: 'networking',
    title: 'Networking',
    topics: [
      { slug: 'vpc', title: 'VPC', category: 'VPC' },
      { slug: 'route-53', title: 'Route 53', category: 'Route 53' },
      { slug: 'security-groups', title: 'Security Groups', category: 'Security Groups' },
      { slug: 'nacls', title: 'NACLs', category: 'NACLs' },
      { slug: 'transit-gateway', title: 'Transit Gateway', category: 'Transit Gateway' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    topics: [
      { slug: 'iam', title: 'IAM', category: 'IAM' },
      { slug: 'kms', title: 'KMS', category: 'KMS' },
      { slug: 'secrets-manager', title: 'Secrets Manager', category: 'Secrets Manager' },
      { slug: 'cognito', title: 'Cognito', category: 'Cognito' },
      { slug: 'security-best-practices', title: 'Security Best Practices', category: 'Security Best Practices' },
    ],
  },
  {
    id: 'serverless',
    title: 'Serverless',
    topics: [
      { slug: 'lambda-serverless', title: 'Lambda', category: 'Lambda Serverless' },
      { slug: 'api-gateway', title: 'API Gateway', category: 'API Gateway' },
      { slug: 'eventbridge', title: 'EventBridge', category: 'EventBridge' },
      { slug: 'step-functions', title: 'Step Functions', category: 'Step Functions' },
      { slug: 'sqs', title: 'SQS', category: 'SQS' },
      { slug: 'sns', title: 'SNS', category: 'SNS' },
    ],
  },
  {
    id: 'containers',
    title: 'Containers',
    topics: [
      { slug: 'ecs', title: 'ECS', category: 'ECS' },
      { slug: 'eks', title: 'EKS', category: 'EKS' },
      { slug: 'fargate', title: 'Fargate', category: 'Fargate' },
      { slug: 'docker-on-aws', title: 'Docker on AWS', category: 'Docker on AWS' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    topics: [
      { slug: 'cloudformation', title: 'CloudFormation', category: 'CloudFormation' },
      { slug: 'cdk', title: 'CDK', category: 'CDK' },
      { slug: 'codepipeline', title: 'CodePipeline', category: 'CodePipeline' },
      { slug: 'codebuild', title: 'CodeBuild', category: 'CodeBuild' },
      { slug: 'codedeploy', title: 'CodeDeploy', category: 'CodeDeploy' },
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    topics: [
      { slug: 'cloudwatch', title: 'CloudWatch', category: 'CloudWatch' },
      { slug: 'cloudtrail', title: 'CloudTrail', category: 'CloudTrail' },
      { slug: 'x-ray', title: 'X-Ray', category: 'X-Ray' },
      { slug: 'config', title: 'Config', category: 'Config' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    topics: [
      { slug: 'high-availability', title: 'High Availability', category: 'High Availability' },
      { slug: 'disaster-recovery', title: 'Disaster Recovery', category: 'Disaster Recovery' },
      { slug: 'multi-region-design', title: 'Multi-Region Design', category: 'Multi-Region Design' },
      { slug: 'scalability', title: 'Scalability', category: 'Scalability' },
      { slug: 'cost-optimization', title: 'Cost Optimization', category: 'Cost Optimization' },
    ],
  },
  {
    id: 'production-support',
    title: 'Production Support',
    topics: [
      { slug: 'incident-response', title: 'Incident Response', category: 'Incident Response' },
      { slug: 'performance-troubleshooting', title: 'Performance Troubleshooting', category: 'Performance Troubleshooting' },
      { slug: 'security-incidents', title: 'Security Incidents', category: 'Security Incidents' },
      { slug: 'aws-cost-issues', title: 'AWS Cost Issues', category: 'AWS Cost Issues' },
      { slug: 'operational-excellence', title: 'Operational Excellence', category: 'Operational Excellence' },
    ],
  },
];

const interviewPrepTopicGroupsByTechnology: Record<string, InterviewPrepNavGroup[]> = {
  aem: aemInterviewPrepTopicGroups,
  react: reactInterviewPrepTopicGroups,
  nextjs: nextjsInterviewPrepTopicGroups,
  'core-java': coreJavaInterviewPrepTopicGroups,
  'spring-boot': springBootInterviewPrepTopicGroups,
  aws: awsInterviewPrepTopicGroups,
};

export function getInterviewPrepTopicGroups(technologyId: string): InterviewPrepNavGroup[] {
  return interviewPrepTopicGroupsByTechnology[technologyId] ?? [];
}

export function getInterviewPrepDefaultTopicSlug(technologyId: string): string {
  return getInterviewPrepTopicGroups(technologyId)[0]?.topics[0]?.slug ?? 'architecture';
}

export function getInterviewPrepCategoryForSlug(technologyId: string, slug: string): string {
  const groups = getInterviewPrepTopicGroups(technologyId);
  return groups.flatMap((group) => group.topics).find((topic) => topic.slug === slug)?.category
    ?? groups[0]?.topics[0]?.category
    ?? '';
}

export function getInterviewPrepTopicTitle(technologyId: string, slug: string): string {
  const groups = getInterviewPrepTopicGroups(technologyId);
  return groups.flatMap((group) => group.topics).find((topic) => topic.slug === slug)?.title
    ?? groups[0]?.topics[0]?.title
    ?? 'Interview Prep';
}

export function getInterviewPrepGroupTitle(technologyId: string, slug: string): string {
  const groups = getInterviewPrepTopicGroups(technologyId);
  return groups.find((group) => group.topics.some((topic) => topic.slug === slug))?.title
    ?? groups[0]?.title
    ?? 'Fundamentals';
}
