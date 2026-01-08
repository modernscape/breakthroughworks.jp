"use client";

import {useEffect, useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import loadCenters from "@/lib/loadCenters";
import applyMeshAnimation from "@/lib/applyMeshAnimation";

export default function Model() {
  const {scene} = useGLTF("/model/24-11-10_sphere.glb");

  return <primitive object={scene} />;
}
