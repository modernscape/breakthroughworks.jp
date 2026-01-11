import * as THREE from "three"
import {EasingFn} from "./easing"

// animation/types.ts
export interface AnimParams {
  from: THREE.Vector3
  to: THREE.Vector3
  duration: number
  easing?: EasingFn
}

// src/animation/types.ts
export type MeshAnimData = AnimParams & {
  mesh: THREE.Mesh
  startTime: number
  href?: string
}
