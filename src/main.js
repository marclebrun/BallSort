import Game from './Game.js';

let canvas  = null;
let context = null;
let game    = null;

window.setTimeout(function() {

    canvas = document.getElementById("gamescreen");
    context = canvas.getContext("2d");

    // Mettre le canvas aux dimensions de la fenêtre
    canvas.width  = Math.min(window.innerWidth,  400);
    canvas.height = Math.min(window.innerHeight, 600);

    console.log('canvas.width : ' + canvas.width);
    console.log('canvas.height: ' + canvas.height);
    
    game = new Game(canvas);
    game.start();
    
    requestAnimationFrame(gameLoop);
    
}, 1000)

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if(game) {
        game.update();
        game.draw(context);

        requestAnimationFrame(gameLoop);
    }
}

