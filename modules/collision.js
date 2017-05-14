"use strict";

function Collision() {

}

Collision.prototype.hasCollision = function(first, second, callback) {
    //if(first.x >= second.x && first.x <= (second.x + second.width) && first.y >= second.y && first.y <= (second.y + second.height)) {
    //    
    //} 
    let firstObj = {
        left: first.position.x,
        right: first.position.x + first.width,
        top: first.position.y,
        bottom: first.position.y + first.height
    }

    let secondObj = {
        left: second.position.x,
        right: second.position.x + second.width,
        top: second.position.y,
        bottom: second.position.y + second.height
    }


    //console.log("player: ", firstObj) 
    //console.log("food: ", secondObj) 
    // if dino eat whole point
    if(secondObj.left >= firstObj.left && secondObj.top >= firstObj.top && secondObj.right <= firstObj.right && secondObj.bottom <= firstObj.bottom) {
        callback();

    }
    
}

module.exports = Collision;
