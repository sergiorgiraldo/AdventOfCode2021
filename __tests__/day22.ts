import { expect, test } from "@jest/globals";
import Day22 from "../solutions/lib/day22";

const helpers = require("../solutions/lib/helpers.ts");

test.skip("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day22();

	let lines: string[] = [];
	lines.push("on x=10..12,y=10..12,z=10..12");
	lines.push("on x=11..13,y=11..13,z=11..13");
	lines.push("off x=9..11,y=9..11,z=9..11");
	lines.push("on x=10..10,y=10..10,z=10..10");

	expect(lib.solveForFirstStar(lines)).toBe(39);
});

test.skip("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day22();

	let lines: string[] = [];
	lines.push("on x=10..12,y=10..12,z=10..12");
	lines.push("on x=11..13,y=11..13,z=11..13");
	lines.push("off x=9..11,y=9..11,z=9..11");
	lines.push("on x=10..10,y=10..10,z=10..10");

	expect(lib.solveForSecondStar(lines)).toBe(-2);
});
