/*
A (Rock) Y (Paper) -> 8: 2 because paper, 6 because win
B (Paper) X (Rock) -> 1: 1 because rocck, 0 cause loss
C (Scissors) Z (Scissors): 6: 3 because scissors, 3 because draw
*/

const fs = require('fs');
const readline = require('readline');

/*
    In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
    In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
    In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
*/

const mapping = {
    'X': { // lose game
        'A': 3,
        'B': 1,
        'C': 2,
    },
    'Y': { // draw game
        'A': 4,
        'B': 5,
        'C': 6,
    },
    'Z': { // win game
        'A': 8,
        'B': 9,
        'C': 7,
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

