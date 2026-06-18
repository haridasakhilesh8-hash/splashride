import type { TopicContent } from '../../types';

export const reactFolderStructure: TopicContent = {
  slug: 'react-folder-structure',
  title: 'Folder Structure',
  description: 'Understand how React folder structure should reflect feature ownership, shared boundaries, and long-term maintainability rather than personal preference alone.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'Good folder structure makes ownership obvious. It should help teams find code, separate shared and feature concerns, and avoid turning one app into a miscellaneous components graveyard.',
  whatIsIt: `Folder structure is how a React codebase organizes features, shared UI, data access, routing, and cross-cutting utilities.

- It affects onboarding speed
- It shapes ownership boundaries
- It influences test placement and reuse decisions
- It can either reduce or amplify large-team chaos`,
  whyWeNeedIt: `As React apps grow, weak structure creates duplicated components, unclear ownership, and risky changes because nobody knows which folder is actually the source of truth.`,
  realWorldUsage: `Teams commonly organize by feature, route, product area, or domain. Shared UI and primitives live separately from feature-specific business logic so large apps can evolve without endless cross-team conflicts.`,
  howItWorks: `A strong structure starts by separating application-specific features from shared platform code. Feature folders then co-locate components, tests, hooks, and state that belong together, while shared folders contain primitives and genuinely reusable utilities.`,
  example: {
    title: 'Feature-Oriented Structure',
    description: 'The goal is ownership clarity, not one universal perfect tree.',
    code: [
      {
        label: 'Feature First Layout',
        language: 'text',
        code: `src/
  app/
    router/
    providers/
  features/
    billing/
      components/
      hooks/
      api/
      tests/
    accounts/
      components/
      hooks/
      api/
  shared/
    ui/
    hooks/
    lib/
    testing/`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is there one best React folder structure?',
      answer: 'No. The best structure depends on team size, domain complexity, and how much code is truly shared. What matters is ownership clarity and consistency.',
    },
    {
      question: 'Why not keep everything under components and utils?',
      answer: 'Because those folders become dumping grounds quickly. Feature ownership gets hidden and refactoring becomes harder as the app grows.',
    },
  ],
  productionIssues: [
    'Shared folders often accumulate feature-specific logic that should have stayed local.',
    'Teams copy components across product areas because ownership is unclear.',
    'Refactors become high-risk when routing, API, and business logic are scattered across unrelated folders.',
  ],
  bestPractices: [
    'Organize around ownership and change patterns, not just file type.',
    'Co-locate feature-specific code that changes together.',
    'Keep shared folders strict so only genuinely reusable code lands there.',
    'Document the structural rules for new contributors.',
  ],
  architectNote: `Folder structure is an architectural communication tool. It should show who owns what and which abstractions are shared. If teams debate the tree constantly, the real problem is usually unclear ownership rather than directory names.`,
  faqs: [
    {
      question: 'When should I split a feature into a package or workspace?',
      answer: 'Usually when ownership, release cadence, or reuse crosses application boundaries enough that one repository folder is no longer a strong enough contract.',
    },
  ],
  keyTakeaways: [
    'Folder structure should reflect ownership and change boundaries.',
    'Feature-first organization scales better than giant generic buckets.',
    'Shared code needs stricter governance than local feature code.',
    'Consistency matters more than chasing one perfect tree.',
  ],
  relatedTopics: ['react-component-architecture', 'react-design-patterns', 'react-scalability', 'react-components'],
};
