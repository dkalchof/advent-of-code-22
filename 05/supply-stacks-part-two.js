const fs = require('fs');
const readline = require('readline');

/*
taken & removed from input.txt file (annoying build :D )
[T] [V]                     [W]    
[V] [C] [P] [D]             [B]    
[J] [P] [R] [N] [B]         [Z]    
[W] [Q] [D] [M] [T]     [L] [T]    
[N] [J] [H] [B] [P] [T] [P] [L]    
[R] [D] [F] [P] [R] [P] [R] [S] [G]
[M] [W] [J] [R] [V] [B] [J] [C] [S]
[S] [B] [B] [F] [H] [C] [B] [N] [L]
 1   2   3   4   5   6   7   8   9 

[
    0 => ['a', 'b']
    1 => ['c', 'd']
    2 => ['e', 'f']

]

*/

let supplyStack = {
    '1': ['S', 'M', 'R', 'N', 'W', 'J', 'V', 'T'],
    '2': ['B', 'W', 'D', 'J', 'Q', 'P', 'C', 'V'],
    '3': ['B', 'J', 'F', 'H', 'D', 'R', 'P',],
    '4': ['F', 'R', 'P', 'B', 'M', 'N', 'D',],
    '5': ['H', 'V', 'R', 'P', 'T', 'B',],
    '6': ['C', 'B', 'P', 'T',],
    '7': ['B', 'J', 'R', 'P', 'L',],
    '8': ['N', 'C', 'S', 'L', 'T', 'Z', 'B', 'W'],
    '9': ['L', 'S', 'G',],
}

// COMMAND AS: move 7 from 3 to 9 -> but now keep the order
void (async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
        // instructions: 0 -> move, 1 -> amount, 2 -> from, 3 -> source, 4 -> to, 5 -> dest
        const instructions = line.split(" ");
        const amount = parseInt(instructions[1])
        const source = instructions[3]
        const dest = instructions[5]

        const amountToKeep = supplyStack[source].length - amount
        const cratesToMove = supplyStack[source].splice(amountToKeep, amount)
        supplyStack[dest].push(...cratesToMove)
    });

    await new Promise((res) => {        
        rl.on('close', () => {
            let message = ''
            Object.keys(supplyStack).forEach((stack) => {
                message += supplyStack[stack].pop()
            })
            console.log(`The message is: ${message}`)
        })
        rl.once('close', res)
    });
})();