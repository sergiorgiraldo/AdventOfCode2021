import { expect, test } from "@jest/globals";
import Day10 from "../solutions/lib/day10";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	const lib = new Day10();

	let lines: string[] = [];
	lines.push("[({(<(())[]>[[{[]{<()<>>");
	lines.push("[(()[<>])]({[<{<<[]>>(");
	lines.push("{([(<{}[<>[]}>{[]{[(<()>");
	lines.push("(((({<>}<{<{<>}{[]{[]{}");
	lines.push("[[<[([]))<([[{}[[()]]]");
	lines.push("[{[{({}]{}}([{[{{{}}([]");
	lines.push("{<[[]]>}<{[{[{[]{()[[[]");
	lines.push("[<(<(<(<{}))><([]([]()");
	lines.push("<{([([[(<>()){}]>(<<{{");
	lines.push("<{([{{}}[<[[[<>{}]]]>[]]");
	expect(lib.solveForFirstStar(lines)).toBe(26_397);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day10();

	let lines: string[] = [];
	lines.push("[({(<(())[]>[[{[]{<()<>>");
	lines.push("[(()[<>])]({[<{<<[]>>(");
	lines.push("{([(<{}[<>[]}>{[]{[(<()>");
	lines.push("(((({<>}<{<{<>}{[]{[]{}");
	lines.push("[[<[([]))<([[{}[[()]]]");
	lines.push("[{[{({}]{}}([{[{{{}}([]");
	lines.push("{<[[]]>}<{[{[{[]{()[[[]");
	lines.push("[<(<(<(<{}))><([]([]()");
	lines.push("<{([([[(<>()){}]>(<<{{");
	lines.push("<{([{{}}[<[[[<>{}]]]>[]]");
	expect(lib.solveForSecondStar(lines)).toBe(288_957);
});
