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
        },
        config: {
            padding: 10,
            gap: 1,
            cellSize: 20,
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

function drawGridCell(gameBoard, config, x, y) {
    const { padding, cellSize, gap, palette } = config;

    const posX = padding + x * (cellSize + gap);
    const posY = padding + y * (cellSize + gap);
    const color = palette[gameBoard[y][x]];

    r.DrawRectangle(posX, posY, cellSize, cellSize, color);
}

function drawGrid(gameBoard, config) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            drawGridCell(gameBoard, config, x, y);
        }
    }
}

function drawNextPieceGrid(grid, config) {
    const { nextPiece, padding, palette, previewCellScale, gap, cellSize } = config;
    const { cols } = grid;

    const scaledSize = previewCellScale * cellSize;

    const startX = 2 * padding + cols * (cellSize + gap);
    const startY = padding;

    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 3; x++) {
            const posX = startX + x * (scaledSize + gap);
            const posY = startY + y * (scaledSize + gap);

            const color = palette[nextPiece[y][x]];

            r.DrawRectangle(posX, posY, scaledSize, scaledSize, color);
        }
    }
}

function draw(world) {
    const { gameBoard, grid, config } = world;
    r.BeginDrawing();

    drawGrid(gameBoard, config)
    drawNextPieceGrid(grid, config)

    drawPieceOnBoard(config, gameBoard);

    r.EndDrawing();
}

function updateGameBoard(gameBoard, config) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    const canPieceMove = u.canPieceMoveDown(gameBoard, config);

    if (canPieceMove) {
        config.pieceCenter.y++;
    }
    else {
        insertPieceOnBoard(gameBoard, config)
        config.pieceCenter = u.initializePieceCenter({ rows, cols })
        config.currPiece = config.nextPiece;
        config.nextPiece = selectTetrisPiece();
    }
}

function insertPieceOnBoard(gameBoard, config) {
    const selectedPiece = config.currPiece;

    const startCol = config.pieceCenter.x - 1;
    const startRow = config.pieceCenter.y - 1;

    const pieceRows = selectedPiece.length;
    const pieceCols = selectedPiece[0].length;

    for (let y = 0; y < pieceRows; y++) {
        for (let x = 0; x < pieceCols; x++) {
            const targetRow = startRow + y;
            const targetCol = startCol + x;

            if (!gameBoard[targetRow][targetCol])
                gameBoard[targetRow][targetCol] = selectedPiece[y][x]
        }
    }
}

function drawPieceOnBoard(config, gameBoard) {
    const { padding, gap, palette, pieceCenter, currPiece, cellSize } = config;

    const startRow = pieceCenter.y - 1;
    const startCol = pieceCenter.x - 1;

    const pieceRows = currPiece.length;
    const pieceCols = currPiece[0].length;

    for (let y = 0; y < pieceRows; y++) {
        for (let x = 0; x < pieceCols; x++) {
            const posX = padding + (startCol + x) * (cellSize + gap);
            const posY = padding + (startRow + y) * (cellSize + gap);

            const gameBoardColor = gameBoard[startRow + y][startCol + x]
            const currPieceColor = currPiece[y][x]

            const colorIdx = gameBoardColor ? gameBoardColor : currPieceColor;
            const color = palette[colorIdx]

            r.DrawRectangle(posX, posY, cellSize, cellSize, color);
        }
    }
}

function handlePieceTranslation(gameBoard, config) {
    const { pieceCenter } = config;
    const isLeftKeyDown = r.IsKeyDown(r.KEY_LEFT)
    const isRightKeyDown = r.IsKeyDown(r.KEY_RIGHT)

    const isOutOfLeftBounds = (pieceCenter.x <= 1 && isLeftKeyDown)
    const isOutOfRightBounds = (pieceCenter.x + 2 >= gameBoard[0].length && isRightKeyDown)

    if (isOutOfLeftBounds || isOutOfRightBounds) return;

    if (isLeftKeyDown) pieceCenter.x--;
    if (isRightKeyDown) pieceCenter.x++;
}

function handlePieceRotation(config) {
    if (r.IsKeyDown(r.KEY_UP)) {   
        config.currPiece = u.rotateRight(config.currPiece);
    }
}

function update(world) {
    const { gameBoard, config } = world;

    updateGameBoard(gameBoard, config);
    handlePieceTranslation(gameBoard, config);
    handlePieceRotation(config);
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