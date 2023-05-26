import { BallArray } from "./BallArray";
import { BlockArray } from "./BlockArray";
import { Fabric } from "./Fabric";
import { GameObject } from "./GameObject";
import { Player } from "./Player";
import { Statistic } from "./Statistic";
import { Canvas } from "./canvas";
import { Information } from "./enums";

export class Game implements GameObject {
    private canvas: Canvas;
    private player: Player;
    private ballArray: BallArray;
    private blockArray: BlockArray;
    private stop: boolean | undefined;
    private fabric: Fabric;
    private statistic: Statistic | undefined;
    constructor(
      canvas: Canvas,
      player: Player,
      ballArray: BallArray,
      blockArray: BlockArray,
      fabric: Fabric
    ) {
      this.canvas = canvas;
      this.player = player;
      this.ballArray = ballArray;
      this.blockArray = blockArray;
      this.fabric = fabric;
    }
    subscribe(stat: Statistic) {
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
  
      if (this.stop) return;
      requestAnimationFrame(() => this.draw());
    }
    start(fabric: Fabric) {
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
      if (!this.stop) this.draw();
    }
    showStatistic() {
    
      let data = this.statistic?.getData();
      let output = `
            Шаров потеряно: ${data?.BallIsLost},
            Блоков разрушено: ${data?.BlockIsDestroyed},
            Ударов по блокам: ${data?.HitOnBlock}`;
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
        let str: string = "";
        loss ? (str = "Увы, Вы проиграли!\n") : (str = "Ура, Вы выиграли!\n");
  
        alert(str + this.showStatistic());
        this.statistic?.update(Information.Clear);
        this.stop = true;
        setTimeout(() => {
          this.start(this.fabric);
        }, 1);
        return;
      }
    }
  }
  