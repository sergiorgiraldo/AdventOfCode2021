import { expect, test } from "@jest/globals";
import Day4 from "../solutions/lib/day4";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day4();

	let lines: string[] = [];
	lines.push("7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1");
	lines.push("");
	lines.push("22 13 17 11  0");
	lines.push(" 8  2 23  4 24");
	lines.push("21  9 14 16  7");
	lines.push(" 6 10  3 18  5");
	lines.push(" 1 12 20 15 19");
	lines.push("");
	lines.push(" 3 15  0  2 22");
	lines.push(" 9 18 13 17  5");
	lines.push("19  8  7 25 23");
	lines.push("20 11 10 24  4");
	lines.push("14 21 16 12  6");
	lines.push("");
	lines.push("14 21 17 24  4");
	lines.push("10 16 15  9 19");
	lines.push("18  8 23 26 20");
	lines.push("22 11 13  6  5");
	lines.push(" 2  0 12  3  7");
	expect(lib.solveForFirstStar(lines)).toBe(4_512);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day4();

	let lines: string[] = [];
	lines.push("7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1");
	lines.push("");
	lines.push("22 13 17 11  0");
	lines.push(" 8  2 23  4 24");
	lines.push("21  9 14 16  7");
	lines.push(" 6 10  3 18  5");
	lines.push(" 1 12 20 15 19");
	lines.push("");
	lines.push(" 3 15  0  2 22");
	lines.push(" 9 18 13 17  5");
	lines.push("19  8  7 25 23");
	lines.push("20 11 10 24  4");
	lines.push("14 21 16 12  6");
	lines.push("");
	lines.push("14 21 17 24  4");
	lines.push("10 16 15  9 19");
	lines.push("18  8 23 26 20");
	lines.push("22 11 13  6  5");
	lines.push(" 2  0 12  3  7");
	expect(lib.solveForSecondStar(lines)).toBe(1_924);
});
