export default function FeaturesBlock({ props, settings }) {
  const { title = 'Features', items = [] } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <section className="bg-white" style={{ padding: '96px 48px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: primary }}>What We Offer</p>
          <h2 className="font-black text-gray-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>{title}</h2>
        </div>
        {items.length === 0 ? (
          <p className="text-gray-400 italic">Add feature items in the properties panel →</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            {items.map((item, i) => (
              <div key={i} className="bg-white p-10">
                <div className="text-4xl mb-6">{item.icon || '✨'}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
