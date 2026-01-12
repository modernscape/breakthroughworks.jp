"use client"

import {useEffect, useRef} from "react"
import {useGLTF} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import * as THREE from "three"
import {loadCenters} from "@/lib/loadCenters"
import {CenterData} from "@/types/center"
import {applyMeshAnimation} from "@/lib/applyMeshAnimation"
import {MeshAnimData} from "@/animation/type"

export default function Model() {
  const {scene} = useGLTF("/model/24-11-10_sphere.glb")
  const centersRef = useRef<Map<string, CenterData>>(new Map())
  const ZERO = new THREE.Vector3(0, 0, 0)

  useEffect(() => {
    loadCenters().then((map) => {
      centersRef.current = map
      applyMeshAnimation(scene, centersRef.current)
    })
  }, [scene])

  useFrame(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return

      const anim = obj.userData.anim as MeshAnimData | undefined
      if (!anim) return

      anim.step += anim.forward ? anim.speed : -anim.speed

      if (anim.step >= 1 || anim.step <= 0) {
        anim.forward = !anim.forward
        anim.step = THREE.MathUtils.clamp(anim.step, 0, 1)
      }

      obj.position.lerpVectors(anim.delta, ZERO, anim.step)
      // obj.position.lerpVectors(anim.c0, anim.c1, anim.step)
    })
  })

  // useFrame(() => {
  //   scene.traverse((obj) => {
  //     const mesh = obj as THREE.Mesh
  //     const anim = mesh.userData.anim
  //     if (!anim) return

  //     if (anim.step < 0) {
  //       anim.forward = true
  //       anim.step = 0 // MIN:0
  //     } else if (anim.step > 1) {
  //       anim.forward = false
  //       anim.step = 1 // MAX:1
  //     }

  //     obj.position.lerpVectors(anim.c0, anim.c1, anim.step)
  //   })
  // })

  return <primitive object={scene} />
}
