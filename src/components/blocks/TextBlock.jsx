export default function TextBlock({ props, settings }) {
  const { heading = '', content = 'Your text here...', align = 'left' } = props
  const primary = settings?.primaryColor || '#2563eb'
  const alignClass = align === 'center' ? 'text-center mx-auto' : align === 'right' ? 'text-right ml-auto' : ''

  return (
    <section className="bg-white" style={{ padding: '80px 48px' }}>
      <div className={`max-w-3xl ${alignClass}`}>
        {heading && (
          <h2 className="font-black text-gray-900 mb-6 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}>{heading}</h2>
        )}
        <p className="text-gray-600 leading-loose" style={{ fontSize: '1.1rem' }}>{content}</p>
      </div>
    </section>
  )
}
