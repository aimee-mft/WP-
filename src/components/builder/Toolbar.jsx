import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import useBuildStore from '../../store/builderStore'
import { api } from '../../lib/api'

export default function Toolbar() {
  const navigate = useNavigate()
  const { site, activePageId, saving, setActivePage, addPage, renamePage, deletePage } = useBuildStore(useShallow(s => ({
    site: s.site,
    activePageId: s.activePageId,
    saving: s.saving,
    setActivePage: s.setActivePage,
    addPage: s.addPage,
    renamePage: s.renamePage,
    deletePage: s.deletePage,
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
    if (renamingId && renameValue.trim()) {
      renamePage(renamingId, renameValue.trim())
    }
    setRenamingId(null)
  }

  return (
    <header className="bg-white border-b border-slate-200 flex items-stretch h-14 flex-none z-20 shadow-sm">
      {/* Logo / back */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2.5 px-5 border-r border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        title="Back to dashboard"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">W</div>
        <div className="hidden sm:flex flex-col items-start leading-none">
          <span className="text-xs text-slate-400">WebCraft</span>
          <span className="text-sm font-semibold text-slate-800 max-w-[140px] truncate">{site.name}</span>
        </div>
      </button>

      {/* Page tabs */}
      <div className="flex-1 flex items-stretch overflow-x-auto">
        {site.pages.map(page => (
          <div
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`flex items-center gap-1.5 px-4 border-r border-slate-100 cursor-pointer text-sm transition-colors whitespace-nowrap group relative select-none
              ${activePageId === page.id
                ? 'bg-blue-50 text-blue-700 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-t'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            {renamingId === page.id ? (
              <input
                autoFocus
                value={renameValue}
                onChange={e => setRenameValue(e.target.value)}
                onBlur={commitRename}
                onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null) }}
                onClick={e => e.stopPropagation()}
                className="w-24 text-sm border border-blue-400 rounded px-1 focus:outline-none bg-white"
              />
            ) : (
              <>
                <span onDoubleClick={e => startRename(page, e)}>{page.name}</span>
                {site.pages.length > 1 && (
                  <button
                    onClick={e => { e.stopPropagation(); deletePage(page.id) }}
                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all ml-0.5 leading-none"
                    title="Delete page"
                  >×</button>
                )}
              </>
            )}
          </div>
        ))}
        <button
          onClick={addPage}
          className="flex items-center gap-1 px-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
          title="Add page"
        >
          <span className="text-base leading-none">+</span> Page
        </button>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 px-4 border-l border-slate-200">
        {saving && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <div className="w-3 h-3 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
            Saving
          </span>
        )}
        <a
          href={api.previewUrl(site.id)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Preview
        </a>
        <a
          href={api.exportUrl(site.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </a>
      </div>
    </header>
  )
}
