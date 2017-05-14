(function () {

    const canvas = document.querySelector("canvas");
    const board = canvas.getContext("2d");
    const dinos = document.getElementById("scream");
    board.imageSmoothingEnabled = false;

    const socket = io();

    const keys = [];

    const Game = function () {
        this.id = "";
        this.players = [];
        this.food = [];
        this.playerImage = new Image();
        this.playerImageScale = 6;
        this.playerImage.onload = () => {
            this.drawImage(0, 0, 0, this.playerImageScale);
        }
        this.playerImage.src = 'img/dinos.png';

        
        this.foodImage = new Image();
        this.foodImageScale = 3;
        this.foodImage.onload = () => {
            this.drawImage(0, 0, 0, this.foodImageScale);
        }
        this.foodImage.src = 'img/humans.png';
    }

    Game.prototype = {
        setPlayers: function (players) {
            this.players = players;
        },
        setId: function(id) {
            this.id = id;
        },
        setFood: function(food) {
            this.food = food; 
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
        drawFood: function (positionX, positionY, color, scale) {
           board.drawImage(this.foodImage, 0, 14 * color, 11, 14, positionX, positionY, 11*scale, 14*scale); 
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

                    //this.drawImage(0, player.position.y, player.color, this.playerImageScale);
                    this.drawImage(0, player.position.y, player.color, player.scale);

                    board.restore();


                } else {
                    this.drawImage(player.position.x, player.position.y, player.color, player.scale);
                }

            });

            this.food.forEach((food) => {
                this.drawFood(food.x, food.y,food.color, food.scale); 
            })
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
    socket.on("food list", function(foodList){
        game.setFood(foodList);
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

})();
