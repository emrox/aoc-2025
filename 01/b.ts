const input = await Deno.readTextFile("input.real")
const instructions: Array<["L" | "R", number]> = input.split("\n").map((line: string) => [line.slice(0, 1), Number(line.slice(1))])

let position: number = 50;
let zeroPositionCount = 0;

for(const [direction, steps] of instructions) {
	for (let _step = 0; _step < steps;_step++ ) {
		if (direction === "L") {
			position = position - 1;
		} else {
			position = position + 1;
		}

		if (position <= -1) {
			position = 99;
		} else if (position >= 100) {
			position = 0;
		}

		if (position === 0) {
			zeroPositionCount++
		}
	}
}

console.log(`--==:[ ${zeroPositionCount} ]:==--`);
