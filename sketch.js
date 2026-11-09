const r = require("raylib");
const u = require("./utils")

const { getRandomPiece } = require("./pieces")

function setup() {
    const world = {
        screen: {
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

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.screen.width, world.screen.height, "TETRIS");
    r.SetTargetFPS(60);

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

function update(world) { }

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