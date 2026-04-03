export default function GalleryBlock({ props, settings }) {
  const { title = 'Our Work', images = [] } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <section style={{ background: '#fff', padding: '96px 48px' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: primary, marginBottom: '16px' }}>Portfolio</p>
        <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a', marginBottom: '48px', lineHeight: 1.1 }}>{title}</h2>

        {images.length === 0 ? (
          <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Add images in the properties panel →</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {images.map((img, i) => (
              <div key={i} style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#f1f5f9',
                aspectRatio: i % 5 === 0 ? '3/4' : '4/3',
              }}>
                <img
                  src={img.src || `https://picsum.photos/seed/${i + 20}/800/600`}
                  alt={img.caption || ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {img.caption && (
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
                    <p style={{ color: '#fff', fontSize: '13px', fontWeight: 500, margin: 0 }}>{img.caption}</p>
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
