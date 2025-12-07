const input = await Deno.readTextFile("input.real")

const sheet = input.split("\n").map(line => line.replaceAll(/\s+/g, " ").trim().split(" "))

const ops = sheet.splice(sheet.length - 1, 1)[0] as ("+" | "*")[]
const numberSheet = sheet.map(l => l.map(Number)) as number[][]

let grandTotal = 0

for (let column = 0; column < ops.length; column++) {
  let columnResult = 0

  for (const row of numberSheet) {
    if (ops[column] === "+" || columnResult === 0) {
      columnResult = columnResult + row[column]
    } else if (ops[column] === "*") {
      columnResult = columnResult * row[column]
    }
  }

  grandTotal = grandTotal + columnResult
}

console.log(grandTotal)
