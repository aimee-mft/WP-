import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useBuildStore from '../../store/builderStore'
import { BLOCK_REGISTRY } from '../blocks/index'

export default function BlockWrapper({ block, settings }) {
  const { selectedBlockId, selectBlock, deleteBlock, duplicateBlock } = useBuildStore(s => ({
    selectedBlockId: s.selectedBlockId,
    selectBlock: s.selectBlock,
    deleteBlock: s.deleteBlock,
    duplicateBlock: s.duplicateBlock,
  }))

  const isSelected = selectedBlockId === block.id
  const def = BLOCK_REGISTRY[block.type]
  const BlockComponent = def?.component

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  if (!BlockComponent) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 ring-offset-0' : ''}`}
      onClick={() => selectBlock(block.id)}
    >
      {/* Controls overlay */}
      <div className={`absolute top-2 right-2 z-10 flex gap-1 ${isSelected ? 'flex' : 'hidden group-hover:flex'}`}>
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="w-7 h-7 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
          onClick={e => e.stopPropagation()}
        >
          ⠿
        </button>
        {/* Duplicate */}
        <button
          className="w-7 h-7 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600"
          title="Duplicate block"
          onClick={e => { e.stopPropagation(); duplicateBlock(block.id) }}
        >
          ⊕
        </button>
        {/* Delete */}
        <button
          className="w-7 h-7 bg-white border border-red-100 rounded shadow-sm flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600"
          title="Delete block"
          onClick={e => { e.stopPropagation(); deleteBlock(block.id) }}
        >
          ✕
        </button>
      </div>

      {/* Block type label */}
      <div className={`absolute top-2 left-2 z-10 ${isSelected ? 'flex' : 'hidden group-hover:flex'}`}>
        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-medium">
          {def?.icon} {def?.label}
        </span>
      </div>

      <BlockComponent props={block.props} settings={settings} />
    </div>
  )
}
