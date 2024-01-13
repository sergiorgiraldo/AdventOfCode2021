class Day17 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const match = lines[0].match(
			/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/
		);
		const [targetXMin, targetXMax, targetYMin, targetYMax] = match!
			.slice(1)
			.map(Number);
	
		//i just make my search space a little wider	
		const initialXMin = targetXMin - 5;
		const initialXMax = targetXMax + 5;

		let maxY = 0;

		for (let initialY = 0; initialY < 100; initialY++) {
			for (let initialX = initialXMin; initialX <= initialXMax; initialX++) {
				let y = initialY * initialX - (initialX * (initialX - 1)) / 2;
				let dy = initialY - initialX;

				while (y >= targetYMin) {
					y += dy--;
					if (y >= targetYMin && y <= targetYMax) {
						/*
						* looking at the puzzle, the y-target is always negative, and then the probe start going in its
						* direction after hitting the 0 upwards.
						* the y velocity always decreases by 1. so the height is (at modulus) first 1, then 2, then 3, etc.
						* at first position is 0, velocity is 1. so the height is 1.
						* then the velocity is 2. so the height is 3 (1+2).
						* then the velocity is 3. so the height is 6 (1+2+3) and so on
						* the highest point is the sum of all the heights which is the sum of natural numbers: n(n+1)/2
						*/
						const localMaxY = ((initialY * initialY) + initialY)/2;
						if (localMaxY > maxY) {
							maxY = localMaxY;
						}
						break;
					}
				}
			}
		}
		return maxY;
	}

	public solveForSecondStar(lines: string[]) {
		const match = lines[0].match(
			/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/
		);
		const [targetXMin, targetXMax, targetYMin, targetYMax] = match!
			.slice(1)
			.map(Number);

		let count = 0;
		
		//brute-force search, search space is not big so ¯\_(ツ)_/¯

		for (let initialY = targetYMin; initialY < 100; initialY++) {
			for (let initialX = 0; initialX <= targetXMax; initialX++) {
				let x = 0,
					y = 0,
					dy = initialY,
					dx = initialX;
				while (y >= targetYMin) {
					y += dy--;
					x += dx;

					if (dx > 0) {
						dx--;
					}

					if (
						x >= targetXMin &&
						x <= targetXMax &&
						y >= targetYMin &&
						y <= targetYMax
					) {
						count++;
						break;
					}
				}
			}
		}
		return count;
	}
}

export default Day17;
