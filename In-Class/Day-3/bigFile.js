const fs = require('fs');
const readline = require('readline');

const file = fs.createWriteStream('./output.txt', { flags: 'a' }); // 'a' flag for appending

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Type your text (press Enter to submit, type 'exit' to quit):");

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    rl.close();
    return;
  }
  file.write(input + '\n');
});

rl.on('close', () => {
  file.end();
  console.log("Text saved to output.txt. Goodbye!");
});
