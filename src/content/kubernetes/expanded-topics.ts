import type { TopicContent } from '../types';

interface K8sExpandedTopicSpec {
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
const versions = ['Kubernetes', 'kubectl', 'CoreDNS', 'Helm'];

function topic(spec: K8sExpandedTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the Kubernetes topics senior platform engineers use to explain orchestration behavior, operational ownership, and production support with confidence.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers care about this topic:**
- Kubernetes questions are usually about runtime behavior, failure handling, and platform ownership rather than only YAML syntax
- Strong answers connect one Kubernetes concept to scheduling, security, observability, and recovery trade-offs
- Senior engineers explain how the workload behaves in production, not just what the resource is called`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Kubernetes example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} only a YAML or kubectl topic?`,
        answer: `No. ${spec.title} affects scheduling, failure recovery, security, observability, and how safely teams can operate workloads in production.`,
      },
      {
        question: `What makes a weak interview answer for ${spec.title}?`,
        answer: `A weak answer defines ${spec.title} but skips ownership, failure behavior, operational evidence, and why the pattern matters after deployment.`,
      },
      {
        question: `How should senior engineers explain ${spec.title}?`,
        answer: `Senior answers connect ${spec.title} to workload intent, platform behavior, recovery, measurable signals, and long-term operational burden.`,
      },
    ],
    productionIssues: [
      `${spec.title} is adopted without a clear operating model, so teams make inconsistent assumptions about rollout safety, security, or runtime recovery.`,
      `The workload depends on ${spec.title.toLowerCase()} successfully in a happy-path environment, but validation, alarms, or fallback behavior are too weak when production pressure rises.`,
      `Teams discuss ${spec.title} only as a Kubernetes feature and miss the platform burden around multi-tenant governance, visibility, or supportability.`,
    ],
    bestPractices: [
      `Treat ${spec.title} as a platform and operations decision, not just a Kubernetes definition.`,
      'Make the failure mode, ownership boundary, and observability signal explicit before scaling the pattern across clusters or namespaces.',
      'Use examples from production incidents, rollout regressions, security reviews, or recovery drills when explaining the topic.',
      'Prefer answers that connect Kubernetes mechanics to long-term platform ownership and workload reliability.',
    ],
    architectNote: `In Kubernetes platforms, ${spec.title} should be evaluated through isolation, least privilege, resilience, automation, cost, and how many teams must safely live with the decision over time.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Kubernetes platform?`,
        answer: `Explain the Kubernetes mechanism first, then connect ${spec.title} to workload behavior, security, observability, rollback, and the controls that keep the platform supportable in production.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The usual concern is that the pattern works in development but becomes risky at scale because the team has not designed around visibility, safety, or failure recovery.`,
      },
    ],
    keyTakeaways: [
      `${spec.title} is a production platform decision, not just a Kubernetes term to memorize.`,
      'Strong Kubernetes answers connect resource behavior, security, observability, and operational recovery together.',
      'Interview depth comes from showing ownership, trade-offs, and production evidence clearly.',
      'Senior engineers explain how workloads keep running when nodes, rollouts, or dependencies are degraded.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const specs: K8sExpandedTopicSpec[] = [
  {
    slug: 'kubernetes-service-discovery',
    title: 'Service Discovery',
    description: 'Understand how workloads discover each other reliably inside Kubernetes.',
    concept: 'Service discovery in Kubernetes relies on Services, DNS, labels, selectors, and endpoint data so workloads can reach the right backends without hardcoding Pod IPs.',
    why: 'It matters because many production failures look like networking bugs when the real issue is wrong selectors, stale assumptions, or missing service boundaries.',
    usage: 'This appears in microservices, sidecar communication, stateful applications, and platform troubleshooting across namespaces.',
    workflow: 'Model the service boundary first, validate selectors and DNS names, and test from inside the cluster before assuming application code is at fault.',
    exampleTitle: 'Discovery review',
    exampleCode: `Service discovery asks
-> which Service owns the endpoint?
-> do labels match the intended Pods?
-> does DNS resolve from the client namespace?`,
    relatedTopics: ['kubernetes-services', 'kubernetes-dns', 'kubernetes-network-policies'],
  },
  {
    slug: 'kubernetes-csi-drivers',
    title: 'CSI Drivers',
    description: 'Learn how CSI drivers provision and attach storage to Kubernetes workloads.',
    concept: 'CSI drivers connect Kubernetes storage requests to external storage systems, handling provisioning, attachment, expansion, snapshots, and storage-specific behavior.',
    why: 'Storage reliability depends heavily on the driver layer, and many persistent-volume issues are really CSI or cloud integration problems.',
    usage: 'This matters in stateful apps, backup and restore, volume expansion, cloud-provider integration, and platform operations.',
    workflow: 'Verify which driver owns the volume lifecycle, how topology and access modes behave, and what events or logs reveal attachment failures.',
    exampleTitle: 'Storage-driver checklist',
    exampleCode: `CSI review
-> which driver owns the volume?
-> what topology constraints apply?
-> how are attach and mount failures exposed?`,
    relatedTopics: ['kubernetes-persistent-volumes', 'kubernetes-storage-classes', 'kubernetes-disaster-recovery'],
  },
  {
    slug: 'kubernetes-environment-variables',
    title: 'Environment Variables',
    description: 'Understand how Kubernetes injects environment configuration into containers and where that approach breaks down.',
    concept: 'Environment variables in Kubernetes provide runtime configuration through Pod specs, ConfigMaps, Secrets, and the Downward API, but they remain static for the lifetime of the container process.',
    why: 'Teams often assume config changes propagate automatically, which creates silent drift and rollout confusion.',
    usage: 'This appears in application config, service URLs, feature flags, credentials, and platform defaults.',
    workflow: 'Decide which values belong in env vars, understand restart behavior, and avoid mixing secret handling with convenience defaults carelessly.',
    exampleTitle: 'Env-var boundary',
    exampleCode: `Environment variable review
-> where does the value come from?
-> does a Pod restart apply the change?
-> could the value leak in logs or debug output?`,
    relatedTopics: ['kubernetes-configmaps', 'kubernetes-secrets', 'kubernetes-rollbacks'],
  },
  {
    slug: 'kubernetes-vertical-pod-autoscaler',
    title: 'Vertical Pod Autoscaler',
    description: 'Learn how VPA recommends or adjusts resource requests for Kubernetes workloads.',
    concept: 'VPA analyzes workload resource usage and recommends or applies CPU and memory request changes so Pods are sized more realistically.',
    why: 'Poor sizing creates waste, throttling, noisy autoscaling behavior, and unreliable scheduling outcomes.',
    usage: 'This matters in platform rightsizing, cost optimization, stateful workloads, and capacity planning.',
    workflow: 'Use VPA deliberately, understand its eviction behavior, and validate how it interacts with HPA and rollout safety before enabling automatic control.',
    exampleTitle: 'Rightsizing review',
    exampleCode: `VPA questions
-> recommendation only or auto mode?
-> what eviction risk does it add?
-> how does it interact with HPA?`,
    relatedTopics: ['kubernetes-horizontal-pod-autoscaler', 'kubernetes-cluster-autoscaler', 'kubernetes-resource-optimization'],
  },
  {
    slug: 'kubernetes-network-security',
    title: 'Network Security',
    description: 'Understand how Kubernetes workloads are isolated and protected at the network layer.',
    concept: 'Network security in Kubernetes combines Services, ingress boundaries, network policies, cloud controls, and sometimes service mesh or platform-level enforcement.',
    why: 'A cluster can run perfectly while still being overexposed or improperly isolated if network assumptions are weak.',
    usage: 'This appears in multi-tenant clusters, regulated environments, internal platforms, and internet-facing services.',
    workflow: 'Start from default trust boundaries, define allowed traffic paths explicitly, and verify enforcement rather than assuming the policy exists just because YAML was applied.',
    exampleTitle: 'Isolation check',
    exampleCode: `Network security asks
-> which workloads should talk to each other?
-> what ingress is exposed publicly?
-> what is denied by default?`,
    relatedTopics: ['kubernetes-network-policies', 'kubernetes-ingress', 'kubernetes-rbac'],
  },
  {
    slug: 'kubernetes-secrets-management',
    title: 'Secrets Management',
    description: 'Learn how secrets should be stored, delivered, rotated, and audited in Kubernetes.',
    concept: 'Secrets management in Kubernetes is the operational model for sensitive data, including Secret objects, external secret systems, encryption, delivery paths, and rotation.',
    why: 'Secret handling errors turn routine deployments into security incidents very quickly.',
    usage: 'This matters in service credentials, API tokens, PKI material, CI/CD, and incident prevention.',
    workflow: 'Keep ownership and access clear, use stronger external or encrypted patterns when needed, and validate that workloads reload or restart safely after secret changes.',
    exampleTitle: 'Secret-handling model',
    exampleCode: `Secrets review
-> who owns the secret?
-> where is it stored?
-> how is it rotated?
-> how is access audited?`,
    relatedTopics: ['kubernetes-secrets', 'kubernetes-service-accounts', 'kubernetes-pod-security'],
  },
  {
    slug: 'kubernetes-logging',
    title: 'Logging',
    description: 'Understand how logs should be collected, retained, and correlated in Kubernetes platforms.',
    concept: 'Kubernetes logging relies on container stdout and stderr, node-level collection, structured logs, and centralized retention so application and platform events can be investigated together.',
    why: 'When logs disappear during restarts or cannot be correlated across Pods and nodes, incidents take much longer to diagnose.',
    usage: 'This appears in crash analysis, compliance retention, app debugging, and cross-service incident response.',
    workflow: 'Treat logs as a platform concern, define collection and retention standards, and correlate logs with events and metrics instead of reading them in isolation.',
    exampleTitle: 'Logging baseline',
    exampleCode: `Logging review
-> where are logs collected?
-> how long are they retained?
-> can they be correlated with Pod and node events?`,
    relatedTopics: ['kubernetes-monitoring', 'kubernetes-debugging', 'kubernetes-crashloopbackoff'],
  },
  {
    slug: 'kubernetes-monitoring',
    title: 'Monitoring',
    description: 'Learn how Kubernetes monitoring ties workload health to platform signals and SLOs.',
    concept: 'Monitoring in Kubernetes spans application metrics, node health, control plane behavior, alerting, SLOs, and resource saturation across clusters.',
    why: 'Without strong monitoring, clusters often look healthy while user-facing performance is already degraded.',
    usage: 'This matters in scaling, incident response, capacity planning, rollout verification, and platform reliability.',
    workflow: 'Start with user-impacting signals, then trace them back to Pods, nodes, and control plane metrics so alerts stay actionable and ownership stays clear.',
    exampleTitle: 'Signal design',
    exampleCode: `Monitoring should answer
-> is the user impacted?
-> which workload or node is unhealthy?
-> who owns the alert?`,
    relatedTopics: ['kubernetes-monitoring-prometheus', 'kubernetes-grafana', 'kubernetes-performance-analysis'],
  },
  {
    slug: 'kubernetes-helm-basics',
    title: 'Helm Basics',
    description: 'Understand Helm as a packaging and release tool for Kubernetes manifests.',
    concept: 'Helm packages Kubernetes resources into reusable charts with values, templates, and release history to simplify deployment and standardization.',
    why: 'Helm can accelerate delivery, but only when teams understand what it owns and how template complexity affects reviewability.',
    usage: 'This appears in internal platforms, vendor software, multi-environment deployments, and GitOps or CI/CD delivery.',
    workflow: 'Treat Helm as a release and template system, keep values understandable, and inspect rendered output before trusting upgrades.',
    exampleTitle: 'Helm fit check',
    exampleCode: `Helm review
-> what does the chart own?
-> are values understandable?
-> can the rendered manifests be reviewed safely?`,
    relatedTopics: ['kubernetes-charts', 'kubernetes-releases', 'kubernetes-rollbacks'],
  },
  {
    slug: 'kubernetes-charts',
    title: 'Charts',
    description: 'Learn how chart structure and values design shape Kubernetes delivery quality.',
    concept: 'Charts are Helm packages that bundle templates, values, dependencies, and release metadata for reusable Kubernetes deployment logic.',
    why: 'Poor chart design creates unreadable templates, risky upgrades, and hard-to-debug environment differences.',
    usage: 'This appears in platform libraries, shared infrastructure, third-party workloads, and multi-team deployment standards.',
    workflow: 'Keep chart ownership clear, validate value shape, and avoid template cleverness that hides actual Kubernetes intent during review.',
    exampleTitle: 'Chart design questions',
    exampleCode: `Chart design asks
-> what is configurable?
-> what is standardized?
-> can platform and app teams both review the outcome?`,
    relatedTopics: ['kubernetes-helm-basics', 'kubernetes-releases', 'kubernetes-gitops'],
  },
  {
    slug: 'kubernetes-releases',
    title: 'Releases',
    description: 'Understand how Kubernetes release history, upgrades, and promotion workflows should be governed.',
    concept: 'Releases in Kubernetes track what artifact and manifest version is deployed, how promotion occurs, and what rollback or audit evidence exists for the change.',
    why: 'Weak release discipline makes outages harder to diagnose and roll back safely.',
    usage: 'This matters in Helm, GitOps, CI/CD pipelines, regulated deployments, and multi-environment promotion.',
    workflow: 'Make release provenance explicit, track changes by artifact and manifest version, and validate post-deploy health instead of treating apply success as release success.',
    exampleTitle: 'Release control baseline',
    exampleCode: `Release review
-> what changed?
-> which artifact and manifest version shipped?
-> how is rollback proven safe?`,
    relatedTopics: ['kubernetes-rollbacks', 'kubernetes-deployment-strategies', 'kubernetes-gitops'],
  },
  {
    slug: 'kubernetes-gitops',
    title: 'GitOps',
    description: 'Learn how GitOps keeps Kubernetes desired state reviewable and continuously reconciled.',
    concept: 'GitOps stores desired Kubernetes state in Git and uses controllers to reconcile that source of truth into clusters continuously.',
    why: 'It improves auditability and drift control, but only if emergency changes, promotions, and ownership are designed carefully.',
    usage: 'This appears in platform engineering, multi-cluster delivery, regulated environments, and safer deployment governance.',
    workflow: 'Define the source of truth clearly, control who can change it, and align emergency response with reconciliation so Git and live state do not fight each other.',
    exampleTitle: 'GitOps control path',
    exampleCode: `GitOps asks
-> where is desired state stored?
-> who approves changes?
-> how are urgent hotfixes reconciled back into Git?`,
    relatedTopics: ['kubernetes-argocd', 'kubernetes-flux', 'kubernetes-rollbacks'],
  },
  {
    slug: 'kubernetes-argocd',
    title: 'ArgoCD',
    description: 'Understand ArgoCD as a GitOps controller for Kubernetes delivery and drift management.',
    concept: 'ArgoCD watches Git-managed application definitions and reconciles them into Kubernetes clusters while exposing sync and health status.',
    why: 'Teams need to understand sync behavior, hooks, health interpretation, and multi-app patterns before trusting ArgoCD with production delivery.',
    usage: 'This appears in GitOps platforms, cluster standardization, multi-team app delivery, and progressive rollout governance.',
    workflow: 'Model application ownership clearly, use sync policies carefully, and validate health and drift interpretation before scaling ArgoCD across teams.',
    exampleTitle: 'Controller review',
    exampleCode: `ArgoCD review
-> what app or app-of-apps pattern is used?
-> who owns sync policy?
-> how is health evaluated?`,
    relatedTopics: ['kubernetes-gitops', 'kubernetes-flux', 'kubernetes-releases'],
  },
  {
    slug: 'kubernetes-flux',
    title: 'Flux',
    description: 'Learn how Flux reconciles Git-managed Kubernetes state and image updates.',
    concept: 'Flux is a GitOps toolkit that reconciles Kubernetes state from Git and can automate image updates, source watching, and cluster configuration flow.',
    why: 'Flux can simplify pull-based delivery, but teams still need clear ownership, reconciliation timing, and failure visibility.',
    usage: 'This appears in GitOps platforms, multi-cluster operations, image automation, and infrastructure-as-code workflows.',
    workflow: 'Understand which controllers own which concerns, keep source and environment boundaries clear, and inspect reconciliation and drift signals before assuming delivery is safe.',
    exampleTitle: 'Flux ownership map',
    exampleCode: `Flux review
-> which source is watched?
-> which controller applies what?
-> how are image updates governed?`,
    relatedTopics: ['kubernetes-gitops', 'kubernetes-argocd', 'kubernetes-releases'],
  },
  {
    slug: 'kubernetes-deployment-strategies',
    title: 'Deployment Strategies',
    description: 'Understand rolling, blue-green, canary, and progressive Kubernetes rollout patterns.',
    concept: 'Deployment strategies in Kubernetes control how new versions reach users, how risk is limited, and how rollback decisions are triggered.',
    why: 'The safest manifest can still create user impact if the rollout pattern does not match startup time, dependency risk, or migration behavior.',
    usage: 'This matters in customer-facing services, internal platforms, regulated releases, and incident prevention.',
    workflow: 'Choose the strategy from failure tolerance and blast radius, measure health during rollout, and make rollback criteria explicit before shipping.',
    exampleTitle: 'Rollout strategy lens',
    exampleCode: `Rollout review
-> how much user traffic is exposed at once?
-> what health signal blocks promotion?
-> what is the rollback trigger?`,
    relatedTopics: ['kubernetes-deployments', 'kubernetes-rollbacks', 'kubernetes-incident-response'],
  },
  {
    slug: 'kubernetes-crashloopbackoff',
    title: 'CrashLoopBackOff',
    description: 'Learn how to diagnose repeated Pod restart loops in Kubernetes.',
    concept: 'CrashLoopBackOff is the Kubernetes backoff state shown when containers keep exiting or failing startup repeatedly.',
    why: 'It is one of the most common support signals, and teams need evidence-first diagnosis rather than restart-only responses.',
    usage: 'This appears in config mistakes, secret issues, bad images, dependency timing failures, and rollout regressions.',
    workflow: 'Start with previous logs, exit codes, events, and config diffs, then isolate whether the failure is in the app, image, or environment path.',
    exampleTitle: 'Restart-loop triage',
    exampleCode: `CrashLoopBackOff review
-> what was the last exit reason?
-> what changed in config or image?
-> did probes or dependencies fail first?`,
    relatedTopics: ['kubernetes-pods', 'kubernetes-secrets', 'kubernetes-debugging'],
  },
  {
    slug: 'kubernetes-pending-pods',
    title: 'Pending Pods',
    description: 'Understand why Pods remain unscheduled or blocked before startup.',
    concept: 'Pending Pods indicate the scheduler or cluster cannot place or fully prepare the workload because of capacity, affinity, storage, or policy constraints.',
    why: 'Pending is a platform signal that often points to capacity, quota, topology, or manifest design problems.',
    usage: 'This matters in scaling events, node shortages, storage binding issues, rollout problems, and cluster troubleshooting.',
    workflow: 'Read scheduler events first, then inspect requests, affinity, tolerations, storage claims, quotas, and cluster capacity before blaming the app.',
    exampleTitle: 'Scheduling checklist',
    exampleCode: `Pending Pod review
-> what scheduler event explains the block?
-> is there enough capacity?
-> are affinity or PVC rules too strict?`,
    relatedTopics: ['kubernetes-cluster-autoscaler', 'kubernetes-storage-classes', 'kubernetes-capacity-planning'],
  },
  {
    slug: 'kubernetes-imagepullbackoff',
    title: 'ImagePullBackOff',
    description: 'Learn how to troubleshoot image pull failures in Kubernetes.',
    concept: 'ImagePullBackOff appears when the cluster cannot pull an image because of auth issues, bad tags, registry reachability, or policy problems.',
    why: 'It is a common release failure that often gets mistaken for a cluster or application bug.',
    usage: 'This appears in private registries, mutable tag mistakes, CI/CD changes, secret scope problems, and registry outages.',
    workflow: 'Check the exact image reference, pull secret scope, node egress path, and registry status before changing rollout logic.',
    exampleTitle: 'Registry failure triage',
    exampleCode: `Image pull review
-> is the image tag or digest correct?
-> can the node reach the registry?
-> is the pull secret in the right namespace?`,
    relatedTopics: ['kubernetes-service-accounts', 'kubernetes-releases', 'kubernetes-argocd'],
  },
  {
    slug: 'kubernetes-node-failures',
    title: 'Node Failures',
    description: 'Understand how node degradation affects workloads and recovery behavior.',
    concept: 'Node failures include NotReady states, pressure conditions, runtime crashes, and zone-level host problems that force Kubernetes to reschedule or evict workloads.',
    why: 'Workload availability depends on how the platform behaves when nodes degrade, not just when Pods are healthy.',
    usage: 'This matters in autoscaling, multi-zone clusters, incident response, capacity planning, and HA reviews.',
    workflow: 'Identify whether the problem is one node, one pool, or one zone, then inspect node conditions, eviction signals, and workload rescheduling behavior.',
    exampleTitle: 'Node-health investigation',
    exampleCode: `Node failure review
-> is the node NotReady or under pressure?
-> what workloads were affected?
-> did rescheduling actually restore service?`,
    relatedTopics: ['kubernetes-worker-nodes', 'kubernetes-high-availability', 'kubernetes-cluster-autoscaler'],
  },
  {
    slug: 'kubernetes-networking-issues',
    title: 'Networking Issues',
    description: 'Learn how to troubleshoot service, ingress, DNS, and policy-related Kubernetes connectivity failures.',
    concept: 'Networking issues in Kubernetes usually emerge from selector mismatches, DNS resolution problems, network-policy denies, CNI health, or ingress/controller drift.',
    why: 'Many user-facing outages appear as generic 5xx or timeout problems until the real cluster boundary is isolated carefully.',
    usage: 'This appears in service outages, rollout incidents, ingress changes, policy regressions, and cluster migrations.',
    workflow: 'Break the path into DNS, Service, endpoint, Pod, ingress, and policy layers, and prove each layer with real cluster evidence.',
    exampleTitle: 'Connectivity path review',
    exampleCode: `Networking issue review
-> does DNS resolve?
-> do Services have endpoints?
-> do policies allow the traffic?
-> is ingress routing healthy?`,
    relatedTopics: ['kubernetes-services', 'kubernetes-ingress', 'kubernetes-network-policies'],
  },
  {
    slug: 'kubernetes-incident-response',
    title: 'Incident Response',
    description: 'Understand how Kubernetes incidents are scoped, mitigated, and investigated safely.',
    concept: 'Kubernetes incident response is the process of scoping impact, preserving evidence, choosing the smallest safe mitigation, and turning the root cause into a durable control.',
    why: 'Container orchestration adds many moving parts, so incident response must stay disciplined or teams destroy the evidence they actually need.',
    usage: 'This matters in rollout failures, node issues, networking regressions, capacity spikes, and multi-service outages.',
    workflow: 'Start from user impact and blast radius, preserve events and manifests, then choose rollback, mitigation, or failover with the narrowest reversible change.',
    exampleTitle: 'Incident-response order',
    exampleCode: `1. Scope impact
2. Preserve evidence
3. Contain blast radius
4. Restore service
5. Prove root cause
6. Add prevention`,
    relatedTopics: ['kubernetes-crashloopbackoff', 'kubernetes-rollbacks', 'kubernetes-high-availability'],
  },
  {
    slug: 'kubernetes-performance-analysis',
    title: 'Performance Analysis',
    description: 'Learn how to separate application latency from Kubernetes platform overhead and saturation.',
    concept: 'Performance analysis in Kubernetes means decomposing latency and throughput across app code, service routing, resources, nodes, storage, and control-plane behavior.',
    why: 'Blind scaling or restarts waste time when the real bottleneck is scheduling, throttling, IO, or one noisy dependency.',
    usage: 'This appears in slow APIs, CPU throttling, storage latency, service mesh overhead, and cluster saturation investigations.',
    workflow: 'Start from the user symptom, correlate metrics and traces, and isolate whether the bottleneck sits in the app, container, node, network, or data layer.',
    exampleTitle: 'Latency decomposition',
    exampleCode: `Performance review
-> is the bottleneck in app code, resource limits, network, or storage?
-> what metric proves it?
-> what changed recently?`,
    relatedTopics: ['kubernetes-monitoring', 'kubernetes-resource-optimization', 'kubernetes-capacity-planning'],
  },
  {
    slug: 'kubernetes-resource-optimization',
    title: 'Resource Optimization',
    description: 'Understand how requests, limits, QoS, and right-sizing affect cost and stability.',
    concept: 'Resource optimization in Kubernetes is the practice of sizing workloads honestly so scheduling, autoscaling, and cost all behave more predictably.',
    why: 'Oversized workloads waste money, while undersized workloads cause throttling, eviction, and poor autoscaling.',
    usage: 'This matters in platform cost review, performance tuning, noisy clusters, and multi-tenant environments.',
    workflow: 'Measure real workload behavior first, right-size requests and limits, and validate how those changes affect scheduling, latency, and scale decisions.',
    exampleTitle: 'Right-sizing checklist',
    exampleCode: `Resource optimization asks
-> are requests realistic?
-> are limits causing throttling?
-> what does usage look like under peak traffic?`,
    relatedTopics: ['kubernetes-horizontal-pod-autoscaler', 'kubernetes-vertical-pod-autoscaler', 'kubernetes-performance-analysis'],
  },
  {
    slug: 'kubernetes-capacity-planning',
    title: 'Capacity Planning',
    description: 'Learn how cluster headroom, growth, and failover requirements should shape Kubernetes capacity.',
    concept: 'Capacity planning in Kubernetes balances workload growth, headroom, bin packing, quota, failover, and autoscaling limits so the cluster can absorb real traffic and failures.',
    why: 'Clusters fail under pressure when teams treat autoscaling as infinite and skip headroom or quota planning.',
    usage: 'This appears in launch readiness, cost reviews, platform growth, seasonal traffic planning, and disaster recovery.',
    workflow: 'Plan around real workload patterns, cluster limits, and failover scenarios, and review both average and worst-case utilization instead of happy-path peaks only.',
    exampleTitle: 'Capacity model',
    exampleCode: `Capacity planning review
-> what is normal load?
-> what is failure-mode load?
-> what quota or node-pool limit fails first?`,
    relatedTopics: ['kubernetes-cluster-autoscaler', 'kubernetes-high-availability', 'kubernetes-resource-optimization'],
  },
  {
    slug: 'kubernetes-multi-cluster-design',
    title: 'Multi-Cluster Design',
    description: 'Understand when multiple clusters improve isolation, resilience, and platform governance.',
    concept: 'Multi-cluster design uses separate clusters to isolate teams, environments, regions, or trust boundaries instead of forcing every workload into one giant cluster.',
    why: 'One cluster is not always the safest or simplest answer when compliance, blast radius, or regional design matters.',
    usage: 'This appears in enterprise platforms, regulated systems, fleet management, and multi-region architectures.',
    workflow: 'Choose cluster boundaries from isolation and operating-model needs, then define how policy, networking, delivery, and observability work across the fleet.',
    exampleTitle: 'Cluster-boundary decision',
    exampleCode: `Multi-cluster asks
-> why is one cluster not enough?
-> what boundary does each cluster enforce?
-> how is fleet governance handled?`,
    relatedTopics: ['kubernetes-cluster-architecture', 'kubernetes-platform-engineering', 'kubernetes-disaster-recovery'],
  },
  {
    slug: 'kubernetes-platform-engineering',
    title: 'Platform Engineering',
    description: 'Learn how Kubernetes becomes a reusable internal platform instead of many unrelated workload decisions.',
    concept: 'Platform engineering on Kubernetes is the operating model for golden paths, self-service, policy guardrails, shared tooling, and multi-team supportability.',
    why: 'Clusters become expensive and inconsistent when every team invents its own delivery, security, and observability patterns.',
    usage: 'This appears in internal developer platforms, enterprise modernization, regulated environments, and multi-team platform operations.',
    workflow: 'Define what the platform standardizes, what teams can customize, and how rollout, security, and observability stay governed as adoption grows.',
    exampleTitle: 'Golden-path questions',
    exampleCode: `Platform engineering asks
-> what is standardized?
-> what can app teams customize?
-> how are security and observability inherited?`,
    relatedTopics: ['kubernetes-gitops', 'kubernetes-helm-basics', 'kubernetes-multi-cluster-design'],
  },
];

export const k8sExpandedTopics: Record<string, TopicContent> = Object.fromEntries(
  specs.map((spec) => [spec.slug, topic(spec)])
);
