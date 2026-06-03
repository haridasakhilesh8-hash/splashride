import type { TopicContent } from '../../types';

export const springServiceDiscovery: TopicContent = {
  slug: 'spring-service-discovery',
  title: 'Service Discovery',
  description: 'Implement service discovery with Spring Cloud Eureka — enabling microservices to find each other dynamically without hardcoded URLs.',
  applicableVersions: ['Spring Boot 3.x', 'Spring Cloud 2023.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Service discovery solves the problem of services not knowing each other\'s IP addresses (which change in cloud environments). Services register themselves with a registry (Eureka Server). When Service A needs to call Service B, it asks the registry for B\'s address. Spring Cloud\'s @LoadBalanced RestClient/WebClient/Feign automatically use the registry.',
  whatIsIt: `Service discovery is the mechanism by which microservices locate each other.

**Components:**
- **Eureka Server** — the service registry (a Spring Boot app with @EnableEurekaServer)
- **Eureka Client** — each microservice registers itself (spring-cloud-starter-netflix-eureka-client)
- **Load Balancer** — Spring Cloud LoadBalancer distributes calls across instances

**Registration process:**
1. Service starts, registers with Eureka (name, IP, port, health URL)
2. Sends heartbeats every 30 seconds to stay registered
3. If heartbeats stop, Eureka removes the instance after 90 seconds
4. Clients cache the registry locally — don\'t query Eureka on every call`,
  whyWeNeedIt: `In Kubernetes or cloud environments, service IP addresses change when pods restart. Hardcoding IPs is impossible. Service discovery provides stable logical names (order-service) that resolve to current instances dynamically. It also enables load balancing across multiple instances.`,
  realWorldUsage: `In Kubernetes, you often use Kubernetes Service DNS instead of Eureka (Kubernetes has built-in service discovery). Eureka is more relevant in non-Kubernetes environments or when you need client-side load balancing with more control.`,
  howItWorks: `Services use \`lb://service-name\` URIs. Spring Cloud LoadBalancer intercepts these, queries the service registry for available instances, and selects one (round-robin by default). The actual HTTP call goes to the selected instance\'s IP and port.`,
  example: {
    title: 'Eureka Server and Client Setup',
    description: 'Setting up service registry and client registration.',
    code: [
      {
        label: 'Eureka Server',
        language: 'java',
        code: `// Eureka Server — standalone Spring Boot app
@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }
}

// application.yml for Eureka Server
// server:
//   port: 8761
// eureka:
//   client:
//     register-with-eureka: false  # Don't register itself
//     fetch-registry: false
//   server:
//     wait-time-in-ms-when-sync-empty: 0`,
      },
      {
        label: 'Eureka Client (Each Microservice)',
        language: 'yaml',
        code: `# Each microservice's application.yml
spring:
  application:
    name: order-service  # This is the service name used for discovery

eureka:
  client:
    service-url:
      defaultZone: http://eureka-server:8761/eureka/
    fetch-registry: true
    register-with-eureka: true
  instance:
    prefer-ip-address: true
    lease-renewal-interval-in-seconds: 30
    health-check-url-path: /actuator/health

# In the API Gateway, use lb:// to load balance:
# uri: lb://order-service`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Eureka vs Kubernetes Service Discovery — which to use?',
      answer: 'If running on Kubernetes, use Kubernetes Service DNS (service-name.namespace.svc.cluster.local). Kubernetes has built-in service discovery and load balancing. Eureka adds complexity without benefit in a Kubernetes environment. Use Eureka for non-Kubernetes deployments or when you need client-side load balancing features.',
    },
  ],
  productionIssues: [
    'Eureka server single point of failure — deploy in cluster mode with multiple replicas',
    'Stale registry entries after service crashes — tune lease expiry settings',
    'Services not deregistering on shutdown — ensure graceful shutdown is configured',
  ],
  bestPractices: [
    'Run Eureka in cluster mode (minimum 2 instances) for high availability',
    'Set spring.application.name consistently — it\'s your service\'s identity',
    'Configure health check URL so Eureka knows if the service is actually healthy',
    'On Kubernetes, prefer Kubernetes native service discovery over Eureka',
  ],
  architectNote: `Modern cloud-native deployments on Kubernetes use Kubernetes Service DNS for service discovery natively. Spring Cloud Eureka is more relevant for traditional VM-based or Docker Compose deployments. If you\'re building for Kubernetes from the start, you can skip Eureka and use Kubernetes Services directly — simpler and more reliable.`,
  faqs: [
    {
      question: 'What happens if the Eureka server goes down?',
      answer: 'Eureka clients cache the registry locally. If the server is unavailable, clients continue using the cached registry. New registrations fail, and stale entries aren\'t cleaned up, but existing services continue to call each other. This is Eureka\'s availability-over-consistency design.',
    },
  ],
  keyTakeaways: [
    'Eureka Server is the service registry; clients register and discover services',
    'Use lb://service-name in gateway routes for load-balanced calls',
    'Services cache the registry locally — resilient to Eureka downtime',
    'On Kubernetes, use Kubernetes Service DNS instead of Eureka',
    'spring.application.name is your service\'s identity in the registry',
  ],
  relatedTopics: ['spring-api-gateway', 'spring-config-server', 'spring-service-communication'],
};
