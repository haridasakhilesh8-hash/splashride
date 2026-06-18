import type { TopicContent } from '../../types';

export const reactTestingLibraryTopic: TopicContent = {
  slug: 'react-testing-library',
  title: 'React Testing Library',
  description: 'Learn how React Testing Library helps teams test user-visible behavior instead of implementation details.',
  applicableVersions: ['React 16+', 'React 18', 'RTL 14+'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'React Testing Library encourages you to test what the user can see and do: render the component, interact with it, and assert on accessible output.',
  whatIsIt: `React Testing Library is a DOM-oriented testing utility for React.

- Renders components into a realistic test DOM
- Encourages accessible queries such as role and label text
- Works well with user-event for realistic interactions
- Pushes teams away from instance-level and implementation-detail assertions`,
  whyWeNeedIt: `React components often stay maintainable longer when tests focus on public behavior. Tests that depend on internal state names, CSS class accidents, or component structure are much more fragile during refactors.`,
  realWorldUsage: `Teams use React Testing Library for forms, dialogs, tables, async UI, routing flows, validation states, keyboard interactions, and user-critical components whose behavior matters more than their internal implementation.`,
  howItWorks: `The library renders a component, exposes screen queries, and lets tests interact through user-event. Queries prefer accessibility semantics such as getByRole, getByLabelText, and findByText so tests reflect how assistive technologies and users perceive the UI.`,
  example: {
    title: 'Behavior-First Component Test',
    description: 'The test interacts with the UI the way a user would.',
    code: [
      {
        label: 'RTL with user-event',
        language: 'tsx',
        code: `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

it('shows a validation message when email is missing', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.type(screen.getByLabelText(/password/i), 'secret');
  await user.click(screen.getByRole('button', { name: /sign in/i }));

  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Why prefer getByRole over getByTestId?',
      answer: 'Because role-based queries reflect accessible user-visible structure and usually make tests more resilient. Test IDs are still useful for some cases, but they should not be the default.',
    },
    {
      question: 'Should I test component internals with RTL?',
      answer: 'Usually no. RTL is strongest when it validates behavior, visible states, and interaction outcomes.',
    },
  ],
  productionIssues: [
    'Tests that only use test IDs can miss real accessibility and labeling problems.',
    'Skipping user-event and calling DOM methods directly often hides timing and interaction issues.',
    'Async UI tests become flaky when teams forget to wait for the actual visible state change.',
  ],
  bestPractices: [
    'Prefer role, label, and text queries over test IDs where possible.',
    'Use user-event for realistic interactions instead of low-level DOM calls.',
    'Assert on visible behavior and accessible output.',
    'Treat async UI as async in tests by waiting for the resulting screen state.',
  ],
  architectNote: `React Testing Library usually produces the healthiest frontend tests because it rewards behavior-centric thinking. That aligns well with refactoring, accessibility, and long-lived product surfaces.`,
  faqs: [
    {
      question: 'What is the relationship between RTL and Jest?',
      answer: 'Jest runs the tests. React Testing Library renders components and gives you DOM-focused queries and interaction helpers.',
    },
  ],
  keyTakeaways: [
    'Test the user-visible contract, not private implementation details.',
    'Accessible queries usually create stronger tests.',
    'Use user-event for more realistic interactions.',
    'Async UI requires async testing discipline.',
  ],
  relatedTopics: ['react-jest', 'react-hook-form', 'react-error-boundaries', 'react-components'],
};
