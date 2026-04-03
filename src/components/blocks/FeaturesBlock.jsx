export default function FeaturesBlock({ props, settings }) {
  const { title = 'What We Do', items = [] } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <section style={{ background: '#fff', padding: '96px 48px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: primary, marginBottom: '16px' }}>Our Services</p>
        <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: '56px', lineHeight: 1.1 }}>{title}</h2>

        {items.length === 0 ? (
          <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Add feature items in the properties panel →</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`, gap: '1px', background: '#e2e8f0' }}>
            {items.map((item, i) => (
              <div key={i} style={{ background: '#fff', padding: '40px 36px' }}>
                <div style={{ fontSize: '36px', marginBottom: '20px' }}>{item.icon || '✦'}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75 }}>{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
