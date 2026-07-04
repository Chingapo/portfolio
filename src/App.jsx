import { useState } from 'react'
import GraphScene from './scene/GraphScene'
import './styles.css'

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  return <GraphScene selectedProject={selectedProject} onSelect={setSelectedProject} />
}
