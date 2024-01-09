const { groupBy } = require("lodash"); 

type VentDirection = [
	start: [x: number, y: number],
	end: [x: number, y: number]
];
class Day5 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const input = this.parse(lines);

		const ventMap = this.getVentMap(input);

		return this.computeOverlappingVents(ventMap);
	}

	public solveForSecondStar(lines: string[]) {
		const input = this.parse(lines);

		const ventMap = this.getVentMap(input, true);

		return this.computeOverlappingVents(ventMap);
	}

	private parse(lines: string[]): VentDirection[] {
		return lines
			.map((r) => {
				const [start, end] = r.split(" -> ");
				const [x, y] = start.split(",").map(Number);
				const [x2, y2] = end.split(",").map(Number);

				return [
					[x, y],
					[x2, y2]
				];
			});
	}

	private getVentMap(input: VentDirection[], allowDiagonal: boolean = false): [number, number][] {
		const ventMap: [number, number][] = [];

		for (const [[x, y], [x2, y2]] of input) {
			const minX = Math.min(x, x2);
			const maxX = Math.max(x, x2);
			const minY = Math.min(y, y2);
			const maxY = Math.max(y, y2);

			if (x === x2) {
				// Vertical
				for (let i = minY; i <= maxY; i++) {
					ventMap.push([x, i]);
				}
			} else if (y === y2) {
				// Horizontal
				for (let i = minX; i <= maxX; i++) {
					ventMap.push([i, y]);
				}
			} else if (x < x2) {
				// Diagonal
				if (!allowDiagonal) {
					continue;
				}

				let yStep = y < y2 ? 1 : -1;
				let currentY = y;

				for (let i = x; i <= x2; i++) {
					ventMap.push([i, currentY]);
					currentY += yStep;
				}
			} else {
				// Diagonal
				if (!allowDiagonal) {
					continue;
				}

				let yStep = y2 < y ? 1 : -1;
				let currentY = y2;

				for (let i = x2; i <= x; i++) {
					ventMap.push([i, currentY]);
					currentY += yStep;
				}
			}
		}

		return ventMap;
	}

	private computeOverlappingVents(ventMap: [number, number][]): number {
		const groupedCells = groupBy(ventMap); //lodash magic

		const cellsWithMoreThanOnePass = Object.keys(groupedCells).filter(
			(i) => groupedCells[i].length > 1
		).length;

		return cellsWithMoreThanOnePass;
	}
}

export default Day5;
