const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
    console.log('New webSocket Connection');

    // socket.emit('countUpdated',count);

    // socket.on('increment', () => {
    //     count++;
    //     // socket.emit('countUpdated',count);
    //     io.emit('countUpdated',count);
    // })

    socket.emit('message', 'welcome!');

    socket.broadcast.emit('message', 'A new User has joined');

    socket.on('SendMessage', (sendmsg) => {
        io.emit('message',sendmsg);
    })


    socket.on('disconnect', () => {
        io.emit('message','A user has left..!')
    })
})


server.listen(port, () => {
    console.log(`server is up on port :${port}!`);
})