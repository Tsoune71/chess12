const Routeur = {
    1: (x, y, params, board, lastMove, rock) => {
        let res = [];
        const add = -1;
        const size = 6;

        if (lastMove.length !== 0 && params !== 0) {
            let aX = lastMove[0];
            let bX = lastMove[2];

            let bY = lastMove[3];
            let aY = lastMove[1];
            let ponto = board[bY][bX];
            board[bY][bX] = 0b0000;
            if (((aX - x) ** 2) ** 0.5 === 1 && lastMove[4] === "p" && aX === bX && ((bY - aY) ** 2) ** 0.5 === 2 && bY === y && squareRemoveCheck(x, y, bX, bY + add, col, board, lastMove, rock)) {
                res.push([bY + add, bX, [bX, bY]]);
            }
            board[bY][bX] = ponto;
        }

        if (params === 0) {
            if (leaveBOARD(x + 1, y + add)) {
                res.push([y + add, x + 1]);
            }
            if (leaveBOARD(x - 1, y + add)) {
                res.push([y + add, x - 1]);
            }
        } else if (params === 1) {
            if (leaveBOARD(x, y + add) && board[y + add][x] === "none" && squareRemoveCheck(x, y, x, y + add, col, board, lastMove, rock)) {
                res.push([y + add, x]);
            }
            if (y === size && board[y + 2 * add][x] === "none" && squareRemoveCheck(x, y, x, y + 2 * add, col, board, lastMove, rock) && board[y + add][x] === "none") res.push([y + 2 * add, x]);

            if (leaveBOARD(x + 1, y + add) && board[y + add][x + 1][2] === enemy && squareRemoveCheck(x, y, x + 1, y + add, col, board, lastMove, rock)) {
                res.push([y + add, x + 1]);
            }
            if (leaveBOARD(x - 1, y + add) && board[y + add][x - 1][2] === enemy && squareRemoveCheck(x, y, x - 1, y + add, col, board, lastMove, rock)) {
                res.push([y + add, x - 1]);
            }
        } else {
            let pos = [
                [x - 1, y + add],
                [x + 1, y + add],
                [x, y + add],
            ];
            for (const e of pos) {
                if (leaveBOARD(e[0], e[1])) res.push([e[1], e[0]]);
            }
            if (y === size) res.push([y + 2 * add, x]);
        }
        return res;
    },
    r: (x, y, params, col, board, lastMove, rock) => {
        let enemy = "b";
        if (col === "b") enemy = "w";
        let res = [];
        for (let i = 0; i < 4; i++) {
            let xAdd = 0;
            let yAdd = 0;
            if (i === 0) xAdd = 1;
            if (i === 1) xAdd = -1;
            if (i === 2) yAdd = 1;
            if (i === 3) yAdd = -1;
            for (let j = 1; j < 8; j++) {
                if (leaveBOARD(y + j * yAdd, x + j * xAdd)) {
                    if (params === 0) {
                        if (board[y + j * yAdd][x + j * xAdd] === "none") res.push([y + j * yAdd, x + j * xAdd]);
                        else {
                            if (board[y + j * yAdd][x + j * xAdd][2] !== "none") res.push([y + j * yAdd, x + j * xAdd]);
                            break;
                        }
                    } else if (params === 2) {
                        res.push([y + j * yAdd, x + j * xAdd]);
                    } else {
                        if (board[y + j * yAdd][x + j * xAdd] === "none") {
                            if (squareRemoveCheck(x, y, x + j * xAdd, y + j * yAdd, col, board, lastMove, rock)) {
                                res.push([y + j * yAdd, x + j * xAdd]);
                            }
                        } else {
                            if (board[y + j * yAdd][x + j * xAdd][2] === enemy && squareRemoveCheck(x, y, x + j * xAdd, y + j * yAdd, col, board, lastMove, rock))
                                res.push([y + j * yAdd, x + j * xAdd]);
                            break;
                        }
                    }
                } else break;
            }
        }
        return res;
    },
    k: (x, y, params, col, board, lastMove, rock) => {
        let res = [];
        let path = [
            [x + 2, y + 1],
            [x + 2, y - 1],
            [x - 2, y + 1],
            [x - 2, y - 1],
            [x - 1, y + 2],
            [x + 1, y + 2],
            [x - 1, y - 2],
            [x + 1, y - 2],
        ];
        if (params === 0) {
            for (let i = 0; i < 8; i++) {
                if (leaveBOARD(path[i][0], path[i][1])) res.push([path[i][1], path[i][0]]);
            }
        } else if (params === 1) {
            for (let i = 0; i < 8; i++) {
                if (leaveBOARD(path[i][0], path[i][1]) && board[path[i][1]][path[i][0]][2] !== col && squareRemoveCheck(x, y, path[i][0], path[i][1], col, board, lastMove, rock))
                    res.push([path[i][1], path[i][0]]);
            }
        } else {
            for (let i = 0; i < 8; i++) {
                if (leaveBOARD(path[i][0])) res.push([path[i][1], path[i][0]]);
            }
        }

        return res;
    },
    b: (x, y, params, col, board, lastMove, rock) => {
        let enemy = "b";
        if (col === "b") enemy = "w";
        let res = [];
        for (let i = 0; i < 4; i++) {
            let xAdd = 0;
            let yAdd = 0;
            if (i === 0) {
                xAdd = 1;
                yAdd = 1;
            }
            if (i === 1) {
                xAdd = -1;
                yAdd = -1;
            }
            if (i === 2) {
                xAdd = -1;
                yAdd = 1;
            }
            if (i === 3) {
                xAdd = 1;
                yAdd = -1;
            }
            for (let j = 1; j < 8; j++) {
                if (leaveBOARD(y + j * yAdd, x + j * xAdd)) {
                    if (params === 0) {
                        if (board[y + j * yAdd][x + j * xAdd] === "none") res.push([y + j * yAdd, x + j * xAdd]);
                        else {
                            if (board[y + j * yAdd][x + j * xAdd][2] !== "none") {
                                res.push([y + j * yAdd, x + j * xAdd]);
                            }
                            break;
                        }
                    } else if (params === 1) {
                        if (board[y + j * yAdd][x + j * xAdd] === "none") {
                            if (squareRemoveCheck(x, y, x + j * xAdd, y + j * yAdd, col, board, lastMove, rock)) {
                                res.push([y + j * yAdd, x + j * xAdd]);
                            }
                        } else {
                            if (board[y + j * yAdd][x + j * xAdd][2] === enemy && squareRemoveCheck(x, y, x + j * xAdd, y + j * yAdd, col, board, lastMove, rock)) {
                                res.push([y + j * yAdd, x + j * xAdd]);
                            }
                            break;
                        }
                    } else {
                        res.push([y + j * yAdd, x + j * xAdd]);
                    }
                } else break;
            }
        }
        return res;
    },
    q: (x, y, params, col, board, lastMove, rock) => {
        let res = [];
        res = possibleMoves.r(x, y, params, col, board, lastMove, rock).concat(possibleMoves.b(x, y, params, col, board, lastMove, rock));
        return res;
    },
    m: (x, y, params, col, board, lastMove, rock) => {
        let enemy = "b";
        if (col === "b") enemy = "w";
        let res = [];
        let path = [
            [x + 1, y],
            [x + 1, y - 1],
            [x + 1, y + 1],
            [x - 1, y],
            [x - 1, y - 1],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
        ];
        for (let i = 0; i < 8; i++) {
            if (leaveBOARD(path[i][0], path[i][1])) {
                if (params === 2) {
                    res.push([path[i][1], path[i][0]]);
                } else if (params === 1) {
                    if (board[path[i][1]][path[i][0]][2] !== col && params === 1 && squareRemoveCheck(x, y, path[i][0], path[i][1], col, board, lastMove, rock)) {
                        res.push([path[i][1], path[i][0]]);
                    }
                } else {
                    res.push([path[i][1], path[i][0]]);
                }
            }
        }
        let yy = 0;
        if (col === "w") yy = 7;
        if (params === 1 && x === 4 && y === yy && SquareIncheck([yy, 4], recupAllCases(enemy, 0, board, lastMove, rock))) {
            if (
                rock[0] &&
                board[yy][5] === "none" &&
                board[yy][6] === "none" &&
                board[yy][7] === `r_${col}` &&
                SquareIncheck([yy, 5], recupAllCases(enemy, 0, board, lastMove, rock)) &&
                SquareIncheck([yy, 6], recupAllCases(enemy, 0, board, lastMove, rock))
            )
                res.push([y, 6]);
            if (
                rock[1] &&
                board[yy][1] === "none" &&
                board[yy][2] === "none" &&
                board[yy][3] === "none" &&
                board[yy][0] === `r_${col}` &&
                SquareIncheck([yy, 2], recupAllCases(enemy, 0, board, lastMove, rock)) &&
                SquareIncheck([yy, 3], recupAllCases(enemy, 0, board, lastMove, rock))
            )
                res.push([y, 2]);
        }
        return res;
    },
};
