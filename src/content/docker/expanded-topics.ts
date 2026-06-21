import type { TopicContent } from '../types';

interface DockerExpandedTopicSpec {
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
const versions = ['Docker Engine', 'Docker CLI', 'Docker Compose', 'OCI Images'];

function topic(spec: DockerExpandedTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the Docker topics senior platform engineers use to explain image design, runtime behavior, security boundaries, and production operations with confidence.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers care about this topic:**
- Docker questions are usually about runtime behavior, delivery trade-offs, and production support rather than only commands
- Strong answers connect container choices to security, observability, scalability, and long-term maintenance
- Senior engineers explain how container behavior changes during deployments, failures, and incident response`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Docker example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} only a Docker command-level topic?`,
        answer: `No. ${spec.title} affects image quality, runtime behavior, security boundaries, incident response, and how safely teams can operate containers in production.`,
      },
      {
        question: `What makes a weak interview answer for ${spec.title}?`,
        answer: `A weak answer explains the feature briefly but skips operational ownership, failure behavior, measurable signals, and why the design matters after deployment.`,
      },
      {
        question: `How should senior engineers explain ${spec.title}?`,
        answer: `Senior answers connect ${spec.title} to artifact design, runtime contracts, supportability, security, cost, and the evidence used during troubleshooting.`,
      },
    ],
    productionIssues: [
      `${spec.title} is adopted without a clear operating model, so teams make inconsistent assumptions about runtime behavior, rollback, or security.`,
      `The workload depends on ${spec.title.toLowerCase()} successfully in a happy-path environment, but validation, alarms, or recovery behavior are too weak when production pressure rises.`,
      `Teams discuss ${spec.title} only as a Docker feature and miss the platform burden around supply chain, permissions, observability, or host-level impact.`,
    ],
    bestPractices: [
      `Treat ${spec.title} as a container platform decision, not just a Docker definition.`,
      'Make the runtime contract, access boundary, and operational signal explicit before scaling the pattern across environments.',
      'Use examples from production incidents, release regressions, security reviews, or performance investigations when explaining the topic.',
      'Prefer answers that connect Docker mechanics to long-term ownership and reliability.',
    ],
    architectNote: `In Docker-based systems, ${spec.title} should be evaluated through isolation, least privilege, resilience, image hygiene, rollout safety, cost, and how many teams must safely live with the decision over time.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real Docker platform?`,
        answer: `Explain the Docker mechanism first, then connect ${spec.title} to image design, runtime behavior, observability, rollback, and the controls that keep container workloads supportable in production.`,
      },
      {
        question: `Interview: what production concern usually comes up with ${spec.title}?`,
        answer: `The usual concern is that the Docker behavior works in development but becomes risky at scale because the team has not designed around visibility, security, or failure recovery.`,
      },
    ],
    keyTakeaways: [
      `${spec.title} is a production container decision, not just a definition to memorize.`,
      'Strong Docker answers connect image design, runtime behavior, security, and operational recovery together.',
      'Interview depth comes from showing ownership, trade-offs, and production evidence clearly.',
      'Senior engineers explain how container workloads keep running when images, hosts, or dependencies are misconfigured or degraded.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const specs: DockerExpandedTopicSpec[] = [
  {
    slug: 'docker-containerization',
    title: 'Containerization',
    description: 'Understand containerization as the packaging model that separates application delivery from host-specific setup.',
    concept: 'Containerization packages an application with its runtime dependencies into an image that can run predictably across environments while sharing the host kernel.',
    why: 'It matters because teams need repeatable deployments, faster environment parity, and a clearer boundary between application code and host configuration.',
    usage: 'This shows up in local development, CI builds, cloud delivery, legacy modernization, and platform standardization efforts.',
    workflow: 'Start by defining the application process, external dependencies, and state boundary, then containerize only what should move together as one runtime artifact.',
    exampleTitle: 'Containerization review',
    exampleCode: `Ask before containerizing
-> what is the main process?
-> what stays outside the image?
-> where does state live?
-> how will the runtime be observed?`,
    relatedTopics: ['docker-overview', 'docker-architecture', 'docker-images'],
  },
  {
    slug: 'docker-engine',
    title: 'Docker Engine',
    description: 'Learn how Docker Engine manages images, containers, networks, and volumes on a host.',
    concept: 'Docker Engine is the host-side runtime that receives Docker commands, builds or pulls images, and manages containers, networks, volumes, and storage behavior.',
    why: 'Engine ownership matters because many Docker issues are really daemon, host, storage, or permissions problems rather than application bugs.',
    usage: 'This appears in local development, build runners, VM-based container hosts, and operational troubleshooting during runtime incidents.',
    workflow: 'Understand which responsibilities belong to the daemon, what the host must provide, and how logs, events, and configuration explain container behavior.',
    exampleTitle: 'Engine ownership map',
    exampleCode: `Docker Engine manages
-> image and container lifecycle
-> local networks and volumes
-> build and pull behavior
-> runtime interaction with the host`,
    relatedTopics: ['docker-architecture', 'docker-container-lifecycle', 'docker-storage-drivers'],
  },
  {
    slug: 'docker-layers',
    title: 'Layers',
    description: 'Understand how Docker image layers affect build caching, image size, and rollout speed.',
    concept: 'Docker images are built from read-only layers, and each instruction can create a new cached layer that affects image reuse and pull efficiency.',
    why: 'Layer design directly affects build time, registry storage, image size, and how quickly environments can roll forward or back.',
    usage: 'This matters in CI pipelines, large dependency stacks, multi-service monorepos, and platforms chasing smaller runtime images.',
    workflow: 'Order stable instructions before volatile ones, keep context small, and inspect layer growth when build times or image pulls start drifting upward.',
    exampleTitle: 'Layer strategy',
    exampleCode: `Good layer ordering
-> base runtime
-> system packages
-> application dependencies
-> source code
-> startup command`,
    relatedTopics: ['docker-images', 'docker-multi-stage-builds', 'docker-image-optimization'],
  },
  {
    slug: 'docker-image-optimization',
    title: 'Image Optimization',
    description: 'Learn how to reduce Docker image size, pull time, and unnecessary runtime content.',
    concept: 'Image optimization is the practice of removing unnecessary packages, trimming layers, controlling build context, and keeping runtime images minimal.',
    why: 'Oversized images slow builds, increase registry and network cost, and make deployments and cold-start scenarios slower than they need to be.',
    usage: 'This appears in cloud platforms, CI/CD pipelines, autoscaling systems, and developer environments where large images create daily friction.',
    workflow: 'Start from the runtime minimum, move build-only tooling out of the final image, and measure image size and pull latency after each optimization step.',
    exampleTitle: 'Optimization checklist',
    exampleCode: `Reduce image size by
-> using slimmer base images
-> removing build tools from runtime
-> shrinking build context
-> cleaning package caches`,
    relatedTopics: ['docker-layers', 'docker-multi-stage-builds', 'docker-image-security'],
  },
  {
    slug: 'docker-image-security',
    title: 'Image Security',
    description: 'Understand Docker image security through trusted bases, vulnerability ownership, and supply-chain controls.',
    concept: 'Image security is the discipline of choosing trusted base images, scanning dependencies, pinning critical artifacts, and limiting what enters the runtime image.',
    why: 'The image is part of the production attack surface, so insecure base images or hidden dependencies become deployment-wide risks.',
    usage: 'This matters in security review, platform governance, regulated environments, and incident response after vulnerability disclosures.',
    workflow: 'Start from trusted sources, keep images minimal, scan continuously, and use promotion rules so only reviewed images move toward production.',
    exampleTitle: 'Supply-chain baseline',
    exampleCode: `Image security baseline
-> trusted base image
-> vulnerability scan
-> minimal runtime content
-> controlled promotion to environments`,
    relatedTopics: ['docker-security', 'docker-image-scanning', 'docker-registry-management'],
  },
  {
    slug: 'docker-container-storage',
    title: 'Container Storage',
    description: 'Learn how ephemeral container storage differs from durable data storage in Docker workloads.',
    concept: 'Container storage starts with the writable container layer, which is ephemeral and not the right place for long-lived or recoverable data.',
    why: 'Teams lose data or create unstable workloads when they treat container filesystems like durable application disks.',
    usage: 'This appears in databases, file-processing jobs, local dev containers, and debugging sessions where state location matters.',
    workflow: 'Separate temporary runtime files from durable state, and document which data belongs in the writable layer, a volume, or an external service.',
    exampleTitle: 'State boundary check',
    exampleCode: `Container storage review
-> what data is temporary?
-> what must survive restart?
-> who backs it up?
-> how is it restored?`,
    relatedTopics: ['docker-volumes', 'docker-persistent-data', 'docker-storage-drivers'],
  },
  {
    slug: 'docker-bind-mounts',
    title: 'Bind Mounts',
    description: 'Understand bind mounts and where direct host-path mapping is useful or risky.',
    concept: 'Bind mounts map a host path directly into a container, which is convenient for development but tightly couples the container to the host filesystem.',
    why: 'Bind mounts can create permission mismatch, hidden file shadowing, portability issues, and bigger host exposure than teams expect.',
    usage: 'This matters in local development, build containers, debug workflows, and occasional operational tooling that needs host access.',
    workflow: 'Use bind mounts deliberately, understand the exact host path and permissions involved, and avoid assuming a bind-mounted pattern is automatically production-safe.',
    exampleTitle: 'Bind mount safety check',
    exampleCode: `Before using a bind mount
-> which host path is exposed?
-> who owns the files?
-> what breaks on another machine?
-> is a volume safer?`,
    relatedTopics: ['docker-volumes', 'docker-container-storage', 'docker-persistent-data'],
  },
  {
    slug: 'docker-entrypoint',
    title: 'ENTRYPOINT',
    description: 'Learn how ENTRYPOINT defines the main container process contract and startup behavior.',
    concept: 'ENTRYPOINT defines the command the container is expected to run as its primary process, shaping signal handling, restart behavior, and runtime expectations.',
    why: 'Bad ENTRYPOINT design leads to fragile startup wrappers, ignored signals, and confusing runtime overrides during debugging or orchestration.',
    usage: 'This appears in API services, workers, utility containers, and platforms standardizing startup contracts across images.',
    workflow: 'Prefer predictable process startup, understand exec versus shell forms, and validate how stop, restart, and override behavior work in real environments.',
    exampleTitle: 'Process contract rule',
    exampleCode: `ENTRYPOINT should answer
-> what is PID 1?
-> does it handle signals?
-> can operators override behavior safely?`,
    relatedTopics: ['docker-cmd', 'docker-container-lifecycle', 'docker-dockerfile'],
  },
  {
    slug: 'docker-cmd',
    title: 'CMD',
    description: 'Understand how CMD supplies default runtime arguments and how it differs from ENTRYPOINT.',
    concept: 'CMD defines default arguments or a default command when a container starts, but its meaning changes depending on whether ENTRYPOINT is also set.',
    why: 'Teams often confuse CMD with ENTRYPOINT and end up with containers that behave differently across local runs, Compose, and production platforms.',
    usage: 'This matters in application images, debug modes, utility containers, and any image meant to support runtime overrides.',
    workflow: 'Use CMD for defaults, use ENTRYPOINT for the primary contract when needed, and test how both behave when operators pass runtime overrides.',
    exampleTitle: 'CMD versus ENTRYPOINT',
    exampleCode: `Use CMD for
-> default arguments
Use ENTRYPOINT for
-> the primary container process contract`,
    relatedTopics: ['docker-entrypoint', 'docker-dockerfile', 'docker-container-crashes'],
  },
  {
    slug: 'docker-env',
    title: 'ENV',
    description: 'Learn how ENV sets runtime defaults and where environment-based configuration becomes risky.',
    concept: 'ENV defines environment variables baked into the image or available at runtime, shaping application configuration and process behavior.',
    why: 'Environment variables are easy to use, but they can leak sensitive values, drift across environments, or hide configuration assumptions.',
    usage: 'This appears in app configuration, default ports, feature flags, runtime tuning, and CI/CD-driven environment setup.',
    workflow: 'Use ENV for non-sensitive defaults, inject secrets through safer runtime mechanisms, and document precedence between image defaults and environment overrides.',
    exampleTitle: 'Configuration boundary',
    exampleCode: `ENV is good for
-> default runtime values
Not for
-> long-lived secrets in image layers`,
    relatedTopics: ['docker-arg', 'docker-secrets-management', 'docker-compose'],
  },
  {
    slug: 'docker-arg',
    title: 'ARG',
    description: 'Understand build-time arguments and how ARG differs from runtime environment variables.',
    concept: 'ARG provides build-time variables used during image creation, but it is not the right tool for long-lived secrets or runtime configuration.',
    why: 'Misusing ARG can expose sensitive values in build logs or image history and make builds harder to reproduce.',
    usage: 'This matters in version pinning, optional build behavior, CI-driven image customization, and multi-environment artifact generation.',
    workflow: 'Use ARG only for build-time decisions, keep sensitive material out of build arguments, and track which inputs change reproducibility or cache behavior.',
    exampleTitle: 'Build input checklist',
    exampleCode: `ARG review
-> is this only needed at build time?
-> will it affect cache?
-> could it leak in logs or history?`,
    relatedTopics: ['docker-env', 'docker-dockerfile', 'docker-image-versioning'],
  },
  {
    slug: 'docker-copy',
    title: 'COPY',
    description: 'Learn how COPY controls deterministic file inclusion and build-context growth.',
    concept: 'COPY brings files from the build context into an image and strongly influences cache behavior, context size, and final artifact structure.',
    why: 'Poor COPY usage leads to unnecessary rebuilds, large contexts, misplaced files, and confusing runtime artifacts.',
    usage: 'This appears in app builds, dependency caching, monorepos, static asset packaging, and runtime content assembly.',
    workflow: 'Copy only what is needed, order COPY instructions to protect cache stability, and inspect context size when build performance degrades.',
    exampleTitle: 'COPY strategy',
    exampleCode: `Use COPY deliberately
-> copy dependency manifests first
-> copy source later
-> keep build context small`,
    relatedTopics: ['docker-add', 'docker-layers', 'docker-dockerfile'],
  },
  {
    slug: 'docker-add',
    title: 'ADD',
    description: 'Understand ADD and when its extra behavior makes builds less predictable than COPY.',
    concept: 'ADD can copy local files like COPY, but it also supports archive extraction and remote URL behavior, which can introduce hidden build behavior.',
    why: 'Teams often use ADD when COPY would be clearer, which makes image builds harder to review, reproduce, and secure.',
    usage: 'This appears in legacy Dockerfiles, archive-based image builds, and reviews of build reproducibility and supply-chain safety.',
    workflow: 'Prefer COPY by default, use ADD only when you intentionally need its extra behavior, and document why that behavior is required.',
    exampleTitle: 'ADD review rule',
    exampleCode: `Prefer COPY unless
-> archive extraction is intentional
-> the extra behavior is understood and reviewed`,
    relatedTopics: ['docker-copy', 'docker-dockerfile', 'docker-image-security'],
  },
  {
    slug: 'docker-bridge-network',
    title: 'Bridge Network',
    description: 'Learn how bridge networking works for local container connectivity and published ports.',
    concept: 'Bridge networks connect containers on one host and control how services reach each other and how ports are exposed externally.',
    why: 'Bridge behavior affects service discovery, local isolation, port publishing, and many first-line Docker networking investigations.',
    usage: 'This appears in local development, Compose environments, test stacks, and single-host production-style container setups.',
    workflow: 'Understand whether the default or a user-defined bridge is being used, validate DNS and port mapping, and inspect connectivity from both the container and host side.',
    exampleTitle: 'Bridge network checks',
    exampleCode: `Bridge networking review
-> which network is the container on?
-> how are ports published?
-> how do peer containers resolve names?`,
    relatedTopics: ['docker-networking', 'docker-dns-resolution', 'docker-compose'],
  },
  {
    slug: 'docker-host-network',
    title: 'Host Network',
    description: 'Understand host networking and the trade-off between simplicity, performance, and isolation.',
    concept: 'Host networking removes one layer of container network isolation by sharing the host network namespace directly.',
    why: 'It can simplify some runtime cases, but it also increases port-collision risk and reduces network boundary clarity.',
    usage: 'This appears in specialized performance-sensitive setups, operational tooling, and troubleshooting why port isolation is not working as expected.',
    workflow: 'Use host networking only when the trade-off is justified, validate port and firewall behavior, and document the loss of network separation clearly.',
    exampleTitle: 'Host-mode trade-off',
    exampleCode: `Host networking means
-> no separate container network namespace
-> direct host port use
-> less isolation, more simplicity`,
    relatedTopics: ['docker-bridge-network', 'docker-networking', 'docker-container-security'],
  },
  {
    slug: 'docker-overlay-network',
    title: 'Overlay Network',
    description: 'Learn how overlay networking connects containers across multiple hosts.',
    concept: 'Overlay networks create virtual container connectivity across hosts, usually in orchestrated or multi-host environments.',
    why: 'Cross-host traffic is harder to reason about than single-host bridge networking and brings added operational and troubleshooting complexity.',
    usage: 'This appears in Swarm-style designs, multi-host container platforms, and architecture discussions around east-west traffic.',
    workflow: 'Use overlay networking when multi-host connectivity is actually required, then validate routing, encryption expectations, and failure behavior across hosts.',
    exampleTitle: 'Cross-host network review',
    exampleCode: `Overlay networking asks
-> which hosts participate?
-> how is cross-host traffic routed?
-> what happens if one node degrades?`,
    relatedTopics: ['docker-networking', 'docker-bridge-network', 'docker-high-availability'],
  },
  {
    slug: 'docker-dns-resolution',
    title: 'DNS Resolution',
    description: 'Understand how containers resolve names and where Docker DNS surprises appear.',
    concept: 'Docker provides name resolution behavior inside container networks, which affects service-to-service communication and dependency discovery.',
    why: 'DNS issues often look like application or network failures, so teams need to know where names are resolved and which namespace owns them.',
    usage: 'This matters in Compose stacks, service discovery, outbound dependency troubleshooting, and multi-container local environments.',
    workflow: 'Test resolution from inside the container, confirm network membership and aliases, and compare Docker DNS behavior with host-level DNS assumptions.',
    exampleTitle: 'DNS triage flow',
    exampleCode: `Name-resolution check
-> does the container resolve the name?
-> is the peer on the same network?
-> is the alias correct?
-> is host DNS being assumed incorrectly?`,
    relatedTopics: ['docker-networking', 'docker-bridge-network', 'docker-service-dependencies'],
  },
  {
    slug: 'docker-persistent-data',
    title: 'Persistent Data',
    description: 'Learn how to handle durable state safely in Docker-based workloads.',
    concept: 'Persistent data in Docker needs an explicit durability strategy outside the ephemeral container layer, usually through volumes or external data services.',
    why: 'Stateless assumptions fail quickly when teams containerize databases, uploads, or queued data without backup and restore thinking.',
    usage: 'This appears in databases, content processing, local test environments, and modernization of stateful workloads.',
    workflow: 'Decide where durable state should live, prove backup and restore, and treat storage design as part of workload reliability rather than an afterthought.',
    exampleTitle: 'Data durability checklist',
    exampleCode: `Persistent data review
-> where does state live?
-> how is it backed up?
-> how is it restored?
-> what survives container recreation?`,
    relatedTopics: ['docker-volumes', 'docker-container-storage', 'docker-high-availability'],
  },
  {
    slug: 'docker-storage-drivers',
    title: 'Storage Drivers',
    description: 'Understand how Docker storage drivers influence filesystem behavior and performance.',
    concept: 'Storage drivers underpin how image layers and writable container filesystems are mounted and managed on the host.',
    why: 'Driver behavior affects disk usage, inode pressure, copy-on-write cost, and troubleshooting when containers slow down or hosts fill unexpectedly.',
    usage: 'This matters in dense hosts, CI runners, long-lived build agents, and performance or disk-pressure investigations.',
    workflow: 'Know the active driver, monitor host disk and inode health, and investigate whether copy-on-write behavior or cleanup patterns are driving operational pain.',
    exampleTitle: 'Driver diagnostics',
    exampleCode: `Storage driver investigation
-> which driver is active?
-> is disk or inode pressure rising?
-> is copy-on-write creating unexpected cost?`,
    relatedTopics: ['docker-container-storage', 'docker-layers', 'docker-image-optimization'],
  },
  {
    slug: 'docker-multi-container-applications',
    title: 'Multi-Container Applications',
    description: 'Learn how multiple containers work together as one application system.',
    concept: 'Multi-container applications separate responsibilities across services while still depending on coordinated networking, configuration, startup readiness, and observability.',
    why: 'Running many containers is not just a packaging exercise; it changes how teams debug integration and support failures.',
    usage: 'This appears in local dev stacks, service-oriented apps, test environments, and platform demos before orchestration.',
    workflow: 'Define each service boundary clearly, connect them through known networks and configs, and validate dependency readiness instead of assuming startup order is enough.',
    exampleTitle: 'Service-boundary review',
    exampleCode: `Multi-container design asks
-> what does each container own?
-> how do services find each other?
-> what must be ready before traffic starts?`,
    relatedTopics: ['docker-compose', 'docker-service-dependencies', 'docker-debugging-containers'],
  },
  {
    slug: 'docker-service-dependencies',
    title: 'Service Dependencies',
    description: 'Understand how containerized services depend on each other and why startup order is not the same as readiness.',
    concept: 'Service dependencies in container platforms include networking, configuration, storage, credentials, and actual dependency readiness rather than only process start order.',
    why: 'Many container outages come from assuming that if a dependency container started, it is fully ready to serve real traffic.',
    usage: 'This appears in Compose stacks, integration tests, local environments, and release troubleshooting when dependencies are unstable.',
    workflow: 'Make dependency assumptions explicit, use health checks or retryable clients, and verify how services behave when dependencies are slow or unavailable.',
    exampleTitle: 'Readiness versus startup',
    exampleCode: `Dependency review
-> is the dependency started?
-> is it actually ready?
-> can the client retry safely?
-> what happens if it stays unavailable?`,
    relatedTopics: ['docker-compose', 'docker-dns-resolution', 'docker-container-crashes'],
  },
  {
    slug: 'docker-secrets-management',
    title: 'Secrets Management',
    description: 'Learn how to keep credentials and tokens out of images and runtime logs.',
    concept: 'Secrets management in Docker means injecting sensitive values at runtime through safer mechanisms rather than baking them into image layers or source-controlled files.',
    why: 'Leaked secrets turn a normal container delivery issue into a security incident with wide blast radius.',
    usage: 'This matters in CI/CD, application runtime config, registry access, database credentials, and cloud service integration.',
    workflow: 'Keep secrets outside the image, control which runtime identities can read them, and verify that logs, inspect output, and build history do not expose them accidentally.',
    exampleTitle: 'Secret-handling checklist',
    exampleCode: `Secret management review
-> is the secret outside the image?
-> who can read it?
-> could logs or history leak it?
-> how is it rotated?`,
    relatedTopics: ['docker-env', 'docker-image-security', 'docker-security'],
  },
  {
    slug: 'docker-image-scanning',
    title: 'Image Scanning',
    description: 'Understand image scanning and how vulnerability findings should influence Docker release policy.',
    concept: 'Image scanning evaluates container images for known vulnerabilities and risky packages before promotion or deployment.',
    why: 'Scanning matters because the image supply chain is a live attack surface, but raw findings are only useful when teams have triage and release policy.',
    usage: 'This appears in CI pipelines, registry promotion, security gates, compliance review, and emergency response after CVEs.',
    workflow: 'Scan early and repeatedly, define severity and exception policy, and tie remediation to image rebuild cadence rather than one-off manual fixes.',
    exampleTitle: 'Vulnerability gate',
    exampleCode: `Image scanning policy
-> what severities block release?
-> who approves exceptions?
-> how fast are base images rebuilt?`,
    relatedTopics: ['docker-image-security', 'docker-registry-management', 'docker-cicd-integration'],
  },
  {
    slug: 'docker-least-privilege',
    title: 'Least Privilege',
    description: 'Learn how to reduce container runtime permissions and limit blast radius.',
    concept: 'Least privilege in Docker means minimizing users, Linux capabilities, mounts, network access, and privileged runtime options so containers do only what they truly need.',
    why: 'Security risk grows quickly when containers run as root, mount sensitive host paths, or keep more permissions than the workload requires.',
    usage: 'This matters in security review, platform guardrails, regulated systems, and incident prevention across multi-team container estates.',
    workflow: 'Start from minimal permissions, add only what the workload proves it needs, and validate both functionality and denial paths during testing.',
    exampleTitle: 'Privilege review',
    exampleCode: `Least-privilege questions
-> does the container need root?
-> which capabilities are required?
-> are host mounts really necessary?
-> what can be removed safely?`,
    relatedTopics: ['docker-security', 'docker-secrets-management', 'docker-container-security'],
  },
  {
    slug: 'docker-image-versioning',
    title: 'Image Versioning',
    description: 'Understand how tags, digests, and release policy affect traceability and rollback.',
    concept: 'Image versioning is the practice of naming, tagging, and promoting container artifacts so the deployed runtime can be traced and rolled back safely.',
    why: 'Mutable tags and weak artifact policy make releases hard to audit and roll back under pressure.',
    usage: 'This appears in CI/CD, registry promotion, production rollback, incident investigation, and multi-environment delivery.',
    workflow: 'Use immutable digests for deployment truth, keep tags readable for humans, and preserve provenance from source commit through deployment target.',
    exampleTitle: 'Artifact traceability model',
    exampleCode: `Versioning baseline
-> human-friendly tag
-> immutable digest
-> source commit trace
-> rollback target recorded`,
    relatedTopics: ['docker-cicd-integration', 'docker-registry-management', 'docker-images'],
  },
  {
    slug: 'docker-registry-management',
    title: 'Registry Management',
    description: 'Learn how registries support Docker image storage, promotion, retention, and availability.',
    concept: 'Registry management covers access control, image retention, artifact promotion, availability, and cleanup for Docker image storage platforms.',
    why: 'Weak registry governance creates pull failures, uncontrolled storage growth, unsafe access, and poor release traceability.',
    usage: 'This matters in private registries, cloud container registries, CI/CD pipelines, multi-team platform operations, and disaster recovery.',
    workflow: 'Control who can push and pull, define retention and promotion rules, and treat the registry as a production dependency with availability and audit requirements.',
    exampleTitle: 'Registry governance',
    exampleCode: `Registry review
-> who can push and pull?
-> how are images promoted?
-> when are old images cleaned up?
-> what happens if the registry is unavailable?`,
    relatedTopics: ['docker-image-versioning', 'docker-image-scanning', 'docker-hub'],
  },
  {
    slug: 'docker-container-crashes',
    title: 'Container Crashes',
    description: 'Understand how to investigate crash loops and repeated container exits.',
    concept: 'Container crashes usually point to startup command errors, missing config, dependency timing, signals, or application-level failures revealed by the container boundary.',
    why: 'Support teams need evidence-first crash triage instead of deleting and recreating containers until the symptom disappears temporarily.',
    usage: 'This appears in releases, config mistakes, dependency outages, broken images, and incident response when services keep restarting.',
    workflow: 'Start with exit codes, logs, events, and image diff, then isolate whether the failure is in the app, runtime config, or dependency path.',
    exampleTitle: 'Crash-loop triage',
    exampleCode: `Crash investigation
-> what was the exit code?
-> what changed in the image or config?
-> did a dependency fail first?
-> is restart policy hiding the signal?`,
    relatedTopics: ['docker-container-lifecycle', 'docker-debugging-containers', 'docker-log-analysis'],
  },
  {
    slug: 'docker-memory-issues',
    title: 'Memory Issues',
    description: 'Learn how Docker memory limits and OOM behavior affect container workloads.',
    concept: 'Memory issues in Docker involve container memory limits, application heap behavior, cgroup enforcement, and how the runtime reacts when processes exceed available memory.',
    why: 'Containers that work locally can fail under limits in CI or production, and OOM behavior is often misunderstood during incident response.',
    usage: 'This matters in Java or Node services, build containers, stateful workloads, autoscaling systems, and noisy-neighbor investigations.',
    workflow: 'Correlate memory growth with workload and release history, check cgroup limits and OOM events, and separate leaks from temporary allocation spikes.',
    exampleTitle: 'Memory-pressure review',
    exampleCode: `Memory investigation
-> what limit is enforced?
-> was the process OOMKilled?
-> does memory return after load?
-> did the release change runtime behavior?`,
    relatedTopics: ['docker-cpu-issues', 'docker-container-crashes', 'docker-high-availability'],
  },
  {
    slug: 'docker-cpu-issues',
    title: 'CPU Issues',
    description: 'Understand CPU throttling, saturation, and host-level contention in Docker environments.',
    concept: 'CPU issues in Docker can come from container limits, host contention, application inefficiency, or thread-pool behavior that only appears under constrained runtime conditions.',
    why: 'CPU saturation is a common production symptom, but teams need to separate container quota behavior from application or host-level causes.',
    usage: 'This appears in high-throughput APIs, CI runners, multi-container hosts, and performance investigations during traffic spikes.',
    workflow: 'Compare CPU usage to limits, inspect throttling or host contention, and correlate the signal with app traces and release changes before scaling blindly.',
    exampleTitle: 'CPU triage',
    exampleCode: `CPU investigation
-> is the container throttled?
-> is the host saturated?
-> did app behavior change?
-> what does profiling show?`,
    relatedTopics: ['docker-memory-issues', 'docker-scalability', 'docker-performance-troubleshooting'],
  },
  {
    slug: 'docker-debugging-containers',
    title: 'Debugging Containers',
    description: 'Learn safe, evidence-led ways to debug containerized workloads.',
    concept: 'Debugging containers combines logs, inspect output, exec sessions, image history, network checks, and host signals to explain why the runtime is failing.',
    why: 'Blindly restarting or rebuilding hides the evidence needed to fix the real problem and makes the same incident repeat later.',
    usage: 'This appears in crash loops, missing config, networking failures, permissions issues, and dependency readiness problems.',
    workflow: 'Preserve evidence first, inspect the running or failed container state, compare image and config diffs, and only then choose the smallest useful mitigation.',
    exampleTitle: 'Container debug order',
    exampleCode: `1. Scope impact
2. Read logs and events
3. Inspect config and image
4. Test runtime assumptions
5. Apply the narrowest fix`,
    relatedTopics: ['docker-container-crashes', 'docker-log-analysis', 'docker-container-lifecycle'],
  },
  {
    slug: 'docker-log-analysis',
    title: 'Log Analysis',
    description: 'Understand how container logs should be used during troubleshooting and observability.',
    concept: 'Docker log analysis focuses on the stdout and stderr contract, structured logging, log driver behavior, and correlation with runtime and host events.',
    why: 'When logs are incomplete, noisy, or missing after crashes, incident recovery becomes slower and root-cause analysis weaker.',
    usage: 'This matters in production support, release verification, crash-loop triage, dependency debugging, and compliance evidence.',
    workflow: 'Treat logs as one signal among several, correlate them with events and metrics, and verify that logging survives normal failure and restart conditions.',
    exampleTitle: 'Logging review',
    exampleCode: `Container log review
-> are logs structured?
-> do they survive restart?
-> can they be correlated with runtime events?
-> is the driver behavior understood?`,
    relatedTopics: ['docker-debugging-containers', 'docker-container-crashes', 'docker-operational-excellence'],
  },
  {
    slug: 'docker-container-platform-design',
    title: 'Container Platform Design',
    description: 'Learn how to standardize Docker usage as a platform rather than many isolated app choices.',
    concept: 'Container platform design is the operating model for image standards, runtime defaults, security controls, pipelines, registries, and support expectations across teams.',
    why: 'Docker adoption becomes expensive and inconsistent when every team makes unrelated image, runtime, and security choices.',
    usage: 'This appears in platform engineering, internal developer platforms, enterprise modernization, and multi-team delivery standards.',
    workflow: 'Define the golden path first, decide which choices teams inherit versus customize, and make security and observability part of the base platform contract.',
    exampleTitle: 'Platform standard questions',
    exampleCode: `Platform design asks
-> what is standardized?
-> what can teams customize?
-> how are images, registries, and policies governed?`,
    relatedTopics: ['docker-enterprise-deployment-patterns', 'docker-registry-management', 'docker-least-privilege'],
  },
  {
    slug: 'docker-scalability',
    title: 'Scalability',
    description: 'Understand what makes containerized workloads actually ready to scale.',
    concept: 'Scalability in Docker depends on stateless design, startup time, image pull efficiency, dependency resilience, and the quality of runtime metrics that drive scaling decisions.',
    why: 'Containers alone do not make a workload scalable; poor state boundaries or slow startup often become the real bottleneck.',
    usage: 'This matters in microservices, worker fleets, autoscaling platforms, CI job runners, and cloud-native service design.',
    workflow: 'Identify what limits scale first, keep container startup and image pulls efficient, and confirm that runtime dependencies can absorb the increased parallelism.',
    exampleTitle: 'Scaling readiness',
    exampleCode: `Container scaling asks
-> is the service stateless?
-> how long does startup take?
-> what dependency saturates first?
-> is image pull time acceptable?`,
    relatedTopics: ['docker-image-optimization', 'docker-high-availability', 'docker-container-platform-design'],
  },
  {
    slug: 'docker-high-availability',
    title: 'High Availability',
    description: 'Learn how Docker-based workloads stay available through redundancy, health checks, and safe rollout patterns.',
    concept: 'High availability in Docker is about running multiple healthy instances, validating readiness accurately, and making sure images, registries, and storage dependencies do not create hidden single points of failure.',
    why: 'Containerizing an app does not make it highly available unless the supporting runtime model tolerates host, rollout, and dependency failure.',
    usage: 'This appears in microservices, internal APIs, stateful services, platform reliability reviews, and deployment architecture discussions.',
    workflow: 'Design redundancy across hosts or platforms, use meaningful health signals, protect rollouts with safe replacement patterns, and test recovery under realistic failure conditions.',
    exampleTitle: 'Availability review',
    exampleCode: `HA with containers means
-> more than one healthy instance
-> real readiness checks
-> safe rollout and rollback
-> no hidden single points of failure`,
    relatedTopics: ['docker-container-crashes', 'docker-scalability', 'docker-registry-management'],
  },
];

export const dockerExpandedTopics: Record<string, TopicContent> = Object.fromEntries(
  specs.map((spec) => [spec.slug, topic(spec)])
);
