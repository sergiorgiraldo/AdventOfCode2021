
import { expect, test } from "@jest/globals";
import Day6 from '../solutions/lib/day6';

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day6();

	let lines:string[] = [];
	lines.push("3,4,3,1,2");
	expect(lib.solveForFirstStar(lines)).toBe(5_934);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day6();

	let lines:string[] = [];
	lines.push("3,4,3,1,2");
	expect(lib.solveForSecondStar(lines)).toBe(26_984_457_539);
});
