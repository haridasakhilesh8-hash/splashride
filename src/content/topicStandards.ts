import type { Confusion, FAQ, TopicContent } from './types';

function stripMarkdown(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/\r?\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function ensureSentence(text: string) {
  const cleaned = stripMarkdown(text).trim().replace(/[;,:-]\s*$/, '');
  if (!cleaned) return '';
  return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
}

function splitSentences(text: string) {
  return stripMarkdown(text)
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function firstSentence(text: string) {
  return splitSentences(text)[0] ?? '';
}

function truncateSentence(text: string, maxLength: number) {
  const sentence = ensureSentence(text);
  if (sentence.length <= maxLength) return sentence;
  const trimmed = sentence.slice(0, maxLength - 3).replace(/[,\s]+[^,\s]*$/, '').trim();
  return ensureSentence(`${trimmed}...`);
}

function limitSentenceWithoutEllipsis(text: string, maxLength: number) {
  const sentence = ensureSentence(text);
  if (sentence.length <= maxLength) return sentence;
  const trimmed = sentence.slice(0, maxLength).replace(/[,\s]+[^,\s]*$/, '').trim();
  return ensureSentence(trimmed);
}

function dedupeByLowercase(values: string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function dedupeFaqs(faqs: FAQ[]) {
  const seen = new Set<string>();
  return faqs.filter((faq) => {
    const key = faq.question.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function dedupeConfusions(confusions: Confusion[]) {
  const seen = new Set<string>();
  return confusions.filter((confusion) => {
    const key = confusion.question.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getTopicSubject(title: string) {
  const trimmed = title.trim().replace(/\?$/, '');
  if (/^what is /i.test(trimmed)) {
    return trimmed.replace(/^what is /i, '').trim();
  }
  return trimmed;
}

function toDisplayTopic(title: string) {
  const subject = getTopicSubject(title);
  if (!subject) return title.trim();
  return subject;
}

function buildShortQuickUnderstanding(topic: TopicContent) {
  return topic.quickUnderstanding.trim().replace(/\.\.\.\s*$/, '.');
}

function buildQuickFacts(topic: TopicContent) {
  const definition = truncateSentence(firstSentence(topic.whatIsIt) || topic.description, 120);
  const realUsage = truncateSentence(
    firstSentence(topic.realWorldUsage) || firstSentence(topic.whyWeNeedIt),
    120,
  );
  const interview = `Interviewers ask ${toDisplayTopic(topic.title)} to test whether you understand the practical behavior and trade-offs behind it.`;
  const production = truncateSentence(
    topic.productionIssues[0] || `${toDisplayTopic(topic.title)} becomes harder to support when configuration, ownership, or runtime behavior is unclear.`,
    135,
  );

  const facts = dedupeByLowercase([
    definition,
    realUsage,
    interview,
    `Production relevance: ${stripMarkdown(production)}`,
  ])
    .filter(Boolean)
    .slice(0, 4);

  return `**Quick Facts**
- ${facts.join('\n- ')}`;
}

function ensureQuickFactsBlock(topic: TopicContent) {
  if (/\*\*Quick Facts\*\*/.test(topic.whatIsIt)) return topic.whatIsIt;
  return `${topic.whatIsIt.trim()}\n\n${buildQuickFacts(topic)}`;
}

function buildFaqAnswer(parts: string[], fallback: string) {
  const cleaned = dedupeByLowercase(parts.map((part) => ensureSentence(part)).filter(Boolean));
  const combined = cleaned.join(' ');
  return combined || fallback;
}

function buildGeneratedFaqs(topic: TopicContent): FAQ[] {
  const subject = toDisplayTopic(topic.title);
  const definition = firstSentence(topic.whatIsIt) || topic.description;
  const why = firstSentence(topic.whyWeNeedIt);
  const realUsage = firstSentence(topic.realWorldUsage) || firstSentence(topic.howItWorks);
  const prod = topic.productionIssues[0] || '';

  return [
    {
      question: `What is ${subject}?`,
      answer: buildFaqAnswer(
        [definition, why],
        `${subject} is an important topic in this stack, and real understanding comes from knowing both the definition and the project impact.`,
      ),
    },
    {
      question: `Why is ${subject} used in real projects?`,
      answer: buildFaqAnswer(
        [why, realUsage],
        `Teams use ${subject} because it improves implementation clarity, delivery safety, or maintainability in real applications.`,
      ),
    },
    {
      question: `How does ${subject} work in real projects?`,
      answer: buildFaqAnswer(
        [realUsage, firstSentence(topic.howItWorks)],
        `${subject} becomes clearer when you trace how developers configure it, how the framework or platform processes it, and how the application behaves at runtime.`,
      ),
    },
    {
      question: `Is ${subject} important for interviews?`,
      answer: `Yes. Interviewers use ${subject} to check whether you can move beyond syntax and explain debugging, trade-offs, or production behavior clearly.`,
    },
    {
      question: `What production issues happen with ${subject}?`,
      answer: buildFaqAnswer(
        [
          prod,
          `Understanding ${subject} helps teams diagnose configuration mistakes, environment mismatches, and runtime failures faster.`,
        ],
        `${subject} usually causes production trouble when teams copy a pattern without understanding configuration, ownership, or runtime behavior.`,
      ),
    },
    {
      question: `What should I learn after ${subject}?`,
      answer: `After ${subject}, move to the related concepts that shape implementation, debugging, and architecture decisions in the same technology. That next layer usually makes the topic much easier to apply in real projects.`,
    },
  ];
}

function ensureFaqCount(topic: TopicContent) {
  const merged = dedupeFaqs([...topic.faqs, ...buildGeneratedFaqs(topic)]);
  return merged.slice(0, Math.max(5, Math.min(7, merged.length)));
}

function buildGeneratedConfusions(topic: TopicContent): Confusion[] {
  const subject = toDisplayTopic(topic.title);
  const why = firstSentence(topic.whyWeNeedIt);
  return [
    {
      question: `Is ${subject} only useful in simple examples?`,
      answer: `No. ${subject} matters most when the codebase grows and teams need predictable behavior, cleaner debugging, or safer production changes.`,
    },
    {
      question: `Do modern tools remove the need to understand ${subject}?`,
      answer: `No. Tools can automate setup, but teams still need ${subject} knowledge when behavior becomes confusing, performance drops, or production incidents appear.`,
    },
    {
      question: `Why does ${subject} still fail in real projects?`,
      answer: ensureSentence(
        why ||
          `${subject} usually fails when teams copy the happy path but skip configuration details, ownership boundaries, or runtime validation.`,
      ),
    },
  ];
}

function ensureConfusionCount(topic: TopicContent) {
  const merged = dedupeConfusions([...topic.commonConfusions, ...buildGeneratedConfusions(topic)]);
  return merged.slice(0, Math.max(4, Math.min(5, merged.length)));
}

function ensureProductionIssueCount(topic: TopicContent) {
  const subject = toDisplayTopic(topic.title);
  const generated = [
    `${subject} becomes harder to debug when environments drift and the team cannot tell which configuration or dependency changed the runtime behavior.`,
    `Teams often use ${subject} successfully in development but miss the monitoring, validation, or rollout checks needed to support it safely in production.`,
    `Weak ownership around ${subject} leads to inconsistent implementations, which makes incidents slower to triage and fixes harder to scale across the codebase.`,
  ];
  const merged = dedupeByLowercase([...topic.productionIssues, ...generated]);
  return merged.slice(0, Math.max(4, Math.min(6, merged.length)));
}

function ensureBestPracticeCount(topic: TopicContent) {
  const subject = toDisplayTopic(topic.title);
  const generated = [
    `Document how ${subject} is used in the codebase so onboarding, debugging, and reviews stay easier.`,
    `Validate ${subject} with a small reproducible example before scaling the pattern across larger features.`,
    `Treat ${subject} as part of production architecture, not only as syntax or setup.`,
    `Connect ${subject} decisions to maintainability, observability, and team ownership early.`,
  ];
  const merged = dedupeByLowercase([...topic.bestPractices, ...generated]);
  return merged.slice(0, Math.max(5, Math.min(7, merged.length)));
}

function ensureKeyTakeawayCount(topic: TopicContent) {
  const subject = toDisplayTopic(topic.title);
  const generated = [
    `${subject} matters because it affects both implementation and production behavior.`,
    `Strong answers for ${subject} connect the concept to real project usage, not just definitions.`,
    `The next learning step after ${subject} is usually the related topics that shape debugging, architecture, or scaling.`,
  ];
  const merged = dedupeByLowercase([...topic.keyTakeaways, ...generated]);
  return merged.slice(0, Math.max(4, Math.min(6, merged.length)));
}

export function normalizeTopicContent(topic: TopicContent): TopicContent {
  return {
    ...topic,
    quickUnderstanding: buildShortQuickUnderstanding(topic),
    whatIsIt: ensureQuickFactsBlock(topic),
    commonConfusions: ensureConfusionCount(topic),
    productionIssues: ensureProductionIssueCount(topic),
    bestPractices: ensureBestPracticeCount(topic),
    faqs: ensureFaqCount(topic),
    keyTakeaways: ensureKeyTakeawayCount(topic),
  };
}
