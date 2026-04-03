import { BLOCK_REGISTRY } from '../blocks/index'
import useBuildStore from '../../store/builderStore'

export default function BlockLibrary() {
  const addBlock = useBuildStore(s => s.addBlock)

  return (
    <aside className="w-52 flex-none bg-white border-r border-slate-200 flex flex-col overflow-hidden">
      <div className="px-4 pt-4 pb-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Add Blocks</p>
      </div>
      <div className="overflow-y-auto flex-1 px-2 pb-3">
        {Object.entries(BLOCK_REGISTRY).map(([type, def]) => (
          <button
            key={type}
            onClick={() => addBlock(type, def.defaultProps)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left group mb-0.5"
          >
            <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-base flex-none transition-colors">
              {def.icon}
            </span>
            <span className="font-medium">{def.label}</span>
          </button>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-slate-100">
        <p className="text-[11px] text-slate-400 text-center">Click to add to canvas</p>
      </div>
    </aside>
  )
}
