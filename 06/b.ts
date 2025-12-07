const input = await Deno.readTextFile("input.real")
const inputLines = input.split("\n")

const opLine = inputLines.splice(inputLines.length - 1, 1)[0].replaceAll(/([\*\+]\s*)(\s|$)/g, "$1|").slice(0, -1).split("|")

const columnWidhts = opLine.map(line => line.length)
const ops = opLine.map(line => line.trim()) as ("*" | "+")[]

let columnStart = 0
let grandTotal = 0

for (let columnNumber = 0; columnNumber < ops.length; columnNumber++) {
  const columnWidht = columnWidhts[columnNumber]
  const columnNumberEnd = columnStart + columnWidht

  const columnStrNumbers = []
  for (let rowNumber = 0; rowNumber < inputLines.length; rowNumber++) {
    columnStrNumbers.push(inputLines[rowNumber].slice(columnStart, columnNumberEnd))
  }

  const columnCalcNumbers = []

  for (let calcPosition = columnWidht - 1; calcPosition >= 0; calcPosition--) {
    let calcNumberStr = ""

    for (const columnContent of columnStrNumbers) {
      const columnPositionNumber = columnContent[calcPosition]

      if (columnPositionNumber !== " ") {
        calcNumberStr = `${calcNumberStr}${columnPositionNumber}`
      }
    }

    columnCalcNumbers.push(Number(calcNumberStr))
  }

  let columnResult = 0
  for (const columnCalcNumber of columnCalcNumbers) {
    if (ops[columnNumber] === "+" || columnResult === 0) {
      columnResult = columnResult + columnCalcNumber
    } else if (ops[columnNumber] === "*") {
      columnResult = columnResult * columnCalcNumber
    }
  }

  grandTotal = grandTotal + columnResult

  columnStart = columnNumberEnd + 1
}

console.log(grandTotal)
