// ─────────────────────────────────────────────────────────────────────────────
// SplashRide — Master content registry
//
// HOW TO ADD A NEW TECHNOLOGY:
//   1. Create src/content/<tech>/<topic>.ts  (the actual content)
//   2. Register it in src/content/<tech>/index.ts  (the barrel)
//   3. Uncomment the import + spread below
//   4. Mark the technology active: true in src/lib/navigation.ts
// ─────────────────────────────────────────────────────────────────────────────
import type { TopicContent } from './types';
import { normalizeTopicContent } from './topicStandards';

// ── Active technologies ───────────────────────────────────────────────────────
import { aemContentMap }    from './aem/index';
import { contentfulContentMap } from './contentful/index';
import { sitecoreContentMap } from './sitecore/index';
import { htmlCssContentMap } from './html-css/index';
import { javascriptContentMap } from './javascript/index';

// ── Active technologies ───────────────────────────────────────────────────────
import { reactContentMap }   from './react/index';
import { nextjsContentMap } from './nextjs/index';
import { javaContentMap }   from './java/index';
import { springContentMap } from './springboot/index';
import { awsContentMap }    from './aws/index';
import { dockerContentMap } from './docker/index';
import { k8sContentMap }    from './kubernetes/index';
import { azureContentMap }  from './azure/index';
import { aiContentMap }     from './ai/index';

const rawContentMap: Record<string, TopicContent> = {
  ...aemContentMap,
  ...contentfulContentMap,
  ...sitecoreContentMap,
  ...htmlCssContentMap,
  ...javascriptContentMap,
  ...reactContentMap,
  ...nextjsContentMap,
  ...javaContentMap,
  ...springContentMap,
  ...awsContentMap,
  ...dockerContentMap,
  ...k8sContentMap,
  ...azureContentMap,
  ...aiContentMap,
};

const contentMap: Record<string, TopicContent> = Object.fromEntries(
  Object.entries(rawContentMap).map(([slug, topic]) => [slug, normalizeTopicContent(topic)]),
) as Record<string, TopicContent>;

export function getTopicContent(slug: string): TopicContent | null {
  return contentMap[slug] ?? null;
}

export function getAllTopics(): TopicContent[] {
  return Object.values(contentMap);
}

export type { TopicContent };
