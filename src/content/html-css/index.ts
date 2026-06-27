import type { TopicContent } from '../types';
import { htmlCssTopics } from './html-css-content';

export const htmlCssContentMap: Record<string, TopicContent> = htmlCssTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, TopicContent>,
);
