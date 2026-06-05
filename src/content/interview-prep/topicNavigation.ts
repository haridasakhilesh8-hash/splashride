export interface InterviewPrepNavTopic {
  slug: string;
  title: string;
  category: string;
}

export interface InterviewPrepNavGroup {
  id: string;
  title: string;
  topics: InterviewPrepNavTopic[];
}

export const aemInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'architecture', title: 'Architecture', category: 'AEM Architecture' },
      { slug: 'jcr', title: 'JCR', category: 'JCR' },
      { slug: 'crxde', title: 'CRXDE', category: 'CRXDE' },
    ],
  },
  {
    id: 'development',
    title: 'Development',
    topics: [
      { slug: 'components', title: 'Components', category: 'Components' },
      { slug: 'htl', title: 'HTL', category: 'HTL' },
      { slug: 'sling', title: 'Sling', category: 'Sling' },
      { slug: 'sling-models', title: 'Sling Models', category: 'Sling Models' },
      { slug: 'osgi', title: 'OSGi', category: 'OSGi' },
    ],
  },
  {
    id: 'content-management',
    title: 'Content Management',
    topics: [
      { slug: 'templates', title: 'Templates', category: 'Templates' },
      { slug: 'content-fragments', title: 'Content Fragments', category: 'Content Fragments' },
      { slug: 'experience-fragments', title: 'Experience Fragments', category: 'Experience Fragments' },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    topics: [
      { slug: 'dispatcher', title: 'Dispatcher', category: 'Dispatcher' },
      { slug: 'security', title: 'Security', category: 'Security' },
      { slug: 'performance', title: 'Performance', category: 'Performance Tuning' },
    ],
  },
  {
    id: 'cloud-service',
    title: 'Cloud Service',
    topics: [
      { slug: 'cloud-manager', title: 'Cloud Manager', category: 'Cloud Manager' },
      { slug: 'aem-cloud-service', title: 'AEM Cloud Service', category: 'AEM Cloud Service' },
      { slug: 'graphql', title: 'GraphQL', category: 'GraphQL' },
    ],
  },
];

export const reactInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'jsx', title: 'JSX', category: 'JSX' },
      { slug: 'components', title: 'Components', category: 'Components' },
      { slug: 'props', title: 'Props', category: 'Props' },
      { slug: 'state', title: 'State', category: 'State' },
      { slug: 'event-handling', title: 'Event Handling', category: 'Event Handling' },
      { slug: 'forms', title: 'Forms', category: 'Forms' },
    ],
  },
  {
    id: 'core-react',
    title: 'Core React',
    topics: [
      { slug: 'hooks', title: 'Hooks', category: 'Hooks' },
      { slug: 'lifecycle', title: 'Lifecycle', category: 'Lifecycle' },
      { slug: 'context-api', title: 'Context API', category: 'Context API' },
      { slug: 'reconciliation', title: 'Reconciliation', category: 'Reconciliation' },
      { slug: 'virtual-dom', title: 'Virtual DOM', category: 'Virtual DOM' },
      { slug: 'rendering', title: 'Rendering', category: 'Rendering' },
    ],
  },
  {
    id: 'advanced-react',
    title: 'Advanced React',
    topics: [
      { slug: 'performance-optimization', title: 'Performance Optimization', category: 'Performance Optimization' },
      { slug: 'custom-hooks', title: 'Custom Hooks', category: 'Custom Hooks' },
      { slug: 'error-boundaries', title: 'Error Boundaries', category: 'Error Boundaries' },
      { slug: 'portals', title: 'Portals', category: 'Portals' },
      { slug: 'suspense', title: 'Suspense', category: 'Suspense' },
      { slug: 'concurrent-features', title: 'Concurrent Features', category: 'Concurrent Features' },
    ],
  },
  {
    id: 'state-management',
    title: 'State Management',
    topics: [
      { slug: 'redux', title: 'Redux', category: 'Redux' },
      { slug: 'redux-toolkit', title: 'Redux Toolkit', category: 'Redux Toolkit' },
      { slug: 'zustand', title: 'Zustand', category: 'Zustand' },
      { slug: 'react-query', title: 'React Query', category: 'React Query' },
    ],
  },
  {
    id: 'routing',
    title: 'Routing',
    topics: [
      { slug: 'react-router', title: 'React Router', category: 'React Router' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    topics: [
      { slug: 'jest', title: 'Jest', category: 'Jest' },
      { slug: 'react-testing-library', title: 'React Testing Library', category: 'React Testing Library' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    topics: [
      { slug: 'folder-structure', title: 'Folder Structure', category: 'Folder Structure' },
      { slug: 'design-patterns', title: 'Design Patterns', category: 'Design Patterns' },
      { slug: 'scalability', title: 'Scalability', category: 'Scalability' },
      { slug: 'component-architecture', title: 'Component Architecture', category: 'Component Architecture' },
    ],
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    topics: [
      { slug: 'ssr', title: 'SSR', category: 'SSR' },
      { slug: 'ssg', title: 'SSG', category: 'SSG' },
      { slug: 'isr', title: 'ISR', category: 'ISR' },
      { slug: 'app-router', title: 'App Router', category: 'App Router' },
      { slug: 'server-components', title: 'Server Components', category: 'Server Components' },
    ],
  },
  {
    id: 'production-support',
    title: 'Production Support',
    topics: [
      { slug: 'debugging', title: 'Debugging', category: 'Debugging' },
      { slug: 'performance-issues', title: 'Performance Issues', category: 'Performance Issues' },
      { slug: 'memory-leaks', title: 'Memory Leaks', category: 'Memory Leaks' },
      { slug: 'production-incidents', title: 'Production Incidents', category: 'Production Incidents' },
    ],
  },
];

export const nextjsInterviewPrepTopicGroups: InterviewPrepNavGroup[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    topics: [
      { slug: 'introduction', title: 'Introduction to Next.js', category: 'Introduction to Next.js' },
      { slug: 'pages-router', title: 'Pages Router', category: 'Pages Router' },
      { slug: 'app-router', title: 'App Router', category: 'App Router' },
      { slug: 'routing', title: 'Routing', category: 'Routing' },
      { slug: 'file-based-routing', title: 'File-based Routing', category: 'File-based Routing' },
    ],
  },
  {
    id: 'rendering',
    title: 'Rendering',
    topics: [
      { slug: 'ssr', title: 'SSR', category: 'SSR' },
      { slug: 'ssg', title: 'SSG', category: 'SSG' },
      { slug: 'isr', title: 'ISR', category: 'ISR' },
      { slug: 'csr', title: 'CSR', category: 'CSR' },
      { slug: 'streaming', title: 'Streaming', category: 'Streaming' },
      { slug: 'server-components', title: 'Server Components', category: 'Server Components' },
    ],
  },
  {
    id: 'data-fetching',
    title: 'Data Fetching',
    topics: [
      { slug: 'get-server-side-props', title: 'getServerSideProps', category: 'getServerSideProps' },
      { slug: 'get-static-props', title: 'getStaticProps', category: 'getStaticProps' },
      { slug: 'get-static-paths', title: 'getStaticPaths', category: 'getStaticPaths' },
      { slug: 'fetch-api', title: 'Fetch API', category: 'Fetch API' },
      { slug: 'server-actions', title: 'Server Actions', category: 'Server Actions' },
    ],
  },
  {
    id: 'app-router-workspace',
    title: 'App Router',
    topics: [
      { slug: 'layouts', title: 'Layouts', category: 'Layouts' },
      { slug: 'templates', title: 'Templates', category: 'Templates' },
      { slug: 'loading-ui', title: 'Loading UI', category: 'Loading UI' },
      { slug: 'error-handling', title: 'Error Handling', category: 'Error Handling' },
      { slug: 'parallel-routes', title: 'Parallel Routes', category: 'Parallel Routes' },
      { slug: 'intercepting-routes', title: 'Intercepting Routes', category: 'Intercepting Routes' },
    ],
  },
  {
    id: 'server-components-workspace',
    title: 'Server Components',
    topics: [
      { slug: 'client-components', title: 'Client Components', category: 'Client Components' },
      { slug: 'rendering-strategy', title: 'Rendering Strategy', category: 'Rendering Strategy' },
      { slug: 'hydration', title: 'Hydration', category: 'Hydration' },
    ],
  },
  {
    id: 'api-development',
    title: 'API Development',
    topics: [
      { slug: 'api-routes', title: 'API Routes', category: 'API Routes' },
      { slug: 'route-handlers', title: 'Route Handlers', category: 'Route Handlers' },
      { slug: 'middleware', title: 'Middleware', category: 'Middleware' },
      { slug: 'edge-runtime', title: 'Edge Runtime', category: 'Edge Runtime' },
    ],
  },
  {
    id: 'authentication',
    title: 'Authentication',
    topics: [
      { slug: 'nextauth', title: 'NextAuth', category: 'NextAuth' },
      { slug: 'jwt', title: 'JWT', category: 'JWT' },
      { slug: 'session-management', title: 'Session Management', category: 'Session Management' },
      { slug: 'protected-routes', title: 'Protected Routes', category: 'Protected Routes' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    topics: [
      { slug: 'image-optimization', title: 'Image Optimization', category: 'Image Optimization' },
      { slug: 'caching', title: 'Caching', category: 'Caching' },
      { slug: 'revalidation', title: 'Revalidation', category: 'Revalidation' },
      { slug: 'code-splitting', title: 'Code Splitting', category: 'Code Splitting' },
      { slug: 'bundle-optimization', title: 'Bundle Optimization', category: 'Bundle Optimization' },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    topics: [
      { slug: 'vercel', title: 'Vercel', category: 'Vercel' },
      { slug: 'ci-cd', title: 'CI/CD', category: 'CI/CD' },
      { slug: 'environment-variables', title: 'Environment Variables', category: 'Environment Variables' },
    ],
  },
  {
    id: 'production-support',
    title: 'Production Support',
    topics: [
      { slug: 'debugging', title: 'Debugging', category: 'Debugging' },
      { slug: 'monitoring', title: 'Monitoring', category: 'Monitoring' },
      { slug: 'incident-handling', title: 'Incident Handling', category: 'Incident Handling' },
      { slug: 'performance-bottlenecks', title: 'Performance Bottlenecks', category: 'Performance Bottlenecks' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    topics: [
      { slug: 'enterprise-nextjs', title: 'Enterprise Next.js', category: 'Enterprise Next.js' },
      { slug: 'scalability', title: 'Scalability', category: 'Scalability' },
      { slug: 'folder-structure', title: 'Folder Structure', category: 'Folder Structure' },
      { slug: 'multi-tenant-applications', title: 'Multi-Tenant Applications', category: 'Multi-Tenant Applications' },
    ],
  },
];

const interviewPrepTopicGroupsByTechnology: Record<string, InterviewPrepNavGroup[]> = {
  aem: aemInterviewPrepTopicGroups,
  react: reactInterviewPrepTopicGroups,
  nextjs: nextjsInterviewPrepTopicGroups,
};

export function getInterviewPrepTopicGroups(technologyId: string): InterviewPrepNavGroup[] {
  return interviewPrepTopicGroupsByTechnology[technologyId] ?? [];
}

export function getInterviewPrepDefaultTopicSlug(technologyId: string): string {
  return getInterviewPrepTopicGroups(technologyId)[0]?.topics[0]?.slug ?? 'architecture';
}

export function getInterviewPrepCategoryForSlug(technologyId: string, slug: string): string {
  const groups = getInterviewPrepTopicGroups(technologyId);
  return groups.flatMap((group) => group.topics).find((topic) => topic.slug === slug)?.category
    ?? groups[0]?.topics[0]?.category
    ?? '';
}

export function getInterviewPrepTopicTitle(technologyId: string, slug: string): string {
  const groups = getInterviewPrepTopicGroups(technologyId);
  return groups.flatMap((group) => group.topics).find((topic) => topic.slug === slug)?.title
    ?? groups[0]?.topics[0]?.title
    ?? 'Interview Prep';
}

export function getInterviewPrepGroupTitle(technologyId: string, slug: string): string {
  const groups = getInterviewPrepTopicGroups(technologyId);
  return groups.find((group) => group.topics.some((topic) => topic.slug === slug))?.title
    ?? groups[0]?.title
    ?? 'Fundamentals';
}
