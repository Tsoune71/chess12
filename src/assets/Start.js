import { BoardCLASS } from "./Board";
import { Max } from "./Const";

BoardCLASS.prototype.Start = function (color, depth) {
    let alpha = -Infinity;
    this.already = [];
    let response = [];
    if (!this.gameValue && this.ScoreColorForEndGame(+!color) < 1500) this.gameValue = 1;
    for (const [i, ind, p] of this.GeneratorMove(color)) {
        this.makeMove(i, ind, p);
        let evaluation = -this.Search(depth, +!color, -Infinity, +Infinity);
        console.log(evaluation);
        this.removeMove(p);
        response.push([[i, ind, p], evaluation]);
        alpha = Max(alpha, evaluation);
    }
    console.log("-------------------------------");
    let r = [];
    for (const [move, score] of response) if (score === alpha) r.push(move);
    return r[Math.floor(Math.random() * r.length)];
};
