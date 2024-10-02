// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let snake = [
    { x: canvas.width / 2, y: canvas.height / 2 },
    { x: canvas.width / 2 - 20, y: canvas.height / 2 },
    { x: canvas.width / 2 - 40, y: canvas.height / 2 }
];
let apple = { x: 0, y: 0 };
let score = 0;
let direction = 'right';
let speed = 20;

// Generate new apple position
function newApple() {
    apple.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    apple.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
}

// Draw game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach((part) => {
        ctx.fillRect(part.x, part.y, 20, 20);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, 20, 20);
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);
}

// Update game state
function update() {
    // Move snake
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    if (direction === 'right') snake[0].x += 20;
    if (direction === 'left') snake[0].x -= 20;
    if (direction === 'up') snake[0].y -= 20;
    if (direction === 'down') snake[0].y += 20;

    // Check collision with apple
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        score++;
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
        newApple();
    }

    // Check collision with wall or self
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height || snake.slice(1).some((part) => part.x === snake[0].x && part.y === snake[0].y)) {
        alert('Game Over');
        location.reload();
    }
}

// Handle user input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

// Game loop
setInterval(() => {
    update();
    draw();
}, 1000 / speed);

// Initialize game
newApple();
draw();
