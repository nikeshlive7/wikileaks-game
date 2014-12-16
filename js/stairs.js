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

    this.init = function(className, top, left, width, height, background) {

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
        //that.stair.style.background = background;
        that.stair.style.position = "absolute";
        gameWrapper.appendChild(that.stair);

    };

    this.deleteStair = function() {
        gameWrapper.removeChild(that.stair);

    };
}

