import type { TopicContent } from '../types';

export const javaFileApi: TopicContent = {
  slug: 'java-file-api',
  title: 'File API',
  description: 'Java file I/O — the modern java.nio.file.Files API vs legacy java.io.File, reading, writing, and traversing the filesystem.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Java has two file APIs: the legacy java.io.File (Java 1.0, avoid in new code) and the modern java.nio.file package (Java 7+). Use Path and Files from java.nio.file — they are more expressive, throw better exceptions, support symbolic links, and have a rich utility API. Always use try-with-resources for file operations.',
  whatIsIt: `**Modern API (use this):**
- \`java.nio.file.Path\` — represents a file or directory path (replaces java.io.File)
- \`java.nio.file.Files\` — utility class with all file operations
- \`java.nio.file.Paths\` — factory for Path objects (Java 7-10)
- \`Path.of()\` — factory for Path objects (Java 11+, preferred)

**Legacy API (avoid in new code):**
- \`java.io.File\` — old path representation
- \`java.io.FileInputStream/FileOutputStream\` — byte streams
- \`java.io.FileReader/FileWriter\` — character streams (no charset control!)
- \`java.io.BufferedReader/BufferedWriter\` — buffered wrappers

**Key Files methods:**
- readString(path) / readAllBytes(path) / readAllLines(path) — read entire file
- writeString(path, content) / write(path, bytes) — write entire file
- lines(path) — Stream<String> of lines (lazy)
- copy(source, target) / move(source, target) / delete(path)
- createFile(path) / createDirectory(path) / createDirectories(path)
- exists(path) / isDirectory(path) / isRegularFile(path)
- walk(path) — Stream<Path> of all files recursively
- list(path) — Stream<Path> of immediate children`,
  whyWeNeedIt: `The legacy java.io.File API has many problems:
- Methods return false instead of throwing exceptions (hard to diagnose failures)
- No charset control in FileReader/FileWriter (uses platform default — dangerous!)
- No atomic operations
- No symbolic link support
- No file metadata (owner, permissions, timestamps)

java.nio.file solves all of these:
- Throws IOException with clear messages
- Explicit charset everywhere
- StandardCopyOption.ATOMIC_MOVE for atomic file replacement
- Full symbolic link and attribute support`,
  realWorldUsage: `Common enterprise use cases:

- Reading configuration files (YAML, JSON, properties)
- Writing reports and exports (CSV, PDF, Excel)
- Processing uploaded files
- Log file analysis
- File-based data pipelines`,
  howItWorks: `**Path vs File:**
\`\`\`java
// Legacy
File file = new File("/data/config.json");

// Modern (preferred)
Path path = Path.of("/data/config.json");
Path path2 = Paths.get("/data", "config.json");  // same result
\`\`\`

**Buffering:**
Files.readString() reads the entire file into memory — fine for small files. For large files, use Files.lines() (returns a Stream) or BufferedReader for line-by-line processing without loading everything into memory.

**Character encoding:**
Always specify charset explicitly. Never use FileReader/FileWriter — they use the platform default charset which varies by OS.`,
  example: {
    title: 'File Operations in Enterprise Java',
    description: 'Common file I/O patterns used in production applications.',
    code: [
      {
        label: 'Reading and Writing Files',
        language: 'java',
        code: `// Reading entire file (small files)
Path configPath = Path.of("/etc/myapp/config.json");
String content = Files.readString(configPath, StandardCharsets.UTF_8);

// Reading all lines (small-medium files)
List<String> lines = Files.readAllLines(configPath, StandardCharsets.UTF_8);

// Reading line by line (large files — lazy, memory-efficient)
try (Stream<String> lines = Files.lines(configPath, StandardCharsets.UTF_8)) {
    lines.filter(line -> !line.startsWith("#"))  // skip comments
         .map(String::trim)
         .filter(line -> !line.isEmpty())
         .forEach(this::processConfigLine);
}  // stream closed automatically

// Writing a file (creates or overwrites)
String report = generateReport();
Files.writeString(
    Path.of("/reports/daily-report.txt"),
    report,
    StandardCharsets.UTF_8,
    StandardOpenOption.CREATE,
    StandardOpenOption.TRUNCATE_EXISTING
);

// Appending to a file
Files.writeString(
    Path.of("/logs/audit.log"),
    "User login: " + userId + "\n",
    StandardCharsets.UTF_8,
    StandardOpenOption.CREATE,
    StandardOpenOption.APPEND
);

// Writing bytes
byte[] pdfBytes = generatePdf();
Files.write(Path.of("/exports/report.pdf"), pdfBytes);

// Atomic file replacement (safe for config files)
Path tempPath = Path.of("/etc/myapp/config.json.tmp");
Path finalPath = Path.of("/etc/myapp/config.json");
Files.writeString(tempPath, newConfig, StandardCharsets.UTF_8);
Files.move(tempPath, finalPath, StandardCopyOption.ATOMIC_MOVE,
           StandardCopyOption.REPLACE_EXISTING);`,
      },
      {
        label: 'File System Operations',
        language: 'java',
        code: `// Check existence and type
Path path = Path.of("/data/uploads/file.csv");
boolean exists = Files.exists(path);
boolean isDir = Files.isDirectory(path);
boolean isFile = Files.isRegularFile(path);
boolean readable = Files.isReadable(path);
long size = Files.size(path);  // bytes

// Create directories (including parents)
Files.createDirectories(Path.of("/data/uploads/2025/01"));

// Copy and move
Files.copy(
    Path.of("/source/file.txt"),
    Path.of("/dest/file.txt"),
    StandardCopyOption.REPLACE_EXISTING,
    StandardCopyOption.COPY_ATTRIBUTES
);

Files.move(
    Path.of("/tmp/upload.csv"),
    Path.of("/data/uploads/upload.csv"),
    StandardCopyOption.REPLACE_EXISTING
);

// Delete
Files.delete(path);  // throws NoSuchFileException if not found
Files.deleteIfExists(path);  // returns false if not found, no exception

// Walk directory tree
try (Stream<Path> walk = Files.walk(Path.of("/data/uploads"))) {
    List<Path> csvFiles = walk
        .filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".csv"))
        .collect(Collectors.toList());
}

// List immediate children
try (Stream<Path> children = Files.list(Path.of("/data"))) {
    children.filter(Files::isDirectory)
            .forEach(dir -> System.out.println(dir.getFileName()));
}

// Path operations
Path base = Path.of("/data/uploads");
Path file = Path.of("/data/uploads/2025/report.csv");
Path relative = base.relativize(file);  // 2025/report.csv
Path absolute = base.resolve("2025/report.csv");  // /data/uploads/2025/report.csv
String filename = file.getFileName().toString();  // report.csv
Path parent = file.getParent();  // /data/uploads/2025`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between Path and File?',
      answer: 'Path (java.nio.file.Path) is the modern representation of a file system path — use it for all new code. File (java.io.File) is the legacy class from Java 1.0. Path has better exception handling, supports symbolic links, and has a richer API. Convert between them: file.toPath() and path.toFile() when interoperating with legacy APIs.',
    },
    {
      question: 'When should I use Files.readString() vs Files.lines()?',
      answer: 'Files.readString() loads the entire file into a String in memory — use for small files (< 10MB). Files.lines() returns a lazy Stream<String> — use for large files where you do not need all lines in memory at once. Always close the stream from Files.lines() with try-with-resources.',
    },
  ],
  productionIssues: [
    'File handle leak — not closing streams and readers leads to "too many open files" errors. Always use try-with-resources.',
    'Platform-dependent line endings — files created on Windows have \\r\\n; Linux has \\n. Use Files.readAllLines() which handles both, or normalize with line.stripTrailing().',
    'Charset issues — reading a UTF-8 file without specifying charset may use the platform default (not UTF-8 on some Windows systems). Always specify StandardCharsets.UTF_8.',
  ],
  bestPractices: [
    'Use Path.of() and Files utility class for all file operations.',
    'Always specify charset explicitly — StandardCharsets.UTF_8 for most cases.',
    'Always use try-with-resources for streams and readers.',
    'Use Files.lines() for large files — do not load entire large files into memory.',
    'Use atomic file replacement (write to temp, then move) for config files.',
    'Use Files.createTempFile() for temporary files and delete them in finally.',
  ],
  architectNote: 'For enterprise file processing (large CSV imports, bulk exports), avoid loading entire files into memory. Use Files.lines() for streaming line-by-line processing, or Apache Commons CSV / OpenCSV for CSV parsing. For Excel files, use Apache POI with streaming API (SXSSFWorkbook). For very large files (GBs), consider Java NIO channels with ByteBuffers for maximum performance.',
  faqs: [
    {
      question: 'How do I watch a directory for file changes?',
      answer: 'Use WatchService (java.nio.file): WatchService watcher = FileSystems.getDefault().newWatchService(); path.register(watcher, ENTRY_CREATE, ENTRY_MODIFY, ENTRY_DELETE); then poll with watcher.take() in a loop. This is OS-native (inotify on Linux, FSEvents on macOS) and efficient. Spring Integration and Apache Camel provide higher-level file watching abstractions.',
    },
  ],
  keyTakeaways: [
    'Use Path and Files (java.nio.file) for all new code — not java.io.File',
    'Always specify charset: StandardCharsets.UTF_8',
    'Always use try-with-resources for file streams',
    'Files.readString() for small files; Files.lines() for large files',
    'Use atomic move (write to temp + move) for safe file replacement',
    'Files.walk() for recursive directory traversal',
  ],
  relatedTopics: ['java-nio', 'java-exception-trycatch', 'java-streams'],
};

export const javaNio: TopicContent = {
  slug: 'java-nio',
  title: 'NIO',
  description: 'Java NIO (New I/O) — Channels, Buffers, Selectors, and when to use NIO over traditional I/O for high-performance network and file operations.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Java NIO (New I/O) is a non-blocking I/O API introduced in Java 1.4. It uses Channels (like streams but bidirectional), Buffers (data containers), and Selectors (for multiplexing many channels on one thread). NIO is the foundation of high-performance networking in Java — Netty, Tomcat, and Undertow are all built on NIO.',
  whatIsIt: `**NIO Core Concepts:**

**Buffer** — a fixed-size container for data
- ByteBuffer, CharBuffer, IntBuffer, etc.
- Key properties: capacity (total size), limit (read boundary), position (current read/write point)
- flip() — switch from write mode to read mode
- clear() / compact() — prepare for writing again
- Direct ByteBuffer — off-heap memory, faster for I/O

**Channel** — bidirectional I/O endpoint
- FileChannel — file I/O (also supports memory-mapped files)
- SocketChannel — TCP client
- ServerSocketChannel — TCP server
- DatagramChannel — UDP

**Selector** — multiplex many channels on one thread
- Non-blocking: one thread handles thousands of connections
- SelectionKey: CONNECT, ACCEPT, READ, WRITE events
- Foundation of event-loop frameworks (Netty, Vert.x)

**Path/Files (NIO.2, Java 7+)**
- The modern file API (covered in File API topic)
- Built on NIO concepts but with a higher-level API`,
  whyWeNeedIt: `Traditional I/O (java.io) is blocking:
- One thread per connection
- Thread blocks while waiting for data
- 10,000 connections = 10,000 threads = ~10GB memory

NIO is non-blocking:
- One thread can handle thousands of connections
- Thread only processes connections that have data ready
- Selector tells you which channels are ready
- Foundation of modern high-performance servers

For enterprise developers, NIO is mostly used indirectly through frameworks (Netty, Spring WebFlux). Direct NIO programming is needed for custom protocols and high-performance file operations.`,
  realWorldUsage: `NIO in enterprise Java:

- **Netty** — built entirely on NIO; powers many high-performance services
- **Spring WebFlux** — reactive web framework built on Reactor Netty (NIO)
- **Memory-mapped files** — FileChannel.map() for fast large file access
- **File copying** — FileChannel.transferTo() for zero-copy file transfer
- **Direct ByteBuffer** — off-heap memory for I/O-intensive processing`,
  howItWorks: `**Buffer State Machine:**
\`\`\`
Write mode:  position=0, limit=capacity
After write: position=bytesWritten, limit=capacity

flip():      position=0, limit=bytesWritten  (ready to read)
After read:  position=bytesRead, limit=bytesWritten

clear():     position=0, limit=capacity  (ready to write again)
compact():   unread data moved to start, position=unreadBytes
\`\`\`

**Non-blocking Selector Loop:**
\`\`\`java
while (true) {
    selector.select();  // blocks until at least one channel is ready
    Set<SelectionKey> keys = selector.selectedKeys();
    for (SelectionKey key : keys) {
        if (key.isAcceptable()) handleAccept(key);
        else if (key.isReadable()) handleRead(key);
        else if (key.isWritable()) handleWrite(key);
    }
    keys.clear();
}
\`\`\``,
  example: {
    title: 'NIO File Operations and Memory-Mapped Files',
    description: 'Practical NIO usage for high-performance file operations.',
    code: [
      {
        label: 'FileChannel and ByteBuffer',
        language: 'java',
        code: `// Fast file copy using FileChannel.transferTo (zero-copy)
public void copyFile(Path source, Path dest) throws IOException {
    try (FileChannel src = FileChannel.open(source, StandardOpenOption.READ);
         FileChannel dst = FileChannel.open(dest, 
             StandardOpenOption.CREATE, StandardOpenOption.WRITE)) {
        
        src.transferTo(0, src.size(), dst);
        // transferTo uses OS-level zero-copy (sendfile on Linux)
        // Much faster than read-into-buffer-write
    }
}

// Reading with ByteBuffer
public byte[] readFile(Path path) throws IOException {
    try (FileChannel channel = FileChannel.open(path, StandardOpenOption.READ)) {
        ByteBuffer buffer = ByteBuffer.allocate((int) channel.size());
        
        while (buffer.hasRemaining()) {
            int bytesRead = channel.read(buffer);
            if (bytesRead == -1) break;  // end of file
        }
        
        buffer.flip();  // switch to read mode
        byte[] bytes = new byte[buffer.remaining()];
        buffer.get(bytes);
        return bytes;
    }
}

// Memory-mapped file — fastest way to read large files
public void processLargeFile(Path path) throws IOException {
    try (FileChannel channel = FileChannel.open(path, StandardOpenOption.READ)) {
        // Map entire file into memory (virtual memory, not necessarily RAM)
        MappedByteBuffer buffer = channel.map(
            FileChannel.MapMode.READ_ONLY, 0, channel.size()
        );
        
        // Access file content directly from buffer — no read() calls needed
        while (buffer.hasRemaining()) {
            byte b = buffer.get();  // direct memory access
            process(b);
        }
        // OS handles paging in/out as needed
    }
}

// Direct ByteBuffer — off-heap memory for I/O
// Faster for I/O because no copy between JVM heap and OS
ByteBuffer directBuffer = ByteBuffer.allocateDirect(1024 * 1024);  // 1MB off-heap
// Use for repeated I/O operations to same buffer
// Be careful: not GC'd like heap buffers, can cause native OOM`,
      },
      {
        label: 'Non-blocking Server with Selector',
        language: 'java',
        code: `// Non-blocking TCP server — handles many connections with one thread
public class NonBlockingServer {
    public void start(int port) throws IOException {
        Selector selector = Selector.open();
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.configureBlocking(false);  // non-blocking!
        serverChannel.bind(new InetSocketAddress(port));
        serverChannel.register(selector, SelectionKey.OP_ACCEPT);
        
        System.out.println("Server started on port " + port);
        
        while (true) {
            selector.select();  // wait for events
            
            Iterator<SelectionKey> keys = selector.selectedKeys().iterator();
            while (keys.hasNext()) {
                SelectionKey key = keys.next();
                keys.remove();
                
                if (!key.isValid()) continue;
                
                if (key.isAcceptable()) {
                    // New connection
                    SocketChannel client = serverChannel.accept();
                    client.configureBlocking(false);
                    client.register(selector, SelectionKey.OP_READ);
                    System.out.println("Connected: " + client.getRemoteAddress());
                    
                } else if (key.isReadable()) {
                    // Data available to read
                    SocketChannel client = (SocketChannel) key.channel();
                    ByteBuffer buffer = ByteBuffer.allocate(1024);
                    int bytesRead = client.read(buffer);
                    
                    if (bytesRead == -1) {
                        client.close();  // client disconnected
                    } else {
                        buffer.flip();
                        // Echo back to client
                        client.write(buffer);
                    }
                }
            }
        }
    }
}
// In practice, use Netty instead of raw NIO for production servers`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use NIO directly vs java.io streams?',
      answer: 'Use java.io (BufferedReader, Files.lines()) for most file operations — it is simpler and sufficient. Use NIO directly for: memory-mapped files (large file random access), zero-copy file transfers (FileChannel.transferTo), non-blocking network servers. In practice, most enterprise developers never write raw NIO network code — they use Netty or Spring WebFlux which handle NIO internally.',
    },
    {
      question: 'What is the difference between allocate() and allocateDirect()?',
      answer: 'ByteBuffer.allocate() creates a buffer on the JVM heap — GC managed, fast allocation. ByteBuffer.allocateDirect() creates a buffer in native memory (off-heap) — not GC managed, slower to allocate but faster for I/O (no copy between JVM heap and OS). Use direct buffers for long-lived buffers used repeatedly for I/O. Use heap buffers for short-lived buffers.',
    },
  ],
  productionIssues: [
    'Forgetting to flip() the buffer — writing data then reading without flip() reads from the wrong position. Always flip() after writing before reading.',
    'Direct ByteBuffer memory leak — direct buffers are not GC\'d normally. They are freed when the ByteBuffer object is GC\'d, but this can be delayed. Use explicit cleaner (Java 9+: ((DirectBuffer) buffer).cleaner().clean()) for large direct buffers.',
    'Selector not clearing selected keys — if you do not call selectedKeys.remove() after processing each key, the same key is processed again in the next iteration.',
  ],
  bestPractices: [
    'Use Files utility class for most file operations — reserve raw NIO for performance-critical cases.',
    'Use FileChannel.transferTo() for file copying — it uses zero-copy OS primitives.',
    'Use memory-mapped files for large files with random access patterns.',
    'In production, use Netty instead of raw Selector-based NIO for network servers.',
    'Pre-allocate and reuse ByteBuffers for I/O-intensive code to reduce GC pressure.',
  ],
  architectNote: 'For new microservices requiring high-performance I/O, consider Spring WebFlux (built on Reactor Netty/NIO) instead of Spring MVC (blocking I/O). WebFlux handles tens of thousands of concurrent connections with a small thread pool. However, WebFlux requires a fully reactive programming model — blocking code anywhere breaks the model. Java 21 virtual threads with Spring MVC often achieve similar throughput with simpler code.',
  faqs: [
    {
      question: 'What is Netty and how does it relate to NIO?',
      answer: 'Netty is an asynchronous, event-driven network framework built on Java NIO. It abstracts the complexity of raw NIO (buffer management, selector loops, connection lifecycle) into a clean API. Used by: gRPC, Cassandra driver, Elasticsearch, Spring WebFlux. If you need a high-performance custom protocol server, use Netty rather than raw NIO.',
    },
  ],
  keyTakeaways: [
    'NIO uses Channels (bidirectional), Buffers (data containers), and Selectors (multiplexing)',
    'Buffer state: write mode (position=0 to limit) -> flip() -> read mode (position=0 to limit)',
    'FileChannel.transferTo() for zero-copy file transfer',
    'Memory-mapped files (MappedByteBuffer) for fast large file random access',
    'Non-blocking Selector enables one thread to handle thousands of connections',
    'In production, use Netty or Spring WebFlux instead of raw NIO',
  ],
  relatedTopics: ['java-file-api', 'java-exception-trycatch', 'java-threads', 'java-completable-future'],
};
