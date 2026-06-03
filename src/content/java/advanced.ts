import type { TopicContent } from '../types';

export const javaGenerics: TopicContent = {
  slug: 'java-generics',
  title: 'Generics',
  description: 'Java Generics — type parameters, bounded wildcards, type erasure, and how generics make collections and APIs type-safe.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Generics allow you to write code that works with any type while maintaining compile-time type safety. List<String> is a List that only holds Strings — the compiler catches type errors at compile time instead of runtime. Without generics, you would use raw List and get ClassCastException at runtime.',
  whatIsIt: `**Generic Class:**
\`\`\`java
public class Box<T> {
    private T value;
    public Box(T value) { this.value = value; }
    public T get() { return value; }
}
Box<String> stringBox = new Box<>("hello");
Box<Integer> intBox = new Box<>(42);
\`\`\`

**Generic Method:**
\`\`\`java
public <T> List<T> repeat(T item, int times) {
    List<T> result = new ArrayList<>();
    for (int i = 0; i < times; i++) result.add(item);
    return result;
}
\`\`\`

**Bounded Type Parameters:**
- \`<T extends Comparable<T>>\` — T must implement Comparable
- \`<T extends Number & Serializable>\` — T must extend Number AND implement Serializable
- \`<? extends Animal>\` — wildcard: any Animal subtype (read-only)
- \`<? super Dog>\` — wildcard: Dog or any supertype (write-only)

**Type Erasure:**
Generics are a compile-time feature only. At runtime, List<String> and List<Integer> are both just List. Type information is erased. This is why you cannot do: new T() or T.class.

**PECS Rule (Producer Extends, Consumer Super):**
- Use \`<? extends T>\` when you read from a collection (producer)
- Use \`<? super T>\` when you write to a collection (consumer)`,
  whyWeNeedIt: `Before generics (Java 1.4):
\`\`\`java
List names = new ArrayList();
names.add("Alice");
names.add(42);  // accidentally added wrong type!
String name = (String) names.get(0);  // cast required
String bad = (String) names.get(1);   // ClassCastException at runtime!
\`\`\`

With generics:
\`\`\`java
List<String> names = new ArrayList<>();
names.add("Alice");
names.add(42);  // COMPILE ERROR — caught at compile time!
String name = names.get(0);  // no cast needed
\`\`\`

Generics move type errors from runtime to compile time — much better.`,
  realWorldUsage: `Generics are everywhere in enterprise Java:

- All collections: List<Order>, Map<String, User>, Set<Permission>
- Repository pattern: Repository<T, ID>
- Service responses: ApiResponse<T>
- Result types: Optional<T>, CompletableFuture<T>
- Spring's ResponseEntity<T>, Page<T>`,
  howItWorks: `**Type Erasure in Detail:**
The compiler replaces generic types with their bounds (or Object if unbounded):
\`\`\`java
// Source code
List<String> list = new ArrayList<>();
list.add("hello");
String s = list.get(0);

// After erasure (what JVM sees)
List list = new ArrayList();
list.add("hello");
String s = (String) list.get(0);  // compiler inserts cast
\`\`\`

This is why:
- Cannot create generic arrays: new T[10] is illegal
- Cannot use instanceof with generics: list instanceof List<String> is illegal
- Cannot get the generic type at runtime without passing Class<T>`,
  example: {
    title: 'Generics in Enterprise Code',
    description: 'Practical generic patterns for reusable, type-safe enterprise components.',
    code: [
      {
        label: 'Generic Repository Pattern',
        language: 'java',
        code: `// Generic base repository — reusable for any entity
public interface Repository<T, ID> {
    Optional<T> findById(ID id);
    List<T> findAll();
    T save(T entity);
    void deleteById(ID id);
    boolean existsById(ID id);
}

// Concrete implementation
public class UserRepository implements Repository<User, Long> {
    @Override
    public Optional<User> findById(Long id) {
        return db.query("SELECT * FROM users WHERE id = ?", id)
                 .map(this::mapToUser)
                 .findFirst();
    }
    // ... other methods
}

// Generic API response wrapper
public class ApiResponse<T> {
    private final T data;
    private final String message;
    private final boolean success;
    
    private ApiResponse(T data, String message, boolean success) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(data, "OK", true);
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(null, message, false);
    }
    
    // Getters
    public T getData() { return data; }
    public String getMessage() { return message; }
    public boolean isSuccess() { return success; }
}

// Usage
ApiResponse<User> response = ApiResponse.success(user);
ApiResponse<List<Order>> listResponse = ApiResponse.success(orders);`,
      },
      {
        label: 'Wildcards and Bounded Types',
        language: 'java',
        code: `// Bounded type parameter: T must be Comparable
public <T extends Comparable<T>> T findMax(List<T> list) {
    if (list.isEmpty()) throw new IllegalArgumentException("Empty list");
    T max = list.get(0);
    for (T item : list) {
        if (item.compareTo(max) > 0) max = item;
    }
    return max;
}

// Works with any Comparable type
String maxName = findMax(List.of("Charlie", "Alice", "Bob"));  // Charlie
Integer maxNum = findMax(List.of(3, 1, 4, 1, 5, 9, 2, 6));   // 9

// PECS: Producer Extends, Consumer Super
// <? extends T>: can read T from it (producer)
public double sumNumbers(List<? extends Number> numbers) {
    return numbers.stream().mapToDouble(Number::doubleValue).sum();
}
sumNumbers(List.of(1, 2, 3));       // List<Integer> works
sumNumbers(List.of(1.5, 2.5));      // List<Double> works

// <? super T>: can write T into it (consumer)
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}
List<Number> numbers = new ArrayList<>();
addNumbers(numbers);  // works: Integer is a Number

// Type token pattern: pass Class<T> to get type at runtime
public <T> T fromJson(String json, Class<T> type) {
    return objectMapper.readValue(json, type);
}
User user = fromJson(jsonString, User.class);
Order order = fromJson(jsonString, Order.class);`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why can I not create a generic array (new T[])?',
      answer: 'Due to type erasure, T is not known at runtime. Arrays require the actual type at creation time (the JVM needs to know what type to store for array covariance checking). Since T is erased to Object at runtime, new T[] would create an Object[] which could cause heap pollution. Use List<T> instead of T[] in generic code.',
    },
    {
      question: 'What is the difference between <T extends Animal> and <? extends Animal>?',
      answer: '<T extends Animal> is a bounded type parameter — T is a named type variable you can use throughout the method signature and body. <? extends Animal> is a wildcard — you cannot name the specific type, and you cannot add elements to a List<? extends Animal> (because the compiler does not know the exact type). Use T when you need to reference the type multiple times; use ? when you only need to read.',
    },
  ],
  productionIssues: [
    'Raw types in legacy code — using List instead of List<T> disables type checking. The compiler warns about this. Gradually add type parameters when maintaining legacy code.',
    'Unchecked cast warnings — casting to generic types (List<String>) is unchecked because of erasure. Suppress with @SuppressWarnings("unchecked") only when you are certain it is safe.',
  ],
  bestPractices: [
    'Always use generic types — never use raw types like List, Map.',
    'Apply PECS: <? extends T> for reading, <? super T> for writing.',
    'Use type tokens (Class<T>) when you need the type at runtime.',
    'Prefer List<T> over T[] in generic code.',
    'Use bounded type parameters (<T extends Comparable<T>>) to enable operations on T.',
  ],
  architectNote: 'Generics are the foundation of reusable enterprise components. Generic repositories, generic service interfaces, generic response wrappers — these patterns eliminate boilerplate and ensure type safety across your entire codebase. Spring Data\'s JpaRepository<T, ID> is the canonical example: one interface definition provides type-safe data access for every entity.',
  faqs: [
    {
      question: 'What is type erasure and why does Java use it?',
      answer: 'Type erasure removes generic type information at compile time, replacing it with bounds (or Object). Java chose this for backward compatibility — existing Java 1.4 bytecode (without generics) should run on Java 5+ JVMs unchanged. The downside: no runtime type information for generics. Languages like C# use reified generics (type info preserved at runtime) which avoids these limitations but required breaking backward compatibility.',
    },
  ],
  keyTakeaways: [
    'Generics provide compile-time type safety — move ClassCastException from runtime to compile time',
    'Type erasure: generic types are erased at runtime; List<String> becomes List',
    'Bounded types: <T extends Comparable<T>> restricts what T can be',
    'PECS: <? extends T> for reading; <? super T> for writing',
    'Cannot create generic arrays (new T[]) — use List<T> instead',
    'Use type tokens (Class<T>) when you need the type at runtime',
  ],
  relatedTopics: ['java-collections-list', 'java-collections-map', 'java-streams', 'java-abstraction'],
};

export const javaComparableComparator: TopicContent = {
  slug: 'java-comparable-comparator',
  title: 'Comparable vs Comparator',
  description: 'How to sort objects in Java — Comparable for natural ordering, Comparator for custom ordering, and the modern Comparator API.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Comparable defines the natural ordering of a class (how objects of that class sort by default). Comparator defines an external ordering (how to sort objects by a specific criterion). Use Comparable when there is one obvious natural order (String alphabetical, Integer numeric). Use Comparator when you need multiple sort orders or sorting of classes you do not own.',
  whatIsIt: `**Comparable<T>:**
\`\`\`java
public interface Comparable<T> {
    int compareTo(T other);
    // Returns: negative if this < other, 0 if equal, positive if this > other
}
\`\`\`
- Implemented by the class itself
- Defines the "natural ordering"
- Used by: Collections.sort(), Arrays.sort(), TreeSet, TreeMap
- Examples: String (alphabetical), Integer (numeric), LocalDate (chronological)

**Comparator<T>:**
\`\`\`java
@FunctionalInterface
public interface Comparator<T> {
    int compare(T o1, T o2);
}
\`\`\`
- External to the class — can be defined anywhere
- Defines a specific ordering for a specific purpose
- Multiple Comparators can exist for the same class
- Java 8+ has a rich Comparator factory API

**Comparator Factory Methods (Java 8+):**
- \`Comparator.comparing(keyExtractor)\`
- \`Comparator.comparingInt/Long/Double(keyExtractor)\`
- \`comparator.reversed()\`
- \`comparator.thenComparing(keyExtractor)\`
- \`Comparator.naturalOrder() / reverseOrder()\`
- \`Comparator.nullsFirst() / nullsLast()\``,
  whyWeNeedIt: `Sorting is fundamental in enterprise applications:

- Sort orders by date, amount, status
- Sort users by name, email, registration date
- Sort products by price, rating, name
- Sort search results by relevance
- Display data in user-specified order

Comparable gives a class its default sort order. Comparator gives you flexibility to sort the same data in different ways without modifying the class.`,
  realWorldUsage: `Common patterns:

\`\`\`java
// Sort orders by date (most recent first), then by amount (largest first)
orders.sort(Comparator
    .comparing(Order::getCreatedAt).reversed()
    .thenComparing(Order::getTotalAmount, Comparator.reverseOrder()));

// TreeMap with custom key ordering
TreeMap<String, User> usersByName = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);

// Sort with null safety
employees.sort(Comparator
    .comparing(Employee::getDepartment, Comparator.nullsLast(Comparator.naturalOrder()))
    .thenComparing(Employee::getName));
\`\`\``,
  howItWorks: `**compareTo() contract:**
- \`a.compareTo(b) < 0\` means a < b
- \`a.compareTo(b) == 0\` means a == b (should be consistent with equals())
- \`a.compareTo(b) > 0\` means a > b
- Must be antisymmetric: if a < b then b > a
- Must be transitive: if a < b and b < c then a < c

**Consistency with equals:**
\`(a.compareTo(b) == 0) == a.equals(b)\` should hold (not required but strongly recommended). Violating this causes confusing behavior in sorted collections.`,
  example: {
    title: 'Sorting in Enterprise Code',
    description: 'Implementing Comparable and using the Comparator API for flexible sorting.',
    code: [
      {
        label: 'Comparable Implementation',
        language: 'java',
        code: `// Implementing Comparable for natural ordering
public class Money implements Comparable<Money> {
    private final BigDecimal amount;
    private final String currency;
    
    public Money(BigDecimal amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }
    
    @Override
    public int compareTo(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException(
                "Cannot compare different currencies: " + currency + " vs " + other.currency
            );
        }
        return this.amount.compareTo(other.amount);
    }
    
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Money other)) return false;
        return this.amount.compareTo(other.amount) == 0  // consistent with compareTo!
            && this.currency.equals(other.currency);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(amount.stripTrailingZeros(), currency);
    }
}

// Now Money works naturally with sorted collections
TreeSet<Money> prices = new TreeSet<>();
prices.add(new Money(new BigDecimal("29.99"), "USD"));
prices.add(new Money(new BigDecimal("9.99"), "USD"));
prices.add(new Money(new BigDecimal("49.99"), "USD"));
// Automatically sorted: [9.99, 29.99, 49.99]`,
      },
      {
        label: 'Comparator API (Java 8+)',
        language: 'java',
        code: `List<Employee> employees = employeeRepository.findAll();

// Simple sort by name
employees.sort(Comparator.comparing(Employee::getName));

// Reverse sort by salary
employees.sort(Comparator.comparing(Employee::getSalary).reversed());

// Multi-level sort: department ASC, salary DESC, name ASC
employees.sort(Comparator
    .comparing(Employee::getDepartment)
    .thenComparing(Comparator.comparing(Employee::getSalary).reversed())
    .thenComparing(Employee::getName));

// Null-safe sort (employees without department go last)
employees.sort(Comparator.comparing(
    Employee::getDepartment,
    Comparator.nullsLast(Comparator.naturalOrder())
));

// Sort by computed value
employees.sort(Comparator.comparingInt(emp -> emp.getName().length()));

// Store comparators for reuse
Comparator<Employee> BY_SALARY_DESC = Comparator
    .comparing(Employee::getSalary)
    .reversed();
    
Comparator<Employee> BY_DEPT_THEN_NAME = Comparator
    .comparing(Employee::getDepartment)
    .thenComparing(Employee::getName);

// Use in TreeSet for sorted set
TreeSet<Employee> sortedByName = new TreeSet<>(
    Comparator.comparing(Employee::getName)
);

// Use in stream
List<Employee> topEarners = employees.stream()
    .sorted(BY_SALARY_DESC)
    .limit(10)
    .collect(Collectors.toList());`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What does compareTo() return and what does it mean?',
      answer: 'compareTo() returns a negative integer (this < other), zero (this == other), or a positive integer (this > other). The exact value does not matter — only the sign. A common implementation: return Integer.compare(this.value, other.value) or this.value - other.value (but subtraction can overflow for large integers — use Integer.compare() instead).',
    },
    {
      question: 'Can I use Comparator.comparing() with methods that return primitives?',
      answer: 'Yes, but use the primitive-specialized versions to avoid boxing: Comparator.comparingInt() for int, comparingLong() for long, comparingDouble() for double. These are faster because they avoid boxing the primitive to Integer/Long/Double for comparison.',
    },
  ],
  productionIssues: [
    'Integer overflow in compareTo — using return a - b for integer comparison can overflow (Integer.MIN_VALUE - 1 wraps around). Always use Integer.compare(a, b) or a.compareTo(b).',
    'Inconsistent compareTo and equals — if compareTo says two objects are equal but equals says they are not, TreeSet and TreeMap will behave unexpectedly (they use compareTo, not equals, for membership).',
  ],
  bestPractices: [
    'Use Comparator.comparing() factory methods instead of writing raw comparators.',
    'Use Integer.compare(), Long.compare() instead of subtraction to avoid overflow.',
    'Keep compareTo() consistent with equals() — (a.compareTo(b) == 0) should equal a.equals(b).',
    'Store complex Comparators as named constants for reuse.',
    'Use nullsFirst() or nullsLast() when sorting data that may contain nulls.',
  ],
  architectNote: 'In enterprise applications, sorting is often best done at the database level (ORDER BY in SQL) rather than in Java. Java-side sorting is appropriate for: in-memory data that is already loaded, complex multi-level sorts that are awkward in SQL, sorting after filtering/transformation, and when the sort order changes based on user input. Always profile whether database-side or Java-side sorting is more efficient for your use case.',
  faqs: [
    {
      question: 'What is the difference between Comparator.comparing() and Comparator.comparingInt()?',
      answer: 'Comparator.comparing() takes a Function<T, Comparable> and boxes the result. Comparator.comparingInt() takes a ToIntFunction<T> and works with primitive int directly, avoiding boxing. For performance-critical sorting of large datasets, use the primitive-specialized versions. For typical business code, the difference is negligible.',
    },
  ],
  keyTakeaways: [
    'Comparable: natural ordering implemented by the class itself',
    'Comparator: external ordering, multiple comparators possible per class',
    'Use Comparator.comparing() factory methods for clean, readable sort code',
    'compareTo() returns negative/zero/positive — use Integer.compare() not subtraction',
    'Keep compareTo() consistent with equals() to avoid sorted collection surprises',
    'Use thenComparing() for multi-level sorts; reversed() to flip order',
  ],
  relatedTopics: ['java-collections-list', 'java-collections-set', 'java-generics', 'java-streams'],
};

export const javaSerialization: TopicContent = {
  slug: 'java-serialization',
  title: 'Serialization',
  description: 'Java serialization — converting objects to bytes and back, when to use it, when to avoid it, and modern alternatives.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Serialization converts a Java object to a byte stream (for storage or transmission). Deserialization converts it back. Java has built-in serialization (implements Serializable) but it is slow, fragile, and has security vulnerabilities. Modern alternatives: JSON (Jackson), Protobuf, and Avro are preferred for most use cases.',
  whatIsIt: `**Java Built-in Serialization:**
- Implement \`java.io.Serializable\` (marker interface)
- Use \`ObjectOutputStream\` to serialize, \`ObjectInputStream\` to deserialize
- \`serialVersionUID\` — version ID for compatibility checking
- \`transient\` — exclude fields from serialization
- \`readObject/writeObject\` — customize serialization behavior

**What gets serialized:**
- All non-transient, non-static instance fields
- Recursively: all referenced objects (must also be Serializable)

**Externalizable:**
- More control: you implement readExternal/writeExternal
- Faster than default serialization
- Requires a no-arg constructor

**Modern Alternatives:**
- **JSON** (Jackson, Gson) — human-readable, language-neutral, widely supported
- **Protobuf** — binary, fast, schema-based, language-neutral
- **Avro** — schema-based, great for Kafka
- **Kryo** — fast Java binary serialization (not language-neutral)
- **Records** — immutable data classes, serialize well with Jackson`,
  whyWeNeedIt: `Serialization is needed for:

- **Persistence** — save objects to disk (session state, caches)
- **Network transmission** — send objects over the network (RMI, Kafka, Redis)
- **Caching** — store objects in distributed caches (Redis, Hazelcast)
- **Deep copy** — serialize and deserialize to create a deep copy

However, Java's built-in serialization has serious problems: security vulnerabilities (deserialization attacks), tight coupling to class structure, poor performance. Use JSON or Protobuf instead.`,
  realWorldUsage: `In enterprise Java:

- **REST APIs** — Jackson for JSON serialization/deserialization
- **Kafka** — Avro or JSON for message serialization
- **Redis cache** — JSON serialization via Spring Data Redis
- **HTTP sessions** — built-in serialization (if distributed session storage)
- **JPA** — not serialization; JPA maps objects to SQL directly`,
  howItWorks: `**Built-in serialization process:**
1. ObjectOutputStream writes class descriptor (class name, serialVersionUID, field names/types)
2. Writes field values recursively
3. On deserialization: checks serialVersionUID matches, recreates object without calling constructor

**serialVersionUID:**
If not declared, Java generates one from the class structure. Any change to the class (add/remove field) changes the auto-generated UID, breaking deserialization of old data. Always declare it explicitly.

**Security issue:**
Deserializing untrusted data can execute arbitrary code (gadget chains). Never deserialize data from untrusted sources with Java built-in serialization.`,
  example: {
    title: 'Serialization Patterns',
    description: 'When to use built-in serialization and modern alternatives.',
    code: [
      {
        label: 'Built-in Serialization',
        language: 'java',
        code: `// Basic Serializable class
public class UserSession implements Serializable {
    private static final long serialVersionUID = 1L;  // always declare!
    
    private final String userId;
    private final String email;
    private final Set<String> roles;
    private final LocalDateTime loginTime;
    
    // transient: excluded from serialization
    private transient String cachedToken;  // computed, not stored
    private transient Logger logger;        // not serializable anyway
    
    public UserSession(String userId, String email, Set<String> roles) {
        this.userId = userId;
        this.email = email;
        this.roles = new HashSet<>(roles);
        this.loginTime = LocalDateTime.now();
    }
    
    // Custom deserialization to reinitialize transient fields
    private void readObject(ObjectInputStream in) 
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();  // deserialize normal fields
        this.logger = LoggerFactory.getLogger(UserSession.class);  // reinit transient
    }
}

// Serialize to bytes
public byte[] serialize(UserSession session) throws IOException {
    try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
         ObjectOutputStream oos = new ObjectOutputStream(baos)) {
        oos.writeObject(session);
        return baos.toByteArray();
    }
}

// Deserialize from bytes
public UserSession deserialize(byte[] bytes) 
        throws IOException, ClassNotFoundException {
    try (ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
         ObjectInputStream ois = new ObjectInputStream(bais)) {
        return (UserSession) ois.readObject();
    }
}`,
      },
      {
        label: 'Modern Alternative: Jackson JSON',
        language: 'java',
        code: `// Jackson — the standard for JSON serialization in enterprise Java
@JsonIgnoreProperties(unknownFields = true)  // forward compatibility
public class UserDto {
    private Long id;
    private String name;
    private String email;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    
    @JsonIgnore  // never serialize this field
    private String passwordHash;
    
    @JsonProperty("full_name")  // serialize as "full_name" not "fullName"
    private String fullName;
    
    // Jackson needs no-arg constructor for deserialization
    public UserDto() {}
    
    // Getters and setters...
}

// ObjectMapper — thread-safe, create once and reuse
ObjectMapper mapper = new ObjectMapper()
    .registerModule(new JavaTimeModule())  // for Java 8 date/time
    .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

// Serialize to JSON string
String json = mapper.writeValueAsString(userDto);
// {"id":1,"name":"Alice","email":"alice@example.com","full_name":"Alice Smith"}

// Deserialize from JSON string
UserDto user = mapper.readValue(json, UserDto.class);

// Serialize list
String jsonList = mapper.writeValueAsString(List.of(user1, user2));

// Deserialize list
List<UserDto> users = mapper.readValue(jsonList, 
    new TypeReference<List<UserDto>>() {});

// With Records (Java 16+) — Jackson works great
record ProductDto(Long id, String name, BigDecimal price) {}
String json = mapper.writeValueAsString(new ProductDto(1L, "Laptop", new BigDecimal("999.99")));`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use Java built-in serialization or JSON?',
      answer: 'JSON (Jackson) for almost all cases: REST APIs, Kafka messages, Redis cache, inter-service communication. Java built-in serialization only for: HTTP session replication (if you must use Java sessions), Java RMI (legacy), or specific frameworks that require it. Built-in serialization is faster for pure Java-to-Java, but JSON is safer, more maintainable, and language-neutral.',
    },
    {
      question: 'What happens if I change a Serializable class?',
      answer: 'If serialVersionUID is not declared, Java auto-generates it from the class structure. Adding or removing fields changes the auto-generated UID, causing InvalidClassException when deserializing old data. Always declare serialVersionUID = 1L (or a meaningful version). Adding new fields with defaults is backward-compatible. Removing fields means old data for those fields is silently dropped.',
    },
  ],
  productionIssues: [
    'Deserialization of untrusted data — Java built-in deserialization can execute arbitrary code via gadget chains. Never deserialize untrusted data. Use ObjectInputFilter (Java 9+) to whitelist allowed classes.',
    'serialVersionUID mismatch — changing a Serializable class without updating serialVersionUID breaks deserialization of cached data. Plan version migrations.',
    'Non-serializable fields causing NotSerializableException — all referenced objects must also be Serializable, or marked transient.',
  ],
  bestPractices: [
    'Use Jackson/JSON instead of built-in serialization for new code.',
    'Always declare serialVersionUID explicitly in Serializable classes.',
    'Mark non-serializable fields as transient.',
    'Never deserialize data from untrusted sources with built-in serialization.',
    'Use @JsonIgnoreProperties(ignoreUnknown=true) for forward compatibility.',
    'Create ObjectMapper once and reuse — it is thread-safe and expensive to create.',
  ],
  architectNote: 'For microservices communication, standardize on a serialization format early. JSON is the most common (human-readable, widely supported). Protobuf or Avro are better for high-throughput systems (smaller payload, faster parsing, schema evolution). Once you choose, changing is painful — all services must agree on the format. For Kafka-based architectures, Avro with Schema Registry is the enterprise standard.',
  faqs: [
    {
      question: 'What is the difference between Serializable and Externalizable?',
      answer: 'Serializable uses default serialization (all non-transient fields). Externalizable gives full control — you implement readExternal() and writeExternal() to serialize exactly what you want. Externalizable is faster (no reflection overhead) but requires more code. Also, Externalizable requires a public no-arg constructor (for deserialization), while Serializable does not call constructors.',
    },
  ],
  keyTakeaways: [
    'Java built-in serialization: implements Serializable, uses ObjectOutputStream/InputStream',
    'Always declare serialVersionUID explicitly',
    'Mark non-serializable fields as transient',
    'Never deserialize untrusted data with built-in serialization (security risk)',
    'For new code, use Jackson JSON — safer, more maintainable, language-neutral',
    'Create ObjectMapper once and reuse — it is thread-safe',
  ],
  relatedTopics: ['java-classes-objects', 'java-generics', 'java-file-api', 'java-exception-trycatch'],
};

export const javaReflection: TopicContent = {
  slug: 'java-reflection',
  title: 'Reflection',
  description: 'Java Reflection API — inspecting and manipulating classes at runtime, how frameworks use it, and why to use it sparingly.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Reflection lets you inspect and manipulate Java classes, methods, and fields at runtime — even private ones. It is how Spring\'s dependency injection, JPA, Jackson, and JUnit work internally. As an application developer, you rarely write reflection code directly, but understanding it helps you understand how frameworks work and debug annotation-driven magic.',
  whatIsIt: `**Core Reflection Classes:**
- \`Class<T>\` — represents a class; get with \`obj.getClass()\` or \`MyClass.class\`
- \`Method\` — represents a method; invoke with \`method.invoke(target, args)\`
- \`Field\` — represents a field; get/set with \`field.get(obj)\` / \`field.set(obj, value)\`
- \`Constructor<T>\` — represents a constructor; create with \`constructor.newInstance(args)\`
- \`Annotation\` — represents an annotation; read with \`element.getAnnotation(type)\`

**Getting Class Information:**
\`\`\`java
Class<?> clazz = String.class;
clazz.getName()                // "java.lang.String"
clazz.getSimpleName()          // "String"
clazz.getDeclaredFields()      // all fields (including private)
clazz.getFields()              // only public fields (including inherited)
clazz.getDeclaredMethods()     // all methods (including private)
clazz.getMethods()             // only public methods (including inherited)
clazz.getDeclaredAnnotations() // annotations on this class
clazz.getSuperclass()          // parent class
clazz.getInterfaces()          // implemented interfaces
\`\`\`

**Java 9+ Module System:**
Reflection on non-exported packages requires: \`--add-opens module/package=ALL-UNNAMED\` or explicit module configuration. Frameworks are adapting to this.`,
  whyWeNeedIt: `Reflection enables generic frameworks:

- **Spring DI** — scans classpath for @Component, injects @Autowired fields
- **JPA/Hibernate** — maps @Entity fields to database columns
- **Jackson** — serializes/deserializes by reading field names and types
- **JUnit** — finds @Test methods and invokes them
- **Lombok** — generates code based on annotations (at compile time, not reflection)

Without reflection, these frameworks would require explicit configuration for every class — defeating their purpose.`,
  realWorldUsage: `As an application developer, you use reflection indirectly:

- When Spring injects @Autowired dependencies
- When Jackson serializes your @JsonProperty fields
- When JPA maps your @Column fields to SQL
- When you write custom annotation processors

You write reflection code directly for: custom frameworks, testing utilities, serialization libraries, and AOP implementations.`,
  howItWorks: `**Reflection Performance:**
Reflection is slower than direct code because:
- Method lookup requires searching the class hierarchy
- Type checking is done at runtime, not compile time
- JIT optimization is limited for reflective calls

Mitigation:
- Cache Method/Field objects after first lookup
- Use MethodHandles (Java 7+) — faster than reflection for repeated calls
- Use invokedynamic — how lambdas are implemented

**Access Control:**
\`field.setAccessible(true)\` bypasses private/protected access modifiers. This is how Spring injects @Autowired private fields. In Java 9+, this requires module system permissions.`,
  example: {
    title: 'Reflection in Practice',
    description: 'How reflection powers framework features and how to use it safely.',
    code: [
      {
        label: 'Reflection Basics',
        language: 'java',
        code: `// Inspect a class at runtime
Class<?> clazz = Employee.class;

// Get all declared fields (including private)
for (Field field : clazz.getDeclaredFields()) {
    System.out.printf("Field: %s %s%n", 
        field.getType().getSimpleName(), field.getName());
}

// Read a private field value
Employee emp = new Employee(1L, "Alice", "Engineering");
Field nameField = Employee.class.getDeclaredField("name");
nameField.setAccessible(true);  // bypass private access
String name = (String) nameField.get(emp);
System.out.println(name);  // Alice

// Invoke a private method
Method method = Employee.class.getDeclaredMethod("calculateBonus", BigDecimal.class);
method.setAccessible(true);
BigDecimal bonus = (BigDecimal) method.invoke(emp, new BigDecimal("100000"));

// Create instance dynamically
Class<?> serviceClass = Class.forName("com.example.OrderService");
Constructor<?> constructor = serviceClass.getDeclaredConstructor();
Object service = constructor.newInstance();

// Read annotations
for (Method m : clazz.getDeclaredMethods()) {
    if (m.isAnnotationPresent(Deprecated.class)) {
        System.out.println("Deprecated method: " + m.getName());
    }
}`,
      },
      {
        label: 'Custom Annotation Processor',
        language: 'java',
        code: `// Custom annotation
@Retention(RetentionPolicy.RUNTIME)  // available at runtime
@Target(ElementType.FIELD)
public @interface Validate {
    int minLength() default 0;
    int maxLength() default Integer.MAX_VALUE;
    boolean required() default true;
}

// Entity with annotations
public class CreateUserRequest {
    @Validate(required = true, minLength = 2, maxLength = 50)
    private String name;
    
    @Validate(required = true, minLength = 5)
    private String email;
    
    @Validate(required = false)
    private String phone;
}

// Reflection-based validator
public class AnnotationValidator {
    public List<String> validate(Object obj) {
        List<String> errors = new ArrayList<>();
        Class<?> clazz = obj.getClass();
        
        for (Field field : clazz.getDeclaredFields()) {
            Validate annotation = field.getAnnotation(Validate.class);
            if (annotation == null) continue;
            
            field.setAccessible(true);
            try {
                Object value = field.get(obj);
                String fieldName = field.getName();
                
                if (annotation.required() && (value == null || value.toString().isBlank())) {
                    errors.add(fieldName + " is required");
                    continue;
                }
                
                if (value instanceof String str) {
                    if (str.length() < annotation.minLength()) {
                        errors.add(fieldName + " must be at least " + 
                            annotation.minLength() + " characters");
                    }
                    if (str.length() > annotation.maxLength()) {
                        errors.add(fieldName + " must not exceed " + 
                            annotation.maxLength() + " characters");
                    }
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Reflection access failed for field: " + field.getName(), e);
            }
        }
        return errors;
    }
}

// Usage
CreateUserRequest req = new CreateUserRequest();
req.setName("A");  // too short
req.setEmail("");  // required but empty

List<String> errors = new AnnotationValidator().validate(req);
// ["name must be at least 2 characters", "email is required"]`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is reflection slow? Should I avoid it?',
      answer: 'Reflection is slower than direct code — typically 10-100x for method invocation. However, this matters only in hot paths (called millions of times per second). Framework initialization (Spring startup) uses reflection but only runs once. Jackson serializes millions of objects but caches the reflection metadata. In application code, reflection is fine if you cache Method/Field objects. Never use reflection in tight loops.',
    },
    {
      question: 'What is the difference between getFields() and getDeclaredFields()?',
      answer: 'getDeclaredFields() returns all fields declared in this class (including private, protected, package-private) but NOT inherited fields. getFields() returns all public fields of this class AND all public inherited fields. For accessing private fields, use getDeclaredFields() + setAccessible(true). For a complete picture of all fields including inherited, iterate up the class hierarchy using getSuperclass().',
    },
  ],
  productionIssues: [
    'Performance in tight loops — calling method.invoke() in a loop processing millions of records is slow. Cache Method objects; consider MethodHandles for better JIT optimization.',
    'Java 9+ module system breaking reflection — accessing non-exported packages throws InaccessibleObjectException. Requires --add-opens or module configuration.',
    'Security manager restrictions — in some environments (application servers, security-hardened JVMs), setAccessible(true) may be denied.',
  ],
  bestPractices: [
    'Cache Method, Field, and Constructor objects — lookup is expensive; invocation is cheaper.',
    'Use MethodHandles instead of Method.invoke() for performance-critical reflection.',
    'Prefer annotation processors (compile-time) over runtime reflection when possible.',
    'Do not use reflection in application business logic — use it only for framework/infrastructure code.',
    'Handle InaccessibleObjectException gracefully for Java 9+ module compatibility.',
  ],
  architectNote: 'Modern Java frameworks are moving away from runtime reflection toward compile-time code generation (Lombok, MapStruct, Quarkus, Micronaut). Compile-time approaches: faster startup (no classpath scanning), better GraalVM Native Image compatibility, and better IDE support. Spring Boot 3+ supports AOT (Ahead-Of-Time) compilation which pre-processes reflection at build time for faster startup and native image support.',
  faqs: [
    {
      question: 'What is the difference between Reflection and MethodHandles?',
      answer: 'MethodHandles (java.lang.invoke.MethodHandle) is a more modern, faster alternative to reflection for method invocation. MethodHandles are directly invokable and the JIT can inline them (unlike Method.invoke() which is harder to optimize). Use MethodHandles when you need high-performance dynamic dispatch. The Lookup API also respects module system access controls more cleanly than setAccessible().',
    },
    {
      question: 'How do annotation processors differ from reflection?',
      answer: 'Annotation processors run at compile time (javac plugin) and generate source code. Reflection runs at runtime and inspects existing code. Annotation processors are faster (no runtime overhead), work with GraalVM Native Image, and produce code that IDEs understand. Lombok, MapStruct, and Micronaut use annotation processors. Spring (traditionally) uses runtime reflection, but Spring Boot 3+ AOT mode shifts to compile-time processing.',
    },
  ],
  keyTakeaways: [
    'Reflection inspects and manipulates classes, methods, and fields at runtime',
    'getDeclaredFields(): all fields in this class; getFields(): all public fields including inherited',
    'setAccessible(true) bypasses access modifiers — use carefully, Java 9+ has restrictions',
    'Cache Method/Field objects — lookup is expensive, invocation is cheaper',
    'Frameworks (Spring, Jackson, JPA) use reflection internally — you rarely write it directly',
    'Prefer compile-time annotation processing over runtime reflection for new frameworks',
  ],
  relatedTopics: ['java-classes-objects', 'java-generics', 'java-abstraction', 'java-serialization'],
};
