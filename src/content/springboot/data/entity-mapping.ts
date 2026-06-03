import type { TopicContent } from '../../types';

export const springEntityMapping: TopicContent = {
  slug: 'spring-entity-mapping',
  title: 'Entity Mapping',
  description: 'Master JPA entity mapping — @Entity, @Table, relationships (@OneToMany, @ManyToOne, @ManyToMany), inheritance, and the patterns that prevent common ORM performance pitfalls.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Hibernate 6', 'JPA 3.1'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A JPA entity is a Java class mapped to a database table. @Entity marks it, @Table names it, @Id marks the primary key. Fields map to columns automatically. Relationships use @OneToMany, @ManyToOne, @OneToOne, @ManyToMany. The biggest mistakes are using the wrong fetch type and mapping bidirectional relationships incorrectly.',
  whatIsIt: `JPA entities are Java classes that represent database tables.

**Core annotations:**
- \`@Entity\` — marks class as a JPA entity
- \`@Table(name="orders")\` — maps to specific table
- \`@Id\` — primary key
- \`@GeneratedValue\` — auto-generate ID (IDENTITY, SEQUENCE, TABLE)
- \`@Column\` — column mapping (name, nullable, length, unique)
- \`@Transient\` — not persisted to database

**Relationship annotations:**
- \`@OneToMany\` — one entity has many (Order → OrderItems)
- \`@ManyToOne\` — many entities belong to one (OrderItem → Order)
- \`@OneToOne\` — one-to-one (User → UserProfile)
- \`@ManyToMany\` — many-to-many (Product → Categories)

**Fetch types:**
- \`LAZY\` — load on access (default for collections, recommended)
- \`EAGER\` — load immediately with parent (default for @ManyToOne, avoid for collections)`,
  whyWeNeedIt: `Entity mapping is what connects your Java objects to your relational database. Without JPA, you\'d write SQL for every operation and manually map ResultSets to objects. JPA handles the object-relational impedance mismatch — letting you work with objects while Hibernate generates the SQL.`,
  realWorldUsage: `In a real e-commerce application:
- \`Order\` entity has \`@OneToMany\` to \`OrderItem\`
- \`OrderItem\` has \`@ManyToOne\` to \`Product\`
- \`User\` has \`@OneToOne\` to \`UserProfile\`
- \`Product\` has \`@ManyToMany\` to \`Category\`

All relationships use LAZY loading. Specific queries fetch what they need with JOIN FETCH.`,
  howItWorks: `Hibernate reads entity annotations at startup and builds a mapping model. When you call \`entityManager.find()\` or a Spring Data method, Hibernate generates SQL, executes it, and maps the ResultSet back to entity objects. The first-level cache (persistence context) ensures each entity is loaded once per transaction.`,
  example: {
    title: 'Entity Mapping in Practice',
    description: 'A complete entity model for an e-commerce system.',
    code: [
      {
        label: 'Order Entity',
        language: 'java',
        code: `@Entity
@Table(name = "orders",
       indexes = {
           @Index(name = "idx_orders_customer", columnList = "customer_id"),
           @Index(name = "idx_orders_status", columnList = "status"),
           @Index(name = "idx_orders_created_at", columnList = "created_at")
       })
@EntityListeners(AuditingEntityListener.class)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "order_seq")
    @SequenceGenerator(name = "order_seq",
                       sequenceName = "order_sequence",
                       allocationSize = 50)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true, length = 20)
    private String orderNumber;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status;

    @Column(name = "total_amount", nullable = false,
            precision = 19, scale = 4)
    private BigDecimal totalAmount;

    // LAZY is default for collections — explicit for clarity
    @OneToMany(mappedBy = "order",
               cascade = CascadeType.ALL,
               orphanRemoval = true,
               fetch = FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<>();

    @Embedded
    private Address shippingAddress;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Business methods — entities are not just data holders
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
        recalculateTotal();
    }

    public void removeItem(OrderItem item) {
        items.remove(item);
        item.setOrder(null);
        recalculateTotal();
    }

    private void recalculateTotal() {
        this.totalAmount = items.stream()
            .map(OrderItem::getSubtotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}`,
      },
      {
        label: 'OrderItem Entity',
        language: 'java',
        code: `@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // LAZY is NOT the default for @ManyToOne — must be explicit!
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "unit_price", nullable = false, precision = 19, scale = 4)
    private BigDecimal unitPrice;

    public BigDecimal getSubtotal() {
        return unitPrice.multiply(BigDecimal.valueOf(quantity));
    }

    // equals and hashCode based on business key, not ID
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItem other)) return false;
        return Objects.equals(order, other.order) &&
               Objects.equals(product, other.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order, product);
    }
}`,
      },
      {
        label: 'Embeddable Value Object',
        language: 'java',
        code: `@Embeddable
public class Address {

    @Column(name = "street", length = 200)
    private String street;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "state", length = 50)
    private String state;

    @Column(name = "zip_code", length = 20)
    private String zipCode;

    @Column(name = "country", length = 3)
    private String countryCode;

    // No @Id needed — embedded in parent entity's table
    // All fields stored in the orders table
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use EAGER or LAZY loading?',
      answer: 'Always LAZY for collections (@OneToMany, @ManyToMany). For @ManyToOne and @OneToOne, the default is EAGER — change it to LAZY explicitly. Load what you need per query using JOIN FETCH or @EntityGraph. EAGER loading causes N+1 problems and loads unnecessary data.',
    },
    {
      question: 'What is the "mappedBy" attribute?',
      answer: 'mappedBy tells JPA which side owns the relationship (manages the foreign key column). The side with mappedBy is the inverse side — it doesn\'t have the foreign key column. The side with @JoinColumn owns the relationship. For @OneToMany(mappedBy="order"), the OrderItem.order field owns the foreign key.',
    },
    {
      question: 'Should I use @GeneratedValue IDENTITY or SEQUENCE?',
      answer: 'SEQUENCE is preferred for PostgreSQL — it allows batch inserts because Hibernate can pre-allocate IDs. IDENTITY (auto-increment) forces a database round-trip per insert because the ID is only known after the INSERT. For bulk operations, SEQUENCE with allocationSize=50 is dramatically faster.',
    },
  ],
  productionIssues: [
    'Bidirectional relationship not maintained — always update both sides in business methods',
    'CascadeType.ALL on @ManyToOne accidentally deleting parent entities',
    'equals/hashCode based on ID causing issues with transient entities in sets',
    'EAGER loading on @OneToMany causing massive queries that load entire tables',
    'Missing database indexes on foreign key columns causing slow queries',
  ],
  bestPractices: [
    'Use LAZY loading for all relationships; load eagerly per-query with JOIN FETCH',
    'Use SEQUENCE generation strategy for better batch insert performance',
    'Add database indexes on foreign keys and frequently queried columns',
    'Use @Enumerated(EnumType.STRING) — never EnumType.ORDINAL (breaks on reordering)',
    'Implement equals/hashCode based on business key, not database ID',
    'Use @Embedded for value objects (Address, Money, DateRange)',
  ],
  architectNote: `Entities should have behavior, not just data. The Order entity should have addItem(), cancel(), calculateTotal() methods — not just getters/setters. This is the rich domain model pattern. Anemic entities (pure data holders with no logic) push all business logic into services, making them bloated and hard to test. Let your entities own their invariants.`,
  faqs: [
    {
      question: 'Should I use Lombok @Data on entities?',
      answer: 'No. Lombok @Data generates equals/hashCode based on all fields including the ID, which causes problems with JPA (entities in sets before they have IDs). It also generates toString() that can trigger lazy loading. Use @Getter @Setter selectively, and write custom equals/hashCode based on a business key.',
    },
    {
      question: 'What is the difference between CascadeType.ALL and CascadeType.PERSIST/MERGE?',
      answer: 'CascadeType.ALL includes REMOVE, which means deleting the parent deletes all children. Use this for @OneToMany with orphanRemoval=true (e.g., Order → OrderItems). For @ManyToOne, never use CascadeType.ALL — you don\'t want deleting an OrderItem to delete the Product.',
    },
  ],
  keyTakeaways: [
    'Always use FetchType.LAZY for all relationships — load eagerly per-query',
    '@Enumerated(EnumType.STRING) — never use ORDINAL',
    'SEQUENCE generation is faster than IDENTITY for bulk inserts',
    'mappedBy indicates the inverse side of a relationship (no foreign key column)',
    'Add database indexes on foreign keys and frequently queried columns',
    'Entities should have business behavior, not just getters/setters',
  ],
  relatedTopics: ['spring-data-jpa', 'spring-repositories', 'spring-transactions', 'spring-auditing'],
};
