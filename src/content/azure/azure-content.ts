import type { FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const defaultVersions = ['Microsoft Azure', 'Azure Portal', 'Azure CLI', 'ARM and Bicep'];

interface AzureTopicSpec {
  slug: string;
  title: string;
  description: string;
  concept: string;
  why: string;
  usage: string;
  workflow: string;
  exampleTitle: string;
  exampleCode: string;
  productionIssues: string[];
  bestPractices: string[];
  relatedTopics: string[];
  faqs?: FAQ[];
}

function topic(spec: AzureTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: defaultVersions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} matters in Azure because it affects landing-zone decisions, production operations, security ownership, and how teams deploy or troubleshoot cloud workloads at enterprise scale.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why teams ask about this in interviews:**
- Azure engineers are expected to explain the service boundary, not just the definition
- Interviewers want to hear how the service behaves during deployment, failure, cost review, and access control
- Senior candidates must connect the topic to platform governance, production support, and architecture trade-offs`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Azure-oriented example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} only a portal concept?`,
        answer: `No. ${spec.title} must be understood through automation, RBAC, operational ownership, and how it behaves in live Azure environments rather than only through the portal UI.`,
      },
      {
        question: `What makes a weak answer for ${spec.title}?`,
        answer: `A weak answer defines ${spec.title} without explaining security boundaries, production trade-offs, observability, failure handling, and how teams actually use it in subscriptions and environments.`,
      },
      {
        question: `How should senior engineers discuss ${spec.title}?`,
        answer: `Senior engineers should connect ${spec.title} to enterprise standards, delivery workflows, troubleshooting evidence, and the Azure services or controls it influences around it.`,
      },
    ],
    productionIssues: spec.productionIssues,
    bestPractices: spec.bestPractices,
    architectNote: `In Azure, ${spec.title} should be governed as part of the wider platform model. The architect-level conversation is about ownership, blast radius, policy, cost, security, and how this decision stays repeatable across environments.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Azure project?`,
        answer: `Explain ${spec.title} through the workload it supports, the Azure boundary it lives in, the operational controls around it, and what can go wrong in production if it is configured poorly.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The common production concern is misalignment between service configuration and the wider Azure platform design: identity, network access, deployment automation, monitoring, or cost ownership.`,
      },
      ...(spec.faqs ?? []),
    ],
    keyTakeaways: [
      `${spec.title} is not just a definition question. It is a production-behavior question.`,
      'Strong Azure answers connect the service to identity, network, automation, and monitoring.',
      'Enterprise Azure teams expect repeatable configuration through IaC and policy.',
      'Production readiness means thinking about failure, cost, and ownership before release.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const azureTopicSpecs: AzureTopicSpec[] = [
  {
    slug: 'azure-basics',
    title: 'Azure Basics',
    description: 'Understand the core Azure operating model: tenants, subscriptions, resource providers, regions, and how teams organize cloud work on Microsoft Azure.',
    concept: `Azure is Microsoft's cloud platform for compute, storage, networking, identity, security, analytics, and application delivery. The important baseline concepts are tenant, subscription, resource group, region, resource provider, and service plan.

For engineering teams, Azure basics are not trivia. They define who owns the environment, where resources live, what can be billed together, and how guardrails are applied.`,
    why: `Azure basics help engineers avoid configuration sprawl and poor cloud decisions. Without a strong baseline, teams confuse tenant versus subscription ownership, deploy into the wrong region, or apply security and billing controls inconsistently.`,
    usage: `In a real enterprise setup, platform teams create management groups and subscriptions per environment or business unit, then product teams deploy resources into approved resource groups inside those subscriptions with policy, tags, RBAC, and budget controls already attached.`,
    workflow: `An Azure workload usually starts with identity and tenant access, then subscription selection, region choice, resource group design, and service provisioning through ARM, Bicep, Terraform, or Azure DevOps pipelines.`,
    exampleTitle: 'Azure baseline map',
    exampleCode: `Tenant
  -> Management Group
    -> Subscription
      -> Resource Group
        -> App Service / VM / Storage / Key Vault
      -> RBAC / Policy / Budget / Monitoring`,
    productionIssues: [
      'Teams deploy into the wrong subscription and later discover broken access control, missing budgets, or compliance gaps.',
      'Engineers treat regions as a default choice instead of validating latency, residency, and service availability.',
      'Resources are created ad hoc without tags, ownership, or automation, which makes support and cost reviews painful.',
    ],
    bestPractices: [
      'Define management-group and subscription strategy before product teams start provisioning resources.',
      'Document approved regions, naming standards, tagging, and resource-provider usage.',
      'Use IaC and policy from the start instead of relying on manual portal setup.',
      'Teach every team the difference between tenant, subscription, and resource group ownership.',
    ],
    relatedTopics: ['azure-architecture', 'azure-resource-groups', 'azure-subscription-management'],
  },
  {
    slug: 'azure-architecture',
    title: 'Azure Architecture',
    description: 'Learn how Azure workloads are structured across subscriptions, regions, networks, identity, platform services, and operational controls.',
    concept: `Azure architecture is the way services and controls are combined into a working cloud platform. It includes identity through Microsoft Entra ID, subscription boundaries, VNets, compute services, data stores, observability, and disaster-recovery decisions.

Architecturally, Azure is about platform composition. A service choice only makes sense when you know the workload pattern, security boundary, and operating model around it.`,
    why: `Teams need Azure architecture thinking to choose the right service model, prevent single points of failure, and keep cost, security, and release workflows manageable as the platform grows.`,
    usage: `A common enterprise architecture uses hub-and-spoke networking, separate subscriptions for shared platform and application teams, Key Vault for secrets, App Service or AKS for workloads, storage accounts for files and diagnostics, and Azure Monitor plus Log Analytics for operational visibility.`,
    workflow: `Architects usually start with workload quality attributes: availability, security, compliance, scale, deployment frequency, and recovery targets. From there they choose network topology, identity model, compute platform, storage pattern, observability, and delivery approach.`,
    exampleTitle: 'Reference Azure application architecture',
    exampleCode: `Users
  -> Front Door / Application Gateway
  -> App Service or AKS
  -> Managed Identity
  -> Key Vault
  -> Storage / SQL / Cosmos DB
  -> Azure Monitor + Log Analytics
  -> Backup / DR controls`,
    productionIssues: [
      'Teams pick services individually without a workload architecture, leading to fragmented security and support patterns.',
      'Availability targets are documented but not reflected in region, zone, backup, or failover design.',
      'Architecture diagrams ignore operational tooling, so incident response becomes guesswork.',
    ],
    bestPractices: [
      'Model Azure architectures around quality attributes, not vendor feature lists.',
      'Choose platform services with clear ownership for identity, network, secrets, and observability.',
      'Review architecture decisions using production scenarios and recovery drills.',
      'Keep the operating model visible in diagrams, runbooks, and IaC repositories.',
    ],
    relatedTopics: ['azure-basics', 'azure-high-availability', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-resource-groups',
    title: 'Resource Groups',
    description: 'Understand resource groups as Azure deployment, lifecycle, tagging, and access-control boundaries.',
    concept: `A resource group is a logical container for Azure resources. It is commonly used to manage lifecycle, permissions, tags, policy evaluation, and deployment grouping for related infrastructure.

Resource groups are not only folders. They become the boundary where many teams think about ownership and change.`,
    why: `When resource groups are designed poorly, teams mix unrelated workloads, apply permissions inconsistently, and make cleanup or cost analysis difficult. Good resource-group design supports automation and operational clarity.`,
    usage: `Product teams often have separate resource groups for app runtime, shared data services, and environment-specific resources such as dev, stage, and prod. Platform teams use tags and RBAC at the resource-group level to simplify governance.`,
    workflow: `Resources in a group can be deployed together through ARM, Bicep, or Terraform. RBAC, tags, locks, and Azure Policy effects often cascade from the group boundary, so engineers treat it as a managed unit for delivery and support.`,
    exampleTitle: 'Environment-focused resource groups',
    exampleCode: `rg-orders-dev-app
rg-orders-dev-data
rg-orders-stage-app
rg-orders-stage-data
rg-orders-prod-app
rg-orders-prod-data`,
    productionIssues: [
      'One resource group contains many unrelated services, making least-privilege access and incident ownership confusing.',
      'Deletion or cleanup risks increase because lifecycle boundaries were never separated.',
      'Tagging and budget reporting become noisy when shared and product-specific resources are mixed.',
    ],
    bestPractices: [
      'Use resource groups to reflect lifecycle and ownership, not only project names.',
      'Separate production and non-production resource groups clearly.',
      'Apply naming, tags, and RBAC standards consistently across groups.',
      'Keep deployments repeatable so resource-group contents can be recreated safely.',
    ],
    relatedTopics: ['azure-basics', 'azure-subscription-management', 'azure-rbac'],
  },
  {
    slug: 'azure-subscription-management',
    title: 'Subscription Management',
    description: 'Learn how Azure subscriptions define billing, quotas, governance, and workload isolation for engineering teams.',
    concept: `An Azure subscription is a billing and governance boundary. It controls quotas, available services, RBAC scope, policy assignment, and resource ownership at a high level.

Subscription strategy is a major enterprise decision because it affects cost management, security isolation, and platform support.`,
    why: `Subscription management matters because many real Azure problems are not service bugs. They are design issues caused by poor isolation, unclear billing ownership, or environments sharing one subscription without guardrails.`,
    usage: `Enterprises often separate subscriptions by environment, application portfolio, or business unit. Shared services, identity-heavy integrations, and sandbox experimentation usually get their own subscription strategy instead of living inside production boundaries.`,
    workflow: `Subscription operations usually involve access assignment, resource-provider registration, budget controls, policy inheritance, quota review, and environment lifecycle management. Platform teams often combine these with management groups and landing-zone automation.`,
    exampleTitle: 'Common subscription model',
    exampleCode: `Management Group
  -> Platform Subscription
  -> Shared Services Subscription
  -> Orders-Dev Subscription
  -> Orders-Prod Subscription
  -> Sandbox Subscription`,
    productionIssues: [
      'Dev and prod share one subscription, causing weak segregation and accidental access creep.',
      'Teams hit quotas during launches because subscription limits were never reviewed.',
      'Budget accountability is poor because multiple products share one billing boundary.',
    ],
    bestPractices: [
      'Design subscriptions around governance, billing, and blast radius.',
      'Use separate subscriptions for production and non-production wherever possible.',
      'Track quotas, provider registration, and policy assignments as part of platform operations.',
      'Automate subscription setup in landing-zone workflows instead of handling it manually each time.',
    ],
    relatedTopics: ['azure-basics', 'azure-resource-groups', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-virtual-machines',
    title: 'Virtual Machines',
    description: 'Understand Azure Virtual Machines for compute control, OS ownership, lift-and-shift workloads, and production operations.',
    concept: `Azure Virtual Machines provide infrastructure-level compute where teams control the guest operating system, runtime packages, startup behavior, and patching strategy.

VMs are useful when teams need OS-level control, legacy workload compatibility, or software that does not fit a pure PaaS model.`,
    why: `Azure engineers must understand VMs because many enterprises still run critical workloads, support tools, integration services, or vendor products on VM-based platforms.`,
    usage: `Real projects use Azure VMs for custom middleware, legacy applications, jump hosts, self-managed agents, and workloads that require filesystem, process, or runtime control beyond App Service or Functions.`,
    workflow: `VM design in Azure involves image selection, size choice, disks, VNets, NSGs, backup, identity access, monitoring agents, and patching or scaling decisions. Availability sets, zones, or scale sets are often added for resilient workloads.`,
    exampleTitle: 'VM design checklist',
    exampleCode: `OS image
  -> VM size
  -> Managed disks
  -> VNet + subnet
  -> NSG + Bastion / jump access
  -> Backup + patching
  -> Monitor + alerts`,
    productionIssues: [
      'VMs are provisioned without patching, monitoring, or backup, creating support and audit risk.',
      'Teams oversize VMs and leave them running 24x7 without cost review.',
      'Access paths are weak because engineers expose management ports instead of using safer admin patterns.',
    ],
    bestPractices: [
      'Use VMs only when workload requirements justify infrastructure-level control.',
      'Standardize images, patching, backup, and monitoring from day one.',
      'Use Managed Identity, Bastion, and least-privilege access for administration.',
      'Review VM size and uptime regularly for cost and performance alignment.',
    ],
    relatedTopics: ['azure-app-service', 'azure-high-availability', 'azure-cost-optimization'],
  },
  {
    slug: 'azure-app-service',
    title: 'App Service',
    description: 'Learn Azure App Service as a managed web-app platform for APIs, websites, deployment slots, and runtime operations.',
    concept: `Azure App Service is a managed platform for hosting web applications, APIs, and background processes without managing virtual machines directly.

It abstracts OS maintenance and a large part of runtime management, letting engineers focus on code, configuration, deployment slots, scaling, and observability.`,
    why: `App Service is a common Azure choice because it reduces platform burden while still supporting enterprise deployment controls, networking integration, identity, diagnostics, and zero-downtime release patterns.`,
    usage: `Teams use App Service for internal portals, business APIs, frontend apps, and integration services where PaaS simplicity is more valuable than container-or-VM-level control. Deployment slots are often used for staged rollouts and safer release swaps.`,
    workflow: `A typical App Service setup includes an App Service Plan, the application, configuration and secrets, deployment slots, private access or VNet integration, and Azure Monitor or Application Insights for telemetry.`,
    exampleTitle: 'App Service deployment flow',
    exampleCode: `Code push
  -> Build pipeline
  -> Deploy to staging slot
  -> Smoke test
  -> Slot swap to production
  -> Monitor requests, failures, and latency`,
    productionIssues: [
      'Teams skip slot validation and release directly to production, increasing rollback risk.',
      'Configuration drift appears between slots or environments when settings are managed manually.',
      'Networking assumptions break because VNet integration, private endpoints, or outbound dependencies were not planned.',
    ],
    bestPractices: [
      'Use deployment slots for safer releases and rapid rollback.',
      'Manage app settings and secrets through secure platform workflows, not manual edits.',
      'Instrument App Service with request, dependency, and exception monitoring.',
      'Validate networking and identity behavior before moving sensitive workloads to production.',
    ],
    relatedTopics: ['azure-functions', 'azure-cicd', 'azure-key-vault'],
  },
  {
    slug: 'azure-functions',
    title: 'Functions',
    description: 'Understand Azure Functions for event-driven compute, serverless integration workflows, and burst scaling.',
    concept: `Azure Functions is Azure's serverless compute service for running code in response to events such as HTTP calls, queue messages, timers, or storage changes.

It is useful when teams need event-driven automation, lightweight APIs, and background processing without managing always-on servers.`,
    why: `Functions matter because many Azure workloads use them for integration glue, async processing, automation, and scheduled platform tasks. Interviewers expect candidates to know triggers, scaling, cold starts, and operational boundaries.`,
    usage: `In real projects, Functions process queue messages, transform files uploaded to Blob Storage, run scheduled cleanup jobs, or expose lightweight endpoints for integration workflows. They are often combined with Storage, Service Bus, Event Grid, or Key Vault.`,
    workflow: `An Azure Function app binds to a trigger, runs code, and often writes results to another service. Scaling and cost depend on the hosting plan, execution duration, concurrency, dependencies, and event backlog behavior.`,
    exampleTitle: 'Queue-driven Function flow',
    exampleCode: `Message arrives in queue
  -> Function trigger executes
  -> Validate payload
  -> Call downstream API / storage
  -> Log correlation ID and outcome
  -> Retry or dead-letter on failure`,
    productionIssues: [
      'Queue-triggered Functions retry endlessly because poison-message handling was never designed.',
      'Cold starts and dependency-heavy initialization cause latency spikes for user-facing endpoints.',
      'Teams underestimate identity, configuration, and secret-management needs because the platform feels lightweight.',
    ],
    bestPractices: [
      'Design Functions for idempotency, retries, and failure visibility.',
      'Choose hosting plans with cold-start and concurrency behavior that matches the workload.',
      'Keep startup logic lean and external dependencies observable.',
      'Connect Functions to Key Vault, Application Insights, and queue monitoring from the start.',
    ],
    relatedTopics: ['azure-app-service', 'azure-queues', 'azure-cicd'],
  },
  {
    slug: 'azure-container-apps',
    title: 'Container Apps',
    description: 'Learn Azure Container Apps for managed containerized workloads, revision-based releases, and event-driven scaling.',
    concept: `Azure Container Apps is a managed service for running containers without operating Kubernetes directly. It supports revisions, autoscaling, ingress, secrets, Dapr integration, and event-driven scaling through KEDA-style patterns.`,
    why: `Container Apps matter when teams want container packaging and modern delivery patterns without taking on full AKS control-plane and cluster-management overhead.`,
    usage: `Teams use Container Apps for APIs, background workers, event-driven services, and internal business tools where container portability is useful but a full cluster platform would be operationally heavy.`,
    workflow: `A container image is deployed from a registry, configuration and secrets are attached, ingress and scaling rules are defined, and revisions allow controlled rollout or rollback of newer versions.`,
    exampleTitle: 'Container Apps release path',
    exampleCode: `Build image
  -> Push to ACR
  -> Deploy Container App revision
  -> Route traffic gradually
  -> Observe logs, scale rules, and failures
  -> Promote or roll back revision`,
    productionIssues: [
      'Teams move to containers but still treat configuration and secrets as manual runtime tasks.',
      'Autoscaling rules are untested, so event spikes create slow recovery or excess cost.',
      'Revision strategy is unclear, making rollback slower during incidents.',
    ],
    bestPractices: [
      'Use ACR, secure secret injection, and immutable images for every release.',
      'Test ingress, revision rollout, and event-based scaling under realistic traffic.',
      'Track request latency, restart behavior, and dependency failures in monitoring dashboards.',
      'Choose Container Apps when you want container workflows without cluster-level operations.',
    ],
    relatedTopics: ['azure-container-registry', 'azure-kubernetes-service', 'azure-cicd'],
  },
  {
    slug: 'azure-blob-storage',
    title: 'Blob Storage',
    description: 'Understand Azure Blob Storage for object storage, data durability, archival patterns, and application file workflows.',
    concept: `Azure Blob Storage is Azure's object storage service for files, media, backups, logs, exports, and unstructured data. It supports multiple access tiers, lifecycle policies, and integration with analytics or application workloads.`,
    why: `Blob Storage is foundational in Azure because many systems depend on durable object storage for upload flows, reporting, backups, and asynchronous processing.`,
    usage: `A product team may store invoices, exports, application logs, data snapshots, and document uploads in Blob Storage while lifecycle rules move colder data to cheaper tiers over time.`,
    workflow: `Applications write blobs into containers, optionally using SAS tokens, managed identities, or private endpoints. Azure policies, encryption, redundancy choices, and lifecycle management shape how storage behaves in production.`,
    exampleTitle: 'Blob storage usage map',
    exampleCode: `App upload
  -> Blob container
  -> Metadata tags
  -> Lifecycle tiering
  -> Queue / event trigger
  -> Monitoring + retention policy`,
    productionIssues: [
      'Storage accounts are publicly reachable when private access and identity controls were expected.',
      'Teams never define lifecycle rules, so long-term storage cost grows silently.',
      'Application uploads fail under load because retry, timeout, or naming strategy was never reviewed.',
    ],
    bestPractices: [
      'Choose redundancy and access tiers based on recovery and cost needs.',
      'Use private endpoints, RBAC, or managed identity instead of broad shared secrets.',
      'Apply lifecycle policies and retention rules for logs and exports.',
      'Monitor request failures, egress patterns, and storage growth over time.',
    ],
    relatedTopics: ['azure-files', 'azure-queues', 'azure-cost-optimization'],
  },
  {
    slug: 'azure-files',
    title: 'Files',
    description: 'Learn Azure Files for SMB and NFS-based shared file storage in lift-and-shift and hybrid scenarios.',
    concept: `Azure Files provides managed file shares accessible over SMB or NFS. It is often used when applications or migration paths still need shared filesystem semantics rather than object storage APIs.`,
    why: `Azure Files matters because many enterprise workloads still depend on shared folders, legacy file paths, and lift-and-shift patterns that do not map cleanly to object storage.`,
    usage: `Teams use Azure Files for shared application assets, migration of legacy network shares, build artifacts, or hybrid file access where users and services still expect mounted shares.`,
    workflow: `A storage account exposes file shares, access is controlled through network and identity options, and workloads mount the share from Azure VMs, container hosts, or hybrid environments.`,
    exampleTitle: 'Shared files pattern',
    exampleCode: `Azure VM / workload
  -> Mount Azure File Share
  -> Read / write shared documents
  -> Backup and monitoring
  -> Network restrictions + auth`,
    productionIssues: [
      'Performance assumptions are wrong because teams treat file shares like local disks.',
      'Network and mount troubleshooting becomes difficult when hybrid connectivity was not validated.',
      'Access control is weak because shares are mounted with broad shared credentials instead of managed patterns.',
    ],
    bestPractices: [
      'Use Azure Files only when workloads truly need shared filesystem semantics.',
      'Validate throughput, latency, and locking behavior with real application patterns.',
      'Restrict network access and use stronger authentication approaches where possible.',
      'Plan backup and recovery for file shares just as carefully as databases or object storage.',
    ],
    relatedTopics: ['azure-blob-storage', 'azure-virtual-machines', 'azure-disaster-recovery'],
  },
  {
    slug: 'azure-queues',
    title: 'Queues',
    description: 'Understand Azure Queues for asynchronous processing, retry isolation, and workload smoothing in cloud applications.',
    concept: `Azure Queue Storage is a lightweight messaging service for asynchronous communication between producers and consumers. It helps systems absorb spikes, decouple services, and move non-blocking work out of the request path.`,
    why: `Queues are important because many production failures come from coupling user-facing requests directly to slow downstream work. Azure engineers are expected to know retry, poison-message, and visibility-timeout thinking.`,
    usage: `Applications often push work such as email, report generation, file processing, and integration calls into queues, then let Functions or worker services process that work safely in the background.`,
    workflow: `A producer writes a message, a consumer reads it with a visibility timeout, performs work, and deletes the message on success. Failure handling and retries determine whether the system is resilient or noisy under stress.`,
    exampleTitle: 'Async processing pattern',
    exampleCode: `Web request
  -> Validate input
  -> Write queue message
  -> Return quick response
Worker
  -> Read message
  -> Process task
  -> Delete or retry`,
    productionIssues: [
      'Poison messages keep retrying because dead-letter strategy or diagnostics are missing.',
      'Queue depth grows during incidents because scaling and visibility-timeout settings were never tuned.',
      'Teams forget idempotency and create duplicate downstream actions during retry storms.',
    ],
    bestPractices: [
      'Design consumers for idempotency and observable retry behavior.',
      'Monitor queue depth, age, and failure counts as user-impact indicators.',
      'Separate user-response paths from long-running or fragile background work.',
      'Document poison-message handling and replay decisions before production incidents happen.',
    ],
    relatedTopics: ['azure-functions', 'azure-container-apps', 'azure-troubleshooting'],
  },
  {
    slug: 'azure-tables',
    title: 'Tables',
    description: 'Learn Azure Table Storage as a simple NoSQL key-value store for lightweight metadata and operational records.',
    concept: `Azure Table Storage is a schemaless NoSQL store optimized for large volumes of structured but simple entities identified by partition and row keys. It is suitable for metadata, operational records, or low-complexity lookup patterns.`,
    why: `Azure engineers should know Table Storage because it appears in lightweight platform workflows, migration scenarios, and low-cost data-access patterns that do not need a full relational or document database.`,
    usage: `Teams use Table Storage for configuration records, job tracking, lightweight audit data, device metadata, or custom platform registries where access patterns are simple and highly key-driven.`,
    workflow: `Entities are written into tables with partition and row keys. Query design depends on key structure, because cross-partition scans and relational-style joins are not the strength of the service.`,
    exampleTitle: 'Table entity design',
    exampleCode: `PartitionKey: tenant-orders
RowKey: export-2026-06-08-001
Fields:
  status = completed
  requestedBy = ops@company.com
  blobPath = exports/orders-001.csv`,
    productionIssues: [
      'Teams choose Table Storage for flexible querying and later struggle with access-pattern limitations.',
      'Partition keys are chosen poorly, causing hot partitions or inefficient lookups.',
      'Operational metadata becomes critical but is not monitored or backed up with enough discipline.',
    ],
    bestPractices: [
      'Choose Table Storage only for simple access patterns with strong key design.',
      'Design partition keys from real query behavior, not just object naming convenience.',
      'Keep business-critical analytics or complex queries in better-suited data services.',
      'Treat operational metadata stores as part of production reliability, not disposable side data.',
    ],
    relatedTopics: ['azure-blob-storage', 'azure-cost-optimization', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-vnet',
    title: 'VNet',
    description: 'Understand Azure Virtual Networks for address space design, subnet segmentation, private connectivity, and workload isolation.',
    concept: `An Azure Virtual Network is the core network boundary for private communication between Azure resources. It defines address space, subnets, peering, routing paths, and the foundation for secure workload placement.`,
    why: `Networking mistakes in Azure are expensive. Poor VNet design affects reachability, segmentation, private endpoints, hybrid connectivity, and incident recovery across the whole platform.`,
    usage: `Enterprises commonly use hub-and-spoke VNets, private subnets for workloads, dedicated subnets for gateways or firewalls, and private connectivity patterns for databases, storage, and application services.`,
    workflow: `VNet design starts with CIDR planning, subnet boundaries, route behavior, and how services will connect to each other or to on-premises networks. NSGs, UDRs, and private endpoints are then layered in.`,
    exampleTitle: 'Hub and spoke network pattern',
    exampleCode: `Hub VNet
  -> Firewall / VPN / shared ingress
Spoke VNet
  -> App subnet
  -> Data subnet
  -> Private endpoints
Peering
  -> Shared observability and secure routing`,
    productionIssues: [
      'Address-space planning is weak, so peering or hybrid expansion becomes painful later.',
      'Applications unexpectedly traverse public paths because private connectivity was not designed end to end.',
      'Teams debug network failures slowly because route intent and subnet ownership are poorly documented.',
    ],
    bestPractices: [
      'Plan CIDR ranges with growth and peering in mind.',
      'Use subnet boundaries to reflect security and workload roles.',
      'Document private connectivity assumptions for every critical dependency.',
      'Treat network diagrams and route ownership as living operational artifacts.',
    ],
    relatedTopics: ['azure-network-security-groups', 'azure-load-balancer', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-network-security-groups',
    title: 'NSG',
    description: 'Learn Network Security Groups for subnet and NIC-level traffic filtering, least-privilege network access, and Azure troubleshooting.',
    concept: `A Network Security Group filters inbound and outbound traffic using prioritized allow or deny rules. NSGs are often attached to subnets or network interfaces to enforce network-level least privilege.`,
    why: `NSGs matter because many Azure incidents involve overexposed services, blocked dependencies, or unclear traffic paths. Engineers are expected to reason about NSG rules during architecture and support conversations.`,
    usage: `In production, NSGs are used to restrict application tiers, allow only approved admin access paths, protect data services, and stop lateral movement between subnets that should not freely communicate.`,
    workflow: `Traffic is evaluated against NSG rules in priority order. Engineers usually combine NSGs with subnet design, load balancers, private endpoints, or firewall routing instead of treating them as a complete security model by themselves.`,
    exampleTitle: 'Application subnet NSG example',
    exampleCode: `Allow 443 from Application Gateway subnet
Allow 22 only from Bastion / admin subnet
Allow outbound to database private endpoint
Deny unexpected inbound from public internet`,
    productionIssues: [
      'Rules are too broad, leaving internal or public attack surfaces larger than intended.',
      'Teams focus on inbound rules only and miss egress controls or downstream dependency behavior.',
      'Troubleshooting gets messy because NSG intent was never documented and many overlapping rules exist.',
    ],
    bestPractices: [
      'Use NSGs to enforce least-privilege network paths, not broad convenience access.',
      'Review both ingress and egress behavior for production services.',
      'Keep rule ownership and purpose visible in naming and documentation.',
      'Validate NSG behavior during deployment and incident simulations.',
    ],
    relatedTopics: ['azure-vnet', 'azure-application-gateway', 'azure-troubleshooting'],
  },
  {
    slug: 'azure-load-balancer',
    title: 'Load Balancer',
    description: 'Understand Azure Load Balancer for resilient traffic distribution, health probes, and internal or external service exposure.',
    concept: `Azure Load Balancer distributes traffic across healthy backend instances at Layer 4. It supports internal or external load balancing and is commonly used for VM-based services, scale sets, and high-availability designs.`,
    why: `Engineers need Azure Load Balancer knowledge because high availability depends on more than multiple machines. Health probes, backend pools, and traffic exposure patterns decide whether failover actually works.`,
    usage: `Platform teams use Load Balancer with VM scale sets, internal service exposure, shared ingress tiers, and network-level distribution patterns where Application Gateway or Front Door is not the right fit.`,
    workflow: `A frontend IP receives traffic, health probes check backend instances, and traffic is sent only to healthy backends. Backend-pool design, probe paths, and network rules strongly influence real reliability.`,
    exampleTitle: 'Load balancer health flow',
    exampleCode: `Client
  -> Azure Load Balancer frontend
  -> Health probe verifies backend
  -> Healthy VM instances receive traffic
  -> Unhealthy instance removed automatically`,
    productionIssues: [
      'Health probes are too shallow and keep routing traffic to broken application instances.',
      'Load balancer choice is wrong for the workload, forcing teams into avoidable complexity later.',
      'Troubleshooting focuses on compute nodes even when the real issue is probe, backend-pool, or network-path behavior.',
    ],
    bestPractices: [
      'Design health probes around real readiness signals, not only open ports.',
      'Choose Load Balancer versus Application Gateway or Front Door based on protocol and feature needs.',
      'Test node failure and backend rotation before relying on the service for HA claims.',
      'Correlate probe health, request failures, and backend telemetry in monitoring dashboards.',
    ],
    relatedTopics: ['azure-virtual-machines', 'azure-high-availability', 'azure-application-gateway'],
  },
  {
    slug: 'azure-application-gateway',
    title: 'Application Gateway',
    description: 'Learn Azure Application Gateway for Layer 7 routing, WAF, TLS handling, and web workload traffic control.',
    concept: `Azure Application Gateway is a Layer 7 load balancer for HTTP and HTTPS workloads. It supports host-based routing, path-based routing, TLS termination, health probes, and Web Application Firewall features.`,
    why: `Application Gateway matters because many enterprise Azure applications need smarter ingress behavior than a basic network load balancer can provide, especially when security and path routing are involved.`,
    usage: `Teams use Application Gateway for internet-facing APIs, internal portals, multi-site routing, TLS offload, and WAF enforcement in front of App Service, AKS, or VM-based applications.`,
    workflow: `Traffic hits the gateway, routing rules inspect hostnames or paths, TLS can terminate at the gateway, WAF policies inspect requests, and healthy backends receive the request according to routing configuration.`,
    exampleTitle: 'Layer 7 routing pattern',
    exampleCode: `app.company.com/api/* -> backend-api
app.company.com/admin/* -> backend-admin
TLS termination at gateway
WAF enabled
Health probes per backend path`,
    productionIssues: [
      'Probe paths, host headers, or TLS settings are misaligned, causing healthy services to appear broken.',
      'Teams add WAF or path routing without testing real application behavior, then break production traffic.',
      'Ingress ownership is unclear between app and platform teams, so changes become risky.',
    ],
    bestPractices: [
      'Treat ingress rules, probes, certificates, and WAF settings as versioned infrastructure.',
      'Test backend-specific headers, redirects, and auth flows before rollout.',
      'Use Application Gateway when Layer 7 routing or WAF is a requirement, not by habit.',
      'Monitor gateway metrics alongside backend telemetry to shorten troubleshooting time.',
    ],
    relatedTopics: ['azure-load-balancer', 'azure-vnet', 'azure-security'],
  },
  {
    slug: 'azure-active-directory',
    title: 'Azure AD',
    description: 'Understand Azure AD, now Microsoft Entra ID, for identity, authentication, service principals, and enterprise access control.',
    concept: `Azure AD, now called Microsoft Entra ID, is Azure's identity platform for users, groups, service principals, managed identities, app registrations, and authentication flows across Azure and Microsoft-integrated services.`,
    why: `Identity is one of the most important Azure interview and production topics. Strong candidates understand that cloud security begins with identity boundaries, not only with networks or firewalls.`,
    usage: `Enterprises use Entra ID for engineer access, SSO, workload identities, app-to-app access, conditional access, and RBAC integration across subscriptions and resource groups.`,
    workflow: `Identities are created or federated into the tenant, permissions are granted through roles or app permissions, and services authenticate using tokens rather than static credentials wherever possible.`,
    exampleTitle: 'Workload identity flow',
    exampleCode: `Engineer / service
  -> Entra ID authentication
  -> Token issued
  -> Access Azure resource
  -> RBAC or app permissions evaluated
  -> Action allowed or denied`,
    productionIssues: [
      'Teams use long-lived secrets instead of identity-native authentication patterns.',
      'Role assignments are broad and poorly reviewed, creating audit and blast-radius problems.',
      'Support engineers debug symptoms in the target service when the real issue is token, tenant, or identity configuration.',
    ],
    bestPractices: [
      'Prefer modern identity flows, managed identities, and least-privilege role design.',
      'Keep human access, workload access, and break-glass access patterns clearly separated.',
      'Review privileged roles and application registrations regularly.',
      'Treat identity troubleshooting as a first-class production skill in Azure support.',
    ],
    relatedTopics: ['azure-rbac', 'azure-managed-identity', 'azure-key-vault'],
  },
  {
    slug: 'azure-rbac',
    title: 'RBAC',
    description: 'Learn Azure Role-Based Access Control for scoping permissions across management groups, subscriptions, resource groups, and resources.',
    concept: `Azure RBAC controls who can perform which actions on Azure resources. Role assignments can be scoped at management group, subscription, resource group, or resource level, which makes scope design central to security.`,
    why: `RBAC is important because many Azure outages and audit findings come from permissions that are too broad, too narrow, or assigned at the wrong scope.`,
    usage: `Real teams use RBAC to separate platform administrators, app operators, developers, support engineers, and workload identities. The art is choosing scopes that stay secure without making daily delivery impossible.`,
    workflow: `An identity receives a role definition at a given scope. Azure evaluates the identity, the role, and the target resource when actions are attempted. Denials often come from scope misunderstandings rather than from missing services.`,
    exampleTitle: 'RBAC scope example',
    exampleCode: `Subscription: Reader for audit team
Resource Group: Contributor for app team
Key Vault: Secrets User for runtime identity
Specific VM: Virtual Machine Administrator Login for ops`,
    productionIssues: [
      'Contributor or Owner roles are used casually, expanding blast radius far beyond the real need.',
      'Teams assign roles at subscription scope when resource-group scope would be safer.',
      'Troubleshooting is slow because nobody can explain why a permission works in one environment but fails in another.',
    ],
    bestPractices: [
      'Design RBAC around job responsibilities and operational workflows, not around convenience.',
      'Use narrow scopes and custom roles where built-in roles are too broad.',
      'Review inherited permissions and privileged assignments regularly.',
      'Document which identities perform deployments, support actions, and runtime access.',
    ],
    relatedTopics: ['azure-active-directory', 'azure-managed-identity', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-managed-identity',
    title: 'Managed Identity',
    description: 'Understand managed identities for secretless authentication from Azure workloads to Azure services.',
    concept: `A managed identity is an identity that Azure creates and manages for a workload. The application can use it to request tokens for Azure services without storing credentials in configuration files or secret stores.`,
    why: `Managed identity is a key production topic because it replaces brittle client secrets with platform-native authentication. Interviewers often ask about it as a sign of modern Azure security maturity.`,
    usage: `App Service, Functions, Container Apps, and VMs often use managed identities to access Key Vault, Storage, databases, and other Azure APIs safely without embedding secrets in deployment pipelines.`,
    workflow: `Azure associates the identity with the workload, the workload requests a token from the instance metadata or identity endpoint, and the target Azure service evaluates RBAC or access policy permissions before allowing the action.`,
    exampleTitle: 'Managed identity access pattern',
    exampleCode: `App Service
  -> Managed Identity enabled
  -> Requests token for Key Vault
  -> Key Vault checks RBAC / access policy
  -> Secret returned without stored client secret`,
    productionIssues: [
      'Teams enable managed identity but forget the downstream role assignment, causing confusing runtime failures.',
      'Applications still carry legacy secrets even after managed identity is available.',
      'Support teams do not know how to trace identity-based failures across app config, role assignments, and target service policy.',
    ],
    bestPractices: [
      'Prefer managed identity over stored credentials for Azure-to-Azure access.',
      'Treat identity enablement and downstream authorization as one deployment unit.',
      'Log identity-related failure context so support teams can diagnose access issues faster.',
      'Retire old secrets once managed identity access is fully validated.',
    ],
    relatedTopics: ['azure-active-directory', 'azure-rbac', 'azure-key-vault'],
  },
  {
    slug: 'azure-kubernetes-service',
    title: 'AKS',
    description: 'Learn Azure Kubernetes Service for managed cluster operations, container orchestration, and enterprise platform delivery.',
    concept: `Azure Kubernetes Service is Azure's managed Kubernetes offering. Azure manages the control plane while teams manage workloads, node pools, networking, security policies, and cluster operations.`,
    why: `AKS matters because many enterprise Azure platforms standardize on Kubernetes for multi-service delivery, platform abstractions, and containerized production operations.`,
    usage: `Teams run APIs, background workers, internal tools, and platform services on AKS when they need orchestration, service discovery, rollout control, and standardized container delivery across many applications.`,
    workflow: `AKS design involves node pools, cluster networking, ingress, workload identity, autoscaling, observability, secrets, image registry integration, and upgrade strategy. It is a platform, not just a container host.`,
    exampleTitle: 'AKS platform picture',
    exampleCode: `ACR -> AKS cluster
  -> Ingress / Gateway
  -> Namespaces
  -> Deployments / Services
  -> Workload Identity
  -> Monitor + Log Analytics`,
    productionIssues: [
      'Teams adopt AKS without enough platform ownership, so upgrades, networking, and security drift become painful.',
      'Clusters are treated as generic compute while ingress, identity, and observability remain inconsistent.',
      'Troubleshooting blurs between app, Kubernetes, and Azure network layers, increasing incident time.',
    ],
    bestPractices: [
      'Use AKS when the team is ready for cluster-level operational ownership and standardization.',
      'Standardize ingress, workload identity, observability, and namespace policy early.',
      'Plan upgrade and node-pool lifecycle as part of the platform roadmap, not as emergency work.',
      'Keep ACR, secrets, and deployment pipelines tightly integrated with cluster operations.',
    ],
    relatedTopics: ['azure-container-registry', 'azure-vnet', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-container-registry',
    title: 'ACR',
    description: 'Understand Azure Container Registry for secure image storage, pull governance, and container supply-chain control.',
    concept: `Azure Container Registry stores and distributes container images and OCI artifacts for Azure workloads. It is commonly paired with AKS, Container Apps, and CI/CD pipelines.`,
    why: `ACR matters because container delivery depends on trusted image provenance, pull permissions, lifecycle rules, and integration with deployment systems.`,
    usage: `Teams push application images from CI pipelines into ACR, scan or validate them, then allow runtime platforms such as AKS or Container Apps to pull those images through managed identity or controlled credentials.`,
    workflow: `Images are tagged and pushed into repositories, role assignments grant pull or push access, and environments deploy immutable image versions through manifests or release pipelines.`,
    exampleTitle: 'Container image promotion flow',
    exampleCode: `CI build
  -> Push image to ACR
  -> Scan / validate
  -> Deploy exact tag or digest to AKS / Container Apps
  -> Roll back using previous known-good image`,
    productionIssues: [
      'Runtime platforms fail to pull images because identity or registry permissions were not wired correctly.',
      'Teams rely on mutable tags without enough provenance, making rollback and auditing harder.',
      'Old images accumulate without retention or promotion strategy, increasing clutter and confusion.',
    ],
    bestPractices: [
      'Use ACR as the trusted image source for Azure container workloads.',
      'Grant runtime pull access through managed identities or tightly scoped roles.',
      'Track immutable image versions for release traceability.',
      'Set repository hygiene and retention standards so teams can roll back calmly.',
    ],
    relatedTopics: ['azure-kubernetes-service', 'azure-container-apps', 'azure-cicd'],
  },
  {
    slug: 'azure-devops',
    title: 'Azure DevOps',
    description: 'Learn Azure DevOps as a platform for source control integration, pipelines, boards, artifacts, and release automation.',
    concept: `Azure DevOps is a suite of services for planning, source integration, CI/CD, artifacts, and test management. In many enterprises it is the operational backbone for building and deploying Azure workloads.`,
    why: `Azure DevOps matters because engineers are expected to explain how code, infrastructure, approvals, and environment promotion move through controlled release pipelines.`,
    usage: `Teams use Azure DevOps Repos, Pipelines, Artifacts, and Boards to connect app delivery, IaC deployment, approvals, and release evidence across development, staging, and production environments.`,
    workflow: `A typical workflow starts with source control, then pipeline builds, tests, image or package publishing, infra deployment, staged approvals, and post-deploy validation with logs and dashboards.`,
    exampleTitle: 'Azure DevOps release workflow',
    exampleCode: `Commit
  -> Build pipeline
  -> Test + scan
  -> Publish artifact / image
  -> Deploy infra
  -> Deploy app
  -> Approval
  -> Production release`,
    productionIssues: [
      'Pipelines grow organically and become hard to reason about during failures or urgent releases.',
      'Manual configuration lives outside version control, creating drift between the pipeline and the environment.',
      'Approvals exist, but rollback, smoke tests, or failure evidence are not built into the flow.',
    ],
    bestPractices: [
      'Treat pipelines as code and keep delivery logic reviewable.',
      'Separate build, deploy, and approval concerns clearly.',
      'Publish clear logs, artifacts, and environment metadata for support teams.',
      'Design rollback and validation steps into the release path, not as afterthoughts.',
    ],
    relatedTopics: ['azure-cicd', 'azure-infrastructure-as-code', 'azure-container-registry'],
  },
  {
    slug: 'azure-cicd',
    title: 'CI/CD',
    description: 'Understand CI/CD on Azure for repeatable builds, infrastructure delivery, release safety, and environment promotion.',
    concept: `CI/CD on Azure means building code, validating it, packaging it, deploying infrastructure, and releasing applications through repeatable pipelines with strong observability and rollback paths.`,
    why: `CI/CD is central to Azure engineering because cloud reliability depends on controlled change. Weak release discipline causes outages faster than weak compute does.`,
    usage: `Teams build APIs, apps, Bicep templates, and container images in pipelines, then deploy them to App Service, Functions, Container Apps, AKS, or VMs using environment-specific approvals and checks.`,
    workflow: `A good Azure CI/CD flow builds once, tests early, publishes immutable artifacts, deploys through IaC, validates with smoke tests or metrics, and supports fast rollback to a known-good version.`,
    exampleTitle: 'Azure release checklist',
    exampleCode: `Build once
  -> Unit and integration tests
  -> Security / quality gates
  -> Publish artifact
  -> Deploy infrastructure
  -> Deploy app to stage
  -> Validate
  -> Promote to production`,
    productionIssues: [
      'Teams rebuild differently per environment, so staging does not prove what production will run.',
      'Infrastructure changes are manual while app changes are automated, causing drift and failure mismatches.',
      'Release success is assumed from pipeline green status without checking real app health signals.',
    ],
    bestPractices: [
      'Keep application and infrastructure delivery tightly aligned.',
      'Promote immutable artifacts instead of rebuilding per environment.',
      'Add smoke tests, telemetry checks, and rollback hooks to every important release.',
      'Use least-privilege deployment identities and secretless runtime access where possible.',
    ],
    relatedTopics: ['azure-devops', 'azure-infrastructure-as-code', 'azure-app-service'],
  },
  {
    slug: 'azure-infrastructure-as-code',
    title: 'Infrastructure as Code',
    description: 'Learn Azure Infrastructure as Code for repeatable environment creation, drift reduction, and governed cloud change.',
    concept: `Infrastructure as Code in Azure means defining resources, permissions, networking, and platform settings as versioned code using tools such as ARM templates, Bicep, or Terraform.`,
    why: `IaC matters because manual portal-driven infrastructure does not scale. It creates drift, slows recovery, and makes production support depend on memory instead of code.`,
    usage: `Real teams use IaC to create subscriptions, resource groups, VNets, application services, storage, Key Vault, and monitoring resources consistently across environments and regions.`,
    workflow: `Templates describe desired state, pipelines validate and deploy those definitions, and change reviews make infrastructure decisions visible before they hit production.`,
    exampleTitle: 'IaC outcome model',
    exampleCode: `Source-controlled template
  -> Review
  -> Validate / plan
  -> Deploy to dev
  -> Promote to stage / prod
  -> Drift reduced
  -> Recovery repeatable`,
    productionIssues: [
      'Critical resources are created manually, so no one can recreate the environment during recovery or migration.',
      'App teams and platform teams disagree on the source of truth because portal changes bypass the template.',
      'IaC exists, but secrets, role assignments, or network settings are still handled manually.',
    ],
    bestPractices: [
      'Make IaC the default source of truth for Azure infrastructure.',
      'Include networking, identity, monitoring, and security resources in the same governance model.',
      'Review infrastructure changes with the same discipline as application code.',
      'Use deployment validation and staged rollout for risky platform changes.',
    ],
    relatedTopics: ['azure-devops', 'azure-cicd', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-key-vault',
    title: 'Key Vault',
    description: 'Understand Azure Key Vault for managing secrets, keys, and certificates with controlled access and audit visibility.',
    concept: `Azure Key Vault stores secrets, encryption keys, and certificates. It centralizes sensitive material and gives Azure workloads or operators controlled access through RBAC, policies, and identity-driven authentication.`,
    why: `Key Vault is a core security and delivery topic because production systems break when secrets are scattered through app settings, scripts, and pipelines without rotation or access control.`,
    usage: `Teams use Key Vault for database credentials, API secrets, TLS certificates, signing keys, and application configuration values that should not live directly in code repositories or static app settings.`,
    workflow: `A workload authenticates using managed identity or another approved identity, requests the secret or key, and Key Vault evaluates permissions before allowing access. Audit logs and secret versions help operations and compliance.`,
    exampleTitle: 'Secret retrieval flow',
    exampleCode: `App / Function / Container App
  -> Managed Identity token
  -> Key Vault access
  -> Secret version returned
  -> App uses value without storing static credential`,
    productionIssues: [
      'Teams still copy secrets into app settings or pipelines even though Key Vault exists.',
      'Runtime failures occur because access paths were never tested with the actual managed identity.',
      'Secret rotation is planned but application reload behavior is not, causing outages during credential changes.',
    ],
    bestPractices: [
      'Use Key Vault as the central secret store for Azure-native workloads.',
      'Pair Key Vault with managed identity and least-privilege access.',
      'Test rotation behavior and rollout coordination before changing sensitive credentials.',
      'Monitor secret access failures as real production signals, not just security logs.',
    ],
    relatedTopics: ['azure-managed-identity', 'azure-active-directory', 'azure-security'],
  },
  {
    slug: 'azure-defender-for-cloud',
    title: 'Defender for Cloud',
    description: 'Learn Azure Defender for Cloud for posture management, threat detection, and security recommendations across Azure resources.',
    concept: `Defender for Cloud provides security posture management, recommendations, and workload protection signals across Azure resources. It helps teams identify misconfigurations, weak access patterns, and active threats.`,
    why: `Security in Azure is not only about prevention. Teams also need continuous visibility into posture gaps and workload risk. Defender for Cloud often appears in enterprise support and audit conversations.`,
    usage: `Platform and security teams use Defender for Cloud to review recommendations, track compliance posture, investigate risky configurations, and connect infrastructure signals with operational remediation workflows.`,
    workflow: `Azure resources are assessed against security rules and protection plans. Findings are prioritized, assigned, and remediated through platform, security, or application teams depending on ownership.`,
    exampleTitle: 'Security operations loop',
    exampleCode: `Assess resource posture
  -> Surface recommendations
  -> Prioritize by risk and ownership
  -> Remediate through IaC / config change
  -> Reassess and audit`,
    productionIssues: [
      'Recommendations pile up because nobody owns remediation across platform and product teams.',
      'Security findings are treated as separate from delivery work, so risky misconfigurations stay live too long.',
      'Engineers only react to alerts and never improve the baseline pattern that created them.',
    ],
    bestPractices: [
      'Tie Defender findings to clear platform or application ownership.',
      'Use IaC and policy to remove recurring classes of findings instead of fixing them one by one forever.',
      'Review security posture as part of release readiness and architecture governance.',
      'Combine threat signals with access, network, and workload telemetry during incident response.',
    ],
    relatedTopics: ['azure-key-vault', 'azure-rbac', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-high-availability',
    title: 'High Availability',
    description: 'Understand Azure high availability using zones, regional design, health probes, service redundancy, and resilient deployment patterns.',
    concept: `High availability in Azure means designing workloads to stay usable when instances, zones, or supporting components fail. It usually combines multiple instances, zone-aware design, resilient ingress, managed failover features, and health-based traffic control.`,
    why: `Availability is one of the most common cloud architecture interview topics because real systems fail through zones, deployments, dependencies, and operational mistakes rather than only through hardware loss.`,
    usage: `Teams design highly available Azure systems with multiple app instances, database redundancy, storage replication, load balancers or Application Gateway, and release workflows that avoid turning deployments into outages.`,
    workflow: `Availability design starts from the workload SLO, then maps to instance count, zones, probe design, statelessness, data replication, and rollback strategy. Each dependency must tolerate failure at the same level or the whole claim weakens.`,
    exampleTitle: 'HA application pattern',
    exampleCode: `Application Gateway
  -> Zone-aware app instances
  -> Managed identity + Key Vault
  -> Zone-redundant data service
  -> Azure Monitor alerts
  -> Deployment rollback path`,
    productionIssues: [
      'Teams assume managed cloud services are automatically highly available without checking service-specific redundancy design.',
      'App tiers are duplicated but data or secret dependencies remain single points of failure.',
      'Health probes are too shallow, so traffic keeps flowing to unhealthy instances.',
    ],
    bestPractices: [
      'Design availability from user impact and SLO targets, not from service marketing language.',
      'Validate zone, instance, and dependency failure paths with drills or load tests.',
      'Pair redundancy with fast rollback and meaningful health checks.',
      'Treat application behavior, data design, and platform configuration as one availability problem.',
    ],
    relatedTopics: ['azure-load-balancer', 'azure-application-gateway', 'azure-disaster-recovery'],
  },
  {
    slug: 'azure-disaster-recovery',
    title: 'Disaster Recovery',
    description: 'Learn Azure disaster recovery through backup, replication, secondary-region planning, RTO/RPO targets, and tested recovery workflows.',
    concept: `Disaster recovery in Azure covers how a workload is restored after major regional failure, data loss, corruption, or severe platform incident. It includes backups, replication, failover strategy, and runbooks matched to business recovery goals.`,
    why: `Azure engineers are expected to distinguish high availability from disaster recovery. One reduces service interruption inside the normal platform boundary; the other prepares for larger loss scenarios and recovery objectives.`,
    usage: `Critical workloads often combine Azure Backup, geo-redundant or replicated storage, database restore strategy, secondary-region infrastructure definitions, and documented failover steps for platform teams.`,
    workflow: `The team defines RTO and RPO, chooses backup or warm-standby patterns, automates the recovery environment where possible, and validates the sequence through drills instead of relying on documentation alone.`,
    exampleTitle: 'DR planning checklist',
    exampleCode: `Define RTO / RPO
  -> Choose backup / standby pattern
  -> Replicate data or backups
  -> Keep infra definitions ready
  -> Test restore and traffic switch
  -> Capture lessons into runbooks`,
    productionIssues: [
      'Backups exist, but restore time is unknown and far longer than the business expects.',
      'Secondary-region design is partial, so dependencies such as identity, network, or secrets are forgotten during recovery.',
      'Disaster-recovery plans are never rehearsed, so the first real failover becomes a discovery exercise.',
    ],
    bestPractices: [
      'Define business recovery targets before picking Azure DR patterns.',
      'Use repeatable infrastructure and dependency maps for every critical workload.',
      'Test restore, failover, and rollback steps periodically.',
      'Store recovery knowledge in runbooks, dashboards, and automation rather than in one engineer’s memory.',
    ],
    relatedTopics: ['azure-high-availability', 'azure-blob-storage', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-cost-optimization',
    title: 'Cost Optimization',
    description: 'Understand Azure cost optimization through right-sizing, lifecycle rules, reservations, monitoring, and architecture-aware spend control.',
    concept: `Azure cost optimization is the practice of aligning cloud spend with actual workload value. It involves right-sizing compute, controlling storage growth, watching egress and platform usage, and choosing the right service model for the job.`,
    why: `Cloud costs become operational risk when nobody owns them. Azure engineers are expected to understand how service choice, scaling, and long-lived resources affect spend, not just how to click a cost report.`,
    usage: `Teams review VM sizes, App Service plans, storage tiers, unused resources, logs, and network transfer. Mature platform teams pair cost dashboards with tagging standards, budgets, and service-ownership reviews.`,
    workflow: `Cost optimization starts with visibility: tags, budgets, usage reports, and architecture context. Teams then remove waste, right-size resources, and redesign expensive paths such as overprovisioned VMs or excessive logging retention.`,
    exampleTitle: 'Azure cost review flow',
    exampleCode: `Tag resources
  -> Review top services by spend
  -> Find idle or oversized resources
  -> Apply lifecycle / rightsizing / reservations
  -> Recheck metrics and workload impact`,
    productionIssues: [
      'Resources are overprovisioned and nobody revisits the sizing after the launch period ends.',
      'Storage, logs, and diagnostic retention grow quietly because lifecycle strategy is missing.',
      'Platform teams discuss cost without enough workload context and accidentally hurt reliability or performance.',
    ],
    bestPractices: [
      'Make tagging, budgets, and ownership mandatory for all Azure resources.',
      'Review service choice and scaling behavior with real telemetry, not gut feel.',
      'Use lifecycle and retention controls for storage and logging-heavy services.',
      'Treat cost as an architecture quality attribute alongside reliability and security.',
    ],
    relatedTopics: ['azure-subscription-management', 'azure-blob-storage', 'azure-enterprise-architecture'],
  },
  {
    slug: 'azure-enterprise-architecture',
    title: 'Enterprise Architecture',
    description: 'Learn how enterprise Azure architecture brings together landing zones, identity, network topology, delivery, governance, and production support.',
    concept: `Enterprise Azure architecture is the operating model for running many workloads safely on one cloud platform. It includes landing zones, management groups, subscriptions, network topology, identity controls, policy, observability, and delivery standards.`,
    why: `This matters because most Azure interviews for senior and architect roles are really questions about platform judgment. Interviewers want to know whether you can scale standards across teams, not only provision one app.`,
    usage: `Large organizations build landing zones, shared-service subscriptions, hub-and-spoke networks, common monitoring, secret management, and release templates so product teams can move faster without inventing the platform every time.`,
    workflow: `Architects define approved patterns, map ownership between platform and product teams, automate the baseline through IaC, and review new workloads against security, network, recovery, and operational requirements.`,
    exampleTitle: 'Enterprise Azure control model',
    exampleCode: `Management Groups
  -> Policy and guardrails
  -> Environment subscriptions
  -> Shared network / identity / observability
  -> Product landing zones
  -> Standardized delivery and support patterns`,
    productionIssues: [
      'Every team provisions Azure differently, so support, compliance, and cost all get harder as the platform grows.',
      'Shared platform controls exist, but product teams bypass them because the approved path is slow or unclear.',
      'Ownership gaps appear during incidents because nobody defined where platform responsibility ends and app responsibility begins.',
    ],
    bestPractices: [
      'Design enterprise architecture around repeatable landing zones and clear ownership.',
      'Make the secure path the easy path for delivery teams.',
      'Standardize identity, networking, observability, and secret patterns across workloads.',
      'Review architecture not only for deployment readiness but also for support readiness.',
    ],
    relatedTopics: ['azure-architecture', 'azure-subscription-management', 'azure-infrastructure-as-code'],
  },
  {
    slug: 'azure-scenario-questions',
    title: 'Scenario Questions',
    description: 'Prepare for Azure scenario questions that test cloud judgment, service selection, support thinking, and production decision making.',
    concept: `Azure scenario questions ask how you would handle a real workload problem rather than how you would define a service. They often mix architecture, failure handling, identity, networking, and cost reasoning in one conversation.`,
    why: `Scenario questions separate memorized certification answers from real engineering judgment. Employers use them to assess how you think under production-like constraints.`,
    usage: `Typical scenarios involve choosing App Service versus AKS, diagnosing failed deployments, securing a storage workflow, designing hub-and-spoke networks, or improving availability for a business-critical API.`,
    workflow: `Strong answers frame the problem, clarify constraints, identify the service boundary, explain trade-offs, and show how you would validate the decision in production.`,
    exampleTitle: 'Scenario answer frame',
    exampleCode: `1. Clarify workload and business risk
2. Identify Azure boundary involved
3. Compare realistic options
4. Explain security, scale, and support trade-offs
5. State validation and rollback plan`,
    productionIssues: [
      'Candidates jump to service names without clarifying business constraints or ownership.',
      'Answers focus on build-time design but ignore support and failure behavior.',
      'Trade-offs are presented as absolutes instead of workload-dependent decisions.',
    ],
    bestPractices: [
      'Answer Azure scenarios through constraints, trade-offs, and operational evidence.',
      'Mention security, observability, and rollback as part of the solution, not extras.',
      'Use realistic Azure services and explain why alternatives were rejected.',
      'Practice describing decisions the way senior engineers speak in design reviews.',
    ],
    relatedTopics: ['azure-architecture-questions', 'azure-production-issues', 'azure-troubleshooting'],
  },
  {
    slug: 'azure-production-issues',
    title: 'Production Issues',
    description: 'Understand the production issues Azure engineers are expected to diagnose across deployments, networking, identity, scaling, and runtime behavior.',
    concept: `Azure production issues usually involve a chain of signals rather than one isolated service bug. Incidents often combine configuration drift, RBAC mistakes, queue backlogs, ingress failures, private connectivity issues, or release regressions.`,
    why: `Production support is a key interview differentiator. Teams want engineers who can preserve evidence, isolate the Azure boundary, and recover safely instead of guessing in the portal.`,
    usage: `Real incidents include App Service slot swaps failing, Functions retry storms, AKS image-pull errors, Key Vault access failures, NSG misrules, and budget surprises caused by scaling or logging changes.`,
    workflow: `Engineers start from user symptoms, correlate Azure Monitor and service-specific signals, check identity and network boundaries, review recent deployments, and apply the smallest reversible mitigation before deeper remediation.`,
    exampleTitle: 'Production triage model',
    exampleCode: `User symptom
  -> Scope blast radius
  -> Check recent changes
  -> Validate identity / network / dependency path
  -> Mitigate safely
  -> Preserve evidence and prevent recurrence`,
    productionIssues: [
      'Teams change multiple things at once during an incident and destroy the evidence needed to find root cause.',
      'Support focuses on the compute layer while the actual problem is identity, networking, or release drift.',
      'No one can explain service ownership, so incidents bounce between teams.',
    ],
    bestPractices: [
      'Use Azure telemetry and recent-change history before making broad runtime changes.',
      'Treat RBAC, network, and dependency path checks as first-line troubleshooting steps.',
      'Apply reversible mitigations first, then follow through with root-cause prevention.',
      'Keep runbooks and ownership maps current for the services that matter most.',
    ],
    relatedTopics: ['azure-troubleshooting', 'azure-high-availability', 'azure-cicd'],
  },
  {
    slug: 'azure-architecture-questions',
    title: 'Architecture Questions',
    description: 'Prepare for Azure architecture questions around service selection, landing zones, reliability, security, and enterprise cloud design.',
    concept: `Azure architecture questions test how you connect services into a governed platform. They are less about memorizing SKUs and more about explaining why one pattern fits a workload better than another.`,
    why: `Senior cloud interviews rely heavily on architecture questions because service knowledge without decision quality does not help much in real platform work.`,
    usage: `Common questions ask how to build a secure web platform, choose App Service versus AKS, split subscriptions, design hub-and-spoke networking, secure secrets, or handle recovery requirements across regions.`,
    workflow: `A strong architecture answer explains the quality attributes, the Azure platform building blocks, the team ownership model, the failure path, and the reason the chosen pattern is supportable over time.`,
    exampleTitle: 'Architecture answer structure',
    exampleCode: `Requirement
  -> Constraints
  -> Candidate Azure patterns
  -> Recommended design
  -> Security + availability + cost trade-offs
  -> Operational ownership and validation`,
    productionIssues: [
      'Candidates describe technology stacks without mapping them to risk, scale, or governance constraints.',
      'Architecture answers ignore how the platform will be monitored, secured, or supported after go-live.',
      'Trade-offs are vague, which makes the recommendation sound untested.',
    ],
    bestPractices: [
      'Anchor every Azure architecture answer in business and operational constraints.',
      'Show how identity, network, deployment, and observability are part of the design.',
      'Explain why the pattern stays manageable for the team, not only why it can work technically.',
      'Use realistic Azure-native patterns instead of generic cloud buzzwords.',
    ],
    relatedTopics: ['azure-architecture', 'azure-enterprise-architecture', 'azure-scenario-questions'],
  },
  {
    slug: 'azure-troubleshooting',
    title: 'Troubleshooting',
    description: 'Learn a practical Azure troubleshooting approach for identity failures, network issues, deployment regressions, and workload incidents.',
    concept: `Azure troubleshooting is the discipline of isolating the actual failing boundary: identity, network, compute, application code, storage, ingress, or recent release change. Strong troubleshooting is evidence-led, not portal-random.`,
    why: `This topic matters because real cloud support work is not about knowing every service screen. It is about reducing search space calmly while protecting uptime and evidence.`,
    usage: `Engineers troubleshoot failed app startup, access-denied errors, slow APIs, image-pull issues, broken private endpoints, queue backlogs, and release-induced failures across Azure services.`,
    workflow: `Start from the user symptom, scope blast radius, review recent changes, validate identity and network path, inspect service telemetry, and mitigate with the least risky reversible action before broader redesign.`,
    exampleTitle: 'Azure troubleshooting loop',
    exampleCode: `Symptom
  -> Scope impact
  -> Check recent change
  -> Verify identity
  -> Verify network path
  -> Check service metrics / logs
  -> Apply safe mitigation
  -> Prevent recurrence`,
    productionIssues: [
      'Teams open too many Azure services at once without deciding which boundary is most likely failing.',
      'Portal-only troubleshooting hides the need for log correlation and deployment history.',
      'Mitigation works temporarily, but root-cause prevention never lands back in code or policy.',
    ],
    bestPractices: [
      'Troubleshoot from evidence and blast radius, not from service popularity.',
      'Always include identity, network, and deployment history in Azure incident review.',
      'Preserve evidence before making risky configuration changes.',
      'Convert every major incident lesson into IaC, alerting, or documented platform guidance.',
    ],
    relatedTopics: ['azure-production-issues', 'azure-cicd', 'azure-network-security-groups'],
  },
];

export const azureTopics: TopicContent[] = azureTopicSpecs.map(topic);
