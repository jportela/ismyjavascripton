/**
 * LOADER
 * 
 * Loads a random Javascript goodie 
 */

define(["config"], function (config) {
    var playground,
        spinner,
        description;

    return {
        
        /** Returns a random goodie from the goodies list **/

        select: function () {
            var index = Math.floor(Math.random() * config.goodies.length);
            return config.goodies[index];
        },
    
        /** Executes a random goodie from the goodies list **/
        execute: function () {
            var selectedGoodie = this.select(),
                path = 'goodies/' + selectedGoodie.identifier + '/main',
                context = this;

            this.initializeSpinner();
            this.initializePlayground();

            require([path], function (goodie) {
                var timeDiff;
                
                if (typeof goodie.initialize === 'function') {
                    goodie.initialize();
                }

                timeDiff = Date.now() - window.IMJO.startTime - config.loadingTime;

                executor = function () {
                    if (selectedGoodie.description) {
                        context.initializeDescription(selectedGoodie.description)
                    }

                    goodie.start(playground);

                    if (typeof goodie.end === 'function') {
                        goodie.end();
                    }

                    spinner.className = 'spinner';
                    playground.className = 'sandbox is-active';
                };

                if (timeDiff < 0) {
                    setTimeout(executor, Math.abs(timeDiff));
                }
                else {
                    executor();
                }
            });
        },

        initializePlayground: function () {
            playground = document.createElement('div');
            playground.className = 'sandbox';
            document.body.appendChild(playground);
        },

        initializeSpinner: function () {
            var spinnerImg = document.createElement('img'),
                spinnerText = document.createElement('p');

            spinnerImg.alt = 'Loading...';
            spinnerImg.src = config.spinnerSrc;

            spinnerText.appendChild(document.createTextNode(config.spinnerText));

            spinner = document.createElement('div');
            spinner.className = 'spinner is-active';
            spinner.appendChild(spinnerImg);
            spinner.appendChild(spinnerText);
            document.body.appendChild(spinner);
        },

        initializeDescription: function (descriptionText) {
            description = document.createElement('p');
            description.className = 'description';

            description.appendChild(document.createTextNode(descriptionText));
            document.body.appendChild(description);
        }

    };
})