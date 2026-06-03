import type { TopicContent } from '../types';

export const javaArchitecture: TopicContent = {
  slug: 'java-architecture',
  title: 'Java Architecture',
  description: 'Understand how Java is designed to be platform-independent — the Write Once, Run Anywhere principle, and how the JDK, JRE, and JVM fit together.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Java source code (.java) is compiled into bytecode (.class) by the Java Compiler. That bytecode runs on any machine that has a JVM installed. This is the Write Once, Run Anywhere promise — the JVM is the bridge between your code and the operating system.',
  whatIsIt: `Java Architecture describes the complete pipeline from writing code to executing it:

**1. Source Code (.java)**
Human-readable Java code you write in an IDE.

**2. Java Compiler (javac)**
Converts .java files into .class files containing platform-neutral bytecode.

**3. Bytecode (.class)**
Not machine code, not source code — an intermediate representation that any JVM understands.

**4. JVM (Java Virtual Machine)**
Interprets or JIT-compiles bytecode into native machine instructions at runtime.

**5. JRE (Java Runtime Environment)**
JVM + standard class libraries. Enough to run Java programs.

**6. JDK (Java Development Kit)**
JRE + compiler + debugger + tools. Needed to develop Java programs.

**7. Class Loader**
Loads .class files into memory when needed — not all at startup.

**8. JIT Compiler (Just-In-Time)**
HotSpot JVM identifies frequently executed code (hot paths) and compiles them to native machine code for speed.`,
  whyWeNeedIt: `Before Java, code written for Windows wouldn't run on Linux without recompilation or rewriting. Java solved this with the JVM abstraction layer:

- **Platform independence** — one JAR runs on Windows, Linux, macOS, embedded devices
- **Security** — bytecode verification before execution prevents malicious code
- **Automatic memory management** — Garbage Collector frees developers from manual malloc/free
- **Ecosystem** — JVM hosts Kotlin, Scala, Groovy — all compile to the same bytecode

In enterprise projects, this means you build one artifact (JAR/WAR) and deploy it to any server without recompilation.`,
  realWorldUsage: `In a real enterprise project:

- Your CI/CD pipeline runs \`mvn package\` which invokes \`javac\` to produce a JAR
- That JAR is deployed to a Linux server (even if developers use macOS)
- The JVM on that server runs it without any code changes
- JVM flags like \`-Xmx4g -Xms2g\` control heap memory for the production server
- APM tools (Dynatrace, New Relic) attach as JVM agents to monitor performance
- GC logs are analyzed when production has memory issues

You'll tune JVM settings in Dockerfile or startup scripts:
\`\`\`bash
java -Xmx4g -Xms2g -XX:+UseG1GC -jar myapp.jar
\`\`\``,
  howItWorks: `**Compilation Phase:**
1. You run \`javac HelloWorld.java\`
2. Compiler checks syntax, resolves types, generates \`HelloWorld.class\`
3. .class file contains bytecode — a stack-based instruction set

**Runtime Phase:**
1. You run \`java HelloWorld\`
2. JVM's Class Loader loads HelloWorld.class + dependencies
3. Bytecode Verifier checks the code is safe
4. Interpreter begins executing bytecode
5. JIT Compiler detects hot methods, compiles to native code
6. Garbage Collector runs in background threads managing heap

**Memory Areas:**
- **Heap** — objects live here (GC manages this)
- **Stack** — method call frames, local variables (per thread)
- **Metaspace** — class metadata (replaced PermGen in Java 8)
- **Code Cache** — JIT-compiled native code`,
  example: {
    title: 'Java Architecture in Action',
    description: 'Tracing a simple program through the full Java pipeline.',
    code: [
      {
        label: 'Source Code',
        language: 'java',
        code: `// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        String message = "Hello, Enterprise!";
        System.out.println(message);
    }
}`,
      },
      {
        label: 'Compile & Run',
        language: 'bash',
        code: `# Compile: produces HelloWorld.class
javac HelloWorld.java

# View bytecode (human-readable disassembly)
javap -c HelloWorld.class

# Run on JVM
java HelloWorld

# Run with JVM tuning (production style)
java -Xmx512m -Xms256m -XX:+UseG1GC HelloWorld`,
      },
      {
        label: 'JVM Flags Cheatsheet',
        language: 'bash',
        code: `# Heap size
-Xmx4g          # max heap 4GB
-Xms2g          # initial heap 2GB

# GC selection
-XX:+UseG1GC    # G1 GC (default Java 9+)
-XX:+UseZGC     # ZGC (low-latency, Java 15+)

# GC logging (production must-have)
-Xlog:gc*:file=gc.log:time,uptime

# Thread stack size
-Xss512k

# Enable JMX for monitoring
-Dcom.sun.management.jmxremote`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Java compiled or interpreted?',
      answer: 'Both. Java source is compiled to bytecode (compiled step). The JVM then interprets bytecode OR JIT-compiles hot paths to native code (interpreted/compiled step). Modern JVMs are primarily JIT-compiled for performance.',
    },
    {
      question: 'What is the difference between JDK, JRE, and JVM?',
      answer: 'JVM runs bytecode. JRE = JVM + standard libraries (enough to run apps). JDK = JRE + compiler + tools (needed to develop). As a developer you install the JDK. Since Java 11, Oracle no longer ships a standalone JRE — you use the JDK everywhere.',
    },
    {
      question: 'Does Java truly run identically on all platforms?',
      answer: 'Mostly yes, but edge cases exist: file path separators (/ vs \\), line endings, locale-sensitive operations, and native code via JNI are platform-specific. Pure Java code with no native dependencies is genuinely portable.',
    },
  ],
  productionIssues: [
    'OutOfMemoryError: Java heap space — heap is too small for the workload. Fix: increase -Xmx or find memory leaks with heap dump analysis.',
    'High CPU from GC — GC spending more time collecting than your app spends working. Fix: tune GC, reduce object allocation, switch to G1GC or ZGC.',
    'Slow startup time — Class loading and JIT warmup takes time. Fix: use GraalVM Native Image for instant startup, or JVM class data sharing (-Xshare:on).',
    'Metaspace OOM — Too many classes loaded (common with reflection-heavy frameworks). Fix: increase -XX:MaxMetaspaceSize or fix classloader leaks.',
  ],
  bestPractices: [
    'Always set both -Xms and -Xmx to the same value in production to avoid heap resizing pauses.',
    'Use G1GC (Java 9+) as default; switch to ZGC for latency-sensitive applications (Java 17+).',
    'Enable GC logging in production — it is the first diagnostic tool for memory issues.',
    'Use LTS releases (Java 8, 11, 17, 21) in production for long-term support.',
    'Profile before optimizing — JVM JIT is excellent; most optimization is premature.',
  ],
  architectNote: 'In microservices, JVM startup time matters. A traditional JVM app takes 5–30 seconds to start. For Lambda/serverless or rapid scaling, consider GraalVM Native Image (compiles to native binary, starts in milliseconds). For long-running services, standard JVM with JIT is faster at peak throughput than native image. Choose based on your scaling pattern.',
  faqs: [
    {
      question: 'Which Java version should I use in 2025?',
      answer: 'Java 21 (LTS) for new projects. Java 17 (LTS) if your ecosystem has not caught up. Avoid Java 8 for new projects — it lacks records, sealed classes, text blocks, and modern APIs. Check your framework compatibility: Spring Boot 3.x requires Java 17+.',
    },
    {
      question: 'What is GraalVM and when should I use it?',
      answer: 'GraalVM is an alternative JVM with a Native Image compiler that AOT-compiles Java to a native binary. Use it for serverless functions, CLIs, and microservices where fast startup and low memory are critical. Avoid it for applications that rely heavily on reflection, dynamic class loading, or JVM-specific profiling tools.',
    },
    {
      question: 'What is the difference between HotSpot JVM and OpenJ9?',
      answer: 'HotSpot (Oracle/OpenJDK) is the standard JVM — best peak throughput. OpenJ9 (IBM/Eclipse) uses less memory at startup and is faster to start, at the cost of slightly lower peak throughput. For cloud deployments where memory cost matters, OpenJ9 is worth evaluating.',
    },
  ],
  keyTakeaways: [
    'Java compiles to bytecode, not native machine code — the JVM handles the platform translation',
    'JDK = development tools + JRE; JRE = JVM + standard libraries',
    'JIT compilation makes Java fast for long-running applications',
    'JVM memory: Heap (objects), Stack (frames), Metaspace (class metadata)',
    'Always tune -Xmx and enable GC logging in production',
    'Use Java 17 or 21 LTS for new projects',
  ],
  relatedTopics: ['java-jvm', 'java-jdk-jre', 'java-heap-stack', 'java-garbage-collection'],
};

export const javaJvm: TopicContent = {
  slug: 'java-jvm',
  title: 'JVM',
  description: 'Deep dive into the Java Virtual Machine — class loading, memory model, JIT compilation, and how the JVM turns bytecode into running software.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The JVM is the engine that runs your Java program. It loads your .class files, manages memory automatically, and compiles frequently-used code to native machine instructions for speed. Understanding the JVM is what separates junior developers from senior ones in production debugging.',
  whatIsIt: `The JVM (Java Virtual Machine) is an abstract computing machine with three main subsystems:

**Class Loader Subsystem**
- Bootstrap ClassLoader — loads core Java classes (java.lang.*) from rt.jar
- Extension ClassLoader — loads from jre/lib/ext
- Application ClassLoader — loads your application classes from classpath
- Custom ClassLoaders — used by OSGi, application servers, hot-reload frameworks

**Runtime Data Areas**
- **Heap** — shared across all threads; objects and arrays live here; GC manages it
- **Stack** — per-thread; holds stack frames (local variables, operand stack, frame data)
- **PC Register** — per-thread; points to current bytecode instruction
- **Native Method Stack** — for native (C/C++) method calls via JNI
- **Metaspace** — class structures, method metadata; grows dynamically

**Execution Engine**
- Interpreter — executes bytecode instruction by instruction (slow but immediate)
- JIT Compiler — compiles hot methods to native code (fast after warmup)
- Garbage Collector — reclaims unreachable objects

**JIT Compilation Tiers (HotSpot):**
- Tier 1: Simple JIT compilation
- Tier 2: Limited profiling
- Tier 3: Full profiling
- Tier 4: Aggressive optimizations (C2 compiler)`,
  whyWeNeedIt: `The JVM gives Java several superpowers:

- **Platform independence** — same bytecode runs on any OS with a JVM
- **Automatic memory management** — no manual malloc/free, no dangling pointers
- **Security** — bytecode verification prevents buffer overflows and type confusion
- **Performance** — JIT compiler achieves near-C++ speed for long-running apps
- **Observability** — JVM exposes metrics via JMX, making monitoring straightforward

For enterprise developers, understanding JVM internals is essential for diagnosing production incidents — OOM errors, GC pauses, thread deadlocks, and CPU spikes all require JVM knowledge to debug.`,
  realWorldUsage: `You interact with the JVM daily even if you don't realize it:

- Configuring heap in Docker: \`ENV JAVA_OPTS="-Xmx2g -Xms2g"\`
- Analyzing heap dumps with Eclipse MAT or VisualVM when production OOMs
- Reading thread dumps to diagnose deadlocks
- Tuning GC when response times degrade
- Using jstack, jmap, jstat for live JVM diagnostics
- JVM flags in Kubernetes pod specs via environment variables`,
  howItWorks: `**Class Loading (3 phases):**
1. **Loading** — finds and reads the .class file
2. **Linking** — Verification (is bytecode valid?), Preparation (allocate static fields), Resolution (resolve symbolic references)
3. **Initialization** — run static initializers, set static field values

**Garbage Collection (simplified):**
1. Objects are allocated in Eden (young generation)
2. Surviving objects move to Survivor spaces (S0/S1)
3. Long-lived objects are promoted to Old Generation (tenured)
4. Minor GC: cleans young generation (fast, frequent)
5. Major/Full GC: cleans old generation (slow, infrequent)

**JIT Compilation:**
1. Methods start interpreted
2. HotSpot counts invocations (default: 10,000 for C2)
3. Hot methods are compiled to native code
4. Compiled code is cached in Code Cache
5. Deoptimization can revert to interpreter if assumptions change`,
  example: {
    title: 'JVM Diagnostics in Practice',
    description: 'Essential JVM diagnostic commands every senior developer uses.',
    code: [
      {
        label: 'JVM Diagnostic Commands',
        language: 'bash',
        code: `# Find Java process ID
jps -l

# Thread dump — diagnose deadlocks, stuck threads
jstack <pid> > thread-dump.txt

# Heap dump — diagnose OOM, memory leaks
jmap -dump:format=b,file=heap.hprof <pid>

# GC stats — live GC activity
jstat -gcutil <pid> 1000   # every 1 second

# JVM flags in use
java -XX:+PrintFlagsFinal -version | grep HeapSize

# Heap histogram (top object types by count)
jmap -histo <pid> | head -30`,
      },
      {
        label: 'Class Loading Example',
        language: 'java',
        code: `// Custom ClassLoader — used in plugin systems, hot reload
public class PluginClassLoader extends URLClassLoader {
    public PluginClassLoader(URL[] urls) {
        super(urls, null); // null parent = isolated loading
    }
    
    @Override
    protected Class<?> loadClass(String name, boolean resolve)
            throws ClassNotFoundException {
        Class<?> loaded = findLoadedClass(name);
        if (loaded != null) return loaded;
        
        // Try our URLs first (child-first loading)
        try {
            return findClass(name);
        } catch (ClassNotFoundException e) {
            // Fall back to parent classloader
            return super.loadClass(name, resolve);
        }
    }
}

// Usage: load a plugin JAR in isolation
URL pluginJar = new File("plugin.jar").toURI().toURL();
try (PluginClassLoader loader = new PluginClassLoader(new URL[]{pluginJar})) {
    Class<?> pluginClass = loader.loadClass("com.example.Plugin");
    Object plugin = pluginClass.getDeclaredConstructor().newInstance();
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between Stack and Heap?',
      answer: 'Stack stores method call frames and primitive local variables — it is thread-private, fast, and automatically freed when the method returns. Heap stores all objects — it is shared across threads, managed by GC, and is where memory leaks occur. When you do new Object(), the object goes on the heap; the reference variable goes on the stack.',
    },
    {
      question: 'Does the JVM run one thread or many?',
      answer: 'Many. Beyond your application threads, the JVM runs GC threads, JIT compiler threads, finalizer thread, and signal dispatcher threads. A typical JVM process has 20–50 threads even for a simple app. Use jstack to see them all.',
    },
    {
      question: 'What replaced PermGen in Java 8?',
      answer: 'Metaspace. PermGen was a fixed-size region in the heap for class metadata — it caused frequent OutOfMemoryError: PermGen space. Metaspace is native memory (off-heap) and grows dynamically. It can still OOM if you have classloader leaks, but it is much more manageable.',
    },
  ],
  productionIssues: [
    'GC pause causing request timeouts — long Stop-The-World pauses freeze all threads. Switch to G1GC or ZGC for low-latency requirements.',
    'ClassLoader leak in application servers — redeploying WAR files without proper cleanup causes Metaspace to grow until OOM. Always test hot redeployment.',
    'Code Cache full — JIT stops compiling new methods, app falls back to interpreter and slows down. Fix: -XX:ReservedCodeCacheSize=512m.',
    'Native memory leak — off-heap memory (DirectByteBuffer, JNI) not released. Use -XX:NativeMemoryTracking=summary to diagnose.',
  ],
  bestPractices: [
    'Use G1GC (-XX:+UseG1GC) for most applications; ZGC (-XX:+UseZGC) for sub-millisecond pause requirements.',
    'Always capture thread dumps and heap dumps when production incidents occur.',
    'Set -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heap.hprof in all production JVMs.',
    'Monitor GC pause time, not just frequency.',
    'Use container-aware JVM flags in Docker: -XX:+UseContainerSupport (default Java 10+).',
  ],
  architectNote: 'The JVM is a shared resource. In microservices, each service gets its own JVM process — this is intentional isolation. In a monolith on an app server (Tomcat, WildFly), multiple apps share one JVM, which means one misbehaving app can OOM the entire server. Container-per-service architectures solve this at the cost of more memory overhead. The JVM overhead (typically 200–500MB base) is the main reason Node.js and Go gained popularity for microservices.',
  faqs: [
    {
      question: 'How do I read a thread dump?',
      answer: 'Look for threads in BLOCKED state (waiting for a lock held by another thread) — these indicate deadlocks or contention. WAITING threads are parked waiting for a signal. RUNNABLE threads are actively executing. Tools like FastThread.io or IBM Thread Analyzer visualize thread dumps automatically.',
    },
    {
      question: 'What is Stop-The-World in GC?',
      answer: 'A Stop-The-World (STW) pause halts all application threads so the GC can safely inspect the heap. Modern GCs (G1, ZGC, Shenandoah) minimize STW by doing most work concurrently. ZGC achieves sub-millisecond STW pauses even on multi-terabyte heaps.',
    },
  ],
  keyTakeaways: [
    'JVM has three main subsystems: Class Loader, Runtime Data Areas, Execution Engine',
    'Heap is shared (GC managed); Stack is per-thread (auto freed)',
    'JIT compiles hot methods to native code after ~10,000 invocations',
    'Always configure -XX:+HeapDumpOnOutOfMemoryError in production',
    'G1GC is the default and best general-purpose GC for Java 9+',
    'jstack, jmap, jstat are your first tools for production JVM diagnosis',
  ],
  relatedTopics: ['java-architecture', 'java-heap-stack', 'java-garbage-collection', 'java-threads'],
};

export const javaJdkJre: TopicContent = {
  slug: 'java-jdk-jre',
  title: 'JDK vs JRE',
  description: 'Understand the difference between JDK and JRE, which distributions to use, and how to manage multiple Java versions in enterprise projects.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'JRE (Java Runtime Environment) is what you need to run Java programs. JDK (Java Development Kit) is what you need to develop Java programs — it includes the JRE plus the compiler (javac), debugger (jdb), and other development tools. As a developer, you always install the JDK.',
  whatIsIt: `**JRE — Java Runtime Environment**
Contains:
- JVM (the engine that runs bytecode)
- Java Class Library (java.lang, java.util, java.io, etc.)
- Supporting files and configuration

Used by: end users running Java applications, production servers (historically)

**JDK — Java Development Kit**
Contains everything in JRE plus:
- \`javac\` — Java compiler
- \`javadoc\` — documentation generator
- \`jar\` — archive tool
- \`jdb\` — Java debugger
- \`jshell\` — interactive REPL (Java 9+)
- \`jconsole\`, \`jvisualvm\` — monitoring tools
- \`jstack\`, \`jmap\`, \`jstat\` — diagnostic tools

Used by: developers, CI/CD pipelines, build servers

**JDK Distributions (2025)**
- **OpenJDK** — open-source reference implementation (free)
- **Eclipse Temurin** (Adoptium) — most popular free distribution for production
- **Amazon Corretto** — AWS-optimized, free, LTS patches
- **Microsoft Build of OpenJDK** — Azure-optimized
- **Oracle JDK** — commercial license required for production (Java 17+)
- **GraalVM** — includes native image compiler
- **Azul Zulu** — certified builds with extended support`,
  whyWeNeedIt: `Understanding JDK vs JRE matters for:

- **Docker images** — use JRE-based images for production (smaller), JDK for build stages
- **CI/CD** — build agents need JDK; runtime containers need JRE
- **License compliance** — Oracle JDK requires a commercial license; use Temurin/Corretto for free
- **Version management** — enterprise projects often have multiple Java versions; tools like SDKMAN manage this`,
  realWorldUsage: `In a real enterprise Dockerfile (multi-stage build):

\`\`\`dockerfile
# Stage 1: Build with JDK
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests

# Stage 2: Run with JRE (smaller image)
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/target/app.jar .
CMD ["java", "-jar", "app.jar"]
\`\`\`

The JRE image is typically 100–150MB smaller than the JDK image.`,
  howItWorks: `**Since Java 11**, Oracle stopped shipping a standalone JRE. The JDK is now used everywhere. However, you can create a custom minimal runtime using \`jlink\`:

\`\`\`bash
# Create a minimal JRE containing only the modules your app needs
jlink --module-path $JAVA_HOME/jmods \\
  --add-modules java.base,java.logging,java.sql \\
  --output my-custom-jre
\`\`\`

This produces a runtime as small as 30MB, much smaller than a full JDK.

**Version Management with SDKMAN:**
\`\`\`bash
sdk install java 21.0.1-tem   # Eclipse Temurin 21
sdk install java 17.0.9-tem   # Eclipse Temurin 17
sdk use java 17.0.9-tem       # switch for current session
sdk default java 21.0.1-tem   # set default
\`\`\``,
  example: {
    title: 'JDK Tools in Practice',
    description: 'The JDK tools you will use daily as a backend developer.',
    code: [
      {
        label: 'Essential JDK Tools',
        language: 'bash',
        code: `# Check installed Java version
java -version
javac -version

# jshell — interactive Java REPL (great for testing snippets)
jshell
jshell> var list = List.of(1, 2, 3);
jshell> list.stream().mapToInt(x -> x).sum()
$2 ==> 6

# jar — inspect a JAR file
jar tf myapp.jar           # list contents
jar xf myapp.jar           # extract

# javap — disassemble bytecode
javap -c MyClass.class
javap -verbose MyClass.class

# jdeps — analyze dependencies
jdeps --print-module-deps myapp.jar

# jlink — create minimal custom JRE
jlink --add-modules java.base,java.net.http \\
  --output custom-jre --strip-debug --compress=2`,
      },
      {
        label: 'Multi-Stage Dockerfile',
        language: 'dockerfile',
        code: `# Best practice: JDK for build, JRE for runtime
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN ./mvnw package -DskipTests -q

# Production image — JRE only, much smaller
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
WORKDIR /app
COPY --from=builder /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-jar", "app.jar"]`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do I need to install both JDK and JRE?',
      answer: 'No. JDK includes everything in JRE. Install only the JDK. Since Java 11, standalone JRE distributions from Oracle no longer exist anyway.',
    },
    {
      question: 'Is Oracle JDK still free?',
      answer: 'Oracle JDK is free for development and personal use, but requires a paid subscription for production use (since Java 17). For free production use, use Eclipse Temurin (Adoptium), Amazon Corretto, or Microsoft Build of OpenJDK — all are OpenJDK-based and fully compatible.',
    },
  ],
  productionIssues: [
    'Wrong Java version in production — always pin exact versions in Dockerfiles and CI pipelines. Use .java-version or .sdkmanrc files in your repo.',
    'Large Docker images — using JDK in production image adds ~300MB unnecessarily. Use multi-stage builds with JRE for runtime.',
    'License violations — accidentally using Oracle JDK in production without a subscription. Audit your Docker base images.',
  ],
  bestPractices: [
    'Use Eclipse Temurin (Adoptium) or Amazon Corretto for free, production-grade JDK distributions.',
    'Pin exact Java versions in Dockerfiles: eclipse-temurin:21.0.1_12-jre, not eclipse-temurin:latest.',
    'Use multi-stage Docker builds: JDK for build stage, JRE for runtime stage.',
    'Use SDKMAN for local version management across multiple projects.',
    'Use LTS versions (8, 11, 17, 21) in production for guaranteed long-term patches.',
  ],
  architectNote: 'For new microservices in 2025, use Java 21 LTS with Eclipse Temurin. The virtual threads feature (Project Loom, GA in Java 21) is a game-changer for I/O-bound services — it allows millions of concurrent lightweight threads without the overhead of OS threads, eliminating the need for reactive programming in most cases.',
  faqs: [
    {
      question: 'What is the difference between OpenJDK and Oracle JDK?',
      answer: 'OpenJDK is the open-source reference implementation. Oracle JDK was historically built from OpenJDK with some extra features and better support. Since Java 17, Oracle JDK and OpenJDK are functionally identical. The only difference is the license — Oracle JDK requires a commercial subscription for production.',
    },
    {
      question: 'What are virtual threads (Project Loom)?',
      answer: 'Virtual threads (Java 21) are lightweight threads managed by the JVM, not the OS. You can create millions of them with minimal overhead. They make blocking I/O as efficient as async code without the complexity of reactive programming. Spring Boot 3.2+ supports virtual threads natively.',
    },
  ],
  keyTakeaways: [
    'JDK = JRE + compiler + tools; always install JDK as a developer',
    'Since Java 11, no standalone JRE — use JDK everywhere or create one with jlink',
    'Use Eclipse Temurin or Amazon Corretto for free production use',
    'Multi-stage Docker builds: JDK for build, JRE for runtime',
    'Use LTS versions (11, 17, 21) in production',
    'Java 21 virtual threads are a major reason to upgrade',
  ],
  relatedTopics: ['java-architecture', 'java-jvm', 'java-heap-stack'],
};

export const javaDataTypes: TopicContent = {
  slug: 'java-data-types',
  title: 'Data Types',
  description: 'Master Java data types — primitives vs objects, type casting, autoboxing, and the gotchas that cause bugs in production.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Java has two categories of data types: primitives (int, boolean, double, etc.) that store values directly on the stack, and reference types (String, Integer, List, etc.) that store a pointer to an object on the heap. This distinction affects performance, null safety, and how == works.',
  whatIsIt: `**Primitive Types (8 total)**
- byte: 8-bit signed, range -128 to 127
- short: 16-bit signed, range -32,768 to 32,767
- int: 32-bit signed, range -2^31 to 2^31-1 (default for integers)
- long: 64-bit signed, use L suffix: 100L
- float: 32-bit IEEE 754, use f suffix: 3.14f
- double: 64-bit IEEE 754 (default for decimals)
- char: 16-bit Unicode character, range 0 to 65,535
- boolean: true or false

**Reference Types**
- **String** — immutable sequence of characters
- **Wrapper Classes** — Integer, Long, Double, Boolean, etc. (primitives as objects)
- **Arrays** — fixed-size ordered collection
- **Classes/Interfaces** — any object type

**Type Hierarchy**
- All reference types extend Object
- Primitives do NOT extend Object (this is why generics don't support primitives directly)`,
  whyWeNeedIt: `Primitives exist for performance:
- An int is 4 bytes on the stack — direct value access
- An Integer is an object on the heap — pointer + object header overhead (~16 bytes)
- For a list of 1 million numbers, int[] uses ~4MB; List<Integer> uses ~20MB+

Reference types exist for:
- Null representation (primitives cannot be null)
- Object-oriented features (methods, inheritance)
- Collections API compatibility (generics require objects)
- Nullable database columns (Integer can be null, int cannot)`,
  realWorldUsage: `Common patterns in enterprise code:

- **Database mapping** — use Integer (not int) for nullable columns
- **Financial calculations** — use BigDecimal (not double) for money
- **Bit flags** — use int or long for performance-critical flags
- **Enums** — prefer over int constants for type safety
- **var keyword** — use for local type inference (Java 10+)`,
  howItWorks: `**Autoboxing/Unboxing**
Java automatically converts between primitives and wrappers:
\`\`\`java
Integer boxed = 42;        // autoboxing: int -> Integer
int primitive = boxed;     // unboxing: Integer -> int
\`\`\`

**Integer Cache (-128 to 127)**
Java caches Integer objects from -128 to 127. This is why == works for small integers but fails for larger ones — a classic interview trap.

**String Pool**
String literals are interned in the String Pool (part of Heap). Two literals with the same value share the same object. new String("hello") bypasses the pool.`,
  example: {
    title: 'Data Type Gotchas and Best Practices',
    description: 'The bugs that trip up developers who do not understand Java type internals.',
    code: [
      {
        label: 'Primitives vs References',
        language: 'java',
        code: `// Integer cache: -128 to 127 are cached
Integer x = 127;
Integer y = 127;
System.out.println(x == y);  // true (same cached object)

Integer p = 128;
Integer q = 128;
System.out.println(p == q);  // FALSE! (different objects)
System.out.println(p.equals(q));  // true (always use equals)

// String pool
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2);  // true (same pool object)

String s3 = new String("hello");
System.out.println(s1 == s3);  // FALSE! (new object on heap)
System.out.println(s1.equals(s3));  // true (always use equals)

// NullPointerException from unboxing
Integer nullableValue = null;  // from database: nullable column
int primitive = nullableValue;  // NPE! unboxing null throws NPE`,
      },
      {
        label: 'Financial Calculations — BigDecimal',
        language: 'java',
        code: `// WRONG: double has floating point precision issues
double price = 0.1 + 0.2;
System.out.println(price);  // 0.30000000000000004 !!!

// CORRECT: BigDecimal for money
BigDecimal a = new BigDecimal("0.1");  // use String constructor!
BigDecimal b = new BigDecimal("0.2");
BigDecimal sum = a.add(b);
System.out.println(sum);  // 0.3

// Rounding for currency
BigDecimal total = new BigDecimal("19.995");
BigDecimal rounded = total.setScale(2, RoundingMode.HALF_UP);
System.out.println(rounded);  // 20.00

// WRONG: BigDecimal from double loses precision
BigDecimal bad = new BigDecimal(0.1);  // 0.1000000000000000055511...
BigDecimal good = new BigDecimal("0.1");  // exactly 0.1`,
      },
      {
        label: 'Type Casting',
        language: 'java',
        code: `// Widening (implicit, safe)
int i = 42;
long l = i;       // int -> long, no data loss
double d = i;     // int -> double, no data loss

// Narrowing (explicit, may lose data)
long bigNum = 1_000_000_000_000L;
int truncated = (int) bigNum;  // data loss! check range first

// Safe narrowing — Math.toIntExact throws if overflow
try {
    int exact = Math.toIntExact(bigNum);  // ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Overflow!");
}

// var — local type inference (Java 10+)
var list = new ArrayList<String>();  // inferred as ArrayList<String>
var map = Map.of("key", "value");    // inferred as Map<String, String>

// Numeric literals for readability (Java 7+)
int million = 1_000_000;
long creditCard = 1234_5678_9012_3456L;
int hex = 0xFF;
int binary = 0b1010_1010;`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does == sometimes work for Integer but not always?',
      answer: 'Java caches Integer objects from -128 to 127. Within this range, Integer.valueOf() returns the same cached object, so == works. Outside this range, new objects are created, so == compares references (addresses), not values. Always use .equals() for object comparison.',
    },
    {
      question: 'When should I use int vs Integer?',
      answer: 'Use primitive int for local variables, method parameters, and array elements where null is not needed — it is faster and uses less memory. Use Integer (wrapper) for collections (List<Integer>), when null is a valid value (e.g., nullable DB column), and when you need the Integer utility methods.',
    },
    {
      question: 'Why should I not use double for money?',
      answer: 'double uses IEEE 754 binary floating-point which cannot exactly represent most decimal fractions (0.1, 0.2, etc.). This causes rounding errors that accumulate. For financial calculations, always use BigDecimal with String constructor. For performance-critical financial code, use long to store values in cents.',
    },
  ],
  productionIssues: [
    'NullPointerException from unboxing null Integer — code like int x = getInteger() throws NPE if getInteger() returns null. Always check for null before unboxing.',
    'Integer overflow silently wrapping — int max is ~2.1 billion. Counters, timestamps, and IDs can overflow silently. Use long for IDs and timestamps.',
    'Float/double precision in financial reports — even tiny rounding errors multiply across millions of transactions. Use BigDecimal for all money.',
    'String concatenation in loops — using + in a loop creates many String objects. Use StringBuilder for performance.',
  ],
  bestPractices: [
    'Use primitives (int, long, boolean) for local variables and performance-critical code.',
    'Use wrapper types (Integer, Long) only when null is needed or collections are involved.',
    'Always use BigDecimal for monetary values; always use the String constructor.',
    'Use equals() for all object comparisons; never use == for String or Integer.',
    'Use long (not int) for IDs, timestamps, and counters that might exceed 2 billion.',
    'Prefer enum over int constants for type safety and readability.',
  ],
  architectNote: 'Java 22+ is working on Primitive Types in Generics (Project Valhalla) which will allow List<int> directly. This will eliminate the performance gap between primitives and generics. Until then, for performance-critical collections of primitives, use specialized libraries like Eclipse Collections or primitive arrays.',
  faqs: [
    {
      question: 'What is the difference between String, StringBuilder, and StringBuffer?',
      answer: 'String is immutable — every modification creates a new object. StringBuilder is mutable and fast but NOT thread-safe — use it in single-threaded code and loops. StringBuffer is mutable and thread-safe (synchronized) but slower — rarely needed in modern code. In practice: use String for values, StringBuilder for building strings in loops.',
    },
    {
      question: 'What are text blocks in Java?',
      answer: 'Text blocks (Java 15+) are multi-line string literals using triple quotes. They preserve indentation intelligently and are perfect for JSON, SQL, and HTML strings in code. Example: String json = """ { "name": "John" } """; They eliminate the need for string concatenation and escape characters in multi-line strings.',
    },
  ],
  keyTakeaways: [
    '8 primitive types: byte, short, int, long, float, double, char, boolean',
    'Primitives store values on stack; reference types store pointers to heap objects',
    'Always use equals() for object comparison, never == (except for enum)',
    'Use BigDecimal for money, never float or double',
    'Integer cache covers -128 to 127 — a classic interview gotcha',
    'Use long for IDs and timestamps to avoid overflow',
  ],
  relatedTopics: ['java-operators', 'java-classes-objects', 'java-collections-list', 'java-generics'],
};

export const javaOperators: TopicContent = {
  slug: 'java-operators',
  title: 'Operators',
  description: 'Master Java operators — arithmetic, comparison, logical, bitwise, and the ternary operator — with the precedence rules that cause subtle bugs.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Java operators are symbols that perform operations on variables. The most important things to know: == compares references for objects (use .equals()), && and || short-circuit (they stop evaluating if the result is determined), and integer division truncates (5/2 = 2, not 2.5).',
  whatIsIt: `**Arithmetic Operators**
- +, -, *, /, % (modulo)
- Integer division truncates: 7/2 = 3
- Modulo works on negatives: -7 % 2 = -1

**Comparison Operators**
- ==, !=, <, >, <=, >=
- For objects, == compares references, not values

**Logical Operators**
- && (AND), || (OR), ! (NOT) — short-circuit evaluation
- & (AND), | (OR) — non-short-circuit, always evaluates both sides

**Bitwise Operators**
- & (AND), | (OR), ^ (XOR), ~ (NOT)
- << (left shift), >> (signed right shift), >>> (unsigned right shift)

**Assignment Operators**
- =, +=, -=, *=, /=, %=, &=, |=, ^=

**Other**
- instanceof — type check (Java 16+: pattern matching)
- Ternary ? : — inline if-else
- + — string concatenation when one operand is String`,
  whyWeNeedIt: 'Operators are the fundamental building blocks of any computation. Understanding short-circuit evaluation prevents NullPointerExceptions. Understanding integer division prevents calculation bugs. Understanding bitwise operators is essential for working with flags, permissions, and network protocols.',
  realWorldUsage: `Real enterprise usage:

- **Null-safe checks**: if (user != null && user.isActive()) — short-circuit prevents NPE
- **Permission flags**: if ((permissions & READ_FLAG) != 0) — bitwise AND for flag checking
- **Pagination**: int offset = (page - 1) * pageSize
- **Modulo for cycling**: int index = counter % array.length
- **Pattern matching instanceof** (Java 16+): if (obj instanceof String s) { s.toUpperCase(); }`,
  howItWorks: `**Operator Precedence (high to low, simplified)**
1. Postfix: expr++, expr--
2. Unary: ++expr, --expr, +, -, !, ~
3. Multiplicative: *, /, %
4. Additive: +, -
5. Shift: <<, >>, >>>
6. Relational: <, >, <=, >=, instanceof
7. Equality: ==, !=
8. Bitwise AND: &
9. Bitwise XOR: ^
10. Bitwise OR: |
11. Logical AND: &&
12. Logical OR: ||
13. Ternary: ? :
14. Assignment: =, +=, etc.

**Rule of thumb**: when in doubt, use parentheses. Explicit is always better than relying on precedence.`,
  example: {
    title: 'Operators in Real Code',
    description: 'Practical operator usage patterns and common pitfalls.',
    code: [
      {
        label: 'Common Operator Patterns',
        language: 'java',
        code: `// Integer division gotcha
int result = 7 / 2;           // 3, not 3.5!
double correct = 7.0 / 2;     // 3.5
double also = (double) 7 / 2; // 3.5

// Short-circuit evaluation
String name = null;
// Safe: short-circuit prevents NPE
if (name != null && name.length() > 0) {
    System.out.println(name.toUpperCase());
}

// Ternary operator
int age = 20;
String status = age >= 18 ? "adult" : "minor";

// String concatenation with +
String s2 = 1 + 2 + " hello";   // "3 hello" (1+2=3 first)
String s3 = "hello " + 1 + 2;   // "hello 12" (left to right)

// instanceof pattern matching (Java 16+)
Object obj = "Hello World";
if (obj instanceof String s) {
    System.out.println(s.length());  // s is already cast
}

// Switch expression pattern matching (Java 21)
String desc = switch (obj) {
    case Integer i -> "int: " + i;
    case String s  -> "str: " + s;
    default        -> "other";
};`,
      },
      {
        label: 'Bitwise Operators for Flags',
        language: 'java',
        code: `// Permission system using bitwise flags
public class Permissions {
    public static final int READ    = 0b001;  // 1
    public static final int WRITE   = 0b010;  // 2
    public static final int EXECUTE = 0b100;  // 4
    
    public static void main(String[] args) {
        // Grant read + write permissions
        int userPerms = READ | WRITE;  // 0b011 = 3
        
        // Check if user has read permission
        boolean canRead = (userPerms & READ) != 0;    // true
        boolean canExec = (userPerms & EXECUTE) != 0; // false
        
        // Add execute permission
        userPerms |= EXECUTE;  // 0b111 = 7
        
        // Remove write permission
        userPerms &= ~WRITE;   // 0b101 = 5
        
        // Toggle execute permission
        userPerms ^= EXECUTE;  // XOR flips the bit
        
        // Efficient multiply/divide by powers of 2
        int x = 8;
        int doubled = x << 1;   // 16 (left shift = * 2)
        int halved  = x >> 1;   // 4  (right shift = / 2)
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between & and && ?',
      answer: '&& is short-circuit AND — if the left side is false, the right side is NOT evaluated. & is bitwise AND (also works as logical AND but always evaluates both sides). Use && for boolean logic (it is safer and more efficient). Use & only when you explicitly need both sides evaluated or for bitwise operations on integers.',
    },
    {
      question: 'Why does "hello" + 1 + 2 give "hello12" but 1 + 2 + "hello" give "3hello"?',
      answer: 'The + operator evaluates left to right. "hello" + 1 = "hello1" (String concat), then "hello1" + 2 = "hello12". But 1 + 2 = 3 (int addition), then 3 + "hello" = "3hello" (String concat). Always use parentheses or StringBuilder when mixing types.',
    },
    {
      question: 'What does the >>> operator do that >> does not?',
      answer: '>> is signed right shift — it preserves the sign bit (fills with 1 for negative numbers). >>> is unsigned right shift — it always fills with 0. For positive numbers they are identical. >>> is used in hash functions and bit manipulation algorithms.',
    },
  ],
  productionIssues: [
    'Integer division returning 0 unexpectedly — int/int always truncates. A common bug: int pct = count / total * 100 always gives 0 if count < total. Fix: double pct = (double) count / total * 100.',
    'NullPointerException from non-short-circuit evaluation — using & instead of && means the right side is evaluated even when the left is false, causing NPE on null object.',
    'Overflow in arithmetic — int + int can overflow silently. For large calculations, use long or BigInteger.',
  ],
  bestPractices: [
    'Always use && and || (short-circuit) for boolean logic, not & and |.',
    'Use parentheses to make operator precedence explicit, not implicit.',
    'Use Math.floorDiv() and Math.floorMod() for consistent behavior with negative numbers.',
    'Prefer pattern matching instanceof (Java 16+) over cast-after-check.',
    'Avoid nested ternary operators — use if/else for readability.',
  ],
  architectNote: 'Bitwise operations are used in high-performance code: hash functions, cryptography, network protocol parsing, and permission systems. In business logic, prefer enums or EnumSet over int flags for type safety. EnumSet is internally implemented with bitwise operations but gives you type safety and readability.',
  faqs: [
    {
      question: 'What is the difference between pre-increment (++i) and post-increment (i++)?',
      answer: '++i increments first, then returns the new value. i++ returns the current value, then increments. In a standalone statement they are identical. The difference matters in expressions: int x = 5; int y = x++; gives y=5, x=6. int y = ++x; gives y=6, x=6. In modern Java, avoid using them in complex expressions — use them only as standalone statements.',
    },
    {
      question: 'What is instanceof pattern matching?',
      answer: 'Java 16+ allows: if (obj instanceof String s) { s.toUpperCase(); }. The variable s is automatically cast and scoped to the if block. Java 21 extends this to switch expressions: switch (obj) { case String s -> s.length(); case Integer i -> i * 2; }. This eliminates the verbose cast-and-check pattern.',
    },
  ],
  keyTakeaways: [
    'Integer division always truncates — cast to double when you need decimal results',
    'Use && and || (short-circuit) to prevent NullPointerExceptions',
    '== compares references for objects — always use .equals() for value comparison',
    'Bitwise operators (&, |, ^, <<, >>) are essential for flags and performance-critical code',
    'Use parentheses to make precedence explicit',
    'Pattern matching instanceof (Java 16+) eliminates verbose cast patterns',
  ],
  relatedTopics: ['java-data-types', 'java-classes-objects', 'java-exception-trycatch'],
};
