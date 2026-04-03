export default function TestimonialsBlock({ props }) {
  const { title = 'Testimonials', items = [] } = props
  return (
    <section className="py-16 px-8 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-8 shadow-sm text-left">
            <p className="text-gray-600 italic mb-4 leading-relaxed">"{item.quote}"</p>
            <div className="font-bold text-gray-900">{item.author}</div>
            <div className="text-sm text-gray-400">{item.role}</div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-2 text-gray-400 italic">Add testimonials in the properties panel →</div>
        )}
      </div>
    </section>
  )
}
