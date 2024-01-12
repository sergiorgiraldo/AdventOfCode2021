
	import { expect, test } from "@jest/globals";
	import Day15 from "../solutions/lib/day15";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		helpers.clearDebug();
		
		const lib = new Day15();
	
		let lines:string[] = [];
		lines.push("1163751742");
lines.push("1381373672");
lines.push("2136511328");
lines.push("3694931569");
lines.push("7463417111");
lines.push("1319128137");
lines.push("1359912421");
lines.push("3125421639");
lines.push("1293138521");
lines.push("2311944581");

		expect(lib.solveForFirstStar(lines)).toBe(40);
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new Day15();
	
		let lines:string[] = [];
		lines.push("1163751742");
lines.push("1381373672");
lines.push("2136511328");
lines.push("3694931569");
lines.push("7463417111");
lines.push("1319128137");
lines.push("1359912421");
lines.push("3125421639");
lines.push("1293138521");
lines.push("2311944581");

		expect(lib.solveForSecondStar(lines)).toBe(315);
	});
	