import { aemInterviewPrep } from './aem';
import type { InterviewPrepQuestion, InterviewPrepSection } from './types';

export const interviewPrepSections: InterviewPrepSection[] = [
  aemInterviewPrep,
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
