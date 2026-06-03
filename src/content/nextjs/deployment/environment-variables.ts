import type { TopicContent } from '../../types';

export const nextjsEnvironmentVariables: TopicContent = {
  slug: 'nextjs-environment-variables',
  title: 'Environment Variables',
  description: 'Master environment variables in Next.js — server vs client exposure, .env files, runtime vs build-time variables, and secrets management in production.',
  applicableVersions: ['Next.js 12+', 'Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'In Next.js, environment variables are server-only by default. Only variables prefixed with NEXT_PUBLIC_ are sent to the browser. Never put secrets in NEXT_PUBLIC_ variables — they are embedded in the JavaScript bundle and visible to anyone.',
  whatIsIt: `Next.js has two types of environment variables:

1. **Server-only** — available in Server Components, Route Handlers, middleware, and build scripts. Never sent to the browser.
   - \`DATABASE_URL\`, \`API_SECRET\`, \`STRIPE_SECRET_KEY\`

2. **Public (client-accessible)** — prefixed with \`NEXT_PUBLIC_\`. Embedded in the JavaScript bundle. Visible to all users.
   - \`NEXT_PUBLIC_API_URL\`, \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\`

**.env files (loaded in order):**
- \`.env\` — all environments
- \`.env.local\` — local overrides (git-ignored)
- \`.env.development\` — development only
- \`.env.production\` — production only`,
  whyWeNeedIt: `Environment variables solve two problems:

1. **Configuration per environment** — different database URLs for dev, staging, and production
2. **Secret management** — API keys and database credentials that should never be in source code

The NEXT_PUBLIC_ prefix system ensures secrets never accidentally reach the client bundle.`,
  realWorldUsage: `**Typical .env.local for development:**

\`\`\`
DATABASE_URL="postgresql://localhost:5432/mydb"
NEXTAUTH_SECRET="dev-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
\`\`\``,
  howItWorks: `**Build-time vs runtime:**

- **NEXT_PUBLIC_ variables** are embedded at build time. The value at build time is baked into the JS bundle. Changing the variable requires a rebuild.
- **Server-only variables** are read at runtime (when the server function executes). No rebuild needed to change them.

**On Vercel:** Set environment variables in the Vercel dashboard. They are injected at build time (for NEXT_PUBLIC_) or at runtime (for server-only). Never commit \`.env.production\` to git.`,
  example: {
    title: 'Environment Variable Patterns',
    description: 'Type-safe env validation and correct usage in Server vs Client Components.',
    code: [
      {
        label: 'Type-safe env validation with Zod',
        language: 'ts',
        code: `// lib/env.ts — Validate env vars at startup
import { z } from 'zod';

// Server-only variables
const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

// Public variables
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),
});

// Validate on import — fails fast if vars are missing
export const env = serverSchema.parse(process.env);
export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
});`,
      },
      {
        label: 'Correct usage in Server vs Client Components',
        language: 'tsx',
        code: `// Server Component — can access all env vars
export default async function ServerPage() {
  // ✅ OK: server-only var, never sent to browser
  const data = await fetch('https://api.example.com', {
    headers: { Authorization: \`Bearer \${process.env.API_SECRET}\` },
  });

  return <div>{/* ... */}</div>;
}

// Client Component — can ONLY access NEXT_PUBLIC_ vars
'use client';
export function ClientComponent() {
  // ✅ OK: public var, safe to expose
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ❌ WRONG: process.env.API_SECRET is undefined in Client Components
  // It is NOT sent to the browser
  const secret = process.env.API_SECRET; // undefined!

  return <div>{apiUrl}</div>;
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I access server env vars in Client Components?',
      answer: 'No — process.env.SECRET_KEY is undefined in Client Components. Only NEXT_PUBLIC_ variables are available. If a Client Component needs a value from a server env var, fetch it from a Route Handler or pass it as a prop from a Server Component.',
    },
    {
      question: 'Are NEXT_PUBLIC_ variables safe for API keys?',
      answer: 'Only for public keys (Stripe publishable key, Google Maps API key with domain restrictions). Never for secret keys. NEXT_PUBLIC_ variables are embedded in the JS bundle — anyone can find them in DevTools. Use them only for values that are designed to be public.',
    },
    {
      question: 'Do I need to restart the dev server after changing .env.local?',
      answer: 'Yes — environment variables are loaded at server startup. Changes to .env files require restarting next dev. On Vercel, changing an environment variable triggers a new deployment.',
    },
  ],
  productionIssues: [
    'Committing .env.local or .env.production to git — immediately rotate all secrets. Add .env*.local and .env.production to .gitignore. Use git-secrets or a pre-commit hook to prevent this.',
    'NEXT_PUBLIC_ variable not updated after change — public variables are baked in at build time. Changing them in the Vercel dashboard requires triggering a new deployment (not just a revalidation).',
    'Missing env vars causing runtime crashes — validate all required env vars at startup with Zod. This catches missing variables immediately on deployment, not during a user request.',
  ],
  bestPractices: [
    'Validate all env vars at startup with Zod — fail fast, not during user requests',
    'Never put secrets in NEXT_PUBLIC_ variables',
    'Use .env.local for local development — it is git-ignored by default',
    'Use a secrets manager (AWS Secrets Manager, Vault) for production secrets in enterprise',
    'Document all required env vars in a .env.example file committed to git',
  ],
  architectNote: `Treat environment variables as a **configuration contract**. Document every variable in .env.example with a description and example value. Validate them at startup with Zod. This makes onboarding new developers trivial and prevents "it works on my machine" issues.`,
  faqs: [
    {
      question: 'How do I use environment variables in next.config.ts?',
      answer: 'process.env is available in next.config.ts. You can also use the env config option to expose server vars to the build: env: { MY_VAR: process.env.MY_VAR }. Variables set in env config are available in Server Components without the NEXT_PUBLIC_ prefix.',
    },
    {
      question: 'What is the difference between .env and .env.local?',
      answer: '.env is committed to git and contains non-sensitive defaults. .env.local is git-ignored and contains local overrides (your personal database URL, local API keys). .env.local always takes precedence over .env.',
    },
    {
      question: 'How do I share env vars between multiple Next.js apps in a monorepo?',
      answer: 'Create a shared .env file at the monorepo root and reference it in each app\'s next.config.ts using envDir. Or use a secrets manager and have each app fetch its own secrets at startup.',
    },
  ],
  keyTakeaways: [
    'Server-only vars: accessible in Server Components, Route Handlers, middleware',
    'NEXT_PUBLIC_ vars: embedded in JS bundle, visible to all users — never put secrets here',
    'Validate all env vars at startup with Zod — fail fast',
    '.env.local is git-ignored — use for local development secrets',
    'Document all vars in .env.example — commit this file to git',
    'NEXT_PUBLIC_ vars require a rebuild to update — they are baked in at build time',
  ],
  relatedTopics: ['nextjs-vercel-deployment', 'nextjs-authentication', 'nextjs-route-handlers', 'nextjs-middleware'],
};
