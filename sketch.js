const r = require("raylib");
const u = require("./utils")

const { selectTetrisPiece } = require("./pieces")

function setup() {
    const world = {
        screen: {
            FPS: 30
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
                1: r.RED,
                2: r.VIOLET,
                3: r.GREEN,
                4: r.ORANGE,
                5: r.BLUE
            },
            currPiece: selectTetrisPiece(),
            nextPiece: selectTetrisPiece(),
            previewCellScale: 1.5,
            shouldStop: false,
        }
    };

    world.screen.width = u.getWindowWidth(world.config, world.grid);
    world.screen.height = u.getWindowHeight(world.config, world.grid);

    world.gameBoard = u.initializeGameBoard(world.grid);
    world.config.pieceCenter = u.initializePieceCenter(world.grid);


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

    if (pieceCenter.y + 2 >= gameBoard.length) return false

    const startCol = pieceCenter.y + 1;
    const startRow = pieceCenter.x - 1;

    for (let i = 0; i < 3; i++) {
        if (gameBoard[startCol][startRow + i] && gameBoard[startCol + 1][startRow + i]) {
            return false
        }
    }

    return true;
}

function updateGameBoard(gameBoard, config) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;


    const canPieceMove = canPieceMoveDown(gameBoard, config);
    if (canPieceMove) {
        config.pieceCenter.y++;
    }
    else {
        config.pieceCenter = u.initializePieceCenter({ rows, cols })
        config.currPiece = config.nextPiece;
        config.nextPiece = selectTetrisPiece();
    }

    insertPiece(gameBoard, config)
}

function insertPiece(gameBoard, config) {
    const selectedPiece = config.currPiece;

    const startCol = config.pieceCenter.x - 1;
    const startRow = config.pieceCenter.y - 1;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i > 1 && !selectedPiece[i][j]) continue;
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