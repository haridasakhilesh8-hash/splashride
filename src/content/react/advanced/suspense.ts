import type { TopicContent } from '../../types';

export const reactSuspense: TopicContent = {
  slug: 'react-suspense',
  title: 'Suspense',
  description: 'Understand how Suspense controls loading boundaries, progressive reveal, and user experience during code or data readiness gaps.',
  applicableVersions: ['React 18', 'React 19'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'Suspense lets React show a fallback while part of the UI is not ready, but the real skill is deciding where those boundaries belong so users do not see loading waterfalls.',
  whatIsIt: `Suspense coordinates loading boundaries in React.

- It can show fallback UI while a lazy component or compatible data source is not ready
- It helps define progressive reveal instead of one global spinner
- It works best when boundaries match meaningful product sections
- Poor placement creates hidden content, flicker, or nested waterfall behavior`,
  whyWeNeedIt: `Users care less about framework internals than about whether a screen reveals progressively and predictably. Suspense helps teams design that intentionally instead of letting loading states spread randomly through components.`,
  realWorldUsage: `Teams use Suspense for route chunks, heavy dashboards, lazy editors, streaming page sections, and progressively revealing content-heavy surfaces where some regions can wait while others load immediately.`,
  howItWorks: `A Suspense boundary wraps children and a fallback. If a compatible child is not ready, React renders the fallback for that boundary. Once the child is ready, React reveals the real content. Nested boundaries can reveal different parts of the page at different times.`,
  example: {
    title: 'Progressive Reveal with Route Sections',
    description: 'Separate fallback boundaries avoid one giant loading state.',
    code: [
      {
        label: 'Boundary Placement',
        language: 'tsx',
        code: `import { Suspense, lazy } from 'react';

const RevenuePanel = lazy(() => import('./RevenuePanel'));
const ActivityPanel = lazy(() => import('./ActivityPanel'));

export function DashboardPage() {
  return (
    <div>
      <Suspense fallback={<section>Loading revenue...</section>}>
        <RevenuePanel />
      </Suspense>

      <Suspense fallback={<section>Loading activity...</section>}>
        <ActivityPanel />
      </Suspense>
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Suspense just lazy loading?',
      answer: 'No. Lazy loading is one use case. Suspense is really about boundary design for not-ready UI, including progressive reveal and fallback coordination.',
    },
    {
      question: 'Why do users still experience bad loading with Suspense?',
      answer: 'Because boundary placement matters. One badly chosen fallback can hide already-useful content or create nested reveal waterfalls.',
    },
  ],
  productionIssues: [
    'A single top-level Suspense boundary can blank an entire route for one slow child.',
    'Nested fallbacks without design discipline create distracting loading waterfalls.',
    'Teams use Suspense boundaries without pairing them with error recovery, so failures become ambiguous.',
  ],
  bestPractices: [
    'Place boundaries around meaningful user experience sections.',
    'Prefer progressive reveal over one page-wide loading mask when possible.',
    'Pair Suspense strategy with error-boundary strategy.',
    'Measure real loading behavior in the browser, not just component-level assumptions.',
  ],
  architectNote: `Suspense is a user-experience boundary tool. Good architecture decisions come from reveal order, perceived latency, and route-level resilience, not from adding fallback props everywhere.`,
  faqs: [
    {
      question: 'Should every lazy component have its own Suspense boundary?',
      answer: 'Not always. Boundaries should match meaningful sections of the product experience, not individual imports mechanically.',
    },
  ],
  keyTakeaways: [
    'Suspense is about boundary design, not just spinners.',
    'Poorly placed fallbacks create flicker and hidden content.',
    'Progressive reveal usually feels better than one global loading state.',
    'Suspense and error boundaries should be designed together.',
  ],
  relatedTopics: ['react-lazy-loading', 'react-concurrent-features', 'react-error-boundaries', 'react-performance'],
};
