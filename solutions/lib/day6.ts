class Day6 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const fishes = this.getFishes(lines[0].split(","));

		return this.simulate(fishes, 80);
	}

	public solveForSecondStar(lines: string[]) {
		const fishes = this.getFishes(lines[0].split(","));

		return this.simulate(fishes, 256);
	}

	private getFishes(items: string[]): number[] {
		let fishes: number[] = [];

		for (const age of items.map(Number)) {
			fishes[age] = (fishes[age] ?? 0) + 1;
		}
		return fishes;
	}

	private simulate(fishes: number[], days: number): number {
		for (let i = 0; i < days; i++) {
			const breedingFishesCount: number = fishes.shift() ?? 0;
			fishes[6] = (fishes[6] ?? 0) + breedingFishesCount;
			fishes[8] = breedingFishesCount;
		}

		return fishes.reduce((acc, cur) => acc + cur, 0);
	}
}

export default Day6;
