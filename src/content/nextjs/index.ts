// Next.js content barrel — all Next.js topics exported from one place.
// When adding a new Next.js topic: import it here and add it to nextjsContentMap.
import type { TopicContent } from '../types';

// Fundamentals
import { nextjsIntroduction }      from './fundamentals/introduction';
import { nextjsProjectStructure }  from './fundamentals/project-structure';
import { nextjsAppRouter }         from './fundamentals/app-router';

// Rendering
import { nextjsServerComponents }  from './rendering/server-components';
import { nextjsClientComponents }  from './rendering/client-components';
import { nextjsSSR }               from './rendering/ssr';
import { nextjsSSG }               from './rendering/ssg';
import { nextjsISR }               from './rendering/isr';

// Data Fetching
import { nextjsFetchApi }          from './data-fetching/fetch-api';
import { nextjsServerDataFetching } from './data-fetching/server-data-fetching';
import { nextjsClientDataFetching } from './data-fetching/client-data-fetching';
import { nextjsRevalidation }      from './data-fetching/revalidation';
import { nextjsCaching }           from './data-fetching/caching';

// Routing
import { nextjsDynamicRoutes }     from './routing/dynamic-routes';
import { nextjsNestedRoutes }      from './routing/nested-routes';
import { nextjsRouteGroups }       from './routing/route-groups';

// API Layer
import { nextjsRouteHandlers }     from './api-layer/route-handlers';
import { nextjsRestApis }          from './api-layer/rest-apis';
import { nextjsMiddleware }        from './api-layer/middleware';
import { nextjsAuthentication }    from './api-layer/authentication';

// Performance
import { nextjsImageOptimization } from './performance/image-optimization';
import { nextjsLazyLoading }       from './performance/lazy-loading';
import { nextjsStreaming }         from './performance/streaming';
import { nextjsMetadataApi }       from './performance/metadata-api';

// Deployment
import { nextjsVercel }            from './deployment/vercel';
import { nextjsEnvironmentVariables } from './deployment/environment-variables';
import { nextjsCICD }              from './deployment/cicd';
import { nextjsMonitoring }        from './deployment/monitoring';

// Advanced
import { nextjsServerActions }     from './advanced/server-actions';
import { nextjsEdgeRuntime }       from './advanced/edge-runtime';
import { nextjsCachingStrategies } from './advanced/caching-strategies';
import { nextjsEnterpriseArchitecture } from './advanced/enterprise-architecture';
import { nextjsExpandedTopics }    from './expanded/expanded-topics';

export const nextjsContentMap: Record<string, TopicContent> = {
  // Fundamentals
  'nextjs-introduction':       nextjsIntroduction,
  'nextjs-project-structure':  nextjsProjectStructure,
  'nextjs-app-router':         nextjsAppRouter,

  // Rendering
  'nextjs-server-components':  nextjsServerComponents,
  'nextjs-client-components':  nextjsClientComponents,
  'nextjs-ssr':                nextjsSSR,
  'nextjs-ssg':                nextjsSSG,
  'nextjs-isr':                nextjsISR,

  // Data Fetching
  'nextjs-fetch-api':           nextjsFetchApi,
  'nextjs-server-data-fetching': nextjsServerDataFetching,
  'nextjs-client-data-fetching': nextjsClientDataFetching,
  'nextjs-revalidation':        nextjsRevalidation,
  'nextjs-caching':             nextjsCaching,

  // Routing
  'nextjs-dynamic-routes':     nextjsDynamicRoutes,
  'nextjs-nested-routes':      nextjsNestedRoutes,
  'nextjs-route-groups':       nextjsRouteGroups,

  // API Layer
  'nextjs-route-handlers':     nextjsRouteHandlers,
  'nextjs-rest-apis':          nextjsRestApis,
  'nextjs-middleware':         nextjsMiddleware,
  'nextjs-authentication':     nextjsAuthentication,

  // Performance
  'nextjs-image-optimization': nextjsImageOptimization,
  'nextjs-lazy-loading':       nextjsLazyLoading,
  'nextjs-streaming':          nextjsStreaming,
  'nextjs-metadata-api':       nextjsMetadataApi,

  // Deployment
  'nextjs-vercel-deployment':      nextjsVercel,
  'nextjs-environment-variables':  nextjsEnvironmentVariables,
  'nextjs-cicd':                   nextjsCICD,
  'nextjs-monitoring':             nextjsMonitoring,

  // Advanced
  'nextjs-server-actions':         nextjsServerActions,
  'nextjs-edge-runtime':           nextjsEdgeRuntime,
  'nextjs-caching-strategies':     nextjsCachingStrategies,
  'nextjs-enterprise-architecture': nextjsEnterpriseArchitecture,

  // Expanded
  ...nextjsExpandedTopics,
};
