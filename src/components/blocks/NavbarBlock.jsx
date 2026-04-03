export default function NavbarBlock({ props, settings }) {
  const { logo = 'My Site', links = [] } = props
  const primary = settings?.primaryColor || '#0f172a'
  return (
    <nav className="flex items-center justify-between bg-white" style={{ padding: '20px 48px', borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', color: primary }}>{logo}</span>
      <div style={{ display: 'flex', gap: '32px' }}>
        {links.map((link, i) => (
          <span key={i} style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', cursor: 'default', letterSpacing: '0.01em' }}>{link.label}</span>
        ))}
      </div>
    </nav>
  )
}
