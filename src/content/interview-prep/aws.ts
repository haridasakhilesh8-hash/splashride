import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { awsInterviewPrepTopicGroups } from './topicNavigation';

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
  'AWS Fundamentals': ['AWS account and organization strategy', 'service selection by workload characteristics', 'managed service responsibility boundaries', 'tagging and governance', 'landing zone foundations'],
  'Global Infrastructure': ['global regional and edge service placement', 'latency and data residency', 'control plane versus data plane behavior', 'service availability by region', 'global service failure planning'],
  Regions: ['region selection criteria', 'data sovereignty and compliance', 'regional service limits', 'cross-region replication', 'regional outage response'],
  'Availability Zones': ['multi-AZ fault isolation', 'subnet design across AZs', 'zonal failure behavior', 'zonal cost and latency trade-offs', 'AZ-aware deployment strategy'],
  'Edge Locations': ['edge caching and acceleration', 'CloudFront origin protection', 'TLS and WAF at the edge', 'edge invalidation strategy', 'edge observability'],
  'Shared Responsibility Model': ['customer versus AWS security duties', 'managed service patching boundaries', 'encryption and access ownership', 'compliance evidence', 'misconfiguration accountability'],

  EC2: ['instance family selection', 'AMI and launch template governance', 'EBS-backed instance recovery', 'placement groups and network performance', 'instance metadata security', 'patching and fleet operations'],
  'Auto Scaling': ['target tracking and step scaling', 'scaling cooldowns and warm-up', 'mixed instances and spot strategy', 'lifecycle hooks', 'scaling failure diagnosis'],
  'Load Balancers': ['ALB versus NLB selection', 'target group health checks', 'TLS termination', 'sticky sessions and state', 'cross-zone load balancing', 'load balancer access logs'],
  'Elastic Beanstalk': ['platform-managed deployment lifecycle', 'environment configuration', 'blue-green deployment', 'customization limits', 'Beanstalk versus ECS or EKS'],
  'Lambda Compute': ['Lambda execution environment', 'cold starts and provisioned concurrency', 'memory CPU tuning', 'VPC Lambda networking', 'Lambda concurrency limits', 'runtime and dependency packaging'],

  S3: ['bucket policy and public access block', 'object versioning and lifecycle', 'S3 consistency behavior', 'encryption and KMS usage', 'presigned URL security', 'large object upload strategy'],
  EBS: ['volume type selection', 'IOPS and throughput sizing', 'snapshot and restore behavior', 'multi-attach constraints', 'EBS encryption and backup'],
  EFS: ['EFS performance modes', 'throughput modes', 'mount targets across AZs', 'POSIX permissions and access points', 'EFS cost management'],
  'Storage Classes': ['S3 Standard versus Intelligent-Tiering', 'Glacier retrieval trade-offs', 'lifecycle policy design', 'access-pattern analysis', 'storage cost optimization'],

  RDS: ['Multi-AZ deployment', 'read replicas', 'backup and point-in-time recovery', 'parameter groups', 'connection management', 'minor version upgrades'],
  Aurora: ['Aurora storage and replica architecture', 'Aurora failover behavior', 'Aurora Serverless trade-offs', 'Global Database', 'cluster parameter governance'],
  DynamoDB: ['partition key design', 'read and write capacity modes', 'global secondary indexes', 'hot partition diagnosis', 'DynamoDB transactions', 'global tables'],
  ElastiCache: ['Redis cluster mode', 'cache eviction policy', 'TTL and invalidation', 'Multi-AZ failover', 'cache stampede prevention', 'memory fragmentation'],

  VPC: ['CIDR and subnet design', 'public and private subnet routing', 'NAT gateway trade-offs', 'VPC endpoints', 'flow logs', 'hybrid connectivity'],
  'Route 53': ['hosted zone design', 'routing policies', 'health checks and failover', 'private hosted zones', 'DNS TTL strategy'],
  'Security Groups': ['stateful firewall behavior', 'least privilege inbound rules', 'egress control', 'security group referencing', 'rule sprawl governance'],
  NACLs: ['stateless rule evaluation', 'ephemeral port handling', 'subnet-level guardrails', 'NACL versus security group usage', 'network troubleshooting'],
  'Transit Gateway': ['hub-and-spoke connectivity', 'route table segmentation', 'cross-account attachments', 'inspection VPC design', 'transit gateway cost and scale'],

  IAM: ['least privilege policy design', 'role assumption and trust policy', 'permission boundaries', 'identity versus resource policies', 'access analyzer and unused permissions', 'break-glass access'],
  KMS: ['customer managed key ownership', 'key policy versus IAM policy', 'grants and service integration', 'rotation and deletion', 'cross-account encryption'],
  'Secrets Manager': ['secret rotation strategy', 'application retrieval pattern', 'KMS integration', 'secret access auditing', 'secret replication'],
  Cognito: ['user pool versus identity pool', 'federation with IdPs', 'token validation', 'MFA and account recovery', 'Cognito limits and customization'],
  'Security Best Practices': ['defense in depth', 'multi-account security model', 'guardrails with SCPs', 'network segmentation', 'logging and detection', 'incident readiness'],

  'Lambda Serverless': ['event source mapping behavior', 'idempotent Lambda design', 'reserved concurrency', 'DLQ and destinations', 'partial batch failure', 'serverless cost control'],
  'API Gateway': ['REST versus HTTP API', 'authorizers and authentication', 'throttling and usage plans', 'request validation', 'stage deployment', 'access logs and tracing'],
  EventBridge: ['event bus design', 'schema and event contract', 'rule filtering', 'cross-account events', 'archive and replay', 'event delivery failure'],
  'Step Functions': ['standard versus express workflows', 'state transition cost', 'error handling and retries', 'human approval and callbacks', 'workflow observability'],
  SQS: ['standard versus FIFO queues', 'visibility timeout', 'dead-letter queues', 'message deduplication', 'long polling', 'queue backlog diagnosis'],
  SNS: ['topic subscription fanout', 'filter policies', 'delivery retries', 'mobile and email notification limits', 'SNS to SQS pattern'],

  ECS: ['cluster capacity providers', 'task definition design', 'service deployment strategy', 'task networking', 'ECS service discovery', 'container health checks'],
  EKS: ['managed control plane responsibility', 'node groups and Fargate profiles', 'IRSA and pod identity', 'cluster upgrade strategy', 'Kubernetes networking on AWS'],
  Fargate: ['serverless container scheduling', 'task CPU and memory sizing', 'Fargate networking', 'startup latency', 'Fargate cost trade-offs'],
  'Docker on AWS': ['image build and scanning', 'ECR lifecycle policy', 'container secrets and configuration', 'multi-stage Dockerfiles', 'runtime user and filesystem hardening'],

  CloudFormation: ['stack lifecycle and drift', 'change sets', 'nested stacks', 'rollback behavior', 'export and import coupling', 'IaC review process'],
  CDK: ['construct design', 'synthesized CloudFormation', 'environment-specific stacks', 'asset publishing', 'CDK version governance'],
  CodePipeline: ['pipeline stages and approvals', 'artifact promotion', 'cross-account deployment', 'rollback strategy', 'pipeline observability'],
  CodeBuild: ['build environment design', 'caching dependencies', 'secrets in builds', 'test and scan gates', 'build performance'],
  CodeDeploy: ['blue-green and canary deployment', 'deployment hooks', 'traffic shifting', 'rollback triggers', 'deployment failure diagnosis'],

  CloudWatch: ['metrics alarms and dashboards', 'log groups and retention', 'composite alarms', 'synthetic canaries', 'metric math and anomaly detection'],
  CloudTrail: ['management and data events', 'organization trails', 'log file integrity', 'CloudTrail Lake analysis', 'security audit investigation'],
  'X-Ray': ['trace segments and subsegments', 'service map interpretation', 'sampling rules', 'Lambda and API Gateway tracing', 'trace-driven bottleneck diagnosis'],
  Config: ['configuration history', 'managed and custom rules', 'conformance packs', 'remediation automation', 'drift and compliance evidence'],

  'High Availability': ['multi-AZ architecture', 'health checks and failover', 'stateless service design', 'data replication', 'dependency failure isolation'],
  'Disaster Recovery': ['RTO and RPO selection', 'backup and restore', 'pilot light', 'warm standby', 'active-active recovery', 'DR testing'],
  'Multi-Region Design': ['active-passive and active-active design', 'data replication consistency', 'global routing', 'regional evacuation', 'multi-region cost'],
  Scalability: ['horizontal scaling patterns', 'queue-based load leveling', 'partitioning strategy', 'service quotas', 'scaling bottleneck diagnosis'],
  'Cost Optimization': ['rightsizing and purchasing options', 'storage lifecycle savings', 'data transfer cost', 'serverless cost modeling', 'FinOps tagging and accountability'],

  'Incident Response': ['AWS incident triage', 'blast radius containment', 'evidence preservation', 'rollback and mitigation', 'post-incident prevention'],
  'Performance Troubleshooting': ['latency decomposition', 'CloudWatch and X-Ray investigation', 'network and DNS latency', 'database and cache bottlenecks', 'capacity and quota diagnosis'],
  'Security Incidents': ['credential compromise response', 'public S3 exposure', 'unauthorized IAM activity', 'KMS key misuse', 'forensic logging and containment'],
  'AWS Cost Issues': ['cost anomaly investigation', 'unused resource cleanup', 'data transfer spikes', 'NAT gateway cost surprises', 'reserved capacity mistakes'],
  'Operational Excellence': ['runbooks and game days', 'SLOs and alarms', 'change management', 'operational readiness reviews', 'automation and self-healing'],
};

const groupProfiles: Record<string, TopicProfile> = {
  'Cloud Fundamentals': {
    mechanism: 'AWS cloud foundations define account boundaries, region and AZ placement, shared responsibility, service ownership, governance, and the global infrastructure model.',
    implementation: 'Start from workload requirements, data residency, failure domains, security ownership, and account strategy before selecting services.',
    failure: 'a foundational cloud assumption creates compliance gaps, regional fragility, or unclear operational ownership',
    decision: 'which account, region, responsibility, and governance model safely supports the workload',
    incident: 'a workload is deployed into one region without clear recovery or data-residency evidence and fails a client audit',
    evidence: ['account and region inventory', 'Well-Architected review notes', 'control and compliance evidence'],
  },
  Compute: {
    mechanism: 'AWS compute services run workload code across instances, managed platforms, containers, or functions with different scaling, networking, patching, and operational models.',
    implementation: 'Choose compute from workload shape, startup behavior, networking, deployment ownership, scaling speed, and operations maturity.',
    failure: 'compute capacity, health checks, scaling policy, or runtime packaging fails under real traffic',
    decision: 'which compute model balances control, elasticity, reliability, cost, and operational burden',
    incident: 'traffic doubles during a campaign and the compute layer scales too slowly, causing target health failures',
    evidence: ['compute health and scaling metrics', 'deployment and runtime logs', 'load balancer and capacity telemetry'],
  },
  Storage: {
    mechanism: 'AWS storage services expose object, block, and file semantics with different consistency, durability, performance, access, and cost profiles.',
    implementation: 'Select storage from access pattern, durability, latency, sharing, encryption, lifecycle, and recovery requirements.',
    failure: 'storage access, lifecycle, encryption, or throughput assumptions create data exposure, latency, or unexpected cost',
    decision: 'which storage service and class matches access semantics, recovery, governance, and cost',
    incident: 'monthly storage cost doubles after logs remain in a hot class and lifecycle rules never transition them',
    evidence: ['storage access and lifecycle metrics', 'bucket volume and cost reports', 'policy and encryption configuration'],
  },
  Databases: {
    mechanism: 'AWS database services trade relational consistency, NoSQL partitioning, caching, replication, and managed operations differently.',
    implementation: 'Design keys, indexes, capacity, backup, failover, and connection behavior from query patterns and recovery goals.',
    failure: 'a schema, partition key, replica, connection, or failover assumption causes latency, throttling, or data inconsistency',
    decision: 'which database model meets consistency, scale, access pattern, recovery, and cost requirements',
    incident: 'checkout latency spikes because a hot partition or exhausted connection pool becomes the dominant bottleneck',
    evidence: ['database metrics and slow queries', 'capacity and throttling data', 'application trace and failover history'],
  },
  Networking: {
    mechanism: 'AWS networking connects workloads through VPC routing, DNS, security controls, gateways, endpoints, and hybrid attachments.',
    implementation: 'Design CIDR, subnets, route tables, DNS, security boundaries, and inspection points before workload deployment.',
    failure: 'a route, DNS, endpoint, or firewall assumption blocks traffic or creates unintended exposure',
    decision: 'which network boundary and routing design gives secure reachability with controlled blast radius and cost',
    incident: 'a private service loses database connectivity after a route table change during deployment',
    evidence: ['VPC flow logs and route tables', 'DNS and health-check results', 'security group NACL and endpoint configuration'],
  },
  Security: {
    mechanism: 'AWS security uses identity, policies, encryption, secrets, detection, account boundaries, and service-specific controls to protect workloads.',
    implementation: 'Apply least privilege, encrypt with owned keys where needed, rotate secrets, log control-plane activity, and test denied paths.',
    failure: 'a permissive role, weak key policy, exposed secret, or missing detection allows unauthorized access',
    decision: 'where identity, encryption, secrets, audit, and guardrail ownership belong',
    incident: 'an access key is leaked and an unauthorized actor creates resources in a production account',
    evidence: ['CloudTrail and IAM Access Analyzer findings', 'policy key and secret configuration', 'security alert and resource timeline'],
  },
  Serverless: {
    mechanism: 'AWS serverless services compose event-driven APIs, functions, queues, buses, workflows, and notifications with managed scaling and service limits.',
    implementation: 'Design idempotency, retries, DLQs, concurrency, throttling, payload contracts, and cost from the event flow.',
    failure: 'unbounded retries, non-idempotent handlers, concurrency spikes, or poison messages create duplicate work or backlog',
    decision: 'which event pattern provides the required ordering, durability, orchestration, and recovery behavior',
    incident: 'a poison message causes repeated Lambda failures and a queue backlog grows for two hours',
    evidence: ['Lambda concurrency and error metrics', 'queue bus and workflow telemetry', 'DLQ and retry configuration'],
  },
  Containers: {
    mechanism: 'AWS container platforms run images on ECS, EKS, and Fargate with different control-plane ownership, scheduling, networking, and operations models.',
    implementation: 'Define image supply chain, task or pod identity, health checks, autoscaling, secrets, and rollout safety.',
    failure: 'container health, image, identity, networking, or scaling assumptions break deployment or runtime reliability',
    decision: 'which container platform and launch model fits team skill, control, compliance, scale, and cost',
    incident: 'a container rollout passes CI but every task fails health checks because secrets and network policy differ in production',
    evidence: ['task pod and deployment events', 'container logs and image metadata', 'network identity and health metrics'],
  },
  DevOps: {
    mechanism: 'AWS DevOps services define infrastructure as code, artifact promotion, build validation, deployment orchestration, and rollback controls.',
    implementation: 'Use reviewed IaC, immutable artifacts, environment promotion, security gates, drift detection, and deployment alarms.',
    failure: 'an unreviewed template, missing rollback trigger, or environment drift breaks production infrastructure',
    decision: 'how infrastructure, artifacts, approvals, rollout, and recovery are governed',
    incident: 'a pipeline deploys a stack update that replaces a stateful resource unexpectedly',
    evidence: ['change set and stack events', 'pipeline and deployment logs', 'drift and artifact provenance'],
  },
  Monitoring: {
    mechanism: 'AWS monitoring combines metrics, logs, traces, audit trails, and configuration history to explain workload health and user impact.',
    implementation: 'Define low-noise alarms, trace critical paths, retain audit evidence, and connect dashboards to service-level objectives.',
    failure: 'missing telemetry, noisy alarms, high-cardinality data, or incomplete traces delay incident recovery',
    decision: 'which signals prove availability, performance, security, compliance, and ownership',
    incident: 'an API slows down but teams cannot isolate whether latency is in API Gateway, Lambda, VPC, or RDS',
    evidence: ['CloudWatch metrics and logs', 'X-Ray trace and service map', 'CloudTrail or Config history'],
  },
  Architecture: {
    mechanism: 'AWS architecture applies Well-Architected trade-offs across reliability, security, performance, cost optimization, operational excellence, and sustainability.',
    implementation: 'Make quality attributes measurable, isolate failure domains, automate recovery, and align service choices with business risk.',
    failure: 'a single-region, single-AZ, tightly coupled, or overprovisioned design fails scale, recovery, or cost expectations',
    decision: 'which architecture pattern meets availability, recovery, security, scale, cost, and operating-model goals',
    incident: 'a regional dependency issue causes customer impact because failover was documented but never rehearsed',
    evidence: ['architecture decision records', 'game-day and failover results', 'Well-Architected and cost dashboards'],
  },
  'Production Support': {
    mechanism: 'AWS production support connects user symptoms to service metrics, logs, traces, audit events, quotas, configuration, and recent changes.',
    implementation: 'Stabilize with the smallest reversible mitigation, preserve evidence, isolate the AWS boundary, and add durable prevention.',
    failure: 'a symptom-only restart, broad permission change, or blind scale-up destroys evidence and leaves the root cause unresolved',
    decision: 'which mitigation restores service while preserving evidence, limiting blast radius, and controlling cost',
    incident: 'latency, error rate, and cost rise together while multiple AWS services show partial degradation signals',
    evidence: ['CloudWatch and X-Ray evidence', 'CloudTrail Config and deployment timeline', 'service quota and cost anomaly data'],
  },
};

const categoryOverrides: Record<string, Partial<TopicProfile>> = {
  IAM: {
    mechanism: 'IAM authorizes AWS actions through identity policies, resource policies, trust policies, permission boundaries, SCPs, and session context.',
    failure: 'a broad policy or trust relationship grants more access than intended',
    incident: 'a developer role can assume a production admin role because the trust policy lacks external and principal constraints',
    evidence: ['IAM policy simulator and Access Analyzer', 'CloudTrail AssumeRole events', 'trust policy and SCP configuration'],
  },
  S3: {
    mechanism: 'S3 stores objects in buckets with bucket policies, ACL controls, public access block, versioning, lifecycle, replication, and encryption controls.',
    failure: 'a bucket policy or lifecycle rule exposes data, loses recoverability, or creates unexpected storage cost',
    incident: 'a public access policy exposes customer exports for several hours before detection',
    evidence: ['bucket policy and public access block', 'CloudTrail S3 data events', 'S3 inventory versioning and access logs'],
  },
  DynamoDB: {
    mechanism: 'DynamoDB distributes items by partition key and scales capacity around access patterns, item size, indexes, and hot-key behavior.',
    failure: 'a hot partition or poorly chosen GSI throttles critical reads or writes',
    incident: 'one tenant drives a partition hot and order writes begin throttling despite table-level capacity headroom',
    evidence: ['DynamoDB throttling and consumed capacity metrics', 'partition key distribution', 'application retry and latency trace'],
  },
  VPC: {
    mechanism: 'A VPC isolates networking with subnets, route tables, gateways, endpoints, security groups, NACLs, and flow logs.',
    incident: 'private workloads lose outbound access after a NAT gateway route is removed from one AZ route table',
    evidence: ['route tables subnet associations and flow logs', 'NAT gateway endpoint and security group state', 'connectivity test results'],
  },
  'Lambda Serverless': {
    mechanism: 'Lambda runs functions in managed execution environments and scales concurrency from event sources subject to limits, cold starts, networking, and retries.',
    evidence: ['Lambda duration error concurrency and throttle metrics', 'event source mapping and DLQ data', 'X-Ray trace and initialization logs'],
  },
  'Cost Optimization': {
    mechanism: 'AWS cost optimization combines workload right-sizing, pricing models, storage lifecycle, data transfer design, quotas, and team accountability.',
    failure: 'unowned resources, data transfer, NAT gateway usage, or wrong purchasing model creates surprise spend',
    incident: 'monthly spend jumps by 40 percent after cross-AZ data transfer and NAT gateway processing increase silently',
    evidence: ['Cost Explorer and cost anomaly data', 'CUR tags and usage type analysis', 'architecture traffic and resource inventory'],
  },
};

const topicSpecs: TopicSpec[] = awsInterviewPrepTopicGroups.flatMap((group) => group.topics.map((topic, index, topics) => ({
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
const industries = ['banking', 'retail', 'healthcare', 'media', 'telecom', 'payments', 'SaaS'];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hash(value: string) {
  return Array.from(value).reduce((result, character) => ((result * 31) + character.charCodeAt(0)) >>> 0, 2166136261);
}

function list(items: string[]) {
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}

function profileFor(spec: TopicSpec): TopicProfile {
  return { ...groupProfiles[spec.topicGroup], ...categoryOverrides[spec.category] };
}

function concernGuidance(concern: string, profile: TopicProfile) {
  const rules: Array<[RegExp, string]> = [
    [/iam|policy|role|kms|secret|cognito|security|responsibility|public access|encryption/i, 'Apply least privilege, separate identity from authorization, encrypt with owned keys where required, log control-plane activity, and test denied paths.'],
    [/region|az|multi|availability|disaster|failover|recovery|dr/i, 'Define RTO, RPO, failure domains, data replication, routing behavior, and rehearse failover instead of treating architecture diagrams as proof.'],
    [/vpc|route|dns|security group|nacl|transit|network|endpoint/i, 'Validate routing, DNS, firewall state, endpoint policy, and flow-log evidence from source to destination before changing production.'],
    [/s3|ebs|efs|storage|lifecycle|snapshot|backup/i, 'Match access semantics to storage type, enforce encryption and access controls, define lifecycle and backup ownership, and monitor cost.'],
    [/rds|aurora|dynamodb|elasticache|database|partition|query|cache/i, 'Start from access patterns, capacity, failover, consistency, backup, and generated metrics before picking or tuning the data service.'],
    [/lambda|api gateway|eventbridge|step|sqs|sns|serverless|event/i, 'Design idempotency, retries, DLQs, concurrency limits, observability, payload contracts, and cost controls as part of the event flow.'],
    [/ecs|eks|fargate|docker|container|image/i, 'Secure the image supply chain, define task or pod identity, health checks, networking, scaling, and rollout behavior.'],
    [/cloudformation|cdk|codepipeline|codebuild|codedeploy|pipeline|deployment/i, 'Use reviewed IaC, immutable artifacts, drift detection, gated promotion, alarms, and rollback criteria.'],
    [/cloudwatch|cloudtrail|x-ray|config|monitor|trace|log|metric/i, 'Tie metrics, logs, traces, audit, and config evidence to service-level objectives with low-noise alerts and retained forensic data.'],
    [/cost|quota|scal|performance|incident|operational/i, 'Quantify the user or business symptom, isolate the constrained AWS boundary, validate quota and cost signals, and add prevention ownership.'],
  ];
  return rules.find(([pattern]) => pattern.test(concern))?.[1]
    ?? `${profile.implementation} For ${concern}, document the owner, failure mode, security boundary, cost behavior, and validation evidence.`;
}

function questionText(intent: Intent, concern: string, category: string) {
  const values: Record<Intent, string> = {
    concept: `Explain ${concern} in AWS ${category}. Which misconception causes production defects?`,
    practical: `How would you implement and validate ${concern} for AWS ${category}?`,
    troubleshooting: `How would you troubleshoot a production failure involving ${concern} in AWS ${category}?`,
    incident: `An AWS ${category} production incident exposes a weakness in ${concern}. How would you respond and prevent recurrence?`,
    architecture: `How would you make and govern an architecture decision about ${concern} for enterprise AWS ${category}?`,
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
    ? `${profile.mechanism} In AWS ${spec.category}, the production-relevant rule for ${concern} is: ${guidance}`
    : intent === 'practical'
      ? `For AWS ${spec.category}, implement ${concern} with this production approach: ${guidance}`
      : intent === 'architecture'
        ? `For enterprise AWS ${spec.category}, treat ${concern} as an explicit Well-Architected and operating decision: ${profile.decision}.`
        : `For AWS ${spec.category}, preserve evidence, isolate the owning service boundary, and test ${concern} as a hypothesis before changing production.`;
  const detailed: Record<Intent, string[]> = {
    concept: [
      `Direct answer: ${direct}`,
      `What: ${concern} has a specific AWS service, ownership, and operating contract within ${spec.category}.`,
      `Why: Misunderstanding it can cause ${profile.failure}.`,
      `How: ${guidance}`,
      `Production validation: Prove the explanation with ${list(profile.evidence)}.`,
    ],
    practical: [
      `Direct answer: ${direct}`,
      `Implementation choices: ${guidance}`,
      `Testing approach: Cover normal behavior, access denial, quota pressure, service failure, and rollback or recovery behavior.`,
      `Operational evidence: Require ${list(profile.evidence)} before release.`,
      `Trade-off: Make this decision explicit: ${profile.decision}.`,
    ],
    troubleshooting: [
      `Direct answer: ${direct}`,
      `Observed symptom: ${profile.incident}.`,
      `Troubleshooting approach: Preserve ${profile.evidence[0]}, compare ${profile.evidence[1]} with a healthy baseline, and use ${profile.evidence[2]} to isolate the AWS owner.`,
      `Likely cause: A service limit, network path, identity policy, data-plane, deployment, or cost assumption around ${concern} changed.`,
      `Durable fix: Correct the narrow cause, add a guardrail or alarm, and verify the original user-impact signal.`,
    ],
    incident: [
      `Direct answer: ${direct}`,
      `Impact: ${profile.incident}.`,
      `Triage: Scope affected accounts, regions, AZs, workloads, users, and recent changes before selecting mitigation.`,
      `Mitigation: Apply the smallest reversible action while preserving ${profile.evidence[0]}.`,
      `Prevention: Prove root cause with ${list(profile.evidence)} and convert it into a guardrail, runbook, or architecture control.`,
    ],
    architecture: [
      `Direct answer: ${direct}`,
      `Architecture decision: ${profile.decision}.`,
      `Decision criteria: Evaluate ${concern} against reliability, security, performance, cost, operational excellence, compliance, and team ownership.`,
      `Operating model: Define the supported pattern, account and service owner, measurable guardrail, exception path, and recovery plan.`,
      `Validation: Use ${list(profile.evidence)} plus a Well-Architected review or game day.`,
    ],
  };
  const scenarios: Record<Intent, string> = {
    concept: `During a ${industry} AWS ${spec.category} design review, the team discovers that ${profile.incident}. The candidate must connect the misconception around ${concern} to AWS service ownership and prove the correction with ${profile.evidence[0]}.`,
    practical: `A canary ${spec.category} implementation of ${concern} fails under peak traffic when ${profile.incident}. The team captures ${profile.evidence[0]}, validates the exact account region and workload, and requires ${profile.evidence[2]} before rollout resumes.`,
    troubleshooting: `${spec.category} support reports that ${profile.incident}. The engineer treats ${concern} as a hypothesis, preserves ${profile.evidence[0]}, compares ${profile.evidence[1]} with a healthy workload, and isolates the cause with ${profile.evidence[2]}.`,
    incident: `Ten minutes after an AWS ${spec.category} release involving ${concern}, ${profile.incident}. The incident lead scopes blast radius, applies a reversible mitigation, preserves ${list(profile.evidence)}, and accepts recovery only after the service-level metric returns to target.`,
    architecture: `A quarterly AWS ${spec.category} architecture review finds inconsistent decisions about ${concern} contributed to this signal: ${profile.incident}. The lead defines the approved pattern, account owner, exception path, and measurable guardrail.`,
  };
  const projects: Record<Intent, string> = {
    concept: `A ${industry} platform made AWS ${spec.category} concern ${concern} part of senior-engineer onboarding after a misunderstanding caused ${profile.failure}. The team documented the service mechanism and validated it through ${profile.evidence[0]}.`,
    practical: `For a high-volume ${industry} workload, the team implemented ${concern} in AWS ${spec.category} using this rule: ${guidance} Release approval required ${profile.evidence[0]} and ${profile.evidence[1]}.`,
    troubleshooting: `A ${industry} cloud operations team traced a recurring ${spec.category} defect to ${concern}, correlated ${list(profile.evidence.slice(0, 2))}, corrected the narrow cause, and added a diagnostic runbook.`,
    incident: `During a peak ${industry} release, AWS ${spec.category} concern ${concern} contributed to ${profile.incident}. The team restored service, reconciled affected work, and added a canary plus alert tied to the root cause.`,
    architecture: `A ${industry} enterprise standardized ${concern} for AWS ${spec.category} only after deciding ${profile.decision}. The architecture record assigned ownership and required ${profile.evidence[0]} as ongoing proof.`,
  };

  return {
    id: `aws-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'aws',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question,
    shortAnswer: `${direct} Validate this ${focus[intent]} with ${profile.evidence[0]}.`,
    detailedAnswer: detailed[intent],
    productionScenario: scenarios[intent],
    realProjectExample: projects[intent],
    interviewerExpectation: `For this AWS ${spec.category} question, the interviewer expects a precise ${focus[intent]} for ${concern}, Well-Architected reasoning, evidence from ${profile.evidence[0]} and ${profile.evidence[1]}, and a credible response to ${profile.incident}.`,
    commonMistakes: [
      `For ${spec.category}, giving a service definition without explaining the AWS ownership and failure contract for ${concern}.`,
      `Changing ${concern} during a ${focus[intent]} exercise without collecting ${profile.evidence[0]} or reproducing the production workload.`,
      `Ignoring this ${spec.category} trade-off: ${profile.decision}.`,
      `Closing the ${focus[intent]} work for ${concern} without a guardrail, cost signal, operational metric, and accountable owner.`,
    ],
    followUpQuestions: [
      `For the ${focus[intent]} view of AWS ${spec.category}, which Well-Architected pillar most changes the answer for ${concern}?`,
      `How would ${profile.evidence[0]} and ${profile.evidence[1]} prove your ${focus[intent]} explanation of ${concern} in ${spec.category}?`,
      `Which security, reliability, quota, cost, or networking constraint most changes this ${spec.category} ${focus[intent]} answer for ${concern}?`,
      `From the ${focus[intent]} perspective, at what scale or failure condition would you revisit this decision: ${profile.decision}?`,
    ],
    frequencyScore: Math.max(65, (intent === 'concept' ? 94 : intent === 'practical' ? 91 : intent === 'troubleshooting' ? 88 : intent === 'incident' ? 85 : 81) - (index % 10)),
    commonWrongAnswer: `A weak answer describes ${concern} without explaining AWS service ownership, Well-Architected trade-offs, production evidence, cost behavior, and failure ownership.`,
    architectPerspective: `From the ${focus[intent]} perspective, govern ${concern} in AWS ${spec.category} through this decision: ${profile.decision}. Evaluate reliability, security, performance, cost, operations, compliance, blast radius, and the production signal "${profile.incident}".`,
    keyTakeaway: `Answer ${concern} through its AWS service contract, production evidence, failure behavior, cost signal, and explicit ownership.`,
    difficultyLevel: difficulties[intent],
    experienceLevel: experiences[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I explain the supported AWS behavior of ${concern} and demonstrate the happy path.`,
      mid: `I implement and test ${concern}, including IAM, failure, cost, and monitoring behavior.`,
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

const topicGroups: InterviewPrepTopicGroup[] = awsInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in enterprise AWS workloads.`,
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
    id: 'aws-s3-public-exposure', title: 'Public S3 exposure after policy change', topic: 'S3',
    problem: 'A bucket policy exposes customer exports publicly for several hours.',
    rootCauseAnalysis: ['Public access block was not enforced', 'Policy review missed a broad principal', 'CloudTrail data event alerts were absent'],
    troubleshootingSteps: ['Block public access immediately', 'Preserve CloudTrail and access evidence', 'Identify accessed objects', 'Add policy guardrails and detection'],
    expectedInterviewAnswer: 'Treat it as a security incident, contain exposure, preserve audit evidence, assess impact, and prevent recurrence with guardrails.',
    seniorApproach: 'A senior answer includes CloudTrail, S3 access logs, IAM policy review, customer impact reconciliation, and automated policy checks.',
    architectApproach: 'An architect standardizes account-level public access block, SCP guardrails, data classification, and detection.',
    relatedQuestions: questions.filter((question) => question.category === 'S3').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'aws-dynamodb-hot-partition', title: 'DynamoDB hot partition throttles checkout', topic: 'DynamoDB',
    problem: 'Checkout writes throttle while table-level capacity appears healthy.',
    rootCauseAnalysis: ['Partition key distribution is skewed', 'Retry storms increase write pressure', 'GSI design amplifies the hot key'],
    troubleshootingSteps: ['Inspect throttling and consumed capacity', 'Analyze key distribution', 'Mitigate retries and shard hot keys', 'Redesign access pattern'],
    expectedInterviewAnswer: 'DynamoDB scale depends on access pattern and key distribution, not only total table capacity.',
    seniorApproach: 'A senior answer correlates partition-key heat, retries, GSI usage, and customer impact.',
    architectApproach: 'An architect requires access-pattern modeling and load tests before table design approval.',
    relatedQuestions: questions.filter((question) => question.category === 'DynamoDB').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'aws-lambda-backlog', title: 'Serverless queue backlog after poison message', topic: 'SQS',
    problem: 'A poison message repeatedly fails Lambda processing and queue age grows.',
    rootCauseAnalysis: ['No partial batch failure handling', 'Visibility timeout and retry policy are misaligned', 'DLQ alarm is missing'],
    troubleshootingSteps: ['Stop repeated failures safely', 'Move poison message to DLQ', 'Fix idempotency and batch handling', 'Add queue-age and DLQ alarms'],
    expectedInterviewAnswer: 'Design event consumers for idempotency, bounded retries, DLQs, and observable backlog recovery.',
    seniorApproach: 'A senior answer includes message isolation, replay policy, Lambda concurrency, and customer impact.',
    architectApproach: 'An architect standardizes event failure patterns and replay governance.',
    relatedQuestions: questions.filter((question) => question.category === 'SQS').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'aws-cost-spike', title: 'NAT gateway and cross-AZ cost spike', topic: 'AWS Cost Issues',
    problem: 'Monthly AWS spend jumps after a traffic-routing change increases NAT processing and cross-AZ transfer.',
    rootCauseAnalysis: ['Private subnet traffic routes through NAT unnecessarily', 'Interface endpoints are missing', 'Cost tags do not identify the owning workload'],
    troubleshootingSteps: ['Use Cost Explorer and CUR by usage type', 'Map traffic path and route tables', 'Introduce VPC endpoints or route changes', 'Add cost anomaly ownership'],
    expectedInterviewAnswer: 'AWS cost incidents require usage-type evidence, architecture path analysis, owner tags, and prevention alarms.',
    seniorApproach: 'A senior answer connects cost line items to VPC routing and workload change history.',
    architectApproach: 'An architect defines cost-aware network patterns and FinOps accountability.',
    relatedQuestions: questions.filter((question) => question.category === 'AWS Cost Issues').slice(0, 4).map((question) => question.id),
  },
];

export const awsInterviewPrep: InterviewPrepSection = {
  technologyId: 'aws',
  technologyLabel: 'AWS',
  title: 'AWS Interview Prep',
  description: 'Enterprise AWS interview preparation focused on Well-Architected design, security, networking, serverless, containers, DevOps, production support, and cost-aware architecture.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Cloud / AWS Developer', years: '0-2 Years', summary: 'Explain AWS fundamentals, core services, IAM basics, and safe implementation patterns.' },
    { id: 'mid', label: 'AWS / Backend Engineer', years: '2-5 Years', summary: 'Implement reliable compute, storage, networking, security, serverless, and deployment patterns.' },
    { id: 'senior', label: 'Senior Cloud Engineer / Technical Lead', years: '5-8 Years', summary: 'Lead AWS troubleshooting, performance, security, cost, and production operations.' },
    { id: 'architect', label: 'Cloud Solution Architect', years: '8+ Years', summary: 'Design Well-Architected, secure, scalable, resilient, and cost-optimized AWS platforms.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'AWS Developer', description: 'Core AWS services, IAM, networking basics, and safe deployment.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'mid', label: 'Cloud Engineer', description: 'Compute, storage, databases, networking, serverless, and DevOps.', questionCount: 10, recommendedMinutes: 35 },
    { id: 'senior', label: 'Senior Cloud Engineer', description: 'Production troubleshooting, security, resilience, observability, and cost.', questionCount: 10, recommendedMinutes: 45 },
    { id: 'architect', label: 'Cloud Solution Architect', description: 'Well-Architected design, multi-region, DR, governance, and platform strategy.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-frequency AWS service decisions and production signals.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'AWS fundamentals, IAM, VPC, compute, data, serverless, and monitoring.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 25).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level AWS preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 50).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
