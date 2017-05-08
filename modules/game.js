
function Game() {
    this.players = [];
}

Game.prototype = {
    generatePlayer: function (id) {
        var player = {};
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
        var i = 0;
        while(this.players[i].id != player.id && i < this.players.length) { i++ }
        if(i < this.players.length) {
            if(player.direction == "horizontal") {
                if(player.side == "right") {
                    this.players[i].side = "right";
                } else {
                    this.players[i].side = "left";
                }
                this.players[i].position.x += 10 * player.turn;
            } else {
                this.players[i].position.y += 10 * player.turn;
            }
        }

    }
}

module.exports = Game;
