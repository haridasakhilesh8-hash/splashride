import type { TopicContent } from '../types';
import { azureTopics } from './azure-content';
import { azureExpandedTopics } from './expanded-topics';

export const azureContentMap: Record<string, TopicContent> = azureTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {
    ...azureExpandedTopics,
  } as Record<string, TopicContent>
);
