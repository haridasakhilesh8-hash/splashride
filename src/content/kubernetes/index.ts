// Kubernetes content barrel
import type { TopicContent } from '../types';
import { kubernetesTopics } from './kubernetes-content';

export const k8sContentMap: Record<string, TopicContent> = kubernetesTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, TopicContent>
);
