import express from 'express'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sitesRouter from './routes/sites.js'
import exportRouter from './routes/export.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// API routes
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
