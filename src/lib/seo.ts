export const SITE_URL = 'https://www.splashride.in';
export const SITE_NAME = 'SplashRide';
export const DEFAULT_TITLE = 'SplashRide | Developer Learning Paths, Tutorials and Interview Prep';
export const DEFAULT_DESCRIPTION =
  'Learn AEM, React, Next.js, Core Java, Spring Boot, AWS, Azure, Docker, Kubernetes, and AI or LLM Engineering with project-focused tutorials, examples, and interview-ready explanations.';
export const DEFAULT_IMAGE = '/splashride-logo.png';
export const metadataBase = new URL(SITE_URL);

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
