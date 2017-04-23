var canvas = document.querySelector("canvas");
var board = canvas.getContext("2d");
var dinos = document.getElementById("scream");
board.imageSmoothingEnabled = false;

var socket = io();

var img = new Image();

var scale = 6;

img.onload = function() {
    board.drawImage(img, 0, 0, 16, 8, 0, 0, 16*scale, 8*scale);
}

img.src = 'img/dinos.png';

var Game = function () {
    this.id = "";
    this.players = [];
}

Game.prototype = {
    setPlayers: function (players) {
        this.players = players;
    },
    setId: function(id) {
        this.id = id;
    },
    movePlayer: function(direction, turn) {
        var player = {
            id: this.id,
            direction: direction,
            turn: turn
        }
        socket.emit("move player", player);
    }
}

var game = new Game();


socket.on("send id", function(playerId){
    game.setId(playerId);
    console.log(game.id);
});

socket.on("players list", function(playersList){
    game.setPlayers(playersList);
    console.log(game.players);
});

document.addEventListener("keydown", function(e) {
    var keyCode = e.keyCode;
    console.log(keyCode)
    if(keyCode == 39) {
        game.movePlayer("horizontal", 1);
    }
})
