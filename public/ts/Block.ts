import { Rect } from "./rect";
import { GameObject } from "./GameObject";
import { Statistic } from "./Statistic";
import { Color, Information } from "./enums";
import { Canvas } from "./canvas";

export class Block implements GameObject {
  private rect: Rect;
  private life: 0 | 1 | 2 | 3 | 4 | 5;
  private statistic: Statistic | undefined;

  constructor(
    coord: [number, number],
    size: [number, number],
    life: 0 | 1 | 2 | 3 | 4 | 5
  ) {
    this.life = life;
    this.rect = new Rect(coord, size, Color[life]);
  }
  subscribe(stat: Statistic) {
    this.statistic = stat;
  }
  getRect() {
    return this.rect;
  }
  draw(canvas?: Canvas) {
    canvas?.rectangle(this.rect);
  }
  getLife() {
    return this.life;
  }
  decrementLife() {
    if(!this.statistic)
        return
    this.statistic.update(Information.HitOnBlock);
    this.life--;
    this.rect.color = Color[this.life];
  }
  push(ball: GameObject) {
    return
  }
}
