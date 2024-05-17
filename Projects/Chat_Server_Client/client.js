const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.createConnection(3000, () => {
    console.log("Connected To The Server.");
});

client.setEncoding("utf-8");

client.on('data', (data) => {
    console.log(data);
});

rl.on('line', (input) => {
    client.write(input);
});
