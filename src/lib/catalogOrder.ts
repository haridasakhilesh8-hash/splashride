export interface TechnologyCategoryGroup {
  label: 'Enterprise CMS' | 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'AI';
  technologyIds: string[];
  interviewPrepTechnologyIds: string[];
}

export const technologyCategoryGroups: TechnologyCategoryGroup[] = [
  {
    label: 'Enterprise CMS',
    technologyIds: ['aem', 'contentful', 'sitecore'],
    interviewPrepTechnologyIds: ['aem', 'contentful', 'sitecore'],
  },
  {
    label: 'Frontend',
    technologyIds: ['html-css', 'javascript', 'react', 'nextjs'],
    interviewPrepTechnologyIds: ['html-css', 'javascript', 'react', 'nextjs'],
  },
  {
    label: 'Backend',
    technologyIds: ['java', 'springboot'],
    interviewPrepTechnologyIds: ['core-java', 'spring-boot'],
  },
  {
    label: 'Cloud & DevOps',
    technologyIds: ['aws', 'azure', 'docker', 'kubernetes'],
    interviewPrepTechnologyIds: ['aws', 'azure', 'docker', 'kubernetes'],
  },
  {
    label: 'AI',
    technologyIds: ['ai-llm'],
    interviewPrepTechnologyIds: ['ai-llm'],
  },
];

const technologyOrder = technologyCategoryGroups.flatMap((group) => group.technologyIds);
const interviewPrepOrder = technologyCategoryGroups.flatMap((group) => group.interviewPrepTechnologyIds);

export function sortByTechnologyOrder<T extends { id: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => technologyOrder.indexOf(a.id) - technologyOrder.indexOf(b.id));
}

export function sortByInterviewPrepTechnologyOrder<T extends { technologyId: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => interviewPrepOrder.indexOf(a.technologyId) - interviewPrepOrder.indexOf(b.technologyId));
}
