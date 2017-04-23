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
    this.players = [];
}

Game.prototype = {
    setPlayers: function (players) {
        this.players = players;
    }
}

var game = new Game();


socket.on("send id", function(playerId){
  console.log(playerId);
});

socket.on("players list", function(playersList){
    game.setPlayers(playersList);
    console.log(game.players);
});
