import { BoardCLASS } from "./Board";
import { Max } from "./Const";

BoardCLASS.prototype.Search = function (depth, color, alpha, beta) {
    //repetition
    if (this.VerifRep()) return 0;
    //endSearch for Captures Moves
    if (depth === 0) return this.SearchCapture(color, alpha, beta);
    //get Moves
    const moves = this.GeneratorMove(color);
    for (const [i, ind, p] of moves) {
        this.makeMove(i, ind, p);
        let e = -this.Search(depth - 1, (color + 1) % 2, -beta, -alpha);
        if (p) e -= depth;
        this.removeMove(p);
        if (e >= beta) return beta;
        alpha = Max(e, alpha);
    }
    // no moves
    if (moves.length === 0) {
        // check Mate
        if (this.isSquareInCheck(this.coordKings[color], color)) return -100000 - depth * 1000;
        // PAT
        return 0;
    }
    return alpha;
};
