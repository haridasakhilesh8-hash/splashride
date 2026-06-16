import { aemInterviewPrep } from './aem';
import { aiLlmInterviewPrep } from './ai-llm';
import { awsInterviewPrep } from './aws';
import { contentfulInterviewPrep } from './contentful';
import { coreJavaInterviewPrep } from './core-java';
import { dockerInterviewPrep } from './docker';
import { kubernetesInterviewPrep } from './kubernetes';
import { nextjsInterviewPrep } from './nextjs';
import { reactInterviewPrep } from './react';
import { springBootInterviewPrep } from './spring-boot';
import { azureInterviewPrep } from './azure';
import type { InterviewPrepQuestion, InterviewPrepSection } from './types';

export const interviewPrepSections: InterviewPrepSection[] = [
  aemInterviewPrep,
  contentfulInterviewPrep,
  reactInterviewPrep,
  nextjsInterviewPrep,
  coreJavaInterviewPrep,
  springBootInterviewPrep,
  awsInterviewPrep,
  dockerInterviewPrep,
  kubernetesInterviewPrep,
  azureInterviewPrep,
  aiLlmInterviewPrep,
];

export function getInterviewPrepSection(technologyId: string): InterviewPrepSection | null {
  return interviewPrepSections.find((section) => section.technologyId === technologyId) ?? null;
}

export function getActiveInterviewPrepSections(): InterviewPrepSection[] {
  return interviewPrepSections;
}

export function getAllInterviewQuestions(): InterviewPrepQuestion[] {
  return interviewPrepSections.flatMap((section) => section.questions);
}

export function getInterviewPrepQuestion(questionId: string): InterviewPrepQuestion | null {
  for (const section of interviewPrepSections) {
    const question = section.questions.find((item) => item.id === questionId);
    if (question) return question;
  }
  return null;
}

export function getInterviewPrepStats() {
  const sections = getActiveInterviewPrepSections();
  const questions = getAllInterviewQuestions();
  const categories = new Set(sections.flatMap((section) => section.categories));
  const experienceLevels = new Set(sections.flatMap((section) => section.experienceLevels.map((level) => level.id)));

  return {
    technologiesCovered: sections.length,
    totalQuestions: questions.length,
    totalTopics: sections.reduce((sum, section) => sum + section.topicGroups.reduce((topicSum, group) => topicSum + group.topics.length, 0), 0),
    productionScenarios: sections.reduce((sum, section) => sum + section.productionScenarios.length, 0),
    mockInterviews: sections.reduce((sum, section) => sum + section.mockInterviewProfiles.length, 0),
    categories: categories.size,
    experienceLevels: experienceLevels.size,
  };
}

export type { ExperienceLevel, ExperienceLevelId, InterviewPrepQuestion, InterviewPrepSection } from './types';
