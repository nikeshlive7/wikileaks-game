/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Ajax() {
    var req;
    var isIE;
    var cbFxn;
    var that = this;
    
    this.init=function() {
        completeField = document.getElementById("complete-field");
    }

    this.doCompletion=function(score,cb) {
        cbFxn = cb;
        var url = "scoreStore?score=" + score;
        req = that.initRequest();
        req.open("GET", url, true);
        req.onreadystatechange = callback;
        req.send();
    }

    this.initRequest=function() {
        if (window.XMLHttpRequest) {
            if (navigator.userAgent.indexOf('MSIE') != -1) {
                isIE = true;
            }
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            isIE = true;
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }


    function callback() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                cbFxn(req.responseText);
            }
        }
    }
}