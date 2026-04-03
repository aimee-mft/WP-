export default function FeaturesBlock({ props }) {
  const { title = 'Features', items = [] } = props
  return (
    <section className="py-16 px-8 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-8 shadow-sm text-left">
            <div className="text-4xl mb-4">{item.icon || '✨'}</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
            <p className="text-gray-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-3 text-gray-400 italic">Add feature items in the properties panel →</div>
        )}
      </div>
    </section>
  )
}
