export function generateMaze(rows, cols) {
    const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

    function carve(x, y) {
        const directions = [
            [0, -2], [0, 2], [-2, 0], [2, 0]
        ];
        shuffleArray(directions);

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx > 0 && ny > 0 && nx < cols - 1 && ny < rows - 1 && maze[ny][nx] === 1) {
                maze[y + dy / 2][x + dx / 2] = 0;
                maze[ny][nx] = 0;
                carve(nx, ny);
            }
        }
    }

    maze[1][1] = 0;
    carve(1, 1);
    return maze;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}