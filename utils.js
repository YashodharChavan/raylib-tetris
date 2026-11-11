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

module.exports = {
    getWindowWidth,
    getWindowHeight,
    initializeGameBoard,
    initializePieceCenter
}