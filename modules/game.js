
function Game() {
    this.players = [];
}

Game.prototype = {
    generatePlayer: function (id) {
        var player = {};
        player.color = "red";
        player.position = {
            x: 0,
            y: 0
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
    }
}

module.exports = Game;
