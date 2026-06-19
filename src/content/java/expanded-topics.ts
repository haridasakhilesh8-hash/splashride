import type { TopicContent } from '../types';

interface JavaExpandedTopicSpec {
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
const versions = ['Java 8', 'Java 11', 'Java 17', 'Java 21'];

function topic(spec: JavaExpandedTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the Core Java topics senior backend engineers rely on when they need to explain correctness, runtime behavior, and production trade-offs with confidence.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers care about this topic:**
- Core Java questions are rarely only about syntax; they are about contracts, runtime cost, and correctness under production pressure
- Strong answers connect the language or JVM rule to maintainability, performance, and debugging evidence
- Senior engineers explain not only what the feature does, but when it becomes risky or expensive`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Core Java example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} only a theory topic?`,
        answer: `No. ${spec.title} shapes API design, debugging strategy, runtime behavior, and how safely Java code evolves in large systems.`,
      },
      {
        question: `What makes a weak interview answer for ${spec.title}?`,
        answer: `A weak answer gives a definition but skips contracts, trade-offs, failure modes, and the evidence you would use to prove the behavior in production.`,
      },
      {
        question: `How should senior engineers explain ${spec.title}?`,
        answer: `Senior answers connect ${spec.title} to code ownership, runtime behavior, production risk, and the operational signals that validate the decision.`,
      },
    ],
    productionIssues: [
      `${spec.title} is used without a clear contract, so teams make different assumptions about correctness, mutability, or runtime cost.`,
      `A release changes how ${spec.title.toLowerCase()} behaves, but tests and production diagnostics do not capture the new failure mode quickly enough.`,
      `Developers discuss ${spec.title} as a language feature only and miss the effect on memory, concurrency, compatibility, or long-term maintainability.`,
    ],
    bestPractices: [
      `Treat ${spec.title} as a production engineering decision, not only as a Java definition.`,
      'Write down the contract, the expected failure behavior, and the validation signal before scaling the pattern across the codebase.',
      'Use examples from API design, runtime diagnostics, or incident handling when preparing interview answers.',
      'Prefer explanations that connect correctness, cost, and maintainability instead of memorized definitions.',
    ],
    architectNote: `In enterprise Java systems, ${spec.title} should be evaluated through correctness, concurrency safety, compatibility, memory behavior, observability, and how many teams or services must live with the decision over time.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Java project?`,
        answer: `Explain the rule behind ${spec.title}, then connect it to API design, runtime behavior, production failure modes, and the evidence you would collect before changing a live system.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The common concern is that teams apply the feature for convenience, then discover hidden cost in debugging, performance, memory, compatibility, or operational ownership.`,
      },
    ],
    keyTakeaways: [
      `${spec.title} matters because it changes real backend behavior, not just code style.`,
      'Strong Core Java answers connect language rules, JVM behavior, and production support together.',
      'Interview depth comes from showing trade-offs, evidence, and prevention strategy clearly.',
      'Senior engineers explain when a convenient Java feature becomes a scaling or debugging liability.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const specs: JavaExpandedTopicSpec[] = [
  {
    slug: 'java-control-statements',
    title: 'Control Statements',
    description: 'Understand Java control flow choices, switch expressions, loop behavior, and how branching decisions affect readability and defects.',
    concept: 'Control statements define how Java code branches, loops, and exits work. That includes if/else, switch, switch expressions, for loops, enhanced for loops, while loops, break, continue, and return paths.',
    why: 'Control flow is where many everyday logic bugs begin. Senior engineers need to choose structures that keep behavior obvious, handle edge cases cleanly, and stay readable during maintenance.',
    usage: 'Teams use careful control-flow design in validation pipelines, mapping logic, retry loops, resource handling, and any code path where branching complexity can turn into production defects.',
    workflow: 'Start from the decision the code must make, choose the smallest control structure that expresses it clearly, isolate side effects, and verify that exit paths, defaults, and loop termination are all explicit.',
    exampleTitle: 'Control-flow review checklist',
    exampleCode: `Ask first
-> is the branch exhaustive?
-> is the default behavior safe?
-> can the loop terminate predictably?
-> would a guard clause make the code easier to trust?`,
    relatedTopics: ['java-operators', 'java-data-types', 'java-exception-trycatch'],
  },
  {
    slug: 'java-composition',
    title: 'Composition',
    description: 'Learn when composition is safer than inheritance and how delegation keeps Java models easier to evolve.',
    concept: 'Composition models behavior by assembling smaller collaborating objects instead of extending a base class. It is the has-a approach that lets Java code reuse behavior without rigid hierarchy coupling.',
    why: 'Inheritance looks convenient early, but deep hierarchies make change risky. Composition gives teams clearer boundaries, easier testing, and fewer fragile base-class surprises.',
    usage: 'Composition is used in domain services, pricing strategies, notification pipelines, integration adapters, and Spring-managed components where behavior changes over time.',
    workflow: 'Define the capability as a narrow contract, delegate that behavior to the right collaborator, and keep the owning class focused on orchestration instead of inheriting unrelated responsibilities.',
    exampleTitle: 'Composition decision lens',
    exampleCode: `Prefer composition when
- behavior may vary independently
- teams need to swap implementations
- testing should isolate one responsibility`,
    relatedTopics: ['java-abstraction', 'java-inheritance', 'java-polymorphism'],
  },
  {
    slug: 'java-string',
    title: 'String',
    description: 'Understand string immutability, pooling, equality, Unicode concerns, and why String behavior matters in real backend systems.',
    concept: 'String is Java\'s immutable text type. It has special runtime behavior through the string pool, literal reuse, Unicode handling, and frequent use in APIs, logs, identifiers, and payload transformations.',
    why: 'String behavior influences memory pressure, equality bugs, security handling, and performance in every Java codebase. Interviewers often use it to test whether candidates truly understand immutability and identity.',
    usage: 'Strings show up in DTO mapping, request validation, JSON processing, logging, caching keys, and any path where text identity or encoding matters.',
    workflow: 'Treat strings as immutable values, compare them with equals, avoid unnecessary copies, and watch for places where large or sensitive strings live longer than expected.',
    exampleTitle: 'String production guardrails',
    exampleCode: `Use String carefully when
- equality must be value-based
- payloads are large
- logs may contain secrets
- Unicode or normalization can affect matching`,
    relatedTopics: ['java-stringbuilder', 'java-wrapper-classes', 'java-operators'],
  },
  {
    slug: 'java-stringbuilder',
    title: 'StringBuilder',
    description: 'Learn when mutable string construction is the right performance choice and where builder reuse becomes risky.',
    concept: 'StringBuilder is Java\'s unsynchronized mutable sequence for building strings efficiently in single-threaded code paths. It avoids repeated intermediate string allocations during concatenation-heavy work.',
    why: 'Candidates often know StringBuilder exists but cannot explain when it matters. Senior answers connect it to allocation pressure, readability, and safe ownership boundaries.',
    usage: 'Teams use StringBuilder in batch formatting, CSV generation, report rendering, and parser-like code where repeated concatenation would allocate too much.',
    workflow: 'Use StringBuilder for scoped mutable assembly, keep it local to the operation, size it reasonably when possible, and convert to String only at the boundary where immutable output is needed.',
    exampleTitle: 'StringBuilder usage rule',
    exampleCode: `Good fit
-> loop-heavy concatenation
-> formatter-like code
-> request-scoped text assembly`,
    relatedTopics: ['java-string', 'java-stringbuffer', 'java-performance-troubleshooting'],
  },
  {
    slug: 'java-stringbuffer',
    title: 'StringBuffer',
    description: 'Understand where synchronized mutable string handling still appears and why StringBuffer is usually a legacy or interoperability choice.',
    concept: 'StringBuffer is the synchronized predecessor to StringBuilder. It provides thread-safe method-level operations for mutable string construction, but usually with more overhead and less clarity than modern alternatives.',
    why: 'Interviewers use StringBuffer to test whether candidates understand thread-safety trade-offs instead of memorizing class names. The right answer is usually about context, not nostalgia.',
    usage: 'StringBuffer mainly appears in older libraries, legacy enterprise utilities, or code that stayed close to historical APIs and never needed a modern refactor.',
    workflow: 'Before keeping StringBuffer, confirm that synchronized mutable string operations are actually required, and check whether better ownership design would remove the need for sharing the buffer at all.',
    exampleTitle: 'StringBuffer decision check',
    exampleCode: `Ask before using StringBuffer
-> do multiple threads really share this instance?
-> would local StringBuilder be simpler?
-> is synchronization on each method enough for the full workflow?`,
    relatedTopics: ['java-string', 'java-stringbuilder', 'java-thread-safety'],
  },
  {
    slug: 'java-wrapper-classes',
    title: 'Wrapper Classes',
    description: 'Learn how wrapper types behave, including identity, caching, nullability, and why wrappers change Java semantics in collections and APIs.',
    concept: 'Wrapper classes such as Integer, Long, Boolean, and Double represent primitive values as objects. They enable generics and collections but introduce identity, caching, and nullability concerns that primitives do not have.',
    why: 'Wrapper classes sit behind common interview traps because they look simple while changing equality behavior, allocation cost, and null-handling rules in subtle ways.',
    usage: 'Wrappers appear in collections, DTOs, persistence mappings, optional request fields, and generic APIs that cannot work directly with primitives.',
    workflow: 'Use primitives when null is not a real state, use wrappers when object semantics or missing values matter, and be explicit about equality, parsing, and null-handling at boundaries.',
    exampleTitle: 'Primitive versus wrapper rule',
    exampleCode: `Prefer primitive when
- value is required
- hot paths are allocation-sensitive

Use wrapper when
- null is meaningful
- collections or generics require objects`,
    relatedTopics: ['java-autoboxing', 'java-data-types', 'java-collections-list'],
  },
  {
    slug: 'java-autoboxing',
    title: 'Autoboxing',
    description: 'Understand automatic boxing and unboxing, hidden allocation, null risks, and why autoboxing matters in performance-sensitive Java code.',
    concept: 'Autoboxing lets the compiler convert between primitives and wrapper objects automatically. It improves readability but can hide allocations, equality surprises, and NullPointerException risks during unboxing.',
    why: 'Senior Java answers should explain where convenience hides cost. Autoboxing is a classic example of code that looks clean but changes runtime behavior in important ways.',
    usage: 'Autoboxing appears in streams, collections, counters, DTO mapping, framework parameter binding, and any place where primitive values cross object-oriented APIs.',
    workflow: 'Know when conversions happen, avoid unnecessary boxing in hot paths, and guard against null wrappers before implicit unboxing turns a validation issue into a runtime crash.',
    exampleTitle: 'Autoboxing risk scan',
    exampleCode: `Look for autoboxing when
- primitives enter collections
- wrappers are compared
- counters run in tight loops
- null values come from DB or payload mapping`,
    relatedTopics: ['java-wrapper-classes', 'java-streams', 'java-operators'],
  },
  {
    slug: 'java-enums',
    title: 'Enums',
    description: 'Learn how Java enums model fixed sets safely and where enum evolution affects persistence, APIs, and strategy design.',
    concept: 'Enums are type-safe constants with class-like behavior. They can hold fields, methods, and interfaces, making them useful for more than simple status flags.',
    why: 'Enums are easy to misuse as if they were plain strings. Interview depth comes from explaining identity, safe evolution, and where persisted enum values create compatibility risk.',
    usage: 'Teams use enums for workflow states, roles, feature modes, currencies, and boundaries where fixed values need readable contracts.',
    workflow: 'Define enum values as domain-level meanings, avoid coupling external storage directly to fragile names when evolution is likely, and add behavior only when it improves clarity.',
    exampleTitle: 'Enum evolution checklist',
    exampleCode: `Enums work well when
- values are closed and meaningful
- type safety matters
- behavior can stay close to the value`,
    relatedTopics: ['java-records', 'java-sealed-classes', 'java-strategy'],
  },
  {
    slug: 'java-records',
    title: 'Records',
    description: 'Understand records as concise immutable data carriers and where they fit or do not fit in enterprise Java systems.',
    concept: 'Records are compact Java types for immutable data modeling. They generate accessors, equals, hashCode, and toString automatically, making them useful for DTOs and value-oriented contracts.',
    why: 'Records are now a common interview topic because they change how modern Java teams model transport objects and small immutable values.',
    usage: 'Teams use records for API responses, event payloads, query results, configuration snapshots, and any place where immutable data shape matters more than lifecycle behavior.',
    workflow: 'Choose records when the type is value-oriented, validate invariants in constructors, and avoid forcing records into roles that need mutable state, ORM-style lifecycle behavior, or deep framework magic.',
    exampleTitle: 'Record fit assessment',
    exampleCode: `Good record candidates
-> DTOs
-> events
-> immutable value objects`,
    relatedTopics: ['java-enums', 'java-sealed-classes', 'java-encapsulation'],
  },
  {
    slug: 'java-sealed-classes',
    title: 'Sealed Classes',
    description: 'Learn how sealed classes constrain inheritance and improve exhaustiveness in modern Java domain modeling.',
    concept: 'Sealed classes and interfaces let Java code define a closed set of permitted subclasses. This helps model controlled hierarchies where the allowed implementations are deliberate and limited.',
    why: 'Interviewers use sealed classes to test whether candidates understand modern Java modeling beyond traditional inheritance.',
    usage: 'Sealed hierarchies appear in domain events, result types, validation outcomes, workflow states, and APIs where exhaustive reasoning is more valuable than unrestricted extension.',
    workflow: 'Define the parent contract, list the permitted subclasses intentionally, and make sure the closed hierarchy matches the real ownership boundary rather than future plugin-style extension needs.',
    exampleTitle: 'Closed hierarchy rule',
    exampleCode: `Use sealed classes when
- the valid subtypes are intentionally finite
- pattern matching or exhaustive reasoning helps
- you own the whole hierarchy`,
    relatedTopics: ['java-inheritance', 'java-abstraction', 'java-records'],
  },
  {
    slug: 'java-collection-framework',
    title: 'Collection Framework',
    description: 'Get a practical view of Java collection contracts, hierarchy choices, and how access patterns should drive implementation decisions.',
    concept: 'The Java Collection Framework provides the main contracts for grouping data through interfaces such as Collection, List, Set, Queue, Deque, and Map, along with many implementation choices.',
    why: 'Choosing the wrong collection is a classic source of bugs and performance regressions. Senior engineers must reason from usage pattern instead of habit.',
    usage: 'Collection design shows up in caching, batching, request aggregation, deduplication, task queues, domain modeling, and any backend feature that stores changing sets of values.',
    workflow: 'Start from ordering, uniqueness, lookup, mutation frequency, concurrency, and memory expectations; then choose the collection contract and implementation that matches those realities.',
    exampleTitle: 'Collection selection lens',
    exampleCode: `Ask before choosing a collection
-> do I need ordering?
-> do I need uniqueness?
-> is lookup or iteration dominant?
-> can multiple threads touch it?`,
    relatedTopics: ['java-collections-list', 'java-collections-set', 'java-collections-map'],
  },
  {
    slug: 'java-concurrent-collections',
    title: 'Concurrent Collections',
    description: 'Understand thread-safe collection choices, weakly consistent iteration, and where concurrent data structures are safer than locking everything manually.',
    concept: 'Concurrent collections such as ConcurrentHashMap, BlockingQueue, and CopyOnWriteArrayList provide specialized thread-safe behavior for specific access patterns without forcing every collection use through manual synchronization.',
    why: 'Concurrency bugs often begin with normal collections used in shared state. Interviewers want to know whether candidates can match the data structure to the contention pattern.',
    usage: 'Teams use concurrent collections in caches, work queues, registries, subscriber lists, and cross-thread coordination paths.',
    workflow: 'Identify whether the workload is read-heavy, write-heavy, queue-based, or hotspot-driven, then choose the concurrent collection whose consistency and throughput model matches that shape.',
    exampleTitle: 'Concurrent collection fit',
    exampleCode: `Use concurrent collections when
- shared state is unavoidable
- throughput matters
- coarse synchronized blocks become bottlenecks`,
    relatedTopics: ['java-hashmap', 'java-synchronization', 'java-thread-safety'],
  },
  {
    slug: 'java-checked-exceptions',
    title: 'Checked Exceptions',
    description: 'Learn when checked exceptions clarify recoverable contracts and when they create noisy APIs that teams stop respecting.',
    concept: 'Checked exceptions are Java exceptions the compiler forces callers to handle or declare. They are intended to model failures that a caller can reasonably recover from.',
    why: 'This topic reveals whether a candidate understands API design and recovery ownership, not just syntax.',
    usage: 'Checked exceptions appear in IO, integration boundaries, parsing, validation layers, and libraries that want to force explicit handling of recoverable operations.',
    workflow: 'Use checked exceptions when the caller can take a meaningful next action, preserve the cause chain, and avoid turning every internal detail into part of your public API surface.',
    exampleTitle: 'Checked exception contract',
    exampleCode: `Good checked exception usage
-> caller can retry, compensate, or choose a fallback

Design question
-> who truly owns recovery?`,
    relatedTopics: ['java-unchecked-exceptions', 'java-exception-custom', 'java-file-api'],
  },
  {
    slug: 'java-unchecked-exceptions',
    title: 'Unchecked Exceptions',
    description: 'Understand runtime exceptions, fail-fast boundaries, and where unchecked failures make Java APIs clearer.',
    concept: 'Unchecked exceptions extend RuntimeException and do not need explicit declaration. They usually represent programming errors, invalid state, invariant violations, or failures callers are not realistically expected to recover from locally.',
    why: 'Interviewers ask about unchecked exceptions to test how candidates classify failure, validation responsibility, and public API design.',
    usage: 'Unchecked exceptions are common in domain validation, invariant enforcement, mapper assumptions, and internal programming errors.',
    workflow: 'Use unchecked exceptions when recovery at the call site would be artificial, document the contract clearly, and pair them with validation, logs, and monitoring so operational diagnosis stays practical.',
    exampleTitle: 'Unchecked exception boundary',
    exampleCode: `Use unchecked exceptions for
- invalid caller assumptions
- impossible states
- domain invariants that must stop execution`,
    relatedTopics: ['java-checked-exceptions', 'java-exception-custom', 'java-control-statements'],
  },
  {
    slug: 'java-try-with-resources',
    title: 'Try-With-Resources',
    description: 'Learn how Java closes resources deterministically and why suppressed exceptions matter during debugging.',
    concept: 'Try-with-resources is Java\'s structured way to manage AutoCloseable resources. It guarantees close execution and can preserve both the main exception and suppressed cleanup failures.',
    why: 'Resource leaks are operational issues, not academic ones. Senior answers explain ownership, cleanup order, and the debugging value of suppressed exceptions.',
    usage: 'Teams use try-with-resources in file IO, JDBC, streams, sockets, and any code that acquires handles outside normal heap memory.',
    workflow: 'Open the resource at the narrowest useful scope, perform the work, let the language close it automatically, and inspect suppressed exceptions when cleanup and primary failure happen together.',
    exampleTitle: 'Resource ownership rule',
    exampleCode: `Try-with-resources helps when
- file handles must always close
- DB or network resources are expensive
- cleanup failures should not hide the primary error`,
    relatedTopics: ['java-file-api', 'java-nio', 'java-checked-exceptions'],
  },
  {
    slug: 'java-callable',
    title: 'Callable',
    description: 'Understand Callable, Future-based results, and how Java tasks differ when they need return values or checked failures.',
    concept: 'Callable represents a task that returns a value and may throw checked exceptions. It complements Runnable for concurrency flows where task result, timeout handling, or failure propagation matters.',
    why: 'Candidates often know the interface name but miss the implications for cancellation, blocking, and pool behavior.',
    usage: 'Callable appears in executor-based orchestration, asynchronous backend tasks, and internal services that gather multiple results in parallel.',
    workflow: 'Model the unit of work as a callable, submit it to an executor, manage timeout and cancellation behavior intentionally, and avoid designs that block every thread waiting for downstream work to finish.',
    exampleTitle: 'Callable review points',
    exampleCode: `Callable adds
-> a return value
-> checked exception support
-> Future-style coordination`,
    relatedTopics: ['java-runnable', 'java-executor-framework', 'java-virtual-threads'],
  },
  {
    slug: 'java-locks',
    title: 'Locks',
    description: 'Learn when explicit lock APIs are more appropriate than synchronized blocks and how lock choice changes throughput and failure behavior.',
    concept: 'Java locks, especially ReentrantLock and read-write lock variants, provide concurrency control beyond the basic synchronized keyword. They support timed acquisition, interruptible waits, fairness policies, and explicit condition variables.',
    why: 'Locking decisions affect latency, deadlock risk, and how easy incidents are to diagnose. This is where interview answers move from textbook to operationally credible.',
    usage: 'Teams use explicit locks in contention-heavy services, bounded resource coordinators, custom caches, and components that need advanced acquisition behavior.',
    workflow: 'Choose explicit locks only when their additional control is truly useful, keep lock scope narrow, document ordering rules, and measure contention before and after introducing them.',
    exampleTitle: 'Explicit lock checklist',
    exampleCode: `Use explicit locks when
- tryLock or timed acquisition matters
- multiple conditions must coordinate
- fairness or interruptibility is part of the contract`,
    relatedTopics: ['java-synchronization', 'java-deadlocks', 'java-thread-safety'],
  },
  {
    slug: 'java-deadlocks',
    title: 'Deadlocks',
    description: 'Understand the conditions that create deadlocks and how repeated thread-dump evidence helps isolate them quickly.',
    concept: 'Deadlock happens when threads wait on each other in a cycle and no participant can make progress. In Java, this usually comes from lock ordering mistakes, nested resource acquisition, or hidden interaction between frameworks and application code.',
    why: 'Deadlocks are a classic senior-level interview topic because strong answers require both theory and a credible production diagnostic approach.',
    usage: 'Deadlocks show up in batch processors, multi-resource transactions, scheduler code, cache refresh logic, and services that mix database locks with application locks carelessly.',
    workflow: 'Prevent deadlocks with consistent lock ordering and bounded waits, and diagnose them with repeated thread dumps, owner chains, and release correlation instead of guessing.',
    exampleTitle: 'Deadlock prevention rule',
    exampleCode: `Prevent deadlocks by
-> acquiring shared resources in one order
-> minimizing nested locking
-> using timeouts where possible`,
    relatedTopics: ['java-locks', 'java-thread-dumps', 'java-synchronization'],
  },
  {
    slug: 'java-thread-safety',
    title: 'Thread Safety',
    description: 'Learn how Java code becomes thread-safe through immutability, confinement, safe publication, and disciplined shared-state design.',
    concept: 'Thread safety means Java code behaves correctly when accessed concurrently. It is not only about adding synchronization; it is about ownership, visibility, atomicity, and preserving invariants under concurrency.',
    why: 'Interviewers ask thread-safety questions to see whether candidates understand design-level concurrency, not just keywords.',
    usage: 'Thread-safety design affects caches, service singletons, stateless handlers, request context propagation, and any shared backend component.',
    workflow: 'Prefer immutable and stateless designs first, confine mutable state where possible, use safe publication when sharing is required, and choose concurrency primitives that match the exact risk.',
    exampleTitle: 'Thread-safety design order',
    exampleCode: `Best order for concurrency design
1. avoid shared mutable state
2. make state immutable when possible
3. confine mutable state to one thread or owner`,
    relatedTopics: ['java-synchronization', 'java-jvm-memory-model', 'java-concurrent-collections'],
  },
  {
    slug: 'java-virtual-threads',
    title: 'Virtual Threads',
    description: 'Understand virtual threads, cheap blocking concurrency, and why Loom changes throughput conversations without removing downstream limits.',
    concept: 'Virtual threads are lightweight Java threads designed to make thread-per-task concurrency practical again. They reduce the cost of blocking tasks compared with platform-thread-per-request models.',
    why: 'Virtual threads are now a modern Java interview topic because they change concurrency design decisions, migration strategy, and observability expectations.',
    usage: 'Teams use virtual threads in request handling, parallel backend calls, scheduler-style workloads, and services where simple blocking code is easier to maintain than reactive flow.',
    workflow: 'Treat virtual threads as cheaper task containers, then still design explicit limits around databases, downstream APIs, connection pools, and any resource that does not become infinite just because threads are lighter.',
    exampleTitle: 'Virtual-thread reality check',
    exampleCode: `Virtual threads improve
-> task concurrency cost
-> code simplicity for blocking flows

They do not remove
-> DB connection limits
-> downstream capacity limits`,
    relatedTopics: ['java-threads', 'java-callable', 'java-high-throughput-systems'],
  },
  {
    slug: 'java-method-references',
    title: 'Method References',
    description: 'Learn when method references improve readability and when they hide too much intent in Java streams and functional code.',
    concept: 'Method references are shorthand forms for lambdas that call an existing method. They can make Java functional code more concise, but they are useful only when the referenced method keeps the behavior obvious.',
    why: 'This looks like a small syntax topic, but interviewers use it to test whether candidates value clarity over cleverness in functional-style Java code.',
    usage: 'Method references appear in stream pipelines, comparator building, event callbacks, and mapper functions.',
    workflow: 'Use method references when they clearly name the behavior, fall back to lambdas when context or transformation details would otherwise be hidden, and keep pipeline readability as the deciding factor.',
    exampleTitle: 'Readability-first rule',
    exampleCode: `Prefer method references when
-> the existing method name explains the action
-> the pipeline stays readable`,
    relatedTopics: ['java-lambda', 'java-functional-interfaces', 'java-streams'],
  },
  {
    slug: 'java-jvm-memory-model',
    title: 'JVM Memory Model',
    description: 'Understand visibility, ordering, and happens-before rules that make Java concurrency correct or dangerously broken.',
    concept: 'The Java Memory Model defines how threads observe shared memory, including visibility, ordering, atomicity, and the rules behind synchronized, volatile, and final-field guarantees.',
    why: 'Without the memory model, thread-safety answers stay superficial. This topic separates keyword familiarity from real concurrency understanding.',
    usage: 'It matters in shared caches, lazy initialization, configuration refresh, and any component where one thread depends on another thread\'s writes.',
    workflow: 'Start by asking how data moves between threads, then apply the right happens-before relationship through synchronization, volatile publication, immutable state, or confinement.',
    exampleTitle: 'Visibility reasoning path',
    exampleCode: `Concurrency question
-> who writes the data?
-> who reads it?
-> what creates a happens-before edge?`,
    relatedTopics: ['java-thread-safety', 'java-synchronization', 'java-locks'],
  },
  {
    slug: 'java-heap',
    title: 'Heap',
    description: 'Learn how heap usage, allocation rate, and retention shape Java performance and memory incidents.',
    concept: 'The heap is the JVM memory area where most objects live. Heap behavior is affected by allocation rate, object lifetime, collector strategy, and whether objects remain reachable longer than expected.',
    why: 'Heap understanding is foundational for diagnosing GC pressure, leaks, and container memory issues in backend systems.',
    usage: 'Heap reasoning shows up in API payload handling, caches, batch processing, stream-heavy transformations, and services with bursty traffic or long-lived shared data.',
    workflow: 'Measure how quickly objects are allocated, how long they survive, and what retains them; then separate normal throughput cost from true retention problems.',
    exampleTitle: 'Heap diagnostic lens',
    exampleCode: `Heap questions
-> are we allocating too much?
-> are objects surviving too long?
-> did traffic shape change?`,
    relatedTopics: ['java-stack', 'java-garbage-collection', 'java-memory-leaks'],
  },
  {
    slug: 'java-stack',
    title: 'Stack',
    description: 'Understand stack frames, recursion cost, thread count impact, and why stack size matters in Java concurrency discussions.',
    concept: 'Each Java thread has its own stack for method frames, local variables, and execution state. Stack size affects recursion depth, thread memory overhead, and the kinds of failures seen during runaway or deeply nested execution.',
    why: 'Candidates often mention heap but forget that thread count and stack memory shape scalability too.',
    usage: 'Stack reasoning matters in recursive algorithms, deep call chains, thread-heavy services, and incident diagnosis through stack traces and StackOverflowError analysis.',
    workflow: 'Treat each thread stack as a bounded resource, avoid uncontrolled recursion, and remember that more threads also mean more stack memory consumed even before heap pressure grows.',
    exampleTitle: 'Stack cost reminder',
    exampleCode: `Stack matters when
- recursion depth is unclear
- thread counts are high
- stack traces reveal repeated loops`,
    relatedTopics: ['java-heap', 'java-threads', 'java-thread-dumps'],
  },
  {
    slug: 'java-metaspace',
    title: 'Metaspace',
    description: 'Learn what lives in metaspace, how class loading affects it, and why metaspace leaks are different from normal heap growth.',
    concept: 'Metaspace stores class metadata outside the traditional heap. It grows as classes are loaded and can become a problem when class loaders or dynamically generated classes remain reachable.',
    why: 'Metaspace is a real production topic in framework-heavy Java systems, especially when redeployments, proxies, or dynamic loading are involved.',
    usage: 'It appears in application servers, plugin-based systems, proxy-heavy frameworks, bytecode generation tools, and long-running services that load or reload classes repeatedly.',
    workflow: 'When metaspace grows unexpectedly, check class-loading churn, custom loaders, generated classes, and whether old loader hierarchies remain strongly referenced.',
    exampleTitle: 'Metaspace investigation path',
    exampleCode: `Look at metaspace when
- restarts happen after repeated deployments
- class counts keep rising
- proxy or instrumentation tooling is heavy`,
    relatedTopics: ['java-class-loading', 'java-class-loaders', 'java-out-of-memory-error'],
  },
  {
    slug: 'java-memory-leaks',
    title: 'Memory Leaks',
    description: 'Understand how Java leaks happen through retained references and how heap evidence proves the real owner.',
    concept: 'A Java memory leak is usually not lost memory but reachable memory that should have become unreachable. Static collections, listener registries, caches, ThreadLocals, and class-loader retention are common causes.',
    why: 'Leak diagnosis is a strong senior-level interview topic because it requires evidence-based thinking rather than generic tuning guesses.',
    usage: 'Teams hit memory leaks in cache ownership mistakes, long-lived executors, subscriber lifecycles, ORM sessions, and services that accumulate request-derived objects over time.',
    workflow: 'Differentiate temporary traffic-driven growth from persistent retention, capture heap evidence safely, inspect dominators and reference chains, then fix the owner that keeps the objects alive.',
    exampleTitle: 'Leak diagnosis steps',
    exampleCode: `Do not start with bigger heap.
Start with
-> trend: does usage return to baseline?
-> heap dump evidence
-> dominator analysis`,
    relatedTopics: ['java-heap', 'java-thread-safety', 'java-thread-dumps'],
  },
  {
    slug: 'java-class-loading',
    title: 'Class Loading',
    description: 'Learn the class-loading lifecycle and why initialization timing matters during startup, plugins, and framework integration.',
    concept: 'Class loading in Java covers loading, linking, and initialization of classes. It controls when code becomes available and when static initialization runs.',
    why: 'This topic matters because startup defects, class conflicts, and surprising static behavior often come from misunderstood loading rules.',
    usage: 'Teams deal with class loading in application startup, integration libraries, SPI usage, reflection, and framework auto-configuration.',
    workflow: 'Understand when a class is merely loaded versus initialized, keep static initialization lightweight, and inspect classpath and loader boundaries when runtime behavior differs across environments.',
    exampleTitle: 'Class-loading debug path',
    exampleCode: `When startup behaves strangely
-> check classpath differences
-> inspect static initialization side effects
-> confirm which trigger caused initialization`,
    relatedTopics: ['java-class-loaders', 'java-reflection', 'java-jvm'],
  },
  {
    slug: 'java-class-loaders',
    title: 'Class Loaders',
    description: 'Understand parent delegation, class identity, and why class-loader boundaries create unique Java debugging problems.',
    concept: 'Class loaders are responsible for finding and defining classes. In Java, two classes with the same name can still be different types if loaded by different class loaders.',
    why: 'Class-loader problems are rare until they are critical. Interviewers use them to test platform awareness and debugging maturity.',
    usage: 'Class-loader reasoning appears in servers, modules, plugins, reloading tools, instrumentation agents, and framework containers with layered classpaths.',
    workflow: 'When investigating a class-loader issue, map the loader hierarchy first, then confirm delegation behavior, duplicate definitions, and whether stale loader graphs are being retained.',
    exampleTitle: 'Class identity reminder',
    exampleCode: `Same class name does not always mean same type.
In Java, type identity is
-> class name
-> plus defining class loader`,
    relatedTopics: ['java-class-loading', 'java-metaspace', 'java-bytecode'],
  },
  {
    slug: 'java-bytecode',
    title: 'Bytecode',
    description: 'Learn what Java bytecode represents and why bytecode-level understanding helps with tooling, debugging, and JVM reasoning.',
    concept: 'Bytecode is the platform-neutral instruction set produced by the Java compiler. The JVM interprets or JIT-compiles it into native execution.',
    why: 'Bytecode knowledge helps engineers explain platform independence, inspect compiler output, and reason about tooling such as instrumentation or proxies.',
    usage: 'Teams touch bytecode indirectly through javap, profilers, AOP frameworks, mocking tools, coverage instrumentation, and runtime agents.',
    workflow: 'Use bytecode inspection when source-level intuition is not enough, especially around synthetic code, lambda translation, compiler-generated bridges, or proxy-based behavior.',
    exampleTitle: 'Bytecode inspection use case',
    exampleCode: `Reach for bytecode inspection when
- compiler output seems surprising
- synthetic methods appear
- instrumentation changes runtime behavior`,
    relatedTopics: ['java-jvm', 'java-jit-compiler', 'java-lambda'],
  },
  {
    slug: 'java-jit-compiler',
    title: 'JIT Compiler',
    description: 'Understand JVM warm-up, inlining, deoptimization, and why benchmark results can lie without JIT awareness.',
    concept: 'The JIT compiler watches running bytecode, profiles hot paths, and compiles frequently executed code into optimized native machine instructions. It is one of the main reasons long-running Java services achieve strong throughput.',
    why: 'Performance conversations become weak quickly if candidates cannot explain warm-up or why tiny microbenchmarks often mislead.',
    usage: 'JIT behavior matters in service startup, latency-sensitive endpoints, benchmark interpretation, hot-path optimization, and rollout verification after performance changes.',
    workflow: 'Treat the JIT as an adaptive runtime optimizer, measure after realistic warm-up, and remember that inlining, escape analysis, and deoptimization can change observed behavior.',
    exampleTitle: 'Benchmark sanity rule',
    exampleCode: `Before trusting a benchmark
-> warm up the code path
-> use realistic inputs
-> separate allocation from logic cost`,
    relatedTopics: ['java-bytecode', 'java-optimization', 'java-profiling'],
  },
  {
    slug: 'java-profiling',
    title: 'Profiling',
    description: 'Learn how to profile Java services safely and how to turn CPU, allocation, and contention evidence into real fixes.',
    concept: 'Profiling is the practice of collecting runtime evidence about where time, memory, or contention is being spent. In Java, common tools include JFR, async-profiler, and APM platforms.',
    why: 'Senior engineers profile before optimizing. Interviewers want to hear an evidence-first workflow instead of intuition-driven changes.',
    usage: 'Profiling is used during CPU spikes, allocation surges, lock contention, latency regressions, and release validation for critical services.',
    workflow: 'Start from the symptom, collect the safest useful profile, isolate the dominant stack or allocation pattern, and validate the fix under representative traffic.',
    exampleTitle: 'Profile-first response',
    exampleCode: `Do not optimize blind.
Collect evidence for
-> hot methods
-> allocation hotspots
-> blocked or contended threads`,
    relatedTopics: ['java-high-cpu-usage', 'java-optimization', 'java-performance-troubleshooting'],
  },
  {
    slug: 'java-optimization',
    title: 'Optimization',
    description: 'Understand how to improve Java performance systematically without trading maintainability for tiny theoretical gains.',
    concept: 'Optimization in Java means improving the right performance dimension, such as latency, throughput, allocation, or contention, based on evidence rather than assumptions.',
    why: 'Interviewers listen for disciplined prioritization here. Strong candidates optimize the bottleneck, not the part of the code that only feels important.',
    usage: 'Optimization appears in request processing, serialization, database access orchestration, collection-heavy algorithms, and GC-sensitive workloads.',
    workflow: 'Define the metric that matters, profile the real bottleneck, compare algorithmic changes before micro-optimizations, and keep a regression guardrail so the improvement stays measurable.',
    exampleTitle: 'Optimization decision order',
    exampleCode: `Optimization order
1. confirm the user-facing metric
2. profile the real bottleneck
3. prefer structural fixes over clever code`,
    relatedTopics: ['java-profiling', 'java-jit-compiler', 'java-high-throughput-systems'],
  },
  {
    slug: 'java-gc-tuning',
    title: 'GC Tuning',
    description: 'Learn when garbage-collector tuning is justified and how to avoid using GC flags as a substitute for root-cause analysis.',
    concept: 'GC tuning is the process of adjusting garbage-collector choice and memory-related JVM settings to meet latency or throughput goals for a specific workload.',
    why: 'Tuning questions are common because weak answers jump to flags too early. Strong answers start with workload, allocation, and evidence.',
    usage: 'Teams tune GC when services show long pauses, throughput collapse under allocation pressure, container memory tension, or workload-specific latency targets.',
    workflow: 'Measure allocation and live-set behavior first, decide whether the collector or memory limits are mismatched, then tune cautiously and validate with repeatable metrics.',
    exampleTitle: 'GC tuning guardrail',
    exampleCode: `Do not start with GC flags if
- allocation rate is the real problem
- a memory leak still exists
- container limits are wrong`,
    relatedTopics: ['java-garbage-collection', 'java-heap', 'java-out-of-memory-error'],
  },
  {
    slug: 'java-high-throughput-systems',
    title: 'High Throughput Systems',
    description: 'Understand how Java services sustain heavy traffic through bounded concurrency, reduced contention, and allocation-aware design.',
    concept: 'High-throughput Java systems are designed to process large amounts of work predictably by controlling concurrency, minimizing contention, reducing unnecessary allocation, and protecting critical resources.',
    why: 'This topic tests whether candidates can move from language knowledge to system-level operational reasoning.',
    usage: 'It matters in APIs, message consumers, event processors, and data pipelines where small inefficiencies become expensive at scale.',
    workflow: 'Model the dominant workload, identify shared bottlenecks, bound concurrency, reduce hot-path allocation, and protect downstream dependencies so the system stays stable under load.',
    exampleTitle: 'Throughput architecture lens',
    exampleCode: `Throughput depends on
-> bounded work in flight
-> low contention
-> efficient allocation patterns
-> safe downstream limits`,
    relatedTopics: ['java-executor-framework', 'java-virtual-threads', 'java-scalability'],
  },
  {
    slug: 'java-singleton',
    title: 'Singleton',
    description: 'Learn when singleton ownership is legitimate and when global state turns into hidden coupling in Java systems.',
    concept: 'The singleton pattern ensures one shared instance for a given responsibility. In Java, that can be implemented through enums, static holders, dependency injection scopes, or other lifecycle mechanisms.',
    why: 'Singleton questions are not about memorizing a pattern; they are about ownership, state, testing, and concurrency.',
    usage: 'Singleton-like lifecycles appear in configuration providers, shared registries, caches, clients, and services managed by DI containers.',
    workflow: 'Ask whether the system truly needs one shared instance, how that instance is initialized safely, and whether container-managed lifecycle would be clearer than manual global access.',
    exampleTitle: 'Singleton smell check',
    exampleCode: `Singleton can help when
- one shared lifecycle is real
- ownership is clear

Singleton becomes a smell when
- it hides dependencies
- mutable global state spreads`,
    relatedTopics: ['java-thread-safety', 'java-dependency-injection', 'java-factory'],
  },
  {
    slug: 'java-factory',
    title: 'Factory',
    description: 'Understand factory patterns as a way to centralize creation policy and reduce constructor-level coupling.',
    concept: 'Factory patterns separate object creation from object use. They allow Java systems to choose implementations, compose dependencies, and keep callers focused on behavior rather than construction details.',
    why: 'Factory discussions reveal whether a candidate understands extensibility and dependency boundaries instead of scattering new calls everywhere.',
    usage: 'Factories are used in client creation, payment or notification strategy selection, parser choice, and framework bootstrapping.',
    workflow: 'Create factories when construction policy is meaningful, keep the contract narrow, and avoid pattern-heavy ceremony when DI or simple constructors already express the design clearly.',
    exampleTitle: 'Factory justification',
    exampleCode: `Use a factory when
- creation logic has branches
- implementation choice depends on runtime context
- callers should not know construction details`,
    relatedTopics: ['java-strategy', 'java-dependency-injection', 'java-composition'],
  },
  {
    slug: 'java-builder',
    title: 'Builder',
    description: 'Learn when builders improve immutable object construction and where they become unnecessary ceremony.',
    concept: 'The builder pattern helps create complex objects step by step, especially when many optional fields, validation rules, or readability concerns make constructors hard to trust.',
    why: 'Builder questions test whether candidates can balance API clarity against overengineering.',
    usage: 'Builders appear in configuration objects, request models, test fixtures, immutable domain values, and SDK-style APIs with many optional parameters.',
    workflow: 'Use builders when they make object creation safer and clearer, enforce validation before build completes, and avoid them when a simple constructor or factory already communicates the contract well.',
    exampleTitle: 'Builder fit rule',
    exampleCode: `Builder is useful when
- many optional fields exist
- ordering should not matter
- validation should happen once before creation`,
    relatedTopics: ['java-records', 'java-factory', 'java-encapsulation'],
  },
  {
    slug: 'java-strategy',
    title: 'Strategy',
    description: 'Understand strategy as runtime behavior selection and how it keeps Java services open to extension without rewriting core flows.',
    concept: 'The strategy pattern models interchangeable behavior behind one contract. It lets Java code choose an algorithm or policy at runtime without hardcoding branching logic everywhere.',
    why: 'This pattern shows whether a candidate can replace condition-heavy code with a cleaner extension model.',
    usage: 'Strategy appears in pricing, discounting, routing, notification delivery, authentication policy, and feature-specific decision engines.',
    workflow: 'Define the stable contract, keep each strategy focused, and centralize selection logic so adding a new behavior does not ripple through unrelated code.',
    exampleTitle: 'Strategy upgrade path',
    exampleCode: `Strategy is a good fit when
- behavior varies by type, partner, or rule
- new variants will be added
- giant if/else chains are growing`,
    relatedTopics: ['java-polymorphism', 'java-factory', 'java-composition'],
  },
  {
    slug: 'java-observer',
    title: 'Observer',
    description: 'Learn how event-style observer patterns work and where listener lifecycle mistakes create leaks or cascading failures.',
    concept: 'Observer lets one component notify interested listeners when something changes. It is useful for event-driven design, but it introduces lifecycle, ordering, and failure-isolation concerns.',
    why: 'Interviewers use observer to test whether candidates think beyond the happy path of notifications.',
    usage: 'Observer-style flows appear in domain events, UI updates, in-memory registries, plugin callbacks, and internal event buses.',
    workflow: 'Define what is being observed, keep listener contracts explicit, control failure impact, and make unsubscribe or lifecycle cleanup part of the design rather than an afterthought.',
    exampleTitle: 'Observer lifecycle checklist',
    exampleCode: `Observer design must answer
-> who subscribes?
-> who unsubscribes?
-> what happens if one listener fails?`,
    relatedTopics: ['java-memory-leaks', 'java-strategy', 'java-thread-safety'],
  },
  {
    slug: 'java-dependency-injection',
    title: 'Dependency Injection',
    description: 'Understand DI as a design principle first and how constructor-based dependencies make Java code easier to test and evolve.',
    concept: 'Dependency Injection means a class receives the collaborators it needs instead of creating them internally. In Java, this can be done manually or through containers such as Spring.',
    why: 'DI questions reveal whether candidates understand explicit dependencies, testability, and architectural boundaries beyond framework usage.',
    usage: 'DI is central in service classes, integration clients, strategy registration, configuration-driven assembly, and test doubles for unit and integration tests.',
    workflow: 'Keep dependencies explicit through constructors, inject abstractions where ownership boundaries matter, and avoid using DI containers to hide unclear object graphs.',
    exampleTitle: 'DI design signal',
    exampleCode: `Healthy DI usually means
- constructor injection
- explicit dependencies
- easy replacement in tests`,
    relatedTopics: ['java-singleton', 'java-factory', 'java-composition'],
  },
  {
    slug: 'java-memory-issues',
    title: 'Memory Issues',
    description: 'Learn how to investigate rising memory pressure before it becomes a restart loop or noisy JVM tuning debate.',
    concept: 'Memory issues in Java include leaks, allocation spikes, container limit mismatches, native memory pressure, and live-set growth that never returns to baseline.',
    why: 'This production-support topic tests whether a candidate can separate symptom, evidence, and root cause instead of guessing from one graph.',
    usage: 'Teams face memory issues in batch jobs, bursty APIs, cache-heavy services, event consumers, and applications running inside strict container limits.',
    workflow: 'Correlate memory changes with workload and release history, inspect GC behavior, capture the safest useful evidence, and classify whether the problem is retention, allocation rate, or runtime configuration.',
    exampleTitle: 'Memory incident triage',
    exampleCode: `First questions
-> did traffic change?
-> did a release change object lifetime?
-> does usage fall back after load?`,
    relatedTopics: ['java-memory-leaks', 'java-heap', 'java-gc-tuning'],
  },
  {
    slug: 'java-high-cpu-usage',
    title: 'High CPU Usage',
    description: 'Understand how to diagnose CPU saturation in Java services without confusing hot code, GC, and lock contention.',
    concept: 'High CPU usage means the service is spending too much time doing work or too much time doing the wrong kind of work, such as runaway loops, excessive allocation, poor algorithms, or contention-related spinning.',
    why: 'This is a high-value interview topic because good answers must combine profiling, workload context, and mitigation judgment.',
    usage: 'CPU incidents happen in search paths, serialization-heavy APIs, polling loops, hot collection transforms, and services pushed past their designed concurrency shape.',
    workflow: 'Correlate the spike with traffic and recent changes, profile safely, separate application CPU from GC activity, then validate the fix under representative load before closing the incident.',
    exampleTitle: 'CPU incident response',
    exampleCode: `High CPU checklist
-> correlate with release and traffic
-> collect CPU profile or JFR
-> separate app stacks from GC cost`,
    relatedTopics: ['java-profiling', 'java-optimization', 'java-performance-troubleshooting'],
  },
  {
    slug: 'java-thread-dumps',
    title: 'Thread Dumps',
    description: 'Learn how repeated thread dumps reveal waiting patterns, deadlocks, blocked pools, and concurrency bottlenecks in Java systems.',
    concept: 'A thread dump is a snapshot of thread states and stack traces. It shows what threads are doing, waiting on, or blocked by at a specific moment.',
    why: 'Thread dumps are one of the most valuable pieces of production Java evidence. Interviewers expect senior candidates to use them fluently.',
    usage: 'Teams use thread dumps during hangs, latency incidents, executor starvation, deadlocks, and downstream dependency stalls.',
    workflow: 'Capture multiple dumps across a short interval, compare what is stable or changing, identify repeated waiting patterns, and correlate those stacks with the resource or release that likely caused the incident.',
    exampleTitle: 'Thread-dump reading order',
    exampleCode: `Read thread dumps by asking
-> which threads are blocked?
-> which owner are they waiting on?
-> what repeated stacks appear across multiple captures?`,
    relatedTopics: ['java-deadlocks', 'java-executor-framework', 'java-high-cpu-usage'],
  },
  {
    slug: 'java-heap-dumps',
    title: 'Heap Dumps',
    description: 'Understand when to capture heap dumps safely and how dominator analysis turns a huge snapshot into an actual root cause.',
    concept: 'A heap dump is a snapshot of the objects currently retained in JVM heap memory. It is one of the strongest sources of evidence for memory leaks and unexpected retention patterns.',
    why: 'Heap-dump reasoning is a practical senior skill because memory issues are easy to misdiagnose from dashboards alone.',
    usage: 'Teams use heap dumps during unexplained growth, OOM incidents, cache retention problems, and payload-processing memory spikes.',
    workflow: 'Capture the dump as safely as the incident allows, open it in a memory-analysis tool, inspect the biggest dominators, and follow reference chains until the owning code path becomes obvious.',
    exampleTitle: 'Heap-dump analysis path',
    exampleCode: `Heap-dump analysis usually means
-> find largest dominators
-> inspect retained-size owners
-> trace references back to business or framework code`,
    relatedTopics: ['java-memory-leaks', 'java-memory-issues', 'java-out-of-memory-error'],
  },
  {
    slug: 'java-out-of-memory-error',
    title: 'OutOfMemoryError',
    description: 'Learn the common OOM variants in Java and why each one points to a different kind of capacity or ownership problem.',
    concept: 'OutOfMemoryError is a family of failures, not one scenario. Java heap space, GC overhead limit exceeded, metaspace exhaustion, direct buffer exhaustion, and unable to create native thread each suggest different causes.',
    why: 'Interviewers expect strong candidates to classify the OOM type before proposing a fix.',
    usage: 'OOM incidents happen in memory leaks, oversized caches, extreme traffic bursts, runaway thread creation, and containerized deployments with tight limits.',
    workflow: 'Read the exact OOM variant, preserve logs and the surrounding memory context, separate heap from native or thread-related causes, and avoid solving every OOM with a bigger heap.',
    exampleTitle: 'OOM classification rule',
    exampleCode: `Do not treat all OOMs the same.
Ask
-> which OOM variant occurred?
-> was heap, metaspace, direct memory, or native thread creation involved?`,
    relatedTopics: ['java-memory-issues', 'java-heap-dumps', 'java-metaspace'],
  },
  {
    slug: 'java-performance-troubleshooting',
    title: 'Performance Troubleshooting',
    description: 'Understand how to troubleshoot Java performance regressions using latency, allocation, contention, and dependency evidence together.',
    concept: 'Performance troubleshooting is the disciplined process of identifying the actual source of latency or throughput problems rather than guessing from symptoms alone.',
    why: 'This is a strong senior-level topic because it combines JVM internals, code-level analysis, and production communication.',
    usage: 'Teams troubleshoot performance in APIs, scheduled jobs, search flows, integration-heavy services, and distributed systems where one slow dependency can distort the whole request path.',
    workflow: 'Start from the business symptom, decompose latency by layer, preserve evidence before mitigation, isolate the bottleneck, and add a regression guardrail once the fix is proven.',
    exampleTitle: 'Regression triage flow',
    exampleCode: `Performance troubleshooting path
-> define the user-facing regression
-> separate app, DB, network, and downstream time
-> collect JVM evidence`,
    relatedTopics: ['java-profiling', 'java-high-cpu-usage', 'java-scalability'],
  },
  {
    slug: 'java-enterprise-architecture',
    title: 'Enterprise Java Design',
    description: 'Learn how Core Java decisions scale into service boundaries, upgrade strategy, observability, and long-term platform ownership.',
    concept: 'Enterprise Java design is about making language, runtime, and service-level decisions that multiple teams can support safely over time. It includes module boundaries, compatibility, reliability, observability, and upgrade posture.',
    why: 'Architecture questions test whether the candidate can move beyond local code to system-wide consequences and governance.',
    usage: 'This shows up in platform standards, multi-service integration, shared libraries, JVM upgrade decisions, and internal engineering guidelines.',
    workflow: 'Translate local design choices into operating rules, define ownership and exceptions explicitly, and make sure compatibility, debugging, and rollout behavior are part of the architecture decision.',
    exampleTitle: 'Architecture decision frame',
    exampleCode: `Architecture answer should cover
-> correctness and compatibility
-> operational evidence
-> ownership
-> what changes when the system scales across teams`,
    relatedTopics: ['java-scalability', 'java-high-availability', 'java-dependency-injection'],
  },
  {
    slug: 'java-scalability',
    title: 'Scalability',
    description: 'Understand how Java systems scale through bounded state, controlled concurrency, and realistic capacity assumptions.',
    concept: 'Scalability in Java is the ability to grow workload handling without breaking correctness, latency, or cost targets. It is shaped by state management, concurrency, data access, and runtime limits.',
    why: 'Interviewers want practical scaling judgment, not only horizontal versus vertical definitions.',
    usage: 'This topic matters in stateless APIs, cache-heavy systems, queue consumers, and any application moving from one-node comfort to real traffic growth.',
    workflow: 'Identify which resource actually limits scale, reduce shared state, control concurrency, and validate capacity with realistic traffic and dependency assumptions.',
    exampleTitle: 'Scaling reality check',
    exampleCode: `Scaling questions
-> where is state stored?
-> what resource saturates first?
-> which dependency does not scale linearly?`,
    relatedTopics: ['java-high-throughput-systems', 'java-concurrency-design', 'java-performance-troubleshooting'],
  },
  {
    slug: 'java-concurrency-design',
    title: 'Concurrency Design',
    description: 'Learn how to design Java services around ownership, bounded work, and failure isolation instead of accidental parallelism.',
    concept: 'Concurrency design is about structuring work so parallel execution improves throughput or latency without making correctness, debugging, and capacity management unmanageable.',
    why: 'This topic distinguishes engineers who can write concurrent code from engineers who can design concurrent systems safely.',
    usage: 'It matters in fan-out APIs, job schedulers, message consumers, and services that coordinate many slow dependencies.',
    workflow: 'Start with ownership of mutable state, define how much work may run at once, make cancellation and backpressure explicit, and keep failure in one branch from destabilizing the rest.',
    exampleTitle: 'Concurrency design questions',
    exampleCode: `Concurrency design must answer
-> who owns mutable state?
-> how much work can run at once?
-> what happens on timeout or cancellation?`,
    relatedTopics: ['java-thread-safety', 'java-virtual-threads', 'java-executor-framework'],
  },
  {
    slug: 'java-high-availability',
    title: 'High Availability',
    description: 'Understand how Java services stay available through graceful degradation, redundancy, and failure-aware runtime decisions.',
    concept: 'High availability means designing Java services so dependency failure, instance loss, or rollout mistakes do not immediately turn into full user-facing outages.',
    why: 'Architecture interviews often push Java candidates here because code quality alone is not enough when the whole service must keep recovering under failure.',
    usage: 'This matters in payment services, identity flows, platform backends, and any system where downtime has direct business cost.',
    workflow: 'Design for redundancy, define safe timeout and retry rules, isolate failures, preserve observability, and make rollback or feature-limiting strategies part of normal operations.',
    exampleTitle: 'Availability design lens',
    exampleCode: `High availability depends on
-> clear failure boundaries
-> safe retries and timeouts
-> graceful degradation
-> rollback readiness`,
    relatedTopics: ['java-scalability', 'java-enterprise-architecture', 'java-performance-troubleshooting'],
  },
];

export const javaExpandedTopics: Record<string, TopicContent> = Object.fromEntries(
  specs.map((spec) => [spec.slug, topic(spec)])
);
