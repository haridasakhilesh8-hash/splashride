import type { TopicContent } from '../../types';

export const reactErrorBoundaries: TopicContent = {
  slug: 'react-error-boundaries',
  title: 'Error Boundaries',
  description: 'Understand how React Error Boundaries isolate render failures, protect the user experience, and fit into production support workflows.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'An Error Boundary catches rendering and lifecycle failures below it and replaces the broken subtree with fallback UI instead of crashing the whole app.',
  whatIsIt: `An Error Boundary is a React component boundary that catches errors thrown during rendering, lifecycle methods, and constructor work in descendant components.

- It prevents one broken widget from blanking the entire page
- It provides fallback UI and recovery options
- It helps capture richer error context for support and monitoring
- It does not catch every async or event-handler failure automatically`,
  whyWeNeedIt: `Production React apps need failure isolation. Without boundaries, one malformed response, unsafe render assumption, or unexpected null can take down an entire route and damage user trust.`,
  realWorldUsage: `Teams place boundaries around dashboards, route sections, third-party widgets, charts, editors, and risky integration surfaces so partial failure stays recoverable.`,
  howItWorks: `A boundary wraps a subtree. If a child throws during render, React stops rendering that subtree, calls the boundary lifecycle, and lets the boundary show fallback UI such as retry, navigation, or support messaging.`,
  example: {
    title: 'Route-Level and Widget-Level Recovery',
    description: 'A boundary should protect meaningful recovery units, not just the whole app shell.',
    code: [
      {
        label: 'Boundary Placement',
        language: 'tsx',
        code: `import { ErrorBoundary } from 'react-error-boundary';

function WidgetFallback() {
  return (
    <section>
      <h2>Widget unavailable</h2>
      <p>Refresh the page or try again later.</p>
    </section>
  );
}

export function AnalyticsRoute() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={WidgetFallback}>
        <RevenueChart />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={WidgetFallback}>
        <CampaignBreakdown />
      </ErrorBoundary>
    </div>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Do Error Boundaries catch fetch errors automatically?',
      answer: 'Not by default. They catch render-time failures. Async errors usually need explicit handling or a library integration that rethrows into the render path.',
    },
    {
      question: 'Should I wrap the entire app in one boundary?',
      answer: 'You usually want more than that. A global boundary is useful, but route-level and widget-level boundaries provide better recovery and lower blast radius.',
    },
  ],
  productionIssues: [
    'A single top-level boundary can hide where failures really originate and provides poor user recovery.',
    'Fallback UI without retry or navigation traps users in a dead end.',
    'Teams forget to enrich monitoring with component or route context, making triage much slower.',
  ],
  bestPractices: [
    'Place boundaries around meaningful recovery units such as routes or high-risk widgets.',
    'Log component and route context together with the error.',
    'Provide safe recovery options like retry, reload, or navigate away.',
    'Test failure behavior intentionally instead of assuming the fallback works.',
  ],
  architectNote: `Error boundaries are part of resilience architecture, not just React syntax. Good placement reflects business-critical flows, support ownership, and which failures should degrade locally versus escalate to the whole route.`,
  faqs: [
    {
      question: 'Why do many teams use react-error-boundary?',
      answer: 'It gives a practical functional API for boundary usage, reset behavior, and fallback composition without forcing every team to maintain its own boundary class implementation.',
    },
  ],
  keyTakeaways: [
    'Error Boundaries isolate render failures below them.',
    'They do not automatically catch every async failure path.',
    'Boundary placement should match real recovery units.',
    'Fallback UI needs recovery behavior, not just an apology message.',
  ],
  relatedTopics: ['react-error-handling', 'react-components', 'react-testing-library', 'react-component-architecture'],
};
