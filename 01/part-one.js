/* example data structure
8026
5397
5657

10954
11208
5025
*/

const fs = require('fs');
const readline = require('readline');

void (async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream('input-01.txt'),
    crlfDelay: Infinity,
  });

  let maxCalories = 0
  let currentCalories = 0
    rl.on('line', (line) => {
        if (line) {
            currentCalories += parseInt(line, 10);
        }
        if (!line) {
            if (currentCalories > maxCalories) {
                maxCalories = currentCalories
            }
            currentCalories = 0
        }
    });

    await new Promise((res) => {        
        rl.on('close', () => console.log(`The max amount of calories is: ${maxCalories}`))
        rl.once('close', res)
    });
})();

