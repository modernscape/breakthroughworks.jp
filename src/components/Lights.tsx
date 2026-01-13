import {DirectionalLightHelper} from "three"
import {useHelper} from "@react-three/drei"
import {useRef} from "react"

export default function Lights() {
  const lightRef = useRef<DirectionalLightHelper>(null!)
  // 第1引数にref、第2引数にThree.jsのHelperクラス、第3引数以降にサイズなどのオプションを渡します
  useHelper(lightRef, DirectionalLightHelper, 1, "hotpink")

  return (
    <>
      <ambientLight intensity={3.0} />
      <directionalLight
        intensity={2.0} //
        // position={[-500, 3400, 500]}
        position={[-500, 1000, 0]}
        castShadow
        // ref={lightRef}
      ></directionalLight>
    </>
  )
}
