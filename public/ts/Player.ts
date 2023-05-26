import { GameObject } from "./GameObject";
import { Statistic } from "./Statistic";
import { Canvas } from "./canvas";
import { Direction } from "./enums";
import { Rect } from "./rect";

export class Player implements GameObject {
    private rect: Rect;
    private speed: number;
    private direction: Direction;
    constructor(
      coord: [number, number],
      size: [number, number],
      color: string,
      speed?: number
    ) {
      this.rect = new Rect(coord, size, color);
      this.listen();
      this.speed = speed ? speed : 10;
      this.direction = Direction.Stop;
    }
    subscribe: ((stat?: Statistic | undefined) => void) | undefined;
    move(canvas: Canvas) {
      switch (this.direction) {
        case Direction.Left:
          if (this.rect.coord[0] <= 0) return;
          this.rect.coord[0] -= this.speed;
          break;
        case Direction.Right:
          if (this.rect.coord[0] + this.rect.size[0] >= canvas.getWidth()) return;
          this.rect.coord[0] += this.speed;
          break;
      }
    }
    listen() {
      document.addEventListener("keydown", (event) => {
        switch (event.code) {
          case "KeyA":
            this.direction = Direction.Left;
            break;
          case "KeyD":
            this.direction = Direction.Right;
            break;
        }
      });
      document.addEventListener("keyup", (event) => {
        this.direction = Direction.Stop;
      });
    }
    draw(canvas?: Canvas) {
      canvas?.rectangle(this.rect);
    }
    getRect() {
      return this.rect;
    }
  }