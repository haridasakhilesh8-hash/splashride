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
  aem: { icon: 'AEM', learningTechnologyId: 'aem' },
  contentful: { icon: '🧱', learningTechnologyId: 'contentful' },
  react: { icon: 'R', learningTechnologyId: 'react' },
  nextjs: { icon: 'N', learningTechnologyId: 'nextjs' },
  'core-java': { icon: 'J', learningTechnologyId: 'java' },
  'spring-boot': { icon: 'SB', learningTechnologyId: 'springboot' },
  aws: { icon: 'AWS', learningTechnologyId: 'aws' },
  docker: { icon: 'D', learningTechnologyId: 'docker' },
  kubernetes: { icon: 'K8s', learningTechnologyId: 'kubernetes' },
  azure: { icon: 'AZ', learningTechnologyId: 'azure' },
  'ai-llm': { icon: 'AI', learningTechnologyId: 'ai-llm' },
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
