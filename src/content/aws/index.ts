// AWS content barrel
import type { TopicContent } from '../types';
import { awsTopics } from './aws-content';
import { awsExpandedTopics } from './expanded-topics';

export const awsContentMap: Record<string, TopicContent> = awsTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {
    ...awsExpandedTopics,
  } as Record<string, TopicContent>
);
