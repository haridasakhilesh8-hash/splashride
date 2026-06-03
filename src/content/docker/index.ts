import type { TopicContent } from '../types';
import {
  cicdIntegration,
  containerLifecycle,
  containersVsVirtualMachines,
  dockerArchitecture,
  dockerCompose,
  dockerHub,
  dockerImages,
  dockerNetworking,
  dockerOverview,
  dockerSecurity,
  dockerVolumes,
  dockerfile,
  enterpriseDeploymentPatterns,
  multiStageBuilds,
} from './docker-content';

export const dockerContentMap: Record<string, TopicContent> = {
  'docker-overview': dockerOverview,
  'docker-containers-vs-virtual-machines': containersVsVirtualMachines,
  'docker-architecture': dockerArchitecture,
  'docker-images': dockerImages,
  'docker-hub': dockerHub,
  'docker-container-lifecycle': containerLifecycle,
  'docker-dockerfile': dockerfile,
  'docker-multi-stage-builds': multiStageBuilds,
  'docker-volumes': dockerVolumes,
  'docker-networking': dockerNetworking,
  'docker-compose': dockerCompose,
  'docker-security': dockerSecurity,
  'docker-cicd-integration': cicdIntegration,
  'docker-enterprise-deployment-patterns': enterpriseDeploymentPatterns,
};
