// animation/types.ts
import * as THREE from "three"

export type MeshAnimData = {
  c0: THREE.Vector3
  c1: THREE.Vector3
  step: number
  speed: number
  forward: boolean
}
