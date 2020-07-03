import Tube from "./Tube.js";
import Ball from "./Ball.js";

export default class Game {

    constructor(canvas) {
        this._canvas     = canvas;
        this._width      = canvas.width;
        this._height     = canvas.height;
        this._tubes      = [];
        this._raisedTube = null;
        this._finished   = false;

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

        if(this._finished) {
            context.fillStyle    = "#EFC";
            context.font         = "70px Verdana";
            context.textBaseline = "alphabetic";
            context.textAlign    = "center"
            context.fillText("Gagné !", this._width / 2, 100);
        }
    }

    getRandomTube() {
        return this._tubes[Math.floor(Math.random() * this._tubes.length)];
    }

    processClick(x, y) {
        this._tubes.forEach(
            tube => {
                if(tube.isInside(x, y)) {
                    if(tube == this._raisedTube) {
                        console.log('this tube is raised => lower the ball');
                        tube.lowerBall();
                        this._raisedTube = null;
                    } else {
                        if(this._raisedTube) {
                            console.log('other tube is raised => move the ball to this tube');
                            console.log('  => top ball color is ' + tube.getTopBallColor());
                            let ball = this._raisedTube.removeBall();
                            console.log('  => ball color is ' + ball.getColor());
                            if( (ball.getColor() == tube.getTopBallColor()) || (tube.getTopBallColor() == '') ) {
                                tube.addBall(ball);
                            } else {
                                this._raisedTube.addBall(ball);
                                console.log('  => FORBIDDEN MOVE !!!');
                            }
                            this._raisedTube = null;
                        } else {
                            if(tube.isEmpty()) {
                                console.log('this tube is empty => cannot raise any ball')
                            } else {
                                console.log('no tube is raised => this one becomes raised');
                                tube.raiseBall();
                                this._raisedTube = tube;
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
        
        // Check if game finished
        this._finished = true;
        this._tubes.forEach(
            tube => {
                if(!tube.isSingleColor()) {
                    this._finished = false;
                } else {
                    if( (!tube.isFull()) && (!tube.isEmpty()) ) {
                        this._finished = false;
                    }
                }
            }
        )

    }

}