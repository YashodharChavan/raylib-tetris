const r = require("raylib");
const u = require("./utils")

const { selectTetrisPiece } = require("./pieces")

function setup() {
    const world = {
        screen: {
            FPS: 10
        },
        grid: {
            rows: 30,
            cols: 6,
            cellSize: 20,
        },
        config: {
            padding: 10,
            gap: 1,
            palette: {
                0: r.WHITE,
                1: r.RED
            },
            nextPiece: selectTetrisPiece(),
            previewCellScale: 1.5,
            shouldStop: false,
        }
    };

    world.screen.width = u.getWindowWidth(world.config, world.grid);
    world.screen.height = u.getWindowHeight(world.config, world.grid);

    world.gameBoard = u.initializeGameBoard(world.grid);
    world.config.pieceCenter = u.initializePieceCenter(world.grid);

    console.log(world.config.pieceCenter);


    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.screen.width, world.screen.height, "TETRIS");
    r.SetTargetFPS(world.screen.FPS);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function drawGrid(gameBoard, grid, config) {
    const { padding, gap, palette } = config;
    const { rows, cols, cellSize } = grid;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const posX = padding + x * cellSize + gap * x;
            const posY = padding + y * cellSize + gap * y;
            const color = palette[gameBoard[y][x]];

            r.DrawRectangle(posX, posY, cellSize, cellSize, color);
        }
    }
}

function drawNextPieceGrid(grid, config) {
    const { nextPiece, padding, palette, previewCellScale, gap } = config;
    const { cols, cellSize } = grid;
    const scaledSize = previewCellScale * cellSize;
    const startX = 2 * padding + cols * cellSize + gap * cols;
    const startY = padding;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const posX = startX + j * scaledSize;
            const posY = startY + i * scaledSize;
            const color = palette[nextPiece[i][j]];

            r.DrawRectangle(posX, posY, scaledSize, scaledSize, color);
        }
    }
}

function draw(world) {
    const { gameBoard, grid, config } = world;
    r.BeginDrawing();

    drawGrid(gameBoard, grid, config)
    drawNextPieceGrid(world.grid, world.config)

    r.EndDrawing();
}

function canPieceMoveDown(gameBoard, config) {
    const { pieceCenter } = config;
    let canMoveDown = true;

    if (pieceCenter.y + 2 >= gameBoard.length) return false

    for (let i = 0; i < 3; i++) {
        if (gameBoard[pieceCenter.y + 1][i] && gameBoard[pieceCenter.y + 2][i]) canMoveDown = false
    }

    return canMoveDown
}

function updateGameBoard(gameBoard, config) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    let shouldInsertPiece = true;

    // for (let y = rows - 2; y >= 0; y--) {
    //     for (let x = 0; x < cols; x++) {
            // from pieceCenter.x check if all 1s have 0s at down. If yes then only move the pieceCenter.y++. 

            const canPieceMove = canPieceMoveDown(gameBoard, config);
            if (canPieceMove) {
                config.pieceCenter.y++;
                // shouldInsertPiece = false
            }
            // if (gameBoard[y][x] && !gameBoard[y + 1][x]) {
            //     gameBoard[y][x] = 0;
            //     gameBoard[y + 1][x] = 1;
            //     shouldInsertPiece = false;
            // }
    //     }
    // }

    if (shouldInsertPiece && !config.shouldStop) {
        // config.shouldStop = true;
        insertPiece(gameBoard, config);
    }
}

function insertPiece(gameBoard, config) {
    // const rows = gameBoard.length;
    // const cols = gameBoard[0].length;

    const selectedPiece = config.nextPiece;
    // config.nextPiece = selectTetrisPiece();
    // const pieceWidth = selectedPiece[0].length;

    const startCol = config.pieceCenter.x - 1;
    const startRow = config.pieceCenter.y - 1

    console.log(startCol, startRow)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard[startRow + i][startCol + j] = selectedPiece[i][j]
        }
    }
}

function update(world) {
    // console.log(world.config)
    updateGameBoard(world.gameBoard, world.config);
}

function tearDown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    tearDown,
};