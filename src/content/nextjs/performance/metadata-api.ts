import type { TopicContent } from '../../types';

export const nextjsMetadataApi: TopicContent = {
  slug: 'nextjs-metadata-api',
  title: 'Metadata API',
  description: 'Master the Next.js Metadata API — static and dynamic metadata, Open Graph, Twitter cards, JSON-LD, and the SEO patterns used in production applications.',
  applicableVersions: ['Next.js 13.2+', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'The Metadata API replaces manual <head> tag management. Export a metadata object or generateMetadata function from any layout.tsx or page.tsx. Next.js automatically merges metadata from all levels of the layout hierarchy.',
  whatIsIt: `The Next.js Metadata API provides two ways to define \`<head>\` metadata:

1. **Static metadata** — export a \`metadata\` object from a layout or page
2. **Dynamic metadata** — export a \`generateMetadata\` async function that receives params

**What it generates:**
- \`<title>\` and \`<meta name="description">\`
- Open Graph tags (\`og:title\`, \`og:image\`, etc.)
- Twitter Card tags
- Canonical URLs
- Robots directives
- JSON-LD structured data
- Viewport and theme-color meta tags`,
  whyWeNeedIt: `SEO and social sharing are critical for most web applications:

- **Search ranking** — title and description directly affect click-through rates
- **Social sharing** — Open Graph tags control how links appear on Twitter/LinkedIn/Slack
- **Rich results** — JSON-LD structured data enables Google rich snippets

The Metadata API handles all of this declaratively, with TypeScript types ensuring you don\'t miss required fields.`,
  realWorldUsage: `**Metadata in a content platform:**

- Root layout: site name, default description, OG image template
- Blog listing: "Blog | Site Name", blog-specific OG image
- Blog post: dynamic title, post excerpt as description, post hero as OG image
- Product page: product name, price in description, product image as OG
- 404 page: "Not Found | Site Name", noindex robots directive`,
  howItWorks: `**Metadata merging:**

Next.js collects metadata from all layout and page files in the route hierarchy and merges them. Child metadata overrides parent metadata for the same fields.

\`\`\`
app/layout.tsx         → title: "My Site"
app/blog/layout.tsx    → title: { template: "%s | My Site" }
app/blog/[slug]/page.tsx → title: "My Post"

Result: <title>My Post | My Site</title>
\`\`\``,
  example: {
    title: 'Metadata API Patterns',
    description: 'Static metadata, dynamic metadata, and Open Graph configuration.',
    code: [
      {
        label: 'Root layout metadata',
        language: 'ts',
        code: `// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Title template: child pages use %s
  title: {
    default: 'My SaaS Product',
    template: '%s | My SaaS Product',
  },
  description: 'The best SaaS product for enterprise teams.',
  // Canonical URL base
  metadataBase: new URL('https://myproduct.com'),
  // Open Graph defaults
  openGraph: {
    type: 'website',
    siteName: 'My SaaS Product',
    images: ['/og-default.png'], // Relative to metadataBase
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    creator: '@myproduct',
  },
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};`,
      },
      {
        label: 'Dynamic metadata for blog posts',
        language: 'ts',
        code: `// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { db } from '@/lib/db';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await db.post.findUnique({ where: { slug: params.slug } });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title, // Becomes: "Post Title | My SaaS Product"
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    // Prevent indexing of draft posts
    robots: post.published ? undefined : { index: false },
  };
}

// generateMetadata runs at the same time as generateStaticParams
// Both are called at build time for static pages`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Can I use generateMetadata in a layout?',
      answer: 'Yes — and this is useful for section-level metadata. A blog layout can set the Open Graph type to "article" for all blog pages. A product layout can set the og:type to "product". Child page metadata overrides layout metadata for the same fields.',
    },
    {
      question: 'What is metadataBase and why is it required?',
      answer: 'metadataBase is the base URL of your site. It is required for resolving relative URLs in metadata (og:image, canonical). Without it, Next.js warns that relative URLs cannot be resolved. Set it to your production domain in the root layout.',
    },
    {
      question: 'Can I use the Metadata API with the Pages Router?',
      answer: 'No — the Metadata API is App Router only. In the Pages Router, use next/head to manually add <title> and <meta> tags. This is one of the key reasons to migrate to the App Router.',
    },
  ],
  productionIssues: [
    'Missing metadataBase — relative OG image URLs are not resolved correctly, resulting in broken social share previews. Always set metadataBase to your production URL in the root layout.',
    'generateMetadata not running for static pages — if you have export const dynamic = "force-static" and generateMetadata accesses dynamic data, it may not run correctly. Test metadata generation with next build.',
    'OG images not updating — social platforms (Twitter, LinkedIn) aggressively cache OG images. After updating an OG image, use the platform\'s cache clearing tool (Twitter Card Validator, LinkedIn Post Inspector).',
  ],
  bestPractices: [
    'Always set metadataBase in the root layout — required for OG images to work',
    'Use title templates: { template: "%s | Site Name" } for consistent titling',
    'Generate OG images dynamically with ImageResponse from next/og for per-page social images',
    'Add JSON-LD structured data for articles, products, and FAQs to enable Google rich results',
    'Set robots: { index: false } for draft content, admin pages, and thank-you pages',
  ],
  architectNote: `The Metadata API is one of the most compelling reasons to use the App Router. In the Pages Router, managing metadata across a large site with dynamic content required complex manual solutions. The App Router\'s declarative, hierarchical metadata system scales from a simple blog to a 10,000-page product catalog with minimal configuration.`,
  faqs: [
    {
      question: 'How do I generate dynamic OG images?',
      answer: 'Use ImageResponse from next/og in a special opengraph-image.tsx file (or opengraph-image.ts for programmatic generation). This generates an image using React JSX rendered to a PNG. Vercel\'s @vercel/og package is the same API.',
    },
    {
      question: 'How do I add JSON-LD structured data?',
      answer: 'Add a <script type="application/ld+json"> tag in the page component (not in metadata). Example: const jsonLd = { "@context": "https://schema.org", "@type": "Article", name: post.title }; return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />',
    },
    {
      question: 'Does generateMetadata affect page performance?',
      answer: 'For static pages, generateMetadata runs at build time — no runtime cost. For dynamic pages, it runs on every request alongside the page component. Next.js deduplicates fetch calls between generateMetadata and the page component, so fetching the same data in both costs only one network request.',
    },
  ],
  keyTakeaways: [
    'Export metadata object or generateMetadata function from layout.tsx or page.tsx',
    'Metadata merges hierarchically — child overrides parent for the same fields',
    'Always set metadataBase in root layout for OG images to resolve correctly',
    'Use title templates for consistent page titling across the site',
    'generateMetadata is async — can fetch data for dynamic titles and descriptions',
    'Use ImageResponse in opengraph-image.tsx for dynamic social share images',
  ],
  relatedTopics: ['nextjs-ssg', 'nextjs-image-optimization', 'nextjs-app-router', 'nextjs-vercel-deployment'],
};
