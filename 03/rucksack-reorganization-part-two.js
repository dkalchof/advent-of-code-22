const fs = require('fs');
const readline = require('readline');

/*
find common item in groups of 3 lines (elves)
*/

const prioValues = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
    'i': 9,
    'j': 10,
    'k': 11,
    'l': 12,
    'm': 13,
    'n': 14,
    'o': 15,
    'p': 16,
    'q': 17,
    'r': 18,
    's': 19,
    't': 20,
    'u': 21,
    'v': 22,
    'w': 23,
    'x': 24,
    'y': 25,
    'z': 26,
    'A': 27,
    'B': 28,
    'C': 29,
    'D': 30,
    'E': 31,
    'F': 32,
    'G': 33,
    'H': 34,
    'I': 35,
    'J': 36,
    'K': 37,
    'L': 38,
    'M': 39,
    'N': 40,
    'O': 41,
    'P': 42,
    'Q': 43,
    'R': 44,
    'S': 45,
    'T': 46,
    'U': 47,
    'V': 48,
    'W': 49,
    'X': 50,
    'Y': 51,
    'Z': 52,
}

void (async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    let sumOfPriorities = 0
    let elveCounter = 1;
    let elveOne = ''
    let elveTwo = ''
    rl.on('line', (line) => {
        if (elveCounter === 1) {
            elveOne = line
            elveCounter++
            return
        } else if (elveCounter === 2) {
            elveTwo = line
            elveCounter++
            return
        }

        let groupItem = ''
        for (let item of line) {
            const elveOneHasItem = elveOne.includes(item)
            const elveTwoHasItem = elveTwo.includes(item)
            
            if (elveOneHasItem && elveTwoHasItem) {
                groupItem = item
                elveCounter = 1;
                break;
            }
        }

        // add group itme badge by the value
        sumOfPriorities += prioValues[groupItem]
    });

    await new Promise((res) => {        
        rl.on('close', () => console.log(`Total sum of priorities is: ${sumOfPriorities}`))
        rl.once('close', res)
    });
})();
