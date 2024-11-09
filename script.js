const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 40;
const rows = 10;
const cols = 10;
let maze;
let player;
let goal;

function initializeGame() {
    maze = generateMaze(rows, cols); // ランダムな迷路を生成
    player = { x: 1, y: 1 }; // スタート位置を設定
    goal = { x: cols - 2, y: rows - 2 }; // ゴール位置を設定
    drawMaze();
    drawGoal();
    drawPlayer();
}

function generateMaze(rows, cols) {
    // 初期化 - 壁で埋め尽くされた迷路
    const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

    // 深さ優先探索で迷路を生成
    function carve(x, y) {
        const directions = [
            [0, -2], [0, 2], [-2, 0], [2, 0]
        ];
        shuffleArray(directions); // ランダムな順序で探索

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx > 0 && ny > 0 && nx < cols - 1 && ny < rows - 1 && maze[ny][nx] === 1) {
                maze[y + dy / 2][x + dx / 2] = 0; // 隣接するセルの間を通路にする
                maze[ny][nx] = 0; // 新しいセルを通路にする
                carve(nx, ny); // 再帰的に探索
            }
        }
    }

    // 開始位置
    maze[1][1] = 0;
    carve(1, 1); // 迷路生成の開始

    return maze;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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
            initializeGame(); // 新しい迷路を生成して再スタート
        }, 100);
    }
}

// ゲームを初期化して開始
initializeGame();