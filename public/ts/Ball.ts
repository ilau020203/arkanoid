import { BlockArray } from "./BlockArray";
import { Canvas } from "./canvas";
import { Intersection } from "./enums";
import { GameObject } from "./GameObject";
import { Player } from "./Player";
import { Rect } from "./rect";
import { Statistic } from "./Statistic";

export class Ball implements GameObject{
    private coord : [number, number];
    private radius : number;
    private color : string;
    private speed : [number, number];
    // private sleep : number;

    constructor(coord : [number, number], radius : number, color : string, speed : [number, number]){
        this.coord = coord;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        // this.sleep = 0;
    }
    draw(canvas?: Canvas){
        canvas?.circle(this.coord[0], this.coord[1], this.radius, this.color);
    }
    private changeSpeed(intersect : Intersection){
        switch(intersect){
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
    private changeSpeedAngle(player : Player){
        let w = player.getRect().size[0];

        this.speed[1] *= -1;
        if (this.coord[0] > player.getRect().coord[0] + w/2){
            if(this.speed[0] < 0) this.speed[0] *= -1;
        }else{
            if(this.speed[0] > 0) this.speed[0] *= -1;
        }

        let angle = Math.atan(this.speed[1] / this.speed[0]);
        if(angle > 0) angle *= -1;

        let x = this.coord[0] - player.getRect().coord[0];
        let a = 2 * Math.PI / (3 * w);
        let y = -Math.abs(a * x - Math.PI / 3);
        
        if (this.coord[0] < player.getRect().coord[0] + w/2){ 
            angle = y - Math.PI / 2;
        }
        else{
            angle = -Math.PI / 2 - y;
        }
      
        let length = Math.sqrt(this.speed[0] ** 2 + this.speed[1] ** 2);

        this.speed[0] = Math.cos(angle) * length;
        this.speed[1] = Math.sin(angle) * length;
    }
    intersect(canvas : Canvas, player : Player){
        if(this.coord[0] - this.radius < 0) this.speed[0] *= -1;
        if(this.coord[0] + this.radius > canvas.getWidth()) this.speed[0] *= -1;
        if(this.coord[1] - this.radius < 0) this.speed[1] *= -1;
        if(this.coord[1] + this.radius > canvas.getHeight()){
            this.speed[1] *= -1;
            return false;
        }

        let intersect = this.intersectWithRect(player.getRect());

        if(intersect != Intersection.None){
            this.changeSpeedAngle(player);
        }
        return true;
    }

    
    intersectWithBlockArray(blockArray : BlockArray){
        let blocks = blockArray.getArray();
        for(let i = 0; i < blocks.length; i++){
            let intersect = this.intersectWithRect(blocks[i].getRect());
            this.changeSpeed(intersect);
            if(intersect != Intersection.None){
                let block = blocks[i];
                block.decrementLife();
            //     if(!block.getLife())  blocks.splice(i, 1), i--;
            }
        }
    }

    move(canvas : Canvas, player : Player, blockArray : BlockArray){
        let res = this.intersect(canvas, player);
        this.intersectWithBlockArray(blockArray);

        this.coord[0] += this.speed[0];
        this.coord[1] += this.speed[1];

        return res;
    }
    intersectWithRect(rect : Rect) : Intersection{
        if( this.coord[0] + this.radius > rect.coord[0] &&
            this.coord[0] < rect.coord[0] + rect.size[0] / 8 &&
            this.coord[1] > rect.coord[1] && 
            this.coord[1] < rect.coord[1] + rect.size[1]) return Intersection.Left;

        if( this.coord[1] + this.radius > rect.coord[1] &&
            this.coord[1] < rect.coord[1] + rect.size[1] / 8 &&
            this.coord[0] > rect.coord[0] &&
            this.coord[0] < rect.coord[0] + rect.size[0]) return Intersection.Up;
        
        if( this.coord[0] - this.radius < rect.coord[0] + rect.size[0] &&
            this.coord[0] > rect.coord[0] + rect.size[0] / 8 &&
            this.coord[1] > rect.coord[1] && 
            this.coord[1] < rect.coord[1] + rect.size[1]) return Intersection.Right;
        
        if( this.coord[1] - this.radius < rect.coord[1] + rect.size[1] &&
            this.coord[1] > rect.coord[1] + rect.size[1] / 8 &&
            this.coord[0] > rect.coord[0] &&
            this.coord[0] < rect.coord[0] + rect.size[0]) return Intersection.Down;

        return Intersection.None;
            
    }

    getSpeed(){
        return this.speed;
    }
    setSpeed(speed : [number, number]){
        this.speed = speed;
    }
}
