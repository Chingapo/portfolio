import { Html } from '@react-three/drei'

const LAYER_COLORS = {
  1: '#4FD6BE',
  2: '#7C8CF8',
  3: '#FFB454',
}

export default function ProjectNode({ project }) {
  const color = LAYER_COLORS[project.layer] ?? '#ffffff'
  const [x, y, z] = project.position

  return (
    <group position={[x, y, z]}>
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      <Html
        center
        position={[0, -0.85, 0]}
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <span style={{
          color: '#8A91A8',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}>
          {project.title}
        </span>
      </Html>
    </group>
  )
}
