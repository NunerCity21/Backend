const net = require('net');
const fs = require('fs');

const clients = {};
const clientNames = {};
const adminPassword = 'supersecretpw';

const server = net.createServer((client) => {
    const clientId = Math.random().toString(36).substring(7);
    const clientName = `Guest${Object.keys(clients).length + 1}`;
    clients[clientId] = client;
    clientNames[clientId] = clientName;

    client.write("Welcome To The Chat Room!\n");
    client.write(`Your Id Is: ${clientId}\n`);
    client.write(`Your Username Is: ${clientName}\n`);

    logToServer(`${clientName} Has Joined The Chat.`);
    broadcast(`${clientName} Has Joined The Chat.`, clientId);

    client.setEncoding("utf-8");

    client.on('data', (data) => {
        const trimmedData = data.trim();
        if (trimmedData.startsWith('/')) {
            handleCommand(trimmedData, clientId);
        } else {
            logToServer(`${clientNames[clientId]}: ${data}`);
            broadcast(`${clientNames[clientId]}: ${data}`, clientId);
        }
    });

    client.on('end', () => {
        logToServer(`${clientNames[clientId]} Has Left The Chat.`);
        broadcast(`${clientNames[clientId]} Has Left The Chat.`, clientId);
        fs.appendFile(`server.log`, `${clientNames[clientId]} Has Left The Chat.\n`, (err) => {
            if (err) throw err;
        });
        delete clients[clientId];
        delete clientNames[clientId];
    });

    function broadcast(message, senderId) {
        Object.keys(clients).forEach((key) => {
            if (key !== senderId) {
                clients[key].write(`${message}\n`);
            }
        });
    }

    function handleCommand(command, clientId) {
        const args = command.split(' ');
        const client = clients[clientId];

        switch (args[0]) {
            case '/w':
                handleWhisper(args, clientId);
                break;
            case '/username':
                handleUsernameChange(args, clientId);
                break;
            case '/kick':
                handleKick(args, clientId);
                break;
            case '/clientlist':
                handleClientList(clientId);
                break;
            default:
                client.write(`Unknown Command: ${args[0]}\n`);
                logToServer(`Unknown Command: ${args[0]} By ${clientNames[clientId]}`);
        }
    }

    function handleWhisper(args, clientId) {
        if (args.length < 3) {
            clients[clientId].write('Error: Incorrect Number Of Inputs For /w Command.\n');
            logToServer(`Error: Incorrect Number Of Inputs For /w Command By ${clientNames[clientId]}`);
            return;
        }

        const recipientName = args[1];
        const message = args.slice(2).join(' ');
        const senderName = clientNames[clientId];
        const recipientId = getClientIdByName(recipientName);

        if (!recipientId) {
            clients[clientId].write('Error: Invalid Username.\n');
            logToServer(`Error: Invalid Username For /w Command By ${senderName}`);
            return;
        }

        if (recipientId === clientId) {
            clients[clientId].write('Error: Cannot Whisper To Yourself.\n');
            logToServer(`Error: ${senderName} Tried To Whisper To Themselves`);
            return;
        }

        clients[recipientId].write(`(Whisper) ${senderName}: ${message}\n`);
        logToServer(`(Whisper) ${senderName} To ${recipientName}: ${message}`);
    }

    function handleUsernameChange(args, clientId) {
        if (args.length !== 2) {
            clients[clientId].write('Error: Incorrect Number Of Inputs For /username Command.\n');
            logToServer(`Error: Incorrect Number Of Inputs For /username Command By ${clientNames[clientId]}`);
            return;
        }

        const newUsername = args[1];
        const currentUsername = clientNames[clientId];

        if (newUsername === currentUsername) {
            clients[clientId].write('Error: New Username Is The Same As The Old Username.\n');
            logToServer(`Error: ${currentUsername} Tried To Change To The Same Username`);
            return;
        }

        if (Object.values(clientNames).includes(newUsername)) {
            clients[clientId].write('Error: Username Already In Use.\n');
            logToServer(`Error: ${currentUsername} Tried To Change To An Already Used Username`);
            return;
        }

        clientNames[clientId] = newUsername;
        broadcast(`${currentUsername} Has Changed Their Name To ${newUsername}.`, clientId);
        clients[clientId].write(`Your Username Has Been Changed To ${newUsername}\n`);
        logToServer(`${currentUsername} Has Changed Their Name To ${newUsername}`);
    }

    function handleKick(args, clientId) {
        if (args.length !== 3) {
            clients[clientId].write('Error: Incorrect Number Of Inputs For /kick Command.\n');
            logToServer(`Error: Incorrect Number Of Inputs For /kick Command By ${clientNames[clientId]}`);
            return;
        }

        const userToKick = args[1];
        const password = args[2];

        if (password !== adminPassword) {
            clients[clientId].write('Error: Incorrect Admin Password.\n');
            logToServer(`Error: Incorrect Admin Password For /kick Command By ${clientNames[clientId]}`);
            return;
        }

        const userToKickId = getClientIdByName(userToKick);

        if (!userToKickId) {
            clients[clientId].write('Error: Invalid Username To Kick.\n');
            logToServer(`Error: Invalid Username To Kick By ${clientNames[clientId]}`);
            return;
        }

        if (userToKickId === clientId) {
            clients[clientId].write('Error: Cannot Kick Yourself.\n');
            logToServer(`Error: ${clientNames[clientId]} Tried To Kick Themselves`);
            return;
        }

        clients[userToKickId].write('You Have Been Kicked From The Chat.\n');
        clients[userToKickId].end();
        logToServer(`${clientNames[userToKickId]} Has Been Kicked By ${clientNames[clientId]}`);
    }

    function handleClientList(clientId) {
        const clientList = Object.values(clientNames).join(', ');
        clients[clientId].write(`Connected Clients: ${clientList}\n`);
        logToServer(`${clientNames[clientId]} Requested The Client List`);
    }

    function getClientIdByName(name) {
        return Object.keys(clientNames).find(key => clientNames[key] === name);
    }

    function logToServer(message) {
        fs.appendFile('server.log', `${message}\n`, err => {
            if (err) throw err;
        });
    }

}).listen(3000, () => {
    console.log(`Server Listening On Port ${server.address().port}`);
});
