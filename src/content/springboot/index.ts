// Spring Boot content barrel — all topics exported from one place.
import type { TopicContent } from '../types';

// Core
import { springIntroduction }      from './core/introduction';
import { springAutoConfiguration } from './core/auto-configuration';
import { springStarters }          from './core/starters';
import { springProperties }        from './core/properties';

// IoC & DI
import { springIocContainer }  from './ioc/ioc-container';
import { springDI }            from './ioc/dependency-injection';
import { springBeanLifecycle } from './ioc/bean-lifecycle';
import { springBeanScopes }    from './ioc/bean-scopes';

// REST APIs
import { springControllers }       from './rest/controllers';
import { springRequestMapping }    from './rest/request-mapping';
import { springRequestParams }     from './rest/request-params';
import { springPathVariables }     from './rest/path-variables';
import { springExceptionHandling } from './rest/exception-handling';

// Data Layer
import { springDataJpa }        from './data/spring-data-jpa';
import { springEntityMapping }  from './data/entity-mapping';
import { springRepositories }   from './data/repositories';
import { springPagination }     from './data/pagination';
import { springAuditing }       from './data/auditing';

// Database
import { springMysql }        from './database/mysql';
import { springPostgresql }   from './database/postgresql';
import { springTransactions } from './database/transactions';

// Security
import { springSecurityOverview } from './security/spring-security';
import { springAuthentication }   from './security/authentication';
import { springAuthorization }    from './security/authorization';
import { springJwt }              from './security/jwt';

// Testing
import { springUnitTesting }        from './testing/unit-testing';
import { springIntegrationTesting } from './testing/integration-testing';
import { springMockMvc }            from './testing/mockmvc';

// Microservices
import { springServiceCommunication } from './microservices/service-communication';
import { springApiGateway }           from './microservices/api-gateway';
import { springServiceDiscovery }     from './microservices/service-discovery';
import { springConfigServer }         from './microservices/config-server';

// Production
import { springLogging }            from './production/logging';
import { springProfiles }           from './production/profiles';
import { springActuator }           from './production/actuator';
import { springMonitoring }         from './production/monitoring';
import { springPerformanceTuning }  from './production/performance-tuning';
import { springExpandedTopics }     from './expanded-topics';

export const springContentMap: Record<string, TopicContent> = {
  // Core
  'spring-introduction':      springIntroduction,
  'spring-auto-configuration': springAutoConfiguration,
  'spring-starters':          springStarters,
  'spring-properties':        springProperties,

  // IoC & DI
  'spring-ioc':            springIocContainer,
  'spring-di':             springDI,
  'spring-bean-lifecycle': springBeanLifecycle,
  'spring-bean-scopes':    springBeanScopes,

  // REST APIs
  'spring-controllers':       springControllers,
  'spring-request-mapping':   springRequestMapping,
  'spring-request-params':    springRequestParams,
  'spring-path-variables':    springPathVariables,
  'spring-exception-handling': springExceptionHandling,

  // Data Layer
  'spring-data-jpa':       springDataJpa,
  'spring-entity-mapping': springEntityMapping,
  'spring-repositories':   springRepositories,
  'spring-pagination':     springPagination,
  'spring-auditing':       springAuditing,

  // Database
  'spring-mysql':        springMysql,
  'spring-postgresql':   springPostgresql,
  'spring-transactions': springTransactions,

  // Security
  'spring-security':       springSecurityOverview,
  'spring-authentication': springAuthentication,
  'spring-authorization':  springAuthorization,
  'spring-jwt':            springJwt,

  // Testing
  'spring-unit-testing':        springUnitTesting,
  'spring-integration-testing': springIntegrationTesting,
  'spring-mockmvc':             springMockMvc,

  // Microservices
  'spring-service-communication': springServiceCommunication,
  'spring-api-gateway':           springApiGateway,
  'spring-service-discovery':     springServiceDiscovery,
  'spring-config-server':         springConfigServer,

  // Production
  'spring-logging':             springLogging,
  'spring-profiles':            springProfiles,
  'spring-actuator':            springActuator,
  'spring-monitoring':          springMonitoring,
  'spring-performance-tuning':  springPerformanceTuning,

  // Expanded
  ...springExpandedTopics,
};
