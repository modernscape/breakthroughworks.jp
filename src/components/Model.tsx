"use client";

import {useGLTF} from "@react-three/drei";

export default function Model() {
  const {scene} = useGLTF("/model/24-11-10_sphere.glb");
  return <primitive object={scene} />;
}
