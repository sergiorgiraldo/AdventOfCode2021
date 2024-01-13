interface Tree {
	value?: number;
	parent?: Tree;
	leftChild?: Tree;
	rightChild?: Tree;
}

function treeToString(tree: Tree, indent = 0): string {
	let str = "";
	if (tree.value !== undefined) {
	  str += `${" ".repeat(indent + 2)}${tree.value}\n`;
	}
	if (tree.leftChild !== undefined) {
	  str += treeToString(tree.leftChild, indent + 2);
	}
	if (tree.rightChild !== undefined) {
	  str += treeToString(tree.rightChild, indent + 2);
	}
	return str;
  }

class Day18 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		const parsedTree = lines.map((line) => {
			const json = JSON.parse(line);
			return this.parseToTree(json);
		});

		this.helpers.dbg("[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]");
		this.helpers.dbg(treeToString(parsedTree[0]));
		this.helpers.dbg("[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]");
		this.helpers.dbg(treeToString(parsedTree[5]));

		const reducedTree = parsedTree.reduce((acc, cur) => {
			const newTree: Tree = {
				leftChild: acc,
				rightChild: cur
			};
			acc.parent = newTree;
			cur.parent = newTree;
			return this.reduceTree(newTree);
		});

		const magnitude = this.countMagnitude(reducedTree);

		return magnitude;
	}

	public solveForSecondStar(lines: string[]) {
		const snailfishNumbers = lines.map((line) => JSON.parse(line));

		let maxMagnitude = 0;

		snailfishNumbers.map(n1 => {
			snailfishNumbers.map(n2 => {
				if (n1 !== n2) {				
					const tree1 = this.parseToTree(n1);
					const tree2 = this.parseToTree(n2);
					const newTree: Tree = {
						leftChild: tree1,
						rightChild: tree2
					};
					tree1.parent = newTree;
					tree2.parent = newTree;

					const reducedTree = this.reduceTree(newTree);
					
					const magnitude = this.countMagnitude(reducedTree);
					
					maxMagnitude = Math.max(magnitude, maxMagnitude);
				}
			})
		})

		return maxMagnitude;
	}

	private parseToTree(json: any, parent?: Tree): Tree {
		if (typeof json === "number") {
			return {
				value: json,
				parent: parent
			};
		}

		const tree: Tree = {
			parent: parent
		};

		tree.leftChild = this.parseToTree(json[0], tree);
		tree.rightChild = this.parseToTree(json[1], tree);

		return tree;
	}

	private reduceTree(tree: Tree) {
		while (true) {
			if (this.applyExplode(tree)) {
				continue;
			}

			if (this.applySplit(tree)) {
				continue;
			}

			break;
		}

		return tree;
	}

	private applyExplode(tree: Tree) {
		let searchedNode: Tree | undefined = undefined;
		function searchForExplode(node: Tree, depth = 0) {
			if (!node || searchedNode) {
				return;
			}

			if (depth >= 4 &&
				node.leftChild?.value !== undefined &&
				node.rightChild?.value !== undefined) {
				searchedNode = node;
				return;
			}

			if (node.leftChild) {
				searchForExplode(node.leftChild, depth + 1);
			}

			if (node.rightChild) {
				searchForExplode(node.rightChild, depth + 1);
			}
		}

		searchForExplode(tree);

		if (!searchedNode) {
			return false;
		}

		searchedNode = searchedNode as Tree;

		this.applyLeftExplode(searchedNode);
		this.applyRightExplode(searchedNode);
		searchedNode.leftChild = undefined;
		searchedNode.rightChild = undefined;
		searchedNode.value = 0;

		return true;
	}

	private applyLeftExplode(tree: Tree) {
		let node = tree.parent!;
		let prevNode = tree;
		while (node.parent && (node.leftChild === prevNode || !node.leftChild)) {
			prevNode = node;
			node = node.parent;
		}

		if (!node.leftChild || node.leftChild === prevNode) {
			return;
		}

		node = node.leftChild;

		while (node.rightChild) {
			node = node.rightChild;
		}

		node.value = node.value! + tree.leftChild!.value!;
	}

	private applyRightExplode(tree: Tree) {
		let node = tree.parent!;
		let prevNode = tree;
		while (node.parent && (node.rightChild === prevNode || !node.rightChild)) {
			prevNode = node;
			node = node.parent;
		}

		if (!node.rightChild || node.rightChild === prevNode) {
			return;
		}

		node = node.rightChild;

		while (node.leftChild) {
			node = node.leftChild;
		}

		node.value = node.value! + tree.rightChild!.value!;
	}

	private applySplit(tree: Tree) {
		let searchedNode: Tree | undefined = undefined;
		function searchForSplit(node: Tree) {
			if (!node || searchedNode) {
				return;
			}

			if (node.value !== undefined && node.value >= 10) {
				searchedNode = node;
				return;
			}

			if (node.leftChild) {
				searchForSplit(node.leftChild);
			}

			if (node.rightChild) {
				searchForSplit(node.rightChild);
			}
		}

		searchForSplit(tree);

		if (!searchedNode) {
			return false;
		}

		searchedNode = searchedNode as Tree;

		searchedNode.leftChild = {
			value: Math.floor(searchedNode.value! / 2),
			parent: searchedNode
		};

		searchedNode.rightChild = {
			value: Math.ceil(searchedNode.value! / 2),
			parent: searchedNode
		};

		searchedNode.value = undefined;

		return true;
	}

	private countMagnitude(tree: Tree): number {
		if (tree.value !== undefined) {
			return tree.value;
		}

		return (
			3 * this.countMagnitude(tree.leftChild!) +
			2 * this.countMagnitude(tree.rightChild!)
		);
	}
}

export default Day18;
