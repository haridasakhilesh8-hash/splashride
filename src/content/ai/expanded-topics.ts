import type { TopicContent } from '../types';

interface AiExpandedTopicSpec {
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
const versions = ['Python 3.11+', 'LLM APIs', 'Vector Databases', 'Production AI Tooling'];

function topic(spec: AiExpandedTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: versions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} is one of the AI / ML topics strong engineers use to connect model capability with product behavior, reliability, and production support.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers ask about this:**
- AI engineering interviews expect applied judgment, not only terminology
- Strong answers connect prompts, retrieval, data quality, evaluation, latency, and user trust
- Senior candidates explain how the feature behaves after launch, not only how it works in a notebook`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical AI engineering example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} only a theory topic?`,
        answer: `No. ${spec.title} becomes valuable when you can explain its impact on quality, latency, cost, guardrails, maintainability, and user trust in production.`,
      },
      {
        question: `What makes a weak ${spec.title} interview answer?`,
        answer: `A weak answer defines ${spec.title} in isolation and ignores evaluation, monitoring, security, fallback behavior, and integration with the surrounding product workflow.`,
      },
      {
        question: `How do senior engineers discuss ${spec.title}?`,
        answer: `Senior engineers explain ${spec.title} with trade-offs, failure modes, measurement, and the operational plan required to keep the feature reliable after release.`,
      },
    ],
    productionIssues: [
      'Teams implement the capability but skip clear quality measurement and fallback behavior.',
      'The feature works in demos but fails under real traffic, noisy data, or ambiguous prompts.',
      'Ownership is unclear once incidents, latency spikes, or quality regressions start appearing.',
    ],
    bestPractices: [
      'Tie the topic to a user-facing workflow instead of treating it as isolated model trivia.',
      'Measure quality, latency, and cost together instead of optimizing one metric blindly.',
      'Plan rollback, fallback, and observability before launch.',
      'Explain the trade-offs in plain product and operations language.',
    ],
    architectNote: `For AI / LLM systems, ${spec.title} should be evaluated as part of a larger product and platform design. Architecture is about reliability, governance, cost, explainability, and long-term supportability.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in production?`,
        answer: `Explain the user problem first, then where ${spec.title} fits, how it is measured, what can fail, and what controls keep the feature useful and trustworthy.`,
      },
      {
        question: 'Interview: what production concern usually appears here?',
        answer: 'The common concern is that teams optimize for demo behavior and only later discover issues with quality drift, latency, costs, or insufficient operational controls.',
      },
    ],
    keyTakeaways: [
      `${spec.title} matters when it improves a real workflow, not just a demo.`,
      'Strong AI answers include measurement, failure handling, and user trust.',
      'Production AI needs observability, cost awareness, and controlled rollout.',
      'The best engineering decisions are measurable, supportable, and easy to reason about under pressure.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const expandedTopicSpecs: AiExpandedTopicSpec[] = [
  {
    slug: 'ai-use-cases',
    title: 'AI Use Cases',
    description: 'Identify when AI actually adds value and when conventional software should stay in charge.',
    concept: 'AI use cases are the practical problem patterns where prediction, summarization, classification, generation, search, extraction, or workflow assistance create real value.',
    why: 'Teams need this topic to avoid forcing AI into every feature and to choose the right kind of capability for the business problem.',
    usage: 'Product teams use AI use case thinking during discovery, backlog shaping, and platform planning to decide whether a workflow needs AI, retrieval, automation, or simpler deterministic logic.',
    workflow: 'Start with the business task, map uncertainty and judgment, evaluate the user risk of wrong answers, then choose between deterministic logic, retrieval, or model-driven behavior.',
    exampleTitle: 'AI suitability checklist',
    exampleCode: `Problem -> User value -> Failure cost -> Required confidence
-> AI or non-AI decision -> Validation plan -> Rollout strategy`,
    relatedTopics: ['ai-basics', 'ml-lifecycle', 'ai-system-design'],
  },
  {
    slug: 'ml-lifecycle',
    title: 'ML Lifecycle',
    description: 'Understand the end-to-end flow from data and experimentation to release, monitoring, and iteration.',
    concept: 'The ML lifecycle covers problem framing, data collection, feature design, training, evaluation, deployment, monitoring, and continuous improvement.',
    why: 'Interviewers use this topic to see whether you understand that models are operating systems of data, evaluation, and feedback rather than one-time artifacts.',
    usage: 'Teams rely on ML lifecycle thinking for planning ownership, retraining, model governance, experiment design, and incident response.',
    workflow: 'Define the task, prepare data, train and compare candidates, validate quality, deploy safely, observe behavior, and retrain or roll back when evidence demands it.',
    exampleTitle: 'Lifecycle ownership map',
    exampleCode: `Task framing -> Data prep -> Training -> Offline eval
-> Release gate -> Production deploy -> Monitoring -> Retraining`,
    relatedTopics: ['ai-use-cases', 'model-training', 'model-evaluation'],
  },
  {
    slug: 'data-cleaning-for-ai',
    title: 'Data Cleaning',
    description: 'Prepare AI data so that training, retrieval, and prompting are based on clean, trustworthy inputs.',
    concept: 'Data cleaning removes duplicates, broken formatting, inconsistent labels, noisy records, and privacy-sensitive artifacts that would degrade model behavior.',
    why: 'Bad data creates bad AI faster. Teams need this topic because quality issues often come from input data long before they come from model choice.',
    usage: 'Engineers use data cleaning in training pipelines, document ingestion flows, retrieval corpora, and analytics tied to evaluation.',
    workflow: 'Ingest raw data, normalize structure, remove junk, validate schema, flag sensitive content, and publish a clean version for downstream retrieval or training.',
    exampleTitle: 'Ingestion quality gate',
    exampleCode: `Raw docs -> deduplicate -> normalize -> redact sensitive fields
-> validate metadata -> publish clean corpus`,
    relatedTopics: ['python-for-ai', 'feature-engineering', 'retrieval-evaluation'],
  },
  {
    slug: 'feature-engineering',
    title: 'Feature Engineering',
    description: 'Transform raw signals into features that help classical ML models learn useful patterns.',
    concept: 'Feature engineering is the process of converting raw inputs into informative variables that improve model performance and stability.',
    why: 'This topic matters because many practical ML systems are won or lost before model training even starts.',
    usage: 'Feature engineering appears in fraud detection, forecasting, recommendation, ranking, and any workflow that still depends on structured ML.',
    workflow: 'Understand the task, create candidate features, remove leakage, validate usefulness, and monitor how feature quality affects production outcomes.',
    exampleTitle: 'Feature readiness checklist',
    exampleCode: `Raw inputs -> derived features -> leakage check -> offline validation
-> model training -> production monitoring`,
    relatedTopics: ['supervised-learning', 'model-training', 'model-evaluation'],
  },
  {
    slug: 'model-training',
    title: 'Model Training',
    description: 'Learn how models are fit, tuned, and compared before they are trusted in production.',
    concept: 'Model training is the process of exposing algorithms to prepared data so they learn patterns that generalize to unseen inputs.',
    why: 'Interviewers ask about training to see whether you understand overfitting, baselines, validation, and the difference between experimentation and reliable delivery.',
    usage: 'Teams use training workflows in both classical ML and fine-tuned AI systems whenever they need repeatable experiments and clear promotion criteria.',
    workflow: 'Split data carefully, train candidates, compare metrics, inspect failure clusters, tune hyperparameters, and promote only when the model beats a real baseline.',
    exampleTitle: 'Training pipeline summary',
    exampleCode: `Dataset split -> baseline model -> candidate training -> validation
-> error analysis -> model selection -> release gate`,
    relatedTopics: ['ml-lifecycle', 'feature-engineering', 'model-evaluation'],
  },
  {
    slug: 'model-evaluation',
    title: 'Model Evaluation',
    description: 'Measure whether an AI or ML system is actually good enough for its intended workflow.',
    concept: 'Model evaluation uses quantitative and qualitative checks to decide whether a model is accurate, useful, safe, and release-ready.',
    why: 'AI teams need evaluation because launch decisions without evidence create hidden risk, poor user trust, and impossible incident response.',
    usage: 'Evaluation is used in classification pipelines, RAG systems, copilots, agent workflows, and rollout gates for new model versions.',
    workflow: 'Define success criteria, create representative test cases, measure task quality and failure patterns, then compare candidate behaviors against the current baseline.',
    exampleTitle: 'Evaluation scorecard',
    exampleCode: `Task metrics + edge-case tests + hallucination checks
+ latency + cost + human review = release decision`,
    relatedTopics: ['ai-evaluation', 'retrieval-evaluation', 'agent-evaluation'],
  },
  {
    slug: 'attention-mechanisms',
    title: 'Attention Mechanisms',
    description: 'Understand the idea behind attention and why transformer-based systems became so powerful.',
    concept: 'Attention lets a model focus on the most relevant parts of the input when generating or understanding output.',
    why: 'This topic helps candidates explain why transformers scale well for language tasks and why context handling matters in modern AI products.',
    usage: 'Engineers use this understanding when discussing context windows, retrieval, prompt structure, and latency trade-offs in model selection.',
    workflow: 'Inputs are tokenized, relevance weights are calculated across tokens, and the model uses those weighted relationships to build richer representations.',
    exampleTitle: 'Why attention matters',
    exampleCode: `Input tokens -> attention weights -> contextual representation
-> better sequence understanding -> improved generation`,
    relatedTopics: ['transformers', 'tokens', 'context-windows'],
  },
  {
    slug: 'llm-inference',
    title: 'LLM Inference',
    description: 'Understand what happens when a large language model is invoked in a real application.',
    concept: 'LLM inference is the runtime process of sending prompt context to a model and generating output token by token under latency and cost constraints.',
    why: 'Interviewers ask about inference to see whether you can reason about context size, throughput, streaming, temperature, caching, and production latency.',
    usage: 'Inference behavior matters in chat assistants, copilots, summarization services, RAG pipelines, and tool-calling systems.',
    workflow: 'Collect context, apply system and user prompts, call the model with generation settings, stream or return output, then validate or post-process the result.',
    exampleTitle: 'Inference flow',
    exampleCode: `Context assembly -> prompt creation -> model request
-> token generation -> output validation -> response delivery`,
    relatedTopics: ['gpt-models', 'tokens', 'ai-caching'],
  },
  {
    slug: 'tool-calling',
    title: 'Tool Calling',
    description: 'Let models delegate specific actions to APIs, services, or controlled functions.',
    concept: 'Tool calling allows an LLM to choose from approved actions such as search, CRM lookup, database fetch, or workflow execution instead of relying only on free-text generation.',
    why: 'Teams need this because enterprise AI systems often become useful only when the model can act safely through verified tools.',
    usage: 'Tool calling appears in copilots, support automation, enterprise search assistants, and agent-like workflows.',
    workflow: 'Define tool schemas, let the model decide when a tool is needed, execute the tool outside the model, then feed the result back for final reasoning or response.',
    exampleTitle: 'Tool-enabled assistant',
    exampleCode: `User asks -> model selects tool -> backend executes action
-> result returns -> model composes grounded answer`,
    relatedTopics: ['ai-agents', 'agent-planning', 'ai-security'],
  },
  {
    slug: 'system-prompts',
    title: 'System Prompts',
    description: 'Use system instructions to shape behavior, boundaries, tone, and task framing for AI applications.',
    concept: 'System prompts provide high-priority behavioral guidance to a model before user input is processed.',
    why: 'This topic matters because many production issues come from weak behavioral framing rather than from raw model capability.',
    usage: 'Teams rely on system prompts in enterprise copilots, chatbots, workflow assistants, and multi-step orchestration pipelines.',
    workflow: 'Define product rules and constraints, write the system layer to reflect those rules, test edge cases, and revise when failures show ambiguity or unsafe behavior.',
    exampleTitle: 'Prompt contract',
    exampleCode: `Role definition
Allowed actions
Safety boundaries
Output style
Fallback behavior`,
    relatedTopics: ['zero-shot-prompting', 'prompt-templates', 'ai-guardrails'],
  },
  {
    slug: 'prompt-templates',
    title: 'Prompt Templates',
    description: 'Create reusable prompt structures that reduce inconsistency across features and teams.',
    concept: 'Prompt templates standardize the instructions, placeholders, examples, and output contracts used across repeated AI tasks.',
    why: 'Teams need templates so that prompt quality is reusable, reviewable, and easier to test than scattered hand-written prompts.',
    usage: 'Prompt templates are used in customer support workflows, internal knowledge assistants, classification tasks, and structured generation flows.',
    workflow: 'Identify the recurring task, define placeholders and constraints, create a reusable template, and test it with diverse real-world inputs.',
    exampleTitle: 'Template skeleton',
    exampleCode: `Task
Context
Instructions
Examples
Output schema
Fallback instruction`,
    relatedTopics: ['system-prompts', 'few-shot-prompting', 'structured-output'],
  },
  {
    slug: 'structured-output',
    title: 'Structured Output',
    description: 'Constrain AI responses into predictable schemas that downstream systems can trust.',
    concept: 'Structured output is the practice of producing model responses in JSON, typed objects, or schema-constrained formats instead of open-ended text.',
    why: 'Production teams need structured output because automation breaks quickly when model results are inconsistent or hard to parse safely.',
    usage: 'Structured output is used in extraction pipelines, workflow automation, form filling, summarization services, and agent tool invocation.',
    workflow: 'Define the output contract, instruct the model clearly, validate the response, retry or repair if needed, and only then pass it into downstream systems.',
    exampleTitle: 'Schema-first response flow',
    exampleCode: `Prompt with schema -> model output -> validator
-> success path or retry -> downstream workflow`,
    relatedTopics: ['prompt-templates', 'tool-calling', 'workflow-automation'],
  },
  {
    slug: 'reranking',
    title: 'Reranking',
    description: 'Improve retrieval quality by reordering candidate documents after the first search pass.',
    concept: 'Reranking takes an initial set of retrieved items and applies a stronger relevance step to surface the best context for the user question.',
    why: 'This matters because many RAG failures come from weak context ranking rather than weak generation.',
    usage: 'Teams use reranking in enterprise search, policy assistants, support knowledge systems, and product documentation copilots.',
    workflow: 'Retrieve a candidate set, score the candidates more deeply against the query, keep the most relevant results, and pass those into generation or answer composition.',
    exampleTitle: 'Two-stage retrieval',
    exampleCode: `Query -> broad retrieval -> rerank top candidates
-> final context set -> grounded response`,
    relatedTopics: ['retrieval-augmented-generation', 'hybrid-search', 'retrieval-evaluation'],
  },
  {
    slug: 'retrieval-evaluation',
    title: 'Retrieval Evaluation',
    description: 'Measure whether the retrieval layer is supplying the right knowledge to the model.',
    concept: 'Retrieval evaluation checks whether relevant documents are being found, ranked well, and delivered with enough signal for the downstream task.',
    why: 'RAG systems fail quietly when retrieval quality is poor, so teams need explicit evaluation of the retrieval layer apart from final answer quality.',
    usage: 'This is used in document QA systems, support copilots, legal research assistants, and internal knowledge platforms.',
    workflow: 'Create benchmark questions, inspect retrieved context, measure relevance, and compare retrieval strategies such as chunking, metadata filters, and reranking.',
    exampleTitle: 'RAG evidence review',
    exampleCode: `Question -> retrieved chunks -> relevance check
-> context quality score -> tuning decision`,
    relatedTopics: ['chunking-strategies', 'reranking', 'metadata-filtering'],
  },
  {
    slug: 'hybrid-search',
    title: 'Hybrid Search',
    description: 'Combine vector similarity with keyword or metadata signals to improve retrieval quality.',
    concept: 'Hybrid search blends semantic retrieval with lexical or structured filtering so systems can balance meaning, exact terms, and governance constraints.',
    why: 'Teams need hybrid search because pure vector retrieval can miss exact identifiers, acronyms, or compliance-sensitive filters.',
    usage: 'Hybrid search is common in internal search, documentation assistants, ecommerce discovery, and enterprise knowledge retrieval.',
    workflow: 'Run semantic and keyword-oriented retrieval together, merge or score the candidates, then pass the best grounded set into the final response pipeline.',
    exampleTitle: 'Hybrid retrieval plan',
    exampleCode: `Semantic search + keyword search + filters
-> merged ranking -> best evidence set`,
    relatedTopics: ['vector-databases-overview', 'metadata-filtering', 'reranking'],
  },
  {
    slug: 'metadata-filtering',
    title: 'Metadata Filtering',
    description: 'Use structured document attributes to control which content an AI system is allowed to retrieve.',
    concept: 'Metadata filtering applies attributes such as source, language, tenant, region, product, or security label during retrieval.',
    why: 'Interviewers care because good AI systems are often governed by access, recency, ownership, or domain boundaries rather than similarity alone.',
    usage: 'Teams use metadata filters in multi-tenant assistants, policy systems, support knowledge bases, and enterprise document search.',
    workflow: 'Store trustworthy metadata during ingestion, apply filters during retrieval, validate access boundaries, and monitor whether useful context is being excluded or leaked.',
    exampleTitle: 'Tenant-aware retrieval',
    exampleCode: `User context -> metadata filters -> candidate retrieval
-> authorized context -> model response`,
    relatedTopics: ['hybrid-search', 'ai-security', 'enterprise-ai'],
  },
  {
    slug: 'ai-copilots',
    title: 'AI Copilots',
    description: 'Design assistant experiences that help users work faster without pretending the model is always correct.',
    concept: 'AI copilots are task-oriented assistants embedded into a real product workflow to help users search, summarize, draft, decide, or automate parts of a job.',
    why: 'This topic matters because many companies want applied AI experiences, not standalone chat demos.',
    usage: 'Copilots are used in developer tools, support systems, internal portals, CRM workflows, and enterprise documentation platforms.',
    workflow: 'Start from a specific user task, define where AI helps, design the evidence and review experience, and ship with observability and fallback behavior.',
    exampleTitle: 'Copilot workflow map',
    exampleCode: `User task -> context gathering -> suggestion or draft
-> user review -> action or edit -> feedback capture`,
    relatedTopics: ['ai-chatbots', 'workflow-automation', 'ai-system-design'],
  },
  {
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Use AI inside repeatable business flows where structured actions and guardrails matter.',
    concept: 'Workflow automation combines model outputs with approval rules, APIs, queues, and business steps to reduce manual work safely.',
    why: 'Teams need this because AI only creates durable value when it can be integrated into repeatable operating workflows.',
    usage: 'Examples include ticket triage, content enrichment, claim classification, document extraction, and internal support automation.',
    workflow: 'Receive input, classify or extract, validate confidence, call supporting systems, send uncertain cases for review, and log results for evaluation.',
    exampleTitle: 'Human-in-the-loop automation',
    exampleCode: `Input -> model task -> confidence check -> auto action or review
-> audit log -> continuous improvement`,
    relatedTopics: ['structured-output', 'tool-calling', 'ai-copilots'],
  },
  {
    slug: 'agent-memory',
    title: 'Agent Memory',
    description: 'Give AI agents durable context without confusing temporary working state with long-term knowledge.',
    concept: 'Agent memory refers to the stored context an agent can use across steps or sessions, including conversation state, preferences, retrieved facts, and approved task context.',
    why: 'Interviewers ask about this because memory affects personalization, task continuity, privacy, and hallucination risk.',
    usage: 'Agent memory is used in support assistants, research copilots, personal productivity tools, and multi-step business workflows.',
    workflow: 'Capture useful context, store only what is needed, retrieve relevant memory for the current task, and expire or govern it carefully over time.',
    exampleTitle: 'Memory retrieval loop',
    exampleCode: `Current task -> relevant memory lookup -> constrained context assembly
-> agent action -> memory update policy`,
    relatedTopics: ['ai-agents', 'agent-planning', 'enterprise-ai'],
  },
  {
    slug: 'agent-planning',
    title: 'Agent Planning',
    description: 'Break a user goal into smaller decisions and actions that an AI system can execute safely.',
    concept: 'Agent planning is the process of deciding substeps, ordering actions, selecting tools, and revising the plan based on evidence.',
    why: 'Teams need this topic because agents fail badly when they improvise without structure, constraints, or verification.',
    usage: 'Planning appears in research assistants, operations copilots, support automation, and orchestrated enterprise workflows.',
    workflow: 'Interpret the goal, decompose it into steps, choose which steps require tools or retrieval, execute carefully, and revise when evidence changes.',
    exampleTitle: 'Plan-execute-review loop',
    exampleCode: `Goal -> substeps -> tool decisions -> execution
-> result review -> plan update`,
    relatedTopics: ['tool-calling', 'agent-memory', 'agent-evaluation'],
  },
  {
    slug: 'agent-evaluation',
    title: 'Agent Evaluation',
    description: 'Measure whether agent workflows are completing tasks correctly, safely, and efficiently.',
    concept: 'Agent evaluation checks task completion quality, tool use correctness, fallback behavior, latency, and whether the workflow stays within business constraints.',
    why: 'This topic matters because agent demos can look impressive even when reliability is too weak for real operations.',
    usage: 'Teams use agent evaluation before shipping support automation, internal copilots, research pipelines, and multi-step enterprise assistants.',
    workflow: 'Design scenario-based tests, measure step correctness and final outcome quality, inspect failures, and promote changes only when the workflow improves safely.',
    exampleTitle: 'Scenario-driven agent review',
    exampleCode: `Scenario set -> planned steps -> executed actions
-> outcome scoring -> failure analysis`,
    relatedTopics: ['model-evaluation', 'agent-planning', 'multi-agent-systems'],
  },
  {
    slug: 'llm-observability',
    title: 'LLM Observability',
    description: 'Track what your AI system is doing so issues can be debugged and quality can be improved safely.',
    concept: 'LLM observability covers tracing prompts, retrieval context, model responses, latencies, costs, errors, and quality signals through the full workflow.',
    why: 'Production AI is impossible to support well without visibility into prompts, retrieved evidence, failures, and user outcomes.',
    usage: 'Teams use observability in chat assistants, RAG systems, support tools, and any AI feature that needs debugging or SLA ownership.',
    workflow: 'Capture request context, trace each retrieval and model step, log quality signals, and connect incidents back to the failing layer.',
    exampleTitle: 'AI trace model',
    exampleCode: `Request -> retrieval trace -> prompt trace -> model output
-> validation -> user outcome -> dashboard`,
    relatedTopics: ['ai-monitoring', 'ai-evaluation', 'ai-cost-optimization'],
  },
  {
    slug: 'ai-guardrails',
    title: 'AI Guardrails',
    description: 'Add controls that keep AI behavior within acceptable safety, policy, and product boundaries.',
    concept: 'AI guardrails are the input, output, workflow, and policy controls that reduce unsafe, off-task, or non-compliant model behavior.',
    why: 'Teams need guardrails because prompt quality alone cannot guarantee safe behavior in production.',
    usage: 'Guardrails are used in enterprise assistants, customer-facing AI, regulated workflows, and internal automation touching sensitive data.',
    workflow: 'Define unacceptable outcomes, add layered controls, validate outputs before action, and escalate uncertain cases to human review.',
    exampleTitle: 'Guardrail stack',
    exampleCode: `Input checks -> retrieval boundaries -> model call
-> output validation -> policy gate -> user response`,
    relatedTopics: ['ai-security', 'system-prompts', 'structured-output'],
  },
  {
    slug: 'ai-deployment-patterns',
    title: 'AI Deployment Patterns',
    description: 'Understand the common ways AI capabilities are deployed inside real software systems.',
    concept: 'AI deployment patterns include synchronous APIs, batch enrichment, async pipelines, event-driven processing, embedded copilots, and workflow orchestration.',
    why: 'Interviewers ask this to see whether you can pick a delivery model that matches latency, cost, traffic, and operational constraints.',
    usage: 'This topic appears in support automation, document processing, product copilots, analytics enrichment, and back-office AI workflows.',
    workflow: 'Choose the interaction model, define latency and fallback rules, scale the infrastructure, and observe whether the deployment pattern fits the task.',
    exampleTitle: 'Pattern selection guide',
    exampleCode: `User-facing need -> latency tolerance -> deployment pattern
-> scaling model -> observability plan`,
    relatedTopics: ['llm-inference', 'workflow-automation', 'enterprise-ai'],
  },
  {
    slug: 'ai-caching',
    title: 'AI Caching',
    description: 'Reduce cost and latency by reusing safe, high-value model and retrieval outputs.',
    concept: 'AI caching stores repeatable outputs or retrieval artifacts so the system does not recompute expensive steps unnecessarily.',
    why: 'Teams use caching to control inference costs, improve response time, and reduce pressure on shared model capacity.',
    usage: 'Caching appears in FAQ assistants, summarization workflows, semantic search, and products with repeated enterprise queries.',
    workflow: 'Identify repeatable steps, define cache keys carefully, enforce invalidation rules, and measure whether quality or freshness is being harmed.',
    exampleTitle: 'Cache-aware assistant',
    exampleCode: `Request -> cache lookup -> hit or miss
-> compute if needed -> store result -> return response`,
    relatedTopics: ['llm-inference', 'ai-cost-optimization', 'ai-rate-limits'],
  },
  {
    slug: 'ai-rate-limits',
    title: 'AI Rate Limits',
    description: 'Design around provider and internal throughput limits so AI features remain stable under load.',
    concept: 'AI rate limits are the constraints on request volume, token usage, concurrency, or throughput imposed by providers or internal systems.',
    why: 'This topic matters because AI systems often fail under traffic bursts long before the product team notices quality improvements.',
    usage: 'Teams handle rate limits in chat tools, batch enrichment jobs, agent workflows, and high-volume customer support systems.',
    workflow: 'Measure request patterns, apply queuing or retries safely, prioritize traffic, and define fallback behavior for overload periods.',
    exampleTitle: 'Rate limit resilience plan',
    exampleCode: `Traffic spike -> queue or throttle -> retry policy
-> fallback response -> alerting and recovery`,
    relatedTopics: ['ai-caching', 'ai-deployment-patterns', 'llm-observability'],
  },
];

export const aiExpandedTopics: Record<string, TopicContent> = Object.fromEntries(
  expandedTopicSpecs.map((spec) => [spec.slug, topic(spec)])
);
