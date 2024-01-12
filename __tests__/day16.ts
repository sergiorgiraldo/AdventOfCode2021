
	import { expect, test } from "@jest/globals";
	import Day16 from "../solutions/lib/day16";
	
	const helpers = require("../solutions/lib/helpers.ts");
	
	test("SolveFirstStar", () => {
		helpers.which.env = "test";
		helpers.clearDebug();
		
		const lib = new Day16();
	
		let lines:string[] = [];
		lines.push("D2FE28");

		expect(lib.solveForFirstStar(lines)).toBe(6);
	});
	
	test("SolveSecondStar", () => {
		helpers.which.env = "test";
		const lib = new Day16();
	
		let lines:string[] = [];
		lines.push("C200B40A82");

		expect(lib.solveForSecondStar(lines)).toBe(3);
	});
	