import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useBuildStore from '../../store/builderStore'

/* ── MD3 form primitives ── */

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block', fontSize: '11px', fontWeight: 700,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        color: 'var(--md-on-surface-variant)', marginBottom: '6px',
      }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '9px 12px',
  border: '1px solid var(--md-outline)',
  borderRadius: 'var(--md-radius-xs)',
  fontSize: '13px', color: 'var(--md-on-surface)',
  background: 'var(--md-surface)', outline: 'none',
  fontFamily: 'inherit', transition: 'border-color 0.15s',
  boxSizing: 'border-box',
}

function TextInput({ value, onChange, placeholder = '' }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputStyle}
      onFocus={e => { e.target.style.borderColor = 'var(--md-primary)'; e.target.style.borderWidth = '2px'; e.target.style.padding = '8px 11px' }}
      onBlur={e => { e.target.style.borderColor = 'var(--md-outline)'; e.target.style.borderWidth = '1px'; e.target.style.padding = '9px 12px' }}
    />
  )
}

function TextArea({ value, onChange, rows = 3, placeholder = '' }) {
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      style={{ ...inputStyle, resize: 'vertical' }}
      onFocus={e => { e.target.style.borderColor = 'var(--md-primary)'; e.target.style.borderWidth = '2px'; e.target.style.padding = '8px 11px' }}
      onBlur={e => { e.target.style.borderColor = 'var(--md-outline)'; e.target.style.borderWidth = '1px'; e.target.style.padding = '9px 12px' }}
    />
  )
}

function ColorInput({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        type="color"
        value={value || '#000000'}
        onChange={e => onChange(e.target.value)}
        style={{ width: '40px', height: '36px', padding: '2px', border: '1px solid var(--md-outline)', borderRadius: 'var(--md-radius-xs)', cursor: 'pointer' }}
      />
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        style={{ ...inputStyle, flex: 1 }}
        placeholder="#000000"
        onFocus={e => { e.target.style.borderColor = 'var(--md-primary)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--md-outline)' }}
      />
    </div>
  )
}

function SelectInput({ value, onChange, options }) {
  return (
    <select
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputStyle, cursor: 'pointer' }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function ListEditor({ items = [], onChange, fields }) {
  const update = (i, key, val) => onChange(items.map((item, idx) => idx === i ? { ...item, [key]: val } : item))
  const remove = i => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, Object.fromEntries(fields.map(f => [f.key, '']))])

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{
          marginBottom: '8px', padding: '10px 12px',
          background: 'var(--md-surface-variant)',
          borderRadius: 'var(--md-radius-sm)',
          border: '1px solid var(--md-outline)',
        }}>
          {fields.map(f => (
            <div key={f.key} style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--md-on-surface-variant)', marginBottom: '4px' }}>{f.label}</label>
              {f.multiline
                ? <TextArea value={item[f.key]} onChange={v => update(i, f.key, v)} rows={2} placeholder={f.placeholder} />
                : <TextInput value={item[f.key]} onChange={v => update(i, f.key, v)} placeholder={f.placeholder} />
              }
            </div>
          ))}
          <button
            onClick={() => remove(i)}
            style={{
              fontSize: '12px', color: 'var(--md-error)', background: 'none',
              border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit',
            }}
          >Remove</button>
        </div>
      ))}
      <button
        onClick={add}
        style={{
          width: '100%', padding: '8px',
          border: '1px dashed var(--md-outline)', borderRadius: 'var(--md-radius-sm)',
          background: 'transparent', color: 'var(--md-primary)',
          fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--md-primary-container)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >+ Add Item</button>
    </div>
  )
}

/* ── Per-block property editors ── */

function NavbarProps({ props, update }) {
  return (
    <>
      <Field label="Logo Text"><TextInput value={props.logo} onChange={v => update({ logo: v })} /></Field>
      <Field label="Navigation Links">
        <ListEditor items={props.links || []} onChange={v => update({ links: v })}
          fields={[{ key: 'label', label: 'Label', placeholder: 'Home' }, { key: 'href', label: 'URL', placeholder: '#' }]} />
      </Field>
    </>
  )
}

function HeroProps({ props, update }) {
  return (
    <>
      <Field label="Headline"><TextInput value={props.headline} onChange={v => update({ headline: v })} /></Field>
      <Field label="Subheadline"><TextArea value={props.subheadline} onChange={v => update({ subheadline: v })} /></Field>
      <Field label="Button Text"><TextInput value={props.ctaText} onChange={v => update({ ctaText: v })} /></Field>
      <Field label="Button Link"><TextInput value={props.ctaLink} onChange={v => update({ ctaLink: v })} placeholder="https://" /></Field>
      <Field label="Background Color"><ColorInput value={props.backgroundColor} onChange={v => update({ backgroundColor: v })} /></Field>
      <Field label="Text Color"><ColorInput value={props.textColor} onChange={v => update({ textColor: v })} /></Field>
      <Field label="Background Image URL"><TextInput value={props.backgroundImage} onChange={v => update({ backgroundImage: v })} placeholder="https://images.unsplash.com/..." /></Field>
    </>
  )
}

function FeaturesProps({ props, update }) {
  return (
    <>
      <Field label="Section Title"><TextInput value={props.title} onChange={v => update({ title: v })} /></Field>
      <Field label="Feature Items">
        <ListEditor items={props.items || []} onChange={v => update({ items: v })}
          fields={[
            { key: 'icon', label: 'Emoji Icon', placeholder: '🚀' },
            { key: 'title', label: 'Title', placeholder: 'Feature name' },
            { key: 'description', label: 'Description', placeholder: 'Short description', multiline: true },
          ]} />
      </Field>
    </>
  )
}

function GalleryProps({ props, update }) {
  return (
    <>
      <Field label="Section Title"><TextInput value={props.title} onChange={v => update({ title: v })} /></Field>
      <Field label="Images">
        <ListEditor items={props.images || []} onChange={v => update({ images: v })}
          fields={[
            { key: 'src', label: 'Image URL', placeholder: 'https://...' },
            { key: 'caption', label: 'Caption', placeholder: 'Optional caption' },
          ]} />
      </Field>
    </>
  )
}

function TestimonialsProps({ props, update }) {
  return (
    <>
      <Field label="Section Title"><TextInput value={props.title} onChange={v => update({ title: v })} /></Field>
      <Field label="Testimonials">
        <ListEditor items={props.items || []} onChange={v => update({ items: v })}
          fields={[
            { key: 'quote', label: 'Quote', placeholder: 'What they said...', multiline: true },
            { key: 'author', label: 'Author Name', placeholder: 'Jane Doe' },
            { key: 'role', label: 'Role / Company', placeholder: 'CEO, Company' },
          ]} />
      </Field>
    </>
  )
}

function TextProps({ props, update }) {
  return (
    <>
      <Field label="Heading"><TextInput value={props.heading} onChange={v => update({ heading: v })} /></Field>
      <Field label="Content"><TextArea value={props.content} onChange={v => update({ content: v })} rows={6} /></Field>
      <Field label="Alignment">
        <SelectInput value={props.align} onChange={v => update({ align: v })}
          options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]} />
      </Field>
    </>
  )
}

function ImageProps({ props, update }) {
  return (
    <>
      <Field label="Image URL"><TextInput value={props.src} onChange={v => update({ src: v })} placeholder="https://..." /></Field>
      <Field label="Alt Text"><TextInput value={props.alt} onChange={v => update({ alt: v })} /></Field>
      <Field label="Caption"><TextInput value={props.caption} onChange={v => update({ caption: v })} /></Field>
    </>
  )
}

function ContactProps({ props, update }) {
  return (
    <>
      <Field label="Title"><TextInput value={props.title} onChange={v => update({ title: v })} /></Field>
      <Field label="Subtitle"><TextArea value={props.subtitle} onChange={v => update({ subtitle: v })} /></Field>
      <Field label="Email Address"><TextInput value={props.email} onChange={v => update({ email: v })} placeholder="hello@example.com" /></Field>
    </>
  )
}

function FooterProps({ props, update }) {
  return (
    <>
      <Field label="Copyright Text"><TextInput value={props.copyright} onChange={v => update({ copyright: v })} /></Field>
      <Field label="Links">
        <ListEditor items={props.links || []} onChange={v => update({ links: v })}
          fields={[{ key: 'label', label: 'Label', placeholder: 'Privacy' }, { key: 'href', label: 'URL', placeholder: '#' }]} />
      </Field>
      <Field label="Social Links">
        <ListEditor items={props.socials || []} onChange={v => update({ socials: v })}
          fields={[{ key: 'platform', label: 'Platform', placeholder: 'Twitter' }, { key: 'url', label: 'URL', placeholder: '#' }]} />
      </Field>
    </>
  )
}

const EDITORS = {
  navbar: NavbarProps, hero: HeroProps, features: FeaturesProps,
  gallery: GalleryProps, testimonials: TestimonialsProps,
  text: TextProps, image: ImageProps, contact: ContactProps, footer: FooterProps,
}

function SiteSettings({ settings, update }) {
  const FONTS = ['Google Sans', 'Inter', 'Roboto', 'Playfair Display', 'Montserrat', 'Lato', 'Open Sans', 'Poppins']
  return (
    <>
      <Field label="Primary Color"><ColorInput value={settings.primaryColor} onChange={v => update({ primaryColor: v })} /></Field>
      <Field label="Font Family">
        <SelectInput value={settings.fontFamily} onChange={v => update({ fontFamily: v })}
          options={FONTS.map(f => ({ value: f, label: f }))} />
      </Field>
    </>
  )
}

/* ── Main panel ── */

const BLOCK_LABELS = {
  navbar: 'Navbar', hero: 'Hero', features: 'Features', gallery: 'Gallery',
  testimonials: 'Testimonials', text: 'Text', image: 'Image',
  contact: 'Contact', footer: 'Footer',
}

const TAB_STYLE = (active) => ({
  flex: 1, height: '48px', border: 'none', background: 'transparent',
  fontSize: '13px', fontWeight: active ? 600 : 400,
  color: active ? 'var(--md-primary)' : 'var(--md-on-surface-variant)',
  cursor: 'pointer', fontFamily: 'inherit',
  position: 'relative', transition: 'color 0.15s',
})

export default function PropertiesPanel() {
  const { selectedBlock, updateBlock, site, updateSettings } = useBuildStore(useShallow(s => ({
    selectedBlock: s.selectedBlock,
    updateBlock: s.updateBlock,
    site: s.site,
    updateSettings: s.updateSettings,
  })))

  const block = selectedBlock()
  const [activeTab, setActiveTab] = useState('block')
  const Editor = block ? EDITORS[block.type] : null

  return (
    <aside style={{
      width: '248px', flexShrink: 0,
      background: 'var(--md-surface)',
      borderLeft: '1px solid var(--md-outline)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* MD3 Secondary Tabs */}
      <div style={{
        display: 'flex', borderBottom: '1px solid var(--md-outline)',
        background: 'var(--md-surface)',
      }}>
        {['block', 'site'].map(tab => {
          const active = activeTab === tab
          return (
            <button key={tab} style={TAB_STYLE(active)} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {active && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px', background: 'var(--md-primary)',
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Block name header strip */}
      {activeTab === 'block' && block && (
        <div style={{
          padding: '10px 16px', borderBottom: '1px solid var(--md-outline)',
          background: 'var(--md-surface-variant)',
          flexShrink: 0,
        }}>
          <p style={{ fontSize: '11px', color: 'var(--md-on-surface-variant)', marginBottom: '2px', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
            Editing
          </p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--md-on-surface)' }}>
            {BLOCK_LABELS[block.type] || block.type} Block
          </p>
        </div>
      )}

      {/* Content */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '16px' }}>
        {activeTab === 'site' && site && (
          <SiteSettings settings={site.settings} update={updateSettings} />
        )}

        {activeTab === 'block' && !block && (
          <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--md-on-surface-variant)' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'var(--md-surface-variant)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '20px',
            }}>✏️</div>
            <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--md-on-surface)', marginBottom: '6px' }}>
              No block selected
            </p>
            <p style={{ fontSize: '13px', color: 'var(--md-on-surface-variant)' }}>
              Click any block on the canvas to edit its properties
            </p>
          </div>
        )}

        {activeTab === 'block' && block && Editor && (
          <Editor
            key={block.id}
            props={block.props}
            update={newProps => updateBlock(block.id, newProps)}
          />
        )}
      </div>
    </aside>
  )
}
