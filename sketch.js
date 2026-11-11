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
            cols: 10,
        },
        config: {
            padding: 10,
            gap: 1,
            cellSize: 20,
            palette: {
                0: r.WHITE,
                1: r.MAROON,
                2: r.VIOLET,
                3: r.GREEN,
                4: r.ORANGE,
                5: r.BLUE,
                6: r.GOLD,
                7: r.BROWN
            },
            currPiece: selectTetrisPiece(),
            nextPiece: selectTetrisPiece(),
            previewCellScale: 1.5,
            score: 0,
            isGameOver: false
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

function displayScore(grid, config) {
    const { cols } = grid;
    const { padding, cellSize, previewCellScale, score, gap } = config;

    const scaledSize = cellSize * previewCellScale;
    const availableWidth = 2 * padding + 4 * scaledSize + 3 * gap;

    const scoreText = String(score).padStart(4, 0)
    const fontSize = 40;
    const textWidth = r.MeasureText(scoreText, fontSize);

    const posX = 2 * padding + cols * cellSize + (availableWidth - textWidth) / 2;
    const posY = 2 * padding + 2 * scaledSize;

    r.DrawText(scoreText, posX, posY, fontSize, r.GREEN);
}

function displayGameOverScreen(screen, config) {
    if (!config.isGameOver) return;

    const { width, height } = screen;
    const { score } = config;
    const fontSize = 75;

    r.DrawRectangle(
        0, 0,
        width, height,
        r.ColorAlpha(r.BLACK, 0.75)
    );

    u.drawCenteredText("GAME", width, height / 2 - 100, fontSize, r.MAROON);
    u.drawCenteredText("OVER!!", width, height / 2 - 30, fontSize, r.MAROON);
    u.drawCenteredText("Score: " + score, width, height / 2 + 50, 40, r.WHITE);
}

function drawGameBoardCell(gameBoard, config, x, y) {
    const { padding, cellSize, gap, palette } = config;

    const posX = padding + x * (cellSize + gap);
    const posY = padding + y * (cellSize + gap);
    const color = palette[gameBoard[y][x]];

    r.DrawRectangle(posX, posY, cellSize, cellSize, color);
}

function drawGameBoard(gameBoard, config) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            drawGameBoardCell(gameBoard, config, x, y);
        }
    }
}

function drawNextPieceGrid(grid, config) {
    const { nextPiece, padding, palette, previewCellScale, gap, cellSize } = config;
    const { cols } = grid;

    const scaledSize = previewCellScale * cellSize;
    const pieceWidth = nextPiece[0].length;

    const previewAreaWidth = 4 * scaledSize + 3 * gap;
    const requiredWidth = pieceWidth * scaledSize + (pieceWidth - 1) * gap;


    const startX = 2 * padding + cols * (cellSize + gap)
        + (previewAreaWidth - requiredWidth) / 2;
    const startY = padding;

    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < nextPiece[0].length; x++) {
            const posX = startX + x * (scaledSize + gap);
            const posY = startY + y * (scaledSize + gap);

            const color = palette[nextPiece[y][x]];

            r.DrawRectangle(posX, posY, scaledSize, scaledSize, color);
        }
    }
}

function draw(world) {
    const { screen, gameBoard, grid, config } = world;
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawGameBoard(gameBoard, config)
    drawNextPieceGrid(grid, config)

    drawPieceOnBoard(config, gameBoard);

    displayScore(grid, config);
    displayGameOverScreen(screen, config)

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
        config.score++;
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
    const { padding, gap, palette, pieceCenter, currPiece, cellSize, isGameOver } = config;

    if (isGameOver) return;

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
    const { pieceCenter, currPiece } = config;
    const isLeftKeyDown = r.IsKeyDown(r.KEY_LEFT)
    const isRightKeyDown = r.IsKeyDown(r.KEY_RIGHT)

    const pieceCols = currPiece[0].length;

    const isOutOfLeftBounds = (pieceCenter.x <= 1 && isLeftKeyDown)
    const isOutOfRightBounds = (pieceCenter.x + pieceCols > gameBoard[0].length && isRightKeyDown)

    if (isOutOfLeftBounds || isOutOfRightBounds) return;

    if (isLeftKeyDown) pieceCenter.x--;
    if (isRightKeyDown) pieceCenter.x++;
}

function handlePieceRotation(gameBoard, config) {
    if (!r.IsKeyDown(r.KEY_UP)) return;

    const { currPiece, pieceCenter } = config;

    const cols = gameBoard[0].length;
    const startCol = pieceCenter.x - 1

    const rotatedPiece = u.rotateRight(currPiece);
    const rotatedCols = rotatedPiece[0].length;

    const isWithinRightBoundary =
        startCol + rotatedCols <= cols;

    if (!isWithinRightBoundary) return;

    config.currPiece = rotatedPiece;
}

function handleRowClearance(gameBoard) {
    const rows = gameBoard.length;
    const cols = gameBoard[0].length;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (u.shouldClearRow(gameBoard, y)) {
                u.resetGameBoardRow(gameBoard, y);
                u.moveCellsDown(gameBoard, y);
            }
        }
    }
}

function update(world) {
    const { gameBoard, config } = world;

    if (config.isGameOver) return;

    if (u.checkGameOver(gameBoard)) {
        config.isGameOver = true;
    }

    updateGameBoard(gameBoard, config);
    handlePieceTranslation(gameBoard, config);
    handlePieceRotation(gameBoard, config);
    handleRowClearance(gameBoard);
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