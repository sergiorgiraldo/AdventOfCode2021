interface Rule {
	/** First digit index of the model number */
	i: number;

	/** Second digit index of the model number */
	j: number;

	/** For a valid model number, this plus the first digit must equal second */
	addend: number;
}

class Day24 {
	public helpers = require("./helpers");

	/** Submarine model  number are always fourteen-digit numbers */
	private MAX_MODEL_NUMBER_INDEX = 13;

	public solveForFirstStar(lines: string) {
		let modelNumber = 0;
		
		const rules = this.parseRules(lines);
		this.helpers.dbg(JSON.stringify([rules], null, 2));
		for (const { i, j, addend } of rules) {
			const [a, b] = addend > 0 ? [9 - addend, 9] : [9, 9 + addend];
			modelNumber += a * 10 ** (this.MAX_MODEL_NUMBER_INDEX - i);
			modelNumber += b * 10 ** (this.MAX_MODEL_NUMBER_INDEX - j);
		}
		return modelNumber;
	}

	public solveForSecondStar(lines: string) {
		let modelNumber = 0;
		
		const rules = this.parseRules(lines);
		
		for (const { i, j, addend } of rules) {
			const [a, b] = addend > 0 ? [1, 1 + addend] : [1 - addend, 1];
			modelNumber += a * 10 ** (this.MAX_MODEL_NUMBER_INDEX - i);
			modelNumber += b * 10 ** (this.MAX_MODEL_NUMBER_INDEX - j);
		}
		return modelNumber;
	}

	/** Returns rules for a valid model number ordered by most significant digit */
	/*
	if i check the commands in the ALU, on each of the 14 instructions, i see that only the commands 2,3 and 9 are relevant
	all other commands are always the same, first always `mul x 0`, second always `add x z`, etc
	*/
	private parseRules(lines: string): Rule[] {
		const rules: Rule[] = [];
		
		const stack: [number, number][] = [];

		const firstLine = lines.split("\ninp w")[0];
		const matches = [...firstLine.matchAll(/-?\d+/g)];
		this.helpers.dbg(firstLine);
		matches.forEach((d) => this.helpers.dbg(d));

		lines
			.split("\ninp w")
			.map((block) => [...block.matchAll(/-?\d+/g)].map((d) => +d))
			.forEach(({ [2]: a, [3]: b, [9]: c }, j) => {
				this.helpers.dbg(a,"::",b,"::",c,"::",j);

				if (a === 1) {
					stack.push([c, j]);
				} 
				else {
					const [c, i] = stack.pop()!;
					const addend = b + c;
					rules.push({ i, j, addend });
				}
			});
		return rules.sort((a, b) => a.i - b.i);
	}
}

export default Day24;
