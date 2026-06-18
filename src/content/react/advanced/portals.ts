import type { TopicContent } from '../../types';

export const reactPortals: TopicContent = {
  slug: 'react-portals',
  title: 'Portals',
  description: 'Learn how React Portals let overlays escape DOM constraints while still behaving as part of the same React tree.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'June 2026',
  quickUnderstanding: 'A Portal renders DOM into another container, but the component still belongs to the same React tree, so context and React events continue to work as expected.',
  whatIsIt: `Portals are used when a component needs to render outside its parent DOM hierarchy.

- Common for modals, drawers, tooltips, and popovers
- Avoids clipping, stacking, and overflow problems
- Keeps React context and event propagation intact
- Requires deliberate focus and accessibility handling`,
  whyWeNeedIt: `Without portals, overlays often break because a parent has overflow hidden, a lower stacking context, or layout rules that trap the UI inside the wrong container.`,
  realWorldUsage: `Production apps use portals for dialogs, command palettes, dropdown menus, toasts, onboarding layers, and support widgets that must visually escape the page layout.`,
  howItWorks: `ReactDOM.createPortal renders the JSX into a target DOM node such as #modal-root. Even though the DOM lives elsewhere, the component still reads context from its original parent and React events bubble through the React tree.`,
  example: {
    title: 'Modal with a Portal Root',
    description: 'A portal solves layering problems, but accessibility still needs to be handled deliberately.',
    code: [
      {
        label: 'Portal-Based Modal',
        language: 'tsx',
        code: `import { createPortal } from 'react-dom';

function Modal({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null;

  const portalRoot = document.getElementById('modal-root');
  if (!portalRoot) return null;

  return createPortal(
    <div role="dialog" aria-modal="true" className="overlay">
      <div className="modal">{children}</div>
    </div>,
    portalRoot
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'Does a portal break context?',
      answer: 'No. The portal moves DOM placement, not React tree ownership. Context still works normally.',
    },
    {
      question: 'Do browser events and React events behave the same here?',
      answer: 'Not exactly. React events continue through the React tree, which can surprise teams if they only think in DOM-tree terms.',
    },
  ],
  productionIssues: [
    'Dialogs that visually open but fail keyboard focus management are inaccessible and hard to use.',
    'Teams solve clipping with portals but forget scroll locking or escape handling.',
    'Multiple overlay systems without one shared portal strategy create z-index wars quickly.',
  ],
  bestPractices: [
    'Use a shared portal root strategy for overlays across the app.',
    'Manage focus, escape handling, and scroll locking deliberately.',
    'Test both pointer and keyboard behavior for portal-driven overlays.',
    'Treat overlay layering as a design-system concern, not a one-off component trick.',
  ],
  architectNote: `Portals are easy technically and hard operationally. The real architecture question is who owns overlay governance, focus rules, layering, and cross-product consistency.`,
  faqs: [
    {
      question: 'Do I need a portal for every dropdown?',
      answer: 'Not always. Use one when layout clipping or stacking context makes local rendering unreliable, or when a shared overlay system is already in place.',
    },
  ],
  keyTakeaways: [
    'Portals change DOM placement without changing React tree ownership.',
    'They are essential for robust overlays in complex layouts.',
    'Accessibility and focus handling are part of the feature, not optional extras.',
    'Overlay governance should stay consistent across the app.',
  ],
  relatedTopics: ['react-components', 'react-compound-components', 'react-component-architecture', 'react-error-boundaries'],
};
