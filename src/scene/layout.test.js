import { describe, it, expect } from 'vitest'
import { computeLayout } from './layout'

const FIXTURE = [
  { id: 'node-a', layer: 1, branch: 'spine', connects: [] },
  { id: 'node-b', layer: 2, branch: 'spine', connects: ['node-a'] },
  { id: 'node-c', layer: 3, branch: 'hackathon', connects: ['node-b'] },
]

describe('computeLayout', () => {
  it('assigns x based on layer: L1=-5, L2=0, L3=5', () => {
    const nodes = computeLayout(FIXTURE)
    expect(nodes[0].position[0]).toBe(-5)
    expect(nodes[1].position[0]).toBe(0)
    expect(nodes[2].position[0]).toBe(5)
  })

  it('places hackathon branch lower than spine in y', () => {
    const nodes = computeLayout(FIXTURE)
    const spine = nodes[1]   // layer 2, branch: spine
    const hack  = nodes[2]   // layer 3, branch: hackathon
    expect(hack.position[1]).toBeLessThan(spine.position[1])
  })

  it('preserves all original project fields', () => {
    const nodes = computeLayout(FIXTURE)
    expect(nodes[0].id).toBe('node-a')
    expect(nodes[0].connects).toEqual([])
    expect(nodes[0].layer).toBe(1)
  })

  it('is deterministic: same input → same positions', () => {
    const a = computeLayout(FIXTURE)
    const b = computeLayout(FIXTURE)
    expect(a[0].position).toEqual(b[0].position)
    expect(a[2].position).toEqual(b[2].position)
  })

  it('returns position as a three-element array of numbers', () => {
    const nodes = computeLayout(FIXTURE)
    nodes.forEach(n => {
      expect(n.position).toHaveLength(3)
      n.position.forEach(v => expect(typeof v).toBe('number'))
    })
  })
})
