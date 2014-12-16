// JavaScript Document
'use strict';



//coins class -------------------------------------------------------------------------------------

function Coin(wiki)
{
    var that = this;
    var dc = new DetectCollision();
    this.top;
    this.left;
    this.height = 20;
    this.width = 20;
    this.age;
    this.coinEl;

    var collidePlayer;

    this.init = function() {

        that.coinEl = document.createElement('div');
        that.coinEl.className = "coins";
        that.left = 30 + getRandomInt(1, 520);
        that.top = getRandomInt(1, 5) * 100;
        that.age = 180;
        that.coinEl.style.left = (that.left) + "px";
        that.coinEl.style.top = (that.top) + "px";
        that.coinEl.style.height = that.height + "px";
        that.coinEl.style.width = that.width + "px";
        wiki.gameWrapper.appendChild(that.coinEl);

    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    this.updateCoin = function() {

        that.age--;
        collidePlayer = dc.collisionRect(wiki.player, that);

        if (that.age <= 0){
            return "clearCoin";
        }
		
		if(collidePlayer){
			return "coinCollected";
		}

    };

    this.deleteCoin = function() {

        wiki.gameWrapper.removeChild(that.coinEl);

    };
}

