import { BLOCK_REGISTRY } from '../blocks/index'
import useBuildStore from '../../store/builderStore'

const GROUPS = [
  { label: 'Layout', types: ['navbar', 'hero', 'footer'] },
  { label: 'Content', types: ['text', 'features', 'testimonials'] },
  { label: 'Media', types: ['image', 'gallery'] },
  { label: 'Forms', types: ['contact'] },
]

export default function BlockLibrary() {
  const addBlock = useBuildStore(s => s.addBlock)

  return (
    <aside className="w-52 flex-none bg-white border-r border-slate-200 flex flex-col overflow-hidden">
      <div className="px-4 pt-5 pb-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add Blocks</p>
      </div>
      <div className="overflow-y-auto flex-1 pb-4">
        {GROUPS.map(group => (
          <div key={group.label} className="mb-1">
            <p className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-y border-slate-100">{group.label}</p>
            {group.types.map(type => {
              const def = BLOCK_REGISTRY[type]
              if (!def) return null
              return (
                <button
                  key={type}
                  onClick={() => addBlock(type, def.defaultProps)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left group"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-base flex-none transition-colors">
                    {def.icon}
                  </span>
                  <span className="font-medium">{def.label}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 text-center">Click to add to canvas</p>
      </div>
    </aside>
  )
}
