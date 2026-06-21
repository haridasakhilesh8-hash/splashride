import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { azureInterviewPrepTopicGroups } from './topicNavigation';

type Intent = 'concept' | 'practical' | 'troubleshooting' | 'incident' | 'architecture';

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
  concerns: string[];
  relatedTopics: string[];
}

const commonConcerns = [
  'service responsibility and ownership',
  'implementation choices and trade-offs',
  'security and failure behavior',
  'production diagnosis with measurable evidence',
  'governance and cost control',
];

const categoryConcerns: Record<string, string[]> = {
  'Azure Basics': ['tenant and subscription boundaries', 'resource-provider awareness', 'region and service-selection fundamentals', 'tagging and governance baseline', 'cloud operating-model clarity'],
  'Azure Architecture': ['service composition by workload needs', 'identity and network boundaries', 'resilience and recovery design', 'platform supportability', 'architecture review trade-offs'],
  'Azure Regions': ['region selection criteria', 'data residency and compliance', 'paired-region thinking', 'service availability by region', 'regional outage planning'],
  'Availability Zones': ['zonal fault isolation', 'zone-aware deployment strategy', 'resilient network and compute placement', 'zone support by service', 'zonal cost and complexity trade-offs'],

  'Resource Groups': ['lifecycle and ownership boundaries', 'tagging and cleanup discipline', 'RBAC scope design', 'deployment grouping', 'cost visibility'],
  'Subscription Management': ['billing and quota boundaries', 'environment isolation', 'subscription-level policy', 'provider registration and limits', 'budget ownership'],
  'Management Groups': ['enterprise governance hierarchy', 'policy inheritance', 'subscription placement', 'shared standards across teams', 'blast-radius-aware control scopes'],
  'Azure Policy': ['deny versus audit controls', 'tagging and compliance guardrails', 'policy remediation', 'exemption handling', 'drift visibility'],
  'Landing Zones': ['baseline platform automation', 'network and identity standardization', 'subscription onboarding', 'security and logging defaults', 'enterprise cloud adoption patterns'],

  'Virtual Machines': ['OS ownership and patching', 'disk and backup design', 'availability sets or zones', 'VM access governance', 'runtime supportability'],
  'App Service': ['managed runtime fit', 'config and secret handling', 'slot-based release safety', 'ingress and networking', 'diagnostics and scaling'],
  'App Service Plans': ['pricing tier selection', 'performance isolation', 'multi-app plan sharing', 'scale-unit ownership', 'cost optimization'],
  'Deployment Slots': ['safe rollout patterns', 'slot-specific configuration', 'warm-up and smoke checks', 'rollback speed', 'release verification'],
  Functions: ['serverless execution boundaries', 'hosting plan trade-offs', 'cold starts and retries', 'dependency control', 'event-driven cost behavior'],
  'Function Triggers and Bindings': ['trigger fit by event source', 'binding convenience versus hidden coupling', 'retry and poison-message behavior', 'idempotency requirements', 'operational tracing'],
  'Durable Functions': ['workflow orchestration design', 'replay-safe coding', 'timeout and compensation strategy', 'long-running state visibility', 'serverless workflow observability'],
  'Container Apps': ['managed container runtime fit', 'revision-based rollouts', 'secret injection', 'ingress and autoscaling', 'container release safety'],

  'Blob Storage': ['object storage access patterns', 'lifecycle and tiering', 'network exposure', 'redundancy strategy', 'secure data delivery'],
  'Azure Files': ['shared filesystem fit', 'mount and auth behavior', 'hybrid workload support', 'backup and performance constraints', 'file-share operations'],
  Queues: ['asynchronous buffering', 'consumer retry strategy', 'dead-letter thinking', 'queue backlog visibility', 'workload decoupling'],
  Tables: ['partition and row key design', 'simple NoSQL fit', 'operational metadata usage', 'query constraint awareness', 'cost-effective storage patterns'],
  'Storage Accounts': ['account boundary design', 'network and access posture', 'service colocation trade-offs', 'diagnostic settings', 'naming and lifecycle governance'],
  'Storage Replication': ['LRS/ZRS/GRS/GZRS selection', 'recovery trade-offs', 'replication cost impact', 'read and failover behavior', 'durability planning'],

  'Azure SQL Database': ['managed relational service tier selection', 'private connectivity', 'backup and failover model', 'performance tuning', 'database operations'],
  'Azure Cosmos DB': ['partition key strategy', 'consistency model', 'RU cost control', 'global distribution fit', 'NoSQL workload design'],
  'Azure Cache for Redis': ['cache invalidation and TTL', 'session and coordination usage', 'failover behavior', 'hot-key and eviction risk', 'performance protection'],

  VNet: ['CIDR and subnet planning', 'private connectivity design', 'dependency path clarity', 'hybrid expansion readiness', 'network blast radius'],
  NSG: ['least-privilege traffic filtering', 'effective rule validation', 'subnet versus NIC scope', 'outbound dependency control', 'network troubleshooting'],
  'Load Balancer': ['health-probe design', 'backend pool resilience', 'L4 ingress fit', 'zone-aware traffic distribution', 'failover behavior'],
  'Application Gateway': ['L7 routing strategy', 'TLS termination', 'WAF-aware ingress', 'backend probe design', 'path and host-based rules'],
  'VNet Peering': ['hub-and-spoke connectivity', 'address-space planning', 'cross-team private reachability', 'centralized platform services', 'network scale-out simplicity'],
  'Private Endpoints': ['private PaaS connectivity', 'public endpoint restriction', 'DNS alignment', 'zero-trust networking', 'regulated workload fit'],
  'Private DNS': ['internal name resolution', 'private endpoint DNS flow', 'hybrid name-resolution design', 'zone ownership clarity', 'diagnostic investigation'],
  'Azure Firewall': ['centralized network inspection', 'egress control', 'routing through security hubs', 'rule governance', 'inspection cost and complexity'],
  'Azure Front Door': ['global entry and routing', 'edge acceleration', 'multi-region failover', 'WAF integration', 'origin protection'],

  'Azure AD': ['tenant identity design', 'app registration boundaries', 'token and auth flow behavior', 'human versus workload access', 'identity troubleshooting'],
  RBAC: ['least-privilege scope design', 'role assignment governance', 'subscription versus resource-group scope', 'custom versus built-in roles', 'auditability'],
  'Managed Identity': ['secretless workload authentication', 'role assignment path', 'service-to-service access', 'identity drift across environments', 'runtime auth troubleshooting'],

  AKS: ['cluster ownership trade-offs', 'node and workload identity design', 'upgrade and platform operations', 'cluster networking', 'managed Kubernetes governance'],
  ACR: ['container registry governance', 'image lifecycle and scanning', 'pull permissions', 'artifact retention', 'supply-chain hygiene'],

  'Azure DevOps': ['pipeline ownership and environment promotion', 'artifact traceability', 'release approvals', 'service connection governance', 'delivery observability'],
  'CI/CD': ['safe rollout mechanics', 'post-deploy verification', 'rollback discipline', 'environment drift control', 'quality gates'],
  'Infrastructure as Code': ['repeatable environment delivery', 'reviewable changes', 'parameter and secret handling', 'drift prevention', 'platform automation'],
  Bicep: ['Azure-native IaC reuse', 'module design', 'template readability', 'deployment pipeline fit', 'infrastructure review'],

  'Azure Service Bus': ['queue versus topic choice', 'message durability and retries', 'consumer isolation', 'dead-letter handling', 'async architecture design'],
  'Azure Event Grid': ['event routing and fanout', 'subscriber independence', 'event contract handling', 'delivery failure behavior', 'event-driven integration'],

  'Key Vault': ['secret and key governance', 'access control model', 'network restriction', 'secret rotation', 'application integration safety'],
  'Defender for Cloud': ['cloud posture visibility', 'recommendation triage', 'regulatory baseline support', 'security workflow integration', 'finding prioritization'],
  'Security Operations': ['security monitoring and response', 'identity and policy evidence', 'least-privilege operations', 'incident readiness', 'guardrail governance'],

  'Azure Monitor': ['metrics and alert design', 'platform-wide visibility', 'actionable alarm ownership', 'dashboard hygiene', 'service-health correlation'],
  'Log Analytics': ['centralized log investigation', 'KQL-driven diagnosis', 'retention strategy', 'cross-resource correlation', 'operational evidence gathering'],
  'Application Insights': ['request and dependency tracing', 'release-impact analysis', 'distributed telemetry', 'exception diagnosis', 'application performance investigation'],

  'High Availability': ['zone and regional resilience', 'redundancy and failover', 'dependency failure isolation', 'health-check design', 'availability target mapping'],
  'Disaster Recovery': ['RTO and RPO selection', 'backup and restore strategy', 'paired-region and failover planning', 'recovery testing', 'business continuity discipline'],
  'Cost Optimization': ['rightsizing and platform efficiency', 'storage and compute savings', 'reserved capacity trade-offs', 'cost-aware architecture', 'environment lifecycle cleanup'],
  'Cost Governance': ['ownership tags and budgets', 'anomaly investigation', 'shared-platform spend visibility', 'architecture cost reviews', 'FinOps collaboration'],
  'Enterprise Architecture': ['landing-zone and platform standards', 'identity and network governance', 'shared service boundaries', 'multi-team supportability', 'long-term cloud strategy'],

  'Incident Response': ['blast-radius scoping', 'evidence preservation', 'service-boundary isolation', 'safe mitigation choice', 'post-incident prevention'],
  'Performance Troubleshooting': ['latency decomposition', 'telemetry-led diagnosis', 'network versus app bottlenecks', 'quota and scaling analysis', 'data and cache investigation'],
  'Operational Excellence': ['runbooks and game days', 'monitoring with clear ownership', 'change management', 'automated recovery', 'operational readiness reviews'],
  'Scenario Questions': ['workload trade-offs under realistic constraints', 'architecture reasoning', 'service selection under pressure', 'supportability discussion', 'validation and rollback thinking'],
  'Production Issues': ['cross-service incident isolation', 'recent-change analysis', 'network identity compute and data boundaries', 'user-impact-first triage', 'safe recovery behavior'],
  'Architecture Questions': ['senior design communication', 'quality-attribute trade-offs', 'platform pattern choice', 'governance and operations clarity', 'long-term maintainability'],
  Troubleshooting: ['evidence-led diagnosis', 'effective configuration inspection', 'safe rollback choice', 'platform telemetry usage', 'root-cause isolation'],
};

const groupProfiles: Record<string, TopicProfile> = {
  Fundamentals: {
    mechanism: 'Azure fundamentals define how tenants, subscriptions, regions, and platform boundaries fit together in a cloud operating model.',
    implementation: 'Start from workload requirements, environment ownership, region fit, identity boundaries, and support expectations before selecting services.',
    failure: 'a foundational cloud assumption creates governance gaps, weak recovery posture, or unclear ownership',
    decision: 'which Azure platform boundary safely supports the workload, the team model, and the compliance expectations',
    incident: 'a production workload lands in the wrong region or boundary and the support team cannot prove compliance or recover safely',
    evidence: ['subscription and region inventory', 'platform standards and ADRs', 'governance and compliance evidence'],
  },
  Governance: {
    mechanism: 'Azure governance controls how subscriptions, resource groups, policies, and landing zones create repeatable cloud standards.',
    implementation: 'Design hierarchy, policy, ownership, and automation first so application teams inherit safe defaults rather than improvising them later.',
    failure: 'policy, billing, or access boundaries drift because governance exists only in documents and not in the platform itself',
    decision: 'which Azure control scope should own guardrails, exceptions, and long-term platform consistency',
    incident: 'a product team deploys successfully but later fails an audit because the subscription and policy baseline were never standardized',
    evidence: ['policy and hierarchy assignments', 'subscription and tag inventory', 'landing-zone and deployment history'],
  },
  Compute: {
    mechanism: 'Azure compute services run workload code across VMs, managed web runtimes, serverless functions, and managed containers with different operating models.',
    implementation: 'Choose compute from startup behavior, scaling needs, release model, networking, identity, and operations maturity.',
    failure: 'compute capacity, rollout safety, dependency wiring, or runtime assumptions fail under real traffic or release pressure',
    decision: 'which compute model balances control, elasticity, reliability, cost, and support burden',
    incident: 'traffic rises after a release and the compute layer becomes unstable because scaling, startup, or config behavior was not validated end to end',
    evidence: ['compute health and scaling metrics', 'deployment and runtime logs', 'dependency and ingress telemetry'],
  },
  Storage: {
    mechanism: 'Azure storage services expose object, file, queue, table, and account-level behaviors with different access, durability, and cost profiles.',
    implementation: 'Select storage from access pattern, lifecycle, redundancy, network exposure, and recovery requirements.',
    failure: 'storage lifecycle, access, or replication assumptions create exposure, cost growth, or unreliable application behavior',
    decision: 'which storage service and redundancy model best matches access semantics, recovery, and governance expectations',
    incident: 'a storage workload becomes expensive and hard to audit because access paths and retention rules were never governed properly',
    evidence: ['storage access and lifecycle metrics', 'replication and network configuration', 'cost and retention reports'],
  },
  Data: {
    mechanism: 'Azure data services trade relational consistency, NoSQL partitioning, and caching behavior differently based on workload design.',
    implementation: 'Model data access patterns, performance, recovery, networking, and scaling before choosing the service and tier.',
    failure: 'a partitioning, failover, query, or cache assumption becomes the dominant bottleneck under load',
    decision: 'which data model and managed service best fits consistency, scale, recovery, and cost expectations',
    incident: 'API latency spikes because the real bottleneck is in the data tier and the team cannot prove whether it is query, cache, or throughput related',
    evidence: ['database and cache telemetry', 'query and dependency traces', 'capacity and failover history'],
  },
  Networking: {
    mechanism: 'Azure networking connects workloads through virtual networks, ingress, private endpoints, DNS, and centralized security controls.',
    implementation: 'Design CIDR, routing, ingress, private access, DNS, and inspection points before application deployment.',
    failure: 'a route, firewall, DNS, or private access assumption blocks traffic or creates unintended exposure',
    decision: 'which network boundary and connectivity pattern gives secure reachability with controlled blast radius and supportability',
    incident: 'a private workload loses database or secret access after a network-policy or DNS change during deployment',
    evidence: ['network configuration and effective routes', 'DNS and connectivity test results', 'flow logs and change history'],
  },
  Identity: {
    mechanism: 'Azure identity uses Azure AD, RBAC, and workload identity to control who and what can access cloud resources.',
    implementation: 'Separate human and workload access, assign least privilege deliberately, and validate the runtime auth path end to end.',
    failure: 'permissions either block critical operations or create broad blast radius because scope and identity design were careless',
    decision: 'which identities exist, what they can access, and how their permissions are governed safely over time',
    incident: 'an application deployment succeeds but production access fails because the managed identity or RBAC scope differs from the expected design',
    evidence: ['role assignment and identity inventory', 'sign-in or access traces', 'authorization and activity logs'],
  },
  Containers: {
    mechanism: 'Azure container platforms run images on AKS and other managed surfaces with different cluster, registry, identity, and operations responsibilities.',
    implementation: 'Define image supply chain, identity model, rollout safety, networking, and scaling before the container platform becomes production-critical.',
    failure: 'container health, image, identity, or networking assumptions break deployment or runtime reliability',
    decision: 'which container platform and operations model fit team skill, control, compliance, and scale',
    incident: 'a container rollout passes CI but every workload instance fails health checks in production because runtime configuration drift was missed',
    evidence: ['deployment and container events', 'registry and image metadata', 'network and health telemetry'],
  },
  DevOps: {
    mechanism: 'Azure DevOps and IaC workflows define artifact promotion, infrastructure delivery, rollout controls, and rollback safety.',
    implementation: 'Use reviewed IaC, immutable artifacts, environment promotion, deployment validation, and drift prevention as one delivery system.',
    failure: 'a release or infrastructure change breaks production because environment differences or rollback triggers were never modeled',
    decision: 'how infrastructure, artifacts, approvals, rollout, and recovery are governed together',
    incident: 'a pipeline deploys successfully but the environment fails because configuration, identity, or dependency behavior drifted from review assumptions',
    evidence: ['pipeline and deployment logs', 'artifact and template provenance', 'environment diff and rollback history'],
  },
  Messaging: {
    mechanism: 'Azure messaging services decouple producers and consumers through durable queues, topics, and event routing patterns.',
    implementation: 'Choose the delivery pattern from ordering, independence, retry, and failure-isolation needs, then make backlog visibility explicit.',
    failure: 'unbounded retries, dead-letter blind spots, or event contract drift create duplicate work or silent message loss',
    decision: 'which async pattern provides the required ordering, durability, fanout, and recovery behavior',
    incident: 'message backlog grows rapidly after a dependency slowdown and the team cannot tell whether retry behavior or consumer design is the main problem',
    evidence: ['backlog and delivery telemetry', 'consumer failure logs', 'message routing and retry configuration'],
  },
  Security: {
    mechanism: 'Azure security combines identity, policy, secret management, posture monitoring, and response readiness to protect workloads.',
    implementation: 'Apply least privilege, secure secrets, restrict exposure, centralize evidence, and make guardrails enforceable instead of optional.',
    failure: 'a permissive identity, exposed secret, weak policy, or ignored security signal allows unauthorized access or weakens cloud posture',
    decision: 'where identity, policy, key, and security-operations ownership belong',
    incident: 'a workload runs normally until a security review shows that secret access, public exposure, and monitoring controls are weaker than assumed',
    evidence: ['security findings and activity logs', 'secret and access configuration', 'policy and monitoring state'],
  },
  Observability: {
    mechanism: 'Azure observability combines metrics, logs, traces, and application telemetry to explain workload health and user impact.',
    implementation: 'Define actionable alarms, preserve useful logs, trace critical paths, and connect dashboards to service objectives and release validation.',
    failure: 'missing telemetry, noisy alarms, or incomplete traces delay incident recovery and make performance tuning guesswork',
    decision: 'which signals prove availability, performance, security, and ownership for the workload',
    incident: 'an API slows down but teams cannot isolate whether the latency is in ingress, compute, data, or dependencies',
    evidence: ['metrics and alert history', 'log and trace evidence', 'release and dependency correlation data'],
  },
  Architecture: {
    mechanism: 'Azure architecture applies platform, reliability, security, performance, and cost trade-offs across subscriptions, services, and operating models.',
    implementation: 'Make quality attributes measurable, isolate failure domains, automate recovery, and align service choices with business risk and team ownership.',
    failure: 'a platform or workload design fails scale, recovery, or cost expectations because the operating model was too weak',
    decision: 'which Azure architecture pattern meets availability, recovery, security, scale, cost, and long-term support goals',
    incident: 'a client-facing platform experiences repeated instability because resilience and governance were documented but never made operationally real',
    evidence: ['architecture decision records', 'failover and game-day evidence', 'cost and reliability dashboards'],
  },
  'Production Support': {
    mechanism: 'Azure production support connects user symptoms to service metrics, logs, traces, effective configuration, and recent changes.',
    implementation: 'Stabilize with the smallest reversible mitigation, preserve evidence, isolate the Azure boundary, and add durable prevention.',
    failure: 'a symptom-only restart or broad configuration change destroys evidence and leaves the root cause unresolved',
    decision: 'which mitigation restores service while preserving evidence, limiting blast radius, and keeping recovery safe',
    incident: 'latency, errors, and deployment risk rise together while multiple Azure services show partial degradation signals',
    evidence: ['platform and application telemetry', 'effective configuration state', 'change and deployment timeline'],
  },
};

const categoryOverrides: Record<string, Partial<TopicProfile>> = {
  'Managed Identity': {
    mechanism: 'Managed Identity gives Azure workloads a platform-managed identity for token-based access to Azure services without storing static secrets.',
    incident: 'a deployment removes static secrets but the application still cannot read from Key Vault because the runtime identity path is only partially configured',
    evidence: ['identity enablement and role data', 'runtime access failures', 'target service authorization logs'],
  },
  NSG: {
    mechanism: 'NSGs filter Azure traffic using prioritized rules at subnet and NIC scope so workloads receive only the network paths they are meant to use.',
    incident: 'an internal service loses dependency access after a release because one outbound NSG rule changed unexpectedly',
    evidence: ['effective NSG rules', 'connectivity tests and flow logs', 'deployment and change history'],
  },
  'App Service': {
    mechanism: 'App Service is a managed web-app runtime that handles hosting, configuration, scaling, deployment slots, and diagnostics abstractions for Azure applications.',
    incident: 'a slot swap completes but production starts failing because app settings, secret access, or startup dependencies differed between slots',
    evidence: ['slot and app setting diff', 'request and dependency telemetry', 'deployment logs and health checks'],
  },
  Functions: {
    mechanism: 'Azure Functions executes code on triggers such as HTTP, queues, timers, and events with hosting-plan and retry behavior that shape runtime outcomes.',
    incident: 'a queue-driven function workload falls behind for hours because retries, poison-message handling, and execution cost were not designed together',
    evidence: ['function execution metrics', 'queue depth and retry data', 'hosting-plan latency and failure telemetry'],
  },
  'Private Endpoints': {
    mechanism: 'Private Endpoints map Azure platform services into private VNet address space so applications can reach PaaS services without relying on public exposure.',
    incident: 'a private data or secret dependency becomes unreachable because DNS still points to the public endpoint while the application expects private access',
    evidence: ['private endpoint state', 'DNS resolution results', 'network and access logs'],
  },
  'Azure SQL Database': {
    mechanism: 'Azure SQL Database is a managed relational data service where the team still owns workload fit, performance, networking, backup expectations, and failover behavior.',
  },
  'Azure Cosmos DB': {
    mechanism: 'Azure Cosmos DB is a globally distributed NoSQL service whose partitioning, consistency, and RU consumption must be designed deliberately around access patterns.',
  },
  'Azure Cost Governance': {
    mechanism: 'Cost Governance is the operating practice of keeping Azure spend aligned with business value through ownership, budgets, tagging, architecture reviews, and anomaly investigation.',
    incident: 'cloud spend rises sharply and no team can quickly explain whether the driver is idle capacity, data transfer, storage growth, or scaling behavior',
    evidence: ['budget and anomaly reports', 'tag and ownership inventory', 'architecture and usage breakdown'],
  },
};

const topicSpecs: TopicSpec[] = azureInterviewPrepTopicGroups.flatMap((group) => group.topics.map((topic, index, topics) => ({
  category: topic.category,
  topicGroup: group.title,
  concerns: categoryConcerns[topic.category] ?? commonConcerns,
  relatedTopics: [
    topics[(index + 1) % topics.length]?.slug,
    topics[(index + topics.length - 1) % topics.length]?.slug,
    group.id,
  ].filter(Boolean),
})));

const intents: Intent[] = ['concept', 'practical', 'troubleshooting', 'incident', 'architecture'];
const intentTypes: Record<Intent, string> = {
  concept: 'Conceptual Questions',
  practical: 'Practical Questions',
  troubleshooting: 'Troubleshooting Questions',
  incident: 'Production Support Questions',
  architecture: 'Architecture Questions',
};
const difficulties: Record<Intent, InterviewPrepQuestion['difficultyLevel']> = {
  concept: 'Beginner',
  practical: 'Intermediate',
  troubleshooting: 'Advanced',
  incident: 'Advanced',
  architecture: 'Architect',
};
const experiences: Record<Intent, InterviewPrepQuestion['experienceLevel']> = {
  concept: 'beginner',
  practical: 'mid',
  troubleshooting: 'senior',
  incident: 'senior',
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

function buildProfile(category: string, topicGroup: string, concerns: string[]): TopicProfile {
  const base = groupProfiles[topicGroup] ?? groupProfiles.Fundamentals;
  const override = categoryOverrides[category] ?? {};
  const concernList = concerns.slice(0, 3);

  return {
    mechanism: override.mechanism ?? `${base.mechanism} For ${category}, the critical concerns are ${list(concernList)}.`,
    implementation: override.implementation ?? `${base.implementation} For ${category}, make the design repeatable around ${list(concernList)}.`,
    failure: override.failure ?? `${base.failure}, especially when ${list(concernList)} are treated as afterthoughts.`,
    decision: override.decision ?? `${base.decision}, especially around ${list(concernList)}.`,
    incident: override.incident ?? `${base.incident} and ${category} becomes the most likely Azure boundary to inspect first`,
    evidence: override.evidence ?? base.evidence,
  };
}

function questionText(intent: Intent, spec: TopicSpec, concern: string) {
  if (intent === 'concept') {
    return `Explain ${spec.category} in Azure. Why does ${concern} matter in real cloud engineering work?`;
  }
  if (intent === 'practical') {
    return `How would you implement ${spec.category} in Azure so ${concern} is handled safely in production?`;
  }
  if (intent === 'troubleshooting') {
    return `How would you troubleshoot an Azure production issue involving ${spec.category} when ${concern} becomes the suspected boundary?`;
  }
  if (intent === 'incident') {
    return `During an Azure incident, how would you contain and recover around ${spec.category} when ${concern} is contributing to user impact?`;
  }
  return `How would you make an architecture decision about ${spec.category} in Azure when ${concern} is critical for the workload?`;
}

function buildQuestion(spec: TopicSpec, concern: string, intent: Intent, index: number): InterviewPrepQuestion {
  const profile = buildProfile(spec.category, spec.topicGroup, spec.concerns);
  const industry = industries[hash(`${spec.category}-${concern}-${intent}`) % industries.length];
  const directAnswer = intent === 'concept'
    ? `${profile.mechanism} For ${spec.category}, the production-relevant concern is ${concern}.`
    : intent === 'practical'
      ? `In Azure, implement ${spec.category} so ${concern} is controlled through platform settings, identity, monitoring, and repeatable deployment.`
      : intent === 'troubleshooting'
        ? `Treat ${spec.category} as a scoped Azure boundary, preserve evidence, and test identity, network, configuration, and recent-change hypotheses before applying broad fixes.`
        : intent === 'incident'
          ? `Use the smallest reversible mitigation around ${spec.category}, protect evidence, and contain the blast radius while user impact is being reduced.`
          : `For Azure ${spec.category}, the design decision is ${profile.decision}. The answer must balance security, reliability, cost, and operational ownership.`;

  return {
    id: `azure-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'azure',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question: questionText(intent, spec, concern),
    shortAnswer: `${directAnswer} Validate it with ${profile.evidence[0]}.`,
    detailedAnswer: [
      `Direct answer: ${directAnswer}`,
      `What: ${profile.mechanism}`,
      `Why: Azure teams care because ${profile.failure}.`,
      `How: ${profile.implementation}`,
      `Production validation: Prove the answer with ${list(profile.evidence)}.`,
    ],
    productionScenario: `A ${industry} team on Azure is facing this production signal: ${profile.incident}. The engineer must explain how ${spec.category} influences the issue, isolate the likely Azure boundary, and stabilize the workload without losing evidence.`,
    realProjectExample: `On a ${industry} platform, the team used Azure ${spec.category} to address ${concern}. The design was only accepted after they proved the operating path with ${list(profile.evidence)} and documented the owner for future incidents.`,
    interviewerExpectation: `The interviewer expects a concrete Azure answer that connects ${spec.category} to ${concern}, explains the trade-offs, and shows how the team would verify the behavior in a live environment.`,
    commonMistakes: [
      `Giving a definition of ${spec.category} without explaining how it behaves in a real Azure workload.`,
      `Ignoring this Azure design choice: ${profile.decision}.`,
      `Troubleshooting ${spec.category} by changing settings before collecting ${profile.evidence[0]}.`,
      `Skipping ownership, policy, or monitoring implications for ${spec.category}.`,
    ],
    followUpQuestions: [
      `Which Azure dependency most changes your answer for ${spec.category}: identity, network, data, or delivery?`,
      `How would ${profile.evidence[0]} and ${profile.evidence[1]} prove your answer in production?`,
      `What is the safest rollback or mitigation if ${profile.incident}?`,
      `At what scale or risk level would you revisit the ${spec.category} decision?`,
    ],
    frequencyScore: Math.max(66, (intent === 'concept' ? 94 : intent === 'practical' ? 90 : intent === 'troubleshooting' ? 86 : intent === 'incident' ? 84 : 82) - (index % 9)),
    commonWrongAnswer: `A weak answer names Azure services but does not explain supportability, failure behavior, evidence, or ownership for ${spec.category}.`,
    architectPerspective: `Architects govern Azure ${spec.category} through this explicit decision: ${profile.decision}. They evaluate the blast radius, operating model, policy boundary, recovery path, and user impact signal "${profile.incident}".`,
    keyTakeaway: `Explain Azure ${spec.category} through the workload boundary, operating evidence, and decision trade-offs rather than only through service definitions.`,
    difficultyLevel: difficulties[intent],
    experienceLevel: experiences[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I can explain the purpose of Azure ${spec.category} and the safe baseline configuration around ${concern}.`,
      mid: `I can implement Azure ${spec.category} with repeatable deployment, access control, and monitoring for ${concern}.`,
      senior: `I can troubleshoot Azure ${spec.category} in production using ${list(profile.evidence)} and recent-change analysis.`,
      architect: `I can choose and govern an Azure ${spec.category} pattern using ${profile.decision}.`,
    },
    isMostAsked: index < 60,
    mostAskedRank: index < 60 ? index + 1 : undefined,
    isRapidRevision: index < 20,
  };
}

const questions = topicSpecs.flatMap((spec) => (
  spec.concerns.flatMap((concern, concernIndex) => (
    intents.map((intent, intentIndex) => (
      buildQuestion(spec, concern, intent, (topicSpecs.indexOf(spec) * 25) + (concernIndex * intents.length) + intentIndex)
    ))
  ))
));

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
    estimatedPreparationMinutes: Math.max(20, Math.round(topicQuestions.length * 3.5)),
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
    mostAskedQuestionIds: ranked.slice(0, 12).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 10).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 18).map((question) => question.id),
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
    relatedQuestions: questions.filter((question) => question.category === 'Managed Identity').slice(0, 6).map((question) => question.id),
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
    relatedQuestions: questions.filter((question) => question.category === 'NSG').slice(0, 6).map((question) => question.id),
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
    relatedQuestions: questions.filter((question) => question.category === 'App Service').slice(0, 6).map((question) => question.id),
  },
  {
    id: 'azure-private-endpoint-dns-drift',
    title: 'Private endpoint works in one environment and fails in another',
    topic: 'Private Endpoints',
    problem: 'A workload can reach its private database in staging but fails name resolution and connectivity in production after a network change.',
    rootCauseAnalysis: ['Private DNS linking differs between environments', 'The application resolves the public endpoint unexpectedly', 'Network and DNS ownership were split without end-to-end verification'],
    troubleshootingSteps: ['Test name resolution from the actual workload', 'Inspect private DNS zone links and endpoint records', 'Review public endpoint exposure and routing expectations', 'Correct the DNS and endpoint model before making broader network changes'],
    expectedInterviewAnswer: 'The best answer should connect private endpoint design to DNS behavior, not treat connectivity as only a firewall problem.',
    seniorApproach: 'A senior answer traces the dependency path from application name resolution through private networking and verifies the effective path with evidence.',
    architectApproach: 'An architect standardizes private endpoint plus DNS patterns so product teams inherit a known-good design.',
    relatedQuestions: questions.filter((question) => question.category === 'Private Endpoints').slice(0, 6).map((question) => question.id),
  },
  {
    id: 'azure-cost-anomaly-shared-platform',
    title: 'Azure spend spikes but no team owns the anomaly',
    topic: 'Cost Governance',
    problem: 'Monthly Azure spend rises sharply across shared subscriptions, and multiple teams argue the increase came from someone else’s workloads.',
    rootCauseAnalysis: ['Tagging and ownership standards are incomplete', 'A shared platform service scaled or retained data unexpectedly', 'Cost review is disconnected from architecture and environment lifecycle discipline'],
    troubleshootingSteps: ['Identify the highest-spend subscriptions, services, and tags', 'Correlate the change with traffic, retention, or deployment patterns', 'Assign a clear owner for the dominant spend driver', 'Fix the architecture or governance gap and add anomaly alerts'],
    expectedInterviewAnswer: 'The answer should treat cost as an architecture and governance incident, not only a billing report exercise.',
    seniorApproach: 'A senior answer includes anomaly investigation, service-level breakdown, ownership mapping, and a practical containment plan.',
    architectApproach: 'An architect strengthens tagging, budgeting, shared-service standards, and cost review habits so spend becomes attributable and governable.',
    relatedQuestions: questions.filter((question) => question.category === 'Cost Governance').slice(0, 6).map((question) => question.id),
  },
];

export const azureInterviewPrep: InterviewPrepSection = {
  technologyId: 'azure',
  technologyLabel: 'Azure',
  title: 'Azure Interview Prep',
  description: 'Azure interview preparation focused on governance, networking, identity, App Service, Functions, messaging, observability, production support, and enterprise cloud architecture.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Azure / Cloud Associate', years: '0-2 Years', summary: 'Explain Azure fundamentals, governance, networking basics, and core platform services.' },
    { id: 'mid', label: 'Azure Engineer', years: '2-5 Years', summary: 'Implement secure workloads, delivery flows, observability, and platform integrations on Azure.' },
    { id: 'senior', label: 'Senior Azure / Cloud Engineer', years: '5-8 Years', summary: 'Lead troubleshooting, production incidents, reliability work, and cross-service platform decisions.' },
    { id: 'architect', label: 'Azure Solution Architect', years: '8+ Years', summary: 'Design landing zones, enterprise Azure platforms, resilience models, and long-term governance patterns.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Azure Associate', description: 'Azure boundaries, storage, networking basics, and identity fundamentals.', questionCount: 12, recommendedMinutes: 30 },
    { id: 'mid', label: 'Azure Engineer', description: 'Platform implementation, delivery workflows, observability, and secure workload operation.', questionCount: 14, recommendedMinutes: 40 },
    { id: 'senior', label: 'Senior Azure Engineer', description: 'Production incidents, troubleshooting, resilience, cost, and cross-service trade-offs.', questionCount: 14, recommendedMinutes: 50 },
    { id: 'architect', label: 'Azure Solution Architect', description: 'Landing zones, enterprise governance, multi-region thinking, resilience, and architecture reviews.', questionCount: 12, recommendedMinutes: 60 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-signal Azure boundaries, identity, networking, and production-support questions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 20).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Azure fundamentals, governance, App Service, Functions, VNet, RBAC, and observability.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 40).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Azure preparation across reliability, networking, identity, and governance.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 80).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
