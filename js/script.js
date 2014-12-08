// JavaScript Document
'use strict';

var canvas = document.getElementById("canvas");
var wiki = new Wikileaks(canvas);
wiki.init();

//main game class 
function Wikileaks(canvas) {


    this.gameWrapper = canvas;
    var that = this;
    var gameLoopInterval = 1;
    this.player = new Player(that);
    var opponent = new Opponent(that);
    var counter = 0;
    var managePlayer = 3;
    var frequencyOfCreatingOpponent = 500;
    var moveOpponentSpeed = 5;
    var that = this;
    this.init = function() {


        that.player.init();

        setInterval(that.gameLoop, gameLoopInterval);
    }

    this.gameLoop = function() {
        counter++;

        if (counter % frequencyOfCreatingOpponent == 0) {
            //create new opponent
            opponent.createOpponent();
        }

        if (counter % moveOpponentSpeed == 0) {
            // move opponent
            opponent.manageOpponent();
        }

        if (counter % managePlayer == 0) {
            //move player
            that.player.managePlayer();

        }
    }
}


//player class
function Player(wikileakes) {
    var counterMovePlayer = 0;
    var currentStair = 0;
    this.playerEl;
    this.wiki = wikileakes;
    var playerElLeft;
    var playerElTop;
    var isJumping = 0;
    var jump = 0;
    var moveUpInterval;
    var moveDownInterval;
    var onStair = 0;
    var that = this;
    var moveDownPlayer = 0;
    this.stairs = that.wiki.gameWrapper.getElementsByTagName("div");
    var dc;
    this.init = function() {
        document.onkeydown = that.moveplayerEl;
        that.playerEl = document.createElement('div');
        that.playerEl.className = "player";
        //console.log(wiki.gameWrapper, playerEl);
        wiki.gameWrapper.appendChild(that.playerEl);
        playerElLeft = that.playerEl.offsetLeft;
        playerElTop = that.playerEl.offsetTop;
        dc = new DetectCollision(that);

    }

    this.moveLeft = function() {
        if (playerElLeft > 40) {
            playerElLeft -= 15;
            that.playerEl.style.left = playerElLeft + "px";
        }
        if (dc.onMovingLeftRight()) {
            onStair = 0;
            moveDownPlayer = 1;
        }

    }

    this.moveRight = function() {
        if (playerElLeft < 520) {
            playerElLeft += 15;
            that.playerEl.style.left = playerElLeft + "px";
        }
        if (dc.onMovingLeftRight()) {
            onStair = 0;
            moveDownPlayer = 1;
        }
    }

    this.moveUp = function() {


        playerElTop -= 5;
        that.playerEl.style.top = playerElTop + "px";
    }

    this.moveDown = function() {
        if (dc.onMovingDown()) {
            jump = 0;
            //clearInterval(moveDownInterval);
            isJumping = 0;
            onStair = 1;
            moveDownPlayer = 0;

        } else {
            playerElTop += 5;
            that.playerEl.style.top = playerElTop + "px";
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

                    //moveUpInterval = setInterval(that.moveUp, 10);
                    isJumping = 1;
                }
                break;
            case 40:
                break;

        }
    }




}


//opponent class 
function Opponent(wikileakes) {
    var noOfOpponent = 0;
    var counterMovePlayer = 0;
    this.opponentEl = [];
    this.wiki = wikileakes;
    var opponentElLeft = [];
    var opponentElTop = [];
    var isJumping = 0;
    var jump = 0;
    var moveUpInterval;
    var moveDownInterval;
    var onStair = 0;
    var that = this;
    var moveDownOpponent = [];
    var moveOpponentLeftRight = [];
    var goLeft = [];
    var dc = new DetectCollisions;
    this.stairs = that.wiki.gameWrapper.getElementsByTagName("div");
    var dc = new DetectCollision(that);

    this.createOpponent = function() {

        that.opponentEl[noOfOpponent] = document.createElement('div');
        that.opponentEl[noOfOpponent].style.top = -40 + "px";
        that.opponentEl[noOfOpponent].style.left = 250 + "px";
        that.opponentEl[noOfOpponent].className = "opponent";
        wiki.gameWrapper.appendChild(that.opponentEl[noOfOpponent]);
        opponentElLeft[noOfOpponent] = that.opponentEl[noOfOpponent].offsetLeft;
        opponentElTop[noOfOpponent] = that.opponentEl[noOfOpponent].offsetTop;
        moveDownOpponent[noOfOpponent] = 1;
        moveOpponentLeftRight[noOfOpponent] = 0;
        if (noOfOpponent % 2 == 0) {
            goLeft[noOfOpponent] = 0;
        } else {
            goLeft[noOfOpponent] = 1;
        }

        noOfOpponent++;

    }

    this.moveLeftRight = function() {

        for (var i = 0; i < noOfOpponent; i++) {
            if (moveOpponentLeftRight[i] == 1) {
                if (goLeft[i] == 1) {
                    opponentElLeft[i] -= 5;
                    that.opponentEl[i].style.left = opponentElLeft[i] + "px";
                    if (opponentElLeft[i] < 40)
                        goLeft[i] = 0;
                } else {

                    opponentElLeft[i] += 5;
                    that.opponentEl[i].style.left = opponentElLeft[i] + "px";
                    if (opponentElLeft[i] > 520)
                        goLeft[i] = 1;

                }
                if (dc.onMovingLeftRightOpponent(that.opponentEl[i], i)) {
                    onStair = 0;
                    moveOpponentLeftRight[i] = 0;
                    moveDownOpponent[i] = 1;
                }

                //console.log(wiki.player.playerEl);
                if (dc.collisionPlayerOpponent(wiki.player.playerEl, that.opponentEl[i])) {
                    console.log("thokyo....");
                }
            }
        }

    }




    this.moveDown = function() {
        for (var i = 0; i < noOfOpponent; i++) {
            if (dc.onMovingDownOpponent(that.opponentEl[i], i)) {

                onStair = 1;
                moveDownOpponent[i] = 0;
                moveOpponentLeftRight[i] = 1;
            } else {
                if (moveDownOpponent[i] == 1) {

                    opponentElTop[i] += 5;
                    that.opponentEl[i].style.top = opponentElTop[i] + "px";
                    if (opponentElTop[i] > 550) {
                        moveDownOpponent[i] = 0;
                        wiki.gameWrapper.removeChild(that.opponentEl[i]);
                    }

                }
            }
        }

    }



    this.manageOpponent = function() {
        counterMovePlayer++;

        that.moveDown();
        that.moveLeftRight();

    }





}

//detect collision of player opponent and bullets
function DetectCollision(player) {
    var playerEl = player.playerEl;
    var stairs = player.stairs;
    var onStair = 0;
    var currentStair = 3;
    var currentStairOpponet = [];

    // console.log(playerEl);

    this.collisionPlayerOpponent = function(player, opponent) {

        var playerEl = player;
        var opponent_x = opponent.offsetLeft;
        var opponent_y = opponent.offsetTop;
        var player_x = playerEl.offsetLeft;
        var player_y = playerEl.offsetTop;
        //console.log(player_x, opponent_x, player_y, opponent_y);
        if (((opponent_x + 40) > player_x		//right edge of e > left edge of car
                && opponent_x <= (opponent + 40))	//left edge of e < right edge of car
                || ((opponent_y + 40) > player_y	//bottom edge of e > top edge of car
                        && opponent_y <= (player_y + 40)))	//top edge of e > bottom edge of car)
        {
            return true;
        }
    }


    this.onMovingDown = function() {
        for (var i = 0; i < stairs.length - 1; i++) {
            //console.log(stairs[i].offsetWidth);

            if (stairs[i].offsetTop == playerEl.offsetTop + playerEl.offsetWidth && stairs[i].offsetLeft < playerEl.offsetLeft + playerEl.offsetWidth && playerEl.offsetLeft < (stairs[i].offsetLeft + stairs[i].offsetWidth)) {
                onStair = 1;
                currentStair = i;
                return true;

                //playerElTop -= 5;
                jump = 0;
                //clearInterval(moveDownInterval);
                isJumping = 0;

                moveDownPlayer = 0;
            }

            if (playerEl.offsetTop > 530) {
                player.wiki.gameWrapper.removeChild(playerEl);

            }
        }
    }


    //moving opponent down
    this.onMovingDownOpponent = function(playerEl, opponent) {
        var playerEl = playerEl;
        for (var i = 0; i < stairs.length - 1; i++) {
            //console.log(stairs[i].offsetWidth);

            if (stairs[i].offsetTop == playerEl.offsetTop + playerEl.offsetWidth && stairs[i].offsetLeft < playerEl.offsetLeft + playerEl.offsetWidth && playerEl.offsetLeft < (stairs[i].offsetLeft + stairs[i].offsetWidth)) {
                onStair = 1;
                currentStairOpponet[opponent] = i;
                return true;

                //playerElTop -= 5;
                jump = 0;
                //clearInterval(moveDownInterval);
                isJumping = 0;

                moveDownPlayer = 0;
            }


        }
    }


    this.onMovingLeftRightOpponent = function(playerEl, opponent) {
        var playerEl = playerEl;
        //console.log(playerEl.offsetLeft, stairs[currentStair].offsetLeft + stairs[currentStair].offsetWidth - 15);
        if (stairs[currentStairOpponet[opponent]].offsetTop == playerEl.offsetTop + playerEl.offsetWidth && (stairs[currentStairOpponet[opponent]].offsetLeft > playerEl.offsetLeft + playerEl.offsetWidth || playerEl.offsetLeft > stairs[currentStairOpponet[opponent]].offsetLeft + stairs[currentStairOpponet[opponent]].offsetWidth)) {

            onStair = 0;
            return true;

            moveDownPlayer = 1;
            //clearInterval(moveDownInterval);
            //moveDownInterval = setInterval(that.moveDown, 20);
        }
    }


    this.onMovingLeftRight = function() {
        //console.log(playerEl.offsetLeft, stairs[currentStair].offsetLeft + stairs[currentStair].offsetWidth - 15);
        if (stairs[currentStair].offsetTop == playerEl.offsetTop + playerEl.offsetWidth && (stairs[currentStair].offsetLeft > playerEl.offsetLeft + playerEl.offsetWidth || playerEl.offsetLeft > stairs[currentStair].offsetLeft + stairs[currentStair].offsetWidth)) {
            console.log("inside left right");
            onStair = 0;
            return true;

            moveDownPlayer = 1;
            //clearInterval(moveDownInterval);
            //moveDownInterval = setInterval(that.moveDown, 20);
        }
    }



}


// copy
function DetectCollisions(player) {

    var onStair = 0;
    var currentStair = 3;


    //console.log(playerEl,stairs);
    this.onObject = function(movingObject, nonMovingObject) {


        if (movingObject.offsetTop == nonMovingObject.offsetTop + playerEl.offsetWidth && nonMovingObject.offsetLeft < movingObject.offsetLeft + movingObject.offsetWidth && movingObject.offsetLeft < (nonMovingObject.offsetLeft + nonMovingObject.offsetWidth)) {
            onStair = 1;
            currentStair = i;
            return true;
        }


        if (movingObject.offsetTop > 530) {
            player.wiki.gameWrapper.removeChild(playerEl);

        }
    }



    this.outOfObject = function(movingObject, nonMovingObject) {
        //console.log(playerEl.offsetLeft, stairs[currentStair].offsetLeft + stairs[currentStair].offsetWidth - 15);
        if (nonMovingObject.offsetTop == movingObject.offsetTop + movingObject.offsetWidth && (nonMovingObject.offsetLeft > movingObject.offsetLeft + movingObject.offsetWidth || movingObject.offsetLeft > nonMovingObject.offsetLeft + nonMovingObject.offsetWidth)) {
            //console.log("inside left right");
            onStair = 0;
            return true;

            moveDownPlayer = 1;
            //clearInterval(moveDownInterval);
            //moveDownInterval = setInterval(that.moveDown, 20);
        }
    }



}


