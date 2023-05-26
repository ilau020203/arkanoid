"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const enums_1 = require("./enums");
const rect_1 = require("./rect");
class Player {
    constructor(coord, size, color, speed) {
        this.rect = new rect_1.Rect(coord, size, color);
        this.listen();
        this.speed = speed ? speed : 10;
        this.direction = enums_1.Direction.Stop;
    }
    move(canvas) {
        switch (this.direction) {
            case enums_1.Direction.Left:
                if (this.rect.coord[0] <= 0)
                    return;
                this.rect.coord[0] -= this.speed;
                break;
            case enums_1.Direction.Right:
                if (this.rect.coord[0] + this.rect.size[0] >= canvas.getWidth())
                    return;
                this.rect.coord[0] += this.speed;
                break;
        }
    }
    listen() {
        document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "KeyA":
                    this.direction = enums_1.Direction.Left;
                    break;
                case "KeyD":
                    this.direction = enums_1.Direction.Right;
                    break;
            }
        });
        document.addEventListener("keyup", (event) => {
            this.direction = enums_1.Direction.Stop;
        });
    }
    draw(canvas) {
        canvas === null || canvas === void 0 ? void 0 : canvas.rectangle(this.rect);
    }
    getRect() {
        return this.rect;
    }
}
exports.Player = Player;
