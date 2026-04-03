export default function GalleryBlock({ props, settings }) {
  const { title = 'Gallery', images = [] } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <section className="bg-white" style={{ padding: '96px 48px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: primary }}>Portfolio</p>
            <h2 className="font-black text-gray-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>{title}</h2>
          </div>
        </div>
        {images.length === 0 ? (
          <p className="text-gray-400 italic">Add images in the properties panel →</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {images.map((img, i) => (
              <div key={i} className="group relative overflow-hidden bg-gray-100" style={{ aspectRatio: i % 3 === 0 ? '4/5' : '4/3' }}>
                <img
                  src={img.src || `https://picsum.photos/seed/${i + 10}/800/600`}
                  alt={img.caption || ''}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
