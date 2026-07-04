import { useState, useEffect } from 'react'
import GraphScene from './scene/GraphScene'
import DetailPanel from './ui/DetailPanel'
import FallbackGrid from './ui/FallbackGrid'
import './styles.css'

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [gridView, setGridView] = useState(() => !detectWebGL())

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject])

  return (
    <>
      <button
        className={`view-toggle${selectedProject ? ' view-toggle--panel-open' : ''}`}
        onClick={() => {
          setGridView(v => !v)
          setSelectedProject(null)
        }}
        aria-label={gridView ? 'Switch to 3D graph view' : 'Switch to grid view'}
      >
        {gridView ? 'Graph view' : 'Grid view'}
      </button>

      {gridView ? (
        <FallbackGrid onSelectProject={setSelectedProject} />
      ) : (
        <GraphScene selectedProject={selectedProject} onSelect={setSelectedProject} />
      )}

      <DetailPanel
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
