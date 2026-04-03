export default function HeroBlock({ props, settings }) {
  const {
    headline = 'Welcome to My Site',
    subheadline = 'A great place to start.',
    ctaText = 'Get Started',
    backgroundColor = settings?.primaryColor || '#2563eb',
    textColor = '#ffffff',
  } = props

  return (
    <section className="py-20 px-8 text-center" style={{ background: backgroundColor, color: textColor }}>
      <h1 className="text-5xl font-extrabold mb-4 leading-tight" style={{ color: textColor }}>{headline}</h1>
      <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{subheadline}</p>
      <button
        className="px-7 py-3 rounded-lg font-bold text-base"
        style={{ background: '#fff', color: backgroundColor }}
      >{ctaText}</button>
    </section>
  )
}
