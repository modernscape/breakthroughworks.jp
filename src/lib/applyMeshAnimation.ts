import {CenterData} from "@/types/center"
import * as THREE from "three"

export function applyMeshAnimation(
  scene: THREE.Object3D, //
  centers: Map<string, CenterData>
) {
  scene.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return

    const mesh = obj as THREE.Mesh
    const center = centers.get(mesh.name) //CenterData
    if (!center) return

    const parent = mesh.parent as THREE.Object3D

    const c0World = new THREE.Vector3(...center.p0)
    const c1World = new THREE.Vector3(...center.p1)

    const c0Local = parent.worldToLocal(c0World.clone())
    const c1Local = parent.worldToLocal(c1World.clone())

    mesh.userData.anim = {
      c0: c0Local,
      c1: c1Local,
      step: center.step,
      speed: center.speed,
      forward: true,
    }
  })
}
