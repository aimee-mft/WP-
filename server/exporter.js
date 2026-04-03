function renderBlock(block, settings) {
  const primary = settings.primaryColor || '#2563eb'
  const font = settings.fontFamily || 'Inter'

  switch (block.type) {
    case 'navbar': {
      const { logo = 'My Site', links = [] } = block.props
      return `
      <nav style="background:#fff;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.1);position:sticky;top:0;z-index:100;">
        <div style="font-size:20px;font-weight:700;color:${primary}">${escHtml(logo)}</div>
        <div style="display:flex;gap:24px;">
          ${links.map(l => `<a href="${escAttr(l.href)}" style="text-decoration:none;color:#374151;font-weight:500;">${escHtml(l.label)}</a>`).join('')}
        </div>
      </nav>`
    }
    case 'hero': {
      const { headline = 'Welcome', subheadline = '', ctaText = 'Get Started', ctaLink = '#', backgroundColor = primary, textColor = '#fff' } = block.props
      return `
      <section style="background:${escAttr(backgroundColor)};color:${escAttr(textColor)};padding:80px 32px;text-align:center;">
        <h1 style="font-size:48px;font-weight:800;margin-bottom:16px;color:${escAttr(textColor)}">${escHtml(headline)}</h1>
        <p style="font-size:20px;margin-bottom:32px;opacity:0.9;max-width:640px;margin-left:auto;margin-right:auto;">${escHtml(subheadline)}</p>
        <a href="${escAttr(ctaLink)}" style="display:inline-block;background:#fff;color:${escAttr(backgroundColor)};padding:14px 28px;border-radius:8px;font-weight:700;text-decoration:none;font-size:16px;">${escHtml(ctaText)}</a>
      </section>`
    }
    case 'features': {
      const { title = 'Features', items = [] } = block.props
      return `
      <section style="padding:64px 32px;background:#f9fafb;text-align:center;">
        <h2 style="font-size:32px;font-weight:700;margin-bottom:48px;color:#111827">${escHtml(title)}</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:32px;max-width:960px;margin:0 auto;">
          ${items.map(item => `
            <div style="background:#fff;padding:32px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <div style="font-size:40px;margin-bottom:16px;">${item.icon || '✨'}</div>
              <h3 style="font-size:18px;font-weight:700;margin-bottom:8px;color:#111827">${escHtml(item.title || '')}</h3>
              <p style="color:#6b7280;line-height:1.6;">${escHtml(item.description || '')}</p>
            </div>`).join('')}
        </div>
      </section>`
    }
    case 'gallery': {
      const { title = 'Gallery', images = [] } = block.props
      return `
      <section style="padding:64px 32px;text-align:center;">
        <h2 style="font-size:32px;font-weight:700;margin-bottom:48px;color:#111827">${escHtml(title)}</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;max-width:1024px;margin:0 auto;">
          ${images.map(img => `
            <div style="border-radius:8px;overflow:hidden;">
              <img src="${escAttr(img.src || '')}" alt="${escAttr(img.caption || '')}" style="width:100%;height:220px;object-fit:cover;display:block;" />
              ${img.caption ? `<p style="padding:8px;text-align:center;color:#6b7280;font-size:14px;">${escHtml(img.caption)}</p>` : ''}
            </div>`).join('')}
        </div>
      </section>`
    }
    case 'testimonials': {
      const { title = 'Testimonials', items = [] } = block.props
      return `
      <section style="padding:64px 32px;background:#f9fafb;text-align:center;">
        <h2 style="font-size:32px;font-weight:700;margin-bottom:48px;color:#111827">${escHtml(title)}</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:900px;margin:0 auto;">
          ${items.map(item => `
            <div style="background:#fff;padding:32px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);text-align:left;">
              <p style="font-size:16px;color:#374151;font-style:italic;margin-bottom:16px;line-height:1.6;">"${escHtml(item.quote || '')}"</p>
              <div style="font-weight:700;color:#111827">${escHtml(item.author || '')}</div>
              <div style="color:#6b7280;font-size:14px;">${escHtml(item.role || '')}</div>
            </div>`).join('')}
        </div>
      </section>`
    }
    case 'text': {
      const { heading = '', content = '', align = 'left' } = block.props
      return `
      <section style="padding:64px 32px;text-align:${escAttr(align)};max-width:800px;margin:0 auto;">
        ${heading ? `<h2 style="font-size:32px;font-weight:700;margin-bottom:16px;color:#111827">${escHtml(heading)}</h2>` : ''}
        <p style="color:#4b5563;line-height:1.8;font-size:17px;">${escHtml(content)}</p>
      </section>`
    }
    case 'image': {
      const { src = '', caption = '', alt = '' } = block.props
      return `
      <section style="padding:32px;text-align:center;">
        <img src="${escAttr(src)}" alt="${escAttr(alt || caption)}" style="max-width:100%;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1);" />
        ${caption ? `<p style="margin-top:8px;color:#6b7280;font-size:14px;">${escHtml(caption)}</p>` : ''}
      </section>`
    }
    case 'contact': {
      const { title = 'Contact Us', subtitle = '', email = '' } = block.props
      return `
      <section id="contact" style="padding:64px 32px;text-align:center;">
        <h2 style="font-size:32px;font-weight:700;margin-bottom:12px;color:#111827">${escHtml(title)}</h2>
        ${subtitle ? `<p style="color:#6b7280;margin-bottom:32px;max-width:480px;margin-left:auto;margin-right:auto;">${escHtml(subtitle)}</p>` : ''}
        <form style="max-width:480px;margin:0 auto;display:flex;flex-direction:column;gap:16px;" action="mailto:${escAttr(email)}" method="post" enctype="text/plain">
          <input type="text" name="name" placeholder="Your Name" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;" />
          <input type="email" name="email" placeholder="Your Email" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;" />
          <textarea name="message" rows="4" placeholder="Your Message" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;resize:vertical;"></textarea>
          <button type="submit" style="background:${escAttr(primary)};color:#fff;padding:14px;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;">Send Message</button>
        </form>
      </section>`
    }
    case 'footer': {
      const { copyright = '© 2025', links = [], socials = [] } = block.props
      return `
      <footer style="background:#111827;color:#9ca3af;padding:40px 32px;text-align:center;">
        ${links.length > 0 ? `<div style="display:flex;justify-content:center;gap:24px;margin-bottom:16px;">${links.map(l => `<a href="${escAttr(l.href)}" style="color:#9ca3af;text-decoration:none;">${escHtml(l.label)}</a>`).join('')}</div>` : ''}
        ${socials.length > 0 ? `<div style="display:flex;justify-content:center;gap:16px;margin-bottom:16px;">${socials.map(s => `<a href="${escAttr(s.url)}" style="color:#9ca3af;text-decoration:none;">${escHtml(s.platform)}</a>`).join('')}</div>` : ''}
        <p style="font-size:14px;">${escHtml(copyright)}</p>
      </footer>`
    }
    default:
      return ''
  }
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function escAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

export function renderSiteHTML(site) {
  const page = site.pages?.[0]
  if (!page) return '<html><body><p>No pages found.</p></body></html>'
  const { settings = {} } = site
  const font = settings.fontFamily || 'Inter'
  const blocksHTML = page.blocks.map(b => renderBlock(b, settings)).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(site.name)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: '${escHtml(font)}', system-ui, sans-serif; color: #374151; line-height: 1.5; }
    img { max-width: 100%; height: auto; }
    @media (max-width: 640px) {
      h1 { font-size: 32px !important; }
      h2 { font-size: 24px !important; }
      section, nav, footer { padding-left: 16px !important; padding-right: 16px !important; }
    }
  </style>
</head>
<body>
${blocksHTML}
</body>
</html>`
}
