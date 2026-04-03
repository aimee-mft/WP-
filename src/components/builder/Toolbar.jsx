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
    <header className="bg-white border-b border-gray-200 flex items-stretch h-12 flex-none z-20">
      {/* Logo/back */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 border-r border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        title="Back to dashboard"
      >
        <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-bold">W</span>
        <span className="text-sm font-semibold hidden sm:block">{site.name}</span>
      </button>

      {/* Page tabs */}
      <div className="flex-1 flex items-stretch overflow-x-auto">
        {site.pages.map(page => (
          <div
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`flex items-center px-4 border-r border-gray-100 cursor-pointer text-sm transition-colors whitespace-nowrap group relative ${activePageId === page.id ? 'bg-blue-50 text-blue-700 font-semibold border-b-2 border-blue-600 -mb-px' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {renamingId === page.id ? (
              <input
                autoFocus
                value={renameValue}
                onChange={e => setRenameValue(e.target.value)}
                onBlur={commitRename}
                onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null) }}
                onClick={e => e.stopPropagation()}
                className="w-24 text-sm border border-blue-400 rounded px-1 py-0 focus:outline-none"
              />
            ) : (
              <>
                <span onDoubleClick={e => startRename(page, e)}>{page.name}</span>
                {site.pages.length > 1 && (
                  <button
                    onClick={e => { e.stopPropagation(); deletePage(page.id) }}
                    className="ml-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-xs"
                    title="Delete page"
                  >✕</button>
                )}
              </>
            )}
          </div>
        ))}
        <button
          onClick={addPage}
          className="flex items-center px-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm"
          title="Add page"
        >
          + Page
        </button>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 px-4 border-l border-gray-200">
        {saving && <span className="text-xs text-gray-400">Saving…</span>}
        <a
          href={api.previewUrl(site.id)}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors"
        >
          Preview
        </a>
        <a
          href={api.exportUrl(site.id)}
          className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Export
        </a>
      </div>
    </header>
  )
}
