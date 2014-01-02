/**
 * GOODIES LOADER
 * 
 * Loads a random Javascript goodie 
 */

define(["goodies"], function (goodies) {
    var LOADING_TIME = 3000;

    return {
        
        /** Returns a random goodie from the goodies list **/

        select: function () {
            var index = Math.floor(Math.random() * goodies.list.length);
            return goodies.list[index];
        },
    
        /** Executes a random goodie from the goodies list **/
        execute: function (playground, spinner, descriptionContainer) {
            var selectedGoodie = this.select(),
                path = 'goodies/' + selectedGoodie.identifier + '/main';

            require([path], function (goodie) {
                var timeDiff;
                
                if (typeof goodie.initialize === 'function') {
                    goodie.initialize();
                }

                timeDiff = Date.now() - window.IMJO.startTime - LOADING_TIME;

                executor = function () {
                    if (selectedGoodie.description) {
                        descriptionContainer.innerHTML = selectedGoodie.description;
                        descriptionContainer.className = 'is-active';
                    }

                    goodie.start(playground);

                    if (typeof goodie.end === 'function') {
                        goodie.end();
                    }

                    spinner.className = '';
                    playground.className = 'is-active';
                };

                if (timeDiff < 0) {
                    setTimeout(executor, Math.abs(timeDiff));
                }
                else {
                    executor();
                }
            });
        }

    };
})