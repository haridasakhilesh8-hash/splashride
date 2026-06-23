import { getInterviewPrepSection } from '.';
import { getInterviewPrepTopicGroups } from './topicNavigation';

export interface InterviewPrepSidebarTopicConfig {
  slug: string;
  title: string;
  category: string;
  questionCount: number;
}

export interface InterviewPrepSidebarCategoryConfig {
  id: string;
  title: string;
  topics: InterviewPrepSidebarTopicConfig[];
}

export interface InterviewPrepTechnologyConfig {
  technologyId: string;
  displayName: string;
  icon: string;
  categories: InterviewPrepSidebarCategoryConfig[];
  topics: InterviewPrepSidebarTopicConfig[];
  questionCounts: Record<string, number>;
  totalQuestions: number;
  learningTechnologyId?: string;
}

const technologyPresentation: Record<string, { icon: string; learningTechnologyId?: string }> = {
  aem: { icon: '🏗️', learningTechnologyId: 'aem' },
  sitecore: { icon: '🧩', learningTechnologyId: 'sitecore' },
  contentful: { icon: '🧱', learningTechnologyId: 'contentful' },
  react: { icon: '⚛️', learningTechnologyId: 'react' },
  nextjs: { icon: '▲', learningTechnologyId: 'nextjs' },
  'core-java': { icon: '☕', learningTechnologyId: 'java' },
  'spring-boot': { icon: '🌱', learningTechnologyId: 'springboot' },
  aws: { icon: '☁️', learningTechnologyId: 'aws' },
  docker: { icon: '🐳', learningTechnologyId: 'docker' },
  kubernetes: { icon: '☸️', learningTechnologyId: 'kubernetes' },
  azure: { icon: '🔷', learningTechnologyId: 'azure' },
  'ai-llm': { icon: '🧠', learningTechnologyId: 'ai-llm' },
};

export function getInterviewPrepTechnologyConfig(technologyId: string): InterviewPrepTechnologyConfig | null {
  const section = getInterviewPrepSection(technologyId);
  if (!section) return null;

  const topicGroups = getInterviewPrepTopicGroups(technologyId);
  const questionCounts = topicGroups.reduce<Record<string, number>>((counts, group) => {
    for (const topic of group.topics) {
      counts[topic.slug] = section.questions.filter((question) => question.category === topic.category).length;
    }
    return counts;
  }, {});

  const categories = topicGroups.map((group) => ({
    id: `interview-${technologyId}-${group.id}`,
    title: group.title,
    topics: group.topics.map((topic) => ({
      slug: topic.slug,
      title: topic.title,
      category: topic.category,
      questionCount: questionCounts[topic.slug] ?? 0,
    })),
  }));

  const presentation = technologyPresentation[technologyId];

  return {
    technologyId,
    displayName: section.technologyLabel,
    icon: presentation?.icon ?? section.technologyLabel.slice(0, 2).toUpperCase(),
    categories,
    topics: categories.flatMap((category) => category.topics),
    questionCounts,
    totalQuestions: section.questions.length,
    learningTechnologyId: presentation?.learningTechnologyId,
  };
}
