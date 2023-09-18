

function generateCave(fill, smooth) {
    const arr = [];
    for (let i = 0; i < 16384; i++) {
        arr.push(rollDice(fill));
    }
    return arr;
}

function rollDice(number) {
    return Math.random() * 100 > number ? 1 : 0
}

export default { generateCave }