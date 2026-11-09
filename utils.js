function getWindowWidth(config, grid) {
    const { padding, gap, previewCellScale } = config;
    const { cols, cellSize } = grid

    return 3 * padding + cols * (cellSize + gap) + previewCellScale * cellSize * 3;
}

function getWindowHeight(config, grid) {
    const { padding, gap } = config;
    const {rows, cellSize} = grid;

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

module.exports = {
    getWindowWidth,
    getWindowHeight,
    initializeGameBoard
}