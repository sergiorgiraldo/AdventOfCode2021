
	import { expect, test } from "@jest/globals";
	import Day14 from "../solutions/lib/day14";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		helpers.clearDebug();
		const lib = new Day14();
	
		let lines:string[] = [];
		lines.push("NNCB");
lines.push("");
lines.push("CH -> B");
lines.push("HH -> N");
lines.push("CB -> H");
lines.push("NH -> C");
lines.push("HB -> C");
lines.push("HC -> B");
lines.push("HN -> C");
lines.push("NN -> C");
lines.push("BH -> H");
lines.push("NC -> B");
lines.push("NB -> B");
lines.push("BN -> B");
lines.push("BB -> N");
lines.push("BC -> B");
lines.push("CC -> N");
lines.push("CN -> C");

		expect(lib.solveForFirstStar(lines)).toBe(1588);
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new Day14();
	
		let lines:string[] = [];
		lines.push("NNCB");
lines.push("");
lines.push("CH -> B");
lines.push("HH -> N");
lines.push("CB -> H");
lines.push("NH -> C");
lines.push("HB -> C");
lines.push("HC -> B");
lines.push("HN -> C");
lines.push("NN -> C");
lines.push("BH -> H");
lines.push("NC -> B");
lines.push("NB -> B");
lines.push("BN -> B");
lines.push("BB -> N");
lines.push("BC -> B");
lines.push("CC -> N");
lines.push("CN -> C");

		expect(lib.solveForSecondStar(lines)).toBe(2_188_189_693_529);
	});
	