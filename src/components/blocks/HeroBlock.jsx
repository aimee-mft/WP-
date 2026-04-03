export default function HeroBlock({ props, settings }) {
  const {
    headline = 'Welcome to My Site',
    subheadline = 'A great tagline that explains what you do.',
    ctaText = 'Get Started',
    backgroundColor = settings?.primaryColor || '#1a1a2e',
    textColor = '#ffffff',
  } = props

  return (
    <section
      className="relative flex flex-col justify-end"
      style={{
        background: backgroundColor,
        color: textColor,
        minHeight: '82vh',
        padding: '0',
      }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />

      <div className="relative px-12 pb-16 pt-24 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
        {/* Left: headline */}
        <div className="flex-1 max-w-2xl">
          <h1
            className="font-black leading-none mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: textColor, letterSpacing: '-0.03em' }}
          >
            {headline}
          </h1>
          <p
            className="leading-relaxed opacity-80 max-w-lg"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: textColor }}
          >
            {subheadline}
          </p>
        </div>

        {/* Right: CTA */}
        <div className="flex-none">
          <button
            className="px-8 py-4 font-semibold text-sm tracking-widest uppercase transition-all"
            style={{
              background: 'transparent',
              color: textColor,
              border: `2px solid ${textColor}`,
              borderRadius: '2px',
              letterSpacing: '0.12em',
            }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  )
}
