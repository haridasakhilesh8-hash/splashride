import type { TopicContent } from '../../types';

export const springSecurityOverview: TopicContent = {
  slug: 'spring-security',
  title: 'Spring Security',
  description: 'Master Spring Security — the comprehensive security framework for authentication, authorization, and protection against common web vulnerabilities in Spring Boot applications.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring Security 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Spring Security is a filter chain that intercepts every HTTP request before it reaches your controllers. It checks if the request is authenticated (who are you?) and authorized (are you allowed?). Adding spring-boot-starter-security auto-configures basic security. You customize it by defining a SecurityFilterChain bean.',
  whatIsIt: `Spring Security is a powerful, customizable authentication and authorization framework.

**Core concepts:**
- **Authentication** — verifying identity (who are you?)
- **Authorization** — verifying permissions (what can you do?)
- **SecurityFilterChain** — the chain of filters that process every request
- **SecurityContext** — holds the current user\'s authentication
- **UserDetails** — the user object Spring Security works with

**What Spring Security provides out of the box:**
- HTTP Basic authentication
- Form login
- CSRF protection
- Session management
- Password encoding
- Method-level security (@PreAuthorize)
- OAuth2 / OpenID Connect
- CORS configuration
- Security headers (X-Frame-Options, X-XSS-Protection, etc.)`,
  whyWeNeedIt: `Without Spring Security, every endpoint is publicly accessible. You\'d need to manually check authentication in every controller method — error-prone and inconsistent. Spring Security centralizes all security concerns in one place, applying them consistently to every request.`,
  realWorldUsage: `In enterprise Spring Boot APIs:
- JWT-based stateless authentication (most common for REST APIs)
- OAuth2/OIDC integration with identity providers (Keycloak, Auth0, Okta)
- Role-based access control (RBAC) with @PreAuthorize
- API key authentication for service-to-service calls
- Basic auth for internal admin endpoints`,
  howItWorks: `**Security Filter Chain:**
Spring Security installs a chain of servlet filters. Every HTTP request passes through them before reaching your controllers:

1. \`SecurityContextPersistenceFilter\` — loads security context
2. \`UsernamePasswordAuthenticationFilter\` — handles form login
3. \`BasicAuthenticationFilter\` — handles HTTP Basic auth
4. \`BearerTokenAuthenticationFilter\` — handles JWT tokens
5. \`ExceptionTranslationFilter\` — converts security exceptions to HTTP responses
6. \`FilterSecurityInterceptor\` — enforces authorization rules

You customize which filters are active and how they behave by defining a SecurityFilterChain bean.`,
  example: {
    title: 'Spring Security Configuration',
    description: 'Modern SecurityFilterChain configuration for a REST API.',
    code: [
      {
        label: 'SecurityFilterChain (Spring Boot 3.x)',
        language: 'java',
        code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // Enables @PreAuthorize, @PostAuthorize
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter,
                           UserDetailsService userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            // Disable CSRF for stateless REST APIs
            .csrf(csrf -> csrf.disable())

            // CORS configuration
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Session management — stateless for JWT
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()     // public
                .requestMatchers("/actuator/health").permitAll()    // health check
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()                       // everything else requires auth
            )

            // Add JWT filter before username/password filter
            .addFilterBefore(jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class)

            // Custom exception handling
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .accessDeniedHandler((req, res, e) ->
                    res.sendError(HttpServletResponse.SC_FORBIDDEN))
            )

            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("https://app.company.com"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}`,
      },
      {
        label: 'Method Security',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    // Only ADMIN role can access
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderDto> getAllOrders() { ... }

    // User can only access their own orders
    @GetMapping("/{id}")
    @PreAuthorize("@orderSecurityService.canAccess(authentication, #id)")
    public OrderDto getOrder(@PathVariable Long id) { ... }

    // Multiple roles allowed
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'PREMIUM_USER')")
    public OrderDto createOrder(@RequestBody CreateOrderRequest req) { ... }

    // Check permission on return value
    @GetMapping("/{id}/sensitive")
    @PostAuthorize("returnObject.userId == authentication.principal.id")
    public SensitiveOrderDto getSensitiveData(@PathVariable Long id) { ... }
}

// Custom security service
@Service("orderSecurityService")
public class OrderSecurityService {
    public boolean canAccess(Authentication auth, Long orderId) {
        String username = auth.getName();
        return orderRepository.existsByIdAndCustomerUsername(orderId, username);
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does Spring Security return 403 instead of 401?',
      answer: '401 Unauthorized means "you need to authenticate." 403 Forbidden means "you\'re authenticated but not allowed." Spring Security returns 403 by default for unauthenticated requests to avoid leaking information about what resources exist. Configure an AuthenticationEntryPoint to return 401 for missing/invalid credentials.',
    },
    {
      question: 'Should I disable CSRF for REST APIs?',
      answer: 'Yes, for stateless JWT-based REST APIs. CSRF attacks require the browser to send cookies automatically — if you use JWT in Authorization headers (not cookies), CSRF doesn\'t apply. If you use session cookies or cookie-based auth, keep CSRF enabled.',
    },
    {
      question: 'What changed in Spring Security 6 (Spring Boot 3.x)?',
      answer: 'The old WebSecurityConfigurerAdapter was removed. You now define a SecurityFilterChain @Bean directly. Method chaining style changed to lambda DSL. The authorizeRequests() was replaced with authorizeHttpRequests(). These are breaking changes when migrating from Spring Boot 2.x.',
    },
  ],
  productionIssues: [
    'CORS errors in production — configure allowed origins explicitly, never use * in production',
    'All endpoints returning 403 after adding spring-boot-starter-security — configure permitAll() for public endpoints',
    'SecurityContext not available in @Async methods — configure SecurityContextHolder.setStrategyName(MODE_INHERITABLETHREADLOCAL)',
    'Actuator endpoints exposed publicly — secure /actuator with IP restriction or authentication',
  ],
  bestPractices: [
    'Use SecurityFilterChain @Bean, not WebSecurityConfigurerAdapter (removed in Spring Security 6)',
    'Use BCryptPasswordEncoder with strength 12 for password hashing',
    'Secure Actuator endpoints — never expose them publicly',
    'Use @PreAuthorize for fine-grained method security',
    'Log security events (login success/failure, access denied) for audit trails',
    'Test security configuration with @WithMockUser and @WithUserDetails',
  ],
  architectNote: `For enterprise applications, don\'t implement authentication yourself. Use an identity provider (Keycloak, Auth0, Okta, AWS Cognito) and configure Spring Security as an OAuth2 Resource Server. The IdP handles user management, MFA, social login, and token issuance. Your Spring Boot app just validates JWTs. This is the pattern used by every serious enterprise deployment.`,
  faqs: [
    {
      question: 'How do I get the current user in a service?',
      answer: 'Use SecurityContextHolder.getContext().getAuthentication() or inject @AuthenticationPrincipal in a controller and pass the user to the service. Avoid accessing SecurityContextHolder in services — it makes them harder to test. Pass the user as a parameter from the controller.',
    },
    {
      question: 'How do I test secured endpoints?',
      answer: 'Use @WithMockUser(roles="ADMIN") on test methods to simulate an authenticated user. Use @WithUserDetails("username") to use a real user from your UserDetailsService. Use MockMvc with .with(user("admin").roles("ADMIN")) for request-level security. Add spring-security-test dependency.',
    },
  ],
  keyTakeaways: [
    'Spring Security is a filter chain that processes every request before controllers',
    'Define a SecurityFilterChain @Bean to customize security — WebSecurityConfigurerAdapter is removed',
    'Use BCryptPasswordEncoder with strength 10-12 for passwords',
    '@EnableMethodSecurity enables @PreAuthorize for fine-grained access control',
    'Disable CSRF for stateless JWT-based REST APIs',
    'Use an identity provider (Keycloak, Auth0) for enterprise authentication',
  ],
  relatedTopics: ['spring-authentication', 'spring-authorization', 'spring-jwt', 'spring-exception-handling'],
};
