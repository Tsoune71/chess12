import { BoardCLASS } from "../Board";
import { OrderPromotion, Promotion, isPawn, pieceOrders, posV, triFusion } from "../Const";

BoardCLASS.prototype.GeneratorMove = function (color) {
    let r = [];
        for (let i = 0; i < 64; i++) {
            const p = this.board[i];
            if (p && p % 2 === color)
                for (const ind of this.LegalMove(i)) {
                    const type = this.board[ind];
                    if (isPawn(p) && (ind < 8 || ind > 55)) {
                        this.MakeMove({ i, ind, p: 10 - color, deleted: this.board[ind] });
                        const lengthEnemyMove = this.GeneratorMove(+!color).length;
                        const isCheck = this.isSquareInCheck(this.coordKings[+!color], +!color)
                        this.UnMakeMove()
                        if (lengthEnemyMove || isCheck) r.push({ i, ind, p: 10 - color, deleted: type, v: 800 });
                        else for (let a = 0 ; a < 4 ; a++) r.push({ i, ind, p: Promotion[a] - color, deleted: type, v: OrderPromotion[a] });
                    }
                    else {
                        let t = ind;
                        let t2 = i;
                        if (color) {
                            t = (7 - parseInt(ind / 8)) * 8 + (ind % 8);
                            t2 = (7 - parseInt(i / 8)) * 8 + (i % 8);
                        }
                        r.push({
                            i,
                            ind,
                            p: undefined,
                            deleted: type,
                            v:
                                pieceOrders[type] +
                                posV[parseInt((p - 1) / 2)][this.gameValue][t] -
                                posV[parseInt((p - 1) / 2)][this.gameValue][t2],
                        });
                    }
                }
        }
        return triFusion(r);
}