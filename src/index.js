const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
    console.log('New webSocket Connection');

    socket.on('join', ({ username, room}) => {
        socket.join(room)
        socket.emit('message', generateMessage('welcome!'));
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`));

    })

    socket.on('SendMessage', (msg, callback) => {

        const filter = new Filter()
        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed...!');
        }

        // io.emit('message',msg);
        io.to('abd').emit('message', generateMessage(msg));
        callback();
    })

    socket.on('sendLocation', (sendloc, callback) => {
        io.emit('locationMessage',generateLocationMessage(`https://google.com/maps?q=${sendloc.latitude},${sendloc.longitude}`));
        callback();
    })


    socket.on('disconnect', () => {
        // io.emit('message','A user has left..!')
        io.emit('message',generateMessage('A user has left..!'));
    })
})


server.listen(port, () => {
    console.log(`server is up on port :${port}!`);
})
