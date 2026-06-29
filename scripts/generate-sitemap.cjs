const fs = require('fs');
const path = require('path');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  module._compile(output, filename);
};

const rootDir = path.resolve(__dirname, '..');
const { technologies } = require(path.join(rootDir, 'src/lib/navigation.ts'));
const { SITE_URL } = require(path.join(rootDir, 'src/lib/seo.ts'));
const { getTopicContent } = require(path.join(rootDir, 'src/content/index.ts'));
const { getActiveInterviewPrepSections } = require(path.join(rootDir, 'src/content/interview-prep/index.ts'));
const { careerRoadmaps } = require(path.join(rootDir, 'src/content/careerPaths.ts'));

const sitemapPath = path.join(rootDir, 'public/sitemap.xml');
const existingSitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
const lastmod = existingSitemap.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? new Date().toISOString().slice(0, 10);

function absoluteUrl(route) {
  return `${SITE_URL}${route === '/' ? '/' : route}`;
}

function routeExists(route) {
  if (route === '/') return true;
  if (route === '/technologies') return true;
  if (route === '/about') return true;
  if (route === '/contact') return true;
  if (route === '/privacy-policy') return true;
  if (route === '/terms') return true;
  if (route === '/career-paths') return true;
  if (route === '/interview-prep') return true;

  const roadmapMatch = route.match(/^\/career-paths\/([^/]+)$/);
  if (roadmapMatch) {
    return careerRoadmaps.some((roadmap) => roadmap.slug === roadmapMatch[1]);
  }

  const prepMatch = route.match(/^\/interview-prep\/([^/]+)$/);
  if (prepMatch) {
    return getActiveInterviewPrepSections().some((section) => section.technologyId === prepMatch[1]);
  }

  const techMatch = route.match(/^\/technologies\/([^/]+)$/);
  if (techMatch) {
    return technologies.some((tech) => tech.active && tech.id === techMatch[1]);
  }

  const topicMatch = route.match(/^\/technologies\/([^/]+)\/topic\/([^/]+)$/);
  if (!topicMatch) return false;

  const [, techId, slug] = topicMatch;
  const tech = technologies.find((item) => item.active && item.id === techId);
  if (!tech || !getTopicContent(slug)) return false;

  return tech.categories.some((category) =>
    category.items.some((item) => !item.badge && item.slug === slug)
  );
}

const entries = [
  { route: '/', priority: '1.0' },
  { route: '/technologies', priority: '0.9' },
  { route: '/about', priority: '0.6' },
  { route: '/contact', priority: '0.6' },
  { route: '/privacy-policy', priority: '0.4' },
  { route: '/terms', priority: '0.4' },
  { route: '/career-paths', priority: '0.9' },
  { route: '/interview-prep', priority: '0.9' },
];

for (const roadmap of careerRoadmaps) {
  entries.push({ route: `/career-paths/${roadmap.slug}`, priority: '0.8' });
}

for (const section of getActiveInterviewPrepSections()) {
  entries.push({ route: `/interview-prep/${section.technologyId}`, priority: '0.8' });
}

for (const tech of technologies.filter((item) => item.active)) {
  entries.push({ route: `/technologies/${tech.id}`, priority: '0.8' });

  for (const category of tech.categories) {
    for (const item of category.items) {
      if (item.badge || !getTopicContent(item.slug)) continue;
      entries.push({
        route: `/technologies/${tech.id}/topic/${item.slug}`,
        priority: '0.7',
      });
    }
  }
}

const invalidRoutes = entries.map((entry) => entry.route).filter((route) => !routeExists(route));
if (invalidRoutes.length > 0) {
  throw new Error(`Refusing to generate sitemap with invalid routes:\n${invalidRoutes.join('\n')}`);
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map((entry) =>
    `  <url><loc>${absoluteUrl(entry.route)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${entry.priority}</priority></url>`
  ),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(sitemapPath, xml);

const distSitemapPath = path.join(rootDir, 'dist/sitemap.xml');
if (fs.existsSync(path.dirname(distSitemapPath))) {
  fs.writeFileSync(distSitemapPath, xml);
}

console.log(`Generated ${entries.length} sitemap URLs.`);
