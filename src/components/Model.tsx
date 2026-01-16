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
import {MorphAnim} from "@/animation/type"
import {smoothstep} from "three/src/math/MathUtils.js"

export default function Model() {
  const {scene} = useGLTF("/model/24-11-10_sphere.glb")
  const centersRef = useRef<Map<string, CenterData>>(new Map())
  const ZERO = new THREE.Vector3(0, 0, 0)

  const morph = useRef<MorphAnim>({
    active: false,
    elapsed: 0,
    duration: 0.6,
  })

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

  // useFrame(() => {
  //   scene.traverse((obj) => {
  //     if (!(obj instanceof THREE.Mesh)) return

  //     const anim = obj.userData.anim as MeshAnimData | undefined
  //     if (!anim) return

  //     anim.step += anim.forward ? anim.speed : -anim.speed

  //     if (anim.step >= 1 || anim.step <= 0) {
  //       anim.forward = !anim.forward
  //       anim.step = THREE.MathUtils.clamp(anim.step, 0, 1)
  //     }

  //     obj.position.lerpVectors(anim.delta, ZERO, anim.step)
  //   })
  // })

  const PRESS_THRESHOLD = 1.2
  const CHARGE_SPEED = 1.0
  const DECAY_SPEED = 3.0
  const _TARGETS_Length = 2

  const onPointerDown = () => {
    state.current.isPressing = true
    state.current.isTrigged = false
    state.current.targetIndex = Math.floor(Math.random()) * _TARGETS_Length
  }

  const onPointerUp = () => {
    state.current.isPressing = false
  }

  // const smooothstep = (t: number) => {
  //   // エルミート補完式
  //   return t
  // }

  const updateGeometry = (t: number) => {
    // モーフアニメ
    // const pos = nodes.m_gold.geometry.attributes.position.array
    console.log(t)
  }

  // const startMorph = () => {
  //   morph.current.active = true
  //   morph.current.elapsed = 0

  //   state.current.isTrigged = false // 仮
  //   console.log("StartMorph!")
  // }

  useFrame((_, delta) => {
    // 子メッシュアニメ
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
    })

    // モーフ発動判定
    const s = state.current
    const m = morph.current

    if (s.isPressing && !s.isTrigged) {
      s.pressTime += delta * CHARGE_SPEED
      s.charge = Math.min(s.pressTime / PRESS_THRESHOLD, 1) // 0 〜 1
      console.log(s.pressTime)
    }

    if (!s.isTrigged && s.pressTime >= PRESS_THRESHOLD && !morph.current.active) {
      s.isTrigged = true
      s.pressTime = 0
      s.charge = 0
      console.log("Trigged!")

      m.active = true
      m.elapsed = 0
    }

    if (!s.isPressing && !s.isTrigged) {
      s.pressTime = Math.max(s.pressTime - delta * DECAY_SPEED, 0) // 指数減衰
      // s.pressTime *= Math.exp(-delta * DECAY_SPEED) // 非線形 0 〜 PRESS_THRESHOLDくらい
      console.log(s.pressTime)
    }

    // モーフアニメ
    if (!m.active) return
    m.elapsed += delta
    const rawT = Math.min(m.elapsed / m.duration, 1) // 0 〜 1

    const t = smoothstep(rawT, 0, 1)

    // updateGeometry(t)

    if (rawT >= 1) {
      m.active = false
      m.elapsed = 0
    }
  })

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
      onPointerDown={() => onPointerDown()}
      onPointerUp={() => onPointerUp()}
    />
  )
}
