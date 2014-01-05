/**
 *	Fibotimer
 *  Author: João Portela
 *  
 *  Counts time following the Fibonacci sequence
 */

define(function () {
	var numPrev, num, _playground;

	function calculateNext() {
		var aux = num;
		num = numPrev + num; 
		numPrev = aux;
		_playground.innerHTML = '' + num;
		
		setTimeout(calculateNext, num * 1000);
	}

    return {
    	initialize: function () {
    		numPrev = 0;
    		num = 1;
    	},

        start: function (playground) {
        	_playground = playground;
            playground.innerHTML = '' + num;
        
        	calculateNext();
        }
    };
});