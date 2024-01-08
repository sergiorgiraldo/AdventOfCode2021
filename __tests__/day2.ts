
import { expect, test } from "@jest/globals";
import Day2 from '../solutions/lib/day2';

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day2();
	let lines:string[] = [];
	lines.push("forward 5");
	lines.push("down 5");
	lines.push("forward 8");
	lines.push("up 3");
	lines.push("down 8");
	lines.push("forward 2");
	expect(lib.solveForFirstStar(lines)).toBe(150);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day2();
	let lines:string[] = [];
	lines.push("forward 5");
	lines.push("down 5");
	lines.push("forward 8");
	lines.push("up 3");
	lines.push("down 8");
	lines.push("forward 2");
	expect(lib.solveForSecondStar(lines)).toBe(900);
});
