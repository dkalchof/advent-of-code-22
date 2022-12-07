/*
A (Rock) Y (Paper) -> 8: 2 because paper, 6 because win
B (Paper) X (Rock) -> 1: 1 because rocck, 0 cause loss
C (Scissors) Z (Scissors): 6: 3 because scissors, 3 because draw
*/

const fs = require('fs');
const readline = require('readline');

// similar to the wed implementation :D 
const mapping = {
    'X': {
        'A': 4,
        'B': 1,
        'C': 7,
    },
    'Y': {
        'A': 8,
        'B': 5,
        'C': 2,
    },
    'Z': {
        'A': 3,
        'B': 9,
        'C': 6,
    },
}

void (async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    let total = 0
    rl.on('line', (line) => {
        const game = line.split(" ");
        total += mapping[game[1]][game[0]]
    });

    await new Promise((res) => {        
        rl.on('close', () => console.log(`Total from the strategy is: ${total}`))
        rl.once('close', res)
    });
})();

