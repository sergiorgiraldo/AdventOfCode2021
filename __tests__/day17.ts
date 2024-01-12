
	import { expect, test } from "@jest/globals";
	import Day17 from "../solutions/lib/day17";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		helpers.clearDebug();
		
		const lib = new Day17();
	
		let lines:string[] = [];
		lines.push("target area: x=20..30, y=-10..-5");

		expect(lib.solveForFirstStar(lines)).toBe(45);
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new Day17();
	
		let lines:string[] = [];
		lines.push("target area: x=20..30, y=-10..-5");

		expect(lib.solveForSecondStar(lines)).toBe(112);
	});
	