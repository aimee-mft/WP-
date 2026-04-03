import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

const TEMPLATES = [
  { id: 'blank',     name: 'Blank',        description: 'Start from scratch',               color: '#E8EAED', textColor: '#5F6368' },
  { id: 'business',  name: 'Business',     description: 'Hero, features & contact',          color: '#D2E3FC', textColor: '#1A73E8' },
  { id: 'portfolio', name: 'Portfolio',    description: 'Gallery, about & contact form',      color: '#FCE8E6', textColor: '#D93025' },
  { id: 'landing',   name: 'Landing Page', description: 'Focused single-page conversion',    color: '#E6F4EA', textColor: '#137333' },
]

const CARD_COLORS = [
  { bg: '#D2E3FC', text: '#1A73E8' },
  { bg: '#E6F4EA', text: '#137333' },
  { bg: '#FCE8E6', text: '#D93025' },
  { bg: '#FEF7E0', text: '#E37400' },
  { bg: '#F3E8FD', text: '#7B1FA2' },
  { bg: '#E8F0FE', text: '#1967D2' },
]

// Icon: trash
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
)

// Icon: eye
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)

// Icon: pencil
const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

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
    <div style={{ minHeight: '100vh', background: 'var(--md-background)' }}>

      {/* MD3 Top App Bar */}
      <header style={{
        background: 'var(--md-surface)',
        borderBottom: '1px solid var(--md-outline)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Logo mark */}
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'var(--md-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '15px',
          }}>W</div>
          <span style={{ fontSize: '20px', fontWeight: 500, color: 'var(--md-on-surface)', letterSpacing: '0.005em' }}>
            WebCraft
          </span>
          <span style={{
            fontSize: '12px', fontWeight: 500, color: 'var(--md-primary)',
            background: 'var(--md-primary-container)',
            padding: '2px 10px', borderRadius: '12px', letterSpacing: '0.02em',
          }}>CMS</span>
        </div>

        {/* Filled button — MD3 pill */}
        <button
          onClick={() => { setShowModal(true); setSiteName(''); setSelectedTemplate('business') }}
          style={{
            background: 'var(--md-primary)', color: 'var(--md-on-primary)',
            border: 'none', borderRadius: 'var(--md-radius-pill)',
            padding: '0 24px', height: '36px',
            fontSize: '14px', fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'inherit', letterSpacing: '0.01em',
            transition: 'box-shadow 0.15s, filter 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'none'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Site
        </button>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Section header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 400, color: 'var(--md-on-surface)', letterSpacing: '0.005em' }}>
            My Sites
          </h1>
          {!loading && sites.length > 0 && (
            <p style={{ fontSize: '14px', color: 'var(--md-on-surface-variant)', marginTop: '4px' }}>
              {sites.length} site{sites.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '96px 0' }}>
            <div style={{
              width: '32px', height: '32px', border: '3px solid var(--md-primary-container)',
              borderTopColor: 'var(--md-primary)', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>

        ) : sites.length === 0 ? (
          /* Empty state */
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: 'var(--md-surface)', borderRadius: 'var(--md-radius-md)',
            boxShadow: 'var(--md-shadow-card)',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'var(--md-primary-container)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: '28px',
            }}>🌐</div>
            <h2 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--md-on-surface)', marginBottom: '8px' }}>
              No sites yet
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--md-on-surface-variant)', marginBottom: '28px' }}>
              Create your first site to get started.
            </p>
            <button
              onClick={() => { setShowModal(true); setSiteName(''); setSelectedTemplate('business') }}
              style={{
                background: 'var(--md-primary)', color: '#fff',
                border: 'none', borderRadius: 'var(--md-radius-pill)',
                padding: '0 28px', height: '40px',
                fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >Create Your First Site</button>
          </div>

        ) : (
          /* Site cards grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {sites.map((site, i) => {
              const col = CARD_COLORS[i % CARD_COLORS.length]
              return (
                <div
                  key={site.id}
                  style={{
                    background: 'var(--md-surface)',
                    borderRadius: 'var(--md-radius-md)',
                    boxShadow: 'var(--md-shadow-card)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(60,64,67,0.3), 0 2px 4px rgba(60,64,67,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--md-shadow-card)'}
                >
                  {/* Tonal header — no gradient, MD3 tonal surface */}
                  <div style={{
                    height: '88px', background: col.bg,
                    display: 'flex', alignItems: 'flex-end', padding: '12px 16px',
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: 600, color: col.text }}>
                      {site.name}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '12px 16px 16px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--md-on-surface-variant)', marginBottom: '14px' }}>
                      Updated {new Date(site.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {/* Edit — filled pill button */}
                      <button
                        onClick={() => navigate(`/builder/${site.id}`)}
                        style={{
                          flex: 1, height: '32px', background: 'var(--md-primary)', color: '#fff',
                          border: 'none', borderRadius: 'var(--md-radius-pill)',
                          fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          fontFamily: 'inherit',
                        }}
                      >
                        <PencilIcon /> Edit
                      </button>

                      {/* Preview — outlined pill button */}
                      <a
                        href={api.previewUrl(site.id)}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          flex: 1, height: '32px',
                          border: '1px solid var(--md-outline)', borderRadius: 'var(--md-radius-pill)',
                          color: 'var(--md-primary)', background: 'transparent',
                          fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          textDecoration: 'none', fontFamily: 'inherit',
                        }}
                      >
                        <EyeIcon /> Preview
                      </a>

                      {/* Delete — icon-only text button */}
                      <button
                        onClick={() => setDeleteConfirm(site.id)}
                        title="Delete site"
                        style={{
                          width: '32px', height: '32px', border: 'none', background: 'transparent',
                          borderRadius: '50%', cursor: 'pointer',
                          color: 'var(--md-on-surface-variant)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FCE8E6'; e.currentTarget.style.color = 'var(--md-error)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--md-on-surface-variant)' }}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* ── Create Site Dialog ── */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, padding: '24px',
        }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: 'var(--md-surface)',
              borderRadius: 'var(--md-radius-dialog)',
              width: '100%', maxWidth: '480px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.24)',
              overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Dialog title */}
            <div style={{ padding: '28px 28px 20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 400, color: 'var(--md-on-surface)', marginBottom: '6px' }}>
                Create a new site
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--md-on-surface-variant)' }}>
                Choose a starting template and give your site a name.
              </p>
            </div>

            {/* Template chips */}
            <div style={{ padding: '0 28px 20px' }}>
              <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--md-on-surface-variant)', marginBottom: '10px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Template
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {TEMPLATES.map(t => {
                  const active = selectedTemplate === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      style={{
                        padding: '0 16px', height: '32px',
                        border: active ? `2px solid var(--md-primary)` : '1px solid var(--md-outline)',
                        borderRadius: 'var(--md-radius-pill)',
                        background: active ? 'var(--md-primary-container)' : 'transparent',
                        color: active ? 'var(--md-primary)' : 'var(--md-on-surface-variant)',
                        fontSize: '14px', fontWeight: active ? 500 : 400,
                        cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'all 0.15s',
                      }}
                    >{t.name}</button>
                  )
                })}
              </div>
              {/* Template description */}
              <p style={{ fontSize: '13px', color: 'var(--md-on-surface-variant)', marginTop: '10px', minHeight: '20px' }}>
                {TEMPLATES.find(t => t.id === selectedTemplate)?.description}
              </p>
            </div>

            {/* Site name field */}
            <div style={{ padding: '0 28px 24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--md-on-surface-variant)', marginBottom: '6px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Site Name
              </label>
              <input
                className="md3-input"
                type="text"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                placeholder="e.g. My Photography Portfolio"
                autoFocus
              />
            </div>

            {/* Dialog actions */}
            <div style={{
              padding: '12px 20px 20px',
              display: 'flex', justifyContent: 'flex-end', gap: '8px',
              borderTop: '1px solid var(--md-outline)',
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  height: '36px', padding: '0 20px', border: 'none', background: 'transparent',
                  color: 'var(--md-primary)', fontSize: '14px', fontWeight: 500,
                  borderRadius: 'var(--md-radius-pill)', cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--md-primary-container)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >Cancel</button>
              <button
                onClick={handleCreate}
                disabled={!siteName.trim() || creating}
                style={{
                  height: '36px', padding: '0 24px', border: 'none',
                  background: !siteName.trim() || creating ? 'var(--md-outline)' : 'var(--md-primary)',
                  color: '#fff', fontSize: '14px', fontWeight: 500,
                  borderRadius: 'var(--md-radius-pill)', cursor: !siteName.trim() || creating ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', transition: 'background 0.15s',
                }}
              >{creating ? 'Creating…' : 'Create Site'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Dialog ── */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50, padding: '24px',
        }}
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            style={{
              background: 'var(--md-surface)',
              borderRadius: 'var(--md-radius-dialog)',
              width: '100%', maxWidth: '360px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.24)',
              padding: '28px',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Error icon */}
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: '#FCE8E6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--md-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 400, color: 'var(--md-on-surface)', marginBottom: '8px' }}>
              Delete this site?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--md-on-surface-variant)', marginBottom: '28px' }}>
              This action can't be undone. The site and all its pages will be permanently removed.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  height: '36px', padding: '0 20px', border: 'none', background: 'transparent',
                  color: 'var(--md-primary)', fontSize: '14px', fontWeight: 500,
                  borderRadius: 'var(--md-radius-pill)', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >Cancel</button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                style={{
                  height: '36px', padding: '0 20px', border: 'none',
                  background: 'var(--md-error)', color: '#fff',
                  fontSize: '14px', fontWeight: 500,
                  borderRadius: 'var(--md-radius-pill)', cursor: 'pointer', fontFamily: 'inherit',
                }}
              >Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
