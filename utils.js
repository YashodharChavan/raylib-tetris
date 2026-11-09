function getWindowWidth(config, grid) {
    const padding = config.padding;
    const gap = config.gap;

    return 3 * padding + grid.cols * (1.5 * grid.cellSize + gap);
}

function getWindowHeight(config, grid) {
    const padding = config.padding;
    const gap = config.gap;

    return 2 * padding + grid.rows * (grid.cellSize + gap);
}

function initializeGameBoard(grid) {
    const gameBoard =[]

    for(let i =0; i<grid.rows; i++) {
        const gameBoardRow = []
        for(let j =0; j<grid.cols; j++) {
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