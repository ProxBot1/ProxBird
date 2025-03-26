const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 25,
    height: 25,
};

const pipes = [];
const pipeWidth = 25;
let pipeGap = 200;

function drawBird() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    for (let pipe of pipes) {
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(pipe.x, pipe.topHeight + pipeGap, pipeWidth, canvas.height - pipe.topHeight - pipeGap);
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();

    requestAnimationFrame(gameLoop);
}

// Generate initial pipe
const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
pipes.push({
    x: canvas.width,
    topHeight: topHeight,
});

gameLoop();
