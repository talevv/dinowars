"use strict";

function Game() {
    this.players = [];
}

Game.prototype = {
    generatePlayer: function (id) {
        const player = {};
        player.color = Math.floor((Math.random() * 3) + 0);
        player.position = {
            x: Math.floor((Math.random() * 600) + 0),
            y: Math.floor((Math.random() * 400) + 0)
        }
        player.name = "Rex";
        player.scale = 6;
        player.id = id;
        player.side = "left";

        return player;
    },
    addPlayer: function (player) {
        this.players.push(player)
    },
    removePlayer: function (id) {
        this.players = this.players.filter( function (player) {
            return player.id !== id;
        });
    },
    getPlayers: function() {
        return this.players.map(function (player) {
            return {
                position: player.position,
                color: player.color,
                name: player.name,
                scale: player.scale,
                side: player.side
            }
        });
    },
    movePlayer: function(player) {
        var playerToMove = this.players.find(function(playerArray) {
            return playerArray.id == player.id;
        });

        if(playerToMove != undefined){
            if(player.direction == "horizontal") {
                if(player.side == "right") {
                    playerToMove.side = "right";
                } else {
                    playerToMove.side = "left";
                }
                playerToMove.position.x += 10 * player.turn;
            } else {
                playerToMove.position.y += 10 * player.turn;
            }
        }

    }
}

module.exports = Game;
