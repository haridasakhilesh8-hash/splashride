import type { TopicContent } from '../types';

export const javaLambda: TopicContent = {
  slug: 'java-lambda',
  title: 'Lambda Expressions',
  description: 'Lambda expressions — Java\'s functional programming syntax that eliminates boilerplate and powers the Streams API.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A lambda expression is a concise way to write a function — it is an anonymous function that can be passed as an argument or stored in a variable. Instead of creating an anonymous inner class to implement a single-method interface, you write the function body directly: (x) -> x * 2. Lambdas power the Streams API and make functional-style Java possible.',
  whatIsIt: `**Lambda Syntax:**
\`\`\`java
// Full syntax
(Type param1, Type param2) -> { return expression; }

// Short forms
(x) -> x * 2              // single param, expression body
x -> x * 2                // parentheses optional for single param
() -> System.out.println("hello")  // no params
(a, b) -> a + b            // multiple params
(a, b) -> {                // block body with multiple statements
    int sum = a + b;
    return sum;
}
\`\`\`

**What lambdas can do:**
- Implement any functional interface (interface with one abstract method)
- Capture effectively final local variables from enclosing scope
- Be passed as method arguments
- Be stored in variables of functional interface type
- Be returned from methods

**Method References (shorthand for lambdas):**
\`\`\`java
String::toUpperCase       // instance method reference
Integer::parseInt         // static method reference
System.out::println       // instance method on specific object
Employee::new             // constructor reference
\`\`\``,
  whyWeNeedIt: `Before Java 8, passing behavior required anonymous inner classes:
\`\`\`java
// Java 7: verbose anonymous class
list.sort(new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.compareTo(b);
    }
});

// Java 8: lambda
list.sort((a, b) -> a.compareTo(b));

// Even shorter with method reference
list.sort(String::compareTo);
\`\`\`

Lambdas enable:
- **Streams API** — functional pipeline processing
- **CompletableFuture** — async callbacks
- **Event handlers** — concise UI/event code
- **Strategy pattern** — pass behavior as data
- **Reduced boilerplate** — 10 lines becomes 1`,
  realWorldUsage: `Lambdas are everywhere in modern Java:

- Stream operations: filter, map, reduce, collect
- Comparator.comparing() for sorting
- Optional.ifPresent(), orElseGet()
- CompletableFuture callbacks
- Spring @Bean definitions
- Event listeners`,
  howItWorks: `**Lambdas are functional interface implementations:**
Every lambda implements exactly one functional interface. The compiler infers which interface based on context.

**Variable Capture:**
Lambdas can capture variables from the enclosing scope, but only if they are effectively final (never reassigned after initial assignment).

**Under the hood:**
Lambdas are NOT anonymous inner classes. The JVM uses invokedynamic bytecode instruction to create lambda instances efficiently. Lambda instances are created lazily and may be cached — they are more memory-efficient than anonymous classes.

**this in lambdas:**
\`this\` refers to the enclosing class instance, NOT the lambda itself (unlike anonymous classes where \`this\` refers to the anonymous class instance).`,
  example: {
    title: 'Lambdas in Enterprise Code',
    description: 'The lambda patterns you will use every day in Java development.',
    code: [
      {
        label: 'Core Lambda Patterns',
        language: 'java',
        code: `// Comparator — sorting
List<Employee> employees = getEmployees();

// Sort by salary descending, then by name ascending
employees.sort(Comparator
    .comparing(Employee::getSalary).reversed()
    .thenComparing(Employee::getName));

// Runnable — execute in thread
Thread t = new Thread(() -> System.out.println("Running in thread"));
t.start();

// Predicate — filtering
Predicate<Employee> isActive = emp -> emp.isActive();
Predicate<Employee> isHighEarner = emp -> emp.getSalary().compareTo(new BigDecimal("100000")) > 0;
Predicate<Employee> activeHighEarner = isActive.and(isHighEarner);
Predicate<Employee> notActive = isActive.negate();

List<Employee> filtered = employees.stream()
    .filter(activeHighEarner)
    .collect(Collectors.toList());

// Function — transformation
Function<String, Integer> strToInt = Integer::parseInt;
Function<Integer, String> intToStr = String::valueOf;
Function<String, String> parseAndDouble = strToInt.andThen(n -> n * 2).andThen(intToStr);

// Consumer — side effects
Consumer<String> logger = msg -> log.info("Processing: {}", msg);
Consumer<String> emailSender = email -> emailService.send(email);
Consumer<String> logAndEmail = logger.andThen(emailSender);

// Supplier — lazy evaluation
Supplier<List<Employee>> lazyEmployees = () -> employeeRepo.findAll();
// Only calls findAll() when .get() is called
List<Employee> emps = lazyEmployees.get();

// BiFunction — two inputs
BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);
String result = repeat.apply("ha", 3);  // "hahaha"`,
      },
      {
        label: 'Method References',
        language: 'java',
        code: `// Method references — cleaner than lambdas for existing methods

// Static method reference: ClassName::staticMethod
Function<String, Integer> parser = Integer::parseInt;
// Equivalent: s -> Integer.parseInt(s)

// Instance method on parameter: ClassName::instanceMethod
Function<String, String> upper = String::toUpperCase;
// Equivalent: s -> s.toUpperCase()

Comparator<String> comparator = String::compareTo;
// Equivalent: (a, b) -> a.compareTo(b)

// Instance method on specific object: instance::method
String prefix = "Hello, ";
Function<String, String> greeter = prefix::concat;
// Equivalent: name -> prefix.concat(name)

// Constructor reference: ClassName::new
Function<String, StringBuilder> sbCreator = StringBuilder::new;
// Equivalent: s -> new StringBuilder(s)

Supplier<ArrayList<String>> listCreator = ArrayList::new;
// Equivalent: () -> new ArrayList<>()

// Real usage
List<String> names = List.of("alice", "bob", "charlie");
List<String> upper = names.stream()
    .map(String::toUpperCase)       // method reference
    .collect(Collectors.toList());

names.forEach(System.out::println); // method reference on instance

List<Integer> lengths = names.stream()
    .map(String::length)            // method reference
    .collect(Collectors.toList());`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is "effectively final" and why does it matter for lambdas?',
      answer: 'A variable is effectively final if it is never reassigned after its initial assignment. Lambdas can capture effectively final variables from the enclosing scope. This restriction exists because lambdas can outlive the method they are defined in (e.g., stored in a field, passed to another thread). If the variable could change, the lambda would see inconsistent values.',
    },
    {
      question: 'What is the difference between a lambda and an anonymous class?',
      answer: 'Lambdas are more concise and have different this semantics (this refers to enclosing class, not the lambda). Anonymous classes can implement interfaces with multiple methods, have state (fields), and extend classes. Lambdas can only implement single-abstract-method interfaces. Lambdas are also more memory-efficient — the JVM can optimize them better than anonymous classes.',
    },
    {
      question: 'Can lambdas throw checked exceptions?',
      answer: 'Only if the functional interface declares them in throws. Runnable does not declare any checked exceptions, so a Runnable lambda cannot throw IOException without wrapping. If you need to throw checked exceptions in a lambda, either: (1) wrap in a RuntimeException, (2) use a custom functional interface that declares throws, or (3) use Lombok @SneakyThrows.',
    },
  ],
  productionIssues: [
    'Capturing mutable shared state in lambdas — lambdas capture variables but cannot modify them. If you need to accumulate results, use a stream terminal operation or pass a mutable container.',
    'Long lambdas — if a lambda is more than 3-4 lines, extract it to a named method and use a method reference. This improves readability and testability.',
    'Lambda in serializable context — lambdas are not serializable by default. If you store lambdas in a serializable class, you must use a named class instead.',
  ],
  bestPractices: [
    'Keep lambdas short — 1-3 lines. Extract longer logic to named methods.',
    'Use method references when the lambda is just calling an existing method.',
    'Name complex predicates/functions: Predicate<User> isActive = user -> user.isActive().',
    'Avoid side effects in lambdas used in streams — prefer pure functions.',
    'Use built-in functional interfaces (Function, Predicate, Consumer, Supplier) instead of creating custom ones when possible.',
  ],
  architectNote: 'Lambdas fundamentally changed Java\'s programming model. Before Java 8, Java was purely object-oriented. With lambdas, Java supports functional programming patterns: immutability, pure functions, function composition, and declarative data processing. Modern Java code uses a mix: OOP for domain modeling, functional style for data transformation. The Streams API is the primary consumer of lambdas in enterprise code.',
  faqs: [
    {
      question: 'Are lambdas always faster than anonymous classes?',
      answer: 'Usually yes, but it depends. The JVM uses invokedynamic for lambdas, which can cache and optimize them better than anonymous classes. For very simple lambdas called millions of times, the difference is negligible. For complex scenarios, lambdas can be faster due to JIT optimizations. In practice, never optimize for this — write readable code and let the JVM optimize.',
    },
    {
      question: 'What is a closure in Java?',
      answer: 'A closure is a function that captures variables from its enclosing scope. Java lambdas are closures — they can capture effectively final local variables. However, Java closures are more restricted than closures in languages like JavaScript or Kotlin — Java requires captured variables to be effectively final.',
    },
  ],
  keyTakeaways: [
    'Lambda = anonymous function implementing a single-abstract-method interface',
    'Syntax: (params) -> expression or (params) -> { statements; }',
    'Method references are shorthand for lambdas that call existing methods',
    'Captured variables must be effectively final',
    'this in a lambda refers to the enclosing class, not the lambda',
    'Lambdas power Streams, CompletableFuture, and all functional Java APIs',
  ],
  relatedTopics: ['java-functional-interfaces', 'java-streams', 'java-optional', 'java-completable-future'],
};

export const javaFunctionalInterfaces: TopicContent = {
  slug: 'java-functional-interfaces',
  title: 'Functional Interfaces',
  description: 'The built-in functional interfaces in java.util.function — Function, Predicate, Consumer, Supplier, and how to compose them.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A functional interface has exactly one abstract method. It can be implemented with a lambda expression. Java 8 added java.util.function with 40+ built-in functional interfaces covering all common patterns: Function (transform), Predicate (test), Consumer (consume), Supplier (produce), and BiXxx variants for two inputs.',
  whatIsIt: `**Core Functional Interfaces:**

**Function<T, R>** — takes T, returns R
- apply(T t): R
- andThen(Function): compose after
- compose(Function): compose before

**Predicate<T>** — takes T, returns boolean
- test(T t): boolean
- and(Predicate), or(Predicate), negate()

**Consumer<T>** — takes T, returns void
- accept(T t)
- andThen(Consumer)

**Supplier<T>** — takes nothing, returns T
- get(): T

**BiFunction<T, U, R>** — takes T and U, returns R
**BiPredicate<T, U>** — takes T and U, returns boolean
**BiConsumer<T, U>** — takes T and U, returns void

**Primitive Specializations (avoid boxing overhead):**
- IntFunction<R>, LongFunction<R>, DoubleFunction<R>
- IntPredicate, LongPredicate, DoublePredicate
- IntConsumer, IntSupplier, IntUnaryOperator
- ToIntFunction<T>, ToLongFunction<T>

**UnaryOperator<T>** — Function<T, T> (same type in and out)
**BinaryOperator<T>** — BiFunction<T, T, T>`,
  whyWeNeedIt: `Functional interfaces are the types that lambdas implement. Without them, there would be no standard way to pass functions as arguments. The java.util.function package provides standard types that the entire Java ecosystem uses — Streams, Optional, CompletableFuture, and all major frameworks speak this language.`,
  realWorldUsage: `Functional interfaces appear everywhere:

\`\`\`java
// Spring Data Specification (Predicate)
Specification<User> isActive = (root, query, cb) -> cb.isTrue(root.get("active"));

// Optional (Supplier, Consumer, Function)
Optional.ofNullable(value)
    .map(String::toUpperCase)          // Function
    .filter(s -> s.length() > 3)       // Predicate
    .ifPresent(System.out::println);   // Consumer

// CompletableFuture (Function, Consumer, Supplier)
CompletableFuture.supplyAsync(() -> fetchData())  // Supplier
    .thenApply(data -> transform(data))            // Function
    .thenAccept(result -> save(result));            // Consumer
\`\`\``,
  howItWorks: `**@FunctionalInterface annotation:**
Optional but recommended. Causes a compile error if the interface has more than one abstract method. Documents intent.

**Function Composition:**
Functions can be composed into pipelines:
\`\`\`java
Function<String, String> trim = String::trim;
Function<String, String> upper = String::toUpperCase;
Function<String, Integer> length = String::length;

Function<String, Integer> pipeline = trim.andThen(upper).andThen(length);
int result = pipeline.apply("  hello  ");  // 5
\`\`\`

**Predicate Composition:**
\`\`\`java
Predicate<String> notEmpty = s -> !s.isEmpty();
Predicate<String> notTooLong = s -> s.length() <= 100;
Predicate<String> valid = notEmpty.and(notTooLong);
\`\`\``,
  example: {
    title: 'Functional Interfaces in Enterprise Code',
    description: 'How to use and compose functional interfaces for clean, reusable business logic.',
    code: [
      {
        label: 'Built-in Functional Interfaces',
        language: 'java',
        code: `// Function<T, R> — transformation
Function<String, Integer> strLength = String::length;
Function<Integer, String> intToStr = n -> "Value: " + n;

// Compose: first strLength, then intToStr
Function<String, String> composed = strLength.andThen(intToStr);
System.out.println(composed.apply("hello"));  // "Value: 5"

// Predicate<T> — boolean test
Predicate<String> isEmail = s -> s.contains("@") && s.contains(".");
Predicate<String> notBlank = s -> !s.isBlank();
Predicate<String> validEmail = notBlank.and(isEmail);
Predicate<String> invalidEmail = validEmail.negate();

System.out.println(validEmail.test("user@example.com"));  // true
System.out.println(validEmail.test("notanemail"));         // false

// Consumer<T> — side effect
Consumer<String> log = msg -> System.out.println("[LOG] " + msg);
Consumer<String> audit = msg -> auditService.record(msg);
Consumer<String> logAndAudit = log.andThen(audit);
logAndAudit.accept("User login");

// Supplier<T> — lazy value production
Supplier<Connection> dbConn = () -> dataSource.getConnection();
// Connection not created until dbConn.get() is called

// UnaryOperator<T> — transform same type
UnaryOperator<String> normalize = s -> s.trim().toLowerCase();
UnaryOperator<BigDecimal> roundCurrency = 
    n -> n.setScale(2, RoundingMode.HALF_UP);

// BinaryOperator<T> — combine two of same type
BinaryOperator<BigDecimal> sum = BigDecimal::add;
BinaryOperator<String> concat = String::concat;`,
      },
      {
        label: 'Custom Functional Interface',
        language: 'java',
        code: `// Custom functional interface for domain-specific operations
@FunctionalInterface
public interface Validator<T> {
    ValidationResult validate(T value);
    
    // Default method for composing validators
    default Validator<T> and(Validator<T> other) {
        return value -> {
            ValidationResult first = this.validate(value);
            if (!first.isValid()) return first;
            return other.validate(value);
        };
    }
    
    // Static factory methods
    static <T> Validator<T> of(Predicate<T> predicate, String errorMessage) {
        return value -> predicate.test(value)
            ? ValidationResult.valid()
            : ValidationResult.invalid(errorMessage);
    }
}

// Usage
Validator<String> notBlank = Validator.of(
    s -> !s.isBlank(), "Must not be blank"
);
Validator<String> validLength = Validator.of(
    s -> s.length() >= 8 && s.length() <= 50, "Must be 8-50 characters"
);
Validator<String> noSpaces = Validator.of(
    s -> !s.contains(" "), "Must not contain spaces"
);

Validator<String> passwordValidator = notBlank.and(validLength).and(noSpaces);

ValidationResult result = passwordValidator.validate("mypassword");
if (!result.isValid()) {
    throw new ValidationException(result.getError());
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between Function and UnaryOperator?',
      answer: 'UnaryOperator<T> extends Function<T, T> — it is a Function where the input and output type are the same. Use UnaryOperator when you are transforming a value to the same type (String -> String, Integer -> Integer). Use Function when input and output types differ (String -> Integer). The distinction helps readability and enables some additional composition methods.',
    },
    {
      question: 'Why are there primitive specializations like IntFunction and LongPredicate?',
      answer: 'Generic types like Function<Integer, R> require boxing (int -> Integer) and unboxing, which has overhead. Primitive specializations like IntFunction<R> work directly with int primitives, avoiding boxing. For performance-critical code processing millions of numbers, use primitive specializations. For typical business code, the generic versions are fine.',
    },
  ],
  productionIssues: [
    'Not using primitive specializations for numeric streams — using Stream<Integer> instead of IntStream boxes every integer. For large numeric datasets, use IntStream, LongStream, DoubleStream.',
    'Stateful lambdas in parallel streams — if a lambda captures mutable state, parallel stream operations are not safe. Keep lambdas stateless.',
  ],
  bestPractices: [
    'Use built-in functional interfaces (Function, Predicate, Consumer, Supplier) instead of creating custom ones.',
    'Create custom functional interfaces only for domain-specific semantics that add clarity.',
    'Annotate custom functional interfaces with @FunctionalInterface.',
    'Use primitive specializations (IntFunction, etc.) for performance-critical numeric code.',
    'Name complex functions and predicates for readability: Predicate<User> isEligibleForPromotion = ...',
  ],
  architectNote: 'Functional interfaces are the bridge between OOP and FP in Java. In domain-driven design, functional interfaces can represent domain operations: Validator<Order>, PricingStrategy, DiscountRule. These are more flexible than class hierarchies — you can compose them, swap them at runtime, and test them in isolation. This is the Strategy pattern expressed functionally.',
  faqs: [
    {
      question: 'Can a functional interface have default and static methods?',
      answer: 'Yes. A functional interface can have any number of default and static methods — only abstract methods count toward the one-abstract-method limit. This is how Predicate has and(), or(), negate() as default methods while still being a functional interface with test() as the single abstract method.',
    },
  ],
  keyTakeaways: [
    'Functional interface = interface with exactly one abstract method',
    'Core interfaces: Function (transform), Predicate (test), Consumer (side effect), Supplier (produce)',
    'Compose functions with andThen/compose; predicates with and/or/negate',
    'Use primitive specializations (IntFunction, etc.) to avoid boxing overhead',
    '@FunctionalInterface annotation enforces the single-abstract-method constraint',
    'Built-in interfaces are used by Streams, Optional, CompletableFuture — learn them well',
  ],
  relatedTopics: ['java-lambda', 'java-streams', 'java-optional', 'java-abstraction'],
};

export const javaStreams: TopicContent = {
  slug: 'java-streams',
  title: 'Streams API',
  description: 'The Streams API — declarative data processing pipelines that replaced verbose loops in modern Java. How to use, when to use parallel streams, and common mistakes.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The Streams API lets you process collections declaratively. Instead of writing a loop with if-statements and accumulator variables, you write a pipeline: source.filter(...).map(...).collect(...). Streams are lazy (nothing executes until a terminal operation), composable, and optionally parallel. They are the most important Java 8 feature for enterprise developers.',
  whatIsIt: `**Stream Pipeline = Source + Intermediate Operations + Terminal Operation**

**Sources:**
- collection.stream(), collection.parallelStream()
- Arrays.stream(array)
- Stream.of(elements), Stream.generate(), Stream.iterate()
- Files.lines(path), IntStream.range(0, 100)

**Intermediate Operations (lazy, return Stream):**
- filter(Predicate) — keep elements matching predicate
- map(Function) — transform each element
- flatMap(Function) — transform and flatten nested streams
- distinct() — remove duplicates
- sorted() / sorted(Comparator) — sort
- limit(n) / skip(n) — take first n / skip first n
- peek(Consumer) — debug/side-effect without consuming
- mapToInt/Long/Double — convert to primitive stream

**Terminal Operations (eager, trigger execution):**
- collect(Collector) — accumulate to collection/map/string
- forEach(Consumer) — side effect for each element
- count() — count elements
- findFirst() / findAny() — find element (returns Optional)
- anyMatch / allMatch / noneMatch(Predicate) — boolean tests
- reduce(identity, BinaryOperator) — fold to single value
- min / max(Comparator) — find min/max (returns Optional)
- toList() — collect to unmodifiable List (Java 16+)`,
  whyWeNeedIt: `Compare imperative vs declarative:
\`\`\`java
// Imperative (Java 7)
List<String> result = new ArrayList<>();
for (Employee emp : employees) {
    if (emp.isActive() && emp.getSalary().compareTo(threshold) > 0) {
        result.add(emp.getName().toUpperCase());
    }
}
Collections.sort(result);

// Declarative (Java 8+ Streams)
List<String> result = employees.stream()
    .filter(Employee::isActive)
    .filter(emp -> emp.getSalary().compareTo(threshold) > 0)
    .map(Employee::getName)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
\`\`\`

The stream version is shorter, reads like English, and is easier to modify.`,
  realWorldUsage: `Streams are used in every modern Java service:

- Filtering and transforming query results
- Grouping and aggregating data
- Converting between DTOs and entities
- Validating collections
- Building lookup maps from lists`,
  howItWorks: `**Laziness:**
Intermediate operations are lazy — they are not executed until a terminal operation is called. This enables short-circuiting: filter().findFirst() stops as soon as the first match is found, even if the source has millions of elements.

**Internal Iteration:**
Streams use internal iteration — you describe what to do, the stream decides how to do it. This enables parallel execution without changing the code.

**Stream vs Collection:**
- Collections store data; Streams process data
- Streams are single-use — once consumed, they cannot be reused
- Streams do not modify the source collection`,
  example: {
    title: 'Streams in Enterprise Code',
    description: 'Real-world stream patterns from production Java applications.',
    code: [
      {
        label: 'Core Stream Operations',
        language: 'java',
        code: `List<Order> orders = orderRepository.findAll();

// Filter + map + collect
List<String> activeOrderIds = orders.stream()
    .filter(o -> o.getStatus() == OrderStatus.ACTIVE)
    .map(Order::getId)
    .map(Object::toString)
    .collect(Collectors.toList());

// Grouping by field
Map<OrderStatus, List<Order>> byStatus = orders.stream()
    .collect(Collectors.groupingBy(Order::getStatus));

// Counting by field
Map<String, Long> countByCustomer = orders.stream()
    .collect(Collectors.groupingBy(
        Order::getCustomerId,
        Collectors.counting()
    ));

// Sum / average
BigDecimal totalRevenue = orders.stream()
    .filter(o -> o.getStatus() == OrderStatus.COMPLETED)
    .map(Order::getTotalAmount)
    .reduce(BigDecimal.ZERO, BigDecimal::add);

OptionalDouble avgAmount = orders.stream()
    .mapToDouble(o -> o.getTotalAmount().doubleValue())
    .average();

// flatMap — flatten nested collections
List<LineItem> allItems = orders.stream()
    .flatMap(o -> o.getLineItems().stream())
    .collect(Collectors.toList());

// distinct + sorted
List<String> uniqueCustomers = orders.stream()
    .map(Order::getCustomerId)
    .distinct()
    .sorted()
    .collect(Collectors.toList());

// anyMatch / allMatch / noneMatch
boolean hasOverdueOrders = orders.stream()
    .anyMatch(o -> o.getDueDate().isBefore(LocalDate.now()));

boolean allValid = orders.stream()
    .allMatch(o -> o.getTotalAmount().compareTo(BigDecimal.ZERO) > 0);`,
      },
      {
        label: 'Advanced Collectors',
        language: 'java',
        code: `// Collectors.joining — build a string
String orderIds = orders.stream()
    .map(o -> o.getId().toString())
    .collect(Collectors.joining(", ", "[", "]"));
// "[1, 2, 3, 4]"

// Collectors.toMap — build a lookup map
Map<Long, Order> orderById = orders.stream()
    .collect(Collectors.toMap(
        Order::getId,
        Function.identity(),
        (existing, duplicate) -> existing  // merge function for duplicates
    ));

// Collectors.partitioningBy — split into two groups
Map<Boolean, List<Order>> partition = orders.stream()
    .collect(Collectors.partitioningBy(
        o -> o.getTotalAmount().compareTo(new BigDecimal("1000")) > 0
    ));
List<Order> highValue = partition.get(true);
List<Order> lowValue = partition.get(false);

// Collectors.summarizingDouble — statistics
DoubleSummaryStatistics stats = orders.stream()
    .collect(Collectors.summarizingDouble(
        o -> o.getTotalAmount().doubleValue()
    ));
System.out.println("Count: " + stats.getCount());
System.out.println("Sum: " + stats.getSum());
System.out.println("Avg: " + stats.getAverage());
System.out.println("Min: " + stats.getMin());
System.out.println("Max: " + stats.getMax());

// Collectors.teeing (Java 12+) — collect into two collectors simultaneously
record Summary(long count, BigDecimal total) {}
Summary summary = orders.stream()
    .collect(Collectors.teeing(
        Collectors.counting(),
        Collectors.mapping(Order::getTotalAmount,
            Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)),
        Summary::new
    ));`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between map() and flatMap()?',
      answer: 'map() transforms each element to one element (1-to-1). flatMap() transforms each element to a Stream and flattens all those streams into one (1-to-many). Use flatMap() when each element contains a collection you want to process: orders.stream().flatMap(o -> o.getLineItems().stream()) produces a flat stream of all line items from all orders.',
    },
    {
      question: 'When should I use parallel streams?',
      answer: 'Parallel streams split the work across CPU cores. Use them for: CPU-intensive operations (heavy computation per element), large datasets (10,000+ elements), stateless operations (no shared mutable state). Avoid for: I/O operations (threads block waiting for I/O), small datasets (parallelism overhead exceeds benefit), operations with shared mutable state (race conditions).',
    },
    {
      question: 'Can I reuse a Stream?',
      answer: 'No. A Stream can only be consumed once. After a terminal operation, the stream is closed. Calling any operation on a closed stream throws IllegalStateException. If you need to process the same data multiple times, call stream() again on the source collection.',
    },
  ],
  productionIssues: [
    'Stream not closed after use with I/O — streams backed by I/O (Files.lines()) must be closed. Use try-with-resources: try (Stream<String> lines = Files.lines(path)) { ... }',
    'Parallel stream with non-thread-safe operations — using parallel() with a non-thread-safe Collector or shared mutable state causes data corruption.',
    'Collecting to null — stream operations can produce null elements if map() returns null. Use filter(Objects::nonNull) or Optional to handle nulls.',
    'Using peek() for more than debugging — peek() is an intermediate operation meant for debugging. Do not use it for side effects in production code — use forEach() instead.',
  ],
  bestPractices: [
    'Use stream().toList() (Java 16+) for unmodifiable lists instead of Collectors.toList().',
    'Close I/O-backed streams with try-with-resources.',
    'Use primitive streams (IntStream, LongStream) for numeric operations to avoid boxing.',
    'Avoid stateful lambdas in stream operations — keep them pure.',
    'Use parallel streams only for CPU-intensive, large-dataset operations.',
    'Extract complex stream pipelines into named methods for readability.',
  ],
  architectNote: 'Streams are excellent for in-memory data transformation. Do not use them as a replacement for database queries. If you are filtering 10,000 records in a stream that you loaded from a database, you should be filtering in SQL instead. The right architecture: let the database do filtering/sorting/aggregation (SQL is optimized for this), use streams for in-memory transformation of the results.',
  faqs: [
    {
      question: 'What is the difference between Stream.collect() and Stream.reduce()?',
      answer: 'reduce() combines elements into a single value using a binary operation: reduce(identity, BinaryOperator). It is pure functional — no mutable state. collect() uses a mutable container (like ArrayList) to accumulate results — it is more efficient for building collections. Use reduce() for mathematical operations (sum, product, min, max). Use collect() for building collections, maps, and strings.',
    },
    {
      question: 'What are Spliterators?',
      answer: 'A Spliterator is the iterator used internally by Streams, designed to support splitting for parallel processing. You rarely use Spliterators directly — they are an implementation detail. When you call parallelStream(), the Spliterator splits the data into chunks that different threads process independently.',
    },
  ],
  keyTakeaways: [
    'Stream pipeline = source + intermediate operations (lazy) + terminal operation (eager)',
    'filter() keeps elements; map() transforms; flatMap() transforms and flattens',
    'collect() is the most powerful terminal operation — use Collectors for grouping, counting, joining',
    'Streams are single-use — cannot be reused after terminal operation',
    'Use parallel streams only for CPU-intensive operations on large datasets',
    'Close I/O-backed streams with try-with-resources',
  ],
  relatedTopics: ['java-lambda', 'java-functional-interfaces', 'java-optional', 'java-collections-list'],
};

export const javaOptional: TopicContent = {
  slug: 'java-optional',
  title: 'Optional',
  description: 'Optional<T> — Java\'s way to represent a value that may or may not be present, eliminating NullPointerExceptions in return values.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Optional<T> is a container that either holds a value or is empty. It forces callers to explicitly handle the "no value" case, eliminating NullPointerExceptions from return values. Use it as a return type for methods that might not find a result. Do NOT use it as a method parameter, field type, or in collections.',
  whatIsIt: `**Optional API:**
\`\`\`java
// Creating
Optional.of(value)         // value must not be null
Optional.ofNullable(value) // null becomes empty Optional
Optional.empty()           // empty Optional

// Checking
optional.isPresent()       // true if has value
optional.isEmpty()         // true if empty (Java 11+)

// Getting value
optional.get()             // throws NoSuchElementException if empty — avoid!
optional.orElse(default)   // return value or default
optional.orElseGet(Supplier) // return value or compute default lazily
optional.orElseThrow()     // throw NoSuchElementException if empty (Java 10+)
optional.orElseThrow(Supplier<Exception>) // throw custom exception

// Transforming
optional.map(Function)     // transform if present, empty if not
optional.flatMap(Function) // transform to Optional if present
optional.filter(Predicate) // keep if predicate passes, empty otherwise

// Side effects
optional.ifPresent(Consumer) // run consumer if present
optional.ifPresentOrElse(Consumer, Runnable) // Java 9+
\`\`\``,
  whyWeNeedIt: `Without Optional, methods that might not find a result return null:
\`\`\`java
// Old style — null return
User user = userRepository.findByEmail(email);
if (user == null) {
    throw new UserNotFoundException(email);
}
String name = user.getName().toUpperCase();  // NPE if getName() is null!
\`\`\`

With Optional:
\`\`\`java
// Optional style — explicit handling required
Optional<User> userOpt = userRepository.findByEmail(email);
String name = userOpt
    .map(User::getName)
    .map(String::toUpperCase)
    .orElseThrow(() -> new UserNotFoundException(email));
\`\`\`

The Optional version makes the "might not exist" case explicit and chains transformations safely.`,
  realWorldUsage: `Optional is standard in Spring Data:
\`\`\`java
// Spring Data Repository
Optional<User> findById(Long id);
Optional<User> findByEmail(String email);

// Service usage
public UserDto getUser(Long id) {
    return userRepository.findById(id)
        .map(userMapper::toDto)
        .orElseThrow(() -> new UserNotFoundException(id));
}
\`\`\``,
  howItWorks: `**Optional is just a wrapper:**
\`\`\`java
// Simplified implementation
public final class Optional<T> {
    private final T value;  // null if empty
    
    private Optional(T value) { this.value = value; }
    
    public static <T> Optional<T> of(T value) {
        return new Optional<>(Objects.requireNonNull(value));
    }
    
    public static <T> Optional<T> empty() {
        return new Optional<>(null);
    }
    
    public boolean isPresent() { return value != null; }
    
    public <U> Optional<U> map(Function<T, U> mapper) {
        if (value == null) return empty();
        return Optional.ofNullable(mapper.apply(value));
    }
}
\`\`\`

**Performance:**
Optional creates a wrapper object. For performance-critical code called millions of times, this overhead matters. For typical service code, it is negligible.`,
  example: {
    title: 'Optional in Enterprise Code',
    description: 'How to use Optional correctly in a Spring Boot service.',
    code: [
      {
        label: 'Correct Optional Usage',
        language: 'java',
        code: `// GOOD: Optional as return type for "might not exist"
public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
}

// GOOD: Chain operations on Optional
public String getUserDisplayName(Long userId) {
    return userRepository.findById(userId)
        .map(User::getProfile)          // Optional<Profile>
        .map(Profile::getDisplayName)   // Optional<String>
        .filter(name -> !name.isBlank()) // Optional<String>
        .orElse("Anonymous");           // String
}

// GOOD: orElseThrow for required values
public UserDto getUser(Long id) {
    return userRepository.findById(id)
        .map(this::toDto)
        .orElseThrow(() -> new UserNotFoundException(id));
}

// GOOD: ifPresent for side effects
public void sendWelcomeEmail(String email) {
    userRepository.findByEmail(email)
        .ifPresent(user -> emailService.sendWelcome(user.getEmail()));
}

// GOOD: ifPresentOrElse (Java 9+)
public void processUser(Long id) {
    userRepository.findById(id)
        .ifPresentOrElse(
            user -> processActiveUser(user),
            () -> log.warn("User {} not found, skipping", id)
        );
}

// GOOD: Optional.ofNullable for legacy null-returning APIs
public Optional<String> getConfigValue(String key) {
    String value = legacyConfig.get(key);  // may return null
    return Optional.ofNullable(value);
}`,
      },
      {
        label: 'Optional Anti-Patterns',
        language: 'java',
        code: `// BAD: Optional as method parameter
// Forces callers to wrap values in Optional unnecessarily
public void updateUser(Optional<String> name, Optional<String> email) { }
// GOOD: Use method overloading or @Nullable annotation instead
public void updateUser(String name, String email) { }

// BAD: Optional in collections
List<Optional<User>> users;  // pointless — just use null filtering
// GOOD: 
List<User> users = findUsers().stream()
    .filter(Objects::nonNull)
    .collect(Collectors.toList());

// BAD: Optional as instance field (not serializable)
class UserService {
    private Optional<CacheService> cache;  // BAD
}
// GOOD: use null directly in fields, Optional in return types

// BAD: optional.get() without isPresent() check
User user = optional.get();  // throws NoSuchElementException if empty!
// GOOD: use orElseThrow, orElse, or ifPresent

// BAD: isPresent() + get() pattern
if (optional.isPresent()) {
    User user = optional.get();  // verbose, defeats the purpose
    process(user);
}
// GOOD: use ifPresent or map
optional.ifPresent(this::process);

// BAD: Returning null instead of empty Optional
public Optional<User> findUser(Long id) {
    User user = db.find(id);
    if (user == null) return null;  // NEVER return null from Optional method!
    return Optional.of(user);
}
// GOOD:
public Optional<User> findUser(Long id) {
    return Optional.ofNullable(db.find(id));
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use Optional everywhere to avoid NullPointerExceptions?',
      answer: 'No. Optional is designed specifically for method return types where "no result" is a valid outcome. Do not use Optional for: method parameters (use @Nullable or overloading), instance fields (not serializable, adds overhead), collections (filter nulls instead), or primitives (use OptionalInt, OptionalLong, OptionalDouble). Overusing Optional adds unnecessary overhead and verbosity.',
    },
    {
      question: 'What is the difference between orElse() and orElseGet()?',
      answer: 'orElse(defaultValue) always evaluates the default value, even if the Optional has a value. orElseGet(Supplier) only evaluates the supplier if the Optional is empty. If the default value is expensive to compute (DB call, network request), always use orElseGet(). For cheap defaults (literals, constants), orElse() is fine.',
    },
  ],
  productionIssues: [
    'Calling optional.get() without checking — always use orElseThrow(), orElse(), or ifPresent() instead of get().',
    'Optional.of(null) — throws NullPointerException immediately. Use Optional.ofNullable(value) when the value might be null.',
    'Expensive orElse() computation — orElse(expensiveOperation()) always runs the operation. Use orElseGet(() -> expensiveOperation()) instead.',
  ],
  bestPractices: [
    'Use Optional as a return type for methods that might not find a result.',
    'Never use Optional as a method parameter or instance field.',
    'Never return null from a method that returns Optional.',
    'Use orElseGet() instead of orElse() for expensive default values.',
    'Chain map/filter/flatMap instead of isPresent() + get().',
    'Use orElseThrow() to throw domain exceptions when a value is required.',
  ],
  architectNote: 'Optional was designed as a return type hint, not a general null-avoidance mechanism. The real solution to NullPointerException is disciplined use of @NonNull annotations (Lombok, JSpecify), null-safe APIs, and domain design that avoids null (use empty collections instead of null, use Optional only for genuinely optional values). Java 21\'s improved NPE messages (showing which variable was null) also reduce the debugging burden.',
  faqs: [
    {
      question: 'What is the difference between Optional.map() and Optional.flatMap()?',
      answer: 'map() applies a function that returns a plain value: Optional<User>.map(User::getName) returns Optional<String>. flatMap() applies a function that returns an Optional: Optional<User>.flatMap(user -> findProfile(user)) returns Optional<Profile> (not Optional<Optional<Profile>>). Use flatMap() when the mapping function itself returns an Optional.',
    },
    {
      question: 'Is Optional serializable?',
      answer: 'No. Optional does not implement Serializable. This is why you should not use Optional as a field in entities or DTOs that need to be serialized (JSON, Java serialization). Use @JsonInclude(NON_NULL) with nullable fields for JSON, and null directly for Java serialization.',
    },
  ],
  keyTakeaways: [
    'Optional is a return type for methods that might not find a result',
    'Do NOT use Optional as method parameters, fields, or in collections',
    'Never return null from a method that returns Optional',
    'Use orElseGet() for expensive defaults; orElse() for cheap ones',
    'Chain map/filter/flatMap instead of isPresent() + get()',
    'orElseThrow() is the idiomatic way to throw an exception for missing values',
  ],
  relatedTopics: ['java-lambda', 'java-streams', 'java-functional-interfaces', 'java-exception-trycatch'],
};
