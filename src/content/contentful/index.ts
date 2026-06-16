import type { TopicContent } from '../types';
import { contentfulTopics } from './contentful-content';

export const contentfulContentMap: Record<string, TopicContent> = contentfulTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, TopicContent>
);
