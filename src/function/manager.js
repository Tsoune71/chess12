import { Board } from "./Board";

function Search(depth, board, last) {
    let score = -Infinity;
    if (depth % 2 === 0) score = Infinity;
    const [bin, scoreIfExist] = board.bin(depth);
    if (scoreIfExist) {
        return scoreIfExist;
    }
    if (depth === 3) return board.value("b", bin);

    const moves = board.generatorMoves(depth % 2 === 1, last);
    // no moves for other player
    if (moves.length === 0) {
        if (board.kingAttacked(depth % 2 === 1, last)) return score;
        return 0;
    }
    for (const move of moves) {
        const resReplace = board.replace(move);
        const evaluation = Search(depth + 1, board, [move.start[1], move.start[0], move.end[1], move.end[0], move.type]);
        board.remove(move, resReplace.deleted);
        if (depth % 2 === 0) {
            if (evaluation < score) {
                score = evaluation;
                // if (board.best(depth) < score) {
                //     break
                // };
            }
        } else {
            if (evaluation > score) {
                score = evaluation;
                // if (board.best(depth) > score) {
                //     break
                // };
            }
        }
    }
    board.addBin(bin, score);
    return score;
}

export const IAplay = (boa, color, last, rockIA, rock, colorPlayer) => {
    const board = new Board(boa, color, rockIA, rock, colorPlayer);
    let score = -Infinity;
    let response = undefined;
    for (const move of board.generatorMoves(true, last)) {
        const resReplace = board.replace(move);
        const evaluation = Search(0, board, [move.start[1], move.start[0], move.end[1], move.end[0], move.type]);
        board.remove(move, resReplace.deleted);
        if (evaluation >= score) {
            score = evaluation;
            response = move;
        }
    }
    return response;
};
