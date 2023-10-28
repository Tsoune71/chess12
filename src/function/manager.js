import { Board } from "./Board";

function Search(depth, board, last, alpha, beta) {
    const [bin, scoreIfExist] = board.bin(depth);
    if (scoreIfExist) return scoreIfExist;

    if (depth === 3) return board.value("b", bin);

    const moves = board.generatorMoves(depth % 2 === 1, last);
    // no moves for other player
    if (moves.length === 0) {
        if (board.kingAttacked(depth % 2 === 1, last)) {
            if (depth % 2 === 0) return 100000 - depth;
            return -100000 + depth;
        }
        return 0;
    }
    for (const move of moves) {
        const deleted = board.replace(move);
        const evaluation = Search(depth + 1, board, [move.start[1], move.start[0], move.end[1], move.end[0], move.type], alpha, beta);
        board.remove(move, deleted);
        if (depth % 2 === 0) {
            if (board.better[depth]) {
                if (evaluation <= board.better[depth]) return evaluation;
            }
            if (evaluation < beta) beta = evaluation;
        } else {
            // if (board.better[depth]) {
            //     if (evaluation < board.better[depth]) return evaluation;
            // }
            if (evaluation > alpha) alpha = evaluation;
        }
    }

    if (depth % 2 === 0) {
        board.addBin(bin, beta);
        board.better[depth] = beta;
        return beta;
    } else {
        board.addBin(bin, alpha);
        board.better[depth] = alpha;
        return alpha;
    }
}

export const IAplay = (boa, color, last, rockIA, rock, colorPlayer) => {
    const board = new Board(boa, color, rockIA, rock, colorPlayer);
    let score = -Infinity;
    let response = undefined;
    for (const move of board.generatorMoves(true, last)) {
        const deleted = board.replace(move);
        const evaluation = Search(0, board, [move.start[1], move.start[0], move.end[1], move.end[0], move.type], -Infinity, Infinity);
        board.remove(move, deleted);
        console.log(move, evaluation);
        if (evaluation > score) {
            score = evaluation;
            response = move;
        }
    }
    return response;
};
