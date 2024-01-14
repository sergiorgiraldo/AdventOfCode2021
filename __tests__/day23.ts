import { expect, test } from "@jest/globals";
import Day23 from "../solutions/lib/day23";

const helpers = require("../solutions/lib/helpers.ts");

test.skip("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day23();

	let lines: string[] = [];
	lines.push("#############");
	lines.push("#...........#");
	lines.push("###B#C#B#D###");
	lines.push("  #A#D#C#A#");
	lines.push("  #########");

	expect(lib.solveForFirstStar(lines)).toBe(12521);
});

test.skip("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day23();

	let lines: string[] = [];
	lines.push("#############");
	lines.push("#...........#");
	lines.push("###B#C#B#D###");
	lines.push("  #A#D#C#A#");
	lines.push("  #########");

	expect(lib.solveForSecondStar(lines)).toBe(-2);
});
