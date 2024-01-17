import React, { useEffect, useState } from "react";
import { BoardCLASS } from "./assets/Board";
import "./assets/Search"
import "./assets/EvalBoard"
import "./assets/SearchAfter"
import "./assets/Start"
import "./assets/AttackByPiece"
import { isPawn } from "./assets/Const";

const App = () => {
    const [howFinish, sethowFinish] = useState(undefined);
    const [info, setinfo] = useState("");
    const zz = (x) => {
        return document.querySelector(x);
    };

    const empty = 0b0000;
    const pawn_black = 0b0001;
    const pawn_white = 0b0010;
    const knight_black = 0b0011;
    const knight_white = 0b0100;
    const bishop_black = 0b0101;
    const bishop_white = 0b0110;
    const rock_black = 0b0111;
    const rock_white = 0b1000;
    const queen_black = 0b1001;
    const queen_white = 0b1010;
    const king_black = 0b1011;
    const king_white = 0b1100;

    const [Color, setColor] = useState(0);

    useEffect(() => {
        sethowFinish('')
        const colorBoard = ["rgb(221, 201, 176)", "rgb(127, 89, 0)"]; //  black / white
        for (let i = 0; i < 64; i++) {
            let child = document.createElement("div");
            let x = i % 8;
            let y = parseInt(i / 8);
            let colorCase = colorBoard[1];
            if ((x + y) % 2 === 0) {
                colorCase = colorBoard[0];
            }
            child.setAttribute("coord", `${x}${y}`);
            child.setAttribute("index", `${i}`);
            child.setAttribute(
                "style",
                `
            background-color:${colorCase};
        `
            );
            zz(".chessboard").appendChild(child);
        }
        const mouseMove = (e) => {
            zz(".cursor").style.top = e.pageY + "px";
            zz(".cursor").style.left = e.pageX + "px";
        };
        let youCanPlay = true;
        let indexStart = -1;
        let indexEnd = -1;
        let boxes = zz(".chessboard").childNodes;
        let moves = [];
    // Original Board
    



    //Probleme big Mistake
    // [
    //     empty,empty,queen_white,empty,empty,empty,empty,empty,
    //     empty,empty,empty,empty,empty,pawn_black,king_black,empty,
    //     pawn_black,empty,empty,empty,empty,empty,empty,pawn_black,
    //     empty,empty,pawn_black,empty,queen_black,empty,pawn_black,empty,
    //     empty,empty,pawn_white,empty,empty,empty,pawn_white,empty,
    //     empty,pawn_white,empty,pawn_black,empty,empty,empty,pawn_white,
    //     pawn_white,empty,empty,bishop_white,rock_black,pawn_white,empty,empty,
    //     empty,empty,empty,rock_white,empty,empty,king_white,empty,
    // ]
    
    
        const Board = new BoardCLASS([
            rock_black,knight_black,bishop_black,queen_black,king_black,bishop_black,knight_black,rock_black,
            pawn_black,pawn_black,pawn_black,pawn_black,pawn_black,pawn_black,pawn_black,pawn_black,
            empty,empty,empty,empty,empty,empty,empty,empty,
            empty,empty,empty,empty,empty,empty,empty,empty,
            empty,empty,empty,empty,empty,empty,empty,empty,
            empty,empty,empty,empty,empty,empty,empty,empty,
            pawn_white,pawn_white,pawn_white,pawn_white,pawn_white,pawn_white,pawn_white,pawn_white,
            rock_white,knight_white,bishop_white,queen_white,king_white,bishop_white,knight_white,rock_white,
        ]);
        if (Color) {
            zz(".chessboard").style.rotate = "180deg";
            for (const sqare of boxes) sqare.style.rotate = "180deg";
            setTimeout(() => {
                BotToPlay((Color + 1) % 2);
            }, 1000);
        } else zz(".chessboard").style.rotate = "0deg";
        function BotToPlay(color) {
            zz("#videSon").play()
            const response = Board.GameFinish((Color + 1) % 2)
            sethowFinish(response);
            youCanPlay = false;
            if (!response) {
                setTimeout(() => {
                let depth = 3;
                let t = Date.now();
                let move = undefined;
                while (Date.now() < t + 500) {
                    move = Board.Start(color, depth);
                    setinfo(`depth = ${depth + 1} in ${Date.now() - t} ms`);
                    depth++;
                }
                boxes.forEach((e) => {
                    e.classList.remove("casePlay");
                });
                if (move) {
                    const [i, ind, p] = move;
                    boxes[i].classList.add("casePlay");
                    boxes[ind].classList.add("casePlay");
                    Board.makeMove(i, ind, p);
                    youCanPlay = true;
                    
                    laodPieces();
                    // BotToPlay((color + 1) % 2)
                }
                setTimeout(() => {
                    zz("#videSon").play();
                }, 10);
                sethowFinish(Board.GameFinish(Color));
            }, 50);
            }
            
        }
        const mouseDown = (e) => {
            e.preventDefault();
            indexStart = +e.target.getAttribute("index");
            if (e.buttons === 1 && Board.board[indexStart]) {
                zz(".chessboard").style.cursor = "grabbing";
                e.target.style.boxShadow = "inset 0 0  1px 100px rgba(186, 137, 12, 0.383)";
                zz(".cursor").style.display = "block";
                zz(".cursor").style.backgroundImage = e.target.style.backgroundImage;
                boxes.forEach((e) => {
                    e.classList.remove("rightClickOnboard");
                });
                moves = Board.LegalMove(indexStart);
                // if (color !== yourColor) moves = [];
                for (const i of moves) boxes[i].classList.add("casepossible");
            }
        };
        const mouseUp = (e) => {
            if (e.button === 0 && e.target.getAttribute("index") !== null && indexStart !== -1) {
                indexEnd = +e.target.getAttribute("index");
                boxes.forEach((e) => {
                    e.classList.remove("casepossible");
                    e.style.boxShadow = "";
                });
                for (const i of moves) {
                    if (i === indexEnd && youCanPlay) {
                        if ((parseInt(i / 8) === 0 || parseInt(i / 8) === 7) && isPawn(Board.board[indexStart])) {
                            zz(".promotion").style.display = "block";
                            zz(".promotion").style.left = `calc(((100%) / 8)*${i % 8})`;
                        } else {
                            boxes.forEach((e) => {
                                e.classList.remove("casePlay");
                            });
                            boxes[i].classList.add("casePlay");
                            boxes[indexStart].classList.add("casePlay");
                            Board.makeMove(indexStart, i);
                            BotToPlay((Color + 1) % 2);
                        }
                    }
                }
                laodPieces();
                zz(".cursor").style.display = "none";
                zz(".chessboard").style.cursor = "grab";
            }
            moves = [];
        };
        function laodPieces() {
            for (const boxe of boxes)
                boxe.style.backgroundImage = `url('../pieces/${Board.board[+boxe.getAttribute("index")]}.png')`;
        }
        laodPieces();
        function Promotion(event) {
            zz(".promotion").style.display = "none";
            Board.makeMove(indexStart, indexEnd, +event.target.getAttribute("typ") - Color);
            laodPieces();
            BotToPlay((Color + 1) % 2);
        }
        const domImgPro = document.querySelectorAll(".imgpromotions");
        const domBoard = zz(".chessboard");
        window.addEventListener("mouseup", mouseUp);
        domBoard.addEventListener("mousedown", mouseDown);
        domBoard.addEventListener("mousemove", mouseMove);
        for (const p of domImgPro) p.addEventListener("click", Promotion);
        return () => {
            while (domBoard.firstChild) domBoard.removeChild(domBoard.firstChild);
            for (const p of domImgPro) p.removeEventListener("click", Promotion);
            window.removeEventListener("mouseup", mouseUp);
            domBoard.removeEventListener("mousedown", mouseDown);
            domBoard.removeEventListener("mousemove", mouseMove);
        };
    }, [Color]);
    return (
        <>
            <div className="contentBoard">
                <div className="menu">
                    <h3>{info}</h3>
                    <button
                        onClick={() => {
                            setColor((prev) => +!prev);
                        }}
                    >
                        ABANDONNER
                    </button>
                </div>
                <div className="mid">
                    <div className="chessboard"></div>
                    <div className="promotion">
                        <img className="imgpromotions" typ="10" src={`../pieces/${10 - Color}.png`} alt="queen" />
                        <img className="imgpromotions" typ="8" src={`../pieces/${8 - Color}.png`} alt="rock" />
                        <img className="imgpromotions" typ="4" src={`../pieces/${4 - Color}.png`} alt="knight" />
                        <img className="imgpromotions" typ="6" src={`../pieces/${6 - Color}.png`} alt="bishop" />
                    </div>
                    <div className="animation" style={howFinish ? { display: "block" } : { display: "none" }}>
                        <h1>{howFinish}</h1>
                    </div>
                </div>
            </div>

            <div className="cursor"></div>
        </>
    );
};

export default App;
