export default function NavbarBlock({ props, settings }) {
  const { logo = 'My Site', links = [] } = props
  const primary = settings?.primaryColor || '#2563eb'
  return (
    <nav style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }} className="flex items-center justify-between px-10 py-5 bg-white">
      <span className="text-xl font-bold tracking-tight" style={{ color: primary }}>{logo}</span>
      <div className="flex gap-8">
        {links.map((link, i) => (
          <span key={i} className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-default tracking-wide">{link.label}</span>
        ))}
      </div>
    </nav>
  )
}
