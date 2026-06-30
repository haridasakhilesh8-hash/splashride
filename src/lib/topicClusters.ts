import { careerRoadmaps } from '../content/careerPaths';
import { getActiveInterviewPrepSections } from '../content/interview-prep';
import { getTopicContent } from '../content';
import { getTechById, getTechForSlug, technologies } from './navigation';
import { getCareerPathPath, getInterviewPrepPath, getTechnologyPath, getTechnologyTopicPath } from './routes';

export interface TopicCluster {
  id: 'enterprise-cms' | 'frontend' | 'backend' | 'cloud-devops' | 'ai';
  name: string;
  description: string;
  technologyIds: string[];
  interviewPrepTechnologyIds: string[];
  careerPathSlugs: string[];
  keyTopicSlugs: string[];
}

export interface InternalLinkItem {
  label: string;
  path: string;
  description?: string;
}

const topicClusters: TopicCluster[] = [
  {
    id: 'enterprise-cms',
    name: 'Enterprise CMS',
    description: 'Enterprise CMS learning across authoring, content modeling, delivery, personalization, and production support.',
    technologyIds: ['aem', 'contentful', 'sitecore'],
    interviewPrepTechnologyIds: ['aem', 'contentful', 'sitecore'],
    careerPathSlugs: ['aem-developer', 'contentful-developer', 'sitecore-developer'],
    keyTopicSlugs: [
      'components',
      'dispatcher',
      'editable-templates',
      'contentful-content-model-design',
      'contentful-rich-text-fields',
      'sitecore-xm-vs-xp-vs-xm-cloud',
      'sitecore-jss',
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Frontend foundations, browser behavior, React architecture, and Next.js rendering strategy.',
    technologyIds: ['html-css', 'javascript', 'react', 'nextjs'],
    interviewPrepTechnologyIds: ['html-css', 'javascript', 'react', 'nextjs'],
    careerPathSlugs: ['frontend-engineer'],
    keyTopicSlugs: [
      'semantic-html-deep-dive',
      'flexbox',
      'css-grid',
      'closures',
      'promises',
      'event-loop',
      'react-components',
      'react-hooks-useeffect',
      'nextjs-introduction',
      'nextjs-app-router',
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Backend engineering through language depth, Spring architecture, data access, and service delivery.',
    technologyIds: ['java', 'python', 'springboot'],
    interviewPrepTechnologyIds: ['core-java', 'python', 'spring-boot'],
    careerPathSlugs: ['backend-engineer', 'python-developer', 'full-stack-java'],
    keyTopicSlugs: [
      'java-oop',
      'java-collections-list',
      'java-streams',
      'what-is-python',
      'functions',
      'rest-apis-with-python',
      'python-performance-basics',
      'spring-framework-basics',
      'spring-boot-introduction',
      'ioc-container',
      'dependency-injection',
    ],
  },
  {
    id: 'cloud-devops',
    name: 'Cloud and DevOps',
    description: 'Cloud platforms, container delivery, orchestration, operations, and reliability-focused engineering.',
    technologyIds: ['aws', 'azure', 'docker', 'kubernetes'],
    interviewPrepTechnologyIds: ['aws', 'azure', 'docker', 'kubernetes'],
    careerPathSlugs: ['cloud-engineer', 'aws-engineer', 'azure-engineer', 'devops-engineer'],
    keyTopicSlugs: [
      'aws-global-infrastructure',
      'aws-iam',
      'azure-basics',
      'azure-active-directory',
      'docker-overview',
      'docker-images',
      'kubernetes-architecture',
      'kubernetes-pods',
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    description: 'AI and LLM engineering through prompting, retrieval, evaluation, agents, and production-safe delivery.',
    technologyIds: ['ai-llm'],
    interviewPrepTechnologyIds: ['ai-llm'],
    careerPathSlugs: ['ai-engineer'],
    keyTopicSlugs: [
      'llm-basics',
      'prompt-engineering',
      'rag-basics',
      'vector-databases',
      'ai-agents',
      'ai-evaluation',
    ],
  },
];

function normalizeTechnologyId(technologyId: string) {
  return getTechById(technologyId)?.id ?? technologyId;
}

function toDisplayTechnologyId(technologyId: string) {
  const section = getActiveInterviewPrepSections().find((item) => item.technologyId === technologyId);
  return section?.technologyId ?? technologyId;
}

export function getTopicClusters() {
  return topicClusters;
}

export function getTopicClusterForTechnology(technologyId: string) {
  const normalizedTechnologyId = normalizeTechnologyId(technologyId);
  return topicClusters.find((cluster) => cluster.technologyIds.includes(normalizedTechnologyId))
    ?? topicClusters.find((cluster) => cluster.interviewPrepTechnologyIds.includes(technologyId))
    ?? null;
}

export function getCareerPathLinksForTechnology(technologyId: string, limit = 3): InternalLinkItem[] {
  const normalizedTechnologyId = normalizeTechnologyId(technologyId);
  const technologyPath = getTechnologyPath(normalizedTechnologyId);

  return careerRoadmaps
    .filter((roadmap) => roadmap.technologies.some((technology) => technology.to === technologyPath))
    .slice(0, limit)
    .map((roadmap) => ({
      label: roadmap.shortTitle,
      path: getCareerPathPath(roadmap.slug),
      description: roadmap.summary,
    }));
}

export function getRelatedTechnologyLinks(technologyId: string, limit = 3): InternalLinkItem[] {
  const normalizedTechnologyId = normalizeTechnologyId(technologyId);
  const cluster = getTopicClusterForTechnology(normalizedTechnologyId);
  if (!cluster) return [];

  return cluster.technologyIds
    .filter((id) => id !== normalizedTechnologyId)
    .map((id) => getTechById(id))
    .filter((technology): technology is NonNullable<typeof technology> => !!technology)
    .slice(0, limit)
    .map((technology) => ({
      label: technology.label,
      path: getTechnologyPath(technology.id),
      description: technology.description,
    }));
}

export function getRelatedInterviewPrepLinks(technologyId: string, limit = 3): InternalLinkItem[] {
  const cluster = getTopicClusterForTechnology(technologyId);
  if (!cluster) return [];

  const normalizedTechnologyId = normalizeTechnologyId(technologyId);
  const sections = getActiveInterviewPrepSections();

  return cluster.interviewPrepTechnologyIds
    .filter((id) => normalizeTechnologyId(id) !== normalizedTechnologyId)
    .map((id) => sections.find((section) => section.technologyId === id))
    .filter((section): section is NonNullable<typeof section> => !!section)
    .slice(0, limit)
    .map((section) => ({
      label: `${section.technologyLabel} Interview Prep`,
      path: getInterviewPrepPath(section.technologyId),
      description: section.description,
    }));
}

export function getKeyTopicLinksForTechnology(
  technologyId: string,
  limit = 4,
  preferredSlugs: string[] = [],
): InternalLinkItem[] {
  const normalizedTechnologyId = normalizeTechnologyId(technologyId);
  const technology = getTechById(normalizedTechnologyId);
  if (!technology) return [];

  const cluster = getTopicClusterForTechnology(normalizedTechnologyId);
  const seen = new Set<string>();
  const candidates = [
    ...preferredSlugs,
    ...(cluster?.keyTopicSlugs ?? []),
    ...technology.categories.flatMap((category) => category.items.filter((item) => !item.badge).map((item) => item.slug)),
  ];

  const results: InternalLinkItem[] = [];

  for (const slug of candidates) {
    if (seen.has(slug)) continue;
    seen.add(slug);

    const topic = getTopicContent(slug);
    const owner = getTechForSlug(slug);
    if (!topic || !owner || owner.id !== technology.id) continue;

    results.push({
      label: topic.title,
      path: getTechnologyTopicPath(technology.id, topic.slug),
      description: topic.description,
    });

    if (results.length >= limit) break;
  }

  return results;
}

export function getRelatedCareerPathLinks(careerSlug: string, limit = 3): InternalLinkItem[] {
  const currentRoadmap = careerRoadmaps.find((roadmap) => roadmap.slug === careerSlug);
  if (!currentRoadmap) return [];

  const currentTechnologyPaths = new Set(currentRoadmap.technologies.map((technology) => technology.to));

  return careerRoadmaps
    .filter((roadmap) => roadmap.slug !== careerSlug)
    .filter((roadmap) => roadmap.technologies.some((technology) => currentTechnologyPaths.has(technology.to)))
    .slice(0, limit)
    .map((roadmap) => ({
      label: roadmap.shortTitle,
      path: getCareerPathPath(roadmap.slug),
      description: roadmap.summary,
    }));
}

export function getInterviewPrepPrimaryLinkForTechnology(technologyId: string): InternalLinkItem | null {
  const displayTechnologyId = toDisplayTechnologyId(technologyId);
  const section = getActiveInterviewPrepSections().find((item) => item.technologyId === displayTechnologyId);
  if (!section) return null;

  return {
    label: `${section.technologyLabel} Interview Prep`,
    path: getInterviewPrepPath(section.technologyId),
    description: section.description,
  };
}

export function getLlmsBestPageLinks() {
  const preferredSlugs = [
    'components',
    'dispatcher',
    'editable-templates',
    'contentful-content-model-design',
    'contentful-rich-text-fields',
    'sitecore-xm-vs-xp-vs-xm-cloud',
    'react-components',
    'react-hooks-useeffect',
    'closures',
    'promises',
    'event-loop',
    'semantic-html-deep-dive',
    'flexbox',
    'css-grid',
    'spring-framework-basics',
    'spring-auto-configuration',
  ];

  return preferredSlugs
    .map((slug) => {
      const topic = getTopicContent(slug);
      const technology = getTechForSlug(slug);
      if (!topic || !technology) return null;

      return {
        label: topic.title,
        path: getTechnologyTopicPath(technology.id, slug),
      };
    })
    .filter((item): item is { label: string; path: string } => !!item);
}

export function getActiveTechnologyLinks() {
  return technologies
    .filter((technology) => technology.active)
    .map((technology) => ({
      label: technology.label,
      path: getTechnologyPath(technology.id),
    }));
}
