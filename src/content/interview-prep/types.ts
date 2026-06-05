export type ExperienceLevelId = 'beginner' | 'mid' | 'senior' | 'architect';

export interface ExperienceLevel {
  id: ExperienceLevelId;
  label: string;
  years: string;
  summary: string;
}

export interface RoleAnswer {
  junior: string;
  mid: string;
  senior: string;
  architect: string;
}

export interface InterviewPrepTopicGroup {
  id: string;
  title: string;
  description: string;
  topics: string[];
}

export interface InterviewPrepTopicMetadata {
  category: string;
  topicGroup: string;
  totalQuestions: number;
  estimatedPreparationMinutes: number;
  questionsPerPage: number;
  totalPages: number;
  difficultyCounts: Record<'Beginner' | 'Intermediate' | 'Advanced' | 'Architect', number>;
}

export interface InterviewPrepPaginationConfig {
  questionsPerPage: number;
  ordering: 'most-asked-first';
}

export interface ProductionScenario {
  id: string;
  title: string;
  topic: string;
  problem: string;
  rootCauseAnalysis: string[];
  troubleshootingSteps: string[];
  expectedInterviewAnswer: string;
  seniorApproach: string;
  architectApproach: string;
  relatedQuestions: string[];
}

export interface MockInterviewProfile {
  id: ExperienceLevelId;
  label: string;
  description: string;
  questionCount: number;
  recommendedMinutes: number;
}

export interface RapidRevisionPlan {
  id: '15-min' | '30-min' | '60-min';
  label: string;
  minutes: number;
  description: string;
  questionIds: string[];
}

export interface InterviewPrepTopicPreparationSet {
  category: string;
  mostAskedQuestionIds: string[];
  top5QuestionIds: string[];
  top10QuestionIds: string[];
  thirtyMinuteQuestionIds: string[];
  sixtyMinuteQuestionIds: string[];
  lastMinuteQuestionIds: string[];
}

export interface InterviewPrepQuestion {
  id: string;
  technologyId: string;
  topicGroup: string;
  category: string;
  questionType: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  realProjectExample: string;
  productionScenario: string;
  commonMistakes: string[];
  followUpQuestions: string[];
  interviewerExpectation: string;
  frequencyScore: number;
  commonWrongAnswer: string;
  architectPerspective: string;
  keyTakeaway: string;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Architect';
  experienceLevel: ExperienceLevelId;
  relatedTopics: string[];
  roleAnswers: RoleAnswer;
  isMostAsked?: boolean;
  mostAskedRank?: number;
  isRapidRevision?: boolean;
  scenarioIds?: string[];
}

export interface InterviewPrepSection {
  technologyId: string;
  technologyLabel: string;
  title: string;
  description: string;
  lastReviewed: string;
  categories: string[];
  questionTypes: string[];
  experienceLevels: ExperienceLevel[];
  topicGroups: InterviewPrepTopicGroup[];
  topicMetadata: InterviewPrepTopicMetadata[];
  pagination: InterviewPrepPaginationConfig;
  productionScenarios: ProductionScenario[];
  mockInterviewProfiles: MockInterviewProfile[];
  rapidRevisionPlans: RapidRevisionPlan[];
  topicPreparationSets: InterviewPrepTopicPreparationSet[];
  questions: InterviewPrepQuestion[];
}
