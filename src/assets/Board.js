import {
    Abs,
    knightSquares,
    pieV,
    posV,
    triFusion,
    pieceOrders,
    Min,
    isKing,
    isPawn,
    isRock,
    isKnight,
    isBishop,
    isQueen,
    kingSquares,
} from "./Const";

export class BoardCLASS {
    constructor(b) {
        this.board = b;
        this.max = 0;
        this.rock = [
            [0, 0],
            [0, 0],
        ];
        this.movesMake = [[0, 0, 0, 0, 0]];
        this.coordKings = [0, 0];
        this.gameValue = 0;
        this.already = [];
        for (let j = 0; j < 64; j++) if (isKing(this.board[j])) this.coordKings[this.board[j] % 2] = j;
    }
    EnPassant(indice) {
        const { i, ind, deleted } = this.movesMake[this.movesMake.length - 1];
        if (
            deleted === 0 &&
            isPawn(this.board[ind]) &&
            parseInt(ind / 8) === parseInt(indice / 8) &&
            Abs(parseInt(ind / 8) - parseInt(i / 8)) === 2 &&
            Abs((indice % 8) - (ind % 8)) === 1
        )
            return ind;
        return false;
    }
    LegalMove(i) {
        let res = [];
        const type = this.board[i];
        const x = i % 8;
        const y = parseInt(i / 8);
        const color = type % 2;
        if (isPawn(type)) {
            let sens = -8;
            if (color) sens = 8;
            const top = i + sens;
            const takeRight = top + 1;
            const takeLeft = top - 1;
            if (x !== 7 && this.board[takeRight] !== 0 && this.board[takeRight] % 2 !== color && this.isVerif(i, takeRight))
                res.push(takeRight);
            if (x !== 0 && this.board[takeLeft] !== 0 && this.board[takeLeft] % 2 !== color && this.isVerif(i, takeLeft))
                res.push(takeLeft);
            if (this.board[top] === 0) {
                if (this.isVerif(i, top)) res.push(top);
                const top2 = i + sens * 2;
                if ((y === 1 || y === 6) && this.board[top2] === 0 && this.isVerif(i, top2)) res.push(top2);
            }
            const enPass = this.EnPassant(i);
            if (enPass) res.push(enPass + sens);
        }
        if (isKnight(type)) {
            for (const ind of knightSquares(i))
                if ((this.board[ind] % 2 !== color || this.board[ind] === 0) && this.isVerif(i, ind)) res.push(ind);
        }
        if (isBishop(type)) {
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
                        if (this.isVerif(i, square)) res.push(square);
                        if (type && type % 2 !== color) break;
                    } else break;
                }
            }
            return res;
        }
        if (isRock(type)) {
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
                        if (this.isVerif(i, square)) res.push(square);
                        if (type && type % 2 !== color) break;
                    } else break;
                }
            }
            return res;
        }
        if (isQueen(type)) {
            for (const [ind, range] of [
                [-8, y],
                [-1, x],
                [1, 7 - x],
                [8, 7 - y],
                [-9, Min(x, y)],
                [-7, Min(7 - x, y)],
                [7, Min(x, 7 - y)],
                [9, Min(7 - x, 7 - y)],
            ]) {
                for (let coef = 1; coef < range + 1; coef++) {
                    let square = i + ind * coef;
                    const type = this.board[square];
                    if (type === 0 || type % 2 !== color) {
                        if (this.isVerif(i, square)) res.push(square);
                        if (type && type % 2 !== color) break;
                    } else break;
                }
            }
            return res;
        }
        if (isKing(type)) {
            if (
                (this.rock[color][0] === 0 || this.rock[color][1] === 0) &&
                !this.isSquareInCheck(this.coordKings[color], color)
            ) {
                if (
                    !this.rock[color][0] &&
                    this.board[y * 8] === 8 - color &&
                    !this.board[y * 8 + 3] &&
                    !this.board[y * 8 + 2] &&
                    !this.board[y * 8 + 1] &&
                    !this.isSquareInCheck(y * 8 + 3, color) &&
                    !this.isSquareInCheck(y * 8 + 2, color)
                )
                    res.push(y * 8 + 2);
                if (
                    !this.rock[color][1] &&
                    this.board[y * 8 + 7] === 8 - color &&
                    !this.board[y * 8 + 5] &&
                    !this.board[y * 8 + 6] &&
                    !this.isSquareInCheck(y * 8 + 5, color) &&
                    !this.isSquareInCheck(y * 8 + 6, color)
                )
                    res.push(y * 8 + 6);
            }
            for (const ind of kingSquares(i))
                if ((this.board[ind] === 0 || this.board[ind] % 2 !== color) && this.isVerif(i, ind)) res.push(ind);
        }
        return res;
    }
    CaptureMove(i) {
        let res = [];
        const type = this.board[i];
        const x = i % 8;
        const y = parseInt(i / 8);
        const color = type % 2;
        if (isPawn(type)) {
            let sens = -8;
            if (color) sens = 8;
            const top = i + sens;
            const takeRight = top + 1;
            const takeLeft = top - 1;
            if (x !== 7 && this.board[takeRight] !== 0 && this.board[takeRight] % 2 !== color && this.isVerif(i, takeRight))
                res.push(takeRight);
            if (x !== 0 && this.board[takeLeft] !== 0 && this.board[takeLeft] % 2 !== color && this.isVerif(i, takeLeft))
                res.push(takeLeft);
            const enPass = this.EnPassant(i);
            if (enPass) res.push(enPass + sens);
            return res;
        }
        if (isKnight(type)) {
            for (const ind of knightSquares(i))
                if (this.board[ind] !== 0 && this.board[ind] % 2 !== color && this.isVerif(i, ind)) res.push(ind);
            return res;
        }
        if (isBishop(type)) {
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
                        if (type && type % 2 !== color) {
                            if (this.isVerif(i, square)) res.push(square);
                            break;
                        }
                    } else break;
                }
            }
            return res;
        }
        if (isRock(type)) {
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
                        if (type && type % 2 !== color) {
                            if (this.isVerif(i, square)) res.push(square);
                            break;
                        }
                    } else break;
                }
            }
            return res;
        }
        if (isQueen(type)) {
            for (const [ind, range] of [
                [-8, y],
                [-1, x],
                [1, 7 - x],
                [8, 7 - y],
                [-9, Min(x, y)],
                [-7, Min(7 - x, y)],
                [7, Min(x, 7 - y)],
                [9, Min(7 - x, 7 - y)],
            ]) {
                for (let coef = 1; coef < range + 1; coef++) {
                    const square = i + ind * coef;
                    const type = this.board[square];
                    if (type === 0 || type % 2 !== color) {
                        if (type && type % 2 !== color) {
                            if (this.isVerif(i, square)) res.push(square);
                            break;
                        }
                    } else break;
                }
            }
            return res;
        }
        if (isKing(type)) {
            for (const ind of kingSquares(i))
                if (this.board[ind] !== 0 && this.board[ind] % 2 !== color && this.isVerif(i, ind)) res.push(ind);
        }
        return res;
    }
    isVerif(i, ind) {
        const type = this.board[i];
        const deleted = this.board[ind];
        const color = type % 2;
        this.board[ind] = type;
        this.board[i] = 0;
        let coordK = this.coordKings[color];
        if (type === 11 || type === 12) coordK = ind;
        const r = !this.isSquareInCheck(coordK, color);
        this.board[i] = type;
        this.board[ind] = deleted;
        return r;
    }
    isSquareInCheck(i, color) {
        const x = i % 8;
        const y = parseInt(i / 8);
        for (const ind of knightSquares(i)) if (this.board[ind] === 3 + color) return true;
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
                    if (type === 5 + color || type === 9 + color) return true;
                    if (type && type % 2 !== color) break;
                } else break;
            }
        }
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
                    if (type === 7 + color || type === 9 + color) return true;
                    if (type && type % 2 !== color) break;
                } else break;
            }
        }
        let sens = -8;
        if (color) sens = 8;
        if (x !== 7 && this.board[i + sens + 1] === 1 + color) return true;
        if (x !== 0 && this.board[i + sens - 1] === 1 + color) return true;
        for (const ind of kingSquares(i)) if (this.board[ind] === 11 + color) return true;
        return false;
    }
    MakeMove(m) {
        const { i, ind, p, deleted } = m;
        const type = this.board[i];
        const color = type % 2;
        const x = ind % 8;
        const y = parseInt(ind / 8);
        //verif enPassant
        if (isPawn(type) && x !== i % 8 && !deleted) this.board[parseInt(i / 8) * 8 + x] = 0;
        //verif rock
        if (isKing(type)) {
            this.coordKings[color] = ind;
            this.rock[color][0]++;
            this.rock[color][1]++;
            if (Abs(i - ind) === 2) {
                if (x === 2) {
                    this.board[y * 8 + 3] = this.board[y * 8];
                    this.board[y * 8] = 0;
                } else {
                    this.board[y * 8 + 5] = this.board[y * 8 + 7];
                    this.board[y * 8 + 7] = 0;
                }
            }
        }
        //verif cancel rock
        if (isRock(type) && (i % 8 === 0 || i % 8 === 7) && parseInt(i / 8) === 7 * (1 - color)) this.rock[color][(i % 8) / 7]++;
        //make move and manage promotion
        if (p) this.board[ind] = p;
        else this.board[ind] = this.board[i];
        this.board[i] = 0;
        //add move in allMoves
        this.movesMake.push(m);
    }
    UnMakeMove() {
        const { i, ind, deleted, p } = this.movesMake.pop();
        const type = this.board[ind];
        const color = type % 2;
        const x = i % 8;
        const y = parseInt(i / 8);
        if (isPawn(type) && x !== ind % 8 && !deleted) this.board[y * 8 + (ind % 8)] = 1 + color;
        if (isKing(type)) {
            this.coordKings[color] = i;
            this.rock[color][0]--;
            this.rock[color][1]--;
            if (Abs(i - ind) === 2) {
                if (ind % 8 === 2) {
                    this.board[y * 8] = this.board[y * 8 + 3];
                    this.board[y * 8 + 3] = 0;
                } else {
                    this.board[y * 8 + 7] = this.board[y * 8 + 5];
                    this.board[y * 8 + 5] = 0;
                }
            }
        }
        if (isRock(type) && (x === 0 || x === 7) && y === 7 * (1 - color)) this.rock[color][x / 7]--;
        if (p) this.board[i] = 2 - color;
        else this.board[i] = this.board[ind];
        this.board[ind] = deleted;
    }
    VerifRep() {
        const length = this.movesMake.length;
        if (length < 7) return false;
        const { i: s1, ind: e1, deleted: t1 } = this.movesMake[length - 1];
        const { i: s2, ind: e2, deleted: t2 } = this.movesMake[length - 2];
        const { i: s3, ind: e3, deleted: t3 } = this.movesMake[length - 3];
        const { i: s4, ind: e4, deleted: t4 } = this.movesMake[length - 4];
        const { i: s5, ind: e5, deleted: t5 } = this.movesMake[length - 5];
        const { i: s6, ind: e6, deleted: t6 } = this.movesMake[length - 6];
        return (
            !t1 &&
            !t2 &&
            !t3 &&
            !t4 &&
            !t5 &&
            !t6 &&
            s1 === s5 &&
            e1 === e5 &&
            s2 === s6 &&
            e2 === e6 &&
            s1 === e3 &&
            s3 === e1 &&
            s2 === e4 &&
            s4 === e2
        );
    }
    ScoreColorForEndGame(color) {
        let r = 0;
        for (const p of this.board) if (p !== 0 && !isPawn(p) && p % 2 === color) r += pieV[parseInt((p - 1) / 2)];
        return r;
    }
    GameFinish(color) {
        const moves = this.GeneratorMove(color);
        if (!moves.length) {
            if (this.isSquareInCheck(this.coordKings[color], color)) return "Echec et Mat";
            return "Nule par pat";
        }
        if (this.VerifRep()) return "Nule par répétition";
        return undefined;
    }
}
