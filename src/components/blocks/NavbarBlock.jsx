export default function NavbarBlock({ props, settings }) {
  const { logo = 'My Site', links = [] } = props
  const primary = settings?.primaryColor || '#2563eb'
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <span className="text-xl font-bold" style={{ color: primary }}>{logo}</span>
      <div className="flex gap-6">
        {links.map((link, i) => (
          <span key={i} className="text-gray-600 font-medium cursor-default">{link.label}</span>
        ))}
      </div>
    </nav>
  )
}
