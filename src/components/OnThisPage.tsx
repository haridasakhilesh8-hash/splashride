import { useEffect, useState } from 'react';

const sections = [
  { id: 'quick-understanding', label: 'Quick Understanding' },
  { id: 'what-is-it', label: 'What Is It?' },
  { id: 'why-we-need-it', label: 'Why Do We Need It?' },
  { id: 'real-world', label: 'Real Projects' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'example', label: 'Example' },
  { id: 'common-confusions', label: 'Common Confusions' },
  { id: 'production-issues', label: 'Production Issues' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'architect-note', label: "Architect's Note" },
  { id: 'faqs', label: 'FAQs' },
  { id: 'key-takeaways', label: 'Key Takeaways' },
  { id: 'related-topics', label: 'Related Topics' },
];

export default function OnThisPage() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <aside
      style={{
        width: '220px',
        minWidth: '220px',
        position: 'sticky',
        top: '72px',
        height: 'fit-content',
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'auto',
        flexShrink: 0,
        paddingTop: '1rem',
      }}
    >
      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: '0.75rem',
          padding: '0 0.5rem',
        }}
      >
        On This Page
      </p>
      <nav>
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '4px 8px',
                background: 'none',
                border: 'none',
                borderLeft: `2px solid ${isActive ? 'var(--color-accent)' : 'transparent'}`,
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                lineHeight: 1.5,
                fontWeight: isActive ? 500 : 400,
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
