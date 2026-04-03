import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const ADMIN_EMAIL = 'aimee.tyrrell@gmail.com'

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }
  const trimmedEmail = email.toLowerCase().trim()
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(trimmedEmail)
  if (existing) {
    return res.status(409).json({ error: 'An account with that email already exists' })
  }
  const hash = await bcrypt.hash(password, 12)
  const id = uuidv4()
  const isAdmin = trimmedEmail === ADMIN_EMAIL ? 1 : 0
  db.prepare(
    'INSERT INTO users (id, email, password, is_admin, created_at) VALUES (?, ?, ?, ?, ?)'
  ).run(id, trimmedEmail, hash, isAdmin, new Date().toISOString())

  req.session.userId = id
  req.session.save(err => {
    if (err) return res.status(500).json({ error: 'Session error' })
    res.status(201).json({ id, email: trimmedEmail, is_admin: isAdmin })
  })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }
  const trimmedEmail = email.toLowerCase().trim()
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(trimmedEmail)
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  // Ensure admin email always has is_admin = 1 (in case it was set before admin flag existed)
  if (trimmedEmail === ADMIN_EMAIL && !user.is_admin) {
    db.prepare('UPDATE users SET is_admin = 1 WHERE id = ?').run(user.id)
    user.is_admin = 1
  }

  req.session.userId = user.id
  req.session.save(err => {
    if (err) return res.status(500).json({ error: 'Session error' })
    res.json({ id: user.id, email: user.email, is_admin: user.is_admin })
  })
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('sid')
    if (err) return res.status(500).json({ error: 'Logout failed' })
    res.json({ ok: true })
  })
})

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, is_admin: req.user.is_admin })
})

export default router
