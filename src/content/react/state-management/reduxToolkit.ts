import type { TopicContent } from '../../types';

export const reactReduxToolkit: TopicContent = {
  slug: 'react-redux-toolkit',
  title: 'Redux Toolkit',
  description: 'Master Redux Toolkit — the modern, opinionated way to write Redux. Learn slices, thunks, RTK Query, and when Redux is actually the right choice for enterprise React applications.',
  applicableVersions: ['React 16+', 'React 18', 'Redux Toolkit 2.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'Redux Toolkit (RTK) is the official, recommended way to write Redux. It eliminates the boilerplate of classic Redux with createSlice (auto-generates actions and reducers), configureStore (sensible defaults), and RTK Query (data fetching and caching). If you need Redux, use RTK — never plain Redux in 2024.',
  whatIsIt: `Redux Toolkit is a set of utilities that make Redux practical:

- **\`createSlice\`** — defines state, reducers, and actions in one place (uses Immer under the hood, so you can "mutate" state directly)
- **\`configureStore\`** — sets up the Redux store with Redux DevTools and middleware automatically
- **\`createAsyncThunk\`** — handles async operations (API calls) with automatic pending/fulfilled/rejected action dispatching
- **\`RTK Query\`** — a full data fetching and caching solution built on top of Redux

Classic Redux required separate files for action types, action creators, and reducers. RTK collapses all of this into a single slice file.`,
  whyWeNeedIt: `Context API has performance limitations for frequently-changing shared state. Zustand is great for medium complexity. Redux shines when:

- **Large teams** need strict conventions and predictable patterns
- **Complex state** with many interdependent slices
- **Time-travel debugging** is needed (Redux DevTools)
- **Audit trails** — every state change is a logged, named action
- **RTK Query** provides a unified data fetching layer with caching, invalidation, and optimistic updates`,
  realWorldUsage: `Redux Toolkit is common in:

- **Banking and insurance** — complex claim/policy workflows with many steps and interdependent state
- **E-commerce** — cart, checkout, inventory, user preferences all in one store
- **Healthcare** — patient records, appointment scheduling, complex forms
- **Large SaaS dashboards** — filters, pagination, sorting, selection all managed globally

RTK Query is increasingly replacing React Query in Redux-heavy apps, providing a single solution for both client and server state.`,
  howItWorks: `**Store setup:**
One store holds the entire app state as a plain JS object. The store is created once and provided to the app via the Redux \`<Provider>\`.

**Slices:**
Each feature gets a "slice" — a self-contained piece of state with its own reducers and actions.

**Dispatch and select:**
- \`useDispatch()\` — returns the dispatch function to trigger actions
- \`useSelector(selector)\` — reads from the store and re-renders when the selected value changes

**Immer:**
RTK uses Immer internally, so reducers can write \`state.value = newValue\` directly instead of returning a new object. Immer converts this to an immutable update under the hood.`,
  example: {
    title: 'Redux Toolkit in a Claims Management App',
    description: 'Slice definition, async thunks, and component integration.',
    code: [
      {
        label: 'Claims Slice',
        language: 'tsx',
        code: `import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Claim {
  id: string;
  policyNumber: string;
  status: 'open' | 'in-review' | 'approved' | 'rejected';
  amount: number;
}

interface ClaimsState {
  items: Claim[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClaimsState = {
  items: [],
  selectedId: null,
  loading: false,
  error: null,
};

// Async thunk — handles API call with auto pending/fulfilled/rejected
export const fetchClaims = createAsyncThunk('claims/fetchAll', async (userId: string) => {
  const res = await fetch(\`/api/users/\${userId}/claims\`);
  if (!res.ok) throw new Error('Failed to fetch claims');
  return res.json() as Promise<Claim[]>;
});

export const claimsSlice = createSlice({
  name: 'claims',
  initialState,
  reducers: {
    selectClaim(state, action: PayloadAction<string>) {
      state.selectedId = action.payload; // Immer allows direct mutation
    },
    clearSelection(state) {
      state.selectedId = null;
    },
    updateClaimStatus(state, action: PayloadAction<{ id: string; status: Claim['status'] }>) {
      const claim = state.items.find(c => c.id === action.payload.id);
      if (claim) claim.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchClaims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { selectClaim, clearSelection, updateClaimStatus } = claimsSlice.actions;`,
      },
      {
        label: 'Store Setup and Typed Hooks',
        language: 'tsx',
        code: `// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { claimsSlice } from './claimsSlice';
import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    claims: claimsSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks — use these everywhere instead of raw useSelector/useDispatch
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Component usage
function ClaimsDashboard() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.claims);
  const userId = useAppSelector(state => state.user.id);

  useEffect(() => {
    dispatch(fetchClaims(userId));
  }, [dispatch, userId]);

  const handleSelect = (id: string) => dispatch(selectClaim(id));

  if (loading) return <Spinner />;
  if (error)   return <ErrorBanner message={error} />;
  return <ClaimsList claims={items} onSelect={handleSelect} />;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use Redux or Zustand in 2024?',
      answer: 'For most apps: Zustand. It is simpler, has less boilerplate, and handles 90% of state management needs. Use Redux Toolkit when: (1) you need strict conventions for a large team, (2) you need RTK Query\'s advanced caching features, (3) you need time-travel debugging, (4) the app already uses Redux.',
    },
    {
      question: 'Can I mutate state directly in RTK reducers?',
      answer: 'Yes — inside createSlice reducers only. RTK uses Immer, which intercepts the mutations and produces a new immutable state object. Outside of Immer-wrapped reducers (e.g., in component code), you must never mutate Redux state directly.',
    },
    {
      question: 'What is the difference between Redux Toolkit and RTK Query?',
      answer: 'Redux Toolkit is the core library for state management (slices, store, thunks). RTK Query is an optional add-on for data fetching and caching built on top of RTK. RTK Query competes with React Query — if you are already using Redux, RTK Query gives you a unified solution.',
    },
  ],
  productionIssues: [
    '**Performance: Large selectors without memoisation** — useSelector runs on every store update. For derived data (filtered lists, computed totals), use createSelector (Reselect) to memoise.',
    '**Over-fetching in RTK Query** — Multiple components subscribing to the same endpoint trigger one shared request. Ensure endpoints are defined with the same cache key for proper deduplication.',
    '**Normalisation** — Storing nested data (claims with nested policies) causes complex update logic. Use createEntityAdapter or normalise data at the API layer.',
    '**Bundle size** — Redux + RTK + React-Redux adds ~20KB. For small apps, this is unnecessary overhead. Use Zustand (1KB) instead.',
  ],
  bestPractices: [
    'Use typed hooks (useAppDispatch, useAppSelector) everywhere — never raw hooks',
    'One slice per feature — co-locate with the feature folder',
    'Use createSelector for derived/filtered data to prevent unnecessary re-renders',
    'Use createEntityAdapter for collections of items (normalised state)',
    'Use RTK Query for all API calls if you are already using Redux',
    'Never put non-serialisable values in the store (functions, class instances, Promises)',
  ],
  architectNote: `Redux is a powerful tool that many teams reach for too early. The overhead of actions, reducers, selectors, and thunks is justified when the app is genuinely complex and the team is large enough to benefit from strict conventions. For a team of 2–5 developers building a typical SaaS product, Zustand will get you 90% of the way with 10% of the complexity. Reserve Redux for apps where the state logic itself is the hard problem — complex multi-step workflows, real-time collaboration, or when RTK Query\'s caching features are genuinely needed.`,
  faqs: [
    {
      question: 'Do I need to use Redux DevTools?',
      answer: 'Not required, but highly recommended during development. configureStore enables DevTools automatically. It lets you inspect every dispatched action, view the state at any point in time, and replay actions — invaluable for debugging complex state issues.',
    },
    {
      question: 'What is createEntityAdapter?',
      answer: 'createEntityAdapter normalises collections into a { ids: [], entities: {} } structure and provides pre-built reducers (addOne, updateOne, removeOne, setAll) and selectors. Use it for any slice that manages a list of items with IDs — it eliminates repetitive CRUD reducer code.',
    },
  ],
  keyTakeaways: [
    'RTK eliminates classic Redux boilerplate with createSlice and configureStore',
    'createSlice auto-generates action creators and uses Immer for immutable updates',
    'createAsyncThunk handles API calls with automatic pending/fulfilled/rejected states',
    'Always use typed hooks (useAppDispatch, useAppSelector) for TypeScript safety',
    'Use createSelector for memoised derived data',
    'For most apps, Zustand is simpler — use Redux when complexity justifies it',
  ],
  relatedTopics: ['react-context', 'react-zustand', 'react-custom-hooks', 'react-hooks-usestate'],
};
