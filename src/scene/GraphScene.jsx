import { useRef, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { computeLayout } from './layout'
import ProjectNode from './ProjectNode'
import Edge from './Edge'
import projectsData from '../data/projects.json'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Graph({ selectedProject, onSelect }) {
  const controlsRef = useRef()
  const nodes = useMemo(() => computeLayout(projectsData.projects), [])
  const byId = useMemo(() => Object.fromEntries(nodes.map(n => [n.id, n])), [nodes])
  const edges = useMemo(() => {
    const result = []
    nodes.forEach(node => {
      node.connects.forEach(targetId => {
        if (byId[targetId]) result.push({ from: node, to: byId[targetId] })
      })
    })
    return result
  }, [nodes, byId])

  useEffect(() => {
    if (!controlsRef.current) return
    const transition = !prefersReducedMotion
    if (selectedProject) {
      const [x, y, z] = selectedProject.position
      controlsRef.current.setLookAt(x, y, z + 5, x, y, z, transition)
    } else {
      controlsRef.current.setLookAt(0, 0, 14, 0, 0, 0, transition)
    }
  }, [selectedProject])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -5, -5]} intensity={0.3} />
      {nodes.map(node => (
        <ProjectNode key={node.id} project={node} onSelect={onSelect} />
      ))}
      {edges.map((e) => (
        <Edge key={`${e.from.id}--${e.to.id}`} from={e.from} to={e.to} />
      ))}
      <CameraControls ref={controlsRef} makeDefault />
    </>
  )
}

export default function GraphScene({ selectedProject, onSelect }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 50 }}
      style={{ background: '#0B0E14' }}
    >
      <Graph selectedProject={selectedProject} onSelect={onSelect} />
    </Canvas>
  )
}
