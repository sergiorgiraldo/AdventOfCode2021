interface Cube {
	position: [number, number][];
	weight: 1 | -1;
}
class Day22 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const predicate = (cube: Cube) => cube.position.every((coord) => coord[0] >= -50 && coord[1] <= 50);

		return this.setCubes(lines, predicate);
	}

	public solveForSecondStar(lines: string[]) {
		const predicate = (_: Cube) => true;

		return this.setCubes(lines, predicate);
	}

	private setCubes(lines: string[], predicate: (cube: Cube) => boolean) {
		const cubesToProcess = this.parseCubes(lines).filter(predicate);

		this.helpers.dbg(cubesToProcess.length);
		
		const cubesOnGrid = this.placeCubesOnGrid(cubesToProcess);

		const count = this.countCubes(cubesOnGrid);

		return count;		
	}

	private parseCubes(lines: string[]): Cube[] {
		return lines.map((line) => {
			const weight = line.startsWith("on") ? 1 : -1;
			const match = line.matchAll(/([\d-]+)..([\d-]+)/g);
			return {
				position: [...match].map((groups) => [
					parseInt(groups[1]),
					parseInt(groups[2])
				]),
				weight
			};
		});
	}

	private placeCubesOnGrid(cubes: Cube[]) {
		let cubesOnGrid: Cube[] = [];

		for (const cube of cubes) {
			const newCubesOnGrid = [...cubesOnGrid];
			for (const cubeOnGrid of cubesOnGrid) {
				const intersection = cube.position.map(
					(_, i) =>
						[
							Math.max(
								cube.position[i][0],
								cubeOnGrid.position[i][0]
							),
							Math.min(
								cube.position[i][1],
								cubeOnGrid.position[i][1]
							)
						] as [number, number]
				);

				if (
					intersection.some(
						(coordinate) => coordinate[0] > coordinate[1]
					)
				) {
					continue;
				}

				newCubesOnGrid.push({
					position: intersection,
					weight: -cubeOnGrid.weight as 1 | -1
				});
			}

			cubesOnGrid = newCubesOnGrid;

			if (cube.weight === 1) {
				cubesOnGrid.push(cube);
			}
		}

		return cubesOnGrid;
	}

	private countCubes(cubes: Cube[]) {
		return cubes.reduce(
			(accCube, curCube) =>
				accCube +
				curCube.weight *
					curCube.position.reduce(
						(accCoord, curCoord) =>
							accCoord * (curCoord[1] - curCoord[0] + 1),
						1
					),
			0
		);
	}
}

export default Day22;
