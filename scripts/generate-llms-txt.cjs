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
const { SITE_URL } = require(path.join(rootDir, 'src/lib/seo.ts'));
const { technologies, getTechById, getTechForSlug } = require(path.join(rootDir, 'src/lib/navigation.ts'));
const { getActiveInterviewPrepSections } = require(path.join(rootDir, 'src/content/interview-prep/index.ts'));
const { careerRoadmaps } = require(path.join(rootDir, 'src/content/careerPaths.ts'));
const { getTopicContent } = require(path.join(rootDir, 'src/content/index.ts'));
const {
  getTopicClusters,
  getLlmsBestPageLinks,
} = require(path.join(rootDir, 'src/lib/topicClusters.ts'));

function absoluteUrl(route) {
  return `${SITE_URL}${route === '/' ? '/' : route}`;
}

function routeExists(route) {
  if (route === '/' || route === '/technologies' || route === '/interview-prep' || route === '/career-paths') return true;
  if (route === '/about' || route === '/contact' || route === '/privacy-policy' || route === '/terms') return true;

  const techMatch = route.match(/^\/technologies\/([^/]+)$/);
  if (techMatch) {
    return technologies.some((tech) => tech.active && tech.id === techMatch[1]);
  }

  const topicMatch = route.match(/^\/technologies\/([^/]+)\/topic\/([^/]+)$/);
  if (topicMatch) {
    const [, techId, slug] = topicMatch;
    const tech = technologies.find((item) => item.active && item.id === techId);
    return !!tech && !!getTopicContent(slug) && tech.categories.some((category) =>
      category.items.some((item) => !item.badge && item.slug === slug)
    );
  }

  const interviewMatch = route.match(/^\/interview-prep\/([^/]+)$/);
  if (interviewMatch) {
    return getActiveInterviewPrepSections().some((section) => section.technologyId === interviewMatch[1]);
  }

  const careerMatch = route.match(/^\/career-paths\/([^/]+)$/);
  if (careerMatch) {
    return careerRoadmaps.some((roadmap) => roadmap.slug === careerMatch[1]);
  }

  return false;
}

function markdownLink(label, route) {
  return `* [${label}](${absoluteUrl(route)})`;
}

function topicLink(label, route) {
  if (!routeExists(route)) return null;
  return `* [${label}](${absoluteUrl(route)})`;
}

const technologyLinks = technologies
  .filter((technology) => technology.active)
  .map((technology) => markdownLink(technology.label, `/technologies/${technology.id}`));

const interviewPrepLinks = getActiveInterviewPrepSections()
  .map((section) => markdownLink(`${section.technologyLabel} Interview Questions`, `/interview-prep/${section.technologyId}`));

const clusterSections = getTopicClusters()
  .map((cluster) => {
    const lines = cluster.technologyIds
      .map((technologyId) => getTechById(technologyId))
      .filter(Boolean)
      .map((technology) => markdownLink(technology.label, `/technologies/${technology.id}`));

    return [`### ${cluster.name}`, ...lines].join('\n');
  });

const bestPageLinks = getLlmsBestPageLinks()
  .map((entry) => {
    const topic = getTopicContent(entry.path.split('/').pop());
    const technology = getTechForSlug(entry.path.split('/').pop());
    const label = topic && technology ? `${technology.label}: ${topic.title}` : entry.label;
    return topicLink(label, entry.path);
  })
  .filter(Boolean);

const llmsText = [
  '# SplashRide',
  '',
  '> SplashRide is a developer learning platform that helps developers learn technologies, prepare for interviews, understand production issues, and follow career-focused learning paths.',
  '',
  '## Core Pages',
  '',
  markdownLink('Home', '/'),
  markdownLink('Technologies', '/technologies'),
  markdownLink('Interview Prep', '/interview-prep'),
  markdownLink('Career Paths', '/career-paths'),
  markdownLink('About', '/about'),
  '',
  '## Technology Hubs',
  '',
  ...technologyLinks,
  '',
  '## Interview Prep',
  '',
  ...interviewPrepLinks,
  '',
  '## Topic Clusters',
  '',
  ...clusterSections.flatMap((section) => [section, '']),
  '## Best Pages for AI Answers',
  '',
  ...bestPageLinks,
  '',
  '## Content Notes',
  '',
  'SplashRide topic pages usually include:',
  '',
  '* Quick Understanding',
  '* What Is It?',
  '* Quick Facts',
  '* Why Do We Need It?',
  '* Real Projects',
  '* How It Works',
  '* Example',
  '* Common Confusions',
  '* Production Issues',
  '* Best Practices',
  "* Architect's Note",
  '* FAQs',
  '* Key Takeaways',
  '* Related Topics',
  '',
].join('\n');

const llmsPath = path.join(rootDir, 'public/llms.txt');
fs.writeFileSync(llmsPath, llmsText);

const distLlmsPath = path.join(rootDir, 'dist/llms.txt');
if (fs.existsSync(path.dirname(distLlmsPath))) {
  fs.writeFileSync(distLlmsPath, llmsText);
}

console.log(`Generated llms.txt with ${technologyLinks.length} technology hubs and ${bestPageLinks.length} featured topic links.`);
