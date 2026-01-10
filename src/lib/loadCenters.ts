import {CenterData, CenterMap} from "@/types/center"

export async function loadCenters(): Promise<CenterMap> {
  const res = await fetch("/data/data.json")
  const json = await res.json()

  const map: CenterMap = new Map()

  json.centers.forEach((c: CenterData) => {
    map.set(c.name, c)
  })

  return map
}
