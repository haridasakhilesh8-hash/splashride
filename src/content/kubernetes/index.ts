// Kubernetes content barrel
import type { TopicContent } from '../types';
import { kubernetesTopics } from './kubernetes-content';
import { k8sExpandedTopics } from './expanded-topics';

export const k8sContentMap: Record<string, TopicContent> = kubernetesTopics.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {
    ...k8sExpandedTopics,
  } as Record<string, TopicContent>
);
