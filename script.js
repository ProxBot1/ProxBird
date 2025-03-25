const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const birdImg = new Image();
birdImg.src = 'bird.png';
const pipeImg = new Image();
pipeImg.src = 'pipe.png';

const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 40,
    height: 30,
    velocity: 0,
    gravity: 0.5,
    jump: -10,
};

const pipes = [];
const pipeWidth = 50;
let pipeGap = 200;
let pipeSpeed = 5;
let score = 0;
let gameStarted = false;
let gameOver = false;

function drawBird() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    for (let pipe of pipes) {
        ctx.drawImage(pipeImg, pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.drawImage(pipeImg, pipe.x, pipe.topHeight + pipeGap, pipeWidth, canvas.height - pipe.topHeight - pipeGap);
    }
}

function updateBird() {
    if (!gameOver) {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y < 0) {
            bird.y = 0;
            bird.velocity = 0;
        }
        if (bird.y > canvas.height) {
            gameOver = true;
        }
    }
}

function updatePipes() {
    if (gameStarted && !gameOver) {
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].x -= pipeSpeed;

            if (bird.x + bird.width > pipes[i].x && bird.x < pipes[i].x + pipeWidth) {
                if (bird.y < pipes[i].topHeight || bird.y + bird.height > pipes[i].topHeight + pipeGap) {
                    gameOver = true;
                }
            }

            if (pipes[i].x + pipeWidth < 0) {
                pipes.shift();
            }
        }

        if (pipes.length > 0 && bird.x > pipes[0].x + pipeWidth) {
            score++;
            pipes.shift();
            increaseDifficulty();
        }

        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
            generatePipes();
        }
    }
}

function generatePipes() {
    const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Score: ' + score, 10, 50);
}

function drawStartScreen() {
    ctx.fillStyle = 'black';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Click to Start!', canvas.width / 2, canvas.height / 2);
}

function drawGameOver() {
    ctx.fillStyle = 'red';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);
    ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2);
    ctx.fillText('Click to Restart', canvas.width / 2, canvas.height / 2 + 50);
}

function resetGame() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes.length = 0;
    score = 0;
    gameOver = false;
    gameStarted = false;
    pipeGap = 200;
    pipeSpeed = 5;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameStarted) {
        drawStartScreen();
    } else if (gameOver) {
        drawGameOver();
        drawPipes();
        drawBird();
        drawScore();
    } else {
        drawBird();
        drawPipes();
        updateBird();
        updatePipes();
        drawScore();
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('touchstart', (event) => {
    event.preventDefault();
    if (!gameStarted) {
        gameStarted = true;
    } else if (gameOver) {
        resetGame();
    } else {
        bird.velocity = bird.jump;
    }
});

function increaseDifficulty() {
    if (score % 5 === 0 && score > 0) {
        pipeSpeed += 1;
        pipeGap -= 10;
        if(pipeGap < 100){
            pipeGap = 100;
        }
    }
}

generatePipes();
gameLoop();
