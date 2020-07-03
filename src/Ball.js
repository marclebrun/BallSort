export default class Ball {

    constructor(color, ballSize) {

        this._color = color || 'red';

        this._image = undefined;
        switch(this._color) {
            case 'red':
                this._image = document.getElementById("imgRedBall");
                break;
            case 'blue':
                this._image = document.getElementById("imgBlueBall");
                break;
            case 'green':
                this._image = document.getElementById("imgGreenBall");
                break;
        }

        this._pos = {
            x: 0,
            y: 0,
        }

        this._size = {
            h: ballSize || 32,
            w: ballSize || 32,
        }

        this._raised = false;
    }

    getColor() {
        return this._color;
    }

    getWidth() {
        return this._size.w;
    }

    getHeight() {
        return this._size.h;
    }

    moveTo(x, y) {
        this._pos = {
            x: x,
            y: y,
        }
    }

    moveToX(x) {
        this._pos.x = x;
    }
    
    moveToY(y, raised) {
        this._pos.y = y;
        this._raised = raised;
    }

    isRaised() {
        return this._raised;
    }

    update() {

    }

    draw(context) {
        if(this._image) {
            context.drawImage(
                this._image,
                this._pos.x,
                this._pos.y,
                this._size.w,
                this._size.h
                )
        }
    }

}