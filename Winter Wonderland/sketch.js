let silhoulette, auroras, child;
let childX, childY, childSpeed;
let snowballs = [];
let score = 0;
let highScore = 0;
let gameOver = false;

function preload() {
  silhoulette = loadImage('silhoulette.png');
  auroras = loadImage('auroras.png');
  child = loadImage('child.png');
}

function setup() {
  createCanvas(1920, 1080);
  imageMode(CENTER);
  childX = width / 2;
  childY = height - 150;
  childSpeed = 10;
  highScore = int(localStorage.getItem('highScore') || '0');
}

function draw() {
  if (!gameOver) {
    image(auroras, width / 2, height / 2, width, height);
    image(silhoulette, width / 2, height / 2, width, height);

    handleInput();
    drawChild();
    updateSnowballs();
    drawScore();
  } else {
    showGameOver();
  }
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) childX -= childSpeed;
  if (keyIsDown(RIGHT_ARROW)) childX += childSpeed;
  childX = constrain(childX, 50, width - 50);
}

function drawChild() {
  image(child, childX, childY, 150, 150);
}

function updateSnowballs() {
  if (frameCount % 30 === 0) {
    snowballs.push({
      x: random(50, width - 50),
      y: -50,
      size: random(20, 80),
      speed: random(4, 10)
    });
  }

  for (let i = snowballs.length - 1; i >= 0; i--) {
    let s = snowballs[i];
    fill(255);
    noStroke();
    ellipse(s.x, s.y, s.size);
    s.y += s.speed;

    if (dist(s.x, s.y, childX, childY) < (s.size + 75) / 2) {
      gameOver = true;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
      }
    }

    if (s.y > height + 50) {
      snowballs.splice(i, 1);
      score++;
    }
  }
}

function drawScore() {
  textSize(40);
  fill(255);
  textAlign(LEFT);
  text(`score: ${score}`, 50, 80);
  textAlign(RIGHT);
  text(`high score: ${highScore}`, width - 50, 80);
}

function drawSnowflakes() {
  if (frameCount % 10 === 0) {
    snowflakes.push({
      x: random(width),
      y: -10,
      size: random(5, 15),
      speed: random(1, 4)
    });
  }


function showGameOver() {
  background(0, 100);
  textAlign(CENTER);
  textSize(80);
  fill(255, 0, 0);
  text("you died lol", width / 2, height / 2 - 100);
  textSize(50);
  fill(255);
  text(`final score: ${score}`, width / 2, height / 2);
  text(`high score: ${highScore}`, width / 2, height / 2 + 60);
  textSize(30);
  text("refresh to try again, dumbass", width / 2, height / 2 + 120);
}
