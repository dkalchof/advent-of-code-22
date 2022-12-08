const fs = require('fs');
const readline = require('readline');

/* $ -> sthm that gets exectured 
$ cd / -> go to root level
$ ls -> lists file -> read next lines until $ again
dir a -> there is a dir called a
14848514 b.txt -> file size of b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
*/

void (async () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });
    const ROOT = '/'
    const dirs = new Map()
    let currentDir = [ROOT]

    rl.on('line', (line) => {
        const command = line.split(" ")
        if (command[0] === '$') {
            if (command[1] === 'cd') {
                if (command[2] === '..') {
                    currentDir.pop()
                } else if (command[2] === '/') {
                    currentDir.splice(1)
                } else {
                    currentDir.push(command[2])
                }
            }
            return
        }


        if (command[0] !== 'dir') {
            const fileSize = Number(command[0])
            const path = currentDir.join('/')
            dirs.set(path, (dirs.get(path) || 0) + fileSize)

            if (currentDir.length > 1) {
                for (let i = currentDir.length - 1; i > 0; i--) {
                    const parentPath = currentDir.slice(0, i).join('/')
                    dirs.set(parentPath, (dirs.get(parentPath) || 0) + fileSize)
                }
            }
        }
    });

    await new Promise((res) => {        
        rl.on('close', async () => {
            const MAX_SIZE = 100_000
            let total = 0;
            for(let size of dirs.values()) {
                if (size <= MAX_SIZE) {
                    total += size;
                }
            }
        
            console.log(`The total sum is to be defined... ${total}`)

            const DISK_SIZE = 70_000_000
            const UNUSED_SPACE = 30_000_000
            const usedSpace = dirs.get(ROOT)
            const minRequired = UNUSED_SPACE - (DISK_SIZE - usedSpace)
            let smallest = Infinity

            for (let size of dirs.values()) {
                if (size < smallest &&size >= minRequired) {
                    smallest = size
                }
            }
            console.log(`smallest dir that can be deleted that fulfills requirements: ${smallest}`)

        })
        rl.once('close', res)
    });
})();