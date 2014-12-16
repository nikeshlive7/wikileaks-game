// JavaScript Document
'use strict';


//opponent class ---------------------------------------------------------------------------------
function Opponent(wikileakes) {
    
    this.age = 3;
    this.opponentEl;
    this.wiki = wikileakes;
    this.width = 30;
    this.height = 50;
    this.left = 285;
    this.top = -40;
    this.currentStair = 0;
    this.moveDownOpponent = true;
    this.goLeft = false;

	var that = this;
    var dc = new DetectCollision();
	var isWalk = true;

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
			that.opponentEl.style.backgroundPosition = "-80px 0px";
        } else {
            that.goLeft = true;
			        }

    };

    function getRandom() {

        return Math.round(Math.random());

    }



    this.moveLeftRight = function() {

        if (that.goLeft == true) {
			
			if(isWalk){
			that.opponentEl.style.backgroundPosition = "-40px 0px";
			that.moveUp();
			isWalk = false;
			}else{
				
				that.opponentEl.style.backgroundPosition = "0px 0px";
				that.moveDown();
				isWalk = true;
				}
            that.left -= 10;
            if (that.left < 40)
                that.goLeft = false;
        } else {
			if(isWalk){
				that.opponentEl.style.backgroundPosition = "-120px 0px";
				that.moveUp();
				isWalk =false;
				}else{
					that.opponentEl.style.backgroundPosition = "-80px 0px";
					that.moveDown();
					isWalk=true;
					}
			
            that.left += 10;
            if (that.left > 520) {
                that.goLeft = true;
            }
        }
        that.opponentEl.style.left = that.left + "px";

    };

    this.moveDown = function() {

        that.top += 5;
        that.opponentEl.style.top = that.top + "px";

    };
	
	this.moveUp = function() {

        that.top -= 5;
        that.opponentEl.style.top = that.top + "px";

    };

    this.updateOpponent = function() {

        if (that.moveDownOpponent == true) {
            that.moveDown();
        } else {
            that.moveLeftRight();
        }

    };

    this.detectCollisions = function() {
        if (dc.onMovingLeftRight(that, wiki.stairs)) {
            that.moveDownOpponent = true;
        }

        if (dc.onMovingDown(that, wiki.stairs)) {
            that.moveDownOpponent = false;
        }

        if (dc.collisionRect(wiki.player, that)) {
            return "gameOver";
        }

        if (that.top > 550) {
            return "clearOpponent";
        }

    };

    this.deleteOpponent = function() {
        wiki.gameWrapper.removeChild(that.opponentEl);
    };

    this.destroyAnimation = function() {

    };
	
	

}

