export function drawMaze(ctx, maze, cellSize) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = '#333';
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}

export function drawPlayer(ctx, player, cellSize) {
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(
        player.x * cellSize + cellSize / 2,
        player.y * cellSize + cellSize / 2,
        cellSize / 4,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

export function drawGoal(ctx, goal, cellSize) {
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(
        goal.x * cellSize + cellSize / 2,
        goal.y * cellSize + cellSize / 2,
        cellSize / 4,
        0,
        Math.PI * 2
    );
    ctx.fill();
}