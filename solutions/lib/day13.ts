type Coord = {
	x: number;
	y: number;
};

type Fold = {
	dir: "x" | "y";
	value: number;
};

class Day13 {
	public helpers = require("./helpers");

	public solveForFirstStar(input: string[]) {
		const parsed = this.toInstructions(input);

		let grid = this.fillInDots(parsed.dots);

		grid = this.doFold(grid, parsed.folds[0]);

		return this.countVisible(grid);
	}

	public solveForSecondStar(lines: string[]) {
		const parsed = this.toInstructions(lines);

		let grid = this.fillInDots(parsed.dots);

		parsed.folds.forEach((f) => {
			grid = this.doFold(grid, f);
		});

		grid.forEach((it: number[]) => {
			console.log(it.join("").replace(/0/g, "."));
		});
	}

	private toInstructions(lines: string[]) {
		let dots = [] as Coord[];
		let folds = [] as Fold[];

		lines.forEach((line) => {
			if (line == "") return;

			if (line.startsWith("fold")) {
				const [dir, val] = line.replace("fold along ", "").split("=");
				folds.push({ dir: dir as "x" | "y", value: Number(val) });
			} else {
				const [x, y] = line.split(",").map(Number);
				dots.push({ x, y });
			}
		});

		return { dots, folds };
	}

	private fillInDots(dots: Coord[]) {
		const maxX = dots.reduce(
			(memo, val) => (val.x >= memo ? val.x : memo),
			0
		);
		const maxY = dots.reduce(
			(memo, val) => (val.y >= memo ? val.y : memo),
			0
		);

		const grid = Array(maxY + 1) as number[][];
		for (let idxY = 0; idxY <= maxY; idxY++) {
			grid[idxY] = Array(maxX + 1) as number[];
			for (let idxX = 0; idxX <= maxX; idxX++) {
				grid[idxY][idxX] = 0;
			}
		}

		dots.forEach((dot) => (grid[dot.y][dot.x] = 1));
		return grid;
	}

	private translateCoordForFold(c: Coord, f: Fold) {
		switch (f.dir) {
			case "x":
				return { x: f.value > c.x ? c.x : 2 * f.value - c.x, y: c.y };
			case "y":
				return { x: c.x, y: f.value > c.y ? c.y : 2 * f.value - c.y };
		}
	}

	private generateNewGridAfterFold(grid: number[][], f: Fold) {
		let lenX = f.dir == "x" ? f.value : grid[0].length;
		let lenY = f.dir == "x" ? grid.length : f.value;

		const newGrid = Array(lenY) as number[][];
		for (let idxY = 0; idxY < lenY; idxY++) {
			newGrid[idxY] = Array(lenX) as number[];
			for (let idxX = 0; idxX < lenX; idxX++) {
				newGrid[idxY][idxX] = grid[idxY][idxX];
			}
		}
		return newGrid;
	}

	private doFold(grid: number[][], f: Fold) {
		for (let idxY = 0; idxY < grid.length; idxY++) {
			for (let idxX = 0; idxX < grid[0].length; idxX++) {
				const translated = this.translateCoordForFold(
					{ x: idxX, y: idxY },
					f
				);
				grid[translated.y][translated.x] = Math.min(
					1,
					grid[idxY][idxX] + grid[translated.y][translated.x]
				);
			}
		}
		return this.generateNewGridAfterFold(grid, f);
	}

	private countVisible(grid: number[][]) {
		let visible = 0;
		grid.forEach((row) => row.forEach((val) => (visible += val)));
		return visible;
	}
}

export default Day13;
