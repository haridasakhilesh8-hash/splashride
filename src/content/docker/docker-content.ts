import type { TopicContent } from '../types';

const versions = ['Docker Engine 24+', 'Docker Desktop 4+', 'Docker Compose v2'];
const reviewed = 'June 2026';

function topic(input: Omit<TopicContent, 'applicableVersions' | 'lastReviewed'>): TopicContent {
  return {
    applicableVersions: versions,
    lastReviewed: reviewed,
    ...input,
  };
}

export const dockerOverview = topic({
  slug: 'docker-overview',
  title: 'Docker Overview',
  description: 'Understand Docker as the packaging and runtime foundation for consistent application delivery across laptops, CI, and production.',
  quickUnderstanding: 'Docker packages an application with its runtime dependencies into an image, then runs that image as an isolated container. The same image can run on a developer laptop, CI agent, test server, or production host.',
  whatIsIt: `Docker is a platform for building, shipping, and running applications in **containers**.

A container is not a full machine. It is an isolated process that has its own filesystem, environment variables, network view, and resource limits while sharing the host operating system kernel.

Docker gives teams a standard workflow:
- Define the runtime in a \`Dockerfile\`
- Build an immutable image
- Store the image in a registry
- Run containers from that image consistently everywhere`,
  whyWeNeedIt: `Modern applications depend on language runtimes, system packages, environment variables, certificates, ports, and startup commands. Without Docker, every environment must be manually aligned.

Docker reduces that drift by making the runtime part of the application artifact.

It helps with:
- **Consistency** between local, CI, staging, and production
- **Faster onboarding** because dependencies are encoded
- **Repeatable deployments** through versioned images
- **Isolation** between services on the same host
- **Portability** across many infrastructure platforms`,
  realWorldUsage: `In a real project, Docker usually appears in three places:

1. Developers run databases, queues, and local services with Docker Compose
2. CI pipelines build and scan application images
3. Production platforms deploy those images to ECS, Kubernetes, Nomad, Docker Swarm, or managed container services

A Spring Boot API might be built into \`company/orders-api:1.24.0\`, pushed to a private registry, scanned for vulnerabilities, and deployed by Kubernetes using the exact same image digest that passed automated tests.`,
  howItWorks: `The normal Docker flow is:

1. A \`Dockerfile\` describes the filesystem, dependencies, and command
2. \`docker build\` creates a layered image
3. The image is tagged with a name and version
4. The image is pushed to a registry such as Docker Hub, ECR, ACR, or GCR
5. \`docker run\` starts a container from that image
6. Docker connects storage, networking, environment variables, and resource limits

The important architectural idea: **images are immutable templates; containers are runtime instances**.`,
  example: {
    title: 'Containerising a Node API',
    description: 'A minimal application image that can run the same way in every environment.',
    code: [
      {
        label: 'Dockerfile',
        language: 'dockerfile',
        code: `FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000

CMD ["node", "server.js"]`,
      },
      {
        label: 'Build and run',
        language: 'bash',
        code: `docker build -t orders-api:1.0.0 .
docker run --rm -p 3000:3000 orders-api:1.0.0`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Docker the same as Kubernetes?',
      answer: 'No. Docker builds and runs containers. Kubernetes schedules and manages many containers across many machines. Docker can be used locally even when production uses Kubernetes.',
    },
    {
      question: 'Does a container include an operating system?',
      answer: 'It includes a user-space filesystem from a base image, but it shares the host kernel. That is why containers are lighter than virtual machines.',
    },
    {
      question: 'Should every application use Docker?',
      answer: 'Not always, but it is a strong default for services that need repeatable environments, CI/CD, or cloud deployment.',
    },
  ],
  productionIssues: [
    '**Image drift** - environments run different image tags because deployments are not pinned to immutable digests.',
    '**Large images** - images include build tools, caches, and unused packages, slowing pulls and increasing attack surface.',
    '**Hidden configuration** - values are baked into images instead of injected through environment-specific configuration.',
    '**Local-only assumptions** - containers work on a laptop but fail in production due to missing resource limits, health checks, or secrets.',
  ],
  bestPractices: [
    'Build one immutable image per application release',
    'Keep configuration outside the image',
    'Use small official base images where practical',
    'Scan images in CI before deployment',
    'Tag images with release versions and deploy by digest for critical systems',
    'Use Docker Compose for local multi-service development',
  ],
  architectNote: `Docker is most valuable when it becomes a delivery contract. The image is the thing that moved through tests, security checks, staging, and production.

Weak Docker adoption treats containers as fancy zip files. Strong adoption treats images as immutable release artifacts with ownership, scanning, provenance, and rollback strategy.`,
  faqs: [
    {
      question: 'Can Docker run frontend, backend, and database services?',
      answer: 'Yes. A single app image can run frontend or backend code, and Compose can start databases and supporting services for development.',
    },
    {
      question: 'Is Docker required for microservices?',
      answer: 'No, but it makes microservice environments far easier to build, test, ship, and operate consistently.',
    },
    {
      question: 'What should I learn first?',
      answer: 'Start with images, containers, Dockerfile basics, volumes, networking, and Compose. Those concepts explain most day-to-day Docker usage.',
    },
  ],
  keyTakeaways: [
    'Docker packages applications and dependencies into images',
    'Containers are runtime instances of images',
    'Docker reduces environment drift',
    'Images should be immutable release artifacts',
    'Configuration should be injected at runtime',
    'Docker is commonly used locally, in CI, and in production delivery pipelines',
  ],
  relatedTopics: ['docker-images', 'docker-dockerfile', 'docker-compose'],
});

export const containersVsVirtualMachines = topic({
  slug: 'docker-containers-vs-virtual-machines',
  title: 'Containers vs Virtual Machines',
  description: 'Compare containers and virtual machines from isolation, startup time, resource usage, operations, and production architecture perspectives.',
  quickUnderstanding: 'Virtual machines virtualize hardware and run a full guest operating system. Containers isolate processes while sharing the host kernel, making them lighter and faster to start.',
  whatIsIt: `Containers and virtual machines both isolate workloads, but they isolate at different layers.

| Area | Containers | Virtual Machines |
|---|---|---|
| Isolation layer | OS process/kernel features | Hardware virtualization |
| OS | Share host kernel | Full guest OS |
| Startup | Seconds or less | Tens of seconds or minutes |
| Size | Usually MBs to low GBs | Usually GBs |
| Best fit | App packaging and scaling | Strong isolation and OS diversity |`,
  whyWeNeedIt: `Teams need to choose the right isolation model for cost, speed, security, and operations.

Containers are excellent when you need many instances of services running efficiently. Virtual machines are excellent when you need stronger boundaries, full OS control, or different operating systems on the same physical hardware.`,
  realWorldUsage: `A common enterprise pattern uses both:

- Cloud VMs provide the compute nodes
- Containers run application services on those nodes
- Kubernetes, ECS, or another orchestrator manages container placement

For example, a bank may run Kubernetes worker nodes as hardened VMs. Application teams deploy containers, while platform teams manage VM images, node patching, and network policies.`,
  howItWorks: `A virtual machine runs through a hypervisor. Each VM has virtual CPU, memory, disk, network, and a guest OS.

A Docker container runs as a normal host process with isolation provided by Linux namespaces, cgroups, capabilities, and filesystem layers.

This is why containers are efficient: they avoid booting a full guest OS for every application instance.`,
  example: {
    title: 'Choosing the Isolation Model',
    description: 'A simple decision aid for real architecture discussions.',
    code: [
      {
        label: 'Decision matrix',
        language: 'text',
        code: `Use containers when:
- You deploy application services frequently
- You need fast scale-out
- Workloads can share the same host kernel
- You want image-based CI/CD

Use VMs when:
- You need full OS isolation
- You run different operating systems
- Compliance requires stronger workload boundaries
- You need kernel-level customization`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Are containers less secure than VMs?',
      answer: 'They have a smaller isolation boundary because they share the host kernel. With hardening, scanning, least privilege, and orchestration policies, containers can still be production-grade.',
    },
    {
      question: 'Can containers replace all VMs?',
      answer: 'No. Many platforms run containers on VMs. They solve different layers of the infrastructure stack.',
    },
    {
      question: 'Why do containers start faster?',
      answer: 'They start a process from an existing host kernel rather than booting a full guest operating system.',
    },
  ],
  productionIssues: [
    '**Overstated isolation** - treating containers like hard VM boundaries can expose shared-kernel risks.',
    '**No resource limits** - containers without CPU and memory limits can affect neighboring workloads.',
    '**Wrong workload fit** - stateful or privileged workloads are containerized without operational planning.',
  ],
  bestPractices: [
    'Use containers for application packaging and repeatable runtime environments',
    'Use VMs or stronger sandboxing where full isolation is required',
    'Always apply container resource limits in shared environments',
    'Harden the host because containers share its kernel',
    'Avoid privileged containers unless there is a documented platform need',
  ],
  architectNote: `The better question is not "containers or VMs?" It is "which boundary do we need at which layer?"

Most mature platforms use VMs for infrastructure isolation and containers for application delivery. That combination gives platform teams control while letting application teams ship quickly.`,
  faqs: [
    {
      question: 'Can a Linux container run on Windows or macOS?',
      answer: 'Docker Desktop runs a lightweight Linux VM behind the scenes for Linux containers on non-Linux hosts.',
    },
    {
      question: 'Do containers have their own IP address?',
      answer: 'They can have isolated network interfaces and addresses on Docker networks, but networking depends on the driver and platform.',
    },
    {
      question: 'Are containers always cheaper?',
      answer: 'Often they improve density, but cost also depends on orchestration, observability, security tooling, and operational maturity.',
    },
  ],
  keyTakeaways: [
    'VMs virtualize hardware; containers isolate processes',
    'Containers share the host kernel',
    'VMs provide stronger OS-level separation',
    'Many production platforms use containers on top of VMs',
    'Security depends on configuration, not only technology choice',
  ],
  relatedTopics: ['docker-overview', 'docker-architecture', 'docker-security'],
});

export const dockerArchitecture = topic({
  slug: 'docker-architecture',
  title: 'Docker Architecture',
  description: 'Learn how the Docker CLI, daemon, images, containers, registries, storage, and networking pieces fit together.',
  quickUnderstanding: 'Docker has a client-server architecture. The Docker CLI sends commands to the Docker daemon, which builds images, pulls from registries, creates containers, and manages networks and volumes.',
  whatIsIt: `Docker architecture is the set of components that build and run containers:

- **Docker CLI** - command-line client such as \`docker build\` and \`docker run\`
- **Docker daemon** - background service that manages Docker objects
- **Images** - immutable templates for containers
- **Containers** - running instances of images
- **Registries** - stores for image distribution
- **Networks** - communication layer between containers
- **Volumes** - persistent storage managed outside the container filesystem`,
  whyWeNeedIt: `Understanding Docker architecture helps you debug real issues faster.

When a pull fails, the registry path matters. When data disappears, the storage model matters. When services cannot talk to each other, Docker networking matters. When builds are slow, image layers and cache behavior matter.`,
  realWorldUsage: `In enterprise environments, developers may only see the CLI, but platform teams care about the daemon configuration, registry authentication, proxy settings, logging drivers, network drivers, storage drivers, and host hardening.

A CI agent might run Docker builds using BuildKit, authenticate to a private registry, push a signed image, and then hand the image digest to a deployment system.`,
  howItWorks: `A typical command flow:

1. You run \`docker run nginx\`
2. The CLI sends the request to the Docker daemon
3. The daemon checks whether the \`nginx\` image exists locally
4. If missing, it pulls the image from a registry
5. The daemon creates a writable container layer
6. Networking, mounts, environment variables, and resource limits are attached
7. The container process starts

Docker Engine uses lower-level container runtime components under the hood, but daily usage usually happens through the Docker CLI and daemon.`,
  example: {
    title: 'Inspecting Docker Objects',
    description: 'Commands that reveal how Docker sees images, containers, networks, and volumes.',
    code: [
      {
        label: 'CLI inspection',
        language: 'bash',
        code: `docker version
docker info
docker images
docker ps
docker network ls
docker volume ls
docker inspect orders-api`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is the Docker CLI the same as Docker Engine?',
      answer: 'No. The CLI is the client. Docker Engine includes the daemon and runtime pieces that actually manage images and containers.',
    },
    {
      question: 'What is a registry?',
      answer: 'A registry is a server that stores and distributes images. Docker Hub is public by default, while enterprises often use private registries.',
    },
    {
      question: 'Why does Docker need a daemon?',
      answer: 'The daemon owns privileged host operations such as creating namespaces, mounting layers, configuring networks, and starting containers.',
    },
  ],
  productionIssues: [
    '**Daemon unavailable** - builds and deployments fail because the Docker daemon is not running or reachable.',
    '**Registry auth failures** - CI cannot pull base images or push release images due to expired credentials.',
    '**Storage pressure** - hosts fill up with unused layers, stopped containers, and old build cache.',
    '**Network conflicts** - Docker bridge subnets overlap with corporate or cloud network ranges.',
  ],
  bestPractices: [
    'Monitor Docker host disk usage and prune safely through policy',
    'Use private registries for enterprise application images',
    'Keep daemon configuration under platform ownership',
    'Avoid broad Docker socket access in CI unless tightly controlled',
    'Document registry naming and tagging conventions',
  ],
  architectNote: `Docker is simple at the command line and layered underneath. Senior engineers debug by identifying which layer is failing: client, daemon, registry, image, container process, network, volume, or host.

That mental model prevents random command-chasing when production incidents happen.`,
  faqs: [
    {
      question: 'Can Docker run without internet?',
      answer: 'Yes, if required images are already local or available in an internal registry.',
    },
    {
      question: 'What is Docker Desktop?',
      answer: 'Docker Desktop packages Docker Engine, CLI, VM support, UI tools, and developer integrations for local machines.',
    },
    {
      question: 'What is BuildKit?',
      answer: 'BuildKit is Docker’s modern build backend with better caching, parallelism, secrets support, and multi-platform build features.',
    },
  ],
  keyTakeaways: [
    'Docker uses a client-server architecture',
    'The daemon manages images, containers, networks, and volumes',
    'Registries distribute images',
    'Architecture knowledge makes troubleshooting faster',
    'Enterprise Docker requires registry, host, storage, and security governance',
  ],
  relatedTopics: ['docker-overview', 'docker-images', 'docker-networking'],
});

export const dockerImages = topic({
  slug: 'docker-images',
  title: 'Docker Images',
  description: 'Learn Docker images as layered, immutable artifacts that define the filesystem and startup defaults for containers.',
  quickUnderstanding: 'A Docker image is an immutable, layered template used to create containers. It contains application code, runtime dependencies, filesystem content, metadata, and default startup instructions.',
  whatIsIt: `A Docker image is a versioned package for a containerized application.

Images are built from layers. Each instruction in a Dockerfile usually creates a layer. Docker can reuse unchanged layers from cache, which makes builds and pulls faster.

Images are identified by:
- Repository name, such as \`orders-api\`
- Tag, such as \`1.4.2\`
- Digest, a content-addressed immutable identifier`,
  whyWeNeedIt: `Images make deployments repeatable. Instead of reinstalling runtime dependencies on every server, you build the image once and run it wherever Docker-compatible infrastructure is available.

They are the artifact that CI validates and production deploys.`,
  realWorldUsage: `A production image lifecycle often looks like:

1. Developer merges code
2. CI builds \`registry.company.com/orders-api:1.24.0\`
3. CI runs tests and image scans
4. CI pushes the image
5. Deployment uses the image digest
6. Rollback points to the previous digest

This gives release teams traceability from source commit to deployed container.`,
  howItWorks: `Docker images use a layered filesystem model.

When a container starts, Docker mounts the image layers as read-only and adds a thin writable container layer on top. Changes made by the running container go into that writable layer unless they are written to a mounted volume.

If the container is removed, the writable layer is removed too. The image remains.`,
  example: {
    title: 'Image Tags and Digests',
    description: 'Build, tag, inspect, and run an image.',
    code: [
      {
        label: 'Image workflow',
        language: 'bash',
        code: `docker build -t registry.company.com/orders-api:1.24.0 .
docker images
docker inspect registry.company.com/orders-api:1.24.0
docker push registry.company.com/orders-api:1.24.0

# Production systems often deploy by digest
docker pull registry.company.com/orders-api@sha256:...`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is an image running?',
      answer: 'No. An image is a template. A container is a running or stopped instance created from that image.',
    },
    {
      question: 'Are tags immutable?',
      answer: 'Technically no. A tag can be moved to another image. Digests are immutable and safer for production pinning.',
    },
    {
      question: 'Why are images layered?',
      answer: 'Layers improve caching, sharing, and transfer efficiency. Common base layers do not need to be downloaded repeatedly.',
    },
  ],
  productionIssues: [
    '**Mutable latest tag** - deployments use `latest`, making rollbacks and audit trails unreliable.',
    '**Secrets in layers** - credentials copied during build remain recoverable from image history.',
    '**Unpatched base image** - old base layers include known vulnerabilities.',
    '**Bloated layers** - package caches and build artifacts increase pull time and attack surface.',
  ],
  bestPractices: [
    'Use meaningful version tags and deploy critical services by digest',
    'Keep images small and focused on one application process',
    'Do not bake secrets into images',
    'Rebuild images regularly to pick up patched base layers',
    'Use `.dockerignore` to avoid copying unnecessary files',
    'Scan images before pushing or deploying',
  ],
  architectNote: `The image is the unit of release. Once teams understand that, deployment conversations become cleaner: what source commit produced this image, which tests approved it, which vulnerabilities were accepted, and which digest is running?

That traceability is more important than the Docker commands themselves.`,
  faqs: [
    {
      question: 'What is a base image?',
      answer: 'A base image is the starting filesystem and runtime layer, such as `node:22-alpine`, `eclipse-temurin:21-jre`, or `nginx:alpine`.',
    },
    {
      question: 'Can one image run multiple containers?',
      answer: 'Yes. You can create many containers from the same image, each with separate runtime state.',
    },
    {
      question: 'What is `.dockerignore`?',
      answer: 'It excludes files from the build context, reducing build time and avoiding accidental inclusion of local files or secrets.',
    },
  ],
  keyTakeaways: [
    'Images are immutable templates',
    'Containers run from images',
    'Layers enable caching and efficient pulls',
    'Tags are convenient but mutable',
    'Digests are best for strict production traceability',
  ],
  relatedTopics: ['docker-dockerfile', 'docker-hub', 'docker-multi-stage-builds'],
});

export const dockerHub = topic({
  slug: 'docker-hub',
  title: 'Docker Hub',
  description: 'Understand Docker Hub as a public image registry, including official images, tags, pulls, publishing, and enterprise cautions.',
  quickUnderstanding: 'Docker Hub is a hosted registry where Docker images can be discovered, pulled, and published. It is useful for official base images and public distribution, but enterprises often use private registries for application images.',
  whatIsIt: `Docker Hub is Docker's hosted image registry.

It provides:
- Public repositories
- Private repositories depending on account and plan
- Official images for common runtimes and databases
- Image tags and metadata
- Authentication for pushing images
- Automated ecosystem integrations`,
  whyWeNeedIt: `Most projects start from base images hosted on Docker Hub: Node, Nginx, Redis, Postgres, Java runtimes, Python, and many others.

Docker Hub avoids every team having to build common runtime images from scratch. It also provides a distribution channel for open-source images.`,
  realWorldUsage: `A typical enterprise setup uses Docker Hub carefully:

- Approved base images are mirrored into an internal registry
- Application images are pushed to a private registry
- CI authenticates to avoid anonymous pull limits
- Security teams define which public publishers are trusted

This balances developer convenience with supply-chain control.`,
  howItWorks: `When you run \`docker pull node:22-alpine\`, Docker resolves the image name against Docker Hub by default.

Image names follow this pattern:

\`[registry-host]/[namespace]/[repository]:[tag]\`

If no registry host is provided, Docker commonly defaults to Docker Hub. If no tag is provided, Docker commonly uses \`latest\`, which is convenient but risky for reproducible builds.`,
  example: {
    title: 'Pulling and Publishing Images',
    description: 'Common Docker Hub image commands.',
    code: [
      {
        label: 'Docker Hub commands',
        language: 'bash',
        code: `docker pull nginx:alpine
docker tag orders-api:1.0.0 myteam/orders-api:1.0.0
docker login
docker push myteam/orders-api:1.0.0`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Docker Hub required to use Docker?',
      answer: 'No. Docker can use any compatible registry, including private registries such as ECR, ACR, GCR, Harbor, Artifactory, or GitHub Container Registry.',
    },
    {
      question: 'Are official images always safe?',
      answer: 'They are generally better maintained than random images, but teams should still pin versions, scan images, and review base-image choices.',
    },
    {
      question: 'What does `latest` mean?',
      answer: 'It is just a tag name. It does not guarantee newest, stable, or safe. Avoid relying on it for production.',
    },
  ],
  productionIssues: [
    '**Anonymous pull limits** - CI builds fail because unauthenticated pulls hit rate limits.',
    '**Untrusted publishers** - teams pull images from unknown sources without review.',
    '**Tag movement** - public tags change and produce different builds over time.',
    '**Public leakage** - application images are accidentally pushed to public repositories.',
  ],
  bestPractices: [
    'Authenticate CI pulls from Docker Hub',
    'Use official or verified images where possible',
    'Pin base image versions instead of relying on `latest`',
    'Mirror approved base images into an internal registry for enterprise builds',
    'Keep application images in private registries',
    'Scan all images regardless of source',
  ],
  architectNote: `Docker Hub is a convenience, not a complete supply-chain strategy.

For serious platforms, the mature pattern is controlled ingestion: approve external images, mirror them internally, scan them, and build applications from known sources. That turns public image usage from a hidden risk into a governed dependency flow.`,
  faqs: [
    {
      question: 'Can I host private images on Docker Hub?',
      answer: 'Yes, depending on account features and limits. Many companies still prefer cloud or self-hosted private registries.',
    },
    {
      question: 'What is an official image?',
      answer: 'It is a curated Docker Hub image maintained through Docker’s official image program for common software.',
    },
    {
      question: 'Should production pull directly from Docker Hub?',
      answer: 'For enterprise systems, it is usually better to pull from an internal registry to improve reliability, control, and auditability.',
    },
  ],
  keyTakeaways: [
    'Docker Hub is the default public Docker image registry',
    'Official images are common base-image sources',
    'Production should avoid unpinned or untrusted images',
    'Enterprises often mirror approved images internally',
    'Application images should usually live in private registries',
  ],
  relatedTopics: ['docker-images', 'docker-security', 'docker-cicd-integration'],
});

export const containerLifecycle = topic({
  slug: 'docker-container-lifecycle',
  title: 'Container Lifecycle',
  description: 'Understand how containers are created, started, stopped, restarted, inspected, logged, and removed in daily Docker operations.',
  quickUnderstanding: 'A container moves through states such as created, running, paused, stopped, and removed. Images are reusable templates; containers are runtime instances with their own process and writable layer.',
  whatIsIt: `The container lifecycle describes what happens from container creation to removal.

Common lifecycle operations:
- \`create\` - prepare a container without starting it
- \`start\` - run the configured process
- \`stop\` - ask the process to terminate gracefully
- \`kill\` - force termination
- \`restart\` - stop and start again
- \`pause\` - suspend processes
- \`rm\` - remove the stopped container`,
  whyWeNeedIt: `Production incidents often involve lifecycle questions:

- Did the container exit?
- What was the exit code?
- Was it killed by memory limits?
- Did it restart repeatedly?
- Are logs available?
- Is the data inside a volume or only inside the removed container layer?

Understanding lifecycle behavior prevents accidental data loss and speeds up debugging.`,
  realWorldUsage: `In a real service, a container should be disposable. If it crashes, the platform starts another one from the same image.

Local Docker users manage lifecycle manually. Production platforms manage lifecycle through orchestrators, health checks, restart policies, rolling deployments, and autoscaling rules.`,
  howItWorks: `When Docker starts a container, it launches the image's configured command as PID 1 inside the container namespace.

If that main process exits, the container stops. Background processes do not keep the container alive if PID 1 has ended.

Docker records logs, exit status, filesystem changes, networking metadata, and mount information until the container is removed.`,
  example: {
    title: 'Lifecycle Commands',
    description: 'Commands used constantly during local development and troubleshooting.',
    code: [
      {
        label: 'Container lifecycle',
        language: 'bash',
        code: `docker run -d --name web -p 8080:80 nginx:alpine
docker ps
docker logs web
docker exec -it web sh
docker stop web
docker start web
docker inspect web
docker rm -f web`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why does my container exit immediately?',
      answer: 'The main process finished or failed. A container stays running only while its primary process is running.',
    },
    {
      question: 'Does stopping a container delete it?',
      answer: 'No. Stopping keeps the container metadata and writable layer. Removing deletes the container.',
    },
    {
      question: 'Should I SSH into containers?',
      answer: 'Normally no. Use `docker exec` for debugging. Production containers should be replaced by new images, not manually modified.',
    },
  ],
  productionIssues: [
    '**Restart loops** - containers repeatedly crash due to bad configuration, missing dependencies, or failed startup checks.',
    '**PID 1 signal handling** - applications ignore termination signals and get killed during deployments.',
    '**Data in writable layer** - important files disappear when containers are removed.',
    '**No health checks** - a process is running but the application is not actually ready or healthy.',
  ],
  bestPractices: [
    'Make containers disposable and rebuildable',
    'Store persistent data in volumes or external services',
    'Ensure the main process handles SIGTERM gracefully',
    'Use logs on stdout and stderr',
    'Add health checks for long-running services',
    'Avoid manual changes inside running containers',
  ],
  architectNote: `A container is not a pet server. Treating it like one creates fragile systems.

The mature model is replacement: build a new image, start new containers, drain old containers, and remove them. That habit aligns Docker with modern deployment automation.`,
  faqs: [
    {
      question: 'What is the difference between `docker stop` and `docker kill`?',
      answer: '`stop` sends a graceful termination signal first. `kill` forcefully terminates the container process.',
    },
    {
      question: 'Where should application logs go?',
      answer: 'Write logs to stdout and stderr so Docker and the platform logging system can collect them.',
    },
    {
      question: 'Can I restart a removed container?',
      answer: 'No. Once removed, create a new container from the image.',
    },
  ],
  keyTakeaways: [
    'Containers are runtime instances of images',
    'The container runs while its main process runs',
    'Stopped containers still exist until removed',
    'Persistent data belongs in volumes or external stores',
    'Production systems should replace containers, not patch them manually',
  ],
  relatedTopics: ['docker-images', 'docker-volumes', 'docker-security'],
});

export const dockerfile = topic({
  slug: 'docker-dockerfile',
  title: 'Dockerfile',
  description: 'Learn how Dockerfiles define container images, including base images, layers, copy steps, commands, ports, and build hygiene.',
  quickUnderstanding: 'A Dockerfile is a text file containing instructions to build a Docker image. It defines the base runtime, files, dependencies, metadata, exposed ports, and default command.',
  whatIsIt: `A Dockerfile is the build recipe for a Docker image.

Common instructions:
- \`FROM\` chooses the base image
- \`WORKDIR\` sets the working directory
- \`COPY\` adds files from the build context
- \`RUN\` executes build-time commands
- \`ENV\` defines environment defaults
- \`EXPOSE\` documents the port
- \`CMD\` defines the default runtime command`,
  whyWeNeedIt: `The Dockerfile makes runtime setup repeatable and reviewable.

Instead of installing packages manually on a server, the team can version the runtime alongside application code. Code reviewers can see exactly what goes into the image.`,
  realWorldUsage: `A production Dockerfile usually evolves beyond the first tutorial version.

Teams add \`.dockerignore\`, non-root users, dependency caching, multi-stage builds, health checks, pinned base images, and minimal runtime images. CI then uses the Dockerfile as the single build contract.`,
  howItWorks: `Docker sends a build context to the builder, reads the Dockerfile instructions, and creates image layers.

Layer order matters. Put rarely changing dependency files before frequently changing source files so Docker can reuse cached layers.

For example, copy \`package.json\` first, install dependencies, then copy source code. A source-only change should not reinstall all dependencies.`,
  example: {
    title: 'Production-Friendly Dockerfile',
    description: 'A Node service Dockerfile with cache-aware ordering and a non-root runtime user.',
    code: [
      {
        label: 'Dockerfile',
        language: 'dockerfile',
        code: `FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

USER node
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        label: '.dockerignore',
        language: 'text',
        code: `node_modules
npm-debug.log
.git
.env
dist
coverage`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between `RUN` and `CMD`?',
      answer: '`RUN` executes during image build and creates a layer. `CMD` defines what runs when a container starts.',
    },
    {
      question: 'Does `EXPOSE` publish the port?',
      answer: 'No. `EXPOSE` documents the intended port. You still publish ports with `-p` or platform configuration.',
    },
    {
      question: 'Why does Docker rebuild too much?',
      answer: 'Layer cache was invalidated. Reorder instructions so stable dependency files are copied before frequently changing source files.',
    },
  ],
  productionIssues: [
    '**Secrets copied into image** - `.env`, keys, or credentials enter the build context and image layers.',
    '**Root runtime** - containers run as root even when the app does not need elevated privileges.',
    '**Poor cache order** - every code change reinstalls dependencies and slows CI.',
    '**Unpinned base image** - builds change unexpectedly when base tags move.',
  ],
  bestPractices: [
    'Use `.dockerignore` in every project',
    'Order layers for build cache efficiency',
    'Run applications as a non-root user',
    'Keep runtime images small',
    'Avoid secrets in `ARG`, `ENV`, or copied files',
    'Prefer exec-form `CMD` for signal handling',
  ],
  architectNote: `A Dockerfile is application infrastructure code. Treat it with the same review discipline as production code.

The best Dockerfiles are boring: predictable base image, clear dependency installation, no secrets, non-root runtime, small final image, and fast rebuilds.`,
  faqs: [
    {
      question: 'Should I use Alpine images?',
      answer: 'Alpine is small, but not always best. Some libraries expect glibc behavior. Choose based on compatibility, security posture, and operational familiarity.',
    },
    {
      question: 'What is build context?',
      answer: 'The files Docker can access during build. `.dockerignore` controls what is excluded from that context.',
    },
    {
      question: 'Can a Dockerfile have multiple `FROM` lines?',
      answer: 'Yes. That is how multi-stage builds work.',
    },
  ],
  keyTakeaways: [
    'Dockerfiles define how images are built',
    '`RUN` is build time; `CMD` is runtime',
    'Layer ordering affects build speed',
    'Use `.dockerignore` to protect and speed up builds',
    'Production images should avoid root and secrets',
  ],
  relatedTopics: ['docker-images', 'docker-multi-stage-builds', 'docker-security'],
});

export const multiStageBuilds = topic({
  slug: 'docker-multi-stage-builds',
  title: 'Multi-Stage Builds',
  description: 'Use Docker multi-stage builds to compile applications in one stage and ship a smaller, cleaner runtime image.',
  quickUnderstanding: 'A multi-stage build uses multiple `FROM` stages. Build tools and source files stay in the builder stage, while only the final compiled artifact is copied into the runtime stage.',
  whatIsIt: `Multi-stage builds separate **build-time dependencies** from **runtime dependencies**.

The first stage may include compilers, package managers, test tooling, and source code. The final stage contains only what is needed to run the app.

This creates smaller, safer, faster-to-pull images.`,
  whyWeNeedIt: `Without multi-stage builds, production images often contain:

- Source code that is not needed at runtime
- Compilers and build tools
- Package manager caches
- Test frameworks
- Dev dependencies

That increases image size and security exposure.`,
  realWorldUsage: `Multi-stage builds are standard for Java, Go, Node, frontend static sites, and many compiled services.

A React app might build static assets in a Node stage and serve only the \`dist\` folder from Nginx. A Spring Boot app might build with Maven in one stage and run the final jar on a JRE image.`,
  howItWorks: `Each \`FROM\` starts a new stage. You can name stages with \`AS\`.

The final stage uses \`COPY --from=<stage>\` to pull selected files from an earlier stage.

Only the final stage becomes the image unless you explicitly target another stage.`,
  example: {
    title: 'Build React, Serve with Nginx',
    description: 'The Node build toolchain stays out of the production runtime image.',
    code: [
      {
        label: 'Dockerfile',
        language: 'dockerfile',
        code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do all stages ship to production?',
      answer: 'No. By default, only the final stage becomes the resulting image.',
    },
    {
      question: 'Can I stop at an earlier stage?',
      answer: 'Yes. `docker build --target build` can build a specific stage for debugging or CI steps.',
    },
    {
      question: 'Is multi-stage only for compiled languages?',
      answer: 'No. It is useful whenever build-time tools are not needed in the runtime image.',
    },
  ],
  productionIssues: [
    '**Artifacts missing** - final stage copies the wrong output path and the app fails at startup.',
    '**Runtime dependencies omitted** - native libraries required by the built artifact are absent from the final image.',
    '**Cache inefficiency** - build stage copies all source before installing dependencies.',
    '**Secrets in builder stage** - build secrets are handled carelessly and may leak into layers or logs.',
  ],
  bestPractices: [
    'Name build stages for readability',
    'Copy only required artifacts into the final image',
    'Keep dependency installation cache-friendly',
    'Use BuildKit secrets for private package access',
    'Test the final image, not only the build stage',
    'Choose a runtime base image that matches application needs',
  ],
  architectNote: `Multi-stage builds are one of the easiest ways to improve Docker maturity. They reduce image size, attack surface, and deployment time without changing application code.

For enterprise standards, make multi-stage builds the default for compiled or bundled applications.`,
  faqs: [
    {
      question: 'Can multi-stage builds improve security?',
      answer: 'Yes. They keep build tools and unnecessary files out of the final runtime image, reducing attack surface.',
    },
    {
      question: 'Can I have more than two stages?',
      answer: 'Yes. Teams often use separate stages for dependencies, testing, building, and runtime.',
    },
    {
      question: 'Does the final image know about previous stages?',
      answer: 'Only through files explicitly copied from those stages.',
    },
  ],
  keyTakeaways: [
    'Multi-stage builds separate build and runtime concerns',
    'Only the final stage becomes the output image by default',
    'They reduce image size and attack surface',
    'Use `COPY --from` to transfer selected artifacts',
    'Always test the final runtime image',
  ],
  relatedTopics: ['docker-dockerfile', 'docker-images', 'docker-security'],
});

export const dockerVolumes = topic({
  slug: 'docker-volumes',
  title: 'Volumes',
  description: 'Understand Docker volumes and bind mounts for persistent data, local development, backups, and production storage boundaries.',
  quickUnderstanding: 'Containers are disposable, so data written inside the container layer disappears when the container is removed. Volumes store data outside the container lifecycle.',
  whatIsIt: `Docker volumes are persistent storage managed by Docker.

There are two common mount styles:
- **Named volumes** - Docker-managed storage, good for databases and persistent local data
- **Bind mounts** - host paths mounted into containers, common for local development

Volumes decouple data from containers.`,
  whyWeNeedIt: `Containers should be replaceable. Databases, uploads, queues, and generated files often need data to survive container replacement.

Volumes solve that local persistence problem and make development workflows smoother.`,
  realWorldUsage: `Developers commonly use volumes for local Postgres, MySQL, Redis, Elasticsearch, and uploaded test files.

In production, teams often prefer managed databases and object storage instead of relying on single-host Docker volumes. If volumes are used in production, backup, scheduling, and host failure behavior must be designed explicitly.`,
  howItWorks: `When a volume is mounted into a container path, writes to that path go to the volume rather than the container writable layer.

Example:

\`-v postgres_data:/var/lib/postgresql/data\`

The container can be removed and recreated while the named volume remains.`,
  example: {
    title: 'Persisting Database Data',
    description: 'A named volume keeps Postgres data after the container is recreated.',
    code: [
      {
        label: 'Named volume',
        language: 'bash',
        code: `docker volume create postgres_data

docker run -d --name postgres \\
  -e POSTGRES_PASSWORD=secret \\
  -v postgres_data:/var/lib/postgresql/data \\
  -p 5432:5432 \\
  postgres:16`,
      },
      {
        label: 'Compose volume',
        language: 'yaml',
        code: `services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is a volume inside the image?',
      answer: 'No. A volume is mounted at runtime and exists outside the image.',
    },
    {
      question: 'What is the difference between a volume and a bind mount?',
      answer: 'A named volume is managed by Docker. A bind mount maps a specific host path into the container.',
    },
    {
      question: 'Why did my data disappear?',
      answer: 'It was probably written to the container writable layer instead of a mounted volume or external storage.',
    },
  ],
  productionIssues: [
    '**No backups** - teams persist data in volumes but do not back it up.',
    '**Host coupling** - data is tied to one machine and cannot move during failover.',
    '**Permission mismatch** - container users cannot read or write mounted files.',
    '**Bind mount surprises** - host directory contents hide files that were present in the image path.',
  ],
  bestPractices: [
    'Use named volumes for local persistent service data',
    'Use bind mounts mainly for local development workflows',
    'Prefer managed databases or platform storage for production state',
    'Document backup and restore procedures for persistent volumes',
    'Run containers with predictable user IDs when mounting host files',
    'Do not store secrets in casual host-mounted folders',
  ],
  architectNote: `Docker makes containers disposable, but it does not make state disappear as an architectural concern.

For production, ask where state lives, how it is backed up, who owns restore testing, and what happens when the host dies. Volumes are a mechanism, not a data strategy.`,
  faqs: [
    {
      question: 'Do volumes get deleted with containers?',
      answer: 'Named volumes normally remain after containers are removed unless explicitly deleted.',
    },
    {
      question: 'Can multiple containers share a volume?',
      answer: 'Yes, but concurrent writes must be safe for the application and storage driver.',
    },
    {
      question: 'Where are Docker volumes stored?',
      answer: 'Docker stores named volumes in its managed data area on the host. The exact path depends on the platform.',
    },
  ],
  keyTakeaways: [
    'Container writable layers are disposable',
    'Volumes persist data outside container lifecycle',
    'Named volumes are Docker-managed',
    'Bind mounts map host paths',
    'Production storage needs backup and failover planning',
  ],
  relatedTopics: ['docker-container-lifecycle', 'docker-compose', 'docker-enterprise-deployment-patterns'],
});

export const dockerNetworking = topic({
  slug: 'docker-networking',
  title: 'Networking',
  description: 'Learn Docker networking concepts including bridge networks, port publishing, service discovery, DNS, and common connectivity issues.',
  quickUnderstanding: 'Docker networking controls how containers communicate with each other, the host, and the outside world. Containers on the same user-defined bridge network can usually reach each other by service name.',
  whatIsIt: `Docker networking provides isolated networks for containers.

Common concepts:
- **Bridge network** - default local container network
- **User-defined bridge** - better local service discovery
- **Port publishing** - maps host ports to container ports
- **DNS** - containers can resolve names on user-defined networks
- **Host network** - container shares host networking, used selectively`,
  whyWeNeedIt: `Applications rarely run alone. APIs call databases, frontends call APIs, workers call queues, and monitoring tools scrape metrics.

Docker networking lets those services communicate without hardcoding host-specific IP addresses.`,
  realWorldUsage: `In local development, Compose creates a project network automatically. Services can call each other by service name:

- \`api\` connects to \`postgres:5432\`
- \`frontend\` connects to \`api:3000\`
- Only frontend or API ports are published to the host

In production, container networking is usually handled by an orchestrator or cloud platform.`,
  howItWorks: `A container has internal ports. Publishing maps a host port to a container port:

\`-p 8080:80\` means host port \`8080\` forwards to container port \`80\`.

Containers on the same user-defined network can communicate directly using container or service names. Published ports are mainly for host-to-container or external access.`,
  example: {
    title: 'API and Database Network',
    description: 'A user-defined network lets the API reach Postgres by container name.',
    code: [
      {
        label: 'Docker network',
        language: 'bash',
        code: `docker network create app-net

docker run -d --name db --network app-net \\
  -e POSTGRES_PASSWORD=secret postgres:16

docker run -d --name api --network app-net \\
  -e DATABASE_URL=postgres://postgres:secret@db:5432/postgres \\
  -p 3000:3000 orders-api:1.0.0`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why cannot my host reach the container port?',
      answer: 'The port may not be published. Container ports are internal unless mapped with `-p` or Compose `ports`.',
    },
    {
      question: 'Should containers use `localhost` to reach each other?',
      answer: 'No. Inside a container, `localhost` usually means that same container. Use service names on a shared network.',
    },
    {
      question: 'What is the difference between `ports` and `expose` in Compose?',
      answer: '`ports` publishes to the host. `expose` documents or exposes internally to linked services without host publishing.',
    },
  ],
  productionIssues: [
    '**Port collisions** - multiple containers try to publish the same host port.',
    '**Localhost mistakes** - services inside containers try to call dependencies on `localhost`.',
    '**Network overlap** - Docker subnet ranges conflict with VPN or cloud network ranges.',
    '**Overexposure** - internal services publish ports unnecessarily to the host or internet.',
  ],
  bestPractices: [
    'Use user-defined networks for multi-container local apps',
    'Communicate between containers by service name',
    'Publish only ports that external clients need',
    'Avoid hardcoded container IP addresses',
    'Document required ports and network assumptions',
    'Plan Docker subnet ranges in corporate VPN environments',
  ],
  architectNote: `Most Docker networking bugs are naming bugs. Developers forget which perspective they are in: host, container, another container, or external client.

Debug by asking: where does this request originate, what name is it resolving, and which port is visible from that network boundary?`,
  faqs: [
    {
      question: 'Can containers on different networks talk?',
      answer: 'Not by default. A container must share a network or traffic must be routed through published ports or another configured path.',
    },
    {
      question: 'What does `-p 8080:80` mean?',
      answer: 'Requests to host port 8080 are forwarded to port 80 inside the container.',
    },
    {
      question: 'Does Docker Compose create a network?',
      answer: 'Yes. Compose creates a default project network unless configured otherwise.',
    },
  ],
  keyTakeaways: [
    'Docker networks isolate and connect containers',
    'Published ports expose containers to the host',
    'Containers should use service names, not hardcoded IPs',
    '`localhost` inside a container means that container',
    'Only publish what must be externally reachable',
  ],
  relatedTopics: ['docker-compose', 'docker-architecture', 'docker-security'],
});

export const dockerCompose = topic({
  slug: 'docker-compose',
  title: 'Docker Compose',
  description: 'Use Docker Compose to define and run multi-container local environments with services, networks, volumes, and environment configuration.',
  quickUnderstanding: 'Docker Compose lets you describe multiple services in a YAML file and start them together. It is the standard way to run local stacks such as API + database + cache + worker.',
  whatIsIt: `Docker Compose is a tool for defining multi-container applications.

A \`compose.yaml\` can define:
- Services
- Images or build contexts
- Ports
- Environment variables
- Volumes
- Networks
- Health checks
- Dependencies between services`,
  whyWeNeedIt: `Real applications usually need more than one process. Manually starting an API, database, Redis, mail server, and worker with long \`docker run\` commands becomes painful.

Compose turns that environment into versioned configuration that the whole team can run.`,
  realWorldUsage: `A backend team might commit a Compose file that starts:

- \`api\` built from the local Dockerfile
- \`postgres\` with a named volume
- \`redis\` for caching
- \`mailhog\` for local email testing

New developers run \`docker compose up\` and get the same baseline environment.`,
  howItWorks: `Compose reads the YAML file, creates a project network, creates declared volumes, builds or pulls images, and starts services.

Services can reach each other by service name on the Compose network. The service name becomes the DNS name, such as \`db\` or \`redis\`.`,
  example: {
    title: 'API, Postgres, and Redis',
    description: 'A practical Compose setup for local backend development.',
    code: [
      {
        label: 'compose.yaml',
        language: 'yaml',
        code: `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/orders
      REDIS_URL: redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: orders
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  postgres_data:`,
      },
      {
        label: 'Commands',
        language: 'bash',
        code: `docker compose up --build
docker compose ps
docker compose logs -f api
docker compose down`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Compose only for local development?',
      answer: 'It is strongest for local development and simple environments. Larger production systems usually use orchestrators or managed platforms.',
    },
    {
      question: 'Does `depends_on` mean the database is ready?',
      answer: 'Basic `depends_on` controls startup order, not application readiness. Use health checks and retry logic.',
    },
    {
      question: 'Should I commit Compose files?',
      answer: 'Yes for shared development environments. Keep secrets out and use override files or environment variables for machine-specific values.',
    },
  ],
  productionIssues: [
    '**Startup race conditions** - API starts before database is ready.',
    '**Secrets in YAML** - passwords and tokens are committed directly into Compose files.',
    '**Environment drift** - local Compose differs too much from production assumptions.',
    '**Unbounded resources** - local services consume too much CPU, memory, or disk.',
  ],
  bestPractices: [
    'Commit a clear `compose.yaml` for local development',
    'Use named volumes for local database persistence',
    'Use environment files carefully and do not commit real secrets',
    'Add health checks for dependent services',
    'Keep service names stable because they become DNS names',
    'Use `docker compose down -v` only when intentionally deleting volumes',
  ],
  architectNote: `Compose is a team productivity multiplier. Its job is not to perfectly reproduce production; its job is to make the common development path boring and consistent.

The right Compose file removes onboarding friction without pretending to be a full production platform.`,
  faqs: [
    {
      question: 'What is the difference between `docker-compose` and `docker compose`?',
      answer: '`docker compose` is the modern Docker CLI plugin form. Older projects may still use the standalone `docker-compose` command.',
    },
    {
      question: 'Can Compose build images?',
      answer: 'Yes. Use `build: .` or a build configuration for a service.',
    },
    {
      question: 'Can services scale in Compose?',
      answer: 'Compose can run multiple replicas for some local scenarios, but production-grade scaling is usually handled by orchestrators.',
    },
  ],
  keyTakeaways: [
    'Compose defines multi-container applications in YAML',
    'It is excellent for local development environments',
    'Services communicate by service name',
    'Volumes and networks are created from the Compose file',
    'Health checks and retry logic matter for dependencies',
  ],
  relatedTopics: ['docker-networking', 'docker-volumes', 'docker-container-lifecycle'],
});

export const dockerSecurity = topic({
  slug: 'docker-security',
  title: 'Security',
  description: 'Understand Docker security practices across images, runtime privileges, secrets, supply chain, scanning, and host hardening.',
  quickUnderstanding: 'Docker security is about reducing risk in images, containers, registries, hosts, and CI/CD. The big ideas are least privilege, trusted images, no baked secrets, vulnerability scanning, and controlled runtime capabilities.',
  whatIsIt: `Docker security spans several layers:

- **Image security** - trusted base images, scanning, patching
- **Build security** - no secrets in layers, controlled dependencies
- **Runtime security** - non-root user, limited capabilities, read-only filesystems where possible
- **Registry security** - authentication, access control, provenance
- **Host security** - patched kernel, daemon protection, socket control`,
  whyWeNeedIt: `Containers share the host kernel. A weak container configuration can expose the host, neighboring workloads, secrets, or internal networks.

Security needs to be built into the Docker workflow rather than added after deployment.`,
  realWorldUsage: `A production-grade pipeline usually:

1. Builds from approved base images
2. Runs dependency and image vulnerability scans
3. Rejects critical vulnerabilities based on policy
4. Signs or attests images
5. Pushes to a private registry
6. Deploys with non-root users and restricted capabilities
7. Monitors runtime behavior`,
  howItWorks: `Docker uses Linux security primitives such as namespaces, cgroups, capabilities, seccomp, and filesystem permissions.

By default, containers get isolation, but not all risk is removed. Runtime flags and platform policy decide how much privilege the container has.

Dangerous examples include mounting the Docker socket, running privileged containers, or giving broad host filesystem access.`,
  example: {
    title: 'Safer Runtime Defaults',
    description: 'A container run command that reduces common privileges.',
    code: [
      {
        label: 'Runtime hardening',
        language: 'bash',
        code: `docker run --rm \\
  --user 10001:10001 \\
  --read-only \\
  --cap-drop ALL \\
  --security-opt no-new-privileges \\
  -p 3000:3000 \\
  orders-api:1.0.0`,
      },
      {
        label: 'Dockerfile user',
        language: 'dockerfile',
        code: `RUN addgroup -S app && adduser -S app -G app
USER app
CMD ["node", "server.js"]`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is a container secure by default?',
      answer: 'It has isolation defaults, but production security requires image hygiene, least privilege, patching, scanning, and platform controls.',
    },
    {
      question: 'Is running as root inside a container okay?',
      answer: 'Avoid it when possible. Root inside a container is still a risk, especially with mounted files, capabilities, or runtime escapes.',
    },
    {
      question: 'Why is mounting `/var/run/docker.sock` dangerous?',
      answer: 'Access to the Docker socket can effectively grant control over the host Docker daemon and other containers.',
    },
  ],
  productionIssues: [
    '**Privileged containers** - broad host access defeats much of the isolation model.',
    '**Secrets baked into images** - credentials remain in layers and registries.',
    '**Unscanned base images** - known vulnerabilities enter production repeatedly.',
    '**Docker socket exposure** - CI or containers gain excessive control over the host.',
    '**Root filesystem writes** - attackers can modify runtime files more easily.',
  ],
  bestPractices: [
    'Run containers as non-root users',
    'Drop unnecessary Linux capabilities',
    'Never bake secrets into images',
    'Scan images and dependencies in CI',
    'Use private registries with least-privilege access',
    'Avoid privileged containers and Docker socket mounts',
    'Patch and rebuild images regularly',
    'Use read-only filesystems where practical',
  ],
  architectNote: `Container security is not one setting. It is a chain. A strong non-root runtime helps, but not if the image came from an unknown publisher and contains secrets.

The enterprise goal is a governed path from source to image to registry to runtime, with controls at every handoff.`,
  faqs: [
    {
      question: 'Should secrets be environment variables?',
      answer: 'Environment variables are common, but secret managers or orchestrator secrets are preferred for sensitive production values.',
    },
    {
      question: 'How often should images be rebuilt?',
      answer: 'Regularly, even without application changes, so patched base images and dependencies can flow through the pipeline.',
    },
    {
      question: 'Can Docker enforce resource limits?',
      answer: 'Yes. CPU and memory limits reduce noisy-neighbor and denial-of-service risks.',
    },
  ],
  keyTakeaways: [
    'Containers share the host kernel',
    'Use least privilege at build and runtime',
    'Do not bake secrets into images',
    'Scan and patch images continuously',
    'Protect registries and the Docker socket',
    'Security is a pipeline and platform concern',
  ],
  relatedTopics: ['docker-images', 'docker-dockerfile', 'docker-cicd-integration'],
});

export const cicdIntegration = topic({
  slug: 'docker-cicd-integration',
  title: 'CI/CD Integration',
  description: 'Learn how Docker fits into CI/CD pipelines for build, test, scan, push, promote, deploy, and rollback workflows.',
  quickUnderstanding: 'In CI/CD, Docker turns application releases into image artifacts. Pipelines build an image, test it, scan it, push it to a registry, and deploy the approved image to an environment.',
  whatIsIt: `Docker CI/CD integration means using container images as the release artifact.

The pipeline usually handles:
- Dependency installation
- Unit and integration tests
- Image build
- Image tagging
- Vulnerability scanning
- Registry push
- Deployment metadata
- Promotion between environments`,
  whyWeNeedIt: `Without Docker, each environment may rebuild or reinstall the application differently. With Docker, the same tested image can be promoted through environments.

That improves traceability, rollback, and confidence in deployments.`,
  realWorldUsage: `A common enterprise flow:

1. Pull request runs tests
2. Main branch builds an image
3. Image is tagged with git SHA and semantic version
4. Image is scanned
5. Image is pushed to a private registry
6. Deployment manifest references the image digest
7. Release approval promotes the same digest to production`,
  howItWorks: `CI runners use Docker BuildKit or equivalent builders to create images.

Pipelines should avoid rebuilding separately for each environment. Instead, build once and promote the same image with environment-specific configuration injected at deployment time.`,
  example: {
    title: 'GitHub Actions Image Pipeline',
    description: 'A simplified build, test, and push workflow.',
    code: [
      {
        label: 'workflow.yaml',
        language: 'yaml',
        code: `name: docker-ci

on:
  push:
    branches: [main]

jobs:
  image:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: registry.company.com
          username: \${{ secrets.REGISTRY_USER }}
          password: \${{ secrets.REGISTRY_PASSWORD }}
      - run: docker build -t registry.company.com/orders-api:\${{ github.sha }} .
      - run: docker push registry.company.com/orders-api:\${{ github.sha }}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should each environment build its own image?',
      answer: 'Usually no. Build once, test once, and promote the same immutable image with different runtime configuration.',
    },
    {
      question: 'Should CI push `latest`?',
      answer: '`latest` can be convenient, but releases should also use immutable tags or digests for traceability.',
    },
    {
      question: 'Where should tests run?',
      answer: 'Run fast tests before image build when useful, and also test the built image so packaging problems are caught.',
    },
  ],
  productionIssues: [
    '**Rebuild per environment** - staging and production run different artifacts.',
    '**No scan gate** - vulnerable images are pushed or deployed automatically.',
    '**Leaky build secrets** - registry or package tokens appear in layers or logs.',
    '**Weak tag strategy** - teams cannot identify which commit is running.',
    '**Slow pipelines** - poor layer caching makes every build reinstall everything.',
  ],
  bestPractices: [
    'Build once and promote the same image digest',
    'Tag images with git SHA and release version',
    'Use CI secrets management for registry credentials',
    'Scan images before deployment',
    'Cache Docker layers safely to speed builds',
    'Fail the pipeline on policy violations',
    'Keep environment configuration outside the image',
  ],
  architectNote: `Docker makes CI/CD more honest. The artifact that passed tests can be the artifact that reaches production.

The anti-pattern is rebuilding the image during deployment. That looks automated, but it breaks provenance. Promotion should move a known artifact, not recreate one.`,
  faqs: [
    {
      question: 'What tag should CI use?',
      answer: 'Use at least the git SHA. Release versions and branch tags can be added, but the SHA gives direct source traceability.',
    },
    {
      question: 'Should Docker builds run on every pull request?',
      answer: 'Often yes for services where packaging matters. Some teams run a lighter build on PRs and full scan/push on main.',
    },
    {
      question: 'Can CI build multi-platform images?',
      answer: 'Yes, with Buildx and compatible builders, but it adds complexity and should be used when deployment platforms require it.',
    },
  ],
  keyTakeaways: [
    'Docker images are CI/CD release artifacts',
    'Build once and promote the same image',
    'Use immutable tags or digests',
    'Scan before deployment',
    'Keep secrets and environment config outside images',
    'Layer caching can significantly improve pipeline speed',
  ],
  relatedTopics: ['docker-images', 'docker-hub', 'docker-security'],
});

export const enterpriseDeploymentPatterns = topic({
  slug: 'docker-enterprise-deployment-patterns',
  title: 'Enterprise Deployment Patterns',
  description: 'Understand how enterprises deploy Dockerized applications using registries, orchestration, promotion, observability, security gates, and rollback patterns.',
  quickUnderstanding: 'Enterprise Docker deployment is not just `docker run`. It is a controlled flow: build an image, verify it, store it in a registry, deploy it through an orchestrator, observe it, and roll back safely when needed.',
  whatIsIt: `Enterprise deployment patterns define how containerized applications move from source code to production.

Common patterns:
- Private registry per organization or platform
- Build once, promote by digest
- Orchestrated runtime such as Kubernetes, ECS, Nomad, or OpenShift
- Health checks and rolling updates
- Central logging, metrics, and tracing
- Policy gates for security and compliance
- Blue-green or canary releases for risky changes`,
  whyWeNeedIt: `A single Docker host is easy. Enterprise delivery is harder because teams need reliability, auditability, security, rollback, cost control, and operations support.

Patterns prevent every team from inventing a different deployment style.`,
  realWorldUsage: `A mature platform often looks like this:

1. App team commits code and Dockerfile
2. CI builds and scans the image
3. Image is pushed to a private registry
4. Deployment manifest references the immutable digest
5. Platform deploys through Kubernetes or a managed container service
6. Readiness probes control rollout
7. Observability confirms health
8. Rollback points to the previous digest if needed`,
  howItWorks: `Enterprise deployments separate responsibilities.

Application teams own code, Dockerfile, health endpoints, and service-level behavior.

Platform teams own cluster/runtime standards, ingress, registry, secrets, policy, node security, observability, and deployment guardrails.

The container image is the contract between those teams.`,
  example: {
    title: 'Deployment Promotion Model',
    description: 'The same image digest moves across environments with different runtime configuration.',
    code: [
      {
        label: 'Promotion flow',
        language: 'text',
        code: `Source commit
  -> CI build
  -> orders-api@sha256:abc123
  -> security scan passed
  -> deploy to dev with dev config
  -> deploy to staging with staging config
  -> approval
  -> deploy to production with production config
  -> rollback uses previous digest`,
      },
      {
        label: 'Kubernetes-style image reference',
        language: 'yaml',
        code: `containers:
  - name: orders-api
    image: registry.company.com/orders-api@sha256:abc123
    ports:
      - containerPort: 3000
    readinessProbe:
      httpGet:
        path: /health/ready
        port: 3000`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Docker Compose an enterprise deployment platform?',
      answer: 'Compose is excellent for local development and simple setups. Enterprises usually use orchestrators or managed container platforms for production.',
    },
    {
      question: 'Should configuration be baked per environment?',
      answer: 'No. Build one image and inject environment-specific configuration at runtime.',
    },
    {
      question: 'Who owns the Dockerfile?',
      answer: 'Usually the application team owns it, with platform standards and security requirements guiding base images and runtime behavior.',
    },
  ],
  productionIssues: [
    '**No rollback artifact** - previous images are overwritten or untraceable.',
    '**Different image per environment** - staging does not prove what production will run.',
    '**Missing readiness checks** - traffic reaches containers before they are ready.',
    '**Registry outage dependency** - production rollouts fail because registry availability was not planned.',
    '**No observability standard** - teams cannot debug container health consistently.',
  ],
  bestPractices: [
    'Use private registries with access control and retention policies',
    'Deploy immutable image digests for critical workloads',
    'Standardize health checks, logging, metrics, and tracing',
    'Use rolling, blue-green, or canary releases based on risk',
    'Keep runtime configuration in platform-managed config and secrets',
    'Define ownership between app teams and platform teams',
    'Maintain rollback and image retention policies',
  ],
  architectNote: `Docker standardizes the artifact. It does not automatically standardize delivery.

The enterprise win comes when image creation, registry governance, deployment automation, observability, and rollback are designed as one path. That path is what lets many teams ship independently without making operations chaotic.`,
  faqs: [
    {
      question: 'Should enterprises use Kubernetes for Docker deployments?',
      answer: 'Kubernetes is common, but not mandatory. ECS, OpenShift, Nomad, and managed app platforms can also run containerized workloads well.',
    },
    {
      question: 'What is a canary deployment?',
      answer: 'A canary sends a small percentage of traffic to a new version first, then increases traffic if health and metrics look good.',
    },
    {
      question: 'Why deploy by digest?',
      answer: 'A digest identifies exact image content. Tags can move, but digests provide stronger reproducibility and auditability.',
    },
  ],
  keyTakeaways: [
    'Enterprise Docker deployment is a governed delivery workflow',
    'Private registries and immutable artifacts are central',
    'Build once and promote across environments',
    'Production needs health checks, observability, security gates, and rollback',
    'The image is the contract between app and platform teams',
  ],
  relatedTopics: ['docker-cicd-integration', 'docker-security', 'docker-compose'],
});
