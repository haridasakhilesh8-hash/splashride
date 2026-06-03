import type { TopicContent } from '../../types';

export const springExceptionHandling: TopicContent = {
  slug: 'spring-exception-handling',
  title: 'Exception Handling',
  description: 'Build production-grade exception handling in Spring Boot — @ControllerAdvice, @ExceptionHandler, ProblemDetail, and consistent error responses across your entire API.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: '@ControllerAdvice is a global exception handler — it catches exceptions thrown anywhere in your controllers and converts them to proper HTTP responses. Without it, Spring returns ugly default error pages. With it, every exception maps to a clean JSON error response with the right HTTP status code.',
  whatIsIt: `Spring\'s exception handling mechanism lets you centralize error handling in one place.

**Key components:**
- \`@ControllerAdvice\` / \`@RestControllerAdvice\` — global handler applied to all controllers
- \`@ExceptionHandler(ExceptionType.class)\` — handles a specific exception type
- \`ResponseEntityExceptionHandler\` — base class that handles Spring MVC exceptions
- \`ProblemDetail\` (Spring Boot 3.x) — RFC 7807 standardized error format

**Exception hierarchy to handle:**
- Your custom exceptions (\`ResourceNotFoundException\`, \`BusinessException\`)
- Spring validation: \`MethodArgumentNotValidException\` (from \`@Valid\`)
- Spring MVC: \`MethodArgumentTypeMismatchException\`, \`MissingServletRequestParameterException\`
- Spring Security: \`AccessDeniedException\`, \`AuthenticationException\`
- Hibernate: \`ConstraintViolationException\`, \`DataIntegrityViolationException\``,
  whyWeNeedIt: `Without global exception handling:
- Unhandled exceptions return 500 Internal Server Error with a stack trace (security risk)
- Different parts of the API return different error formats
- Clients can\'t reliably parse error responses
- Debugging is harder because errors aren\'t logged consistently

With @ControllerAdvice:
- Consistent JSON error format across all endpoints
- Correct HTTP status codes (400 for validation, 404 for not found, 409 for conflicts)
- No stack traces in responses (security)
- Centralized logging of errors`,
  realWorldUsage: `Every production Spring Boot API has a global exception handler. Standard pattern:
- \`ResourceNotFoundException\` → 404 Not Found
- \`ValidationException\` → 400 Bad Request with field errors
- \`BusinessException\` → 422 Unprocessable Entity
- \`AccessDeniedException\` → 403 Forbidden
- \`Exception\` (catch-all) → 500 Internal Server Error (log it, don\'t expose details)`,
  howItWorks: `When an exception is thrown from a controller (or service/repository called by a controller):
1. Spring\'s DispatcherServlet catches it
2. Looks for a matching @ExceptionHandler in the current controller first
3. Then looks in @ControllerAdvice classes
4. The first matching handler handles it
5. Returns the ResponseEntity from the handler method`,
  example: {
    title: 'Production Exception Handling',
    description: 'Complete global exception handler with consistent error responses.',
    code: [
      {
        label: 'Custom Exceptions',
        language: 'java',
        code: `// Base exception
public class ApiException extends RuntimeException {
    private final HttpStatus status;
    private final String errorCode;

    public ApiException(HttpStatus status, String errorCode, String message) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
    }

    public HttpStatus getStatus() { return status; }
    public String getErrorCode() { return errorCode; }
}

// Specific exceptions
public class ResourceNotFoundException extends ApiException {
    public ResourceNotFoundException(String resource, Object id) {
        super(HttpStatus.NOT_FOUND, "RESOURCE_NOT_FOUND",
              resource + " not found with id: " + id);
    }
}

public class BusinessException extends ApiException {
    public BusinessException(String errorCode, String message) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, errorCode, message);
    }
}

public class DuplicateResourceException extends ApiException {
    public DuplicateResourceException(String resource, String field, Object value) {
        super(HttpStatus.CONFLICT, "DUPLICATE_RESOURCE",
              resource + " already exists with " + field + ": " + value);
    }
}`,
      },
      {
        label: 'Global Exception Handler',
        language: 'java',
        code: `@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // Standard error response format
    public record ErrorResponse(
        String errorCode,
        String message,
        String path,
        LocalDateTime timestamp,
        List<FieldError> fieldErrors
    ) {
        public record FieldError(String field, String message) {}
    }

    // Handle our custom API exceptions
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(
            ApiException ex, HttpServletRequest request) {

        log.warn("API exception on {}: {} - {}",
            request.getRequestURI(), ex.getErrorCode(), ex.getMessage());

        return ResponseEntity
            .status(ex.getStatus())
            .body(new ErrorResponse(
                ex.getErrorCode(),
                ex.getMessage(),
                request.getRequestURI(),
                LocalDateTime.now(),
                null
            ));
    }

    // Handle @Valid validation failures
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status,
            WebRequest request) {

        List<ErrorResponse.FieldError> fieldErrors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(fe -> new ErrorResponse.FieldError(
                fe.getField(),
                fe.getDefaultMessage()
            ))
            .toList();

        return ResponseEntity
            .badRequest()
            .body(new ErrorResponse(
                "VALIDATION_FAILED",
                "Request validation failed",
                ((ServletWebRequest) request).getRequest().getRequestURI(),
                LocalDateTime.now(),
                fieldErrors
            ));
    }

    // Handle type mismatch (/users/abc when Long expected)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex, HttpServletRequest request) {

        String message = String.format("Parameter '%s' should be of type %s",
            ex.getName(), ex.getRequiredType().getSimpleName());

        return ResponseEntity
            .badRequest()
            .body(new ErrorResponse("TYPE_MISMATCH", message,
                request.getRequestURI(), LocalDateTime.now(), null));
    }

    // Catch-all — never expose internal details
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnexpected(
            Exception ex, HttpServletRequest request) {

        log.error("Unexpected error on {}", request.getRequestURI(), ex);

        return ResponseEntity
            .internalServerError()
            .body(new ErrorResponse(
                "INTERNAL_ERROR",
                "An unexpected error occurred",
                request.getRequestURI(),
                LocalDateTime.now(),
                null
            ));
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: '@ControllerAdvice vs @RestControllerAdvice — difference?',
      answer: '@RestControllerAdvice = @ControllerAdvice + @ResponseBody. Use @RestControllerAdvice for REST APIs — it automatically serializes your return value to JSON. @ControllerAdvice is for MVC apps where you might return view names.',
    },
    {
      question: 'Why does my @ExceptionHandler not catch Spring Security exceptions?',
      answer: 'Spring Security exceptions (AccessDeniedException, AuthenticationException) are handled by the security filter chain BEFORE reaching the DispatcherServlet. To handle them, implement AuthenticationEntryPoint (for 401) and AccessDeniedHandler (for 403) and register them in your SecurityFilterChain.',
    },
  ],
  productionIssues: [
    'Stack traces returned in error responses — the catch-all handler must not include ex.getMessage() for unexpected exceptions',
    'Validation errors not returning field details — override handleMethodArgumentNotValid in ResponseEntityExceptionHandler',
    'DataIntegrityViolationException from DB constraints returning 500 — catch it and return 409 Conflict',
    'Error responses not in consistent format — establish one ErrorResponse record and use it everywhere',
  ],
  bestPractices: [
    'Always have a catch-all @ExceptionHandler(Exception.class) that returns 500 without exposing internals',
    'Log unexpected exceptions with full stack trace; log expected exceptions at WARN level',
    'Use RFC 7807 ProblemDetail format (Spring Boot 3.x) for standards-compliant error responses',
    'Include a request ID in error responses for correlation with logs',
    'Never expose stack traces, class names, or SQL in error responses',
  ],
  architectNote: `Error handling is part of your API contract. Define your error format early and document it in your OpenAPI spec. Clients need to handle errors reliably — if your format changes, you break them. Use RFC 7807 Problem Details (built into Spring Boot 3.x with \`spring.mvc.problemdetails.enabled=true\`) for a standards-compliant format that clients can parse without custom code.`,
  faqs: [
    {
      question: 'How do I enable RFC 7807 Problem Details in Spring Boot 3.x?',
      answer: 'Set spring.mvc.problemdetails.enabled=true in application.properties. Spring Boot 3.x then uses ProblemDetail as the error response format for all built-in exceptions. For your custom exceptions, return ProblemDetail from your @ExceptionHandler methods.',
    },
    {
      question: 'How do I handle exceptions in async methods (@Async)?',
      answer: '@ControllerAdvice doesn\'t catch exceptions from @Async methods — they run in a different thread. Use AsyncUncaughtExceptionHandler by implementing AsyncConfigurer.getAsyncUncaughtExceptionHandler(). Or wrap the async logic in a try-catch and handle exceptions there.',
    },
  ],
  keyTakeaways: [
    '@RestControllerAdvice provides global exception handling for all controllers',
    '@ExceptionHandler maps exception types to HTTP responses',
    'Always have a catch-all handler that returns 500 without exposing internals',
    'Override handleMethodArgumentNotValid for detailed validation error responses',
    'Spring Security exceptions need AuthenticationEntryPoint and AccessDeniedHandler',
    'Enable RFC 7807 Problem Details in Spring Boot 3.x for standards compliance',
  ],
  relatedTopics: ['spring-controllers', 'spring-request-mapping', 'spring-security', 'spring-unit-testing'],
};
