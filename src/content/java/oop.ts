import type { TopicContent } from '../types';

export const javaClassesObjects: TopicContent = {
  slug: 'java-classes-objects',
  title: 'Classes & Objects',
  description: 'The foundation of Java OOP — how classes define blueprints and objects are instances, with constructors, fields, methods, and the this keyword.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A class is a blueprint. An object is an instance of that blueprint. A class defines what data (fields) and behavior (methods) objects will have. When you write new Employee(), you are creating an object — an instance of the Employee class — allocated on the heap.',
  whatIsIt: `**Class**
A class is a template that defines:
- **Fields** (instance variables) — the data/state each object holds
- **Methods** — the behavior/actions objects can perform
- **Constructors** — special methods to initialize objects
- **Static members** — shared across all instances (class-level, not instance-level)

**Object**
An object is a runtime instance of a class:
- Has its own copy of instance fields
- Shares methods with all other instances (methods are in the class, not each object)
- Lives on the heap, referenced by a variable on the stack

**Records (Java 16+)**
Immutable data classes with auto-generated constructor, getters, equals, hashCode, toString:
\`\`\`java
record Point(int x, int y) {}
\`\`\`

**Key Concepts:**
- \`this\` — refers to the current object instance
- \`static\` — belongs to the class, not instances
- \`final\` — on a class: cannot be subclassed; on a field: cannot be reassigned; on a method: cannot be overridden
- Access modifiers: \`private\`, \`package-private\` (default), \`protected\`, \`public\``,
  whyWeNeedIt: `Classes and objects are the core of OOP. They solve:

- **Modeling real-world entities** — Employee, Order, Product are natural classes
- **Encapsulation** — bundle data and behavior together; hide implementation details
- **Reusability** — define once, instantiate many times
- **Code organization** — group related functionality into cohesive units

Without classes, you'd have scattered variables and functions with no clear ownership — like C procedural code. In enterprise Java, every entity (User, Order, Product), every service (OrderService, PaymentService), and every configuration (AppConfig) is a class.`,
  realWorldUsage: `In a real Spring Boot enterprise project:

\`\`\`java
// Entity class (JPA)
@Entity
public class Order {
    @Id @GeneratedValue
    private Long id;
    private String customerId;
    private BigDecimal totalAmount;
    private OrderStatus status;
    // getters, setters, business methods
}

// Service class
@Service
public class OrderService {
    private final OrderRepository repo;
    public Order createOrder(CreateOrderRequest req) { ... }
}

// Value object (Record, Java 16+)
record CreateOrderRequest(String customerId, List<OrderItem> items) {}
\`\`\``,
  howItWorks: `**Object Creation:**
1. JVM allocates memory on the heap for the object
2. All instance fields are initialized to defaults (0, null, false)
3. Constructor runs, setting fields to specified values
4. Reference to the object is returned to the caller

**Constructor Chaining:**
- \`this()\` calls another constructor in the same class
- \`super()\` calls the parent class constructor (implicit first line if not specified)

**Static vs Instance:**
- Static fields: one copy shared by all instances — stored in Metaspace
- Instance fields: each object has its own copy — stored on Heap
- Static methods: called on the class, cannot access instance fields
- Instance methods: called on an object, can access both static and instance fields

**Garbage Collection:**
Objects become eligible for GC when no references point to them.`,
  example: {
    title: 'Building a Real Enterprise Class',
    description: 'A complete Employee class showing all key concepts in one place.',
    code: [
      {
        label: 'Complete Class Example',
        language: 'java',
        code: `public class Employee {
    // Static field — shared by all instances
    private static int totalEmployees = 0;
    
    // Instance fields — each object has its own copy
    private final Long id;          // final: set once in constructor
    private String name;
    private String department;
    private BigDecimal salary;
    
    // Primary constructor
    public Employee(Long id, String name, String department, BigDecimal salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
        totalEmployees++;           // update shared counter
    }
    
    // Convenience constructor — chains to primary
    public Employee(Long id, String name) {
        this(id, name, "Unassigned", BigDecimal.ZERO);
    }
    
    // Business method
    public void giveRaise(BigDecimal percentage) {
        if (percentage.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Raise must be positive");
        }
        BigDecimal multiplier = BigDecimal.ONE.add(
            percentage.divide(new BigDecimal("100"))
        );
        this.salary = this.salary.multiply(multiplier)
                          .setScale(2, RoundingMode.HALF_UP);
    }
    
    // Static factory method (preferred over constructor in many cases)
    public static Employee newHire(String name, String department) {
        return new Employee(
            System.currentTimeMillis(),  // generate ID
            name, department,
            new BigDecimal("50000.00")   // default starting salary
        );
    }
    
    // Static utility
    public static int getTotalEmployees() { return totalEmployees; }
    
    // Getters (no public setters for id — immutable)
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public BigDecimal getSalary() { return salary; }
    public void setName(String name) { this.name = name; }
    
    @Override
    public String toString() {
        return "Employee{id=%d, name='%s', dept='%s', salary=%s}"
            .formatted(id, name, department, salary);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee other)) return false;
        return Objects.equals(id, other.id);  // equality by ID
    }
    
    @Override
    public int hashCode() { return Objects.hash(id); }
}`,
      },
      {
        label: 'Records — Modern Immutable Data Classes',
        language: 'java',
        code: `// Java 16+ Record: immutable data carrier
// Auto-generates: constructor, getters, equals, hashCode, toString
record Money(BigDecimal amount, String currency) {
    // Compact constructor for validation
    Money {
        Objects.requireNonNull(amount, "amount required");
        Objects.requireNonNull(currency, "currency required");
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
        // Normalize currency to uppercase
        currency = currency.toUpperCase();
    }
    
    // Custom methods are allowed
    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Currency mismatch");
        }
        return new Money(this.amount.add(other.amount), this.currency);
    }
    
    public boolean isZero() {
        return amount.compareTo(BigDecimal.ZERO) == 0;
    }
}

// Usage
Money price = new Money(new BigDecimal("29.99"), "usd");
Money tax = new Money(new BigDecimal("2.40"), "USD");
Money total = price.add(tax);
System.out.println(total);  // Money[amount=32.39, currency=USD]`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between a class and an object?',
      answer: 'A class is a blueprint/template defined in code. An object is a live instance created from that blueprint at runtime. Employee is a class. The specific employee "John Smith with ID 42" is an object. You can create thousands of Employee objects from one Employee class.',
    },
    {
      question: 'What is the difference between static and instance members?',
      answer: 'Static members belong to the class — there is one copy shared by all instances. Instance members belong to each object — every object has its own copy. Use static for utility methods, constants, and counters. Use instance fields for object-specific state (name, age, salary).',
    },
    {
      question: 'When should I use a Record vs a regular class?',
      answer: 'Use Record for immutable data carriers — DTOs, value objects, API request/response bodies, configuration data. Use regular classes when you need mutability, inheritance, or complex business logic. Records cannot extend other classes (they implicitly extend Record) but can implement interfaces.',
    },
  ],
  productionIssues: [
    'Mutable objects shared across threads — if multiple threads access the same object and at least one modifies it, you have a race condition. Use immutable objects (records, final fields) or synchronization.',
    'equals/hashCode not overridden — objects used in HashSet or as HashMap keys must have consistent equals and hashCode. Default Object.equals() compares references, not values.',
    'Static mutable state — static fields shared across all instances cause bugs in multi-threaded environments and make testing hard. Prefer dependency injection over static state.',
    'Constructors with too many parameters — more than 4-5 parameters is a code smell. Use Builder pattern or records with named fields.',
  ],
  bestPractices: [
    'Always override equals() and hashCode() together, based on the same fields.',
    'Make fields private and provide getters/setters only where needed.',
    'Use records (Java 16+) for immutable data carriers — they eliminate boilerplate.',
    'Prefer static factory methods over constructors for complex object creation.',
    'Keep classes small and focused — Single Responsibility Principle.',
    'Use final on fields that should not change after construction.',
  ],
  architectNote: 'In modern Spring Boot applications, most classes fall into clear categories: @Entity (JPA data model), @Service (business logic), @Repository (data access), @Controller/@RestController (HTTP layer), and Records/DTOs (data transfer). This layered architecture with clear class responsibilities is what makes enterprise codebases maintainable. Avoid "god classes" that do everything.',
  faqs: [
    {
      question: 'What is the Builder pattern and when should I use it?',
      answer: 'The Builder pattern is for creating objects with many optional parameters. Instead of a constructor with 10 parameters, you chain setter-like methods: new Employee.Builder().name("John").department("Eng").salary(90000).build(). Lombok @Builder annotation generates this automatically. Use it when a class has more than 4-5 constructor parameters.',
    },
    {
      question: 'What is the difference between shallow copy and deep copy?',
      answer: 'Shallow copy copies the object but shares references to nested objects. Deep copy recursively copies all nested objects. Object.clone() does a shallow copy by default. For deep copy, use copy constructors, serialization, or libraries like ModelMapper. In practice, prefer immutable objects (records) to avoid copy complexity entirely.',
    },
  ],
  keyTakeaways: [
    'A class is a blueprint; an object is a runtime instance on the heap',
    'Static members belong to the class; instance members belong to each object',
    'Always override equals() and hashCode() together',
    'Use records (Java 16+) for immutable data carriers — they eliminate boilerplate',
    'Constructors chain with this(); parent constructors with super()',
    'Keep classes small and focused on a single responsibility',
  ],
  relatedTopics: ['java-encapsulation', 'java-inheritance', 'java-polymorphism', 'java-generics'],
};

export const javaEncapsulation: TopicContent = {
  slug: 'java-encapsulation',
  title: 'Encapsulation',
  description: 'How encapsulation protects object state, enforces invariants, and makes code maintainable — the OOP principle every senior developer relies on.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Encapsulation means hiding the internal state of an object and only exposing a controlled interface. You make fields private and provide public methods (getters/setters) that control how the data is accessed and modified. This lets you enforce rules — like "salary cannot be negative" — that would be impossible if fields were public.',
  whatIsIt: `Encapsulation is one of the four pillars of OOP. It means:

**1. Data Hiding**
Fields are declared \`private\` — they cannot be accessed directly from outside the class.

**2. Controlled Access**
Public getter and setter methods provide controlled read/write access.

**3. Invariant Enforcement**
Setters validate data before accepting it, ensuring the object is always in a valid state.

**4. Implementation Independence**
Internal representation can change without affecting callers — only the public interface matters.

**Access Modifiers:**
- \`private\` — accessible only within the same class
- \`package-private\` (no modifier) — accessible within the same package
- \`protected\` — accessible within same package + subclasses
- \`public\` — accessible from anywhere`,
  whyWeNeedIt: `Without encapsulation:
\`\`\`java
// BAD: public fields, no protection
class BankAccount {
    public double balance;  // anyone can set balance = -999999
}
account.balance = -1000000;  // silently broken!
\`\`\`

With encapsulation:
\`\`\`java
// GOOD: private field, controlled access
class BankAccount {
    private double balance;
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        this.balance += amount;
    }
}
\`\`\`

Encapsulation enforces business rules at the object level, making it impossible to put an object in an invalid state.`,
  realWorldUsage: `In enterprise projects, encapsulation appears everywhere:

- **JPA Entities** — private fields with getters; setters only where needed
- **Validation** — setters throw IllegalArgumentException for invalid data
- **Immutable Value Objects** — no setters at all; state set only in constructor
- **Builder Pattern** — encapsulates complex construction logic
- **Service Layer** — business rules encapsulated in service methods, not exposed directly`,
  howItWorks: `**Getter/Setter Convention:**
- Getter: \`public Type getFieldName()\` (or \`isFieldName()\` for boolean)
- Setter: \`public void setFieldName(Type value)\`

**Lombok reduces boilerplate:**
\`\`\`java
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Employee { ... }
\`\`\`

**Immutability is the strongest form of encapsulation:**
No setters + final fields = object cannot change after construction = thread-safe by default.`,
  example: {
    title: 'Encapsulation in a Banking Domain',
    description: 'A BankAccount class showing how encapsulation enforces business rules.',
    code: [
      {
        label: 'Well-Encapsulated Class',
        language: 'java',
        code: `public class BankAccount {
    private final String accountNumber;  // immutable
    private final String ownerId;        // immutable
    private BigDecimal balance;
    private boolean frozen;
    private final List<String> transactionLog = new ArrayList<>();
    
    public BankAccount(String accountNumber, String ownerId) {
        this.accountNumber = Objects.requireNonNull(accountNumber);
        this.ownerId = Objects.requireNonNull(ownerId);
        this.balance = BigDecimal.ZERO;
        this.frozen = false;
    }
    
    // Business method — encapsulates deposit logic
    public void deposit(BigDecimal amount) {
        validateNotFrozen();
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        this.balance = this.balance.add(amount);
        log("DEPOSIT", amount);
    }
    
    // Business method — encapsulates withdrawal logic
    public void withdraw(BigDecimal amount) {
        validateNotFrozen();
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amount.compareTo(this.balance) > 0) {
            throw new InsufficientFundsException(
                "Insufficient funds. Balance: " + balance + ", Requested: " + amount
            );
        }
        this.balance = this.balance.subtract(amount);
        log("WITHDRAWAL", amount);
    }
    
    // Read-only access to balance
    public BigDecimal getBalance() { return balance; }
    
    // Read-only access to transaction log (defensive copy)
    public List<String> getTransactionLog() {
        return Collections.unmodifiableList(transactionLog);
    }
    
    // No setter for balance — balance can only change via deposit/withdraw
    // No setter for accountNumber or ownerId — they are immutable
    
    public void freeze() { this.frozen = true; }
    public void unfreeze() { this.frozen = false; }
    public boolean isFrozen() { return frozen; }
    
    private void validateNotFrozen() {
        if (frozen) throw new IllegalStateException("Account is frozen");
    }
    
    private void log(String type, BigDecimal amount) {
        transactionLog.add(LocalDateTime.now() + " " + type + ": " + amount);
    }
    
    // Getters for immutable fields
    public String getAccountNumber() { return accountNumber; }
    public String getOwnerId() { return ownerId; }
}`,
      },
      {
        label: 'Lombok for Boilerplate Reduction',
        language: 'java',
        code: `// Without Lombok: 50+ lines of getters/setters
// With Lombok: clean and concise

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(of = "id")  // equals/hashCode based on id only
public class Product {
    private Long id;
    private String name;
    private BigDecimal price;
    private String category;
    private boolean active;
}

// Usage with Builder
Product p = Product.builder()
    .id(1L)
    .name("Laptop")
    .price(new BigDecimal("999.99"))
    .category("Electronics")
    .active(true)
    .build();

// For truly immutable objects, use @Value (all fields final, no setters)
@Value  // equivalent to @Getter @FieldDefaults(makeFinal=true) @AllArgsConstructor
public class ProductId {
    Long value;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'If I have getters and setters for every field, am I really encapsulating?',
      answer: 'Not really. A class with public getters and setters for every field is barely better than public fields — it is "anemic encapsulation." True encapsulation means only exposing what callers need, and enforcing invariants in setters. Ask: does every field need a setter? Can some operations be expressed as business methods (deposit, withdraw) instead of raw setters?',
    },
    {
      question: 'What is the difference between encapsulation and information hiding?',
      answer: 'They are closely related but not identical. Encapsulation is the mechanism (private fields + public methods). Information hiding is the principle (callers should not need to know implementation details). Encapsulation is how you achieve information hiding in Java.',
    },
    {
      question: 'Should I always use getters/setters or can fields ever be public?',
      answer: 'There are valid cases for public fields: records (Java 16+, though they use accessors), simple data holders in test code, and mathematical types like Point where x and y are inherently public. In production business code, keep fields private. The Java community convention is clear: private fields with accessors.',
    },
  ],
  productionIssues: [
    'Returning mutable collections from getters — if getList() returns the internal list, callers can modify it. Return Collections.unmodifiableList() or a copy.',
    'Setters that bypass validation — adding a setter to fix a compilation error without thinking about invariants breaks encapsulation silently.',
    'Anemic domain model — entities with only getters/setters and no business logic. Business rules end up scattered in service classes, making the domain model meaningless.',
  ],
  bestPractices: [
    'Make all fields private by default. Add getters only when needed, setters only when mutation is required.',
    'Return defensive copies or unmodifiable views of mutable collections from getters.',
    'Prefer immutability — no setters, final fields, records. Immutable objects are thread-safe by default.',
    'Express business operations as methods (deposit, activate, cancel) rather than raw setters.',
    'Use Lombok @Value or records for immutable data classes to reduce boilerplate.',
  ],
  architectNote: 'The debate between rich domain models (business logic in entities) and anemic domain models (logic in services) is ongoing. Rich models follow true encapsulation — the Order class knows how to add items, calculate totals, and validate itself. Anemic models put all logic in OrderService. For complex domains, rich models are more maintainable. For simple CRUD apps, anemic models are fine. Choose based on domain complexity.',
  faqs: [
    {
      question: 'What is a defensive copy and when do I need one?',
      answer: 'A defensive copy is a copy of a mutable object made to prevent external modification. If your class stores a Date or List passed in the constructor, a caller could modify the original after construction. Solution: store a copy — this.date = new Date(date.getTime()). Similarly, return copies from getters. With Java 8+ Instant (immutable) and records, defensive copies are less needed.',
    },
    {
      question: 'How does encapsulation relate to thread safety?',
      answer: 'Immutable objects (all final fields, no setters) are inherently thread-safe — they cannot be modified after construction, so no synchronization is needed. Mutable encapsulated objects still need synchronization if accessed from multiple threads. Encapsulation makes it easier to add synchronization in one place (the setter/method) rather than everywhere callers access the field.',
    },
  ],
  keyTakeaways: [
    'Make fields private; provide public methods for controlled access',
    'Setters should validate data and enforce business invariants',
    'Returning mutable collections from getters breaks encapsulation — return unmodifiable views',
    'Immutability is the strongest form of encapsulation — and is thread-safe by default',
    'Express business operations as methods, not just raw getters/setters',
    'Lombok @Value or records eliminate boilerplate for immutable classes',
  ],
  relatedTopics: ['java-classes-objects', 'java-inheritance', 'java-abstraction', 'java-threads'],
};

export const javaInheritance: TopicContent = {
  slug: 'java-inheritance',
  title: 'Inheritance',
  description: 'How Java inheritance works — extends, super, method overriding, and when to use inheritance vs composition in real enterprise projects.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Inheritance lets one class (child/subclass) acquire the fields and methods of another class (parent/superclass) using the extends keyword. A Dog extends Animal — Dog inherits all Animal behavior and can add its own. Java supports single inheritance for classes but multiple inheritance through interfaces.',
  whatIsIt: `**Inheritance Hierarchy**
\`\`\`
Object (root of all Java classes)
  └── Animal
        ├── Dog
        └── Cat
\`\`\`

**Key Keywords:**
- \`extends\` — inherit from a class (single inheritance only)
- \`implements\` — implement one or more interfaces
- \`super\` — access parent class constructor or methods
- \`@Override\` — marks a method that overrides a parent method
- \`final\` — on a class: cannot be subclassed; on a method: cannot be overridden
- \`abstract\` — class cannot be instantiated; method must be overridden

**What is Inherited:**
- Public and protected fields and methods
- Package-private members (if same package)

**What is NOT Inherited:**
- Private members
- Constructors (but you can call them with super())
- Static members (they belong to the class, not instances)`,
  whyWeNeedIt: `Inheritance solves code reuse in hierarchical relationships:

- **Is-a relationship** — Dog IS-A Animal; SavingsAccount IS-A BankAccount
- **Code reuse** — common behavior defined once in parent, inherited by all children
- **Polymorphism** — treat subclasses uniformly through parent type reference
- **Framework extension** — Spring, Hibernate, and most frameworks use inheritance for customization

However, inheritance is often overused. The modern rule: **prefer composition over inheritance** unless there is a clear IS-A relationship.`,
  realWorldUsage: `In enterprise Spring Boot projects:

\`\`\`java
// Base entity with common audit fields
@MappedSuperclass
public abstract class BaseEntity {
    @Id @GeneratedValue
    private Long id;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}

// All entities inherit audit fields
@Entity
public class Order extends BaseEntity { ... }

@Entity
public class Product extends BaseEntity { ... }
\`\`\`

This is a legitimate use of inheritance — all entities genuinely share audit behavior.`,
  howItWorks: `**Constructor Chaining:**
When you create a subclass object, the parent constructor runs first. If you don't call \`super()\` explicitly, Java calls the no-arg parent constructor automatically. If the parent has no no-arg constructor, you MUST call \`super(args)\` explicitly.

**Method Resolution (Dynamic Dispatch):**
At runtime, the JVM calls the most specific override. Even if the reference type is Animal, if the actual object is a Dog, Dog's method is called.

**Method Hiding (static methods):**
Static methods are NOT polymorphic. If a subclass defines a static method with the same signature, it hides the parent's static method — it does not override it.

**Sealed Classes (Java 17+):**
\`sealed class Shape permits Circle, Rectangle, Triangle\`
Restricts which classes can extend Shape — useful for exhaustive pattern matching.`,
  example: {
    title: 'Inheritance in an Enterprise Payment System',
    description: 'A payment system showing when inheritance is appropriate and when to use composition.',
    code: [
      {
        label: 'Appropriate Inheritance',
        language: 'java',
        code: `// Abstract base class — defines the contract
public abstract class Payment {
    protected final String paymentId;
    protected final BigDecimal amount;
    protected final String currency;
    protected PaymentStatus status;
    
    protected Payment(String paymentId, BigDecimal amount, String currency) {
        this.paymentId = paymentId;
        this.amount = amount;
        this.currency = currency;
        this.status = PaymentStatus.PENDING;
    }
    
    // Template method pattern — defines the algorithm structure
    public final PaymentResult process() {
        validate();                    // common validation
        PaymentResult result = execute(); // subclass-specific execution
        postProcess(result);           // common post-processing
        return result;
    }
    
    // Common validation for all payment types
    protected void validate() {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Payment amount must be positive");
        }
    }
    
    // Each subclass implements its own execution
    protected abstract PaymentResult execute();
    
    // Hook method — subclasses can override if needed
    protected void postProcess(PaymentResult result) {
        this.status = result.isSuccess() ? PaymentStatus.COMPLETED : PaymentStatus.FAILED;
    }
    
    public String getPaymentId() { return paymentId; }
    public BigDecimal getAmount() { return amount; }
    public PaymentStatus getStatus() { return status; }
}

// Concrete subclass
public class CreditCardPayment extends Payment {
    private final String cardToken;
    private final String cvv;
    
    public CreditCardPayment(String paymentId, BigDecimal amount,
                              String currency, String cardToken, String cvv) {
        super(paymentId, amount, currency);
        this.cardToken = cardToken;
        this.cvv = cvv;
    }
    
    @Override
    protected void validate() {
        super.validate();  // call parent validation first
        if (cardToken == null || cardToken.isBlank()) {
            throw new IllegalArgumentException("Card token required");
        }
    }
    
    @Override
    protected PaymentResult execute() {
        // Call payment gateway API
        return paymentGateway.charge(cardToken, amount, currency);
    }
}

// Another subclass
public class BankTransferPayment extends Payment {
    private final String iban;
    
    public BankTransferPayment(String paymentId, BigDecimal amount,
                                String currency, String iban) {
        super(paymentId, amount, currency);
        this.iban = iban;
    }
    
    @Override
    protected PaymentResult execute() {
        return bankService.transfer(iban, amount, currency);
    }
}`,
      },
      {
        label: 'Sealed Classes (Java 17+)',
        language: 'java',
        code: `// Sealed class: only permitted subclasses can extend
public sealed class Shape permits Circle, Rectangle, Triangle {
    public abstract double area();
}

public final class Circle extends Shape {
    private final double radius;
    Circle(double radius) { this.radius = radius; }
    
    @Override
    public double area() { return Math.PI * radius * radius; }
}

public final class Rectangle extends Shape {
    private final double width, height;
    Rectangle(double width, double height) {
        this.width = width; this.height = height;
    }
    
    @Override
    public double area() { return width * height; }
}

// Exhaustive pattern matching with sealed classes (Java 21)
public static String describe(Shape shape) {
    return switch (shape) {
        case Circle c    -> "Circle with radius " + c.radius;
        case Rectangle r -> "Rectangle " + r.width + "x" + r.height;
        case Triangle t  -> "Triangle";
        // No default needed — compiler knows all cases are covered!
    };
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use inheritance vs composition?',
      answer: 'Use inheritance for IS-A relationships where the subclass is genuinely a specialized version of the parent (Dog IS-A Animal, SavingsAccount IS-A BankAccount). Use composition for HAS-A relationships (Car HAS-A Engine). The rule of thumb: if you cannot say "SubClass IS-A ParentClass" naturally, use composition. Composition is more flexible and avoids tight coupling.',
    },
    {
      question: 'What is the difference between method overriding and method hiding?',
      answer: 'Overriding applies to instance methods — the most specific implementation is called based on the actual runtime type (polymorphism). Hiding applies to static methods — the method called depends on the declared reference type, not the runtime type. Static methods are not polymorphic. Always annotate overrides with @Override to catch mistakes.',
    },
    {
      question: 'Why does Java not support multiple inheritance for classes?',
      answer: 'Multiple class inheritance creates the "diamond problem" — if class C extends A and B, and both A and B define the same method, which one does C inherit? Java avoids this by allowing only single class inheritance. Multiple interface inheritance is allowed because interfaces (before default methods) had no implementation to conflict.',
    },
  ],
  productionIssues: [
    'Deep inheritance hierarchies — more than 2-3 levels deep becomes hard to understand and maintain. Prefer composition.',
    'Calling overridable methods in constructors — if a parent constructor calls a method overridden by a subclass, the subclass method runs before the subclass constructor finishes, potentially accessing uninitialized fields.',
    'Breaking Liskov Substitution Principle — a subclass that throws exceptions or weakens behavior where the parent did not violates LSP and breaks polymorphic code.',
  ],
  bestPractices: [
    'Prefer composition over inheritance — use inheritance only for clear IS-A relationships.',
    'Always annotate overriding methods with @Override — the compiler catches mistakes.',
    'Never call overridable methods from constructors.',
    'Design for inheritance or prohibit it — mark classes final if not intended for subclassing.',
    'Keep inheritance hierarchies shallow — 2 levels max in most cases.',
    'Use abstract classes to define template methods; use interfaces to define contracts.',
  ],
  architectNote: 'In modern Spring Boot applications, inheritance is used sparingly: @MappedSuperclass for audit fields, abstract base controllers for shared error handling, and occasionally for strategy patterns. The dominant pattern is composition via dependency injection — services depend on interfaces, not concrete classes. This is more testable, more flexible, and avoids inheritance pitfalls.',
  faqs: [
    {
      question: 'What is the Liskov Substitution Principle?',
      answer: 'LSP states that objects of a subclass must be substitutable for objects of the parent class without breaking the program. If you have code that works with Payment, it should work with CreditCardPayment and BankTransferPayment without knowing which one it has. Violations: subclass throws exceptions the parent does not, subclass weakens preconditions, or subclass strengthens postconditions.',
    },
    {
      question: 'What are default methods in interfaces and how do they relate to inheritance?',
      answer: 'Java 8+ interfaces can have default methods — concrete method implementations. This allows adding methods to interfaces without breaking existing implementations. When a class implements multiple interfaces with conflicting default methods, the class must override the method to resolve the conflict. This is "multiple inheritance of behavior" without the diamond problem.',
    },
  ],
  keyTakeaways: [
    'extends for class inheritance (single); implements for interfaces (multiple)',
    'Use super() to call parent constructor; super.method() to call parent method',
    'Always use @Override annotation when overriding methods',
    'Prefer composition over inheritance — use inheritance only for IS-A relationships',
    'Never call overridable methods from constructors',
    'Sealed classes (Java 17+) restrict which classes can extend — great for pattern matching',
  ],
  relatedTopics: ['java-polymorphism', 'java-abstraction', 'java-encapsulation', 'java-classes-objects'],
};

export const javaPolymorphism: TopicContent = {
  slug: 'java-polymorphism',
  title: 'Polymorphism',
  description: 'How polymorphism enables flexible, extensible code — runtime dispatch, method overriding, and the Open/Closed Principle in enterprise Java.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Polymorphism means "many forms" — the same method call behaves differently depending on the actual object type. When you call animal.speak(), it calls Dog\'s bark() or Cat\'s meow() based on the actual object, even if the reference is typed as Animal. This is what makes frameworks like Spring possible — they work with interfaces, and your concrete implementation is called at runtime.',
  whatIsIt: `Java has two types of polymorphism:

**1. Runtime Polymorphism (Dynamic Dispatch)**
Method overriding — the most specific implementation is called based on the actual runtime type. This is what most people mean by polymorphism.

**2. Compile-time Polymorphism (Method Overloading)**
Multiple methods with the same name but different parameter lists. The compiler selects the correct one based on the argument types.

**Key Mechanism:**
Java uses a Virtual Method Table (vtable) for each class. When a virtual method is called on a reference, the JVM looks up the vtable of the actual object's class to find the correct implementation.

**Covariant Return Types:**
A subclass can override a method and return a more specific type than the parent declared.

**Polymorphism requires:**
- Inheritance (extends or implements)
- Method overriding (@Override)
- Parent type reference pointing to child object`,
  whyWeNeedIt: `Polymorphism is the foundation of extensible software:

- **Open/Closed Principle** — code is open for extension (add new types) but closed for modification (don't change existing code)
- **Dependency Inversion** — depend on abstractions (interfaces), not concrete classes
- **Strategy Pattern** — swap algorithms at runtime by swapping implementations
- **Framework design** — Spring's entire dependency injection relies on polymorphism

Without polymorphism, adding a new payment type requires modifying every place that processes payments. With polymorphism, you add a new class and the existing code works automatically.`,
  realWorldUsage: `Every Spring Boot application uses polymorphism constantly:

- \`@Service\` classes implement service interfaces — controllers depend on the interface
- \`@Repository\` extends JpaRepository — Spring generates the implementation at runtime
- Exception handlers use polymorphism — catch(Exception e) catches all subtypes
- Notification systems — EmailNotifier, SMSNotifier, PushNotifier all implement Notifier`,
  howItWorks: `**Virtual Method Table (vtable):**
Every class has a vtable mapping method signatures to implementations. When you call \`animal.speak()\`, the JVM:
1. Looks at the actual object's class (Dog, not Animal)
2. Looks up \`speak\` in Dog's vtable
3. Calls Dog's implementation

This lookup happens at runtime — that is why it is called "runtime polymorphism."

**Method Overloading Resolution (compile-time):**
The compiler selects the overloaded method based on the declared types of the arguments, not the runtime types.`,
  example: {
    title: 'Polymorphism in a Notification System',
    description: 'How polymorphism makes adding new notification channels trivial.',
    code: [
      {
        label: 'Polymorphic Notification System',
        language: 'java',
        code: `// Interface — the contract
public interface NotificationChannel {
    void send(Notification notification);
    boolean supports(NotificationType type);
    String getChannelName();
}

// Implementation 1
@Component
public class EmailNotifier implements NotificationChannel {
    private final EmailService emailService;
    
    @Override
    public void send(Notification notification) {
        emailService.sendEmail(
            notification.getRecipientEmail(),
            notification.getSubject(),
            notification.getBody()
        );
    }
    
    @Override
    public boolean supports(NotificationType type) {
        return type == NotificationType.EMAIL || type == NotificationType.ALL;
    }
    
    @Override
    public String getChannelName() { return "EMAIL"; }
}

// Implementation 2
@Component
public class SmsNotifier implements NotificationChannel {
    private final SmsGateway smsGateway;
    
    @Override
    public void send(Notification notification) {
        smsGateway.sendSms(notification.getPhone(), notification.getBody());
    }
    
    @Override
    public boolean supports(NotificationType type) {
        return type == NotificationType.SMS || type == NotificationType.ALL;
    }
    
    @Override
    public String getChannelName() { return "SMS"; }
}

// Service — works with the interface, not concrete classes
@Service
public class NotificationService {
    // Spring injects ALL implementations of NotificationChannel
    private final List<NotificationChannel> channels;
    
    public NotificationService(List<NotificationChannel> channels) {
        this.channels = channels;
    }
    
    public void notify(Notification notification) {
        channels.stream()
            .filter(channel -> channel.supports(notification.getType()))
            .forEach(channel -> {
                try {
                    channel.send(notification);
                    log.info("Sent via {}", channel.getChannelName());
                } catch (Exception e) {
                    log.error("Failed via {}", channel.getChannelName(), e);
                }
            });
    }
}

// Adding a new channel: create PushNotifier, annotate @Component.
// NotificationService needs ZERO changes. That is polymorphism.`,
      },
      {
        label: 'Method Overloading',
        language: 'java',
        code: `// Compile-time polymorphism — same name, different parameters
public class DataFormatter {
    
    // Overloaded format methods
    public String format(int value) {
        return String.valueOf(value);
    }
    
    public String format(double value) {
        return String.format("%.2f", value);
    }
    
    public String format(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP).toPlainString();
    }
    
    public String format(LocalDate date) {
        return date.format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
    
    public String format(LocalDateTime dateTime) {
        return dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }
}

// Overloading pitfall: autoboxing can cause ambiguity
void process(int x) { System.out.println("int"); }
void process(Integer x) { System.out.println("Integer"); }
void process(long x) { System.out.println("long"); }

process(42);        // calls process(int)
process(null);      // COMPILE ERROR: ambiguous (Integer or long?)
process((Integer) null);  // calls process(Integer)`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between overriding and overloading?',
      answer: 'Overriding is runtime polymorphism — a subclass provides a different implementation of a method inherited from the parent. The method signature is identical. Overloading is compile-time polymorphism — multiple methods in the same class with the same name but different parameter lists. Overriding uses @Override; overloading does not.',
    },
    {
      question: 'Can static methods be polymorphic?',
      answer: 'No. Static methods are resolved at compile time based on the declared reference type, not the actual runtime type. This is called method hiding, not overriding. If you call Animal.speak() vs Dog.speak(), you always get the declared type\'s version. This is why polymorphism requires instance methods.',
    },
    {
      question: 'What is the difference between instanceof and polymorphism?',
      answer: 'Polymorphism eliminates the need for instanceof checks. If you find yourself writing if (animal instanceof Dog) { ... } else if (animal instanceof Cat) { ... }, you should use polymorphism instead — add a method to the Animal interface and let each subclass implement it. instanceof is a code smell in polymorphic hierarchies.',
    },
  ],
  productionIssues: [
    'instanceof chains instead of polymorphism — long if/else instanceof chains violate OCP and become unmaintainable. Refactor to polymorphism.',
    'Overriding equals in a hierarchy — if Parent.equals() is based on type, subclass instances can break symmetry (a.equals(b) is true but b.equals(a) is false). Effective Java recommends against overriding equals in subclasses that add fields.',
    'Covariant return type confusion — a method returning a subtype can confuse callers who expect the parent type. Document clearly.',
  ],
  bestPractices: [
    'Program to interfaces, not concrete classes — List<String> not ArrayList<String>.',
    'Use polymorphism to eliminate instanceof chains.',
    'Keep the Liskov Substitution Principle — subclasses must be substitutable for parent.',
    'Prefer interface-based polymorphism over class-based inheritance polymorphism.',
    'Use @Override always — it catches signature mismatches at compile time.',
  ],
  architectNote: 'Polymorphism is the mechanism behind the Dependency Inversion Principle (the D in SOLID). High-level modules should not depend on low-level modules — both should depend on abstractions (interfaces). Spring\'s entire dependency injection system is built on this: you declare what interface you need, Spring finds and injects the implementation. This makes unit testing trivial — inject a mock implementation.',
  faqs: [
    {
      question: 'What is the difference between an abstract class and an interface for polymorphism?',
      answer: 'Both enable polymorphism, but: abstract classes can have state (fields) and constructors; interfaces cannot (except constants). A class can implement multiple interfaces but extend only one abstract class. Use abstract class when subclasses share common state or implementation. Use interface when you want to define a contract that unrelated classes can implement. In modern Java (Java 8+), interfaces with default methods blur this distinction.',
    },
    {
      question: 'What is dynamic dispatch and how does it work?',
      answer: 'Dynamic dispatch is the mechanism by which the correct overridden method is called at runtime. The JVM maintains a virtual method table (vtable) for each class. When a virtual method is called, the JVM looks up the vtable of the actual object class (not the reference type) to find the method. This lookup has near-zero overhead due to JIT optimization — virtual dispatch is not "slow."',
    },
  ],
  keyTakeaways: [
    'Runtime polymorphism: method called based on actual object type, not reference type',
    'Compile-time polymorphism: method overloading resolved by compiler based on argument types',
    'Always use @Override to catch overriding mistakes at compile time',
    'Program to interfaces — polymorphism works through interface references',
    'Polymorphism eliminates instanceof chains — use it to follow the Open/Closed Principle',
    'Static methods are NOT polymorphic — they are resolved at compile time',
  ],
  relatedTopics: ['java-inheritance', 'java-abstraction', 'java-encapsulation', 'java-functional-interfaces'],
};

export const javaAbstraction: TopicContent = {
  slug: 'java-abstraction',
  title: 'Abstraction',
  description: 'How abstract classes and interfaces define contracts in Java — when to use each, default methods, and how abstraction enables the SOLID principles.',
  applicableVersions: ['Java 8', 'Java 11', 'Java 17', 'Java 21'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Abstraction means hiding implementation details and exposing only what callers need to know. In Java, you achieve abstraction with abstract classes (partial implementation with abstract methods) and interfaces (pure contracts). When you call orderService.createOrder(), you don\'t know or care how it works internally — that\'s abstraction.',
  whatIsIt: `**Abstract Class**
- Declared with \`abstract\` keyword
- Can have abstract methods (no body) and concrete methods (with body)
- Can have instance fields and constructors
- Cannot be instantiated directly
- A subclass must implement all abstract methods (or also be abstract)

**Interface**
- Pure contract — defines what a class can do, not how
- All methods are implicitly public
- Java 8+: can have \`default\` methods (concrete) and \`static\` methods
- Java 9+: can have \`private\` methods (for internal use by default methods)
- Fields are implicitly public static final (constants)
- A class can implement multiple interfaces

**When to use which:**
- **Abstract class**: shared state + partial implementation; template method pattern; "is-a" with common behavior
- **Interface**: pure contract; multiple inheritance of type; unrelated classes sharing behavior (Serializable, Comparable, Runnable)`,
  whyWeNeedIt: `Abstraction enables:

- **Loose coupling** — callers depend on abstractions, not implementations
- **Testability** — inject mock implementations in tests
- **Replaceability** — swap implementations without changing callers
- **Parallel development** — teams work against an interface contract before implementation exists
- **Framework integration** — Spring, JPA, and all major frameworks work through interfaces

The Dependency Inversion Principle (SOLID) states: high-level modules should depend on abstractions. This is impossible without abstract classes and interfaces.`,
  realWorldUsage: `In every Spring Boot project:

\`\`\`java
// Interface: the contract
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByDepartmentAndActive(String dept, boolean active);
}
// Spring Data generates the implementation at runtime — you never write it

// Interface: service contract
public interface PaymentService {
    PaymentResult process(PaymentRequest request);
    void refund(String paymentId, BigDecimal amount);
}

// Implementation (can be swapped without changing callers)
@Service
public class StripePaymentService implements PaymentService { ... }
// In tests: mock PaymentService, don't call Stripe
\`\`\``,
  howItWorks: `**Abstract Method Resolution:**
When you call an abstract method, Java uses dynamic dispatch to find the concrete implementation in the actual object's class.

**Interface Default Methods:**
Java 8+ allows default methods in interfaces — concrete implementations that subclasses inherit. This enables adding methods to interfaces without breaking existing implementations.

**Functional Interfaces:**
An interface with exactly one abstract method is a functional interface. It can be implemented with a lambda expression. @FunctionalInterface annotation enforces this.

**Interface Segregation Principle:**
Keep interfaces small and focused. A fat interface (20 methods) forces implementors to implement methods they don't need. Split into smaller, cohesive interfaces.`,
  example: {
    title: 'Abstract Classes and Interfaces in a Repository Pattern',
    description: 'How abstraction enables testable, swappable data access in enterprise Java.',
    code: [
      {
        label: 'Interface + Abstract Class Together',
        language: 'java',
        code: `// Interface: pure contract
public interface ReportGenerator {
    byte[] generate(ReportRequest request);
    String getFormat();  // "PDF", "EXCEL", "CSV"
}

// Abstract class: partial implementation with template method
public abstract class BaseReportGenerator implements ReportGenerator {
    private final AuditService auditService;
    
    protected BaseReportGenerator(AuditService auditService) {
        this.auditService = auditService;
    }
    
    // Template method — defines the algorithm
    @Override
    public final byte[] generate(ReportRequest request) {
        validateRequest(request);          // common validation
        ReportData data = fetchData(request); // abstract — subclass implements
        byte[] content = render(data);     // abstract — subclass implements
        auditService.logReport(request, getFormat()); // common audit
        return content;
    }
    
    // Common validation for all report types
    protected void validateRequest(ReportRequest request) {
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new IllegalArgumentException("Start date must be before end date");
        }
    }
    
    // Subclasses implement these
    protected abstract ReportData fetchData(ReportRequest request);
    protected abstract byte[] render(ReportData data);
}

// Concrete implementation
@Component
public class PdfSalesReport extends BaseReportGenerator {
    private final SalesRepository salesRepo;
    
    public PdfSalesReport(AuditService audit, SalesRepository sales) {
        super(audit);
        this.salesRepo = sales;
    }
    
    @Override
    protected ReportData fetchData(ReportRequest request) {
        List<Sale> sales = salesRepo.findByDateRange(
            request.getStartDate(), request.getEndDate()
        );
        return new ReportData(sales);
    }
    
    @Override
    protected byte[] render(ReportData data) {
        // Use iText or Apache PDFBox to generate PDF
        return pdfRenderer.render(data);
    }
    
    @Override
    public String getFormat() { return "PDF"; }
}

// Another implementation — just add it, no other code changes
@Component
public class ExcelSalesReport extends BaseReportGenerator {
    @Override
    protected ReportData fetchData(ReportRequest request) { ... }
    
    @Override
    protected byte[] render(ReportData data) {
        // Use Apache POI to generate Excel
        return excelRenderer.render(data);
    }
    
    @Override
    public String getFormat() { return "EXCEL"; }
}`,
      },
      {
        label: 'Functional Interface',
        language: 'java',
        code: `// Functional interface — one abstract method
@FunctionalInterface
public interface PriceCalculator {
    BigDecimal calculate(BigDecimal basePrice, CustomerTier tier);
    
    // Default method — not abstract
    default BigDecimal calculateWithTax(BigDecimal basePrice, CustomerTier tier, BigDecimal taxRate) {
        BigDecimal price = calculate(basePrice, tier);
        return price.multiply(BigDecimal.ONE.add(taxRate));
    }
}

// Implemented with lambda
PriceCalculator standard = (price, tier) -> price;

PriceCalculator withDiscount = (price, tier) -> switch (tier) {
    case GOLD     -> price.multiply(new BigDecimal("0.80"));  // 20% off
    case SILVER   -> price.multiply(new BigDecimal("0.90"));  // 10% off
    case STANDARD -> price;
};

PriceCalculator enterprise = (price, tier) -> 
    price.multiply(new BigDecimal("0.70"));  // always 30% off

// Use in service
@Service
public class PricingService {
    private final Map<CustomerType, PriceCalculator> calculators;
    
    public PricingService() {
        this.calculators = Map.of(
            CustomerType.STANDARD, standard,
            CustomerType.DISCOUNTED, withDiscount,
            CustomerType.ENTERPRISE, enterprise
        );
    }
    
    public BigDecimal getPrice(BigDecimal base, CustomerType type, CustomerTier tier) {
        return calculators.getOrDefault(type, standard).calculate(base, tier);
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use an abstract class instead of an interface?',
      answer: 'Use abstract class when: (1) you have shared state (fields) that all subclasses need, (2) you want to provide partial implementation, (3) you are using the template method pattern. Use interface when: (1) unrelated classes need to share a contract, (2) you want multiple inheritance of type, (3) you are defining a pure API. In modern Java, interfaces with default methods cover most cases where abstract classes were previously used.',
    },
    {
      question: 'What is the difference between an interface and an abstract class in Java 8+?',
      answer: 'After Java 8, the gap narrowed significantly. Interfaces can now have default and static methods. The remaining differences: abstract classes can have instance fields and constructors; interfaces cannot. A class can implement multiple interfaces but extend only one abstract class. Abstract classes can have non-public methods; interface methods are always public (except private helper methods in Java 9+).',
    },
  ],
  productionIssues: [
    'Fat interfaces — an interface with 20 methods forces implementors to implement all of them. Split into smaller, focused interfaces (Interface Segregation Principle).',
    'Default method conflicts — if a class implements two interfaces with the same default method signature, it must override the method to resolve the conflict.',
    'Leaky abstractions — an abstraction that forces callers to know implementation details defeats the purpose. Keep interfaces clean and implementation-neutral.',
  ],
  bestPractices: [
    'Keep interfaces small and focused — Interface Segregation Principle.',
    'Name interfaces as capabilities: Serializable, Comparable, Runnable (not ISerializable).',
    'Use @FunctionalInterface for single-method interfaces to enable lambda usage.',
    'Use abstract classes for template method pattern — define the algorithm in the abstract class.',
    'Depend on the narrowest interface that satisfies your needs (List vs Collection vs Iterable).',
  ],
  architectNote: 'In Spring Boot, the standard pattern is: define a service interface, implement it in a @Service class, inject the interface everywhere else. This enables: (1) unit testing with mocks, (2) swapping implementations (e.g., switch from Stripe to PayPal by swapping the @Primary service), (3) AOP proxies (Spring wraps your service in a proxy for @Transactional, @Cacheable, etc.). Without the interface, Spring can still proxy with CGLIB, but interface-based proxying is cleaner.',
  faqs: [
    {
      question: 'What is a marker interface?',
      answer: 'A marker interface has no methods — it just marks a class as having some property. Examples: Serializable, Cloneable, Remote. The JVM or frameworks check instanceof to detect the marker. In modern Java, annotations (@Serializable) are preferred over marker interfaces — they are more flexible and can carry metadata.',
    },
    {
      question: 'Can interfaces have constructors?',
      answer: 'No. Interfaces cannot be instantiated, so constructors make no sense. However, interfaces can have static factory methods (Java 8+) that return instances of anonymous or concrete implementations: List.of(), Map.of(), Optional.of() are all static factory methods on interfaces.',
    },
  ],
  keyTakeaways: [
    'Abstract classes: partial implementation + state; interfaces: pure contracts',
    'A class can implement multiple interfaces but extend only one class',
    'Java 8+ interfaces can have default and static methods',
    'Functional interfaces have one abstract method and can be implemented with lambdas',
    'Depend on abstractions (interfaces), not concrete implementations — Dependency Inversion',
    'Keep interfaces small and focused — Interface Segregation Principle',
  ],
  relatedTopics: ['java-inheritance', 'java-polymorphism', 'java-functional-interfaces', 'java-lambda'],
};
