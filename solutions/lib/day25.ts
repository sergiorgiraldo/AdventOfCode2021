enum FieldType {
	Empty = ".",
	East = ">",
	South = "v"
}

class Day25 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const map = lines.map((line) => line.split("") as FieldType[]);

		let prevMap: FieldType[][] = map.map((y) =>
			y.map((x) => FieldType.Empty)
		);
		let currentMap = map;
		let i = 0;
		while (!this.compareArrays(prevMap, currentMap)) {
			prevMap = currentMap;
			currentMap = this.step(currentMap);
			i++;
		}

		return i;
	}

	public solveForSecondStar(lines: string[]) {
		return 0;
	}

	private step(map: FieldType[][]) {
		const mapAfterMoveEast = this.moveEast(map);
		const mapAfterMoveSouth = this.moveSouth(mapAfterMoveEast);

		return mapAfterMoveSouth;
	}

	private moveEast(map: FieldType[][]) {
		const newMap = map.map((_) => [] as FieldType[]);
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (newMap[i][j]) {
					continue;
				}

				if (
					map[i][j] !== FieldType.East ||
					map[i][(j + 1) % map[i].length] !== FieldType.Empty
				) {
					newMap[i][j] = map[i][j];
					continue;
				}

				newMap[i][j] = FieldType.Empty;
				newMap[i][(j + 1) % map[i].length] = map[i][j];
			}
		}

		return newMap;
	}

	private moveSouth(map: FieldType[][]) {
		const newMap = map.map((_) => [] as FieldType[]);
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (newMap[i][j]) {
					continue;
				}

				if (
					map[i][j] !== FieldType.South ||
					map[(i + 1) % map.length][j] !== FieldType.Empty
				) {
					newMap[i][j] = map[i][j];
					continue;
				}

				newMap[i][j] = FieldType.Empty;
				newMap[(i + 1) % map.length][j] = map[i][j];
			}
		}

		return newMap;
	}

	private compareArrays<T>(array1: T[][], array2: T[][]) {
		for (let i = 0; i < array1.length; i++) {
			for (let j = 0; j < array1[i].length; j++) {
				if (array1[i][j] !== array2[i][j]) {
					return false;
				}
			}
		}

		return true;
	}
}

export default Day25;
