import { Max, kingEnGame } from "./Const";
import { board } from "./Call";
import { SearchEnd } from "./SearchEnd";

export function Search(depth, last, alpha, beta, lastColor) {
    let color = "b";
    if (depth % 2 === 0) color = "w";

    if (depth === 3) return SearchEnd(last, alpha, beta, depth % 2 === 0);

    const moves = board.generatorMoves(depth % 2 === 1, last);
    // no moves for other player
    if (moves.length === 0) {
        if (board.kingAttacked(depth % 2 === 1, last)) return -100000 + depth;
        const v = board.value(color);
        if (v > 0) return -5000 + depth;
        return 5000 - depth;
    }

    for (const move of moves) {
        const deleted = board.replace(move);
        let evaluation = -Search(depth + 1, [move.start[1], move.start[0], move.end[1], move.end[0], move.type], -beta, -alpha);
        if (board.danger === 2 && move.type === "m" && board.value(color) <= 400 && depth === 0) evaluation += board.kingsCloser(color);
        board.remove(move, deleted);

        if (evaluation >= beta) return beta;
        alpha = Max(alpha, evaluation);
    }
    return alpha;
}
