import type { FAQ, TopicContent } from '../types';

const reviewed = 'June 2026';
const defaultVersions = ['Python 3.11+', 'pip', 'venv', 'Modern Python Tooling'];

type PythonGroupId =
  | 'fundamentals'
  | 'data-structures'
  | 'functions-modules'
  | 'oop'
  | 'errors-files'
  | 'advanced'
  | 'apis-backend'
  | 'testing-production'
  | 'automation-projects';

interface PythonTopicSpec {
  group: PythonGroupId;
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

const groupQuickUnderstanding: Record<PythonGroupId, string> = {
  fundamentals: 'Python fundamentals explain how Python code is written, executed, and kept readable so beginners can build correctly and teams can review code confidently.',
  'data-structures': 'Python data-structure topics explain how values are stored, transformed, and passed around in scripts, APIs, automation jobs, and backend systems.',
  'functions-modules': 'Functions and modules turn one-file scripts into reusable, testable, and maintainable Python code that scales beyond small exercises.',
  oop: 'Python OOP topics explain how teams model reusable behavior, organize responsibilities, and build larger codebases without scattering logic everywhere.',
  'errors-files': 'Error handling and file topics show how Python deals with failures, input/output, and common business data formats used in real automation and backend work.',
  advanced: 'Advanced Python topics explain iteration, decorators, runtime behavior, and concurrency concepts that matter once scripts become larger or performance-sensitive.',
  'apis-backend': 'API and backend topics show how Python connects to HTTP systems, databases, environments, and service architecture beyond syntax alone.',
  'testing-production': 'Testing and production topics focus on reliability, debugging, dependency control, and support habits that keep Python code safe after release.',
  'automation-projects': 'Automation topics turn Python knowledge into practical scripts, jobs, and tools that solve repetitive business work.',
};

const pythonTopicSpecs: PythonTopicSpec[] = [
  {
    group: 'fundamentals',
    slug: 'what-is-python',
    title: 'What is Python?',
    description: 'Understand Python as a general-purpose language used for backend work, automation, scripting, APIs, and data handling.',
    concept: 'Python is a high-level programming language known for readable syntax, strong standard-library support, and broad use across backend engineering, automation, testing, and data-oriented tooling.',
    why: 'Teams choose Python because it lets developers express ideas quickly, automate repetitive work, build APIs, and keep code understandable for mixed-experience teams.',
    usage: 'Real projects use Python for internal tools, ETL jobs, backend services, CLI utilities, deployment scripts, API integrations, test tooling, and data-processing workflows.',
    workflow: 'Developers usually start by identifying the input and output, writing small readable functions, using built-in modules first, and then packaging the solution into scripts, services, or reusable modules.',
    exampleTitle: 'Simple Python program',
    exampleCode: `message = "SplashRide learns Python practically"
print(message)`,
    productionIssues: [
      'Teams call Python easy and then ignore architecture, testing, and error handling until the script grows into an unreliable production dependency.',
      'Developers mix quick scripting style with long-term service code and create unreadable modules that are hard to support.',
      'A broad ecosystem is useful, but weak dependency discipline can make environments inconsistent across machines.',
    ],
    bestPractices: [
      'Treat Python readability as an engineering asset, not as permission to skip design discipline.',
      'Prefer built-in capabilities before adding extra libraries.',
      'Separate experiments, scripts, and reusable production modules intentionally.',
      'Explain Python choices in terms of speed of delivery, clarity, and maintainability.',
    ],
    relatedTopics: ['python-installation-and-setup', 'python-syntax-basics', 'modules'],
  },
  {
    group: 'fundamentals',
    slug: 'python-installation-and-setup',
    title: 'Python Installation and Setup',
    description: 'Learn how to install Python, confirm the runtime, and set up a clean local development environment.',
    concept: 'Python setup means installing the right interpreter version, verifying PATH behavior, checking pip availability, and creating project-specific virtual environments.',
    why: 'Environment mistakes cause version drift, missing packages, and hard-to-reproduce bugs before coding even starts.',
    usage: 'Real teams rely on stable setup when onboarding developers, running scripts in CI, packaging apps, or supporting tools across Windows, macOS, and Linux.',
    workflow: 'Install Python 3, confirm python and pip commands, create a virtual environment for the project, activate it, and then install only the required dependencies.',
    exampleTitle: 'Verify Python and create a virtual environment',
    exampleCode: `python --version
python -m venv .venv
.venv\\Scripts\\activate
pip install requests`,
    productionIssues: [
      'Multiple Python versions on one machine confuse which interpreter actually runs a script.',
      'Projects fail in CI because packages were installed globally instead of inside a virtual environment.',
      'A script works locally but breaks in production because dependency versions were never pinned.',
    ],
    bestPractices: [
      'Use virtual environments per project.',
      'Record dependency versions explicitly.',
      'Verify the active interpreter before debugging package issues.',
      'Make setup steps easy to repeat through docs or scripts.',
    ],
    relatedTopics: ['what-is-python', 'pip-and-virtual-environments', 'dependency-management'],
  },
  {
    group: 'fundamentals',
    slug: 'python-syntax-basics',
    title: 'Python Syntax Basics',
    description: 'Understand indentation, statements, expressions, and the readable coding style Python depends on.',
    concept: 'Python syntax uses indentation to define code blocks, keeps statements uncluttered, and emphasizes readability over punctuation-heavy structure.',
    why: 'If a developer does not understand Python syntax rules clearly, even basic control flow and function definitions become error-prone.',
    usage: 'Syntax basics appear in every file: scripts, web handlers, tests, notebooks, automation jobs, and CLI tools.',
    workflow: 'Developers define variables, use indentation for blocks, call functions, and keep statements small enough that control flow stays obvious during review.',
    exampleTitle: 'Basic Python control flow',
    exampleCode: `name = "SplashRide"

if name:
    print(f"Hello, {name}")
else:
    print("No name provided")`,
    productionIssues: [
      'Mixed tabs and spaces create frustrating indentation errors that look harmless in some editors.',
      'Developers coming from brace-based languages sometimes misread block boundaries in nested logic.',
      'Long one-line expressions hurt readability even though the interpreter accepts them.',
    ],
    bestPractices: [
      'Let readable indentation guide the structure of the code.',
      'Keep statements short and intention-revealing.',
      'Use formatting tools consistently.',
      'Prefer explicit control flow over clever syntax tricks.',
    ],
    relatedTopics: ['comments-and-code-style', 'conditional-statements', 'loops'],
  },
  {
    group: 'fundamentals',
    slug: 'variables-and-data-types',
    title: 'Variables and Data Types',
    description: 'Learn how Python stores values and why numbers, strings, booleans, and collections behave differently.',
    concept: 'Python variables are names bound to objects, and data types define the operations, behavior, and storage rules that apply to those objects.',
    why: 'Strong type awareness helps developers avoid conversion bugs, wrong comparisons, and broken assumptions when data moves through functions or APIs.',
    usage: 'This matters in configuration parsing, form processing, JSON handling, arithmetic, reports, CLI arguments, and API payload building.',
    workflow: 'Assign values, inspect the type when behavior is unclear, convert data intentionally, and choose the right structure based on how the value will be used.',
    exampleTitle: 'Basic types',
    exampleCode: `name = "Python"
count = 3
active = True
price = 19.99

print(type(name), type(count), type(active), type(price))`,
    productionIssues: [
      'Developers assume input values are already the right type and then break calculations or API payloads.',
      'String numbers stay as strings and create subtle logic or comparison bugs.',
      'Weak type awareness makes debugging user input and environment configuration slower.',
    ],
    bestPractices: [
      'Validate and convert input data near the boundary.',
      'Choose the structure that matches the real behavior you need.',
      'Do not rely on implicit assumptions about incoming values.',
      'Use type hints when they help clarify contracts.',
    ],
    relatedTopics: ['operators', 'mutable-vs-immutable-types', 'type-hints'],
  },
  {
    group: 'fundamentals',
    slug: 'operators',
    title: 'Operators',
    description: 'Understand arithmetic, comparison, assignment, membership, and identity operators in practical Python code.',
    concept: 'Operators are the small language tools used to compute values, compare objects, test membership, and express conditions compactly.',
    why: 'Operator misunderstandings cause off-by-one issues, wrong condition checks, identity mistakes, and confusing boolean logic.',
    usage: 'Operators appear in pricing logic, input checks, loops, filters, permission checks, data validation, and API response handling.',
    workflow: 'Developers combine arithmetic or comparison operators with variables, evaluate boolean outcomes, and keep conditions readable enough to debug quickly.',
    exampleTitle: 'Comparison and membership',
    exampleCode: `roles = ["admin", "author"]
is_admin = "admin" in roles
is_exact = 10 == 10

print(is_admin, is_exact)`,
    productionIssues: [
      'Identity and equality are confused, especially with strings, numbers, and cached objects.',
      'Complex boolean expressions become hard to reason about during support incidents.',
      'Developers hide business rules inside dense conditional expressions.',
    ],
    bestPractices: [
      'Use operators in readable expressions, not puzzles.',
      'Know when membership and identity checks mean different things.',
      'Break complicated conditions into named variables.',
      'Test boundary cases around comparisons.',
    ],
    relatedTopics: ['conditional-statements', 'mutable-vs-immutable-types', 'scope'],
  },
  {
    group: 'fundamentals',
    slug: 'conditional-statements',
    title: 'Conditional Statements',
    description: 'Use if, elif, and else to control decision-making clearly in scripts and applications.',
    concept: 'Conditional statements let Python run different code paths based on boolean conditions, making business rules and branching logic explicit.',
    why: 'Most real code makes decisions based on permissions, input validity, response status, environment, or configuration flags.',
    usage: 'Conditionals appear in form validation, retries, authentication checks, file handling, feature toggles, and response transformation logic.',
    workflow: 'Define the decision clearly, keep the condition understandable, handle the success and failure paths explicitly, and avoid deeply nested branches when simpler patterns are possible.',
    exampleTitle: 'Branching by score',
    exampleCode: `score = 82

if score >= 90:
    print("Excellent")
elif score >= 75:
    print("Good")
else:
    print("Needs improvement")`,
    productionIssues: [
      'Nested if chains grow until the business rule becomes impossible to review safely.',
      'Missing else handling leads to silent no-op behavior in edge cases.',
      'Developers forget to consider invalid or missing input values.',
    ],
    bestPractices: [
      'Keep branches small and intention-revealing.',
      'Use helper functions when decision logic becomes large.',
      'Handle unexpected input explicitly.',
      'Prefer readability over clever short forms in important logic.',
    ],
    relatedTopics: ['operators', 'loops', 'exceptions'],
  },
  {
    group: 'fundamentals',
    slug: 'loops',
    title: 'Loops',
    description: 'Understand for and while loops, iteration patterns, and the kinds of bugs loops create in real Python code.',
    concept: 'Loops repeat work over sequences or until a condition changes. Python usually favors for loops over iterables because they are clearer and less error-prone than manual counters.',
    why: 'Developers need loops for file processing, API pagination, automation steps, CSV rows, and every repetitive operation that cannot be hardcoded.',
    usage: 'Real projects loop through records, retry network calls, scan directories, transform datasets, and send repeated notifications or requests.',
    workflow: 'Choose the iterable or condition, keep the loop body focused, update the state carefully, and stop early when the loop no longer needs to continue.',
    exampleTitle: 'Iterate through names',
    exampleCode: `names = ["Ana", "Raj", "Mira"]

for name in names:
    print(name.upper())`,
    productionIssues: [
      'A while loop never exits because the condition is not updated correctly.',
      'Heavy work inside loops makes scripts much slower than expected.',
      'Developers mutate collections during iteration and create unstable behavior.',
    ],
    bestPractices: [
      'Prefer for loops when iterating over known sequences.',
      'Keep loop bodies simple and measurable.',
      'Avoid network or file work inside loops unless you truly need it there.',
      'Watch for repeated work that could be batched or cached.',
    ],
    relatedTopics: ['list-comprehension', 'iterators', 'generators'],
  },
  {
    group: 'fundamentals',
    slug: 'input-and-output',
    title: 'Input and Output',
    description: 'Learn how Python receives user or system input and writes output through print, files, and returned values.',
    concept: 'Input and output in Python cover reading from users, files, APIs, arguments, or environment variables and then presenting or storing results safely.',
    why: 'Most Python code exists to transform input into output, so unclear boundaries create bugs and make testing harder.',
    usage: 'This appears in CLI tools, prompts, report scripts, file processing, logs, and API integrations.',
    workflow: 'Read input from one boundary, validate it, transform it in functions, and send output to the next boundary in a predictable format.',
    exampleTitle: 'Read and print input',
    exampleCode: `name = input("Enter your name: ")
print(f"Welcome, {name}")`,
    productionIssues: [
      'Scripts depend on interactive input and become unusable in automation or CI.',
      'Print-heavy debugging leaks into production scripts instead of proper logging.',
      'Unvalidated input flows directly into downstream logic or API calls.',
    ],
    bestPractices: [
      'Separate input collection from business logic.',
      'Validate input at the boundary.',
      'Return values from functions instead of printing everything inside them.',
      'Use logging for support information, not raw print statements in production code.',
    ],
    relatedTopics: ['file-handling', 'logging', 'environment-variables'],
  },
  {
    group: 'fundamentals',
    slug: 'comments-and-code-style',
    title: 'Comments and Code Style',
    description: 'Keep Python code readable through naming, formatting, and comments that explain intent instead of noise.',
    concept: 'Python code style covers naming, spacing, formatting, and comments that make the code easier to scan, review, and maintain over time.',
    why: 'Python readability is one of its biggest strengths, but weak style discipline quickly turns simple code into confusing support debt.',
    usage: 'Style decisions affect every script, service, test, notebook, and shared utility module in a Python codebase.',
    workflow: 'Use clear names, rely on formatting tools, add comments only where intent is not obvious, and keep functions small enough that the flow is easy to follow.',
    exampleTitle: 'Readable function with a useful comment',
    exampleCode: `def normalize_email(value: str) -> str:
    # Keep one normalization rule in one place.
    return value.strip().lower()`,
    productionIssues: [
      'Comments repeat the code instead of explaining the business reason.',
      'Inconsistent naming and formatting slow code reviews and onboarding.',
      'Large utility files become unreadable because style was treated as optional.',
    ],
    bestPractices: [
      'Prefer clear naming over extra comments.',
      'Use a formatter and consistent conventions.',
      'Comment decisions, not obvious syntax.',
      'Treat readability as part of code quality.',
    ],
    relatedTopics: ['python-syntax-basics', 'functions', 'clean-code-practices'],
  },
  {
    group: 'data-structures',
    slug: 'strings',
    title: 'Strings',
    description: 'Work with text data, formatting, slicing, and common string operations used in real Python projects.',
    concept: 'Strings are immutable text objects with many built-in methods for formatting, searching, cleaning, and transforming textual data.',
    why: 'Text handling appears everywhere: user input, file content, API payloads, logs, paths, identifiers, and templates.',
    usage: 'Real projects use strings when cleaning CSV values, building URLs, formatting logs, validating inputs, and composing messages or reports.',
    workflow: 'Read the incoming text, normalize spacing or case if needed, apply the right string methods, and keep transformations explicit enough to debug.',
    exampleTitle: 'Format and clean a string',
    exampleCode: `name = "  SplashRide Python  "
clean_name = name.strip().title()
print(clean_name)`,
    productionIssues: [
      'Teams forget strings are immutable and assume in-place changes happened.',
      'Case, whitespace, or encoding differences create subtle matching bugs.',
      'Large text transformations become messy when chained without intermediate names.',
    ],
    bestPractices: [
      'Normalize input text near the boundary.',
      'Use f-strings for readable interpolation.',
      'Name intermediate values when transformations become complex.',
      'Be careful with case-sensitive comparisons and whitespace.',
    ],
    relatedTopics: ['slicing', 'mutable-vs-immutable-types', 'json-handling'],
  },
  {
    group: 'data-structures',
    slug: 'lists',
    title: 'Lists',
    description: 'Use Python lists for ordered mutable collections and understand the operations that matter most in real code.',
    concept: 'Lists are ordered mutable collections that support indexing, appending, iteration, slicing, and many useful built-in methods.',
    why: 'Lists are the default choice for many sequences, but developers need to understand when mutation and ordering are actually helpful.',
    usage: 'Lists appear in API results, file rows, user selections, scheduled tasks, test data, and transformed records.',
    workflow: 'Collect items, iterate or transform them, append or remove values carefully, and switch to another structure if lookup or immutability becomes more important.',
    exampleTitle: 'List operations',
    exampleCode: `topics = ["syntax", "loops"]
topics.append("functions")
print(topics[0], len(topics))`,
    productionIssues: [
      'Mutating shared lists creates side effects across functions.',
      'Teams use lists for membership checks at large scale where a set would be cheaper.',
      'Indexes are assumed stable even when the list is filtered or reordered later.',
    ],
    bestPractices: [
      'Use lists when order and mutation are both meaningful.',
      'Avoid mutating shared collections casually.',
      'Use list comprehensions for simple transforms, not dense business logic.',
      'Choose a different structure when lookups dominate.',
    ],
    relatedTopics: ['tuples', 'sets', 'list-comprehension'],
  },
  {
    group: 'data-structures',
    slug: 'tuples',
    title: 'Tuples',
    description: 'Understand tuples as ordered immutable collections and know when they are better than lists.',
    concept: 'Tuples are ordered immutable collections often used for fixed-size records, unpacking, and values that should not be changed accidentally.',
    why: 'Developers need tuples when the meaning is positional and stable, or when immutability helps communicate intent.',
    usage: 'Tuples appear in coordinate pairs, function returns, database-style rows, cache keys, and unpacked values from standard-library functions.',
    workflow: 'Create the tuple, unpack values where helpful, and use it when the record shape is fixed rather than open-ended.',
    exampleTitle: 'Tuple unpacking',
    exampleCode: `user = ("Asha", "admin")
name, role = user
print(name, role)`,
    productionIssues: [
      'Developers try to mutate tuples and then patch around the real design issue.',
      'Large tuples become unreadable because positions are not self-describing.',
      'Teams use tuples where named structures would be clearer.',
    ],
    bestPractices: [
      'Use tuples for small fixed-shape values.',
      'Prefer unpacking for readability.',
      'Switch to dataclasses or dictionaries when the structure gets more descriptive.',
      'Use immutability intentionally, not by accident.',
    ],
    relatedTopics: ['lists', 'dataclasses', 'mutable-vs-immutable-types'],
  },
  {
    group: 'data-structures',
    slug: 'sets',
    title: 'Sets',
    description: 'Use sets for unique values, fast membership checks, and simple mathematical set operations.',
    concept: 'Sets are unordered collections of unique items. They are strong when you care about uniqueness and membership, not ordering.',
    why: 'Developers often reach for lists when a set would make duplicate handling and lookup logic much cleaner.',
    usage: 'Sets are used for deduplicating IDs, checking permissions, comparing tags, finding overlaps, and tracking processed records.',
    workflow: 'Load values into a set, use membership checks or intersections, and convert back to a list only when order or output formatting matters.',
    exampleTitle: 'Deduplicate values with a set',
    exampleCode: `emails = ["a@example.com", "b@example.com", "a@example.com"]
unique_emails = set(emails)
print(unique_emails)`,
    productionIssues: [
      'Teams expect stable order from sets and get confusing output changes.',
      'Unhashable values like dictionaries cause runtime errors when inserted into sets.',
      'Developers lose ordering information they actually needed later.',
    ],
    bestPractices: [
      'Use sets when uniqueness and membership are the real goals.',
      'Do not rely on ordering from a set.',
      'Know which types are hashable before storing them.',
      'Convert to other structures when presentation order matters.',
    ],
    relatedTopics: ['dictionaries', 'lists', 'mutable-vs-immutable-types'],
  },
  {
    group: 'data-structures',
    slug: 'dictionaries',
    title: 'Dictionaries',
    description: 'Understand key-value storage and why dictionaries are central to practical Python code.',
    concept: 'Dictionaries store key-value mappings and power structured data handling, configuration, lookups, JSON-like payloads, and flexible business records.',
    why: 'Most Python applications deal with named fields, response payloads, and configuration data where dictionary access is the natural pattern.',
    usage: 'Real projects use dictionaries for JSON payloads, settings, headers, feature flags, cache structures, and data transformations.',
    workflow: 'Choose clear keys, read values safely, update or merge intentionally, and avoid assuming optional keys will always exist.',
    exampleTitle: 'Dictionary lookup',
    exampleCode: `user = {"name": "Leena", "role": "editor"}
print(user["name"])
print(user.get("email", "not provided"))`,
    productionIssues: [
      'Key errors appear because code assumes a field exists in every payload.',
      'Nested dictionaries become hard to validate or reason about.',
      'Shared mutable dictionaries are changed in one place and break other logic later.',
    ],
    bestPractices: [
      'Use get or validation when keys may be optional.',
      'Keep dictionary shapes predictable.',
      'Map external payloads into cleaner internal structures when needed.',
      'Use typed models or dataclasses when dictionaries become too loose.',
    ],
    relatedTopics: ['json-handling', 'dictionary-comprehension', 'classes-and-objects'],
  },
  {
    group: 'data-structures',
    slug: 'list-comprehension',
    title: 'List Comprehension',
    description: 'Use list comprehensions for clean transformations while avoiding unreadable one-liners.',
    concept: 'A list comprehension is a concise way to build a new list from an iterable with transformation and optional filtering logic.',
    why: 'List comprehensions are common in interviews and real code because they can make small transforms clearer than manual loops.',
    usage: 'Developers use them for data cleanup, value extraction, light filtering, report formatting, and payload shaping.',
    workflow: 'Start from a simple loop, then compress it into a comprehension only if the result stays readable and the logic remains easy to explain.',
    exampleTitle: 'Square even numbers',
    exampleCode: `numbers = [1, 2, 3, 4]
even_squares = [n * n for n in numbers if n % 2 == 0]
print(even_squares)`,
    productionIssues: [
      'Large business rules are forced into one comprehension and become hard to debug.',
      'Nested comprehensions hide the meaning of the data transformation.',
      'Teams use comprehensions only because they look advanced, not because they improve clarity.',
    ],
    bestPractices: [
      'Use comprehensions for simple readable transforms.',
      'Switch back to explicit loops when the logic becomes dense.',
      'Name intermediate values when that improves debugging.',
      'Prefer clarity over brevity in business-critical code.',
    ],
    relatedTopics: ['dictionary-comprehension', 'loops', 'generators'],
  },
  {
    group: 'data-structures',
    slug: 'dictionary-comprehension',
    title: 'Dictionary Comprehension',
    description: 'Build dictionaries from iterables cleanly when the mapping logic is simple enough to stay readable.',
    concept: 'Dictionary comprehensions create key-value mappings from iterables using a compact expression, similar to list comprehensions.',
    why: 'They are useful when shaping data for lookups, reports, indexing, and config-like output without writing repetitive loops.',
    usage: 'Real projects use dictionary comprehensions to index records by ID, normalize settings, or create quick maps from API results.',
    workflow: 'Define the source iterable, decide what becomes the key and value, and keep the transformation simple enough that reviewers can understand it quickly.',
    exampleTitle: 'Map IDs to names',
    exampleCode: `users = [{"id": 1, "name": "Asha"}, {"id": 2, "name": "Ravi"}]
user_map = {user["id"]: user["name"] for user in users}
print(user_map)`,
    productionIssues: [
      'Duplicate keys overwrite earlier values silently.',
      'Too much logic inside the comprehension makes data shaping harder to troubleshoot.',
      'Developers forget whether the key choice is actually unique.',
    ],
    bestPractices: [
      'Choose keys carefully and know whether overwriting is acceptable.',
      'Keep dictionary comprehensions simple.',
      'Use explicit loops when validation or branching gets larger.',
      'Document unusual indexing rules.',
    ],
    relatedTopics: ['dictionaries', 'list-comprehension', 'json-handling'],
  },
  {
    group: 'data-structures',
    slug: 'slicing',
    title: 'Slicing',
    description: 'Learn how slicing works for strings, lists, and tuples and why off-by-one thinking matters.',
    concept: 'Slicing extracts ranges from sequence types using start, stop, and step positions. Python slices are inclusive of the start and exclusive of the stop.',
    why: 'Developers need slicing for batching, previews, pagination-like behavior, reversing, and extracting parts of collections or strings.',
    usage: 'Real projects slice logs, messages, CSV rows, result windows, lists of jobs, and string fragments from identifiers or dates.',
    workflow: 'Pick the sequence, define the range, remember the stop index is excluded, and test the boundary conditions before relying on the result.',
    exampleTitle: 'Take the first three items',
    exampleCode: `items = ["a", "b", "c", "d", "e"]
print(items[:3])
print(items[::2])`,
    productionIssues: [
      'Off-by-one mistakes create missing or extra records in data processing.',
      'Slicing large lists creates copies that increase memory usage unexpectedly.',
      'Teams use hardcoded slice boundaries without documenting why those limits exist.',
    ],
    bestPractices: [
      'Test slice boundaries with small examples.',
      'Remember slicing usually creates a new sequence.',
      'Use named constants when slice sizes matter to business logic.',
      'Avoid magical numbers in repeated slice operations.',
    ],
    relatedTopics: ['strings', 'lists', 'generators'],
  },
  {
    group: 'data-structures',
    slug: 'mutable-vs-immutable-types',
    title: 'Mutable vs Immutable Types',
    description: 'Understand which Python objects can change in place and why that affects bugs, copying, and function behavior.',
    concept: 'Mutable objects can be changed after creation, while immutable objects cannot. This affects side effects, copying, hashing, and how values behave when passed around.',
    why: 'Many Python bugs come from shared mutable state or from misunderstanding when a function changed the original object.',
    usage: 'This matters in list updates, dictionary handling, function arguments, caching, set membership, and concurrency-sensitive code.',
    workflow: 'Identify whether the object can change, decide whether in-place mutation is safe, and copy or redesign the flow if shared state would be risky.',
    exampleTitle: 'Mutability example',
    exampleCode: `numbers = [1, 2]
alias = numbers
alias.append(3)

print(numbers)`,
    productionIssues: [
      'A function mutates a list argument and surprises the caller.',
      'Mutable defaults or shared state create cross-request or cross-test contamination.',
      'Developers use mutable values where hashable immutable values were required.',
    ],
    bestPractices: [
      'Know when mutation is intentional and visible to callers.',
      'Avoid shared mutable defaults.',
      'Copy data carefully when ownership changes.',
      'Explain mutability trade-offs clearly in interviews and reviews.',
    ],
    relatedTopics: ['shallow-copy-vs-deep-copy', 'lists', 'tuples'],
  },
  {
    group: 'functions-modules',
    slug: 'functions',
    title: 'Functions',
    description: 'Use functions to organize logic, reduce repetition, and make Python code easier to test.',
    concept: 'Functions package behavior into reusable blocks with parameters, return values, and one clear responsibility.',
    why: 'Without functions, scripts become long, repetitive, and difficult to debug or extend safely.',
    usage: 'Functions appear in every real Python project: parsing input, validating data, calling APIs, handling records, and formatting output.',
    workflow: 'Define the responsibility, accept only the needed inputs, return useful values, and keep side effects explicit.',
    exampleTitle: 'Simple reusable function',
    exampleCode: `def greet(name: str) -> str:
    return f"Hello, {name}"

print(greet("Python"))`,
    productionIssues: [
      'Huge functions hide multiple responsibilities and become impossible to test cleanly.',
      'Functions print results instead of returning values, which limits reuse.',
      'Too many side effects make debugging harder than the logic itself.',
    ],
    bestPractices: [
      'Keep functions focused on one responsibility.',
      'Return values instead of printing from business logic.',
      'Use names that reveal intent.',
      'Pass dependencies in explicitly when practical.',
    ],
    relatedTopics: ['function-arguments', 'scope', 'unit-testing'],
  },
  {
    group: 'functions-modules',
    slug: 'function-arguments',
    title: 'Function Arguments',
    description: 'Understand positional, keyword, and flexible argument passing patterns in Python.',
    concept: 'Function arguments define how data enters a function. Python supports positional, keyword, optional, and flexible argument styles that affect usability and clarity.',
    why: 'Argument design shapes how readable, safe, and reusable a function becomes in real projects.',
    usage: 'Teams deal with argument design in utility functions, API clients, model factories, CLI handlers, and test helpers.',
    workflow: 'Choose required arguments first, make optional values explicit, prefer clear names, and avoid signatures that are powerful but confusing.',
    exampleTitle: 'Positional and keyword arguments',
    exampleCode: `def create_user(name, role="viewer", active=True):
    return {"name": name, "role": role, "active": active}

print(create_user("Asha", role="admin"))`,
    productionIssues: [
      'Too many positional arguments make calls unreadable.',
      'Functions become brittle because callers depend on parameter order too heavily.',
      'Implicit optional values hide important behavior changes.',
    ],
    bestPractices: [
      'Use keyword arguments when readability matters.',
      'Keep signatures small and intentional.',
      'Document non-obvious defaults.',
      'Refactor oversized argument lists into objects or configs when needed.',
    ],
    relatedTopics: ['default-arguments', 'args-and-kwargs', 'functions'],
  },
  {
    group: 'functions-modules',
    slug: 'default-arguments',
    title: 'Default Arguments',
    description: 'Use optional parameters carefully and avoid the classic mutable-default bug.',
    concept: 'Default arguments let a function accept fewer arguments, but defaults are evaluated once at function-definition time, not on every call.',
    why: 'Interviewers and production bugs both focus on defaults because mutable defaults create surprising shared state.',
    usage: 'Defaults appear in helpers, wrappers, API clients, configuration utilities, and constructors where optional behavior is common.',
    workflow: 'Set simple immutable defaults directly, and use None with internal initialization when the default should be a fresh mutable object.',
    exampleTitle: 'Safe default list pattern',
    exampleCode: `def add_item(item, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket`,
    productionIssues: [
      'A mutable default accumulates values across calls and contaminates later requests or tests.',
      'Defaults hide important behavior that callers do not realize they accepted.',
      'Optional arguments multiply branches without clear documentation.',
    ],
    bestPractices: [
      'Use None for mutable defaults.',
      'Keep default behavior unsurprising.',
      'Document defaults that change business behavior.',
      'Test repeated calls when defaults are involved.',
    ],
    relatedTopics: ['function-arguments', 'mutable-vs-immutable-types', 'classes-and-objects'],
  },
  {
    group: 'functions-modules',
    slug: 'args-and-kwargs',
    title: '*args and **kwargs',
    description: 'Understand flexible argument collection and when it helps versus when it hides clarity.',
    concept: 'The *args pattern collects extra positional arguments, and **kwargs collects extra keyword arguments into dictionaries.',
    why: 'These patterns are common in wrappers, framework hooks, reusable utilities, and interview questions about Python flexibility.',
    usage: 'Real projects use them in decorators, helper wrappers, CLI libraries, API clients, and framework integration code.',
    workflow: 'Use *args and **kwargs when you truly need flexible pass-through behavior, then unpack them carefully into the downstream call or processing logic.',
    exampleTitle: 'Flexible logging helper',
    exampleCode: `def log_event(event, *args, **kwargs):
    print(event, args, kwargs)

log_event("user_login", 42, source="api")`,
    productionIssues: [
      'Functions become unclear because *args and **kwargs hide the real contract.',
      'Pass-through wrappers swallow wrong arguments until runtime.',
      'Debugging is harder because callers and callees are loosely coupled by convention only.',
    ],
    bestPractices: [
      'Use flexible arguments deliberately, not by default.',
      'Prefer explicit parameters when the contract is stable.',
      'Document what kwargs are accepted.',
      'Validate forwarded arguments near the boundary.',
    ],
    relatedTopics: ['function-arguments', 'decorators', 'lambda-functions'],
  },
  {
    group: 'functions-modules',
    slug: 'lambda-functions',
    title: 'Lambda Functions',
    description: 'Use small anonymous functions where they improve clarity and avoid forcing complex logic into one line.',
    concept: 'A lambda function is a compact anonymous function used for short expressions, usually as a callback or simple transformation.',
    why: 'Lambdas appear often in sorting, lightweight mapping, and callback-based APIs, but misuse hurts readability quickly.',
    usage: 'Real code uses lambdas in sorted keys, small transforms, short filters, and framework or library callbacks.',
    workflow: 'Use a lambda only when the logic is tiny and local; if it needs naming, comments, or branching, switch to a regular function.',
    exampleTitle: 'Sort by score',
    exampleCode: `users = [{"name": "Ana", "score": 90}, {"name": "Raj", "score": 82}]
sorted_users = sorted(users, key=lambda user: user["score"], reverse=True)
print(sorted_users)`,
    productionIssues: [
      'Developers hide non-trivial logic in lambdas and make debugging harder.',
      'Anonymous callbacks become unclear in larger pipelines.',
      'Tracebacks are less expressive when every helper is anonymous.',
    ],
    bestPractices: [
      'Use lambdas only for short clear expressions.',
      'Prefer named functions for reusable logic.',
      'Avoid nested lambdas in business code.',
      'Optimize for readability first.',
    ],
    relatedTopics: ['functions', 'list-comprehension', 'sorting'],
  },
  {
    group: 'functions-modules',
    slug: 'scope',
    title: 'Scope',
    description: 'Understand local, global, and enclosing scope so Python variable lookup stays predictable.',
    concept: 'Python resolves names through local, enclosing, global, and built-in scope. That lookup model matters in nested functions, closures, and module-level code.',
    why: 'Scope mistakes create shadowed values, hard-to-test globals, and confusing behavior in callbacks or decorators.',
    usage: 'Scope appears in nested helper functions, shared configuration, module constants, and function closures.',
    workflow: 'Prefer local scope by default, keep globals minimal, and understand when nested functions capture values from the outer scope.',
    exampleTitle: 'Nested function scope',
    exampleCode: `def outer():
    message = "hello"

    def inner():
        return message.upper()

    return inner()`,
    productionIssues: [
      'Global state leaks between tests or requests.',
      'A local variable shadows a module-level value and changes behavior unexpectedly.',
      'Closures capture values in ways the developer did not intend.',
    ],
    bestPractices: [
      'Keep global mutable state to a minimum.',
      'Prefer explicit parameters over hidden outer-scope dependencies.',
      'Use constants clearly at module level.',
      'Understand closures before relying on nested behavior.',
    ],
    relatedTopics: ['functions', 'decorators', 'closures'],
  },
  {
    group: 'functions-modules',
    slug: 'modules',
    title: 'Modules',
    description: 'Learn how Python files become importable modules and why module boundaries matter for maintainability.',
    concept: 'A module is a Python file whose functions, classes, and constants can be imported and reused from other files.',
    why: 'Modules let teams organize code by responsibility instead of leaving everything in one growing script.',
    usage: 'Real projects split API clients, models, services, utility helpers, config handling, and CLI entry points into separate modules.',
    workflow: 'Create a file with a clear responsibility, define reusable names inside it, import those names where needed, and avoid circular dependencies.',
    exampleTitle: 'Import from a module',
    exampleCode: `# helpers.py
def normalize_name(value):
    return value.strip().title()

# main.py
from helpers import normalize_name`,
    productionIssues: [
      'Circular imports appear because modules depend on each other in unclear ways.',
      'A giant utils module becomes the dumping ground for unrelated code.',
      'Import-time side effects make startup behavior fragile.',
    ],
    bestPractices: [
      'Group code by responsibility, not by random convenience.',
      'Avoid heavy work at import time.',
      'Keep module dependencies directional and clear.',
      'Refactor dump-style utility files early.',
    ],
    relatedTopics: ['packages', 'pip-and-virtual-environments', 'dependency-management'],
  },
  {
    group: 'functions-modules',
    slug: 'packages',
    title: 'Packages',
    description: 'Understand how Python packages group multiple modules into a larger reusable code unit.',
    concept: 'A package is a directory-based code organization unit that groups related modules and can expose a clearer import surface for larger projects.',
    why: 'As projects grow, packages make code structure easier to navigate and help teams keep related modules together.',
    usage: 'Packages appear in application folders, shared internal libraries, published tooling, and framework-based codebases.',
    workflow: 'Group related modules into a package, define the public entry points intentionally, and keep internal structure understandable for maintainers.',
    exampleTitle: 'Simple package layout',
    exampleCode: `project/
  app/
    __init__.py
    services.py
    models.py`,
    productionIssues: [
      'Deep package trees hide simple responsibilities behind too much nesting.',
      'Developers expose internal modules accidentally and create unstable imports.',
      'Relative import confusion slows onboarding and debugging.',
    ],
    bestPractices: [
      'Use packages to clarify ownership, not only to add folders.',
      'Keep public imports intentional.',
      'Avoid unnecessary nesting.',
      'Document important package boundaries in larger codebases.',
    ],
    relatedTopics: ['modules', 'pip-and-virtual-environments', 'project-structure'],
  },
  {
    group: 'functions-modules',
    slug: 'pip-and-virtual-environments',
    title: 'pip and Virtual Environments',
    description: 'Manage Python dependencies safely with pip and project-specific virtual environments.',
    concept: 'pip installs packages, and virtual environments isolate those packages per project so dependencies do not clash globally.',
    why: 'Python projects break quickly when different apps share incompatible dependency versions on the same machine.',
    usage: 'This matters in backend services, CLI tools, automation scripts, CI pipelines, and onboarding documentation.',
    workflow: 'Create a virtual environment, activate it, install dependencies with pip, freeze or record versions, and keep the environment scoped to the project.',
    exampleTitle: 'Create and use a project environment',
    exampleCode: `python -m venv .venv
.venv\\Scripts\\activate
pip install fastapi pytest`,
    productionIssues: [
      'A developer installs packages globally and later cannot reproduce the working setup.',
      'Deployments fail because requirements files are incomplete or stale.',
      'Package version drift across environments causes different runtime behavior.',
    ],
    bestPractices: [
      'Never depend on global site-packages for project code.',
      'Pin versions with intention.',
      'Keep install steps scriptable and documented.',
      'Review dependency upgrades before production rollout.',
    ],
    relatedTopics: ['python-installation-and-setup', 'dependency-management', 'production-best-practices'],
  },
  {
    group: 'oop',
    slug: 'classes-and-objects',
    title: 'Classes and Objects',
    description: 'Use classes to model state and behavior together when a problem is larger than a few standalone functions.',
    concept: 'Classes define blueprints for objects, and objects are concrete instances that carry data and behavior together.',
    why: 'OOP becomes useful when teams need reusable domain models, services with state, or cleaner separation of responsibilities.',
    usage: 'Real Python projects use classes for domain models, clients, service objects, repositories, parsers, and framework-integrated components.',
    workflow: 'Model one responsibility per class, create instances with clear state, attach methods that operate on that state, and avoid turning classes into giant dumping grounds.',
    exampleTitle: 'Basic class',
    exampleCode: `class User:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, {self.name}"`,
    productionIssues: [
      'Developers create classes where simple functions would have been clearer.',
      'Classes grow too large and take on multiple responsibilities.',
      'State and side effects mix together until testing becomes painful.',
    ],
    bestPractices: [
      'Use classes when state plus behavior genuinely belong together.',
      'Keep responsibilities narrow.',
      'Expose clear methods instead of leaking internal state everywhere.',
      'Prefer composition when inheritance adds confusion.',
    ],
    relatedTopics: ['constructor', 'inheritance', 'dataclasses'],
  },
  {
    group: 'oop',
    slug: 'constructor',
    title: 'Constructor',
    description: 'Understand __init__ and how Python objects are initialized with the state they need.',
    concept: 'The constructor pattern in Python usually means using __init__ to set up object state after the instance has been created.',
    why: 'Initialization mistakes create half-configured objects, hidden defaults, and bugs that appear only when the object is used later.',
    usage: 'Constructors appear in service clients, domain models, configuration holders, and framework-integrated classes.',
    workflow: 'Accept the required initialization inputs, validate them if needed, store them on self, and avoid doing too much unrelated work inside initialization.',
    exampleTitle: 'Initialize object state',
    exampleCode: `class ReportJob:
    def __init__(self, source, retries=3):
        self.source = source
        self.retries = retries`,
    productionIssues: [
      'Constructors do expensive network or file work and make object creation fragile.',
      'Optional parameters multiply until the object contract is unclear.',
      'Objects can be instantiated in invalid states because required values were not checked.',
    ],
    bestPractices: [
      'Keep __init__ focused on setting state.',
      'Validate critical inputs early.',
      'Avoid heavy side effects during object construction.',
      'Refactor oversized constructors into configuration objects or builders when needed.',
    ],
    relatedTopics: ['classes-and-objects', 'instance-variables-and-class-variables', 'dataclasses'],
  },
  {
    group: 'oop',
    slug: 'instance-variables-and-class-variables',
    title: 'Instance Variables and Class Variables',
    description: 'Know the difference between per-object state and shared class-level state.',
    concept: 'Instance variables live on each object, while class variables are shared across the class unless overridden on an instance.',
    why: 'Developers often create shared-state bugs by using class variables where instance state was intended.',
    usage: 'This matters in configuration defaults, counters, registries, cached settings, and framework-integrated classes.',
    workflow: 'Store per-object state on self, reserve class variables for truly shared constants or metadata, and be explicit about when shared state is acceptable.',
    exampleTitle: 'Shared vs per-instance values',
    exampleCode: `class User:
    kind = "member"

    def __init__(self, name):
        self.name = name`,
    productionIssues: [
      'A mutable class variable is changed by one instance and affects every instance unexpectedly.',
      'Teams confuse shared metadata with per-request or per-user state.',
      'Debugging becomes slower because the state origin is not obvious.',
    ],
    bestPractices: [
      'Use instance variables for request, user, or job-specific state.',
      'Keep class variables mostly immutable.',
      'Avoid mutable shared defaults at class level.',
      'Explain shared-state choices clearly in reviews.',
    ],
    relatedTopics: ['constructor', 'mutable-vs-immutable-types', 'classes-and-objects'],
  },
  {
    group: 'oop',
    slug: 'inheritance',
    title: 'Inheritance',
    description: 'Use inheritance carefully for shared behavior and avoid creating rigid class hierarchies.',
    concept: 'Inheritance lets one class reuse or extend behavior from another, but it also couples design decisions across the hierarchy.',
    why: 'Inheritance is common in interviews, yet in production it should be chosen carefully because it can overcomplicate code structure.',
    usage: 'Real Python projects use inheritance in framework classes, specialized handlers, custom exceptions, and occasionally domain models with truly shared behavior.',
    workflow: 'Start with a clear base behavior, extend only where the child really is a specialized version, and prefer composition if inheritance mainly exists for code reuse.',
    exampleTitle: 'Basic inheritance',
    exampleCode: `class Animal:
    def speak(self):
        return "sound"

class Dog(Animal):
    def speak(self):
        return "bark"`,
    productionIssues: [
      'Inheritance trees grow deep and make changes risky.',
      'A child class breaks expectations from the parent contract.',
      'Developers use inheritance only to reuse a few lines of code.',
    ],
    bestPractices: [
      'Use inheritance for real specialization, not convenience alone.',
      'Keep hierarchies shallow.',
      'Prefer composition when behavior can be injected or delegated.',
      'Test parent-child contracts clearly.',
    ],
    relatedTopics: ['polymorphism', 'abstraction', 'classes-and-objects'],
  },
  {
    group: 'oop',
    slug: 'polymorphism',
    title: 'Polymorphism',
    description: 'Understand how different objects can share the same interface while behaving differently.',
    concept: 'Polymorphism means code can call the same method on different object types and get type-specific behavior without branching everywhere.',
    why: 'This matters because good design often depends on consistent interfaces rather than type-checking every object manually.',
    usage: 'Real projects use polymorphism in handlers, serializers, payment or notification strategies, plugin systems, and framework extension points.',
    workflow: 'Define the behavior contract, implement it differently per class, and write calling code that depends on the shared interface rather than the concrete type.',
    exampleTitle: 'Same method, different behavior',
    exampleCode: `class EmailNotifier:
    def send(self):
        return "email sent"

class SmsNotifier:
    def send(self):
        return "sms sent"`,
    productionIssues: [
      'Teams claim polymorphism but still litter the calling code with isinstance checks.',
      'Shared interfaces are too vague and do not protect the behavior contract.',
      'The abstraction adds indirection without real benefit.',
    ],
    bestPractices: [
      'Design around stable behavior contracts.',
      'Let callers rely on the interface, not the concrete class.',
      'Avoid fake abstraction layers that add ceremony but not clarity.',
      'Use tests to confirm each implementation honors the contract.',
    ],
    relatedTopics: ['inheritance', 'abstraction', 'duck-typing'],
  },
  {
    group: 'oop',
    slug: 'encapsulation',
    title: 'Encapsulation',
    description: 'Keep object state and behavior together while reducing unsafe direct access to internal details.',
    concept: 'Encapsulation is the design practice of controlling how object state is read or changed so callers interact through clear methods or properties.',
    why: 'Uncontrolled direct state changes make systems harder to validate, debug, and evolve safely.',
    usage: 'This matters in domain models, configuration objects, service wrappers, and any class that must protect invariants.',
    workflow: 'Decide which state should be public, keep critical changes behind methods or validated properties, and avoid letting callers mutate everything freely.',
    exampleTitle: 'Validated state update',
    exampleCode: `class Account:
    def __init__(self, balance=0):
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self._balance += amount`,
    productionIssues: [
      'External code mutates internal state directly and breaks invariants.',
      'A class exposes too many details and becomes tightly coupled to callers.',
      'Validation logic is bypassed because there is no single safe update path.',
    ],
    bestPractices: [
      'Protect important invariants behind methods or properties.',
      'Use internal naming conventions consistently.',
      'Expose only what callers genuinely need.',
      'Keep validation close to the state it protects.',
    ],
    relatedTopics: ['abstraction', 'classes-and-objects', 'properties'],
  },
  {
    group: 'oop',
    slug: 'abstraction',
    title: 'Abstraction',
    description: 'Focus code on the behavior that matters while hiding unnecessary implementation detail.',
    concept: 'Abstraction means exposing the useful interface of a concept while keeping implementation details private or changeable behind that interface.',
    why: 'Teams need abstraction to keep calling code clean and to reduce the impact of implementation changes across a codebase.',
    usage: 'Abstraction appears in repositories, API clients, service layers, adapters, and interfaces between infrastructure and business logic.',
    workflow: 'Identify the behavior callers actually need, define a clean API for it, and keep the details behind that boundary changeable without breaking the rest of the system.',
    exampleTitle: 'Simple service abstraction',
    exampleCode: `class EmailService:
    def send_welcome(self, user_email):
        return f"Sending welcome email to {user_email}"`,
    productionIssues: [
      'Abstract layers are added too early and become empty ceremony.',
      'A so-called abstraction leaks too many low-level details to callers.',
      'Refactors break many modules because the boundary was not stable enough.',
    ],
    bestPractices: [
      'Abstract only when it makes calling code simpler or safer.',
      'Keep the public contract smaller than the implementation.',
      'Avoid interfaces that are generic but not useful.',
      'Revisit abstractions when they no longer match real behavior.',
    ],
    relatedTopics: ['polymorphism', 'encapsulation', 'classes-and-objects'],
  },
  {
    group: 'oop',
    slug: 'dunder-methods',
    title: 'Dunder Methods',
    description: 'Understand special methods like __init__, __str__, and __len__ and how they integrate classes into Python behavior.',
    concept: 'Dunder methods, or special methods, let custom objects participate in built-in Python behavior such as string conversion, equality checks, iteration, and arithmetic-like operations.',
    why: 'Interviewers ask about dunder methods because they reveal whether you understand Python object behavior beyond ordinary methods.',
    usage: 'Real projects use them for readable models, custom containers, value objects, configuration classes, and framework-integrated types.',
    workflow: 'Pick only the dunder methods that express meaningful behavior for the object, implement them predictably, and avoid clever overloads that make code surprising.',
    exampleTitle: 'Readable object representation',
    exampleCode: `class User:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"User({self.name})"`,
    productionIssues: [
      'Custom equality or representation methods behave inconsistently and confuse debugging.',
      'Too many overloaded behaviors make objects magical instead of understandable.',
      'Developers implement dunder methods without thinking through the object contract.',
    ],
    bestPractices: [
      'Implement only the special behavior that truly helps.',
      'Keep dunder behavior unsurprising.',
      'Use __repr__ or __str__ to improve debugging clarity.',
      'Test custom equality or ordering carefully.',
    ],
    relatedTopics: ['classes-and-objects', 'dataclasses', 'mutable-vs-immutable-types'],
  },
  {
    group: 'oop',
    slug: 'dataclasses',
    title: 'dataclasses',
    description: 'Use dataclasses to model data-heavy classes with less boilerplate and clearer intent.',
    concept: 'Dataclasses are a Python feature for classes that mainly store data. They generate common methods like __init__ and __repr__ automatically.',
    why: 'They reduce boilerplate and make data-centric modeling cleaner when a full manual class would add repetitive code.',
    usage: 'Teams use dataclasses for configuration objects, DTO-like structures, parsed records, task metadata, and domain values.',
    workflow: 'Define the fields, add type hints, choose defaults carefully, and only add custom methods where the class needs behavior beyond simple storage.',
    exampleTitle: 'Simple dataclass',
    exampleCode: `from dataclasses import dataclass

@dataclass
class User:
    name: str
    role: str = "viewer"`,
    productionIssues: [
      'Developers treat dataclasses as full domain models without deciding where behavior should live.',
      'Mutable defaults still create problems if defined carelessly.',
      'Teams overuse dataclasses where a dictionary or named tuple would have been enough.',
    ],
    bestPractices: [
      'Use dataclasses for data-centric models with clear fields.',
      'Watch mutable defaults carefully.',
      'Add behavior only when it belongs with the data.',
      'Use type hints to make the model clearer.',
    ],
    relatedTopics: ['classes-and-objects', 'constructor', 'type-hints'],
  },
  {
    group: 'errors-files',
    slug: 'exceptions',
    title: 'Exceptions',
    description: 'Understand what exceptions are and why Python uses them to signal error conditions.',
    concept: 'Exceptions are runtime signals that something went wrong or a normal path could not continue safely.',
    why: 'Developers need exception awareness to avoid silent failures and to write code that handles recoverable problems intentionally.',
    usage: 'Exceptions appear in parsing, file access, network calls, database work, authentication, and validation.',
    workflow: 'Identify what can fail, let irrecoverable issues surface, and catch only the exceptions you can handle meaningfully.',
    exampleTitle: 'Handle a conversion failure',
    exampleCode: `value = "abc"

try:
    number = int(value)
except ValueError:
    print("Invalid number")`,
    productionIssues: [
      'Broad except blocks hide real root causes and make support harder.',
      'Errors are swallowed without logging or recovery.',
      'Teams use exceptions as normal control flow in performance-sensitive paths.',
    ],
    bestPractices: [
      'Catch specific exceptions when possible.',
      'Handle only the failures you can recover from.',
      'Log useful context for support.',
      'Avoid silent except blocks.',
    ],
    relatedTopics: ['try-except-finally', 'custom-exceptions', 'logging'],
  },
  {
    group: 'errors-files',
    slug: 'try-except-finally',
    title: 'try except finally',
    description: 'Use try, except, else, and finally to manage failures and cleanup correctly.',
    concept: 'The try-except-finally structure separates risky code, error handling, optional success handling, and cleanup that must run no matter what.',
    why: 'This structure is central to reliable file work, cleanup, retries, and controlled failure handling.',
    usage: 'Real projects use it around file access, database calls, API requests, parsing, and cleanup of external resources.',
    workflow: 'Put only the risky code inside try, catch the specific error you can handle, and use finally or context managers for cleanup.',
    exampleTitle: 'Guaranteed cleanup',
    exampleCode: `file = open("data.txt")
try:
    content = file.read()
finally:
    file.close()`,
    productionIssues: [
      'Too much code inside try makes debugging the real failing line harder.',
      'Cleanup is forgotten when exceptions occur.',
      'Generic exception handling turns recoverable problems into hidden behavior.',
    ],
    bestPractices: [
      'Keep try blocks small.',
      'Use finally for guaranteed cleanup when needed.',
      'Prefer context managers for resource handling.',
      'Catch the narrowest useful exception.',
    ],
    relatedTopics: ['exceptions', 'context-managers', 'file-handling'],
  },
  {
    group: 'errors-files',
    slug: 'custom-exceptions',
    title: 'Custom Exceptions',
    description: 'Create custom exception types when business or application errors need clearer meaning.',
    concept: 'Custom exceptions let code represent domain-specific failures with names that are easier to catch, log, and explain than generic built-in exceptions.',
    why: 'Generic exceptions make production incidents harder to triage because the failure meaning gets lost.',
    usage: 'Teams use custom exceptions in validation flows, payment logic, API wrappers, workflow engines, and business-rule enforcement.',
    workflow: 'Define an exception class for a meaningful failure type, raise it where that failure occurs, and catch it where the caller can recover or map it cleanly.',
    exampleTitle: 'Custom validation exception',
    exampleCode: `class InvalidStatusError(Exception):
    pass

raise InvalidStatusError("Unknown order status")`,
    productionIssues: [
      'Too many tiny custom exceptions add complexity without real value.',
      'Teams raise generic Exception instead of giving failures domain meaning.',
      'Callers catch everything broadly and lose the benefit of the custom type.',
    ],
    bestPractices: [
      'Create custom exceptions for meaningful application-level failures.',
      'Name them after the problem, not the implementation.',
      'Keep the hierarchy simple.',
      'Use them where recovery or clearer mapping is actually useful.',
    ],
    relatedTopics: ['exceptions', 'logging', 'authentication-basics'],
  },
  {
    group: 'errors-files',
    slug: 'file-handling',
    title: 'File Handling',
    description: 'Understand how Python opens, reads, writes, and safely closes files.',
    concept: 'File handling in Python means interacting with text or binary files through open modes, streams, and safe resource management.',
    why: 'Files are a common automation and backend boundary, and careless handling causes leaks, encoding bugs, or corrupted output.',
    usage: 'Real scripts read config files, write reports, process logs, upload generated files, and move structured data between systems.',
    workflow: 'Choose the mode, open the file safely, read or write what you need, handle errors, and close the resource automatically with a context manager.',
    exampleTitle: 'Read a file safely',
    exampleCode: `with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)`,
    productionIssues: [
      'Files are left open because cleanup was manual and forgotten.',
      'Wrong encoding assumptions break non-English text.',
      'Large files are read fully into memory when streaming would have been safer.',
    ],
    bestPractices: [
      'Prefer context managers for file operations.',
      'Specify encoding intentionally for text files.',
      'Stream large files instead of loading everything at once when possible.',
      'Handle missing files and permissions clearly.',
    ],
    relatedTopics: ['reading-and-writing-files', 'context-managers', 'csv-handling'],
  },
  {
    group: 'errors-files',
    slug: 'reading-and-writing-files',
    title: 'Reading and Writing Files',
    description: 'Work with text and binary file reads and writes while avoiding overwrite and memory mistakes.',
    concept: 'Reading and writing files means choosing the right mode, controlling buffering and encoding, and deciding whether the full file or a streamed approach is safer.',
    why: 'Many scripts fail because file access seems simple until files become large, concurrent, or business-critical.',
    usage: 'This is used in export jobs, batch uploads, backups, report generation, ETL steps, and configuration management.',
    workflow: 'Decide whether to read the whole file or line by line, write atomically when appropriate, and confirm the output path and overwrite behavior.',
    exampleTitle: 'Write output lines',
    exampleCode: `lines = ["python", "automation", "testing"]

with open("topics.txt", "w", encoding="utf-8") as file:
    for line in lines:
        file.write(f"{line}\\n")`,
    productionIssues: [
      'A write mode overwrites an important file unexpectedly.',
      'Large files are loaded into memory and slow down or crash the job.',
      'Partial writes leave broken output when failures are not handled carefully.',
    ],
    bestPractices: [
      'Be explicit about read, write, and append modes.',
      'Use streaming for large files.',
      'Validate file paths before writing in automation jobs.',
      'Consider temporary-file strategies for critical outputs.',
    ],
    relatedTopics: ['file-handling', 'json-handling', 'csv-handling'],
  },
  {
    group: 'errors-files',
    slug: 'json-handling',
    title: 'JSON Handling',
    description: 'Parse and produce JSON safely when Python code interacts with APIs, files, and structured payloads.',
    concept: 'JSON handling in Python usually means converting between strings or files and Python dictionaries or lists using the json module.',
    why: 'Most modern systems exchange JSON, so developers must understand parsing, serialization, and data-shape validation.',
    usage: 'JSON is everywhere in REST APIs, config files, queued messages, frontend-backend communication, and structured automation output.',
    workflow: 'Load JSON from a trusted source, validate the shape you need, transform it into a cleaner internal model, and serialize output intentionally.',
    exampleTitle: 'Parse JSON',
    exampleCode: `import json

payload = '{"name": "Asha", "role": "admin"}'
user = json.loads(payload)
print(user["name"])`,
    productionIssues: [
      'Code assumes keys exist in every JSON payload and crashes on edge cases.',
      'Datetime or custom object serialization fails because JSON supports only basic types directly.',
      'Developers trust external JSON too much and skip validation.',
    ],
    bestPractices: [
      'Validate external JSON before deep usage.',
      'Map loose payloads into cleaner internal structures.',
      'Handle serialization of non-basic types intentionally.',
      'Log malformed payload context safely.',
    ],
    relatedTopics: ['dictionaries', 'rest-apis-with-python', 'working-with-apis'],
  },
  {
    group: 'errors-files',
    slug: 'csv-handling',
    title: 'CSV Handling',
    description: 'Work with CSV files for imports, exports, and batch-processing jobs without creating parsing bugs.',
    concept: 'CSV handling in Python typically uses the csv module to read rows, write rows, and deal with delimiters, quoting, and headers correctly.',
    why: 'CSV work looks simple until inconsistent data, large files, or encoding quirks turn a tiny script into a support headache.',
    usage: 'Teams use CSV handling in reports, data migration, export jobs, finance uploads, inventory updates, and partner-system integrations.',
    workflow: 'Read the header first, choose DictReader or DictWriter when names matter, process rows carefully, and stream the file when the dataset is large.',
    exampleTitle: 'Read CSV rows by column name',
    exampleCode: `import csv

with open("users.csv", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["email"])`,
    productionIssues: [
      'Hardcoded column positions break when the export format changes.',
      'Large CSV files are loaded into memory instead of streamed row by row.',
      'Quoted commas or bad encodings create malformed parsing results.',
    ],
    bestPractices: [
      'Prefer DictReader when headers exist.',
      'Stream large CSV files row by row.',
      'Validate required columns early.',
      'Log row-level failures with enough context for recovery.',
    ],
    relatedTopics: ['json-handling', 'file-handling', 'data-processing-scripts'],
  },
  {
    group: 'errors-files',
    slug: 'logging',
    title: 'Logging',
    description: 'Use structured, useful logs instead of print-heavy debugging in production Python code.',
    concept: 'Logging records operational information about what the code is doing, what failed, and what context helps support or debugging teams.',
    why: 'Print statements are not enough once scripts run in schedulers, services, workers, or CI environments.',
    usage: 'Logs are used in APIs, background jobs, ETL pipelines, automation scripts, monitoring flows, and troubleshooting incidents.',
    workflow: 'Create a logger, choose the right level, log key context without leaking secrets, and make logs meaningful for support teams rather than only for local debugging.',
    exampleTitle: 'Basic logger',
    exampleCode: `import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("Job started")`,
    productionIssues: [
      'Logs are too noisy to help during an incident.',
      'Secrets or sensitive data are written into logs carelessly.',
      'Teams have only print output and cannot trace background job behavior after failure.',
    ],
    bestPractices: [
      'Use log levels intentionally.',
      'Log enough context to debug without leaking sensitive data.',
      'Keep messages structured and stable.',
      'Treat logging as part of production architecture, not an afterthought.',
    ],
    relatedTopics: ['exceptions', 'debugging', 'production-best-practices'],
  },
  {
    group: 'advanced',
    slug: 'iterators',
    title: 'Iterators',
    description: 'Understand the iterator protocol and how Python pulls values one at a time.',
    concept: 'An iterator is an object that returns one value at a time through the iteration protocol, which helps Python handle sequences lazily and consistently.',
    why: 'Iterator knowledge helps developers reason about loops, generators, memory usage, and data-processing pipelines.',
    usage: 'Iterators appear in file reads, generators, custom container classes, itertools flows, and streamed data processing.',
    workflow: 'Get an iterator from an iterable, consume values one at a time, and stop when iteration is exhausted or the needed work is done.',
    exampleTitle: 'Manual iterator usage',
    exampleCode: `items = [1, 2, 3]
iterator = iter(items)

print(next(iterator))
print(next(iterator))`,
    productionIssues: [
      'Developers accidentally consume an iterator once and then wonder why it is empty later.',
      'Iterator exhaustion causes subtle bugs in multi-step pipelines.',
      'Teams convert everything to lists and lose the memory benefits of lazy iteration.',
    ],
    bestPractices: [
      'Know whether you have an iterable or a one-time iterator.',
      'Convert to a list only when you truly need repeated access.',
      'Use lazy iteration intentionally in large data flows.',
      'Document one-time-consumption behavior in important pipelines.',
    ],
    relatedTopics: ['generators', 'file-handling', 'list-comprehension'],
  },
  {
    group: 'advanced',
    slug: 'generators',
    title: 'Generators',
    description: 'Use generators to produce values lazily and reduce memory pressure in large or streamed workflows.',
    concept: 'Generators are iterator-producing functions that yield one value at a time instead of returning a fully built collection immediately.',
    why: 'They are valuable when processing large datasets, paginated APIs, file streams, or pipelines where materializing every value would waste memory.',
    usage: 'Real projects use generators for large CSV handling, API pagination, data transformation, log processing, and reusable streaming helpers.',
    workflow: 'Write a function with yield, keep one item flowing at a time, and let the caller consume the values in a loop or pipeline.',
    exampleTitle: 'Yield values lazily',
    exampleCode: `def count_up_to(limit):
    for number in range(1, limit + 1):
        yield number

for value in count_up_to(3):
    print(value)`,
    productionIssues: [
      'Teams forget generators are single-pass and try to reuse them after exhaustion.',
      'Debugging feels harder because values are produced lazily, not all at once.',
      'A generator hides slow upstream work and callers do not realize where latency comes from.',
    ],
    bestPractices: [
      'Use generators when lazy evaluation gives a real benefit.',
      'Document one-pass behavior clearly.',
      'Keep yielded values and generator responsibilities focused.',
      'Measure whether the generator actually improves memory or streaming behavior.',
    ],
    relatedTopics: ['iterators', 'yield', 'processing-large-csv-file'],
  },
  {
    group: 'advanced',
    slug: 'decorators',
    title: 'Decorators',
    description: 'Understand decorators as wrappers that add behavior around functions or methods.',
    concept: 'A decorator is a function that takes another function and returns a new function with extra behavior such as logging, timing, validation, caching, or access control.',
    why: 'Decorators appear in Python frameworks, custom reusable utilities, and interview questions because they reveal deeper understanding of functions and closures.',
    usage: 'Real projects use decorators in Flask and FastAPI routes, retries, authentication guards, metrics, caching, and repeated validation logic.',
    workflow: 'Define the wrapper, accept the original function, preserve arguments correctly, add the cross-cutting behavior, and return the wrapped callable.',
    exampleTitle: 'Simple logging decorator',
    exampleCode: `def log_call(func):
    def wrapper(*args, **kwargs):
        print("calling", func.__name__)
        return func(*args, **kwargs)
    return wrapper`,
    productionIssues: [
      'Decorators break function signatures or return values because argument handling was wrong.',
      'Too many invisible wrappers make debugging execution flow harder.',
      'Cross-cutting behavior is hidden in decorators without clear documentation.',
    ],
    bestPractices: [
      'Use decorators for truly reusable cross-cutting behavior.',
      'Handle *args and **kwargs correctly.',
      'Keep decorator behavior explicit and well documented.',
      'Avoid stacking many opaque decorators without operational clarity.',
    ],
    relatedTopics: ['args-and-kwargs', 'scope', 'flask-basics'],
  },
  {
    group: 'advanced',
    slug: 'context-managers',
    title: 'Context Managers',
    description: 'Use context managers to guarantee setup and cleanup around resources.',
    concept: 'Context managers control enter and exit behavior around a block of code, which is why the with statement is central to reliable resource handling.',
    why: 'They protect code from leaks and cleanup mistakes in file work, locks, database sessions, and temporary resources.',
    usage: 'Real projects use context managers for files, connections, transactions, locks, temporary directories, and framework-level resources.',
    workflow: 'Acquire the resource on entry, do the work in the with block, and release the resource automatically on exit even if an error occurs.',
    exampleTitle: 'File context manager',
    exampleCode: `with open("data.txt", "r", encoding="utf-8") as file:
    print(file.readline())`,
    productionIssues: [
      'Resources remain open because manual cleanup was skipped after an exception.',
      'Custom context managers hide too much behavior and confuse ownership.',
      'Database or file work leaks when callers bypass the safe pattern.',
    ],
    bestPractices: [
      'Prefer context managers for resource ownership.',
      'Use with blocks to narrow the lifetime of the resource clearly.',
      'Keep custom context-manager behavior understandable.',
      'Adopt them consistently in code review standards.',
    ],
    relatedTopics: ['file-handling', 'try-except-finally', 'database-connectivity'],
  },
  {
    group: 'advanced',
    slug: 'type-hints',
    title: 'Type Hints',
    description: 'Use type hints to clarify function contracts and reduce confusion in growing Python codebases.',
    concept: 'Type hints describe expected parameter and return types for humans, linters, IDEs, and static analysis tools without changing normal runtime behavior directly.',
    why: 'In larger codebases, type hints reduce ambiguity, improve tooling, and catch mismatched usage earlier.',
    usage: 'Teams use type hints in services, data models, API handlers, libraries, and shared utilities where contracts matter.',
    workflow: 'Annotate the function signature, choose useful types rather than overly broad ones, and treat hints as documentation plus tooling support.',
    exampleTitle: 'Type-annotated function',
    exampleCode: `def add(a: int, b: int) -> int:
    return a + b`,
    productionIssues: [
      'Hints become outdated and give false confidence when they are not maintained.',
      'Teams add Any everywhere and lose most of the benefit.',
      'Developers assume type hints replace runtime validation for external input.',
    ],
    bestPractices: [
      'Use type hints where they improve contracts and tooling.',
      'Keep annotations realistic and maintained.',
      'Combine hints with validation at external boundaries.',
      'Prefer clarity over overly clever generic typing in day-to-day code.',
    ],
    relatedTopics: ['functions', 'dataclasses', 'json-handling'],
  },
  {
    group: 'advanced',
    slug: 'python-memory-management',
    title: 'Python Memory Management',
    description: 'Understand references, garbage collection, and the practical reasons Python processes can use more memory than expected.',
    concept: 'Python memory management is driven by object references, reference counting, and a garbage collector that helps clean up cyclic references.',
    why: 'Developers need memory awareness when scripts grow large, handle many objects, or leak resources in long-running jobs and services.',
    usage: 'This matters in ETL jobs, workers, caches, API services, file processing, and data-heavy automation.',
    workflow: 'Watch object lifetimes, avoid unnecessary copies, release heavy resources promptly, and profile before guessing at the cause of memory growth.',
    exampleTitle: 'Large objects kept alive by references',
    exampleCode: `records = []

for number in range(3):
    records.append({"id": number, "payload": "x" * 1000})

print(len(records))`,
    productionIssues: [
      'Unused references keep large objects alive longer than expected.',
      'Jobs process huge files eagerly and create memory spikes.',
      'Caches or globals grow without eviction or ownership rules.',
    ],
    bestPractices: [
      'Profile memory before optimizing.',
      'Use streaming and generators for large datasets.',
      'Remove unnecessary long-lived references.',
      'Treat cache growth and object retention as design concerns.',
    ],
    relatedTopics: ['shallow-copy-vs-deep-copy', 'generators', 'debugging-memory-issues'],
  },
  {
    group: 'advanced',
    slug: 'shallow-copy-vs-deep-copy',
    title: 'Shallow Copy vs Deep Copy',
    description: 'Know how copying nested Python data really works and why shared references create bugs.',
    concept: 'A shallow copy duplicates only the outer container, while nested mutable values still point to the same underlying objects. A deep copy recursively duplicates nested objects too.',
    why: 'This matters in stateful scripts, request handling, test data setup, and any transformation involving nested lists or dictionaries.',
    usage: 'Real teams hit this in payload manipulation, config merging, template data generation, and object cloning for safe mutation.',
    workflow: 'Inspect whether nested mutable values exist, decide whether independent copies are necessary, and use copy or deepcopy only as much as the design requires.',
    exampleTitle: 'Nested copy behavior',
    exampleCode: `import copy

settings = {"roles": ["admin", "author"]}
clone = copy.copy(settings)
clone["roles"].append("viewer")

print(settings)`,
    productionIssues: [
      'Developers think a shallow copy fully isolated nested state and mutate shared children accidentally.',
      'Deepcopy is used blindly on large structures and hurts performance.',
      'Copying is used to patch design problems instead of clarifying ownership.',
    ],
    bestPractices: [
      'Understand the nested structure before copying.',
      'Use shallow copies when only the outer container needs to change.',
      'Reach for deepcopy only when you truly need independent nested state.',
      'Fix unclear ownership instead of relying on accidental copying.',
    ],
    relatedTopics: ['mutable-vs-immutable-types', 'dictionaries', 'python-memory-management'],
  },
  {
    group: 'advanced',
    slug: 'gil-basics',
    title: 'GIL Basics',
    description: 'Understand the Global Interpreter Lock and why Python threading behavior confuses many interview answers.',
    concept: 'The GIL, or Global Interpreter Lock, allows only one thread at a time to execute Python bytecode within a single interpreter process.',
    why: 'Interviewers ask about the GIL because it affects how developers reason about CPU-bound versus I/O-bound concurrency in Python.',
    usage: 'This matters when designing workers, API clients, data processors, and scripts that need concurrency or parallelism.',
    workflow: 'Decide whether the task is mostly waiting on I/O or using CPU, then choose threads, multiprocessing, async, or external systems based on that behavior.',
    exampleTitle: 'Threading is not always parallel CPU execution',
    exampleCode: `# Threads can help with I/O waits,
# but CPU-bound work may need multiprocessing instead.`,
    productionIssues: [
      'Teams expect threads to speed up CPU-heavy Python code and see little improvement.',
      'Interview answers confuse the GIL with a blanket statement that Python cannot scale.',
      'Concurrency choices are made without measuring whether the bottleneck is I/O or CPU.',
    ],
    bestPractices: [
      'Explain the GIL in terms of Python bytecode execution, not mythology.',
      'Match the concurrency tool to the actual bottleneck.',
      'Measure CPU versus I/O behavior before redesigning.',
      'Avoid oversimplified claims like "threads are useless in Python."',
    ],
    relatedTopics: ['multithreading-vs-multiprocessing', 'python-performance-basics', 'debugging'],
    faqs: [
      {
        question: 'Does the GIL mean Python threads are useless?',
        answer: 'No. Threads can still help significantly for I/O-bound work such as network requests, file waits, and external service calls.',
      },
    ],
  },
  {
    group: 'advanced',
    slug: 'multithreading-vs-multiprocessing',
    title: 'Multithreading vs Multiprocessing',
    description: 'Choose the right concurrency model based on I/O, CPU, isolation, and deployment trade-offs.',
    concept: 'Multithreading shares one process and is often useful for I/O-bound work, while multiprocessing uses separate processes and can help CPU-bound workloads use multiple cores.',
    why: 'The wrong concurrency model can increase complexity without delivering the expected performance gain.',
    usage: 'This matters in worker jobs, scraping, file processing, image work, API batching, and backend support tools.',
    workflow: 'Identify the bottleneck, compare coordination cost versus throughput benefit, then choose threads, processes, or async based on the real workload shape.',
    exampleTitle: 'Conceptual selection rule',
    exampleCode: `# I/O-bound task -> often threads or async
# CPU-bound task -> often multiprocessing`,
    productionIssues: [
      'Threads are chosen for CPU-heavy work and barely improve throughput.',
      'Multiprocessing adds high overhead for tiny tasks and makes deployment harder.',
      'Shared state assumptions break when moving from threads to processes.',
    ],
    bestPractices: [
      'Choose the model based on the workload, not hype.',
      'Measure coordination overhead and startup costs.',
      'Design data exchange intentionally when processes are involved.',
      'Keep concurrency models simple enough for the team to support.',
    ],
    relatedTopics: ['gil-basics', 'python-memory-management', 'python-performance-basics'],
  },
  {
    group: 'apis-backend',
    slug: 'http-basics',
    title: 'HTTP Basics',
    description: 'Understand requests, responses, methods, status codes, and headers before writing Python API integrations.',
    concept: 'HTTP is the protocol behind web APIs, and Python developers need to understand methods, status codes, headers, bodies, and timeouts before calling services safely.',
    why: 'Without HTTP basics, API integrations become trial-and-error debugging instead of intentional engineering.',
    usage: 'This appears in backend services, webhook consumers, automation scripts, auth flows, health checks, and internal integrations.',
    workflow: 'Choose the method, send the request with the right headers and payload, inspect the response code and body, and handle failure or retry behavior intentionally.',
    exampleTitle: 'Basic GET request idea',
    exampleCode: `# GET retrieves data
# POST creates or submits data
# Status codes explain success or failure categories`,
    productionIssues: [
      'Developers treat every non-200 status as the same kind of failure.',
      'Timeouts and retries are forgotten until the integration hangs in production.',
      'Headers like auth, content type, and caching are misunderstood.',
    ],
    bestPractices: [
      'Understand the protocol before the client library.',
      'Handle status codes by category and context.',
      'Set timeouts deliberately.',
      'Log enough request context for troubleshooting safely.',
    ],
    relatedTopics: ['rest-apis-with-python', 'requests-library', 'authentication-basics'],
  },
  {
    group: 'apis-backend',
    slug: 'rest-apis-with-python',
    title: 'REST APIs with Python',
    description: 'Learn how Python services and scripts consume or expose REST-style APIs in practical projects.',
    concept: 'REST-style APIs organize resources and operations around HTTP concepts like routes, methods, status codes, and JSON payloads.',
    why: 'Backend and integration work often depends on understanding how APIs are designed, consumed, and supported after release.',
    usage: 'Teams use REST APIs for user services, dashboards, internal tools, SaaS integrations, mobile backends, and automation platforms.',
    workflow: 'Define the resource and operation clearly, validate input, return the correct status and payload, and think about errors, auth, and observability from the beginning.',
    exampleTitle: 'Simple Flask route',
    exampleCode: `from flask import Flask, jsonify

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify({"status": "ok"})`,
    productionIssues: [
      'APIs return inconsistent status codes and make client debugging harder.',
      'Validation is weak and bad requests fail deep in business logic.',
      'Error responses are too vague for clients or too noisy for security.',
    ],
    bestPractices: [
      'Use consistent route and response patterns.',
      'Validate inputs near the boundary.',
      'Design clear error contracts.',
      'Treat logging, auth, and timeout behavior as part of the API design.',
    ],
    relatedTopics: ['http-basics', 'flask-basics', 'fastapi-basics'],
  },
  {
    group: 'apis-backend',
    slug: 'requests-library',
    title: 'Requests Library',
    description: 'Use the requests library to call HTTP APIs safely with timeouts, headers, and response handling.',
    concept: 'The requests library is a popular Python HTTP client used for calling external APIs, sending payloads, and reading responses in a cleaner way than raw sockets or low-level modules.',
    why: 'Many integrations and automation jobs rely on requests, and mistakes around timeouts, retries, and response parsing are common support issues.',
    usage: 'Requests is used in SaaS integrations, data pulls, internal service calls, webhook testing, scheduled sync jobs, and automation scripts.',
    workflow: 'Build the request, pass headers and timeout explicitly, call the endpoint, inspect the status, parse the body, and handle failure without assuming success.',
    exampleTitle: 'Safe GET with timeout',
    exampleCode: `import requests

response = requests.get("https://api.example.com/users", timeout=10)
print(response.status_code)`,
    productionIssues: [
      'No timeout is set, so the script hangs on network problems.',
      'Code assumes JSON success responses and crashes on HTML or error payloads.',
      'Retry logic is copied inconsistently across scripts.',
    ],
    bestPractices: [
      'Always set timeouts.',
      'Check response status before trusting the body.',
      'Wrap repeated request logic in reusable helpers.',
      'Avoid hardcoding secrets or base URLs inside the call site.',
    ],
    relatedTopics: ['http-basics', 'working-with-apis', 'api-error-handling'],
  },
  {
    group: 'apis-backend',
    slug: 'flask-basics',
    title: 'Flask Basics',
    description: 'Understand Flask as a lightweight Python web framework for simple APIs and web services.',
    concept: 'Flask is a minimal web framework that gives developers explicit control over routes, request handling, and extension choices without imposing heavy structure.',
    why: 'Flask is common in Python interviews and real projects that need a straightforward service or internal tool quickly.',
    usage: 'Teams use Flask for internal dashboards, lightweight APIs, proof-of-concept services, webhook handlers, and admin tools.',
    workflow: 'Create the app, define routes, return responses, validate input, and add structured configuration, logging, and testing as the service grows.',
    exampleTitle: 'Minimal Flask app',
    exampleCode: `from flask import Flask

app = Flask(__name__)

@app.get("/")
def index():
    return "Hello from Flask"`,
    productionIssues: [
      'A small Flask app grows into production without clear structure for config, logging, or testing.',
      'Global mutable state is used in ways that break under concurrent requests.',
      'Teams assume lightweight means production-safe without adding operational discipline.',
    ],
    bestPractices: [
      'Start simple but add structure before the app grows too large.',
      'Keep route handlers thin and move logic into services.',
      'Configure logging and environment handling early.',
      'Test the HTTP behavior, not only the helper functions.',
    ],
    relatedTopics: ['rest-apis-with-python', 'environment-variables', 'unit-testing'],
  },
  {
    group: 'apis-backend',
    slug: 'fastapi-basics',
    title: 'FastAPI Basics',
    description: 'Learn FastAPI for typed Python APIs with validation and automatic docs support.',
    concept: 'FastAPI is a modern Python web framework that uses type hints to support validation, serialization, async handlers, and interactive API documentation.',
    why: 'It is increasingly common in backend and platform work because it speeds up API development while keeping contracts clearer.',
    usage: 'Teams use FastAPI for internal APIs, async services, ML or automation backends, and modern Python microservices.',
    workflow: 'Define the app, declare request and response models, implement route handlers, and use validation plus docs generation as part of the development flow.',
    exampleTitle: 'Minimal FastAPI route',
    exampleCode: `from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}`,
    productionIssues: [
      'Teams use type hints but skip deeper validation or database error handling.',
      'Async support is misunderstood and blocking work still runs inside handlers.',
      'Generated docs create confidence, but runtime observability and deployment discipline are still missing.',
    ],
    bestPractices: [
      'Use request and response models intentionally.',
      'Keep blocking operations out of async paths unless handled deliberately.',
      'Pair framework speed with real testing and logging.',
      'Treat auto-generated docs as helpful, not sufficient.',
    ],
    relatedTopics: ['rest-apis-with-python', 'type-hints', 'authentication-basics'],
  },
  {
    group: 'apis-backend',
    slug: 'database-connectivity',
    title: 'Database Connectivity',
    description: 'Understand how Python code connects to databases and why connection handling must be safe and predictable.',
    concept: 'Database connectivity covers drivers, connection creation, queries, transactions, parameter binding, and cleanup of database resources.',
    why: 'Database issues become production incidents quickly when connections leak, queries are unsafe, or transactions are not managed carefully.',
    usage: 'This appears in backend APIs, ETL jobs, admin scripts, reporting systems, and background workers.',
    workflow: 'Open the connection through the right driver or abstraction, execute parameterized queries, manage transactions, handle errors, and close resources cleanly.',
    exampleTitle: 'Conceptual database query flow',
    exampleCode: `# connect -> query -> commit/rollback -> close`,
    productionIssues: [
      'Connections are leaked and pool limits are exhausted.',
      'Queries are built unsafely through string concatenation.',
      'Large result sets are loaded eagerly and hurt memory or latency.',
    ],
    bestPractices: [
      'Use parameterized queries.',
      'Close connections or sessions predictably.',
      'Understand transaction boundaries.',
      'Stream or paginate large results when practical.',
    ],
    relatedTopics: ['context-managers', 'environment-variables', 'production-best-practices'],
  },
  {
    group: 'apis-backend',
    slug: 'environment-variables',
    title: 'Environment Variables',
    description: 'Use environment variables for configuration instead of hardcoding secrets and environment-specific values.',
    concept: 'Environment variables let code receive configuration from the runtime environment rather than embedding secrets or environment-specific behavior directly in the source code.',
    why: 'Configuration mistakes are a major production issue, especially when the same code runs across local, test, and production environments.',
    usage: 'Teams use environment variables for API keys, database URLs, debug flags, service endpoints, and feature configuration.',
    workflow: 'Read config from the environment at startup, validate what is required, provide safe defaults only where appropriate, and fail clearly when critical config is missing.',
    exampleTitle: 'Read an environment variable',
    exampleCode: `import os

api_key = os.getenv("API_KEY")
print(api_key)`,
    productionIssues: [
      'Secrets are hardcoded and later leak through repos or logs.',
      'Missing environment values cause runtime failures only after deployment.',
      'Different machines use different config names and the service becomes hard to reproduce.',
    ],
    bestPractices: [
      'Never hardcode secrets.',
      'Validate required environment variables early.',
      'Document the config contract clearly.',
      'Separate runtime configuration from business logic.',
    ],
    relatedTopics: ['authentication-basics', 'dependency-management', 'production-best-practices'],
  },
  {
    group: 'apis-backend',
    slug: 'authentication-basics',
    title: 'Authentication Basics',
    description: 'Understand the basic patterns Python services and scripts use to authenticate users and system-to-system calls.',
    concept: 'Authentication basics cover verifying identity through tokens, sessions, API keys, OAuth flows, or service credentials before granting access.',
    why: 'Backend and automation code often fail in production not because the feature is wrong, but because auth handling, secret storage, or token refresh logic is weak.',
    usage: 'This matters in REST APIs, SaaS integrations, webhook validation, admin tools, and internal service communication.',
    workflow: 'Choose the auth method, read credentials safely, validate identity or permissions, handle failure paths clearly, and avoid exposing sensitive data in logs or responses.',
    exampleTitle: 'Read token from headers conceptually',
    exampleCode: `# Authorization: Bearer <token>
# validate token -> authorize action`,
    productionIssues: [
      'API keys or tokens are hardcoded into the source or logs.',
      'Expired tokens or permission mismatches are handled poorly and confuse clients.',
      'Auth checks are inconsistent across routes or jobs.',
    ],
    bestPractices: [
      'Store credentials securely and outside the codebase.',
      'Separate authentication from authorization clearly.',
      'Return safe failure messages without leaking sensitive detail.',
      'Review token expiry and refresh behavior as part of production readiness.',
    ],
    relatedTopics: ['environment-variables', 'rest-apis-with-python', 'logging'],
  },
  {
    group: 'testing-production',
    slug: 'unit-testing',
    title: 'Unit Testing',
    description: 'Write focused tests for individual Python functions and classes so bugs are caught earlier.',
    concept: 'Unit testing checks small isolated pieces of code to confirm expected behavior under normal and edge-case conditions.',
    why: 'Tests reduce regression risk and help teams refactor or debug with more confidence.',
    usage: 'Teams unit test utility functions, business rules, parsers, validators, service helpers, and data transformations.',
    workflow: 'Choose a narrow behavior, prepare known input, assert the expected output, and keep the test isolated from external systems whenever possible.',
    exampleTitle: 'Simple assertion',
    exampleCode: `def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5`,
    productionIssues: [
      'Critical logic has no tests and regressions are discovered only after release.',
      'Tests are tightly coupled to implementation details and become brittle.',
      'External dependencies make unit tests slow or flaky.',
    ],
    bestPractices: [
      'Test behavior, not incidental implementation details.',
      'Keep unit tests fast and isolated.',
      'Add edge cases where the logic is likely to fail.',
      'Use tests to protect refactors, not only to satisfy coverage numbers.',
    ],
    relatedTopics: ['pytest-basics', 'mocking', 'debugging'],
  },
  {
    group: 'testing-production',
    slug: 'pytest-basics',
    title: 'pytest Basics',
    description: 'Use pytest for readable Python tests, fixtures, and common testing workflows.',
    concept: 'pytest is a popular Python testing framework that favors simple assertions, fixtures, and flexible test organization.',
    why: 'It is widely used in real projects and interviews because it makes testing workflows simpler than raw unittest in many teams.',
    usage: 'Teams use pytest for unit tests, integration tests, API tests, fixture-driven setups, and CI test runs.',
    workflow: 'Install pytest, write test functions with assert, use fixtures for setup reuse, and keep test organization aligned with the codebase.',
    exampleTitle: 'Basic pytest test',
    exampleCode: `def multiply(a, b):
    return a * b

def test_multiply():
    assert multiply(2, 4) == 8`,
    productionIssues: [
      'Fixture sprawl makes tests hard to understand.',
      'Tests pass locally but differ in CI because setup assumptions are hidden.',
      'Overly clever pytest features are used where simple tests would have been clearer.',
    ],
    bestPractices: [
      'Start with plain tests before adding complex fixtures.',
      'Keep fixture scope intentional.',
      'Use descriptive test names.',
      'Make CI and local test behavior as close as possible.',
    ],
    relatedTopics: ['unit-testing', 'mocking', 'dependency-management'],
  },
  {
    group: 'testing-production',
    slug: 'mocking',
    title: 'Mocking',
    description: 'Mock external dependencies in tests when isolation is needed, but avoid mocking everything blindly.',
    concept: 'Mocking replaces external dependencies like API calls, file systems, or services so tests can focus on one unit of behavior.',
    why: 'Without mocking, many tests become slow, flaky, or dependent on systems outside the unit being tested.',
    usage: 'Real projects mock HTTP clients, database calls, email senders, cloud SDKs, time-based behavior, and environment dependencies.',
    workflow: 'Patch the right boundary, control the return value or behavior, assert the important outcome, and avoid coupling the test too tightly to internal implementation.',
    exampleTitle: 'Mock a dependency conceptually',
    exampleCode: `# patch external client -> return fake response -> assert business logic`,
    productionIssues: [
      'Tests mock too deeply and stop protecting meaningful behavior.',
      'Wrong patch targets make tests pass while the real code path was never exercised.',
      'Heavy mocking hides integration risks until production.',
    ],
    bestPractices: [
      'Mock external boundaries, not every internal function.',
      'Patch where the dependency is used.',
      'Keep some integration coverage for critical flows.',
      'Use mocks to improve isolation, not to avoid thinking about the contract.',
    ],
    relatedTopics: ['unit-testing', 'pytest-basics', 'working-with-apis'],
  },
  {
    group: 'testing-production',
    slug: 'debugging',
    title: 'Debugging',
    description: 'Develop a practical debugging process for Python logic, data-shape issues, and production behavior.',
    concept: 'Debugging is the disciplined process of reproducing a problem, narrowing the failing condition, inspecting runtime state, and proving the root cause before changing code.',
    why: 'Python feels easy until a real production issue involves wrong data shape, hidden state, environment drift, or external-system failure.',
    usage: 'Debugging matters in scripts, APIs, batch jobs, test failures, file-processing jobs, and support incidents.',
    workflow: 'Reproduce the issue, inspect the actual values and environment, isolate the smallest failing path, fix the root cause, and retest the scenario.',
    exampleTitle: 'Debugging idea',
    exampleCode: `# reproduce -> inspect values -> isolate failing branch -> fix -> retest`,
    productionIssues: [
      'Developers patch symptoms before understanding the real failing condition.',
      'Logs and runtime context are too weak to explain background job failures.',
      'Environment differences make the bug appear only in one stage or scheduler.',
    ],
    bestPractices: [
      'Reproduce before rewriting.',
      'Inspect real runtime data, not assumptions.',
      'Use logs, tests, and smaller repro cases together.',
      'Fix the cause, not only the visible error.',
    ],
    relatedTopics: ['logging', 'common-runtime-errors', 'python-memory-management'],
  },
  {
    group: 'testing-production',
    slug: 'python-performance-basics',
    title: 'Performance Basics',
    description: 'Understand the common Python performance traps and where optimization effort usually matters first.',
    concept: 'Python performance basics involve algorithm choice, I/O behavior, unnecessary copying, database and network efficiency, and avoiding repeated expensive work.',
    why: 'Developers often blame Python itself before checking whether the real problem is data volume, query behavior, loops, or architecture.',
    usage: 'This matters in ETL jobs, API handlers, scheduled scripts, report generation, and worker processes.',
    workflow: 'Measure first, identify the slow path, decide whether the issue is CPU, I/O, memory, or repeated work, and then optimize the highest-impact part.',
    exampleTitle: 'Measure before optimize',
    exampleCode: `# profile -> find bottleneck -> optimize the hot path`,
    productionIssues: [
      'Large nested loops do repeated work that could be indexed or cached.',
      'Database or API calls inside loops dominate runtime more than Python syntax does.',
      'Teams optimize small code fragments while the real bottleneck is I/O or architecture.',
    ],
    bestPractices: [
      'Profile before guessing.',
      'Fix big architectural costs before micro-optimizing syntax.',
      'Avoid repeated external calls inside loops when batching is possible.',
      'Use the right data structure for lookup-heavy work.',
    ],
    relatedTopics: ['python-memory-management', 'multithreading-vs-multiprocessing', 'data-processing-scripts'],
  },
  {
    group: 'testing-production',
    slug: 'common-runtime-errors',
    title: 'Common Runtime Errors',
    description: 'Recognize the Python runtime errors that appear repeatedly in interviews and production support.',
    concept: 'Common runtime errors include TypeError, ValueError, KeyError, IndexError, AttributeError, and import or environment problems caused by bad assumptions.',
    why: 'Developers need to explain not only what these errors mean, but also what kinds of coding or data assumptions usually caused them.',
    usage: 'These errors show up in input parsing, JSON handling, imports, database access, file processing, and integration code.',
    workflow: 'Read the traceback carefully, inspect the failing value or path, identify the broken assumption, and fix the source rather than masking the symptom.',
    exampleTitle: 'Common error categories',
    exampleCode: `# TypeError -> wrong type
# KeyError -> missing dictionary key
# ValueError -> invalid value for expected conversion`,
    productionIssues: [
      'Teams add broad guards everywhere instead of fixing the bad data or design assumption.',
      'Tracebacks are ignored and debugging starts from guesswork.',
      'The same error repeats because boundary validation never improved.',
    ],
    bestPractices: [
      'Use the traceback to find the real failing assumption.',
      'Validate external input earlier.',
      'Distinguish symptom handling from root-cause fixes.',
      'Teach common runtime errors through real scenarios, not only definitions.',
    ],
    relatedTopics: ['exceptions', 'debugging', 'json-handling'],
  },
  {
    group: 'testing-production',
    slug: 'dependency-management',
    title: 'Dependency Management',
    description: 'Manage package versions and updates so Python environments stay reproducible across local, CI, and production.',
    concept: 'Dependency management means choosing libraries carefully, pinning versions, reviewing upgrades, and keeping installation behavior reproducible.',
    why: 'A Python app can break even if the application code did not change, simply because a dependency changed underneath it.',
    usage: 'This matters in backend services, scripts, CLIs, scheduled jobs, containers, and any project shared across multiple developers or environments.',
    workflow: 'Install dependencies inside a virtual environment, record versions, review updates deliberately, and verify that CI and deployment use the same dependency contract.',
    exampleTitle: 'Requirements file idea',
    exampleCode: `requests==2.32.3
fastapi==0.115.0
pytest==8.3.2`,
    productionIssues: [
      'Unpinned dependencies create environment drift.',
      'A package upgrade changes behavior and breaks production unexpectedly.',
      'Developers cannot reproduce the deployed environment locally.',
    ],
    bestPractices: [
      'Pin versions intentionally.',
      'Review upgrades instead of drifting accidentally.',
      'Align local, CI, and production install steps.',
      'Remove unused dependencies to reduce risk and attack surface.',
    ],
    relatedTopics: ['pip-and-virtual-environments', 'production-best-practices', 'python-installation-and-setup'],
  },
  {
    group: 'testing-production',
    slug: 'production-best-practices',
    title: 'Production Best Practices',
    description: 'Pull together the habits that make Python services and scripts safer to deploy and support.',
    concept: 'Production best practices in Python combine configuration discipline, logging, testing, validation, dependency control, performance awareness, and clear operational behavior.',
    why: 'Most Python code starts small, but production reliability depends on treating operations and support needs as part of engineering from the beginning.',
    usage: 'This applies to APIs, workers, ETL jobs, cron scripts, CLI tools, and internal platforms.',
    workflow: 'Validate inputs early, configure via environment, log clearly, test critical paths, handle failure modes intentionally, and document the operational contract.',
    exampleTitle: 'Production readiness checklist idea',
    exampleCode: `# config validated
# logs present
# tests passing
# dependencies pinned
# failure paths understood`,
    productionIssues: [
      'The script works locally but has no production-grade logging, retries, or config handling.',
      'Operational behavior is undocumented, so support teams do not know what "healthy" looks like.',
      'Fast delivery creates a hidden service that nobody treats like a real production dependency.',
    ],
    bestPractices: [
      'Treat production behavior as part of feature completion.',
      'Make failure modes visible and supportable.',
      'Keep configuration and secrets externalized.',
      'Revisit small scripts once they become business-critical.',
    ],
    relatedTopics: ['logging', 'dependency-management', 'environment-variables'],
  },
  {
    group: 'automation-projects',
    slug: 'python-automation',
    title: 'Python Automation',
    description: 'Use Python to automate repetitive work in file systems, APIs, data processing, and operations tasks.',
    concept: 'Python automation means replacing repeated manual actions with reliable scripts that read inputs, apply logic, and produce predictable outputs.',
    why: 'Automation is one of Python’s biggest practical strengths and often the first way teams save time or reduce errors.',
    usage: 'Real automation tasks include file cleanup, report generation, API sync jobs, notifications, backups, and scheduled data workflows.',
    workflow: 'Define the manual process clearly, identify the inputs and outputs, add validation and logging, and make the script safe enough to run repeatedly.',
    exampleTitle: 'Simple automation idea',
    exampleCode: `for filename in ["a.txt", "b.txt"]:
    print(f"Processing {filename}")`,
    productionIssues: [
      'Automation scripts are written quickly without idempotency or error handling and become risky to rerun.',
      'File paths, credentials, or assumptions are hardcoded and fail in other environments.',
      'A script becomes business-critical but still has no tests or logging.',
    ],
    bestPractices: [
      'Automate only after understanding the manual workflow fully.',
      'Add logging, validation, and safe rerun behavior.',
      'Keep credentials and environment-specific paths externalized.',
      'Promote critical automation scripts to production-quality standards.',
    ],
    relatedTopics: ['cli-scripts', 'scheduling-jobs', 'production-best-practices'],
  },
  {
    group: 'automation-projects',
    slug: 'web-scraping-basics',
    title: 'Web Scraping Basics',
    description: 'Understand the practical and ethical basics of extracting publicly available web data with Python.',
    concept: 'Web scraping means requesting web pages, parsing HTML, extracting relevant fields, and handling pagination or changing page structure carefully.',
    why: 'Scraping is common in automation work, but weak design causes brittle jobs, legal risk, or noisy load on target systems.',
    usage: 'Teams scrape public listings, documentation metadata, competitor references, or internal status pages where APIs do not exist.',
    workflow: 'Check whether scraping is appropriate, fetch the page responsibly, parse stable selectors, handle missing fields, and store results with enough validation.',
    exampleTitle: 'Basic scraping flow idea',
    exampleCode: `# request page -> parse HTML -> extract fields -> save results`,
    productionIssues: [
      'A small HTML change breaks the scraper silently.',
      'Rate limits or target-site protections are ignored and the script becomes unreliable.',
      'Parsing logic assumes every element exists and crashes on partial content.',
    ],
    bestPractices: [
      'Use stable selectors and handle missing elements.',
      'Respect robots, rate limits, and legal boundaries.',
      'Log extraction failures clearly.',
      'Prefer official APIs when they exist.',
    ],
    relatedTopics: ['requests-library', 'scheduling-jobs', 'data-processing-scripts'],
  },
  {
    group: 'automation-projects',
    slug: 'working-with-apis',
    title: 'Working with APIs',
    description: 'Build practical Python scripts that call external APIs, handle failures, and transform responses into useful outputs.',
    concept: 'Working with APIs means authenticating, sending requests, parsing responses, handling rate limits or retries, and converting remote data into local business value.',
    why: 'Many Python jobs exist mainly to glue one system to another through APIs, so support quality depends on disciplined integration habits.',
    usage: 'Real projects fetch CRM data, post notifications, sync inventory, enrich records, trigger workflows, and gather analytics through APIs.',
    workflow: 'Read the API contract, authenticate safely, send requests with timeouts, validate responses, retry where appropriate, and log outcomes for support.',
    exampleTitle: 'API integration shape',
    exampleCode: `import requests

response = requests.get("https://api.example.com/data", timeout=10)
data = response.json()`,
    productionIssues: [
      'APIs fail intermittently and the script has no retry or fallback strategy.',
      'Rate limits are hit because batching or throttling was not planned.',
      'Response contracts drift and parsing logic breaks unexpectedly.',
    ],
    bestPractices: [
      'Treat API contracts as changeable and validate responses defensively.',
      'Use timeouts, retries, and logging intentionally.',
      'Separate transport logic from business transformation logic.',
      'Plan for auth expiry, rate limits, and observability.',
    ],
    relatedTopics: ['requests-library', 'http-basics', 'authentication-basics'],
  },
  {
    group: 'automation-projects',
    slug: 'cli-scripts',
    title: 'CLI Scripts',
    description: 'Create Python command-line tools that are usable, scriptable, and easier to rerun safely.',
    concept: 'CLI scripts are Python programs that accept arguments or flags, perform a task, and return output or exit codes suitable for human or automated use.',
    why: 'Good CLI design turns ad hoc scripts into reusable tools that fit developer workflows and automation pipelines.',
    usage: 'Teams use CLI scripts for maintenance tasks, migrations, report generation, data cleanup, deployment support, and internal tooling.',
    workflow: 'Define the command inputs, parse arguments cleanly, validate them, perform the task, and return clear output and exit behavior.',
    exampleTitle: 'Read command-line arguments',
    exampleCode: `import sys

print(sys.argv)`,
    productionIssues: [
      'Scripts depend on manual edits to source files instead of real arguments.',
      'Exit behavior is inconsistent, making automation harder.',
      'CLI tools become unsafe because destructive actions lack validation or preview modes.',
    ],
    bestPractices: [
      'Use clear arguments instead of source edits.',
      'Return useful errors and exit codes.',
      'Add dry-run or preview support for risky actions.',
      'Keep the tool scriptable and repeatable.',
    ],
    relatedTopics: ['input-and-output', 'python-automation', 'scheduling-jobs'],
  },
  {
    group: 'automation-projects',
    slug: 'data-processing-scripts',
    title: 'Data Processing Scripts',
    description: 'Process CSV, JSON, text, or API data safely and efficiently in practical Python workflows.',
    concept: 'Data processing scripts read structured input, transform or validate it, and write a clean result for the next system or team.',
    why: 'A large share of Python work is really data movement and cleanup, so reliability depends on handling shape, volume, and failure paths well.',
    usage: 'Teams process exports, imports, logs, product feeds, user records, analytics snapshots, and scheduled sync data.',
    workflow: 'Read the input format, validate required fields, process the data in focused steps, stream large datasets when needed, and write clear outputs plus logs.',
    exampleTitle: 'Row processing idea',
    exampleCode: `for row in rows:
    cleaned = row["email"].strip().lower()
    print(cleaned)`,
    productionIssues: [
      'A script assumes perfect input and crashes halfway through a batch.',
      'Large files are processed eagerly and create memory spikes.',
      'Partial failures are hard to recover because row-level errors were never logged clearly.',
    ],
    bestPractices: [
      'Validate the data shape early.',
      'Stream large datasets where possible.',
      'Separate parsing, transformation, and output steps.',
      'Log enough context to resume or repair failed rows.',
    ],
    relatedTopics: ['csv-handling', 'json-handling', 'generators'],
  },
  {
    group: 'automation-projects',
    slug: 'email-file-automation',
    title: 'Email/File Automation',
    description: 'Automate recurring email and file workflows carefully so the script is reliable and safe to rerun.',
    concept: 'Email and file automation usually combine reading files, transforming data, generating attachments or messages, and then delivering the result through a defined workflow.',
    why: 'These scripts often become business-critical quickly because they replace daily manual work.',
    usage: 'Real teams automate invoice exports, report emails, attachment generation, file routing, and internal notifications.',
    workflow: 'Define the trigger, prepare the file or email content, validate recipients and paths, send or move the artifact, and log enough context for support.',
    exampleTitle: 'Automation flow idea',
    exampleCode: `# read file -> create message -> send email -> archive output`,
    productionIssues: [
      'A script sends duplicate emails because rerun behavior was never designed.',
      'Attachments or file paths are wrong in one environment and there is no validation step.',
      'Sensitive data leaks because recipients or output folders are not controlled carefully.',
    ],
    bestPractices: [
      'Design idempotency or rerun safety up front.',
      'Validate recipients, file paths, and generated content.',
      'Log delivery outcomes clearly.',
      'Protect sensitive data throughout the workflow.',
    ],
    relatedTopics: ['python-automation', 'logging', 'environment-variables'],
  },
  {
    group: 'automation-projects',
    slug: 'scheduling-jobs',
    title: 'Scheduling Jobs',
    description: 'Run Python tasks on a schedule while handling retries, idempotency, and operational visibility.',
    concept: 'Scheduled jobs are Python scripts or services triggered at fixed times or intervals through cron, task schedulers, or platform job systems.',
    why: 'A script that works manually often fails in scheduled environments because input, paths, timing, or retries were never designed properly.',
    usage: 'Teams schedule daily reports, data syncs, cleanup jobs, notifications, billing tasks, backups, and monitoring checks.',
    workflow: 'Make the job non-interactive, externalize configuration, add logging and retry behavior, and ensure reruns do not create duplicate or corrupted work.',
    exampleTitle: 'Scheduled job mindset',
    exampleCode: `# scheduler triggers script -> script validates config -> runs job -> logs outcome`,
    productionIssues: [
      'Scheduled jobs fail silently because output is not captured centrally.',
      'Jobs are not idempotent and reruns create duplicate updates or emails.',
      'Environment assumptions differ between manual and scheduled execution.',
    ],
    bestPractices: [
      'Treat schedulers as production environments, not as local script runners.',
      'Make jobs idempotent where possible.',
      'Capture logs and alerting for failure visibility.',
      'Test jobs in non-interactive conditions.',
    ],
    relatedTopics: ['python-automation', 'logging', 'production-best-practices'],
  },
  {
    group: 'automation-projects',
    slug: 'practical-python-projects',
    title: 'Practical Python Projects',
    description: 'Use project ideas to combine fundamentals, APIs, automation, testing, and production habits into real learning outcomes.',
    concept: 'Practical Python projects turn isolated syntax knowledge into complete workflows with input handling, logic, output, debugging, and deployment-style thinking.',
    why: 'Projects reveal whether a developer can connect concepts like files, APIs, classes, exceptions, and testing in one coherent solution.',
    usage: 'Useful beginner-to-intermediate projects include CLI calculators, file organizers, CSV processors, REST APIs, auth demos, API dashboards, and automation tools.',
    workflow: 'Choose a practical use case, define the requirements, split the work into modules, test the important behavior, and add logging plus config handling before calling the project complete.',
    exampleTitle: 'Project directions',
    exampleCode: `# CLI calculator
# CSV data processor
# Flask/FastAPI API
# file organizer automation`,
    productionIssues: [
      'Projects stop at the happy path and never include validation, logging, or test coverage.',
      'Everything lives in one file and the project is hard to explain in interviews.',
      'The app works locally but configuration and dependency setup are not reproducible.',
    ],
    bestPractices: [
      'Choose projects that combine multiple practical skills.',
      'Add tests, logging, and config handling even in learning projects.',
      'Keep the code modular enough to explain in interviews.',
      'Use projects to practice production thinking, not only syntax.',
    ],
    relatedTopics: ['python-automation', 'rest-apis-with-python', 'unit-testing'],
  },
];

function topic(spec: PythonTopicSpec): TopicContent {
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
- They want to know whether you can connect Python syntax to real scripts, backend work, or production behavior
- Strong answers explain what the concept does, where it appears, and what commonly breaks
- Better candidates mention debugging, maintainability, or operational trade-offs instead of giving only a definition`,
    realWorldUsage: spec.usage,
    howItWorks: spec.workflow,
    example: {
      title: spec.exampleTitle,
      description: `A practical Python example showing how ${spec.title.toLowerCase()} appears in real code.`,
      code: [
        {
          label: spec.exampleTitle,
          language: 'python',
          code: spec.exampleCode,
        },
      ],
    },
    commonConfusions: [
      {
        question: `Is ${spec.title} only a beginner topic?`,
        answer: `No. ${spec.title} still matters later because Python production issues usually come from weak fundamentals, unclear contracts, or runtime behavior that teams stopped thinking about.`,
      },
      {
        question: `How should I explain ${spec.title} in interviews?`,
        answer: `Start with what ${spec.title.toLowerCase()} does, then connect it to one practical Python use case and one production or debugging concern. That shows stronger understanding than a textbook answer alone.`,
      },
      {
        question: `What makes ${spec.title} tricky in real projects?`,
        answer: `The tricky part is rarely syntax alone. Problems usually appear when data shape, scale, ownership, environment setup, or failure handling makes the concept behave differently than a small tutorial example.`,
      },
    ],
    productionIssues: spec.productionIssues,
    bestPractices: spec.bestPractices,
    architectNote: `${spec.title} should be understood as part of a larger Python delivery system. Good engineers explain not only the syntax, but also how the concept affects reliability, readability, and supportability once the script or service grows.`,
    faqs: [
      {
        question: `Interview: why does ${spec.title} matter in production Python code?`,
        answer: `${spec.title} matters because Python problems usually come from runtime assumptions, data handling, side effects, or environment issues that look small in examples but become serious in real services and automation jobs.`,
      },
      {
        question: `Interview: what weak answer should I avoid for ${spec.title}?`,
        answer: `Avoid giving only a one-line definition. Better answers show where ${spec.title.toLowerCase()} appears in real projects, what usually breaks, and how a developer would design or debug it responsibly.`,
      },
      ...(spec.faqs ?? []),
    ],
    keyTakeaways: [
      `${spec.title} becomes easier when you connect it to real Python workflows instead of memorizing isolated syntax.`,
      'Python answers are stronger when they mention data flow, debugging, and maintainability together.',
      'Most production issues come from assumptions around input, state, dependencies, or runtime behavior.',
      'A practical interview answer should connect the concept to one real use case and one operational concern.',
    ],
    relatedTopics: spec.relatedTopics,
  };
}

export const pythonTopics: TopicContent[] = pythonTopicSpecs.map(topic);
