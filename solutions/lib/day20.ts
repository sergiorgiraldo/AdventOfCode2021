type Pixel = 0 | 1;
type Pixels = Record<string, Pixel>;
type Image = [pixels: Pixels, lowerBound: number, upperBound: number];

class Day20 {
	public helpers = require("./helpers");

	private DARK: Pixel = 0;
	private LIGHT: Pixel = 1;

	public solveForFirstStar(lines: string[]) {
		return this.getBetterImage(lines, 2);
	}

	public solveForSecondStar(lines: string[]) {
		return this.getBetterImage(lines, 50);
	}

	private getBetterImage(lines: string[], iterations: number) {
		const [baseImage, algo] = this.parse(lines);

		const toggle = algo[0] === 1;
		
		let image = baseImage;
		
		for (let iteration = 1; iteration <= iterations; iteration++) {
			image = this.enhance(
				image,
				algo,
				toggle
					? iteration % 2 === 0
						? this.LIGHT
						: this.DARK
					: this.DARK
			);
		}
		return this.countLitPixels(image);
	}

	private lineToPixelArray = (l: string): Pixel[] => l.split("").map(c => (c === "#" ? this.LIGHT : this.DARK));
	
	private dataToImage(data: string[]): Image {
		const pixels: Pixels = {};
		
		const pixelData:Pixel[][] = data.map(this.lineToPixelArray);

		pixelData.map((_, i) => {
			_.map((pixel, j) => {
				pixels[`${i}:${j}`] = pixel;
			});
		})

		return [pixels, 0, pixelData.length - 1];
	}

	private parse(lines: string[]): [Image, Pixel[]] {
		const algo = lines[0];
		const imageData = lines.slice(2);

		return [this.dataToImage(imageData), this.lineToPixelArray(algo)];
	}

	private getAdjacentSection(r: number, c: number): [number, number][] {
		return [
			[r - 1, c - 1], // Top Left
			[r - 1, c + 0], // Top
			[r - 1, c + 1], // Top Right
			[r + 0, c - 1], // Left
			[r + 0, c + 0], // Self
			[r + 0, c + 1], // Right
			[r + 1, c - 1], // Bottom Left
			[r + 1, c + 0], // Bottom
			[r + 1, c + 1]  // Bottom Right
		];
	}

	private enhance([pixels, lowerBound, upperBound]: Image, algo: Pixel[], border: Pixel): Image {
		const updatedPixels: Record<string, Pixel> = {};
		
		const getPixel = ([r, c]: number[]) => pixels[`${r}:${c}`] === undefined ? border : pixels[`${r}:${c}`];

		for (let i = lowerBound - 1; i <= upperBound + 1; i++) {
			for (let j = lowerBound - 1; j <= upperBound + 1; j++) {
				const binary = this.getAdjacentSection(i, j).map(getPixel).join("");
				const decimal = parseInt(binary, 2);
				const pixel = algo[decimal];
				updatedPixels[`${i}:${j}`] = pixel;
			}
		}
		return [updatedPixels, lowerBound - 1, upperBound + 1];
	}

	private countLitPixels([pixels, lowerBound, upperBound]: Image): number{
		let count = 0;

		for (let i = lowerBound; i <= upperBound; i++) {
			for (let j = lowerBound; j <= upperBound; j++) {
				count = count + (pixels[`${i}:${j}`] === this.LIGHT ? 1 : 0);
			}
		}
		return count;
	};
}

export default Day20;
