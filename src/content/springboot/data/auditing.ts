import type { TopicContent } from '../../types';

export const springAuditing: TopicContent = {
  slug: 'spring-auditing',
  title: 'Auditing',
  description: 'Implement automatic entity auditing in Spring Boot — created/modified timestamps and user tracking using Spring Data JPA Auditing without manual boilerplate.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Data JPA Auditing automatically populates createdAt, updatedAt, createdBy, and updatedBy fields on your entities. Enable it with @EnableJpaAuditing, add @EntityListeners(AuditingEntityListener.class) to your entity, and annotate fields with @CreatedDate, @LastModifiedDate, @CreatedBy, @LastModifiedBy. No manual timestamp management needed.',
  whatIsIt: `Spring Data JPA Auditing provides automatic population of audit fields:

**Temporal auditing:**
- \`@CreatedDate\` — set when entity is first persisted
- \`@LastModifiedDate\` — updated on every modification

**User auditing:**
- \`@CreatedBy\` — who created the entity
- \`@LastModifiedBy\` — who last modified it

**Setup requirements:**
1. \`@EnableJpaAuditing\` on a \`@Configuration\` class
2. \`@EntityListeners(AuditingEntityListener.class)\` on entities
3. \`AuditorAware<T>\` bean for user auditing
4. Annotate fields with audit annotations`,
  whyWeNeedIt: `Without auditing, you\'d manually set timestamps in every service method:
\`\`\`java
order.setCreatedAt(LocalDateTime.now()); // easy to forget
order.setUpdatedAt(LocalDateTime.now()); // must be in every update
order.setCreatedBy(currentUser);         // must get user everywhere
\`\`\`

With Spring auditing, it\'s automatic. Forget to set it? Spring sets it anyway. This eliminates an entire class of bugs where audit fields are inconsistent or missing.`,
  realWorldUsage: `Every enterprise entity has audit fields:
- \`created_at\`, \`updated_at\` — on every table
- \`created_by\`, \`updated_by\` — for compliance and debugging
- Soft delete: \`deleted_at\`, \`deleted_by\`
- Audit trail tables: separate table logging every change

Regulatory requirements (GDPR, SOX, HIPAA) often mandate audit trails.`,
  howItWorks: `AuditingEntityListener is a JPA entity listener. Before persist and merge operations, it reads the current auditor from AuditorAware and sets the annotated fields. Spring Security integration reads the current authenticated user automatically.`,
  example: {
    title: 'Auditing Setup',
    description: 'Base entity with auditing and AuditorAware integration.',
    code: [
      {
        label: 'Auditable Base Entity',
        language: 'java',
        code: `// Base class — all entities extend this
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(name = "created_by", updatable = false, length = 100)
    private String createdBy;

    @LastModifiedBy
    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    // Version for optimistic locking
    @Version
    private Long version;

    // Getters
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public String getCreatedBy() { return createdBy; }
    public String getUpdatedBy() { return updatedBy; }
    public Long getVersion() { return version; }
}

// Entity using the base class
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    // ... other fields
}`,
      },
      {
        label: 'Enable Auditing + AuditorAware',
        language: 'java',
        code: `@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaConfig {

    // Provides the current user for @CreatedBy and @LastModifiedBy
    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> {
            // Get current user from Spring Security context
            Authentication auth = SecurityContextHolder
                .getContext().getAuthentication();

            if (auth == null || !auth.isAuthenticated() ||
                    auth instanceof AnonymousAuthenticationToken) {
                return Optional.of("system"); // fallback for scheduled jobs
            }

            return Optional.of(auth.getName()); // username
        };
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why are my @CreatedDate fields null after saving?',
      answer: 'Three common causes: (1) Missing @EnableJpaAuditing on a @Configuration class. (2) Missing @EntityListeners(AuditingEntityListener.class) on the entity. (3) Field is not of a supported type (use LocalDateTime, Instant, or Date). All three must be present.',
    },
    {
      question: 'How do I audit in batch jobs where there\'s no authenticated user?',
      answer: 'Return a fallback in AuditorAware: if no authentication is present, return Optional.of("system") or Optional.of("batch-job"). This ensures audit fields are always populated even for system-initiated operations.',
    },
  ],
  productionIssues: [
    '@CreatedDate being updated on merge operations — ensure updatable=false on the column',
    'Audit fields null in tests — ensure @EnableJpaAuditing is active in test config',
    'AuditorAware returning empty Optional causing audit fields to be null',
  ],
  bestPractices: [
    'Create a BaseEntity or Auditable base class that all entities extend',
    'Mark createdAt and createdBy with updatable=false',
    'Add @Version for optimistic locking alongside audit fields',
    'Always provide a fallback in AuditorAware for system/batch operations',
  ],
  architectNote: `For compliance-heavy domains (finance, healthcare), Spring\'s built-in auditing is just the start. You\'ll need a full audit trail: a separate audit_log table recording every change with old and new values. Libraries like Hibernate Envers or Javers provide this. Envers integrates with Hibernate to automatically record entity history to revision tables.`,
  faqs: [
    {
      question: 'How do I audit entity history (not just last modified)?',
      answer: 'Use Hibernate Envers: add hibernate-envers dependency, annotate entities with @Audited, and Hibernate creates *_AUD tables recording every change with a revision number. Query history with AuditReader API. For more control, use Javers which provides diff, timeline, and shadow queries.',
    },
  ],
  keyTakeaways: [
    '@EnableJpaAuditing + @EntityListeners(AuditingEntityListener.class) enables auto-auditing',
    '@CreatedDate, @LastModifiedDate auto-populate timestamps',
    '@CreatedBy, @LastModifiedBy require an AuditorAware<T> bean',
    'Use a base entity class to share audit fields across all entities',
    'Mark createdAt and createdBy with updatable=false',
    'For full audit history, use Hibernate Envers or Javers',
  ],
  relatedTopics: ['spring-entity-mapping', 'spring-data-jpa', 'spring-transactions', 'spring-repositories'],
};
