"use client"

import {Suspense, useState} from "react"
import dynamic from "next/dynamic"

// 1. インポート関数をそのまま配列にする（これなら波線は出ません）
const importers = [
  () => import("@/projects/sphere"),
  () => import("@/projects/sphere_distortion"),
  () => import("./twilight/page"),
  () => import("./fragments/page"),
  () => import("./imgeToPoints/page"),
  () => import("./imgeToPoints/page"),
]

// 2. mapで一括してdynamicコンポーネントに変換
const pages = importers.map((f) => dynamic(f, {ssr: false}))

export default function Home() {
  const [Page] = useState(() => {
    const index = Math.floor(Math.random() * pages.length)
    return pages[index]
  })

  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  )
}
