const net = require('net');
const readline = require('readline'); // Input

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = net.createConnection(3000, () => {
    console.log("Connected To The Server.");
    client.write("Has Connected To The Chat.");// Tell The Other Clients You Have Joined The Server. Save In chat.log.
    
})

client.setEncoding("utf-8");
client.on('data', (data) => {
    console.log(data);
})