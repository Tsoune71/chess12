import { BoardCLASS } from "./Board";
import { Max } from "./Const";

BoardCLASS.prototype.SearchCapture = function (color, alpha, beta) {
    const t = this.Eval(color);
    if (t >= beta) return beta;
    alpha = Max(t, alpha);
    for (const [i, ind, p] of this.GeneratorCapture(color)) {
        this.makeMove(i, ind, p);
        const e = -this.SearchCapture(+!color, -beta, -alpha);
        this.removeMove(p);
        if (e >= beta) return beta;
        alpha = Max(e, alpha);
    }
    return alpha;
};
