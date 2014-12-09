// JavaScript Document
'use strict';

var canvas = document.getElementById("canvas");
var wiki = new Wikileaks(canvas);
wiki.init();

//main game class 
function Wikileaks(canvas) {

    this.gameLoopIntervalId;
    this.gameWrapper = canvas;
    var that = this;
    var gameLoopInterval = 1;
    this.player = new Player(that);
    this.opponent = new Opponent(that);
    var counter = 0;
    var managePlayer = 1;
    var frequencyOfCreatingOpponent = 180;
    var moveOpponentSpeed = 2;
    var time = new Date().getTime();
    var that = this;
    this.init = function() {


        that.player.init();
        that.gameLoop();
        //that.gameLoopIntervalId=setInterval(that.gameLoop, gameLoopInterval);
    }



    this.gameLoop = function() {
        that.gameLoopIntervalId = window.requestAnimationFrame(that.gameLoop);
        counter++;
        var now = new Date().getTime();
        //dt = now - (time || now);
        //time = now;
        if (counter % 60 == 0) {
            //window.cancelAnimationFrame(that.gameLoopIntervalId);

            //console.log(now - time);
            time = now;
        }

        //console.log(counter);
        if (counter % frequencyOfCreatingOpponent == 0) {
            //create new opponent
           that.opponent.createOpponent();
        }

        if (counter % moveOpponentSpeed == 0) {
            // move opponent
            that.opponent.manageOpponent();
        }

        if (counter % managePlayer == 0) {
            //move player
            that.player.managePlayer();

        }
    }
}


//player class....................................................................
function Player(wikileakes) {
    var counterMovePlayer = 0;
    var currentStair = 0;
    this.playerEl;
	this.goLeft = 1;
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
	var bullet=new Bullet(that);;
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
		
		bullet.updateBullet();
		

    }

    this.moveplayerEl = function(e) {
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
			case 32: 
					
					//(bullets).push(e);
					bullet.createBullet();
					//bullet_counter =0;
					
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

        if (getRandom() == 1) {
            goLeft[noOfOpponent] = 0;
        } else {
            goLeft[noOfOpponent] = 1;
        }

        noOfOpponent++;

    }

    function getRandom() {

        return Math.round(Math.random() * 2);

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
                    wiki.gameWrapper.removeChild(wiki.player.playerEl);
                    window.cancelAnimationFrame(wiki.gameLoopIntervalId);
                    //clearInterval(wiki.gameLoopIntervalId);
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
            if (dc.collisionPlayerOpponent(wiki.player.playerEl, that.opponentEl[i])) {
                wiki.gameWrapper.removeChild(wiki.player.playerEl);
                window.cancelAnimationFrame(wiki.gameLoopIntervalId);
                //clearInterval(wiki.gameLoopIntervalId);
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
        //console.log(player_x, opponent_x+ 40, player_y, opponent_y);
        if ((opponent_x + 40) >= player_x		//right edge of opponent > left edge of player
                && (opponent_x - 40) <= player_x	//left edge of opponent < right edge of player
                && (opponent_y + 40) >= player_y	//bottom edge of opponent > top edge of player
                && (opponent_y - 40) <= player_y)	//top edge of opponent > bottom edge of player)
        {
            return true;
        }
    }


    this.onMovingDown = function() {
        for (var i = 0; i < 8; i++) {
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
        for (var i = 0; i < 8; i++) {
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
            //console.log("inside left right");
            onStair = 0;
            return true;

            moveDownPlayer = 1;
            //clearInterval(moveDownInterval);
            //moveDownInterval = setInterval(that.moveDown, 20);
        }
    }
	this.colisionOpponentBullet=function(bullet,opponents){
		//console.log(opponents.leng);
			for(var i = 0;i<opponents.length;i++){
					var bullet = bullet;
        			var opponent_x = opponents[i].offsetLeft;
       				var opponent_y = opponents[i].offsetTop;
       			 	var bullet_x = bullet.offsetLeft;
        			var bullet_y = bullet.offsetTop;
       //console.log(bullet_x, opponent_x+ 40, bullet_y, opponent_y);
        if ((opponent_x + 40) >= bullet_x		//right edge of opponent > left edge of player
                && (opponent_x - 40) <= bullet_x	//left edge of opponent < right edge of player
                && (opponent_y + 40) >= bullet_y	//bottom edge of opponent > top edge of player
                && (opponent_y - 40) <= bullet_y)	//top edge of opponent > bottom edge of player)
        {
            
			return i;
        }
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

//bullets class 

function Bullet(player)
{
    var that = this;
	var dc = new DetectCollision(that);
    this.bullet_x=[];
    this.bullet_y=[];
    this.bullets=[];
    this.dx = 10;
	this.noOfBullets=0;
	this.goLeft = [];
	var collideOpponent;

    this.createBullet = function() {
		//console.log(player.wiki);
        that.bullets[that.noOfBullets] = document.createElement('div');
        that.bullets[that.noOfBullets].className = "bullets"; //style
		that.goLeft[that.noOfBullets] = player.goLeft;
		if(player.goLeft==1){
        	that.bullet_x[that.noOfBullets] = (player.playerEl.offsetLeft)-10;
		}
		else{
			that.bullet_x[that.noOfBullets] = (player.playerEl.offsetLeft)+40;
		}
        that.bullet_y[that.noOfBullets] = player.playerEl.offsetTop+15;
        that.bullets[that.noOfBullets].style.left = (that.bullet_x[that.noOfBullets]) + "px";
        that.bullets[that.noOfBullets].style.top = (that.bullet_y[that.noOfBullets]) + "px";
        player.wiki.gameWrapper.appendChild(that.bullets[that.noOfBullets]);
		
		//console.log(that.bullets[noOfBullets]);
		that.noOfBullets++;
    }
	
    this.updateBullet = function() {
		
		for(var i=0;i<that.noOfBullets;i++){
			
			//console.log(player.dc);
			//console.log(player.wiki.opponent.opponentEl);
			var bulletLeft =  that.bullet_x[i];
			var t = 0;
			//console.log(player.goLeft);
			if(that.goLeft[i] == 1){
         		 t = bulletLeft-that.dx;
			}
			else{
				t = bulletLeft + that.dx;
				
			}
        that.bullet_x[i] = t;
		
        that.bullets[i].style.left = bulletLeft + "px";
		collideOpponent = dc.colisionOpponentBullet(that.bullets[i],player.wiki.opponent.opponentEl);
		
		if(collideOpponent+1)
			{
				console.log(collideOpponent);
				player.wiki.gameWrapper.removeChild(player.wiki.opponent.opponentEl[collideOpponent]);
				player.wiki.opponent.opponentEl.splice(collideOpponent,i);
				}
		if(t>550 || t<40){
			
			player.wiki.gameWrapper.removeChild(that.bullets[i]);
			that.bullets.splice(i,1);
			that.noOfBullets--;
			}
			
		
			
		
		}
    }
    this.deleteBullet = function() {
        player.wiki.gameWrapper.removeChild(that.that.bullets);
    }
}

