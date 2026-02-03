import type {NextConfig} from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // projects フォルダ内のコンポーネントをビルド対象として認識させる
  transpilePackages: ["projects/sphere", "projects/sphere_distortion"],
}

export default nextConfig
