import * as THREE from "three"

type Params = {
  mesh: THREE.Mesh
  basePos: Float32Array
  pressT: number
  time: number
}

export function applySoftMorph({mesh, basePos, pressT, time}: Params) {
  const geo = mesh.geometry
  const pos = geo.attributes.position.array as Float32Array

  const amp = 0.15 * pressT

  for (let i = 0; i < pos.length; i += 3) {
    const x = basePos[i]
    const y = basePos[i + 1]
    const z = basePos[i + 2]

    // 簡易ノイズ（後で差し替え）
    const n = Math.sin(x * 3 + time) * Math.sin(y * 3 + time) * Math.sin(z * 3 + time)

    pos[i] = x + n * amp
    pos[i + 1] = y + n * amp
    pos[i + 2] = z + n * amp
  }

  geo.attributes.position.needsUpdate = true
  geo.computeVertexNormals()
}
