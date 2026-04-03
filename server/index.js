import express from 'express'
import cors from 'cors'
import session from 'express-session'
import connectSqlite3 from 'connect-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sitesRouter from './routes/sites.js'
import exportRouter from './routes/export.js'
import authRouter from './routes/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const isProd = process.env.NODE_ENV === 'production'

const SQLiteStore = connectSqlite3(session)

// CORS — in dev, Vite proxy makes requests same-origin, but set explicitly for safety
app.use(cors({
  origin: isProd ? false : 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))

app.use(session({
  store: new SQLiteStore({
    dir: join(__dirname, '..', 'data'),
    db: 'sessions.db',
    table: 'sessions',
  }),
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'dev-secret-change-in-prod',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
}))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/sites', sitesRouter)
app.use('/api/sites', exportRouter)

// Serve built frontend (production)
const distPath = join(__dirname, '..', 'dist')
app.use(express.static(distPath))
app.get(/(.*)/, (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' })
  res.sendFile(join(distPath, 'index.html'), err => {
    if (err) res.status(200).send('Run `npm run build` to serve the frontend, or use `npm run dev` for development.')
  })
})

app.listen(PORT, () => {
  console.log(`CMS server running at http://localhost:${PORT}`)
})
