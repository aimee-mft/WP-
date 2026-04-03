export default function GalleryBlock({ props }) {
  const { title = 'Gallery', images = [] } = props
  return (
    <section className="py-16 px-8 text-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {images.map((img, i) => (
          <div key={i} className="rounded-lg overflow-hidden bg-gray-100">
            <img
              src={img.src || `https://picsum.photos/seed/${i}/600/400`}
              alt={img.caption || ''}
              className="w-full h-52 object-cover"
            />
            {img.caption && <p className="py-2 text-sm text-gray-500">{img.caption}</p>}
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-3 text-gray-400 italic py-8">Add images in the properties panel →</div>
        )}
      </div>
    </section>
  )
}
