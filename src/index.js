const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
// Ball
let ballRadius = 10;
// Ball positions
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
// Paddle height and width
let paddleHeight = 10;
let paddleWidth = 75;
// Starting point
let paddleX = (canvas.width-paddleWidth) / 2;
// Paddle control
let rightButtonPress = false;
let leftButtonPress = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightButtonPress = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftButtonPress = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightButtonPress = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftButtonPress = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#eac5d8";
    ctx.fill();
    ctx.closePath;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ecebf5";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(rightButtonPress) {
        paddleX += 6;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if(leftButtonPress) {
        paddleX -= 6;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;
}

let interval = setInterval(draw, 10);