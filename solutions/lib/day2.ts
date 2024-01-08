class Day2 {
	public helpers = require("./helpers");

	public solveForFirstStar(lines: string[]): number {
		let horizontal = 0,
			depth = 0;
		const commands: Record<string, (value: number) => void> = {
			forward: (value: number) => (horizontal += value),
			down: (value: number) => (depth += value),
			up: (value: number) => (depth -= value)
		};

		for (const line of lines) {
			const [command, value] = line.split(" ");
			commands[command](parseInt(value));
		}
		return horizontal * depth;
	}

	public solveForSecondStar(lines: string[]): number {
		let aim = 0,
			horizontal = 0,
			depth = 0;
		const commands: Record<string, (value: number) => void> = {
			forward: (value: number) => {
				horizontal += value;
				depth += aim * value;
			},
			down: (value: number) => (aim += value),
			up: (value: number) => (aim -= value)
		};

		for (const line of lines) {
			const [command, value] = line.split(" ");
			commands[command](parseInt(value));
		}
		return horizontal * depth;
	}
}

export default Day2;