
import { expect, test } from "@jest/globals";
import Day13 from "../solutions/lib/day13";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day13();

	let lines:string[] = [];
	lines.push("6,10");
	lines.push("0,14");
	lines.push("9,10");
	lines.push("0,3");
	lines.push("10,4");
	lines.push("4,11");
	lines.push("6,0");
	lines.push("6,12");
	lines.push("4,1");
	lines.push("0,13");
	lines.push("10,12");
	lines.push("3,4");
	lines.push("3,0");
	lines.push("8,4");
	lines.push("1,10");
	lines.push("2,14");
	lines.push("8,10");
	lines.push("9,0");
	lines.push("");
	lines.push("fold along y=7");
	lines.push("fold along x=5");
	expect(lib.solveForFirstStar(lines)).toBe(17);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day13();

	let lines:string[] = [];
	lines.push("6,10");
	lines.push("0,14");
	lines.push("9,10");
	lines.push("0,3");
	lines.push("10,4");
	lines.push("4,11");
	lines.push("6,0");
	lines.push("6,12");
	lines.push("4,1");
	lines.push("0,13");
	lines.push("10,12");
	lines.push("3,4");
	lines.push("3,0");
	lines.push("8,4");
	lines.push("1,10");
	lines.push("2,14");
	lines.push("8,10");
	lines.push("9,0");
	lines.push("");
	lines.push("fold along y=7");
	lines.push("fold along x=5");
	expect(lib.solveForSecondStar(lines)).toBe("O");
});
