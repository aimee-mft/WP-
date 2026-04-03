export default function ImageBlock({ props }) {
  const { src = 'https://picsum.photos/seed/img/1400/600', caption = '', alt = '' } = props
  return (
    <section className="bg-white" style={{ padding: '0' }}>
      <div className="overflow-hidden" style={{ maxHeight: '70vh' }}>
        <img
          src={src}
          alt={alt || caption}
          className="w-full object-cover"
          style={{ display: 'block', maxHeight: '70vh' }}
        />
      </div>
      {caption && (
        <p className="text-center text-sm text-gray-400 py-4 px-8">{caption}</p>
      )}
    </section>
  )
}
