export default function ContactBlock({ props, settings }) {
  const { title = 'Get In Touch', subtitle = "We'd love to hear from you.", email = '' } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <section style={{ background: '#fff', padding: '96px 48px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
        {/* Left */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: primary, marginBottom: '16px' }}>Contact</p>
          <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: '20px', lineHeight: 1.1 }}>{title}</h2>
          {subtitle && <p style={{ fontSize: '16px', lineHeight: 1.75, color: '#64748b' }}>{subtitle}</p>}
          {email && (
            <p style={{ marginTop: '32px', fontSize: '14px', color: '#94a3b8' }}>
              Or reach us directly at <span style={{ fontWeight: 600, color: '#334155' }}>{email}</span>
            </p>
          )}
        </div>

        {/* Right: form */}
        <form style={{ display: 'flex', flexDirection: 'column', gap: '0' }} onSubmit={e => e.preventDefault()}>
          {['Your Name', 'Email Address'].map((placeholder, i) => (
            <input
              key={i}
              type={i === 1 ? 'email' : 'text'}
              placeholder={placeholder}
              style={{
                width: '100%', padding: '16px 0', background: 'transparent',
                border: 'none', borderBottom: '1px solid #e2e8f0',
                fontSize: '15px', color: '#0f172a', outline: 'none',
                marginBottom: '8px',
              }}
            />
          ))}
          <textarea
            rows={4}
            placeholder="Your Message"
            style={{
              width: '100%', padding: '16px 0', background: 'transparent',
              border: 'none', borderBottom: '1px solid #e2e8f0',
              fontSize: '15px', color: '#0f172a', outline: 'none',
              resize: 'none', marginBottom: '32px',
            }}
          />
          <button
            type="button"
            style={{
              alignSelf: 'flex-start',
              padding: '14px 32px', background: primary, color: '#fff',
              border: 'none', fontSize: '13px', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'default', borderRadius: '3px',
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
