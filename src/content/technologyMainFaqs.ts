import type { FAQ } from './types';
import type { TechSection } from '../lib/navigation';

interface TechFaqProfile {
  whatIs: string;
  whoShouldLearn: string;
  prerequisites: string;
  learningTime: string;
  careerGrowth: string;
  beginnerFriendly: string;
  nextLearning: string;
}

const faqProfiles: Record<string, TechFaqProfile> = {
  aem: {
    whatIs: 'AEM is Adobe Experience Manager, an enterprise CMS and digital experience platform used to build author-friendly, component-driven websites and content systems.',
    whoShouldLearn: 'AEM is a strong fit for Java developers, CMS engineers, frontend integrators, and teams working on enterprise content platforms.',
    prerequisites: 'HTML, CSS, JavaScript, Java basics, and general CMS or web-delivery fundamentals.',
    learningTime: 'A practical AEM learning path usually takes around 10 to 14 weeks.',
    careerGrowth: 'AEM is valuable for enterprise CMS delivery, digital experience engineering, and long-term content platform roles.',
    beginnerFriendly: 'AEM is easier after Java and web basics are in place, so it is better for structured beginners than absolute beginners.',
    nextLearning: 'After AEM, a good next step is Cloud Service, Dispatcher, frontend frameworks, or headless CMS patterns.',
  },
  contentful: {
    whatIs: 'Contentful is a headless CMS used to model structured content and deliver it through APIs to websites, apps, and digital products.',
    whoShouldLearn: 'Contentful is ideal for frontend developers, headless CMS learners, and teams building composable content platforms.',
    prerequisites: 'HTML, CSS, JavaScript, API basics, and general frontend development understanding.',
    learningTime: 'Most developers can build practical Contentful confidence in 6 to 10 weeks.',
    careerGrowth: 'Contentful supports growth into headless CMS development, composable architecture, and frontend platform work.',
    beginnerFriendly: 'Contentful is beginner-friendly once API and frontend basics are comfortable.',
    nextLearning: 'After Contentful, common next steps are React, Next.js, GraphQL, and broader headless architecture patterns.',
  },
  sitecore: {
    whatIs: 'Sitecore is an enterprise CMS and digital experience platform used for structured content, personalization, and large-scale website delivery.',
    whoShouldLearn: 'Sitecore is best for CMS developers, enterprise frontend teams, and engineers working on DXP or migration projects.',
    prerequisites: 'HTML, CSS, JavaScript, CMS basics, and either .NET or headless delivery familiarity.',
    learningTime: 'A practical Sitecore learning path usually takes about 10 to 14 weeks.',
    careerGrowth: 'Sitecore experience helps with enterprise CMS engineering, digital experience delivery, and migration-focused roles.',
    beginnerFriendly: 'Sitecore is not the easiest first CMS, but it becomes manageable with strong web and CMS fundamentals.',
    nextLearning: 'After Sitecore, useful next topics include headless delivery, Next.js rendering hosts, and personalization architecture.',
  },
  'html-css': {
    whatIs: 'HTML and CSS are the core technologies used to structure, style, and make web interfaces responsive and accessible.',
    whoShouldLearn: 'HTML and CSS are essential for beginners, frontend developers, full-stack developers, and UI-focused engineers.',
    prerequisites: 'Basic computer and browser familiarity is enough to get started.',
    learningTime: 'Most learners can gain working HTML and CSS confidence in about 4 to 8 weeks.',
    careerGrowth: 'Strong HTML and CSS fundamentals support every frontend, UI, design-system, and web-platform path.',
    beginnerFriendly: 'Yes, HTML and CSS are among the best starting points for web development.',
    nextLearning: 'After HTML and CSS, the most natural next step is JavaScript, responsive design depth, and accessibility practice.',
  },
  javascript: {
    whatIs: 'JavaScript is the programming language that powers browser interactivity, frontend application logic, and many full-stack web workflows.',
    whoShouldLearn: 'JavaScript is a strong fit for frontend developers, full-stack learners, and anyone building interactive web products.',
    prerequisites: 'HTML, CSS, and basic programming comfort are the best starting prerequisites.',
    learningTime: 'A practical JavaScript roadmap usually takes around 6 to 10 weeks to become comfortable.',
    careerGrowth: 'JavaScript remains central to frontend engineering, product development, and modern full-stack roles.',
    beginnerFriendly: 'JavaScript is beginner-friendly when learned with real browser examples instead of only theory.',
    nextLearning: 'After JavaScript, most learners continue into React, Next.js, Node.js, and deeper browser or async patterns.',
  },
  python: {
    whatIs: 'Python is a practical general-purpose programming language used for backend services, automation, APIs, testing, scripting, and data-handling workflows.',
    whoShouldLearn: 'Python is a strong fit for beginners, backend learners, automation engineers, API developers, and teams building internal tools or operational scripts.',
    prerequisites: 'Basic programming logic and general comfort with writing small programs are enough to begin.',
    learningTime: 'A practical Python learning path usually takes around 6 to 10 weeks for strong fundamentals and common project workflows.',
    careerGrowth: 'Python supports growth into backend development, automation engineering, platform scripting, data engineering basics, and applied AI product work.',
    beginnerFriendly: 'Yes, Python is one of the most beginner-friendly languages because the syntax is readable and practical project feedback comes quickly.',
    nextLearning: 'After Python, common next steps are Flask or FastAPI, database work, testing depth, Docker, AWS, and full-stack integration with React or Next.js.',
  },
  react: {
    whatIs: 'React is a JavaScript library used to build reusable, state-driven user interfaces for modern web applications.',
    whoShouldLearn: 'React is ideal for frontend developers, product engineers, and full-stack developers building interactive UIs.',
    prerequisites: 'HTML, CSS, JavaScript, and comfortable DOM or component-level thinking.',
    learningTime: 'Most developers need about 6 to 8 weeks for practical React fundamentals and common patterns.',
    careerGrowth: 'React experience supports frontend engineering, product development, and modern SPA or platform roles.',
    beginnerFriendly: 'React is beginner-friendly after JavaScript fundamentals are solid.',
    nextLearning: 'After React, common next steps are Next.js, state management, testing, and performance optimization.',
  },
  nextjs: {
    whatIs: 'Next.js is a React framework used for full-stack web applications with routing, rendering, data fetching, and deployment conventions built in.',
    whoShouldLearn: 'Next.js is a strong fit for React developers, full-stack frontend teams, and engineers building production-ready web apps.',
    prerequisites: 'React fundamentals, JavaScript, routing basics, and general frontend application understanding.',
    learningTime: 'A practical Next.js learning path usually takes around 6 to 10 weeks.',
    careerGrowth: 'Next.js helps with frontend platform work, full-stack product delivery, and production-grade React roles.',
    beginnerFriendly: 'Next.js is approachable after React basics, but not usually the best very first frontend framework.',
    nextLearning: 'After Next.js, strong next areas include server actions, caching, SEO, deployment, and architecture patterns.',
  },
  java: {
    whatIs: 'Core Java teaches the language, object-oriented programming, collections, concurrency, and JVM foundations used across backend systems.',
    whoShouldLearn: 'Core Java is ideal for backend learners, enterprise developers, Spring Boot learners, and interview preparation tracks.',
    prerequisites: 'Basic programming logic and general coding comfort are enough to begin.',
    learningTime: 'Most learners need around 8 to 12 weeks for strong Core Java fundamentals.',
    careerGrowth: 'Java supports backend development, enterprise application work, and long-term platform engineering growth.',
    beginnerFriendly: 'Java is beginner-friendly if you want structured syntax and strong backend foundations.',
    nextLearning: 'After Core Java, common next steps are Spring Boot, SQL, REST APIs, and concurrency depth.',
  },
  springboot: {
    whatIs: 'Spring Boot is a Java backend framework used to build APIs, microservices, data-driven services, and production-ready enterprise applications.',
    whoShouldLearn: 'Spring Boot is best for Java developers, backend engineers, API builders, and enterprise application teams.',
    prerequisites: 'Core Java, HTTP basics, database awareness, and general backend development interest.',
    learningTime: 'A practical Spring Boot roadmap usually takes about 8 to 12 weeks.',
    careerGrowth: 'Spring Boot is highly relevant for backend engineering, enterprise services, and API or microservice delivery roles.',
    beginnerFriendly: 'Spring Boot is approachable once Core Java is comfortable, but it is not the best first coding framework.',
    nextLearning: 'After Spring Boot, strong next topics include security, microservices, Docker, Kubernetes, and cloud deployment.',
  },
  aws: {
    whatIs: 'AWS is a cloud platform used to deploy, secure, monitor, and operate applications across compute, storage, networking, and managed services.',
    whoShouldLearn: 'AWS is a strong fit for cloud learners, backend developers, DevOps engineers, and platform teams.',
    prerequisites: 'Networking basics, backend fundamentals, deployment basics, and general systems awareness.',
    learningTime: 'Most learners need around 8 to 12 weeks for practical AWS foundations.',
    careerGrowth: 'AWS supports growth into cloud engineering, DevOps, platform engineering, and cloud-native backend roles.',
    beginnerFriendly: 'AWS can feel broad at first, but it becomes manageable when learned through core services and real deployment flows.',
    nextLearning: 'After AWS, common next steps are Docker, Kubernetes, Terraform, observability, and cloud architecture patterns.',
  },
  docker: {
    whatIs: 'Docker is a container platform used to package applications with their runtime dependencies for consistent local and production delivery.',
    whoShouldLearn: 'Docker is ideal for backend developers, DevOps engineers, platform teams, and anyone deploying modern applications.',
    prerequisites: 'Basic command-line usage, application runtime awareness, and general backend or deployment familiarity.',
    learningTime: 'A practical Docker learning path usually takes about 4 to 6 weeks.',
    careerGrowth: 'Docker supports backend delivery, DevOps, CI/CD, and broader platform engineering growth.',
    beginnerFriendly: 'Docker is beginner-friendly once you understand how applications run and what deployment consistency means.',
    nextLearning: 'After Docker, common next areas are Kubernetes, CI/CD pipelines, container security, and cloud hosting.',
  },
  kubernetes: {
    whatIs: 'Kubernetes is a container orchestration platform used to deploy, scale, and operate containerized applications in production environments.',
    whoShouldLearn: 'Kubernetes is best for platform engineers, DevOps teams, SREs, and backend developers working with distributed systems.',
    prerequisites: 'Docker fundamentals, networking basics, deployment awareness, and comfort with containers.',
    learningTime: 'A practical Kubernetes roadmap usually takes around 8 to 12 weeks.',
    careerGrowth: 'Kubernetes is highly relevant for platform engineering, SRE, DevOps, and cloud-native infrastructure roles.',
    beginnerFriendly: 'Kubernetes has a steeper curve than Docker, so it is better after container basics are already clear.',
    nextLearning: 'After Kubernetes, useful next steps include GitOps, observability, service meshes, and production operations depth.',
  },
  azure: {
    whatIs: 'Azure is a cloud platform used to build, deploy, secure, and operate applications across enterprise and cloud-native environments.',
    whoShouldLearn: 'Azure is a strong fit for cloud learners, enterprise backend teams, platform engineers, and DevOps roles.',
    prerequisites: 'Networking basics, backend fundamentals, deployment basics, and cloud interest.',
    learningTime: 'Most developers need around 8 to 12 weeks for practical Azure fundamentals.',
    careerGrowth: 'Azure helps with cloud engineering, enterprise platform work, DevOps, and Microsoft-aligned cloud roles.',
    beginnerFriendly: 'Azure is manageable when learned through core services first instead of trying to cover the full service catalog at once.',
    nextLearning: 'After Azure, common next topics are AKS, identity, observability, infrastructure as code, and cloud architecture design.',
  },
  'ai-llm': {
    whatIs: 'AI / LLM Engineering focuses on building practical AI-powered products using prompts, retrieval, evaluation, agents, and production safeguards.',
    whoShouldLearn: 'AI / LLM Engineering is ideal for product engineers, full-stack developers, applied AI learners, and backend teams adding AI features.',
    prerequisites: 'Programming basics, API thinking, debugging discipline, and either JavaScript or Python comfort.',
    learningTime: 'A practical AI / LLM Engineering path usually takes around 8 to 14 weeks.',
    careerGrowth: 'This area supports growth into applied AI engineering, AI product development, and intelligent workflow automation roles.',
    beginnerFriendly: 'It is beginner-friendly for developers, but easier after you already understand APIs, product flows, and debugging.',
    nextLearning: 'After LLM basics, strong next areas include RAG, evaluation, observability, guardrails, and production AI architecture.',
  },
};

export function getTechnologyMainFaqs(tech: TechSection): FAQ[] {
  const profile = faqProfiles[tech.id];
  const topicAreas = tech.categories.slice(0, 4).map((category) => category.title).join(', ');

  return [
    {
      question: `What is ${tech.label}?`,
      answer: profile.whatIs,
    },
    {
      question: `Who should learn ${tech.label}?`,
      answer: profile.whoShouldLearn,
    },
    {
      question: `What are the prerequisites for learning ${tech.label}?`,
      answer: profile.prerequisites,
    },
    {
      question: `How long does it take to learn ${tech.label}?`,
      answer: profile.learningTime,
    },
    {
      question: `Is ${tech.label} good for career growth?`,
      answer: profile.careerGrowth,
    },
    {
      question: `What are the main topics to learn in ${tech.label}?`,
      answer: `Start with the roadmap areas on this page, especially ${topicAreas}, and then continue deeper into the remaining sections.`,
    },
    {
      question: `Is ${tech.label} beginner-friendly?`,
      answer: profile.beginnerFriendly,
    },
    {
      question: `What should I learn after ${tech.label}?`,
      answer: profile.nextLearning,
    },
  ];
}
