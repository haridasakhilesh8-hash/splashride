import type { TopicContent } from '../types';

export const javaCollectionsList: TopicContent = {
  slug: 'java-collections-list',
  title: 'List',
  description: 'The List interface — ordered, indexed, allows duplicates. When to use ArrayList vs LinkedList, and the patterns senior developers rely on.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A List is an ordered collection that allows duplicates and provides index-based access. ArrayList (backed by an array) is the default choice for 95% of use cases. LinkedList is only better when you frequently insert/delete at the beginning or middle. Use List.of() for immutable lists.',
  whatIsIt: `**List Interface**
java.util.List extends Collection and adds:
- get(int index) — access by position
- set(int index, E element) — replace at position
- add(int index, E element) — insert at position
- remove(int index) — remove at position
- indexOf(Object o) — find first occurrence
- subList(int from, int to) — view of a portion
- listIterator() — bidirectional iteration

**Key Implementations:**
- **ArrayList** — resizable array; O(1) random access; O(n) insert/delete in middle
- **LinkedList** — doubly-linked list; O(n) random access; O(1) insert/delete at known position; also implements Deque
- **Vector** — legacy synchronized ArrayList; avoid in new code
- **CopyOnWriteArrayList** — thread-safe; creates copy on every write; best for read-heavy concurrent access
- **List.of()** — immutable list (Java 9+); throws UnsupportedOperationException on modification
- **Arrays.asList()** — fixed-size list backed by array; allows set() but not add/remove`,
  whyWeNeedIt: `Lists solve ordered collection needs:

- **Ordered data** — results from a database query, items in a shopping cart, steps in a workflow
- **Index access** — pagination (get items 20-40), random sampling
- **Duplicates allowed** — unlike Set, List allows the same element multiple times
- **Iteration order guaranteed** — elements always come out in insertion order

In enterprise Java, List is the most commonly used collection type — most service methods return List<SomeEntity>.`,
  realWorldUsage: `Common patterns in enterprise code:

\`\`\`java
// Service returns List
public List<Order> getOrdersByCustomer(String customerId) {
    return orderRepository.findByCustomerId(customerId);
}

// Immutable list for constants
private static final List<String> VALID_CURRENCIES = List.of("USD", "EUR", "GBP");

// Defensive copy to prevent external modification
public List<LineItem> getLineItems() {
    return Collections.unmodifiableList(lineItems);
}

// Sorting
orders.sort(Comparator.comparing(Order::getCreatedAt).reversed());
\`\`\``,
  howItWorks: `**ArrayList Internals:**
- Backed by an Object[] array
- Initial capacity: 10
- When full, creates new array 1.5x the size and copies elements
- This resize is O(n) but happens rarely — amortized O(1) add
- Random access: O(1) — direct array index
- Insert/delete in middle: O(n) — must shift elements

**LinkedList Internals:**
- Each element is a Node with prev and next pointers
- No array — no resizing
- Random access: O(n) — must traverse from head
- Insert/delete at known position: O(1) — just update pointers
- Higher memory overhead: each node has two extra references`,
  example: {
    title: 'List Patterns in Enterprise Code',
    description: 'The List operations you use in every Java project.',
    code: [
      {
        label: 'Core List Operations',
        language: 'java',
        code: `// Creating lists
List<String> mutable = new ArrayList<>();          // empty, can add/remove
List<String> fromArray = new ArrayList<>(Arrays.asList("a", "b", "c"));
List<String> immutable = List.of("a", "b", "c");  // Java 9+, cannot modify
List<String> copy = new ArrayList<>(immutable);    // mutable copy of immutable

// Basic operations
mutable.add("hello");
mutable.add(0, "first");          // insert at index 0
mutable.set(1, "updated");        // replace at index 1
mutable.remove(0);                // remove by index
mutable.remove("hello");          // remove by value (first occurrence)
String item = mutable.get(0);     // O(1) for ArrayList
boolean has = mutable.contains("hello");
int idx = mutable.indexOf("hello");

// Bulk operations
mutable.addAll(List.of("x", "y", "z"));
mutable.removeAll(List.of("x", "y"));
mutable.retainAll(List.of("z", "hello"));  // keep only these

// Iteration
for (String s : mutable) { System.out.println(s); }
mutable.forEach(System.out::println);
mutable.stream().filter(s -> s.length() > 3).forEach(System.out::println);

// Sorting
List<Integer> numbers = new ArrayList<>(List.of(3, 1, 4, 1, 5, 9));
Collections.sort(numbers);                          // natural order
numbers.sort(Comparator.reverseOrder());            // reverse
numbers.sort(Comparator.comparingInt(Math::abs));   // by absolute value

// Sublist (view — changes affect original!)
List<Integer> sub = numbers.subList(1, 4);  // elements 1, 2, 3 (not 4)`,
      },
      {
        label: 'Enterprise Patterns',
        language: 'java',
        code: `// Pattern 1: Pagination
public Page<Product> getProducts(int page, int size) {
    List<Product> allProducts = productRepository.findAll();
    int from = page * size;
    int to = Math.min(from + size, allProducts.size());
    if (from > allProducts.size()) return Page.empty();
    return new Page<>(allProducts.subList(from, to), allProducts.size());
}

// Pattern 2: Batch processing
public void processInBatches(List<Order> orders, int batchSize) {
    for (int i = 0; i < orders.size(); i += batchSize) {
        int end = Math.min(i + batchSize, orders.size());
        List<Order> batch = orders.subList(i, end);
        processBatch(batch);
    }
}

// Pattern 3: Collecting results
public List<String> getActiveUserEmails() {
    return userRepository.findAll().stream()
        .filter(User::isActive)
        .map(User::getEmail)
        .collect(Collectors.toList());
    // Java 16+: .toList() — returns unmodifiable list
}

// Pattern 4: Safe list building
public List<ValidationError> validate(Order order) {
    List<ValidationError> errors = new ArrayList<>();
    if (order.getItems().isEmpty()) {
        errors.add(new ValidationError("items", "Order must have at least one item"));
    }
    if (order.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {
        errors.add(new ValidationError("amount", "Total must be positive"));
    }
    return Collections.unmodifiableList(errors);  // caller cannot modify
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use LinkedList instead of ArrayList?',
      answer: 'Almost never in practice. LinkedList is theoretically faster for insert/delete at the beginning, but the cache locality of ArrayList makes it faster in practice for almost all real workloads. LinkedList also uses more memory (two pointers per node). Use LinkedList only if you are implementing a queue/deque and need O(1) add/remove from both ends — and even then, ArrayDeque is usually better.',
    },
    {
      question: 'What is the difference between List.of() and Arrays.asList()?',
      answer: 'List.of() (Java 9+) returns a truly immutable list — you cannot add, remove, or set elements, and it does not allow null values. Arrays.asList() returns a fixed-size list backed by the array — you can set() elements but cannot add() or remove(). Also, Arrays.asList() allows null. Use List.of() for constants and return values you want to protect.',
    },
    {
      question: 'Does Collections.sort() modify the original list?',
      answer: 'Yes. Collections.sort() and list.sort() sort the list in-place. If you need a sorted copy without modifying the original, use: List<T> sorted = list.stream().sorted().collect(Collectors.toList()); or new ArrayList<>(list) then sort the copy.',
    },
  ],
  productionIssues: [
    'ConcurrentModificationException — modifying a list while iterating it with for-each throws this. Use Iterator.remove(), removeIf(), or collect to a new list.',
    'Returning mutable internal lists — callers can add/remove from your internal state. Return Collections.unmodifiableList() or a copy.',
    'ArrayList with known large size — if you know the list will hold 10,000 items, initialize with new ArrayList<>(10000) to avoid 10+ resize operations.',
    'Using List.subList() and then modifying the parent — subList is a view; modifying the parent list while holding a subList reference causes ConcurrentModificationException.',
  ],
  bestPractices: [
    'Use ArrayList as the default List implementation — it is the right choice for 95% of use cases.',
    'Declare variables as List<T>, not ArrayList<T> — program to the interface.',
    'Use List.of() for immutable lists (constants, return values you want to protect).',
    'Use removeIf() instead of iterating and removing — cleaner and avoids ConcurrentModificationException.',
    'Initialize ArrayList with expected capacity when size is known to avoid resizing.',
    'Use stream().toList() (Java 16+) instead of Collectors.toList() for unmodifiable results.',
  ],
  architectNote: 'In high-performance systems, avoid large in-memory lists of JPA entities. Instead of loading 10,000 Order objects into a List<Order>, use pagination (Pageable in Spring Data), streaming (Stream<Order> from JPA), or database aggregation. Loading large result sets into memory is a common cause of OOM errors in production.',
  faqs: [
    {
      question: 'Is ArrayList thread-safe?',
      answer: 'No. ArrayList is not synchronized. If multiple threads read and write concurrently, you will get ConcurrentModificationException or data corruption. Options: (1) Collections.synchronizedList(new ArrayList<>()) — synchronized wrapper, but iteration still needs external sync; (2) CopyOnWriteArrayList — thread-safe, creates a copy on every write, best for read-heavy workloads; (3) Use a concurrent queue (ConcurrentLinkedQueue) if you need concurrent add/remove.',
    },
    {
      question: 'What is the difference between remove(int index) and remove(Object o)?',
      answer: 'For List<Integer>, list.remove(1) calls remove(int index) — removes element at index 1. To remove by value, you must box: list.remove(Integer.valueOf(1)). This is a common bug. In Java 21, you can use list.removeFirst() and list.removeLast() for clarity.',
    },
  ],
  keyTakeaways: [
    'ArrayList is the default List — use it for 95% of cases',
    'ArrayList: O(1) random access, O(n) insert/delete in middle',
    'LinkedList: O(n) random access, O(1) insert/delete at known position (rarely better in practice)',
    'List.of() creates immutable lists; Arrays.asList() creates fixed-size mutable lists',
    'Declare as List<T>, not ArrayList<T> — program to the interface',
    'Never modify a list while iterating with for-each — use removeIf() or Iterator',
  ],
  relatedTopics: ['java-collections-set', 'java-collections-map', 'java-arraylist', 'java-streams'],
};

export const javaCollectionsSet: TopicContent = {
  slug: 'java-collections-set',
  title: 'Set',
  description: 'The Set interface — no duplicates, fast membership testing. HashSet, LinkedHashSet, TreeSet — when to use each.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A Set is a collection that contains no duplicate elements. Use it when you need to ensure uniqueness or test membership quickly. HashSet is the default (O(1) add/contains/remove). LinkedHashSet preserves insertion order. TreeSet keeps elements sorted. The critical requirement: elements must have correct equals() and hashCode().',
  whatIsIt: `**Set Interface**
java.util.Set extends Collection but guarantees no duplicates:
- add(E e) — adds element; returns false if already present
- contains(Object o) — O(1) for HashSet, O(log n) for TreeSet
- remove(Object o) — removes element
- No index-based access (no get(int index))

**Key Implementations:**
- **HashSet** — backed by HashMap; O(1) average add/contains/remove; no ordering guarantee
- **LinkedHashSet** — HashSet + doubly-linked list; O(1) operations; preserves insertion order
- **TreeSet** — backed by TreeMap (Red-Black tree); O(log n) operations; always sorted; elements must be Comparable or provide Comparator
- **EnumSet** — specialized for enum types; extremely fast (bitset internally)
- **Set.of()** — immutable set (Java 9+)
- **CopyOnWriteArraySet** — thread-safe; backed by CopyOnWriteArrayList`,
  whyWeNeedIt: `Sets solve uniqueness problems:

- **Deduplication** — remove duplicates from a list
- **Membership testing** — is this user in the admin set? is this email already registered?
- **Set operations** — union, intersection, difference (for business logic)
- **Tag systems** — user has tags: Set<String> tags; fast contains() check

Critical: for HashSet to work correctly, elements must implement equals() and hashCode() consistently.`,
  realWorldUsage: `Common enterprise patterns:

\`\`\`java
// Deduplication
List<String> withDups = Arrays.asList("a", "b", "a", "c", "b");
Set<String> unique = new LinkedHashSet<>(withDups);  // preserves order
List<String> deduped = new ArrayList<>(unique);

// Permission checking
Set<Permission> userPermissions = user.getPermissions();
if (userPermissions.contains(Permission.ADMIN)) { ... }

// Find common elements (intersection)
Set<String> teamA = Set.of("alice", "bob", "charlie");
Set<String> teamB = Set.of("bob", "charlie", "diana");
Set<String> both = new HashSet<>(teamA);
both.retainAll(teamB);  // {bob, charlie}
\`\`\``,
  howItWorks: `**HashSet:**
Internally a HashMap<E, PRESENT> — the element is the key. Uses hashCode() to find the bucket, then equals() to check for duplicates. Requires both to be consistent.

**TreeSet:**
Internally a TreeMap. Elements are sorted using natural ordering (Comparable) or a provided Comparator. Does NOT use equals()/hashCode() — uses compareTo() for equality. Two elements where compareTo() returns 0 are considered equal even if equals() returns false.

**Critical: equals() and hashCode() contract:**
If a.equals(b) is true, then a.hashCode() must equal b.hashCode(). If you override one, you must override both.`,
  example: {
    title: 'Set Operations in Enterprise Code',
    description: 'Practical Set usage for deduplication, membership, and set operations.',
    code: [
      {
        label: 'HashSet and LinkedHashSet',
        language: 'java',
        code: `// HashSet — fastest, no order
Set<String> permissions = new HashSet<>();
permissions.add("READ");
permissions.add("WRITE");
permissions.add("READ");  // duplicate — silently ignored
System.out.println(permissions.size());  // 2

// LinkedHashSet — preserves insertion order
Set<String> orderedTags = new LinkedHashSet<>();
orderedTags.add("java");
orderedTags.add("spring");
orderedTags.add("microservices");
orderedTags.add("java");  // duplicate ignored, order preserved
System.out.println(orderedTags);  // [java, spring, microservices]

// Deduplication preserving order
public static <T> List<T> deduplicate(List<T> list) {
    return new ArrayList<>(new LinkedHashSet<>(list));
}

// Set operations
Set<String> admins = new HashSet<>(Set.of("alice", "bob", "charlie"));
Set<String> managers = new HashSet<>(Set.of("bob", "charlie", "diana"));

// Union (all unique elements from both)
Set<String> union = new HashSet<>(admins);
union.addAll(managers);  // {alice, bob, charlie, diana}

// Intersection (elements in both)
Set<String> intersection = new HashSet<>(admins);
intersection.retainAll(managers);  // {bob, charlie}

// Difference (in admins but not managers)
Set<String> difference = new HashSet<>(admins);
difference.removeAll(managers);  // {alice}`,
      },
      {
        label: 'TreeSet and EnumSet',
        language: 'java',
        code: `// TreeSet — sorted order
Set<Integer> sorted = new TreeSet<>(Set.of(5, 2, 8, 1, 9, 3));
System.out.println(sorted);  // [1, 2, 3, 5, 8, 9]

// TreeSet with custom comparator (case-insensitive)
TreeSet<String> caseInsensitive = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
caseInsensitive.add("Banana");
caseInsensitive.add("apple");
caseInsensitive.add("BANANA");  // duplicate (case-insensitive)
System.out.println(caseInsensitive);  // [apple, Banana]

// TreeSet navigation
TreeSet<Integer> ts = new TreeSet<>(List.of(1, 3, 5, 7, 9));
System.out.println(ts.first());      // 1
System.out.println(ts.last());       // 9
System.out.println(ts.floor(6));     // 5 (largest <= 6)
System.out.println(ts.ceiling(6));   // 7 (smallest >= 6)
System.out.println(ts.headSet(5));   // [1, 3] (less than 5)
System.out.println(ts.tailSet(5));   // [5, 7, 9] (>= 5)

// EnumSet — ultra-fast for enums
enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }
EnumSet<Day> weekdays = EnumSet.range(Day.MON, Day.FRI);
EnumSet<Day> weekend = EnumSet.of(Day.SAT, Day.SUN);
EnumSet<Day> allDays = EnumSet.allOf(Day.class);
boolean isWeekend = weekend.contains(Day.SAT);  // true`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my Set contain "duplicates" even though I added the same object?',
      answer: 'You probably did not override equals() and hashCode() in your class. HashSet uses these to detect duplicates. Without overriding, two objects with the same data are considered different (default Object.equals() compares references). Always override both equals() and hashCode() for objects used in Sets or as Map keys.',
    },
    {
      question: 'Why does TreeSet use compareTo() instead of equals() for duplicates?',
      answer: 'TreeSet uses compareTo() (or Comparator.compare()) for all comparisons — including equality. If compareTo() returns 0, TreeSet considers them equal and rejects the second element. This can cause bugs if your compareTo() and equals() are inconsistent. The Comparable contract says: (a.compareTo(b) == 0) should be consistent with a.equals(b).',
    },
  ],
  productionIssues: [
    'Mutable objects in HashSet — if you modify an object after adding it to a HashSet (changing the fields used in hashCode), the set cannot find the object anymore. Never mutate objects stored in a HashSet.',
    'Missing hashCode override — if you override equals() but not hashCode(), two equal objects can end up in different buckets. Always override both together.',
  ],
  bestPractices: [
    'Always override equals() and hashCode() together for objects used in Sets.',
    'Use LinkedHashSet when you need deduplication with preserved insertion order.',
    'Use TreeSet when you need a sorted set with navigation operations.',
    'Use EnumSet for sets of enum values — it is the fastest possible implementation.',
    'Use Set.of() for small immutable sets (constants, test data).',
  ],
  architectNote: 'In domain modeling, Sets are natural for many-to-many relationships: User has Set<Role>, Order has Set<Tag>. In JPA, @ManyToMany relationships are typically modeled as Set (not List) to avoid duplicate join records. However, be careful with HashSet in JPA entities — Hibernate requires equals/hashCode based on a business key, not the generated database ID.',
  faqs: [
    {
      question: 'Is HashSet thread-safe?',
      answer: 'No. HashSet is not synchronized. For concurrent access, use ConcurrentHashMap.newKeySet() (backed by ConcurrentHashMap), Collections.synchronizedSet(), or CopyOnWriteArraySet (for read-heavy workloads). In most cases, the best approach is to avoid sharing mutable sets between threads.',
    },
    {
      question: 'When should I use a Set vs a List with distinct()?',
      answer: 'Use a Set when the data is inherently a set (no duplicates by definition, membership testing is important). Use stream().distinct() on a List when you have a list and need to deduplicate it temporarily. For large datasets, converting to a LinkedHashSet is more efficient than stream().distinct() since it avoids stream overhead.',
    },
  ],
  keyTakeaways: [
    'Set guarantees no duplicates — add() returns false if element already exists',
    'HashSet: O(1) operations, no order; LinkedHashSet: O(1) + insertion order; TreeSet: O(log n) + sorted',
    'Elements must have correct equals() and hashCode() for HashSet to work correctly',
    'TreeSet uses compareTo(), not equals() — keep them consistent',
    'EnumSet is the fastest Set for enum values',
    'Never mutate objects after adding them to a HashSet',
  ],
  relatedTopics: ['java-collections-list', 'java-collections-map', 'java-hashset', 'java-comparable-comparator'],
};

export const javaCollectionsMap: TopicContent = {
  slug: 'java-collections-map',
  title: 'Map',
  description: 'The Map interface — key-value pairs, fast lookup by key. HashMap, LinkedHashMap, TreeMap — when to use each in enterprise applications.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A Map stores key-value pairs and provides O(1) lookup by key. HashMap is the default choice. LinkedHashMap preserves insertion order. TreeMap keeps keys sorted. Maps are everywhere in enterprise code: caching, grouping, configuration, and lookup tables.',
  whatIsIt: `**Map Interface**
java.util.Map (does NOT extend Collection):
- put(K key, V value) — add or replace entry
- get(Object key) — retrieve by key (returns null if missing)
- getOrDefault(Object key, V defaultValue) — safe get
- containsKey(Object key) — O(1) for HashMap
- remove(Object key) — remove entry
- keySet() — Set of all keys
- values() — Collection of all values
- entrySet() — Set<Map.Entry<K,V>> for iterating pairs
- putIfAbsent(K key, V value) — only puts if key not present
- computeIfAbsent(K key, Function) — compute value if absent
- merge(K key, V value, BiFunction) — merge with existing value

**Key Implementations:**
- **HashMap** — hash table; O(1) average; no ordering
- **LinkedHashMap** — HashMap + insertion order; O(1); useful for LRU cache
- **TreeMap** — Red-Black tree; O(log n); keys always sorted
- **ConcurrentHashMap** — thread-safe HashMap; fine-grained locking
- **EnumMap** — specialized for enum keys; array-backed; very fast
- **Map.of()** — immutable map (Java 9+); max 10 entries
- **Map.copyOf()** — immutable copy of existing map`,
  whyWeNeedIt: `Maps are the most versatile data structure in Java:

- **Fast lookup** — O(1) find by key (vs O(n) for List)
- **Grouping** — group orders by customer, products by category
- **Caching** — store computed results keyed by input
- **Configuration** — property name to value
- **Counting** — word frequency, event counts
- **Index** — build an in-memory index for fast search`,
  realWorldUsage: `Maps appear in virtually every Java service:

\`\`\`java
// Cache / lookup table
Map<String, User> userCache = new HashMap<>();
User user = userCache.computeIfAbsent(userId, id -> userRepo.findById(id));

// Grouping (replaced by Collectors.groupingBy in streams)
Map<String, List<Order>> ordersByCustomer = orders.stream()
    .collect(Collectors.groupingBy(Order::getCustomerId));

// Counting
Map<String, Long> countByStatus = orders.stream()
    .collect(Collectors.groupingBy(
        o -> o.getStatus().name(),
        Collectors.counting()
    ));
\`\`\``,
  howItWorks: `**HashMap Internals:**
- Array of "buckets" (linked lists or trees)
- put(key, value): compute hashCode, find bucket, check for existing key with equals(), store
- get(key): compute hashCode, find bucket, find entry with equals()
- Java 8+: buckets with 8+ entries convert to balanced trees (O(log n) worst case)
- Default initial capacity: 16; load factor: 0.75 (resize when 75% full)
- Resizing doubles the array and rehashes all entries — O(n) operation

**Good hash function** distributes keys evenly across buckets. Poor hash functions (many collisions) degrade HashMap to O(n).`,
  example: {
    title: 'Map Patterns Every Developer Uses',
    description: 'The Map operations and patterns you will use in every enterprise project.',
    code: [
      {
        label: 'Core Map Operations',
        language: 'java',
        code: `// Creating maps
Map<String, Integer> scores = new HashMap<>();
Map<String, String> config = Map.of("host", "localhost", "port", "8080");  // immutable

// Basic operations
scores.put("Alice", 95);
scores.put("Bob", 87);
scores.put("Alice", 98);  // replaces 95 with 98
int aliceScore = scores.get("Alice");  // 98
int missing = scores.getOrDefault("Charlie", 0);  // 0 (safe)
scores.remove("Bob");

// Modern Map methods (Java 8+)
// putIfAbsent — only adds if key not present
scores.putIfAbsent("Dave", 75);

// computeIfAbsent — compute and store if absent (great for caching)
Map<String, List<String>> groups = new HashMap<>();
groups.computeIfAbsent("admin", k -> new ArrayList<>()).add("alice");
groups.computeIfAbsent("admin", k -> new ArrayList<>()).add("bob");
// groups = {admin: [alice, bob]}

// merge — combine with existing value
Map<String, Integer> wordCount = new HashMap<>();
String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
for (String word : words) {
    wordCount.merge(word, 1, Integer::sum);
    // if absent: put(word, 1); if present: put(word, existing + 1)
}
// {apple=3, banana=2, cherry=1}

// Iteration
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
scores.forEach((k, v) -> System.out.println(k + ": " + v));`,
      },
      {
        label: 'Enterprise Map Patterns',
        language: 'java',
        code: `// Pattern 1: Grouping with streams
Map<OrderStatus, List<Order>> byStatus = orders.stream()
    .collect(Collectors.groupingBy(Order::getStatus));

// Pattern 2: Counting
Map<String, Long> orderCountByCustomer = orders.stream()
    .collect(Collectors.groupingBy(
        Order::getCustomerId,
        Collectors.counting()
    ));

// Pattern 3: Strategy map (replaces long if/else chains)
Map<PaymentType, PaymentProcessor> processors = Map.of(
    PaymentType.CREDIT_CARD, creditCardProcessor,
    PaymentType.BANK_TRANSFER, bankTransferProcessor,
    PaymentType.PAYPAL, paypalProcessor
);
PaymentProcessor processor = processors.get(paymentType);
if (processor == null) throw new UnsupportedPaymentTypeException(paymentType);
return processor.process(request);

// Pattern 4: LRU Cache with LinkedHashMap
public class LruCache<K, V> extends LinkedHashMap<K, V> {
    private final int maxSize;
    
    public LruCache(int maxSize) {
        super(maxSize, 0.75f, true);  // accessOrder=true for LRU
        this.maxSize = maxSize;
    }
    
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > maxSize;  // remove oldest when over capacity
    }
}

// Pattern 5: Frequency counting
public Map<String, Integer> countWords(String text) {
    Map<String, Integer> freq = new HashMap<>();
    for (String word : text.split("\\s+")) {
        freq.merge(word.toLowerCase(), 1, Integer::sum);
    }
    return freq;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What happens when HashMap has many collisions?',
      answer: 'If many keys hash to the same bucket, performance degrades. Before Java 8, buckets were linked lists — worst case O(n). Java 8+ converts buckets with 8+ entries to balanced trees — worst case O(log n). The real fix is a good hashCode() implementation that distributes keys evenly. String and Integer have excellent hash functions; custom objects need careful implementation.',
    },
    {
      question: 'What is the difference between HashMap and Hashtable?',
      answer: 'Hashtable is the legacy synchronized HashMap from Java 1.0. It is slower (all methods synchronized), does not allow null keys or values, and is considered obsolete. Use HashMap for single-threaded code and ConcurrentHashMap for thread-safe concurrent access. Never use Hashtable in new code.',
    },
    {
      question: 'Why does Map not extend Collection?',
      answer: 'Map represents a mapping (key to value) — it is fundamentally different from a Collection (sequence of elements). A Map entry is a key-value pair, not a single element. Forcing Map into the Collection hierarchy would require deciding: does size() return key count, value count, or entry count? The designers kept them separate for clarity.',
    },
  ],
  productionIssues: [
    'HashMap in concurrent code — HashMap is not thread-safe. Concurrent modification can cause infinite loops (Java 7) or data corruption. Use ConcurrentHashMap for concurrent access.',
    'Memory leak with computeIfAbsent for caching — unbounded maps grow forever. Use a cache library (Caffeine, Guava Cache) with eviction policies instead.',
    'HashMap initial capacity — if you know you will store 10,000 entries, initialize with new HashMap<>(16384) (next power of 2 above 10000/0.75) to avoid resizing.',
  ],
  bestPractices: [
    'Use HashMap as default; LinkedHashMap when order matters; TreeMap when sorted iteration is needed.',
    'Use getOrDefault() instead of get() + null check.',
    'Use computeIfAbsent() for lazy initialization patterns (e.g., building a map of lists).',
    'Use merge() for counting and accumulation patterns.',
    'Use ConcurrentHashMap for thread-safe maps — never synchronize a HashMap manually.',
    'For enum keys, use EnumMap — it is faster than HashMap for enum types.',
  ],
  architectNote: 'Maps are the foundation of most caching strategies. However, in-memory HashMaps are not suitable for distributed caching (multiple instances do not share state). For production caching, use Redis (via Spring Cache), Caffeine (local cache with eviction), or Hazelcast (distributed). The Map interface is the same — swap the implementation without changing business code.',
  faqs: [
    {
      question: 'What is ConcurrentHashMap and how is it different from synchronized HashMap?',
      answer: 'ConcurrentHashMap uses fine-grained locking — it divides the map into segments (Java 7) or uses CAS operations (Java 8+). Multiple threads can read and write concurrently to different segments without blocking each other. Collections.synchronizedMap(new HashMap<>()) uses a single lock for the entire map — only one thread can access it at a time. ConcurrentHashMap is much faster under concurrent access.',
    },
    {
      question: 'How do I sort a Map by value?',
      answer: 'Maps are sorted by key (TreeMap) or unsorted (HashMap). To sort by value: map.entrySet().stream().sorted(Map.Entry.comparingByValue()).forEach(e -> ...). To get a sorted map by value, collect to a LinkedHashMap: map.entrySet().stream().sorted(Map.Entry.comparingByValue(Comparator.reverseOrder())).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new)).',
    },
  ],
  keyTakeaways: [
    'HashMap: O(1) average for get/put/remove; no ordering guarantee',
    'LinkedHashMap: O(1) + insertion order; use for LRU cache',
    'TreeMap: O(log n) + sorted keys; use when sorted iteration is needed',
    'ConcurrentHashMap: thread-safe HashMap; use in concurrent code',
    'Use computeIfAbsent() for lazy initialization; merge() for counting',
    'Keys must have correct equals() and hashCode()',
  ],
  relatedTopics: ['java-collections-list', 'java-collections-set', 'java-hashmap', 'java-streams'],
};

export const javaArrayList: TopicContent = {
  slug: 'java-arraylist',
  title: 'ArrayList',
  description: 'ArrayList internals, performance characteristics, and the patterns that make it the most-used collection in Java.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'ArrayList is a resizable array. It is the go-to List implementation for 95% of use cases because it offers O(1) random access and excellent cache performance. The only time you need something else is when you frequently insert/delete in the middle of large lists, or need thread safety.',
  whatIsIt: `**ArrayList** is java.util.List backed by a dynamic array (Object[]).

**Key Characteristics:**
- **Random access**: O(1) — direct array index
- **Add at end**: O(1) amortized — occasionally O(n) for resize
- **Add/remove in middle**: O(n) — must shift elements
- **Search (contains)**: O(n) — must scan entire array
- **Memory**: contiguous memory — excellent CPU cache performance

**Capacity vs Size:**
- **size()** — number of elements currently stored
- **capacity** — size of the internal array (always >= size)
- Initial capacity: 10 (or specified in constructor)
- Growth factor: 1.5x (new capacity = old * 3/2 + 1)

**Constructors:**
- \`new ArrayList<>()\` — initial capacity 10
- \`new ArrayList<>(initialCapacity)\` — pre-allocate
- \`new ArrayList<>(collection)\` — copy from collection`,
  whyWeNeedIt: 'ArrayList is the workhorse of Java collections. It combines the simplicity of arrays (fast random access, contiguous memory) with the flexibility of dynamic sizing. In enterprise code, you use it to hold query results, build response objects, accumulate items, and pass data between layers.',
  realWorldUsage: `ArrayList is used in every Java project:

- Query results: \`List<Order> orders = new ArrayList<>(orderRepository.findAll())\`
- Building responses: accumulate items then return
- Batch processing: collect items then process in bulk
- Sorting: ArrayList.sort() is highly optimized (TimSort)`,
  howItWorks: `**How Resizing Works:**
\`\`\`
Initial: [_, _, _, _, _, _, _, _, _, _]  // capacity 10, size 0
After 10 adds: [a, b, c, d, e, f, g, h, i, j]  // capacity 10, size 10
11th add triggers resize:
  1. Create new array of size 15 (10 * 3/2 + 1)
  2. Copy all 10 elements to new array
  3. Add 11th element
  4. Old array becomes garbage
\`\`\`

**Why O(1) amortized for add:**
Each element is copied at most once per resize. Total copies for n elements = n/2 + n/4 + ... = n. So average copies per element = 1. Hence O(1) amortized.

**trimToSize():**
Reduces internal array to exactly size(). Use after bulk loading to free unused capacity.`,
  example: {
    title: 'ArrayList Best Practices',
    description: 'How to use ArrayList efficiently in production code.',
    code: [
      {
        label: 'Performance-Conscious Usage',
        language: 'java',
        code: `// Pre-size when you know the approximate count
// Avoids multiple resize operations
public List<ProductDto> convertToDto(List<Product> products) {
    List<ProductDto> dtos = new ArrayList<>(products.size());  // exact size
    for (Product p : products) {
        dtos.add(new ProductDto(p.getId(), p.getName(), p.getPrice()));
    }
    return dtos;
}

// Efficient bulk add
List<String> result = new ArrayList<>();
result.addAll(firstBatch);   // more efficient than adding one by one
result.addAll(secondBatch);

// removeIf — efficient in-place removal (avoids ConcurrentModificationException)
List<Order> orders = new ArrayList<>(fetchOrders());
orders.removeIf(order -> order.getStatus() == OrderStatus.CANCELLED);

// replaceAll — in-place transformation
List<String> names = new ArrayList<>(List.of("alice", "bob", "charlie"));
names.replaceAll(String::toUpperCase);
// [ALICE, BOB, CHARLIE]

// Sort with Comparator
List<Employee> employees = getEmployees();
employees.sort(Comparator
    .comparing(Employee::getDepartment)
    .thenComparing(Employee::getName));

// Efficient contains check for large lists — use Set instead
List<String> bigList = new ArrayList<>(100_000);
// BAD: O(n) per check
boolean found = bigList.contains("target");
// GOOD: convert to Set first if doing many contains checks
Set<String> lookupSet = new HashSet<>(bigList);
boolean fastFound = lookupSet.contains("target");  // O(1)`,
      },
      {
        label: 'Thread Safety',
        language: 'java',
        code: `// ArrayList is NOT thread-safe
// Option 1: synchronized wrapper (coarse-grained lock)
List<String> syncList = Collections.synchronizedList(new ArrayList<>());
// Still need external sync for iteration!
synchronized (syncList) {
    for (String s : syncList) { ... }  // safe iteration
}

// Option 2: CopyOnWriteArrayList (best for read-heavy)
// Creates a new copy of the array on every write
// Reads are always safe without locking
List<String> cowList = new CopyOnWriteArrayList<>();
cowList.add("a");  // creates new array
cowList.add("b");  // creates new array again
// iteration is always safe — reads the snapshot
for (String s : cowList) { ... }  // safe, no sync needed

// Option 3: Collect to immutable list at the end
// Best pattern: build in single thread, share as immutable
List<String> items = new ArrayList<>();
// ... populate in single thread ...
List<String> shared = Collections.unmodifiableList(items);
// Now share 'shared' safely across threads (it can't be modified)`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why is ArrayList faster than LinkedList for most operations?',
      answer: 'CPU cache locality. ArrayList stores elements in contiguous memory — when you access one element, nearby elements are loaded into CPU cache. Subsequent accesses are cache hits (very fast). LinkedList nodes are scattered across the heap — each access is likely a cache miss. This hardware effect makes ArrayList faster even for operations where LinkedList should theoretically be equal or better.',
    },
    {
      question: 'What is the difference between ArrayList and Vector?',
      answer: 'Vector is the legacy synchronized ArrayList from Java 1.0. Every method is synchronized, making it thread-safe but slow. ArrayList is not synchronized and faster for single-threaded use. For thread-safe lists, use CopyOnWriteArrayList or Collections.synchronizedList(). Never use Vector in new code.',
    },
  ],
  productionIssues: [
    'Storing large objects in ArrayList — holding references prevents GC. If you load 100,000 JPA entities into a List, they all stay in memory until the list is cleared.',
    'ArrayList.subList() is a view — modifying the parent list while holding a subList reference throws ConcurrentModificationException.',
    'Autoboxing overhead — List<Integer> boxes every int. For large lists of primitives, use int[] or IntStream.',
  ],
  bestPractices: [
    'Pre-size ArrayList when you know the approximate size: new ArrayList<>(expectedSize).',
    'Use removeIf() for in-place filtering instead of iterating and removing.',
    'Use replaceAll() for in-place transformation.',
    'For frequent contains() checks on large lists, use a HashSet instead.',
    'Return List<T> (interface), not ArrayList<T> (implementation).',
  ],
  architectNote: 'For very large lists (millions of elements), consider alternatives: arrays (int[], Object[]) have less overhead; Stream<T> enables lazy processing without materializing the full list; database pagination avoids loading all records. The right tool depends on whether you need random access, streaming, or just iteration.',
  faqs: [
    {
      question: 'How do I safely iterate and remove elements from an ArrayList?',
      answer: 'Three options: (1) Use removeIf() — cleanest: list.removeIf(item -> shouldRemove(item)); (2) Use Iterator explicitly: Iterator<T> it = list.iterator(); while (it.hasNext()) { if (shouldRemove(it.next())) it.remove(); }; (3) Iterate backwards: for (int i = list.size()-1; i >= 0; i--) { if (shouldRemove(list.get(i))) list.remove(i); }. Never use for-each and call list.remove() — that throws ConcurrentModificationException.',
    },
  ],
  keyTakeaways: [
    'ArrayList is backed by a dynamic array — O(1) random access, O(n) insert/delete in middle',
    'Pre-size with new ArrayList<>(expectedSize) to avoid resize operations',
    'Use removeIf() and replaceAll() for in-place modification',
    'Not thread-safe — use CopyOnWriteArrayList or synchronizedList for concurrent access',
    'For frequent contains() on large lists, use HashSet instead',
    'Return List<T> interface, not ArrayList<T> concrete type',
  ],
  relatedTopics: ['java-collections-list', 'java-linkedlist', 'java-collections-set', 'java-streams'],
};

export const javaLinkedList: TopicContent = {
  slug: 'java-linkedlist',
  title: 'LinkedList',
  description: 'LinkedList as both a List and a Deque — when it actually beats ArrayList and when to use ArrayDeque instead.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'LinkedList is a doubly-linked list that implements both List and Deque. Its main advantage over ArrayList is O(1) insert/remove at both ends and O(1) insert/remove at a known iterator position. However, due to poor cache locality, ArrayList is faster in practice for most operations. Use LinkedList mainly when you need a Deque (double-ended queue) — or better yet, use ArrayDeque instead.',
  whatIsIt: `**LinkedList** implements both java.util.List and java.util.Deque:

**As a List:**
- All List operations available
- get(index): O(n) — must traverse from head or tail
- add(index, element): O(n) to find position + O(1) to insert
- remove(index): O(n) to find + O(1) to remove

**As a Deque (double-ended queue):**
- addFirst/offerFirst: O(1)
- addLast/offerLast: O(1)
- removeFirst/pollFirst: O(1)
- removeLast/pollLast: O(1)
- peekFirst/peekLast: O(1)

**Memory:**
Each element is a Node object with:
- Object item (the element)
- Node next (pointer to next)
- Node prev (pointer to previous)
Overhead: ~40 bytes per element (vs ~4-8 bytes for ArrayList)`,
  whyWeNeedIt: 'LinkedList is the right choice when: (1) you need a queue or stack with O(1) operations at both ends, (2) you are using an Iterator and need O(1) insert/delete at the current position. In most other cases, ArrayList is better.',
  realWorldUsage: `Real use cases:

- **Task queue**: add tasks to end, process from front
- **Undo/redo stack**: add to front, remove from front
- **Browser history**: deque where you add pages and navigate back/forward
- **LRU cache implementation**: move accessed nodes to front efficiently

In practice, most of these use cases are better served by ArrayDeque.`,
  howItWorks: `**Node Structure:**
\`\`\`java
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;
}
\`\`\`

**add(index, element):**
1. If index == 0: addFirst (O(1))
2. If index == size: addLast (O(1))
3. Otherwise: traverse to index (O(n)), then insert (O(1))

**Why cache locality matters:**
ArrayList stores elements in one contiguous memory block. When you iterate, the CPU prefetches the next elements. LinkedList nodes are scattered — each node access is likely a cache miss. This makes LinkedList iteration 3-10x slower than ArrayList in practice.`,
  example: {
    title: 'LinkedList as a Deque',
    description: 'The main legitimate use case for LinkedList in enterprise code.',
    code: [
      {
        label: 'LinkedList as Queue/Deque',
        language: 'java',
        code: `// LinkedList as a Queue (FIFO)
Queue<String> taskQueue = new LinkedList<>();
taskQueue.offer("task1");  // add to end
taskQueue.offer("task2");
taskQueue.offer("task3");

String next = taskQueue.poll();   // remove from front: "task1"
String peek = taskQueue.peek();   // look at front without removing: "task2"

// LinkedList as a Stack (LIFO)
Deque<String> stack = new LinkedList<>();
stack.push("first");   // addFirst
stack.push("second");  // addFirst
stack.push("third");   // addFirst

String top = stack.pop();   // removeFirst: "third"
String look = stack.peek(); // peekFirst: "second"

// BUT: ArrayDeque is faster for both Queue and Stack!
// Prefer ArrayDeque over LinkedList for queue/stack use cases
Deque<String> betterStack = new ArrayDeque<>();
Queue<String> betterQueue = new ArrayDeque<>();

// When LinkedList wins: O(1) insert at iterator position
List<String> list = new LinkedList<>(List.of("a", "b", "c", "d", "e"));
ListIterator<String> it = list.listIterator(2);  // position at index 2
it.add("X");  // O(1) insert at current position
// [a, b, X, c, d, e]
it.remove();  // O(1) remove current element`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is LinkedList really O(1) for insert in the middle?',
      answer: 'Only if you already have an iterator/reference at the insertion point. Finding the position is O(n). So add(index, element) is O(n) overall because you must traverse to the index first. The O(1) advantage only applies when you already have a ListIterator positioned at the right place.',
    },
    {
      question: 'Should I use LinkedList or ArrayDeque for a queue?',
      answer: 'ArrayDeque. It is faster than LinkedList for queue/stack operations because of better cache locality (circular array vs scattered nodes). ArrayDeque also uses less memory. LinkedList has no advantage over ArrayDeque for queue/stack use cases. The Java documentation itself recommends ArrayDeque over LinkedList for stacks.',
    },
  ],
  productionIssues: [
    'Using LinkedList.get(index) in a loop — this is O(n) per call, making the loop O(n²). If you need index access, use ArrayList.',
    'High memory overhead — each LinkedList node uses ~40 bytes. For 1 million elements, that is 40MB just for node overhead. ArrayList uses ~8MB for the same elements.',
  ],
  bestPractices: [
    'Use ArrayDeque instead of LinkedList for queue and stack use cases.',
    'Use ArrayList instead of LinkedList for general-purpose lists.',
    'Use LinkedList only when you need O(1) insert/delete at an iterator position in a large list.',
    'Never use LinkedList.get(index) in a loop — it is O(n²).',
  ],
  architectNote: 'LinkedList is one of those data structures that looks good in theory (O(1) insertions) but underperforms in practice due to CPU cache effects. Modern CPUs are so fast at sequential memory access that ArrayList\'s O(n) shift is often faster than LinkedList\'s O(1) pointer update when the list fits in cache. Always benchmark before assuming LinkedList is faster.',
  faqs: [
    {
      question: 'What is the difference between Queue and Deque?',
      answer: 'Queue is single-ended: you add to the back and remove from the front (FIFO). Deque (Double-Ended Queue) supports add/remove from both ends — it can be used as a FIFO queue or LIFO stack. LinkedList implements both. ArrayDeque implements Deque but not Queue directly (though it can be used as one).',
    },
  ],
  keyTakeaways: [
    'LinkedList implements both List and Deque',
    'O(1) add/remove at both ends; O(n) random access by index',
    'Poor cache locality makes it slower than ArrayList for most real workloads',
    'Use ArrayDeque instead for queue/stack — it is faster and uses less memory',
    'Only advantage: O(1) insert/delete at a known iterator position in a large list',
    'Never use get(index) in a loop with LinkedList — it is O(n²)',
  ],
  relatedTopics: ['java-arraylist', 'java-collections-list', 'java-collections-map'],
};

export const javaHashMap: TopicContent = {
  slug: 'java-hashmap',
  title: 'HashMap',
  description: 'HashMap internals, hash collisions, load factor tuning, and why HashMap is the most important collection to understand deeply.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'HashMap stores key-value pairs in an array of buckets. It uses hashCode() to find the right bucket and equals() to find the right key within the bucket. Average O(1) for get/put/remove. The most common collection in enterprise Java — used for caching, grouping, lookup tables, and configuration.',
  whatIsIt: `**HashMap** is java.util.Map backed by a hash table.

**Internal Structure (Java 8+):**
\`\`\`
buckets array: [bucket0][bucket1][bucket2]...[bucket15]
                   |
              LinkedList (or TreeNode if > 8 entries)
              [key1=val1] -> [key2=val2] -> null
\`\`\`

**Key Parameters:**
- **Initial capacity**: 16 (number of buckets)
- **Load factor**: 0.75 (resize when 75% of buckets are used)
- **Threshold**: capacity * loadFactor = point at which resize happens
- **Resize**: doubles capacity, rehashes all entries — O(n)

**Java 8 Improvement:**
When a bucket has more than 8 entries (treeify threshold), it converts from a linked list to a balanced tree. This changes worst-case from O(n) to O(log n) for buckets with many collisions (e.g., when hashCode() returns the same value for all keys).`,
  whyWeNeedIt: 'HashMap provides O(1) average lookup by key — impossible with a List (O(n) search). It is the foundation of caching, indexing, and any operation where you need to find data by a key rather than iterating through everything.',
  realWorldUsage: `HashMap is everywhere:

\`\`\`java
// Configuration
Map<String, String> config = new HashMap<>();
config.put("db.host", "localhost");
String host = config.getOrDefault("db.host", "127.0.0.1");

// In-memory cache
Map<Long, User> userCache = new HashMap<>();
User user = userCache.computeIfAbsent(userId, id -> db.findUser(id));

// Grouping/indexing
Map<String, List<Product>> byCategory = products.stream()
    .collect(Collectors.groupingBy(Product::getCategory));
\`\`\``,
  howItWorks: `**put(key, value) algorithm:**
1. If key is null: store in bucket 0
2. Compute hash: \`(h = key.hashCode()) ^ (h >>> 16)\` (spread high bits)
3. Find bucket: \`hash & (capacity - 1)\` (fast modulo for power-of-2 capacity)
4. Traverse bucket's linked list/tree looking for existing key (using equals())
5. If found: replace value; if not found: add new entry
6. If size > threshold: resize (double capacity, rehash all)

**Why capacity is always a power of 2:**
Finding the bucket with \`hash & (capacity-1)\` is a single bitwise AND operation — much faster than \`hash % capacity\`.

**hashCode() and equals() contract:**
If a.equals(b) then a.hashCode() == b.hashCode()
(but not vice versa — different objects can have the same hash = collision)`,
  example: {
    title: 'HashMap Deep Dive',
    description: 'Understanding HashMap internals through code.',
    code: [
      {
        label: 'HashMap Internals Demo',
        language: 'java',
        code: `// Demonstrate why equals/hashCode matters
class BadKey {
    int value;
    BadKey(int v) { this.value = v; }
    // NO equals/hashCode override!
}

Map<BadKey, String> bad = new HashMap<>();
BadKey k1 = new BadKey(42);
bad.put(k1, "hello");
System.out.println(bad.get(k1));          // "hello" (same reference)
System.out.println(bad.get(new BadKey(42))); // null! (different object)

// Fix: proper equals/hashCode
record GoodKey(int value) {}  // Record auto-generates equals/hashCode

Map<GoodKey, String> good = new HashMap<>();
good.put(new GoodKey(42), "hello");
System.out.println(good.get(new GoodKey(42)));  // "hello" ✓

// Pre-sizing for known capacity
// To store 100 entries without resize:
// capacity = 100 / 0.75 = 134, next power of 2 = 256
Map<String, Object> preAllocated = new HashMap<>(256);

// Observe resize behavior
Map<Integer, Integer> map = new HashMap<>(4);  // capacity 4
// Resize at 4 * 0.75 = 3 entries
map.put(1, 1);  // size=1, no resize
map.put(2, 2);  // size=2, no resize
map.put(3, 3);  // size=3 = threshold, RESIZE to capacity 8!
map.put(4, 4);  // size=4, no resize (threshold now 6)`,
      },
      {
        label: 'Modern HashMap Methods',
        language: 'java',
        code: `Map<String, List<String>> index = new HashMap<>();

// computeIfAbsent — most useful HashMap method
// "Get or create" pattern
index.computeIfAbsent("java", k -> new ArrayList<>()).add("tutorial");
index.computeIfAbsent("java", k -> new ArrayList<>()).add("advanced");
// index = {java: [tutorial, advanced]}

// compute — transform existing value
Map<String, Integer> counter = new HashMap<>();
counter.compute("hits", (k, v) -> v == null ? 1 : v + 1);
counter.compute("hits", (k, v) -> v == null ? 1 : v + 1);
// counter = {hits: 2}

// merge — combine with existing (great for counting/accumulating)
Map<String, Integer> wordFreq = new HashMap<>();
String[] words = {"apple", "banana", "apple"};
for (String w : words) {
    wordFreq.merge(w, 1, Integer::sum);
}
// {apple=2, banana=1}

// replaceAll — transform all values
Map<String, String> env = new HashMap<>(Map.of("HOST", "localhost", "PORT", "8080"));
env.replaceAll((k, v) -> v.toUpperCase());

// entrySet iteration — most efficient way to iterate
for (Map.Entry<String, Integer> e : wordFreq.entrySet()) {
    System.out.printf("%s: %d%n", e.getKey(), e.getValue());
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can HashMap have null keys and null values?',
      answer: 'Yes. HashMap allows one null key (stored in bucket 0) and multiple null values. ConcurrentHashMap does NOT allow null keys or values — it throws NullPointerException. Hashtable also does not allow nulls. In practice, avoid null keys — use Optional or a sentinel value instead.',
    },
    {
      question: 'What is the load factor and should I change it?',
      answer: 'Load factor (default 0.75) controls when the map resizes. Lower load factor (e.g., 0.5) means more resizing but fewer collisions — faster lookups, more memory. Higher load factor (e.g., 0.9) means fewer resizes but more collisions — slower lookups, less memory. The default 0.75 is a well-tested balance. Only change it if you have profiled a specific need.',
    },
  ],
  productionIssues: [
    'HashMap in multithreaded code — can cause infinite loops (Java 7, due to resize) or data corruption. Always use ConcurrentHashMap in concurrent contexts.',
    'Poorly distributed hashCode — if all keys hash to the same value, HashMap degrades to O(n) (or O(log n) in Java 8+). This is a DoS vector for web applications — attackers can craft inputs that collide. Java randomizes String hashing since Java 7.',
    'Frequent resizing — if you add 10,000 elements to a default HashMap, it resizes ~10 times. Pre-size: new HashMap<>(10000 * 4 / 3 + 1) to avoid resizing.',
  ],
  bestPractices: [
    'Pre-size HashMap when you know the approximate number of entries.',
    'Always implement equals() and hashCode() for custom key types.',
    'Use ConcurrentHashMap for thread-safe maps.',
    'Prefer computeIfAbsent() over get() + null check + put().',
    'Use merge() for counting and accumulation — it is cleaner than compute().',
    'For enum keys, use EnumMap — it is faster and uses less memory.',
  ],
  architectNote: 'HashMap is the data structure behind most in-memory caches. However, for production caching, use Caffeine (local) or Redis (distributed). They add: expiration (TTL), maximum size with eviction, statistics, and distributed support. The Map interface abstraction means you can switch from HashMap to Caffeine with minimal code changes.',
  faqs: [
    {
      question: 'What is the difference between HashMap and ConcurrentHashMap?',
      answer: 'HashMap is not thread-safe — concurrent access can cause data corruption or infinite loops. ConcurrentHashMap uses CAS (Compare-And-Swap) operations and fine-grained locking for thread safety without a global lock. It supports full concurrency for reads and configurable concurrency for writes. It does NOT allow null keys/values. Use ConcurrentHashMap whenever a map is shared between threads.',
    },
    {
      question: 'What happens to HashMap during resizing?',
      answer: 'When the number of entries exceeds capacity * loadFactor, HashMap creates a new array twice as large and rehashes every existing entry into the new array. This is an O(n) operation. During this time, the map is temporarily inconsistent — this is why HashMap is not thread-safe. ConcurrentHashMap handles resizing incrementally to avoid this.',
    },
  ],
  keyTakeaways: [
    'HashMap: O(1) average for get/put/remove; no ordering guarantee',
    'Requires correct equals() and hashCode() on keys',
    'Java 8+: buckets with 8+ entries convert to balanced trees (O(log n) worst case)',
    'Default capacity 16, load factor 0.75 — pre-size for known large maps',
    'Not thread-safe — use ConcurrentHashMap for concurrent access',
    'computeIfAbsent() and merge() are the most useful modern HashMap methods',
  ],
  relatedTopics: ['java-collections-map', 'java-hashset', 'java-streams', 'java-threads'],
};

export const javaHashSet: TopicContent = {
  slug: 'java-hashset',
  title: 'HashSet',
  description: 'HashSet internals, when to use it over a List, and the equals/hashCode contract that makes or breaks it.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'HashSet is a Set backed by a HashMap. It provides O(1) add, remove, and contains operations. Use it when you need unique elements and fast membership testing. The critical requirement: elements must have correct equals() and hashCode() implementations.',
  whatIsIt: `**HashSet** is java.util.Set backed by a HashMap<E, PRESENT> where PRESENT is a static dummy Object.

**Key Characteristics:**
- **No duplicates** — add() returns false if element already present
- **No ordering** — iteration order is unpredictable
- **O(1) average** for add, remove, contains
- **Allows one null** element
- **Not thread-safe**

**Relationship to HashMap:**
\`\`\`java
// HashSet internally uses:
private transient HashMap<E, Object> map;
private static final Object PRESENT = new Object();

public boolean add(E e) {
    return map.put(e, PRESENT) == null;
}
public boolean contains(Object o) {
    return map.containsKey(o);
}
\`\`\``,
  whyWeNeedIt: 'HashSet provides O(1) contains() vs O(n) for List. When you need to check "is this element already seen?" thousands of times, HashSet is the right tool. It is also the natural data structure for sets of unique identifiers, tags, permissions, and visited nodes in graph algorithms.',
  realWorldUsage: `Common enterprise patterns:

\`\`\`java
// Deduplication
Set<String> processedIds = new HashSet<>();
for (Event event : events) {
    if (processedIds.add(event.getId())) {  // add returns false if duplicate
        process(event);
    }
}

// Permission checking
Set<String> userRoles = user.getRoles();
if (userRoles.contains("ADMIN")) { ... }

// Visited tracking in BFS/DFS
Set<String> visited = new HashSet<>();
Queue<String> queue = new ArrayDeque<>();
\`\`\``,
  howItWorks: 'HashSet delegates everything to its backing HashMap. add(e) calls map.put(e, PRESENT). contains(o) calls map.containsKey(o). The same hashCode/equals requirements and collision handling apply.',
  example: {
    title: 'HashSet in Practice',
    description: 'Practical HashSet usage patterns.',
    code: [
      {
        label: 'HashSet Operations',
        language: 'java',
        code: `// Basic usage
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("spring");
tags.add("java");  // duplicate — ignored, returns false
System.out.println(tags.size());  // 2

// Deduplication of a list (preserving order: use LinkedHashSet)
List<Integer> withDups = List.of(3, 1, 4, 1, 5, 9, 2, 6, 5, 3);
List<Integer> unique = new ArrayList<>(new LinkedHashSet<>(withDups));
System.out.println(unique);  // [3, 1, 4, 5, 9, 2, 6]

// Fast membership testing
Set<String> stopWords = new HashSet<>(Set.of(
    "the", "a", "an", "is", "are", "was", "were"
));
// O(1) per check — much faster than List.contains()
String[] words = text.split("\\s+");
List<String> meaningful = Arrays.stream(words)
    .filter(w -> !stopWords.contains(w))
    .collect(Collectors.toList());

// Set operations
Set<Long> premiumUsers = new HashSet<>(getPremiumUserIds());
Set<Long> activeUsers = new HashSet<>(getActiveUserIds());

// Intersection: premium AND active
Set<Long> premiumActive = new HashSet<>(premiumUsers);
premiumActive.retainAll(activeUsers);

// Union: premium OR active
Set<Long> either = new HashSet<>(premiumUsers);
either.addAll(activeUsers);

// Difference: premium but NOT active (lapsed subscriptions)
Set<Long> lapsed = new HashSet<>(premiumUsers);
lapsed.removeAll(activeUsers);`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why is my HashSet allowing "duplicates"?',
      answer: 'Your class does not override equals() and hashCode(). Without these, two objects with the same data are considered different (default Object identity comparison). HashSet uses equals() to check for duplicates and hashCode() to find the right bucket. Override both, or use records (Java 16+) which auto-generate them.',
    },
    {
      question: 'What is the difference between HashSet and TreeSet?',
      answer: 'HashSet: O(1) operations, no ordering, uses hashCode/equals. TreeSet: O(log n) operations, always sorted, uses compareTo/Comparator (not equals/hashCode). Use HashSet when you just need uniqueness and fast lookup. Use TreeSet when you need elements in sorted order or need range queries (headSet, tailSet, subSet).',
    },
  ],
  productionIssues: [
    'Mutating objects stored in HashSet — changing a field used in hashCode() after adding to a HashSet makes the element unfindable. The element is in the wrong bucket.',
    'Missing equals/hashCode — the most common HashSet bug. Always override both for custom classes.',
  ],
  bestPractices: [
    'Always override equals() and hashCode() for objects stored in HashSet.',
    'Use records (Java 16+) for value objects — they auto-generate equals/hashCode.',
    'Use LinkedHashSet when you need deduplication with preserved insertion order.',
    'Use EnumSet for sets of enum values — it is faster than HashSet.',
    'Use Set.copyOf() to create an immutable copy of a HashSet.',
  ],
  architectNote: 'In JPA/Hibernate, use Set<T> (not List<T>) for @ManyToMany and @OneToMany relationships when duplicates are not allowed. However, Hibernate has specific requirements for equals/hashCode in entities: base them on a natural business key (email, SKU) rather than the database-generated ID, because the ID is null before the entity is persisted.',
  faqs: [
    {
      question: 'Is HashSet ordered?',
      answer: 'No. HashSet makes no guarantee about iteration order, and the order can change when the map resizes. If you need insertion order, use LinkedHashSet. If you need sorted order, use TreeSet. If you need a specific custom order, collect to a List and sort.',
    },
  ],
  keyTakeaways: [
    'HashSet is backed by HashMap — all HashMap characteristics apply',
    'O(1) average for add, remove, contains — much faster than List.contains()',
    'Elements must have correct equals() and hashCode()',
    'Never mutate objects after adding them to a HashSet',
    'Use LinkedHashSet for insertion-ordered uniqueness; TreeSet for sorted uniqueness',
    'Use EnumSet for enum values — it is the fastest possible Set implementation',
  ],
  relatedTopics: ['java-collections-set', 'java-hashmap', 'java-collections-list', 'java-comparable-comparator'],
};
