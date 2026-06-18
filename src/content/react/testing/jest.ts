import type { TopicContent } from '../../types';

export const reactJest: TopicContent = {
  slug: 'react-jest',
  title: 'Jest',
  description: 'Understand how Jest supports React unit testing, mocking, timing control, and failure isolation in frontend codebases.',
  applicableVersions: ['React 16+', 'React 18', 'Jest 29+'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'Jest is the test runner and assertion environment many React teams use for unit and integration tests. The bigger skill is deciding what to mock and what real behavior should remain under test.',
  whatIsIt: `Jest provides the runtime for many React test suites.

- Runs tests and assertions
- Supports module mocking and timer control
- Powers snapshot testing where appropriate
- Integrates with DOM-oriented tools such as React Testing Library`,
  whyWeNeedIt: `Frontend teams need fast, repeatable tests around component behavior, hooks, utilities, async flows, and regression-prone business logic. Jest is often the backbone of that feedback loop.`,
  realWorldUsage: `Teams use Jest to test utility logic, reducers, hooks, validation rules, formatting helpers, and integration behavior around React components with mocked API or timer conditions.`,
  howItWorks: `Jest executes test files, exposes globals like describe and it, and lets teams mock modules, spy on functions, and control time. In React apps it is commonly paired with React Testing Library for DOM assertions.`,
  example: {
    title: 'Timer-Controlled UI Testing',
    description: 'Fake timers help when the component behavior depends on scheduled work.',
    code: [
      {
        label: 'Jest with Fake Timers',
        language: 'tsx',
        code: `import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { Toast } from './Toast';

jest.useFakeTimers();

it('hides the toast after 3 seconds', () => {
  render(<Toast message="Saved" autoHideMs={3000} />);
  expect(screen.getByText('Saved')).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(3000);
  });

  expect(screen.queryByText('Saved')).not.toBeInTheDocument();
});`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I mock everything in Jest tests?',
      answer: 'No. Over-mocking hides real integration behavior. Mock external boundaries, but keep the user-visible contract and important data flow realistic.',
    },
    {
      question: 'Are snapshots enough?',
      answer: 'No. Snapshots can catch broad changes, but behavior-focused assertions are much more valuable for meaningful regression protection.',
    },
  ],
  productionIssues: [
    'Excessive mocking creates brittle tests that pass while the real component contract is broken.',
    'Fake timers without proper act wrapping create misleading or flaky results.',
    'Snapshot-heavy suites often become noisy and low-signal over time.',
  ],
  bestPractices: [
    'Mock external boundaries, not the entire world.',
    'Prefer behavior assertions over broad snapshot reliance.',
    'Use fake timers deliberately for timeout, debounce, or polling behavior.',
    'Keep tests focused on public behavior, not private implementation details.',
  ],
  architectNote: `A strong Jest strategy is less about syntax and more about trust boundaries. The team should know which failures belong in unit tests, which need DOM-level integration tests, and which must be covered by higher-level verification.`,
  faqs: [
    {
      question: 'Why do React teams often pair Jest with React Testing Library?',
      answer: 'Because Jest provides the runner and mocking environment, while React Testing Library provides DOM-centric rendering and assertions that align better with user-visible behavior.',
    },
  ],
  keyTakeaways: [
    'Jest is a test runtime and mocking environment, not the whole testing strategy.',
    'Mock carefully so tests stay meaningful.',
    'Behavior assertions are usually more valuable than snapshots.',
    'Pair Jest with DOM-focused tools for component confidence.',
  ],
  relatedTopics: ['react-testing-library', 'react-hooks-usereducer', 'react-error-boundaries', 'react-custom-hooks'],
};
