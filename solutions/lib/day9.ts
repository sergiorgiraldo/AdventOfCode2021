class Day9 {
	public helpers = require("./helpers");

	private BASIN_RIDGE = 9;

	public solveForFirstStar(lines: string[]) {
		const input:number[][] = this.parse(lines);

		let lowPoints = 0;

		input.map((_, y)=>{
			_.map((point, x)=>{
				const neighbours = this.getNeighbours(x, y, input);
				const isLowpoint = neighbours.every((p) => p === null || p > point);

				if (isLowpoint) {
					lowPoints += point + 1;
				}
			})
		});

		return lowPoints;
	}

	public solveForSecondStar(lines: string[]) {
		const input = this.parse(lines);

		let visited = new Set<string>();
		let basins: Set<string>[] = [];

		input.map((_, y)=>{
			_.map((point, x)=>{
				if (!visited.has(`${x},${y}`) && point !== this.BASIN_RIDGE) {
					const newVisitedLocations = this.mapBasin(x, y, input);
					
					basins.push(newVisitedLocations);
					
					visited = new Set([...visited, ...newVisitedLocations]);			
				}
			})
		});

		const [biggestBasin1, biggestBasin2, biggestBasin3] = basins.sort(
			(a, b) => b.size - a.size
		);

		return biggestBasin1.size * biggestBasin2.size * biggestBasin3.size;
	}

	private parse(lines: string[]): number[][] {
		return lines.map((l) => l.split("").map(Number));
	}

	private getNeighbours(
		x: number,
		y: number,
		map: number[][]
	): [
		north: number | null,
		east: number | null,
		south: number | null,
		west: number | null
	] {
		return [
			map[y - 1]?.[x] ?? null,
			map[y]?.[x + 1] ?? null,
			map[y + 1]?.[x] ?? null,
			map[y]?.[x - 1] ?? null
		];
	}

	private mapBasin(x: number, y: number, map: number[][]): Set<string> {
		let visited = new Set<string>();

		const visit = (x: number, y: number) => {
			visited.add(`${x},${y}`);

			const [north, east, south, west] = this.getNeighbours(x, y, map);

			if (
				north !== null &&
				north !== this.BASIN_RIDGE &&
				!visited.has(`${x},${y - 1}`)
			) {
				visit(x, y - 1);
			}

			if (
				east !== null &&
				east !== this.BASIN_RIDGE &&
				!visited.has(`${x + 1},${y}`)
			) {
				visit(x + 1, y);
			}

			if (
				south !== null &&
				south !== this.BASIN_RIDGE &&
				!visited.has(`${x},${y + 1}`)
			) {
				visit(x, y + 1);
			}

			if (
				west !== null &&
				west !== this.BASIN_RIDGE &&
				!visited.has(`${x - 1},${y}`)
			) {
				visit(x - 1, y);
			}
		};

		visit(x, y);

		return visited;
	}
}

export default Day9;
