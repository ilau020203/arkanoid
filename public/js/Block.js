"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const rect_1 = require("./rect");
const enums_1 = require("./enums");
class Block {
    constructor(coord, size, life) {
        this.life = life;
        this.rect = new rect_1.Rect(coord, size, enums_1.Color[life]);
    }
    subscribe(stat) {
        this.statistic = stat;
    }
    getRect() {
        return this.rect;
    }
    draw(canvas) {
        canvas === null || canvas === void 0 ? void 0 : canvas.rectangle(this.rect);
    }
    getLife() {
        return this.life;
    }
    decrementLife() {
        if (!this.statistic)
            return;
        this.statistic.update(enums_1.Information.HitOnBlock);
        this.life--;
        this.rect.color = enums_1.Color[this.life];
    }
}
exports.Block = Block;
