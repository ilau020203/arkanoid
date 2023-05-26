import { GameObject } from "./GameObject";
import { Player } from "./Player";
import { Statistic } from "./Statistic";
import { Canvas } from "./canvas";

export class Prize implements GameObject {
  private speed: [number, number] | undefined;
  private coord: [number, number] | undefined;
  private radius: number | undefined;
  private color: string | undefined;
  constructor() {
    this.draw = (canvas?: Canvas | undefined) => ({});
  }
  draw: (canvas?: Canvas | undefined) => void;
  move: ((player: Player) => void) | undefined;
  subscribe: ((stat?: Statistic | undefined) => void) | undefined;
}
