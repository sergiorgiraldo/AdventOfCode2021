
import { expect, test } from "@jest/globals";
import Day9 from "../solutions/lib/day9";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day9();

	let lines:string[] = [];
	lines.push("2199943210");
	lines.push("3987894921");
	lines.push("9856789892");
	lines.push("8767896789");
	lines.push("9899965678");
	expect(lib.solveForFirstStar(lines)).toBe(15);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day9();

	let lines:string[] = [];
	lines.push("2199943210");
	lines.push("3987894921");
	lines.push("9856789892");
	lines.push("8767896789");
	lines.push("9899965678");
	expect(lib.solveForSecondStar(lines)).toBe(1_134);
});
