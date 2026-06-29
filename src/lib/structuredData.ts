import type { FAQ } from '../content/types';
import { absoluteUrl, SITE_NAME } from './seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface ItemListEntry {
  name: string;
  path: string;
}

const WEBSITE_ID = absoluteUrl('/#website');
const ORGANIZATION_ID = absoluteUrl('/#organization');

function toWebPageId(path: string) {
  return `${absoluteUrl(path)}#webpage`;
}

function buildPublisher() {
  return {
    '@id': ORGANIZATION_ID,
  };
}

export function buildWebsiteSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description,
    publisher: buildPublisher(),
  };
}

export function buildOrganizationSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/splashride-logo.png'),
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildCollectionPageSchema({
  path,
  name,
  description,
  about,
}: {
  path: string;
  name: string;
  description: string;
  about?: string | string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': toWebPageId(path),
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    about,
  };
}

export function buildArticleSchema({
  path,
  headline,
  description,
  type = 'Article',
  about,
  dateModified,
}: {
  path: string;
  headline: string;
  description: string;
  type?: 'Article' | 'TechArticle' | 'AboutPage' | 'ContactPage' | 'WebPage';
  about?: Array<string | { '@type': 'Thing'; name: string }>;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': toWebPageId(path),
    headline,
    description,
    mainEntityOfPage: absoluteUrl(path),
    dateModified,
    about,
    author: buildPublisher(),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/splashride-logo.png'),
      },
    },
    isPartOf: {
      '@id': WEBSITE_ID,
    },
  };
}

export function buildItemListSchema({
  name,
  items,
}: {
  name: string;
  items: ItemListEntry[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function buildFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildWebPageSchema({
  path,
  name,
  description,
  type = 'WebPage',
}: {
  path: string;
  name: string;
  description: string;
  type?: 'AboutPage' | 'ContactPage' | 'WebPage';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': toWebPageId(path),
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@id': WEBSITE_ID,
    },
  };
}
