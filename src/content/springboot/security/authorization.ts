import type { TopicContent } from '../../types';

export const springAuthorization: TopicContent = {
  slug: 'spring-authorization',
  title: 'Authorization',
  description: 'Implement role-based and permission-based authorization in Spring Boot using @PreAuthorize, @PostAuthorize, URL-based security, and custom authorization logic.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring Security 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Authorization determines what an authenticated user can do. Spring Security supports two levels: URL-based (in SecurityFilterChain: .requestMatchers("/admin/**").hasRole("ADMIN")) and method-based (@PreAuthorize("hasRole(\'ADMIN\')") on service or controller methods). Method-based is more flexible and is preferred for complex rules.',
  whatIsIt: `Authorization in Spring Security operates at two levels:

**URL-based authorization** (SecurityFilterChain)
- Applied before the request reaches the controller
- Good for coarse-grained rules (admin paths, public paths)
- Pattern matching on URL and HTTP method

**Method-based authorization** (@PreAuthorize, @PostAuthorize)
- Applied at the method level via AOP proxy
- Uses Spring Expression Language (SpEL)
- Can access method parameters and return values
- More granular than URL-based

**Spring Security expressions:**
- \`hasRole('ADMIN')\` — has ROLE_ADMIN authority
- \`hasAnyRole('USER', 'ADMIN')\` — has any of these roles
- \`hasAuthority('READ_ORDERS')\` — has specific permission
- \`isAuthenticated()\` — any authenticated user
- \`isAnonymous()\` — unauthenticated user
- \`#id == authentication.principal.id\` — parameter check`,
  whyWeNeedIt: `Without authorization, any authenticated user can access any endpoint. Authorization enforces the principle of least privilege — users only access what they\'re permitted to. In enterprise apps, this means admins can manage users, regular users can only see their own data, and service accounts have limited scoped access.`,
  realWorldUsage: `Enterprise authorization patterns:
- Role-based: ADMIN, USER, MODERATOR, SUPPORT roles
- Permission-based: READ_ORDERS, WRITE_ORDERS, DELETE_ORDERS
- Resource-based: users can only access their own resources
- Tenant-based: in multi-tenant apps, users only access their tenant\'s data`,
  howItWorks: `@PreAuthorize is processed by AOP (MethodSecurityInterceptor). Before the method runs, Spring evaluates the SpEL expression with the current Authentication. If it returns false, AccessDeniedException is thrown (403). @PostAuthorize runs after the method and can check the return value.`,
  example: {
    title: 'Authorization Patterns',
    description: 'URL security, method security, and custom authorization.',
    code: [
      {
        label: 'URL-based + Method-based Security',
        language: 'java',
        code: `// URL-based in SecurityConfig
.authorizeHttpRequests(auth -> auth
    .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
    .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
    .requestMatchers("/api/v1/reports/**").hasAnyRole("ADMIN", "ANALYST")
    .requestMatchers(HttpMethod.DELETE).hasRole("ADMIN")  // all DELETE requires ADMIN
    .anyRequest().authenticated()
)

// Method-based in controller/service
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserDto> getAllUsers(Pageable pageable) { ... }

    // User can only get their own profile (or admin can get any)
    @GetMapping("/{id}")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ADMIN')")
    public UserDto getUser(@PathVariable Long id) { ... }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) { ... }

    // Check permission on return value
    @GetMapping("/{id}/sensitive")
    @PostAuthorize("returnObject.id == authentication.principal.id or hasRole('ADMIN')")
    public UserDetailDto getSensitiveData(@PathVariable Long id) { ... }
}`,
      },
      {
        label: 'Custom Permission Evaluator',
        language: 'java',
        code: `// For complex authorization rules
@Component
public class AppPermissionEvaluator implements PermissionEvaluator {

    private final OrderRepository orderRepository;

    @Override
    public boolean hasPermission(Authentication auth,
                                  Object targetDomainObject,
                                  Object permission) {
        if (targetDomainObject instanceof Order order) {
            return switch (permission.toString()) {
                case "READ" -> order.getCustomerId().equals(getCurrentUserId(auth))
                              || hasRole(auth, "ADMIN");
                case "CANCEL" -> order.getCustomerId().equals(getCurrentUserId(auth))
                                && order.getStatus() == OrderStatus.PENDING;
                case "DELETE" -> hasRole(auth, "ADMIN");
                default -> false;
            };
        }
        return false;
    }

    @Override
    public boolean hasPermission(Authentication auth, Serializable targetId,
                                  String targetType, Object permission) {
        if ("Order".equals(targetType)) {
            Order order = orderRepository.findById((Long) targetId).orElse(null);
            return order != null && hasPermission(auth, order, permission);
        }
        return false;
    }
}

// Usage:
@PreAuthorize("hasPermission(#orderId, 'Order', 'CANCEL')")
public void cancelOrder(@PathVariable Long orderId) { ... }`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'hasRole vs hasAuthority — what is the difference?',
      answer: 'hasRole("ADMIN") checks for authority "ROLE_ADMIN" (Spring automatically prepends "ROLE_"). hasAuthority("ADMIN") checks for authority "ADMIN" exactly. Use hasRole for roles (ADMIN, USER), hasAuthority for fine-grained permissions (READ_ORDERS, WRITE_PRODUCTS). Be consistent in your codebase.',
    },
    {
      question: 'Can I use @PreAuthorize on private methods?',
      answer: 'No. Spring Security uses AOP proxies, which only intercept public methods. @PreAuthorize on private or package-private methods is silently ignored. If you need to secure private methods, redesign so the security check is on the public method that calls them.',
    },
  ],
  productionIssues: [
    '@PreAuthorize on private methods being silently ignored',
    'Method security not working because @EnableMethodSecurity is missing from configuration',
    'Authorization bypassed via self-invocation (same as @Transactional — proxy bypassed)',
    'Overly permissive rules: anyRequest().permitAll() left from development',
  ],
  bestPractices: [
    'Enable @EnableMethodSecurity in your security configuration',
    'Use @PreAuthorize at the service layer, not just the controller layer',
    'Implement PermissionEvaluator for complex, resource-specific authorization',
    'Test authorization with @WithMockUser(roles="ADMIN") and negative test cases',
    'Fail securely: default to deny, explicitly permit what\'s allowed',
  ],
  architectNote: `In complex multi-tenant or multi-role systems, consider Attribute-Based Access Control (ABAC) over simple RBAC. ABAC makes decisions based on attributes of the user, resource, and environment. Spring Security\'s SpEL in @PreAuthorize can implement ABAC patterns. For very complex authorization, consider dedicated libraries like Spring Authorization Server or Casbin.`,
  faqs: [
    {
      question: 'How do I implement row-level security (users only see their own data)?',
      answer: 'Several approaches: (1) @PreAuthorize with parameter check: @PreAuthorize("#userId == authentication.principal.id"). (2) In the service, always filter by the current user: repository.findByIdAndUserId(id, currentUserId). (3) Use Spring Data JPA @Query with :#{principal.username} SpEL. Approach 2 is most reliable — it\'s enforced at the data layer.',
    },
  ],
  keyTakeaways: [
    'URL-based security in SecurityFilterChain for coarse-grained rules',
    '@PreAuthorize for fine-grained method-level authorization',
    'hasRole("ADMIN") checks for ROLE_ADMIN; hasAuthority("ADMIN") checks for ADMIN exactly',
    '@PreAuthorize only works on public methods (AOP proxy limitation)',
    'Implement PermissionEvaluator for complex resource-specific authorization',
    'Default to deny — explicitly permit what\'s allowed',
  ],
  relatedTopics: ['spring-security', 'spring-authentication', 'spring-jwt'],
};
