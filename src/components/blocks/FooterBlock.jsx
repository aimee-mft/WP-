export default function FooterBlock({ props, settings }) {
  const { copyright = '© 2025', links = [], socials = [] } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <footer style={{ background: '#111', color: '#888', padding: '64px 48px 40px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-10 mb-10" style={{ borderBottom: '1px solid #222' }}>
          {links.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {links.map((l, i) => (
                <span key={i} className="text-sm cursor-default hover:text-white transition-colors" style={{ color: '#666' }}>{l.label}</span>
              ))}
            </div>
          )}
          {socials.length > 0 && (
            <div className="flex gap-5">
              {socials.map((s, i) => (
                <span key={i} className="text-xs font-bold tracking-widest uppercase cursor-default hover:text-white transition-colors" style={{ color: '#555', letterSpacing: '0.1em' }}>{s.platform}</span>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs" style={{ color: '#444' }}>{copyright}</p>
      </div>
    </footer>
  )
}
