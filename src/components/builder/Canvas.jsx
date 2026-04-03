import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { useShallow } from 'zustand/react/shallow'
import useBuildStore from '../../store/builderStore'
import BlockWrapper from './BlockWrapper'

const WIDTH_MAP = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
}

export default function Canvas() {
  const { site, activePage, reorderBlocks, selectBlock, previewWidth } = useBuildStore(useShallow(s => ({
    site: s.site,
    activePage: s.activePage,
    reorderBlocks: s.reorderBlocks,
    selectBlock: s.selectBlock,
    previewWidth: s.previewWidth,
  })))

  const page = activePage()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  if (!page) return (
    <div className="flex-1 flex items-center justify-center text-slate-400 canvas-bg">
      <p>No page selected</p>
    </div>
  )

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const blocks = page.blocks
    const oldIdx = blocks.findIndex(b => b.id === active.id)
    const newIdx = blocks.findIndex(b => b.id === over.id)
    reorderBlocks(arrayMove(blocks, oldIdx, newIdx))
  }

  return (
    <div
      className="flex-1 overflow-y-auto canvas-bg flex flex-col items-center py-8"
      onClick={() => selectBlock(null)}
    >
      <div
        className="bg-white shadow-2xl transition-all duration-300 overflow-hidden"
        style={{
          width: WIDTH_MAP[previewWidth],
          maxWidth: '100%',
          minHeight: '600px',
          borderRadius: previewWidth === 'desktop' ? '0' : '8px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {page.blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-96 text-slate-400 select-none py-24">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-2xl mb-4">
              📦
            </div>
            <p className="text-base font-semibold text-slate-500 mb-1">Canvas is empty</p>
            <p className="text-sm text-slate-400">Click a block in the left panel to add it</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={page.blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {page.blocks.map(block => (
                <BlockWrapper key={block.id} block={block} settings={site?.settings} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  )
}
