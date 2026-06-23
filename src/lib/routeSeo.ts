import { careerRoadmaps } from '../content/careerPaths';
import { getTopicContent } from '../content';
import { getActiveInterviewPrepSections } from '../content/interview-prep';
import { getCategoryForSlug, getTechById, getTechForSlug, technologies } from './navigation';
import {
  getCareerPathPath,
  getInterviewPrepPath,
  getTechnologyPath,
  getTechnologyTopicPath,
} from './routes';
import { absoluteUrl, DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME } from './seo';

type SeoType = 'website' | 'article';

export interface RouteSeoResolved {
  canonicalPath: string;
  description: string;
  structuredData?: Record<string, unknown>[];
  title: string;
  type: SeoType;
}

const TECHNOLOGY_SEO_COPY: Record<string, { titleFocus: string }> = {
  aem: { titleFocus: 'Components, Sling, Dispatcher and Interview Prep' },
  contentful: { titleFocus: 'Headless CMS, APIs, Rich Text and Production Patterns' },
  sitecore: { titleFocus: 'XM Cloud, JSS, Content Architecture and Interview Prep' },
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

function humanizeSlug(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getTechnologySeo(techId: string) {
  const tech = getTechById(techId);
  if (!tech) return null;

  const seoCopy = TECHNOLOGY_SEO_COPY[tech.id] ?? {
    titleFocus: `${tech.label} Concepts, Production Issues and Interview Prep`,
  };

  return {
    canonicalPath: getTechnologyPath(tech.id),
    description: `Learn ${tech.label} with practical tutorials, real project usage, production issues, best practices, and interview-ready explanations.`,
    tech,
    title: `${tech.label} Tutorial | ${seoCopy.titleFocus}`,
  };
}

function getTopicSeo(techId: string | undefined, slug: string) {
  const topic = getTopicContent(slug);
  const tech = (techId ? getTechById(techId) : null) ?? getTechForSlug(slug);
  if (!topic || !tech) return null;

  const category = getCategoryForSlug(slug);
  const canonicalPath = getTechnologyTopicPath(tech.id, slug);

  return {
    canonicalPath,
    description: `Learn ${topic.title} in ${tech.label} with quick understanding, real project usage, common mistakes, production issues, best practices, and interview questions.`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Technologies', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 3, name: tech.label, item: absoluteUrl(getTechnologyPath(tech.id)) },
          ...(category
            ? [{ '@type': 'ListItem', position: 4, name: category.title, item: absoluteUrl(canonicalPath) }]
            : []),
          {
            '@type': 'ListItem',
            position: category ? 5 : 4,
            name: topic.title,
            item: absoluteUrl(canonicalPath),
          },
        ],
      },
    ],
    title: `${topic.title} | ${tech.label} Tutorial - SplashRide`,
    type: 'article' as const,
  };
}

function getInterviewPrepSeo(rawTechId: string) {
  const section = getActiveInterviewPrepSections().find((item) => item.technologyId === rawTechId);
  if (!section) return null;

  return {
    canonicalPath: getInterviewPrepPath(section.technologyId),
    description: `Practice ${section.technologyLabel} interview questions with short answers, detailed explanations, production scenarios, common mistakes, follow-up questions, and architect-level guidance.`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Interview Prep', item: absoluteUrl('/interview-prep') },
          { '@type': 'ListItem', position: 3, name: section.technologyLabel, item: absoluteUrl(getInterviewPrepPath(section.technologyId)) },
        ],
      },
    ],
    title: `${section.technologyLabel} Interview Questions | Real-World Scenarios and Answers - SplashRide`,
  };
}

function getCareerPathSeo(slug: string) {
  const roadmap = careerRoadmaps.find((item) => item.slug === slug);
  if (!roadmap) return null;

  return {
    canonicalPath: getCareerPathPath(roadmap.slug),
    description: `Follow the ${roadmap.shortTitle} career path with required skills, learning roadmap, projects, interview preparation, and growth direction.`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${roadmap.shortTitle} Career Path`,
        description: `Follow the ${roadmap.shortTitle} career path with required skills, learning roadmap, projects, interview preparation, and growth direction.`,
        mainEntityOfPage: absoluteUrl(getCareerPathPath(roadmap.slug)),
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: absoluteUrl('/splashride-logo.png') },
        },
      },
    ],
    title: `${roadmap.shortTitle} Career Path | Skills, Roadmap, Projects and Interview Prep - SplashRide`,
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
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: absoluteUrl('/'),
          logo: absoluteUrl('/splashride-logo.png'),
        },
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
