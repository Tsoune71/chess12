import { valuePieces, valuePosition } from "./Const";
import { getMoves, recupAllCases, getMovesAttack } from "./possibility";

export class Board {
    constructor(board, cb, rb, rp, cp) {
        this.board = board;
        this.rp = Array.from(rp);
        this.rb = Array.from(rb);
        this.cp = cp;
        this.cb = cb;
    }
    dangerous(board) {
        let counter = 0;
        for (const line of board) {
            for (const square of line) {
                if (square === "r_w") counter += 13;
                if (square === "q_w") counter += 30;
                if (square === "b_w" || square === "k_w") counter += 3;
            }
        }
        if (counter <= 29) this.danger = 2;
        else this.danger = 0;
    }

    replace(move) {
        const { start, end, promotion, type } = move;
        let deleted = this.board[end[0]][end[1]];
        if (type === "r" && start[1] === 0) {
            if (this.board[start[0]][start[1]][2] === "b") this.rb[0] = false;
            else this.rp[0] = false;
        }
        if (type === "r" && start[1] === 7) {
            if (this.board[start[0]][start[1]][2] === "b") this.rb[1] = false;
            else this.rp[1] = false;
        }
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
            if (move.end[0] === 0) this.rb = [true, true];
            else this.rp = [true, true];
        }
        if (type === "r" && start[1] === 0) {
            if (this.board[start[0]][start[1]][2] === "b") this.rb[0] = true;
            else this.rp[0] = true;
        }
        if (type === "r" && start[1] === 7) {
            if (this.board[start[0]][start[1]][2] === "b") this.rb[1] = true;
            else this.rp[1] = true;
        }
        this.dangerous(this.board);
        return deleted;
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

    value(color) {
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
        return scoreIA - score;
    }

    generatorMoves(bool, last) {
        if (bool) return getMoves(this.cb, this.board, last, this.rb);
        return getMoves(this.cp, this.board, last, this.rp);
    }

    generatorMovesCaptures(bool, last) {
        if (bool) return getMovesAttack(this.cb, this.board, last, this.rb);
        return getMovesAttack(this.cp, this.board, last, this.rp);
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
        for (const move of moves) {
            if (this.board[move[0]][move[1]] === king) return true;
        }
        return false;
    }

    distanceBetweenKing() {
        let first = [0, 0];
        let second = [7, 7];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.board[y][x] === "m_b") first = [x, y];
                if (this.board[y][x] === "m_w") second = [x, y];
            }
        }
        return 14 - ((first[0] - second[0]) ** 2) ** 0.5 + ((first[1] - second[1]) ** 2) ** 0.5;
    }
}
