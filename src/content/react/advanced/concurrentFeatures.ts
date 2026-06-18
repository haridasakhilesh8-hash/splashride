import type { TopicContent } from '../../types';

export const reactConcurrentFeatures: TopicContent = {
  slug: 'react-concurrent-features',
  title: 'Concurrent Features',
  description: 'Learn how transitions and deferred values help React keep urgent interactions responsive when rendering work becomes expensive.',
  applicableVersions: ['React 18', 'React 19'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'Concurrent features let React prioritize urgent work like typing while deferring non-urgent rendering work such as expensive filtering or large list updates.',
  whatIsIt: `Concurrent features are React capabilities that help schedule rendering more intelligently.

- useTransition marks updates as non-urgent
- useDeferredValue lets expensive views lag behind a fast-changing value
- Rendering can be interrupted and restarted
- This improves responsiveness when the UI would otherwise block input`,
  whyWeNeedIt: `Large enterprise screens often do too much work on every keystroke or filter change. Concurrent features give teams another tool before users experience input lag and frozen interactions.`,
  realWorldUsage: `Teams use transitions and deferred values for large search results, analytics filters, dashboards, configuration screens, and data-heavy UIs where the user should keep typing or navigating while slower views catch up.`,
  howItWorks: `Urgent state updates such as typing stay immediate. Non-urgent updates are wrapped in a transition or derived from a deferred value, allowing React to keep the interaction responsive while heavier rendering work finishes later.`,
  example: {
    title: 'Responsive Filtering',
    description: 'Typing stays responsive while the expensive list update is deprioritized.',
    code: [
      {
        label: 'useTransition and useDeferredValue',
        language: 'tsx',
        code: `import { useDeferredValue, useMemo, useState, useTransition } from 'react';

export function UserSearch({ users }: { users: User[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredFilter = useDeferredValue(filter);

  const results = useMemo(
    () => users.filter((user) => user.name.toLowerCase().includes(deferredFilter.toLowerCase())),
    [users, deferredFilter]
  );

  return (
    <>
      <input
        value={query}
        onChange={(e) => {
          const next = e.target.value;
          setQuery(next);
          startTransition(() => setFilter(next));
        }}
      />
      {isPending ? <p>Updating results...</p> : null}
      <UserResults users={results} />
    </>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I wrap every update in a transition?',
      answer: 'No. Use transitions only for non-urgent work where responsiveness is suffering. Overusing them makes UI behavior harder to reason about.',
    },
    {
      question: 'Does concurrency make React multi-threaded?',
      answer: 'No. It changes scheduling behavior on the main thread. If the real bottleneck is CPU-heavy business logic, a worker may still be the better answer.',
    },
  ],
  productionIssues: [
    'Marking validation or critical state as non-urgent can create confusing UI lag.',
    'Teams use concurrent features without profiling and never confirm they fixed the real bottleneck.',
    'Expensive calculations still run too often because state ownership is wrong, even after adding transitions.',
  ],
  bestPractices: [
    'Use concurrent features only for measured responsiveness problems.',
    'Keep render logic pure because interrupted renders may restart.',
    'Treat transitions as a scheduling tool, not a substitute for good state ownership.',
    'Profile before and after using transitions or deferred values.',
  ],
  architectNote: `Concurrent features are useful when the product has true responsiveness pressure, but they should come after obvious architectural fixes like virtualization, code splitting, and narrower state ownership.`,
  faqs: [
    {
      question: 'When do I choose useTransition versus useDeferredValue?',
      answer: 'Use useTransition when you control the non-urgent state update. Use useDeferredValue when you want a derived view to lag behind a rapidly changing value.',
    },
  ],
  keyTakeaways: [
    'Concurrent features improve responsiveness by prioritizing urgent work.',
    'Transitions are for non-urgent updates, not every state change.',
    'Deferred values help expensive views lag behind fast input safely.',
    'Profile the interaction before choosing concurrency tools.',
  ],
  relatedTopics: ['react-suspense', 'react-performance', 'react-hooks-usememo', 'react-lazy-loading'],
};
