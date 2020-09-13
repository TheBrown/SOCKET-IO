const express = require('express');
const socket = require('socket.io');

// App Setup
const app = express();
const server = app.listen(4000, () => {
    console.log('Listening to request on port 4000');
});


// Static files
app.use(express.static('public'))

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log("made socket connection", socket.id);

    // Handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});