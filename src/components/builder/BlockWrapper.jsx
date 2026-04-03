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
    opacity: isDragging ? 0.3 : 1,
    position: 'relative',
  }

  if (!BlockComponent) return null

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        outline: isSelected
          ? '2px solid var(--md-primary)'
          : '1px solid transparent',
        outlineOffset: '-1px',
        transition: 'outline 0.1s',
        cursor: 'pointer',
      }}
      className="block-wrapper-group"
      onClick={() => selectBlock(block.id)}
    >
      {/* Control bar — MD3 style, appears on hover/select */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 12px',
        height: '32px',
        background: 'var(--md-primary)',
        opacity: isSelected ? 1 : 0,
        transition: 'opacity 0.15s',
        pointerEvents: isSelected ? 'auto' : 'none',
      }}
        className="block-control-bar"
      >
        {/* Block label */}
        <span style={{ color: '#fff', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {def?.icon} {def?.label}
        </span>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            style={iconBtnStyle}
            title="Drag to reorder"
            onClick={e => e.stopPropagation()}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>
              <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
              <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
            </svg>
          </button>

          {/* Duplicate */}
          <button
            style={iconBtnStyle}
            title="Duplicate"
            onClick={e => { e.stopPropagation(); duplicateBlock(block.id) }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>

          {/* Delete */}
          <button
            style={{ ...iconBtnStyle, '--hover-bg': 'rgba(217,48,37,0.8)' }}
            title="Delete"
            onClick={e => { e.stopPropagation(); deleteBlock(block.id) }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,48,37,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Hover outline via CSS — only when not selected */}
      <style>{`
        .block-wrapper-group:hover .block-control-bar { opacity: 1 !important; pointer-events: auto !important; }
        .block-wrapper-group:not(.selected):hover { outline: 1px solid var(--md-outline) !important; }
      `}</style>

      <BlockComponent props={block.props} settings={settings} />
    </div>
  )
}

const iconBtnStyle = {
  width: '24px', height: '24px', border: 'none',
  background: 'rgba(255,255,255,0.15)',
  borderRadius: '4px',
  color: 'rgba(255,255,255,0.9)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', transition: 'background 0.12s',
}
