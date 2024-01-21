import { BoardCLASS } from "./Board";
import { Max } from "./Const";

BoardCLASS.prototype.SearchCapture = function (color, alpha, beta) {
    const t = this.Eval(color);
    if (t >= beta) return beta;
    alpha = Max(t, alpha);
    for (const move of this.GeneratorCapture(color)) {
        this.MakeMove(move);
        const e = -this.SearchCapture(+!color, -beta, -alpha);
        this.UnMakeMove();
        if (e >= beta) return beta;
        alpha = Max(e, alpha);
    }
    return alpha;
};
