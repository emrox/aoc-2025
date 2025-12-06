const input = await Deno.readTextFile("input.real")
const shelf = input.split("\n").map(l => l.split("")) as ("." | "@")[][]

let removedRolls = 0
let lastRunRemovedRolls = 0

do {
  lastRunRemovedRolls = removedRolls

  for (let row = 0; row < shelf.length; row++) {
    for (let column = 0; column < shelf[row].length; column++) {
      if (shelf[row][column] === ".") { continue }

      let neighboars = 0

      if (shelf[row - 1]?.[column - 1] === "@") { neighboars++ }
      if (shelf[row - 1]?.[column] === "@") { neighboars++ }
      if (shelf[row - 1]?.[column + 1] === "@") { neighboars++ }
      if (shelf[row][column - 1] === "@") { neighboars++ }
      if (shelf[row][column + 1] === "@") { neighboars++ }
      if (shelf[row + 1]?.[column - 1] === "@") { neighboars++ }
      if (shelf[row + 1]?.[column] === "@") { neighboars++ }
      if (shelf[row + 1]?.[column + 1] === "@") { neighboars++ }

      if (neighboars < 4) {
        removedRolls++
        shelf[row][column] = "."
      }
    }
  }
} while (lastRunRemovedRolls !== removedRolls)

console.log(removedRolls)
