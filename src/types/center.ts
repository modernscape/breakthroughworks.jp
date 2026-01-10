export type CenterData = {
  name: string
  p0: [number, number, number]
  p1: [number, number, number]
  step: number
  speed: number
  comment?: string
}

export type CenterMap = Map<string, CenterData>
