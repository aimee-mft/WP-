import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import useBuildStore from '../../store/builderStore'
import { api } from '../../lib/api'

// SVG icons
const ArrowBack = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
)
const PageIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
)
const DesktopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const TabletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)
const MobileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const DEVICES = [
  { key: 'desktop', label: 'Desktop', icon: <DesktopIcon /> },
  { key: 'tablet',  label: 'Tablet',  icon: <TabletIcon /> },
  { key: 'mobile',  label: 'Mobile',  icon: <MobileIcon /> },
]

export default function Toolbar() {
  const navigate = useNavigate()
  const { site, activePageId, saving, setActivePage, addPage, renamePage, deletePage, previewWidth, setPreviewWidth } = useBuildStore(useShallow(s => ({
    site: s.site,
    activePageId: s.activePageId,
    saving: s.saving,
    setActivePage: s.setActivePage,
    addPage: s.addPage,
    renamePage: s.renamePage,
    deletePage: s.deletePage,
    previewWidth: s.previewWidth,
    setPreviewWidth: s.setPreviewWidth,
  })))

  const [renamingId, setRenamingId] = useState(null)
  const [renameValue, setRenameValue] = useState('')

  if (!site) return null

  const startRename = (page, e) => {
    e.stopPropagation()
    setRenamingId(page.id)
    setRenameValue(page.name)
  }

  const commitRename = () => {
    if (renamingId && renameValue.trim()) renamePage(renamingId, renameValue.trim())
    setRenamingId(null)
  }

  return (
    <header style={{
      background: 'var(--md-surface)',
      borderBottom: '1px solid var(--md-outline)',
      height: '56px',
      display: 'flex',
      alignItems: 'stretch',
      flexShrink: 0,
      zIndex: 20,
    }}>

      {/* Back / branding */}
      <button
        onClick={() => navigate('/')}
        title="Back to dashboard"
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '0 16px', border: 'none', background: 'transparent',
          borderRight: '1px solid var(--md-outline)',
          color: 'var(--md-on-surface-variant)', cursor: 'pointer',
          fontFamily: 'inherit', transition: 'background 0.15s',
          minWidth: '160px',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--md-surface-variant)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <span style={{ color: 'var(--md-on-surface-variant)', display: 'flex' }}><ArrowBack /></span>
        <div style={{ textAlign: 'left', lineHeight: 1 }}>
          <div style={{ fontSize: '11px', color: 'var(--md-on-surface-variant)', marginBottom: '3px' }}>WebCraft</div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--md-on-surface)', maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site.name}</div>
        </div>
      </button>

      {/* MD3 Primary Tabs — page list */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', overflowX: 'auto' }}>
        {site.pages.map(page => {
          const active = activePageId === page.id
          return (
            <div
              key={page.id}
              onClick={() => setActivePage(page.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0 16px', cursor: 'pointer',
                borderRight: '1px solid var(--md-outline)',
                fontSize: '14px', fontWeight: active ? 500 : 400,
                color: active ? 'var(--md-primary)' : 'var(--md-on-surface-variant)',
                background: active ? 'rgba(26,115,232,0.04)' : 'transparent',
                position: 'relative', whiteSpace: 'nowrap',
                transition: 'background 0.15s, color 0.15s',
                userSelect: 'none',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--md-surface-variant)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              {/* Active indicator */}
              {active && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '3px', background: 'var(--md-primary)',
                  borderRadius: '3px 3px 0 0',
                }} />
              )}
              <span style={{ opacity: 0.7 }}><PageIcon /></span>
              {renamingId === page.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null) }}
                  onClick={e => e.stopPropagation()}
                  style={{
                    width: '96px', fontSize: '14px', padding: '2px 4px',
                    border: '1px solid var(--md-primary)', borderRadius: '4px',
                    outline: 'none', background: 'white', fontFamily: 'inherit',
                  }}
                />
              ) : (
                <>
                  <span onDoubleClick={e => startRename(page, e)}>{page.name}</span>
                  {site.pages.length > 1 && (
                    <button
                      onClick={e => { e.stopPropagation(); deletePage(page.id) }}
                      style={{
                        width: '18px', height: '18px', border: 'none', background: 'transparent',
                        color: 'var(--md-on-surface-variant)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '50%', fontSize: '14px', padding: 0, opacity: 0,
                        transition: 'opacity 0.15s',
                      }}
                      className="page-close-btn"
                      title="Delete page"
                    >×</button>
                  )}
                </>
              )}
            </div>
          )
        })}
        {/* Add page */}
        <button
          onClick={addPage}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '0 14px', border: 'none', background: 'transparent',
            color: 'var(--md-on-surface-variant)', cursor: 'pointer',
            fontSize: '13px', fontWeight: 500, fontFamily: 'inherit',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--md-surface-variant)'; e.currentTarget.style.color = 'var(--md-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--md-on-surface-variant)' }}
          title="Add page"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Page
        </button>
      </div>

      {/* Right actions */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '0 16px', borderLeft: '1px solid var(--md-outline)',
        flexShrink: 0,
      }}>

        {/* MD3 Segmented button — device toggle */}
        <div style={{
          display: 'flex', alignItems: 'center',
          border: '1px solid var(--md-outline)',
          borderRadius: 'var(--md-radius-pill)',
          overflow: 'hidden', height: '32px',
        }}>
          {DEVICES.map(({ key, label, icon }) => {
            const active = previewWidth === key
            return (
              <button
                key={key}
                title={label}
                onClick={() => setPreviewWidth(key)}
                style={{
                  width: '40px', height: '32px', border: 'none',
                  borderLeft: key !== 'desktop' ? '1px solid var(--md-outline)' : 'none',
                  background: active ? 'var(--md-primary-container)' : 'transparent',
                  color: active ? 'var(--md-primary)' : 'var(--md-on-surface-variant)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >{icon}</button>
            )
          })}
        </div>

        {/* Saving indicator */}
        {saving && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--md-on-surface-variant)', whiteSpace: 'nowrap' }}>
            <div style={{
              width: '12px', height: '12px',
              border: '2px solid var(--md-primary-container)',
              borderTopColor: 'var(--md-primary)', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            Saving
          </span>
        )}

        {/* Preview — outlined pill button */}
        <a
          href={api.previewUrl(site.id)}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            height: '32px', padding: '0 16px',
            border: '1px solid var(--md-outline)', borderRadius: 'var(--md-radius-pill)',
            color: 'var(--md-primary)', background: 'transparent',
            fontSize: '13px', fontWeight: 500, textDecoration: 'none',
            fontFamily: 'inherit', transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--md-primary-container)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <EyeIcon /> Preview
        </a>

        {/* Export — filled pill button */}
        <a
          href={api.exportUrl(site.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            height: '32px', padding: '0 16px',
            background: 'var(--md-primary)', borderRadius: 'var(--md-radius-pill)',
            color: '#fff', fontSize: '13px', fontWeight: 500,
            textDecoration: 'none', fontFamily: 'inherit',
            transition: 'filter 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'none'}
        >
          <DownloadIcon /> Export
        </a>
      </div>

      {/* Show page close buttons on hover via global style */}
      <style>{`
        div:hover > .page-close-btn { opacity: 1 !important; }
      `}</style>
    </header>
  )
}
