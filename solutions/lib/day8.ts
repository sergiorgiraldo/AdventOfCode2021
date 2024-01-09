/*
//PART 1: digital numbers formed from the letters below
 aaaa
b    c
b    c
 dddd
e    f
e    f
 gggg
*/

/*
//PART 2: digital numbers formed from the letters below
 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc
*/

type SignalMap = {
	[key: string]: any;
	a: string;
	b: string;
	c: string;
	d: string;
	e: string;
	f: string;
	g: string;
};

type Display = {
	signalPatterns: string[][];
	digitOutput: string[][];
};

class Day8 {
	public helpers = require("./helpers");
	
	public solveForFirstStar(lines: string[]) {
		const displays = this.getDisplays(lines);

		const UNIQUE_DIGIT_SEGMENT_LENGTHS: number[] = [2, 3, 4, 7];

		return displays
			.flatMap((i) => i.digitOutput)
			.filter((d) => UNIQUE_DIGIT_SEGMENT_LENGTHS.includes(d.length))
			.length;
	}

	public solveForSecondStar(lines: string[]) {
		const displays = this.getDisplays(lines);

		const permutations = this.getPermutations([
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g"
		]);

		const decodedDigits = displays.map((i) => {
			const allSignals = [...i.signalPatterns, ...i.digitOutput];

			const permutation = permutations
				.map((p) => ({
					[p[0]]: "a",
					[p[1]]: "b",
					[p[2]]: "c",
					[p[3]]: "d",
					[p[4]]: "e",
					[p[5]]: "f",
					[p[6]]: "g"
				}))
				.find((p) => {
					return allSignals.every((s) => this.checkSignal(p as SignalMap, s) !== -1);
				});

			return Number(
				i.digitOutput
					.map((s) => this.checkSignal(permutation as SignalMap, s).toString())
					.join("")
			);
		});

		return decodedDigits.reduce((acc, curr) => acc + curr, 0);
	}

	private getDisplays(lines: string[]): Display[] {
		return lines
			.map((line) => {
				const [signals, outputs] = line.split("|");

				return {
					signalPatterns: signals
						.trim()
						.split(" ")
						.map((s) => s.split("")),
					digitOutput: outputs
						.trim()
						.split(" ")
						.map((s) => s.split(""))
				};
			});
	}

	private getPermutations(input: string[]) {
		let result:string[][] = [];

		const permute = (arr: string[], m: string[] = []) => {
			if (arr.length === 0) {
				result.push(m);
			} 
			else{
				for (let i = 0; i < arr.length; i++){
					let curr:string[] = arr.slice();
					let next:string[] = curr.splice(i, 1);
					permute(curr.slice(), m.concat(next));
				}
			}
		};

		permute(input);

		return result;
	}

	private checkSignal(signalMap: SignalMap, signal: string[]): number {
		const DIGIT_SEGMENTs: string[] = [
			"abcefg",
			"cf",
			"acdeg",
			"acdfg",
			"bcdf",
			"abdfg",
			"abdefg",
			"acf",
			"abcdefg",
			"abcdfg"
		];

		const decodedSignal = signal
			.map((s:string) => signalMap[s])
			.sort()
			.join("");

		return DIGIT_SEGMENTs.findIndex((digit) => digit === decodedSignal);
	}
}

export default Day8;
