import type { TopicContent } from '../../types';

export const reactDesignPatterns: TopicContent = {
  slug: 'react-design-patterns',
  title: 'Design Patterns',
  description: 'Learn the React design patterns senior engineers choose from and how to explain why one pattern fits a problem better than another.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'React design patterns are reusable ways to solve component and state problems. The real skill is choosing the simplest pattern that keeps the code understandable and resilient.',
  whatIsIt: `React design patterns are recurring solutions for UI and state composition problems.

- Composition over inheritance
- Container and presentational separation where it helps
- Custom hooks for reusable behavior
- Compound components, render props, and HOCs where their trade-offs fit`,
  whyWeNeedIt: `Teams need pattern judgment because React gives a lot of freedom. Without shared mental models, the codebase mixes inconsistent approaches and becomes hard to teach or evolve.`,
  realWorldUsage: `Production React teams use patterns to build reusable component APIs, wrap shared data behavior, isolate domain logic from presentation, and keep product-level complexity understandable.`,
  howItWorks: `You match the pattern to the real constraint. If the problem is shared stateful behavior, a custom hook may be enough. If the problem is flexible component composition, compound components may be better. If the problem is compatibility with older library APIs, render props or HOCs may still be valid.`,
  example: {
    title: 'Choosing the Right Pattern',
    description: 'Pattern choice should follow the problem, not fashion.',
    code: [
      {
        label: 'Pattern Heuristic',
        language: 'text',
        code: `Need to share stateful logic?
-> custom hook

Need flexible component API with shared internal state?
-> compound components

Need library-controlled logic with consumer-controlled rendering?
-> render prop

Need to wrap legacy component behavior consistently?
-> HOC, but use carefully`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Are HOCs and render props obsolete?',
      answer: 'Not completely. They are less common than hooks today, but they still appear in mature codebases and library APIs. Engineers should understand the trade-offs instead of dismissing them blindly.',
    },
    {
      question: 'Does every reusable abstraction need a pattern name?',
      answer: 'No. Over-formalizing simple code makes things harder. Patterns are tools for recurring complexity, not badges to collect.',
    },
  ],
  productionIssues: [
    'Teams over-abstract early and create patterns nobody actually needs yet.',
    'Different feature teams solve the same problem with unrelated patterns, increasing maintenance cost.',
    'Pattern choice is copied from blog posts instead of grounded in the actual product constraint.',
  ],
  bestPractices: [
    'Choose the simplest pattern that fits the real constraint.',
    'Prefer hooks and composition by default in modern React.',
    'Document when the team intentionally standardizes on a pattern.',
    'Refactor toward patterns only after repetition or pain is clear.',
  ],
  architectNote: `Pattern literacy matters more than pattern enthusiasm. Strong engineers know several React patterns and can explain why one minimizes long-term complexity for a specific problem.`,
  faqs: [
    {
      question: 'Why do interviewers ask about design patterns in React?',
      answer: 'Because pattern choice reveals how you think about abstraction, reuse, API design, and codebase maintainability under real product pressure.',
    },
  ],
  keyTakeaways: [
    'React patterns are tools, not goals.',
    'Hooks and composition are the default starting point in modern React.',
    'Older patterns still matter in mature apps and library APIs.',
    'Choose patterns based on real constraints and repetition.',
  ],
  relatedTopics: ['react-custom-hooks', 'react-compound-components', 'react-render-props', 'react-hoc'],
};
