"use client"

import {Suspense, useState} from "react"
import dynamic from "next/dynamic"

const Sphere = dynamic(() => import("@/projects/sphere"), {ssr: false})
const Distortion = dynamic(() => import("@/projects/sphere_distortion"), {ssr: false})
const TwilightEmbed = dynamic(() => import("./twilight/page"), {ssr: false})
const FragmentsEmbed = dynamic(() => import("./fragments/page"), {ssr: false})

export default function Home() {
  const pages = [
    Sphere, //
    Sphere,
    Distortion,
    Distortion,
    TwilightEmbed,
    FragmentsEmbed,
    FragmentsEmbed,
  ]

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
