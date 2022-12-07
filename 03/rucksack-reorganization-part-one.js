const fs = require('fs');
const readline = require('readline');

/*
ttgJtRGJQctTZtZT -> share t -> 16 total = C1 = ttgJtRGJ and C2 = QctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw -> share s -> 24 total 
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
    rl.on('line', (line) => {
        const amountOfItems = line.length
        const amountPerCompartment = amountOfItems / 2
        // split into two compartments
        const compartmentOne = line.slice(0, amountPerCompartment);
        const compartmentTwo = line.slice(amountPerCompartment);
        console.log(amountPerCompartment, compartmentOne, compartmentTwo)

        // compare compartment 2 vs 1, find common part
        let itemInBoth = ''
        for (let item of compartmentOne) {
            if (compartmentTwo.includes(item)) {
                itemInBoth = item
                break;
            }
        }
        
        // check both compartments for their occurance
       /* let amount = 0
        amount += compartmentOne.split(itemInBoth).length - 1;
        amount += compartmentTwo.split(itemInBoth).length - 1;*/

        // multiply amount by the value
        sumOfPriorities += prioValues[itemInBoth]
    });

    await new Promise((res) => {        
        rl.on('close', () => console.log(`Total sum of priorities is: ${sumOfPriorities}`))
        rl.once('close', res)
    });
})();
