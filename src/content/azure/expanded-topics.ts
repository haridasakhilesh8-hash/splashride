import type { TopicContent } from '../types';

interface AzureExpandedTopicSpec {
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
const versions = ['Microsoft Azure', 'Azure Portal', 'Azure CLI', 'ARM and Bicep'];

function topic(spec: AzureExpandedTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the Azure topics senior cloud engineers use to explain platform governance, service boundaries, failure behavior, and production operations with confidence.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers care about this topic:**
- Azure discussions are usually about platform behavior, governance, and production trade-offs rather than only service definitions
- Strong answers connect the Azure service to identity, networking, observability, and operating-model consequences
- Senior engineers explain how the workload behaves under failure, scale, audit pressure, and release change`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Azure example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} only a portal setup topic?`,
        answer: `No. ${spec.title} affects security boundaries, recovery, automation, observability, and how safely the platform can be operated across environments.`,
      },
      {
        question: `What makes a weak interview answer for ${spec.title}?`,
        answer: `A weak answer defines ${spec.title} briefly but skips ownership, blast radius, operational signals, production failure modes, and why teams would choose it over another Azure option.`,
      },
      {
        question: `How should senior engineers explain ${spec.title}?`,
        answer: `Senior answers connect ${spec.title} to workload intent, access control, automation, observability, cost behavior, and incident response expectations.`,
      },
    ],
    productionIssues: [
      `${spec.title} is introduced without a clear ownership model, so teams make inconsistent assumptions about access, recovery, or operating cost.`,
      `The workload depends on ${spec.title.toLowerCase()} successfully in a happy-path environment, but alarms, automation, or fallback behavior are too weak when production pressure rises.`,
      `Teams discuss ${spec.title} only as an Azure feature and miss the governance or support burden around policy, networking, telemetry, or multi-environment drift.`,
    ],
    bestPractices: [
      `Treat ${spec.title} as a platform and operations decision, not just a service definition.`,
      'Make the failure mode, access boundary, and observability signal explicit before spreading the pattern across subscriptions or environments.',
      'Use examples from production incidents, architecture reviews, cost investigations, or governance audits when explaining the topic.',
      'Prefer answers that connect Azure service mechanics to long-term platform ownership and business continuity.',
    ],
    architectNote: `In Azure environments, ${spec.title} should be evaluated through blast radius, least privilege, resilience, policy alignment, cost control, and how many teams must safely live with the decision over time.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Azure workload?`,
        answer: `Explain the Azure boundary first, then connect ${spec.title} to network placement, RBAC ownership, failure behavior, monitoring, cost, and the automation that keeps the workload supportable in production.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The usual concern is that the service works in a lab but becomes risky at scale because the team has not designed around visibility, recovery, policy, or environment drift.`,
      },
    ],
    keyTakeaways: [
      `${spec.title} is a production architecture decision, not just a feature to memorize.`,
      'Strong Azure answers connect service behavior, security, observability, and operational recovery together.',
      'Interview depth comes from showing ownership, trade-offs, and production evidence clearly.',
      'Senior cloud engineers explain how workloads keep running when Azure dependencies are slow, misconfigured, or degraded.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const specs: AzureExpandedTopicSpec[] = [
  {
    slug: 'azure-regions',
    title: 'Azure Regions',
    description: 'Understand how Azure region selection affects latency, compliance, service availability, and recovery posture.',
    concept: 'Azure regions are geographic deployment boundaries that determine where resources run, which services are available, what residency constraints apply, and how disaster recovery is planned.',
    why: 'Region choice affects user latency, regulatory fit, cross-region replication cost, service availability, and the real complexity of business continuity planning.',
    usage: 'This matters in multi-country applications, regulated platforms, backup strategy, landing-zone design, and cloud architecture review.',
    workflow: 'Choose a region from user location, compliance constraints, service availability, and recovery objectives, then verify quotas and supporting services before standardizing the design.',
    exampleTitle: 'Region selection review',
    exampleCode: `Ask before choosing a region
-> where are the users?
-> where must data stay?
-> are required Azure services available?
-> what is the paired or recovery region?`,
    relatedTopics: ['azure-basics', 'azure-availability-zones', 'azure-disaster-recovery'],
  },
  {
    slug: 'azure-availability-zones',
    title: 'Availability Zones',
    description: 'Learn how Azure Availability Zones improve failure isolation and highly available workload design.',
    concept: 'Availability Zones are physically separate datacenter locations inside supported Azure regions that allow critical workloads to spread risk across independent failure domains.',
    why: 'Zone-aware design reduces the blast radius of infrastructure failures and is a key part of production-grade availability planning.',
    usage: 'This appears in zonal VMs, load-balanced services, resilient databases, platform landing zones, and high-availability architecture decisions.',
    workflow: 'Use zone-aware services where the workload warrants it, place redundant resources intentionally, and verify that routing, storage, and failover behavior really tolerate zonal loss.',
    exampleTitle: 'Zone resilience check',
    exampleCode: `Availability design
-> app capacity across zones
-> data layer supports zonal tolerance
-> load balancers route correctly
-> failover has been validated`,
    relatedTopics: ['azure-regions', 'azure-high-availability', 'azure-load-balancer'],
  },
  {
    slug: 'azure-management-groups',
    title: 'Management Groups',
    description: 'Understand management groups as the top-level Azure governance boundary for policies, subscriptions, and enterprise standards.',
    concept: 'Management groups organize subscriptions into a hierarchy so enterprises can apply governance, policy, role assignments, and compliance controls consistently at scale.',
    why: 'Without management-group strategy, large Azure estates drift into inconsistent policy, duplicated controls, and weak visibility across subscriptions.',
    usage: 'This matters in landing zones, enterprise platform governance, shared-service subscriptions, cost reporting, and regulated cloud environments.',
    workflow: 'Design the hierarchy around governance intent, place subscriptions deliberately, and use inherited policy and RBAC only where the blast radius is acceptable.',
    exampleTitle: 'Governance hierarchy map',
    exampleCode: `Tenant
-> Platform management group
-> Shared services management group
-> Production apps management group
-> Sandbox management group`,
    relatedTopics: ['azure-subscription-management', 'azure-policy', 'azure-landing-zones'],
  },
  {
    slug: 'azure-policy',
    title: 'Azure Policy',
    description: 'Learn how Azure Policy enforces cloud guardrails, detects drift, and supports compliance automation.',
    concept: 'Azure Policy evaluates resources against rules that can audit, deny, append, modify, or remediate configuration to keep environments aligned with platform standards.',
    why: 'Policy is central to enterprise Azure because manual review does not scale when many teams provision resources across many subscriptions.',
    usage: 'This appears in tagging enforcement, allowed locations, encryption standards, network restrictions, and governance-heavy landing-zone patterns.',
    workflow: 'Write policies tied to real guardrails, assign them at the right scope, monitor compliance and exemptions, and use remediation carefully so automation improves clarity instead of hiding root causes.',
    exampleTitle: 'Policy baseline',
    exampleCode: `Common Azure Policy controls
-> allowed regions
-> required tags
-> approved SKUs
-> private networking requirements
-> encryption and logging standards`,
    relatedTopics: ['azure-management-groups', 'azure-subscription-management', 'azure-security-operations'],
  },
  {
    slug: 'azure-landing-zones',
    title: 'Landing Zones',
    description: 'Understand Azure landing zones as the repeatable foundation for subscriptions, identity, network, governance, and operations.',
    concept: 'Azure landing zones are standardized platform blueprints that set up subscriptions, management groups, networking, identity, policy, logging, and security guardrails before application teams deploy workloads.',
    why: 'Landing zones reduce inconsistency and let engineering teams start from approved cloud foundations instead of rebuilding governance one subscription at a time.',
    usage: 'This matters in enterprise cloud adoption, multi-team platform engineering, modernization programs, and new subscription onboarding.',
    workflow: 'Define the enterprise baseline first, automate subscription onboarding, connect governance and network standards, and make exceptions explicit instead of informal.',
    exampleTitle: 'Landing-zone scope',
    exampleCode: `Landing zone usually includes
-> subscription placement
-> policy baseline
-> logging and monitoring
-> network connectivity
-> identity and RBAC model`,
    relatedTopics: ['azure-management-groups', 'azure-policy', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-app-service-plans',
    title: 'App Service Plans',
    description: 'Learn how App Service Plans shape capacity, scaling, pricing, and workload isolation for Azure App Service.',
    concept: 'An App Service Plan defines the compute region, instance size, scaling characteristics, and pricing tier behind one or more App Service apps.',
    why: 'App Service architecture decisions are incomplete unless teams understand how the plan affects performance isolation, scale behavior, and cost.',
    usage: 'This appears in web applications, internal portals, API hosting, multi-app plans, and cost reviews where noisy-neighbor behavior matters.',
    workflow: 'Choose the plan tier from performance, scale, and compliance needs, then decide whether apps should share one plan or be isolated for operational and cost reasons.',
    exampleTitle: 'Plan sizing lens',
    exampleCode: `App Service Plan review
-> how many apps share the plan?
-> what scale pattern is expected?
-> is isolation more important than lower cost?`,
    relatedTopics: ['azure-app-service', 'azure-deployment-slots', 'azure-cost-governance'],
  },
  {
    slug: 'azure-deployment-slots',
    title: 'Deployment Slots',
    description: 'Understand App Service deployment slots for safer rollouts, warmup, and rollback control.',
    concept: 'Deployment slots let App Service host multiple app versions, warm them up separately, and swap traffic between them to reduce release risk.',
    why: 'Slots matter because safe release patterns reduce downtime, shorten rollback time, and let teams validate configuration before users are affected.',
    usage: 'This appears in blue-green style web deployments, release validation, hotfix rollback, and production support workflows.',
    workflow: 'Deploy to a non-production slot, warm and verify the version, swap when safe, and manage config settings carefully so slot-specific values do not leak across environments.',
    exampleTitle: 'Slot rollout flow',
    exampleCode: `1. Deploy to staging slot
2. Warm up and smoke test
3. Verify settings and dependencies
4. Swap to production
5. Roll back quickly if needed`,
    relatedTopics: ['azure-app-service', 'azure-cicd', 'azure-incident-response'],
  },
  {
    slug: 'azure-function-triggers-bindings',
    title: 'Function Triggers and Bindings',
    description: 'Learn how Azure Functions are activated and connected to Azure services through triggers and bindings.',
    concept: 'Triggers decide what starts a function, while bindings simplify input and output integration with services such as queues, blobs, Event Grid, and Service Bus.',
    why: 'Function design depends on event shape, retry behavior, idempotency, and how dependencies are connected under production load.',
    usage: 'This matters in event-driven automation, serverless APIs, background processing, integration workflows, and consumption-plan troubleshooting.',
    workflow: 'Choose the trigger from the event source, understand delivery guarantees and retry behavior, and keep function side effects idempotent so reprocessing does not corrupt state.',
    exampleTitle: 'Serverless event review',
    exampleCode: `Function design asks
-> what triggers execution?
-> what retries exist?
-> what output binding or downstream write happens?
-> is the handler idempotent?`,
    relatedTopics: ['azure-functions', 'azure-durable-functions', 'azure-service-bus'],
  },
  {
    slug: 'azure-durable-functions',
    title: 'Durable Functions',
    description: 'Understand Durable Functions for stateful serverless workflows, orchestration, and long-running Azure processes.',
    concept: 'Durable Functions add orchestration, fan-out, timers, and stateful workflow behavior on top of Azure Functions so distributed processes stay visible and resumable.',
    why: 'Long-running workflows become fragile when teams try to hide state and retries inside one stateless function or ad hoc code path.',
    usage: 'This appears in approval flows, multi-step integrations, scheduled coordination, compensation workflows, and cloud automation.',
    workflow: 'Separate orchestration from activity work, make retries and timeout behavior explicit, and keep external side effects idempotent because replay behavior is part of the model.',
    exampleTitle: 'Workflow orchestration rule',
    exampleCode: `Durable Functions fit when
-> workflow state must survive restarts
-> multiple steps need visible orchestration
-> retries and compensation matter`,
    relatedTopics: ['azure-functions', 'azure-service-bus', 'azure-operational-excellence'],
  },
  {
    slug: 'azure-storage-accounts',
    title: 'Storage Accounts',
    description: 'Learn how Azure Storage Accounts define the namespace, performance tier, security posture, and service capabilities for storage workloads.',
    concept: 'A Storage Account is the management boundary behind Azure Blob, Files, Queues, and Tables, shaping access control, networking, replication, and pricing behavior.',
    why: 'Storage behavior depends on the account design as much as the storage service itself, especially for networking, redundancy, lifecycle, and operational ownership.',
    usage: 'This appears in data platforms, application file storage, diagnostics retention, backup targets, queue-driven applications, and static content hosting.',
    workflow: 'Choose the account type from workload needs, align network access and identity, and review replication, naming, lifecycle, and diagnostic settings before scaling usage.',
    exampleTitle: 'Storage account review',
    exampleCode: `Storage account decisions
-> public or private access?
-> hot or cool pattern?
-> which replication model?
-> which workloads share the account?`,
    relatedTopics: ['azure-blob-storage', 'azure-storage-replication', 'azure-private-endpoints'],
  },
  {
    slug: 'azure-storage-replication',
    title: 'Storage Replication',
    description: 'Understand Azure storage redundancy and how local, zonal, and geo replication choices affect recovery and cost.',
    concept: 'Azure storage replication options such as LRS, ZRS, GRS, and GZRS determine how data is copied across facilities or regions for durability and recovery.',
    why: 'Replication decisions affect not just durability, but also cost, recovery posture, and whether failover assumptions match the real business requirement.',
    usage: 'This matters in backups, file storage, media platforms, compliance data retention, regional DR planning, and architecture reviews.',
    workflow: 'Choose replication from recovery target, region support, workload criticality, and cost tolerance, then validate how reads and failover actually behave in the selected model.',
    exampleTitle: 'Redundancy selection lens',
    exampleCode: `Storage redundancy review
-> local only?
-> zonal resilience needed?
-> geo replication required?
-> what is the recovery expectation?`,
    relatedTopics: ['azure-storage-accounts', 'azure-disaster-recovery', 'azure-cost-governance'],
  },
  {
    slug: 'azure-sql-database',
    title: 'Azure SQL Database',
    description: 'Learn how Azure SQL Database provides managed relational storage and how service tiers, failover, and workload fit influence the decision.',
    concept: 'Azure SQL Database is a managed relational database service that reduces infrastructure ownership while still requiring teams to understand performance tiers, networking, backup, and access patterns.',
    why: 'Relational data choices are a major architecture decision, and teams need to reason about service tier, scaling, HA, and security rather than assuming managed means effortless.',
    usage: 'This appears in transactional applications, reporting, SaaS platforms, API backends, and modernization projects moving away from self-managed SQL Server.',
    workflow: 'Choose the deployment and tier model from workload shape, connect networking and identity safely, and design backup, failover, and query monitoring as part of the service baseline.',
    exampleTitle: 'Managed SQL decision',
    exampleCode: `Azure SQL review
-> workload size and pattern
-> service tier
-> private connectivity
-> HA and backup expectations`,
    relatedTopics: ['azure-high-availability', 'azure-private-endpoints', 'azure-performance-troubleshooting'],
  },
  {
    slug: 'azure-cosmos-db',
    title: 'Azure Cosmos DB',
    description: 'Understand Cosmos DB for globally distributed, low-latency NoSQL workloads and how partitioning and consistency shape architecture.',
    concept: 'Cosmos DB is Azure’s managed globally distributed NoSQL database platform with configurable consistency, partitioning, and multi-region capabilities.',
    why: 'Cosmos DB delivers scale and global reach, but only when teams understand partition-key design, request-unit cost, and consistency trade-offs clearly.',
    usage: 'This matters in globally distributed apps, event-heavy systems, user-profile workloads, low-latency APIs, and modern cloud-native platforms.',
    workflow: 'Model the dominant access pattern first, choose the partition key carefully, align consistency with business needs, and monitor RU consumption before assuming the design will stay efficient.',
    exampleTitle: 'Partition strategy questions',
    exampleCode: `Cosmos DB design asks
-> what is the partition key?
-> what consistency is required?
-> where will RU cost spike?
-> is multi-region actually needed?`,
    relatedTopics: ['azure-regions', 'azure-cost-governance', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-cache-for-redis',
    title: 'Azure Cache for Redis',
    description: 'Learn how managed Redis is used in Azure for caching, session state, and performance protection under load.',
    concept: 'Azure Cache for Redis is a managed in-memory data service used for low-latency caching, session storage, coordination patterns, and reducing pressure on slower dependencies.',
    why: 'Caching improves performance but introduces freshness, eviction, failover, and hot-key risks that teams still need to design for.',
    usage: 'This appears in read-heavy APIs, session-driven apps, rate limiting, expensive response caching, and multi-service performance tuning.',
    workflow: 'Decide what may be cached, how TTL and invalidation work, how the app behaves on cache miss or outage, and which metrics prove the cache is actually helping.',
    exampleTitle: 'Cache behavior review',
    exampleCode: `Cache design asks
-> what is safe to cache?
-> how long is it fresh?
-> who invalidates it?
-> what happens if Redis is slow or unavailable?`,
    relatedTopics: ['azure-performance-troubleshooting', 'azure-operational-excellence', 'azure-sql-database'],
  },
  {
    slug: 'azure-vnet-peering',
    title: 'VNet Peering',
    description: 'Understand VNet peering for private connectivity between Azure virtual networks without forcing traffic through the public internet.',
    concept: 'VNet peering connects Azure VNets privately so workloads can communicate with low latency while still preserving separate network boundaries.',
    why: 'As Azure estates grow, teams need scalable private connectivity between hubs, spokes, shared services, and workload networks.',
    usage: 'This matters in hub-and-spoke networking, shared platform services, environment segmentation, and multi-team Azure architecture.',
    workflow: 'Peer networks deliberately, understand route flow and transitive limitations, and review whether centralized inspection, DNS, and private endpoints still work as intended.',
    exampleTitle: 'Hub-and-spoke connectivity',
    exampleCode: `Hub network
-> shared services
-> firewall and DNS
Spoke networks
-> application workloads
-> peered privately to hub`,
    relatedTopics: ['azure-vnet', 'azure-private-endpoints', 'azure-azure-firewall'],
  },
  {
    slug: 'azure-private-endpoints',
    title: 'Private Endpoints',
    description: 'Learn how private endpoints expose Azure PaaS services through private IP addresses inside your virtual network.',
    concept: 'Private endpoints map Azure platform services such as Storage, SQL, Key Vault, and others into a VNet through private IP access rather than public service endpoints.',
    why: 'They are key to zero-trust and regulated architectures where PaaS services must not be broadly reachable over public networking.',
    usage: 'This appears in private data platforms, secure integration, finance and healthcare workloads, and enterprise network-standardization programs.',
    workflow: 'Enable private endpoints for the right services, align DNS resolution correctly, verify NSG and routing behavior, and remove unnecessary public access to make the network boundary real.',
    exampleTitle: 'Private access baseline',
    exampleCode: `Private endpoint design
-> private IP inside VNet
-> DNS resolves to private address
-> public endpoint restricted
-> app routing validated`,
    relatedTopics: ['azure-private-dns', 'azure-key-vault', 'azure-storage-accounts'],
  },
  {
    slug: 'azure-private-dns',
    title: 'Private DNS',
    description: 'Understand private DNS zones and how they make private Azure service connectivity actually work at runtime.',
    concept: 'Private DNS zones provide internal name resolution for private endpoints, VNet-connected services, and hybrid network designs so applications reach private resources correctly.',
    why: 'Private networking designs often fail because DNS behavior is assumed rather than engineered, especially when private endpoints and hybrid environments are involved.',
    usage: 'This matters in Key Vault, Storage, SQL, private endpoint adoption, hybrid cloud, and shared platform DNS architecture.',
    workflow: 'Link zones to the right VNets, understand override behavior, test name resolution from real workloads, and keep DNS ownership clear across platform and product teams.',
    exampleTitle: 'Private name-resolution check',
    exampleCode: `DNS review
-> what name should the app resolve?
-> which zone owns it?
-> which VNets are linked?
-> does hybrid DNS still resolve correctly?`,
    relatedTopics: ['azure-private-endpoints', 'azure-vnet-peering', 'azure-incident-response'],
  },
  {
    slug: 'azure-azure-firewall',
    title: 'Azure Firewall',
    description: 'Learn how Azure Firewall centralizes network filtering, outbound control, and inspection in governed cloud estates.',
    concept: 'Azure Firewall is a managed network security service used to control and inspect traffic across Azure virtual networks with centralized policy.',
    why: 'Centralized outbound and cross-network control is important in larger Azure estates where ad hoc NSG rules do not provide sufficient governance or visibility.',
    usage: 'This appears in hub-and-spoke networks, regulated environments, egress restriction, platform landing zones, and enterprise traffic-inspection patterns.',
    workflow: 'Use Azure Firewall where centralized policy and inspection are justified, align routing and DNS with the design, and monitor rule usage so complexity stays supportable.',
    exampleTitle: 'Network inspection pattern',
    exampleCode: `Hub network
-> Azure Firewall
-> shared DNS and logging
Spokes
-> route controlled traffic through hub for inspection`,
    relatedTopics: ['azure-vnet-peering', 'azure-network-security-groups', 'azure-security-operations'],
  },
  {
    slug: 'azure-front-door',
    title: 'Azure Front Door',
    description: 'Understand Azure Front Door for global entry, acceleration, failover, and edge security in internet-facing workloads.',
    concept: 'Azure Front Door is a global edge service for HTTP and HTTPS workloads that provides routing, acceleration, TLS, WAF integration, and failover across regions or backends.',
    why: 'Global user experience and multi-region routing depend on the front-door layer as much as the app itself, especially when failover and edge security matter.',
    usage: 'This appears in global web apps, multi-region architectures, edge-cached frontends, WAF standardization, and latency-sensitive customer platforms.',
    workflow: 'Choose Front Door when global entry, edge routing, or multi-region failover are important, and validate health probes, routing rules, and origin protection together.',
    exampleTitle: 'Global entry pattern',
    exampleCode: `Users
-> Azure Front Door
-> WAF and routing rules
-> regional app backends
-> failover based on origin health`,
    relatedTopics: ['azure-regions', 'azure-high-availability', 'azure-application-gateway'],
  },
  {
    slug: 'azure-service-bus',
    title: 'Azure Service Bus',
    description: 'Learn how Azure Service Bus supports reliable messaging, decoupled systems, and enterprise integration patterns.',
    concept: 'Azure Service Bus is a managed messaging service for queues and topics that supports durable asynchronous communication between producers and consumers.',
    why: 'Messaging changes reliability, load smoothing, failure handling, and service coupling, making it a common architecture and support topic.',
    usage: 'This matters in microservices, order processing, integration workflows, background jobs, and event-driven cloud systems.',
    workflow: 'Choose the messaging pattern from delivery guarantees and consumer independence, size retry and dead-letter handling carefully, and monitor backlog and failure signals continuously.',
    exampleTitle: 'Reliable messaging checklist',
    exampleCode: `Service Bus design asks
-> queue or topic?
-> what happens on poison messages?
-> how is backlog monitored?
-> what retry policy is safe?`,
    relatedTopics: ['azure-event-grid', 'azure-functions', 'azure-incident-response'],
  },
  {
    slug: 'azure-event-grid',
    title: 'Azure Event Grid',
    description: 'Understand Event Grid for event routing and loosely coupled Azure integrations.',
    concept: 'Azure Event Grid distributes events from Azure services or custom publishers to subscribed handlers such as Functions, Logic Apps, webhooks, or other endpoints.',
    why: 'Event-driven architecture requires clear thinking about event ownership, routing, retry behavior, and consumer independence.',
    usage: 'This appears in storage-event automation, integration platforms, serverless architectures, and cloud-native event propagation.',
    workflow: 'Use Event Grid for lightweight event routing, keep subscriber contracts stable, and verify dead-letter or retry behavior where delivery failures would matter to the business.',
    exampleTitle: 'Event fanout model',
    exampleCode: `Producer or Azure service
-> Event Grid topic
-> multiple subscribers
-> each consumer owns its own handling and recovery`,
    relatedTopics: ['azure-service-bus', 'azure-functions', 'azure-operational-excellence'],
  },
  {
    slug: 'azure-monitor',
    title: 'Azure Monitor',
    description: 'Learn how Azure Monitor provides metrics, alerts, dashboards, and service health visibility across workloads.',
    concept: 'Azure Monitor is the primary observability platform for metrics, alerts, activity signals, and operational views across Azure resources and applications.',
    why: 'Monitoring is one of the first places weak cloud operating models show up because teams often deploy services without meaningful signals or ownership.',
    usage: 'This matters in dashboards, alerting, capacity planning, release validation, incident response, and platform operations.',
    workflow: 'Define the user-impacting signals first, map them to meaningful alerts, and make ownership of each critical metric explicit so the team can act under pressure.',
    exampleTitle: 'Signal design rule',
    exampleCode: `Good monitoring answers
-> is the user impacted?
-> which dependency is failing?
-> who owns the alert?
-> what action follows?`,
    relatedTopics: ['azure-log-analytics', 'azure-application-insights', 'azure-incident-response'],
  },
  {
    slug: 'azure-log-analytics',
    title: 'Log Analytics',
    description: 'Understand Log Analytics as the query and retention layer for Azure operational logs and cross-resource investigation.',
    concept: 'Log Analytics stores and queries operational logs from Azure resources, applications, and agents so teams can investigate incidents and build correlation across systems.',
    why: 'Metrics alone rarely explain root cause. Log Analytics becomes the evidence layer during failure, security, and performance investigation.',
    usage: 'This appears in centralized logging, KQL-based investigation, compliance retention, platform operations, and cross-service incident analysis.',
    workflow: 'Ingest the right logs, retain what supports supportability and audit needs, and create saved queries and workbooks for recurring operational questions.',
    exampleTitle: 'Incident evidence workflow',
    exampleCode: `Log workflow
-> centralize useful logs
-> query by time, resource, correlation id
-> correlate with alerts and deployment events`,
    relatedTopics: ['azure-monitor', 'azure-application-insights', 'azure-security-operations'],
  },
  {
    slug: 'azure-application-insights',
    title: 'Application Insights',
    description: 'Learn how Application Insights captures request, dependency, exception, and distributed tracing signals for Azure applications.',
    concept: 'Application Insights provides application performance monitoring for request flows, dependency calls, failures, distributed traces, and release-impact analysis.',
    why: 'App-level telemetry is essential once incidents require more than infrastructure metrics to explain latency or failure.',
    usage: 'This matters in App Service, Functions, AKS workloads, APIs, user-facing services, and production troubleshooting.',
    workflow: 'Instrument the application, capture the dependency chain, correlate telemetry with deployments and infrastructure signals, and use the data to isolate the dominant cause of latency or failure.',
    exampleTitle: 'Trace-based debugging',
    exampleCode: `Application Insights should answer
-> where did the request slow down?
-> which dependency failed?
-> did the latest release change the pattern?`,
    relatedTopics: ['azure-monitor', 'azure-log-analytics', 'azure-performance-troubleshooting'],
  },
  {
    slug: 'azure-bicep',
    title: 'Bicep',
    description: 'Understand Bicep as Azure-native infrastructure as code and how it supports repeatable, reviewable cloud delivery.',
    concept: 'Bicep is the Azure-native domain-specific language that compiles to ARM templates and helps teams define cloud infrastructure declaratively in readable source code.',
    why: 'IaC is a core Azure delivery skill because manual portal work creates drift, weak reviewability, and fragile environment setup.',
    usage: 'This appears in landing zones, app environment creation, networking, monitoring setup, policy-aware infrastructure, and platform template libraries.',
    workflow: 'Model infrastructure declaratively, parameterize environment differences carefully, review deployments through pull requests and pipeline checks, and keep modules understandable instead of over-abstracted.',
    exampleTitle: 'IaC discipline',
    exampleCode: `Bicep workflow
-> reusable modules
-> clear parameters
-> reviewed changes
-> pipeline deployment
-> post-deploy verification`,
    relatedTopics: ['azure-infrastructure-as-code', 'azure-cicd', 'azure-policy'],
  },
  {
    slug: 'azure-incident-response',
    title: 'Incident Response',
    description: 'Learn how Azure incidents are scoped, contained, and investigated with service-specific evidence and blast-radius awareness.',
    concept: 'Azure incident response is the operational process of scoping impact, stabilizing the workload, preserving evidence, and deciding on rollback, failover, or narrow mitigation.',
    why: 'Cloud incidents can spread through identity, networking, data, deployment, or cost controls, so good response depends on knowing where to look first.',
    usage: 'This matters in release regressions, platform-service degradation, public exposure events, regional issues, and operational escalations.',
    workflow: 'Start with user impact and blast radius, preserve Azure Monitor, activity log, resource-change, and deployment evidence, then choose the smallest reversible action that restores service without destroying the root-cause trail.',
    exampleTitle: 'Incident response order',
    exampleCode: `1. Scope impact
2. Preserve evidence
3. Contain blast radius
4. Restore service
5. Prove root cause
6. Add prevention`,
    relatedTopics: ['azure-monitor', 'azure-log-analytics', 'azure-operational-excellence'],
  },
  {
    slug: 'azure-performance-troubleshooting',
    title: 'Performance Troubleshooting',
    description: 'Understand how to troubleshoot Azure latency and throughput issues across app, network, storage, and managed services.',
    concept: 'Performance troubleshooting on Azure means decomposing latency across clients, edge routing, compute, network, storage, caches, databases, and service limits instead of guessing from one graph.',
    why: 'Cloud performance issues often cross multiple managed boundaries, so disciplined evidence collection is what separates useful diagnosis from random tuning.',
    usage: 'This matters in slow APIs, App Service issues, Function bottlenecks, storage latency, data hotspots, and multi-service customer journeys.',
    workflow: 'Break the path into layers, use the right telemetry for each boundary, correlate recent changes, and validate the fix with representative workload instead of only local tests.',
    exampleTitle: 'Latency decomposition path',
    exampleCode: `Azure latency review
-> edge or gateway
-> app or function
-> cache or queue
-> database or storage
-> network or quota constraint`,
    relatedTopics: ['azure-application-insights', 'azure-monitor', 'azure-cache-for-redis'],
  },
  {
    slug: 'azure-security-operations',
    title: 'Security Operations',
    description: 'Learn how Azure security operations combine identity, logging, policy, and response readiness into an operating model.',
    concept: 'Azure security operations are the day-to-day practices around protecting identities, monitoring access and configuration changes, handling alerts, and proving cloud controls remain effective.',
    why: 'Security posture is not created by one control. It is created by disciplined operations across identity, network, secrets, logging, policy, and response.',
    usage: 'This appears in regulated environments, platform teams, SOC workflows, cloud hardening programs, and incident-prevention reviews.',
    workflow: 'Build defense in depth, centralize useful evidence, restrict default access, apply policy guardrails, and rehearse response so teams are ready before a security event happens.',
    exampleTitle: 'Security baseline',
    exampleCode: `Security operations baseline
-> least privilege RBAC
-> policy and compliance checks
-> centralized logs
-> key and secret governance
-> incident readiness`,
    relatedTopics: ['azure-policy', 'azure-key-vault', 'azure-incident-response'],
  },
  {
    slug: 'azure-cost-governance',
    title: 'Cost Governance',
    description: 'Understand how Azure cost governance combines budgets, tags, architecture review, and anomaly investigation.',
    concept: 'Cost governance is the ongoing practice of keeping Azure spend aligned with business value through ownership, tagging, budgets, policy, rightsizing, and architecture-aware review.',
    why: 'Cloud cost issues are usually governance or architecture issues first, not only billing-report problems.',
    usage: 'This matters in shared subscriptions, App Service plans, storage growth, data transfer, always-on environments, and enterprise cloud optimization.',
    workflow: 'Start with tagging and ownership, set budgets and anomaly alerts, review the highest-spend services, and fix the architectural or lifecycle cause rather than only deleting obvious waste.',
    exampleTitle: 'Cost review checklist',
    exampleCode: `Monthly cost review
-> top subscriptions and services
-> untagged resources
-> idle capacity
-> storage growth
-> networking and transfer cost
-> budget variance`,
    relatedTopics: ['azure-cost-optimization', 'azure-app-service-plans', 'azure-storage-replication'],
  },
  {
    slug: 'azure-operational-excellence',
    title: 'Operational Excellence',
    description: 'Learn how Azure operational excellence is built through alarms, runbooks, game days, change discipline, and automation.',
    concept: 'Operational excellence is the practice of making Azure workloads observable, supportable, repeatable, and resilient under real operational pressure.',
    why: 'Many Azure failures are not service failures first; they are operating-model failures where detection, ownership, or response is too weak.',
    usage: 'This appears in platform standards, on-call readiness, Well-Architected reviews, release governance, and incident-prevention programs.',
    workflow: 'Define the service signals that matter, document response paths, automate repetitive recovery where safe, and rehearse failure rather than assuming the team will improvise well during an outage.',
    exampleTitle: 'Operations maturity checklist',
    exampleCode: `Operational excellence means
-> alerts with clear owners
-> runbooks and game days
-> automated safe recovery
-> reviewed changes
-> post-incident learning`,
    relatedTopics: ['azure-incident-response', 'azure-monitor', 'azure-cicd'],
  },
];

export const azureExpandedTopics: Record<string, TopicContent> = Object.fromEntries(
  specs.map((spec) => [spec.slug, topic(spec)])
);
