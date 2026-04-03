import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

const TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Start from scratch.',
    emoji: '⬜',
    gradient: 'from-slate-100 to-slate-200',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Hero, features, testimonials & contact.',
    emoji: '🏢',
    gradient: 'from-blue-100 to-indigo-200',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Gallery, about & contact form.',
    emoji: '🎨',
    gradient: 'from-pink-100 to-rose-200',
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Focused single-page conversion.',
    emoji: '🚀',
    gradient: 'from-violet-100 to-purple-200',
  },
]

const CARD_GRADIENTS = [
  'from-blue-400 to-indigo-500',
  'from-violet-400 to-purple-500',
  'from-pink-400 to-rose-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-cyan-400 to-sky-500',
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-0 flex items-center justify-between h-16 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">W</div>
          <div>
            <span className="text-base font-bold text-slate-900 tracking-tight">WebCraft</span>
            <span className="ml-1.5 text-xs font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">CMS</span>
          </div>
        </div>
        <button
          onClick={() => { setShowModal(true); setSiteName(''); setSelectedTemplate('business') }}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span className="text-lg leading-none">+</span> New Site
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Sites</h2>
            {!loading && sites.length > 0 && (
              <p className="text-sm text-slate-500 mt-0.5">{sites.length} site{sites.length !== 1 ? 's' : ''}</p>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sites.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🌐</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">No sites yet</h3>
            <p className="text-slate-500 text-sm mb-6">Create your first site to get started.</p>
            <button
              onClick={() => { setShowModal(true); setSiteName(''); setSelectedTemplate('business') }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm"
            >
              Create Your First Site
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sites.map((site, i) => (
              <div key={site.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
                <div className={`h-36 bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} flex items-end p-4`}>
                  <span className="text-white text-lg font-bold drop-shadow">{site.name}</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-400 mb-4">
                    Updated {new Date(site.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                      className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-sm font-semibold text-center transition-colors"
                    >
                      Preview
                    </a>
                    <button
                      onClick={() => setDeleteConfirm(site.id)}
                      className="w-9 border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-500 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                      title="Delete site"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="px-7 pt-7 pb-5">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Create a New Site</h2>
              <p className="text-sm text-slate-500">Pick a template and give your site a name.</p>
            </div>
            <div className="px-7 pb-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all ${selectedTemplate === t.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-100 hover:border-slate-300 bg-slate-50'}`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xl mb-2.5`}>{t.emoji}</div>
                    <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-snug">{t.description}</div>
                  </button>
                ))}
              </div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                placeholder="e.g. My Photography Portfolio"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <div className="px-7 py-4 border-t border-slate-100 flex gap-2.5 justify-end bg-slate-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!siteName.trim() || creating}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-sm"
              >
                {creating ? 'Creating…' : 'Create Site →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-7 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Delete this site?</h3>
            <p className="text-slate-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
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
