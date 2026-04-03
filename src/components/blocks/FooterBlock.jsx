export default function FooterBlock({ props }) {
  const { copyright = '© 2025', links = [], socials = [] } = props
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-8 text-center">
      {links.length > 0 && (
        <div className="flex justify-center gap-6 mb-4">
          {links.map((l, i) => (
            <span key={i} className="cursor-default hover:text-white transition-colors">{l.label}</span>
          ))}
        </div>
      )}
      {socials.length > 0 && (
        <div className="flex justify-center gap-4 mb-4">
          {socials.map((s, i) => (
            <span key={i} className="cursor-default hover:text-white transition-colors text-sm">{s.platform}</span>
          ))}
        </div>
      )}
      <p className="text-sm">{copyright}</p>
    </footer>
  )
}
