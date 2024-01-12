class Day14 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		return this.simulatePolymers(lines, 10);
	}

	public solveForSecondStar(lines: string[]) {
		return this.simulatePolymers(lines, 40);
	}

	private simulatePolymers(input: string[], stepsNumber: number): number {
		let polymer = this.createPolymer(input[0]);

		const rules = this.createRules(input.slice(1));

		for (let i = 0; i < stepsNumber; i++) {
			polymer = this.insertElements(polymer, rules);
		}

		const counts = this.countElements(polymer);

		const sortedCounts = [...counts.entries()].sort(
			([_, count1], [__, count2]) => count1 - count2
		);

		return sortedCounts[sortedCounts.length - 1][1] - sortedCounts[0][1];
	}

	private createPolymer(line: string): Map<string, number> {
		const polymer = new Map<string, number>();
		line.split("").reduce((prev, cur) => {
			const elementCount = polymer.get(prev + cur) ?? 0;
			polymer.set(prev + cur, elementCount + 1);

			return cur;
		});
		this.helpers.dbg(JSON.stringify([...polymer], null, 2));
		return polymer;
	}

	private createRules(input: string[]): Map<string, string> {
		const rules = new Map<string, string>();
		for (const line of input) {
			const [elementPair, element] = line.split(" -> ");
			rules.set(elementPair, element);
		}

		return rules;
	}

	private insertElements(polymer: Map<string, number>, rules: Map<string, string>): Map<string, number> {
		const newPolymer = new Map<string, number>();
		for (const [elementPair, count] of polymer) {
			const newElement = rules.get(elementPair);
			if (newElement === undefined) {
				newPolymer.set(elementPair, count);
				continue;
			}

			const newElement1 = elementPair[0] + newElement;
			const newElement1Count = newPolymer.get(newElement1) ?? 0;
			newPolymer.set(newElement1, newElement1Count + count);

			const newElement2 = newElement + elementPair[1];
			const newElement2Count = newPolymer.get(newElement2) ?? 0;
			newPolymer.set(newElement2, newElement2Count + count);
		}

		return newPolymer;
	}

	private countElements(polymer: Map<string, number>): Map<string, number> {
		const counts = new Map<string, number>();

		for (const [elementPair, elementPairCount] of polymer) {
			for (const element of elementPair) {
				const elementCount = counts.get(element) ?? 0;
				counts.set(element, elementCount + elementPairCount);
			}
		}

		for (const [element, count] of counts) {
			counts.set(element, Math.ceil(count / 2));
		}

		return counts;
	}
}

export default Day14;
