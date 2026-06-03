import type { Confusion, FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const versions = ['Kubernetes 1.28+', 'kubectl 1.28+', 'Helm 3+', 'Managed Kubernetes: EKS, AKS, GKE'];

interface K8sTopicSpec {
  slug: string;
  title: string;
  description: string;
  quickUnderstanding: string;
  whatIsIt: string;
  whyWeNeedIt: string;
  realWorldUsage: string;
  howItWorks: string;
  exampleTitle: string;
  exampleDescription: string;
  exampleLanguage: string;
  exampleCode: string;
  commonConfusions: Confusion[];
  productionIssues: string[];
  bestPractices: string[];
  architectNote: string;
  faqs?: FAQ[];
  keyTakeaways: string[];
  relatedTopics: string[];
}

function topic(input: K8sTopicSpec): TopicContent {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: input.quickUnderstanding,
    whatIsIt: input.whatIsIt,
    whyWeNeedIt: `${input.whyWeNeedIt}

**Common developer mistakes:**
- Treating Kubernetes YAML as copy-paste configuration instead of production architecture
- Ignoring requests, limits, health probes, security context, and rollout behavior
- Debugging only the Pod while forgetting Services, DNS, NetworkPolicies, nodes, and admission controls
- Manually changing live objects without updating Git or infrastructure automation`,
    realWorldUsage: input.realWorldUsage,
    howItWorks: input.howItWorks,
    example: {
      title: input.exampleTitle,
      description: input.exampleDescription,
      code: [
        {
          label: input.exampleTitle,
          language: input.exampleLanguage,
          code: input.exampleCode,
        },
      ],
    },
    commonConfusions: input.commonConfusions,
    productionIssues: input.productionIssues,
    bestPractices: input.bestPractices,
    architectNote: input.architectNote,
    faqs: [
      {
        question: `Interview: How would you explain ${input.title} in a real Kubernetes project?`,
        answer: `${input.title} should be explained through the workload it supports, the Kubernetes object relationships, the failure modes, the security controls, and how it is observed and rolled back in production.`,
      },
      {
        question: `Interview: What production mistake do developers commonly make with ${input.title}?`,
        answer: 'The common mistake is making the object work once, then skipping ownership, resource sizing, rollout safety, monitoring, least privilege, and recovery behavior.',
      },
      ...(input.faqs ?? []),
    ],
    keyTakeaways: input.keyTakeaways,
    relatedTopics: input.relatedTopics,
  };
}

export const kubernetesOverview = topic({
  slug: 'kubernetes-overview',
  title: 'Kubernetes Overview',
  description: 'Understand Kubernetes as the orchestration platform for deploying, scaling, securing, and operating containerized workloads.',
  quickUnderstanding: 'Kubernetes is a container orchestration platform. You declare the desired state of applications, and Kubernetes controllers continuously work to make the cluster match that desired state.',
  whatIsIt: `Kubernetes is an open-source platform for running containerized applications across a cluster of machines.

It provides APIs and controllers for scheduling workloads, exposing services, handling configuration, attaching storage, scaling, rolling out changes, and recovering failed containers.

The core idea is **declarative desired state**. Teams describe what should exist, and Kubernetes reconciles the actual cluster toward that state.`,
  whyWeNeedIt: `Containers solve packaging. Kubernetes solves running many containers reliably across many machines.

It helps teams standardize deployment, scaling, service discovery, configuration, rollout, rollback, and operations across microservices and platform teams.`,
  realWorldUsage: `An enterprise platform team may run multiple Kubernetes clusters for dev, staging, and production. Application teams deploy services through GitOps or CI/CD. Platform teams own ingress, cluster upgrades, observability, policy, node pools, secret integration, and disaster recovery.

A Spring Boot orders API might run as a Deployment, expose traffic through a Service and Ingress, read configuration from ConfigMaps and Secrets, autoscale with HPA, and publish metrics to Prometheus.`,
  howItWorks: `Kubernetes exposes an API server. Users and automation submit manifests such as Deployments, Services, ConfigMaps, and Ingresses.

Controllers watch those objects and take action. The scheduler places Pods on nodes. Kubelet starts containers. Networking and storage plugins connect workloads to cluster resources.`,
  exampleTitle: 'Kubernetes workload map',
  exampleDescription: 'A typical mapping from application needs to Kubernetes objects.',
  exampleLanguage: 'text',
  exampleCode: `Application containers -> Pods
Replicated service     -> Deployment
Stable internal name   -> Service
External HTTP routing  -> Ingress
Configuration          -> ConfigMap
Sensitive values       -> Secret
Persistent data        -> PVC + StorageClass
Scaling                -> HPA + Cluster Autoscaler
Access control         -> RBAC + ServiceAccount`,
  commonConfusions: [
    { question: 'Is Kubernetes the same as Docker?', answer: 'No. Docker builds and runs containers. Kubernetes orchestrates containers across a cluster.' },
    { question: 'Does Kubernetes automatically make applications production-ready?', answer: 'No. Teams still need probes, resource sizing, security, observability, rollback, and data recovery.' },
    { question: 'Should every application use Kubernetes?', answer: 'No. Kubernetes adds operational complexity. It is valuable when container orchestration and platform consistency justify that complexity.' },
  ],
  productionIssues: [
    '**No resource requests** causes unstable scheduling and noisy-neighbor problems.',
    '**Missing probes** lets broken Pods receive traffic or restart incorrectly.',
    '**Manual kubectl changes** drift from Git and disappear on the next deployment.',
    '**Weak cluster governance** allows privileged workloads, broad RBAC, and inconsistent namespaces.',
  ],
  bestPractices: [
    'Use declarative manifests or GitOps for production changes',
    'Set CPU and memory requests and limits thoughtfully',
    'Define readiness and liveness probes',
    'Separate workloads by namespace, ownership, and environment',
    'Use RBAC, NetworkPolicies, and Pod Security controls',
    'Monitor workloads, nodes, API health, and rollout status',
  ],
  architectNote: `Kubernetes is best understood as an operating system for distributed applications. It gives powerful primitives, but production quality comes from how those primitives are composed and governed.`,
  faqs: [
    { question: 'What should I learn first in Kubernetes?', answer: 'Start with Pods, Deployments, Services, ConfigMaps, Secrets, Ingress, namespaces, probes, resources, and kubectl debugging.' },
    { question: 'Is managed Kubernetes easier?', answer: 'Managed Kubernetes reduces control-plane operations, but application architecture, node capacity, security, observability, and upgrades still need ownership.' },
  ],
  keyTakeaways: [
    'Kubernetes orchestrates containerized workloads',
    'The API stores desired state and controllers reconcile actual state',
    'Production Kubernetes requires security, networking, observability, and rollout discipline',
    'It is powerful but operationally complex',
  ],
  relatedTopics: ['kubernetes-cluster-architecture', 'kubernetes-pods', 'kubernetes-deployments', 'kubernetes-services'],
});

export const kubernetesClusterArchitecture = topic({
  slug: 'kubernetes-cluster-architecture',
  title: 'Cluster Architecture',
  description: 'Learn how Kubernetes clusters are organized across the control plane, worker nodes, API server, etcd, scheduler, controllers, kubelet, and networking.',
  quickUnderstanding: 'A Kubernetes cluster has a control plane that makes decisions and worker nodes that run application Pods. The API server is the front door, etcd stores cluster state, and nodes run kubelet plus container runtime.',
  whatIsIt: `Kubernetes cluster architecture is the arrangement of components that store desired state, schedule workloads, run containers, and connect them over the network.

The control plane contains API server, etcd, scheduler, and controllers. Worker nodes run kubelet, kube-proxy or equivalent networking, container runtime, and application Pods.`,
  whyWeNeedIt: `Architecture knowledge makes troubleshooting practical.

When a Pod is pending, scheduling and node capacity matter. When updates are not applied, API/controller health matters. When traffic fails, Services, CNI, DNS, and kube-proxy behavior matter.`,
  realWorldUsage: `In managed Kubernetes, cloud providers often operate the control plane while platform teams operate node pools, add-ons, ingress controllers, observability, admission policies, and workload standards.

In self-managed clusters, the platform team must also operate etcd backups, control-plane HA, certificates, and upgrades.`,
  howItWorks: `Users call the API server with kubectl, CI/CD, Helm, or GitOps controllers. The API server validates requests and stores state in etcd.

Controllers watch state and create or update dependent objects. The scheduler assigns Pods to nodes. Kubelet on each node asks the container runtime to run containers and reports status back to the API.`,
  exampleTitle: 'Cluster component flow',
  exampleDescription: 'How a Deployment becomes running Pods.',
  exampleLanguage: 'text',
  exampleCode: `kubectl apply -f deployment.yaml
  -> API server validates and stores desired state
  -> Deployment controller creates ReplicaSet
  -> ReplicaSet controller creates Pod objects
  -> Scheduler assigns Pods to nodes
  -> Kubelet starts containers through runtime
  -> Service routes traffic to ready Pod endpoints`,
  commonConfusions: [
    { question: 'Is the control plane where app containers run?', answer: 'Usually no. Application Pods run on worker nodes. Control-plane nodes run cluster management components.' },
    { question: 'Is etcd a normal application database?', answer: 'No. etcd stores Kubernetes cluster state and must be protected, backed up, and operated carefully.' },
    { question: 'Is kubelet a controller?', answer: 'Kubelet is the node agent that runs and reports Pods on its node. Controllers usually run in the control plane.' },
  ],
  productionIssues: [
    '**etcd backup missing** makes cluster-state recovery extremely difficult in self-managed clusters.',
    '**Node pressure ignored** causes evictions and scheduling failures.',
    '**Control-plane API latency** slows deployments and controllers.',
    '**Unmanaged add-ons** such as CNI or DNS become hidden single points of failure.',
  ],
  bestPractices: [
    'Understand which parts are provider-managed and which are platform-owned',
    'Monitor API server, scheduler, controller manager, DNS, CNI, and node health',
    'Keep node pools replaceable and automated',
    'Back up etcd for self-managed clusters',
    'Plan cluster upgrades and add-on compatibility',
    'Document failure domains across zones and node pools',
  ],
  architectNote: `Cluster architecture is a dependency map. If you know which component owns each decision, Kubernetes debugging becomes methodical instead of mystical.`,
  faqs: [
    { question: 'What are the main control-plane components?', answer: 'API server, etcd, scheduler, controller manager, and often cloud-controller-manager in cloud environments.' },
    { question: 'What runs on worker nodes?', answer: 'Kubelet, container runtime, networking components, node-level agents, and application Pods.' },
  ],
  keyTakeaways: [
    'Control plane manages cluster state and decisions',
    'Worker nodes run application Pods',
    'API server and etcd are central to cluster behavior',
    'CNI, DNS, and node health are production-critical',
  ],
  relatedTopics: ['kubernetes-control-plane', 'kubernetes-worker-nodes', 'kubernetes-pods'],
});

export const kubernetesControlPlane = topic({
  slug: 'kubernetes-control-plane',
  title: 'Control Plane',
  description: 'Understand the Kubernetes control plane: API server, etcd, scheduler, controllers, admission, high availability, and operational risk.',
  quickUnderstanding: 'The control plane is the brain of Kubernetes. It receives API requests, stores desired state, schedules Pods, and runs controllers that reconcile the cluster.',
  whatIsIt: `The Kubernetes control plane is the set of components that manage cluster state and decisions.

It includes the API server, etcd, scheduler, controller manager, admission controllers, and cloud-controller integrations in cloud clusters.`,
  whyWeNeedIt: `Without a healthy control plane, teams cannot reliably deploy, scale, inspect, or recover workloads.

Existing Pods may keep running during some control-plane issues, but operational control of the cluster is degraded.`,
  realWorldUsage: `In EKS, AKS, or GKE, the provider runs the managed control plane. Platform teams still monitor API availability, audit access, manage admission policies, configure add-ons, and plan version upgrades.

In regulated self-managed clusters, teams run multiple control-plane nodes and maintain etcd backups and certificate rotation.`,
  howItWorks: `The API server is the entry point. It authenticates, authorizes, validates, and admits requests. State is stored in etcd. The scheduler assigns unscheduled Pods to nodes. Controllers watch desired state and reconcile resources.`,
  exampleTitle: 'Control-plane request path',
  exampleDescription: 'What happens when a manifest is applied.',
  exampleLanguage: 'text',
  exampleCode: `kubectl apply
  -> authenticate user/service account
  -> authorize through RBAC
  -> run admission validation/mutation
  -> persist object in etcd
  -> controllers observe desired state
  -> scheduler places Pods
  -> kubelets execute work on nodes`,
  commonConfusions: [
    { question: 'Will apps stop immediately if the control plane is unavailable?', answer: 'Usually running Pods continue, but scheduling, scaling, deployment, and some control operations are affected.' },
    { question: 'Does managed Kubernetes remove all control-plane concerns?', answer: 'No. It reduces operational burden, but access, API usage, upgrades, admission, and add-ons still matter.' },
    { question: 'Is etcd optional?', answer: 'No. etcd is the persistent store for Kubernetes cluster state.' },
  ],
  productionIssues: [
    '**API server overload** from controllers, CI, or list/watch misuse.',
    '**Bad admission policy** blocks legitimate deployments cluster-wide.',
    '**etcd data loss** in self-managed clusters causes severe recovery problems.',
    '**Unplanned upgrades** break add-ons or deprecated API versions.',
  ],
  bestPractices: [
    'Use managed control planes when possible unless self-management is justified',
    'Monitor API latency, errors, and admission failures',
    'Audit control-plane access with RBAC and logs',
    'Test upgrades in non-production clusters first',
    'Back up etcd for self-managed clusters',
    'Keep admission policies versioned and safely rolled out',
  ],
  architectNote: `The control plane is a shared platform dependency. Treat changes to API access, admission, and upgrades like production platform releases, not routine app deployments.`,
  keyTakeaways: [
    'The control plane stores and reconciles desired state',
    'API server, etcd, scheduler, and controllers are core components',
    'Managed Kubernetes still requires governance and upgrade planning',
    'Admission and RBAC can affect every team in the cluster',
  ],
  relatedTopics: ['kubernetes-cluster-architecture', 'kubernetes-rbac', 'kubernetes-high-availability'],
});

export const kubernetesWorkerNodes = topic({
  slug: 'kubernetes-worker-nodes',
  title: 'Worker Nodes',
  description: 'Learn Kubernetes worker nodes, kubelet, container runtime, node pools, taints, capacity, upgrades, and production operations.',
  quickUnderstanding: 'Worker nodes are the machines that run application Pods. Kubelet manages Pods on each node, while the container runtime starts containers and node agents provide networking, logging, and monitoring.',
  whatIsIt: `A worker node is a VM or physical machine that runs Kubernetes workloads.

Each node has kubelet, a container runtime, networking components, and system agents. Nodes provide CPU, memory, ephemeral storage, and network capacity to Pods.`,
  whyWeNeedIt: `Applications need actual compute resources. Worker nodes provide the capacity and failure domains where Pods run.

Node design affects cost, scheduling, availability, performance, and security.`,
  realWorldUsage: `An enterprise cluster may have separate node pools for general services, memory-heavy workloads, GPU jobs, and platform add-ons. Taints and tolerations keep special workloads on the right nodes.

Autoscaling adjusts node count, while rolling node replacement handles patching and Kubernetes upgrades.`,
  howItWorks: `The scheduler assigns Pods to nodes based on available resources, selectors, affinity, taints, tolerations, and constraints.

Kubelet watches assigned Pods, pulls images, starts containers, runs probes, mounts volumes, and reports Pod and node status.`,
  exampleTitle: 'Node pool plan',
  exampleDescription: 'A practical node-pool layout for enterprise workloads.',
  exampleLanguage: 'text',
  exampleCode: `system-pool:
  purpose: DNS, ingress, monitoring agents
  taint: CriticalAddonsOnly

app-pool:
  purpose: stateless application services
  scaling: Cluster Autoscaler

batch-pool:
  purpose: Jobs and CronJobs
  scaling: scale-to-zero where supported

gpu-pool:
  purpose: ML workloads
  scheduling: nodeSelector + tolerations`,
  commonConfusions: [
    { question: 'Is a node the same as a Pod?', answer: 'No. A node is a machine. A Pod is a workload scheduled onto a node.' },
    { question: 'Can Pods move automatically if a node dies?', answer: 'Controller-managed Pods are recreated on healthy nodes, but local ephemeral state is lost.' },
    { question: 'Should every workload use the same node pool?', answer: 'No. Separate pools help with cost, security, performance, and operational ownership.' },
  ],
  productionIssues: [
    '**Node pressure** causes Pod evictions due to CPU, memory, disk, or PID exhaustion.',
    '**Unpatched nodes** accumulate kernel and runtime vulnerabilities.',
    '**Poor instance sizing** wastes money or fragments schedulable capacity.',
    '**No disruption planning** lets node upgrades take down too many Pods.',
  ],
  bestPractices: [
    'Use multiple node pools for distinct workload profiles',
    'Set Pod requests so scheduling is accurate',
    'Use PodDisruptionBudgets for important workloads',
    'Automate node upgrades and replacements',
    'Monitor node pressure, allocatable capacity, and kubelet health',
    'Use taints, tolerations, selectors, and affinity deliberately',
  ],
  architectNote: `Nodes are the cost and capacity reality behind Kubernetes abstractions. Good platform design makes nodes replaceable while still respecting workload needs.`,
  faqs: [
    { question: 'What is kubelet?', answer: 'Kubelet is the agent on each node that runs assigned Pods and reports status back to the control plane.' },
    { question: 'What is a node pool?', answer: 'A node pool is a group of similar nodes managed together, often with shared VM size, labels, taints, and scaling settings.' },
  ],
  keyTakeaways: [
    'Worker nodes run application Pods',
    'Kubelet manages Pods on each node',
    'Node pools shape cost, reliability, and scheduling',
    'Requests, disruption budgets, and autoscaling make nodes operable',
  ],
  relatedTopics: ['kubernetes-cluster-architecture', 'kubernetes-pods', 'kubernetes-cluster-autoscaler'],
});

export const kubernetesPods = topic({
  slug: 'kubernetes-pods',
  title: 'Pods',
  description: 'Understand Kubernetes Pods as the smallest deployable unit, including containers, lifecycle, probes, resources, networking, and debugging.',
  quickUnderstanding: 'A Pod is the smallest deployable Kubernetes unit. It wraps one or more containers that share network identity, volumes, and lifecycle.',
  whatIsIt: `A Pod represents one running instance of a workload in Kubernetes.

Most Pods contain one application container, but sidecars such as proxies, log shippers, or service mesh agents can run alongside it.`,
  whyWeNeedIt: `Containers need scheduling, networking, volumes, lifecycle, and health management. Pods provide the Kubernetes wrapper around containers so the platform can manage them consistently.`,
  realWorldUsage: `A payment API Pod may include the main application container plus a service mesh sidecar. It declares CPU and memory requests, exposes port 8080, reads config from ConfigMaps and Secrets, and has readiness and liveness probes.

The Pod is usually created by a Deployment rather than managed directly.`,
  howItWorks: `A Pod gets a unique IP address inside the cluster. Containers inside the Pod share localhost networking and mounted volumes.

Kubelet pulls images, starts containers, runs probes, restarts containers according to policy, and reports status. If the Pod is deleted, controllers such as Deployments create replacements.`,
  exampleTitle: 'Production-minded Pod spec',
  exampleDescription: 'A compact Pod example with resources and probes.',
  exampleLanguage: 'yaml',
  exampleCode: `apiVersion: v1
kind: Pod
metadata:
  name: orders-api
  labels:
    app: orders-api
spec:
  containers:
    - name: api
      image: registry.company.com/orders-api:1.24.0
      ports:
        - containerPort: 8080
      resources:
        requests:
          cpu: "250m"
          memory: "512Mi"
        limits:
          memory: "1Gi"
      readinessProbe:
        httpGet:
          path: /health/ready
          port: 8080
      livenessProbe:
        httpGet:
          path: /health/live
          port: 8080`,
  commonConfusions: [
    { question: 'Should I deploy Pods directly?', answer: 'Usually no. Use Deployments, StatefulSets, Jobs, or DaemonSets so controllers can recreate and manage Pods.' },
    { question: 'Is a Pod the same as a container?', answer: 'No. A Pod can contain one or more containers and adds Kubernetes networking, volumes, and lifecycle.' },
    { question: 'Does a Pod IP stay stable?', answer: 'No. Pod IPs are ephemeral. Use Services for stable access.' },
  ],
  productionIssues: [
    '**No readiness probe** sends traffic to Pods before the app is ready.',
    '**No resource requests** causes poor scheduling and node instability.',
    '**Using latest image tag** makes rollouts non-repeatable.',
    '**Writing important data to ephemeral filesystem** loses data when Pods restart.',
  ],
  bestPractices: [
    'Deploy Pods through controllers, not as standalone objects',
    'Set resource requests and memory limits',
    'Use readiness, liveness, and startup probes appropriately',
    'Use immutable image tags or digests',
    'Keep Pods stateless unless using a workload designed for state',
    'Use labels consistently for selection and observability',
  ],
  architectNote: `Pods are disposable. Design applications so losing a Pod is ordinary, not an incident.`,
  faqs: [
    { question: 'How do I debug a Pod?', answer: 'Use kubectl describe, logs, events, exec when appropriate, and check probes, resources, image pulls, volumes, and node status.' },
    { question: 'What is a sidecar?', answer: 'A sidecar is a helper container in the same Pod that supports the main application, such as a proxy or log collector.' },
  ],
  keyTakeaways: [
    'Pods are the smallest Kubernetes deployment unit',
    'Pods are usually managed by higher-level controllers',
    'Pod IPs are ephemeral',
    'Resources and probes are production basics',
  ],
  relatedTopics: ['kubernetes-deployments', 'kubernetes-services', 'kubernetes-configmaps', 'kubernetes-secrets'],
});

export const kubernetesReplicaSets = topic({
  slug: 'kubernetes-replicasets',
  title: 'ReplicaSets',
  description: 'Learn ReplicaSets as the controller that keeps a desired number of matching Pods running, usually behind Deployments.',
  quickUnderstanding: 'A ReplicaSet keeps a specified number of matching Pods running. In daily work, Deployments create and manage ReplicaSets for rollout history.',
  whatIsIt: `A ReplicaSet is a Kubernetes controller that ensures a desired number of Pod replicas exist.

It uses a selector to find matching Pods and creates or deletes Pods to match the requested replica count.`,
  whyWeNeedIt: `Applications need multiple replicas for availability and load handling.

ReplicaSets provide self-healing at the Pod count level, but Deployments add rollout and rollback features on top.`,
  realWorldUsage: `When an application team deploys a new version using a Deployment, Kubernetes creates a new ReplicaSet for the new Pod template and scales down the old ReplicaSet during the rolling update.

Operations teams usually inspect ReplicaSets while debugging rollout history, not when designing application manifests directly.`,
  howItWorks: `The ReplicaSet controller watches ReplicaSet objects and Pods. If fewer matching Pods exist than desired, it creates more. If too many exist, it deletes extras.

The selector must match the Pod template labels or the ReplicaSet cannot manage its Pods correctly.`,
  exampleTitle: 'ReplicaSet relationship',
  exampleDescription: 'How Deployment, ReplicaSet, and Pods relate.',
  exampleLanguage: 'text',
  exampleCode: `Deployment: orders-api
  -> ReplicaSet: orders-api-7f8c9d
       replicas: 4
       selector: app=orders-api,pod-template-hash=7f8c9d
       Pods:
         orders-api-7f8c9d-a
         orders-api-7f8c9d-b
         orders-api-7f8c9d-c
         orders-api-7f8c9d-d`,
  commonConfusions: [
    { question: 'Should I create ReplicaSets manually?', answer: 'Usually no. Use Deployments for stateless applications because they manage ReplicaSets and rollout behavior.' },
    { question: 'Is ReplicaSet the same as replication controller?', answer: 'ReplicaSet is the newer controller with set-based selectors. ReplicationController is older.' },
    { question: 'Does a ReplicaSet expose network traffic?', answer: 'No. Use a Service to provide stable networking to matching Pods.' },
  ],
  productionIssues: [
    '**Selector mismatch** prevents the ReplicaSet from managing intended Pods.',
    '**Manual scaling of child ReplicaSet** gets overwritten by the Deployment.',
    '**Too many retained ReplicaSets** can clutter debugging if revision history is not controlled.',
    '**Confusing old ReplicaSets** during rollback investigation slows incident response.',
  ],
  bestPractices: [
    'Use Deployments instead of direct ReplicaSets for stateless apps',
    'Keep labels and selectors consistent and immutable',
    'Control Deployment revision history',
    'Inspect ReplicaSets when debugging rollouts',
    'Use Services for stable access to replica Pods',
  ],
  architectNote: `ReplicaSets are mostly an internal mechanism behind Deployments. Knowing them helps you read rollout history and understand why Pods are being created or deleted.`,
  faqs: [
    { question: 'What creates ReplicaSets?', answer: 'Deployments commonly create ReplicaSets for each rollout revision.' },
    { question: 'Can a ReplicaSet replace failed Pods?', answer: 'Yes. It creates replacements when the number of matching Pods drops below desired replicas.' },
  ],
  keyTakeaways: [
    'ReplicaSets maintain Pod replica count',
    'Deployments usually manage ReplicaSets',
    'Selectors determine ownership',
    'ReplicaSets do not provide stable networking by themselves',
  ],
  relatedTopics: ['kubernetes-deployments', 'kubernetes-pods', 'kubernetes-rolling-updates'],
});

export const kubernetesDeployments = topic({
  slug: 'kubernetes-deployments',
  title: 'Deployments',
  description: 'Understand Kubernetes Deployments for stateless applications, rolling updates, replica management, rollout status, and rollback.',
  quickUnderstanding: 'A Deployment manages stateless Pods through ReplicaSets. It is the default object for rolling out scalable application services safely.',
  whatIsIt: `A Deployment is a higher-level Kubernetes controller for stateless workloads.

It manages ReplicaSets, desired replicas, Pod templates, rolling updates, rollout history, and rollback behavior.`,
  whyWeNeedIt: `Teams need a safe way to run multiple copies of an application and update them without downtime.

Deployments provide declarative rollout control and self-healing for common web APIs and services.`,
  realWorldUsage: `An enterprise API team deploys a container image through a Deployment with four replicas, readiness probes, resource requests, and rolling update settings. CI updates the image tag through GitOps. Prometheus and CloudWatch observe rollout health.

If error rate rises, the team rolls back to the previous ReplicaSet.`,
  howItWorks: `A Deployment owns ReplicaSets. When the Pod template changes, the Deployment creates a new ReplicaSet and gradually shifts replicas from old to new according to the rollout strategy.

Readiness probes determine when new Pods are safe to receive traffic.`,
  exampleTitle: 'Deployment manifest',
  exampleDescription: 'A stateless API Deployment with rolling update controls.',
  exampleLanguage: 'yaml',
  exampleCode: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      containers:
        - name: api
          image: registry.company.com/orders-api:1.24.0
          ports:
            - containerPort: 8080`,
  commonConfusions: [
    { question: 'Are Deployments for databases?', answer: 'Usually no. Use StatefulSets or managed databases for stateful workloads needing stable identity and storage.' },
    { question: 'Does Deployment rollback restore database schema?', answer: 'No. Deployment rollback only changes workload template. Data migrations require separate strategy.' },
    { question: 'Do Deployments create Services?', answer: 'No. Services are separate objects that select Pods by labels.' },
  ],
  productionIssues: [
    '**No readiness probe** causes bad rollouts because Kubernetes thinks Pods are ready too early.',
    '**Bad rollout settings** take down too many replicas at once.',
    '**Image tag reuse** makes rollback unclear.',
    '**Schema migration mismatch** breaks old or new app versions during rollout.',
  ],
  bestPractices: [
    'Use Deployments for stateless services',
    'Set readiness probes and resource requests',
    'Use immutable image tags or digests',
    'Tune maxSurge and maxUnavailable for availability needs',
    'Use PodDisruptionBudgets for important services',
    'Separate database migrations from app rollout strategy',
  ],
  architectNote: `Deployments make application change safer, but only if the app exposes truthful readiness and remains compatible during mixed-version rollout windows.`,
  faqs: [
    { question: 'How do I check rollout status?', answer: 'Use kubectl rollout status deployment/<name> and inspect events, ReplicaSets, and Pod readiness.' },
    { question: 'How do I rollback a Deployment?', answer: 'Use kubectl rollout undo deployment/<name>, assuming revision history is available and the previous image still exists.' },
  ],
  keyTakeaways: [
    'Deployments manage stateless workloads',
    'They create and manage ReplicaSets',
    'Rolling updates depend on readiness and strategy settings',
    'Rollback is workload-level, not database-level',
  ],
  relatedTopics: ['kubernetes-replicasets', 'kubernetes-pods', 'kubernetes-services', 'kubernetes-rolling-updates'],
});

export const kubernetesNamespaces = topic({
  slug: 'kubernetes-namespaces',
  title: 'Namespaces',
  description: 'Learn Kubernetes namespaces for organizing resources, access control, quotas, network policy, and multi-team cluster governance.',
  quickUnderstanding: 'A namespace is a logical partition inside a Kubernetes cluster. It helps separate teams, environments, applications, policies, and quotas.',
  whatIsIt: `A Namespace groups Kubernetes objects under a logical name.

Many objects such as Pods, Services, Deployments, ConfigMaps, and Secrets live in namespaces. Some resources such as Nodes and StorageClasses are cluster-scoped.`,
  whyWeNeedIt: `Shared clusters need boundaries for ownership, access, quota, naming, and policy.

Namespaces make it easier to separate dev, staging, production, platform add-ons, and team workloads.`,
  realWorldUsage: `An enterprise cluster may have namespaces such as payments-prod, orders-prod, observability, ingress-system, and platform-security.

Each namespace has RBAC bindings, ResourceQuotas, LimitRanges, NetworkPolicies, and labels used by policy engines and cost reporting.`,
  howItWorks: `The namespace becomes part of the object identity. kubectl commands target a namespace with -n or context defaults.

Policies such as RBAC, ResourceQuota, LimitRange, and NetworkPolicy can scope behavior inside namespaces.`,
  exampleTitle: 'Namespace governance baseline',
  exampleDescription: 'A typical namespace setup checklist.',
  exampleLanguage: 'yaml',
  exampleCode: `apiVersion: v1
kind: Namespace
metadata:
  name: orders-prod
  labels:
    owner: orders-team
    environment: prod
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: orders-prod
spec:
  hard:
    requests.cpu: "20"
    requests.memory: 40Gi
    pods: "100"`,
  commonConfusions: [
    { question: 'Are namespaces a hard security boundary?', answer: 'Not by themselves. They support policies, but RBAC, NetworkPolicies, admission controls, and cluster configuration enforce security.' },
    { question: 'Can Services talk across namespaces?', answer: 'Yes, if networking and policies allow it. DNS can address services by namespace.' },
    { question: 'Are nodes namespaced?', answer: 'No. Nodes are cluster-scoped resources.' },
  ],
  productionIssues: [
    '**No quotas** allows one team to consume cluster capacity.',
    '**Default namespace usage** hides ownership and policy intent.',
    '**Broad RBAC across namespaces** weakens tenant separation.',
    '**No namespace labels** breaks policy, cost, and automation targeting.',
  ],
  bestPractices: [
    'Create namespaces by team, environment, or application ownership',
    'Avoid production workloads in the default namespace',
    'Apply ResourceQuotas and LimitRanges',
    'Use namespace-scoped RBAC where possible',
    'Apply baseline NetworkPolicies and Pod Security labels',
    'Label namespaces for ownership, environment, and cost',
  ],
  architectNote: `Namespaces are where platform governance becomes practical. They are not walls by themselves, but they give policy systems a place to attach intent.`,
  faqs: [
    { question: 'How do I switch namespaces?', answer: 'Use kubectl -n <namespace> for commands or set the namespace in your kubeconfig context.' },
    { question: 'Can two namespaces have Services with the same name?', answer: 'Yes. Names are unique within a namespace, not across all namespaces.' },
  ],
  keyTakeaways: [
    'Namespaces organize namespaced resources',
    'They support ownership, quotas, RBAC, and policy',
    'They are not complete security boundaries alone',
    'Production should avoid the default namespace',
  ],
  relatedTopics: ['kubernetes-rbac', 'kubernetes-network-policies', 'kubernetes-pod-security'],
});

const moreTopics: TopicContent[] = [
  topic({
    slug: 'kubernetes-services',
    title: 'Services',
    description: 'Understand Kubernetes Services for stable networking, service discovery, load balancing, and traffic routing to Pods.',
    quickUnderstanding: 'A Service gives a stable virtual IP and DNS name for a changing set of Pods selected by labels.',
    whatIsIt: `A Service is a Kubernetes networking object that exposes Pods through a stable name and virtual IP.

Services decouple clients from ephemeral Pod IPs and provide load balancing across ready endpoints.`,
    whyWeNeedIt: `Pods are temporary and their IPs change. Applications need stable service discovery and traffic distribution across replicas.`,
    realWorldUsage: `A frontend calls http://orders-api.orders-prod.svc.cluster.local. The Service selects Pods labeled app=orders-api and routes only to ready endpoints. Internal services use ClusterIP, while external entry usually goes through Ingress or a cloud load balancer.`,
    howItWorks: `The Service selector finds matching Pods. EndpointSlice objects track ready endpoints. Cluster networking routes requests from the Service IP or DNS name to one of the backing Pod IPs.`,
    exampleTitle: 'ClusterIP Service',
    exampleDescription: 'Stable internal access to a Deployment.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: v1
kind: Service
metadata:
  name: orders-api
spec:
  type: ClusterIP
  selector:
    app: orders-api
  ports:
    - port: 80
      targetPort: 8080`,
    commonConfusions: [
      { question: 'Does a Service create Pods?', answer: 'No. It routes to existing Pods selected by labels.' },
      { question: 'Is LoadBalancer Service the same as Ingress?', answer: 'No. LoadBalancer exposes one service through a cloud load balancer. Ingress routes HTTP traffic to multiple Services.' },
      { question: 'Why is my Service not routing?', answer: 'Common causes are selector mismatch, Pods not ready, wrong targetPort, or NetworkPolicy blocking traffic.' },
    ],
    productionIssues: [
      '**Selector mismatch** creates a Service with no endpoints.',
      '**Wrong targetPort** causes connection failures.',
      '**Using LoadBalancer for every service** increases cloud cost and sprawl.',
      '**Traffic to unready Pods** happens when readiness probes are missing or wrong.',
    ],
    bestPractices: [
      'Use ClusterIP for internal service-to-service traffic',
      'Use clear labels and selectors',
      'Check EndpointSlices when debugging traffic',
      'Expose HTTP apps through Ingress where appropriate',
      'Avoid unnecessary public LoadBalancer Services',
    ],
    architectNote: `Services are the stable contract between applications. Pods come and go; Service names should be boring, predictable, and observable.`,
    keyTakeaways: ['Services provide stable access to Pods', 'Selectors connect Services to endpoints', 'ClusterIP is the normal internal type', 'Debug Services by checking selectors, endpoints, ports, and policies'],
    relatedTopics: ['kubernetes-pods', 'kubernetes-deployments', 'kubernetes-ingress', 'kubernetes-dns'],
  }),
  topic({
    slug: 'kubernetes-ingress',
    title: 'Ingress',
    description: 'Learn Kubernetes Ingress for HTTP routing, TLS, host/path rules, ingress controllers, and production edge design.',
    quickUnderstanding: 'Ingress defines HTTP and HTTPS routing rules into the cluster. An ingress controller implements those rules using a proxy or cloud load balancer.',
    whatIsIt: `Ingress is a Kubernetes API object for external HTTP routing.

It maps hosts and paths to Services and commonly handles TLS termination, redirects, and edge routing features through annotations or controller-specific configuration.`,
    whyWeNeedIt: `Production clusters need controlled external entry points without creating a separate cloud load balancer for every Service.`,
    realWorldUsage: `A SaaS cluster routes api.company.com/orders to the orders Service and api.company.com/billing to the billing Service. TLS certificates are managed by cert-manager, WAF lives at the cloud edge, and ingress logs feed security analytics.`,
    howItWorks: `An ingress controller watches Ingress objects and configures an implementation such as NGINX, HAProxy, Traefik, ALB Ingress Controller, or a cloud-native gateway. Traffic enters the controller and is routed to backend Services.`,
    exampleTitle: 'HTTP Ingress rule',
    exampleDescription: 'Host and path routing to a backend Service.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
spec:
  ingressClassName: nginx
  tls:
    - hosts: [api.company.com]
      secretName: api-tls
  rules:
    - host: api.company.com
      http:
        paths:
          - path: /orders
            pathType: Prefix
            backend:
              service:
                name: orders-api
                port:
                  number: 80`,
    commonConfusions: [
      { question: 'Does Ingress work without an ingress controller?', answer: 'No. The Ingress object is only desired state. A controller must implement it.' },
      { question: 'Is Ingress for TCP traffic?', answer: 'Standard Ingress is HTTP/HTTPS. Other protocols need controller-specific features or Services.' },
      { question: 'Is TLS Secret the same as application Secret?', answer: 'It is still a Kubernetes Secret, but it stores certificate material for TLS termination.' },
    ],
    productionIssues: [
      '**No ingress controller** leaves Ingress rules inert.',
      '**TLS certificate expiry** breaks public access.',
      '**Annotation drift** creates controller-specific behavior that is hard to migrate.',
      '**No rate limiting or WAF** exposes public APIs to abuse.',
    ],
    bestPractices: [
      'Standardize ingress controllers per platform',
      'Automate TLS certificates and renewal',
      'Use clear host/path ownership',
      'Enable access logs and request metrics',
      'Protect public ingress with WAF, auth, and rate limits where needed',
    ],
    architectNote: `Ingress is the front door. Treat it like a product edge: certificates, routes, logs, security controls, and ownership should be explicit.`,
    keyTakeaways: ['Ingress defines HTTP routing', 'An ingress controller is required', 'TLS and host/path ownership matter', 'Public ingress needs observability and security controls'],
    relatedTopics: ['kubernetes-services', 'kubernetes-dns', 'kubernetes-network-policies'],
  }),
  topic({
    slug: 'kubernetes-dns',
    title: 'DNS',
    description: 'Understand Kubernetes DNS, CoreDNS, service names, namespace-qualified lookup, and debugging service discovery.',
    quickUnderstanding: 'Kubernetes DNS gives Services and Pods discoverable names. Most apps call Services by DNS name instead of Pod IP.',
    whatIsIt: `Kubernetes DNS is cluster service discovery, commonly implemented by CoreDNS.

It creates DNS records for Services and supports namespace-qualified names such as orders-api.orders-prod.svc.cluster.local.`,
    whyWeNeedIt: `Applications need stable names for dependencies. DNS lets Pods discover Services even as Pod IPs and endpoints change.`,
    realWorldUsage: `A checkout service in the web namespace calls orders-api.orders-prod.svc.cluster.local for order creation. Platform teams monitor CoreDNS latency, cache behavior, and error rates because DNS problems look like application outages.`,
    howItWorks: `CoreDNS runs in the cluster and watches Kubernetes Service and EndpointSlice data. Pods receive DNS configuration so short names, namespace names, and fully qualified service names resolve inside the cluster.`,
    exampleTitle: 'Service DNS names',
    exampleDescription: 'Common DNS forms inside a cluster.',
    exampleLanguage: 'text',
    exampleCode: `Same namespace:
  http://orders-api

Different namespace:
  http://orders-api.orders-prod

Fully qualified:
  http://orders-api.orders-prod.svc.cluster.local

Debug:
  kubectl exec -n web deploy/frontend -- nslookup orders-api.orders-prod`,
    commonConfusions: [
      { question: 'Should apps use Pod IPs?', answer: 'No. Pod IPs are ephemeral. Use Service DNS names.' },
      { question: 'Why does a short service name fail?', answer: 'Short names resolve in the caller namespace. Use namespace-qualified names for cross-namespace calls.' },
      { question: 'Is CoreDNS optional?', answer: 'Cluster DNS is foundational for most Kubernetes workloads. CoreDNS is the common implementation.' },
    ],
    productionIssues: [
      '**CoreDNS under-provisioned** causes intermittent service lookup failures.',
      '**Cross-namespace short names** point to the wrong namespace or fail.',
      '**DNS search path surprises** add latency or ambiguity.',
      '**No DNS monitoring** makes service discovery issues hard to identify.',
    ],
    bestPractices: [
      'Use Service DNS names instead of Pod IPs',
      'Use namespace-qualified names for cross-namespace traffic',
      'Monitor CoreDNS latency, errors, and saturation',
      'Scale CoreDNS appropriately for cluster size',
      'Include DNS checks in network troubleshooting runbooks',
    ],
    architectNote: `DNS is invisible until it fails. In Kubernetes, service discovery is only as reliable as CoreDNS and the naming practices teams follow.`,
    keyTakeaways: ['Kubernetes DNS supports Service discovery', 'CoreDNS is production-critical', 'Cross-namespace calls should be explicit', 'DNS issues often look like app or network failures'],
    relatedTopics: ['kubernetes-services', 'kubernetes-ingress', 'kubernetes-network-policies'],
  }),
  topic({
    slug: 'kubernetes-network-policies',
    title: 'Network Policies',
    description: 'Learn Kubernetes NetworkPolicies for controlling Pod-to-Pod and Pod-to-external traffic in supported CNI environments.',
    quickUnderstanding: 'NetworkPolicies define which Pods can talk to which other Pods or network ranges. They require a CNI plugin that enforces them.',
    whatIsIt: `A NetworkPolicy is a Kubernetes object for network-level traffic control.

It can restrict ingress and egress for selected Pods based on Pod selectors, namespace selectors, IP blocks, ports, and protocols.`,
    whyWeNeedIt: `By default, many clusters allow broad Pod-to-Pod communication. Production platforms need network segmentation to reduce blast radius and support compliance.`,
    realWorldUsage: `A payments namespace allows traffic to payment-api only from checkout Pods and allows egress only to the database Service and approved external payment endpoints. Everything else is denied by default.`,
    howItWorks: `NetworkPolicies select Pods and define allowed ingress or egress. Once a Pod is selected by a policy for a direction, only explicitly allowed traffic is permitted for that direction.

The CNI plugin must implement policy enforcement.`,
    exampleTitle: 'Allow traffic from one app',
    exampleDescription: 'A policy allowing checkout Pods to call payment Pods.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-checkout-to-payments
  namespace: payments
spec:
  podSelector:
    matchLabels:
      app: payment-api
  policyTypes: [Ingress]
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: checkout
          podSelector:
            matchLabels:
              app: checkout-api
      ports:
        - protocol: TCP
          port: 8080`,
    commonConfusions: [
      { question: 'Do NetworkPolicies work in every cluster?', answer: 'No. The CNI plugin must support and enforce NetworkPolicy.' },
      { question: 'Are NetworkPolicies firewalls for Services?', answer: 'They apply to selected Pods, not Services directly.' },
      { question: 'Does creating one policy block all traffic?', answer: 'Only selected Pods become restricted for the policy direction. A default-deny policy is usually created separately.' },
    ],
    productionIssues: [
      '**CNI does not enforce policy** gives false confidence.',
      '**No default deny** leaves broad east-west traffic open.',
      '**DNS accidentally blocked** breaks service discovery.',
      '**Policies not tested** cause production connectivity outages.',
    ],
    bestPractices: [
      'Verify CNI NetworkPolicy support',
      'Start with namespace-level default deny in controlled rollouts',
      'Explicitly allow DNS where needed',
      'Model app dependencies before enforcing',
      'Test policies in staging and use observability for denied traffic',
    ],
    architectNote: `NetworkPolicies are microsegmentation for Kubernetes. They are most effective when combined with namespace ownership and clear service dependency maps.`,
    keyTakeaways: ['NetworkPolicies restrict Pod traffic', 'CNI support is required', 'Default deny must be intentional', 'DNS and dependency mapping are common pitfalls'],
    relatedTopics: ['kubernetes-services', 'kubernetes-namespaces', 'kubernetes-pod-security'],
  }),
];

interface CompactSpec {
  slug: string;
  title: string;
  description: string;
  quick: string;
  what: string;
  need: string;
  usage: string;
  works: string;
  exampleTitle: string;
  exampleDescription: string;
  exampleLanguage: string;
  exampleCode: string;
  confusions: Confusion[];
  issues: string[];
  practices: string[];
  note: string;
  takeaways: string[];
  relatedTopics: string[];
}

function compact(input: CompactSpec): TopicContent {
  return topic({
    slug: input.slug,
    title: input.title,
    description: input.description,
    quickUnderstanding: input.quick,
    whatIsIt: input.what,
    whyWeNeedIt: input.need,
    realWorldUsage: input.usage,
    howItWorks: input.works,
    exampleTitle: input.exampleTitle,
    exampleDescription: input.exampleDescription,
    exampleLanguage: input.exampleLanguage,
    exampleCode: input.exampleCode,
    commonConfusions: input.confusions,
    productionIssues: input.issues,
    bestPractices: input.practices,
    architectNote: input.note,
    keyTakeaways: input.takeaways,
    relatedTopics: input.relatedTopics,
  });
}

const compactTopics: TopicContent[] = [
  compact({
    slug: 'kubernetes-configmaps',
    title: 'ConfigMaps',
    description: 'Learn Kubernetes ConfigMaps for non-sensitive application configuration, environment variables, mounted files, and configuration rollout behavior.',
    quick: 'A ConfigMap stores non-sensitive configuration separately from container images so the same image can run in multiple environments.',
    what: `A ConfigMap is a namespaced Kubernetes object that stores key-value configuration.

Pods can consume ConfigMaps as environment variables, command arguments, or mounted files.`,
    need: `Applications need environment-specific settings such as feature flags, URLs, log levels, and file-based configuration without rebuilding images.`,
    usage: `An enterprise API may keep LOG_LEVEL, API_BASE_URL, and feature flags in a ConfigMap. The same container image is promoted from dev to staging to production while configuration changes by namespace or environment.`,
    works: `The Pod spec references the ConfigMap. Kubernetes injects values during Pod startup or mounts them as files. Environment-variable values do not update until Pods restart; mounted files can update, but applications must reload them.`,
    exampleTitle: 'ConfigMap as environment',
    exampleDescription: 'Non-sensitive configuration for an API.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: v1
kind: ConfigMap
metadata:
  name: orders-config
data:
  LOG_LEVEL: "info"
  API_TIMEOUT_MS: "3000"
---
envFrom:
  - configMapRef:
      name: orders-config`,
    confusions: [
      { question: 'Can ConfigMaps store passwords?', answer: 'No. Use Secrets or an external secret manager for sensitive values.' },
      { question: 'Do ConfigMap env vars update live?', answer: 'No. Environment variables are read at Pod startup. Restart Pods for those changes.' },
      { question: 'Is a ConfigMap global?', answer: 'No. ConfigMaps are namespaced.' },
    ],
    issues: ['**Sensitive data in ConfigMaps** exposes credentials in plain configuration.', '**No rollout after config change** leaves Pods running old environment values.', '**Huge ConfigMaps** become hard to manage and audit.'],
    practices: ['Use ConfigMaps only for non-sensitive data', 'Version important config changes through GitOps or CI/CD', 'Restart or rollout Pods when env-based config changes', 'Keep keys clear and environment-specific ownership documented'],
    note: `Configuration is part of release behavior. Treat ConfigMap changes with the same review discipline as code when they affect production behavior.`,
    takeaways: ['ConfigMaps store non-sensitive config', 'They are namespaced', 'Env-based values require Pod restart', 'Secrets are for sensitive values'],
    relatedTopics: ['kubernetes-secrets', 'kubernetes-pods', 'kubernetes-deployments'],
  }),
  compact({
    slug: 'kubernetes-secrets',
    title: 'Secrets',
    description: 'Understand Kubernetes Secrets for sensitive configuration, service credentials, TLS material, image pulls, and external secret integration.',
    quick: 'A Secret stores sensitive values for Pods, but it still needs encryption, RBAC control, and careful integration with external secret managers.',
    what: `A Secret is a namespaced object used for sensitive values such as passwords, tokens, certificates, and image pull credentials.

Secrets can be mounted as files or exposed as environment variables.`,
    need: `Applications need credentials without baking them into images or committing them into manifests.`,
    usage: `A payments API receives database credentials from a Secret synced from AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault by an external secrets controller. RBAC limits who can read Secrets in the namespace.`,
    works: `Secrets are stored through the Kubernetes API. Pods reference them through env vars, volumes, service account tokens, TLS references, or imagePullSecrets. In production, secret encryption at rest and external rotation are important.`,
    exampleTitle: 'Secret reference',
    exampleDescription: 'Using a Secret as environment variables.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:
  username: orders_app
  password: replace-with-external-secret
---
env:
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db-credentials
        key: password`,
    confusions: [
      { question: 'Are Kubernetes Secrets encrypted automatically?', answer: 'They are base64 encoded by manifest format. Encryption at rest must be configured and verified by the platform.' },
      { question: 'Is base64 encryption?', answer: 'No. Base64 is encoding, not security.' },
      { question: 'Should secrets be committed to Git?', answer: 'Plain secrets should not. Use sealed/encrypted secret workflows or external secret managers.' },
    ],
    issues: ['**Plain Secrets in Git** leak credentials permanently.', '**Broad RBAC read access** lets users or workloads read secrets across namespaces.', '**No rotation plan** leaves stale credentials in production.', '**Secrets as env vars** can appear in process inspection or dumps.'],
    practices: ['Use external secret managers or encrypted GitOps workflows', 'Enable Kubernetes secret encryption at rest', 'Restrict Secret access with RBAC', 'Rotate credentials and test reload behavior', 'Prefer mounted files where operationally safer'],
    note: `A Kubernetes Secret is not a complete secrets strategy. Production needs encryption, access control, rotation, auditability, and a source of truth outside application YAML.`,
    takeaways: ['Secrets hold sensitive values', 'Base64 is not encryption', 'RBAC and encryption at rest matter', 'External secret managers are common in enterprises'],
    relatedTopics: ['kubernetes-configmaps', 'kubernetes-rbac', 'kubernetes-service-accounts'],
  }),
  compact({
    slug: 'kubernetes-persistent-volumes',
    title: 'Persistent Volumes',
    description: 'Learn Persistent Volumes as cluster storage resources for durable data, lifecycle, reclaim policies, and storage backend abstraction.',
    quick: 'A PersistentVolume is cluster storage made available to workloads. It represents real storage such as cloud disks, NFS, or CSI-backed volumes.',
    what: `A PersistentVolume is a cluster-scoped storage resource.

It abstracts physical or cloud-backed storage so workloads can claim durable capacity without knowing every backend detail.`,
    need: `Some workloads need data that survives Pod restarts, rescheduling, or replacement.`,
    usage: `A logging platform may use PersistentVolumes backed by cloud block disks. Platform teams define storage classes and reclaim policies, while app teams request storage through PVCs.`,
    works: `A PV has capacity, access modes, volume mode, reclaim policy, storage class, and backend details. A PVC binds to a suitable PV, either pre-provisioned or dynamically created by a CSI driver.`,
    exampleTitle: 'PersistentVolume concept',
    exampleDescription: 'A static PV example for shared storage.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: shared-data-pv
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  storageClassName: nfs-retain
  nfs:
    server: nfs.company.local
    path: /exports/shared-data`,
    confusions: [
      { question: 'Is a PV namespaced?', answer: 'No. PersistentVolumes are cluster-scoped.' },
      { question: 'Do Pods usually use PVs directly?', answer: 'No. Pods normally use PVCs, which bind to PVs.' },
      { question: 'Does persistent storage make a stateful app easy?', answer: 'No. Backups, consistency, failover, and operational procedures still matter.' },
    ],
    issues: ['**Wrong reclaim policy** deletes or retains data unexpectedly.', '**Backend access mode mismatch** prevents Pods from mounting storage.', '**No backup strategy** leaves durable data vulnerable.', '**Zonal volumes** block rescheduling across zones.'],
    practices: ['Use dynamic provisioning through StorageClasses where possible', 'Choose reclaim policy deliberately', 'Document access modes and topology limits', 'Back up important persistent data', 'Prefer managed databases for critical data where suitable'],
    note: `PersistentVolumes solve attachment, not data architecture. Stateful systems still need backup, restore, replication, and operational ownership.`,
    takeaways: ['PVs are cluster-scoped storage resources', 'PVCs bind workloads to PVs', 'Reclaim policy and access modes are critical', 'Durability needs backup and recovery planning'],
    relatedTopics: ['kubernetes-persistent-volume-claims', 'kubernetes-storage-classes', 'kubernetes-statefulsets'],
  }),
  compact({
    slug: 'kubernetes-persistent-volume-claims',
    title: 'Persistent Volume Claims',
    description: 'Understand PVCs as workload storage requests that bind to PersistentVolumes through size, access mode, and StorageClass.',
    quick: 'A PVC is a namespaced request for storage. Pods mount PVCs, and Kubernetes binds them to suitable PersistentVolumes.',
    what: `A PersistentVolumeClaim is a namespaced object that requests storage capacity and access mode.

It allows application manifests to ask for storage without hardcoding the storage backend.`,
    need: `Application teams need a simple way to request durable storage while platform teams manage storage backends.`,
    usage: `A StatefulSet for a message broker defines volumeClaimTemplates. Each replica gets its own PVC and durable volume, preserving identity and data across Pod restarts.`,
    works: `The PVC specifies storage size, access modes, and optionally a StorageClass. Kubernetes binds it to an existing PV or provisions a new PV dynamically through the StorageClass.`,
    exampleTitle: 'PVC manifest',
    exampleDescription: 'Requesting durable storage for a workload.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: orders-data
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 50Gi`,
    confusions: [
      { question: 'Is a PVC the actual disk?', answer: 'No. A PVC is the request. The PV represents the actual storage resource.' },
      { question: 'Can one PVC be used by many Pods?', answer: 'Only if the storage backend and access mode support it, such as ReadWriteMany.' },
      { question: 'Does deleting a PVC always delete data?', answer: 'It depends on the bound PV reclaim policy and storage backend.' },
    ],
    issues: ['**PVC stuck pending** due to missing StorageClass, topology constraints, or no matching PV.', '**Wrong access mode** blocks multi-Pod mounting.', '**Deleting PVC accidentally** risks data loss depending on reclaim policy.', '**No volume expansion plan** blocks growing workloads.'],
    practices: ['Use clear StorageClass names', 'Understand access modes before designing workloads', 'Protect important PVCs from accidental deletion', 'Test volume expansion and restore', 'Monitor storage usage before volumes fill up'],
    note: `PVCs give developers a clean storage request, but platform teams still need to define reliable classes, backups, and deletion safeguards.`,
    takeaways: ['PVCs are namespaced storage requests', 'Pods mount PVCs', 'Binding depends on StorageClass, access mode, and capacity', 'Deletion behavior depends on reclaim policy'],
    relatedTopics: ['kubernetes-persistent-volumes', 'kubernetes-storage-classes', 'kubernetes-statefulsets'],
  }),
  compact({
    slug: 'kubernetes-storage-classes',
    title: 'Storage Classes',
    description: 'Learn StorageClasses for dynamic volume provisioning, storage tiers, CSI drivers, reclaim policy, expansion, and topology.',
    quick: 'A StorageClass defines how Kubernetes should dynamically provision storage for PVCs.',
    what: `A StorageClass describes a storage tier and provisioner.

It can define backend driver, parameters, reclaim policy, binding mode, expansion support, and topology behavior.`,
    need: `Clusters need different storage options: fast SSD, standard disks, shared file storage, encrypted volumes, or retained backup-oriented storage.`,
    usage: `A platform team exposes classes such as fast-ssd, standard, shared-rwx, and retained-critical. Application teams choose the class that matches performance, cost, and recovery needs.`,
    works: `When a PVC references a StorageClass, the CSI provisioner creates a matching PV dynamically. Binding mode can wait for Pod scheduling so zonal storage is created in the correct zone.`,
    exampleTitle: 'StorageClass manifest',
    exampleDescription: 'A cloud disk storage class with delayed binding.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: csi.cloud-provider.example
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
parameters:
  type: ssd
  encrypted: "true"`,
    confusions: [
      { question: 'Is StorageClass namespaced?', answer: 'No. StorageClasses are cluster-scoped.' },
      { question: 'Does StorageClass store data?', answer: 'No. It defines provisioning behavior for volumes.' },
      { question: 'Is the default StorageClass always right?', answer: 'No. Defaults may not match production performance, retention, or topology needs.' },
    ],
    issues: ['**Wrong default class** provisions expensive or unsuitable storage.', '**Immediate binding in zonal clusters** creates volumes in unusable zones.', '**No expansion support** prevents growing PVCs.', '**Delete reclaim policy** removes data unexpectedly for critical workloads.'],
    practices: ['Define clear storage tiers', 'Use WaitForFirstConsumer for zonal storage', 'Enable expansion where appropriate', 'Name classes by behavior and cost', 'Review reclaim policy for critical data'],
    note: `StorageClasses are platform product offerings. A good cluster makes the safe storage choice obvious to application teams.`,
    takeaways: ['StorageClasses enable dynamic provisioning', 'They are cluster-scoped', 'Binding mode and reclaim policy matter', 'Storage tiers should be intentional'],
    relatedTopics: ['kubernetes-persistent-volumes', 'kubernetes-persistent-volume-claims'],
  }),
  compact({
    slug: 'kubernetes-horizontal-pod-autoscaler',
    title: 'Horizontal Pod Autoscaler',
    description: 'Understand HPA for scaling Pod replicas based on CPU, memory, custom metrics, and production traffic behavior.',
    quick: 'HPA automatically changes replica counts for workloads based on metrics such as CPU, memory, or custom application signals.',
    what: `Horizontal Pod Autoscaler is a Kubernetes controller that scales supported workloads such as Deployments and StatefulSets by adjusting replica count.`,
    need: `Applications experience changing load. HPA helps add replicas during demand and reduce replicas when demand drops.`,
    usage: `An API Deployment scales from 4 to 30 replicas based on request latency or CPU. Cluster Autoscaler adds nodes if the cluster lacks capacity for new Pods.`,
    works: `HPA queries metrics APIs, compares current metrics to target values, and updates the workload's scale subresource. Metrics Server supports resource metrics; adapters support custom and external metrics.`,
    exampleTitle: 'HPA manifest',
    exampleDescription: 'Scaling a Deployment by CPU utilization.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: orders-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: orders-api
  minReplicas: 4
  maxReplicas: 30
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 65`,
    confusions: [
      { question: 'Does HPA add nodes?', answer: 'No. HPA adds Pods. Cluster Autoscaler adds nodes when Pods cannot be scheduled.' },
      { question: 'Can HPA work without requests?', answer: 'CPU utilization scaling requires CPU requests to calculate utilization.' },
      { question: 'Is CPU always the best metric?', answer: 'No. Request rate, queue depth, or latency can be better for some applications.' },
    ],
    issues: ['**Missing CPU requests** breaks resource utilization scaling.', '**Scaling on wrong metric** adds replicas without fixing the bottleneck.', '**Too low maxReplicas** caps scale during traffic spikes.', '**No cluster capacity** leaves scaled Pods pending.'],
    practices: ['Set accurate resource requests', 'Choose metrics that reflect real demand', 'Load test HPA behavior', 'Pair HPA with Cluster Autoscaler', 'Use stabilization windows to reduce flapping'],
    note: `HPA is not magic capacity. It is a feedback loop. Good metrics and resource requests decide whether that loop helps or hurts.`,
    takeaways: ['HPA scales replicas', 'Metrics Server or adapters provide metrics', 'Requests are required for CPU utilization', 'Cluster capacity must scale too'],
    relatedTopics: ['kubernetes-cluster-autoscaler', 'kubernetes-metrics-server', 'kubernetes-deployments'],
  }),
  compact({
    slug: 'kubernetes-cluster-autoscaler',
    title: 'Cluster Autoscaler',
    description: 'Learn Cluster Autoscaler for adding and removing worker nodes based on unschedulable Pods and unused capacity.',
    quick: 'Cluster Autoscaler changes node count when Pods cannot be scheduled or when nodes are underutilized and safe to remove.',
    what: `Cluster Autoscaler is a component that adjusts the size of node groups in cloud or supported environments.`,
    need: `HPA can create more Pods, but those Pods need node capacity. Cluster Autoscaler helps the cluster grow and shrink with workload demand.`,
    usage: `During a flash sale, HPA increases API replicas. Some Pods become pending due to insufficient CPU. Cluster Autoscaler increases the app node pool, new nodes join, and pending Pods schedule.`,
    works: `The autoscaler watches for unschedulable Pods and evaluates node groups that can fit them. It also finds underutilized nodes that can be drained without violating constraints.`,
    exampleTitle: 'Autoscaling interaction',
    exampleDescription: 'How HPA and Cluster Autoscaler work together.',
    exampleLanguage: 'text',
    exampleCode: `Traffic spike
  -> HPA raises replicas from 6 to 18
  -> 8 Pods pending due to insufficient CPU
  -> Cluster Autoscaler scales app node group
  -> New nodes register
  -> Pending Pods schedule
  -> Later, unused nodes are drained and removed`,
    confusions: [
      { question: 'Does Cluster Autoscaler scale Pods?', answer: 'No. It scales nodes. HPA or workload controllers scale Pods.' },
      { question: 'Will it remove any low-use node?', answer: 'Only if Pods can be safely moved and constraints allow drain.' },
      { question: 'Does it ignore taints and selectors?', answer: 'No. It must choose node groups compatible with Pod scheduling constraints.' },
    ],
    issues: ['**Pod constraints too strict** prevent autoscaler from finding a suitable node group.', '**No PodDisruptionBudget** risks unsafe drain behavior.', '**Overly large nodes** create cost waste and scale granularity problems.', '**Cloud quota limits** block node scale-out.'],
    practices: ['Configure node groups by workload type', 'Use PodDisruptionBudgets for critical apps', 'Review cloud quotas before peak events', 'Right-size node pools for scheduling efficiency', 'Monitor pending Pods and scale-up failures'],
    note: `Cluster Autoscaler is capacity automation, not capacity planning replacement. Quotas, node pool design, and disruption policies still need architecture.`,
    takeaways: ['Cluster Autoscaler scales nodes', 'It reacts to unschedulable Pods', 'It removes safely drainable unused nodes', 'Pod constraints and quotas affect success'],
    relatedTopics: ['kubernetes-horizontal-pod-autoscaler', 'kubernetes-worker-nodes', 'kubernetes-pods'],
  }),
  compact({
    slug: 'kubernetes-jobs',
    title: 'Jobs',
    description: 'Understand Kubernetes Jobs for finite batch tasks, completions, retries, backoff, cleanup, and production batch operations.',
    quick: 'A Job runs Pods until a finite task completes successfully.',
    what: `A Job is a workload controller for run-to-completion tasks.

It creates Pods and tracks successful completions, retries, and failure behavior.`,
    need: `Not every workload is a long-running service. Batch imports, migrations, reports, and one-off processing need completion semantics.`,
    usage: `A data team runs a nightly reconciliation Job that processes files from object storage, writes results to a database, and exits. Logs and metrics are collected for audit.`,
    works: `The Job controller creates Pods until the required completions succeed. Failed Pods can be retried based on backoffLimit. ttlSecondsAfterFinished can clean up completed Jobs.`,
    exampleTitle: 'Batch Job',
    exampleDescription: 'A finite data-processing task.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: batch/v1
kind: Job
metadata:
  name: reconcile-orders
spec:
  backoffLimit: 3
  ttlSecondsAfterFinished: 86400
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: worker
          image: registry.company.com/reconcile-orders:1.0.0`,
    confusions: [
      { question: 'Is a Job for long-running APIs?', answer: 'No. Use Deployments for continuously running stateless services.' },
      { question: 'Does restartPolicy Always work for Jobs?', answer: 'No. Jobs use Never or OnFailure.' },
      { question: 'Should Jobs be manually deleted?', answer: 'Use TTL cleanup where appropriate to avoid clutter.' },
    ],
    issues: ['**No retry limit** or wrong backoff behavior causes runaway failures.', '**No idempotency** causes duplicate processing after retries.', '**Completed Jobs accumulate** and clutter the cluster.', '**Missing resource requests** disrupts batch scheduling.'],
    practices: ['Make Job logic idempotent', 'Set backoffLimit and deadlines', 'Use TTL cleanup for completed Jobs', 'Set resources and observe logs', 'Separate migration Jobs from app rollout where risk is high'],
    note: `Jobs need operational semantics. The hardest part is often not starting the task, but making retry and partial completion safe.`,
    takeaways: ['Jobs run finite tasks', 'Retries and idempotency matter', 'TTL cleanup prevents clutter', 'Use Deployments for long-running services'],
    relatedTopics: ['kubernetes-cronjobs', 'kubernetes-pods', 'kubernetes-configmaps'],
  }),
  compact({
    slug: 'kubernetes-cronjobs',
    title: 'CronJobs',
    description: 'Learn Kubernetes CronJobs for scheduled tasks, concurrency policy, missed schedules, retries, and operational safety.',
    quick: 'A CronJob creates Jobs on a schedule, similar to cron but managed by Kubernetes.',
    what: `A CronJob is a scheduled workload controller.

It creates Job objects based on a cron expression and controls concurrency, deadlines, and history retention.`,
    need: `Teams need scheduled tasks for reports, cleanup, synchronization, backups, and periodic processing.`,
    usage: `An enterprise billing system runs a CronJob every hour to reconcile payment statuses. It uses Forbid concurrency to prevent overlapping runs and alerts if the Job misses its deadline.`,
    works: `The CronJob controller checks schedules and creates Jobs. concurrencyPolicy controls overlap. startingDeadlineSeconds controls late starts. successfulJobsHistoryLimit and failedJobsHistoryLimit control retained history.`,
    exampleTitle: 'Scheduled CronJob',
    exampleDescription: 'A safe hourly reconciliation task.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: batch/v1
kind: CronJob
metadata:
  name: payment-reconciliation
spec:
  schedule: "0 * * * *"
  concurrencyPolicy: Forbid
  startingDeadlineSeconds: 300
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: Never
          containers:
            - name: worker
              image: registry.company.com/payment-reconcile:1.0.0`,
    confusions: [
      { question: 'Does CronJob run a Pod directly?', answer: 'It creates Jobs, and Jobs create Pods.' },
      { question: 'What if a run takes longer than the schedule interval?', answer: 'concurrencyPolicy decides whether to allow, skip, or replace overlapping runs.' },
      { question: 'Are cron times always local?', answer: 'Schedules are interpreted by the controller configuration/time zone behavior. Be explicit in platform standards.' },
    ],
    issues: ['**Overlapping runs** corrupt data or overload dependencies.', '**No missed-run alerts** hides failed scheduled work.', '**Too much retained history** clutters the namespace.', '**Non-idempotent tasks** fail badly on retries.'],
    practices: ['Set concurrencyPolicy deliberately', 'Make scheduled tasks idempotent', 'Monitor success, duration, and missed schedules', 'Set history limits', 'Document schedule ownership and time zone expectations'],
    note: `CronJobs often power invisible business processes. Treat a missed schedule like a production incident when the business depends on it.`,
    takeaways: ['CronJobs create Jobs on a schedule', 'Concurrency policy is critical', 'Idempotency and monitoring matter', 'History limits prevent clutter'],
    relatedTopics: ['kubernetes-jobs', 'kubernetes-monitoring-prometheus', 'kubernetes-configmaps'],
  }),
  compact({
    slug: 'kubernetes-statefulsets',
    title: 'StatefulSets',
    description: 'Understand StatefulSets for stable network identity, ordered rollout, per-replica storage, and stateful application patterns.',
    quick: 'A StatefulSet manages Pods that need stable identities and stable storage.',
    what: `A StatefulSet is a workload controller for stateful applications.

It provides stable Pod names, ordered creation/deletion, and volumeClaimTemplates for per-replica persistent storage.`,
    need: `Databases, message brokers, and clustered systems often need stable identity and durable storage that Deployments do not provide.`,
    usage: `A Kafka or ZooKeeper deployment may use StatefulSets so each replica has a predictable name and its own persistent volume. Platform teams still often prefer managed services for critical data systems.`,
    works: `StatefulSet Pods are named predictably, such as broker-0, broker-1, broker-2. Each Pod can get its own PVC. A headless Service usually provides stable DNS for individual replicas.`,
    exampleTitle: 'Stateful identity pattern',
    exampleDescription: 'Stable names and per-replica storage.',
    exampleLanguage: 'text',
    exampleCode: `StatefulSet: broker
Pods:
  broker-0 -> pvc data-broker-0
  broker-1 -> pvc data-broker-1
  broker-2 -> pvc data-broker-2
Headless Service:
  broker-0.broker-headless.namespace.svc.cluster.local`,
    confusions: [
      { question: 'Is StatefulSet required for every app with a volume?', answer: 'No. Use StatefulSet when stable identity and per-replica storage are required.' },
      { question: 'Does StatefulSet make databases highly available?', answer: 'No. Database replication, backup, and failover are application-specific responsibilities.' },
      { question: 'Do PVCs delete automatically when StatefulSet is deleted?', answer: 'PVC retention behavior depends on policy and Kubernetes version/configuration.' },
    ],
    issues: ['**Running databases without operational expertise** creates backup and failover risk.', '**PVC retention surprises** leave orphaned data or cause data loss.', '**Ordered rollout delays** slow recovery if readiness is wrong.', '**No anti-affinity** places replicas on the same node.'],
    practices: ['Use managed data services when appropriate', 'Set anti-affinity or topology spread for replicas', 'Back up and test restore', 'Understand PVC retention policy', 'Use headless Services for stable replica DNS'],
    note: `StatefulSets give Kubernetes-friendly identity, not a complete database platform. The application’s replication and recovery model still decides reliability.`,
    takeaways: ['StatefulSets provide stable Pod identity', 'They support per-replica PVCs', 'Use them for stateful clustered workloads', 'Backups and failover remain essential'],
    relatedTopics: ['kubernetes-persistent-volume-claims', 'kubernetes-storage-classes', 'kubernetes-services'],
  }),
  compact({
    slug: 'kubernetes-daemonsets',
    title: 'DaemonSets',
    description: 'Learn DaemonSets for running one Pod per node for agents, log collectors, networking, monitoring, and security tooling.',
    quick: 'A DaemonSet ensures a copy of a Pod runs on each selected node.',
    what: `A DaemonSet is a workload controller for node-level agents.

It is commonly used for logging agents, monitoring agents, CNI components, security scanners, and storage plugins.`,
    need: `Some workloads must run on every node or every node in a selected group to collect logs, expose metrics, enforce policy, or provide infrastructure functions.`,
    usage: `A platform team deploys a log collector DaemonSet across all worker nodes. Each Pod mounts host log directories, ships logs to a central platform, and runs with carefully reviewed permissions.`,
    works: `The DaemonSet controller creates Pods on matching nodes. When new nodes join, DaemonSet Pods are created there. Node selectors, affinity, tolerations, and taints determine placement.`,
    exampleTitle: 'DaemonSet placement',
    exampleDescription: 'Node-wide log agent pattern.',
    exampleLanguage: 'text',
    exampleCode: `Node joins cluster
  -> DaemonSet controller sees matching labels
  -> log-agent Pod starts on that node
  -> Pod reads host logs
  -> logs ship to central observability platform

Common agents:
  CNI, log collector, metrics agent, security agent`,
    confusions: [
      { question: 'Is DaemonSet for scaling APIs?', answer: 'No. Use Deployments for replicated application services.' },
      { question: 'Does DaemonSet run on control-plane nodes?', answer: 'Only if selectors/tolerations allow it and the platform permits it.' },
      { question: 'Can DaemonSets be risky?', answer: 'Yes. They often need node-level permissions, so security review matters.' },
    ],
    issues: ['**Privileged agents** increase node compromise risk.', '**No tolerations** prevents agents from running on tainted nodes where needed.', '**Resource-heavy agents** reduce workload capacity on every node.', '**Bad DaemonSet rollout** affects the whole cluster quickly.'],
    practices: ['Use least privilege for node agents', 'Set resource requests and limits', 'Use tolerations and node selectors intentionally', 'Roll out platform DaemonSets carefully', 'Monitor agent health per node'],
    note: `DaemonSets are platform infrastructure. One bad DaemonSet can impact every node, so treat them as high-blast-radius changes.`,
    takeaways: ['DaemonSets run Pods on selected nodes', 'They are ideal for node agents', 'Permissions and resources must be reviewed', 'Rollout blast radius is cluster-wide'],
    relatedTopics: ['kubernetes-worker-nodes', 'kubernetes-pod-security', 'kubernetes-monitoring-prometheus'],
  }),
  compact({
    slug: 'kubernetes-rbac',
    title: 'RBAC',
    description: 'Understand Kubernetes RBAC for controlling API access through Roles, ClusterRoles, RoleBindings, and ClusterRoleBindings.',
    quick: 'RBAC controls who can perform which Kubernetes API actions on which resources.',
    what: `Role-Based Access Control authorizes Kubernetes API requests.

Roles and ClusterRoles define permissions. RoleBindings and ClusterRoleBindings attach those permissions to users, groups, or ServiceAccounts.`,
    need: `Shared clusters need least-privilege access for developers, operators, automation, and workloads.`,
    usage: `A payments developer group may have read access to production Pods and logs, but deployment changes require a CI service account. Platform admins retain cluster-level permissions with audit logging.`,
    works: `After authentication, the API server checks whether RBAC rules allow the verb, resource, namespace, and resource name. Namespaced Roles apply within a namespace; ClusterRoles can apply cluster-wide or be bound into namespaces.`,
    exampleTitle: 'Namespace read-only Role',
    exampleDescription: 'Grant read-only access to Pods and logs.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: orders-prod
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]`,
    confusions: [
      { question: 'Does RBAC control network traffic?', answer: 'No. RBAC controls Kubernetes API access. NetworkPolicies control Pod traffic.' },
      { question: 'Is ClusterRole always cluster-wide?', answer: 'A ClusterRole defines reusable permissions. It becomes cluster-wide only when bound with ClusterRoleBinding.' },
      { question: 'Can RBAC restrict container runtime actions inside a Pod?', answer: 'No. Use Pod Security, securityContext, and runtime controls for that.' },
    ],
    issues: ['**cluster-admin used broadly** defeats least privilege.', '**ServiceAccounts overprivileged** let compromised Pods control the cluster.', '**No access review** leaves stale permissions.', '**Confusing bindings** make audit difficult.'],
    practices: ['Grant least privilege by namespace and role', 'Avoid broad cluster-admin access', 'Use separate ServiceAccounts per workload', 'Review bindings regularly', 'Audit sensitive API actions'],
    note: `RBAC is the authorization boundary for the Kubernetes API. If it is broad, every other cluster control becomes easier to bypass.`,
    takeaways: ['RBAC authorizes API actions', 'Roles are namespaced; ClusterRoles are reusable or cluster-scoped', 'Bindings attach permissions to subjects', 'Least privilege is essential'],
    relatedTopics: ['kubernetes-service-accounts', 'kubernetes-namespaces', 'kubernetes-secrets'],
  }),
  compact({
    slug: 'kubernetes-service-accounts',
    title: 'Service Accounts',
    description: 'Learn Kubernetes ServiceAccounts for workload identity, API access, token projection, cloud identity integration, and least privilege.',
    quick: 'A ServiceAccount is an identity for Pods and automation inside Kubernetes.',
    what: `A ServiceAccount represents an identity used by Pods or controllers when they talk to the Kubernetes API or integrate with platform identity systems.`,
    need: `Workloads and automation need identity without sharing human credentials.`,
    usage: `A deployment controller uses a ServiceAccount with permission to update Deployments in one namespace. On cloud platforms, workload identity maps ServiceAccounts to cloud IAM roles for accessing object storage or secrets.`,
    works: `Pods reference a ServiceAccount. Kubernetes can project a bounded token into the Pod. RBAC grants API permissions to that ServiceAccount. Cloud integrations can exchange the Kubernetes identity for cloud credentials.`,
    exampleTitle: 'ServiceAccount usage',
    exampleDescription: 'Attaching a workload identity to Pods.',
    exampleLanguage: 'yaml',
    exampleCode: `apiVersion: v1
kind: ServiceAccount
metadata:
  name: orders-api
  namespace: orders-prod
---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      serviceAccountName: orders-api`,
    confusions: [
      { question: 'Is ServiceAccount a human user?', answer: 'No. It is an identity for workloads or automation.' },
      { question: 'Does a ServiceAccount automatically have permissions?', answer: 'It has only what RBAC and platform integrations grant.' },
      { question: 'Should every workload use default ServiceAccount?', answer: 'No. Use explicit ServiceAccounts per workload.' },
    ],
    issues: ['**Default ServiceAccount reuse** hides workload identity and permissions.', '**Long-lived tokens** increase credential risk.', '**Overbroad RBAC** lets compromised Pods affect other workloads.', '**Cloud IAM mapping too broad** exposes external resources.'],
    practices: ['Create dedicated ServiceAccounts per application', 'Disable unnecessary token mounting', 'Use least privilege RBAC', 'Use bounded/projected tokens', 'Map cloud identities narrowly'],
    note: `ServiceAccounts are the bridge between workload and platform trust. Treat them like production identities, not YAML boilerplate.`,
    takeaways: ['ServiceAccounts identify workloads', 'RBAC grants API permissions', 'Dedicated identities improve auditability', 'Cloud workload identity is an enterprise pattern'],
    relatedTopics: ['kubernetes-rbac', 'kubernetes-secrets', 'kubernetes-pod-security'],
  }),
  compact({
    slug: 'kubernetes-pod-security',
    title: 'Pod Security',
    description: 'Understand Pod Security controls, securityContext, privileged containers, root users, capabilities, host access, and admission policy.',
    quick: 'Pod Security controls reduce what containers can do on nodes and inside the cluster.',
    what: `Pod Security is the set of Kubernetes controls and policies that limit risky Pod behavior.

It includes Pod Security Admission, securityContext, non-root execution, capabilities, seccomp, host namespace restrictions, and admission policy tools.`,
    need: `Containers share node kernels. Risky Pod settings can expose host files, privileged operations, credentials, or neighboring workloads.`,
    usage: `A platform labels namespaces with restricted Pod Security standards. Application Pods must run as non-root, drop Linux capabilities, avoid hostPath, and use read-only root filesystems where practical.`,
    works: `Admission controllers validate Pod specs before creation. securityContext settings define runtime user, privileges, capabilities, seccomp profile, and filesystem behavior.`,
    exampleTitle: 'Restricted security context',
    exampleDescription: 'A safer container runtime baseline.',
    exampleLanguage: 'yaml',
    exampleCode: `securityContext:
  runAsNonRoot: true
  runAsUser: 10001
  seccompProfile:
    type: RuntimeDefault
containers:
  - name: api
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop: ["ALL"]`,
    confusions: [
      { question: 'Is Pod Security the same as NetworkPolicy?', answer: 'No. Pod Security controls runtime privileges. NetworkPolicy controls network traffic.' },
      { question: 'Can all apps run with read-only root filesystem?', answer: 'Not all without changes. Apps may need writable tmp volumes or code changes.' },
      { question: 'Are privileged Pods always bad?', answer: 'Some platform agents need elevated permissions, but they require strict ownership and review.' },
    ],
    issues: ['**Privileged containers** can access host-level capabilities.', '**Running as root** increases impact of container compromise.', '**hostPath mounts** expose sensitive node files.', '**No admission policy** lets risky specs reach production.'],
    practices: ['Use restricted Pod Security standards for app namespaces', 'Run as non-root and drop capabilities', 'Avoid privileged and hostPath usage for application Pods', 'Use seccomp RuntimeDefault', 'Review exceptions centrally'],
    note: `Pod Security is a blast-radius control. The goal is not perfect isolation; it is making compromise harder and less damaging.`,
    takeaways: ['Pod Security limits risky container behavior', 'securityContext is central', 'Admission policy enforces standards', 'Exceptions need strong ownership'],
    relatedTopics: ['kubernetes-service-accounts', 'kubernetes-rbac', 'kubernetes-network-policies'],
  }),
  compact({
    slug: 'kubernetes-metrics-server',
    title: 'Metrics Server',
    description: 'Learn Metrics Server for Kubernetes resource metrics, kubectl top, HPA support, and its limits compared with full observability systems.',
    quick: 'Metrics Server collects CPU and memory metrics for Pods and nodes and feeds features such as kubectl top and HPA.',
    what: `Metrics Server is a lightweight cluster add-on that exposes resource metrics through the Kubernetes metrics API.`,
    need: `Kubernetes needs current CPU and memory metrics for autoscaling and basic operational inspection.`,
    usage: `A platform team installs Metrics Server so developers can run kubectl top pods and HPA can scale Deployments based on CPU utilization.`,
    works: `Metrics Server scrapes kubelet summary metrics from nodes and exposes aggregated metrics through the metrics.k8s.io API. It is not a long-term metrics store.`,
    exampleTitle: 'Metrics Server usage',
    exampleDescription: 'Commands and autoscaling dependency.',
    exampleLanguage: 'text',
    exampleCode: `kubectl top nodes
kubectl top pods -n orders-prod

HPA dependency:
  CPU/memory resource metrics
  -> metrics.k8s.io
  -> Horizontal Pod Autoscaler
  -> Deployment replica changes`,
    confusions: [
      { question: 'Is Metrics Server Prometheus?', answer: 'No. Metrics Server is for current resource metrics. Prometheus stores and queries broader time-series metrics.' },
      { question: 'Does Metrics Server store historical data?', answer: 'No. Use Prometheus or another monitoring platform for history.' },
      { question: 'Can HPA use Metrics Server?', answer: 'Yes, for CPU and memory resource metrics.' },
    ],
    issues: ['**Metrics Server missing** breaks kubectl top and resource-based HPA.', '**TLS/kubelet access issues** prevent metrics collection.', '**Expecting history** from Metrics Server leads to poor incident analysis.', '**No resource requests** weakens HPA usefulness.'],
    practices: ['Install and monitor Metrics Server in production clusters', 'Use Prometheus for historical and custom metrics', 'Set resource requests for HPA calculations', 'Validate metrics during cluster upgrades'],
    note: `Metrics Server is plumbing for autoscaling, not your observability platform. Keep that distinction clear during architecture discussions.`,
    takeaways: ['Metrics Server provides current CPU/memory metrics', 'It supports kubectl top and HPA', 'It is not a historical metrics store', 'Prometheus complements it'],
    relatedTopics: ['kubernetes-horizontal-pod-autoscaler', 'kubernetes-monitoring-prometheus', 'kubernetes-worker-nodes'],
  }),
  compact({
    slug: 'kubernetes-monitoring-prometheus',
    title: 'Prometheus',
    description: 'Understand Prometheus for Kubernetes metrics collection, service discovery, alerting rules, recording rules, and production observability.',
    quick: 'Prometheus collects and stores time-series metrics from Kubernetes and applications.',
    what: `Prometheus is a monitoring system widely used in Kubernetes.

It scrapes metrics endpoints, stores time-series data, evaluates alerting rules, and supports PromQL queries.`,
    need: `Production Kubernetes needs visibility into Pods, nodes, deployments, ingress, databases, queues, and business metrics.`,
    usage: `A platform team deploys Prometheus Operator. Application teams expose /metrics endpoints. Alerts fire for high error rate, Pod crash loops, HPA maxed out, node pressure, and API latency.`,
    works: `Prometheus discovers targets through Kubernetes metadata or ServiceMonitor/PodMonitor resources. It scrapes metrics at intervals, stores samples, evaluates rules, and sends alerts to Alertmanager.`,
    exampleTitle: 'Prometheus alert idea',
    exampleDescription: 'A production alert for API error rate.',
    exampleLanguage: 'text',
    exampleCode: `Alert: HighApiErrorRate
Expression:
  rate(http_requests_total{status=~"5.."}[5m])
  /
  rate(http_requests_total[5m]) > 0.05

Response:
  notify on-call
  include dashboard and runbook
  inspect rollout and dependency health`,
    confusions: [
      { question: 'Is Prometheus for logs?', answer: 'No. Prometheus is for metrics. Logs need a logging system such as Loki, Elasticsearch, or cloud logging.' },
      { question: 'Does Prometheus automatically know business metrics?', answer: 'No. Applications must expose meaningful custom metrics.' },
      { question: 'Is every alert useful?', answer: 'No. Alerts should be actionable and tied to user impact or urgent risk.' },
    ],
    issues: ['**Too many noisy alerts** causes alert fatigue.', '**No application metrics** hides business failures.', '**High cardinality labels** overload Prometheus.', '**No retention or remote storage plan** loses investigation data.'],
    practices: ['Expose RED/USE metrics for services and infrastructure', 'Keep labels controlled to avoid high cardinality', 'Attach runbooks to alerts', 'Use recording rules for expensive queries', 'Review alerts after incidents'],
    note: `Prometheus is valuable when metrics describe user impact and system saturation. Random dashboards are not observability.`,
    takeaways: ['Prometheus stores time-series metrics', 'PromQL powers queries and alerts', 'Application metrics are essential', 'Alert quality matters more than alert quantity'],
    relatedTopics: ['kubernetes-grafana', 'kubernetes-metrics-server', 'kubernetes-best-practices'],
  }),
  compact({
    slug: 'kubernetes-grafana',
    title: 'Grafana',
    description: 'Learn Grafana for Kubernetes dashboards, Prometheus visualization, operational views, SLO panels, and incident diagnosis.',
    quick: 'Grafana visualizes metrics and logs from systems such as Prometheus so teams can understand service and cluster health.',
    what: `Grafana is an observability visualization platform.

In Kubernetes, it commonly displays Prometheus metrics, logs, traces, SLOs, node health, workload health, and business KPIs.`,
    need: `On-call teams need fast visual context during incidents and capacity reviews.`,
    usage: `A production dashboard shows API latency, error rate, request rate, replica count, HPA status, Pod restarts, node pressure, ingress traffic, and dependency health for each service.`,
    works: `Grafana connects to data sources such as Prometheus, Loki, Tempo, or cloud monitoring. Dashboards contain panels and variables. Alerting can be configured, though many teams centralize alerts through Prometheus/Alertmanager.`,
    exampleTitle: 'Dashboard structure',
    exampleDescription: 'Panels a service team expects during incidents.',
    exampleLanguage: 'text',
    exampleCode: `Service overview:
  - request rate
  - 5xx error rate
  - p95 latency
  - deployment version
  - replica count and HPA status
  - Pod restarts and crash loops
  - CPU/memory usage vs requests
  - dependency latency
  - recent alerts and runbook link`,
    confusions: [
      { question: 'Does Grafana collect metrics itself?', answer: 'Grafana primarily visualizes data from data sources. Prometheus commonly collects Kubernetes metrics.' },
      { question: 'Is a dashboard a runbook?', answer: 'No. Dashboards show signals. Runbooks explain actions.' },
      { question: 'Should every team build dashboards from scratch?', answer: 'No. Platform teams should provide standards and reusable templates.' },
    ],
    issues: ['**Pretty but unactionable dashboards** slow incident response.', '**No ownership** leaves stale dashboards after service changes.', '**Too many panels** hides the key signal.', '**No version/deployment context** makes regressions harder to connect.'],
    practices: ['Build dashboards around user journeys and SLOs', 'Include deployment and version context', 'Use reusable dashboard templates', 'Link alerts to dashboards and runbooks', 'Review dashboards after incidents'],
    note: `Grafana should reduce time to understand. If a dashboard requires expert interpretation during every incident, it needs redesign.`,
    takeaways: ['Grafana visualizes observability data', 'Prometheus is a common data source', 'Dashboards should be actionable', 'Runbook links and ownership matter'],
    relatedTopics: ['kubernetes-monitoring-prometheus', 'kubernetes-metrics-server', 'kubernetes-high-availability'],
  }),
  compact({
    slug: 'kubernetes-rolling-updates',
    title: 'Rolling Updates',
    description: 'Understand rolling updates for Kubernetes Deployments, maxSurge, maxUnavailable, readiness, availability, and safe release strategy.',
    quick: 'A rolling update gradually replaces old Pods with new Pods while keeping the service available.',
    what: `A rolling update is the default Deployment strategy for changing Pod templates without replacing all replicas at once.`,
    need: `Production services need controlled releases that avoid downtime and allow health validation while versions change.`,
    usage: `A retail API rolls from version 1.24.0 to 1.25.0 with maxUnavailable 1 and maxSurge 1. Readiness probes hold traffic until each new Pod is ready. Monitoring watches error rate during rollout.`,
    works: `The Deployment creates a new ReplicaSet and scales it up while scaling the old ReplicaSet down according to strategy. Readiness controls when new Pods enter Service endpoints.`,
    exampleTitle: 'Rolling update controls',
    exampleDescription: 'Deployment rollout settings.',
    exampleLanguage: 'yaml',
    exampleCode: `strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1
minReadySeconds: 10
progressDeadlineSeconds: 600`,
    confusions: [
      { question: 'Does rolling update guarantee zero downtime?', answer: 'Only if capacity, readiness, compatibility, and dependencies are designed correctly.' },
      { question: 'Can old and new versions run together?', answer: 'Yes. Applications must be compatible during the rollout window.' },
      { question: 'Does rolling update handle database migration?', answer: 'No. Database changes need compatible migration strategy.' },
    ],
    issues: ['**Readiness lies** causes broken Pods to receive traffic.', '**Mixed-version incompatibility** breaks users during rollout.', '**Too aggressive maxUnavailable** reduces capacity too much.', '**No monitoring gate** lets bad releases finish.'],
    practices: ['Use truthful readiness probes', 'Design backward-compatible API and schema changes', 'Tune maxSurge and maxUnavailable', 'Monitor rollouts and stop on bad signals', 'Use canary or blue-green for high-risk changes'],
    note: `Rolling updates are safe only when the application is designed for mixed versions. Kubernetes controls mechanics; architecture controls compatibility.`,
    takeaways: ['Rolling updates replace Pods gradually', 'Readiness is central', 'Mixed-version compatibility matters', 'Database migrations need separate care'],
    relatedTopics: ['kubernetes-deployments', 'kubernetes-rollbacks', 'kubernetes-high-availability'],
  }),
  compact({
    slug: 'kubernetes-rollbacks',
    title: 'Rollbacks',
    description: 'Learn Kubernetes rollbacks for Deployment revisions, rollout history, failure recovery, limits, and release safety.',
    quick: 'A rollback returns a workload to a previous Deployment revision, usually by restoring the earlier Pod template.',
    what: `Rollback is the process of reverting a Deployment to a previous revision.

Kubernetes stores rollout history through ReplicaSets up to the configured revision history limit.`,
    need: `Bad releases happen. Teams need fast recovery when new versions cause errors, latency, crashes, or broken integrations.`,
    usage: `After a new checkout API version increases payment failures, the on-call engineer pauses rollout, confirms the error correlates with the deployment, and rolls back the Deployment while keeping the database migration compatibility plan in mind.`,
    works: `kubectl rollout undo updates the Deployment template back to a previous revision. Kubernetes then performs a rollout using normal Deployment mechanics.`,
    exampleTitle: 'Rollback commands',
    exampleDescription: 'Common rollout inspection and rollback commands.',
    exampleLanguage: 'bash',
    exampleCode: `kubectl rollout status deployment/orders-api -n orders-prod
kubectl rollout history deployment/orders-api -n orders-prod
kubectl rollout undo deployment/orders-api -n orders-prod
kubectl rollout undo deployment/orders-api --to-revision=3 -n orders-prod`,
    confusions: [
      { question: 'Does rollback undo ConfigMap or Secret changes?', answer: 'Not necessarily. Deployment rollback restores the Pod template revision, not all external resources.' },
      { question: 'Does rollback undo database migrations?', answer: 'No. Database rollback requires a separate migration and data strategy.' },
      { question: 'Can I rollback if old images were deleted?', answer: 'The rollout may fail if the referenced old image is unavailable.' },
    ],
    issues: ['**Old images removed** make rollback impossible.', '**Database migration not backward-compatible** blocks safe rollback.', '**Revision history too low** loses useful rollback points.', '**No release metadata** slows identifying the bad version.'],
    practices: ['Keep immutable images available for rollback windows', 'Use backward-compatible migrations', 'Set reasonable revisionHistoryLimit', 'Annotate deployments with release metadata', 'Test rollback in staging'],
    note: `Rollback is not a button; it is an architecture capability. Images, schemas, configuration, and dependencies all decide whether rollback is safe.`,
    takeaways: ['Rollbacks restore previous Deployment revisions', 'They do not undo all external changes', 'Image retention and schema compatibility matter', 'Rollback should be tested'],
    relatedTopics: ['kubernetes-rolling-updates', 'kubernetes-deployments', 'kubernetes-disaster-recovery'],
  }),
  compact({
    slug: 'kubernetes-high-availability',
    title: 'High Availability',
    description: 'Understand Kubernetes high availability across replicas, zones, control plane, nodes, services, disruption budgets, and dependency design.',
    quick: 'Kubernetes HA means workloads and platform components continue operating through Pod, node, zone, or component failures.',
    what: `High availability in Kubernetes combines redundant control-plane components, multiple worker nodes, replica spread, health probes, disruption controls, and resilient dependencies.`,
    need: `Production clusters must survive routine failures: Pod crashes, node drains, zone issues, deployments, and cluster maintenance.`,
    usage: `A production API runs six replicas across three zones with topology spread constraints, PodDisruptionBudget, readiness probes, multi-zone nodes, and a highly available ingress path. Databases use managed multi-zone services.`,
    works: `Controllers replace failed Pods. Services route to ready endpoints. Schedulers spread Pods based on constraints. PDBs limit voluntary disruption. Managed control planes provide API HA in many cloud setups.`,
    exampleTitle: 'HA workload checklist',
    exampleDescription: 'A practical HA checklist for a critical service.',
    exampleLanguage: 'text',
    exampleCode: `Workload:
  replicas >= 3
  readiness probes
  PodDisruptionBudget
  topology spread across zones
  anti-affinity for critical replicas
  resource requests sized

Platform:
  multi-zone node pools
  HA ingress
  monitored DNS/CNI
  tested node drain
  resilient dependencies`,
    confusions: [
      { question: 'Does Kubernetes make one replica highly available?', answer: 'No. One replica is still a single point of failure.' },
      { question: 'Is HA the same as disaster recovery?', answer: 'No. HA handles component failure. DR handles major recovery scenarios such as regional loss or data corruption.' },
      { question: 'Do PDBs prevent all downtime?', answer: 'No. They limit voluntary disruption but cannot stop all failures.' },
    ],
    issues: ['**Single replica services** fail during Pod or node disruption.', '**Replicas on same node or zone** fail together.', '**No PDB** allows maintenance to evict too many Pods.', '**Dependency not HA** makes app replicas irrelevant.'],
    practices: ['Run multiple replicas for critical workloads', 'Use topology spread and anti-affinity', 'Define PodDisruptionBudgets', 'Keep dependencies highly available', 'Test node drains and zone-failure assumptions'],
    note: `Kubernetes HA is a system property. The app, nodes, networking, ingress, DNS, and dependencies all have to participate.`,
    takeaways: ['HA requires redundancy and failure-domain spread', 'PDBs protect against voluntary disruption', 'Readiness controls traffic safety', 'Dependencies decide real availability'],
    relatedTopics: ['kubernetes-worker-nodes', 'kubernetes-deployments', 'kubernetes-disaster-recovery'],
  }),
  compact({
    slug: 'kubernetes-disaster-recovery',
    title: 'Disaster Recovery',
    description: 'Learn Kubernetes disaster recovery for cluster rebuilds, etcd backups, GitOps, persistent data, multi-cluster strategy, RTO, and RPO.',
    quick: 'Kubernetes DR is the ability to recover workloads, cluster configuration, and persistent data after major failure.',
    what: `Disaster recovery covers recovering Kubernetes clusters and applications after severe incidents.

It includes cluster state, manifests, secrets, persistent data, DNS, ingress, dependencies, and restore runbooks.`,
    need: `Clusters can be lost through regional outages, misconfiguration, security incidents, etcd failure, or destructive automation.`,
    usage: `A regulated platform stores all manifests in Git, recreates clusters with IaC, syncs apps through GitOps, backs up namespace resources with Velero, and protects databases through managed backups and cross-region replication.`,
    works: `DR usually restores infrastructure first, then cluster add-ons, then namespaces and workloads, then persistent data and external dependencies. RTO and RPO define how much downtime and data loss are acceptable.`,
    exampleTitle: 'Kubernetes DR runbook',
    exampleDescription: 'High-level restore sequence.',
    exampleLanguage: 'text',
    exampleCode: `1. Provision replacement cluster with IaC
2. Install CNI, DNS, ingress, storage, cert-manager, monitoring
3. Restore or sync namespaces and RBAC
4. Restore Secrets through external secret manager
5. Restore PVC data or reconnect managed services
6. Sync workloads from GitOps
7. Validate ingress, DNS, health checks, and business flows`,
    confusions: [
      { question: 'Is backing up YAML enough?', answer: 'No. Persistent data, secrets, cluster add-ons, DNS, and external dependencies also matter.' },
      { question: 'Does etcd backup restore application databases?', answer: 'No. Application data needs its own backup and recovery strategy.' },
      { question: 'Is multi-cluster always required?', answer: 'No. It depends on RTO, RPO, cost, and business criticality.' },
    ],
    issues: ['**No restore test** means backups are unproven.', '**Secrets not recoverable** blocks app startup after cluster rebuild.', '**PV data tied to one zone or cluster** slows recovery.', '**Manual cluster add-ons** make rebuild inconsistent.'],
    practices: ['Define RTO and RPO per workload', 'Store manifests and cluster config in Git/IaC', 'Back up persistent data separately', 'Use external secret managers', 'Run DR exercises and document restore order'],
    note: `Kubernetes DR is not just cluster backup. It is restoring a working business service, including identity, data, network entry, and dependencies.`,
    takeaways: ['DR needs cluster and application recovery', 'RTO and RPO guide design', 'GitOps and IaC improve rebuild speed', 'Persistent data requires separate strategy'],
    relatedTopics: ['kubernetes-high-availability', 'kubernetes-persistent-volumes', 'kubernetes-rollbacks'],
  }),
  compact({
    slug: 'kubernetes-best-practices',
    title: 'Kubernetes Best Practices',
    description: 'Review production Kubernetes best practices across manifests, resources, probes, security, networking, observability, delivery, and operations.',
    quick: 'Kubernetes best practices turn working YAML into reliable production operation.',
    what: `Kubernetes best practices are the operational and architectural standards that make workloads secure, observable, scalable, and recoverable.

They cover workload design, deployment safety, resource management, access control, policy, networking, monitoring, and platform ownership.`,
    need: `Many Kubernetes outages come from incomplete basics: no probes, no requests, broad RBAC, no rollback plan, no dashboards, no PDBs, and manual changes.`,
    usage: `An enterprise platform creates golden Helm charts or templates with default probes, resource requests, securityContext, labels, NetworkPolicies, PDBs, ServiceMonitors, and rollout settings. Teams inherit standards instead of reinventing them.`,
    works: `Best practices become effective when encoded in templates, admission policies, CI checks, GitOps workflows, dashboards, and runbooks. They should be reviewed after incidents and cluster upgrades.`,
    exampleTitle: 'Production readiness checklist',
    exampleDescription: 'A concise checklist before releasing a workload.',
    exampleLanguage: 'text',
    exampleCode: `Before production:
  - Deployment uses immutable image tag
  - CPU/memory requests set
  - readiness/liveness probes configured
  - Service and Ingress tested
  - ConfigMaps and Secrets separated
  - RBAC least privilege
  - securityContext restricted
  - PDB and topology spread for critical apps
  - metrics, logs, alerts, dashboards ready
  - rollback and DR plan documented`,
    confusions: [
      { question: 'Are best practices one-size-fits-all?', answer: 'No. They should be adapted by workload criticality, risk, compliance, and platform maturity.' },
      { question: 'Is Helm enough for best practices?', answer: 'Helm helps templating, but policy, CI, observability, and operations are also needed.' },
      { question: 'Do developers need to know platform details?', answer: 'They need enough to understand resource, security, rollout, and debugging implications.' },
    ],
    issues: ['**Template drift** creates inconsistent production behavior.', '**No admission enforcement** lets risky manifests deploy.', '**Operational docs missing** slows incidents.', '**Ignoring cost** leads to over-requested resources and idle capacity.'],
    practices: ['Use reusable deployment templates or platform paved roads', 'Enforce critical standards with policy', 'Keep manifests in source control', 'Review resources and cost regularly', 'Practice incident response and rollback', 'Continuously improve after postmortems'],
    note: `Best practices are not a poster. They become real when the platform makes the safe path easier than the unsafe path.`,
    takeaways: ['Production Kubernetes needs guardrails', 'Requests, probes, security, observability, and rollout safety are basics', 'Policies and templates improve consistency', 'Best practices evolve through incidents and reviews'],
    relatedTopics: ['kubernetes-overview', 'kubernetes-pod-security', 'kubernetes-monitoring-prometheus', 'kubernetes-rolling-updates'],
  }),
];

export const kubernetesTopics: TopicContent[] = [
  kubernetesOverview,
  kubernetesClusterArchitecture,
  kubernetesControlPlane,
  kubernetesWorkerNodes,
  kubernetesPods,
  kubernetesReplicaSets,
  kubernetesDeployments,
  kubernetesNamespaces,
  ...moreTopics,
  ...compactTopics,
];
