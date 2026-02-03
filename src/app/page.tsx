import {redirect} from "next/navigation"

export default function Home() {
  // 公開したいプロジェクトのパスを配列にする
  const projects = ["/sphere", "/sphere_distortion"]

  // ランダムに一つ選ぶ
  const randomIndex = Math.floor(Math.random() * projects.length)
  const selectedPath = projects[randomIndex]

  // 選ばれたパスへリダイレクト
  redirect(selectedPath)
}
