import Tube from "./Tube.js";
import Ball from "./Ball.js";

export default class Game {

    constructor(canvas) {
        this._canvas = canvas;
        this._width  = canvas.width;
        this._height = canvas.height;
        this._tubes  = [];
    }

    start() {
        let n, x, color;
        let tube, ball;
        const nbBallsPerColor = 4;
        const nbTubes = nbBallsPerColor//+1;
        const tubeWidth = 60;
        const ballSize = 44;
        const space = (this._width - (nbTubes * tubeWidth)) / (nbTubes + 1);
        const colors = ['red', 'green', 'blue'];
        
        // Création des tubes
        this._tubes = [];
        for(n = 0; n < nbTubes; n++) {
            tube = new Tube(nbBallsPerColor, ballSize);
            x = ((n+1) * space) + (n * tubeWidth);
            tube.setWidth(tubeWidth);
            tube.moveTo(x, 200);
            this._tubes.push(tube);
        }

        // Création des boules de chaque couleur
        for(color in colors) {
            for(n = 0; n < nbBallsPerColor; n++) {
                ball = new Ball(colors[color], ballSize);
                let found = false;
                while(!found) {
                    tube = this.getRandomTube();
                    if(tube.countBalls() < tube.getCapacity()) {
                        tube.addBall(ball);
                        found = true;
                    }
                }
            }
        }

        this.raisedTube = null;

        this._canvas.addEventListener("mousedown", event => {
            // console.log("mousedown");
            this.processClick(event.offsetX, event.offsetY);
        });

        // this._canvas.addEventListener("mouseup", () => { console.log("mouseup")})
        // this._canvas.addEventListener("click", () => { console.log("click")})
        // this._canvas.addEventListener("dblclick", () => { console.log("dblclick")})

    }

    update() {
        this._tubes.forEach(
            tube => tube.update()
        )
    }

    draw(context) {
        this._tubes.forEach(
            tube => tube.draw(context)
        )
    }

    getRandomTube() {
        return this._tubes[Math.floor(Math.random() * this._tubes.length)];
    }

    processClick(x, y) {
        this._tubes.forEach(
            tube => {
                if(tube.isInside(x, y)) {
                    if(tube == this.raisedTube) {
                        console.log('this tube is raised => lower the ball');
                        tube.lowerBall();
                        this.raisedTube = null;
                    } else {
                        if(this.raisedTube) {
                            console.log('other tube is raised => move the ball to this tube');
                            let ball = this.raisedTube.removeBall();
                            tube.addBall(ball);
                            this.raisedTube = null;
                        } else {
                            if(tube.isEmpty()) {
                                console.log('this tube is empty => cannot raise any ball')
                            } else {
                                console.log('no tube is raised => this one becomes raised');
                                tube.raiseBall();
                                this.raisedTube = tube;
                            }
                        }
                    }
                }
            }
        )
        this._tubes.forEach(
            tube => {
                if(tube.isSingleColor() && tube.isFull()) {
                    tube.setFillColor('#0F0');
                } else {
                    tube.setFillColor('#EEE');
                }
            }
        )
    }

}