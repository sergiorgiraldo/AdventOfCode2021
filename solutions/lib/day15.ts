interface Node {
	cost: number;
	previous?: [number, number];
}

class Day15 {
	private adjacentVectors = [
		[0, -1],
		[0, 1],
		[-1, 0],
		[1, 0]
	];

	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const riskLevelsMap = lines.map((line) => line.split("").map(Number));

		const goal: [number, number] = [
			riskLevelsMap.length - 1,
			riskLevelsMap[0].length - 1
		];

		const nodes = this.aStar(goal, riskLevelsMap);
		const cost = nodes.get(goal.join(","))?.cost;

		return cost ?? 0;
	}

	public solveForSecondStar(lines: string[]) {
		const riskLevelsMap = lines.map((line) =>
			line.split("").map((x) => parseInt(x))
		);
		const largerMap = this.enlargeMap(riskLevelsMap, 5);

		const goal: [number, number] = [
			largerMap.length - 1,
			largerMap[0].length - 1
		];

		const nodes = this.aStar(goal, largerMap);
		const cost = nodes.get(goal.join(","))?.cost;

		return cost ?? 0;
	}

	/*
		https://en.wikipedia.org/wiki/A*_search_algorithm
		1. start at (0,0) (start position), add to queue
		2. see from the items in the queue which one has the lowest cost (min->current)
		3. if it is the goal, break the loop
		4. if it is not the goal, remove current from the queue and find the points that we can move to. Add to queue.
		5. repeat from step 2

	*/
	private aStar(goal: [number, number], map: number[][]) {
		const nodes = new Map<string, Node>([["0,0", { cost: 0 }]]);
		const queue: [number, number][] = [[0, 0]];

		while (queue.length > 0) {
			// [...queue.entries()].forEach(([index, item]) => {
			// 	this.helpers.dbg(
			// 		`queue index: ${index}`,
			// 		` queue item: `,
			// 		` ${item.join(",")}`,
			// 		`item  cost: `,
			// 		` ${nodes.get(item.join(","))!.cost}`
			// 	);
			// });
			const [currentIndex, current] = this.findMin(queue, nodes);
			queue.splice(currentIndex, 1);
			if (current.join(",") === goal.join(",")) {
				break;
			}
			// this.helpers.dbg(`queue after: ${current.join(",")}`);

			const currentNode = nodes.get(current.join(","));

			if (!currentNode) {
				throw new Error("Could not find node data");
			}

			for (const [dy, dx] of this.adjacentVectors) {
				const adjacentNodeY = current[0] + dy;
				const adjacentNodeX = current[1] + dx;
				if (!map[adjacentNodeY] || !map[adjacentNodeY][adjacentNodeX]) {
					continue;
				}
				const adjacentNodeAddress = `${adjacentNodeY},${adjacentNodeX}`;
				const cost =
					currentNode.cost + map[adjacentNodeY][adjacentNodeX];
				if (cost < (nodes.get(adjacentNodeAddress)?.cost ?? Infinity)) {
					nodes.set(adjacentNodeAddress, {
						cost: cost,
						previous: current
					});
					if (
						!queue.find(
							([y, x]) =>
								y === adjacentNodeY && x === adjacentNodeX
						)
					) {
						queue.push([adjacentNodeY, adjacentNodeX]);
					}
				}
			}
		}

		return nodes;
	}

	private findMin(queue: [number, number][], nodes: Map<string, Node>) {
		return [...queue.entries()].reduce(([minIndex, min], [curIndex, cur]) =>
			nodes.get(cur.join(","))!.cost < nodes.get(min.join(","))!.cost
				? [curIndex, cur]
				: [minIndex, min]
		);
	}

	private enlargeMap(original: number[][], factor: number) {
		const largerMap: number[][] = [];

		original.map((_, i) => {
			_.map((item, j) => {
				for (let k = 0; k < factor; k++) {
					for (let l = 0; l < factor; l++) {
						if (largerMap[k * original.length + i] === undefined) {
							largerMap[k * original.length + i] = [];
						}
						const value = item + k + l;
						const wrappedValue = ((value - 1) % 9) + 1;
						largerMap[k * original.length + i][l * original[i].length + j] = wrappedValue;
					}
				}
			});
		});

		return largerMap;
	}
}

export default Day15;
