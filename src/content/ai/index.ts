import type { TopicContent } from '../types';
import { aiTopics } from './ai-content';
import { aiExpandedTopics } from './expanded-topics';

export const aiContentMap: Record<string, TopicContent> = aiTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {
    ...aiExpandedTopics,
  } as Record<string, TopicContent>
);
