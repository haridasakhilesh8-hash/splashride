// AEM content barrel — all AEM topics exported from one place.
// When adding a new AEM topic: import it here and add it to aemContentMap.
import type { TopicContent } from '../types';
import { components } from './components';
import { slingModels } from './sling-models';
import { htl } from './htl';
import { dispatcher } from './dispatcher';
import { contentFragments } from './content-fragments';
import { experienceFragments } from './experience-fragments';
import { osgi } from './osgi';
import { editableTemplates } from './editable-templates';
import { aemCloudService } from './aem-cloud-service';
import { templates } from './templates';
import { architecture, jcr, crxde, sling, clientLibraries, msm, workflows, graphql } from './stubs';
import {
  aemSitesAssetsForms,
  oakRepository,
  queryBuilderAndIndexing,
  coreComponentsAndDialogs,
  pageAuthoringAndUniversalEditor,
  launchesAndLocalization,
  headlessAem,
  cloudManagerAndDevops,
  aemPerformance,
  eventsAndJobs,
  aemSecurity,
  assetsAndDam,
  aemIntegrations,
  edgeDeliveryServices,
  aemTesting,
  productionTroubleshooting,
} from './expansion-topics';

export const aemContentMap: Record<string, TopicContent> = {
  'components': components,
  'sling-models': slingModels,
  'htl': htl,
  'dispatcher': dispatcher,
  'content-fragments': contentFragments,
  'experience-fragments': experienceFragments,
  'osgi': osgi,
  'editable-templates': editableTemplates,
  'aem-cloud-service': aemCloudService,
  'templates': templates,
  'architecture': architecture,
  'jcr': jcr,
  'crxde': crxde,
  'sling': sling,
  'client-libraries': clientLibraries,
  'msm': msm,
  'workflows': workflows,
  'graphql': graphql,
  'aem-sites-assets-forms': aemSitesAssetsForms,
  'oak-repository': oakRepository,
  'query-builder-and-indexing': queryBuilderAndIndexing,
  'core-components-and-dialogs': coreComponentsAndDialogs,
  'page-authoring-and-universal-editor': pageAuthoringAndUniversalEditor,
  'launches-and-localization': launchesAndLocalization,
  'headless-aem': headlessAem,
  'cloud-manager-and-devops': cloudManagerAndDevops,
  'aem-performance': aemPerformance,
  'events-and-jobs': eventsAndJobs,
  'aem-security': aemSecurity,
  'assets-and-dam': assetsAndDam,
  'aem-integrations': aemIntegrations,
  'edge-delivery-services': edgeDeliveryServices,
  'aem-testing': aemTesting,
  'production-troubleshooting': productionTroubleshooting,
};
