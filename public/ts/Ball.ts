import { BlockArray } from "./BlockArray";
import { Canvas } from "./canvas";
import { Intersection } from "./enums";
import { GameObject } from "./GameObject";
import { Player } from "./Player";
import { Rect } from "./rect";
import { Statistic } from "./Statistic";

export class Ball implements GameObject {
  private coord: [number, number];
  private radius: number;
  private color: string;
  private speed: [number, number];
  // private sleep : number;

  constructor(
    coord: [number, number],
    radius: number,
    color: string,
    speed: [number, number]
  ) {
    this.coord = coord;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    // this.sleep = 0;
  }
  subscribe: ((stat?: Statistic | undefined) => void) | undefined;
  draw(canvas?: Canvas) {
    canvas?.circle(...this.coord, this.radius, this.color);
  }
  changeSpeed(intersect: Intersection) {
    switch (intersect) {
      case Intersection.Left:
      case Intersection.Right:
        this.speed[0] *= -1;
        break;
      case Intersection.Up:
      case Intersection.Down:
        this.speed[1] *= -1;
        break;
    }
  }
  intersect(canvas: Canvas, player: Player) {
    if (this.coord[0] - this.radius < 0) this.speed[0] *= -1;
    if (this.coord[0] + this.radius > canvas.getWidth()) this.speed[0] *= -1;
    if (this.coord[1] - this.radius < 0) this.speed[1] *= -1;
    if (this.coord[1] + this.radius > canvas.getHeight()) {
      this.speed[1] *= -1;
      return false;
    }

    let intersect = this.intersectWithRect(player.getRect());
    if (intersect != Intersection.None) intersect = Intersection.Up;
    this.changeSpeed(intersect);

    if (intersect == Intersection.Up) {
      let rect = player.getRect();
      if (this.coord[0] > rect.coord[0] + rect.size[0] / 2)
        this.speed[0] = this.changeSpeedOnX(this.speed[0], "right");
      if (
        this.coord[0] > rect.coord[0] &&
        this.coord[0] < rect.coord[0] + rect.size[0] / 2
      )
        this.speed[0] = this.changeSpeedOnX(this.speed[0], "left");
    }
    return true;
  }
  private changeSpeedOnX(speed: number, dir: "left" | "right") {
    if (dir == "left") {
      if (speed > 0) return -speed + Math.random() / 10;
      return speed - Math.random() / 100;
    } else {
      if (speed < 0) return -speed + Math.random() / 10;
      return speed - Math.random() / 100;
    }
  }

  intersectWithBlockArray(blockArray: BlockArray) {
    let blocks = blockArray.getArray();
    for (let i = 0; i < blocks.length; i++) {
      let intersect = this.intersectWithRect(blocks[i].getRect());
      this.changeSpeed(intersect);
      if (intersect != Intersection.None) {
        let block = blocks[i];
        block.decrementLife();
        //     if(!block.getLife())  blocks.splice(i, 1), i--;
      }
    }
  }

  move(canvas: Canvas, player: Player, blockArray: BlockArray) {
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
  intersectWithRect(rect: Rect): Intersection {
    if (
      this.coord[0] + this.radius > rect.coord[0] &&
      this.coord[0] < rect.coord[0] + rect.size[0] / 8 &&
      this.coord[1] > rect.coord[1] &&
      this.coord[1] < rect.coord[1] + rect.size[1]
    )
      return Intersection.Left;

    if (
      this.coord[1] + this.radius > rect.coord[1] &&
      this.coord[1] < rect.coord[1] + rect.size[1] / 8 &&
      this.coord[0] > rect.coord[0] &&
      this.coord[0] < rect.coord[0] + rect.size[0]
    )
      return Intersection.Up;

    if (
      this.coord[0] - this.radius < rect.coord[0] + rect.size[0] &&
      this.coord[0] > rect.coord[0] + rect.size[0] / 8 &&
      this.coord[1] > rect.coord[1] &&
      this.coord[1] < rect.coord[1] + rect.size[1]
    )
      return Intersection.Right;

    if (
      this.coord[1] - this.radius < rect.coord[1] + rect.size[1] &&
      this.coord[1] > rect.coord[1] + rect.size[1] / 8 &&
      this.coord[0] > rect.coord[0] &&
      this.coord[0] < rect.coord[0] + rect.size[0]
    )
      return Intersection.Down;

    return Intersection.None;
  }

  getSpeed() {
    return this.speed;
  }
  setSpeed(speed: [number, number]) {
    this.speed = speed;
  }
  push(ball: GameObject) {
    return
  }
}
