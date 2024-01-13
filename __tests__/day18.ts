import { expect, test } from "@jest/globals";
import Day18 from "../solutions/lib/day18";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar", () => {
	helpers.which.env = "test";
	helpers.clearDebug();

	const lib = new Day18();

	let lines: string[] = [];
	lines.push("[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]");
	lines.push("[[[5,[2,8]],4],[5,[[9,9],0]]]");
	lines.push("[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]");
	lines.push("[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]");
	lines.push("[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]");
	lines.push("[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]");
	lines.push("[[[[5,4],[7,7]],8],[[8,3],8]]");
	lines.push("[[9,3],[[9,9],[6,[4,9]]]]");
	lines.push("[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]");
	lines.push("[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]");

	expect(lib.solveForFirstStar(lines)).toBe(4_140);
});

test("SolveSecondStar", () => {
	helpers.which.env = "test";
	const lib = new Day18();

	let lines: string[] = [];
	lines.push("[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]");
	lines.push("[[[5,[2,8]],4],[5,[[9,9],0]]]");
	lines.push("[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]");
	lines.push("[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]");
	lines.push("[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]");
	lines.push("[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]");
	lines.push("[[[[5,4],[7,7]],8],[[8,3],8]]");
	lines.push("[[9,3],[[9,9],[6,[4,9]]]]");
	lines.push("[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]");
	lines.push("[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]");

	expect(lib.solveForSecondStar(lines)).toBe(3_993);
});
