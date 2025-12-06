const input = await Deno.readTextFile("input.real")
const banks = input.split("\n")

let joltage = 0

for (const bank of banks) {
	let largestBankJoltage = 0

	for (let batteryPos = 0; batteryPos < bank.length - 1; batteryPos++) { 
		const battery = bank.slice(batteryPos, batteryPos + 1)
		const highestRightBattery = bank.slice(batteryPos + 1).split("").map(Number).sort().at(-1)
		const posJoltage = Number(`${battery}${highestRightBattery}`)

		if (posJoltage > largestBankJoltage) {
			largestBankJoltage = posJoltage
		}
	}

	joltage = joltage + largestBankJoltage
}

console.log(joltage)
