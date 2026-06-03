// AWS content barrel
import type { TopicContent } from '../types';
import { awsTopics } from './aws-content';

export const awsContentMap: Record<string, TopicContent> = awsTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, TopicContent>
);
