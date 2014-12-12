// JavaScript Document
'use strict';

var canvas = document.getElementById("canvas");
var wiki = new Wikileaks(canvas);
wiki.init();

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

    var counter = 0;
    var updateBullet = 1;
    var managePlayer = 1;
    var createCoin = 180;
    var updateCoin = 1;
    var frequencyOfCreatingOpponent = 180;
    var moveOpponentSpeed = 2;
    var time = new Date().getTime();
    var that = this;
    this.init = function() {
        //creating stair with pre-define position top and height must be divisible by 5
        that.createStair("left-stair", 265, 30, 134, 30);
        that.createStair("right-stair", 265, 435, 136, 30);
        that.createStair("up-stair", 160, 192, 220, 30);
        that.createStair("down-star", 370, 192, 220, 30);
        that.createStair("stair-bottom-left", 490, 0, 180, 70);
        that.createStair("stair-bottom-right", 490, 420, 180, 70);
        that.createStair("stair-bottom-mid-left", 510, 180, 72, 50);
        that.createStair("stair-bottom-mid-right", 510, 348, 72, 50);

        that.player.init();
        that.gameLoop();

    }




    this.gameLoop = function() {
        that.gameLoopIntervalId = window.requestAnimationFrame(that.gameLoop);
        counter++;

        if (counter % managePlayer == 0) {
            //move player
            that.player.managePlayer();
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


            }


        }



        if (counter % updateBullet == 0) {
            var bullet;
            var bulletMsg = [];
            for (var i = 0; i < that.bullets.length; i++) {
                bullet = that.bullets[i];
                bullet.updateBullet();
                bulletMsg = bullet.detectCollisionsBullet();
				//console.log(bulletMsg);
                if (bulletMsg[0] == "clearBullet") {

                    bullet.deleteBullet();
                    that.bullets.splice(i, 1);
                }
                if (bulletMsg[0] == "killOpponent") {
					//console.log(bulletMsg);
                    bullet.deleteBullet();
                    that.bullets.splice(i, 1);
					that.opponents[bulletMsg[1]].deleteOpponent();
					that.opponents.splice(bulletMsg[1],1);
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
        that.player.distroyAnimation();
        window.cancelAnimationFrame(that.gameLoopIntervalId);


    }

    this.frameRate = function() {

        var now = new Date().getTime();
        var diff = 0;
        if (counter % 60 == 0) {


            diff = now - time;
            time = now;
            console.log();
        }
        return diff;
    }

}


