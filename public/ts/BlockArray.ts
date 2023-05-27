import { Block } from "./Block";
import { GameObject } from "./GameObject";
import { Statistic } from "./Statistic";
import { Canvas } from "./canvas";
import { Information } from "./enums";

export class BlockArray implements GameObject {
  private array: Block[];
  private statistic: Statistic | undefined;
  constructor(array: Block[]) {
    this.array = array;
  }
  subscribe(stat: Statistic) {
    this.statistic = stat;
  }
  push(array: Block[]) {
    this.array = array;
    if (!this.statistic) return;
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
  draw(canvas?: Canvas) {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].getLife() <= 0) {
        if (!this.statistic) return;
        this.statistic.update(Information.BlockIsDestroyed);
        this.array.splice(i, 1);
        i--;
      } else {
        this.array[i].draw(canvas);
      }
    }
  }
}
