"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("./canvas");
const Fabric_1 = require("./Fabric");
const Player_1 = require("./Player");
const BallArray_1 = require("./BallArray");
const BlockArray_1 = require("./BlockArray");
const Statistic_1 = require("./Statistic");
const Game_1 = require("./Game");
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
