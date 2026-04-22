//npm install ws
//npm init -y
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, 'index.html'));
});

//Real-time connection handling
io.on('connection', (socket) => {
    console.log('A user connected: '+ socket.id);

    socket.on('chat message', (msg) => {

        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});