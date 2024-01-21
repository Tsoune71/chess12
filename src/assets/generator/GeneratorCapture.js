import { BoardCLASS } from "../Board";
import { OrderPromotion, Promotion, isPawn, pieceOrders, triFusion } from "../Const";

BoardCLASS.prototype.GeneratorCapture = function (color) {
    let r = [];
    for (let i = 0; i < 64; i++) {
        const p = this.board[i];
        if (p && p % 2 === color) {
            for (const ind of this.CaptureMove(i)) {
                const type = this.board[ind];
                //Manage Promotion
                if (isPawn(p) && (ind < 8 || ind > 55)) {
                    this.MakeMove({ i, ind, p: 10 - color, deleted: this.board[ind] });
                    const lengthEnemyMove = this.GeneratorMove(+!color).length;
                    const isCheck = this.isSquareInCheck(this.coordKings[+!color], +!color)
                    this.UnMakeMove()
                    if (lengthEnemyMove || isCheck) r.push({ i, ind, p: 10 - color, deleted: type, v: 800 });
                    else for (let a = 0 ; a < 4 ; a++) r.push({ i, ind, p: Promotion[a] - color, deleted: type, v: OrderPromotion[a] });
                }
                //other Capture
                else r.push({ i, ind, p: undefined, deleted: type, v: pieceOrders[type] });
            }
        }
    }
    return triFusion(r);
};
