"use strict";

function FoodGenerator() {
    this.maxAmount = 20;
    this.food = [];
}

FoodGenerator.prototype.generateFood = function() {
    while(this.food.length < this.maxAmount) {
        let foodStat = {
            id: Math.random(),
            x: Math.floor((Math.random() * 1550) + 50),
            y: Math.floor((Math.random() * 750) + 50),
            //scale: Math.floor((Math.random() * 20) + 10)
            color: Math.floor((Math.random() * 3) + 0),
            scale: 2
        }
        this.food.push(foodStat);
    }
}

FoodGenerator.prototype.removeFood = function(id) {
    this.food = this.food.filter(food => food.id !== id);
}

module.exports = FoodGenerator;
