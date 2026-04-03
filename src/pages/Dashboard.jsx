import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

const TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Start from scratch with an empty canvas.',
    preview: '⬜',
    color: '#f3f4f6',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Navbar, Hero, Features, Testimonials, Contact & Footer.',
    preview: '🏢',
    color: '#dbeafe',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase your work with a gallery and contact form.',
    preview: '🎨',
    color: '#fce7f3',
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Convert visitors with a clean, focused design.',
    preview: '🚀',
    color: '#ede9fe',
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [siteName, setSiteName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('business')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    api.getSites().then(setSites).catch(console.error).finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (!siteName.trim()) return
    setCreating(true)
    try {
      const site = await api.createSite({ name: siteName.trim(), templateId: selectedTemplate })
      navigate(`/builder/${site.id}`)
    } catch (e) {
      alert('Failed to create site: ' + e.message)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.deleteSite(id)
      setSites(s => s.filter(x => x.id !== id))
    } catch (e) {
      alert('Failed to delete site')
    }
    setDeleteConfirm(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">W</div>
          <h1 className="text-xl font-bold text-gray-900">WebCraft CMS</h1>
        </div>
        <button
          onClick={() => { setShowModal(true); setSiteName(''); setSelectedTemplate('business') }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
        >
          + New Site
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Sites</h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sites.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌐</div>
            <p className="text-gray-500 text-lg mb-6">You don't have any sites yet.</p>
            <button
              onClick={() => { setShowModal(true); setSiteName(''); setSelectedTemplate('business') }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create Your First Site
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map(site => (
              <div key={site.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <span className="text-4xl">🌐</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{site.name}</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Updated {new Date(site.updated_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/builder/${site.id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <a
                      href={api.previewUrl(site.id)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-semibold text-center transition-colors"
                    >
                      Preview
                    </a>
                    <button
                      onClick={() => setDeleteConfirm(site.id)}
                      className="w-10 border border-red-100 hover:bg-red-50 text-red-400 hover:text-red-600 py-2 rounded-lg text-sm transition-colors"
                      title="Delete site"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Site Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Create a New Site</h2>
            </div>
            <div className="px-8 py-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                placeholder="My Awesome Site"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                autoFocus
              />
              <label className="block text-sm font-semibold text-gray-700 mb-3">Choose a Template</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${selectedTemplate === t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <div className="text-3xl mb-2">{t.preview}</div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400 mt-1 leading-snug">{t.description}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="px-8 py-5 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!siteName.trim() || creating}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
              >
                {creating ? 'Creating…' : 'Create Site'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-8 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete this site?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
