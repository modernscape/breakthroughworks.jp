"use client"

import {useEffect, useRef} from "react"
import {useFrame} from "@react-three/fiber"
import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/Addons.js"

import {CenterData} from "@/data/centerData"
import {createMeshAnim} from "@/animation/createMeshAnim"
import {updateMeshAnim} from "@/animation/updateMeshAnim"
import {MeshAnimData} from "@/animation/types"
import {loadCenters} from "@/lib/loadCenters"
import {easeInOutCubic} from "@/animation/easing"
import {log} from "console"

export default function Model() {
  const groupRef = useRef<THREE.Group>(null)
  const animsRef = useRef<MeshAnimData[]>([])
  const centersRef = useRef<CenterData[]>([])

  /* -----------------------------
   * CenterData をロード
   * ----------------------------- */
  // useEffect(() => {
  //   fetch("/data/data.json")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       centersRef.current = json.centers
  //     })
  // }, [])

  useEffect(() => {
    loadCenters().then((centers) => {
      centersRef.current = centers // CenterData[]
    })
  }, [])

  /* -----------------------------
   * GLB をロード
   * ----------------------------- */
  useEffect(() => {
    const loader = new GLTFLoader()

    loader.load("/model/24-11-10_sphere.glb", (gltf) => {
      const scene = gltf.scene

      scene.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh)) return

        console.log(obj)

        const center = centersRef.current.find((c) => c.name === obj.name)
        console.log(center)

        if (!center) return

        const targetPos = obj.position.clone().multiplyScalar(1.0)

        const anim = createMeshAnim(obj, center, {
          from: obj.position.clone(),
          to: targetPos,
          duration: 2000,
          easing: easeInOutCubic,
        })

        animsRef.current.push(anim)
      })

      groupRef.current?.add(scene)
    })
  }, [])

  /* -----------------------------
   * 毎フレーム更新
   * ----------------------------- */
  useFrame((state) => {
    const now = state.clock.elapsedTime

    animsRef.current = animsRef.current.filter((anim) => updateMeshAnim(anim, now))
  })

  return <group ref={groupRef} />
}
