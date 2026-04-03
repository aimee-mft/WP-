import { BLOCK_REGISTRY } from '../blocks/index'
import useBuildStore from '../../store/builderStore'

export default function BlockLibrary() {
  const addBlock = useBuildStore(s => s.addBlock)

  return (
    <aside className="w-56 flex-none bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Blocks</h3>
      </div>
      <div className="overflow-y-auto flex-1 py-2">
        {Object.entries(BLOCK_REGISTRY).map(([type, def]) => (
          <button
            key={type}
            onClick={() => addBlock(type, def.defaultProps)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
          >
            <span className="text-xl w-7 text-center">{def.icon}</span>
            <span className="font-medium">{def.label}</span>
          </button>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400 text-center">
        Click to add a block
      </div>
    </aside>
  )
}
