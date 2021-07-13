import Application from "./Application";

function init () {
    const app = new Application('main');
    app.loop();
}

document.addEventListener('DOMContentLoaded', init );