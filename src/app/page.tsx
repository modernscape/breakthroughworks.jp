"use client"

import {Suspense, useState} from "react"
import dynamic from "next/dynamic"

// dynamicインポートしたコンポーネントの配列を作成
const pages = [
  dynamic(() => import("@/projects/sphere"), {ssr: false}),
  dynamic(() => import("@/projects/sphere_distortion"), {ssr: false}),
  dynamic(() => import("./twilight/page"), {ssr: false}),
  dynamic(() => import("./fragments/page"), {ssr: false}),
  dynamic(() => import("./imgeToPoints/page"), {ssr: false}),
  dynamic(() => import("./imgeToPoints/page"), {ssr: false}), // 重複（確率アップ）用
]

export default function Home() {
  // useStateの初期化関数で一度だけランダムに選択
  const [RandomPage] = useState(() => {
    const index = Math.floor(Math.random() * pages.length)
    return pages[index]
  })

  return (
    <Suspense fallback={null}>
      <RandomPage />
    </Suspense>
  )
}
