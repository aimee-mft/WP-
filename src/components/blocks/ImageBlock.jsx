export default function ImageBlock({ props }) {
  const { src = 'https://picsum.photos/seed/img/1200/500', caption = '', alt = '' } = props
  return (
    <section className="py-8 px-8 text-center">
      <img
        src={src}
        alt={alt || caption}
        className="max-w-full rounded-lg shadow-md mx-auto"
        style={{ maxHeight: '500px', objectFit: 'cover' }}
      />
      {caption && <p className="mt-3 text-sm text-gray-500">{caption}</p>}
    </section>
  )
}
