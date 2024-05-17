const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const port = process.env.PORT || 3278;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});