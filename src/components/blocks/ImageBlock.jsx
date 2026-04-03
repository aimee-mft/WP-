export default function ImageBlock({ props }) {
  const { src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80&auto=format', caption = '', alt = '' } = props
  return (
    <section style={{ lineHeight: 0 }}>
      <img
        src={src}
        alt={alt || caption}
        style={{ width: '100%', display: 'block', maxHeight: '520px', objectFit: 'cover' }}
      />
      {caption && (
        <p style={{ background: '#fff', padding: '12px 48px', fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, textAlign: 'center' }}>{caption}</p>
      )}
    </section>
  )
}
