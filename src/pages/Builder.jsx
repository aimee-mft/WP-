import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useBuildStore from '../store/builderStore'
import { api } from '../lib/api'
import Toolbar from '../components/builder/Toolbar'
import BlockLibrary from '../components/builder/BlockLibrary'
import Canvas from '../components/builder/Canvas'
import PropertiesPanel from '../components/builder/PropertiesPanel'

export default function Builder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { site, setSite } = useBuildStore(s => ({ site: s.site, setSite: s.setSite }))

  useEffect(() => {
    api.getSite(id)
      .then(setSite)
      .catch(() => { alert('Site not found'); navigate('/') })
  }, [id])

  if (!site) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <BlockLibrary />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  )
}
