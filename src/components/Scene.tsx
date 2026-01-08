"use client";

import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Lights from "./Lights";
import Model from "./Model";

export default function Scene() {
  return (
    <Canvas
      shadows //
      camera={{fov: 45, position: [3, 9, 3]}}
    >
      <color attach="background" args={["#000000"]}></color>
      <Lights />
      <Model />
      <OrbitControls
        enableDamping //
        enablePan={false}
        minDistance={3}
        maxDistance={15}
      />
    </Canvas>
  );
}
