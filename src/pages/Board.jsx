import React, { useEffect, useState } from "react";
import { possibility, verifEndGame } from "../assets/possibility";
import { IAplay } from "../assets/Call";

const Board = () => {
    const [howFinish, sethowFinish] = useState(undefined);
    const [info, setinfo] = useState("");
    const zz = (x) => {
        return document.querySelector(x);
    };
    const [restart, setrestart] = useState(0);
    let yourColor = "w";
    let enemyColor = "b";
    const mouseMove = (e) => {
        zz(".cursor").style.top = e.pageY + "px";
        zz(".cursor").style.left = e.pageX + "px";
    };

    useEffect(() => {
        const colorBoard = ["rgb(190,190,190)", "rgb(106, 0, 193)"]; //  black / white
        //Create Squares
        for (let i = 0; i < 64; i++) {
            let child = document.createElement("div");
            let x = i % 8;
            let y = parseInt(i / 8);
            let colorCase = colorBoard[1];
            if ((x + y) % 2 === 0) {
                colorCase = colorBoard[0];
            }
            child.setAttribute("coord", `${x}${y}`);
            child.setAttribute(
                "style",
                `
            background-color:${colorCase};
        `
            );
            zz(".chessboard").appendChild(child);
        }
        //constantes
        let lastmove = [];
        let coupsScript = [];
        let youCanPlay = true;
        let xStart = -1;
        let yStart = -1;
        let xGlobal = -1;
        let yGlobal = -1;
        let boxes = zz(".chessboard").childNodes;
        let possibil = [];
        let rock = [true, true];
        let rockIA = [true, true];
        let board = [
            ["r_b", "k_b", "b_b", "q_b", "m_b", "b_b", "k_b", "r_b"],
            ["p_b", "p_b", "p_b", "p_b", "p_b", "p_b", "p_b", "p_b"],
            ["none", "none", "none", "none", "none", "none", "none", "none"],
            ["none", "none", "none", "none", "none", "none", "none", "none"],
            ["none", "none", "none", "none", "none", "none", "none", "none"],
            ["none", "none", "none", "none", "none", "none", "none", "none"],
            ["p_w", "p_w", "p_w", "p_w", "p_w", "p_w", "p_w", "p_w"],
            ["r_w", "k_w", "b_w", "q_w", "m_w", "b_w", "k_w", "r_w"],
        ];
        // let board = [
        //     ["none", "none", "none", "none", "none", "none", "m_b", "none"],
        //     ["none", "none", "none", "none", "p_b", "none", "none", "none"],
        //     ["none", "none", "none", "none", "none", "none", "none", "none"],
        //     ["none", "none", "none", "none", "none", "none", "none", "none"],
        //     ["none", "none", "none", "none", "m_w", "none", "none", "none"],
        //     ["none", "none", "none", "none", "none", "none", "none", "none"],
        //     ["none", "none", "none", "none", "none", "none", "none", "none"],
        //     ["none", "none", "none", "none", "none", "none", "none", "none"],
        // ];
        function EndGameFCT(board, coupsScript, enemyColor, lastenmyMove) {
            const resVerif = verifEndGame(board, coupsScript, enemyColor, lastenmyMove);
            if (resVerif === 0) {
                sethowFinish("Echec et mat");
            } else if (resVerif === 1) {
                sethowFinish("Nulle par pat");
            } else if (resVerif === 2) {
                sethowFinish("Nulle par répétition");
            } else {
                setinfo((prev) => `LOADING ...`);
                setTimeout(() => {
                    fctIAplay();
                }, 10);
            }
        }

        const allCasesPromotion = document.querySelectorAll(".imgpromotions");
        for (const element of allCasesPromotion) {
            element.addEventListener("click", promotion);
        }
        function promotion(e) {
            board[yGlobal][xGlobal] = `${e.target.getAttribute("typ")}_${yourColor}`;
            board[yStart][xStart] = "none";
            boxes[yStart * 8 + xStart].classList.add("casePlay");
            boxes[yGlobal * 8 + xGlobal].classList.add("casePlay");
            xStart = -1;
            yStart = -1;
            laodPieces(board);
            youCanPlay = false;

            coupsScript.push([xStart, yStart, xGlobal, yGlobal]);
            const lastenmyMove = lastmove;
            lastmove = [xStart, yStart, xGlobal, yGlobal, e.target.getAttribute("typ")];
            EndGameFCT(board, coupsScript, enemyColor, lastenmyMove);
        }
        const mouseDown = (e) => {
            e.preventDefault();
            xStart = +e.target.getAttribute("coord")[0];
            yStart = +e.target.getAttribute("coord")[1];
            zz(".promotion").style.display = "none";

            if (e.buttons === 1 && board[yStart][xStart] !== "none") {
                zz(".chessboard").style.cursor = "grabbing";
                e.target.style.boxShadow = "inset 0 0  1px 100px rgba(186, 137, 12, 0.383)";
                zz(".cursor").style.display = "block";
                zz(".cursor").style.backgroundImage = e.target.style.backgroundImage;
                boxes.forEach((e) => {
                    e.classList.remove("rightClickOnboard");
                });

                let type = board[yStart][xStart].split("_")[0];
                let color = board[yStart][xStart].split("_")[1];
                let res = possibility(xStart, yStart, type, yourColor, board, 1, lastmove, rock);
                res.forEach((e) => {
                    if (e[2]) {
                        boxes[e[0] * 8 + e[1]].setAttribute("enpassant", e[2]);
                    }
                    possibil.push(boxes[e[0] * 8 + e[1]]);
                });
                if (color !== yourColor) possibil = [];
                possibil.forEach((e) => {
                    let xP = e.getAttribute("coord")[0];
                    let yP = e.getAttribute("coord")[1];
                    if (board[yP][xP] !== "none") e.style.boxShadow = "inset 0 0 1px 5px red";
                    e.classList.add("casepossible");
                });
            }
        };
        const fctIAplay = () => {
            const tempsEnMillisecondes = new Date().getTime();
            const { end, start, type, promotion } = IAplay(board, enemyColor, lastmove, rockIA, rock, yourColor);
            setTimeout(() => {
                zz("#videSon").play();
            }, 10);

            setinfo(`${new Date().getTime() - tempsEnMillisecondes} ms`);
            const typeIA = board[start[0]][start[1]];
            if (type === "p" && start[1] !== end[1] && board[end[0]][end[1]] === "none") board[end[0] - 1][end[1]] = "none";
            if (!promotion) board[end[0]][end[1]] = board[start[0]][start[1]];
            else board[end[0]][end[1]] = promotion;
            board[start[0]][start[1]] = "none";
            if (type === "m" && start[1] === 4 && (end[1] === 6 || end[1] === 2)) {
                if (end[1] === 6) {
                    board[end[0]][5] = board[end[0]][7];
                    board[end[0]][7] = "none";
                } else {
                    board[end[0]][3] = board[end[0]][0];
                    board[end[0]][0] = "none";
                }
                rockIA = [false, false];
            }
            if (type === "r" && start[1] === 0) {
                rockIA[0] = false;
            }
            if (type === "r" && start[1] === 7) {
                rockIA[1] = false;
            }
            laodPieces(board);
            boxes.forEach((e) => {
                e.style.boxShadow = "";
                e.classList.remove("casePlay");
            });
            zz(".promotion").style.display = "none";
            boxes[end[0] * 8 + end[1]].classList.add("casePlay");
            boxes[start[0] * 8 + start[1]].classList.add("casePlay");
            youCanPlay = true;
            lastmove = [start[1], start[0], end[1], end[0], typeIA[0]];
            coupsScript.push([start[1], start[0], end[1], end[0]]);
            const resVerif = verifEndGame(board, coupsScript, yourColor, lastmove);
            if (resVerif === 0) {
                sethowFinish("Echec et mat");
            } else if (resVerif === 1) {
                sethowFinish("Nulle par pat");
            } else if (resVerif === 2) {
                sethowFinish("Nulle par répétition");
            }
        };

        const mouseUp = (e) => {
            if (e.button === 0 && e.target.getAttribute("coord") !== null && xStart !== -1) {
                let x = +e.target.getAttribute("coord")[0];
                let y = +e.target.getAttribute("coord")[1];
                let [type, color] = board[yStart][xStart].split("_");

                let notPromotion = true;
                let canPromote = false;
                possibil.forEach((e) => {
                    if (e === boxes[y * 8 + x]) {
                        canPromote = true;
                    }
                });
                if ((y === 0 || y === 7) && type === "p" && canPromote && youCanPlay) {
                    notPromotion = false;
                    zz(".promotion").style.display = "block";
                    zz(".promotion").style.left = `${x * 100}px`;
                    xGlobal = x;
                    yGlobal = y;
                }
                boxes.forEach((e) => {
                    e.style.boxShadow = "";
                    e.classList.remove("casepossible");
                });
                possibil.forEach((cas) => {
                    if (cas === e.target && youCanPlay && notPromotion) {
                        boxes.forEach((e) => {
                            e.classList.remove("casePlayE");
                        });
                        const lastenmyMove = lastmove;
                        lastmove = [xStart, yStart, x, y, type];
                        if (type === "m" && xStart === 4 && (x === 6 || x === 2)) {
                            if (x === 6) {
                                board[y][7] = "none";
                                board[y][5] = `r_${yourColor}`;
                            } else {
                                board[y][0] = "none";
                                board[y][3] = `r_${yourColor}`;
                            }
                            rock[0] = false;
                            rock[1] = false;
                        }
                        if (type === "m") rock = [false, false];
                        if (type === "r" && xStart === 0) {
                            rock[1] = false;
                        }
                        if (type === "r" && xStart === 7) {
                            rock[0] = false;
                        }
                        if (boxes[y * 8 + x].getAttribute("enpassant")) {
                            board[+boxes[y * 8 + x].getAttribute("enpassant")[2]][+boxes[y * 8 + x].getAttribute("enpassant")[0]] = "none";
                            boxes[y * 8 + x].removeAttribute("enpassant");
                        }
                        board[y][x] = board[yStart][xStart];
                        board[yStart][xStart] = "none";
                        boxes.forEach((e) => {
                            e.style.boxShadow = "";
                            e.classList.remove("casePlay");
                        });
                        boxes[yStart * 8 + xStart].classList.add("casePlay");
                        boxes[y * 8 + x].classList.add("casePlay");
                        zz("#videSon").play();
                        xStart = -1;
                        yStart = -1;
                        laodPieces(board);
                        youCanPlay = false;
                        coupsScript.push([xStart, yStart, x, y]);
                        EndGameFCT(board, coupsScript, enemyColor, lastenmyMove);
                    }
                });
                zz(".cursor").style.display = "none";
                zz(".chessboard").style.cursor = "grab";
            }
            possibil = [];
        };

        const laodPieces = () => {
            boxes.forEach((element) => {
                let url = board[element.getAttribute("coord")[1]][element.getAttribute("coord")[0]];
                element.style.backgroundImage = `url('../pieces/${url}.png')`;
            });
        };
        laodPieces();

        const domBoard = zz(".chessboard");
        window.addEventListener("mouseup", mouseUp);
        domBoard.addEventListener("mousedown", mouseDown);
        domBoard.addEventListener("mousemove", mouseMove);
        return () => {
            while (domBoard.firstChild) {
                domBoard.removeChild(domBoard.firstChild);
            }
            window.removeEventListener("mouseup", mouseUp);
            domBoard.removeEventListener("mousedown", mouseDown);
            domBoard.removeEventListener("mousemove", mouseMove);
            for (const element of allCasesPromotion) {
                element.removeEventListener("click", promotion);
            }
        };
    }, [restart]);
    return (
        <>
            <div className="contentBoard">
                <div className="menu">
                    <h3>{info}</h3>
                    <button
                        onClick={() => {
                            setrestart((prev) => prev + 1);
                            sethowFinish(undefined);
                        }}
                    >
                        RESTART
                    </button>
                </div>
                <div className="mid">
                    <div className="chessboard"></div>
                    <div className="promotion">
                        <img className="imgpromotions" typ="q" src={`../pieces/q_${yourColor}.png`} alt="queen" />
                        <img className="imgpromotions" typ="r" src={`../pieces/r_${yourColor}.png`} alt="rock" />
                        <img className="imgpromotions" typ="k" src={`../pieces/k_${yourColor}.png`} alt="knight" />
                        <img className="imgpromotions" typ="b" src={`../pieces/b_${yourColor}.png`} alt="bishop" />
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

export default Board;
