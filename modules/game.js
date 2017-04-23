
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
                scale: player.scale
            }
        });
    },
    movePlayer: function(player) {
        this.players = this.players.map(function (playerListItem) {
            if(playerListItem.id == player.id) {
                if(player.direction == "horizontal") {
                    playerListItem.position.x += 10 * player.turn;
                } else {
                    playerListItem.position.y += 10 * player.turn;
                }
            }
            return playerListItem;
        });
    }
}

module.exports = Game;
