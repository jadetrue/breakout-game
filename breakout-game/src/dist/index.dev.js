"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); // Ball

var ballRadius = 10; // Ball positions

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2; // Paddle height and width

var paddleHeight = 10;
var paddleWidth = 75; // Starting point

var paddleX = (canvas.width - paddleWidth) / 2; // Paddle control

var rightButtonPress = false;
var leftButtonPress = false; // Bricks

var brickRowCount = 5;
var brickColumnCount = 8;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30; // Score counting

var score = 0; // Lives

var lives = 3;
var bricks = [];

for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];

  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1
    };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightButtonPress = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftButtonPress = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightButtonPress = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftButtonPress = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;

  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() {
  for (var _c = 0; _c < brickColumnCount; _c++) {
    for (var _r = 0; _r < brickRowCount; _r++) {
      var b = bricks[_c][_r];

      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;

          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#eac5d8";
  ctx.fill();
  ctx.closePath;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#ecebf5";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var _c2 = 0; _c2 < brickColumnCount; _c2++) {
    for (var _r2 = 0; _r2 < brickRowCount; _r2++) {
      if (bricks[_c2][_r2].status == 1) {
        var brickX = _c2 * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = _r2 * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[_c2][_r2].x = brickX;
        bricks[_c2][_r2].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#56cbf9";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Verdana";
  ctx.fillStyle = "#000";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Verdana";
  ctx.fillStyle = "#000";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;

      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightButtonPress) {
    paddleX += 8;

    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftButtonPress) {
    paddleX -= 8;

    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();