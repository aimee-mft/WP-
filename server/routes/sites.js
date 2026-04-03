import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '../db.js'
import { getTemplatePages } from '../templates.js'

const router = Router()

// List all sites
router.get('/', (req, res) => {
  const sites = db.prepare('SELECT id, name, settings, created_at, updated_at FROM sites ORDER BY updated_at DESC').all()
  res.json(sites.map(s => ({ ...s, settings: JSON.parse(s.settings) })))
})

// Get single site with pages
router.get('/:id', (req, res) => {
  const site = db.prepare('SELECT * FROM sites WHERE id = ?').get(req.params.id)
  if (!site) return res.status(404).json({ error: 'Site not found' })
  const pages = db.prepare('SELECT * FROM pages WHERE site_id = ? ORDER BY sort_order').all(req.params.id)
  res.json({
    ...site,
    settings: JSON.parse(site.settings),
    pages: pages.map(p => ({ ...p, blocks: JSON.parse(p.blocks) }))
  })
})

// Create site
router.post('/', (req, res) => {
  const { name = 'My Site', templateId = 'blank', settings = {} } = req.body
  const id = uuidv4()
  const now = new Date().toISOString()
  db.prepare('INSERT INTO sites (id, name, settings, created_at, updated_at) VALUES (?, ?, ?, ?, ?)').run(
    id, name, JSON.stringify({ primaryColor: '#2563eb', fontFamily: 'Inter', ...settings }), now, now
  )
  const templatePages = getTemplatePages(templateId)
  const insertPage = db.prepare('INSERT INTO pages (id, site_id, name, slug, blocks, sort_order) VALUES (?, ?, ?, ?, ?, ?)')
  templatePages.forEach((page, i) => {
    insertPage.run(uuidv4(), id, page.name, page.slug, JSON.stringify(page.blocks), i)
  })
  const site = db.prepare('SELECT * FROM sites WHERE id = ?').get(id)
  const pages = db.prepare('SELECT * FROM pages WHERE site_id = ? ORDER BY sort_order').all(id)
  res.status(201).json({
    ...site,
    settings: JSON.parse(site.settings),
    pages: pages.map(p => ({ ...p, blocks: JSON.parse(p.blocks) }))
  })
})

// Update site (name, settings, pages)
router.put('/:id', (req, res) => {
  const site = db.prepare('SELECT * FROM sites WHERE id = ?').get(req.params.id)
  if (!site) return res.status(404).json({ error: 'Site not found' })

  const { name, settings, pages } = req.body
  const now = new Date().toISOString()

  if (name !== undefined || settings !== undefined) {
    db.prepare('UPDATE sites SET name = ?, settings = ?, updated_at = ? WHERE id = ?').run(
      name ?? site.name,
      JSON.stringify(settings ?? JSON.parse(site.settings)),
      now,
      req.params.id
    )
  }

  if (Array.isArray(pages)) {
    // Sync pages
    const existingIds = db.prepare('SELECT id FROM pages WHERE site_id = ?').all(req.params.id).map(r => r.id)
    const incomingIds = pages.map(p => p.id)
    // Delete removed pages
    existingIds.filter(id => !incomingIds.includes(id)).forEach(id => {
      db.prepare('DELETE FROM pages WHERE id = ?').run(id)
    })
    // Upsert pages
    const upsert = db.prepare(`
      INSERT INTO pages (id, site_id, name, slug, blocks, sort_order) VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET name=excluded.name, slug=excluded.slug, blocks=excluded.blocks, sort_order=excluded.sort_order
    `)
    pages.forEach((page, i) => {
      upsert.run(page.id, req.params.id, page.name, page.slug, JSON.stringify(page.blocks), i)
    })
    db.prepare('UPDATE sites SET updated_at = ? WHERE id = ?').run(now, req.params.id)
  }

  const updated = db.prepare('SELECT * FROM sites WHERE id = ?').get(req.params.id)
  const updatedPages = db.prepare('SELECT * FROM pages WHERE site_id = ? ORDER BY sort_order').all(req.params.id)
  res.json({
    ...updated,
    settings: JSON.parse(updated.settings),
    pages: updatedPages.map(p => ({ ...p, blocks: JSON.parse(p.blocks) }))
  })
})

// Delete site
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM pages WHERE site_id = ?').run(req.params.id)
  db.prepare('DELETE FROM sites WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

export default router
