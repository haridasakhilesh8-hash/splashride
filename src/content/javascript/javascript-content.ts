import type { FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const defaultVersions = ['ECMAScript 2023', 'Modern Browsers', 'DOM APIs', 'Fetch API'];

type JavaScriptGroupId =
  | 'javascript-core'
  | 'javascript-browser'
  | 'async-javascript'
  | 'javascript-practical'
  | 'production-skills';

interface JavaScriptTopicSpec {
  group: JavaScriptGroupId;
  slug: string;
  title: string;
  description: string;
  concept: string;
  why: string;
  usage: string;
  workflow: string;
  exampleTitle: string;
  exampleCode: string;
  productionIssues: string[];
  bestPractices: string[];
  relatedTopics: string[];
  faqs?: FAQ[];
}

const groupQuickUnderstanding: Record<JavaScriptGroupId, string> = {
  'javascript-core': 'JavaScript core topics explain how the language creates values, runs code, resolves scope, and produces many of the runtime results developers are asked to explain in interviews and debug in products.',
  'javascript-browser': 'Browser-focused topics show how JavaScript reads the DOM, reacts to user input, stores small bits of state, and coordinates real browser-side behavior safely.',
  'async-javascript': 'Async JavaScript topics explain how delayed work, promises, API calls, timers, and queued tasks behave after the current call stack clears.',
  'javascript-practical': 'Practical JavaScript topics connect language features to day-to-day frontend work such as data transformation, debugging, copying state, and shaping user interactions.',
  'production-skills': 'Production JavaScript topics focus on performance, safety, maintainability, and the mistakes that appear when real users, real data, and real traffic hit the frontend.',
};

const javascriptTopicSpecs: JavaScriptTopicSpec[] = [
  {
    group: 'javascript-core',
    slug: 'what-is-javascript',
    title: 'What is JavaScript?',
    description: 'Understand JavaScript as the language that brings logic, state changes, and interactivity to modern web experiences.',
    concept: 'JavaScript is the programming language browsers execute to respond to user actions, transform data, update the interface, call APIs, and coordinate behavior between HTML and CSS.',
    why: 'Teams need a strong JavaScript foundation because even framework-heavy codebases still depend on the language itself for debugging, state reasoning, runtime behavior, and browser integration.',
    usage: 'Real products use JavaScript for menus, forms, analytics, content loading, validation, feature flags, rendering logic, and integrations with backend APIs and third-party scripts.',
    workflow: 'Developers usually model the data, write the logic, connect it to UI behavior, and then validate what actually happens in the browser under success, failure, and timing edge cases.',
    exampleTitle: 'Simple JavaScript output',
    exampleCode: `const technology = 'JavaScript';
console.log(\`\${technology} powers interactive pages.\`);`,
    productionIssues: [
      'Teams rely on framework abstractions but struggle when a language-level bug appears underneath them.',
      'Runtime behavior becomes confusing because developers know syntax but not how the browser executes the code.',
      'Small logic mistakes become visible product bugs once data, events, and async flows combine.',
    ],
    bestPractices: [
      'Understand the language directly instead of only memorizing framework recipes.',
      'Test JavaScript behavior in the browser and in tiny reproducible examples.',
      'Connect each concept to one real UI or API scenario so it sticks.',
      'Treat JavaScript fundamentals as architecture knowledge, not only interview material.',
    ],
    relatedTopics: ['execution-context', 'call-stack', 'javascript-modules'],
  },
  {
    group: 'javascript-core',
    slug: 'execution-context',
    title: 'Execution Context',
    description: 'Learn how JavaScript creates an execution context before code runs and why that matters for variables, functions, and `this`.',
    concept: 'An execution context is the environment JavaScript sets up for running code. It tracks the current scope, variables, function declarations, and how `this` should behave for that call.',
    why: 'Developers need execution-context awareness because many confusing interview and production questions around hoisting, scope, and `this` start here.',
    usage: 'This matters in event handlers, module code, regular functions, methods, constructors, callbacks, and any place runtime behavior seems surprising.',
    workflow: 'JavaScript creates a global execution context first, then creates new function contexts as code calls functions, each with its own local environment and rules.',
    exampleTitle: 'Function execution context',
    exampleCode: `const section = 'frontend';

function printSection() {
  const level = 'beginner';
  console.log(section, level);
}

printSection();`,
    productionIssues: [
      'Developers debug the symptom but not the runtime context that created the value.',
      'Function behavior is misunderstood because local and outer environments are mixed together mentally.',
      'Interview answers stay shallow because they skip how JavaScript sets up work before execution.',
    ],
    bestPractices: [
      'Trace which context is active when a value is read.',
      'Understand how global, function, and module code differ.',
      'Use small console examples to verify mental models.',
      'Connect context setup to scope, hoisting, and `this` instead of studying them in isolation.',
    ],
    relatedTopics: ['call-stack', 'scope-chain', 'this-keyword'],
  },
  {
    group: 'javascript-core',
    slug: 'call-stack',
    title: 'Call Stack',
    description: 'Understand how JavaScript keeps track of active function calls and why stack order affects debugging and runtime errors.',
    concept: 'The call stack is the runtime structure that records which functions are currently executing. Each new function call adds a frame, and returning removes it.',
    why: 'Teams need this concept because stack order explains recursion errors, blocking behavior, debugging traces, and how synchronous code completes before async callbacks run.',
    usage: 'This matters when reading stack traces, debugging nested calls, explaining event loop behavior, or understanding why heavy code freezes the UI.',
    workflow: 'A function call is pushed onto the stack, runs to completion unless it throws, and then pops off. JavaScript handles one stack of synchronous work at a time.',
    exampleTitle: 'Nested function calls',
    exampleCode: `function c() {
  console.log('inside c');
}

function b() {
  c();
}

function a() {
  b();
}

a();`,
    productionIssues: [
      'Large synchronous tasks block rendering because the stack never clears quickly enough.',
      'Developers misunderstand async timing because they do not know the stack must empty first.',
      'Stack traces are ignored even though they often reveal the real source of a bug faster.',
    ],
    bestPractices: [
      'Read stack traces from the top and map them back to the calling sequence.',
      'Break heavy synchronous work into smaller units when UI responsiveness matters.',
      'Use this concept when explaining recursion, event loop behavior, and blocking.',
      'Practice predicting stack order before running examples.',
    ],
    relatedTopics: ['execution-context', 'event-loop', 'microtasks-and-macrotasks'],
  },
  {
    group: 'javascript-core',
    slug: 'scope-chain',
    title: 'Scope Chain',
    description: 'Learn how JavaScript resolves variables by walking outward through nested scopes.',
    concept: 'The scope chain is the lookup path JavaScript follows when a value is not found in the current scope. It checks the outer lexical environment until it finds a match or reaches the global scope.',
    why: 'This matters because closures, shadowing, and many scope bugs become much easier to explain once you know how lookup actually works.',
    usage: 'Real frontend code uses scope-chain behavior in callbacks, component logic, utility functions, factories, and module-level helpers.',
    workflow: 'JavaScript first checks the current local scope, then the outer function scope, then further outward until the global or module boundary is reached.',
    exampleTitle: 'Variable lookup across scopes',
    exampleCode: `const app = 'SplashRide';

function outer() {
  const section = 'JavaScript';

  function inner() {
    console.log(app, section);
  }

  inner();
}

outer();`,
    productionIssues: [
      'Developers think a value is global when it is actually captured from an outer function.',
      'Variable shadowing creates confusing output that looks like stale or broken state.',
      'Closures feel mysterious because lexical lookup is not understood clearly.',
    ],
    bestPractices: [
      'Name variables clearly to avoid accidental shadowing.',
      'Keep nested function depth reasonable when possible.',
      'Draw the scope chain on paper for tricky closures.',
      'Explain variable lookup step by step during debugging.',
    ],
    relatedTopics: ['execution-context', 'closures', 'hoisting'],
  },
  {
    group: 'javascript-core',
    slug: 'hoisting',
    title: 'Hoisting',
    description: 'Understand why some declarations appear available before the written line and why `var`, function declarations, `let`, and `const` differ.',
    concept: 'Hoisting refers to how JavaScript processes declarations during context creation before execution. Function declarations are initialized differently from `var`, while `let` and `const` stay in the temporal dead zone until their declaration runs.',
    why: 'Teams ask and debug hoisting often because it reveals whether a developer understands runtime setup rather than only reading code top to bottom.',
    usage: 'This appears in legacy code, interviews, refactors, module initialization, and bugs where a variable exists but does not yet behave as expected.',
    workflow: 'Before executing code, JavaScript registers declarations. The exact initialization behavior depends on the declaration type, which is why similar-looking code can produce different results.',
    exampleTitle: 'Hoisting difference',
    exampleCode: `console.log(title);
var title = 'Frontend';

function printLabel() {
  return 'Ready';
}`,
    productionIssues: [
      'Legacy `var` code behaves differently from modern `let` and `const` assumptions.',
      'Developers explain errors incorrectly because they only say "hoisting" without the declaration details.',
      'Initialization order bugs appear in setup code and shared utilities.',
    ],
    bestPractices: [
      'Prefer `const` and `let` in modern code.',
      'Do not rely on hoisting behavior for clarity or convenience.',
      'Explain which declaration type is involved before diagnosing the result.',
      'Keep declarations close to where they are used.',
    ],
    relatedTopics: ['var-let-const', 'execution-context', 'scope-chain'],
  },
  {
    group: 'javascript-core',
    slug: 'closures',
    title: 'Closures',
    description: 'Learn how functions keep access to outer variables even after the outer function has finished running.',
    concept: 'A closure is created when a function remembers the lexical environment where it was defined. That retained access makes private state, callbacks, and many real frontend patterns possible.',
    why: 'Closures are essential because they appear in timers, event handlers, debouncing, factories, modules, hooks, and bugs involving stale or shared values.',
    usage: 'Real projects use closures for private counters, configuration wrappers, memoization, delayed actions, subscriptions, and reusable stateful helpers.',
    workflow: 'A function is created inside another scope. When that inner function runs later, it can still access the outer variables through the preserved lexical environment.',
    exampleTitle: 'Counter closure',
    exampleCode: `function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const next = createCounter();
console.log(next());`,
    productionIssues: [
      'Callbacks capture an older value and behave differently than expected later.',
      'Developers treat closures as trivia instead of a daily runtime reality.',
      'Unused retained references can keep data alive longer than intended.',
    ],
    bestPractices: [
      'Trace what values a callback closes over.',
      'Use closures intentionally for encapsulation, not by accident.',
      'Be careful when closures outlive the UI state that created them.',
      'Connect closure behavior to async work, event handlers, and debouncing patterns.',
    ],
    relatedTopics: ['scope-chain', 'debouncing', 'avoiding-memory-leaks'],
  },
  {
    group: 'javascript-core',
    slug: 'this-keyword',
    title: 'this Keyword',
    description: 'Understand how `this` is determined by call site and why it behaves differently in regular functions, methods, and arrow functions.',
    concept: 'In JavaScript, `this` is not based on where a function is written. It is usually based on how the function is called, unless an arrow function is used or the value is explicitly bound.',
    why: 'Teams need this concept because wrong `this` handling causes broken methods, event logic bugs, and weak interview answers around runtime behavior.',
    usage: 'This shows up in object methods, classes, event handlers, callback APIs, older codebases, and library integrations that expect a certain context.',
    workflow: 'Look at the call site first. A method call, standalone function call, constructor call, or arrow function each changes how `this` is resolved.',
    exampleTitle: 'Method versus detached call',
    exampleCode: `const topic = {
  label: 'JavaScript',
  print() {
    console.log(this.label);
  },
};

topic.print();`,
    productionIssues: [
      'A method loses its context when passed as a callback without binding.',
      'Arrow functions are used everywhere without understanding what problem they solve.',
      'Developers memorize rules instead of checking the actual call site.',
    ],
    bestPractices: [
      'Inspect how the function is invoked before reasoning about `this`.',
      'Use arrow functions when lexical `this` is the goal, not as a blanket rule.',
      'Avoid overcomplicated context juggling in shared utilities.',
      'Prefer clear method and callback patterns that teammates can reason about quickly.',
    ],
    relatedTopics: ['arrow-functions', 'classes', 'execution-context'],
  },
  {
    group: 'javascript-core',
    slug: 'prototype-and-prototype-chain',
    title: 'Prototype and Prototype Chain',
    description: 'Learn how JavaScript shares behavior between objects and how method lookup moves through prototypes.',
    concept: 'JavaScript objects can inherit behavior through the prototype chain. When a property is missing on the object itself, JavaScript looks upward through linked prototype objects.',
    why: 'This matters because classes are built on top of prototypes, and deeper JavaScript understanding often requires knowing where methods really come from.',
    usage: 'Prototype behavior appears in built-in arrays, class instances, constructor functions, shared helpers, and interview questions about inheritance.',
    workflow: 'JavaScript checks the object first, then walks its prototype chain until it finds the property or reaches the end of the chain.',
    exampleTitle: 'Shared prototype method',
    exampleCode: `function Topic(title) {
  this.title = title;
}

Topic.prototype.print = function print() {
  console.log(this.title);
};`,
    productionIssues: [
      'Developers use classes but cannot explain inherited methods or lookup behavior.',
      'Prototype mutation in shared code creates unexpected behavior across instances.',
      'Interview explanations stay surface-level because the chain itself is skipped.',
    ],
    bestPractices: [
      'Understand prototypes even if classes are your daily syntax.',
      'Prefer predictable object creation and shared behavior patterns.',
      'Avoid mutating built-in prototypes in application code.',
      'Use the browser console to inspect prototype chains directly.',
    ],
    relatedTopics: ['classes', 'what-is-javascript', 'this-keyword'],
  },
  {
    group: 'javascript-core',
    slug: 'classes',
    title: 'Classes',
    description: 'Understand JavaScript class syntax and where it helps organize constructor logic and shared methods.',
    concept: 'Classes provide a cleaner syntax over JavaScript prototype-based inheritance. They make constructors, instance methods, and inheritance easier to read, but the underlying model is still prototype-based.',
    why: 'Teams use classes in some codebases, libraries, and interview settings, so developers should understand both the syntax and the prototype model underneath.',
    usage: 'Classes appear in UI widgets, SDKs, data models, library code, and older frontend architectures that still rely on class-based organization.',
    workflow: 'A class defines how instances are created and what methods they share. Under the hood, methods still live on the prototype.',
    exampleTitle: 'Simple class',
    exampleCode: `class TopicCard {
  constructor(title) {
    this.title = title;
  }

  print() {
    console.log(this.title);
  }
}`,
    productionIssues: [
      'Teams choose classes or functions by habit rather than problem fit.',
      'Developers use class syntax without understanding instance state and shared methods.',
      'Inheritance chains grow too deep and become hard to maintain.',
    ],
    bestPractices: [
      'Use classes when they make ownership and behavior clearer.',
      'Keep inheritance shallow and purposeful.',
      'Understand the prototype model that classes wrap.',
      'Prefer composition when inheritance adds complexity without clear benefit.',
    ],
    relatedTopics: ['prototype-and-prototype-chain', 'this-keyword', 'javascript-modules'],
  },
  {
    group: 'javascript-core',
    slug: 'javascript-modules',
    title: 'Modules',
    description: 'Learn how JavaScript modules split code into focused files with explicit imports and exports.',
    concept: 'Modules let developers organize code into separate files with clear ownership boundaries. They reduce global-scope pollution and make dependencies explicit.',
    why: 'Modern frontend codebases depend on modules for maintainability, testing, bundling, and shared utility design.',
    usage: 'Modules are used for UI components, API clients, helpers, constants, feature logic, and any code that should stay isolated and reusable.',
    workflow: 'A file exports values intentionally, and another file imports only what it needs. Tooling then resolves and bundles those connections.',
    exampleTitle: 'Named export and import',
    exampleCode: `export function formatTopic(topic) {
  return topic.trim().toUpperCase();
}

import { formatTopic } from './formatTopic.js';`,
    productionIssues: [
      'Files become dumping grounds because module boundaries are never designed clearly.',
      'Circular dependencies create confusing runtime behavior.',
      'Shared utilities leak too much responsibility because ownership is unclear.',
    ],
    bestPractices: [
      'Keep modules focused on one clear responsibility.',
      'Use explicit exports instead of overly broad utility barrels when clarity matters.',
      'Watch for circular imports during refactors.',
      'Name files and exports so their purpose is obvious in imports.',
    ],
    relatedTopics: ['what-is-javascript', 'clean-code-practices', 'browser-compatibility'],
  },
  {
    group: 'javascript-core',
    slug: 'javascript-error-handling',
    title: 'Error Handling',
    description: 'Handle JavaScript failures in a way that keeps the UI understandable and the bug easier to debug.',
    concept: 'JavaScript error handling means recognizing where code can fail, preventing crashes when possible, catching errors intentionally, and surfacing useful signals for both users and developers.',
    why: 'Without strong error handling, apps silently fail, users lose trust, and debugging becomes slower because the original failure context disappears.',
    usage: 'This matters in JSON parsing, API work, form submission, user input flows, local storage usage, and integrations with third-party code.',
    workflow: 'Guard assumptions, use try/catch where appropriate, check API responses explicitly, and expose actionable feedback rather than hiding failures.',
    exampleTitle: 'Try/catch example',
    exampleCode: `try {
  const data = JSON.parse(payload);
  console.log(data);
} catch (error) {
  console.error('Invalid JSON payload', error);
}`,
    productionIssues: [
      'Errors are swallowed, leaving users stuck without explanation.',
      'Code catches everything but logs nothing useful for debugging.',
      'Teams confuse syntax errors, runtime errors, and API failures.',
    ],
    bestPractices: [
      'Handle only the errors you can respond to meaningfully.',
      'Preserve useful debugging context in logs and monitoring.',
      'Show user-friendly fallback messages without hiding real failures from developers.',
      'Treat error handling as part of the feature, not a later patch.',
    ],
    relatedTopics: ['api-error-handling', 'common-runtime-errors', 'fetch-api'],
  },
  {
    group: 'javascript-core',
    slug: 'strict-mode',
    title: 'Strict Mode',
    description: 'Understand how strict mode makes JavaScript safer by preventing some error-prone legacy behaviors.',
    concept: 'Strict mode is a JavaScript setting that changes some language behavior to catch silent mistakes earlier, such as accidental globals and certain unsafe assignments.',
    why: 'Teams need strict mode awareness because modern module code effectively runs in strict mode already, and interviewers may ask what behavior changes under it.',
    usage: 'This matters when maintaining older scripts, comparing legacy and module code, and understanding why some operations throw instead of failing silently.',
    workflow: 'Strict mode is enabled with `"use strict"` in older script contexts, while ES modules are strict by default.',
    exampleTitle: 'Strict mode script',
    exampleCode: `'use strict';

function save() {
  count = 1;
}`,
    productionIssues: [
      'Legacy code behaves differently when moved into module-based tooling.',
      'Developers are surprised when strict mode throws on patterns that used to fail silently.',
      'Accidental globals create shared-state bugs in older scripts.',
    ],
    bestPractices: [
      'Prefer module-based code where strict mode is already the default.',
      'Avoid relying on legacy loose behaviors.',
      'Use strict-mode differences as a prompt to modernize unsafe code.',
      'Understand why the code throws instead of only removing the error.',
    ],
    relatedTopics: ['javascript-modules', 'var-let-const', 'what-is-javascript'],
  },
  {
    group: 'javascript-core',
    slug: 'var-let-const',
    title: 'Variables: var, let, const',
    description: 'Learn the practical differences between JavaScript variable declarations and when each should be used.',
    concept: '`var` is function-scoped and behaves differently under hoisting, while `let` and `const` are block-scoped and safer for modern code. `const` prevents reassignment, not deep mutation.',
    why: 'Variable choice affects readability, safety, loops, closures, and how easily teammates can reason about a file later.',
    usage: 'This appears in everyday frontend logic, event handlers, loops, state updates, setup code, and interview questions about scope and hoisting.',
    workflow: 'Use `const` by default, switch to `let` when reassignment is needed, and avoid `var` unless maintaining older code that already depends on it.',
    exampleTitle: 'Declaration choices',
    exampleCode: `const technology = 'JavaScript';
let currentTab = 'Overview';
var legacyEnabled = false;`,
    productionIssues: [
      'Loop handlers share the wrong value because `var` was used accidentally.',
      'Developers assume `const` makes nested objects immutable.',
      'Older code mixes declaration styles and becomes harder to reason about.',
    ],
    bestPractices: [
      'Prefer `const` first, then `let` when reassignment is real.',
      'Avoid `var` in new code.',
      'Explain both scope and reassignment behavior in interviews.',
      'Be explicit when an object reference is stable but inner values may still change.',
    ],
    relatedTopics: ['hoisting', 'scope-chain', 'immutability-basics'],
  },
  {
    group: 'javascript-browser',
    slug: 'dom-traversal',
    title: 'DOM Traversal',
    description: 'Understand how to move through parent, child, and sibling relationships in the DOM without brittle selectors.',
    concept: 'DOM traversal is the act of moving through existing nodes once you already have a starting element, using relationships such as parentElement, children, nextElementSibling, or closest.',
    why: 'Teams need this because not every DOM problem should be solved with another broad selector query. Traversal often produces cleaner, faster, more resilient behavior.',
    usage: 'This appears in accordions, tables, nested menus, CMS-rendered markup, validation messages, and delegated event handling.',
    workflow: 'Start from a stable element, move only as far as needed through the tree, and keep behavior tied to structure that is unlikely to change unexpectedly.',
    exampleTitle: 'Using closest',
    exampleCode: `const button = event.target.closest('[data-card-button]');
const card = button?.closest('[data-card]');`,
    productionIssues: [
      'Scripts break after markup changes because traversal assumptions were too fragile.',
      'Developers over-query the entire document instead of moving from a stable root.',
      'DOM behavior becomes coupled to decorative markup rather than intentional structure.',
    ],
    bestPractices: [
      'Use traversal from stable roots when it matches the structure naturally.',
      'Prefer `closest` for delegated interactions.',
      'Avoid depending on deeply nested presentational wrappers.',
      'Keep behavior hooks explicit with data attributes when helpful.',
    ],
    relatedTopics: ['dom-manipulation', 'event-delegation', 'javascript-events'],
  },
  {
    group: 'javascript-browser',
    slug: 'dom-manipulation',
    title: 'DOM Manipulation',
    description: 'Learn how to update text, classes, attributes, and small UI fragments safely in the browser.',
    concept: 'DOM manipulation is how JavaScript changes the page after it has loaded. That includes reading element state, changing content, toggling classes, inserting elements, and updating attributes.',
    why: 'Teams need this because even framework apps still rely on DOM behavior underneath, and browser-side scripts or debugging often require direct DOM understanding.',
    usage: 'Real products use DOM manipulation for status badges, form errors, toggles, previews, progressive enhancement, small widgets, and third-party integrations.',
    workflow: 'Select stable elements, prefer text and class updates for safety, and use structural insertion carefully when content really needs to change.',
    exampleTitle: 'Updating text and classes',
    exampleCode: `const status = document.querySelector('[data-status]');
status.textContent = 'Saved';
status.classList.add('is-success');`,
    productionIssues: [
      'innerHTML is used for simple updates and creates unnecessary risk.',
      'DOM updates become brittle because selectors are tied to styling classes.',
      'Too many small manual mutations create state drift that is hard to debug.',
    ],
    bestPractices: [
      'Prefer `textContent` when you only need to change text.',
      'Keep selectors stable and behavior-oriented.',
      'Update the smallest necessary part of the DOM.',
      'Test with keyboard interaction and dynamic content, not only mouse clicks.',
    ],
    relatedTopics: ['dom-traversal', 'forms-handling', 'common-runtime-errors'],
  },
  {
    group: 'javascript-browser',
    slug: 'javascript-events',
    title: 'Events',
    description: 'Understand how browser events turn user actions into JavaScript behavior.',
    concept: 'Events are browser signals for things like clicks, input changes, focus movement, form submission, scrolling, and keyboard activity. JavaScript listens for them and responds.',
    why: 'Strong event handling is essential because most frontend interactivity depends on responding to events predictably and accessibly.',
    usage: 'This matters in forms, dropdowns, modals, menus, search inputs, analytics tracking, and every interactive component.',
    workflow: 'Choose the right event type, attach the listener at the right level, guard against unintended triggers, and verify mouse, keyboard, and touch behavior.',
    exampleTitle: 'Click listener',
    exampleCode: `button.addEventListener('click', () => {
  console.log('Clicked');
});`,
    productionIssues: [
      'Wrong event types create inconsistent behavior across keyboard and pointer inputs.',
      'Multiple listeners fire unexpectedly because propagation was never considered.',
      'Teams implement interactions that work only in one happy path.',
    ],
    bestPractices: [
      'Pick event types that match the real user interaction.',
      'Test keyboard, focus, and touch paths alongside clicks.',
      'Understand propagation before attaching many listeners.',
      'Keep event handlers small and delegate heavy logic outward.',
    ],
    relatedTopics: ['event-bubbling-and-capturing', 'event-delegation', 'forms-handling'],
  },
  {
    group: 'javascript-browser',
    slug: 'event-bubbling-and-capturing',
    title: 'Event Bubbling and Capturing',
    description: 'Learn how events move through the DOM and why that movement changes how handlers behave.',
    concept: 'Browser events can travel through the DOM in phases. Capturing goes down the tree, the target phase hits the element, and bubbling comes back up. Most everyday handlers rely on bubbling.',
    why: 'This matters because one user action can trigger parent and child logic, and event delegation depends on understanding bubbling clearly.',
    usage: 'This appears in nested buttons, overlays, dropdowns, delegated lists, outside-click handling, and interview questions about event flow.',
    workflow: 'When debugging, check which element received the event, where listeners are attached, which phase they use, and whether propagation was stopped deliberately.',
    exampleTitle: 'Parent and child handlers',
    exampleCode: `child.addEventListener('click', () => console.log('child'));
parent.addEventListener('click', () => console.log('parent'));`,
    productionIssues: [
      'A click triggers multiple handlers and the team treats it as random behavior.',
      'stopPropagation is used as a patch without understanding the event path.',
      'Nested interactive elements cause analytics or UI logic to fire twice.',
    ],
    bestPractices: [
      'Learn bubbling first because it explains most common cases.',
      'Use propagation-stopping sparingly and intentionally.',
      'Trace event.target and currentTarget during debugging.',
      'Design nested interactions so their ownership is clear.',
    ],
    relatedTopics: ['javascript-events', 'event-delegation', 'event-loop'],
  },
  {
    group: 'javascript-browser',
    slug: 'event-delegation',
    title: 'Event Delegation',
    description: 'Use one parent-level listener to handle repeated or dynamically added child elements.',
    concept: 'Event delegation attaches a listener to a stable ancestor and uses bubbling to detect which child triggered the event. It is useful when many similar items share one interaction pattern.',
    why: 'Teams need delegation because dynamic lists, CMS-rendered content, and repeated controls become simpler and less fragile when they do not each manage their own listener.',
    usage: 'This appears in accordions, navigation lists, tables, autocomplete results, comment actions, and repeated card controls.',
    workflow: 'Attach one listener to a stable parent, inspect the target, locate the intended child item with `closest`, and run the correct action only when the match is valid.',
    exampleTitle: 'Delegated click handling',
    exampleCode: `list.addEventListener('click', (event) => {
  const item = event.target.closest('[data-topic]');
  if (!item) return;
  console.log(item.dataset.topic);
});`,
    productionIssues: [
      'New list items stop working because listeners were bound only to the initial DOM.',
      'Delegation becomes unreliable because the target matching logic is too loose.',
      'Nested child elements trigger the wrong action because `closest` was not used carefully.',
    ],
    bestPractices: [
      'Delegate only when there is a stable shared parent.',
      'Use clear data attributes or reliable selectors for matching.',
      'Guard against clicks from unrelated nested content.',
      'Retest keyboard-triggered behavior, not only clicks.',
    ],
    relatedTopics: ['event-bubbling-and-capturing', 'dom-traversal', 'javascript-events'],
  },
  {
    group: 'javascript-browser',
    slug: 'forms-handling',
    title: 'Forms Handling',
    description: 'Handle browser forms in a way that captures values cleanly, validates input, and protects the user flow.',
    concept: 'Form handling includes reading user input, preventing full-page reloads when needed, validating fields, shaping payloads, and showing feedback around success or error states.',
    why: 'Forms are one of the most common frontend responsibilities, and weak handling directly affects conversion, data quality, and accessibility.',
    usage: 'Real projects use this in login forms, signup flows, checkout forms, profile settings, feedback widgets, and admin tools.',
    workflow: 'Listen for submit, prevent default only when the product flow needs it, collect values with FormData or controlled state, validate them, and then handle success and failure clearly.',
    exampleTitle: 'Submit handler with FormData',
    exampleCode: `form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  console.log(data.get('email'));
});`,
    productionIssues: [
      'Forms reload unexpectedly because submit handling was incomplete.',
      'Validation is bolted on after the fact and conflicts with browser behavior.',
      'Error states are unclear, causing repeated user mistakes or abandoned flows.',
    ],
    bestPractices: [
      'Preserve native form behavior where it helps the user.',
      'Use clear field names and predictable payload shaping.',
      'Handle loading, success, and error states explicitly.',
      'Retest keyboard navigation and validation messaging in real flows.',
    ],
    relatedTopics: ['form-validation', 'dom-manipulation', 'api-error-handling'],
  },
  {
    group: 'javascript-browser',
    slug: 'browser-storage',
    title: 'Browser Storage: localStorage and sessionStorage',
    description: 'Understand when browser storage is useful and where it becomes risky or limited.',
    concept: 'localStorage and sessionStorage are simple key-value stores provided by the browser. localStorage persists across sessions until cleared, while sessionStorage usually lasts only for the current tab session.',
    why: 'Teams use browser storage often for lightweight persistence, but misuse can create stale state, security issues, and inconsistent user experiences.',
    usage: 'This appears in theme preference, dismissed banners, partially saved drafts, session-only UI state, and simple offline-friendly flags.',
    workflow: 'Store only small, non-sensitive strings, serialize structured data with JSON, and handle missing or invalid values defensively when reading back.',
    exampleTitle: 'Persisting a theme choice',
    exampleCode: `localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme') ?? 'light';`,
    productionIssues: [
      'Sensitive data is stored in localStorage and creates security risk.',
      'Old stored values break new UI assumptions after a release.',
      'JSON parsing fails because stored data shape changed over time.',
    ],
    bestPractices: [
      'Use storage only for small, low-risk state.',
      'Version or guard stored data when shape changes are possible.',
      'Handle missing and malformed values gracefully.',
      'Know that storage is synchronous and should not hold large payloads.',
    ],
    relatedTopics: ['json-handling', 'cookies-basics', 'browser-compatibility'],
  },
  {
    group: 'javascript-browser',
    slug: 'cookies-basics',
    title: 'Cookies Basics',
    description: 'Learn what cookies are, how they differ from browser storage, and where frontend developers need to understand them.',
    concept: 'Cookies are small pieces of data associated with a domain and sent with HTTP requests according to their scope and attributes. They differ from localStorage because they can participate in request/response flows.',
    why: 'Frontend developers need cookie basics for authentication awareness, consent handling, session debugging, and security discussions even when backend systems own most cookie logic.',
    usage: 'This matters in login state, session tracking, personalization, analytics, and cookie-consent experiences.',
    workflow: 'Understand the purpose of the cookie, which layer owns it, and how attributes like Secure, HttpOnly, SameSite, domain, and path affect behavior.',
    exampleTitle: 'Reading a simple cookie string',
    exampleCode: `document.cookie = 'theme=dark; path=/';
console.log(document.cookie);`,
    productionIssues: [
      'Teams confuse cookies with localStorage and pick the wrong persistence mechanism.',
      'Security-sensitive tokens are discussed without understanding HttpOnly and browser visibility.',
      'Consent flows are incomplete because frontend behavior does not match cookie usage rules.',
    ],
    bestPractices: [
      'Know when cookie behavior is server-managed versus script-managed.',
      'Avoid storing sensitive data in script-readable cookies when stronger options exist.',
      'Understand SameSite and Secure implications at a basic level.',
      'Connect cookie handling to privacy and consent requirements.',
    ],
    relatedTopics: ['browser-storage', 'security-basics-xss', 'fetch-api'],
  },
  {
    group: 'javascript-browser',
    slug: 'timers-settimeout-setinterval',
    title: 'Timers: setTimeout and setInterval',
    description: 'Understand how browser timers schedule later work and where they create timing bugs or cleanup problems.',
    concept: 'setTimeout schedules work to run once after a delay, while setInterval repeats work until it is cleared. Neither runs immediately, and both depend on the event loop.',
    why: 'Timers appear in debouncing, UI delays, retries, polling, carousels, and many beginner-to-intermediate interview questions.',
    usage: 'This matters in search inputs, notifications, progress polling, delayed tooltips, session warnings, and animation logic not handled by CSS.',
    workflow: 'Schedule only the work you really need, clear timers when they are no longer relevant, and remember that actual execution depends on stack availability and browser conditions.',
    exampleTitle: 'Simple timeout',
    exampleCode: `const id = setTimeout(() => {
  console.log('Run later');
}, 300);

clearTimeout(id);`,
    productionIssues: [
      'Intervals keep running after the related UI is gone.',
      'Developers assume timers run at exact real-world times under all conditions.',
      'Multiple overlapping timers cause duplicate work or stale updates.',
    ],
    bestPractices: [
      'Clear timeouts and intervals during cleanup when ownership changes.',
      'Prefer event-driven updates over polling when feasible.',
      'Use debouncing or throttling when repeated events are the real source.',
      'Connect timers to event-loop behavior when explaining delays.',
    ],
    relatedTopics: ['callbacks', 'event-loop', 'debouncing'],
  },
  {
    group: 'async-javascript',
    slug: 'callbacks',
    title: 'Callbacks',
    description: 'Learn the callback pattern as one of the earliest ways JavaScript handled delayed work.',
    concept: 'A callback is a function passed into another function to be executed later, often after an event, timer, or async operation finishes.',
    why: 'Callbacks still appear throughout browser APIs and libraries, and understanding them helps developers reason about closures, timing, and older asynchronous code.',
    usage: 'Callbacks are used in timers, DOM listeners, array methods, legacy APIs, and utility wrappers that invoke code later.',
    workflow: 'One function receives another function, stores it or runs it later, and the callback executes when the triggering condition occurs.',
    exampleTitle: 'Timeout callback',
    exampleCode: `setTimeout(() => {
  console.log('Later');
}, 500);`,
    productionIssues: [
      'Nested callbacks make flow harder to read and debug.',
      'Shared outer state creates surprising behavior inside delayed callbacks.',
      'Teams use callbacks without clear error or ownership handling.',
    ],
    bestPractices: [
      'Understand callbacks even if you prefer promises for larger async flows.',
      'Keep callback bodies focused and readable.',
      'Watch what values the callback closes over.',
      'Refactor deep nesting when the flow grows beyond simple event handling.',
    ],
    relatedTopics: ['closures', 'promises', 'timers-settimeout-setinterval'],
  },
  {
    group: 'async-javascript',
    slug: 'promises',
    title: 'Promises',
    description: 'Understand promises as the core JavaScript abstraction for future async results.',
    concept: 'A promise represents a value that may be available now, later, or never because the operation failed. It lets code attach success and failure handlers in a structured way.',
    why: 'Most modern async browser code relies on promises directly or indirectly, so developers need to understand their states, chaining, and failure handling.',
    usage: 'This appears in fetch requests, async utilities, script loading, delayed workflows, and concurrency helpers like Promise.all.',
    workflow: 'A promise starts pending, then settles fulfilled or rejected. Code handles the result with `then`, `catch`, `finally`, or `await`.',
    exampleTitle: 'Promise chain',
    exampleCode: `fetch('/api/topics')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));`,
    productionIssues: [
      'Rejected promises are not handled and errors disappear into the console.',
      'Then-chains become hard to follow when side effects are mixed everywhere.',
      'Teams use promises without modeling loading, success, and failure states clearly.',
    ],
    bestPractices: [
      'Handle both success and failure paths intentionally.',
      'Keep promise chains readable and focused.',
      'Know when async/await improves clarity without hiding the promise model.',
      'Practice explaining pending, fulfilled, and rejected states clearly.',
    ],
    relatedTopics: ['async-await', 'promise-all', 'promise-race'],
  },
  {
    group: 'async-javascript',
    slug: 'promise-all',
    title: 'Promise.all',
    description: 'Use Promise.all when multiple async operations should finish together before the next step runs.',
    concept: 'Promise.all takes an array of promises and resolves when all of them succeed, or rejects immediately when one fails.',
    why: 'Teams need this because real products often load several independent resources together and should not await them one by one unnecessarily.',
    usage: 'This matters in dashboards, multi-request page bootstraps, parallel lookups, and batching frontend data setup.',
    workflow: 'Start the independent promises, pass them to Promise.all, and then handle the combined results only after they all complete successfully.',
    exampleTitle: 'Parallel requests',
    exampleCode: `const [profile, settings] = await Promise.all([
  fetch('/api/profile').then((res) => res.json()),
  fetch('/api/settings').then((res) => res.json()),
]);`,
    productionIssues: [
      'Independent async work is awaited sequentially, slowing the page unnecessarily.',
      'One failed request rejects the whole batch and the fallback path is not planned.',
      'Teams parallelize calls without checking whether they truly are independent.',
    ],
    bestPractices: [
      'Use Promise.all only when the tasks can run independently.',
      'Plan the failure strategy because one rejection fails the whole set.',
      'Name the combined results clearly when destructuring them.',
      'Measure whether parallel loading improves real user experience.',
    ],
    relatedTopics: ['promises', 'promise-race', 'fetch-api'],
  },
  {
    group: 'async-javascript',
    slug: 'promise-race',
    title: 'Promise.race',
    description: 'Understand when Promise.race is useful for timeout patterns or whichever async result arrives first.',
    concept: 'Promise.race settles as soon as the first promise in the iterable settles, whether that first result is a fulfillment or rejection.',
    why: 'This matters for timeout wrappers, fallback strategies, and interview questions that test whether a developer understands promise coordination beyond the basics.',
    usage: 'You may use this in request timeouts, competing data sources, optimistic fallback strategies, or controlled async experiments.',
    workflow: 'Start multiple promises and let the fastest settled result decide the next step. That means failures can also win the race if they settle first.',
    exampleTitle: 'Timeout race idea',
    exampleCode: `const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Timed out')), 3000),
);

await Promise.race([fetch('/api/data'), timeout]);`,
    productionIssues: [
      'Teams assume Promise.race waits for the first successful result rather than the first settled result.',
      'Timeout races are added without cleanup or cancellation strategy.',
      'A rejected fast path unexpectedly wins and breaks the UI flow.',
    ],
    bestPractices: [
      'Remember that rejection can settle the race first.',
      'Use race patterns deliberately, not by default.',
      'Pair timeout strategies with cleanup or abort patterns where relevant.',
      'Explain the difference from Promise.all clearly in interviews.',
    ],
    relatedTopics: ['promises', 'promise-all', 'api-error-handling'],
  },
  {
    group: 'async-javascript',
    slug: 'async-await',
    title: 'Async/Await',
    description: 'Use async/await to write asynchronous code in a style that reads more like sequential logic.',
    concept: 'async/await is syntax built on top of promises. It makes asynchronous code easier to read, but it does not change the underlying promise-based behavior.',
    why: 'Teams use async/await widely for API calls and async workflows, so developers need to understand both its clarity benefits and its concurrency limitations.',
    usage: 'This appears in data loading, form submission, setup flows, retries, admin tools, and almost any modern browser API integration.',
    workflow: 'Mark a function async, await the promise result, and use try/catch when the failure path needs explicit handling.',
    exampleTitle: 'Async function',
    exampleCode: `async function loadTopics() {
  const response = await fetch('/api/topics');
  return response.json();
}`,
    productionIssues: [
      'Developers forget an `await` and end up working with unresolved promises.',
      'Sequential awaiting slows flows that could run in parallel.',
      'try/catch coverage is inconsistent across async branches.',
    ],
    bestPractices: [
      'Use async/await when it improves readability, not because it hides the promise model.',
      'Consider Promise.all for truly independent work.',
      'Handle loading and error states alongside the awaited call.',
      'Explain both readability and runtime behavior in interviews.',
    ],
    relatedTopics: ['promises', 'promise-all', 'fetch-api'],
  },
  {
    group: 'async-javascript',
    slug: 'fetch-api',
    title: 'Fetch API',
    description: 'Understand the browser Fetch API for making HTTP requests and handling responses deliberately.',
    concept: 'Fetch is the modern browser API for network requests. It returns a promise and requires developers to handle parsing, HTTP status checks, and failure behavior explicitly.',
    why: 'Most frontend applications talk to APIs, so weak fetch handling quickly becomes user-visible through broken loading states or misleading success paths.',
    usage: 'This is used for page data, search results, profile updates, content loading, admin actions, and almost every browser-to-server interaction.',
    workflow: 'Call fetch, check `response.ok`, parse the body carefully, then update the UI based on loading, success, empty, and error outcomes.',
    exampleTitle: 'Fetch with status check',
    exampleCode: `const response = await fetch('/api/technologies');
if (!response.ok) {
  throw new Error('Request failed');
}

const data = await response.json();`,
    productionIssues: [
      'HTTP failures are treated like success because `response.ok` was never checked.',
      'The UI assumes every response is JSON and crashes on unexpected payloads.',
      'Loading and retry behavior are never modeled clearly.',
    ],
    bestPractices: [
      'Always think about status handling, parsing, and user feedback together.',
      'Differentiate network failures from HTTP failures.',
      'Keep fetch logic consistent across the product with shared helpers when helpful.',
      'Test slow and failed responses, not only happy-path mocks.',
    ],
    relatedTopics: ['api-error-handling', 'api-integration-mistakes', 'promises'],
  },
  {
    group: 'async-javascript',
    slug: 'api-error-handling',
    title: 'API Error Handling',
    description: 'Handle API failures in a way that protects the user experience and still helps developers diagnose the issue.',
    concept: 'API error handling means detecting failures correctly, showing useful fallback UI, preserving enough context for debugging, and avoiding misleading states such as false success or endless loading.',
    why: 'Teams need this because production APIs fail in many ways: network loss, timeouts, authorization issues, server errors, malformed payloads, or partial responses.',
    usage: 'This appears in login failures, save actions, dashboard data loads, form submission, admin tools, and third-party service integrations.',
    workflow: 'Check status, catch network failures, map known error classes to user-facing responses, and log enough metadata for support and debugging.',
    exampleTitle: 'Network and status handling',
    exampleCode: `try {
  const response = await fetch('/api/profile');
  if (!response.ok) throw new Error('Profile request failed');
} catch (error) {
  showToast('Could not load profile');
}`,
    productionIssues: [
      'Users see a blank state because the UI never leaves loading after a failure.',
      'All failures are shown as one generic message with no useful debugging signal.',
      'Retries are added blindly and make server strain or duplicate actions worse.',
    ],
    bestPractices: [
      'Model loading, success, empty, and error states explicitly.',
      'Keep user messaging clear without exposing sensitive internal details.',
      'Log enough technical context for debugging and support.',
      'Treat error handling as part of the API-integration contract.',
    ],
    relatedTopics: ['fetch-api', 'javascript-error-handling', 'api-integration-mistakes'],
  },
  {
    group: 'async-javascript',
    slug: 'event-loop',
    title: 'Event Loop',
    description: 'Understand how JavaScript coordinates synchronous work, queued callbacks, and promise handlers.',
    concept: 'The event loop is the runtime process that decides when queued async work can run after the current call stack becomes empty. It coordinates timers, promise microtasks, rendering opportunities, and browser callbacks.',
    why: 'Teams need event-loop knowledge because it explains callback order, UI blocking, promise timing, and many interview questions about runtime behavior.',
    usage: 'This matters in debugging output order, loading states, slow UIs, timers, promise chains, and third-party script behavior.',
    workflow: 'Synchronous code runs first on the call stack. After the stack clears, the runtime processes queued tasks according to its scheduling rules, with microtasks generally running before the next macrotask.',
    exampleTitle: 'Order of logs',
    exampleCode: `console.log('start');
Promise.resolve().then(() => console.log('promise'));
setTimeout(() => console.log('timeout'), 0);
console.log('end');`,
    productionIssues: [
      'Developers ship ordering assumptions that are wrong under promise timing.',
      'Heavy synchronous work blocks rendering and makes async logic feel broken.',
      'Interview answers confuse the call stack with the event loop itself.',
    ],
    bestPractices: [
      'Explain the call stack first, then queued task processing.',
      'Use small runnable examples when learning or teaching timing.',
      'Remember that async does not mean parallel JavaScript execution on the main thread.',
      'Connect event-loop behavior to performance and responsiveness, not only interviews.',
    ],
    relatedTopics: ['call-stack', 'microtasks-and-macrotasks', 'timers-settimeout-setinterval'],
  },
  {
    group: 'async-javascript',
    slug: 'microtasks-and-macrotasks',
    title: 'Microtasks and Macrotasks',
    description: 'Learn the practical difference between promise microtasks and timer-style macrotasks.',
    concept: 'Microtasks are high-priority queued jobs such as promise handlers that run after the current synchronous stack clears but before the next macrotask like a timer callback is processed.',
    why: 'This concept explains why promise callbacks often run before setTimeout callbacks even when both seem ready at roughly the same time.',
    usage: 'This matters in event-loop interviews, debugging callback order, UI timing assumptions, and understanding how chained promises behave.',
    workflow: 'After the stack clears, the runtime processes the microtask queue before moving to the next macrotask turn. That ordering creates many visible output sequences developers are asked to explain.',
    exampleTitle: 'Promise before timeout',
    exampleCode: `setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('microtask'));`,
    productionIssues: [
      'Developers expect timers to beat promise handlers and ship the wrong sequencing logic.',
      'Debugging output order becomes guesswork instead of runtime reasoning.',
      'Complex async flows become harder to review when timing assumptions are implicit.',
    ],
    bestPractices: [
      'Practice with tiny examples until the ordering feels intuitive.',
      'Connect microtask behavior to promises specifically.',
      'Avoid relying on fragile timing unless the behavior is intentionally designed.',
      'Use explicit sequencing rather than hoping the queue order matches intent.',
    ],
    relatedTopics: ['event-loop', 'promises', 'timers-settimeout-setinterval'],
  },
  {
    group: 'javascript-practical',
    slug: 'javascript-arrays',
    title: 'Arrays',
    description: 'Understand arrays as the core list structure used in frontend rendering, filtering, and data transformation.',
    concept: 'Arrays are ordered collections. In frontend work they often represent API results, menu items, cards, table rows, options, and stateful lists shown in the UI.',
    why: 'Teams need strong array fundamentals because most visible interfaces depend on reading, transforming, or rendering list data safely.',
    usage: 'Arrays appear in navigation, search results, dashboard widgets, product lists, question banks, and any repeated UI output.',
    workflow: 'Receive or build the array, inspect its shape, transform it carefully, and then map it into the interface or business logic.',
    exampleTitle: 'Simple array',
    exampleCode: `const topics = ['HTML', 'CSS', 'JavaScript'];
console.log(topics[0]);`,
    productionIssues: [
      'The UI breaks because array shape assumptions were never validated.',
      'Transformations mutate original arrays and create hard-to-track state drift.',
      'Loops and array methods are mixed inconsistently without clarity.',
    ],
    bestPractices: [
      'Inspect array contents before transforming them.',
      'Use immutable patterns when array data feeds UI state.',
      'Pick the array method that matches the goal clearly.',
      'Name transformed arrays to reflect the new meaning.',
    ],
    relatedTopics: ['array-methods-real-examples', 'immutability-basics', 'javascript-objects'],
  },
  {
    group: 'javascript-practical',
    slug: 'array-methods-real-examples',
    title: 'Array Methods Real Examples',
    description: 'Use array methods like map, filter, find, reduce, some, and every in practical frontend scenarios.',
    concept: 'Array methods provide expressive ways to transform and inspect list data without manual loops for every case. The key is choosing the method that matches the result you need.',
    why: 'Teams rely on these methods daily for rendering, filtering, analytics shaping, API result cleanup, and state-derived UI logic.',
    usage: 'This appears in active-topic lists, search filtering, grouped dashboards, validation summaries, cart calculations, and content categorization.',
    workflow: 'Decide whether you need transformation, filtering, aggregation, or lookup first. Then choose the method that matches that intent directly.',
    exampleTitle: 'Filter then map',
    exampleCode: `const visibleTopics = topics
  .filter((topic) => topic.active)
  .map((topic) => topic.title);`,
    productionIssues: [
      'map is used when filter or find was really needed.',
      'Mutating inside array methods makes the code harder to trust.',
      'Complex reduce logic becomes unreadable because too much is packed into one callback.',
    ],
    bestPractices: [
      'Choose the method that matches the data outcome clearly.',
      'Keep transformation callbacks small and readable.',
      'Split long chains when naming intermediate meaning helps.',
      'Use reduce carefully when it actually clarifies the result.',
    ],
    relatedTopics: ['javascript-arrays', 'object-methods-real-examples', 'clean-code-practices'],
  },
  {
    group: 'javascript-practical',
    slug: 'javascript-objects',
    title: 'Objects',
    description: 'Learn how JavaScript objects model named data such as configuration, API payloads, and UI state.',
    concept: 'Objects store key-value pairs and are the most common way to represent structured frontend data such as a user, topic, filter state, or API response item.',
    why: 'Teams need object fluency because most frontend bugs come from reading, updating, or copying structured data incorrectly.',
    usage: 'Objects appear in configuration maps, props, state objects, payloads, metadata records, and normalized data models.',
    workflow: 'Understand the object shape first, read properties safely, update it intentionally, and keep property naming consistent across the codebase.',
    exampleTitle: 'Simple object',
    exampleCode: `const technology = {
  id: 'javascript',
  active: true,
  label: 'JavaScript',
};`,
    productionIssues: [
      'Property names drift across files and create mapping bugs.',
      'Nested objects are copied incorrectly, causing shared reference issues.',
      'Developers assume a property exists without checking unstable API shapes.',
    ],
    bestPractices: [
      'Keep object shapes predictable and documented through code.',
      'Use clear property names that reflect business meaning.',
      'Guard optional nested data carefully.',
      'Review object update patterns for accidental mutation.',
    ],
    relatedTopics: ['object-methods-real-examples', 'shallow-copy-vs-deep-copy', 'json-handling'],
  },
  {
    group: 'javascript-practical',
    slug: 'object-methods-real-examples',
    title: 'Object Methods Real Examples',
    description: 'Use Object.keys, Object.values, Object.entries, assign, and related helpers in practical data-shaping work.',
    concept: 'Built-in object helpers make it easier to inspect, transform, merge, or iterate through object data without custom boilerplate.',
    why: 'These methods appear in UI configuration, API normalization, table rendering, and runtime debugging far more often than many beginners expect.',
    usage: 'This matters in metadata maps, grouped content, settings panels, dashboard summaries, and turning object data into renderable lists.',
    workflow: 'Pick the helper based on whether you need keys, values, entries, or merging behavior, then keep the resulting structure clear for the next step.',
    exampleTitle: 'Object.entries example',
    exampleCode: `const entries = Object.entries({
  html: 10,
  css: 12,
});`,
    productionIssues: [
      'Object iteration logic becomes hard to follow because the output structure is not named clearly.',
      'Object.assign is used where immutable spread or deeper copying would be clearer.',
      'Teams treat objects and arrays interchangeably and lose clarity around shape.',
    ],
    bestPractices: [
      'Name the transformed structure clearly after using object helpers.',
      'Know whether the next step expects an array or an object.',
      'Prefer readability over overly compressed chaining.',
      'Use these helpers to clarify intent, not to show cleverness.',
    ],
    relatedTopics: ['javascript-objects', 'array-methods-real-examples', 'immutability-basics'],
  },
  {
    group: 'javascript-practical',
    slug: 'shallow-copy-vs-deep-copy',
    title: 'Shallow Copy vs Deep Copy',
    description: 'Understand why top-level copies are not enough when nested objects or arrays still share references.',
    concept: 'A shallow copy duplicates only the outer container. Nested objects or arrays still point to the same inner references. A deep copy creates independent nested copies too.',
    why: 'This matters because many frontend state bugs come from accidental shared references that make updates look correct until nested data changes unexpectedly.',
    usage: 'This appears in forms, settings editors, cached API data, reducers, temporary drafts, and interview questions about state safety.',
    workflow: 'Check whether the data is flat or nested before choosing a copy approach. Simple spread is often enough only for top-level changes.',
    exampleTitle: 'Nested reference caveat',
    exampleCode: `const nextUser = { ...user };
nextUser.preferences.theme = 'dark';`,
    productionIssues: [
      'A supposedly safe copy still mutates the original nested data.',
      'UI previews and saved state drift together because they share references.',
      'Developers assume spread syntax creates a full clone every time.',
    ],
    bestPractices: [
      'Know your data depth before choosing a copy strategy.',
      'Use shallow copies intentionally, not accidentally.',
      'Minimize deeply nested mutable state where possible.',
      'Explain reference sharing clearly during reviews and interviews.',
    ],
    relatedTopics: ['immutability-basics', 'javascript-objects', 'array-methods-real-examples'],
  },
  {
    group: 'javascript-practical',
    slug: 'immutability-basics',
    title: 'Immutability Basics',
    description: 'Learn why frontend teams often avoid in-place mutation when updating UI-driven data.',
    concept: 'Immutability means producing a new value instead of directly changing the existing one. It makes change detection, debugging, and predictable UI updates easier.',
    why: 'Teams care about immutability because it helps prevent hidden state bugs, especially in React-style workflows and shared frontend data logic.',
    usage: 'This matters in reducers, component state updates, undo flows, caching, form editors, and testing.',
    workflow: 'Create a new object or array for the changed data, keep untouched pieces shared when safe, and avoid mutating the original source unless mutation is explicitly intended.',
    exampleTitle: 'Immutable update',
    exampleCode: `const nextTopics = topics.map((topic) =>
  topic.id === activeId ? { ...topic, active: true } : topic,
);`,
    productionIssues: [
      'A direct mutation prevents UI updates or makes state snapshots unreliable.',
      'Debugging becomes harder because old and new states are not meaningfully separate.',
      'Deep nested changes create noisy update logic and accidental shared references.',
    ],
    bestPractices: [
      'Use immutable updates for UI state by default.',
      'Keep state shapes manageable so updates stay readable.',
      'Understand when shallow copies are enough and when they are not.',
      'Treat immutability as a clarity tool, not only a framework rule.',
    ],
    relatedTopics: ['shallow-copy-vs-deep-copy', 'javascript-arrays', 'javascript-objects'],
  },
  {
    group: 'javascript-practical',
    slug: 'json-handling',
    title: 'JSON Handling',
    description: 'Understand how JSON differs from JavaScript objects and how to parse or serialize it safely.',
    concept: 'JSON is a text format for structured data exchange. It looks similar to JavaScript object syntax, but it is not the same thing and must be parsed or stringified deliberately.',
    why: 'Teams work with JSON constantly through APIs, local storage, configuration payloads, and debugging, so weak handling creates runtime errors quickly.',
    usage: 'This appears in fetch responses, caching, storage, server payloads, mock data, and browser debugging.',
    workflow: 'Parse only valid JSON text, stringify structured data intentionally, and guard against malformed or unexpected shapes before using the result.',
    exampleTitle: 'Parse and stringify',
    exampleCode: `const payload = JSON.stringify({ tech: 'javascript' });
const parsed = JSON.parse(payload);`,
    productionIssues: [
      'JSON.parse throws because the payload is malformed or unexpectedly empty.',
      'Teams assume parsed JSON has the shape they wanted without validation.',
      'Stored JSON becomes incompatible after a release and breaks the UI on load.',
    ],
    bestPractices: [
      'Wrap risky parsing in error handling when the source is unreliable.',
      'Validate the resulting shape before deep property access.',
      'Remember that JSON cannot represent every JavaScript type directly.',
      'Use consistent serialization and migration rules for stored data.',
    ],
    relatedTopics: ['javascript-error-handling', 'browser-storage', 'fetch-api'],
  },
  {
    group: 'javascript-practical',
    slug: 'date-handling',
    title: 'Date Handling',
    description: 'Learn practical date handling basics so time values do not become a source of confusing UI bugs.',
    concept: 'Date handling in JavaScript involves parsing, formatting, comparing, and storing time values carefully while accounting for timezone and locale differences.',
    why: 'Teams need this because dates look easy until timezone shifts, inconsistent parsing, or user-locale formatting cause visible product issues.',
    usage: 'This matters in schedules, expiry warnings, order history, published dates, interview prep, booking flows, and dashboard filters.',
    workflow: 'Prefer clear input formats, store canonical values when possible, and format for display only near the UI layer with the right locale and timezone expectations.',
    exampleTitle: 'Formatting a date',
    exampleCode: `const publishedAt = new Date('2026-06-27T09:00:00Z');
console.log(publishedAt.toLocaleDateString());`,
    productionIssues: [
      'A date displays differently across user timezones and confuses the business logic.',
      'Loose string parsing behaves inconsistently across browsers or input formats.',
      'Comparisons fail because display strings are compared instead of canonical values.',
    ],
    bestPractices: [
      'Use stable date formats from APIs and storage.',
      'Format for display at the UI edge, not deep in data logic.',
      'Be explicit about timezone assumptions when they matter.',
      'Test date behavior with users or sample values in different locales.',
    ],
    relatedTopics: ['browser-compatibility', 'json-handling', 'common-runtime-errors'],
  },
  {
    group: 'javascript-practical',
    slug: 'debouncing',
    title: 'Debouncing',
    description: 'Use debouncing to delay repeated work until the user pauses, reducing noisy updates and unnecessary API calls.',
    concept: 'Debouncing waits for a burst of repeated events to stop before running the action once. It is useful when every single event would be wasteful or distracting.',
    why: 'Teams need debouncing because search inputs, resize handlers, and validation checks can overwhelm the UI or backend if they run on every rapid event.',
    usage: 'This appears in autocomplete, live filtering, window resize logic, analytics batching, and delayed validation feedback.',
    workflow: 'Reset a timer each time the event fires, and run the real action only after the quiet period completes.',
    exampleTitle: 'Debounced input handler',
    exampleCode: `let timer;

input.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(runSearch, 300);
});`,
    productionIssues: [
      'Search requests fire on every keystroke and overload the backend.',
      'Timers are never cleared correctly and old actions still run later.',
      'Teams debounce the wrong interaction and make the UI feel laggy.',
    ],
    bestPractices: [
      'Use debouncing when the final settled value matters more than each intermediate one.',
      'Tune the delay based on the user experience, not only performance.',
      'Clear timers carefully during teardown or ownership changes.',
      'Explain debouncing in terms of user intent, not only timer code.',
    ],
    relatedTopics: ['timers-settimeout-setinterval', 'throttling', 'closures'],
  },
  {
    group: 'javascript-practical',
    slug: 'throttling',
    title: 'Throttling',
    description: 'Use throttling to limit how often repeated events can trigger expensive work.',
    concept: 'Throttling allows a function to run at most once within a chosen time window, even if the triggering event fires many times during that period.',
    why: 'Teams need throttling because scroll, resize, and pointer events can fire rapidly enough to hurt performance if every event does full work.',
    usage: 'This appears in scroll tracking, resize-driven layout updates, drag interactions, progress indicators, and analytics sampling.',
    workflow: 'Track the last execution time or use a timer-based gate so the action cannot run more often than intended.',
    exampleTitle: 'Simple throttle idea',
    exampleCode: `let waiting = false;

window.addEventListener('scroll', () => {
  if (waiting) return;
  waiting = true;
  setTimeout(() => {
    waiting = false;
    updateProgress();
  }, 200);
});`,
    productionIssues: [
      'High-frequency events create jank because work runs too often.',
      'A throttle is used where debouncing would better match user intent.',
      'State drift appears because the last meaningful event is never processed as expected.',
    ],
    bestPractices: [
      'Use throttling when regular updates matter during ongoing activity.',
      'Compare throttling and debouncing based on the actual UX goal.',
      'Measure expensive handlers before and after optimization.',
      'Keep throttled work small and predictable.',
    ],
    relatedTopics: ['debouncing', 'javascript-performance-basics', 'timers-settimeout-setinterval'],
  },
  {
    group: 'javascript-practical',
    slug: 'common-runtime-errors',
    title: 'Common Runtime Errors',
    description: 'Recognize the JavaScript runtime errors frontend developers hit most often and how to debug them calmly.',
    concept: 'Common runtime errors include reading properties of undefined or null, calling something that is not a function, invalid JSON parsing, reference errors, and failed async assumptions.',
    why: 'Teams need this because practical debugging speed depends less on memorizing syntax and more on recognizing error patterns and tracing them correctly.',
    usage: 'This appears in unstable API data, DOM queries, optional config, event handling, parsing flows, and integration-heavy frontend code.',
    workflow: 'Read the exact error message, inspect the stack trace, verify the data shape or element existence, and reproduce the failure with the smallest possible example.',
    exampleTitle: 'Optional guard example',
    exampleCode: `const headline = article?.seo?.title ?? 'Fallback';
console.log(headline);`,
    productionIssues: [
      'Developers patch the symptom with optional chaining everywhere instead of fixing the real source.',
      'Errors are logged without inspecting the failing data or call path.',
      'Intermittent runtime bugs persist because repro steps were never stabilized.',
    ],
    bestPractices: [
      'Start with the exact message and stack trace.',
      'Verify data and DOM assumptions before changing logic.',
      'Use guards intentionally, not as a way to hide broken inputs.',
      'Create small reproducible examples for repeated failures.',
    ],
    relatedTopics: ['debugging-browser-devtools', 'javascript-error-handling', 'json-handling'],
  },
  {
    group: 'javascript-practical',
    slug: 'debugging-browser-devtools',
    title: 'Debugging in Browser DevTools',
    description: 'Use browser DevTools to inspect data, breakpoints, network calls, and DOM behavior more effectively.',
    concept: 'Browser DevTools provide the practical environment for stepping through code, inspecting variables, reading stack traces, monitoring network requests, and verifying rendered DOM behavior.',
    why: 'Teams need strong DevTools habits because browser debugging is faster and safer when you inspect the real runtime instead of guessing from static code.',
    usage: 'This matters in API debugging, event-order analysis, DOM inspection, performance troubleshooting, layout checks, and incident response.',
    workflow: 'Reproduce the issue, set the right breakpoint or log point, inspect variables and network activity, and confirm the fix in the real runtime path.',
    exampleTitle: 'Debugger statement',
    exampleCode: `function handleSave() {
  debugger;
  submitForm();
}`,
    productionIssues: [
      'Developers overuse console logs and miss faster answers available from breakpoints and network tools.',
      'The wrong source file or compiled output is inspected, slowing diagnosis.',
      'Teams debug code but skip the rendered DOM or network tab where the issue is actually visible.',
    ],
    bestPractices: [
      'Use breakpoints when order and data shape really matter.',
      'Inspect network status, payloads, and timing for API issues.',
      'Check rendered DOM and computed behavior, not only source code.',
      'Turn repeated debugging lessons into team knowledge or utilities.',
    ],
    relatedTopics: ['common-runtime-errors', 'fetch-api', 'javascript-performance-basics'],
  },
  {
    group: 'production-skills',
    slug: 'javascript-performance-basics',
    title: 'JavaScript Performance Basics',
    description: 'Understand the JavaScript patterns that commonly hurt responsiveness and how to reason about them at a practical level.',
    concept: 'Performance basics in JavaScript are about avoiding unnecessary work, limiting blocking operations, managing event frequency, reducing excessive re-renders or DOM updates, and measuring before optimizing blindly.',
    why: 'Teams need this because frontend performance problems often feel like "the site is slow" even when the real cause is repeated JavaScript work on the main thread.',
    usage: 'This matters in large lists, search, scrolling, resize logic, analytics, dashboard rendering, and third-party integrations.',
    workflow: 'Identify the expensive work, measure when it runs, reduce frequency or scope, and confirm the user-visible improvement in the real browser.',
    exampleTitle: 'Cache repeated lookup',
    exampleCode: `const activeTopics = topics.filter((topic) => topic.active);
render(activeTopics);`,
    productionIssues: [
      'Heavy synchronous work blocks the main thread and delays interaction.',
      'Repeated event handlers or DOM updates do more work than the UI actually needs.',
      'Teams optimize the wrong thing because they never measured the bottleneck.',
    ],
    bestPractices: [
      'Measure before claiming a performance fix.',
      'Reduce unnecessary loops, DOM writes, and repeated event work.',
      'Use debouncing or throttling when event volume is the real issue.',
      'Connect performance work to user-visible outcomes like input lag or slow screen updates.',
    ],
    relatedTopics: ['throttling', 'debouncing', 'event-loop'],
  },
  {
    group: 'production-skills',
    slug: 'avoiding-memory-leaks',
    title: 'Avoiding Memory Leaks',
    description: 'Learn the practical frontend patterns that keep unused objects, listeners, and timers from hanging around too long.',
    concept: 'A memory leak happens when data or resources stay referenced even though the UI or feature that needed them is gone. In browser work, common causes include uncleared timers, lingering listeners, and closures holding large objects.',
    why: 'Teams need this because long-lived dashboards, admin tools, tabs left open for hours, and embedded widgets can degrade over time if cleanup is ignored.',
    usage: 'This matters in single-page apps, polling flows, modal systems, event subscriptions, and large data viewers.',
    workflow: 'Track ownership of listeners, timers, and long-lived references, then clean them up when the feature or view is removed or replaced.',
    exampleTitle: 'Timer cleanup idea',
    exampleCode: `const intervalId = setInterval(refreshData, 5000);

function cleanup() {
  clearInterval(intervalId);
}`,
    productionIssues: [
      'Intervals continue running after the relevant screen is hidden or destroyed.',
      'Detached DOM elements remain referenced through listeners or closures.',
      'The app gets slower over time rather than immediately on first load.',
    ],
    bestPractices: [
      'Clear timers and remove listeners when ownership ends.',
      'Be careful about closures that retain large or obsolete data.',
      'Watch long-lived pages for gradual degradation during testing.',
      'Treat cleanup as part of the feature definition, not a final polish task.',
    ],
    relatedTopics: ['timers-settimeout-setinterval', 'closures', 'javascript-performance-basics'],
  },
  {
    group: 'production-skills',
    slug: 'security-basics-xss',
    title: 'Security Basics: XSS',
    description: 'Understand the practical cross-site scripting risks frontend developers should recognize and avoid.',
    concept: 'XSS happens when untrusted content is executed as code in the browser. Frontend developers often encounter the risk through unsafe HTML injection, user-generated content, or incorrectly trusted external data.',
    why: 'Teams need this because one unsafe DOM update can turn normal user input or CMS content into a serious security problem.',
    usage: 'This matters in comments, search highlights, rich text, CMS-rendered snippets, admin tooling, and any experience that displays external or user-provided content.',
    workflow: 'Treat untrusted content carefully, avoid unsafe HTML insertion by default, and use sanitization or safer text-based rendering where needed.',
    exampleTitle: 'Safer text update',
    exampleCode: `status.textContent = userMessage;`,
    productionIssues: [
      'innerHTML is used for convenience and creates an injection path.',
      'Developers trust CMS or API content without a sanitization plan.',
      'Security is discussed only at the backend layer even though the browser renders the dangerous content.',
    ],
    bestPractices: [
      'Prefer text rendering over raw HTML insertion when possible.',
      'Treat all untrusted content as potentially unsafe.',
      'Understand when sanitization is required before rendering HTML.',
      'Make security review part of UI features that render external content.',
    ],
    relatedTopics: ['dom-manipulation', 'cookies-basics', 'form-validation'],
  },
  {
    group: 'production-skills',
    slug: 'form-validation',
    title: 'Form Validation',
    description: 'Handle validation in a way that helps users complete the form instead of fighting the form.',
    concept: 'Form validation checks whether user input is acceptable before the next step. Good validation combines browser capabilities, domain rules, clear messaging, and accessible feedback timing.',
    why: 'Teams need this because weak validation either lets bad data through or blocks users with unclear, frustrating errors.',
    usage: 'This appears in login flows, signup forms, checkout, profile edits, search constraints, and admin content creation.',
    workflow: 'Validate required structure early, validate business rules at the right layer, show feedback near the field, and keep server and client rules aligned where possible.',
    exampleTitle: 'Simple email check',
    exampleCode: `if (!email.includes('@')) {
  showError('Enter a valid email address');
}`,
    productionIssues: [
      'Validation rules differ between frontend and backend and confuse users.',
      'Errors appear too late or too aggressively during typing.',
      'The form blocks submission without explaining what must change.',
    ],
    bestPractices: [
      'Use clear validation messages tied to the field.',
      'Combine native browser capabilities with product-specific rules carefully.',
      'Retest validation with keyboard, screen reader, and error recovery flows.',
      'Think about validation timing, not only validation rules.',
    ],
    relatedTopics: ['forms-handling', 'api-error-handling', 'security-basics-xss'],
  },
  {
    group: 'production-skills',
    slug: 'api-integration-mistakes',
    title: 'API Integration Mistakes',
    description: 'Recognize the common frontend mistakes that make API-driven features brittle in production.',
    concept: 'API integration mistakes often come from assuming data shape, ignoring status handling, coupling the UI too tightly to unstable payloads, or forgetting loading and retry states.',
    why: 'Teams need this because API work is where frontend logic, async behavior, business rules, and user trust meet most visibly.',
    usage: 'This matters in dashboards, settings pages, search, content loading, save flows, and third-party service connections.',
    workflow: 'Define the request and response contract, guard unstable fields, model UI states clearly, and verify failure behavior before release.',
    exampleTitle: 'Guard unstable data',
    exampleCode: `const items = Array.isArray(data.items) ? data.items : [];
renderItems(items);`,
    productionIssues: [
      'The UI assumes a field exists and crashes when the payload changes.',
      'A failed save still shows success because status handling is incomplete.',
      'Loading and error states are added late and do not match the real API behavior.',
    ],
    bestPractices: [
      'Guard data shape at the integration boundary.',
      'Model success, empty, loading, and error states together.',
      'Avoid scattering API assumptions across many components.',
      'Test with realistic failures and partial responses before release.',
    ],
    relatedTopics: ['fetch-api', 'api-error-handling', 'json-handling'],
  },
  {
    group: 'production-skills',
    slug: 'browser-compatibility',
    title: 'Browser Compatibility',
    description: 'Understand why valid JavaScript can still behave differently across browsers, devices, and embedded contexts.',
    concept: 'Browser compatibility in JavaScript includes API support differences, inconsistent event behavior, storage constraints, parsing quirks, timing differences, and environment-specific limitations.',
    why: 'Teams need this because "works in my browser" is not enough for production, especially for public-facing apps or enterprise environments with mixed device usage.',
    usage: 'This matters in date handling, newer APIs, storage behavior, event support, media interactions, and embedded browsers inside other apps.',
    workflow: 'Know the target browser matrix, use progressive enhancement, check feature support where needed, and test the flows users actually rely on.',
    exampleTitle: 'Feature detection',
    exampleCode: `if ('localStorage' in window) {
  localStorage.setItem('theme', 'dark');
}`,
    productionIssues: [
      'New browser APIs are used without fallback planning.',
      'Date parsing or storage behavior differs unexpectedly across environments.',
      'An embedded browser or older device breaks a key workflow the team never tested.',
    ],
    bestPractices: [
      'Test high-value flows in the real supported browsers.',
      'Prefer feature detection over risky assumptions.',
      'Know which topics are especially compatibility-sensitive, such as dates and newer APIs.',
      'Capture compatibility lessons in team standards or utilities.',
    ],
    relatedTopics: ['date-handling', 'browser-storage', 'fetch-api'],
  },
  {
    group: 'production-skills',
    slug: 'clean-code-practices',
    title: 'Clean Code Practices',
    description: 'Pull together practical JavaScript habits that keep growing frontend codebases readable and maintainable.',
    concept: 'Clean JavaScript is about naming, small focused functions, clear data flow, predictable module boundaries, safe defaults, and code that helps teammates understand intent quickly.',
    why: 'Without clean-code discipline, even technically correct features become slower to debug, harder to review, and riskier to extend.',
    usage: 'This matters everywhere: components, utilities, API clients, event handlers, setup code, and production incident response.',
    workflow: 'Name intent clearly, split responsibilities thoughtfully, remove unnecessary cleverness, and keep the relationship between data and UI behavior easy to follow.',
    exampleTitle: 'Readable intent',
    exampleCode: `const activeTopics = topics.filter((topic) => topic.active);
const activeLabels = activeTopics.map((topic) => topic.title);`,
    productionIssues: [
      'One file mixes fetching, transformation, rendering, and side effects without clear boundaries.',
      'Variable and function names describe mechanics instead of business intent.',
      'Clever compressed code slows debugging and onboarding.',
    ],
    bestPractices: [
      'Prefer readable intent over compact cleverness.',
      'Keep functions focused on one job when possible.',
      'Use modules and naming to make ownership obvious.',
      'Refactor repeated patterns into shared helpers only when the shared abstraction is genuinely clearer.',
    ],
    relatedTopics: ['javascript-modules', 'array-methods-real-examples', 'api-integration-mistakes'],
  },
];

function topic(spec: JavaScriptTopicSpec): TopicContent {
  return {
    slug: spec.slug,
    title: spec.title,
    description: spec.description,
    applicableVersions: defaultVersions,
    lastReviewed: reviewed,
    quickUnderstanding: `${groupQuickUnderstanding[spec.group]} ${spec.title} matters because ${spec.description.toLowerCase()}`,
    whatIsIt: spec.concept,
    whyWeNeedIt: `${spec.why}

**Why interviewers ask about this:**
- They want to know whether you understand runtime behavior, not only syntax
- Strong answers connect JavaScript concepts to debugging, browser behavior, and real product trade-offs
- Senior candidates explain what breaks in production, not only what the feature is called`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical JavaScript example of ${spec.title.toLowerCase()} in real frontend work.`,
      code: [
        {
          label: spec.exampleTitle,
          language: 'javascript',
          code: spec.exampleCode,
        },
      ],
    },
    commonConfusions: [
      {
        question: `Why does ${spec.title} feel easier in tutorials than in production?`,
        answer: `Because real projects combine user events, async timing, unstable data, browser rules, and maintainability concerns. ${spec.title} becomes more important when those forces interact together.`,
      },
      {
        question: `How should I explain ${spec.title} in interviews?`,
        answer: `Start with the runtime behavior, then connect it to one practical example and one production mistake. That shows deeper understanding than repeating a definition alone.`,
      },
      {
        question: `What usually causes bugs around ${spec.title}?`,
        answer: `Most bugs happen when developers assume JavaScript behaves more simply than it actually does under real runtime conditions such as delayed callbacks, nested data, browser constraints, or reused modules.`,
      },
    ],
    productionIssues: spec.productionIssues,
    bestPractices: spec.bestPractices,
    architectNote: `${spec.title} should be treated as part of frontend engineering fundamentals, not as isolated syntax trivia. The architecture conversation is about clarity, runtime safety, resilience, and whether teams can keep extending the code confidently.`,
    faqs: [
      {
        question: `Interview: how do you give a strong answer for ${spec.title}?`,
        answer: `Explain the language behavior first, then describe one real browser or product example, and finish with one production risk or trade-off. That usually signals practical depth quickly.`,
      },
      {
        question: `Interview: what weak answer should I avoid for ${spec.title}?`,
        answer: `Avoid answers that only define the term. Strong JavaScript answers connect the concept to debugging, browser behavior, async timing, data handling, or maintainability in a real codebase.`,
      },
      ...(spec.faqs ?? []),
    ],
    keyTakeaways: [
      `${spec.title} becomes much more useful when you connect it to actual browser or product behavior.`,
      'Strong JavaScript knowledge improves debugging, interview confidence, and daily frontend decision-making.',
      'Most production JavaScript issues come from timing, state shape, browser assumptions, or unclear ownership.',
      'The best explanations combine runtime behavior, one real example, and one production concern.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

export const javascriptTopics: TopicContent[] = javascriptTopicSpecs.map(topic);
