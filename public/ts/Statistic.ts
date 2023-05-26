import { Observer } from "./Observer";
import { Information, InformationKey } from "./enums";

export class Statistic implements Observer {
    // private objects : GameObject[];
    private data: {
        [key in InformationKey]: number;
    } ;
  
    constructor() {
        this.data = {
            BlockIsDestroyed: 0, // разрушено блоков
            BallIsLost: 0, // потеряно шаров
            HitOnBlock: 0, // ударов по блокам
            Clear: 0,
          };
    }
    init() {
      this.data = {
        BlockIsDestroyed: 0, // разрушено блоков
        BallIsLost: 0, // потеряно шаров
        HitOnBlock: 0, // ударов по блокам
        Clear: 0,
      };
    }
    update(message: Information) {
      this.data[message]++;
      if (message == Information.Clear) this.init();
    }
    getData() {
      return this.data;
    }
  }