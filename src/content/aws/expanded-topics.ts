import type { TopicContent } from '../types';

interface AwsExpandedTopicSpec {
  slug: string;
  title: string;
  description: string;
  concept: string;
  why: string;
  usage: string;
  workflow: string;
  exampleTitle: string;
  exampleCode: string;
  relatedTopics: string[];
}

const reviewed = 'June 2026';
const versions = ['AWS Cloud', 'AWS CLI v2', 'AWS SDKs', 'AWS Well-Architected Framework'];

function topic(spec: AwsExpandedTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the AWS topics senior cloud engineers use to explain service boundaries, failure behavior, cost risk, and production operations with confidence.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers care about this topic:**
- AWS questions are usually about architecture, security, operations, and failure behavior rather than only service definitions
- Strong answers connect one service decision to blast radius, observability, and long-term governance
- Senior engineers explain how a workload behaves in production, not just how to click through setup`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical AWS example for ${spec.title.toLowerCase()}.`,
      code: [
        {
          label: spec.exampleTitle,
          language: 'text',
          code: spec.exampleCode,
        },
      ],
    },
    commonConfusions: [
      {
        question: `Is ${spec.title} only a service-selection topic?`,
        answer: `No. ${spec.title} affects security boundaries, failure recovery, automation, observability, and how safely teams can operate the workload over time.`,
      },
      {
        question: `What makes a weak interview answer for ${spec.title}?`,
        answer: `A weak answer explains the AWS service briefly but skips ownership, reliability trade-offs, measurable signals, and what happens when the service misbehaves in production.`,
      },
      {
        question: `How should senior engineers explain ${spec.title}?`,
        answer: `Senior answers connect ${spec.title} to architecture intent, access control, recovery, operational evidence, and the business impact of making the wrong choice.`,
      },
    ],
    productionIssues: [
      `${spec.title} is adopted without a clear ownership model, so teams make inconsistent assumptions about reliability, security, or cost.`,
      `A workload depends on ${spec.title.toLowerCase()} successfully in a happy-path environment, but alarms, automation, or recovery design are missing when traffic or failures increase.`,
      `Teams discuss ${spec.title} only as an AWS feature and miss the operating burden around quotas, visibility, cross-account governance, or recovery drills.`,
    ],
    bestPractices: [
      `Treat ${spec.title} as an architecture and operations decision, not just an AWS service definition.`,
      'Make the failure mode, access boundary, and observability signal explicit before scaling the pattern across environments.',
      'Use examples from production incidents, resilience reviews, cost investigations, or compliance design when explaining the topic.',
      'Prefer answers that connect AWS service mechanics to platform ownership and business continuity.',
    ],
    architectNote: `In AWS environments, ${spec.title} should be evaluated through blast radius, least privilege, resilience, automation, cost control, and how many teams must safely live with the decision.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real AWS workload?`,
        answer: `Explain the service boundary first, then connect ${spec.title} to network placement, IAM ownership, failure behavior, monitoring, cost, and the automation that keeps the workload supportable in production.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The usual concern is that the service works in a lab but becomes risky at scale because the team has not designed around limits, visibility, recovery, or governance.`,
      },
    ],
    keyTakeaways: [
      `${spec.title} is a production architecture decision, not just a service name to memorize.`,
      'Strong AWS answers connect service behavior, security, observability, and failure recovery together.',
      'Interview depth comes from showing ownership, trade-offs, and operational evidence clearly.',
      'Senior cloud engineers explain how workloads keep running when AWS dependencies are slow, misconfigured, or degraded.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const specs: AwsExpandedTopicSpec[] = [
  {
    slug: 'aws-regions',
    title: 'Regions',
    description: 'Understand how AWS region choice affects latency, compliance, service availability, and recovery design.',
    concept: 'AWS Regions are isolated geographic areas that determine where resources run, which services are available, what compliance obligations apply, and how disaster recovery is planned.',
    why: 'Region choice influences user latency, data residency, regulatory posture, inter-region replication cost, and how much operational complexity a team accepts for recovery.',
    usage: 'This matters in multi-country applications, regulated workloads, backup strategies, platform landing zones, and cloud architecture reviews.',
    workflow: 'Choose a region from user location, compliance constraints, service availability, and recovery goals, then verify supporting services and quotas before committing the design.',
    exampleTitle: 'Region selection review',
    exampleCode: `Ask before choosing a Region
-> where are the users?
-> where must data stay?
-> are required AWS services available?
-> what is the DR target region?`,
    relatedTopics: ['aws-global-infrastructure', 'aws-regions-availability-zones', 'aws-disaster-recovery'],
  },
  {
    slug: 'aws-availability-zones',
    title: 'Availability Zones',
    description: 'Learn how Availability Zones shape failure isolation, subnet design, and highly available AWS deployments.',
    concept: 'Availability Zones are isolated facilities inside a region that allow workloads to spread risk across independent power, cooling, and networking domains.',
    why: 'Multi-AZ design is one of the most common foundations of AWS availability. Teams that ignore AZ boundaries often create avoidable single-location outages.',
    usage: 'This appears in load-balanced services, database failover design, subnet planning, Auto Scaling placement, and incident response for zonal degradation.',
    workflow: 'Distribute critical resources across multiple AZs, size subnets for expected scale in each zone, and test how the application behaves when one zone becomes unhealthy.',
    exampleTitle: 'AZ resilience check',
    exampleCode: `Multi-AZ review
-> app instances in at least two AZs
-> load balancer attached to subnets in each AZ
-> data layer supports zonal failover
-> scaling capacity exists in each zone`,
    relatedTopics: ['aws-regions', 'aws-load-balancer', 'aws-high-availability'],
  },
  {
    slug: 'aws-edge-locations',
    title: 'Edge Locations',
    description: 'Understand how AWS edge infrastructure improves global delivery through caching, acceleration, and perimeter controls.',
    concept: 'Edge locations are globally distributed points of presence used by services such as CloudFront, Route 53, and Global Accelerator to serve users closer to where they are.',
    why: 'Edge placement matters when latency, TLS offload, DDoS mitigation, caching, and global user experience are part of the architecture.',
    usage: 'This shows up in content delivery, API acceleration, WAF placement, static asset strategy, and globally distributed product experiences.',
    workflow: 'Decide which requests benefit from edge caching or routing, protect origins behind edge services, and monitor cache hit ratio, invalidation behavior, and origin load together.',
    exampleTitle: 'Edge service lens',
    exampleCode: `Edge usage questions
-> what should be cached?
-> what must go back to origin?
-> where should WAF and TLS terminate?
-> how is origin traffic protected?`,
    relatedTopics: ['aws-global-infrastructure', 'aws-route-53', 'aws-s3'],
  },
  {
    slug: 'aws-elastic-beanstalk',
    title: 'Elastic Beanstalk',
    description: 'Learn when Elastic Beanstalk is a productive managed platform choice and where its abstraction limits become a trade-off.',
    concept: 'Elastic Beanstalk is a managed application platform that automates environment provisioning, deployment, health reporting, and rolling updates over AWS infrastructure.',
    why: 'It is useful for teams that want faster platform setup with less control-plane work, but architects still need to understand what infrastructure it creates and how far customization should go.',
    usage: 'This appears in web applications, internal platforms, quick-start environments, and teams that are not yet ready to own container orchestration or deep IaC-driven platforms.',
    workflow: 'Use Beanstalk when the deployment model aligns with the application, review the underlying infrastructure it manages, and define when the team should graduate to ECS, EKS, or more explicit IaC control.',
    exampleTitle: 'Platform fit check',
    exampleCode: `Elastic Beanstalk fits when
-> platform speed matters more than deep control
-> one app owns one environment cleanly
-> ops customization stays moderate`,
    relatedTopics: ['aws-ec2', 'aws-codepipeline', 'aws-ecs'],
  },
  {
    slug: 'aws-storage-classes',
    title: 'Storage Classes',
    description: 'Understand how S3 storage classes affect durability economics, retrieval behavior, and lifecycle design.',
    concept: 'S3 storage classes provide different trade-offs for access frequency, retrieval time, resilience profile, and price, from hot storage to archival tiers.',
    why: 'Storage cost and retrieval behavior become major operating concerns at scale. Teams need to classify data by access pattern rather than leaving everything in the default hot tier.',
    usage: 'This matters in log retention, document archives, media libraries, backups, compliance storage, and cost optimization reviews.',
    workflow: 'Classify objects by access needs, attach lifecycle transitions deliberately, and verify that restore timing, retrieval cost, and retention goals still satisfy the business requirement.',
    exampleTitle: 'Lifecycle strategy',
    exampleCode: `S3 class decision
-> hot and frequently read
-> warm but unpredictable
-> archive with slow retrieval
-> compliance retention with restore SLA`,
    relatedTopics: ['aws-s3', 'aws-cost-optimization', 'aws-operational-excellence'],
  },
  {
    slug: 'aws-aurora',
    title: 'Aurora',
    description: 'Learn how Aurora differs from standard RDS and where its replication, failover, and scaling model make sense.',
    concept: 'Aurora is an AWS-managed relational database engine with decoupled storage, fast replica creation, failover features, and service-specific operational characteristics.',
    why: 'Aurora often appears in architecture interviews because it promises operational advantages, but the real trade-off is understanding the workload, failover goals, and cost model.',
    usage: 'This appears in transactional systems, read-heavy services, multi-AZ database designs, and teams evaluating managed relational scale without moving away from SQL.',
    workflow: 'Compare Aurora with standard RDS by workload pattern, failover needs, replica behavior, cost, global design, and operational tooling before choosing it as the default.',
    exampleTitle: 'Aurora versus RDS lens',
    exampleCode: `Decision inputs
-> read scale needs
-> failover expectations
-> cost sensitivity
-> engine compatibility
-> global replication requirements`,
    relatedTopics: ['aws-rds', 'aws-high-availability', 'aws-multi-region-design'],
  },
  {
    slug: 'aws-elasticache',
    title: 'ElastiCache',
    description: 'Understand ElastiCache as a managed caching layer and how cache correctness, eviction, and failover shape AWS application behavior.',
    concept: 'ElastiCache provides managed Redis or Memcached services for low-latency caching, session storage, coordination patterns, and read-pressure relief on source systems.',
    why: 'Caches improve speed, but they also introduce freshness, invalidation, memory pressure, and failover questions that teams must own.',
    usage: 'This matters in read-heavy APIs, session systems, rate limiting, expensive computed responses, and high-throughput microservices.',
    workflow: 'Decide what may be cached, how keys and TTLs are governed, how the application behaves on cache misses, and how failover or hot-key conditions are detected before incidents happen.',
    exampleTitle: 'Cache behavior review',
    exampleCode: `Cache design asks
-> what is safe to cache?
-> how long is it fresh?
-> who invalidates it?
-> what happens when cache latency spikes?`,
    relatedTopics: ['aws-dynamodb', 'aws-storage-classes', 'aws-performance-troubleshooting'],
  },
  {
    slug: 'aws-route-53',
    title: 'Route 53',
    description: 'Learn how Route 53 handles DNS, health checks, and traffic-routing strategies for AWS workloads.',
    concept: 'Route 53 is AWS DNS and traffic-routing infrastructure that supports hosted zones, multiple routing policies, health-check-driven failover, and public or private name resolution.',
    why: 'DNS and routing decisions affect availability, latency, failover, and traffic cutovers, making Route 53 a common architecture and incident topic.',
    usage: 'This appears in public domains, private service discovery, multi-region failover, blue-green releases, and edge delivery strategies.',
    workflow: 'Choose the right routing policy, set DNS TTLs deliberately, tie health checks to the right failure signal, and coordinate traffic changes with rollout and recovery plans.',
    exampleTitle: 'Routing policy choice',
    exampleCode: `Route 53 review
-> simple or weighted routing?
-> failover based on what health check?
-> private or public hosted zone?
-> TTL aligned with cutover needs?`,
    relatedTopics: ['aws-edge-locations', 'aws-high-availability', 'aws-load-balancer'],
  },
  {
    slug: 'aws-nacls',
    title: 'NACLs',
    description: 'Understand how network ACLs differ from security groups and where subnet-level stateless filtering is useful.',
    concept: 'Network ACLs are stateless subnet-level filters that evaluate ordered allow and deny rules for ingress and egress traffic.',
    why: 'This topic matters because teams often confuse NACLs with security groups, then struggle to debug dropped traffic or overcomplicated network controls.',
    usage: 'NACLs appear in tightly governed VPCs, segmented environments, defense-in-depth designs, and compliance-driven subnet controls.',
    workflow: 'Use NACLs only when subnet-level stateless rules add real value, keep rule ordering understandable, and test traffic flows with ephemeral port behavior in mind.',
    exampleTitle: 'Network control boundary',
    exampleCode: `Security group
-> stateful
-> ENI or instance level

NACL
-> stateless
-> subnet level
-> rule order matters`,
    relatedTopics: ['aws-vpc', 'aws-security-groups', 'aws-transit-gateway'],
  },
  {
    slug: 'aws-transit-gateway',
    title: 'Transit Gateway',
    description: 'Learn how Transit Gateway simplifies large-scale VPC and hybrid connectivity while creating its own routing and governance responsibilities.',
    concept: 'Transit Gateway is a hub-and-spoke network service for connecting multiple VPCs, VPNs, and Direct Connect environments through centralized routing.',
    why: 'It is a high-value enterprise networking topic because it changes how teams segment environments, inspect traffic, and scale multi-account connectivity.',
    usage: 'This appears in multi-account AWS estates, centralized inspection patterns, hybrid enterprise connectivity, and large platform networking architectures.',
    workflow: 'Use Transit Gateway when point-to-point peering becomes too complex, then govern route domains, attachment ownership, and cost visibility carefully.',
    exampleTitle: 'Hub-and-spoke network pattern',
    exampleCode: `Transit Gateway helps when
-> many VPCs must connect
-> hybrid links need central routing
-> route domains require segmentation
-> peering sprawl becomes hard to operate`,
    relatedTopics: ['aws-vpc', 'aws-route-53', 'aws-security-best-practices'],
  },
  {
    slug: 'aws-kms',
    title: 'KMS',
    description: 'Understand AWS Key Management Service and how encryption ownership, key policy, and service integration affect security design.',
    concept: 'KMS manages cryptographic keys used by AWS services and applications for encryption at rest, envelope encryption, signing, and controlled access to protected data.',
    why: 'Encryption design is not only about turning on a checkbox. Teams need to understand who controls keys, how policies work, and what recovery or rotation means in production.',
    usage: 'This matters in S3, RDS, EBS, Secrets Manager, application encryption, audit design, and compliance reviews.',
    workflow: 'Choose where customer-managed keys are required, align key and IAM policies carefully, and plan for rotation, cross-account access, and deletion safety before production adoption.',
    exampleTitle: 'Encryption ownership model',
    exampleCode: `KMS review
-> who owns the key?
-> which services use it?
-> how is access granted?
-> what happens during rotation or account boundary changes?`,
    relatedTopics: ['aws-iam', 'aws-secrets-manager', 'aws-security-best-practices'],
  },
  {
    slug: 'aws-secrets-manager',
    title: 'Secrets Manager',
    description: 'Learn how Secrets Manager supports secure secret storage, rotation, and audited retrieval in AWS workloads.',
    concept: 'Secrets Manager stores sensitive credentials and configuration values with encryption, access control, rotation hooks, and API-driven retrieval.',
    why: 'Secret management is a common failure point in cloud systems because teams often embed credentials in code, build logs, environment files, or broad instance roles.',
    usage: 'This appears in databases, third-party integrations, CI/CD, Lambda, ECS, EKS, and any workload that needs credential lifecycle discipline.',
    workflow: 'Store secrets centrally, minimize who can read them, automate rotation where possible, and make application retrieval patterns observable and failure-tolerant.',
    exampleTitle: 'Secret handling checklist',
    exampleCode: `Secret management asks
-> who can read it?
-> how is it rotated?
-> where is it consumed?
-> what breaks if retrieval fails?`,
    relatedTopics: ['aws-kms', 'aws-iam', 'aws-cdk'],
  },
  {
    slug: 'aws-cognito',
    title: 'Cognito',
    description: 'Understand Cognito for user identity, authentication flows, federation, and token management in AWS applications.',
    concept: 'Cognito provides managed identity capabilities through user pools, identity pools, federation, MFA options, and token-based authentication flows.',
    why: 'Identity services change application security boundaries, integration complexity, and recovery behavior, so teams need more than a basic sign-in demo understanding.',
    usage: 'This matters in customer-facing apps, serverless APIs, mobile applications, and workloads needing managed user authentication with AWS integrations.',
    workflow: 'Choose the right Cognito model, define token and federation boundaries carefully, and validate the user-recovery and authorization flow before relying on it for real customers.',
    exampleTitle: 'Identity-flow review',
    exampleCode: `Cognito decision points
-> user pool or identity pool?
-> federated IdP required?
-> MFA and recovery flow?
-> where is resource authorization enforced?`,
    relatedTopics: ['aws-iam', 'aws-security-best-practices', 'aws-api-gateway'],
  },
  {
    slug: 'aws-security-best-practices',
    title: 'Security Best Practices',
    description: 'Learn how strong AWS security is built through layered controls, least privilege, logging, segmentation, and account governance.',
    concept: 'AWS security best practices combine IAM discipline, encryption, network segmentation, logging, guardrails, vulnerability reduction, and incident readiness across the full cloud estate.',
    why: 'Security maturity in AWS is usually the result of consistent operating patterns, not one service choice.',
    usage: 'This appears in platform standards, audit readiness, regulated workloads, landing zones, and multi-account governance programs.',
    workflow: 'Use defense-in-depth, separate duties across accounts and roles, centralize logs, restrict default access, and rehearse incident response instead of assuming controls are enough because they were enabled once.',
    exampleTitle: 'Cloud guardrail baseline',
    exampleCode: `Security baseline
-> least privilege IAM
-> logging and audit trails
-> encryption and secrets control
-> segmented accounts and networks
-> incident readiness`,
    relatedTopics: ['aws-iam', 'aws-kms', 'aws-security-incidents'],
  },
  {
    slug: 'aws-step-functions',
    title: 'Step Functions',
    description: 'Understand Step Functions as a workflow orchestration layer for serverless and distributed AWS processes.',
    concept: 'Step Functions coordinate tasks, branching, retries, timeouts, and long-running workflows through explicit state-machine definitions.',
    why: 'They are valuable when teams need observable orchestration rather than burying workflow state inside one function or one application service.',
    usage: 'This appears in approvals, multi-step backend processing, event-driven workflows, serverless orchestration, and recovery-aware business processes.',
    workflow: 'Model the workflow as states and transitions, make retry and timeout behavior explicit, and keep external side effects idempotent so failures do not create hidden duplication.',
    exampleTitle: 'Workflow orchestration rule',
    exampleCode: `Step Functions help when
-> multiple steps need visible orchestration
-> retries and compensation matter
-> long-running state must stay observable`,
    relatedTopics: ['aws-lambda', 'aws-sqs', 'aws-eventbridge'],
  },
  {
    slug: 'aws-sqs',
    title: 'SQS',
    description: 'Learn how SQS decouples workloads through queues, visibility timeouts, DLQs, and backlog-driven scaling.',
    concept: 'SQS is a managed queue service used to buffer work, decouple producers and consumers, and absorb spikes without forcing synchronous processing.',
    why: 'Queue design is a common cloud architecture topic because it changes reliability, throughput, error recovery, and operational observability.',
    usage: 'This matters in async processing, order pipelines, notifications, fanout workflows, and workload smoothing across microservices or serverless consumers.',
    workflow: 'Pick the right queue type, size visibility timeouts from real processing time, use dead-letter queues, and monitor age and backlog rather than waiting for consumers to fail noisily.',
    exampleTitle: 'Queue reliability checklist',
    exampleCode: `SQS design asks
-> standard or FIFO?
-> how long may processing take?
-> where do poison messages go?
-> what alarm shows backlog risk early?`,
    relatedTopics: ['aws-sns', 'aws-step-functions', 'aws-incident-response'],
  },
  {
    slug: 'aws-sns',
    title: 'SNS',
    description: 'Understand SNS fanout messaging and how topic-based delivery changes event distribution patterns in AWS.',
    concept: 'SNS is a publish-subscribe service that fans out messages to multiple endpoints such as SQS queues, Lambda functions, HTTP endpoints, email, and mobile notifications.',
    why: 'Fanout decisions affect coupling, delivery guarantees, retry behavior, and how many downstream consumers can evolve independently.',
    usage: 'This appears in notification platforms, event propagation, async integration, and cross-service communication patterns.',
    workflow: 'Use SNS when one event should reach multiple independent consumers, make subscriptions and retries explicit, and monitor failed deliveries instead of assuming publication equals success.',
    exampleTitle: 'Fanout pattern',
    exampleCode: `Producer
-> publishes one event to SNS topic
-> multiple consumers receive through SQS, Lambda, or HTTP
-> each consumer owns its own retry and processing model`,
    relatedTopics: ['aws-sqs', 'aws-eventbridge', 'aws-operational-excellence'],
  },
  {
    slug: 'aws-ecs',
    title: 'ECS',
    description: 'Learn how ECS runs containers on AWS and how task design, networking, and deployment strategy affect production operations.',
    concept: 'ECS is AWS container orchestration for running tasks and services on EC2 or Fargate with AWS-native deployment, scaling, and networking controls.',
    why: 'Teams choosing between ECS, EKS, Fargate, or Beanstalk need to understand the control trade-offs and operating model of each.',
    usage: 'This appears in microservices, containerized web applications, background workers, and internal platforms that want AWS-native orchestration without full Kubernetes ownership.',
    workflow: 'Define task resources and health checks clearly, align deployment strategy with rollback safety, and make container identity, secrets, and logging part of the base platform design.',
    exampleTitle: 'Container service fit',
    exampleCode: `ECS fits when
-> AWS-native orchestration is preferred
-> Kubernetes ownership is unnecessary
-> task and service operations should stay simpler`,
    relatedTopics: ['aws-fargate', 'aws-docker-on-aws', 'aws-codepipeline'],
  },
  {
    slug: 'aws-eks',
    title: 'EKS',
    description: 'Understand EKS for Kubernetes on AWS and where cluster ownership changes the platform responsibility model.',
    concept: 'EKS provides a managed Kubernetes control plane while leaving teams responsible for cluster operations, workload policies, node design, and broader platform governance.',
    why: 'Kubernetes on AWS is powerful, but it increases platform complexity. Strong answers explain why that trade-off is justified or not.',
    usage: 'This matters in multi-service platforms, organizations standardizing on Kubernetes, and teams needing portability or Kubernetes-native platform patterns.',
    workflow: 'Adopt EKS when Kubernetes capabilities justify the operating cost, then define cluster upgrade strategy, identity model, networking, autoscaling, and observability before scaling team adoption.',
    exampleTitle: 'Cluster ownership decision',
    exampleCode: `Choose EKS when
-> Kubernetes features matter
-> platform team can own cluster operations
-> workload portability or policy depth justifies the complexity`,
    relatedTopics: ['aws-ecs', 'aws-fargate', 'aws-operational-excellence'],
  },
  {
    slug: 'aws-fargate',
    title: 'Fargate',
    description: 'Learn how Fargate changes container operations by removing server management while keeping workload design and cost trade-offs real.',
    concept: 'Fargate is serverless compute for containers in ECS and EKS that reduces node management but still requires careful task sizing, networking, and operational visibility.',
    why: 'Teams often assume “serverless containers” means no operations trade-offs, but cost, startup, networking, and right-sizing still matter.',
    usage: 'This appears in internal services, bursty workloads, regulated environments wanting less host management, and teams preferring managed container scheduling.',
    workflow: 'Use Fargate when node ownership is unnecessary, size task CPU and memory deliberately, and compare the steady-state cost and startup behavior against EC2-backed container options.',
    exampleTitle: 'Fargate trade-off lens',
    exampleCode: `Fargate helps when
-> node management is undesirable
-> workload sizing is predictable enough
-> startup and per-task cost remain acceptable`,
    relatedTopics: ['aws-ecs', 'aws-eks', 'aws-cost-optimization'],
  },
  {
    slug: 'aws-docker-on-aws',
    title: 'Docker on AWS',
    description: 'Understand how container image, runtime, secret, and registry decisions shape Docker workloads on AWS.',
    concept: 'Docker on AWS is the broader delivery layer around building, storing, securing, scanning, and running container images across ECS, EKS, Fargate, or EC2-based platforms.',
    why: 'Container success on AWS depends on more than the orchestrator. Image hygiene, ECR lifecycle, runtime identity, secrets, and observability all matter.',
    usage: 'This appears in microservices, CI/CD, multi-stage builds, vulnerability management, and containerized platform operations.',
    workflow: 'Build minimal images, scan and tag them consistently, use ECR lifecycle policies, keep runtime secrets out of images, and standardize logging and health behavior across workloads.',
    exampleTitle: 'Container delivery baseline',
    exampleCode: `Docker on AWS baseline
-> minimal image
-> scanned in registry
-> secret injection at runtime
-> non-root where possible
-> logs and health wired by default`,
    relatedTopics: ['aws-ecs', 'aws-fargate', 'aws-codebuild'],
  },
  {
    slug: 'aws-cdk',
    title: 'CDK',
    description: 'Learn how the AWS CDK helps model infrastructure in code and where teams need discipline around abstraction and synthesis.',
    concept: 'The AWS Cloud Development Kit lets teams define infrastructure using programming languages, then synthesizes those constructs into CloudFormation templates.',
    why: 'CDK can speed delivery and reuse, but teams still need to understand the generated infrastructure, review process, and abstraction governance.',
    usage: 'This matters in platform libraries, reusable cloud patterns, service templates, multi-environment stacks, and infrastructure review workflows.',
    workflow: 'Use CDK where higher-level reuse is valuable, keep constructs understandable, review synthesized output for critical changes, and govern version drift and environment separation carefully.',
    exampleTitle: 'Abstraction review rule',
    exampleCode: `CDK discipline
-> reusable constructs
-> readable stack intent
-> synthesized output reviewed
-> environment boundaries explicit`,
    relatedTopics: ['aws-cloudformation', 'aws-codepipeline', 'aws-operational-excellence'],
  },
  {
    slug: 'aws-x-ray',
    title: 'X-Ray',
    description: 'Understand X-Ray tracing and how distributed request visibility helps AWS troubleshooting.',
    concept: 'AWS X-Ray traces requests across supported services and application code so teams can see where latency, retries, and downstream failures accumulate.',
    why: 'Tracing becomes essential once systems cross multiple services, queues, or functions and logs alone stop explaining user-facing slowness.',
    usage: 'This appears in API troubleshooting, Lambda call chains, microservices, event-driven systems, and performance incident analysis.',
    workflow: 'Trace critical paths selectively, correlate spans with metrics and logs, and use service maps to isolate the dependency that actually dominates latency or failure.',
    exampleTitle: 'Trace-based investigation',
    exampleCode: `Tracing should answer
-> where did time go?
-> which dependency failed?
-> did retries amplify the latency?
-> do logs and metrics confirm the same story?`,
    relatedTopics: ['aws-cloudwatch', 'aws-performance-troubleshooting', 'aws-lambda'],
  },
  {
    slug: 'aws-config',
    title: 'Config',
    description: 'Learn how AWS Config tracks resource configuration history, compliance rules, and drift evidence.',
    concept: 'AWS Config records resource configuration states over time and can evaluate them against managed or custom compliance rules.',
    why: 'Config matters when teams need traceable evidence for drift, audit, operational reviews, and automated guardrail enforcement.',
    usage: 'This appears in regulated environments, platform governance, conformance packs, security baselines, and post-incident infrastructure investigations.',
    workflow: 'Track the right resources, apply rules tied to real policy, and use remediation carefully so automation helps instead of obscuring the original drift problem.',
    exampleTitle: 'Drift evidence model',
    exampleCode: `Config helps prove
-> what changed
-> when it changed
-> whether it violated policy
-> whether remediation was needed`,
    relatedTopics: ['aws-cloudtrail', 'aws-security-best-practices', 'aws-incident-response'],
  },
  {
    slug: 'aws-multi-region-design',
    title: 'Multi-Region Design',
    description: 'Understand when multi-region AWS architecture is justified and how replication, routing, and recovery complexity change the operating model.',
    concept: 'Multi-region design spreads workload capability across more than one AWS region for recovery, latency, sovereignty, or service continuity reasons.',
    why: 'Multi-region architecture is powerful, but it adds cost, complexity, data-consistency challenges, and testing obligations that must be justified by real business need.',
    usage: 'This appears in disaster recovery, global products, regulated workloads, active-passive cutover design, and active-active high-availability architectures.',
    workflow: 'Start with the recovery objective, then define routing, replication, failover testing, and operational ownership so the second region is truly usable during an incident.',
    exampleTitle: 'Recovery architecture test',
    exampleCode: `Multi-region is only real if
-> data is replicated correctly
-> routing can shift safely
-> dependencies exist in the target region
-> failover has been rehearsed`,
    relatedTopics: ['aws-high-availability', 'aws-disaster-recovery', 'aws-route-53'],
  },
  {
    slug: 'aws-incident-response',
    title: 'Incident Response',
    description: 'Learn how AWS incidents are triaged, contained, and investigated with service-specific evidence and blast-radius awareness.',
    concept: 'AWS incident response is the operational process of scoping impact, stabilizing the workload, preserving evidence, and deciding on rollback, failover, or narrow mitigation.',
    why: 'Cloud incidents can spread quickly across compute, IAM, networking, data, and cost. Strong incident response depends on knowing where to look first.',
    usage: 'This matters in deployment regressions, degraded managed services, public exposure events, region or AZ incidents, and cost or security escalations.',
    workflow: 'Start with blast radius and user impact, preserve CloudWatch, CloudTrail, Config, and deployment evidence, then choose the smallest reversible action that restores service without destroying the root-cause trail.',
    exampleTitle: 'Cloud incident order',
    exampleCode: `1. Scope impact
2. Preserve evidence
3. Contain blast radius
4. Restore service
5. Prove root cause
6. Add prevention`,
    relatedTopics: ['aws-cloudwatch', 'aws-cloudtrail', 'aws-operational-excellence'],
  },
  {
    slug: 'aws-performance-troubleshooting',
    title: 'Performance Troubleshooting',
    description: 'Understand how to troubleshoot AWS latency and throughput issues across application, network, storage, and managed services.',
    concept: 'Performance troubleshooting on AWS means decomposing latency across clients, DNS, edge, load balancers, compute, databases, caches, queues, and quotas rather than guessing from one graph.',
    why: 'Cloud systems hide bottlenecks behind many managed boundaries, so disciplined evidence collection is what separates useful diagnosis from random tuning.',
    usage: 'This matters in slow APIs, queue backlogs, Lambda bottlenecks, overloaded databases, NAT-cost and latency surprises, and multi-service user journeys.',
    workflow: 'Break the path into layers, use the right telemetry for each boundary, correlate recent changes, and validate the fix under realistic workload instead of only local tests.',
    exampleTitle: 'Latency decomposition path',
    exampleCode: `AWS latency review
-> DNS and edge
-> load balancer
-> compute or function
-> data or cache
-> downstream dependency
-> quota or network constraint`,
    relatedTopics: ['aws-x-ray', 'aws-cloudwatch', 'aws-load-balancer'],
  },
  {
    slug: 'aws-security-incidents',
    title: 'Security Incidents',
    description: 'Learn how AWS-specific security incidents are investigated through IAM, audit logs, key usage, and exposure boundaries.',
    concept: 'Security incidents in AWS often involve identity misuse, public exposure, secret leakage, unexpected network access, or compromised automation and require careful evidence preservation.',
    why: 'Cloud security response is a major interview theme because containment decisions can either protect the account or destroy the evidence needed for root cause.',
    usage: 'This appears in leaked credentials, public S3 objects, unauthorized role assumption, cross-account misuse, misconfigured security controls, and compliance escalations.',
    workflow: 'Use CloudTrail and related telemetry first, identify compromised identities or resources, contain with the narrowest safe permissions change, and review whether logging and guardrails were strong enough before the incident.',
    exampleTitle: 'Security triage lens',
    exampleCode: `Security incident asks
-> which identity or resource was misused?
-> what logs prove it?
-> what can be contained safely now?
-> what guardrail failed earlier?`,
    relatedTopics: ['aws-iam', 'aws-s3', 'aws-security-best-practices'],
  },
  {
    slug: 'aws-cost-issues',
    title: 'AWS Cost Issues',
    description: 'Understand how AWS cost incidents are diagnosed through tagging, data-transfer analysis, idle resources, and service-specific billing behavior.',
    concept: 'AWS cost issues are operational incidents where cloud spend changes unexpectedly because of scaling patterns, storage growth, network transfer, idle infrastructure, or poor purchasing decisions.',
    why: 'Cost optimization is not only a planning topic. In production, spend anomalies often reveal architectural or governance problems that need real triage.',
    usage: 'This matters in NAT gateway spikes, cross-AZ transfer surprises, idle fleets, archival mistakes, runaway retries, and overprovisioned services.',
    workflow: 'Start with billing and tagging evidence, isolate the dominant services or dimensions, correlate to workload or deployment changes, and fix the design or governance issue instead of only deleting obvious waste.',
    exampleTitle: 'Cost anomaly triage',
    exampleCode: `Cost spike?
Check
-> which service changed?
-> which tags or accounts own it?
-> did traffic or architecture shift?
-> is transfer, storage, or compute the driver?`,
    relatedTopics: ['aws-cost-optimization', 'aws-storage-classes', 'aws-operational-excellence'],
  },
  {
    slug: 'aws-operational-excellence',
    title: 'Operational Excellence',
    description: 'Learn how AWS operational excellence is built through runbooks, alarms, game days, change discipline, and automation.',
    concept: 'Operational excellence is the practice of making AWS workloads observable, supportable, repeatable, and resilient under real operational pressure.',
    why: 'This topic matters because many AWS failures are not service failures first; they are operating-model failures where detection, ownership, and response are too weak.',
    usage: 'This appears in platform standards, on-call readiness, Well-Architected reviews, production handoffs, change management, and incident-prevention programs.',
    workflow: 'Define the service signals that matter, document response paths, automate repetitive recovery where safe, and rehearse failure rather than assuming the team will improvise well during an outage.',
    exampleTitle: 'Operations maturity checklist',
    exampleCode: `Operational excellence means
-> alarms with clear owners
-> runbooks and game days
-> automated safe recovery
-> reviewed changes
-> post-incident learning`,
    relatedTopics: ['aws-incident-response', 'aws-cloudwatch', 'aws-config'],
  },
];

export const awsExpandedTopics: Record<string, TopicContent> = Object.fromEntries(
  specs.map((spec) => [spec.slug, topic(spec)])
);
