import type { TopicContent } from '../types';

export const aemCloudService: TopicContent = {
  slug: 'aem-cloud-service',
  title: 'AEM as a Cloud Service',
  description: 'Understand what AEM as a Cloud Service is, how it differs from AEM 6.5, and what you need to know to develop and deploy on the cloud platform.',
  applicableVersions: ['AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'AEM as a Cloud Service (AEMaaCS) is Adobe\'s cloud-native version of AEM. Instead of running AEM on your own servers, Adobe manages everything — infrastructure, scaling, updates, and security. You focus on building your application; Adobe handles the rest.',
  whatIsIt: `AEM as a Cloud Service is Adobe's fully managed, cloud-native version of AEM. Key characteristics:

- **Always up-to-date** — Adobe pushes updates automatically, no manual upgrades
- **Auto-scaling** — scales up and down based on traffic automatically
- **Containerized** — runs on Kubernetes, with separate Author, Publish, and Dispatcher pods
- **CI/CD native** — code is deployed through Cloud Manager pipelines, not manual package installs
- **CDN included** — Fastly CDN is built in, in front of every AEMaaCS environment
- **Separated storage** — content is stored in a cloud-based Oak repository, not a local disk

AEMaaCS is not just "AEM in the cloud" — it's a re-architected platform with different deployment models, different APIs, and different constraints than AEM 6.5.`,
  whyWeNeedIt: `**The Problems with AEM 6.x (on-premise):**
- Manual upgrades every 1–2 years — expensive, risky, time-consuming
- Infrastructure management — servers, OS, JVM, networking
- Manual scaling — traffic spikes require pre-provisioning
- Slow deployments — package installs could take 30+ minutes

**AEMaaCS Solves This:**
- **Zero-downtime updates** — Adobe updates AEM automatically, no manual effort
- **Elastic scaling** — handles Black Friday traffic automatically
- **Fast deployments** — Cloud Manager pipelines deploy in minutes
- **Global CDN** — built-in Fastly CDN reduces latency worldwide
- **Security** — Adobe manages patches, security updates, and compliance`,
  realWorldUsage: `**How a Typical AEMaaCS Project Works:**

1. **Development** — Developers work locally using the AEM SDK (a downloadable JAR that mimics AEMaaCS)
2. **Code Review** — Code goes through Git (usually GitHub/GitLab/Azure DevOps)
3. **Pipeline** — Cloud Manager detects the commit and runs the CI/CD pipeline
4. **Testing** — Automated tests run (unit tests, integration tests, UI tests)
5. **Deployment** — Code deploys to Dev → Stage → Production environments
6. **Content** — Content authors work in the cloud Author environment
7. **Delivery** — Users get content via CDN → Dispatcher → Publish

**Environments in AEMaaCS:**
- **Development** — For developer testing
- **Stage** — For QA and UAT
- **Production** — Live site

Each environment has Author, Publish, and Dispatcher tiers.`,
  howItWorks: `**Architecture Differences from AEM 6.5:**

| Feature | AEM 6.5 | AEMaaCS |
|---|---|---|
| Deployment | Package Manager | Cloud Manager Pipeline |
| Scaling | Manual | Automatic |
| Updates | Manual upgrades | Automatic |
| Storage | Local filesystem | Cloud Oak |
| CDN | Optional | Built-in (Fastly) |
| Dispatcher | Self-managed | Managed by Adobe |
| Mutable content | /apps is writable | /apps is immutable |

**Immutable vs Mutable Content:**

This is the biggest conceptual shift from AEM 6.5:
- \`/apps\`, \`/libs\`, \`/oak:index\` — **Immutable** — only deployable via Cloud Manager pipeline
- \`/content\`, \`/conf\`, \`/var\` — **Mutable** — manageable through AEM UI and replication

**Implications:**
- You can't install packages directly to \`/apps\` in production
- All code changes go through the pipeline
- OSGi configurations go through the pipeline
- Content (pages, assets, templates) still goes through replication

**Cloud Manager:**
Cloud Manager is Adobe's CI/CD platform for AEMaaCS. It:
- Connects to your Git repository
- Runs build pipelines (Maven build + quality checks)
- Deploys to AEMaaCS environments
- Manages environment variables (for OSGi config)
- Runs code quality, security, and performance checks`,
  example: {
    title: 'AEMaaCS Development Setup',
    description: 'Key differences and configurations for developing on AEM as a Cloud Service.',
    code: [
      {
        label: 'Cloud Manager Pipeline (config.yaml)',
        language: 'yaml',
        code: `# .cloudmanager/config.yaml
# Defines pipeline behavior

kind: "PipelineConfig"
version: "1"
metadata:
  envTypes:
    - dev
    - stage
    - prod
data:
  # Dispatcher configuration validation
  dispatcher:
    enabled: true
  # Frontend build pipeline
  frontend:
    enabled: false
  # Code quality thresholds
  codeQuality:
    coverageMinimum: 80
    duplications: 5`,
      },
      {
        label: 'OSGi Config with Environment Variables',
        language: 'xml',
        code: `<!-- In AEMaaCS, sensitive values use Cloud Manager
     environment variables instead of hardcoded values -->

<!-- /apps/myproject/osgiconfig/config/
     com.myproject.core.services.impl.ApiServiceImpl.cfg.json -->
{
  "apiEndpoint": "$[env:API_ENDPOINT,default=https://api.dev.mysite.com]",
  "apiKey": "$[secret:API_KEY]",
  "timeout": "$[env:API_TIMEOUT,default=5000]",
  "enabled": true
}

<!-- $[env:VAR_NAME] - reads from Cloud Manager environment variable -->
<!-- $[secret:SECRET_NAME] - reads from Cloud Manager secret variable -->
<!-- ,default=value - fallback if variable not set -->`,
      },
      {
        label: 'Repoinit - Creating JCR Nodes via Pipeline',
        language: 'apache',
        code: `# In AEMaaCS, you can't manually create nodes in /apps
# Use repoinit scripts deployed via pipeline

# /apps/myproject/osgiconfig/config/
# org.apache.sling.jcr.repoinit.RepositoryInitializer~myproject.cfg.json

{
  "scripts": [
    "create path (sling:Folder) /content/mysite",
    "create path (sling:Folder) /content/dam/mysite",
    "set ACL for mysite-authors",
    "  allow jcr:read,jcr:write on /content/mysite",
    "end"
  ]
}`,
      },
      {
        label: 'Content Package Structure for AEMaaCS',
        language: 'text',
        code: `# Maven project structure for AEMaaCS

myproject/
├── core/                    # OSGi bundle (Java code)
│   └── src/main/java/
│       └── com/myproject/
│           ├── models/      # Sling Models
│           └── services/    # OSGi Services
│
├── ui.apps/                 # /apps content (IMMUTABLE)
│   └── src/main/content/
│       └── jcr_root/
│           └── apps/myproject/
│               ├── components/
│               └── clientlibs/
│
├── ui.content/              # /content (MUTABLE)
│   └── src/main/content/
│       └── jcr_root/
│           └── content/mysite/
│
├── ui.config/               # OSGi configurations
│   └── src/main/content/
│       └── jcr_root/
│           └── apps/myproject/osgiconfig/
│               ├── config/           # All environments
│               ├── config.author/    # Author only
│               └── config.publish/   # Publish only
│
└── dispatcher/              # Dispatcher config
    └── src/conf.d/
        ├── available_vhosts/
        └── rewrites/`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I still use package manager to install code in AEMaaCS?',
      answer: 'For content (pages, assets, configurations in /content and /conf), yes. For code (/apps), no — /apps is immutable in production and stage. You must use Cloud Manager pipelines to deploy code changes. This is the biggest workflow change from AEM 6.5.',
    },
    {
      question: 'What is the AEM SDK and why do I need it?',
      answer: 'The AEM SDK is a downloadable JAR file that runs a local AEMaaCS-compatible instance on your machine. It\'s how developers work locally without needing a cloud environment for every code change. Download it from Adobe Software Distribution portal.',
    },
    {
      question: 'How do I manage secrets (API keys, passwords) in AEMaaCS?',
      answer: 'Use Cloud Manager\'s "Secret" environment variables. In your OSGi config, reference them as $[secret:MY_SECRET]. Never hardcode secrets in code or configuration files. Cloud Manager injects them at runtime.',
    },
    {
      question: 'Is AEMaaCS backward compatible with AEM 6.5 code?',
      answer: 'Mostly, but not 100%. The APIs are the same, but some things that worked in 6.5 don\'t work in AEMaaCS — especially anything that writes to /apps at runtime, uses deprecated APIs, or relies on specific filesystem paths. Adobe provides the AEM Analyzer Maven plugin to check compatibility.',
    },
  ],
  productionIssues: [
    'Pipeline fails at code quality step — check the code quality report in Cloud Manager. Common issues: low test coverage, critical SonarQube violations, deprecated API usage.',
    'Content not replicating — check replication agents in AEMaaCS Author. The "Default Agent" and "Reverse Replication Agent" must be active.',
    'OSGi config not loading — in AEMaaCS, config files use .cfg.json format, not .xml. Check the file format and naming convention.',
    'Dispatcher cache not invalidating — check the flush agent configuration and ensure the Dispatcher is receiving invalidation requests from Publish.',
    'Build succeeds but deployment fails — check the deployment logs in Cloud Manager. Often caused by content package validation errors or missing dependencies.',
  ],
  bestPractices: [
    'Use the AEM Analyzer Maven plugin in your build to catch AEMaaCS compatibility issues early.',
    'Never write to /apps at runtime — all code changes must go through the pipeline.',
    'Use Cloud Manager environment variables for all environment-specific configuration.',
    'Set up automated tests (unit, integration, UI) — Cloud Manager runs them on every pipeline execution.',
    'Use the Dispatcher SDK for local Dispatcher testing before pushing to Cloud Manager.',
    'Monitor pipeline execution times — slow builds indicate code quality or dependency issues.',
    'Use persisted GraphQL queries instead of ad-hoc queries — they\'re cacheable by the CDN.',
  ],
  architectNote: `AEM as a Cloud Service represents a **paradigm shift** in AEM architecture. The key principles to internalize:

**Immutability:** Code is immutable in production. This forces better engineering practices — no more "quick fixes" via package manager in production.

**Cloud-Native Patterns:** Design your application for horizontal scaling. Avoid in-memory state, use distributed caching, and design services to be stateless.

**CDN-First:** With Fastly CDN built in, design your caching strategy from day one. Use Cache-Control headers, persisted GraphQL queries, and Dispatcher rules to maximize CDN hit rates.

**Observability:** AEMaaCS integrates with Adobe Experience Platform and provides built-in logging and monitoring. Invest in proper logging from the start — you'll need it when debugging production issues.

**For architects evaluating AEMaaCS vs AEM 6.5:** If you're starting a new project, choose AEMaaCS. The operational benefits (auto-updates, auto-scaling, managed infrastructure) outweigh the migration effort for new projects.`,
  hasDiagram: true,
  diagramType: 'cloud',
  faqs: [
    {
      question: 'How long does a Cloud Manager pipeline deployment take?',
      answer: 'A full pipeline (build + quality + deploy) typically takes 15–45 minutes depending on test suite size and build complexity. Non-production pipelines (dev) are faster. Production deployments include additional quality gates.',
    },
    {
      question: 'Can I have multiple production environments in AEMaaCS?',
      answer: 'Each AEMaaCS program has one production environment. You can have multiple development and staging environments. For multi-site/multi-region setups, you use AEM\'s Multi-Site Manager within a single production environment.',
    },
    {
      question: 'What happens to my AEM instance during an Adobe update?',
      answer: 'Adobe updates are deployed using a rolling update strategy — instances are updated one at a time with zero downtime. You\'ll receive advance notice of major updates. Your code is tested against the new AEM version before the update is applied.',
    },
    {
      question: 'How does local development work with AEMaaCS?',
      answer: 'Download the AEM SDK from Adobe Software Distribution. Run it locally (java -jar aem-sdk-quickstart.jar). Develop and test locally, then push to Git. Cloud Manager picks up the change and runs the pipeline to deploy to your dev environment.',
    },
    {
      question: 'Is AEMaaCS HIPAA/SOC2/GDPR compliant?',
      answer: 'Yes. AEMaaCS is built on Adobe\'s enterprise cloud infrastructure which maintains HIPAA, SOC 2 Type 2, ISO 27001, and GDPR compliance certifications. Check Adobe\'s Trust Center for current compliance documentation.',
    },
  ],
  keyTakeaways: [
    'AEMaaCS = fully managed, auto-updating, auto-scaling AEM on Adobe\'s cloud',
    '/apps is immutable — all code changes deploy via Cloud Manager pipeline',
    'Cloud Manager is the CI/CD platform — Git → Pipeline → Deploy',
    'Use environment variables for secrets and environment-specific config',
    'AEM SDK allows local development that mirrors the cloud environment',
    'CDN (Fastly) is built in — design caching strategy from day one',
  ],
  relatedTopics: ['dispatcher', 'content-fragments', 'graphql', 'osgi'],
};
