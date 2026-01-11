// src/animation/updateMeshAnim.ts
import {MeshAnimData} from "./types"

export function updateMeshAnim(anim: MeshAnimData, now: number): boolean {
  const {mesh, from, to, speed} = anim

  anim.step += anim.forward ? speed : -speed

  if (anim.step > 1) {
    anim.step = 1
    anim.forward = false
  }
  if (anim.step < 0) {
    anim.step = 0
    anim.forward = true
  }

  mesh.position.lerpVectors(from, to, anim.step)
  return true
}

// MeshAnimData を 1 フレーム進める
