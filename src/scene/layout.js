// Deterministic jitter: no Math.random() so positions never shift between renders.
// Uses a simple multiplicative hash on the project id string.
function hash(str, seed) {
  let h = (seed >>> 0) ^ 0xdeadbeef
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 0x9e3779b9)
    h ^= h >>> 16
  }
  return (h >>> 0) / 0x100000000 // 0–1 exclusive upper bound
}

// Pure function: projects[] → nodes with position: [x, y, z]
// x axis = capability layer (left-to-right progression)
// y axis = branch separation (spine near 0, hackathon at -2.5) + small jitter
// z axis = depth jitter for organic feel
export function computeLayout(projects) {
  return projects.map(p => {
    const x = (p.layer - 1) * 5 - 5                  // L1=-5, L2=0, L3=5
    const baseY = p.branch === 'hackathon' ? -2.5 : 0
    const jY = (hash(p.id, 1) - 0.5) * 0.8           // ±0.4
    const jZ = (hash(p.id, 2) - 0.5) * 0.8           // ±0.4
    return { ...p, position: [x, baseY + jY, jZ] }
  })
}
