const fs = require('fs');
const readline = require('readline');

/*
 example: bvwbjplbgvbhsrlpgdmjqwftvncz -> marker at 5
 needs 4 unique charcters
*/

void (async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    const uniqueChars = []
    let markerPosition = 0
    let amountOfUnique = 0

    rl.on('line', (line) => {
        for (let char of line) {
            if (uniqueChars.includes(char)) {
                while (uniqueChars.some((c) => c === char)) {                    
                    uniqueChars.shift()
                    amountOfUnique--    
                }
            } 
            if (amountOfUnique === 4) {
                break
            }
            uniqueChars.push(char)
            markerPosition++
            amountOfUnique++
        }
    });

    await new Promise((res) => {        
        rl.on('close', () => {
            console.log(`The marker is at: ${markerPosition}`)
        })
        rl.once('close', res)
    });
})();
