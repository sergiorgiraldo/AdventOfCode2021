class Day11 {
	public helpers = require("./helpers");

	private READY_TO_FLASH = 9;
	private STEPS = 100;

	public solveForFirstStar(lines: string[]) {
		let grid: number[][] = lines.map((l) => l.split("").map(Number));
		let flashed = 0;
	  
		for (let i = 0; i < this.STEPS; i++) {
		  const [newGrid, newFlashed] = this.executeStep(grid);
		  flashed += newFlashed;
		  grid = newGrid;
		}
	  
		return flashed;
	}

	public solveForSecondStar(lines: string[]) {
		let grid: number[][] = lines.map((l) => l.split("").map(Number));

		const gridSize = grid.length * grid[0].length;
		
		let stepNumber = 0;
	  
		while (true) {
		  const [newGrid, newFlashed] = this.executeStep(grid);
		  stepNumber += 1;
	  
		  if (newFlashed === gridSize) {
			return stepNumber;
		  }
		  else{
		  	grid = newGrid;
		  }
		}
	}

	private executeStep(grid: number[][]): [number[][], number] {
		let alreadyFlashed: string[] = [];
	  
		// Each cell of the grid increases by 1
		grid = grid.map((row) => row.map((cell) => cell + 1));
	  
		do {
		  // For each cell whose value is 9 or more, also increase by 1 all the adjacent cells
		  for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
			  if (
				grid[y][x] > this.READY_TO_FLASH &&
				!alreadyFlashed.includes(`${x},${y}`)
			  ) {
				alreadyFlashed.push(`${x},${y}`);
	  
				// Increase all the adjacent cells
				for (let yy = y - 1; yy <= y + 1; yy++) {
				  for (let xx = x - 1; xx <= x + 1; xx++) {
					if (
					  xx >= 0 &&
					  xx < grid[y].length &&
					  yy >= 0 &&
					  yy < grid.length
					) {
					  grid[yy][xx]++;
					}
				  }
				}
			  }
			}
		  }
		} while (
		  grid.some((row, y) =>
			row.some(
			  (cell, x) =>
				cell > this.READY_TO_FLASH && !alreadyFlashed.includes(`${x},${y}`),
			),
		  )
		);
	  
		// Set to 0 all the cells that have flashed
		return [
		  grid.map((row, y) =>
			row.map((cell, x) => (alreadyFlashed.includes(`${x},${y}`) ? 0 : cell)),
		  ),
		  alreadyFlashed.length,
		];
	  }
}

export default Day11;
