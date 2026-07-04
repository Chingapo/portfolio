import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { computeLayout } from './layout'
import ProjectNode from './ProjectNode'
import Edge from './Edge'
import projectsData from '../data/projects.json'

function Graph() {
  const nodes = computeLayout(projectsData.projects)
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]))

  // Collect edges from each node's connects list — single direction, no dedup needed
  const edges = []
  nodes.forEach(node => {
    node.connects.forEach(targetId => {
      if (byId[targetId]) {
        edges.push({ from: node, to: byId[targetId] })
      }
    })
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -5, -5]} intensity={0.3} />
      {nodes.map(node => (
        <ProjectNode key={node.id} project={node} />
      ))}
      {edges.map((e) => (
        <Edge key={`${e.from.id}--${e.to.id}`} from={e.from} to={e.to} />
      ))}
      <OrbitControls makeDefault />
    </>
  )
}

export default function GraphScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 50 }}
      style={{ background: '#0B0E14' }}
    >
      <Graph />
    </Canvas>
  )
}
