"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fabric = void 0;
const Ball_1 = require("./Ball");
const Block_1 = require("./Block");
class Fabric {
    constructor(canvasSize, sizeBlock) {
        this.canvasSize = canvasSize;
        this.sizeBlock = sizeBlock;
    }
    generateBlockArray(columns, rows) {
        let output = [];
        let col = Math.floor(this.canvasSize[0] / this.sizeBlock[0]);
        if (columns > col)
            columns = col;
        let offsetX = (this.canvasSize[0] - this.sizeBlock[0] * columns) / (columns + 1);
        let offsetY = 5;
        for (let i = 0; i < rows; i++) {
            let life = (i % 5);
            for (let j = 0; j < columns; j++) {
                let block = new Block_1.Block([
                    offsetX * (j + 1) + this.sizeBlock[0] * j,
                    offsetY * (i + 1) + this.sizeBlock[1] * i,
                ], this.sizeBlock, 
                // 5);
                (5 - life));
                // if((j + i) % 2 == 0)
                output.push(block);
            }
        }
        return output;
    }
    generateBall(player) {
        let generateSpeed = (max) => {
            let speed = Math.random() * max - max / 2;
            if (Math.abs(speed) < max / 4)
                return generateSpeed(max);
            return speed;
        };
        let rect = player.getRect();
        let ball = new Ball_1.Ball([rect.coord[0] + rect.size[0] / 2, rect.coord[1] - 10], 4, "black", [generateSpeed(10), generateSpeed(18)]);
        return ball;
    }
}
exports.Fabric = Fabric;
