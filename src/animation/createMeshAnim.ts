// animation/createMeshAnim.ts
import * as THREE from "three"
import {CenterData} from "@/data/centerData"
import {AnimParams, MeshAnimData} from "./types"

export function createMeshAnim(
  mesh: THREE.Mesh, //
  center: CenterData,
  params: AnimParams
): MeshAnimData {
  return {
    mesh,
    startTime: performance.now(),
    duration: params.duration,
    from: params.from.clone(),
    to: params.to.clone(),
    easing: params.easing ?? ((t) => t),
    href: center.href,
  }
}
