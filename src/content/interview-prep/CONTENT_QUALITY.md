# Interview Prep Content Quality

Quality is more important than question count. One hundred questions that teach practical interview reasoning are more valuable than five hundred definition prompts.

## Scale And Coverage

Do not cap every topic at the same round number. Topic depth should reflect the realistic interview surface:

- Broad architecture, Cloud Service, Dispatcher, OSGi, security, performance, and production-support topics should contain deeper banks.
- Narrow topics should stop when additional questions would become duplicates or superficial rewordings.
- Every supported topic must include Beginner, Mid-Level, Senior, and Architect coverage.
- Order exported content from foundational reasoning to advanced and architect-level decisions.

Question data must remain suitable for ten-question pagination, but pagination must never drive artificial question generation.

When expanding a topic, preserve every existing question and add only questions that close a named coverage gap. Do not add paired design/incident prompts about the same concern, superficial rewordings, or questions whose only purpose is reaching a target count.

## Question Standard

Every question must satisfy at least one of these criteria:

- Frequently asked in real technical interviews
- Based on a credible production incident
- Tests implementation or troubleshooting ability
- Tests an architecture, security, performance, or migration decision
- Evaluates senior or architect-level trade-off reasoning

Avoid generic prompts such as "What is X?" unless the question is necessary for beginners and also asks about practical use, failure modes, or enterprise risk.

Prefer questions grounded in:

- Enterprise projects and client implementations
- Production support and incident diagnosis
- AEM as a Cloud Service and Cloud Manager
- Dispatcher, Sling Model, replication, and Author/Publish debugging
- Performance, security, multi-site, migration, and content architecture decisions

## Answer Standard

Every answer must directly answer the question before adding context. It should explain:

1. What the concept or decision is
2. Why and when it matters
3. How it is implemented or diagnosed
4. A realistic enterprise example
5. A likely production failure and evidence to inspect
6. Trade-offs, Cloud Service implications, and operational ownership

Do not use repeated filler that could apply unchanged to unrelated questions.

Every exported question must also include:

- A realistic interview frequency score
- The interviewer's expectation
- A common wrong answer that explains why the answer fails
- An architect perspective covering enterprise trade-offs
- A memorable key takeaway

## Topic Preparation Sets

Every topic must expose a coherent preparation path derived from the same ranked question bank:

- Top 10 Most Asked Questions, ordered first in the topic
- Top 5 and Top 10 revision sets
- A focused 30-minute revision set
- A deeper 1-hour revision set
- A last-minute revision set

Most Asked rankings must be topic-local, unique, and based on practical interview signal. Production incidents, troubleshooting, architecture decisions, security, performance, migration, and Cloud Service judgment should rank ahead of low-signal definition prompts.

## Experience-Level Standard

- **Junior:** Explain the purpose and supported implementation pattern.
- **Mid-level:** Explain implementation details and validation across Author and Publish.
- **Senior:** Start from evidence, isolate the failure or risk, and propose a durable production-safe solution.
- **Architect:** Evaluate scalability, security, performance, governance, cost, Cloud Service readiness, and blast radius.

## Review Gate

Reject or rewrite content when:

- The question is only a definition with no practical decision.
- The answer does not directly address the specific question.
- The production scenario is generic or unrelated to the topic.
- The answer recommends broad restarts, cache clears, admin sessions, or manual production edits before diagnosis.
- Cloud Service constraints, evidence, trade-offs, and ownership are missing where relevant.
- A topic lacks a distinct Top 10 Most Asked set or any required rapid-revision set.
- Frequency score, common wrong answer, architect perspective, or key takeaway is missing.
