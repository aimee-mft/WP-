export default function ContactBlock({ props, settings }) {
  const { title = 'Contact Us', subtitle = '', email = '' } = props
  const primary = settings?.primaryColor || '#2563eb'

  return (
    <section className="bg-white" style={{ padding: '96px 48px' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: primary }}>Say Hello</p>
          <h2 className="font-black text-gray-900 leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>{title}</h2>
          {subtitle && <p className="text-gray-500 leading-relaxed text-base">{subtitle}</p>}
          {email && (
            <p className="mt-8 text-sm text-gray-400">
              Or email us at <span className="font-semibold text-gray-700">{email}</span>
            </p>
          )}
        </div>

        {/* Right: form */}
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-0 py-3 border-0 border-b border-gray-200 text-sm bg-transparent focus:outline-none focus:border-gray-900 transition-colors"
            style={{ borderRadius: 0 }}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-0 py-3 border-0 border-b border-gray-200 text-sm bg-transparent focus:outline-none focus:border-gray-900 transition-colors"
            style={{ borderRadius: 0 }}
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="w-full px-0 py-3 border-0 border-b border-gray-200 text-sm bg-transparent focus:outline-none focus:border-gray-900 transition-colors resize-none"
            style={{ borderRadius: 0 }}
          />
          <div className="pt-2">
            <button
              type="button"
              className="px-8 py-3 text-sm font-semibold tracking-widest uppercase text-white transition-opacity hover:opacity-90"
              style={{ background: primary, borderRadius: '2px', letterSpacing: '0.1em' }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
