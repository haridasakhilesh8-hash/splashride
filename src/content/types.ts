export interface CodeExample {
  label: string;
  language: string;
  code: string;
}

export interface TopicExample {
  title: string;
  description: string;
  code: CodeExample[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Confusion {
  question: string;
  answer: string;
}

export interface TopicContent {
  slug: string;
  title: string;
  description: string;
  applicableVersions: string[];
  lastReviewed: string;
  quickUnderstanding: string;
  whatIsIt: string;
  whyWeNeedIt: string;
  realWorldUsage: string;
  howItWorks: string;
  example: TopicExample;
  commonConfusions: Confusion[];
  productionIssues: string[];
  bestPractices: string[];
  architectNote: string;
  faqs: FAQ[];
  keyTakeaways: string[];
  relatedTopics: string[];
  hasDiagram?: boolean;
  diagramType?: string;
}
