const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawBird() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(50, canvas.height / 2, 25, 25);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width, 0, 25, canvas.height / 2);
    ctx.fillRect(canvas.width, canvas.height / 2 + 200, 25, canvas.height / 2 - 200);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();

    requestAnimationFrame(gameLoop);
}

gameLoop();
