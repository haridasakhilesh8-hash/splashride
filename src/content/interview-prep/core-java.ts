import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { coreJavaInterviewPrepTopicGroups } from './topicNavigation';

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
  'runtime contract and common misconceptions',
  'implementation choices and trade-offs',
  'failure behavior and defensive design',
  'production diagnosis with measurable evidence',
  'enterprise governance and maintainability',
];

const categoryConcerns: Record<string, string[]> = {
  'Java Basics': ['pass-by-value semantics', 'equals and hashCode contract', 'immutability in domain models', 'static and instance initialization order', 'access modifiers across modules and packages', 'final variables methods and classes', 'language compatibility across Java 8 11 17 and 21'],
  JVM: ['JVM execution lifecycle', 'platform independence through bytecode', 'JVM runtime areas', 'JVM startup and warm-up behavior', 'JVM flags and container awareness', 'JVM observability in production'],
  'JDK vs JRE': ['JDK JRE and JVM responsibilities', 'development versus runtime tooling', 'custom runtime images with jlink', 'Java module system impact on runtimes', 'runtime version compatibility'],
  'Data Types': ['primitive versus reference semantics', 'numeric promotion and overflow', 'floating-point precision', 'char Unicode and code points', 'nullability and default values'],
  Operators: ['short-circuit boolean evaluation', 'equality versus object equality', 'bitwise operations and masks', 'operator precedence defects', 'integer division and overflow'],
  'Control Statements': ['switch expressions and exhaustiveness', 'loop selection and termination', 'fail-fast iteration behavior', 'guard clauses versus nested branches', 'control flow in resource handling'],

  'Classes and Objects': ['object lifecycle and identity', 'constructor design and invariants', 'static versus instance responsibility', 'nested and inner classes', 'value objects versus entities'],
  Encapsulation: ['protecting invariants', 'defensive copying', 'immutable aggregate design', 'package boundaries and visibility', 'encapsulation versus serialization frameworks'],
  Inheritance: ['is-a modeling and substitutability', 'fragile base class problem', 'method overriding rules', 'constructor execution across hierarchies', 'inheritance versus composition'],
  Polymorphism: ['runtime method dispatch', 'overloading versus overriding', 'Liskov substitution failures', 'polymorphic collections and APIs', 'dispatch cost and maintainability'],
  Abstraction: ['interfaces versus abstract classes', 'stable contracts over implementation details', 'default interface methods', 'abstraction leakage', 'testing through abstractions'],
  Composition: ['has-a modeling', 'delegation and behavior reuse', 'composition roots', 'runtime strategy replacement', 'composition versus inheritance trade-offs'],

  String: ['immutability and the string pool', 'equals versus reference equality', 'string concatenation compilation', 'Unicode code points and normalization', 'sensitive data lifetime in strings', 'large-string allocation pressure'],
  StringBuilder: ['mutable string construction', 'capacity growth and allocation', 'single-threaded performance', 'builder reuse risks', 'compiler-generated concatenation versus explicit builder'],
  StringBuffer: ['synchronized mutable string operations', 'StringBuffer versus StringBuilder', 'compound-operation thread safety', 'legacy API interoperability', 'contention from shared buffers'],
  'Wrapper Classes': ['primitive wrapper identity and equality', 'wrapper caching', 'nullability of wrappers', 'conversion and parsing', 'wrapper use in collections and generics'],
  Autoboxing: ['boxing and unboxing conversion', 'null unboxing failures', 'hidden allocation and performance', 'wrapper equality after boxing', 'boxing in streams and collections'],
  Enums: ['type-safe constants with behavior', 'enum identity and serialization', 'enum-based strategy design', 'safe evolution of persisted enum values', 'EnumSet and EnumMap'],
  Records: ['record component and value semantics', 'compact constructors and invariant validation', 'record immutability limitations', 'records in serialization boundaries', 'records versus entities and mutable models', 'record patterns and modern Java modeling'],
  'Sealed Classes': ['closed type hierarchies', 'permits and subclass constraints', 'exhaustive pattern matching', 'sealed hierarchies across modules', 'sealed classes versus open plugin models'],

  'Collection Framework': ['collection hierarchy and contracts', 'choosing collections by access pattern', 'iterator fail-fast behavior', 'immutable and unmodifiable collections', 'collection algorithmic complexity', 'collection memory overhead'],
  List: ['ordered collection semantics', 'duplicate and null handling', 'random access versus sequential access', 'list views and subList behavior', 'immutable list APIs'],
  Set: ['uniqueness through equality contracts', 'HashSet TreeSet and LinkedHashSet selection', 'mutable keys in sets', 'set algebra operations', 'ordering and comparator consistency'],
  Map: ['key-value contract and views', 'map implementation selection', 'compute merge and atomic update semantics', 'mutable key hazards', 'null handling and defaults', 'iteration and ordering guarantees'],
  ArrayList: ['dynamic-array growth', 'random access and insertion cost', 'capacity planning', 'ArrayList concurrency hazards', 'removal and iteration behavior'],
  LinkedList: ['node-based storage cost', 'queue and deque usage', 'random-access performance trap', 'LinkedList versus ArrayDeque', 'allocation and cache-locality impact'],
  HashMap: ['hashing bucket and tree-bin internals', 'equals and hashCode correctness', 'resize thresholds and capacity planning', 'collision behavior and security', 'mutable key corruption', 'HashMap concurrency failure'],
  'Concurrent Collections': ['ConcurrentHashMap atomic operations', 'weakly consistent iteration', 'CopyOnWriteArrayList trade-offs', 'blocking queues and backpressure', 'concurrent collection compound actions', 'contention and hot-key diagnosis'],

  'Checked Exceptions': ['recoverable contract modeling', 'throws propagation and API design', 'exception translation at boundaries', 'checked exceptions in lambdas', 'checked exception overuse'],
  'Unchecked Exceptions': ['programming errors versus domain failures', 'runtime exception propagation', 'validation and fail-fast behavior', 'global handling and error contracts', 'unchecked exception overuse'],
  'Custom Exceptions': ['domain-specific exception design', 'preserving the cause chain', 'error codes and safe messages', 'exception hierarchy design', 'serialization and API boundary concerns'],
  'Try-With-Resources': ['AutoCloseable lifecycle', 'resource close order', 'suppressed exceptions', 'custom AutoCloseable design', 'resource ownership across layers'],

  Threads: ['thread lifecycle and states', 'interrupt protocol', 'daemon versus user threads', 'thread creation cost', 'thread-local state and leakage', 'thread scheduling misconceptions'],
  Runnable: ['task versus thread separation', 'Runnable exception handling', 'shared mutable state in tasks', 'task cancellation cooperation', 'Runnable composition'],
  Callable: ['return values and checked failures', 'Future result and timeout handling', 'cancellation semantics', 'Callable versus Runnable', 'blocking result retrieval'],
  'Executor Framework': ['pool sizing for workload type', 'queue selection and backpressure', 'rejection policies', 'executor lifecycle and shutdown', 'task failure visibility', 'work-stealing versus fixed pools'],
  Synchronization: ['monitor ownership and happens-before', 'synchronized method versus block', 'visibility versus atomicity', 'contention and lock granularity', 'safe publication'],
  Locks: ['ReentrantLock versus synchronized', 'tryLock and timed acquisition', 'read-write lock trade-offs', 'condition variables', 'lock fairness and throughput'],
  Deadlocks: ['deadlock conditions', 'lock ordering prevention', 'thread-dump diagnosis', 'database and application lock interaction', 'deadlock recovery and prevention'],
  'Thread Safety': ['stateless and immutable design', 'atomic compound operations', 'safe publication', 'thread confinement', 'race-condition testing', 'thread-safe API contracts'],
  'Virtual Threads': ['virtual-thread execution model', 'thread-per-request design', 'pinning and blocking behavior', 'virtual threads versus reactive programming', 'migration from platform-thread pools', 'virtual-thread observability and capacity limits'],

  'Lambda Expressions': ['lambda capture and effectively-final variables', 'lambda target typing', 'stateless versus stateful lambdas', 'exception handling in lambdas', 'lambda allocation and readability'],
  'Functional Interfaces': ['single abstract method contract', 'standard functional interface selection', 'function composition', 'primitive specializations', 'custom functional interface design'],
  Streams: ['lazy pipeline execution', 'intermediate and terminal operations', 'stateless versus stateful operations', 'parallel stream trade-offs', 'collector design and reduction correctness', 'stream resource management', 'stream performance diagnosis'],
  Optional: ['modeling absent return values', 'orElse versus orElseGet evaluation', 'map flatMap and filter', 'Optional in fields and parameters', 'Optional misuse and null interoperability'],
  'Method References': ['method-reference forms', 'target typing and overload resolution', 'bound versus unbound references', 'readability versus ambiguity', 'method references in pipelines'],

  'JVM Memory Model': ['happens-before guarantees', 'visibility atomicity and ordering', 'volatile semantics', 'safe publication', 'final-field guarantees', 'data-race diagnosis'],
  Heap: ['heap generations and allocation', 'object retention and reachability', 'heap sizing in containers', 'allocation rate and GC pressure', 'heap dump interpretation'],
  Stack: ['stack frames and local variables', 'recursion and StackOverflowError', 'stack size and thread count', 'escape analysis misconceptions', 'stack traces as diagnostic evidence'],
  Metaspace: ['class metadata allocation', 'class-loader leaks', 'metaspace sizing and limits', 'dynamic class generation', 'metaspace monitoring'],
  'Garbage Collection': ['generational collection behavior', 'G1 GC trade-offs', 'ZGC and low-latency goals', 'Shenandoah and concurrent collection', 'pause versus throughput trade-offs', 'GC log interpretation', 'allocation pressure versus memory leak'],
  'Memory Leaks': ['strong-reference retention', 'static collection leaks', 'ThreadLocal leaks', 'listener and cache leaks', 'class-loader leaks', 'heap-dump dominator analysis'],

  'Class Loading': ['loading linking and initialization phases', 'class initialization triggers', 'duplicate class definitions', 'lazy loading behavior', 'class-loading failure diagnosis'],
  'Class Loaders': ['parent delegation model', 'context class loader', 'custom class-loader isolation', 'class identity across loaders', 'class-loader leak diagnosis'],
  Bytecode: ['bytecode and JVM portability', 'stack-based execution', 'javap investigation', 'instrumentation and agents', 'bytecode verification'],
  'JIT Compiler': ['tiered compilation and warm-up', 'inlining and deoptimization', 'escape analysis and scalar replacement', 'code cache behavior', 'benchmarking JIT-compiled code'],

  Profiling: ['CPU profiling with JFR and async-profiler', 'allocation profiling', 'contention profiling', 'production-safe profiling', 'profile interpretation and false conclusions'],
  Optimization: ['measure-first optimization', 'algorithm versus micro-optimization', 'latency throughput and allocation trade-offs', 'JMH benchmark design', 'performance regression controls'],
  'GC Tuning': ['selecting a collector', 'heap and pause target configuration', 'GC log analysis', 'allocation-rate reduction before tuning', 'container memory limits', 'safe tuning validation'],
  'High Throughput Systems': ['bounded concurrency and backpressure', 'batching and queue design', 'contention reduction', 'allocation-aware design', 'latency percentile protection', 'load shedding'],

  Singleton: ['singleton lifecycle and ownership', 'thread-safe lazy initialization', 'enum singleton', 'singleton testability', 'singleton in dependency-injection containers'],
  Factory: ['creation-policy encapsulation', 'factory method versus abstract factory', 'runtime implementation selection', 'factory growth and maintainability', 'factories with dependency injection'],
  Builder: ['constructing complex immutable objects', 'validation in builders', 'builder versus telescoping constructors', 'builder reuse hazards', 'builders for API compatibility'],
  Strategy: ['runtime algorithm selection', 'strategy composition', 'strategy registration and discovery', 'strategy testing', 'strategy explosion and governance'],
  Observer: ['event notification contracts', 'synchronous versus asynchronous observers', 'listener lifecycle and leaks', 'ordering and failure isolation', 'observer versus durable messaging'],
  'Dependency Injection': ['constructor injection and explicit dependencies', 'scope and lifecycle management', 'circular dependency diagnosis', 'DI container boundaries', 'testability and replacement', 'dependency inversion at architecture boundaries'],

  'Memory Issues': ['rising live-set diagnosis', 'allocation spikes', 'native versus heap memory', 'container OOM kills', 'memory regression containment', 'capacity planning'],
  'High CPU Usage': ['hot method diagnosis', 'runaway loops', 'lock contention and spin', 'excessive garbage collection', 'production-safe CPU profiling', 'CPU incident mitigation'],
  'Thread Dumps': ['thread-state interpretation', 'deadlock detection', 'contention and blocked-thread analysis', 'repeated dump comparison', 'request correlation from thread dumps'],
  'Heap Dumps': ['safe heap-dump capture', 'dominator tree analysis', 'retained-size investigation', 'reference-chain interpretation', 'sensitive data handling in dumps'],
  OutOfMemoryError: ['Java heap space failure', 'GC overhead limit exceeded', 'metaspace exhaustion', 'direct buffer memory exhaustion', 'unable to create native thread', 'OOME incident response'],
  'Performance Troubleshooting': ['latency decomposition', 'resource saturation analysis', 'change correlation', 'production evidence preservation', 'mitigation versus root-cause fix', 'regression prevention'],

  'Enterprise Java Design': ['domain and module boundaries', 'API compatibility and evolution', 'resilience and failure isolation', 'observability as a design requirement', 'platform standards versus team autonomy', 'modern Java upgrade strategy'],
  Scalability: ['horizontal versus vertical scaling', 'state management and stateless services', 'contention and shared-resource limits', 'capacity modeling', 'cost-aware scaling', 'scaling data access'],
  'Concurrency Design': ['ownership of mutable state', 'structured task lifecycles', 'backpressure and bounded work', 'idempotency under concurrency', 'consistency trade-offs', 'concurrency testing strategy'],
  'High Availability': ['redundancy and failure domains', 'timeouts retries and circuit breaking', 'graceful degradation', 'safe deployment and rollback', 'recovery objectives', 'dependency outage design'],
};

const groupProfiles: Record<string, TopicProfile> = {
  Fundamentals: {
    mechanism: 'Core Java language rules define object identity, value flow, initialization, typing, and the bytecode contract executed by the JVM.',
    implementation: 'Make contracts explicit, prefer simple immutable models, and verify behavior across the supported Java runtime versions.',
    failure: 'a language-level assumption creates data corruption, compatibility defects, or surprising runtime behavior',
    decision: 'which language feature makes the contract clearest without hiding cost or failure behavior',
    incident: 'a Java 17 rollout changes an edge-case behavior and a critical request begins returning inconsistent results',
    evidence: ['focused unit reproduction', 'compiled bytecode or runtime-version evidence', 'application logs and failing payload'],
  },
  'Object Oriented Programming': {
    mechanism: 'Object-oriented Java models behavior, state, contracts, and substitution through classes, interfaces, composition, and controlled visibility.',
    implementation: 'Protect invariants, expose narrow contracts, favor composition for reuse, and verify substitutability with behavior-focused tests.',
    failure: 'an inheritance or visibility decision leaks state and makes a shared domain model unsafe to evolve',
    decision: 'where behavior and state belong and which contract can evolve without breaking consumers',
    incident: 'a shared model change breaks multiple services because subclasses depended on undocumented implementation details',
    evidence: ['public API and dependency graph', 'contract and mutation tests', 'failure trace across affected consumers'],
  },
  'Java Language Features': {
    mechanism: 'Java language features balance readability, type safety, allocation behavior, mutability, and compatibility.',
    implementation: 'Select features from their semantic contract, measure allocation-sensitive paths, and preserve safe serialization and API evolution.',
    failure: 'a convenient language feature hides mutation, allocation, identity, or compatibility risk',
    decision: 'which representation is safe, readable, efficient, and evolvable for the domain boundary',
    incident: 'a high-volume mapping path creates unexpected allocation pressure after a model refactor',
    evidence: ['allocation profile', 'API and serialization contract', 'focused behavior benchmark'],
  },
  Collections: {
    mechanism: 'Java collections encode ordering, uniqueness, lookup, concurrency, iteration, and complexity contracts.',
    implementation: 'Choose the implementation from access pattern, cardinality, mutation rate, concurrency, and memory profile; preserve equality contracts.',
    failure: 'the wrong collection or key contract causes latency, lost updates, memory growth, or incorrect lookup behavior',
    decision: 'which collection contract meets correctness, concurrency, complexity, and memory requirements',
    incident: 'p99 latency rises and CPU spikes after a data-volume increase exposes a poor collection choice',
    evidence: ['collection cardinality and operation profile', 'CPU allocation or contention profile', 'equality and concurrency tests'],
  },
  'Exception Handling': {
    mechanism: 'Exceptions transfer failure context across Java call boundaries while preserving causes, resource safety, and API contracts.',
    implementation: 'Catch only where recovery or translation is possible, preserve the cause, classify retryability, and close resources deterministically.',
    failure: 'an exception is swallowed, misclassified, or loses context, delaying recovery and corrupting the client error contract',
    decision: 'which layer owns recovery, translation, retry, logging, and user-safe error communication',
    incident: 'a dependency outage produces thousands of generic 500 responses with no preserved root cause',
    evidence: ['exception chain and structured error fields', 'resource and retry metrics', 'request trace across boundaries'],
  },
  Multithreading: {
    mechanism: 'Java concurrency coordinates task lifecycles, memory visibility, atomicity, scheduling, blocking, and shared-state ownership.',
    implementation: 'Minimize shared mutation, bound concurrency, preserve interrupts, use high-level concurrency utilities, and test failure and cancellation.',
    failure: 'a race, deadlock, unbounded queue, or blocked dependency exhausts capacity and violates correctness',
    decision: 'how tasks, state, cancellation, backpressure, and failure propagation are owned',
    incident: 'request latency climbs while thread count and queue depth grow until the service stops accepting work',
    evidence: ['repeated thread dumps', 'executor queue and task metrics', 'JFR contention and latency events'],
  },
  'Java 8+': {
    mechanism: 'Modern Java functional features express transformations and absence while streams execute lazy pipelines over data sources.',
    implementation: 'Keep functions side-effect aware, use streams where they clarify data flow, and measure parallel or allocation-sensitive paths.',
    failure: 'a stateful lambda, eager fallback, or unsafe parallel pipeline creates incorrect results or hidden performance cost',
    decision: 'whether functional style improves clarity and correctness for this workload',
    incident: 'a parallel-stream release increases latency and corrupts aggregation results under load',
    evidence: ['pipeline and collector contract', 'JFR CPU and allocation profile', 'deterministic concurrency test'],
  },
  'Memory Management': {
    mechanism: 'The JVM manages heap, stacks, class metadata, native memory, reachability, and garbage collection under finite process and container limits.',
    implementation: 'Set explicit memory budgets, observe live set and allocation rate, choose a collector from the SLA, and diagnose retention before tuning.',
    failure: 'retention, allocation pressure, native growth, or class-loader leakage breaches the service memory budget',
    decision: 'how memory is budgeted and which pause, throughput, and footprint trade-offs meet the service SLA',
    incident: 'container memory grows steadily until pods are killed despite apparently healthy heap utilization',
    evidence: ['GC logs and JFR memory events', 'heap or native-memory evidence', 'container and process memory metrics'],
  },
  'JVM Internals': {
    mechanism: 'The JVM loads and verifies classes, executes bytecode, profiles hot paths, and compiles optimized machine code.',
    implementation: 'Treat startup, warm-up, class loading, and compilation as observable runtime behavior rather than invisible implementation detail.',
    failure: 'class-loader isolation, initialization, or JIT behavior creates startup failures, leaks, or unstable latency',
    decision: 'which runtime behavior must be controlled for compatibility, startup, throughput, and diagnostics',
    incident: 'a deployment starts successfully but experiences long latency spikes during warm-up and dynamic class generation',
    evidence: ['class-loading and initialization logs', 'JFR compilation events', 'bytecode or code-cache diagnostics'],
  },
  Performance: {
    mechanism: 'Java performance is the interaction of algorithms, allocation, CPU, contention, I/O, garbage collection, and workload shape.',
    implementation: 'Start from an SLA and production profile, fix the dominant cost, validate under representative load, and guard against regression.',
    failure: 'a local optimization shifts cost to allocation, contention, GC, or a downstream dependency',
    decision: 'which optimization improves the user-facing objective without unacceptable complexity or capacity cost',
    incident: 'a release improves average latency but doubles p99 latency and CPU during peak traffic',
    evidence: ['JFR or async-profiler recording', 'load-test percentile and throughput data', 'GC allocation and dependency metrics'],
  },
  'Design Patterns': {
    mechanism: 'Design patterns name recurring collaboration and creation structures; their value comes from solving a real change or ownership problem.',
    implementation: 'Use the smallest pattern that clarifies variation, lifecycle, and dependency ownership, then test through its public contract.',
    failure: 'pattern-driven abstraction adds indirection, hidden state, or lifecycle problems without reducing change cost',
    decision: 'whether the pattern makes the required variation safer and more maintainable than a direct implementation',
    incident: 'a shared factory and singleton combination makes configuration changes unsafe and tests order-dependent',
    evidence: ['dependency and object-lifecycle graph', 'change-impact analysis', 'contract and concurrency tests'],
  },
  'Production Support': {
    mechanism: 'Java production support connects user impact to JVM, process, thread, memory, dependency, and deployment evidence.',
    implementation: 'Stabilize service with a reversible mitigation, preserve evidence, isolate the constrained resource, and add a durable detection or prevention control.',
    failure: 'diagnostic evidence is destroyed or a symptom-only action allows the incident to recur',
    decision: 'which mitigation restores service while preserving the evidence needed for root cause',
    incident: 'latency and error rate climb rapidly while CPU, memory, and thread signals disagree about the bottleneck',
    evidence: ['JFR plus thread and heap diagnostics', 'service and dependency telemetry', 'release and configuration timeline'],
  },
  Architecture: {
    mechanism: 'Enterprise Java architecture defines service boundaries, concurrency ownership, resilience, observability, evolution, and operating responsibility.',
    implementation: 'Make quality attributes measurable, isolate failure domains, standardize proven platform capabilities, and rehearse recovery.',
    failure: 'a shared dependency or stateful design expands blast radius and prevents independent recovery',
    decision: 'which boundaries and operating model meet scale, availability, security, cost, and team-autonomy goals',
    incident: 'a regional dependency failure cascades across services because retries and shared pools amplify load',
    evidence: ['service-level indicators and dependency map', 'capacity and failure-rehearsal results', 'architecture decision records'],
  },
};

const categoryOverrides: Record<string, Partial<TopicProfile>> = {
  HashMap: {
    mechanism: 'HashMap uses key hash values to select buckets, then equals to identify entries; Java 8 can treeify heavily collided buckets under specific capacity conditions.',
    failure: 'a mutable or inconsistent key makes entries unreachable, while poor hashes create collision-heavy CPU cost',
    incident: 'CPU rises sharply and lookups slow after a new customer identifier becomes the dominant HashMap key',
    evidence: ['key hashCode and equals tests', 'bucket collision and CPU profile', 'map size capacity and mutation trace'],
  },
  'Virtual Threads': {
    mechanism: 'Java 21 virtual threads are lightweight Thread instances scheduled by the JVM, designed to make thread-per-task blocking code scale with much higher concurrency.',
    implementation: 'Use virtual threads for high-concurrency blocking work, avoid pooling them as scarce workers, bound downstream resources, and inspect pinning and thread-local usage.',
    failure: 'pinning, unbounded downstream calls, or excessive ThreadLocal state removes the expected scalability benefit',
    incident: 'a virtual-thread migration increases database saturation and tail latency because request concurrency is no longer bounded',
    evidence: ['JFR virtual-thread pinning events', 'downstream pool and concurrency metrics', 'load-test latency and throughput'],
  },
  'Garbage Collection': {
    mechanism: 'Modern JVM collectors trade throughput, pause time, footprint, and CPU differently; G1 is a balanced default while ZGC targets very low pauses at large heaps.',
    implementation: 'Choose from the service SLA and workload, collect unified GC logs and JFR, and reduce avoidable allocation or retention before tuning flags.',
    failure: 'collector or heap changes hide retention and consume capacity without meeting the pause or throughput objective',
    incident: 'p99 latency breaches its target during promotion pressure even though average CPU remains acceptable',
    evidence: ['unified GC logs', 'JFR allocation and pause events', 'live-set and latency correlation'],
  },
  Deadlocks: {
    mechanism: 'A Java deadlock occurs when threads form a circular wait over resources they hold and cannot release.',
    implementation: 'Define global lock ordering, minimize nested locking, use timed acquisition where recovery is meaningful, and monitor blocked-thread growth.',
    failure: 'request-processing threads become permanently blocked while health checks can still appear healthy',
    incident: 'throughput falls to zero for one workflow while repeated thread dumps show the same circular lock ownership',
    evidence: ['three repeated thread dumps', 'lock ownership graph', 'request and executor saturation metrics'],
  },
  OutOfMemoryError: {
    mechanism: 'OutOfMemoryError identifies a failed JVM allocation domain such as heap, metaspace, direct buffer memory, or native-thread creation; each requires different evidence.',
    implementation: 'Classify the exact OOME, preserve a safe diagnostic artifact, stabilize capacity, and prove whether retention, allocation rate, configuration, or native limits caused it.',
    failure: 'a broad heap increase delays recurrence while the actual allocation domain or leak remains unresolved',
    incident: 'one pod repeatedly restarts with unable to create native thread while heap usage remains below its limit',
    evidence: ['exact OOME and process logs', 'heap native-memory or thread evidence', 'container limits and workload timeline'],
  },
  Streams: {
    mechanism: 'A Java stream is a lazy single-use pipeline whose terminal operation drives traversal, transformation, and reduction over a source.',
    implementation: 'Keep operations non-interfering and stateless, select collectors with correct identity and combination behavior, and parallelize only after measuring a suitable workload.',
    failure: 'stateful side effects or an invalid collector produces nondeterministic results and poor parallel performance',
    incident: 'a parallel aggregation occasionally loses totals during peak settlement processing',
    evidence: ['pipeline and collector implementation', 'deterministic parallel test', 'JFR CPU allocation and fork-join activity'],
  },
  'Thread Dumps': {
    mechanism: 'A thread dump is a point-in-time view of Java thread stacks, states, locks, and ownership; repeated dumps reveal whether work is progressing.',
    implementation: 'Capture multiple dumps at intervals, correlate thread names and stacks with pools and requests, and distinguish blocked, waiting, runnable, and deadlocked behavior.',
    failure: 'a single dump is interpreted without workload or progression context, leading to the wrong mitigation',
    incident: 'all request workers appear busy while throughput collapses and one downstream call dominates repeated stacks',
    evidence: ['multiple timestamped thread dumps', 'executor and request telemetry', 'downstream latency and timeout metrics'],
  },
  'Heap Dumps': {
    mechanism: 'A heap dump captures objects and references at a point in time so retained size, dominators, and paths to GC roots can explain memory retention.',
    implementation: 'Capture only with an operational and security plan, compare retained structures against expected cardinality, and confirm findings with allocation and live-set trends.',
    failure: 'a very large dump destabilizes production or exposes sensitive data without proving the retention source',
    incident: 'old-generation occupancy grows after every traffic peak and never returns to baseline',
    evidence: ['dominator tree and GC-root paths', 'class histogram and retained size', 'GC live-set and allocation timeline'],
  },
};

const topicSpecs: TopicSpec[] = coreJavaInterviewPrepTopicGroups.flatMap((group) => group.topics.map((topic, index, topics) => ({
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
  const base = groupProfiles[spec.topicGroup];
  return { ...base, ...categoryOverrides[spec.category] };
}

function concernGuidance(concern: string, profile: TopicProfile) {
  const rules: Array<[RegExp, string]> = [
    [/hash|equals|key|set|map/i, 'Define identity and equality first, select the collection from the operation profile, and test mutation, collision, null, and concurrency behavior.'],
    [/thread|concurr|lock|synchron|deadlock|atomic|visibility|virtual/i, 'Name the shared state and happens-before relationship, bound concurrency, preserve cancellation, and prove safety with thread diagnostics plus repeatable tests.'],
    [/memory|heap|metaspace|garbage|gc|allocation|outofmemory/i, 'Classify the memory domain, correlate live set and allocation rate with workload, preserve the right artifact, and change configuration only after proving the cause.'],
    [/exception|resource|close|error/i, 'Preserve the cause, classify recovery and retry ownership, close resources deterministically, and expose a stable safe error contract.'],
    [/stream|lambda|optional|functional|method reference/i, 'Keep the pipeline or function side-effect aware, validate absence and failure behavior, and measure allocation or parallel execution before optimizing.'],
    [/class load|class-loader|bytecode|jit|compil|warm-up/i, 'Capture loading and compilation evidence, reproduce with the exact runtime and flags, and separate startup, warm-up, and steady-state behavior.'],
    [/profile|performance|throughput|cpu|latency|optimization/i, 'Start from a user-facing percentile and representative workload, profile the dominant cost, change one cause, and verify capacity plus regression protection.'],
    [/singleton|factory|builder|strategy|observer|dependency injection|composition/i, 'Explain the change or lifecycle problem the pattern solves, keep ownership explicit, and reject abstraction that adds indirection without reducing risk.'],
    [/scale|availability|enterprise|architecture|resilien|capacity/i, 'Define measurable quality attributes, failure domains, ownership, capacity assumptions, recovery behavior, and an exception path for governance.'],
    [/record|sealed|enum|immutab|encapsul/i, 'Protect domain invariants, define evolution and serialization behavior, and state where apparent immutability or closure does not extend to referenced objects.'],
  ];
  return rules.find(([pattern]) => pattern.test(concern))?.[1]
    ?? `${profile.implementation} For ${concern}, document the contract, cost, failure behavior, and validation evidence.`;
}

function questionText(intent: Intent, concern: string, category: string) {
  const values: Record<Intent, string> = {
    concept: `Explain ${concern} in Java ${category}. Which misconception causes real production defects?`,
    practical: `How would you implement and validate ${concern} when using Java ${category}?`,
    troubleshooting: `How would you troubleshoot a production failure involving ${concern} in Java ${category}?`,
    incident: `A Java ${category} production incident exposes a weakness in ${concern}. How would you respond and prevent recurrence?`,
    architecture: `How would you make and govern an architecture decision about ${concern} for enterprise Java ${category}?`,
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
    ? `${profile.mechanism} In Java ${spec.category}, the production-relevant rule for ${concern} is: ${guidance}`
    : intent === 'practical'
      ? `In Java ${spec.category}, implement ${concern} with this production approach: ${guidance}`
      : intent === 'architecture'
        ? `For enterprise Java ${spec.category}, treat ${concern} as an explicit architecture and operating decision: ${profile.decision}.`
        : `For Java ${spec.category}, preserve evidence, classify the failing JVM or application boundary, and test ${concern} as a hypothesis before changing production.`;
  const detailed: Record<Intent, string[]> = {
    concept: [
      `Direct answer: ${direct}`,
      `What: ${concern} has a specific correctness and runtime contract within ${spec.category}.`,
      `Why: Misunderstanding it can cause ${profile.failure}.`,
      `How: ${guidance}`,
      `Production validation: Prove the explanation with ${list(profile.evidence)}.`,
    ],
    practical: [
      `Direct answer: ${direct}`,
      `Implementation choices: ${guidance}`,
      `Testing approach: Cover normal behavior, boundaries, invalid inputs, concurrency where relevant, and runtime-version compatibility.`,
      `Operational evidence: Require ${list(profile.evidence)} before release.`,
      `Trade-off: Make this decision explicit: ${profile.decision}.`,
    ],
    troubleshooting: [
      `Direct answer: ${direct}`,
      `Observed symptom: ${profile.incident}.`,
      `Troubleshooting approach: Preserve ${profile.evidence[0]}, compare ${profile.evidence[1]} with a healthy baseline, and use ${profile.evidence[2]} to isolate the owner.`,
      `Likely cause: An assumption about ${concern} changed correctness, allocation, concurrency, or runtime behavior.`,
      `Durable fix: Correct the narrow cause, add a focused regression test, and alert on the original user-impact signal.`,
    ],
    incident: [
      `Direct answer: ${direct}`,
      `Impact: ${profile.incident}.`,
      `Triage: Scope affected requests, JVMs, regions, dependencies, and the release window before mitigating.`,
      `Mitigation: Apply the smallest reversible action while preserving ${profile.evidence[0]}.`,
      `Prevention: Prove root cause with ${list(profile.evidence)} and convert it into a release or runtime guardrail.`,
    ],
    architecture: [
      `Direct answer: ${direct}`,
      `Architecture decision: ${profile.decision}.`,
      `Decision criteria: Evaluate ${concern} against correctness, latency, throughput, memory, failure isolation, security, cost, and team ownership.`,
      `Operating model: Define the supported pattern, owner, measurable guardrail, exception path, and recovery plan.`,
      `Validation: Use ${list(profile.evidence)} and a production-scale failure rehearsal.`,
    ],
  };
  const scenarios: Record<Intent, string> = {
    concept: `During a ${industry} ${spec.category} design review, the team discovers that ${profile.incident}. The candidate must connect the misconception around ${concern} to the Java runtime contract and prove the correction with ${profile.evidence[0]}.`,
    practical: `A canary ${spec.category} implementation of ${concern} fails under peak traffic when ${profile.incident}. The team captures ${profile.evidence[0]}, validates the exact JVM and workload, and requires ${profile.evidence[2]} before rollout resumes.`,
    troubleshooting: `${spec.category} support reports that ${profile.incident}. The engineer treats ${concern} as a hypothesis, preserves ${profile.evidence[0]}, compares ${profile.evidence[1]} with a healthy JVM, and isolates the cause with ${profile.evidence[2]}.`,
    incident: `Ten minutes after a ${spec.category} release involving ${concern}, ${profile.incident}. The incident lead scopes impact, applies a reversible mitigation, preserves ${list(profile.evidence)}, and accepts recovery only after the service-level metric returns to target.`,
    architecture: `A quarterly ${spec.category} architecture review finds inconsistent decisions about ${concern} contributed to this signal: ${profile.incident}. The lead defines the approved pattern, capacity assumption, owner, exception path, and measurable guardrail.`,
  };
  const projects: Record<Intent, string> = {
    concept: `A ${industry} platform made ${spec.category} concern ${concern} part of senior-engineer onboarding after a misunderstanding caused ${profile.failure}. The team documented the runtime mechanism and validated it through ${profile.evidence[0]}.`,
    practical: `For a high-volume ${industry} service, the team implemented ${concern} in ${spec.category} using this rule: ${guidance} Release approval required ${profile.evidence[0]} and ${profile.evidence[1]}.`,
    troubleshooting: `A ${industry} production-support team traced a recurring ${spec.category} defect to ${concern}, correlated ${list(profile.evidence.slice(0, 2))}, corrected the narrow cause, and added a diagnostic runbook.`,
    incident: `During a peak ${industry} release, ${spec.category} concern ${concern} contributed to ${profile.incident}. The team restored service, reconciled affected work, and added a canary plus alert tied to the root cause.`,
    architecture: `A ${industry} enterprise standardized ${concern} for ${spec.category} only after deciding ${profile.decision}. The architecture record assigned ownership and required ${profile.evidence[0]} as ongoing proof.`,
  };

  return {
    id: `core-java-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'core-java',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question,
    shortAnswer: `${direct} Validate this ${focus[intent]} with ${profile.evidence[0]}.`,
    detailedAnswer: detailed[intent],
    productionScenario: scenarios[intent],
    realProjectExample: projects[intent],
    interviewerExpectation: `For this ${spec.category} question, the interviewer expects a precise ${focus[intent]} for ${concern}, awareness of modern Java 8 through 21 where relevant, evidence from ${profile.evidence[0]} and ${profile.evidence[1]}, and a credible response to ${profile.incident}.`,
    commonMistakes: [
      `For ${spec.category}, giving a textbook definition without explaining the runtime and correctness contract for ${concern}.`,
      `Changing ${concern} during a ${focus[intent]} exercise without collecting ${profile.evidence[0]} or reproducing the production workload.`,
      `Ignoring this ${spec.category} trade-off: ${profile.decision}.`,
      `Closing the ${focus[intent]} work for ${concern} without a regression test, operational signal, and accountable owner.`,
    ],
    followUpQuestions: [
      `For the ${focus[intent]} view of ${spec.category}, what changed for ${concern} across Java 8, 11, 17, and 21 where applicable?`,
      `How would ${profile.evidence[0]} and ${profile.evidence[1]} prove your ${focus[intent]} explanation of ${concern} in ${spec.category}?`,
      `Which concurrency, memory, or compatibility constraint most changes this ${spec.category} ${focus[intent]} answer for ${concern}?`,
      `From the ${focus[intent]} perspective, at what scale or failure condition would you revisit this decision: ${profile.decision}?`,
    ],
    frequencyScore: Math.max(65, (intent === 'concept' ? 94 : intent === 'practical' ? 91 : intent === 'troubleshooting' ? 88 : intent === 'incident' ? 85 : 81) - (index % 10)),
    commonWrongAnswer: `A weak answer describes ${concern} without explaining the Java runtime contract, trade-off, production evidence, and failure behavior.`,
    architectPerspective: `From the ${focus[intent]} perspective, govern ${concern} in ${spec.category} through this decision: ${profile.decision}. Evaluate correctness, concurrency, memory, latency, availability, compatibility, observability, cost, and the production signal "${profile.incident}".`,
    keyTakeaway: `Answer ${concern} through its Java contract, production evidence, failure behavior, and explicit ownership.`,
    difficultyLevel: difficulties[intent],
    experienceLevel: experiences[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I explain the supported Java behavior of ${concern} and demonstrate the happy path.`,
      mid: `I implement and test ${concern}, including boundaries, failures, and runtime-version behavior.`,
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

const topicGroups: InterviewPrepTopicGroup[] = coreJavaInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in modern enterprise Java.`,
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
    id: 'core-java-memory-growth', title: 'Live set grows after every traffic peak', topic: 'Memory Leaks',
    problem: 'Old-generation occupancy never returns to baseline and pods eventually restart.',
    rootCauseAnalysis: ['Static or cache retention', 'ThreadLocal values retained by pooled threads', 'Listeners or class loaders remain reachable'],
    troubleshootingSteps: ['Correlate live set with workload', 'Capture a controlled heap dump', 'Inspect dominators and GC-root paths', 'Fix ownership and add a memory regression test'],
    expectedInterviewAnswer: 'Classify allocation versus retention, preserve heap and GC evidence, then fix the retaining owner instead of only increasing heap.',
    seniorApproach: 'A senior answer correlates GC logs, allocation profile, heap dominators, and deployment changes.',
    architectApproach: 'An architect defines memory budgets, dump-handling policy, regression gates, and cache ownership.',
    relatedQuestions: questions.filter((question) => question.category === 'Memory Leaks').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'core-java-thread-exhaustion', title: 'Request threads and queue grow without recovery', topic: 'Executor Framework',
    problem: 'Latency rises until all workers wait on a slow downstream service.',
    rootCauseAnalysis: ['Unbounded executor queue', 'Missing timeouts and cancellation', 'Concurrency exceeds downstream capacity'],
    troubleshootingSteps: ['Capture repeated thread dumps', 'Inspect executor and downstream metrics', 'Apply bounded mitigation', 'Add backpressure and timeout controls'],
    expectedInterviewAnswer: 'Prove where threads wait, restore bounded flow, preserve interrupts, and align concurrency with downstream capacity.',
    seniorApproach: 'A senior answer distinguishes pool starvation, deadlock, and dependency latency using repeated evidence.',
    architectApproach: 'An architect standardizes bounded executors, resilience policy, and capacity testing.',
    relatedQuestions: questions.filter((question) => question.category === 'Executor Framework').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'core-java-high-cpu', title: 'CPU reaches 100 percent after release', topic: 'High CPU Usage',
    problem: 'Throughput falls while CPU remains saturated on every instance.',
    rootCauseAnalysis: ['Hot loop or algorithmic regression', 'Lock spin or contention', 'Allocation surge causing excessive GC'],
    troubleshootingSteps: ['Correlate with release and workload', 'Capture JFR or async-profiler evidence', 'Separate application CPU from GC', 'Mitigate and add a performance gate'],
    expectedInterviewAnswer: 'Profile before changing code, identify the dominant stack or GC cost, and validate the fix under representative load.',
    seniorApproach: 'A senior answer uses production-safe profiling and protects p99 latency during mitigation.',
    architectApproach: 'An architect requires performance budgets, canaries, and capacity ownership.',
    relatedQuestions: questions.filter((question) => question.category === 'High CPU Usage').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'core-java-virtual-thread-saturation', title: 'Virtual-thread migration overloads a dependency', topic: 'Virtual Threads',
    problem: 'Request concurrency rises sharply and database latency becomes the new bottleneck.',
    rootCauseAnalysis: ['Virtual threads removed an accidental concurrency limit', 'Database connections remain scarce', 'No explicit backpressure policy'],
    troubleshootingSteps: ['Inspect virtual-thread and downstream concurrency', 'Measure pinning and queue behavior', 'Introduce explicit resource limits', 'Retest latency and throughput'],
    expectedInterviewAnswer: 'Virtual threads make blocking concurrency cheaper but do not make downstream resources unlimited.',
    seniorApproach: 'A senior answer checks pinning, ThreadLocal cost, connection pools, and cancellation behavior.',
    architectApproach: 'An architect separates task-concurrency policy from resource-capacity policy.',
    relatedQuestions: questions.filter((question) => question.category === 'Virtual Threads').slice(0, 4).map((question) => question.id),
  },
];

export const coreJavaInterviewPrep: InterviewPrepSection = {
  technologyId: 'core-java',
  technologyLabel: 'Core Java',
  title: 'Core Java Interview Prep',
  description: 'Enterprise Core Java interview preparation focused on modern Java, JVM internals, concurrency, production diagnostics, performance, and architecture decisions.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Java Developer', years: '0-2 Years', summary: 'Explain Java language, OOP, collections, exceptions, and JVM fundamentals.' },
    { id: 'mid', label: 'Backend / Full Stack Developer', years: '2-5 Years', summary: 'Implement reliable collections, concurrency, modern Java, and memory-aware services.' },
    { id: 'senior', label: 'Senior Java Developer / Technical Lead', years: '5-8 Years', summary: 'Lead JVM diagnostics, performance, production support, and concurrency design.' },
    { id: 'architect', label: 'Solution Architect', years: '8+ Years', summary: 'Design scalable, highly available enterprise Java platforms and operating models.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Java Developer', description: 'Language, OOP, collections, exceptions, and JVM fundamentals.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'mid', label: 'Backend Developer', description: 'Modern Java, collection choices, concurrency, and reliable implementation.', questionCount: 10, recommendedMinutes: 35 },
    { id: 'senior', label: 'Senior Java Developer / Lead', description: 'JVM diagnostics, performance, production incidents, and concurrency.', questionCount: 10, recommendedMinutes: 45 },
    { id: 'architect', label: 'Solution Architect', description: 'Scale, availability, governance, resilience, and operating model.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-frequency Core Java decisions and production signals.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Collections, concurrency, JVM, modern Java, and production support.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 25).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Core Java preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 50).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
