import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLE_COUNT = 4
const PARTICLE_SPEED = 0.18

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function EdgeParticles({ curve }) {
  const meshRefs = useRef([])
  const tRef = useRef(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => i / PARTICLE_COUNT)
  )

  useFrame((_, delta) => {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      tRef.current[i] = (tRef.current[i] + PARTICLE_SPEED * delta) % 1
      const pos = curve.getPoint(tRef.current[i])
      if (meshRefs.current[i]) meshRefs.current[i].position.copy(pos)
    }
  })

  return (
    <>
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const init = curve.getPoint(i / PARTICLE_COUNT)
        return (
          <mesh
            key={i}
            ref={el => { meshRefs.current[i] = el }}
            position={[init.x, init.y, init.z]}
          >
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial color="#8A91A8" />
          </mesh>
        )
      })}
    </>
  )
}

export default function Edge({ from, to }) {
  const [fx, fy, fz] = from.position
  const [tx, ty, tz] = to.position

  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(fx, fy, fz),
    new THREE.Vector3((fx + tx) / 2, (fy + ty) / 2 + 1, (fz + tz) / 2),
    new THREE.Vector3(tx, ty, tz)
  ), [fx, fy, fz, tx, ty, tz])
  const points = useMemo(() => curve.getPoints(24), [curve])

  return (
    <>
      <Line
        points={points}
        color="#3B4261"
        lineWidth={1.5}
        transparent
        opacity={0.8}
      />
      {!prefersReducedMotion && <EdgeParticles curve={curve} />}
    </>
  )
}
