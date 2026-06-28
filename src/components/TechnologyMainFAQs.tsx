import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '../content/types';

interface TechnologyMainFAQsProps {
  title?: string;
  faqs: FAQ[];
}

export default function TechnologyMainFAQs({ title = 'Quick FAQs', faqs }: TechnologyMainFAQsProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const columns = [
    faqs.filter((_, index) => index % 2 === 0),
    faqs.filter((_, index) => index % 2 === 1),
  ];

  return (
    <section aria-labelledby="technology-main-faqs-heading" style={{ marginTop: '2rem' }}>
      <h2 id="technology-main-faqs-heading" style={headingStyle}>{title}</h2>
      <div className="technology-main-faq-grid" style={gridStyle}>
        {columns.map((group, columnIndex) => (
          <div key={`faq-column-${columnIndex}`} style={columnStyle}>
            {group.map((faq) => {
              const originalIndex = faqs.findIndex((item) => item.question === faq.question);
              const isOpen = openQuestion === faq.question;

              return (
                <div
                  key={faq.question}
                  style={{
                    ...cardStyle,
                    borderColor: isOpen ? 'rgba(37, 99, 235, 0.18)' : 'var(--color-border)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenQuestion((current) => (current === faq.question ? null : faq.question))}
                    aria-expanded={isOpen}
                    style={triggerStyle}
                  >
                    <span style={badgeStyle}>Q{originalIndex + 1}</span>
                    <span style={questionStyle}>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        ...chevronStyle,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={answerWrapStyle}>
                      <p style={answerStyle}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .technology-main-faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const headingStyle = {
  margin: '0 0 1rem',
  color: 'var(--color-text-primary)',
  fontSize: '1.1rem',
  fontWeight: 800,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '0.75rem 0.85rem',
};

const columnStyle = {
  display: 'grid',
  gap: '0.75rem',
  alignContent: 'start' as const,
};

const cardStyle = {
  background: 'var(--color-bg-secondary)',
  border: '1px solid var(--color-border)',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'border-color 0.2s ease',
};

const triggerStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px 18px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left' as const,
};

const badgeStyle = {
  flexShrink: 0,
  color: 'var(--color-accent)',
  background: 'rgba(37, 99, 235, 0.08)',
  border: '1px solid rgba(37, 99, 235, 0.12)',
  borderRadius: '999px',
  padding: '6px 10px',
  fontSize: '0.78rem',
  fontWeight: 800,
  lineHeight: 1,
};

const questionStyle = {
  flex: 1,
  color: 'var(--color-text-primary)',
  fontSize: '0.92rem',
  fontWeight: 700,
  lineHeight: 1.4,
};

const chevronStyle = {
  color: 'var(--color-text-muted)',
  flexShrink: 0,
  transition: 'transform 0.18s ease',
};

const answerWrapStyle = {
  padding: '0 18px 16px 58px',
  borderTop: '1px solid var(--color-border)',
  background: 'var(--color-bg-primary)',
};

const answerStyle = {
  margin: '14px 0 0',
  color: 'var(--color-text-secondary)',
  fontSize: '0.88rem',
  lineHeight: 1.65,
};
