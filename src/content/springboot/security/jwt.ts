import type { TopicContent } from '../../types';

export const springJwt: TopicContent = {
  slug: 'spring-jwt',
  title: 'JWT',
  description: 'Implement JWT (JSON Web Token) authentication in Spring Boot — token generation, validation, filter chain integration, and refresh token patterns for production REST APIs.',
  applicableVersions: ['Spring Boot 2.7', 'Spring Boot 3.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'JWT is a self-contained token that encodes user information. The server signs it with a secret key; the client sends it in every request. The server validates the signature — no database lookup needed per request. This makes JWT perfect for stateless microservices. A JWT has three parts: header.payload.signature, all Base64-encoded.',
  whatIsIt: `JWT (JSON Web Token) is a compact, URL-safe token format for transmitting claims between parties.

**JWT structure:**
\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  <- Header (algorithm)
eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwi...  <- Payload (claims)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQ  <- Signature
\`\`\`

**Standard claims:**
- \`sub\` — subject (user ID or username)
- \`iat\` — issued at
- \`exp\` — expiration time
- \`iss\` — issuer
- \`aud\` — audience

**Custom claims:**
- \`roles\` — user roles
- \`userId\` — database ID
- \`tenantId\` — for multi-tenant apps

**JWT flow:**
1. Login → server validates credentials, returns JWT
2. Client stores JWT (memory or HttpOnly cookie)
3. Client sends \`Authorization: Bearer <token>\` on every request
4. Server validates signature + expiry — no DB lookup needed
5. Server extracts claims and processes request`,
  whyWeNeedIt: `JWT enables stateless authentication:
- No server-side session storage needed
- Scales horizontally — any server can validate any token
- Works across microservices — pass the JWT between services
- Self-contained — user info is in the token, no DB lookup per request

Alternative: sessions (stored in server memory or Redis). Sessions require session storage; JWT doesn\'t. For microservices, JWT is the standard.`,
  realWorldUsage: `In enterprise microservices:
- Access token: 15-60 minute expiry, sent in Authorization header
- Refresh token: 30-day expiry, stored in HttpOnly cookie or secure storage
- Token contains: userId, email, roles, tenantId
- API Gateway validates JWT before forwarding to downstream services
- Downstream services trust the JWT (already validated by gateway)`,
  howItWorks: `**JWT Filter:**
A \`OncePerRequestFilter\` runs before every request:
1. Reads Authorization header
2. Extracts the token (after "Bearer ")
3. Validates signature with the secret key
4. Checks expiration
5. Extracts username from claims
6. Loads UserDetails (or creates from claims)
7. Sets Authentication in SecurityContext
8. Request proceeds to controller`,
  example: {
    title: 'Complete JWT Implementation',
    description: 'JwtService, JWT filter, and integration with Spring Security.',
    code: [
      {
        label: 'JwtService',
        language: 'java',
        code: `@Service
public class JwtService {

    private final SecretKey signingKey;
    private final long accessTokenExpiryMs;
    private final long refreshTokenExpiryMs;

    public JwtService(
            @Value("\${app.jwt.secret}") String secret,
            @Value("\${app.jwt.access-token-expiry-ms:900000}") long accessExpiry,
            @Value("\${app.jwt.refresh-token-expiry-ms:2592000000}") long refreshExpiry) {
        this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenExpiryMs = accessExpiry;
        this.refreshTokenExpiryMs = refreshExpiry;
    }

    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList()));
        claims.put("type", "access");
        return buildToken(claims, userDetails.getUsername(), accessTokenExpiryMs);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = Map.of("type", "refresh");
        return buildToken(claims, userDetails.getUsername(), refreshTokenExpiryMs);
    }

    private String buildToken(Map<String, Object> claims,
                               String subject, long expiryMs) {
        return Jwts.builder()
            .claims(claims)
            .subject(subject)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiryMs))
            .signWith(signingKey, Jwts.SIG.HS256)
            .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parser()
            .verifyWith(signingKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
        return claimsResolver.apply(claims);
    }
}`,
      },
      {
        label: 'JWT Authentication Filter',
        language: 'java',
        code: `@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        // No token — let the request proceed (will fail authorization if needed)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        try {
            final String username = jwtService.extractUsername(jwt);

            // Only authenticate if not already authenticated
            if (username != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                        );
                    authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (JwtException e) {
            // Invalid token — log and continue (will fail authorization)
            log.warn("Invalid JWT token: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Where should I store the JWT on the client?',
      answer: 'HttpOnly cookies are the most secure — JavaScript can\'t read them, preventing XSS attacks. localStorage is vulnerable to XSS. Memory (JavaScript variable) is safest but lost on page refresh. For web apps: HttpOnly cookie for refresh token, memory for access token. For mobile apps: secure storage (iOS Keychain, Android Keystore).',
    },
    {
      question: 'How do I invalidate a JWT before it expires?',
      answer: 'JWTs are stateless — you can\'t invalidate them without state. Solutions: (1) Short expiry (15 min) + refresh tokens. (2) Token blacklist in Redis (check on every request). (3) Token version in database (increment on logout, validate version in JWT). Option 2 is most common for logout functionality.',
    },
    {
      question: 'HS256 vs RS256 — which signing algorithm to use?',
      answer: 'HS256 (HMAC-SHA256) uses a shared secret — simple, fast, good for single-service. RS256 (RSA-SHA256) uses a public/private key pair — the private key signs, the public key verifies. Use RS256 for microservices where multiple services need to verify tokens without sharing a secret. Identity providers (Keycloak, Auth0) use RS256.',
    },
  ],
  productionIssues: [
    'JWT secret too short or predictable — use at least 256-bit (32 char) random secret',
    'Sensitive data in JWT payload — JWT is Base64-encoded, not encrypted; anyone can decode the payload',
    'No token expiry — always set exp claim; never create tokens without expiration',
    'JWT secret hardcoded in application.properties committed to Git',
    'Not validating JWT on every request — the filter must run for every authenticated endpoint',
  ],
  bestPractices: [
    'Use short access token expiry (15-60 minutes) with refresh tokens',
    'Store JWT secret in environment variables or a secrets manager, never in code',
    'Use RS256 for microservices — share public key, keep private key in auth service only',
    'Never put sensitive data (SSN, credit card) in JWT payload — it\'s not encrypted',
    'Implement token blacklisting in Redis for logout functionality',
    'Add the jti (JWT ID) claim for token tracking and revocation',
  ],
  architectNote: `In a microservices architecture, the API Gateway validates JWTs. Downstream services trust the gateway and don\'t re-validate. The gateway can also enrich the request with user info (X-User-Id header) so services don\'t need to parse the JWT. This pattern reduces latency (one validation per request, not per service) and centralizes security.`,
  faqs: [
    {
      question: 'What library should I use for JWT in Spring Boot?',
      answer: 'JJWT (io.jsonwebtoken:jjwt-api) is the most popular. Spring Security 6 also has built-in OAuth2 Resource Server support that handles JWT validation automatically — configure spring.security.oauth2.resourceserver.jwt.secret-key and Spring validates JWTs without custom filter code.',
    },
  ],
  keyTakeaways: [
    'JWT is a self-contained, signed token — no DB lookup needed for validation',
    'Structure: header.payload.signature, all Base64-encoded',
    'OncePerRequestFilter validates JWT and sets SecurityContext on every request',
    'Access tokens: short expiry (15-60 min); refresh tokens: long expiry (30 days)',
    'Never put sensitive data in JWT payload — it is not encrypted',
    'Store JWT secret in environment variables, never in source code',
  ],
  relatedTopics: ['spring-security', 'spring-authentication', 'spring-authorization'],
};
