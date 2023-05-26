import { Ball } from "./Ball";
import { Block } from "./Block";
import { Player } from "./Player";

export class Fabric {
  private canvasSize: [number, number];
  private sizeBlock: [number, number];
  constructor(canvasSize: [number, number], sizeBlock: [number, number]) {
    this.canvasSize = canvasSize;
    this.sizeBlock = sizeBlock;
  }
  generateBlockArray(columns: number, rows: number) {
    let output: Block[] = [];
    let col = Math.floor(this.canvasSize[0] / this.sizeBlock[0]);
    if (columns > col) columns = col;

    let offsetX =
      (this.canvasSize[0] - this.sizeBlock[0] * columns) / (columns + 1);
    let offsetY = 5;

    for (let i = 0; i < rows; i++) {
      type l = 0 | 1 | 2 | 3 | 4 | 5;
      let life = (i % 5) as l;
      for (let j = 0; j < columns; j++) {
        let block = new Block(
          [
            offsetX * (j + 1) + this.sizeBlock[0] * j,
            offsetY * (i + 1) + this.sizeBlock[1] * i,
          ],
          this.sizeBlock,
          // 5);
          (5 - life) as l
        );
        // if((j + i) % 2 == 0)
        output.push(block);
      }
    }
    return output;
  }
  generateBall(player: Player) {
    let generateSpeed:any = (max: number) => {
      let speed = Math.random() * max - max / 2;
      if (Math.abs(speed) < max / 4) return generateSpeed(max);
      return speed;
    };
    let rect = player.getRect();
    let ball: Ball = new Ball(
      [rect.coord[0] + rect.size[0] / 2, rect.coord[1] - 10],
      4,
      "black",
      [generateSpeed(10), generateSpeed(18)]
    );
    return ball;
  }
}
