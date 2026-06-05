export interface InterviewPrepNavTopic {
  slug: string;
  title: string;
  category: string;
}

export interface InterviewPrepNavGroup {
  id: string;
  title: string;
  topics: InterviewPrepNavTopic[];
}

export const aemInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'architecture', title: 'Architecture', category: 'AEM Architecture' },
      { slug: 'jcr', title: 'JCR', category: 'JCR' },
      { slug: 'crxde', title: 'CRXDE', category: 'CRXDE' },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    topics: [
      { slug: 'components', title: 'Components', category: 'Components' },
      { slug: 'htl', title: 'HTL', category: 'HTL' },
      { slug: 'sling', title: 'Sling', category: 'Sling' },
      { slug: 'sling-models', title: 'Sling Models', category: 'Sling Models' },
      { slug: 'osgi', title: 'OSGi', category: 'OSGi' },
    ],
  },
  {
    id: 'content-management',
    title: 'Content Management',
    topics: [
      { slug: 'templates', title: 'Templates', category: 'Templates' },
      { slug: 'content-fragments', title: 'Content Fragments', category: 'Content Fragments' },
      { slug: 'experience-fragments', title: 'Experience Fragments', category: 'Experience Fragments' },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    topics: [
      { slug: 'dispatcher', title: 'Dispatcher', category: 'Dispatcher' },
      { slug: 'security', title: 'Security', category: 'Security' },
      { slug: 'performance', title: 'Performance', category: 'Performance Tuning' },
    ],
  },
  {
    id: 'cloud-service',
    title: 'Cloud Service',
    topics: [
      { slug: 'cloud-manager', title: 'Cloud Manager', category: 'Cloud Manager' },
      { slug: 'aem-cloud-service', title: 'AEM Cloud Service', category: 'AEM Cloud Service' },
      { slug: 'graphql', title: 'GraphQL', category: 'GraphQL' },
    ],
  },
];

export const aemInterviewPrepTopicCategoryMap = aemInterviewPrepTopicGroups.reduce<Record<string, string>>((acc, group) => {
  for (const topic of group.topics) acc[topic.slug] = topic.category;
  return acc;
}, {});

export function getAemInterviewPrepCategoryForSlug(slug: string): string {
  return aemInterviewPrepTopicCategoryMap[slug] ?? 'AEM Architecture';
}

export function getAemInterviewPrepTopicTitle(slug: string): string {
  return aemInterviewPrepTopicGroups
    .flatMap((group) => group.topics)
    .find((topic) => topic.slug === slug)?.title ?? 'Architecture';
}

export function getAemInterviewPrepGroupTitle(slug: string): string {
  return aemInterviewPrepTopicGroups.find((group) => group.topics.some((topic) => topic.slug === slug))?.title ?? 'Fundamentals';
}
