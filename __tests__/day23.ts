import { expect, test } from "@jest/globals";
import Day23 from "../solutions/lib/day23";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day23();

	let lines: string;
	lines=`#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;

	expect(lib.solveForFirstStar(lines)).toBe(12_521);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day23();

	let lines: string[] = [];
	lines.push("#############");
	lines.push("#...........#");
	lines.push("###B#C#B#D###");
	lines.push("  #A#D#C#A#");
	lines.push("  #########");

	expect(lib.solveForSecondStar(lines)).toBe(44_169);
});
