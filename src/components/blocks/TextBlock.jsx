export default function TextBlock({ props }) {
  const { heading = '', content = 'Your text here...', align = 'left' } = props
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
  return (
    <section className={`py-16 px-8 max-w-3xl mx-auto ${alignClass}`}>
      {heading && <h2 className="text-3xl font-bold mb-4 text-gray-900">{heading}</h2>}
      <p className="text-gray-600 leading-relaxed text-lg">{content}</p>
    </section>
  )
}
