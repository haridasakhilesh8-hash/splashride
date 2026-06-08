export function getTechnologyPath(techId: string) {
  return `/technologies/${techId}`;
}

export function getTechnologyTopicPath(techId: string, slug: string) {
  return `/technologies/${techId}/topic/${slug}`;
}

export function getLegacyTechnologyPath(techId: string) {
  return `/technology/${techId}`;
}

export function getLegacyTechnologyTopicPath(techId: string, slug: string) {
  return `/technology/${techId}/topic/${slug}`;
}

export function getInterviewPrepPath(techId: string) {
  return `/interview-prep/${techId}`;
}

export function getCareerPathPath(slug: string) {
  return `/career-paths/${slug}`;
}
