import { expect, test } from "@jest/globals";
import Day24 from "../solutions/lib/day24";

const helpers = require("../solutions/lib/helpers.ts");

test.skip("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day24();

	let lines: string[] = [];

	expect(lib.solveForFirstStar(lines)).toBe();
});

test.skip("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day24();

	let lines: string[] = [];

	expect(lib.solveForSecondStar(lines)).toBe(-2);
});
