import type { TopicContent } from '../types';
import { sitecoreTopics } from './sitecore-content';

export const sitecoreContentMap: Record<string, TopicContent> = sitecoreTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, TopicContent>
);
