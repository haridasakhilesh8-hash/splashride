const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const sitemapPath = path.join(distDir, 'sitemap.xml');

if (!fs.existsSync(indexPath)) {
  throw new Error('dist/index.html not found. Run the Vite build before generating route files.');
}

if (!fs.existsSync(sitemapPath)) {
  throw new Error('dist/sitemap.xml not found. Generate the sitemap before generating route files.');
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const routePaths = new Set(urls.map((url) => new URL(url).pathname));

for (const pathname of [...routePaths]) {
  const topicMatch = pathname.match(/^\/technology\/[^/]+\/topic\/([^/]+)$/);
  if (topicMatch) {
    routePaths.add(`/topic/${topicMatch[1]}`);
  }
}

let created = 0;
for (const pathname of routePaths) {
  if (pathname === '/') continue;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.some((segment) => segment === '..' || segment.includes(':'))) {
    throw new Error(`Refusing to write unsafe route path: ${pathname}`);
  }

  const routeDir = path.join(distDir, ...segments);
  const routeIndexPath = path.join(routeDir, 'index.html');

  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(routeIndexPath, indexHtml);
  created += 1;
}

console.log(`Generated ${created} static SPA route files.`);
