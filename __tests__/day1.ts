import { expect, test } from "@jest/globals";
const lib = require("../solutions/lib/day1");
const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";

	let lines: string[] = [];
	lines.push("199");
	lines.push("200");
	lines.push("208");
	lines.push("210");
	lines.push("200");
	lines.push("207");
	lines.push("240");
	lines.push("269");
	lines.push("260");
	lines.push("263");
	expect(lib.solveForFirstStar(lines)).toBe(7);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";

	let lines: string[] = [];
	lines.push("199");
	lines.push("200");
	lines.push("208");
	lines.push("210");
	lines.push("200");
	lines.push("207");
	lines.push("240");
	lines.push("269");
	lines.push("260");
	lines.push("263");
	expect(lib.solveForSecondStar(lines)).toBe(5);
});
