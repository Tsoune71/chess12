import { Board } from "./Board";
import { Search } from "./Search";

export var board;

export const IAplay = (boa, color, last, rockIA, rock, colorPlayer) => {
    board = new Board(boa, color, rockIA, rock, colorPlayer);
    let score = -Infinity;
    let response = undefined;
    for (const move of board.generatorMoves(true, last)) {
        const deleted = board.replace(move);
        let evaluation = -Search(0, [move.start[1], move.start[0], move.end[1], move.end[0], move.type], -Infinity, Infinity, last);
        if (board.danger === 2 && board.value(color) >= 400 && evaluation < 99990 && move.type === "m") {
            evaluation += board.distanceKings();
        }
        board.remove(move, deleted);
        if (evaluation === 100000) return move
        console.log(move, evaluation);
        if (evaluation >= score) {
            score = evaluation;
            response = move;
        }
    }
    console.log(score);
    return response;
};
