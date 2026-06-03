import type { TopicContent } from '../../types';

export const springTransactions: TopicContent = {
  slug: 'spring-transactions',
  title: 'Transactions',
  description: 'Master Spring transaction management — @Transactional, propagation, isolation levels, rollback rules, and the common pitfalls that cause silent data corruption in production.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: '@Transactional wraps a method in a database transaction. If the method succeeds, the transaction commits. If a RuntimeException is thrown, it rolls back. Put @Transactional on service methods that modify data. The most common mistake: calling a @Transactional method from within the same class — the transaction won\'t work due to how Spring proxies work.',
  whatIsIt: `Spring\'s @Transactional annotation manages database transactions declaratively.

**What @Transactional does:**
1. Opens a transaction before the method runs
2. Commits if the method returns normally
3. Rolls back if a RuntimeException (or configured exception) is thrown
4. Handles transaction propagation (joining existing or starting new)

**Key attributes:**
- \`propagation\` — how to handle existing transactions (REQUIRED, REQUIRES_NEW, etc.)
- \`isolation\` — isolation level (READ_COMMITTED, REPEATABLE_READ, etc.)
- \`readOnly\` — hint for optimization (no dirty checking, read replicas)
- \`rollbackFor\` — exceptions that trigger rollback (default: RuntimeException)
- \`noRollbackFor\` — exceptions that don\'t trigger rollback
- \`timeout\` — transaction timeout in seconds`,
  whyWeNeedIt: `Without transactions, partial failures leave your database in inconsistent states:
\`\`\`java
// WITHOUT @Transactional — dangerous!
public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
    accountRepository.debit(fromId, amount);   // succeeds
    // *** Server crashes here ***
    accountRepository.credit(toId, amount);    // never runs
    // Money is gone! Database is inconsistent.
}

// WITH @Transactional — safe
@Transactional
public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
    accountRepository.debit(fromId, amount);
    accountRepository.credit(toId, amount);
    // Either both succeed or both roll back
}
\`\`\``,
  realWorldUsage: `@Transactional is on every service method that writes to the database. @Transactional(readOnly=true) on every service method that only reads. Complex operations (order placement, payment processing, inventory reservation) must be in a single transaction to maintain consistency.`,
  howItWorks: `Spring creates a proxy around your @Transactional class. When you call a method, the proxy:
1. Checks if there\'s an existing transaction (based on propagation)
2. Opens a new transaction or joins existing
3. Calls your method
4. Commits or rolls back based on the outcome

**The self-invocation trap:**
When a method in a class calls another method in the SAME class, the call bypasses the proxy. The @Transactional annotation on the inner method is ignored. This is the #1 Spring transaction bug.`,
  example: {
    title: 'Transaction Management in Practice',
    description: 'Propagation, isolation, rollback rules, and common pitfalls.',
    code: [
      {
        label: 'Standard Transaction Patterns',
        language: 'java',
        code: `@Service
@Transactional  // Default for all write methods in this service
public class OrderService {

    // Inherits class-level @Transactional (REQUIRED propagation)
    public Order placeOrder(CreateOrderRequest request) {
        // All these run in ONE transaction
        Order order = orderRepository.save(Order.from(request));
        inventoryService.reserve(request.getItems());  // joins same transaction
        paymentService.charge(order);                  // joins same transaction
        notificationService.sendConfirmation(order);   // joins same transaction
        return order;
        // If ANY of these throw RuntimeException, ALL changes roll back
    }

    // Read-only — no dirty checking, can use read replica
    @Transactional(readOnly = true)
    public Page<OrderSummaryDto> findOrders(Long customerId, Pageable pageable) {
        return orderRepository.findByCustomerId(customerId, pageable)
            .map(OrderSummaryDto::from);
    }

    // Requires a NEW transaction — commits independently of the caller
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logAuditEvent(AuditEvent event) {
        // This transaction commits even if the caller's transaction rolls back
        auditRepository.save(event);
    }

    // Rollback on checked exception too
    @Transactional(rollbackFor = Exception.class)
    public void processPayment(Long orderId) throws PaymentException {
        // Rolls back on PaymentException (checked) AND RuntimeException
    }

    // Timeout — rolls back if takes more than 30 seconds
    @Transactional(timeout = 30)
    public void generateReport() {
        // Long-running operation with timeout guard
    }
}`,
      },
      {
        label: 'Self-Invocation Trap',
        language: 'java',
        code: `@Service
public class UserService {

    // BAD: self-invocation bypasses proxy — @Transactional ignored!
    public void createUserWithProfile(CreateUserRequest request) {
        this.createUser(request);  // calls method on 'this', not the proxy!
        // @Transactional on createUser is IGNORED
    }

    @Transactional
    public void createUser(CreateUserRequest request) {
        userRepository.save(User.from(request));
        profileRepository.save(UserProfile.from(request));
    }

    // GOOD: inject self to go through the proxy
    @Autowired
    private UserService self;  // Spring injects the proxy

    public void createUserWithProfile(CreateUserRequest request) {
        self.createUser(request);  // goes through proxy, @Transactional works!
    }

    // BETTER: redesign to avoid self-invocation
    // Move createUser to a separate service that this class depends on
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does @Transactional on a class apply to all methods?',
      answer: 'Yes — @Transactional on the class sets the default for all public methods. Individual methods can override it. @Transactional(readOnly=true) on the class + @Transactional on specific write methods is a common pattern.',
    },
    {
      question: 'Why doesn\'t @Transactional rollback on checked exceptions?',
      answer: 'By default, Spring only rolls back on RuntimeException and Error (unchecked). For checked exceptions, use @Transactional(rollbackFor=Exception.class) or @Transactional(rollbackFor=YourCheckedException.class). This is a common gotcha — a checked exception escapes and the transaction commits partial changes.',
    },
    {
      question: 'What is the difference between REQUIRED and REQUIRES_NEW?',
      answer: 'REQUIRED (default): join the existing transaction if there is one, otherwise start a new one. REQUIRES_NEW: always start a new transaction, suspending the current one. Use REQUIRES_NEW for operations that must commit independently (audit logging, notification sending) — they should commit even if the main transaction rolls back.',
    },
  ],
  productionIssues: [
    'Self-invocation bypassing @Transactional proxy — always call @Transactional methods from injected beans',
    '@Transactional on private methods — Spring proxies can only intercept public methods',
    'Checked exception not rolling back — use rollbackFor=Exception.class',
    'Transaction too large holding database locks for too long — split into smaller transactions',
    'LazyInitializationException outside transaction — disable open-in-view and load what you need in the transaction',
  ],
  bestPractices: [
    '@Transactional belongs on SERVICE methods, not repository or controller methods',
    'Use @Transactional(readOnly=true) on all read-only service methods',
    'Keep transactions short — don\'t do slow operations (HTTP calls, file I/O) inside a transaction',
    'Never call @Transactional methods from within the same class (self-invocation)',
    'Use REQUIRES_NEW for audit logging and notification sending',
    'Set rollbackFor=Exception.class if your methods throw checked exceptions',
  ],
  architectNote: `Long transactions are the #1 cause of database deadlocks and performance issues in production. The pattern: start transaction, do DB work, end transaction quickly. Never make HTTP calls to external services inside a transaction — if the external service takes 10 seconds, you\'re holding a database transaction for 10 seconds. Use the Outbox pattern: write the intent to the DB in the transaction, then process it asynchronously outside the transaction.`,
  faqs: [
    {
      question: 'What is the Outbox pattern?',
      answer: 'Instead of calling an external service inside a transaction, write an "outbox" record to the database in the same transaction. A separate process reads the outbox and sends the event/notification. This ensures atomicity (the outbox record is committed with your data) without holding a transaction open during external calls.',
    },
    {
      question: 'What is optimistic locking and how do I use it?',
      answer: 'Optimistic locking prevents lost updates without database locks. Add @Version Long version to your entity. When two transactions read the same entity and both try to update it, the second update fails with OptimisticLockException because the version has changed. Handle it by retrying the operation.',
    },
  ],
  keyTakeaways: [
    '@Transactional wraps a method in a transaction — commits on success, rolls back on RuntimeException',
    'Only rolls back on RuntimeException by default — use rollbackFor for checked exceptions',
    'Self-invocation bypasses the proxy — @Transactional on same-class calls is ignored',
    '@Transactional only works on public methods',
    'REQUIRES_NEW starts an independent transaction that commits separately',
    'Keep transactions short — never do I/O inside a transaction',
  ],
  relatedTopics: ['spring-data-jpa', 'spring-entity-mapping', 'spring-mysql', 'spring-postgresql'],
};
