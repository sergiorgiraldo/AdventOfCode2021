
import { expect, test } from "@jest/globals";
import Day7 from '../solutions/lib/day7';

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day7();

	let lines:string[] = [];
	lines.push("16,1,2,0,4,2,7,1,2,14");
	expect(lib.solveForFirstStar(lines)).toBe(37);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day7();

	let lines:string[] = [];
	lines.push("16,1,2,0,4,2,7,1,2,14");
	expect(lib.solveForSecondStar(lines)).toBe(168);
});
