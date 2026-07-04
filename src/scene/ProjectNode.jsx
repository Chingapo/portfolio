import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const LAYER_COLORS = {
  1: '#4FD6BE',
  2: '#7C8CF8',
  3: '#FFB454',
}

export default function ProjectNode({ project, onSelect }) {
  const color = LAYER_COLORS[project.layer] ?? '#ffffff'
  const [x, y, z] = project.position
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { gl } = useThree()

  useFrame(() => {
    if (!meshRef.current) return
    const target = hovered ? 1.3 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12)
  })

  return (
    <group position={[x, y, z]}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onSelect(project) }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); gl.domElement.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); gl.domElement.style.cursor = 'default' }}
      >
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
          color: hovered ? '#E6E8EF' : '#8A91A8',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          transition: 'color 0.15s',
        }}>
          {project.title}
        </span>
      </Html>
    </group>
  )
}
