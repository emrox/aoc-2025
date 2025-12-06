const input = await Deno.readTextFile("input.real")
const idRanges: [number, number][] = input.replaceAll("\n", "").split(",").map((rangeStr: string) => rangeStr.split("-").map(Number))

let invalidIdSum = 0

for (const [start, stop] of idRanges) {
	for (let checkNumber = start; checkNumber <= stop; checkNumber++) {
		const checkNumberStr = checkNumber.toString()
		const maxCheckCharCount = Math.ceil(checkNumberStr.length / 2)

		for (let checkChars = 1; checkChars <= maxCheckCharCount; checkChars++) {
			const checkSequence = checkNumberStr.slice(0, checkChars)

			if (checkNumberStr.match(`^(${checkSequence}){2,}$`)) {
				invalidIdSum = invalidIdSum + checkNumber
				break
			}
		}
	}
}

console.log(invalidIdSum)
