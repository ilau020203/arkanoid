"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BallArray = void 0;
const enums_1 = require("./enums");
class BallArray {
    constructor(balls) {
        this.array = balls;
    }
    subscribe(stat) {
        this.statistic = stat;
    }
    push(ball) {
        this.array.push(ball);
    }
    move(canvas, player, blockArray) {
        for (let i = 0; i < this.array.length; i++) {
            let res = this.array[i].move(canvas, player, blockArray);
            if (!res && !!this.statistic) {
                this.statistic.update(enums_1.Information.BallIsLost);
                this.array.splice(i, 1);
                i--;
            }
        }
    }
    draw(canvas) {
        for (let item of this.array)
            item.draw(canvas);
    }
    clear() {
        this.array = [];
    }
    getArray() {
        return this.array;
    }
}
exports.BallArray = BallArray;
