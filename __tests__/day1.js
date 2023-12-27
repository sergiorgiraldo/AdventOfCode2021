const lib = require("../solutions/lib/day1");

test("SolveFirstStar", () => {
	let lines = [];
	lines.push("199");
	lines.push("200");
	lines.push("208");
	lines.push("210");
	lines.push("200");
	lines.push("207");
	lines.push("240");
	lines.push("269");
	lines.push("260");
	lines.push("263");
	expect(lib.solveForFirstStar(lines)).toBe(7);
});

test("SolveSecondStar", () => {
	let lines = [];
	lines.push("199");
	lines.push("200");
	lines.push("208");
	lines.push("210");
	lines.push("200");
	lines.push("207");
	lines.push("240");
	lines.push("269");
	lines.push("260");
	lines.push("263");
	expect(lib.solveForSecondStar(lines)).toBe(5);
});
