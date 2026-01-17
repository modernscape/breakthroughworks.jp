"use client"

import {Canvas} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"
import {Environment} from "@react-three/drei"
import Model from "./Model"
import Lights from "./Lights"

export default function Scene() {
  return (
    <Canvas camera={{position: [0, 0, 4], fov: 50}}>
      <Environment
        files="/hdr/kloppenheim_06_puresky_4k.hdr" //
        background
      />
      <Lights />
      <Model />
      <OrbitControls />
    </Canvas>
  )
}
