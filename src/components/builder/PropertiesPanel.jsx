import { useState } from 'react'
import useBuildStore from '../../store/builderStore'

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  )
}

const inputClass = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
const textareaClass = `${inputClass} resize-none`

function TextInput({ value, onChange, placeholder = '' }) {
  return <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
}

function TextArea({ value, onChange, rows = 3, placeholder = '' }) {
  return <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={textareaClass} />
}

function ColorInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={value || '#000000'} onChange={e => onChange(e.target.value)} className="w-10 h-9 p-0.5 border border-gray-200 rounded cursor-pointer" />
      <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} className={`${inputClass} flex-1`} placeholder="#000000" />
    </div>
  )
}

function SelectInput({ value, onChange, options }) {
  return (
    <select value={value || ''} onChange={e => onChange(e.target.value)} className={inputClass}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

// Editable list of objects
function ListEditor({ items = [], onChange, fields }) {
  const update = (i, key, val) => {
    const next = items.map((item, idx) => idx === i ? { ...item, [key]: val } : item)
    onChange(next)
  }
  const remove = i => onChange(items.filter((_, idx) => idx !== i))
  const add = () => onChange([...items, Object.fromEntries(fields.map(f => [f.key, '']))])

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          {fields.map(f => (
            <div key={f.key} className="mb-2">
              <label className="text-xs text-gray-500 mb-0.5 block">{f.label}</label>
              {f.multiline
                ? <TextArea value={item[f.key]} onChange={v => update(i, f.key, v)} rows={2} />
                : <TextInput value={item[f.key]} onChange={v => update(i, f.key, v)} placeholder={f.placeholder} />
              }
            </div>
          ))}
          <button onClick={() => remove(i)} className="text-xs text-red-400 hover:text-red-600 mt-1">Remove</button>
        </div>
      ))}
      <button onClick={add} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
        + Add Item
      </button>
    </div>
  )
}

// Per-block property editors
function NavbarProps({ props, update }) {
  return (
    <>
      <Field label="Logo Text"><TextInput value={props.logo} onChange={v => update({ logo: v })} /></Field>
      <Field label="Navigation Links">
        <ListEditor
          items={props.links || []}
          onChange={v => update({ links: v })}
          fields={[{ key: 'label', label: 'Label', placeholder: 'Home' }, { key: 'href', label: 'URL', placeholder: '#' }]}
        />
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
    </>
  )
}

function FeaturesProps({ props, update }) {
  return (
    <>
      <Field label="Section Title"><TextInput value={props.title} onChange={v => update({ title: v })} /></Field>
      <Field label="Feature Items">
        <ListEditor
          items={props.items || []}
          onChange={v => update({ items: v })}
          fields={[
            { key: 'icon', label: 'Emoji Icon', placeholder: '🚀' },
            { key: 'title', label: 'Title', placeholder: 'Feature name' },
            { key: 'description', label: 'Description', placeholder: 'Short description', multiline: true },
          ]}
        />
      </Field>
    </>
  )
}

function GalleryProps({ props, update }) {
  return (
    <>
      <Field label="Section Title"><TextInput value={props.title} onChange={v => update({ title: v })} /></Field>
      <Field label="Images">
        <ListEditor
          items={props.images || []}
          onChange={v => update({ images: v })}
          fields={[
            { key: 'src', label: 'Image URL', placeholder: 'https://...' },
            { key: 'caption', label: 'Caption', placeholder: 'Optional caption' },
          ]}
        />
      </Field>
    </>
  )
}

function TestimonialsProps({ props, update }) {
  return (
    <>
      <Field label="Section Title"><TextInput value={props.title} onChange={v => update({ title: v })} /></Field>
      <Field label="Testimonials">
        <ListEditor
          items={props.items || []}
          onChange={v => update({ items: v })}
          fields={[
            { key: 'quote', label: 'Quote', placeholder: 'What they said...', multiline: true },
            { key: 'author', label: 'Author Name', placeholder: 'Jane Doe' },
            { key: 'role', label: 'Role / Company', placeholder: 'CEO, Company' },
          ]}
        />
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
        <SelectInput
          value={props.align}
          onChange={v => update({ align: v })}
          options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]}
        />
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
        <ListEditor
          items={props.links || []}
          onChange={v => update({ links: v })}
          fields={[{ key: 'label', label: 'Label', placeholder: 'Privacy' }, { key: 'href', label: 'URL', placeholder: '#' }]}
        />
      </Field>
      <Field label="Social Links">
        <ListEditor
          items={props.socials || []}
          onChange={v => update({ socials: v })}
          fields={[{ key: 'platform', label: 'Platform', placeholder: 'Twitter' }, { key: 'url', label: 'URL', placeholder: '#' }]}
        />
      </Field>
    </>
  )
}

const EDITORS = {
  navbar: NavbarProps,
  hero: HeroProps,
  features: FeaturesProps,
  gallery: GalleryProps,
  testimonials: TestimonialsProps,
  text: TextProps,
  image: ImageProps,
  contact: ContactProps,
  footer: FooterProps,
}

export default function PropertiesPanel() {
  const { selectedBlock, updateBlock, site, updateSettings } = useBuildStore(s => ({
    selectedBlock: s.selectedBlock,
    updateBlock: s.updateBlock,
    site: s.site,
    updateSettings: s.updateSettings,
  }))

  const block = selectedBlock()
  const [activeTab, setActiveTab] = useState('block')

  const Editor = block ? EDITORS[block.type] : null

  return (
    <aside className="w-64 flex-none bg-white border-l border-gray-200 flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${activeTab === 'block' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          onClick={() => setActiveTab('block')}
        >Block</button>
        <button
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-colors ${activeTab === 'site' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          onClick={() => setActiveTab('site')}
        >Site</button>
      </div>

      <div className="overflow-y-auto flex-1 p-4">
        {activeTab === 'site' && site && (
          <SiteSettings settings={site.settings} update={updateSettings} />
        )}
        {activeTab === 'block' && !block && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">👆</div>
            <p className="text-sm">Click a block on the canvas to edit it</p>
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

function SiteSettings({ settings, update }) {
  const FONTS = ['Inter', 'Roboto', 'Playfair Display', 'Montserrat', 'Lato', 'Open Sans', 'Poppins']
  return (
    <>
      <Field label="Primary Color">
        <ColorInput value={settings.primaryColor} onChange={v => update({ primaryColor: v })} />
      </Field>
      <Field label="Font Family">
        <SelectInput
          value={settings.fontFamily}
          onChange={v => update({ fontFamily: v })}
          options={FONTS.map(f => ({ value: f, label: f }))}
        />
      </Field>
    </>
  )
}
