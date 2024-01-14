import { expect, test } from "@jest/globals";
import Day25 from "../solutions/lib/day25";

const helpers = require("../solutions/lib/helpers.ts");

test.skip("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day25();

	let lines: string[] = [];
	lines.push("v...>>.vv>");
	lines.push(".vv>>.vv..");
	lines.push(">>.>v>...v");
	lines.push(">>v>>.>.v.");
	lines.push("v>v.vv.v..");
	lines.push(">.>>..v...");
	lines.push(".vv..>.>v.");
	lines.push("v.v..>>v.v");
	lines.push("....v..v.>");

	expect(lib.solveForFirstStar(lines)).toBe(58);
});

test.skip("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day25();

	let lines: string[] = [];
	lines.push("v...>>.vv>");
	lines.push(".vv>>.vv..");
	lines.push(">>.>v>...v");
	lines.push(">>v>>.>.v.");
	lines.push("v>v.vv.v..");
	lines.push(">.>>..v...");
	lines.push(".vv..>.>v.");
	lines.push("v.v..>>v.v");
	lines.push("....v..v.>");

	expect(lib.solveForSecondStar(lines)).toBe(-2);
});
