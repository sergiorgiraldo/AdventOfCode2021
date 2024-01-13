type Node = {
	version: number|null;
	typeId: number|null;
	data?: { number: number | null };
	leaves: Node[];
};

class Day16 {
	public helpers = require("./helpers");

	private TYPE_ID_OP_SUM = 0;
	private TYPE_ID_OP_PRODUCT = 1;
	private TYPE_ID_OP_MINIMUM = 2;
	private TYPE_ID_OP_MAXIMUM = 3;
	private TYPE_ID_LITERAL = 4;
	private TYPE_ID_OP_GT = 5;
	private TYPE_ID_OP_LT = 6;
	private TYPE_ID_OP_EQ = 7;

	public solveForFirstStar(lines: string[]) {
		let packet = [...this.hexToBin(lines[0])];

		const root = this.getRootNode(packet);

		return this.getSumOfVersions(root);
	}

	public solveForSecondStar(lines: string[]) {
		const packet = [...this.hexToBin(lines[0])];

		const root = this.getRootNode(packet);

		return this.processTree(root);
	}

	private hexToBin(hex: string) {
		const hexChars:string[] = [...hex];
		const binString:string[] = [];

		hexChars.map((char) => {
			binString.push(("0000" + parseInt(char, 16).toString(2)).slice(-4)
			);
		});

		return binString.join("");
	}

	private getSumOfVersions(tree: Node, total = 0) {
		if (tree.leaves.length === 0) return total + (tree.version ?? 0);

		let subsum = 0;
		for (let leaf of tree.leaves) {
			subsum += this.getSumOfVersions(leaf);
		}

		return total + subsum + (tree.version ?? 0);
	}

	private getLeafNode(packet:string[]): Node {
		const version:number = parseInt(packet.splice(0, 3).join(""), 2);
		const typeId:number = parseInt(packet.splice(0, 3).join(""), 2);
		const numParts = [];

		let num:number|null = null;
		let leaves: Node[] = [];

		switch (typeId) {
			case this.TYPE_ID_LITERAL: {
				let done = false;

				do {
					const [shouldContinue, ...parts] = packet.splice(0, 5);
					if (parseInt(shouldContinue) === 0) done = true;
					numParts.push(...parts);
				} while (!done);

				break;
			}
			default: {
				const subPacketType = parseInt(packet.splice(0, 1).join(""), 2);
				let len = 15;
				if (subPacketType === 1) len = 11;

				const subPacketLen = parseInt(packet.splice(0, len).join(""), 2);

				if (subPacketType === 1) {
					let counter = 0;
					while (counter < subPacketLen) {
						const leaf = this.getLeafNode(packet);
						leaves.push(leaf);
						counter++;
					}
				} else {
					leaves.push(
						...this.getRootNode(packet.splice(0, subPacketLen))
							.leaves
					);
				}

				break;
			}
		}

		if (numParts.length) {
			num = parseInt(numParts.join(""), 2);
		}

		return {
			version,
			typeId,
			data: {
				number: num
			},
			leaves
		};
	}

	private getRootNode(packet:string[]) {
		const root:Node = {
			version: null,
			typeId: null,
			leaves: []
		};

		let done = false;

		do {
			const leaf = this.getLeafNode(packet);
			if (!packet.includes("1")) done = true;

			root.leaves.push(leaf);
		} while (!done);

		return root;
	}

	private processTree(treeNode:Node): number {
		const args: number[] = [];

		for (let node of treeNode.leaves) {
			args.push(node?.data?.number ?? this.processTree(node));
		}

		switch (treeNode.typeId) {
			case this.TYPE_ID_OP_SUM: { //sum packets
				return args.reduce((sum, val) => sum + val, 0);
			}
			case this.TYPE_ID_OP_PRODUCT: { //multiply packets
				return args.reduce((sum, val) => sum * val, 1);
			}
			case this.TYPE_ID_OP_MINIMUM: { //get packet with lower value
				return args.reduce((min, val) => Math.min(min, val),Number.MAX_VALUE);
			}
			case this.TYPE_ID_OP_MAXIMUM: { //get packet with higher value
				return args.reduce((max, val) => Math.max(max, val),Number.MIN_VALUE);
			}
			case this.TYPE_ID_OP_GT: { //greater than
				return args[0] > args[1] ? 1 : 0;
			}
			case this.TYPE_ID_OP_LT: { //less than
				return args[0] < args[1] ? 1 : 0;
			}
			case this.TYPE_ID_OP_EQ: { //equal to
				return args[0] === args[1] ? 1 : 0;
			}
			case null: {
				return args[0];
			}
			default:
		}

		throw new Error("unknown type id " + treeNode.typeId);
	}
}

export default Day16;
