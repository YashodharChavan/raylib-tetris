const r = require("raylib");
const u = require("./utils")

const { getRandomPiece } = require("./pieces")

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
            }
        }
    };

    world.screen.width = u.getWindowWidth(world.config, world.grid);
    world.screen.height = u.getWindowHeight(world.config, world.grid);

    world.gameBoard = u.initializeGameBoard(world.grid);
    
    world.gameBoard[0][0] = 1
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

function draw(world) {
    const { gameBoard, grid, config } = world;
    r.BeginDrawing();

    drawGrid(gameBoard, grid, config)

    r.EndDrawing();
}

function updateGameBoard(gameBoard) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    for (let y = rows - 2; y >= 0; y--) {
        for (let x = 0; x < cols; x++) {
            if (gameBoard[y][x] && !gameBoard[y + 1][x]) {
                gameBoard[y][x] = 0;
                gameBoard[y + 1][x] = 1;
            }
        }
    }
}

function update(world) {
    updateGameBoard(world.gameBoard);
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