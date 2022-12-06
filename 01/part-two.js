const fs = require('fs');
const readline = require('readline');

void (async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('input-01.txt'),
        crlfDelay: Infinity,
    });

    let maxCalories = 0
    let currentCalories = 0
    let allTheElvesCalories = []
    rl.on('line', (line) => {
        if (line) {
            currentCalories += parseInt(line, 10);
        }
        if (!line) {
            if (currentCalories > maxCalories) {
                maxCalories = currentCalories
            }
            allTheElvesCalories.push(currentCalories)
            currentCalories = 0
        }
    });

    // lazy version ik... but I have a thesis I should be working on instead of procrastinating with a nice solution
    await new Promise((res) => {        
        rl.on('close', () => {
            allTheElvesCalories.sort((a,b)=>b-a)
            const totalCalories = allTheElvesCalories[0] + allTheElvesCalories[1] + allTheElvesCalories[2]
            console.log(`The amount of calories of the top 3 elves are: ${totalCalories}`)
        })
        rl.once('close', res)
    });
})();