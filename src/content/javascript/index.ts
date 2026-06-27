import type { TopicContent } from '../types';
import { javascriptTopics } from './javascript-content';

export const javascriptContentMap: Record<string, TopicContent> = javascriptTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, TopicContent>,
);
