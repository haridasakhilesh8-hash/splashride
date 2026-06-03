import type { Confusion, FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const defaultVersions = ['AWS Cloud', 'AWS CLI v2', 'AWS SDKs', 'AWS Well-Architected Framework'];

interface AwsTopicSpec {
  slug: string;
  title: string;
  description: string;
  focus: string;
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
  keyTakeaways: string[];
  relatedTopics: string[];
  applicableVersions?: string[];
  faqs?: FAQ[];
}

function topic(input: AwsTopicSpec): TopicContent {
  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    applicableVersions: input.applicableVersions ?? defaultVersions,
    lastReviewed: reviewed,
    quickUnderstanding: `${input.title} helps teams design, build, secure, operate, and troubleshoot AWS workloads. In enterprise projects, the important questions are ownership, blast radius, automation, observability, compliance, and cost.`,
    whatIsIt: input.whatIsIt,
    whyWeNeedIt: `${input.whyWeNeedIt}

**Common developer mistakes:**
- Choosing defaults without checking security, cost, or failure behavior
- Treating AWS services as isolated tools instead of part of an architecture
- Skipping tags, alarms, IAM review, backups, and runbooks until production incidents happen
- Building manually in the console and then struggling to reproduce environments`,
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
        question: `Interview: How would you explain ${input.title} in a real AWS project?`,
        answer: `${input.title} should be explained through the business workload it supports, the AWS responsibility boundary, the failure modes, the security controls, and how it is monitored and automated.`,
      },
      {
        question: `Interview: What production mistake do developers commonly make with ${input.title}?`,
        answer: 'The common mistake is using the service successfully in a lab but not designing for least privilege, multi-AZ resilience, alarms, cost visibility, and repeatable infrastructure.',
      },
      ...(input.faqs ?? []),
    ],
    keyTakeaways: input.keyTakeaways,
    relatedTopics: input.relatedTopics,
  };
}

export const awsOverview = topic({
  slug: 'aws-overview',
  title: 'AWS Overview',
  description: 'Understand AWS as a global cloud platform for compute, storage, networking, security, data, serverless, DevOps, and enterprise architecture.',
  focus: 'the AWS service model and how cloud building blocks combine into production systems',
  whatIsIt: `Amazon Web Services is a cloud platform that provides on-demand infrastructure and managed services.

Instead of buying servers, storage arrays, firewalls, and data centers, teams provision services such as EC2, S3, RDS, Lambda, IAM, VPC, CloudWatch, and CodePipeline.

AWS is not one product. It is a large platform where each service solves a layer of the system: compute, networking, security, persistence, delivery, monitoring, and governance.`,
  whyWeNeedIt: `Enterprises use AWS to move faster, scale globally, reduce undifferentiated infrastructure work, and pay for capacity more flexibly.

AWS is valuable when teams combine services into governed platforms: secure accounts, network boundaries, automated deployments, observability, disaster recovery, and cost controls.`,
  realWorldUsage: `A common enterprise setup separates accounts for dev, test, staging, and production. Workloads run in private VPC subnets, fronted by load balancers, protected by IAM and security groups, monitored through CloudWatch and CloudTrail, and deployed by CI/CD pipelines.

For example, an order-management system may use ALB, EC2 Auto Scaling, RDS Multi-AZ, S3 for documents, Lambda for background tasks, and CloudWatch alarms for operational response.`,
  howItWorks: `AWS exposes services through the console, CLI, SDKs, APIs, and infrastructure-as-code tools.

The normal operating model is:
1. Create or select an AWS account
2. Define IAM identities and permissions
3. Build network boundaries with VPCs and subnets
4. Provision workload services
5. Automate deployment with IaC and CI/CD
6. Monitor, audit, patch, and optimize continuously`,
  exampleTitle: 'Reference workload map',
  exampleDescription: 'A simple mapping of application needs to AWS services.',
  exampleLanguage: 'text',
  exampleCode: `Web traffic       -> Route 53, CloudFront, ALB
Application       -> EC2 Auto Scaling, ECS, Lambda
Database          -> RDS, DynamoDB
Files             -> S3, EFS
Security          -> IAM, KMS, Security Groups
Monitoring        -> CloudWatch, CloudTrail
Deployment        -> CodePipeline, CodeBuild, CloudFormation`,
  commonConfusions: [
    { question: 'Is AWS only infrastructure?', answer: 'No. AWS includes infrastructure services and managed application, data, security, DevOps, AI, and analytics services.' },
    { question: 'Does AWS automatically make systems highly available?', answer: 'No. AWS provides building blocks, but architects must choose multi-AZ, backups, health checks, failover, and operational controls.' },
    { question: 'Is the console enough for enterprise work?', answer: 'The console is useful for learning and investigation, but production systems should be created through repeatable automation.' },
  ],
  productionIssues: [
    '**Account sprawl** without guardrails causes unclear ownership and inconsistent security.',
    '**Manual infrastructure** creates drift between environments.',
    '**Missing cost controls** leads to surprise bills from oversized, idle, or forgotten resources.',
    '**Weak IAM design** gives broad permissions that become audit findings.',
  ],
  bestPractices: [
    'Use separate AWS accounts for workload isolation and blast-radius control',
    'Provision production infrastructure with IaC',
    'Apply least privilege IAM and centralized logging',
    'Tag resources for owner, environment, application, and cost center',
    'Use Well-Architected reviews for important workloads',
  ],
  architectNote: `AWS architecture is not about memorizing service names. It is about composing services into a system that survives failure, proves security, scales predictably, and remains operable by humans under pressure.`,
  faqs: [
    { question: 'Which AWS services should a backend developer learn first?', answer: 'Start with IAM, VPC, EC2, S3, RDS, CloudWatch, Lambda, API Gateway, and CloudFormation. Those explain most production conversations.' },
    { question: 'What is the biggest AWS learning trap?', answer: 'Learning services in isolation. Real projects require connecting identity, network, compute, data, monitoring, and cost decisions.' },
  ],
  keyTakeaways: [
    'AWS is a platform of cloud services, not a single product',
    'Production AWS requires security, networking, monitoring, automation, and cost governance',
    'Cloud design still requires architecture decisions',
    'Manual console work should not be the production delivery model',
  ],
  relatedTopics: ['aws-global-infrastructure', 'aws-shared-responsibility-model', 'aws-iam', 'aws-vpc'],
});

export const awsGlobalInfrastructure = topic({
  slug: 'aws-global-infrastructure',
  title: 'Global Infrastructure',
  description: 'Learn how AWS Regions, Availability Zones, edge locations, and global services shape latency, resilience, compliance, and disaster recovery.',
  focus: 'the physical and logical AWS footprint used to run workloads around the world',
  whatIsIt: `AWS global infrastructure is the worldwide foundation behind AWS services.

It includes Regions, Availability Zones, Local Zones, Wavelength Zones, edge locations, and regional or global control-plane services.

This infrastructure is why teams can deploy close to users, isolate failures, meet data residency requirements, and design disaster recovery across geographic boundaries.`,
  whyWeNeedIt: `Application architecture depends on where resources run. Latency, compliance, service availability, cost, and disaster recovery all start with infrastructure location.

Global infrastructure lets enterprises decide which workloads stay regional, which need global acceleration, and which need cross-region recovery.`,
  realWorldUsage: `A retail platform may run production in one primary Region with application instances spread across three Availability Zones. Static content is cached globally through CloudFront. Critical database backups are copied to a secondary Region for disaster recovery.

The architecture balances local latency, data residency, operational complexity, and recovery-time objectives.`,
  howItWorks: `A Region is a geographic area. An Availability Zone is an isolated data-center grouping inside a Region. Edge locations are closer to users and are commonly used by services such as CloudFront and Route 53.

Most resources are regional or zonal. Architects must understand the scope because a regional outage, AZ impairment, or global control-plane issue affects different parts of the system differently.`,
  exampleTitle: 'Enterprise placement decision',
  exampleDescription: 'How an architect chooses service placement.',
  exampleLanguage: 'text',
  exampleCode: `Customer base: India and US
Compliance: payment records remain in approved Regions
Primary workload: ap-south-1, 3 AZ design
Static assets: CloudFront edge caching
DR target: secondary Region with backups and IaC
Operations: CloudWatch dashboards per Region`,
  commonConfusions: [
    { question: 'Are Regions and Availability Zones the same?', answer: 'No. A Region is a geographic area. An Availability Zone is an isolated location inside a Region.' },
    { question: 'Do all services exist in every Region?', answer: 'No. Service availability varies by Region, so architecture should verify required services before choosing a Region.' },
    { question: 'Is multi-region always required?', answer: 'No. Many workloads are well served by multi-AZ inside one Region. Multi-region adds cost and operational complexity.' },
  ],
  productionIssues: [
    '**Single-AZ deployments** fail during AZ-level incidents.',
    '**Wrong Region selection** causes latency, compliance, or service availability problems.',
    '**No cross-region recovery plan** makes regional incidents much harder to recover from.',
    '**Assuming global services are risk-free** ignores control-plane and dependency behavior.',
  ],
  bestPractices: [
    'Deploy critical regional workloads across multiple AZs',
    'Choose Regions based on users, compliance, service availability, and cost',
    'Document which resources are regional, zonal, or global',
    'Use edge services for global user experience where appropriate',
    'Test disaster recovery instead of only documenting it',
  ],
  architectNote: `Good AWS architects think in failure domains. Region, AZ, edge, and account boundaries are not trivia; they define how far a failure can spread and how fast a business can recover.`,
  faqs: [
    { question: 'What is an edge location used for?', answer: 'Edge locations cache content and route requests closer to users through services such as CloudFront, Route 53, and Global Accelerator.' },
    { question: 'Should production always use three AZs?', answer: 'Three AZs are preferred for many critical workloads, but the right answer depends on service support, cost, and availability goals.' },
  ],
  keyTakeaways: [
    'Regions define geographic placement',
    'Availability Zones define isolated failure domains inside a Region',
    'Edge services improve global latency and availability',
    'Multi-AZ is common for high availability; multi-region is a larger DR decision',
  ],
  relatedTopics: ['aws-regions-availability-zones', 'aws-high-availability', 'aws-disaster-recovery'],
});

export const awsRegionsAvailabilityZones = topic({
  slug: 'aws-regions-availability-zones',
  title: 'Regions & Availability Zones',
  description: 'Understand the difference between AWS Regions and Availability Zones and how they affect highly available deployments.',
  focus: 'regional and zonal failure boundaries for AWS resources',
  whatIsIt: `An AWS Region is a geographic location such as us-east-1 or ap-south-1. An Availability Zone is an isolated facility grouping inside a Region.

AZs have independent power, cooling, and networking, but they are connected with low-latency private links. That makes them suitable for highly available application and database designs.`,
  whyWeNeedIt: `Applications fail when all components are placed in one location. Regions and AZs let teams spread infrastructure so one facility issue does not take down the whole workload.

They also support latency, data residency, and disaster recovery decisions.`,
  realWorldUsage: `A production web application commonly runs load balancers in public subnets across at least two AZs, application servers in private subnets across the same AZs, and RDS Multi-AZ for database failover.

This design allows AWS or the application platform to route around an unhealthy AZ.`,
  howItWorks: `When you create resources, some are regional and some are zonal.

Examples:
- S3 buckets are regional
- EC2 instances are zonal
- EBS volumes are zonal
- Load balancers are regional but attach to subnets in multiple AZs
- RDS Multi-AZ places database infrastructure across AZs`,
  exampleTitle: 'Multi-AZ subnet layout',
  exampleDescription: 'A typical two-AZ layout for a web application.',
  exampleLanguage: 'text',
  exampleCode: `Region: ap-south-1
AZ a:
  public subnet  -> ALB node
  private subnet -> app instances
  db subnet      -> database standby/primary
AZ b:
  public subnet  -> ALB node
  private subnet -> app instances
  db subnet      -> database standby/primary`,
  commonConfusions: [
    { question: 'Can an EBS volume move across AZs?', answer: 'Not directly. EBS is zonal. You usually snapshot it and create a new volume in the target AZ.' },
    { question: 'Does Multi-AZ mean multi-region?', answer: 'No. Multi-AZ stays inside one Region. Multi-region spans geographic Regions.' },
    { question: 'Do AZ names map the same across accounts?', answer: 'AZ names can map differently across accounts. Use AZ IDs when exact physical alignment matters.' },
  ],
  productionIssues: [
    '**All instances in one AZ** creates an avoidable outage during AZ impairment.',
    '**Zonal storage dependency** blocks failover when EBS-backed resources are not replicated.',
    '**Uneven subnet capacity** prevents scaling in one AZ.',
    '**Hardcoded AZ assumptions** create deployment failures across accounts.',
  ],
  bestPractices: [
    'Use at least two AZs for production workloads',
    'Size subnets for expected scale in each AZ',
    'Use managed Multi-AZ database options when appropriate',
    'Avoid hardcoding one AZ in templates unless there is a strong reason',
    'Test application behavior when one AZ becomes unavailable',
  ],
  architectNote: `Multi-AZ is the default production conversation. A service is not highly available just because it runs on AWS; it is highly available when its dependencies can tolerate a zonal failure.`,
  faqs: [
    { question: 'How many AZs should an app use?', answer: 'Two is a common minimum; three is stronger for critical systems and better load distribution when the service supports it.' },
    { question: 'Are AZs charged differently?', answer: 'The AZ itself is not usually the main charge, but cross-AZ data transfer and duplicated resources can affect cost.' },
  ],
  keyTakeaways: [
    'Regions are geographic boundaries',
    'AZs are isolated failure domains inside a Region',
    'EC2 and EBS are zonal; many managed services are regional',
    'Production workloads usually need at least two AZs',
  ],
  relatedTopics: ['aws-global-infrastructure', 'aws-subnets', 'aws-high-availability'],
});

export const awsSharedResponsibilityModel = topic({
  slug: 'aws-shared-responsibility-model',
  title: 'Shared Responsibility Model',
  description: 'Learn which security and operational responsibilities belong to AWS and which belong to the customer.',
  focus: 'the boundary between security of the cloud and security in the cloud',
  whatIsIt: `The AWS Shared Responsibility Model explains who is responsible for what.

AWS is responsible for security of the cloud: data centers, physical hardware, managed infrastructure, and foundational services.

Customers are responsible for security in the cloud: identity, data, network access, application code, configurations, encryption choices, backups, and monitoring.`,
  whyWeNeedIt: `Many AWS incidents happen because teams assume AWS manages more than it does.

The model helps architects assign accountability for patching, access control, encryption, logging, backups, compliance evidence, and incident response.`,
  realWorldUsage: `For EC2, AWS secures the physical host and hypervisor, while the customer patches the guest OS, configures security groups, manages IAM, and protects application data.

For managed services such as S3 or RDS, AWS handles more infrastructure work, but the customer still owns access policies, encryption choices, data classification, retention, and monitoring.`,
  howItWorks: `Responsibility shifts depending on service type.

Infrastructure services give the customer more control and more responsibility. Managed services reduce operational burden but still require secure configuration. Serverless services move more infrastructure management to AWS, but code, identity, data, and event permissions remain customer concerns.`,
  exampleTitle: 'Responsibility comparison',
  exampleDescription: 'How responsibility changes by service model.',
  exampleLanguage: 'text',
  exampleCode: `EC2:
  AWS owns: facilities, hardware, hypervisor
  Customer owns: OS patching, app code, firewall rules, data

RDS:
  AWS owns: database host infrastructure and managed patch options
  Customer owns: schema, users, access, backups policy, data protection

Lambda:
  AWS owns: runtime infrastructure
  Customer owns: function code, IAM permissions, secrets, event sources`,
  commonConfusions: [
    { question: 'Does AWS patch my EC2 operating system?', answer: 'No. Customers manage guest OS patching unless they use specific managed services or automation they configure.' },
    { question: 'Does using S3 mean my bucket is automatically secure?', answer: 'No. Customers own bucket policies, public access settings, encryption configuration, and data governance.' },
    { question: 'Is compliance fully handled by AWS?', answer: 'No. AWS provides compliant infrastructure and reports, but customers must configure workloads and maintain evidence correctly.' },
  ],
  productionIssues: [
    '**Unpatched EC2 instances** because teams assume AWS handles guest OS maintenance.',
    '**Public data exposure** from incorrect S3 or IAM policies.',
    '**No audit evidence** for customer-owned controls.',
    '**Misconfigured encryption** where keys, rotation, or access are not governed.',
  ],
  bestPractices: [
    'Map responsibilities for each service in architecture reviews',
    'Use managed services to reduce undifferentiated operations where suitable',
    'Automate customer-owned controls such as patching, backup, and IAM review',
    'Collect CloudTrail, Config, and security findings for evidence',
    'Document ownership in runbooks and onboarding material',
  ],
  architectNote: `The shared model is an accountability tool. Mature AWS teams do not say "AWS handles security"; they say exactly which controls AWS handles and exactly which controls the team must prove.`,
  faqs: [
    { question: 'How does the model affect interviews?', answer: 'Interviewers often ask whether you know which tasks move to AWS and which remain customer responsibilities. Use EC2 versus RDS versus Lambda examples.' },
    { question: 'Who owns application vulnerabilities?', answer: 'The customer owns application code, dependencies, configuration, and secure deployment practices.' },
  ],
  keyTakeaways: [
    'AWS secures the cloud infrastructure',
    'Customers secure their workloads, identities, data, and configurations',
    'Responsibility changes by service model',
    'Managed services reduce but do not eliminate customer responsibility',
  ],
  relatedTopics: ['aws-iam', 'aws-policies', 'aws-cloudtrail', 'aws-cloudwatch'],
});

export const awsEc2 = topic({
  slug: 'aws-ec2',
  title: 'EC2',
  description: 'Understand Amazon EC2 virtual machines, instance families, AMIs, storage, networking, scaling, and production operations.',
  focus: 'resizable virtual compute for applications that need server-level control',
  whatIsIt: `Amazon EC2 provides virtual machines called instances.

An EC2 instance runs from an Amazon Machine Image, has a selected instance type, attaches to a VPC subnet, uses security groups for traffic control, and commonly uses EBS volumes for block storage.`,
  whyWeNeedIt: `EC2 is useful when teams need control over operating systems, runtimes, background processes, agents, custom networking, or legacy application deployment.

It is also a common base for Auto Scaling groups, batch workers, bastion hosts, and self-managed platforms.`,
  realWorldUsage: `A financial services company may run a Java API on EC2 instances inside private subnets. An Application Load Balancer receives HTTPS traffic, Auto Scaling keeps enough instances healthy, CloudWatch collects logs and metrics, and Systems Manager handles patching and remote access.

The application is not exposed directly to the internet; only the load balancer is public.`,
  howItWorks: `You choose an AMI, instance type, subnet, security group, IAM role, storage, and user data script. AWS launches the instance in a specific AZ.

Applications usually run behind load balancers. For production, EC2 instances should be disposable: created from automation, configured consistently, monitored, patched, and replaceable.`,
  exampleTitle: 'EC2 launch checklist',
  exampleDescription: 'A production-minded checklist before launching application instances.',
  exampleLanguage: 'text',
  exampleCode: `AMI: hardened Linux image
Instance type: right-sized from load test
Subnet: private app subnet
Security group: allow app port only from ALB
IAM role: least privilege for S3/CloudWatch/SSM
Storage: encrypted EBS
Bootstrap: user data or image pipeline
Operations: CloudWatch agent, SSM, patch policy, alarms`,
  commonConfusions: [
    { question: 'Is EC2 serverless?', answer: 'No. EC2 gives server-level control, so the customer owns OS patching, capacity planning, and instance operations.' },
    { question: 'Can EC2 be highly available by itself?', answer: 'A single instance is not highly available. Use multiple instances across AZs behind a load balancer.' },
    { question: 'Should production SSH directly to EC2?', answer: 'Prefer Systems Manager Session Manager and automation. Direct SSH increases access-management risk.' },
  ],
  productionIssues: [
    '**Snowflake servers** where manual changes are not captured in code.',
    '**Missing patching** leaves OS and package vulnerabilities unresolved.',
    '**Public instances** expose application ports directly to the internet.',
    '**No health checks** lets broken instances keep receiving traffic.',
    '**Oversized instances** waste money after initial launch assumptions become stale.',
  ],
  bestPractices: [
    'Place application EC2 instances in private subnets',
    'Use Auto Scaling groups for replaceable capacity',
    'Attach IAM roles instead of static credentials',
    'Use encrypted EBS volumes and hardened AMIs',
    'Use SSM for access, patching, and inventory',
    'Monitor CPU, memory, disk, app logs, and health checks',
  ],
  architectNote: `EC2 is powerful because it gives control. That control is also the risk. Treat EC2 fleets as automated, disposable capacity, not cherished servers maintained by hand.`,
  faqs: [
    { question: 'When should I choose EC2 over Lambda?', answer: 'Choose EC2 for long-running processes, custom runtimes, high control, persistent agents, or workloads that do not fit serverless limits and pricing.' },
    { question: 'What is an AMI?', answer: 'An AMI is the machine image used to launch an EC2 instance, including OS and preinstalled software.' },
  ],
  keyTakeaways: [
    'EC2 provides virtual machines with strong control',
    'Production EC2 should be automated and replaceable',
    'Use private subnets, IAM roles, encrypted storage, and monitoring',
    'High availability needs multiple instances across AZs',
  ],
  relatedTopics: ['aws-auto-scaling', 'aws-load-balancer', 'aws-ebs', 'aws-security-groups'],
});

export const awsAutoScaling = topic({
  slug: 'aws-auto-scaling',
  title: 'Auto Scaling',
  description: 'Learn how Auto Scaling adjusts compute capacity based on health, demand, schedules, and resilience requirements.',
  focus: 'automated capacity management for EC2 and other scalable AWS resources',
  whatIsIt: `Auto Scaling automatically adjusts the number of compute resources based on rules, metrics, schedules, or health.

For EC2, an Auto Scaling group maintains desired capacity, replaces unhealthy instances, and can scale across multiple AZs.`,
  whyWeNeedIt: `Traffic changes over time. Manual scaling is slow, error-prone, and expensive.

Auto Scaling helps maintain availability during demand spikes and reduce cost when demand drops. It also replaces failed instances automatically.`,
  realWorldUsage: `An e-commerce API might run with a minimum of four EC2 instances across two AZs. During sale events, target-tracking scaling increases capacity based on CPU or request count per target. After the event, capacity scales down.

The deployment pipeline updates the launch template and rolls instances gradually.`,
  howItWorks: `An Auto Scaling group uses a launch template, desired capacity, min/max limits, health checks, scaling policies, and subnet placement.

Scaling policies can be target tracking, step scaling, scheduled scaling, or predictive scaling. For production, health checks should include load balancer health, not only EC2 system health.`,
  exampleTitle: 'Auto Scaling policy plan',
  exampleDescription: 'A concise scaling plan for a web API.',
  exampleLanguage: 'text',
  exampleCode: `Minimum capacity: 4
Desired capacity: 6
Maximum capacity: 20
Subnets: private app subnets in 3 AZs
Health check: ALB target health
Scale out: request count per target above threshold
Scale in: conservative cooldown after stable low traffic
Deployment: rolling instance refresh`,
  commonConfusions: [
    { question: 'Is Auto Scaling only for EC2?', answer: 'No. EC2 Auto Scaling is common, but AWS also supports scaling for services such as ECS, DynamoDB, and Aurora read capacity through related scaling features.' },
    { question: 'Does Auto Scaling fix bad application performance?', answer: 'No. It adds capacity, but inefficient code, database bottlenecks, or external dependencies can still fail.' },
    { question: 'Should scale-in be aggressive?', answer: 'Usually no. Aggressive scale-in can cause flapping and user impact during uneven traffic.' },
  ],
  productionIssues: [
    '**Wrong scaling metric** scales instances while the real bottleneck is database, memory, or downstream latency.',
    '**No warm-up period** causes repeated scaling before new instances are ready.',
    '**Capacity limits too low** fail during real traffic spikes.',
    '**Scale-in during deployments** removes capacity at risky moments.',
  ],
  bestPractices: [
    'Scale across at least two AZs',
    'Use ALB health checks for application fleets',
    'Choose metrics that reflect user demand and bottlenecks',
    'Set conservative scale-in cooldowns',
    'Load test scaling behavior before launch',
    'Use launch templates and instance refresh for controlled updates',
  ],
  architectNote: `Auto Scaling is not just a cost feature. It is a resilience feature. The group should be able to lose instances, replace them, and absorb traffic changes without an operator touching the console.`,
  faqs: [
    { question: 'What metric should I scale on?', answer: 'For web apps, request count per target or latency-related metrics often work better than raw CPU alone. Always validate through load testing.' },
    { question: 'What is desired capacity?', answer: 'Desired capacity is the number of instances the group attempts to maintain right now.' },
  ],
  keyTakeaways: [
    'Auto Scaling maintains and adjusts capacity automatically',
    'Health checks and metrics determine scaling quality',
    'Scale-out and scale-in need different risk thinking',
    'Auto Scaling should be tested under realistic load',
  ],
  relatedTopics: ['aws-ec2', 'aws-load-balancer', 'aws-cloudwatch', 'aws-scalability'],
});

export const awsLoadBalancer = topic({
  slug: 'aws-load-balancer',
  title: 'Load Balancer',
  description: 'Understand AWS load balancers for distributing traffic, health checking, TLS termination, routing, and resilient application access.',
  focus: 'managed traffic distribution across healthy application targets',
  whatIsIt: `Elastic Load Balancing distributes incoming traffic across targets such as EC2 instances, containers, IP addresses, and Lambda functions.

Common types include Application Load Balancer for HTTP/HTTPS, Network Load Balancer for TCP/UDP and extreme performance, and Gateway Load Balancer for network appliances.`,
  whyWeNeedIt: `Applications need stable entry points while backend instances change, fail, deploy, and scale.

Load balancers provide health checks, TLS termination, host/path routing, and traffic distribution across AZs.`,
  realWorldUsage: `A SaaS application may use an internet-facing ALB with HTTPS listeners. It routes /api traffic to backend services, /admin to an admin target group, and only sends requests to targets passing health checks.

Security groups allow inbound internet traffic to the ALB and allow app traffic only from the ALB security group.`,
  howItWorks: `A load balancer has listeners, rules, target groups, health checks, and subnet mappings.

Requests reach the listener, rules decide the target group, and healthy targets receive traffic. If a target fails health checks, it is removed from rotation until healthy again.`,
  exampleTitle: 'ALB routing model',
  exampleDescription: 'Host and path routing for an enterprise web application.',
  exampleLanguage: 'text',
  exampleCode: `ALB listener: HTTPS 443
Rule 1: api.company.com/*      -> orders-api target group
Rule 2: admin.company.com/*    -> admin-service target group
Rule 3: www.company.com/static -> frontend target group
Health check: /health/ready
Security: targets allow inbound only from ALB security group`,
  commonConfusions: [
    { question: 'Is ALB the same as NLB?', answer: 'No. ALB is Layer 7 HTTP/HTTPS routing. NLB is Layer 4 TCP/UDP with very high throughput and static IP support.' },
    { question: 'Does a load balancer make a broken app healthy?', answer: 'No. It only routes around targets that health checks mark unhealthy.' },
    { question: 'Should EC2 instances be public if ALB is public?', answer: 'No. Usually the ALB is public and application instances stay private.' },
  ],
  productionIssues: [
    '**Bad health checks** mark unhealthy apps healthy or healthy apps unhealthy.',
    '**Open target security groups** allow internet traffic to bypass the load balancer.',
    '**No cross-AZ capacity planning** creates uneven traffic during AZ issues.',
    '**TLS misconfiguration** causes expired certificates or weak policies.',
  ],
  bestPractices: [
    'Use ALB for HTTP routing and NLB for TCP/UDP or static IP needs',
    'Keep application targets in private subnets where possible',
    'Use meaningful readiness health checks',
    'Terminate TLS with managed certificates through ACM',
    'Log load balancer access for investigation and analytics',
    'Protect public endpoints with WAF where required',
  ],
  architectNote: `The load balancer is often the control point between users and failure. Health checks, routing rules, TLS, security groups, and logs should be treated as production architecture, not just connection plumbing.`,
  faqs: [
    { question: 'Can ALB route by path?', answer: 'Yes. ALB supports host-header and path-based routing for HTTP and HTTPS applications.' },
    { question: 'What should a health endpoint check?', answer: 'It should prove the app can safely receive traffic, while avoiding overly deep checks that flap during minor dependency issues.' },
  ],
  keyTakeaways: [
    'Load balancers distribute traffic across healthy targets',
    'ALB is best for HTTP/HTTPS routing',
    'Targets should usually be private',
    'Health checks determine real availability behavior',
  ],
  relatedTopics: ['aws-ec2', 'aws-auto-scaling', 'aws-security-groups', 'aws-high-availability'],
});

export const awsS3 = topic({
  slug: 'aws-s3',
  title: 'S3',
  description: 'Understand Amazon S3 object storage for files, data lakes, static assets, backups, lifecycle policies, and secure access.',
  focus: 'durable object storage for data accessed through APIs',
  whatIsIt: `Amazon S3 is object storage. Data is stored as objects inside buckets, and each object has a key, metadata, version, and access controls.

S3 is designed for high durability and is commonly used for documents, images, logs, backups, static websites, analytics data, and data lakes.`,
  whyWeNeedIt: `Applications need scalable storage for files and data that do not belong on application servers.

S3 separates file storage from compute, supports lifecycle management, encryption, versioning, replication, event triggers, and fine-grained access policies.`,
  realWorldUsage: `A claims-processing system stores uploaded documents in private S3 buckets. The application writes objects using pre-signed URLs, scans files asynchronously with Lambda, stores metadata in RDS, and sends document events to EventBridge.

The bucket has public access blocked, default encryption enabled, access logging, lifecycle transitions, and retention policies.`,
  howItWorks: `Clients call S3 APIs to create buckets, put objects, get objects, list keys, and manage lifecycle rules.

Access is controlled by IAM policies, bucket policies, ACL settings, public access block, KMS keys, and pre-signed URLs. Objects can trigger notifications to Lambda, SQS, SNS, or EventBridge.`,
  exampleTitle: 'Private upload pattern',
  exampleDescription: 'A secure pattern for user uploads.',
  exampleLanguage: 'text',
  exampleCode: `Browser requests upload URL from API
API verifies user and creates pre-signed S3 URL
Browser uploads file directly to private S3 bucket
S3 event triggers malware scan Lambda
Lambda writes result to metadata table
Application serves download through short-lived pre-signed URL`,
  commonConfusions: [
    { question: 'Is S3 a filesystem?', answer: 'No. S3 is object storage. It has keys that look like paths, but it is not a POSIX filesystem.' },
    { question: 'Is every S3 bucket public by default?', answer: 'No. Public access is blocked by default in modern setups, but policies can still make data public if changed.' },
    { question: 'Can applications mount S3 like a disk?', answer: 'Some tools emulate that, but production apps should usually use S3 APIs or choose EFS/EBS for filesystem needs.' },
  ],
  productionIssues: [
    '**Public bucket exposure** from broad bucket policies or disabled public access block.',
    '**No lifecycle rules** causes storage cost growth from old logs and uploads.',
    '**Missing versioning** makes accidental overwrite or deletion harder to recover.',
    '**Hot key patterns** or inefficient listing creates performance and cost issues.',
  ],
  bestPractices: [
    'Block public access unless there is a deliberate public use case',
    'Enable default encryption and consider KMS for sensitive data',
    'Use lifecycle policies for archival and deletion',
    'Use versioning for important buckets',
    'Use pre-signed URLs for controlled upload and download',
    'Monitor access with CloudTrail data events where required',
  ],
  architectNote: `S3 is often the system of record for files. Treat bucket policy, object lifecycle, encryption, retention, and event processing as core design, not storage afterthoughts.`,
  faqs: [
    { question: 'When should I use S3 instead of EBS?', answer: 'Use S3 for object/file data accessed by API and shared across systems. Use EBS for block storage attached to EC2 instances.' },
    { question: 'Can S3 host static websites?', answer: 'Yes, but production static sites commonly use CloudFront in front of S3 for HTTPS, caching, and access control.' },
  ],
  keyTakeaways: [
    'S3 stores objects in buckets',
    'It is not a traditional filesystem',
    'Access policy and public exposure must be managed carefully',
    'Lifecycle, encryption, versioning, and events are major production features',
  ],
  relatedTopics: ['aws-ebs', 'aws-efs', 'aws-policies', 'aws-lambda'],
});

export const awsEbs = topic({
  slug: 'aws-ebs',
  title: 'EBS',
  description: 'Learn Amazon EBS block storage for EC2, including volume types, snapshots, encryption, performance, and availability boundaries.',
  focus: 'persistent block storage attached to EC2 instances',
  whatIsIt: `Amazon Elastic Block Store provides block volumes for EC2 instances.

EBS behaves like a disk attached to an instance. It is used for operating systems, application data, databases on EC2, and workloads that need low-latency block storage.`,
  whyWeNeedIt: `EC2 instances need persistent disks. Instance store can be temporary, but EBS volumes persist independently of instance stop/start behavior.

EBS also supports snapshots, encryption, resizing, and multiple performance classes.`,
  realWorldUsage: `A self-managed Elasticsearch node may use encrypted EBS volumes sized for throughput and IOPS. Snapshots are scheduled, CloudWatch monitors queue length and burst balance, and replacement automation reattaches or recreates volumes as needed.

For many databases, teams choose managed RDS instead of self-managing on EBS.`,
  howItWorks: `An EBS volume is created in one AZ and attached to an EC2 instance in that same AZ.

The OS formats and mounts the volume. Snapshots store point-in-time backups in S3-managed storage. Volume type, size, provisioned IOPS, and throughput determine performance behavior.`,
  exampleTitle: 'EBS production checklist',
  exampleDescription: 'Operational checks for an EC2 workload using EBS.',
  exampleLanguage: 'text',
  exampleCode: `Volume type: gp3 or io2 based on workload
Encryption: enabled with managed or customer key
AZ: same as attached EC2 instance
Snapshots: scheduled and retention managed
Monitoring: latency, queue depth, throughput, IOPS
Recovery: snapshot restore tested
Cost: unattached volumes detected and cleaned`,
  commonConfusions: [
    { question: 'Can one EBS volume attach across AZs?', answer: 'No. EBS is zonal. The instance and volume must be in the same AZ.' },
    { question: 'Is EBS the same as S3?', answer: 'No. EBS is block storage for EC2. S3 is object storage accessed through APIs.' },
    { question: 'Do snapshots equal instant recovery?', answer: 'Snapshots help recovery, but restore time, data consistency, and runbooks must be tested.' },
  ],
  productionIssues: [
    '**Unattached volumes** continue billing after instances are deleted.',
    '**No snapshots** makes volume loss or corruption difficult to recover from.',
    '**Under-provisioned IOPS** causes application latency.',
    '**AZ dependency** blocks recovery if architecture assumes cross-AZ attach.',
  ],
  bestPractices: [
    'Encrypt EBS volumes by default',
    'Use gp3 for general workloads and provision performance explicitly when needed',
    'Schedule snapshots and test restoration',
    'Monitor IOPS, throughput, latency, and queue length',
    'Clean up unattached volumes',
    'Prefer managed databases when database operations are not a differentiator',
  ],
  architectNote: `EBS is reliable block storage, but it is still a zonal dependency. High availability comes from application, database, or platform replication around EBS, not from pretending a single volume is multi-AZ.`,
  faqs: [
    { question: 'Can I resize EBS volumes?', answer: 'Yes. Volumes can be expanded, and the filesystem usually must be expanded inside the OS.' },
    { question: 'What is gp3?', answer: 'gp3 is a general purpose SSD volume type where size, IOPS, and throughput can be configured more independently than older gp2 behavior.' },
  ],
  keyTakeaways: [
    'EBS is block storage for EC2',
    'EBS volumes are zonal',
    'Snapshots and encryption are essential production controls',
    'Performance must be sized and monitored',
  ],
  relatedTopics: ['aws-ec2', 'aws-s3', 'aws-regions-availability-zones'],
});

export const awsEfs = topic({
  slug: 'aws-efs',
  title: 'EFS',
  description: 'Understand Amazon EFS shared file storage for Linux workloads, multi-AZ access, mount targets, performance modes, and security.',
  focus: 'managed shared NFS file storage for multiple compute clients',
  whatIsIt: `Amazon Elastic File System is managed network file storage for Linux workloads.

Multiple EC2 instances, containers, or Lambda functions can mount the same EFS filesystem through NFS.`,
  whyWeNeedIt: `Some applications need shared file access across instances: content repositories, shared uploads, legacy file workflows, ML directories, or container workloads that need persistent shared storage.

EFS removes the need to operate your own NFS servers.`,
  realWorldUsage: `A content-management platform may run multiple application servers across AZs that all need access to shared author uploads. EFS provides shared storage, while mount targets in each AZ keep access local and resilient.

Security groups restrict NFS access to approved application subnets.`,
  howItWorks: `An EFS filesystem is regional. You create mount targets in subnets, usually one per AZ. Clients mount the filesystem over NFS using security groups and optional access points.

EFS can scale storage automatically, and throughput/performance behavior depends on mode, storage class, and workload pattern.`,
  exampleTitle: 'EFS access pattern',
  exampleDescription: 'Shared file access across private application subnets.',
  exampleLanguage: 'text',
  exampleCode: `EFS filesystem: encrypted
Mount targets: one per application AZ
Security group: allow NFS 2049 from app security group
EC2 instances: mount via DNS name
Access points: separate app directories and POSIX identity
Lifecycle: move inactive files to lower-cost storage class`,
  commonConfusions: [
    { question: 'Is EFS faster than EBS?', answer: 'Not necessarily. EFS is shared network file storage. EBS is attached block storage and often better for low-latency single-instance disk workloads.' },
    { question: 'Can Windows use EFS?', answer: 'EFS is NFS-based and aimed at Linux clients. Windows file workloads typically use FSx for Windows File Server.' },
    { question: 'Is EFS a database replacement?', answer: 'No. It is file storage, not a transactional database.' },
  ],
  productionIssues: [
    '**Wrong storage choice** where EFS is used for database files needing low latency.',
    '**Open NFS access** allows more clients than intended.',
    '**No lifecycle policy** increases cost for old shared files.',
    '**Cross-AZ mount behavior** adds latency or data transfer cost if mount targets are missing.',
  ],
  bestPractices: [
    'Create mount targets in each AZ where clients run',
    'Restrict NFS access with security groups',
    'Use encryption in transit and at rest for sensitive data',
    'Use access points for application-specific directories',
    'Enable lifecycle policies for infrequently accessed files',
    'Validate performance for metadata-heavy workloads',
  ],
  architectNote: `EFS is excellent when the requirement is truly shared files. If the real need is object storage, use S3. If the real need is a fast disk for one instance, use EBS. Storage selection prevents many expensive production surprises.`,
  faqs: [
    { question: 'Can Lambda mount EFS?', answer: 'Yes, Lambda functions in a VPC can mount EFS, commonly for shared models, assets, or larger dependencies.' },
    { question: 'Does EFS need capacity planning?', answer: 'Capacity grows elastically, but performance, throughput mode, lifecycle, and cost still need planning.' },
  ],
  keyTakeaways: [
    'EFS is managed shared NFS storage',
    'It supports multi-AZ client access through mount targets',
    'It is not a replacement for S3, EBS, or databases',
    'Security groups, encryption, and lifecycle policies matter',
  ],
  relatedTopics: ['aws-s3', 'aws-ebs', 'aws-ec2', 'aws-subnets'],
});

export const awsIam = topic({
  slug: 'aws-iam',
  title: 'IAM',
  description: 'Understand AWS Identity and Access Management for users, groups, roles, policies, least privilege, and enterprise access governance.',
  focus: 'identity and permission control across AWS',
  whatIsIt: `AWS Identity and Access Management controls who can do what in AWS.

IAM includes users, groups, roles, policies, permissions boundaries, service-linked roles, and federation integrations. It is one of the most important AWS services for security.`,
  whyWeNeedIt: `Every AWS action should be authorized. IAM prevents unauthorized access, supports audit requirements, enables service-to-service permissions, and enforces least privilege.

Without IAM discipline, cloud environments quickly accumulate excessive permissions.`,
  realWorldUsage: `An enterprise uses federation through its identity provider for human access. Engineers assume roles for specific accounts and job functions. Applications use IAM roles attached to EC2, Lambda, or ECS instead of storing access keys.

Sensitive actions require MFA, approval workflows, and CloudTrail monitoring.`,
  howItWorks: `IAM evaluates identity-based policies, resource policies, permission boundaries, service control policies, and explicit denies.

The result determines whether a principal can perform an action on a resource under specific conditions. Explicit deny wins over allow.`,
  exampleTitle: 'Least privilege IAM policy',
  exampleDescription: 'A narrow policy allowing read access to one bucket path.',
  exampleLanguage: 'json',
  exampleCode: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::company-reports/prod/*"]
    }
  ]
}`,
  commonConfusions: [
    { question: 'Are IAM users the best option for people?', answer: 'Usually no. Enterprises should prefer federation and role assumption for human access.' },
    { question: 'What is the difference between IAM and a policy?', answer: 'IAM is the service. Policies are JSON permission documents evaluated by IAM.' },
    { question: 'Does an allow always grant access?', answer: 'No. Explicit denies, SCPs, permission boundaries, resource policies, and conditions can still block access.' },
  ],
  productionIssues: [
    '**Long-lived access keys** leak through laptops, repos, logs, or CI systems.',
    '**Overly broad policies** such as AdministratorAccess become normal for daily work.',
    '**No access review** leaves former teams or unused roles with access.',
    '**Confusing policy evaluation** causes outages or accidental exposure.',
  ],
  bestPractices: [
    'Use federation and roles for human access',
    'Use roles for AWS services instead of static credentials',
    'Apply least privilege and explicit conditions',
    'Require MFA for privileged access',
    'Review IAM Access Analyzer and CloudTrail findings',
    'Avoid wildcard actions and resources unless justified',
  ],
  architectNote: `IAM is the nervous system of AWS security. A beautiful network or application architecture can still fail an audit if identity is broad, permanent, and unreviewed.`,
  faqs: [
    { question: 'What should I say in an IAM interview?', answer: 'Explain principals, actions, resources, policies, explicit deny, roles, federation, and least privilege with a real example.' },
    { question: 'What is a principal?', answer: 'A principal is the identity making a request, such as a user, role, service, or federated identity.' },
  ],
  keyTakeaways: [
    'IAM controls AWS permissions',
    'Roles are preferred for temporary and service access',
    'Explicit deny overrides allow',
    'Least privilege and MFA are core production practices',
  ],
  relatedTopics: ['aws-roles', 'aws-policies', 'aws-mfa', 'aws-cloudtrail'],
});

export const awsRoles = topic({
  slug: 'aws-roles',
  title: 'Roles',
  description: 'Learn AWS IAM roles for temporary credentials, service permissions, cross-account access, federation, and secure application access.',
  focus: 'temporary assumable identities used by people, services, and applications',
  whatIsIt: `An IAM role is an identity with permissions that can be assumed by trusted principals.

Roles do not have permanent passwords or access keys. They provide temporary credentials through AWS Security Token Service.`,
  whyWeNeedIt: `Roles reduce the need for long-lived credentials. They let EC2, Lambda, ECS, CodeBuild, and users access only what they need for a limited time.

Roles are central to cross-account access and enterprise federation.`,
  realWorldUsage: `A production EC2 instance profile lets an orders API read from a specific S3 bucket and write logs to CloudWatch. The instance never stores an access key.

A DevOps engineer signs in through SSO and assumes a deployment role in the staging account for a short session.`,
  howItWorks: `A role has a trust policy and permission policies.

The trust policy says who can assume the role. The permission policies say what the role can do after assumption. Temporary credentials expire and are rotated automatically for AWS service roles.`,
  exampleTitle: 'Role trust and permission model',
  exampleDescription: 'A simplified service role design.',
  exampleLanguage: 'text',
  exampleCode: `Role: orders-api-role
Trusted by: EC2 service
Permissions:
  - s3:GetObject on company-orders-config/prod/*
  - logs:PutLogEvents to application log group
  - kms:Decrypt for one application key
Attached to: EC2 instance profile
Credential type: temporary credentials`,
  commonConfusions: [
    { question: 'Is a role the same as a user?', answer: 'No. A user is a long-term identity. A role is assumed temporarily by a trusted principal.' },
    { question: 'What is a trust policy?', answer: 'A trust policy defines who is allowed to assume the role.' },
    { question: 'Can roles be used across accounts?', answer: 'Yes. Cross-account role assumption is a standard enterprise pattern.' },
  ],
  productionIssues: [
    '**Trust policy too broad** allows unintended principals to assume powerful roles.',
    '**Permission policy too broad** turns service roles into lateral movement paths.',
    '**No session controls** makes privileged access hard to trace.',
    '**Using access keys instead of roles** creates avoidable credential leakage risk.',
  ],
  bestPractices: [
    'Use roles for AWS service access',
    'Use cross-account roles instead of shared users',
    'Keep trust policies narrow',
    'Use external IDs or conditions for third-party access',
    'Set session duration appropriately',
    'Monitor role assumption in CloudTrail',
  ],
  architectNote: `Roles are how mature AWS environments avoid permanent secrets. The trust policy is as important as the permission policy; one controls who gets in, the other controls what they can do.`,
  faqs: [
    { question: 'What is an instance profile?', answer: 'An instance profile is the container used to attach an IAM role to an EC2 instance.' },
    { question: 'Can Lambda use an IAM role?', answer: 'Yes. Every Lambda function runs with an execution role that grants permissions to AWS services.' },
  ],
  keyTakeaways: [
    'Roles provide temporary credentials',
    'Trust policy defines who can assume the role',
    'Permission policies define what the role can do',
    'Roles are preferred over long-lived access keys',
  ],
  relatedTopics: ['aws-iam', 'aws-policies', 'aws-ec2', 'aws-lambda'],
});

export const awsPolicies = topic({
  slug: 'aws-policies',
  title: 'Policies',
  description: 'Understand IAM policies, resource policies, conditions, explicit deny, least privilege, and policy evaluation.',
  focus: 'JSON permission documents that authorize or deny AWS actions',
  whatIsIt: `AWS policies are documents that define permissions.

IAM identity policies attach to users, groups, and roles. Resource policies attach to resources such as S3 buckets, KMS keys, Lambda functions, and SQS queues. Service control policies restrict accounts in AWS Organizations.`,
  whyWeNeedIt: `Policies are how teams express least privilege, separation of duties, environment boundaries, and compliance controls.

Correct policies allow applications to work while preventing unnecessary access.`,
  realWorldUsage: `A payment service role may read one Secrets Manager secret, decrypt using one KMS key, write to one DynamoDB table, and publish to one EventBridge bus.

The S3 bucket policy may separately deny all non-TLS access and deny uploads without encryption.`,
  howItWorks: `A policy statement includes Effect, Action, Resource, and optional Condition.

During authorization, AWS evaluates all applicable policies. Explicit deny wins. Then AWS checks whether an allow exists and whether conditions match.`,
  exampleTitle: 'Policy with condition',
  exampleDescription: 'Deny insecure S3 transport with a bucket policy.',
  exampleLanguage: 'json',
  exampleCode: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::company-docs",
        "arn:aws:s3:::company-docs/*"
      ],
      "Condition": {
        "Bool": { "aws:SecureTransport": "false" }
      }
    }
  ]
}`,
  commonConfusions: [
    { question: 'What is the difference between identity and resource policies?', answer: 'Identity policies grant permissions to principals. Resource policies define who can access the resource.' },
    { question: 'Why did access fail even with an allow?', answer: 'An explicit deny, condition mismatch, SCP, boundary, missing resource policy, or KMS policy may block access.' },
    { question: 'Are managed policies always safe?', answer: 'AWS managed policies are convenient, but they may be broader than a workload needs.' },
  ],
  productionIssues: [
    '**Wildcard permissions** grant more access than needed.',
    '**Missing conditions** allows access from unexpected networks, accounts, or encryption states.',
    '**Policy sprawl** makes it unclear why a principal has access.',
    '**KMS key policy mismatch** breaks otherwise valid service access.',
  ],
  bestPractices: [
    'Use least privilege with specific actions and resources',
    'Use conditions for MFA, TLS, source VPC, tags, and encryption where appropriate',
    'Prefer customer-managed policies for application roles',
    'Use explicit deny for mandatory guardrails',
    'Analyze policies with IAM Access Analyzer',
    'Review permissions regularly and remove unused access',
  ],
  architectNote: `Policy design is architecture. It defines who can cross boundaries. Senior engineers debug AWS access by walking policy evaluation calmly instead of randomly adding permissions.`,
  faqs: [
    { question: 'What are the main parts of a policy statement?', answer: 'Effect, Action, Resource, Principal for resource policies, and optional Condition.' },
    { question: 'What does explicit deny do?', answer: 'Explicit deny overrides any allow from other applicable policies.' },
  ],
  keyTakeaways: [
    'Policies define AWS authorization',
    'Explicit deny has highest priority',
    'Resource and identity policies can both matter',
    'Conditions make policies safer and more precise',
  ],
  relatedTopics: ['aws-iam', 'aws-roles', 'aws-s3', 'aws-cloudtrail'],
});

export const awsMfa = topic({
  slug: 'aws-mfa',
  title: 'MFA',
  description: 'Learn multi-factor authentication in AWS for protecting privileged access, root users, role assumption, and sensitive operations.',
  focus: 'stronger authentication for human access to AWS',
  whatIsIt: `Multi-factor authentication requires a second proof beyond a password.

In AWS, MFA is commonly enforced for root users, privileged IAM users, federated access, and sensitive role assumption workflows.`,
  whyWeNeedIt: `Passwords and access portals can be compromised. MFA reduces the chance that stolen credentials become successful AWS access.

For enterprise AWS, MFA is a baseline control for administrators and production access.`,
  realWorldUsage: `An enterprise enables MFA for the root user in every account, disables daily root usage, and enforces MFA through its identity provider for AWS SSO.

Privileged roles require MFA context, and CloudTrail alarms alert on root usage or suspicious console activity.`,
  howItWorks: `Users authenticate with a password or identity provider and then provide a second factor such as a virtual authenticator, hardware key, or enterprise MFA push.

IAM policies can require MFA using conditions such as aws:MultiFactorAuthPresent for sensitive actions.`,
  exampleTitle: 'MFA-required policy idea',
  exampleDescription: 'A simplified IAM condition requiring MFA for sensitive actions.',
  exampleLanguage: 'json',
  exampleCode: `{
  "Effect": "Deny",
  "Action": ["iam:*", "organizations:*"],
  "Resource": "*",
  "Condition": {
    "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" }
  }
}`,
  commonConfusions: [
    { question: 'Is MFA only for root users?', answer: 'No. Root MFA is mandatory hygiene, but privileged human access should also require MFA.' },
    { question: 'Does MFA protect access keys?', answer: 'Not directly. Long-lived access keys are still risky and should be avoided or tightly controlled.' },
    { question: 'Can MFA be enforced through SSO?', answer: 'Yes. Many enterprises enforce MFA in their identity provider and use AWS IAM Identity Center.' },
  ],
  productionIssues: [
    '**Root account without MFA** creates severe account takeover risk.',
    '**Break-glass access not tested** causes lockouts during incidents.',
    '**Shared admin users** make MFA and audit attribution weak.',
    '**Access keys bypass human MFA expectations** if not governed.',
  ],
  bestPractices: [
    'Enable MFA on every AWS root user',
    'Use federated access with enterprise MFA for humans',
    'Require MFA for privileged role assumption',
    'Avoid shared users and long-lived admin access keys',
    'Create and test break-glass procedures',
    'Alert on root user activity',
  ],
  architectNote: `MFA is a control, not a complete identity strategy. Pair it with federation, roles, least privilege, logging, and tested emergency access.`,
  faqs: [
    { question: 'What should I say about MFA in interviews?', answer: 'Explain that MFA protects human authentication, especially root and privileged roles, but service credentials should use roles instead of access keys.' },
    { question: 'Should root be used daily?', answer: 'No. Root should be locked down, protected by MFA, and used only for tasks that require it.' },
  ],
  keyTakeaways: [
    'MFA reduces risk from stolen passwords',
    'Root users must have MFA',
    'Privileged roles should require strong authentication',
    'MFA does not replace least privilege or role-based access',
  ],
  relatedTopics: ['aws-iam', 'aws-roles', 'aws-cloudtrail'],
});

export const awsVpc = topic({
  slug: 'aws-vpc',
  title: 'VPC',
  description: 'Understand Amazon VPC as the private network boundary for subnets, routing, security groups, NAT, load balancers, and workload isolation.',
  focus: 'logically isolated cloud networking for AWS workloads',
  whatIsIt: `Amazon Virtual Private Cloud lets you create an isolated network in AWS.

A VPC contains subnets, route tables, security groups, network ACLs, gateways, endpoints, and connectivity to other networks.`,
  whyWeNeedIt: `Applications need network boundaries. A VPC controls where workloads run, what can be public, what stays private, and how traffic reaches databases, AWS services, corporate networks, and the internet.`,
  realWorldUsage: `A production account may have a VPC with public subnets for load balancers, private subnets for application services, isolated subnets for databases, NAT gateways for controlled outbound internet, and VPC endpoints for private AWS service access.

Network diagrams and route tables are reviewed during architecture approval.`,
  howItWorks: `You choose a CIDR block for the VPC, create subnets in AZs, attach route tables, add internet or NAT gateways, and apply security controls.

Resources launch into subnets and receive network access based on routing plus security rules.`,
  exampleTitle: 'Three-tier VPC layout',
  exampleDescription: 'A common enterprise VPC segmentation model.',
  exampleLanguage: 'text',
  exampleCode: `VPC CIDR: 10.20.0.0/16
Public subnets:
  - ALB, public ingress
Private app subnets:
  - EC2/ECS services, outbound through NAT
Private data subnets:
  - RDS, no direct internet route
VPC endpoints:
  - S3, CloudWatch, Secrets Manager
Connectivity:
  - VPN or Direct Connect for corporate network`,
  commonConfusions: [
    { question: 'Is a VPC the same as a subnet?', answer: 'No. A VPC is the overall network boundary. Subnets are IP ranges inside the VPC, placed in AZs.' },
    { question: 'Does private subnet mean no internet at all?', answer: 'Private usually means no direct inbound internet route. Outbound internet can still happen through NAT if configured.' },
    { question: 'Are security groups part of VPC?', answer: 'Yes. Security groups are VPC-level firewall controls attached to resources.' },
  ],
  productionIssues: [
    '**Poor CIDR planning** causes overlap with corporate networks or future peering.',
    '**Flat networks** put public apps and databases in the same exposure zone.',
    '**Missing VPC endpoints** sends private service traffic through NAT unnecessarily.',
    '**Route table mistakes** expose private subnets or break outbound access.',
  ],
  bestPractices: [
    'Plan CIDR ranges before account expansion',
    'Separate public, private app, and data subnets',
    'Use private subnets for application and database tiers',
    'Use VPC endpoints for private access to AWS services where practical',
    'Document route tables and network ownership',
    'Review network paths during threat modeling',
  ],
  architectNote: `VPC design is hard to change after many workloads depend on it. A little planning around CIDR, subnet tiers, endpoints, and routing prevents years of network friction.`,
  faqs: [
    { question: 'What is the default VPC?', answer: 'AWS creates default VPCs in many accounts for easy starts, but enterprises often build controlled VPCs instead.' },
    { question: 'Can two VPCs communicate?', answer: 'Yes, through VPC peering, Transit Gateway, VPN, Direct Connect, or PrivateLink patterns depending on needs.' },
  ],
  keyTakeaways: [
    'VPC is the network boundary for many AWS workloads',
    'Subnets, routing, and security controls shape exposure',
    'CIDR planning matters long term',
    'Private workloads still need designed outbound and service access',
  ],
  relatedTopics: ['aws-subnets', 'aws-route-tables', 'aws-security-groups', 'aws-nat-gateway'],
});

export const awsSubnets = topic({
  slug: 'aws-subnets',
  title: 'Subnets',
  description: 'Learn AWS subnets as AZ-scoped network segments for public, private, and isolated workload placement.',
  focus: 'AZ-specific IP ranges that organize resources by access tier',
  whatIsIt: `A subnet is a range of IP addresses inside a VPC. Each subnet exists in exactly one Availability Zone.

Subnets are usually categorized by routing behavior: public, private, or isolated.`,
  whyWeNeedIt: `Subnets let architects place resources based on exposure and failure domain.

Load balancers may live in public subnets, applications in private subnets, and databases in isolated private subnets.`,
  realWorldUsage: `A production VPC might create the same subnet tiers in three AZs:
- public-a, public-b, public-c
- app-a, app-b, app-c
- data-a, data-b, data-c

This allows multi-AZ application and database deployments with consistent routing.`,
  howItWorks: `A subnet inherits the VPC CIDR boundary but has its own CIDR slice. Its route table determines whether it is public or private.

A public subnet has a route to an internet gateway and resources can use public IPs. A private subnet usually routes outbound internet through NAT. An isolated subnet has no internet route.`,
  exampleTitle: 'Subnet tiering model',
  exampleDescription: 'A practical subnet plan for a three-tier app.',
  exampleLanguage: 'text',
  exampleCode: `public-a  10.20.0.0/24  -> internet gateway
public-b  10.20.1.0/24  -> internet gateway
app-a     10.20.10.0/24 -> NAT gateway
app-b     10.20.11.0/24 -> NAT gateway
data-a    10.20.20.0/24 -> no internet route
data-b    10.20.21.0/24 -> no internet route`,
  commonConfusions: [
    { question: 'What makes a subnet public?', answer: 'Its route table has a route to an internet gateway and resources have public IP behavior.' },
    { question: 'Can one subnet span multiple AZs?', answer: 'No. A subnet belongs to one AZ only.' },
    { question: 'Should databases be in public subnets?', answer: 'Almost never. Databases should usually be in private or isolated data subnets.' },
  ],
  productionIssues: [
    '**Subnets too small** block Auto Scaling and managed service placement.',
    '**Database in public subnet** creates unnecessary exposure.',
    '**Only one AZ subnet tier** prevents high availability.',
    '**Inconsistent route tables** make one AZ behave differently from another.',
  ],
  bestPractices: [
    'Create matching subnet tiers across multiple AZs',
    'Leave enough IP capacity for scaling and managed service overhead',
    'Use public subnets only for resources that must receive public traffic',
    'Place app and data tiers in private subnets',
    'Name subnets clearly by tier and AZ',
    'Review subnet routes before deploying sensitive resources',
  ],
  architectNote: `Subnets are placement decisions. They express which systems can be reached, how they fail by AZ, and how much future scale the network can support.`,
  faqs: [
    { question: 'Can a subnet route table be changed later?', answer: 'Yes, but changing routes can immediately affect traffic. Production changes should be planned and tested.' },
    { question: 'How large should subnets be?', answer: 'Large enough for peak scale, deployment surge, managed service reservations, and future growth. Avoid tiny production subnets.' },
  ],
  keyTakeaways: [
    'Subnets are AZ-scoped',
    'Route tables decide public/private behavior',
    'Subnet tiers support clean architecture boundaries',
    'IP capacity planning prevents scaling failures',
  ],
  relatedTopics: ['aws-vpc', 'aws-route-tables', 'aws-regions-availability-zones'],
});

export const awsSecurityGroups = topic({
  slug: 'aws-security-groups',
  title: 'Security Groups',
  description: 'Understand AWS security groups as stateful firewall rules for EC2, load balancers, databases, and other VPC resources.',
  focus: 'stateful network access control attached to resources',
  whatIsIt: `A security group is a virtual firewall for AWS resources in a VPC.

It controls inbound and outbound traffic using allow rules. Security groups are stateful, so return traffic for allowed connections is automatically permitted.`,
  whyWeNeedIt: `Security groups enforce network least privilege.

They prevent direct exposure of application, database, and admin ports and help express which tiers are allowed to communicate.`,
  realWorldUsage: `A web app may use three security groups:
- ALB allows inbound HTTPS from the internet
- App allows inbound app port only from ALB security group
- DB allows inbound database port only from app security group

This creates tiered network access without hardcoding IPs.`,
  howItWorks: `Rules specify protocol, port, and source or destination. Sources can be CIDR ranges or other security groups.

Because security groups are stateful, you usually define inbound access carefully and keep outbound access controlled based on enterprise policy.`,
  exampleTitle: 'Tiered security group model',
  exampleDescription: 'Rules for a private application behind an ALB.',
  exampleLanguage: 'text',
  exampleCode: `alb-sg:
  inbound: 443 from 0.0.0.0/0
  outbound: app port to app-sg

app-sg:
  inbound: app port from alb-sg
  outbound: 5432 to db-sg, 443 to AWS endpoints

db-sg:
  inbound: 5432 from app-sg
  outbound: minimal required responses`,
  commonConfusions: [
    { question: 'Are security groups stateless?', answer: 'No. Security groups are stateful. Network ACLs are stateless.' },
    { question: 'Can security groups deny traffic?', answer: 'Security groups only contain allow rules. Lack of allow means traffic is denied.' },
    { question: 'Should I use IPs or security group references?', answer: 'Use security group references for tier-to-tier access where possible because instances can scale and change IPs.' },
  ],
  productionIssues: [
    '**0.0.0.0/0 on admin ports** exposes SSH, RDP, or databases to the internet.',
    '**Too many broad outbound rules** allow unnecessary data exfiltration paths.',
    '**IP-based app rules** break when Auto Scaling replaces instances.',
    '**Rule sprawl** makes firewall intent impossible to audit.',
  ],
  bestPractices: [
    'Allow only required inbound ports',
    'Reference security groups between tiers',
    'Avoid public admin access; use SSM or VPN patterns',
    'Review broad CIDR rules regularly',
    'Name security groups by application and tier',
    'Use infrastructure as code for rule ownership',
  ],
  architectNote: `Security groups are one of the clearest expressions of architecture. If the rules are broad and confusing, the system boundaries are probably broad and confusing too.`,
  faqs: [
    { question: 'What is the difference between security groups and NACLs?', answer: 'Security groups are stateful resource-level controls. Network ACLs are stateless subnet-level controls.' },
    { question: 'Can one resource have multiple security groups?', answer: 'Yes. The effective access is the union of allow rules across attached security groups.' },
  ],
  keyTakeaways: [
    'Security groups are stateful firewalls',
    'Rules allow traffic; missing allow denies traffic',
    'Security group references support scalable tier access',
    'Avoid public exposure of admin and database ports',
  ],
  relatedTopics: ['aws-vpc', 'aws-subnets', 'aws-load-balancer', 'aws-ec2'],
});

export const awsRouteTables = topic({
  slug: 'aws-route-tables',
  title: 'Route Tables',
  description: 'Learn AWS route tables for deciding where subnet traffic goes, including internet gateways, NAT gateways, VPC endpoints, and peering.',
  focus: 'network routing rules that define traffic paths in a VPC',
  whatIsIt: `A route table contains rules that determine where network traffic goes.

Each subnet is associated with a route table. Routes can point to local VPC networks, internet gateways, NAT gateways, VPC endpoints, Transit Gateway, peering connections, and other targets.`,
  whyWeNeedIt: `Routing decides whether a subnet is public, private, isolated, connected to another VPC, or able to reach AWS services privately.

Without correct routes, applications cannot reach dependencies or may be exposed unintentionally.`,
  realWorldUsage: `Public subnets route 0.0.0.0/0 to an internet gateway. Private app subnets route outbound internet to NAT gateways. Data subnets may have no internet route, but may use VPC endpoints for S3, CloudWatch, or Secrets Manager.

This makes route tables a core security and availability artifact.`,
  howItWorks: `When a packet leaves a resource, AWS checks the subnet's route table for the most specific matching destination.

Local VPC routes exist automatically. Additional routes determine external connectivity and private service access.`,
  exampleTitle: 'Route table comparison',
  exampleDescription: 'Public, private, and isolated subnet routing.',
  exampleLanguage: 'text',
  exampleCode: `Public route table:
  10.20.0.0/16 -> local
  0.0.0.0/0    -> internet gateway

Private app route table:
  10.20.0.0/16 -> local
  0.0.0.0/0    -> NAT gateway

Data route table:
  10.20.0.0/16 -> local
  S3 prefix     -> VPC endpoint`,
  commonConfusions: [
    { question: 'Does a route table allow traffic by itself?', answer: 'No. Routing provides a path. Security groups, NACLs, and service policies still control access.' },
    { question: 'What makes a route more specific?', answer: 'The longest matching CIDR prefix wins, such as 10.20.1.0/24 over 10.20.0.0/16.' },
    { question: 'Can one subnet use multiple route tables?', answer: 'A subnet is associated with one route table at a time.' },
  ],
  productionIssues: [
    '**Private subnet accidentally public** because default route points to an internet gateway.',
    '**Wrong NAT route** sends traffic across AZs or to a failed dependency.',
    '**Overlapping CIDRs** break peering and hybrid connectivity.',
    '**Missing endpoint routes** causes service access failures or unnecessary NAT cost.',
  ],
  bestPractices: [
    'Keep separate route tables for public, app, and data tiers',
    'Review default routes during security reviews',
    'Use VPC endpoints to reduce NAT dependency where suitable',
    'Avoid cross-AZ NAT routing for resilient designs',
    'Document hybrid and peering routes clearly',
    'Manage routes through IaC',
  ],
  architectNote: `Route tables are where network intent becomes reality. When an outage says "the app cannot reach X", routes are one of the first places a senior engineer checks.`,
  faqs: [
    { question: 'Can a route table make a subnet public?', answer: 'Yes, if it routes internet traffic to an internet gateway and resources can use public IPs.' },
    { question: 'Do route tables replace security groups?', answer: 'No. Routing and firewall controls solve different parts of network access.' },
  ],
  keyTakeaways: [
    'Route tables decide traffic paths',
    'Subnet routing determines public, private, or isolated behavior',
    'Routing does not replace firewall authorization',
    'IaC and documentation are important for network routes',
  ],
  relatedTopics: ['aws-vpc', 'aws-subnets', 'aws-nat-gateway', 'aws-security-groups'],
});

export const awsNatGateway = topic({
  slug: 'aws-nat-gateway',
  title: 'NAT Gateway',
  description: 'Understand NAT Gateway for private subnet outbound internet access, including cost, AZ placement, routing, and alternatives.',
  focus: 'managed outbound internet access for private subnets',
  whatIsIt: `A NAT Gateway lets resources in private subnets initiate outbound internet connections without allowing unsolicited inbound internet connections.

It is commonly used for package downloads, external APIs, patches, and SaaS integrations from private workloads.`,
  whyWeNeedIt: `Private application servers often need outbound access but should not be directly reachable from the internet.

NAT Gateway supports that pattern by translating private addresses to a public address for outbound traffic.`,
  realWorldUsage: `Application instances in private subnets route 0.0.0.0/0 to a NAT Gateway in the same AZ. The NAT Gateway sits in a public subnet with an Elastic IP.

Enterprises often reduce NAT usage by adding VPC endpoints for AWS services such as S3, ECR, CloudWatch, and Secrets Manager.`,
  howItWorks: `A private subnet route table points internet-bound traffic to a NAT Gateway. The NAT Gateway forwards traffic through the public subnet's internet gateway and tracks connection state for return traffic.

NAT Gateway is AZ-scoped, so resilient designs place one NAT Gateway per AZ and route private subnets to the local NAT.`,
  exampleTitle: 'NAT route design',
  exampleDescription: 'Private subnet outbound routing with AZ alignment.',
  exampleLanguage: 'text',
  exampleCode: `app-subnet-a route:
  0.0.0.0/0 -> nat-gateway-a

app-subnet-b route:
  0.0.0.0/0 -> nat-gateway-b

Public NAT subnets:
  nat-gateway-a -> internet gateway
  nat-gateway-b -> internet gateway

Cost optimization:
  Add S3/ECR/CloudWatch VPC endpoints where useful`,
  commonConfusions: [
    { question: 'Does NAT Gateway allow inbound internet traffic?', answer: 'No. It supports outbound connections initiated by private resources.' },
    { question: 'Is NAT Gateway free?', answer: 'No. It has hourly and data processing charges, so architecture should watch usage.' },
    { question: 'Do I need NAT to reach S3?', answer: 'Not necessarily. You can use an S3 VPC endpoint to avoid routing S3 traffic through NAT.' },
  ],
  productionIssues: [
    '**Single NAT Gateway** creates AZ dependency or outage impact.',
    '**Unexpected NAT cost** from high-volume AWS service or data transfer traffic.',
    '**Wrong route table** leaves private instances without outbound access.',
    '**Using NAT for everything** ignores cheaper and more private VPC endpoint options.',
  ],
  bestPractices: [
    'Use one NAT Gateway per AZ for critical multi-AZ workloads',
    'Route private subnets to the NAT Gateway in the same AZ',
    'Use VPC endpoints for common AWS service traffic',
    'Monitor NAT bytes, errors, and cost',
    'Avoid placing application servers in public subnets just for outbound access',
    'Document which workloads require internet egress',
  ],
  architectNote: `NAT Gateway is convenient, reliable, and easy to forget on the bill. Good architects design egress intentionally: what needs internet, what can use private endpoints, and what should be blocked entirely.`,
  faqs: [
    { question: 'Can NAT Gateway be used for inbound access?', answer: 'No. Use a load balancer, API Gateway, VPN, or other ingress pattern for inbound traffic.' },
    { question: 'What is the alternative to NAT Gateway?', answer: 'For AWS service access, VPC endpoints are often better. For controlled external access, some enterprises use proxies or egress firewalls.' },
  ],
  keyTakeaways: [
    'NAT Gateway enables private subnet outbound internet',
    'It does not allow unsolicited inbound traffic',
    'AZ placement matters for resilience',
    'VPC endpoints can reduce cost and improve privacy',
  ],
  relatedTopics: ['aws-vpc', 'aws-route-tables', 'aws-subnets', 'aws-cost-optimization'],
});

export const awsLambda = topic({
  slug: 'aws-lambda',
  title: 'Lambda',
  description: 'Learn AWS Lambda serverless functions for event-driven workloads, APIs, background jobs, automation, and production operations.',
  focus: 'serverless compute that runs code in response to events',
  whatIsIt: `AWS Lambda runs code without managing servers.

Functions are invoked by events from services such as API Gateway, S3, EventBridge, SQS, DynamoDB Streams, or direct SDK calls.`,
  whyWeNeedIt: `Lambda is useful for workloads that are event-driven, bursty, short-running, or operationally simpler without server management.

It helps teams build APIs, automation, file processing, scheduled jobs, and integration workflows with less infrastructure overhead.`,
  realWorldUsage: `A document-processing platform uses S3 upload events to invoke Lambda. The function validates metadata, calls a scanning service, writes results to DynamoDB, and emits an EventBridge event for downstream systems.

CloudWatch alarms track errors, duration, throttles, and dead-letter handling.`,
  howItWorks: `A Lambda function has code, runtime, handler, memory, timeout, environment variables, execution role, and event sources.

AWS manages the runtime infrastructure. The customer manages code, IAM permissions, dependencies, concurrency, observability, and event failure behavior.`,
  exampleTitle: 'Event-driven Lambda flow',
  exampleDescription: 'A common S3-to-Lambda processing pattern.',
  exampleLanguage: 'text',
  exampleCode: `S3 object created
  -> Lambda invoked
  -> Validate object metadata
  -> Process or scan file
  -> Write result to DynamoDB
  -> Publish EventBridge event
  -> CloudWatch alarm on errors/throttles`,
  commonConfusions: [
    { question: 'Is Lambda always cheaper than EC2?', answer: 'No. Lambda can be cheaper for bursty workloads, but steady high-throughput workloads may be cheaper on containers or EC2.' },
    { question: 'Does Lambda remove all operations?', answer: 'No. You still operate code, IAM, concurrency, retries, logs, alarms, and failure paths.' },
    { question: 'Can Lambda run forever?', answer: 'No. Lambda has execution time limits and is best for bounded work.' },
  ],
  productionIssues: [
    '**Overly broad execution roles** give functions unnecessary access.',
    '**No idempotency** causes duplicate event processing damage.',
    '**Cold starts** affect latency-sensitive functions.',
    '**No dead-letter or retry strategy** loses or repeats work unpredictably.',
    '**Unbounded concurrency** overloads downstream services.',
  ],
  bestPractices: [
    'Design functions to be idempotent',
    'Use least privilege execution roles',
    'Set timeouts and memory deliberately',
    'Configure reserved concurrency for critical downstream protection',
    'Use DLQs or destinations for failure handling',
    'Emit structured logs and useful business metrics',
  ],
  architectNote: `Lambda works best when the architecture is event-aware. If a function secretly becomes a long-running server or a transaction coordinator, serverless simplicity disappears quickly.`,
  faqs: [
    { question: 'What is a cold start?', answer: 'A cold start happens when AWS initializes a new execution environment before running function code, adding startup latency.' },
    { question: 'When should I avoid Lambda?', answer: 'Avoid it for long-running jobs, heavy steady compute, workloads needing server-level control, or systems with complex local state.' },
  ],
  keyTakeaways: [
    'Lambda runs code in response to events',
    'No servers does not mean no operations',
    'IAM, idempotency, concurrency, and retries are central',
    'Serverless is strongest for bounded event-driven work',
  ],
  relatedTopics: ['aws-api-gateway', 'aws-eventbridge', 'aws-cloudwatch', 'aws-roles'],
});

export const awsApiGateway = topic({
  slug: 'aws-api-gateway',
  title: 'API Gateway',
  description: 'Understand Amazon API Gateway for exposing REST, HTTP, and WebSocket APIs with routing, auth, throttling, stages, and Lambda integration.',
  focus: 'managed API front door for serverless and service integrations',
  whatIsIt: `Amazon API Gateway creates, secures, deploys, and manages APIs.

It can route requests to Lambda, HTTP backends, AWS service integrations, and WebSocket connections.`,
  whyWeNeedIt: `Applications need a controlled API entry point with routing, authentication, throttling, logging, CORS, custom domains, and deployment stages.

API Gateway is especially common with Lambda-based serverless applications.`,
  realWorldUsage: `A mobile banking application exposes /payments, /accounts, and /profile through API Gateway. Cognito or JWT authorizers validate users, Lambda functions handle business logic, throttling protects backends, and CloudWatch logs support debugging.

Custom domains and stage deployments separate dev, test, and production.`,
  howItWorks: `Clients call an API Gateway endpoint. Routes and methods match the request, authorizers validate access, request/response transformations may run, and the configured integration receives the request.

API Gateway can enforce throttling and produce access logs for operations.`,
  exampleTitle: 'Serverless API layout',
  exampleDescription: 'A simple API Gateway to Lambda architecture.',
  exampleLanguage: 'text',
  exampleCode: `Custom domain: api.company.com
Stage: prod
Route: GET /orders     -> listOrders Lambda
Route: POST /orders    -> createOrder Lambda
Authorizer: JWT/Cognito
Controls: throttling, access logs, CORS
Monitoring: 4xx, 5xx, latency, integration errors`,
  commonConfusions: [
    { question: 'Is API Gateway the same as a load balancer?', answer: 'No. API Gateway is an API management front door. Load balancers distribute network/application traffic to targets.' },
    { question: 'Do I need API Gateway for every Lambda?', answer: 'No. Lambda can be invoked by many event sources. API Gateway is for HTTP/WebSocket API exposure.' },
    { question: 'Why do I get CORS errors?', answer: 'CORS requires correct headers for browser clients, including error responses and preflight behavior.' },
  ],
  productionIssues: [
    '**Missing throttling** lets clients overload backends or increase cost.',
    '**Weak auth configuration** exposes APIs unintentionally.',
    '**Poor logging** makes API incidents hard to trace.',
    '**CORS misconfiguration** breaks browser applications.',
    '**Timeout mismatch** causes confusing client and integration failures.',
  ],
  bestPractices: [
    'Use custom domains and clear stage strategy',
    'Enforce authentication and authorization deliberately',
    'Configure throttling and usage controls',
    'Enable structured access logs',
    'Monitor latency, 4xx, 5xx, and integration errors',
    'Keep API contracts documented and versioned',
  ],
  architectNote: `API Gateway is not just a URL in front of Lambda. It is the contract boundary for clients, auth, throttling, observability, and deployment lifecycle.`,
  faqs: [
    { question: 'HTTP API or REST API?', answer: 'HTTP APIs are simpler and often cheaper for common use cases. REST APIs offer more mature feature depth for complex API management needs.' },
    { question: 'Can API Gateway call services other than Lambda?', answer: 'Yes. It can integrate with HTTP backends and several AWS services.' },
  ],
  keyTakeaways: [
    'API Gateway manages API entry points',
    'It commonly fronts Lambda functions',
    'Auth, throttling, logging, and CORS are production-critical',
    'It is different from a load balancer',
  ],
  relatedTopics: ['aws-lambda', 'aws-eventbridge', 'aws-cloudwatch', 'aws-load-balancer'],
});

export const awsEventBridge = topic({
  slug: 'aws-eventbridge',
  title: 'EventBridge',
  description: 'Learn Amazon EventBridge for event buses, routing rules, SaaS integrations, decoupled architecture, and event-driven systems.',
  focus: 'event routing between applications, AWS services, and SaaS systems',
  whatIsIt: `Amazon EventBridge is a serverless event bus service.

It receives events, matches them against rules, and routes them to targets such as Lambda, Step Functions, SQS, SNS, Kinesis, API destinations, and other event buses.`,
  whyWeNeedIt: `EventBridge helps decouple systems. Producers publish events without knowing every consumer, and consumers subscribe to events that matter.

This supports integration, workflow triggers, audit streams, and domain-event architecture.`,
  realWorldUsage: `An order service publishes OrderCreated events to an event bus. Billing, inventory, notifications, and analytics subscribe with their own rules.

If notification processing fails, it can be retried or sent to a dead-letter queue without blocking order creation.`,
  howItWorks: `Events are JSON documents with source, detail-type, detail, time, and metadata. Rules match event patterns and send matching events to targets.

Event buses can be default, custom, partner, or cross-account. Archives and replays can support recovery and testing.`,
  exampleTitle: 'Domain event example',
  exampleDescription: 'A simple EventBridge event and routing intent.',
  exampleLanguage: 'json',
  exampleCode: `{
  "Source": "com.company.orders",
  "DetailType": "OrderCreated",
  "Detail": {
    "orderId": "ORD-10042",
    "customerId": "C-91",
    "amount": 149.99
  },
  "Targets": ["billing", "inventory", "notifications"]
}`,
  commonConfusions: [
    { question: 'Is EventBridge the same as SNS?', answer: 'No. SNS is pub/sub messaging. EventBridge adds event buses, content-based routing, SaaS integrations, archives, and event patterns.' },
    { question: 'Does EventBridge guarantee business transaction consistency?', answer: 'No. It routes events. Applications still need idempotency, consistency design, and failure handling.' },
    { question: 'Should every service publish every internal change?', answer: 'No. Publish meaningful domain events with stable contracts.' },
  ],
  productionIssues: [
    '**No event contract ownership** causes consumers to break when producers change payloads.',
    '**Missing idempotency** duplicates side effects during retries.',
    '**Overly broad rules** send events to the wrong consumers.',
    '**No DLQ or replay plan** makes event loss or bad processing hard to recover from.',
  ],
  bestPractices: [
    'Define stable event schemas and ownership',
    'Use idempotent consumers',
    'Add DLQs for critical targets',
    'Use archives and replay where recovery matters',
    'Use clear source and detail-type naming',
    'Monitor failed invocations and target errors',
  ],
  architectNote: `EventBridge is powerful when events are treated as contracts. Without schema ownership and idempotent consumers, event-driven architecture becomes distributed guesswork.`,
  faqs: [
    { question: 'When should I use EventBridge?', answer: 'Use it when multiple systems need to react to business or system events without tight coupling.' },
    { question: 'Can EventBridge work across accounts?', answer: 'Yes. Cross-account event buses are common in enterprise multi-account architectures.' },
  ],
  keyTakeaways: [
    'EventBridge routes events using rules',
    'It supports decoupled event-driven architecture',
    'Event contracts and idempotency are critical',
    'DLQ, archive, replay, and monitoring improve production resilience',
  ],
  relatedTopics: ['aws-lambda', 'aws-api-gateway', 'aws-cloudwatch'],
});

export const awsRds = topic({
  slug: 'aws-rds',
  title: 'RDS',
  description: 'Understand Amazon RDS managed relational databases, Multi-AZ, backups, read replicas, patching, security, and production operations.',
  focus: 'managed relational database service for SQL workloads',
  whatIsIt: `Amazon RDS is a managed relational database service.

It supports engines such as MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Amazon Aurora variants through related managed offerings.`,
  whyWeNeedIt: `Relational databases need backups, patching, monitoring, failover, storage scaling, security, and maintenance.

RDS reduces operational burden so teams can focus on schema, queries, application behavior, and data governance.`,
  realWorldUsage: `A Spring Boot order service may use RDS PostgreSQL in private database subnets with Multi-AZ enabled. The app connects through Secrets Manager credentials, security groups restrict access, automated backups are retained, and CloudWatch alarms track CPU, connections, replica lag, storage, and latency.`,
  howItWorks: `You choose an engine, instance class, storage, subnet group, security group, backup window, maintenance window, encryption, and high-availability options.

RDS manages database infrastructure tasks such as backups and certain patching workflows. The customer still owns schema design, queries, access control, and data protection choices.`,
  exampleTitle: 'RDS production baseline',
  exampleDescription: 'A baseline configuration for a critical relational database.',
  exampleLanguage: 'text',
  exampleCode: `Engine: PostgreSQL
Network: private DB subnets
Availability: Multi-AZ
Security: encrypted, no public access, SG from app only
Credentials: Secrets Manager rotation plan
Backups: automated backups, tested restore
Monitoring: enhanced monitoring, slow query logs, alarms
Operations: maintenance window and parameter group governance`,
  commonConfusions: [
    { question: 'Does RDS remove the need for DBAs?', answer: 'No. It reduces infrastructure administration, but schema design, query tuning, access, and data lifecycle still need ownership.' },
    { question: 'Is Multi-AZ the same as a read replica?', answer: 'No. Multi-AZ is primarily high availability/failover. Read replicas are for read scaling and some DR patterns.' },
    { question: 'Can RDS be public?', answer: 'It can, but production databases should almost always be private.' },
  ],
  productionIssues: [
    '**No tested restore** means backups exist but recovery confidence is low.',
    '**Connection storms** exhaust database connections after deployments or scaling.',
    '**Public database exposure** creates severe security risk.',
    '**No slow query monitoring** lets query regressions become outages.',
    '**Storage autoscaling assumptions** hide cost or performance limits.',
  ],
  bestPractices: [
    'Deploy production RDS in private subnets',
    'Enable Multi-AZ for critical databases',
    'Encrypt storage and manage credentials securely',
    'Test backup restore and point-in-time recovery',
    'Use connection pooling for application fleets',
    'Monitor connections, CPU, storage, IOPS, latency, and slow queries',
  ],
  architectNote: `RDS manages the database platform, not your data model. Most painful database incidents still come from application behavior: connection leaks, bad queries, missing indexes, and untested recovery.`,
  faqs: [
    { question: 'When should I use RDS over DynamoDB?', answer: 'Use RDS for relational models, SQL queries, joins, transactions, and established relational workflows. Use DynamoDB for key-value/document access at high scale with known access patterns.' },
    { question: 'What does Multi-AZ do?', answer: 'It provides a standby or replicated database architecture for failover within a Region, depending on engine and configuration.' },
  ],
  keyTakeaways: [
    'RDS is managed relational database infrastructure',
    'Customers still own schema, queries, and access',
    'Multi-AZ, backups, encryption, and monitoring are production basics',
    'Connection management is a common application responsibility',
  ],
  relatedTopics: ['aws-dynamodb', 'aws-subnets', 'aws-security-groups', 'aws-cloudwatch'],
});

export const awsDynamodb = topic({
  slug: 'aws-dynamodb',
  title: 'DynamoDB',
  description: 'Learn Amazon DynamoDB NoSQL design, partition keys, throughput, indexes, streams, TTL, and production access-pattern thinking.',
  focus: 'managed NoSQL key-value and document database at scale',
  whatIsIt: `Amazon DynamoDB is a fully managed NoSQL database for key-value and document data.

It is designed for single-digit millisecond access at large scale when data models and access patterns are designed correctly.`,
  whyWeNeedIt: `Some workloads need massive scale, low latency, flexible records, and managed operations without relational database administration.

DynamoDB is strong for shopping carts, user profiles, session state, event metadata, leaderboards, and high-volume lookup patterns.`,
  realWorldUsage: `A ticketing platform stores reservation holds in DynamoDB with partition keys based on event and seat group. TTL expires abandoned holds. Streams trigger downstream updates, and alarms watch throttling, hot partitions, and consumed capacity.

The table design starts from queries the application must answer, not from normalized entities.`,
  howItWorks: `Tables store items. Each item has a primary key, which may be partition-only or partition plus sort key. Global secondary indexes support additional access patterns.

Capacity can be on-demand or provisioned with auto scaling. Good key design distributes load across partitions.`,
  exampleTitle: 'Access-pattern-first design',
  exampleDescription: 'A DynamoDB table design sketch.',
  exampleLanguage: 'text',
  exampleCode: `Access patterns:
  1. Get order by orderId
  2. List customer orders by date
  3. Find active payment attempts

Table:
  PK: ORDER#<orderId>
  SK: METADATA

GSI1:
  PK: CUSTOMER#<customerId>
  SK: ORDER_DATE#<timestamp>

TTL:
  expiresAt for temporary records`,
  commonConfusions: [
    { question: 'Can I design DynamoDB like a relational database?', answer: 'No. DynamoDB design starts with access patterns and key design, not normalized relational modeling.' },
    { question: 'Are scans okay?', answer: 'Scans are expensive for frequent large queries. Prefer key-based queries and indexes.' },
    { question: 'Does on-demand capacity remove all scaling concerns?', answer: 'No. Hot partitions, item size, indexes, and downstream consumers still matter.' },
  ],
  productionIssues: [
    '**Hot partition keys** concentrate traffic and cause throttling.',
    '**Using scans for user flows** creates latency and cost problems.',
    '**Poor GSI design** fails new query requirements or duplicates high cost.',
    '**No idempotency** causes duplicate writes in event-driven flows.',
    '**Large items** increase cost and reduce efficiency.',
  ],
  bestPractices: [
    'Model from access patterns before creating tables',
    'Choose high-cardinality partition keys',
    'Avoid scans in critical request paths',
    'Use conditional writes for concurrency and idempotency',
    'Monitor throttles, consumed capacity, hot keys, and item size',
    'Use TTL for temporary data where appropriate',
  ],
  architectNote: `DynamoDB rewards upfront query design. It feels simple until a team asks relational questions from a table that was not modeled for them.`,
  faqs: [
    { question: 'When should I choose DynamoDB over RDS?', answer: 'Choose DynamoDB for high-scale key-based access with predictable patterns and minimal relational querying.' },
    { question: 'What is a GSI?', answer: 'A global secondary index provides another key structure for querying the same table data by a different access pattern.' },
  ],
  keyTakeaways: [
    'DynamoDB is NoSQL and access-pattern driven',
    'Partition key design determines scale behavior',
    'Avoid scans for critical paths',
    'Indexes, TTL, streams, and conditional writes are important production tools',
  ],
  relatedTopics: ['aws-rds', 'aws-lambda', 'aws-eventbridge', 'aws-cloudwatch'],
});

export const awsCloudWatch = topic({
  slug: 'aws-cloudwatch',
  title: 'CloudWatch',
  description: 'Understand Amazon CloudWatch for metrics, logs, alarms, dashboards, events, and operational visibility.',
  focus: 'monitoring and observability for AWS resources and applications',
  whatIsIt: `Amazon CloudWatch collects metrics, logs, alarms, dashboards, and operational signals from AWS resources and applications.

It helps teams detect issues, investigate behavior, and trigger automated responses.`,
  whyWeNeedIt: `Production systems need visibility. Without metrics, logs, and alarms, teams discover problems through users instead of monitoring.

CloudWatch provides a central AWS-native place to observe workload health and resource behavior.`,
  realWorldUsage: `A production API publishes application logs to CloudWatch Logs, infrastructure metrics from EC2 and ALB, custom business metrics for order failures, and alarms for latency, error rate, CPU, disk, queue age, and throttling.

Dashboards show service health for on-call engineers.`,
  howItWorks: `AWS services publish default metrics. Applications and agents can publish custom metrics and logs. Alarms evaluate metrics and can notify SNS, trigger automation, or feed incident workflows.

Logs Insights queries help investigate logs during incidents.`,
  exampleTitle: 'Operational alarm set',
  exampleDescription: 'Baseline alarms for an API workload.',
  exampleLanguage: 'text',
  exampleCode: `Application:
  - 5xx error rate
  - p95 latency
  - order failure count

Infrastructure:
  - ALB target health
  - EC2 CPU/memory/disk
  - RDS connections/storage/latency
  - Lambda errors/throttles/duration

Operations:
  - Pager notification
  - Runbook link
  - Dashboard panel`,
  commonConfusions: [
    { question: 'Is CloudWatch only for infrastructure metrics?', answer: 'No. It can collect application logs, custom metrics, alarms, dashboards, and synthetic checks.' },
    { question: 'Are logs and metrics the same?', answer: 'No. Metrics are numeric time-series signals. Logs are event records useful for detail investigation.' },
    { question: 'Does CloudWatch replace application observability design?', answer: 'No. Applications still need meaningful logs, correlation IDs, and business metrics.' },
  ],
  productionIssues: [
    '**No actionable alarms** creates alert fatigue or missed incidents.',
    '**Missing application metrics** hides business-impacting failures.',
    '**High log volume without retention** increases cost.',
    '**No correlation IDs** makes distributed debugging slow.',
    '**Memory/disk not collected on EC2** because default metrics are incomplete.',
  ],
  bestPractices: [
    'Create alarms tied to user impact and runbooks',
    'Emit structured logs with correlation IDs',
    'Set log retention policies',
    'Publish custom business metrics',
    'Monitor both infrastructure and application health',
    'Review dashboards and alarms after incidents',
  ],
  architectNote: `CloudWatch is only as useful as the signals you design. The goal is not more graphs; it is faster detection, diagnosis, and recovery.`,
  faqs: [
    { question: 'What metrics should I alarm on?', answer: 'Start with user-facing errors, latency, saturation, and critical dependency health. Add service-specific metrics such as throttles, queue age, and database connections.' },
    { question: 'Can CloudWatch collect EC2 memory?', answer: 'Yes, through the CloudWatch agent. It is not a default EC2 metric.' },
  ],
  keyTakeaways: [
    'CloudWatch provides AWS-native monitoring',
    'Metrics, logs, alarms, and dashboards serve different purposes',
    'Actionable alarms need thresholds, ownership, and runbooks',
    'Application-level signals are essential',
  ],
  relatedTopics: ['aws-cloudtrail', 'aws-auto-scaling', 'aws-lambda', 'aws-rds'],
});

export const awsCloudTrail = topic({
  slug: 'aws-cloudtrail',
  title: 'CloudTrail',
  description: 'Learn AWS CloudTrail for API auditing, account activity, security investigations, compliance evidence, and governance.',
  focus: 'audit logging for AWS API activity',
  whatIsIt: `AWS CloudTrail records AWS account activity and API calls.

It captures who did what, when, from where, and against which resources for supported control-plane and optional data-plane events.`,
  whyWeNeedIt: `Security teams need audit evidence and incident investigation data.

CloudTrail helps answer questions such as who changed a security group, who assumed a role, who deleted a bucket policy, or which credentials called an API.`,
  realWorldUsage: `An enterprise enables organization-wide CloudTrail across accounts and Regions. Logs are delivered to a central security account S3 bucket with retention, encryption, and restricted access.

Security tooling analyzes events for suspicious activity such as root login, policy changes, failed logins, or unusual role assumption.`,
  howItWorks: `CloudTrail records management events by default in event history and can deliver trails to S3 and CloudWatch Logs. Data events for services like S3 object access and Lambda invocation can be enabled for deeper visibility.

Events include user identity, event name, source IP, request parameters, and response details.`,
  exampleTitle: 'Audit event questions',
  exampleDescription: 'Questions CloudTrail helps answer during an incident.',
  exampleLanguage: 'text',
  exampleCode: `Who changed this security group?
Which role was assumed before the change?
Was MFA used?
What source IP made the request?
Which account and Region were affected?
Was an S3 object read, changed, or deleted?
Did the same principal change IAM policies elsewhere?`,
  commonConfusions: [
    { question: 'Is CloudTrail the same as CloudWatch?', answer: 'No. CloudTrail is audit/API activity. CloudWatch is monitoring metrics, logs, alarms, and dashboards.' },
    { question: 'Does CloudTrail record application logs?', answer: 'No. Application logs usually go to CloudWatch Logs or another observability platform.' },
    { question: 'Are S3 object reads always logged?', answer: 'Not by default for every object. S3 data events must be enabled where required.' },
  ],
  productionIssues: [
    '**CloudTrail disabled or incomplete** leaves security teams blind.',
    '**No central log account** lets compromised accounts tamper with local evidence.',
    '**Data events not enabled** misses sensitive object-level activity.',
    '**Retention too short** fails compliance or investigation needs.',
  ],
  bestPractices: [
    'Enable organization-wide CloudTrail across accounts and Regions',
    'Store logs in a protected central security account',
    'Encrypt and restrict audit log access',
    'Enable data events for sensitive buckets and functions where needed',
    'Alert on root usage, IAM changes, disabled logging, and suspicious role assumption',
    'Define retention based on compliance and investigation requirements',
  ],
  architectNote: `CloudTrail is your AWS black box recorder. If it is incomplete, late, or tamperable, incident response becomes guesswork.`,
  faqs: [
    { question: 'What should I mention in a CloudTrail interview?', answer: 'Explain management events, data events, organization trails, central log storage, and incident investigation use cases.' },
    { question: 'Can CloudTrail trigger alerts?', answer: 'CloudTrail can deliver events to CloudWatch/EventBridge patterns that trigger alerts or automation.' },
  ],
  keyTakeaways: [
    'CloudTrail records AWS API activity',
    'It is essential for audit and security investigation',
    'Organization-wide central logging is the enterprise pattern',
    'Data events must be enabled for deeper resource-level visibility',
  ],
  relatedTopics: ['aws-cloudwatch', 'aws-iam', 'aws-policies', 'aws-mfa'],
});

export const awsCodePipeline = topic({
  slug: 'aws-codepipeline',
  title: 'CodePipeline',
  description: 'Understand AWS CodePipeline for orchestrating source, build, test, approval, deploy, and release automation stages.',
  focus: 'continuous delivery workflow orchestration on AWS',
  whatIsIt: `AWS CodePipeline is a managed continuous delivery service.

It connects stages such as source, build, test, approval, and deployment using services like CodeCommit, GitHub, CodeBuild, CodeDeploy, CloudFormation, ECS, and Lambda.`,
  whyWeNeedIt: `Manual releases are slow, inconsistent, and hard to audit.

CodePipeline gives teams a repeatable release workflow with visible stages, artifacts, approvals, and integration with AWS deployment targets.`,
  realWorldUsage: `A backend service pipeline pulls source from GitHub, runs CodeBuild for tests and image creation, waits for staging approval, deploys infrastructure through CloudFormation, and uses CodeDeploy for blue-green deployment.

Pipeline execution history provides release traceability.`,
  howItWorks: `A pipeline has stages. Each stage has actions. Actions consume and produce artifacts.

When source changes, the pipeline runs actions in order. Failures stop progression until fixed or retried. Approvals can pause release before sensitive environments.`,
  exampleTitle: 'Enterprise pipeline stages',
  exampleDescription: 'A production-friendly AWS release flow.',
  exampleLanguage: 'text',
  exampleCode: `Source:
  GitHub main branch
Build:
  CodeBuild tests, package, scan
Deploy dev:
  CloudFormation stack update
Test:
  integration smoke tests
Approval:
  production change approval
Deploy prod:
  CodeDeploy blue-green
Notify:
  release result to operations channel`,
  commonConfusions: [
    { question: 'Is CodePipeline a build tool?', answer: 'No. CodePipeline orchestrates stages. CodeBuild usually performs the build.' },
    { question: 'Does CodePipeline replace IaC?', answer: 'No. It can run IaC deployments, but templates still define infrastructure.' },
    { question: 'Should every deployment require manual approval?', answer: 'Not always. Use approvals based on risk, compliance, and environment.' },
  ],
  productionIssues: [
    '**Rebuilding artifacts per environment** breaks release provenance.',
    '**No rollback stage** makes failed deployments slow to recover.',
    '**Weak artifact controls** allow unapproved artifacts to deploy.',
    '**No pipeline notifications** leaves teams unaware of failed releases.',
  ],
  bestPractices: [
    'Build once and promote the same artifact',
    'Include automated tests and security scans',
    'Use approvals where compliance or risk requires them',
    'Keep pipeline definitions in code where possible',
    'Emit release notifications and audit history',
    'Design rollback paths before production launch',
  ],
  architectNote: `A pipeline is a production control system. It should prove what changed, who approved it, which artifact moved, and how to recover.`,
  faqs: [
    { question: 'What services commonly pair with CodePipeline?', answer: 'CodeBuild for build/test, CodeDeploy for deployment strategies, and CloudFormation for infrastructure changes.' },
    { question: 'Can CodePipeline deploy to non-AWS targets?', answer: 'It can integrate with custom actions and tools, but it is strongest for AWS-centered delivery workflows.' },
  ],
  keyTakeaways: [
    'CodePipeline orchestrates release stages',
    'CodeBuild builds; CodeDeploy deploys; CloudFormation provisions',
    'Artifact promotion and rollback are key production concerns',
    'Pipeline history supports auditability',
  ],
  relatedTopics: ['aws-codebuild', 'aws-codedeploy', 'aws-cloudformation'],
});

export const awsCodeBuild = topic({
  slug: 'aws-codebuild',
  title: 'CodeBuild',
  description: 'Learn AWS CodeBuild for managed builds, tests, packaging, security scanning, environment variables, artifacts, and logs.',
  focus: 'managed build and test execution',
  whatIsIt: `AWS CodeBuild runs build jobs in managed build environments.

It can compile code, run tests, build Docker images, package artifacts, run scans, and publish results without managing build servers.`,
  whyWeNeedIt: `Build servers require maintenance, scaling, patching, secrets, and environment consistency.

CodeBuild provides repeatable build environments that integrate with CodePipeline, ECR, S3, CloudWatch, IAM, and VPC networking.`,
  realWorldUsage: `A microservice build uses CodeBuild to install dependencies, run unit tests, build a Docker image, scan it, push it to ECR, and produce deployment metadata for CodePipeline.

The build role has only the permissions needed for logs, artifacts, ECR push, and required secrets.`,
  howItWorks: `A build project defines source, environment image, compute size, IAM role, buildspec file, environment variables, artifacts, logs, and optional VPC access.

The buildspec controls phases such as install, pre_build, build, and post_build.`,
  exampleTitle: 'buildspec.yml',
  exampleDescription: 'A simplified buildspec for a containerized API.',
  exampleLanguage: 'yaml',
  exampleCode: `version: 0.2

phases:
  install:
    commands:
      - npm ci
  pre_build:
    commands:
      - npm test
  build:
    commands:
      - docker build -t orders-api:$CODEBUILD_RESOLVED_SOURCE_VERSION .
  post_build:
    commands:
      - echo Build completed

artifacts:
  files:
    - appspec.yml
    - taskdef.json`,
  commonConfusions: [
    { question: 'Is CodeBuild only for Java or Node?', answer: 'No. It can run many language and toolchain environments, including custom Docker build images.' },
    { question: 'Where do build logs go?', answer: 'Build logs commonly go to CloudWatch Logs and can also integrate with pipeline views.' },
    { question: 'Should secrets be plain environment variables?', answer: 'No. Use Secrets Manager, Parameter Store, or pipeline secret integrations rather than hardcoding sensitive values.' },
  ],
  productionIssues: [
    '**Overprivileged build role** can modify production infrastructure or secrets unnecessarily.',
    '**Secrets printed in logs** leak credentials.',
    '**Non-reproducible builds** depend on mutable latest packages or images.',
    '**Slow builds** from no dependency or Docker layer caching.',
  ],
  bestPractices: [
    'Use least privilege IAM roles for build projects',
    'Keep buildspec files in source control',
    'Use pinned tool versions where practical',
    'Pull secrets from managed secret stores',
    'Publish test reports and artifacts',
    'Optimize caching without compromising reproducibility',
  ],
  architectNote: `CodeBuild sits in a sensitive spot: it sees source, artifacts, credentials, and deployment metadata. Treat build security as supply-chain security.`,
  faqs: [
    { question: 'Can CodeBuild build Docker images?', answer: 'Yes, with appropriate environment configuration and permissions to push to a registry such as ECR.' },
    { question: 'Can CodeBuild run inside a VPC?', answer: 'Yes. VPC builds can reach private resources, but networking and outbound access must be configured carefully.' },
  ],
  keyTakeaways: [
    'CodeBuild runs managed build and test jobs',
    'Buildspec files define build phases',
    'IAM, secrets, logs, and artifacts need governance',
    'Reproducibility matters for production releases',
  ],
  relatedTopics: ['aws-codepipeline', 'aws-codedeploy', 'aws-cloudwatch'],
});

export const awsCodeDeploy = topic({
  slug: 'aws-codedeploy',
  title: 'CodeDeploy',
  description: 'Understand AWS CodeDeploy deployment automation for EC2, Lambda, ECS, rolling releases, blue-green deployments, hooks, and rollback.',
  focus: 'controlled application deployment and rollback',
  whatIsIt: `AWS CodeDeploy automates application deployments to services such as EC2, Lambda, and ECS.

It supports deployment strategies including in-place, rolling, canary, linear, and blue-green depending on target platform.`,
  whyWeNeedIt: `Deployment is one of the riskiest production activities.

CodeDeploy helps control rollout pace, run lifecycle hooks, monitor health, and roll back when deployment alarms fail.`,
  realWorldUsage: `A Java service running on EC2 uses CodeDeploy with an Auto Scaling group. The pipeline uploads an artifact, CodeDeploy installs it on batches of instances, runs validation hooks, and stops rollout if CloudWatch alarms fire.

A Lambda deployment may shift 10 percent traffic first, then continue after metrics look healthy.`,
  howItWorks: `Deployment configuration defines target groups, deployment type, rollout percentage, hooks, alarms, and rollback behavior.

For EC2, an agent runs on instances and follows the appspec file. For Lambda and ECS, CodeDeploy can shift traffic between versions or task sets.`,
  exampleTitle: 'AppSpec hook model',
  exampleDescription: 'A simplified deployment lifecycle for EC2.',
  exampleLanguage: 'yaml',
  exampleCode: `version: 0.0
os: linux
files:
  - source: /
    destination: /opt/orders-api
hooks:
  BeforeInstall:
    - location: scripts/stop.sh
  AfterInstall:
    - location: scripts/install.sh
  ApplicationStart:
    - location: scripts/start.sh
  ValidateService:
    - location: scripts/health-check.sh`,
  commonConfusions: [
    { question: 'Is CodeDeploy the same as CodePipeline?', answer: 'No. CodePipeline orchestrates the workflow. CodeDeploy performs controlled deployment actions.' },
    { question: 'Does CodeDeploy test my application automatically?', answer: 'It can run hooks and monitor alarms, but teams must define meaningful validation.' },
    { question: 'Is blue-green always required?', answer: 'No. It is powerful for reducing risk, but cost and complexity may be unnecessary for low-risk workloads.' },
  ],
  productionIssues: [
    '**No validation hooks** marks deployments successful even when apps are broken.',
    '**No alarm-based rollback** lets bad versions continue rollout.',
    '**Agent issues on EC2** block deployments unexpectedly.',
    '**Stateful instances** make replacement and rollback fragile.',
  ],
  bestPractices: [
    'Use health checks and validation hooks',
    'Configure CloudWatch alarms for rollback',
    'Prefer blue-green or canary for high-risk services',
    'Keep deployments idempotent',
    'Avoid manual changes on deployment targets',
    'Document rollback behavior and test it',
  ],
  architectNote: `A deployment tool is only as safe as its health signals. CodeDeploy can stop a bad rollout if the architecture tells it what bad looks like.`,
  faqs: [
    { question: 'Can CodeDeploy deploy Lambda?', answer: 'Yes. It can shift traffic between Lambda versions using canary or linear strategies.' },
    { question: 'What is AppSpec?', answer: 'AppSpec defines deployment files, hooks, and lifecycle behavior for CodeDeploy.' },
  ],
  keyTakeaways: [
    'CodeDeploy automates controlled deployments',
    'Hooks, health checks, and alarms make rollouts safer',
    'Rollback must be designed and tested',
    'Deployment strategy depends on workload risk',
  ],
  relatedTopics: ['aws-codepipeline', 'aws-codebuild', 'aws-cloudwatch', 'aws-auto-scaling'],
});

export const awsCloudFormation = topic({
  slug: 'aws-cloudformation',
  title: 'CloudFormation',
  description: 'Learn AWS CloudFormation infrastructure as code for stacks, templates, parameters, change sets, drift detection, and repeatable environments.',
  focus: 'AWS-native infrastructure as code',
  whatIsIt: `AWS CloudFormation provisions AWS resources from declarative templates.

Templates define resources, parameters, mappings, conditions, outputs, and dependencies. A deployed collection of resources is called a stack.`,
  whyWeNeedIt: `Production infrastructure must be repeatable, reviewable, and recoverable.

CloudFormation lets teams version infrastructure, deploy consistent environments, review changes, and reduce manual console drift.`,
  realWorldUsage: `A platform team defines VPCs, subnets, IAM roles, load balancers, Lambda functions, API Gateway routes, and alarms through CloudFormation. Pipelines deploy stacks to dev, staging, and production with environment-specific parameters.

Change sets are reviewed before production updates.`,
  howItWorks: `CloudFormation reads a YAML or JSON template and creates, updates, or deletes resources to match the desired state.

It tracks stack state and dependencies. Change sets preview updates. Drift detection identifies resources changed outside the stack.`,
  exampleTitle: 'Minimal CloudFormation resource',
  exampleDescription: 'A simple S3 bucket definition.',
  exampleLanguage: 'yaml',
  exampleCode: `AWSTemplateFormatVersion: '2010-09-09'
Description: Example secure bucket
Resources:
  ReportsBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true`,
  commonConfusions: [
    { question: 'Is CloudFormation the same as Terraform?', answer: 'No. Both are IaC tools. CloudFormation is AWS-native; Terraform is multi-cloud and has a different workflow.' },
    { question: 'Does CloudFormation prevent all drift?', answer: 'No. It can detect some drift, but teams must avoid manual changes and run detection where needed.' },
    { question: 'Can every AWS feature be managed instantly?', answer: 'CloudFormation support may lag behind new service features, though coverage is broad.' },
  ],
  productionIssues: [
    '**Manual console edits** create drift and surprise future deployments.',
    '**Large monolithic stacks** make changes risky and slow.',
    '**No change set review** causes accidental replacements or deletions.',
    '**Poor parameter handling** leaks secrets or creates inconsistent environments.',
  ],
  bestPractices: [
    'Keep templates in source control',
    'Use change sets for production updates',
    'Split stacks by lifecycle and ownership',
    'Avoid storing secrets directly in templates',
    'Use stack policies for critical resources where appropriate',
    'Run drift detection and remove manual changes',
  ],
  architectNote: `IaC is not just automation; it is memory. It lets the organization remember how production was built and rebuild it when pressure is high.`,
  faqs: [
    { question: 'What is a stack?', answer: 'A stack is the deployed collection of resources managed together by CloudFormation.' },
    { question: 'What is a change set?', answer: 'A change set previews what CloudFormation will create, modify, replace, or delete before applying an update.' },
  ],
  keyTakeaways: [
    'CloudFormation is AWS-native IaC',
    'Stacks manage resources as a unit',
    'Change sets and drift detection support safer operations',
    'IaC reduces manual drift and improves repeatability',
  ],
  relatedTopics: ['aws-codepipeline', 'aws-codebuild', 'aws-codedeploy'],
});

export const awsHighAvailability = topic({
  slug: 'aws-high-availability',
  title: 'High Availability',
  description: 'Understand high availability on AWS through multi-AZ design, health checks, redundancy, managed services, failover, and operational readiness.',
  focus: 'keeping systems available despite component failures',
  whatIsIt: `High availability means designing systems to continue serving users when components fail.

In AWS, HA commonly uses multiple AZs, load balancing, Auto Scaling, managed database failover, redundant networking, health checks, and monitored recovery paths.`,
  whyWeNeedIt: `Production systems fail: instances crash, AZs degrade, deployments break, dependencies slow down, and humans make mistakes.

HA reduces user impact by removing single points of failure and automating recovery where possible.`,
  realWorldUsage: `A customer portal runs ALB across three public subnets, application services across three private subnets, RDS Multi-AZ for the database, S3 for shared files, CloudWatch alarms, and a tested rollback process.

The team practices AZ failure scenarios during game days.`,
  howItWorks: `HA combines redundancy and detection.

Traffic enters through a load balancer. Health checks remove bad targets. Auto Scaling replaces failed instances. Databases fail over to standby infrastructure. Stateless apps can scale horizontally while stateful systems use replication and backups.`,
  exampleTitle: 'Multi-AZ HA architecture',
  exampleDescription: 'A basic highly available web application.',
  exampleLanguage: 'text',
  exampleCode: `Users
  -> Route 53
  -> ALB in 3 AZs
  -> App Auto Scaling group in private subnets
  -> RDS Multi-AZ
  -> S3 for object storage
  -> CloudWatch alarms and runbooks

Failure response:
  unhealthy targets removed
  instances replaced
  database failover tested
  deployment rollback available`,
  commonConfusions: [
    { question: 'Is backup the same as high availability?', answer: 'No. Backups support recovery after data loss. HA keeps service available during failures.' },
    { question: 'Does Multi-AZ solve all outages?', answer: 'No. It helps with AZ-level failures, but app bugs, data corruption, dependency outages, and regional issues still need design.' },
    { question: 'Is HA only infrastructure?', answer: 'No. Application statelessness, retries, timeouts, idempotency, and deployment safety matter.' },
  ],
  productionIssues: [
    '**Single points of failure** such as one instance, one NAT, or one database without failover.',
    '**Bad health checks** route traffic to broken services.',
    '**Stateful application servers** prevent horizontal failover.',
    '**Untested failover** fails during the first real incident.',
  ],
  bestPractices: [
    'Use multi-AZ designs for critical tiers',
    'Keep application servers stateless where possible',
    'Use managed HA features for databases and load balancers',
    'Design health checks around readiness',
    'Test failover and rollback regularly',
    'Define SLOs, RTO, and RPO for each workload',
  ],
  architectNote: `High availability is not a checkbox. It is a chain of dependency decisions. The weakest single point often decides the real availability of the whole system.`,
  faqs: [
    { question: 'What is the easiest HA improvement?', answer: 'For many apps, run at least two instances across two AZs behind a load balancer with meaningful health checks.' },
    { question: 'Does HA increase cost?', answer: 'Usually yes because it duplicates capacity and adds managed features, but the cost is weighed against downtime impact.' },
  ],
  keyTakeaways: [
    'HA keeps systems running through component failures',
    'Multi-AZ design is a common AWS baseline',
    'Health checks and stateless apps are essential',
    'Failover must be tested',
  ],
  relatedTopics: ['aws-regions-availability-zones', 'aws-load-balancer', 'aws-auto-scaling', 'aws-disaster-recovery'],
});

export const awsScalability = topic({
  slug: 'aws-scalability',
  title: 'Scalability',
  description: 'Learn AWS scalability patterns for horizontal scaling, managed services, caching, partitioning, queues, autoscaling, and bottleneck removal.',
  focus: 'handling growth in traffic, data, users, and operational demand',
  whatIsIt: `Scalability is the ability of a system to handle increased load without unacceptable performance loss.

On AWS, scalability uses horizontal compute, managed databases, caching, queues, partitioning, load balancers, Auto Scaling, and service quotas.`,
  whyWeNeedIt: `User traffic is not constant. Systems need to survive launches, promotions, seasonal peaks, data growth, and regional expansion.

Scalable architecture prevents every growth event from becoming a manual emergency.`,
  realWorldUsage: `A ticketing system scales reads through CloudFront caching and DynamoDB key design, handles writes with SQS buffering, scales workers through Auto Scaling, and protects the payment provider with rate limits and retries.

CloudWatch dashboards track throughput, latency, queue age, and throttles.`,
  howItWorks: `Scalability starts by identifying bottlenecks.

Stateless application tiers scale horizontally. Databases scale through read replicas, partitioning, or NoSQL design. Queues smooth bursts. Caches reduce repeated work. Auto Scaling adjusts capacity. Quotas are reviewed before peak events.`,
  exampleTitle: 'Scalability pattern map',
  exampleDescription: 'Common AWS scaling patterns by bottleneck.',
  exampleLanguage: 'text',
  exampleCode: `Web requests:
  ALB + Auto Scaling + stateless app
Static content:
  S3 + CloudFront
Database reads:
  cache or read replicas
Write bursts:
  SQS + worker scaling
NoSQL high scale:
  DynamoDB partition key design
External API limit:
  rate limiting + queue + retry policy`,
  commonConfusions: [
    { question: 'Is scalability the same as availability?', answer: 'No. Scalability handles load growth. Availability handles failure tolerance. They are related but different.' },
    { question: 'Can Auto Scaling fix every bottleneck?', answer: 'No. Scaling app instances cannot fix database locks, hot partitions, slow dependencies, or poor cache strategy.' },
    { question: 'Should every system be designed for internet-scale?', answer: 'No. Scale design should match business demand and cost constraints.' },
  ],
  productionIssues: [
    '**Database bottleneck** remains while compute scales pointlessly.',
    '**No quota planning** blocks scaling during a launch.',
    '**Hot partitions** throttle DynamoDB or shard-like systems.',
    '**No backpressure** overloads downstream services.',
    '**Cache stampede** causes many requests to recompute the same data.',
  ],
  bestPractices: [
    'Load test realistic user flows',
    'Scale stateless tiers horizontally',
    'Use queues to absorb bursts',
    'Design database access patterns early',
    'Review AWS service quotas before peak events',
    'Monitor saturation, latency, errors, and queue age',
    'Use caching carefully with invalidation strategy',
  ],
  architectNote: `Scalability is mostly bottleneck management. Before adding capacity, know which resource is saturated and which user journey is affected.`,
  faqs: [
    { question: 'What is horizontal scaling?', answer: 'Adding more instances or workers rather than making one machine larger.' },
    { question: 'What is backpressure?', answer: 'Backpressure slows or buffers incoming work so downstream systems are not overwhelmed.' },
  ],
  keyTakeaways: [
    'Scalability handles load growth',
    'The bottleneck decides the scaling strategy',
    'Queues, caches, Auto Scaling, and partitioning are common AWS tools',
    'Quotas and load tests matter before traffic peaks',
  ],
  relatedTopics: ['aws-auto-scaling', 'aws-dynamodb', 'aws-load-balancer', 'aws-cost-optimization'],
});

export const awsDisasterRecovery = topic({
  slug: 'aws-disaster-recovery',
  title: 'Disaster Recovery',
  description: 'Understand AWS disaster recovery with backup/restore, pilot light, warm standby, active-active, RTO, RPO, and recovery testing.',
  focus: 'recovering workloads after major failure or data loss',
  whatIsIt: `Disaster recovery is the strategy for restoring systems after major incidents such as regional outage, data corruption, ransomware, accidental deletion, or severe deployment failure.

AWS DR patterns include backup and restore, pilot light, warm standby, and active-active multi-region.`,
  whyWeNeedIt: `Backups without tested recovery are hope, not strategy.

Businesses need defined recovery time objective (RTO) and recovery point objective (RPO) for critical systems, and architecture must match those targets.`,
  realWorldUsage: `A payment platform may run active production in one Region, replicate database backups to another Region, keep infrastructure templates ready, and periodically run restore drills.

A more critical platform may maintain warm standby with scaled-down services and replicated data ready for promotion.`,
  howItWorks: `DR combines data protection, infrastructure automation, DNS or traffic failover, runbooks, access controls, and testing.

Lower RTO/RPO usually means higher cost and complexity. The business decides targets; architects design the matching pattern.`,
  exampleTitle: 'DR pattern comparison',
  exampleDescription: 'Common AWS disaster recovery options.',
  exampleLanguage: 'text',
  exampleCode: `Backup and restore:
  lowest cost, slower recovery
Pilot light:
  core data/services ready, app scaled up during DR
Warm standby:
  smaller live environment already running
Active-active:
  traffic served from multiple Regions, highest complexity

Always define:
  RTO, RPO, failover trigger, runbook, test schedule`,
  commonConfusions: [
    { question: 'Is Multi-AZ disaster recovery?', answer: 'Multi-AZ is high availability within a Region. DR usually considers larger failures, including regional and data-loss scenarios.' },
    { question: 'Are backups enough?', answer: 'Only if backup/restore meets business RTO and RPO and has been tested.' },
    { question: 'Is active-active always best?', answer: 'No. It is costly and complex. Many systems only need backup/restore or warm standby.' },
  ],
  productionIssues: [
    '**Untested backups** fail or take too long when needed.',
    '**Missing dependency map** restores app servers but not DNS, secrets, queues, or third-party integrations.',
    '**RPO mismatch** loses more data than the business expected.',
    '**Manual DR steps** are too slow or error-prone during stress.',
  ],
  bestPractices: [
    'Define RTO and RPO per workload',
    'Automate infrastructure recreation with IaC',
    'Replicate or copy critical backups across accounts or Regions',
    'Test restores and failover regularly',
    'Document dependencies and recovery order',
    'Protect backups from accidental or malicious deletion',
  ],
  architectNote: `DR is a business conversation expressed through architecture. If nobody can say the acceptable data loss and downtime, the design is guessing.`,
  faqs: [
    { question: 'What is RTO?', answer: 'Recovery Time Objective: how long the business can tolerate the system being unavailable.' },
    { question: 'What is RPO?', answer: 'Recovery Point Objective: how much data loss measured in time the business can tolerate.' },
  ],
  keyTakeaways: [
    'DR handles major failure and data-loss scenarios',
    'RTO and RPO define the target',
    'Patterns range from backup/restore to active-active',
    'Recovery must be tested, not only documented',
  ],
  relatedTopics: ['aws-high-availability', 'aws-global-infrastructure', 'aws-rds', 'aws-cloudformation'],
});

export const awsCostOptimization = topic({
  slug: 'aws-cost-optimization',
  title: 'Cost Optimization',
  description: 'Learn AWS cost optimization through right-sizing, tagging, budgets, storage lifecycle, purchasing models, monitoring, and architecture choices.',
  focus: 'delivering business value while controlling cloud spend',
  whatIsIt: `Cost optimization is the practice of continuously matching AWS spend to business value.

It includes right-sizing, deleting waste, choosing pricing models, storage lifecycle policies, autoscaling, tagging, budgets, and architectural tradeoffs.`,
  whyWeNeedIt: `Cloud makes spending easy. Without governance, teams pay for idle resources, oversized capacity, unnecessary data transfer, unused storage, and inefficient architecture.

Cost optimization keeps cloud usage sustainable without weakening reliability or security.`,
  realWorldUsage: `A platform team tags every resource by application, owner, environment, and cost center. Budgets alert teams before overruns. Compute is right-sized monthly, dev environments stop after hours, S3 lifecycle moves old objects to cheaper storage, and Savings Plans cover steady workloads.

Architects review expensive NAT, logging, and data transfer patterns.`,
  howItWorks: `Cost optimization combines visibility and action.

Cost Explorer, Budgets, Cost and Usage Reports, Trusted Advisor, Compute Optimizer, and service metrics show spend patterns. Teams then reduce waste, reserve predictable usage, and redesign expensive paths where needed.`,
  exampleTitle: 'Cost review checklist',
  exampleDescription: 'A monthly AWS cost optimization review.',
  exampleLanguage: 'text',
  exampleCode: `Review:
  - top services by spend
  - untagged resources
  - idle EC2, EBS, RDS, load balancers
  - NAT gateway and data transfer cost
  - S3 lifecycle and log retention
  - rightsizing recommendations
  - Savings Plans or Reserved Instances coverage
  - dev/test shutdown schedules`,
  commonConfusions: [
    { question: 'Is cost optimization only buying reservations?', answer: 'No. Reservations help steady workloads, but waste removal, architecture, lifecycle, and scaling often matter more.' },
    { question: 'Should cheapest always win?', answer: 'No. Cost decisions must balance reliability, security, performance, and business risk.' },
    { question: 'Do tags reduce cost automatically?', answer: 'No. Tags create visibility and accountability. Teams still need action.' },
  ],
  productionIssues: [
    '**No ownership tags** means nobody knows which team owns spend.',
    '**Idle resources** continue billing after experiments end.',
    '**Excessive NAT/data transfer** becomes a hidden architecture cost.',
    '**Over-retained logs** and old objects grow storage bills.',
    '**Wrong purchasing model** pays on-demand rates for predictable usage.',
  ],
  bestPractices: [
    'Tag resources with owner, app, environment, and cost center',
    'Set budgets and anomaly alerts',
    'Right-size compute and databases based on metrics',
    'Use lifecycle policies for S3 and log retention',
    'Use Savings Plans or Reserved Instances for stable workloads',
    'Stop or scale down non-production environments when idle',
    'Review architecture-level costs such as NAT and data transfer',
  ],
  architectNote: `Cost is an architecture quality attribute. A design that is secure and reliable but financially unsustainable is still not production-ready.`,
  faqs: [
    { question: 'What is the best first cost optimization step?', answer: 'Tag ownership, find idle resources, set budgets, and review top service spend. Visibility comes before fine tuning.' },
    { question: 'How do architects discuss cost in interviews?', answer: 'Talk about right-sizing, autoscaling, storage lifecycle, data transfer, managed-service tradeoffs, and business-aware reliability decisions.' },
  ],
  keyTakeaways: [
    'Cost optimization is continuous',
    'Visibility, ownership, and budgets are foundational',
    'Architecture choices drive major spend',
    'Optimize cost without sacrificing required reliability or security',
  ],
  relatedTopics: ['aws-nat-gateway', 'aws-s3', 'aws-auto-scaling', 'aws-scalability'],
});

export const awsTopics: TopicContent[] = [
  awsOverview,
  awsGlobalInfrastructure,
  awsRegionsAvailabilityZones,
  awsSharedResponsibilityModel,
  awsEc2,
  awsAutoScaling,
  awsLoadBalancer,
  awsS3,
  awsEbs,
  awsEfs,
  awsIam,
  awsRoles,
  awsPolicies,
  awsMfa,
  awsVpc,
  awsSubnets,
  awsSecurityGroups,
  awsRouteTables,
  awsNatGateway,
  awsLambda,
  awsApiGateway,
  awsEventBridge,
  awsRds,
  awsDynamodb,
  awsCloudWatch,
  awsCloudTrail,
  awsCodePipeline,
  awsCodeBuild,
  awsCodeDeploy,
  awsCloudFormation,
  awsHighAvailability,
  awsScalability,
  awsDisasterRecovery,
  awsCostOptimization,
];
