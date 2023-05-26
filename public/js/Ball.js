"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
const enums_1 = require("./enums");
class Ball {
    // private sleep : number;
    constructor(coord, radius, color, speed) {
        this.coord = coord;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        // this.sleep = 0;
    }
    draw(canvas) {
        canvas === null || canvas === void 0 ? void 0 : canvas.circle(...this.coord, this.radius, this.color);
    }
    changeSpeed(intersect) {
        switch (intersect) {
            case enums_1.Intersection.Left:
            case enums_1.Intersection.Right:
                this.speed[0] *= -1;
                break;
            case enums_1.Intersection.Up:
            case enums_1.Intersection.Down:
                this.speed[1] *= -1;
                break;
        }
    }
    intersect(canvas, player) {
        if (this.coord[0] - this.radius < 0)
            this.speed[0] *= -1;
        if (this.coord[0] + this.radius > canvas.getWidth())
            this.speed[0] *= -1;
        if (this.coord[1] - this.radius < 0)
            this.speed[1] *= -1;
        if (this.coord[1] + this.radius > canvas.getHeight()) {
            this.speed[1] *= -1;
            return false;
        }
        let intersect = this.intersectWithRect(player.getRect());
        if (intersect != enums_1.Intersection.None)
            intersect = enums_1.Intersection.Up;
        this.changeSpeed(intersect);
        if (intersect == enums_1.Intersection.Up) {
            let rect = player.getRect();
            if (this.coord[0] > rect.coord[0] + rect.size[0] / 2)
                this.speed[0] = this.changeSpeedOnX(this.speed[0], "right");
            if (this.coord[0] > rect.coord[0] &&
                this.coord[0] < rect.coord[0] + rect.size[0] / 2)
                this.speed[0] = this.changeSpeedOnX(this.speed[0], "left");
        }
        return true;
    }
    changeSpeedOnX(speed, dir) {
        if (dir == "left") {
            if (speed > 0)
                return -speed + Math.random() / 10;
            return speed - Math.random() / 100;
        }
        else {
            if (speed < 0)
                return -speed + Math.random() / 10;
            return speed - Math.random() / 100;
        }
    }
    intersectWithBlockArray(blockArray) {
        let blocks = blockArray.getArray();
        for (let i = 0; i < blocks.length; i++) {
            let intersect = this.intersectWithRect(blocks[i].getRect());
            this.changeSpeed(intersect);
            if (intersect != enums_1.Intersection.None) {
                let block = blocks[i];
                block.decrementLife();
                //     if(!block.getLife())  blocks.splice(i, 1), i--;
            }
        }
    }
    move(canvas, player, blockArray) {
        // let speed = [...this.speed];
        // let res = true;
        // if(this.sleep) this.sleep--;
        // else{
        let res = this.intersect(canvas, player);
        this.intersectWithBlockArray(blockArray);
        // }
        // if(this.speed[0] != speed[0] || this.speed[1] != speed[1]) this.sleep = 1;
        this.coord[0] += this.speed[0];
        this.coord[1] += this.speed[1];
        return res;
    }
    intersectWithRect(rect) {
        if (this.coord[0] + this.radius > rect.coord[0] &&
            this.coord[0] < rect.coord[0] + rect.size[0] / 8 &&
            this.coord[1] > rect.coord[1] &&
            this.coord[1] < rect.coord[1] + rect.size[1])
            return enums_1.Intersection.Left;
        if (this.coord[1] + this.radius > rect.coord[1] &&
            this.coord[1] < rect.coord[1] + rect.size[1] / 8 &&
            this.coord[0] > rect.coord[0] &&
            this.coord[0] < rect.coord[0] + rect.size[0])
            return enums_1.Intersection.Up;
        if (this.coord[0] - this.radius < rect.coord[0] + rect.size[0] &&
            this.coord[0] > rect.coord[0] + rect.size[0] / 8 &&
            this.coord[1] > rect.coord[1] &&
            this.coord[1] < rect.coord[1] + rect.size[1])
            return enums_1.Intersection.Right;
        if (this.coord[1] - this.radius < rect.coord[1] + rect.size[1] &&
            this.coord[1] > rect.coord[1] + rect.size[1] / 8 &&
            this.coord[0] > rect.coord[0] &&
            this.coord[0] < rect.coord[0] + rect.size[0])
            return enums_1.Intersection.Down;
        return enums_1.Intersection.None;
    }
    getSpeed() {
        return this.speed;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
}
exports.Ball = Ball;
