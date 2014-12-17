'use strict';
        function Audio() {
            var that = this;
            this.audio;


            function createAudio(filename) {

                var audio = document.createElement('audio');
                var source = document.createElement('source');
                source.src = filename;
                audio.appendChild(source);
                return audio;
            }

            this.init = function(filename, loop) {
                that.audio = new createAudio(filename);
            }

            this.play = function()
            {

                that.audio.play();
            };

            this.pause = function()
            {
                that.audio.pause();

            };




        }