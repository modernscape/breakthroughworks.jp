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

    const p0 = new THREE.Vector3(...center.p0)
    const p1 = new THREE.Vector3(...center.p1)

    const anim = {
      delta: p0.clone().sub(p1), // ★ここ
      step: center.step,
      speed: center.speed,
      forward: true,
    }

    mesh.userData.anim = anim
    mesh.userData.baseSpeed = anim.speed

    // mesh.userData.anim = {
    //   c0: c0Local,
    //   c1: c1Local,
    //   step: center.step,
    //   speed: center.speed,
    //   forward: true,
    // }
  })
}
