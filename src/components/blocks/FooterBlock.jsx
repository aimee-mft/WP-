export default function FooterBlock({ props, settings }) {
  const { copyright = '© 2025 My Site. All rights reserved.', links = [], socials = [] } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <footer style={{ background: '#0f172a', padding: '64px 48px 40px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid #1e293b', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              {props.logo || copyright.split('©')[1]?.split('.')[0]?.trim() || 'My Site'}
            </div>
            {links.length > 0 && (
              <div style={{ display: 'flex', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }}>
                {links.map((l, i) => (
                  <span key={i} style={{ fontSize: '13px', color: '#64748b', cursor: 'default', letterSpacing: '0.01em' }}>{l.label}</span>
                ))}
              </div>
            )}
          </div>
          {socials.length > 0 && (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {socials.map((s, i) => (
                <span key={i} style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569', cursor: 'default' }}>{s.platform}</span>
              ))}
            </div>
          )}
        </div>
        <p style={{ fontSize: '12px', color: '#334155' }}>{copyright}</p>
      </div>
    </footer>
  )
}
