export default function TestimonialsBlock({ props, settings }) {
  const { title = 'What Our Clients Say', items = [] } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <section style={{ background: '#fafaf8', padding: '96px 48px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: primary, marginBottom: '16px' }}>Testimonials</p>
        <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: '56px', lineHeight: 1.1 }}>{title}</h2>

        {items.length === 0 ? (
          <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Add testimonials in the properties panel →</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {items.map((item, i) => (
              <div key={i} style={{ background: '#fff', padding: '40px', borderRadius: '2px' }}>
                <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#334155', fontStyle: 'italic', marginBottom: '32px' }}>"{item.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: primary, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 700, flexShrink: 0,
                  }}>
                    {(item.author || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{item.author}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
