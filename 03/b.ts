const input = await Deno.readTextFile("input.real")
const banks = input.split("\n")

const findNumberLength = 12

let joltage = 0

for (const bank of banks) {
	const joltageMap: number[] = []
	const bankNumbers = bank.split("").map(Number);

	for (let check = 0; check < findNumberLength; check++) {
		let joltPosition = ((joltageMap.at(-1) ?? -1) + 1)

		for (
			let checkJoltPosition = joltPosition + 1;
			checkJoltPosition < bankNumbers.length;
			checkJoltPosition++
		) {
			if (bankNumbers.length - checkJoltPosition < findNumberLength - joltageMap.length) {
				break
			}

			if (bankNumbers[checkJoltPosition] > bankNumbers[joltPosition]) {
				joltPosition = checkJoltPosition
			}
		}

		joltageMap.push(joltPosition)
	}

	joltage = joltage + Number(joltageMap.map(p => bankNumbers[p]).join(""))
}

console.log(joltage)
