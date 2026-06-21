import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { aiLlmInterviewPrepTopicGroups } from './topicNavigation';

type Intent = 'concept' | 'implementation' | 'troubleshooting' | 'architecture';

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
  concern: string;
  relatedTopics: string[];
  profile: TopicProfile;
}

const intentTypes: Record<Intent, string> = {
  concept: 'Conceptual',
  implementation: 'Practical Implementation',
  troubleshooting: 'Troubleshooting',
  architecture: 'Architecture',
};

const difficultyByIntent: Record<Intent, 'Beginner' | 'Intermediate' | 'Advanced' | 'Architect'> = {
  concept: 'Beginner',
  implementation: 'Intermediate',
  troubleshooting: 'Advanced',
  architecture: 'Architect',
};

const experienceByIntent: Record<Intent, 'beginner' | 'mid' | 'senior' | 'architect'> = {
  concept: 'beginner',
  implementation: 'mid',
  troubleshooting: 'senior',
  architecture: 'architect',
};

const industries = ['fintech', 'healthcare', 'support operations', 'developer tools', 'knowledge management', 'ecommerce'];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hash(input: string) {
  let total = 0;
  for (let index = 0; index < input.length; index += 1) {
    total = ((total << 5) - total) + input.charCodeAt(index);
    total |= 0;
  }
  return Math.abs(total);
}

function list(values: string[]) {
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]} and ${values[1]}`;
  return `${values.slice(0, -1).join(', ')}, and ${values[values.length - 1]}`;
}

const topicSpecs: TopicSpec[] = [
  {
    category: 'AI Basics',
    topicGroup: 'AI Fundamentals',
    concern: 'turning model capability into a real user workflow',
    relatedTopics: ['AI System Design', 'Generative AI'],
    profile: {
      mechanism: 'AI basics describe how data, models, prompts, and workflows combine into an applied system.',
      implementation: 'Start with the user task and success metric before selecting any model or framework.',
      failure: 'the feature becomes a demo instead of a reliable product capability',
      decision: 'whether AI is needed at all and what role it should play in the workflow',
      incident: 'a team launches an AI feature but cannot explain which user problem it solves or how success is measured',
      evidence: ['task definitions and metrics', 'baseline quality comparisons', 'user feedback and usage data'],
    },
  },
  {
    category: 'ML vs DL vs LLM',
    topicGroup: 'AI Fundamentals',
    concern: 'choosing the right model family for the job',
    relatedTopics: ['Generative AI', 'GPT Models'],
    profile: {
      mechanism: 'ML, deep learning, and LLMs solve different classes of problems with different data, cost, and control trade-offs.',
      implementation: 'Choose the task, then choose the model family instead of forcing everything into an LLM pattern.',
      failure: 'teams spend too much and lose determinism by picking the wrong capability',
      decision: 'which approach is cheapest and safest while still solving the business problem',
      incident: 'an expensive LLM flow is used where a supervised classifier would have been cheaper and more stable',
      evidence: ['task requirements', 'model comparison results', 'cost and latency metrics'],
    },
  },
  {
    category: 'Generative AI',
    topicGroup: 'AI Fundamentals',
    concern: 'handling useful generation without losing trust',
    relatedTopics: ['Hallucinations', 'Evaluation'],
    profile: {
      mechanism: 'Generative AI produces new content and therefore introduces uncertainty, style variance, and grounding concerns.',
      implementation: 'Constrain generation with retrieval, validation, schema, and fallback behavior that matches the product risk.',
      failure: 'users receive fluent but unsafe or unsupported outputs',
      decision: 'where generation adds enough value to justify its uncertainty and cost',
      incident: 'a content-generation feature sounds smart but repeatedly invents unsupported details in customer-facing answers',
      evidence: ['groundedness and quality evals', 'user feedback and escalation rate', 'latency and token usage data'],
    },
  },
  {
    category: 'Python for AI',
    topicGroup: 'Python Foundations',
    concern: 'moving notebook ideas into stable services',
    relatedTopics: ['Data Processing', 'AI Monitoring'],
    profile: {
      mechanism: 'Python is the main application layer for data pipelines, inference orchestration, and evaluation workflows in AI products.',
      implementation: 'Package AI code as testable services or modules rather than leaving it as ad hoc notebooks.',
      failure: 'experiments work locally but collapse in deployment because they were never engineered as software',
      decision: 'how to structure AI code so it remains deployable, observable, and maintainable',
      incident: 'a notebook-derived prototype reaches production and fails under concurrent load or dependency drift',
      evidence: ['service logs and traces', 'dependency and environment manifests', 'test coverage and release history'],
    },
  },
  {
    category: 'Data Processing',
    topicGroup: 'Python Foundations',
    concern: 'cleaning and structuring source data for retrieval and evaluation',
    relatedTopics: ['Chunking', 'Embeddings Pipeline'],
    profile: {
      mechanism: 'Data processing shapes the content and metadata that retrieval, evaluation, and model pipelines depend on.',
      implementation: 'Normalize, segment, enrich, and version data so downstream AI behavior is reproducible.',
      failure: 'quality degrades because the source data path is noisy, stale, or inconsistent',
      decision: 'what transformations are required for the task and what should remain traceable to source',
      incident: 'a knowledge assistant suddenly degrades because new documents were ingested with broken chunking and metadata',
      evidence: ['ingestion and freshness metrics', 'source-to-index lineage', 'retrieval regression checks'],
    },
  },
  {
    category: 'Supervised Learning',
    topicGroup: 'Machine Learning',
    concern: 'keeping deterministic predictive components where they are the best fit',
    relatedTopics: ['AI System Design', 'Evaluation'],
    profile: {
      mechanism: 'Supervised learning predicts outcomes from labeled examples and remains valuable for many structured business tasks.',
      implementation: 'Use supervised models where prediction consistency matters more than language flexibility.',
      failure: 'stable prediction problems are replaced with expensive and less predictable language workflows',
      decision: 'when to keep a classic ML component rather than replacing it with an LLM',
      incident: 'a support-routing system becomes less accurate after a deterministic classifier is replaced by generative prompting',
      evidence: ['offline model metrics', 'business KPI comparison', 'error-analysis and drift reports'],
    },
  },
  {
    category: 'Unsupervised Learning',
    topicGroup: 'Machine Learning',
    concern: 'using similarity and grouping signals safely',
    relatedTopics: ['Embeddings', 'Vector Databases'],
    profile: {
      mechanism: 'Unsupervised learning finds structure without labels and often supports clustering, segmentation, or retrieval features.',
      implementation: 'Validate whether discovered patterns actually help product decisions before automating on top of them.',
      failure: 'mathematical patterns are mistaken for product-ready truth',
      decision: 'how much human review and metadata is needed before unsupervised outputs influence users',
      incident: 'cluster-based routing looks clean offline but creates poor ticket triage because the groups do not map to operational reality',
      evidence: ['cluster or similarity evaluation', 'human validation notes', 'downstream workflow impact'],
    },
  },
  {
    category: 'Neural Networks',
    topicGroup: 'Deep Learning',
    concern: 'understanding probabilistic pattern learning instead of deterministic logic',
    relatedTopics: ['Transformers', 'GPT Models'],
    profile: {
      mechanism: 'Neural networks learn patterns statistically and therefore need validation, not blind trust.',
      implementation: 'Choose pretrained or served models with clear task fit and measured behavior.',
      failure: 'teams over-interpret confident outputs as correctness',
      decision: 'how much model complexity is justified for the business task and support model',
      incident: 'a model seems impressive in demos but fails on real user distribution because the team never validated beyond ideal inputs',
      evidence: ['task-specific evaluation', 'confidence or error analysis', 'production quality drift metrics'],
    },
  },
  {
    category: 'Transformers',
    topicGroup: 'Deep Learning',
    concern: 'designing around attention, context, and token trade-offs',
    relatedTopics: ['Context Windows', 'RAG'],
    profile: {
      mechanism: 'Transformers process tokens with attention and therefore inherit context-window, latency, and prompt-composition trade-offs.',
      implementation: 'Use retrieval, summarization, and budgeted context instead of stuffing all information into one huge prompt.',
      failure: 'quality drops and cost rises because context strategy is lazy',
      decision: 'when the task needs retrieval, memory compression, or multi-step processing instead of bigger prompts',
      incident: 'a long-context assistant becomes slower and less accurate after teams keep adding more source text to every request',
      evidence: ['token and latency data', 'prompt composition history', 'quality comparison across context sizes'],
    },
  },
  {
    category: 'GPT Models',
    topicGroup: 'LLM Foundations',
    concern: 'selecting and governing general-purpose model usage',
    relatedTopics: ['Tokens', 'Zero Shot'],
    profile: {
      mechanism: 'GPT-style models are flexible language engines that need explicit prompting, boundaries, and evaluation inside products.',
      implementation: 'Choose the model tier, prompt pattern, and validation steps from the task rather than from hype.',
      failure: 'the product becomes brittle to one model choice and no one can explain quality or cost behavior',
      decision: 'which model capabilities are truly needed and how to insulate the system from provider change',
      incident: 'a model update changes answer behavior and the team realizes there is no evaluation baseline or fallback',
      evidence: ['quality and latency benchmarks', 'token and cost reports', 'version-to-version comparison tests'],
    },
  },
  {
    category: 'Tokens',
    topicGroup: 'LLM Foundations',
    concern: 'budgeting prompt size, output space, and cost',
    relatedTopics: ['Context Windows', 'Cost Optimization'],
    profile: {
      mechanism: 'Tokens are the units models process, bill, and limit within a context window.',
      implementation: 'Plan tokens for instructions, retrieval, and output so the model has enough room to answer and enough relevance to stay grounded.',
      failure: 'prompt cost and truncation problems silently undermine the experience',
      decision: 'how much context to include and where prompt compression or staging is required',
      incident: 'structured responses start failing because retrieval grew and no output budget was reserved',
      evidence: ['token distribution by request', 'cost trends', 'failure and truncation logs'],
    },
  },
  {
    category: 'Embeddings',
    topicGroup: 'LLM Foundations',
    concern: 'building semantic representations that improve retrieval',
    relatedTopics: ['Vector Databases', 'RAG'],
    profile: {
      mechanism: 'Embeddings represent content semantically so similarity search can retrieve related knowledge or items.',
      implementation: 'Choose embedding models, metadata, and chunking that reflect the real question patterns and domain language.',
      failure: 'search returns semantically nearby but operationally useless results',
      decision: 'how to represent content and what metadata is required for relevance and permissions',
      incident: 'answer quality drops after reindexing because the new embeddings no longer reflect the domain as well as the old ones',
      evidence: ['retrieval relevance tests', 'embedding-model and index versions', 'question-to-result quality metrics'],
    },
  },
  {
    category: 'Context Windows',
    topicGroup: 'LLM Foundations',
    concern: 'managing prompt memory without drowning the model in irrelevant text',
    relatedTopics: ['Tokens', 'Chunking'],
    profile: {
      mechanism: 'Context windows limit how much tokenized information the model can reason over in one call.',
      implementation: 'Reserve room for instructions and output, then retrieve only what helps the current turn.',
      failure: 'too much low-value context makes the system slower, costlier, and less focused',
      decision: 'what context belongs in the prompt and what should be summarized or retrieved later',
      incident: 'conversation quality decays over long sessions because history is appended blindly instead of managed intentionally',
      evidence: ['prompt-size telemetry', 'latency and quality comparisons', 'conversation and summarization behavior logs'],
    },
  },
  {
    category: 'Zero Shot',
    topicGroup: 'Prompt Engineering',
    concern: 'using clean instructions before adding more complexity',
    relatedTopics: ['Few Shot', 'GPT Models'],
    profile: {
      mechanism: 'Zero-shot prompting asks the model to perform a task using instructions alone.',
      implementation: 'Use strong task framing, output constraints, and evaluation before deciding zero-shot is insufficient.',
      failure: 'teams conclude the model is weak when the real issue is vague prompting or poor task design',
      decision: 'whether instruction-only prompting is good enough or examples and retrieval are required',
      incident: 'a zero-shot classifier drifts badly on edge cases because no schema constraints or evals were added',
      evidence: ['prompt versions', 'task-quality benchmarks', 'edge-case and regression results'],
    },
  },
  {
    category: 'Few Shot',
    topicGroup: 'Prompt Engineering',
    concern: 'using examples to improve consistency without wasting context',
    relatedTopics: ['Zero Shot', 'Evaluation'],
    profile: {
      mechanism: 'Few-shot prompting teaches the model expected structure or style through worked examples.',
      implementation: 'Use representative examples that improve the task materially and justify their token cost.',
      failure: 'prompt examples consume context but still do not generalize to the real workload',
      decision: 'which examples improve reliability enough to belong in every request',
      incident: 'a prompt behaves well in testing but fails in production because its examples did not cover messy real inputs',
      evidence: ['prompt A/B comparisons', 'token and context budgets', 'failure cases across live inputs'],
    },
  },
  {
    category: 'Chain of Thought',
    topicGroup: 'Prompt Engineering',
    concern: 'encouraging reasoning without overspending or overexposing internal steps',
    relatedTopics: ['Agents', 'Evaluation'],
    profile: {
      mechanism: 'Chain-of-thought style prompting helps the model break down tasks into steps before producing a final answer.',
      implementation: 'Use decomposition where it improves measured performance and keep user-visible output controlled.',
      failure: 'teams equate verbose reasoning with correctness and ignore latency or token impact',
      decision: 'when step decomposition improves the task enough to justify extra complexity',
      incident: 'an internal planning feature works better with decomposition, but customer-facing use becomes too slow and noisy',
      evidence: ['task accuracy deltas', 'token and latency metrics', 'comparison against simpler prompt patterns'],
    },
  },
  {
    category: 'Retrieval Augmented Generation',
    topicGroup: 'RAG',
    concern: 'grounding model responses in current, permission-aware knowledge',
    relatedTopics: ['Chunking', 'Vector Databases'],
    profile: {
      mechanism: 'RAG retrieves relevant knowledge at runtime and injects it into the model prompt.',
      implementation: 'Measure retrieval quality, enforce metadata filters, and validate answer grounding instead of trusting generation alone.',
      failure: 'the assistant sounds authoritative but is built on poor or unauthorized context retrieval',
      decision: 'what knowledge should be retrieved, how filtered it must be, and how grounding is shown to users',
      incident: 'a knowledge assistant begins leaking stale or cross-team content because retrieval governance was weak',
      evidence: ['retrieval and groundedness evals', 'metadata and permission checks', 'user feedback and escalation logs'],
    },
  },
  {
    category: 'Vector Databases',
    topicGroup: 'RAG',
    concern: 'operating semantic search infrastructure as part of the product',
    relatedTopics: ['Embeddings', 'Embeddings Pipeline'],
    profile: {
      mechanism: 'Vector databases store embeddings and support similarity search plus metadata filtering.',
      implementation: 'Design them as one layer in a retrieval architecture with freshness, filtering, and evaluation controls.',
      failure: 'teams install a vector store and assume relevance, security, and freshness are solved automatically',
      decision: 'which vector platform and indexing model best supports the retrieval workload',
      incident: 'search latency or noisy matches spike after content growth because index design and metadata strategy were never revisited',
      evidence: ['search latency and index metrics', 'retrieval quality tests', 'ingestion and freshness dashboards'],
    },
  },
  {
    category: 'Chunking',
    topicGroup: 'RAG',
    concern: 'preserving enough context while keeping retrieval precise',
    relatedTopics: ['Embeddings Pipeline', 'Context Windows'],
    profile: {
      mechanism: 'Chunking breaks source content into pieces that can be embedded, retrieved, and fit into prompts.',
      implementation: 'Choose chunk size and overlap from document structure and question patterns, not from a single arbitrary number.',
      failure: 'important context is split apart or retrieval becomes noisy and expensive',
      decision: 'how to segment each content type so the answerer sees enough but not too much',
      incident: 'a support assistant retrieves headings with no surrounding details because the chunking strategy was too aggressive',
      evidence: ['chunk-to-question evaluation', 'retrieval comparison across chunk strategies', 'token and answer-quality metrics'],
    },
  },
  {
    category: 'Embeddings Pipeline',
    topicGroup: 'RAG',
    concern: 'keeping indexed knowledge fresh and traceable',
    relatedTopics: ['Data Processing', 'Vector Databases'],
    profile: {
      mechanism: 'An embeddings pipeline ingests, cleans, chunks, embeds, indexes, and refreshes source content.',
      implementation: 'Version the pipeline and expose freshness, failure, and quality checks so index changes are supportable.',
      failure: 'the retrieval system quietly degrades because content changed but indexing did not',
      decision: 'how to balance pipeline freshness, cost, and operational confidence',
      incident: 'support agents report bad answers after a wiki migration because the embeddings pipeline failed silently for one source set',
      evidence: ['ingestion success and freshness', 'index version history', 'post-ingestion retrieval checks'],
    },
  },
  {
    category: 'Pinecone',
    topicGroup: 'Vector Databases',
    concern: 'using a managed vector platform effectively',
    relatedTopics: ['Vector Databases', 'RAG'],
    profile: {
      mechanism: 'Pinecone provides managed vector search infrastructure with metadata filtering and operational abstractions.',
      implementation: 'Use namespaces, metadata, and retrieval evaluation deliberately instead of assuming the platform handles relevance automatically.',
      failure: 'managed search works operationally but still returns weak or unsafe results',
      decision: 'whether a hosted vector platform is worth the cost and operational trade-offs for the workload',
      incident: 'a production RAG system scales quickly, but poor namespace or filter design causes noisy multi-tenant retrieval',
      evidence: ['query latency and usage stats', 'namespace and metadata design', 'tenant or retrieval relevance tests'],
    },
  },
  {
    category: 'Chroma',
    topicGroup: 'Vector Databases',
    concern: 'using lightweight vector tooling without confusing prototype and production readiness',
    relatedTopics: ['FAISS', 'AI System Design'],
    profile: {
      mechanism: 'Chroma is a developer-friendly vector database often used in local or lightweight retrieval stacks.',
      implementation: 'Use it for experimentation while still designing metadata, evaluation, and migration paths seriously.',
      failure: 'prototype retrieval success is mistaken for production readiness',
      decision: 'when a lightweight vector system is enough and when the product needs stronger operational guarantees',
      incident: 'a successful prototype stalls before launch because security, refresh, and scaling assumptions were never defined',
      evidence: ['prototype evaluation data', 'operational readiness checklist', 'migration or scaling requirements'],
    },
  },
  {
    category: 'FAISS',
    topicGroup: 'Vector Databases',
    concern: 'handling low-level vector search with enough surrounding engineering',
    relatedTopics: ['Vector Databases', 'Embeddings'],
    profile: {
      mechanism: 'FAISS is a low-level similarity-search library that gives teams control but not a full managed retrieval platform.',
      implementation: 'Plan the surrounding metadata, persistence, and refresh model before adopting FAISS in real products.',
      failure: 'the search core is fast but the overall system is brittle or incomplete',
      decision: 'whether the team needs low-level control badly enough to own more platform work',
      incident: 'a custom search service built on FAISS becomes hard to debug because indexing, metadata, and query behavior are scattered across components',
      evidence: ['search performance and quality benchmarks', 'metadata-service integration', 'operational support complexity'],
    },
  },
  {
    category: 'Chatbots',
    topicGroup: 'AI Applications',
    concern: 'making conversational AI useful and trustworthy',
    relatedTopics: ['Knowledge Systems', 'Monitoring'],
    profile: {
      mechanism: 'Chatbots combine language models, retrieval, memory, and product UX into a conversational interface.',
      implementation: 'Keep scope clear, manage memory intentionally, and surface uncertainty or escalation when the bot is out of depth.',
      failure: 'the chatbot is fluent but unreliable, and users stop trusting it',
      decision: 'what the bot should answer directly, what it should retrieve, and when it should escalate',
      incident: 'customer trust drops because the bot answers confidently outside its support boundary and no escalation path appears',
      evidence: ['session quality and escalation metrics', 'retrieval and answer logs', 'user feedback and support impact'],
    },
  },
  {
    category: 'Agents',
    topicGroup: 'AI Applications',
    concern: 'tool use and iterative task execution under control',
    relatedTopics: ['Multi-Agent Systems', 'Security'],
    profile: {
      mechanism: 'Agents use models plus tools and state to execute workflows rather than only responding once.',
      implementation: 'Limit tools, permissions, and step counts, and record every decision path needed for debugging.',
      failure: 'agent systems become expensive, slow, or unsafe because autonomy is less controlled than the marketing suggests',
      decision: 'when a task truly needs an agent loop rather than a simpler retrieval or workflow pattern',
      incident: 'an agent keeps retrying tools and burns cost without completing the task because stop criteria and observability were weak',
      evidence: ['tool-call logs', 'task completion and error metrics', 'permission and action audit trails'],
    },
  },
  {
    category: 'Knowledge Systems',
    topicGroup: 'AI Applications',
    concern: 'building permission-aware answers over real enterprise content',
    relatedTopics: ['RAG', 'Security'],
    profile: {
      mechanism: 'Knowledge systems join ingestion, permissions, retrieval, generation, and UX to help users find trusted answers.',
      implementation: 'Design freshness, permission filters, and source transparency into the first version.',
      failure: 'users get outdated or unauthorized content and stop trusting the system',
      decision: 'how much of the answer should be generated versus quoted or grounded from source material',
      incident: 'an internal assistant returns content from the wrong team space because metadata and access controls were not enforced in retrieval',
      evidence: ['permission-aware retrieval tests', 'source freshness and answer grounding data', 'user trust and escalation signals'],
    },
  },
  {
    category: 'AI System Design',
    topicGroup: 'AI Architecture',
    concern: 'joining retrieval, models, validation, UX, and operations into one product',
    relatedTopics: ['Enterprise AI', 'Evaluation'],
    profile: {
      mechanism: 'AI system design is the end-to-end architecture for data access, inference, orchestration, validation, and supportability.',
      implementation: 'Begin from the user workflow and risk model, then choose the simplest architecture that can meet quality and trust targets.',
      failure: 'the feature works in isolation but not as a dependable product capability',
      decision: 'which architecture pattern provides enough quality without creating unnecessary operational drag',
      incident: 'an AI feature launches fast but creates support churn because no fallback, monitoring, or evaluation loop existed',
      evidence: ['system diagrams and quality targets', 'evaluation gates', 'runtime monitoring and support data'],
    },
  },
  {
    category: 'Multi-Agent Systems',
    topicGroup: 'AI Architecture',
    concern: 'coordinating specialized agents without exploding complexity',
    relatedTopics: ['Agents', 'AI Monitoring'],
    profile: {
      mechanism: 'Multi-agent systems distribute sub-tasks across several role-specific agents or planners.',
      implementation: 'Use them only when decomposition clearly improves results and make every handoff observable.',
      failure: 'coordination complexity grows faster than measurable user value',
      decision: 'whether multi-agent orchestration earns its operational cost and debugging burden',
      incident: 'a multi-agent workflow becomes impossible to explain during incidents because each handoff hides state and assumptions',
      evidence: ['task-completion metrics by stage', 'handoff and tool-call logs', 'quality comparison against simpler workflows'],
    },
  },
  {
    category: 'Enterprise AI',
    topicGroup: 'AI Architecture',
    concern: 'governance, adoption, and long-term operating model',
    relatedTopics: ['AI Security', 'AI System Design'],
    profile: {
      mechanism: 'Enterprise AI aligns model use with privacy, procurement, permissions, observability, support, and product governance.',
      implementation: 'Clarify approved data flows, owners, evaluation gates, and release rules before scaling to many teams.',
      failure: 'the feature is technically impressive but cannot survive security, legal, or support review',
      decision: 'how the organization will govern AI use without blocking valuable delivery',
      incident: 'a business unit wants broad AI rollout but platform, legal, and security teams cannot agree on data and ownership boundaries',
      evidence: ['governance requirements and approvals', 'ownership maps', 'evaluation and audit artifacts'],
    },
  },
  {
    category: 'Evaluation',
    topicGroup: 'Production AI',
    concern: 'proving quality changes before users discover regressions',
    relatedTopics: ['Monitoring', 'Hallucinations'],
    profile: {
      mechanism: 'Evaluation measures whether the AI system is correct, useful, safe, and efficient for the real task.',
      implementation: 'Build task-specific evaluation sets and use them to compare prompts, retrieval changes, model upgrades, and workflow variants.',
      failure: 'teams ship regressions because they rely on intuition instead of measured quality',
      decision: 'what metrics and test cases define “good enough” for the feature',
      incident: 'a prompt tweak raises one benchmark score but breaks real customer questions because the eval set was too narrow',
      evidence: ['evaluation datasets and scores', 'baseline and candidate comparisons', 'post-release quality signals'],
    },
  },
  {
    category: 'Monitoring',
    topicGroup: 'Production AI',
    concern: 'seeing latency, cost, quality, and retrieval drift together',
    relatedTopics: ['Cost Optimization', 'Production Issues'],
    profile: {
      mechanism: 'AI monitoring correlates model, retrieval, tool, and user-experience signals so teams can operate the feature safely.',
      implementation: 'Log enough context to debug failures without exposing sensitive content, then alert on quality and cost drift as well as uptime.',
      failure: 'the team only notices problems after support tickets pile up',
      decision: 'which signals should block release, trigger alerting, or drive product iteration',
      incident: 'latency and user dissatisfaction spike after a content change, but the team cannot tell whether the issue is retrieval, prompt size, or the provider',
      evidence: ['request and token telemetry', 'retrieval and tool metrics', 'feedback, fallback, and escalation data'],
    },
  },
  {
    category: 'Hallucinations',
    topicGroup: 'Production AI',
    concern: 'grounding outputs and handling uncertainty responsibly',
    relatedTopics: ['RAG', 'Chatbots'],
    profile: {
      mechanism: 'Hallucinations occur when the system generates unsupported or fabricated content.',
      implementation: 'Reduce them with retrieval, validation, constrained scope, clear UX, and fallback behavior.',
      failure: 'user trust erodes because the system sounds confident while being wrong',
      decision: 'how much uncertainty the product can tolerate and what mitigation pattern is required',
      incident: 'an assistant starts inventing policy answers because a retrieval failure path still lets the model answer freely',
      evidence: ['groundedness or citation checks', 'user trust and escalation signals', 'retrieval-failure and answer-quality telemetry'],
    },
  },
  {
    category: 'Cost Optimization',
    topicGroup: 'Production AI',
    concern: 'keeping model usage financially sustainable',
    relatedTopics: ['Tokens', 'GPT Models'],
    profile: {
      mechanism: 'AI cost optimization balances model, retrieval, and orchestration spend against actual user value.',
      implementation: 'Measure cost per useful task, then trim prompt waste, choose better model tiers, and avoid unnecessary steps.',
      failure: 'the feature becomes too expensive to scale even though users like it',
      decision: 'what quality level justifies the current cost profile and which optimizations are safe',
      incident: 'usage grows quickly and monthly spend spikes because prompts, tools, and model tiers were never optimized after launch',
      evidence: ['cost per request and per successful task', 'token and model usage data', 'quality-vs-cost comparison results'],
    },
  },
  {
    category: 'Security',
    topicGroup: 'Production AI',
    concern: 'protecting data, prompts, and tool boundaries',
    relatedTopics: ['Enterprise AI', 'Agents'],
    profile: {
      mechanism: 'AI security covers prompt injection, data leakage, permission boundaries, tool safety, and output handling.',
      implementation: 'Map the trust boundary around user input, retrieval, tools, and outputs before rolling the feature out widely.',
      failure: 'the AI path bypasses controls that already exist elsewhere in the system',
      decision: 'what the model can see, call, and reveal and how that is authorized and audited',
      incident: 'an agent workflow exposes sensitive content because retrieval filtering and tool permissions were weaker than the rest of the product',
      evidence: ['access and tool audit trails', 'permission-aware retrieval tests', 'security review and red-team findings'],
    },
  },
  {
    category: 'LLM Scenarios',
    topicGroup: 'Interview Prep',
    concern: 'solving realistic AI product trade-offs under pressure',
    relatedTopics: ['AI Architecture', 'Design Questions'],
    profile: {
      mechanism: 'LLM scenarios test whether you can reason about model, retrieval, UX, quality, and operations as one system.',
      implementation: 'Clarify the task and risk, then explain the simplest pattern that can be evaluated and supported.',
      failure: 'the answer sounds trendy but not trustworthy or operationally grounded',
      decision: 'which AI pattern genuinely matches the scenario’s user need and support constraints',
      incident: 'an interview design scenario reveals that the candidate can name components but cannot explain how the feature stays safe after launch',
      evidence: ['scenario constraints and options', 'evaluation and fallback plan', 'monitoring and ownership model'],
    },
  },
  {
    category: 'AI Architecture',
    topicGroup: 'Interview Prep',
    concern: 'communicating end-to-end design with trade-offs',
    relatedTopics: ['AI System Design', 'Enterprise AI'],
    profile: {
      mechanism: 'AI architecture questions evaluate your ability to design a system, not only a prompt.',
      implementation: 'Answer through data paths, retrieval, models, validation, UX, evaluation, and governance.',
      failure: 'the answer remains diagram-deep and never proves why the design is trustworthy or supportable',
      decision: 'which architecture is just complex enough to meet the task and risk profile',
      incident: 'a design review fails because the architecture omitted fallback behavior, operational metrics, or permission boundaries',
      evidence: ['architecture decision logic', 'quality and safety checks', 'operating-model responsibilities'],
    },
  },
  {
    category: 'Production Issues',
    topicGroup: 'Interview Prep',
    concern: 'debugging the real boundary instead of blaming “the model”',
    relatedTopics: ['Monitoring', 'Evaluation'],
    profile: {
      mechanism: 'Production AI issues often stem from retrieval, prompts, tool orchestration, provider behavior, or data freshness rather than from the model alone.',
      implementation: 'Preserve enough telemetry and version history to compare the broken path against a known-good baseline.',
      failure: 'incidents stay vague because the system is not instrumented to explain which layer changed',
      decision: 'which mitigation restores user trust fastest without masking the actual root cause',
      incident: 'users report wrong answers after a release, but the team cannot tell whether the problem is content ingestion, prompts, model version, or tool flow',
      evidence: ['prompt, retrieval, and model version history', 'runtime traces and logs', 'quality and feedback regressions'],
    },
  },
  {
    category: 'Design Questions',
    topicGroup: 'Interview Prep',
    concern: 'turning AI capability into a supportable product feature',
    relatedTopics: ['LLM Scenarios', 'AI System Design'],
    profile: {
      mechanism: 'AI design questions ask how you would shape user experience, retrieval, models, safety, and rollout into a coherent feature.',
      implementation: 'Design from user job, product risk, and measurable quality instead of from a favorite framework.',
      failure: 'the proposal is clever but cannot explain what happens when the AI is slow, wrong, or unavailable',
      decision: 'which product pattern gives users value while staying governable and supportable',
      incident: 'a design interview reveals that the candidate has a prompt idea but no operational plan for evaluation, fallback, or support',
      evidence: ['feature requirements and quality goals', 'fallback and release plan', 'monitoring and iteration model'],
    },
  },
];

function defaultConcern(topicGroup: string, category: string) {
  switch (topicGroup) {
    case 'AI Fundamentals':
      return `choosing where ${category} adds real product value`;
    case 'Python Foundations':
      return `making ${category} reliable enough for production AI workflows`;
    case 'Machine Learning':
      return `using ${category} with measurable quality and operational confidence`;
    case 'Deep Learning':
      return `understanding how ${category} changes model behavior, latency, and supportability`;
    case 'LLM Foundations':
      return `using ${category} with the right balance of quality, cost, and control`;
    case 'Prompt Engineering':
      return `making ${category} consistent, measurable, and safe in production`;
    case 'RAG':
      return `keeping ${category} grounded, relevant, and supportable for real users`;
    case 'Vector Databases':
      return `operating ${category} with relevance, filtering, and freshness under control`;
    case 'AI Applications':
      return `turning ${category} into a trustworthy user-facing capability`;
    case 'Agents':
      return `keeping ${category} observable, bounded, and useful under pressure`;
    case 'AI Architecture':
      return `using ${category} to shape a system that teams can actually operate`;
    case 'Production AI':
      return `using ${category} to maintain quality, trust, and operational discipline`;
    case 'Interview Prep':
      return `explaining ${category} with practical trade-offs instead of buzzwords`;
    default:
      return `using ${category} with clear trade-offs in production AI systems`;
  }
}

function defaultRelatedTopics(topicGroup: string, category: string): string[] {
  switch (topicGroup) {
    case 'AI Fundamentals':
      return ['AI System Design', 'Evaluation'];
    case 'Python Foundations':
      return ['Data Processing', 'Monitoring'];
    case 'Machine Learning':
      return ['Evaluation', 'AI System Design'];
    case 'Deep Learning':
      return ['Transformers', 'Context Windows'];
    case 'LLM Foundations':
      return ['Tokens', 'Evaluation'];
    case 'Prompt Engineering':
      return ['Evaluation', 'GPT Models'];
    case 'RAG':
      return ['Retrieval Augmented Generation', 'Vector Databases'];
    case 'Vector Databases':
      return ['Embeddings', 'Retrieval Augmented Generation'];
    case 'AI Applications':
      return ['AI System Design', 'Monitoring'];
    case 'Agents':
      return ['Agents', 'Monitoring'];
    case 'AI Architecture':
      return ['Enterprise AI', 'Evaluation'];
    case 'Production AI':
      return ['Monitoring', 'Evaluation'];
    case 'Interview Prep':
      return ['AI Architecture', 'Production Issues'];
    default:
      return ['Evaluation', 'AI System Design'];
  }
}

function createFallbackTopicSpec(category: string, topicGroup: string): TopicSpec {
  const concern = defaultConcern(topicGroup, category);

  return {
    category,
    topicGroup,
    concern,
    relatedTopics: defaultRelatedTopics(topicGroup, category),
    profile: {
      mechanism: `${category} is part of the applied AI system, so teams need to understand how it affects product behavior, reliability, and supportability rather than treating it as isolated model vocabulary.`,
      implementation: `Design ${category} with clear task boundaries, measurable quality targets, observable runtime behavior, and fallback paths for when the AI system becomes uncertain or expensive.`,
      failure: `${category} is discussed as theory, but no one can prove how it behaves in production or how it should be supported when quality drops`,
      decision: `how much complexity ${category} deserves compared with simpler, cheaper, or safer alternatives`,
      incident: `a production feature relying on ${category} starts showing quality drift, latency spikes, or user-trust issues and the team must isolate what changed`,
      evidence: ['evaluation results and regressions', 'runtime traces with latency and cost signals', 'user feedback, fallback, and escalation patterns'],
    },
  };
}

const topicSpecsByCategory = new Map(topicSpecs.map((spec) => [spec.category, spec] as const));

const resolvedTopicSpecs: TopicSpec[] = aiLlmInterviewPrepTopicGroups.flatMap((group) => (
  group.topics.map((topic) => topicSpecsByCategory.get(topic.category) ?? createFallbackTopicSpec(topic.category, group.title))
));

const concernOverrides: Partial<Record<string, string[]>> = {
  'AI Basics': [
    'turning model capability into a real user workflow',
    'deciding when AI should not be used at all',
    'explaining AI scope and limitations to product stakeholders',
  ],
  'ML vs DL vs LLM': [
    'choosing the right model family for the job',
    'balancing determinism against flexibility and cost',
    'avoiding expensive LLM usage for simpler predictive tasks',
  ],
  'Generative AI': [
    'handling useful generation without losing trust',
    'grounding generated output before users act on it',
    'designing safe fallback behavior for uncertain outputs',
  ],
  'Agents': [
    'tool use and iterative task execution under control',
    'preventing looping behavior and runaway cost',
    'choosing when an agent is unnecessary complexity',
  ],
  'Retrieval Augmented Generation': [
    'grounding model responses in current, permission-aware knowledge',
    'measuring retrieval quality before blaming the model',
    'handling stale, incomplete, or unauthorized context safely',
  ],
  'Vector Databases': [
    'operating semantic search infrastructure as part of the product',
    'keeping relevance, freshness, and filtering under control',
    'proving retrieval quality with real user questions',
  ],
  'Evaluation': [
    'proving quality changes before users discover regressions',
    'choosing representative evaluation cases instead of vanity benchmarks',
    'using release gates before prompts, models, or retrieval changes ship',
  ],
  'Monitoring': [
    'seeing latency, cost, quality, and retrieval drift together',
    'isolating whether failures come from retrieval, prompts, tools, or the model',
    'capturing enough evidence to support incidents without leaking sensitive data',
  ],
  'Security': [
    'protecting data, prompts, and tool boundaries',
    'enforcing permission-aware retrieval and action controls',
    'defending the AI path with the same rigor as the rest of the product',
  ],
  'Enterprise AI': [
    'governance, adoption, and long-term operating model',
    'standardizing ownership and release controls across many teams',
    'balancing platform enablement with security and legal constraints',
  ],
  'AI Architecture': [
    'communicating end-to-end design with trade-offs',
    'choosing the simplest architecture that still meets quality goals',
    'defending operational ownership, fallback, and evaluation loops',
  ],
  'Production Issues': [
    'debugging the real boundary instead of blaming the model',
    'isolating recent changes across prompts, retrieval, tools, and providers',
    'restoring user trust while preserving incident evidence',
  ],
};

function defaultConcernVariants(topicGroup: string, category: string): string[] {
  switch (topicGroup) {
    case 'AI Fundamentals':
      return [
        `choosing where ${category} adds real product value`,
        `explaining ${category} through user outcomes instead of hype`,
        `avoiding demo-first design when ${category} enters production`,
      ];
    case 'Python Foundations':
      return [
        `making ${category} reliable enough for production AI workflows`,
        `turning ${category} into reproducible, testable engineering assets`,
        `debugging data and runtime issues before they reach users`,
      ];
    case 'Machine Learning':
      return [
        `using ${category} with measurable quality and operational confidence`,
        `proving offline gains actually help the production task`,
        `choosing ${category} only when it improves the business workflow`,
      ];
    case 'Deep Learning':
      return [
        `understanding how ${category} changes model behavior, latency, and supportability`,
        `explaining ${category} with trade-offs instead of buzzwords`,
        `using ${category} where the extra complexity is justified`,
      ];
    case 'LLM Foundations':
      return [
        `using ${category} with the right balance of quality, cost, and control`,
        `handling provider behavior, context, and output reliability`,
        `governing ${category} so upgrades stop being guesswork`,
      ];
    case 'Prompt Engineering':
      return [
        `making ${category} consistent, measurable, and safe in production`,
        `testing ${category} changes before they reach users`,
        `combining ${category} with structure, validation, and fallback behavior`,
      ];
    case 'RAG':
      return [
        `keeping ${category} grounded, relevant, and supportable for real users`,
        `measuring retrieval quality before changing prompts or models`,
        `using ${category} with permission-aware and freshness-aware context`,
      ];
    case 'Vector Databases':
      return [
        `operating ${category} with relevance, filtering, and freshness under control`,
        `choosing ${category} with the right operational model and scale assumptions`,
        `treating ${category} as one retrieval layer rather than the whole solution`,
      ];
    case 'AI Applications':
      return [
        `turning ${category} into a trustworthy user-facing capability`,
        `designing fallback and escalation paths around ${category}`,
        `proving that ${category} helps a business workflow, not just a demo`,
      ];
    case 'Agents':
      return [
        `keeping ${category} observable, bounded, and useful under pressure`,
        `controlling tool usage, memory, and stop conditions around ${category}`,
        `deciding when ${category} is over-engineering for the task`,
      ];
    case 'AI Architecture':
      return [
        `using ${category} to shape a system that teams can actually operate`,
        `connecting ${category} to ownership, evaluation, and release discipline`,
        `balancing platform flexibility against supportability and governance`,
      ];
    case 'Production AI':
      return [
        `using ${category} to maintain quality, trust, and operational discipline`,
        `reducing regressions and surprises after launch`,
        `making ${category} measurable enough for incident response and improvement`,
      ];
    case 'Interview Prep':
      return [
        `explaining ${category} with practical trade-offs instead of buzzwords`,
        `answering ${category} questions through real production scenarios`,
        `connecting ${category} to architecture, support, and business risk`,
      ];
    default:
      return [
        `using ${category} with clear trade-offs in production AI systems`,
        `making ${category} measurable and supportable`,
        `explaining ${category} through real user and system impact`,
      ];
  }
}

function getConcernVariants(spec: TopicSpec) {
  return concernOverrides[spec.category] ?? [spec.concern, ...defaultConcernVariants(spec.topicGroup, spec.category).slice(1)];
}

const intents: Intent[] = ['concept', 'implementation', 'troubleshooting', 'architecture'];

function questionText(intent: Intent, spec: TopicSpec) {
  if (intent === 'concept') {
    return `Explain ${spec.category} in AI / LLM engineering. Why does ${spec.concern} matter in production systems?`;
  }
  if (intent === 'implementation') {
    return `How would you implement ${spec.category} so ${spec.concern} is handled well in a real AI product?`;
  }
  if (intent === 'troubleshooting') {
    return `How would you troubleshoot a production AI issue involving ${spec.category} when ${spec.profile.incident}?`;
  }
  return `How would you make an architecture decision about ${spec.category} when ${spec.concern} is critical for the AI system?`;
}

function buildQuestion(spec: TopicSpec, intent: Intent, index: number): InterviewPrepQuestion {
  const industry = industries[hash(`${spec.category}-${intent}`) % industries.length];
  const directAnswer = intent === 'concept'
    ? `${spec.profile.mechanism} For ${spec.category}, the product-critical concern is ${spec.concern}.`
    : intent === 'implementation'
      ? `Implement ${spec.category} so ${spec.concern} is measurable, observable, and supportable in production.`
      : intent === 'troubleshooting'
        ? `Treat ${spec.category} as one boundary inside the AI system, then isolate the issue with version history, telemetry, and recent-change analysis before guessing.`
        : `The key architecture decision for ${spec.category} is ${spec.profile.decision}. The answer must balance quality, trust, latency, cost, and operational ownership.`;

  return {
    id: `ai-llm-${slugify(spec.category)}-${slugify(spec.concern)}-${intent}`,
    technologyId: 'ai-llm',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question: questionText(intent, spec),
    shortAnswer: `${directAnswer} Validate it with ${spec.profile.evidence[0]}.`,
    detailedAnswer: [
      `Direct answer: ${directAnswer}`,
      `What: ${spec.profile.mechanism}`,
      `Why: Teams care because ${spec.profile.failure}.`,
      `How: ${spec.profile.implementation}`,
      `Production validation: Prove the answer with ${list(spec.profile.evidence)}.`,
    ],
    productionScenario: `A ${industry} AI product is showing this signal: ${spec.profile.incident}. The engineer must explain how ${spec.category} influences the problem, isolate the failing layer, and restore user trust safely.`,
    realProjectExample: `On a ${industry} platform, the team used ${spec.category} to solve ${spec.concern}. The design was accepted only after they proved it with ${list(spec.profile.evidence)} and documented how it would be monitored after launch.`,
    interviewerExpectation: `The interviewer expects a practical AI engineering answer that connects ${spec.category} to ${spec.concern}, acknowledges uncertainty or trade-offs, and shows how the system would be evaluated and operated.`,
    commonMistakes: [
      `Explaining ${spec.category} without connecting it to product quality, user trust, or operational support.`,
      `Ignoring this core decision: ${spec.profile.decision}.`,
      `Blaming the model first without checking evidence from ${list(spec.profile.evidence)}.`,
      `Skipping evaluation, monitoring, or fallback behavior for ${spec.category}.`,
    ],
    followUpQuestions: [
      `Which layer most changes your answer for ${spec.category}: retrieval, prompt, model, tool use, or UX?`,
      `How would ${spec.profile.evidence[0]} and ${spec.profile.evidence[1]} prove the issue or the fix?`,
      `What fallback would you use if ${spec.profile.incident}?`,
      `At what scale or risk level would you redesign the ${spec.category} approach?`,
    ],
    frequencyScore: Math.max(69, (intent === 'concept' ? 94 : intent === 'implementation' ? 90 : intent === 'troubleshooting' ? 87 : 83) - (index % 7)),
    commonWrongAnswer: `A weak answer names AI terms but does not explain system boundaries, evaluation, or supportability for ${spec.category}.`,
    architectPerspective: `Architects govern ${spec.category} through this decision: ${spec.profile.decision}. They evaluate user trust, latency, cost, data boundary, rollout risk, and the failure signal "${spec.profile.incident}".`,
    keyTakeaway: `Explain ${spec.category} through task fit, evidence, and operating trade-offs rather than through model vocabulary alone.`,
    difficultyLevel: difficultyByIntent[intent],
    experienceLevel: experienceByIntent[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I can explain the purpose of ${spec.category} and the safe baseline usage pattern.`,
      mid: `I can implement ${spec.category} with measurable quality, cost, and integration behavior.`,
      senior: `I can troubleshoot ${spec.category} issues using ${list(spec.profile.evidence)} and recent-change analysis.`,
      architect: `I can choose and govern a ${spec.category} pattern using ${spec.profile.decision}.`,
    },
    isMostAsked: index < 12,
    mostAskedRank: index < 12 ? index + 1 : undefined,
    isRapidRevision: index < 6,
  };
}

const questions = resolvedTopicSpecs.flatMap((spec) => {
  const variants = getConcernVariants(spec);
  return variants.flatMap((concern, concernIndex) => {
    const variantSpec: TopicSpec = { ...spec, concern };
    return intents.map((intent, intentIndex) => (
      buildQuestion(variantSpec, intent, (concernIndex * intents.length) + intentIndex)
    ));
  });
});

const topicGroups: InterviewPrepTopicGroup[] = aiLlmInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in AI / LLM engineering systems.`,
  topics: group.topics.map((topic) => topic.category),
}));

const questionsPerPage = 10;

const topicMetadata = resolvedTopicSpecs.map((spec) => {
  const topicQuestions = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    topicGroup: spec.topicGroup,
    totalQuestions: topicQuestions.length,
    estimatedPreparationMinutes: Math.max(18, Math.round(topicQuestions.length * 4.5)),
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

const topicPreparationSets = resolvedTopicSpecs.map((spec) => {
  const ranked = questions.filter((question) => question.category === spec.category);
  return {
    category: spec.category,
    mostAskedQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    top5QuestionIds: ranked.slice(0, 5).map((question) => question.id),
    top10QuestionIds: ranked.slice(0, 10).map((question) => question.id),
    thirtyMinuteQuestionIds: ranked.slice(0, 8).map((question) => question.id),
    sixtyMinuteQuestionIds: ranked.slice(0, 12).map((question) => question.id),
    lastMinuteQuestionIds: ranked.slice(0, 5).map((question) => question.id),
  };
});

const productionScenarios = [
  {
    id: 'ai-rag-hallucination-regression',
    title: 'RAG assistant hallucinates after content refresh',
    topic: 'Retrieval Augmented Generation',
    problem: 'After a content-ingestion update, the assistant starts answering with confident but unsupported details.',
    rootCauseAnalysis: ['Chunking or embeddings changed and retrieval quality regressed', 'Source freshness improved but metadata or filtering broke', 'The model still answers even when retrieval confidence is weak'],
    troubleshootingSteps: ['Compare retrieval results before and after the update', 'Inspect chunking, embedding, and metadata changes', 'Add or strengthen fallback when grounding is weak', 'Run evals on real user questions before re-enabling the new pipeline'],
    expectedInterviewAnswer: 'The candidate should treat it as a system-level grounding failure, not only a prompt problem.',
    seniorApproach: 'A senior answer compares pipeline versions, retrieval relevance, grounding metrics, and user-visible failure rate before choosing the fix.',
    architectApproach: 'An architect adds retrieval regression gates, source transparency, and safer fallback behavior into the platform standard.',
    relatedQuestions: questions.filter((question) => question.category === 'Retrieval Augmented Generation').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'ai-agent-cost-runaway',
    title: 'Agent workflow loops and cost spikes',
    topic: 'Agents',
    problem: 'A newly released agent repeatedly calls tools and model steps without completing tasks, causing latency and cost spikes.',
    rootCauseAnalysis: ['Stop conditions were weak or absent', 'Tool results were not interpreted correctly by the agent loop', 'Observability did not surface intermediate failure states early'],
    troubleshootingSteps: ['Trace the exact loop path and tool-call sequence', 'Cap retries and iteration depth immediately', 'Inspect tool output assumptions and policy prompts', 'Redesign the workflow with clearer control points'],
    expectedInterviewAnswer: 'A strong answer includes operational containment, tool-level debugging, and a discussion of whether the task needs an agent at all.',
    seniorApproach: 'A senior answer covers cost-per-task, loop detection, fallback behavior, and release rollback criteria.',
    architectApproach: 'An architect revisits whether a simpler workflow, planner, or constrained orchestration model would reduce risk.',
    relatedQuestions: questions.filter((question) => question.category === 'Agents').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'ai-enterprise-permission-leak',
    title: 'Knowledge assistant exposes content across permission boundary',
    topic: 'Knowledge Systems',
    problem: 'An internal assistant returns content from a restricted space to a user who should not see it.',
    rootCauseAnalysis: ['Retrieval filters did not enforce entitlements', 'Metadata and index namespaces were inconsistent', 'The system trusted retrieval results without boundary validation'],
    troubleshootingSteps: ['Disable the unsafe retrieval path', 'Verify metadata and permission filters end to end', 'Audit affected queries and content', 'Strengthen access-aware retrieval tests and governance reviews'],
    expectedInterviewAnswer: 'The candidate should frame this as a security and architecture failure, not only as a relevance bug.',
    seniorApproach: 'A senior answer includes scoping of exposed content, retrieval filter review, and short-term containment plus long-term prevention.',
    architectApproach: 'An architect makes permission-aware retrieval and audit evidence mandatory for enterprise AI rollout.',
    relatedQuestions: questions.filter((question) => question.category === 'Knowledge Systems').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'ai-quality-drift-after-model-upgrade',
    title: 'Model upgrade changes answer behavior unexpectedly',
    topic: 'Evaluation',
    problem: 'An LLM upgrade reduces the quality of structured outputs and raises support complaints even though the provider promises better performance.',
    rootCauseAnalysis: ['The new model interprets prompts differently', 'The team had no release gate with representative eval cases', 'Fallback rules and structured validation were too weak'],
    troubleshootingSteps: ['Compare new and old model behavior on evaluation and live samples', 'Restore the previous model or route traffic selectively', 'Tighten prompt and schema validation', 'Add model-change regression gates for future upgrades'],
    expectedInterviewAnswer: 'The right answer treats model upgrades as risky system changes that need evaluation, staged rollout, and rollback.',
    seniorApproach: 'A senior answer includes versioned evals, user-impact signals, prompt comparison, and controlled rollback.',
    architectApproach: 'An architect builds provider and model abstraction plus release governance so upgrades stop being guesswork.',
    relatedQuestions: questions.filter((question) => question.category === 'Evaluation').slice(0, 4).map((question) => question.id),
  },
];

export const aiLlmInterviewPrep: InterviewPrepSection = {
  technologyId: 'ai-llm',
  technologyLabel: 'AI / LLM Engineering',
  title: 'AI / LLM Engineering Interview Prep',
  description: 'Interview preparation for AI engineers covering prompting, retrieval, embeddings, agents, evaluation, monitoring, enterprise AI architecture, and production support.',
  lastReviewed: 'June 2026',
  categories: resolvedTopicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'AI / GenAI Associate', years: '0-2 Years', summary: 'Explain AI fundamentals, prompting, embeddings, and the building blocks of applied AI systems.' },
    { id: 'mid', label: 'AI Engineer / LLM Engineer', years: '2-5 Years', summary: 'Implement RAG, prompting, evaluation, and product integrations with measurable quality.' },
    { id: 'senior', label: 'Senior AI Engineer', years: '5-8 Years', summary: 'Lead troubleshooting, cost, quality, and operational discipline across production AI features.' },
    { id: 'architect', label: 'AI Architect', years: '8+ Years', summary: 'Design enterprise AI systems, governance models, and scalable operating patterns for many teams.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'AI Associate', description: 'Foundations, prompting, embeddings, and basic retrieval concepts.', questionCount: 10, recommendedMinutes: 30 },
    { id: 'mid', label: 'AI Engineer', description: 'RAG, vector stores, evaluation, chatbots, and applied feature design.', questionCount: 12, recommendedMinutes: 40 },
    { id: 'senior', label: 'Senior AI Engineer', description: 'Production support, latency, cost, hallucinations, agents, and workflow architecture.', questionCount: 12, recommendedMinutes: 50 },
    { id: 'architect', label: 'AI Architect', description: 'Enterprise AI, governance, multi-agent trade-offs, and end-to-end platform design.', questionCount: 10, recommendedMinutes: 60 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-signal RAG, prompting, embeddings, evaluation, and architecture questions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'AI fundamentals, GPT models, RAG, vector search, and production quality.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 24).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level AI system preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 48).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
