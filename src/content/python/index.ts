import { pythonTopics } from './python-content';

export const pythonContentMap = Object.fromEntries(
  pythonTopics.map((topic) => [topic.slug, topic]),
);
