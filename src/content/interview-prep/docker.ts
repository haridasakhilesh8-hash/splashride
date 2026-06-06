import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { dockerInterviewPrepTopicGroups } from './topicNavigation';

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
  'runtime ownership and boundaries',
  'implementation choices and trade-offs',
  'security and failure behavior',
  'production diagnosis with measurable evidence',
  'enterprise governance and maintainability',
];

const categoryConcerns: Record<string, string[]> = {
  'Docker Basics': ['container runtime contract', 'image versus container relationship', 'immutable artifact workflow', 'environment parity', 'container process model'],
  Containerization: ['application isolation boundaries', 'dependency packaging strategy', 'stateless workload design', 'portability across environments', 'container operating model'],
  'Virtual Machines vs Containers': ['kernel sharing trade-off', 'startup and density differences', 'security isolation expectations', 'patching responsibility', 'workload placement decision'],
  'Docker Architecture': ['client daemon registry workflow', 'Docker daemon responsibility', 'containerd and OCI runtime role', 'registry trust boundary', 'host resource ownership'],
  'Docker Engine': ['daemon lifecycle', 'container runtime configuration', 'engine storage and network plugins', 'rootless engine considerations', 'production host maintenance'],

  'Docker Images': ['image as deployable artifact', 'tag versus digest usage', 'base image selection', 'image metadata and labels', 'registry promotion workflow'],
  Layers: ['layer cache behavior', 'layer ordering strategy', 'copy-on-write implications', 'cache invalidation during builds', 'layer bloat diagnosis'],
  'Image Optimization': ['minimal base images', 'dependency pruning', 'build context control', 'package cache cleanup', 'startup and pull-time optimization'],
  'Multi-Stage Builds': ['build versus runtime stage separation', 'artifact copying between stages', 'secret-safe build process', 'language-specific build caching', 'runtime image hardening'],
  'Image Security': ['base image vulnerability ownership', 'digest pinning', 'software bill of materials', 'signed image promotion', 'malicious image prevention'],

  'Container Lifecycle': ['create start stop restart lifecycle', 'exit codes and restart policy', 'signal handling and graceful shutdown', 'health checks', 'orphan container cleanup'],
  'Container Networking': ['container port publishing', 'network namespace behavior', 'service-to-service connectivity', 'host firewall interaction', 'network troubleshooting'],
  'Container Storage': ['ephemeral writable layer', 'data persistence boundary', 'filesystem performance', 'data backup ownership', 'storage cleanup'],
  'Container Volumes': ['managed volume lifecycle', 'volume backup and restore', 'shared volume risk', 'volume permissions', 'volume migration'],
  'Bind Mounts': ['host path coupling', 'development versus production use', 'mount shadowing behavior', 'file permission mismatch', 'host security exposure'],

  'Dockerfile Instructions': ['instruction ordering', 'build cache strategy', 'runtime user setup', 'metadata and labels', 'reproducible builds'],
  ENTRYPOINT: ['entrypoint as container contract', 'exec form versus shell form', 'signal propagation', 'wrapper script risks', 'override behavior'],
  CMD: ['default arguments', 'CMD versus ENTRYPOINT decision', 'runtime override pattern', 'command drift between environments', 'debug command behavior'],
  ENV: ['runtime configuration exposure', 'default environment values', 'secret leakage risk', 'environment precedence', 'immutable image versus runtime config'],
  ARG: ['build-time variable scope', 'ARG versus ENV decision', 'build cache invalidation', 'secret misuse in builds', 'reproducible build inputs'],
  COPY: ['deterministic file inclusion', 'ownership and permission flags', 'build context size', 'copy ordering for cache', 'artifact placement'],
  ADD: ['remote URL and archive extraction behavior', 'ADD versus COPY decision', 'unexpected extraction risk', 'supply-chain control', 'build reproducibility'],

  'Bridge Network': ['default bridge limitations', 'user-defined bridge DNS', 'published port behavior', 'container isolation', 'packet path troubleshooting'],
  'Host Network': ['host namespace sharing', 'port collision risk', 'performance trade-off', 'Linux-only production constraints', 'security boundary loss'],
  'Overlay Network': ['multi-host service connectivity', 'VXLAN and encryption considerations', 'Swarm or orchestrator fit', 'cross-host troubleshooting', 'east-west traffic design'],
  'DNS Resolution': ['embedded DNS behavior', 'service name resolution', 'container hostname and aliases', 'DNS cache surprises', 'registry and outbound DNS failures'],

  'Docker Volumes': ['volume driver choice', 'volume lifecycle ownership', 'backup consistency', 'volume portability', 'volume inspection and cleanup'],
  'Persistent Data': ['stateful container boundaries', 'database container data strategy', 'backup restore testing', 'crash consistency', 'data migration'],
  'Storage Drivers': ['overlay2 behavior', 'copy-on-write cost', 'driver compatibility', 'inode and disk pressure', 'storage driver troubleshooting'],

  'Compose Files': ['service definition structure', 'profiles and environment overrides', 'compose networking defaults', 'volume declaration', 'local parity limits'],
  'Multi-Container Applications': ['dependency boundaries', 'service discovery in compose', 'shared configuration', 'local integration testing', 'multi-service failure diagnosis'],
  'Service Dependencies': ['depends_on limitations', 'healthcheck-based readiness', 'startup ordering versus readiness', 'retryable clients', 'failure recovery'],

  'Container Security': ['root user risk', 'capability dropping', 'read-only filesystem', 'seccomp and AppArmor', 'runtime escape mitigation'],
  'Secrets Management': ['secrets outside image layers', 'runtime secret injection', 'secret rotation', 'CI build secret handling', 'audit and leakage detection'],
  'Image Scanning': ['vulnerability severity triage', 'scan gate policy', 'false positive handling', 'base image refresh', 'runtime versus build-time findings'],
  'Least Privilege': ['non-root execution', 'minimal Linux capabilities', 'narrow filesystem access', 'network egress control', 'privileged container prevention'],

  'Docker in CI/CD': ['build pipeline caching', 'test container strategy', 'image promotion gates', 'reproducible build pipeline', 'ephemeral build runners'],
  'Image Versioning': ['semantic tags and immutable digests', 'latest tag risk', 'rollback traceability', 'branch and release tag policy', 'artifact provenance'],
  'Registry Management': ['private registry access', 'retention and cleanup policies', 'replication and availability', 'credential rotation', 'pull-rate and outage handling'],

  'Container Crashes': ['crash loop investigation', 'entrypoint command failures', 'missing runtime configuration', 'dependency startup timing', 'exit code interpretation'],
  'Memory Issues': ['container memory limits', 'OOMKilled diagnosis', 'application heap sizing', 'memory leak isolation', 'swap and cgroup behavior'],
  'CPU Issues': ['CPU quota and throttling', 'noisy neighbor diagnosis', 'thread pool saturation', 'performance profiling in containers', 'CPU request sizing'],
  'Debugging Containers': ['docker logs and inspect workflow', 'exec versus ephemeral debug containers', 'network and process inspection', 'image reproducibility', 'safe production debugging'],
  'Log Analysis': ['stdout stderr logging contract', 'structured log correlation', 'log driver behavior', 'log rotation', 'missing logs after crash'],

  'Container Platform Design': ['developer golden path', 'base image standardization', 'runtime platform choice', 'security guardrails', 'operational ownership'],
  Scalability: ['horizontal scaling readiness', 'stateless container design', 'startup time impact', 'registry pull bottlenecks', 'autoscaling signal quality'],
  'High Availability': ['multi-host deployment', 'health checks and restart policy', 'registry availability', 'rolling update safety', 'stateful service recovery'],
  'Enterprise Container Strategy': ['platform governance', 'supply-chain policy', 'multi-team image standards', 'cost and capacity planning', 'migration from VM deployments'],
};

const groupProfiles: Record<string, TopicProfile> = {
  Fundamentals: {
    mechanism: 'Docker packages an application, runtime dependencies, filesystem, metadata, and process contract into images that run as isolated containers on a host kernel.',
    implementation: 'Define the process model, configuration boundary, image ownership, registry workflow, and runtime responsibility before containerizing the workload.',
    failure: 'a team treats containers like lightweight VMs and ships hidden state, broad permissions, or environment-specific behavior',
    decision: 'which workload belongs in a container, what remains external, and who owns host runtime, image, registry, and operational controls',
    incident: 'a service works on a developer laptop but fails in production because its container assumes local files, root access, and a different host network',
    evidence: ['Dockerfile and image metadata', 'container inspect output', 'runtime logs and host metrics'],
  },
  Images: {
    mechanism: 'Docker images are layered immutable artifacts pulled from registries and used to create containers with predictable filesystems and metadata.',
    implementation: 'Choose trusted base images, order layers for cache, pin important artifacts, scan vulnerabilities, and promote images immutably through environments.',
    failure: 'image bloat, mutable tags, vulnerable bases, or poor layer ordering creates slow releases, unsafe rollbacks, or production drift',
    decision: 'how image size, security, reproducibility, build speed, and rollback traceability are balanced',
    incident: 'image pull time jumps from 20 seconds to 4 minutes after a release adds build tools and package caches to the runtime image',
    evidence: ['image history and layer sizes', 'registry digest and scan report', 'build logs and pull metrics'],
  },
  Containers: {
    mechanism: 'Containers run image-defined processes with isolated namespaces, cgroups, networks, mounts, and lifecycle states while sharing the host kernel.',
    implementation: 'Keep containers stateless where possible, publish only required ports, externalize state safely, and make shutdown, health, and restart behavior explicit.',
    failure: 'process, network, storage, or lifecycle assumptions make containers restart, lose data, expose ports, or behave differently by environment',
    decision: 'which runtime contract, restart policy, network, storage, and health model gives reliable operations',
    incident: 'a payment worker repeatedly restarts because PID 1 ignores SIGTERM and leaves messages half-processed during deployments',
    evidence: ['container events and exit codes', 'docker inspect and health status', 'application logs and dependency telemetry'],
  },
  Dockerfile: {
    mechanism: 'A Dockerfile defines the repeatable build instructions that turn source, dependencies, metadata, users, configuration defaults, and entry commands into an image.',
    implementation: 'Build from a trusted base, minimize context, order cache-friendly instructions, separate build and runtime dependencies, and make process startup deterministic.',
    failure: 'an instruction leaks secrets, invalidates cache, hides command behavior, runs as root, or creates a non-reproducible artifact',
    decision: 'how to encode build speed, security, runtime behavior, and maintainability in the Dockerfile contract',
    incident: 'a release image contains private npm credentials because a build argument was used as a secret and remained visible in image history',
    evidence: ['Dockerfile diff and build history', 'image layer inspection', 'CI build logs and scanner output'],
  },
  Networking: {
    mechanism: 'Docker networking connects containers through Linux namespaces, virtual interfaces, embedded DNS, port publishing, and network drivers.',
    implementation: 'Select the narrowest network mode, understand DNS and port publishing behavior, and validate traffic paths with container and host-level evidence.',
    failure: 'DNS, port mapping, firewall, or driver assumptions block service connectivity or expose internal services',
    decision: 'which network model supports service discovery, isolation, latency, host compatibility, and operations',
    incident: 'an API container cannot reach the database after moving from default bridge to a user-defined network because environment hostnames were never updated',
    evidence: ['docker network inspect output', 'container DNS and route checks', 'host firewall and connection logs'],
  },
  Storage: {
    mechanism: 'Docker storage separates the ephemeral writable container layer from managed volumes, bind mounts, and host storage drivers.',
    implementation: 'Use volumes for durable data, keep application images immutable, test backup and restore, and monitor disk, inode, and driver behavior.',
    failure: 'data is stored in the writable layer, host paths shadow application files, or storage driver pressure causes slow and unreliable containers',
    decision: 'which data is ephemeral, which data is durable, and what backup, restore, performance, and ownership model applies',
    incident: 'a database container is recreated and loses customer test data because the team wrote state to the container layer instead of a managed volume',
    evidence: ['volume inspect output', 'mount configuration and backup logs', 'host disk inode and storage driver metrics'],
  },
  'Docker Compose': {
    mechanism: 'Docker Compose describes related services, networks, volumes, environment values, and local orchestration for multi-container applications.',
    implementation: 'Use Compose for local and integration workflows, encode dependencies explicitly, add health checks, and keep production assumptions separate.',
    failure: 'Compose startup order, environment overrides, or local-only networking creates false confidence before production deployment',
    decision: 'where Compose is a reliable workflow tool and where an orchestrator or platform contract must take over',
    incident: 'integration tests pass in Compose but production fails because depends_on started services in order without proving database readiness',
    evidence: ['compose config output', 'service health status', 'container logs and dependency readiness checks'],
  },
  Security: {
    mechanism: 'Docker security spans image supply chain, runtime user, Linux capabilities, filesystem permissions, secrets, scanning, and host attack surface.',
    implementation: 'Run as non-root, remove unnecessary capabilities, keep secrets outside image layers, scan and sign images, and enforce policies in CI and runtime.',
    failure: 'privileged containers, leaked secrets, vulnerable base images, or broad filesystem access convert a small bug into platform compromise',
    decision: 'which controls are enforced at image build, registry promotion, runtime, and platform admission',
    incident: 'a container compromise becomes host-level risk because the service runs privileged with the Docker socket mounted',
    evidence: ['image scan and SBOM', 'runtime security options', 'registry and CI policy results'],
  },
  'CI/CD': {
    mechanism: 'Docker in CI/CD creates, tests, scans, tags, signs, stores, promotes, and rolls back image artifacts through a registry-backed supply chain.',
    implementation: 'Build once, promote by digest, scan before release, avoid latest for deployment, and keep registry credentials short-lived and audited.',
    failure: 'mutable tags, weak scan gates, cache poisoning, or registry outages break repeatability and safe rollback',
    decision: 'how artifacts move from source commit to production runtime with provenance, traceability, and recovery',
    incident: 'production rolls back to the wrong image because both releases pushed the latest tag and deployment history lacks immutable digests',
    evidence: ['CI build provenance', 'registry tags and digests', 'deployment audit trail and scan gates'],
  },
  'Production Support': {
    mechanism: 'Docker production support connects container symptoms to image metadata, runtime configuration, cgroup limits, host resources, network paths, storage mounts, and recent releases.',
    implementation: 'Triage with logs, events, inspect output, metrics, and image digests before restarting or changing capacity.',
    failure: 'restart-only support hides the root cause and repeats crashes, OOM kills, CPU throttling, or missing logs',
    decision: 'which mitigation stabilizes users while preserving evidence and preventing recurrence',
    incident: 'a container enters a crash loop every two minutes after a config rollout, but the first response deletes the container and loses useful evidence',
    evidence: ['docker events and logs', 'inspect output and cgroup metrics', 'deployment diff and host telemetry'],
  },
  Architecture: {
    mechanism: 'Docker architecture defines the enterprise container operating model: image standards, runtime platform, security guardrails, scalability, availability, observability, and ownership.',
    implementation: 'Create golden paths for images and pipelines, separate app and platform responsibilities, and align Docker with orchestration, security, and reliability goals.',
    failure: 'teams adopt containers without a platform strategy, producing inconsistent images, insecure defaults, high support cost, and unreliable deployments',
    decision: 'which platform standards, security controls, scaling model, cost boundaries, and team responsibilities make containers sustainable',
    incident: 'five teams run different base images and registry policies, causing emergency patching to take days after a critical OpenSSL CVE',
    evidence: ['platform standards and exception records', 'image inventory and vulnerability reports', 'SLO and capacity dashboards'],
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

const topicSpecs: TopicSpec[] = dockerInterviewPrepTopicGroups.flatMap((group) => group.topics.map((topic) => ({
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
    [/secret|credential|key/i, 'Keep secrets out of Dockerfiles, build arguments, image layers, logs, and registry metadata; inject them at runtime through an approved secrets manager and rotate them with audit evidence.'],
    [/root|privilege|capabil|security|escape|socket/i, 'Run as a non-root user, drop unnecessary Linux capabilities, avoid privileged mode and Docker socket mounts, and prove the runtime boundary with policy and security telemetry.'],
    [/tag|digest|version|rollback|provenance/i, 'Deploy immutable digests, keep human-readable tags only as pointers, record commit and scan evidence, and verify rollback uses the exact previous digest.'],
    [/layer|cache|context|bloat|size|pull/i, 'Order stable dependency layers before volatile source layers, keep the build context small, remove package caches, and measure both image size and pull latency.'],
    [/entrypoint|cmd|signal|shutdown|pid|lifecycle|exit/i, 'Use exec form where possible, ensure PID 1 handles signals, make shutdown idempotent, and validate behavior with stop, restart, and failure tests.'],
    [/volume|storage|data|mount|persistent|driver|filesystem/i, 'Keep durable data outside the writable layer, choose volumes deliberately, document backup ownership, test restore, and monitor disk, inode, and driver pressure.'],
    [/network|dns|bridge|host|overlay|port/i, 'Validate the network namespace, published ports, DNS names, firewall path, and driver behavior from inside the container and from the host.'],
    [/memory|oom|heap|cgroup/i, 'Correlate cgroup memory limits, application heap or allocator settings, OOMKilled events, and host pressure before changing limits or restarting.'],
    [/cpu|quota|throttl|thread|profil/i, 'Separate CPU throttling from application hot paths by comparing cgroup CPU metrics, host saturation, thread profiles, and request latency.'],
    [/compose|depends|readiness|health/i, 'Use health checks and retryable clients instead of startup order alone; validate readiness, failure, and restart behavior in the Compose workflow.'],
    [/registry|scan|sbom|vulnerab|sign/i, 'Treat the registry as a supply-chain control point with scanning, retention, signing or attestation, access review, and pull-failure runbooks.'],
    [/scale|availability|platform|strategy|governance/i, 'Standardize base images, pipeline gates, runtime controls, observability, ownership, and exception handling before scaling Docker across teams.'],
  ];
  return rules.find(([pattern]) => pattern.test(concern))?.[1]
    ?? `${profile.implementation} For ${concern}, define the runtime owner, failure mode, security boundary, measurable signal, and rollback path.`;
}

function questionText(intent: Intent, concern: string, category: string) {
  const values: Record<Intent, string> = {
    concept: `Explain ${concern} in Docker ${category}. Which misconception causes production defects?`,
    practical: `How would you implement and validate ${concern} for Docker ${category}?`,
    troubleshooting: `How would you troubleshoot a production failure involving ${concern} in Docker ${category}?`,
    incident: `A Docker ${category} production incident exposes a weakness in ${concern}. How would you respond and prevent recurrence?`,
    architecture: `How would you make and govern an architecture decision about ${concern} for enterprise Docker ${category}?`,
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
    ? `${profile.mechanism} In Docker ${spec.category}, the production-relevant rule for ${concern} is: ${guidance}`
    : intent === 'practical'
      ? `For Docker ${spec.category}, implement ${concern} with this production approach: ${guidance}`
      : intent === 'architecture'
        ? `For enterprise Docker ${spec.category}, treat ${concern} as an explicit platform and operating decision: ${profile.decision}.`
        : `For Docker ${spec.category}, preserve evidence, isolate the image, container, host, network, or registry boundary, and test ${concern} as a hypothesis before changing production.`;
  const detailed: Record<Intent, string[]> = {
    concept: [
      `Direct answer: ${direct}`,
      `What: ${concern} has a specific Docker build-time or runtime contract inside ${spec.category}.`,
      `Why: Misunderstanding it can cause ${profile.failure}.`,
      `How: ${guidance}`,
      `Production validation: Prove the explanation with ${list(profile.evidence)}.`,
    ],
    practical: [
      `Direct answer: ${direct}`,
      `Implementation choices: ${guidance}`,
      `Testing approach: Cover build repeatability, runtime configuration, least privilege, restart behavior, and rollback using the exact image digest.`,
      `Operational evidence: Require ${list(profile.evidence)} before release.`,
      `Trade-off: Make this decision explicit: ${profile.decision}.`,
    ],
    troubleshooting: [
      `Direct answer: ${direct}`,
      `Observed symptom: ${profile.incident}.`,
      `Troubleshooting approach: Preserve ${profile.evidence[0]}, compare ${profile.evidence[1]} with a healthy deployment, and use ${profile.evidence[2]} to isolate the owner.`,
      `Likely cause: An image, Dockerfile, runtime flag, network mode, mount, host resource, registry, or configuration assumption around ${concern} changed.`,
      `Durable fix: Correct the narrow cause, add a regression check to CI or runtime policy, and alert on the original user-impact signal.`,
    ],
    incident: [
      `Direct answer: ${direct}`,
      `Impact: ${profile.incident}.`,
      `Triage: Scope affected images, containers, hosts, services, users, and release window before mitigating.`,
      `Mitigation: Apply the smallest reversible action while preserving ${profile.evidence[0]}.`,
      `Prevention: Prove root cause with ${list(profile.evidence)} and convert it into a pipeline gate, runtime guardrail, or runbook.`,
    ],
    architecture: [
      `Direct answer: ${direct}`,
      `Architecture decision: ${profile.decision}.`,
      `Decision criteria: Evaluate ${concern} against security, reliability, build speed, portability, observability, cost, platform support, and team ownership.`,
      `Operating model: Define the supported pattern, owner, measurable guardrail, exception path, and recovery plan.`,
      `Validation: Use ${list(profile.evidence)} plus a production-scale rollout or failure rehearsal.`,
    ],
  };
  const scenarios: Record<Intent, string> = {
    concept: `During a ${industry} Docker ${spec.category} design review, the team discovers that ${profile.incident}. The candidate must connect the misconception around ${concern} to Docker behavior and prove the correction with ${profile.evidence[0]}.`,
    practical: `A canary ${spec.category} implementation of ${concern} fails under peak traffic when ${profile.incident}. The team captures ${profile.evidence[0]}, validates the exact image digest and runtime flags, and requires ${profile.evidence[2]} before rollout resumes.`,
    troubleshooting: `${spec.category} support reports that ${profile.incident}. The engineer treats ${concern} as a hypothesis, preserves ${profile.evidence[0]}, compares ${profile.evidence[1]} with a healthy container, and isolates the cause with ${profile.evidence[2]}.`,
    incident: `Ten minutes after a Docker ${spec.category} release involving ${concern}, ${profile.incident}. The incident lead scopes blast radius, applies a reversible mitigation, preserves ${list(profile.evidence)}, and accepts recovery only after the service-level metric returns to target.`,
    architecture: `A quarterly Docker ${spec.category} architecture review finds inconsistent decisions about ${concern} contributed to this signal: ${profile.incident}. The lead defines the approved pattern, platform owner, exception path, and measurable guardrail.`,
  };
  const projects: Record<Intent, string> = {
    concept: `A ${industry} platform made Docker ${spec.category} concern ${concern} part of senior-engineer onboarding after a misunderstanding caused ${profile.failure}. The team documented the mechanism and validated it through ${profile.evidence[0]}.`,
    practical: `For a high-volume ${industry} service, the team implemented ${concern} in Docker ${spec.category} using this rule: ${guidance} Release approval required ${profile.evidence[0]} and ${profile.evidence[1]}.`,
    troubleshooting: `A ${industry} platform-support team traced a recurring Docker ${spec.category} defect to ${concern}, correlated ${list(profile.evidence.slice(0, 2))}, corrected the narrow cause, and added a diagnostic runbook.`,
    incident: `During a peak ${industry} release, Docker ${spec.category} concern ${concern} contributed to ${profile.incident}. The team restored service, reconciled affected work, and added a canary plus alert tied to the root cause.`,
    architecture: `A ${industry} enterprise standardized ${concern} for Docker ${spec.category} only after deciding ${profile.decision}. The architecture record assigned ownership and required ${profile.evidence[0]} as ongoing proof.`,
  };

  return {
    id: `docker-${slugify(spec.category)}-${slugify(concern)}-${intent}`,
    technologyId: 'docker',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question,
    shortAnswer: `${direct} Validate this ${focus[intent]} with ${profile.evidence[0]}.`,
    detailedAnswer: detailed[intent],
    productionScenario: scenarios[intent],
    realProjectExample: projects[intent],
    interviewerExpectation: `For this Docker ${spec.category} question, the interviewer expects a precise ${focus[intent]} for ${concern}, production evidence from ${profile.evidence[0]} and ${profile.evidence[1]}, and a credible response to ${profile.incident}.`,
    commonMistakes: [
      `For ${spec.category}, giving a Docker definition without explaining the runtime, image, host, or registry ownership contract for ${concern}.`,
      `Changing ${concern} during a ${focus[intent]} exercise without collecting ${profile.evidence[0]} or reproducing the production image and runtime configuration.`,
      `Ignoring this ${spec.category} trade-off: ${profile.decision}.`,
      `Closing the ${focus[intent]} work for ${concern} without a pipeline check, runtime signal, rollback plan, and accountable owner.`,
    ],
    followUpQuestions: [
      `For the ${focus[intent]} view of Docker ${spec.category}, what image, runtime, host, registry, or network boundary most changes the answer for ${concern}?`,
      `How would ${profile.evidence[0]} and ${profile.evidence[1]} prove your ${focus[intent]} explanation of ${concern} in ${spec.category}?`,
      `Which security, performance, portability, or production-support constraint most changes this Docker ${spec.category} ${focus[intent]} answer for ${concern}?`,
      `From the ${focus[intent]} perspective, at what scale or failure condition would you revisit this decision: ${profile.decision}?`,
    ],
    frequencyScore: Math.max(65, (intent === 'concept' ? 94 : intent === 'practical' ? 91 : intent === 'troubleshooting' ? 88 : intent === 'incident' ? 85 : 81) - (index % 10)),
    commonWrongAnswer: `A weak answer describes ${concern} without explaining Docker image behavior, runtime trade-offs, production evidence, security impact, and failure ownership.`,
    architectPerspective: `From the ${focus[intent]} perspective, govern ${concern} in Docker ${spec.category} through this decision: ${profile.decision}. Evaluate supply-chain security, runtime isolation, scalability, availability, observability, cost, platform ownership, and the production signal "${profile.incident}".`,
    keyTakeaway: `Answer ${concern} through its Docker build or runtime contract, production evidence, failure behavior, and explicit ownership.`,
    difficultyLevel: difficulties[intent],
    experienceLevel: experiences[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I explain the supported Docker behavior of ${concern} and demonstrate the happy path.`,
      mid: `I implement and test ${concern}, including build repeatability, runtime configuration, security, and rollback.`,
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

const topicGroups: InterviewPrepTopicGroup[] = dockerInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in enterprise Docker workloads.`,
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
    id: 'docker-image-bloat-release',
    title: 'Runtime image bloat slows every deployment',
    topic: 'Image Optimization',
    problem: 'Image pull time jumps from 20 seconds to 4 minutes after build tools and package caches are shipped in the runtime image.',
    rootCauseAnalysis: ['Build and runtime dependencies are not separated', 'Layer ordering invalidates cache on every source change', 'The pipeline has no image-size or pull-time gate'],
    troubleshootingSteps: ['Inspect image history and layer sizes', 'Compare digest and layer diff with the previous release', 'Move compilation to a build stage', 'Add image-size, scan, and pull-time checks to CI'],
    expectedInterviewAnswer: 'Use multi-stage builds, minimal trusted bases, small build contexts, cache-aware instruction ordering, and immutable digest promotion.',
    seniorApproach: 'A senior answer connects layer evidence, registry pull metrics, CI gates, rollback safety, and runtime hardening.',
    architectApproach: 'An architect standardizes base images, image budgets, SBOMs, vulnerability gates, and exception handling across teams.',
    relatedQuestions: questions.filter((question) => ['Image Optimization', 'Multi-Stage Builds', 'Layers'].includes(question.category)).slice(0, 6).map((question) => question.id),
  },
  {
    id: 'docker-container-crash-loop',
    title: 'Container crash loop after ENTRYPOINT change',
    topic: 'Container Crashes',
    problem: 'A release enters a restart loop because the new ENTRYPOINT wrapper swallows signals and exits when an optional config file is missing.',
    rootCauseAnalysis: ['ENTRYPOINT behavior changed without stop and restart tests', 'Runtime configuration default differs by environment', 'Health checks restart the process before useful logs are flushed'],
    troubleshootingSteps: ['Inspect exit code, events, and logs', 'Run the exact image digest with the production command', 'Validate ENTRYPOINT exec form and config defaults', 'Add startup and shutdown tests'],
    expectedInterviewAnswer: 'Treat crash loops as a runtime-contract issue and preserve events, inspect output, logs, image digest, and command configuration before changing production.',
    seniorApproach: 'A senior answer separates image defect, command override, missing config, dependency readiness, and orchestrator restart behavior.',
    architectApproach: 'An architect creates startup contract standards, health-check guidance, release canaries, and runbook-driven diagnostics.',
    relatedQuestions: questions.filter((question) => ['Container Crashes', 'ENTRYPOINT', 'CMD'].includes(question.category)).slice(0, 6).map((question) => question.id),
  },
  {
    id: 'docker-secret-leak-image',
    title: 'Build secret leaks into image history',
    topic: 'Secrets Management',
    problem: 'A private package token appears in image history after being passed through ARG during a CI build.',
    rootCauseAnalysis: ['Build secrets were handled as Dockerfile arguments', 'Image history and scanner checks were not part of the gate', 'Registry access allowed broad pull permissions'],
    troubleshootingSteps: ['Revoke the leaked token', 'Identify every pushed digest containing the secret', 'Remove affected images and rotate credentials', 'Move to secret-safe build injection and add history scanning'],
    expectedInterviewAnswer: 'Secrets must never be embedded in Dockerfile layers, ARG, ENV, logs, or registry metadata; rotate immediately and add preventive build controls.',
    seniorApproach: 'A senior answer includes impact scope, registry audit, credential rotation, scan evidence, and CI remediation.',
    architectApproach: 'An architect enforces supply-chain controls for secret injection, signed promotion, registry access, and audit evidence.',
    relatedQuestions: questions.filter((question) => ['Secrets Management', 'ARG', 'Image Security'].includes(question.category)).slice(0, 6).map((question) => question.id),
  },
  {
    id: 'docker-oomkilled-incident',
    title: 'Container OOMKilled during peak traffic',
    topic: 'Memory Issues',
    problem: 'A Java API container is killed during campaign traffic even though the host still has free memory.',
    rootCauseAnalysis: ['The application heap is sized larger than the container memory limit', 'Cgroup memory is not monitored separately from host memory', 'The restart policy hides the failing request pattern'],
    troubleshootingSteps: ['Check OOMKilled events and cgroup memory metrics', 'Compare heap settings with container limit', 'Capture logs and traffic pattern', 'Tune memory, test load, and add alerts'],
    expectedInterviewAnswer: 'Diagnose memory through container limits and application allocation behavior, not host memory alone.',
    seniorApproach: 'A senior answer correlates cgroup limits, app heap, GC or allocator telemetry, restart events, and request load.',
    architectApproach: 'An architect defines memory sizing standards, load-test gates, and container observability for each runtime family.',
    relatedQuestions: questions.filter((question) => ['Memory Issues', 'Container Lifecycle', 'Container Platform Design'].includes(question.category)).slice(0, 6).map((question) => question.id),
  },
];

export const dockerInterviewPrep: InterviewPrepSection = {
  technologyId: 'docker',
  technologyLabel: 'Docker',
  title: 'Docker Interview Prep',
  description: 'Enterprise Docker interview preparation focused on images, containers, Dockerfiles, networking, storage, Compose, CI/CD, security, production support, and architecture.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Docker Developer / DevOps Associate', years: '0-2 Years', summary: 'Explain Docker fundamentals, images, containers, Dockerfiles, networking, storage, and safe defaults.' },
    { id: 'mid', label: 'Backend / DevOps Engineer', years: '2-5 Years', summary: 'Implement production-ready Docker images, Compose workflows, CI/CD, security, and runtime validation.' },
    { id: 'senior', label: 'Senior DevOps / Platform Engineer', years: '5-8 Years', summary: 'Lead Docker troubleshooting, incident response, performance, supply-chain security, and production operations.' },
    { id: 'architect', label: 'Container Platform Architect', years: '8+ Years', summary: 'Design scalable, secure, governed Docker platforms and enterprise container operating models.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Docker Developer', description: 'Core Docker concepts, Dockerfile basics, images, containers, networking, and volumes.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'mid', label: 'DevOps Engineer', description: 'Production images, Compose, CI/CD, security, registry, and runtime validation.', questionCount: 10, recommendedMinutes: 35 },
    { id: 'senior', label: 'Senior Platform Engineer', description: 'Troubleshooting crashes, memory, CPU, logs, networking, storage, and release defects.', questionCount: 10, recommendedMinutes: 45 },
    { id: 'architect', label: 'Container Platform Architect', description: 'Enterprise container strategy, governance, supply chain, scalability, and high availability.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-frequency Docker image, container, Dockerfile, and production-support decisions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Docker fundamentals, images, containers, Dockerfiles, networking, storage, security, and CI/CD.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 25).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Docker preparation for enterprise production systems.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 50).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
