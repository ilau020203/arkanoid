import { Canvas } from "./canvas";
import { Rect } from "./rect";
import { GameObject } from "./GameObject";
import { Fabric } from "./Fabric";
import { Player } from "./Player";
import { BallArray } from "./BallArray";
import { BlockArray } from "./BlockArray";
import { Statistic } from "./Statistic";
import { Game } from "./Game";



let fabric: Fabric = new Fabric([400, 500], [40, 10]);
let canvas: Canvas = new Canvas(400, 500);
let player: Player = new Player([150, 460], [100, 20], "blue");
let ballArray: BallArray = new BallArray([]);
let blockArray: BlockArray = new BlockArray([]);

let statistic = new Statistic();

let game: Game = new Game(canvas, player, ballArray, blockArray, fabric);

ballArray.subscribe(statistic);
blockArray.subscribe(statistic);
game.subscribe(statistic);

game.start(fabric);

addEventListener("keypress", (event) => {
  if (event.key == " ") game.pause();
});
