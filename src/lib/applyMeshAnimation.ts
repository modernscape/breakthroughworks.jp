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

    const c0 = new THREE.Vector3(...center.p0)
    const c1 = new THREE.Vector3(...center.p1)

    mesh.userData.anim = {
      direction: c0.clone().sub(c1),
      step: center.step,
      speed: center.speed,
      forward: true,
    }
  })
}
