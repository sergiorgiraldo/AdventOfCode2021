import { expect, test } from "@jest/globals";
import Day3 from "../solutions/lib/day3";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day3();

	let lines: string[] = [];
	lines.push("00100");
	lines.push("11110");
	lines.push("10110");
	lines.push("10111");
	lines.push("10101");
	lines.push("01111");
	lines.push("00111");
	lines.push("11100");
	lines.push("10000");
	lines.push("11001");
	lines.push("00010");
	lines.push("01010");
	expect(lib.solveForFirstStar(lines)).toBe(198);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day3();

	let lines: string[] = [];
	lines.push("00100");
	lines.push("11110");
	lines.push("10110");
	lines.push("10111");
	lines.push("10101");
	lines.push("01111");
	lines.push("00111");
	lines.push("11100");
	lines.push("10000");
	lines.push("11001");
	lines.push("00010");
	lines.push("01010");
	expect(lib.solveForSecondStar(lines)).toBe(230);
});
