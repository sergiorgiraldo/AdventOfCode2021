import { expect, test } from "@jest/globals";
import Day21 from "../solutions/lib/day21";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day21();

	let lines: string[] = [];
	lines.push("Player 1 starting position: 4");
	lines.push("Player 2 starting position: 8");

	expect(lib.solveForFirstStar(lines)).toBe(739_785);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day21();

	let lines: string[] = [];
	lines.push("Player 1 starting position: 4");
	lines.push("Player 2 starting position: 8");

	expect(lib.solveForSecondStar(lines)).toBe(444_356_092_776_315);
});
