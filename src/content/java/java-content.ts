import type { TopicContent } from '../types';

const makeStub = (
  slug: string,
  title: string,
  tech: string,
  versions: string[],
  quick: string,
  whatIsIt: string,
  whyWeNeedIt: string,
  realWorld: string,
  howItWorks: string,
  codeLabel: string,
  codeLanguage: string,
  codeExample: string,
  confusions: Array<{ question: string; answer: string }>,
  issues: string[],
  practices: string[],
  architectNote: string,
  faqs: Array<{ question: string; answer: string }>,
  takeaways: string[],
  related: string[]
): TopicContent => ({
  slug,
  title,
  description: `${title} — explained practically for ${tech} developers working on real enterprise projects.`,
  applicableVersions: versions,
  lastReviewed: 'December 2024',
  quickUnderstanding: quick,
  whatIsIt,
  whyWeNeedIt,
  realWorldUsage: realWorld,
  howItWorks,
  example: {
    title: `${title} — Practical Example`,
    description: `A real-world ${title} example from enterprise ${tech} projects.`,
    code: [{ label: codeLabel, language: codeLanguage, code: codeExample }],
  },
  commonConfusions: confusions,
  productionIssues: issues,
  bestPractices: practices,
  architectNote,
  faqs,
  keyTakeaways: takeaways,
  relatedTopics: related,
});

export const javaOOP = makeStub(
  'java-oop',
  'Object-Oriented Programming (OOP)',
  'Core Java',
  ['Java 8+', 'Java 11', 'Java 17', 'Java 21'],
  'OOP is a programming paradigm where you model your software as a collection of objects — each object bundles data (fields) and behavior (methods). The four pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction. Java is built entirely around OOP.',
  `OOP organizes code around **objects** — instances of classes that have:

- **Fields** (data/state): what the object knows
- **Methods** (behavior): what the object can do
- **Constructors**: how the object is created

**The 4 pillars:**

- **Encapsulation** — bundle data and methods, hide internals with access modifiers (private, protected, public)
- **Inheritance** — a class extends another, inheriting its fields and methods
- **Polymorphism** — one interface, many implementations (method overriding, interfaces)
- **Abstraction** — expose only what's necessary, hide complexity (abstract classes, interfaces)`,
  `Without OOP, large Java programs become spaghetti code — functions and data scattered everywhere, impossible to maintain. OOP provides:

- **Modularity** — each class is a self-contained unit
- **Reusability** — extend and compose classes instead of copying code
- **Maintainability** — change one class without breaking others
- **Testability** — test each class in isolation`,
  `In a real enterprise Java project, OOP shapes everything:

- **Domain model**: Customer, Order, Product, Invoice classes
- **Service layer**: CustomerService, OrderService with business logic
- **Repository pattern**: CustomerRepository interface with JPA implementation
- **Strategy pattern**: different PaymentStrategy implementations (CreditCard, PayPal, Bank)
- **Factory pattern**: creating objects without specifying exact classes`,
  `**Access Modifiers:**
- \`private\` — only within the class
- \`protected\` — class + subclasses + same package
- \`public\` — everywhere
- (default/package-private) — same package only

**Abstract vs Interface:**
- \`abstract class\` — partial implementation, single inheritance, can have state
- \`interface\` — pure contract, multiple implementation, Java 8+ can have default methods

**Key principle — SOLID:**
- **S**ingle Responsibility — one class, one reason to change
- **O**pen/Closed — open for extension, closed for modification
- **L**iskov Substitution — subtypes must be substitutable for base types
- **I**nterface Segregation — many specific interfaces > one general interface
- **D**ependency Inversion — depend on abstractions, not concretions`,
  'Java OOP Example',
  'java',
  `// Encapsulation — private fields, public methods
public class BankAccount {
    private final String accountNumber;
    private BigDecimal balance;
    private final List<Transaction> history = new ArrayList<>();

    public BankAccount(String accountNumber, BigDecimal initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public void deposit(BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        this.balance = this.balance.add(amount);
        history.add(new Transaction(TransactionType.DEPOSIT, amount));
    }

    public void withdraw(BigDecimal amount) {
        if (amount.compareTo(balance) > 0) {
            throw new InsufficientFundsException("Insufficient balance");
        }
        this.balance = this.balance.subtract(amount);
        history.add(new Transaction(TransactionType.WITHDRAWAL, amount));
    }

    public BigDecimal getBalance() { return balance; }
    public List<Transaction> getHistory() { return Collections.unmodifiableList(history); }
}

// Polymorphism via interface
public interface PaymentProcessor {
    PaymentResult process(Payment payment);
    boolean supports(PaymentMethod method);
}

public class StripeProcessor implements PaymentProcessor {
    @Override
    public PaymentResult process(Payment payment) { /* Stripe API call */ }

    @Override
    public boolean supports(PaymentMethod method) {
        return method == PaymentMethod.CREDIT_CARD || method == PaymentMethod.DEBIT_CARD;
    }
}

public class PayPalProcessor implements PaymentProcessor {
    @Override
    public PaymentResult process(Payment payment) { /* PayPal API call */ }

    @Override
    public boolean supports(PaymentMethod method) {
        return method == PaymentMethod.PAYPAL;
    }
}

// Strategy pattern — pick the right processor at runtime
public class PaymentService {
    private final List<PaymentProcessor> processors;

    public PaymentResult processPayment(Payment payment) {
        return processors.stream()
            .filter(p -> p.supports(payment.getMethod()))
            .findFirst()
            .orElseThrow(() -> new UnsupportedPaymentMethodException(payment.getMethod()))
            .process(payment);
    }
}`,
  [
    { question: 'What is the difference between abstract class and interface?', answer: 'Abstract class: partial implementation, single inheritance, can have instance state, use when classes share code. Interface: pure contract, multiple implementation, no instance state (before Java 8), use when unrelated classes share behavior. In Java 8+, interfaces can have default methods, blurring the line — but the design intent remains different.' },
    { question: 'What is method overloading vs method overriding?', answer: 'Overloading: same method name, different parameters, in the same class — resolved at compile time. Overriding: same method name and parameters, in a subclass — resolved at runtime (polymorphism). Overloading is compile-time polymorphism; overriding is runtime polymorphism.' },
  ],
  [
    'Mutable shared state — objects shared across threads without synchronization cause race conditions. Use immutable objects or proper synchronization.',
    'Deep inheritance hierarchies — more than 2-3 levels of inheritance creates fragile, hard-to-understand code. Prefer composition over inheritance.',
    'Anemic domain model — classes with only getters/setters and no behavior. Put business logic in the domain object, not in a separate service.',
  ],
  [
    'Favor composition over inheritance — "has-a" relationships are more flexible than "is-a".',
    'Program to interfaces, not implementations — depend on abstractions.',
    'Make classes immutable where possible — thread-safe and easier to reason about.',
    'Follow SOLID principles — especially Single Responsibility.',
    'Use final for fields that shouldn\'t change after construction.',
  ],
  `OOP in Java is the foundation of everything — Spring, Hibernate, and every framework you use is built on these principles.

**The biggest OOP mistake in enterprise Java:** Anemic domain models — classes that are just data bags (getters/setters) with all logic in service classes. This is actually procedural programming in OOP clothing. Put behavior where the data is.

**For Spring Boot:** The DI container manages your object graph. Design your classes with constructor injection in mind — it makes dependencies explicit and enables testing.`,
  [
    { question: 'Is Java still relevant in 2024?', answer: 'Absolutely. Java is the dominant language for enterprise backend development. Spring Boot, Kafka, Hadoop, Android, and countless enterprise systems run on Java. Java 21 with virtual threads (Project Loom) makes it competitive with Go/Node.js for concurrent workloads.' },
    { question: 'When should I use records vs regular classes?', answer: 'Java 16+ records are perfect for immutable data carriers (DTOs, value objects). They auto-generate constructor, getters, equals, hashCode, and toString. Use records for data that shouldn\'t change; use regular classes for objects with mutable state and behavior.' },
  ],
  [
    'OOP organizes code as objects with data + behavior',
    '4 pillars: Encapsulation, Inheritance, Polymorphism, Abstraction',
    'SOLID principles are the practical guide to good OOP design',
    'Favor composition over inheritance',
    'Program to interfaces, not implementations',
    'Avoid anemic domain models — put behavior where the data is',
  ],
  ['java-collections', 'java-streams', 'spring-di']
);

export const javaCollections = makeStub(
  'java-collections',
  'Java Collections',
  'Core Java',
  ['Java 8+', 'Java 11', 'Java 17', 'Java 21'],
  'The Java Collections Framework is a set of interfaces and classes for storing and manipulating groups of objects. The most important ones: List (ordered, allows duplicates), Set (unique elements), Map (key-value pairs), and Queue (FIFO). Choosing the right collection type is one of the most important decisions in Java development.',
  `The Java Collections Framework provides:

- **List** — ordered, index-accessible, allows duplicates
  - \`ArrayList\` — backed by array, fast random access, slow insert/delete in middle
  - \`LinkedList\` — backed by linked list, fast insert/delete, slow random access
- **Set** — unique elements, no index
  - \`HashSet\` — O(1) operations, no order guarantee
  - \`LinkedHashSet\` — maintains insertion order
  - \`TreeSet\` — sorted order, O(log n) operations
- **Map** — key-value pairs, unique keys
  - \`HashMap\` — O(1) operations, no order
  - \`LinkedHashMap\` — maintains insertion order
  - \`TreeMap\` — sorted by key
  - \`ConcurrentHashMap\` — thread-safe HashMap
- **Queue/Deque** — FIFO/LIFO processing
  - \`ArrayDeque\` — preferred over Stack and LinkedList for queue/stack use`,
  `The right collection for the right job makes your code faster and more correct. Using a List when you need unique elements, or a HashMap when you need sorted iteration, leads to bugs and performance issues.`,
  `In enterprise Java:
- **ArrayList** for most general-purpose lists
- **HashMap** for most key-value lookups
- **HashSet** for membership testing and deduplication
- **ConcurrentHashMap** in multi-threaded services
- **LinkedHashMap** for LRU caches
- **TreeMap** for range queries and sorted iteration`,
  `**Time Complexity Guide:**

| Operation | ArrayList | LinkedList | HashMap | TreeMap |
|---|---|---|---|---|
| get(index) | O(1) | O(n) | N/A | N/A |
| get(key) | N/A | N/A | O(1) avg | O(log n) |
| add(end) | O(1) amort | O(1) | O(1) avg | O(log n) |
| contains | O(n) | O(n) | O(1) avg | O(log n) |
| remove | O(n) | O(1) | O(1) avg | O(log n) |`,
  'Collections in Practice',
  'java',
  `import java.util.*;
import java.util.concurrent.*;

public class CollectionsExamples {

    // ArrayList — most common, use when order matters
    public List<String> getActiveUsers(List<User> users) {
        List<String> names = new ArrayList<>(); // ArrayList, not List implementation
        for (User user : users) {
            if (user.isActive()) names.add(user.getName());
        }
        return Collections.unmodifiableList(names); // return immutable view
    }

    // HashMap — fast key-value lookup
    public Map<String, User> buildUserIndex(List<User> users) {
        Map<String, User> index = new HashMap<>(users.size() * 2); // pre-size!
        for (User user : users) {
            index.put(user.getId(), user);
        }
        return index;
    }

    // HashSet — O(1) membership test
    public List<Order> filterDuplicates(List<Order> orders) {
        Set<String> seen = new HashSet<>();
        List<Order> unique = new ArrayList<>();
        for (Order order : orders) {
            if (seen.add(order.getId())) { // add returns false if already present
                unique.add(order);
            }
        }
        return unique;
    }

    // ConcurrentHashMap — thread-safe, use in multi-threaded services
    private final Map<String, UserSession> sessions = new ConcurrentHashMap<>();

    public void addSession(String token, UserSession session) {
        sessions.put(token, session);
    }

    // computeIfAbsent — atomic put-if-absent
    public List<Order> getOrdersForUser(String userId) {
        return ordersByUser.computeIfAbsent(userId, k -> new ArrayList<>());
    }

    // LinkedHashMap as LRU cache
    public static <K, V> Map<K, V> createLRUCache(int maxSize) {
        return new LinkedHashMap<>(maxSize, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
                return size() > maxSize;
            }
        };
    }
}`,
  [
    { question: 'When should I use ArrayList vs LinkedList?', answer: 'Use ArrayList for almost everything. It has better cache performance and lower memory overhead. LinkedList is only better when you frequently insert/delete from the middle (not the end) — which is rare. LinkedList also works as a Deque (double-ended queue).' },
    { question: 'What is the difference between HashMap and Hashtable?', answer: 'Hashtable is legacy (synchronized, slower, doesn\'t allow null keys/values). HashMap is modern (not synchronized, allows one null key, multiple null values). Use HashMap + ConcurrentHashMap instead of Hashtable. Never use Hashtable in new code.' },
  ],
  [
    'NullPointerException from null keys/values in TreeMap — TreeMap uses compareTo() on keys; null keys throw NPE.',
    'ConcurrentModificationException — modifying a collection while iterating it. Use Iterator.remove() or collect to a new list.',
    'HashMap not thread-safe — using HashMap in concurrent code causes data corruption. Use ConcurrentHashMap.',
    'Memory leak with large HashMap — HashMap never shrinks. If you add and remove many entries, consider recreating or using WeakHashMap.',
  ],
  [
    'Pre-size collections when you know the approximate size: new ArrayList<>(expectedSize).',
    'Return List/Map/Set interfaces, not ArrayList/HashMap — program to the interface.',
    'Use Collections.unmodifiableList() to return read-only views.',
    'Use ConcurrentHashMap for shared maps in multi-threaded code.',
    'Prefer EnumMap and EnumSet when keys are enums — much faster than HashMap.',
  ],
  `Collections are fundamental to every Java application. The choice of collection type directly impacts performance and correctness.

**The most common mistake:** Using List.contains() for membership testing on large lists — it\'s O(n). Convert to a HashSet first for O(1) lookups.

**For Spring Boot:** Spring Data JPA returns List by default. If you need unique results, use Set in your entity relationships. For large datasets, don\'t load everything into a collection — use pagination.`,
  [
    { question: 'What is the difference between fail-fast and fail-safe iterators?', answer: 'Fail-fast iterators (ArrayList, HashMap) throw ConcurrentModificationException if the collection is modified during iteration. Fail-safe iterators (ConcurrentHashMap, CopyOnWriteArrayList) iterate over a snapshot — no exception, but may not reflect recent changes.' },
  ],
  [
    'ArrayList for ordered lists, HashMap for key-value, HashSet for unique elements',
    'Pre-size collections when you know the approximate size',
    'ConcurrentHashMap for thread-safe key-value in multi-threaded code',
    'Return interface types (List, Map, Set), not implementations',
    'HashSet membership test is O(1); List.contains() is O(n)',
  ],
  ['java-streams', 'java-oop', 'java-multithreading']
);

export const javaStreams = makeStub(
  'java-streams',
  'Java Streams API',
  'Core Java',
  ['Java 8+', 'Java 11', 'Java 17', 'Java 21'],
  'The Streams API (Java 8+) lets you process collections of data in a declarative, functional style. Instead of writing for loops to filter, transform, and aggregate data, you chain operations: list.stream().filter(...).map(...).collect(...). It\'s more readable, parallelizable, and composable than imperative loops.',
  `A Stream is a sequence of elements that supports sequential and parallel aggregate operations. Key concepts:

- **Source**: collection, array, I/O channel
- **Intermediate operations**: transform the stream (lazy) — filter, map, flatMap, sorted, distinct, limit
- **Terminal operations**: produce a result (eager) — collect, forEach, reduce, count, findFirst, anyMatch

Streams are **lazy** — intermediate operations don\'t execute until a terminal operation is called. This enables optimization (short-circuiting, fusion).`,
  `Streams replace verbose imperative loops with concise, readable pipelines. They also enable easy parallelization (just change .stream() to .parallelStream()) and compose complex data transformations cleanly.`,
  `In enterprise Java, Streams are everywhere:
- Filtering and transforming database results
- Building DTOs from entity lists
- Grouping and aggregating data
- Processing CSV/JSON records
- Validating collections`,
  `**Stream Pipeline:**
\`source → intermediate operations → terminal operation\`

**Common intermediate operations:**
- \`filter(predicate)\` — keep elements matching condition
- \`map(function)\` — transform each element
- \`flatMap(function)\` — flatten nested streams
- \`sorted(comparator)\` — sort elements
- \`distinct()\` — remove duplicates
- \`limit(n)\` — take first n elements
- \`peek(consumer)\` — debug without consuming

**Common terminal operations:**
- \`collect(Collectors.toList())\` — to list
- \`collect(Collectors.groupingBy(...))\` — group into map
- \`reduce(identity, accumulator)\` — fold to single value
- \`count()\` — count elements
- \`findFirst()\` — first matching element (Optional)
- \`anyMatch/allMatch/noneMatch\` — boolean tests`,
  'Streams in Practice',
  'java',
  `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

public class StreamsExamples {

    // Basic filter + map + collect
    public List<String> getActiveUserEmails(List<User> users) {
        return users.stream()
            .filter(User::isActive)
            .filter(u -> u.getEmail() != null)
            .map(User::getEmail)
            .map(String::toLowerCase)
            .sorted()
            .collect(Collectors.toList());
    }

    // groupingBy — build a map from a list
    public Map<String, List<Order>> groupOrdersByStatus(List<Order> orders) {
        return orders.stream()
            .collect(Collectors.groupingBy(Order::getStatus));
    }

    // counting + summarizing
    public Map<String, Long> countOrdersByStatus(List<Order> orders) {
        return orders.stream()
            .collect(Collectors.groupingBy(Order::getStatus, Collectors.counting()));
    }

    // Reduce — aggregate to single value
    public BigDecimal calculateTotal(List<OrderLine> lines) {
        return lines.stream()
            .map(line -> line.getPrice().multiply(BigDecimal.valueOf(line.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // flatMap — flatten nested collections
    public List<String> getAllTags(List<Article> articles) {
        return articles.stream()
            .flatMap(article -> article.getTags().stream())
            .distinct()
            .sorted()
            .collect(Collectors.toList());
    }

    // findFirst with Optional — safe null handling
    public Optional<User> findAdminUser(List<User> users) {
        return users.stream()
            .filter(u -> u.getRole() == Role.ADMIN)
            .findFirst();
    }

    // toMap — list to map
    public Map<String, User> indexUsersById(List<User> users) {
        return users.stream()
            .collect(Collectors.toMap(
                User::getId,
                Function.identity(),
                (existing, replacement) -> existing // merge function for duplicates
            ));
    }

    // Parallel stream — use for CPU-intensive operations on large datasets
    public List<ProcessedRecord> processLargeDataset(List<RawRecord> records) {
        return records.parallelStream()
            .filter(r -> r.isValid())
            .map(this::processRecord) // must be thread-safe!
            .collect(Collectors.toList());
    }
}`,
  [
    { question: 'Are Streams always faster than for loops?', answer: 'No. For small collections (<1000 elements), for loops are often faster due to Stream overhead. Streams shine for large datasets, complex pipelines, and parallel processing. Don\'t use Streams for performance — use them for readability and correctness. Profile before optimizing.' },
    { question: 'When should I use parallelStream()?', answer: 'Only when: (1) the dataset is large (100k+ elements), (2) the operations are CPU-intensive and stateless, (3) you\'ve measured a performance benefit. Parallel streams use the common ForkJoinPool — misuse can starve other tasks. Never use for I/O operations.' },
  ],
  [
    'Modifying the source collection inside a stream operation — causes ConcurrentModificationException.',
    'Using parallelStream() with stateful operations — race conditions and incorrect results.',
    'Stream reuse — streams can only be consumed once. Reusing a consumed stream throws IllegalStateException.',
    'NullPointerException in map() — if the mapping function can return null, use flatMap with Optional.',
  ],
  [
    'Prefer method references (User::getName) over lambdas (u -> u.getName()) for readability.',
    'Use Collectors.toUnmodifiableList() (Java 10+) to return immutable lists.',
    'Don\'t use streams for simple single-operation loops — a for loop is clearer.',
    'Use Optional.map() and Optional.flatMap() instead of null checks in stream pipelines.',
  ],
  `Streams are a fundamental part of modern Java. Every Java developer is expected to write fluent stream pipelines in interviews and production code.

**The key insight:** Streams are about what to compute, not how. This declarative style is easier to read, test, and parallelize than imperative loops.

**For Spring Data JPA:** Don\'t stream large database result sets — use pagination. Streaming millions of rows through JPA is a memory disaster. Use Pageable and Page<T> instead.`,
  [
    { question: 'What is the difference between map() and flatMap()?', answer: 'map() applies a function to each element, returning one result per element. flatMap() applies a function that returns a Stream to each element, then flattens all those streams into one. Use flatMap when your mapping function returns a collection or Optional.' },
  ],
  [
    'Streams: source → intermediate operations (lazy) → terminal operation (eager)',
    'filter/map/flatMap/sorted are intermediate; collect/count/findFirst are terminal',
    'Streams can only be consumed once',
    'Use parallelStream() only for large, CPU-bound, stateless operations',
    'Prefer method references over lambdas for readability',
  ],
  ['java-oop', 'java-collections', 'java-multithreading']
);

export const javaMultithreading = makeStub(
  'java-multithreading',
  'Java Multithreading',
  'Core Java',
  ['Java 8+', 'Java 11', 'Java 17', 'Java 21'],
  'Multithreading allows a Java program to execute multiple threads concurrently, making better use of multi-core CPUs. In enterprise applications, multithreading is everywhere — web servers handle hundreds of concurrent requests, background jobs run in thread pools, and async operations prevent blocking. Java 21 adds virtual threads, making concurrent programming much easier.',
  `Java multithreading involves:

- **Thread** — the basic unit of concurrency; a lightweight process
- **Runnable/Callable** — the task a thread executes
- **ExecutorService** — a thread pool that manages thread lifecycle
- **Future/CompletableFuture** — asynchronous computation results
- **Synchronized/Locks** — coordination between threads
- **Atomic classes** — lock-free thread-safe operations
- **Virtual Threads (Java 21)** — lightweight threads managed by the JVM`,
  `Without multithreading, a web server would process requests one at a time — one slow database query would block all other users. Multithreading enables:

- **Concurrency** — handle multiple requests simultaneously
- **Parallelism** — use all CPU cores for CPU-intensive work
- **Responsiveness** — don\'t block the main thread on I/O
- **Background processing** — run jobs without blocking the request thread`,
  `In Spring Boot applications, multithreading is mostly handled by the framework:
- Tomcat uses a thread pool for HTTP requests (default 200 threads)
- @Async methods run in a separate thread pool
- @Scheduled jobs run in a scheduler thread pool
- Database connection pools manage concurrent DB access

You write explicit multithreading for: batch processing, parallel API calls, background jobs, and CPU-intensive computations.`,
  `**Thread Safety Issues:**
- **Race condition** — two threads read and write the same data simultaneously
- **Deadlock** — two threads each hold a lock the other needs
- **Visibility** — changes by one thread not visible to another (CPU cache)
- **Atomicity** — compound operations (check-then-act) aren\'t atomic

**Solutions:**
- \`synchronized\` — mutual exclusion (one thread at a time)
- \`volatile\` — visibility guarantee (reads/writes go to main memory)
- \`AtomicInteger/AtomicLong/AtomicReference\` — lock-free atomic operations
- \`ReentrantLock\` — more flexible than synchronized
- \`ConcurrentHashMap, CopyOnWriteArrayList\` — thread-safe collections
- \`CompletableFuture\` — async pipelines without blocking`,
  'Multithreading in Practice',
  'java',
  `import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

// ExecutorService — preferred over creating threads directly
public class OrderProcessingService {

    // Fixed thread pool — good for CPU-bound tasks
    private final ExecutorService processingPool =
        Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());

    // Scheduled pool — for periodic tasks
    private final ScheduledExecutorService scheduler =
        Executors.newScheduledThreadPool(2);

    // AtomicLong — thread-safe counter without synchronization
    private final AtomicLong processedCount = new AtomicLong(0);

    // CompletableFuture — async pipeline
    public CompletableFuture<OrderResult> processOrderAsync(Order order) {
        return CompletableFuture
            .supplyAsync(() -> validateOrder(order), processingPool)
            .thenApplyAsync(validated -> chargePayment(validated), processingPool)
            .thenApplyAsync(charged -> fulfillOrder(charged), processingPool)
            .thenApply(fulfilled -> {
                processedCount.incrementAndGet();
                return new OrderResult(fulfilled, "SUCCESS");
            })
            .exceptionally(ex -> new OrderResult(null, "FAILED: " + ex.getMessage()));
    }

    // Parallel API calls — much faster than sequential
    public DashboardData loadDashboard(String userId) throws Exception {
        CompletableFuture<UserProfile> profileFuture =
            CompletableFuture.supplyAsync(() -> userService.getProfile(userId));
        CompletableFuture<List<Order>> ordersFuture =
            CompletableFuture.supplyAsync(() -> orderService.getRecent(userId));
        CompletableFuture<List<Notification>> notifFuture =
            CompletableFuture.supplyAsync(() -> notifService.getUnread(userId));

        // Wait for all — runs in parallel!
        CompletableFuture.allOf(profileFuture, ordersFuture, notifFuture).join();

        return new DashboardData(
            profileFuture.get(),
            ordersFuture.get(),
            notifFuture.get()
        );
    }

    // Java 21 Virtual Threads — handle thousands of concurrent I/O operations
    public void processWithVirtualThreads(List<Task> tasks) throws InterruptedException {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (Task task : tasks) {
                executor.submit(() -> {
                    // Virtual threads are cheap — one per task is fine!
                    processTask(task);
                });
            }
        } // auto-closes and waits for all tasks
    }
}`,
  [
    { question: 'What is the difference between synchronized and volatile?', answer: 'synchronized provides mutual exclusion (only one thread executes the block at a time) AND visibility. volatile only provides visibility (writes are immediately visible to other threads) but no mutual exclusion. Use synchronized for compound operations (check-then-act). Use volatile for simple flags that are written by one thread and read by others.' },
    { question: 'What are virtual threads (Java 21) and should I use them?', answer: 'Virtual threads are lightweight threads managed by the JVM, not the OS. You can create millions of them without running out of memory. They\'re perfect for I/O-bound work (HTTP calls, DB queries). In Spring Boot 3.2+, enable virtual threads with spring.threads.virtual.enabled=true. For new projects on Java 21+, yes — use them.' },
  ],
  [
    'Deadlock — two threads waiting for each other\'s locks. Always acquire locks in the same order across all threads.',
    'Thread pool exhaustion — all threads blocked on I/O, no threads available for new requests. Use async I/O or virtual threads.',
    'Memory visibility bugs — using non-volatile/non-synchronized shared variables. Changes by one thread not seen by others.',
    'ThreadLocal memory leak — ThreadLocal values not removed after request completes. Always call ThreadLocal.remove() in a finally block.',
  ],
  [
    'Use ExecutorService, never create raw Thread objects.',
    'Use CompletableFuture for async pipelines and parallel calls.',
    'Prefer immutable objects — they\'re inherently thread-safe.',
    'Use concurrent collections (ConcurrentHashMap) instead of synchronizing regular collections.',
    'In Java 21+, use virtual threads for I/O-bound work.',
    'Always shut down ExecutorService in a finally block or use try-with-resources.',
  ],
  `Multithreading is one of the hardest topics in Java — and one of the most asked in interviews. The key insight: **shared mutable state is the root of all concurrency bugs**.

**Design principle:** Prefer immutable data and message passing over shared mutable state. This is why functional programming (Streams, CompletableFuture) is easier to reason about than traditional synchronized code.

**For Spring Boot:** You rarely write raw multithreading code. Use @Async for background tasks, CompletableFuture for parallel calls, and let Spring\'s transaction management handle database concurrency. The framework handles most thread safety for you.`,
  [
    { question: 'When should I use parallelStream() vs CompletableFuture?', answer: 'parallelStream() is for CPU-bound operations on in-memory collections — it uses the common ForkJoinPool. CompletableFuture is for I/O-bound async operations (HTTP calls, DB queries) — you control the thread pool. Never use parallelStream() for I/O — it will block the common pool and hurt the whole JVM.' },
  ],
  [
    'Shared mutable state is the root of concurrency bugs — prefer immutable data',
    'Use ExecutorService thread pools, never raw Thread objects',
    'CompletableFuture for async pipelines and parallel I/O calls',
    'AtomicInteger/Long for thread-safe counters without locks',
    'Java 21 virtual threads make I/O-bound concurrency trivial',
    'synchronized provides mutual exclusion + visibility; volatile provides visibility only',
  ],
  ['java-oop', 'java-collections', 'spring-di']
);
