// JavaScript Document
'use strict';



//detect collision of player opponent and bullets------------------------------------------------------------
function DetectCollision() {





    this.collisionPlayerOpponent = function(player, opponent) {

        var rect1 = player;
        var rect2 = opponent;

        //console.log(player_x, opponent_x+ 40, player_y, opponent_y);
        if (rect1.left <= rect2.left + rect2.width && // left edge of player is < right edge of opponent
                rect1.left + rect1.width >= rect2.left && // right edge of player is > left edge of opponent
                rect1.top <= rect2.top + rect2.height && // top edge of player is < bottom edge of opponent
                rect1.height + rect1.top >= rect2.top)	 // bottom edge of player is > top edge of opponent
        {

            return true;
        }
    }


    this.onMovingDown = function(player, stairs) {
        for (var i = 0; i < 8; i++) {

            if (stairs[i].left < player.left + player.width &&
                    stairs[i].left + stairs[i].width > player.left &&
                    stairs[i].top == player.top + player.height) {
                player.currentStair = i;
                return i;
            }



        }
        return false;
    }

    this.onMovingUp = function(player, stairs) {
        for (var i = 0; i < 8; i++) {
            // console.log("dung");
            if (stairs[i].left < player.left + player.width &&
                    stairs[i].left + stairs[i].width > player.left &&
                    //stairs[i].top < player.top + player.height&&
                    stairs[i].top + stairs[i].height == player.top) {

                return true;
            }



        }
        return false;
    }


    //moving opponent down
    this.onMovingDownOpponent = function(opponent, stairs) {
        var player = opponent;
        for (var i = 0; i < 8; i++) {
            //console.log(stairs[i].offsetWidth);

            if (stairs[i].left < opponent.left + opponent.width &&
                    stairs[i].left + stairs[i].width > opponent.left &&
                    stairs[i].top == opponent.top + opponent.height) {
                opponent.currentStair = i;
                return true;

            }


        }
    }


    this.onMovingLeftRightOpponent = function(opponent, stairs) {
        var opponent = opponent;

        if (stairs[opponent.currentStair].top == opponent.top + opponent.height && (stairs[opponent.currentStair].left > opponent.left + opponent.width || opponent.left > stairs[opponent.currentStair].left + stairs[opponent.currentStair].width)) {


            return true;

        }
    }


    this.onMovingLeftRight = function(player, stairs) {
        //console.log(player.offsetLeft, stairs[currentStair].offsetLeft + stairs[currentStair].offsetWidth - 15);
        if (stairs[player.currentStair].top == player.top + player.height && (stairs[player.currentStair].left > player.left + player.width || player.left > stairs[player.currentStair].left + stairs[player.currentStair].width)) {
            return true;


        } else {
            return false;
        }
    }

    this.colisionOpponentBullet = function(bullet, opponents) {
        var bullet = bullet;
        var opponent;
        //console.log(bullet,opponents);
        for (var i = 0; i < opponents.length; i++) {
            opponent = opponents[i];

            //console.log(bullet.left, opponent.left, bullet.top, opponent.top);
            if (bullet.left < opponent.left + opponent.width &&
                    bullet.left + bullet.width > opponent.left &&
                    bullet.top < opponent.top + opponent.height &&
                    bullet.height + bullet.top > opponent.top)
            {

                return i;
            }
        }

    }


    this.colisionPlayerCoin = function(player, coin) {

        var rect1 = player;
        var rect2 = coin;

        //console.log(player_x, opponent_x+ 40, player_y, opponent_y);
        if (rect1.left <= rect2.left + rect2.width && // left edge of player is < right edge of opponent
                rect1.left + rect1.width >= rect2.left && // right edge of player is > left edge of opponent
                rect1.top <= rect2.top + rect2.height && // top edge of player is < bottom edge of opponent
                rect1.height + rect1.top >= rect2.top)	 // bottom edge of player is > top edge of opponent
        {

            return true;
        }

    }




}


