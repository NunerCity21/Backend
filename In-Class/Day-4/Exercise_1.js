const fs = require('fs');

const fileToRead = process.argv[2];
const fileToWrite = process.argv[3];
const wordToReplace = process.argv[4];

fs.readFile(fileToRead, 'utf8', (err, data) => {
    if (err) throw err;

    const baconRegex = /\bbacon\b/gi;
    const result = data.replace(baconRegex, wordToReplace);
    const count = data.match(baconRegex).length;
    console.log(count);
    fs.writeFile(fileToWrite, result, (err) => {
        if (err) throw err;
        console.log("File Written.")
    })
})
