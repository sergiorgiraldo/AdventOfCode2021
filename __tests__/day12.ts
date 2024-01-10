import { expect, test } from "@jest/globals";
import Day12 from "../solutions/lib/day12";

const helpers = require("../solutions/lib/helpers.ts");

test("SolveFirstStar-1", () => {
	helpers.which.env = "test";
	const lib = new Day12();

	let lines: string[] = [];
	lines.push("dc-end");
	lines.push("HN-start");
	lines.push("start-kj");
	lines.push("dc-start");
	lines.push("dc-HN");
	lines.push("LN-dc");
	lines.push("HN-end");
	lines.push("kj-sa");
	lines.push("kj-HN");
	lines.push("kj-dc");
	expect(lib.solveForFirstStar(lines)).toBe(19);
});

test("SolveFirstStar-2", () => {
	helpers.which.env = "test";
	const lib = new Day12();

	let lines: string[] = [];
	lines.push("fs-end");
	lines.push("he-DX");
	lines.push("fs-he");
	lines.push("start-DX");
	lines.push("pj-DX");
	lines.push("end-zg");
	lines.push("zg-sl");
	lines.push("zg-pj");
	lines.push("pj-he");
	lines.push("RW-he");
	lines.push("fs-DX");
	lines.push("pj-RW");
	lines.push("zg-RW");
	lines.push("start-pj");
	lines.push("he-WI");
	lines.push("zg-he");
	lines.push("pj-fs");
	lines.push("start-RW");
	expect(lib.solveForFirstStar(lines)).toBe(226);
});

test("SolveSecondStar-1", () => {
	helpers.which.env = "test";
	const lib = new Day12();

	let lines: string[] = [];
	lines.push("dc-end");
	lines.push("HN-start");
	lines.push("start-kj");
	lines.push("dc-start");
	lines.push("dc-HN");
	lines.push("LN-dc");
	lines.push("HN-end");
	lines.push("kj-sa");
	lines.push("kj-HN");
	lines.push("kj-dc");
	expect(lib.solveForSecondStar(lines)).toBe(103);
});

test("SolveSecondStar-2", () => {
	helpers.which.env = "test";
	const lib = new Day12();

	let lines: string[] = [];
	lines.push("fs-end");
	lines.push("he-DX");
	lines.push("fs-he");
	lines.push("start-DX");
	lines.push("pj-DX");
	lines.push("end-zg");
	lines.push("zg-sl");
	lines.push("zg-pj");
	lines.push("pj-he");
	lines.push("RW-he");
	lines.push("fs-DX");
	lines.push("pj-RW");
	lines.push("zg-RW");
	lines.push("start-pj");
	lines.push("he-WI");
	lines.push("zg-he");
	lines.push("pj-fs");
	lines.push("start-RW");
	expect(lib.solveForSecondStar(lines)).toBe(3_509);
});
