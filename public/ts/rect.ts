export class Rect{
    coord : [number, number];
    color : string;
    size : [number, number];
    constructor(coord : [number, number], size : [number, number], color : string){
        this.coord = coord;
        this.size = size;
        this.color = color;
    }

}