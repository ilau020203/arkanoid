"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockArray = void 0;
const enums_1 = require("./enums");
class BlockArray {
    constructor(array) {
        this.array = array;
    }
    subscribe(stat) {
        this.statistic = stat;
    }
    push(array) {
        this.array = array;
        if (!this.statistic)
            return;
        for (let item of this.array) {
            item.subscribe(this.statistic);
        }
    }
    clear() {
        this.array = [];
    }
    getArray() {
        return this.array;
    }
    draw(canvas) {
        for (let i = 0; i < this.array.length; i++) {
            if (!this.array[i].getLife()) {
                if (!this.statistic)
                    return;
                this.statistic.update(enums_1.Information.BlockIsDestroyed);
                this.array.splice(i, 1);
                i--;
            }
            else {
                this.array[i].draw(canvas);
            }
        }
    }
}
exports.BlockArray = BlockArray;
