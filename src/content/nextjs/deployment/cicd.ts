import type { TopicContent } from '../../types';

export const nextjsCICD: TopicContent = {
  slug: 'nextjs-cicd',
  title: 'CI/CD Pipelines',
  description: 'Set up production-grade CI/CD for Next.js — GitHub Actions, automated testing, type checking, preview deployments, and zero-downtime production releases.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A Next.js CI/CD pipeline runs on every PR: type check, lint, test, build. If all pass, Vercel auto-deploys a preview. On merge to main, Vercel deploys to production. The goal: every commit is deployable, every deployment is verified.',
  whatIsIt: `CI/CD (Continuous Integration / Continuous Deployment) for Next.js means:

**CI (on every PR):**
- TypeScript type checking (\`tsc --noEmit\`)
- ESLint linting (\`next lint\`)
- Unit and integration tests (\`jest\` or \`vitest\`)
- Build verification (\`next build\`)
- E2E tests (\`playwright\`)

**CD (on merge to main):**
- Automatic deployment to production via Vercel
- Database migrations (if applicable)
- Smoke tests against production`,
  whyWeNeedIt: `Without CI/CD:
- Type errors reach production
- Broken builds are deployed
- No consistent testing before release
- Manual deployments are slow and error-prone

With CI/CD:
- Every PR is validated before merge
- Production deployments are automatic and consistent
- Rollbacks are instant (Vercel instant rollback)`,
  realWorldUsage: `**CI/CD pipeline for a Next.js SaaS:**

1. Developer opens PR
2. GitHub Actions runs: typecheck + lint + unit tests (2 min)
3. Vercel creates preview deployment (3 min)
4. Playwright E2E tests run against preview URL (5 min)
5. PR approved + all checks green → merge
6. Vercel deploys to production automatically
7. Smoke test verifies production is healthy`,
  howItWorks: `**GitHub Actions + Vercel integration:**

- Vercel GitHub app automatically creates preview deployments for every PR
- GitHub Actions runs additional CI checks (tests, type checking)
- The Vercel deployment URL is available as a GitHub deployment environment
- E2E tests can target the Vercel preview URL using the \`VERCEL_URL\` environment variable`,
  example: {
    title: 'GitHub Actions CI Pipeline',
    description: 'Complete CI workflow for a Next.js application.',
    code: [
      {
        label: '.github/workflows/ci.yml',
        language: 'yaml',
        code: `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    name: Type Check, Lint & Test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Unit tests
        run: npm test -- --coverage
        env:
          DATABASE_URL: \${{ secrets.TEST_DATABASE_URL }}

      - name: Build
        run: npm run build
        env:
          DATABASE_URL: \${{ secrets.TEST_DATABASE_URL }}

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: quality
    if: github.event_name == 'pull_request'

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests against preview URL
        run: npx playwright test
        env:
          # Vercel sets this for preview deployments
          BASE_URL: \${{ env.VERCEL_URL }}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Should I use Vercel\'s built-in CI or GitHub Actions?',
      answer: 'Both — they serve different purposes. Vercel handles deployment (preview + production). GitHub Actions handles quality gates (tests, type checking, linting). Use Vercel for deployment, GitHub Actions for CI. They run in parallel and complement each other.',
    },
    {
      question: 'How do I run database migrations in CI/CD?',
      answer: 'For tests: use a test database and run migrations before tests. For production: run migrations as part of the build command in Vercel: "build": "prisma migrate deploy && next build". For zero-downtime: use expand-contract migration strategy.',
    },
    {
      question: 'How do I cache npm dependencies in GitHub Actions?',
      answer: 'Use actions/setup-node with cache: "npm". This caches the node_modules based on package-lock.json. Subsequent runs restore from cache, reducing install time from 60s to 5s.',
    },
  ],
  productionIssues: [
    'E2E tests flaky due to timing issues — use Playwright\'s auto-wait and avoid fixed timeouts. Use page.waitForSelector() and page.waitForResponse() instead of page.waitForTimeout().',
    'CI passing but production failing — CI uses test environment variables. Ensure CI environment mirrors production as closely as possible. Run next build in CI to catch build-time errors.',
    'Long CI times blocking PRs — parallelise jobs (typecheck, lint, test in parallel). Cache dependencies. Use test sharding for large test suites.',
  ],
  bestPractices: [
    'Run typecheck, lint, and tests in parallel — do not chain them sequentially',
    'Cache npm dependencies in CI — reduces install time by 10x',
    'Run E2E tests against the Vercel preview URL, not a local server',
    'Protect the main branch — require all CI checks to pass before merge',
    'Use Vercel\'s instant rollback for production incidents — faster than redeploying',
  ],
  architectNote: `A mature CI/CD pipeline is the foundation of sustainable engineering velocity. The goal is **confidence to deploy** — when all checks are green, any engineer should be able to merge and deploy without fear. Invest in CI/CD early; the cost of fixing production bugs without it is always higher.`,
  faqs: [
    {
      question: 'How do I run Playwright tests against a Vercel preview deployment?',
      answer: 'Use the Vercel GitHub integration to get the preview URL, then pass it to Playwright as the BASE_URL environment variable. The @vercel/test-utils package provides utilities for waiting for the deployment to be ready before running tests.',
    },
    {
      question: 'How do I handle secrets in GitHub Actions?',
      answer: 'Store secrets in GitHub repository Settings > Secrets and Variables > Actions. Reference them in workflows as ${{ secrets.MY_SECRET }}. Never log secrets or pass them as plain text. Use GitHub\'s encrypted secrets, not environment variables in the workflow file.',
    },
    {
      question: 'Should I use Turborepo for a Next.js monorepo CI/CD?',
      answer: 'Yes — Turborepo\'s remote caching means CI only rebuilds packages that changed. In a monorepo with 10 apps, a change to one app only rebuilds that app and its dependents. This can reduce CI time from 20 minutes to 2 minutes.',
    },
  ],
  keyTakeaways: [
    'CI runs on every PR: typecheck, lint, tests, build — all must pass before merge',
    'Vercel handles deployment automatically — GitHub Actions handles quality gates',
    'Run E2E tests against the Vercel preview URL for production-accurate testing',
    'Cache npm dependencies in CI to reduce build times',
    'Protect main branch — require all checks to pass before merge',
    'Vercel instant rollback is faster than redeploying for production incidents',
  ],
  relatedTopics: ['nextjs-vercel-deployment', 'nextjs-environment-variables', 'nextjs-monitoring', 'nextjs-server-actions'],
};
