import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { azureInterviewPrepTopicGroups } from './topicNavigation';

type Intent = 'concept' | 'implementation' | 'troubleshooting' | 'architecture';

interface TopicProfile {
  mechanism: string;
  implementation: string;
  failure: string;
  decision: string;
  incident: string;
  evidence: [string, string, string];
}

interface TopicSpec {
  category: string;
  topicGroup: string;
  concern: string;
  relatedTopics: string[];
  profile: TopicProfile;
}

const intentTypes: Record<Intent, string> = {
  concept: 'Conceptual',
  implementation: 'Practical Implementation',
  troubleshooting: 'Troubleshooting',
  architecture: 'Architecture',
};

const difficultyByIntent: Record<Intent, 'Beginner' | 'Intermediate' | 'Advanced' | 'Architect'> = {
  concept: 'Beginner',
  implementation: 'Intermediate',
  troubleshooting: 'Advanced',
  architecture: 'Architect',
};

const experienceByIntent: Record<Intent, 'beginner' | 'mid' | 'senior' | 'architect'> = {
  concept: 'beginner',
  implementation: 'mid',
  troubleshooting: 'senior',
  architecture: 'architect',
};

const industries = ['retail', 'banking', 'healthcare', 'SaaS', 'insurance', 'telecom'];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hash(input: string) {
  let total = 0;
  for (let index = 0; index < input.length; index += 1) {
    total = ((total << 5) - total) + input.charCodeAt(index);
    total |= 0;
  }
  return Math.abs(total);
}

function list(values: string[]) {
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(', ')}, and ${values[values.length - 1]}`;
}

const topicSpecs: TopicSpec[] = [
  {
    category: 'Azure Basics',
    topicGroup: 'Fundamentals',
    concern: 'tenant, subscription, resource-group, and region boundaries',
    relatedTopics: ['Azure Architecture', 'Resource Groups'],
    profile: {
      mechanism: 'Azure basics define how identity, billing, governance, and deployment boundaries fit together in a cloud environment.',
      implementation: 'Start by mapping tenant, subscription, resource group, region, and ownership before choosing workload services.',
      failure: 'teams deploy into the wrong boundary and then struggle with access, billing, or policy drift',
      decision: 'which Azure boundary should own the workload, budget, permissions, and operational controls',
      incident: 'a production workload lands in the wrong subscription and critical support teams cannot access it during an outage',
      evidence: ['subscription and tag inventory', 'RBAC and policy assignments', 'region and resource deployment history'],
    },
  },
  {
    category: 'Azure Architecture',
    topicGroup: 'Fundamentals',
    concern: 'service composition, network boundaries, and supportability',
    relatedTopics: ['High Availability', 'Enterprise Architecture'],
    profile: {
      mechanism: 'Azure architecture is the composition of identity, networking, compute, data, observability, and recovery decisions into one operating platform.',
      implementation: 'Choose services from workload needs, then validate how identity, traffic, secrets, telemetry, and failover work end to end.',
      failure: 'the system works in diagrams but not in production because the operating model was never designed',
      decision: 'which platform pattern gives the required reliability, security, scale, and operational clarity',
      incident: 'the application is healthy locally but fails in production because ingress, secrets, and private dependencies were designed independently',
      evidence: ['architecture diagrams and ADRs', 'monitoring and dependency maps', 'deployment and incident history'],
    },
  },
  {
    category: 'Resource Groups',
    topicGroup: 'Fundamentals',
    concern: 'lifecycle and ownership boundaries',
    relatedTopics: ['Subscription Management', 'RBAC'],
    profile: {
      mechanism: 'Resource groups package Azure resources into lifecycle, access, and tagging boundaries.',
      implementation: 'Design resource groups around environment and ownership so deployments, cleanup, and support actions stay predictable.',
      failure: 'unrelated workloads share one boundary and support teams cannot isolate changes or permissions safely',
      decision: 'how to group resources so change, access, and billing stay manageable',
      incident: 'a cleanup action deletes or modifies production-adjacent resources because environment boundaries were mixed in one group',
      evidence: ['resource-group inventory', 'tagging coverage', 'deployment and deletion logs'],
    },
  },
  {
    category: 'Subscription Management',
    topicGroup: 'Fundamentals',
    concern: 'quota, billing, and environment isolation',
    relatedTopics: ['Azure Basics', 'Enterprise Architecture'],
    profile: {
      mechanism: 'Subscriptions are Azure billing, quota, and governance boundaries for workloads and teams.',
      implementation: 'Separate environments or product domains into subscriptions where governance and blast radius require it.',
      failure: 'dev, shared, and prod workloads collide in one billing and permission boundary',
      decision: 'which subscriptions should exist and how they inherit policy, budget, and admin controls',
      incident: 'a launch fails because quota or policy limitations in a shared subscription were never reviewed in advance',
      evidence: ['budget and quota reports', 'management-group inheritance', 'subscription-level RBAC and policy'],
    },
  },
  {
    category: 'Virtual Machines',
    topicGroup: 'Compute',
    concern: 'OS ownership, patching, and runtime resilience',
    relatedTopics: ['Load Balancer', 'High Availability'],
    profile: {
      mechanism: 'Azure VMs provide compute where the team owns the guest OS, installed software, and operational lifecycle.',
      implementation: 'Design VM workloads with sizing, disks, network access, backup, monitoring, and patching as one package.',
      failure: 'VM workloads become fragile because patching, backup, or access paths were treated as manual chores',
      decision: 'when to use infrastructure control instead of a higher-level platform service',
      incident: 'an app runs on VMs but no backup, patch, or admin-access discipline exists when the node fails',
      evidence: ['VM diagnostics and health metrics', 'backup and patch status', 'network and access logs'],
    },
  },
  {
    category: 'App Service',
    topicGroup: 'Compute',
    concern: 'managed runtime delivery, slots, and secure configuration',
    relatedTopics: ['CI/CD', 'Key Vault'],
    profile: {
      mechanism: 'App Service is a managed web-app platform with deployment, scaling, configuration, and diagnostics abstractions.',
      implementation: 'Use slots, settings, identity, networking, and monitoring so code releases do not depend on portal drift.',
      failure: 'releases succeed technically but break traffic because slot, config, or dependency behavior was not verified',
      decision: 'whether App Service offers enough control without the operational cost of containers or VMs',
      incident: 'a slot swap completes but production fails because secret, network, or startup settings differ between slots',
      evidence: ['slot configuration and diff history', 'request and dependency telemetry', 'deployment logs and app settings audit'],
    },
  },
  {
    category: 'Functions',
    topicGroup: 'Compute',
    concern: 'event-driven execution, retries, and cold-start trade-offs',
    relatedTopics: ['Queues', 'Scenario Questions'],
    profile: {
      mechanism: 'Azure Functions executes code on triggers such as HTTP, queues, timers, and storage events.',
      implementation: 'Design Functions for idempotency, dependency control, plan selection, and observable retry behavior.',
      failure: 'background work spirals because retries, poison messages, or startup latency were never modeled',
      decision: 'which tasks belong in serverless execution and how to host them safely',
      incident: 'a queue-triggered Function falls behind for hours because visibility timeouts and retry handling were weak',
      evidence: ['function execution logs', 'queue depth and retry metrics', 'hosting-plan latency and failure telemetry'],
    },
  },
  {
    category: 'Container Apps',
    topicGroup: 'Compute',
    concern: 'container release safety without owning Kubernetes',
    relatedTopics: ['ACR', 'CI/CD'],
    profile: {
      mechanism: 'Container Apps runs containers with managed ingress, revisions, secrets, and autoscaling.',
      implementation: 'Deploy immutable images, control revisions, and validate scaling rules and secret injection before production traffic.',
      failure: 'teams move to containers but still manage config and rollback informally',
      decision: 'when managed containers are enough and when a full cluster platform is justified',
      incident: 'a new revision rolls out but traffic errors rise because ingress and secret dependencies were not validated',
      evidence: ['revision and traffic logs', 'container restart and scaling metrics', 'registry and secret access history'],
    },
  },
  {
    category: 'Blob Storage',
    topicGroup: 'Storage',
    concern: 'durable object storage with secure access and lifecycle control',
    relatedTopics: ['Cost Optimization', 'Production Issues'],
    profile: {
      mechanism: 'Blob Storage stores objects with configurable redundancy, lifecycle, and access behavior.',
      implementation: 'Choose tiering, access pattern, network exposure, and identity method deliberately for each workload.',
      failure: 'storage becomes insecure, expensive, or operationally opaque because lifecycle and access controls were skipped',
      decision: 'which redundancy, tier, and exposure pattern fits the workload',
      incident: 'customer exports are available in storage but retention and access design create an audit finding and rising cost',
      evidence: ['storage metrics and access logs', 'lifecycle and replication settings', 'network and RBAC configuration'],
    },
  },
  {
    category: 'Azure Files',
    topicGroup: 'Storage',
    concern: 'shared filesystem semantics in hybrid or legacy workloads',
    relatedTopics: ['Virtual Machines', 'Disaster Recovery'],
    profile: {
      mechanism: 'Azure Files offers managed shared file storage for workloads that still need mounted file shares.',
      implementation: 'Validate performance, mount behavior, backup, and authentication before adopting file-share patterns.',
      failure: 'teams treat Azure Files like a local disk and discover latency or access issues late',
      decision: 'whether a shared file service is truly required instead of object storage or a database',
      incident: 'a migrated application works in testing but production traffic exposes file-share contention and mount instability',
      evidence: ['share performance metrics', 'mount and client logs', 'network and backup status'],
    },
  },
  {
    category: 'Queues',
    topicGroup: 'Storage',
    concern: 'asynchronous buffering and poison-message handling',
    relatedTopics: ['Functions', 'Troubleshooting'],
    profile: {
      mechanism: 'Azure queues decouple producers and consumers so work can be processed asynchronously.',
      implementation: 'Use queue depth, retry policy, idempotent consumers, and dead-letter thinking in the design.',
      failure: 'user-facing systems degrade because background work has no safe retry or backlog strategy',
      decision: 'how to isolate slow or bursty work from direct request paths',
      incident: 'message backlog grows rapidly and duplicate processing occurs because consumer behavior was not built for retries',
      evidence: ['queue age and depth', 'consumer failure logs', 'retry and dead-letter telemetry'],
    },
  },
  {
    category: 'Tables',
    topicGroup: 'Storage',
    concern: 'simple NoSQL key design and operational metadata usage',
    relatedTopics: ['Azure Basics', 'Cost Optimization'],
    profile: {
      mechanism: 'Azure Table Storage supports large-scale key-based entity access with simple schema flexibility.',
      implementation: 'Design partition and row keys from real access patterns, not from convenience names alone.',
      failure: 'the storage is cheap but query and partition assumptions make the application unreliable or awkward',
      decision: 'when a simple key-value store is enough and when a richer data model is needed',
      incident: 'an operations dashboard slows down because table partition design does not match lookup behavior under load',
      evidence: ['storage access patterns', 'partition-key and latency metrics', 'application query traces'],
    },
  },
  {
    category: 'VNet',
    topicGroup: 'Networking',
    concern: 'address planning and secure private connectivity',
    relatedTopics: ['NSG', 'Enterprise Architecture'],
    profile: {
      mechanism: 'VNets define private network boundaries, address space, subnet segmentation, and peering behavior in Azure.',
      implementation: 'Start from CIDR growth, trust boundaries, and dependency paths before provisioning workloads.',
      failure: 'network expansion, peering, or private access becomes fragile because address and subnet planning were weak',
      decision: 'how to design Azure private connectivity so the workload is secure and operable over time',
      incident: 'an environment expansion stalls because overlapping address spaces block peering and secure routing',
      evidence: ['VNet and subnet inventory', 'route and peering configuration', 'connectivity tests and flow logs'],
    },
  },
  {
    category: 'NSG',
    topicGroup: 'Networking',
    concern: 'least-privilege traffic control at subnet and NIC boundaries',
    relatedTopics: ['VNet', 'Troubleshooting'],
    profile: {
      mechanism: 'NSGs filter inbound and outbound traffic using prioritized network rules.',
      implementation: 'Model allowed paths deliberately and validate them against real dependency flows.',
      failure: 'either services are overexposed or critical dependencies are blocked because network policy is guesswork',
      decision: 'what network paths should be allowed, denied, or isolated by design',
      incident: 'a release succeeds but production calls fail because an outbound NSG rule was never modeled',
      evidence: ['NSG rules and effective security', 'connectivity and flow logs', 'deployment and incident timeline'],
    },
  },
  {
    category: 'Load Balancer',
    topicGroup: 'Networking',
    concern: 'health-probe-driven traffic distribution',
    relatedTopics: ['Virtual Machines', 'High Availability'],
    profile: {
      mechanism: 'Azure Load Balancer distributes network traffic only to healthy backends based on probe results.',
      implementation: 'Probe design, backend pools, and subnet behavior must reflect the real readiness of the workload.',
      failure: 'high-availability claims collapse because the balancer keeps sending traffic to unhealthy nodes',
      decision: 'when Layer 4 distribution is enough and when richer ingress logic is needed',
      incident: 'backend instances exist in multiple zones but clients still fail because health probes are shallow and inaccurate',
      evidence: ['probe health and backend metrics', 'request failure rates', 'backend-pool and subnet configuration'],
    },
  },
  {
    category: 'Application Gateway',
    topicGroup: 'Networking',
    concern: 'Layer 7 routing, TLS control, and WAF-aware ingress',
    relatedTopics: ['Load Balancer', 'Security'],
    profile: {
      mechanism: 'Application Gateway handles HTTP-aware routing, TLS termination, health probing, and WAF controls.',
      implementation: 'Version ingress rules, certificates, probes, and backend configuration like any other critical platform code.',
      failure: 'routing or WAF changes create outages because the ingress layer is treated like a simple toggle',
      decision: 'which ingress pattern best supports app routing, security, and operational clarity',
      incident: 'a TLS or path-rule change breaks one route family in production even though the backend services are healthy',
      evidence: ['gateway access and WAF logs', 'backend probe health', 'certificate and routing configuration history'],
    },
  },
  {
    category: 'Azure AD',
    topicGroup: 'Identity',
    concern: 'tenant identity, tokens, and workload access boundaries',
    relatedTopics: ['RBAC', 'Managed Identity'],
    profile: {
      mechanism: 'Azure AD provides the identity fabric for users, groups, service principals, tokens, and application access.',
      implementation: 'Separate human and workload access patterns, then wire token-based access into every dependent service intentionally.',
      failure: 'cloud security unravels because identity is treated as setup trivia instead of the first control plane',
      decision: 'which identities exist, what they can access, and how those permissions are governed',
      incident: 'an application cannot reach a dependent service because token issuance and role configuration differ across environments',
      evidence: ['sign-in and token traces', 'app registration and role assignments', 'tenant and policy configuration'],
    },
  },
  {
    category: 'RBAC',
    topicGroup: 'Identity',
    concern: 'scope-aware least privilege',
    relatedTopics: ['Azure AD', 'Managed Identity'],
    profile: {
      mechanism: 'RBAC determines who can do what on Azure resources at management-group, subscription, resource-group, or resource scope.',
      implementation: 'Choose the narrowest useful scope and align roles to real job responsibilities.',
      failure: 'permissions either block operations unexpectedly or create large blast radius because scope design was careless',
      decision: 'which built-in or custom roles belong at which Azure scope',
      incident: 'an engineer can modify production resources unexpectedly because a subscription-level role assignment was broader than intended',
      evidence: ['role assignment inventory', 'effective permissions', 'audit and activity logs'],
    },
  },
  {
    category: 'Managed Identity',
    topicGroup: 'Identity',
    concern: 'secretless workload authentication',
    relatedTopics: ['Azure AD', 'Key Vault'],
    profile: {
      mechanism: 'Managed Identity gives Azure workloads a platform-managed identity for token-based access to Azure services.',
      implementation: 'Enable the identity, grant only the needed downstream roles, and test the runtime path end to end.',
      failure: 'the app still depends on brittle secrets or fails at runtime because only half the identity path was wired',
      decision: 'where secretless workload access improves security and supportability',
      incident: 'a deployment removes static secrets but the service still cannot access Key Vault because the managed identity has no usable role assignment',
      evidence: ['identity enablement and role data', 'runtime access logs', 'target service authorization events'],
    },
  },
  {
    category: 'AKS',
    topicGroup: 'Containers',
    concern: 'cluster operations, workload identity, and managed orchestration',
    relatedTopics: ['ACR', 'Enterprise Architecture'],
    profile: {
      mechanism: 'AKS manages the Kubernetes control plane while the team still owns workloads, nodes, identity, network, and upgrade patterns.',
      implementation: 'Standardize ingress, namespaces, workload identity, and cluster observability before many teams start using the platform.',
      failure: 'container delivery becomes harder, not easier, because cluster ownership and standards were never established',
      decision: 'when AKS gives enough platform leverage to justify its operational complexity',
      incident: 'applications deploy but fail at runtime because image pulls, network policy, or cluster upgrade discipline are inconsistent',
      evidence: ['cluster and node health', 'Kubernetes events and logs', 'registry, identity, and ingress telemetry'],
    },
  },
  {
    category: 'ACR',
    topicGroup: 'Containers',
    concern: 'image provenance and runtime pull security',
    relatedTopics: ['AKS', 'CI/CD'],
    profile: {
      mechanism: 'ACR stores and serves container images and related OCI artifacts for Azure platforms.',
      implementation: 'Use immutable image versions, controlled pull permissions, and release traceability through the registry.',
      failure: 'container platforms run the wrong or inaccessible image because registry and release discipline are weak',
      decision: 'how the organization will publish, promote, and trust container images',
      incident: 'a critical rollout stalls because runtime identities cannot pull the approved image from ACR',
      evidence: ['registry push and pull history', 'image tags or digests in release logs', 'runtime authorization and deployment events'],
    },
  },
  {
    category: 'Azure DevOps',
    topicGroup: 'DevOps',
    concern: 'versioned delivery workflows and release evidence',
    relatedTopics: ['CI/CD', 'Infrastructure as Code'],
    profile: {
      mechanism: 'Azure DevOps connects source changes, build pipelines, artifact publishing, approvals, and release execution.',
      implementation: 'Keep pipeline logic in code and make approvals, rollback, and validation part of the normal release path.',
      failure: 'delivery becomes opaque because release decisions and pipeline behavior live in too many manual settings',
      decision: 'how code, infra, and release evidence move through the platform safely',
      incident: 'a production incident starts after a pipeline run, but the team cannot quickly reconstruct what changed and what artifact was deployed',
      evidence: ['pipeline history and logs', 'artifact provenance', 'approval and environment deployment records'],
    },
  },
  {
    category: 'CI/CD',
    topicGroup: 'DevOps',
    concern: 'build-once promotion and safe release automation',
    relatedTopics: ['Azure DevOps', 'App Service'],
    profile: {
      mechanism: 'CI/CD automates validation, artifact creation, infrastructure deployment, and controlled promotion into environments.',
      implementation: 'Build once, validate early, deploy repeatably, and tie release success to telemetry rather than to pipeline completion alone.',
      failure: 'staging and production drift because artifacts or infrastructure are not promoted consistently',
      decision: 'what release path gives enough speed without sacrificing reliability and auditability',
      incident: 'a pipeline is green but users see errors because environment-specific config or post-deploy validation was never part of the release design',
      evidence: ['artifact and deployment history', 'validation and smoke-test results', 'production telemetry after release'],
    },
  },
  {
    category: 'Infrastructure as Code',
    topicGroup: 'DevOps',
    concern: 'repeatable environment creation and drift control',
    relatedTopics: ['Azure DevOps', 'Enterprise Architecture'],
    profile: {
      mechanism: 'Infrastructure as Code defines Azure environments through reviewed templates instead of manual portal steps.',
      implementation: 'Capture network, identity, app, and monitoring resources in versioned code and deploy them through validated pipelines.',
      failure: 'support and recovery are slow because the environment exists partly in code and partly in memory',
      decision: 'what the source of truth for Azure infrastructure will be and how changes are governed',
      incident: 'the team needs to recreate an environment quickly but discovers key networking and access controls were created manually and never codified',
      evidence: ['template repository and deployment runs', 'drift or config differences', 'environment recreation and rollback history'],
    },
  },
  {
    category: 'Key Vault',
    topicGroup: 'Security',
    concern: 'centralized secret handling with identity-based access',
    relatedTopics: ['Managed Identity', 'RBAC'],
    profile: {
      mechanism: 'Key Vault centralizes secrets, keys, and certificates behind policy and identity checks.',
      implementation: 'Use workload identity, secret versioning, and tested rotation paths instead of copying sensitive values across apps and pipelines.',
      failure: 'credential handling remains brittle and insecure because secret ownership is fragmented',
      decision: 'how the organization will store, access, rotate, and audit sensitive values',
      incident: 'a credential rotates successfully in Key Vault but the application fails because reload behavior and permission testing were never built into the release process',
      evidence: ['vault access and secret version history', 'runtime authorization events', 'application logs around secret usage'],
    },
  },
  {
    category: 'Defender for Cloud',
    topicGroup: 'Security',
    concern: 'posture management and actionable security findings',
    relatedTopics: ['Key Vault', 'Enterprise Architecture'],
    profile: {
      mechanism: 'Defender for Cloud assesses Azure resources for posture gaps and security risks.',
      implementation: 'Tie findings to owners, remediation paths, and policy or IaC fixes rather than treating them as passive dashboards.',
      failure: 'security recommendations accumulate with no ownership and the same risky patterns keep reappearing',
      decision: 'how posture findings become part of engineering work instead of background noise',
      incident: 'a known cloud posture issue becomes a real incident because the recommendation was seen but never assigned or remediated',
      evidence: ['security recommendations and status', 'resource posture history', 'remediation and policy-change records'],
    },
  },
  {
    category: 'High Availability',
    topicGroup: 'Architecture',
    concern: 'zone-aware resilience and health-based failover',
    relatedTopics: ['Load Balancer', 'Disaster Recovery'],
    profile: {
      mechanism: 'Azure high availability combines redundancy, health detection, and failover behavior across compute, ingress, and data tiers.',
      implementation: 'Map user-facing SLOs to actual zones, instance counts, probe design, and dependency resilience before calling a system highly available.',
      failure: 'a single hidden dependency collapses the availability story under real traffic or failure',
      decision: 'what availability target the business needs and which Azure pattern can realistically meet it',
      incident: 'multiple app instances exist but an outage still happens because one secret, network path, or data tier was not resilient',
      evidence: ['availability and probe metrics', 'dependency maps and failover tests', 'incident and rollback timelines'],
    },
  },
  {
    category: 'Disaster Recovery',
    topicGroup: 'Architecture',
    concern: 'restore and failover readiness across larger-failure scenarios',
    relatedTopics: ['High Availability', 'Cost Optimization'],
    profile: {
      mechanism: 'Disaster recovery restores Azure workloads after major failure through backup, replication, secondary-region planning, and rehearsed recovery.',
      implementation: 'Choose DR patterns from RTO and RPO goals, then automate and test them with the dependencies that matter.',
      failure: 'backups exist but the real restore or failover path is too slow or incomplete for the business need',
      decision: 'which recovery pattern is justified for the workload and how much complexity it can support',
      incident: 'a serious platform failure reveals that backups are present but identity, DNS, or network dependencies were never part of the recovery plan',
      evidence: ['backup and replication status', 'restore drill results', 'runbooks and dependency inventories'],
    },
  },
  {
    category: 'Cost Optimization',
    topicGroup: 'Architecture',
    concern: 'balancing spend against reliability and workload value',
    relatedTopics: ['Blob Storage', 'Subscription Management'],
    profile: {
      mechanism: 'Azure cost optimization matches platform design and runtime usage to actual business value.',
      implementation: 'Use budgets, right-sizing, retention control, and service-selection reviews to reduce waste without breaking reliability.',
      failure: 'the platform becomes expensive because architecture and runtime usage are not revisited after launch',
      decision: 'which optimizations save money safely and which ones would create operational risk',
      incident: 'monthly spend spikes after logging, storage retention, or scaling changes were introduced without ongoing cost review',
      evidence: ['cost and usage reports', 'resource sizing and utilization metrics', 'tag and ownership coverage'],
    },
  },
  {
    category: 'Enterprise Architecture',
    topicGroup: 'Architecture',
    concern: 'landing zones, shared controls, and multi-team operating model',
    relatedTopics: ['Azure Architecture', 'Subscription Management'],
    profile: {
      mechanism: 'Enterprise Azure architecture standardizes how many teams build safely on one cloud platform.',
      implementation: 'Define landing zones, subscriptions, network topology, observability, identity, and delivery standards as reusable platform capabilities.',
      failure: 'every team builds Azure differently and the platform becomes expensive, insecure, and hard to support',
      decision: 'what platform controls belong centrally and what product teams can own independently',
      incident: 'an incident crosses multiple teams and no one can quickly identify whether the problem belongs to platform, network, identity, or product ownership',
      evidence: ['landing-zone standards', 'policy and platform inventories', 'cross-team incident and support history'],
    },
  },
  {
    category: 'Scenario Questions',
    topicGroup: 'Production Support',
    concern: 'workload trade-offs under realistic Azure constraints',
    relatedTopics: ['Architecture Questions', 'Troubleshooting'],
    profile: {
      mechanism: 'Azure scenario questions test how you combine service knowledge, risk thinking, and operational judgment.',
      implementation: 'Clarify the workload, then explain platform pattern, trade-offs, evidence, and fallback rather than jumping to one service.',
      failure: 'the answer sounds knowledgeable but ignores production constraints, ownership, or release risk',
      decision: 'which Azure pattern best satisfies the scenario’s user, security, and support needs',
      incident: 'an interview scenario exposes that a candidate can name services but cannot explain how they would keep the workload supportable',
      evidence: ['architecture options and reasoning', 'operational constraints', 'validation and rollback approach'],
    },
  },
  {
    category: 'Production Issues',
    topicGroup: 'Production Support',
    concern: 'incident isolation across identity, network, compute, and delivery boundaries',
    relatedTopics: ['Troubleshooting', 'CI/CD'],
    profile: {
      mechanism: 'Azure production issues usually span service boundaries, recent changes, and hidden dependencies rather than one broken toggle.',
      implementation: 'Scope the blast radius, isolate the Azure boundary, preserve evidence, and change the minimum needed to recover safely.',
      failure: 'incidents take longer because teams guess from the portal instead of following evidence and ownership',
      decision: 'which mitigation stabilizes users quickly without hiding the root cause',
      incident: 'support teams chase app logs for an hour before noticing the actual outage came from identity or network policy drift',
      evidence: ['user-impact and timeline data', 'platform logs and metrics', 'recent-change history'],
    },
  },
  {
    category: 'Architecture Questions',
    topicGroup: 'Production Support',
    concern: 'senior-level Azure design communication',
    relatedTopics: ['Scenario Questions', 'Enterprise Architecture'],
    profile: {
      mechanism: 'Architecture interview questions test whether you can justify Azure service choices through security, reliability, cost, and operations.',
      implementation: 'Answer by describing requirements, platform pattern, trade-offs, and why the solution stays manageable after launch.',
      failure: 'the recommendation sounds impressive but unsupported because no measurable operating model exists behind it',
      decision: 'which Azure architecture best balances quality attributes and team ownership',
      incident: 'a design review or interview goes poorly because the candidate never explains monitoring, recovery, or support implications',
      evidence: ['architecture goals and constraints', 'quality-attribute mapping', 'operational readiness plan'],
    },
  },
  {
    category: 'Troubleshooting',
    topicGroup: 'Production Support',
    concern: 'evidence-led diagnosis instead of portal guesswork',
    relatedTopics: ['Production Issues', 'Scenario Questions'],
    profile: {
      mechanism: 'Azure troubleshooting narrows failures by checking identity, network, deployment, workload, and dependency signals methodically.',
      implementation: 'Start from the symptom, then confirm scope, recent change, access path, and telemetry before changing the environment.',
      failure: 'engineers fix symptoms temporarily but cannot reproduce or prevent the real issue',
      decision: 'which hypothesis to test first and what the safest reversible mitigation is',
      incident: 'a production API is down and the team changes three settings before discovering the root cause was one recent network-policy update',
      evidence: ['service and platform telemetry', 'effective configuration state', 'deployment and change timeline'],
    },
  },
];

const intents: Intent[] = ['concept', 'implementation', 'troubleshooting', 'architecture'];

function questionText(intent: Intent, spec: TopicSpec) {
  if (intent === 'concept') {
    return `Explain ${spec.category} in Azure. Why does ${spec.concern} matter in real cloud engineering work?`;
  }
  if (intent === 'implementation') {
    return `How would you implement ${spec.category} in Azure so ${spec.concern} is handled safely in production?`;
  }
  if (intent === 'troubleshooting') {
    return `How would you troubleshoot an Azure production issue involving ${spec.category} when ${spec.profile.incident}?`;
  }
  return `How would you make an architecture decision about ${spec.category} in Azure when ${spec.concern} is critical for the workload?`;
}

function buildQuestion(spec: TopicSpec, intent: Intent, index: number): InterviewPrepQuestion {
  const industry = industries[hash(`${spec.category}-${intent}`) % industries.length];
  const directAnswer = intent === 'concept'
    ? `${spec.profile.mechanism} For ${spec.category}, the production-relevant concern is ${spec.concern}.`
    : intent === 'implementation'
      ? `In Azure, implement ${spec.category} so ${spec.concern} is controlled through platform settings, identity, monitoring, and repeatable deployment.`
      : intent === 'troubleshooting'
        ? `Treat ${spec.category} as a scoped Azure boundary, preserve evidence, and test identity, network, configuration, and recent-change hypotheses before applying broad fixes.`
        : `For Azure ${spec.category}, the design decision is ${spec.profile.decision}. The answer must balance security, reliability, cost, and operational ownership.`;

  return {
    id: `azure-${slugify(spec.category)}-${intent}`,
    technologyId: 'azure',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question: questionText(intent, spec),
    shortAnswer: `${directAnswer} Validate it with ${spec.profile.evidence[0]}.`,
    detailedAnswer: [
      `Direct answer: ${directAnswer}`,
      `What: ${spec.profile.mechanism}`,
      `Why: Azure teams care because ${spec.profile.failure}.`,
      `How: ${spec.profile.implementation}`,
      `Production validation: Prove the answer with ${list(spec.profile.evidence)}.`,
    ],
    productionScenario: `A ${industry} team on Azure is dealing with this signal: ${spec.profile.incident}. The engineer must explain how ${spec.category} influences the issue, isolate the likely boundary, and stabilize the workload without losing evidence.`,
    realProjectExample: `On a ${industry} platform, the team used Azure ${spec.category} to address ${spec.concern}. The design was only accepted after they proved the operating path with ${list(spec.profile.evidence)} and documented the owner for future incidents.`,
    interviewerExpectation: `The interviewer expects a concrete Azure answer that connects ${spec.category} to ${spec.concern}, explains the trade-offs, and shows how the team would verify the behavior in a live environment.`,
    commonMistakes: [
      `Giving a definition of ${spec.category} without explaining how it behaves in a real Azure workload.`,
      `Ignoring this Azure design choice: ${spec.profile.decision}.`,
      `Troubleshooting ${spec.category} by changing settings before collecting ${spec.profile.evidence[0]}.`,
      `Skipping ownership, policy, or monitoring implications for ${spec.category}.`,
    ],
    followUpQuestions: [
      `Which Azure dependency most changes your answer for ${spec.category}: identity, network, data, or delivery?`,
      `How would ${spec.profile.evidence[0]} and ${spec.profile.evidence[1]} prove your answer in production?`,
      `What is the safest rollback or mitigation if ${spec.profile.incident}?`,
      `At what scale or risk level would you revisit the ${spec.category} decision?`,
    ],
    frequencyScore: Math.max(68, (intent === 'concept' ? 93 : intent === 'implementation' ? 89 : intent === 'troubleshooting' ? 86 : 82) - (index % 8)),
    commonWrongAnswer: `A weak answer names Azure services but does not explain supportability, failure behavior, evidence, or ownership for ${spec.category}.`,
    architectPerspective: `Architects govern Azure ${spec.category} through this explicit decision: ${spec.profile.decision}. They evaluate the blast radius, operating model, policy boundary, recovery path, and user impact signal "${spec.profile.incident}".`,
    keyTakeaway: `Explain Azure ${spec.category} through the workload boundary, operating evidence, and decision trade-offs rather than only through service definitions.`,
    difficultyLevel: difficultyByIntent[intent],
    experienceLevel: experienceByIntent[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I can explain the purpose of Azure ${spec.category} and the safe baseline configuration.`,
      mid: `I can implement Azure ${spec.category} with repeatable deployment, access control, and monitoring.`,
      senior: `I can troubleshoot Azure ${spec.category} in production using ${list(spec.profile.evidence)} and recent-change analysis.`,
      architect: `I can choose and govern an Azure ${spec.category} pattern using ${spec.profile.decision}.`,
    },
    isMostAsked: index < 12,
    mostAskedRank: index < 12 ? index + 1 : undefined,
    isRapidRevision: index < 6,
  };
}

const questions = topicSpecs.flatMap((spec, specIndex) => intents.map((intent, intentIndex) => (
  buildQuestion(spec, intent, (specIndex * intents.length) + intentIndex)
)));

const topicGroups: InterviewPrepTopicGroup[] = azureInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in Microsoft Azure workloads.`,
  topics: group.topics.map((topic) => topic.category),
}));

const questionsPerPage = 10;

const topicMetadata = topicSpecs.map((spec) => {
  const topicQuestions = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    topicGroup: spec.topicGroup,
    totalQuestions: topicQuestions.length,
    estimatedPreparationMinutes: Math.max(18, Math.round(topicQuestions.length * 4.5)),
    questionsPerPage,
    totalPages: Math.ceil(topicQuestions.length / questionsPerPage),
    difficultyCounts: {
      Beginner: topicQuestions.filter((question) => question.difficultyLevel === 'Beginner').length,
      Intermediate: topicQuestions.filter((question) => question.difficultyLevel === 'Intermediate').length,
      Advanced: topicQuestions.filter((question) => question.difficultyLevel === 'Advanced').length,
      Architect: topicQuestions.filter((question) => question.difficultyLevel === 'Architect').length,
    },
  };
});

const topicPreparationSets = topicSpecs.map((spec) => {
  const ranked = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    mostAskedQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 12).map((question) => question.id),
    lastMinuteQuestionIds: ranked.slice(0, 5).map((question) => question.id),
  };
});

const productionScenarios = [
  {
    id: 'azure-key-vault-access-regression',
    title: 'Managed identity loses Key Vault access after release',
    topic: 'Managed Identity',
    problem: 'A production deployment succeeds but the application starts failing secret reads from Key Vault immediately after traffic switches.',
    rootCauseAnalysis: ['The managed identity or its role assignment changed between environments', 'The slot or runtime identity was not validated before cutover', 'The release depended on a secret path that was not covered in smoke tests'],
    troubleshootingSteps: ['Confirm the exact identity the workload is using', 'Check Key Vault access failures and role or policy state', 'Validate slot or environment configuration drift', 'Restore the last known-good identity path and add release validation'],
    expectedInterviewAnswer: 'The candidate should isolate identity, authorization, and release drift before changing application code or rotating more secrets.',
    seniorApproach: 'A senior answer includes blast-radius scoping, activity-log correlation, rollback criteria, and proof that the repaired access path matches the intended least-privilege model.',
    architectApproach: 'An architect strengthens managed-identity standards, secret access testing, and release policy so this class of outage is harder to repeat.',
    relatedQuestions: questions.filter((question) => question.category === 'Managed Identity').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'azure-private-network-outage',
    title: 'Private Azure dependency becomes unreachable after NSG change',
    topic: 'NSG',
    problem: 'An internal API cannot reach its database and storage dependencies after a network policy rollout.',
    rootCauseAnalysis: ['Outbound or subnet rules were changed without effective-rule validation', 'The team validated only inbound traffic paths', 'Network ownership between platform and product teams was unclear'],
    troubleshootingSteps: ['Scope which paths are failing', 'Review recent NSG and route changes', 'Validate effective security and actual dependency ports', 'Roll back the narrow network change and document the expected path'],
    expectedInterviewAnswer: 'The answer should show network-boundary thinking, effective-rule validation, and evidence-led rollback instead of broad service restarts.',
    seniorApproach: 'A senior answer correlates user impact, deployment history, NSG changes, connectivity tests, and post-fix prevention.',
    architectApproach: 'An architect standardizes network patterns, rule review, and ownership so security changes remain safe at scale.',
    relatedQuestions: questions.filter((question) => question.category === 'NSG').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'azure-app-service-slot-failure',
    title: 'Slot swap causes production regression',
    topic: 'App Service',
    problem: 'A slot swap completes successfully, but production traffic starts failing health checks within minutes.',
    rootCauseAnalysis: ['App settings or secret references differed between slots', 'Warm-up or dependency checks were incomplete', 'The team treated swap success as deployment success'],
    troubleshootingSteps: ['Check slot-specific settings and identity', 'Review dependency and startup telemetry', 'Swap back or route traffic away safely', 'Add post-swap health validation to the release pipeline'],
    expectedInterviewAnswer: 'The candidate should explain slot-specific drift, production validation, and fast reversible mitigation.',
    seniorApproach: 'A senior answer includes deployment evidence, backend dependency checks, rollback, and follow-up automation changes.',
    architectApproach: 'An architect turns slot policy, configuration management, and release validation into a standard platform pattern.',
    relatedQuestions: questions.filter((question) => question.category === 'App Service').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'azure-cost-and-backlog-spike',
    title: 'Function backlog and cloud spend spike together',
    topic: 'Functions',
    problem: 'Queue-driven Functions fall behind during a high-volume event and Azure spend rises sharply because retries and execution volume explode.',
    rootCauseAnalysis: ['Retry and poison-message design were incomplete', 'The event workload exceeded the current scaling and processing model', 'Teams were not watching queue age and execution cost together'],
    troubleshootingSteps: ['Stabilize the backlog and isolate failing message patterns', 'Inspect retries, execution duration, and downstream dependency limits', 'Adjust consumer behavior or dead-letter strategy', 'Revisit architecture and cost monitoring for the workflow'],
    expectedInterviewAnswer: 'The best answer treats it as both an operational and cost incident, not only a serverless scaling problem.',
    seniorApproach: 'A senior answer includes queue metrics, execution analysis, downstream bottlenecks, and safe replay strategy.',
    architectApproach: 'An architect rethinks async design, scaling policy, and cost guardrails so burst traffic does not turn into an uncontrolled failure mode.',
    relatedQuestions: questions.filter((question) => question.category === 'Functions').slice(0, 4).map((question) => question.id),
  },
];

export const azureInterviewPrep: InterviewPrepSection = {
  technologyId: 'azure',
  technologyLabel: 'Azure',
  title: 'Azure Interview Prep',
  description: 'Azure interview preparation focused on subscriptions, networking, identity, App Service, Functions, containers, delivery, recovery, cost, and enterprise cloud architecture.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Azure / Cloud Associate', years: '0-2 Years', summary: 'Explain Azure fundamentals, resource boundaries, networking basics, and core platform services.' },
    { id: 'mid', label: 'Azure Engineer', years: '2-5 Years', summary: 'Implement secure workloads, delivery flows, and platform integrations on Azure.' },
    { id: 'senior', label: 'Senior Azure / Cloud Engineer', years: '5-8 Years', summary: 'Lead troubleshooting, support incidents, and cross-service platform decisions.' },
    { id: 'architect', label: 'Azure Solution Architect', years: '8+ Years', summary: 'Design enterprise Azure landing zones, resilient architectures, and governance patterns.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Azure Associate', description: 'Resource model, App Service, storage, networking basics, and identity fundamentals.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'mid', label: 'Azure Engineer', description: 'Platform implementation, delivery workflows, storage, networking, and workload security.', questionCount: 10, recommendedMinutes: 35 },
    { id: 'senior', label: 'Senior Azure Engineer', description: 'Production incidents, troubleshooting, resilience, and cross-service design trade-offs.', questionCount: 10, recommendedMinutes: 45 },
    { id: 'architect', label: 'Azure Solution Architect', description: 'Landing zones, enterprise governance, resilience, cost, and architecture reviews.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-signal Azure boundaries, identity, networking, and delivery questions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Azure fundamentals, App Service, Functions, storage, VNet, and RBAC.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 24).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Azure preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 48).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
