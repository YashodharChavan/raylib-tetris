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


    for (let col = 0; col < 3; col++) {
        for (let row = 0; row < 3; row++) {
            if (currPiece[row][col]) lowestCellRows[col] = row;
        }
    }

    return lowestCellRows;
}

function canPieceMoveDown(gameBoard, config) {
    const { pieceCenter } = config;

    if (pieceCenter.y + 2 >= gameBoard.length) return false;

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

module.exports = {
    getWindowWidth,
    getWindowHeight,
    initializeGameBoard,
    initializePieceCenter,
    canPieceMoveDown,
    rotateRight,
}