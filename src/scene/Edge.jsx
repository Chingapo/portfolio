import { Line } from '@react-three/drei'
import * as THREE from 'three'

export default function Edge({ from, to }) {
  const [fx, fy, fz] = from.position
  const [tx, ty, tz] = to.position

  // Slight arc upward at the midpoint — avoids edges cutting through nodes
  // and gives organic feel. Session 3 will sample this same curve for particles.
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(fx, fy, fz),
    new THREE.Vector3((fx + tx) / 2, (fy + ty) / 2 + 1, (fz + tz) / 2),
    new THREE.Vector3(tx, ty, tz)
  )
  const points = curve.getPoints(24)

  return (
    <Line
      points={points}
      color="#3B4261"
      lineWidth={1.5}
      transparent
      opacity={0.8}
    />
  )
}
