import { Router } from 'express'
import JSZip from 'jszip'
import db from '../db.js'
import { renderSiteHTML } from '../exporter.js'

const router = Router()

// Preview - serves rendered HTML directly
router.get('/:id/preview', (req, res) => {
  const site = db.prepare('SELECT * FROM sites WHERE id = ?').get(req.params.id)
  if (!site) return res.status(404).send('Site not found')
  const pages = db.prepare('SELECT * FROM pages WHERE site_id = ? ORDER BY sort_order').all(req.params.id)
  const parsed = {
    ...site,
    settings: JSON.parse(site.settings),
    pages: pages.map(p => ({ ...p, blocks: JSON.parse(p.blocks) }))
  }
  const html = renderSiteHTML(parsed)
  res.setHeader('Content-Type', 'text/html')
  res.send(html)
})

// Export - sends a zip file
router.get('/:id/export', async (req, res) => {
  const site = db.prepare('SELECT * FROM sites WHERE id = ?').get(req.params.id)
  if (!site) return res.status(404).json({ error: 'Not found' })
  const pages = db.prepare('SELECT * FROM pages WHERE site_id = ? ORDER BY sort_order').all(req.params.id)
  const parsed = {
    ...site,
    settings: JSON.parse(site.settings),
    pages: pages.map(p => ({ ...p, blocks: JSON.parse(p.blocks) }))
  }

  const zip = new JSZip()
  const html = renderSiteHTML(parsed)
  zip.file('index.html', html)

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })
  const safeName = site.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-Disposition', `attachment; filename="${safeName}.zip"`)
  res.send(zipBuffer)
})

export default router
