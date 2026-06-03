import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '../content/types';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
              borderColor: isOpen ? 'var(--color-accent)' : 'var(--color-border)',
            }}
          >
            <button
              onClick={() => toggle(index)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '14px 16px',
                background: isOpen ? 'var(--color-accent-light)' : 'var(--color-bg-secondary)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.2s',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  background: 'var(--color-tag-bg)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                Q{index + 1}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.5,
                }}
              >
                {faq.question}
              </span>
              <ChevronDown
                size={16}
                style={{
                  color: 'var(--color-text-muted)',
                  flexShrink: 0,
                  marginTop: '3px',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s',
                }}
              />
            </button>
            {isOpen && (
              <div
                style={{
                  padding: '14px 16px 14px 48px',
                  background: 'var(--color-bg-primary)',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
