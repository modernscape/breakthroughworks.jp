// src/app/page.tsx
import {redirect} from "next/navigation"

// キャッシュを無効化し、アクセスごとにランダム判定を強制する
export const dynamic = "force-dynamic"

export default function Home() {
  const projects = ["/sphere", "/sphere_distortion"]
  const randomIndex = Math.floor(Math.random() * projects.length)
  const selectedPath = projects[randomIndex]

  redirect(selectedPath)
}
