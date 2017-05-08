const canvas = document.querySelector("canvas");
const board = canvas.getContext("2d");
const dinos = document.getElementById("scream");
board.imageSmoothingEnabled = false;

const socket = io();


var scale = 6;


const keys = [];

const Game = function () {
    this.id = "";
    this.players = [];
    this.playerImage = new Image();
    this.playerImageScale = 6;
    this.playerImage.onload = () => {
        board.drawImage(this.playerImage, 0, 0, 16, 8, 0, 0, 16*this.playerImageScale, 8*this.playerImageScale);
        //this.drawImage(0, 0, 0, this.playerImageScale);
    }
    this.playerImage.src = 'img/dinos.png';
}

Game.prototype = {
    setPlayers: function (players) {
        this.players = players;
    },
    setId: function(id) {
        this.id = id;
    },
    movePlayer: function(direction, turn, side) {

        const player = {
            id: this.id,
            direction: direction,
            turn: turn,
            side: side
        }
        socket.emit("move player", player);
    },
    drawImage: function (positionX, positionY, color, scale) {
        board.drawImage(this.playerImage, 0, 8 * color, 16, 8, positionX, positionY, 16*scale, 8*scale);
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


        this.players.forEach((player) => {
            if(player.side == "right") {

                board.save();

                board.translate(player.position.x + 16*8, 0);
                board.scale(-1, 1);

                this.drawImage(0, player.position.y, player.color, this.playerImageScale);

                board.restore();


            } else {
                this.drawImage(player.position.x, player.position.y, player.color, this.playerImageScale);
            }

        });
    }
}

const game = new Game();


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
