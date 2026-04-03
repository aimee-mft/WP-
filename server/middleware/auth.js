import db from '../db.js'

export function requireAuth(req, res, next) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  const user = db.prepare('SELECT id, email, is_admin FROM users WHERE id = ?').get(req.session.userId)
  if (!user) {
    req.session.destroy(() => {})
    return res.status(401).json({ error: 'Session invalid' })
  }
  req.user = user
  next()
}

export function requireSiteOwnership(req, res, next) {
  // Must run after requireAuth so req.user is populated
  const site = db.prepare('SELECT id, user_id FROM sites WHERE id = ?').get(req.params.id)
  if (!site) return res.status(404).json({ error: 'Site not found' })
  // Admin can access all sites (including NULL user_id legacy sites)
  if (req.user.is_admin) return next()
  // Regular users: must own the site; NULL user_id = admin-only
  if (!site.user_id || site.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
