// JavaScript Document
'use strict';


//opponent class ---------------------------------------------------------------------------------
function Opponent(wikileakes) {
    var that = this;
    var dc = new DetectCollision();

    this.age = 3;
    this.opponentEl;
    this.wiki = wikileakes;
    this.width = 30;
    this.height = 50;
    this.left = 250;
    this.top = -40;
    this.currentStair = 0;
    this.moveDownOpponent = true;
    this.goLeft = false;



    this.init = function() {

        that.opponentEl = document.createElement('div');
        that.opponentEl.style.height = that.height + "px";
        that.opponentEl.style.width = that.width + "px";
        that.opponentEl.style.top = that.top + "px";
        that.opponentEl.style.left = that.left + "px";
        that.opponentEl.className = "opponent";
        wiki.gameWrapper.appendChild(that.opponentEl);


        that.moveDownOpponent = 1;
        if (getRandom() == 1) {
            that.goLeft = false;
        } else {
            that.goLeft = true;
        }

    }

    function getRandom() {

        return Math.round(Math.random());

    }



    this.moveLeftRight = function() {



        if (that.goLeft == true) {
            that.left -= 5;
            that.opponentEl.style.left = that.left + "px";
            if (that.left < 40)
                that.goLeft = false;
        } else {

            that.left += 5;
            that.opponentEl.style.left = that.left + "px";
            if (that.left > 520)
                that.goLeft = true;

        }





    }




    this.moveDown = function() {

        that.top += 5;
        that.opponentEl.style.top = that.top + "px";




    }





    this.updateOpponent = function() {

        if (that.moveDownOpponent == true) {
            that.moveDown();
        } else {
            that.moveLeftRight();
        }


    }

    this.detectCollisions = function() {
        if (dc.onMovingLeftRightOpponent(that, wiki.stairs)) {


            that.moveDownOpponent = true;
        }




        if (dc.onMovingDownOpponent(that, wiki.stairs)) {


            that.moveDownOpponent = false;

        }

        if (dc.collisionPlayerOpponent(wiki.player, that)) {

            return "gameOver";

        }

        if (that.top > 550) {

            return "clearOpponent";

        }

    }


    this.deleteOpponent = function() {
        wiki.gameWrapper.removeChild(that.opponentEl);
    }

    this.destroyAnimation = function() {

    }


}

