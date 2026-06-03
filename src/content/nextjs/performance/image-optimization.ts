import type { TopicContent } from '../../types';

export const nextjsImageOptimization: TopicContent = {
  slug: 'nextjs-image-optimization',
  title: 'Image Optimization',
  description: 'Master next/image — automatic WebP conversion, lazy loading, CLS prevention, responsive images, and the configuration options for production image delivery.',
  applicableVersions: ['Next.js 13', 'Next.js 14', 'Next.js 15'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'next/image is a drop-in replacement for <img> that automatically converts images to WebP, lazy loads them, prevents layout shift (CLS), and serves them at the right size for each device. Never use <img> in a Next.js app — always use next/image.',
  whatIsIt: `The Next.js \`Image\` component (\`next/image\`) provides:

- **Automatic format conversion** — serves WebP or AVIF instead of PNG/JPEG (30–50% smaller)
- **Responsive sizing** — serves the right resolution for each screen size
- **Lazy loading** — images below the fold load only when near the viewport
- **CLS prevention** — reserves space for the image before it loads (no layout shift)
- **Priority loading** — \`priority\` prop for above-the-fold images (LCP optimisation)
- **Blur placeholder** — shows a blurred preview while the full image loads`,
  whyWeNeedIt: `Images are the #1 cause of poor Core Web Vitals scores:

- **LCP (Largest Contentful Paint)** — slow hero images delay the main content
- **CLS (Cumulative Layout Shift)** — images without dimensions cause layout jumps
- **Bandwidth** — serving 4K images to mobile devices wastes data

next/image solves all three automatically. Using plain \`<img>\` in Next.js means manually solving problems that next/image handles for free.`,
  realWorldUsage: `**next/image in production:**

- **Hero images** — \`priority\` prop to preload, \`fill\` layout for full-width
- **Product images** — fixed width/height, blur placeholder
- **User avatars** — small, rounded, lazy loaded
- **Blog thumbnails** — responsive sizes for different grid layouts
- **CMS images** — external domains configured in next.config.ts`,
  howItWorks: `**Image optimisation pipeline:**

1. Browser requests \`/_next/image?url=...&w=800&q=75\`
2. Next.js fetches the original image (from public/ or external URL)
3. Converts to WebP/AVIF, resizes to requested width
4. Caches the optimised image on disk
5. Serves from cache on subsequent requests
6. On Vercel: served from global CDN edge`,
  example: {
    title: 'Image Component Patterns',
    description: 'All the next/image patterns you need for production.',
    code: [
      {
        label: 'Common image patterns',
        language: 'tsx',
        code: `import Image from 'next/image';

// 1. Above-the-fold hero image (LCP element)
// priority: preloads the image, skips lazy loading
export function HeroImage() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero banner showing our product"
      width={1200}
      height={600}
      priority // Preload — use for LCP element only
      className="w-full h-auto"
    />
  );
}

// 2. Product image with blur placeholder
export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQ..." // tiny base64 preview
      className="rounded-lg object-cover"
    />
  );
}

// 3. Fill layout for responsive containers
export function CoverImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video"> {/* Container must be relative */}
      <Image
        src={src}
        alt={alt}
        fill // Fills the parent container
        sizes="(max-width: 768px) 100vw, 50vw" // Responsive size hints
        className="object-cover"
      />
    </div>
  );
}

// 4. Avatar — small, circular
export function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <Image
      src={src}
      alt={\`\${name}'s avatar\`}
      width={40}
      height={40}
      className="rounded-full"
    />
  );
}`,
      },
      {
        label: 'next.config.ts — external image domains',
        language: 'ts',
        code: `// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    // Allow images from these external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.contentful.com',
        pathname: '/spaces/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    // Custom sizes for your design system
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Use AVIF for even better compression (slower to generate)
    formats: ['image/avif', 'image/webp'],
  },
};

export default config;`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use width/height vs fill?',
      answer: 'Use width and height when you know the exact dimensions (product images, avatars, thumbnails). Use fill when the image should fill its container (hero images, card thumbnails where the container controls the size). With fill, the parent must have position: relative and a defined size.',
    },
    {
      question: 'What is the sizes prop and why does it matter?',
      answer: 'The sizes prop tells the browser how wide the image will be at different viewport widths. Without it, the browser assumes the image is 100vw wide and downloads the largest version. With sizes="(max-width: 768px) 100vw, 50vw", mobile devices download a smaller image. Always set sizes for fill images.',
    },
    {
      question: 'Should I use priority on all images?',
      answer: 'No — only on the LCP element (the largest above-the-fold image). priority disables lazy loading and adds a preload link tag. Using it on many images defeats the purpose — all those images compete for bandwidth. One priority image per page is the typical pattern.',
    },
  ],
  productionIssues: [
    'Missing alt text — next/image requires alt. Empty alt ("") is valid for decorative images. Meaningful alt text is required for content images. Next.js will warn in development but not block builds.',
    'External images not configured — using an image from an external domain without adding it to remotePatterns in next.config.ts throws a runtime error. Always add external domains before deploying.',
    'CLS from fill images without container height — a fill image in a container with no defined height collapses to 0px. Always set a height on the container (aspect-ratio, h-64, etc.).',
  ],
  bestPractices: [
    'Use priority only on the LCP image — typically the hero or first above-the-fold image',
    'Always set sizes for fill images — prevents downloading oversized images on mobile',
    'Use blur placeholder for images that take time to load — better UX',
    'Configure remotePatterns in next.config.ts for all external image sources',
    'Use aspect-ratio CSS on containers for fill images to prevent CLS',
  ],
  architectNote: `Image optimisation is one of the highest-ROI performance improvements in any web app. A 30–50% reduction in image file size directly translates to faster LCP scores and lower bandwidth costs. Make next/image usage a team standard — add an ESLint rule (\`@next/next/no-img-element\`) to prevent plain \`<img>\` tags.`,
  faqs: [
    {
      question: 'Can I use next/image with a CDN like Cloudinary?',
      answer: 'Yes — configure a custom loader in next.config.ts. The loader function generates the CDN URL with the right dimensions. Cloudinary, Imgix, and Akamai all have official Next.js loader documentation. This offloads image processing from your Next.js server to the CDN.',
    },
    {
      question: 'How do I generate blur placeholders for dynamic images?',
      answer: 'Use the plaiceholder library: const { base64 } = await getPlaiceholder(imageUrl). Store the base64 string alongside the image URL in your DB or CMS. Pass it as blurDataURL to the Image component. This is the standard pattern for CMS-driven sites.',
    },
    {
      question: 'Does next/image work with SVGs?',
      answer: 'next/image serves SVGs but does not optimise them (they are already vector). For SVG icons, import them as React components instead. For SVG illustrations, using next/image is fine — it handles them correctly, just without format conversion.',
    },
  ],
  keyTakeaways: [
    'Always use next/image instead of <img> — automatic WebP, lazy loading, CLS prevention',
    'Use priority only on the LCP image — not all images',
    'Set sizes prop on fill images to prevent downloading oversized images on mobile',
    'Configure remotePatterns in next.config.ts for external image domains',
    'Use blur placeholder for a better loading experience',
    'Add @next/next/no-img-element ESLint rule to enforce next/image usage',
  ],
  relatedTopics: ['nextjs-lazy-loading', 'nextjs-metadata-api', 'nextjs-vercel-deployment', 'nextjs-streaming'],
};
