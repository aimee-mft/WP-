export default function HeroBlock({ props, settings }) {
  const {
    headline = 'Build Something Beautiful.',
    subheadline = 'A platform designed to help you create, launch, and grow your presence online.',
    ctaText = 'Get Started',
    backgroundColor = '#0f172a',
    textColor = '#ffffff',
    backgroundImage = '',
  } = props

  return (
    <section
      style={{
        background: backgroundImage
          ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${backgroundImage}) center/cover no-repeat`
          : backgroundColor,
        color: textColor,
        minHeight: '560px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0',
        position: 'relative',
      }}
    >
      <div style={{ padding: '72px 48px 64px', maxWidth: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '620px' }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: textColor,
            margin: 0,
          }}>{headline}</h1>
          <p style={{
            fontSize: '18px',
            lineHeight: 1.7,
            color: textColor,
            opacity: 0.8,
            margin: 0,
            maxWidth: '500px',
          }}>{subheadline}</p>
          <div>
            <button style={{
              marginTop: '8px',
              padding: '14px 32px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: textColor,
              background: 'transparent',
              border: `2px solid ${textColor}`,
              borderRadius: '3px',
              cursor: 'default',
              display: 'inline-block',
            }}>{ctaText}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
