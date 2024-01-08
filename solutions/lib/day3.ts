class Day3 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		let gammaBits: number[] = [];
		let epsilonBits: number[] = [];
		for (let i = 0; i < lines[0].length; i++) {
			let count0 = 0;
			let count1 = 0;
			for (let j = 0; j < lines.length; j++) {
				if (lines[j][i] === "0") {
					count0++;
				} else {
					count1++;
				}
			}

			gammaBits[i] = count0 > count1 ? 0 : 1;
			epsilonBits[i] = count0 > count1 ? 1 : 0;
		}

		const gamma = parseInt(gammaBits.join(""), 2);
		const epsilon = parseInt(epsilonBits.join(""), 2);
		return gamma * epsilon;
	}

	public solveForSecondStar(lines: string[]) {
		const oxygenGeneratorRating = this.calculateRating(lines, true);
		const co2ScrubberRating = this.calculateRating(lines, false);
		return oxygenGeneratorRating * co2ScrubberRating;
	}

	private calculateRating(lines: string[], isOxygenGeneratorRating: boolean) {
		for (let i = 0; i < lines[0].length && lines.length > 1; i++) {
			let count0 = 0;
			let count1 = 0;

			for (let j = 0; j < lines.length; j++) {
				if (lines[j][i] === "0") {
					count0++;
				} else {
					count1++;
				}
			}

			let criteria: number;
			if (isOxygenGeneratorRating) {
				criteria = count0 > count1 ? 0 : 1;
			} else {
				criteria = count0 > count1 ? 1 : 0;
			}

			lines = lines.filter((x) => x[i] === criteria.toString());
		}

		return parseInt(lines[0], 2);
	}
}

export default Day3;
