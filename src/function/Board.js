import { getMoves, recupAllCases } from "./possibility";

const valuePieces = {
    p: 100,
    k: 300,
    b: 350,
    r: 500,
    q: 900,
    m: 0,
};

const valuePosition = {
    p: [
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 5, 5, 0, 0, 0],
            [0, 0, 0, 4, 4, 0, 0, 0],
            [1, 0, 1, 2, 2, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 5, 5, 0, 0, 0],
            [1, 0, 3, 2, 2, 3, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [9, 9, 9, 9, 9, 9, 9, 9],
            [6, 6, 6, 6, 6, 6, 6, 6],
            [5, 5, 5, 5, 5, 5, 5, 5],
            [4, 4, 4, 4, 4, 4, 4, 4],
            [3, 3, 3, 3, 3, 3, 3, 3],
            [2, 2, 2, 2, 2, 2, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
    ],
    k: [
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 3, 0, 3, 3, 0, 3, 0],
            [0, 0, 0, 3, 3, 0, 0, 0],
            [0, 0, 3, 0, 0, 3, 0, 0],
            [0, 0, 0, 2, 2, 0, 0, 0],
            [0, -1, 0, 0, 0, 0, -1, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
    ],
    b: [
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 2, 0],
            [0, 0, 2, 0, 0, 2, 0, 0],
            [0, 2, 0, 1, 1, 0, 2, 0],
            [0, 1, 0, 1, 1, 0, 1, 0],
            [0, 0, -1, 0, 0, -1, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
    ],
    r: [
        [
            [3, 0, 0, 2, 0, 2, 0, 3],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
    ],
    q: [
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
    ],
    m: [
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 5, 0, 3, 0, 5, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
    ],
};

export class Board {
    constructor(board, cb, rb, rp, cp) {
        this.board = board;
        this.rp = rp;
        this.rb = rb;
        this.cp = cp;
        this.cb = cb;
        this.alreadyDone = [];
        this.bestDepth = [0, 0, 0, 0];
    }
    dangerous(board) {
        let counter = 0;
        for (const line of board) {
            for (const square of line) {
                if (square === "r_w") counter += 10;
                if (square === "q_w") counter += 30;
                if (square === "b_w" || square === "k_w") counter += 3;
            }
        }
        if (counter < 40) this.danger = 2;
        else this.danger = 0;
    }
    replace(move) {
        const { start, end, promotion, type } = move;
        let deleted = this.board[end[0]][end[1]];

        if (!promotion) {
            this.board[end[0]][end[1]] = this.board[start[0]][start[1]];
        } else {
            this.board[end[0]][end[1]] = promotion;
        }
        if (type === "p" && start[1] !== end[1] && this.board[end[0]][end[1]] === "none") {
            let coef = 1;
            if (this.board[start[0]][start[1]][2] === "b") coef = -1;
            this.board[end[0] + coef][end[1]] = "none";
        }
        this.board[start[0]][start[1]] = "none";
        if (type === "m" && start[1] === 4 && (end[1] === 6 || end[1] === 2)) {
            if (move.end[1] === 6) {
                this.board[move.end[0]][5] = this.board[move.end[0]][7];
                this.board[move.end[0]][7] = "none";
            } else {
                this.board[move.end[0]][3] = this.board[move.end[0]][0];
                this.board[move.end[0]][0] = "none";
            }
        }
        this.dangerous(this.board);
        return { deleted };
    }
    remove(move, deleted) {
        const { start, end, promotion, type } = move;
        if (type === "p" && start[1] !== end[1] && deleted === "none") {
            let enmyColor = "b";
            let coef = 1;
            if (this.board[end[0]][end[1]][2] === "b") {
                coef = -1;
                enmyColor = "w";
            }
            this.board[end[0] + coef][end[1]] = `p_${enmyColor}`;
        }
        if (!promotion) {
            this.board[start[0]][start[1]] = this.board[end[0]][end[1]];
        } else {
            this.board[start[0]][start[1]] = `p_${promotion[2]}`;
        }
        this.board[end[0]][end[1]] = deleted;

        if (type === "m" && start[1] === 4 && (end[1] === 6 || end[1] === 2)) {
            if (end[1] === 6) {
                this.board[end[0]][7] = this.board[end[0]][5];
                this.board[end[0]][5] = "none";
            } else {
                this.board[end[0]][0] = this.board[end[0]][3];
                this.board[end[0]][3] = "none";
            }
        }
    }
    bin(depth) {
        let crypted = depth.toString();
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const square = this.board[y][x];
                if (square === "none") crypted += "1";
                if (square === "p_w") crypted += "2";
                if (square === "r_w") crypted += "3";
                if (square === "k_w") crypted += "4";
                if (square === "b_w") crypted += "5";
                if (square === "q_w") crypted += "6";
                if (square === "m_w") crypted += "7";
                if (square === "p_b") crypted += "8";
                if (square === "r_b") crypted += "9";
                if (square === "k_b") crypted += "10";
                if (square === "b_b") crypted += "11";
                if (square === "q_b") crypted += "12";
                if (square === "m_b") crypted += "0";
            }
        }
        return [crypted, this.alreadyDone[crypted]];
    }
    addBin(bin, score) {
        this.alreadyDone[bin] = score;
    }
    value(color, bin) {
        let scoreIA = 0;
        let score = 0;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const square = this.board[y][x];
                if (square !== "none") {
                    if (square[2] === color) {
                        scoreIA += valuePieces[square[0]] + valuePosition[square[0]][this.danger][7 - y][x];
                    } else {
                        score += valuePieces[square[0]] + valuePosition[square[0]][this.danger][y][x];
                    }
                }
            }
        }
        this.alreadyDone[bin] = scoreIA - score;
        return scoreIA - score;
    }
    generatorMoves(bool, last) {
        if (bool) return getMoves(this.cb, this.board, last, this.rb);
        return getMoves(this.cp, this.board, last, this.rp);
    }
    kingAttacked(bool, last) {
        let moves = [];
        let king = `m_${this.cb}`;
        if (!bool) {
            moves = recupAllCases(this.cb, 0, this.board, last, this.rb);
            king = `m_${this.cp}`;
        } else {
            moves = recupAllCases(this.cp, 0, this.board, last, this.rp);
        }
        console.log(king);
        for (const move of moves) {
            if (this.board[move[0]][move[1]] === king) return true;
        }
        return false;
    }
}
