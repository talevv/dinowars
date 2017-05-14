"use strict";

const FoodGenerator = require("./food_generator.js");
const Collision = require("./collision.js");

const collision = new Collision();

function Game() {
    this.players = [];
    this.foodGenerator = new FoodGenerator();
    this.foodGenerator.generateFood();
}

Game.prototype = {
    generatePlayer: function (id) {
        const player = {};
        player.color = Math.floor((Math.random() * 3) + 0);
        player.position = {
            x: Math.floor((Math.random() * 1550) + 50),
            y: Math.floor((Math.random() * 750) + 5)
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

        let collisionPlayer = {
            position: playerToMove.position,
            width: 16 * playerToMove.scale,
            height: 8 * playerToMove.scale
        }

        this.foodGenerator.food.forEach((food) => {
            let collisionFood = {
                position: { 
                  x: food.x,
                  y: food.y
                },
                width: 11*food.scale,
                height: 14*food.scale
                    
            }
            collision.hasCollision(collisionPlayer, collisionFood, () => { 
                this.foodGenerator.removeFood(food.id)
                console.log("col")
                playerToMove.scale += 0.2;
                this.foodGenerator.generateFood();
            });
        });        

    }
}

module.exports = Game;
