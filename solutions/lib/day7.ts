class Day7 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const positions = lines[0].split(",").map(Number);

		const minFuel = this.getMinFuel(positions, (n) => Math.abs(n));

		return minFuel;
	}

	public solveForSecondStar(lines: string[]) {
		const positions = lines[0].split(",").map(Number);

		const minFuel = this.getMinFuel(positions, (n) => this.getTriangularNumber(Math.abs(n)))

		return minFuel;
	}

	private getMinFuel(positions: number[], fuelFunc: (n: number) => number): number {
		let min = positions.reduce((a, b) => Math.min(a, b), Number.MAX_VALUE);
		let max = positions.reduce((a, b) => Math.max(a, b), Number.MIN_VALUE);

		const results = [];

		for (let i = min; i <= max; i++) {
			results.push(positions.reduce((acc, n) => acc + fuelFunc(n - i), 0));
		}

		return Math.min.apply(null, results);
	}

	private getTriangularNumber(n: number): number {
		const abs = Math.abs(n);
		
		return (abs / 2) * (abs + 1) * (abs / n) || 0;
	  }
}

export default Day7;
