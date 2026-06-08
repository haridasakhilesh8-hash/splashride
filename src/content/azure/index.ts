import type { TopicContent } from '../types';
import { azureTopics } from './azure-content';

export const azureContentMap: Record<string, TopicContent> = azureTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, TopicContent>
);
