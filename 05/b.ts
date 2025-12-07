const input = await Deno.readTextFile("input.real")

const db: [number, number][] = [];

const numberSort = (a: number, b: number) => a - b

for (const line of input.split("\n")) {
  const dbLineMatch = line.match(/^(\d+)\-(\d+)$/)

  if (dbLineMatch) {
    const lineStart = Number(dbLineMatch[1])
    const lineStop = Number(dbLineMatch[2])

    const matchDbEntries = db.reduce((acc, [dbStart, dbStop], dbIndex) => {
      if ((lineStart >= dbStart && lineStart <= dbStop) || (lineStop >= dbStart && lineStop <= dbStop)) {
        acc.push(dbIndex)
      } else if (dbStart >= lineStart && dbStop <= lineStop) {
        acc.push(dbIndex)
      }

      return acc
    }, [] as number[])

    if (matchDbEntries.length === 0) {
      db.push([lineStart, lineStop])
      continue
    }

    if (matchDbEntries.length === 1) {
      if (lineStart < db[matchDbEntries[0]][0]) {
        db[matchDbEntries[0]][0] = lineStart
      }

      if (lineStop > db[matchDbEntries[0]][1]) {
        db[matchDbEntries[0]][1] = lineStop
      }

      continue
    }

    let lowId = matchDbEntries.map(mid => db[mid][0]).toSorted(numberSort).at(0)!
    if (lineStart < lowId) { lowId = lineStart }

    let highId = matchDbEntries.map(mid => db[mid][1]).toSorted(numberSort).at(-1)!
    if (lineStop > highId) { highId = lineStop }

    for (const matchDbEntry of matchDbEntries.toSorted(numberSort).toReversed()) {
      db.splice(matchDbEntry, 1)
    }

    db.push([lowId, highId])
  }
}

let freshIngredientCount = 0

for (const [start, stop] of db) {
  freshIngredientCount = freshIngredientCount + (stop - start + 1)
}

console.log(freshIngredientCount)
