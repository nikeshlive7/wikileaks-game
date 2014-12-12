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
    this.width = 30;
    this.height = 50;
    this.top = 320;
    this.left = 290;

    var isJumping = 0;
    var jump = 0;

    var moveDownPlayer = 0;
    var dc = new DetectCollision();


    this.init = function() {
        document.onkeydown = that.downKeyHandler;
        document.onkeyup = that.upKeyHandler;
        that.top = wiki.stairs[that.currentStair].top - that.height;
        that.left = wiki.stairs[that.currentStair].left + wiki.stairs[that.currentStair].width / 2 - that.width / 2;
        that.playerEl = document.createElement('div');
        that.playerEl.className = "player";
        that.playerEl.style.width = that.width + "px";
        that.playerEl.style.height = that.height + "px";
        that.playerEl.style.top = that.top + "px";
        that.playerEl.style.left = that.left + "px";
        wiki.gameWrapper.appendChild(that.playerEl);


    }

    this.moveLeft = function() {

        if (that.left > 40) {
            that.left -= 15;
            that.playerEl.style.left = that.left + "px";
        }
        if (dc.onMovingLeftRight(that, that.wiki.stairs)) {

            moveDownPlayer = 1;
        }
        that.goLeft = true;
    }

    this.moveRight = function() {
        if (that.left < 520) {
            that.left += 15;
            that.playerEl.style.left = that.left + "px";
        }
        if (dc.onMovingLeftRight(that, that.wiki.stairs)) {

            moveDownPlayer = 1;
        }
        that.goLeft = false;
    }

    this.moveUp = function() {


        that.top -= 5;
        that.playerEl.style.top = that.top + "px";
        if (dc.onMovingUp(that, that.wiki.stairs)) {
            jump = 160;
        }
    }

    this.moveDown = function() {
        if (dc.onMovingDown(that, that.wiki.stairs)) {
            jump = 0;
            isJumping = 0;

            moveDownPlayer = 0;

        } else {
            that.top += 5;
            that.playerEl.style.top = that.top + "px";
            if (that.top > 530) {
                that.wiki.gameWrapper.removeChild(that.playerEl);

                window.cancelAnimationFrame(that.wiki.gameLoopIntervalId);

            }
        }

    }

    this.manageJump = function() {
        if (jump >= 150) {
            that.moveDown();

        } else if (isJumping == 1) {

            jump += 5;
            that.moveUp();
        }

    }

    this.managePlayer = function() {
        counterMovePlayer++;

        that.manageJump();
        if (moveDownPlayer == 1) {
            that.moveDown();
        }




    }

    this.distroyAnimation = function() {

        wiki.gameWrapper.removeChild(that.playerEl);
    }

    this.downKeyHandler = function(e) {
        //console.log(e.keyCode);
        switch (e.keyCode) {
            case 37:
                that.goLeft = 1;
                that.moveLeft();
                break;
            case 39:
                that.goLeft = 0;
                that.moveRight();
                break;
            case 38:
                if (isJumping == 0) {

                    //moveUpInterval = setInterval(that.moveUp, 10);
                    isJumping = 1;
                }
                break;
            case 40:
                break;

        }
    }

    that.upKeyHandler = function(e) {
        switch (e.keyCode) {

            case 32:


                wiki.createBullet();


                break;

        }
    }



}


