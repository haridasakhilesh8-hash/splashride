import { careerRoadmaps } from '../content/careerPaths';
import { getTopicContent } from '../content';
import { getActiveInterviewPrepSections } from '../content/interview-prep';
import { getTechById, getTechForSlug } from './navigation';
import {
  getCareerPathPath,
  getInterviewPrepPath,
  getTechnologyPath,
  getTechnologyTopicPath,
} from './routes';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from './seo';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFAQSchema,
  buildItemListSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from './structuredData';

type SeoType = 'website' | 'article';

export interface RouteSeoResolved {
  canonicalPath: string;
  description: string;
  structuredData?: Record<string, unknown>[];
  title: string;
  type: SeoType;
}

const TECHNOLOGY_SEO_COPY: Record<string, { titleFocus?: string; title?: string; description?: string }> = {
  aem: { titleFocus: 'Components, Sling, Dispatcher and Interview Prep' },
  contentful: { titleFocus: 'Headless CMS, APIs, Rich Text and Production Patterns' },
  sitecore: { titleFocus: 'XM Cloud, JSS, Content Architecture and Interview Prep' },
  'html-css': {
    title: 'HTML & CSS Tutorial | Layouts, Responsive Design and Interview Prep - SplashRide',
    description: 'Learn HTML and CSS with semantic HTML, forms, accessibility, selectors, box model, flexbox, grid, responsive design, production issues, and interview questions.',
  },
  javascript: {
    title: 'JavaScript Tutorial | DOM, Async, ES6 and Interview Prep - SplashRide',
    description: 'Learn JavaScript with variables, functions, arrays, objects, DOM, events, promises, async/await, fetch API, ES6 concepts, production issues, and interview questions.',
  },
  python: {
    title: 'Python Tutorial | Backend, Automation, APIs and Interview Prep - SplashRide',
    description: 'Learn Python with practical tutorials covering fundamentals, data structures, OOP, APIs, automation, testing, production issues, interview preparation, and career path guidance.',
  },
  react: { titleFocus: 'Hooks, Components, Routing and Interview Prep' },
  nextjs: { titleFocus: 'App Router, Rendering, SSR and Interview Prep' },
  java: { titleFocus: 'OOP, Collections, JVM and Interview Prep' },
  springboot: { titleFocus: 'REST APIs, Microservices and Interview Prep' },
  aws: { titleFocus: 'Cloud Services, Architecture and Interview Prep' },
  azure: { titleFocus: 'Cloud Services, DevOps and Interview Prep' },
  docker: { titleFocus: 'Containers, Images, Networking and Interview Prep' },
  kubernetes: { titleFocus: 'Pods, Services, Deployments and Interview Prep' },
  'ai-llm': { titleFocus: 'RAG, Prompting, Agents and Interview Prep' },
};

const INTERVIEW_PREP_SEO_COPY: Record<string, { title?: string; description?: string }> = {
  python: {
    title: 'Python Interview Questions | Real-World Scenarios and Answers - SplashRide',
    description: 'Practice Python interview questions with short answers, detailed explanations, real project scenarios, production issues, common mistakes, and interview tips.',
  },
};

function dedupeStructuredDataByType(nodes: Record<string, unknown>[]) {
  const seen = new Set<string>();
  const deduped: Record<string, unknown>[] = [];

  for (const node of nodes) {
    const type = typeof node?.['@type'] === 'string' ? String(node['@type']) : '';
    const key = `${type}:${JSON.stringify(node)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(node);
  }

  return deduped;
}

function getTechnologySeo(techId: string) {
  const tech = getTechById(techId);
  if (!tech) return null;

  const seoCopy = TECHNOLOGY_SEO_COPY[tech.id] ?? {
    titleFocus: `${tech.label} Concepts, Production Issues and Interview Prep`,
  };
  const canonicalPath = getTechnologyPath(tech.id);
  const description = seoCopy.description ?? `Learn ${tech.label} with practical tutorials, real project usage, production issues, best practices, and interview-ready explanations.`;
  const liveTopics = tech.categories
    .flatMap((category) => category.items)
    .filter((item) => !item.badge)
    .slice(0, 60);
  const structuredData: Record<string, unknown>[] = [
    buildCollectionPageSchema({
      path: canonicalPath,
      name: seoCopy.title ?? `${tech.label} Tutorial | ${seoCopy.titleFocus}`,
      description,
      about: tech.label,
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Technologies', path: '/technologies' },
      { name: tech.label, path: canonicalPath },
    ]),
  ];

  if (liveTopics.length > 0) {
    structuredData.push(buildItemListSchema({
      name: `${tech.label} topics`,
      items: liveTopics.map((topic) => ({
        name: topic.title,
        path: getTechnologyTopicPath(tech.id, topic.slug),
      })),
    }));
  }

  return {
    canonicalPath,
    description,
    structuredData,
    tech,
    title: seoCopy.title ?? `${tech.label} Tutorial | ${seoCopy.titleFocus}`,
  };
}

function getTopicSeo(techId: string | undefined, slug: string) {
  const topic = getTopicContent(slug);
  const tech = (techId ? getTechById(techId) : null) ?? getTechForSlug(slug);
  if (!topic || !tech) return null;

  const canonicalPath = getTechnologyTopicPath(tech.id, slug);
  const description = `Learn ${topic.title} in ${tech.label} with quick understanding, real project usage, common mistakes, production issues, best practices, interview questions, FAQs, and related topics.`;
  const structuredData: Record<string, unknown>[] = [
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Technologies', path: '/technologies' },
      { name: tech.label, path: getTechnologyPath(tech.id) },
      { name: topic.title, path: canonicalPath },
    ]),
    buildArticleSchema({
      path: canonicalPath,
      headline: `${topic.title} | ${tech.label} Tutorial - SplashRide`,
      description,
      type: 'TechArticle',
      about: [
        { '@type': 'Thing', name: topic.title },
        { '@type': 'Thing', name: tech.label },
      ],
      dateModified: topic.lastReviewed,
    }),
  ];

  if (topic.faqs.length > 0) {
    structuredData.push(buildFAQSchema(topic.faqs));
  }

  return {
    canonicalPath,
    description,
    structuredData,
    title: `${topic.title} | ${tech.label} Tutorial - SplashRide`,
    type: 'article' as const,
  };
}

function getInterviewPrepSeo(rawTechId: string) {
  const section = getActiveInterviewPrepSections().find((item) => item.technologyId === rawTechId);
  if (!section) return null;

  const canonicalPath = getInterviewPrepPath(section.technologyId);
  const seoCopy = INTERVIEW_PREP_SEO_COPY[section.technologyId];
  const description = seoCopy?.description ?? `Practice ${section.technologyLabel} interview questions with short answers, detailed explanations, production scenarios, common mistakes, follow-up questions, and architect-level guidance.`;
  const questionFaqs = section.questions.slice(0, 20).map((question) => ({
    question: question.question,
    answer: question.shortAnswer,
  }));

  return {
    canonicalPath,
    description,
    structuredData: [
      buildCollectionPageSchema({
        path: canonicalPath,
        name: seoCopy?.title ?? `${section.technologyLabel} Interview Questions | Real-World Scenarios and Answers - SplashRide`,
        description,
        about: `${section.technologyLabel} interview preparation`,
      }),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Interview Prep', path: '/interview-prep' },
        { name: section.technologyLabel, path: canonicalPath },
      ]),
      buildItemListSchema({
        name: `${section.technologyLabel} interview questions`,
        items: section.questions.slice(0, 30).map((question) => ({
          name: question.question,
          path: canonicalPath,
        })),
      }),
      buildFAQSchema(questionFaqs),
    ],
    title: seoCopy?.title ?? `${section.technologyLabel} Interview Questions | Real-World Scenarios and Answers - SplashRide`,
  };
}

function getCareerPathSeo(slug: string) {
  const roadmap = careerRoadmaps.find((item) => item.slug === slug);
  if (!roadmap) return null;
  const canonicalPath = getCareerPathPath(roadmap.slug);
  const description = roadmap.seoDescription || `Follow the ${roadmap.shortTitle} career path with required skills, learning roadmap, projects, interview preparation, and growth direction.`;

  return {
    canonicalPath,
    description,
    structuredData: [
      buildArticleSchema({
        path: canonicalPath,
        headline: `${roadmap.shortTitle} Career Path`,
        description,
      }),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Career Paths', path: '/career-paths' },
        { name: roadmap.shortTitle, path: canonicalPath },
      ]),
      buildItemListSchema({
        name: `${roadmap.shortTitle} roadmap phases`,
        items: roadmap.phases.map((phase) => ({
          name: phase.title,
          path: canonicalPath,
        })),
      }),
    ],
    title: roadmap.seoTitle || `${roadmap.shortTitle} Career Path | Skills, Roadmap, Projects and Interview Prep - SplashRide`,
  };
}

export function mergeStructuredData(
  existing: Record<string, unknown> | Record<string, unknown>[] | undefined,
  routeStructuredData: Record<string, unknown>[] | undefined,
) {
  const normalizedExisting = existing ? (Array.isArray(existing) ? existing : [existing]) : [];
  if (!routeStructuredData?.length) return normalizedExisting;

  const routeTypes = new Set(
    routeStructuredData
      .map((item) => (typeof item?.['@type'] === 'string' ? String(item['@type']) : ''))
      .filter(Boolean),
  );

  const preserved = normalizedExisting.filter((item) => {
    const type = typeof item?.['@type'] === 'string' ? String(item['@type']) : '';
    return !routeTypes.has(type);
  });

  return dedupeStructuredDataByType([...preserved, ...routeStructuredData]);
}

export function resolveRouteSeo(pathname: string, search = ''): RouteSeoResolved {
  const searchParams = new URLSearchParams(search);

  if (pathname === '/') {
    return {
      canonicalPath: '/',
      description: 'SplashRide helps developers learn technologies, prepare for interviews, understand production issues, build projects, and grow through clear career paths.',
      structuredData: [
        buildWebsiteSchema(DEFAULT_DESCRIPTION),
        buildOrganizationSchema(DEFAULT_DESCRIPTION),
      ],
      title: DEFAULT_TITLE,
      type: 'website',
    };
  }

  if (pathname === '/about') {
    return {
      canonicalPath: pathname,
      description: 'Learn why SplashRide was built, how the platform helps developers, and the practical career-focused philosophy behind the tutorials and interview preparation.',
      title: 'About SplashRide | Developer Learning Philosophy and Platform Story',
      type: 'website',
    };
  }

  if (pathname === '/contact') {
    return {
      canonicalPath: pathname,
      description: 'Contact SplashRide for questions, suggestions, feedback, and collaboration related to developer learning paths, tutorials, and interview preparation.',
      title: 'Contact SplashRide | Questions, Feedback and Collaboration',
      type: 'website',
    };
  }

  if (pathname === '/privacy-policy') {
    return {
      canonicalPath: pathname,
      description: 'Read the SplashRide privacy policy covering data handling, cookies, analytics, and how personal information is managed on the platform.',
      title: 'Privacy Policy | SplashRide',
      type: 'website',
    };
  }

  if (pathname === '/terms') {
    return {
      canonicalPath: pathname,
      description: 'Read the SplashRide terms covering platform usage, content access, limitations, and general conditions for using the site.',
      title: 'Terms and Conditions | SplashRide',
      type: 'website',
    };
  }

  if (pathname === '/interview-prep') {
    return {
      canonicalPath: pathname,
      description: 'Practice developer interview questions with real-world scenarios, short answers, detailed explanations, production trade-offs, and architecture-focused guidance.',
      title: 'Interview Prep | SplashRide',
      type: 'website',
    };
  }

  if (pathname === '/career-paths') {
    return {
      canonicalPath: pathname,
      description: 'Explore developer career paths with required skills, roadmaps, projects, interview preparation, and practical growth direction across modern technology stacks.',
      title: 'Career Paths | SplashRide',
      type: 'website',
    };
  }

  if (pathname === '/technologies') {
    return {
      canonicalPath: pathname,
      description: 'Browse developer technologies on SplashRide and learn through practical tutorials, production issues, best practices, and interview preparation.',
      title: 'Technologies | SplashRide',
      type: 'website',
    };
  }

  const legacyRoadmapMatch = pathname.match(/^\/roadmaps\/([^/]+)$/);
  if (legacyRoadmapMatch) {
    const seo = getCareerPathSeo(legacyRoadmapMatch[1]);
    if (seo) return { ...seo, type: 'website' };
  }

  const careerMatch = pathname.match(/^\/career-paths\/([^/]+)$/);
  if (careerMatch) {
    const seo = getCareerPathSeo(careerMatch[1]);
    if (seo) return { ...seo, type: 'website' };
  }

  const interviewMatch = pathname.match(/^\/interview-prep\/([^/]+)$/);
  if (interviewMatch) {
    const seo = getInterviewPrepSeo(interviewMatch[1]);
    if (seo) return { ...seo, type: 'website' };
  }

  const topicMatch = pathname.match(/^\/technologies\/([^/]+)\/topic\/([^/]+)$/);
  if (topicMatch) {
    const seo = getTopicSeo(topicMatch[1], topicMatch[2]);
    if (seo) return seo;
  }

  const legacyTopicMatch = pathname.match(/^\/technology\/([^/]+)\/topic\/([^/]+)$/);
  if (legacyTopicMatch) {
    const seo = getTopicSeo(legacyTopicMatch[1], legacyTopicMatch[2]);
    if (seo) return seo;
  }

  const orphanTopicMatch = pathname.match(/^\/topic\/([^/]+)$/);
  if (orphanTopicMatch) {
    const seo = getTopicSeo(undefined, orphanTopicMatch[1]);
    if (seo) return seo;
  }

  const technologyMatch = pathname.match(/^\/technologies\/([^/]+)$/);
  if (technologyMatch) {
    const seo = getTechnologySeo(technologyMatch[1]);
    if (seo) return { ...seo, type: 'website' };
  }

  const legacyTechnologyMatch = pathname.match(/^\/technology\/([^/]+)$/);
  if (legacyTechnologyMatch) {
    const seo = getTechnologySeo(legacyTechnologyMatch[1]);
    if (seo) return { ...seo, type: 'website' };
  }

  return {
    canonicalPath: pathname,
    description: DEFAULT_DESCRIPTION,
    title: DEFAULT_TITLE,
    type: searchParams.get('topic') ? 'article' : 'website',
  };
}
