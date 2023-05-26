/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/Ball.js":
/*!***************************!*\
  !*** ./public/js/Ball.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ball = void 0;
const enums_1 = __webpack_require__(/*! ./enums */ "./public/js/enums.js");
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


/***/ }),

/***/ "./public/js/BallArray.js":
/*!********************************!*\
  !*** ./public/js/BallArray.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BallArray = void 0;
const enums_1 = __webpack_require__(/*! ./enums */ "./public/js/enums.js");
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


/***/ }),

/***/ "./public/js/Block.js":
/*!****************************!*\
  !*** ./public/js/Block.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Block = void 0;
const rect_1 = __webpack_require__(/*! ./rect */ "./public/js/rect.js");
const enums_1 = __webpack_require__(/*! ./enums */ "./public/js/enums.js");
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


/***/ }),

/***/ "./public/js/BlockArray.js":
/*!*********************************!*\
  !*** ./public/js/BlockArray.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlockArray = void 0;
const enums_1 = __webpack_require__(/*! ./enums */ "./public/js/enums.js");
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


/***/ }),

/***/ "./public/js/Fabric.js":
/*!*****************************!*\
  !*** ./public/js/Fabric.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Fabric = void 0;
const Ball_1 = __webpack_require__(/*! ./Ball */ "./public/js/Ball.js");
const Block_1 = __webpack_require__(/*! ./Block */ "./public/js/Block.js");
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


/***/ }),

/***/ "./public/js/Game.js":
/*!***************************!*\
  !*** ./public/js/Game.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./public/js/Player.js":
/*!*****************************!*\
  !*** ./public/js/Player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
const enums_1 = __webpack_require__(/*! ./enums */ "./public/js/enums.js");
const rect_1 = __webpack_require__(/*! ./rect */ "./public/js/rect.js");
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


/***/ }),

/***/ "./public/js/Statistic.js":
/*!********************************!*\
  !*** ./public/js/Statistic.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Statistic = void 0;
const enums_1 = __webpack_require__(/*! ./enums */ "./public/js/enums.js");
class Statistic {
    constructor() {
        this.data = {
            BlockIsDestroyed: 0,
            BallIsLost: 0,
            HitOnBlock: 0,
            Clear: 0,
        };
    }
    init() {
        this.data = {
            BlockIsDestroyed: 0,
            BallIsLost: 0,
            HitOnBlock: 0,
            Clear: 0,
        };
    }
    update(message) {
        this.data[message]++;
        if (message == enums_1.Information.Clear)
            this.init();
    }
    getData() {
        return this.data;
    }
}
exports.Statistic = Statistic;


/***/ }),

/***/ "./public/js/canvas.js":
/*!*****************************!*\
  !*** ./public/js/canvas.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./public/js/enums.js":
/*!****************************!*\
  !*** ./public/js/enums.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Information = exports.Color = exports.Intersection = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["Stop"] = 0] = "Stop";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Left"] = 2] = "Left";
})(Direction = exports.Direction || (exports.Direction = {}));
var Intersection;
(function (Intersection) {
    Intersection[Intersection["None"] = 0] = "None";
    Intersection[Intersection["Left"] = 1] = "Left";
    Intersection[Intersection["Up"] = 2] = "Up";
    Intersection[Intersection["Right"] = 3] = "Right";
    Intersection[Intersection["Down"] = 4] = "Down";
})(Intersection = exports.Intersection || (exports.Intersection = {})); // 0,1,2,3,4
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Yellow"] = 2] = "Yellow";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
    Color[Color["Purple"] = 5] = "Purple";
})(Color = exports.Color || (exports.Color = {}));
var Information;
(function (Information) {
    Information["BlockIsDestroyed"] = "BlockIsDestroyed";
    Information["BallIsLost"] = "BallIsLost";
    Information["HitOnBlock"] = "HitOnBlock";
    Information["Clear"] = "Clear";
})(Information = exports.Information || (exports.Information = {}));


/***/ }),

/***/ "./public/js/rect.js":
/*!***************************!*\
  !*** ./public/js/rect.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rect = void 0;
class Rect {
    constructor(coord, size, color) {
        this.coord = coord;
        this.size = size;
        this.color = color;
    }
}
exports.Rect = Rect;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const canvas_1 = __webpack_require__(/*! ./canvas */ "./public/js/canvas.js");
const Fabric_1 = __webpack_require__(/*! ./Fabric */ "./public/js/Fabric.js");
const Player_1 = __webpack_require__(/*! ./Player */ "./public/js/Player.js");
const BallArray_1 = __webpack_require__(/*! ./BallArray */ "./public/js/BallArray.js");
const BlockArray_1 = __webpack_require__(/*! ./BlockArray */ "./public/js/BlockArray.js");
const Statistic_1 = __webpack_require__(/*! ./Statistic */ "./public/js/Statistic.js");
const Game_1 = __webpack_require__(/*! ./Game */ "./public/js/Game.js");
let fabric = new Fabric_1.Fabric([400, 500], [40, 10]);
let canvas = new canvas_1.Canvas(400, 500);
let player = new Player_1.Player([150, 460], [100, 20], "blue");
let ballArray = new BallArray_1.BallArray([]);
let blockArray = new BlockArray_1.BlockArray([]);
let statistic = new Statistic_1.Statistic();
let game = new Game_1.Game(canvas, player, ballArray, blockArray, fabric);
ballArray.subscribe(statistic);
blockArray.subscribe(statistic);
game.subscribe(statistic);
game.start(fabric);
addEventListener("keypress", (event) => {
    if (event.key == " ")
        game.pause();
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map