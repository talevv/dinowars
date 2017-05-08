"use strict";

const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game = require("./modules/game.js");


app.use(express.static('assets'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


const game = new Game();

io.on('connection', function(socket){
    console.log('a user connected');

    const player = game.generatePlayer(socket.id);
    game.addPlayer(player);

    socket.emit("send id", player.id);
    io.emit("players list", game.players);

    socket.on('disconnect', function(){
        console.log('user disconnected');
        game.removePlayer(socket.id);
        io.emit("players list", game.players);
    });

    socket.on('move player', function(player){
        game.movePlayer(player);
        io.emit("players list", game.players);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
