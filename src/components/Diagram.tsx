interface DiagramProps {
  type: string;
}

function DispatcherDiagram() {
  return (
    <div
      style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '2rem',
        margin: '1.5rem 0',
        overflowX: 'auto',
      }}
    >
      <p style={{ textAlign: 'center', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        AEM Dispatcher Architecture — Request Flow
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexWrap: 'wrap', minWidth: '600px' }}>
        {[
          { label: 'User Browser', icon: '👤', color: '#3b82f6', desc: 'HTTP Request' },
          { label: 'CDN', icon: '🌐', color: '#8b5cf6', desc: 'Edge Cache' },
          { label: 'Dispatcher', icon: '🛡️', color: '#e8520a', desc: 'Cache + Filter' },
          { label: 'AEM Publish', icon: '⚡', color: '#22c55e', desc: 'Render Engine' },
        ].map((node, i, arr) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  background: node.color + '20',
                  border: `2px solid ${node.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{node.icon}</span>
              </div>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '6px', marginBottom: '2px' }}>{node.label}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', margin: 0 }}>{node.desc}</p>
            </div>
            {i < arr.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>request</span>
                <div style={{ width: '40px', height: '2px', background: 'var(--color-border)', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: '-4px', top: '-4px', borderLeft: '8px solid var(--color-border)', borderTop: '5px solid transparent', borderBottom: '5px solid transparent' }} />
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-accent)', marginTop: '2px' }}>cache hit ↩</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { color: '#3b82f6', label: 'Cache Miss → Request passes through all layers' },
          { color: '#22c55e', label: 'Cache Hit → Response returned from nearest cache' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: item.color }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CloudArchDiagram() {
  return (
    <div
      style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '2rem',
        margin: '1.5rem 0',
        overflowX: 'auto',
      }}
    >
      <p style={{ textAlign: 'center', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        AEM as a Cloud Service — Architecture Overview
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
        {[
          { label: 'Cloud Manager', icon: '⚙️', color: '#8b5cf6', desc: 'CI/CD Pipeline\nGit → Build → Deploy' },
          { label: 'CDN (Fastly)', icon: '🌐', color: '#3b82f6', desc: 'Global Edge Cache\nBuilt-in SSL' },
          { label: 'AEM Author', icon: '✏️', color: '#f59e0b', desc: 'Content Authoring\nTemplate Editor' },
          { label: 'AEM Publish', icon: '🚀', color: '#22c55e', desc: 'Content Delivery\nAuto-scaling' },
          { label: 'Dispatcher', icon: '🛡️', color: '#e8520a', desc: 'Caching Layer\nSecurity Filter' },
          { label: 'Cloud Storage', icon: '☁️', color: '#06b6d4', desc: 'Oak Repository\nAsset Storage' },
        ].map((node, i) => (
          <div
            key={i}
            style={{
              background: node.color + '15',
              border: `1px solid ${node.color}40`,
              borderRadius: '10px',
              padding: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{node.icon}</span>
            <div>
              <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{node.label}</p>
              {node.desc.split('\n').map((line, j) => (
                <p key={j} style={{ margin: 0, fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Diagram({ type }: DiagramProps) {
  if (type === 'dispatcher') return <DispatcherDiagram />;
  if (type === 'cloud') return <CloudArchDiagram />;
  return null;
}
