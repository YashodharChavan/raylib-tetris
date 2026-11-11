function getWindowWidth(config, grid) {
    const { padding, gap, previewCellScale, cellSize } = config;
    const { cols } = grid

    return 3 * padding + cols * (cellSize + gap) + previewCellScale * cellSize * 3;
}

function getWindowHeight(config, grid) {
    const { padding, gap, cellSize } = config;
    const { rows } = grid;

    return 2 * padding + rows * (cellSize + gap);
}

function initializeGameBoard(grid) {
    const gameBoard = []

    for (let i = 0; i < grid.rows; i++) {
        const gameBoardRow = []
        for (let j = 0; j < grid.cols; j++) {
            gameBoardRow.push(0);
        }
        gameBoard.push(gameBoardRow);
    }

    return gameBoard;
}

function initializePieceCenter(grid) {
    return {
        x: Math.floor(grid.cols / 2),
        y: 1
    }
}

function getLowestOccupiedCellRows(config) {
    const { currPiece } = config;
    const lowestCellRows = [-1, -1, -1];

    const pieceRows = currPiece.length;
    const pieceCols = currPiece[0].length;

    for (let col = 0; col < pieceCols; col++) {
        for (let row = 0; row < pieceRows; row++) {
            if (currPiece[row][col]) lowestCellRows[col] = row;
        }
    }

    return lowestCellRows;
}

function canPieceMoveDown(gameBoard, config) {
    const { pieceCenter, currPiece } = config;
    const pieceRows = currPiece.length;

    if (pieceCenter.y + pieceRows > gameBoard.length) return false;

    const startCol = pieceCenter.x - 1;
    const startRow = pieceCenter.y - 1;
    const lowestCellRows = getLowestOccupiedCellRows(config);

    for (let idx = 0; idx < 3; idx++) {
        const targetRow = startRow + lowestCellRows[idx] + 1;
        const targetCol = startCol + idx;

        if (lowestCellRows[idx] !== -1 && gameBoard[targetRow][targetCol]) {
            return false
        }
    }

    return true;
}


function rotateRight(bitmap) {
    const rows = bitmap.length;
    const cols = bitmap[0].length;

    const rotated = [];

    for (let row = 0; row < cols; row++) {
        const rotatedRow = [];

        for (let col = 0; col < rows; col++) {
            rotatedRow[col] = bitmap[rows - 1 - col][row];
        }

        rotated.push(rotatedRow);
    }

    return rotated;
}

module.exports = {
    getWindowWidth,
    getWindowHeight,
    initializeGameBoard,
    initializePieceCenter,
    canPieceMoveDown,
    rotateRight,
}