// JavaScript Document
'use strict';

var canvas = document.getElementById("canvas");
var welcomeScreen = document.getElementById("welcomeScreen");
var gameOverScreen = document.getElementById("gameOverScreen");
var scoreDisplay = document.getElementById("score");
var tryAgain = document.getElementById("tryAgain");
var mainMenu = document.getElementById("mainMenu");
var submitScore = document.getElementById("submitScore");
var play = document.getElementById("play");
var highScore = document.getElementById("highScore");


var wiki = new Wikileaks(canvas);
document.onkeydown = wiki.downKeyHandler;
document.onkeyup = wiki.upKeyHandler;
play.onclick = wiki.init;
mainMenu.onclick = mainMenuFxn;
tryAgain.onclick = trayAgainFxn;
submitScore.onclick = submitScoreFxn;
highScore.onclick = highScoreFxn;




//main game class ----------------------------------------------------------------------------------------
function Wikileaks(canvas) {

    this.gameLoopIntervalId;
    this.gameWrapper = canvas;
    var that = this;
    var gameLoopInterval = 1;

    this.stairs = [];
    this.opponents = [];
    this.bullets = [];
    this.coins = [];

    this.player = new Player(that);
    this.opponent = new Opponent(that);
    //this.coins = new Coin(that);
    this.bullet = new Bullet(that);

    var score = 0;
    var audio = new Audio();
    var counter = 0;
    var updateBullet = 1;
    var managePlayer = 1;
    var createCoin = 180;
    var updateCoin = 1;
    var frequencyOfCreatingOpponent = 180;
    var moveOpponentSpeed = 4;
    var frameRate = 0;
    var isGameOver = true;
    var time = new Date().getTime();
    var that = this;
    this.init = function() {
        that.player = new Player(that);
        that.resetGame();//reseting game for restart
        isGameOver = false;
        welcomeScreen.style.display = "none";
        audio.init("sound/background-music.ogg", 5);
        audio.play();
        scoreDisplay.style.display = "block";
        //creating stair with pre-define position top and height must be divisible by 5
        //that.createStair("left-stair", 265, 30, 134, 30);
        that.createStair("left-stair", 265, 30, 134, 30);
        that.createStair("right-stair", 265, 435, 136, 30);
        that.createStair("up-stair", 160, 192, 220, 30);
        that.createStair("down-star", 370, 192, 220, 30);
        that.createStair("stair-bottom-left", 490, 0, 180, 70);
        that.createStair("stair-bottom-right", 490, 420, 180, 70);
        that.createStair("stair-bottom-mid-left", 510, 180, 72, 50);
        that.createStair("stair-bottom-mid-right", 510, 348, 72, 50);
        that.createStair("wall-l-r", 2, 1, 30, 490);
        that.createStair("wall-l-r", 2, 570, 30, 490);
        that.createStair("wall-top-r", 15, 361, 210, 30);
        that.createStair("wall-top-l", 15, 30, 210, 30);

        that.player.init();
        that.gameLoop();
		 
    }



// Game loop stars here--------------------------------------------------------------------------------
    this.gameLoop = function() {
        that.gameLoopIntervalId = window.requestAnimationFrame(that.gameLoop);
        counter++;
        scoreDisplay.innerHTML = "score :- " + score;
        //console.log(that.frameRateFx());
        if (counter % managePlayer == 0) {
            //move player
            var playerMsg;
            that.player.managePlayer();
            playerMsg = that.player.detectCollisionPlayer();
            if (playerMsg == "gameOver") {
                that.gameOver();
            }
        }



        if (counter % frequencyOfCreatingOpponent == 0) {
            //create new opponent
            that.createOpponent();

        }

        if (counter % moveOpponentSpeed == 0) {
            // move opponent
            for (var i = 0; i < that.opponents.length; i++) {
                var opponentCollisionMsg;

                that.opponents[i].updateOpponent();
                opponentCollisionMsg = that.opponents[i].detectCollisions();

                if (opponentCollisionMsg == "gameOver") {
                    that.gameOver();
                }
                if (opponentCollisionMsg == "clearOpponent") {
                    that.opponents[i].deleteOpponent();
                    that.opponents.splice(i, 1);
                }

            }
        }

        if (counter % createCoin == 0) {
            //create coin

            that.createCoin();
        }

        if (counter % updateCoin == 0) {

            var coin;
            var coinMsg;
            for (var i = 0; i < that.coins.length; i++) {

                coin = that.coins[i];
                coinMsg = coin.updateCoin();
                if (coinMsg == "clearCoin") {
                    coin.deleteCoin();
                    that.coins.splice(i, 1);
                }

                if (coinMsg == "coinCollected") {
                    score += 10;
                    coin.deleteCoin();
                    that.coins.splice(i, 1);
                }


            }


        }



        if (counter % updateBullet == 0) {
            var bullet;
            var bulletMsg = [];
            for (var i = 0; i < that.bullets.length; i++) {
                bullet = that.bullets[i];
                bullet.updateBullet();
                bulletMsg = bullet.detectCollisionsBullet();

                if (bulletMsg[0] == "clearBullet") {

                    bullet.deleteBullet();
                    that.bullets.splice(i, 1);
                }
                if (bulletMsg[0] == "killOpponent") {
                    score += 1;
                    bullet.deleteBullet();
                    that.bullets.splice(i, 1);
                    that.opponents[bulletMsg[1]].deleteOpponent();
                    that.opponents.splice(bulletMsg[1], 1);
                }
            }
        }
    }



//functions ---------------------------------------------------------------------------------------------------------------------

    this.createStair = function(className, top, left, width, height) {
        var stair = new Stairs(that.gameWrapper);
        stair.init(className, top, left, width, height);
        that.stairs.push(stair);

    }

    this.createOpponent = function() {
        var opponent = new Opponent(that);
        opponent.init();
        that.opponents.push(opponent);

    }

    this.createBullet = function() {
        var bullet = new Bullet(that);
        bullet.init();
        that.bullets.push(bullet);
    }

    this.createCoin = function() {
        var coin = new Coin(that);
        coin.init();
        that.coins.push(coin);
    }

    this.gameOver = function() {
        audio.pause();
        gameOverScreen.style.display = "block";
        isGameOver = true;
        that.player.distroyAnimation();
        window.cancelAnimationFrame(that.gameLoopIntervalId);


    }

    this.resetGame = function() {

        for (var i = 0; i < that.stairs.length; i++) {
            var stair = that.stairs[i];
            stair.deleteStair();
        }
        that.stairs.splice(0, that.stairs.length);

        for (var i = 0; i < that.opponents.length; i++) {
            var opp = that.opponents[i];
            opp.deleteOpponent();
        }
        that.opponents.splice(0, that.opponents.length);

        for (var i = 0; i < that.bullets.length; i++) {
            var bullet = that.bullets[i];
            bullet.deleteBullet();
        }
        that.bullets.splice(0, that.bullets.length);

        for (var i = 0; i < that.coins.length; i++) {
            var coin = that.coins[i];
            coin.deleteCoin();
        }
        that.coins.splice(0, that.coins.length);
    }



    this.frameRateFx = function() {

        var now = new Date().getTime();
        var diff = now - time, temp;
        frameRate++;
        if (diff >= 1000) {
            time = now;
            temp = frameRate;
            frameRate = 0;
            return temp;
        }
    }



//keyPressed handler----------------------------------------------------------------------------------------------------------------------

    this.downKeyHandler = function(e) {
        // console.log(e.keyCode);
        switch (e.keyCode) {
            case 37:
                that.player.moveLeft();
                break;

            case 39:
                that.player.moveRight();
                break;

            case 38:
                that.player.jumpKeyPressed();

                break;
            case 27:
                if (!isGameOver) {
                    that.gameOver();
                } else {
                    mainMenu();

                }
                break;

        }
    }

    this.upKeyHandler = function(e) {

        switch (e.keyCode) {
            case 32:
                if (!isGameOver) {
                    var bulletFireSound = new Audio();
                    bulletFireSound.init("sound/explosion.ogg");
                    bulletFireSound.play();
                    that.createBullet();
                }
                break;

            case 13:

                //that.init();
                break;
        }

    }


}


function mainMenuFxn() {
    gameOverScreen.style.display = "none";
    welcomeScreen.style.display = "block";
}

function trayAgainFxn() {
    gameOverScreen.style.display = "none";
    wiki.init();
}

function submitScoreFxn() {

}
function highScoreFxn() {

}