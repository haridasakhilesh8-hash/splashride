import type { TopicContent } from '../../types';

export const reactComponentArchitecture: TopicContent = {
  slug: 'react-component-architecture',
  title: 'Component Architecture',
  description: 'Learn how senior React engineers design component systems that stay reusable, accessible, testable, and safe to evolve.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'Component architecture is about deciding boundaries, contracts, ownership, and composition rules so a React UI can grow without becoming inconsistent or brittle.',
  whatIsIt: `Component architecture is the structure of reusable UI building blocks and their contracts.

- Which components are primitives, composites, and product-specific
- Where state and behavior should live
- How accessibility and design-system rules are enforced
- How teams evolve public component APIs safely`,
  whyWeNeedIt: `Weak component architecture causes duplicated UI, prop explosions, accessibility drift, and breakages across products when shared pieces evolve without clear contracts.`,
  realWorldUsage: `Teams use component architecture thinking when building design systems, product shells, complex forms, data tables, dashboards, and shared cross-product UI primitives.`,
  howItWorks: `A strong architecture separates primitives from business components, keeps public APIs narrow, prefers composition over flag-heavy configuration, and makes ownership of shared versus local components explicit.`,
  example: {
    title: 'Layered Component Thinking',
    description: 'Not every component belongs in the shared design system.',
    code: [
      {
        label: 'Component Layers',
        language: 'text',
        code: `Primitives
-> Button, Input, Dialog, Stack

Composites
-> SearchBar, DateRangePicker, DataTable

Product features
-> BillingSummaryPanel, ClaimApprovalForm

Rule
-> only stable, reusable contracts move down into shared layers`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should every useful component become shared?',
      answer: 'No. Sharing too early creates accidental platform commitments. Many components should stay feature-local until reuse is real and stable.',
    },
    {
      question: 'Is component architecture mostly about file organization?',
      answer: 'No. File organization supports it, but the deeper concerns are API design, state ownership, composition, accessibility, and evolution strategy.',
    },
  ],
  productionIssues: [
    'Shared components accumulate too many flags because teams avoid composing smaller pieces.',
    'A design-system change breaks product surfaces because API contracts were never clearly versioned or tested.',
    'Teams copy shared components locally when the public API is too rigid or too unstable.',
  ],
  bestPractices: [
    'Prefer composition over large flag-driven APIs.',
    'Keep shared component contracts narrow and stable.',
    'Separate primitives, composites, and feature-specific components clearly.',
    'Treat accessibility and testing as part of component architecture.',
  ],
  architectNote: `Component architecture is where product ergonomics and engineering discipline meet. Good architecture helps teams ship faster because the boundaries are obvious and the component contracts are trustworthy.`,
  faqs: [
    {
      question: 'How do I know a component should move into the design system?',
      answer: 'Usually when multiple teams need it, the API has stabilized, and the component solves a shared interaction problem rather than one product-specific business workflow.',
    },
  ],
  keyTakeaways: [
    'Component architecture is about boundaries and contracts, not just JSX reuse.',
    'Not all components belong in shared layers.',
    'Composition usually scales better than flag-heavy APIs.',
    'Accessibility, testing, and versioning are part of component system design.',
  ],
  relatedTopics: ['react-components', 'react-design-patterns', 'react-folder-structure', 'react-testing-library'],
};
