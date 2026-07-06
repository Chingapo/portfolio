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

function Graph({ selectedProject, onSelect, overviewZ }) {
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
      controlsRef.current.setLookAt(0, 0, overviewZ, 0, 0, 0, transition)
    }
  }, [selectedProject, overviewZ])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -5, -5]} intensity={0.3} />
      {nodes.map(node => (
        <ProjectNode key={node.id} project={node} onSelect={onSelect} selectedProject={selectedProject} />
      ))}
      {edges.map((e) => (
        <Edge key={`${e.from.id}--${e.to.id}`} from={e.from} to={e.to} />
      ))}
      <CameraControls ref={controlsRef} makeDefault />
    </>
  )
}

export default function GraphScene({ selectedProject, onSelect }) {
  // Portrait mobile viewports are narrow in x; layout spans ±5 units so z=14 clips outer nodes.
  // At fov=50, z=26 gives horizontal half-view ≈5.6 units on a 390px-wide portrait screen.
  const overviewZ = typeof window !== 'undefined' && window.innerWidth < 600 ? 26 : 14
  return (
    <Canvas
      camera={{ position: [0, 0, overviewZ], fov: 50 }}
      style={{ background: '#0B0E14' }}
    >
      <Graph selectedProject={selectedProject} onSelect={onSelect} overviewZ={overviewZ} />
    </Canvas>
  )
}
