import { board } from "./Call";
import { Max } from "./Const";

export function SearchEnd(last, alpha, beta, bool) {
    let color = "b";
    if (bool) color = "w";

    let evaluation = board.value(color);
    if (evaluation >= beta) return beta;
    alpha = Max(alpha, evaluation);
    const movesCaptures = board.generatorMovesCaptures(!bool, last);
    for (const move of movesCaptures) {
        const deleted = board.replace(move);
        evaluation = -SearchEnd([move.start[1], move.start[0], move.end[1], move.end[0], move.type], -beta, -alpha, !bool);
        board.remove(move, deleted);
        if (evaluation >= beta) return beta;
        alpha = Max(alpha, evaluation);
    }
    return alpha;
}
