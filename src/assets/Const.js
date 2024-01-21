export function knightSquares(i) {
    const x = i % 8;
    const y = parseInt(i / 8);
    let r = [];
    if (y > 1) {
        if (x !== 0) r.push(i - 17);
        if (x !== 7) r.push(i - 15);
    }
    if (y < 6) {
        if (x !== 0) r.push(i + 15);
        if (x !== 7) r.push(i + 17);
    }
    if (x > 1) {
        if (y !== 0) r.push(i - 10);
        if (y !== 7) r.push(i + 6);
    }
    if (x < 6) {
        if (y !== 0) r.push(i - 6);
        if (y !== 7) r.push(i + 10);
    }
    return r;
}
export function kingSquares(i) {
    const x = i % 8;
    const y = parseInt(i / 8);
    let r = [];
    if (y !== 0) {
        r.push(i - 8);
        if (x !== 0) r.push(i - 9);
        if (x !== 7) r.push(i - 7);
    }
    if (y !== 7) {
        r.push(i + 8);
        if (x !== 0) r.push(i + 7);
        if (x !== 7) r.push(i + 9);
    }
    if (x !== 0) r.push(i - 1);
    if (x !== 7) r.push(i + 1);
    return r;
}
export const pieceOrders = [0, 100, 100, 300, 300, 320, 320, 500, 500, 900, 900, 0, 0];
export const pieV = [100, 300, 320, 500, 900, 0];
export const posV = [
    [
        [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 10, 10, 0, 0, 0, 
            0, 1, 2, 9, 9, 2, 1, 0, 
            0, 1, 2, 7, 7, 2, 1, 0, 
            0, 1, 2, 4, 4, 2, 1, 0, 
            0, -1, 0, -3, -3, 0, -1, 0, 
            0, 0, 0, 0, 0, 0, 0, 0,
        ],
        [
            90, 90, 90, 90, 90, 90, 90, 90, 
            70, 70, 70, 70, 70, 70, 70, 70, 
            30, 30, 30, 30, 30, 30, 30, 30, 
            15, 15, 15, 15, 15, 15, 15, 15, 
            10, 10, 10, 10, 10, 10, 10, 10, 
            2, 2, 2, 2, 2, 2, 2, 2, 
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
        ],
    ],
    [
        [
            -5, -5, -5, -5, -5, -5, -5, -5, 
            -5, 0, 0, 0, 0, 0, 0, -5, 
            -5, 0, 5, 5, 5, 5, 0, -5, 
            -5, 0, 5, 10, 10, 5, 0, -5,
            -5, 0, 5, 10, 10, 5, 0, -5, 
            -5, 0, 5, 5, 5, 5, 0, -5, 
            -5, 0, 0, 0, 0, 0, 0, -5, 
            -5, -5, -5, -5, -5, -5, -5, -5,
        ],
        [
            -5, -5, -5, -5, -5, -5, -5, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 10, 10, 10, 10, 0, -5, -5, 0, 10, 10, 10, 10, 0, -5,
            -5, 0, 10, 10, 10, 10, 0, -5, -5, 0, 10, 10, 10, 10, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, -5, -5, -5, -5, -5, -5, -5,
        ],
    ],
    [
        [
            3, 2, 0, 0, 0, 0, 2, 3, 
            2, 3, 2, 0, 0, 2, 3, 2, 
            0, 2, 3, 2, 2, 3, 2, 0, 
            0, 3, 2, 3, 3, 2, 3, 0, 
            3, 0, 3, 3, 3, 3, 2, 3, 
            0, 3, 3, -5, -5, 3, 3, 0, 
            2, 3, 0, -5, -5, 0, 3, 2, 
            -5, -5, -5, -5, -5, -5, -5, -5,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0,
        ],
    ],
    [
        [
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0, 0, 0, 0, 
            2, 0, 0, 4, 0, 4, 0, 2,
        ],
        [
            0, 1, 2, 3, 3, 2, 1, 0,
            0, 1, 2, 3, 3, 2, 1, 0,
            0, 1, 2, 3, 3, 2, 1, 0,
            0, 1, 2, 3, 3, 2, 1, 0,
            0, 1, 2, 3, 3, 2, 1, 0,
            0, 1, 2, 3, 3, 2, 1, 0,
            0, 1, 2, 3, 3, 2, 1, 0,
            0, 1, 2, 3, 3, 2, 1, 0,
        ],
    ],
    [
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -4, -4, -4, 0, 0, -4, -4, -4, -4, -4, -4, -4, -4,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
    ],
    [
        [
            -400, -400, -400, -400, -400, -400, -400, -400, -200, -200, -200, -200, -200, -200, -200, -200, -90, -90, -90, -90,
            -90, -90, -90, -90, -80, -80, -80, -80, -80, -80, -80, -80, -60, -60, -60, -60, -60, -60, -60, -60, -55, -55, -55,
            -55, -55, -55, -55, -55, -5, -5, -5, -50, -50, -50, -5, -5, -5, 11, 8, -50, 0, -50, 8, 8,
        ],
        [
            -10, -9, -8, -7, -7, -8, -9, -10,
            -9, -7, -6, -5, -5, -6, -7, -9,
            -8, -6, -4, -3, -3, -4, -6, -8,
            -7, -5, -3,-0  ,-0  , -3, -5, -7,
            -7, -5, -3,-0  ,-0  , -3, -5, -7,
            -8, -6, -4, -3, -3, -4, -6, -8,
            -9, -7, -6, -5, -5, -6, -7, -9,
            -10, -9, -8, -7, -7, -8, -9, -10,
       ],
    ],
];
export const kingCenter = [
     10, 9, 8, 7, 7, 8, 9, 10,
     9, 7, 6, 5, 5, 6, 7, 9,
     8, 6, 4, 3, 3, 4, 6, 8,
     7, 5, 3,0  ,0  , 3, 5, 7,
     7, 5, 3,0  ,0  , 3, 5, 7,
     8, 6, 4, 3, 3, 4, 6, 8,
     9, 7, 6, 5, 5, 6, 7, 9,
     10, 9, 8, 7, 7, 8, 9, 10,
]
export const Promotion = [10, 4, 8, 6]
export const OrderPromotion = [0,450,250,250]

export function isPawn(t) {
    return t === 1 || t === 2;
}
export function isKnight(t) {
    return t === 4 || t === 3;
}
export function isBishop(t) {
    return t === 6 || t === 5;
}
export function isRock(t) {
    return t === 8 || t === 7;
}
export function isQueen(t) {
    return t === 10 || t === 9;
}
export function isKing(t) {
    return t === 11 || t === 12;
}
export function Max(x, y) {
    if (x > y) return x;
    return y;
}
export function Min(x, y) {
    if (x < y) return x;
    return y;
}
export function Abs(x) {
    return (x ** 2) ** 0.5;
}
export function Distance(a, b) {
    return (((a % 8) - (b % 8)) ** 2 + (parseInt(a / 8) - parseInt(b / 8)) ** 2) ** 0.5;
}
export function triFusion(array) {
    if (array.length < 2) return array;
    const milieu = Math.floor(array.length / 2);
    return fusionner(triFusion(array.slice(0, milieu)), triFusion(array.slice(milieu)));
}
function fusionner(mg, md) {
    let resultat = [];
    let ig = 0;
    let id = 0;
    // Fusionner les moitiés en ordre croissant
    while (ig < mg.length && id < md.length) {
        if (mg[ig].v > md[id].v) {
            resultat.push(mg[ig]);
            ig++;
        } else {
            resultat.push(md[id]);
            id++;
        }
    }
    for (let i = ig; i < mg.length; i++) resultat.push(mg[i]);
    for (let i = id; i < md.length; i++) resultat.push(md[i]);
    return resultat;
}

export function Best(array) {
    if (array.length < 2) return array;
    const milieu = Math.floor(array.length / 2);
    return oth(Best(array.slice(0, milieu)), Best(array.slice(milieu)));
}

function oth (mg, md) {
    let resultat = [];
    let ig = 0;
    let id = 0;
    // Fusionner les moitiés en ordre croissant
    while (ig < mg.length && id < md.length) {
        if (mg[ig][1] > md[id][1]) {
            resultat.push(mg[ig]);
            ig++;
        } else {
            resultat.push(md[id]);
            id++;
        }
    }
    for (let i = ig; i < mg.length; i++) resultat.push(mg[i]);
    for (let i = id; i < md.length; i++) resultat.push(md[i]);
    return resultat;
}

