"use strict";

function FoodGenerator() {
    this.maxAmount = 20;
    this.food = [];
}

FoodGenerator.prototype.generateFood = function() {
    while(this.food.length < this.maxAmount) {
        let foodStat = {
            //id: Math.random(),
            x: Math.floor((Math.random() * 780) + 20),
            y: Math.floor((Math.random() * 580) + 20),
            scale: 10
        }
        this.food.push(foodStat);
    }
}

FoodGenerator.prototype.removeFood = function(id) {
    this.food = this.food.filter(food => food.id !== id);
}

module.exports = FoodGenerator;
