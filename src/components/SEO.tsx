import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, DEFAULT_TITLE, SITE_NAME } from '../lib/seo';
import { mergeStructuredData, resolveRouteSeo } from '../lib/routeSeo';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  image?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  type = 'website',
  image = DEFAULT_IMAGE,
  structuredData,
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    const routeSeo = resolveRouteSeo(location.pathname, location.search);
    const resolvedTitle = routeSeo.title || title;
    const resolvedDescription = routeSeo.description || description;
    const resolvedType = routeSeo.type || type;
    const canonical = absoluteUrl(routeSeo.canonicalPath);
    const imageUrl = absoluteUrl(image);
    const mergedStructuredData = mergeStructuredData(structuredData, routeSeo.structuredData);

    document.title = resolvedTitle;
    setMeta('meta[name="description"]', 'name', 'description', resolvedDescription);
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMeta('meta[property="og:title"]', 'property', 'og:title', resolvedTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', resolvedDescription);
    setMeta('meta[property="og:type"]', 'property', 'og:type', resolvedType);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta(
      'meta[name="twitter:card"]',
      'name',
      'twitter:card',
      resolvedType === 'article' ? 'summary' : 'summary_large_image',
    );
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', resolvedTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', resolvedDescription);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
    setLink('canonical', canonical);

    document.querySelectorAll('script[data-splashride-seo="true"]').forEach((node) => node.remove());
    if (mergedStructuredData.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.splashrideSeo = 'true';
      script.textContent = JSON.stringify(mergedStructuredData);
      document.head.appendChild(script);
    }
  }, [description, image, location.pathname, location.search, structuredData, title, type]);

  return null;
}
