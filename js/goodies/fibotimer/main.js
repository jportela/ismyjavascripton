/**
 *	Fibotimer
 *  Author: João Portela
 *  
 *  Counts time following the Fibonacci sequence
 */

define(function () {
	var numPrev, num;

	function calculateNext (playground) {
		var aux = num;
		num = numPrev + num; 
		numPrev = aux;
		playground.innerHTML = '' + num;
		
		setTimeout(function () {
			calculateNext(playground); 
		}, num * 1000);
	}

    return {
    	initialize: function () {
    		numPrev = 0;
    		num = 1;
    	},

        start: function (playground) {
            playground.innerHTML = '' + num;
        
        	calculateNext(playground);
        }
    };
});