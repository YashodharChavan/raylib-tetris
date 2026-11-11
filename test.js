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

gameBoard[4][0] = 1
gameBoard[4][1] = 1
gameBoard[4][2] = 1
gameBoard[4][3] = 1
gameBoard[4][4] = 1
gameBoard[4][5] = 1

const pieceCenter = {
    x: 2,
    y: 2
}
const selectedPiece = selectTetrisPiece();

function insertPieceInGrid(gameBoard, selectedPiece) {
    const startCol = pieceCenter.x - 1;
    const startRow = pieceCenter.y - 1;

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard[startRow + i][startCol + j] = selectedPiece[i][j]
        }
    }
}

// insertPieceInGrid(gameBoard, selectedPiece)

function canPieceMoveDown(gameBoard, pieceCenter) {
    const lastHighRow = [-1, -1, -1];

    const startCol = pieceCenter.x - 1;
    const startRow = pieceCenter.y - 1;

    let canPieceMove = true;

    for (let col = 0; col < 3; col++) {
        for (let row = 0; row < 3; row++) {
            if (selectedPiece[row][col]) lastHighRow[col] = row;
        }
    }   

    for(let i=0; i<3; i++) {
        if(gameBoard[startRow + lastHighRow[i]+1][startCol + i]) {
            canPieceMove = false
        }
    }

    console.log(lastHighRow)

    return canPieceMove;
}

function resetGameBoardRow(row) {
    const cols = gameBoard[0].length;

    for(let i=0; i<cols; i++) {
        gameBoard[row][i] = 0;
    }
}

function shouldClearRow(row) {
    const cols = gameBoard[0].length;

    for(let i=0; i<cols; i++) {
        if(!gameBoard[row][i]) return false;
    }

    return true;
}


console.table(gameBoard)
resetGameBoardRow(1)
// console.table(gameBoard)
console.log(shouldClearRow(4))

