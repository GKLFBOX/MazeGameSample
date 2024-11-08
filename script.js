const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 40;
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let player = { x: 1, y: 1 };
const goal = { x: 8, y: 8 }; // ゴール地点の座標

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = '#333';
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}

function drawPlayer() {
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

function drawGoal() {
    ctx.fillStyle = '#00ff00'; // ゴール地点は緑色で表示
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

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
    }
    drawMaze();
    drawGoal();
    drawPlayer();
    checkGoal(); // 移動後にゴールのチェック
}

function checkGoal() {
    if (player.x === goal.x && player.y === goal.y) {
        setTimeout(() => {
            alert('ゲームクリア！');
            resetGame();
        }, 100); // メッセージ表示後にゲームをリセット
    }
}

function resetGame() {
    player = { x: 1, y: 1 }; // プレイヤーの位置をリセット
    drawMaze();
    drawGoal();
    drawPlayer();
}

drawMaze();
drawGoal();
drawPlayer();