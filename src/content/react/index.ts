// React content barrel — all React topics exported from one place.
// When adding a new React topic: import it here and add it to reactContentMap.
import type { TopicContent } from '../types';

// Fundamentals
import { jsx }               from './fundamentals/jsx';
import { reactComponents }   from './fundamentals/components';
import { reactProps }        from './fundamentals/props';
import { reactState }        from './fundamentals/state';

// Hooks
import { reactUseState }     from './hooks/useState';
import { reactUseEffect }    from './hooks/useEffect';
import { reactUseMemo }      from './hooks/useMemo';
import { reactUseCallback }  from './hooks/useCallback';
import { reactUseRef }       from './hooks/useRef';
import { reactCustomHooks }  from './hooks/customHooks';

// State Management
import { reactContextApi }   from './state-management/contextApi';
import { reactReduxToolkit } from './state-management/reduxToolkit';
import { reactZustand }      from './state-management/zustand';

// Routing
import { reactRouter }         from './routing/reactRouter';
import { reactNestedRoutes }   from './routing/nestedRoutes';
import { reactProtectedRoutes} from './routing/protectedRoutes';

// Performance
import { reactMemo }          from './performance/reactMemo';
import { reactLazyLoading }   from './performance/lazyLoading';
import { reactCodeSplitting } from './performance/codeSplitting';

// Forms
import { reactControlledComponents } from './forms/controlledComponents';
import { reactHookForm }             from './forms/reactHookForm';

// API Integration
import { reactFetchApi }      from './api-integration/fetchApi';
import { reactAxios }         from './api-integration/axios';
import { reactErrorHandling } from './api-integration/errorHandling';

// Advanced
import { reactHOC }                from './advanced/hoc';
import { reactRenderProps }        from './advanced/renderProps';
import { reactCompoundComponents } from './advanced/compoundComponents';

export const reactContentMap: Record<string, TopicContent> = {
  // Fundamentals
  'react-jsx':        jsx,
  'react-components': reactComponents,
  'react-props':      reactProps,
  'react-state':      reactState,

  // Hooks
  'react-hooks-usestate':    reactUseState,
  'react-hooks-useeffect':   reactUseEffect,
  'react-hooks-usememo':     reactUseMemo,
  'react-hooks-usecallback': reactUseCallback,
  'react-hooks-useref':      reactUseRef,
  'react-custom-hooks':      reactCustomHooks,

  // State Management
  'react-context':        reactContextApi,
  'react-redux-toolkit':  reactReduxToolkit,
  'react-zustand':        reactZustand,

  // Routing
  'react-router':           reactRouter,
  'react-nested-routes':    reactNestedRoutes,
  'react-protected-routes': reactProtectedRoutes,

  // Performance
  'react-memo':        reactMemo,
  'react-lazy-loading': reactLazyLoading,
  'react-performance': reactCodeSplitting,

  // Forms
  'react-controlled-components': reactControlledComponents,
  'react-hook-form':             reactHookForm,

  // API Integration
  'react-fetch-api':      reactFetchApi,
  'react-axios':          reactAxios,
  'react-error-handling': reactErrorHandling,

  // Advanced
  'react-hoc':                 reactHOC,
  'react-render-props':        reactRenderProps,
  'react-compound-components': reactCompoundComponents,
};
