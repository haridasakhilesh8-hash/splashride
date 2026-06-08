import type { FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const defaultVersions = ['Python 3.11+', 'OpenAI-style LLM APIs', 'Vector Databases', 'Production AI Tooling'];

interface AiTopicSpec {
  slug: string;
  title: string;
  description: string;
  concept: string;
  why: string;
  usage: string;
  workflow: string;
  exampleTitle: string;
  exampleCode: string;
  productionIssues: string[];
  bestPractices: string[];
  relatedTopics: string[];
  faqs?: FAQ[];
}

function topic(spec: AiTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: defaultVersions,
    lastReviewed: reviewed,
    quickUnderstanding: `${spec.title} matters in AI engineering because model behavior alone is never enough. Real teams must connect prompts, retrieval, data quality, evaluation, latency, security, and product reliability into one operating system.`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers ask about this:**
- AI roles are judged on applied engineering judgment, not only model vocabulary
- Teams want to hear how you handle reliability, evaluation, user trust, and integration concerns
- Senior candidates must connect model behavior to production systems, cost, observability, and security`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical engineering example for ${spec.title.toLowerCase()}.`,
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
        question: `Is ${spec.title} mostly a theory topic?`,
        answer: `No. ${spec.title} becomes valuable when you can explain how it affects product quality, failure behavior, latency, cost, and the trustworthiness of AI features in production.`,
      },
      {
        question: `What makes a weak ${spec.title} answer in interviews?`,
        answer: `A weak answer defines ${spec.title} in isolation and ignores retrieval quality, evaluation, monitoring, security, user experience, or downstream system integration.`,
      },
      {
        question: `How do senior AI engineers discuss ${spec.title}?`,
        answer: `Senior engineers explain ${spec.title} with trade-offs, measurement, failure modes, and how teams keep the capability safe and useful after release.`,
      },
    ],
    productionIssues: spec.productionIssues,
    bestPractices: spec.bestPractices,
    architectNote: `For AI / LLM engineering, ${spec.title} should be evaluated as part of a larger system. Architecture decisions are about quality, safety, latency, cost, explainability, and how the team will observe and govern the feature over time.`,
    faqs: [
      {
        question: `Interview: how do you explain ${spec.title} in a real AI product?`,
        answer: `Explain ${spec.title} through the user problem, the model or data dependency it affects, and the production signals you would watch to keep that feature useful and trustworthy.`,
      },
      {
        question: `Interview: what production concern usually appears around ${spec.title}?`,
        answer: `The common production concern is that teams optimize for demos and ignore evaluation, latency, cost, governance, fallback behavior, or data quality until users start depending on the feature.`,
      },
      ...(spec.faqs ?? []),
    ],
    keyTakeaways: [
      `${spec.title} is most valuable when you connect it to real product behavior.`,
      'Strong AI answers include evaluation, failure handling, and user trust.',
      'Production AI needs observability, cost awareness, and controlled rollout just like any other platform capability.',
      'The best AI engineering decisions are measurable and supportable, not only clever.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

const aiTopicSpecs: AiTopicSpec[] = [
  {
    slug: 'ai-basics',
    title: 'AI Basics',
    description: 'Understand the foundational ideas behind artificial intelligence, applied AI products, and where software engineering fits in.',
    concept: `AI basics cover the idea that machines can perform tasks that normally require human judgment such as pattern recognition, prediction, generation, classification, and language understanding.

For engineers, the practical framing matters most: AI is not magic. It is a system made of data, models, prompts, tooling, product constraints, and evaluation loops.`,
    why: `Teams need AI basics to avoid confusing demos with production systems. Strong fundamentals help engineers speak clearly about where AI adds value, where it is weak, and what must be engineered around model uncertainty.`,
    usage: `Product teams use AI basics when deciding whether a workflow needs retrieval, classification, summarization, search, automation, or no model at all. These fundamentals guide architecture before any API call is written.`,
    workflow: `An applied AI feature starts with a task definition, then data or knowledge access, model selection, prompt or pipeline design, evaluation, observability, and controlled release into the product.`,
    exampleTitle: 'Applied AI system map',
    exampleCode: `User task
  -> Product workflow
  -> Data / knowledge access
  -> Model call or model pipeline
  -> Guardrails and validation
  -> User-visible result
  -> Feedback and monitoring`,
    productionIssues: [
      'Teams choose AI before clearly defining the business task and success criteria.',
      'Product expectations are set from demo behavior rather than measured production quality.',
      'No one owns failure cases, so unreliable outputs leak directly into user workflows.',
    ],
    bestPractices: [
      'Start with the user problem, not with the model brand.',
      'Define success metrics and unacceptable failure modes before implementation.',
      'Treat prompts, retrieval, and evaluation as engineering artifacts.',
      'Build human fallback or review paths where the task is high impact.',
    ],
    relatedTopics: ['ml-vs-dl-vs-llm', 'generative-ai', 'ai-system-design'],
  },
  {
    slug: 'ml-vs-dl-vs-llm',
    title: 'ML vs DL vs LLM',
    description: 'Learn the difference between machine learning, deep learning, and large language models from an engineering and interview perspective.',
    concept: `Machine learning is the broad field of systems that learn patterns from data. Deep learning is a subset of ML using neural networks with many layers. LLMs are a subset of deep learning focused on language modeling at large scale.

The engineering difference is not only technical depth. It also changes data needs, infrastructure, explainability, evaluation style, and where the model fits into a product.`,
    why: `Engineers need this distinction because not every problem should be solved with an LLM. Interviewers look for candidates who can choose the right capability instead of applying one pattern to every task.`,
    usage: `A team may use classic ML for fraud scoring, deep learning for image analysis, and an LLM for semantic search or summarization. Real AI products often combine all three rather than replacing them with one model type.`,
    workflow: `The workflow begins with task selection: prediction, classification, perception, or generation. That decision drives the model family, data strategy, evaluation method, and operational constraints.`,
    exampleTitle: 'Capability comparison',
    exampleCode: `ML -> churn prediction, anomaly detection, tabular scoring
DL -> image classification, speech understanding, complex sequence learning
LLM -> chat, summarization, Q&A, extraction, tool use, reasoning support`,
    productionIssues: [
      'Teams use an LLM for deterministic scoring tasks where simpler models would be cheaper and easier to govern.',
      'Stakeholders assume model categories are interchangeable, which creates poor architecture choices.',
      'Evaluation is copied from one model family to another even though task fit is different.',
    ],
    bestPractices: [
      'Choose the model family from the task and constraints, not trend pressure.',
      'Explain why a simpler or more controlled approach was rejected when selecting an LLM.',
      'Tailor evaluation to the model type and product risk.',
      'Keep hybrid systems on the table when one model family is not enough.',
    ],
    relatedTopics: ['ai-basics', 'generative-ai', 'transformers'],
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    description: 'Understand generative AI as the class of systems that produce new text, code, images, or structured outputs from learned patterns.',
    concept: `Generative AI produces new content instead of only predicting a label or score. In software products it often appears as chat assistants, summarizers, code generation, content drafting, extraction flows, and copilots.`,
    why: `Generative AI is valuable because it can accelerate knowledge work and interaction design, but it also introduces reliability, hallucination, governance, and review challenges that product teams must actively manage.`,
    usage: `Teams use generative AI for support assistants, internal knowledge copilots, search augmentation, workflow automation, report drafting, and developer productivity features.`,
    workflow: `A generative AI feature combines prompt design, context retrieval, system instructions, output validation, usage monitoring, and often a human or rules-based fallback for sensitive tasks.`,
    exampleTitle: 'Generative workflow',
    exampleCode: `User request
  -> Intent / permissions check
  -> Retrieve relevant context
  -> Prompt model
  -> Validate / moderate / structure output
  -> Return answer with feedback capture`,
    productionIssues: [
      'Teams ship generation features without any output validation or user expectation setting.',
      'The model is correct enough in demos but unstable across real data and real prompts.',
      'Cost or latency grows sharply once many users adopt the feature.',
    ],
    bestPractices: [
      'Use generative AI where the product can tolerate uncertainty and iterative improvement.',
      'Combine generation with retrieval, formatting, and guardrails instead of raw prompting alone.',
      'Measure output quality and user trust continuously.',
      'Design clear fallback behavior when the model is unsure or unsupported.',
    ],
    relatedTopics: ['gpt-models', 'zero-shot-prompting', 'ai-evaluation'],
  },
  {
    slug: 'python-for-ai',
    title: 'Python for AI',
    description: 'Learn the Python foundations AI engineers use for APIs, data pipelines, notebooks, model tooling, and product integration.',
    concept: `Python is the dominant language for AI engineering because of its ecosystem for data processing, model tooling, API integration, orchestration, notebooks, and experimentation-to-production workflows.`,
    why: `AI roles expect Python fluency because even when the end product is in another language, most model, retrieval, and evaluation tooling lives in Python-based stacks.`,
    usage: `Engineers use Python for data preparation, embedding pipelines, evaluation scripts, prompt experiments, retrieval services, model-serving APIs, and glue code that connects external AI systems to products.`,
    workflow: `Python workflows usually combine data libraries, API clients, async I/O or background jobs, testing, and environment management so experiments can turn into stable services instead of notebook-only artifacts.`,
    exampleTitle: 'Python AI service skeleton',
    exampleCode: `Request -> preprocess text
  -> retrieve context
  -> call model API
  -> validate / format output
  -> log latency, token use, and feedback`,
    productionIssues: [
      'Notebook code is copied directly into production without packaging, testing, or observability.',
      'Dependency sprawl and environment drift make AI services fragile to deploy.',
      'Teams focus on model calls but ignore Python service performance and concurrency behavior.',
    ],
    bestPractices: [
      'Treat Python AI code as production software with tests, linting, packaging, and logs.',
      'Separate experimental notebooks from deployable modules or services.',
      'Instrument latency, retries, and external API failures in every critical path.',
      'Keep environment and dependency management repeatable across local, CI, and production.',
    ],
    relatedTopics: ['data-processing-for-ai', 'embedding-pipelines', 'ai-system-design'],
  },
  {
    slug: 'data-processing-for-ai',
    title: 'Data Processing',
    description: 'Understand how AI engineers clean, normalize, transform, and version data for retrieval, model use, and evaluation.',
    concept: `Data processing for AI means transforming raw documents, records, transcripts, or product events into forms that models and retrieval systems can use safely and consistently.`,
    why: `Most AI quality problems are actually data problems: missing structure, stale content, bad chunking, noisy metadata, weak filtering, or poor evaluation datasets.`,
    usage: `Teams process PDFs into sections, normalize HTML, extract metadata, redact sensitive values, segment knowledge bases, and build curated evaluation sets before retrieval or generation is ever exposed to end users.`,
    workflow: `A data-processing flow usually ingests source content, cleans it, segments it, enriches it with metadata, stores it for retrieval, and versions the pipeline so the team knows what changed when quality shifts.`,
    exampleTitle: 'Knowledge ingestion flow',
    exampleCode: `Raw docs
  -> clean and normalize
  -> split into chunks
  -> attach metadata
  -> create embeddings
  -> index in vector store
  -> validate with retrieval tests`,
    productionIssues: [
      'Teams blame the model when the real problem is stale or badly chunked source data.',
      'Metadata is weak, so filters and access control cannot be enforced correctly.',
      'No pipeline versioning exists, making quality regressions hard to trace.',
    ],
    bestPractices: [
      'Treat data processing as a product-quality and governance concern.',
      'Capture metadata that supports filtering, ownership, recency, and permissions.',
      'Version ingestion pipelines and test retrieval quality after every major change.',
      'Keep source freshness and ingestion latency visible in operations dashboards.',
    ],
    relatedTopics: ['chunking-strategies', 'embedding-pipelines', 'retrieval-augmented-generation'],
  },
  {
    slug: 'supervised-learning',
    title: 'Supervised Learning',
    description: 'Learn supervised learning from the perspective of labeled data, prediction tasks, and where it still fits alongside modern LLM systems.',
    concept: `Supervised learning trains a model on labeled examples so it can predict outputs for new inputs. It is common in scoring, classification, ranking, fraud detection, and prediction tasks.`,
    why: `AI engineers need supervised learning fundamentals because many applied products still depend on deterministic scoring and classification components alongside LLM features.`,
    usage: `A product might use supervised learning to classify tickets, detect risky transactions, or rank recommendations while also using an LLM for explanation, summarization, or natural-language interaction.`,
    workflow: `The workflow includes task definition, labeled data, training and validation splits, metric selection, error analysis, deployment, and monitoring for drift or quality decay.`,
    exampleTitle: 'Hybrid AI workflow',
    exampleCode: `Input event
  -> supervised classifier predicts category
  -> business rule branches workflow
  -> LLM generates explanation or summary for user`,
    productionIssues: [
      'Teams replace strong supervised systems with LLMs for tasks that need more consistency than creativity.',
      'Label quality is poor, so model performance degrades even though code looks correct.',
      'Prediction drift is ignored until users report downstream mistakes.',
    ],
    bestPractices: [
      'Keep supervised models in the architecture when the task needs stable prediction.',
      'Track label quality and real-world drift, not only offline metrics.',
      'Use LLMs to complement supervised systems when explanation or flexible interaction helps.',
      'Choose metrics that match business impact rather than generic model benchmarks alone.',
    ],
    relatedTopics: ['unsupervised-learning', 'ai-evaluation', 'ai-system-design'],
  },
  {
    slug: 'unsupervised-learning',
    title: 'Unsupervised Learning',
    description: 'Understand unsupervised learning for clustering, grouping, similarity, and pattern discovery in applied AI systems.',
    concept: `Unsupervised learning works without labeled target outputs. It is commonly used to discover structure, similarity, segmentation, or anomalies in data.`,
    why: `This matters in AI engineering because many retrieval, recommendation, or exploratory workflows depend on grouping and similarity thinking even when no explicit labels are available.`,
    usage: `Teams use unsupervised approaches to segment customers, group support tickets, analyze embeddings, detect outliers, or explore datasets before building downstream AI workflows.`,
    workflow: `The process usually includes feature preparation, similarity or clustering logic, validation of whether the grouping is meaningful, and integration into a product or analyst workflow.`,
    exampleTitle: 'Similarity-driven grouping',
    exampleCode: `Raw items
  -> feature or embedding generation
  -> similarity / clustering
  -> inspect groups
  -> use clusters for search, labeling, or workflow routing`,
    productionIssues: [
      'Clusters look mathematically clean but do not map to useful business decisions.',
      'Teams treat unsupervised outputs as ground truth without human validation.',
      'Upstream feature or embedding changes silently alter grouping behavior in production.',
    ],
    bestPractices: [
      'Validate unsupervised patterns against real user or business usefulness.',
      'Track how representation changes affect clustering or similarity behavior.',
      'Use human review before turning exploratory patterns into automated decisions.',
      'Combine unsupervised signals with metadata or rules for safer product use.',
    ],
    relatedTopics: ['embeddings', 'vector-databases-overview', 'ai-evaluation'],
  },
  {
    slug: 'neural-networks',
    title: 'Neural Networks',
    description: 'Learn neural networks as the foundation behind modern deep learning and many AI model architectures.',
    concept: `Neural networks are layered function approximators that learn patterns from data through weighted connections and training updates. They are the foundation for modern deep learning across language, vision, and multimodal AI.`,
    why: `AI engineers do not need to derive every equation in daily product work, but they do need to understand that neural models learn statistical patterns, depend on data representation, and can fail confidently.`,
    usage: `In practice, neural networks show up indirectly through pretrained models, embedding models, classifiers, rerankers, speech systems, and LLM APIs that teams integrate into products.`,
    workflow: `From an engineering perspective, the important workflow is choosing the right pretrained model or service, understanding its strengths and failure modes, and validating it against the real task.`,
    exampleTitle: 'Applied neural workflow',
    exampleCode: `Input
  -> representation / tokens / pixels
  -> neural model inference
  -> confidence or generated output
  -> product logic and evaluation`,
    productionIssues: [
      'Teams assume neural outputs are explanations instead of probabilistic behavior.',
      'Model capability is used outside the domain it was validated for.',
      'Performance looks fine offline but fails under real-user distribution shifts.',
    ],
    bestPractices: [
      'Treat neural outputs as learned approximations that require validation and guardrails.',
      'Prefer proven pretrained components for product delivery unless training is truly needed.',
      'Measure quality on task-specific evaluation sets.',
      'Design product logic that can tolerate imperfect model behavior.',
    ],
    relatedTopics: ['transformers', 'gpt-models', 'ai-evaluation'],
  },
  {
    slug: 'transformers',
    title: 'Transformers',
    description: 'Understand transformers as the architecture family behind most modern large language models and many retrieval or embedding systems.',
    concept: `Transformers use attention mechanisms to process tokens with awareness of their relationship to other tokens in the sequence. This architecture is the basis for modern LLMs, many embedding models, and a large part of the current generative AI stack.`,
    why: `Engineers need transformer awareness because context windows, tokenization behavior, model scaling, and inference trade-offs all come from how transformer-style models work.`,
    usage: `Product teams encounter transformers through chat models, rerankers, embedding models, document understanding systems, and agent frameworks that rely on attention-based language reasoning.`,
    workflow: `In applied work, transformer understanding helps with prompt design, context-length planning, chunking, token budgeting, latency management, and deciding when retrieval is needed instead of stuffing more text into the prompt.`,
    exampleTitle: 'Transformer-aware design',
    exampleCode: `User question
  -> retrieve focused context
  -> fit within token budget
  -> call transformer model
  -> evaluate answer groundedness`,
    productionIssues: [
      'Teams overload the prompt with too much context and then blame the model for poor focus.',
      'Token and latency costs rise sharply because context windows are treated as free.',
      'Retrieval design is ignored even though the model alone cannot remember the needed domain knowledge.',
    ],
    bestPractices: [
      'Design context strategy around token budget and relevance, not maximum size.',
      'Use retrieval, summarization, or memory patterns instead of blindly expanding prompts.',
      'Track latency and cost impact when model and context size change.',
      'Explain transformer trade-offs in plain engineering terms during interviews and reviews.',
    ],
    relatedTopics: ['gpt-models', 'context-windows', 'retrieval-augmented-generation'],
  },
  {
    slug: 'gpt-models',
    title: 'GPT Models',
    description: 'Learn how GPT-style models are used in production systems for chat, generation, summarization, reasoning support, and tool use.',
    concept: `GPT models are transformer-based language models trained to predict and generate token sequences. In products they are often used for chat, drafting, summarization, extraction, planning, and structured tool-calling flows.`,
    why: `GPT models matter because many AI engineering roles now involve selecting, prompting, constraining, and evaluating these models inside user-facing products or internal copilots.`,
    usage: `A team may use a GPT-style model to answer questions over company knowledge, generate ticket summaries, classify support intent, draft code suggestions, or orchestrate tool-calling workflows.`,
    workflow: `A GPT-based workflow usually includes system instructions, user input, optional retrieved context, tool definitions or schemas, post-processing, and evaluation against product-specific success criteria.`,
    exampleTitle: 'GPT application loop',
    exampleCode: `System prompt
  + user request
  + retrieved context
  -> model response
  -> schema validation / guardrails
  -> user delivery and feedback`,
    productionIssues: [
      'Teams pick a model because of hype instead of measuring task fit, latency, and cost.',
      'Prompt instructions and post-processing are weak, so outputs are unstable or unsafe.',
      'No model fallback plan exists when provider behavior, limits, or response quality shift.',
    ],
    bestPractices: [
      'Choose GPT models from workload needs, not brand momentum alone.',
      'Use explicit instructions, schema constraints, and evaluation before production rollout.',
      'Measure quality, latency, token use, and failure modes per feature.',
      'Design abstraction layers so the product is not brittle to one provider or model revision.',
    ],
    relatedTopics: ['tokens', 'context-windows', 'zero-shot-prompting'],
  },
  {
    slug: 'tokens',
    title: 'Tokens',
    description: 'Understand tokens as the units language models read, price, limit, and generate during inference.',
    concept: `Tokens are the pieces of text a model processes. They affect prompt size, output length, cost, context limits, and often latency. The same visible text may map to very different token counts depending on formatting and language.`,
    why: `Token awareness matters because many AI failures are really token-budget failures: truncated context, incomplete answers, unexpectedly high cost, or slow responses due to oversized prompts.`,
    usage: `Product engineers track token counts when designing prompts, chunking knowledge, setting max output length, estimating costs, and choosing between one large call versus a multi-step workflow.`,
    workflow: `Inputs are tokenized before inference. The model consumes input tokens, generates output tokens, and the total usually drives both pricing and context-window usage.`,
    exampleTitle: 'Token budget planning',
    exampleCode: `System instructions: 400 tokens
Retrieved context: 2,400 tokens
User question: 120 tokens
Reserved answer budget: 600 tokens
Total planned window: 3,520 tokens`,
    productionIssues: [
      'Teams send entire documents instead of relevant chunks and then hit latency or context limits.',
      'Output limits are too small, causing structured responses to be cut off.',
      'Token cost rises sharply after a feature launch because prompt size was never optimized.',
    ],
    bestPractices: [
      'Budget tokens intentionally for system prompts, retrieval, and output space.',
      'Optimize prompt and context size before scaling traffic.',
      'Track token consumption as a product and operations metric.',
      'Use summarization or staged retrieval when the source content is too large.',
    ],
    relatedTopics: ['context-windows', 'chunking-strategies', 'ai-cost-optimization'],
  },
  {
    slug: 'embeddings',
    title: 'Embeddings',
    description: 'Learn embeddings as vector representations used for semantic similarity, retrieval, grouping, and AI search pipelines.',
    concept: `Embeddings convert text or other content into vectors that capture semantic similarity. They are commonly used in retrieval, clustering, duplicate detection, recommendations, and semantic search.`,
    why: `Embeddings are critical because many useful AI systems rely more on good retrieval than on raw generation. If the embedding strategy is poor, the best LLM still gets weak context.`,
    usage: `Teams create embeddings for documents, tickets, code snippets, products, or knowledge articles, then store them in vector databases for similarity search and ranking.`,
    workflow: `Content is cleaned, chunked, embedded, indexed, and then queried through vector similarity. Metadata filters, reranking, and evaluation determine whether the retrieval is actually useful.`,
    exampleTitle: 'Embedding pipeline',
    exampleCode: `Source content
  -> chunk text
  -> generate embeddings
  -> store vectors + metadata
  -> query embedding
  -> retrieve top matches`,
    productionIssues: [
      'Embedding quality looks fine on toy examples but fails with real domain language.',
      'Metadata is missing, so retrieval returns semantically similar but unauthorized or irrelevant results.',
      'Reindexing changes retrieval behavior, but no regression tests exist to detect it.',
    ],
    bestPractices: [
      'Treat embeddings as part of the retrieval system, not a one-time preprocessing step.',
      'Combine vectors with strong metadata and filtering rules.',
      'Evaluate retrieval quality using domain-specific questions and content.',
      'Version embedding models and reindexing changes carefully.',
    ],
    relatedTopics: ['embedding-pipelines', 'vector-databases-overview', 'retrieval-augmented-generation'],
  },
  {
    slug: 'context-windows',
    title: 'Context Windows',
    description: 'Understand context windows, prompt budget limits, and how they shape retrieval, chunking, and LLM workflow design.',
    concept: `A context window is the maximum amount of tokenized input and output a model can handle in one interaction. It limits how much system instruction, user input, retrieved context, and generated output can fit into a single call.`,
    why: `Context windows matter because product quality often falls when teams stuff too much information into the model or fail to reserve space for a proper answer.`,
    usage: `Engineers design around context windows when deciding chunk size, retrieval count, conversation memory strategy, tool-calling loops, and whether to summarize older history instead of passing it verbatim.`,
    workflow: `The team budgets tokens for instructions, context, and output, then uses retrieval or summarization to keep only the most relevant information inside the prompt at any one time.`,
    exampleTitle: 'Context management strategy',
    exampleCode: `Conversation history too large?
  -> summarize prior turns
  -> retrieve only relevant docs
  -> keep answer budget reserved
  -> avoid prompt overflow`,
    productionIssues: [
      'Useful context is silently dropped because prompts exceed the model window.',
      'Conversation features degrade over time because old turns are passed blindly until quality collapses.',
      'Teams choose giant context as a substitute for retrieval discipline.',
    ],
    bestPractices: [
      'Design context strategy explicitly instead of treating the window as unlimited memory.',
      'Reserve answer space so the model can respond fully.',
      'Use summarization, retrieval, and memory policies to manage long interactions.',
      'Test prompt behavior at the upper bounds of realistic user input.',
    ],
    relatedTopics: ['tokens', 'transformers', 'chunking-strategies'],
  },
  {
    slug: 'zero-shot-prompting',
    title: 'Zero Shot',
    description: 'Learn zero-shot prompting for tasks where the model is guided by instructions without examples.',
    concept: `Zero-shot prompting means asking the model to perform a task using instructions alone, without providing worked examples in the prompt.`,
    why: `Zero-shot prompting matters because it is the simplest and often cheapest starting point for many AI workflows, but it also reveals how much clarity the instruction itself contributes to output quality.`,
    usage: `Teams use zero-shot prompts for quick classification, summarization, rewriting, extraction, and early prototypes before deciding whether retrieval, few-shot examples, or tool use are needed.`,
    workflow: `A system prompt defines the role and rules, the user supplies the task, and the model responds using prior training plus the instruction framing. Prompt clarity, constraints, and output schema matter heavily.`,
    exampleTitle: 'Zero-shot prompt frame',
    exampleCode: `System: You are a support triage assistant.
Task: classify the ticket into one of five issue types.
Output: return only valid JSON with category and confidence.`,
    productionIssues: [
      'Teams rely on zero-shot for complex tasks that actually need examples or retrieval.',
      'Prompt instructions are underspecified, so responses drift in format or quality.',
      'The model seems to work at low volume but fails on edge cases because evaluation was shallow.',
    ],
    bestPractices: [
      'Start simple with zero-shot when the task is narrow and measurable.',
      'Constrain outputs with schema, tone, and refusal rules where needed.',
      'Promote to few-shot, retrieval, or tools when zero-shot quality is unstable.',
      'Evaluate edge cases before exposing the pattern to users.',
    ],
    relatedTopics: ['few-shot-prompting', 'chain-of-thought-prompting', 'gpt-models'],
  },
  {
    slug: 'few-shot-prompting',
    title: 'Few Shot',
    description: 'Understand few-shot prompting for improving model behavior by providing examples inside the prompt.',
    concept: `Few-shot prompting includes a small number of examples in the prompt so the model can imitate the desired structure, tone, or decision pattern.`,
    why: `Few-shot prompting is useful when raw instructions are not enough. It helps models learn task formatting, domain language, or answer style without retraining.`,
    usage: `Teams use few-shot prompts for extraction formats, support-ticket rewriting, tone control, structured classification, and domain-specific response style where consistency matters.`,
    workflow: `Engineers provide example inputs and outputs, then the live request. The quality of the examples, token budget, and example diversity all shape how well the model generalizes.`,
    exampleTitle: 'Few-shot structure control',
    exampleCode: `Example 1: input -> desired JSON output
Example 2: input -> desired JSON output
Live input -> model follows demonstrated structure`,
    productionIssues: [
      'Examples consume too much context and crowd out relevant retrieved content.',
      'The examples are too narrow, so the model overfits to one pattern and misses broader cases.',
      'Teams forget to update examples when the product format or policy changes.',
    ],
    bestPractices: [
      'Use few-shot when examples materially improve consistency over zero-shot prompting.',
      'Choose examples that reflect edge cases, not only ideal cases.',
      'Balance example count against retrieval needs and token cost.',
      'Version prompt examples as product behavior changes.',
    ],
    relatedTopics: ['zero-shot-prompting', 'tokens', 'ai-evaluation'],
  },
  {
    slug: 'chain-of-thought-prompting',
    title: 'Chain of Thought',
    description: 'Learn chain-of-thought prompting as a reasoning support pattern and understand its practical limits in production systems.',
    concept: `Chain-of-thought prompting encourages the model to reason step by step before arriving at an answer. It can improve performance on some tasks, but it also increases verbosity, tokens, and risk if used carelessly in user-facing systems.`,
    why: `AI engineers need to understand chain-of-thought because reasoning quality, hidden reasoning policies, structured decomposition, and tool-use workflows are frequent interview topics in LLM engineering.`,
    usage: `Teams use step-by-step decomposition internally for planning, tool selection, or complex instruction following, but often hide or compress the reasoning in the final user response.`,
    workflow: `A task is broken down into intermediate reasoning or explicit steps, then the model produces the final result. In many production systems this is combined with tool calls, verification, or structured intermediate outputs rather than exposed raw reasoning.`,
    exampleTitle: 'Reasoning-support pattern',
    exampleCode: `Question
  -> decompose task
  -> gather facts / tools / context
  -> reason in steps internally
  -> produce concise final answer`,
    productionIssues: [
      'Teams expose verbose reasoning to users where a concise answer would be safer and clearer.',
      'Long reasoning traces increase cost and latency without enough measurable benefit.',
      'Developers mistake visible reasoning style for actual correctness.',
    ],
    bestPractices: [
      'Use step decomposition where it measurably improves the task.',
      'Prefer structured intermediate steps or tool use over uncontrolled long reasoning text.',
      'Measure whether reasoning-style prompting improves correctness for your exact workflow.',
      'Keep user-facing output concise even when internal reasoning is richer.',
    ],
    relatedTopics: ['few-shot-prompting', 'ai-agents', 'ai-evaluation'],
  },
  {
    slug: 'retrieval-augmented-generation',
    title: 'Retrieval Augmented Generation',
    description: 'Understand RAG as the pattern of retrieving relevant knowledge and grounding an LLM response in that retrieved context.',
    concept: `Retrieval Augmented Generation combines a language model with a retrieval layer that fetches relevant knowledge at runtime. Instead of relying only on parametric model memory, the system injects current or domain-specific context into the prompt.`,
    why: `RAG matters because many enterprise AI products fail when they try to answer from model memory alone. Retrieval improves grounding, freshness, access control, and auditability when designed well.`,
    usage: `RAG is used for internal knowledge assistants, support bots, policy search, developer copilots, document Q&A, and workflows where answers must be based on company or domain-specific content.`,
    workflow: `User query -> query rewrite or embedding -> search over vector or hybrid index -> retrieve top chunks -> optionally rerank -> prompt the model with those chunks -> validate the final answer.`,
    exampleTitle: 'RAG request path',
    exampleCode: `Question
  -> retrieve relevant chunks
  -> filter by permissions / metadata
  -> assemble prompt with context
  -> model answers from retrieved content
  -> log grounding and feedback`,
    productionIssues: [
      'Retrieved context is weak, so the model hallucinates confidently anyway.',
      'Access control is not enforced in retrieval, leaking unauthorized content.',
      'Chunking or metadata strategy is poor, so search finds semantically close but operationally useless content.',
    ],
    bestPractices: [
      'Treat retrieval quality as seriously as model quality.',
      'Enforce metadata filters and content permissions before generation.',
      'Evaluate both retrieval relevance and final-answer groundedness.',
      'Use citations, source previews, or grounding indicators for user trust where appropriate.',
    ],
    relatedTopics: ['embeddings', 'vector-databases-overview', 'chunking-strategies'],
  },
  {
    slug: 'vector-databases-overview',
    title: 'Vector Databases',
    description: 'Learn what vector databases do in AI systems and how they support semantic retrieval, filtering, and scalable search.',
    concept: `Vector databases store embeddings and perform similarity search over them. In practice they also provide metadata filtering, indexing, ingestion workflows, and operational patterns for AI retrieval systems.`,
    why: `Vector databases matter because good retrieval is one of the biggest quality multipliers in LLM products. Teams must understand how vector storage fits into the system, not just how to call search.`,
    usage: `Teams store document, code, product, and ticket embeddings in vector databases to support semantic search, RAG, recommendations, and similarity-driven workflows.`,
    workflow: `Content is chunked and embedded, vectors are indexed alongside metadata, queries are embedded, top matches are returned, and application logic decides how those matches feed a model or another workflow.`,
    exampleTitle: 'Vector search flow',
    exampleCode: `Docs -> embeddings -> vector DB
Query -> embedding -> similarity search
Top matches + metadata -> filter / rerank
Result -> RAG or recommendation flow`,
    productionIssues: [
      'Teams store vectors but ignore metadata, making enterprise retrieval unsafe or noisy.',
      'Index freshness lags behind source content changes, so users get outdated answers.',
      'Search quality is assumed from top-k results without evaluating whether the retrieved content is actually helpful.',
    ],
    bestPractices: [
      'Treat the vector database as one layer in the retrieval system, not the whole solution.',
      'Design metadata filters, refresh strategy, and source ownership explicitly.',
      'Evaluate search quality with real user questions and known-good answers.',
      'Monitor latency, index freshness, and failed ingestion jobs in production.',
    ],
    relatedTopics: ['pinecone', 'chroma', 'faiss'],
  },
  {
    slug: 'chunking-strategies',
    title: 'Chunking',
    description: 'Understand chunking strategies for document segmentation, retrieval quality, and token-efficient RAG pipelines.',
    concept: `Chunking is the way large documents are split into smaller units for embedding and retrieval. Good chunking preserves meaning and context while keeping each piece small enough for efficient search and prompt construction.`,
    why: `Chunking is one of the highest-leverage RAG decisions. If chunks are too large, retrieval gets noisy and expensive. If they are too small, the answer loses context or coherence.`,
    usage: `Teams chunk manuals, tickets, code, transcripts, and policies by paragraphs, sections, semantic boundaries, or sliding windows depending on the document type and the downstream question patterns.`,
    workflow: `Raw content is cleaned, segmented, often overlapped, enriched with metadata, embedded, and then tested against representative user questions to see whether retrieval returns complete and relevant passages.`,
    exampleTitle: 'Chunk design comparison',
    exampleCode: `Bad: 20-page document as one chunk
Bad: one sentence per chunk without context
Better: section-aware chunks with overlap and metadata
Best: chunk strategy tuned to the user question pattern`,
    productionIssues: [
      'Chunks are created by arbitrary character limits that cut important context in half.',
      'Too much overlap duplicates information and increases cost without quality gain.',
      'Chunk strategy changes, but no retrieval regression tests catch the new behavior.',
    ],
    bestPractices: [
      'Choose chunk size from query behavior and document structure, not from one generic rule.',
      'Use overlap carefully where context continuity matters.',
      'Attach titles, source IDs, and section metadata to every chunk.',
      'Re-evaluate chunk strategy whenever source formats or user tasks change.',
    ],
    relatedTopics: ['retrieval-augmented-generation', 'tokens', 'embedding-pipelines'],
  },
  {
    slug: 'embedding-pipelines',
    title: 'Embeddings Pipeline',
    description: 'Learn how AI teams build, refresh, and validate end-to-end embedding pipelines for retrieval systems.',
    concept: `An embedding pipeline is the end-to-end workflow that ingests source content, transforms it, chunks it, embeds it, stores it, and refreshes it over time so retrieval stays accurate and current.`,
    why: `AI products depend on pipeline freshness and reliability. A good model cannot rescue stale or broken embeddings if the ingestion pipeline is unreliable.`,
    usage: `Teams schedule embedding jobs for product docs, wikis, support tickets, legal policies, or code repositories and track which source versions were indexed into which vector collection.`,
    workflow: `The pipeline ingests content, cleans it, chunks it, generates embeddings, writes vectors plus metadata, validates coverage, and then monitors freshness, failures, and indexing lag.`,
    exampleTitle: 'Embedding pipeline operations',
    exampleCode: `Source update
  -> detect change
  -> reprocess content
  -> regenerate embeddings
  -> update vector index
  -> run retrieval checks
  -> publish freshness status`,
    productionIssues: [
      'Pipelines silently fail, leaving stale knowledge in production for days or weeks.',
      'Index updates are not versioned, so search regressions cannot be traced.',
      'Metadata mapping is inconsistent between ingestion runs, breaking filters and permissions.',
    ],
    bestPractices: [
      'Treat embedding pipelines as production data pipelines with monitoring and ownership.',
      'Track source version, embedding model version, and index version explicitly.',
      'Run retrieval-quality smoke tests after major ingestion or schema changes.',
      'Expose freshness and ingestion health in support dashboards.',
    ],
    relatedTopics: ['embeddings', 'chunking-strategies', 'vector-databases-overview'],
  },
  {
    slug: 'pinecone',
    title: 'Pinecone',
    description: 'Understand Pinecone as a managed vector database option for scalable semantic search and RAG systems.',
    concept: `Pinecone is a managed vector database designed for similarity search, metadata filtering, and operational simplicity in AI retrieval systems.`,
    why: `Managed vector platforms like Pinecone matter when teams want less infrastructure overhead and faster time to production for search-heavy AI features.`,
    usage: `Teams use Pinecone to store embeddings for knowledge bases, support assistants, code search, and recommendation systems where fully managed scaling and hosted operations are valuable.`,
    workflow: `Embeddings and metadata are upserted into indexes, queries are embedded, top matches are searched, and the application applies filtering, reranking, or prompt assembly based on the returned context.`,
    exampleTitle: 'Managed vector retrieval path',
    exampleCode: `Chunk docs
  -> generate embeddings
  -> upsert to Pinecone
  -> query with user embedding
  -> apply metadata filter
  -> pass results to RAG`,
    productionIssues: [
      'Teams assume the vector database alone guarantees relevance and skip retrieval evaluation.',
      'Metadata and namespace design are weak, so multi-tenant or filtered retrieval is messy.',
      'Operational costs rise because usage patterns and index design were not reviewed.',
    ],
    bestPractices: [
      'Use Pinecone as part of a measured retrieval stack, not as a relevance shortcut.',
      'Design namespaces and metadata filters with security and tenancy in mind.',
      'Track query latency, usage, and relevance outcomes as production metrics.',
      'Benchmark managed options against product needs before locking them in.',
    ],
    relatedTopics: ['vector-databases-overview', 'retrieval-augmented-generation', 'embeddings'],
  },
  {
    slug: 'chroma',
    title: 'Chroma',
    description: 'Learn Chroma as a developer-friendly vector database option for local prototyping, smaller deployments, and RAG experimentation.',
    concept: `Chroma is a vector database often used for local development, prototypes, and lightweight retrieval systems. It helps teams build and test embedding-based search without immediately adopting a larger hosted platform.`,
    why: `Chroma matters because many teams prototype RAG systems locally before deciding whether they need a heavier managed or self-hosted vector platform.`,
    usage: `Engineers use Chroma in notebooks, local services, proof-of-concepts, and smaller internal applications to test retrieval quality, prompt grounding, and embedding choices.`,
    workflow: `Documents are chunked and embedded locally or in a small service, vectors are stored with metadata, and search results are passed to downstream prompt or application logic.`,
    exampleTitle: 'Prototype RAG stack',
    exampleCode: `Local docs
  -> chunk and embed
  -> store in Chroma collection
  -> query for top matches
  -> inspect retrieval before scaling architecture`,
    productionIssues: [
      'Teams treat prototype infrastructure as if it will automatically scale into production.',
      'Retrieval experiments succeed locally, but no migration plan exists for security, freshness, or operations.',
      'Metadata and document lifecycle design are skipped because the prototype feels temporary.',
    ],
    bestPractices: [
      'Use Chroma well for rapid retrieval experimentation and local validation.',
      'Separate prototype success from production readiness criteria.',
      'Design metadata and evaluation from the start, even in small experiments.',
      'Reassess platform choice before product adoption grows.',
    ],
    relatedTopics: ['vector-databases-overview', 'chunking-strategies', 'ai-system-design'],
  },
  {
    slug: 'faiss',
    title: 'FAISS',
    description: 'Understand FAISS as a lower-level similarity search library often used when teams need more control over indexing behavior.',
    concept: `FAISS is a vector similarity-search library rather than a full managed database. It is often used when teams want more control over indexing, performance tuning, or offline retrieval workflows.`,
    why: `AI engineers should know FAISS because not every vector retrieval need starts with a hosted database. Sometimes teams need embedded search, custom pipelines, or tighter control over retrieval internals.`,
    usage: `FAISS is used in research workflows, local inference systems, custom retrieval services, and environments where teams build their own storage and metadata layer around the search engine.`,
    workflow: `Vectors are generated, indexed in FAISS, queried through similarity search, and then combined with external metadata or storage layers for filtering and product use.`,
    exampleTitle: 'Custom retrieval stack',
    exampleCode: `Embeddings
  -> FAISS index
  -> similarity search
  -> map result IDs to metadata store
  -> send matched content to app or model`,
    productionIssues: [
      'Teams underestimate the extra engineering needed around metadata, persistence, and operations.',
      'Search performance is tuned, but product relevance and freshness are not measured.',
      'A low-level library is chosen when a managed platform would reduce time-to-value significantly.',
    ],
    bestPractices: [
      'Use FAISS when the team genuinely needs custom control or embedded search behavior.',
      'Plan the surrounding metadata, storage, and refresh model explicitly.',
      'Evaluate total system complexity, not only raw search speed.',
      'Keep retrieval quality and supportability visible alongside performance tuning.',
    ],
    relatedTopics: ['vector-databases-overview', 'embeddings', 'embedding-pipelines'],
  },
  {
    slug: 'ai-chatbots',
    title: 'Chatbots',
    description: 'Learn how AI chatbots are designed for intent handling, context use, response quality, and safe user experience.',
    concept: `AI chatbots are conversational interfaces that use models, retrieval, workflow rules, and product UX decisions to answer questions or assist users. The hard part is not making the bot respond; it is making the responses useful and trustworthy.`,
    why: `Chatbots are one of the most common applied AI product patterns. Interviewers use them to test whether candidates think about context, permissions, evaluation, user trust, and fallback behavior.`,
    usage: `Teams build customer-support assistants, internal help bots, HR assistants, developer copilots, and domain-specific Q&A experiences using chat interfaces.`,
    workflow: `A chatbot flow usually includes session state, retrieval, prompt assembly, moderation or business rules, response generation, feedback capture, and escalation or fallback paths.`,
    exampleTitle: 'Enterprise chatbot flow',
    exampleCode: `User message
  -> detect intent / permissions
  -> retrieve context
  -> generate answer
  -> cite source / ask follow-up / escalate if uncertain`,
    productionIssues: [
      'The bot answers confidently outside its knowledge boundary.',
      'Conversation memory grows without control, causing latency or context confusion.',
      'User trust drops because the chatbot does not surface uncertainty or source grounding.',
    ],
    bestPractices: [
      'Design chatbots around clear scope and escalation rules.',
      'Use retrieval and grounding for domain-specific answers.',
      'Capture user feedback and unresolved queries as product signals.',
      'Optimize UX for correction and trust, not only for fluency.',
    ],
    relatedTopics: ['retrieval-augmented-generation', 'ai-monitoring', 'hallucination-management'],
  },
  {
    slug: 'ai-agents',
    title: 'Agents',
    description: 'Understand AI agents as systems that combine LLM reasoning, tool use, state, and task execution loops.',
    concept: `AI agents are systems that use models plus tools, memory, state, and planning loops to complete tasks rather than only return a single response. Agents can search, call APIs, update systems, or coordinate sub-steps toward a goal.`,
    why: `Agents matter because many teams are moving from one-shot chat features to workflow automation. Interviewers want to know whether you understand tool reliability, permissions, state management, and failure containment.`,
    usage: `Teams build agents for support triage, research assistance, workflow orchestration, content operations, developer automation, and enterprise search with action-taking capabilities.`,
    workflow: `An agent receives a goal, decides whether to call tools or retrieve knowledge, evaluates intermediate results, may iterate, and finally returns or executes an outcome under policy constraints.`,
    exampleTitle: 'Agent execution loop',
    exampleCode: `Goal
  -> plan next step
  -> call tool / retrieve info
  -> inspect result
  -> continue or stop
  -> produce final answer or action`,
    productionIssues: [
      'Agents loop or call tools excessively because stop criteria are unclear.',
      'Permissions are too broad, making tool use risky in enterprise environments.',
      'Teams celebrate autonomy without building observability into multi-step execution.',
    ],
    bestPractices: [
      'Use agents when the task genuinely needs planning and tool use, not by default.',
      'Constrain available tools, permissions, and iteration limits carefully.',
      'Log every tool call and intermediate state needed for debugging.',
      'Measure task completion quality, cost, and failure rate, not only conversational polish.',
    ],
    relatedTopics: ['multi-agent-systems', 'ai-system-design', 'ai-monitoring'],
  },
  {
    slug: 'knowledge-systems',
    title: 'Knowledge Systems',
    description: 'Learn how AI knowledge systems combine content ingestion, retrieval, permissions, and user experience to answer domain questions reliably.',
    concept: `Knowledge systems are AI products that help users find, summarize, or reason over internal or external information. They typically combine ingestion pipelines, metadata, retrieval, access control, ranking, and conversational or search interfaces.`,
    why: `Knowledge systems are one of the strongest product fits for LLM engineering, but they also expose many weaknesses in data freshness, permissions, and retrieval quality.`,
    usage: `Examples include internal policy assistants, engineering knowledge search, support-document copilots, legal document helpers, and enterprise Q&A portals.`,
    workflow: `Content is ingested and indexed, user permissions are enforced, the retrieval layer selects relevant material, the model synthesizes an answer, and the interface surfaces sources or follow-up paths.`,
    exampleTitle: 'Knowledge assistant stack',
    exampleCode: `Content sources
  -> ingestion + metadata
  -> retrieval index
  -> permission filter
  -> answer synthesis
  -> citations and feedback`,
    productionIssues: [
      'The knowledge base is stale, so the assistant answers confidently from outdated content.',
      'Permission filtering is weak, leading to cross-team or sensitive-data exposure.',
      'Users cannot tell whether an answer came from real source content or model guesswork.',
    ],
    bestPractices: [
      'Make freshness, permissions, and source transparency first-class design goals.',
      'Evaluate retrieval and answer quality using real internal questions.',
      'Design feedback loops that improve content and indexing, not only prompts.',
      'Prefer source-grounded answers over fluent but unsupported ones.',
    ],
    relatedTopics: ['retrieval-augmented-generation', 'embedding-pipelines', 'ai-security'],
  },
  {
    slug: 'ai-system-design',
    title: 'AI System Design',
    description: 'Understand AI system design as the practice of combining models, data, retrieval, services, evaluation, and user workflows into one reliable product.',
    concept: `AI system design is the architecture of an AI product end to end: input handling, model or models, retrieval, tools, fallback behavior, APIs, storage, observability, evaluation, and governance.`,
    why: `This is one of the highest-signal senior interview topics because it shows whether you can move beyond prompt tricks into product architecture and operational quality.`,
    usage: `Teams design AI systems for chat support, document analysis, coding assistants, internal search, workflow automation, and customer-facing copilots with clear quality and trust requirements.`,
    workflow: `A strong design starts with the user task and risk level, then defines the right mix of retrieval, models, tools, orchestration, validation, feedback, deployment, and monitoring needed to make the feature dependable.`,
    exampleTitle: 'AI system architecture frame',
    exampleCode: `User request
  -> auth / permissions
  -> retrieval or tool planning
  -> model orchestration
  -> output validation
  -> UX response
  -> logging, feedback, evaluation`,
    productionIssues: [
      'Architecture is model-centric and ignores product UX, support, and governance needs.',
      'Teams design for the happy path only and discover no safe fallback exists in production.',
      'No one defines what good looks like, so evaluation and iteration are random.',
    ],
    bestPractices: [
      'Design AI systems from user workflow and risk, not from one model capability alone.',
      'Include retrieval, validation, monitoring, and fallback in the first architecture version.',
      'Assign clear ownership for prompts, data, infrastructure, and evaluation.',
      'Use staged rollout and measurable quality gates for new capabilities.',
    ],
    relatedTopics: ['enterprise-ai', 'ai-evaluation', 'ai-monitoring'],
  },
  {
    slug: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    description: 'Learn multi-agent systems as coordinated AI workflows where specialized agents share tasks, tools, or roles.',
    concept: `Multi-agent systems use multiple specialized agents to break a complex task into sub-tasks such as planning, retrieval, verification, coding, or review. Each agent may have different prompts, tools, or constraints.`,
    why: `This matters because multi-agent design is often proposed for complex workflows, but it increases orchestration complexity, observability needs, and failure surface area.`,
    usage: `Teams explore multi-agent systems for research assistants, code-review copilots, document workflows, planning-and-execution tasks, and enterprise process automation.`,
    workflow: `A coordinator or planner delegates work, agents perform role-specific steps, intermediate outputs are validated or merged, and the system either completes the task or escalates if confidence is weak.`,
    exampleTitle: 'Multi-agent task split',
    exampleCode: `Planner agent -> decide subtasks
Retriever agent -> gather evidence
Executor agent -> draft result
Reviewer agent -> validate quality
Coordinator -> assemble final output`,
    productionIssues: [
      'Complexity grows faster than measurable quality improvements.',
      'Agent handoffs are opaque, making debugging and governance difficult.',
      'Tool permissions and data access become hard to reason about across many agents.',
    ],
    bestPractices: [
      'Use multi-agent systems only when decomposition adds clear measurable value.',
      'Make handoffs, tool use, and intermediate outputs observable.',
      'Constrain each agent role tightly to reduce blast radius.',
      'Benchmark single-agent or workflow alternatives before embracing more complexity.',
    ],
    relatedTopics: ['ai-agents', 'ai-system-design', 'ai-monitoring'],
  },
  {
    slug: 'enterprise-ai',
    title: 'Enterprise AI',
    description: 'Understand enterprise AI from the perspectives of governance, privacy, integration, supportability, and cross-team adoption.',
    concept: `Enterprise AI is not only about model capability. It is about building AI features that satisfy privacy, security, support, compliance, procurement, integration, and long-term operational expectations across many teams.`,
    why: `Candidates for AI architect and senior AI engineer roles must show they understand that enterprise adoption depends on governance and operating model, not just clever prompting.`,
    usage: `Organizations use enterprise AI for internal knowledge assistants, document workflows, developer tools, support automation, and productivity features that touch sensitive systems and many stakeholders.`,
    workflow: `Enterprise AI work involves approved data sources, access controls, review paths, evaluation, auditability, cost ownership, release governance, and clear operating boundaries between product, platform, and security teams.`,
    exampleTitle: 'Enterprise AI control model',
    exampleCode: `Approved data sources
  -> governance and permissions
  -> retrieval / model layer
  -> validation / moderation
  -> product workflow
  -> monitoring / audit / ownership`,
    productionIssues: [
      'A feature works technically but cannot pass privacy, legal, or security review.',
      'No operating ownership exists for prompt changes, model selection, or evaluation drift.',
      'Teams scale usage before they understand cost and support implications.',
    ],
    bestPractices: [
      'Design enterprise AI with governance and adoption constraints from the start.',
      'Clarify ownership across product, platform, data, and security teams.',
      'Keep approved data paths and user entitlements explicit.',
      'Use evaluation and audit evidence to support trust and rollout decisions.',
    ],
    relatedTopics: ['ai-system-design', 'ai-security', 'ai-cost-optimization'],
  },
  {
    slug: 'ai-evaluation',
    title: 'Evaluation',
    description: 'Learn AI evaluation as the discipline of measuring whether an AI feature is useful, correct, safe, and production ready.',
    concept: `AI evaluation is the process of measuring model and system quality against the real task. It can include retrieval metrics, accuracy, groundedness, helpfulness, latency, cost, safety, and user satisfaction.`,
    why: `Evaluation is one of the biggest differences between demo AI and production AI. Without it, teams guess about quality and only learn failure modes after users are affected.`,
    usage: `Teams build benchmark question sets, human-review workflows, regression suites, prompt comparisons, and online metrics to decide whether a new model, prompt, or retrieval change is actually better.`,
    workflow: `The team defines target behaviors, creates representative test cases, scores outputs, compares versions, and then ties offline findings to production metrics and user feedback.`,
    exampleTitle: 'Evaluation loop',
    exampleCode: `Define task metrics
  -> build eval dataset
  -> run candidate pipeline
  -> score quality / latency / cost
  -> compare baseline
  -> gate release`,
    productionIssues: [
      'Teams evaluate with easy examples that do not reflect production difficulty.',
      'Prompt or retrieval changes are deployed without regression testing.',
      'Quality metrics exist offline but are never connected to user-facing signals after release.',
    ],
    bestPractices: [
      'Build evaluation sets from real user questions and failure cases.',
      'Score the whole system, not only the model output in isolation.',
      'Use evaluation gates before major prompt, model, or retrieval changes.',
      'Tie evaluation results to production metrics and support feedback.',
    ],
    relatedTopics: ['ai-monitoring', 'retrieval-augmented-generation', 'hallucination-management'],
  },
  {
    slug: 'ai-monitoring',
    title: 'Monitoring',
    description: 'Understand AI monitoring across latency, token usage, quality drift, retrieval health, tool failures, and user trust signals.',
    concept: `AI monitoring is the practice of observing how a live AI feature behaves: response latency, token use, tool calls, retrieval success, error rates, user feedback, and quality drift over time.`,
    why: `Production AI is dynamic. Model providers change, source content changes, user behavior shifts, and hidden failures appear in retrieval or tool layers. Monitoring is how teams stay ahead of those shifts.`,
    usage: `Teams monitor chat quality, grounding failures, slow generations, API retries, vector-search latency, tool-call success, escalation rates, and user dissatisfaction trends for AI features in production.`,
    workflow: `Monitoring combines platform telemetry, application logs, model usage data, retrieval metrics, and product feedback so engineers can correlate user symptoms with the right AI boundary.`,
    exampleTitle: 'AI monitoring dashboard',
    exampleCode: `Requests / latency / token cost
Retrieval hit quality / freshness
Tool-call success rate
Fallback / escalation rate
User feedback / thumbs down
Error and timeout trends`,
    productionIssues: [
      'Teams only monitor API uptime and miss retrieval or answer-quality regressions.',
      'Quality degrades after a content or model update, but no alerting catches the shift early.',
      'User dissatisfaction is visible in support channels, not in the AI system telemetry itself.',
    ],
    bestPractices: [
      'Monitor AI systems at the levels of model, retrieval, tools, and user experience.',
      'Track latency, cost, and quality together so optimizations stay balanced.',
      'Alert on drift signals such as fallback spikes or grounding failures.',
      'Include user feedback and support signals in the monitoring loop.',
    ],
    relatedTopics: ['ai-evaluation', 'ai-cost-optimization', 'ai-chatbots'],
  },
  {
    slug: 'hallucination-management',
    title: 'Hallucinations',
    description: 'Learn how AI teams manage hallucinations through grounding, validation, UX design, and careful scope control.',
    concept: `Hallucinations are outputs that sound plausible but are unsupported, incorrect, or fabricated. They are a core product and trust challenge in LLM engineering.`,
    why: `Hallucination management matters because users usually judge AI systems by whether they are safe and trustworthy, not only by whether they are fluent.`,
    usage: `Teams reduce hallucinations by retrieving grounded sources, constraining prompts, limiting scope, using structured outputs, validating citations, and routing sensitive tasks to human review or deterministic systems.`,
    workflow: `The system narrows the task, retrieves evidence, asks the model to answer from that evidence, validates output shape or source grounding, and uses fallback behavior when confidence is weak.`,
    exampleTitle: 'Grounded answer pattern',
    exampleCode: `Question
  -> retrieve approved evidence
  -> instruct model to answer only from evidence
  -> validate format / citation
  -> fallback if answer unsupported`,
    productionIssues: [
      'Teams try to solve hallucinations only with stronger prompts instead of better retrieval and UX design.',
      'The product presents uncertain outputs with too much authority, damaging trust.',
      'No one defines what degree of error is acceptable for the task.',
    ],
    bestPractices: [
      'Limit the system to tasks and data where grounding is realistic.',
      'Use retrieval, validation, and explicit uncertainty behavior together.',
      'Expose source evidence or confidence cues where helpful to users.',
      'Treat hallucination rate as a measurable product-quality concern.',
    ],
    relatedTopics: ['retrieval-augmented-generation', 'ai-evaluation', 'ai-chatbots'],
  },
  {
    slug: 'ai-cost-optimization',
    title: 'Cost Optimization',
    description: 'Understand AI cost optimization across model choice, token budgets, caching, retrieval quality, and orchestration design.',
    concept: `AI cost optimization is the practice of keeping model and retrieval spend aligned with product value. It involves model selection, token reduction, caching, batching, retrieval precision, and workflow design.`,
    why: `AI systems can scale cost faster than many teams expect. Without cost discipline, a promising assistant or automation feature becomes financially hard to sustain.`,
    usage: `Teams optimize by shrinking prompts, improving retrieval precision, using cheaper models where appropriate, caching repeated answers, and avoiding unnecessary multi-step agent loops.`,
    workflow: `The team measures cost per request, cost per successful task, token usage distribution, and model or pipeline alternatives, then changes the architecture without breaking quality or trust.`,
    exampleTitle: 'Cost review lens',
    exampleCode: `Cost per request
  -> token breakdown
  -> model tier decision
  -> retrieval size tuning
  -> cache repeated flows
  -> compare quality vs savings`,
    productionIssues: [
      'Teams optimize for quality only and discover the feature is too expensive at real traffic volume.',
      'Large prompts and unnecessary chains raise token cost without meaningful quality gains.',
      'Lower-cost models are used blindly and quality falls in ways nobody measures.',
    ],
    bestPractices: [
      'Track cost per task and tie it to user value, not only raw token counts.',
      'Reduce prompt and retrieval waste before reaching for more infrastructure.',
      'Choose the cheapest model that still meets the task quality bar.',
      'Benchmark cost optimizations against evaluation datasets before rollout.',
    ],
    relatedTopics: ['tokens', 'ai-monitoring', 'gpt-models'],
  },
  {
    slug: 'ai-security',
    title: 'Security',
    description: 'Learn AI security concerns including data leakage, prompt injection, access control, tool safety, and model-governance boundaries.',
    concept: `AI security covers the risks introduced by models, prompts, retrieval, external tools, and sensitive data. Common concerns include prompt injection, data leakage, insecure tool use, weak isolation, and unapproved content exposure.`,
    why: `Security is central to AI adoption. Many organizations are willing to test models, but only if engineers can explain how data, permissions, and tool access are controlled.`,
    usage: `Teams secure AI products by filtering retrieval sources, enforcing user entitlements, isolating secrets, controlling tool permissions, sanitizing external input, and logging sensitive operations carefully.`,
    workflow: `Security reviews start by mapping the data path, tool path, and trust boundaries: what the model sees, what it can call, what it can reveal, and how those actions are authorized or blocked.`,
    exampleTitle: 'AI security boundary map',
    exampleCode: `User input
  -> sanitize and classify
  -> permission-aware retrieval
  -> model call
  -> tool call guardrails
  -> output validation / redaction
  -> audit log`,
    productionIssues: [
      'RAG systems leak content because permissions are not enforced at retrieval time.',
      'Agent tool access is broader than necessary, creating workflow or data risk.',
      'Teams focus on prompt wording and miss the bigger issue of trust boundaries and secrets handling.',
    ],
    bestPractices: [
      'Design AI security around data paths, permissions, and tool boundaries.',
      'Enforce retrieval filtering and user entitlements before generation.',
      'Keep agent or tool permissions minimal and observable.',
      'Include prompt-injection and data-exposure tests in release readiness.',
    ],
    relatedTopics: ['enterprise-ai', 'knowledge-systems', 'ai-agents'],
  },
  {
    slug: 'llm-scenarios',
    title: 'LLM Scenarios',
    description: 'Prepare for LLM scenario questions that combine prompting, retrieval, latency, evaluation, and product judgment.',
    concept: `LLM scenario questions ask how you would design or debug a realistic AI workflow rather than simply define a model term. They often mix retrieval quality, cost, hallucination risk, and product experience in one discussion.`,
    why: `These scenarios are common in AI engineering interviews because they reveal whether you can think like a product and platform engineer at the same time.`,
    usage: `Typical scenarios include building an internal knowledge assistant, reducing hallucinations in support chat, choosing between a cheap and expensive model tier, or making an AI feature safe for enterprise users.`,
    workflow: `The best answer starts with user task and risk, then covers context strategy, evaluation, monitoring, fallback, and how the team would prove the feature is safe and useful after launch.`,
    exampleTitle: 'Scenario answer frame',
    exampleCode: `Clarify user problem
  -> define data and permission boundary
  -> choose retrieval / prompt / model pattern
  -> explain evaluation and fallback
  -> describe rollout and monitoring`,
    productionIssues: [
      'Candidates rush to model choice without defining the user workflow or risk level.',
      'Answers ignore how the feature will be evaluated and supported after release.',
      'Trade-offs are hand-wavy rather than grounded in cost, latency, or trust.',
    ],
    bestPractices: [
      'Answer LLM scenarios through product requirements and operational evidence.',
      'Mention evaluation, fallback, and monitoring as part of the design.',
      'Explain why simpler approaches were rejected if you recommend a complex AI stack.',
      'Practice comparing trade-offs clearly instead of listing model buzzwords.',
    ],
    relatedTopics: ['ai-architecture-interviews', 'ai-production-issues', 'ai-design-questions'],
  },
  {
    slug: 'ai-architecture-interviews',
    title: 'AI Architecture',
    description: 'Understand the architecture questions AI and LLM engineers face around retrieval, orchestration, governance, and system design.',
    concept: `AI architecture interview questions focus on how you connect models, data, APIs, retrieval, user workflows, and operational controls into a system that is reliable and supportable.`,
    why: `Architecture depth is how hiring teams distinguish prompt familiarity from senior engineering capability. They want to hear how you design the whole system, not only the model call.`,
    usage: `Questions often cover RAG design, enterprise knowledge assistants, agent workflows, evaluation systems, observability, and how AI features integrate into broader backend and frontend products.`,
    workflow: `Strong architecture answers frame the user task, trust and data boundaries, retrieval strategy, orchestration, validation, monitoring, and release approach with explicit trade-offs.`,
    exampleTitle: 'AI architecture answer structure',
    exampleCode: `Task and risk
  -> data / retrieval boundary
  -> model and orchestration layer
  -> validation / fallback
  -> UX and integration
  -> monitoring / evaluation / governance`,
    productionIssues: [
      'Architecture answers stay at diagram level and never explain why the system will remain reliable.',
      'The design ignores deployment, support ownership, or cost control.',
      'Candidates recommend agent complexity where a simpler RAG workflow would be enough.',
    ],
    bestPractices: [
      'Ground every AI architecture answer in user value, constraints, and operating model.',
      'Make retrieval, evaluation, and fallback explicit in the architecture.',
      'Explain why the chosen level of complexity is justified.',
      'Show that you know how the feature will be observed and improved over time.',
    ],
    relatedTopics: ['ai-system-design', 'enterprise-ai', 'llm-scenarios'],
  },
  {
    slug: 'ai-production-issues',
    title: 'Production Issues',
    description: 'Learn the production issues AI engineers are expected to diagnose across retrieval, prompts, latency, tools, and model behavior.',
    concept: `AI production issues are rarely only model issues. They often involve stale data, weak retrieval, token overruns, tool-call failures, prompt regressions, provider limits, or changes in user behavior.`,
    why: `Employers want AI engineers who can debug end-to-end systems instead of blaming “the model” for every failure.`,
    usage: `Common issues include hallucinations after a content refresh, slow chat latency after longer prompts, retrieval returning irrelevant content, tool calls failing under load, or rising costs after feature adoption.`,
    workflow: `Troubleshooting starts from user symptoms, then isolates whether the failure is in input handling, retrieval, prompt assembly, model inference, tool execution, or product integration.`,
    exampleTitle: 'AI incident triage loop',
    exampleCode: `User symptom
  -> scope affected workflows
  -> check retrieval and prompt changes
  -> inspect model / tool latency
  -> compare against baseline quality
  -> mitigate and prevent recurrence`,
    productionIssues: [
      'Teams change prompts, retrieval, and model versions simultaneously, making root cause opaque.',
      'No observability exists for which chunks or tools were used in a bad answer.',
      'Support teams only see final outputs and cannot inspect system internals during incidents.',
    ],
    bestPractices: [
      'Log enough retrieval, prompt, and tool metadata to debug bad outputs safely.',
      'Release prompt, retrieval, and model changes with controlled experiment discipline.',
      'Treat quality regressions as operational incidents when user trust is affected.',
      'Keep baseline evals so you can compare a broken system against known-good behavior.',
    ],
    relatedTopics: ['ai-monitoring', 'ai-evaluation', 'hallucination-management'],
  },
  {
    slug: 'ai-design-questions',
    title: 'Design Questions',
    description: 'Prepare for AI design questions that test end-to-end feature thinking, evaluation strategy, and enterprise readiness.',
    concept: `AI design questions ask how you would build a complete feature: data flow, prompt or retrieval pattern, UX, fallback, security, monitoring, and rollout. They are broader than prompt questions and more product-oriented than theory questions.`,
    why: `These questions are common for AI Engineer, LLM Engineer, GenAI Engineer, and AI Architect roles because they show whether you can turn model capability into a dependable product.`,
    usage: `Examples include designing a knowledge copilot, an AI support assistant, a code helper, or a summarization workflow with human review, logging, and metrics.`,
    workflow: `A good design answer clarifies the task, identifies risk, selects an architecture pattern, defines evaluation and fallback, and explains how the team will observe and improve the feature after release.`,
    exampleTitle: 'AI feature design template',
    exampleCode: `User task
  -> required data
  -> retrieval / model / tool choice
  -> UX response and fallback
  -> evaluation and monitoring
  -> rollout and governance`,
    productionIssues: [
      'Candidates design features around the model API and ignore the surrounding product system.',
      'Evaluation and governance are bolted on after the design instead of integrated up front.',
      'The proposal cannot explain what happens when the AI response is wrong or missing.',
    ],
    bestPractices: [
      'Answer AI design questions through the full user workflow, not only model inference.',
      'Build in fallback, evaluation, and monitoring from the start.',
      'Use architecture patterns proportional to the actual task complexity.',
      'Make trust and operational ownership visible in the design.',
    ],
    relatedTopics: ['ai-system-design', 'llm-scenarios', 'ai-architecture-interviews'],
  },
];

export const aiTopics: TopicContent[] = aiTopicSpecs.map(topic);
