class Day21 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]) {
		let positions:number[] = [];

		positions.push(+lines[0].split(": ")[1])
		positions.push(+lines[1].split(": ")[1])

		const scores = [0, 0];
		let dice = 1;
		let rollCount = 0;
		
		while (true) {
			for (let i = 0; i < positions.length; i++) {
				let roll = 0;
				for (let j = 0; j < 3; j++) {
					roll += dice++;
					if (dice > 100) {
						dice = 1;
					}
					rollCount++;
				}
				positions[i] = ((positions[i] + roll - 1) % 10) + 1;
				scores[i] += positions[i];
				if (scores[i] >= 1000) {
					return rollCount * scores[(i + 1) % 2];
				}
			}
		}
	}

	public solveForSecondStar(lines: string[]) {
		let positions:number[] = [];

		positions.push(+lines[0].split(": ")[1])
		positions.push(+lines[1].split(": ")[1])

		const result = this.makeTurn(
			0,
			[0, 0],
			positions,
			new Map<string, number[]>()
		);
		return Math.max(...result);
	}

	private makeTurn(player: number, scores: number[], positions: number[], cache: Map<string, number[]>) {
		const key = `${player},${scores.join(",")},${positions.join(",")}}`;
		const cacheResult = cache.get(key);
		if (cacheResult) {
			return cacheResult;
		}

		for (let i = 0; i < scores.length; i++) {
			if (scores[i] >= 21) {
				const result = scores.map((_, index) => (index === i ? 1 : 0));
				cache.set(key, result);
				return result;
			}
		}

		const nextPlayer = (player + 1) % 2;
		const wins = scores.map((_) => 0);

		for (let dice1 = 1; dice1 <= 3; dice1++) {
			for (let dice2 = 1; dice2 <= 3; dice2++) {
				for (let dice3 = 1; dice3 <= 3; dice3++) {
					const newPositions = positions.map((position, index) =>
						index === player
							? ((position + dice1 + dice2 + dice3 - 1) % 10) + 1
							: position
					);
					const newScores = scores.map((score, index) =>
						index === player ? score + newPositions[player] : score
					);
					const nextWins = this.makeTurn(
						nextPlayer,
						newScores,
						newPositions,
						cache
					);
					nextWins.forEach(
						(_, index) => (wins[index] += nextWins[index])
					);
				}
			}
		}

		cache.set(key, wins);
		return wins;
	}
}

export default Day21;
