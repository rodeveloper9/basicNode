const fs = require('fs');
const readStrem = fs.createReadStream('./docs/streamData.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./docs/writeStrem.txt');

// readStrem.on('data', (chunk) => {
//     console.log('--------NEW CHUNK---------')
//     console.log(chunk)
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// })

// piping read to write
readStrem.pipe(writeStream);