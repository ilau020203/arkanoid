"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Information = exports.Color = exports.Intersection = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["Stop"] = 0] = "Stop";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Left"] = 2] = "Left";
})(Direction = exports.Direction || (exports.Direction = {}));
var Intersection;
(function (Intersection) {
    Intersection[Intersection["None"] = 0] = "None";
    Intersection[Intersection["Left"] = 1] = "Left";
    Intersection[Intersection["Up"] = 2] = "Up";
    Intersection[Intersection["Right"] = 3] = "Right";
    Intersection[Intersection["Down"] = 4] = "Down";
})(Intersection = exports.Intersection || (exports.Intersection = {})); // 0,1,2,3,4
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Yellow"] = 2] = "Yellow";
    Color[Color["Green"] = 3] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
    Color[Color["Purple"] = 5] = "Purple";
})(Color = exports.Color || (exports.Color = {}));
var Information;
(function (Information) {
    Information["BlockIsDestroyed"] = "BlockIsDestroyed";
    Information["BallIsLost"] = "BallIsLost";
    Information["HitOnBlock"] = "HitOnBlock";
    Information["Clear"] = "Clear";
})(Information = exports.Information || (exports.Information = {}));
