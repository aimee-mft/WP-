import { BLOCK_REGISTRY } from '../blocks/index'
import useBuildStore from '../../store/builderStore'

const GROUPS = [
  { label: 'Layout',  types: ['navbar', 'hero', 'footer'] },
  { label: 'Content', types: ['text', 'features', 'testimonials'] },
  { label: 'Media',   types: ['image', 'gallery'] },
  { label: 'Forms',   types: ['contact'] },
]

export default function BlockLibrary() {
  const addBlock = useBuildStore(s => s.addBlock)

  return (
    <aside style={{
      width: '200px',
      flexShrink: 0,
      background: 'var(--md-surface)',
      borderRight: '1px solid var(--md-outline)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 8px' }}>
        <p style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--md-on-surface-variant)',
        }}>Blocks</p>
      </div>

      {/* Block groups */}
      <div style={{ overflowY: 'auto', flex: 1, paddingBottom: '16px' }}>
        {GROUPS.map(group => (
          <div key={group.label}>
            {/* Section label */}
            <p style={{
              padding: '12px 16px 4px',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--md-on-surface-variant)',
              borderTop: '1px solid var(--md-outline)',
            }}>{group.label}</p>

            {group.types.map(type => {
              const def = BLOCK_REGISTRY[type]
              if (!def) return null
              return (
                <button
                  key={type}
                  onClick={() => addBlock(type, def.defaultProps)}
                  style={{
                    width: '100%', padding: '8px 16px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    border: 'none', background: 'transparent',
                    cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--md-primary-container)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Icon container — tonal */}
                  <span style={{
                    width: '36px', height: '36px', borderRadius: 'var(--md-radius-sm)',
                    background: 'var(--md-surface-variant)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', flexShrink: 0,
                  }}>{def.icon}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--md-on-surface)' }}>
                    {def.label}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div style={{
        padding: '10px 16px',
        borderTop: '1px solid var(--md-outline)',
        fontSize: '11px', color: 'var(--md-on-surface-variant)',
        textAlign: 'center',
      }}>Click to add</div>
    </aside>
  )
}
