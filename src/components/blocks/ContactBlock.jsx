export default function ContactBlock({ props, settings }) {
  const { title = 'Contact Us', subtitle = '', email = '' } = props
  const primary = settings?.primaryColor || '#2563eb'
  return (
    <section className="py-16 px-8 text-center">
      <h2 className="text-3xl font-bold mb-3 text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-500 mb-8 max-w-md mx-auto">{subtitle}</p>}
      <form className="max-w-md mx-auto flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2" />
        <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2" />
        <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 resize-none" />
        <button
          type="button"
          className="py-3 rounded-lg font-semibold text-white text-base"
          style={{ background: primary }}
        >Send Message</button>
      </form>
    </section>
  )
}
