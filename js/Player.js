// JavaScript Document
'use strict';

//player class....................................................................
function Player(wikileakes) {

    var that = this;
    var counterMovePlayer = 0;
    this.currentStair = 3;
    this.playerEl;
    this.goLeft = true;
    this.wiki = wikileakes;
    this.width = 40;
    this.height = 50;
    this.top = 320;
    this.left = 290;
	

    var isJumping = 0;
    var jump = 0;
    var moveDownPlayer = 0;
    var dc = new DetectCollision();

    this.init = function() {
       
        that.top = wiki.stairs[that.currentStair].top - that.height;
        that.left = wiki.stairs[that.currentStair].left + wiki.stairs[that.currentStair].width / 2 - that.width / 2;
        that.playerEl = document.createElement('div');
        that.playerEl.className = "player";
        that.playerEl.style.width = that.width + "px";
        that.playerEl.style.height = that.height + "px";
        that.playerEl.style.top = that.top + "px";
        that.playerEl.style.left = that.left + "px";
        wiki.gameWrapper.appendChild(that.playerEl);

    };

    this.moveLeft = function() {
	
			that.playerEl.style.backgroundPosition="0px 0px";
			
        if (that.left > 40) {
            that.left -= 15;
            that.playerEl.style.left = that.left + "px";
        }

        that.goLeft = true;
    };

    this.moveRight = function() {
		that.playerEl.style.backgroundPosition="-150px 0px";
        if (that.left < 520) {
            that.left += 15;
            that.playerEl.style.left = that.left + "px";
        }

        that.goLeft = false;
    };

    this.moveUp = function() {
        that.top -= 5;
        that.playerEl.style.top = that.top + "px";

    };

    this.moveDown = function() {

        that.top += 5;
        that.playerEl.style.top = that.top + "px";

    };

    this.manageJump = function() {
        if (jump >= 150) {
            that.moveDown();
        } else if (isJumping == 1) {
            jump += 5;
            that.moveUp();
        }
		
		if(that.goLeft==true){
			that.playerEl.style.backgroundPosition="-100px 0px";
			}else{
				that.playerEl.style.backgroundPosition="-250px 0px";
				}

    };

    this.managePlayer = function() {
        counterMovePlayer++;

        if (isJumping == 1) {
            that.manageJump();
        }
        if (moveDownPlayer == 1) {
            that.moveDown();
        }
    };

    this.detectCollisionPlayer = function() {
        if (dc.onMovingLeftRight(that, that.wiki.stairs)) {

            moveDownPlayer = 1;
        }

        if (dc.onMovingDown(that, that.wiki.stairs)) {
            jump = 0;
            isJumping = 0;
            moveDownPlayer = 0;
        }

        if (dc.onMovingUp(that, that.wiki.stairs)) {
            jump = 160;
        }

        if (that.top > 530) {
            return "gameOver";


        }


    };

    this.deletePlayer = function() {
        wiki.gameWrapper.removeChild(that.playerEl);
        window.cancelAnimationFrame(that.wiki.gameLoopIntervalId);
		playerAlive = false;
    };

    this.distroyAnimation = function() {

        wiki.gameWrapper.removeChild(that.playerEl);
        window.cancelAnimationFrame(that.wiki.gameLoopIntervalId);
	
    };
	
	this.jumpKeyPressed = function(){
			if (isJumping == 0) {
                    isJumping = 1;
                }
		}

    
}


