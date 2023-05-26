import { Rect } from "./rect";

export class Canvas{
    private canvas : HTMLCanvasElement;
    private ctx :  CanvasRenderingContext2D | null;
    private color : string | undefined;
    private width : number;
    private height : number;
    constructor(width : number, height : number, color? : string){
        this.setColor(color);
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ctx = this.canvas.getContext("2d");
        document.querySelector("body")?.appendChild(this.canvas);
    }
    line(x1 : number, y1 : number, x2 : number, y2 : number, color? : string, lineWidth? : number){
        if(!this.ctx) return;
        this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
        this.setColor(color);
        this.ctx.lineWidth = (lineWidth) ? lineWidth : 1;
        this.ctx.stroke();
    }
    circle(x : number, y: number, radius: number,  color?: string){
        if(!this.ctx) return;
        this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.setColor(color);
        this.ctx.fill();
    }
    rectangle(rect : Rect){
        this.rect(...rect.coord, ...rect.size, rect.color);
    }
    rect(x : number, y: number, width: number, height: number, color?: string){
        if(!this.ctx) return;
        this.ctx.beginPath();
            this.ctx.rect(x, y, width, height);
        this.ctx.closePath();
        this.setColor(color);
        this.ctx.fill();
    }
    setColor(color? : string){
        if(!this.ctx) return;
        (color) ? this.color = color : 'white';
        this.ctx.strokeStyle = this.color??'white';
        this.ctx.fillStyle = this.color??'white';
    }
    clear(){
        this.ctx?.clearRect(0, 0, this.width, this.height);
    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
}
