import type { TopicContent } from '../types';

export const javaHeapStack: TopicContent = {
  slug: 'java-heap-stack',
  title: 'Heap & Stack',
  description: 'Java memory model — Heap vs Stack, what lives where, and how understanding this prevents OutOfMemoryErrors and StackOverflowErrors.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The JVM has two main memory areas: the Stack (per-thread, stores method calls and local variables, automatic cleanup) and the Heap (shared, stores all objects, managed by Garbage Collector). When you declare int x = 5, x is on the stack. When you do new Employee(), the Employee object is on the heap and a reference to it is on the stack.',
  whatIsIt: `**Stack Memory:**
- One stack per thread
- Stores: method call frames, local variables (primitives and object references), return addresses
- LIFO (Last In, First Out) — method frames pushed on call, popped on return
- Fixed size (default: 512KB–1MB per thread, configurable with -Xss)
- Automatic management — no GC needed, memory freed when method returns
- Fast: simple pointer increment/decrement
- StackOverflowError when too deep (usually infinite recursion)

**Heap Memory:**
- One heap shared by all threads
- Stores: all objects (new Foo()), arrays, String pool (part of heap)
- Managed by Garbage Collector
- Configurable size: -Xms (initial), -Xmx (maximum)
- Generational structure:
  - **Young Generation** (Eden + Survivor spaces): new objects allocated here
  - **Old Generation** (Tenured): long-lived objects promoted here
  - Minor GC: cleans young generation (fast, frequent)
  - Major/Full GC: cleans old generation (slow, rare)

**Metaspace (Java 8+, was PermGen):**
- Stores class metadata, method bytecode, static variables
- Native memory (not part of heap)
- Grows dynamically (no fixed size by default)

**Code Cache:**
- Stores JIT-compiled native code
- Fixed size, configurable with -XX:ReservedCodeCacheSize`,
  whyWeNeedIt: `Understanding Heap vs Stack is essential for:

- **Diagnosing OutOfMemoryError** — is it heap (too many objects) or stack (too deep recursion)?
- **Understanding GC** — only heap objects are garbage collected
- **Memory leak analysis** — objects on heap that are never GC'd
- **Thread safety** — stack variables are thread-private (safe); heap objects are shared (need synchronization)
- **Performance tuning** — large heaps need tuning; deep stacks need -Xss adjustment`,
  realWorldUsage: `In production:

- OOM: Java heap space — increase -Xmx or find memory leak with heap dump
- OOM: Metaspace — classloader leak, increase -XX:MaxMetaspaceSize
- StackOverflowError — infinite recursion, increase -Xss or fix the recursion
- High GC pause — too many short-lived objects, tune young generation size`,
  howItWorks: `**Object Allocation:**
\`\`\`java
void processOrder(Long orderId) {
    // Stack: frame for processOrder
    // Stack: orderId reference (Long object is on heap)
    
    Order order = new Order(orderId);  // Order object on HEAP
    // Stack: 'order' variable (reference to heap object)
    
    int total = calculateTotal(order); // Stack: new frame for calculateTotal
    // Stack: 'total' int value
    
    // When processOrder returns:
    // Stack frame popped — 'order' reference gone
    // Order object on heap becomes eligible for GC (if no other references)
}
\`\`\`

**Escape Analysis (JIT optimization):**
The JIT compiler can detect that some objects never "escape" the method — they are not returned, stored in fields, or passed to other threads. These objects may be allocated on the stack instead of the heap, eliminating GC pressure. This is transparent to developers but explains why Java's performance is better than naive analysis suggests.`,
  example: {
    title: 'Memory Allocation in Practice',
    description: 'How to diagnose and fix memory issues in production Java.',
    code: [
      {
        label: 'What Lives Where',
        language: 'java',
        code: `public class MemoryDemo {
    // Static field: in Metaspace (class-level, not per-instance)
    private static final String APP_NAME = "MyApp";
    
    // Instance field: on Heap (part of each MemoryDemo object)
    private String name;
    private int count;  // int value stored directly in the object on heap
    
    public void demonstrateMemory() {
        // Local primitive: on Stack
        int localInt = 42;
        
        // Local reference: on Stack; object it points to: on Heap
        String localString = new String("hello");
        
        // String literal: in String Pool (part of Heap)
        String pooled = "hello";  // may reuse existing pool entry
        
        // Array: on Heap (arrays are objects)
        int[] numbers = new int[100];  // array object on heap
        // numbers variable (reference) on stack
        
        // After this method returns:
        // localInt, localString (reference), numbers (reference) popped from stack
        // The String object and int[] array become GC-eligible (if no other refs)
        // APP_NAME stays in Metaspace forever (class-level)
    }
}`,
      },
      {
        label: 'Memory Diagnosis Commands',
        language: 'bash',
        code: `# JVM startup flags for production
java -Xms2g -Xmx4g \                    # heap: 2GB initial, 4GB max
     -XX:+UseG1GC \                      # G1 garbage collector
     -XX:+HeapDumpOnOutOfMemoryError \   # dump heap on OOM
     -XX:HeapDumpPath=/tmp/heap.hprof \  # where to write dump
     -Xlog:gc*:file=gc.log:time,uptime \ # GC logging
     -XX:MaxMetaspaceSize=512m \         # limit Metaspace
     -Xss512k \                          # stack size per thread
     -jar myapp.jar

# Diagnose live JVM
jstat -gcutil <pid> 1000  # GC stats every second
# Output: S0 S1 E O M CCS YGC YGCT FGC FGCT GCT
# E=Eden%, O=Old%, YGC=young GC count, FGC=full GC count

# Heap histogram — what's using memory
jmap -histo <pid> | head -20

# Heap dump for analysis
jmap -dump:format=b,file=heap.hprof <pid>
# Analyze with Eclipse MAT, VisualVM, or JProfiler

# Check for memory leaks in heap dump with Eclipse MAT:
# 1. Open heap.hprof in Eclipse MAT
# 2. Run "Leak Suspects" report
# 3. Look for large object trees that should have been GC'd`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Are all objects always on the heap?',
      answer: 'Mostly yes, but JIT escape analysis can allocate non-escaping objects on the stack. Also, Java 21+ with Valhalla (value types) will allow some objects to be stored inline without heap allocation. For practical purposes, assume new Object() allocates on the heap.',
    },
    {
      question: 'What is the difference between OutOfMemoryError: Java heap space and OutOfMemoryError: Metaspace?',
      answer: 'Heap space OOM: too many objects on the heap — increase -Xmx or fix memory leaks. Metaspace OOM: too many classes loaded — usually a classloader leak (common in app servers with hot deployment) or reflection-heavy frameworks. Increase -XX:MaxMetaspaceSize or fix the classloader leak.',
    },
    {
      question: 'Why does StackOverflowError occur?',
      answer: 'Each method call creates a new stack frame. StackOverflowError occurs when the stack has no more space for new frames. The most common cause is infinite recursion (a method calling itself without a base case). Fix: find the recursion and add a proper base case, or convert to iteration. Rarely, very deep legitimate recursion needs -Xss to increase stack size.',
    },
  ],
  productionIssues: [
    'Memory leak — objects held in static collections (caches, listeners) that are never removed. Use weak references or bounded caches (Caffeine) for caches.',
    'Large heap causing long GC pauses — with G1GC, heaps up to 32GB are manageable. For larger heaps, use ZGC or Shenandoah which have sub-millisecond pauses.',
    'Thread stack memory — each thread uses -Xss memory for its stack. 1000 threads * 512KB = 500MB just for stacks. With virtual threads (Java 21), stack memory per thread is much smaller.',
  ],
  bestPractices: [
    'Set -Xms equal to -Xmx in production to avoid heap resizing pauses.',
    'Always set -XX:+HeapDumpOnOutOfMemoryError in production.',
    'Use G1GC for most applications; ZGC for latency-sensitive large heaps.',
    'Monitor GC activity with -Xlog:gc* and alert on high GC pause times.',
    'Use weak references (WeakHashMap) for caches to allow GC to reclaim entries.',
    'Profile memory usage before and after major releases to catch regressions.',
  ],
  architectNote: 'Memory sizing is not a one-time decision. As your application grows (more users, more data, more features), heap requirements change. Establish memory monitoring from day one: track heap usage over time, GC pause frequency, and Metaspace size. Set alerts at 80% heap usage. A heap dump from production (taken during normal operation) analyzed in Eclipse MAT is the most effective way to understand your application\'s memory profile.',
  faqs: [
    {
      question: 'How do I analyze a heap dump?',
      answer: 'Use Eclipse Memory Analyzer (MAT) or VisualVM. In MAT: (1) Open the .hprof file, (2) Run "Leak Suspects" report — MAT identifies objects that are large and not expected to be retained, (3) Look at "Dominator Tree" to see what objects hold the most memory, (4) Use "OQL" (Object Query Language) to query specific object types. Common finding: a static Map or List holding millions of objects that should have been released.',
    },
  ],
  keyTakeaways: [
    'Stack: per-thread, method frames and local variables, auto-managed, fast',
    'Heap: shared, all objects, GC-managed, configurable with -Xms/-Xmx',
    'Metaspace: class metadata, native memory, replaced PermGen in Java 8',
    'StackOverflowError = too deep recursion; OutOfMemoryError = heap/Metaspace full',
    'Always set -XX:+HeapDumpOnOutOfMemoryError in production',
    'Monitor GC with -Xlog:gc* and alert on high pause times',
  ],
  relatedTopics: ['java-jvm', 'java-garbage-collection', 'java-threads', 'java-architecture'],
};

export const javaGarbageCollection: TopicContent = {
  slug: 'java-garbage-collection',
  title: 'Garbage Collection',
  description: 'Java Garbage Collection — how GC works, G1GC vs ZGC, tuning for production, and diagnosing GC-related performance issues.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Garbage Collection automatically frees memory occupied by objects that are no longer reachable. You create objects with new; the GC cleans them up when nothing references them. The GC runs in background threads and occasionally pauses your application (Stop-The-World) to safely collect garbage. Modern GCs (G1GC, ZGC) minimize these pauses.',
  whatIsIt: `**Generational Hypothesis:**
Most objects die young. GC is optimized for this:
- **Young Generation** (Eden + S0 + S1): new objects allocated here; Minor GC cleans it frequently and fast
- **Old Generation** (Tenured): objects that survived multiple Minor GCs; Major GC cleans it rarely but slowly

**GC Algorithms:**

**Serial GC** (-XX:+UseSerialGC)
- Single-threaded; Stop-The-World for all collections
- For single-CPU machines and small heaps only

**Parallel GC** (-XX:+UseParallelGC)
- Multi-threaded; still Stop-The-World
- Default in Java 8; good throughput, higher pauses

**G1GC** (-XX:+UseG1GC)
- Default in Java 9+
- Divides heap into equal-sized regions
- Concurrent marking with short STW pauses
- Targets pause time goal (-XX:MaxGCPauseMillis=200)
- Good for heaps 4GB–32GB

**ZGC** (-XX:+UseZGC)
- Java 15+ production-ready; sub-millisecond STW pauses
- Fully concurrent — almost no STW
- Works for heaps from 8MB to 16TB
- Best for latency-sensitive applications

**Shenandoah** (-XX:+UseShenandoahGC)
- Similar to ZGC; available in OpenJDK builds
- Sub-millisecond pauses; fully concurrent`,
  whyWeNeedIt: `Without GC, developers must manually free memory (like C/C++):
- malloc() to allocate; free() to release
- Forgetting free() = memory leak
- Double-free() = crash
- Use-after-free = security vulnerability

Java's GC eliminates these entire categories of bugs. The tradeoff: GC pauses and overhead. Modern GCs have reduced this tradeoff to near-zero for most applications.`,
  realWorldUsage: `GC tuning is a real production concern:

- High GC frequency = too many short-lived objects (fix: reduce object allocation)
- Long GC pauses = old generation too full (fix: increase heap, tune GC)
- GC CPU overhead > 5% = GC working too hard (fix: heap tuning, reduce allocation)
- Memory leak = heap grows until OOM (fix: heap dump analysis)`,
  howItWorks: `**Minor GC (Young Generation):**
1. Objects allocated in Eden
2. When Eden is full, Minor GC runs
3. Live objects copied to Survivor space (S0)
4. Next Minor GC: live objects from Eden + S0 copied to S1
5. After N collections (default: 15), promoted to Old Generation
6. Eden and empty Survivor space cleared

**Major/Full GC (Old Generation):**
1. Triggered when Old Generation fills up
2. Mark all live objects (may be concurrent in G1/ZGC)
3. Compact/collect garbage
4. Stop-The-World pause (shorter in G1, near-zero in ZGC)

**GC Roots (starting points for reachability analysis):**
- Local variables on stack
- Static fields
- JNI references
- Active threads`,
  example: {
    title: 'GC Tuning and Monitoring',
    description: 'How to tune and monitor GC in production Java applications.',
    code: [
      {
        label: 'Production GC Configuration',
        language: 'bash',
        code: `# G1GC — recommended for most applications
java -Xms4g -Xmx4g \
     -XX:+UseG1GC \
     -XX:MaxGCPauseMillis=200 \    # target max pause (best effort)
     -XX:G1HeapRegionSize=16m \    # region size (1m-32m, power of 2)
     -XX:InitiatingHeapOccupancyPercent=45 \ # start concurrent marking at 45%
     -Xlog:gc*:file=gc.log:time,uptime,level \
     -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/logs/heap.hprof \
     -jar app.jar

# ZGC — for latency-sensitive applications (Java 15+)
java -Xms8g -Xmx8g \
     -XX:+UseZGC \
     -XX:SoftMaxHeapSize=6g \      # soft limit, ZGC tries to stay under this
     -Xlog:gc*:file=gc.log:time,uptime,level \
     -jar app.jar

# Container-aware settings (Docker/Kubernetes)
java -XX:+UseContainerSupport \    # respect container memory limits (default Java 10+)
     -XX:MaxRAMPercentage=75.0 \   # use 75% of container memory for heap
     -XX:+UseG1GC \
     -jar app.jar`,
      },
      {
        label: 'GC-Friendly Code Patterns',
        language: 'java',
        code: `// Pattern 1: Reduce object allocation in hot paths
// BAD: creates new StringBuilder on every call
public String buildKey(String prefix, Long id) {
    return new StringBuilder(prefix).append(":").append(id).toString();
}

// GOOD: String.format or formatted() — JIT can optimize this
public String buildKey(String prefix, Long id) {
    return prefix + ":" + id;  // JIT often optimizes this to no allocation
}

// Pattern 2: Reuse objects in tight loops
// BAD: creates new BigDecimal on every iteration
BigDecimal total = BigDecimal.ZERO;
for (Order order : orders) {
    total = total.add(new BigDecimal(order.getAmount()));  // new object each time
}

// GOOD: use long arithmetic where possible
long totalCents = 0;
for (Order order : orders) {
    totalCents += order.getAmountInCents();  // no object allocation
}
BigDecimal total = BigDecimal.valueOf(totalCents, 2);  // one allocation at end

// Pattern 3: Object pooling for expensive objects
// Apache Commons Pool for expensive-to-create objects
GenericObjectPool<Connection> pool = new GenericObjectPool<>(factory);
Connection conn = pool.borrowObject();
try {
    // use connection
} finally {
    pool.returnObject(conn);  // return to pool, not GC'd
}

// Pattern 4: Avoid finalizers (cause GC overhead)
// BAD: finalizer delays GC
class BadResource {
    @Override
    protected void finalize() { cleanup(); }  // avoid!
}

// GOOD: implement AutoCloseable
class GoodResource implements AutoCloseable {
    @Override
    public void close() { cleanup(); }  // deterministic cleanup
}
// Use with try-with-resources`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does calling System.gc() force garbage collection?',
      answer: 'System.gc() is a hint to the JVM to run GC — it does not guarantee it will happen, and the JVM may ignore it. Calling it explicitly is almost never the right solution. If you are having memory issues, fix the root cause (memory leak, heap too small) rather than trying to force GC.',
    },
    {
      question: 'What is a Stop-The-World pause?',
      answer: 'A Stop-The-World (STW) pause freezes all application threads so the GC can safely inspect the heap without objects moving around. During STW, your application is completely unresponsive. Modern GCs (G1, ZGC) minimize STW by doing most work concurrently while the application runs. ZGC achieves sub-millisecond STW even on terabyte heaps.',
    },
    {
      question: 'Why does increasing heap size sometimes make GC worse?',
      answer: 'A larger heap means more objects to scan during Full GC, which means longer pauses. With a 1GB heap, a Full GC might take 1 second. With a 32GB heap, it might take 30 seconds. G1GC and ZGC are designed for large heaps. For G1GC, keep heap under 32GB. For larger heaps, use ZGC.',
    },
  ],
  productionIssues: [
    'GC overhead limit exceeded — GC spending more than 98% of time collecting less than 2% of heap. Usually a memory leak. Analyze with heap dump.',
    'Promotion failure in G1GC — Old Generation fills up during Minor GC, triggering Full GC. Increase heap or tune -XX:InitiatingHeapOccupancyPercent.',
    'Humongous allocations in G1GC — objects larger than 50% of region size go directly to Old Generation, bypassing Young. Tune -XX:G1HeapRegionSize or reduce large object allocations.',
  ],
  bestPractices: [
    'Use G1GC for most applications (default Java 9+); ZGC for latency-sensitive or large heaps.',
    'Set -Xms = -Xmx to prevent heap resizing pauses.',
    'Enable GC logging in production: -Xlog:gc*:file=gc.log:time,uptime',
    'Monitor GC pause time and frequency — alert when pauses exceed SLA.',
    'Reduce object allocation in hot paths — the best GC is no GC.',
    'Use -XX:+HeapDumpOnOutOfMemoryError for automatic heap dump on OOM.',
  ],
  architectNote: 'GC tuning is the last resort, not the first. The best way to reduce GC pressure is to allocate fewer objects: use primitives instead of wrappers, reuse objects, use streaming instead of materializing large collections, and avoid unnecessary String concatenation in loops. Profile your application\'s allocation rate with JFR (Java Flight Recorder) before tuning GC settings.',
  faqs: [
    {
      question: 'What is Java Flight Recorder (JFR)?',
      answer: 'JFR is a low-overhead profiling and monitoring tool built into the JDK (free since Java 11). It records JVM events: GC activity, thread states, CPU usage, memory allocation, I/O. Start with: java -XX:+FlightRecorder -XX:StartFlightRecording=duration=60s,filename=recording.jfr -jar app.jar. Analyze with JDK Mission Control (JMC). It is the most powerful tool for understanding production JVM behavior.',
    },
    {
      question: 'What is the difference between Minor GC and Full GC?',
      answer: 'Minor GC (Young GC) cleans only the Young Generation — it is fast (milliseconds) and frequent. Full GC cleans the entire heap including Old Generation — it is slow (seconds for large heaps) and should be rare. If you see frequent Full GCs, your Old Generation is filling up: either there is a memory leak, the heap is too small, or too many objects are being promoted from Young to Old.',
    },
  ],
  keyTakeaways: [
    'GC automatically frees unreachable objects — no manual memory management',
    'Generational GC: Young (frequent, fast Minor GC) + Old (rare, slow Major GC)',
    'G1GC: default Java 9+, good for 4-32GB heaps; ZGC: sub-millisecond pauses',
    'Set -Xms = -Xmx; enable GC logging; set HeapDumpOnOutOfMemoryError',
    'The best GC optimization is reducing object allocation',
    'Use JFR for production profiling and GC analysis',
  ],
  relatedTopics: ['java-heap-stack', 'java-jvm', 'java-threads', 'java-architecture'],
};
