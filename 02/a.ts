const input = await Deno.readTextFile("input.real")
const idRanges: [number, number][] = input.replaceAll("\n", "").split(",").map((rangeStr: string) => rangeStr.split("-").map(Number))

let invalidIdSum = 0

for (const [start, stop] of idRanges) {
	for (let checkNumber = start; checkNumber <= stop; checkNumber++) {
		const checkNumberStr = checkNumber.toString()
		const splitIdStart = checkNumberStr.slice(0, checkNumberStr.length / 2)
		const splitIdEnd = checkNumberStr.slice(checkNumberStr.length / 2)

		if (splitIdStart === splitIdEnd) {
			invalidIdSum = invalidIdSum + checkNumber
		}
	}
}

console.log(invalidIdSum)
