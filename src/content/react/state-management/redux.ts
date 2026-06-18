import type { TopicContent } from '../../types';

export const reactRedux: TopicContent = {
  slug: 'react-redux',
  title: 'Redux',
  description: 'Understand classic Redux ideas so you can explain centralized event-driven state clearly and know when Redux is still justified in modern React.',
  applicableVersions: ['React 16+', 'React 18', 'Redux 5.x'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'Redux is a predictable state container built around one-way data flow: dispatch an action, run a reducer, and derive UI from the store. The modern implementation path is usually Redux Toolkit.',
  whatIsIt: `Redux centralizes state transitions through actions and reducers.

- Actions describe what happened
- Reducers decide how state changes
- The store holds the current state tree
- Components subscribe to selected slices of that state`,
  whyWeNeedIt: `Even when teams choose Redux Toolkit today, they still need to understand the underlying Redux model. It explains event-driven state, normalized entities, explicit transitions, and why some enterprise apps still prefer a central store.`,
  realWorldUsage: `Redux remains relevant in large consoles, complex multistep product workflows, and applications where many teams need clear conventions, auditability, and explicit state transition history.`,
  howItWorks: `A component dispatches an action such as cart/itemAdded. The reducer receives the current state and that action, returns the next state, and subscribed components re-render if their selected data changed.`,
  example: {
    title: 'Redux Data Flow',
    description: 'The conceptual flow matters even when Redux Toolkit generates much of the boilerplate.',
    code: [
      {
        label: 'Action -> Reducer -> Store',
        language: 'ts',
        code: `type CartAction =
  | { type: 'itemAdded'; item: { id: string; qty: number } }
  | { type: 'itemRemoved'; id: string };

type CartState = {
  items: Array<{ id: string; qty: number }>;
};

const initialState: CartState = { items: [] };

function reducer(state = initialState, action: CartAction): CartState {
  switch (action.type) {
    case 'itemAdded':
      return { ...state, items: [...state.items, action.item] };
    case 'itemRemoved':
      return { ...state, items: state.items.filter((item) => item.id !== action.id) };
    default:
      return state;
  }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Is Redux outdated?',
      answer: 'Classic handwritten Redux ceremony is outdated for most teams, but the Redux model is still important and Redux Toolkit remains widely used in large applications.',
    },
    {
      question: 'Should server state live in Redux by default?',
      answer: 'Usually no. Teams now separate client state from server cache more intentionally and often use React Query or RTK Query for async data.',
    },
  ],
  productionIssues: [
    'A global store becomes a dumping ground when ownership boundaries are weak.',
    'Overly broad selectors cause unnecessary renders across large screens.',
    'Duplicating server data and UI state in the same store creates conflicting truths quickly.',
  ],
  bestPractices: [
    'Use Redux only when centralized state and conventions genuinely help.',
    'Normalize entities and derive views through selectors.',
    'Keep reducers pure and state serializable.',
    'Prefer Redux Toolkit for real implementations instead of handwritten classic Redux boilerplate.',
  ],
  architectNote: `Redux is strongest when state logic itself is one of the hard problems in the product. If the complexity is mostly data fetching, local UI state, or small-team app flow, lighter tools are often a better fit.`,
  faqs: [
    {
      question: 'Why still teach Redux if Redux Toolkit exists?',
      answer: 'Because Redux Toolkit builds on Redux concepts. Without understanding actions, reducers, and centralized event flow, teams often misuse the higher-level tooling.',
    },
  ],
  keyTakeaways: [
    'Redux is a centralized event-driven state model.',
    'The conceptual model still matters even if Redux Toolkit is the modern API.',
    'Not every React app should use Redux.',
    'State ownership and selector discipline matter more than store size alone.',
  ],
  relatedTopics: ['react-redux-toolkit', 'react-zustand', 'react-context', 'react-react-query'],
};
