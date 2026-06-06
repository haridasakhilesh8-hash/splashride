import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { kubernetesInterviewPrepTopicGroups } from './topicNavigation';

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
  'ownership and responsibility boundaries',
  'implementation choices and trade-offs',
  'security and failure behavior',
  'production diagnosis with measurable evidence',
  'enterprise governance and maintainability',
];

const categoryConcerns: Record<string, string[]> = {
  'Kubernetes Basics': ['declarative desired state', 'API object model', 'reconciliation loop', 'namespace and label strategy', 'container orchestration responsibilities'],
  'Cluster Architecture': ['control plane and worker separation', 'etcd durability', 'cluster networking model', 'managed versus self-managed clusters', 'upgrade and version skew planning'],
  'Control Plane': ['API server responsibility', 'scheduler placement decisions', 'controller manager reconciliation', 'etcd backup and quorum', 'control plane availability'],
  'Worker Nodes': ['kubelet responsibility', 'container runtime integration', 'kube-proxy behavior', 'node conditions and taints', 'node resource pressure'],

  Pods: ['pod as smallest scheduling unit', 'sidecar and init container patterns', 'readiness liveness and startup probes', 'resource requests and limits', 'pod disruption handling'],
  ReplicaSets: ['replica reconciliation', 'selector immutability', 'ReplicaSet versus Deployment ownership', 'orphaned ReplicaSets', 'scale-down behavior'],
  Deployments: ['rolling update strategy', 'revision history and rollback', 'readiness gates during rollout', 'surge and unavailable settings', 'deployment failure diagnosis'],
  StatefulSets: ['stable identity and ordered rollout', 'volume claim templates', 'headless service usage', 'stateful scaling risk', 'database workload fit'],
  DaemonSets: ['node-level workload placement', 'logging and agent patterns', 'taints and tolerations', 'rolling updates for node agents', 'daemon resource overhead'],
  Jobs: ['completion and retry semantics', 'backoff limits', 'idempotent batch design', 'job cleanup', 'parallel job execution'],
  CronJobs: ['schedule reliability', 'concurrency policy', 'missed schedule handling', 'time zone and clock behavior', 'history and cleanup limits'],

  Services: ['ClusterIP NodePort and LoadBalancer selection', 'selector and endpoint behavior', 'session affinity trade-offs', 'external traffic policy', 'service debugging'],
  Ingress: ['ingress controller responsibility', 'TLS termination and routing', 'path and host rule design', 'ingress versus service boundary', 'Gateway API migration awareness'],
  DNS: ['CoreDNS resolution flow', 'service and pod DNS names', 'search path behavior', 'DNS cache and latency', 'CoreDNS failure diagnosis'],
  'Network Policies': ['default allow versus default deny', 'pod selector and namespace selector behavior', 'egress control', 'CNI support requirements', 'policy testing'],
  'Service Discovery': ['label selector discovery', 'EndpointSlice behavior', 'headless services', 'cross-namespace discovery', 'service mesh interaction'],

  'Persistent Volumes': ['PV lifecycle and reclaim policy', 'access modes', 'binding modes', 'volume expansion', 'snapshot and restore planning'],
  PVC: ['claim binding behavior', 'requested capacity and access mode', 'PVC pending diagnosis', 'application ownership of claims', 'claim migration'],
  'Storage Classes': ['dynamic provisioning', 'volumeBindingMode selection', 'default StorageClass risk', 'topology-aware storage', 'cost and performance classes'],
  'CSI Drivers': ['CSI provisioning responsibility', 'driver health and compatibility', 'volume attach detach failures', 'snapshot support', 'cloud provider integration'],

  ConfigMaps: ['configuration externalization', 'mounted versus environment config', 'rollout trigger behavior', 'config drift', 'large configuration risk'],
  Secrets: ['Secret object limitations', 'base64 misconception', 'encryption at rest', 'secret rotation', 'external secrets integration'],
  'Environment Variables': ['env injection patterns', 'Downward API usage', 'immutable env after start', 'secret exposure through env', 'configuration precedence'],

  HPA: ['metrics-based scaling', 'CPU versus custom metrics', 'stabilization windows', 'scaling delay and readiness', 'HPA with resource requests'],
  VPA: ['recommendation versus auto mode', 'eviction impact', 'VPA and HPA interaction', 'rightsizing workloads', 'production adoption risk'],
  'Cluster Autoscaler': ['node group scale-out and scale-in', 'unschedulable pod detection', 'pod disruption and scale-down', 'capacity buffer strategy', 'cloud quota constraints'],

  RBAC: ['role and cluster role scope', 'least privilege bindings', 'verb resource and namespace boundaries', 'privilege escalation risk', 'access review'],
  'Service Accounts': ['pod identity boundary', 'automount token control', 'cloud workload identity', 'token rotation', 'service account sprawl'],
  'Pod Security': ['Pod Security Standards', 'restricted baseline and privileged modes', 'securityContext ownership', 'hostPath and hostNetwork risk', 'admission control'],
  'Network Security': ['namespace isolation', 'egress restrictions', 'ingress controller exposure', 'service mesh mTLS boundary', 'CNI enforcement'],
  'Secrets Management': ['external secrets pattern', 'rotation and reload', 'sealed secrets trade-offs', 'secret access auditing', 'credential blast radius'],

  Logging: ['stdout stderr contract', 'node log collection', 'structured log correlation', 'log retention and cost', 'missing logs after restart'],
  Monitoring: ['cluster and workload SLOs', 'resource saturation metrics', 'control plane metrics', 'alert quality', 'golden signal dashboards'],
  Prometheus: ['scrape targets and service discovery', 'PromQL alerting', 'label cardinality', 'recording rules', 'Prometheus HA and retention'],
  Grafana: ['dashboard ownership', 'SLO visualization', 'drill-down workflows', 'multi-cluster views', 'dashboard drift'],
  'Metrics Server': ['resource metrics pipeline', 'HPA dependency', 'metrics-server failure impact', 'kubectl top limitations', 'metrics freshness'],

  'Helm Basics': ['templating versus release management', 'values layering', 'chart dependency ownership', 'Helm versus raw manifests', 'release lifecycle'],
  Charts: ['chart structure', 'values schema validation', 'template safety', 'library chart reuse', 'chart versioning'],
  Releases: ['release history', 'upgrade behavior', 'atomic installs', 'diff and dry-run workflow', 'environment-specific values'],
  Rollbacks: ['rollback limitations', 'stateful rollback risk', 'hook behavior', 'schema migration coordination', 'post-rollback validation'],

  GitOps: ['desired state in Git', 'pull-based reconciliation', 'drift detection', 'promotion workflow', 'human approval model'],
  ArgoCD: ['application sync policies', 'health and sync status', 'app of apps pattern', 'sync waves and hooks', 'RBAC and multi-tenancy'],
  Flux: ['source and kustomization controllers', 'reconciliation intervals', 'image automation', 'multi-cluster GitOps', 'failure diagnosis'],
  'Deployment Strategies': ['rolling blue-green and canary', 'progressive delivery signals', 'rollback triggers', 'traffic shifting', 'database migration safety'],

  CrashLoopBackOff: ['exit code diagnosis', 'probe-induced restarts', 'missing config or secret', 'dependency startup failure', 'backoff behavior'],
  'Pending Pods': ['scheduler constraints', 'resource requests and capacity', 'taints tolerations and affinity', 'PVC binding delays', 'quota and limit range failures'],
  ImagePullBackOff: ['registry authentication', 'image tag or digest errors', 'pull policy behavior', 'registry outage response', 'private registry secret scope'],
  'Node Failures': ['node NotReady diagnosis', 'kubelet and runtime health', 'node pressure eviction', 'zone failure impact', 'workload rescheduling'],
  'Networking Issues': ['service endpoint mismatch', 'DNS failure', 'network policy denial', 'ingress controller routing', 'CNI health'],

  'Incident Response': ['blast radius scoping', 'kubectl evidence collection', 'rollback versus mitigation', 'customer impact measurement', 'post-incident action items'],
  'Performance Analysis': ['latency decomposition', 'CPU memory and IO saturation', 'scheduler and control plane delay', 'service mesh overhead', 'application versus platform bottleneck'],
  'Resource Optimization': ['requests and limits tuning', 'QoS classes', 'namespace quotas', 'right-sizing with metrics', 'cost-aware scheduling'],
  'Capacity Planning': ['node pool sizing', 'growth forecasting', 'bin packing and overcommit', 'quota and cloud limits', 'headroom and failover capacity'],

  'Multi-Cluster Design': ['cluster boundary selection', 'multi-region traffic routing', 'fleet governance', 'workload placement', 'operational complexity'],
  'High Availability': ['control plane HA', 'multi-zone node pools', 'pod disruption budgets', 'dependency failure isolation', 'safe rollout design'],
  'Disaster Recovery': ['etcd backup and restore', 'application data recovery', 'cluster rebuild automation', 'RTO and RPO mapping', 'DR game days'],
  'Platform Engineering': ['golden path design', 'self-service guardrails', 'multi-tenant isolation', 'developer experience', 'platform operating model'],
};

const groupProfiles: Record<string, TopicProfile> = {
  Fundamentals: {
    mechanism: 'Kubernetes exposes a declarative API where controllers continuously reconcile desired state into running workloads across nodes.',
    implementation: 'Model ownership boundaries, labels, namespaces, scheduling assumptions, and operational controls before deploying workloads.',
    failure: 'teams treat Kubernetes as a deployment script instead of a reconciliation platform and lose control of ownership, drift, and failure behavior',
    decision: 'which cluster responsibility belongs to application teams, platform teams, managed services, and automation',
    incident: 'a service is manually patched during an outage, but the controller immediately reverts it because Git and live state disagree',
    evidence: ['kubectl describe output', 'events and controller status', 'API object manifests and labels'],
  },
  Workloads: {
    mechanism: 'Kubernetes workload resources manage Pods through controllers that handle scheduling, lifecycle, updates, scaling, and replacement.',
    implementation: 'Choose the workload resource from identity, lifecycle, update strategy, data needs, restart behavior, and failure tolerance.',
    failure: 'a workload controller, probe, resource, or rollout setting causes restarts, stuck deployments, unavailable Pods, or unsafe stateful behavior',
    decision: 'which controller and lifecycle contract best matches application reliability and operations',
    incident: 'a deployment rollout stalls with half the replicas unavailable because readiness and maxUnavailable were not tested under real startup time',
    evidence: ['Pod events and conditions', 'controller rollout status', 'container logs and probe results'],
  },
  Networking: {
    mechanism: 'Kubernetes networking connects Pods and Services through CNI networking, kube-proxy or equivalent dataplanes, DNS, endpoints, ingress controllers, and policies.',
    implementation: 'Design service discovery, ingress, east-west traffic, DNS, and policy boundaries with explicit observability and test paths.',
    failure: 'a selector, endpoint, DNS, ingress, or network policy assumption breaks traffic or exposes a service',
    decision: 'which network abstraction provides stable discovery, routing, isolation, observability, and operational ownership',
    incident: 'checkout traffic returns intermittent 503s because the Service selector points to Pods that are not actually ready',
    evidence: ['Service EndpointSlice and ingress status', 'DNS and connectivity tests from Pods', 'network policy and CNI logs'],
  },
  Storage: {
    mechanism: 'Kubernetes storage connects Pods to durable storage through PersistentVolumes, claims, StorageClasses, binding modes, and CSI drivers.',
    implementation: 'Define access mode, binding mode, backup, restore, topology, performance, and ownership before scheduling stateful workloads.',
    failure: 'a claim, binding, topology, reclaim, or driver assumption leaves Pods pending, data inaccessible, or recovery untested',
    decision: 'which storage class, access mode, reclaim policy, and recovery model safely supports the workload',
    incident: 'a StatefulSet cannot reschedule after a zone failure because its volume is bound to a single unavailable zone',
    evidence: ['PVC and PV status', 'storage class and CSI events', 'snapshot backup and restore logs'],
  },
  Configuration: {
    mechanism: 'Kubernetes configuration objects inject non-image configuration and sensitive values into Pods through environment variables, mounted files, and projected volumes.',
    implementation: 'Separate config from images, trigger controlled rollouts when config changes, encrypt sensitive data, and define rotation behavior.',
    failure: 'configuration drift, stale mounted data, leaked secrets, or missing rollout triggers causes environment-specific production defects',
    decision: 'which configuration values belong in manifests, ConfigMaps, Secrets, external secret stores, or runtime discovery',
    incident: 'a payment service keeps using an old feature flag because the ConfigMap changed but Pods were never restarted',
    evidence: ['Pod spec and mounted files', 'ConfigMap or Secret resource version', 'rollout history and application logs'],
  },
  Scaling: {
    mechanism: 'Kubernetes scaling uses workload replica changes, metrics-driven autoscalers, and node autoscaling to match demand with capacity.',
    implementation: 'Set resource requests, choose reliable metrics, tune stabilization, and coordinate workload autoscaling with node capacity.',
    failure: 'autoscaling reacts too late, scales on the wrong signal, or creates pending Pods because cluster capacity cannot follow demand',
    decision: 'which metric and scaling layer should own application replicas, Pod sizing, and node capacity',
    incident: 'HPA doubles replicas during a sale, but new Pods remain Pending because the node group hits cloud quota limits',
    evidence: ['HPA VPA and autoscaler events', 'resource requests and utilization metrics', 'scheduler and cloud capacity logs'],
  },
  Security: {
    mechanism: 'Kubernetes security combines API authorization, workload identity, admission controls, Pod isolation, network policy, secrets handling, and audit evidence.',
    implementation: 'Apply least privilege RBAC, controlled service accounts, restricted Pod settings, encrypted secrets, and namespace isolation.',
    failure: 'broad RBAC, privileged Pods, exposed secrets, or missing network controls turns an application bug into a cluster incident',
    decision: 'where identity, admission, network, data, and platform controls are enforced and audited',
    incident: 'a compromised CI token creates a privileged Pod with hostPath access in a production namespace',
    evidence: ['RBAC bindings and audit logs', 'Pod security context and admission results', 'network policy and secret access evidence'],
  },
  Observability: {
    mechanism: 'Kubernetes observability combines logs, metrics, events, traces, dashboards, and alerting across applications, nodes, and control plane components.',
    implementation: 'Connect SLOs to workload signals, collect structured logs, control metric cardinality, and preserve events during incidents.',
    failure: 'missing events, noisy alerts, high-cardinality metrics, or dashboard drift delays incident recovery',
    decision: 'which signals prove user impact, platform health, workload saturation, and ownership',
    incident: 'API latency rises for 40 minutes because teams only monitor Pod restarts and miss CPU throttling plus ingress 5xx rate',
    evidence: ['Prometheus metrics and alerts', 'logs events and traces', 'Grafana dashboards and SLO burn rates'],
  },
  Helm: {
    mechanism: 'Helm packages Kubernetes manifests into charts and manages releases, values, hooks, upgrades, and rollbacks.',
    implementation: 'Use chart versioning, values validation, diff review, environment overlays, and safe release policies.',
    failure: 'template mistakes, unsafe hooks, values drift, or rollback assumptions break production releases',
    decision: 'where Helm should standardize deployments and where GitOps, Kustomize, or platform templates better fit',
    incident: 'a Helm upgrade changes resource names through a template helper and recreates production workloads unexpectedly',
    evidence: ['helm diff and release history', 'rendered manifests', 'Kubernetes rollout and hook events'],
  },
  'CI/CD': {
    mechanism: 'Kubernetes CI/CD promotes manifests and images through pipelines or GitOps controllers that reconcile approved desired state into clusters.',
    implementation: 'Use immutable images, policy gates, progressive rollout, drift detection, and clear rollback ownership.',
    failure: 'a pipeline deploys unreviewed manifests, mutable tags, invalid policies, or unsafe rollouts into production',
    decision: 'how source, image, manifest, approval, sync, rollout, and recovery are governed',
    incident: 'a GitOps controller reverts a hotfix during an outage because the emergency process never updated desired state',
    evidence: ['Git commit and sync history', 'deployment rollout status', 'policy and admission results'],
  },
  Troubleshooting: {
    mechanism: 'Kubernetes troubleshooting maps user symptoms to object state, events, scheduling decisions, container logs, node health, networking, and recent changes.',
    implementation: 'Preserve evidence, inspect from the Kubernetes object outward, and avoid blind restarts until the failure boundary is clear.',
    failure: 'support actions restart or delete resources before collecting events and hide scheduler, image, node, or network root cause',
    decision: 'which mitigation stabilizes users while preserving enough evidence to prevent recurrence',
    incident: 'a production Pod stays Pending for 30 minutes because the scheduler cannot satisfy node affinity and PVC topology constraints',
    evidence: ['kubectl describe and events', 'Pod logs and previous logs', 'node scheduler and CNI status'],
  },
  'Production Support': {
    mechanism: 'Kubernetes production support connects service impact to workload state, node capacity, control plane health, deployment changes, and platform limits.',
    implementation: 'Use incident runbooks, SLOs, safe rollback, capacity telemetry, and post-incident controls.',
    failure: 'teams mitigate symptoms without scoping blast radius, measuring customer impact, or adding durable operational controls',
    decision: 'which immediate action reduces impact and which long-term control prevents the incident class',
    incident: 'checkout p99 latency jumps from 300 ms to 6 seconds after node CPU pressure and Pod throttling coincide with a rollout',
    evidence: ['SLO and incident timeline', 'resource and capacity metrics', 'deployment diff and event history'],
  },
  Architecture: {
    mechanism: 'Kubernetes architecture defines cluster boundaries, platform guardrails, availability, disaster recovery, multi-tenancy, developer experience, and operating model.',
    implementation: 'Design for failure domains, secure self-service, fleet governance, capacity, observability, and repeatable recovery.',
    failure: 'clusters grow organically and produce inconsistent security, fragile upgrades, expensive capacity, and unclear ownership',
    decision: 'which cluster, platform, governance, and operational model supports scale, compliance, reliability, and developer speed',
    incident: 'a shared cluster outage impacts unrelated business units because namespaces provide naming boundaries but not enough operational isolation',
    evidence: ['architecture decision records', 'cluster inventory and policy reports', 'DR game-day and SLO evidence'],
  },
};

const intentTypes: Record<Intent, string> = {
  concept: 'Conceptual Question',
  practical: 'Practical Question',
  troubleshooting: 'Troubleshooting Question',
  incident: 'Production Issue',
  architecture: 'Architecture Question',
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

const intents: Intent[] = ['concept', 'practical', 'troubleshooting', 'incident', 'architecture'];
const industries = ['retail', 'banking', 'healthcare', 'media', 'telecom', 'e-commerce', 'SaaS', 'logistics'];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hash(value: string) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function list(items: string[]) {
  return items.length <= 1 ? items[0] : `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;
}

const topicSpecs: TopicSpec[] = kubernetesInterviewPrepTopicGroups.flatMap((group) => group.topics.map((topic) => ({
  category: topic.category,
  topicGroup: group.title,
  concerns: categoryConcerns[topic.category] ?? commonConcerns,
  relatedTopics: group.topics.filter((related) => related.category !== topic.category).slice(0, 4).map((related) => related.category),
})));

function profileFor(spec: TopicSpec) {
  return groupProfiles[spec.topicGroup] ?? groupProfiles.Fundamentals;
}

function concernGuidance(concern: string, profile: TopicProfile) {
  const rules: Array<[RegExp, string]> = [
    [/rbac|service account|token|privilege|security|secret|admission|pod security/i, 'Apply least privilege, restrict service account token use, enforce admission policies, encrypt sensitive data, and verify denied paths through audit evidence.'],
    [/probe|readiness|liveness|startup|crash|restart|rollout/i, 'Separate startup, liveness, and readiness responsibilities, test failure behavior under rollout, and verify with events, previous logs, and rollout status.'],
    [/resource|cpu|memory|quota|limit|request|throttl|capacity/i, 'Set realistic requests and limits from observed usage, watch throttling and eviction signals, and coordinate workload scaling with node capacity and quotas.'],
    [/network|service|ingress|dns|endpoint|policy|discovery/i, 'Trace traffic through DNS, Service, EndpointSlice, Pod readiness, ingress controller, CNI, and network policy before changing application code.'],
    [/volume|storage|pvc|pv|csi|snapshot|data/i, 'Validate binding mode, topology, reclaim policy, backup and restore, driver health, and access mode before running stateful workloads.'],
    [/hpa|vpa|autoscaler|scale/i, 'Use metrics that represent load, tune stabilization and readiness, and prove node capacity can follow replica demand under peak traffic.'],
    [/helm|chart|release|rollback|values/i, 'Render and diff manifests before release, validate values, coordinate hooks and migrations, and test rollback against real cluster state.'],
    [/gitops|argocd|flux|deployment|canary|blue-green/i, 'Promote immutable images and manifests through Git, use policy and health gates, and align emergency fixes with desired state reconciliation.'],
    [/logging|monitoring|prometheus|grafana|metrics|alert/i, 'Tie alerts to SLOs, control metric cardinality, preserve events and logs, and create drill-down paths from service symptom to Pod and node cause.'],
    [/node|control plane|etcd|scheduler|kubelet|cluster/i, 'Separate control plane, scheduler, node, runtime, and workload failure boundaries, then validate with component health and object events.'],
  ];
  return rules.find(([pattern]) => pattern.test(concern))?.[1]
    ?? `${profile.implementation} For ${concern}, define the owner, failure mode, security boundary, observable signal, and rollback path.`;
}

function questionText(intent: Intent, concern: string, category: string) {
  const values: Record<Intent, string> = {
    concept: `Explain ${concern} in Kubernetes ${category}. Which misconception causes production defects?`,
    practical: `How would you implement and validate ${concern} for Kubernetes ${category}?`,
    troubleshooting: `How would you troubleshoot a production failure involving ${concern} in Kubernetes ${category}?`,
    incident: `A Kubernetes ${category} production incident exposes a weakness in ${concern}. How would you respond and prevent recurrence?`,
    architecture: `How would you make and govern an architecture decision about ${concern} for enterprise Kubernetes ${category}?`,
  };
  return values[intent];
}

function buildQuestion(spec: TopicSpec, concern: string, intent: Intent, index: number): InterviewPrepQuestion {
  const profile = profileFor(spec);
  const question = questionText(intent, concern, spec.category);
  const industry = industries[hash(question) % industries.length];
  const guidance = concernGuidance(concern, profile);
  const focus: Record<Intent, string> = {
    concept: 'mechanism',
    practical: 'implementation',
    troubleshooting: 'diagnostic path',
    incident: 'incident response',
    architecture: 'architecture decision',
  };
  const direct = intent === 'concept'
    ? `${profile.mechanism} In Kubernetes ${spec.category}, the production-relevant rule for ${concern} is: ${guidance}`
    : intent === 'practical'
      ? `For Kubernetes ${spec.category}, implement ${concern} with this production approach: ${guidance}`
      : intent === 'architecture'
        ? `For enterprise Kubernetes ${spec.category}, treat ${concern} as an explicit platform and operating decision: ${profile.decision}.`
        : `For Kubernetes ${spec.category}, preserve evidence, isolate the API object, controller, node, network, storage, or platform boundary, and test ${concern} as a hypothesis before changing production.`;
  const detailed: Record<Intent, string[]> = {
    concept: [
      `Direct answer: ${direct}`,
      `What: ${concern} has a specific Kubernetes API, controller, scheduling, runtime, or platform contract inside ${spec.category}.`,
      `Why: Misunderstanding it can cause ${profile.failure}.`,
      `How: ${guidance}`,
      `Production validation: Prove the explanation with ${list(profile.evidence)}.`,
    ],
    practical: [
      `Direct answer: ${direct}`,
      `Implementation choices: ${guidance}`,
      `Testing approach: Cover desired-state reconciliation, rollout behavior, security denial, dependency failure, resource pressure, and rollback.`,
      `Operational evidence: Require ${list(profile.evidence)} before release.`,
      `Trade-off: Make this decision explicit: ${profile.decision}.`,
    ],
    troubleshooting: [
      `Direct answer: ${direct}`,
      `Observed symptom: ${profile.incident}.`,
      `Troubleshooting approach: Preserve ${profile.evidence[0]}, compare ${profile.evidence[1]} with a healthy workload, and use ${profile.evidence[2]} to isolate the owner.`,
      `Likely cause: A manifest, controller, scheduler, node, image, network, storage, quota, admission, or configuration assumption around ${concern} changed.`,
      `Durable fix: Correct the narrow cause, add a policy, alert, runbook, or regression test, and verify the original user-impact signal.`,
    ],
    incident: [
      `Direct answer: ${direct}`,
      `Impact: ${profile.incident}.`,
      `Triage: Scope affected namespaces, workloads, nodes, clusters, users, and recent syncs before selecting mitigation.`,
      `Mitigation: Apply the smallest reversible action while preserving ${profile.evidence[0]}.`,
      `Prevention: Prove root cause with ${list(profile.evidence)} and convert it into a platform guardrail, release gate, or runbook.`,
    ],
    architecture: [
      `Direct answer: ${direct}`,
      `Architecture decision: ${profile.decision}.`,
      `Decision criteria: Evaluate ${concern} against reliability, security, scalability, tenancy, observability, cost, developer experience, and platform ownership.`,
      `Operating model: Define the supported pattern, owner, measurable guardrail, exception path, and recovery plan.`,
      `Validation: Use ${list(profile.evidence)} plus a production-scale rollout, failure rehearsal, or DR game day.`,
    ],
  };
  const scenarios: Record<Intent, string> = {
    concept: `During a ${industry} Kubernetes ${spec.category} design review, the team discovers that ${profile.incident}. The candidate must connect the misconception around ${concern} to Kubernetes reconciliation behavior and prove the correction with ${profile.evidence[0]}.`,
    practical: `A canary ${spec.category} implementation of ${concern} fails under peak traffic when ${profile.incident}. The team captures ${profile.evidence[0]}, validates the exact manifest and controller state, and requires ${profile.evidence[2]} before rollout resumes.`,
    troubleshooting: `${spec.category} support reports that ${profile.incident}. The engineer treats ${concern} as a hypothesis, preserves ${profile.evidence[0]}, compares ${profile.evidence[1]} with a healthy workload, and isolates the cause with ${profile.evidence[2]}.`,
    incident: `Ten minutes after a Kubernetes ${spec.category} change involving ${concern}, ${profile.incident}. The incident lead scopes blast radius, applies a reversible mitigation, preserves ${list(profile.evidence)}, and accepts recovery only after the service-level metric returns to target.`,
    architecture: `A quarterly Kubernetes ${spec.category} architecture review finds inconsistent decisions about ${concern} contributed to this signal: ${profile.incident}. The lead defines the approved pattern, platform owner, exception path, and measurable guardrail.`,
  };
  const projects: Record<Intent, string> = {
    concept: `A ${industry} platform made Kubernetes ${spec.category} concern ${concern} part of senior-engineer onboarding after a misunderstanding caused ${profile.failure}. The team documented the mechanism and validated it through ${profile.evidence[0]}.`,
    practical: `For a high-volume ${industry} service, the team implemented ${concern} in Kubernetes ${spec.category} using this rule: ${guidance} Release approval required ${profile.evidence[0]} and ${profile.evidence[1]}.`,
    troubleshooting: `A ${industry} platform-support team traced a recurring Kubernetes ${spec.category} defect to ${concern}, correlated ${list(profile.evidence.slice(0, 2))}, corrected the narrow cause, and added a diagnostic runbook.`,
    incident: `During a peak ${industry} release, Kubernetes ${spec.category} concern ${concern} contributed to ${profile.incident}. The team restored service, reconciled affected work, and added a canary plus alert tied to the root cause.`,
    architecture: `A ${industry} enterprise standardized ${concern} for Kubernetes ${spec.category} only after deciding ${profile.decision}. The architecture record assigned ownership and required ${profile.evidence[0]} as ongoing proof.`,
  };

  return {
    id: `kubernetes-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'kubernetes',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question,
    shortAnswer: `${direct} Validate this ${focus[intent]} with ${profile.evidence[0]}.`,
    detailedAnswer: detailed[intent],
    productionScenario: scenarios[intent],
    realProjectExample: projects[intent],
    interviewerExpectation: `For this Kubernetes ${spec.category} question, the interviewer expects a precise ${focus[intent]} for ${concern}, production evidence from ${profile.evidence[0]} and ${profile.evidence[1]}, and a credible response to ${profile.incident}.`,
    commonMistakes: [
      `For ${spec.category}, giving a Kubernetes definition without explaining the API object, controller, node, network, storage, or platform ownership contract for ${concern}.`,
      `Changing ${concern} during a ${focus[intent]} exercise without collecting ${profile.evidence[0]} or checking the exact manifest and controller state.`,
      `Ignoring this ${spec.category} trade-off: ${profile.decision}.`,
      `Closing the ${focus[intent]} work for ${concern} without a policy, alert, rollback path, runbook, and accountable owner.`,
    ],
    followUpQuestions: [
      `For the ${focus[intent]} view of Kubernetes ${spec.category}, what API object, controller, scheduler, node, network, storage, or admission boundary most changes the answer for ${concern}?`,
      `How would ${profile.evidence[0]} and ${profile.evidence[1]} prove your ${focus[intent]} explanation of ${concern} in ${spec.category}?`,
      `Which security, reliability, scalability, tenancy, or production-support constraint most changes this Kubernetes ${spec.category} ${focus[intent]} answer for ${concern}?`,
      `From the ${focus[intent]} perspective, at what scale or failure condition would you revisit this decision: ${profile.decision}?`,
    ],
    frequencyScore: Math.max(65, (intent === 'concept' ? 94 : intent === 'practical' ? 91 : intent === 'troubleshooting' ? 88 : intent === 'incident' ? 85 : 81) - (index % 10)),
    commonWrongAnswer: `A weak answer describes ${concern} without explaining Kubernetes reconciliation, controller behavior, production evidence, security impact, and failure ownership.`,
    architectPerspective: `From the ${focus[intent]} perspective, govern ${concern} in Kubernetes ${spec.category} through this decision: ${profile.decision}. Evaluate reliability, security, multi-tenancy, scalability, observability, cost, developer experience, platform ownership, and the production signal "${profile.incident}".`,
    keyTakeaway: `Answer ${concern} through its Kubernetes API and controller contract, production evidence, failure behavior, and explicit ownership.`,
    difficultyLevel: difficulties[intent],
    experienceLevel: experiences[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I explain the supported Kubernetes behavior of ${concern} and demonstrate the happy path.`,
      mid: `I implement and test ${concern}, including manifests, rollout behavior, security, dependencies, and rollback.`,
      senior: `I diagnose ${concern} with ${list(profile.evidence)} and add durable prevention.`,
      architect: `I govern ${concern} through ${profile.decision}, measurable guardrails, and ownership.`,
    },
    isMostAsked: index < 10,
    mostAskedRank: index < 10 ? index + 1 : undefined,
    isRapidRevision: index < 5,
  };
}

const questions = topicSpecs.flatMap((spec) => spec.concerns.flatMap((concern, concernIndex) => (
  intents.map((intent, intentIndex) => buildQuestion(spec, concern, intent, (concernIndex * intents.length) + intentIndex))
)));

const topicGroups: InterviewPrepTopicGroup[] = kubernetesInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in enterprise Kubernetes platforms.`,
  topics: group.topics.map((topic) => topic.category),
}));

const questionsPerPage = 10;
const topicMetadata = topicSpecs.map((spec) => {
  const topicQuestions = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    topicGroup: spec.topicGroup,
    totalQuestions: topicQuestions.length,
    estimatedPreparationMinutes: Math.max(20, Math.round(topicQuestions.length * 4.5)),
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
    mostAskedQuestionIds: ranked.slice(0, 10).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 15).map((question) => question.id),
    lastMinuteQuestionIds: ranked.slice(0, 5).map((question) => question.id),
  };
});

const productionScenarios = [
  {
    id: 'kubernetes-crashloop-probe-regression',
    title: 'CrashLoopBackOff after probe change',
    topic: 'CrashLoopBackOff',
    problem: 'A checkout API enters CrashLoopBackOff after a release tightens liveness probe timeouts below realistic startup time.',
    rootCauseAnalysis: ['Liveness is checking startup behavior', 'Startup probe is missing', 'Previous container logs and events were not reviewed before restart'],
    troubleshootingSteps: ['Inspect describe output and previous logs', 'Compare probe settings with startup profile', 'Disable only the unsafe probe path through rollback', 'Add startup probe and rollout test'],
    expectedInterviewAnswer: 'Separate startup, liveness, and readiness concerns and use events plus previous logs before changing production.',
    seniorApproach: 'A senior answer distinguishes application crash, probe-induced restart, missing dependency, and resource pressure.',
    architectApproach: 'An architect defines probe standards, rollout validation, and SLO-based health patterns across services.',
    relatedQuestions: questions.filter((question) => ['CrashLoopBackOff', 'Pods', 'Deployments'].includes(question.category)).slice(0, 6).map((question) => question.id),
  },
  {
    id: 'kubernetes-pending-pods-capacity',
    title: 'Pending Pods during peak autoscaling',
    topic: 'Pending Pods',
    problem: 'HPA increases desired replicas during a campaign, but Pods remain Pending because node pools cannot satisfy CPU requests and PVC topology.',
    rootCauseAnalysis: ['Requests exceed available bin-packing capacity', 'Cluster Autoscaler hits cloud quota', 'PVC binding constrains placement to one zone'],
    troubleshootingSteps: ['Inspect scheduler events', 'Review requests, quotas, affinity, and PVC binding', 'Check autoscaler and cloud quota logs', 'Adjust capacity and topology policy'],
    expectedInterviewAnswer: 'Pending Pods are a scheduler and capacity problem until events prove otherwise.',
    seniorApproach: 'A senior answer correlates scheduler reasons, node pool limits, workload requests, storage topology, and business impact.',
    architectApproach: 'An architect defines capacity buffers, multi-zone storage strategy, and autoscaler guardrails.',
    relatedQuestions: questions.filter((question) => ['Pending Pods', 'HPA', 'Cluster Autoscaler', 'Storage Classes'].includes(question.category)).slice(0, 6).map((question) => question.id),
  },
  {
    id: 'kubernetes-rbac-privilege-incident',
    title: 'Over-permissive RBAC enables cluster-wide change',
    topic: 'RBAC',
    problem: 'A namespace automation account accidentally has cluster-admin and modifies resources outside its business unit.',
    rootCauseAnalysis: ['ClusterRoleBinding was used where RoleBinding was sufficient', 'Service account tokens were broadly mounted', 'Access reviews were not part of release governance'],
    troubleshootingSteps: ['Revoke broad binding', 'Review audit logs and affected resources', 'Rotate impacted credentials', 'Add least-privilege policies and access review gates'],
    expectedInterviewAnswer: 'RBAC must be scoped by verb, resource, namespace, and subject with audit evidence and denied-path tests.',
    seniorApproach: 'A senior answer includes containment, audit timeline, blast-radius analysis, and policy remediation.',
    architectApproach: 'An architect establishes tenancy boundaries, admission controls, break-glass process, and periodic access certification.',
    relatedQuestions: questions.filter((question) => ['RBAC', 'Service Accounts', 'Pod Security'].includes(question.category)).slice(0, 6).map((question) => question.id),
  },
  {
    id: 'kubernetes-ingress-503',
    title: 'Ingress returns intermittent 503 during rollout',
    topic: 'Ingress',
    problem: 'Customer traffic receives intermittent 503s because ingress routes to a Service whose endpoints include Pods not ready for real traffic.',
    rootCauseAnalysis: ['Readiness probe does not validate downstream dependency readiness', 'Service selector includes a canary label accidentally', 'Ingress timeout and retry settings differ from application behavior'],
    troubleshootingSteps: ['Check ingress controller logs', 'Inspect Service and EndpointSlice state', 'Validate Pod readiness and labels', 'Fix selector and readiness contract'],
    expectedInterviewAnswer: 'Trace ingress failures through controller, Service, EndpointSlice, Pod readiness, and application logs before blaming DNS or the load balancer.',
    seniorApproach: 'A senior answer correlates ingress 503s with endpoint readiness, rollout windows, labels, and controller logs.',
    architectApproach: 'An architect standardizes traffic rollout, readiness semantics, ingress policies, and progressive delivery checks.',
    relatedQuestions: questions.filter((question) => ['Ingress', 'Services', 'Deployments', 'Service Discovery'].includes(question.category)).slice(0, 6).map((question) => question.id),
  },
];

export const kubernetesInterviewPrep: InterviewPrepSection = {
  technologyId: 'kubernetes',
  technologyLabel: 'Kubernetes',
  title: 'Kubernetes Interview Prep',
  description: 'Enterprise Kubernetes interview preparation focused on workloads, networking, storage, scaling, security, observability, Helm, GitOps, troubleshooting, production support, and architecture.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Kubernetes Developer / DevOps Associate', years: '0-2 Years', summary: 'Explain Kubernetes fundamentals, Pods, Deployments, Services, configuration, and safe operational basics.' },
    { id: 'mid', label: 'DevOps / Platform Engineer', years: '2-5 Years', summary: 'Implement production-ready workloads, networking, storage, scaling, security, Helm, and GitOps workflows.' },
    { id: 'senior', label: 'Senior SRE / Platform Engineer', years: '5-8 Years', summary: 'Lead Kubernetes troubleshooting, incident response, performance, observability, security, and production operations.' },
    { id: 'architect', label: 'Kubernetes Platform Architect', years: '8+ Years', summary: 'Design scalable, secure, highly available Kubernetes platforms and enterprise operating models.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Kubernetes Developer', description: 'Cluster basics, Pods, Deployments, Services, ConfigMaps, Secrets, and troubleshooting basics.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'mid', label: 'DevOps Engineer', description: 'Networking, storage, scaling, Helm, GitOps, security, and release workflows.', questionCount: 10, recommendedMinutes: 35 },
    { id: 'senior', label: 'Senior SRE / Platform Engineer', description: 'Production incidents, performance, observability, node failures, and platform operations.', questionCount: 10, recommendedMinutes: 45 },
    { id: 'architect', label: 'Kubernetes Platform Architect', description: 'Multi-cluster strategy, high availability, disaster recovery, tenancy, and platform engineering.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-frequency Kubernetes workload, networking, security, and troubleshooting decisions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Kubernetes fundamentals, Pods, Deployments, Services, storage, scaling, and incident handling.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 25).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Kubernetes preparation for enterprise platforms.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 50).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
