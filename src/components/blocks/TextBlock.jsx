export default function TextBlock({ props, settings }) {
  const { heading = '', content = 'Write your story here.', align = 'left' } = props
  const textAlign = align === 'center' ? 'center' : align === 'right' ? 'right' : 'left'
  const marginInline = align === 'center' ? 'auto' : align === 'right' ? '0 0 0 auto' : '0'

  return (
    <section style={{ background: '#fff', padding: '80px 48px' }}>
      <div style={{ maxWidth: '760px', margin: marginInline, textAlign }}>
        {heading && (
          <h2 style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: '24px', lineHeight: 1.15 }}>
            {heading}
          </h2>
        )}
        <p style={{ fontSize: '17px', lineHeight: 1.85, color: '#475569' }}>{content}</p>
      </div>
    </section>
  )
}
