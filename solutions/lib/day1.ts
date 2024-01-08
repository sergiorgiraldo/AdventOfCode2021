const helpers = require("./helpers");

function solveForFirstStar(lines: string[]) {
	let count = 0;
	lines
		.map((x) => parseInt(x))
		.reduce((prev, cur) => {
			if (cur > prev) {
				count++;
			}
			return cur;
		});

	return count;
}

function solveForSecondStar(lines: string[]) {
	const intInput = lines.map(Number);

	let count = 0;
	let prevWindow = calculateWindow(intInput, 0);
	
	for (let i = 1; i < intInput.length - 2; i++) {
		const curWindow = calculateWindow(intInput, i);
		if (curWindow > prevWindow) {
			count++;
		}
		prevWindow = curWindow;
	}
	
	return count;
}

function calculateWindow(array: number[], index: number) {
	return array[index] + array[index + 1] + array[index + 2];
}

module.exports = { solveForFirstStar, solveForSecondStar };
