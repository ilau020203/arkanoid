"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statistic = void 0;
const enums_1 = require("./enums");
class Statistic {
    constructor() {
        this.data = {
            BlockIsDestroyed: 0,
            BallIsLost: 0,
            HitOnBlock: 0,
            Clear: 0,
        };
    }
    init() {
        this.data = {
            BlockIsDestroyed: 0,
            BallIsLost: 0,
            HitOnBlock: 0,
            Clear: 0,
        };
    }
    update(message) {
        this.data[message]++;
        if (message == enums_1.Information.Clear)
            this.init();
    }
    getData() {
        return this.data;
    }
}
exports.Statistic = Statistic;
