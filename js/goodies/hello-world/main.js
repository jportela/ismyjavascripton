define(function () {
    return {

        start: function (playground) {
    		playground.className = playground.className + ' is-big';
            playground.innerHTML = 'Hello world :D';
        }
    };
});