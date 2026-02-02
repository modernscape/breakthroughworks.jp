import {redirect} from "next/navigation"

export default function Home() {
  // アクセスされたら即座に /sphere へリダイレクト
  redirect("/sphere")
}
