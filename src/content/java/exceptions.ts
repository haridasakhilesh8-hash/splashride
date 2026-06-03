import type { TopicContent } from '../types';

export const javaTryCatch: TopicContent = {
  slug: 'java-exception-trycatch',
  title: 'Try Catch',
  description: 'Java exception handling — try-catch-finally, multi-catch, try-with-resources, and the patterns senior developers use to write resilient enterprise code.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Exception handling lets your program respond gracefully to errors instead of crashing. try contains code that might fail. catch handles specific error types. finally always runs (for cleanup). try-with-resources automatically closes resources. The golden rule: catch exceptions you can handle, let others propagate.',
  whatIsIt: `**Exception Hierarchy:**
\`\`\`
Throwable
├── Error (JVM-level, do not catch)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── RuntimeException (unchecked — no throws declaration needed)
    │   ├── NullPointerException
    │   ├── IllegalArgumentException
    │   ├── IllegalStateException
    │   └── IndexOutOfBoundsException
    └── Checked Exceptions (must declare or handle)
        ├── IOException
        ├── SQLException
        └── ParseException
\`\`\`

**Checked vs Unchecked:**
- **Checked** — compiler forces you to handle or declare with throws. Represents recoverable conditions (file not found, network timeout).
- **Unchecked** (RuntimeException) — compiler does not require handling. Represents programming errors (null pointer, illegal argument).

**try-with-resources (Java 7+):**
Automatically closes any AutoCloseable resource when the block exits, even if an exception occurs.`,
  whyWeNeedIt: `Exception handling is essential for:

- **Resilience** — handle expected failures (network timeout, DB unavailable) gracefully
- **Resource cleanup** — always close files, connections, streams (try-with-resources)
- **Error reporting** — log the full stack trace for debugging
- **User experience** — show meaningful error messages, not stack traces
- **Transaction management** — rollback transactions on failure

Without exception handling, any unexpected condition crashes the entire application.`,
  realWorldUsage: `In enterprise Spring Boot applications:

- Service methods catch specific exceptions and translate them to domain exceptions
- Controllers use @ExceptionHandler or @ControllerAdvice to translate exceptions to HTTP responses
- Repository layer wraps DataAccessException into domain-specific exceptions
- try-with-resources is used for every I/O operation
- Global exception handlers log and return structured error responses`,
  howItWorks: `**Exception Propagation:**
1. Exception is thrown at the point of failure
2. JVM searches up the call stack for a matching catch block
3. First matching catch block executes
4. If no catch found, JVM prints stack trace and terminates the thread

**finally block:**
Runs after try and catch, regardless of outcome. Used for cleanup that must happen even if an exception occurs. Not needed for resource cleanup if using try-with-resources.

**Exception chaining:**
When catching one exception and throwing another, always include the original as the cause: \`throw new ServiceException("message", originalException)\`. This preserves the full diagnostic chain.`,
  example: {
    title: 'Exception Handling in Enterprise Code',
    description: 'Production-quality exception handling patterns.',
    code: [
      {
        label: 'Core Exception Patterns',
        language: 'java',
        code: `// try-with-resources — automatically closes resources
public String readFile(Path path) throws IOException {
    try (BufferedReader reader = Files.newBufferedReader(path)) {
        return reader.lines().collect(Collectors.joining("\n"));
    }
    // reader.close() is called automatically, even if exception occurs
}

// Multiple resources — closed in reverse order
public void copyFile(Path source, Path dest) throws IOException {
    try (InputStream in = Files.newInputStream(source);
         OutputStream out = Files.newOutputStream(dest)) {
        in.transferTo(out);
    }
}

// Multi-catch (Java 7+) — same handler for multiple exception types
public UserDto getUser(String id) {
    try {
        return userRepository.findById(id)
            .map(this::toDto)
            .orElseThrow(() -> new UserNotFoundException(id));
    } catch (IllegalArgumentException | NumberFormatException e) {
        throw new BadRequestException("Invalid user ID format: " + id, e);
    } catch (DataAccessException e) {
        // Always chain the original exception for diagnostics
        throw new ServiceException("Database error fetching user: " + id, e);
    }
}

// finally — cleanup when try-with-resources is not applicable
public void processWithLock(String lockKey) {
    boolean locked = lockService.acquire(lockKey);
    if (!locked) throw new LockAcquisitionException(lockKey);
    
    try {
        doWork();
    } finally {
        lockService.release(lockKey);  // ALWAYS release the lock
    }
}`,
      },
      {
        label: 'Global Exception Handler (Spring)',
        language: 'java',
        code: `// Spring Boot global exception handler
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            UserNotFoundException ex, HttpServletRequest request) {
        log.warn("User not found: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse.of("NOT_FOUND", ex.getMessage(), request.getRequestURI()));
    }
    
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(
            BadRequestException ex, HttpServletRequest request) {
        log.warn("Bad request: {}", ex.getMessage());
        return ResponseEntity.badRequest()
            .body(ErrorResponse.of("BAD_REQUEST", ex.getMessage(), request.getRequestURI()));
    }
    
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            ConstraintViolationException ex, HttpServletRequest request) {
        String message = ex.getConstraintViolations().stream()
            .map(v -> v.getPropertyPath() + ": " + v.getMessage())
            .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest()
            .body(ErrorResponse.of("VALIDATION_ERROR", message, request.getRequestURI()));
    }
    
    // Catch-all — log full stack trace, return generic error
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(
            Exception ex, HttpServletRequest request) {
        // Log with full stack trace — this is unexpected, we need to investigate
        log.error("Unexpected error at {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorResponse.of("INTERNAL_ERROR", "An unexpected error occurred",
                request.getRequestURI()));
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I catch Exception or specific exception types?',
      answer: 'Always catch the most specific exception type you can handle. Catching Exception (or worse, Throwable) swallows unexpected errors silently. The only legitimate use of catch(Exception e) is in a top-level handler (like @ExceptionHandler) where you log and return an error response. In service/repository code, catch specific exceptions.',
    },
    {
      question: 'What is the difference between checked and unchecked exceptions?',
      answer: 'Checked exceptions (extends Exception but not RuntimeException) must be declared in throws or handled with try-catch. They represent conditions the caller can reasonably recover from (file not found, network error). Unchecked exceptions (extends RuntimeException) represent programming errors — invalid arguments, null pointers, illegal state. In modern Java, most frameworks use unchecked exceptions exclusively to avoid the boilerplate of checked exception declarations.',
    },
    {
      question: 'Does finally always run?',
      answer: 'Almost always. Exceptions where finally does NOT run: (1) System.exit() is called, (2) JVM crashes, (3) the thread is killed. In normal operation — including when an exception is thrown — finally always runs. This makes it reliable for cleanup like releasing locks, closing connections, and logging.',
    },
  ],
  productionIssues: [
    'Swallowing exceptions silently — catch(Exception e) {} with no logging or rethrow makes debugging impossible. Always log or rethrow.',
    'Losing the original exception — throw new ServiceException("msg") without the cause loses the stack trace. Always: throw new ServiceException("msg", originalException).',
    'Catching Error — OutOfMemoryError and StackOverflowError indicate JVM-level problems. Catching them gives a false sense of recovery. Let them propagate.',
    'Exception in finally block — if finally throws an exception, the original exception is lost. Use try-with-resources or suppress exceptions carefully.',
  ],
  bestPractices: [
    'Use try-with-resources for all AutoCloseable resources — never rely on finally for resource cleanup.',
    'Always include the original exception as the cause when wrapping: throw new AppException("msg", cause).',
    'Never swallow exceptions silently — always log at minimum.',
    'Catch specific exceptions, not Exception or Throwable.',
    'Use custom exception hierarchy: AppException -> ServiceException, NotFoundException, ValidationException.',
    'Log exceptions at the boundary where they are handled, not at every layer.',
  ],
  architectNote: 'In Spring Boot, define a clear exception hierarchy: a base AppException (unchecked), then domain-specific subclasses (UserNotFoundException, InsufficientFundsException, ValidationException). Map these to HTTP status codes in @ControllerAdvice. Service layer throws domain exceptions; controller layer never catches — the advice handles it. This keeps controllers thin and exception handling centralized.',
  faqs: [
    {
      question: 'What is the difference between throw and throws?',
      answer: 'throw (without s) is a statement that throws an exception: throw new IllegalArgumentException("msg"). throws (with s) is part of a method signature declaring that the method may throw a checked exception: public void readFile() throws IOException. You use throw to throw an exception; you use throws to declare that a method might throw a checked exception.',
    },
    {
      question: 'What is exception chaining and why does it matter?',
      answer: 'Exception chaining preserves the original cause when wrapping exceptions. If a DataAccessException occurs and you wrap it: throw new ServiceException("DB error", dataAccessException), the original stack trace is preserved as the cause. Without chaining, you lose the root cause and debugging becomes very difficult. Always pass the original exception as the second argument when wrapping.',
    },
  ],
  keyTakeaways: [
    'try-with-resources automatically closes AutoCloseable resources — always use it for I/O',
    'Catch specific exceptions, not Exception or Throwable',
    'Always include the original exception as the cause when wrapping',
    'finally always runs — use for cleanup that cannot use try-with-resources',
    'Checked exceptions: compiler-enforced; Unchecked (RuntimeException): programming errors',
    'In Spring Boot, use @ControllerAdvice for centralized exception-to-HTTP mapping',
  ],
  relatedTopics: ['java-exception-throws', 'java-exception-custom', 'java-streams', 'java-threads'],
};

export const javaThrows: TopicContent = {
  slug: 'java-exception-throws',
  title: 'Throws',
  description: 'The throws keyword, checked vs unchecked exception design, and why modern Java frameworks moved away from checked exceptions.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The throws keyword in a method signature declares that the method may throw a checked exception. The caller must either handle it with try-catch or declare it with throws too. This creates a chain of exception declarations up the call stack. Modern Java frameworks (Spring, Hibernate) use unchecked exceptions to avoid this propagation boilerplate.',
  whatIsIt: `**throws declaration:**
\`\`\`java
public void readConfig(String path) throws IOException, ParseException {
    // may throw IOException (file not found)
    // may throw ParseException (invalid format)
}
\`\`\`

**Rules:**
- Only required for checked exceptions (extends Exception but not RuntimeException)
- Unchecked exceptions (RuntimeException subclasses) do not require throws declaration
- A method can declare throws for more exceptions than it actually throws (for future-proofing or documentation)
- Overriding methods cannot add new checked exceptions not declared in the parent

**throw vs throws:**
- \`throw\` — statement that throws an exception
- \`throws\` — method signature declaration

**Checked Exception Design Intent:**
James Gosling (Java creator) intended checked exceptions for recoverable conditions: "If you call this method, you must think about what to do when the file isn't there." In practice, this led to massive boilerplate.`,
  whyWeNeedIt: `Checked exceptions serve as documentation:
- They tell callers: "this method can fail in these specific ways"
- The compiler enforces that callers acknowledge these failure modes
- Forces developers to think about error handling at the API design level

However, checked exceptions have significant drawbacks:
- Boilerplate in every caller
- Cannot use in lambdas without wrapping
- Forces implementation details into the API
- Often leads to empty catch blocks (swallowing exceptions)`,
  realWorldUsage: `In enterprise code, you'll encounter checked exceptions mainly at I/O boundaries:

\`\`\`java
// Standard library methods with checked exceptions
Files.readAllBytes(path)        // throws IOException
Class.forName("com.Example")   // throws ClassNotFoundException
new URL("http://...")           // throws MalformedURLException

// Modern frameworks wrap these in unchecked exceptions
// Spring's JdbcTemplate wraps SQLException in DataAccessException (unchecked)
// This is why you don't see throws SQLException in Spring code
\`\`\``,
  howItWorks: `**Checked Exception Propagation:**
\`\`\`
methodA() throws IOException
    calls methodB() throws IOException
        calls methodC() throws IOException
            calls Files.readAllBytes()  // source of IOException
\`\`\`
Every method in the chain must either handle or declare the exception.

**Wrapping checked exceptions in unchecked:**
\`\`\`java
try {
    return Files.readAllBytes(path);
} catch (IOException e) {
    throw new RuntimeException("Failed to read file: " + path, e);
}
\`\`\`

**Sneaky throws (advanced):**
Using generics to throw checked exceptions without declaring them — used by Lombok's @SneakyThrows.`,
  example: {
    title: 'Checked Exceptions and Modern Alternatives',
    description: 'How to handle checked exceptions in modern Java and when to wrap them.',
    code: [
      {
        label: 'Checked Exception Patterns',
        language: 'java',
        code: `// Traditional checked exception handling
public class FileProcessor {
    
    // Option 1: Declare throws — push decision to caller
    public String readConfig(Path path) throws IOException {
        return Files.readString(path);
    }
    
    // Option 2: Catch and wrap as unchecked — hide implementation detail
    public String readConfigSafe(Path path) {
        try {
            return Files.readString(path);
        } catch (IOException e) {
            throw new ConfigurationException("Cannot read config: " + path, e);
        }
    }
    
    // Option 3: Return Optional — for "file might not exist" cases
    public Optional<String> tryReadConfig(Path path) {
        try {
            return Optional.of(Files.readString(path));
        } catch (IOException e) {
            log.warn("Config file not found: {}", path);
            return Optional.empty();
        }
    }
}

// Checked exceptions in lambdas — the problem
List<Path> paths = List.of(Path.of("a.txt"), Path.of("b.txt"));

// DOES NOT COMPILE: Files.readString throws checked IOException
// paths.stream().map(Files::readString).collect(Collectors.toList());

// Solution 1: Wrap in a helper
@FunctionalInterface
interface ThrowingFunction<T, R> {
    R apply(T t) throws Exception;
    
    static <T, R> Function<T, R> wrap(ThrowingFunction<T, R> f) {
        return t -> {
            try { return f.apply(t); }
            catch (Exception e) { throw new RuntimeException(e); }
        };
    }
}

List<String> contents = paths.stream()
    .map(ThrowingFunction.wrap(Files::readString))
    .collect(Collectors.toList());

// Solution 2: Lombok @SneakyThrows
@SneakyThrows  // throws IOException without declaring it
public String readWithLombok(Path path) {
    return Files.readString(path);
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why do modern frameworks use unchecked exceptions?',
      answer: 'Checked exceptions force every layer to handle or declare them, creating boilerplate and leaking implementation details. Spring wraps all SQLExceptions in unchecked DataAccessException — you only handle it if you can do something meaningful. The consensus in the Java community (Effective Java, Clean Code) is: use unchecked exceptions for most application code; only use checked exceptions for truly recoverable conditions where the caller can meaningfully respond.',
    },
    {
      question: 'Can I override a method and add a throws clause?',
      answer: 'You can only narrow the exception declaration, not widen it. If the parent declares throws IOException, the override can: declare no throws (handles internally), declare throws FileNotFoundException (a subclass of IOException), but NOT declare throws Exception (wider than IOException). This ensures that code using the parent type is not surprised by new exceptions from the subclass.',
    },
  ],
  productionIssues: [
    'Empty catch blocks — catch(IOException e) {} silently swallows the error. Always log at minimum.',
    'Catching and rethrowing without cause — catch(IOException e) { throw new AppException("error"); } loses the stack trace. Include the cause.',
    'Checked exceptions in lambda-heavy code — forces verbose wrapping. Consider using unchecked exceptions for APIs used in streams and lambdas.',
  ],
  bestPractices: [
    'For application code, prefer unchecked exceptions — they do not force boilerplate on callers.',
    'For library APIs, consider checked exceptions for recoverable conditions where the caller must act.',
    'Always wrap checked exceptions with the original cause.',
    'Never declare throws Exception — be specific.',
    'Use Lombok @SneakyThrows sparingly — it hides checked exceptions, which can surprise callers.',
  ],
  architectNote: 'The checked vs unchecked debate is settled in modern Java: use unchecked exceptions for application code. Spring, Hibernate, and all modern frameworks use unchecked exceptions. Checked exceptions are still appropriate for: (1) public library APIs where callers genuinely need to handle specific failures, (2) close() methods (AutoCloseable), and (3) cases where the compiler-enforced handling is genuinely valuable. For everything else, use RuntimeException subclasses.',
  faqs: [
    {
      question: 'What is the difference between Exception and RuntimeException?',
      answer: 'Exception is the base class for all exceptions. RuntimeException extends Exception. The key difference: RuntimeException and its subclasses are unchecked — the compiler does not require you to declare or handle them. All other Exception subclasses are checked. The rule: if it extends RuntimeException, it is unchecked; otherwise, it is checked.',
    },
  ],
  keyTakeaways: [
    'throws declares that a method may throw a checked exception',
    'Checked exceptions: compiler-enforced handling; unchecked (RuntimeException): no enforcement',
    'Modern frameworks use unchecked exceptions to avoid boilerplate',
    'Always include the original exception as the cause when wrapping',
    'Cannot widen the throws declaration when overriding — only narrow or remove',
    'Checked exceptions cannot be used directly in lambdas — must wrap',
  ],
  relatedTopics: ['java-exception-trycatch', 'java-exception-custom', 'java-lambda', 'java-streams'],
};

export const javaCustomExceptions: TopicContent = {
  slug: 'java-exception-custom',
  title: 'Custom Exceptions',
  description: 'Building a clean exception hierarchy for enterprise applications — naming conventions, when to extend checked vs unchecked, and how Spring Boot maps them to HTTP responses.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Custom exceptions let you express domain-specific error conditions clearly. Instead of throwing RuntimeException("User not found"), you throw UserNotFoundException("User 42 not found"). This makes error handling code readable, enables specific catch blocks, and in Spring Boot, maps cleanly to HTTP status codes.',
  whatIsIt: `**Custom Exception Design:**
\`\`\`
RuntimeException (base — unchecked)
└── AppException (your base)
    ├── NotFoundException (404)
    │   ├── UserNotFoundException
    │   ├── OrderNotFoundException
    │   └── ProductNotFoundException
    ├── ValidationException (400)
    │   ├── InvalidEmailException
    │   └── InsufficientFundsException
    ├── ConflictException (409)
    │   └── DuplicateEmailException
    └── ServiceException (500)
        └── ExternalServiceException
\`\`\`

**Exception Fields:**
- \`message\` — human-readable description
- \`cause\` — original exception (for chaining)
- \`errorCode\` — machine-readable code (for API responses)
- \`context\` — additional data (userId, orderId, etc.)`,
  whyWeNeedIt: `Custom exceptions provide:

- **Clarity** — UserNotFoundException is self-documenting; RuntimeException is not
- **Specific handling** — catch UserNotFoundException separately from InsufficientFundsException
- **HTTP mapping** — Spring @ControllerAdvice maps each exception type to a status code
- **Error codes** — API clients can programmatically handle specific error types
- **Domain language** — exceptions speak the language of your business domain`,
  realWorldUsage: `Every production Spring Boot service has a custom exception hierarchy. The pattern:

1. Define base AppException (unchecked)
2. Define category exceptions (NotFoundException, ValidationException, etc.)
3. Define specific exceptions (UserNotFoundException, etc.)
4. Map to HTTP in @ControllerAdvice
5. Throw specific exceptions in service layer
6. Never let raw RuntimeException reach the controller`,
  howItWorks: `**Minimal Custom Exception:**
\`\`\`java
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long userId) {
        super("User not found with ID: " + userId);
    }
    public UserNotFoundException(String email) {
        super("User not found with email: " + email);
    }
}
\`\`\`

**Rich Exception with Context:**
Include an error code and additional context for API responses and logging.`,
  example: {
    title: 'Enterprise Exception Hierarchy',
    description: 'A complete, production-ready exception design for a Spring Boot application.',
    code: [
      {
        label: 'Exception Hierarchy',
        language: 'java',
        code: `// Base exception — all app exceptions extend this
public abstract class AppException extends RuntimeException {
    private final String errorCode;
    
    protected AppException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    protected AppException(String message, String errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() { return errorCode; }
}

// Category exceptions — map to HTTP status codes
public class NotFoundException extends AppException {
    protected NotFoundException(String message, String errorCode) {
        super(message, errorCode);
    }
}

public class ValidationException extends AppException {
    private final Map<String, String> fieldErrors;
    
    public ValidationException(String message, Map<String, String> fieldErrors) {
        super(message, "VALIDATION_ERROR");
        this.fieldErrors = Map.copyOf(fieldErrors);
    }
    
    public Map<String, String> getFieldErrors() { return fieldErrors; }
}

public class ConflictException extends AppException {
    protected ConflictException(String message, String errorCode) {
        super(message, errorCode);
    }
}

// Domain-specific exceptions
public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException(Long id) {
        super("User not found with ID: " + id, "USER_NOT_FOUND");
    }
    public UserNotFoundException(String email) {
        super("User not found with email: " + email, "USER_NOT_FOUND");
    }
}

public class InsufficientFundsException extends ValidationException {
    public InsufficientFundsException(BigDecimal available, BigDecimal requested) {
        super(String.format("Insufficient funds. Available: %s, Requested: %s",
                available, requested),
            Map.of("balance", "Insufficient funds for this transaction"));
    }
}

public class DuplicateEmailException extends ConflictException {
    public DuplicateEmailException(String email) {
        super("Email already registered: " + email, "DUPLICATE_EMAIL");
    }
}`,
      },
      {
        label: 'Spring Boot Exception Mapping',
        language: 'java',
        code: `@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException ex) {
        log.warn("Not found: {} [{}]", ex.getMessage(), ex.getErrorCode());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getErrorCode(), ex.getMessage()));
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        log.warn("Validation error: {}", ex.getMessage());
        return ResponseEntity.badRequest()
            .body(new ErrorResponse(ex.getErrorCode(), ex.getMessage(),
                ex.getFieldErrors()));
    }
    
    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflict(ConflictException ex) {
        log.warn("Conflict: {} [{}]", ex.getMessage(), ex.getErrorCode());
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(new ErrorResponse(ex.getErrorCode(), ex.getMessage()));
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(Exception ex) {
        log.error("Unexpected error: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"));
    }
}

// Usage in service layer
@Service
public class UserService {
    public User getUser(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }
    
    public User createUser(CreateUserRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new DuplicateEmailException(req.email());
        }
        return userRepository.save(new User(req));
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should custom exceptions extend Exception (checked) or RuntimeException (unchecked)?',
      answer: 'In modern enterprise Java, extend RuntimeException (unchecked). This avoids forcing every caller to handle or declare the exception. The exception hierarchy handles all specific cases in @ControllerAdvice. Only use checked custom exceptions if you have a library API where callers genuinely need compiler-enforced handling.',
    },
    {
      question: 'How many constructors should a custom exception have?',
      answer: 'At minimum: (String message) and (String message, Throwable cause). The cause constructor is critical for exception chaining. Many teams also add convenience constructors for common cases, like UserNotFoundException(Long id) which formats the message automatically.',
    },
  ],
  productionIssues: [
    'Too many exception types — having 50 specific exception classes becomes hard to maintain. Group by HTTP status category (NotFoundException, ValidationException) and use error codes for specifics.',
    'Forgetting the cause constructor — custom exceptions without a (String, Throwable) constructor lose the original stack trace when wrapping.',
  ],
  bestPractices: [
    'Build a hierarchy: AppException -> NotFoundException, ValidationException, ConflictException -> specific exceptions.',
    'Always include constructors with Throwable cause for exception chaining.',
    'Use error codes (Strings like "USER_NOT_FOUND") for machine-readable error identification.',
    'Map exceptions to HTTP status codes in @ControllerAdvice, not in service layer.',
    'Keep exception messages clear and actionable — include the relevant ID or value.',
  ],
  architectNote: 'Design your exception hierarchy before writing services. The hierarchy drives your API error contract. Document each exception type, its HTTP status, and its error code in your API documentation. Client applications depend on these codes to handle errors programmatically. Changing error codes is a breaking API change.',
  faqs: [
    {
      question: 'What is the difference between @ExceptionHandler and @ControllerAdvice?',
      answer: '@ExceptionHandler is a method-level annotation that handles exceptions thrown by the same controller. @ControllerAdvice (or @RestControllerAdvice) is a class-level annotation that applies @ExceptionHandler methods globally across all controllers. Use @RestControllerAdvice for REST APIs — it combines @ControllerAdvice and @ResponseBody.',
    },
  ],
  keyTakeaways: [
    'Extend RuntimeException for application exceptions — avoid checked custom exceptions',
    'Build a hierarchy: base AppException -> category exceptions -> specific exceptions',
    'Always include a (String message, Throwable cause) constructor',
    'Use error codes for machine-readable error identification in API responses',
    'Map exceptions to HTTP status codes in @ControllerAdvice — keep services clean',
    'Include relevant context in exception messages (IDs, values)',
  ],
  relatedTopics: ['java-exception-trycatch', 'java-exception-throws', 'java-streams', 'java-classes-objects'],
};
