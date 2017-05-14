"use strict";

function Collision() {

}

Collision.prototype.hasCollision = function(first, second, callback) {
    //if(first.x >= second.x && first.x <= (second.x + second.width) && first.y >= second.y && first.y <= (second.y + second.height)) {
    //    
    //} 
    let firstObj = {
        left: first.x,
        right: first.x + first.width,
        top: first.y,
        bottom: first.y + first.height
    }

    let secondObj = {
        left: second.x,
        right: second.x + second.width,
        top: second.y,
        bottom: second.y + second.height
    }
    
    // if dino eat whole point
    if(secondObj.left >= firstObj.left && secondObj.top >= firstObj.top && secondObj.right <= firstObj.right && secondObj.bottom <= firstObj.bottom) {
        callback();
    }
    
}

module.exports = Collision;
