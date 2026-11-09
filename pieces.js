const pieces = [
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
    ],   
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
]

function getRandomPiece() {
    const index = Math.floor(Math.random() * pieces.length);

    return pieces[index]
}

module.exports = {
    getRandomPiece
}