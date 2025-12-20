const input = await Deno.readTextFile("input.real")
const boxPositions = input
  .split("\n")
  .map((line) => line.split(",").map(Number))
  .map(([x,y,z]) => ({ x, y, z }) )

const distances: Record<string, number> = {}

for (let boxPositionIndex = 0; boxPositionIndex < boxPositions.length; boxPositionIndex++) {
  for (let calcDistanceIndex = 0; calcDistanceIndex < boxPositions.length; calcDistanceIndex++) {
    if (boxPositionIndex === calcDistanceIndex) { continue }

    const bp = boxPositions[boxPositionIndex]
    const cp = boxPositions[calcDistanceIndex]

    const distance = Math.sqrt(
      Math.abs(
        Math.pow(bp.x - cp.x, 2) + Math.pow(bp.y - cp.y, 2) + Math.pow(bp.z - cp.z, 2)
      )
    )

    if (
      !distances[`${bp.x}-${bp.y}-${bp.z}|${cp.x}-${cp.y}-${cp.z}`] &&
      !distances[`${cp.x}-${cp.y}-${cp.z}|${bp.x}-${bp.y}-${bp.z}`]
    ) {
      distances[`${bp.x}-${bp.y}-${bp.z}|${cp.x}-${cp.y}-${cp.z}`] = distance
    }
  }
}

const sortedDistances = Object.entries(distances).sort(([,a],[,b]) => a - b)

const circuits: Set<string>[] = []

let iteration = 0
while((circuits[0]?.size ?? 0) !== boxPositions.length) {
  const [p1, p2] = sortedDistances[iteration][0].split("|")

  const foundCircuit = circuits.findIndex((circuit) => (circuit.has(p1) || circuit.has(p2)))
  if (foundCircuit >= 0) {
    circuits[foundCircuit].add(p1)
    circuits[foundCircuit].add(p2)
  } else {
    circuits.push(new Set([p1, p2]))
  }

  if (circuits.filter((circuit) => (circuit.has(p1) || circuit.has(p2))).length === 2) {
    const firstCircuitIndex = circuits.findIndex((circuit) => (circuit.has(p1) || circuit.has(p2)))
    const secondCircuitIndex = circuits.findLastIndex((circuit) => (circuit.has(p1) || circuit.has(p2)))

    circuits[firstCircuitIndex] = new Set([...circuits[firstCircuitIndex], ...circuits[secondCircuitIndex]])
    circuits[secondCircuitIndex] = new Set()
  }

  iteration++
}

const lastConnection = sortedDistances[iteration - 1]
const pointXes = lastConnection[0].split("|").map((p) => p.split("-")).map((p) => p[0])

console.log(Number(pointXes[0]) * Number(pointXes[1]))
