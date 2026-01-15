"use client"

import {useEffect, useRef} from "react"
import {useGLTF} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import * as THREE from "three"
import {loadCenters} from "@/lib/loadCenters"
import {CenterData} from "@/types/center"
import {applyMeshAnimation} from "@/lib/applyMeshAnimation"
import {MeshAnimData} from "@/animation/type"
import {ThreeEvent} from "@react-three/fiber"
import {MorphState} from "@/animation/type"

const PRESS_THRESHOLD = 1.2

export default function Model() {
  const {scene} = useGLTF("/model/24-11-10_sphere.glb")
  const centersRef = useRef<Map<string, CenterData>>(new Map())
  const ZERO = new THREE.Vector3(0, 0, 0)

  const state = useRef<MorphState>({
    pressTime: 0,
    charge: 0,
    isPressing: false,
    isTrigged: false,
    targetIndex: 0,
  })

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

  const onPointerDown = () => {}

  const onPointerUp = () => {}

  return (
    <primitive
      object={scene} //
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        const mesh = e.object as THREE.Mesh
        const anim = mesh.userData.anim
        if (!anim) return
        anim.speed = 0

        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.wireframe = true
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        const mesh = e.object as THREE.Mesh
        const anim = mesh.userData.anim
        if (!anim) return

        anim.speed = mesh.userData.baseSpeed

        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.wireframe = false
      }}
    />
  )
}
