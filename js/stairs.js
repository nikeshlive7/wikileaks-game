// JavaScript Document
'use strict';



//stairs class -------------------------------------------------------------------------------------

function Stairs(gameWrapper)
{
    var that = this;
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.stair = 0;

    this.init = function(className, top, left, width, height) {

        that.className = className;
        that.top = top;
        that.left = left;
        that.width = width;
        that.height = height;

        that.stair = document.createElement("div");
        that.stair.className = that.className;
        that.stair.style.top = that.top + "px";
        that.stair.style.left = that.left + "px";
        that.stair.style.width = that.width + "px";
        that.stair.style.height = that.height + "px";
        gameWrapper.appendChild(that.stair);




        //return that.stair;
    }


    this.deleteStair = function(stair) {
        gameWrapper.removeChild(stair);

    }
}

