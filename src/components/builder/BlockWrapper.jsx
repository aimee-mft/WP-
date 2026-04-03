import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useShallow } from 'zustand/react/shallow'
import useBuildStore from '../../store/builderStore'
import { BLOCK_REGISTRY } from '../blocks/index'

export default function BlockWrapper({ block, settings }) {
  const { selectedBlockId, selectBlock, deleteBlock, duplicateBlock } = useBuildStore(useShallow(s => ({
    selectedBlockId: s.selectedBlockId,
    selectBlock: s.selectBlock,
    deleteBlock: s.deleteBlock,
    duplicateBlock: s.duplicateBlock,
  })))

  const isSelected = selectedBlockId === block.id
  const def = BLOCK_REGISTRY[block.type]
  const BlockComponent = def?.component

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  }

  if (!BlockComponent) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-pointer transition-shadow ${isSelected ? 'ring-2 ring-blue-500 ring-inset shadow-lg' : 'hover:ring-1 hover:ring-slate-300 hover:ring-inset'}`}
      onClick={() => selectBlock(block.id)}
    >
      {/* Top control bar — visible on hover or select */}
      <div className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-1.5 bg-blue-600 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <span className="text-white text-xs font-semibold tracking-wide">
          {def?.icon} {def?.label}
        </span>
        <div className="flex items-center gap-1">
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            className="w-6 h-6 rounded flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-500 cursor-grab active:cursor-grabbing transition-colors"
            title="Drag to reorder"
            onClick={e => e.stopPropagation()}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/></svg>
          </button>
          {/* Duplicate */}
          <button
            className="w-6 h-6 rounded flex items-center justify-center text-blue-200 hover:text-white hover:bg-blue-500 transition-colors"
            title="Duplicate"
            onClick={e => { e.stopPropagation(); duplicateBlock(block.id) }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
          {/* Delete */}
          <button
            className="w-6 h-6 rounded flex items-center justify-center text-blue-200 hover:text-white hover:bg-red-500 transition-colors"
            title="Delete"
            onClick={e => { e.stopPropagation(); deleteBlock(block.id) }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <BlockComponent props={block.props} settings={settings} />
    </div>
  )
}
