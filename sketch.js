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
            cols: 15,
            cellSize: 20,
        },
        config: {
            padding: 10,
            gap: 1,
            palette: {
                0: r.WHITE,
                1: r.RED
            },
            nextPiece: selectTetrisPiece()
        }
    };

    world.screen.width = u.getWindowWidth(world.config, world.grid);
    world.screen.height = u.getWindowHeight(world.config, world.grid);

    world.gameBoard = u.initializeGameBoard(world.grid);

    // world.gameBoard[0][0] = 1

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
    const { nextPiece, padding, palette } = config;
    const { cols, cellSize } = grid;

    const startX = 4 * padding + cols * cellSize;
    const startY = padding;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const posX = startX + j * cellSize * 1.5;
            const posY = startY + i * cellSize * 1.5;
            const color = palette[nextPiece[i][j]];

            r.DrawRectangle(posX, posY, cellSize * 1.5, cellSize * 1.5, color);
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

function updateGameBoard(gameBoard, config) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    let shouldInsertPiece = true;

    for (let y = rows - 2; y >= 0; y--) {
        for (let x = 0; x < cols; x++) {
            // BUG: need to make it work like tetris, currently working like sand
            if (gameBoard[y][x] && !gameBoard[y + 1][x]) {
                gameBoard[y][x] = 0;
                gameBoard[y + 1][x] = 1;
                shouldInsertPiece = false;
            }
        }
    }

    if (shouldInsertPiece) {
        insertPiece(gameBoard, config);
    }
}

function insertPiece(gameBoard, config) {
    // const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    const selectedPiece = config.nextPiece;
    config.nextPiece = selectTetrisPiece();
    const pieceWidth = selectedPiece[0].length;

    const startCol = Math.floor((cols - pieceWidth) / 2);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard[i][startCol + j] = selectedPiece[i][j]
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