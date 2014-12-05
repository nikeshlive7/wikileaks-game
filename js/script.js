// JavaScript Document
'use strict';

var canvas = document.getElementById("canvas");
var wiki = new Wikileaks(canvas);
wiki.init();

function Wikileaks(canvas) {


    this.gameWrapper = canvas;
    var that = this;
    this.gameLoopInterval = 10;

    var counter = 0;

    this.init = function() {

        var player = new Player(that);
        player.init();

        setInterval(that.gameLoop, gameLoopInterval);
    }

    this.gameLoop = function() {
        counter++;

        if (counter % 100 == 0) {
            // create an opponent
        }

        if (counter % 10 == 0) {
            // jump player

        }
    }
}



function Player(wiki) {

    var currentStair = 0;
    var playerEl;
    var playerElLeft;
    var playerElTop;
    var isJumping = 0;
    var jump = 0;
    var moveUpInterval;
    var moveDownInterval;
    var onStair = 0;
    var stairs = wiki.gameWrapper.getElementsByTagName("div");
    var that = this;
    this.init = function() {
        document.onkeydown = that.moveplayerEl;
        playerEl = document.createElement('div');
        playerEl.className = "player";
        console.log(wiki.gameWrapper, playerEl);
        wiki.gameWrapper.appendChild(playerEl);
        playerElLeft = playerEl.offsetLeft;
        playerElTop = playerEl.offsetTop;


    }

    this.moveLeft = function() {

        playerElLeft -= 15;
        playerEl.style.left = playerElLeft + "px";
        that.detectCollision();
    }

    this.moveRight = function() {

        playerElLeft += 15;
        playerEl.style.left = playerElLeft + "px";
        that.detectCollision();
    }

    this.moveUp = function() {

        if (jump >= 150) {
            jump = 0;
            clearInterval(moveUpInterval);
            moveDownInterval = setInterval(that.moveDown, 25);
        }
        console.log(jump, playerElTop);
        jump += 5;
        playerElTop -= 5;
        playerEl.style.top = playerElTop + "px";
    }

    this.moveDown = function() {
        that.detectCollision();
        //console.log(playerElTop);
        playerElTop += 5;
        playerEl.style.top = playerElTop + "px";

    }

    this.moveplayerEl = function(e) {
        //console.log(e.keyCode);
        switch (e.keyCode) {
            case 37:
                that.moveLeft();
                break;
            case 39:
                that.moveRight();
                break;
            case 38:
                if (isJumping == 0) {

                    moveUpInterval = setInterval(that.moveUp, 10);
                    isJumping = 1;
                }
                break;
            case 40:
                break;

        }
    }


    this.detectCollision = function() {

        for (var i = 0; i < stairs.length - 1; i++) {
            //console.log(stairs[i].offsetWidth);
            if (stairs[i].offsetTop == playerEl.offsetTop + 20 && stairs[i].offsetLeft < playerEl.offsetLeft + 20 && playerEl.offsetLeft < (stairs[i].offsetLeft + stairs[i].offsetWidth)) {
                currentStair = i;
                playerElTop -= 5;
                clearInterval(moveDownInterval);
                isJumping = 0;
                onStair = 1;
            }

            if (onStair == 1 && stairs[currentStair].offsetTop == playerEl.offsetTop + 20 && (stairs[currentStair].offsetLeft > playerEl.offsetLeft + 20 || playerEl.offsetLeft > stairs[currentStair].offsetLeft + stairs[currentStair].offsetWidth)) {
                console.log("block of move down left right");
                onStair = 0;
                clearInterval(moveDownInterval);
                moveDownInterval = setInterval(that.moveDown, 20);
            }

            if (playerElTop > 530) {
                clearInterval(moveDownInterval);
            }
        }

    }



}

