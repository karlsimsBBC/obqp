const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
var http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('start', function(timestamp) {
        console.log('Starting a party');
        socket.broadcast.emit('play', timestamp);
    });

    socket.on('queue-question', function(data) {
        console.log('question')
        socket.broadcast.emit('question', data);
    })

    socket.on('response-answer', function(data) {
        console.log('answer', data)
        socket.broadcast.emit('user-response', data);
    })

    socket.on('queue-answer', function(data) {
        socket.broadcast.emit('answer', data)
    })

    socket.on('resume', function() {
        socket.broadcast.emit('resume');
    });

    socket.on('pause', function() {
        console.log('Pause');
        socket.broadcast.emit('pause');
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});