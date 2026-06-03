import type { TopicContent } from '../types';

export const javaThreads: TopicContent = {
  slug: 'java-threads',
  title: 'Threads',
  description: 'Java threads — creating and managing threads, thread lifecycle, and the concurrency problems every enterprise developer must understand.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A thread is the smallest unit of execution in Java. Every Java program starts with the main thread. You create additional threads to do work concurrently — loading data while the UI responds, processing multiple requests simultaneously, running background tasks. Java 21 introduced virtual threads, which allow millions of lightweight threads without OS overhead.',
  whatIsIt: `**Thread Lifecycle:**
\`\`\`
NEW -> RUNNABLE -> BLOCKED/WAITING/TIMED_WAITING -> TERMINATED
\`\`\`
- **NEW** — Thread created but not started
- **RUNNABLE** — Running or ready to run
- **BLOCKED** — Waiting to acquire a monitor lock
- **WAITING** — Waiting indefinitely (wait(), join())
- **TIMED_WAITING** — Waiting with timeout (sleep(), wait(timeout))
- **TERMINATED** — Completed execution

**Creating Threads:**
1. Extend Thread class (not recommended)
2. Implement Runnable (better — separates task from execution)
3. Use ExecutorService (best — thread pool management)
4. Virtual threads (Java 21 — for I/O-bound tasks)

**Thread Properties:**
- name — for debugging (set meaningful names!)
- daemon — daemon threads stop when all non-daemon threads finish
- priority — hints to scheduler (1-10, rarely useful)
- interrupt — mechanism to request thread stop`,
  whyWeNeedIt: `Threads enable concurrency:

- **Server applications** — handle thousands of simultaneous HTTP requests
- **Background tasks** — send emails, process files without blocking the main flow
- **Parallel computation** — use all CPU cores for CPU-intensive work
- **Responsive UIs** — keep UI thread free while background work runs
- **Asynchronous I/O** — don't block waiting for network/disk`,
  realWorldUsage: `In Spring Boot, threads are mostly managed by the framework:

- Each HTTP request runs in a thread from Tomcat's thread pool (default: 200 threads)
- @Async methods run in a Spring-managed thread pool
- @Scheduled tasks run in a scheduled thread pool
- CompletableFuture.supplyAsync() runs in ForkJoinPool

You rarely create threads directly — you use ExecutorService or Spring's abstractions.`,
  howItWorks: `**Thread Scheduling:**
The JVM delegates thread scheduling to the OS. The OS scheduler decides which thread runs on which CPU core at any time. You cannot control exact scheduling — only set priorities as hints.

**Thread Safety Problems:**
1. **Race condition** — two threads read-modify-write the same variable concurrently; result depends on timing
2. **Deadlock** — Thread A holds lock1, waits for lock2; Thread B holds lock2, waits for lock1; both wait forever
3. **Livelock** — threads keep responding to each other but make no progress
4. **Starvation** — a thread never gets CPU time because others always have priority

**Memory Visibility:**
Without synchronization, changes made by one thread may not be visible to another thread due to CPU caches. Use volatile, synchronized, or java.util.concurrent for visibility guarantees.`,
  example: {
    title: 'Thread Patterns in Enterprise Java',
    description: 'How threads are used and managed in production Java applications.',
    code: [
      {
        label: 'Creating and Managing Threads',
        language: 'java',
        code: `// Option 1: Extend Thread (avoid — couples task to execution)
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Running in: " + Thread.currentThread().getName());
    }
}
new MyThread().start();

// Option 2: Implement Runnable (better — separates task from thread)
Runnable task = () -> System.out.println("Running in: " + 
    Thread.currentThread().getName());
Thread thread = new Thread(task, "my-worker");
thread.start();

// Option 3: ExecutorService (best for most cases)
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> processOrder(orderId));
executor.submit(() -> sendEmail(userId));

// Always shutdown executors
executor.shutdown();
try {
    if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
        executor.shutdownNow();
    }
} catch (InterruptedException e) {
    executor.shutdownNow();
    Thread.currentThread().interrupt();
}

// Virtual threads (Java 21) — for I/O-bound tasks
// Create millions of lightweight threads
Thread.ofVirtual().start(() -> handleRequest(request));

// Virtual thread executor
try (ExecutorService vExecutor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 100_000; i++) {
        vExecutor.submit(() -> callExternalApi());
    }
}  // auto-shutdown via try-with-resources`,
      },
      {
        label: 'Thread-Safe Counter',
        language: 'java',
        code: `// WRONG: not thread-safe
class UnsafeCounter {
    private int count = 0;
    public void increment() { count++; }  // read-modify-write is not atomic!
    public int get() { return count; }
}

// Option 1: synchronized method
class SynchronizedCounter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public synchronized int get() { return count; }
}

// Option 2: AtomicInteger (preferred — lock-free, faster)
class AtomicCounter {
    private final AtomicInteger count = new AtomicInteger(0);
    public void increment() { count.incrementAndGet(); }
    public int get() { return count.get(); }
}

// Option 3: LongAdder (best for high-contention counting)
class HighThroughputCounter {
    private final LongAdder count = new LongAdder();
    public void increment() { count.increment(); }
    public long get() { return count.sum(); }
}

// Thread-safe with volatile (visibility only, not atomicity)
class VisibleFlag {
    private volatile boolean running = true;  // visible across threads
    
    public void stop() { running = false; }
    
    public void run() {
        while (running) {  // sees updated value from other threads
            doWork();
        }
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between start() and run()?',
      answer: 'start() creates a new thread and calls run() in that new thread. run() just executes the method in the current thread — no new thread is created. Always call start() to actually run code concurrently. Calling run() directly is a common mistake that looks like multithreading but is actually sequential.',
    },
    {
      question: 'What is the difference between volatile and synchronized?',
      answer: 'volatile guarantees visibility — changes to a volatile variable are immediately visible to all threads. It does NOT guarantee atomicity — count++ on a volatile int is still a race condition. synchronized guarantees both visibility AND atomicity — only one thread can execute the synchronized block at a time. Use volatile for simple flags (boolean running = true). Use synchronized or AtomicXxx for compound operations.',
    },
    {
      question: 'What are virtual threads and how are they different from regular threads?',
      answer: 'Regular (platform) threads are OS threads — expensive to create (1MB stack each), limited to thousands. Virtual threads (Java 21) are JVM-managed, extremely lightweight — you can create millions. When a virtual thread blocks on I/O, the JVM parks it and runs another virtual thread on the same OS thread. This eliminates the need for reactive/async programming for I/O-bound code.',
    },
  ],
  productionIssues: [
    'Deadlock — two threads waiting for each other\'s locks. Diagnose with jstack. Fix: always acquire locks in the same order.',
    'Thread pool exhaustion — all threads busy, new requests queue up and timeout. Monitor thread pool utilization. Increase pool size or use virtual threads.',
    'ThreadLocal memory leak — ThreadLocal values in thread pools persist across requests if not cleaned up. Always call ThreadLocal.remove() in a finally block.',
    'Uncaught exceptions in threads — exceptions in threads not caught by the caller. Set an UncaughtExceptionHandler or use CompletableFuture which propagates exceptions.',
  ],
  bestPractices: [
    'Never create threads directly in production code — use ExecutorService or Spring @Async.',
    'Always name threads meaningfully for debugging: new Thread(task, "order-processor-1").',
    'Use AtomicInteger/AtomicLong instead of synchronized for simple counters.',
    'Use virtual threads (Java 21) for I/O-bound tasks to eliminate thread pool sizing concerns.',
    'Always handle InterruptedException: catch it, restore the interrupt flag, and exit gracefully.',
    'Set UncaughtExceptionHandler on thread pools to log unexpected exceptions.',
  ],
  architectNote: 'Java 21 virtual threads are the biggest threading change in Java history. For I/O-bound microservices (most enterprise services), virtual threads eliminate the need for reactive programming (WebFlux, RxJava). You write simple blocking code, but the JVM handles concurrency efficiently. Spring Boot 3.2+ supports virtual threads with spring.threads.virtual.enabled=true. For CPU-bound tasks, platform threads with ForkJoinPool are still the right choice.',
  faqs: [
    {
      question: 'What is the difference between a daemon thread and a user thread?',
      answer: 'User threads (default) keep the JVM alive — the JVM waits for all user threads to finish before exiting. Daemon threads are background service threads — the JVM exits when only daemon threads remain. Set daemon status before starting: thread.setDaemon(true). Use daemon threads for background tasks (log flushing, GC helpers) that should not prevent JVM shutdown.',
    },
    {
      question: 'What is a thread dump and how do I read it?',
      answer: 'A thread dump is a snapshot of all thread states at a moment in time. Generate with jstack <pid> or kill -3 <pid>. Look for: BLOCKED threads (waiting for a lock held by another thread — indicates deadlock or contention), WAITING/TIMED_WAITING threads (parked, normal), many threads in the same method (bottleneck). Tools like FastThread.io visualize thread dumps automatically.',
    },
  ],
  keyTakeaways: [
    'Thread lifecycle: NEW -> RUNNABLE -> BLOCKED/WAITING -> TERMINATED',
    'Always use ExecutorService, not raw Thread creation in production',
    'volatile = visibility only; synchronized = visibility + atomicity',
    'AtomicInteger/LongAdder are faster than synchronized for counters',
    'Java 21 virtual threads: millions of lightweight threads for I/O-bound code',
    'Name threads and set UncaughtExceptionHandler for production debugging',
  ],
  relatedTopics: ['java-runnable', 'java-executor-framework', 'java-synchronization', 'java-completable-future'],
};

export const javaRunnable: TopicContent = {
  slug: 'java-runnable',
  title: 'Runnable',
  description: 'The Runnable interface — the standard way to define a task for concurrent execution in Java.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Runnable is a functional interface with one method: run(). It represents a task that can be executed by a thread. It has no return value and cannot throw checked exceptions. Use it to define work that will run in a thread pool. For tasks that return a value, use Callable<V>. For tasks with a return value and exception handling, use CompletableFuture.',
  whatIsIt: `**Runnable interface:**
\`\`\`java
@FunctionalInterface
public interface Runnable {
    void run();
}
\`\`\`

**Callable interface (Runnable with return value):**
\`\`\`java
@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}
\`\`\`

**Key differences:**
| | Runnable | Callable<V> |
|---|---|---|
| Return value | void | V |
| Checked exceptions | No | Yes (throws Exception) |
| Used with | Thread, ExecutorService | ExecutorService |
| Returns | nothing | Future<V> |

**Future<V>:**
ExecutorService.submit(Callable) returns a Future<V>. Call future.get() to retrieve the result (blocks until done) or future.get(timeout, unit) for timeout.`,
  whyWeNeedIt: 'Runnable separates the task definition from the execution mechanism. You define what to do (Runnable), and the ExecutorService decides when and how to run it (thread pool management). This separation makes code more testable and flexible.',
  realWorldUsage: `Common patterns:

\`\`\`java
// Spring @Async — Spring wraps your method in a Runnable
@Async
public void sendWelcomeEmail(String email) {
    emailService.send(email);  // runs in Spring's async thread pool
}

// ExecutorService with Runnable
executor.submit(() -> processOrder(orderId));

// ExecutorService with Callable (returns result)
Future<String> future = executor.submit(() -> {
    return fetchUserFromApi(userId);  // may throw Exception
});
String user = future.get(5, TimeUnit.SECONDS);
\`\`\``,
  howItWorks: `**Thread.start() vs ExecutorService.submit():**
- Thread.start() creates a new OS thread for each task — expensive
- ExecutorService.submit() reuses threads from the pool — efficient

**Checked exceptions in Runnable:**
Runnable.run() cannot throw checked exceptions. Options:
1. Catch and handle inside run()
2. Catch and wrap in RuntimeException
3. Use Callable instead (allows throws Exception)
4. Use CompletableFuture (handles exceptions properly)`,
  example: {
    title: 'Runnable and Callable Patterns',
    description: 'How to define and submit tasks for concurrent execution.',
    code: [
      {
        label: 'Runnable vs Callable',
        language: 'java',
        code: `ExecutorService executor = Executors.newFixedThreadPool(4);

// Runnable — no return value, no checked exceptions
Runnable emailTask = () -> {
    try {
        emailService.send("user@example.com");
    } catch (EmailException e) {
        log.error("Failed to send email", e);
        // Must handle checked exceptions inside run()
    }
};
executor.submit(emailTask);

// Callable — returns value, can throw checked exceptions
Callable<UserProfile> fetchTask = () -> {
    return apiClient.fetchProfile(userId);  // may throw IOException
};

Future<UserProfile> future = executor.submit(fetchTask);

try {
    UserProfile profile = future.get(10, TimeUnit.SECONDS);
    processProfile(profile);
} catch (TimeoutException e) {
    future.cancel(true);  // interrupt the task
    log.error("Profile fetch timed out");
} catch (ExecutionException e) {
    // Wraps the exception thrown by the Callable
    Throwable cause = e.getCause();
    log.error("Profile fetch failed: {}", cause.getMessage());
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
    log.error("Interrupted waiting for profile");
}

// Multiple Callables — invokeAll waits for all
List<Callable<Report>> reportTasks = List.of(
    () -> generateSalesReport(),
    () -> generateInventoryReport(),
    () -> generateFinancialReport()
);
List<Future<Report>> futures = executor.invokeAll(reportTasks);
List<Report> reports = futures.stream()
    .map(f -> { try { return f.get(); } catch (Exception e) { throw new RuntimeException(e); } })
    .collect(Collectors.toList());`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use Runnable vs Callable vs CompletableFuture?',
      answer: 'Use Runnable for fire-and-forget tasks with no return value. Use Callable when you need a return value and Future.get() blocking is acceptable. Use CompletableFuture for async pipelines, non-blocking composition, and proper exception handling. In modern Java, CompletableFuture is preferred over Callable+Future for most use cases.',
    },
  ],
  productionIssues: [
    'Future.get() blocking the calling thread — defeats the purpose of async. Use CompletableFuture for non-blocking composition.',
    'Uncaught exceptions in Runnable swallowed by ExecutorService — exceptions thrown from Runnable.run() are caught by the executor and not propagated. Use Future.get() to check for exceptions, or set an UncaughtExceptionHandler.',
  ],
  bestPractices: [
    'Prefer CompletableFuture over Callable+Future for new code.',
    'Use @Async in Spring for simple fire-and-forget async methods.',
    'Always handle InterruptedException and restore the interrupt flag.',
    'Set meaningful thread names in ExecutorService for debugging.',
  ],
  architectNote: 'Runnable and Callable are low-level primitives. In Spring Boot, you rarely use them directly. Use @Async for fire-and-forget, CompletableFuture for async with result, and Spring Batch for batch processing. These abstractions handle thread pool management, exception handling, and monitoring for you.',
  faqs: [
    {
      question: 'What is the difference between submit() and execute() in ExecutorService?',
      answer: 'execute(Runnable) submits a task and returns void — no way to check for exceptions or completion. submit(Runnable) and submit(Callable) return a Future — you can check for completion, get the result, and handle exceptions. Always use submit() unless you genuinely do not care about the result or exceptions.',
    },
  ],
  keyTakeaways: [
    'Runnable: void return, no checked exceptions; Callable: return value, throws Exception',
    'ExecutorService.submit() returns Future for result/exception tracking',
    'Future.get() blocks — use CompletableFuture for non-blocking async',
    'Exceptions in Runnable are swallowed unless you call Future.get()',
    'In Spring Boot, use @Async instead of raw Runnable/ExecutorService',
  ],
  relatedTopics: ['java-threads', 'java-executor-framework', 'java-completable-future', 'java-synchronization'],
};

export const javaExecutorFramework: TopicContent = {
  slug: 'java-executor-framework',
  title: 'Executor Framework',
  description: 'The Executor framework — thread pools, ExecutorService types, and how to configure them for production workloads.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The Executor framework manages thread pools so you don\'t have to create and destroy threads manually. You submit tasks; the pool executes them using pre-created threads. This eliminates the overhead of thread creation and limits concurrency to prevent resource exhaustion. ThreadPoolExecutor is the core implementation; Executors provides factory methods for common configurations.',
  whatIsIt: `**Executor hierarchy:**
\`\`\`
Executor
└── ExecutorService
    ├── AbstractExecutorService
    │   └── ThreadPoolExecutor (the main implementation)
    │       └── ScheduledThreadPoolExecutor
    └── ForkJoinPool (work-stealing, for parallel streams)
\`\`\`

**Factory methods (Executors class):**
- \`newFixedThreadPool(n)\` — fixed n threads, unbounded queue
- \`newCachedThreadPool()\` — grows as needed, idle threads expire after 60s
- \`newSingleThreadExecutor()\` — one thread, tasks run sequentially
- \`newScheduledThreadPool(n)\` — for scheduled/periodic tasks
- \`newVirtualThreadPerTaskExecutor()\` — virtual thread per task (Java 21)
- \`newWorkStealingPool()\` — ForkJoinPool with parallelism = CPU count

**ThreadPoolExecutor parameters:**
- corePoolSize — minimum threads kept alive
- maximumPoolSize — maximum threads allowed
- keepAliveTime — how long idle threads above core survive
- workQueue — queue for pending tasks (LinkedBlockingQueue, SynchronousQueue, ArrayBlockingQueue)
- threadFactory — how threads are created (set names here!)
- rejectedExecutionHandler — what to do when queue is full`,
  whyWeNeedIt: `Without a thread pool:
- Creating a new thread for each task is expensive (1MB stack allocation, OS thread creation)
- Unlimited thread creation exhausts memory and OS resources
- No control over concurrency level

With a thread pool:
- Threads are reused across tasks
- Concurrency is bounded (no resource exhaustion)
- Queue provides backpressure
- Monitoring and management are centralized`,
  realWorldUsage: `In Spring Boot, configure thread pools as beans:

\`\`\`java
@Configuration
public class AsyncConfig implements AsyncConfigurer {
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}
\`\`\``,
  howItWorks: `**Task Submission Flow:**
1. Task submitted to ExecutorService
2. If corePoolSize not reached: create new thread
3. If corePoolSize reached: add to queue
4. If queue full: create new thread (up to maximumPoolSize)
5. If maximumPoolSize reached and queue full: apply rejection policy

**Rejection Policies:**
- AbortPolicy (default) — throw RejectedExecutionException
- CallerRunsPolicy — run in the calling thread (backpressure)
- DiscardPolicy — silently discard
- DiscardOldestPolicy — discard oldest queued task

**Sizing thread pools:**
- CPU-bound: threads = CPU cores (no benefit from more)
- I/O-bound: threads = CPU cores * (1 + wait_time/compute_time) — more threads to cover I/O wait`,
  example: {
    title: 'Thread Pool Configuration for Production',
    description: 'How to configure and use thread pools in enterprise Java.',
    code: [
      {
        label: 'Custom ThreadPoolExecutor',
        language: 'java',
        code: `// Production-grade thread pool configuration
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    10,                          // corePoolSize: always keep 10 threads
    50,                          // maximumPoolSize: max 50 threads
    60, TimeUnit.SECONDS,        // keepAliveTime: idle threads above core expire after 60s
    new LinkedBlockingQueue<>(500), // queue capacity: buffer 500 tasks
    new ThreadFactory() {
        private final AtomicInteger counter = new AtomicInteger(0);
        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r, "order-processor-" + counter.incrementAndGet());
            t.setDaemon(false);
            t.setUncaughtExceptionHandler((thread, ex) ->
                log.error("Uncaught exception in {}: {}", thread.getName(), ex.getMessage(), ex)
            );
            return t;
        }
    },
    new ThreadPoolExecutor.CallerRunsPolicy()  // backpressure when full
);

// Monitor the pool
ScheduledExecutorService monitor = Executors.newSingleThreadScheduledExecutor();
monitor.scheduleAtFixedRate(() -> {
    log.info("Pool: active={}, queued={}, completed={}, poolSize={}",
        executor.getActiveCount(),
        executor.getQueue().size(),
        executor.getCompletedTaskCount(),
        executor.getPoolSize()
    );
}, 0, 30, TimeUnit.SECONDS);

// Graceful shutdown
Runtime.getRuntime().addShutdownHook(new Thread(() -> {
    log.info("Shutting down executor...");
    executor.shutdown();
    try {
        if (!executor.awaitTermination(30, TimeUnit.SECONDS)) {
            log.warn("Executor did not terminate gracefully, forcing shutdown");
            executor.shutdownNow();
        }
    } catch (InterruptedException e) {
        executor.shutdownNow();
        Thread.currentThread().interrupt();
    }
}));`,
      },
      {
        label: 'Spring Boot Async Configuration',
        language: 'java',
        code: `@Configuration
@EnableAsync
public class AsyncConfig {
    
    // Default async executor for @Async methods
    @Bean(name = "taskExecutor")
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("async-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(60);
        executor.initialize();
        return executor;
    }
    
    // Separate pool for email sending
    @Bean(name = "emailExecutor")
    public ThreadPoolTaskExecutor emailExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("email-");
        executor.initialize();
        return executor;
    }
}

@Service
public class NotificationService {
    
    @Async("emailExecutor")  // uses the emailExecutor pool
    public CompletableFuture<Void> sendEmail(String to, String subject) {
        emailClient.send(to, subject);
        return CompletableFuture.completedFuture(null);
    }
    
    @Async("taskExecutor")  // uses the default taskExecutor pool
    public CompletableFuture<String> processReport(Long reportId) {
        return CompletableFuture.completedFuture(reportService.generate(reportId));
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the problem with Executors.newFixedThreadPool()?',
      answer: 'newFixedThreadPool() uses an unbounded LinkedBlockingQueue. If tasks are submitted faster than they are processed, the queue grows without limit, eventually causing OutOfMemoryError. For production, use ThreadPoolExecutor with a bounded queue and a rejection policy (CallerRunsPolicy for backpressure).',
    },
    {
      question: 'How many threads should I put in my pool?',
      answer: 'For CPU-bound tasks: number of CPU cores (Runtime.getRuntime().availableProcessors()). For I/O-bound tasks (DB calls, HTTP): more threads — typically 10-50 for typical web services. The right number depends on your I/O wait time. Monitor thread pool utilization and tune based on actual metrics. With Java 21 virtual threads, I/O-bound sizing concerns largely disappear.',
    },
  ],
  productionIssues: [
    'Unbounded queue causing OOM — newFixedThreadPool() has an unbounded queue. Use bounded ThreadPoolExecutor in production.',
    'Not shutting down executor — ExecutorService threads are non-daemon by default. Forgetting to call shutdown() prevents JVM exit.',
    'Wrong rejection policy — AbortPolicy (default) throws exceptions that may be swallowed. CallerRunsPolicy provides natural backpressure for most services.',
  ],
  bestPractices: [
    'Use bounded queues and explicit rejection policies in production.',
    'Name threads meaningfully for debugging.',
    'Set UncaughtExceptionHandler on thread pools.',
    'Monitor pool metrics (active, queued, completed) in production.',
    'Always shutdown executors gracefully on application stop.',
    'Use virtual threads (Java 21) for I/O-bound tasks to simplify sizing.',
  ],
  architectNote: 'In Spring Boot, prefer Spring\'s ThreadPoolTaskExecutor over raw ThreadPoolExecutor — it integrates with Spring\'s lifecycle (graceful shutdown on context close) and task decoration (MDC propagation, security context propagation). For Java 21+, consider virtual threads for I/O-bound services: spring.threads.virtual.enabled=true replaces Tomcat\'s thread pool with virtual threads.',
  faqs: [
    {
      question: 'What is ForkJoinPool and when should I use it?',
      answer: 'ForkJoinPool is a special thread pool designed for divide-and-conquer tasks. It uses work-stealing — idle threads steal tasks from busy threads\' queues. Used by: parallel streams (Stream.parallel()), CompletableFuture.supplyAsync() (uses common ForkJoinPool by default), and recursive algorithms. For parallel streams, the common ForkJoinPool has parallelism = CPU cores - 1. For I/O-bound parallel streams, provide a custom ForkJoinPool.',
    },
  ],
  keyTakeaways: [
    'ThreadPoolExecutor: corePoolSize, maximumPoolSize, queue, rejection policy',
    'Avoid Executors.newFixedThreadPool() in production — unbounded queue',
    'Use bounded queue + CallerRunsPolicy for natural backpressure',
    'Name threads and set UncaughtExceptionHandler',
    'Always shutdown executors gracefully',
    'Java 21 virtual threads eliminate I/O-bound thread pool sizing concerns',
  ],
  relatedTopics: ['java-threads', 'java-runnable', 'java-synchronization', 'java-completable-future'],
};

export const javaSynchronization: TopicContent = {
  slug: 'java-synchronization',
  title: 'Synchronization',
  description: 'Thread synchronization in Java — synchronized blocks, locks, volatile, atomic classes, and concurrent collections for thread-safe code.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Synchronization ensures that only one thread accesses a shared resource at a time, preventing race conditions and data corruption. Java provides: synchronized keyword (intrinsic locks), java.util.concurrent.locks (explicit locks), volatile (visibility), atomic classes (lock-free), and concurrent collections. Choose the lightest mechanism that solves your problem.',
  whatIsIt: `**Synchronization Mechanisms:**

**1. synchronized keyword**
- Intrinsic lock (monitor) on any object
- synchronized method: lock is the object (this) or class
- synchronized block: lock is the specified object
- Reentrant: a thread can re-acquire a lock it already holds

**2. ReentrantLock (java.util.concurrent.locks)**
- Explicit lock with more features than synchronized
- tryLock() — non-blocking attempt
- lockInterruptibly() — can be interrupted while waiting
- Condition variables — fine-grained wait/notify
- Fairness option — prevents starvation

**3. ReadWriteLock**
- ReentrantReadWriteLock: multiple readers OR one writer
- Ideal for read-heavy, write-rare scenarios

**4. volatile**
- Guarantees visibility (changes visible to all threads)
- Does NOT guarantee atomicity (count++ is still a race)
- Use for simple flags and status variables

**5. Atomic classes (java.util.concurrent.atomic)**
- AtomicInteger, AtomicLong, AtomicBoolean, AtomicReference
- Lock-free using CAS (Compare-And-Swap) hardware instructions
- Faster than synchronized for simple operations

**6. Concurrent Collections**
- ConcurrentHashMap, CopyOnWriteArrayList, ConcurrentLinkedQueue
- Thread-safe collections without external synchronization`,
  whyWeNeedIt: 'Without synchronization, concurrent access to shared mutable state causes race conditions — the result depends on the unpredictable timing of thread scheduling. Race conditions cause data corruption, incorrect calculations, and intermittent bugs that are nearly impossible to reproduce in testing.',
  realWorldUsage: `In enterprise code:

- **ConcurrentHashMap** for shared caches (most common)
- **AtomicLong** for thread-safe counters and ID generation
- **ReentrantReadWriteLock** for caches with rare updates
- **synchronized** for simple critical sections
- **volatile** for stop flags in background threads`,
  howItWorks: `**CAS (Compare-And-Swap):**
Atomic classes use CAS hardware instructions:
1. Read current value
2. Compute new value
3. Atomically: if current value == expected, set to new value; else retry
This is lock-free — no blocking, no deadlock possible.

**Memory Model:**
Java Memory Model (JMM) defines when changes to memory made by one thread are visible to another. synchronized and volatile both establish happens-before relationships that guarantee visibility.`,
  example: {
    title: 'Synchronization Patterns',
    description: 'Choosing the right synchronization mechanism for each use case.',
    code: [
      {
        label: 'synchronized vs Lock vs Atomic',
        language: 'java',
        code: `// synchronized — simple, reentrant
class SimpleCache {
    private final Map<String, Object> cache = new HashMap<>();
    
    public synchronized Object get(String key) {
        return cache.get(key);
    }
    
    public synchronized void put(String key, Object value) {
        cache.put(key, value);
    }
    // Problem: readers block each other unnecessarily
}

// ReadWriteLock — better for read-heavy caches
class BetterCache {
    private final Map<String, Object> cache = new HashMap<>();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    private final Lock readLock = lock.readLock();
    private final Lock writeLock = lock.writeLock();
    
    public Object get(String key) {
        readLock.lock();
        try {
            return cache.get(key);
        } finally {
            readLock.unlock();  // ALWAYS unlock in finally!
        }
    }
    
    public void put(String key, Object value) {
        writeLock.lock();
        try {
            cache.put(key, value);
        } finally {
            writeLock.unlock();
        }
    }
}

// Best for most caches: ConcurrentHashMap (no external locking needed)
class BestCache {
    private final ConcurrentHashMap<String, Object> cache = new ConcurrentHashMap<>();
    
    public Object get(String key) { return cache.get(key); }
    
    public Object getOrLoad(String key, Supplier<Object> loader) {
        return cache.computeIfAbsent(key, k -> loader.get());
    }
}

// AtomicLong for ID generation
class IdGenerator {
    private final AtomicLong counter = new AtomicLong(0);
    
    public long nextId() { return counter.incrementAndGet(); }
}`,
      },
      {
        label: 'Deadlock Prevention',
        language: 'java',
        code: `// DEADLOCK: Thread A acquires lock1, waits for lock2
//           Thread B acquires lock2, waits for lock1
class DeadlockExample {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    // Thread A
    public void methodA() {
        synchronized (lock1) {
            synchronized (lock2) { doWork(); }  // DEADLOCK RISK
        }
    }
    
    // Thread B
    public void methodB() {
        synchronized (lock2) {
            synchronized (lock1) { doWork(); }  // DEADLOCK RISK
        }
    }
}

// FIX: Always acquire locks in the same order
class DeadlockFixed {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    public void methodA() {
        synchronized (lock1) {
            synchronized (lock2) { doWork(); }  // safe: same order
        }
    }
    
    public void methodB() {
        synchronized (lock1) {  // same order as methodA!
            synchronized (lock2) { doWork(); }
        }
    }
}

// FIX: Use tryLock with timeout to avoid deadlock
class TryLockExample {
    private final ReentrantLock lock1 = new ReentrantLock();
    private final ReentrantLock lock2 = new ReentrantLock();
    
    public boolean doWork() throws InterruptedException {
        if (lock1.tryLock(100, TimeUnit.MILLISECONDS)) {
            try {
                if (lock2.tryLock(100, TimeUnit.MILLISECONDS)) {
                    try {
                        performWork();
                        return true;
                    } finally {
                        lock2.unlock();
                    }
                }
            } finally {
                lock1.unlock();
            }
        }
        return false;  // could not acquire both locks, retry later
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does synchronized on a method lock the entire class?',
      answer: 'No. synchronized on an instance method locks the object instance (this). Different instances can execute synchronized methods simultaneously. Only synchronized static methods lock the Class object. Two threads calling synchronized methods on the same instance block each other; two threads on different instances do not.',
    },
    {
      question: 'Is ConcurrentHashMap fully thread-safe for all operations?',
      answer: 'Individual operations (get, put, remove) are thread-safe. Compound operations (check-then-act) are NOT automatically atomic. Example: if (!map.containsKey(k)) map.put(k, v) is a race condition. Use computeIfAbsent() or putIfAbsent() for atomic compound operations.',
    },
  ],
  productionIssues: [
    'Lock not released in exception path — if an exception occurs between lock() and unlock(), the lock is never released. Always use try-finally: lock.lock(); try { ... } finally { lock.unlock(); }',
    'Deadlock in production — very hard to detect until it happens. Use jstack to identify BLOCKED threads. Prevention: consistent lock ordering, tryLock with timeout.',
    'Synchronized on wrong object — synchronized(new Object()) creates a new lock each time, providing no synchronization. Always synchronize on the same object.',
  ],
  bestPractices: [
    'Use ConcurrentHashMap instead of synchronizing a HashMap.',
    'Use AtomicInteger/AtomicLong instead of synchronized for counters.',
    'Always release locks in finally blocks.',
    'Minimize the scope of synchronized blocks — hold locks as briefly as possible.',
    'Use consistent lock ordering to prevent deadlocks.',
    'Prefer high-level concurrent utilities over synchronized whenever possible.',
  ],
  architectNote: 'The best synchronization is no synchronization. Design for immutability (immutable objects are thread-safe by definition), use message passing instead of shared state (actor model, queues), and confine mutable state to a single thread. When you must share mutable state, use the highest-level abstraction available: ConcurrentHashMap over synchronized HashMap, AtomicLong over synchronized counter.',
  faqs: [
    {
      question: 'What is the Java Memory Model (JMM)?',
      answer: 'The JMM defines when writes by one thread are visible to reads by another. Without synchronization, the JVM and CPU can reorder operations and cache values in CPU registers, making changes invisible to other threads. synchronized and volatile create happens-before relationships that guarantee visibility. This is why you cannot safely use a non-volatile boolean flag to stop a thread from another thread.',
    },
  ],
  keyTakeaways: [
    'synchronized: simple intrinsic lock; ReentrantLock: more features (tryLock, fairness)',
    'volatile: visibility only, not atomicity; use for simple flags',
    'AtomicInteger/Long: lock-free CAS operations, faster than synchronized for counters',
    'ConcurrentHashMap: thread-safe map without external synchronization',
    'Always release locks in finally blocks',
    'Prevent deadlocks by acquiring locks in consistent order',
  ],
  relatedTopics: ['java-threads', 'java-executor-framework', 'java-completable-future', 'java-collections-map'],
};

export const javaCompletableFuture: TopicContent = {
  slug: 'java-completable-future',
  title: 'CompletableFuture',
  description: 'CompletableFuture — Java\'s async programming model for composing non-blocking operations and handling results and errors.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'CompletableFuture is Java\'s promise/future for async programming. You start an async operation, attach callbacks to run when it completes, and compose multiple async operations into pipelines. Unlike Future.get() which blocks, CompletableFuture is non-blocking — callbacks run when the result is ready. It handles both results and exceptions in a unified API.',
  whatIsIt: `**CompletableFuture API:**

**Creating:**
- \`supplyAsync(Supplier)\` — async, returns value
- \`runAsync(Runnable)\` — async, no return value
- \`completedFuture(value)\` — already completed with value

**Transforming result:**
- \`thenApply(Function)\` — transform result (like Stream.map)
- \`thenCompose(Function<T, CompletableFuture<U>>)\` — chain async operations (like flatMap)
- \`thenAccept(Consumer)\` — consume result, no return
- \`thenRun(Runnable)\` — run after completion, ignores result

**Combining:**
- \`thenCombine(other, BiFunction)\` — combine two futures when both complete
- \`allOf(futures...)\` — wait for all to complete
- \`anyOf(futures...)\` — complete when first finishes

**Exception handling:**
- \`exceptionally(Function<Throwable, T>)\` — recover from exception
- \`handle(BiFunction<T, Throwable, U>)\` — handle both result and exception
- \`whenComplete(BiConsumer)\` — side effect on completion (success or failure)

**Async variants:**
- \`thenApplyAsync\`, \`thenComposeAsync\` etc. — run callback in executor (not inline)`,
  whyWeNeedIt: `CompletableFuture solves the "callback hell" of raw threads and the blocking of Future.get():

\`\`\`java
// Old Future: blocking
Future<User> userFuture = executor.submit(() -> fetchUser(id));
Future<Orders> ordersFuture = executor.submit(() -> fetchOrders(id));
User user = userFuture.get();    // blocks!
Orders orders = ordersFuture.get();  // blocks!

// CompletableFuture: non-blocking composition
CompletableFuture<User> userFuture = CompletableFuture.supplyAsync(() -> fetchUser(id));
CompletableFuture<Orders> ordersFuture = CompletableFuture.supplyAsync(() -> fetchOrders(id));
CompletableFuture.allOf(userFuture, ordersFuture)
    .thenRun(() -> {
        User user = userFuture.join();
        Orders orders = ordersFuture.join();
        buildResponse(user, orders);
    });
\`\`\``,
  realWorldUsage: `Common in enterprise microservices:

- Parallel API calls to multiple services
- Async database operations
- Spring @Async methods returning CompletableFuture
- Non-blocking HTTP clients (WebClient)`,
  howItWorks: `**Execution model:**
By default, CompletableFuture.supplyAsync() uses ForkJoinPool.commonPool(). For production, always provide your own executor to control thread count and naming.

**thenApply vs thenApplyAsync:**
- thenApply: callback runs in the same thread that completed the future (or the calling thread if already complete)
- thenApplyAsync: callback runs in the executor (ForkJoinPool or provided executor)
- For I/O operations in callbacks, use Async variants to avoid blocking the completing thread`,
  example: {
    title: 'CompletableFuture in Enterprise Code',
    description: 'Async patterns for microservice communication and parallel operations.',
    code: [
      {
        label: 'Async Pipeline',
        language: 'java',
        code: `// Parallel API calls — much faster than sequential
public CompletableFuture<OrderSummary> getOrderSummary(Long orderId) {
    ExecutorService executor = Executors.newFixedThreadPool(10);
    
    // Start all three calls simultaneously
    CompletableFuture<Order> orderFuture = 
        CompletableFuture.supplyAsync(() -> orderService.getOrder(orderId), executor);
    
    CompletableFuture<Customer> customerFuture = orderFuture
        .thenComposeAsync(order -> 
            CompletableFuture.supplyAsync(
                () -> customerService.getCustomer(order.getCustomerId()), executor
            ), executor);
    
    CompletableFuture<List<Product>> productsFuture = orderFuture
        .thenComposeAsync(order ->
            CompletableFuture.supplyAsync(
                () -> productService.getProducts(order.getProductIds()), executor
            ), executor);
    
    // Combine when all complete
    return orderFuture.thenCombineAsync(
        customerFuture.thenCombineAsync(
            productsFuture,
            (customer, products) -> new CustomerProducts(customer, products),
            executor
        ),
        (order, cp) -> new OrderSummary(order, cp.customer(), cp.products()),
        executor
    );
}

// Exception handling
public CompletableFuture<String> fetchWithFallback(String userId) {
    return CompletableFuture.supplyAsync(() -> primaryService.fetch(userId))
        .exceptionally(ex -> {
            log.warn("Primary service failed: {}, using fallback", ex.getMessage());
            return fallbackService.fetch(userId);  // fallback value
        });
}

// handle — process both success and failure
public CompletableFuture<ApiResponse> callApi(String url) {
    return CompletableFuture.supplyAsync(() -> httpClient.get(url))
        .handle((result, ex) -> {
            if (ex != null) {
                return ApiResponse.error(ex.getMessage());
            }
            return ApiResponse.success(result);
        });
}`,
      },
      {
        label: 'allOf — Parallel Execution',
        language: 'java',
        code: `// Run multiple tasks in parallel, wait for all
public List<Report> generateAllReports(List<Long> reportIds) {
    List<CompletableFuture<Report>> futures = reportIds.stream()
        .map(id -> CompletableFuture.supplyAsync(
            () -> reportService.generate(id),
            reportExecutor
        ))
        .collect(Collectors.toList());
    
    // Wait for all to complete
    CompletableFuture<Void> allDone = CompletableFuture.allOf(
        futures.toArray(new CompletableFuture[0])
    );
    
    return allDone.thenApply(v ->
        futures.stream()
            .map(CompletableFuture::join)  // safe — all are complete
            .collect(Collectors.toList())
    ).join();
}

// Timeout handling (Java 9+)
public CompletableFuture<String> fetchWithTimeout(String url) {
    return CompletableFuture.supplyAsync(() -> httpClient.get(url))
        .orTimeout(5, TimeUnit.SECONDS)  // throws TimeoutException after 5s
        .exceptionally(ex -> {
            if (ex instanceof TimeoutException) {
                return "timeout-fallback";
            }
            throw new RuntimeException(ex);
        });
}

// Spring @Async returning CompletableFuture
@Service
public class ReportService {
    @Async
    public CompletableFuture<Report> generateAsync(Long id) {
        Report report = generateReport(id);  // may take seconds
        return CompletableFuture.completedFuture(report);
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between thenApply and thenCompose?',
      answer: 'thenApply is like Stream.map() — it transforms the result to another value: CompletableFuture<T>.thenApply(T -> U) returns CompletableFuture<U>. thenCompose is like Stream.flatMap() — it chains to another async operation: CompletableFuture<T>.thenCompose(T -> CompletableFuture<U>) returns CompletableFuture<U> (not CompletableFuture<CompletableFuture<U>>). Use thenCompose when the transformation itself is async.',
    },
    {
      question: 'What is the difference between join() and get()?',
      answer: 'Both block until the future completes. get() throws checked exceptions (InterruptedException, ExecutionException). join() throws unchecked exceptions (CompletionException). In lambda expressions (which cannot throw checked exceptions), use join(). In regular code where you want to handle InterruptedException, use get().',
    },
  ],
  productionIssues: [
    'Using ForkJoinPool.commonPool() for I/O operations — the common pool has limited threads. I/O operations block these threads, starving parallel streams. Always provide a custom executor for I/O-bound CompletableFutures.',
    'Exception swallowing — if you do not attach an exceptionally() or handle() handler, exceptions are silently swallowed. Always handle exceptions in CompletableFuture pipelines.',
    'Blocking in thenApply — thenApply runs in the completing thread. If you do I/O in thenApply, you block that thread. Use thenApplyAsync with an executor for I/O operations.',
  ],
  bestPractices: [
    'Always provide a custom executor for production CompletableFutures.',
    'Always handle exceptions with exceptionally() or handle().',
    'Use thenApplyAsync for I/O operations in callbacks.',
    'Use orTimeout() (Java 9+) to prevent indefinitely hanging futures.',
    'Use CompletableFuture.allOf() for parallel execution, not sequential chaining.',
    'Return CompletableFuture from @Async methods for proper async handling.',
  ],
  architectNote: 'CompletableFuture is the right tool for orchestrating multiple async operations in a service. However, for reactive streams with backpressure (handling millions of events), use Project Reactor (Spring WebFlux) or RxJava. With Java 21 virtual threads, much of the complexity of CompletableFuture can be avoided — simple blocking code with virtual threads achieves similar concurrency with less complexity.',
  faqs: [
    {
      question: 'When should I use CompletableFuture vs Spring @Async?',
      answer: '@Async is simpler — annotate a method, Spring runs it in a thread pool. Use it for simple fire-and-forget or single async operations. CompletableFuture gives you full control over async pipelines, composition, and error handling. Use it when you need to combine multiple async operations, handle timeouts, or implement complex async workflows. @Async methods can return CompletableFuture for the best of both worlds.',
    },
  ],
  keyTakeaways: [
    'CompletableFuture enables non-blocking async composition',
    'thenApply: transform result; thenCompose: chain async operation; thenAccept: consume',
    'allOf: wait for all; anyOf: wait for first',
    'Always handle exceptions with exceptionally() or handle()',
    'Always provide a custom executor for production use',
    'Use orTimeout() (Java 9+) to prevent hanging futures',
  ],
  relatedTopics: ['java-threads', 'java-runnable', 'java-executor-framework', 'java-streams'],
};
