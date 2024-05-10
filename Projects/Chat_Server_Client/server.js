const net = require('net');
const fs = require('fs');

const clients = {};

const server = net.createServer((client) => {

    const Id = Math.random().toString(36).substring(7);
    // console.log(`This Client's Id Is: ${Id}`); // Keep Track Of The Clients
    clients[Id] = client;

    client.write("Welcome To The Chat Room!\n");
    client.write(`Your Id Is: ${Id}`)
    // Get Client Message.
    client.setEncoding("utf-8");
    client.on('data', (data) => {
        fs.appendFile('chat.log', `${Id}: ${data}\n`, err => {
            if (err)throw err;
        });

        Object.keys(clients).forEach((key) => {
            if (key !== Id) {
                clients[key].write(`${Id}: ${data}`);
            }
        });
    })

    client.on('end', () => { // Won't print anything with one client as well as both server and client get reseted on client leave.
        Object.keys(clients).forEach((key) => {
            clients[key].write(`Client: ${Id} Has Disconnected.\n`);
        });
        fs.appendFile(`chat.log`, `Client: ${Id} Has Disconnected.\n`, (err) => {
            if (err) throw err;
        })
        delete clients[Id];
    })
}).listen(3000, () => {
    console.log(`listening on port ${server.address().port}`);
})

// Send key public recieve private