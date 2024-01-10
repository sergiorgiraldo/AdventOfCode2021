import { expect, test } from "@jest/globals";
import Day11 from "../solutions/lib/day11";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day11();

	let lines: string[] = [];
	lines.push("5483143223");
	lines.push("2745854711");
	lines.push("5264556173");
	lines.push("6141336146");
	lines.push("6357385478");
	lines.push("4167524645");
	lines.push("2176841721");
	lines.push("6882881134");
	lines.push("4846848554");
	lines.push("5283751526");
	expect(lib.solveForFirstStar(lines)).toBe(1_656);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day11();

	let lines: string[] = [];
	lines.push("5483143223");
	lines.push("2745854711");
	lines.push("5264556173");
	lines.push("6141336146");
	lines.push("6357385478");
	lines.push("4167524645");
	lines.push("2176841721");
	lines.push("6882881134");
	lines.push("4846848554");
	lines.push("5283751526");
	expect(lib.solveForSecondStar(lines)).toBe(195);
});
