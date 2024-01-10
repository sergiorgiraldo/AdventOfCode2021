const delimiters: {[key: string]: {closing: string, errorScore: number, autocompleteScore: number}} = {
	"(": {
		closing: ")",
		errorScore: 3,
		autocompleteScore: 1
	},
	"[": {
		closing: "]",
		errorScore: 57,
		autocompleteScore: 2
	},
	"{": {
		closing: "}",
		errorScore: 1197,
		autocompleteScore: 3
	},
	"<": {
		closing: ">",
		errorScore: 25137,
		autocompleteScore: 4
	}
};

type OpeningDelimiters = keyof typeof delimiters;
class Day10 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		let totalScore:number = 0;

		lines.forEach((line:string) => {
			const stack: OpeningDelimiters[] = [];

			for (const char of line) {
				const delimiterRecord = delimiters[char as OpeningDelimiters];

				if (delimiterRecord) {
					stack.push(char as OpeningDelimiters);
					continue;
				}

				const lastDelimiter = stack.pop();

				if (lastDelimiter === undefined || delimiters[lastDelimiter].closing !== char) {
					const score = Object.values(delimiters).find((delim) => delim.closing === char)?.errorScore;

					totalScore += score??0;
					break;
				}
			}
		});

		return totalScore;
	}

	public solveForSecondStar(lines: string[]) {
		let scores: number[] = [];

		lines.forEach((line:string) => {
			let stack: OpeningDelimiters[] = [];

			for (const char of line) {
				const delimiterRecord = delimiters[char as OpeningDelimiters];

				if (delimiterRecord) {
					stack.push(char as OpeningDelimiters);
					continue;
				}

				const lastDelimiter = stack.pop();

				//corrupted line, ignore
				if (lastDelimiter === undefined || delimiters[lastDelimiter].closing !== char) {
					stack = [];
					break;
				}
			}

			if (stack.length > 0) {
				let score = stack.reduceRight((acc: number, curr) => acc * 5 + delimiters[curr].autocompleteScore, 0);

				scores.push(score);
			}
		});

		scores.sort((a, b) => a - b);

		return scores[Math.floor(scores.length / 2)];
	}
}

export default Day10;
