export const SITE_URL = 'https://www.splashride.in';
export const SITE_NAME = 'SplashRide';
export const DEFAULT_TITLE = 'SplashRide | Developer Learning Paths, Tutorials and Interview Prep';
export const DEFAULT_DESCRIPTION =
  'SplashRide helps developers learn technologies, prepare for interviews, understand production issues, build projects, and grow through clear career paths.';
export const DEFAULT_IMAGE = '/splashride-logo.png';
export const metadataBase = new URL(SITE_URL);

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
