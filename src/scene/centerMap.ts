// scene/centerMap.ts
import {MeshAnimData} from "@/animation"
// import {createMeshAnim} from "../animation/createMeshAnim"
import {updateMeshAnim} from "../animation/updateMeshAnim"
import {CenterData} from "@/data/centerData"

export class CenterMap {
  centers: CenterData[] = []
  anims: MeshAnimData[] = []

  update(now: number) {
    this.anims = this.anims.filter((anim) => updateMeshAnim(anim, now))
  }
}

// 実行中 anim の管理
