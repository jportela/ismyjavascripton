require(['goodie-loader'], function (goodies) {
    var sandbox = document.getElementById('main-sandbox'),
        spinner = document.getElementById('main-spinner-container'),
        descriptionContainer = document.getElementById('main-description');
    goodies.execute(sandbox, spinner, descriptionContainer);
});