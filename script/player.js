import { cellSize, checkGoal } from './main.js';
import { drawMaze, drawPlayer, drawGoal } from './ui.js';

export const player = { x: 1, y: 1 };

export function movePlayer(dx, dy, ctx, maze) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }
    drawMaze(ctx, maze, cellSize);
    drawGoal(ctx, { x: maze[0].length - 2, y: maze.length - 2 }, cellSize);
    drawPlayer(ctx, player, cellSize);
    checkGoal();
}