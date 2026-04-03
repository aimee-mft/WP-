import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../lib/api'

let saveTimeout = null

const useBuildStore = create((set, get) => ({
  site: null,
  activePageId: null,
  selectedBlockId: null,
  saving: false,
  previewWidth: 'desktop', // 'desktop' | 'tablet' | 'mobile'

  setPreviewWidth: (w) => set({ previewWidth: w }),

  setSite: (site) => {
    set({ site, activePageId: site.pages[0]?.id ?? null, selectedBlockId: null })
  },

  setActivePage: (pageId) => set({ activePageId: pageId, selectedBlockId: null }),

  selectBlock: (blockId) => set({ selectedBlockId: blockId }),

  activePage: () => {
    const { site, activePageId } = get()
    return site?.pages.find(p => p.id === activePageId) ?? null
  },

  selectedBlock: () => {
    const page = get().activePage()
    const id = get().selectedBlockId
    return page?.blocks.find(b => b.id === id) ?? null
  },

  // Add a new block to current page
  addBlock: (type, defaultProps = {}) => {
    const { site, activePageId } = get()
    if (!site || !activePageId) return
    const block = { id: uuidv4(), type, props: defaultProps }
    const updatedSite = {
      ...site,
      pages: site.pages.map(p =>
        p.id === activePageId ? { ...p, blocks: [...p.blocks, block] } : p
      )
    }
    set({ site: updatedSite, selectedBlockId: block.id })
    get().scheduleSave()
  },

  // Remove a block
  deleteBlock: (blockId) => {
    const { site, activePageId, selectedBlockId } = get()
    if (!site) return
    const updatedSite = {
      ...site,
      pages: site.pages.map(p =>
        p.id === activePageId ? { ...p, blocks: p.blocks.filter(b => b.id !== blockId) } : p
      )
    }
    set({ site: updatedSite, selectedBlockId: selectedBlockId === blockId ? null : selectedBlockId })
    get().scheduleSave()
  },

  // Duplicate a block
  duplicateBlock: (blockId) => {
    const { site, activePageId } = get()
    if (!site) return
    const page = site.pages.find(p => p.id === activePageId)
    if (!page) return
    const idx = page.blocks.findIndex(b => b.id === blockId)
    if (idx === -1) return
    const original = page.blocks[idx]
    const clone = { ...original, id: uuidv4(), props: { ...original.props } }
    const newBlocks = [...page.blocks]
    newBlocks.splice(idx + 1, 0, clone)
    const updatedSite = {
      ...site,
      pages: site.pages.map(p => p.id === activePageId ? { ...p, blocks: newBlocks } : p)
    }
    set({ site: updatedSite, selectedBlockId: clone.id })
    get().scheduleSave()
  },

  // Update block props
  updateBlock: (blockId, newProps) => {
    const { site, activePageId } = get()
    if (!site) return
    const updatedSite = {
      ...site,
      pages: site.pages.map(p =>
        p.id === activePageId
          ? { ...p, blocks: p.blocks.map(b => b.id === blockId ? { ...b, props: { ...b.props, ...newProps } } : b) }
          : p
      )
    }
    set({ site: updatedSite })
    get().scheduleSave()
  },

  // Reorder blocks
  reorderBlocks: (blocks) => {
    const { site, activePageId } = get()
    if (!site) return
    const updatedSite = {
      ...site,
      pages: site.pages.map(p => p.id === activePageId ? { ...p, blocks } : p)
    }
    set({ site: updatedSite })
    get().scheduleSave()
  },

  // Add page
  addPage: () => {
    const { site } = get()
    if (!site) return
    const page = { id: uuidv4(), site_id: site.id, name: 'New Page', slug: '/new-page', blocks: [] }
    const updatedSite = { ...site, pages: [...site.pages, page] }
    set({ site: updatedSite, activePageId: page.id, selectedBlockId: null })
    get().scheduleSave()
  },

  // Rename page
  renamePage: (pageId, name) => {
    const { site } = get()
    if (!site) return
    const updatedSite = {
      ...site,
      pages: site.pages.map(p => p.id === pageId ? { ...p, name } : p)
    }
    set({ site: updatedSite })
    get().scheduleSave()
  },

  // Delete page
  deletePage: (pageId) => {
    const { site, activePageId } = get()
    if (!site || site.pages.length <= 1) return
    const remaining = site.pages.filter(p => p.id !== pageId)
    set({
      site: { ...site, pages: remaining },
      activePageId: activePageId === pageId ? remaining[0].id : activePageId,
      selectedBlockId: null
    })
    get().scheduleSave()
  },

  // Update site settings
  updateSettings: (settings) => {
    const { site } = get()
    if (!site) return
    set({ site: { ...site, settings: { ...site.settings, ...settings } } })
    get().scheduleSave()
  },

  // Debounced auto-save
  scheduleSave: () => {
    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => get().saveNow(), 1000)
  },

  saveNow: async () => {
    const { site } = get()
    if (!site) return
    set({ saving: true })
    try {
      await api.updateSite(site.id, { name: site.name, settings: site.settings, pages: site.pages })
    } catch (e) {
      console.error('Auto-save failed', e)
    } finally {
      set({ saving: false })
    }
  },
}))

export default useBuildStore
