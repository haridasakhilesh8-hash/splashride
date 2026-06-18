import type { TopicContent } from '../../types';

export const reactUseReducer: TopicContent = {
  slug: 'react-hooks-usereducer',
  title: 'useReducer',
  description: 'Learn when useReducer is a better fit than useState for React screens with complex transitions, event-driven state, and safer update logic.',
  applicableVersions: ['React 16.8+', 'React 18', 'React 19'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'useReducer moves state updates into a reducer function so transitions are explicit and easier to reason about. It is especially useful when multiple events can change related state together.',
  whatIsIt: `useReducer is a React hook for state that changes through named actions instead of ad hoc setter calls.

- A reducer receives the current state and an action
- It returns the next state without mutating the previous one
- The component dispatches actions such as 'submitted' or 'reset'
- This makes complex UI behavior easier to test and debug`,
  whyWeNeedIt: `useState works well for small local values, but it becomes harder to follow when one screen has loading, success, error, editing, undo, or multistep transitions. useReducer helps teams model those transitions deliberately instead of scattering update logic across event handlers and effects.`,
  realWorldUsage: `Senior React teams use useReducer for checkout flows, filters with many dependent controls, optimistic local workflows, modal state machines, and complex forms where several fields or statuses must change together.`,
  howItWorks: `You define an initial state object and a reducer. The reducer handles a fixed set of action types. Components call dispatch with an action, React runs the reducer, and the returned state becomes the next render snapshot.`,
  example: {
    title: 'useReducer for a Multi-Step Form',
    description: 'A reducer keeps multi-event state transitions explicit and testable.',
    code: [
      {
        label: 'Reducer Pattern',
        language: 'tsx',
        code: `import { useReducer } from 'react';

type FormState = {
  step: 1 | 2 | 3;
  saving: boolean;
  error: string | null;
  values: {
    name: string;
    email: string;
  };
};

type FormAction =
  | { type: 'fieldChanged'; field: 'name' | 'email'; value: string }
  | { type: 'nextStep' }
  | { type: 'saveStarted' }
  | { type: 'saveSucceeded' }
  | { type: 'saveFailed'; error: string }
  | { type: 'reset' };

const initialState: FormState = {
  step: 1,
  saving: false,
  error: null,
  values: { name: '', email: '' },
};

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'fieldChanged':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case 'nextStep':
      return { ...state, step: Math.min(3, state.step + 1) as 1 | 2 | 3 };
    case 'saveStarted':
      return { ...state, saving: true, error: null };
    case 'saveSucceeded':
      return { ...state, saving: false };
    case 'saveFailed':
      return { ...state, saving: false, error: action.error };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export function OnboardingForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <form>
      <input
        value={state.values.name}
        onChange={(e) =>
          dispatch({ type: 'fieldChanged', field: 'name', value: e.target.value })
        }
      />
      <button type="button" onClick={() => dispatch({ type: 'nextStep' })}>
        Continue
      </button>
    </form>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should useReducer replace useState everywhere?',
      answer: 'No. Use useState for simple local values. Reach for useReducer when the same state can change from many events or when transitions are easier to understand as named actions.',
    },
    {
      question: 'Is useReducer only for global state?',
      answer: 'No. It is often most valuable for complex local state inside one component or feature subtree.',
    },
  ],
  productionIssues: [
    'Reducers that mutate nested state make debugging and memoization harder. Always return new objects for changed branches.',
    'Action names that describe UI clicks instead of domain intent become noisy over time. Prefer events like saveStarted or itemRemoved.',
    'Keeping async side effects inside the reducer breaks the mental model. Reducers must stay pure.',
  ],
  bestPractices: [
    'Use useReducer when several fields or statuses change together.',
    'Keep reducers pure and side-effect free.',
    'Name actions after domain events, not button labels.',
    'Pair useReducer with context only when the state truly needs subtree sharing.',
  ],
  architectNote: `useReducer is a local state-modeling tool. It shines when a screen behaves like a small state machine, but it should not be used to imitate Redux or global architecture without clear need.`,
  faqs: [
    {
      question: 'When do I prefer useReducer over a custom hook?',
      answer: 'Often together. A custom hook can expose a reducer-based workflow so consumers get a simple API while the transition logic stays centralized.',
    },
  ],
  keyTakeaways: [
    'useReducer is best for complex local transitions, not every state value.',
    'Reducers keep state changes explicit through named actions.',
    'Pure reducers are easier to test and debug than scattered setter logic.',
    'Use useState for simple values and useReducer for event-driven workflows.',
  ],
  relatedTopics: ['react-hooks-usestate', 'react-custom-hooks', 'react-state', 'react-context'],
};
