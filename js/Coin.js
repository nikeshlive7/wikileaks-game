// JavaScript Document
'use strict';



//coins class -------------------------------------------------------------------------------------

function Coin(wiki)
{
    var that = this;
    var dc = new DetectCollision();
    this.top;
    this.left;
    this.height = 15;
    this.width = 15;
    this.age;
    this.coinEl;

    var collideOpponent;

    this.init = function() {

        that.coinEl = document.createElement('div');
        that.coinEl.className = "coins"; //style
        that.left = 30 + getRandomInt(1, 520);
        that.top = getRandomInt(1, 5) * 100;
        that.age = 180;
        that.coinEl.style.left = (that.left) + "px";
        that.coinEl.style.top = (that.top) + "px";
        that.coinEl.style.height = that.height + "px";
        that.coinEl.style.width = that.width + "px";
        wiki.gameWrapper.appendChild(that.coinEl);



    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    this.updateCoin = function() {




        that.age--;
        collideOpponent = dc.colisionPlayerCoin(wiki.player, that);

        if ((collideOpponent + 1) || that.age <= 0)
        {
            return "clearCoin";
        }





    }

    this.deleteCoin = function() {

        wiki.gameWrapper.removeChild(that.coinEl);



    }
}

