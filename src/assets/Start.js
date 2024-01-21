import { BoardCLASS } from "./Board";
import { Best, Max } from "./Const";

BoardCLASS.prototype.Start = function (color, depth) {
    let alpha = -Infinity;
    this.already = [];
    let response = [];
    if (!this.gameValue && this.ScoreColorForEndGame(+!color) < 1500) this.gameValue = 1;
    for (const move of this.GeneratorMove(color)) {
        this.MakeMove(move);
        let evaluation = -this.Search(depth, +!color, -Infinity, +Infinity);
        console.log(evaluation);
        this.UnMakeMove();
        response.push([move, evaluation]);
        alpha = Max(alpha, evaluation);
    }
    console.log("-------------------------------");
    let r = [];
    for (const [move, score] of response) if (score === alpha) r.push(move);
    return r[Math.floor(Math.random() * r.length)];
};
