import { BoardCLASS } from "./Board";
import { Min, knightSquares } from "./Const";

BoardCLASS.prototype.AttackByKnight = function (i, color) {
    for (const ind of knightSquares(this.coordKings[+!color])) if (ind === i) return true;
    return false;
};

BoardCLASS.prototype.AttackByRock = function (i, color) {
    const king = this.coordKings[+!color];
    const x = i % 8;
    const y = parseInt(i / 8);
    for (const [ind, range] of [
        [-8, y],
        [-1, x],
        [1, 7 - x],
        [8, 7 - y],
    ]) {
        for (let coef = 1; coef < range + 1; coef++) {
            let square = i + ind * coef;
            const type = this.board[square];
            if (!type || type % 2 !== color) {
                if (square === king) return true;
                if (type && type % 2 !== color) break;
            } else break;
        }
    }
    return false;
};

BoardCLASS.prototype.AttackByBishop = function (i, color) {
    const king = this.coordKings[+!color];
    const x = i % 8;
    const y = parseInt(i / 8);
    for (const [ind, range] of [
        [-9, Min(x, y)],
        [-7, Min(7 - x, y)],
        [7, Min(x, 7 - y)],
        [9, Min(7 - x, 7 - y)],
    ]) {
        for (let coef = 1; coef < range + 1; coef++) {
            let square = i + ind * coef;
            const type = this.board[square];
            if (!type || type % 2 !== color) {
                if (square === king) return true;
                if (type && type % 2 !== color) break;
            } else break;
        }
    }
    return false;
};
