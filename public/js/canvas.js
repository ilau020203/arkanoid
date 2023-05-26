"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
class Canvas {
    constructor(width, height, color) {
        var _a;
        this.setColor(color);
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ctx = this.canvas.getContext("2d");
        (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.appendChild(this.canvas);
    }
    line(x1, y1, x2, y2, color, lineWidth) {
        if (!this.ctx)
            return;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
        this.setColor(color);
        this.ctx.lineWidth = (lineWidth) ? lineWidth : 1;
        this.ctx.stroke();
    }
    circle(x, y, radius, color) {
        if (!this.ctx)
            return;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.setColor(color);
        this.ctx.fill();
    }
    rectangle(rect) {
        this.rect(...rect.coord, ...rect.size, rect.color);
    }
    rect(x, y, width, height, color) {
        if (!this.ctx)
            return;
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        this.ctx.closePath();
        this.setColor(color);
        this.ctx.fill();
    }
    setColor(color) {
        var _a, _b;
        if (!this.ctx)
            return;
        (color) ? this.color = color : 'white';
        this.ctx.strokeStyle = (_a = this.color) !== null && _a !== void 0 ? _a : 'white';
        this.ctx.fillStyle = (_b = this.color) !== null && _b !== void 0 ? _b : 'white';
    }
    clear() {
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.width, this.height);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
exports.Canvas = Canvas;
