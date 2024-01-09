
import { expect, test } from "@jest/globals";
import Day5 from '../solutions/lib/day5';

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day5();

	let lines:string[] = [];
	lines.push("0,9 -> 5,9");
	lines.push("8,0 -> 0,8");
	lines.push("9,4 -> 3,4");
	lines.push("2,2 -> 2,1");
	lines.push("7,0 -> 7,4");
	lines.push("6,4 -> 2,0");
	lines.push("0,9 -> 2,9");
	lines.push("3,4 -> 1,4");
	lines.push("0,0 -> 8,8");
	lines.push("5,5 -> 8,2	");
	expect(lib.solveForFirstStar(lines)).toBe(5);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day5();

	let lines:string[] = [];
	lines.push("0,9 -> 5,9");
	lines.push("8,0 -> 0,8");
	lines.push("9,4 -> 3,4");
	lines.push("2,2 -> 2,1");
	lines.push("7,0 -> 7,4");
	lines.push("6,4 -> 2,0");
	lines.push("0,9 -> 2,9");
	lines.push("3,4 -> 1,4");
	lines.push("0,0 -> 8,8");
	lines.push("5,5 -> 8,2	");
	expect(lib.solveForSecondStar(lines)).toBe(12);
});
