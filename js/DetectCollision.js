// JavaScript Document
'use strict';



//detect collision of player opponent and bullets------------------------------------------------------------
function DetectCollision() {


    //only collide with top of rectArray element
    this.onMovingDown = function(rect, rectArray) {

        for (var i = 0; i < rectArray.length; i++) {
            var rectA = rectArray[i];
            if (rectA.left < rect.left + rect.width &&
                    rectA.left + rectA.width > rect.left &&
                    rectA.top == rect.top + rect.height) {
                rect.currentStair = i;
                return true;
            }
        }
        return false;
    };

    //only collide with bottom of rectArray element
    this.onMovingUp = function(rect, rectArray) {
        for (var i = 0; i < rectArray.length; i++) {
            var rectA = rectArray[i];
            if (rectA.left < rect.left + rect.width &&
                    rectA.left + rectA.width > rect.left &&
                    rectA.top + rectA.height == rect.top) {

                return true;
            }
        }
        return false;
    };

    //no collision rectangle with rect Arrayangle
    this.onMovingLeftRight = function(rect, rectArray) {
        //console.log(player.offsetLeft, stairs[currentStair].offsetLeft + stairs[currentStair].offsetWidth - 15);
        var rectA = rectArray[rect.currentStair];
        if (rectA.top == rect.top + rect.height &&
                (rectA.left > rect.left + rect.width ||
                        rectA.left + rectA.width < rect.left)) {

            return true;

        }
        return false;

    };



    //collison between recttangle
    this.collisionRect = function(rect1, rect2) {

        if (rect1.left <= rect2.left + rect2.width && // left edge of player is < right edge of opponent
                rect1.left + rect1.width >= rect2.left && // right edge of player is > left edge of opponent
                rect1.top <= rect2.top + rect2.height && // top edge of player is < bottom edge of opponent
                rect1.height + rect1.top >= rect2.top) {	 // bottom edge of player is > top edge of opponent

            return true;
        }

        return false;
    };

    //collision with rectangle and Array of rectangle
    this.colisionRectAndRectarray = function(rect, rectArray) {

        for (var i = 0; i < rectArray.length; i++) {
            var rectA = rectArray[i];

            if (rect.left < rectA.left + rectA.width &&
                    rect.left + rect.width > rectA.left &&
                    rect.top < rectA.top + rectA.height &&
                    rect.height + rect.top > rectA.top)
            {

                return i;	//return collide array element
            }
        }

    };


}


