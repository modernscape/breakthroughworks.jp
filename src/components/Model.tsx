"use client"

import {useGLTF} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {useRef, useEffect} from "react"
import * as THREE from "three"
import {applySoftMorph} from "@/lib/applySoftMorph"

export default function Model() {
  const {scene} = useGLTF("/model/24-11-10_sphere.glb")

  const pressRef = useRef(false)
  const pressT = useRef(0)

  // base position 保存用
  const meshData = useRef<
    {
      mesh: THREE.Mesh
      basePos: Float32Array
    }[]
  >([])

  useEffect(() => {
    meshData.current = []

    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh
        const pos = mesh.geometry.attributes.position

        meshData.current.push({
          mesh,
          basePos: pos.array.slice() as Float32Array,
        })
      }
    })
  }, [scene])

  const onPointerDown = () => {
    pressRef.current = true
  }

  const onPointerUp = () => {
    pressRef.current = false
  }

  useFrame((state, dt) => {
    // pressT 更新
    if (pressRef.current) {
      pressT.current = Math.min(1, pressT.current + dt)
    } else {
      pressT.current = Math.max(0, pressT.current - dt)
    }

    const time = state.clock.elapsedTime

    for (const data of meshData.current) {
      applySoftMorph({
        mesh: data.mesh,
        basePos: data.basePos,
        pressT: pressT.current,
        time,
      })
    }
  })

  return (
    <primitive
      object={scene} //
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerUp}
    />
  )
}
