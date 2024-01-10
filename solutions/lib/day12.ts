class Day12 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const graph = this.buildGraph(lines);

		const count = this.countPaths(graph);

		return count;
	}

	public solveForSecondStar(lines: string[]) {
		const graph = this.buildGraph(lines);

		const count = this.countPaths(graph, true);

		return count;
	}

	private buildGraph(lines: string[]): Map<string, string[]> {
		const graph = new Map<string, string[]>();

		for (const line of lines) {
			const [cave1, cave2] = line.split("-");

			const node1 = graph.get(cave1) ?? [];
			if (!node1.includes(cave2)) {
				node1.push(cave2);
				graph.set(cave1, node1);
			}

			const node2 = graph.get(cave2) ?? [];
			if (!node2.includes(cave1)) {
				node2.push(cave1);
				graph.set(cave2, node2);
			}
		}

		return graph;
	}

	private countPaths(graph: Map<string, string[]>, considerDoubleSmallCave = false): number {
		let count = 0;
		function traverseGraph(visited: string[], hasDoubleSmallCave = false) {
			const current = visited.at(-1)!;
			
			if (current === "end") {
				count++;
				return;
			}

			graph.get(current)?.
				filter(
					(nextNode) =>
						nextNode === nextNode.toUpperCase() ||
						!visited.includes(nextNode) 		||
						(considerDoubleSmallCave && nextNode !== "start" && !hasDoubleSmallCave)
				).
				forEach((nextNode) =>
					traverseGraph(
						[...visited, nextNode],
						hasDoubleSmallCave || (nextNode === nextNode.toLowerCase() && visited.includes(nextNode))
					)
				);
		}

		traverseGraph(["start"]);

		return count;
	}
}

export default Day12;
