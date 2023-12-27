
const helpers = require("./helpers");

function solveForFirstStar(lines){
	return countLargerThanPrev(lines);
}

function solveForSecondStar(lines){
	return countLargerThanPrev(lines, 3);
}

function countLargerThanPrev(values, blockSize = 1) {
    let largerThanPrev = 0;

    for (let i = blockSize; i < values.length; i++) {        
        const prev = Number(values[i - blockSize]);
        const curr = Number(values[i]);
        const diff = curr - prev;
        if (diff > 0) largerThanPrev++;
    }

    return largerThanPrev;
}

module.exports = { solveForFirstStar, solveForSecondStar };
