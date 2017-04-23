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

var keys = [];

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
    movePlayer: function(direction, turn, side) {

        var player = {
            id: this.id,
            direction: direction,
            turn: turn,
            side: side
        }
        socket.emit("move player", player);
    },
    updateBoard: function () {
        requestAnimFrame(this.updateBoard.bind(this));

        if(keys[39]) {
            game.movePlayer("horizontal", 1, "right");
        }

        if(keys[37]) {
            game.movePlayer("horizontal", -1);
        }

        if(keys[38]) {
            game.movePlayer("", -1);
        }

        if(keys[40]) {
            game.movePlayer("", 1);
        }

        board.clearRect(0, 0, canvas.width, canvas.height);


        this.players.forEach(function (player) {
            // board.save();
            // board.scale(-1,1);
            // console.log(player)
            if(player.side == "right") {

                board.save();

                board.translate(player.position.x + 16*8, 0);
                board.scale(-1, 1);

                board.drawImage(img, 0, 8 * player.color, 16, 8, 0, player.position.y, 16*scale, 8*scale);


                board.restore();
                // board.restore()


            } else {
                // board.scale(-1, 1);
                board.drawImage(img, 0, 8 * player.color, 16, 8, player.position.x, player.position.y, 16*scale, 8*scale);

            }
            // board.scale(-1,1);
            // board.restore()

        });
        //
        // window.requestAnimationFrame(this.updateBoard.bind(this));
    }
}

var game = new Game();


socket.on("send id", function(playerId){
    game.setId(playerId);
    console.log(game.id);
});

socket.on("players list", function(playersList){
    game.setPlayers(playersList);

});

// key events
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 250);
        };
})();

game.updateBoard();
