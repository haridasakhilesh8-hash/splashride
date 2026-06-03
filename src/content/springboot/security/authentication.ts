import type { TopicContent } from '../../types';

export const springAuthentication: TopicContent = {
  slug: 'spring-authentication',
  title: 'Authentication',
  description: 'Implement authentication in Spring Boot — UserDetailsService, AuthenticationManager, login endpoints, and the complete authentication flow for enterprise REST APIs.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x', 'Spring Security 6'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Authentication in Spring Security works through UserDetailsService (loads user from database), PasswordEncoder (verifies password), and AuthenticationManager (orchestrates the process). For REST APIs, you build a /auth/login endpoint that validates credentials and returns a JWT. Subsequent requests send the JWT in the Authorization header.',
  whatIsIt: `Authentication is the process of verifying who a user is.

**Spring Security authentication components:**
- \`UserDetails\` — the user object (username, password, roles)
- \`UserDetailsService\` — loads UserDetails by username from your database
- \`PasswordEncoder\` — hashes and verifies passwords
- \`AuthenticationManager\` — orchestrates authentication
- \`AuthenticationProvider\` — performs actual authentication (DaoAuthenticationProvider uses UserDetailsService)

**Authentication flow for JWT:**
1. Client sends username + password to /auth/login
2. Controller calls AuthenticationManager.authenticate()
3. DaoAuthenticationProvider calls UserDetailsService.loadUserByUsername()
4. Compares provided password with stored hash via PasswordEncoder
5. If valid, generate JWT and return to client
6. Client sends JWT in Authorization: Bearer <token> header on subsequent requests`,
  whyWeNeedIt: `Authentication is the foundation of application security. Without it, any user can access any resource. Spring Security\'s authentication framework provides a tested, extensible foundation — you implement UserDetailsService to load users from your database, and Spring handles the rest.`,
  realWorldUsage: `Enterprise authentication patterns:
- **JWT with refresh tokens** — stateless, scales horizontally
- **OAuth2/OIDC** — delegated authentication to Keycloak/Auth0
- **API keys** — for service-to-service authentication
- **Multi-factor authentication** — via identity provider integration`,
  howItWorks: `The DaoAuthenticationProvider is Spring\'s default provider. It:
1. Calls UserDetailsService.loadUserByUsername(username)
2. Checks if the account is enabled, not locked, not expired
3. Calls PasswordEncoder.matches(rawPassword, encodedPassword)
4. If all checks pass, creates an authenticated Authentication object
5. Stores it in the SecurityContext`,
  example: {
    title: 'Complete Authentication Implementation',
    description: 'UserDetailsService, login endpoint, and JWT generation.',
    code: [
      {
        label: 'UserDetailsService Implementation',
        language: 'java',
        code: `@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmailWithRoles(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "User not found: " + username));

        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPasswordHash())
            .authorities(user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList()))
            .accountExpired(!user.isActive())
            .accountLocked(user.isLocked())
            .credentialsExpired(false)
            .disabled(!user.isActive())
            .build();
    }
}`,
      },
      {
        label: 'Auth Controller (Login Endpoint)',
        language: 'java',
        code: `@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        // Authenticate — throws if credentials invalid
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
            )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String accessToken = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(
            accessToken,
            refreshToken,
            jwtService.getExpirationMs()
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
            @Valid @RequestBody RefreshTokenRequest request) {

        String username = jwtService.extractUsername(request.refreshToken());
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (!jwtService.isTokenValid(request.refreshToken(), userDetails)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String newAccessToken = jwtService.generateAccessToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(newAccessToken,
            request.refreshToken(), jwtService.getExpirationMs()));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestHeader("Authorization") String authHeader) {
        // For JWT: add token to a blacklist (Redis) until expiry
        String token = authHeader.substring(7);
        tokenBlacklistService.blacklist(token);
        return ResponseEntity.noContent().build();
    }
}

public record LoginRequest(
    @NotBlank @Email String email,
    @NotBlank String password
) {}

public record AuthResponse(
    String accessToken,
    String refreshToken,
    long expiresIn
) {}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I implement UserDetailsService or use Spring Security\'s defaults?',
      answer: 'Always implement UserDetailsService for production apps. Spring\'s default creates an in-memory user with a random password at startup (printed to console) — only useful for quick demos. Your UserDetailsService loads users from your database, giving you full control over user data and roles.',
    },
    {
      question: 'How do I handle authentication failure (wrong password)?',
      answer: 'AuthenticationManager.authenticate() throws BadCredentialsException for wrong password or UsernameNotFoundException for unknown user. Catch these in your controller or let the global exception handler convert them to 401 Unauthorized. Never expose whether the username or password was wrong — return generic "Invalid credentials" for both.',
    },
  ],
  productionIssues: [
    'Timing attack vulnerability — BCrypt\'s constant-time comparison prevents this; never use String.equals() for passwords',
    'User enumeration via different error messages for unknown username vs wrong password',
    'No rate limiting on login endpoint — add rate limiting to prevent brute force attacks',
    'Refresh tokens not invalidated on logout — maintain a token blacklist in Redis',
  ],
  bestPractices: [
    'Use BCryptPasswordEncoder with strength 12 — it\'s slow by design to resist brute force',
    'Return generic error for both wrong username and wrong password',
    'Rate limit the login endpoint (5 attempts per minute per IP)',
    'Implement refresh token rotation — each refresh issues a new refresh token',
    'Log failed authentication attempts for security monitoring',
  ],
  architectNote: `For enterprise applications, don\'t build authentication yourself. Integrate with an identity provider (Keycloak, Auth0, Okta). They handle user management, MFA, social login, password policies, and token issuance. Configure Spring Boot as an OAuth2 Resource Server that validates JWTs from the IdP. This is the architecture used by every serious enterprise — building auth from scratch is reinventing the wheel and introducing security risks.`,
  faqs: [
    {
      question: 'How do I implement remember-me functionality?',
      answer: 'For stateless JWT APIs, use long-lived refresh tokens (30 days) stored in HttpOnly cookies. For session-based apps, Spring Security has built-in remember-me support with http.rememberMe(). The persistent token approach (stored in database) is more secure than the hash-based approach.',
    },
  ],
  keyTakeaways: [
    'UserDetailsService loads user from database; PasswordEncoder verifies password',
    'AuthenticationManager orchestrates the authentication process',
    'Login endpoint calls AuthenticationManager.authenticate() and returns JWT on success',
    'Return generic error messages — never reveal if username or password was wrong',
    'Rate limit login endpoints to prevent brute force attacks',
    'For enterprise, use an identity provider instead of building auth yourself',
  ],
  relatedTopics: ['spring-security', 'spring-authorization', 'spring-jwt'],
};
