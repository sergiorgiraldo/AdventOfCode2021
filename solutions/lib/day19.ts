type Match = {
	scannerID: number;
	beaconID: number;
	votes: number;
};

type Point = [x: number, y: number, z: number];

type Rotation = (p: Point) => Point;

interface Beacon {
	point: Point;
	beaconID: number;
	scannerID: number;
	dist: number[];
	matches: Match[][];
}

interface Scanner {
	point: Point;
	beacons: Beacon[];
	overlapping: Set<number>;
	connections: Record<number, [Point, Point][]>;
}

class Day19 {
	public helpers = require("./helpers");

	/*
	from the puzzle: 
	"the scanners also don't know their rotation or facing direction. 
	Due to magnetic alignment, each scanner is rotated some integer number of 90-degree turns 
	around all of the x, y, and z axes."
	*/
	private rotations: Rotation[] = [
		([x, y, z]) => [x, y, z],
		([x, y, z]) => [y, z, x],
		([x, y, z]) => [z, x, y],
		([x, y, z]) => [-x, z, y],
		([x, y, z]) => [z, y, -x],
		([x, y, z]) => [y, -x, z],
		([x, y, z]) => [x, z, -y],
		([x, y, z]) => [z, -y, x],
		([x, y, z]) => [-y, x, z],
		([x, y, z]) => [x, -z, y],
		([x, y, z]) => [-z, y, x],
		([x, y, z]) => [y, x, -z],
		([x, y, z]) => [-x, -y, z],
		([x, y, z]) => [-y, z, -x],
		([x, y, z]) => [z, -x, -y],
		([x, y, z]) => [-x, y, -z],
		([x, y, z]) => [y, -z, -x],
		([x, y, z]) => [-z, -x, y],
		([x, y, z]) => [x, -y, -z],
		([x, y, z]) => [-y, -z, x],
		([x, y, z]) => [-z, x, -y],
		([x, y, z]) => [-x, -z, -y],
		([x, y, z]) => [-z, -y, -x],
		([x, y, z]) => [-y, -x, -z]
	];

	public solveForFirstStar(lines: string[]) {
		const scanners = this.parse(lines);

		this.setDistance(scanners);

		return this.setConnectionsAndCount(scanners);
	}

	public solveForSecondStar(lines: string[]) {
		const scanners = this.parse(lines);

		this.setDistance(scanners);

		this.setConnectionsAndCount(scanners);

		return this.findLargestManhattanDistance(scanners);
	}

	private parse(lines: string[]): Scanner[] {
		const scanners: Scanner[] = [];
		let current: Scanner | undefined = undefined;
		let scannerID = 0;

		lines.map(line=>{
			if (line.startsWith("--")) {
				current = {
					beacons: [],
					connections: {},
					overlapping: new Set(),
					point: [0, 0, 0]
				};
				scanners.push(current);
				scannerID = scanners.length - 1;
			} else if (current !== undefined && line !== "") {
				const beaconID = current.beacons.length;
				current.beacons.push(
					this.lineToBeacon(line, scannerID, beaconID)
				);
			}
		});

		return scanners;
	}

	private lineToBeacon(line: string,scannerID: number,beaconID: number): Beacon {
		const point = line.split(",").map(Number) as Point;
		return { beaconID, scannerID, point, dist: [], matches: [] };
	}

	private getEuclidianDistance([ax, ay, az]: Point, [bx, by, bz]: Point): number {
		return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2) + Math.pow(az - bz, 2));
	}

	private getManhattanDistance([ax, ay, az]: Point, [bx, by, bz]: Point): number {
		return Math.abs(ax - bx) + Math.abs(ay - by) + Math.abs(az - bz);
	}

	private setDistance(scanners: Scanner[]) {
		for (const scanner of scanners) {
			const beacons = scanner.beacons;
			for (let i = 0; i < beacons.length; i++) {
				const a = beacons[i];
				for (let j = i + 1; j < beacons.length; j++) {
					const b = beacons[j];
					const dist = this.getEuclidianDistance(a.point, b.point);
					a.dist.push(dist);
					b.dist.push(dist);
				}
			}
		}
	}

	private addVotesForMatch(matches: Match[][], scannerID: number, beaconID: number, votes: number) {
		if (matches[scannerID] === undefined) {
			matches[scannerID] = [];
		}
		matches[scannerID].push({ scannerID, beaconID, votes });
	}

	private pushConnection(scanners: Scanner[], a: number, b: number, ap: Point,bp: Point) {
		if (scanners[a].connections[b] === undefined) {
			scanners[a].connections[b] = [];
		}
		// Just three points are enough to make a call on rotation
		if (scanners[a].connections[b].length < 3) {
			scanners[a].connections[b].push([ap, bp]);
		}
	}

	private setConnectionsAndCount(scanners: Scanner[]) {
		const counted = new Set<string>();
		let count = 0;
		for (let asi = 0; asi < scanners.length; asi++) {
			const beaconsA = scanners[asi].beacons;
			for (let abi = 0; abi < beaconsA.length; abi++) {
				const beaconA = beaconsA[abi];
				for (let bsi = asi + 1; bsi < scanners.length; bsi++) {
					let beaconMatched = 0;
					let maxVotes = 0;
					const beaconsB = scanners[bsi].beacons;
					for (let bbi = 0; bbi < beaconsB.length; bbi++) {
						const beaconB = beaconsB[bbi];
						const votes = beaconA.dist.filter(
							(a) => beaconB.dist.findIndex((b) => a === b) > -1
						).length;
						if (votes > 0) {
							this.addVotesForMatch(
								beaconA.matches,
								bsi,
								bbi,
								votes
							);
							this.addVotesForMatch(
								beaconB.matches,
								asi,
								abi,
								votes
							);
							beaconMatched = beaconMatched + 1;
							maxVotes = Math.max(votes, maxVotes);
						}
						if (beaconMatched >= 12) {
							scanners[asi].overlapping.add(bsi);
							scanners[bsi].overlapping.add(asi);
						}
					}
					let matches = beaconA.matches[bsi];
					if (matches === undefined) {
						continue;
					}
					matches = matches.filter((m) => m.votes === maxVotes);
					beaconA.matches[bsi] = matches;
					// ignore if they are more than 1 match
					// as it is not a perfect match
					if (matches.length === 1) {
						const match = matches[0];
						const matchKey = `${match.scannerID}:${match.beaconID}`;
						counted.add(matchKey);
						const beaconB =
							scanners[match.scannerID].beacons[match.beaconID];
						this.pushConnection(
							scanners,
							asi,
							bsi,
							beaconA.point,
							beaconB.point
						);
						this.pushConnection(
							scanners,
							bsi,
							asi,
							beaconB.point,
							beaconA.point
						);
					}
				}
				const beaconKey = `${beaconA.scannerID}:${beaconA.beaconID}`;
				if (!counted.has(beaconKey)) {
					counted.add(beaconKey);
					count = count + 1;
				}
			}
		}
		return count;
	}

	private findLargestManhattanDistance(scanners: Scanner[]) {
		const queue: [number, Rotation][] = [[0, this.rotations[0]]];
		const visited = new Set<number>();
		while (queue.length > 0 && visited.size <= scanners.length) {
			const [scannerID, lastRotation] = queue.shift() as [
				number,
				Rotation
			];
			const current = scanners[scannerID];
			visited.add(scannerID);
			const [bx, by, bz] = current.point;
			for (const overlapID of current.overlapping) {
				if (visited.has(overlapID)) {
					continue;
				}
				const connectionInfo = current.connections[overlapID];
				let selectedRotation: Rotation | undefined = undefined;
				for (const rotation of this.rotations) {
					const uniqueDifferences = new Set<string>();
					for (const [source, dest] of connectionInfo) {
						const [sx, sy, sz] = lastRotation(source);
						const [dx, dy, dz] = rotation(dest);
						uniqueDifferences.add(
							`${sx - dx},${sy - dy},${sz - dz}`
						);
					}
					if (uniqueDifferences.size === 1) {
						const [dx, dy, dz] = [...uniqueDifferences][0]
							.split(",")
							.map(Number) as Point;
						scanners[overlapID].point = [bx + dx, by + dy, bz + dz];
						this.helpers.dbg(`${overlapID} relative to 0 ${scanners[overlapID].point}, rotation applied ${rotation([1,2,3])}`);
						selectedRotation = rotation;
						break;
					}
				}
				if (selectedRotation === undefined) {
					console.log(
						`Failed to find rotation for ${overlapID} with respect to ${current}`
					);
					return 0;
				}
				queue.push([overlapID, selectedRotation]);
			}
		}
		let maxDistance = 0;
		for (let asi = 0; asi < scanners.length - 1; asi++) {
			const pa = scanners[asi].point;
			for (let bsi = asi + 1; bsi < scanners.length; bsi++) {
				if (asi === bsi) continue;
				maxDistance = Math.max(this.getManhattanDistance(pa, scanners[bsi].point),maxDistance);
			}
		}
		return maxDistance;
	}
}

export default Day19;
