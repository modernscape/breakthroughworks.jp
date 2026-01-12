// animation/types.ts
import * as THREE from "three"

// export type MeshAnimData = {
//   c0: THREE.Vector3
//   c1: THREE.Vector3
//   step: number
//   speed: number
//   forward: boolean
// }

export type MeshAnimData = {
  delta: THREE.Vector3 // p0 - p1（ローカル差分）
  step: number
  speed: number
  forward: boolean
}
