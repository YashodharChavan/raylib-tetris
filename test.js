let bitmap = [[0, 0, 0], [1, 1, 1], [0, 0, 1]]
const {getRandomPiece} = require("./pieces")

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

    for(let i =0; i<row; i++) {
        const row = []
        for(let j =0; j<col; j++) {
            row.push(0)
        }
        array.push(row);
    }

    return array;
}

const cols = 6;
const rows = 5
const grid = createArray(rows, cols);

const selectedPiece = getRandomPiece();

function insertPieceInGrid(grid, selectedPiece) {
    const startCol = Math.floor(cols / 2) - 1;

    for(let i=0; i<3; i++) {
        for(let j=0;j<3; j++) {
            grid[i][startCol + j] = selectedPiece[i][j]
        }
    }
}

insertPieceInGrid(grid, selectedPiece)
console.table(grid)