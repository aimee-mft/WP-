export default function TestimonialsBlock({ props, settings }) {
  const { title = 'Testimonials', items = [] } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <section style={{ padding: '96px 48px', background: '#f8f8f6' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: primary }}>Reviews</p>
          <h2 className="font-black text-gray-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>{title}</h2>
        </div>
        {items.length === 0 ? (
          <p className="text-gray-400 italic">Add testimonials in the properties panel →</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div key={i} className="bg-white p-10 flex flex-col justify-between" style={{ borderRadius: '2px' }}>
                <p className="text-gray-700 text-lg leading-relaxed mb-8" style={{ fontStyle: 'italic' }}>"{item.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-none" style={{ background: primary }}>
                    {(item.author || 'A').charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{item.author}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{item.role}</div>
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
