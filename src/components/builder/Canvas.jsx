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

export default function Canvas() {
  const { site, activePage, reorderBlocks, selectBlock } = useBuildStore(useShallow(s => ({
    site: s.site,
    activePage: s.activePage,
    reorderBlocks: s.reorderBlocks,
    selectBlock: s.selectBlock,
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
      className="flex-1 overflow-y-auto canvas-bg"
      onClick={() => selectBlock(null)}
    >
      {page.blocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full min-h-96 text-slate-400 select-none">
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-dashed border-slate-300 flex items-center justify-center text-2xl mb-4 shadow-sm">
            📦
          </div>
          <p className="text-base font-semibold text-slate-500 mb-1">Canvas is empty</p>
          <p className="text-sm text-slate-400">Click a block in the left panel to add it</p>
        </div>
      ) : (
        <div className="min-h-full">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={page.blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {page.blocks.map(block => (
                <BlockWrapper key={block.id} block={block} settings={site?.settings} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  )
}
