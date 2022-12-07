const fs = require('fs');
const readline = require('readline');

/*
2-8,3-7 -> 2-8 fully contains 3-7
6-6,4-6 -> 4-6 fully contains 6-6
2-6,4-8 -> doesn't fully contain each other
*/

// generator 
function* range(start, end) {
    yield start;
    if (start === end) return;
    yield* range(start + 1, end);
}

void (async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    let counter = 0

    rl.on('line', (line) => {
        const cleaningAreas = line.split(",");
        const cleaningAreaOne = cleaningAreas[0].split('-')
        const cleaningAreaTwo = cleaningAreas[1].split('-')
        
        const areaOne = [...range(parseInt(cleaningAreaOne[0]), parseInt(cleaningAreaOne[1]))]
        const areaTwo = [...range(parseInt(cleaningAreaTwo[0]), parseInt(cleaningAreaTwo[1]))]

        // i.e. areaOne = [2,3,4,5,6,7,8], areaTwo = [3,4,5,6,7]
        // check if two is in one
        const isInOne = (currentValue) => areaOne.includes(currentValue);
        const areaOneHasAllOfAreaTwo = areaTwo.some(isInOne)

        if (areaOneHasAllOfAreaTwo) {
            counter++;
            return
        }

        // check if one is in two
        const isInTwo = (currentValue) => areaTwo.includes(currentValue);
        const areaTwoHasAllOfAreaOne = areaOne.some(isInTwo)
    
        if (areaTwoHasAllOfAreaOne) {
            counter++;
            return
        }
    });

    await new Promise((res) => {        
        rl.on('close', () => console.log(`Total sum of areas containg the other is is: ${counter}`))
        rl.once('close', res)
    });
})();
