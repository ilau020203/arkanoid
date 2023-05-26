import { Canvas } from "./canvas";

export interface GameObject{
    draw : (canvas? : Canvas) => void;
}