// JavaScript Document
'use strict';



//bullets class -------------------------------------------------------------------------------------

function Bullet(wiki)
{
    var that = this;
    var dc = new DetectCollision();
    this.top;
    this.left;
    this.bulletEl;
    this.height = 10;
    this.width = 10;
    this.dx = 10;
    this.goLeft;
    var collideOpponent;
    var ageOpponent = 0;
	var flagCollide = 0;
    this.init = function() {

        that.bulletEl = document.createElement('div');
        that.bulletEl.className = "bullets"; //style
        that.bulletEl.style.height = that.height + "px";
        that.bulletEl.style.width = that.width + "px";
        that.goLeft = wiki.player.goLeft;

        if (that.goLeft == true) {
            that.left = wiki.player.left - that.width;
        }
        else {
            that.left = wiki.player.left + wiki.player.width;
        }

        that.top = wiki.player.top + wiki.player.height / 2 - that.height / 2;
        that.bulletEl.style.left = that.left + "px";
        that.bulletEl.style.top = that.top + "px";
        wiki.gameWrapper.appendChild(that.bulletEl);



    }

    this.updateBullet = function() {






        if (that.goLeft == true) {
            that.left -= that.dx;
        }
        else {
            that.left += that.dx;

        }


        that.bulletEl.style.left = that.left + "px";


    }

    this.detectCollisionsBullet = function() {
        ageOpponent = 0;
        collideOpponent = dc.colisionOpponentBullet(that, wiki.opponents);

        if (collideOpponent + 1)
        {
			ageOpponent = wiki.opponents[collideOpponent].age
			
            if (ageOpponent == 0) {
                return ["killOpponent",collideOpponent];

            }
			if(flagCollide%wiki.opponents[0].width==0){
				  
            	 wiki.opponents[collideOpponent].age = ageOpponent-1;
			}
           	flagCollide++;
        }

        if (that.left > 550 || that.left < 40) {

            return ["clearBullet"];
        }
        return false;

    }

    this.deleteBullet = function() {
        wiki.gameWrapper.removeChild(that.bulletEl);

    }
}

