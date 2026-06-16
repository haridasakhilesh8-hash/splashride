import type { InterviewPrepQuestion, InterviewPrepSection, InterviewPrepTopicGroup } from './types';
import { contentfulInterviewPrepTopicGroups } from './topicNavigation';

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

const industries = ['media', 'retail', 'SaaS', 'fintech', 'education', 'travel'];

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
    category: 'Fundamentals',
    topicGroup: 'Fundamentals',
    concern: 'headless CMS boundaries, content ownership, and frontend delivery expectations',
    relatedTopics: ['Content Modeling', 'Architecture Questions'],
    profile: {
      mechanism: 'Contentful is a headless CMS where structured content is modeled separately from the frontend presentation layer.',
      implementation: 'Start by separating business content concepts from rendering components, then align editors, APIs, and consumers to the same content contract.',
      failure: 'teams treat Contentful like a page builder and end up with weak models, duplicated content, and brittle frontend assumptions',
      decision: 'when headless content delivery gives more flexibility than a template-coupled CMS and how much governance the team needs',
      incident: 'a product team launches quickly on Contentful but later discovers every frontend page interprets the same content differently',
      evidence: ['content model inventory', 'frontend mapping logic', 'editor workflow notes'],
    },
  },
  {
    category: 'Content Modeling',
    topicGroup: 'Content Modeling',
    concern: 'schema design, reuse, validation, and long-term content maintainability',
    relatedTopics: ['Fundamentals', 'Rich Text and Assets'],
    profile: {
      mechanism: 'Content modeling defines content types, field structure, references, validations, and editorial constraints.',
      implementation: 'Model reusable business entities first, validate them with editors and frontend developers, and avoid giant page-specific schemas.',
      failure: 'content models become overloaded and every new page or campaign adds more one-off fields that break consistency',
      decision: 'how granular the model should be and where to balance flexibility versus editor simplicity',
      incident: 'a landing page model grows to dozens of fields and the frontend team cannot reuse anything safely across brands',
      evidence: ['content type definitions', 'field validation rules', 'examples of duplicated or divergent entries'],
    },
  },
  {
    category: 'Content Delivery API',
    topicGroup: 'Delivery APIs',
    concern: 'published-content fetching, query design, caching, and frontend contract stability',
    relatedTopics: ['Content Preview API', 'Production Scenarios'],
    profile: {
      mechanism: 'The Content Delivery API serves published Contentful content to applications through stable read-only requests.',
      implementation: 'Fetch only the fields and references the UI needs, centralize data access, and pair the requests with clear caching rules.',
      failure: 'published content stays stale or frontend payloads become noisy because delivery access was designed without cache or query discipline',
      decision: 'how to structure data access so published content stays fast, predictable, and easy to reason about in production',
      incident: 'editors publish an urgent homepage fix but the site continues showing stale content because the delivery path and cache path are unclear',
      evidence: ['API request patterns', 'cache and revalidation logs', 'frontend data-mapping layer'],
    },
  },
  {
    category: 'Content Preview API',
    topicGroup: 'Delivery APIs',
    concern: 'draft-content rendering, preview security, and editor trust before publish',
    relatedTopics: ['Environments and Publishing', 'Production Scenarios'],
    profile: {
      mechanism: 'The Content Preview API exposes draft or unpublished content so editors can verify changes before release.',
      implementation: 'Use separate preview tokens, protected preview routes, and the same rendering logic as production wherever possible.',
      failure: 'preview becomes untrusted because it points to the wrong environment, uses different rendering assumptions, or leaks access too broadly',
      decision: 'how to give editors realistic preview confidence without turning preview into a public or fragile delivery path',
      incident: 'an editor approves a draft based on preview, but the production page looks different because the preview environment was miswired',
      evidence: ['preview routing config', 'draft-versus-published request traces', 'environment and token settings'],
    },
  },
  {
    category: 'Content Management API',
    topicGroup: 'Content Management',
    concern: 'schema changes, automation safety, migration scripts, and privileged write access',
    relatedTopics: ['Content Modeling', 'Architecture Questions'],
    profile: {
      mechanism: 'The Content Management API is the write-capable administrative API used for content updates, migrations, and environment automation.',
      implementation: 'Restrict management tokens, review migration scripts, and treat schema changes like production releases rather than casual admin edits.',
      failure: 'automation changes content or models unsafely because CMA access and migration discipline were weak',
      decision: 'what should be automated through CMA and what should remain behind reviewed editorial or platform processes',
      incident: 'a migration script modifies a content type in master without enough testing and multiple frontend pages start failing',
      evidence: ['migration scripts and logs', 'management token scope', 'content type version history'],
    },
  },
  {
    category: 'Rich Text and Assets',
    topicGroup: 'Rich Text and Assets',
    concern: 'structured rendering, media performance, and frontend resilience against editorial variation',
    relatedTopics: ['Content Modeling', 'Production Scenarios'],
    profile: {
      mechanism: 'Rich text and assets combine editor flexibility with structured JSON and media metadata that frontend code must render deliberately.',
      implementation: 'Map supported rich-text nodes to components, use asset metadata carefully, and define which embedded content patterns are allowed.',
      failure: 'pages break visually or slow down because rich text and media are treated like free-form blobs instead of structured content',
      decision: 'how much editorial freedom to allow without losing performance, accessibility, and consistent UI behavior',
      incident: 'a release adds embedded entries and oversized media to rich text, and the page layout breaks on mobile in production',
      evidence: ['rich-text renderer behavior', 'asset dimensions and usage patterns', 'frontend fallback handling'],
    },
  },
  {
    category: 'Webhooks',
    topicGroup: 'Webhooks',
    concern: 'event-driven publishing automation, targeted revalidation, and safe downstream updates',
    relatedTopics: ['Content Delivery API', 'Production Scenarios'],
    profile: {
      mechanism: 'Webhooks notify downstream systems when content is published, unpublished, or changed so caches, builds, and indexes can react.',
      implementation: 'Design idempotent webhook consumers, verify signatures, and trigger focused updates rather than broad rebuilds whenever possible.',
      failure: 'content events create duplicate actions, stale pages, or expensive full rebuilds because webhook consumers were too naive',
      decision: 'which publishing events should trigger which downstream workflows and how to keep those workflows safe at scale',
      incident: 'a single content publish triggers repeated builds and cache churn because the webhook consumer is not idempotent',
      evidence: ['webhook delivery logs', 'downstream revalidation traces', 'consumer retry behavior'],
    },
  },
  {
    category: 'Environments and Publishing',
    topicGroup: 'Environments and Publishing',
    concern: 'environment strategy, release discipline, and draft-to-publish safety',
    relatedTopics: ['Content Preview API', 'Localization'],
    profile: {
      mechanism: 'Contentful environments isolate schema and content states so teams can test and release changes more safely than editing directly in production.',
      implementation: 'Use a small intentional environment strategy, test migrations and previews in non-production, and define who can publish what and when.',
      failure: 'teams change models directly in master and then scramble when preview, localization, or frontend consumers are not ready',
      decision: 'how many environments to keep, how changes flow between them, and how editorial publishing should interact with engineering releases',
      incident: 'an urgent content-model change is made in master and breaks a live campaign because the consumer app was still expecting the old schema',
      evidence: ['environment usage patterns', 'publish audit trail', 'consumer release notes'],
    },
  },
  {
    category: 'Localization',
    topicGroup: 'Localization',
    concern: 'locale strategy, fallback behavior, slug rules, and multi-region content operations',
    relatedTopics: ['Content Modeling', 'Architecture Questions'],
    profile: {
      mechanism: 'Localization in Contentful lets teams manage locale-aware content fields while keeping one shared content model.',
      implementation: 'Define which fields localize, how slugs and SEO behave per locale, and how preview and fallback rules should work before scaling globally.',
      failure: 'localized experiences become inconsistent because teams add locales without clear slug, fallback, or ownership strategy',
      decision: 'how to support multi-locale delivery without turning the content model and routing behavior into a support burden',
      incident: 'a new locale launches and users see mixed-language pages because fallback logic and localized fields were not modeled consistently',
      evidence: ['locale configuration', 'slug and route strategy', 'localized content completeness checks'],
    },
  },
  {
    category: 'Production Scenarios',
    topicGroup: 'Production Support',
    concern: 'evidence-led CMS incident response across content state, API path, cache, and frontend rendering',
    relatedTopics: ['Webhooks', 'Architecture Questions'],
    profile: {
      mechanism: 'Real Contentful production issues usually happen at the boundary between editor workflow, API delivery, cache behavior, and frontend assumptions.',
      implementation: 'Triage from symptom to content state to delivery path to rendering path, and change the minimum needed to recover safely.',
      failure: 'support teams guess from the CMS UI or the frontend only and miss the real boundary where stale content or schema drift lives',
      decision: 'which operational signal to trust first and how to separate content issues from application issues during an incident',
      incident: 'the homepage is wrong in production and one team blames the frontend while another says the CMS is fine, but the cache path is actually stale',
      evidence: ['published-entry state', 'delivery and preview response comparison', 'cache and deployment timeline'],
    },
  },
  {
    category: 'Architecture Questions',
    topicGroup: 'Architecture',
    concern: 'content-platform governance, multi-app consumption, and long-term CMS maintainability',
    relatedTopics: ['Content Modeling', 'Localization'],
    profile: {
      mechanism: 'Architect-level Contentful work is about governing content models, environments, integrations, and multi-channel delivery as one platform.',
      implementation: 'Design ownership boundaries, schema evolution rules, preview strategy, and consumer contracts so multiple teams can move safely.',
      failure: 'the platform technically works but every team interprets the model differently and changes become risky over time',
      decision: 'how to keep one Contentful platform reusable, governable, and safe across brands, locales, and frontend applications',
      incident: 'multiple apps depend on shared content models and a rushed schema change creates regressions across web, app, and preview channels',
      evidence: ['architecture decision records', 'cross-app content contracts', 'migration and ownership standards'],
    },
  },
];

const intents: Intent[] = ['concept', 'implementation', 'troubleshooting', 'architecture'];

function questionText(intent: Intent, spec: TopicSpec) {
  if (intent === 'concept') {
    return `Explain ${spec.category} in Contentful. Why does ${spec.concern} matter in real CMS and frontend delivery work?`;
  }
  if (intent === 'implementation') {
    return `How would you implement ${spec.category} in Contentful so ${spec.concern} is handled safely in production?`;
  }
  if (intent === 'troubleshooting') {
    return `How would you troubleshoot a Contentful production issue involving ${spec.category} when ${spec.profile.incident}?`;
  }
  return `How would you make an architecture decision about ${spec.category} in Contentful when ${spec.concern} becomes critical across teams and channels?`;
}

function buildQuestion(spec: TopicSpec, intent: Intent, index: number): InterviewPrepQuestion {
  const industry = industries[hash(`${spec.category}-${intent}`) % industries.length];
  const directAnswer = intent === 'concept'
    ? `${spec.profile.mechanism} For ${spec.category}, the production-relevant concern is ${spec.concern}.`
    : intent === 'implementation'
      ? `In Contentful, implement ${spec.category} so ${spec.concern} is controlled through model rules, API discipline, frontend contracts, and safe publishing workflows.`
      : intent === 'troubleshooting'
        ? `Treat ${spec.category} as a boundary across content state, API behavior, cache, and rendering, then test the safest hypotheses before broad changes.`
        : `For Contentful ${spec.category}, the design decision is ${spec.profile.decision}. The answer must balance editor experience, frontend safety, platform governance, and release speed.`;

  return {
    id: `contentful-${slugify(spec.category)}-${intent}`,
    technologyId: 'contentful',
    topicGroup: spec.topicGroup,
    category: spec.category,
    questionType: intentTypes[intent],
    question: questionText(intent, spec),
    shortAnswer: `${directAnswer} Validate it with ${spec.profile.evidence[0]}.`,
    detailedAnswer: [
      `Direct answer: ${directAnswer}`,
      `What: ${spec.profile.mechanism}`,
      `Why: Contentful teams care because ${spec.profile.failure}.`,
      `How: ${spec.profile.implementation}`,
      `Production validation: Prove the answer with ${list(spec.profile.evidence)}.`,
    ],
    productionScenario: `A ${industry} team using Contentful is facing this signal: ${spec.profile.incident}. The engineer must explain how ${spec.category} influences the issue, isolate the boundary, and restore confidence without creating new content or release risk.`,
    realProjectExample: `On a ${industry} platform, the team used Contentful ${spec.category} to address ${spec.concern}. The solution only became reliable after they validated the workflow with ${list(spec.profile.evidence)} and aligned both editors and frontend developers on the same contract.`,
    interviewerExpectation: `The interviewer expects a concrete Contentful answer that connects ${spec.category} to ${spec.concern}, explains the trade-offs, and shows how the team would verify the behavior in a live content platform.`,
    commonMistakes: [
      `Giving a feature definition of ${spec.category} without explaining how it behaves across editors, APIs, caches, and frontend consumers.`,
      `Ignoring this Contentful design choice: ${spec.profile.decision}.`,
      `Troubleshooting ${spec.category} by changing content or settings before collecting ${spec.profile.evidence[0]}.`,
      `Skipping governance, publishing, or rendering implications for ${spec.category}.`,
    ],
    followUpQuestions: [
      `Which Contentful dependency most changes your answer for ${spec.category}: content model, API path, preview flow, or frontend rendering?`,
      `How would ${spec.profile.evidence[0]} and ${spec.profile.evidence[1]} prove your answer in production?`,
      `What is the safest rollback or mitigation if ${spec.profile.incident}?`,
      `At what scale or organizational complexity would you revisit the ${spec.category} decision?`,
    ],
    frequencyScore: Math.max(68, (intent === 'concept' ? 92 : intent === 'implementation' ? 88 : intent === 'troubleshooting' ? 85 : 81) - (index % 8)),
    commonWrongAnswer: `A weak answer names Contentful features but does not explain model design, publishing flow, rendering safety, evidence, or operational ownership for ${spec.category}.`,
    architectPerspective: `Architects govern Contentful ${spec.category} through this explicit decision: ${spec.profile.decision}. They evaluate editor workflow, consumer impact, schema evolution, cache behavior, and the user-facing signal "${spec.profile.incident}".`,
    keyTakeaway: `Explain Contentful ${spec.category} through the content platform boundary, operating evidence, and decision trade-offs rather than only through CMS terminology.`,
    difficultyLevel: difficultyByIntent[intent],
    experienceLevel: experienceByIntent[intent],
    relatedTopics: spec.relatedTopics,
    roleAnswers: {
      junior: `I can explain the purpose of Contentful ${spec.category} and the safe baseline workflow around it.`,
      mid: `I can implement Contentful ${spec.category} with repeatable model, API, and frontend integration discipline.`,
      senior: `I can troubleshoot Contentful ${spec.category} in production using ${list(spec.profile.evidence)} and recent-change analysis.`,
      architect: `I can choose and govern a Contentful ${spec.category} pattern using ${spec.profile.decision}.`,
    },
    isMostAsked: index < 12,
    mostAskedRank: index < 12 ? index + 1 : undefined,
    isRapidRevision: index < 6,
  };
}

const questions = topicSpecs.flatMap((spec, specIndex) => intents.map((intent, intentIndex) => (
  buildQuestion(spec, intent, (specIndex * intents.length) + intentIndex)
)));

const topicGroups: InterviewPrepTopicGroup[] = contentfulInterviewPrepTopicGroups.map((group) => ({
  id: group.id,
  title: group.title,
  description: `Interview preparation for ${group.title.toLowerCase()} in Contentful implementations.`,
  topics: group.topics.map((topic) => topic.category),
}));

const questionsPerPage = 10;

const topicMetadata = topicSpecs.map((spec) => {
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

const topicPreparationSets = topicSpecs.map((spec) => {
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
    id: 'contentful-preview-production-mismatch',
    title: 'Preview looked right but production content is still wrong',
    topic: 'Content Preview API',
    problem: 'Editors approved a content update in preview, but the live route still shows an older or structurally different version after publish.',
    rootCauseAnalysis: ['Preview used a different environment or token path than production', 'Published content was cached or revalidated incorrectly', 'The frontend rendering contract differs between preview and published data paths'],
    troubleshootingSteps: ['Compare draft and published responses for the same entry', 'Verify environment, token, and locale settings', 'Inspect cache invalidation or revalidation flow', 'Confirm the frontend renderer handles both paths consistently'],
    expectedInterviewAnswer: 'The candidate should isolate content state, environment selection, and cache or rendering drift before blaming editors or redeploying blindly.',
    seniorApproach: 'A senior answer includes response comparison, publish audit review, cache-path verification, and a safe rollback or refresh plan.',
    architectApproach: 'An architect standardizes preview contracts, publish expectations, and revalidation behavior so editorial trust stays high.',
    relatedQuestions: questions.filter((question) => question.category === 'Content Preview API').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'contentful-model-migration-regression',
    title: 'Content model change breaks multiple pages after release',
    topic: 'Content Management API',
    problem: 'A schema or migration update goes live and several frontend pages fail because entries no longer match the expected structure.',
    rootCauseAnalysis: ['The content model change was applied without validating consumer impact', 'Migration backfill was incomplete', 'Frontend queries and renderers still assume the previous field or reference structure'],
    troubleshootingSteps: ['Review the changed content type and migration logs', 'Identify which entries and consumers are affected', 'Restore or patch the broken contract safely', 'Add compatibility checks before future model releases'],
    expectedInterviewAnswer: 'The answer should treat content-model evolution like a production release problem with schema, data, and consumer coordination.',
    seniorApproach: 'A senior answer covers migration audit, partial rollback strategy, data backfill, and consumer validation.',
    architectApproach: 'An architect introduces stronger schema governance, migration review, and multi-consumer contract discipline.',
    relatedQuestions: questions.filter((question) => question.category === 'Content Management API').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'contentful-webhook-cache-storm',
    title: 'Publishing triggers repeated rebuilds and stale content windows',
    topic: 'Webhooks',
    problem: 'A content publish triggers multiple downstream rebuilds, cache churn, and inconsistent freshness across the website.',
    rootCauseAnalysis: ['Webhook consumers were not idempotent', 'Every event triggered broad refreshes instead of targeted revalidation', 'The publish pipeline lacked observability and deduplication'],
    troubleshootingSteps: ['Review webhook delivery and retry logs', 'Trace which downstream actions were triggered', 'Disable or narrow the broadest invalidation path', 'Add idempotency and targeted refresh rules'],
    expectedInterviewAnswer: 'The best answer treats it as an event-design problem rather than only a frontend problem.',
    seniorApproach: 'A senior answer includes delivery-log analysis, targeted mitigation, and observability improvements for the content event pipeline.',
    architectApproach: 'An architect redesigns publish automation so event handling stays focused, secure, and scalable.',
    relatedQuestions: questions.filter((question) => question.category === 'Webhooks').slice(0, 4).map((question) => question.id),
  },
  {
    id: 'contentful-localization-launch-gap',
    title: 'New locale launches with mixed-language content',
    topic: 'Localization',
    problem: 'A newly launched locale shows fallback text, inconsistent slugs, and incomplete content on several high-traffic pages.',
    rootCauseAnalysis: ['Localized fields and fallback behavior were not modeled consistently', 'Locale completeness was not validated before publish', 'Frontend routing assumed all locales had the same slug and content readiness'],
    troubleshootingSteps: ['Audit localized field completeness for affected entries', 'Verify locale fallback and slug behavior', 'Patch the highest-visibility gaps first', 'Add pre-launch locale validation and publishing checks'],
    expectedInterviewAnswer: 'The candidate should connect model design, locale operations, and frontend routing instead of treating it as translation-only work.',
    seniorApproach: 'A senior answer combines locale-content audit, route verification, and safe rollout sequencing for unfinished regions.',
    architectApproach: 'An architect defines locale strategy, ownership, slug policy, and validation gates before scaling to more markets.',
    relatedQuestions: questions.filter((question) => question.category === 'Localization').slice(0, 4).map((question) => question.id),
  },
];

export const contentfulInterviewPrep: InterviewPrepSection = {
  technologyId: 'contentful',
  technologyLabel: 'Contentful',
  title: 'Contentful Interview Prep',
  description: 'Contentful interview preparation focused on content modeling, delivery and preview APIs, rich text, assets, publishing workflows, localization, integrations, and CMS architecture decisions.',
  lastReviewed: 'June 2026',
  categories: topicSpecs.map((spec) => spec.category),
  questionTypes: Object.values(intentTypes),
  experienceLevels: [
    { id: 'beginner', label: 'Junior CMS / Frontend Developer', years: '0-2 Years', summary: 'Explain Contentful basics, content modeling fundamentals, APIs, and simple frontend integration patterns.' },
    { id: 'mid', label: 'Contentful Developer', years: '2-5 Years', summary: 'Implement content models, previews, webhooks, localization, and reliable frontend delivery workflows.' },
    { id: 'senior', label: 'Senior CMS / Content Platform Engineer', years: '5-8 Years', summary: 'Lead production troubleshooting, governance, migrations, and cross-team content platform decisions.' },
    { id: 'architect', label: 'CMS Architect', years: '8+ Years', summary: 'Design multi-team Contentful platforms with safe schema evolution, localization strategy, and multi-channel delivery governance.' },
  ],
  topicGroups,
  topicMetadata,
  pagination: { questionsPerPage, ordering: 'most-asked-first' },
  productionScenarios,
  mockInterviewProfiles: [
    { id: 'beginner', label: 'Junior CMS Developer', description: 'Fundamentals, content modeling basics, APIs, and rendering awareness.', questionCount: 8, recommendedMinutes: 25 },
    { id: 'mid', label: 'Contentful Developer', description: 'Preview, delivery, schema discipline, frontend integration, and publishing workflows.', questionCount: 10, recommendedMinutes: 35 },
    { id: 'senior', label: 'Senior CMS Engineer', description: 'Production support, migrations, localization, and multi-team content-platform trade-offs.', questionCount: 10, recommendedMinutes: 45 },
    { id: 'architect', label: 'CMS Architect', description: 'Platform governance, multi-app delivery, locale strategy, and long-term maintainability.', questionCount: 8, recommendedMinutes: 50 },
  ],
  rapidRevisionPlans: [
    { id: '15-min', label: '15 Minute Revision', minutes: 15, description: 'Highest-signal Contentful fundamentals, modeling, delivery, and publishing questions.', questionIds: questions.filter((question) => question.isRapidRevision).slice(0, 12).map((question) => question.id) },
    { id: '30-min', label: '30 Minute Revision', minutes: 30, description: 'Contentful content modeling, APIs, preview, webhooks, and localization.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 24).map((question) => question.id) },
    { id: '60-min', label: '1 Hour Revision', minutes: 60, description: 'Senior and architect-level Contentful preparation.', questionIds: questions.filter((question) => question.isMostAsked).slice(0, 44).map((question) => question.id) },
  ],
  topicPreparationSets,
  questions,
};
