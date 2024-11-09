import { generateMaze } from './mazeGenerator.js';
import { player, movePlayer } from './player.js';
import { drawMaze, drawPlayer, drawGoal } from './ui.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 40;
const rows = 10;
const cols = 10;
let goal;

function initializeGame() {
    const maze = generateMaze(rows, cols);
    goal = { x: cols - 2, y: rows - 2 }; // ゴール位置を設定
    player.x = 1;
    player.y = 1;
    drawMaze(ctx, maze, cellSize);
    drawGoal(ctx, goal, cellSize);
    drawPlayer(ctx, player, cellSize);
}

// ボタンにイベントリスナーを設定
document.querySelector('.controls button:nth-child(1)').addEventListener('click', () => movePlayer(0, -1)); // 上
document.querySelector('.horizontal-buttons button:nth-child(1)').addEventListener('click', () => movePlayer(-1, 0)); // 左
document.querySelector('.horizontal-buttons button:nth-child(2)').addEventListener('click', () => movePlayer(1, 0)); // 右
document.querySelector('.controls button:nth-child(3)').addEventListener('click', () => movePlayer(0, 1)); // 下

function checkGoal() {
    if (player.x === goal.x && player.y === goal.y) {
        setTimeout(() => {
            alert('ゲームクリア！');
            initializeGame(); // 新しい迷路を生成して再スタート
        }, 100);
    }
}

initializeGame();
export { cellSize, checkGoal };