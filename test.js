let bitmap = [[0, 0, 0], [1, 1, 1], [0, 0, 1]]
const { selectTetrisPiece } = require("./pieces")

function rotateLeft(bitmap) {
    const rotated = [];

    for (let row = 0; row < 3; row++) {
        const rotatedRow = []
        for (let col = 0; col < 3; col++) {
            rotatedRow[col] = bitmap[2 - col][row]
        }
        rotated.push(rotatedRow)
    }

    return rotated;
}

function rotateRight(bitmap) {
    const rotated = []

    for (let row = 0; row < 3; row++) {
        const rotatedRow = []
        for (let col = 0; col < 3; col++) {
            rotatedRow[col] = bitmap[col][2 - row]
        }
        rotated.push(rotatedRow)
    }

    return rotated;
}

function createArray(row, col) {
    const array = [];

    for (let i = 0; i < row; i++) {
        const row = []
        for (let j = 0; j < col; j++) {
            row.push(0)
        }
        array.push(row);
    }

    return array;
}

const cols = 6;
const rows = 5
const gameBoard = createArray(rows, cols);
gameBoard[4][1] = 1
const pieceCenter = {
    x: 2,
    y: 2
}
const selectedPiece = selectTetrisPiece();

function insertPieceInGrid(gameBoard, selectedPiece) {
    const startCol = pieceCenter.x - 1;
    const startRow = pieceCenter.y - 1;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard[startRow + i][startCol + j] = selectedPiece[i][j]
        }
    }
}

insertPieceInGrid(gameBoard, selectedPiece)

function updateGameBoard(gameBoard) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    // for (let y = rows - 2; y >= 0; y--) {
    //     for (let x = 0; x < cols; x++) {
    //         if (gameBoard[y][x] && !gameBoard[y + 1][x]) {
    //             gameBoard[y][x] = 0;
    //             gameBoard[y + 1][x] = 1;
    //         }
    //     }
    // }

    pieceCenter.x++
}

// updateGameBoard(gameBoard)
// console.log("Update 1")
// console.table(gameBoard)
// updateGameBoard(gameBoard)
// console.log("Update 2")
// console.table(gameBoard)
// updateGameBoard(gameBoard)
// console.log("Update 3")



function canPieceMoveDown(gameBoard, pieceCenter) {
    let canMoveDown = {
        canMove: true,
        blockedColumns: [false, false, false]
    };

    if (pieceCenter.y + 2 >= gameBoard.length) return canMoveDown;

    const startRow = pieceCenter.y + 1;
    const startCol = pieceCenter.x - 1;

    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            if(canMoveDown.blockedColumns[j]) continue;

            
        }
    }

    return canMoveDown
}

console.table(gameBoard)
// console.log(canPieceMoveDown(gameBoard, pieceCenter))

