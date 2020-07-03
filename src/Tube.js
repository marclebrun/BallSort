export default class Tube {

    constructor(capacity, ballSize) {
        this._fillColor = "#EEE";
        this._lineColor = "#777";

        this._balls = [];

        this._pos = {
            x: 0,
            y: 0,
        }

        this._size = {
            w: 0,
            h: 0,
        }

        this._ballSize = ballSize || 32;

        this.setCapacity(capacity || 3);

    }

    moveTo(x, y) {
        this._pos = {
            x: x,
            y: y,
        }
    }

    setWidth(w) {
        this._size.w = w;
    }

    setFillColor(fillColor) {
        this._fillColor = fillColor;
    }

    setCapacity(capacity) {
        this._capacity = capacity;
        this._size.h = ((this._ballSize + 2) * this._capacity) + 2;
    }

    getCapacity() {
        return this._capacity;
    }

    countBalls() {
        return this._balls.length;
    }

    addBall(ball) {
        this._balls.push(ball);

        let x = this._pos.x + ((this._size.w - ball.getWidth()) / 2);
        let y = this._pos.y + this._size.h - (this._balls.length * (ball.getHeight() + 2));

        ball.moveTo(x, y);
    }

    removeBall() {
        return this._balls.pop();
    }

    hasRaisedBall() {
        if(this._balls.length < 1) {
            return false;
        }
        let ball = this._balls[this._balls.length-1];
        return ball.isRaised();
    }

    raiseBall() {
        if(this._balls.length > 0) {
            let ball = this._balls[this._balls.length-1];
            ball.moveToY(this._pos.y - ball.getHeight() - 10, true);
        }
    }

    lowerBall() {
        if(this._balls.length > 0) {
            let ball = this._balls[this._balls.length-1];
            ball.moveToY(this._pos.y + this._size.h - (this._balls.length * (ball.getHeight() + 2)), false);
        }
    }

    getTopBallColor() {
        if(this._balls.length > 0) {
            let ball = this._balls[this._balls.length-1];
            return ball.getColor();
        }
        return '';
    }

    update() {
        this._balls.forEach(
            ball => ball.update()
        )
    }

    draw(context) {
        context.fillStyle = this._fillColor;
        context.strokeStyle = this._lineColor;
        context.lineWidth = 3;

        context.beginPath();
        context.moveTo(this._pos.x - 5, this._pos.y - 5);
        context.lineTo(this._pos.x, this._pos.y);
        context.lineTo(this._pos.x, this._pos.y + this._size.h);
        context.lineTo(this._pos.x + this._size.w, this._pos.y + this._size.h);
        context.lineTo(this._pos.x + this._size.w, this._pos.y);
        context.lineTo(this._pos.x + this._size.w + 5, this._pos.y - 5);
        context.stroke();
        context.fill();

        this._balls.forEach(
            ball => ball.draw(context)
        )
    }

    isInside(x, y) {
        if((this._pos.x <= x) && (this._pos.x + this._size.w >= x)
        && (this._pos.y <= y) && (this._pos.y + this._size.h >= y)) {
            return true;
        }
        return false;
    }

    isSingleColor() {
        if(this._balls.length > 0) {
            let firstColor = this._balls[0].getColor();
            let result = true;
            this._balls.forEach(
                ball => {
                    if(ball.getColor() != firstColor) {
                        result = false;
                    }
                }
            )
            return result;
        }
        return true;
    }

    isEmpty() {
        return (this._balls.length < 1);
    }

    isFull() {
        return (this._balls.length >= this._capacity);
    }

}