const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const box = 20;
let score = 0;

let snake = [{ x: box * 5, y: box * 5 }];
let direction = "RIGHT";
let apple = spawnApple();

document.addEventListener("keydown", changeDirection);
setInterval(gameLoop, 100);

function gameLoop() {
    if (isGameOver()) {
        // Reset game on game over
        resetGame();
        return;
    }

    drawBackground();
    drawSnake();
    drawApple();
    updateSnake();
    drawScore();
}

function drawBackground() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "lightgreen";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, box, box);
}

function updateSnake() {
    let head = { x: snake[0].x, y: snake[0].y };

    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "DOWN") head.y += box;

    if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple = spawnApple();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function spawnApple() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
}

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function isGameOver() {
    let head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function drawScore() {
    document.getElementById("score").innerText = "Score: " + score;
}

function resetGame() {
    score = 0;
    snake = [{ x: box * 5, y: box * 5 }];
    direction = "RIGHT";
    apple = spawnApple();
}
