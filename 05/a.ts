const input = await Deno.readTextFile("input.real")

const db: [number, number][] = [];
const ingredientIds: number[] = []

for (const line of input.split("\n")) {
  const dbLineMatch = line.match(/^(\d+)\-(\d+)$/)

  if (dbLineMatch) {
    db.push([
      Number(dbLineMatch[1]),
      Number(dbLineMatch[2])
    ])
  }

  if (line.match(/^\d+$/)) {
    ingredientIds.push(Number(line))
  }
}

let freshCount = 0

for (const ingredientId of ingredientIds) {
  if (db.find(([start, stop]) => ingredientId >= start && ingredientId <= stop)) {
    freshCount++
  }
}

console.log(freshCount)
