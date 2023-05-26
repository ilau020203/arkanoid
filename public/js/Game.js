"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(canvas, player, ballArray, blockArray, fabric) {
        this.canvas = canvas;
        this.player = player;
        this.ballArray = ballArray;
        this.blockArray = blockArray;
        this.fabric = fabric;
    }
    subscribe(stat) {
        this.statistic = stat;
    }
    draw() {
        this.checkGameState();
        this.canvas.clear();
        this.player.move(this.canvas);
        this.player.draw(this.canvas);
        this.ballArray.move(this.canvas, this.player, this.blockArray);
        this.ballArray.draw(this.canvas);
        this.blockArray.draw(this.canvas);
        if (this.stop)
            return;
        requestAnimationFrame(() => this.draw());
    }
    start(fabric) {
        this.stop = false;
        this.player.getRect().coord = [
            this.canvas.getWidth() / 2 - 50,
            this.canvas.getHeight() - 40,
        ];
        this.ballArray.clear();
        this.ballArray.push(fabric.generateBall(this.player));
        this.ballArray.push(fabric.generateBall(this.player));
        this.ballArray.push(fabric.generateBall(this.player));
        this.blockArray.clear();
        this.blockArray.push(fabric.generateBlockArray(9, 5));
        this.draw();
    }
    pause() {
        this.stop = !this.stop;
        if (!this.stop)
            this.draw();
    }
    showStatistic() {
        var _a;
        let data = (_a = this.statistic) === null || _a === void 0 ? void 0 : _a.getData();
        let output = `
            Шаров потеряно: ${data === null || data === void 0 ? void 0 : data.BallIsLost},
            Блоков разрушено: ${data === null || data === void 0 ? void 0 : data.BlockIsDestroyed},
            Ударов по блокам: ${data === null || data === void 0 ? void 0 : data.HitOnBlock}`;
        return output;
    }
    checkGameState() {
        let [loss, end] = [false, false];
        if (this.ballArray.getArray().length == 0) {
            [loss, end] = [true, true];
        }
        if (this.blockArray.getArray().length == 0) {
            [loss, end] = [false, true];
        }
        if (end) {
            let str = "";
            loss ? (str = "Увы, Вы проиграли!\n") : (str = "Ура, Вы выиграли!\n");
            alert(str + this.showStatistic());
            this.stop = true;
            setTimeout(() => {
                this.start(this.fabric);
            }, 1);
            return;
        }
    }
}
exports.Game = Game;
