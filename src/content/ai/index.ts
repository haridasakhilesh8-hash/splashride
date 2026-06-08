import type { TopicContent } from '../types';
import { aiTopics } from './ai-content';

export const aiContentMap: Record<string, TopicContent> = aiTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, TopicContent>
);
