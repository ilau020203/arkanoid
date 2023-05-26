import { Ball } from "./Ball";
import { BlockArray } from "./BlockArray";
import { GameObject } from "./GameObject";
import { Player } from "./Player";
import { Statistic } from "./Statistic";
import { Canvas } from "./canvas";
import { Information } from "./enums";

export class BallArray implements GameObject {
  private array: Ball[];
  private statistic: Statistic | undefined;
  constructor(balls: Ball[]) {
    this.array = balls;
  }
  subscribe(stat: Statistic) {
    this.statistic = stat;
  }
  push(ball: Ball) {
    this.array.push(ball);
  }
  move(canvas: Canvas, player: Player, blockArray: BlockArray) {
    for (let i = 0; i < this.array.length; i++) {
      let res = this.array[i].move(canvas, player, blockArray);
      if (!res && !!this.statistic) {
        this.statistic.update(Information.BallIsLost);
        this.array.splice(i, 1);
        i--;
      }
    }
  }
  draw(canvas?: Canvas) {
    for (let item of this.array) item.draw(canvas);
  }
  clear() {
    this.array = [];
  }
  getArray() {
    return this.array;
  }
}
